"use client";
import Footer from "@/components/Footer";
import Headers from "@/components/Header";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, ChevronRight, ArrowRight } from "lucide-react";
import API from "@/lib/api";

export default function AboutUsPage() {
  const [expandedMember, setExpandedMember] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]); // 🔹 Replaces static array
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ Fetch data from backend
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await API.get("/admin/gopalpariwar"); // your backend API
        const data = res.data;
       

        // ✅ Safely parse JSON fields
        const parsed = data.map((m) => ({
          id: m.id,
          name: m.personalInfo ? safeParse(m.personalInfo).name || "Unknown" : "Unknown",
          nameEn: m.heroTitle || "—",
          slug: m.id, // or m.slug if available in backend
          role: "संरक्षक सदस्य",
          roleEn: "Member",
          image: m.heroImage || "https://placehold.co/400x500/FF9933/fff?text=Team+Member",
          shortBio: m.lifeJourney?.slice(0, 80) || "—",
          fullBio: m.lifeJourney || "—",
          contact: {
            email: safeParse(m.personalInfo)?.email || "",
            phone: safeParse(m.personalInfo)?.phone || "",
          },
          social: {
            facebook: "#",
            twitter: "#",
            instagram: "#",
            linkedin: "#",
          },
        }));

        setTeamMembers(parsed);
      } catch (error) {
        console.error("Failed to load team members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Helper for safe JSON parsing (handles double-stringified data)
  const safeParse = (value) => {
    try {
      return JSON.parse(
        typeof value === "string" && value.startsWith('"') ? JSON.parse(value) : value
      );
    } catch {
      return {};
    }
  };

  const toggleExpand = (id) => {
    setExpandedMember(expandedMember === id ? null : id);
  };

  const handleKnowMore = (member) => {
    router.push(`/gopal-pariwar-page/${member.name}?id=${member.id}`);
  };

  // ✅ Loading state
  if (loading) {
    return (
      <>
        <Headers />
        <div className="flex items-center justify-center h-screen">
          <p className="text-orange-600 font-semibold text-lg">Loading members...</p>
        </div>
        <Footer />
      </>
    );
  }

  // ✅ If empty data
  if (teamMembers.length === 0) {
    return (
      <>
        <Headers />
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500 text-lg">No members found</p>
        </div>
        <Footer />
      </>
    );
  }

  // ✅ Your original design starts below — untouched
  return (
    <>
      <Headers />
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-yellow-50 to-orange-50">
        {/* Your entire design below stays the same */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="mt-3 inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-2 rounded-full mb-6 border border-yellow-300 shadow-lg">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-orange-700 uppercase tracking-wider">
              Gopal Pariwar
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="inline-block bg-gradient-to-r from-yellow-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent drop-shadow-sm">
              हमारा गोपाल परिवार
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-orange-400"></div>
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-orange-400"></div>
          </div>
        </div>

        {/* Team Members Grid (unchanged) */}
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="group relative bg-gradient-to-r from-orange-300 to-yellow-400 rounded-3xl shadow-xl border-2 border-orange-200 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-orange-400 hover:-translate-y-2"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>

                  <div className="relative">
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.nameEn}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = "https://placehold.co/400x500/FF9933/fff?text=Team+Member";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-orange-200">
                          <p className="text-sm font-bold text-orange-600">{member.role}</p>
                          <p className="text-xs text-gray-600">{member.roleEn}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{member.nameEn}</p>

                      <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-3">
                        {expandedMember === member.id ? member.fullBio : member.shortBio}
                      </p>

                      <button
                        onClick={() => toggleExpand(member.id)}
                        className="flex items-center gap-2 text-orange-600 font-semibold text-sm hover:text-orange-700 transition-colors mb-4"
                      >
                        {expandedMember === member.id ? "Read Less" : "Read More"}
                        <ChevronRight
                          size={16}
                          className={`transition-transform ${
                            expandedMember === member.id ? "rotate-90" : ""
                          }`}
                        />
                      </button>

                      <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                        {member.contact.email && (
                          <a
                            href={`mailto:${member.contact.email}`}
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
                          >
                            <Mail size={16} />
                            <span className="truncate">{member.contact.email}</span>
                          </a>
                        )}
                        {member.contact.phone && (
                          <a
                            href={`tel:${member.contact.phone}`}
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
                          >
                            <Phone size={16} />
                            <span>{member.contact.phone}</span>
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => handleKnowMore(member)}
                        className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 mb-4"
                      >
                        Know More
                        <ArrowRight size={18} />
                      </button>

                      <div className="flex items-center justify-center gap-3">
                        {member.social.facebook && (
                          <a
                            href={member.social.facebook}
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform"
                          >
                            <Facebook size={18} />
                          </a>
                        )}
                        {member.social.twitter && (
                          <a
                            href={member.social.twitter}
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
                          >
                            <Twitter size={18} />
                          </a>
                        )}
                        {member.social.instagram && (
                          <a
                            href={member.social.instagram}
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
                          >
                            <Instagram size={18} />
                          </a>
                        )}
                        {member.social.linkedin && (
                          <a
                            href={member.social.linkedin}
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-700 to-blue-800 flex items-center justify-center text-white hover:scale-110 transition-transform"
                          >
                            <Linkedin size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
