"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import MotionReveal from "../ui/MotionReveal";

export default function ServicesHero() {
  return (
    <MotionReveal>
      <section className="min-h-[70vh] flex flex-col items-start px-10 justify-center bg-neutral-950 text-white">
        <h1 className="text-5xl md:text-6xl font-heading mb-6">
          Photography Services
        </h1>
        <p className="text-neutral-500 text-lg">
          Premium photography crafted for brands, individuals, and moments that
          deserve to be remembered.
        </p>
      </section>
    </MotionReveal>
  );
}
