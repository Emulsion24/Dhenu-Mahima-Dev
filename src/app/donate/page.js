'use client';

import { useState } from 'react';
import { Heart, Shield, Award, Leaf, IndianRupee, ChevronRight, Phone } from 'lucide-react';
import Footer from '@/components/Footer';
import Headers from '@/components/Header';

export default function DonatePage() {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pan: ''
  });

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000];

  const impacts = [
    { icon: Heart, title: 'Gau Seva', description: 'Medical care for injured cows' },
    { icon: Leaf, title: 'Gau Aahaar', description: 'Nutritious food for 50+ cows' },
    { icon: Shield, title: 'Gau Raksha', description: 'Shelter and protection for abandoned cattle' },
    { icon: Award, title: 'Panchgavya', description: 'Organic farming with cow products' }
  ];

  const handleAmountSelect = (value) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmount = (e) => {
    setCustomAmount(e.target.value);
    setAmount('');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const initiatePhonePePayment = async (e) => {
    e.preventDefault();
    
    const donationAmount = customAmount || amount;
    
    if (!donationAmount || donationAmount < 1) {
      alert('Please select or enter a valid amount');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create order on your backend
      const orderResponse = await fetch('/api/phonepe/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: donationAmount,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          pan: formData.pan
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.message || 'Failed to create order');
      }

      // Step 2: Redirect to PhonePe payment page
      if (orderData.redirectUrl) {
        window.location.href = orderData.redirectUrl;
      } else {
        throw new Error('Payment redirect URL not received');
      }
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment initiation failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
    <Headers/>
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1
  className="text-3xl font-bold mt-2.5 leading-[1.3]"
>
  <span
    className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent inline-block"
    style={{
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      paddingTop: "0.15em",
      paddingBottom: "0.15em",
      display: "inline-block",
    }}
  >
    गो सेवार्थ होने वाले सभी कार्यों में बने सहभागी
  </span>
</h1>
              <p className="text-orange-700 mt-1 font-medium">Serve the sacred cows, serve humanity</p>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-bold">80G Tax Benefits</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl shadow-lg p-6 border border-amber-200 mb-3.5">
              <h3 className="text-xl italic text-red-950 mb-2 ">
               श्री गोपाल परिवार संघ निष्काम भाव से अभावग्रस्त क्षेत्रों में विशेष आवश्यकता होने पर 12 फाउंडेशन के माध्यम से गौ चिकित्सालय को उचित आहार, औषधि, आश्रय, सुरक्षा, जल आदि व्यवस्था निःशुल्क करवाने का कार्य कर रहा है। आप भी इस पवित्र सेवा कार्य में सहयोगी बने। इस हेतु आप नीचे दिए गए अकाउंट में अपनी सेवा राशि भिजवाए।
              </h3>
             
            </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Donation Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Heart className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-orange-600">Support Gau Seva</h2>
              </div>

              <form onSubmit={initiatePhonePePayment}>
                {/* Amount Selection */}
                <div className="mb-8">
                  <label className="block text-sm font-bold  text-orange-700 mb-3">
                    Select Donation Amount (₹)
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4 ">
                    {predefinedAmounts.map((amt) => (
                     <button
  key={amt}
  type="button"
  onClick={() => handleAmountSelect(amt)}
  className={`py-3 px-4 rounded-lg border-2 font-bold transition-all duration-300 ease-in-out 
    ${amount === amt
      ? 'border-orange-500 bg-gradient-to-br from-orange-600 to-amber-500 text-white shadow-lg scale-[1.03]'
      : 'border-gray-300 bg-gradient-to-br from-amber-100 to-orange-50 text-gray-800 hover:border-orange-400 hover:bg-orange-100'
    }`}
>
  ₹{amt.toLocaleString('en-IN')}
</button>
                    ))}
                  </div>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                    <input
                      type="number"
                      placeholder="Enter custom amount"
                      value={customAmount}
                      onChange={handleCustomAmount}
                      min="1"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-gray-800 font-semibold placeholder:text-gray-500 placeholder:font-normal"
                    />
                  </div>
                </div>

                {/* Personal Details */}
                <div className="space-y-4 mb-8">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Your Details</h3>
                  
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-gray-800 font-medium placeholder:text-gray-500"
                  />
                  
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-gray-800 font-medium placeholder:text-gray-500"
                  />
                  
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Mobile Number *"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-gray-800 font-medium placeholder:text-gray-500"
                  />
                  
                  <input
                    type="text"
                    name="pan"
                    placeholder="PAN Number (for 80G certificate)"
                    value={formData.pan}
                    onChange={handleInputChange}
                    pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                    maxLength="10"
                    style={{ textTransform: 'uppercase' }}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none uppercase text-gray-800 font-medium placeholder:text-gray-500"
                  />
                  <p className="text-xs text-gray-500">
                    PAN is required for tax exemption certificate under Section 80G
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold py-4 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <Phone className="w-5 h-5" />
                      Pay with PhonePe
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* PhonePe Info */}
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-lg border border-purple-200">
                    <Phone className="w-4 h-4 text-purple-600" />
                    <span className="text-xs  text-gray-500">Secure Payment via PhonePe</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Supports UPI, Cards, Net Banking & Wallets
                  </p>
                </div>
              </form>
              
            {/* Gau Seva Activities */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100 mb-1.5">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Our Gau Seva Activities</h3>
              <div className="space-y-4">
                {impacts.map((impact, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <impact.icon className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{impact.title}</p>
                      <p className="text-xs text-gray-600">{impact.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tax Benefits */}
            <div className="bg-green-50 rounded-2xl shadow-lg p-6 border border-green-100">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-bold text-gray-900">80G Tax Benefits</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Get 50% tax deduction on your donation under Section 80G of Income Tax Act.
              </p>
              <p className="text-xs text-gray-600">
                80G certificate will be emailed within 48 hours of donation.
              </p>
            </div>

            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Impact Card */}
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Your Impact</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-3xl font-bold">₹500</p>
                  <p className="text-orange-100 text-sm">Daily fodder for 5 cows</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">₹2,500</p>
                  <p className="text-orange-100 text-sm">Medical treatment for injured cow</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">₹10,000</p>
                  <p className="text-orange-100 text-sm">Monthly care for 1 cow</p>
                </div>
              </div>
            </div>

            {/*Bank Details */}
           <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl shadow-xl p-6 text-white max-w-md mx-auto">
  <h3 className="text-2xl font-extrabold mb-4 text-center">दान विवरण </h3>
  <h3 className="text-2xl font-extrabold mb-4 text-center">Donation Details</h3>

  {/* Bank Details */}
<div className="bg-white/20 rounded-2xl p-6 shadow-lg backdrop-blur-md border border-white/30 text-white space-y-3">
  

  <p className="text-lg">
    <span className="font-bold text-yellow-100">Bank Name:</span>{' '}
    <span className="font-semibold text-white"> Punjab National Bank</span>
  </p>

  <p className="text-lg">
    <span className="font-bold text-yellow-100">Account Name:</span>{' '}
    <span className="font-semibold text-white">SWAMI RAM YOGA SADHNA SAMITI PUSHKAR

</span>
  </p>

  <p className="text-lg">
    <span className="font-bold text-yellow-100">Account No:</span>{' '}
    <span className="font-semibold text-white"> 7289000100040339</span>
  </p>

  <p className="text-lg">
    <span className="font-bold text-yellow-100">IFSC Code:</span>{' '}
    <span className="font-semibold text-white"> PUNB0082500</span>
  </p>

  <p className="text-lg">
    <span className="font-bold text-yellow-100">Branch:</span>{' '}
    <span className="font-semibold text-white">Pushkar, Ajmer, Rajasthan</span>
  </p>
</div>


  {/* Divider */}
  <div className="flex items-center my-6">
    <div className="flex-1 border-t border-white/40"></div>
    <span className="px-4 text-sm font-semibold text-white/90">OR</span>
    <div className="flex-1 border-t border-white/40"></div>
  </div>

  {/* UPI QR Section */}
  <div className="flex flex-col items-center">
    <div className="bg-white rounded-xl p-3 shadow-md">
      <img
        src="/images/upi-qr.png"
        alt="UPI QR Code"
        className="w-40 h-40 object-contain"
      />
    </div>
    <p className="mt-3 text-sm text-white/90">Scan QR to donate via UPI</p>
    <p className="text-lg font-semibold mt-1">UPI ID: <span className="text-white">9773687886m@pnb</span></p>
  </div>

  {/* Footer Impact */}
 
</div>

            

            

            {/* Quote */}
          
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}