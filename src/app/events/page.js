'use client'
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Youtube, Play, ChevronDown, Link } from 'lucide-react';
import Footer from '@/components/Footer';
import Headers from '@/components/Header';
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

  return (
    <>
    <Headers/>
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center p-3 mb-6 bg-white/20 backdrop-blur-md rounded-full">
            
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              ग्वाल संत श्री के
            </h1>
            <h2 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg">
              आगामी कथा एवं आयोजन
            </h2>
            <p className="text-xl md:text-2xl text-orange-50 max-w-3xl mx-auto leading-relaxed">
              श्री गौ कृपा कथा और सत्संग कार्यक्रम
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-white text-orange-600 rounded-full font-bold text-lg hover:bg-orange-50 transition-all transform hover:scale-105 shadow-2xl">
                लाइव देखें
              </button>
              <button
                onClick={() => {
                  const section = document.getElementById("program-list");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="px-8 py-4 bg-orange-500/30 backdrop-blur-sm text-white rounded-full font-bold text-lg hover:bg-orange-500/40 transition-all border-2 border-white/40 shadow-xl"
              >
                कार्यक्रम सूची
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative wave */}
      </div>

      {/* Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="program-list">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 font-medium">कार्यक्रम लोड हो रहे हैं...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-2xl mx-auto mb-12">
            <div className="flex items-center space-x-3">
              <div className="text-red-500">⚠️</div>
              <div>
                <h3 className="text-red-800 font-semibold">त्रुटि</h3>
                <p className="text-red-600 text-sm mt-1">{error}</p>
                <button
                  onClick={fetchEvents}
                  className="mt-3 text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
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
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center transform hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-orange-600 mb-2">{events.length}+</div>
              <div className="text-gray-600 font-medium">कुल आयोजन</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center transform hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-amber-600 mb-2">12+</div>
              <div className="text-gray-600 font-medium">राज्य</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center transform hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-yellow-600 mb-2">100K+</div>
              <div className="text-gray-600 font-medium">श्रद्धालु</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center transform hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-red-600 mb-2">LIVE</div>
              <div className="text-gray-600 font-medium">प्रसारण</div>
            </div>
          </div>
        )}

        {/* Event Cards */}
        {!loading && !error && (
          <>
            {events.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  कोई आगामी कार्यक्रम नहीं
                </h3>
                <p className="text-gray-500">
                  नए कार्यक्रमों के लिए जल्द ही वापस आएं
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {events.map((event, index) => (
                  <div
                    key={event.id}
                    className={`bg-gradient-to-br ${event.color} rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:scale-[1.02]`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="bg-white/10 backdrop-blur-sm p-6 md:p-8">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        {/* Left Content */}
                        <div className="flex-1">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="flex-shrink-0 px-4 py-2 bg-white/30 backdrop-blur-md text-white rounded-full font-bold text-sm shadow-lg">
                              {event.duration}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                              {event.title}
                            </h3>
                          </div>

                          <div className="space-y-3 ml-0 lg:ml-4">
                            <div className="flex items-center gap-3 text-white">
                              <Calendar className="w-5 h-5 flex-shrink-0 drop-shadow" />
                              <span className="font-semibold">दिनांक:</span>
                              <span className="text-lg">{formatDateRange(event.startDate, event.endDate)}</span>
                            </div>

                            {event.time && (
                              <div className="flex items-center gap-3 text-white">
                                <Clock className="w-5 h-5 flex-shrink-0 drop-shadow" />
                                <span className="font-semibold">समय:</span>
                                <span className="text-lg">{event.time}</span>
                              </div>
                            )}

                            <div className="flex items-start gap-3 text-white">
                              <MapPin className="w-5 h-5 flex-shrink-0 mt-1 drop-shadow" />
                              <div>
                                <span className="font-semibold">स्थान:</span>
                                <p className="text-lg mt-1">{event.location}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Actions */}
                        <div className="flex flex-col gap-3 lg:items-end">
                          {event.liveLinks && event.liveLinks.length > 0 && event.liveLinks.map((link, idx) => (
                            <button
                              key={idx}
                              className="flex items-center gap-2 px-6 py-3 bg-white/30 backdrop-blur-md text-white rounded-full font-bold shadow-lg hover:bg-white/40 hover:shadow-xl transform hover:scale-105 transition-all border border-white/40"
                            >
                              <Youtube className="w-5 h-5" />
                              {link}
                            </button>
                          ))}
                          <button
                            onClick={() => setExpandedCard(expandedCard === event.id ? null : event.id)}
                            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-800 rounded-full font-semibold hover:bg-white/90 transition-all shadow-lg"
                          >
                            विवरण देखें
                            <ChevronDown className={`w-4 h-4 transition-transform ${expandedCard === event.id ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {expandedCard === event.id && (
                        <div className="mt-6 pt-6 border-t border-white/30 animate-in fade-in slide-in-from-top-4 duration-300">
                          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
                            <h4 className="font-bold text-xl mb-3 text-white drop-shadow">कार्यक्रम विवरण</h4>
                            {event.description ? (
                              <p className="text-white mb-4">{event.description}</p>
                            ) : (
                              <ul className="space-y-2 text-white">
                                <li className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-white rounded-full shadow"></div>
                                  <span>गौ महिमा कथा एवं सत्संग</span>
                                </li>
                                <li className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-white rounded-full shadow"></div>
                                  <span>लाइव YouTube प्रसारण उपलब्ध</span>
                                </li>
                                <li className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-white rounded-full shadow"></div>
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

      {/* CTA Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 text-white py-20 mt-12">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 2px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <Youtube className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            लाइव कथा देखने के लिए
          </h2>
          <p className="text-xl md:text-2xl text-orange-50 mb-8">
            हमारे YouTube चैनल को सब्सक्राइब करें
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-white text-orange-600 rounded-full font-bold text-lg hover:bg-orange-50 transition-all shadow-2xl flex items-center justify-center gap-2">
              <Youtube className="w-6 h-6" />
              Dhenu TV
            </button>
            <button className="px-10 py-4 bg-orange-500/30 backdrop-blur-sm text-white rounded-full font-bold text-lg hover:bg-orange-500/40 transition-all border-2 border-white/40 shadow-xl">
              अधिसूचना प्राप्त करें
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#fffbeb" opacity="0.3"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#fffbeb" opacity="0.5"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#fffbeb" opacity="0.7"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#fffbeb"></path>
        </svg>
      </div>
    </div>
    <Footer/>
    </>
  );
}