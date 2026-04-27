import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "@/constants/products";

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => setCurrent((c) => (c + 1) % HERO_SLIDES.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + HERO_SLIDES.length) % HERO_SLIDES.length), []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ margin: "0 -1rem" }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="relative h-52 sm:h-72 md:h-[380px] lg:h-[420px]">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ${idx === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            {/* Background image full bleed */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg} opacity-80`} />
            {/* Right fade for content space */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24">
              <div className="text-white max-w-xl">
                <span className={`inline-flex items-center gap-1 ${slide.badgeColor} text-white text-[11px] font-black px-3 py-1 rounded-full mb-4 tracking-widest uppercase shadow-lg`}>
                  ⚡ {slide.badge}
                </span>
                <h1 className="font-black text-2xl sm:text-3xl md:text-5xl leading-[1.1] mb-3 drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-white/85 text-sm md:text-lg mb-6 font-medium">{slide.subtitle}</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <Link
                    to={slide.link}
                    className="inline-flex items-center gap-2 bg-brand-orange hover:bg-amber-500 text-[#0f1111] font-black px-8 py-3.5 rounded-full transition-all duration-200 hover:scale-105 shadow-xl text-sm md:text-base"
                  >
                    {slide.cta} →
                  </Link>
                  <span className="text-white/60 text-xs">Limited time offer</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nav buttons */}
      <button
        onClick={prev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-1.5 md:p-2.5 shadow-xl transition-all hover:scale-110"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-1.5 md:p-2.5 shadow-xl transition-all hover:scale-110"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`rounded-full transition-all duration-300 ${idx === current ? "bg-brand-orange w-7 h-2.5" : "bg-white/50 hover:bg-white/80 w-2.5 h-2.5"}`}
          />
        ))}
      </div>
    </div>
  );
}
