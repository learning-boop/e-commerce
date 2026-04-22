"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";

const CATEGORY_META: Record<string, { emoji: string; bg: string; text: string }> = {
  "Karam Podi":      { emoji: "🌶️", bg: "from-orange-100 to-red-50",    text: "text-red-700" },
  "Masala Powder":   { emoji: "🫙",  bg: "from-yellow-100 to-amber-50",  text: "text-amber-700" },
  "Ready Mix":       { emoji: "🥣",  bg: "from-green-100 to-emerald-50", text: "text-green-700" },
  "Delicious Sweet": { emoji: "🍬",  bg: "from-pink-100 to-rose-50",     text: "text-rose-600" },
  "Spicy Snack":     { emoji: "🍟",  bg: "from-amber-100 to-orange-50",  text: "text-orange-700" },
};

const DEFAULT_META = { emoji: "🍱", bg: "from-gray-100 to-gray-50", text: "text-gray-600" };

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const meta = CATEGORY_META[product.category] ?? DEFAULT_META;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-amber-100 hover:shadow-lg hover:border-amber-300 transition-all duration-300 flex flex-col">
      {/* Dummy image placeholder */}
      <Link href={`/products/${product.id}`} className={`block relative aspect-[4/3] bg-gradient-to-br ${meta.bg} overflow-hidden flex-shrink-0`}>
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 group-hover:scale-105 transition-transform duration-500">
          <span className="text-5xl drop-shadow">{meta.emoji}</span>
          <span className={`text-xs font-semibold ${meta.text} opacity-60`}>Image coming soon</span>
        </div>
        <span className="absolute top-2 left-2 bg-white/90 text-xs px-2 py-0.5 rounded-full border border-amber-100 font-medium shadow-sm text-gray-600">
          {meta.emoji} {product.category}
        </span>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm font-bold text-gray-800 hover:text-amber-700 transition-colors leading-snug mb-3 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {product.description && (
          <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">{product.description}</p>
        )}

        <div className="mt-auto flex items-center justify-between pt-2">
          <div>
            {product.mrp_inr ? (
              <span className="text-base font-bold text-gray-900">{formatPrice(product.mrp_inr)}</span>
            ) : (
              <span className="text-xs font-semibold text-amber-600">Contact for price</span>
            )}
            {product.net_weight_g && (
              <p className="text-xs text-gray-400">{product.net_weight_g}g</p>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs px-3 py-2 rounded-full font-medium transition-colors"
          >
            <ShoppingBag size={13} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
