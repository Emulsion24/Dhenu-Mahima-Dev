"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Save, Upload, Plus, Trash2, Edit2, X, Image, ArrowLeft, AlertCircle, CheckCircle, Loader } from "lucide-react";
 import API from "@/lib/api";
// Mock API for demonstration - replace with your actual API


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

export default function FoundationAdminPanel() {
  const [foundations, setFoundations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState("list");
  const [selectedFoundationId, setSelectedFoundationId] = useState(null);
  const [activeTab, setActiveTab] = useState("basic");
  const [logoPreview, setLogoPreview] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [tempData, setTempData] = useState({});
  const [toast, setToast] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [logoFile, setLogoFile] = useState(null);

  // Show toast notification
  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  // Normalize API response
  const normalizeFoundation = useCallback((f) => ({
    ...f,
    logo: f.logoUrl || "",
    established: f.establishedYear || "",
    keyActivities: f.activities?.map(a => a.activityText) || [],
    objectives: f.objectives
      ?.filter(o => o.objectiveType === "main")
      .map(o => ({ title: o.title, description: o.description })) || [],
    supportiveObjectives: f.objectives
      ?.filter(o => o.objectiveType === "supportive")
      .map(o => o.title) || [],
    stats: f.stats || [
      { label: "", value: "" },
      { label: "", value: "" },
      { label: "", value: "" },
      { label: "", value: "" }
    ],
    contact: f.contact || { email: "", phone: "", address: "" }
  }), []);

  // Prepare data for API submission
  // Prepare data for API submission (supports logo file)
const prepareForAPI = useCallback((foundation, logoFile) => {
  const formData = new FormData();

  formData.append("name", foundation.name);
  formData.append("tagline", foundation.tagline);
  formData.append("description", foundation.description);
  formData.append("establishedYear", foundation.established);

  // Append logo file if it exists
  if (logoFile) {
    formData.append("logo", logoFile);
  }

  formData.append("stats", JSON.stringify(foundation.stats || []));
  formData.append("activities", JSON.stringify(foundation.keyActivities || []));

  const objectives = [
    ...foundation.objectives.map(o => ({
      objectiveType: "main",
      title: o.title,
      description: o.description
    })),
    ...foundation.supportiveObjectives.map(title => ({
      objectiveType: "supportive",
      title
    }))
  ];
  formData.append("objectives", JSON.stringify(objectives));

  if (foundation.contact)
    formData.append("contact", JSON.stringify(foundation.contact));

  return formData;
}, []);

  // Fetch all foundations
  const fetchFoundations = useCallback(async () => {
    try {
      setLoading(true);
      const response = await API.get("/admin/foundation/all");
      const normalized = response.data.data.map(normalizeFoundation);
      setFoundations(normalized);
      setHasUnsavedChanges(false);
    } catch (err) {
      console.error("Error fetching foundations:", err);
      showToast("Failed to fetch foundations: " + err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [normalizeFoundation, showToast]);

  useEffect(() => {
    fetchFoundations();
  }, [fetchFoundations]);

  const selectedFoundation = foundations.find(f => f.id === selectedFoundationId);

  // Create new foundation (local only, no API call yet)
  const createNewFoundation = () => {
    const newFoundation = {
      id: `temp_${Date.now()}`, // Temporary ID for local state
      name: "",
      tagline: "",
      logo: "",
      description: "",
      established: new Date().getFullYear().toString(),
      stats: [
        { label: "", value: "" },
        { label: "", value: "" },
        { label: "", value: "" },
        { label: "", value: "" }
      ],
      keyActivities: [],
      objectives: [],
      supportiveObjectives: [],
      contact: { email: "", phone: "", address: "" },
      isNew: true // Flag to identify unsaved foundations
    };

    setFoundations([...foundations, newFoundation]);
    setSelectedFoundationId(newFoundation.id);
    setCurrentView("edit");
    setLogoPreview("");
    setHasUnsavedChanges(true);
    showToast("Fill in the details and click 'Save All' to create the foundation", 'info');
  };

  // Delete foundation
  const deleteFoundation = async (id) => {
    const foundation = foundations.find(f => f.id === id);
    
    if (!window.confirm("Are you sure you want to delete this foundation? This action cannot be undone.")) {
      return;
    }

    // If it's a new unsaved foundation, just remove it from state
    if (foundation?.isNew) {
      setFoundations(foundations.filter(f => f.id !== id));
      if (selectedFoundationId === id) {
        setCurrentView("list");
        setSelectedFoundationId(null);
      }
      showToast("Unsaved foundation removed", 'success');
      return;
    }

    // Otherwise, call API to delete
    try {
      setLoading(true);
      await API.delete(`/admin/foundation/delete/${id}`);
      setFoundations(foundations.filter(f => f.id !== id));
      if (selectedFoundationId === id) {
        setCurrentView("list");
        setSelectedFoundationId(null);
      }
      showToast("Foundation deleted successfully", 'success');
    } catch (err) {
      console.error("Error deleting foundation:", err);
      showToast("Failed to delete foundation: " + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Edit foundation
  const editFoundation = (id) => {
    if (hasUnsavedChanges && !window.confirm("You have unsaved changes. Do you want to discard them?")) {
      return;
    }
    setSelectedFoundationId(id);
    const foundation = foundations.find(f => f.id === id);
    setLogoPreview(foundation.logo);
    setCurrentView("edit");
    setActiveTab("basic");
    setHasUnsavedChanges(false);
  };

  // Handle logo upload
 const handleLogoUpload = (e) => {
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

    setLogoFile(file); // store actual file

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result); // preview
      updateFoundation("logo", reader.result);
    };
    reader.readAsDataURL(file);
  }
};

  // Update foundation field
  const updateFoundation = (field, value) => {
    const updatedFoundation = {
      ...selectedFoundation,
      [field]: value
    };
    setFoundations(foundations.map(f =>
      f.id === selectedFoundationId ? updatedFoundation : f
    ));
    setHasUnsavedChanges(true);
  };

  // Handle contact change
  const handleContactChange = (field, value) => {
    const updatedContact = { ...selectedFoundation.contact, [field]: value };
    updateFoundation("contact", updatedContact);
  };

  // Handle stat change
  const handleStatChange = (index, field, value) => {
    const newStats = [...selectedFoundation.stats];
    newStats[index][field] = value;
    updateFoundation("stats", newStats);
  };

  // Modal functions
  const openModal = (type, index = null) => {
    setModalType(type);
    setEditIndex(index);
    
    if (type === "activity" && index !== null) {
      setTempData({ text: selectedFoundation.keyActivities[index] });
    } else if (type === "objective" && index !== null) {
      setTempData(selectedFoundation.objectives[index]);
    } else if (type === "supportive" && index !== null) {
      setTempData({ text: selectedFoundation.supportiveObjectives[index] });
    } else {
      setTempData({});
    }
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTempData({});
    setEditIndex(null);
  };

  const handleModalSave = () => {
    // Validation
    if (modalType === "activity" && !tempData.text?.trim()) {
      showToast("Activity text is required", 'error');
      return;
    }
    if (modalType === "objective" && (!tempData.title?.trim() || !tempData.description?.trim())) {
      showToast("Title and description are required", 'error');
      return;
    }
    if (modalType === "supportive" && !tempData.text?.trim()) {
      showToast("Supportive objective text is required", 'error');
      return;
    }

    if (modalType === "activity") {
      const newActivities = editIndex !== null
        ? selectedFoundation.keyActivities.map((a, i) => i === editIndex ? tempData.text : a)
        : [...selectedFoundation.keyActivities, tempData.text];
      updateFoundation("keyActivities", newActivities);
    } else if (modalType === "objective") {
      const newObjectives = editIndex !== null
        ? selectedFoundation.objectives.map((o, i) => i === editIndex ? tempData : o)
        : [...selectedFoundation.objectives, tempData];
      updateFoundation("objectives", newObjectives);
    } else if (modalType === "supportive") {
      const newSupportive = editIndex !== null
        ? selectedFoundation.supportiveObjectives.map((s, i) => i === editIndex ? tempData.text : s)
        : [...selectedFoundation.supportiveObjectives, tempData.text];
      updateFoundation("supportiveObjectives", newSupportive);
    }
    closeModal();
    showToast(`${modalType === 'activity' ? 'Activity' : modalType === 'objective' ? 'Objective' : 'Supportive objective'} ${editIndex !== null ? 'updated' : 'added'} successfully`, 'success');
  };

  const handleDelete = (type, index) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    if (type === "activity") {
      updateFoundation("keyActivities", selectedFoundation.keyActivities.filter((_, i) => i !== index));
    } else if (type === "objective") {
      updateFoundation("objectives", selectedFoundation.objectives.filter((_, i) => i !== index));
    } else if (type === "supportive") {
      updateFoundation("supportiveObjectives", selectedFoundation.supportiveObjectives.filter((_, i) => i !== index));
    }
    showToast("Item deleted successfully", 'success');
  };

  // Save all changes
  const handleSaveAll = async () => {
    if (!selectedFoundation) {
      showToast("No foundation selected", 'error');
      return;
    }

    // Validation
    if (!selectedFoundation.name?.trim()) {
      showToast("Foundation name is required", 'error');
      setActiveTab("basic");
      return;
    }

    try {
      setLoading(true);
      const apiData = prepareForAPI(selectedFoundation,logoFile);
      
      if (selectedFoundation.isNew) {
        // Create new foundation
        const response = await API.post("/admin/foundation/create", apiData);
        const normalized = normalizeFoundation(response.data);
        
        // Replace temporary foundation with real one
        setFoundations(foundations.map(f => 
          f.id === selectedFoundationId ? normalized : f
        ));
        setSelectedFoundationId(normalized.id);
        showToast("Foundation created successfully!", 'success');
      } else {
        // Update existing foundation
        await API.put(`/admin/foundation/update/${selectedFoundationId}`, apiData);
        showToast("Foundation updated successfully!", 'success');
      }
      
      setHasUnsavedChanges(false);
    } catch (err) {
      console.error("Error saving foundation:", err);
      showToast("Failed to save foundation: " + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "stats", label: "Statistics" },
    { id: "activities", label: "Activities" },
    { id: "objectives", label: "Objectives" },
    { id: "supportive", label: "Supportive" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {loading && <LoadingOverlay />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-orange-900 mb-2">
                {currentView === "list" ? "Foundation Management" : "Edit Foundation"}
              </h1>
              <p className="text-gray-600">
                {currentView === "list" 
                  ? `Manage all foundations (${foundations.length} total)`
                  : hasUnsavedChanges 
                    ? "⚠️ You have unsaved changes"
                    : "All changes saved"
                }
              </p>
            </div>
            <div className="flex gap-3">
              {currentView === "edit" && (
                <button
                  onClick={() => {
                    if (hasUnsavedChanges && !window.confirm("You have unsaved changes. Do you want to discard them?")) {
                      return;
                    }
                    setCurrentView("list");
                    setHasUnsavedChanges(false);
                  }}
                  className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
                >
                  <ArrowLeft size={20} />
                  Back to List
                </button>
              )}
              {currentView === "edit" && (
                <button
                  onClick={handleSaveAll}
                  disabled={!hasUnsavedChanges}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors shadow-md ${
                    hasUnsavedChanges
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Save size={20} />
                  {selectedFoundation?.isNew ? 'Create Foundation' : 'Save All'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* List View */}
        {currentView === "list" && (
          <div>
            <div className="mb-6">
              <button
                onClick={createNewFoundation}
                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
              >
                <Plus size={20} />
                Add New Foundation
              </button>
            </div>

            {foundations.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <Image size={64} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Foundations Yet</h3>
                <p className="text-gray-500">Click "Add New Foundation" to get started</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {foundations.map((foundation) => (
                  <div
                    key={foundation.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="h-40 bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center p-4">
                      {foundation.logo ? (
                        <img
                          src={foundation.logo}
                          alt={foundation.name}
                          className="max-h-32 max-w-full object-contain"
                        />
                      ) : (
                        <Image size={64} className="text-white opacity-50" />
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 
                        className="text-xl font-bold text-orange-900 mb-2 min-h-[56px]"
                        style={{ fontFamily: 'Noto Serif Devanagari, Georgia, serif' }}
                      >
                        {foundation.name || "Unnamed Foundation"}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 min-h-[40px]" style={{ fontFamily: 'Noto Serif Devanagari, Georgia, serif' }}>
                        {foundation.tagline || "No tagline"}
                      </p>
                      
                      <div className="text-sm text-gray-500 mb-4 space-y-1">
                        <div className="flex justify-between">
                          <span>Established:</span>
                          <span className="font-semibold">{foundation.established || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Activities:</span>
                          <span className="font-semibold">{foundation.keyActivities.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Objectives:</span>
                          <span className="font-semibold">{foundation.objectives.length}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => editFoundation(foundation.id)}
                          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                        >
                          <Edit2 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteFoundation(foundation.id)}
                          className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Edit View */}
        {currentView === "edit" && selectedFoundation && (
          <>
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 min-w-[120px] px-6 py-4 font-semibold transition-colors ${
                      activeTab === tab.id
                        ? "bg-orange-600 text-white"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              {/* Basic Info Tab */}
              {activeTab === "basic" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-orange-900 mb-6">Basic Information</h2>
                  
                  {/* Logo Upload */}
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-orange-400 transition">
                    <div className="mb-4">
                      {logoPreview ? (
                        <img
                          src={logoPreview}
                          alt="Logo Preview"
                          className="w-40 h-40 object-contain mx-auto mb-4 rounded-lg"
                        />
                      ) : (
                        <div className="w-40 h-40 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                          <Image className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <label className="cursor-pointer inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                      <Upload size={20} />
                      Upload Logo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                      Recommended: Square image, min 200x200px, max 5MB
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Foundation Name (संस्था का नाम) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={selectedFoundation.name}
                      onChange={(e) => updateFoundation("name", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                      style={{ fontFamily: 'Noto Serif Devanagari, Georgia, serif' }}
                      placeholder="Foundation name in Hindi"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={selectedFoundation.tagline}
                      onChange={(e) => updateFoundation("tagline", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                      style={{ fontFamily: 'Noto Serif Devanagari, Georgia, serif' }}
                      placeholder="Tagline"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Established Year
                    </label>
                    <input
                      type="text"
                      value={selectedFoundation.established}
                      onChange={(e) => updateFoundation("established", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                      placeholder="2023"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Description (विवरण)
                    </label>
                    <textarea
                      value={selectedFoundation.description}
                      onChange={(e) => updateFoundation("description", e.target.value)}
                      rows="6"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                      style={{ fontFamily: 'Noto Serif Devanagari, Georgia, serif' }}
                      placeholder="Foundation description in Hindi"
                    />
                  </div>
                </div>
              )}

              {/* Statistics Tab */}
              {activeTab === "stats" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-orange-900 mb-6">Statistics</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {selectedFoundation.stats.map((stat, index) => (
                      <div key={index} className="border-2 border-gray-200 rounded-xl p-6 hover:border-orange-300 transition">
                        <div className="mb-4">
                          <label className="block text-gray-700 font-semibold mb-2">
                            Label (लेबल)
                          </label>
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => handleStatChange(index, "label", e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                            style={{ fontFamily: 'Noto Serif Devanagari, Georgia, serif' }}
                            placeholder="Statistic label"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">
                            Value
                          </label>
                          <input
                            type="text"
                            value={stat.value}
                            onChange={(e) => handleStatChange(index, "value", e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                            placeholder="150+"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Activities Tab */}
              {activeTab === "activities" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-orange-900">Key Activities</h2>
                    <button
                      onClick={() => openModal("activity")}
                      className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      <Plus size={20} />
                      Add Activity
                    </button>
                  </div>
                  {selectedFoundation.keyActivities.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-xl">
                      <p>No activities added yet. Click "Add Activity" to get started.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedFoundation.keyActivities.map((activity, index) => (
                        <div key={index} className="border-2 border-gray-200 rounded-xl p-6 hover:border-orange-300 transition">
                          <div className="flex justify-between items-start gap-4">
                            <p className="flex-1 text-gray-700" style={{ fontFamily: 'Noto Serif Devanagari, Georgia, serif' }}>
                              {index + 1}. {activity}
                            </p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => openModal("activity", index)}
                                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                                title="Edit activity"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete("activity", index)}
                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                                title="Delete activity"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Objectives Tab */}
              {activeTab === "objectives" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-orange-900">Main Objectives</h2>
                    <button
                      onClick={() => openModal("objective")}
                      className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      <Plus size={20} />
                      Add Objective
                    </button>
                  </div>
                  {selectedFoundation.objectives.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-xl">
                      <p>No objectives added yet. Click "Add Objective" to get started.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedFoundation.objectives.map((objective, index) => (
                        <div key={index} className="border-2 border-gray-200 rounded-xl p-6 hover:border-orange-300 transition">
                          <div className="flex justify-between items-start gap-4 mb-3">
                            <h3 className="text-lg font-bold text-orange-900 flex-1" style={{ fontFamily: 'Noto Serif Devanagari, Georgia, serif' }}>
                              {objective.title}
                            </h3>
                            <div className="flex gap-2">
                              <button
                                onClick={() => openModal("objective", index)}
                                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                                title="Edit objective"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete("objective", index)}
                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                                title="Delete objective"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-700" style={{ fontFamily: 'Noto Serif Devanagari, Georgia, serif' }}>
                            {objective.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Supportive Objectives Tab */}
              {activeTab === "supportive" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-orange-900">Supportive Objectives</h2>
                    <button
                      onClick={() => openModal("supportive")}
                      className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      <Plus size={20} />
                      Add Supportive Objective
                    </button>
                  </div>
                  {selectedFoundation.supportiveObjectives.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-xl">
                      <p>No supportive objectives added yet. Click "Add Supportive Objective" to get started.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedFoundation.supportiveObjectives.map((objective, index) => (
                        <div key={index} className="border-2 border-gray-200 rounded-xl p-6 hover:border-orange-300 transition">
                          <div className="flex justify-between items-start gap-4">
                            <p className="flex-1 text-gray-700" style={{ fontFamily: 'Noto Serif Devanagari, Georgia, serif' }}>
                              {index + 1}. {objective}
                            </p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => openModal("supportive", index)}
                                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                                title="Edit supportive objective"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete("supportive", index)}
                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                                title="Delete supportive objective"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Contact Tab */}
              {activeTab === "contact" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-orange-900 mb-6">Contact Information</h2>
                  
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={selectedFoundation.contact.email}
                      onChange={(e) => handleContactChange("email", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={selectedFoundation.contact.phone}
                      onChange={(e) => handleContactChange("phone", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Address
                    </label>
                    <textarea
                      value={selectedFoundation.contact.address}
                      onChange={(e) => handleContactChange("address", e.target.value)}
                      rows="4"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                      placeholder="Full address"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Website
                    </label>
                    <textarea
                      value={selectedFoundation.contact.website }
                      onChange={(e) => handleContactChange("website", e.target.value)}
                      rows="4"
                     className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                      placeholder="Website Link"
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
            <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-amber-600 text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                  {editIndex !== null ? "Edit" : "Add"}{" "}
                  {modalType === "activity" ? "Activity" : modalType === "objective" ? "Objective" : "Supportive Objective"}
                </h2>
                <button
                  onClick={closeModal}
                  className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
                  title="Close"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {modalType === "objective" ? (
                  <>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Title (शीर्षक) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={tempData.title || ""}
                        onChange={(e) => setTempData({ ...tempData, title: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                        style={{ fontFamily: 'Noto Serif Devanagari, Georgia, serif' }}
                        placeholder="Objective title"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Description (विवरण) <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={tempData.description || ""}
                        onChange={(e) => setTempData({ ...tempData, description: e.target.value })}
                        rows="6"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                        style={{ fontFamily: 'Noto Serif Devanagari, Georgia, serif' }}
                        placeholder="Objective description"
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {modalType === "activity" ? "Activity" : "Supportive Objective"} Text <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={tempData.text || ""}
                      onChange={(e) => setTempData({ ...tempData, text: e.target.value })}
                      rows="6"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                      style={{ fontFamily: 'Noto Serif Devanagari, Georgia, serif' }}
                      placeholder={`Enter ${modalType === "activity" ? "activity" : "supportive objective"} text`}
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleModalSave}
                  className="flex-1 flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <Save size={20} />
                  Save
                </button>
                <button
                  onClick={closeModal}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}