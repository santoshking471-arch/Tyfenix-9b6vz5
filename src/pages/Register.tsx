import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export default function Register() {
  const { register, loading, socialLogin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password) { setError("Please fill all required fields"); return; }
    if (form.password !== form.confirmPassword) { setError("Passwords do not match"); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }

    const result = await register(form.name, form.email, form.password, form.phone);
    if (result.success) {
      toast.success(`Welcome to Tyfenix, ${result.user?.name.split(" ")[0]}! 🎉`);
      navigate("/");
    } else {
      setError(result.error || "Registration failed");
    }
  };

  const handleSocial = async (provider: string) => {
    const result = await socialLogin(provider);
    if (result.success) {
      toast.success("Account created successfully!");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/"><span className="font-heading font-800 text-3xl text-brand-orange">Tyfenix</span></Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h1 className="font-heading text-2xl font-bold text-gray-900 mb-1">Create Account</h1>
          <p className="text-gray-500 text-sm mb-6">Join millions of happy Tyfenix shoppers!</p>

          {/* Social */}
          <div className="space-y-3 mb-6">
            {[
              { provider: "google", label: "Sign up with Google", icon: "🔵" },
              { provider: "facebook", label: "Sign up with Facebook", icon: "🔷" },
              { provider: "twitter", label: "Sign up with Twitter/X", icon: "🐦" },
            ].map((s) => (
              <button key={s.provider} onClick={() => handleSocial(s.provider)} disabled={loading}
                className="w-full flex items-center gap-3 border border-gray-200 hover:bg-gray-50 rounded-xl py-2.5 px-4 text-sm font-medium text-gray-700 transition-colors">
                <span className="text-lg">{s.icon}</span> {s.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { icon: User, key: "name", label: "Full Name *", placeholder: "Your name", type: "text" },
              { icon: Mail, key: "email", label: "Email Address *", placeholder: "you@example.com", type: "email" },
              { icon: Phone, key: "phone", label: "Mobile Number", placeholder: "10-digit mobile (optional)", type: "tel" },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                <div className="relative">
                  <field.icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={(form as Record<string, string>)[field.key]}
                    onChange={set(field.key)}
                    className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                  />
                </div>
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPass ? "text" : "password"} placeholder="Min 6 characters" value={form.password} onChange={set("password")}
                  className="w-full border border-gray-300 rounded-xl pl-10 pr-10 py-2.5 text-sm outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPass ? "text" : "password"} placeholder="Repeat password" value={form.confirmPassword} onChange={set("confirmPassword")}
                  className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange" />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm bg-red-50 rounded-lg px-3 py-2">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full bg-brand-orange hover:bg-brand-orange-dark text-brand-navy font-bold py-3 rounded-xl transition-colors disabled:opacity-60">
              {loading ? "Creating account..." : "Create Account →"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-brand-blue font-semibold hover:underline">Sign In</Link>
          </p>
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">
          By creating an account, you agree to our{" "}
          <Link to="/privacy" className="text-brand-blue hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
