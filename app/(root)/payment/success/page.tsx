import { Suspense } from "react";
import PaymentSuccess from "@/components/payment/PaymentSuccess";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <PaymentSuccess />
    </Suspense>
  );
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">Loading payment status…</p>
    </div>
  );
}
