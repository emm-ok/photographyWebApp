"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Status = "loading" | "success" | "error";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setMessage("Invalid payment session.");
      return;
    }

    async function verifyPayment() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/payments/verify?session_id=${sessionId}`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || "Payment verification failed");
        }

        setStatus("success");
        setMessage("Payment successful! Your booking is confirmed.");

        // Optional redirect after delay
        setTimeout(() => {
          router.push("/dashboard/user/bookings");
        }, 3000);
      } catch (err: any) {
        setStatus("error");
        setMessage(err.message || "Something went wrong");
      }
    }

    verifyPayment();
  }, [sessionId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-4">
        {status === "loading" && (
          <>
            <div className="animate-spin h-10 w-10 border-4 border-black border-t-transparent rounded-full mx-auto" />
            <h1 className="text-lg font-medium">{message}</h1>
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="text-2xl font-semibold">🎉 Payment Successful</h1>
            <p className="text-neutral-500">{message}</p>
            <p className="text-sm text-neutral-400">
              Redirecting to your bookings…
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-2xl font-semibold text-red-600">
              Payment Error
            </h1>
            <p className="text-neutral-500">{message}</p>

            <button
              onClick={() => router.push("/")}
              className="mt-4 px-6 py-3 rounded-xl bg-black text-white"
            >
              Go Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}
