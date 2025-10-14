"use client";
import Footer from "@/components/Footer";
import Headers from "@/components/Header";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { useState, useEffect, useRef } from "react";
import { Mail, Lock, User, Phone, Eye, EyeOff, LogIn, UserPlus, Home, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthComponent() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  
  const { user, loading, error, signup, verifyOtp, login, fetchUser, forgotPassword } = useAuthStore();
  const hasRedirected = useRef(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: ""
  });

  // Check if user is already logged in on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

 const checkAuthStatus = async () => {
  if (hasRedirected.current) return;

  try {
    const userData = await fetchUser();

    if (userData && userData.role) {      // ✅ null check
      console.log("User data:", userData);
      redirectByRole(userData.role);
      hasRedirected.current = true;
    } else {
      setIsLoading(false);
    }
  } catch (error) {
    console.error("Auth check failed:", error);
    setIsLoading(false);
  }
};

  const redirectByRole = (role) => {
  if (!role) return; // 🛑 Prevent crash
hasRedirected.current = true;
  switch (role) {
    case "admin":
      router.push("/admin");
      break;
    case "user":
      router.push("/dashboard");
      break;
    default:
      router.push("/");
  }
};


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Login flow
        const data = await login(formData.email, formData.password);
        alert("Login successful!");
        console.log("Login successful, user:", data.role);
        redirectByRole(data.role);
      } else {
        // Signup flow - validate passwords match
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match");
          return;
        }

        // Send signup request and OTP
        const data = await signup(
          formData.email,
          formData.password,
          formData.name,
          formData.phone,
          formData.address
        );
        
        alert("OTP sent to your email!");
        setPendingEmail(formData.email);
        setShowOtpModal(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Something went wrong");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    
    if (!otp || otp.length < 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const data = await verifyOtp(pendingEmail, otp);
      alert("Registration successful! Please login.");
      setShowOtpModal(false);
      setOtp("");
      setPendingEmail("");
      setIsLogin(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        address: ""
      });
    } catch (err) {
      alert(err.response?.data?.message || err.message || "OTP verification failed");
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail || !forgotEmail.includes('@')) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      await forgotPassword(forgotEmail);
      alert("Password reset link sent to your email!");
      setShowForgotPassword(false);
      setForgotEmail("");
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Failed to send reset link");
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      address: ""
    });
  };

  // Show loading screen while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Headers/>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50 flex items-center justify-center p-4">
        
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
                    width={150}
                    height={60}
                    priority
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
                disabled={loading}
                className={`flex-1 py-4 text-center text-black font-semibold transition-all duration-300 ${
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
                disabled={loading}
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
                      disabled={loading}
                      className="w-full pl-11 pr-4 text-black py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors disabled:opacity-50"
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
                    disabled={loading}
                    className="w-full pl-11 text-black pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors disabled:opacity-50"
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
                      disabled={loading}
                      className="w-full pl-11 text-black pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors disabled:opacity-50"
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
                    disabled={loading}
                    className="w-full text-black pl-11 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
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
                      disabled={loading}
                      className="w-full text-black pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>
              )}

              {/* Address Field (Register only) */}
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Address</label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your full address"
                      disabled={loading}
                      className="w-full pl-11 text-black pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </span>
                ) : (
                  isLogin ? "Login" : "Create Account"
                )}
              </button>

              {/* Forgot Password Link (Login only) */}
              {isLogin && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    disabled={loading}
                    className="text-sm text-orange-600 font-semibold hover:text-orange-700 disabled:opacity-50"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">OR</span>
                </div>
              </div>

              {/* Toggle Form Link */}
              <p className="text-center text-sm text-gray-600 pt-4">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={toggleForm}
                  disabled={loading}
                  className="text-orange-600 font-semibold hover:text-orange-700 disabled:opacity-50"
                >
                  {isLogin ? "Register here" : "Login here"}
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* OTP Modal */}
        {showOtpModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-orange-600" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
                <p className="text-gray-600 text-sm">
                  We've sent a 6-digit OTP to<br />
                  <span className="font-semibold text-orange-600">{pendingEmail}</span>
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">Enter OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    maxLength={6}
                    disabled={loading}
                    className="w-full text-center text-2xl tracking-widest font-bold text-black py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors disabled:opacity-50"
                  />
                </div>

                <button
                  onClick={handleOtpSubmit}
                  disabled={loading || otp.length < 6}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Verifying...
                    </span>
                  ) : (
                    "Verify OTP"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowOtpModal(false);
                    setOtp("");
                    setPendingEmail("");
                  }}
                  disabled={loading}
                  className="w-full text-gray-600 font-semibold py-2 hover:text-gray-800 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Forgot Password Modal */}
        {showForgotPassword && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="text-orange-600" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
                <p className="text-gray-600 text-sm">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="Enter your email"
                      disabled={loading}
                      className="w-full pl-11 pr-4 text-black py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>

                <button
                  onClick={handleForgotPassword}
                  disabled={loading || !forgotEmail}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </span>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setForgotEmail("");
                  }}
                  disabled={loading}
                  className="w-full text-gray-600 font-semibold py-2 hover:text-gray-800 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
}