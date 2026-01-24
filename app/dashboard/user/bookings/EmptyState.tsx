export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 sm:py-20 px-4">
      {/* Icon */}
      <div className="text-3xl sm:text-5xl mb-3 sm:mb-4">📭</div>

      {/* Title */}
      <h2 className="text-base sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">
        No bookings yet
      </h2>

      {/* Description */}
      <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-4 sm:mb-6 max-w-xs">
        When you book a session, it will appear here.
      </p>

      {/* CTA */}
      <a
        href="/packages"
        className="
          inline-flex items-center justify-center
          rounded-lg
          bg-black dark:bg-white
          text-white dark:text-black
          px-4 sm:px-6
          py-2 sm:py-3
          text-xs sm:text-sm
          font-medium
          hover:opacity-90
          transition
        "
      >
        Browse packages
      </a>
    </div>
  );
}
