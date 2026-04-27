import { Link } from "react-router-dom";
import { PRODUCTS } from "@/constants/products";
import HeroSlider from "@/components/features/HeroSlider";
import CategoryGrid from "@/components/features/CategoryGrid";
import OfferBanners from "@/components/features/OfferBanners";
import ProductCard from "@/components/features/ProductCard";

function SectionHeader({ emoji, title, sub, linkTo, linkLabel }: {
  emoji: string; title: string; sub: string; linkTo: string; linkLabel: string;
}) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div className="flex items-center gap-2.5">
        <div className="w-1 h-7 bg-brand-orange rounded-full" />
        <div>
          <h2 className="font-black text-lg text-gray-900 leading-tight">{emoji} {title}</h2>
          <p className="text-xs text-gray-500">{sub}</p>
        </div>
      </div>
      <Link to={linkTo} className="text-xs font-bold text-brand-blue hover:text-brand-navy border border-brand-blue hover:border-brand-navy px-3 py-1.5 rounded-full transition-all hover:bg-blue-50">
        {linkLabel} →
      </Link>
    </div>
  );
}

function DealCard({ product }: { product: (typeof PRODUCTS)[0] }) {
  return (
    <Link to={`/product/${product.id}`} className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col">
      <div className="relative overflow-hidden bg-gray-50">
        <img src={product.images[0]} alt={product.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
        <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
          -{product.discount}%
        </span>
      </div>
      <div className="p-3 flex-1 flex flex-col">
        <p className="text-[10px] text-gray-400 font-semibold uppercase mb-0.5">{product.brand}</p>
        <p className="text-xs font-semibold text-gray-900 line-clamp-2 leading-snug mb-2">{product.name}</p>
        <div className="mt-auto">
          <span className="font-black text-base text-gray-900">₹{product.price.toLocaleString("en-IN")}</span>
          <span className="text-[10px] text-gray-400 line-through ml-1.5">₹{product.originalPrice.toLocaleString("en-IN")}</span>
        </div>
        <div className="mt-2 text-[10px] font-bold text-green-600">
          {product.freeShipping ? "✓ FREE Delivery" : `📦 ${product.deliveryDays}-day delivery`}
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const dealProducts = PRODUCTS.filter((p) => p.discount >= 30).slice(0, 6);
  const featuredProducts = PRODUCTS.slice(0, 8);
  const bestSellers = PRODUCTS.filter((p) => p.badge === "bestseller").slice(0, 4);
  const hotProducts = PRODUCTS.filter((p) => p.badge === "hot" || p.badge === "new").slice(0, 4);

  return (
    <div className="bg-[#eaeded] min-h-screen">
      {/* Hero slider - full width */}
      <HeroSlider />

      <div className="max-w-[1440px] mx-auto px-4 py-4 space-y-6">

        {/* Offer strip */}
        <OfferBanners />

        {/* Top 4 deal cards - Amazon-style quick-buy boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { title: "Mobiles", desc: "Up to 30% off", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop", link: "/products?category=mobiles", color: "from-blue-600 to-blue-800" },
            { title: "Fashion", desc: "Min 40% off", img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop", link: "/products?category=fashion", color: "from-pink-600 to-rose-700" },
            { title: "Electronics", desc: "Deals of the day", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop", link: "/products?category=electronics", color: "from-purple-600 to-violet-800" },
            { title: "Home & Kitchen", desc: "Great Indian sale", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop", link: "/products?category=home", color: "from-orange-500 to-amber-700" },
          ].map((box, i) => (
            <Link key={i} to={box.link} className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 hover:-translate-y-1 aspect-[4/3]">
              <img src={box.img} alt={box.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className={`absolute inset-0 bg-gradient-to-t ${box.color} opacity-75`} />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-black text-base leading-tight">{box.title}</p>
                <p className="text-white/80 text-xs font-semibold">{box.desc}</p>
                <span className="inline-block mt-2 text-white text-xs font-bold border border-white/50 px-2.5 py-1 rounded-full hover:bg-white/20 transition-colors">
                  Shop now →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Categories */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <CategoryGrid />
        </div>

        {/* Today's Deals */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <SectionHeader emoji="🔥" title="Today's Deals" sub="Limited time — grab before they're gone!" linkTo="/products?badge=sale" linkLabel="See all deals" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {dealProducts.map((p) => <DealCard key={p.id} product={p} />)}
          </div>
        </div>

        {/* Promo banner */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#131921] via-[#1a2533] to-[#146EB4] p-6 md:p-10 shadow-lg">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-black px-3 py-1 rounded-full mb-3 tracking-widest">
                ⚡ LIMITED OFFER
              </div>
              <h2 className="font-black text-2xl md:text-4xl leading-tight mb-2">
                Extra 10% Off<br />
                <span className="text-brand-orange">Your First Order</span>
              </h2>
              <p className="text-gray-300 mb-5 text-sm">
                Use code{" "}
                <span className="bg-white/15 border border-white/30 text-white font-black px-3 py-1 rounded-lg text-base tracking-wider">
                  FIRST50
                </span>{" "}
                at checkout
              </p>
              <Link to="/products" className="inline-flex items-center gap-2 bg-brand-orange hover:bg-amber-500 text-[#0f1111] font-black px-8 py-3.5 rounded-full transition-all hover:scale-105 shadow-xl text-sm">
                Shop Now →
              </Link>
            </div>
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=250&fit=crop"
              alt="Sale"
              className="w-full md:w-72 lg:w-80 rounded-2xl object-cover shadow-2xl ring-2 ring-white/20 hidden md:block"
            />
          </div>
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-orange/10 rounded-full" />
          <div className="absolute -bottom-6 right-32 w-24 h-24 bg-blue-500/10 rounded-full" />
        </div>

        {/* Best Sellers + Hot Products - 2 col */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <SectionHeader emoji="🏆" title="Best Sellers" sub="Most loved by shoppers" linkTo="/products?badge=bestseller" linkLabel="View all" />
            <div className="grid grid-cols-2 gap-3">
              {bestSellers.map((p) => <ProductCard key={p.id} product={p} compact />)}
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <SectionHeader emoji="🆕" title="New & Hot" sub="Just launched — be first!" linkTo="/products?badge=new" linkLabel="View all" />
            <div className="grid grid-cols-2 gap-3">
              {hotProducts.map((p) => <ProductCard key={p.id} product={p} compact />)}
            </div>
          </div>
        </div>

        {/* All popular products */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <SectionHeader emoji="🛒" title="Popular Products" sub="Most-loved by Tyfenix shoppers" linkTo="/products" linkLabel="View all" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {featuredProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>

        {/* Trust badges */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-black text-base text-center text-gray-900 mb-6">Why millions choose Tyfenix</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "🚀", title: "Lightning Delivery", desc: "Same day & next day delivery", color: "bg-blue-50" },
              { icon: "🔒", title: "100% Secure", desc: "UPI, Cards, Wallets – all secure", color: "bg-green-50" },
              { icon: "↩️", title: "Easy Returns", desc: "10-day no-questions returns", color: "bg-orange-50" },
              { icon: "✅", title: "Genuine Products", desc: "100% authentic, verified sellers", color: "bg-purple-50" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
