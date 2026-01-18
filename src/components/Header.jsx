// import { Edit3, Clock, CheckCircle } from "lucide-react";

// export default function Header({
//   title,
//   handleTitleChange,
//   saveStatus,
//   activeUsers,
// }) {
//   return (
//     <header className="bg-white border-b border-gray-200 px-6 py-4">
//       {/* ... paste header JSX here ... */}
//       <header className="bg-white border-b border-gray-200 px-6 py-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2">
//               <Edit3 className="w-6 h-6 text-blue-600" />
//               <span className="text-xl font-bold text-gray-900">
//                 CollabDocs
//               </span>
//             </div>
//             <input
//               type="text"
//               value={document.title}
//               onChange={handleTitleChange}
//               className="text-lg font-semibold text-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
//             />
//           </div>

//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2">
//               {saveStatus === "saving" ? (
//                 <>
//                   <Clock className="w-4 h-4 text-amber-500 animate-pulse" />
//                   <span className="text-sm text-amber-600">Saving...</span>
//                 </>
//               ) : (
//                 <>
//                   <CheckCircle className="w-4 h-4 text-green-500" />
//                   <span className="text-sm text-green-600">
//                     All changes saved
//                   </span>
//                 </>
//               )}
//             </div>

//             <div className="flex -space-x-2">
//               {activeUsers.map((user) => (
//                 <div
//                   key={user.id}
//                   className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-white relative"
//                   style={{ backgroundColor: user.color }}
//                   title={user.name}
//                 >
//                   {user.avatar}
//                   {user.status === "editing" && (
//                     <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </header>
//     </header>
//   );
// }
