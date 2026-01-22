"use client";

import { useEffect, useState } from "react";
import { fetchMyBookings, cancelBooking, deleteBooking } from "@/lib/booking";
import { Booking } from "@/types/booking";
import { toast } from "sonner";
import { useConfirm } from "@/components/confirm/ConfirmProvider";
import Link from "next/link";
import { Eye, X } from "lucide-react";
import { EmptyState } from "./EmptyState";
import { initiatePayment } from "@/lib/payment";
import Image from "next/image";
import { Skeleton } from "@/components/ui/Skeleton";

const statusStyles: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-green-100 text-green-800",
  COMPLETED: "bg-green-700 text-white",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const confirm = useConfirm();

  const loadBookings = async () => {
    try {
      const data = await fetchMyBookings();
      setBookings(data);
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  if (loading) return <BookingsSkeleton />;

  if (!bookings.length) return <EmptyState />;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">My Bookings</h1>
        <p className="text-sm text-neutral-500">
          View and manage your bookings
        </p>
      </header>

      {/* ===================== DESKTOP TABLE ===================== */}
      <div className="hidden md:block bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 dark:bg-neutral-800">
            <tr>
              {["Package", "Date", "Type", "Status", "Payment", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left font-medium text-neutral-600 dark:text-neutral-300"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody className="divide-y dark:divide-neutral-800">
            {bookings.map((b) => (
              <tr
                key={b._id}
                className="hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
              >
                {/* Package */}
                <td className="px-4 py-4 flex items-center gap-2">
                  <Image
                    src={b.package.coverImage}
                    alt={b.package.name}
                    width={40}
                    height={40}
                    className="rounded-full w-10 h-10 object-cover"
                  />
                  <span className="font-medium">{b.package.name}</span>
                </td>

                <td className="px-6 py-4">
                  {new Date(b.sessionDate).toLocaleString()}
                </td>

                <td className="px-6 py-4 capitalize">
                  {b.package.type}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[b.status]}`}
                  >
                    {b.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {b.status === "PENDING" ? (
                    <PayButton bookingId={b._id} />
                  ) : (
                    <PaidBadge />
                  )}
                </td>

                <td className="px-6 py-4 flex items-center gap-2 justify-end">
                  <Link
                    href={`/dashboard/user/bookings/${b._id}`}
                    className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700"
                  >
                    <Eye size={18} />
                  </Link>

                  <DeleteButton
                    onConfirm={async () => {
                      await deleteBooking(b._id);
                      toast.success("Booking deleted");
                      loadBookings();
                    }}
                  />

                  {b.status === "PENDING" && (
                    <CancelButton
                      onConfirm={async () => {
                        await cancelBooking(b._id);
                        toast.success("Booking cancelled");
                        loadBookings();
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===================== MOBILE CARDS ===================== */}
      <div className="md:hidden space-y-4">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-neutral-200 dark:border-neutral-800 space-y-3"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg">{b.package.name}</h3>
              <span
                className={`text-xs px-3 py-1 rounded-full ${statusStyles[b.status]}`}
              >
                {b.status}
              </span>
            </div>

            <p className="text-sm text-neutral-500">
              📅 {new Date(b.sessionDate).toLocaleString()}
            </p>

            <p className="text-sm text-neutral-500">
              💰 ${b.package.price.toLocaleString()}
            </p>

            {b.notes && (
              <p className="text-sm italic text-neutral-500">“{b.notes}”</p>
            )}

            <div className="flex justify-between items-center pt-2">
              <Link
                href={`/dashboard/user/bookings/${b._id}`}
                className="text-sm font-medium underline"
              >
                View details
              </Link>

              <div className="flex gap-2">
                {b.status === "PENDING" && (
                  <CancelButton
                    onConfirm={async () => {
                      await cancelBooking(b._id);
                      toast.success("Booking cancelled");
                      loadBookings();
                    }}
                  />
                )}

                <DeleteButton
                  onConfirm={async () => {
                    await deleteBooking(b._id);
                    toast.success("Booking deleted");
                    loadBookings();
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===================== SKELETON =====================

function BookingsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-4">
      <Skeleton className="h-8 w-40" />
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-32 w-full rounded-2xl" />
      ))}
    </div>
  );
}

// ===================== ACTION BUTTONS =====================

function PayButton({ bookingId }: { bookingId: string }) {
  const confirm = useConfirm();

  return (
    <button
      onClick={() =>
        confirm({
          title: "Proceed to payment?",
          description: "You’ll be redirected to the payment page.",
          confirmText: "Proceed",
          variant: "info",
          onConfirm: async () => {
            const { url } = await initiatePayment(bookingId);
            toast.loading("Redirecting to payment...");
            window.location.href = url;
          },
        })
      }
      className="px-3 py-1.5 rounded-full bg-blue-700 hover:bg-blue-600 text-white text-xs"
    >
      Pay
    </button>
  );
}

function PaidBadge() {
  return (
    <span className="px-3 py-1 rounded-full text-xs bg-green-700 text-white">
      Paid
    </span>
  );
}

function DeleteButton({ onConfirm }: { onConfirm: () => void }) {
  const confirm = useConfirm();

  return (
    <button
      onClick={() =>
        confirm({
          title: "Delete booking?",
          description: "This action cannot be undone.",
          confirmText: "Delete",
          variant: "danger",
          onConfirm,
        })
      }
      className="px-3 py-1.5 rounded-full bg-red-700 hover:bg-red-600 text-white text-xs"
    >
      Delete
    </button>
  );
}

function CancelButton({ onConfirm }: { onConfirm: () => void }) {
  const confirm = useConfirm();

  return (
    <button
      onClick={() =>
        confirm({
          title: "Cancel booking?",
          description: "This action cannot be undone.",
          confirmText: "Cancel",
          variant: "danger",
          onConfirm,
        })
      }
      className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
    >
      <X size={16} />
    </button>
  );
}
