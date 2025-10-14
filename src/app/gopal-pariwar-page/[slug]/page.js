'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { Award, BookOpen, Heart, Target, Sparkles, Users, Loader2 } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function SwamiGobarGopalPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch from API - adjust endpoint as needed
        // If you want to fetch all and use the first one:
       // const response = await fetch(`${API_BASE_URL}/gopal-pariwar`);
        
        // Or fetch by specific ID:
        // const response = await fetch(`${API_BASE_URL}/gopal-pariwar/1`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // If fetching all, use the first item
        const gopalData = Array.isArray(result) ? result[0] : result;
        
        if (!gopalData) {
          throw new Error('No data available');
        }

        // Transform API data to match component structure
        const transformedData = {
          hero: {
            image: gopalData.heroImage || "/images/swami-gobar-gopal.jpg",
            title: gopalData.heroTitle,
            subtitle: gopalData.heroSubtitle
          },
          personalInfo: gopalData.personalInfo || [],
          spiritualEducation: gopalData.spiritualEducation || "",
          lifeJourney: gopalData.lifeJourney || [],
          responsibilities: gopalData.responsibilities || [],
          pledges: gopalData.pledges || []
        };

        setData(transformedData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        
        // Fallback to sample data if API fails
        setData(getSampleData());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fallback sample data
  const getSampleData = () => ({
    hero: {
      image: "/images/swami-gobar-gopal.jpg",
      title: "स्वामी श्री गोबर गोपाल सरस्वती जी महाराज",
      subtitle: "गुरु गोपालाचार्य स्वामी गोपालानन्द जी सरस्वती"
    },
    personalInfo: [
      { label: "नाम", value: "स्वामी गोबर गोपाल सरस्वती गुरु गोपालाचार्य स्वामी गोपालानन्द जी सरस्वती" },
      { label: "जन्म दिनांक", value: "17 जून 1992" },
      { label: "पूर्व नाम", value: "पिंटू माली" },
      { label: "जन्मभूमि", value: "रायला, जिला भीलवाड़ा, राजस्थान - 311024" },
      { label: "लौकिक शिक्षा", value: "आठवीं तक" },
    ],
    spiritualEducation: "दादा गुरुदेव परम पूज्य दाता भगवान और गुरुदेव भगवान परम पूज्य गोपालाचार्य स्वामी गोपालानन्द सरस्वती जी महाराज के सानिध्य मैं जगतजननी भगवती गौमाता के दिव्य एवं ईश्वरीय स्वरूप की महिमा का श्रवण, चिन्तन व मनन तथा रामचरित मानस, श्रीमद्भगवत गीता व वेदांत का अध्ययन।",
    lifeJourney: [
      "मेरे प्राप्त शरीर का जन्म राजस्थान के भीलवाड़ा जिले के रायला गाँव में एक माली (वैश्य) किसान परिवार में हुआ। कक्षा 8 तक शिक्षा प्राप्त करने के बाद पढ़ाई में मन नहीं लग पाया। परिवार का वातावरण आध्यात्मिक होने के कारण पूजा-पाठ, भगवद्दर्शन, सेवा और दया का भाव बाल्यकाल से ही था। अतः भगवान से मिलन की इच्छा प्रबल होती चली गई।"
    ],
    responsibilities: [
      { icon: "BookOpen", text: "४३ नियमों का पालन करते हुए कथा प्रवचन करना तथा जन-जन को भगवती गौमाता की महिमा से अवगत करा गौमाता की महिमा को पूरे भारतवर्ष तक पहुंचाना।" }
    ],
    pledges: [
      "पैरों में जुते-चप्पल धारण नहीं करना।"
    ]
  });

  // Icon mapping
  const getIcon = (iconName) => {
    const icons = {
      BookOpen: <BookOpen className="w-6 h-6" />,
      Heart: <Heart className="w-6 h-6" />,
      Sparkles: <Sparkles className="w-6 h-6" />,
      Target: <Target className="w-6 h-6" />,
      Users: <Users className="w-6 h-6" />,
      Award: <Award className="w-6 h-6" />
    };
    return icons[iconName] || <BookOpen className="w-6 h-6" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-orange-600 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header/>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-amber-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 text-white py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-repeat opacity-30"></div>
          </div>
          
          <div className="max-w-6xl mx-auto relative z-10 opacity-0 animate-fadeIn">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-300 rounded-full blur-2xl opacity-50"></div>
                  <Image
                    src={data.hero.image}
                    alt={data.hero.title}
                    width={250}
                    height={250}
                    className="rounded-full border-8 border-white shadow-2xl relative z-10"
                  />
                </div>
              </div>
              
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                  {data.hero.title}
                </h1>
                <p className="text-xl md:text-2xl text-yellow-100">
                  {data.hero.subtitle}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Info Section */}
        {data.personalInfo && data.personalInfo.length > 0 && (
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="opacity-0 animate-fadeInUp">
                <h2 className="text-4xl font-bold text-center mb-12 text-orange-800">
                  सामान्य परिचय
                </h2>
                
                <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-orange-500">
                  <div className="grid md:grid-cols-2 gap-6">
                    {data.personalInfo.map((info, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-amber-400 pl-4 py-2"
                      >
                        <p className="text-sm text-gray-600 font-semibold mb-1">{info.label}</p>
                        <p className="text-lg text-gray-900">{info.value}</p>
                      </div>
                    ))}
                    
                    {data.spiritualEducation && (
                      <div className="border-l-4 border-amber-400 pl-4 py-2 md:col-span-2">
                        <p className="text-sm text-gray-600 font-semibold mb-1">आध्यात्मिक शिक्षा</p>
                        <p className="text-lg text-gray-900">
                          {data.spiritualEducation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Journey Section */}
        {data.lifeJourney && data.lifeJourney.length > 0 && (
          <section className="py-16 px-4 bg-gradient-to-r from-orange-100 to-amber-100">
            <div className="max-w-6xl mx-auto">
              <div>
                <h2 className="text-4xl font-bold text-center mb-12 text-orange-800">
                  जीवन यात्रा
                </h2>
                
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                  <div className="space-y-6 text-gray-800 leading-relaxed">
                    {data.lifeJourney.map((paragraph, index) => (
                      <p key={index} className="text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Responsibilities Section */}
        {data.responsibilities && data.responsibilities.length > 0 && (
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div>
                <h2 className="text-4xl font-bold text-center mb-4 text-orange-800">
                  गुरूदेव भगवान द्वारा प्रदत्त जिम्मेदारियां
                </h2>
                <p className="text-center text-gray-600 mb-12 text-lg">
                  वर्तमान में मुझे गुरुदेव भगवान की कृपा से निम्न सेवादायित्व प्राप्त करने का सौभाग्य प्राप्त हुआ है
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {data.responsibilities.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 shadow-lg border-l-4 border-orange-500 hover:shadow-xl transition-shadow"
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white">
                          {getIcon(item.icon)}
                        </div>
                        <p className="text-gray-800 leading-relaxed flex-1">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Pledges Section */}
        {data.pledges && data.pledges.length > 0 && (
          <section className="py-16 px-4 bg-gradient-to-r from-amber-100 to-orange-100">
            <div className="max-w-4xl mx-auto">
              <div>
                <h2 className="text-4xl font-bold text-center mb-12 text-orange-800">
                  सफलता हेतु संकल्प
                </h2>
                
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                  <div className="space-y-6">
                    {data.pledges.map((pledge, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <p className="text-gray-800 text-lg flex-1">{pledge}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                संपर्क करें
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Phone Card */}
              <a 
                href="tel:+919414174880"
                className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all hover:scale-105 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">फ़ोन नंबर</h3>
                  <p className="text-2xl font-semibold text-orange-600">9414174880</p>
                </div>
              </a>

              {/* Email Card */}
              <a 
                href="mailto:shreegopalparivarsang@gmail.com"
                className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all hover:scale-105 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">ईमेल</h3>
                  <p className="text-md font-semibold text-orange-600 break-all">shreegopalparivarsang@gmail.com</p>
                </div>
              </a>

              {/* Address Card */}
              <a 
                href="https://maps.google.com/?q=Sheetal+Ashram,+Ajmer+Road,+Pushkar,+Rajasthan+305022"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all hover:scale-105 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">पता</h3>
                  <p className="text-lg font-semibold text-orange-600">Sheetal Ashram, Ajmer Road, Pushkar, Rajasthan - 305022</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

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

          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out forwards;
          }

          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out forwards;
          }
        `}</style>
      </div>
      <Footer/>
    </>
  );
}