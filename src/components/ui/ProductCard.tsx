"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";

const CATEGORY_EMOJI: Record<string, string> = {
  "Karam Podi": "🌶️",
  "Non‑Veg Pickle": "🍗",
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-amber-100 hover:shadow-lg hover:border-amber-300 transition-all duration-300">
      {/* Image */}
      <Link href={`/products/${product.product_id}`} className="block relative aspect-[4/5] bg-amber-50 overflow-hidden">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
            <span className="text-5xl mb-2">{CATEGORY_EMOJI[product.category] ?? "🍱"}</span>
            <span className="text-xs text-amber-400 font-medium">Image Coming Soon</span>
          </div>
        )}
        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-white text-amber-700 text-xs px-2 py-0.5 rounded-full border border-amber-200 font-medium shadow-sm">
          {CATEGORY_EMOJI[product.category]} {product.category}
        </span>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link href={`/products/${product.product_id}`}>
          <h3 className="text-sm font-bold text-gray-800 hover:text-amber-700 transition-colors leading-snug mb-1 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">{product.description}</p>

        <p className="text-xs text-gray-400 mb-3">{product.net_weight_g}g · Best before: {product.best_before}</p>

        {/* Price + Cart */}
        <div className="flex items-center justify-between">
          <div>
            {product.mrp_inr ? (
              <span className="text-base font-bold text-gray-900">{formatPrice(product.mrp_inr)}</span>
            ) : (
              <span className="text-sm font-semibold text-amber-700">Price on request</span>
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
