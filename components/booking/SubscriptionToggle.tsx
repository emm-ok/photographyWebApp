"use client"

interface Props {
  value: "one-time" | "subscription"
  onChange: (value: "one-time" | "subscription") => void
}

export default function SubscriptionToggle({ value, onChange }: Props) {
  return (
    <div className="flex justify-center gap-4 mb-14">
      {["one-time", "subscription"].map((type) => (
        <button
          key={type}
          onClick={() => onChange(type as any)}
          className={`px-6 py-3 rounded-full text-sm font-medium transition ${
            value === type
              ? "bg-black text-white"
              : "border border-neutral-300 dark:border-neutral-700"
          }`}
        >
          {type === "one-time" ? "One-Time Sessions" : "Subscriptions"}
        </button>
      ))}
    </div>
  )
}
