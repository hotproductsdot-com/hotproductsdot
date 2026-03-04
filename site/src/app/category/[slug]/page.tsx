import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { getAllProducts, getProductsByCategory } from "@/lib/products";
import { getAllCategories, getCategoryBySlug } from "@/lib/categories";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: `Best ${category.name} - Top Amazon Picks`,
    description: `Browse ${category.count} curated ${category.name.toLowerCase()} products. Highest rated picks from Amazon with real reviews.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug)
    .sort((a, b) => b.affiliatePotential - a.affiliatePotential || b.rating - a.rating);

  const allCategories = getAllCategories();
  void getAllProducts;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-white transition-colors">Products</Link>
        <span>/</span>
        <span className="text-zinc-300">{category!.name}</span>
      </nav>

      {/* Category header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{category!.icon}</span>
          <h1 className="text-3xl font-bold text-white">{category!.name}</h1>
        </div>
        <p className="text-sm text-zinc-400">
          {products.length} handpicked {category!.name.toLowerCase()} products, ranked by quality and customer reviews
        </p>
      </div>

      {/* Products */}
      <ProductGrid products={products} />

      {/* Related Categories */}
      {allCategories.length > 1 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-white mb-6">Browse Other Categories</h2>
          <div className="flex flex-wrap gap-3">
            {allCategories
              .filter((c) => c.slug !== slug)
              .slice(0, 12)
              .map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="flex items-center gap-2 bg-[#141416] border border-[#1f1f23] rounded-lg px-4 py-2 text-sm text-zinc-400 hover:text-white hover:border-orange-500/30 transition-all"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                  <span className="text-zinc-600 text-xs">({cat.count})</span>
                </Link>
              ))}
          </div>
        </section>
      )}
    </div>
  );
}
