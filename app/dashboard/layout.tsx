"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  User,
  LogOut,
  Box,
  Users,
  GalleryHorizontal,
  X,
  LayoutDashboardIcon,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import DashNavbar from "@/components/dashboard/DashNavbar";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading]);

  if (loading || !user) return null;

  const userNavItems = [
    { name: "Overview", href: "/dashboard/user", icon: LayoutDashboard },
    { name: "My Bookings", href: "/dashboard/user/bookings", icon: CalendarCheck },
    { name: "Profile", href: "/dashboard/user/profile", icon: User },
    { name: "Gallery", href: "/dashboard/user/gallery", icon: GalleryHorizontal },
  ];

  const adminNavItems = [
    { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { name: "My Bookings", href: "/dashboard/admin/bookings", icon: CalendarCheck },
    { name: "Profile", href: "/dashboard/admin/profile", icon: User },
    { name: "Users", href: "/dashboard/admin/users", icon: Users },
    { name: "Packages", href: "/dashboard/admin/packages", icon: Box },
  ];

  interface NavItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ size?: number }>;
  }

  const navLinks = (items: NavItem[]) =>
    items.map((item) => {
      const Icon = item.icon;
      const isActive = pathname === item.href;

      return (
        <Link
          key={item.name}
          href={item.href}
          onClick={() => setOpen(false)}
          className={`
            flex items-center gap-3 text-sm px-4 py-3 rounded-lg transition
            ${isActive 
              ? "bg-primary text-primary-foreground font-semibold" 
              : "text-foreground/80 hover:bg-gray-200"}
          `}
        >
          <Icon size={18} />
          {item.name}
        </Link>
      );
    });

  return (
    <>
      {/* Navbar */}
      <DashNavbar />

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-card text-card-foreground shadow-[var(--shadow)] p-2 rounded-lg"
        aria-label="Open Dashboard Menu"
      >
        <LayoutDashboardIcon />
      </button>

      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 dark:bg-white/20 md:hidden"
        />
      )}

      {/* Layout */}
      <div className="min-h-screen md:grid md:grid-cols-[200px_1fr] bg-background text-foreground transition-colors duration-300">
        {/* Sidebar */}
        <aside
          className={`
            fixed md:static top-0 left-0 z-50
            h-full w-[200px] bg-background text-card-foreground shadow-md]
            flex flex-col justify-between px-4 py-8
            transform transition-transform duration-300 ease-in-out
            ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          `}
        >
          <div>
            {/* Mobile Close Button & Logo */}
            <div className="flex items-center justify-between mb-6">
              
              <button onClick={() => setOpen(false)} className="md:hidden">
                <X />
              </button>
            </div>

            <h2 className="text-lg font-semibold mb-6">Dashboard</h2>

            <nav className="flex flex-col gap-1">
              {user.role === "admin" ? navLinks(adminNavItems) : navLinks(userNavItems)}
            </nav>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-800 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="p-4 md:p-6">
          <section className="bg-card dark:bg-card rounded-xl p-4 md:p-6 min-h-[calc(100vh-4rem)] shadow-[var(--shadow)] transition-colors duration-300">
            {children}
          </section>
        </main>
      </div>
    </>
  );
}
