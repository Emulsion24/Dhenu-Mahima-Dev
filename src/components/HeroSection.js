"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useLandingStore } from "@/store/landingStore";

export default function HeroSection() {
  const { getBanners } = useLandingStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([]);

  // Fetch banners from backend
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const  data  = await getBanners();
        // Ensure data is an array
        if (Array.isArray(data)) {
          setSlides(data);
        } else {
          console.error("Expected an array from backend, got:", data);
        }
      } catch (err) {
        console.error("Failed to fetch banners:", err);
      }
    };
    fetchBanners();
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Show nothing if no slides
  if (!slides || slides.length === 0) return null;

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
            <div className="relative w-full h-auto">
              <Image
                src={slide.image}
                alt={slide.title || `Banner ${index + 1}`}
                width={1920}
                height={600}
                className="w-full h-auto block"
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/1920x600/FF9933/fff?text=Banner+${index + 1}`;
                }}
                sizes="100vw"
                unoptimized
              />
            </div>
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
