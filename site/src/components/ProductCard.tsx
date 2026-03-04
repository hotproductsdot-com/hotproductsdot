"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import RatingStars from "./RatingStars";
import { getCategoryColor, formatNumber, getCategoryEmoji } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const categoryColor = getCategoryColor(product.categorySlug);
  const [showFallback, setShowFallback] = useState(!product.imageUrl);
  const emoji = getCategoryEmoji(product.categorySlug);

  const imgRef = useCallback((img: HTMLImageElement | null) => {
    if (!img) return;
    const check = () => {
      if (img.complete && (img.naturalWidth <= 1 || img.naturalHeight <= 1)) {
        setShowFallback(true);
      }
    };
    check();
    img.addEventListener("load", check);
    img.addEventListener("error", () => setShowFallback(true));
  }, []);

  return (
    <div className="group relative bg-[#141416] border border-[#1f1f23] rounded-xl overflow-hidden transition-all duration-300 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5 hover:-translate-y-1">
      {/* Product image */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center overflow-hidden">
          {!showFallback ? (
            <img
              ref={imgRef}
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="text-5xl opacity-30 group-hover:opacity-50 transition-opacity group-hover:scale-110 duration-300">
              {emoji}
            </div>
          )}
          {product.affiliatePotential >= 9 && (
            <div className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Hot Pick
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category badge */}
        <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider mb-2 ${categoryColor}`}>
          {product.category}
        </span>

        {/* Product name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-semibold text-white leading-tight mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <RatingStars rating={product.rating} />
          <span className="text-[10px] text-zinc-500">({formatNumber(product.reviewCount)})</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-white">{product.priceRange}</span>
          <a
            href={product.amazonUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
          >
            View Deal
          </a>
        </div>
      </div>
    </div>
  );
}
