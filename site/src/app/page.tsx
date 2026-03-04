import Link from "next/link";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { getAllProducts, getFeaturedProducts } from "@/lib/products";
import { getAllCategories } from "@/lib/categories";
import { getCategoryColor } from "@/lib/utils";

export default function HomePage() {
  const allProducts = getAllProducts();
  const featured = getFeaturedProducts(12);
  const categories = getAllCategories();

  // Get top products per major category for "Browse by Category" section
  const topCategories = categories.slice(0, 8);

  return (
    <div>
      <Hero productCount={allProducts.length} categoryCount={categories.length} />

      {/* Featured Products */}
      <section id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Top Picks</h2>
            <p className="text-sm text-zinc-400 mt-1">Our highest-rated recommendations</p>
          </div>
          <Link
            href="/products"
            className="text-sm text-orange-400 hover:text-orange-300 transition-colors font-medium"
          >
            View all &rarr;
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      {/* Browse by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">Browse by Category</h2>
          <p className="text-sm text-zinc-400 mt-1">Find exactly what you&apos;re looking for</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {topCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group relative bg-[#141416] border border-[#1f1f23] rounded-xl p-6 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5 transition-all"
            >
              <div className="text-3xl mb-3">{cat.icon}</div>
              <h3 className="text-base font-semibold text-white group-hover:text-orange-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-zinc-500 mt-1">{cat.count} products</p>
              <span className={`inline-block mt-3 text-[10px] font-semibold px-2 py-0.5 rounded-full ${getCategoryColor(cat.slug)}`}>
                Explore
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Additions - show next batch of products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Recently Added</h2>
            <p className="text-sm text-zinc-400 mt-1">Fresh finds added to our collection</p>
          </div>
          <Link
            href="/products"
            className="text-sm text-orange-400 hover:text-orange-300 transition-colors font-medium"
          >
            View all &rarr;
          </Link>
        </div>
        <ProductGrid products={allProducts.slice(0, 8)} />
      </section>
    </div>
  );
}
