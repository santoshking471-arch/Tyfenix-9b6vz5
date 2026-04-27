import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Users, ShoppingBag, TrendingUp, AlertTriangle, Check } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useOrders, getAllOrders } from "@/hooks/useOrders";
import { PRODUCTS } from "@/constants/products";
import type { Order } from "@/types";

const STATUS_OPTIONS = ["pending", "confirmed", "packed", "shipped", "delivered", "cancelled"] as const;

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  packed: "bg-purple-100 text-purple-700",
  shipped: "bg-orange-100 text-orange-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { updateOrderStatus } = useOrders();
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<"dashboard" | "orders" | "inventory">("dashboard");

  useEffect(() => {
    if (!user || !user.isAdmin) { navigate("/"); return; }
    setOrders(getAllOrders());
  }, [user]);

  if (!user?.isAdmin) return null;

  const totalRevenue = orders.reduce((s, o) => s + (o.paymentStatus === "paid" ? o.total : 0), 0);
  const lowStockProducts = PRODUCTS.filter((p) => p.stock <= 5);

  const handleStatusChange = (orderId: string, status: Order["status"]) => {
    updateOrderStatus(orderId, status);
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o));
  };

  const stats = [
    { label: "Total Orders", value: orders.length.toString(), icon: Package, color: "bg-blue-50 text-blue-600", change: "+12%" },
    { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, icon: TrendingUp, color: "bg-green-50 text-green-600", change: "+8%" },
    { label: "Products", value: PRODUCTS.length.toString(), icon: ShoppingBag, color: "bg-purple-50 text-purple-600", change: "+3" },
    { label: "Low Stock", value: lowStockProducts.length.toString(), icon: AlertTriangle, color: "bg-red-50 text-red-600", change: "Alert" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-500 text-sm">Welcome, {user.name} 👑</p>
        </div>
        <span className="bg-brand-orange/10 text-brand-orange font-semibold text-sm px-4 py-2 rounded-xl">Tyfenix Admin</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-white rounded-xl p-1.5 shadow-sm w-fit">
        {(["dashboard", "orders", "inventory"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${activeTab === tab ? "bg-brand-navy text-white" : "text-gray-600 hover:bg-gray-100"}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Dashboard */}
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                  <s.icon size={20} />
                </div>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
                <p className="text-xs text-green-600 font-medium mt-1">{s.change}</p>
              </div>
            ))}
          </div>

          {/* Low stock alert */}
          {lowStockProducts.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
              <h3 className="font-semibold text-red-700 flex items-center gap-2 mb-3">
                <AlertTriangle size={18} /> Low Stock Alert ({lowStockProducts.length} products)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {lowStockProducts.map((p) => (
                  <div key={p.id} className="bg-white rounded-xl p-3 flex items-center gap-3">
                    <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 truncate">{p.name}</p>
                      <p className="text-xs text-red-500 font-bold">Only {p.stock} left!</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent orders */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Recent Orders</h3>
              <button onClick={() => setActiveTab("orders")} className="text-brand-blue text-sm font-semibold hover:underline">View all</button>
            </div>
            {orders.length === 0 ? (
              <div className="p-10 text-center text-gray-400">No orders yet</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Order ID", "Items", "Total", "Status", "Date"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-mono text-xs text-gray-700">{order.id}</td>
                        <td className="px-4 py-3 text-gray-600">{order.items.length} item(s)</td>
                        <td className="px-4 py-3 font-semibold">₹{order.total.toLocaleString("en-IN")}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>{order.status}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs">{new Date(order.createdAt).toLocaleDateString("en-IN")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b">
            <h3 className="font-semibold text-gray-900">All Orders ({orders.length})</h3>
          </div>
          {orders.length === 0 ? (
            <div className="p-16 text-center">
              <Package size={56} className="mx-auto text-gray-200 mb-4" />
              <p className="text-gray-400">No orders have been placed yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {["Order ID", "Products", "Total", "Payment", "Status", "Actions", "Date"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-xs text-gray-700">{order.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex -space-x-2">
                          {order.items.slice(0, 3).map((item, i) => (
                            <img key={i} src={item.product.images[0]} alt="" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{order.items.length} item(s)</p>
                      </td>
                      <td className="px-4 py-3 font-semibold">₹{order.total.toLocaleString("en-IN")}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${order.paymentStatus === "paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>{order.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value as Order["status"])}
                          className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-brand-orange bg-white"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{new Date(order.createdAt).toLocaleDateString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Inventory Tab */}
      {activeTab === "inventory" && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b">
            <h3 className="font-semibold text-gray-900">Product Inventory ({PRODUCTS.length} products)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Product", "Brand", "Category", "Price", "Stock", "Status"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {PRODUCTS.map((p) => (
                  <tr key={p.id} className={`hover:bg-gray-50 ${p.stock <= 5 ? "bg-red-50/50" : ""}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover border border-gray-100" />
                        <span className="font-medium text-gray-900 text-xs max-w-[180px] truncate">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{p.brand}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded capitalize">{p.category}</span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-xs">₹{p.price.toLocaleString("en-IN")}</td>
                    <td className="px-4 py-3">
                      <span className={`font-bold text-sm ${p.stock <= 5 ? "text-red-600" : p.stock <= 20 ? "text-yellow-600" : "text-green-600"}`}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {p.stock === 0 ? (
                        <span className="text-xs bg-red-100 text-red-700 font-semibold px-2 py-0.5 rounded-full">Out of Stock</span>
                      ) : p.stock <= 5 ? (
                        <span className="text-xs bg-orange-100 text-orange-700 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                          <AlertTriangle size={10} /> Low Stock
                        </span>
                      ) : (
                        <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                          <Check size={10} /> In Stock
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
