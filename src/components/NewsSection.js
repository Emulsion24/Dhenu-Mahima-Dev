"use client";

import Link from 'next/link';
import React, { useState } from 'react';

export default function NewsSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const news = [
    { 
      text: "जगदगुरु श्री बल्लभाचार्य जी के वंशज श्री वत्सल बाबा मुम्बई का 20 नवम्बर को गो अभयारण्य में पदार्पण",
      date: "20 Nov 2024",
      category: "Event"
    },
    { 
      text: "जगदगुरु श्री बल्लभाचार्य जी के वंशज श्री वत्सल बाबा मुम्बई का 20 नवम्बर को गो अभयारण्य में पदार्पण",
      date: "19 Nov 2024",
      category: "News"
    },
    { 
      text: "जगदगुरु श्री बल्लभाचार्य जी के वंशज श्री वत्सल बाबा मुम्बई का 20 नवम्बर को गो अभयारण्य में पदार्पण",
      date: "18 Nov 2024",
      category: "Update"
    },
  ];

  return (
    <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Modern gradient background */}
      <div className="absolute inset-0  ">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Modern Title Section */}
        <div className="text-center mb-12 md:mb-16 ">
          {/* Live indicator badge */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-50 to-orange-50 px-5 py-2.5 rounded-full mb-6 border border-red-200/50 shadow-sm">
            <div className="relative flex items-center ">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></div>
            </div>
            <span className="text-sm font-bold text-red-700 uppercase tracking-wider">Live Updates</span>
          </div>

          {/* Main title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-snug">
  <span
    className="inline-block bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700 bg-clip-text text-transparent"
    style={{
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      paddingTop: "0.1em",
      paddingBottom: "0.1em",
      display: "inline-block",
    }}
  >
    दैनिक समाचार
  </span>
</h2>


          <p className="text-gray-600 text-base sm:text-lg font-medium max-w-2xl mx-auto">
            Stay updated with the latest news and announcements
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2 mt-6 ">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-400"></div>
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-400"></div>
          </div>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:gap-8 mb-12 ">
          {news.map((item, i) => (
            <div
              key={i}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                animation: `slideInLeft 0.6s ease-out ${i * 0.15}s both`
              }}
            >
              <style jsx>{`
                @keyframes slideInLeft {
                  from {
                    opacity: 0;
                    transform: translateX(-50px);
                  }
                  to {
                    opacity: 1;
                    transform: translateX(0);
                  }
                }
              `}</style>

              {/* News Card */}
              <div className="relative ">
                {/* Hover glow effect */}
                <div className={`absolute -inset-1 bg-orange-600 rounded-3xl blur-xl transition-all duration-700 ${
                  hoveredIndex === i ? 'opacity-50 scale-105' : 'opacity-0 scale-95'
                }`}></div>

                {/* Main card content with solid color background */}
                <div className={`relative bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl shadow-xl overflow-hidden transition-all duration-500 ${
                  hoveredIndex === i ? 'shadow-2xl scale-[1.02]' : ''
                }`}>
                  
                  {/* Gradient accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"></div>

                  <div className="flex flex-col sm:flex-row items-center gap-6 p-6 md:p-8">
                    
                    {/* Breaking News Badge - Modern Design */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        {/* Animated rings */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl transition-all duration-700 ${
                          hoveredIndex === i ? 'scale-110 opacity-30 blur-md' : 'scale-100 opacity-0'
                        }`}></div>
                        
                        {/* Main badge */}
                        <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-2xl w-28 h-28 sm:w-32 sm:h-32 flex flex-col items-center justify-center shadow-2xl border-2 border-red-500/30 overflow-hidden">
                          {/* Animated background pattern */}
                          <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent"></div>
                          
                          {/* Pulsing dot */}
                          <div className="absolute top-3 right-3">
                            <div className="relative">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                              <div className="absolute inset-0 w-2 h-2 bg-white rounded-full animate-ping"></div>
                            </div>
                          </div>

                          {/* Badge content */}
                          <div className="relative z-10 text-center">
                            <div className="text-white text-xs font-bold tracking-widest mb-1 opacity-90">
                              • LIVE •
                            </div>
                            <div className="text-white text-xl sm:text-2xl font-black leading-tight">
                              BREAKING
                            </div>
                            <div className="text-white text-xl sm:text-2xl font-black leading-tight">
                              NEWS
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* News Content */}
                    <div className="flex-1 text-center sm:text-left">
                      {/* Category & Date */}
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-3">
                        <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-orange-200">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          {item.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {item.date}
                        </span>
                      </div>

                      {/* News text */}
                      <p className="text-base sm:text-lg md:text-xl font-bold text-white leading-relaxed mb-5">
                        {item.text}
                      </p>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                        <button className={`group/btn bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center gap-2 ${
                          hoveredIndex === i ? 'shadow-orange-500/50 scale-105' : ''
                        }`}>
                          <span className="text-sm">Read More</span>
                          <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>

                        <button className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text- border-2 border-gray-200 px-5 py-2.5 rounded-xl font-semibold hover:border-orange-300 hover:text-orange-600 transition-all duration-300 flex items-center gap-2 text-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modern CTA Section */}
        <div className="flex flex-col items-center gap-6 mt-16">
          {/* Show All button */}
            <Link href="/news">
    
   
          <button  className="group relative overflow-hidden bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white font-bold px-12 py-4 rounded-2xl shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-500">
            {/* Shine animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <span className="relative flex items-center gap-3 text-lg">
              <span>View All News</span>
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
           </Link>
        </div>
      </div>
    </section>
  );
}