'use client'

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface MotionFadeProps {
  children: ReactNode
  delay?: number
}

export default function MotionFade({
  children,
  delay = 0,
}: MotionFadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 1,
        ease: "easeOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
