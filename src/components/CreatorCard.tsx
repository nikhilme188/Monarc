import Link from "next/link";

export default function CreatorCard({
  creator,
  className = "",
}: {
  creator: any;
  className?: string;
}) {
  return (
    <div
      className={`w-full rounded-2xl shadow-lg bg-gradient-to-br from-[#0b1220] to-[#142b47] border border-blue-900/40 p-6 flex flex-col items-center text-center hover:scale-[1.03] hover:shadow-xl transition-all duration-300 ${className}`}
    >
      <h2 className="text-2xl font-semibold mb-2 text-[#f0e68c]">{creator.name}</h2>
      <p className="text-gray-300 mb-1">
        Subscribers: {creator.subscribers.toLocaleString()}
      </p>
      <p className="text-gray-400 mb-3">Category: {creator.category}</p>
      <Link
        href={`/dashboard/creator/${creator.id}`}
        className="mt-3 inline-block text-blue-400 hover:text-blue-300 transition-colors"
      >
        View Profile →
      </Link>
    </div>
  );
}
