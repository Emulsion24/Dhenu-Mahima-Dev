"use client";

import { useState, useEffect } from "react";
import API from "@/lib/api";
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
  Edit2,
  Loader2
} from "lucide-react";

// Configure axios base URL


// Add auth token to requests if available


export default function PDFBookPage() {
  const [books, setBooks] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showCouponList, setShowCouponList] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingCoupon, setEditingCoupon] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    pdfFile: null,
    price: "",
    description: "",
    coverImage: null,
  });

  const [couponFormData, setCouponFormData] = useState({
    code: "",
    discount: "",
    type: "percentage",
    description: "",
    minPurchase: "",
    maxDiscount: "",
    expiryDate: "",
  });

  // Fetch books from API
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await API.get("/books", {
        params: {
          search: searchTerm,
          sortBy: sortBy,
          page: currentPage,
          limit: 20,
        },
      });
      setBooks(response.data.data.books);
      setTotalPages(response.data.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching books:", error);
      alert("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  // Fetch coupons from API
  const fetchCoupons = async () => {
    try {
      const response = await API.get("/coupons");
      setCoupons(response.data.data.coupons);
    } catch (error) {
      console.error("Error fetching coupons:", error);
      alert("Failed to fetch coupons");
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchBooks();
  }, [searchTerm, sortBy, currentPage]);

  useEffect(() => {
    fetchCoupons();
  }, []);

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
        pdfFile: file,
      }));
    } else {
      alert("Please select a valid PDF file");
      e.target.value = "";
    }
  };
    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file.type.startsWith("image/")) {
      setFormData((prev) => ({
        ...prev,
        coverImage: file,
      }));
    } else {
      alert("Please select a valid Image file");
      e.target.value = "";
    }
  };

  // Handle Upload Submit
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.author || !formData.pdfFile || !formData.price || !formData.coverImage) {
      alert("Please fill all required fields and select a PDF file");
      return;
    }

    try {
      setUploading(true);
      const uploadFormData = new FormData();
      uploadFormData.append("name", formData.name);
      uploadFormData.append("author", formData.author);
      uploadFormData.append("price", formData.price);
      uploadFormData.append("description", formData.description);
      uploadFormData.append("pdf", formData.pdfFile);
      uploadFormData.append("image", formData.coverImage);

      await API.post("/books", uploadFormData);

      alert("Book uploaded successfully!");
      setFormData({ name: "", author: "", file: null, price: "", description: "" ,coverImage:null});
      setShowUploadModal(false);
      fetchBooks(); // Refresh the book list
    } catch (error) {
      console.error("Upload error:", error);
      alert(error.response?.data?.message || "Failed to upload book");
    } finally {
      setUploading(false);
    }
  };

  // Handle Delete Book
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) {
      return;
    }

    try {
      await API.delete(`/books/${id}`);
      alert("Book deleted successfully!");
      fetchBooks();
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.response?.data?.message || "Failed to delete book");
    }
  };

  // Handle Download/Stream PDF
