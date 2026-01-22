"use client"

import { motion } from "framer-motion"
import { fadeUp } from "@/lib/motion"

const steps = [
  "Consultation & Planning",
  "Creative Direction",
  "Professional Shoot",
  "Editing & Delivery",
]

export default function ProcessSection() {
  return (
    <section className="py-24 bg-white dark:bg-neutral-900">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl font-heading text-center mb-16"
        >
          My Creative Process
        </motion.h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold mb-3">
                {index + 1}
              </div>
              <p className="text-neutral-600 dark:text-neutral-400">
                {step}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
