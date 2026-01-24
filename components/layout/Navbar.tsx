"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";
import { Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion, Variants, Transition } from "framer-motion";
import { useEffect, useState } from "react";
import ThemeToggle from "../ui/ThemeToggle";

type NavLink = {
  name: string;
  href: string;
  sublink?: { name: string; href: string }[];
};

const LINKS: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about", sublink: [{ name: "Portfolio", href: "/portfolio" }] },
  { name: "Service", href: "/service", sublink: [{ name: "Book Session", href: "/bookSession" }] },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

const drawerTransition: Transition = { type: "spring", stiffness: 300, damping: 30 };
const drawerVariants: Variants = { hidden: { x: 300 }, visible: { x: 0, transition: drawerTransition } };
const fadeVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };

export default function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="fixed top-0 w-full z-50 bg-white dark:bg-neutral-900 md:bg-white/70 md:dark:bg-neutral-900/70 md:backdrop-blur-md shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-neutral-800 dark:text-white">
            PhotoPro
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {LINKS.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  {link.name}
                  {link.sublink && <ChevronDown size={16} />}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {link.sublink && openDropdown === link.name && (
                    <motion.div
                      variants={fadeVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="absolute left-0 mt-3 w-48 rounded-md bg-white dark:bg-neutral-800 shadow-lg"
                    >
                      {link.sublink.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            isActive(sub.href)
                              ? "font-semibold text-neutral-900 dark:text-white"
                              : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                          }`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {!user ? (
              <Link
                href="/login"
                className="rounded-md bg-neutral-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-gray-100 transition-colors"
              >
                Sign In
              </Link>
            ) : (
              <ProfileDropdown user={user} />
            )}
            <ThemeToggle />

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 text-neutral-800 dark:text-white"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu />
            </button>
          </div>
        </div>
      </nav>

      {/* ===== MOBILE DRAWER ===== */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed right-0 top-0 h-full w-[85%] max-w-sm p-6 z-50 bg-background text-foreground shadow-xl"
            >
              <div className="flex items-center justify-between">
                <ThemeToggle />
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X />
                </button>
              </div>

              <div className="mt-8 flex flex-col gap-5">
                {LINKS.map((link) => (
                  <div key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() =>
                        setOpenDropdown(openDropdown === link.name ? null : link.name)
                      }
                      className="flex w-full items-center justify-between text-lg font-medium"
                    >
                      {link.name}
                      {link.sublink && <ChevronDown size={18} />}
                    </Link>

                    <AnimatePresence>
                      {link.sublink && openDropdown === link.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="ml-4 mt-2 overflow-hidden flex flex-col gap-2"
                        >
                          {link.sublink.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setMobileOpen(false)}
                              className="block py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
