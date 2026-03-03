"use client";

import Link from "next/link";
import { useState } from "react";

interface HeaderProps {
  categories: { name: string; slug: string; count: number; icon: string }[];
}

export default function Header({ categories }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0b]/95 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <span className="text-xl font-bold text-white">
              Hot<span className="text-orange-500">Products</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-zinc-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-sm text-zinc-300 hover:text-white transition-colors">
              All Products
            </Link>

            {/* Categories dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                onBlur={() => setTimeout(() => setCategoryDropdownOpen(false), 200)}
                className="text-sm text-zinc-300 hover:text-white transition-colors flex items-center gap-1"
              >
                Categories
                <svg className={`w-4 h-4 transition-transform ${categoryDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {categoryDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-[#141416] border border-zinc-800 rounded-xl shadow-2xl py-2 max-h-80 overflow-y-auto">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="flex items-center justify-between px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                      <span>
                        {cat.icon} {cat.name}
                      </span>
                      <span className="text-xs text-zinc-500">{cat.count}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/about" className="text-sm text-zinc-300 hover:text-white transition-colors">
              About
            </Link>
          </nav>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-zinc-300 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-800 py-4">
            <nav className="flex flex-col gap-3">
              <Link href="/" className="text-sm text-zinc-300 hover:text-white px-2 py-1" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/products" className="text-sm text-zinc-300 hover:text-white px-2 py-1" onClick={() => setMobileMenuOpen(false)}>
                All Products
              </Link>
              <div className="border-t border-zinc-800 pt-3 mt-1">
                <p className="text-xs text-zinc-500 uppercase tracking-wider px-2 mb-2">Categories</p>
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="flex items-center justify-between text-sm text-zinc-300 hover:text-white px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{cat.icon} {cat.name}</span>
                    <span className="text-xs text-zinc-500">{cat.count}</span>
                  </Link>
                ))}
              </div>
              <Link href="/about" className="text-sm text-zinc-300 hover:text-white px-2 py-1 border-t border-zinc-800 pt-3" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
