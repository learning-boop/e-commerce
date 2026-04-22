"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { products, categories, formatPrice } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import { SlidersHorizontal } from "lucide-react";
import clsx from "clsx";
import { Suspense } from "react";

const CATEGORY_EMOJI: Record<string, string> = {
  "Karam Podi": "🌶️",
  "Non‑Veg Pickle": "🍗",
};

function ProductsContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sort, setSort] = useState<string>("default");

  useEffect(() => {
    if (catParam) setActiveCategory(catParam);
  }, [catParam]);

  const filtered = products
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .sort((a, b) => {
      const aPrice = a.mrp_inr ?? 0;
      const bPrice = b.mrp_inr ?? 0;
      if (sort === "price-asc") return aPrice - bPrice;
      if (sort === "price-desc") return bPrice - aPrice;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">All Products</h1>
        <p className="text-gray-500 text-sm mt-1">Authentic homemade spice powders and pickles — made fresh with love</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveCategory("All")}
            className={clsx(
              "px-4 py-1.5 rounded-full text-sm font-medium border transition-colors",
              activeCategory === "All"
                ? "bg-amber-600 text-white border-amber-600"
                : "text-gray-600 border-gray-200 hover:border-amber-400 hover:text-amber-700"
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={clsx(
                "px-4 py-1.5 rounded-full text-sm font-medium border transition-colors",
                activeCategory === cat
                  ? "bg-amber-600 text-white border-amber-600"
                  : "text-gray-600 border-gray-200 hover:border-amber-400 hover:text-amber-700"
              )}
            >
              {CATEGORY_EMOJI[cat]} {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <SlidersHorizontal size={14} />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 bg-white focus:outline-none focus:border-amber-400"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-gray-400 text-center py-20">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>
      )}

      {/* Price note */}
      {filtered.some((p) => p.mrp_inr !== null) && (
        <p className="text-center text-xs text-gray-400 mt-8">
          Prices start from {formatPrice(Math.min(...filtered.filter(p => p.mrp_inr !== null).map(p => p.mrp_inr!)))}
        </p>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsContent />
    </Suspense>
  );
}
