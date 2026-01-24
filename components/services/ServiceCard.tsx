"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { IconType } from "react-icons";

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: IconType; // optional icon prop
}

export default function ServiceCard({
  title,
  description,
  icon: Icon,
}: ServiceCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="
        group
        p-8
        rounded-2xl
        bg-card
        text-card-foreground
        shadow-md
        hover:shadow-xl
        transition-shadow duration-300
        cursor-pointer
        flex flex-col items-start gap-4
        backdrop-blur-md
      "
    >
      {/* Icon / Image */}
      {Icon && (
        <div className="
          w-12 h-12
          flex items-center justify-center
          rounded-full
          bg-primary/10
          text-primary-foreground
          mb-2
          transition-transform duration-300
          group-hover:scale-110
        ">
          <Icon size={24} />
        </div>
      )}

      {/* Title */}
      <h3 className="text-2xl font-semibold text-foreground mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-muted leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
