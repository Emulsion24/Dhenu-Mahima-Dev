"use client";
import Footer from "@/components/Footer";
import Headers from "@/components/Header";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold text-lg">Checking authentication...</p>
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
    </main>
  );
}
