'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useConfirm } from '@/components/confirm/ConfirmProvider';
import { fetchBookingById, deleteBooking } from '@/lib/booking';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { EmptyState } from '../EmptyState';
import { initiatePayment } from '@/lib/payment';
import { Skeleton } from '@/components/ui/Skeleton';

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
        toast.error('Failed to load booking');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <BookingSkeleton />;
  if (!booking) return <EmptyState />;

  const isPaidOrConfirmed = booking.status === 'CONFIRMED' || booking.paymentStatus === 'PAID';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Back */}
      <Link
        href="/dashboard/user/bookings"
        className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-foreground dark:hover:text-white transition"
      >
        <ArrowLeft size={16} /> Back to bookings
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          {booking.package.name}
        </h1>
        <StatusBadge status={booking.status} />
      </div>

      {/* Booking Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden bg-card dark:bg-card-foreground border border-muted dark:border-neutral-800 shadow-[var(--shadow)]">
        {/* Image */}
        <div className="relative h-64 md:h-full w-full">
          <Image
            src={booking.package.coverImage || '/images/placeholder.png'}
            alt={booking.package.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Details */}
        <div className="p-5 sm:p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4 text-sm text-foreground/80">
            <p>{booking.package.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Detail label="Session Date">{new Date(booking.sessionDate).toLocaleString()}</Detail>
              <Detail label="Duration">{booking.package.duration} hour(s)</Detail>
              <Detail label="Images">{booking.package.imageCount} edited</Detail>
              <Detail label="Delivery">{booking.package.delivery} days</Detail>
              <Detail label="Price">${booking.package.price.toLocaleString()}</Detail>
            </div>

            {booking.notes && (
              <div className="border-l-4 border-muted dark:border-neutral-600 pl-4 italic text-neutral-500 dark:text-neutral-400">
                “{booking.notes}”
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <button
              onClick={() => router.back()}
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:underline transition"
            >
              ← Back
            </button>

            <div className="flex flex-wrap gap-2">
              {/* Payment / Paid Badge */}
              {booking.status === 'PENDING' ? (
                <button
                  onClick={() =>
                    confirm({
                      title: 'Proceed to payment?',
                      description: 'You will be redirected to the payment gateway.',
                      confirmText: 'Proceed to payment',
                      variant: 'info',
                      onConfirm: async () => {
                        const { url } = await initiatePayment(booking._id);
                        toast.loading('Redirecting to payment...');
                        window.location.href = url;
                      },
                    })
                  }
                  className="px-4 py-2 rounded-full bg-blue-700 hover:bg-blue-600 text-white text-sm transition"
                >
                  Pay Now
                </button>
              ) : (
                <span className="px-4 py-2 rounded-full bg-green-700 text-white text-sm">
                  Paid
                </span>
              )}

              {/* Delete button only if booking is not confirmed / paid */}
              {!isPaidOrConfirmed && (
                <button
                  onClick={() =>
                    confirm({
                      title: 'Delete booking?',
                      description: 'This booking will be permanently removed.',
                      confirmText: 'Delete booking',
                      variant: 'danger',
                      onConfirm: async () => {
                        await deleteBooking(booking._id);
                        toast.success('Booking deleted');
                        router.push('/dashboard/user/bookings');
                      },
                    })
                  }
                  className="px-4 py-2 rounded-full bg-red-700 hover:bg-red-600 text-white text-sm transition"
                >
                  Delete
                </button>
              )}
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

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">{label}</p>
      <p className="font-medium text-sm text-foreground">{children}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    CONFIRMED: 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200',
    PENDING: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200',
    COMPLETED: 'bg-green-700 text-white',
    FAILED: 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200',
  };

  return (
    <span className={`px-4 py-1 rounded-full text-sm font-medium ${styles[status] || 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'}`}>
      {status}
    </span>
  );
}
