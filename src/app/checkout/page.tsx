"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { formatPrice } from "@/lib/products";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", pincode: "",
    paymentMethod: "cod",
  });

  const shipping = totalPrice >= 500 ? 0 : 60;
  const total = totalPrice + shipping;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
    setTimeout(() => router.push("/"), 4000);
  }

  if (items.length === 0 && !submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <p className="text-gray-500 mb-4">No items in cart.</p>
        <Link href="/products" className="text-amber-700 underline text-sm">Browse Products</Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-200">
          <Check size={32} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Order Placed! 🎉</h2>
        <p className="text-gray-500 mb-1">Thank you for your order. We&apos;ll pack it fresh for you!</p>
        <p className="text-sm text-gray-400">You&apos;ll receive a confirmation on your phone/email shortly.</p>
        <p className="text-xs text-gray-300 mt-4">Redirecting you home...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/cart" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-amber-700 mb-8 transition-colors">
        <ArrowLeft size={14} /> Back to Cart
      </Link>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 flex flex-col gap-8">
          {/* Delivery details */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Delivery Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <input required name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400" />
              <input required name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400" />
              <input required name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange}
                className="col-span-2 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400" />
              <input required name="phone" type="tel" placeholder="Mobile Number" value={form.phone} onChange={handleChange}
                className="col-span-2 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400" />
              <input required name="address" placeholder="Full Address" value={form.address} onChange={handleChange}
                className="col-span-2 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400" />
              <input required name="city" placeholder="City" value={form.city} onChange={handleChange}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400" />
              <input required name="state" placeholder="State" value={form.state} onChange={handleChange}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400" />
              <input required name="pincode" placeholder="PIN Code" value={form.pincode} onChange={handleChange}
                className="col-span-2 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400" />
            </div>
          </div>

          {/* Payment */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Payment Method</h2>
            <div className="flex flex-col gap-3">
              {[
                { val: "cod", label: "💵 Cash on Delivery" },
                { val: "upi", label: "📱 UPI / PhonePe / GPay" },
                { val: "card", label: "💳 Debit / Credit Card" },
              ].map((opt) => (
                <label key={opt.val} className={`flex items-center gap-3 border-2 rounded-xl p-4 cursor-pointer transition-colors ${form.paymentMethod === opt.val ? "border-amber-500 bg-amber-50" : "border-gray-200 hover:border-amber-200"}`}>
                  <input type="radio" name="paymentMethod" value={opt.val} checked={form.paymentMethod === opt.val} onChange={handleChange} className="accent-amber-600" />
                  <span className="text-sm font-medium text-gray-700">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit"
            className="w-full bg-amber-600 text-white py-4 rounded-full text-sm font-extrabold hover:bg-amber-700 transition-colors shadow-md">
            Place Order · {formatPrice(total)}
          </button>
        </form>

        {/* Order summary */}
        <div className="bg-amber-50 rounded-2xl p-6 h-fit border border-amber-100">
          <h2 className="text-base font-bold text-gray-900 mb-4">Your Order</h2>
          <div className="flex flex-col gap-3 mb-4">
            {items.map(({ product, quantity }) => (
              <div key={product.product_id} className="flex justify-between text-sm text-gray-600">
                <span className="truncate max-w-[160px] leading-tight">
                  {product.name}
                  <span className="block text-xs text-gray-400">{product.net_weight_g}g × {quantity}</span>
                </span>
                <span className="font-bold text-gray-800 ml-2">
                  {product.mrp_inr ? formatPrice(product.mrp_inr * quantity) : "—"}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-amber-200 pt-4 flex flex-col gap-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Delivery</span>
              <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>{shipping === 0 ? "Free 🎉" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between font-extrabold text-gray-900 text-base">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
