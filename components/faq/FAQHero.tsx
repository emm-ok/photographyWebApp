"use client";

import Image from "next/image";
import MotionReveal from "../ui/MotionReveal";
import image from "@/public/img14.jpg"

export default function FAQHero() {
  return (
    <section className="relative min-h-[55vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt="Photography FAQ"
          width={400}
          height={400}
          className="h-full w-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70 dark:bg-black/80" />
      </div>

      {/* Content */}
      <MotionReveal>
        <div className="relative z-10 w-full">
          <div className="max-w-6xl mx-auto px-6 py-28 text-white">
            {/* Eyebrow */}
            <p className="uppercase tracking-widest text-sm text-neutral-400 mb-4">
              FAQ
            </p>

            {/* Heading */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl mb-6">
              Frequently Asked Questions
            </h1>

            {/* Description */}
            <p className="max-w-2xl text-lg text-neutral-300">
              Everything you need to know before booking your photography
              session — from preparation and pricing to delivery timelines.
            </p>

            {/* Accent Line */}
            <div className="mt-10 h-px w-24 bg-white/40" />
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
