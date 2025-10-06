import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-gradient-to-r from-yellow-400 to-orange-500 shadow-md relative">
      {/* Glowing Top Hindi Text */}
      <div className="w-full flex justify-between items-center px-4 md:px-20 py-2">
        <h4 className="text-sm md:text-base font-extrabold text-white animate-pulse drop-shadow-[0_0_10px_rgba(255,215,0,0.9)]">
          जय गोपाल
        </h4>

        <h4 className="text-xs md:text-sm font-extrabold text-white animate-pulse drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] text-center">
          || ॐ करणी ||
        </h4>

        <h4 className="text-sm md:text-base font-extrabold text-white animate-pulse drop-shadow-[0_0_10px_rgba(255,215,0,0.9)] text-right">
          जय गौ माता
        </h4>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-6 py-4">
        {/* Logo + Title */}
        <Link
          href="/"
          className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-0"
        >
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
          <Image
      src="/logo/logo5.webp"
      alt="Logo"
      width={112}
      height={112}
      className="w-full h-full object-cover"
      onError={() =>
        setImgSrc("https://placehold.co/112x112/FF9933/fff?text=Logo")
      }
      priority
    />
          </div>
          <div className="flex flex-col text-center md:text-left">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.9)] hover:scale-105 transition-transform duration-300">
              श्री गोपाल परिवार संघ
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              धेनु महिमा
            </p>
          </div>
        </Link>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-lg font-semibold text-red-900 hover:text-white transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/gopal-pariwar"
            className="text-lg font-semibold text-red-900 hover:text-white transition duration-300"
          >
            Gopal Pariwar
          </Link>
          <Link
            href="/login"
            className="text-lg font-semibold text-red-900 hover:text-white transition duration-300"
          >
            Login
          </Link>
          <Link
            href="/donate"
            className="relative px-6 py-2 rounded-full font-bold text-white bg-red-950 shadow-lg hover:bg-yellow-500 transition-all duration-300"
          >
            Donate Now
            <span className="absolute inset-0 rounded-full bg-yellow-300 opacity-30 blur-xl animate-pulse"></span>
            <span className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/20"></span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-yellow-300 transition"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-yellow-400 text-center space-y-3 py-4 shadow-lg">
          <Link
            href="/"
            className="block text-lg font-semibold text-red-900 hover:text-white transition duration-300"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <a
            href="/gopal-pariwar"
            className="block text-lg font-semibold text-red-900 hover:text-white transition duration-300"
            onClick={toggleMenu}
          >
            Gopal Pariwar
          </a>
          <a
            href="/login"
            className="block text-lg font-semibold text-red-900 hover:text-white transition duration-300"
            onClick={toggleMenu}
          >
            Login
          </a>
          <a
            href="/donate"
            className="inline-block px-6 py-2 rounded-full font-bold text-white bg-yellow-500 shadow-lg hover:bg-yellow-600 transition-all duration-300"
            onClick={toggleMenu}
          >
            Donate Now
          </a>
        </div>
      )}
    </header>
  );
}