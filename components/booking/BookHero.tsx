"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import Image from "next/image";
import heroImage from "@/public/img9.jpg"; // Replace with an actual hero image
import { ArrowDown } from "lucide-react";

export default function BookHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-background text-foreground">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Photography session hero"
          fill
          className="object-cover object-center brightness-90 dark:brightness-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 dark:from-black/50 dark:via-transparent dark:to-black/50" />
      </div>

      {/* Content */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
      >
        <h1 className="text-5xl md:text-6xl text-white font-heading font-bold mb-6">
          Book Your Photography Session
        </h1>
        <p className="text-lg md:text-xl text-white mb-10">
          Choose a session or subscription package that fits your vision. Capture
          moments, create memories, and let your story shine through.
        </p>

        <a
          href="/bookSession"
          className="
            inline-block
            px-8
            py-4
            mb-10
            rounded-full
            bg-background
            text-background
            font-semibold
            shadow-lg
            hover:shadow-xl
            transition
            duration-300
          "
        >
          Book Now
        </a>
        <div className="flex items-center justify-center">
          <ArrowDown />
        </div>
      </motion.div>
    </section>
  );
}
