import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import ProductCard from "@/components/features/ProductCard";

export default function Wishlist() {
  const { items, remove } = useWishlist();
  const { addItem } = useCart();

  const moveAllToCart = () => {
    items.forEach((product) => addItem(product, 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Heart size={24} className="text-red-500" /> My Wishlist
          {items.length > 0 && <span className="text-sm font-normal text-gray-500">({items.length} items)</span>}
        </h1>
        {items.length > 0 && (
          <button
            onClick={moveAllToCart}
            className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-brand-navy font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
          >
            <ShoppingCart size={16} /> Move All to Cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl shadow-sm">
          <Heart size={72} className="mx-auto text-gray-200 mb-6" />
          <h2 className="text-xl font-bold text-gray-700 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-8">Save items you love by clicking the heart icon!</p>
          <Link to="/products" className="btn-primary px-10 py-3 text-base">Explore Products →</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
