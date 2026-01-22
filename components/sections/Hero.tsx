"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import Container from "../layout/Container";
import Button from "../ui/Button";
import MotionFade from "../ui/MotionFade";

import hero1 from "@/public/images/packages/event.jpg"
import hero2 from "@/public/images/packages/lifestyle.jpg";
import hero3 from "@/public/img13.jpg";
import hero4 from "@/public/img12.jpg";
import hero5 from "@/public/img11.jpg";
import heroMobile1 from "@/public/images/packages/portrait.jpg";
import heroMobile2 from "@/public/images/packages/wedding.jpg";

const DESKTOP_IMAGES = [hero1, hero2, hero3, hero4, hero5];
const MOBILE_IMAGES = [heroMobile1, heroMobile2];

export default function Hero() {
  const [index, setIndex] = useState(0);
  // const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const images = isMobile ? MOBILE_IMAGES : DESKTOP_IMAGES;

  /* Detect mobile */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* Auto play */
  useEffect(() => {
    // if (paused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [ images.length]);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <section
      className="relative min-h-[80%] overflow-hidden text-white mt-16 p-12"
      // onMouseEnter={() => setPaused(true)}
      // onMouseLeave={() => setPaused(false)}
    >
      {/* ===== BACKGROUND SLIDER ===== */}
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        >
          <Image
            src={images[index]}
            alt="Hero background"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* ===== CONTENT ===== */}
      <Container>
        <div className="h-[500px] relative z-20 grid md:grid-cols-2 gap-40 items-center">
          <MotionFade>
            <div>
              <p className="uppercase tracking-widest text-sm text-white/80 mb-4">
                Professional Photographer
              </p>

              <h1 className="font-heading text-3xl md:text-4xl leading-[1.1] mb-6">
                Capturing Moments <br /> That Live Forever
              </h1>

              <p className="text-lg text-white/90 max-w-md mb-10">
                Timeless wedding, lifestyle, and editorial photography crafted
                with emotion and authenticity.
              </p>

              <Link href="/bookSession">
                <Button variant="secondary">Book Session</Button>
              </Link>
            </div>
          </MotionFade>
        </div>
      </Container>

      {/* ===== CONTROLS ===== */}
      <div className="absolute z-20 bottom-10 right-10 flex gap-3">
        <button
          onClick={prev}
          className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={next}
          className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}
