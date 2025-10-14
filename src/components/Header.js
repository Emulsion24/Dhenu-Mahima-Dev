'use client'

import { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleAccountClick = () => {
    router.push("/dashboard");
    setDropdownOpen(false);
    setIsOpen(false);
     
  };

  const handleLogoutClick = () => {
    logout();
router.push("/login");
  };

  // Check if user is regular user (not admin/subadmin)
  const isRegularUser = user && user.role === "user";
  // Show login if no user OR if user is admin/subadmin
  const showLogin = !user || (user.role === "admin" || user.role === "subadmin");

  return (
    <header className="bg-gradient-to-r from-yellow-400 to-orange-500 shadow-md relative">
      {/* Top Hindi Text */}
      <div className="w-full flex justify-between items-center px-4 md:px-20 py-2">
        <h4 className="text-sm md:text-base font-extrabold text-white animate-pulse drop-shadow-[0_0_10px_rgba(255,215,0,0.9)]">जय गोपाल</h4>
        <h4 className="text-xs md:text-sm font-extrabold text-white animate-pulse drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] text-center">|| ॐ करणी ||</h4>
        <h4 className="text-sm md:text-base font-extrabold text-white animate-pulse drop-shadow-[0_0_10px_rgba(255,215,0,0.9)] text-right">जय गौ माता</h4>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6 py-3 relative">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center space-x-3 md:space-x-4">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 rounded-full overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
            <Image src="/logo/logo5.webp" alt="Logo" width={112} height={112} className="w-full h-full object-cover" priority />
          </div>
          <div className="flex flex-col text-left">
            <h1 className="text-sm sm:text-base md:text-2xl lg:text-3xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] leading-tight">श्री गोपाल परिवार संघ</h1>
            <p className="text-base sm:text-lg md:text-3xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">धेनु महिमा</p>
          </div>
        </Link>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-lg font-semibold text-red-900 hover:text-white transition duration-300">Home</Link>
          <Link href="/gopal-pariwar" className="text-lg font-semibold text-red-900 hover:text-white transition duration-300">Gopal Pariwar</Link>
          
          {/* Show Login only if user is not logged in OR if user is admin/subadmin */}
          {showLogin && (
            <Link href="/login" className="text-lg font-semibold text-red-900 hover:text-white transition duration-300">Login</Link>
          )}

          <Link href="/donate" className="relative px-6 py-2 rounded-full font-bold text-white bg-red-950 shadow-lg hover:bg-yellow-500 transition-all duration-300 animate-pulse drop-shadow-[0_0_15px_rgba(255,215,0,1)]">
            Donate Now
            <span className="absolute inset-0 rounded-full bg-yellow-300 opacity-30 blur-2xl animate-pulse"></span>
            <span className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/20"></span>
          </Link>

          {/* User Account Dropdown - Only for regular users */}
          {isRegularUser && (
            <div className="relative ml-4">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)} 
                className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110"
                aria-label="User menu"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center text-white font-bold text-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </button>
              
              {dropdownOpen && (
                <>
                  {/* Backdrop to close dropdown */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setDropdownOpen(false)}
                  ></div>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-xl z-50 overflow-hidden border border-orange-200">
                    <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-yellow-50 border-b border-orange-200">
                      <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <button 
                      className="block w-full text-left px-4 py-2.5 hover:bg-orange-50 transition-colors duration-200 font-medium text-gray-700"
                      onClick={handleAccountClick}
                    >
                      <User size={16} className="inline mr-2" />
                      My Account
                    </button>
                    <button 
                      className="block w-full text-left px-4 py-2.5 hover:bg-red-50 transition-colors duration-200 font-medium text-red-600 border-t border-gray-100"
                      onClick={handleLogoutClick}
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white hover:text-yellow-300 transition ml-2" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute left-0 top-full w-full bg-yellow-400 text-left space-y-3 py-4 px-6 shadow-xl z-50 animate-slide-down">
          <Link href="/" className="block text-lg font-semibold text-red-900 hover:text-white transition duration-300" onClick={toggleMenu}>Home</Link>
          <Link href="/gopal-pariwar" className="block text-lg font-semibold text-red-900 hover:text-white transition duration-300" onClick={toggleMenu}>Gopal Pariwar</Link>
          
          {/* Show Login only if user is not logged in OR if user is admin/subadmin */}
          {showLogin && (
            <Link href="/login" className="block text-lg font-semibold text-red-900 hover:text-white transition duration-300" onClick={toggleMenu}>Login</Link>
          )}
          
          <Link href="/donate" className="inline-block px-6 py-2 rounded-full font-bold text-white bg-red-800 shadow-lg hover:bg-yellow-600 transition-all duration-300 animate-pulse drop-shadow-[0_0_15px_rgba(255,215,0,1)]" onClick={toggleMenu}>Donate Now</Link>

          {/* Mobile User Menu - Only for regular users */}
          {isRegularUser && (
            <div className="border-t border-red-800 pt-3 mt-3 space-y-2">
              <div className="flex items-center space-x-3 px-4 py-2 bg-white/20 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{user.name}</p>
                  <p className="text-xs text-white/80">{user.email}</p>
                </div>
              </div>
              <button 
                className="block w-full text-left px-4 py-2 text-lg font-semibold text-red-900 hover:text-white transition duration-300" 
                onClick={handleAccountClick}
              >
                My Account
              </button>
              <button 
                className="block w-full text-left px-4 py-2 text-lg font-semibold text-red-900 hover:text-white transition duration-300" 
                onClick={handleLogoutClick}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}