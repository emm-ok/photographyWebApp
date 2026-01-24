"use client";

import { BookingPackage } from "@/lib/bookingData";
import { createSubscriptionBooking } from "@/lib/booking";
import { toast } from "sonner";
import { useState } from "react";
import { initiatePayment } from "@/lib/payment";

export default function SubscribeForm({
  pkg,
  onClose,
}: {
  pkg: BookingPackage;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    if (pkg.type !== "subscription") {
      toast.error("This package is not a subscription");
      return;
    }

    try {
      setLoading(true);
      await createSubscriptionBooking(pkg._id);
      const { url } = await initiatePayment(pkg._id);
      window.location.href = url;
      toast.success("Redirecting... 🎉");
      onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Subscription Unavailable");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="rounded-2xl border p-4 text-sm bg-background space-y-2">
        <p className="font-medium">🔁 Monthly Subscription</p>
        <p>⏱ {pkg.duration} sessions / month</p>
        <p>💳 ${pkg.price.toLocaleString()} billed monthly</p>
        <p className="text-neutral-500 text-xs">
          Cancel anytime from your dashboard
        </p>
      </div>

      {/* Action */}
      <button
        disabled={loading}
        onClick={handleSubscribe}
        className="w-full py-4 rounded-xl bg-stone-200 text-neutral-800 font-medium disabled:opacity-50"
      >
        {loading ? "Processing..." : "Confirm Subscription"}
      </button>
    </div>
  );
}
