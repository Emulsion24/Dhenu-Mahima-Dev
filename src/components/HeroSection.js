"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { src: "/banner/1.jpg", alt: "Devotees gathered for a spiritual event" },
  { src: "/banner/2.jpg", alt: "A tranquil Gaushala with cows" },
  { src: "/banner/3.jpg", alt: "Peaceful cow sanctuary" },
  { src: "/banner/4.jpg", alt: "Devotees gathered for a spiritual event" },
  { src: "/banner/5.jpg", alt: "A tranquil Gaushala with cows" },
  { src: "/banner/6.jpg", alt: "A person meditating peacefully at sunrise" },
  { src: "/banner/7.jpg", alt: "A person meditating peacefully at sunrise" },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full bg-black">
      <div className="relative w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0 absolute inset-0"
            }`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-auto block"
              onError={(e) => {
                e.currentTarget.src = `https://placehold.co/1920x600/FF9933/fff?text=Banner+${index + 1}`;
              }}
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 z-20 flex items-center justify-between px-4 md:px-8">
        <button
          onClick={prevSlide}
          className="rounded-full bg-black/30 p-2 text-white transition hover:bg-black/50 md:p-3 backdrop-blur-sm"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={nextSlide}
          className="rounded-full bg-black/30 p-2 text-white transition hover:bg-black/50 md:p-3 backdrop-blur-sm"
          aria-label="Next Slide"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}