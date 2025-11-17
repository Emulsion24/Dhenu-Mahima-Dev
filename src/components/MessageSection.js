"use client";
import { useEffect, useState } from "react";
import { Sun, Sunset } from "lucide-react";
import { useLandingStore } from "@/store/landingStore";
import Image from "next/image";

export default function MessageSection() {
  const [date, setDate] = useState("");
  const [quote, setQuote] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sunData, setSunData] = useState({ sunrise: "6:18 AM", sunset: "5:15 PM" });
  const [tithi, setTithi] = useState("");
  const [loadingSunData, setLoadingSunData] = useState(true);

  const { getMessage } = useLandingStore();

  // Fetch sunrise/sunset data
  useEffect(() => {
    const fetchSunData = async () => {
      try {
        setLoadingSunData(true);
        // Using New Delhi coordinates
        const lat = 28.6139;
        const lng = 77.2090;
        
        // Fetch from sunrise-sunset.org API (free, no API key needed)
        const response = await fetch(
          `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`
        );
        const data = await response.json();
        
        if (data.status === "OK") {
          // Convert UTC to IST and format
          const sunriseUTC = new Date(data.results.sunrise);
          const sunsetUTC = new Date(data.results.sunset);
          
          const formatTime = (date) => {
            return date.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
              timeZone: "Asia/Kolkata"
            });
          };
          
          setSunData({
            sunrise: formatTime(sunriseUTC),
            sunset: formatTime(sunsetUTC)
          });
        }
      } catch (err) {
        console.error("Error fetching sun data:", err);
        // Keep default values if API fails
      } finally {
        setLoadingSunData(false);
      }
    };

    fetchSunData();
  }, []);

  // Fetch Hindi Tithi
  useEffect(() => {
    const fetchTithi = async () => {
      try {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        
        // Using Indian Astrology API (free tier available)
        // Alternative: You can also use https://api.vedicrishiastro.com/
        const response = await fetch(
          `https://json.astrologyapi.com/v1/panchang/tithi`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Note: You'll need to sign up for a free API key at https://astrologyapi.com
              // For demo purposes, keeping the default tithi
            },
            body: JSON.stringify({
              day: day,
              month: month,
              year: year,
              hour: 12,
              min: 0,
              lat: 28.6139,
              lon: 77.2090,
              tzone: 5.5
            })
          }
        );
        
        // If API call fails or you don't have API key, it will keep default tithi
        if (response.ok) {
          const data = await response.json();
          if (data.tithi_name) {
            setTithi(data.tithi_name);
          }
        }
      } catch (err) {
        console.error("Error fetching tithi:", err);
        // Keep default tithi value
      }
    };

    // Uncomment when you have API key
    // fetchTithi();
  }, []);

  useEffect(() => {
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    setDate(today.toLocaleDateString("en-IN", options));
  }, []);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await getMessage();
        
        if (!res.info || Object.keys(res).length === 0) {
          setError("No message found in database");
          setQuote("कोई संदेश उपलब्ध नहीं है। कृपया व्यवस्थापक पैनल से संदेश जोड़ें।");
          return;
        }
        
        if (res.info && typeof res.info === 'string') {
          setQuote(res.info);
        } else {
          console.error("Unexpected response format:", res);
          setError("Invalid message format");
          setQuote("संदेश प्रारूप अमान्य है");
        }
      } catch (err) {
        console.error("Error fetching quote:", err);
        setError(err.message);
        setQuote("संदेश लोड करने में त्रुटि");
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuote();
  }, [getMessage]);

  const splitSentences = (text) => {
    if (!text || typeof text !== 'string') return [];
    return text
      .split(/(?<=[.,])/g)
      .map(line => line.trim())
      .filter(line => line);
  };

  const handleDateClick = () => {

    window.location.href = "/";

  };

  return (
    <section id="director-message" className="relative py-16 sm:py-24 overflow-hidden bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600">
      <div className="absolute bottom-0 left-0 right-0 rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#fffbeb" opacity="0.3"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#fffbeb" opacity="0.5"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#fffbeb" opacity="0.7"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#fffbeb"></path>
        </svg>
      </div>

      {/* Top Floating Cards */}
      <div className="absolute top-6 sm:top-10 left-1/2 transform -translate-x-1/2 flex flex-wrap md:flex-nowrap justify-center items-center gap-3 sm:gap-6 px-4 z-20 w-full max-w-4xl">
        
        {/* Sunrise Card */}
        <div className="flex-1 flex items-center gap-2 bg-white/70 backdrop-blur-md rounded-3xl shadow-lg px-3 sm:px-4 py-2 sm:py-3 border border-orange-200 hover:-translate-y-1 transition-transform duration-300 min-w-[72px] sm:min-w-[90px] md:min-w-[120px]">
          <Sun className="w-4 h-4 sm:w-6 sm:h-6 text-orange-500" />
          <div className="text-left">
            <p className="text-[9px] sm:text-xs font-semibold text-stone-700 uppercase">Sunrise</p>
            <p className="text-sm sm:text-base font-bold text-orange-700">
              {loadingSunData ? "..." : sunData.sunrise}
            </p>
          </div>
        </div>

        {/* Date Card - Now Clickable */}
        <div 
          onClick={handleDateClick}
          className="flex-1 flex flex-col items-center bg-white/75 backdrop-blur-md rounded-3xl shadow-lg px-3 sm:px-4 py-2 sm:py-3 border border-yellow-300 hover:-translate-y-1 hover:shadow-xl hover:border-yellow-400 transition-all duration-300 min-w-[90px] sm:min-w-[140px] cursor-pointer active:scale-95"
        >
          <p className="text-[12px] sm:text-sm font-bold text-stone-800 truncate">{date}</p>
          <p className="text-[10px] sm:text-[11px] text-orange-800 font-bold leading-tight text-center break-words" style={{ fontFamily: "Noto Serif Devanagari, serif" }}>
            {tithi}
          </p>
          
        
        </div>

        {/* Sunset Card */}
        <div className="flex-1 flex items-center gap-2 bg-white/70 backdrop-blur-md rounded-3xl shadow-lg px-3 sm:px-4 py-2 sm:py-3 border border-red-200 hover:-translate-y-1 transition-transform duration-300 min-w-[72px] sm:min-w-[90px] md:min-w-[120px]">
          <Sunset className="w-4 h-4 sm:w-6 sm:h-6 text-red-500" />
          <div className="text-left">
            <p className="text-[9px] sm:text-xs font-semibold text-stone-700 uppercase">Sunset</p>
            <p className="text-sm sm:text-base font-bold text-red-700">
              {loadingSunData ? "..." : sunData.sunset}
            </p>
          </div>
        </div>
      </div>

      {/* Main Scroll Section */}
      <div className="relative w-full max-w-6xl mx-auto flex justify-center items-center z-10 mt-20 sm:mt-16 px-4">
        
        {/* Abstract Background */}
        <div className="absolute inset-0 flex justify-center items-center z-0 pointer-events-none">
          <Image
            src="/images/abs.png"
            alt="Abstract Background"
            width={1200}
            height={800}
            className="object-contain opacity-50 w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] h-auto"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        </div>

        {/* Scroll Background */}
        <div className="relative z-10 w-full sm:w-[92%] md:w-[85%] lg:w-[75%] xl:w-[70%] rounded-2xl overflow-hidden px-2 sm:px-0">
          <Image
            src="/images/scBg.png"
            alt="Ancient Scroll Background"
            className="w-full h-auto object-contain"
            width={1200}
            height={800}
            onError={(e) =>
              (e.currentTarget.src =
                "https://upload.wikimedia.org/wikipedia/commons/d/d1/Parchment_background_02.jpg")
            }
          />

          {/* Scroll Text Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-10 md:px-16 lg:px-20 py-8 md:py-14">
            
            {/* Title */}
            <div className="relative mb-6 md:mb-8 w-full">
              <div
                className="mx-auto inline-block px-4 sm:px-6 py-2 sm:py-3 bg-cover bg-center rounded-lg shadow-xl border-2 border-amber-800 max-w-full"
                style={{
                  backgroundImage: "url('/images/ancient.jpg')",
                  backgroundBlendMode: "multiply",
                  backgroundColor: "rgba(120, 70, 40, 0.85)",
                }}
              >
                <h2
                  className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-amber-50 tracking-wider drop-shadow-lg"
                  style={{
                    fontFamily: "Noto Serif Devanagari, Georgia, serif",
                    textShadow: "3px 3px 6px rgba(0,0,0,0.6)",
                  }}
                >
                  प्रेरक संदेश
                </h2>
              </div>
              <div className="flex justify-center mt-3">
                <div className="w-20 md:w-40 h-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-full" />
              </div>
            </div>

            {/* Quote */}
            <blockquote
              className="text-sm sm:text-base md:text-2xl lg:text-3xl xl:text-4xl leading-relaxed font-semibold text-red-900 max-w-3xl mx-auto drop-shadow-md break-words"
              style={{
                fontFamily: "Noto Serif Devanagari, Georgia, serif",
                textShadow: "1px 1px 2px rgba(0,0,0,0.25)",
                lineHeight: "1.15",
                whiteSpace: "pre-wrap"
              }}
            >
              {isLoading ? (
                <span className="text-base animate-pulse">लोड हो रहा है...</span>
              ) : error ? (
                <div className="text-sm sm:text-base">
                  <p className="text-amber-800 mb-2">⚠️ {error}</p>
                  <p className="text-xs sm:text-sm">{quote}</p>
                </div>
              ) : quote ? (
                splitSentences(quote).map((line, idx) => (
                  <span key={idx}>
                    {line}
                    <br />
                  </span>
                ))
              ) : (
                <span className="text-base">संदेश उपलब्ध नहीं है</span>
              )}
            </blockquote>

            {/* Writer */}
            <div className="w-full mt-6 sm:mt-8 flex flex-col items-end px-2 sm:px-4">
              <div className="w-28 sm:w-32 md:w-48 h-0.5 bg-gradient-to-l from-red-600 to-transparent rounded-full mb-2" />
              <div
                className="relative inline-block px-4 sm:px-5 py-2 bg-cover bg-center rounded-md shadow-xl border-2 border-amber-700"
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
                  ~ ग्वाल संत 
                </p>
              </div>
            </div>
          </div>
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