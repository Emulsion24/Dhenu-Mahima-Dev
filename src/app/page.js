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

export default function LandingPage() {
  const router = useRouter();
  const { user, setUser, fetchUser } = useAuthStore();
  const [checkingAuth, setCheckingAuth] = useState(true);

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
  if (checkingAuth) {
    return (
     <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-400 animate-gradient-move">
      {/* Glowing ring background */}
      <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />

      {/* Main loader */}
      <div className="relative flex flex-col items-center justify-center z-10">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 blur-md opacity-75 animate-ping"></div>
          <Loader2 className="w-16 h-16 text-white animate-spin relative z-10 drop-shadow-lg" />
        </div>

        <h1 className="text-white text-2xl font-bold mt-6 drop-shadow-lg tracking-wide animate-pulse">
          Preparing Your Experience...
        </h1>
        <p className="text-white/90 mt-2 text-sm font-medium">
          Please wait a moment ✨
        </p>
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
