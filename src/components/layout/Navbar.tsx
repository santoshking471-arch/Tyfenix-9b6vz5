import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Heart, User, Menu, X, MapPin, ChevronDown, Package, LogOut, Settings, Shield } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/hooks/useAuth";
import { CATEGORIES } from "@/constants/products";

interface NavbarProps {
  onCartOpen: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  electronics: "hover:text-blue-400",
  mobiles: "hover:text-purple-400",
  fashion: "hover:text-pink-400",
  home: "hover:text-yellow-400",
  beauty: "hover:text-rose-400",
  sports: "hover:text-green-400",
  books: "hover:text-orange-400",
  toys: "hover:text-indigo-400",
  grocery: "hover:text-lime-400",
  appliances: "hover:text-teal-400",
};

export default function Navbar({ onCartOpen }: NavbarProps) {
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchFocused(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-lg">
      {/* Top announcement strip */}
      <div className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white text-center py-1.5 text-xs font-semibold tracking-wide">
        🎉 MEGA SALE — Extra 10% off with code <span className="bg-white/20 px-1.5 py-0.5 rounded font-bold mx-1">TYFENIX10</span> | Free Delivery above ₹499 🚚
      </div>

      {/* Main navbar */}
      <div className="bg-[#0f1111] text-white px-3 py-2">
        <div className="max-w-[1440px] mx-auto flex items-center gap-3">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-1.5 px-2 py-1.5 rounded hover:outline hover:outline-1 hover:outline-white/40 transition-all">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-orange to-amber-400 flex items-center justify-center font-black text-sm text-[#0f1111]">T</div>
            <span className="font-black text-xl text-brand-orange tracking-tight leading-none">tyfenix</span>
          </Link>

          {/* Location — desktop */}
          <div className="hidden lg:flex items-start gap-1 cursor-pointer group px-2 py-1.5 rounded hover:outline hover:outline-1 hover:outline-white/40 transition-all flex-shrink-0">
            <MapPin size={12} className="text-gray-400 mt-0.5" />
            <div className="leading-tight">
              <div className="text-[10px] text-gray-400">Deliver to</div>
              <div className="text-xs font-bold text-white group-hover:text-brand-orange transition-colors">India 🇮🇳</div>
            </div>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 flex items-center max-w-2xl">
            <div className={`flex w-full items-center rounded-lg overflow-hidden transition-all ${searchFocused ? "ring-2 ring-brand-orange" : ""}`}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="hidden md:block bg-[#f3f3f3] text-gray-700 text-[11px] py-[11px] pl-3 pr-2 border-r border-gray-300 outline-none cursor-pointer font-medium flex-shrink-0"
                style={{ maxWidth: 100 }}
              >
                <option value="All">All</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="flex-1 bg-white text-gray-900 text-sm px-4 py-[11px] outline-none placeholder-gray-400 min-w-0"
              />
              <button type="submit" className="bg-brand-orange hover:bg-amber-500 px-4 py-[11px] transition-colors flex-shrink-0 group">
                <Search size={17} className="text-[#0f1111] group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-1 ml-auto flex-shrink-0">

            {/* Account dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                onBlur={() => setTimeout(() => setUserMenuOpen(false), 150)}
                className="hidden md:flex flex-col items-start px-3 py-1.5 rounded hover:outline hover:outline-1 hover:outline-white/40 transition-all text-left"
              >
                <span className="text-[11px] text-gray-300">
                  Hello, {user ? user.name.split(" ")[0] : "sign in"}
                </span>
                <span className="text-xs font-bold flex items-center gap-0.5 whitespace-nowrap">
                  Account & Lists <ChevronDown size={11} className={`transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
                  {user ? (
                    <>
                      <div className="bg-gradient-to-r from-brand-navy to-brand-navy-light p-4">
                        <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center font-bold text-brand-navy text-lg mb-2">
                          {user.name[0].toUpperCase()}
                        </div>
                        <p className="text-white font-semibold text-sm">{user.name}</p>
                        <p className="text-gray-400 text-xs truncate">{user.email}</p>
                      </div>
                      <div className="py-2">
                        <Link to="/account" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setUserMenuOpen(false)}>
                          <User size={15} className="text-gray-400" /> My Account
                        </Link>
                        <Link to="/orders" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setUserMenuOpen(false)}>
                          <Package size={15} className="text-gray-400" /> My Orders
                        </Link>
                        <Link to="/wishlist" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setUserMenuOpen(false)}>
                          <Heart size={15} className="text-gray-400" /> Wishlist ({wishlistItems.length})
                        </Link>
                        {user.isAdmin && (
                          <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-brand-orange font-semibold hover:bg-orange-50 transition-colors" onClick={() => setUserMenuOpen(false)}>
                            <Shield size={15} className="text-brand-orange" /> Admin Panel
                          </Link>
                        )}
                        <hr className="my-1 border-gray-100" />
                        <button
                          onClick={() => { logout(); setUserMenuOpen(false); navigate("/"); }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={15} /> Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-4">
                      <Link to="/login" onClick={() => setUserMenuOpen(false)} className="block w-full bg-brand-orange hover:bg-amber-500 text-brand-navy font-bold py-2.5 rounded-lg text-sm text-center transition-colors mb-3">
                        Sign In
                      </Link>
                      <p className="text-xs text-gray-500 text-center mb-3">New customer?</p>
                      <Link to="/register" onClick={() => setUserMenuOpen(false)} className="block text-brand-blue text-sm text-center font-semibold hover:underline">
                        Create your account →
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Returns & Orders */}
            <Link to="/orders" className="hidden lg:flex flex-col items-start px-3 py-1.5 rounded hover:outline hover:outline-1 hover:outline-white/40 transition-all">
              <span className="text-[11px] text-gray-300">Returns</span>
              <span className="text-xs font-bold">& Orders</span>
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative hidden md:flex flex-col items-center px-2 py-1.5 rounded hover:outline hover:outline-1 hover:outline-white/40 transition-all gap-0.5">
              <div className="relative">
                <Heart size={22} className="text-white" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-orange text-brand-navy text-[10px] font-black rounded-full w-4.5 h-4.5 min-w-[18px] h-[18px] flex items-center justify-center leading-none px-0.5">
                    {wishlistItems.length}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-semibold leading-none">Wishlist</span>
            </Link>

            {/* Cart */}
            <button
              onClick={onCartOpen}
              className="relative flex items-end gap-1 px-2 py-1.5 rounded hover:outline hover:outline-1 hover:outline-white/40 transition-all"
            >
              <div className="relative">
                <ShoppingCart size={28} className="text-white" />
                <span className={`absolute -top-2 left-4 bg-brand-orange text-brand-navy text-[11px] font-black rounded-full min-w-[20px] h-5 flex items-center justify-center leading-none px-1 transition-all ${totalItems > 0 ? "scale-100" : "scale-0"}`}>
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              </div>
              <span className="text-xs font-bold hidden sm:block pb-0.5">Cart</span>
            </button>

            {/* Mobile menu toggle */}
            <button className="md:hidden p-2 hover:bg-white/10 rounded transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden mt-2">
          <form onSubmit={handleSearch} className="flex items-center bg-white rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2.5 text-gray-900 text-sm outline-none"
            />
            <button type="submit" className="bg-brand-orange px-4 py-2.5">
              <Search size={16} className="text-brand-navy" />
            </button>
          </form>
        </div>
      </div>

      {/* Category nav bar */}
      <div className="bg-[#232f3e] text-white">
        <div className="max-w-[1440px] mx-auto px-3 flex items-center gap-0.5 overflow-x-auto category-scroll py-0">
          {/* All departments */}
          <button className="flex items-center gap-1.5 whitespace-nowrap px-3 py-2 text-xs font-bold hover:bg-white/10 rounded transition-colors flex-shrink-0">
            <Menu size={14} /> All
          </button>

          <Link to="/products?badge=sale" className="whitespace-nowrap px-3 py-2 text-xs font-bold text-red-400 hover:bg-white/10 rounded transition-colors flex-shrink-0">
            🔥 Today's Deals
          </Link>

          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className={`whitespace-nowrap px-3 py-2 text-xs font-medium hover:bg-white/10 rounded transition-colors flex-shrink-0 ${CATEGORY_COLORS[cat.id] || "hover:text-brand-orange"}`}
            >
              {cat.icon} {cat.name}
            </Link>
          ))}

          <Link to="/products?badge=new" className="whitespace-nowrap px-3 py-2 text-xs font-bold text-green-400 hover:bg-white/10 rounded transition-colors flex-shrink-0">
            ✨ New Arrivals
          </Link>
          <Link to="/products?badge=bestseller" className="whitespace-nowrap px-3 py-2 text-xs font-bold text-yellow-400 hover:bg-white/10 rounded transition-colors flex-shrink-0">
            🏆 Best Sellers
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-lg animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {user ? (
              <>
                <div className="flex items-center gap-3 pb-3 mb-2 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center font-bold text-brand-navy">
                    {user.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                {[
                  { to: "/account", label: "My Account", icon: <User size={16} /> },
                  { to: "/orders", label: "My Orders", icon: <Package size={16} /> },
                  { to: "/wishlist", label: `Wishlist (${wishlistItems.length})`, icon: <Heart size={16} /> },
                ].map((item) => (
                  <Link key={item.to} to={item.to} onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-2.5 text-gray-700 text-sm border-b border-gray-50 hover:text-brand-orange transition-colors">
                    <span className="text-gray-400">{item.icon}</span> {item.label}
                  </Link>
                ))}
                {user.isAdmin && (
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2.5 text-brand-orange font-semibold text-sm">
                    <Shield size={16} /> Admin Panel
                  </Link>
                )}
                <button onClick={() => { logout(); setMobileMenuOpen(false); navigate("/"); }}
                  className="flex items-center gap-3 py-2.5 text-red-600 text-sm w-full mt-2">
                  <LogOut size={16} /> Sign Out
                </button>
              </>
            ) : (
              <div className="space-y-3 py-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full bg-brand-orange text-brand-navy font-bold py-3 rounded-xl text-center text-sm">Sign In</Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block text-center text-brand-blue text-sm font-semibold">Create Account →</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
