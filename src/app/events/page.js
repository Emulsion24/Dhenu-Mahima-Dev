'use client'
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Youtube, ChevronDown, Sparkles } from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

import API from '@/lib/api';

export default function AgamiKatha() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get('/events');
      
      if (response.data.success) {
        setEvents(response.data.data);
      } else {
        setError('Failed to load events');
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Unable to load events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const startStr = start.toLocaleDateString('hi-IN', options);
    const endStr = end.toLocaleDateString('hi-IN', options);
    
    return `${startStr} से ${endStr}`;
  };

  const handleYouTubeClick = (url, index) => {
    // Check if URL is valid
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const getChannelName = (url, index) => {
    // Extract channel name from URL or use default names
    if (typeof url === 'string' && url.includes('youtube.com')) {
      if (url.includes('dhenutv') || index === 0) {
        return 'Dhenu TV';
      } else if (url.includes('jevansutra') || index === 1) {
        return 'Jevansutra';
      }
    }
    // Default names based on index
    return index === 0 ? 'Dhenu TV' : 'Jevansutra';
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-br from-orange-5 via-amber-50 to-yellow-50">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-red-500 to-pink-600">
        {/* Animated Background Pattern */}
    
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center text-white">
            {/* Decorative Badge */}
            <div className="inline-flex items-center justify-center gap-2 px-6 py-3 mb-6 bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-xl">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold text-sm uppercase tracking-wider">आध्यात्मिक आयोजन</span>
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 drop-shadow-2xl leading-tight">
              परम पूज्य ग्वाल संत श्री के
            </h1>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-2xl leading-tight bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent">
              आगामी कथा एवं आयोजन
            </h2>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-1 w-16 bg-white/50 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-300 rounded-full animate-pulse"></div>
              <div className="h-1 w-16 bg-white/50 rounded-full"></div>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-orange-50 max-w-3xl mx-auto leading-relaxed font-medium mb-10">
              श्री गौ कृपा कथा और सत्संग कार्यक्रम
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
              <button className="group px-8 py-4 bg-white text-orange-600 rounded-full font-bold text-lg hover:bg-yellow-50 transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                लाइव देखें
                <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={() => {
                  const section = document.getElementById("program-list");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="px-8 py-4 bg-white/20 backdrop-blur-md text-white rounded-full font-bold text-lg hover:bg-white/30 transition-all border-2 border-white/50 shadow-xl flex items-center justify-center gap-2"
              >
                कार्यक्रम सूची
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Wave Decoration */}
        
      </div>

      {/* Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="program-list">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 font-medium text-lg">कार्यक्रम लोड हो रहे हैं...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 max-w-2xl mx-auto mb-12 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="text-4xl">⚠️</div>
              <div>
                <h3 className="text-red-800 font-bold text-lg">त्रुटि</h3>
                <p className="text-red-600 text-sm mt-1">{error}</p>
                <button
                  onClick={fetchEvents}
                  className="mt-3 text-sm bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition-colors font-semibold"
                >
                  पुनः प्रयास करें
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Bar */}
        {!loading && !error && events.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 shadow-xl text-center transform hover:scale-105 transition-transform">
              <div className="text-4xl font-bold mb-2">{events.length}+</div>
              <div className="font-medium opacity-90">कुल आयोजन</div>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-2xl p-6 shadow-xl text-center transform hover:scale-105 transition-transform">
              <div className="text-4xl font-bold mb-2">12+</div>
              <div className="font-medium opacity-90">राज्य</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-amber-500 text-white rounded-2xl p-6 shadow-xl text-center transform hover:scale-105 transition-transform">
              <div className="text-4xl font-bold mb-2">100K+</div>
              <div className="font-medium opacity-90">श्रद्धालु</div>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-pink-500 text-white rounded-2xl p-6 shadow-xl text-center transform hover:scale-105 transition-transform">
              <div className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                LIVE
              </div>
              <div className="font-medium opacity-90">प्रसारण</div>
            </div>
          </div>
        )}

        {/* Event Cards */}
        {!loading && !error && (
          <>
            {events.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
                <Calendar size={80} className="mx-auto text-gray-300 mb-6" />
                <h3 className="text-2xl font-bold text-gray-700 mb-3">
                  कोई आगामी कार्यक्रम नहीं
                </h3>
                <p className="text-gray-500 text-lg">
                  नए कार्यक्रमों के लिए जल्द ही वापस आएं
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {events.map((event, index) => (
                  <div
                    key={event.id}
                    className={`bg-gradient-to-br ${event.color} rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden group transform hover:scale-[1.01]`}
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animation: 'fadeInUp 0.6s ease-out both'
                    }}
                  >
                    <style>{`
                      @keyframes fadeInUp {
                        from {
                          opacity: 0;
                          transform: translateY(30px);
                        }
                        to {
                          opacity: 1;
                          transform: translateY(0);
                        }
                      }
                    `}</style>
                    
                    <div className="bg-white/10 backdrop-blur-sm p-6 md:p-8">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        {/* Left Content */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
                            <div className="flex-shrink-0 inline-flex px-5 py-2 bg-white/30 backdrop-blur-md text-white rounded-full font-bold text-sm shadow-lg border border-white/40">
                              {event.duration}
                            </div>
                            <h3 className="text-2xl md:text-4xl font-bold text-white drop-shadow-2xl leading-tight">
                              {event.title}
                            </h3>
                          </div>

                          <div className="space-y-4 ml-0 lg:ml-2">
                            <div className="flex items-start gap-3 text-white">
                              <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <Calendar className="w-5 h-5 drop-shadow" />
                              </div>
                              <div>
                                <span className="font-semibold block mb-1">दिनांक:</span>
                                <span className="text-lg">{formatDateRange(event.startDate, event.endDate)}</span>
                              </div>
                            </div>

                            {event.time && (
                              <div className="flex items-start gap-3 text-white">
                                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                  <Clock className="w-5 h-5 drop-shadow" />
                                </div>
                                <div>
                                  <span className="font-semibold block mb-1">समय:</span>
                                  <span className="text-lg">{event.time}</span>
                                </div>
                              </div>
                            )}

                            <div className="flex items-start gap-3 text-white">
                              <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <MapPin className="w-5 h-5 drop-shadow" />
                              </div>
                              <div>
                                <span className="font-semibold block mb-1">स्थान:</span>
                                <p className="text-lg">{event.location}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Actions */}
                        <div className="flex flex-col gap-3 lg:items-end lg:min-w-[300px]">
                          {/* YouTube Link Buttons */}
                          {event.liveLinks && event.liveLinks.length > 0 && (
                            <div className="flex flex-col gap-3 w-full">
                              {event.liveLinks.map((link, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleYouTubeClick(link, idx)}
                                  className="group/btn relative flex items-center justify-between gap-3 px-5 py-4 bg-white hover:bg-gray-50 text-gray-800 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all border-2 border-white/50"
                                >
                                  <div className="flex items-center gap-3">
                                    {/* YouTube Logo */}
                                    <div className="relative flex-shrink-0">
                                      <div className="w-11 h-11 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg group-hover/btn:scale-110 transition-transform">
                                        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                        </svg>
                                      </div>
                                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                    </div>
                                    <span className="text-base sm:text-lg font-bold">{getChannelName(link, idx)}</span>
                                  </div>
                                  <svg 
                                    className="w-5 h-5 opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all flex-shrink-0" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </button>
                              ))}
                            </div>
                          )}
                          
                          <button
                            onClick={() => setExpandedCard(expandedCard === event.id ? null : event.id)}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white/30 backdrop-blur-md text-white rounded-xl font-semibold hover:bg-white/40 transition-all shadow-lg border border-white/40"
                          >
                            विवरण देखें
                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${expandedCard === event.id ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {expandedCard === event.id && (
                        <div className="mt-6 pt-6 border-t-2 border-white/30">
                          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl">
                            <h4 className="font-bold text-2xl mb-4 text-white drop-shadow flex items-center gap-2">
                              <Sparkles className="w-6 h-6 text-yellow-300" />
                              कार्यक्रम विवरण
                            </h4>
                            {event.description ? (
                              <p className="text-white text-lg leading-relaxed">{event.description}</p>
                            ) : (
                              <ul className="space-y-3 text-white text-lg">
                                <li className="flex items-center gap-3">
                                  <div className="w-2 h-2 bg-white rounded-full shadow flex-shrink-0"></div>
                                  <span>गौ महिमा कथा एवं सत्संग</span>
                                </li>
                                <li className="flex items-center gap-3">
                                  <div className="w-2 h-2 bg-white rounded-full shadow flex-shrink-0"></div>
                                  <span>लाइव YouTube प्रसारण उपलब्ध</span>
                                </li>
                                <li className="flex items-center gap-3">
                                  <div className="w-2 h-2 bg-white rounded-full shadow flex-shrink-0"></div>
                                  <span>सभी श्रद्धालुओं का स्वागत है</span>
                                </li>
                              </ul>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Enhanced CTA Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-red-500 to-pink-600 text-white py-20 mt-16">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 2px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-full mb-6 border-4 border-white/30">
            <Youtube className="w-10 h-10" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            लाइव कथा देखने के लिए
          </h2>
          <p className="text-xl md:text-2xl text-orange-50 mb-10 font-medium">
            हमारे YouTube चैनल को सब्सक्राइब करें
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <button 
              onClick={() => handleYouTubeClick('https://youtube.com/@dhenutv', 0)}
              className="group flex items-center justify-center gap-3 px-8 py-5 bg-white text-gray-800 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              <div className="w-11 h-11 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <span>Dhenu TV</span>
            </button>
            <button 
              onClick={() => handleYouTubeClick('https://youtube.com/@jevansutra', 1)}
              className="group flex items-center justify-center gap-3 px-8 py-5 bg-white text-gray-800 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              <div className="w-11 h-11 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <span>Jevansutra</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}