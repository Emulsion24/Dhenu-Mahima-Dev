"use client";
import { useState, useRef, useEffect } from "react";
import { Check, BookOpen, Gift, Star, Zap, Users, Smartphone, Shield, ArrowRight, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import API from "@/lib/api";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

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
    membershipType: "",
    vpa: "" // For web users
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState({ type: "web", os: "WEB" });
  const [paymentStatus, setPaymentStatus] = useState(null); // 'pending', 'polling', 'success', 'failed'
  const [orderDetails, setOrderDetails] = useState(null);
  const [pollingInterval, setPollingInterval] = useState(null);
  const [showVpaInput, setShowVpaInput] = useState(false);
  const formRef = useRef(null);

  // Detect device type
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isAndroid = /android/i.test(userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(userAgent);

    let deviceType = "web";
    let deviceOS = "WEB";

    if (isAndroid) {
      deviceType = "android";
      deviceOS = "ANDROID";
    } else if (isIOS) {
      deviceType = "ios";
      deviceOS = "IOS";
    }

    setDeviceInfo({ type: deviceType, os: deviceOS, isMobile });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlanSelect = (planType) => {
    setFormData(prev => ({ ...prev, membershipType: planType }));
    setShowForm(true);
    
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const selectedPlan = membershipPlans.find(plan => plan.type === formData.membershipType);

  // Poll for payment status
  const startPolling = (merchantOrderId) => {
    setPaymentStatus('polling');
    
    const interval = setInterval(async () => {
      try {
        const response = await API.get(`/membership/callback/${merchantOrderId}`);
        console.log(response)
        if (response.data.success) {
          const state = response.data.data.state;
          
          if (state === 'COMPLETED') {
            clearInterval(interval);
            setPaymentStatus('success');
            setPollingInterval(null);
            
            // Redirect to success page after 2 seconds
            setTimeout(() => {
              window.location.href = '/magazine';
            }, 2000);
          } else if (state === 'FAILED') {
            clearInterval(interval);
            setPaymentStatus('failed');
            setPollingInterval(null);
              setTimeout(() => {
              window.location.href = '/magazine';
            }, 2000);
          }
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 3000); // Poll every 3 seconds
    
    setPollingInterval(interval);
    
    // Stop polling after 5 minutes
    setTimeout(() => {
      if (interval) {
        clearInterval(interval);
        setPaymentStatus('timeout');
      }
    }, 5 * 60 * 1000);
  };

  const handlePhonePePayment = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      alert('कृपया सभी आवश्यक फ़ील्ड भरें।');
      return;
    }

    // For web, require VPA
    if (deviceInfo.type === 'web' && !formData.vpa) {
      setShowVpaInput(true);
      alert('कृपया अपना UPI ID दर्ज करें (जैसे: yourname@paytm)');
      return;
    }

    try {
      setIsSubmitting(true);
      setPaymentStatus('pending');

      // Create subscription payload
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        membershipType: formData.membershipType,
        amount: selectedPlan.price,
        frequency: "MONTHLY",
        vpa: formData.vpa || undefined,
        paymentMode: deviceInfo.type === 'web' ? 'UPI_COLLECT' : 'UPI_INTENT'
      };

      const response = await API.post('/membership/create-order', payload);

      const result = response.data;

      if (result.success) {
        setOrderDetails(result.data);

        // Handle based on payment mode
        if (result.data.paymentMode === 'UPI_INTENT' && result.data.intentUrl) {
          // Mobile: Redirect to PhonePe app
          window.location.href = result.data.intentUrl;
        } else if (result.data.paymentMode === 'UPI_COLLECT' && result.data.pollRequired) {
          // Web: Start polling for payment status
          startPolling(result.data.merchantOrderId);
        }
      } else {
        // Handle error
        if (result.requiresVPA) {
          setShowVpaInput(true);
          alert(result.message);
        } else {
          alert(result.message || 'भुगतान शुरू करने में त्रुटि। कृपया पुनः प्रयास करें।');
        }
        setIsSubmitting(false);
        setPaymentStatus(null);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('भुगतान शुरू करने में त्रुटि। कृपया पुनः प्रयास करें।');
      setIsSubmitting(false);
      setPaymentStatus(null);
    }
  };

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  return (
    <>
    <Header/>
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
              श्री गोपाल परिवार संघ की मासिक पत्रिका के सदस्य बनें और आध्यात्मिक ज्ञान से जुड़े रहें।
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

          {/* Device Info Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
              <Smartphone className="w-4 h-4" />
              <span>
                {deviceInfo.type === 'android' && 'Android Device - PhonePe App में खुलेगा'}
                {deviceInfo.type === 'ios' && 'iOS Device - PhonePe App में खुलेगा'}
                {deviceInfo.type === 'web' && 'Web Browser - UPI ID से भुगतान करें'}
              </span>
            </div>
          </div>

          {/* Membership Plans */}
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            सदस्यता योजनाएं
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            अपनी पसंद की योजना चुनें और सदस्यता फॉर्म भरें
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {membershipPlans.map((plan, idx) => {
              const IconComponent = plan.icon;
              const isSelected = formData.membershipType === plan.type;
              
              return (
                <div
                  key={idx}
                  className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    plan.popular ? 'ring-2 ring-orange-500' : ''
                  } ${isSelected ? 'ring-4 ring-purple-500 scale-105' : ''}`}
                  onClick={() => handlePlanSelect(plan.type)}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        सबसे लोकप्रिय
                      </span>
                    </div>
                  )}

                  {isSelected && (
                    <div className="absolute -top-4 right-4">
                      <div className="bg-purple-500 text-white rounded-full p-2">
                        <Check className="w-5 h-5" />
                      </div>
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
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlanSelect(plan.type);
                    }}
                    className={`w-full py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                      isSelected
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:shadow-lg'
                    }`}
                  >
                    {isSelected ? '✓ चयनित - फॉर्म भरें' : 'इस योजना को चुनें'}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Form and Payment Section */}
          {showForm && selectedPlan && (
            <div ref={formRef} className="max-w-2xl mx-auto scroll-mt-20">
              {/* Payment Status Alert */}
              {paymentStatus === 'polling' && (
                <div className="bg-blue-100 border border-blue-400 text-blue-800 rounded-xl p-6 mb-8 animate-pulse">
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">भुगतान अनुरोध भेजा गया</h3>
                      <p className="text-sm">कृपया अपने UPI ऐप में भुगतान अनुरोध स्वीकार करें। हम स्थिति की जांच कर रहे हैं...</p>
                    </div>
                  </div>
                </div>
              )}

              {paymentStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-800 rounded-xl p-6 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">✓ भुगतान सफल!</h3>
                      <p className="text-sm">आपकी सदस्यता सक्रिय हो गई है। आपको जल्द ही redirect किया जाएगा...</p>
                    </div>
                  </div>
                </div>
              )}

              {paymentStatus === 'failed' && (
                <div className="bg-red-100 border border-red-400 text-red-800 rounded-xl p-6 mb-8">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-6 h-6" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">✗ भुगतान विफल</h3>
                      <p className="text-sm">कृपया पुनः प्रयास करें या अन्य भुगतान विधि का उपयोग करें।</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Selected Plan Summary */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-6 mb-8 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90 mb-1">चयनित योजना</p>
                    <h3 className="text-2xl font-bold">{selectedPlan.name}</h3>
                    <p className="text-lg mt-1">{selectedPlan.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">{selectedPlan.priceDisplay}</p>
                    <button
                      onClick={() => {
                        setShowForm(false);
                        setFormData(prev => ({ ...prev, membershipType: "" }));
                        setPaymentStatus(null);
                      }}
                      className="text-sm underline mt-2 hover:text-purple-200 transition"
                    >
                      योजना बदलें
                    </button>
                  </div>
                </div>
              </div>

              {/* Registration Form */}
              <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">सदस्यता फॉर्म</h2>
                  <div className="flex items-center gap-2 text-purple-600">
                    <Smartphone className="w-5 h-5" />
                    <span className="text-sm font-semibold">PhonePe से भुगतान</span>
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
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
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
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
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
                      disabled={isSubmitting}
                      pattern="[0-9]{10}"
                      maxLength="10"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
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
                      disabled={isSubmitting}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none disabled:bg-gray-100"
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
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
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
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
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
                      disabled={isSubmitting}
                      pattern="[0-9]{6}"
                      maxLength="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
                      placeholder="6 अंकों का पिनकोड"
                    />
                  </div>

                  {/* VPA Input for Web Users */}
                  {(deviceInfo.type === 'web' || showVpaInput) && (
                    <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
                      <label className="block text-gray-700 font-semibold mb-2">
                        UPI ID (VPA) * <span className="text-sm font-normal text-gray-600">(जैसे: yourname@paytm)</span>
                      </label>
                      <input
                        type="text"
                        name="vpa"
                        value={formData.vpa}
                        onChange={handleInputChange}
                        required={deviceInfo.type === 'web'}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
                        placeholder="yourname@paytm"
                      />
                      <p className="text-xs text-gray-600 mt-2">
                        💡 आपके UPI ऐप में भुगतान अनुरोध भेजा जाएगा
                      </p>
                    </div>
                  )}

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
                      <div className="flex justify-between text-gray-700">
                        <span>भुगतान विधि:</span>
                        <span className="font-semibold">
                          {deviceInfo.type === 'web' ? 'UPI (Collect)' : 'PhonePe App'}
                        </span>
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
                    disabled={isSubmitting || paymentStatus === 'polling'}
                    className={`w-full py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                      isSubmitting || paymentStatus === 'polling'
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 shadow-lg'
                    }`}
                  >
                    {isSubmitting || paymentStatus === 'polling' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {paymentStatus === 'polling' ? 'भुगतान की प्रतीक्षा में...' : 'भुगतान प्रोसेस हो रहा है...'}
                      </>
                    ) : (
                      <>
                        <Smartphone className="w-5 h-5" />
                        {deviceInfo.type === 'web' 
                          ? `UPI से ${selectedPlan.priceDisplay} का भुगतान करें`
                          : `PhonePe App में ${selectedPlan.priceDisplay} का भुगतान करें`
                        }
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
                      <span>
                        {deviceInfo.type === 'web' 
                          ? 'UPI ऐप में भुगतान अनुरोध स्वीकार करें'
                          : 'PhonePe App में redirect होंगे'
                        }
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">3.</span>
                      <span>सुरक्षित भुगतान करें</span>
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

              {/* Device-Specific Instructions */}
              <div className="mt-6 bg-purple-50 border border-purple-200 rounded-xl p-6">
                <h3 className="font-bold text-purple-900 mb-3">
                  📱 आपके डिवाइस के लिए विशेष जानकारी
                </h3>
                {deviceInfo.type === 'android' && (
                  <div className="text-sm text-purple-800 space-y-2">
                    <p>• आप Android device पर हैं</p>
                    <p>• भुगतान के लिए PhonePe App में redirect होंगे</p>
                    <p>• अगर PhonePe installed नहीं है, तो पहले install करें</p>
                    <p>• भुगतान पूरा होने के बाद automatically वापस आ जाएंगे</p>
                  </div>
                )}
                {deviceInfo.type === 'ios' && (
                  <div className="text-sm text-purple-800 space-y-2">
                    <p>• आप iOS device पर हैं</p>
                    <p>• भुगतान के लिए PhonePe App में redirect होंगे</p>
                    <p>• अगर PhonePe installed नहीं है, तो पहले install करें</p>
                    <p>• भुगतान पूरा होने के बाद automatically वापस आ जाएंगे</p>
                  </div>
                )}
                {deviceInfo.type === 'web' && (
                  <div className="text-sm text-purple-800 space-y-2">
                    <p>• आप Web Browser पर हैं</p>
                    <p>• कृपया अपना UPI ID दर्ज करें (जैसे: yourname@paytm)</p>
                    <p>• आपके UPI ऐप में भुगतान अनुरोध भेजा जाएगा</p>
                    <p>• अपने UPI ऐप में notification देखें और approve करें</p>
                    <p>• हम automatically भुगतान status check करेंगे</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}