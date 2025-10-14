"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import API from "@/lib/api";

// API configuration


// Thematic Art Component for the Heading
const TempleArchIcon = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 288 113" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M288 113H0V22.5C0 10.0736 10.0736 0 22.5 0H265.5C277.926 0 288 10.0736 288 22.5V113Z" 
      fill="url(#paint0_linear_101_2)"
    />
    <defs>
      <linearGradient 
        id="paint0_linear_101_2" 
        x1="144" y1="0" x2="144" y2="113" 
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#78350F"/>
        <stop offset="1" stopColor="#5C2C0C"/>
      </linearGradient>
    </defs>
  </svg>
);

export default function InfoCards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgSrc, setImgSrc] = useState("/images/1.png");

  // Fetch cards from backend
  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await  API.get("/card");
      const cardsData = response.data || response.cards || response || [];
      setCards(cardsData);
    } catch (err) {
      console.error("Error fetching cards:", err);
      setError(err.message || "Failed to load cards");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (link) => {
    console.log(`Navigating to: ${link}`);
    window.location.href = link;
  };

  // Loading state
  if (loading) {
    return (
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 text-orange-600 animate-spin mb-4" />
            <p className="text-gray-600 font-semibold text-lg">Loading cards...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md text-center">
              <p className="font-semibold mb-2">Unable to load cards</p>
              <p className="text-sm mb-4">{error}</p>
              <button 
                onClick={fetchCards}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (cards.length === 0) {
    return (
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <p className="text-gray-600 font-semibold text-lg">No cards available at the moment</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden py-16 md:py-20 lg:py-24">
      {/* Subtle dot pattern background */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, #f97316 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Artistic Heading */}
        <div className="relative text-center mb-20 md:mb-24">
          <div className="relative inline-block">
            {/* Background Arch Art */}
            <TempleArchIcon className="absolute -inset-x-8 -top-8 w-[115%] h-auto text-orange-800 drop-shadow-2xl" />
            
            <div className="relative pt-6 pb-8 px-8">
              <h2 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3"
                style={{ 
                  fontFamily: 'Noto Serif Devanagari, Georgia, serif',
                  textShadow: '2px 2px 5px rgba(0,0,0,0.5)'
                }}
              >
                अधिक जानकारी हेतु
              </h2>
              
              <p 
                className="text-lg sm:text-xl md:text-2xl text-amber-200 font-bold"
                style={{ 
                  fontFamily: 'Noto Serif Devanagari, serif',
                  textShadow: '1px 1px 3px rgba(0,0,0,0.4)'
                }}
              >
                नीचे दिये बॉक्स पर क्लिक करें
              </p>
            </div>
          </div>
        </div>

        {/* Cards Grid with Staggered Animation */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {cards.map((card, i) => (
            <div
              key={card.id || i}
              onClick={() => handleCardClick(card.link)}
              className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${i * 50}ms` }}
              aria-label={`Learn more about ${card.titleEn || card.title}`}
            >
              {/* Card Container */}
              <div className="relative h-full rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 border-2 border-orange-100" style={{ backgroundColor: "#ADEED9" }}>
                {/* Image section */}
                <div className="relative w-full h-64 overflow-hidden rounded-2xl">
                  {/* Background Image */}
                  <Image
                    src={card.image || "/images/1.png"}
                    alt={card.titleEn || card.title || "Card image"}
                    fill
                    className="object-cover blur-xs brightness-95"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/800x400/FF9933/fff?text=Logo";
                    }}
                    priority={i < 4}
                  />

                  {/* Foreground content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-6 sm:p-8 text-center">
                      <h2
                        className="text-4xl sm:text-2xl text-orange-900 mb-2 leading-tight font-extrabold drop-shadow-[1px_1px_1px_rgba(0,0,0,0.3)]"
                        style={{
                          fontFamily: 'Noto Serif Devanagari, Georgia, serif',
                        }}
                      >
                        {card.title}
                      </h2>
                      
                      {card.titleEn && (
                        <p className="text-orange-900 text-base font-bold sm:text-lg mb-6">
                          {card.titleEn}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}