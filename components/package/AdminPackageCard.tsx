// import { Eye, EyeOff, GripVertical, BarChart, Recycle } from "lucide-react";

// export default function AdminPackageCard({ pkg, onEdit, onArchive, onDelete }) {
//   return (
//     <div className="bg-white rounded-2xl p-5 border flex justify-between items-center">
//       <div className="flex items-center gap-4">
//         <GripVertical className="text-gray-400 cursor-grab" />

//         <div>
//           <h3 className="font-semibold text-lg">{pkg.name}</h3>
//           <p className="text-sm text-gray-500">
//             ${pkg.price} • {pkg.duration}
//           </p>

//           <div className="flex items-center gap-3 text-xs mt-2">
//             <span className="flex items-center gap-1">
//               <BarChart size={14} /> {pkg.bookingsCount ?? 0} bookings
//             </span>

//             {pkg.isPopular && (
//               <span className="bg-black text-white px-2 py-0.5 rounded-full">
//                 Popular
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="flex gap-3 items-center">
//         {pkg.isVisible ? <Eye /> : <EyeOff />}

//         <button onClick={onEdit} className="text-sm underline">
//           Edit
//         </button>

//         <button onClick={onArchive} className="text-sm text-red-600">
//           Archive
//         </button>
//         <button onClick={onDelete} className="text-sm text-red-600">
//           <Recycle />
//         </button>
//       </div>
//     </div>
//   );
// }
