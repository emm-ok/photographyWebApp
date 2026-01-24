"use client";

import { motion } from "framer-motion";

export default function BookingCTA() {
  return (
    <section className="relative py-24 overflow-hidden bg-background">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-muted blur-3xl opacity-60 dark:opacity-30" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          relative
          max-w-3xl
          mx-auto
          px-6
          text-center
          rounded-3xl
          bg-card
          text-card-foreground
          py-16
        "
      >
        <p className="uppercase tracking-widest text-sm text-muted mb-4">
          Need Guidance?
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading mb-6 leading-tight">
          Not Sure Which Package Fits You?
        </h2>

        <p className="text-base sm:text-lg text-muted mb-10 max-w-xl mx-auto">
          Let’s talk through your ideas and craft a custom photography plan
          tailored to your goals, style, and timeline.
        </p>

        <a
          href="/contact"
          className="
            inline-flex
            items-center
            justify-center
            px-8
            py-4
            rounded-full
            bg-white
            text-neutral-800
            shadow-md
            font-medium
            transition-all
            duration-300
            hover:scale-[1.03]
            hover:shadow-lg
            active:scale-[0.97]
          "
        >
          Contact Me
        </a>
      </motion.div>
    </section>
  );
}
