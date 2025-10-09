"use client";
import React, { useState } from "react";
import { Save, Upload, Plus, Trash2, Edit2, X, Image, ArrowLeft, Eye } from "lucide-react";

export default function FoundationAdminPanel() {
  const [foundations, setFoundations] = useState([
    {
      id: 1,
      name: "दाना देवी फाउंडेशन",
      tagline: "गो का दाना ... गो तक जाना",
      logo: "/logo/logo3.webp",
      description: "मध्यप्रदेश के सालरिया, आगर मालवा में मध्य प्रदेश सरकार द्वारा संचालित कामधेनु गौ अभयारण्य में परम पूज्य सद्गुरुदेव भगवान के मुखारविंद से एक वर्षीय वेदलक्षणा गौ आराधना महामहोत्सव आयोजन के दौरान एक बैठक में गौमाता की सेवा को किस प्रकार वैश्विक विस्तार प्रदान किया जाए।",
      established: "2023",
      stats: [
        { label: "गौशालाएं सेवित", value: "150+" },
        { label: "गौमाता सेवित", value: "25,000+" },
        { label: "टन चारा वितरित", value: "500+" },
        { label: "स्वयंसेवक", value: "200+" }
      ],
      keyActivities: [
        "अभाव ग्रस्त गौ चिकित्सालय में गौ माता को चारा, बांटा, दाना उपलब्ध करवाना",
        "बीमार गौ माता के लिए पौष्टिक आहार उपलब्ध करवाना",
        "गांव गांव जाकर वहां के गोचर में गौ माता हेतु घास की सुविधा करवाना"
      ],
      objectives: [
        {
          title: "पोषक तत्व वितरण",
          description: "निष्काम भाव से शासन, समाज, धर्मात्मा श्रेष्ठीजन, और समर्थ संस्थाओं के सहयोग से अभावग्रस्त क्षेत्रों में विशेष आवश्यकता होने पर गो-चिकित्सालय में गोमाता हेतु निःशुल्क पोषक तत्व उपलब्ध करवाना"
        }
      ],
      supportiveObjectives: [
        "धेनु धाम फाउंडेशन के माध्यम से संचालित ३१ वर्षीय गो पर्यावरण और अध्यात्म चेतना पदयात्रा द्वारा देशभर में हो रहे गो महिमा प्रचार कार्यों में सहयोग करवाना"
      ],
      contact: {
        email: "contact@foundation.org",
        phone: "+91 98765 43210",
        address: "Madhya Pradesh, India"
      }
    }
  ]);

  const [currentView, setCurrentView] = useState("list");
  const [selectedFoundationId, setSelectedFoundationId] = useState(null);
  const [activeTab, setActiveTab] = useState("basic");
  const [logoPreview, setLogoPreview] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [tempData, setTempData] = useState({});

  const selectedFoundation = foundations.find(f => f.id === selectedFoundationId);

  const createNewFoundation = () => {
    const newFoundation = {
      id: Math.max(...foundations.map(f => f.id), 0) + 1,
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
      contact: {
        email: "",
        phone: "",
        address: ""
      }
    };
    setFoundations([...foundations, newFoundation]);
    setSelectedFoundationId(newFoundation.id);
    setCurrentView("edit");
    setLogoPreview("");
  };

  const deleteFoundation = (id) => {
    if (window.confirm("Are you sure you want to delete this foundation?")) {
      setFoundations(foundations.filter(f => f.id !== id));
      if (selectedFoundationId === id) {
        setCurrentView("list");
        setSelectedFoundationId(null);
      }
    }
  };

  const editFoundation = (id) => {
    setSelectedFoundationId(id);
    const foundation = foundations.find(f => f.id === id);
    setLogoPreview(foundation.logo);
    setCurrentView("edit");
    setActiveTab("basic");
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        updateFoundation("logo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateFoundation = (field, value) => {
    setFoundations(foundations.map(f =>
      f.id === selectedFoundationId ? { ...f, [field]: value } : f
    ));
  };

  const handleContactChange = (field, value) => {
    setFoundations(foundations.map(f =>
      f.id === selectedFoundationId
        ? { ...f, contact: { ...f.contact, [field]: value } }
        : f
    ));
  };

  const handleStatChange = (index, field, value) => {
    const newStats = [...selectedFoundation.stats];
    newStats[index][field] = value;
    updateFoundation("stats", newStats);
  };

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
  };

  const handleDelete = (type, index) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      if (type === "activity") {
        updateFoundation("keyActivities", selectedFoundation.keyActivities.filter((_, i) => i !== index));
      } else if (type === "objective") {
        updateFoundation("objectives", selectedFoundation.objectives.filter((_, i) => i !== index));
      } else if (type === "supportive") {
        updateFoundation("supportiveObjectives", selectedFoundation.supportiveObjectives.filter((_, i) => i !== index));
      }
    }
  };

  const handleSaveAll = () => {
    console.log("Saving all foundations:", foundations);
    alert("All foundations saved successfully!");
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
                  : "Edit foundation details and information"
                }
              </p>
            </div>
            <div className="flex gap-3">
              {currentView === "edit" && (
                <button
                  onClick={() => setCurrentView("list")}
                  className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
                >
                  <ArrowLeft size={20} />
                  Back to List
                </button>
              )}
              <button
                onClick={handleSaveAll}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
              >
                <Save size={20} />
                Save All
              </button>
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
                    
                    <div className="text-sm text-gray-500 mb-4">
                      <div className="flex justify-between mb-1">
                        <span>Established:</span>
                        <span className="font-semibold">{foundation.established}</span>
                      </div>
                      <div className="flex justify-between mb-1">
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
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
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
                      Recommended: Square image, min 200x200px
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Foundation Name (संस्था का नाम) *
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
                      <div key={index} className="border-2 border-gray-200 rounded-xl p-6">
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
                    <div className="text-center py-12 text-gray-500">
                      <p>No activities added yet. Click &quot;Add Activity&quot; to get started.</p>
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
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete("activity", index)}
                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
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
                    <div className="text-center py-12 text-gray-500">
                      <p>No objectives added yet. Click &quot;Add Objective&quot; to get started.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedFoundation.objectives.map((objective, index) => (
                        <div key={index} className="border-2 border-gray-200 rounded-xl p-6 hover:border-orange-300 transition">
                          <div className="flex justify-between items-start gap-4 mb-3">
                            <h3 className="text-lg font-bold text-orange-900" style={{ fontFamily: 'Noto Serif Devanagari, Georgia, serif' }}>
                              {objective.title}
                            </h3>
                            <div className="flex gap-2">
                              <button
                                onClick={() => openModal("objective", index)}
                                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete("objective", index)}
                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
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
                    <div className="text-center py-12 text-gray-500">
                      <p>No supportive objectives added yet. Click &quot;Add Supportive Objective&quot; to get started.</p>
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
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete("supportive", index)}
                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
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
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-amber-600 text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                  {editIndex !== null ? "Edit" : "Add"}{" "}
                  {modalType === "activity" ? "Activity" : modalType === "objective" ? "Objective" : "Supportive Objective"}
                </h2>
                <button
                  onClick={closeModal}
                  className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
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
                        Title (शीर्षक) *
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
                        Description (विवरण) *
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
                      {modalType === "activity" ? "Activity" : "Supportive Objective"} Text *
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
    </div>
  );
}