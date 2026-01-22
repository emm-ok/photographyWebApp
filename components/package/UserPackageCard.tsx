// import { Clock, Camera, CheckCircle } from "lucide-react";

// export default function UserPackageCard({ pkg }) {
//   return (
//     <div className="relative bg-white rounded-3xl border shadow-sm hover:shadow-xl transition">

//       {pkg.isPopular && (
//         <span className="absolute top-5 right-5 bg-black text-white text-xs px-3 py-1 rounded-full">
//           Most Popular
//         </span>
//       )}

//       <div className="p-8 border-b">
//         <h3 className="text-xl font-semibold">{pkg.name}</h3>

//         <div className="mt-4 flex items-end gap-2">
//           <span className="text-4xl font-bold">${pkg.price}</span>
//           <span className="text-sm text-gray-500">USD</span>
//         </div>

//         <p className="text-sm text-gray-500 mt-1">{pkg.duration} session</p>
//       </div>

//       <div className="p-8 space-y-4 text-sm text-gray-600">
//         <p>{pkg.description}</p>

//         <ul className="space-y-2">
//           {pkg.features.map((feature) => (
//             <li key={feature} className="flex items-center gap-2">
//               <CheckCircle size={16} /> {feature}
//             </li>
//           ))}
//         </ul>

//         <div className="pt-4 border-t space-y-2">
//           <div className="flex items-center gap-2">
//             <Clock size={16} /> Delivery: {pkg.deliveryTime}
//           </div>

//           <div className="flex items-center gap-2">
//             <Camera size={16} /> Usage: {pkg.usageRights}
//           </div>
//         </div>
//       </div>

//       <div className="p-8 border-t">
//         <button className="w-full py-3 rounded-xl bg-black text-white">
//           Book This Package
//         </button>
//       </div>
//     </div>
//   );
// }
