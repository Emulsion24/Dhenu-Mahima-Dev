"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { useAuthStore } from "@/store/authStore";
import Footer from "@/components/Footer";
import { LogOut, User, BookOpen, Heart, Bell, ChevronRight, Mail, Phone, MapPin, Award } from "lucide-react";

// Mock auth store hook - replace with your actual store

export default function UserDashboard() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [activeMenu, setActiveMenu] = useState("account");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 
const handellogout=()=>{
logout();
router.push("/login");
}

  if (!user) return null;

  const menuItems = [
    { id: "account", label: "My Account", icon: User },
    { id: "pdf", label: "PDF Library", icon: BookOpen },
    { id: "donations", label: "My Donations", icon: Heart },
  ];

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        {/* Top Section Bar */}
        <div className="bg-white border-b border-orange-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="md:hidden p-2 rounded-lg hover:bg-orange-50 transition"
                >
                  <div className="w-6 h-0.5 bg-gray-600 mb-1.5"></div>
                  <div className="w-6 h-0.5 bg-gray-600 mb-1.5"></div>
                  <div className="w-6 h-0.5 bg-gray-600"></div>
                </button>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  धेनु महिमा Dashboard
                </h1>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="p-2 rounded-lg hover:bg-orange-50 transition relative">
                  <Bell size={20} className="text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <aside className={`
              ${isSidebarOpen ? 'block' : 'hidden'} md:block
              w-full lg:w-64 space-y-3 flex-shrink-0
            `}>
              <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
                <div className="p-6 bg-gradient-to-br from-orange-500 to-yellow-500">
                  <div className="w-20 h-20 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30 mb-4">
                    <span className="text-3xl font-bold text-white">{user.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-white text-center font-bold text-lg">{user.name}</h3>
                  <p className="text-white/80 text-center text-sm mt-1">Member since {user.joinedDate}</p>
                </div>

                <nav className="p-3 space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveMenu(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
                          ${activeMenu === item.id 
                            ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg shadow-orange-200" 
                            : "text-gray-600 hover:bg-orange-50"
                          }`}
                      >
                        <Icon size={20} />
                        <span className="flex-1 text-left">{item.label}</span>
                        {activeMenu === item.id && <ChevronRight size={18} />}
                      </button>
                    );
                  })}
                </nav>

                <div className="p-4 border-t border-gray-100">
                  <button
                    onClick={handellogout}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 space-y-6">
              {activeMenu === "account" && (
                <>
                  {/* Welcome Banner */}
                  <div className="bg-gradient-to-br from-orange-500 via-yellow-500 to-amber-500 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
                    <div className="relative">
                      <h2 className="text-3xl font-bold mb-2">Welcome back, {user.name.split(' ')[0]}! 🙏</h2>
                      <p className="text-white/90">Your spiritual journey continues. May you be blessed.</p>
                    </div>
                  </div>

                  {/* Profile Information */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
                      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 px-6 py-4">
                        <h3 className="text-white font-bold text-lg flex items-center">
                          <User size={20} className="mr-2" />
                          Personal Information
                        </h3>
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-orange-50 transition">
                          <User size={20} className="text-orange-500 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium">Full Name</p>
                            <p className="text-gray-800 font-semibold">{user.name}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-orange-50 transition">
                          <Mail size={20} className="text-orange-500 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium">Email Address</p>
                            <p className="text-gray-800 font-semibold">{user.email}</p>
                          </div>
                        </div>
                        {user.phone && (
                          <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-orange-50 transition">
                            <Phone size={20} className="text-orange-500 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500 font-medium">Phone Number</p>
                              <p className="text-gray-800 font-semibold">{user.phone}</p>
                            </div>
                          </div>
                        )}
                        {user.address && (
                          <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-orange-50 transition">
                            <MapPin size={20} className="text-orange-500 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500 font-medium">Address</p>
                              <p className="text-gray-800 font-semibold">{user.address}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Activity Card */}
                      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-lg">Recent Activity</h4>
                          <Award size={24} />
                        </div>
                        <p className="text-white/90 text-sm mb-4">You've been very active this month!</p>
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                          <p className="text-sm text-white/80">Last login</p>
                          <p className="font-semibold">Today at 10:30 AM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeMenu === "pdf" && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-orange-100 text-center">
                  <BookOpen size={64} className="mx-auto text-orange-500 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">PDF Library</h3>
                  <p className="text-gray-600">Access sacred texts and religious books</p>
                </div>
              )}

              {activeMenu === "donations" && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-orange-100 text-center">
                  <Heart size={64} className="mx-auto text-pink-500 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">My Donations</h3>
                  <p className="text-gray-600">View your contribution history</p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}