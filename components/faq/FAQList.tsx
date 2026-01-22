"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { fadeUp } from "@/lib/motion"
import FAQItem from "./FAQItem"
import FAQSearch from "./FAQSearch"
import { faqData } from "@/lib/faqData"

export default function FAQList() {
  const [query, setQuery] = useState("")

  const filteredFAQs = useMemo(() => {
    return faqData.filter((faq) =>
      faq.question.toLowerCase().includes(query.toLowerCase())
    )
  }, [query])

  return (
    <section className="py-24 bg-white dark:bg-neutral-950">
      <div className="max-w-3xl mx-auto px-6">
        <FAQSearch value={query} onChange={setQuery} />

        <AnimatePresence>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            layout
          >
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => (
                <FAQItem key={faq.question} {...faq} />
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-neutral-500 text-center mt-10"
              >
                No matching questions found.
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
