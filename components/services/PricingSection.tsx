"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export default function PricingSection() {
  return (
    <section className="py-24 bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Section Heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-heading mb-6"
        >
          Transparent Pricing
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="text-muted mb-12 text-md md:text-lg leading-relaxed"
        >
          Every project is unique. Pricing is tailored based on scope, location,
          and creative requirements. We offer clear packages so you know exactly
          what to expect.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={fadeUp}>
          <a
            href="/contact"
            className="
              inline-block
              px-8
              py-4
              rounded-full
              bg-white
              text-neutral-800
              font-semibold
              shadow-lg
              hover:shadow-xl
              transition
              duration-300
            "
          >
            Request a Quote
          </a>
        </motion.div>
      </div>
    </section>
  );
}
