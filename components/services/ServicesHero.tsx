"use client";

import { motion } from "framer-motion";
import MotionReveal from "../ui/MotionReveal";
import Image from "next/image";
import heroImage from "@/public/img8.jpg"; // replace with your actual image

export default function ServicesHero() {
  return (
    <MotionReveal>
      <section className="relative min-h-[70vh] w-full flex items-center bg-background dark:bg-neutral-950 overflow-hidden">
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent dark:from-black/70 z-10"></div>

        <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col-reverse md:flex-row items-center px-6 md:px-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 text-center md:text-left mt-10 md:mt-0"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading mb-4 leading-tight">
              Photography Services
            </h1>
            <p className="text-neutral-600 dark:text-neutral-300 text-lg sm:text-xl md:text-lg max-w-md mx-auto md:mx-0">
              Premium photography crafted for brands, individuals, and moments that deserve to be remembered. Capture your story with creativity, style, and authenticity.
            </p>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2 relative h-64 sm:h-80 md:h-96 rounded-3xl overflow-hidden shadow-xl"
          >
            <Image
              src={heroImage}
              alt="Photography Services"
              fill
              className="object-cover object-center"
              placeholder="blur"
            />
          </motion.div>
        </div>
      </section>
    </MotionReveal>
  );
}
