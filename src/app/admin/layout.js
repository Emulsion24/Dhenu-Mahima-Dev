"use client";

import { 
  Users, Music, Newspaper, UsersRound, LayoutDashboard, 
  Heart, MessageCircle, FileText, Image, BookOpen, Home, LogOut,
  Menu, X, ChevronDown, Bell, Settings,
  LucideHome,
  ShieldCheck,
  LucideRouteOff,
  LocateIcon
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Example user data (replace with actual auth state)
  const user = {
    name: "Shavandeb Kaiti",
    role: "Super Admin",
    photo: "/avatar.jpg", // Placeholder
  };

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { href: "/admin/users", label: "Users", icon: <Users className="w-5 h-5" /> },
    { href: "/admin/music", label: "Bhajan", icon: <Music className="w-5 h-5" /> },
    { href: "/admin/news", label: "Daily News", icon: <Newspaper className="w-5 h-5" /> },
    { href: "/admin/gopal-pariwar", label: "Gopal Pariwar", icon: <UsersRound className="w-5 h-5" /> },
    { href: "/admin/gau-shalas", label: "Gau Shallas", icon: <LocateIcon className="w-5 h-5" /> },
    { href: "/admin/contact-us", label: "Data's Sansthan ", icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/admin/donations", label: "Donations", icon: <Heart className="w-5 h-5" /> },
    { href: "/admin/director-message", label: "Director Message", icon: <MessageCircle className="w-5 h-5" /> },
    { href: "/admin/pdf-book", label: "PDF Book", icon: <BookOpen className="w-5 h-5" /> },
    { href: "/admin/terms-conditions", label: "Terms & Conditions", icon: <FileText className="w-5 h-5" /> },
    { href: "/admin/banner", label: "Banner", icon: <Image className="w-5 h-5" /> },

  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-yellow-50">
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-gradient-to-b from-orange-600 via-orange-500 to-amber-500 
        text-white shadow-2xl flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Close Button (Mobile Only) */}
        <button 
          onClick={closeSidebar}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Logo + Name */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <img 
                src="/logo-dhenumahima.png" 
                alt="Logo" 
                className="w-10 h-10 rounded-full"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="text-2xl font-bold">🐄</div>';
                }}
              />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">Dehenu Mahima</h1>
              <p className="text-xs text-white/80 font-medium">Admin Panel</p>
            </div>
          </div>
        </div>
    

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeSidebar}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? "bg-white text-orange-600 font-bold shadow-lg scale-105" 
                    : "hover:bg-white/10 hover:translate-x-1"}
                `}
              >
                <span className={isActive ? "text-orange-600" : "text-white/90 group-hover:text-white"}>
                  {item.icon}
                </span>
                <span className={`text-sm ${isActive ? "text-orange-600" : "text-white"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/20 space-y-3">
         

          <p className="text-xs text-center text-white/60 pt-2">
            © {new Date().getFullYear()} Dehenu Mahima
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="sticky top-0 z-30 w-full bg-white border-b border-slate-200 shadow-sm">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            
            {/* Left Section - Mobile Menu + Title */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button 
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors"
              >
                <Menu size={24} />
              </button>

              {/* Slogans */}
              <div className="hidden md:flex items-center gap-4 lg:gap-8">
                <span className="text-sm lg:text-base font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  जय गौ माता
                </span>
                <span className="text-sm lg:text-base font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  || ॐ करणी ||
                </span>
                <span className="text-sm lg:text-base font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  जय गोपाल
                </span>
              </div>
            </div>

            {/* Right Section - Notifications + Profile */}
            <div className="flex items-center gap-3">
              
              {/* Notifications */}
              

              {/* User Profile Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-bold text-slate-800">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.role}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold shadow-lg">
                    {user.name.charAt(0)}
                  </div>
                  <ChevronDown size={16} className={`text-slate-600 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50">
                   
                    <hr className="my-2 border-slate-200" />
                    <button 
                      onClick={() => alert("Logout")}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Slogans */}
          <div className="md:hidden flex items-center justify-around px-4 py-2 bg-gradient-to-r from-orange-50 to-amber-50 border-t border-slate-200">
            <span className="text-xs font-bold text-orange-600">जय गौ माता</span>
            <span className="text-xs font-bold text-purple-600">|| ॐ करणी ||</span>
            <span className="text-xs font-bold text-blue-600">जय गोपाल</span>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 border border-slate-100 transition-all duration-300 hover:shadow-2xl">
            {children}
          </div>
        </div>
      </main>

      {/* Click outside to close profile dropdown */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 z-20"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </div>
  );
}