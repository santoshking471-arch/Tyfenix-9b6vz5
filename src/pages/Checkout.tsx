import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CreditCard, Smartphone, Wallet, CheckCircle, MapPin, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import { PRODUCTS, COUPONS } from "@/constants/products";
import type { Address } from "@/types";

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI / BHIM", icon: "📲", desc: "PhonePe, GPay, Paytm, BHIM" },
  { id: "card", label: "Credit / Debit Card", icon: "💳", desc: "Visa, Mastercard, RuPay" },
  { id: "netbanking", label: "Net Banking", icon: "🏦", desc: "All major banks supported" },
  { id: "wallet", label: "Wallets", icon: "👛", desc: "Paytm, Amazon Pay, Mobikwik" },
  { id: "cod", label: "Cash on Delivery", icon: "💵", desc: "Pay when you receive" },
];

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const buyNowId = searchParams.get("buyNow");

  const checkoutItems = buyNowId
    ? [{ product: PRODUCTS.find((p) => p.id === buyNowId)!, quantity: 1 }].filter((i) => i.product)
    : items;

  const [address, setAddress] = useState<Address>({
    id: "addr_1",
    label: "Home",
    street: user ? "123, Sample Street, Sector 12" : "",
    city: user ? "Delhi" : "",
    state: user ? "Delhi" : "",
    pincode: user ? "110001" : "",
    isDefault: true,
  });
  const [payment, setPayment] = useState("upi");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<typeof COUPONS[0] | null>(null);
  const [couponError, setCouponError] = useState("");
  const [step, setStep] = useState<"address" | "payment" | "review" | "processing" | "success">("address");
  const [orderId, setOrderId] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardNum, setCardNum] = useState("");

  const sub = checkoutItems.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const shipping = sub >= 499 ? 0 : 49;
  const tax = Math.round(sub * 0.18);
  const couponDiscount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? Math.min(Math.round(sub * appliedCoupon.discount / 100), appliedCoupon.maxDiscount || Infinity)
      : appliedCoupon.discount
    : 0;
  const total = sub + shipping + tax - couponDiscount;

  const applyCoupon = () => {
    const coupon = COUPONS.find((c) => c.code.toUpperCase() === couponCode.toUpperCase() && c.valid);
    if (!coupon) { setCouponError("Invalid coupon code"); return; }
    if (sub < coupon.minOrder) { setCouponError(`Min order ₹${coupon.minOrder.toLocaleString("en-IN")} required`); return; }
    setAppliedCoupon(coupon);
    setCouponError("");
  };

  const placeOrder = async () => {
    if (!user) { navigate("/login?redirect=/checkout"); return; }
    setStep("processing");
    await new Promise((r) => setTimeout(r, 2500));
    const order = createOrder(checkoutItems, address, payment, couponDiscount, appliedCoupon?.code);
    setOrderId(order.id);
    if (!buyNowId) clearCart();
    setStep("success");
  };

  if (step === "processing") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-2xl p-12 text-center shadow-xl max-w-sm w-full">
          <div className="w-16 h-16 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Processing Payment</h2>
          <p className="text-gray-500">Please wait while we confirm your order...</p>
        </div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-2xl p-12 text-center shadow-xl max-w-md w-full animate-bounce-in">
          <CheckCircle size={72} className="text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully! 🎉</h2>
          <p className="text-gray-500 mb-2">Order ID: <span className="font-bold text-brand-navy">{orderId}</span></p>
          <p className="text-gray-500 mb-6 text-sm">
            Total paid: <span className="font-bold text-brand-orange">₹{total.toLocaleString("en-IN")}</span>
          </p>
          <p className="text-sm text-gray-600 bg-green-50 rounded-xl p-4 mb-6">
            ✅ Confirmation will be sent to your email.<br />
            📦 Estimated delivery in {Math.max(...checkoutItems.map((i) => i.product.deliveryDays))} business days.
          </p>
          <div className="flex gap-3 flex-col sm:flex-row">
            <button onClick={() => navigate("/orders")} className="flex-1 btn-primary">Track Order</button>
            <button onClick={() => navigate("/")} className="flex-1 btn-secondary">Continue Shopping</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="font-heading text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-8 text-sm">
        {["address", "payment", "review"].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${step === s ? "bg-brand-orange text-brand-navy" : ["address", "payment", "review"].indexOf(step) > i ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}>
              {["address", "payment", "review"].indexOf(step) > i ? "✓" : i + 1}
            </div>
            <span className={`font-medium capitalize ${step === s ? "text-brand-navy" : "text-gray-400"}`}>{s}</span>
            {i < 2 && <div className="w-8 h-0.5 bg-gray-200" />}
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main panel */}
        <div className="flex-1">
          {/* Step 1: Address */}
          {step === "address" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-semibold text-lg text-gray-900 mb-5 flex items-center gap-2">
                <MapPin size={20} className="text-brand-orange" /> Delivery Address
              </h2>
              {!user && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5 text-sm text-blue-800">
                  Please <button onClick={() => navigate("/login?redirect=/checkout")} className="font-bold underline">sign in</button> for faster checkout & order tracking.
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Street Address", key: "street", placeholder: "Flat/House No, Street, Area", full: true },
                  { label: "City", key: "city", placeholder: "City" },
                  { label: "State", key: "state", placeholder: "State" },
                  { label: "PIN Code", key: "pincode", placeholder: "6-digit PIN" },
                ].map((field) => (
                  <div key={field.key} className={field.full ? "sm:col-span-2" : ""}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{field.label} *</label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={(address as Record<string, string>)[field.key]}
                      onChange={(e) => setAddress((a) => ({ ...a, [field.key]: e.target.value }))}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  if (!address.street || !address.city || !address.pincode) return;
                  setStep("payment");
                }}
                className="mt-6 w-full btn-primary py-3 text-base"
              >
                Continue to Payment →
              </button>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === "payment" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-semibold text-lg text-gray-900 mb-5 flex items-center gap-2">
                <CreditCard size={20} className="text-brand-orange" /> Payment Method
              </h2>
              <div className="space-y-3">
                {PAYMENT_METHODS.map((pm) => (
                  <label key={pm.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${payment === pm.id ? "border-brand-orange bg-orange-50" : "border-gray-200 hover:border-gray-300"}`}>
                    <input type="radio" name="payment" value={pm.id} checked={payment === pm.id} onChange={() => setPayment(pm.id)} className="sr-only" />
                    <span className="text-2xl">{pm.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-gray-900">{pm.label}</p>
                      <p className="text-xs text-gray-500">{pm.desc}</p>
                    </div>
                    {payment === pm.id && <div className="w-5 h-5 rounded-full bg-brand-orange flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white rounded-full" /></div>}
                  </label>
                ))}
              </div>

              {payment === "upi" && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                  <input
                    type="text"
                    placeholder="yourname@paytm"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-orange"
                  />
                </div>
              )}
              {payment === "card" && (
                <div className="mt-4 space-y-3">
                  <input type="text" placeholder="Card Number (16 digits)" value={cardNum} onChange={(e) => setCardNum(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-orange" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="MM/YY" className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-orange" />
                    <input type="text" placeholder="CVV" className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-orange" />
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep("address")} className="flex-1 btn-secondary py-3">← Back</button>
                <button onClick={() => setStep("review")} className="flex-1 btn-primary py-3">Review Order →</button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === "review" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-semibold text-lg text-gray-900 mb-5 flex items-center gap-2">
                <ShoppingBag size={20} className="text-brand-orange" /> Review Your Order
              </h2>

              {/* Address review */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm text-gray-900">Delivery to</p>
                    <p className="text-sm text-gray-600 mt-1">{address.street}, {address.city}, {address.state} - {address.pincode}</p>
                  </div>
                  <button onClick={() => setStep("address")} className="text-brand-blue text-xs font-semibold">Change</button>
                </div>
              </div>

              {/* Payment review */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-sm text-gray-900">Payment</p>
                    <p className="text-sm text-gray-600">{PAYMENT_METHODS.find((p) => p.id === payment)?.label}</p>
                  </div>
                  <button onClick={() => setStep("payment")} className="text-brand-blue text-xs font-semibold">Change</button>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-3 mb-4">
                {checkoutItems.map((item) => (
                  <div key={item.product.id} className="flex gap-3 items-center">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-14 h-14 object-cover rounded-lg border border-gray-100" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-sm">₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</p>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="flex gap-2 mb-4">
                <input type="text" placeholder="Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-orange" />
                <button onClick={applyCoupon} className="bg-brand-orange text-brand-navy font-semibold px-4 py-2 rounded-lg text-sm hover:bg-brand-orange-dark">Apply</button>
              </div>
              {couponError && <p className="text-red-500 text-xs mb-2">{couponError}</p>}
              {appliedCoupon && <p className="text-green-600 text-xs mb-4 font-medium">🎉 {appliedCoupon.code} applied! You save ₹{couponDiscount.toLocaleString("en-IN")}</p>}

              <div className="flex gap-3">
                <button onClick={() => setStep("payment")} className="flex-1 btn-secondary py-3">← Back</button>
                <button onClick={placeOrder} className="flex-1 btn-primary py-3 text-base font-bold">Place Order ₹{total.toLocaleString("en-IN")} →</button>
              </div>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="lg:w-80">
          <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{sub.toLocaleString("en-IN")}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon Discount</span>
                  <span>-₹{couponDiscount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span className={shipping === 0 ? "text-green-600" : ""}>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (18% GST)</span>
                <span>₹{tax.toLocaleString("en-IN")}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-base">
                <span>Total</span>
                <span className="text-brand-orange">₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <div className="mt-4 bg-green-50 rounded-xl p-3 text-xs text-green-700 font-medium text-center">
              🔒 100% Secure Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
