// import React, { useState, useEffect, useRef } from 'react';
// import { Users, MessageSquare, Edit3, Save, Clock, CheckCircle } from 'lucide-react';

// const CollaborationPlatform = () => {
//   const [activeUsers, setActiveUsers] = useState([
//     { id: 1, name: 'Sarah Chen', color: '#3b82f6', avatar: 'SC', status: 'editing' },
//     { id: 2, name: 'Mike Johnson', color: '#10b981', avatar: 'MJ', status: 'viewing' },
//     { id: 3, name: 'Emma Davis', color: '#f59e0b', avatar: 'ED', status: 'editing' }
//   ]);

//   const [document, setDocument] = useState({
//     title: 'Q4 2024 Marketing Strategy',
//     content: `Executive Summary
// Our Q4 marketing strategy focuses on three key pillars: digital transformation, customer engagement, and brand positioning.

// Key Objectives
// 1. Increase social media engagement by 45%
// 2. Launch new product line with integrated campaign
// 3. Expand market share in Southeast Asian markets

// Budget Allocation
// - Digital Advertising: $250,000
// - Content Creation: $120,000
// - Events & Sponsorships: $180,000
// - Analytics & Tools: $80,000`
//   });

//   const [messages, setMessages] = useState([
//     { id: 1, user: 'Sarah Chen', text: 'Updated the budget section', time: '2 min ago', avatar: 'SC', color: '#3b82f6' },
//     { id: 2, user: 'Mike Johnson', text: 'Looks good! Should we add metrics?', time: '1 min ago', avatar: 'MJ', color: '#10b981' },
//     { id: 3, user: 'Emma Davis', text: 'I can work on the analytics part', time: 'Just now', avatar: 'ED', color: '#f59e0b' }
//   ]);

//   const [newMessage, setNewMessage] = useState('');
//   const [cursorPositions, setCursorPositions] = useState({});
//   const [editingUser, setEditingUser] = useState(null);
//   const [saveStatus, setSaveStatus] = useState('saved');
//   const [versionHistory, setVersionHistory] = useState([
//     { id: 1, user: 'Sarah Chen', action: 'Updated budget allocation', time: '5 min ago' },
//     { id: 2, user: 'Emma Davis', action: 'Added Q4 objectives', time: '12 min ago' },
//     { id: 3, user: 'Mike Johnson', action: 'Created document', time: '1 hour ago' }
//   ]);

//   const textareaRef = useRef(null);

//   // Simulate real-time cursor positions
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const randomUser = activeUsers[Math.floor(Math.random() * activeUsers.length)];
//       if (randomUser.status === 'editing') {
//         setCursorPositions(prev => ({
//           ...prev,
//           [randomUser.id]: Math.floor(Math.random() * 500)
//         }));
//       }
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [activeUsers]);

//   // Simulate auto-save
//   useEffect(() => {
//     if (saveStatus === 'saving') {
//       const timer = setTimeout(() => {
//         setSaveStatus('saved');
//       }, 1500);
//       return () => clearTimeout(timer);
//     }
//   }, [saveStatus]);

//   const handleDocumentChange = (e) => {
//     setDocument({ ...document, content: e.target.value });
//     setSaveStatus('saving');
//     setEditingUser('You');
    
//     // Simulate adding to version history
//     setTimeout(() => {
//       setVersionHistory(prev => [
//         { id: Date.now(), user: 'You', action: 'Edited document content', time: 'Just now' },
//         ...prev.slice(0, 4)
//       ]);
//     }, 1000);
//   };

//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       setMessages(prev => [
//         ...prev,
//         { 
//           id: Date.now(), 
//           user: 'You', 
//           text: newMessage, 
//           time: 'Just now',
//           avatar: 'YU',
//           color: '#8b5cf6'
//         }
//       ]);
//       setNewMessage('');
//     }
//   };

//   const handleTitleChange = (e) => {
//     setDocument({ ...document, title: e.target.value });
//     setSaveStatus('saving');
//   };

//   return (
//     <div className="h-screen bg-gray-50 flex flex-col">
//       {/* Header */}
    

//       {/* Main Content */}
//       <div className="flex-1 flex overflow-hidden">
//         {/* Document Editor */}
//         <div className="flex-1 flex flex-col">
//           <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Users className="w-5 h-5 text-gray-500" />
//               <span className="text-sm text-gray-600">
//                 {activeUsers.filter(u => u.status === 'editing').length} editing
//               </span>
//             </div>
//             {editingUser && (
//               <div className="text-sm text-gray-600 animate-pulse">
//                 {editingUser} is typing...
//               </div>
//             )}
//           </div>

//           <div className="flex-1 overflow-auto p-6">
//             <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
//               <textarea
//                 ref={textareaRef}
//                 value={document.content}
//                 onChange={handleDocumentChange}
//                 className="w-full h-96 border-none focus:outline-none resize-none font-mono text-sm text-gray-800 leading-relaxed"
//                 placeholder="Start typing..."
//               />
              
//               {/* Simulated cursors */}
//               {Object.entries(cursorPositions).map(([userId, position]) => {
//                 const user = activeUsers.find(u => u.id === parseInt(userId));
//                 if (!user || user.status !== 'editing') return null;
                
//                 return (
//                   <div
//                     key={userId}
//                     className="absolute w-0.5 h-5 animate-pulse"
//                     style={{
//                       backgroundColor: user.color,
//                       left: `${20 + (position % 50)}%`,
//                       top: `${200 + Math.floor(position / 50) * 20}px`
//                     }}
//                   >
//                     <div
//                       className="absolute -top-6 left-0 px-2 py-1 rounded text-xs text-white whitespace-nowrap"
//                       style={{ backgroundColor: user.color }}
//                     >
//                       {user.name}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Right Sidebar */}
//         <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
//           {/* Chat Section */}
//           <div className="flex-1 flex flex-col border-b border-gray-200">
//             <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center space-x-2">
//               <MessageSquare className="w-5 h-5 text-gray-600" />
//               <span className="font-semibold text-gray-900">Team Chat</span>
//             </div>
            
//             <div className="flex-1 overflow-auto p-4 space-y-3">
//               {messages.map(msg => (
//                 <div key={msg.id} className="flex space-x-2">
//                   <div
//                     className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
//                     style={{ backgroundColor: msg.color }}
//                   >
//                     {msg.avatar}
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex items-baseline space-x-2">
//                       <span className="font-semibold text-sm text-gray-900">{msg.user}</span>
//                       <span className="text-xs text-gray-500">{msg.time}</span>
//                     </div>
//                     <p className="text-sm text-gray-700 mt-1">{msg.text}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
            
//             <div className="p-4 border-t border-gray-200">
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                   placeholder="Type a message..."
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                 />
//                 <button
//                   onClick={handleSendMessage}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
//                 >
//                   Send
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Version History */}
//           <div className="h-64 overflow-auto">
//             <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
//               <span className="font-semibold text-gray-900">Version History</span>
//             </div>
//             <div className="p-4 space-y-3">
//               {versionHistory.map(version => (
//                 <div key={version.id} className="text-sm">
//                   <div className="font-medium text-gray-900">{version.user}</div>
//                   <div className="text-gray-600">{version.action}</div>
//                   <div className="text-gray-400 text-xs mt-1">{version.time}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CollaborationPlatform;