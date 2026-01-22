"use client"

import { motion } from "framer-motion"
import { fadeUp } from "@/lib/motion"

export default function PricingSection() {
  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl font-heading mb-6"
        >
          Transparent Pricing
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-neutral-600 dark:text-neutral-400 mb-12"
        >
          Every project is unique. Pricing is tailored based on scope, location,
          and creative requirements.
        </motion.p>

        <motion.div variants={fadeUp}>
          <a
            href="/contact"
            className="inline-block px-8 py-4 rounded-full bg-black text-white dark:bg-white dark:text-black"
          >
            Request a Quote
          </a>
        </motion.div>
      </div>
    </section>
  )
}
