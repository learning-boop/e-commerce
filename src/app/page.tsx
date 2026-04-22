import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Truck, Heart, Phone } from "lucide-react";
import { products, categories, galleryImages, getProductsByCategory } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";

const CATEGORY_META: Record<string, { emoji: string; label: string; desc: string; bg: string }> = {
  "Karam Podi": {
    emoji: "🌶️",
    label: "Karam Podi",
    desc: "Traditional spice powders crafted with fresh ingredients — rich in authentic Andhra flavour.",
    bg: "bg-gradient-to-br from-orange-50 to-red-50",
  },
  "Masala Powder": {
    emoji: "🫙",
    label: "Masala Powder",
    desc: "Pure, home-ground masala blends for everyday cooking — no fillers, no preservatives.",
    bg: "bg-gradient-to-br from-yellow-50 to-amber-50",
  },
  "Ready Mix": {
    emoji: "🥣",
    label: "Ready Mix",
    desc: "Convenient, flavourful ready mixes for classic South Indian dishes — quick meals without compromise.",
    bg: "bg-white",
  },
  "Delicious Sweet": {
    emoji: "🍬",
    label: "Delicious Sweets",
    desc: "Traditional Telugu sweets made with jaggery and natural ingredients — perfect for every celebration.",
    bg: "bg-gradient-to-br from-pink-50 to-rose-50",
  },
  "Spicy Snack": {
    emoji: "🍟",
    label: "Spicy Snacks",
    desc: "Crispy, crunchy homemade snacks with bold Andhra spice — great for any time of day.",
    bg: "bg-gradient-to-br from-amber-50 to-orange-50",
  },
};

const PREVIEW_COUNT = 6;

export default function HomePage() {
  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative w-full h-[30vh] md:h-[100vh] lg:h-[100vh]  overflow-hidden bg-amber-50">
        <Image
          src="/banner.png"
          alt="logo"
          fill
          className="object-cover object-center"
          priority
        />
      </section>

      {/* ── Trust Badges ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center gap-1.5">
              <Truck size={22} className="text-amber-600" />
              <p className="text-xs font-semibold text-gray-700">Free Delivery</p>
              <p className="text-xs text-gray-400">Orders above ₹500</p>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <ShieldCheck size={22} className="text-amber-600" />
              <p className="text-xs font-semibold text-gray-700">No Preservatives</p>
              <p className="text-xs text-gray-400">Pure &amp; Natural</p>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Heart size={22} className="text-amber-600" />
              <p className="text-xs font-semibold text-gray-700">Homemade with Love</p>
              <p className="text-xs text-gray-400">Traditional Recipes</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Quick Links ── */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Our Categories</h2>
        <p className="text-gray-500 text-sm text-center mb-7">
          {products.length}+ products across {categories.length} categories — everything made fresh at home
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => {
            const meta = CATEGORY_META[cat];
            const count = getProductsByCategory(cat).length;
            return (
              <Link
                key={cat}
                href={`/products?cat=${encodeURIComponent(cat)}`}
                className="flex items-center gap-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 hover:border-amber-400 rounded-full px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-amber-800 transition-all"
              >
                <span className="text-lg">{meta?.emoji ?? "🍱"}</span>
                {meta?.label ?? cat}
                <span className="text-xs text-gray-400 font-normal">({count})</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Per-Category Sections ── */}
      {categories.map((cat, idx) => {
        const meta = CATEGORY_META[cat];
        const catProducts = getProductsByCategory(cat);
        const preview = catProducts.slice(0, PREVIEW_COUNT);
        const hasMore = catProducts.length > PREVIEW_COUNT;

        return (
          <section key={cat} className={`py-14 ${meta?.bg ?? "bg-white"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Section header */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-3xl">{meta?.emoji ?? "🍱"}</span>
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

            {/* Banner 2 after first category */}
            {idx === 0 && (
              <div className="relative w-full overflow-hidden mt-14" style={{ minHeight: "240px" }}>
                <Image
                  src="/banner2.png"
                  alt="logo"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-amber-900/70 via-amber-800/40 to-transparent" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col justify-center h-full">
                  <div className="max-w-lg">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3 drop-shadow-lg">
                      🎁 Bulk Orders &amp; Gift Packs Available
                    </h2>
                    <p className="text-white/80 text-sm md:text-base mb-5">
                      Perfect for weddings, festivals &amp; corporate gifting. Customised packing available on request.
                    </p>
                    <Link
                      href="/products"
                      className="inline-flex items-center gap-2 bg-white text-amber-700 font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-amber-50 transition-colors shadow"
                    >
                      Explore Products <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            )}
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
              { icon: "🌿", title: "No Preservatives", desc: "Pure and natural ingredients only. No artificial additives or colours." },
              { icon: "🏠", title: "Homemade Hygiene", desc: "Prepared in a clean home kitchen following strict hygiene standards." },
              { icon: "📦", title: "Fresh Packaging", desc: "Sealed and packed fresh on order to retain full flavour and nutrition." },
              { icon: "🚚", title: "Quick Delivery", desc: "Ships within 24 hours. Free delivery on orders above ₹500." },
            ].map((item) => (
              <div key={item.title} className="bg-amber-50 border border-amber-100 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">{item.icon}</div>
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
