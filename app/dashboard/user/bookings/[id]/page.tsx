"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/components/confirm/ConfirmProvider";
import { fetchBookingById, deleteBooking } from "@/lib/booking";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "../EmptyState";
import { initiatePayment } from "@/lib/payment";
import { Skeleton } from "@/components/ui/Skeleton";

// ============================
// PAGE
// ============================

export default function BookingDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const confirm = useConfirm();

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const data = await fetchBookingById(id);
        setBooking(data);
      } catch {
        toast.error("Failed to load booking");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <BookingSkeleton />;

  if (!booking) return <EmptyState />;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Back */}
      <Link
        href="/dashboard/user/bookings"
        className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-black"
      >
        <ArrowLeft size={16} />
        Back to bookings
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          {booking.package.name}
        </h1>

        <StatusBadge status={booking.status} />
      </div>

      {/* Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
        {/* Image */}
        <div className="relative h-64 md:h-full">
          <Image
            src={booking.package.coverImage || "/img1.jpg"}
            alt={booking.package.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Details */}
        <div className="p-5 sm:p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {booking.package.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <Detail label="Session Date">
                {new Date(booking.sessionDate).toLocaleString()}
              </Detail>

              <Detail label="Duration">
                {booking.package.duration} hour(s)
              </Detail>

              <Detail label="Images">
                {booking.package.imageCount} edited
              </Detail>

              <Detail label="Delivery">
                {booking.package.delivery} days
              </Detail>

              <Detail label="Price">
                ${booking.package.price.toLocaleString()}
              </Detail>
            </div>

            {booking.notes && (
              <div className="border-l-4 border-neutral-300 pl-4 italic text-sm text-neutral-500">
                “{booking.notes}”
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <button
              onClick={() => router.back()}
              className="text-sm text-neutral-600 hover:underline text-left"
            >
              ← Back
            </button>

            <div className="flex flex-wrap gap-2">
              {booking.status === "PENDING" ? (
                <button
                  onClick={() =>
                    confirm({
                      title: "Proceed to payment?",
                      description:
                        "You will be redirected to the payment gateway.",
                      confirmText: "Proceed to payment",
                      variant: "info",
                      onConfirm: async () => {
                        const { url } = await initiatePayment(booking._id);
                        toast.loading("Redirecting to payment...");
                        window.location.href = url;
                      },
                    })
                  }
                  className="px-4 py-2 rounded-full bg-blue-700 hover:bg-blue-600 text-white text-sm"
                >
                  Pay now
                </button>
              ) : (
                <span className="px-4 py-2 rounded-full text-sm bg-green-700 text-white">
                  Paid
                </span>
              )}

              <button
                onClick={() =>
                  confirm({
                    title: "Delete booking?",
                    description:
                      "This booking will be permanently removed.",
                    confirmText: "Delete booking",
                    variant: "danger",
                    onConfirm: async () => {
                      await deleteBooking(booking._id);
                      toast.success("Booking deleted");
                      router.push("/dashboard/user/bookings");
                    },
                  })
                }
                className="px-4 py-2 rounded-full bg-red-700 hover:bg-red-600 text-white text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================
// SKELETON
// ============================

function BookingSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <Skeleton className="h-4 w-32" />

      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-6 w-28" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden gap-0">
        <Skeleton className="h-64 md:h-full w-full" />

        <div className="p-6 space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <Skeleton className="h-9 w-24 rounded-full" />
            <Skeleton className="h-9 w-24 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================
// HELPERS
// ============================

function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs text-neutral-500">{label}</p>
      <p className="font-medium text-sm">{children}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    CONFIRMED: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    COMPLETED: "bg-green-700 text-white",
    FAILED: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-4 py-1 rounded-full text-sm font-medium ${
        styles[status] || "bg-neutral-100 text-neutral-700"
      }`}
    >
      {status}
    </span>
  );
}
