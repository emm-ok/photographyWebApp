"use client";

import { useEffect, useState } from "react";
import {
  fetchAllBookings,
  cancelBooking,
  updateBookingStatus,
} from "@/lib/booking";
import { Booking } from "@/types/booking";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/Skeleton";
import Image from "next/image";
import { useConfirm } from "@/components/confirm/ConfirmProvider";

interface Filter {
  status: string;
  type: string;
}

type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>({ status: "ALL", type: "ALL" });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [actionLoading, setActionLoading] = useState(false);
  const confirm = useConfirm();

  // Fetch all bookings
  useEffect(() => {
    const getBookings = async () => {
      try {
        const data = await fetchAllBookings();
        setBookings(data);
      } catch {
        toast.error("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };
    getBookings();
  }, []);

  // Filter, search, paginate
  const filtered = bookings.filter((b) => {
    const statusMatch = filter.status === "ALL" || b.status === filter.status;
    const typeMatch = filter.type === "ALL" || b.package.type === filter.type;
    const searchMatch =
      b.user.name.toLowerCase().includes(search.toLowerCase()) ||
      b.user.email.toLowerCase().includes(search.toLowerCase()) ||
      b.package.name.toLowerCase().includes(search.toLowerCase());
    return statusMatch && typeMatch && searchMatch;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Cancel booking
  const handleCancel = async (booking: Booking) => {
    setActionLoading(true);
    try {
      await cancelBooking(booking._id);
      toast.success("Booking cancelled");
      setBookings((prev) =>
        prev.map((b) =>
          b._id === booking._id ? { ...b, status: "CANCELLED" } : b,
    ),
  );
} catch {
  toast.error("Unable to cancel booking");
    } finally {
      setActionLoading(false);
    }
  };

  // Update booking status
  const handleStatusChange = async (
    booking: Booking,
    newStatus: BookingStatus,
  ) => {
    try {
      await updateBookingStatus(booking._id, newStatus);
      setBookings((prev) =>
        prev.map((b) =>
          b._id === booking._id ? { ...b, status: newStatus } : b,
        ),
      );
      toast.success(`Booking status updated to ${newStatus}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Title Skeleton */}
        <Skeleton className="h-8 w-1/3 rounded-xl" />

        {/* Filters Skeleton */}
        <div className="flex flex-col md:flex-row gap-4">
          <Skeleton className="h-10 w-40 rounded-xl" />
          <Skeleton className="h-10 w-40 rounded-xl" />
          <Skeleton className="h-10 w-full md:w-1/3 rounded-xl" />
        </div>

        {/* Table/Card Skeleton */}
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">
        User Bookings
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
        <div className="flex gap-2 w-full md:w-auto flex-wrap">
          <select
            value={filter.status}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, status: e.target.value }))
            }
            className="bg-background border-2 shadow-sm rounded-full px-6 py-2 text-sm focus:ring-2 outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>

          <select
            value={filter.type}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, type: e.target.value }))
            }
            className="bg-background border-2 shadow-sm rounded-full px-4 py-2 text-sm focus:ring-2 outline-none"
          >
            <option value="ALL">All Package Types</option>
            <option value="one-time">One-time</option>
            <option value="subscription">Subscription</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Search by client, email or package..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-background border-2 shadow-sm rounded-xl px-4 py-2 text-sm w-full md:w-1/3 focus:ring-2 outline-none"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-background  rounded-3xl shadow-sm">
        <table className="min-w-full divide-y divide-gray-100 dark:divide-neutral-800">
          <thead className="bg-background text-foreground">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Client
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Package
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Payment
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-background">
            {paginated.map((b) => (
              <tr
                key={b._id}
                className="transition-colors"
              >
                <td className="px-6 py-4 font-medium text-sm text-foreground">
                  <div className="flex items-center gap-2">
                    <Image
                      src={b.user.image || "/default-avatar.png"}
                      alt={b.user.name}
                      width={40}
                      height={40}
                      className="rounded-full w-10 h-10 object-cover"
                    />
                    {b.user.name}
                  </div>
                  <span className="text-xs font-light">{b.user.email}</span>
                </td>
                <td className="px-6 py-4 text-sm">
                  {b.package.name}
                </td>
                <td className="px-6 py-4 text-sm">
                  {b.package.type}
                </td>
                <td className="px-6 py-4 text-sm">
                  ${b.package.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm">
                  {new Date(b.sessionDate).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm">
                  <StatusDropdown booking={b} onChange={handleStatusChange} />
                </td>
                <td className="px-6 py-4 text-sm">
                  <StatusBadge status={b.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {paginated.map((b) => (
          <div
            key={b._id}
            className="bg-white dark:bg-neutral-900 p-4 rounded-2xl shadow-sm flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">{b.package.name}</h3>
              <StatusBadge status={b.status} />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Client: {b.user.name} ({b.user.email})
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Type: {b.package.type}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Price: ${b.package.price.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Date: {new Date(b.sessionDate).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded-xl bg-background border shadow-sm disabled:opacity-40"
        >
          Prev
        </button>
        <span className="px-3 py-1 rounded-xl bg-background border shadow-sm">
          {page}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded-xl bg-background border shadow-sm disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// ---------- Status Badge ----------
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING: "bg-yellow-400 text-white",
    CONFIRMED: "bg-green-500 text-white",
    COMPLETED: "bg-blue-500 text-white",
    CANCELLED: "bg-red-500 text-white",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-background text-foreground"}`}
    >
      {status}
    </span>
  );
}

// ---------- Status Dropdown ----------
function StatusDropdown({
  booking,
  onChange,
}: {
  booking: Booking;
  onChange: (b: Booking, newStatus: BookingStatus) => void;
}) {
  const statuses = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];
  return (
    <select
      value={booking.status}
      onChange={(e) => onChange(booking, e.target.value as BookingStatus)}
      className={`px-3 py-1 rounded-full text-xs font-medium bg-background border-2 outline-none`}
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}