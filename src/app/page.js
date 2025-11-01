"use client";
import Footer from "@/components/Footer";
import Headers from "@/components/Header";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import MessageSection from "../components/MessageSection";
import InfoCards from "../components/InfoCards";
import HeroSection from "../components/HeroSection"; 
import FamilySection from "../components/FamilySection";
import Foundations from "../components/Foundations";
import AudioSection from "../components/AudioSection";
import EbookSection from "../components/EbookSection";
import DonateSection from "../components/DonateSection";
import NewsSection from "../components/NewsSection";
import { useAuthStore } from "@/store/authStore";
import ScrollToTopButton from "@/components/ScroollTop";
import { useLandingStore } from "@/store/landingStore";

export default function LandingPage() {
  const router = useRouter();
  const { user, setUser, fetchUser } = useAuthStore();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const { loadLandingData, loading } = useLandingStore();

  useEffect(() => {
    loadLandingData();
  }, [loadLandingData]);
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // If we already have user, no need to fetch
        if (!user) {
          const userData = await fetchUser();
          if (userData && userData.role) {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        // ✅ Make sure to always stop the loader
        setCheckingAuth(false);
      }
    };

    checkAuthStatus();
  }, [user, fetchUser, setUser]);

  // Loader while checking auth
  if (checkingAuth&& loading) {
 
    return (

    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-400 animate-gradient-move overflow-hidden">
      {/* Soft glowing backdrop */}
      <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />

      {/* Loader container */}
      <div className="relative flex flex-col items-center justify-center z-10">
        <div className="relative flex items-center justify-center">
          {/* Spinning gradient ring behind logo */}
          <div className="absolute w-56 h-56 rounded-full border-8 border-t-transparent border-white/70 border-l-orange-300 border-r-yellow-300 animate-spin-slow"></div>

          {/* Static logo image */}
          <img
            src="/logo/logo5.webp" // replace with your actual logo path
            alt="Dhenu Mahima Logo"
            className="w-40 h-40 rounded-full relative z-10 drop-shadow-2xl"
          />
        </div>

        {/* Text */}
        <h1 className="text-white text-4xl font-bold mt-8 drop-shadow-lg tracking-wide animate-pulse">
          Dhenu Mahima
        </h1>
      </div>
    </div>
  );
}


  // Main page render
  return (
    <main className="bg-gradient-to-b from-orange-400 via-orange-400 to-yellow-400 min-h-screen">
      <Headers />
      <HeroSection />
      <MessageSection />
      <InfoCards />
      <FamilySection />
      <Foundations />
      <AudioSection />
      <EbookSection />
      <DonateSection />
      <NewsSection />
      <Footer />
     <ScrollToTopButton/>
    </main>
  );
}
