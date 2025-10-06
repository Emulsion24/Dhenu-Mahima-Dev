"use client";
import Footer from "@/components/Footer";
import Headers from "@/components/Header";
import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ExternalLink, ChevronRight } from 'lucide-react';

export default function AboutUsPage() {
  const [expandedMember, setExpandedMember] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: "स्वामी राम ज्ञान तीर्थ जी महाराज",
      nameEn: "Swami Ram Gyan Tirth Ji Maharaj",
      role: "संस्थापक एवं मुख्य संरक्षक",
      roleEn: "Founder & Chief Patron",
      image: "https://placehold.co/400x500/FF6B6B/fff?text=Swami+Ji",
      shortBio: "मनुष्य में मनुष्यत्व को जगाने में यदि कोई सार्वभौम साधन है, तो वह सर्वहितकारी भाव से वेदलक्षणा गौमाता की सेवा...",
      fullBio: "मनुष्य में मनुष्यत्व को जगाने में यदि कोई सार्वभौम साधन है, तो वह सर्वहितकारी भाव से वेदलक्षणा गौमाता की सेवा और पर्यावरण रक्षा...... पुज्या गौमाता तथा उसके अखिल गौवंश के संरक्षण, सम्पोषण, पर्यावरण संरक्षण हेतु वृक्षारोपण करना एवं विश्व शांति स्थापित करने वाली सनातन संस्कृति का प्रचार करना, यही एक पूर्णतया सर्व हितकारी प्रवृति है।",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#"
      },
      contact: {
        email: "swamiji@example.com",
        phone: "+91 98765 43210"
      }
    },
    {
      id: 2,
      name: "गोपालाचार्य स्वामी गोपालानन्द जी",
      nameEn: "Gopalacharya Swami Gopalanand Ji",
      role: "गुरुदेव एवं मार्गदर्शक",
      roleEn: "Gurudev & Mentor",
      image: "https://placehold.co/400x500/4ECDC4/fff?text=Gurudev",
      shortBio: "31 वर्षीय गो पर्यावरण एंव अध्यात्म चेतना पदयात्रा के प्रणेता...",
      fullBio: "विश्व की सबसे पहली लम्बी व सबसे बड़ी पदयात्रा '31 वर्षीय गो पर्यावरण एंव अध्यात्म चेतना पदयात्रा' के प्रणेता। जगत जननी भगवती, गौ माता के दिव्य एवं ईश्वरीय स्वरूप की महिमा का श्रवण, चिन्तन व मनन तथा रामचरित मानस श्रीमद्भगवत गीता व वेदांत का अध्ययन।",
      social: {
        facebook: "#",
        instagram: "#",
        linkedin: "#"
      },
      contact: {
        email: "gurudev@example.com",
        phone: "+91 98765 43211"
      }
    },
    {
      id: 3,
      name: "ब्रह्मचारी राधे श्याम",
      nameEn: "Brahmachari Radhe Shyam",
      role: "गौशाला प्रमुख",
      roleEn: "Gaushala Head",
      image: "https://placehold.co/400x500/45B7D1/fff?text=Brahmachari",
      shortBio: "बचपन से ही गौ सेवा में समर्पित, 10 वर्षों का अनुभव...",
      fullBio: "राजस्थान के भीलवाड़ा जिले के रायला गाँव में जन्म। परिवार का वातावरण आध्यात्मिक होने के कारण पूजा पाठ दर्शन सेवा और दया का भाव बाल्यकाल से ही था। 10 साल तक श्री पथमेड़ा गोधाम की विभिन्न गौशालाओं में प्रत्यक्ष गौसेवा करने का सौभाग्य प्राप्त हुआ।",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#"
      },
      contact: {
        email: "radheshyam@example.com",
        phone: "+91 98765 43212"
      }
    },
    {
      id: 4,
      name: "माता गीता देवी",
      nameEn: "Mata Geeta Devi",
      role: "महिला प्रकोष्ठ प्रमुख",
      roleEn: "Women's Wing Head",
      image: "https://placehold.co/400x500/FFA07A/fff?text=Mata+Ji",
      shortBio: "महिला सशक्तिकरण एवं गौ सेवा में अग्रणी...",
      fullBio: "सूरत, गुजरात में जन्म। शिक्षा से दूरियाँ रही पर गौमाता की कृपा से गौमाता से सदैव नजदीकियाँ रही। गो-सेवा का काम महज 10 वर्ष की आयु में ईश्वर कृपा से प्राप्त हुआ। महिलाओं को गौ सेवा से जोड़ने में सक्रिय।",
      social: {
        facebook: "#",
        instagram: "#"
      },
      contact: {
        email: "geetadevi@example.com",
        phone: "+91 98765 43213"
      }
    },
    {
      id: 5,
      name: "पंडित विजय शर्मा",
      nameEn: "Pandit Vijay Sharma",
      role: "धार्मिक कार्य प्रमुख",
      roleEn: "Religious Activities Head",
      image: "https://placehold.co/400x500/98D8C8/fff?text=Pandit+Ji",
      shortBio: "वैदिक कर्मकांड एवं गौ आराधना के विशेषज्ञ...",
      fullBio: "राजस्थान के बडोदिया, बांसवाडा के ब्राह्मण शिक्षक परिवार में जन्म। B.A, B.Ed की शिक्षा। गौमाता की महिमा और वैदिक परंपराओं का गहन अध्ययन। सुरभि यज्ञ और धार्मिक अनुष्ठानों के संचालन में निपुण।",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      },
      contact: {
        email: "vijaysharma@example.com",
        phone: "+91 98765 43214"
      }
    },
    {
      id: 6,
      name: "युवा कार्यकर्ता राज कुमार",
      nameEn: "Youth Activist Raj Kumar",
      role: "युवा प्रकोष्ठ संयोजक",
      roleEn: "Youth Coordinator",
      image: "https://placehold.co/400x500/F7DC6F/333?text=Raj+Kumar",
      shortBio: "युवाओं को गौ सेवा से जोड़ने का अभियान...",
      fullBio: "झालावाड़ जिले के बल्देवपुरा में जन्म। क्षत्रिय परिवार। बाल्यकाल से ही भगवती गौमाता की सेवा करने का पुण्यमयी शुभ अवसर प्राप्त हुआ। युवाओं में गौ चेतना जागृत करने के लिए सोशल मीडिया और जमीनी स्तर पर कार्यरत।",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#",
        linkedin: "#"
      },
      contact: {
        email: "rajkumar@example.com",
        phone: "+91 98765 43215"
      }
    }
  ];

  const toggleExpand = (id) => {
    setExpandedMember(expandedMember === id ? null : id);
  };

  return (
    <>
    <Headers/>
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-yellow-50 to-orange-50">
      {/* Header Section */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
          {/* Badge */}
          <div className=" mt-3 inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-2 rounded-full mb-6 border border-yellow-300 shadow-lg">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-orange-700 uppercase tracking-wider">Gopal Pariwar</span>
          </div>

          {/* Main Title with modern styling */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="inline-block bg-gradient-to-r from-yellow-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent drop-shadow-sm">
             हमारा गोपाल परिवार
            </span>
          </h1>
          
          
          
          {/* Decorative element */}
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-orange-400"></div>
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-orange-400"></div>
          </div>
        </div>

      {/* Team Members Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group relative bg-gradient-to-r from-orange-300 to-yellow-400 rounded-3xl shadow-xl border-2 border-orange-200 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-orange-400 hover:-translate-y-2"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                
                {/* Card Content */}
                <div className="relative">
                  {/* Image Section */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.nameEn}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { 
                        e.target.src = "https://placehold.co/400x500/FF9933/fff?text=Team+Member"; 
                      }}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Role Badge */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-orange-200">
                        <p className="text-sm font-bold text-orange-600">{member.role}</p>
                        <p className="text-xs text-gray-600">{member.roleEn}</p>
                      </div>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-6">
                    {/* Name */}
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{member.nameEn}</p>

                    {/* Short Bio */}
                    <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-3">
                      {expandedMember === member.id ? member.fullBio : member.shortBio}
                    </p>

                    {/* Read More Button */}
                    <button
                      onClick={() => toggleExpand(member.id)}
                      className="flex items-center gap-2 text-orange-600 font-semibold text-sm hover:text-orange-700 transition-colors mb-4"
                    >
                      {expandedMember === member.id ? 'Read Less' : 'Read More'}
                      <ChevronRight size={16} className={`transition-transform ${expandedMember === member.id ? 'rotate-90' : ''}`} />
                    </button>

                    {/* Contact Info */}
                    <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                      <a href={`mailto:${member.contact.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors">
                        <Mail size={16} />
                        <span className="truncate">{member.contact.email}</span>
                      </a>
                      <a href={`tel:${member.contact.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors">
                        <Phone size={16} />
                        <span>{member.contact.phone}</span>
                      </a>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center justify-center gap-3">
                      {member.social.facebook && (
                        <a href={member.social.facebook} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform">
                          <Facebook size={18} />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a href={member.social.twitter} className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center text-white hover:scale-110 transition-transform">
                          <Twitter size={18} />
                        </a>
                      )}
                      {member.social.instagram && (
                        <a href={member.social.instagram} className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white hover:scale-110 transition-transform">
                          <Instagram size={18} />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a href={member.social.linkedin} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-700 to-blue-800 flex items-center justify-center text-white hover:scale-110 transition-transform">
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

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-3xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              हमारे साथ जुड़ें
            </h2>
            <p className="text-lg text-white/90 mb-8">
              गौ सेवा और समाज कल्याण के इस पुनीत कार्य में आप भी अपना योगदान दें
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              
              <button className="bg-orange-800 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
                संपर्क करें
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
}