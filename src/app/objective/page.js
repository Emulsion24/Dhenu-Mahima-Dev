"use client";
import Footer from "@/components/Footer";
import Headers from "@/components/Header";
import React from "react";

const objectives = [
  "समाज में सद्भाव, प्रेम, सहिष्णुता और एकता को बढ़ावा देना।",
  "आध्यात्मिक जागरूकता के माध्यम से भीतर परिवर्तन लाना और आत्म-प्रकाश प्राप्ति की अनुभूति कराना।",
  "मूल्यों जैसे सच्चाई, सरलता, दया, सेवा और संयम को जीवन में अपनाना।",
  "वंचितों और कमजोर वर्गों की सहायता करना ताकि वे आत्मनिर्भर बन सकें।",
  "विकृति, भ्रष्‍टाचार और अन्य सामाजिक बुराइयों को उजागर करना और समाधान प्रस्तुत करना।",
  "मानसिक और शारीरिक स्वास्थ्य की जागरूकता बढ़ाना।",
  "कलाओं, संस्कृतिक गतिविधियों और नैतिक शिक्षाओं के माध्यम से जीवन की गुणवत्ता सुधारना।",
];

export default function objective (){
  return (
    <>
    <Headers/>
    <div className="bg-gradient-to-b from-orange-50 to-yellow-50 min-h-screen font-sans">
      {/* Header / Hero */}
      <header className="bg-gradient-to-r from-orange-600 to-yellow-500 text-white py-20 text-center relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            हमारे उद्देश्य
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto">
            धेनु महिमा परिवार के प्रमुख दायित्व और आदर्श जो हम अपने जीवन और समाज में निभाते हैं।
          </p>
        </div>
        {/* Decorative overlay */}
        <div className="absolute inset-0 opacity-10">
          {/* Simple pattern or SVG */}
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 600 600"
          >
            <circle cx="300" cy="300" r="500" fill="white" />
          </svg>
        </div>
      </header>

      {/* Objectives List */}
      <main className="py-16 px-4 md:px-8 lg:px-12">
        <div className="container mx-auto max-w-4xl space-y-8">
          {objectives.map((obj, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-lg shadow-md transition transform hover:scale-105 ${
                idx % 2 === 0
                  ? "bg-white"
                  : "bg-orange-100/60"
              }`}
            >
              <div className="flex items-start space-x-4">
                {/* Bullet / Icon */}
                <div className="flex-shrink-0 mt-1">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white font-bold">
                    {idx + 1}
                  </span>
                </div>
                <p className="text-gray-800 text-lg leading-relaxed">
                  {obj}
                </p>
              </div>
            </div>
          ))}

          {/* Call to Action */}
          <div className="text-center mt-12">
            <a
              href="/contact"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-full transition-colors"
            >
              हमसे जुड़ें
            </a>
          </div>
        </div>
      </main>
    </div>
    <Footer/>
    </>
  );
};

