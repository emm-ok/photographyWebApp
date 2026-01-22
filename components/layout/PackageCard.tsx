import Link from 'next/link';
import { Package } from '@/types/package';

export default function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-lg transition">
      <h3 className="text-xl font-semibold">{pkg.name}</h3>
      <p className="text-gray-600 mt-2">{pkg.description}</p>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-lg font-bold">${pkg.price.toLocaleString()}</span>
        <Link
          href={`/packages/${pkg._id}`}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          Book
        </Link>
      </div>
    </div>
  );
}
