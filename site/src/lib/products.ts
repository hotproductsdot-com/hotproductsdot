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
}

const AFFILIATE_TAG = "hotproducts-20";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parsePrice(raw: string): { display: string; min: number } {
  if (!raw) return { display: "Check Price", min: 0 };

  const cleaned = raw.replace(/[$,]/g, "").trim();

  // Handle range like "1000-1500" or "$1000-1500"
  const rangeMatch = cleaned.match(/(\d+)\s*-\s*(\d+)/);
  if (rangeMatch) {
    const low = parseInt(rangeMatch[1], 10);
    const high = parseInt(rangeMatch[2], 10);
    return {
      display: `$${low.toLocaleString()} - $${high.toLocaleString()}`,
      min: low,
    };
  }

  // Handle single price like "549" or "$549"
  const singleMatch = cleaned.match(/(\d+)/);
  if (singleMatch) {
    const price = parseInt(singleMatch[1], 10);
    return { display: `$${price.toLocaleString()}`, min: price };
  }

  return { display: raw, min: 0 };
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

  // Fix known problematic category values from CSV inconsistencies
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

export function getAllProducts(): Product[] {
  const csvPath = path.join(process.cwd(), "..", "products", "top-1000.csv");
  const csvContent = fs.readFileSync(csvPath, "utf-8");

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

    // Deduplicate by slug (CSV has some duplicate entries)
    if (seen.has(slug)) continue;
    seen.add(slug);

    const category = normalizeCategory(row["Category"]);
    const price = parsePrice(row["Price Range"]);
    const reviewCount = parseReviewCount(row["Review Count"]);
    const rating = parseRating(row["Rating"]);
    const bsr = (row["BSR"] || "").trim();
    const affiliatePotential = parseInt(row["Affiliate Potential"] || "7", 10);

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
      amazonUrl: buildAmazonUrl(name),
    });
  }

  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

export function getFeaturedProducts(count = 12): Product[] {
  return getAllProducts()
    .sort((a, b) => b.affiliatePotential - a.affiliatePotential || b.rating - a.rating)
    .slice(0, count);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return getAllProducts().filter((p) => p.categorySlug === categorySlug);
}
