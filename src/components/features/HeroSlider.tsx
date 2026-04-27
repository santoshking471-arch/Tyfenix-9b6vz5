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
      className="relative rounded-2xl overflow-hidden shadow-lg"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="relative h-56 sm:h-72 md:h-96">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${idx === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg}`} />
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
            />
            <div className="absolute inset-0 flex items-center px-8 md:px-16">
              <div className="text-white max-w-lg">
                <span className={`inline-block ${slide.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-widest uppercase`}>
                  {slide.badge}
                </span>
                <h1 className="font-heading font-800 text-2xl md:text-4xl leading-tight mb-2">
                  {slide.title}
                </h1>
                <p className="text-white/80 text-sm md:text-lg mb-6">{slide.subtitle}</p>
                <Link
                  to={slide.link}
                  className="inline-block bg-brand-orange hover:bg-brand-orange-dark text-brand-navy font-bold px-8 py-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg text-sm md:text-base"
                >
                  {slide.cta} →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nav buttons */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white rounded-full p-2 transition-all"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white rounded-full p-2 transition-all"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all ${idx === current ? "bg-brand-orange w-6" : "bg-white/50 w-2"}`}
          />
        ))}
      </div>
    </div>
  );
}
