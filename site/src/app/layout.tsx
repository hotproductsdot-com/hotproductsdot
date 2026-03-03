import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import { getAllCategories } from "@/lib/categories";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "HotProducts - Discover the Best Products on Amazon",
    template: "%s | HotProducts",
  },
  description:
    "Handpicked premium products from Amazon. Curated for quality, rated by thousands, and ready to ship. Find the hottest deals across tech, home, fitness, and more.",
  keywords: [
    "best amazon products",
    "product reviews",
    "amazon deals",
    "tech gadgets",
    "premium products",
    "product recommendations",
  ],
  metadataBase: new URL("https://hotproductsdot.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hotproductsdot.com",
    siteName: "HotProducts",
    title: "HotProducts - Discover the Best Products on Amazon",
    description: "Handpicked premium products from Amazon. Curated for quality, rated by thousands.",
  },
  twitter: {
    card: "summary_large_image",
    title: "HotProducts - Discover the Best Products on Amazon",
    description: "Handpicked premium products from Amazon. Curated for quality, rated by thousands.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = getAllCategories();

  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0a0a0b] text-white antialiased`}>
        <AffiliateDisclosure />
        <Header categories={categories} />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
