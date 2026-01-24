"use client"

interface FAQSearchProps {
  value: string
  onChange: (value: string) => void
}

export default function FAQSearch({ value, onChange }: FAQSearchProps) {
  return (
    <input
      type="text"
      placeholder="Search questions..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mb-10 px-5 py-4 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
    />
  )
}
