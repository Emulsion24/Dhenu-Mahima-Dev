"use client";
import Footer from "@/components/Footer";
import Headers from "@/components/Header";
import Link from "next/link";
import React from "react";
import { Heart, Users, BookOpen, Sparkles, Shield, Leaf, Globe } from "lucide-react";

const objectives = [
  {
    title: "संपूर्ण वेदलक्षणा गोवंश को समय पर उचित आहार उपलब्ध करवाना",
    icon: Leaf,
  },
  {
    title: "संपूर्ण वेदलक्षणा गोवंश को समय पर औषधि और उपचार उपलब्ध करवाना",
    icon: Shield,
  },
  {
    title: "संपूर्ण वेदलक्षणा गोवंश को उचित आश्रय उपलब्ध करवाना",
    icon: Users,
  },
  {
    title: "संपूर्ण वेदलक्षणा गोवंश को मानव समाज से आदर युत व्यवहार करवाना",
    icon: Heart,
  },
  {
    title: "संपूर्ण वेदलक्षणा गोवंश को बंधनमुक्त करवाकर आजादी उपलब्ध करवाना",
    icon: Sparkles,
  },
  {
    title: "संपूर्ण वेदलक्षणा गोवंश को आनंद प्रदान करवाना",
    icon: Globe,
  },
  {
    title: "संपूर्ण वेदलक्षणा गोवंश को भावयुक्त आलिंगन प्रदान करवाना",
    icon: BookOpen,
  },
];

