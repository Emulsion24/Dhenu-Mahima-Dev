"use client"
import React, { useState, useEffect, useRef } from 'react';
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  Repeat, Shuffle, Heart, Search, ChevronLeft, ChevronRight,
  Loader2, RefreshCw,
  Home, Music2, Clock
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Replace with your actual API URL
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function BhajanMusicPlayer() {
  const [bhajans, setBhajans] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [liked, setLiked] = useState([]);
  const [error, setError] = useState(null);
  const [isBuffering, setIsBuffering] = useState(false);
  const router = useRouter();
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const volumeBarRef = useRef(null);

  // Fetch bhajans from backend with pagination
  useEffect(() => {
    fetchBhajans(1, '');
  }, []);

  const fetchBhajans = async (page = 1, search = '') => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      setError(null);
      
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        sortBy: 'order',
        sortOrder: 'desc'
      });
      
      if (search) {
        queryParams.append('search', search);
      }
      
      const response = await fetch(`${BACKEND_URL}/jevansutra?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch bhajans');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setBhajans(data.data);
        setCurrentPage(data.pagination.currentPage);
        setTotalPages(data.pagination.totalPages);
        setTotalCount(data.pagination.totalCount);
        setHasNextPage(data.pagination.hasNextPage);
        setHasPrevPage(data.pagination.hasPrevPage);
        
        if (page !== currentPage) {
          setCurrentSong(0);
          setIsPlaying(false);
        }
      }
      
      setLoading(false);
      setIsLoadingMore(false);
    } catch (error) {
      console.error('Error fetching bhajans:', error);
      setError('Failed to load bhajans. Please check if the server is running.');
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    const timeoutId = setTimeout(() => {
      fetchBhajans(1, query);
    }, 500);
    return () => clearTimeout(timeoutId);
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      const nextPage = currentPage + 1;
      fetchBhajans(nextPage, searchQuery);
    }
  };

  const handlePrevPage = () => {
    if (hasPrevPage) {
      const prevPage = currentPage - 1;
      fetchBhajans(prevPage, searchQuery);
    }
  };

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'metadata';
    }

    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(Math.floor(audio.currentTime));
      setDuration(Math.floor(audio.duration) || 0);
    };

    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNext();
      }
    };

    const handleWaiting = () => setIsBuffering(true);
    const handleCanPlay = () => setIsBuffering(false);
    const handleError = (e) => {
      console.error('Audio error:', e);
      setIsBuffering(false);
      setError('Failed to load audio. Please try again.');
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateTime);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateTime);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
    };
  }, [isRepeat]);

  useEffect(() => {
    if (bhajans.length > 0 && audioRef.current) {
      const audio = audioRef.current;
      const currentBhajan = bhajans[currentSong];
      
      if (!currentBhajan) return;
      
      const audioUrl = currentBhajan.audioUrl;
      const filename = audioUrl.split('/').pop();
      
      audio.pause();
      audio.src = `${BACKEND_URL}/jevansutra/audio/stream/${filename}`;
      audio.volume = volume / 100;
      
      setCurrentTime(0);
      setDuration(0);
      
      if (isPlaying) {
        audio.play().catch(err => {
          console.error('Playback error:', err);
          setIsPlaying(false);
        });
      }
    }
  }, [currentSong, bhajans]);

  useEffect(() => {
    if (audioRef.current && bhajans.length > 0) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error('Playback error:', err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (bhajans.length === 0) return;
    
    if (isShuffle) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * bhajans.length);
      } while (randomIndex === currentSong && bhajans.length > 1);
      setCurrentSong(randomIndex);
    } else {
      if (currentSong === bhajans.length - 1 && hasNextPage) {
        handleNextPage();
      } else {
        setCurrentSong((currentSong + 1) % bhajans.length);
      }
    }
  };

  const handlePrevious = () => {
    if (bhajans.length === 0) return;
    
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else {
      if (currentSong === 0 && hasPrevPage) {
        handlePrevPage();
      } else {
        setCurrentSong((currentSong - 1 + bhajans.length) % bhajans.length);
      }
    }
  };

  const handleProgressClick = (e) => {
    if (!progressBarRef.current || !audioRef.current || duration === 0) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioRef.current.currentTime = percent * duration;
  };

  const handleVolumeChange = (e) => {
    if (!volumeBarRef.current) return;
    
    const rect = volumeBarRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    setVolume(Math.round(percent));
    setIsMuted(false);
  };

  const toggleLike = (id) => {
    setLiked(prev => 
      prev.includes(id) 
        ? prev.filter(likedId => likedId !== id)
        : [...prev, id]
    );
  };

  const handleSongSelect = (index) => {
    setCurrentSong(index);
    setIsPlaying(true);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-500 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
          <p className="text-white text-xl font-semibold">लोड हो रहा है...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-500 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <div className="bg-red-500 bg-opacity-20 backdrop-blur-md rounded-2xl p-8 max-w-md">
            <p className="text-2xl font-bold mb-4">⚠️ त्रुटि</p>
            <p className="text-lg mb-6">{error}</p>
            <button
              onClick={() => fetchBhajans(1, '')}
              className="bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-5 h-5" />
              पुनः प्रयास करें
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (bhajans.length === 0 && !searchQuery) {
    return (
      <div className="h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-500 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 max-w-md">
            <p className="text-2xl font-bold mb-2">🎵 कोई भजन उपलब्ध नहीं है</p>
            <p className="text-lg mb-6">No bhajans available</p>
            <button
              onClick={() => fetchBhajans(1, '')}
              className="bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-5 h-5" />
              रीफ्रेश करें
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-500 text-white flex flex-col overflow-hidden relative">
      
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-800 to-orange-600 bg-opacity-95 backdrop-blur-md border-b border-yellow-300 sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 sm:gap-6">
            <button
              onClick={() => router.push('/')}
              className="bg-white text-orange-600 px-3 py-2 rounded-full font-semibold hover:bg-gray-100 transition shadow-sm text-xs sm:text-sm flex items-center"
            >
              <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
              Dhenu Mahima
            </button>
            <h1 className="text-lg sm:text-2xl font-bold truncate">🎵 जीवन सूत्र</h1>
          </div>

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
                placeholder="भजन खोजें..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white bg-opacity-20 rounded-full pl-9 lg:pl-10 pr-3 lg:pr-4 py-2 w-48 lg:w-80 text-sm lg:text-base focus:outline-none focus:bg-opacity-30 text-black placeholder-gray-700"
              />
              <button
                onClick={() => fetchBhajans(1, searchQuery)}
                className="ml-2 bg-white text-orange-600 px-3 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                <Search className="w-4 h-4 inline-block mr-1" />
                खोजें
              </button>
            </div>
          </div>
        </div>

        {showSearch && (
          <div className="md:hidden px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-700" />
              <input
                type="text"
                placeholder="भजन खोजें..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-white bg-opacity-20 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:bg-opacity-30 text-black placeholder-gray-700"
              />
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-48 sm:pb-36 scroll-smooth">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          
          {/* Featured Section */}
          <section className="mb-8 sm:mb-12">
            <div className="relative h-48 sm:h-64 lg:h-80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-orange-600 to-red-600 border border-white/20">
              
              <Image
                src="/Dhenu.jpg"
                alt={bhajans[currentSong]?.name || "Bhajan"}
                fill
                className="object-cover opacity-50 transition-transform duration-700 hover:scale-105"
                priority
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              <div className="relative h-full flex items-end p-4 sm:p-6 lg:p-10 text-white">
                <div className="w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-orange-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-white/20">
                      {isPlaying ? 'Now Playing' : 'Featured'}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold mb-2 sm:mb-4 drop-shadow-lg line-clamp-1 tracking-tight">
                    {bhajans[currentSong]?.name || 'भजन'}
                  </h2>

                  <p className="text-sm sm:text-base lg:text-xl text-gray-200 mb-4 sm:mb-6 flex items-center gap-2">
                    <Music2 className="w-4 h-4" />
                    {bhajans[currentSong]?.artist} 
                    {bhajans[currentSong]?.album && <span className="hidden sm:inline opacity-70"> • {bhajans[currentSong].album}</span>}
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        disabled={isBuffering}
                        className="bg-white text-orange-600 pl-6 pr-8 py-3 rounded-full font-bold hover:bg-gray-100 transition flex items-center gap-3 text-sm sm:text-base shadow-xl disabled:opacity-50 hover:scale-105 active:scale-95"
                    >
                        {isBuffering ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                        ) : isPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                        ) : (
                        <Play className="w-5 h-5 fill-current" />
                        )}
                        {isBuffering ? 'Loading...' : isPlaying ? 'Pause' : 'Play Now'}
                    </button>
                    
                    <button 
                        onClick={() => toggleLike(bhajans[currentSong]?.id)}
                        className={`p-3 rounded-full backdrop-blur-md border border-white/20 transition hover:scale-110 active:scale-95 ${
                            liked.includes(bhajans[currentSong]?.id) ? 'bg-red-500/80 text-white' : 'bg-black/20 text-white hover:bg-white/20'
                        }`}
                    >
                        <Heart className={`w-5 h-5 ${liked.includes(bhajans[currentSong]?.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* List View - Refined & Responsive */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-2xl font-bold flex items-center gap-2">
                 <span>{searchQuery ? `खोज परिणाम` : `प्लेलिस्ट`}</span>
                 <span className="text-sm sm:text-base font-normal opacity-70 bg-white/10 px-2 py-0.5 rounded-md">
                    {totalCount} भजन
                 </span>
              </h3>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  fetchBhajans(1, '');
                }}
                className="text-xs sm:text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-sm transition flex items-center gap-2 border border-white/10"
              >
                <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>

            {bhajans.length === 0 && searchQuery ? (
              <div className="text-center py-16 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                <Search className="w-12 h-12 mx-auto text-white/30 mb-4" />
                <p className="text-xl font-medium mb-2">No results found</p>
                <p className="text-sm text-gray-300">Try searching for a different keyword</p>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2 sm:gap-3">
                  {bhajans.map((bhajan, index) => (
                    <div
                      key={bhajan.id}
                      onClick={() => handleSongSelect(index)}
                      className={`group relative flex items-center p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer border
                        ${currentSong === index 
                          ? 'bg-gradient-to-r from-orange-500/30 to-red-500/30 border-yellow-200/50 shadow-lg' 
                          : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20 hover:shadow-md hover:translate-x-1'
                        } backdrop-blur-sm`}
                    >
                      {/* Playing Indicator Bar (Left) */}
                      {currentSong === index && (
                        <div className="absolute left-0 top-3 bottom-3 w-1 bg-yellow-400 rounded-r-full shadow-[0_0_10px_rgba(250,204,21,0.6)]"></div>
                      )}

                      {/* Song Image & Play Button */}
                      <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 mr-3 sm:mr-5 ml-1 sm:ml-2">
                        <Image 
                          src="/Dhenu.jpg"
                          alt={bhajan.name} 
                          fill
                          className={`rounded-lg sm:rounded-xl object-cover shadow-md transition-all duration-300 ${currentSong === index ? 'shadow-orange-500/40 ring-2 ring-white/20' : ''}`}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div className={`absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg sm:rounded-xl transition duration-200 ${
                          currentSong === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}>
                          {currentSong === index && isPlaying ? (
                            <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-md" fill="white" />
                          ) : (
                            <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-md" fill="white" />
                          )}
                        </div>
                      </div>

                      {/* Song Info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5 sm:gap-1">
                        <h4 className={`font-bold text-sm sm:text-lg truncate leading-tight ${
                          currentSong === index ? 'text-white' : 'text-gray-100'
                        }`} title={bhajan.name}>
                          {bhajan.name}
                        </h4>
                        <div className="flex items-center text-xs sm:text-sm text-gray-300/90 truncate">
                           <span className="truncate max-w-[150px] sm:max-w-xs">{bhajan.artist}</span>
                           <span className="mx-1.5 opacity-40 hidden sm:inline">|</span>
                           <span className="hidden sm:inline opacity-80">{bhajan.album || 'Single'}</span>
                        </div>
                      </div>

                      {/* Right Side Actions */}
                      <div className="flex items-center gap-3 sm:gap-6 ml-3">
                         <div className="hidden sm:flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-300 bg-black/20 px-3 py-1 rounded-full border border-white/5">
                           <Clock className="w-3 h-3" />
                           {bhajan.duration}
                         </div>
                         
                         <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleLike(bhajan.id);
                            }}
                            className={`p-2 rounded-full transition hover:bg-white/10 active:scale-90 ${liked.includes(bhajan.id) ? 'text-red-400' : 'text-gray-400 hover:text-white'}`}
                         >
                            <Heart className="w-5 h-5 sm:w-5 sm:h-5" fill={liked.includes(bhajan.id) ? 'currentColor' : 'none'} />
                         </button>
                      </div>
                    </div>
                  ))}
                </div>

                {isLoadingMore && (
                  <div className="mt-8 mb-20 flex justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-white/70" />
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </main>

      {/* Fixed Pagination - Now positioned explicitly relative to viewport */}
      {totalPages > 1 && (
        <div className="fixed bottom-24 sm:bottom-28 left-0 right-0 flex justify-center z-40 pointer-events-none px-4">
          <div className="pointer-events-auto flex items-center justify-between gap-4 bg-black/80 backdrop-blur-xl px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-white/10 shadow-2xl w-full max-w-md transition-transform hover:scale-105">
            
            <button
              onClick={handlePrevPage}
              disabled={!hasPrevPage || isLoadingMore}
              className="flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-orange-400 disabled:opacity-30 disabled:cursor-not-allowed group"
            >
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex flex-col items-center">
              <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Page</span>
              <div className="flex items-baseline gap-1">
                <span className="text-base sm:text-lg font-bold text-white">{currentPage}</span>
                <span className="text-xs text-white/40">/</span>
                <span className="text-xs text-white/40">{totalPages}</span>
              </div>
            </div>

            <button
              onClick={handleNextPage}
              disabled={!hasNextPage || isLoadingMore}
              className="flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-orange-400 disabled:opacity-30 disabled:cursor-not-allowed group"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      )}

      {/* Responsive Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        {/* Gradient overlay to fade content behind player */}
        <div className="absolute bottom-full left-0 right-0 h-12 bg-gradient-to-t from-orange-900/50 to-transparent pointer-events-none"></div>
        
        <div className="bg-black/40 backdrop-blur-2xl border-t border-white/10 shadow-[0_-5px_30px_rgba(0,0,0,0.3)]">
            {/* Progress Bar - Full Width on Mobile */}
            <div 
            ref={progressBarRef}
            onClick={handleProgressClick}
            className="relative h-1 cursor-pointer group w-full"
            >
                {/* Background Track */}
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/20"></div>
                {/* Buffered/Loaded (Optional - can add if API supports) */}
                
                {/* Progress Fill */}
                <div
                    className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-100 ease-linear"
                    style={{ width: `${progressPercent}%` }}
                >
                    {/* Glowing Tip */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"></div>
                </div>
            </div>

            <div className="px-3 sm:px-6 py-2 sm:py-3 max-w-7xl mx-auto">
            {/* Mobile Layout (Optimized) */}
            <div className="flex items-center justify-between sm:hidden gap-3">
                {/* Left: Image & Text */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`relative w-10 h-10 rounded-full overflow-hidden border border-white/20 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
                        <Image
                            src="/Dhenu.jpg"
                            alt="Cover"
                            fill
                            className="object-cover"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    </div>
                    <div className="flex flex-col min-w-0 justify-center">
                        <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-white truncate max-w-[120px]">
                            {bhajans[currentSong]?.name || 'Select Song'}
                            </h4>
                        </div>
                        <p className="text-xs text-gray-300 truncate max-w-[120px]">
                            {bhajans[currentSong]?.artist || 'Artist'}
                        </p>
                    </div>
                </div>

                {/* Right: Controls */}
                <div className="flex items-center gap-3">
                    <button 
                        onClick={handlePrevious}
                        className="text-white/70 hover:text-white"
                        disabled={bhajans.length === 0}
                    >
                        <SkipBack className="w-5 h-5" fill="currentColor" />
                    </button>
                    
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        disabled={isBuffering || bhajans.length === 0}
                        className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition shadow-lg active:scale-95"
                    >
                        {isBuffering ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : isPlaying ? (
                            <Pause className="w-5 h-5 fill-current" />
                        ) : (
                            <Play className="w-5 h-5 ml-0.5 fill-current" />
                        )}
                    </button>

                    <button 
                        onClick={handleNext}
                        className="text-white/70 hover:text-white"
                        disabled={bhajans.length === 0}
                    >
                        <SkipForward className="w-5 h-5" fill="currentColor" />
                    </button>
                </div>
            </div>

            {/* Desktop Layout (Full Featured) */}
            <div className="hidden sm:flex items-center justify-between gap-8">
                {/* Left: Song Info */}
                <div className="flex items-center gap-4 flex-1 min-w-0 max-w-sm">
                    <div className="relative group/cover">
                        <Image
                            src="/Dhenu.jpg"
                            alt="Cover"
                            width={56}
                            height={56}
                            className="w-14 h-14 rounded-lg shadow-lg object-cover border border-white/10 group-hover/cover:scale-105 transition-transform"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    </div>
                    
                    <div className="min-w-0 flex-1">
                        <h4 className="font-bold truncate text-lg text-white mb-0.5">
                        {bhajans[currentSong]?.name || 'जीवन सूत्र'}
                        </h4>
                        <p className="text-sm text-gray-300 truncate hover:text-white transition cursor-pointer">
                        {bhajans[currentSong]?.artist || 'Select a bhajan to play'}
                        </p>
                    </div>
                    
                    <button 
                        onClick={() => toggleLike(bhajans[currentSong]?.id)}
                        className={`transition p-2 rounded-full hover:bg-white/10 ${liked.includes(bhajans[currentSong]?.id) ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Heart className="w-5 h-5" fill={liked.includes(bhajans[currentSong]?.id) ? 'currentColor' : 'none'} />
                    </button>
                </div>

                {/* Center: Controls */}
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className="flex items-center gap-6">
                        <button 
                        onClick={() => setIsShuffle(!isShuffle)}
                        className={`transition p-2 rounded-full hover:bg-white/10 ${isShuffle ? 'text-orange-400' : 'text-gray-400 hover:text-white'}`}
                        title="Shuffle"
                        >
                        <Shuffle className="w-5 h-5" />
                        </button>

                        <button 
                        onClick={handlePrevious}
                        disabled={bhajans.length === 0}
                        className="text-gray-200 hover:text-white transition p-2 hover:bg-white/10 rounded-full disabled:opacity-50"
                        >
                        <SkipBack className="w-6 h-6" fill="currentColor" />
                        </button>

                        <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        disabled={isBuffering || bhajans.length === 0}
                        className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95 disabled:opacity-50 disabled:scale-100"
                        >
                        {isBuffering ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : isPlaying ? (
                            <Pause className="w-6 h-6 fill-current" />
                        ) : (
                            <Play className="w-6 h-6 ml-1 fill-current" />
                        )}
                        </button>

                        <button 
                        onClick={handleNext}
                        disabled={bhajans.length === 0}
                        className="text-gray-200 hover:text-white transition p-2 hover:bg-white/10 rounded-full disabled:opacity-50"
                        >
                        <SkipForward className="w-6 h-6" fill="currentColor" />
                        </button>

                        <button 
                        onClick={() => setIsRepeat(!isRepeat)}
                        className={`transition p-2 rounded-full hover:bg-white/10 ${isRepeat ? 'text-orange-400' : 'text-gray-400 hover:text-white'}`}
                        title="Repeat"
                        >
                        <Repeat className="w-5 h-5" />
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-400 font-medium font-mono">
                        <span className="min-w-[40px] text-right">{formatTime(currentTime)}</span>
                        <span className="text-gray-600">/</span>
                        <span className="min-w-[40px]">{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Right: Volume */}
                <div className="flex items-center gap-3 flex-1 justify-end max-w-xs">
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-gray-400 hover:text-white transition p-2 rounded-full hover:bg-white/10"
                    >
                        {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <div 
                        ref={volumeBarRef}
                        onClick={handleVolumeChange}
                        className="w-28 h-1.5 bg-white/10 rounded-full cursor-pointer group relative overflow-hidden"
                    >
                        <div
                        className="absolute top-0 left-0 bottom-0 bg-white group-hover:bg-orange-400 transition-colors rounded-full"
                        style={{ width: `${isMuted ? 0 : volume}%` }}
                        ></div>
                    </div>
                </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}