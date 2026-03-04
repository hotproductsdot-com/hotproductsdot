import Papa from "papaparse";
import fs from "fs";
import path from "path";

export interface Product {
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  priceRange: string;
  priceMin: number;
  reviewCount: number;
  rating: number;
  bsr: string;
  affiliatePotential: number;
  amazonUrl: string;
  imageUrl: string;
}

const AFFILIATE_TAG = "hotproductsdot-com-20";

// Known product image URLs from Amazon (ASIN-based image CDN)
// These serve as overrides or fallbacks if ASIN extraction fails
const PRODUCT_IMAGES: Record<string, string> = {
  "apple-macbook-air-13-m4": "https://m.media-amazon.com/images/I/71vFKBpKakL._AC_SX679_.jpg",
  "dell-xps-15-laptop": "https://m.media-amazon.com/images/I/71cJMcEVmnL._AC_SX679_.jpg",
  "apple-airpods-max": "https://m.media-amazon.com/images/I/81MZBCS2ygL._AC_SX679_.jpg",
  "sony-wh-1000xm5": "https://m.media-amazon.com/images/I/61bBeAI5s8L._AC_SX679_.jpg",
  "apple-airpods-pro-2": "https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SX679_.jpg",
  "canon-eos-r5": "https://m.media-amazon.com/images/I/91BRT0FACJL._AC_SX679_.jpg",
  "dji-air-3s-drone": "https://m.media-amazon.com/images/I/71L68tKzZcL._AC_SX679_.jpg",
  "herman-miller-aeron": "https://m.media-amazon.com/images/I/71kj3KbzQiL._AC_SX679_.jpg",
  "dyson-v15-detect": "https://m.media-amazon.com/images/I/51MXMlxzxeL._AC_SX679_.jpg",
  "ring-video-doorbell-pro-2": "https://m.media-amazon.com/images/I/71VQKX5-U5L._AC_SX679_.jpg",
  "theragun-pro-massage": "https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_SX679_.jpg",
  "ninja-af400-air-fryer": "https://m.media-amazon.com/images/I/81BVaXA6UrL._AC_SX679_.jpg",
  "peloton-bike": "https://m.media-amazon.com/images/I/51amT7VJPLL._AC_SX679_.jpg",
  "sonos-era-300": "https://m.media-amazon.com/images/I/51eTMH4WZJL._AC_SX679_.jpg",
  "breville-oracle-touch": "https://m.media-amazon.com/images/I/91MtBPKtobL._AC_SX679_.jpg",
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parsePrice(raw: string): { display: string; min: number } {
  if (!raw) return { display: "Check Price", min: 0 };
  const cleaned = raw.replace(/[$,]/g, "").trim();
  if (!/\d/.test(cleaned)) return { display: "Check Price", min: 0 };
  const rangeMatch = cleaned.match(/(\d+)\s*-\s*(\d+)/);
  if (rangeMatch) {
    const low = parseInt(rangeMatch[1], 10);
    const high = parseInt(rangeMatch[2], 10);
    if (low === 0 && high === 0) return { display: "Check Price", min: 0 };
    return {
      display: `$${low.toLocaleString()} - $${high.toLocaleString()}`,
      min: low,
    };
  }
  const singleMatch = cleaned.match(/(\d+)/);
  if (singleMatch) {
    const price = parseInt(singleMatch[1], 10);
    if (price === 0) return { display: "Check Price", min: 0 };
    return { display: `$${price.toLocaleString()}`, min: price };
  }
  return { display: "Check Price", min: 0 };
}

function parseReviewCount(raw: string): number {
  const num = parseInt(String(raw).replace(/[^0-9]/g, ""), 10);
  return isNaN(num) ? 0 : num;
}

function parseRating(raw: string): number {
  const num = parseFloat(String(raw));
  return isNaN(num) || num < 1 || num > 5 ? 4.5 : num;
}

function buildAmazonUrl(productName: string): string {
  const query = encodeURIComponent(productName);
  return `https://www.amazon.com/s?k=${query}&tag=${AFFILIATE_TAG}`;
}

function normalizeCategory(raw: string): string {
  const trimmed = (raw || "").trim();
  const categoryMap: Record<string, string> = {
    tv: "Smart Home",
    robotics: "Smart Home",
    "tv device": "Streaming",
    "?": "Electronics",
    "": "Electronics",
  };
  const lower = trimmed.toLowerCase();
  if (categoryMap[lower]) return categoryMap[lower];
  return trimmed || "Electronics";
}

let _cachedProducts: Product[] | null = null;

export function getAllProducts(): Product[] {
  if (_cachedProducts) return _cachedProducts;
  try {
    const candidates = [
      path.join(process.cwd(), "..", "products", "top-1000.csv"),
      path.join(process.cwd(), "products", "top-1000.csv"),
      path.resolve("..", "products", "top-1000.csv"),
    ];

    let csvContent: string | null = null;
    for (const p of candidates) {
      try {
        csvContent = fs.readFileSync(p, "utf-8");
        break;
      } catch {
        // try next candidate
      }
    }

    if (!csvContent) {
      console.warn("Could not find top-1000.csv in any expected location");
      _cachedProducts = [];
      return [];
    }

    const result = Papa.parse(csvContent, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h: string) => h.trim(),
    });

    const seen = new Set<string>();
    const products: Product[] = [];

    for (const row of result.data as Record<string, string>[]) {
      const name = (row["Product Name"] || "").trim();
      if (!name) continue;
      
      const slug = slugify(name);
      if (seen.has(slug)) continue;
      seen.add(slug);

      const category = normalizeCategory(row["Category"]);
      const price = parsePrice(row["Price Range"]);
      const reviewCount = parseReviewCount(row["Review Count"]);
      const rating = parseRating(row["Rating"]);
      const bsr = (row["BSR"] || "").trim();
      const affiliatePotentialStr = row["Affiliate Potential"] || "7";
      const affiliatePotential = parseInt(affiliatePotentialStr, 10);
      
      const csvAmazonUrl = (row["Amazon URL"] || "").trim();
      const amazonUrl = csvAmazonUrl || buildAmazonUrl(name);
      
      const asinMatch = amazonUrl.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/i);
      const asin = asinMatch ? asinMatch[1] : null;
      
      const imageUrl = asin 
      ? `https://m.media-amazon.com/images/P/${asin}.jpg`        : (PRODUCT_IMAGES[slug] || "");

      products.push({
        name,
        slug,
        category,
        categorySlug: slugify(category),
        priceRange: price.display,
        priceMin: price.min,
        reviewCount,
        rating,
        bsr,
        affiliatePotential: isNaN(affiliatePotential) ? 7 : affiliatePotential,
        amazonUrl,
        imageUrl,
      });
    }

    _cachedProducts = products;
    return products;
  } catch (error) {
    console.error("Error loading products:", error);
    _cachedProducts = [];
    return [];
  }
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

export function getFeaturedProducts(count = 12): Product[] {
  return getAllProducts()
    .sort((a, b) => b.affiliatePotential - a.affiliatePotential || b.rating - a.rating)
    .slice(0, count);
}

export function getProductsByCategorySlug(categorySlug: string): Product[] {
  return getAllProducts().filter((p) => p.categorySlug === categorySlug);
}
