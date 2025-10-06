"use client";
import React, { useState } from 'react';
import Image from 'next/image';

// Enhanced Loading Skeleton
const LogoSkeleton = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400 rounded-full overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-1/2 h-1/2">
        <div className="absolute inset-0 border-4 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    </div>
    {/* Shimmer effect */}
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  </div>
);

// Foundation Logo Component
const FoundationLogo = ({ 
  foundation, 
  isHovered, 
  onHover, 
  onLeave, 
  onClick, 
  isCentral = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  return (
   
    <div
      className="relative cursor-pointer group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
     
    >
      {/* Animated outer glow */}
      <div 
        className={`
          absolute -inset-4 rounded-full blur-xl transition-all duration-700 ease-out
          ${isHovered 
            ? 'opacity-100 scale-110 bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300' 
            : 'opacity-0 scale-100 bg-white'
          }
        `}
      />
      
      {/* Rotating gradient ring on hover */}
      <div 
        className={`
          absolute -inset-2 rounded-full transition-all duration-700
          bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400
          ${isHovered ? 'opacity-100 animate-spin-slow' : 'opacity-0'}
        `}
      />
      
      {/* Main logo container */}
      <div 
        className={`
          relative w-full aspect-square rounded-full overflow-hidden
          shadow-2xl transition-all duration-500 ease-out
          border-4 ${isCentral ? 'sm:border-6 md:border-8' : 'sm:border-3 md:border-4'}
          ${isHovered ? 'border-yellow-300 shadow-[0_0_40px_rgba(251,191,36,0.6)]' : 'border-white'}
          bg-white
          ${isHovered ? 'scale-110 -translate-y-2' : 'scale-100 translate-y-0'}
        `}
      >
        {/* Loading skeleton */}
        {!isLoaded && !hasError && <LogoSkeleton />}
        
        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 p-4">
            <svg className="w-1/3 h-1/3 text-orange-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs text-orange-600 font-medium">Failed to load</span>
          </div>
        )}
        
        {/* Image container */}
        <div 
          className={`
            relative w-full h-full p-1 sm:p-2
            transition-all duration-700
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            ${isHovered ? 'rotate-6 scale-105' : 'rotate-0 scale-100'}
          `}
        >
          <Image
            src={foundation.logo}
            alt={foundation.name}
            fill
            sizes={isCentral ? "(max-width: 768px) 35vw, 20vw" : "(max-width: 768px) 18vw, 10vw"}
            className="object-contain"
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              setHasError(true);
              setIsLoaded(true);
            }}
            priority={isCentral}
            quality={90}
          />
        </div>

        {/* Gradient overlay on hover */}
        <div 
          className={`
            absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-transparent
            transition-opacity duration-500
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
        />

        {/* Inner shine effect */}
        <div 
          className={`
            absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent
            -translate-x-full transition-transform duration-1000
            ${isHovered ? 'translate-x-full' : '-translate-x-full'}
          `}
        />
      </div>

      {/* Tooltip on hover */}
      {isHovered && (
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap z-50 animate-fade-in-up">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-full blur-md opacity-100" />
            <div className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2.5 rounded-full shadow-2xl text-xs sm:text-sm font-bold border border-white/20">
              {foundation.nameHi}
              {/* Tooltip arrow */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-orange-500 rotate-45" />
            </div>
          </div>
        </div>
      )}

      {/* Sparkle effects */}
      {isHovered && (
        <>
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50 animate-ping" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full" />
          <div className="absolute -bottom-2 -left-2 w-2.5 h-2.5 bg-orange-400 rounded-full shadow-lg shadow-orange-400/50 animate-pulse" />
        </>
      )}

      {/* Click ripple effect */}
      {isHovered && (
        <div className="absolute inset-0 rounded-full border-2 border-yellow-300 animate-ping opacity-50" />
      )}
    </div>
   
  );
};

export default function Foundations() {
  const [hoveredId, setHoveredId] = useState(null);
  
  const foundations = [
    { id: 1, logo: "/logo/logo1.png", name: "Foundation Name 1", nameHi: "संस्थान १", url: "/foundation-1" },
    { id: 2, logo: "/logo/logo2.png", name: "Foundation Name 2", nameHi: "संस्थान २", url: "/foundation-2" },
    { id: 3, logo: "/logo/logo3.png", name: "Foundation Name 3", nameHi: "संस्थान ३", url: "/foundation-3" },
    { id: 4, logo: "/logo/logo4.png", name: "Foundation Name 4", nameHi: "संस्थान ४", url: "/foundation-4" },
    { id: 5, logo: "/logo/logo5.png", name: "Foundation Name 5", nameHi: "संस्थान ५", url: "/foundation-5" },
    { id: 6, logo: "/logo/logo6.png", name: "Foundation Name 6", nameHi: "संस्थान ६", url: "/foundation-6" },
    { id: 7, logo: "/logo/logo7.png", name: "Foundation Name 7", nameHi: "संस्थान ७", url: "/foundation-7" },
    { id: 8, logo: "/logo/logo8.png", name: "Foundation Name 8", nameHi: "संस्थान ८", url: "/foundation-8" },
    { id: 9, logo: "/logo/logo9.png", name: "Foundation Name 9", nameHi: "संस्थान ९", url: "/foundation-9" },
    { id: 10, logo: "/logo/logo10.png", name: "Foundation Name 10", nameHi: "संस्थान १०", url: "/foundation-10" },
    { id: 11, logo: "/logo/logo11.png", name: "Foundation Name 11", nameHi: "संस्थान ११", url: "/foundation-11" },
    { id: 12, logo: "/logo/logo12.png", name: "Foundation Name 12", nameHi: "संस्थान १२", url: "/foundation-12" },
  ];

  const centralFoundation = foundations[0];
  const surroundingFoundations = foundations.slice(1);

  const handleFoundationClick = (url) => {
    window.location.href = url;
  };

  const getCircularPosition = (index, total) => {
    const angle = (index * 360) / total - 90;
    const radius = 35;
    const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
    const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
    return { x, y };
  };

  return (
    <section id="foundation" className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Animated Background */}
          
      <div className="absolute inset-0 -z-10">
        {/* Animated blobs */}
        <div className="absolute inset-0 opacity-100">
          <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Dot pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Modern Section Title - News Style */}
        <div className="text-center mb-12 md:mb-16">
          {/* Live indicator badge */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-50 to-red-50 px-5 py-2.5 rounded-full mb-6 border border-orange-200/50 shadow-sm">
            <div className="relative flex items-center">
              <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse"></div>
              <div className="absolute w-2.5 h-2.5 bg-orange-500 rounded-full animate-ping"></div>
            </div>
            <span className="text-sm font-bold text-orange-700 uppercase tracking-wider">Our Network</span>
          </div>

          {/* Main title */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
            <span className="inline-block bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent">
              हमारे सेवा प्रकल्प
            </span>
          </h2>

          <p className="text-gray-600 text-base sm:text-lg font-medium max-w-2xl mx-auto">
            Discover our network of service foundations dedicated to Gau Seva
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-orange-400"></div>
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-orange-400"></div>
          </div>
        </div>

        {/* Circular Layout Container */}
        <div className="relative w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto aspect-square">
          <div className="absolute inset-0">
            
            {/* Enhanced gradient circles background */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Outermost rotating ring */}
              <div className="absolute w-[90%] h-[90%] rounded-full border-4 border-white/20 border-dashed animate-spin-very-slow" />
              
              {/* Outer glow circle */}
              <div className="absolute w-[88%] h-[88%] rounded-full bg-gradient-to-br from-orange-400 via-red-400 to-orange-500 opacity-100 blur-md" />
              
              {/* Middle ring */}
              <div className="absolute w-[75%] h-[75%] rounded-full border-2 border-white/30 animate-pulse" />
              
              {/* Middle circle */}
              <div className="absolute w-[70%] h-[70%] rounded-full bg-gradient-to-br from-red-300 via-orange-300 to-yellow-300 opacity-100 shadow-inner" />
              
              {/* Inner ring (reverse rotation) */}
              <div className="absolute w-[60%] h-[60%] rounded-full border-2 border-white/40 border-dotted animate-spin-reverse-slow" />
              
              {/* Inner circle */}
              <div className="absolute w-[55%] h-[55%] rounded-full bg-gradient-to-br from-orange-200 via-yellow-200 to-red-200 opacity-100" />
              
              {/* Center highlight */}
              <div className="absolute w-[40%] h-[40%] rounded-full bg-gradient-to-br from-white/60 to-transparent" />
              
              {/* Central glow */}
              <div className="absolute w-[35%] h-[35%] rounded-full bg-white/30 blur-xl animate-pulse" />
            </div>
            
            {/* Central Foundation Logo */}
            <div
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '32%',
                zIndex: 30
              }} 
            >
              <FoundationLogo
                foundation={centralFoundation}
                isHovered={hoveredId === centralFoundation.id}
                onHover={() => setHoveredId(centralFoundation.id)}
                onLeave={() => setHoveredId(null)}
                onClick={() => handleFoundationClick(centralFoundation.url)}
                isCentral={true}
              />
            </div>

            {/* Surrounding Foundations */}
            {surroundingFoundations.map((foundation, index) => {
              const position = getCircularPosition(index, surroundingFoundations.length);
              const isActive = hoveredId === foundation.id;
              
              return (
                <React.Fragment key={foundation.id}>
                  {/* Animated connecting line */}
                  <div
                    className="absolute h-0.5 origin-left transition-all duration-500"
                    style={{
                      left: '50%',
                      top: '50%',
                      width: `${Math.sqrt(Math.pow(position.x - 50, 2) + Math.pow(position.y - 50, 2))}%`,
                      transform: `rotate(${Math.atan2(position.y - 50, position.x - 50) * 180 / Math.PI}deg)`,
                      background: isActive 
                        ? 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(251,191,36,1) 100%)'
                        : 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 100%)',
                      zIndex: 1,
                    }}
                  />
                  {/* Connecting dot */}
                  <div
                    className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full shadow-lg transition-all duration-500"
                    style={{
                      left: `${position.x}%`,
                      top: `${position.y}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 5,
                      backgroundColor: isActive ? '#FCD34D' : '#FFFFFF',
                      boxShadow: isActive ? '0 0 20px rgba(252,211,77,0.6)' : '0 2px 8px rgba(0,0,0,0.2)',
                    }}
                  />
                  
                  {/* Logo */}
                  <div
                    className="absolute"
                    style={{
                      left: `${position.x}%`,
                      top: `${position.y}%`,
                      transform: 'translate(-50%, -50%)',
                      width: '16%',
                      zIndex: isActive ? 25 : 10,
                      transition: 'z-index 0.3s'
                    }}
                  >
                    <FoundationLogo
                      foundation={foundation}
                      isHovered={isActive}
                      onHover={() => setHoveredId(foundation.id)}
                      onLeave={() => setHoveredId(null)}
                      onClick={() => handleFoundationClick(foundation.url)}
                    />
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Bottom decorative section */}
        <div className="text-center mt-12 sm:mt-16 md:mt-20">
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-transparent via-white to-white/50 rounded-full" />
            <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-lg shadow-white/50" />
            <div className="w-20 sm:w-32 h-1 bg-gradient-to-l from-transparent via-white to-white/50 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}