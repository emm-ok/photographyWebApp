"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const steps = [
  "Consultation & Planning",
  "Creative Direction",
  "Professional Shoot",
  "Editing & Delivery",
];

export default function ProcessSection() {
  return (
    <section className="py-24 bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-heading text-center mb-20"
        >
          My Creative Process
        </motion.h2>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-2 md:grid-cols-4 items-center justify-between gap-12 md:gap-0">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="flex flex-col items-center text-center relative"
            >
              {/* Step Circle */}
              <div className="
                w-16 h-16
                flex items-center justify-center
                rounded-full
                bg-gradient-to-tr from-primary/80 to-primary-foreground/30
                shadow-lg
                text-background
                text-xl font-bold
                mb-4
                transition-transform duration-300
                group-hover:scale-110
              ">
                {index + 1}
              </div>

              {/* Step Text */}
              <p className="text-muted leading-relaxed max-w-xs">
                {step}
              </p>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 right-[-50%] w-1/2 h-1 bg-muted/40"></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile Connector Lines */}
        <div className="md:hidden flex flex-col items-center mt-12 gap-12">
          {steps.slice(0, -1).map((_, i) => (
            <div key={i} className="w-px h-12 bg-muted/40 mx-auto"></div>
          ))}
        </div>
      </div>
    </section>
  );
}
