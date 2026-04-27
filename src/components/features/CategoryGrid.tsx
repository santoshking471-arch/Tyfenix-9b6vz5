import { Link } from "react-router-dom";
import { CATEGORIES } from "@/constants/products";

export default function CategoryGrid() {
  return (
    <section>
      <h2 className="font-heading font-700 text-xl text-gray-900 mb-4">Shop by Category</h2>
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-10 gap-3">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            to={`/products?category=${cat.id}`}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 group"
          >
            <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
              {cat.icon}
            </div>
            <span className="text-xs font-medium text-gray-700 text-center leading-tight">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