const foundations = [
  {
    name: "धेनु धाम फाउंडेशन",
    description: "वर्ष २०१२ से प्रारम्भ होकर २०४३ तक संपूर्ण भारतवर्ष में गो महिमा का प्रचार करने वाली पदयात्रा के तीनों विभाग राम यात्रा, श्याम यात्रा एवं शिव यात्रा द्वारा देश के अनेकों गांव में निःशुल्क गो महिमा सत्संग द्वारा लोगों में गो-सेवा का भाव जाग्रत करना, पर्यावरण के प्रति लोगों को जागरूक करना तथा ३६५ सक्रिय सदस्यों के माध्यम से कार्य करना।",
    link: "https://www.dhenudhamfoundation.com",
  },
  {
    name: "दावा देवी फाउंडेशन",
    description: "शासन, गोभक्त श्रेष्ठीजन के सहयोग से अभावग्रस्त गौ चिकित्सालय में अतिआवश्यक औषधि निःशुल्क उपलब्ध करवाना, गौभक्तों को फर्स्ट ऐड बॉक्स उपलब्ध कराना तथा शल्य चिकित्सा उपकरण उपलब्ध कराना।",
    link: "https://www.davadevifoundation.com",
  },
  {
    name: "दाता देवी फाउंडेशन",
    description: "शासन, गोभक्त, श्रेष्ठीजन के सहयोग से अभावग्रस्त स्थिति में चल रहे चिकित्सालय में निर्माण में मदद करना तथा जिस क्षेत्र में गो-चिकित्सालय की आवश्यकता है, वहाँ सर्व सुविधायुक्त गो चिकित्सालय का निर्माण करवाना।",
    link: "https://www.datadevifoundation.com",
  },
  {
    name: "दाना देवी फाउंडेशन",
    description: "शासन, गोभक्त, श्रेष्ठीजन के सहयोग से गो चिकित्सालय में पोषक औषधि एवं पौष्टिक गो-आहार की व्यवस्था करना, विशेष परिस्थिति में घास की व्यवस्था करना और चारागाह विकास का कार्य करना।",
    link: "https://www.danadevifoundation.com",
  },
  {
    name: "दृष्टि देवी फाउंडेशन",
    description: "गो समाचार विषयक मासिक पत्रिका का प्रकाशन करना, गौ संस्कृति एवं गौ महिमा से जुड़े साहित्य का प्रकाशन करना, गो चिकित्सालय की निगरानी के लिए कैमरे लगाने की व्यवस्था करना, सम्पूर्ण भारतवर्ष में कश्मीर से कन्याकुमारी तक गौ-सेवा क्षेत्र की संपूर्ण सूचनाएँ संग्रहित कर जन-जन तक पहुँचाना तथा 5000 सात्विक गो कृपा कथा प्रवक्ता तैयार करना।",
    link: "https://www.drishtidevifoundation.com",
  },
  {
    name: "ग्वाल शक्ति सेना",
    description: "देशभर में चल रही गोशाला एवं गो चिकित्सालयों को आने वाली शासकीय और सामाजिक समस्याओं का समाधान करवाना, गौशालाओं को भूमि आवंटन में आ रही समस्या को दूर करना, गो-सेवा, गो-रक्षा हित कार्य करना आवश्यकता पड़ने पर आंदोलन करना।",
    link: "https://www.gwalshaktisena.com",
  },
  {
    name: "धेनु शक्ति संघ",
    description: "देशभर में गो सेवी बेटियों को रचनात्मक पद्धति से जोड़कर देश में व्यापक स्तर पर माताओं का संघठन खड़ा करना, जिसके माध्यम से देशभर में चल रही गोशाला एवं गो चिकित्सालयों को आने वाली शासकीय और सामाजिक समस्याओं का समाधान करवाना, गौशालाओं को भूमि आवंटन में आ रही समस्या को दूर करना, गो-सेवा, गो-रक्षा हित कार्य करना आवश्यकता पड़ने पर आंदोलन करना।",
    link: "https://www.dhenushaktisangh.com",
  },
  {
    name: "धेनु धारा फाउंडेशन",
    description: "अभावग्रस्त गो चिकित्सालय में समाज, शासन, गोभक्त, श्रेष्ठीजन के सहयोग से में कूप, खेली, टेंकर आदि जल संसाधनों की उपलब्धता सुनिश्चित करवाना।",
    link: "https://www.dhenudharafoundation.com",
  },
  {
    name: "धेनु धरती फाउंडेशन",
    description: "गो-बैल आधारित कृषि कार्य करना, ऋषि कृषि हेतु किसान भाईयों को प्रशिक्षण देना, कृषि जगत में गो आधारित अनुसंधान करना, देशी बीज का उत्पादन संरक्षण करना और ऋषि कृषि हेतु सामान्य मूल्य पर उपलब्ध करवाना। ऋषि कृषि हेतु सात्विक सनातनी किसान भाई बहनों को खेती योग्य बैल दादा नि:शुल्क उपलब्ध करवाना।",
    link: "https://www.dhenudhartifoundation.com",
  },
  {
    name: "धेनु धन फाउंडेशन",
    description: "गो कृषि और पंचगव्य आधारित उत्पादों को बाजार में उपलब्ध करवाना, उपभोक्ताओं को गो आधारित उत्पाद उपलब्ध करवाना तथा गो आधारित कुटीर उद्योगों को एक मंच पर लाना।गो आधारित सजावटी सामग्री, पूजा सामग्री, प्रसाधन सामग्री और औषधि निर्माण का नि:शुल्क प्रशिक्षण देना।",
    link: "https://www.dhenudhanfoundation.com",
  },
  {
    name: "धेनु देवी फाउंडेशन",
    description: "गौ चिकित्सालय में गौमाता की चिकित्सा हेतु उचित वेतन पर श्रद्धावान चिकित्सक उपलब्ध करवाना, बीमार गौमाता की सेवा के लिए उचित वेतन पर प्रशिक्षित श्रद्धावान ग्वाल की व्यवस्था करना, गो चिकित्सालय हेतु ग्वालों और गो चिकित्सकों को देश के विभिन्न स्थानों पर शिविर आयोजित कर पूर्णतया निःशुल्क विशेष प्रशिक्षण देना, उनको उचित वेतन पर सेवा ( job) गारंटी देना तथा परम्परागत गो चिकित्सा पद्धति की विधि औषधि का पुनः संकलन संग्रह करना।",
    link: "https://www.dhenudevifoundation.com",
  },
  {
    name: "धेनु दर्शन फाउंडेशन",
    description: "गौ संवर्धन हेतु नस्ल सुधार का कार्य करना, अच्छी नस्ल के नंदी तैयार कर गौशालाओं और संवर्धन केन्द्रों को उपलब्ध करवाना, वेदलक्षणा गोमाता की देशव्यापी सभी नस्लों की आंकड़ों सहित जानकारी संग्रहित करना तथा समान नस्ल के नंदी के एक दूसरी गोशाला में संवर्धन केंद्र में स्थानांतरण हेतु तंत्र विकसित करना",
    link: "https://www.dhenudarshanfoundation.com",
  },
];

