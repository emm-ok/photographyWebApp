"use client"

import { motion } from "framer-motion"
import ServiceCard from "./ServiceCard"

const services = [
  {
    title: "Portrait Photography",
    description:
      "Professional portraits for individuals, creatives, and executives.",
  },
  {
    title: "Wedding Photography",
    description:
      "Timeless storytelling capturing emotions, details, and moments.",
  },
  {
    title: "Commercial Photography",
    description:
      "High-end imagery for brands, products, and marketing campaigns.",
  },
  {
    title: "Event Coverage",
    description:
      "Corporate and private event documentation with a cinematic touch.",
  },
]

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-10"
        >
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
