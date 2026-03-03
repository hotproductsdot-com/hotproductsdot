import Link from "next/link";

interface HeroProps {
  productCount: number;
  categoryCount: number;
}

export default function Hero({ productCount, categoryCount }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-500/5 blur-[100px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Discover the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Hottest Products
            </span>{" "}
            on Amazon
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 mb-8 leading-relaxed">
            {productCount}+ handpicked premium products across {categoryCount} categories.
            Curated for quality, rated by thousands, and ready to ship.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-base"
            >
              Browse All Products
            </Link>
            <Link
              href="#featured"
              className="border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold px-8 py-3 rounded-xl transition-colors text-base"
            >
              See Top Picks
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white">{productCount}+</div>
            <div className="text-xs text-zinc-500 mt-1">Products</div>
          </div>
          <div className="text-center border-x border-zinc-800">
            <div className="text-2xl sm:text-3xl font-bold text-white">{categoryCount}</div>
            <div className="text-xs text-zinc-500 mt-1">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white">4.6+</div>
            <div className="text-xs text-zinc-500 mt-1">Avg Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}
