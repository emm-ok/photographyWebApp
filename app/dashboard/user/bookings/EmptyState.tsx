export function EmptyState() {
  return (
    <div className="text-center py-20">
      <div className="text-5xl mb-4">📭</div>
      <h2 className="text-xl font-semibold mb-2">
        No bookings yet
      </h2>
      <p className="text-gray-500 mb-6">
        When you book a session, it will appear here.
      </p>

      <a
        href="/packages"
        className="inline-flex items-center rounded-xl bg-black text-white px-6 py-3 font-medium hover:opacity-90"
      >
        Browse packages
      </a>
    </div>
  );
}
