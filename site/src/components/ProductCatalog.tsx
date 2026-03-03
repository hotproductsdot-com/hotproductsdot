"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/lib/products";
import ProductCard from "./ProductCard";
import { getCategoryColor } from "@/lib/utils";

type SortOption = "featured" | "price-low" | "price-high" | "rating" | "reviews";

interface ProductCatalogProps {
  products: Product[];
  categories: { name: string; slug: string; count: number }[];
  initialCategory?: string;
}

export default function ProductCatalog({ products, categories, initialCategory }: ProductCatalogProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const filtered = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.categorySlug === selectedCategory);
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.priceMin - b.priceMin);
        break;
      case "price-high":
        result.sort((a, b) => b.priceMin - a.priceMin);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "featured":
      default:
        result.sort((a, b) => b.affiliatePotential - a.affiliatePotential || b.rating - a.rating);
    }

    return result;
  }, [products, search, selectedCategory, sortBy]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#141416] border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/50 transition-colors"
          />
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="bg-[#141416] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-colors"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="reviews">Most Reviewed</option>
        </select>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Category sidebar */}
        <aside className="lg:w-56 shrink-0">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Categories</h3>
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`text-left text-sm px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === "all"
                  ? "bg-orange-500/20 text-orange-400 font-medium"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              All ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`text-left text-sm px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat.slug
                    ? `${getCategoryColor(cat.slug)} font-medium`
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-zinc-400">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-zinc-400 text-lg">No products found.</p>
              <p className="text-zinc-500 text-sm mt-2">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
