"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music2, Volume2, Heart } from 'lucide-react';
import API from '@/lib/api';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const PlayingIcon = () => (
  <div className="flex items-center justify-center w-5 h-5 gap-0.5">
    <span className="w-1 h-2 bg-orange-600 rounded-full animate-bounce"></span>
    <span className="w-1 h-3 bg-orange-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
    <span className="w-1 h-4 bg-orange-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
    <span className="w-1 h-3 bg-orange-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
    <span className="w-1 h-2 bg-orange-600 rounded-full animate-bounce"></span>
  </div>
);

export default function AudioPlayer() {
  const [audios, setAudios] = useState([]);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [audioError, setAudioError] = useState(null);
  
  const audioRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    fetchBhajans();
  }, []);

  const fetchBhajans = async () => {
    try {
      setLoading(true);
      // Fetch latest 5 bhajans for homepage
      const response = await API.get('/jevansutra/latest?limit=5');
      
      if (response.data && response.data.data && response.data.data.length > 0) {
        const latestBhajans = response.data.data.map(bhajan => ({
          id: bhajan.id,
          title: bhajan.name,
          artist: bhajan.artist,
          album: bhajan.album || 'Unknown Album',
          duration: bhajan.duration || '0:00',
          imgSrc: '/Dhenu.jpg',
          audioUrl: bhajan.audioUrl,
          date: new Date(bhajan.createdAt).toLocaleDateString('en-GB')
        }));
        setAudios(latestBhajans);
      } else {
        setAudios([
          { 
            id: 1, 
            title: "Jeevan Sutra 01", 
            artist: "परम पूज्य ग्वाल संत श्री", 
            date: "13/07/2025", 
            duration: "3:50",
            imgSrc: "/Dhenu.jpg",
            audioUrl: "/uploads/audio/sample.mp3"
          }
        ]);
      }
    } catch {
      setAudios([
        { 
          id: 1, 
          title: "Jeevan Sutra 01", 
          artist: "परम पूज्य ग्वाल संत श्री", 
          date: "13/07/2025", 
          duration: "3:50",
          imgSrc: "/Dhenu.jpg",
          audioUrl: "/uploads/audio/sample.mp3"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.crossOrigin = 'anonymous';
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setAudioError(null);
    };

    const handleEnded = () => {
      const nextIndex = (currentAudioIndex + 1) % audios.length;
      setCurrentAudioIndex(nextIndex);
      setIsPlaying(true);
    };

    const handleError = () => {
      setAudioError('Failed to load audio');
      setIsPlaying(false);
    };

    const handleCanPlay = () => {
      setAudioError(null);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.pause();
      audio.src = '';
    };
  }, [audios.length, currentAudioIndex]);

  useEffect(() => {
    if (audios.length > 0 && audioRef.current) {
      const currentAudio = audios[currentAudioIndex];
      if (currentAudio && currentAudio.audioUrl) {
        setAudioError(null);
        
        let audioUrl;
        const urlParts = currentAudio.audioUrl.split('/');
        const filename = urlParts[urlParts.length - 1];
        audioUrl = `${NEXT_PUBLIC_API_URL}/jevansutra/audio/stream/${filename}`;
        
        audioRef.current.src = audioUrl;
        audioRef.current.load();
        
        if (isPlaying) {
          audioRef.current.play().catch(() => {
            setIsPlaying(false);
            setAudioError('Failed to play audio. Please try again.');
          });
        }
      }
    }
  }, [currentAudioIndex, audios, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const currentAudio = audios[currentAudioIndex];

  const handlePlayPause = (index) => {
    if (!audioRef.current) return;

    if (currentAudioIndex === index) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setAudioError(null);
          })
          .catch(() => {
            setIsPlaying(false);
            setAudioError('Failed to play audio. Please try again.');
          });
      }
    } else {
      setCurrentAudioIndex(index);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    const nextIndex = (currentAudioIndex + 1) % audios.length;
    setCurrentAudioIndex(nextIndex);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    const prevIndex = (currentAudioIndex - 1 + audios.length) % audios.length;
    setCurrentAudioIndex(prevIndex);
    setIsPlaying(true);
  };

  const handleProgressClick = (e) => {
    if (audioRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = percent * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleViewAll = () => {
    router.push('/bhajan');
  };

  if (loading) {
    return (
      <div className="relative overflow-hidden font-sans py-12 lg:py-20 min-h-screen bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold">Loading Bhajans...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="music" className="relative overflow-hidden font-sans py-8 sm:py-12 lg:py-20 min-h-screen bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600">
      <div className="absolute bottom-0 left-0 right-0 rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#fffbeb" opacity="0.3"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#fffbeb" opacity="0.5"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#fffbeb" opacity="0.7"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#fffbeb"></path>
        </svg>
      </div>

      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#fffbeb" opacity="0.3"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#fffbeb" opacity="0.5"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#fffbeb" opacity="0.7"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#fffbeb"></path>
        </svg>
      </div>

      <main className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8 lg:mb-12">
          <div className="flex items-center justify-center gap-2 sm:gap-4 px-4">
            <Music2 className="text-white w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex-shrink-0" />
            <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-wide text-center drop-shadow-lg">
              जीवन सूत्र सत्संग एवं भजन
            </h1>
            <Music2 className="text-white w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex-shrink-0" />
          </div>
        </div>

        {audioError && (
          <div className="mb-4 bg-red-500 bg-opacity-20 backdrop-blur-sm border border-red-300 rounded-lg p-3 sm:p-4 max-w-6xl mx-auto">
            <p className="text-white font-semibold text-center text-sm sm:text-base">{audioError}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          <div className="backdrop-blur-xl bg-white/50 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-white/60">
            <div className="flex flex-col items-center mb-6 sm:mb-8">
              <div className="relative group">
                <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-3xl shadow-2xl ring-4 ring-white/70 transition-transform group-hover:scale-105 overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  {currentAudio?.imgSrc ? (
                    <img
                      src={currentAudio.imgSrc}
                      alt={currentAudio.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : null}
                  <Music2 className="text-white w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24" style={{display: currentAudio?.imgSrc ? 'none' : 'block'}} />
                </div>
                <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 backdrop-blur-md bg-white/60 rounded-full p-2 sm:p-3 shadow-xl border border-white/70">
                  <Music2 className="text-orange-600" size={20} />
                </div>
              </div>
            </div>
            
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 px-2">{currentAudio?.title || 'No Bhajan Selected'}</h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-800 px-2">{currentAudio?.artist || 'Unknown Artist'}</p>
            </div>
            
            <div className="mb-4 sm:mb-6">
              <div className="flex justify-between text-xs sm:text-sm text-gray-800 mb-2 sm:mb-3 font-semibold px-1">
                <span>{formatTime(currentTime)}</span>
                <span>{currentAudio?.duration || formatTime(duration)}</span>
              </div>
              <div 
                className="relative w-full backdrop-blur-sm bg-white/60 h-2 rounded-full cursor-pointer group border border-white/50"
                onClick={handleProgressClick}
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                ></div>
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full shadow-lg border-2 border-orange-500 transition-transform group-hover:scale-125"
                  style={{ left: `${progressPercent}%`, transform: `translateX(-50%) translateY(-50%)` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-center items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
              <button onClick={handlePrev} className="text-gray-800 hover:text-orange-600 transition-all hover:scale-110 touch-manipulation" aria-label="Previous">
                <SkipBack size={28} className="sm:w-8 sm:h-8" />
              </button>
              <button 
                onClick={() => handlePlayPause(currentAudioIndex)} 
                className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-2xl hover:shadow-orange-400 transition-all hover:scale-110 active:scale-95 touch-manipulation"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={28} fill="currentColor" className="sm:w-8 sm:h-8" /> : <Play size={28} fill="currentColor" className="ml-1 sm:w-8 sm:h-8" />}
              </button>
              <button onClick={handleNext} className="text-gray-800 hover:text-orange-600 transition-all hover:scale-110 touch-manipulation" aria-label="Next">
                <SkipForward size={28} className="sm:w-8 sm:h-8" />
              </button>
            </div>
            
            <div className="flex justify-between items-center px-2 sm:px-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <Volume2 size={20} className="text-gray-800 sm:w-6 sm:h-6" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-20 sm:w-32 accent-orange-600 cursor-pointer"
                  aria-label="Volume"
                />
              </div>
              <Heart size={20} className="text-red-500 sm:w-6 sm:h-6" />
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/50 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-white/60">
            <div className="flex items-center justify-between mb-6 sm:mb-8 gap-2">
              
         
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 sm:p-3 rounded-full flex-shrink-0">
                <Music2 className="text-white" size={20} />
              </div>
            </div>
            
            <div className="space-y-3 mb-6 sm:mb-8 max-h-[400px] sm:max-h-[450px] overflow-y-auto">
              {audios.map((audio, index) => (
                <div
                  key={audio.id}
                  className={`flex justify-between items-center p-3 sm:p-4 cursor-pointer rounded-2xl transition-all duration-300 border touch-manipulation ${
                    index === currentAudioIndex
                      ? 'backdrop-blur-md bg-white/70 shadow-lg scale-105 border-white/80'
                      : 'backdrop-blur-sm bg-white/40 hover:bg-white/60 hover:scale-102 border-white/50 active:bg-white/70'
                  }`}
                  onClick={() => handlePlayPause(index)}
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl shadow-md overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600 flex-shrink-0">
                      <img 
                        src={audio.imgSrc} 
                        alt={audio.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg truncate">{audio.title}</h4>
                      <span className="text-xs sm:text-sm text-gray-800">{audio.date}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 ml-2">
                    <span className="text-xs sm:text-sm font-bold text-gray-800 hidden sm:block">{audio.duration}</span>
                    {isPlaying && index === currentAudioIndex ? (
                      <PlayingIcon />
                    ) : (
                      <button className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center hover:scale-110 transition-all shadow-md touch-manipulation" aria-label="Play">
                        <Play size={16} fill="currentColor" className="ml-0.5 sm:w-5 sm:h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={handleViewAll}
              className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl hover:shadow-2xl hover:shadow-orange-400 transition-all flex items-center justify-center gap-2 sm:gap-3 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base relative overflow-hidden group border-2 border-orange-400 touch-manipulation"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <Music2 size={20} className="relative z-10 group-hover:rotate-12 transition-transform duration-300 sm:w-6 sm:h-6" strokeWidth={2} />
              <span className="relative z-10">View All Jevansutra</span>
              <svg className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}