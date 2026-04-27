import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import ProductCard from "@/components/features/ProductCard";
import { PRODUCTS, CATEGORIES } from "@/constants/products";

export default function Products() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";
  const initialBadge = searchParams.get("badge") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [minRating, setMinRating] = useState(0);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const brands = useMemo(() => [...new Set(PRODUCTS.map((p) => p.brand))], []);

  const filtered = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory) result = result.filter((p) => p.category === selectedCategory);
    if (initialBadge) result = result.filter((p) => p.badge === initialBadge);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }
    if (selectedBrands.length > 0) result = result.filter((p) => selectedBrands.includes(p.brand));
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    result = result.filter((p) => p.rating >= minRating);

    switch (sortBy) {
      case "price_asc": result.sort((a, b) => a.price - b.price); break;
      case "price_desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "discount": result.sort((a, b) => b.discount - a.discount); break;
      case "reviews": result.sort((a, b) => b.reviews - a.reviews); break;
    }

    return result;
  }, [selectedCategory, searchQuery, priceRange, minRating, selectedBrands, sortBy, initialBadge]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setPriceRange([0, 200000]);
    setMinRating(0);
    setSelectedBrands([]);
    setSortBy("featured");
  };

  const FilterPanel = () => (
    <div className="bg-white rounded-xl shadow-sm p-5 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Filters</h3>
        <button onClick={clearFilters} className="text-brand-blue text-sm hover:underline">Clear All</button>
      </div>

      {/* Category */}
      <div>
        <h4 className="font-medium text-sm text-gray-700 mb-3">Category</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" checked={!selectedCategory} onChange={() => setSelectedCategory("")} className="text-brand-orange" />
            <span className="text-sm">All Categories</span>
          </label>
          {CATEGORIES.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={selectedCategory === cat.id} onChange={() => setSelectedCategory(cat.id)} className="text-brand-orange" />
              <span className="text-sm">{cat.icon} {cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium text-sm text-gray-700 mb-3">Price Range</h4>
        <div className="space-y-2">
          {[
            [0, 500], [500, 2000], [2000, 10000], [10000, 50000], [50000, 200000]
          ].map(([min, max]) => (
            <label key={`${min}-${max}`} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={priceRange[0] === min && priceRange[1] === max}
                onChange={() => setPriceRange([min, max])}
                className="text-brand-orange"
              />
              <span className="text-sm">₹{min.toLocaleString("en-IN")} – ₹{max.toLocaleString("en-IN")}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-medium text-sm text-gray-700 mb-3">Min Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2, 0].map((r) => (
            <label key={r} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={minRating === r} onChange={() => setMinRating(r)} className="text-brand-orange" />
              <span className="text-sm flex items-center gap-1">
                {r === 0 ? "All Ratings" : <>{r}+ <span className="text-brand-orange">★</span></>}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div>
        <h4 className="font-medium text-sm text-gray-700 mb-3">Brand</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="text-brand-orange rounded"
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-gray-900">
            {selectedCategory ? CATEGORIES.find((c) => c.id === selectedCategory)?.name || "Products" : "All Products"}
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">{filtered.length} results found</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm outline-none focus:border-brand-orange"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Avg. Customer Rating</option>
            <option value="discount">Best Discount</option>
            <option value="reviews">Most Reviews</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Desktop filters */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <FilterPanel />
        </div>

        {/* Mobile filters */}
        {showFilters && (
          <div className="fixed inset-0 z-50 bg-black/40 md:hidden" onClick={() => setShowFilters(false)}>
            <div className="absolute left-0 top-0 h-full w-80 bg-white overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <button onClick={() => setShowFilters(false)}><X size={20} /></button>
              </div>
              <div className="p-4">
                <FilterPanel />
              </div>
            </div>
          </div>
        )}

        {/* Products grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🔍</p>
              <p className="text-xl font-semibold text-gray-700 mb-2">No products found</p>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
              <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
