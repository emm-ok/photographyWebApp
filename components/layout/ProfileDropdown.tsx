"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";

interface ProfileDropdownProps {
  user: {
    name: string;
    image?: string;
    role: string;
  };
}

export default function ProfileDropdown({ user }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();

  /* ----------------------------------
     Close on outside click (mobile + desktop)
  ---------------------------------- */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? "?";

  /* ----------------------------------
     Animation config
  ---------------------------------- */
  const dropdownAnimation = {
    hidden: { opacity: 0, scale: 0.95, y: -8 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -8 },
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Avatar / Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full bg-neutral-700 text-white flex items-center justify-center cursor-pointer font-semibold focus:outline-none"
      >
        {user?.image ? (
          <Image
            src={user.image}
            alt="User avatar"
            width={40}
            height={40}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden"
          >
            <div className="flex flex-col py-2 text-sm">
              <Link
                href={`/dashboard/${user.role === "admin" ? "admin" : "user"}`}
                className="px-4 py-2 hover:bg-gray-100 transition"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>

              <Link
                href={`/dashboard/${user.role === "admin" ? "admin" : "user"}/profile`}
                className="px-4 py-2 hover:bg-gray-100 transition"
                onClick={() => setIsOpen(false)}
              >
                View / Edit Profile
              </Link>

              {user.role === "admin" && (
                <Link
                  href="/dashboard/admin/bookings"
                  className="px-4 py-2 hover:bg-gray-100 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Manage Bookings
                </Link>
              )}

              <div className="my-1 h-px bg-gray-100" />

              <button
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="text-left px-4 py-2 hover:bg-gray-100 transition text-red-600"
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
