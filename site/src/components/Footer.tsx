import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0b] border-t border-zinc-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🔥</span>
              <span className="text-xl font-bold text-white">
                Hot<span className="text-orange-500">Products</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Handpicked premium products from Amazon. We find the best so you don&apos;t have to.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Explore</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">Home</Link>
              <Link href="/products" className="text-sm text-zinc-400 hover:text-white transition-colors">All Products</Link>
              <Link href="/about" className="text-sm text-zinc-400 hover:text-white transition-colors">About</Link>
            </nav>
          </div>

          {/* Disclosure */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Affiliate Disclosure</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              HotProducts is a participant in the Amazon Services LLC Associates Program, an affiliate advertising
              program designed to provide a means for sites to earn advertising fees by advertising and linking to
              Amazon.com. As an Amazon Associate, we earn from qualifying purchases.
            </p>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-8 pt-8 text-center">
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} HotProducts (hotproductsdot.com). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
