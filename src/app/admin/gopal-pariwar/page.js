"use client";
import API from "@/lib/api";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Image,
  User,
  Save,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Globe,
  Phone,
  Mail,
  MapPin,
  Loader,
  AlertCircle,
  CheckCircle,
  BookOpen,
  Award,
  Heart,
} from "lucide-react";

// Toast Notification Component
const Toast = ({ message, type, onClose }) => (
  <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl animate-slideIn ${
    type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600'
  } text-white`}>
    {type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
    <span className="font-semibold">{message}</span>
    <button onClick={onClose} className="ml-4 hover:bg-white hover:bg-opacity-20 p-1 rounded">
      <X size={16} />
    </button>
  </div>
);

// Loading Overlay Component
const LoadingOverlay = ({ message = "Loading..." }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-8 flex flex-col items-center gap-4">
      <Loader size={48} className="animate-spin text-orange-600" />
      <p className="text-gray-700 font-semibold">{message}</p>
    </div>
  </div>
);

export default function GopalPariwarAdminPanel() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [toast, setToast] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    heroImage: "",
    heroTitle: "",
    heroSubtitle: "",
    personalInfo: {
      name: "",
      birthDate: "",
      birthPlace: "",
      phone: "",
      email: "",
      location: "",
    },
    spiritualEducation: {
      guruName: "",
      initiationDate: "",
      education: "",
      qualifications: "",
    },
    lifeJourney: "",
    responsibilities: [],
    pledges: [],
    socialLinks: {
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
      website: "",
    },
  });

  // Show toast notification
  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  // Fetch all members
  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true);
      // Simulated API call - replace with actual API
      const response = await API.get("/admin/gopalpariwar");
      const data = response.data
      setMembers(data);
    } catch (err) {
      console.error("Error fetching members:", err);
      showToast("Failed to fetch members: " + err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setHasUnsavedChanges(true);
  };

  // Handle Nested Object Change
  const handleNestedChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent] || {}),
        [field]: value,
      },
    }));
    setHasUnsavedChanges(true);
  };

  // Handle Array Change
  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
    setHasUnsavedChanges(true);
  };

  // Add Array Item
  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
    setHasUnsavedChanges(true);
  };

  // Remove Array Item
  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
    setHasUnsavedChanges(true);
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast("File size must be less than 5MB", 'error');
        return;
      }
      if (!file.type.startsWith('image/')) {
        showToast("Please upload an image file", 'error');
        return;
      }

      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({
          ...prev,
          heroImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
      setHasUnsavedChanges(true);
    }
  };

  // Open Add Modal
  const openAddModal = () => {
    setEditingMember(null);
    setFormData({
      heroImage: "",
      heroTitle: "",
      heroSubtitle: "",
      personalInfo: {
        name: "",
        birthDate: "",
        birthPlace: "",
        phone: "",
        email: "",
        location: "",
      },
      spiritualEducation: {
        guruName: "",
        initiationDate: "",
        education: "",
        qualifications: "",
      },
      lifeJourney: "",
      responsibilities: [],
      pledges: [],
      socialLinks: {
        facebook: "",
        instagram: "",
        twitter: "",
        youtube: "",
        website: "",
      },
    });
    setImagePreview("");
    setImageFile(null);
    setHasUnsavedChanges(false);
    setCurrentStep(1);
    setShowModal(true);
  };

  // Open Edit Modal
  const openEditModal = (member) => {
    // Parse data if it's stringified
    const parsedPersonalInfo = typeof member.personalInfo === 'string' 
      ? JSON.parse(member.personalInfo) 
      : member.personalInfo;
    
    const parsedSpiritualEducation = typeof member.spiritualEducation === 'string' 
      ? JSON.parse(member.spiritualEducation) 
      : member.spiritualEducation;
    
    const parsedResponsibilities = typeof member.responsibilities === 'string' 
      ? JSON.parse(member.responsibilities) 
      : member.responsibilities;
    
    const parsedPledges = typeof member.pledges === 'string' 
      ? JSON.parse(member.pledges) 
      : member.pledges;
    
    const parsedSocialLinks = member.socialLinks 
      ? (typeof member.socialLinks === 'string' 
          ? JSON.parse(member.socialLinks) 
          : member.socialLinks)
      : null;

    setEditingMember(member);
    setFormData({
      heroImage: member.heroImage || "",
      heroTitle: member.heroTitle || "",
      heroSubtitle: member.heroSubtitle || "",
      personalInfo: {
        name: parsedPersonalInfo?.name || "",
        birthDate: parsedPersonalInfo?.birthDate || "",
        birthPlace: parsedPersonalInfo?.birthPlace || "",
        phone: parsedPersonalInfo?.phone || "",
        email: parsedPersonalInfo?.email || "",
        location: parsedPersonalInfo?.location || "",
      },
      spiritualEducation: {
        guruName: parsedSpiritualEducation?.guruName || "",
        initiationDate: parsedSpiritualEducation?.initiationDate || "",
        education: parsedSpiritualEducation?.education || "",
        qualifications: parsedSpiritualEducation?.qualifications || "",
      },
      lifeJourney: member.lifeJourney || "",
      responsibilities: Array.isArray(parsedResponsibilities) ? parsedResponsibilities : [],
      pledges: Array.isArray(parsedPledges) ? parsedPledges : [],
      socialLinks: {
        facebook: parsedSocialLinks?.facebook || "",
        instagram: parsedSocialLinks?.instagram || "",
        twitter: parsedSocialLinks?.twitter || "",
        youtube: parsedSocialLinks?.youtube || "",
        website: parsedSocialLinks?.website || "",
      },
    });
    setImagePreview(member.heroImage || "");
    setImageFile(null);
    setHasUnsavedChanges(false);
    setCurrentStep(1);
    setShowModal(true);
  };

  // Close Modal
  const closeModal = () => {
    if (hasUnsavedChanges && !window.confirm("You have unsaved changes. Do you want to discard them?")) {
      return;
    }
    setShowModal(false);
    setEditingMember(null);
    setImagePreview("");
    setImageFile(null);
    setHasUnsavedChanges(false);
    setCurrentStep(1);
  };

  // Prepare Data for API
  const prepareFormData = () => {
    const apiFormData = new FormData();
    
    if (imageFile) {
      apiFormData.append("photo", imageFile);
    }

    apiFormData.append("heroTitle", formData.heroTitle);
    apiFormData.append("heroSubtitle", formData.heroSubtitle);
    apiFormData.append("personalInfo", JSON.stringify(formData.personalInfo));
    apiFormData.append("spiritualEducation", JSON.stringify(formData.spiritualEducation));
    apiFormData.append("lifeJourney", formData.lifeJourney);
    apiFormData.append("responsibilities", JSON.stringify(formData.responsibilities));
    apiFormData.append("pledges", JSON.stringify(formData.pledges));
    apiFormData.append("socialLinks", JSON.stringify(formData.socialLinks));

    return apiFormData;
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.heroTitle.trim()) {
      showToast("Hero Title is required", 'error');
      return;
    }
    if (!formData.personalInfo.name.trim()) {
      showToast("Name is required", 'error');
      return;
    }

    try {
      setLoading(true);
      const apiFormData = prepareFormData();

      if (editingMember) {
        // Update existing member
       await API.put(`/admin/gopalpariwar/update/${editingMember.id}`, apiFormData);
        showToast("Member updated successfully!", 'success');
      } else {
        // Add new member
        await API.post("/admin/gopalpariwar/create", apiFormData);
        showToast("Member added successfully!", 'success');
      }

      fetchMembers();
      closeModal();
    } catch (err) {
      console.error("Error saving member:", err);
      showToast("Failed to save member: " + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) {
      return;
    }

    try {
      setLoading(true);
       API.delete(`/admin/gopalpariwar/delete/${id}`);
      setMembers(members.filter((member) => member.id !== id));
      showToast("Member deleted successfully", 'success');
    } catch (err) {
      console.error("Error deleting member:", err);
      showToast("Failed to delete member: " + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = (e) => {
    if (e) {
      e.preventDefault(); // Prevent form submission
      e.stopPropagation();
    }
    if (currentStep === 1 && !formData.heroTitle.trim()) {
      showToast("Please fill in the Hero Title", 'error');
      return;
    }
    if (currentStep === 2 && !formData.personalInfo.name.trim()) {
      showToast("Please fill in the Name", 'error');
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const prevStep = (e) => {
    if (e) {
      e.preventDefault(); // Prevent form submission
      e.stopPropagation();
    }
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {loading && <LoadingOverlay />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-orange-200 p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
                Gopal Pariwar Management
              </h1>
              <p className="text-slate-600 font-medium">
                Manage Maharaj profiles and their details ({members.length} total)
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
                  {member.heroImage ? (
                    <img
                      src={member.heroImage}
                      alt={member.heroTitle}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={80} className="text-white/50" />
                    </div>
                  )}
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
                    {member.heroTitle}
                  </h3>
                  <p className="text-sm font-semibold text-orange-600 mb-3">
                    {member.heroSubtitle}
                  </p>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                    {member.personalInfo?.name}
                  </p>
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
              <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-amber-600 text-white p-6 rounded-t-2xl z-10">
                <div className="flex justify-between items-center mb-4">
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
                
                {/* Step Indicator */}
                <div className="flex items-center justify-between">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div key={step} className="flex items-center flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        currentStep >= step ? 'bg-white text-orange-600' : 'bg-orange-400 text-white'
                      }`}>
                        {step}
                      </div>
                      {step < 5 && (
                        <div className={`flex-1 h-1 mx-2 ${
                          currentStep > step ? 'bg-white' : 'bg-orange-400'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto">
                
                {/* Step 1: Hero Section */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <Image className="text-orange-600" />
                      Hero Section
                    </h3>

                    {/* Photo Upload */}
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2">
                        Hero Image <span className="text-red-500">*</span>
                      </label>
                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-orange-500 transition-colors">
                        {imagePreview ? (
                          <div className="relative">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="max-h-64 mx-auto rounded-lg object-contain"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImagePreview("");
                                setImageFile(null);
                                setFormData((prev) => ({ ...prev, heroImage: "" }));
                              }}
                              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        ) : (
                          <div>
                            <Image size={48} className="mx-auto text-slate-400 mb-2" />
                            <label className="cursor-pointer text-orange-600 hover:text-orange-700 font-semibold">
                              Click to upload hero image
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                              />
                            </label>
                            <p className="text-sm text-slate-500 mt-1">
                              PNG, JPG, GIF up to 5MB
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hero Title */}
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2">
                        Hero Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="heroTitle"
                        value={formData.heroTitle}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 font-medium"
                        placeholder="e.g., Pujya Sant Shri..."
                      />
                    </div>

                    {/* Hero Subtitle */}
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2">
                        Hero Subtitle
                      </label>
                      <input
                        type="text"
                        name="heroSubtitle"
                        value={formData.heroSubtitle}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 font-medium"
                        placeholder="Brief tagline or title"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Personal Information */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <User className="text-orange-600" />
                      Personal Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.personalInfo?.name || ""}
                          onChange={(e) => handleNestedChange('personalInfo', 'name', e.target.value)}
                          required
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 font-medium"
                          placeholder="Full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">
                          Birth Date
                        </label>
                        <input
                          type="date"
                          value={formData.personalInfo?.birthDate || ""}
                          onChange={(e) => handleNestedChange('personalInfo', 'birthDate', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">
                          Birth Place
                        </label>
                        <input
                          type="text"
                          value={formData.personalInfo?.birthPlace || ""}
                          onChange={(e) => handleNestedChange('personalInfo', 'birthPlace', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 font-medium"
                          placeholder="City, State"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={formData.personalInfo?.phone || ""}
                          onChange={(e) => handleNestedChange('personalInfo', 'phone', e.target.value)}
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
                          value={formData.personalInfo?.email || ""}
                          onChange={(e) => handleNestedChange('personalInfo', 'email', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 font-medium"
                          placeholder="email@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">
                          Current Location
                        </label>
                        <input
                          type="text"
                          value={formData.personalInfo?.location || ""}
                          onChange={(e) => handleNestedChange('personalInfo', 'location', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 font-medium"
                          placeholder="City, State"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Spiritual Education */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <BookOpen className="text-orange-600" />
                      Spiritual Education
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">
                          Guru Name
                        </label>
                        <input
                          type="text"
                          value={formData.spiritualEducation?.guruName || ""}
                          onChange={(e) => handleNestedChange('spiritualEducation', 'guruName', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 font-medium"
                          placeholder="Guru's name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">
                          Initiation Date
                        </label>
                        <input
                          type="date"
                          value={formData.spiritualEducation?.initiationDate || ""}
                          onChange={(e) => handleNestedChange('spiritualEducation', 'initiationDate', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2">
                        Education Background
                      </label>
                      <textarea
                        value={formData.spiritualEducation?.education || ""}
                        onChange={(e) => handleNestedChange('spiritualEducation', 'education', e.target.value)}
                        rows="3"
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 font-medium resize-none"
                        placeholder="Educational background and spiritual studies"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2">
                        Qualifications
                      </label>
                      <textarea
                        value={formData.spiritualEducation?.qualifications || ""}
                        onChange={(e) => handleNestedChange('spiritualEducation', 'qualifications', e.target.value)}
                        rows="3"
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 font-medium resize-none"
                        placeholder="Special qualifications and achievements"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2">
                        Life Journey
                      </label>
                      <textarea
                        name="lifeJourney"
                        value={formData.lifeJourney}
                        onChange={handleInputChange}
                        rows="5"
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 font-medium resize-none"
                        placeholder="Describe the spiritual journey and life story"
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Responsibilities */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <Award className="text-orange-600" />
                      Responsibilities
                    </h3>

                    <div className="space-y-3">
                      {formData.responsibilities.map((responsibility, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={responsibility}
                            onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                            className="flex-1 px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 font-medium"
                            placeholder={`Responsibility ${index + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayItem('responsibilities', index)}
                            className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayItem('responsibilities')}
                        className="w-full px-4 py-3 border-2 border-dashed border-orange-300 text-orange-600 rounded-xl hover:bg-orange-50 transition-colors font-semibold flex items-center justify-center gap-2"
                      >
                        <Plus size={20} />
                        Add Responsibility
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 5: Pledges & Social Links */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
                        <Heart className="text-orange-600" />
                        Pledges & Commitments
                      </h3>

                      <div className="space-y-3">
                        {formData.pledges.map((pledge, index) => (
                          <div key={index} className="flex gap-2">
                            <input
                              type="text"
                              value={pledge}
                              onChange={(e) => handleArrayChange('pledges', index, e.target.value)}
                              className="flex-1 px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 font-medium"
                              placeholder={`Pledge ${index + 1}`}
                            />
                            <button
                              type="button"
                              onClick={() => removeArrayItem('pledges', index)}
                              className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addArrayItem('pledges')}
                          className="w-full px-4 py-3 border-2 border-dashed border-orange-300 text-orange-600 rounded-xl hover:bg-orange-50 transition-colors font-semibold flex items-center justify-center gap-2"
                        >
                          <Plus size={20} />
                          Add Pledge
                        </button>
                      </div>
                    </div>

                    <div className="pt-6 border-t">
                      <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
                        <Globe className="text-orange-600" />
                        Social Media Links
                      </h3>

                      <div className="space-y-3">
                        {/* Facebook */}
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                            <Facebook size={20} />
                          </div>
                          <input
                            type="url"
                            value={formData.socialLinks?.facebook || ""}
                            onChange={(e) => handleNestedChange('socialLinks', 'facebook', e.target.value)}
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
                            value={formData.socialLinks?.instagram || ""}
                            onChange={(e) => handleNestedChange('socialLinks', 'instagram', e.target.value)}
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
                            value={formData.socialLinks?.twitter || ""}
                            onChange={(e) => handleNestedChange('socialLinks', 'twitter', e.target.value)}
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
                            value={formData.socialLinks?.youtube || ""}
                            onChange={(e) => handleNestedChange('socialLinks', 'youtube', e.target.value)}
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
                            value={formData.socialLinks?.website || ""}
                            onChange={(e) => handleNestedChange('socialLinks', 'website', e.target.value)}
                            className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800"
                            placeholder="Personal website URL"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 pt-6 border-t">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={(e) => prevStep(e)}
                      className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <span>Previous</span>
                    </button>
                  )}
                  
                  {currentStep < 5 ? (
                    <button
                      type="button"
                      onClick={(e) => nextStep(e)}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl hover:from-orange-700 hover:to-amber-700 transition-all shadow-lg font-semibold"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl hover:from-orange-700 hover:to-amber-700 transition-all shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader size={20} className="animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={20} />
                          {editingMember ? "Update Member" : "Add Member"}
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}