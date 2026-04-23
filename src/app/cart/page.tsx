"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/products";

const CATEGORY_EMOJI: Record<string, string> = {
  "Karam Podi":      "🌶️",
  "Masala Powder":   "🫙",
  "Ready Mix":       "🥣",
  "Delicious Sweet": "🍬",
  "Spicy Snack":     "🍟",
};

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  const shipping = totalPrice >= 500 ? 0 : 60;
  const total = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <ShoppingBag size={52} className="mx-auto text-amber-200 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-400 mb-8">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/products"
          className="inline-flex items-center gap-2 bg-amber-600 text-white px-7 py-3 rounded-full text-sm font-semibold hover:bg-amber-700 transition-colors">
          Browse Products <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">My Cart</h1>
        <button onClick={clearCart} className="text-sm text-gray-400 hover:text-red-500 transition-colors">
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 bg-white border border-amber-100 rounded-2xl p-4 hover:border-amber-200 transition-colors">
              <div className="w-20 h-20 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0 text-4xl overflow-hidden relative">
                {product.image_url ? (
                  <Image src={product.image_url} alt={product.name} fill className="object-cover" sizes="80px" />
                ) : (
                  CATEGORY_EMOJI[product.category] ?? "🍱"
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-amber-600 font-medium">{product.category}</p>
                <h3 className="text-sm font-bold text-gray-800 mt-0.5 line-clamp-2">{product.name}</h3>
                {product.net_weight_g && <p className="text-xs text-gray-400 mt-0.5">{product.net_weight_g}g</p>}
                <p className="text-sm font-bold text-gray-900 mt-1">
                  {product.mrp_inr ? formatPrice(product.mrp_inr) : "Contact for price"}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center border-2 border-gray-200 rounded-full overflow-hidden text-sm">
                    <button onClick={() => updateQuantity(product.id, Math.max(1, quantity - 1))}
                      className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-50">−</button>
                    <span className="w-6 text-center font-bold">{quantity}</span>
                    <button onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-50">+</button>
                  </div>
                  <button onClick={() => removeFromCart(product.id)}
                    className="text-gray-300 hover:text-red-400 transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-extrabold text-gray-900">
                  {product.mrp_inr ? formatPrice(product.mrp_inr * quantity) : "—"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-amber-50 rounded-2xl p-6 h-fit border border-amber-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Subtotal</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Delivery</span>
            <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
              {shipping === 0 ? "Free 🎉" : formatPrice(shipping)}
            </span>
          </div>
          {totalPrice > 0 && totalPrice < 500 && (
            <p className="text-xs text-amber-700 bg-amber-100 rounded-lg px-3 py-2 mb-2">
              Add {formatPrice(500 - totalPrice)} more for free delivery!
            </p>
          )}
          <div className="border-t border-amber-200 my-4" />
          <div className="flex justify-between font-extrabold text-gray-900 mb-6 text-base">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <Link href="/checkout"
            className="flex items-center justify-center gap-2 w-full bg-amber-600 text-white py-3 rounded-full text-sm font-bold hover:bg-amber-700 transition-colors">
            Proceed to Checkout <ArrowRight size={16} />
          </Link>
          <Link href="/products" className="block text-center text-sm text-gray-400 hover:text-amber-700 mt-3 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
