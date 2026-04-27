import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package, ChevronRight, Truck, CheckCircle, Clock, XCircle, Box } from "lucide-react";
import { useOrders } from "@/hooks/useOrders";
import { useAuth } from "@/hooks/useAuth";

const STATUS_CONFIG = {
  pending: { label: "Pending", icon: Clock, color: "text-yellow-600 bg-yellow-50 border-yellow-200", dot: "bg-yellow-500" },
  confirmed: { label: "Confirmed", icon: CheckCircle, color: "text-blue-600 bg-blue-50 border-blue-200", dot: "bg-blue-500" },
  packed: { label: "Packed", icon: Box, color: "text-purple-600 bg-purple-50 border-purple-200", dot: "bg-purple-500" },
  shipped: { label: "Shipped", icon: Truck, color: "text-orange-600 bg-orange-50 border-orange-200", dot: "bg-orange-500" },
  delivered: { label: "Delivered", icon: CheckCircle, color: "text-green-600 bg-green-50 border-green-200", dot: "bg-green-500" },
  cancelled: { label: "Cancelled", icon: XCircle, color: "text-red-600 bg-red-50 border-red-200", dot: "bg-red-500" },
};

const STATUS_STEPS = ["confirmed", "packed", "shipped", "delivered"];

export default function Orders() {
  const { user } = useAuth();
  const { orders, refreshOrders } = useOrders();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    refreshOrders();
  }, [user]);

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="font-heading text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Package size={24} className="text-brand-orange" /> My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
          <Package size={72} className="mx-auto text-gray-200 mb-6" />
          <h2 className="text-xl font-bold text-gray-700 mb-2">No orders yet!</h2>
          <p className="text-gray-500 mb-8">Start shopping and your orders will appear here.</p>
          <Link to="/products" className="btn-primary px-10 py-3 text-base">Shop Now →</Link>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => {
            const config = STATUS_CONFIG[order.status];
            const StatusIcon = config.icon;
            const currentStep = STATUS_STEPS.indexOf(order.status);

            return (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-5 border-b bg-gray-50">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Order #{order.id}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${config.color}`}>
                      <div className={`w-2 h-2 rounded-full ${config.dot}`} />
                      {config.label}
                    </span>
                    <span className="font-bold text-gray-900">₹{order.total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Progress bar */}
                {order.status !== "cancelled" && (
                  <div className="px-5 py-4 border-b">
                    <div className="flex items-center">
                      {STATUS_STEPS.map((step, i) => (
                        <div key={step} className="flex items-center flex-1 last:flex-none">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 flex-shrink-0 ${i <= currentStep ? "bg-brand-orange border-brand-orange text-white" : "bg-white border-gray-200 text-gray-400"}`}>
                            {i <= currentStep ? "✓" : i + 1}
                          </div>
                          <div className="flex-1 text-center">
                            <p className={`text-xs mt-1 font-medium ${i <= currentStep ? "text-brand-orange" : "text-gray-400"}`}>
                              {step.charAt(0).toUpperCase() + step.slice(1)}
                            </p>
                          </div>
                          {i < STATUS_STEPS.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-1 ${i < currentStep ? "bg-brand-orange" : "bg-gray-200"}`} />
                          )}
                        </div>
                      ))}
                    </div>
                    {order.trackingId && (
                      <p className="text-xs text-gray-500 mt-2">Tracking ID: <span className="font-semibold text-gray-700">{order.trackingId}</span></p>
                    )}
                  </div>
                )}

                {/* Items */}
                <div className="p-5">
                  <div className="space-y-3">
                    {order.items.slice(0, 2).map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-14 h-14 object-cover rounded-lg border border-gray-100" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.product.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity} × ₹{item.product.price.toLocaleString("en-IN")}</p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <p className="text-xs text-gray-500">+ {order.items.length - 2} more items</p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 mt-4">
                    <Link
                      to={`/products`}
                      className="text-sm text-brand-blue font-semibold border border-brand-blue px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Buy Again
                    </Link>
                    {order.status === "delivered" && (
                      <button className="text-sm text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        Write Review
                      </button>
                    )}
                    <button className="text-sm text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1">
                      📄 Invoice
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
