import React from 'react';
import { ArrowLeft, Target, Heart, Users, TrendingUp, Mail, Phone, MapPin, ExternalLink, Calendar, Award } from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function FoundationPage() {
  // Sample foundation data - replace with your actual data
  const foundation = {
    name: "दाना देवी फाउंडेशन",
    tagline: "गो का दाना ... गो तक जाना",
    logo: "/logo/logo3.webp",
    description: "मध्यप्रदेश के सालरिया, आगर मालवा में मध्य प्रदेश सरकार द्वारा संचालित कामधेनु गौ अभयारण्य में परम पूज्य सद्गुरुदेव भगवान के मुखारविंद से एक वर्षीय वेदलक्षणा गौ आराधना महामहोत्सव आयोजन के दौरान एक बैठक में गौमाता की सेवा को किस प्रकार वैश्विक विस्तार प्रदान किया जाए।",
    established: "2023",
    stats: [
      { label: "गौशालाएं सेवित", value: "150+" },
      { label: "गौमाता सेवित", value: "25,000+" },
      { label: "टन चारा वितरित", value: "500+" },
      { label: "स्वयंसेवक", value: "200+" }
    ],
    keyActivities: [
      "अभाव ग्रस्त गौ चिकित्सालय में गौ माता को चारा, बांटा, दाना उपलब्ध करवाना",
      "बीमार गौ माता के लिए पौष्टिक आहार उपलब्ध करवाना",
      "गांव गांव जाकर वहां के गोचर में गौ माता हेतु घास की सुविधा करवाना"
    ],
    objectives: [
      {
        title: "पोषक तत्व वितरण",
        description: "निष्काम भाव से शासन, समाज, धर्मात्मा श्रेष्ठीजन, और समर्थ संस्थाओं के सहयोग से अभावग्रस्त क्षेत्रों में विशेष आवश्यकता होने पर गो-चिकित्सालय में गोमाता हेतु निःशुल्क पोषक तत्व उपलब्ध करवाना"
      },
      {
        title: "पौष्टिक आहार",
        description: "शासन, समाज, धर्मात्मा श्रेष्ठीजन, और समर्थ संस्थाओं के सहयोग से विशेष आवश्यकता होने पर चिकित्सालय में गोमाता हेतु निःशुल्क पौष्टिक आहार उपलब्ध करवाना"
      },
      {
        title: "चारा उपलब्धता",
        description: "शासन, समाज, धर्मात्मा श्रेष्ठीजन, और समर्थ संस्थाओं के सहयोग से विशेष आवश्यकता होने पर चिकित्सालय में गोमाता हेतु निःशुल्क घास, चारा, पराली, कड़बी, भूसा, तूड़ा उपलब्ध करवाना"
      },
      {
        title: "गोचर विकास",
        description: "शासन, समाज, धर्मात्मा श्रेष्ठीजन, और समर्थ संस्थाओं के सहयोग से गोचर भूमि विकास के कार्य करना"
      },
      {
        title: "चारा संग्रह केंद्र",
        description: "शासन, समाज, धर्मात्मा श्रेष्ठीजन, और समर्थ संस्थाओं के सहयोग से चारा उत्पादन वाले स्थानों के आसपास चारा संग्रह केंद्र विकसित करना"
      }
    ],
    supportiveObjectives: [
      "धेनु धाम फाउंडेशन के माध्यम से संचालित ३१ वर्षीय गो पर्यावरण और अध्यात्म चेतना पदयात्रा द्वारा देशभर में हो रहे गो महिमा प्रचार कार्यों में सहयोग करवाना",
      "दवा देवी फाउंडेशन के माध्यम से अभाव ग्रस्त गो चिकित्सालय में निःशुल्क दवा वितरण करवाना और गो-चिकित्सालय हेतु गौ एंबुलेस उपलब्ध करवाने के लिए श्रीमंत संस्थाओं को प्रेरित करना",
      "दृष्टि देवी फाउंडेशन और समाज के सहयोग से गो-सेवा हित जन जागरणहेतु धार्मिक, चिकित्सकीय साहित्य प्रकाशन और वितरण में सहयोग करना",
      "धेनु देवी फाउंडेशन के माध्यम से गौ चिकित्सालय में उचित वेतन पर श्रद्धावान चिकित्सक एंव बीमार गौमाता की सेवा के लिए उचित वेतन पर प्रशिक्षित श्रद्धावान ग्वाल की व्यवस्था करवाना",
      "धेनु धरती फाउंडेशन के बेल और पंचगव्य आधारित ऋषि कृषि के कार्यों को कथा के माध्यम से प्रचारित करना"
    ],
    contact: {
      email: "contact@foundation.org",
      phone: "+91 98765 43210",
      address: "Madhya Pradesh, India"
    }
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-600 to-amber-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="bg-white p-6 rounded-3xl shadow-2xl">
              <img
                src={foundation.logo}
                alt={foundation.name}
                className="w-40 h-40 object-contain"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl font-bold mb-3">{foundation.name}</h1>
              <p className="text-2xl text-orange-100 mb-4 italic">{foundation.tagline}</p>
              <div className="flex flex-col items-center md:items-start gap-4">
                <div className="flex items-center gap-2 text-orange-100">
                  <Calendar className="w-5 h-5" />
                  <span>Established: {foundation.established}</span>
                </div>
                <button className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition shadow-lg">
                  अधिक जानकारी / More Information
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Introduction */}
            <section className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                  <Heart className="w-6 h-6 text-blue-500" />
                </div>
                <h2 className="text-3xl font-bold">परिचय</h2>
              </div>
              <p className="leading-relaxed text-lg text-blue-50">{foundation.description}</p>
            </section>

            {/* Key Activities */}
            <section className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold">मुख्य गतिविधियां</h2>
              </div>
              <div className="space-y-4">
                {foundation.keyActivities.map((activity, index) => (
                  <div key={index} className="flex items-start  gap-3 p-4 bg-white bg-opacity-20 rounded-xl hover:bg-opacity-30 transition">
                    <div className="bg-white  text-green-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                      {index + 1}
                    </div>
                    <p className="flex-1 text-green-600">{activity}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Main Objectives */}
            <section className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                  <Target className="w-6 h-6 text-purple-500" />
                </div>
                <h2 className="text-3xl font-bold">मुख्य उद्देश्य</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {foundation.objectives.map((objective, index) => (
                  <div key={index} className="bg-white bg-opacity-20 rounded-xl p-6 hover:bg-opacity-30 transition">
                    <h3 className="text-xl text-purple-500 font-semibold mb-3">{objective.title}</h3>
                    <p className="text-sm leading-relaxed text-purple-950">{objective.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Supportive Objectives */}
            <section className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl shadow-lg p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                  <Award className="w-6 h-6 text-pink-500" />
                </div>
                <h2 className="text-3xl font-bold">सहायक उद्देश्य</h2>
              </div>
              <div className="space-y-3">
                {foundation.supportiveObjectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white bg-opacity-20 rounded-xl hover:bg-opacity-30 transition">
                    <div className=" text-pink-700 font-bold flex-shrink-0">{index + 1}.</div>
                    <p className="text-sm text-pink-500">{objective}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl shadow-lg p-6 sticky top-6 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                  <Users className="w-6 h-6 text-teal-500" />
                </div>
                <h3 className="text-2xl font-bold">संपर्क करें</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-white bg-opacity-20 rounded-xl hover:bg-opacity-30 transition">
                  <Mail className="w-5 h-5 text-teal-500 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-teal-500 mb-1">Email</div>
                    <a href={`mailto:${foundation.contact.email}`} className="hover:text-teal-500 text-black text-sm">
                      {foundation.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white bg-opacity-20 rounded-xl hover:bg-opacity-30 transition">
                  <Phone className="w-5 h-5 text-teal-500 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-teal-500 mb-1">Phone</div>
                    <a href={`tel:${foundation.contact.phone}`} className="hover:text-teal-500 text-black text-sm">
                      {foundation.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white bg-opacity-20 rounded-xl hover:bg-opacity-30 transition">
                  <MapPin className="w-5 h-5 text-teal-500 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-teal-500 mb-1">Address</div>
                    <p className="text-sm text-teal-500">{foundation.contact.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links - REMOVED */}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Be Part of the Change</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join us in our mission to serve and protect. Your support makes a real difference.
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}