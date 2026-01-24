"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FAQItem from "./FAQItem";
import FAQSearch from "./FAQSearch";
import { faqData } from "@/lib/faqData";

export default function FAQList() {
  const [query, setQuery] = useState("");

  const filteredFAQs = useMemo(() => {
    return faqData.filter((faq) =>
      faq.question.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <section className="relative py-28 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <FAQSearch value={query} onChange={setQuery} />
        </motion.div>

        {/* FAQ Items */}
        <AnimatePresence mode="wait">
          {filteredFAQs.length > 0 ? (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                >
                  <FAQItem {...faq} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-20"
            >
              <p className="text-neutral-500 text-lg">
                No matching questions found.
              </p>
              <p className="text-neutral-400 text-sm mt-2">
                Try searching with a different keyword.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
