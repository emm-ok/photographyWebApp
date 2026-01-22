"use client";

import { useEffect, useState } from "react";
import AdminUserRow from "@/components/admin/AdminUserRow";
import { getAllUsers } from "@/lib/user";
import { Skeleton } from "@/components/ui/Skeleton";
import { User } from "@/types/auth";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAllUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data.users || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Users</h1>
        <p className="text-neutral-500">Manage all registered users</p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-24 rounded-xl bg-neutral-100"
              />
            ))
          : (
            <>
              <StatCard title="Total Users" value={users.length} />
              {/* <StatCard
                title="Admins"
                value={users.filter((u) => u.role === "admin").length}
              /> */}
              <StatCard
                title="Clients"
                value={users.filter((u) => u.role === "client").length}
              />
              <StatCard
                title="New (30 days)"
                value={
                  users.filter(
                    (u) =>
                      Date.now() - new Date(u.createdAt).getTime() <
                      30 * 24 * 60 * 60 * 1000
                  ).length
                }
              />
            </>
          )}
      </div>

      {/* SEARCH */}
      <div className="max-w-md">
        {loading ? (
          <Skeleton className="h-10 rounded-xl bg-neutral-100" />
        ) : (
          <input
            type="text"
            placeholder="Search users by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-neutral-100 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        )}
      </div>

      {/* USERS TABLE */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-neutral-500">
            <tr>
              <th className="p-4">User</th>
              <th>Role</th>
              <th>Auth</th>
              <th>Status</th>
              <th>Joined</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <SkeletonTableRow key={i} />
              ))}

            {!loading && filteredUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-neutral-500">
                  No users found
                </td>
              </tr>
            )}

            {!loading &&
              filteredUsers.map((user) => (
                <AdminUserRow key={user._id} user={user} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ----------------------------------
   Components
---------------------------------- */

const StatCard = ({ title, value }: { title: string; value: number }) => (
  <div className="bg-white rounded-xl shadow-sm p-5">
    <p className="text-sm text-neutral-500">{title}</p>
    <p className="text-2xl font-semibold mt-1">{value}</p>
  </div>
);

const SkeletonTableRow = () => (
  <tr className="border-b last:border-none">
    <td className="p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full bg-neutral-100" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-32 bg-neutral-100" />
          <Skeleton className="h-3 w-40 bg-neutral-100" />
        </div>
      </div>
    </td>
    <td><Skeleton className="h-4 w-16 bg-neutral-100" /></td>
    <td><Skeleton className="h-4 w-12 bg-neutral-100" /></td>
    <td><Skeleton className="h-4 w-16 bg-neutral-100" /></td>
    <td><Skeleton className="h-4 w-20 bg-neutral-100" /></td>
    <td className="pr-4">
      <Skeleton className="h-8 w-8 rounded-md bg-neutral-100" />
    </td>
  </tr>
);
