import { Instagram, Phone, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="py-12 bg-neutral-950 text-neutral-400">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p>© {new Date().getFullYear()} Manuel&apos;s Photography</p>

        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-white transition">
           <Instagram />
          </a>
          <a href="#" className="hover:text-white transition">
            <Twitter />
          </a>
          <a href="#" className="hover:text-white transition">
            <Phone />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