const handleDownload = async (book) => {

  try {
    const response = await API.get(`/books/pdf/download/${book.fileName}`, {
      responseType: "blob", // required to handle binary data
      withCredentials: true, // ✅ ensures cookie (JWT) is sent
    });

    // Convert blob to downloadable file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${book.name}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Download error:", error);
    alert(error.response?.data?.message || "You are not authorized to download this file");
  }
};


  // Coupon Functions
  const handleCouponInputChange = (e) => {
    const { name, value } = e.target;
    setCouponFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCouponSubmit = async (e) => {
    e.preventDefault();

    if (!couponFormData.code || !couponFormData.discount) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const couponData = {
        code: couponFormData.code.toUpperCase(),
        discount: parseFloat(couponFormData.discount),
        type: couponFormData.type,
        description: couponFormData.description,
        minPurchase: couponFormData.minPurchase ? parseFloat(couponFormData.minPurchase) : null,
        maxDiscount: couponFormData.maxDiscount ? parseFloat(couponFormData.maxDiscount) : null,
        expiryDate: couponFormData.expiryDate || null,
      };

      if (editingCoupon) {
        await API.put(`/coupons/${editingCoupon.id}`, couponData);
        alert("Coupon updated successfully!");
      } else {
        await API.post("/coupons", couponData);
        alert("Coupon created successfully!");
      }

      setCouponFormData({
        code: "",
        discount: "",
        type: "percentage",
        description: "",
        minPurchase: "",
        maxDiscount: "",
        expiryDate: "",
      });
      setEditingCoupon(null);
      setShowCouponModal(false);
      fetchCoupons();
    } catch (error) {
      console.error("Coupon error:", error);
      alert(error.response?.data?.message || "Failed to save coupon");
    }
  };

  const handleDeleteCoupon = async (id) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) {
      return;
    }

    try {
      await API.delete(`/coupons/${id}`);
      alert("Coupon deleted successfully!");
      fetchCoupons();
    } catch (error) {
      console.error("Delete coupon error:", error);
      alert(error.response?.data?.message || "Failed to delete coupon");
    }
  };

  const handleEditCoupon = (coupon) => {
    setEditingCoupon(coupon);
    setCouponFormData({
      code: coupon.code,
      discount: coupon.discount.toString(),
      type: coupon.type,
      description: coupon.description || "",
      minPurchase: coupon.minPurchase?.toString() || "",
      maxDiscount: coupon.maxDiscount?.toString() || "",
      expiryDate: coupon.expiryDate ? coupon.expiryDate.split("T")[0] : "",
    });
    setShowCouponModal(true);
    setShowCouponList(false);
  };

  const openAddCoupon = () => {
    setEditingCoupon(null);
    setCouponFormData({
      code: "",
      discount: "",
      type: "percentage",
      description: "",
      minPurchase: "",
      maxDiscount: "",
      expiryDate: "",
    });
    setShowCouponModal(true);
    setShowCouponList(false);
  };

  const toggleCouponActive = async (id) => {
    try {
      const coupon = coupons.find((c) => c.id === id);
      await API.patch(`/coupons/toggle/${id}`, {
        active: !coupon.active,
      });
      fetchCoupons();
    } catch (error) {
      console.error("Toggle coupon error:", error);
      alert("Failed to toggle coupon status");
    }
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
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by book name or author..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 font-medium"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter size={20} className="text-slate-600" />
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-800 font-semibold"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">By Name (A-Z)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg font-semibold"
            >
              <Upload size={20} />
              Upload Book
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={48} className="text-blue-600 animate-spin" />
          </div>
        ) : (
          <>
            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.length === 0 ? (
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
                books.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white rounded-xl shadow-lg border-2 border-slate-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 overflow-hidden group"
                  >
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 flex items-center justify-center">
                      {book.coverImage ? (
                        <img
                          src={`${book.coverImage}`}
                          alt={book.name}
                          className="w-full h-32 object-cover"
                        />
                      ) : (
                        <FileText size={64} className="text-white" />
                      )}
                    </div>

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
                        <span>{new Date(book.uploadDate).toLocaleDateString()}</span>
                        <span className="ml-auto font-semibold">{book.fileSize}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3 bg-green-50 px-3 py-2 rounded-lg">
                        <DollarSign size={16} className="text-green-600" />
                        <span className="text-lg font-bold text-green-700">
                          ₹{book.price}
                        </span>
                      </div>

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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border-2 border-slate-300 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border-2 border-slate-300 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Upload Book Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex justify-between items-center rounded-t-2xl sticky top-0">
                <div className="flex items-center gap-2">
                  <Upload size={24} />
                  <h2 className="text-xl font-bold">Upload PDF Book</h2>
                </div>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  disabled={uploading}
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleUpload} className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Book Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 font-medium"
                      placeholder="Enter book name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Author Name *
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 font-medium"
                      placeholder="Enter author name"
                    />
                  </div>

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
                        required
                        className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 font-medium"
                        placeholder="Enter price"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 font-medium"
                      placeholder="Brief description of the book"
                    />
                  </div>

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
                          required
                          className="hidden"
                        />
                      </label>
                      {formData.pdfFile && (
                        <p className="text-sm text-green-600 font-medium mt-2">
                          ✓ {formData.pdfFile.name}
                        </p>
                      )}
                      <p className="text-xs text-slate-500 mt-2">
                        PDF files only, max 50MB
                      </p>
                    </div>
                  </div>
                    {/**/}
                    <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">
                          PDF Cover Image*
                        </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                      <FileText
                        size={48}
                        className="mx-auto text-slate-400 mb-2"
                      />
                      <label className="cursor-pointer text-blue-600 hover:text-blue-700 font-semibold">
                        Click to upload image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                      
                          className="hidden"
                        />
                      </label>
                       {formData.coverImage && (
  <div className="mt-2">
    <p className="text-sm text-green-600 font-medium">✓ {formData.coverImage.name}</p>
    <img
      src={URL.createObjectURL(formData.coverImage)}
      alt="Cover Preview"
      className="w-32 h-32 object-cover rounded-md border mt-1"
    />
  </div>
)}
   

    <p className="text-xs text-slate-500 mt-2">
      Image only (jpg, png, jpeg), max 5MB
    </p>
                    </div>

                    {/*  */}
                  </div>
                   
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    disabled={uploading}
                    className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-semibold disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      "Upload Book"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Coupon List Modal */}
        {showCouponList && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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
                            {coupon.description && (
                              <p className="text-slate-600 mb-2">
                                {coupon.description}
                              </p>
                            )}
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
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 flex justify-between items-center rounded-t-2xl sticky top-0">
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

              <form onSubmit={handleCouponSubmit} className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Coupon Code *
                    </label>
                    <input
                      type="text"
                      name="code"
                      value={couponFormData.code}
                      onChange={handleCouponInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-800 font-bold uppercase"
                      placeholder="e.g., SAVE20"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Use uppercase letters and numbers only
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Discount Type *
                    </label>
                    <select
                      name="type"
                      value={couponFormData.type}
                      onChange={handleCouponInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-800 font-semibold"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (₹)</option>
                    </select>
                  </div>

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
                        required
                        className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-800 font-medium"
                        placeholder={
                          couponFormData.type === "percentage"
                            ? "Enter percentage (e.g., 10)"
                            : "Enter amount (e.g., 50)"
                        }
                      />
                    </div>
                  </div>

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

                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Minimum Purchase Amount (₹)
                    </label>
                    <div className="relative">
                      <DollarSign
                        size={20}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="number"
                        name="minPurchase"
                        value={couponFormData.minPurchase}
                        onChange={handleCouponInputChange}
                        min="0"
                        step="0.01"
                        className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-800 font-medium"
                        placeholder="Optional minimum purchase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Maximum Discount (₹)
                    </label>
                    <div className="relative">
                      <DollarSign
                        size={20}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="number"
                        name="maxDiscount"
                        value={couponFormData.maxDiscount}
                        onChange={handleCouponInputChange}
                        min="0"
                        step="0.01"
                        className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-800 font-medium"
                        placeholder="Optional max discount cap"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      name="expiryDate"
                      value={couponFormData.expiryDate}
                      onChange={handleCouponInputChange}
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-800 font-medium"
                    />
                  </div>
                </div>

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
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg font-semibold"
                  >
                    {editingCoupon ? "Update Coupon" : "Create Coupon"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}