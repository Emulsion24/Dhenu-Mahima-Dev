"use client";
import { useState, useEffect } from "react";
import API from "@/lib/api";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Calendar,
  MapPin,
  Clock,
  Palette,
  Youtube,
  AlertCircle,
  RefreshCw
} from "lucide-react";


const colorOptions = [
  { value: "from-orange-500 to-red-500", label: "Orange to Red" },
  { value: "from-amber-500 to-orange-500", label: "Amber to Orange" },
  { value: "from-yellow-500 to-amber-500", label: "Yellow to Amber" },
  { value: "from-green-500 to-emerald-500", label: "Green to Emerald" },
  { value: "from-teal-500 to-cyan-500", label: "Teal to Cyan" },
  { value: "from-cyan-500 to-blue-500", label: "Cyan to Blue" },
  { value: "from-blue-500 to-indigo-500", label: "Blue to Indigo" },
  { value: "from-purple-500 to-pink-500", label: "Purple to Pink" },
  { value: "from-pink-500 to-rose-500", label: "Pink to Rose" },
  { value: "from-red-500 to-orange-500", label: "Red to Orange" },
];

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    time: "",
    location: "",
    duration: "",
    color: "from-orange-500 to-red-500",
    liveLinks: [""],
    description: ""
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/events`);
      if (response.data.success) {
        setEvents(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      alert('Error fetching events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCleanup = async () => {
    if (!window.confirm('Do you want to manually cleanup expired events?')) {
      return;
    }
    
    try {
      const response = await API.get(`/events/cleanup`);
      const data=response.data
      if (data.success) {
        alert(data.message);
        fetchEvents();
      }
    } catch (error) {
      console.error('Error during cleanup:', error);
      alert('Error during cleanup. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLiveLinkChange = (index, value) => {
    const newLinks = [...formData.liveLinks];
    newLinks[index] = value;
    setFormData(prev => ({ ...prev, liveLinks: newLinks }));
  };

  const addLiveLink = () => {
    setFormData(prev => ({ 
      ...prev, 
      liveLinks: [...prev.liveLinks, ""] 
    }));
  };

  const removeLiveLink = (index) => {
    const newLinks = formData.liveLinks.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, liveLinks: newLinks }));
  };

  const openAddModal = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      startDate: "",
      endDate: "",
      time: "",
      location: "",
      duration: "",
      color: "from-orange-500 to-red-500",
      liveLinks: [""],
      description: ""
    });
    setShowModal(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      startDate: event.startDate.split('T')[0],
      endDate: event.endDate.split('T')[0],
      time: event.time || "",
      location: event.location,
      duration: event.duration,
      color: event.color,
      liveLinks: event.liveLinks.length > 0 ? event.liveLinks : [""],
      description: event.description || ""
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingEvent(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const submitData = {
        ...formData,
        liveLinks: formData.liveLinks.filter(link => link.trim() !== "")
      };

      const url = editingEvent 
        ? `/events/${editingEvent.id}`
        : `/events`
      
          const response = editingEvent ? await API.put(url,submitData) : await API.post(url,submitData)
 
      const data=response.data;
      if (data.success) {
        alert(data.message);
        fetchEvents();
        closeModal();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(error.response?.data?.message || 'Error submitting form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      const response = await API.delete(`/events/${id}`);
      const data=response.data
      if (data.success) {
        alert(data.message);
        fetchEvents();
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('hi-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-orange-200 p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
                आगामी कथा प्रबंधन
              </h1>
              <p className="text-gray-600 font-medium">
                Manage upcoming events and programs
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCleanup}
                className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all shadow font-semibold"
              >
                <RefreshCw size={20} />
                Cleanup
              </button>
              <button
                onClick={openAddModal}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl hover:from-orange-700 hover:to-amber-700 transition-all shadow-lg font-semibold"
              >
                <Plus size={20} />
                Add Event
              </button>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {events.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                No Events Yet
              </h3>
              <p className="text-gray-500 mb-6">
                Add your first event to get started
              </p>
              <button
                onClick={openAddModal}
                className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-semibold"
              >
                Add Event
              </button>
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className={`bg-gradient-to-br ${event.color} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-white/50`}
              >
                <div className="bg-white/10 backdrop-blur-sm p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="inline-block px-4 py-1 bg-white/30 backdrop-blur-md text-white rounded-full font-bold text-sm mb-2">
                            {event.duration}
                          </div>
                          <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                            {event.title}
                          </h3>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(event)}
                            className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors shadow-lg"
                          >
                            <Edit size={18} className="text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
                            className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors shadow-lg"
                          >
                            <Trash2 size={18} className="text-red-600" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-white">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span className="text-sm">
                            {formatDate(event.startDate)} - {formatDate(event.endDate)}
                          </span>
                        </div>
                        {event.time && (
                          <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span className="text-sm">{event.time}</span>
                          </div>
                        )}
                        <div className="flex items-start gap-2">
                          <MapPin size={16} className="mt-0.5" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                        {event.liveLinks.length > 0 && (
                          <div className="flex items-center gap-2 flex-wrap">
                            <Youtube size={16} />
                            <span className="text-sm">
                              {event.liveLinks.join(', ')}
                            </span>
                          </div>
                        )}
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
              <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-amber-600 text-white p-6 flex justify-between items-center rounded-t-2xl z-10">
                <h2 className="text-2xl font-bold">
                  {editingEvent ? "Edit Event" : "Add New Event"}
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
                {/* Title */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-800 font-medium"
                    placeholder="e.g., 5 दिवसीय गौ कृपा कथा"
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-800 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-800 font-medium"
                    />
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Time (Optional)
                  </label>
                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-800 font-medium"
                    placeholder="e.g., शाम 7:00 से रात्रि 10:00 तक"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-800 font-medium"
                    placeholder="Full address"
                  />
                </div>

                {/* Duration and Color */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      Duration *
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-800 font-medium"
                      placeholder="e.g., 5 दिवसीय"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      Color Theme
                    </label>
                    <select
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-800 font-medium"
                    >
                      {colorOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Live Links */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    YouTube Live Links
                  </label>
                  {formData.liveLinks.map((link, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={link}
                        onChange={(e) => handleLiveLinkChange(index, e.target.value)}
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-800 font-medium"
                        placeholder="e.g., Dhenu TV"
                      />
                      {formData.liveLinks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLiveLink(index)}
                          className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                        >
                          <X size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addLiveLink}
                    className="mt-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-xl hover:bg-orange-200 transition-colors font-semibold text-sm flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add Another Link
                  </button>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-800 font-medium resize-none"
                    placeholder="Additional details about the event"
                  />
                </div>

                {/* Alert Box */}
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="text-orange-600 flex-shrink-0 mt-0.5" size={20} />
                  <div className="text-sm text-orange-800">
                    <p className="font-semibold mb-1">Auto-deletion Notice:</p>
                    <p>Events will be automatically deleted after the end date passes. Make sure to set the correct end date.</p>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={submitting}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl hover:from-orange-700 hover:to-amber-700 transition-all shadow-lg font-semibold disabled:opacity-50"
                  >
                    {submitting ? 'Saving...' : editingEvent ? "Update Event" : "Create Event"}
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