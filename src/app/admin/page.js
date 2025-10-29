"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  UserPlus, Music, FilePlus, MessageCircle, Newspaper, Users, 
  BookOpen, Heart, Mic, TrendingUp, ArrowUpRight, Calendar 
} from "lucide-react";
import API from "@/lib/api";

export default function AdminDashboard() {
  const [recentDonations, setRecentDonations] = useState([]);

  useEffect(() => {
    const fetchRecentDonations = async () => {
      try {
        const res = await API.get("/donations?page=1&limit=10");
        setRecentDonations(res.data.donations || []); // ✅ get the actual array
      } catch (error) {
        console.error("Error fetching recent donations:", error);
        setRecentDonations([]); // fallback to empty array
      }
    };

    fetchRecentDonations();
  }, []);

  // Quick Actions Config
  const quickActions = [
    { name: "Add User", link: "/admin/users", icon: UserPlus, color: "from-blue-500 to-blue-600", hoverColor: "hover:from-blue-600 hover:to-blue-700" },
    { name: "Add Jeevansutra", link: "/admin/music", icon: Music, color: "from-purple-500 to-purple-600", hoverColor: "hover:from-purple-600 hover:to-purple-700" },
    { name: "Upload PDF-Book", link: "/admin/pdf-book", icon: FilePlus, color: "from-pink-500 to-pink-600", hoverColor: "hover:from-pink-600 hover:to-pink-700" },
    { name: "Directer Message", link: "/admin/director-message", icon: MessageCircle, color: "from-green-500 to-green-600", hoverColor: "hover:from-green-600 hover:to-green-700" },
    { name: "Add News", link: "/admin/news", icon: Newspaper, color: "from-orange-500 to-orange-600", hoverColor: "hover:from-orange-600 hover:to-orange-700" },
    { name: "Record Jeevansutra", link: "/admin/music", icon: Mic, color: "from-red-500 to-red-600", hoverColor: "hover:from-red-600 hover:to-red-700" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-2">
          Welcome Back, Admin! 👋
        </h1>
        <p className="text-slate-600 text-sm sm:text-base font-medium">
          Here's what's happening with your platform today
        </p>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-slate-200 shadow-xl rounded-2xl p-5 sm:p-6">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Quick Actions</h2>
          <p className="text-sm text-slate-500 mt-1">Perform common tasks quickly</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {quickActions.map(({ name, link, icon: Icon, color, hoverColor }) => (
            <Link key={name} href={link}>
              <div className={`group flex flex-col items-center justify-center gap-3 p-4 sm:p-5 rounded-xl shadow-md cursor-pointer bg-gradient-to-br ${color} ${hoverColor} text-white hover:scale-105 hover:shadow-2xl transition-all duration-300`}>
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-center leading-tight">{name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Donations */}
      <div className="mt-8 bg-white border border-slate-200 shadow-xl rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Heart className="text-red-500" size={24} />
              Recent Donations
            </h2>
            <p className="text-sm text-slate-500 mt-1">Latest contributions from donors</p>
          </div>
          <Link href="/admin/donations">
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:gap-2 transition-all">
              View All
              <ArrowUpRight size={16} />
            </button>
          </Link>
        </div>

        <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
          {Array.isArray(recentDonations) && recentDonations.length > 0 ? (
            recentDonations.map(({ id, name, amount, time, status }) => (
              <div
                key={id}
                className="group flex items-center justify-between bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-xl hover:shadow-lg transition-all border border-slate-100 hover:border-blue-200"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-pink-500 text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                    {name ? name[0] : "?"}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm sm:text-base">{name || "Anonymous"}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <Calendar size={12} />
                      <span>{time}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        status === "completed" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg sm:text-xl font-extrabold text-green-600">
                    ₹{amount?.toLocaleString() || "0"}
                  </span>
                  <p className="text-xs text-slate-500 mt-1">INR</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No recent donations found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
