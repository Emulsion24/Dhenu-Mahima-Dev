"use client";
import Footer from "@/components/Footer";
import Headers from "@/components/Header";
import { useState } from "react";
import { Upload, Check, BookOpen, Gift, Star, Zap, Users } from "lucide-react";

const membershipPlans = [
  {
    type: "annual",
    name: "वार्षिक सदस्यता",
    price: "₹500",
    duration: "12 महीने",
    icon: BookOpen,
    benefits: [
      "12 महीनों के लिए मासिक पत्रिका",
      "विशेष लेख और साक्षात्कार",
      "डिजिटल आर्काइव की पहुंच",
      "सदस्यता कार्ड"
    ],
    popular: true
  },
  {
    type: "halfyearly",
    name: "अर्धवार्षिक सदस्यता",
    price: "₹300",
    duration: "6 महीने",
    icon: Gift,
    benefits: [
      "6 महीनों के लिए मासिक पत्रिका",
      "विशेष लेख और साक्षात्कार",
      "डिजिटल आर्काइव की पहुंच"
    ],
    popular: false
  },
  {
    type: "lifetime",
    name: "आजीवन सदस्यता",
    price: "₹5000",
    duration: "जीवन भर",
    icon: Star,
    benefits: [
      "आजीवन मासिक पत्रिका",
      "सभी विशेष अंकों की मुफ्त प्रति",
      "डिजिटल आर्काइव की पूर्ण पहुंच",
      "विशेष कार्यक्रमों में प्राथमिकता",
      "स्वर्ण सदस्यता कार्ड"
    ],
    popular: false
  }
];

export default function MagazineMembership() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    membershipType: "annual",
    paymentProof: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, paymentProof: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Add your form submission logic here
    // Example: await fetch('/api/membership', { method: 'POST', body: formData })
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        membershipType: "annual",
        paymentProof: null
      });
    }, 3000);
  };

  return (
    <>
      <Headers />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                <BookOpen className="w-10 h-10" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                मासिक पत्रिका सदस्यता
              </h1>
              <p className="text-lg md:text-xl mb-8 leading-relaxed">
                श्री गोपाल परिवार संघ की मासिक पत्रिका के सदस्य बनें और आध्यात्मिक ज्ञान, 
                सामाजिक सेवा और सांस्कृतिक गतिविधियों से जुड़े रहें।
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">मासिक अंक</h3>
                <p className="text-gray-600">हर महीने नवीनतम सामग्री और विशेष लेख</p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">विशेष समुदाय</h3>
                <p className="text-gray-600">समान विचारधारा वाले लोगों का समुदाय</p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">प्रीमियम सामग्री</h3>
                <p className="text-gray-600">विशेष साक्षात्कार और गहन विश्लेषण</p>
              </div>
            </div>

            {/* Membership Plans */}
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
              सदस्यता योजनाएं
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {membershipPlans.map((plan, idx) => {
                const IconComponent = plan.icon;
                return (
                  <div
                    key={idx}
                    className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                      plan.popular ? 'ring-2 ring-orange-500 scale-105' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                          सबसे लोकप्रिय
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                      <div className="text-4xl font-bold text-orange-600 mb-1">{plan.price}</div>
                      <p className="text-gray-600">{plan.duration}</p>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.benefits.map((benefit, bidx) => (
                        <li key={bidx} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, membershipType: plan.type }))}
                      className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                        formData.membershipType === plan.type
                          ? 'bg-orange-600 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {formData.membershipType === plan.type ? 'चयनित' : 'चुनें'}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Form and Payment Section */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Registration Form */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">सदस्यता फॉर्म</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">पूरा नाम *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                      placeholder="अपना नाम दर्ज करें"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">ईमेल *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">मोबाइल नंबर *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                      placeholder="10 अंकों का मोबाइल नंबर"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">पूरा पता *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition resize-none"
                      placeholder="अपना पूरा पता दर्ज करें"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">शहर *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                        placeholder="शहर"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">राज्य *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                        placeholder="राज्य"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">पिनकोड *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                      placeholder="6 अंकों का पिनकोड"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">भुगतान प्रमाण (स्क्रीनशॉट) *</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
                      <input
                        type="file"
                        accept="images/*"
                        onChange={handleFileChange}
                        required
                        className="hidden"
                        id="paymentProof"
                      />
                      <label htmlFor="paymentProof" className="cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">
                          {formData.paymentProof ? formData.paymentProof.name : 'फाइल अपलोड करने के लिए क्लिक करें'}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">PNG, JPG (अधिकतम 5MB)</p>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || submitted}
                    className={`w-full py-4 rounded-lg font-semibold text-white transition-all ${
                      submitted
                        ? 'bg-green-500'
                        : isSubmitting
                        ? 'bg-gray-400'
                        : 'bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-700 hover:to-yellow-600'
                    }`}
                  >
                    {submitted ? (
                      <span className="flex items-center justify-center">
                        <Check className="w-5 h-5 mr-2" />
                        सफलतापूर्वक भेजा गया!
                      </span>
                    ) : isSubmitting ? (
                      'भेजा जा रहा है...'
                    ) : (
                      'फॉर्म जमा करें'
                    )}
                  </button>
                </form>
              </div>

              {/* Payment Information */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">भुगतान जानकारी</h2>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 mb-6">
                    <div className="flex justify-center mb-4">
                      <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded">
                        <img src="/images/upi-qr.png" alt="Qr" />
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-gray-700 font-medium">
                      इस QR कोड को स्कैन करके भुगतान करें
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="border-b pb-3">
                      <p className="text-sm text-gray-600">बैंक का नाम</p>
                      <p className="font-semibold text-gray-800">Punjab National Bank</p>
                    </div>
                    
                    <div className="border-b pb-3">
                      <p className="text-sm text-gray-600">शाखा</p>
                      <p className="font-semibold text-gray-800">Pushkar, Ajmer, Rajasthan</p>
                    </div>
                    
                    <div className="border-b pb-3">
                      <p className="text-sm text-gray-600">खाता संख्या</p>
                      <p className="font-semibold text-gray-800">7289000100040339</p>
                    </div>
                    
                    <div className="border-b pb-3">
                      <p className="text-sm text-gray-600">IFSC कोड</p>
                      <p className="font-semibold text-gray-800">PUNB0082500</p>
                    </div>
                    
                    <div className="pb-3">
                      <p className="text-sm text-gray-600">खाता नाम</p>
                      <p className="font-semibold text-gray-800">SWAMI RAM YOGA SADHNA SAMITI PUSHKAR</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                  <h3 className="font-bold text-blue-900 mb-3 flex items-center">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-2">i</span>
                    महत्वपूर्ण सूचना
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>भुगतान करने के बाद स्क्रीनशॉट अवश्य सहेजें</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>भुगतान प्रमाण फॉर्म में अपलोड करना अनिवार्य है</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>सदस्यता सत्यापन में 2-3 कार्य दिवस लग सकते हैं</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>पहली पत्रिका अगले माह की 1 तारीख से भेजी जाएगी</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}