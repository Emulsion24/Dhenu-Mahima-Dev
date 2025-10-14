"use client"
import { useParams } from 'next/navigation';
import React, { useEffect,useState } from 'react';
import { ArrowLeft, Target, Heart, Users, TrendingUp, Mail, Phone, MapPin, ExternalLink, Calendar, Award } from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import axios from 'axios';

export default function FoundationPage({ slug }) {
  const [foundation, setFoundation] = useState(null);
  const [loading, setLoading] = useState(true);
const params = useParams(); // Next.js hook to get URL params
  const currentSlug = params.slug; 
  useEffect(() => {
    async function fetchFoundation() {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/foundation/${currentSlug}`);
        setFoundation(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch foundation data:", error);
        setLoading(false);
      }
    }

    fetchFoundation();
  }, [currentSlug]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!foundation) return <div className="text-center py-20">Foundation not found</div>;

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
                  {foundation.activities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-white bg-opacity-20 rounded-xl hover:bg-opacity-30 transition">
                      <div className="bg-white text-green-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                        {index + 1}
                      </div>
                      <p className="flex-1 text-green-600">{activity.activityText}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Objectives */}
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
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
