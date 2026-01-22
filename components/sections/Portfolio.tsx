"use client";

import Section from "../layout/Section";
import Container from "../layout/Container";
import { motion } from "framer-motion";
import Image from "next/image";

import image1 from "@/public/img13.jpg";
import image2 from "@/public/img12.jpg";
import image3 from "@/public/img11.jpg";
import image4 from "@/public/img10.jpg";
import image5 from "@/public/img5.jpg";
import image6 from "@/public/img6.jpg";

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Portfolio() {
  return (
    <Section>
      <Container>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-4xl text-center mb-16">
            Selected Work
          </h2>

          {/* Masonry Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="
              columns-1
              sm:columns-2
              lg:columns-3
              gap-6
            "
          >
            {images.map((img, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="mb-6 break-inside-avoid"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                  <Image
                    src={img}
                    alt={`Portfolio ${index + 1}`}
                    placeholder="blur"
                    priority={index < 2}
                    sizes="
                      (max-width: 640px) 100vw,
                      (max-width: 1024px) 50vw,
                      33vw
                    "
                    className="
                      w-full
                      h-auto
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
