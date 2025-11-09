"use client"
import React, { useState, useEffect, useRef } from 'react';
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  Repeat, Shuffle, Heart, Search, ChevronLeft, ChevronRight,
  Loader2, RefreshCw,
  Home
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
  const router =useRouter();
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
        
        // Reset current song to 0 when loading new page
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

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      fetchBhajans(1, query);
    }, 500);
    
    return () => clearTimeout(timeoutId);
  };

  // Pagination handlers
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

  // Initialize audio element
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

  // Load current song
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

  // Handle play/pause
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

  // Handle volume changes
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
        // Load next page if at end of current page
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
        // Load previous page if at start of current page
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
    <div className="h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-500 text-white flex flex-col overflow-hidden">
      
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-800 to-orange-600 bg-opacity-95 backdrop-blur-md border-b border-yellow-300 sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3 sm:gap-6">
            <button
  onClick={() => router.push('/')}
  className="ml-2 bg-white text-orange-600 px-3 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
>
  <Home className="w-4 h-4 inline-block mr-1" />
  Dhenu Mahima
</button>
            <h1 className="text-xl sm:text-2xl font-bold">🎵 जीवन सूत्र</h1>
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
      <main className="flex-1 overflow-y-auto pb-32 sm:pb-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          
          {/* Featured Section */}
          <section className="mb-8 sm:mb-12">
            <div className="relative h-48 sm:h-64 lg:h-80 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl bg-gradient-to-r from-orange-600 to-red-600">
              
              {/* --- MODIFIED --- */}
              <Image
                src="/Dhenu.jpg"
                alt={bhajans[currentSong]?.name || "Bhajan"}
                fill
                className="object-cover opacity-50"
                priority
                onError={(e) => {
                  e.currentTarget.style.display = 'none'; // Hide if Dhenu.jpg fails to load
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

              <div className="relative h-full flex items-end p-4 sm:p-6 lg:p-8 text-white">
                <div className="w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs sm:text-sm font-semibold">
                      {isPlaying ? 'अभी चल रहा है' : 'चुना हुआ'}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-2 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] line-clamp-2">
                    {bhajans[currentSong]?.name || 'भजन'}
                  </h2>

                  <p className="text-sm sm:text-base lg:text-lg text-gray-100 mb-3 sm:mb-4">
                    {bhajans[currentSong]?.artist} 
                    {bhajans[currentSong]?.album && ` • ${bhajans[currentSong].album}`}
                  </p>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    disabled={isBuffering}
                    className="bg-white text-orange-600 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-gray-100 transition flex items-center gap-2 text-sm sm:text-base shadow-lg disabled:opacity-50"
                  >
                    {isBuffering ? (
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    ) : isPlaying ? (
                      <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                    {isBuffering ? 'लोड हो रहा है...' : isPlaying ? 'पॉज़' : 'प्ले करें'}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Bhajan List */}
          <section className="mb-8 sm:mb-12">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold">
                {searchQuery ? `खोज परिणाम (${totalCount})` : `सभी भजन (${totalCount})`}
              </h3>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  fetchBhajans(1, '');
                }}
                className="text-xs sm:text-sm text-yellow-100 hover:text-white transition flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                रीफ्रेश करें
              </button>
            </div>

            {bhajans.length === 0 && searchQuery ? (
              <div className="text-center py-12 bg-white bg-opacity-10 rounded-2xl">
                <p className="text-xl mb-2">🔍 कोई परिणाम नहीं मिला</p>
                <p className="text-sm text-gray-200">कृपया अन्य शब्दों से खोजें</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                  {bhajans.map((bhajan, index) => (
                    <div
                      key={bhajan.id}
                      onClick={() => handleSongSelect(index)}
                      className={`bg-red-900 bg-opacity-10 backdrop-blur-sm rounded-lg p-2 sm:p-3 hover:bg-opacity-20 transition cursor-pointer group ${
                        currentSong === index ? 'ring-2 ring-white bg-opacity-30' : ''
                      }`}
                    >
                      <div className="relative mb-2 sm:mb-3">

                        {/* --- MODIFIED --- */}
                        <Image 
                          src="/Dhenu.jpg"
                          alt={bhajan.name} 
                          width={400}
                          height={400}
                          className="w-full aspect-square object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'; // Hide if Dhenu.jpg fails
                          }}
                        />

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSongSelect(index);
                          }}
                          className="absolute bottom-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg"
                        >
                          {currentSong === index && isPlaying ? (
                            <Pause className="w-4 h-4 sm:w-5 sm:h-5" fill="white" />
                          ) : (
                            <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" fill="white" />
                          )}
                        </button>
                      </div>
                      <h4 className="font-semibold text-xs sm:text-sm mb-1 truncate" title={bhajan.name}>
                        {bhajan.name}
                      </h4>
                      <p className="text-xs text-gray-200 truncate" title={bhajan.artist}>
                        {bhajan.artist}
                      </p>
                      <p className="text-xs text-gray-300 mt-1">{bhajan.duration}</p>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-4">
                    <button
                      onClick={handlePrevPage}
                      disabled={!hasPrevPage || isLoadingMore}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-full flex items-center gap-2 transition"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      <span className="hidden sm:inline">पिछला</span>
                    </button>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold bg-white bg-opacity-20 px-4 py-2 rounded-full">
                        पृष्ठ {currentPage} / {totalPages}
                      </span>
                    </div>
                    
                    <button
                      onClick={handleNextPage}
                      disabled={!hasNextPage || isLoadingMore}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-full flex items-center gap-2 transition"
                    >
                      <span className="hidden sm:inline">अगला</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {isLoadingMore && (
                  <div className="mt-8 flex justify-center">
                    <Loader2 className="w-8 h-8 animate-spin" />
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </main>

      {/* Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-amber-900 to-orange-700 backdrop-blur-xl border-t border-yellow-300 shadow-2xl">
        {/* Progress Bar */}
        <div 
          ref={progressBarRef}
          onClick={handleProgressClick}
          className="relative h-1 sm:h-1.5 bg-yellow-200 cursor-pointer group"
        >
          <div
            className="absolute h-full bg-red-600 transition-all"
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
            <div className="flex items-center gap-3">
              
              {/* --- MODIFIED --- */}
              <Image
                src="/Dhenu.jpg"
                alt={bhajans[currentSong]?.name || "Bhajan"}
                width={56}
                height={56}
                className="w-14 h-14 rounded-lg shadow-lg object-cover flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'; // Hide if Dhenu.jpg fails
                }}
              />

              <div className="min-w-0 flex-1">
                <h4 className="font-semibold truncate text-base text-white">
                  {bhajans[currentSong]?.name || 'भजन'}
                </h4>
                <p className="text-sm text-gray-200 truncate">
                  {bhajans[currentSong]?.artist || 'कलाकार'}
                </p>
              </div>
              <button 
                onClick={() => toggleLike(bhajans[currentSong]?.id)}
                className={`transition p-2 flex-shrink-0 ${liked.includes(bhajans[currentSong]?.id) ? 'text-red-400' : 'text-white hover:text-red-400'}`}
              >
                <Heart className="w-6 h-6" fill={liked.includes(bhajans[currentSong]?.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="flex items-center justify-center gap-6">
              <button 
                onClick={handlePrevious}
                className="hover:text-white transition text-gray-200 p-2"
                disabled={bhajans.length === 0}
              >
                <SkipBack className="w-7 h-7" fill="currentColor" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={isBuffering || bhajans.length === 0}
                className="bg-white text-orange-600 w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 transition shadow-xl disabled:opacity-50"
              >
                {isBuffering ? (
                  <Loader2 className="w-7 h-7 animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-7 h-7" fill="currentColor" />
                ) : (
                  <Play className="w-7 h-7 ml-1" fill="currentColor" />
                )}
              </button>
              <button 
                onClick={handleNext}
                className="hover:text-white transition text-gray-200 p-2"
                disabled={bhajans.length === 0}
              >
                <SkipForward className="w-7 h-7" fill="currentColor" />
              </button>
            </div>

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
                  className={`transition p-1 ${isShuffle ? 'text-yellow-300' : 'text-gray-200 hover:text-white'}`}
                >
                  <Shuffle className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsRepeat(!isRepeat)}
                  className={`transition p-1 ${isRepeat ? 'text-yellow-300' : 'text-gray-200 hover:text-white'}`}
                >
                  <Repeat className="w-5 h-5" />
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
            <div className="flex items-center gap-4 flex-1 min-w-0 max-w-xs lg:max-w-sm">

              {/* --- MODIFIED --- */}
              <Image
                src="/Dhenu.jpg"
                alt={bhajans[currentSong]?.name || "Bhajan"}
                width={56}
                height={56}
                className="w-14 h-14 rounded-lg shadow-lg object-cover flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'; // Hide if Dhenu.jpg fails
                }}
              />
              
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold truncate text-base lg:text-lg text-white mb-1">
                  {bhajans[currentSong]?.name || 'भजन'}
                </h4>
                <p className="text-sm lg:text-base text-gray-200 truncate">
                  {bhajans[currentSong]?.artist || 'कलाकार'}
                </p>
              </div>
              <button 
                onClick={() => toggleLike(bhajans[currentSong]?.id)}
                className={`transition p-2 flex-shrink-0 ${liked.includes(bhajans[currentSong]?.id) ? 'text-red-400' : 'text-white hover:text-red-400'}`}
              >
                <Heart className="w-6 h-6" fill={liked.includes(bhajans[currentSong]?.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="flex flex-col items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-4 lg:gap-6">
                <button 
                  onClick={() => setIsShuffle(!isShuffle)}
                  className={`transition p-1 ${isShuffle ? 'text-yellow-300' : 'text-white hover:text-red-400'}`}
                >
                  <Shuffle className="w-5 h-5 lg:w-6 lg:h-6" />
                </button>
                <button 
                  onClick={handlePrevious}
                  disabled={bhajans.length === 0}
                  className="hover:scale-110 transition text-white p-1 disabled:opacity-50"
                >
                  <SkipBack className="w-6 h-6 lg:w-7 lg:h-7" fill="currentColor" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  disabled={isBuffering || bhajans.length === 0}
                  className="bg-white text-orange-600 w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center hover:scale-105 transition shadow-xl disabled:opacity-50"
                >
                  {isBuffering ? (
                    <Loader2 className="w-6 h-6 lg:w-7 lg:h-7 animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="w-6 h-6 lg:w-7 lg:h-7" fill="currentColor" />
                  ) : (
                    <Play className="w-6 h-6 lg:w-7 lg:h-7 ml-0.5" fill="currentColor" />
                  )}
                </button>
                <button 
                  onClick={handleNext}
                  disabled={bhajans.length === 0}
                  className="hover:scale-110 transition text-white p-1 disabled:opacity-50"
                >
                  <SkipForward className="w-6 h-6 lg:w-7 lg:h-7" fill="currentColor" />
                </button>
                <button 
                  onClick={() => setIsRepeat(!isRepeat)}
                  className={`transition p-1 ${isRepeat ? 'text-yellow-300' : 'text-white hover:text-red-400'}`}
                >
                  <Repeat className="w-5 h-5 lg:w-6 lg:h-6" />
                </button>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-200 font-medium">
                <span>{formatTime(currentTime)}</span>
                <div 
                  ref={progressBarRef}
                  onClick={handleProgressClick}
                  className="w-64 lg:w-96 h-1.5 bg-gray-300 rounded-full cursor-pointer group relative"
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

            <div className="flex items-center gap-4 flex-1 justify-end max-w-xs">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="hover:text-red-400 transition text-white p-1"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
              <div 
                ref={volumeBarRef}
                onClick={handleVolumeChange}
                className="w-24 lg:w-32 h-1.5 bg-gray-300 rounded-full cursor-pointer group relative"
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