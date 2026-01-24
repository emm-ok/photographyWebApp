"use client";

interface Props {
  value: "one-time" | "subscription";
  onChange: (value: "one-time" | "subscription") => void;
}

export default function SubscriptionToggle({ value, onChange }: Props) {
  return (
    <div className="flex justify-center mb-14">
      <div className="inline-flex rounded-full bg-muted p-1 shadow-sm">
        {["one-time", "subscription"].map((type) => {
          const isActive = value === type;

          return (
            <button
              key={type}
              onClick={() => onChange(type as any)}
              className={`
                relative
                px-6 py-2.5
                rounded-full
                text-sm
                font-medium
                transition-all
                duration-300
                ${
                  isActive
                    ? "bg-background text-foreground shadow-md"
                    : "text-foreground hover:text-foreground"
                }
              `}
            >
              {type === "one-time" ? "One-Time Sessions" : "Subscriptions"}
            </button>
          );
        })}
      </div>
    </div>
  );
}
