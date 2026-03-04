import { getAllProducts } from "./products";

export interface Category {
  name: string;
  slug: string;
  count: number;
  icon: string;
}

const CATEGORY_ICONS: Record<string, string> = {
  laptops: "💻",
  "gaming-laptops": "🎮",
  "gaming-desktops": "🖥️",
  "gaming-peripherals": "🖱️",
  "gaming-headsets": "🎧",
  headphones: "🎧",
  audio: "🔊",
  speakers: "🔈",
  monitors: "🖥️",
  "smart-home": "🏠",
  "smart-displays": "📱",
  security: "🔒",
  photography: "📷",
  drones: "✈️",
  kitchen: "🍳",
  home: "🏡",
  furniture: "🪑",
  fitness: "💪",
  tablets: "📱",
  computers: "💻",
  streaming: "📺",
  "personal-care": "✨",
  electronics: "⚡",
};

export function getAllCategories(): Category[] {
  const products = getAllProducts();
  const categoryMap = new Map<string, { name: string; slug: string; count: number }>();

  for (const product of products) {
    const existing = categoryMap.get(product.categorySlug);
    if (existing) {
      existing.count++;
    } else {
      categoryMap.set(product.categorySlug, {
        name: product.category,
        slug: product.categorySlug,
        count: 1,
      });
    }
  }

  return Array.from(categoryMap.values())
    .map((cat) => ({
      ...cat,
      icon: CATEGORY_ICONS[cat.slug] || "📦",
    }))
    .sort((a, b) => b.count - a.count);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getAllCategories().find((c) => c.slug === slug);
}
