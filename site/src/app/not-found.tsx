import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-32 text-center">
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-xl text-zinc-400 mb-8">Page not found</p>
      <p className="text-sm text-zinc-500 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
