'use client';

import { Booking } from '@/types/booking';
import Image from 'next/image';

interface Props {
  booking: Booking;
  onCancel?: (id: string) => void;
}

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-green-100 text-green-800',
  COMPLETED: 'bg-green-700 text-white',
  CANCELLED: 'bg-red-100 text-red-700',
};

export default function BookingCard({ booking, onCancel }: Props) {
  return (
    <div className="bg-card dark:bg-card-foreground rounded-2xl shadow-[var(--shadow)] p-4 sm:p-6 space-y-3 transition hover:shadow-lg">
      
      {/* Package Header */}
      <div className="flex items-center gap-3">
        <Image
          src={booking.package.coverImage ?? '/images/placeholder.png'}
          alt={booking.package.name}
          width={48}
          height={48}
          className="rounded-full w-12 h-12 object-cover"
        />
        <h3 className="text-lg font-semibold text-foreground">
          {booking.package.name}
        </h3>
      </div>

      {/* Details */}
      <div className="text-sm text-foreground/70 space-y-1">
        <p>
          <strong>Session Date:</strong>{' '}
          {new Date(booking.sessionDate).toLocaleString()}
        </p>

        <p className="flex items-center gap-2">
          <strong>Status:</strong>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}
          >
            {booking.status}
          </span>
        </p>

        {booking.notes && (
          <p>
            <strong>Notes:</strong> <span className="italic">{booking.notes}</span>
          </p>
        )}

        <p>
          <strong>Price:</strong> ${booking.package.price.toLocaleString()}
        </p>
      </div>

      {/* Actions */}
      <div className="pt-2 flex justify-end">
        {booking.status === 'PENDING' && onCancel && (
          <button
            onClick={() => onCancel(booking._id)}
            className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white text-sm font-medium transition"
          >
            Cancel Booking
          </button>
        )}
      </div>
    </div>
  );
}
