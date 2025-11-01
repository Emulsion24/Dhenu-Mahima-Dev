"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/store/authStore";
import API from "@/lib/api";
import {
  LogOut,
  User,
  BookOpen,
  Heart,
  ChevronRight,
  Download,
  Eye,
  ChevronLeft,
  Lock,
Loader2 
} from "lucide-react";

export default function UserDashboard() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [activeMenu, setActiveMenu] = useState("account");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [streamingBook, setStreamingBook] = useState(null);

  // PDF Viewer states
  const [isViewingPDF, setIsViewingPDF] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfLoading, setPdfLoading] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const isBookPurchased = (bookId) => {
    return userData?.purchasedBooks?.some((book) => book.id === bookId);
  };

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Disable right-click and keyboard shortcuts when viewing PDF
    if (isViewingPDF) {
      const handleContextMenu = (e) => {
        e.preventDefault();
        return false;
      };

      const handleKeyDown = (e) => {
        // Prevent Ctrl+P (Print), Ctrl+S (Save), F12 (DevTools)
        if (
          (e.ctrlKey && (e.key === 'p' || e.key === 's')) ||
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))
        ) {
          e.preventDefault();
          return false;
        }
      };

      // Prevent text selection
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';

      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.userSelect = '';
        document.body.style.webkitUserSelect = '';
      };
    }
  }, [isViewingPDF]);

  const handleStreamPDF = async (book) => {
    try {
      if (!isBookPurchased(book.id)) {
        alert("Please purchase this book first to view it.");
        return;
      }

      setStreamingBook(book.id);
      setPdfLoading(true);
      setCurrentBook(book);

      const response = await API.get(`/books/${book.id}/stream`, {
        responseType: "blob",
      });

      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      
      setPdfUrl(fileURL);
      setIsViewingPDF(true);

    } catch (err) {
      console.error("Stream error:", err);
      alert(
        err.response?.data?.message || "Failed to stream PDF. Please try again."
      );
    } finally {
      setStreamingBook(null);
      setPdfLoading(false);
    }
  };

  const closePDFViewer = () => {
    setIsViewingPDF(false);
    setCurrentBook(null);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl('');
    }
  };

  // Fetch user donations + purchased books
  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await API.get(`/users/${user.id}/data`);
        setUserData(res.data.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        alert("Failed to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, router]);

  if (!user) return null;

  if (loading) {
   return (

    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-400 animate-gradient-move overflow-hidden">
      {/* Soft glowing backdrop */}
      <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />

      {/* Loader container */}
      <div className="relative flex flex-col items-center justify-center z-10">
        <div className="relative flex items-center justify-center">
          {/* Spinning gradient ring behind logo */}
          <div className="absolute w-56 h-56 rounded-full border-8 border-t-transparent border-white/70 border-l-orange-300 border-r-yellow-300 animate-spin-slow"></div>

          {/* Static logo image */}
          <img
            src="/logo/logo5.webp" // replace with your actual logo path
            alt="Dhenu Mahima Logo"
            className="w-40 h-40 rounded-full relative z-10 drop-shadow-2xl"
          />
        </div>

        {/* Text */}
        <h1 className="text-white text-4xl font-bold mt-8 drop-shadow-lg tracking-wide animate-pulse">
          Dhenu Mahima
        </h1>
      </div>
    </div>
  );
}

  // PDF Viewer Component
  if (isViewingPDF) {
    return (
      <>
        <Header />
        <div className="fixed inset-0 z-50 bg-gray-900" style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>
          {/* Header Bar */}
          <div className="bg-gray-800 border-b border-gray-700 px-2 sm:px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={closePDFViewer}
                className="flex items-center gap-1 sm:gap-2 text-white hover:text-orange-400 transition-colors"
              >
                <ChevronLeft size={20} />
                <span className="font-semibold text-sm sm:text-base">Back</span>
              </button>
              <div className="h-6 w-px bg-gray-600 hidden sm:block"></div>
              <h2 className="text-white font-semibold text-sm sm:text-base truncate max-w-[150px] sm:max-w-none">
                {currentBook?.title}
              </h2>
            </div>
            
            <div className="flex items-center gap-2 text-red-400 text-xs sm:text-sm">
              <Lock size={14} className="hidden sm:block" />
              <span className="hidden sm:inline">Protected Content</span>
              <Lock size={14} className="sm:hidden" />
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="h-[calc(100vh-60px)] relative bg-gray-900">
            {pdfLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
                  <p className="text-white">Loading PDF...</p>
                </div>
              </div>
            ) : (
              <>
                {isMobile ? (
                  // Mobile: Use object tag which works better on mobile browsers
                  <object
                    data={pdfUrl}
                    type="application/pdf"
                    className="w-full h-full"
                    style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
                  >
                    {/* Fallback for browsers that don't support object tag */}
                    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                      <Lock size={48} className="text-orange-500 mb-4" />
                      <p className="text-white mb-4">
                        Your browser doesn&apos;t support inline PDF viewing.
                      </p>
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                      >
                        Open PDF in New Tab
                      </a>
                      <p className="text-gray-400 text-sm mt-4">
                        Note: Download and print are disabled
                      </p>
                    </div>
                  </object>
                ) : (
                  // Desktop: Use iframe with toolbar disabled
                  <iframe
                    src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                    className="w-full h-full border-0"
                    title={currentBook?.title}
                    style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                )}
                
                {/* Transparent overlay to prevent right-click */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{ 
                    mixBlendMode: 'multiply', 
                    opacity: 0.01,
                    userSelect: 'none',
                    WebkitUserSelect: 'none'
                  }}
                  onContextMenu={(e) => e.preventDefault()}
                ></div>
              </>
            )}
          </div>

          {/* Warning overlay */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-900/90 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm flex items-center gap-2 max-w-[90%] sm:max-w-none">
            <Lock size={14} className="flex-shrink-0" />
            <span className="text-center sm:text-left">
              Protected content - Screenshot monitoring active
            </span>
          </div>
        </div>
      </>
    );
  }

  const menuItems = [
    { id: "account", label: "My Account", icon: User },
    { id: "books", label: "Purchased Books", icon: BookOpen },
    { id: "donations", label: "My Donations", icon: Heart },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back, {userData?.name}!
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your account, books, and donations
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <aside className="w-full lg:w-1/4">
              <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 space-y-4 sticky top-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Dashboard
                  </h2>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                    aria-label="Logout"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveMenu(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          activeMenu === item.id
                            ? "bg-orange-100 text-orange-700 font-semibold shadow-sm"
                            : "text-gray-700 hover:bg-orange-50"
                        }`}
                        aria-current={activeMenu === item.id ? "page" : undefined}
                      >
                        <Icon size={20} />
                        <span className="flex-1 text-left">{item.label}</span>
                        <ChevronRight
                          size={16}
                          className={`transition-transform ${
                            activeMenu === item.id ? "translate-x-1" : ""
                          }`}
                        />
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 space-y-6">
              {/* ACCOUNT SECTION */}
              {activeMenu === "account" && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-orange-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                      <User size={32} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">
                        {userData?.name}
                      </h3>
                      <p className="text-gray-500">Account Information</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Email Address</p>
                      <p className="text-gray-800 font-medium">{userData?.email}</p>
                    </div>
                    {userData?.phone && (
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                        <p className="text-gray-800 font-medium">{userData.phone}</p>
                      </div>
                    )}
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Total Books Purchased</p>
                      <p className="text-gray-800 font-medium text-2xl">
                        {userData?.purchasedBooks?.length || 0}
                      </p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Total Donations</p>
                      <p className="text-gray-800 font-medium text-2xl">
                        {userData?.donations?.length || 0}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* PURCHASED BOOKS SECTION */}
              {activeMenu === "books" && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-orange-100">
                  <div className="text-center mb-8">
                    <BookOpen size={48} className="mx-auto text-yellow-500 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      My Purchased Books
                    </h3>
                    <p className="text-gray-600">
                      {userData?.purchasedBooks?.length || 0} book(s) in your library
                    </p>
                  </div>

                  {userData?.purchasedBooks?.length > 0 ? (
                    <>
                      <div className="grid gap-4">
                        {userData.purchasedBooks.map((book) => (
                          <div
                            key={book.id}
                            className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 border border-orange-100 rounded-xl hover:bg-orange-50 hover:shadow-md transition-all gap-4"
                          >
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800 text-lg mb-1">
                                {book.title}
                              </h4>
                              <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                <span className="font-medium">₹{book.price}</span>
                                <span>•</span>
                                <span>
                                  Purchased on{" "}
                                  {new Date(book.purchasedAt).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleStreamPDF(book)}
                              disabled={streamingBook === book.id}
                              className="px-4 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {streamingBook === book.id ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                  Opening...
                                </>
                              ) : (
                                <>
                                  <Eye size={16} />
                                  Read Book
                                </>
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      {/* Info Box */}
                      <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg flex items-start gap-3">
                        <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-800">
                          <p className="font-semibold mb-1">Protected Streaming Access</p>
                          <p>All books are view-only. Download and print functions are disabled to protect copyright.</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-600 mb-4">
                        You haven&apos;t purchased any books yet.
                      </p>
                      <button
                        onClick={() => router.push("/books")}
                        className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                      >
                        Browse Books
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* DONATIONS SECTION */}
              {activeMenu === "donations" && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-orange-100">
                  <div className="text-center mb-8">
                    <Heart size={48} className="mx-auto text-pink-500 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      My Donations
                    </h3>
                    <p className="text-gray-600">
                      Thank you for your generous support!
                    </p>
                  </div>

                  {userData?.donations?.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white text-left">
                            <th className="p-4 rounded-tl-lg">#</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 rounded-tr-lg">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userData.donations.map((don, i) => (
                            <tr
                              key={don.id}
                              className="border-b border-orange-100 hover:bg-orange-50 transition"
                            >
                              <td className="p-4 text-gray-600">{i + 1}</td>
                              <td className="p-4 font-semibold text-gray-800">
                                ₹{don.amount.toLocaleString()}
                              </td>
                              <td className="p-4">
                                <span
                                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                    don.status === "Success" ||
                                    don.status === "completed"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-yellow-100 text-yellow-700"
                                  }`}
                                >
                                  {don.status || "Success"}
                                </span>
                              </td>
                              <td className="p-4 text-gray-600">
                                {new Date(don.createdAt).toLocaleString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="mt-6 p-4 bg-pink-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Total Donated:</strong> ₹
                          {userData.donations
                            .reduce((sum, don) => sum + don.amount, 0)
                            .toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Heart size={64} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-600 mb-4">
                        You haven&apos;t made any donations yet.
                      </p>
                      <button
                        onClick={() => router.push("/donate")}
                        className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                      >
                        Make a Donation
                      </button>
                    </div>
                  )}
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