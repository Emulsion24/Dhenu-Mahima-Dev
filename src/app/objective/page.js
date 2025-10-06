"use client";
import Footer from "@/components/Footer";
import Headers from "@/components/Header";
import Link from "next/link";
import React from "react";
import { Heart, Users, BookOpen, Sparkles, Shield, Leaf, Globe } from "lucide-react";

const objectives = [
  {
    title: "सामाजिक सद्भाव और एकता",
    description: "समाज में सद्भाव, प्रेम, सहिष्णुता और एकता को बढ़ावा देना।",
    icon: Heart,
    detail: "हम विभिन्न समुदायों के बीच पुल बनाने और एक समावेशी समाज का निर्माण करने में विश्वास करते हैं।"
  },
  {
    title: "आध्यात्मिक जागरूकता",
    description: "आध्यात्मिक जागरूकता के माध्यम से भीतर परिवर्तन लाना और आत्म-प्रकाश प्राप्ति की अनुभूति कराना।",
    icon: Sparkles,
    detail: "ध्यान, योग और आध्यात्मिक शिक्षाओं के माध्यम से आंतरिक शांति और आत्म-साक्षात्कार की यात्रा।"
  },
  {
    title: "मूल्य-आधारित जीवन",
    description: "मूल्यों जैसे सच्चाई, सरलता, दया, सेवा और संयम को जीवन में अपनाना।",
    icon: BookOpen,
    detail: "नैतिक सिद्धांतों पर आधारित जीवन शैली जो व्यक्तिगत और सामाजिक उन्नति को प्रोत्साहित करती है।"
  },
  {
    title: "सामाजिक सशक्तिकरण",
    description: "वंचितों और कमजोर वर्गों की सहायता करना ताकि वे आत्मनिर्भर बन सकें।",
    icon: Users,
    detail: "शिक्षा, कौशल विकास और आर्थिक सहायता के माध्यम से समाज के हर वर्ग को सशक्त बनाना।"
  },
  {
    title: "सामाजिक सुधार",
    description: "विकृति, भ्रष्‍टाचार और अन्य सामाजिक बुराइयों को उजागर करना और समाधान प्रस्तुत करना।",
    icon: Shield,
    detail: "जागरूकता अभियानों और सामुदायिक कार्यक्रमों के माध्यम से सामाजिक बदलाव लाना।"
  },
  {
    title: "स्वास्थ्य जागरूकता",
    description: "मानसिक और शारीरिक स्वास्थ्य की जागरूकता बढ़ाना।",
    icon: Leaf,
    detail: "प्राकृतिक चिकित्सा, योग और स्वस्थ जीवनशैली को बढ़ावा देकर समग्र कल्याण सुनिश्चित करना।"
  },
  {
    title: "सांस्कृतिक संवर्धन",
    description: "कलाओं, संस्कृतिक गतिविधियों और नैतिक शिक्षाओं के माध्यम से जीवन की गुणवत्ता सुधारना।",
    icon: Globe,
    detail: "भारतीय संस्कृति, कला और परंपराओं को संरक्षित और प्रचारित करना।"
  },
];

const foundations = [
  {
    name: "धेनु महिमा फाउंडेशन",
    tagline: "गौ सेवा एवं गौ संरक्षण",
    description: "गौ माता की सेवा, संरक्षण और गौ-आधारित कृषि को बढ़ावा देने के लिए समर्पित।",
    link: "/foundation/dhenu-mahima",
    color: "from-amber-500 to-orange-500"
  },
  {
    name: "सेवा श्री फाउंडेशन",
    tagline: "मानव सेवा ही माधव सेवा",
    description: "निःस्वार्थ सेवा के माध्यम से समाज के वंचित वर्गों का उत्थान।",
    link: "/foundation/seva-shri",
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "अंतर्यामी फाउंडेशन",
    tagline: "आध्यात्मिक जागृति एवं आत्म-साक्षात्कार",
    description: "ध्यान, योग और आध्यात्मिक शिक्षाओं के माध्यम से आंतरिक परिवर्तन।",
    link: "/foundation/antaryami",
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "स्वस्थ भारत फाउंडेशन",
    tagline: "स्वस्थ नागरिक, समृद्ध राष्ट्र",
    description: "प्राकृतिक चिकित्सा और स्वस्थ जीवनशैली के माध्यम से निरोगी भारत का निर्माण।",
    link: "/foundation/swasth-bharat",
    color: "from-green-500 to-teal-500"
  }
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
              धेनु महिमा परिवार के प्रमुख दायित्व और आदर्श जो हम अपने जीवन और समाज में निभाते हैं।
              हमारा लक्ष्य एक स्वस्थ, समृद्ध और आध्यात्मिक रूप से जागृत समाज का निर्माण करना है।
            </p>
          </div>
        </header>

        {/* Mission Statement */}
        

        {/* Objectives Grid */}
        <main className="py-16 px-4 md:px-8 lg:px-12">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
              हमारे मुख्य उद्देश्य
            </h2>
            
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
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {obj.title}
                          </h3>
                          <p className="text-gray-700 mb-3 leading-relaxed">
                            {obj.description}
                          </p>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {obj.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="h-1 bg-gradient-to-r from-orange-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  </div>
                );
              })}
            </div>

            {/* Foundations Section */}
            <section className="mt-20">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
                हमारी फाउंडेशन
              </h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                धेनु महिमा परिवार की विभिन्न फाउंडेशन जो समाज के विभिन्न क्षेत्रों में सेवा कर रही हैं
              </p>

              <div className="grid md:grid-cols-1 gap-8">
                {foundations.map((foundation, idx) => (
                  <Link
                    key={idx}
                    href={foundation.link}
                    className="group block bg-gradient-to-r from-orange-600 to-yellow-500 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className={`h-2 bg-gradient-to-r ${foundation.color}`}></div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-950 transition-colors">
                        {foundation.name}
                      </h3>
                      <p className="text-sm font-semibold text-white mb-4">
                        {foundation.tagline}
                      </p>
                      <p className="text-white leading-relaxed mb-4">
                        {foundation.description}
                      </p>
                      <div className="flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform">
                        <span>और जानें</span>
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Call to Action */}
            <div className="text-center mt-16 bg-gradient-to-r from-orange-600 to-yellow-500 rounded-2xl p-12 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                हमारे साथ जुड़ें
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                आइए मिलकर एक बेहतर, स्वस्थ और समृद्ध समाज का निर्माण करें। धेनु महिमा परिवार का हिस्सा बनें।
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/message"
                  className="inline-block bg-white text-orange-600 font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                >
                  संपर्क करें
                </Link>
                <Link
                  href="/donate"
                  className="inline-block bg-orange-700 text-white font-semibold px-8 py-4 rounded-full hover:bg-orange-800 transition-colors shadow-lg"
                >
                  गौ सेवार्थ दान
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