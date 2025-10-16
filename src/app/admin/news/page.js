'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Filter, X, Save, ImageIcon, Calendar, Clock, Tag } from 'lucide-react';

import API from '@/lib/api';
import { useAuthStore } from '@/store/authStore';







export default function AdminNewsPage() {
 const {user} = useAuthStore();
  const [newsList, setNewsList] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });


  const categories = [
    'गौ संरक्षण',
    'धार्मिक कार्यक्रम',
    'कृषि',
    'व्यवसाय',
    'शिक्षा',
    'स्वास्थ्य'
  ];

  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    excerpt: '',
    category: categories[0],
    image: '/images/1.png',
    date: new Date().toLocaleDateString('hi-IN'),
    readTime: '5 मिनट',
    featured: false,
    content: [
      { type: 'paragraph', text: '' }
    ],
    tags: []
  });

  // Fetch all news from backend
  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page: pagination.page,
        limit: pagination.limit,
      };
      
      if (filterCategory !== 'all') {
        params.category = filterCategory;
      }
      
      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await API.get('/news', { params });
      
      if (response.data.success) {
        setNewsList(response.data.data);
        setFilteredNews(response.data.data);
        setPagination(response.data.pagination);
   
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch news');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchNews();
  }, [pagination.page, filterCategory, searchTerm]);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({ ...formData, imageFile: file, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const openAddModal = () => {
    setEditingNews(null);
    setFormData({
      title: '',
      titleEn: '',
      excerpt: '',
      category: categories[0],
      image: '/images/1.png',
      date: new Date().toLocaleDateString('hi-IN'),
      readTime: '5 मिनट',
      featured: false,
      content: [{ type: 'paragraph', text: '' }],
      tags: [],
      
    });
    setPreviewImage(null);
    setShowModal(true);
  };

  const openEditModal = (news) => {
    setEditingNews(news);
    setFormData({
      title: news.title,
      titleEn: news.titleEn,
      excerpt: news.excerpt,
      category: news.category,
      image: news.image,
      date: news.date,
      readTime: news.readTime,
      featured: news.featured,
      content: news.content || [{ type: 'paragraph', text: '' }],
      tags: news.tags || [],
     
    });
    setPreviewImage(news.image);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.titleEn || !formData.excerpt) {
      alert('कृपया सभी आवश्यक फ़ील्ड भरें');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Prepare form data for multipart/form-data if image file exists
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('titleEn', formData.titleEn);
      submitData.append('excerpt', formData.excerpt);
      
      submitData.append('category', formData.category);
      submitData.append('date', formData.date);
      submitData.append('readTime', formData.readTime);
      submitData.append('featured', formData.featured);
      submitData.append('content', JSON.stringify(formData.content));
      submitData.append('tags', JSON.stringify(formData.tags));
 
      
      // Add image file if available
      if (formData.imageFile) {
        submitData.append('image', formData.imageFile);
      }
      console.log(user.name);
      if(user.name){
        
        submitData.append('author',user.name);
      }

      let response;
     
      if (editingNews) {
        // Update existing news
        response = await API.put(`/news/${editingNews.id}`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        // Create new news
        response = await API.post('/news/', submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      if (response.data.success) {
        alert(editingNews ? 'समाचार सफलतापूर्वक अपडेट हुआ' : 'समाचार सफलतापूर्वक जोड़ा गया');
        setShowModal(false);
        setEditingNews(null);
        fetchNews(); // Refresh the list
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save news');
      alert('त्रुटि: ' + (err.response?.data?.message || 'समाचार सहेजने में विफल'));
      console.error('Error saving news:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('क्या आप वाकई इस समाचार को हटाना चाहते हैं?')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await API.delete(`/news/${id}`);
      
      if (response.data.success) {
        alert('समाचार सफलतापूर्वक हटाया गया');
        fetchNews(); // Refresh the list
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete news');
      alert('त्रुटि: ' + (err.response?.data?.message || 'समाचार हटाने में विफल'));
      console.error('Error deleting news:', err);
    } finally {
      setLoading(false);
    }
  };

  const addContentBlock = (type) => {
    const newBlock = type === 'list' 
      ? { type: 'list', items: [''] }
      : { type, text: '' };
    
    setFormData({
      ...formData,
      content: [...formData.content, newBlock]
    });
  };

  const updateContentBlock = (index, field, value) => {
    const updatedContent = [...formData.content];
    if (field === 'items') {
      updatedContent[index].items = value;
    } else {
      updatedContent[index][field] = value;
    }
    setFormData({ ...formData, content: updatedContent });
  };

  const removeContentBlock = (index) => {
    setFormData({
      ...formData,
      content: formData.content.filter((_, i) => i !== index)
    });
  };

  const addTag = (tag) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
  };

  const removeTag = (tag) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
            <strong>Error:</strong> {error}
            <button onClick={() => setError(null)} className="float-right">
              <X size={20} />
            </button>
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">समाचार प्रबंधन</h1>
              <p className="text-gray-600">News Management Dashboard</p>
            </div>
            <button
              onClick={openAddModal}
              disabled={loading}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
            >
              <Plus size={20} />
              नया समाचार जोड़ें
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="समाचार खोजें..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none appearance-none"
              >
                <option value="all">सभी श्रेणियाँ</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        )}

        {/* News List */}
        {!loading && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">छवि</th>
                    <th className="px-6 py-4 text-left">शीर्षक</th>
                    <th className="px-6 py-4 text-left">श्रेणी</th>
                    <th className="px-6 py-4 text-left">तिथि</th>
                    <th className="px-6 py-4 text-left">दृश्य</th>
                    <th className="px-6 py-4 text-left">विशेष</th>
                    <th className="px-6 py-4 text-center">कार्रवाई</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredNews.map((news) => (
                    <tr key={news.id} className="hover:bg-orange-50 transition-colors">
                      <td className="px-6 py-4">
                        <img src={news.image} alt={news.title} className="w-16 h-16 object-cover rounded-lg" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{news.title}</div>
                        <div className="text-sm text-gray-600">{news.titleEn}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {news.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{news.date}</td>
                      <td className="px-6 py-4 text-gray-600">{news.views || 0}</td>
                      <td className="px-6 py-4">
                        {news.featured && (
                          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => window.open(`/news/${news.slug}`, '_blank')}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="देखें"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => openEditModal(news)}
                            className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                            title="संपादित करें"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(news.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="हटाएं"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredNews.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">कोई समाचार नहीं मिला</p>
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 p-6 border-t">
                <button
                  onClick={() => setPagination({...pagination, page: pagination.page - 1})}
                  disabled={pagination.page === 1}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-gray-600">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPagination({...pagination, page: pagination.page + 1})}
                  disabled={pagination.page === pagination.totalPages}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-6 flex items-center justify-between rounded-t-2xl">
                <h2 className="text-2xl font-bold">
                  {editingNews ? 'समाचार संपादित करें' : 'नया समाचार जोड़ें'}
                </h2>
                <button onClick={() => setShowModal(false)} className="hover:bg-white/20 p-2 rounded-lg transition-colors">
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">छवि अपलोड करें</label>
                  <div className="flex items-center gap-4">
                    <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden hover:border-orange-500 transition-colors">
                      {previewImage ? (
                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <ImageIcon className="text-gray-400" size={32} />
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-2">या URL दर्ज करें:</p>
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => {
                          setFormData({ ...formData, image: e.target.value });
                          setPreviewImage(e.target.value);
                        }}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                        placeholder="/images/1.png"
                      />
                    </div>
                  </div>
                </div>

                {/* Title Hindi */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">शीर्षक (हिंदी) *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                    placeholder="समाचार का शीर्षक हिंदी में..."
                  />
                </div>

                {/* Title English */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title (English) *</label>
                  <input
                    type="text"
                    value={formData.titleEn}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                    placeholder="News title in English..."
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">सारांश *</label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                    placeholder="समाचार का संक्षिप्त सारांश..."
                  />
                </div>

                {/* Category, Date, Read Time */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">श्रेणी</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">तिथि</label>
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                      placeholder="15 अक्टूबर 2024"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">पढ़ने का समय</label>
                    <input
                      type="text"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                      placeholder="5 मिनट"
                    />
                  </div>
                </div>

                {/* Featured */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <label htmlFor="featured" className="text-sm font-semibold text-gray-700">
                    इस समाचार को विशेष (Featured) के रूप में चिह्नित करें
                  </label>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">टैग</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag, i) => (
                      <span key={i} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:bg-orange-200 rounded-full p-0.5">
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag(e.target.value);
                        e.target.value = '';
                      }
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                    placeholder="टैग जोड़ने के लिए Enter दबाएं..."
                  />
                </div>

                {/* Content Blocks */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-semibold text-gray-700">समाचार सामग्री</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addContentBlock('paragraph')}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-200"
                      >
                        + पैराग्राफ
                      </button>
                      <button
                        onClick={() => addContentBlock('heading')}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold hover:bg-green-200"
                      >
                        + शीर्षक
                      </button>
                      <button
                        onClick={() => addContentBlock('list')}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold hover:bg-purple-200"
                      >
                        + सूची
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {formData.content.map((block, index) => (
                      <div key={index} className="border-2 border-gray-200 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-600">
                            {block.type === 'paragraph' ? 'पैराग्राफ' : block.type === 'heading' ? 'शीर्षक' : 'सूची'}
                          </span>
                          <button
                            onClick={() => removeContentBlock(index)}
                            className="text-red-600 hover:bg-red-50 p-1 rounded"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        {block.type === 'list' ? (
                          <div className="space-y-2">
                            {block.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex gap-2">
                                <input
                                  type="text"
                                  value={item}
                                  onChange={(e) => {
                                    const newItems = [...block.items];
                                    newItems[itemIndex] = e.target.value;
                                    updateContentBlock(index, 'items', newItems);
                                  }}
                                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                                  placeholder="सूची आइटम..."
                                />
                                <button
                                  onClick={() => {
                                    const newItems = block.items.filter((_, i) => i !== itemIndex);
                                    updateContentBlock(index, 'items', newItems);
                                  }}
                                  className="text-red-600 hover:bg-red-50 px-2 rounded"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => updateContentBlock(index, 'items', [...block.items, ''])}
                              className="text-sm text-blue-600 hover:text-blue-700"
                            >
                              + आइटम जोड़ें
                            </button>
                          </div>
                        ) : (
                          <textarea
                            value={block.text}
                            onChange={(e) => updateContentBlock(index, 'text', e.target.value)}
                            rows={block.type === 'heading' ? 1 : 3}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                            placeholder={block.type === 'heading' ? 'शीर्षक...' : 'पैराग्राफ टेक्स्ट...'}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-gray-50 p-6 flex gap-3 rounded-b-2xl border-t">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                >
                  रद्द करें
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Save size={20} />
                  {loading ? 'सहेजा जा रहा है...' : 'सहेजें'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}