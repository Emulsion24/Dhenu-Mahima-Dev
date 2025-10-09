"use client";
import { useState } from "react";
import { Upload, X, Trash2, ChevronUp, ChevronDown, Image as ImageIcon, Eye, EyeOff, GripVertical } from "lucide-react";

export default function BannerManagement() {
  const [banners, setBanners] = useState([
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200",
      title: "Welcome Banner",
      active: true,
      order: 1
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1200",
      title: "Devotional Music",
      active: true,
      order: 2
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200",
      title: "Special Offer",
      active: false,
      order: 3
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [newBanner, setNewBanner] = useState({
    title: "",
    image: null
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBanner({ ...newBanner, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBanner = () => {
    if (!newBanner.title || !newBanner.image) {
      alert("Please fill in all fields and upload an image");
      return;
    }

    const maxOrder = banners.length > 0 ? Math.max(...banners.map(b => b.order)) : 0;
    
    const banner = {
      id: Date.now(),
      image: newBanner.image,
      title: newBanner.title,
      active: true,
      order: maxOrder + 1
    };

    setBanners([...banners, banner]);
    setNewBanner({ title: "", image: null });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      const updatedBanners = banners.filter(b => b.id !== id);
      updatedBanners.forEach((banner, index) => {
        banner.order = index + 1;
      });
      setBanners(updatedBanners);
    }
  };

  const toggleActive = (id) => {
    setBanners(banners.map(b => 
      b.id === id ? { ...b, active: !b.active } : b
    ));
  };

  const moveUp = (id) => {
    const index = banners.findIndex(b => b.id === id);
    if (index > 0) {
      const newBanners = [...banners];
      [newBanners[index - 1], newBanners[index]] = [newBanners[index], newBanners[index - 1]];
      
      newBanners.forEach((banner, idx) => {
        banner.order = idx + 1;
      });
      
      setBanners(newBanners);
    }
  };

  const moveDown = (id) => {
    const index = banners.findIndex(b => b.id === id);
    if (index < banners.length - 1) {
      const newBanners = [...banners];
      [newBanners[index], newBanners[index + 1]] = [newBanners[index + 1], newBanners[index]];
      
      newBanners.forEach((banner, idx) => {
        banner.order = idx + 1;
      });
      
      setBanners(newBanners);
    }
  };

  const sortedBanners = [...banners].sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-3 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="p-1.5 sm:p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg sm:rounded-xl shadow-lg">
              <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Banner Management
            </h1>
          </div>
          <p className="text-neutral-600 text-sm sm:text-base ml-9 sm:ml-14">Upload and manage your website banners</p>
        </div>

        {/* Stats & Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-indigo-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-500 text-sm font-medium mb-1">Total Banners</p>
                <p className="text-2xl font-bold text-neutral-900">{banners.length}</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-xl">
                <ImageIcon className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-indigo-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-500 text-sm font-medium mb-1">Active Banners</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {banners.filter(b => b.active).length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-indigo-100 p-5 shadow-sm flex items-center justify-center">
            <button
              onClick={() => setShowModal(true)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-md font-medium"
            >
              <Upload className="w-5 h-5" />
              Upload New Banner
            </button>
          </div>
        </div>

        {/* Banner List */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-indigo-100 p-4 sm:p-6 shadow-sm">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">All Banners</h2>
          
          {sortedBanners.length > 0 ? (
            <div className="space-y-4">
              {sortedBanners.map((banner, index) => (
                <div
                  key={banner.id}
                  className={`group relative bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl border-2 ${
                    banner.active ? 'border-indigo-200' : 'border-neutral-200'
                  } overflow-hidden hover:shadow-lg transition-all duration-300`}
                >
                  <div className="flex flex-col md:flex-row gap-4 p-4">
                    {/* Order Badge */}
                    <div className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-indigo-600 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
                      <GripVertical className="w-3 h-3" />
                      #{banner.order}
                    </div>

                    {/* Banner Image */}
                    <div className="relative w-full md:w-64 h-32 sm:h-40 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-200">
                      <img
                        src={banner.image}
                        alt={banner.title}
                        className="w-full h-full object-cover"
                      />
                      {!banner.active && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm bg-red-500 px-3 py-1 rounded-full">
                            Inactive
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Banner Info & Actions */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="mb-3">
                        <h3 className="text-lg font-bold text-neutral-900 mb-1 truncate">
                          {banner.title}
                        </h3>
                        <p className="text-sm text-neutral-500">
                          Status: <span className={`font-semibold ${banner.active ? 'text-green-600' : 'text-red-600'}`}>
                            {banner.active ? 'Active' : 'Inactive'}
                          </span>
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        {/* Order Controls */}
                        <div className="flex gap-1 border border-neutral-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => moveUp(banner.id)}
                            disabled={index === 0}
                            className={`px-3 py-2 transition-colors ${
                              index === 0
                                ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                                : 'bg-white hover:bg-indigo-50 text-indigo-600'
                            }`}
                            title="Move Up"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => moveDown(banner.id)}
                            disabled={index === sortedBanners.length - 1}
                            className={`px-3 py-2 transition-colors ${
                              index === sortedBanners.length - 1
                                ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                                : 'bg-white hover:bg-indigo-50 text-indigo-600'
                            }`}
                            title="Move Down"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Toggle Active */}
                        <button
                          onClick={() => toggleActive(banner.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                            banner.active
                              ? 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                              : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                          }`}
                        >
                          {banner.active ? (
                            <>
                              <Eye className="w-4 h-4" />
                              <span className="hidden sm:inline">Active</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-4 h-4" />
                              <span className="hidden sm:inline">Inactive</span>
                            </>
                          )}
                        </button>

                        {/* Preview */}
                        <button
                          onClick={() => setPreviewImage(banner.image)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm border border-blue-200"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="hidden sm:inline">Preview</span>
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(banner.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors font-medium text-sm border border-rose-200"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-400 font-medium">No banners uploaded yet</p>
              <p className="text-neutral-400 text-sm mt-1">Click the button above to upload your first banner</p>
            </div>
          )}
        </div>

        {/* Upload Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-3 sm:p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-2xl shadow-2xl relative">
              <button
                onClick={() => {
                  setShowModal(false);
                  setNewBanner({ title: "", image: null });
                }}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent pr-8">
                Upload New Banner
              </h2>

              {/* Banner Title */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Banner Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter banner title"
                  value={newBanner.title}
                  onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
                  className="w-full px-4 py-3 bg-indigo-50 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-neutral-900"
                />
              </div>

              {/* Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Banner Image <span className="text-red-500">*</span>
                </label>
                
                {newBanner.image ? (
                  <div className="relative">
                    <img
                      src={newBanner.image}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-xl border-2 border-indigo-200"
                    />
                    <button
                      onClick={() => setNewBanner({ ...newBanner, image: null })}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="banner-upload"
                    />
                    <label
                      htmlFor="banner-upload"
                      className="flex flex-col items-center justify-center w-full h-64 bg-indigo-50 border-2 border-dashed border-indigo-300 rounded-xl cursor-pointer hover:bg-indigo-100 transition-colors"
                    >
                      <Upload className="w-12 h-12 text-indigo-400 mb-3" />
                      <span className="text-indigo-600 font-medium mb-1">Click to upload banner</span>
                      <span className="text-neutral-500 text-sm">PNG, JPG or WEBP (Recommended: 1920x600px)</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setNewBanner({ title: "", image: null });
                  }}
                  className="flex-1 px-6 py-3 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddBanner}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md font-medium"
                >
                  Upload Banner
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {previewImage && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={() => setPreviewImage(null)}
          >
            <div className="relative max-w-6xl w-full">
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute -top-12 right-0 p-2 bg-white text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-auto rounded-xl shadow-2xl"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}