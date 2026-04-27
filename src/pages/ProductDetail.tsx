import { useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Zap, Star, ChevronRight, Shield, Truck, RotateCcw, Package } from "lucide-react";
import { PRODUCTS } from "@/constants/products";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import ProductCard from "@/components/features/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggle, isInWishlist } = useWishlist();
  const product = PRODUCTS.find((p) => p.id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">😕</p>
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/products" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product, qty);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const savings = product.originalPrice - product.price;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-brand-blue">Home</Link>
        <ChevronRight size={14} />
        <Link to="/products" className="hover:text-brand-blue">Products</Link>
        <ChevronRight size={14} />
        <Link to={`/products?category=${product.category}`} className="hover:text-brand-blue capitalize">{product.category}</Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div className="space-y-4">
          {/* Main image with zoom */}
          <div
            ref={imgRef}
            className="zoom-container relative bg-white rounded-2xl overflow-hidden border border-gray-100 aspect-square cursor-zoom-in shadow-sm"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            style={{ "--zoom-x": `${zoomPos.x}%`, "--zoom-y": `${zoomPos.y}%` } as React.CSSProperties}
          >
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
              style={isZooming ? { transform: "scale(2)", transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
            />
            {product.badge && (
              <span className={`absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full uppercase ${product.badge === "sale" ? "bg-red-500" : product.badge === "new" ? "bg-green-500" : product.badge === "hot" ? "bg-orange-500" : "bg-blue-500"}`}>
                {product.badge}
              </span>
            )}
            <p className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded">
              Hover to zoom
            </p>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === idx ? "border-brand-orange shadow-md" : "border-gray-200 hover:border-gray-400"}`}
              >
                <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-5">
          <div>
            <p className="text-sm text-brand-blue font-semibold uppercase tracking-wide">{product.brand}</p>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mt-1 leading-tight">{product.name}</h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-green-500 text-white text-sm font-bold px-2.5 py-1 rounded-lg">
              {product.rating} <Star size={13} fill="white" />
            </div>
            <span className="text-gray-500 text-sm">{product.reviews.toLocaleString("en-IN")} ratings</span>
            <span className="text-gray-300">|</span>
            <span className="text-green-600 text-sm font-medium">
              {product.stock > 10 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left!` : "Out of Stock"}
            </span>
          </div>

          {/* Price */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString("en-IN")}</span>
              <span className="text-lg text-gray-400 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
              <span className="text-lg text-green-600 font-bold">{product.discount}% off</span>
            </div>
            <p className="text-green-600 font-medium mt-1">You save ₹{savings.toLocaleString("en-IN")}</p>
            {product.freeShipping && <p className="text-brand-blue text-sm mt-1">✓ FREE Delivery</p>}
          </div>

          {/* Delivery info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-brand-orange" />
              <span>Delivered in {product.deliveryDays} days</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw size={16} className="text-brand-orange" />
              <span>10-day returns</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-brand-orange" />
              <span>Genuine product</span>
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-gray-100 transition-colors text-lg font-semibold">−</button>
              <span className="px-4 py-2 font-semibold border-x border-gray-300">{qty}</span>
              <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="px-3 py-2 hover:bg-gray-100 transition-colors text-lg font-semibold">+</button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl transition-all duration-200 text-sm ${addedToCart ? "bg-green-500 text-white" : "bg-brand-orange hover:bg-brand-orange-dark text-brand-navy"}`}
            >
              <ShoppingCart size={18} />
              {addedToCart ? "✓ Added to Cart!" : "Add to Cart"}
            </button>
            <Link
              to={`/checkout?buyNow=${product.id}`}
              className="flex-1 flex items-center justify-center gap-2 bg-brand-navy hover:bg-black text-white font-bold py-3.5 rounded-xl transition-all duration-200 text-sm"
            >
              <Zap size={18} /> Buy Now
            </Link>
          </div>

          <button
            onClick={() => toggle(product)}
            className={`w-full flex items-center justify-center gap-2 border-2 font-semibold py-3 rounded-xl transition-all duration-200 text-sm ${inWishlist ? "border-red-400 text-red-500 bg-red-50" : "border-gray-300 text-gray-700 hover:border-red-400 hover:text-red-500"}`}
          >
            <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
            {inWishlist ? "Saved to Wishlist" : "Add to Wishlist"}
          </button>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">About this item</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
            <ul className="space-y-2">
              {product.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <Package size={14} className="text-brand-orange flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-12 bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-heading text-xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-8 min-w-[160px]">
            <div className="text-5xl font-bold text-gray-900">{product.rating}</div>
            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={18} className={s <= Math.floor(product.rating) ? "fill-brand-orange text-brand-orange" : "fill-gray-200 text-gray-200"} />
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-1">{product.reviews.toLocaleString("en-IN")} ratings</p>
          </div>
          <div className="flex-1 space-y-3">
            {[
              { label: "Excellent", percent: 65, color: "bg-green-500" },
              { label: "Good", percent: 20, color: "bg-lime-400" },
              { label: "Average", percent: 10, color: "bg-yellow-400" },
              { label: "Poor", percent: 3, color: "bg-orange-400" },
              { label: "Terrible", percent: 2, color: "bg-red-500" },
            ].map((r) => (
              <div key={r.label} className="flex items-center gap-3 text-sm">
                <span className="w-16 text-gray-600">{r.label}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                  <div className={`${r.color} h-2.5 rounded-full`} style={{ width: `${r.percent}%` }} />
                </div>
                <span className="w-8 text-gray-500">{r.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sample reviews */}
        <div className="mt-8 space-y-5 divide-y">
          {[
            { name: "Rahul Sharma", rating: 5, title: "Excellent product!", comment: "Absolutely love it. Exactly as described, packaging was great and delivery was on time!", date: "2 days ago", verified: true },
            { name: "Priya Patel", rating: 4, title: "Great value for money", comment: "Good quality product. A little smaller than expected but overall very satisfied.", date: "1 week ago", verified: true },
            { name: "Amit Kumar", rating: 5, title: "Best purchase ever!", comment: "Tyfenix ne kamaal kar diya! Fast delivery, authentic product, 100% recommend.", date: "2 weeks ago", verified: false },
          ].map((r, i) => (
            <div key={i} className={i > 0 ? "pt-5" : ""}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-sm">{r.name[0]}</div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{r.name}</p>
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={12} className={s <= r.rating ? "fill-brand-orange text-brand-orange" : "fill-gray-200 text-gray-200"} />
                      ))}
                    </div>
                    {r.verified && <span className="text-green-600 text-xs">✓ Verified Purchase</span>}
                  </div>
                </div>
                <span className="ml-auto text-xs text-gray-400">{r.date}</span>
              </div>
              <p className="font-semibold text-sm text-gray-900 mb-1">{r.title}</p>
              <p className="text-sm text-gray-600">{r.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-5">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
