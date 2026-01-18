import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './utils/supabase';
import { Moon, Sun, Edit3, Clock, CheckCircle, Send, MessageSquare, Users } from 'lucide-react';
import VersionHistory from './components/VersionHistory';
VersionHistory
// --- CHAT COMPONENT ---
const ChatComponent = ({ messages, onSendMessage }) => {
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 transition-colors">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center gap-2">
        <MessageSquare size={18} className="text-blue-600" />
        <h3 className="font-bold text-gray-700 dark:text-gray-200 text-sm">Team Chat</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={msg.id || i} className="flex gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ backgroundColor: msg.color || '#8b5cf6' }}>
              {msg.avatar || 'U'}
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{msg.user_name}</span>
                <span className="text-[10px] text-gray-400">{msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Just now'}</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (onSendMessage(input), setInput(''))} placeholder="Message..." className="flex-1 px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          <button onClick={() => { onSendMessage(input); setInput(''); }} className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"><Send size={16} /></button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
export default function CollaborationPlatform() {
  // 1. STATE
  const [darkMode, setDarkMode] = useState(false);
  const [docTitle, setDocTitle] = useState('Q4 Marketing Strategy');
  const [content, setContent] = useState('Start typing...');
  const [saveStatus, setSaveStatus] = useState('saved');
  const [messages, setMessages] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});
  
  // Fake "Team" Data
  const [activeUsers] = useState([
    { id: 101, name: 'Sarah Chen', color: '#3b82f6', avatar: 'SC', status: 'editing' },
    { id: 102, name: 'Mike J.', color: '#10b981', avatar: 'MJ', status: 'editing' },
    { id: 103, name: 'Emma D.', color: '#f59e0b', avatar: 'ED', status: 'viewing' }
  ]);

  // 2. TOGGLE DARK MODE (Explicit Logic)
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

 useEffect(() => {
    const html = window.document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
      console.log("Dark mode active");
    } else {
      html.classList.remove('dark');
      console.log("Light mode active");
    }
  }, [darkMode]);

  // 3. CURSOR SIMULATION (Makes the app feel alive)
  useEffect(() => {
    const interval = setInterval(() => {
      const editors = activeUsers.filter(u => u.status === 'editing');
      const randomUser = editors[Math.floor(Math.random() * editors.length)];
      setCursorPositions(prev => ({ 
        ...prev, 
        [randomUser.id]: Math.floor(Math.random() * 800) 
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, [activeUsers]);

  // 4. SUPABASE CHAT
  useEffect(() => {
    supabase.from('messages').select('*').order('created_at', { ascending: true })
      .then(({ data }) => { if (data) setMessages(data); });

    const channel = supabase.channel('global-chat')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, 
        (payload) => setMessages(prev => [...prev, payload.new])
      ).subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;
    const { error } = await supabase.from('messages').insert([{ text, user_name: 'You', avatar: 'YU', color: '#8b5cf6' }]);
    if (error) console.error(error);
  };

  const handleDocChange = (e) => {
    setContent(e.target.value);
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 800);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      
      {/* HEADER */}
      <header className="h-16 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between px-6 shrink-0 transition-colors">
        <div className="flex items-center gap-4">
          <Edit3 className="text-blue-600 dark:text-blue-400" size={24} />
          <input value={docTitle} onChange={(e) => setDocTitle(e.target.value)} className="text-lg font-bold bg-transparent text-gray-800 dark:text-white outline-none" />
        </div>

        <div className="flex items-center gap-6">
          <div className="text-sm">
            {saveStatus === 'saving' ? <span className="text-amber-500 animate-pulse">Saving...</span> : <span className="text-green-500">Saved</span>}
          </div>

          {/* User Avatars */}
          <div className="flex -space-x-2">
            {activeUsers.map(user => (
              <div key={user.id} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-white text-[10px] font-bold" style={{backgroundColor: user.color}} title={user.name}>{user.avatar}</div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold">YOU</div>
          </div>

          <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:scale-110 transition-transform">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* BODY */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* EDITOR */}
        <div className="flex-1 p-8 overflow-y-auto relative">
          <div className="max-w-3xl mx-auto min-h-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl p-10 relative transition-colors">
            
            {/* Fake Moving Cursors */}
            {Object.entries(cursorPositions).map(([userId, pos]) => {
              const user = activeUsers.find(u => u.id === parseInt(userId));
              return (
                <div key={userId} className="absolute pointer-events-none transition-all duration-1000" style={{ left: `${20 + (pos % 40)}%`, top: `${150 + (pos / 2)}px` }}>
                  <div className="w-0.5 h-5" style={{ backgroundColor: user.color }} />
                  <div className="px-1.5 py-0.5 text-[10px] text-white rounded-sm whitespace-nowrap" style={{ backgroundColor: user.color }}>{user.name}</div>
                </div>
              );
            })}

            <textarea value={content} onChange={handleDocChange} className="w-full h-[70vh] resize-none outline-none bg-transparent text-gray-800 dark:text-gray-200 text-lg leading-relaxed font-serif" placeholder="Start typing..." />
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="w-80 shrink-0">
          <ChatComponent messages={messages} onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}