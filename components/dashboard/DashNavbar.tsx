"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion, Variants, Transition } from "framer-motion";
import { useEffect, useState } from "react";
import ThemeToggle from "../ui/ThemeToggle";
import ProfileDropdown from "../layout/ProfileDropdown";

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

// Drawer animation
const drawerTransition: Transition = { type: "spring", stiffness: 300, damping: 30 };
export const drawerVariants: Variants = { hidden: { x: 300 }, visible: { x: 0, transition: drawerTransition } };

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
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 w-full bg-background text-foreground shadow-sm backdrop-blur-md">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">

          {/* Left: Logo */}
          <div className="text-xl font-bold ml-12">
            <Link href="/">PhotoPro</Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {!user ? (
              <Link
                href="/login"
                className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition"
              >
                Sign In
              </Link>
            ) : (
              <ProfileDropdown user={{ ...user, image: user.image || undefined }} />
            )}
            <ThemeToggle />

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
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
              className="fixed inset-0 z-40 bg-black/40 dark:bg-white/20"
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
              className="fixed right-0 top-0 h-full w-[85%] max-w-sm p-6 z-50 bg-card text-card-foreground shadow-[var(--shadow)]"
            >
              <div className="flex items-center justify-between">
                <ThemeToggle />
                <button onClick={() => setMobileOpen(false)}>
                  <X size={24} />
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
                      className={`flex w-full items-center justify-between text-lg font-medium ${
                        isActive(link.href) ? "text-primary" : "text-foreground/80"
                      }`}
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
                          className="ml-4 mt-2 overflow-hidden flex flex-col gap-1"
                        >
                          {link.sublink.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setMobileOpen(false)}
                              className="block py-2 px-3 text-sm text-foreground/70 hover:bg-muted rounded-lg transition"
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
