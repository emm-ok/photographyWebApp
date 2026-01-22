"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BookingModal from "@/components/booking/BookingModal";
import Image from "next/image";
import { Package } from "@/types/package";

export default function PackageCard(pkg: Package) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative h-[440px] rounded-3xl overflow-hidden group shadow-xl"
      >
        {/* Background Image */}
        <Image
          src={pkg.coverImage || "/placeholder.jpg"}
          alt={pkg.name || "package image"}
          fill
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" />

        {/* Featured Badge */}
        {pkg.featured && (
          <div className="absolute top-5 right-5 z-20">
            <span className="rounded-full bg-white/90 px-4 py-1 text-xs font-semibold text-black shadow">
              ⭐ Featured
            </span>
          </div>
        )}

        {/* Card Content */}
        <div className="relative z-10 flex h-full flex-col justify-between p-7 text-white">
          {/* Header */}
          <div className="">
            <h3 className="text-md md:text-2xl font-bold mb-2 tracking-tight">
              {pkg.name}
            </h3>

            <p className="font-bold text-sm md:text-md text-white/80 leading-relaxed line-clamp-2">
              {pkg.description}
            </p>
          </div>

          {/* Package Details */}
          <div className="mt-6 space-y-3 italic text-white/90 font-medium text-sm md:text-md">
            <div className="flex items-center gap-2">
              <span>⏱</span>
              <span>
                {pkg.duration}{" "}
                {pkg.type === "one-time" ? "Hour Session" : "Sessions / month"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span>📸</span>
              <span>{pkg.imageCount} Professionally Edited Images</span>
            </div>

            <div className="flex items-center gap-2">
              <span>🚀</span>
              <span>Delivery in {pkg.delivery} days</span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-5">
              <p className="text-3xl font-extrabold tracking-tight">
                ${pkg.price.toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="w-full cursor-pointer rounded-xl bg-white text-black py-4 font-semibold transition hover:bg-neutral-200 active:scale-[0.98]"
            >
              {pkg.type === "subscription"
                ? "Subscribe Now"
                : "Book Session"}
            </button>
          </div>
        </div>
      </motion.div>

      <BookingModal
        open={open}
        onClose={() => setOpen(false)}
        pkg={{ ...pkg, delivery: pkg.delivery.toString(), coverImage: pkg.coverImage || "/placeholder.jpg" }}
      />
    </>
  );
}
