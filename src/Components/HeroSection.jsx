import { ArrowLeft, ArrowRight, Circle } from "lucide-react";
import { useState } from "react";

const slides = [
  {
    url: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tagline: "Shop the Future. Experience Premium.",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1661645433820-24c8604e4db5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tagline: "Unbeatable Deals. Unmatched Quality.",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1664202526744-516d0dd22932?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tagline: "Your One-Stop Shop for Everything.",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        style={{ backgroundImage: `url(${slides[currentSlide].url})` }}
        className="absolute inset-0 w-full h-full bg-center bg-cover z-0"
      >
        <div className="absolute inset-0 bg-black/60 z-10" />
      </div>
      {/* Tagline overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#ffd700] drop-shadow-lg text-center mb-4 px-4"
          style={{ letterSpacing: "0.04em" }}
        >
          {slides[currentSlide].tagline}
        </h1>
        <button
          className="mt-2 px-6 py-3 rounded-full bg-[#ffd700] text-[#181f2e] font-bold text-base md:text-lg shadow-lg hover:bg-[#1de9b6] hover:text-[#101624] transition"
          onClick={() => {
            const el = document.getElementById("product-list");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Explore our products
        </button>
      </div>
      {/* Navigation dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`rounded-full border-2 ${
              idx === currentSlide
                ? "bg-[#ffd700] border-[#ffd700]"
                : "bg-[#232b3b] border-[#ffd700]"
            } w-2.5 h-2.5 opacity-60 transition-all`}
            aria-label={`Go to slide ${idx + 1}`}
          >
            <span className="sr-only">Go to slide {idx + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
