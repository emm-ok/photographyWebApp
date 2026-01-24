type ContactButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit";
  color?: boolean;
  variants?: "primary" | "secondary";
};

export default function ContactButton({
  children,
  type = "button",
  color = false,
  variants = "primary",
}: ContactButtonProps) {
  const baseStyles =
    "px-6 py-2 sm:px-8 sm:py-3 rounded-full font-medium tracking-wide cursor-pointer transition text-sm sm:text-base";

  const variantStyles =
    variants === "secondary"
      ? "bg-white text-black hover:bg-gray-100 dark:bg-white dark:text-neutral-900 dark:hover:bg-gray-200"
      : "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800";

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles} ${
        color ? "ring-2 ring-black/10 dark:ring-white/20" : ""
      }`}
    >
      {children}
    </button>
  );
}
