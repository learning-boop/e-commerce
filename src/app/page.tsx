import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Truck, Heart, Phone } from "lucide-react";
import { products, categories, galleryImages } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";

const CATEGORY_EMOJI: Record<string, string> = {
  "Karam Podi": "",
  "Non‑Veg Pickle": "",
};

const CATEGORY_DESCRIPTION: Record<string, string> = {
  "Karam Podi": "Traditional spice powders crafted from premium ingredients — rich in flavour, made hygienically using age-old family recipes.",
  "Non‑Veg Pickle": "Bold, spicy non-vegetarian pickles prepared fresh with tender meat, aromatic spices, and authentic Andhra-style seasoning.",
};

export default function HomePage() {
  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative w-full h-[100vh] overflow-hidden bg-amber-50">
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Shop by Category</h2>
        <p className="text-gray-500 text-sm text-center mb-6">Everything made fresh — choose what you love</p>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/products?cat=${encodeURIComponent(cat)}`}
              className="flex items-center gap-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 hover:border-amber-400 rounded-full px-6 py-3 text-sm font-semibold text-gray-700 hover:text-amber-800 transition-all"
            >
              <span className="text-xl">{CATEGORY_EMOJI[cat] ?? "🍱"}</span>
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* ── Karam Podi Section ── */}
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Karam Podi</h2>
              </div>
              <p className="text-gray-500 text-sm max-w-lg">
                {CATEGORY_DESCRIPTION["Karam Podi"]}
              </p>
            </div>
            <Link
              href="/products?cat=Karam+Podi"
              className="inline-flex items-center gap-1 text-sm text-amber-700 hover:text-amber-900 font-semibold whitespace-nowrap transition-colors"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
            {products
              .filter((p) => p.category === "Karam Podi")
              .map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))}
          </div>
        </div>
      </section>

      {/* ── Mid Banner (banner2) ── */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "260px" }}>
        <Image
          src="/banner2.png"
          alt="logo"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/70 via-amber-800/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col justify-center h-full">
          <div className="max-w-lg">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3 drop-shadow-lg">
              Bulk Orders &amp; Gift Packs Available
            </h2>
            <p className="text-white/80 text-sm md:text-base mb-6">
              Perfect for weddings, festivals &amp; corporate gifting. Customised packing available on request.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-white text-amber-700 font-semibold px-6 py-3 rounded-full text-sm hover:bg-amber-50 transition-colors shadow"
            >
              Explore Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Non-Veg Pickle Section ── */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Non-Veg Pickles</h2>
              </div>
              <p className="text-gray-500 text-sm max-w-lg">
                {CATEGORY_DESCRIPTION["Non‑Veg Pickle"]}
              </p>
            </div>
            <Link
              href="/products?cat=Non%E2%80%91Veg+Pickle"
              className="inline-flex items-center gap-1 text-sm text-amber-700 hover:text-amber-900 font-semibold whitespace-nowrap transition-colors"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-2xl">
            {products
              .filter((p) => p.category === "Non‑Veg Pickle")
              .map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Section ── */}
      <section className="bg-amber-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Our Gallery</h2>
          <p className="text-gray-500 text-sm text-center mb-8">A glimpse of our freshly prepared products</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {galleryImages.map((src, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-amber-100 hover:border-amber-300 transition-all hover:shadow-md group">
                <Image
                  src={src}
                  alt={`Gallery image ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-400"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Why Our Customers Love Us</h2>
          <p className="text-gray-500 text-sm text-center mb-10">Quality and trust in every jar</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "No Preservatives", desc: "Pure and natural ingredients only. No artificial additives or colours." },
              { title: "Homemade Hygiene", desc: "Prepared in a clean home kitchen following strict hygiene standards." },
              { title: "Fresh Packaging", desc: "Sealed and packed fresh on order to retain full flavour and nutrition." },
              { title: "Quick Delivery", desc: "Ships within 24 hours. Free delivery on orders above ₹500." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-amber-100 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
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
