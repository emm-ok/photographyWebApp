"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({
  children,
}: PageTransitionProps) {
  return (
    <motion.div
      // initial={{ opacity: 0, y: 16 }}
      // animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0, y: -16 }}
      // transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
