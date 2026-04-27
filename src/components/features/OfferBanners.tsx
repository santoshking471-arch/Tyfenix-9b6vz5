import { OFFER_BANNERS } from "@/constants/products";

const ICON_BG: Record<number, string> = {
  0: "bg-blue-500",
  1: "bg-green-500",
  2: "bg-orange-500",
  3: "bg-purple-500",
};

export default function OfferBanners() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {OFFER_BANNERS.map((banner, idx) => (
        <div
          key={idx}
          className="flex items-center gap-3 bg-white rounded-xl px-4 py-3.5 border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default"
        >
          <div className={`${ICON_BG[idx]} w-9 h-9 rounded-xl flex items-center justify-center text-lg shadow-sm flex-shrink-0`}>
            {banner.icon}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-xs text-gray-900 leading-tight">{banner.title}</p>
            <p className="text-[10px] text-gray-500 leading-tight mt-0.5 truncate">{banner.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