export default function Objective() {
  return (
    <>
      <Headers />
      <div className="bg-gradient-to-b from-orange-50 via-white to-yellow-50 min-h-screen font-sans">
        {/* Hero Section */}
        <header className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center mb-6">
              हमारे उद्देश्य
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-center leading-relaxed">
              श्री गोपाल परिवार संघ के प्रमुख उद्देश्य
            </p>
            <p className="mt-2 text-base md:text-lg max-w-2xl mx-auto text-center leading-relaxed font-semibold">
              ( बस एक साधन - गो आराधन )
            </p>
          </div>
        </header>

        {/* Objectives Grid */}
        <main className="py-16 px-4 md:px-8 lg:px-12">
          <div className="container mx-auto max-w-6xl">
           

            {/* */}

                         <div className="text-center mb-12 md:mb-16 ">
          {/* Live indicator badge */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-50 to-orange-50 px-5 py-2.5 rounded-full mb-6 border border-red-200/50 shadow-sm">
            <div className="relative flex items-center ">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></div>
            </div>
            
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
   हमारे मुख्य उद्देश्य
  </span>
</h2>




          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2 mt-6 ">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-400"></div>
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-400"></div>
          </div>
        </div>
            
            {/*  */}
            
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {objectives.map((obj, idx) => {
                const IconComponent = obj.icon;
                return (
                  <div
                    key={idx}
                    className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="p-6 md:p-8">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <IconComponent className="w-7 h-7 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg md:text-xl font-bold text-gray-800 leading-relaxed">
                            {idx + 1}. {obj.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="h-1 bg-gradient-to-r from-orange-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  </div>
                );
              })}
            </div>

            {/* Introduction Text */}
            <div className="mb-12 text-center">
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                इन उद्देश्यों की पूर्ति हेतु निम्न १२ फाउंडेशन के माध्यम से गौ-सेवा, गौ-रक्षा, गौ-संरक्षण एवं गौ-संवर्धन के भाव को जन-जन तक पहुंचाना और गोवंश को उचित आहार, औषधि, आश्रय, आदर और आजादी उपलब्ध करवाना।
              </p>
            </div>

            {/* Foundations Section */}
            <section className="mt-20">
            

              {/*  */}
                             <div className="text-center mb-12 md:mb-16 ">
          {/* Live indicator badge */}
       

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
    हमारी १२ फाउंडेशन
  </span>
</h2>

<p className="text-gray-600 text-base sm:text-lg font-medium max-w-2xl mx-auto">
          श्री गोपाल परिवार संघ, GPS के मार्गदर्शन में काम करने वाले 12 फाउंडेशन
          </p>



          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2 mt-6 ">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-400"></div>
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-400"></div>
          </div>
        </div>
              {/*  */}


              <div className="grid md:grid-cols-1 gap-8">
                {foundations.map((foundation, idx) => (
                  <div
                    key={idx}
                    className="group bg-gradient-to-br from-orange-900 to-amber-800 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-orange-700 flex flex-col"
                  >
                    <div className="h-1 bg-gradient-to-r from-yellow-400 to-orange-400"></div>
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-6 text-center group-hover:text-yellow-300 transition-colors">
                        {foundation.name}
                      </h3>
                      <p className="text-orange-50 leading-relaxed mb-8 flex-1 text-center text-base">
                        {foundation.description}
                      </p>
                      <div className="text-center">
                        <a
                          href={foundation.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center bg-yellow-400 text-orange-900 font-semibold px-8 py-3 rounded-lg hover:bg-yellow-300 transition-all shadow-md group-hover:shadow-lg group-hover:scale-105"
                        >
                          <span>विजिट करें</span>
                          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Call to Action */}
            <div className="text-center mt-16 bg-gradient-to-r from-orange-600 to-yellow-500 rounded-2xl p-12 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                हमारे साथ जुड़ें
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                आइए मिलकर गोमाता की सेवा करें और एक बेहतर समाज का निर्माण करें। श्री गोपाल परिवार संघ का हिस्सा बनें।
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-block bg-white text-orange-600 font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                >
                  संपर्क करें
                </Link>
                <Link
                  href="/donate"
                  className="inline-block bg-orange-700 text-white font-semibold px-8 py-4 rounded-full hover:bg-orange-800 transition-colors shadow-lg"
                >
                  गौ सेवार्थ दान करें
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}