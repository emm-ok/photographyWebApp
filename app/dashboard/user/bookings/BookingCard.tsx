'use client';

import { Booking } from '@/types/booking';

interface Props {
  booking: Booking;
  onCancel?: (id: string) => void;
}

export default function BookingCard({ booking, onCancel }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-2">
      <h3 className="font-semibold text-lg">
        Package: {booking.package?.name}
      </h3>

      <p>
        <strong>Session Date:</strong>{' '}
        {new Date(booking.sessionDate).toLocaleString()}
      </p>

      <p>
        <strong>Status:</strong>{' '}
        <span
          className={`font-semibold ${
            booking.status === 'PENDING'
              ? 'text-yellow-500'
              : booking.status === 'CONFIRMED'
              ? 'text-green-600'
              : 'text-red-500'
          }`}
        >
          {booking.status}
        </span>
      </p>

      {booking.notes && (
        <p>
          <strong>Notes:</strong> {booking.notes}
        </p>
      )}

      {booking.status === 'PENDING' && onCancel && (
        <button
          onClick={() => onCancel(booking._id)}
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Cancel Booking
        </button>
      )}
    </div>
  );
}
