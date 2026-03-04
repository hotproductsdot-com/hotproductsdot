"use client";

import { useState, useCallback } from "react";
import type { Product } from "@/lib/products";
import { getCategoryEmoji } from "@/lib/utils";

export default function ProductDetailImage({ product }: { product: Product }) {
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
    <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl flex items-center justify-center border border-[#1f1f23] overflow-hidden">
      {!showFallback ? (
        <img
          ref={imgRef}
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain p-8"
        />
      ) : (
        <div className="text-8xl opacity-30">{emoji}</div>
      )}
    </div>
  );
}
