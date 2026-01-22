// "use client";

// import { useEffect, useState } from "react";
// import { getAdminPackages, archivePackage, deletePackage } from "@/lib/package";
// import AdminPackageCard from "@/components/package/AdminPackageCard";
// import CreatePackagePage from "@/components/package/CreatePackagePage";

// export default function AdminPackagesPage() {
//   const [packages, setPackages] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [editing, setEditing] = useState(null);

//   const fetchPackages = async () => {
//     const data = await getAdminPackages();
//     setPackages(data);
//     console.log(packages);
//   };
//   useEffect(() => {
//     fetchPackages();
//   }, []);

//   return (
//     <div className="space-y-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-semibold">Manage Packages</h1>

//         <button
//           onClick={() => {
//             setEditing(null);
//             setOpen(true);
//           }}
//           className="bg-black text-white px-4 py-2 rounded-xl"
//         >
//           + New Package
//         </button>
//       </div>

//       {/* LIST */}
//       <div className="space-y-4">
//         {packages.map((pkg) => (
//           <AdminPackageCard
//             key={pkg._id}
//             pkg={pkg}
//             onEdit={() => {
//               setEditing(pkg);
//               setOpen(true);
//             }}
//             onArchive={async () => {
//               await archivePackage(pkg._id);
//               fetchPackages();
//             }}
//             onDelete={async () => {
//               await deletePackage(pkg._id);
//               fetchPackages();
//             }}
//           />
//         ))}
//       </div>

//       {/* MODAL */}
//       <CreatePackagePage
//         open={open}
//         initialData={editing}
//         onClose={() => setOpen(false)}
//         onSuccess={fetchPackages}
//       />
//     </div>
//   );
// }
