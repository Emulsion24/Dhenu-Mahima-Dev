'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const socialLinks = [
    { 
      name: "Facebook", 
      icon: "/icons/facebook.png", 
      href: "https://www.facebook.com/gopal.pariwar.12/", 
    },
    { 
      name: "Instagram", 
      icon: "/icons/instagram.png", 
      href: "https://www.instagram.com/gopalpariwar/", 
    },
    { 
      name: "YouTube", 
      icon: "/icons/youtube.png", 
      href: "https://www.youtube.com/@DhenuTV", 
    },
    { 
      name: "WhatsApp", 
      icon: "/icons/social.png", 
      href: "https://wa.me/+919414174880", 
    },
  ];

  const SocialLink = ({ href, icon, name }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-transform duration-300 hover:scale-110"
      aria-label={name}
    >
      <Image
        src={icon}
        alt={`${name} icon`}
        width={40}
        height={40}
        className="rounded-lg"
      />
    </a>
  );

  return (
    <footer className="bg-gradient-to-br from-[#472F1A] via-[#6E4B2A] to-[#A06D3A] text-white py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Logo & Title */}
        <div className="flex flex-col sm:flex-row items-center justify-center pb-8 border-b border-white/20 mb-8">
          <Image
            src="/logo/logo5.webp"
            alt="Shri Gopal Pariwar Sangh Logo"
            width={110}
            height={110}
            className="rounded-full shadow-lg"
          />
          <div className="text-center sm:text-left sm:ml-4 mt-4 sm:mt-0">
            <h3 className="text-3xl font-bold text-yellow-300">श्री गोपाल परिवार संघ</h3>
            <p className="text-base sm:text-lg md:text-3xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              धेनु महिमा
            </p>
          </div>
        </div>

        {/* Middle */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 text-center lg:text-left">
          {/* Left */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start space-y-8">
            <div className="flex flex-col space-y-3 font-semibold text-white/90">
              <Link
                href="/privacy-policy"
                className="text-2xl sm:text-3xl tracking-wider hover:text-orange-400 transition"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-condition"
                className="text-2xl sm:text-3xl tracking-wider hover:text-orange-400 transition"
              >
                Terms & Conditions
              </Link>
            </div>

            <div className="flex space-x-6">
              {socialLinks.map((link, i) => (
                <SocialLink key={i} {...link} />
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-5 pt-8 lg:pt-0 items-center lg:items-end">
            <Link 
              href="tel:+919414174880"
              className="flex items-center space-x-3 text-xl font-medium hover:text-orange-400 transition"
            >
              <Phone className="text-orange-400" size={22} />
              <span>9414174880</span>
            </Link>

            <Link 
              href="mailto:shreegopalparivarsang@gmail.com"
              className="flex items-center space-x-3 text-xl font-medium hover:text-orange-400 transition"
            >
              <Mail className="text-orange-400" size={22} />
              <span className="truncate">shreegopalparivarsang@gmail.com</span>
            </Link>

            <Link 
              href="https://maps.google.com/?q=Sheetal+Ashram,+Ajmer+Road,+Pushkar,+Rajasthan+305022"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-xl font-medium text-right lg:text-left hover:text-orange-400 transition"
            >
              <MapPin className="text-orange-400 flex-shrink-0" size={22} />
              <p className="flex-1">Sheetal Ashram, Ajmer Road, Pushkar, Rajasthan - 305022</p>
            </Link>
          </div>
        </div>

        <hr className="mt-12 mb-6 border-white/20" />

        <p className="text-sm font-semibold text-gray-300 text-center">
          COPYRIGHT © {currentYear || ''} DHENU MAHIMA - ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  );
}