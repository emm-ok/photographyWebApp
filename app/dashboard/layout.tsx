"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  User,
  LogOut,
  Box,
  Users,
  GalleryHorizontal,
  Menu,
  X,
  ChevronRight,
  MenuIcon,
  LayoutDashboardIcon,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import DashNavbar from "@/components/dashboard/DashNavbar";
import { useState } from "react";
import { Chevron } from "react-day-picker";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

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

  const navLinks = (items) =>
    items.map((item) => {
      const Icon = item.icon;
      const isActive = pathname === item.href;

      return (
        <Link
          key={item.name}
          href={item.href}
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 text-sm px-3 py-3 rounded-xl transition ${
            isActive
              ? "bg-black text-white"
              : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          <Icon size={18} />
          {item.name}
        </Link>
      );
    });

  return (
    <>
      <DashNavbar />

      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden flex fixed top-4 left-4 z-50 bg-white shadow p-2 rounded-lg"
      >
        <LayoutDashboardIcon />
        
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <div className="z-50 min-h-screen md:grid md:grid-cols-[190px_1fr] bg-gray-50">
        {/* Sidebar */}
        <aside
          className={`
            fixed md:static top-0 left-0 z-50
            h-full w-[190px] bg-white shadow-lg
            flex flex-col justify-between px-4 py-8
            transform transition-transform duration-300
            ${open ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0 md:flex
          `}
        >
          <div>
            {/* Mobile close button */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="text-xl font-bold text-neutral-800">
            PhotoPro
          </Link>
            <button
              onClick={() => setOpen(false)}
              className="md:hidden"
            >
              <X size={22} />
            </button>
          </div>
            {/* Logo */}

            <h2 className="text-lg font-bold mb-6">Dashboard</h2>

            <nav className="space-y-1">
              {user?.role === "admin"
                ? navLinks(adminNavItems)
                : navLinks(userNavItems)}
            </nav>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </aside>

        {/* Main content */}
        <main className="p-4 md:p-6">
          <section className="pt-16 bg-white rounded-2xl shadow-sm p-6 min-h-[calc(100vh-3rem)]">
            {children}
          </section>
        </main>
      </div>
    </>
  );
}
