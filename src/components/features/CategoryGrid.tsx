import { Link } from "react-router-dom";
import { CATEGORIES } from "@/constants/products";

const CAT_GRADIENTS: Record<string, string> = {
  electronics: "from-blue-500 to-blue-700",
  mobiles: "from-purple-500 to-purple-700",
  fashion: "from-pink-500 to-rose-600",
  home: "from-yellow-400 to-orange-500",
  beauty: "from-rose-400 to-pink-600",
  sports: "from-green-500 to-emerald-700",
  books: "from-orange-400 to-amber-600",
  toys: "from-indigo-500 to-violet-700",
  grocery: "from-lime-500 to-green-600",
  appliances: "from-teal-500 to-cyan-700",
};

export default function CategoryGrid() {
  return (
    <section className="py-2">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <h2 className="font-black text-xl text-gray-900 leading-tight">Shop by Category</h2>
          <p className="text-xs text-gray-500 mt-0.5">Find what you're looking for</p>
        </div>
        <Link to="/products" className="text-xs text-brand-blue font-semibold hover:underline">See all →</Link>
      </div>

      {/* Category pills row */}
      <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-2 md:gap-3">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            to={`/products?category=${cat.id}`}
            className="group flex flex-col items-center gap-2"
          >
            {/* Icon circle with gradient */}
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${CAT_GRADIENTS[cat.id] || "from-gray-400 to-gray-600"} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-200 group-hover:-translate-y-0.5`}>
              {cat.icon}
            </div>
            <span className="text-[10px] md:text-xs font-semibold text-gray-700 text-center leading-tight group-hover:text-brand-blue transition-colors">
              {cat.name}
            </span>
            <span className="text-[9px] text-gray-400 -mt-1">{cat.count.toLocaleString("en-IN")}+</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
