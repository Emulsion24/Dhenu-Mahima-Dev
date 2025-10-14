"use client";

import React, { useState } from "react";
import Image from "next/image";

// Loading skeleton for logos
const LogoSkeleton = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400 rounded-full overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-1/2 h-1/2">
        <div className="absolute inset-0 border-4 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    </div>
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  </div>
);

export default function FoundationLogo({
  foundation,
  isHovered,
  onHover,
  onLeave,
  onClick,
  isCentral = false,
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className="relative cursor-pointer group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {/* Outer glow */}
      <div
        className={`absolute -inset-4 rounded-full blur-xl transition-all duration-700 ease-out ${
          isHovered
            ? "opacity-100 scale-110 bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300"
            : "opacity-0 scale-100 bg-white"
        }`}
      />

      {/* Rotating ring */}
      <div
        className={`absolute -inset-2 rounded-full transition-all duration-700 bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 ${
          isHovered ? "opacity-100 animate-spin-slow" : "opacity-0"
        }`}
      />

      {/* Main logo */}
      <div
        className={`relative w-full aspect-square rounded-full overflow-hidden shadow-2xl transition-all duration-500 ease-out border-4 ${
          isCentral ? "sm:border-6 md:border-8" : "sm:border-3 md:border-4"
        } ${
          isHovered
            ? "border-yellow-300 shadow-[0_0_40px_rgba(251,191,36,0.6)] scale-110 -translate-y-2"
            : "border-white scale-100 translate-y-0"
        } bg-white`}
      >
        {!isLoaded && !hasError && <LogoSkeleton />}

        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 p-4">
            <span className="text-xs text-orange-600 font-medium">
              Failed to load
            </span>
          </div>
        )}

        <div
          className={`relative w-full h-full p-1 sm:p-2 transition-all duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${isHovered ? "rotate-6 scale-105" : "rotate-0 scale-100"}`}
        >
          <Image
            src={foundation.logoUrl}
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
          className={`absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-transparent transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Inner shine effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full transition-transform duration-1000 ${
            isHovered ? "translate-x-full" : "-translate-x-full"
          }`}
        />
      </div>

      {/* Tooltip */}
      {isHovered && foundation.name && (
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap z-50 animate-fade-in-up">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-full blur-md opacity-100" />
            <div className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2.5 rounded-full shadow-2xl text-xs sm:text-sm font-bold border border-white/20">
              {foundation.nameHi}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-orange-500 rotate-45" />
            </div>
          </div>
        </div>
      )}

      {/* Sparkle */}
      {isHovered && (
        <>
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50 animate-ping" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full" />
          <div className="absolute -bottom-2 -left-2 w-2.5 h-2.5 bg-orange-400 rounded-full shadow-lg shadow-orange-400/50 animate-pulse" />
        </>
      )}

      {/* Click ripple */}
      {isHovered && <div className="absolute inset-0 rounded-full border-2 border-yellow-300 animate-ping opacity-50" />}
    </div>
  );
}
