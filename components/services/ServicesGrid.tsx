"use client";

import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";
import { FaCameraRetro, FaHeart, FaBuilding, FaUsers } from "react-icons/fa";

const services = [
  {
    title: "Portrait Photography",
    description:
      "Professional portraits for individuals, creatives, and executives.",
    icon: FaCameraRetro,
  },
  {
    title: "Wedding Photography",
    description:
      "Timeless storytelling capturing emotions, details, and moments.",
    icon: FaHeart,
  },
  {
    title: "Commercial Photography",
    description:
      "High-end imagery for brands, products, and marketing campaigns.",
    icon: FaBuilding,
  },
  {
    title: "Event Coverage",
    description:
      "Corporate and private event documentation with a cinematic touch.",
    icon: FaUsers,
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-background dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-muted uppercase tracking-wide text-sm mb-2">
            Our Services
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-5xl">
            What We Offer
          </h2>
          <p className="text-muted mt-4">
            Explore our range of photography services crafted to capture moments with creativity, authenticity, and style.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-10"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
