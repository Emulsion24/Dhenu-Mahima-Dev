'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Facebook,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const socialLinks = [
    { name: "Facebook", icon: <Facebook size={22} />, href: "#", color: "bg-[#1877F2]" },
    { name: "Instagram", icon: <Instagram size={22} />, href: "#", color: "bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500" },
    { name: "YouTube", icon: <Youtube size={22} />, href: "#", color: "bg-[#FF0000]" },
    { name: "WhatsApp", icon: <MessageCircle size={22} />, href: "#", color: "bg-[#25D366]" },
  ];

  const SocialLink = ({ href, icon, color, name }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 text-white ${color}`}
      aria-label={name}
    >
      {icon}
    </a>
  );

  return (
    <footer className="bg-gradient-to-br from-[#472F1A] via-[#6E4B2A] to-[#A06D3A] text-white py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Logo & Title */}
        <div className="flex flex-col sm:flex-row items-center justify-center pb-8 border-b border-white/20 mb-8">
          <Image
            src="/images/logo.png"
            alt="Shri Gopal Pariwar Sangh Logo"
            width={80}
            height={80}
            className="rounded-full shadow-lg"
          />
          <div className="text-center sm:text-left sm:ml-4 mt-4 sm:mt-0">
            <h3 className="text-3xl font-bold text-yellow-300">श्री गोपाल परिवार संघ</h3>
            <p className="text-2xl font-medium text-white/90">धेनु महिमा</p>
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
            <div className="flex items-center space-x-3 text-xl font-medium">
              <Phone className="text-orange-400" size={22} />
              <span>9414174880</span>
            </div>

            <div className="flex items-center space-x-3 text-xl font-medium">
              <Mail className="text-orange-400" size={22} />
              <span className="truncate">shreegopalparivarsang@gmail.com</span>
            </div>

            <div className="flex items-center space-x-3 text-xl font-medium text-right lg:text-left">
              <MapPin className="text-orange-400" size={22} />
              <p className="flex-1">Sheetal Ashram, Ajmer Road, Pushkar, Rajasthan - 305022</p>
            </div>
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
