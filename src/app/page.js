"use client";
import Footer from "@/components/Footer";
import Headers from "@/components/Header";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import MessageSection from "../components/MessageSection";
import InfoCards from "../components/InfoCards";
import HeroSection from "../components/HeroSection"; 
import FamilySection from "../components/FamilySection";
import Foundations from "../components/Foundations";
import AudioSection from "../components/AudioSection";
import EbookSection from "../components/EbookSection";
import DonateSection from "../components/DonateSection";
import NewsSection from "../components/NewsSection";


export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

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
