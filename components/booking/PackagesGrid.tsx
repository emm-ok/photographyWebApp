"use client";

import { useEffect, useState } from "react";
// import { bookingPackages } from "@/lib/bookingData";
import PackageCard from "./PackageCard";
import SubscriptionToggle from "./SubscriptionToggle";
import { getPublicPackages } from "@/lib/package";
import { Package } from "@/types/package";
import { Skeleton } from "../ui/Skeleton";

export default function PackagesGrid() {
  const [type, setType] = useState<"one-time" | "subscription">("one-time");
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getPublicPackages();
        setPackages(data);
      } catch (err) {
        console.error("Failed to fetch packages", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if(loading) return <Skeleton />
  const filteredPackages = packages.filter((pkg) => pkg.type === type);


  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SubscriptionToggle value={type} onChange={setType} />

        <div className="grid md:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg._id} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
