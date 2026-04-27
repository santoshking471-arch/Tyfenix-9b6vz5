import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, updateQuantity, removeItem, subtotal, savings, totalItems } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Header */}
        <div className="bg-brand-navy text-white px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-brand-orange" />
            <span className="font-semibold">My Cart ({totalItems} items)</span>
          </div>
          <button onClick={onClose} className="hover:text-brand-orange transition-colors p-1 rounded">
            <X size={20} />
          </button>
        </div>

        {/* Savings bar */}
        {savings > 0 && (
          <div className="bg-green-50 border-b border-green-200 px-4 py-2 text-green-700 text-sm font-medium">
            🎉 You're saving ₹{savings.toLocaleString("en-IN")} on this order!
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <ShoppingBag size={64} className="text-gray-200 mb-4" />
              <p className="text-gray-500 font-medium mb-2">Your cart is empty</p>
              <p className="text-gray-400 text-sm mb-6">Add items to get started!</p>
              <button onClick={onClose} className="btn-primary">Continue Shopping</button>
            </div>
          ) : (
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.product.id} className="p-4 flex gap-3">
                  <Link to={`/product/${item.product.id}`} onClick={onClose} className="flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-100"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.product.id}`} onClick={onClose}>
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-brand-blue transition-colors">
                        {item.product.name}
                      </h4>
                    </Link>
                    <p className="text-xs text-gray-500 mt-0.5">{item.product.brand}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-gray-900">₹{item.product.price.toLocaleString("en-IN")}</span>
                      <span className="text-xs text-gray-400 line-through">₹{item.product.originalPrice.toLocaleString("en-IN")}</span>
                      <span className="text-xs text-green-600 font-semibold">{item.product.discount}% off</span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-gray-100 transition-colors text-gray-600"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 py-1 text-sm font-semibold border-x border-gray-200 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="px-2 py-1 hover:bg-gray-100 transition-colors text-gray-600 disabled:opacity-40"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-400 hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t bg-white px-4 py-4 space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal ({totalItems} items)</span>
              <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Total Savings</span>
                <span className="text-green-600 font-semibold">-₹{savings.toLocaleString("en-IN")}</span>
              </div>
            )}
            <Link
              to="/checkout"
              onClick={onClose}
              className="block w-full bg-brand-orange hover:bg-brand-orange-dark text-brand-navy font-bold py-3 rounded-xl text-center transition-colors"
            >
              Proceed to Checkout →
            </Link>
            <Link
              to="/cart"
              onClick={onClose}
              className="block w-full border border-gray-300 text-gray-700 font-medium py-2.5 rounded-xl text-center hover:bg-gray-50 transition-colors text-sm"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
