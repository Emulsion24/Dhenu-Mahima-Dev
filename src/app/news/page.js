'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, TrendingUp, Newspaper } from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function NewsSection() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const router = useRouter();

  useEffect(() => {
    const fetchNews = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sample news data - Replace with actual API call
      const sampleNews = [
        {
          id: 1,
          title: "गौमाता संरक्षण अभियान में नया कदम",
          titleEn: "New Initiative in Cow Protection Campaign",
          slug: "gaumata-sanrakshan-abhiyan",
          excerpt: "राजस्थान सरकार ने गौमाता के संरक्षण के लिए 500 करोड़ की योजना की घोषणा की...",
          image: "/images/1.png",
          category: "गौ संरक्षण",
          date: "15 अक्टूबर 2024",
          readTime: "5 मिनट",
          views: "2,547",
          featured: true
        },
        {
          id: 2,
          title: "गौशाला में आयोजित हुआ विशेष पूजन कार्यक्रम",
          titleEn: "Special Worship Program Organized at Gaushala",
          slug: "gaushala-special-pooja-program",
          excerpt: "श्री गोपाल परिवार संघ द्वारा आयोजित विशेष पूजन कार्यक्रम में हजारों श्रद्धालुओं ने भाग लिया...",
          image: "/images/1.png",
          category: "धार्मिक कार्यक्रम",
          date: "12 अक्टूबर 2024",
          readTime: "4 मिनट",
          views: "1,823",
          featured: false
        },
        {
          id: 3,
          title: "जैविक खेती में गोबर की भूमिका पर सेमिनार",
          titleEn: "Seminar on Role of Cow Dung in Organic Farming",
          slug: "organic-farming-seminar",
          excerpt: "कृषि विशेषज्ञों ने जैविक खेती में गोबर के महत्व पर प्रकाश डाला...",
          image: "/images/1.png",
          category: "कृषि",
          date: "10 अक्टूबर 2024",
          readTime: "6 मिनट",
          views: "1,456",
          featured: false
        },
        {
          id: 4,
          title: "गौ आधारित उत्पादों की बिक्री में वृद्धि",
          titleEn: "Increase in Sales of Cow-Based Products",
          slug: "cow-based-products-sales",
          excerpt: "पिछले वर्ष की तुलना में गौ आधारित उत्पादों की बिक्री में 45% की वृद्धि...",
          image: "/images/1.png",
          category: "व्यवसाय",
          date: "8 अक्टूबर 2024",
          readTime: "3 मिनट",
          views: "2,103",
          featured: false
        },
        {
          id: 5,
          title: "युवाओं के लिए गौ सेवा प्रशिक्षण कार्यक्रम",
          titleEn: "Cow Service Training Program for Youth",
          slug: "youth-training-program",
          excerpt: "500 युवाओं को गौ सेवा का प्रशिक्षण देने के लिए विशेष कार्यक्रम शुरू...",
          image: "/images/1.png",
          category: "शिक्षा",
          date: "5 अक्टूबर 2024",
          readTime: "4 मिनट",
          views: "1,687",
          featured: false
        },
        {
          id: 6,
          title: "पंचगव्य चिकित्सा केंद्र का उद्घाटन",
          titleEn: "Inauguration of Panchgavya Treatment Center",
          slug: "panchgavya-center-inauguration",
          excerpt: "आयुर्वेदिक पंचगव्य चिकित्सा के लिए नया केंद्र खोला गया...",
          image: "/images/1.png",
          category: "स्वास्थ्य",
          date: "3 अक्टूबर 2024",
          readTime: "5 मिनट",
          views: "1,945",
          featured: false
        }
      ];
      
      setNewsData(sampleNews);
      setLoading(false);
    };

    fetchNews();
  }, []);

  const categories = [
    'all',
    'गौ संरक्षण',
    'धार्मिक कार्यक्रम',
    'कृषि',
    'व्यवसाय',
    'शिक्षा',
    'स्वास्थ्य'
  ];

  const filteredNews = activeCategory === 'all' 
    ? newsData 
    : newsData.filter(news => news.category === activeCategory);

  const handleNewsClick = (news) => {
    router.push(`/news-page/${news.slug}?id=${news.id}`);
  };

  const featuredNews = newsData.find(news => news.featured);
  const regularNews = newsData.filter(news => !news.featured);

  if (loading) {
    return (
      <div className="py-20 px-4 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading news...</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <Header/>
    <section className="py-20 px-4 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full mb-4">
            <Newspaper size={20} className="text-orange-600" />
            <span className="text-sm font-semibold text-orange-700 uppercase">Latest Updates</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              ताज़ा समाचार
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            गौ सेवा और सामाजिक कार्यों से जुड़ी नवीनतम जानकारी
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'
              }`}
            >
              {category === 'all' ? 'सभी समाचार' : category}
            </button>
          ))}
        </div>

        {/* Featured News */}
        {featuredNews && activeCategory === 'all' && (
          <div 
            onClick={() => handleNewsClick(featuredNews)}
            className="mb-12 cursor-pointer group"
          >
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={featuredNews.image}
                alt={featuredNews.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              
              {/* Featured Badge */}
              <div className="absolute top-6 left-6 flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                <TrendingUp size={18} />
                Featured News
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <span className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  {featuredNews.category}
                </span>
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 group-hover:text-yellow-300 transition-colors">
                  {featuredNews.title}
                </h3>
                <p className="text-lg text-gray-200 mb-6 max-w-3xl">
                  {featuredNews.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-6 text-white/80">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span className="text-sm">{featuredNews.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span className="text-sm">{featuredNews.readTime}</span>
                  </div>
                  <button className="flex items-center gap-2 bg-white text-orange-600 px-6 py-2 rounded-full font-semibold hover:bg-orange-50 transition-colors">
                    Read More
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activeCategory === 'all' ? regularNews : filteredNews).map((news) => (
            <div
              key={news.id}
              onClick={() => handleNewsClick(news)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-orange-600 px-3 py-1 rounded-full text-xs font-bold">
                    {news.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                  {news.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {news.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{news.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>{news.readTime}</span>
                  </div>
                </div>

                {/* Read More Button */}
                <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 group-hover:shadow-lg transition-all">
                  Read Full Story
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredNews.length > 6 && (
          <div className="text-center mt-12">
            <button className="bg-white border-2 border-orange-500 text-orange-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-orange-500 hover:text-white transition-all hover:scale-105 shadow-lg">
              Load More News
            </button>
          </div>
        )}

        {/* No News Found */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <Newspaper size={64} className="text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No news found in this category</p>
          </div>
        )}
      </div>
    </section>
    <Footer/>
    </>
  );
}