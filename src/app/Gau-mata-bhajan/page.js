"use client"
import React, { useState } from 'react';
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  Repeat, Shuffle, Heart, Search, Home, Library,
  TrendingUp, Flame, Menu, X
} from 'lucide-react';

export default function GaumataBhajanPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(137);
  const [duration, setDuration] = useState(245);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState('gaumata-bhajan');
  const [currentSong, setCurrentSong] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const bhajans = [
    {
      id: 1,
      title: "गौ माता की आरती",
      artist: "अनूप जलोटा",
      album: "गौ भक्ति संगीत",
      duration: "4:05",
      thumbnail: "/images/1.png",
      views: "2.5M"
    },
    {
      id: 2,
      title: "गाय हमारी माता है",
      artist: "हरिहरण",
      album: "गौ सेवा गीत",
      duration: "5:20",
      thumbnail: "/images/1.png",
      views: "1.8M"
    },
    {
      id: 3,
      title: "कामधेनु वंदना",
      artist: "जसपाल सिंह",
      album: "गौ महिमा",
      duration: "6:15",
      thumbnail: "/images/1.png",
      views: "3.2M"
    },
    {
      id: 4,
      title: "गौ माता की महिमा",
      artist: "देवी चित्रलेखा",
      album: "गौ भजन संग्रह",
      duration: "4:45",
      thumbnail: "/images/1.png",
      views: "1.2M"
    },
    {
      id: 5,
      title: "गौ सेवा का महत्व",
      artist: "गुलशन कुमार",
      album: "भक्ति गीत",
      duration: "8:30",
      thumbnail:"/images/1.png",
      views: "5.6M"
    },
    {
      id: 6,
      title: "गौ माता स्तुति",
      artist: "मीरा बाई",
      album: "गौ वंदना",
      duration: "5:50",
      thumbnail: "/images/1.png",
      views: "980K"
    }
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = (currentTime / duration) * 100;

  const navItems = [
    { key: 'dhenu-mahima', label: 'धेनु महिमा', icon: Home },
    { key: 'gaumata-bhajan', label: 'गौमाता भजन', icon: TrendingUp },
    { key: 'library', label: 'लाइब्रेरी', icon: Library }
  ];

  const handleNavigation = (key) => {
    setActiveTab(key);
    if (key === 'dhenu-mahima') {
      window.location.href = '/';
    }
  };

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <div className="h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 text-white flex flex-col overflow-hidden">
      
      {/* Header */}
      <header className="bg-gradient-to-r from-green-800 to-emerald-700 bg-opacity-95 backdrop-blur-md border-b border-green-300 sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          {/* Logo and Menu */}
          <div className="flex items-center gap-3 sm:gap-6">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <img
              src="/logo/logo5.webp"
              alt="Logo"
              className="h-10 sm:h-12 lg:h-14 w-auto cursor-pointer hover:opacity-80 transition"
              onClick={handleLogoClick}
            />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4 lg:gap-6">
              {navItems.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => handleNavigation(tab.key)}
                    className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full transition text-sm lg:text-base
                      ${activeTab === tab.key
                        ? 'bg-white text-green-700 shadow-md'
                        : 'hover:bg-white hover:bg-opacity-20'}`}
                  >
                    <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span className="hidden lg:inline">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="md:hidden p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-700" />
              <input
                type="text"
                placeholder="गौमाता भजन खोजें..."
                className="bg-white bg-opacity-20 rounded-full pl-9 lg:pl-10 pr-3 lg:pr-4 py-2 w-48 lg:w-80 text-sm lg:text-base focus:outline-none focus:bg-opacity-30 text-black placeholder-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="md:hidden px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-700" />
              <input
                type="text"
                placeholder="गौमाता भजन खोजें..."
                className="w-full bg-white bg-opacity-20 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:bg-opacity-30 text-black placeholder-gray-700"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden px-4 pb-4 space-y-2">
            {navItems.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    handleNavigation(tab.key);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition
                    ${activeTab === tab.key
                      ? 'bg-white text-green-700'
                      : 'hover:bg-white hover:bg-opacity-20'}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-32 sm:pb-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          
          {/* Featured Section */}
          <section className="mb-8 sm:mb-12">
            <div className="relative h-48 sm:h-64 lg:h-80 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl bg-gradient-to-r from-green-600 to-emerald-500">
              
              {/* Overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-transparent"></div>

              {/* Foreground content */}
              <div className="relative h-full flex items-end p-4 sm:p-6 lg:p-8 text-white">
                <div className="w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-green-300" />
                    <span className="text-xs sm:text-sm font-semibold">ट्रेंडिंग नाउ</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-2 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] line-clamp-2">
                    {bhajans[currentSong].title}
                  </h2>

                  <p className="text-sm sm:text-base lg:text-lg text-gray-100 mb-3 sm:mb-4">
                    {bhajans[currentSong].artist} • {bhajans[currentSong].views} views
                  </p>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-white text-green-700 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-gray-100 transition flex items-center gap-2 text-sm sm:text-base shadow-lg"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                    {isPlaying ? 'पॉज़' : 'प्ले करें'}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Picks */}
          <section className="mb-8 sm:mb-12">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold">क्विक पिक्स</h3>
              <button className="text-xs sm:text-sm text-green-100 hover:text-white transition">सभी देखें</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {bhajans.map((bhajan, index) => (
                <div
                  key={bhajan.id}
                  onClick={() => setCurrentSong(index)}
                  className="bg-green-900 bg-opacity-10 backdrop-blur-sm rounded-lg p-2 sm:p-3 hover:bg-opacity-20 transition cursor-pointer group"
                >
                  <div className="relative mb-2 sm:mb-3">
                    <img 
                      src={bhajan.thumbnail} 
                      alt={bhajan.title} 
                      className="w-full aspect-square object-cover rounded-lg" 
                    />
                    <button className="absolute bottom-2 right-2 bg-gradient-to-r from-green-400 to-emerald-500 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" fill="white" />
                    </button>
                  </div>
                  <h4 className="font-semibold text-xs sm:text-sm mb-1 truncate">{bhajan.title}</h4>
                  <p className="text-xs text-gray-200 truncate">{bhajan.artist}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-green-900 to-emerald-800 backdrop-blur-xl border-t border-green-300 shadow-2xl">
        {/* Progress Bar */}
        <div className="relative h-1 sm:h-1.5 bg-green-200 cursor-pointer group">
          <div
            className="absolute h-full bg-teal-600 transition-all"
            style={{ width: `${progressPercent}%` }}
          ></div>
          <div
            className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full top-1/2 transform -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition shadow-md"
            style={{ left: `${progressPercent}%` }}
          ></div>
        </div>

        <div className="px-3 sm:px-6 py-3 sm:py-4">
          {/* Mobile Layout */}
          <div className="flex flex-col gap-3 sm:hidden">
            {/* Song Info */}
            <div className="flex items-center gap-3">
              <img
                src={bhajans[currentSong].thumbnail}
                alt={bhajans[currentSong].title}
                className="w-14 h-14 rounded-lg shadow-lg"
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold truncate text-base text-white">{bhajans[currentSong].title}</h4>
                <p className="text-sm text-gray-200 truncate">{bhajans[currentSong].artist}</p>
              </div>
              <button className="hover:text-red-400 transition text-white p-2">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Main Controls */}
            <div className="flex items-center justify-center gap-6">
              <button 
                onClick={() => setCurrentSong((currentSong - 1 + bhajans.length) % bhajans.length)}
                className="hover:text-white transition text-gray-200 p-2"
              >
                <SkipBack className="w-7 h-7" fill="currentColor" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-white text-green-700 w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 transition shadow-xl"
              >
                {isPlaying ? <Pause className="w-7 h-7" fill="currentColor" /> : <Play className="w-7 h-7 ml-1" fill="currentColor" />}
              </button>
              <button 
                onClick={() => setCurrentSong((currentSong + 1) % bhajans.length)}
                className="hover:text-white transition text-gray-200 p-2"
              >
                <SkipForward className="w-7 h-7" fill="currentColor" />
              </button>
            </div>

            {/* Time & Secondary Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-gray-200">
                <span className="font-medium">{formatTime(currentTime)}</span>
                <div className="w-20 h-1 bg-gray-300 rounded-full">
                  <div
                    className="h-full bg-white rounded-full transition-all"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <span className="font-medium">{formatTime(duration)}</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="hover:text-white transition text-gray-200 p-1">
                  <Shuffle className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-white transition text-gray-200 p-1"
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center justify-between gap-6 lg:gap-8">
            {/* Current Song Info */}
            <div className="flex items-center gap-4 flex-1 min-w-0 max-w-xs lg:max-w-sm">
              <img
                src={bhajans[currentSong].thumbnail}
                alt={bhajans[currentSong].title}
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-lg shadow-lg flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold truncate text-base lg:text-lg text-white mb-1">{bhajans[currentSong].title}</h4>
                <p className="text-sm lg:text-base text-gray-200 truncate">{bhajans[currentSong].artist}</p>
              </div>
              <button className="hover:text-red-400 transition text-white p-2 flex-shrink-0">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Player Controls - Center */}
            <div className="flex flex-col items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-4 lg:gap-6">
                <button className="hover:text-red-400 transition text-white p-1">
                  <Shuffle className="w-5 h-5 lg:w-6 lg:h-6" />
                </button>
                <button 
                  onClick={() => setCurrentSong((currentSong - 1 + bhajans.length) % bhajans.length)}
                  className="hover:scale-110 transition text-white p-1"
                >
                  <SkipBack className="w-6 h-6 lg:w-7 lg:h-7" fill="currentColor" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-white text-green-700 w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center hover:scale-105 transition shadow-xl"
                >
                  {isPlaying ? <Pause className="w-6 h-6 lg:w-7 lg:h-7" fill="currentColor" /> : <Play className="w-6 h-6 lg:w-7 lg:h-7 ml-0.5" fill="currentColor" />}
                </button>
                <button 
                  onClick={() => setCurrentSong((currentSong + 1) % bhajans.length)}
                  className="hover:scale-110 transition text-white p-1"
                >
                  <SkipForward className="w-6 h-6 lg:w-7 lg:h-7" fill="currentColor" />
                </button>
                <button className="hover:text-red-400 transition text-white p-1">
                  <Repeat className="w-5 h-5 lg:w-6 lg:h-6" />
                </button>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-200 font-medium">
                <span>{formatTime(currentTime)}</span>
                <div className="w-64 lg:w-96 h-1.5 bg-gray-300 rounded-full cursor-pointer group relative">
                  <div
                    className="h-full bg-white rounded-full transition-all"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                  <div
                    className="absolute w-3 h-3 bg-white rounded-full top-1/2 transform -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition shadow-lg"
                    style={{ left: `${progressPercent}%` }}
                  ></div>
                </div>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Volume Controls - Right */}
            <div className="flex items-center gap-4 flex-1 justify-end max-w-xs">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="hover:text-red-400 transition text-white p-1"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
              <div className="w-24 lg:w-32 h-1.5 bg-gray-300 rounded-full cursor-pointer group relative">
                <div
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${isMuted ? 0 : volume}%` }}
                ></div>
                <div
                  className="absolute w-3 h-3 bg-white rounded-full top-1/2 transform -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition shadow-md"
                  style={{ left: `${isMuted ? 0 : volume}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}