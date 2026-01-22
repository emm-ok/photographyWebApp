// "use client";

// import { useEffect, useState } from "react";
// import { getPublicPackages } from "@/lib/package";

// export default function PackagesPage() {
//   const [packages, setPackages] = useState([]);

//   useEffect(() => {
//     getPublicPackages().then(setPackages);
//   }, []);

//   return (
//     <div className="grid md:grid-cols-3 gap-6">
//       {packages.map((pkg) => (
//         <div key={pkg._id} className="bg-white rounded-2xl p-6">
//           <h3 className="text-lg font-semibold">{pkg.name}</h3>
//           <p className="text-gray-500">{pkg.duration}</p>
//           <p className="text-2xl font-bold mt-2">₦{pkg.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
