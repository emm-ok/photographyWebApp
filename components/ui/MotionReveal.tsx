"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface MotionRevealProps {
  children: ReactNode
  delay?: number
}

export default function MotionReveal({
  children,
  delay = 0,
}: MotionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
