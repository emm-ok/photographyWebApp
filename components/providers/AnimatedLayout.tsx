"use client"

import { AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import PageTransition from "@/components/ui/PageTransition"

export default function AnimatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={pathname}>
        {children}
      </PageTransition>
    </AnimatePresence>
  )
}
