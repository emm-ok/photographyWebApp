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
    <div className="rounded-2xl bg-card text-card-foreground p-6 shadow-[var(--shadow)]">
      {children}
    </div>
  );
}

function KPICard({ title, value }: { title: string; value: number | string }) {
  return (
    <Card>
      <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        {title}
      </p>
      <h3 className="text-3xl font-semibold mt-3 text-foreground">{value}</h3>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PENDING: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]",
    CONFIRMED: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
    COMPLETED: "bg-muted text-foreground",
    FAILED: "bg-[hsl(var(--danger))]/10 text-[hsl(var(--danger))]",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status]}`}
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
    <div className="space-y-10">
      <div>
        <Skeleton className="h-7 w-1/3" />
        <Skeleton className="h-4 w-2/3 mt-3" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-2xl" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-[300px] rounded-2xl" />
        <Skeleton className="h-[300px] rounded-2xl" />
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
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Bookings" value={data?.stats?.totalBookings} />
        <KPICard title="Upcoming Sessions" value={data?.stats?.upcomingSessions} />
        <KPICard title="Completed Projects" value={data?.stats?.completedProjects} />
        <KPICard title="Pending Payments" value={data?.stats?.pendingPayments} />
      </section>

      {/* Charts + List */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <h4 className="font-medium mb-4 text-sm text-neutral-500">
            Bookings Over Time
          </h4>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data?.chart || []}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="hsl(var(--foreground))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h4 className="font-medium mb-4 text-sm text-neutral-500">Upcoming Bookings</h4>

          <div className="space-y-3">
            {data?.upcomingBookings?.length ? (
              data.upcomingBookings.map((b: any) => (
                <Link
                  key={b._id}
                  href={`/dashboard/user/bookings/${b._id}`}
                  className="block"
                >
                  <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-muted hover:opacity-80 transition">
                    <div className="flex items-center gap-3">
                      <Image
                        src={b.package.coverImage}
                        width={44}
                        height={44}
                        alt=""
                        className="rounded-full object-cover ring-1 ring-border"
                      />
                      <div>
                        <p className="font-medium text-sm text-foreground">
                          {b.package.name}
                        </p>
                        <p className="text-xs text-neutral-500">{b.sessionDate}</p>
                      </div>
                    </div>
                    <StatusBadge status={b.status} />
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-sm text-neutral-500 text-center mt-4">
                No upcoming bookings
              </p>
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
  const COLORS = ["hsl(var(--foreground))", "hsl(var(--border))", "hsl(var(--muted))"];

  return (
    <>
      {/* KPI */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
        <KPICard title="Users" value={data?.stats?.totalUsers} />
        <KPICard title="Bookings" value={data?.stats?.totalBookings} />
        <KPICard title="Revenue" value={`$${data?.stats?.revenue}`} />
        <KPICard title="Pending Approvals" value={data?.stats?.pendingApprovals} />
        <KPICard title="Completed" value={data?.completedBookings} />
        <KPICard title="Failed Payments" value={data?.failedPayments} />
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <h4 className="font-medium mb-4 text-sm text-neutral-500">Revenue Overview</h4>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data?.revenueChart || []}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="hsl(var(--foreground))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h4 className="font-medium mb-4 text-sm text-neutral-500">Bookings by Status</h4>
          <ResponsiveContainer width="100%" height={260}>
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
  role: "client" | "admin";
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
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [role]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10 bg-background text-foreground">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">
          {role === "admin"
            ? "Admin Dashboard"
            : `Welcome back, ${userName} 👋`}
        </h1>
        <p className="text-sm text-neutral-500">
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
