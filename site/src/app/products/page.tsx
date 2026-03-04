import type { Metadata } from "next";
import ProductCatalog from "@/components/ProductCatalog";
import { getAllProducts } from "@/lib/products";
import { getAllCategories } from "@/lib/categories";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse our full catalog of handpicked premium Amazon products. Search, filter by category, and sort to find exactly what you need.",
};

export default function ProductsPage() {
  const products = getAllProducts();
  const categories = getAllCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">All Products</h1>
        <p className="text-sm text-zinc-400 mt-2">
          Browse {products.length} handpicked products across {categories.length} categories
        </p>
      </div>
      <ProductCatalog products={products} categories={categories} />
    </div>
  );
}
