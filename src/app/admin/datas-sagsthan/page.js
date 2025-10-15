"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Image as ImageIcon,
  Phone,
  Mail,
  MapPin,
  Building2,
  Clock,
  Globe,
} from "lucide-react";
import API from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function ContactUsPage() {
  const [sansthans, setSansthans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSansthan, setEditingSansthan] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    person: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    altPhone: "",
    email: "",
    website: "",
    timing: "",
    description: "",
  });

  // Fetch all sansthans
  useEffect(() => {
    fetchSansthans();
  }, []);

  const fetchSansthans = async () => {
    try {
      setLoading(true);
      const response = await API.get('/sansthans');
      const data = response.data
      
      if (data.success) {
        setSansthans(data.data);
      } else {
        alert('Failed to fetch sansthans');
      }
    } catch (error) {
      console.error('Error fetching sansthans:', error);
      alert('Error fetching sansthans. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size should not exceed 10MB');
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Open Add Modal
  const openAddModal = () => {
    setEditingSansthan(null);
    setFormData({
      name: "",
      person: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
      altPhone: "",
      email: "",
      website: "",
      timing: "",
      description: "",
    });
    setImagePreview("");
    setImageFile(null);
    setShowModal(true);
  };

  // Open Edit Modal
  const openEditModal = (sansthan) => {
    setEditingSansthan(sansthan);
    
    // Parse description to extract address if it exists
    const descParts = sansthan.description?.split('\n\nAddress: ') || ['', ''];
    const addressParts = descParts[1]?.split(', ') || [];
    const statePin = addressParts[2]?.split(' - ') || [];
    
    setFormData({
      name: sansthan.name || "",
      person: sansthan.person || "",
      address: addressParts[0] || "",
      city: addressParts[1] || "",
      state: statePin[0] || "",
      pincode: statePin[1] || "",
      phone: sansthan.phone || "",
      altPhone: sansthan.altPhone || "",
      email: sansthan.email || "",
      website: sansthan.website || "",
      timing: sansthan.timing || "",
      description: descParts[0] || "",
    });
    setImagePreview(sansthan.image || "");
    setImageFile(null);
    setShowModal(true);
  };

  // Close Modal
  const closeModal = () => {
    setShowModal(false);
    setEditingSansthan(null);
    setImagePreview("");
    setImageFile(null);
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      
      // Append all fields
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append image if new file is selected
      if (imageFile) {
        formDataToSend.append('photo', imageFile);
      }

      const url = editingSansthan 
        ? `/sansthans/${editingSansthan.id}`
        : `/sansthans`;
      
      const  response =editingSansthan ? await API.put(url,formDataToSend):  await API.post(url,formDataToSend);

     

      const data = response.data

      if (data.success) {
        alert(data.message);
        fetchSansthans();
        closeModal();
      } else {
        alert(data.message || 'Operation failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sansthan?")) {
      return;
    }

    try {
      const response = await API.delete(`/sansthans/${id}`);
  

      const data = response.data

      if (data.success) {
        alert(data.message);
        fetchSansthans();
      } else {
        alert(data.message || 'Delete failed');
      }
    } catch (error) {
      console.error('Error deleting sansthan:', error);
      alert('Error deleting sansthan. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading sansthans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-indigo-200 p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Contact Us - Sansthan Details
              </h1>
              <p className="text-slate-600 font-medium">
                Manage all Sansthan locations and contact information
              </p>
            </div>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg font-semibold"
            >
              <Plus size={20} />
              Add Sansthan
            </button>
          </div>
        </div>

        {/* Sansthans List */}
        <div className="space-y-6">
          {sansthans.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <Building2 size={64} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">
                No Sansthans yet
              </h3>
              <p className="text-slate-500 mb-6">
                Add your first Sansthan details
              </p>
              <button
                onClick={openAddModal}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
              >
                Add Sansthan
              </button>
            </div>
          ) : (
            sansthans.map((sansthan) => {
              // Parse description for display
              const descParts = sansthan.description?.split('\n\nAddress: ') || [''];
              const mainDesc = descParts[0];
              const fullAddress = descParts[1] || '';
              
              return (
                <div
                  key={sansthan.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-indigo-100 hover:border-indigo-300 overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                    {/* Photo Section */}
                    <div className="relative h-64 lg:h-auto bg-gradient-to-br from-indigo-400 to-purple-500">
                      {sansthan.image ? (
                        <img
                          src={sansthan.image}
                          alt={sansthan.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Building2 size={80} className="text-white/50" />
                        </div>
                      )}
                      {/* Action Buttons */}
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button
                          onClick={() => openEditModal(sansthan)}
                          className="p-2 bg-white rounded-full shadow-lg hover:bg-blue-50 transition-colors"
                        >
                          <Edit size={18} className="text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(sansthan.id)}
                          className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="lg:col-span-2 p-6">
                      <h2 className="text-2xl font-bold text-slate-800 mb-4">
                        {sansthan.name}
                      </h2>

                      {mainDesc && (
                        <p className="text-slate-600 mb-6">{mainDesc}</p>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Address */}
                        {fullAddress && (
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-red-100 text-red-600 rounded-lg mt-0.5">
                                <MapPin size={18} />
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-semibold text-slate-500 mb-1">
                                  Address
                                </p>
                                <p className="text-sm font-medium text-slate-800">
                                  {fullAddress}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Timings */}
                        {sansthan.timing && (
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg mt-0.5">
                              <Clock size={18} />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-semibold text-slate-500 mb-1">
                                Timings
                              </p>
                              <p className="text-sm font-medium text-slate-800">
                                {sansthan.timing}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Phone */}
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-green-100 text-green-600 rounded-lg mt-0.5">
                            <Phone size={18} />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-slate-500 mb-1">
                              Phone
                            </p>
                            <p className="text-sm font-medium text-slate-800">
                              {sansthan.phone}
                            </p>
                            {sansthan.altPhone && (
                              <p className="text-sm font-medium text-slate-600">
                                {sansthan.altPhone}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg mt-0.5">
                            <Mail size={18} />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-slate-500 mb-1">
                              Email
                            </p>
                            <p className="text-sm font-medium text-slate-800 break-all">
                              {sansthan.email}
                            </p>
                          </div>
                        </div>

                        {/* Website */}
                        {sansthan.website && (
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg mt-0.5">
                              <Globe size={18} />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-semibold text-slate-500 mb-1">
                                Website
                              </p>
                              <a
                                href={sansthan.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-700 underline break-all"
                              >
                                {sansthan.website}
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex justify-between items-center rounded-t-2xl z-10">
                <h2 className="text-2xl font-bold">
                  {editingSansthan ? "Edit Sansthan Details" : "Add New Sansthan"}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <form
                onSubmit={handleSubmit}
                className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto"
              >
                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Sansthan Photo
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-indigo-500 transition-colors">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-h-64 mx-auto rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview("");
                            setImageFile(null);
                          }}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <ImageIcon
                          size={48}
                          className="mx-auto text-slate-400 mb-2"
                        />
                        <label className="cursor-pointer text-indigo-600 hover:text-indigo-700 font-semibold">
                          Click to upload photo
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                        <p className="text-sm text-slate-500 mt-1">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sansthan Name */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Sansthan Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 font-medium"
                    placeholder="Enter sansthan name"
                  />
                </div>

                {/* Person Name */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    name="person"
                    value={formData.person}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 font-medium"
                    placeholder="Enter contact person name"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 font-medium resize-none"
                    placeholder="Brief description about the sansthan"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 font-medium"
                    placeholder="Street address"
                  />
                </div>

                {/* City, State, Pincode */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 font-medium"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 font-medium"
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{6}"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 font-medium"
                      placeholder="123456"
                    />
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 font-medium"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Alternate Phone
                    </label>
                    <input
                      type="tel"
                      name="altPhone"
                      value={formData.altPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 font-medium"
                      placeholder="+91 98765 43211"
                    />
                  </div>
                </div>

                {/* Email & Website */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 font-medium"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 font-medium"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>

                {/* Timings */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Timings
                  </label>
                  <input
                    type="text"
                    name="timing"
                    value={formData.timing}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 font-medium"
                    placeholder="e.g., 5:00 AM - 9:00 PM"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={submitting}
                    className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-semibold disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg font-semibold disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : editingSansthan ? "Update Sansthan" : "Add Sansthan"}
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