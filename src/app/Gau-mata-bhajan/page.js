"use client"
import React, { useState, useEffect, useRef } from 'react';
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  Repeat, Shuffle, Heart, Search, Home, Library,
  TrendingUp, Flame, Menu, X
} from 'lucide-react';
import API from '@/lib/api';



export default function GaumataBhajanPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState('gaumata-bhajan');
  const [currentSong, setCurrentSong] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [bhajans, setBhajans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const audioRef = useRef(null);

  // Fetch bhajans from backend
  useEffect(() => {
    fetchBhajans();
  }, []);

  const fetchBhajans = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/gaumata-bhajans`);
      
      if (response.data && response.data.length > 0) {
        const formattedBhajans = response.data.map(bhajan => ({
          id: bhajan.id,
          title: bhajan.name,
          artist: bhajan.artist,
          album: bhajan.album || 'Unknown Album',
          duration: bhajan.duration,
          thumbnail: bhajan.imageUrl || '/images/default-bhajan.png',
          audioUrl: bhajan.audioUrl,
          views: '0', // You can add view tracking later
          category: bhajan.category.name
        }));
        setBhajans(formattedBhajans);
      }
    } catch (error) {
      console.error('Error fetching bhajans:', error);
      // Fallback to sample data if API fails
      setBhajans([
        {
          id: 1,
          title: "गौ माता की आरती",
          artist: "अनूप जलोटा",
          album: "गौ भक्ति संगीत",
          duration: "4:05",
          thumbnail: "/images/1.png",
          audioUrl: "",
          views: "2.5M"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Initialize audio element
 
  // Update audio source when song changes
  useEffect(() => {
    if (bhajans.length > 0 && audioRef.current) {
      const currentBhajan = bhajans[currentSong];
      if (currentBhajan && currentBhajan.audioUrl) {
        // Extract filename from audioUrl
        const urlParts = currentBhajan.audioUrl.split('/');
        const filename = urlParts[urlParts.length - 1];
        
        // Use streaming endpoint
              const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://g4s408kkw4cg48ccskcwc8kg.72.60.221.4.sslip.io';
        const streamUrl = `${apiBaseUrl}/api/gaumata-bhajans/audio/stream/${filename}`;
        audioRef.current.src = streamUrl;
        
        if (isPlaying) {
          audioRef.current.play().catch(err => {
            console.error('Error playing audio:', err);
            setIsPlaying(false);
          });
        }
      }
    }
  }, [currentSong, bhajans]);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error('Error playing audio:', err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(Math.floor(audioRef.current.currentTime));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(Math.floor(audioRef.current.duration));
    }
  };

  const handleAudioEnded = () => {
    if (isRepeat) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * bhajans.length);
      setCurrentSong(randomIndex);
    } else {
      handleNext();
    }
  };

  const handleProgressClick = (e) => {
    if (audioRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = percent * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(Math.floor(newTime));
    }
  };

  const handleVolumeChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newVolume = Math.max(0, Math.min(100, percent * 100));
    setVolume(newVolume);
    if (newVolume > 0) setIsMuted(false);
  };

  const handlePrevious = () => {
    if (currentTime > 3) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    } else {
      setCurrentSong((prev) => (prev - 1 + bhajans.length) % bhajans.length);
    }
  };

  const handleNext = () => {
    setCurrentSong((prev) => (prev + 1) % bhajans.length);
  };

  const handleSongSelect = (index) => {
    setCurrentSong(index);
    setIsPlaying(true);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

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
   useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleAudioEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleAudioEnded);
      audio.pause();
    };
  }, [handleTimeUpdate, handleLoadedMetadata, handleAudioEnded]);


  // Filter bhajans based on search
  const filteredBhajans = bhajans.filter(bhajan => 
    bhajan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bhajan.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bhajan.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold">Loading Bhajans...</p>
        </div>
      </div>
    );
  }

  if (bhajans.length === 0) {
    return (
      <div className="h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-2xl font-bold mb-4">No bhajans available</p>
          <button 
            onClick={fetchBhajans}
            className="px-6 py-3 bg-white text-green-700 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
              
              {/* Background Image */}
              {bhajans[currentSong]?.thumbnail && (
                <img 
                  src={bhajans[currentSong].thumbnail} 
                  alt={bhajans[currentSong].title}
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
              )}

              {/* Overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-transparent"></div>

              {/* Foreground content */}
              <div className="relative h-full flex items-end p-4 sm:p-6 lg:p-8 text-white">
                <div className="w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-green-300" />
                    <span className="text-xs sm:text-sm font-semibold">अभी चल रहा है</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-2 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] line-clamp-2">
                    {bhajans[currentSong]?.title}
                  </h2>

                  <p className="text-sm sm:text-base lg:text-lg text-gray-100 mb-3 sm:mb-4">
                    {bhajans[currentSong]?.artist} • {bhajans[currentSong]?.category}
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
              <h3 className="text-xl sm:text-2xl font-bold">
                {searchQuery ? 'खोज परिणाम' : 'सभी भजन'}
              </h3>
              <span className="text-xs sm:text-sm text-green-100">
                {filteredBhajans.length} भजन
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {filteredBhajans.map((bhajan, index) => (
                <div
                  key={bhajan.id}
                  onClick={() => handleSongSelect(bhajans.findIndex(b => b.id === bhajan.id))}
                  className={`bg-green-900 bg-opacity-10 backdrop-blur-sm rounded-lg p-2 sm:p-3 hover:bg-opacity-20 transition cursor-pointer group ${
                    currentSong === bhajans.findIndex(b => b.id === bhajan.id) ? 'ring-2 ring-white' : ''
                  }`}
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
                    {currentSong === bhajans.findIndex(b => b.id === bhajan.id) && isPlaying && (
                      <div className="absolute top-2 left-2 bg-green-500 px-2 py-1 rounded-full text-xs font-semibold">
                        Playing
                      </div>
                    )}
                  </div>
                  <h4 className="font-semibold text-xs sm:text-sm mb-1 truncate">{bhajan.title}</h4>
                  <p className="text-xs text-gray-200 truncate">{bhajan.artist}</p>
                  <p className="text-xs text-gray-300 mt-1">{bhajan.duration}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-green-900 to-emerald-800 backdrop-blur-xl border-t border-green-300 shadow-2xl">
        {/* Progress Bar */}
        <div 
          className="relative h-1 sm:h-1.5 bg-green-200 cursor-pointer group"
          onClick={handleProgressClick}
        >
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
                src={bhajans[currentSong]?.thumbnail}
                alt={bhajans[currentSong]?.title}
                className="w-14 h-14 rounded-lg shadow-lg"
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold truncate text-base text-white">{bhajans[currentSong]?.title}</h4>
                <p className="text-sm text-gray-200 truncate">{bhajans[currentSong]?.artist}</p>
              </div>
              <button className="hover:text-red-400 transition text-white p-2">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Main Controls */}
            <div className="flex items-center justify-center gap-6">
              <button 
                onClick={handlePrevious}
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
                onClick={handleNext}
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
                <button 
                  onClick={() => setIsShuffle(!isShuffle)}
                  className={`hover:text-white transition p-1 ${isShuffle ? 'text-white' : 'text-gray-200'}`}
                >
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
                src={bhajans[currentSong]?.thumbnail}
                alt={bhajans[currentSong]?.title}
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-lg shadow-lg flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold truncate text-base lg:text-lg text-white mb-1">{bhajans[currentSong]?.title}</h4>
                <p className="text-sm lg:text-base text-gray-200 truncate">{bhajans[currentSong]?.artist}</p>
              </div>
              <button className="hover:text-red-400 transition text-white p-2 flex-shrink-0">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Player Controls - Center */}
            <div className="flex flex-col items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-4 lg:gap-6">
                <button 
                  onClick={() => setIsShuffle(!isShuffle)}
                  className={`hover:text-red-400 transition p-1 ${isShuffle ? 'text-white' : 'text-gray-300'}`}
                >
                  <Shuffle className="w-5 h-5 lg:w-6 lg:h-6" />
                </button>
                <button 
                  onClick={handlePrevious}
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
                  onClick={handleNext}
                  className="hover:scale-110 transition text-white p-1"
                >
                  <SkipForward className="w-6 h-6 lg:w-7 lg:h-7" fill="currentColor" />
                </button>
                <button 
                  onClick={() => setIsRepeat(!isRepeat)}
                  className={`hover:text-red-400 transition p-1 ${isRepeat ? 'text-white' : 'text-gray-300'}`}
                >
                  <Repeat className="w-5 h-5 lg:w-6 lg:h-6" />
                </button>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-200 font-medium">
                <span>{formatTime(currentTime)}</span>
                <div 
                  className="w-64 lg:w-96 h-1.5 bg-gray-300 rounded-full cursor-pointer group relative"
                  onClick={handleProgressClick}
                >
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
              <div 
                className="w-24 lg:w-32 h-1.5 bg-gray-300 rounded-full cursor-pointer group relative"
                onClick={handleVolumeChange}
              >
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