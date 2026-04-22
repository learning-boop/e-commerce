"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Karam Podi", href: "/products?cat=Karam+Podi" },
  { label: "Masala Powder", href: "/products?cat=Masala+Powder" },
  { label: "Ready Mix", href: "/products?cat=Ready+Mix" },
  { label: "Sweets", href: "/products?cat=Delicious+Sweet" },
  { label: "Snacks", href: "/products?cat=Spicy+Snack" },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      {/* Announcement bar */}
      <div className="bg-amber-600 text-white text-center text-xs py-2 px-4 tracking-wide">
        🚚 Free delivery on orders above ₹500 &nbsp;|&nbsp; 100% Homemade &amp; Natural &nbsp;|&nbsp; Freshly Made to Order
      </div>

      {/* Main header */}
      <div className="bg-white border-b-4 border-amber-500 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">

          {/* Brand: logo + name */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="logo"
              width={220}
              height={76}
              className="h-16 w-auto object-contain"
              priority
            />
            <div className="flex flex-col leading-tight">
              <span className="text-xl md:text-2xl font-extrabold text-amber-700 tracking-tight">
                NAARIS Home Foods
              </span>
              <span className="text-xs text-gray-400 tracking-wide">Homemade · Natural · Fresh</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-amber-700 transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/products"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-amber-700 transition-colors"
            >
              All Products
            </Link>
            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              <ShoppingBag size={16} />
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <span className="bg-white text-amber-700 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="lg:hidden text-gray-600 hover:text-amber-700"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 px-4 py-4 flex flex-col gap-2">
          {[...NAV_LINKS, { label: "All Products", href: "/products" }, { label: "Cart", href: "/cart" }].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-gray-700 hover:text-amber-700 font-medium py-2 border-b border-gray-50"
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
