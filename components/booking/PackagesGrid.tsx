"use client";

import { useEffect, useState } from "react";
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

  if (loading) return <Skeleton />;

  const filteredPackages = packages.filter((pkg) => pkg.type === type);

  return (
    <section className="py-24 bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6">
        {/* Toggle */}
        <SubscriptionToggle value={type} onChange={setType} />

        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPackages.filter(Boolean).map((pkg) => (
            <PackageCard key={pkg._id} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
