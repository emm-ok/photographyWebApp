"use client";

import { motion, AnimatePresence } from "framer-motion";
import BookingForm from "./BookingForm";
import SubscribeForm from "./SubscribeForm";
import { BookingPackage } from "@/lib/bookingData";

interface Props {
  open: boolean;
  onClose: () => void;
  pkg: BookingPackage;
}

export default function BookingModal({ open, onClose, pkg }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-3"
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-background p-4 md:p-6"
          >
            <h2 className="text-base md:text-lg font-semibold">
              {pkg.type === "subscription" ? "Subscribe" : "Book Session"}
            </h2>
            <p className="text-xs text-zinc-500 mb-4">{pkg.name}</p>

            {pkg.type === "subscription" ? (
              <SubscribeForm pkg={pkg} onClose={onClose} />
            ) : (
              <BookingForm pkg={pkg} onClose={onClose} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
