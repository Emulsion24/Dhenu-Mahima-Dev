'use client'
import React, { useState } from 'react';
import Image from 'next/image';
export default function EbookSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const books = [
    { title: "गो कपा चिकित्सा ज्योति", img: "/books/1.JPG" },
    { title: "गो कपा चिकित्सा ज्योति", img: "/books/2.JPG" },
    { title: "गो कपा चिकित्सा ज्योति", img: "/books/3.JPG" },
    { title: "गो कपा चिकित्सा ज्योति", img: "/books/4.JPG" },
    { title: "गो कपा चिकित्सा ज्योति", img: "/books/5.JPG" },
    { title: "गो कपा चिकित्सा ज्योति", img: "/books/6.JPG" },
    { title: "गो कपा चिकित्सा ज्योति", img: "/books/7.JPG" },
    { title: "गो कपा चिकित्सा ज्योति", img: "/books/2.JPG" },
  ];

  return (
    <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-yellow-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Ultra Modern Title Section */}
        <div className="text-center mb-16 md:mb-20">
          {/* Small badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-yellow-100 px-4 py-2 rounded-full mb-6 border border-orange-200">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-orange-700 uppercase tracking-wider">Digital Library</span>
          </div>

          {/* Main Title with modern styling */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight">
            <span className="inline-block bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
              Our PDF
            </span>
            <br />
            <span className="inline-block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              E-Books
            </span>
          </h2>
          
          {/* Subtitle with better spacing */}
          <p className="text-gray-600 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Discover ancient wisdom through our curated collection of digital books
          </p>
          
          {/* Modern decorative element */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-orange-400"></div>
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-orange-400"></div>
          </div>
        </div>

        {/* Books Grid with staggered animation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 lg:gap-10">
          {books.map((book, i) => (
            <div
              key={i}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`
              }}
            >
              <style jsx>{`
                @keyframes fadeInUp {
                  from {
                    opacity: 0;
                    transform: translateY(30px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `}</style>

              {/* Book Card with modern design */}
              <div className="relative h-full">
                {/* Dynamic glow that follows hover */}
                <div 
                  className={`absolute -inset-2 bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 rounded-3xl blur-xl transition-all duration-700 ${
                    hoveredIndex === i ? 'opacity-60 scale-105' : 'opacity-0 scale-95'
                  }`}
                ></div>
                
                {/* Main card */}
                <div className={`relative bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100 rounded-3xl shadow-xl overflow-hidden transition-all duration-700 ${
                  hoveredIndex === i ? 'scale-105 shadow-2xl' : 'scale-100'
                }`}>
                  {/* Book cover with 3D effect */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    {/* Loading gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-yellow-100 to-orange-100"></div>
                    
                    {/* Book image */}
                  <div className="relative w-full h-full overflow-hidden">
  <Image
    src={book.img}
    alt={book.title}
    fill
    className={`object-cover transition-all duration-700 ${
      hoveredIndex === i ? "scale-110 brightness-90" : "scale-100"
    }`}
    priority={i < 4}       // replaces loading="eager"
    loading={i < 4 ? "eager" : "lazy"} // optional fallback
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    unoptimized             // keep this if images are from dynamic URLs
  />
</div>
                    
                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40"></div>
                    <div className={`absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 transition-opacity duration-700 ${
                      hoveredIndex === i ? 'opacity-100' : 'opacity-0'
                    }`}></div>
                    
                    {/* Modern PDF badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-gradient-to-br from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border border-white/20 flex items-center gap-1.5">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        </svg>
                        PDF
                      </div>
                    </div>

                    {/* Interactive download button on hover */}
                    <div className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-500 ${
                      hoveredIndex === i ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                    }`}>
                      <button className="w-full bg-white/95 backdrop-blur-md text-orange-600 font-bold py-3 rounded-xl shadow-lg hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                        <svg className="w-5 h-5 group-hover/btn:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm">View PDF</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Book title section with colorful gradient */}
                  <div className="p-4 sm:p-5 bg-gradient-to-br from-orange-600 to-red-700">
                    <h3 className={`text-sm sm:text-base md:text-lg font-bold text-center leading-snug transition-all duration-300 ${
                      hoveredIndex === i ? 'text-white' : 'text-white'
                    }`}>
                      {book.title}
                    </h3>
                    
                    {/* Mini stats/info */}
                    <div className="flex items-center justify-center gap-3 mt-3 text-xs text-white">
                      
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        PDF
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modern CTA Section */}
        <div className="flex flex-col items-center gap-6 mt-16 md:mt-20">
          {/* Show All Button with modern design */}
          <button onClick={() => window.location.href = "/pdf-books"}className="group relative overflow-hidden bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white font-bold px-10 sm:px-12 py-4 sm:py-5 rounded-2xl shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-500">
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            {/* Button content */}
            <span className="relative flex items-center gap-3 text-base sm:text-lg">
              <span>Explore All Books</span>
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>

          {/* Stats or info */}
          <div className="flex items-center gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {books.length}+
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Books Available</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            
            <div className="w-px h-12 bg-gray-200"></div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                24/7
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Access</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}