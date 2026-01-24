"use client"

import { motion } from "framer-motion"
import { fadeUp } from "@/lib/motion"

export default function ServicesCTA() {
  return (
    <section className="py-32 bg-background text-foreground">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto px-6"
      >
        <h2 className="text-4xl font-heading mb-6">
          Ready to Work Together?
        </h2>
        <p className="mb-10">
          Let’s create images that elevate your story and brand.
        </p>
        <a
          href="/contact"
          className="px-10 py-4 font-medium rounded-full shadow-md bg-white text-neutral-800"
        >
          Contact Me
        </a>
      </motion.div>
    </section>
  )
}
