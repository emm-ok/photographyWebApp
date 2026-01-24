import { ReactNode } from "react"

interface SectionProps {
  children: ReactNode
  className?: string
}

export default function Section({ children, className }: SectionProps) {
  return (
    <section className={`py-24 bg-background text-foreground ${className || ""}`}>
      {children}
    </section>
  )
}
