"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Navbar() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      {/* Top announcement bar */}
      <div className="bg-amber-600 text-white text-center text-xs py-2 px-4 tracking-wide">
        🚚 Free delivery on orders above ₹500 &nbsp;|&nbsp; 100% Homemade &amp; Natural &nbsp;|&nbsp; Freshly Made to Order
      </div>

      {/* Main header */}
      <div className="bg-white border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="logo"
              width={160}
              height={56}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-amber-700 transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-amber-700 transition-colors">
              Products
            </Link>
            <Link href="/products?cat=Karam+Podi" className="text-sm font-medium text-gray-700 hover:text-amber-700 transition-colors">
              Karam Podi
            </Link>
            <Link href="/products?cat=Non%E2%80%91Veg+Pickle" className="text-sm font-medium text-gray-700 hover:text-amber-700 transition-colors">
              Non-Veg Pickles
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
              <ShoppingBag size={16} />
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <span className="bg-white text-amber-700 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="md:hidden text-gray-600 hover:text-amber-700"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4 flex flex-col gap-3">
          {[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Karam Podi", href: "/products?cat=Karam+Podi" },
            { label: "Non-Veg Pickles", href: "/products?cat=Non%E2%80%91Veg+Pickle" },
            { label: "Cart", href: "/cart" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-gray-700 hover:text-amber-700 font-medium py-1"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
