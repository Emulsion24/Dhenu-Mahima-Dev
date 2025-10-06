"use client";
import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

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
  const cards = [
    { 
      title_hi: "गोपाल परिवार", 
      title_en: "Gopal Pariwar",
      image: "/images/1.png",
      link: "/gopal-pariwar"
    },
    { 
      title_hi: "हमारी नींव", 
      title_en: "Our Foundations",
      image: "/images/1.png",
      link: "/#foundation"
    },
    { 
      title_hi: "दाता संस्थान", 
      title_en: "Data's Sansthan",
      image: "/images/1.png",
      link: "/sansthan"
    },
    { 
      title_hi: "प्रेरित गौशालाएं", 
      title_en: "Inspired GauShallas",
      image: "/images/1.png",
      link: "/gowshala"
    },
    { 
      title_hi: "गौ सेवा दान", 
      title_en: "Gau Seva Donations",
      image: "/images/1.png",
      link: "/donate"
    },
    { 
      title_hi: "हमारे उद्देश्य", 
      title_en: "Our Objectives",
      image: "/images/1.png",
      link: "/objective"
    },
    { 
      title_hi: "गौ कथा के लिए", 
      title_en: "For Gau Katha",
      image:"/images/1.png",
      link: "/contact"
    },
    { 
      title_hi: "आगामी कथा एवं आयोजन", 
      title_en: "Upcoming Kathas & Programs",
      image:"/images/1.png",
      link: "/events"
    },
    { 
      title_hi: "दैनिक समाचार", 
      title_en: "Daily News",
      image: "/images/1.png",
      link: "/news"
    },
    { 
      title_hi: "मासिक पत्रिका", 
      title_en: "Monthly Magazine",
      image: "/images/1.png",
      link: "/magazine"
    },
    { 
      title_hi: "ई-बुक", 
      title_en: "E-Book",
      image: "/images/1.png",
      link: "/ebook"
    },
    { 
      title_hi: "पीडीएफ पुस्तकें", 
      title_en: "PDF-Books",
      image: "/images/1.png",
      link: "/pdf-books"
    },
    { 
      title_hi: "पद यात्रा", 
      title_en: "Pad Yatra's",
      image: "/images/1.png",
      link: "https://dhenudhamfoundation.com"
    },
    { 
      title_hi: "भजन", 
      title_en: "Bhajanas",
      image: "/images/1.png",
      link: "/bhajanas"
    },
    { 
      title_hi: "संपर्क करें", 
      title_en: "Contact Us",
      image: "/images/1.png",
      link: "/message"
    },
    { 
      title_hi: "निदेशक का संदेश", 
      title_en: "Directors Message",
      image: "/images/1.png",
      link: "/#director-message"
    },
  ];

  const handleCardClick = (link) => {
    console.log(`Navigating to: ${link}`);
    window.location.href = link;
  };

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
              
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent rounded-full mx-auto mb-3" />
              
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {cards.map((card, i) => (
            <div
              key={i}
              onClick={() => handleCardClick(card.link)}
              className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${i * 50}ms` }}
              aria-label={`Learn more about ${card.title_en}`}
            >
              {/* Card Container */}
              <div className="relative h-full rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 border-2 border-orange-100" style={{ backgroundColor: "#ADEED9" }}>
                {/* Image section */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <Image 
                    src={card.image} 
                    alt={card.title_hi}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                  <div 
                  className="h-1.5" 
                  style={{
                    background: 'linear-gradient(to right, #f97316, #d97706)'
                  }}
                />
                {/* Content Section */}
                <div className="p-6 sm:p-8 text-center">
                  <h3 
                    className="text-2xl sm:text-2xl font-bold text-orange-900 mb-2 leading-tight"
                    style={{ 
                      fontFamily: 'Noto Serif Devanagari, Georgia, serif',
                    }}
                  >
                    {card.title_hi}
                  </h3>
                  
                  <p className="text-orange-600 text-base sm:text-lg font-bold mb-6">
                    {card.title_en}
                  </p>
                
                </div>

                {/* Bottom accent line - UNIFORM FOR ALL CARDS */}
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}