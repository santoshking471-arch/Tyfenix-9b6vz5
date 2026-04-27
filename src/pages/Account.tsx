import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Package, Heart, MapPin, LogOut, Edit2, Save, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { updateUser } from "@/lib/auth";
import { toast } from "sonner";

export default function Account() {
  const { user, logout, refresh } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", phone: user?.phone || "" });

  if (!user) {
    navigate("/login");
    return null;
  }

  const saveProfile = () => {
    updateUser({ name: form.name, phone: form.phone });
    refresh();
    setEditing(false);
    toast.success("Profile updated!");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Signed out successfully");
  };

  const stats = [
    { label: "Orders", value: "0", icon: Package, link: "/orders", color: "text-blue-600 bg-blue-50" },
    { label: "Wishlist", value: "0", icon: Heart, link: "/wishlist", color: "text-red-500 bg-red-50" },
    { label: "Addresses", value: user.addresses.length.toString(), icon: MapPin, link: "#", color: "text-green-600 bg-green-50" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="font-heading text-2xl font-bold text-gray-900 mb-6">My Account</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile card */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
              {user.name[0].toUpperCase()}
            </div>
            {!editing ? (
              <>
                <h2 className="font-bold text-gray-900 text-lg">{user.name}</h2>
                <p className="text-gray-500 text-sm mt-0.5">{user.email}</p>
                {user.phone && <p className="text-gray-500 text-sm">{user.phone}</p>}
                {user.isAdmin && (
                  <span className="inline-block mt-2 bg-brand-orange/10 text-brand-orange text-xs font-bold px-3 py-1 rounded-full">
                    Admin
                  </span>
                )}
                <button
                  onClick={() => setEditing(true)}
                  className="mt-4 flex items-center gap-1.5 mx-auto text-sm text-brand-blue hover:underline"
                >
                  <Edit2 size={14} /> Edit Profile
                </button>
              </>
            ) : (
              <div className="space-y-3 text-left">
                <div>
                  <label className="text-xs text-gray-600 font-medium">Name</label>
                  <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-orange mt-1" />
                </div>
                <div>
                  <label className="text-xs text-gray-600 font-medium">Phone</label>
                  <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-orange mt-1" />
                </div>
                <div className="flex gap-2">
                  <button onClick={saveProfile} className="flex-1 flex items-center justify-center gap-1 bg-green-500 text-white text-xs font-semibold py-2 rounded-lg hover:bg-green-600">
                    <Save size={13} /> Save
                  </button>
                  <button onClick={() => setEditing(false)} className="flex-1 flex items-center justify-center gap-1 bg-gray-100 text-gray-600 text-xs font-semibold py-2 rounded-lg hover:bg-gray-200">
                    <X size={13} /> Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full mt-4 flex items-center justify-center gap-2 border border-red-200 text-red-500 hover:bg-red-50 font-medium py-3 rounded-xl transition-colors text-sm"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        {/* Stats & links */}
        <div className="md:col-span-2 space-y-4">
          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <Link key={stat.label} to={stat.link} className="bg-white rounded-2xl shadow-sm p-4 text-center hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-2`}>
                  <stat.icon size={20} />
                </div>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </Link>
            ))}
          </div>

          {/* Quick links */}
          <div className="bg-white rounded-2xl shadow-sm divide-y">
            {[
              { label: "My Orders", desc: "Track and manage your orders", icon: "📦", link: "/orders" },
              { label: "My Wishlist", desc: "Items you love", icon: "❤️", link: "/wishlist" },
              { label: "Manage Addresses", desc: "Add or edit delivery addresses", icon: "📍", link: "#" },
              { label: "Privacy Policy", desc: "How we protect your data", icon: "🔒", link: "/privacy" },
            ].map((item) => (
              <Link key={item.label} to={item.link} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <span className="text-gray-400 text-lg">›</span>
              </Link>
            ))}
          </div>

          {/* Account info */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Account Details</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex gap-2"><span className="font-medium text-gray-700 w-28">Email:</span><span>{user.email}</span></div>
              <div className="flex gap-2"><span className="font-medium text-gray-700 w-28">Member Since:</span><span>{new Date(user.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</span></div>
              <div className="flex gap-2"><span className="font-medium text-gray-700 w-28">Account Type:</span><span>{user.isAdmin ? "Administrator" : "Customer"}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
