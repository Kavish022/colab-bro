import React, { useState, useEffect } from "react";
import { supabase } from "./utils/supabase";
import { Moon, Sun, Edit3 } from "lucide-react";
import Editor from "./components/Editor";
import Chat from "./components/Chat";
import History from "./components/VersionHistory";

export default function CollaborationPlatform() {
  const [darkMode, setDarkMode] = useState(false);
  const [docTitle, setDocTitle] = useState("Q4 Marketing Strategy");
  const [content, setContent] = useState("<p>Loading...</p>");
  const [saveStatus, setSaveStatus] = useState("saved");
  const [messages, setMessages] = useState([]);
  const [versionHistory] = useState([
    { id: 1, user: "Sarah Chen", action: "Created document", time: "2 hours ago" },
  ]);

  const [activeUsers] = useState([
    { id: 101, name: "Sarah Chen", color: "#3b82f6", avatar: "SC" },
    { id: 102, name: "Mike J.", color: "#10b981", avatar: "MJ" },
  ]);

  // Initial Fetch
  useEffect(() => {
    const fetchDoc = async () => {
      const { data } = await supabase
        .from("documents")
        .select("content")
        .eq("id", "00000000-0000-0000-0000-000000000000")
        .single();
      if (data) setContent(data.content);
    };
    fetchDoc();
  }, []);

  // Real-time Document Sync
  useEffect(() => {
    const channel = supabase
      .channel('doc-changes')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'documents', filter: 'id=eq.00000000-0000-0000-0000-000000000000' },
        (payload) => {
          // IMPORTANT: Only update if the content is different to avoid infinite loops
          if (payload.new.content !== content) {
             setContent(payload.new.content);
          }
        }
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [content]);

  // Dark Mode
  useEffect(() => {
    const html = window.document.documentElement;
    darkMode ? html.classList.add("dark") : html.classList.remove("dark");
  }, [darkMode]);

  // Chat Subscription
  useEffect(() => {
    supabase.from("messages").select("*").order("created_at", { ascending: true })
      .then(({ data }) => { if (data) setMessages(data); });

    const chatChannel = supabase.channel("global-chat")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" },
        (payload) => setMessages((prev) => [...prev, payload.new]))
      .subscribe();
    return () => supabase.removeChannel(chatChannel);
  }, []);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;
    await supabase.from("messages").insert([{ text, user_name: "You", avatar: "YU", color: "#8b5cf6" }]);
  };

  const handleDocChange = async (newHtml) => {
    if (newHtml === content) return; // Prevent unnecessary saves
    setContent(newHtml);
    setSaveStatus('saving');

    const { error } = await supabase
      .from('documents')
      .update({ content: newHtml, updated_at: new Date() })
      .eq('id', '00000000-0000-0000-0000-000000000000');

    if (!error) setSaveStatus('saved');
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      <header className="h-16 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <Edit3 className="text-blue-600 dark:text-blue-400" size={24} />
          <input value={docTitle} onChange={(e) => setDocTitle(e.target.value)} className="text-lg font-bold bg-transparent text-gray-800 dark:text-white outline-none" />
        </div>
        <div className="flex items-center gap-6">
          <div className="text-sm">
            {saveStatus === "saving" ? <span className="text-amber-500 animate-pulse">Saving...</span> : <span className="text-green-500">Saved</span>}
          </div>
          <div className="flex -space-x-2">
            {activeUsers.map((user) => (
              <div key={user.id} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: user.color }}>{user.avatar}</div>
            ))}
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">{darkMode ? <Sun size={20} /> : <Moon size={20} />}</button>
        </div>
      </header>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <Editor content={content} onDocChange={handleDocChange} />
          </div>
        </div>
        <div className="w-80 shrink-0 flex flex-col border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <Chat messages={messages} onSendMessage={handleSendMessage} />
          <History history={versionHistory} />
        </div>
      </div>
    </div>
  );
}