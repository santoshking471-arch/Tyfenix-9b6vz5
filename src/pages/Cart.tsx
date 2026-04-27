import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingCart, Tag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { COUPONS } from "@/constants/products";

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal, savings, totalItems } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<typeof COUPONS[0] | null>(null);
  const [couponError, setCouponError] = useState("");

  const shipping = subtotal >= 499 ? 0 : 49;
  const tax = Math.round(subtotal * 0.18);
  const couponDiscount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? Math.min(Math.round(subtotal * appliedCoupon.discount / 100), appliedCoupon.maxDiscount || Infinity)
      : appliedCoupon.discount
    : 0;
  const total = subtotal + shipping + tax - couponDiscount;

  const applyCoupon = () => {
    setCouponError("");
    const coupon = COUPONS.find((c) => c.code.toUpperCase() === couponCode.toUpperCase() && c.valid);
    if (!coupon) { setCouponError("Invalid coupon code"); return; }
    if (subtotal < coupon.minOrder) { setCouponError(`Minimum order ₹${coupon.minOrder.toLocaleString("en-IN")} required`); return; }
    setAppliedCoupon(coupon);
    setCouponError("");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingCart size={80} className="mx-auto text-gray-200 mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet!</p>
        <Link to="/products" className="btn-primary text-lg px-10 py-3">Start Shopping →</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="font-heading text-2xl font-bold text-gray-900 mb-6">Shopping Cart ({totalItems} items)</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart items */}
        <div className="flex-1 space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="bg-white rounded-2xl p-5 shadow-sm flex gap-4">
              <Link to={`/product/${item.product.id}`}>
                <img src={item.product.images[0]} alt={item.product.name} className="w-28 h-28 object-cover rounded-xl border border-gray-100" />
              </Link>
              <div className="flex-1">
                <Link to={`/product/${item.product.id}`}>
                  <h3 className="font-semibold text-gray-900 hover:text-brand-blue transition-colors">{item.product.name}</h3>
                </Link>
                <p className="text-sm text-gray-500">{item.product.brand}</p>
                {item.product.freeShipping ? (
                  <p className="text-green-600 text-xs mt-1">✓ FREE Delivery</p>
                ) : (
                  <p className="text-gray-500 text-xs mt-1">Delivery in {item.product.deliveryDays} days</p>
                )}
                <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-gray-900">₹{item.product.price.toLocaleString("en-IN")}</span>
                    <span className="text-sm text-gray-400 line-through">₹{item.product.originalPrice.toLocaleString("en-IN")}</span>
                    <span className="text-xs text-green-600 font-semibold">{item.product.discount}% off</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-3 py-2 hover:bg-gray-100 transition-colors">
                        <Minus size={14} />
                      </button>
                      <span className="px-4 py-2 text-sm font-semibold border-x border-gray-200">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                        className="px-3 py-2 hover:bg-gray-100 transition-colors disabled:opacity-40"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.product.id)} className="text-red-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-700 mt-1">
                  Subtotal: ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:w-96 space-y-4">
          {/* Coupon */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Tag size={18} className="text-brand-orange" /> Coupon Code
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-orange"
              />
              <button onClick={applyCoupon} className="bg-brand-orange text-brand-navy font-semibold px-4 py-2 rounded-lg text-sm hover:bg-brand-orange-dark transition-colors">
                Apply
              </button>
            </div>
            {couponError && <p className="text-red-500 text-xs mt-1">{couponError}</p>}
            {appliedCoupon && (
              <div className="flex items-center justify-between mt-2 bg-green-50 p-2 rounded-lg">
                <p className="text-green-600 text-xs font-semibold">🎉 {appliedCoupon.code} applied!</p>
                <button onClick={() => { setAppliedCoupon(null); setCouponCode(""); }} className="text-xs text-red-400 hover:text-red-600">Remove</button>
              </div>
            )}
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-2">Available coupons:</p>
              <div className="flex flex-wrap gap-1">
                {COUPONS.map((c) => (
                  <button key={c.code} onClick={() => setCouponCode(c.code)} className="text-xs border border-brand-orange text-brand-orange px-2 py-0.5 rounded font-medium hover:bg-orange-50">
                    {c.code}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Price breakdown */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                <span className="font-medium">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{savings.toLocaleString("en-IN")}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon ({appliedCoupon?.code})</span>
                  <span>-₹{couponDiscount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span className={shipping === 0 ? "text-green-600 font-medium" : "font-medium"}>
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (18% GST)</span>
                <span className="font-medium">₹{tax.toLocaleString("en-IN")}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-brand-orange">₹{total.toLocaleString("en-IN")}</span>
              </div>
              <div className="bg-green-50 rounded-lg p-2 text-green-700 text-xs text-center font-medium">
                🎉 You save ₹{(savings + couponDiscount).toLocaleString("en-IN")} on this order!
              </div>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-brand-orange hover:bg-brand-orange-dark text-brand-navy font-bold py-3.5 rounded-xl mt-4 transition-colors text-base"
            >
              Proceed to Checkout →
            </button>
            <Link to="/products" className="block text-center text-brand-blue text-sm mt-3 hover:underline">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
