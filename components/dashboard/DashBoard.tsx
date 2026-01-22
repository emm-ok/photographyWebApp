"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "../ui/Skeleton";

// ============================
// UI PRIMITIVES
// ============================

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-neutral-900 p-5 sm:p-6 border border-neutral-100 dark:border-neutral-800">
      {children}
    </div>
  );
}

function KPICard({ title, value }: { title: string; value: number | string }) {
  return (
    <Card>
      <p className="text-xs text-neutral-500">{title}</p>
      <h3 className="text-2xl sm:text-3xl font-semibold mt-2">{value}</h3>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-green-100 text-green-800",
    COMPLETED: "bg-neutral-200 text-neutral-800",
    FAILED: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        colors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

// ============================
// API LAYER
// ============================

const API = process.env.NEXT_PUBLIC_API_URL;

async function fetchJSON(url: string) {
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

const DashboardAPI = {
  userOverview: () => fetchJSON(`${API}/api/dashboard/user`),
  adminOverview: () => fetchJSON(`${API}/api/dashboard/admin`),
};

// ============================
// SKELETON STATES
// ============================

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-7 w-1/2" />
        <Skeleton className="h-4 w-3/4 mt-2" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-[260px] rounded-2xl" />
        <Skeleton className="h-[260px] rounded-2xl" />
      </div>
    </div>
  );
}

// ============================
// USER DASHBOARD
// ============================

function UserDashboard({ data }: { data: any }) {
  return (
    <>
      {/* KPI */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Bookings" value={data?.stats?.totalBookings} />
        <KPICard title="Upcoming Sessions" value={data?.stats?.upcomingSessions} />
        <KPICard title="Completed Projects" value={data?.stats?.completedProjects} />
        <KPICard title="Pending Payments" value={data?.stats?.pendingPayments} />
      </section>

      {/* Charts + List */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h4 className="font-medium mb-4">Bookings Over Time</h4>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data?.chart || []}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#000" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h4 className="font-medium mb-4">Upcoming Bookings</h4>

          <div className="space-y-3">
            {data?.upcomingBookings?.length ? (
              data.upcomingBookings.map((b: any) => (
                <Link
                  key={b._id}
                  href={`/dashboard/user/bookings/${b._id}`}
                  className="block"
                >
                  <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition">
                    <div className="flex items-center gap-3">
                      <Image
                        src={b.package.coverImage}
                        width={40}
                        height={40}
                        alt=""
                        className="rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm">{b.package.name}</p>
                        <p className="text-xs text-neutral-500">
                          {b.sessionDate}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={b.status} />
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-sm text-neutral-500">No upcoming bookings</p>
            )}
          </div>
        </Card>
      </section>
    </>
  );
}

// ============================
// ADMIN DASHBOARD
// ============================

function AdminDashboard({ data }: { data: any }) {
  const COLORS = ["#000", "#777", "#bbb"];

  return (
    <>
      {/* KPI */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard title="Users" value={data?.stats?.totalUsers} />
        <KPICard title="Bookings" value={data?.stats?.totalBookings} />
        <KPICard title="Revenue" value={`$${data?.stats?.revenue}`} />
        <KPICard title="Pending Approvals" value={data?.stats?.pendingApprovals} />
        <KPICard title="Completed" value={data?.completedBookings} />
        <KPICard title="Failed Payments" value={data?.failedPayments} />
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h4 className="font-medium mb-4">Revenue Overview</h4>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data?.revenueChart || []}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#000" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h4 className="font-medium mb-4">Bookings by Status</h4>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={data?.statusBreakdown || []}
                dataKey="value"
                nameKey="status"
                outerRadius={80}
              >
                {data?.statusBreakdown?.map((_: any, i: number) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </section>
    </>
  );
}

// ============================
// MAIN PAGE
// ============================

export default function DashboardPage({
  role,
  userName,
}: {
  role: "user" | "admin";
  userName?: string;
}) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res =
          role === "admin"
            ? await DashboardAPI.adminOverview()
            : await DashboardAPI.userOverview();
        setData(res);
        console.log(res)
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [role]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      <header>
        <h1 className="text-2xl font-semibold">
          {role === "admin" ? "Admin Dashboard" : `Welcome back, ${userName} 👋`}
        </h1>
        <p className="text-neutral-500 text-sm">
          {role === "admin"
            ? "System overview and performance"
            : "Your bookings and recent activity"}
        </p>
      </header>

      {loading ? (
        <DashboardSkeleton />
      ) : role === "admin" ? (
        <AdminDashboard data={data} />
      ) : (
        <UserDashboard data={data} />
      )}
    </main>
  );
}
