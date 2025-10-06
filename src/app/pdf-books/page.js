'use client'
import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Footer from '@/components/Footer';
import Headers from '@/components/Header';

export default function PDFBookViewer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  // Sample PDF books data
  const books = [
    {
      id: 1,
      title: "गो कपा चिकित्सा ज्योति",
      author: "Dr. Rajesh Kumar",
      pages: 245,
      cover: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=600&fit=crop",
      category: "Ayurveda"
    },
    {
      id: 2,
      title: "प्राचीन भारतीय चिकित्सा",
      author: "Dr. Sarah Johnson",
      pages: 312,
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
      category: "Traditional Medicine"
    },
    {
      id: 3,
      title: "योग और आयुर्वेद",
      author: "Swami Ramdev",
      pages: 198,
      cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
      category: "Yoga"
    },
    {
      id: 4,
      title: "हर्बल औषधि विज्ञान",
      author: "Dr. Emily Davis",
      pages: 428,
      cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
      category: "Herbal Medicine"
    },
    {
      id: 5,
      title: "वैदिक चिकित्सा पद्धति",
      author: "Pandit David Wilson",
      pages: 356,
      cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop",
      category: "Vedic Medicine"
    },
    {
      id: 6,
      title: "प्राकृतिक उपचार",
      author: "Dr. Lisa Anderson",
      pages: 289,
      cover: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=600&fit=crop",
      category: "Natural Healing"
    },
    {
      id: 7,
      title: "आयुर्वेदिक पोषण",
      author: "Chef Anika Sharma",
      pages: 176,
      cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
      category: "Nutrition"
    },
    {
      id: 8,
      title: "मन और शरीर का संतुलन",
      author: "Dr. Michael Chen",
      pages: 234,
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
      category: "Wellness"
    }
  ];

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

  if (selectedBook) {
    return (
        <>
      
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 relative overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-8">
          <button
            onClick={() => setSelectedBook(null)}
            className="mb-6 flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors"
          >
            <ChevronLeft size={20} />
            Back to Library
          </button>
          
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-2">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 rounded-3xl blur-xl opacity-50"></div>
                  <img
                    src={selectedBook.cover}
                    alt={selectedBook.title}
                    className="relative w-full rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
              <div className="md:col-span-3">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-yellow-100 px-4 py-2 rounded-full mb-4 border border-orange-200">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-orange-700">{selectedBook.category}</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent">{selectedBook.title}</h1>
                <p className="text-gray-600 text-xl mb-6">by {selectedBook.author}</p>
                
                <div className="flex gap-4 mb-8">
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                    </svg>
                    <span className="font-semibold">{selectedBook.pages} Pages</span>
                  </div>
                  <div className="w-px bg-gray-300"></div>
                  <div className="flex items-center gap-2 text-green-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Free Download</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <button className="group relative overflow-hidden w-full bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="relative flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Read Now
                    </span>
                  </button>
                  <button className="w-full bg-gradient-to-br from-orange-100 to-yellow-100 border-2 border-orange-300 text-orange-700 font-bold px-8 py-4 rounded-2xl hover:from-orange-200 hover:to-yellow-200 transition-all duration-300 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      </>
    );
  }

  return (
    <>
      <Headers/>
    <section className="relative min-h-screen py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-yellow-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Ultra Modern Title Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-yellow-100 px-4 py-2 rounded-full mb-6 border border-orange-200">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-orange-700 uppercase tracking-wider">Digital Library</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight">
            <span className="inline-block bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
              Our PDF
            </span>
            <br />
            <span className="inline-block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              E-Books
            </span>
          </h2>
          
          <p className="text-gray-600 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Discover ancient wisdom through our curated collection of digital books
          </p>
          
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-orange-400"></div>
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-orange-400"></div>
          </div>
        </div>

        {/* Search Bar */}
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

        {/* Results info */}
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
              {currentPage}/{totalPages}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Current Page</div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 lg:gap-10 mb-12">
          {currentBooks.map((book, i) => (
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
                    
                    <img 
                      src={book.cover} 
                      alt={book.title} 
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        hoveredIndex === i ? 'scale-110 brightness-90' : 'scale-100'
                      }`}
                      loading={i < 4 ? "eager" : "lazy"}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40"></div>
                    <div className={`absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 transition-opacity duration-700 ${
                      hoveredIndex === i ? 'opacity-100' : 'opacity-0'
                    }`}></div>
                    
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
                        <svg className="w-5 h-5 group-hover/btn:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm">View PDF</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-5 bg-gradient-to-br from-orange-600 to-red-700">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-center leading-snug text-white">
                      {book.title}
                    </h3>
                    
                    <div className="flex items-center justify-center gap-3 mt-3 text-xs text-white">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                        </svg>
                        Free
                      </span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        PDF
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-20">
            <svg className="mx-auto mb-4 text-orange-400 w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No books found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}

        {/* Pagination */}
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

            {/* Stats */}
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
                  Free
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Download</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  24/7
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Access</div>
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