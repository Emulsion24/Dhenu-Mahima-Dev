"use client";
import Footer from "@/components/Footer";
import Headers from "@/components/Header";
import Image from "next/image";
import { useState } from "react";
import { Mail, Lock, User, Phone, Eye, EyeOff, LogIn, UserPlus } from "lucide-react";

export default function AuthComponent() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Login:", { email: formData.email, password: formData.password });
      alert("Login successful! Check console for details.");
    } else {
      console.log("Register:", formData);
      alert("Registration successful! Check console for details.");
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: ""
    });
  };

  return (
    <>
          <Headers/>
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50 flex items-center justify-center p-4">

      {/* Decorative Om symbols */}
    
      
      <div className="w-full max-w-md relative">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 rounded-3xl blur-2xl opacity-30"></div>
        
        {/* Main Card */}
        <div className="relative bg-white rounded-3xl shadow-2xl border-2 border-orange-200 overflow-hidden">
          
          {/* Header with Logo */}
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative">
              <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Image
        src="/logo/Dhenu Mahima PNG 1.png"
        alt="Dhenu Mahima Logo"
        width={150}        // adjust width as needed
        height={60}        // adjust height as needed
        priority           // ensures logo loads fast
      />
              </div>
              <h1 className="text-2xl font-bold text-white mb-1">श्री गोपाल परिवार संघ</h1>
              <p className="text-white/90 text-2xl font-extrabold">धेनु महिमा</p>
            </div>
          </div>

          {/* Toggle Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-4 text-center font-semibold transition-all duration-300 ${
                isLogin
                  ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <LogIn className="inline-block mr-2" size={18} />
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-4 text-center font-semibold transition-all duration-300 ${
                !isLogin
                  ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <UserPlus className="inline-block mr-2" size={18} />
              Register
            </button>
          </div>

          {/* Form */}
          <div className="p-8 space-y-5">
            
            {/* Name Field (Register only) */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Phone Field (Register only) */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Register only) */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Forgot Password (Login only) */}
          

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>

            {/* Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">OR</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Image
  src="https://www.google.com/favicon.ico"
  alt="Google"
  width={20}
  height={20}
  className="w-5 h-5"
  unoptimized
/>
                <span className="font-semibold text-gray-700">Continue with Google</span>
              </button>
              
           
            </div>

            {/* Toggle Form Link */}
            <p className="text-center text-sm text-gray-600 pt-4">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={toggleForm}
                className="text-orange-600 font-semibold hover:text-orange-700"
              >
                {isLogin ? "Register here" : "Login here"}
              </button>
            </p>
          </div>
        </div>
      </div>
   
    </div>
       <Footer/>
    </>
  );
}