'use client'
import toast from "react-hot-toast";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, X, Loader2, Lock, Tag, CheckCircle, AlertCircle } from 'lucide-react';
import Footer from '@/components/Footer';
import Headers from '@/components/Header';
import Image from 'next/image';
import API from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

export default function PDFBookViewer() {



  const [loadingProgress, setLoadingProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [books, setBooks] = useState([]);
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [isPurchasing, setIsPurchasing] = useState(false);

  // PDF Viewer states
  const [isViewingPDF, setIsViewingPDF] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfLoading, setPdfLoading] = useState(false);

  // Coupon states
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState(null);

  useEffect(() => {
    fetchBooks();
    if (user?.id) {
      fetchPurchasedBooks();
    }
  }, [user]);
 
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

      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isViewingPDF]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get(`/books`);
      const booksData = response.data?.data?.books || response.data?.books || [];
      
      const transformedBooks = booksData.map(book => ({
        id: book.id,
        title: book.name,
        author: book.author,
        pages: calculatePages(book.fileSize),
        cover: book.coverImage || '/placeholder-book.jpg',
        category: extractCategory(book.description) || "General",
        price: book.price,
        priceDisplay: `${book.price} Rs`,
        fileName: book.fileName,
        filePath: book.filePath,
        fileSize: book.fileSize,
        description: book.description,
        uploadDate: new Date(book.uploadDate).toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }));
      
      setBooks(transformedBooks);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to load books. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchPurchasedBooks = async () => {
    try {
      const userId = user?.id;
      if (!userId) return;

      const response = await API.get(`/pdf-payment/books/purchased/${userId}`);
      setPurchasedBooks(response.data.purchases.map(item => item.bookId));
    } catch (err) {
      console.error('Error fetching purchased books:', err);
    }
  };

  const isBookPurchased = (bookId) => {
    return purchasedBooks.includes(bookId);
  };

  const calculatePages = (fileSize) => {
    if (!fileSize) return 0;
    const sizeInKB = parseFloat(fileSize);
    return Math.round(sizeInKB / 100);
  };

  const extractCategory = (description) => {
    if (!description) return null;
    const categories = ['Ayurveda', 'Traditional Medicine', 'Yoga', 'Herbal Medicine', 'Vedic Medicine', 'Natural Healing', 'Nutrition', 'Wellness'];
    const lowerDesc = description.toLowerCase();
    return categories.find(cat => lowerDesc.includes(cat.toLowerCase()));
  };

  const calculateFinalPrice = () => {
    if (calculatedPrice !== null) {
      return calculatedPrice;
    }
    return selectedBook?.price || 0;
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    try {
      setCouponLoading(true);
      setCouponError('');

      const response = await API.post('/coupons/validate', {
        code: couponCode,
        bookId: selectedBook.id
      });

      const data = response.data;

      if (data.success) {
        setAppliedCoupon(data.data.coupon);
        setCalculatedPrice(data.data.finalAmount);
        setCouponError('');
      } else {
        setCouponError(data.message || 'Invalid coupon code');
        setAppliedCoupon(null);
        setCalculatedPrice(null);
      }
    } catch (err) {
      console.error('Coupon validation error:', err);
      setCouponError(err.response?.data?.message || 'Invalid or expired coupon');
      setAppliedCoupon(null);
      setCalculatedPrice(null);
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
    setCalculatedPrice(null);
  };

  const handlePurchase = async (bookId) => {
    try {
      setIsPurchasing(true);

    // ✅ Check login first
    if (!user?.id) {
      toast.custom((t) => (
        <div className="bg-white shadow-lg rounded-xl p-4 border border-orange-300 flex flex-col gap-2 w-72">
          <p className="text-gray-800 font-semibold">
            🔒 Please login to purchase books
          </p>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              window.location.href = "/login";
            }}
            className="bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            Go to Login
          </button>
        </div>
      ));
      setIsPurchasing(false);
      return;
    }
      const orderResponse = await API.post('/pdf-payment/create-order', {
        bookId,
        couponCode: appliedCoupon?.code || null
      });

      const { paymentUrl, transactionId } = orderResponse.data;

      localStorage.setItem('pending_transaction', transactionId);
      localStorage.setItem('pending_book_id', bookId);

      window.location.href = paymentUrl;

    } catch (err) {
      console.error('Purchase error:', err);
      alert(err.response?.data?.message || 'Purchase failed. Please try again.');
      setIsPurchasing(false);
    }
  };

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const pendingTransaction = localStorage.getItem('pending_transaction');
      const pendingBookId = localStorage.getItem('pending_book_id');
      
      if (pendingTransaction && user?.id) {
        try {
          const response = await API.get(`/pdf-payment/status/${pendingTransaction}`);
          
          if (response.data.paymentStatus === 'PAYMENT_SUCCESS') {
            localStorage.removeItem('pending_transaction');
            localStorage.removeItem('pending_book_id');
            
            await fetchPurchasedBooks();
            
            const book = books.find(b => b.id === parseInt(pendingBookId));
            if (book) {
              setSelectedBook(book);
              alert('Payment successful! You can now stream the book.');
            }
          } else if (response.data.paymentStatus === 'PAYMENT_FAILED') {
            localStorage.removeItem('pending_transaction');
            localStorage.removeItem('pending_book_id');
            alert('Payment failed. Please try again.');
          }
        } catch (err) {
          console.error('Error checking payment status:', err);
        }
      }
    };

    if (books.length > 0) {
      checkPaymentStatus();
    }
  }, [books, user]);

  // Modified Stream PDF - Embedded Viewer with Protection
  const handleStreamPDF = async (book) => {
    try {
      setError(null);
      setPdfLoading(true);
      setLoadingProgress(0);

      // Optional: Check access first (faster feedback)
      // await API.get(`/books/${book.id}/check-access`);

      // Stream with progress tracking
      const response = await API.get(`/books/${book.id}/stream`, {
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setLoadingProgress(percentCompleted);
          }
        },
        // Enable range requests for faster initial load
        headers: {
          'Range': 'bytes=0-' // Request from start, let browser handle chunking
        }
      });

      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      
      setPdfUrl(fileURL);
      setIsViewingPDF(true);
      setLoadingProgress(100);

    } catch (err) {
      console.error('Stream error:', err);
      
      if (err.response?.status === 403) {
        setError('You do not have access to this book. Please purchase it first.');
      } else if (err.response?.status === 404) {
        setError('Book file not found. Please contact support.');
      } else if (err.code === 'ERR_NETWORK') {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError('Failed to load PDF. Please try again.');
      }
    } finally {
      setPdfLoading(false);
    }
  };

  const closePDFViewer = () => {
    setIsViewingPDF(false);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl('');
    }
    setError(null);
    setLoadingProgress(0);
  };

  const itemsPerPage = 8;
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBooks = filteredBooks.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };


  useEffect(() => {
    if (isViewingPDF) {
      const handleContextMenu = (e) => {
        e.preventDefault();
        return false;
      };

      const handleKeyDown = (e) => {
        if (
          (e.ctrlKey && (e.key === 'p' || e.key === 's')) ||
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))
        ) {
          e.preventDefault();
          return false;
        }
      };

      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isViewingPDF]);


  // PDF Viewer Component
 if (isViewingPDF) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-900" style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={closePDFViewer}
              className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors"
            >
              <ChevronLeft size={20} />
              <span className="font-semibold">Back</span>
            </button>
            <div className="h-6 w-px bg-gray-600"></div>
            <h2 className="text-white font-semibold truncate max-w-md">{selectedBook?.title}</h2>
          </div>
          
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <Lock size={16} />
            <span className="hidden md:inline">Protected Content</span>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="h-[calc(100vh-60px)] relative">
          {pdfLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="text-center max-w-md px-4">
                <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
                <p className="text-white text-lg font-semibold mb-2">Loading PDF...</p>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-full transition-all duration-300 ease-out"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
                <p className="text-gray-400 text-sm">{loadingProgress}%</p>
                
                <p className="text-gray-400 text-sm mt-4">
                  This may take a moment for large files...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="text-center max-w-md px-4">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <p className="text-white text-lg font-semibold mb-2">Unable to Load PDF</p>
                <p className="text-gray-400 mb-6">{error}</p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => handleStreamPDF(selectedBook)}
                    className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={closePDFViewer}
                    className="bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Desktop/Tablet - iframe with lazy loading */}
              <iframe
                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                className="w-full h-full border-0 hidden sm:block"
                title={selectedBook?.title}
                loading="lazy"
                onContextMenu={(e) => e.preventDefault()}
                style={{ 
                  pointerEvents: 'auto',
                  WebkitOverflowScrolling: 'touch'
                }}
              />
              
              {/* Mobile - optimized embed */}
              <div className="block sm:hidden w-full h-full overflow-auto bg-gray-900">
                <object
                  data={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH&zoom=page-width`}
                  type="application/pdf"
                  className="w-full h-full min-h-screen"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  {/* Mobile fallback */}
                  <div className="p-4 text-center">
                    <div className="bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
                      <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                      <p className="text-white mb-4 font-semibold">PDF Viewer Not Supported</p>
                      <p className="text-gray-400 text-sm mb-4">
                        Your browser doesn't support embedded PDF viewing.
                      </p>
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                      >
                        Open in New Tab
                      </a>
                      <div className="mt-4 flex items-center justify-center gap-2 text-red-400 text-xs">
                        <Lock size={12} />
                        <span>Download disabled</span>
                      </div>
                    </div>
                  </div>
                </object>
              </div>
            </>
          )}
          
          {/* Protective overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ mixBlendMode: 'multiply', opacity: 0.005 }}
          />
        </div>

        {/* Warning */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-900/90 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
          <Lock size={14} />
          <span className="hidden sm:inline">Protected content - Screenshots monitored</span>
          <span className="sm:hidden">Protected content</span>
        </div>

        <style jsx>{`
          iframe, object, embed {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
          }
        `}</style>
      </div>
    );
  }

  if (loading) {
    return (
      <>
        <Headers />
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-orange-600 animate-spin mx-auto mb-4" />
            <p className="text-xl font-semibold text-gray-700">Loading books...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Headers />
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <p className="text-xl font-semibold text-gray-700 mb-4">{error}</p>
            <button
              onClick={fetchBooks}
              className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

if (selectedBook) {
    const isPurchased = isBookPurchased(selectedBook.id);
    const finalPrice = calculateFinalPrice();
    const discount = selectedBook.price - finalPrice;
    
    return (
      <>
        <Headers />
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="relative max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
            <button
              onClick={() => {
                setSelectedBook(null);
                setAppliedCoupon(null);
                setCouponCode('');
                setCouponError('');
                setCalculatedPrice(null);
              }}
              className="mb-4 sm:mb-6 flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors text-sm sm:text-base"
            >
              <ChevronLeft size={20} />
              Back to Library
            </button>

            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="grid md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 items-start md:items-center">

                <div className="md:col-span-2 relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 rounded-2xl sm:rounded-3xl blur-xl opacity-40 animate-pulse"></div>
                  <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={selectedBook.cover}
                      alt={selectedBook.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 40vw"
                      unoptimized
                    />
                    {!isPurchased && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center px-4">
                          <Lock className="w-12 h-12 sm:w-16 sm:h-16 text-white mx-auto mb-3 sm:mb-4" />
                          <p className="text-white font-bold text-base sm:text-lg">Purchase to Unlock</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-3 flex flex-col justify-between">
                  {isPurchased && (
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4 border border-green-300 w-fit">
                      <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
                      <span className="text-xs sm:text-sm font-semibold text-green-700">PURCHASED</span>
                    </div>
                  )}

                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-yellow-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4 border border-orange-200 w-fit">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    <span className="text-xs sm:text-sm font-semibold text-orange-700">{selectedBook.category}</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2 sm:mb-3 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent leading-tight">
                    {selectedBook.title}
                  </h1>
                  <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-4 sm:mb-6">by {selectedBook.author}</p>

                  {selectedBook.description && (
                    <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 line-clamp-3">
                      {selectedBook.description}
                    </p>
                  )}

                  <div className="flex items-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 text-gray-600 flex-wrap">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                      </svg>
                      <span className="font-semibold text-sm sm:text-base">{selectedBook.pages} Pages</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold text-sm sm:text-base">{selectedBook.fileSize}</span>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {isPurchased ? (
                      <>
                        <button 
                          onClick={() => handleStreamPDF(selectedBook)}
                          disabled={pdfLoading}
                          className="group relative w-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                          <span className="relative flex items-center justify-center gap-2">
                            {pdfLoading ? (
                              <>
                                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                                <span className="hidden xs:inline">Loading PDF...</span>
                                <span className="xs:hidden">Loading...</span>
                              </>
                            ) : (
                              <>
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Read Book Now
                              </>
                            )}
                          </span>
                        </button>

                        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          <div className="text-xs sm:text-sm text-blue-800">
                            <p className="font-semibold mb-1">Protected Streaming Access</p>
                            <p>This book is view-only. Download and print functions are disabled to protect copyright.</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {!appliedCoupon ? (
                          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="flex items-center gap-2 mb-2 sm:mb-3">
                              <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                              <span className="font-semibold text-orange-700 text-sm sm:text-base">Have a coupon code?</span>
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => {
                                  setCouponCode(e.target.value.toUpperCase());
                                  setCouponError('');
                                }}
                                placeholder="Enter code"
                                className="flex-1 px-3 sm:px-4 py-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 uppercase text-sm sm:text-base"
                              />
                              <button
                                onClick={handleApplyCoupon}
                                disabled={couponLoading || !couponCode.trim()}
                                className="bg-orange-600 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm sm:text-base whitespace-nowrap"
                              >
                                {couponLoading ? (
                                  <>
                                    <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                                    <span className="hidden xs:inline">Checking...</span>
                                  </>
                                ) : (
                                  'Apply'
                                )}
                              </button>
                            </div>
                            {couponError && (
                              <p className="text-red-600 text-xs sm:text-sm mt-2 flex items-center gap-1">
                                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                {couponError}
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="bg-green-50 border-2 border-green-300 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                                <div className="min-w-0">
                                  <p className="font-semibold text-green-700 text-sm sm:text-base truncate">Coupon Applied: {appliedCoupon.code}</p>
                                  <p className="text-xs sm:text-sm text-green-600">
                                    {appliedCoupon.type === 'PERCENTAGE' 
                                      ? `${appliedCoupon.discount}% OFF` 
                                      : `₹${appliedCoupon.discount} OFF`}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={removeCoupon}
                                className="text-red-600 hover:text-red-700 transition-colors flex-shrink-0"
                              >
                                <X className="w-4 h-4 sm:w-5 sm:h-5" />
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="bg-gradient-to-br from-orange-100 to-yellow-100 border-2 border-orange-300 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-700 font-semibold text-sm sm:text-base">Original Price:</span>
                            <span className={`font-bold ${appliedCoupon ? 'line-through text-gray-500 text-lg sm:text-xl' : 'text-xl sm:text-2xl text-orange-700'}`}>
                              ₹{selectedBook.price}
                            </span>
                          </div>
                          {appliedCoupon && (
                            <>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-green-700 font-semibold text-sm sm:text-base">Discount:</span>
                                <span className="text-green-700 font-bold text-base sm:text-lg">-₹{discount}</span>
                              </div>
                              <div className="border-t-2 border-orange-200 my-2 sm:my-3"></div>
                              <div className="flex items-center justify-between">
                                <span className="text-orange-700 font-bold text-base sm:text-lg">Final Price:</span>
                                <span className="text-orange-700 font-bold text-2xl sm:text-3xl">₹{finalPrice}</span>
                              </div>
                            </>
                          )}
                        </div>

                        <button 
                          onClick={() => handlePurchase(selectedBook.id)}
                          disabled={isPurchasing}
                          className="group relative w-full bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                          <span className="relative flex items-center justify-center gap-2">
                            {isPurchasing ? (
                              <>
                                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                                <span className="hidden xs:inline">Processing Payment...</span>
                                <span className="xs:hidden">Processing...</span>
                              </>
                            ) : (
                              <>
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Buy Now - ₹{finalPrice}
                              </>
                            )}
                          </span>
                        </button>

                        <div className="bg-amber-50 border-2 border-amber-200 rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
                          <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div className="text-xs sm:text-sm text-amber-800">
                            <p className="font-semibold mb-1">Secure Payment & Protected Access</p>
                            <p>After purchase, you&apos;ll get lifetime streaming access. Download and print are disabled to protect copyright.</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
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
      <Headers/>
      <section className="relative min-h-screen py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-yellow-50">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-yellow-100 px-4 py-2 rounded-full mb-6 border border-orange-200">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-orange-700 uppercase tracking-wider">Digital Library</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight">
              <span className="inline-block bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
                Protected PDF
              </span>
              <br />
              <span className="inline-block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                Streaming
              </span>
            </h2>
            
            <p className="text-gray-600 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Secure reading experience with download and print protection
            </p>
            
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-orange-400"></div>
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-orange-400"></div>
            </div>
          </div>

          <div className="mb-12 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500" size={20} />
              <input
                type="text"
                placeholder="Search by title, author, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-white border-2 border-orange-200 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-lg"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-500 hover:text-orange-700"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 text-center mb-10">
            <div>
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {filteredBooks.length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Books Found</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {currentPage}/{totalPages || 1}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Current Page</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 lg:gap-10 mb-12">
            {currentBooks.map((book, i) => {
              const isPurchased = isBookPurchased(book.id);
              
              return (
                <div
                  key={book.id}
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedBook(book)}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`
                  }}
                >
                  <style>{`
                    @keyframes fadeInUp {
                      from {
                        opacity: 0;
                        transform: translateY(30px);
                      }
                      to {
                        opacity: 1;
                        transform: translateY(0);
                      }
                    }
                  `}</style>

                  <div className="relative h-full">
                    <div 
                      className={`absolute -inset-2 bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 rounded-3xl blur-xl transition-all duration-700 ${
                        hoveredIndex === i ? 'opacity-60 scale-105' : 'opacity-0 scale-95'
                      }`}
                    ></div>
                    
                    <div className={`relative bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100 rounded-3xl shadow-xl overflow-hidden transition-all duration-700 ${
                      hoveredIndex === i ? 'scale-105 shadow-2xl' : 'scale-100'
                    }`}>
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-yellow-100 to-orange-100"></div>
                        
                        <div className="relative w-full h-full overflow-hidden">
                          <Image
                            src={book.cover}
                            alt={book.title}
                            fill
                            className={`object-cover transition-all duration-700 ${
                              hoveredIndex === i ? "scale-110 brightness-90" : "scale-100"
                            }`}
                            priority={i < 4}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            unoptimized
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40"></div>
                        <div className={`absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 transition-opacity duration-700 ${
                          hoveredIndex === i ? 'opacity-100' : 'opacity-0'
                        }`}></div>
                        
                        {!isPurchased && (
                          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="text-center">
                              <Lock className="w-8 h-8 text-white mx-auto mb-2" />
                              <p className="text-white font-bold text-sm">Purchase to Read</p>
                            </div>
                          </div>
                        )}

                        {isPurchased && (
                          <div className="absolute top-4 left-4">
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border border-white/20 flex items-center gap-1.5">
                              <CheckCircle className="w-3 h-3" />
                              Owned
                            </div>
                          </div>
                        )}
                        
                        <div className="absolute top-4 right-4">
                          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border border-white/20 flex items-center gap-1.5">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                            PDF
                          </div>
                        </div>

                        <div className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-500 ${
                          hoveredIndex === i ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                        }`}>
                          <button className="w-full bg-white/95 backdrop-blur-md text-orange-600 font-bold py-3 rounded-xl shadow-lg hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                            {isPurchased ? (
                              <>
                                <svg className="w-5 h-5 group-hover/btn:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span className="text-sm">Read Now</span>
                              </>
                            ) : (
                              <>
                                <Lock className="w-4 h-4" />
                                <span className="text-sm">Buy to Read</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4 sm:p-5 bg-gradient-to-br from-orange-600 to-red-700">
                        <h3 className="text-sm sm:text-base md:text-lg font-bold text-center leading-snug text-white line-clamp-2">
                          {book.title}
                        </h3>
                        
                        <div className="flex items-center justify-center gap-3 mt-3 text-xs text-white">
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            {book.author}
                          </span>
                          <span className="w-1 h-1 bg-white rounded-full"></span>
                          <span className="flex items-center gap-1 font-bold">
                            ₹{book.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-20">
              <svg className="mx-auto mb-4 text-orange-400 w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No books found</h3>
              <p className="text-gray-600">Try adjusting your search terms</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-100 to-yellow-100 border-2 border-orange-300 rounded-xl text-orange-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-200 hover:to-yellow-200 transition-all shadow-lg"
                >
                  <ChevronLeft size={20} />
                  Previous
                </button>
                
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-12 h-12 rounded-xl font-bold transition-all shadow-lg ${
                        currentPage === i + 1
                          ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-orange-500/50 scale-110'
                          : 'bg-white border-2 border-orange-200 text-orange-600 hover:border-orange-400'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-100 to-yellow-100 border-2 border-orange-300 rounded-xl text-orange-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-200 hover:to-yellow-200 transition-all shadow-lg"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="flex items-center gap-8 text-center">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    {books.length}+
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Books Available</div>
                </div>
                <div className="w-px h-12 bg-gray-200"></div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    {purchasedBooks.length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Your Books</div>
                </div>
                <div className="w-px h-12 bg-gray-200"></div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    <Lock className="w-6 h-6 mx-auto" />
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Protected</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer/>
    </>
  );
}