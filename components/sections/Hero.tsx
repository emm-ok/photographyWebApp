"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import Container from "../layout/Container";
import Button from "../ui/Button";
import MotionFade from "../ui/MotionFade";

// ---------------- IMAGES ----------------
import img7 from "@/public/images/packages/event.jpg";
import img1 from "@/public/img1.jpg";
import img2 from "@/public/images/packages/lifestyle.jpg";
import img3 from "@/public/images/packages/portrait.jpg";
import img4 from "@/public/images/packages/wedding.jpg";
import img5 from "@/public/img5.jpg";
import img6 from "@/public/img6.jpg";
import img8 from "@/public/img8.jpg";
import img9 from "@/public/img9.jpg";
import img10 from "@/public/img10.jpg";
import img11 from "@/public/img11.jpg";
import img12 from "@/public/img12.jpg";
import img13 from "@/public/img13.jpg";

// ---------------- IMAGE GROUPS ----------------
const IMAGE_GROUPS: StaticImageData[][] = [
  [img1, img2, img3],
  [img4, img5, img6],
  [img2, img6, img7],
  [img8, img9, img10],
  [img11, img12, img13],
];

// ---------------- TIMINGS (STAGGERED) ----------------
const INTERVALS = [5000, 6500, 8000, 9500];

// ---------------- IMAGE BOX ----------------
function ImageBox({
  images,
  interval,
  className,
}: {
  images: StaticImageData[];
  interval: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Independent rotation per box
  useEffect(() => {
    const timer = setInterval(() => {
      setLoaded(false);
      setIndex((i) => (i + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-muted ${className}`}
    >
      {/* Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-border" />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: loaded ? 1 : 0, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt="Photography sample"
            fill
            className="object-cover"
            onLoad={() => setLoaded(true)}
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ---------------- HERO ----------------
export default function Hero() {
  return (
    <section className="bg-background text-foreground py-28">
      <Container>
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* ===== LEFT: TEXT ===== */}
          <MotionFade>
            <div className="text-center">
              <p className="uppercase tracking-widest text-sm text-muted mb-4">
                Professional Photographer
              </p>

              <h1 className="font-heading font-bold text-4xl md:text-5xl leading-tight mb-6">
                Capturing Moments <br /> That Live Forever
              </h1>

              <p className="text-lg text-muted mb-10">
                Timeless wedding, lifestyle, and editorial photography crafted
                with emotion and authenticity.
              </p>

              <Link href="/bookSession" className="cursor-pointer">
                <Button variant="secondary">Book Session</Button>
              </Link>
            </div>
          </MotionFade>

          {/* ===== RIGHT: IMAGE MOSAIC ===== */}
          <div className="grid grid-cols-2 gap-6 relative">
            <ImageBox
              images={IMAGE_GROUPS[0]}
              interval={INTERVALS[0]}
              className="h-56"
            />

            <ImageBox
              images={IMAGE_GROUPS[1]}
              interval={INTERVALS[1]}
              className="h-72 mt-12"
            />

            <ImageBox
              images={IMAGE_GROUPS[2]}
              interval={INTERVALS[2]}
              className="h-72 -mt-12"
            />

            <ImageBox
              images={IMAGE_GROUPS[3]}
              interval={INTERVALS[3]}
              className="h-56"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
