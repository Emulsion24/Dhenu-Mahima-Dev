"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  Repeat, Shuffle, Heart, MoreVertical, Search, Home, Library,
  Clock, List, Music, TrendingUp, Flame
} from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/Header';

export default function BhajanMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(137);
  const [duration, setDuration] = useState(245);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState('explore');
  const [currentSong, setCurrentSong] = useState(0);
const bhajans = [
  {
    id: 1,
    title: "हरे कृष्ण हरे राम",
    artist: "अनूप जलोटा",
    album: "भक्ति संगीत",
    duration: "4:05",
    thumbnail: "images/1.png",
    views: "2.5M"
  },
  {
    id: 2,
    title: "ॐ जय जगदीश हरे",
    artist: "हरिहरण",
    album: "आरती संग्रह",
    duration: "5:20",
    thumbnail: "images/1.png",
    views: "1.8M"
  },
  {
    id: 3,
    title: "शिव शंभो महादेव",
    artist: "जसपाल सिंह",
    album: "महाशिवरात्रि विशेष",
    duration: "6:15",
    thumbnail: "images/1.png",
    views: "3.2M"
  },
  {
    id: 4,
    title: "राधे राधे गोविंद गोपाल",
    artist: "देवी चित्रलेखा",
    album: "राधा भजन",
    duration: "4:45",
    thumbnail: "images/1.png",
    views: "1.2M"
  },
  {
    id: 5,
    title: "हनुमान चालीसा",
    artist: "गुलशन कुमार",
    album: "भक्ति गीत",
    duration: "8:30",
    thumbnail: "images/1.png",
    views: "5.6M"
  },
  {
    id: 6,
    title: "ऐसी लागी लगन",
    artist: "मीरा बाई",
    album: "मीरा भजन",
    duration: "5:50",
    thumbnail: "images/1.png",
    views: "980K"
  }
];

