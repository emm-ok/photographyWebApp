"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface FAQItemProps {
  question: string
  answer: string
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-neutral-200 dark:border-neutral-800">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-6 flex justify-between items-center text-left"
      >
        <span className="text-lg font-medium">{question}</span>
        <span className="text-2xl">{open ? "–" : "+"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-neutral-600 dark:text-neutral-400">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
