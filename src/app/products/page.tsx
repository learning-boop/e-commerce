"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products, categories } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import { SlidersHorizontal } from "lucide-react";
import clsx from "clsx";

const CATEGORY_META: Record<string, { emoji: string }> = {
  "Karam Podi":      { emoji: "🌶️" },
  "Masala Powder":   { emoji: "🫙" },
  "Ready Mix":       { emoji: "🥣" },
  "Delicious Sweet": { emoji: "🍬" },
  "Spicy Snack":     { emoji: "🍟" },
};

function ProductsContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    setActiveCategory(catParam ?? "All");
  }, [catParam]);

  const filtered = products.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">All Products</h1>
        <p className="text-gray-500 text-sm mt-1">
          {products.length} homemade products — authentic, natural &amp; freshly made
        </p>
      </div>

      {/* Category filters — Flipkart-style icon strip */}
      <div className="mb-8">
        <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide">
          {/* All button */}
          <button
            onClick={() => setActiveCategory("All")}
            className="flex flex-col items-center gap-2 min-w-[72px] group"
          >
            <div className={clsx(
              "w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all shadow-sm",
              activeCategory === "All"
                ? "bg-amber-500 border-amber-500"
                : "bg-amber-50 border-amber-100 group-hover:border-amber-400 group-hover:bg-amber-100"
            )}>
              <span className={clsx("text-2xl font-bold", activeCategory === "All" ? "text-white" : "text-amber-600")}>★</span>
            </div>
            <span className={clsx(
              "text-[11px] font-semibold text-center leading-tight max-w-[72px]",
              activeCategory === "All" ? "text-amber-700" : "text-gray-700 group-hover:text-amber-700"
            )}>
              All ({products.length})
            </span>
          </button>

          {categories.map((cat, idx) => {
            const count = products.filter((p) => p.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex flex-col items-center gap-2 min-w-[72px] group"
              >
                <div className={clsx(
                  "w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all shadow-sm overflow-hidden",
                  isActive
                    ? "border-amber-500 bg-amber-100"
                    : "bg-amber-50 border-amber-100 group-hover:border-amber-400 group-hover:bg-amber-100"
                )}>
                  <img
                    src={`/icon/${idx + 1}.png`}
                    alt={cat}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <span className={clsx(
                  "text-[11px] font-semibold text-center leading-tight max-w-[72px]",
                  isActive ? "text-amber-700" : "text-gray-700 group-hover:text-amber-700"
                )}>
                  {cat}
                  <br />
                  <span className="text-gray-400 font-normal">({count})</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex justify-end items-center gap-2 text-sm text-gray-500 mt-3">
          <SlidersHorizontal size={14} />
          <span>{filtered.length} items</span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-400 text-center py-20">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
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
