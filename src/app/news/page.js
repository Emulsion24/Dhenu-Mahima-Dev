'use client'
import React, { useState } from 'react';
import { Search, Calendar, Eye, User, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import Footer from '@/components/Footer';
import Headers from '@/components/Header';

const DainikSamachar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const newsPerPage = 6;

  const allNews = [
    {
      id: 1,
      title: "भारत में कृत्रिम बुद्धिमत्ता का भविष्य उज्ज्वल",
      excerpt: "तकनीक के क्षेत्र में AI की नई क्रांति, भारतीय कंपनियां कर रही हैं बड़े निवेश",
      category: "Technology",
      categoryHindi: "तकनीक",
      author: "राजेश कुमार",
      date: "2025-10-05",
      views: 2543,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop"
    },
    {
      id: 2,
      title: "जलवायु परिवर्तन: अब कार्रवाई का समय",
      excerpt: "वैज्ञानिकों ने चेतावनी दी है कि अगले 10 वर्षों में तत्काल कदम उठाने की आवश्यकता है",
      category: "Environment",
      categoryHindi: "पर्यावरण",
      author: "प्रिया शर्मा",
      date: "2025-10-04",
      views: 1876,
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=500&fit=crop"
    },
    {
      id: 3,
      title: "भारतीय अर्थव्यवस्था में तेजी की उम्मीद",
      excerpt: "विश्व बैंक ने भारत की GDP वृद्धि दर 7.5% रहने का अनुमान लगाया",
      category: "Business",
      categoryHindi: "व्यापार",
      author: "अमित पटेल",
      date: "2025-10-04",
      views: 3421,
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop"
    },
    {
      id: 4,
      title: "ऑनलाइन शिक्षा में नए आयाम",
      excerpt: "डिजिटल शिक्षा प्लेटफॉर्म ने ग्रामीण क्षेत्रों में शिक्षा की पहुंच बढ़ाई",
      category: "Education",
      categoryHindi: "शिक्षा",
      author: "सुनीता देवी",
      date: "2025-10-03",
      views: 1654,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop"
    },
    {
      id: 5,
      title: "भारतीय खेल में स्वर्णिम युग",
      excerpt: "युवा खिलाड़ियों ने अंतरराष्ट्रीय मंच पर लहराया तिरंगा",
      category: "Sports",
      categoryHindi: "खेल",
      author: "विकास वर्मा",
      date: "2025-10-03",
      views: 2987,
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=500&fit=crop"
    },
    {
      id: 6,
      title: "स्वास्थ्य सेवाओं में सुधार की नई पहल",
      excerpt: "सरकार ने ग्रामीण इलाकों में मुफ्त स्वास्थ्य सेवाएं शुरू करने की घोषणा की",
      category: "Health",
      categoryHindi: "स्वास्थ्य",
      author: "डॉ. अनिता सिंह",
      date: "2025-10-02",
      views: 2134,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop"
    },
    {
      id: 7,
      title: "स्मार्ट सिटी प्रोजेक्ट में तेजी",
      excerpt: "100 शहरों को स्मार्ट बनाने की योजना में महत्वपूर्ण प्रगति",
      category: "Technology",
      categoryHindi: "तकनीक",
      author: "संजय मेहता",
      date: "2025-10-02",
      views: 1923,
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=500&fit=crop"
    },
    {
      id: 8,
      title: "नवीकरणीय ऊर्जा में भारत अग्रणी",
      excerpt: "सौर ऊर्जा उत्पादन में भारत ने हासिल किया नया मील का पत्थर",
      category: "Environment",
      categoryHindi: "पर्यावरण",
      author: "रवि गुप्ता",
      date: "2025-10-01",
      views: 1567,
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop"
    },
    {
      id: 9,
      title: "स्टार्टअप इंडिया में नई ऊंचाई",
      excerpt: "भारतीय स्टार्टअप्स ने 2025 में रिकॉर्ड फंडिंग प्राप्त की",
      category: "Business",
      categoryHindi: "व्यापार",
      author: "नीरज शर्मा",
      date: "2025-10-01",
      views: 2876,
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=500&fit=crop"
    },
    {
      id: 10,
      title: "डिजिटल इंडिया: सफलता की नई कहानी",
      excerpt: "ग्रामीण भारत में इंटरनेट पहुंच 80% तक पहुंची",
      category: "Technology",
      categoryHindi: "तकनीक",
      author: "कविता राव",
      date: "2025-09-30",
      views: 3241,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop"
    },
    {
      id: 11,
      title: "महिला सशक्तिकरण में नए कदम",
      excerpt: "सरकारी योजनाओं से महिला उद्यमियों को मिल रहा बढ़ावा",
      category: "Social",
      categoryHindi: "सामाजिक",
      author: "मीना देसाई",
      date: "2025-09-30",
      views: 1987,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=500&fit=crop"
    },
    {
      id: 12,
      title: "भारतीय रेलवे का आधुनिकीकरण",
      excerpt: "वंदे भारत ट्रेनों का विस्तार, 50 नए रूट्स पर दौड़ेंगी ट्रेनें",
      category: "Transport",
      categoryHindi: "परिवहन",
      author: "अरुण कुमार",
      date: "2025-09-29",
      views: 2654,
      image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&h=500&fit=crop"
    }
  ];

  const categories = ['All', 'Technology', 'Business', 'Environment', 'Education', 'Sports', 'Health', 'Social', 'Transport'];
  const categoriesHindi = {
    'All': 'सभी',
    'Technology': 'तकनीक',
    'Business': 'व्यापार',
    'Environment': 'पर्यावरण',
    'Education': 'शिक्षा',
    'Sports': 'खेल',
    'Health': 'स्वास्थ्य',
    'Social': 'सामाजिक',
    'Transport': 'परिवहन'
  };

  const filteredNews = allNews.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         news.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || news.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(filteredNews.length / newsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
    <Headers/>
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
       <div className="text-center mb-12 md:mb-16 ">
          {/* Live indicator badge */}
          <div className="mt-3 inline-flex items-center gap-3 bg-gradient-to-r from-red-50 to-orange-50 px-5 py-2.5 rounded-full mb-6 border border-red-200/50 shadow-sm">
            <div className="relative flex items-center ">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></div>
            </div>
            <span className="text-sm font-bold text-red-700 uppercase tracking-wider">Live Updates</span>
          </div>

          {/* Main title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-snug">
  <span
    className="inline-block bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700 bg-clip-text text-transparent"
    style={{
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      paddingTop: "0.1em",
      paddingBottom: "0.1em",
      display: "inline-block",
    }}
  >
    दैनिक समाचार
  </span>
</h2>


          <p className="text-gray-600 text-base sm:text-lg font-medium max-w-2xl mx-auto">
            Stay updated with the latest news and announcements
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2 mt-6 ">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-400"></div>
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-400"></div>
          </div>
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="समाचार खोजें..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg scale-105'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {categoriesHindi[category]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {currentNews.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-2xl font-bold text-slate-700 mb-2">कोई समाचार नहीं मिला</h3>
            <p className="text-slate-500">कृपया अपनी खोज बदलने का प्रयास करें</p>
          </div>
        ) : (
          <>
            {currentNews.length > 0 && (
              <div className="mb-12 group cursor-pointer hover:scale-[1.01] transition-transform duration-300">
                <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="h-96 md:h-auto overflow-hidden relative">
                      <img
                        src={currentNews[0].image}
                        alt={currentNews[0].title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white text-sm font-bold rounded-full shadow-lg">
                          मुख्य समाचार
                        </span>
                      </div>
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-orange-50">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-4 py-1 bg-orange-100 text-orange-800 text-sm font-bold rounded-full">
                          {currentNews[0].categoryHindi}
                        </span>
                      </div>
                      <h2 className="text-4xl font-black text-slate-900 mb-4 leading-tight group-hover:text-orange-600 transition-colors">
                        {currentNews[0].title}
                      </h2>
                      <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                        {currentNews[0].excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-orange-600" />
                          <span className="font-semibold">{currentNews[0].author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-orange-600" />
                          <span>{new Date(currentNews[0].date).toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye size={16} className="text-orange-600" />
                          <span>{currentNews[0].views.toLocaleString('hi-IN')} बार देखा गया</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentNews.slice(1).map((news) => (
                <div
                  key={news.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105"
                >
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-orange-700 text-xs font-bold rounded-full shadow-md">
                        {news.categoryHindi}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2 leading-tight">
                      {news.title}
                    </h3>
                    <p className="text-slate-600 mb-4 line-clamp-3 text-sm">
                      {news.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-orange-600" />
                        <span className="font-semibold">{news.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye size={14} className="text-orange-600" />
                        <span>{news.views.toLocaleString('hi-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-3 rounded-lg font-semibold transition-all ${
                    currentPage === 1
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-white text-orange-600 hover:bg-orange-600 hover:text-white shadow-md hover:shadow-lg'
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-4 py-2 rounded-lg font-bold transition-all ${
                          currentPage === pageNumber
                            ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg scale-110'
                            : 'bg-white text-slate-700 hover:bg-orange-100 shadow-md'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return <span key={pageNumber} className="px-2 text-slate-400">...</span>;
                  }
                  return null;
                })}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-3 rounded-lg font-semibold transition-all ${
                    currentPage === totalPages
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-white text-orange-600 hover:bg-orange-600 hover:text-white shadow-md hover:shadow-lg'
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

     
    </div>
    <Footer/>
    </>
  );
};

export default DainikSamachar;