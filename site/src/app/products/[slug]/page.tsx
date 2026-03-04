import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug, getProductsByCategorySlug } from "@/lib/products";
import RatingStars from "@/components/RatingStars";
import ProductGrid from "@/components/ProductGrid";
import { getCategoryColor, formatNumber } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} - ${product.priceRange}`,
    description: `${product.name} — ${product.rating} stars from ${formatNumber(product.reviewCount)} reviews. ${product.priceRange}. Find the best deal on Amazon.`,
    openGraph: {
      title: `${product.name} | HotProducts`,
      description: `${product.name} — ${product.rating} stars, ${product.priceRange}`,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getProductsByCategorySlug(product.categorySlug)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  const categoryColor = getCategoryColor(product.categorySlug);

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    category: product.category,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.priceMin,
      availability: "https://schema.org/InStock",
      url: product.amazonUrl,
    },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-white transition-colors">Products</Link>
        <span>/</span>
        <Link href={`/category/${product.categorySlug}`} className="hover:text-white transition-colors">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-zinc-300 truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Product detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Product Image */}
        <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl flex items-center justify-center border border-[#1f1f23] overflow-hidden">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain p-8"
            />
          ) : (
            <div className="text-8xl opacity-30">
              {product.categorySlug.includes("gaming") ? "🎮" :
               product.categorySlug.includes("laptop") || product.categorySlug === "computers" ? "💻" :
               product.categorySlug === "headphones" || product.categorySlug === "audio" ? "🎧" :
               product.categorySlug === "speakers" ? "🔊" :
               product.categorySlug === "monitors" ? "🖥️" :
               product.categorySlug === "photography" ? "📷" :
               product.categorySlug === "drones" ? "✈️" :
               product.categorySlug === "kitchen" ? "🍳" :
               product.categorySlug === "smart-home" ? "🏠" :
               product.categorySlug === "security" ? "🔒" :
               product.categorySlug === "furniture" ? "🪑" :
               product.categorySlug === "fitness" ? "💪" : "📦"}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <span className={`inline-block self-start text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4 ${categoryColor}`}>
            {product.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            {product.name}
          </h1>
          <div className="flex items-center gap-3 mb-6">
            <RatingStars rating={product.rating} size="lg" />
            <span className="text-sm text-zinc-400">
              {formatNumber(product.reviewCount)} reviews
            </span>
          </div>
          <div className="text-3xl font-bold text-white mb-6">
            {product.priceRange}
          </div>

          {/* Specs */}
          <div className="bg-[#141416] border border-[#1f1f23] rounded-xl p-6 mb-6">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Product Details</h3>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-xs text-zinc-500">Category</dt>
                <dd className="text-sm text-white font-medium">{product.category}</dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-500">Price</dt>
                <dd className="text-sm text-white font-medium">{product.priceRange}</dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-500">Rating</dt>
                <dd className="text-sm text-white font-medium">{product.rating} / 5.0</dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-500">Reviews</dt>
                <dd className="text-sm text-white font-medium">{product.reviewCount.toLocaleString()}</dd>
              </div>
              {product.bsr && (
                <div>
                  <dt className="text-xs text-zinc-500">Best Seller Rank</dt>
                  <dd className="text-sm text-white font-medium">{product.bsr}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs text-zinc-500">Our Rating</dt>
                <dd className="text-sm text-white font-medium">
                  {product.affiliatePotential >= 9 ? "Highly Recommended" :
                   product.affiliatePotential >= 7 ? "Recommended" : "Good Value"}
                </dd>
              </div>
            </dl>
          </div>

          {/* CTA */}
          <a
            href={product.amazonUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
          >
            Check Price on Amazon
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <p className="text-[10px] text-zinc-500 mt-3">
            * As an Amazon Associate, we earn from qualifying purchases. Price may vary.
          </p>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Related Products</h2>
              <p className="text-sm text-zinc-400 mt-1">More from {product.category}</p>
            </div>
            <Link
              href={`/category/${product.categorySlug}`}
              className="text-sm text-orange-400 hover:text-orange-300 transition-colors font-medium"
            >
              See all &rarr;
            </Link>
          </div>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
