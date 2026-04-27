import { Heart, ShoppingCart, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={12}
          className={s <= Math.floor(rating) ? "fill-brand-orange text-brand-orange" : "fill-gray-200 text-gray-200"}
        />
      ))}
    </div>
  );
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggle, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const badgeColors: Record<string, string> = {
    sale: "bg-red-500",
    new: "bg-green-500",
    hot: "bg-orange-500",
    bestseller: "bg-blue-500",
  };

  return (
    <div className="card-product group relative flex flex-col animate-fade-in">
      {/* Badge */}
      {product.badge && (
        <span className={`absolute top-2 left-2 z-10 ${badgeColors[product.badge]} text-white text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide`}>
          {product.badge}
        </span>
      )}

      {/* Wishlist button */}
      <button
        onClick={(e) => { e.preventDefault(); toggle(product); }}
        className={`absolute top-2 right-2 z-10 p-2 rounded-full transition-all duration-200 ${inWishlist ? "bg-red-50 text-red-500" : "bg-white/80 text-gray-400 hover:text-red-500 hover:bg-red-50"} shadow-sm`}
      >
        <Heart size={16} fill={inWishlist ? "currentColor" : "none"} />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`} className="block overflow-hidden bg-gray-50">
        <img
          src={product.images[0]}
          alt={product.name}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${compact ? "h-40" : "h-52"}`}
          loading="lazy"
        />
      </Link>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        {/* Brand */}
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{product.brand}</p>

        {/* Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className={`font-medium text-gray-900 hover:text-brand-blue transition-colors line-clamp-2 leading-snug ${compact ? "text-sm" : "text-sm"}`}>
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-500">({product.reviews.toLocaleString("en-IN")})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="font-bold text-gray-900 text-base">₹{product.price.toLocaleString("en-IN")}</span>
          <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
          <span className="text-xs text-green-600 font-bold">{product.discount}% off</span>
        </div>

        {/* Delivery */}
        <div className="flex items-center gap-1 mt-1.5 text-xs text-gray-500">
          {product.freeShipping ? (
            <span className="text-green-600 font-medium">✓ FREE Delivery</span>
          ) : (
            <span>Delivery in {product.deliveryDays} days</span>
          )}
        </div>

        {/* Stock warning */}
        {product.stock <= 5 && (
          <p className="text-xs text-red-500 font-medium mt-1">Only {product.stock} left!</p>
        )}

        {/* Add to cart */}
        <button
          onClick={() => addItem(product)}
          disabled={product.stock === 0}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-dark disabled:bg-gray-200 disabled:text-gray-400 text-brand-navy font-semibold py-2 rounded-lg transition-all duration-200 text-sm hover:scale-[1.02] active:scale-[0.98]"
        >
          <ShoppingCart size={15} />
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>

        {/* Quick buy */}
        {!compact && product.stock > 0 && (
          <Link
            to={`/checkout?buyNow=${product.id}`}
            className="mt-1.5 w-full flex items-center justify-center gap-1 border border-brand-navy text-brand-navy font-semibold py-2 rounded-lg hover:bg-brand-navy hover:text-white transition-all duration-200 text-xs"
          >
            <Zap size={13} /> Buy Now
          </Link>
        )}
      </div>
    </div>
  );
}
