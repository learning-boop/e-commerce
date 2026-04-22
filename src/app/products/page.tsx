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

      {/* Category filters */}
      <div className="flex items-center gap-2 flex-wrap mb-8">
        <button
          onClick={() => setActiveCategory("All")}
          className={clsx(
            "px-4 py-1.5 rounded-full text-sm font-medium border transition-colors",
            activeCategory === "All"
              ? "bg-amber-600 text-white border-amber-600"
              : "text-gray-600 border-gray-200 hover:border-amber-400 hover:text-amber-700"
          )}
        >
          All ({products.length})
        </button>
        {categories.map((cat) => {
          const count = products.filter((p) => p.category === cat).length;
          return (
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
              {CATEGORY_META[cat]?.emoji} {cat} ({count})
            </button>
          );
        })}

        <div className="ml-auto flex items-center gap-2 text-sm text-gray-500">
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
