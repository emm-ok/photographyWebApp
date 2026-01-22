"use client"

import { motion } from "framer-motion"
import { fadeUp } from "@/lib/motion"

export default function BookHero() {
  return (
    <section className="py-28 text-center bg-neutral-50 dark:bg-neutral-950">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="max-w-3xl mx-auto px-6"
      >
        <h1 className="text-5xl font-bold mb-6">
          Book Your Photography Session
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg">
          Choose a session or subscription package that fits your vision.
        </p>
      </motion.div>
    </section>
  )
}
