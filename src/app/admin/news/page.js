"use client";
import { useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, X, Image as ImageIcon, Calendar, MoreVertical } from "lucide-react";

export default function NewsPage() {
  const [news, setNews] = useState([
    {
      id: 1,
      title: "Breaking: New Technology Announced",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800",
      date: "2024-01-15",
      author: "John Doe"
    },
    {
      id: 2,
      title: "Market Updates for Today",
      content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
      date: "2024-01-14",
      author: "Jane Smith"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    date: new Date().toISOString().split('T')[0],
    author: ""
  });
  const [imagePreview, setImagePreview] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Open modal for adding news
  const openAddModal = () => {
    setEditingNews(null);
    setFormData({
      title: "",
      content: "",
      image: "",
      date: new Date().toISOString().split('T')[0],
      author: ""
    });
    setImagePreview("");
    setIsModalOpen(true);
  };

  // Open modal for editing news
  const openEditModal = (newsItem) => {
    setEditingNews(newsItem);
    setFormData(newsItem);
    setImagePreview(newsItem.image);
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNews(null);
    setFormData({
      title: "",
      content: "",
      image: "",
      date: new Date().toISOString().split('T')[0],
      author: ""
    });
    setImagePreview("");
  };

  // Add or update news
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingNews) {
      // Update existing news
      setNews(news.map(item => 
        item.id === editingNews.id ? { ...formData, id: item.id } : item
      ));
    } else {
      // Add new news
      const newNews = {
        ...formData,
        id: Date.now()
      };
      setNews([newNews, ...news]);
    }
    
    closeModal();
  };

  // Delete news
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this news article?")) {
      setNews(news.filter(item => item.id !== id));
      setActiveDropdown(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Daily News Management
              </h1>
              <p className="text-gray-600">
                Manage your daily news articles with ease
              </p>
            </div>
            <button
              onClick={openAddModal}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Plus size={20} />
              Add News
            </button>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                {item.image ? (
                 <div className="relative w-full h-full overflow-hidden">
  <Image
    src={item.image}
    alt={item.title}
    fill
    className="object-cover group-hover:scale-105 transition-transform duration-500"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
</div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon size={48} className="text-gray-400" />
                  </div>
                )}
                
                {/* Dropdown Menu */}
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.id ? null : item.id)}
                    className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                  >
                    <MoreVertical size={20} className="text-gray-700" />
                  </button>
                  
                  {activeDropdown === item.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-10 border border-gray-200">
                      <button
                        onClick={() => openEditModal(item)}
                        className="w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors flex items-center gap-2 text-gray-700"
                      >
                        <Edit2 size={16} className="text-blue-600" />
                        Edit News
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="w-full px-4 py-2 text-left hover:bg-red-50 transition-colors flex items-center gap-2 text-gray-700"
                      >
                        <Trash2 size={16} className="text-red-600" />
                        Delete News
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar size={16} />
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                  <span className="ml-auto text-blue-600 font-medium">{item.author}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {item.content}
                </p>

                {/* Action Buttons - Always Visible */}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => openEditModal(item)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {news.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <ImageIcon size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No News Yet</h3>
            <p className="text-gray-500 mb-6">Start by adding your first news article</p>
            <button
              onClick={openAddModal}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Add Your First News
            </button>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl z-10">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingNews ? "Edit News Article" : "Add New News Article"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    News Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                    {imagePreview ? (
                      <div className="relative">
                       <div className="relative max-h-64 mx-auto rounded-lg w-full h-64 overflow-hidden">
  <Image
    src={imagePreview}
    alt="Preview"
    fill
    className="object-contain rounded-lg"
    sizes="100vw"
    unoptimized
  />
</div>
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview("");
                            setFormData(prev => ({ ...prev, image: "" }));
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <ImageIcon size={48} className="mx-auto text-gray-400 mb-2" />
                        <label className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium">
                          Click to upload image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                        <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter news title"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Write your news content here..."
                  />
                </div>

                {/* Author and Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Author *
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Author name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg"
                  >
                    {editingNews ? "Update News" : "Add News"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </div>
  );
}