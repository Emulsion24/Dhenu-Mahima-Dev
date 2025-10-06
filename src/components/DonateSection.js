"use client";

import React, { useState } from 'react';

export default function DonateSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const items = [
    {
      text: "गो सेवार्थ होने वाले सभी कार्यों में बने सहभागी",
      button: "गो सेवार्थ दान करे",
      link: "/donate",
      icon: "heart",
      color: "from-orange-500 to-red-500"
    },
    {
      text: "श्री गौ कृपा कथा करवाने हेतु संपर्क करे",
      button: "संपर्क करे",
      link: "/contact",
      icon: "phone",
      color: "from-yellow-500 to-orange-500"
    },
    {
      text: "ग्वाल संत श्री तक अपना संदेश पहुँचाए",
      button: "संदेश भेजे",
      link: "/message",
      icon: "message",
      color: "from-amber-500 to-yellow-500"
    },
  ];

  const handleClick = (link) => {
    window.location.href = link;
  };

  const getIcon = (iconName) => {
    switch(iconName) {
      case 'heart':
        return (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        );
      case 'phone':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case 'message':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section  className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
       <div className="absolute bottom-0 left-0 right-0 rotate-180">
              <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#fffbeb" opacity="0.3"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#fffbeb" opacity="0.5"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#fffbeb" opacity="0.7"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#fffbeb"></path>
                </svg>
         </div>

          <div className="absolute top-0 left-0 right-0">
                 <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#fffbeb" opacity="0.3"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#fffbeb" opacity="0.5"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#fffbeb" opacity="0.7"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#fffbeb"></path>
                </svg>
         </div>
      {/* Background */}
      <div className="absolute inset-0 ">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-yellow-100 px-5 py-2.5 rounded-full mb-6 border border-orange-200">
            <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
            </svg>
            <span className="text-sm font-bold text-orange-700 uppercase tracking-wider">Take Action</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent">
              Join Our Mission
            </span>
          </h2>

          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Be a part of our noble cause and make a difference
          </p>
        </div>

        {/* Action Cards */}
        <div className="space-y-6 md:space-y-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleClick(item.link)}
              style={{
                animation: `fadeInScale 0.6s ease-out ${i * 0.15}s both`
              }}
            >
              <style jsx>{`
                @keyframes fadeInScale {
                  from {
                    opacity: 0;
                    transform: scale(0.9);
                  }
                  to {
                    opacity: 1;
                    transform: scale(1);
                  }
                }
              `}</style>

              <div className="relative">
                {/* Glow effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-3xl blur-xl transition-all duration-500 ${
                  hoveredIndex === i ? 'opacity-60 scale-105' : 'opacity-0'
                }`}></div>

                {/* Main card */}
                <div className={`relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 ${
                  hoveredIndex === i ? 'shadow-2xl scale-[1.02]' : ''
                }`}>
                  
                  {/* Decorative top border with gradient */}
                  <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>

                  {/* Card content */}
                  <div className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 lg:p-10">
                    
                    {/* Icon section */}
                    <div className="flex-shrink-0">
                      <div className={`relative bg-gradient-to-br ${item.color} rounded-2xl p-6 shadow-lg transition-transform duration-500 ${
                        hoveredIndex === i ? 'scale-110 rotate-6' : ''
                      }`}>
                        {/* Animated background circles */}
                        <div className="absolute inset-0 rounded-2xl">
                          <div className={`absolute top-0 right-0 w-16 h-16 bg-white rounded-full opacity-10 transition-transform duration-700 ${
                            hoveredIndex === i ? 'scale-150' : ''
                          }`}></div>
                          <div className={`absolute bottom-0 left-0 w-12 h-12 bg-white rounded-full opacity-10 transition-transform duration-700 ${
                            hoveredIndex === i ? 'scale-150' : ''
                          }`}></div>
                        </div>
                        
                        <div className="relative text-white">
                          {getIcon(item.icon)}
                        </div>
                      </div>
                    </div>

                    {/* Text content */}
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 leading-snug">
                        {item.text}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Click to proceed and be part of this initiative
                      </p>
                    </div>

                    {/* Button */}
                    <div className="flex-shrink-0">
                      <button className={`group/btn relative overflow-hidden bg-gradient-to-r ${item.color} text-white font-bold px-8 py-4 rounded-2xl shadow-xl transition-all duration-500 ${
                        hoveredIndex === i ? 'shadow-2xl scale-110' : ''
                      }`}>
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                        
                        {/* Button content */}
                        <span className="relative flex items-center gap-3 text-base sm:text-lg whitespace-nowrap">
                          <span>{item.button}</span>
                          <svg className={`w-5 h-5 transition-transform duration-300 ${
                            hoveredIndex === i ? 'translate-x-2' : ''
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Bottom decorative pattern */}
                  <div className="h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA or Info Section */}
        <div className="mt-16 md:mt-20">
          <div className="bg-gradient-to-r from-orange-100 via-yellow-100 to-orange-100 rounded-3xl p-8 md:p-10 text-center border-2 border-orange-200 shadow-lg">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                Every Contribution Matters
              </h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                Your support helps us continue our sacred mission of cow protection and welfare. Together, we can make a lasting impact.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold">
                <div className="flex items-center gap-2 text-orange-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  100% Transparent
                </div>
                <div className="flex items-center gap-2 text-orange-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Secure Donations
                </div>
                <div className="flex items-center gap-2 text-orange-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Tax Benefits
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}