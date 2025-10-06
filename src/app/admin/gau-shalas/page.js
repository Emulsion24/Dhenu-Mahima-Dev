"use client";
import Image from "next/image";

import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Image as ImageIcon,
  MapPin,
  Calendar,
  Beef,
  Users,
  Phone,
  Mail,
  AnchorIcon,
  TentIcon,
  TentTreeIcon,
  LucideTent,
} from "lucide-react";

export default function GauShalaPage() {
  const [gauShalas, setGauShalas] = useState([
    {
      id: 1,
      name: "Shri Krishna Gau Seva Kendra",
      photo: "",
      address: "Village Gokul, Near Temple Road",
      city: "Vrindavan",
      state: "Uttar Pradesh",
      pincode: "281121",
      establishmentDate: "2010-05-15",
      totalCows: 350,
      capacity: 500,
      contactPerson: "Ram Prasad Sharma",
      phone: "+91 98765 43210",
      email: "gokul@gaushala.org",
      description: "Dedicated to serving and protecting indigenous cows with love and care.",
    },
    {
      id: 2,
      name: "Radha Vallabh Gau Ashram",
      photo: "",
      address: "Mathura-Vrindavan Highway, Km 12",
      city: "Mathura",
      state: "Uttar Pradesh",
      pincode: "281001",
      establishmentDate: "2005-08-20",
      totalCows: 520,
      capacity: 600,
      contactPerson: "Gopal Das",
      phone: "+91 98765 43211",
      email: "radha@gaushala.org",
      description: "One of the largest cow shelters in the region serving indigenous breeds.",
    },
    {
      id: 3,
      name: "Nand Baba Gau Seva Samiti",
      photo: "",
      address: "Barsana Road, Near Bus Stand",
      city: "Barsana",
      state: "Uttar Pradesh",
      pincode: "281405",
      establishmentDate: "2015-12-10",
      totalCows: 200,
      capacity: 300,
      contactPerson: "Krishna Kumar",
      phone: "+91 98765 43212",
      email: "nand@gaushala.org",
      description: "Modern facilities with focus on cow health and organic farming.",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingGauShala, setEditingGauShala] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    establishmentDate: "",
    totalCows: "",
    capacity: "",
    contactPerson: "",
    phone: "",
    email: "",
    description: "",
  });

  // Calculate Statistics
  const totalGauShalas = gauShalas.length;
  const totalCows = gauShalas.reduce((sum, gs) => sum + Number(gs.totalCows), 0);
  const totalCapacity = gauShalas.reduce((sum, gs) => sum + Number(gs.capacity), 0);
  const avgCowsPerShala = totalGauShalas > 0 ? Math.round(totalCows / totalGauShalas) : 0;

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
    setEditingGauShala(null);
    setFormData({
      name: "",
      photo: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      establishmentDate: "",
      totalCows: "",
      capacity: "",
      contactPerson: "",
      phone: "",
      email: "",
      description: "",
    });
    setImagePreview("");
    setShowModal(true);
  };

  // Open Edit Modal
  const openEditModal = (gauShala) => {
    setEditingGauShala(gauShala);
    setFormData(gauShala);
    setImagePreview(gauShala.photo);
    setShowModal(true);
  };

  // Close Modal
  const closeModal = () => {
    setShowModal(false);
    setEditingGauShala(null);
    setImagePreview("");
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingGauShala) {
      // Update existing gau shala
      setGauShalas(
        gauShalas.map((gs) =>
          gs.id === editingGauShala.id
            ? { 
                ...formData, 
                id: gs.id,
                totalCows: Number(formData.totalCows),
                capacity: Number(formData.capacity)
              }
            : gs
        )
      );
      alert("Gau Shala updated successfully!");
    } else {
      // Add new gau shala
      const newGauShala = {
        ...formData,
        id: Date.now(),
        totalCows: Number(formData.totalCows),
        capacity: Number(formData.capacity),
      };
      setGauShalas([newGauShala, ...gauShalas]);
      alert("Gau Shala added successfully!");
    }

    closeModal();
  };

  // Handle Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Gau Shala?")) {
      setGauShalas(gauShalas.filter((gs) => gs.id !== id));
    }
  };

  // Calculate years since establishment
  const getYearsSinceEstablishment = (date) => {
    const years = new Date().getFullYear() - new Date(date).getFullYear();
    return years;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-200 p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                🐄 Gau Shala Management
              </h1>
              <p className="text-slate-600 font-medium">
                Manage all Gau Shalas and their information
              </p>
            </div>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg font-semibold"
            >
              <Plus size={20} />
              Add Gau Shala
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <LucideTent size={28} />
              </div>
            </div>
            <p className="text-green-100 text-sm font-bold uppercase tracking-wide mb-1">
             Total Gau Shalas
            </p>
            <h3 className="text-4xl font-extrabold">{totalGauShalas}</h3>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <TentTreeIcon size={28} />
              </div>
            </div>
            <p className="text-emerald-100 text-sm font-bold uppercase tracking-wide mb-1">
              Total Cows
            </p>
            <h3 className="text-4xl font-extrabold">{totalCows.toLocaleString()}</h3>
          </div>

          <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Users size={28} />
              </div>
            </div>
            <p className="text-teal-100 text-sm font-bold uppercase tracking-wide mb-1">
              Total Capacity
            </p>
            <h3 className="text-4xl font-extrabold">{totalCapacity.toLocaleString()}</h3>
          </div>

          <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <TentIcon size={28} />
              </div>
            </div>
            <p className="text-cyan-100 text-sm font-bold uppercase tracking-wide mb-1">
              Avg Cows/Shala
            </p>
            <h3 className="text-4xl font-extrabold">{avgCowsPerShala}</h3>
          </div>
        </div>

        {/* Gau Shalas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {gauShalas.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-white rounded-2xl shadow-lg">
              <TentIcon size={64} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">
                No Gau Shalas yet
              </h3>
              <p className="text-slate-500 mb-6">
                Add your first Gau Shala to get started
              </p>
              <button
                onClick={openAddModal}
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold"
              >
                Add Gau Shala
              </button>
            </div>
          ) : (
            gauShalas.map((gauShala) => (
              <div
                key={gauShala.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-green-100 hover:border-green-300 overflow-hidden"
              >
                {/* Photo Header */}
                <div className="relative h-48 bg-gradient-to-br from-green-400 to-emerald-500">
                  {gauShala.photo ? (
                    <Image
                      src={gauShala.photo}
                      alt={gauShala.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      🐄 
                    </div>
                  )}
                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={() => openEditModal(gauShala)}
                      className="p-2 bg-white rounded-full shadow-lg hover:bg-blue-50 transition-colors"
                    >
                      <Edit size={18} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(gauShala.id)}
                      className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>

                  {/* Years Badge */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg">
                    <p className="text-xs font-bold text-green-700">
                      {getYearsSinceEstablishment(gauShala.establishmentDate)} Years of Service
                    </p>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {gauShala.name}
                  </h3>
                  
                  <p className="text-sm text-slate-600 mb-4">
                    {gauShala.description}
                  </p>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-green-50 rounded-xl border border-green-200">
                    <div>
                      <p className="text-xs font-semibold text-green-700 mb-1">
                        Total Cows
                      </p>
                      <p className="text-2xl font-bold text-green-800">
                        {gauShala.totalCows}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-green-700 mb-1">
                        Capacity
                      </p>
                      <p className="text-2xl font-bold text-green-800">
                        {gauShala.capacity}
                      </p>
                    </div>
                  </div>

                  {/* Information Grid */}
                  <div className="space-y-3">
                    {/* Address */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-red-100 text-red-600 rounded-lg mt-0.5">
                        <MapPin size={16} />
                      </div>
                      <div className="flex-1">
                                               <p className="text-xs font-semibold text-slate-500 mb-1">
                          Address
                        </p>
                        <p className="text-sm font-medium text-slate-800">
                          {gauShala.address}
                        </p>
                        <p className="text-sm font-medium text-slate-800">
                          {gauShala.city}, {gauShala.state} - {gauShala.pincode}
                        </p>
                      </div>
                    </div>

                    {/* Establishment Date */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg mt-0.5">
                        <Calendar size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-slate-500 mb-1">
                          Established
                        </p>
                        <p className="text-sm font-medium text-slate-800">
                          {new Date(gauShala.establishmentDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Contact Person */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-100 text-purple-600 rounded-lg mt-0.5">
                        <Users size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-slate-500 mb-1">
                          Contact Person
                        </p>
                        <p className="text-sm font-medium text-slate-800">
                          {gauShala.contactPerson}
                        </p>
                      </div>
                    </div>

                    {/* Phone & Email */}
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                          <Phone size={16} />
                        </div>
                        <p className="text-sm font-medium text-slate-800">
                          {gauShala.phone}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                          <Mail size={16} />
                        </div>
                        <p className="text-sm font-medium text-slate-800 break-all">
                          {gauShala.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 flex justify-between items-center rounded-t-2xl z-10">
                <h2 className="text-2xl font-bold">
                  {editingGauShala ? "Edit Gau Shala" : "Add New Gau Shala"}
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
                    Gau Shala Photo
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-green-500 transition-colors">
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
                        <label className="cursor-pointer text-green-600 hover:text-green-700 font-semibold">
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

                {/* Gau Shala Name */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Gau Shala Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-800 font-medium"
                    placeholder="Enter Gau Shala name"
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
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-800 font-medium resize-none"
                    placeholder="Brief description about the Gau Shala"
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
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-800 font-medium"
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
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-800 font-medium"
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
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-800 font-medium"
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
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-800 font-medium"
                      placeholder="123456"
                    />
                  </div>
                </div>

                {/* Establishment Date, Total Cows, Capacity */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Establishment Date *
                    </label>
                    <input
                      type="date"
                      name="establishmentDate"
                      value={formData.establishmentDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-800 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Total Cows *
                    </label>
                    <input
                      type="number"
                      name="totalCows"
                      value={formData.totalCows}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-800 font-medium"
                      placeholder="e.g., 350"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Capacity *
                    </label>
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-800 font-medium"
                      placeholder="e.g., 500"
                    />
                  </div>
                </div>

                {/* Contact Person */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-800 font-medium"
                    placeholder="Contact person name"
                  />
                </div>

                {/* Phone & Email */}
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
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-800 font-medium"
                      placeholder="+91 98765 43210"
                    />
                  </div>
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
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-800 font-medium"
                      placeholder="email@example.com"
                    />
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
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg font-semibold"
                  >
                    {editingGauShala ? "Update Gau Shala" : "Add Gau Shala"}
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
