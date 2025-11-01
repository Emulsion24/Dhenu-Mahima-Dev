"use client";
import React, { useState, useEffect } from "react";
import { Save, Plus, Trash2, Edit2, X, Eye, Mail, Phone, MapPin } from "lucide-react";
import API from "@/lib/api";

export default function PrivacyPolicyAdmin() {
  const [policyData, setPolicyData] = useState({
    title: '',
    subtitle: '',
    lastUpdated: '',
    sections: [],
    contact: {
      email: '',
      phone: '',
      phoneHours: '',
      address: ''
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [tempData, setTempData] = useState({});
  const [showPreview, setShowPreview] = useState(false);

  // Fetch policy data on mount
  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await API.get("/privacy-policy");
        const data = response.data;
        
        // Sort sections by order field
        const sortedSections = (data.sections || []).sort((a, b) => a.order - b.order);
        
        // Convert backend ids to strings for frontend consistency
        const sectionsWithStringIds = sortedSections.map(section => ({
          ...section,
          id: `section-${section.id}` // Convert number to string format
        }));
        
        setPolicyData({
          title: data.title || '',
          subtitle: data.subtitle || '',
          lastUpdated: data.lastUpdated || new Date().toISOString().split('T')[0],
          sections: sectionsWithStringIds,
          contact: {
            email: data.contact?.email || '',
            phone: data.contact?.phone || '',
            phoneHours: data.contact?.phoneHours || '',
            address: data.contact?.address || ''
          }
        });
      } catch (err) {
        console.error("Error fetching policy:", err);
        // Don't alert, just log and continue with empty data
        console.warn("Starting with empty policy data");
      } finally {
        setLoading(false);
      }
    };
    fetchPolicy();
  }, []);

  // Save all data
  const handleSaveAll = async () => {
    try {
      // Remove id field from sections before sending (backend will auto-generate)
      const dataToSend = {
        ...policyData,
        sections: policyData.sections.map(({ id, ...section }) => section)
      };
      
      await API.post("/privacy-policy", dataToSend);
      alert("Privacy Policy saved successfully!");
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save policy. Please try again.");
    }
  };

  // Handle basic info changes
  const handleBasicInfoChange = (field, value) => {
    setPolicyData({ ...policyData, [field]: value });
  };

  // Handle contact info changes
  const handleContactChange = (field, value) => {
    setPolicyData({
      ...policyData,
      contact: { ...policyData.contact, [field]: value }
    });
  };

  // Open add section modal
  const openAddSection = () => {
    setEditingSection(null);
    setTempData({ title: '', content: '' });
    setShowModal(true);
  };

  // Open edit section modal
  const openEditSection = (section) => {
    setEditingSection(section);
    setTempData({ title: section.title, content: section.content });
    setShowModal(true);
  };

  // Submit section (add or edit)
  const handleSectionSubmit = () => {
    if (!tempData.title || !tempData.content) {
      alert('Please fill all fields');
      return;
    }

    if (editingSection) {
      // Update existing section
      setPolicyData({
        ...policyData,
        sections: policyData.sections.map(s =>
          s.id === editingSection.id
            ? { ...s, title: tempData.title, content: tempData.content, order: s.order }
            : s
        )
      });
      alert('Section updated successfully!');
    } else {
      // Add new section
      const newSection = {
        id: `section-${Date.now()}`,
        title: tempData.title,
        content: tempData.content,
        order: policyData.sections.length
      };
      setPolicyData({
        ...policyData,
        sections: [...policyData.sections, newSection]
      });
      alert('Section added successfully!');
    }

    setShowModal(false);
    setTempData({});
    setEditingSection(null);
  };

  // Delete section
  const handleDeleteSection = (id) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      const filteredSections = policyData.sections.filter(s => s.id !== id);
      
      // Reorder remaining sections
      filteredSections.forEach((section, idx) => {
        section.order = idx;
      });
      
      setPolicyData({
        ...policyData,
        sections: filteredSections
      });
    }
  };

  // Move section up or down
  const moveSection = (index, direction) => {
    const newSections = [...policyData.sections];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < newSections.length) {
      [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
      
      // Update order values after swapping
      newSections.forEach((section, idx) => {
        section.order = idx;
      });
      
      setPolicyData({ ...policyData, sections: newSections });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                Privacy Policy Management
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Manage your privacy policy content and contact information
              </p>
            </div>
            {/* Responsive button group */}
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={() => setShowPreview(true)}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors shadow-md text-sm sm:text-base"
              >
                <Eye size={18} className="sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Preview</span>
                <span className="sm:hidden">View</span>
              </button>
              <button
                onClick={handleSaveAll}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors shadow-md text-sm sm:text-base"
              >
                <Save size={18} className="sm:w-5 sm:h-5" />
                Save All
              </button>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">
            Basic Information
          </h2>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm sm:text-base text-gray-700 font-semibold mb-2">
                Page Title
              </label>
              <input
                type="text"
                value={policyData.title}
                onChange={(e) => handleBasicInfoChange('title', e.target.value)}
                className="w-full text-sm sm:text-base text-gray-800 px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="Privacy Policy"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base text-gray-700 font-semibold mb-2">
                Subtitle
              </label>
              <textarea
                value={policyData.subtitle}
                onChange={(e) =>
                  handleBasicInfoChange('subtitle', e.target.value)
                }
                rows="3"
                className="w-full text-sm sm:text-base text-gray-800 px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="Brief description about your privacy policy"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base text-gray-700 font-semibold mb-2">
                Last Updated Date
              </label>
              <input
                type="date"
                value={
  policyData?.lastUpdated
    ? new Date(policyData.lastUpdated).toISOString().split("T")[0]
    : ""
}
                onChange={(e) =>
                  handleBasicInfoChange('lastUpdated', e.target.value)
                }
                className="w-full text-sm sm:text-base text-gray-800 px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          {/* Responsive section header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
              Policy Sections
            </h2>
            <button
              onClick={openAddSection}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 sm:py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base"
            >
              <Plus size={18} className="sm:w-5 sm:h-5" />
              Add Section
            </button>
          </div>

          {policyData.sections.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-2">No sections added yet</p>
              <p className="text-sm">
                Click &quot;Add Section&quot; to create your first section
              </p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {policyData.sections.map((section, index) => (
                <div
                  key={section.id}
                  className="border-2 border-gray-200 rounded-xl p-4 sm:p-6 hover:border-blue-300 transition-all"
                >
                  {/* Responsive section item layout */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-blue-100 text-xs sm:text-sm font-bold text-blue-700 flex-shrink-0">
                          {index + 1}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-800 break-words">
                          {section.title}
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 line-clamp-2 ml-9 sm:ml-11">
                        {section.content}
                      </p>
                    </div>
                    {/* Responsive button group for section item */}
                    <div className="flex gap-1.5 sm:gap-2 w-full sm:w-auto justify-end sm:justify-start flex-shrink-0">
                      <button
                        onClick={() => moveSection(index, 'up')}
                        disabled={index === 0}
                        className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm sm:text-base"
                        title="Move Up"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveSection(index, 'down')}
                        disabled={index === policyData.sections.length - 1}
                        className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm sm:text-base"
                        title="Move Down"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => openEditSection(section)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <Edit2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </button>
                      <button
                        onClick={() => handleDeleteSection(section.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">
            Contact Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm sm:text-base text-gray-700 font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  value={policyData.contact.email}
                  onChange={(e) =>
                    handleContactChange('email', e.target.value)
                  }
                  className="w-full text-sm sm:text-base text-gray-800 pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="privacy@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm sm:text-base text-gray-700 font-semibold mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="tel"
                  value={policyData.contact.phone}
                  onChange={(e) =>
                    handleContactChange('phone', e.target.value)
                  }
                  className="w-full text-sm sm:text-base text-gray-800 pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="+91 123 456 7890"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm sm:text-base text-gray-700 font-semibold mb-2">
                Phone Hours
              </label>
              <input
                type="text"
                value={policyData.contact.phoneHours}
                onChange={(e) =>
                  handleContactChange('phoneHours', e.target.value)
                }
                className="w-full text-sm sm:text-base text-gray-800 px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="Mon-Fri, 9am - 5pm IST"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base text-gray-700 font-semibold mb-2">
                Mailing Address
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-3 sm:left-4 top-3 sm:top-4 text-gray-400"
                  size={18}
                />
                <textarea
                  value={policyData.contact.address}
                  onChange={(e) =>
                    handleContactChange('address', e.target.value)
                  }
                  rows="3"
                  className="w-full text-sm sm:text-base text-gray-800 pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Full mailing address"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 sm:p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl font-bold">
                  {editingSection ? 'Edit Section' : 'Add New Section'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="hover:bg-white hover:bg-opacity-20 p-1.5 sm:p-2 rounded-lg transition-colors"
                >
                  <X size={20} className="sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm sm:text-base text-gray-700 font-semibold mb-2">
                    Section Title *
                  </label>
                  <input
                    type="text"
                    value={tempData.title || ''}
                    onChange={(e) =>
                      setTempData({ ...tempData, title: e.target.value })
                    }
                    className="w-full text-sm sm:text-base text-gray-800 px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., Data Security"
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base text-gray-700 font-semibold mb-2">
                    Section Content *
                  </label>
                  <textarea
                    value={tempData.content || ''}
                    onChange={(e) =>
                      setTempData({ ...tempData, content: e.target.value })
                    }
                    rows="10"
                    className="w-full text-sm sm:text-base text-gray-800 px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none font-mono"
                    placeholder="Enter the content for this section. Use \n\n for paragraphs and • for bullet points."
                  />
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    Tips: Use double line breaks (\n\n) to separate paragraphs.
                    Use • or - for bullet points.
                  </p>
                </div>
              </div>

              {/* Responsive modal buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                <button
                  onClick={handleSectionSubmit}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base order-1"
                >
                  <Save size={18} className="sm:w-5 sm:h-5" />
                  {editingSection ? 'Update Section' : 'Add Section'}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base order-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 sm:p-6 rounded-t-xl z-10">
              <div className="flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl font-bold">
                  Privacy Policy Preview
                </h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="hover:bg-white hover:bg-opacity-20 p-1.5 sm:p-2 rounded-lg transition-colors"
                >
                  <X size={20} className="sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 lg:p-8">
              {/* Responsive Preview Header */}
              <div className="text-center mb-8 sm:mb-12">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {policyData.title || 'Privacy Policy'}
                </h1>
                {policyData.subtitle && (
                  <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mb-3 sm:mb-4 px-2">
                    {policyData.subtitle}
                  </p>
                )}
                {policyData.lastUpdated && (
                  <p className="text-xs sm:text-sm text-gray-500">
                    Last Updated:{' '}
                    {/* Added timeZone: 'UTC' to prevent off-by-one day errors from date string parsing */}
                    {new Date(policyData.lastUpdated).toLocaleDateString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        timeZone: 'UTC',
                      }
                    )}
                  </p>
                )}
              </div>

              {/* Responsive Preview Sections */}
              {policyData.sections.length > 0 ? (
                <div className="space-y-8 sm:space-y-12 mb-8 sm:mb-12">
                  {policyData.sections.map((section, index) => (
                    <div
                      key={section.id}
                      className="border-l-4 border-blue-500 pl-4 sm:pl-6"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <span className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-blue-500 text-base sm:text-xl font-bold text-white flex-shrink-0">
                          {index + 1}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">
                          {section.title}
                        </h2>
                      </div>
                      <div className="text-sm sm:text-base text-gray-700 whitespace-pre-line leading-relaxed">
                        {section.content}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 mb-12 text-gray-500">
                  <p>No sections added yet</p>
                </div>
              )}

              {/* Responsive Preview Contact Section */}
              <div className="border-t-4 border-blue-500 pt-6 sm:pt-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Contact Us
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {policyData.contact.email && (
                    <div className="border rounded-xl p-4 sm:p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-3 mb-2">
                        <Mail className="text-blue-600" size={20} />
                        <h4 className="text-sm sm:text-base font-semibold text-gray-800">
                          Email Us
                        </h4>
                      </div>
                      <p className="text-gray-500 text-xs sm:text-sm mb-2">
                        For any privacy concerns
                      </p>
                      <a
                        href={`mailto:${policyData.contact.email}`}
                        className="text-blue-600 font-medium break-all hover:underline text-sm sm:text-base"
                      >
                        {policyData.contact.email}
                      </a>
                    </div>
                  )}

                  {policyData.contact.phone && (
                    <div className="border rounded-xl p-4 sm:p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-3 mb-2">
                        <Phone className="text-blue-600" size={20} />
                        <h4 className="text-sm sm:text-base font-semibold text-gray-800">
                          Call Us
                        </h4>
                      </div>
                      {policyData.contact.phoneHours && (
                        <p className="text-gray-500 text-xs sm:text-sm mb-2">
                          {policyData.contact.phoneHours}
                        </p>
                      )}
                      <a
                        href={`tel:${policyData.contact.phone}`}
                        className="text-blue-600 font-medium hover:underline text-sm sm:text-base"
                      >
                        {policyData.contact.phone}
                      </a>
                    </div>
                  )}

                  {policyData.contact.address && (
                    <div className="border rounded-xl p-4 sm:p-6 hover:shadow-lg transition-shadow md:col-span-2">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="text-blue-600" size={20} />
                        <h4 className="text-sm sm:text-base font-semibold text-gray-800">
                          Mailing Address
                        </h4>
                      </div>
                      <p className="text-gray-500 text-xs sm:text-sm mb-2">
                        Send us mail
                      </p>
                      <address className="not-italic text-gray-600 whitespace-pre-line text-sm sm:text-base">
                        {policyData.contact.address}
                      </address>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}