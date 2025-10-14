"use client";
import Footer from "@/components/Footer";
import Headers from "@/components/Header";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  const { loading, resetPassword } = useAuthStore();

  useEffect(() => {
    // Wait for component to mount, then get token from URL
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenFromUrl = urlParams.get('token');
      
      console.log("Full URL:", window.location.href);
      console.log("Search params:", window.location.search);
      console.log("Token from URL:", tokenFromUrl);
      
      if (!tokenFromUrl) {
        alert("Invalid or missing reset link. Please request a new password reset.");
        router.push("/login");
      } else {
        setToken(tokenFromUrl);
      }
      
      setIsLoading(false);
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || newPassword.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!token) {
      alert("Invalid reset token");
      return;
    }

    console.log("Submitting with token:", token);

    try {
      await resetPassword(token, newPassword);
      setIsSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      console.error("Reset password error:", err);
      alert(err.response?.data?.message || err.message || "Failed to reset password");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <>
        <Headers />
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-3xl shadow-2xl border-2 border-orange-200 p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-green-600" size={48} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Password Reset Successful!</h2>
                <p className="text-black mb-4">
                  Your password has been successfully reset.
                </p>
                <p className="text-sm text-gray-500">
                  Redirecting to login page...
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Headers />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50 flex items-center justify-center p-4">
        
        <div className="w-full max-w-md relative">
          {/* Debug info - Remove this in production */}
          <div className="mb-4 p-4 bg-blue-100 rounded text-sm text-black">
            <p className="font-bold">Debug Info:</p>
            <p>Token: {token || "No token found"}</p>
            <p>URL: {typeof window !== 'undefined' ? window.location.href : 'Server'}</p>
          </div>

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

            {/* Header */}
            <div className="bg-orange-50 border-b border-orange-200 p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800">Reset Your Password</h2>
              <p className="text-gray-600 text-sm mt-2">
                Enter your new password below
              </p>
            </div>

            {/* Form */}
            <div className="p-8 space-y-5">
              
              {/* New Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
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
                <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters</p>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    disabled={loading}
                    className="w-full text-black pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading || !newPassword || !confirmPassword || !token}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Resetting...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </button>

              {/* Back to Login Link */}
              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  disabled={loading}
                  className="text-sm text-orange-600 font-semibold hover:text-orange-700 disabled:opacity-50"
                >
                  Back to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}