export async function initiatePayment(bookingId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/payments`,
    {
      method: "POST",
      credentials: "include", // REQUIRED for auth cookies
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookingId }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to initiate payment");
  }

  if (!data.url) {
    throw new Error("Stripe checkout URL missing");
  }

  return data as { url: string };
}
