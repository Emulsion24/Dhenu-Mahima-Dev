"use client";
import Footer from "@/components/Footer";
import Headers from "@/components/Header";
import { useState } from "react";
import { Check, BookOpen, Gift, Star, Zap, Users, Smartphone, Shield, ArrowRight } from "lucide-react";
import API from "@/lib/api";
const membershipPlans = [
  {
    type: "annual",
    name: "वार्षिक सदस्यता",
    price: 500,
    priceDisplay: "₹500",
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
    price: 300,
    priceDisplay: "₹300",
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
    price: 5000,
    priceDisplay: "₹5000",
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
    membershipType: "annual"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectedPlan = membershipPlans.find(plan => plan.type === formData.membershipType);

  const handlePhonePePayment = async (e) => {
  e.preventDefault();

  // Validate form
  if (!formData.name || !formData.email || !formData.phone || !formData.address) {
    alert('कृपया सभी आवश्यक फ़ील्ड भरें।');
    return;
  }

  try {
    setIsSubmitting(true);

    // Create order payload
    const orderPayload = {
      ...formData,
      amount: selectedPlan.price,
      planName: selectedPlan.name,
      planType: selectedPlan.type,
      paymentMethod: 'phonepe'
    };

    // Call backend API using Axios instance
    const { data } = await API.post('/membership/create-order', orderPayload);

    if (data.success && data.paymentUrl) {
      // Redirect to PhonePe payment page
      window.location.href = data.paymentUrl;
    } else {
      alert('भुगतान शुरू करने में त्रुटि। कृपया पुनः प्रयास करें।');
      setIsSubmitting(false);
    }
  } catch (error) {
    console.error('Payment error:', error);
    alert('भुगतान शुरू करने में त्रुटि। कृपया पुनः प्रयास करें।');
    setIsSubmitting(false);
  }
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
                    className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${
                      plan.popular ? 'ring-2 ring-orange-500 scale-105' : ''
                    } ${formData.membershipType === plan.type ? 'ring-2 ring-purple-500' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, membershipType: plan.type }))}
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
                      <div className="text-4xl font-bold text-orange-600 mb-1">{plan.priceDisplay}</div>
                      <p className="text-gray-600">{plan.duration}</p>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.benefits.map((benefit, bidx) => (
                        <li key={bidx} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className={`w-full py-3 rounded-lg font-semibold transition-colors text-center ${
                      formData.membershipType === plan.type
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {formData.membershipType === plan.type ? '✓ चयनित' : 'चुनें'}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Form and Payment Section */}
            <div className="max-w-2xl mx-auto">
              {/* Registration Form */}
              <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">सदस्यता फॉर्म</h2>
                  <div className="flex items-center gap-2 text-purple-600">
                    <Smartphone className="w-5 h-5" />
                    <span className="text-sm font-semibold">PhonePe से भुगतान करें</span>
                  </div>
                </div>
                
                <form onSubmit={handlePhonePePayment} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">पूरा नाम *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
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
                      pattern="[0-9]{10}"
                      maxLength="10"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
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
                      pattern="[0-9]{6}"
                      maxLength="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                      placeholder="6 अंकों का पिनकोड"
                    />
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mt-6">
                    <h3 className="font-bold text-gray-800 mb-4">ऑर्डर सारांश</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-gray-700">
                        <span>चयनित योजना:</span>
                        <span className="font-semibold">{selectedPlan.name}</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>अवधि:</span>
                        <span className="font-semibold">{selectedPlan.duration}</span>
                      </div>
                      <div className="border-t border-gray-300 my-2"></div>
                      <div className="flex justify-between text-lg font-bold text-purple-600">
                        <span>कुल राशि:</span>
                        <span>{selectedPlan.priceDisplay}</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 shadow-lg'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        भुगतान प्रोसेस हो रहा है...
                      </>
                    ) : (
                      <>
                        <Smartphone className="w-5 h-5" />
                        PhonePe से {selectedPlan.priceDisplay} का भुगतान करें
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-4">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>100% सुरक्षित और एन्क्रिप्टेड भुगतान</span>
                  </div>
                </form>
              </div>

              {/* Information Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="font-bold text-blue-900 mb-3 flex items-center">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-2">i</span>
                    भुगतान प्रक्रिया
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start">
                      <span className="mr-2">1.</span>
                      <span>फॉर्म भरें और Submit करें</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">2.</span>
                      <span>PhonePe पेज पर redirect होंगे</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">3.</span>
                      <span>PhonePe से सुरक्षित भुगतान करें</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">4.</span>
                      <span>भुगतान पूर्ण होने पर confirmation मिलेगा</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="font-bold text-green-900 mb-3 flex items-center">
                    <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mr-2">✓</span>
                    सदस्यता लाभ
                  </h3>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>तुरंत सदस्यता सक्रिय होगी</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Email पर confirmation भेजा जाएगा</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>पहली पत्रिका अगले माह से</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>डिजिटल सदस्यता कार्ड मिलेगा</span>
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