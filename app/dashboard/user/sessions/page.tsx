// "use client";

// import { useEffect, useState } from "react";
// import { getPublicPackages } from "@/lib/package";
// import UserPackageCard from "@/components/package/UserPackageCard";

// export default function PackagesPage() {
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getPublicPackages()
//       .then(setPackages)
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <p>Loading packages...</p>;

//   return (
//     <section className="max-w-7xl mx-auto px-6 py-12">
//       <h1 className="text-3xl font-bold mb-8 text-center">
//         Photography Packages
//       </h1>

//       <div className="grid md:grid-cols-3 gap-8">
//         {packages.map((pkg) => (
//           <UserPackageCard key={pkg._id} pkg={pkg} />
//         ))}
//       </div>
//     </section>
//   );
// }
