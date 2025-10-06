"use client";
import { useEffect, useState } from "react";
import { Sun, Sunset, Sparkles } from "lucide-react";

export default function MessageSection() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    setDate(today.toLocaleDateString("en-IN", options));
  }, []);

  return (
    <section id="director-message"className="relative py-24 overflow-hidden bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600">
        <div className="absolute bottom-0 left-0 right-0 rotate-180">
              <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#fffbeb" opacity="0.3"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#fffbeb" opacity="0.5"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#fffbeb" opacity="0.7"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#fffbeb"></path>
                </svg>
         </div>
      {/* Top Floating Cards */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-nowrap justify-center items-center gap-4 sm:gap-6 px-4 z-20 w-full max-w-4xl">
        
        {/* Sunrise Card */}
        <div className="flex-1 flex items-center gap-2 bg-white/70 backdrop-blur-md rounded-3xl shadow-lg px-4 py-3 border border-orange-200 hover:-translate-y-1 transition-transform duration-300 min-w-[90px] sm:min-w-[120px]">
          <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
          <div className="text-left">
            <p className="text-[10px] sm:text-xs font-semibold text-stone-700 uppercase">Sunrise</p>
            <p className="text-sm sm:text-base font-bold text-orange-700">6:18 AM</p>
          </div>
        </div>

        {/* Date Card */}
        <div className="flex-1 flex flex-col items-center bg-white/75 backdrop-blur-md rounded-3xl shadow-lg px-4 py-3 border border-yellow-300 hover:-translate-y-1 transition-transform duration-300 min-w-[90px] sm:min-w-[140px]">
       
          <p className="text-xs sm:text-sm font-bold text-stone-800">{date}</p>
          <p className="text-[10px] sm:text-[11px] text-orange-800 font-bold leading-tight text-center" style={{ fontFamily: "Noto Serif Devanagari, serif" }}>
            आश्विन शुक्ल पक्ष चतुर्थी
          </p>
        </div>

        {/* Sunset Card */}
        <div className="flex-1 flex items-center gap-2 bg-white/70 backdrop-blur-md rounded-3xl shadow-lg px-4 py-3 border border-red-200 hover:-translate-y-1 transition-transform duration-300 min-w-[90px] sm:min-w-[120px]">
          <Sunset className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
          <div className="text-left">
            <p className="text-[10px] sm:text-xs font-semibold text-stone-700 uppercase">Sunset</p>
            <p className="text-sm sm:text-base font-bold text-red-700">5:15 PM</p>
          </div>
        </div>
      </div>

      {/* Main Scroll Section */}
      <div className="relative w-full max-w-6xl mx-auto flex justify-center items-center z-10 mt-16">
        
        {/* Abstract Background */}
        <div className="absolute inset-0 flex justify-center items-center z-0 pointer-events-none">
          <img
            src="/images/abs.png"
            alt="Abstract Background"
            className="object-contain opacity-50 w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] h-auto"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>

        {/* Scroll Background */}
        <div className="relative z-10 w-full sm:w-[90%] md:w-[85%] lg:w-[75%] xl:w-[70%] rounded-2xl overflow-hidden">
          <img
            src="/images/scBg.png"
            alt="Ancient Scroll Background"
            className="w-full h-auto object-contain"
            onError={(e) =>
              (e.currentTarget.src =
                "https://upload.wikimedia.org/wikipedia/commons/d/d1/Parchment_background_02.jpg")
            }
          />

          {/* Scroll Text Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 sm:px-10 md:px-16 lg:px-20 py-10 md:py-14">
            
            {/* Title */}
            <div className="relative mb-6 md:mb-8">
              <div
                className="relative inline-block px-6 py-3 bg-cover bg-center rounded-lg shadow-xl border-2 border-amber-800"
                style={{
                  backgroundImage: "url('/images/ancient.jpg')",
                  backgroundBlendMode: "multiply",
                  backgroundColor: "rgba(120, 70, 40, 0.85)",
                }}
              >
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-amber-50 tracking-wider drop-shadow-lg"
                  style={{
                    fontFamily: "Noto Serif Devanagari, Georgia, serif",
                    textShadow: "3px 3px 6px rgba(0,0,0,0.6)",
                  }}
                >
                  प्रेरक संदेश
                </h2>
              </div>
              <div className="flex justify-center mt-3">
                <div className="w-28 md:w-40 h-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-full" />
              </div>
            </div>

            {/* Quote */}
            <blockquote
              className="text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl leading-relaxed font-semibold text-red-900 max-w-3xl mx-auto drop-shadow-md"
              style={{
                fontFamily: "Noto Serif Devanagari, Georgia, serif",
                textShadow: "1px 1px 2px rgba(0,0,0,0.25)",
                lineHeight: "1.8",
              }}
            >
              "गौ माता हमारी संस्कृति की आत्मा है,
              <br />
              और जो आत्मा की हत्या को समर्थन देता है,
              <br />
              वह हिन्दू नहीं हो सकता"
            </blockquote>

            {/* Writer */}
            <div className="w-full mt-8 flex flex-col items-end px-4">
              <div className="w-32 md:w-48 h-0.5 bg-gradient-to-l from-red-600 to-transparent rounded-full mb-2" />
              <div
                className="relative inline-block px-5 py-3 bg-cover bg-center rounded-md shadow-xl border-2 border-amber-700"
                style={{
                  backgroundImage: "url('/images/ancient.jpg')",
                  backgroundBlendMode: "multiply",
                  backgroundColor: "rgba(100, 60, 30, 0.8)",
                }}
              >
                <p
                  className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-amber-50 italic drop-shadow-md"
                  style={{
                    fontFamily: "Noto Serif Devanagari, Georgia, serif",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  ~ परम पूज्य ग्वाल संत श्री
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Border */}
      <div className="mt-12 flex justify-center">
        <div className="flex items-center gap-2">
          <div className="w-16 h-1 bg-gradient-to-r from-transparent to-orange-500 rounded-full" />
          <div className="w-3 h-3 bg-orange-500 rounded-full" />
          <div className="w-28 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-full" />
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-16 h-1 bg-gradient-to-l from-transparent to-red-500 rounded-full" />
        </div>
      </div>
       <div className="absolute top-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#fffbeb" opacity="0.3"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#fffbeb" opacity="0.5"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#fffbeb" opacity="0.7"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#fffbeb"></path>
          </svg>
            </div>
    </section>
  );
}
