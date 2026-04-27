import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white mt-16">
      {/* Back to top */}
      <div
        className="bg-brand-navy-light text-center py-3.5 text-sm hover:bg-opacity-80 cursor-pointer transition-colors"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to top ↑
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold text-brand-orange mb-4">Get to Know Us</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link to="/about" className="hover:text-brand-orange transition-colors">About Tyfenix</Link></li>
            <li><Link to="/careers" className="hover:text-brand-orange transition-colors">Careers</Link></li>
            <li><Link to="/press" className="hover:text-brand-orange transition-colors">Press Releases</Link></li>
            <li><Link to="/investor" className="hover:text-brand-orange transition-colors">Investor Relations</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-brand-orange mb-4">Connect with Us</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <a
                href="https://wa.me/919368000000?text=Hi%2C%20I%20need%20help%20with%20my%20Tyfenix%20order"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-orange transition-colors flex items-center gap-2"
              >
                💬 WhatsApp Chat
              </a>
            </li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">Facebook</a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">Twitter / X</a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">Instagram</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-brand-orange mb-4">Make Money with Us</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#" className="hover:text-brand-orange transition-colors">Sell on Tyfenix</a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">Become an Affiliate</a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">Advertise Your Products</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-brand-orange mb-4">Let Us Help You</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link to="/account" className="hover:text-brand-orange transition-colors">Your Account</Link></li>
            <li><Link to="/orders" className="hover:text-brand-orange transition-colors">Your Orders</Link></li>
            <li><Link to="/returns" className="hover:text-brand-orange transition-colors">Returns & Replacements</Link></li>
            <li><Link to="/privacy" className="hover:text-brand-orange transition-colors">Privacy Policy</Link></li>
            <li><Link to="/help" className="hover:text-brand-orange transition-colors">Help Centre</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <span className="font-heading font-bold text-2xl text-brand-orange">Tyfenix</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400 mb-3">
            <Link to="/privacy" className="hover:text-brand-orange transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brand-orange transition-colors">Terms of Use</Link>
            <Link to="/help" className="hover:text-brand-orange transition-colors">Customer Service</Link>
            <Link to="/cookies" className="hover:text-brand-orange transition-colors">Cookie Policy</Link>
          </div>
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Tyfenix.com, Inc. or its affiliates. All rights reserved.
          </p>
          <div className="flex justify-center gap-3 mt-3 text-lg">
            <span title="Visa">💳</span>
            <span title="Mastercard">🏦</span>
            <span title="UPI">📲</span>
            <span title="PayTM">🔴</span>
            <span title="Amazon Pay">🟡</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
