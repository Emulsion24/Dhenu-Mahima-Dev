"use client";
import Footer from '@/components/Footer';
import Headers from '@/components/Header';
import React, { useState } from 'react';

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

export default function sansthan() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null); // To handle success/error messages

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

  return (
    <>
    <Headers/>
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
          {/* Sansthan Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 -mt-32">
            {sansthans.map((sansthan, index) => (
              <div
                key={index}
                className="bg-white shadow-xl rounded-xl overflow-hidden group transform hover:-translate-y-2 transition-all duration-300 ease-in-out hover:shadow-2xl border border-gray-100"
              >
                <div className="relative h-56 w-full">
                  <img
                    src={sansthan.image}
                    alt={sansthan.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {sansthan.name}
                  </h3>
                  <div className="space-y-3 text-gray-600">
                    <InfoRow icon={ICONS.location} text={sansthan.address} />
                    <InfoRow icon={ICONS.phone} text={sansthan.contact} link={`tel:${sansthan.contact}`} />
                    <InfoRow icon={ICONS.mail} text={sansthan.email} link={`mailto:${sansthan.email}`} />
                    <InfoRow icon={ICONS.user} text={sansthan.person} />
                  </div>
                </div>
              </div>
            ))}
          </div>

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
                <InputField id="name" name="name" type="text" label="Name" value={formData.name} onChange={handleChange} required />
                <InputField id="phone" name="phone" type="tel" label="Phone" value={formData.phone} onChange={handleChange} required />
              </div>
              <InputField id="subject" name="subject" type="text" label="Subject" value={formData.subject} onChange={handleChange} required />
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
                  className="w-full border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
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
      <Footer/>
    </>
  );
}

// --- Sub-components for cleaner JSX ---

const InfoRow = ({ icon, text, link }) => (
  <div className="flex items-start space-x-3">
    <Icon path={icon} className="w-5 h-5 mt-1 text-amber-500 flex-shrink-0" />
    {link ? (
      <a href={link} className="text-sm hover:text-amber-600 transition-colors">{text}</a>
    ) : (
      <span className="text-sm">{text}</span>
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
            className="w-full border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
        />
    </div>
);


// --- Data and Icons ---

const ICONS = {
  location: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  phone: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
  mail: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  user: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
};

const sansthans = [
  {
    name: "शीतल आश्रम, पुष्कर",
    image: "https://placehold.co/600x400/FEF3C7/92400E?text=Sheetal+Ashram",
    address: "अजमेर रोड, पुष्कर, राजस्थान - 305022",
    contact: "9829825025",
    email: "lokeshrathore1002@gmail.com",
    person: "श्री लोकेश राठौड़",
  },
  {
    name: "स्वामी राम साधना योगपीठ, उत्तरकाशी",
    image: "https://placehold.co/600x400/FDE68A/B45309?text=Ram+Sadhna+Yogpeeth",
    address: "अस्सी गंगा संगम गंगोरी, उत्तरकाशी, उत्तराखंड - 249193",
    contact: "9414172887",
    email: "shraddhagopal922@gmail.com",
    person: "श्री श्रद्धा गोपाल",
  },
  {
    name: "सरस्वती शिशु मंदिर, गंगोरी",
    image: "https://placehold.co/600x400/FCD34D/92400E?text=Saraswati+Mandir",
    address: "गंगोरी, उत्तरकाशी, उत्तराखंड - 249193",
    contact: "9927953728, 9456557208",
    email: "gopalpariwar@gmail.com",
    person: "श्री गोपाल परिहार",
  },
];

