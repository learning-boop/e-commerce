import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Truck, Phone, Home, Package } from "lucide-react";
import { products, categories, galleryImages, getProductsByCategory } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import HeroBanner from "@/components/ui/HeroBanner";

const PREVIEW_COUNT = 6;

const trendingProducts = products.slice(0, PREVIEW_COUNT);
const mostVisitedProducts = products.slice(PREVIEW_COUNT, PREVIEW_COUNT * 2);
const sweetProducts = getProductsByCategory("Delicious Sweet").slice(0, PREVIEW_COUNT);
const pickleProducts = getProductsByCategory("Non-Veg Pickle").slice(0, PREVIEW_COUNT);

export default function HomePage() {
  return (
    <>
      {/* ── Hero Banner ── */}
      <HeroBanner />

      {/* ── Category Icon Strip ── */}
      <section id="categories" className="bg-white py-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-gray-900 mb-1 text-center">Shop by Category</h2>
          <p className="text-gray-400 text-xs text-center mb-5">
            {products.length}+ products across {categories.length} categories
          </p>
          <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide justify-start sm:justify-center">
            {categories.map((cat, idx) => (
              <Link
                key={cat}
                href={`/products?cat=${encodeURIComponent(cat)}`}
                className="flex flex-col items-center gap-2 min-w-[72px] group"
              >
                <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-100 group-hover:border-amber-400 group-hover:bg-amber-100 transition-all flex items-center justify-center overflow-hidden shadow-sm">
                  <img src={`/icon/${idx + 1}.png`} alt={cat} className="w-10 h-10 object-contain" />
                </div>
                <span className="text-[11px] font-semibold text-gray-700 group-hover:text-amber-700 text-center leading-tight max-w-[72px] transition-colors">
                  {cat}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <section className="bg-white border-b border-gray-100">
        <img src="/strip1.png" alt="trust badges" />
      </section>

      {/* ── Trending Products ── */}
      <section className="py-10 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Trending Products</h2>
              <p className="text-gray-500 text-sm mt-1">Most popular picks right now</p>
            </div>
            <Link href="/products" className="inline-flex items-center gap-1 text-sm text-amber-700 hover:text-amber-900 font-semibold transition-colors">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Delicious Sweets Banner + Products ── */}
      <section className="py-10 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Delicious Sweets</h2>
              <p className="text-gray-500 text-sm mt-1">Traditional Telugu sweets made with jaggery &amp; natural ingredients</p>
            </div>
            <Link href={`/products?cat=${encodeURIComponent("Delicious Sweet")}`} className="inline-flex items-center gap-1 text-sm text-amber-700 hover:text-amber-900 font-semibold transition-colors">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mb-6">
            <img src="/banner7.png" alt="Delicious Sweets Banner" className="w-full rounded-xl" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {sweetProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Most Visited Products ── */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Most Visited</h2>
              <p className="text-gray-500 text-sm mt-1">Customer favourites you don&apos;t want to miss</p>
            </div>
            <Link href="/products" className="inline-flex items-center gap-1 text-sm text-amber-700 hover:text-amber-900 font-semibold transition-colors">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {mostVisitedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Non-Veg Pickles Banner + Products ── */}
      <section className="py-10 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Non-Veg Pickles</h2>
              <p className="text-gray-500 text-sm mt-1">Spicy, flavour-packed pickles made with fresh meat &amp; homemade spices</p>
            </div>
            <Link href={`/products?cat=${encodeURIComponent("Non-Veg Pickle")}`} className="inline-flex items-center gap-1 text-sm text-amber-700 hover:text-amber-900 font-semibold transition-colors">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mb-6">
            <img src="/banner6.png" alt="Non-Veg Pickle Banner" className="w-full rounded-xl" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {pickleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="bg-amber-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Our Gallery</h2>
          <p className="text-gray-500 text-sm text-center mb-8">A glimpse of our freshly prepared products</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {galleryImages.map((src, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-xl overflow-hidden border border-amber-100 hover:border-amber-300 transition-all hover:shadow-md group"
              >
                <Image
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-400"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Why Our Customers Love Us</h2>
          <p className="text-gray-500 text-sm text-center mb-10">Quality and trust in every pack</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <ShieldCheck size={32} className="text-amber-600" />, title: "No Preservatives", desc: "Pure and natural ingredients only. No artificial additives or colours." },
              { icon: <Home size={32} className="text-amber-600" />, title: "Homemade Hygiene", desc: "Prepared in a clean home kitchen following strict hygiene standards." },
              { icon: <Package size={32} className="text-amber-600" />, title: "Fresh Packaging", desc: "Sealed and packed fresh on order to retain full flavour and nutrition." },
              { icon: <Truck size={32} className="text-amber-600" />, title: "Quick Delivery", desc: "Ships within 24 hours. Free delivery on orders above ₹500." },
            ].map((item) => (
              <div key={item.title} className="bg-amber-50 border border-amber-100 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section className="bg-gradient-to-r from-amber-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold mb-1">Ready to taste the difference?</h2>
            <p className="text-amber-100 text-sm">Order now and get it delivered fresh to your doorstep.</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-white text-amber-700 font-semibold px-6 py-3 rounded-full text-sm hover:bg-amber-50 transition-colors"
            >
              Shop Now <ArrowRight size={16} />
            </Link>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-white/10 transition-colors"
            >
              <Phone size={14} /> Call Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
