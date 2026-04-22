"use client";

import { notFound } from "next/navigation";
import { ShoppingBag, ArrowLeft, Check, Package, Info } from "lucide-react";
import Link from "next/link";
import { getProductById, products, formatPrice } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useState, use } from "react";
import ProductCard from "@/components/ui/ProductCard";

const CATEGORY_META: Record<string, { emoji: string; bg: string }> = {
  "Karam Podi":      { emoji: "🌶️", bg: "from-orange-100 to-red-50" },
  "Masala Powder":   { emoji: "🫙",  bg: "from-yellow-100 to-amber-50" },
  "Ready Mix":       { emoji: "🥣",  bg: "from-green-100 to-emerald-50" },
  "Delicious Sweet": { emoji: "🍬",  bg: "from-pink-100 to-rose-50" },
  "Spicy Snack":     { emoji: "🍟",  bg: "from-amber-100 to-orange-50" },
};

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);
  const { addToCart } = useCart();

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) notFound();

  const safeProduct = product!;
  const meta = CATEGORY_META[safeProduct.category] ?? { emoji: "🍱", bg: "from-gray-100 to-gray-50" };

  const related = products
    .filter((p) => p.category === safeProduct.category && p.id !== safeProduct.id)
    .slice(0, 4);

  function handleAddToCart() {
    addToCart(safeProduct, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/products" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-amber-700 mb-8 transition-colors">
        <ArrowLeft size={14} /> Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* Dummy image placeholder */}
        <div className={`relative aspect-square bg-gradient-to-br ${meta.bg} rounded-3xl overflow-hidden border border-amber-100 flex flex-col items-center justify-center gap-3`}>
          <span className="text-8xl drop-shadow">{meta.emoji}</span>
          <span className="text-sm text-gray-400 font-medium">Image coming soon</span>
          <span className="absolute top-4 left-4 bg-white text-amber-700 text-xs px-3 py-1 rounded-full border border-amber-200 font-semibold shadow-sm">
            {meta.emoji} {safeProduct.category}
          </span>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-start">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 leading-snug">
            {safeProduct.name}
          </h1>

          {safeProduct.description && (
            <p className="text-gray-600 leading-relaxed text-sm mb-4">{safeProduct.description}</p>
          )}

          {/* Weight & Best Before */}
          {(safeProduct.net_weight_g || safeProduct.best_before) && (
            <div className="flex gap-4 mb-5 flex-wrap">
              {safeProduct.net_weight_g && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-2 text-center">
                  <p className="text-xs text-gray-500 mb-0.5">Net Weight</p>
                  <p className="text-sm font-bold text-gray-800">{safeProduct.net_weight_g}g</p>
                </div>
              )}
              {safeProduct.best_before && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-2 text-center">
                  <p className="text-xs text-gray-500 mb-0.5">Best Before</p>
                  <p className="text-sm font-bold text-gray-800">{safeProduct.best_before}</p>
                </div>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-end gap-3 mb-6">
            {safeProduct.mrp_inr ? (
              <span className="text-3xl font-extrabold text-gray-900">{formatPrice(safeProduct.mrp_inr)}</span>
            ) : (
              <span className="text-lg font-semibold text-amber-700">Contact us for pricing</span>
            )}
          </div>

          {/* Qty */}
          <div className="flex items-center gap-4 mb-5">
            <span className="text-sm font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border-2 border-gray-200 rounded-full overflow-hidden">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-50">−</button>
              <span className="w-8 text-center text-sm font-bold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-50">+</button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 w-full md:w-auto md:px-12 py-3.5 rounded-full text-sm font-bold transition-colors bg-amber-600 hover:bg-amber-700 text-white shadow-md"
          >
            {added ? <><Check size={16} /> Added to Cart!</> : <><ShoppingBag size={16} /> Add to Cart</>}
          </button>

          {/* Storage note */}
          <div className="mt-5 bg-amber-50 border border-amber-100 rounded-xl p-3 flex gap-2 text-xs text-amber-800">
            <Package size={14} className="flex-shrink-0 mt-0.5" />
            <span>Store in a cool, dry place. Keep the container tightly sealed after use.</span>
          </div>
        </div>
      </div>

      {/* Ingredients */}
      {safeProduct.ingredients && safeProduct.ingredients.length > 0 && (
        <div className="mt-12">
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Info size={16} className="text-amber-600" /> Ingredients
            </h3>
            <div className="flex flex-wrap gap-2">
              {safeProduct.ingredients.map((ing) => (
                <span key={ing} className="text-xs bg-amber-50 border border-amber-100 text-amber-800 px-3 py-1 rounded-full">
                  {ing}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
