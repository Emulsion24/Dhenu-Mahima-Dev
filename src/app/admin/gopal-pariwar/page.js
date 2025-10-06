"use client";

import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Image as ImageIcon,
  User,
  FileText,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Globe,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Image from "next/image";

export default function GopalPariwarPage() {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Maharaj Shri Krishna Das",
      designation: "Senior Guru",
      description: "Dedicated to spreading the message of Bhakti and devotion for over 30 years.",
      photo: "",
      phone: "+91 98765 43210",
      email: "krishna@gopalpariwar.org",
      location: "Vrindavan, UP",
      socialLinks: {
        facebook: "https://facebook.com/maharaj1",
        instagram: "https://instagram.com/maharaj1",
        twitter: "https://twitter.com/maharaj1",
        youtube: "https://youtube.com/maharaj1",
        website: "https://maharaj1.com",
      },
    },
    {
      id: 2,
      name: "Maharaj Radha Vallabh",
      designation: "Bhajan Maestro",
      description: "Renowned for soulful bhajans and kirtans that touch hearts worldwide.",
      photo: "",
      phone: "+91 98765 43211",
      email: "radha@gopalpariwar.org",
      location: "Mathura, UP",
      socialLinks: {
        facebook: "https://facebook.com/maharaj2",
        instagram: "https://instagram.com/maharaj2",
        twitter: "",
        youtube: "https://youtube.com/maharaj2",
        website: "",
      },
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    description: "",
    photo: "",
    phone: "",
    email: "",
    location: "",
    socialLinks: {
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
      website: "",
    },
  });

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Social Links Change
  const handleSocialLinkChange = (platform, value) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({
          ...prev,
          photo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Open Add Modal
  const openAddModal = () => {
    setEditingMember(null);
    setFormData({
      name: "",
      designation: "",
      description: "",
      photo: "",
      phone: "",
      email: "",
      location: "",
      socialLinks: {
        facebook: "",
        instagram: "",
        twitter: "",
        youtube: "",
        website: "",
      },
    });
    setImagePreview("");
    setShowModal(true);
  };

  // Open Edit Modal
  const openEditModal = (member) => {
    setEditingMember(member);
    setFormData(member);
    setImagePreview(member.photo);
    setShowModal(true);
  };

  // Close Modal
  const closeModal = () => {
    setShowModal(false);
    setEditingMember(null);
    setImagePreview("");
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingMember) {
      // Update existing member
      setMembers(
        members.map((member) =>
          member.id === editingMember.id
            ? { ...formData, id: member.id }
            : member
        )
      );
      alert("Member updated successfully!");
    } else {
      // Add new member
      const newMember = {
        ...formData,
        id: Date.now(),
      };
      setMembers([newMember, ...members]);
      alert("Member added successfully!");
    }

    closeModal();
  };

  // Handle Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      setMembers(members.filter((member) => member.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-orange-200 p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
                Gopal Pariwar Management
              </h1>
              <p className="text-slate-600 font-medium">
                Manage Maharaj profiles and their details
              </p>
            </div>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl hover:from-orange-700 hover:to-amber-700 transition-all shadow-lg font-semibold"
            >
              <Plus size={20} />
              Add Maharaj
            </button>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-white rounded-2xl shadow-lg">
              <User size={64} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">
                No members yet
              </h3>
              <p className="text-slate-500 mb-6">
                Add your first Gopal Pariwar member
              </p>
              <button
                onClick={openAddModal}
                className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-semibold"
              >
                Add Member
              </button>
            </div>
          ) : (
            members.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-orange-100 hover:border-orange-300"
              >
                {/* Photo Section */}
                <div className="relative h-64 bg-gradient-to-br from-orange-400 to-amber-500">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={80} className="text-white/50" />
                    </div>
                  )}
                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={() => openEditModal(member)}
                      className="p-2 bg-white rounded-full shadow-lg hover:bg-blue-50 transition-colors"
                    >
                      <Edit size={18} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-orange-600 mb-3">
                    {member.designation}
                  </p>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                    {member.description}
                  </p>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4">
                    {member.phone && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone size={14} className="text-green-600" />
                        <span>{member.phone}</span>
                      </div>
                    )}
                    {member.email && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail size={14} className="text-blue-600" />
                        <span className="truncate">{member.email}</span>
                      </div>
                    )}
                    {member.location && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin size={14} className="text-red-600" />
                        <span>{member.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-2 pt-4 border-t border-slate-200">
                    {member.socialLinks.facebook && (
                      <a
                        href={member.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <Facebook size={16} />
                      </a>
                    )}
                    {member.socialLinks.instagram && (
                      <a
                        href={member.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition-colors"
                      >
                        <Instagram size={16} />
                      </a>
                    )}
                    {member.socialLinks.twitter && (
                      <a
                        href={member.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-sky-100 text-sky-600 rounded-lg hover:bg-sky-200 transition-colors"
                      >
                        <Twitter size={16} />
                      </a>
                    )}
                    {member.socialLinks.youtube && (
                      <a
                        href={member.socialLinks.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Youtube size={16} />
                      </a>
                    )}
                    {member.socialLinks.website && (
                      <a
                        href={member.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                      >
                        <Globe size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-amber-600 text-white p-6 flex justify-between items-center rounded-t-2xl z-10">
                <h2 className="text-2xl font-bold">
                  {editingMember ? "Edit Maharaj Profile" : "Add New Maharaj"}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Profile Photo
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-orange-500 transition-colors">
                    {imagePreview ? (
                      <div className="relative">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          className="max-h-64 mx-auto rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview("");
                            setFormData((prev) => ({ ...prev, photo: "" }));
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
                        <label className="cursor-pointer text-orange-600 hover:text-orange-700 font-semibold">
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

                {/* Name & Designation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Maharaj Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 font-medium"
                      placeholder="Enter name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Designation *
                    </label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 font-medium"
                      placeholder="e.g., Senior Guru"
                    />
                  </div>
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
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 font-medium resize-none"
                    placeholder="Brief description about the Maharaj"
                  />
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 font-medium"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 font-medium"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 font-medium"
                      placeholder="City, State"
                    />
                  </div>
                </div>

                {/* Social Links */}
                               <div>
                  <label className="block text-sm font-bold text-slate-800 mb-3">
                    Social Media Links
                  </label>
                  <div className="space-y-3">
                    {/* Facebook */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        <Facebook size={20} />
                      </div>
                      <input
                        type="url"
                        value={formData.socialLinks.facebook}
                        onChange={(e) =>
                          handleSocialLinkChange("facebook", e.target.value)
                        }
                        className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800"
                        placeholder="Facebook profile URL"
                      />
                    </div>

                    {/* Instagram */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-pink-100 text-pink-600 rounded-lg">
                        <Instagram size={20} />
                      </div>
                      <input
                        type="url"
                        value={formData.socialLinks.instagram}
                        onChange={(e) =>
                          handleSocialLinkChange("instagram", e.target.value)
                        }
                        className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800"
                        placeholder="Instagram profile URL"
                      />
                    </div>

                    {/* Twitter */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-sky-100 text-sky-600 rounded-lg">
                        <Twitter size={20} />
                      </div>
                      <input
                        type="url"
                        value={formData.socialLinks.twitter}
                        onChange={(e) =>
                          handleSocialLinkChange("twitter", e.target.value)
                        }
                        className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800"
                        placeholder="Twitter profile URL"
                      />
                    </div>

                    {/* YouTube */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                        <Youtube size={20} />
                      </div>
                      <input
                        type="url"
                        value={formData.socialLinks.youtube}
                        onChange={(e) =>
                          handleSocialLinkChange("youtube", e.target.value)
                        }
                        className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800"
                        placeholder="YouTube channel URL"
                      />
                    </div>

                    {/* Website */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
                        <Globe size={20} />
                      </div>
                      <input
                        type="url"
                        value={formData.socialLinks.website}
                        onChange={(e) =>
                          handleSocialLinkChange("website", e.target.value)
                        }
                        className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800"
                        placeholder="Personal website URL"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl hover:from-orange-700 hover:to-amber-700 transition-all shadow-lg font-semibold"
                  >
                    {editingMember ? "Update Member" : "Add Member"}
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