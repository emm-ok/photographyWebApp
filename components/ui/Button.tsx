import { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode
  variant?: "primary" | "secondary"
}

export default function Button({
  children,
  variant = "primary",
}: ButtonProps) {
  const base =
    "px-4 py-2 md:px-10 md:py-3 md:py-4 rounded-full text-md tracking-wide transition"

  const styles = {
    primary: "bg-neutral-900 text-white hover:bg-neutral-800",
    secondary:"border border-neutral-300 font-medium text-sm md:text-lg bg-white text-neutral-900 hover:border-neutral-900",
  }

  return (
    <button className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  )
}
