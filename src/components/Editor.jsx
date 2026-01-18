// import React from 'react';
// import { Users } from 'lucide-react';

// export default function Editor({ 
//   document, 
//   handleDocumentChange, 
//   activeUsers, 
//   editingUser, 
//   cursorPositions, 
//   textareaRef 
// }) {
//   return (
//     <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
//       <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between transition-colors">
//         <div className="flex items-center space-x-4">
//           <Users className="w-5 h-5 text-gray-500 dark:text-gray-400" />
//           <span className="text-sm text-gray-600 dark:text-gray-300">
//             {activeUsers.filter(u => u.status === 'editing').length} editing
//           </span>
//         </div>
//         {editingUser && (
//           <div className="text-sm text-gray-600 dark:text-gray-300 animate-pulse">
//             {editingUser} is typing...
//           </div>
//         )}
//       </div>

//       <div className="flex-1 overflow-auto p-6 relative">
//         <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 relative transition-colors h-full">
//           <textarea
            // ref={textareaRef}
//             value={document.content}
//             onChange={handleDocumentChange}
//             className="w-full h-full border-none focus:outline-none resize-none font-mono text-sm text-gray-800 dark:text-gray-200 bg-transparent leading-relaxed"
//             placeholder="Start typing..."
//           />
          
//           {Object.entries(cursorPositions).map(([userId, position]) => {
//             const user = activeUsers.find(u => u.id === parseInt(userId));
//             if (!user || user.status !== 'editing') return null;
//             return (
//               <div key={userId} className="absolute w-0.5 h-5 animate-pulse pointer-events-none"
//                 style={{ backgroundColor: user.color, left: `${20 + (position % 50)}%`, top: `${100 + Math.floor(position / 50) * 20}px` }}>
//                 <div className="absolute -top-6 left-0 px-2 py-1 rounded text-xs text-white whitespace-nowrap"
//                   style={{ backgroundColor: user.color }}>{user.name}</div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }