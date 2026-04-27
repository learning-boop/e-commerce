import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Truck, Heart, Phone, Home, Package } from "lucide-react";
import { products, categories, galleryImages, getProductsByCategory } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import HeroBanner from "@/components/ui/HeroBanner";

const CATEGORY_META: Record<string, { label: string; desc: string; bg: string }> = {
  "Karam Podi": {
    label: "Karam Podi",
    desc: "Traditional spice powders crafted with fresh ingredients — rich in authentic Andhra flavour.",
    bg: "bg-gradient-to-br from-orange-50 to-red-50",
  },
  "Masala Powder": {
    label: "Masala Powder",
    desc: "Pure, home-ground masala blends for everyday cooking — no fillers, no preservatives.",
    bg: "bg-gradient-to-br from-yellow-50 to-amber-50",
  },
  "Ready Mix": {
    label: "Ready Mix",
    desc: "Convenient, flavourful ready mixes for classic South Indian dishes — quick meals without compromise.",
    bg: "bg-white",
  },
  "Delicious Sweet": {
    label: "Delicious Sweets",
    desc: "Traditional Telugu sweets made with jaggery and natural ingredients — perfect for every celebration.",
    bg: "bg-gradient-to-br from-pink-50 to-rose-50",
  },
  "Spicy Snack": {
    label: "Spicy Snacks",
    desc: "Crispy, crunchy homemade snacks with bold Andhra spice — great for any time of day.",
    bg: "bg-gradient-to-br from-amber-50 to-orange-50",
  },
  "Vadiyalu": {
    label: "Vadiyalu",
    desc: "Traditional sun-dried handmade Andhra fryums — crispy, light, and full of flavour.",
    bg: "bg-gradient-to-br from-lime-50 to-green-50",
  },
  "Non-Veg Pickle": {
    label: "Non-Veg Pickles",
    desc: "Spicy, flavour-packed non-veg pickles made with fresh meat and aromatic homemade spices.",
    bg: "bg-gradient-to-br from-red-50 to-orange-50",
  },
  "NRI Special Products": {
    label: "NRI Special Products",
    desc: "Curated combo packs for NRI customers — pickles, karam podis, ready mixes, and sweets bundled for easy overseas ordering.",
    bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
  },
  "International Shipping": {
    label: "International Shipping",
    desc: "Products available for global shipping — delivering authentic Andhra flavours to your doorstep anywhere in the world.",
    bg: "bg-gradient-to-br from-sky-50 to-blue-50",
  },
  "NRI Combo Packs": {
    label: "NRI Combo Packs",
    desc: "Themed combo packs — Andhra, breakfast, spice, and snacks — assembled for NRI households missing home flavours.",
    bg: "bg-gradient-to-br from-violet-50 to-purple-50",
  },
  "Gift Packs for Abroad": {
    label: "Gift Packs for Abroad",
    desc: "Ready-to-ship gift packs for festivals, celebrations, and milestone occasions abroad.",
    bg: "bg-gradient-to-br from-rose-50 to-pink-50",
  },
  "Festival Delivery (NRI)": {
    label: "Festival Delivery (NRI)",
    desc: "Festival-special packs timed for Diwali, Sankranti, and Ugadi delivery to international addresses.",
    bg: "bg-gradient-to-br from-amber-50 to-yellow-50",
  },
  "Virtual Shopping Service": {
    label: "Virtual Shopping Service",
    desc: "Assisted shopping — place custom grocery, family, or festival orders remotely and have them delivered.",
    bg: "bg-gradient-to-br from-teal-50 to-cyan-50",
  },
  "Sarees": {
    label: "Sarees",
    desc: "Handpicked cotton, silk, daily-wear, and festive sarees in traditional Andhra weaves.",
    bg: "bg-gradient-to-br from-fuchsia-50 to-pink-50",
  },
  "Traditional Wear": {
    label: "Traditional Wear",
    desc: "Ethnic sets, traditional dresses, and handloom wear for cultural and everyday occasions.",
    bg: "bg-gradient-to-br from-orange-50 to-amber-50",
  },
  "Kurtas & Ethnic Wear": {
    label: "Kurtas & Ethnic Wear",
    desc: "Men's kurtas, women's kurtis, and coordinated kurta sets for everyday and occasion wear.",
    bg: "bg-gradient-to-br from-emerald-50 to-green-50",
  },
  "Festive Collections": {
    label: "Festive Collections",
    desc: "Wedding wear, festival-special dresses, and designer pieces for celebrations.",
    bg: "bg-gradient-to-br from-yellow-50 to-orange-50",
  },
  "Women's Wear": {
    label: "Women's Wear",
    desc: "Sarees, kurtis, and dress materials curated for women across styles and occasions.",
    bg: "bg-gradient-to-br from-pink-50 to-fuchsia-50",
  },
  "Men's Wear": {
    label: "Men's Wear",
    desc: "Kurtas, traditional sets, and casual ethnic wear for men.",
    bg: "bg-gradient-to-br from-slate-50 to-blue-50",
  },
};

const PREVIEW_COUNT = 6;

export default function HomePage() {
  return (
    <>
      {/* ── Hero Banner ── */}
      <HeroBanner />

      {/* ── Category Quick Links ── */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Our Categories</h2>
        <p className="text-gray-500 text-sm text-center mb-7">
          {products.length}+ products across {categories.length} categories — everything made fresh at home
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat, idx) => {
            const meta = CATEGORY_META[cat];
            const count = getProductsByCategory(cat).length;
            return (
              <Link
                key={cat}
                href={`/products?cat=${encodeURIComponent(cat)}`}
                className="flex items-center gap-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 hover:border-amber-400 rounded-full px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-amber-800 transition-all"
              >
                {meta?.label ?? cat}
                <img src={`/icon/${idx + 1}.png`} alt={meta?.label ?? cat} className="w-5 h-5 object-contain" />
              </Link>
            );
          })}
        </div>
      </section>
      {/* ── Trust Badges ── */}
      <section className="bg-white border-b border-gray-100">
        <img 
          src="/strip1.png"
        />
      </section>

      {/* ── Per-Category Sections ── */}
      {categories.map((cat, idx) => {
        const meta = CATEGORY_META[cat];
        const catProducts = getProductsByCategory(cat);
        const preview = catProducts.slice(0, PREVIEW_COUNT);
        const hasMore = catProducts.length > PREVIEW_COUNT;

        return (
          <section key={cat} className={`py-0 ${meta?.bg ?? "bg-white"}`}>
            <div>
            </div>
            <div className="px-4 sm:px-6 lg:px-8">
              {/* Section header */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                      {meta?.label ?? cat}
                    </h2>
                  </div>
                  <p className="text-gray-500 text-sm max-w-lg">{meta?.desc}</p>
                </div>
                <Link
                  href={`/products?cat=${encodeURIComponent(cat)}`}
                  className="inline-flex items-center gap-1 text-sm text-amber-700 hover:text-amber-900 font-semibold whitespace-nowrap transition-colors"
                >
                  View all {catProducts.length} <ArrowRight size={14} />
                </Link>
              </div>

              {/* Delicious Sweet Banner */}
              {cat === "Delicious Sweet" && (
                <div className="mb-6">
                  <img src="/banner7.png" alt="Delicious Sweets Banner" className="w-full rounded-xl" />
                </div>
              )}

              {/* Non-Veg Pickle Banner */}
              {cat === "Non-Veg Pickle" && (
                <div className="mb-6">
                  <img src="/banner6.png" alt="Non-Veg Pickle Banner" className="w-full rounded-xl" />
                </div>
              )}

              {/* Product grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {preview.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {hasMore && (
                <div className="mt-6 text-center">
                  <Link
                    href={`/products?cat=${encodeURIComponent(cat)}`}
                    className="inline-flex items-center gap-2 border-2 border-amber-500 text-amber-700 hover:bg-amber-500 hover:text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
                  >
                    See all {catProducts.length} {meta?.label ?? cat} <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          </section>
        );
      })}

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
