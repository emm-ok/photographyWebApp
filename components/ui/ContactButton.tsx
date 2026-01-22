type ContactButtonProps = {
  children: React.ReactNode
  type?: "button" | "submit"
  color?: boolean
  variants?: "primary" | "secondary"
}

export default function ContactButton({
  children,
  type = "button",
  color = false,
  variants = "primary",
}: ContactButtonProps) {
  const baseStyles =
    "px-8 py-3 rounded-full font-medium text-sm tracking-wide cursor-pointer transition"

  const variantStyles =
    variants === "secondary"
      ? "bg-white text-black hover:bg-gray-100"
      : "bg-neutral-900 text-white hover:bg-neutral-800"

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles} ${
        color ? "ring-2 ring-black/10" : ""
      } dark:bg-white dark:text-neutral-900`}
    >
      {children}
    </button>
  )
}
