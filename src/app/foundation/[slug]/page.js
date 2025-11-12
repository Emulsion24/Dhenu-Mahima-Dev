"use client"
import { useParams } from 'next/navigation';
import React, { useEffect,useState } from 'react';
import { ArrowLeft, Info,Target, Heart, Users, TrendingUp, Mail, Phone, MapPin, ExternalLink, Calendar, Award, DessertIcon } from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import API from '@/lib/api';
import { Loader2 } from "lucide-react";
import { FaGlobeAsia, FaInfoCircle } from 'react-icons/fa';


export default function FoundationPage({ slug }) {
  const [foundation, setFoundation] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams(); // Next.js hook to get URL params
  const currentSlug = params.slug; 
  useEffect(() => {
    async function fetchFoundation() {
      try {
        const response = await API.get(`/admin/foundation/${currentSlug}`);
        setFoundation(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch foundation data:", error);
        setLoading(false);
      }
    }

    fetchFoundation();
  }, [currentSlug]);

  if (loading) return (  <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 backdrop-blur-sm z-50">
      <div className="bg-white/90 p-8 rounded-3xl shadow-2xl border border-white/30 flex flex-col items-center animate-fadeIn">
        <div className="relative mb-4">
          <Loader2 className="w-14 h-14 text-orange-600 animate-spin" />
          <div className="absolute inset-0 w-14 h-14 border-4 border-amber-300 rounded-full animate-ping opacity-60" />
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Fetching Details...
        </h2>
        <p className="text-sm text-gray-600">
          Please wait while we load all the information.
        </p>
      </div>
    </div>);
  if (!foundation) return <div className="text-center py-20">Foundation not found</div>;

  // Filter objectives based on type
  const mainObjectives = foundation.objectives.filter(obj => obj.objectiveType === 'main');
  const supportiveObjectives = foundation.objectives.filter(obj => obj.objectiveType === 'supportive');

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
                  src={foundation.logoUrl}
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
                    <span>Established: {foundation.establishedYear}</span>
                  </div>
                  <button  onClick={() => window.open(foundation.contact.website, "_blank")} className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition shadow-lg">
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
                <p className="leading-relaxed text-lg font-bold text-blue-50">{foundation.description}</p>
              </section>

              {/* Key Activities */}
<section className="bg-white rounded-2xl shadow-lg p-8">
  {/* Section Title */}
  <div className="flex items-center gap-3 mb-8 justify-center">
    {/* Switched to orange theme and Info icon */}
    <div className="bg-orange-100 p-3 rounded-xl">
      <FaGlobeAsia className="w-6 h-6 text-orange-600" />
    </div>
    <h2 className="text-3xl font-extrabold text-orange-900">फाउंडेशन के बारे में</h2>
  </div>
  
  {/* --- Redesigned Content Area ---
    We no longer map a list. This is a single block
    designed for one long paragraph.
  */}
  <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-6 shadow-inner">
    {/* - Use 'leading-relaxed' for better line spacing in a long paragraph.
      - Use 'text-lg' for better readability.
      - Assuming your text is in 'foundation.about' or 
        'foundation.activities[0].activityText'
    */}
{foundation.activities.length > 0 ? (
  <div
    className="text-2xl font-extrabold text-gray-700 leading-relaxed prose"
    dangerouslySetInnerHTML={{ __html: foundation.activities[0].activityText }}
  />
) : (
  <p className="text-gray-500 text-center">About information is not available.</p>
)}
  </div>
  
</section>

              {/* --- MODIFIED: Objectives Section --- */}
<section className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg p-8">
  {/* Section Title (Styled like reference) */}
  <div className="flex items-center gap-4 mb-10">
    <div className="flex-shrink-0 bg-white bg-opacity-20 p-3 rounded-xl backdrop-blur-sm border border-white border-opacity-30">
      <Target className="w-8 h-8 text-yellow-400" />
    </div>
    <h2 className="text-4xl font-bold text-white">मुख्य उद्देश्य</h2>
  </div>

  {/* --- Main Objectives Section --- */}
  <div className="mb-12">
    
    <div className="space-y-4">
      {mainObjectives.map((objective, index) => (
        <div 
          key={index} 
          className="flex items-start gap-4 p-4 bg-white bg-opacity-10 rounded-xl hover:bg-opacity-20 transition duration-300 backdrop-blur-sm border border-white border-opacity-20"
        >
          {/* Styled Number (Glassmorphism version) */}
       
          
          {/* Content (Title + Description) */}
          <div className="flex-1">
            {/* Text is white/light for contrast against the orange background */}
            <h4 className="font-semibold text-lg  text-orange-950 ">{objective.description}</h4>
     
          </div>
        </div>
      ))}
      
      {mainObjectives.length === 0 && (
        <div className="p-4 bg-white bg-opacity-10 rounded-xl text-center text-orange-950">
          No main objectives listed.
        </div>
      )}
    </div>
  </div>

  {/* --- Supportive Objectives Section --- */}
  
</section>
                <div className="bg-white rounded-2xl shadow-lg p-8">
  <div className="text-center mb-10">
    <h2 className="text-4xl font-bold text-orange-600">सहायक उद्देश्य</h2>
  </div>
 
  <div className="space-y-6">
    {supportiveObjectives.map((objective, index) => (
      <div key={index} className="flex items-start gap-4">
        {/* Styled Number */}
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-orange-100 text-orange-600 font-bold rounded-full border-2 border-orange-300 mt-1">
          {index + 1}
        </div>
        {/* Content (Title + Description) */}
        <div className="flex-1 text-gray-700">
          
          {/* --- KEY CHANGE HERE --- */}
          <h4 
            className={`
              font-semibold text-lg 
              ${index % 2 === 0 ? 'text-teal-800' : 'text-orange-600'}
            `}
          >
            {objective.title}
          </h4>
          
          <p className="text-base">{objective.description}</p>
        </div>
      </div>
    ))}
    {supportiveObjectives.length === 0 && <p className="text-gray-500 text-center">No supportive objectives listed.</p>}
  </div>
</div>
              {/* --- END OF MODIFIED SECTION --- */}

            </div>

            {/* Right Column - Contact */}
            <div className="space-y-6">
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
                      <div className="text-sm  text-teal-500 mb-1 font-extrabold">Email</div>
                      <a href={`mailto:${foundation.contact.email}`} className="hover:text-teal-500 font-extrabold text-orange-900 text-sm">
                        {foundation.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white bg-opacity-20 rounded-xl hover:bg-opacity-30 transition">
                    <Phone className="w-5 h-5 text-teal-500 mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-teal-500 font-extrabold mb-1">Phone</div>
                      <a href={`tel:${foundation.contact.phone}`} className="hover:text-teal-500 font-extrabold text-orange-900 text-sm">
                        {foundation.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white bg-opacity-20 rounded-xl hover:bg-opacity-30 transition">
                    <MapPin className="w-5 h-5 text-teal-500 mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-teal-500 mb-1 font-extrabold">Address</div>
                      <p className="text-sm text-orange-900 font-extrabold">{foundation.contact.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}