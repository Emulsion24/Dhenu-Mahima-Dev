"use client";

import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music2, Volume2, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

const initialAudios = [
  { 
    id: 1, 
    title: "Jeevan Sutra 01", 
    artist: "परम पूज्य ग्वाल संत श्री", 
    date: "13/07/2025", 
    time: "3:50",
    imgSrc: "/images/Heading.png"
  },
  { 
    id: 2, 
    title: "Jeevan Sutra 02", 
    artist: "परम पूज्य ग्वाल संत श्री", 
    date: "14/07/2025", 
    time: "3:50",
    imgSrc: "https://placehold.co/128x128/ea580c/FFFFFF?text=JS2"
  },
  { 
    id: 3, 
    title: "Jeevan Sutra 03", 
    artist: "परम पूज्य ग्वाल संत श्री", 
    date: "15/07/2025", 
    time: "3:50",
    imgSrc: "https://placehold.co/128x128/d97706/FFFFFF?text=JS3"
  },
  { 
    id: 4, 
    title: "Jeevan Sutra 04", 
    artist: "परम पूज्य ग्वाल संत श्री", 
    date: "16/07/2025", 
    time: "3:50",
    imgSrc: "https://placehold.co/128x128/b45309/FFFFFF?text=JS4"
  },
];

const PlayingIcon = () => (
  <div className="flex items-center justify-center w-5 h-5 gap-0.5">
    <span className="w-1 h-2 bg-orange-600 rounded-full animate-[bounce_0.6s_ease-in-out_infinite_0.1s]"></span>
    <span className="w-1 h-3 bg-orange-600 rounded-full animate-[bounce_0.6s_ease-in-out_infinite_0.2s]"></span>
    <span className="w-1 h-4 bg-orange-600 rounded-full animate-[bounce_0.6s_ease-in-out_infinite_0.3s]"></span>
    <span className="w-1 h-3 bg-orange-600 rounded-full animate-[bounce_0.6s_ease-in-out_infinite_0.2s]"></span>
    <span className="w-1 h-2 bg-orange-600 rounded-full animate-[bounce_0.6s_ease-in-out_infinite_0.1s]"></span>
  </div>
);

