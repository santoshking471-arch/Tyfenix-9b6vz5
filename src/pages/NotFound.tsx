import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-8xl mb-6">🛒</p>
      <h1 className="font-heading text-4xl font-bold text-gray-900 mb-3">404 – Page Not Found</h1>
      <p className="text-gray-500 text-lg mb-8 max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/" className="btn-primary px-8 py-3 text-base">Go to Home</Link>
        <Link to="/products" className="btn-secondary px-8 py-3 text-base">Browse Products</Link>
      </div>
    </div>
  );
}
