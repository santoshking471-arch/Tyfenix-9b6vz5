import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export default function Login() {
  const { login, loading, socialLogin } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill all fields"); return; }
    const result = await login(email, password);
    if (result.success) {
      toast.success(`Welcome back, ${result.user?.name.split(" ")[0]}!`);
      navigate(redirect);
    } else {
      setError(result.error || "Login failed");
    }
  };

  const handleSocial = async (provider: string) => {
    const result = await socialLogin(provider);
    if (result.success) {
      toast.success("Signed in successfully!");
      navigate(redirect);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="font-heading font-800 text-3xl text-brand-orange">Tyfenix</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h1 className="font-heading text-2xl font-bold text-gray-900 mb-1">Sign In</h1>
          <p className="text-gray-500 text-sm mb-6">Welcome back! Login to continue shopping.</p>

          {/* Admin hint */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-5 text-xs text-blue-700">
            <strong>Admin Login:</strong> santoshking471@gmail.com / Santosh@9368
          </div>

          {/* Social login */}
          <div className="space-y-3 mb-6">
            {[
              { provider: "google", label: "Continue with Google", icon: "🔵", bg: "hover:bg-red-50 border-red-200" },
              { provider: "facebook", label: "Continue with Facebook", icon: "🔷", bg: "hover:bg-blue-50 border-blue-200" },
              { provider: "twitter", label: "Continue with Twitter/X", icon: "🐦", bg: "hover:bg-sky-50 border-sky-200" },
            ].map((s) => (
              <button
                key={s.provider}
                onClick={() => handleSocial(s.provider)}
                disabled={loading}
                className={`w-full flex items-center gap-3 border ${s.bg} rounded-xl py-2.5 px-4 text-sm font-medium text-gray-700 transition-colors`}
              >
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl pl-10 pr-10 py-2.5 text-sm outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm bg-red-50 rounded-lg px-3 py-2">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-orange hover:bg-brand-orange-dark text-brand-navy font-bold py-3 rounded-xl transition-colors text-sm disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-5">
            New to Tyfenix?{" "}
            <Link to="/register" className="text-brand-blue font-semibold hover:underline">Create Account</Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          By signing in, you agree to Tyfenix's{" "}
          <Link to="/privacy" className="text-brand-blue hover:underline">Privacy Policy</Link> &{" "}
          <Link to="/terms" className="text-brand-blue hover:underline">Terms of Service</Link>
        </p>
      </div>
    </div>
  );
}
