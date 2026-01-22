export default function ContactButton({
  children,
  type = "button",
  color,
}: {
  children: React.ReactNode
  type?: "button" | "submit"
}) {
  return (
    <button
      type={type}
      className={`px-8 py-3 rounded-full font-medium ${color ? "bg-white text-black" : "bg-neutral-900 text-white"} text-sm tracking-wide cursor-pointer transition dark:bg-white dark:text-neutral-900`}
    >
      {children}
    </button>
  )
}
