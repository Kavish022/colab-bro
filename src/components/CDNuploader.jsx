// import React, { useState } from 'react';
// import { Upload, ImageIcon, Loader2, CheckCircle, XCircle } from 'lucide-react';

// export default function CDNUploader() {
//   const [file, setFile] = useState(null);
//   const [imageKey, setImageKey] = useState('');
//   const [width, setWidth] = useState('');
//   const [status, setStatus] = useState({ type: '', message: '' });
//   const [loading, setLoading] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState('');

//   const API_BASE = 'http://localhost:3000'; // Replace with your backend URL

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setStatus({ type: '', message: '' });
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setStatus({ type: 'error', message: 'Please select a file first' });
//       return;
//     }

//     setLoading(true);
//     setStatus({ type: '', message: '' });

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await fetch(`${API_BASE}/upload`, {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) throw new Error('Upload failed');

//       const data = await response.json();
//       const key = data.key || data.id || data.filename;

//       setImageKey(key);
//       setPreviewUrl(`${API_BASE}/image/${key}`);
//       setStatus({ type: 'success', message: 'Upload successful!' });
//     } catch (error) {
//       setStatus({ type: 'error', message: `Upload failed: ${error.message}` });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFetchImage = () => {
//     if (!imageKey) {
//       setStatus({ type: 'error', message: 'No image key available' });
//       return;
//     }
//     const widthParam = width ? `?width=${width}` : '';
//     setPreviewUrl(`${API_BASE}/image/${imageKey}${widthParam}`);
//     setStatus({ type: 'success', message: 'Image loaded!' });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
//       <div className="max-w-3xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-lg p-8">
//           {/* Header */}
//           <div className="flex items-center gap-3 mb-8">
//             <ImageIcon className="w-8 h-8 text-blue-600" />
//             <h1 className="text-3xl font-bold text-slate-800">CDN File Upload</h1>
//           </div>

//           {/* Status Messages */}
//           {status.message && (
//             <div
//               className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
//                 status.type === 'success'
//                   ? 'bg-green-50 text-green-800'
//                   : status.type === 'error'
//                   ? 'bg-red-50 text-red-800'
//                   : ''
//               }`}
//             >
//               {status.type === 'success' && <CheckCircle className="w-5 h-5" />}
//               {status.type === 'error' && <XCircle className="w-5 h-5" />}
//               <span>{status.message}</span>
//             </div>
//           )}

//           {/* Upload Section */}
//           <div className="space-y-6 mb-8">
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">
//                 Select Image
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:font-medium cursor-pointer"
//               />
//               {file && (
//                 <p className="mt-2 text-sm text-slate-600">Selected: {file.name}</p>
//               )}
//             </div>

//             <button
//               onClick={handleUpload}
//               disabled={loading || !file}
//               className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                   Uploading...
//                 </>
//               ) : (
//                 <>
//                   <Upload className="w-5 h-5" />
//                   Upload File
//                 </>
//               )}
//             </button>
//           </div>

//           {/* Image Key Display */}
//           {imageKey && (
//             <div className="mb-8 p-4 bg-slate-50 rounded-lg">
//               <p className="text-sm font-semibold text-slate-700 mb-1">Image Key:</p>
//               <code className="text-sm text-blue-600 break-all">{imageKey}</code>
//             </div>
//           )}

//           {/* Resize Section */}
//           {imageKey && (
//             <div className="space-y-4 mb-8">
//               <div>
//                 <label className="block text-sm font-semibold text-slate-700 mb-2">
//                   Resize Width (optional)
//                 </label>
//                 <input
//                   type="number"
//                   placeholder="e.g., 300"
//                   value={width}
//                   onChange={(e) => setWidth(e.target.value)}
//                   className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                 />
//               </div>

//               <button
//                 onClick={handleFetchImage}
//                 className="w-full bg-slate-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
//               >
//                 Fetch Image
//               </button>
//             </div>
//           )}

//           {/* Image Preview */}
//           {previewUrl && (
//             <div className="border-2 border-slate-200 rounded-lg p-4">
//               <h3 className="text-lg font-semibold text-slate-800 mb-4">Preview</h3>
//               <img
//                 src={previewUrl}
//                 alt="CDN Preview"
//                 className="max-w-full h-auto rounded-lg shadow-md"
//                 onError={() => setStatus({ type: 'error', message: 'Failed to load image' })}
//               />
//             </div>
//           )}
//         </div>

//         {/* Info Footer */}
//         <div className="mt-6 text-center text-sm text-slate-600">
//           <p>
//             Backend API: <code className="bg-slate-200 px-2 py-1 rounded">{API_BASE}</code>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
