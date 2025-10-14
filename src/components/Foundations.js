"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import FoundationLogo from "./foundationlofo"; // Keep your FoundationLogo component separate

export default function Foundations() {
  const [hoveredId, setHoveredId] = useState(null);
  const [foundations, setFoundations] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchFoundations() {
      try {
        const response = await axios.get("http://localhost:5000/api/foundations");
        setFoundations(response.data.foundations);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch foundations:", error);
        setLoading(false);
      }
    }
    fetchFoundations();
  }, []);

  const handleFoundationClick = (id) => {
  router.push(`/foundation/${id}`);
};


  const getCircularPosition = (index, total) => {
    const angle = (index * 360) / total - 90; // Start from top
    const radius = 35; // Percentage
    const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
    const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
    return { x, y };
  };

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading Foundations...</div>;
  }

  if (!foundations.length) {
    return <div className="text-center py-20 text-xl">No Foundations Found</div>;
  }

  const centralFoundation = foundations[0];
  const surroundingFoundations = foundations.slice(1);

  return (
    <section
      id="foundation"
      className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent">
              हमारे सेवा प्रकल्प
            </span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg font-medium max-w-2xl mx-auto">
            Discover our network of service foundations dedicated to Gau Seva
          </p>
        </div>

        {/* Circular Layout */}
        <div className="relative w-full max-w-5xl mx-auto aspect-square">
          {/* Central Foundation */}
          <div
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "32%",
              zIndex: 30,
            }}
          >
            <FoundationLogo
              foundation={centralFoundation}
              isHovered={hoveredId === centralFoundation.id}
              onHover={() => setHoveredId(centralFoundation.id)}
              onLeave={() => setHoveredId(null)}
              onClick={() => handleFoundationClick(centralFoundation.id)}
              isCentral={true}
            />
          </div>

          {/* Surrounding Foundations */}
          {surroundingFoundations.map((foundation, index) => {
            const position = getCircularPosition(index, surroundingFoundations.length);
            const isActive = hoveredId === foundation.id;

            return (
              <React.Fragment key={foundation.id}>
                {/* Connecting line */}
                <div
                  className="absolute h-0.5 origin-left transition-all duration-500"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: `${Math.sqrt(
                      Math.pow(position.x - 50, 2) + Math.pow(position.y - 50, 2)
                    )}%`,
                    transform: `rotate(${
                      (Math.atan2(position.y - 50, position.x - 50) * 180) / Math.PI
                    }deg)`,
                    background: isActive
                      ? "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(251,191,36,1) 100%)"
                      : "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 100%)",
                    zIndex: 1,
                  }}
                />
                {/* Logo */}
                <div
                  className="absolute"
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    transform: "translate(-50%, -50%)",
                    width: "16%",
                    zIndex: isActive ? 25 : 10,
                  }}
                >
                  <FoundationLogo
                    foundation={foundation}
                    isHovered={isActive}
                    onHover={() => setHoveredId(foundation.id)}
                    onLeave={() => setHoveredId(null)}
                    onClick={() => handleFoundationClick(foundation.id)}
                  />
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
