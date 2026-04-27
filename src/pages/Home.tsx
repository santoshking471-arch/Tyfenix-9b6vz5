import { Link } from "react-router-dom";
import HeroSlider from "@/components/features/HeroSlider";
import CategoryGrid from "@/components/features/CategoryGrid";
import OfferBanners from "@/components/features/OfferBanners";
import ProductCard from "@/components/features/ProductCard";
import { PRODUCTS } from "@/constants/products";

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 8);
  const dealProducts = PRODUCTS.filter((p) => p.discount >= 30).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.badge === "new" || p.badge === "hot").slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
      {/* Hero */}
      <HeroSlider />

      {/* Offer banners */}
      <OfferBanners />

      {/* Categories */}
      <CategoryGrid />

      {/* Today's Deals */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-heading font-700 text-xl text-gray-900">Today's Deals 🔥</h2>
            <p className="text-sm text-gray-500">Limited time offers – grab before they're gone!</p>
          </div>
          <Link to="/products?badge=sale" className="text-brand-blue hover:text-brand-navy text-sm font-semibold transition-colors">
            See all deals →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {dealProducts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Promo banner */}
      <div className="gradient-offer rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-white shadow-lg">
        <div>
          <p className="text-sm font-medium opacity-80 mb-1">LIMITED OFFER</p>
          <h2 className="font-heading text-2xl md:text-4xl font-bold mb-2">Save Extra 10% on Your First Order</h2>
          <p className="opacity-80 mb-4 text-sm">Use code <span className="font-bold bg-white/20 px-2 py-0.5 rounded">FIRST50</span> at checkout</p>
          <Link to="/products" className="inline-block bg-brand-navy text-white font-bold px-8 py-3 rounded-xl hover:bg-black transition-colors">
            Shop Now
          </Link>
        </div>
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=250&fit=crop"
          alt="Sale Offer"
          className="w-full md:w-80 rounded-xl object-cover shadow-xl hidden md:block"
        />
      </div>

      {/* New Arrivals */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-heading font-700 text-xl text-gray-900">New Arrivals ✨</h2>
            <p className="text-sm text-gray-500">Just landed – be the first to own them!</p>
          </div>
          <Link to="/products?badge=new" className="text-brand-blue hover:text-brand-navy text-sm font-semibold transition-colors">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* All Products */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-heading font-700 text-xl text-gray-900">Popular Products 🛒</h2>
            <p className="text-sm text-gray-500">Most loved by Tyfenix shoppers</p>
          </div>
          <Link to="/products" className="text-brand-blue hover:text-brand-navy text-sm font-semibold transition-colors">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredProducts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Trust section */}
      <section className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="font-heading font-700 text-xl text-center text-gray-900 mb-8">Why Tyfenix?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "🚀", title: "Fast Delivery", desc: "Same day & next day delivery available" },
            { icon: "🔒", title: "Secure Payments", desc: "UPI, Cards, Wallets – 100% secure" },
            { icon: "↩️", title: "Easy Returns", desc: "10-day no-questions returns policy" },
            { icon: "🌟", title: "Genuine Products", desc: "100% authentic, seller-verified" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
