// import React from 'react';
// import { MessageSquare } from 'lucide-react';

// export default function Chat({ messages, newMessage, setNewMessage, handleSendMessage }) {
//   return (
//     <div className="flex-1 flex flex-col border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors">
//       <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-2 transition-colors">
//         <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400" />
//         <span className="font-semibold text-gray-900 dark:text-white">Team Chat</span>
//       </div>
      
//       <div className="flex-1 overflow-auto p-4 space-y-3">
//         {messages.map(msg => (
//           <div key={msg.id} className="flex space-x-2">
//             <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
//                  style={{ backgroundColor: msg.color }}>{msg.avatar}</div>
//             <div className="flex-1">
//               <div className="flex items-baseline space-x-2">
//                 <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">{msg.user}</span>
//                 <span className="text-xs text-gray-500 dark:text-gray-400">
//                   {/* Handle Supabase timestamp or simple string */}
//                   {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : msg.time}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{msg.text}</p>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       <div className="p-4 border-t border-gray-200 dark:border-gray-700">
//         <div className="flex space-x-2">
//           <input
//             type="text" value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//             placeholder="Type a message..."
//             className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
//           />
//           <button onClick={handleSendMessage} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }