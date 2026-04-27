import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#131921] text-white mt-8">
      {/* Back to top */}
      <div
        className="bg-[#37475A] hover:bg-[#485769] text-center py-3 text-sm font-semibold cursor-pointer transition-colors"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑ Back to top
      </div>

      {/* Main footer columns */}
      <div className="max-w-[1440px] mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700">
        <div>
          <h3 className="font-bold text-white mb-4 text-sm">Get to Know Us</h3>
          <ul className="space-y-2 text-gray-400 text-xs">
            {["About Tyfenix", "Careers", "Press Releases", "Investor Relations", "Blog"].map((l) => (
              <li key={l}><a href="#" className="hover:text-brand-orange hover:underline transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white mb-4 text-sm">Connect with Us</h3>
          <ul className="space-y-2 text-gray-400 text-xs">
            <li>
              <a href="https://wa.me/919368000000?text=Hi%2C%20I%20need%20help%20with%20my%20Tyfenix%20order" target="_blank" rel="noreferrer"
                className="hover:text-brand-orange hover:underline transition-colors flex items-center gap-1.5">
                💬 WhatsApp Chat
              </a>
            </li>
            {["Facebook", "Twitter / X", "Instagram", "YouTube"].map((l) => (
              <li key={l}><a href="#" className="hover:text-brand-orange hover:underline transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white mb-4 text-sm">Make Money with Us</h3>
          <ul className="space-y-2 text-gray-400 text-xs">
            {["Sell on Tyfenix", "Become an Affiliate", "Advertise Your Products", "Self-Publish with Us", "Become a Delivery Partner"].map((l) => (
              <li key={l}><a href="#" className="hover:text-brand-orange hover:underline transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white mb-4 text-sm">Let Us Help You</h3>
          <ul className="space-y-2 text-gray-400 text-xs">
            <li><Link to="/account" className="hover:text-brand-orange hover:underline transition-colors">Your Account</Link></li>
            <li><Link to="/orders" className="hover:text-brand-orange hover:underline transition-colors">Your Orders</Link></li>
            <li><Link to="/wishlist" className="hover:text-brand-orange hover:underline transition-colors">Your Wishlist</Link></li>
            <li><a href="#" className="hover:text-brand-orange hover:underline transition-colors">Returns & Replacements</a></li>
            <li><a href="#" className="hover:text-brand-orange hover:underline transition-colors">Manage Your Content</a></li>
            <li><Link to="/privacy" className="hover:text-brand-orange hover:underline transition-colors">Privacy Policy</Link></li>
            <li><a href="#" className="hover:text-brand-orange hover:underline transition-colors">Help Centre</a></li>
          </ul>
        </div>
      </div>

      {/* Logo + copyright */}
      <div className="max-w-[1440px] mx-auto px-6 py-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-orange to-amber-400 flex items-center justify-center font-black text-sm text-[#0f1111]">T</div>
          <span className="font-black text-2xl text-brand-orange tracking-tight">tyfenix</span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-[11px] text-gray-500 mb-4">
          <Link to="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
          <span>|</span>
          <a href="#" className="hover:text-gray-300 transition-colors">Terms of Use</a>
          <span>|</span>
          <a href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</a>
          <span>|</span>
          <a href="#" className="hover:text-gray-300 transition-colors">Accessibility Statement</a>
        </div>
        <p className="text-[11px] text-gray-600">
          © {new Date().getFullYear()} Tyfenix.com, Inc. or its affiliates. All rights reserved.
        </p>
        {/* Payment icons */}
        <div className="flex justify-center gap-2 mt-4">
          {["💳 Visa", "🏦 MC", "📲 UPI", "🟡 PayTM", "🔵 GPay", "📦 COD"].map((p) => (
            <span key={p} className="bg-gray-800 text-gray-400 text-[10px] px-2.5 py-1 rounded-md font-semibold border border-gray-700">{p}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
