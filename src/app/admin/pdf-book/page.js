"use client";

import { useState } from "react";
import {
  Upload,
  Search,
  Trash2,
  Download,
  X,
  FileText,
  Calendar,
  User,
  BookOpen,
  Filter,
  DollarSign,
  Tag,
  Percent,
  Plus,
  Edit2
} from "lucide-react";

export default function PDFBookPage() {
  const [books, setBooks] = useState([
    {
      id: 1,
      name: "Bhagavad Gita",
      author: "Sage Vyasa",
      file: "/books/bhagavad-gita.pdf",
      uploadDate: "2024-01-15",
      size: "2.5 MB",
      price: 299,
    },
    {
      id: 2,
      name: "Ramayana",
      author: "Valmiki",
      file: "/books/ramayana.pdf",
      uploadDate: "2024-01-10",
      size: "3.8 MB",
      price: 399,
    },
    {
      id: 3,
      name: "Vedic Mathematics",
      author: "Bharati Krishna Tirthaji",
      file: "/books/vedic-math.pdf",
      uploadDate: "2024-01-05",
      size: "1.2 MB",
      price: 199,
    },
    {
      id: 4,
      name: "Mahabharata",
      author: "Sage Vyasa",
      file: "/books/mahabharata.pdf",
      uploadDate: "2023-12-20",
      size: "5.6 MB",
      price: 499,
    },
  ]);

  const [coupons, setCoupons] = useState([
    {
      id: 1,
      code: "WELCOME10",
      discount: 10,
      type: "percentage",
      description: "Welcome discount for new users",
      active: true,
    },
    {
      id: 2,
      code: "SAVE50",
      discount: 50,
      type: "fixed",
      description: "Flat ₹50 off on all books",
      active: true,
    },
    {
      id: 3,
      code: "FESTIVE25",
      discount: 25,
      type: "percentage",
      description: "Festival special discount",
      active: true,
    },
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showCouponList, setShowCouponList] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [editingCoupon, setEditingCoupon] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    file: null,
    price: "",
  });

  const [couponFormData, setCouponFormData] = useState({
    code: "",
    discount: "",
    type: "percentage",
    description: "",
  });

  // Filter and Sort Books
  const filteredAndSortedBooks = books
    .filter((book) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        book.name.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.uploadDate) - new Date(a.uploadDate);
      } else if (sortBy === "oldest") {
        return new Date(a.uploadDate) - new Date(b.uploadDate);
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "price-low") {
        return a.price - b.price;
      } else if (sortBy === "price-high") {
        return b.price - a.price;
      }
      return 0;
    });

  // Handle Form Input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle File Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData((prev) => ({
        ...prev,
        file: file,
      }));
    } else {
      alert("Please select a valid PDF file");
      e.target.value = "";
    }
  };

  // Handle Upload Submit
  const handleUpload = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.author || !formData.file || !formData.price) {
      alert("Please fill all fields and select a PDF file");
      return;
    }

    const newBook = {
      id: Date.now(),
      name: formData.name,
      author: formData.author,
      file: URL.createObjectURL(formData.file),
      uploadDate: new Date().toISOString().split("T")[0],
      size: (formData.file.size / (1024 * 1024)).toFixed(2) + " MB",
      price: parseFloat(formData.price),
    };

    setBooks([newBook, ...books]);
    setFormData({ name: "", author: "", file: null, price: "" });
    setShowUploadModal(false);
    alert("Book uploaded successfully!");
  };

  // Handle Delete Book
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  // Handle Download
  const handleDownload = (book) => {
    const link = document.createElement("a");
    link.href = book.file;
    link.download = `${book.name}.pdf`;
    link.click();
  };

  // Coupon Functions
  const handleCouponInputChange = (e) => {
    const { name, value } = e.target;
    setCouponFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCouponSubmit = (e) => {
    e.preventDefault();

    if (!couponFormData.code || !couponFormData.discount) {
      alert("Please fill all required fields");
      return;
    }

    if (editingCoupon) {
      setCoupons(
        coupons.map((c) =>
          c.id === editingCoupon.id
            ? {
                ...c,
                code: couponFormData.code.toUpperCase(),
                discount: parseFloat(couponFormData.discount),
                type: couponFormData.type,
                description: couponFormData.description,
              }
            : c
        )
      );
      alert("Coupon updated successfully!");
    } else {
      const newCoupon = {
        id: Date.now(),
        code: couponFormData.code.toUpperCase(),
        discount: parseFloat(couponFormData.discount),
        type: couponFormData.type,
        description: couponFormData.description,
        active: true,
      };
      setCoupons([...coupons, newCoupon]);
      alert("Coupon created successfully!");
    }

    setCouponFormData({ code: "", discount: "", type: "percentage", description: "" });
    setEditingCoupon(null);
    setShowCouponModal(false);
  };

  const handleDeleteCoupon = (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      setCoupons(coupons.filter((c) => c.id !== id));
    }
  };

  const handleEditCoupon = (coupon) => {
    setEditingCoupon(coupon);
    setCouponFormData({
      code: coupon.code,
      discount: coupon.discount.toString(),
      type: coupon.type,
      description: coupon.description,
    });
    setShowCouponModal(true);
    setShowCouponList(false);
  };

  const openAddCoupon = () => {
    setEditingCoupon(null);
    setCouponFormData({ code: "", discount: "", type: "percentage", description: "" });
    setShowCouponModal(true);
    setShowCouponList(false);
  };

  const toggleCouponActive = (id) => {
    setCoupons(
      coupons.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-2">
              PDF Books Library
            </h1>
            <p className="text-slate-600 font-medium">
              Upload and manage your PDF book collection with pricing
            </p>
          </div>
          <button
            onClick={() => setShowCouponList(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg font-semibold"
          >
            <Tag size={20} />
            Manage Coupons ({coupons.length})
          </button>
        </div>

        {/* Search, Sort & Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by book name or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 font-medium"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-slate-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-800 font-semibold"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">By Name (A-Z)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Upload Button */}
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg font-semibold"
            >
              <Upload size={20} />
              Upload Book
            </button>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedBooks.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <BookOpen size={64} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">
                No books found
              </h3>
              <p className="text-slate-500">
                Try adjusting your search or upload a new book
              </p>
            </div>
          ) : (
            filteredAndSortedBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-xl shadow-lg border-2 border-slate-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 overflow-hidden group"
              >
                {/* Book Icon */}
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 flex items-center justify-center">
                  <FileText size={64} className="text-white" />
                </div>

                {/* Book Details */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-slate-800 mb-1 line-clamp-2">
                    {book.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                    <User size={14} />
                    <span className="font-medium">{book.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <Calendar size={12} />
                    <span>{book.uploadDate}</span>
                    <span className="ml-auto font-semibold">{book.size}</span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3 bg-green-50 px-3 py-2 rounded-lg">
                    <DollarSign size={16} className="text-green-600" />
                    <span className="text-lg font-bold text-green-700">
                      ₹{book.price}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownload(book)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-semibold"
                    >
                      <Download size={14} />
                      Download
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="flex items-center justify-center px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Upload Book Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex justify-between items-center rounded-t-2xl sticky top-0">
                <div className="flex items-center gap-2">
                  <Upload size={24} />
                  <h2 className="text-xl font-bold">Upload PDF Book</h2>
                </div>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="space-y-6">
                  {/* Book Name */}
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Book Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 font-medium"
                      placeholder="Enter book name"
                    />
                  </div>

                  {/* Author Name */}
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Author Name *
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 font-medium"
                      placeholder="Enter author name"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Price (₹) *
                    </label>
                    <div className="relative">
                      <DollarSign
                        size={20}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 font-medium"
                        placeholder="Enter price"
                      />
                    </div>
                  </div>

                  {/* PDF File Upload */}
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      PDF File *
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                      <FileText
                        size={48}
                        className="mx-auto text-slate-400 mb-2"
                      />
                      <label className="cursor-pointer text-blue-600 hover:text-blue-700 font-semibold">
                        Click to upload PDF
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                      {formData.file && (
                        <p className="text-sm text-green-600 font-medium mt-2">
                          ✓ {formData.file.name}
                        </p>
                      )}
                      <p className="text-xs text-slate-500 mt-2">
                        PDF files only, max 50MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpload}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg font-semibold"
                  >
                    Upload Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Coupon List Modal */}
        {showCouponList && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 flex justify-between items-center rounded-t-2xl sticky top-0">
                <div className="flex items-center gap-2">
                  <Tag size={24} />
                  <h2 className="text-xl font-bold">Manage Coupons</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={openAddCoupon}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-semibold"
                  >
                    <Plus size={18} />
                    Add Coupon
                  </button>
                  <button
                    onClick={() => setShowCouponList(false)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Coupon List */}
              <div className="p-6">
                {coupons.length === 0 ? (
                  <div className="text-center py-12">
                    <Tag size={64} className="mx-auto text-slate-300 mb-4" />
                    <h3 className="text-xl font-bold text-slate-700 mb-2">
                      No coupons yet
                    </h3>
                    <p className="text-slate-500 mb-4">
                      Create your first coupon to offer discounts
                    </p>
                    <button
                      onClick={openAddCoupon}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg font-semibold"
                    >
                      Create Coupon
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {coupons.map((coupon) => (
                      <div
                        key={coupon.id}
                        className={`border-2 rounded-xl p-6 transition-all ${
                          coupon.active
                            ? "border-purple-200 bg-purple-50"
                            : "border-slate-200 bg-slate-50 opacity-60"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="px-4 py-2 bg-purple-600 text-white rounded-lg font-bold text-lg">
                                {coupon.code}
                              </span>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  coupon.active
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {coupon.active ? "Active" : "Inactive"}
                              </span>
                            </div>
                            <p className="text-slate-600 mb-2">
                              {coupon.description}
                            </p>
                            <div className="flex items-center gap-2 text-purple-700 font-bold">
                              <Percent size={18} />
                              <span>
                                {coupon.type === "percentage"
                                  ? `${coupon.discount}% OFF`
                                  : `₹${coupon.discount} OFF`}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleCouponActive(coupon.id)}
                              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                                coupon.active
                                  ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                  : "bg-green-100 text-green-700 hover:bg-green-200"
                              }`}
                            >
                              {coupon.active ? "Deactivate" : "Activate"}
                            </button>
                            <button
                              onClick={() => handleEditCoupon(coupon)}
                              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-semibold"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteCoupon(coupon.id)}
                              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-semibold"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Coupon Modal */}
        {showCouponModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 flex justify-between items-center rounded-t-2xl">
                <div className="flex items-center gap-2">
                  <Tag size={24} />
                  <h2 className="text-xl font-bold">
                    {editingCoupon ? "Edit Coupon" : "Create New Coupon"}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setShowCouponModal(false);
                    setEditingCoupon(null);
                  }}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="space-y-6">
                  {/* Coupon Code */}
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Coupon Code *
                    </label>
                    <input
                      type="text"
                      name="code"
                      value={couponFormData.code}
                      onChange={handleCouponInputChange}
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-800 font-bold uppercase"
                      placeholder="e.g., SAVE20"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Use uppercase letters and numbers only
                    </p>
                  </div>

                  {/* Discount Type */}
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Discount Type *
                    </label>
                    <select
                      name="type"
                      value={couponFormData.type}
                      onChange={handleCouponInputChange}
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-800 font-semibold"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (₹)</option>
                    </select>
                  </div>

                  {/* Discount Value */}
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Discount Value *
                    </label>
                    <div className="relative">
                      {couponFormData.type === "percentage" ? (
                        <Percent
                          size={20}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                        />
                      ) : (
                        <DollarSign
                          size={20}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                        />
                      )}
                      <input
                        type="number"
                        name="discount"
                        value={couponFormData.discount}
                        onChange={handleCouponInputChange}
                        min="0"
                        max={couponFormData.type === "percentage" ? "100" : undefined}
                        step="0.01"
                        className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-800 font-medium"
                        placeholder={
                          couponFormData.type === "percentage"
                            ? "Enter percentage (e.g., 10)"
                            : "Enter amount (e.g., 50)"
                        }
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={couponFormData.description}
                      onChange={handleCouponInputChange}
                      rows="3"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-800 font-medium"
                      placeholder="Brief description of the coupon"
                    />
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCouponModal(false);
                      setEditingCoupon(null);
                    }}
                    className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCouponSubmit}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg font-semibold"
                  >
                    {editingCoupon ? "Update Coupon" : "Create Coupon"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}