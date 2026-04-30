import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t-4 border-amber-500 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Image
                src="/logo.png"
                alt="logo"
                width={140}
                height={50}
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-lg font-extrabold text-amber-700 mb-1">NAARIS WORLD</p>
            <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Homemade · Natural · Fresh</p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Authentic homemade spice powders, masalas, ready mixes, sweets &amp; snacks — no preservatives, no compromises.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">Products</h4>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-sm text-gray-500 hover:text-amber-700 transition-colors">All Products</Link></li>
              <li><Link href="/products?cat=Karam+Podi" className="text-sm text-gray-500 hover:text-amber-700 transition-colors">🌶️ Karam Podi</Link></li>
              <li><Link href="/products?cat=Masala+Powder" className="text-sm text-gray-500 hover:text-amber-700 transition-colors">🫙 Masala Powder</Link></li>
              <li><Link href="/products?cat=Ready+Mix" className="text-sm text-gray-500 hover:text-amber-700 transition-colors">🥣 Ready Mix</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">More</h4>
            <ul className="space-y-2">
              <li><Link href="/products?cat=Delicious+Sweet" className="text-sm text-gray-500 hover:text-amber-700 transition-colors">🍬 Delicious Sweets</Link></li>
              <li><Link href="/products?cat=Spicy+Snack" className="text-sm text-gray-500 hover:text-amber-700 transition-colors">🍟 Spicy Snacks</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">Contact Us</h4>
            <ul className="space-y-2">
              <li><span className="text-sm text-gray-500">📧 contact@narishomefoods.in</span></li>
              <li><span className="text-sm text-gray-500">📞 +91 98765 43210</span></li>
              <li><span className="text-sm text-gray-500">Mon–Sat, 9am–6pm IST</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} NAARIS WORLD. All rights reserved. Made with ❤️ in Andhra Pradesh.
        </div>
      </div>
    </footer>
  );
}
