'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { Award, BookOpen, Heart, Target, Sparkles, Users, Loader2 } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function SwamiGobarGopalPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulating API call with sample data
  useEffect(() => {
    const fetchData = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sample data structure - replace with actual API call
      const sampleData = {
        hero: {
          image: "/images/swami-gobar-gopal.jpg",
          title: "स्वामी श्री गोबर गोपाल सरस्वती जी महाराज",
          subtitle: "गुरु गोपालाचार्य स्वामी गोपालानन्द जी सरस्वती"
        },
        personalInfo: [
          { 
            label: "नाम", 
            value: "स्वामी गोबर गोपाल सरस्वती गुरु गोपालाचार्य स्वामी गोपालानन्द जी सरस्वती" 
          },
          { 
            label: "जन्म दिनांक", 
            value: "17 जून 1992" 
          },
          { 
            label: "पूर्व नाम", 
            value: "पिंटू माली" 
          },
          { 
            label: "जन्मभूमि", 
            value: "रायला, जिला भीलवाड़ा, राजस्थान - 311024" 
          },
          { 
            label: "लौकिक शिक्षा", 
            value: "आठवीं तक" 
          },
        ],
        spiritualEducation: "दादा गुरुदेव परम पूज्य दाता भगवान और गुरुदेव भगवान परम पूज्य गोपालाचार्य स्वामी गोपालानन्द सरस्वती जी महाराज के सानिध्य मैं जगतजननी भगवती गौमाता के दिव्य एवं ईश्वरीय स्वरूप की महिमा का श्रवण, चिन्तन व मनन तथा रामचरित मानस, श्रीमद्भगवत गीता व वेदांत का अध्ययन।",
        lifeJourney: [
          "मेरे प्राप्त शरीर का जन्म राजस्थान के भीलवाड़ा जिले के रायला गाँव में एक माली (वैश्य) किसान परिवार में हुआ। कक्षा 8 तक शिक्षा प्राप्त करने के बाद पढ़ाई में मन नहीं लग पाया। परिवार का वातावरण आध्यात्मिक होने के कारण पूजा-पाठ, भगवद्दर्शन, सेवा और दया का भाव बाल्यकाल से ही था। अतः भगवान से मिलन की इच्छा प्रबल होती चली गई।",
          "दुष्ट लोगों द्वारा जीव हत्या पर मन बचपन से ही व्यथित रहता था और बड़ा होकर शक्तिशाली बनकर दुष्टों से सामना करने का मन बनने लगा और लव कुश व्यायाम शाला (अखाड़े) में प्रवेश कर कुश्ती का अभ्यास करने लगा। एक बार एक निराश्रित गोमाता को आदर पूर्वक घर ले आया और गोमती नाम रख कर सेवा करने लगा। अकाल की स्थिति में मिल में काम कर के गोमाता के लिए चारे का प्रबंध किया।",
          "संयोग से इष्टदेव हनुमान जी के प्रांगण मे गो कथा का आयोजन चल रहा था। वहाँ गो-सेवा और गो-रक्षा की बात सुनकर वक्ता के गुरुदेव से मिलने का विचार बनाया कि शायद मेरे मन में जीव सेवा जीव रक्षा और भगवत प्राप्ति की इच्छा है, वह पूरी हो जाए मेरी गुरु की खोज पूरी हो जाए। गो-सेवा और गो प्रेम के प्रभाव से जैसा सोचा वैसा ही हुआ।",
          "गुरुदेव की सादगी, प्रभावशाली और ओजस्वी वाणी, और गो-सेवा गो-रक्षा हेतु सतत् चलते रहने का कार्य मुझे भा गया। घर आकर परिजनों को बताया, परिजन सहज तैयार नहीं हुए और स्वयं के भविष्य की चिंता बताने लगे, तब एक क्रांतिकारी की बात याद आई और निर्णय लिया कि लाखों माँओ और लाखों गायों को बचाने के लिए जन्म देने वाली माँ और गोमती गोमाता को छोड़कर २२ अक्टूबर २०१३ में गुरुदेव की शरण मे गो-सेवा के भाव से आ गया।",
          "२०१४ की गुरु पूर्णिमा को मेहंदीपुर बालाजी में पूज्य गुरुदेव भगवान से नाम मंत्र दीक्षा ली और ३१ वर्षीय गो पर्यावरण और अध्यात्म चेतना पद यात्रा (हल्दीघाटी से संपूर्ण भारतवर्ष) की आगे की व्यवस्था देखने लगा। सर्वे के परिणाम उत्तम रहे, गुरुदव की प्रसन्नता से विश्वास दृढ़ हुआ।",
          "फिर 6 माह के लिए गुरुदेव जयपुर से पैदल चलकर महाराष्ट्र के काऊप्रिंप्री पहुँचे, तब एकांतिक साथ और दादा गुरुदेव दाता भगवान का विशेष सानिध्य प्राप्त हुआ और संतुष्टि भी प्राप्त हुई। भैरव बाबा का विशेष आशीर्वाद प्राप्त कर पुनः बड़े नगरो में यात्रा का सर्वे और गो कथा व्यवस्था का कार्य देखने लगा।",
          "हरियाणा के २२ जिलो के 800 गांव में अलख जगाकर गो चेतना शोध अनुसंधान संघ ट्रस्ट बनाकर कार्य प्रारंभ किया और देश के प्रतिष्ठित संतों, महापुरुषों, राजनेताओं और गोभक्तों से भेंटकर कार्य को मूर्त रूप देने का कार्य किया। ज्योतिर्पीठ के पूज्य शंकराचर्य महाराज स्वामी अविमुक्तेश्वरानंद जी महाराज के सानिध्य में कार्य किया।"
        ],
        responsibilities: [
          {
            icon: "BookOpen",
            text: "४३ नियमों का पालन करते हुए कथा प्रवचन करना तथा जन-जन को भगवती गौमाता की महिमा से अवगत करा गौमाता की महिमा को पूरे भारतवर्ष तक पहुंचाना।"
          },
          {
            icon: "Heart",
            text: "जनमानस की हृदय में गौ-सेवा एवं गौ-रक्षा के भाव पुन: जाग्रत करना।"
          },
          {
            icon: "Sparkles",
            text: "गौमाता के कृषि प्रधान, धार्मिक, आर्थिक, आध्यात्मिक एवं ईश्वरीस्वरूप तथा पंचगव्य के औषधीय महत्व को सबके सामने रखना।"
          },
          {
            icon: "Target",
            text: "कृषक भाई-बहनों को रसायन मुक्त गौ आधारित बैल आधारित प्राकृतिक कृषि के लिए प्रेरित करना एवं सभी को अपने जीवन में वेदलक्षणा गौमाता से प्राप्त गव्य पदार्थों के उपयोग के लिए प्रेरित करना।"
          },
          {
            icon: "Users",
            text: "आंगन में गौमाता को विराजमान कर या किसी भी प्रकार से किसी भी रूप में गौ-सेवा करने के लिए प्रेरित करना ताकि सम्पूर्ण विश्व में गौ आधारित सनातन संस्कृति को पुनः स्थापना हो।"
          },
          {
            icon: "Award",
            text: "धेनु धरती फाउंडेशन के मार्गदर्शन और संरक्षण, संख्या वृद्धि का कार्य करना।"
          }
        ],
        pledges: [
          "पैरों में जुते-चप्पल धारण नहीं करना।",
          "विलासिता का त्याग कर सामान्य जीवन जीना।",
          "किसी का व्यक्तिगत आथित्य स्वीकार कर किसी के निजी आवास गृह में प्रवेश नहीं करना।",
          "गोव्रती प्रसादी का ही प्रयोग करना।"
        ]
      };
      
      setData(sampleData);
      setLoading(false);
    };

    fetchData();
  }, []);

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
                
                <div className="border-l-4 border-amber-400 pl-4 py-2 md:col-span-2">
                  <p className="text-sm text-gray-600 font-semibold mb-1">आध्यात्मिक शिक्षा</p>
                  <p className="text-lg text-gray-900">
                    {data.spiritualEducation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
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

      {/* Responsibilities Section */}
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

      {/* Pledges Section */}
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