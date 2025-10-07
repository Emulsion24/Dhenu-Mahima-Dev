"use client";

import Link from "next/link";
import { 
  UserPlus, 
  Music, 
  FilePlus, 
  MessageCircle, 
  Newspaper, 
  Users, 
  BookOpen, 
  Heart, 
  Mic,
  TrendingUp,
  Eye,
  Download,
  Activity,
  DollarSign,
  Calendar,
  ArrowUpRight
} from "lucide-react";

// Sample Data
const recentDonations = [
  { id: 1, name: "Rohit Sharma", amount: 5000, time: "10:15 AM", status: "completed" },
  { id: 2, name: "Priya Das", amount: 3000, time: "11:30 AM", status: "completed" },
  { id: 3, name: "Amit Roy", amount: 7000, time: "12:45 PM", status: "completed" },
  { id: 4, name: "Sneha Gupta", amount: 2500, time: "02:00 PM", status: "pending" },
  { id: 5, name: "Ankit Singh", amount: 4000, time: "03:30 PM", status: "completed" },
];

const recentActivities = [
  { id: 1, action: "New user registered", user: "Rahul Kumar", time: "5 mins ago" },
  { id: 2, action: "Bhajan uploaded", user: "Admin", time: "15 mins ago" },
  { id: 3, action: "PDF book added", user: "Editor", time: "1 hour ago" },
  { id: 4, action: "News article published", user: "Admin", time: "2 hours ago" },
];

// Quick Actions Config
const quickActions = [
  { name: "Add User", link: "/admin/users/add", icon: UserPlus, color: "from-blue-500 to-blue-600", hoverColor: "hover:from-blue-600 hover:to-blue-700" },
  { name: "Add Bhajan", link: "/admin/music/add", icon: Music, color: "from-purple-500 to-purple-600", hoverColor: "hover:from-purple-600 hover:to-purple-700" },
  { name: "Upload PDF", link: "/admin/pdf-books/upload", icon: FilePlus, color: "from-pink-500 to-pink-600", hoverColor: "hover:from-pink-600 hover:to-pink-700" },
  { name: "Send Message", link: "/admin/messages/new", icon: MessageCircle, color: "from-green-500 to-green-600", hoverColor: "hover:from-green-600 hover:to-green-700" },
  { name: "Add News", link: "/admin/news", icon: Newspaper, color: "from-orange-500 to-orange-600", hoverColor: "hover:from-orange-600 hover:to-orange-700" },
  { name: "Record Bhajan", link: "/admin/music", icon: Mic, color: "from-red-500 to-red-600", hoverColor: "hover:from-red-600 hover:to-red-700" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-2">
          Welcome Back, Admin! 👋
        </h1>
        <p className="text-slate-600 text-sm sm:text-base font-medium">
          Heres whats happening with your platform today
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {[
          { 
            title: "Total Users", 
            value: "1,245", 
            change: "+12%",
            link: "/admin/users", 
            icon: Users,
            gradient: "from-blue-500 to-cyan-500",
            bgGradient: "from-blue-50 to-cyan-50"
          },
          { 
            title: "Total Songs", 
            value: "540", 
            change: "+8%",
            link: "/admin/music", 
            icon: Music,
            gradient: "from-purple-500 to-pink-500",
            bgGradient: "from-purple-50 to-pink-50"
          },
          { 
            title: "PDF Books", 
            value: "320", 
            change: "+5%",
            link: "/admin/pdf-books", 
            icon: BookOpen,
            gradient: "from-orange-500 to-red-500",
            bgGradient: "from-orange-50 to-red-50"
          },
          { 
            title: "Total Donations", 
            value: "₹42,500", 
            change: "+23%",
            link: "/admin/donations", 
            icon: Heart,
            gradient: "from-green-500 to-emerald-500",
            bgGradient: "from-green-50 to-emerald-50"
          },
        ].map((card) => (
          <Link key={card.title} href={card.link}>
            <div className={`group relative overflow-hidden bg-gradient-to-br ${card.bgGradient} border border-white/50 rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-300 hover:scale-105`}>
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-green-600 bg-green-100 px-2 py-1 rounded-lg">
                    <TrendingUp size={14} />
                    <span className="text-xs font-bold">{card.change}</span>
                  </div>
                </div>
                
                <h3 className="text-sm font-semibold text-slate-600 mb-1">{card.title}</h3>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-800">{card.value}</p>
                
                <div className="mt-3 flex items-center text-xs text-slate-500 font-medium group-hover:text-slate-700 transition-colors">
                  View Details
                  <ArrowUpRight size={14} className="ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Stats Row */}
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


      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">

        {/* Recent Donations - Takes 2 columns on large screens */}
        <div className="lg:col-span-4 mt-2 bg-white border border-slate-200 shadow-xl rounded-2xl p-5 sm:p-6">
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
            {recentDonations.map(({ id, name, amount, time, status }) => (
              <div
                key={id}
                className="group flex items-center justify-between bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-xl hover:shadow-lg transition-all border border-slate-100 hover:border-blue-200"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-pink-500 text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                    {name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm sm:text-base">{name}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <Calendar size={12} />
                      <span>{time}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        status === 'completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg sm:text-xl font-extrabold text-green-600">₹{amount.toLocaleString()}</span>
                  <p className="text-xs text-slate-500 mt-1">INR</p>
                </div>
              </div>
            ))}
          </div>
        </div>

     
        
      </div>

     
     

    </div>
  );
}