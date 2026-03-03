import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About HotProducts",
  description:
    "Learn about HotProducts — how we curate the best Amazon products, our review methodology, and our affiliate disclosure.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">About HotProducts</h1>

      <div className="prose prose-invert prose-zinc max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">What We Do</h2>
          <p className="text-zinc-400 leading-relaxed">
            HotProducts is a curated product discovery site. We handpick the best premium products
            available on Amazon — from cutting-edge tech gadgets and photography gear to smart home
            devices and kitchen essentials. Every product in our catalog has been selected based on
            real customer reviews, ratings, and best-seller rankings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">How We Choose Products</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            We don&apos;t just list everything. Our selection criteria includes:
          </p>
          <ul className="space-y-3 text-zinc-400">
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1">&#x2022;</span>
              <span><strong className="text-white">High ratings</strong> — Minimum 4.3 stars from real Amazon customers</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1">&#x2022;</span>
              <span><strong className="text-white">Significant review volume</strong> — Products with substantial customer feedback</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1">&#x2022;</span>
              <span><strong className="text-white">Best-seller performance</strong> — Top sellers in their respective categories</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1">&#x2022;</span>
              <span><strong className="text-white">Value proposition</strong> — Products that deliver quality relative to their price</span>
            </li>
          </ul>
        </section>

        <section className="bg-[#141416] border border-[#1f1f23] rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Affiliate Disclosure</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            HotProducts is a participant in the Amazon Services LLC Associates Program, an affiliate
            advertising program designed to provide a means for sites to earn advertising fees by
            advertising and linking to Amazon.com.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            <strong className="text-white">What this means for you:</strong> When you click on a product
            link and make a purchase on Amazon, we may earn a small commission at no additional cost to
            you. This helps us keep the site running and continue curating quality products.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            <strong className="text-white">Our commitment:</strong> We never let affiliate commissions
            influence our product selections. We recommend products based on quality, customer feedback,
            and real value — not commission rates. We never fabricate specifications, ratings, or use cases.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">FTC Disclosure</h2>
          <p className="text-zinc-400 leading-relaxed">
            In accordance with the Federal Trade Commission&apos;s 16 CFR Part 255, &quot;Guides
            Concerning the Use of Endorsements and Testimonials in Advertising,&quot; we disclose that
            we receive compensation in the form of affiliate commissions for purchases made through
            links on this website. Product prices and availability are subject to change. Any price and
            availability information displayed on Amazon.com at the time of purchase will apply to the
            purchase of the product.
          </p>
        </section>

        <div className="pt-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Browse Products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
