import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';

export default function Chat({ messages, onSendMessage }) {
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  return (
    <div className="flex flex-col h-1/2 border-b border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center gap-2">
        <MessageSquare size={16} className="text-blue-600" />
        <span className="font-bold text-sm dark:text-white">Chat</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className="flex gap-2 text-sm">
            <span className="font-bold dark:text-gray-300">{msg.user_name}:</span>
            <span className="dark:text-gray-400">{msg.text}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="p-3 bg-gray-50 dark:bg-gray-900 flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (onSendMessage(input), setInput(''))} className="flex-1 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded px-2 py-1 text-sm dark:text-white outline-none" placeholder="Message..." />
        <button onClick={() => { onSendMessage(input); setInput(''); }} className="bg-blue-600 text-white p-1 rounded"><Send size={16}/></button>
      </div>
    </div>
  );
}