const playlists = [
  { 
    name: "भक्ति संगीत", 
    count: "45 भजन", 
    thumbnail: "https://cdn.pixabay.com/photo/2017/01/20/00/30/temple-1996540_1280.jpg" 
  },
  { 
    name: "सुबह की आरती", 
    count: "20 भजन", 
    thumbnail: "https://cdn.pixabay.com/photo/2017/06/28/20/28/temple-2450464_1280.jpg" 
  },
  { 
    name: "शिव भजन", 
    count: "30 भजन", 
    thumbnail: "https://cdn.pixabay.com/photo/2017/03/01/15/45/shiva-2119364_1280.jpg" 
  },
  { 
    name: "कृष्ण भजन", 
    count: "35 भजन", 
    thumbnail: "https://images.unsplash.com/photo-1652626627227-acc5ce198876?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
  }
];
const router=useRouter();
const handelHome=()=>{
   router.push("/")

}
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = (currentTime / duration) * 100;

  return (
    <>
   
    <div className="h-screen bg-gradient-to-r from-yellow-400 to-orange-500 text-white flex flex-col">
    
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-800 to-orange-500 bg-opacity-95 backdrop-blur-md border-b border-yellow-300 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-8">
           

            <nav className="hidden md:flex items-center gap-6">
              <Image
              src="/logo/logo5.webp"
              width={150}
              height={150}
              alt="LOGO"
               onClick={handelHome}
              />
             
              {[
                { key: 'home', label: 'धेनु महिमा', icon: Home },
                { key: 'explore', label: 'जीवन सूत्र', icon: TrendingUp },
                { key: 'library', label: 'लाइब्रेरी', icon: Library }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => {
  setActiveTab(tab.key);
  if (tab.key === "home") {
    handelHome(); // ✅ navigate to "/"
  }
}}
                    
       
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition 
                      ${activeTab === tab.key
                        ? 'bg-white text-black'
                        : 'hover:bg-white hover:bg-opacity-20'}`}
                        
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-700" />
              <input
                type="text"
                placeholder="भजन खोजें..."
                className="bg-white bg-opacity-20 rounded-full pl-10 pr-4 py-2 w-80 focus:outline-none focus:bg-opacity-30 text-black placeholder-gray-700"
              />
            </div>
           
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Featured Section */}
          <section className="mb-12">
            <div className="relative h-80 rounded-2xl overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg">
              <div className="absolute inset-0  bg-opacity-20"></div>
              <Image 
              src="/banner/musicbanner.JPG"
              fill
              alt="Fill Image"
              
              />
              <div className="relative h-full flex items-end p-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Flame className="w-6 h-6 text-yellow-300" />
                    <span className="text-sm font-semibold">ट्रेंडिंग नाउ</span>
                  </div>
                  <h2 className="text-5xl font-bold mb-4 drop-shadow-lg">{bhajans[currentSong].title}</h2>
                  <p className="text-lg text-gray-100 mb-4">{bhajans[currentSong].artist} • {bhajans[currentSong].views} views</p>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition flex items-center gap-2"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    {isPlaying ? 'पॉज़' : 'प्ले करें'}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Picks */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6 ">
              <h3 className="text-2xl font-bold">क्विक पिक्स</h3>
              <button className="text-sm text-yellow-100 hover:text-white transition">सभी देखें</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ">
              {bhajans.map((bhajan, index) => (
                <div
                  key={bhajan.id}
                  onClick={() => setCurrentSong(index)}
                  className="bg-amber-950 bg-opacity-10 rounded-lg p-3 hover:bg-opacity-20 transition cursor-pointer group"
                >
                  <div className="relative mb-3">
                    <img src={bhajan.thumbnail} alt={bhajan.title} className="w-full aspect-square object-cover rounded-lg" />
                    <button className="absolute bottom-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <Play className="w-5 h-5 ml-0.5" fill="white" />
                    </button>
                  </div>
                  <h4 className="font-semibold text-sm mb-1 truncate">{bhajan.title}</h4>
                  <p className="text-xs text-gray-300 truncate">{bhajan.artist}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-800 text-orange-400 backdrop-blur-xl border-t border-yellow-300">
        <div className="relative h-1 bg-yellow-200 cursor-pointer group">
          <div
            className="absolute h-full bg-red-700 transition-all"
            style={{ width: `${progressPercent}%` }}
          ></div>
          <div
            className="absolute w-3 h-3 bg-white rounded-full top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition"
            style={{ left: `${progressPercent}%` }}
          ></div>
        </div>

        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Current Song Info */}
            <div className="flex items-center gap-4 flex-1">
              <img
                src={bhajans[currentSong].thumbnail}
                alt={bhajans[currentSong].title}
                className="w-14 h-14 rounded-lg"
              />
              <div className="max-w-xs">
                <h4 className="font-semibold truncate">{bhajans[currentSong].title}</h4>
                <p className="text-sm text-gray-800 truncate">{bhajans[currentSong].artist}</p>
              </div>
              <button className="hover:text-red-700 transition">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Player Controls */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="flex items-center gap-4">
                <button className="hover:text-red-700 transition">
                  <Shuffle className="w-5 h-5" />
                </button>
                <button className="hover:scale-110 transition">
                  <SkipBack className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <button className="hover:scale-110 transition">
                  <SkipForward className="w-6 h-6" />
                </button>
                <button className="hover:text-red-700 transition">
                  <Repeat className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-800">
                <span>{formatTime(currentTime)}</span>
                <span>/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Volume Controls */}
            <div className="flex items-center gap-3 flex-1 justify-end">
              <button className="hover:text-red-700 transition">
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="hover:text-red-700 transition"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <div className="w-24 h-1 bg-gray-400 rounded-full cursor-pointer group">
                <div
                  className="h-full bg-black rounded-full transition-all"
                  style={{ width: `${isMuted ? 0 : volume}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </>
  );
}
