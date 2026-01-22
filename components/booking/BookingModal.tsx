"use client"

import { motion, AnimatePresence } from "framer-motion"
import BookingForm from "./BookingForm"
import SubscribeForm from "./SubscribeForm"
import { BookingPackage } from "@/lib/bookingData"

interface Props {
  open: boolean
  onClose: () => void
  pkg: BookingPackage
}

export default function BookingModal({ open, onClose, pkg }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-lg rounded-3xl bg-white dark:bg-neutral-900 p-8"
          >
            <h2 className="text-2xl font-semibold mb-1">
              {pkg.type === "subscription" ? "Subscribe" : "Book a Session"}
            </h2>
            <p className="text-neutral-500 mb-6">{pkg.name}</p>

            {pkg.type === "subscription" ? (
              <SubscribeForm pkg={pkg} onClose={onClose} />
            ) : (
              <BookingForm pkg={pkg} onClose={onClose} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
