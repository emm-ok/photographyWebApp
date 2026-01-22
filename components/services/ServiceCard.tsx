"use client"

import { motion } from "framer-motion"
import { fadeUp } from "@/lib/motion"

interface ServiceCardProps {
  title: string
  description: string
}

export default function ServiceCard({
  title,
  description,
}: ServiceCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="p-8 rounded-2xl bg-white dark:bg-neutral-900 shadow-sm"
    >
      <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
    </motion.div>
  )
}
