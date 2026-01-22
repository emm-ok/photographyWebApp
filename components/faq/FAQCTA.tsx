"use client"

import { motion } from "framer-motion"
import { fadeUp } from "@/lib/motion"

export default function FAQCTA() {
  return (
    <section className="py-28 bg-neutral-900 text-white">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center px-6"
      >
        <h2 className="text-4xl font-heading mb-6">
          Still Have Questions?
        </h2>
        <p className="text-neutral-300 mb-10">
          Feel free to reach out — I’m happy to help you plan your session.
        </p>
        <a
          href="/contact"
          className="inline-block px-10 py-4 rounded-full bg-white text-black"
        >
          Contact Me
        </a>
      </motion.div>
    </section>
  )
}
