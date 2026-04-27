import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Heart, User, Menu, X, MapPin, ChevronDown } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/hooks/useAuth";
import { CATEGORIES } from "@/constants/products";

interface NavbarProps {
  onCartOpen: () => void;
}

export default function Navbar({ onCartOpen }: NavbarProps) {
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="bg-brand-navy text-white px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <span className="font-heading font-800 text-2xl text-brand-orange tracking-tight">
              Tyfenix
            </span>
          </Link>

          {/* Delivery location */}
          <div className="hidden md:flex items-center gap-1 text-xs cursor-pointer hover:text-brand-orange transition-colors flex-shrink-0">
            <MapPin size={14} className="text-brand-orange" />
            <div>
              <div className="text-gray-400">Deliver to</div>
              <div className="font-semibold text-white">India</div>
            </div>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 flex items-center bg-white rounded-lg overflow-hidden max-w-2xl">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="hidden md:block bg-gray-100 text-gray-700 text-xs py-3 px-2 border-r border-gray-300 outline-none cursor-pointer"
            >
              <option>All</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search Tyfenix..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-3 text-gray-900 text-sm outline-none"
            />
            <button type="submit" className="bg-brand-orange hover:bg-brand-orange-dark px-4 py-3 transition-colors">
              <Search size={18} className="text-brand-navy" />
            </button>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-3 ml-auto flex-shrink-0">
            {/* Account */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="hidden md:flex flex-col items-start hover:text-brand-orange transition-colors text-xs"
              >
                <span className="text-gray-400">Hello, {user ? user.name.split(" ")[0] : "Sign in"}</span>
                <span className="font-semibold flex items-center gap-0.5">
                  Account <ChevronDown size={12} />
                </span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                  {user ? (
                    <>
                      <Link to="/account" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setUserMenuOpen(false)}>My Account</Link>
                      <Link to="/orders" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setUserMenuOpen(false)}>My Orders</Link>
                      {user.isAdmin && (
                        <Link to="/admin" className="block px-4 py-2.5 text-sm text-brand-orange font-semibold hover:bg-orange-50" onClick={() => setUserMenuOpen(false)}>Admin Panel</Link>
                      )}
                      <hr className="my-1" />
                      <button onClick={() => { logout(); setUserMenuOpen(false); navigate("/"); }} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">Sign Out</button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="block px-4 py-2.5 text-sm font-semibold text-brand-blue hover:bg-blue-50" onClick={() => setUserMenuOpen(false)}>Sign In</Link>
                      <Link to="/register" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setUserMenuOpen(false)}>Create Account</Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative hidden md:flex flex-col items-center hover:text-brand-orange transition-colors">
              <Heart size={22} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
              <span className="text-xs font-semibold">Wishlist</span>
            </Link>

            {/* Cart */}
            <button onClick={onCartOpen} className="relative flex flex-col items-center hover:text-brand-orange transition-colors">
              <div className="relative">
                <ShoppingCart size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-orange text-brand-navy text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold">Cart</span>
            </button>

            {/* Mobile menu */}
            <button className="md:hidden p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden mt-2">
          <form onSubmit={handleSearch} className="flex items-center bg-white rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search Tyfenix..."
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

      {/* Bottom nav bar */}
      <div className="bg-brand-navy-light text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 overflow-x-auto category-scroll py-1.5">
          <Link to="/products" className="whitespace-nowrap px-3 py-1 rounded hover:bg-white/10 transition-colors font-medium">All Products</Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="whitespace-nowrap px-3 py-1 rounded hover:bg-white/10 transition-colors flex items-center gap-1"
            >
              <span>{cat.icon}</span> {cat.name}
            </Link>
          ))}
          <Link to="/products?badge=sale" className="whitespace-nowrap px-3 py-1 rounded bg-red-600 hover:bg-red-700 transition-colors font-semibold">🔥 Sale</Link>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {user ? (
              <>
                <p className="font-semibold text-gray-900">Hello, {user.name}</p>
                <Link to="/account" className="block py-2 text-gray-700 border-b" onClick={() => setMobileMenuOpen(false)}>My Account</Link>
                <Link to="/orders" className="block py-2 text-gray-700 border-b" onClick={() => setMobileMenuOpen(false)}>My Orders</Link>
                <Link to="/wishlist" className="block py-2 text-gray-700 border-b" onClick={() => setMobileMenuOpen(false)}>Wishlist ({wishlistItems.length})</Link>
                {user.isAdmin && <Link to="/admin" className="block py-2 text-brand-orange font-semibold border-b" onClick={() => setMobileMenuOpen(false)}>Admin Panel</Link>}
                <button onClick={() => { logout(); setMobileMenuOpen(false); navigate("/"); }} className="block py-2 text-red-600 w-full text-left">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 text-brand-blue font-semibold" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                <Link to="/register" className="block py-2 text-gray-700" onClick={() => setMobileMenuOpen(false)}>Create Account</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
