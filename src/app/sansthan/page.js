"use client";
import Footer from '@/components/Footer';
import Headers from '@/components/Header';
import React, { useState, useEffect } from 'react';

import API from '@/lib/api';



// --- Helper Components ---

// Reusable SVG Icon Component for a cleaner look
const Icon = ({ path, className = 'w-5 h-5' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d={path} />
  </svg>
);

// --- Main Page Component ---

export default function Sansthan() {
  const [sansthans, setSansthans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null);

  // Fetch sansthans from backend
  useEffect(() => {
    fetchSansthans();
  }, []);

  const fetchSansthans = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get(`/sansthans`);
      
      if (response.data.success) {
        setSansthans(response.data.data);
      } else {
        setError('Failed to load sansthans');
      }
    } catch (err) {
      console.error('Error fetching sansthans:', err);
      setError('Unable to load sansthans. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // In a real app, you would send this data to a server.
    // For this demo, we'll just show a success message.
    setFormStatus('success');
    setFormData({ name: "", phone: "", subject: "", message: "" });

    // Hide the success message after 3 seconds
    setTimeout(() => {
      setFormStatus(null);
    }, 3000);
  };

  // Helper function to parse description and extract address
  const parseDescription = (description) => {
    if (!description) return { desc: '', address: '' };
    const parts = description.split('\n\nAddress: ');
    return {
      desc: parts[0] || '',
      address: parts[1] || ''
    };
  };

  return (
    <>
      <Headers />
      {/* Hero Header Section */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-md">
            दाता भगवान के संस्थान
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-amber-100 drop-shadow-sm">
            हमारे समुदाय की सेवा और विस्तार के लिए समर्पित हमारे विभिन्न केंद्रों का अन्वेषण करें।
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="bg-slate-50 py-20 px-4 md:px-8 lg:px-16 font-sans">
        <div className="container mx-auto">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20 -mt-32">
              <div className="bg-white shadow-xl rounded-xl p-8">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
                <p className="mt-4 text-gray-600 font-medium text-center">Loading sansthans...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-2xl mx-auto -mt-32 mb-12">
              <div className="flex items-center space-x-3">
                <Icon path={ICONS.error} className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="text-red-800 font-semibold">Error Loading Data</h3>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                  <button
                    onClick={fetchSansthans}
                    className="mt-3 text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Sansthan Grid */}
          {!loading && !error && (
            <>
              {sansthans.length === 0 ? (
                <div className="bg-white shadow-xl rounded-xl p-12 text-center max-w-2xl mx-auto -mt-32 mb-12">
                  <Icon path={ICONS.building} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-700 mb-2">No Sansthans Available</h3>
                  <p className="text-gray-500">Please check back later for updates.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 -mt-32">
                  {sansthans.map((sansthan, index) => {
                    const { desc, address } = parseDescription(sansthan.description);
                    
                    return (
                      <div
                        key={sansthan.id}
                        className="bg-gradient-to-br from-white via-amber-50 to-orange-50 shadow-xl rounded-xl overflow-hidden group transform hover:-translate-y-3 transition-all duration-500 ease-out hover:shadow-2xl border-2 border-amber-200 hover:border-amber-400 animate-fade-in-up"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <div className="relative h-56 w-full overflow-hidden">
                          {sansthan.image ? (
                            <img
                              src={sansthan.image}
                              alt={sansthan.name}
                              className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-700 ease-out"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-amber-200 via-orange-200 to-amber-300 flex items-center justify-center animate-gradient">
                              <Icon path={ICONS.building} className="w-20 h-20 text-amber-700 opacity-40 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
                            </div>
                          )}
                          {/* Overlay gradient on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <div className="p-6 relative">
                          {/* Decorative corner accent */}
                          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-400/20 to-transparent rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500"></div>
                          
                          <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-amber-700 transition-colors duration-300">
                            {sansthan.name}
                          </h3>
                          
                          {/* Description */}
                          {desc && (
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                              {desc}
                            </p>
                          )}

                          <div className="space-y-3 text-gray-600">
                            {/* Address */}
                            {address && (
                              <InfoRow icon={ICONS.location} text={address} />
                            )}
                            
                            {/* Phone */}
                            {sansthan.phone && (
                              <InfoRow 
                                icon={ICONS.phone} 
                                text={sansthan.phone} 
                                link={`tel:${sansthan.phone}`} 
                              />
                            )}
                            
                            {/* Alternate Phone */}
                            {sansthan.altPhone && (
                              <InfoRow 
                                icon={ICONS.phone} 
                                text={sansthan.altPhone} 
                                link={`tel:${sansthan.altPhone}`}
                                className="ml-8"
                              />
                            )}
                            
                            {/* Email */}
                            {sansthan.email && (
                              <InfoRow 
                                icon={ICONS.mail} 
                                text={sansthan.email} 
                                link={`mailto:${sansthan.email}`} 
                              />
                            )}
                            
                            {/* Contact Person */}
                            {sansthan.person && (
                              <InfoRow icon={ICONS.user} text={sansthan.person} />
                            )}
                            
                            {/* Timings */}
                            {sansthan.timing && (
                              <InfoRow icon={ICONS.clock} text={sansthan.timing} />
                            )}
                            
                            {/* Website */}
                            {sansthan.website && (
                              <InfoRow 
                                icon={ICONS.globe} 
                                text="Visit Website" 
                                link={sansthan.website}
                                external
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* Contact Us Card */}
          <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-12 max-w-4xl mx-auto border-t-4 border-amber-500 mt-20">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
              Contact Us
            </h2>
            <p className="text-center text-gray-500 mb-8">
              Have a question or want to get in touch? Fill out the form below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField 
                  id="name" 
                  name="name" 
                  type="text" 
                  label="Name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
                <InputField 
                  id="phone" 
                  name="phone" 
                  type="tel" 
                  label="Phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <InputField 
                id="subject" 
                name="subject" 
                type="text" 
                label="Subject" 
                value={formData.subject} 
                onChange={handleChange} 
                required 
              />
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Submit
              </button>

              {formStatus === 'success' && (
                <div className="mt-4 text-center p-3 bg-green-100 text-green-800 rounded-lg">
                  Thank you for reaching out! We'll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

// --- Sub-components for cleaner JSX ---

const InfoRow = ({ icon, text, link, external = false, className = "" }) => (
  <div className={`flex items-start space-x-3 group/item ${className}`}>
    <div className="p-1.5 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg group-hover/item:from-amber-200 group-hover/item:to-orange-200 transition-all duration-300 group-hover/item:scale-110 group-hover/item:rotate-6">
      <Icon path={icon} className="w-4 h-4 text-amber-600 flex-shrink-0" />
    </div>
    {link ? (
      <a 
        href={link} 
        className="text-sm hover:text-amber-700 transition-all duration-300 break-words group-hover/item:translate-x-1 inline-block font-medium hover:underline decoration-amber-500 decoration-2 underline-offset-2"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {text}
      </a>
    ) : (
      <span className="text-sm break-words group-hover/item:text-gray-800 transition-colors duration-300">{text}</span>
    )}
  </div>
);

const InputField = ({ id, name, type, label, value, onChange, required }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
    />
  </div>
);

// --- Data and Icons ---

const ICONS = {
  location: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  phone: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
  mail: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  user: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
  clock: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z",
  globe: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z",
  building: "M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z",
  error: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",
};

// Add custom CSS for animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
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

    @keyframes gradient {
      0%, 100% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
    }

    .animate-fade-in-up {
      animation: fadeInUp 0.6s ease-out forwards;
      opacity: 0;
    }

    .animate-gradient {
      background-size: 200% 200%;
      animation: gradient 8s ease infinite;
    }
  `;
  if (!document.querySelector('#sansthan-animations')) {
    style.id = 'sansthan-animations';
    document.head.appendChild(style);
  }
}