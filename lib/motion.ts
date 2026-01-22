import { Variants, Easing } from "framer-motion";

const easeOut: Easing = [0.25, 0.1, 0.25, 1]; // cubic-bezier equivalent of easeOut

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: easeOut } 
  },
};
