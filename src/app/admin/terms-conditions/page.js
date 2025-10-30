"use client";
import React, { useState,useEffect } from "react";
import { Save, Plus, Trash2, Edit2, X, Eye, Calendar, Mail, Phone, MapPin } from "lucide-react";
import API from "@/lib/api";

export default function TermsConditionsAdmin() {
  const [termsData, setTermsData] = useState({
    lastUpdated: "",
    title: "",
    subtitle: "",
    sections: [],
    contact: { email: "", phone: "", phoneHours: "", address: "" }
  });

  const [showModal, setShowModal] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [tempData, setTempData] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch Terms & Conditions from backend
  useEffect(() => {
  const fetchTerms = async () => {
    try {
      setLoading(true);
      const res = await API.get("/terms-conditions");
      const data = res.data || {};  // <- ensure data is not null

      const mappedSections = (data.sections ?? []).map(s => ({
        id: s.id ?? `temp-${Date.now()}`,  // fallback id if null
        title: s.title || "",
        content: s.content || "",
        order: s.order ?? 0
      }));

      setTermsData({
        title: data.title || "",
        subtitle: data.subtitle || "",
        lastUpdated: data.lastUpdated
          ? new Date(data.lastUpdated).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
          : "",
        sections: mappedSections,
        contact: data.contact || { email: "", phone: "", phoneHours: "", address: "" }
      });
    } catch (err) {
      console.error(err);
      alert("Error fetching terms data");
    } finally {
      setLoading(false);
    }
  };

  fetchTerms();
}, []);


  // Handle input changes
  const handleBasicInfoChange = (field, value) => setTermsData({ ...termsData, [field]: value });
  const handleContactChange = (field, value) => setTermsData({ ...termsData, contact: { ...termsData.contact, [field]: value } });

  // Section modal
  const openAddSection = () => {
    setEditingSection(null);
    setTempData({ title: "", content: "" });
    setShowModal(true);
  };

  const openEditSection = (section) => {
    setEditingSection(section);
    setTempData({ title: section.title, content: section.content });
    setShowModal(true);
  };

  const handleSectionSubmit = () => {
    if (!tempData.title || !tempData.content) {
      alert("Please fill all fields");
      return;
    }

    if (editingSection) {
      setTermsData({
        ...termsData,
        sections: termsData.sections.map(s =>
          s.id === editingSection.id
            ? { ...s, title: tempData.title, content: tempData.content }
            : s
        )
      });
    } else {
      const newSection = { id: `temp-${Date.now()}`, title: tempData.title, content: tempData.content };
      setTermsData({ ...termsData, sections: [...termsData.sections, newSection] });
    }

    setShowModal(false);
    setTempData({});
    setEditingSection(null);
  };

  const handleDeleteSection = (id) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      setTermsData({ ...termsData, sections: termsData.sections.filter(s => s.id !== id) });
    }
  };

  const moveSection = (index, direction) => {
    const newSections = [...termsData.sections];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < newSections.length) {
      [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
      setTermsData({ ...termsData, sections: newSections });
    }
  };

  // Save all to backend
  const handleSaveAll = async () => {
    try {
      setLoading(true);

      // Map sections for backend
      const payload = {
        ...termsData,
        sections: termsData.sections.map((s, index) => ({ title: s.title, content: s.content, order: index }))
      };

      const res = await API.post("/terms-conditions", payload);
      const saved = res.data;

      setTermsData(prev => ({
        ...prev,
        lastUpdated: new Date(saved.lastUpdated).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
      }));

      alert("Terms & Conditions saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving terms data");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-orange-900 mb-2">
                Terms & Conditions Management
              </h1>
              <p className="text-gray-600">
                Manage your terms of service content and contact information
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPreview(true)}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
              >
                <Eye size={20} />
                Preview
              </button>
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

        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-orange-900 mb-6">Basic Information</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Page Title
              </label>
              <input
                type="text"
                value={termsData.title}
                onChange={(e) => handleBasicInfoChange('title', e.target.value)}
                className="w-full text-gray-800 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                placeholder="Terms of Seva (Service)"
              />
            </div>

            <div>
              <label className="block text-gray-800 font-semibold mb-2">
                Subtitle
              </label>
              <textarea
                value={termsData.subtitle}
                onChange={(e) => handleBasicInfoChange('subtitle', e.target.value)}
                rows="3"
                className="w-full text-gray-800 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                placeholder="Brief description"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Last Updated Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800" size={20} />
                <input
                  type="text"
                  value={termsData.lastUpdated}
                  onChange={(e) => handleBasicInfoChange('lastUpdated', e.target.value)}
                  className="w-full text-gray-800 pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                  placeholder="October 5, 2025"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-orange-900">Terms Sections</h2>
            <button
              onClick={openAddSection}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              <Plus size={20} />
              Add Section
            </button>
          </div>

          <div className="space-y-4">
            {termsData.sections.map((section, index) => (
              <div
                key={section.id}
                className="border-2 border-gray-200 rounded-xl p-6 hover:border-orange-300 transition-all"
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-white">
                        {index + 1}
                      </span>
                      <h3 className="text-xl font-bold text-orange-900">
                        {section.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 line-clamp-2 ml-11">
                      {section.content}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => moveSection(index, 'up')}
                      disabled={index === 0}
                      className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move Up"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveSection(index, 'down')}
                      disabled={index === termsData.sections.length - 1}
                      className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move Down"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => openEditSection(section)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteSection(section.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-orange-900 mb-6">Contact Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={termsData.contact.email}
                  onChange={(e) => handleContactChange('email', e.target.value)}
                  className="w-full text-gray-800 pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                  placeholder="seva@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  value={termsData.contact.phone}
                  onChange={(e) => handleContactChange('phone', e.target.value)}
                  className="w-full text-gray-800 pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                  placeholder="+91 123 456 7890"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Phone Hours
              </label>
              <input
                type="text"
                value={termsData.contact.phoneHours}
                onChange={(e) => handleContactChange('phoneHours', e.target.value)}
                className="w-full px-4 text-gray-800 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                placeholder="Mon-Fri, 9am - 5pm IST"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Mailing Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-gray-400" size={20} />
                <textarea
                  value={termsData.contact.address}
                  onChange={(e) => handleContactChange('address', e.target.value)}
                  rows="3"
                  className="w-full text-gray-800 pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                  placeholder="Full mailing address"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-yellow-500 text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                  {editingSection ? 'Edit Section' : 'Add New Section'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Section Title *
                  </label>
                  <input
                    type="text"
                    value={tempData.title || ''}
                    onChange={(e) => setTempData({ ...tempData, title: e.target.value })}
                    className="w-full text-gray-800 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                    placeholder="e.g., Community Dharma"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Section Content *
                  </label>
                  <textarea
                    value={tempData.content || ''}
                    onChange={(e) => setTempData({ ...tempData, content: e.target.value })}
                    rows="12"
                    className="w-full text-gray-800 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none font-mono text-sm"
                    placeholder="Enter the content for this section. Use \n\n for paragraphs and • for bullet points."
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Tips: Use double line breaks (\n\n) to separate paragraphs. Use • or - for bullet points.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleSectionSubmit}
                  className="flex-1 flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <Save size={20} />
                  {editingSection ? 'Update Section' : 'Add Section'}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-t-xl z-10">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Terms & Conditions Preview</h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{termsData.title}</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">{termsData.subtitle}</p>
                <p className="text-sm text-gray-500">Last Updated: {termsData.lastUpdated}</p>
              </div>

              {/* Sections */}
              <div className="space-y-12 mb-12">
                {termsData.sections.map((section, index) => (
                  <div key={section.id} className="border-l-4 border-orange-500 pl-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-xl font-bold text-white">
                        {index + 1}
                      </span>
                      <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                    </div>
                    <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                      {section.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Section */}
              <div className="border-t-4 border-orange-500 pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h4 className="font-semibold text-gray-800 mb-2">Email Us</h4>
                    <p className="text-gray-500 text-sm mb-2">For any questions or concerns</p>
                    <a href={`mailto:${termsData.contact.email}`} className="text-yellow-600 font-medium break-all">
                      {termsData.contact.email}
                    </a>
                  </div>
                  <div className="border rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h4 className="font-semibold text-gray-800 mb-2">Call Us</h4>
                    <p className="text-gray-500 text-sm mb-2">{termsData.contact.phoneHours}</p>
                    <a href={`tel:${termsData.contact.phone}`} className="text-yellow-600 font-medium">
                      {termsData.contact.phone}
                    </a>
                  </div>
                  <div className="border rounded-xl p-6 hover:shadow-lg transition-shadow md:col-span-2">
                    <h4 className="font-semibold text-gray-800 mb-2">Mailing Address</h4>
                    <p className="text-gray-500 text-sm mb-2">Send us mail</p>
                    <address className="not-italic text-gray-600 whitespace-pre-line">
                      {termsData.contact.address}
                    </address>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}