"use client";

import { useEffect, useState } from "react";
import { BookingPackage } from "@/lib/bookingData";
import { createOneTimeBooking, getBookedDates } from "@/lib/booking";
import { initiatePayment } from "@/lib/payment";
import { toast } from "sonner";
import BookingCalendar from "./BookingCalendar";

export default function BookingForm({
  pkg,
  onClose,
}: {
  pkg: BookingPackage;
  onClose: () => void;
}) {
  const [date, setDate] = useState<Date>();
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookedDates, setBookedDates] = useState<string[]>([]);

  const booked = bookedDates.map((d) => new Date(d));

  useEffect(() => {
    getBookedDates()
      .then(setBookedDates)
      .catch(() => toast.error("Failed to load booked dates"));
  }, []);

  async function handleBookingAndPayment() {
    if (!date) {
      toast.error("Please select a session date");
      return;
    }

    try {
      setLoading(true);
      const normalizedDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    
      // 1️⃣ Create booking (PENDING)
      const booking = await createOneTimeBooking({
        package: pkg._id,
        sessionDate: normalizedDate.toISOString(),
        notes: notes || undefined,
      });

      toast.success("Booking created. Redirecting to payment...");

      // 2️⃣ Initiate Stripe payment
      const { url } = await initiatePayment(booking._id);

      // 3️⃣ Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error: any) {
      toast.error(error.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium">Session Date</label>
        <BookingCalendar
          bookedDates={booked}
          selected={date}
          onSelect={setDate}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="mt-2 w-full rounded-xl border px-4 py-3 bg-transparent"
        />
      </div>

      <button
        onClick={handleBookingAndPayment}
        disabled={loading || !date}
        className="w-full py-4 rounded-xl bg-black text-white dark:bg-white dark:text-black font-medium disabled:opacity-60"
      >
        {loading ? "Redirecting to payment..." : "Confirm & Pay"}
      </button>
    </div>
  );
}
