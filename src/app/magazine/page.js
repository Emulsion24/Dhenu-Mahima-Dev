"use client"
import { useState, useRef, useEffect } from "react";
import { Check, BookOpen, Star, Zap, Users, Shield, ArrowRight, Loader2, AlertCircle, CheckCircle, X, Clock } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import API from "@/lib/api";
import toast from "react-hot-toast";

const membershipPlans = [
  {
    type: "annual",
    name: "वार्षिक सदस्यता",
    price: 1100,
    priceDisplay: "₹1,100",
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
    type: "lifetime",
    name: "आजीवन सदस्यता",
    price: 11000,
    priceDisplay: "₹11,000",
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

// Payment Modal Component
const PaymentModal = ({ isOpen, onClose, orderDetails, paymentStatus, timeLeft }) => {
  if (!isOpen) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl animate-slideUp">
        
        {/* Warning Banner */}
        <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 mb-6 animate-pulse">
          <p className="text-red-800 font-bold text-center text-lg flex items-center justify-center gap-2">
            <AlertCircle className="w-6 h-6" />
            पेज को Refresh या Back न करें
          </p>
          <p className="text-red-700 text-sm text-center mt-2">
            भुगतान प्रक्रिया चल रही है
          </p>
        </div>

        {/* Status Display */}
        {paymentStatus === 'polling' && (
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              भुगतान की प्रतीक्षा में...
            </h3>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
                <span className="text-4xl font-bold text-blue-600 tabular-nums">
                  {formatTime(timeLeft)}
                </span>
              </div>
              
              <div className="space-y-4 text-left">
                <p className="text-gray-700 font-semibold text-lg mb-3 text-center">
                  कृपया निम्न चरणों का पालन करें:
                </p>
                
                <div className="flex items-start gap-3 bg-white rounded-lg p-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">अपना UPI ऐप खोलें</p>
                    <p className="text-sm text-gray-600">Google Pay, PhonePe, Paytm, BHIM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 bg-white rounded-lg p-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Pending Requests देखें</p>
                    <p className="text-sm text-gray-600">Notification या Pending section में</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 bg-white rounded-lg p-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">भुगतान स्वीकार करें</p>
                    <p className="text-sm text-gray-600">UPI PIN दर्ज करके confirm करें</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
              <p className="text-sm text-yellow-800 font-semibold">
                💡 यदि notification नहीं मिला, तो अपने UPI ऐप में &quot;Pending Requests&quot; section manually check करें
              </p>
            </div>
          </div>
        )}

        {paymentStatus === 'success' && (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-600 mb-3">
              ✓ भुगतान सफल!
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              आपकी सदस्यता सक्रिय हो गई है
            </p>
            <div className="bg-green-50 border border-green-300 rounded-lg p-4 mb-4">
              <p className="text-sm text-green-800">
                आपको success page पर redirect किया जा रहा है...
              </p>
            </div>
            <div className="animate-pulse">
              <Loader2 className="w-8 h-8 text-green-600 animate-spin mx-auto" />
            </div>
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <X className="w-12 h-12 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-red-600 mb-3">
              ✗ भुगतान विफल
            </h3>
            <p className="text-gray-600 mb-6">
              भुगतान पूरा नहीं हो सका
            </p>
            <div className="bg-red-50 border border-red-300 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800">
                कृपया पुनः प्रयास करें या customer support से संपर्क करें
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-all shadow-lg"
            >
              बंद करें
            </button>
          </div>
        )}

        {paymentStatus === 'timeout' && (
          <div className="text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-12 h-12 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-orange-600 mb-3">
              समय समाप्त
            </h3>
            <p className="text-gray-600 mb-6">
              भुगतान की समय सीमा (5 मिनट) समाप्त हो गई है
            </p>
            <div className="bg-orange-50 border border-orange-300 rounded-lg p-4 mb-6">
              <p className="text-sm text-orange-800">
                कृपया पुनः प्रयास करें और 5 मिनट के अंदर भुगतान complete करें
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-all shadow-lg"
            >
              बंद करें और पुनः प्रयास करें
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

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
    vpa: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const pollingIntervalRef = useRef(null);
  const timerIntervalRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
function validateUPI(vpa) {
  if (!vpa || typeof vpa !== 'string') {
    return { valid: false, message: 'UPI ID is required' };
  }

  // Basic UPI format: username@bank
  const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;

  if (!upiRegex.test(vpa.trim())) {
    return { valid: false, message: 'Invalid UPI ID format (e.g. user@okaxis)' };
  }

  // Optional: block known invalid placeholders
  const invalidSamples = ['test@upi', 'example@upi', 'demo@upi'];
  if (invalidSamples.includes(vpa.toLowerCase())) {
    return { valid: false, message: 'Please enter a valid UPI ID' };
  }

  return { valid: true, message: 'Valid UPI ID' };
}
 const handleValidateVPA = async () => {
  if (!validateUPI(formData.vpa)) {
    setErrors(prev => ({ ...prev, vpa: "वैध UPI ID दर्ज करें (जैसे: name@paytm)" }));
    return;
  }

  try {
    setIsSubmitting(true);
    const vpa=formData.vpa;
    const res = await API.post("/membership/validate-vpa",{ vpa });
    const data = res.data;

if (data.success) {
  const { valid, name } = data.data;
  if (valid) {
    toast(`✅ VPA Verified: ${name ? name : "Valid UPI ID"}`);
  } else {
    toast("❌ UPI ID अमान्य है। कृपया सही ID दर्ज करें।");
  }
} else {
  toast("UPI ID अमान्य है। कृपया सही ID दर्ज करें।");
}

  } catch (err) {
    console.error(err);
    alert("VPA सत्यापन में समस्या आई।");
  } finally {
    setIsSubmitting(false);
  }
};


  const validateForm = () => {
    const newErrors = {};


    if (!formData.name.trim()) newErrors.name = "नाम आवश्यक है";
    if (!formData.email.trim()) {
      newErrors.email = "ईमेल आवश्यक है";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "वैध ईमेल दर्ज करें";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "मोबाइल नंबर आवश्यक है";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "10 अंकों का मोबाइल नंबर दर्ज करें";
    }
    if (!formData.address.trim()) newErrors.address = "पता आवश्यक है";
    if (!formData.city.trim()) newErrors.city = "शहर आवश्यक है";
    if (!formData.state.trim()) newErrors.state = "राज्य आवश्यक है";
    if (!formData.pincode.trim()) {
      newErrors.pincode = "पिनकोड आवश्यक है";
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = "6 अंकों का पिनकोड दर्ज करें";
    }
    if (formData.membershipType === "annual") {
  if (!formData.vpa.trim()) {
    newErrors.vpa = "UPI ID आवश्यक है";
  } else if (!validateUPI(formData.vpa)) {
    newErrors.vpa = "वैध UPI ID दर्ज करें (जैसे: name@paytm)";
  }
}

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlanSelect = (planType) => {
    setFormData(prev => ({ ...prev, membershipType: planType }));
    setShowForm(true);
    
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const selectedPlan = membershipPlans.find(plan => plan.type === formData.membershipType);

  useEffect(() => {
    if (showPaymentModal && paymentStatus === 'polling') {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            if (pollingIntervalRef.current) {
              clearInterval(pollingIntervalRef.current);
            }
            setPaymentStatus('timeout');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [showPaymentModal, paymentStatus]);

 const startPolling = (merchantOrderId) => {
  setPaymentStatus('polling');
  setShowPaymentModal(true);
  setTimeLeft(300); // 5 minutes timer

  // Start polling for payment status
  pollingIntervalRef.current = setInterval(async () => {
    try {
      const response = await API.post(`/membership/order-status/${merchantOrderId}`);
      const data = response.data;

      if (data.success) {
        const state = data.data.state;
        const amount = parseInt(data.data.amount);
        const orderID = data.data.orderId;

        if (state === 'COMPLETED') {
          clearInterval(pollingIntervalRef.current);
          clearInterval(timerIntervalRef.current);
          setPaymentStatus('success');

          setTimeout(() => {
            window.location.href = `/magazine-status?status=${state}&txn=${orderID}&amount=${amount}`;
          }, 2000);
        } else if (state === 'FAILED') {
          clearInterval(pollingIntervalRef.current);
          clearInterval(timerIntervalRef.current);
          setPaymentStatus('failed');
        }
      }
    } catch (error) {
      console.error('Polling error:', error.message);
    }
  }, 3000); // Poll every 3 seconds

  // Start countdown timer
  timerIntervalRef.current = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timerIntervalRef.current);
        clearInterval(pollingIntervalRef.current);
        setPaymentStatus('timeout');
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
};

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    setIsSubmitting(true);

    const payload = {
      ...formData,
      amount: selectedPlan.price,
      membershipType: formData.membershipType,
    };

    if (formData.membershipType === "lifetime") {
      // Lifetime: Direct redirect
     try{   const { data: orderData }  = await API.post("/membership/create-order-onetime",payload);
  
      if (orderData?.redirectUrl) {
      window.location.href = orderData.redirectUrl;
    } else {
      throw new Error('Payment redirect URL not received');
    }

  } catch (error) {
    console.error('Payment initiation failed:', error?.response?.data || error.message);
   
  } finally {
    setIsSubmitting(false);
  }
    } else {
  const newpay = { ...payload, paymentMode: "UPI_COLLECT" };
      // Annual: Collect flow (requires VPA)
      const response = await API.post("/membership/create-order",newpay)

      const result =  response.data; ;
      if (result.success) {
        setOrderDetails(result.data);
        startPolling(result.data.merchantOrderId);
      } else {
        alert("भुगतान शुरू करने में त्रुटि।");
      }
    }
  } catch (error) {
    console.error(error);
    alert("भुगतान प्रक्रिया में समस्या आई।");
  } finally {
    setIsSubmitting(false);
  }
};


  const closeModal = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setShowPaymentModal(false);
    setPaymentStatus(null);
    setIsSubmitting(false);
    setTimeLeft(300);
  };

  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <BookOpen className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
              मासिक पत्रिका सदस्यता
            </h1>
            <p className="text-lg md:text-xl mb-8 leading-relaxed drop-shadow">
              श्री गोपाल परिवार संघ की मासिक पत्रिका के सदस्य बनें और आध्यात्मिक ज्ञान से जुड़े रहें
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
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            सदस्यता योजनाएं चुनें
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            अपनी पसंद की योजना चुनें और सदस्यता फॉर्म भरें
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
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
                      <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                        सबसे लोकप्रिय
                      </span>
                    </div>
                  )}

                  {isSelected && (
                    <div className="absolute -top-4 right-4">
                      <div className="bg-purple-500 text-white rounded-full p-2 shadow-lg">
                        <Check className="w-5 h-5" />
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-orange-600 mb-1">{plan.priceDisplay}</div>
                    <p className="text-gray-600 font-medium">{plan.duration}</p>
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
                    className={`w-full py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg ${
                      isSelected
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600'
                    }`}
                  >
                    {isSelected ? '✓ चयनित - फॉर्म भरें' : 'इस योजना को चुनें'}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Registration Form */}
          {showForm && selectedPlan && (
            <div ref={formRef} className="max-w-2xl mx-auto scroll-mt-20">
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
                      }}
                      className="text-sm underline mt-2 hover:text-purple-200 transition"
                    >
                      योजना बदलें
                    </button>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">सदस्यता फॉर्म</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      पूरा नाम <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-gray-900 ${
                        errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } disabled:bg-gray-100 disabled:cursor-not-allowed placeholder:text-gray-400`}
                      placeholder="अपना नाम दर्ज करें"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      ईमेल <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-gray-900 ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } disabled:bg-gray-100 disabled:cursor-not-allowed placeholder:text-gray-400`}
                      placeholder="example@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      मोबाइल नंबर <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      maxLength="10"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-gray-900 ${
                        errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } disabled:bg-gray-100 disabled:cursor-not-allowed placeholder:text-gray-400`}
                      placeholder="10 अंकों का मोबाइल नंबर"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      पूरा पता <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      rows="3"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none text-gray-900 ${
                        errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } disabled:bg-gray-100 disabled:cursor-not-allowed placeholder:text-gray-400`}
                      placeholder="अपना पूरा पता दर्ज करें"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* City and State */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        शहर <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-gray-900 ${
                          errors.city ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        } disabled:bg-gray-100 disabled:cursor-not-allowed placeholder:text-gray-400`}
                        placeholder="शहर"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.city}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        राज्य <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-gray-900 ${
                          errors.state ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        } disabled:bg-gray-100 disabled:cursor-not-allowed placeholder:text-gray-400`}
                        placeholder="राज्य"
                      />
                      {errors.state && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.state}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      पिनकोड <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      maxLength="6"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-gray-900 ${
                        errors.pincode ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } disabled:bg-gray-100 disabled:cursor-not-allowed placeholder:text-gray-400`}
                      placeholder="6 अंकों का पिनकोड"
                    />
                    {errors.pincode && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.pincode}
                      </p>
                    )}
                  </div>

                  {/* UPI ID */}
                 {formData.membershipType === "annual" && (
  <div>
    <label className="block text-gray-700 font-semibold mb-2">
      UPI ID <span className="text-red-500">*</span>
    </label>
    <div className="flex items-center gap-2">
      <input
        type="text"
        name="vpa"
        value={formData.vpa}
        onChange={handleInputChange}
        disabled={isSubmitting}
        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-gray-900 ${
          errors.vpa ? 'border-red-500 bg-red-50' : 'border-gray-300'
        } disabled:bg-gray-100 disabled:cursor-not-allowed placeholder:text-gray-400`}
        placeholder="name@upi"
      />
      <button
        type="button"
        onClick={handleValidateVPA}
        disabled={!formData.vpa || isSubmitting}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
      >
        Validate
      </button>
    </div>
    {errors.vpa && (
      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
        <AlertCircle className="w-4 h-4" />
        {errors.vpa}
      </p>
    )}
  </div>
)}
                  {/* Order Summary */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                    <h3 className="font-bold text-gray-800 mb-4 text-lg">📋 ऑर्डर सारांश</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-700">
                        <span>योजना:</span>
                        <span className="font-semibold">{selectedPlan.name}</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>अवधि:</span>
                        <span className="font-semibold">{selectedPlan.duration}</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>भुगतान विधि:</span>
                        <span className="font-semibold">UPI (Collect Request)</span>
                      </div>
                      <div className="border-t-2 border-purple-300 my-2"></div>
                      <div className="flex justify-between text-xl font-bold text-purple-700">
                        <span>कुल राशि:</span>
                        <span>{selectedPlan.priceDisplay}</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all flex items-center justify-center gap-3 shadow-lg ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 active:scale-95'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        प्रोसेस हो रहा है...
                      </>
                    ) : (
                      <>
                        <Shield className="w-6 h-6" />
                        UPI से {selectedPlan.priceDisplay} का भुगतान करें
                        <ArrowRight className="w-6 h-6" />
                      </>
                    )}
                  </button>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-green-50 border border-green-200 rounded-lg p-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="font-semibold">100% सुरक्षित और एन्क्रिप्टेड भुगतान</span>
                  </div>
                </form>
              </div>

              {/* Information Cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                  <h3 className="font-bold text-blue-900 mb-4 flex items-center text-lg">
                    <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3">i</span>
                    भुगतान कैसे करें
                  </h3>
                  <ul className="space-y-3 text-sm text-blue-800">
                    <li className="flex items-start">
                      <span className="font-bold mr-2 text-blue-600">1.</span>
                      <span>UPI ID दर्ज करें और Submit करें</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2 text-blue-600">2.</span>
                      <span>अपने UPI ऐप में notification देखें</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2 text-blue-600">3.</span>
                      <span>भुगतान अनुरोध स्वीकार करें</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2 text-blue-600">4.</span>
                      <span>UPI PIN दर्ज करें</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2 text-blue-600">5.</span>
                      <span>Confirmation प्राप्त करें</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                  <h3 className="font-bold text-red-900 mb-4 flex items-center text-lg">
                    <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm mr-3">⚠</span>
                    महत्वपूर्ण सूचना
                  </h3>
                  <ul className="space-y-3 text-sm text-red-800">
                    <li className="flex items-start">
                      <span className="mr-2">⚠️</span>
                      <span className="font-semibold">भुगतान के समय पेज refresh न करें</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">⚠️</span>
                      <span className="font-semibold">Back button न दबाएं</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">⏱️</span>
                      <span>5 मिनट में भुगतान पूरा करें</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">📧</span>
                      <span>Email confirmation मिलेगा</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* UPI App Instructions */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
                <h3 className="font-bold text-purple-900 mb-4 text-lg">📱 UPI ऐप में भुगतान कैसे देखें</h3>
                <div className="space-y-3 text-sm text-purple-800">
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-bold text-purple-900 mb-1">Google Pay:</p>
                    <p>होम स्क्रीन पर &quot;Pending&quot; या notification देखें</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-bold text-purple-900 mb-1">PhonePe:</p>
                    <p>होम पर &quot;Pending Requests&quot; या notification check करें</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-bold text-purple-900 mb-1">Paytm:</p>
                    <p> &quot;Passbook&quot; में &quot;Pending&quot; section देखें</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-bold text-purple-900 mb-1">BHIM / Other UPI Apps:</p>
                    <p>होम स्क्रीन पर &quot;Collect Request&quot; या &quot;Pending&quot; देखें</p>
                  </div>
                  <div className="mt-4 bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4">
                    <p className="font-bold text-yellow-900 mb-2">💡 यदि notification नहीं मिला:</p>
                    <p className="text-yellow-800">अपने UPI ऐप को manually खोलें और &quot;Pending Requests&quot; या &quot;Collect Requests&quot; section में देखें</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={closeModal}
        orderDetails={orderDetails}
        paymentStatus={paymentStatus}
        timeLeft={timeLeft}
      />

      {/* Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
<Footer/>
    </>
  );
}