export default function AudioPlayer() {
  const [audios] = useState(initialAudios);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
   const router = useRouter();
  const currentAudio = audios[currentAudioIndex];
  
  const mostLovedAudios = audios
    .map((audio, index) => ({ ...audio, originalIndex: index }))
    .slice(0, 4);

  const handlePlayPause = (index) => {
    if (currentAudioIndex === index) {
      setIsPlaying(!isPlaying);
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
  const handelViewall=()=>{
   router.push(`/bhajan`); 
  }

  const handlePrev = () => {
    const prevIndex = (currentAudioIndex - 1 + audios.length) % audios.length;
    setCurrentAudioIndex(prevIndex);
    setIsPlaying(true);
  };

  return (
    <div id="music"className="relative overflow-hidden font-sans py-12 lg:py-20 min-h-screen bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600">
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
      {/* Krishna Background - Large Center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <img
          src="/images/kris.svg"
          alt="Krishna Background"
          className="w-64 h-64 lg:w-[500px] lg:h-[500px] object-contain opacity-5"
          style={{ filter: 'invert(17%) sepia(95%) saturate(7471%) hue-rotate(2deg) brightness(92%) contrast(116%)' }}
          onError={(e) => e.currentTarget.style.display = 'none'}
        />
      </div>
      
      {/* Decorative Corners */}
      <div className="absolute top-10 right-10 pointer-events-none z-0 opacity-5">
        <img src="/images/kris.svg" alt="" className="w-24 h-24 lg:w-32 lg:h-32 object-contain"
          style={{ filter: 'invert(17%) sepia(95%) saturate(7471%) hue-rotate(2deg) brightness(92%) contrast(116%)' }}
          onError={(e) => e.currentTarget.style.display = 'none'} />
      </div>
      <div className="absolute bottom-20 left-10 pointer-events-none z-0 opacity-5">
        <img src="/images/kris.svg" alt="" className="w-28 h-28 lg:w-40 lg:h-40 object-contain"
          style={{ filter: 'invert(17%) sepia(95%) saturate(7471%) hue-rotate(2deg) brightness(92%) contrast(116%)' }}
          onError={(e) => e.currentTarget.style.display = 'none'} />
      </div>

      <main className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ">
        {/* Title Banner */}
        <div className="mb-10 lg:mb-16">
  <div className="relative px-8 py-6 flex items-center justify-center gap-4 max-w-3xl mx-auto">
    <svg 
      className="absolute inset-0 w-full h-full" 
      viewBox="0 0 1688 159" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path d="M1504.67 23.3789H844V79.0889H1688C1661.24 78.0941 1601.52 65.5594 1576.68 23.3789C1551.84 -18.8016 1518.32 5.80369 1504.67 23.3789Z" fill="url(#paint0_linear_95_20)"/>
      <path d="M1504.67 23.3789H844V79.0889H1688C1661.24 78.0941 1601.52 65.5594 1576.68 23.3789C1551.84 -18.8016 1518.32 5.80369 1504.67 23.3789Z" fill="url(#paint1_linear_95_20)"/>
      <path d="M1504.67 134.799H844V79.0889H1688C1661.24 80.0837 1601.52 92.6184 1576.68 134.799C1551.84 176.979 1518.32 152.374 1504.67 134.799Z" fill="url(#paint2_linear_95_20)"/>
      <path d="M1504.67 134.799H844V79.0889H1688C1661.24 80.0837 1601.52 92.6184 1576.68 134.799C1551.84 176.979 1518.32 152.374 1504.67 134.799Z" fill="url(#paint3_linear_95_20)"/>
      <path d="M183.335 23.29H844V79H6.10352e-05C26.757 78.0052 86.4811 65.4705 111.322 23.29C136.163 -18.8905 169.681 5.71482 183.335 23.29Z" fill="url(#paint4_linear_95_20)"/>
      <path d="M183.335 135.415H844V79H6.10352e-05C26.757 80.0074 86.4811 92.7008 111.322 135.415C136.163 178.13 169.681 153.213 183.335 135.415Z" fill="url(#paint5_linear_95_20)"/>
      <defs>
        <linearGradient id="paint0_linear_95_20" x1="844" y1="39.5889" x2="1688" y2="39.5889" gradientUnits="userSpaceOnUse">
          <stop stopColor="#571710"/>
          <stop offset="1" stopColor="#732812"/>
        </linearGradient>
        <linearGradient id="paint1_linear_95_20" x1="844" y1="39.5889" x2="1688" y2="39.5889" gradientUnits="userSpaceOnUse">
          <stop offset="0.370192" stopColor="#EE6C1B"/>
          <stop offset="1" stopColor="#891313"/>
        </linearGradient>
        <linearGradient id="paint2_linear_95_20" x1="844" y1="118.589" x2="1688" y2="118.589" gradientUnits="userSpaceOnUse">
          <stop stopColor="#571710"/>
          <stop offset="1" stopColor="#737373"/>
        </linearGradient>
        <linearGradient id="paint3_linear_95_20" x1="844" y1="118.589" x2="1688" y2="118.589" gradientUnits="userSpaceOnUse">
          <stop offset="0.370192" stopColor="#EE6C1B"/>
          <stop offset="1" stopColor="#891313"/>
        </linearGradient>
        <linearGradient id="paint4_linear_95_20" x1="844" y1="39.5" x2="0" y2="39.5" gradientUnits="userSpaceOnUse">
          <stop offset="0.370192" stopColor="#EE6C1B"/>
          <stop offset="1" stopColor="#891313"/>
        </linearGradient>
        <linearGradient id="paint5_linear_95_20" x1="844" y1="119" x2="0" y2="119" gradientUnits="userSpaceOnUse">
          <stop offset="0.370192" stopColor="#EE6C1B"/>
          <stop offset="1" stopColor="#891313"/>
        </linearGradient>
      </defs>
    </svg>
    
    <img src="/images/Heading.png" alt="" className="relative z-10 w-20 h-20 lg:w-20 lg:h-20"
       style={{ 
        filter: 'brightness(0) invert(1)', 
        transform: 'rotate(180deg) scaleY(-1)' 
        }}
      onError={(e) => e.currentTarget.style.display = 'none'} />
    <h1 className="relative z-10 text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide text-center drop-shadow-lg">
      जीवन सूत्र सत्संग एवं भजन
    </h1>
    <img src="/images/Heading.png" alt="" className="relative z-10 w-20 h-20 lg:w-20 lg:h-20"
      style={{ filter: 'brightness(0) invert(1)' }}
      onError={(e) => e.currentTarget.style.display = 'none'} />
  </div>
</div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {/* Player Card - Glassmorphism */}
          <div className="backdrop-blur-xl bg-white/50 rounded-3xl shadow-2xl p-8 lg:p-10 border border-white/60">
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <img
                  src="/images/Heading.png"
                  alt="/images/Heading.png"
                  className="w-48 h-48 lg:w-56 lg:h-56 rounded-3xl shadow-2xl ring-4 ring-white/70 transition-transform group-hover:scale-105"
                />
                <div className="absolute -bottom-4 -right-4 backdrop-blur-md bg-white/60 rounded-full p-3 shadow-xl border border-white/70">
                  
                </div>
              </div>
            </div>
            
            <div className="text-center mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{currentAudio.title}</h2>
              <p className="text-base lg:text-lg text-gray-800">{currentAudio.artist}</p>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-800 mb-3 font-semibold">
                <span>1:25</span>
                <span>{currentAudio.time}</span>
              </div>
              <div className="relative w-full backdrop-blur-sm bg-white/60 h-2 rounded-full cursor-pointer group border border-white/50">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 w-1/3 h-2 rounded-full"></div>
                <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg border-2 border-orange-500 transition-transform group-hover:scale-125"></div>
              </div>
            </div>

            <div className="flex justify-center items-center gap-6 mb-6">
              <button onClick={handlePrev} className="text-gray-800 hover:text-orange-600 transition-all hover:scale-110">
                <SkipBack size={32} />
              </button>
              <button 
                onClick={() => handlePlayPause(currentAudioIndex)} 
                className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-2xl hover:shadow-orange-400 transition-all hover:scale-110 active:scale-95"
              >
                {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
              </button>
              <button onClick={handleNext} className="text-gray-800 hover:text-orange-600 transition-all hover:scale-110">
                <SkipForward size={32} />
              </button>
            </div>
            
            <div className="flex justify-between items-center px-4">
              <button className="text-gray-800 hover:text-orange-600 transition">
                <Volume2 size={24} />
              </button>
              <button className="text-gray-800 hover:text-orange-600 transition">
                <Music2 size={24} />
              </button>
            </div>
          </div>

          {/* Playlist Card - Glassmorphism */}
          <div className="backdrop-blur-xl bg-white/50 rounded-3xl shadow-2xl p-8 lg:p-10 border border-white/60">
            
            <div className="flex items-center justify-between mb-8">
              <Heart className="text-red-500 " size={24} />
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Most Loved Bhajans</h3>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-full">
                <Music2 className="text-white" size={24} />
              </div>
            </div>
            
            <div className="space-y-3 mb-8">
              {mostLovedAudios.map((audio) => (
                <div
                  key={audio.id}
                  className={`flex justify-between items-center p-4 cursor-pointer rounded-2xl transition-all duration-300 border ${
                    audio.originalIndex === currentAudioIndex
                      ? 'backdrop-blur-md bg-white/70 shadow-lg scale-105 border-white/80'
                      : 'backdrop-blur-sm bg-white/40 hover:bg-white/60 hover:scale-102 border-white/50'
                  }`}
                  onClick={() => handlePlayPause(audio.originalIndex)}
                >
                  <div className="flex items-center gap-4">
                    <img src="/images/Heading.png" alt="/images/Heading.png" className="w-16 h-16 rounded-xl shadow-md"/>
                    <div>
                      <h4 className="font-bold text-gray-900 text-base lg:text-lg">{audio.title}</h4>
                      <span className="text-sm text-gray-800">{audio.date}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-gray-800 hidden sm:block">{audio.time}</span>
                    {isPlaying && audio.originalIndex === currentAudioIndex ? (
                      <PlayingIcon />
                    ) : (
                      <button className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center hover:scale-110 transition-all shadow-md">
                        <Play size={18} fill="currentColor" className="ml-0.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button onClick ={ ()=>handelViewall()} className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white font-semibold py-4 px-6 rounded-2xl hover:shadow-2xl hover:shadow-orange-400 transition-all flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] text-base relative overflow-hidden group border-2 border-orange-400">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <Music2 size={22} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" strokeWidth={2} />
              <span className="relative z-10">View All Bhajans</span>
              <svg className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}