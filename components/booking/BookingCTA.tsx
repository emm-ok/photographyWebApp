"use client"

import { motion } from "framer-motion"

export default function BookingCTA() {
  return (
    <section className="py-24 text-center bg-neutral-100 dark:bg-neutral-900">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto px-6"
      >
        <h2 className="text-4xl font-bold mb-6">
          Not sure which package to choose?
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-10">
          Let’s discuss your vision and create a custom plan.
        </p>
        <a
          href="/contact"
          className="inline-block px-8 py-4 rounded-full bg-black text-white dark:bg-white dark:text-black font-medium"
        >
          Contact Me
        </a>
      </motion.div>
    </section>
  )
}
