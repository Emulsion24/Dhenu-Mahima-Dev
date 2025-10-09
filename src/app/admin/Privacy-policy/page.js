"use client";
import React, { useState } from "react";
import { Save, Plus, Trash2, Edit2, X, Eye, Calendar, Mail, Phone, MapPin } from "lucide-react";

export default function PrivacyPolicyAdmin() {
  const [policyData, setPolicyData] = useState({
    lastUpdated: "October 5, 2025",
    title: "Privacy Policy",
    subtitle: "Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.",
    sections: [
      {
        id: 'introduction',
        title: 'Introduction',
        content: 'Welcome to Acow Sheva (we, our, or us). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us.\n\nWhen you use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy notice, we seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it. We hope you take some time to read through it carefully, as it is important.'
      },
      {
        id: 'information-collection',
        title: 'Information We Collect',
        content: 'We collect personal information that you voluntarily provide to us when you register on the services, express an interest in obtaining information about us or our products and services, when you participate in activities on the services, or otherwise when you contact us.\n\n• Personal Information You Disclose to Us: Name, email address, phone number, and payment information.\n• Information Automatically Collected: IP address, browser type, device information, operating system, and usage data.'
      },
      {
        id: 'information-use',
        title: 'How We Use Your Information',
        content: 'We use the information we collect or receive: to facilitate account creation and logon process, to post testimonials, to manage user accounts, to send administrative information to you, to protect our Services, to respond to user inquiries/offer support to users, and for other business purposes like data analysis and identifying usage trends.'
      },
      {
        id: 'information-sharing',
        title: 'Information Sharing',
        content: 'We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may share your data with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work.'
      },
      {
        id: 'data-security',
        title: 'Data Security',
        content: 'We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.'
      },
      {
        id: 'cookies',
        title: 'Cookies & Tracking',
        content: 'We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.'
      },
      {
        id: 'your-rights',
        title: 'Your Rights',
        content: 'In some regions (like the EEA, UK, and Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. To make such a request, please use the contact details provided below.'
      },
      {
        id: 'children-privacy',
        title: "Children's Privacy",
        content: 'We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependents use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records.'
      },
      {
        id: 'changes',
        title: 'Changes to Policy',
        content: 'We may update this privacy notice from time to time. The updated version will be indicated by an updated Revised date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.'
      }
    ],
    contact: {
      email: 'privacy@acowsheva.com',
      phone: '+91 123 456 7890',
      phoneHours: 'Mon-Fri, 9am - 5pm IST',
      address: '123 Dairy Farm Road,\nSheva District, Maharashtra,\nIndia - 400001'
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingSection, setEditingSection] = useState(null);
  const [tempData, setTempData] = useState({});
  const [showPreview, setShowPreview] = useState(false);

  const handleBasicInfoChange = (field, value) => {
    setPolicyData({ ...policyData, [field]: value });
  };

  const handleContactChange = (field, value) => {
    setPolicyData({
      ...policyData,
      contact: { ...policyData.contact, [field]: value }
    });
  };

  const openAddSection = () => {
    setEditingSection(null);
    setTempData({ title: '', content: '' });
    setModalType('section');
    setShowModal(true);
  };

  const openEditSection = (section) => {
    setEditingSection(section);
    setTempData({ title: section.title, content: section.content });
    setModalType('section');
    setShowModal(true);
  };

  const handleSectionSubmit = () => {
    if (!tempData.title || !tempData.content) {
      alert('Please fill all fields');
      return;
    }

    if (editingSection) {
      setPolicyData({
        ...policyData,
        sections: policyData.sections.map(s =>
          s.id === editingSection.id
            ? { ...s, title: tempData.title, content: tempData.content }
            : s
        )
      });
      alert('Section updated successfully!');
    } else {
      const newSection = {
        id: `section-${Date.now()}`,
        title: tempData.title,
        content: tempData.content
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

  const handleDeleteSection = (id) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      setPolicyData({
        ...policyData,
        sections: policyData.sections.filter(s => s.id !== id)
      });
    }
  };

  const moveSection = (index, direction) => {
    const newSections = [...policyData.sections];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < newSections.length) {
      [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
      setPolicyData({ ...policyData, sections: newSections });
    }
  };

  const handleSaveAll = () => {
    console.log('Saving policy data:', policyData);
    alert('Privacy Policy saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                Privacy Policy Management
              </h1>
              <p className="text-gray-600">
                Manage your privacy policy content and contact information
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
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Basic Information</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Page Title
              </label>
              <input
                type="text"
                value={policyData.title}
                onChange={(e) => handleBasicInfoChange('title', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="Privacy Policy"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Subtitle
              </label>
              <textarea
                value={policyData.subtitle}
                onChange={(e) => handleBasicInfoChange('subtitle', e.target.value)}
                rows="3"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="Brief description"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Last Updated Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={policyData.lastUpdated}
                  onChange={(e) => handleBasicInfoChange('lastUpdated', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="October 5, 2025"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Policy Sections</h2>
            <button
              onClick={openAddSection}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              <Plus size={20} />
              Add Section
            </button>
          </div>

          <div className="space-y-4">
            {policyData.sections.map((section, index) => (
              <div
                key={section.id}
                className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-all"
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                        {index + 1}
                      </span>
                      <h3 className="text-xl font-bold text-slate-800">
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
                      disabled={index === policyData.sections.length - 1}
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
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Contact Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={policyData.contact.email}
                  onChange={(e) => handleContactChange('email', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="privacy@example.com"
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
                  value={policyData.contact.phone}
                  onChange={(e) => handleContactChange('phone', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
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
                value={policyData.contact.phoneHours}
                onChange={(e) => handleContactChange('phoneHours', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
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
                  value={policyData.contact.address}
                  onChange={(e) => handleContactChange('address', e.target.value)}
                  rows="3"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
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
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-xl">
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., Data Security"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none font-mono text-sm"
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
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
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
                <h2 className="text-2xl font-bold">Privacy Policy Preview</h2>
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
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{policyData.title}</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">{policyData.subtitle}</p>
                <p className="text-sm text-gray-500">Last Updated: {policyData.lastUpdated}</p>
              </div>

              {/* Sections */}
              <div className="space-y-12 mb-12">
                {policyData.sections.map((section, index) => (
                  <div key={section.id} className="border-l-4 border-blue-500 pl-6">
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
              <div className="border-t-4 border-blue-500 pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h4 className="font-semibold text-gray-800 mb-2">Email Us</h4>
                    <p className="text-gray-500 text-sm mb-2">For any privacy concerns</p>
                    <a href={`mailto:${policyData.contact.email}`} className="text-yellow-600 font-medium break-all">
                      {policyData.contact.email}
                    </a>
                  </div>
                  <div className="border rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h4 className="font-semibold text-gray-800 mb-2">Call Us</h4>
                    <p className="text-gray-500 text-sm mb-2">{policyData.contact.phoneHours}</p>
                    <a href={`tel:${policyData.contact.phone}`} className="text-yellow-600 font-medium">
                      {policyData.contact.phone}
                    </a>
                  </div>
                  <div className="border rounded-xl p-6 hover:shadow-lg transition-shadow md:col-span-2">
                    <h4 className="font-semibold text-gray-800 mb-2">Mailing Address</h4>
                    <p className="text-gray-500 text-sm mb-2">Send us mail</p>
                    <address className="not-italic text-gray-600 whitespace-pre-line">
                      {policyData.contact.address}
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