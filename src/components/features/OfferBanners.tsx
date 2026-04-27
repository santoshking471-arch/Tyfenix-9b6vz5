import { OFFER_BANNERS } from "@/constants/products";

export default function OfferBanners() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {OFFER_BANNERS.map((banner, idx) => (
        <div
          key={idx}
          className={`flex items-center gap-3 p-4 rounded-xl border ${banner.color} hover:shadow-md transition-shadow`}
        >
          <span className="text-2xl">{banner.icon}</span>
          <div>
            <p className="font-semibold text-sm text-gray-900">{banner.title}</p>
            <p className="text-xs text-gray-500">{banner.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
