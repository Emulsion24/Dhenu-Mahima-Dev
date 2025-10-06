"use client";

import { useState } from "react";
import {
  Upload,
  Search,
  Trash2,
  Download,
  Eye,
  X,
  FileText,
  Calendar,
  User,
  BookOpen,
  Filter,
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
    },
    {
      id: 2,
      name: "Ramayana",
      author: "Valmiki",
      file: "/books/ramayana.pdf",
      uploadDate: "2024-01-10",
      size: "3.8 MB",
    },
    {
      id: 3,
      name: "Vedic Mathematics",
      author: "Bharati Krishna Tirthaji",
      file: "/books/vedic-math.pdf",
      uploadDate: "2024-01-05",
      size: "1.2 MB",
    },
    {
      id: 4,
      name: "Mahabharata",
      author: "Sage Vyasa",
      file: "/books/mahabharata.pdf",
      uploadDate: "2023-12-20",
      size: "5.6 MB",
    },
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // newest, oldest, name
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    file: null,
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

    if (!formData.name || !formData.author || !formData.file) {
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
    };

    setBooks([newBook, ...books]);
    setFormData({ name: "", author: "", file: null });
    setShowUploadModal(false);
    alert("Book uploaded successfully!");
  };

  // Handle Delete
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-2">
            PDF Books Library
          </h1>
          <p className="text-slate-600 font-medium">
            Upload and manage your PDF book collection
          </p>
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
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <Calendar size={12} />
                    <span>{book.uploadDate}</span>
                    <span className="ml-auto font-semibold">{book.size}</span>
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

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex justify-between items-center rounded-t-2xl">
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
              <form onSubmit={handleUpload} className="p-6 space-y-6">
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
                    required
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
                    required
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 font-medium"
                    placeholder="Enter author name"
                  />
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
                        required
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

                {/* Submit Buttons */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg font-semibold"
                  >
                    Upload Book
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