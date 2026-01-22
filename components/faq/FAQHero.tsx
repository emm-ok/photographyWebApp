"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import MotionReveal from "../ui/MotionReveal";

export default function FAQHero() {
  return (
    <MotionReveal>
      <section className="py-28 px-10 bg-neutral-950 text-white">
        <h1 className="text-5xl md:text-6xl font-heading mb-6">
          Frequently Asked Questions
        </h1>
        <p className="text-neutral-500 text-lg">
          Everything you need to know before booking your photography session.
        </p>
      </section>
    </MotionReveal>
  );
}
