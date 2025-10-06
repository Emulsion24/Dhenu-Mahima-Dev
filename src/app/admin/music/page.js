"use client";

import { useState, useRef } from "react";
import { Edit, Trash2, Search, Plus, Mic, Upload, X, Play, Pause, Music, ImageIcon, Tag, User, Album } from "lucide-react";

export default function BhajanPage() {
  const [bhajanList, setBhajanList] = useState([
    { 
      id: 1, 
      name: "Om Namah Shivaya", 
      category: "Shiva Bhajan",
      artist: "Anup Jalota", 
      album: "Divine Chants",
      image: null,
      audioUrl: null,
      duration: "4:23"
    },
    { 
      id: 2, 
      name: "Hare Krishna Hare Rama", 
      category: "Krishna Bhajan",
      artist: "Jagjit Singh", 
      album: "Bhakti Sangeet",
      image: null,
      audioUrl: null,
      duration: "5:12"
    },
    { 
      id: 3, 
      name: "Jai Hanuman", 
      category: "Hanuman Bhajan",
      artist: "Hari Om Sharan", 
      album: "Devotional Songs",
      image: null,
      audioUrl: null,
      duration: "3:45"
    },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [editBhajan, setEditBhajan] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    artist: "",
    album: "",
    image: null,
    audioFile: null,
    duration: "0:00"
  });

  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const categories = [
    "Shiva Bhajan",
    "Krishna Bhajan",
    "Hanuman Bhajan",
    "Durga Bhajan",
    "Ganesh Bhajan",
    "Ram Bhajan",
    "Jeevan Sutra",
    "Other"
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const audio = new Audio(url);
      audio.onloadedmetadata = () => {
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60);
        setFormData({ 
          ...formData, 
          audioFile: url,
          duration: `${minutes}:${seconds.toString().padStart(2, '0')}`
        });
      };
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio(audioUrl);
        setFormData({ ...formData, audioFile: audioUrl });
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      alert("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleSaveBhajan = () => {
    if (!formData.name || !formData.category || !formData.artist) {
      alert("Please fill in all required fields");
      return;
    }

    if (editBhajan) {
      setBhajanList(bhajanList.map((b) => 
        b.id === editBhajan.id ? { ...formData, id: b.id } : b
      ));
    } else {
      setBhajanList([{ ...formData, id: bhajanList.length + 1 }, ...bhajanList]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      artist: "",
      album: "",
      image: null,
      audioFile: null,
      duration: "0:00"
    });
    setRecordedAudio(null);
    setEditBhajan(null);
    setShowModal(false);
    setModalType("add");
  };

  const openEditModal = (bhajan) => {
    setEditBhajan(bhajan);
    setFormData(bhajan);
    setModalType("edit");
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this bhajan?")) {
      setBhajanList(bhajanList.filter((b) => b.id !== id));
    }
  };

  const togglePlay = (id) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  const filteredBhajans = bhajanList.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.artist.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl shadow-lg">
              <Music className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Bhajan Management
            </h1>
          </div>
          <p className="text-neutral-600 ml-14">Manage your spiritual music collection</p>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-2xl border border-orange-100 p-4 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search bhajans..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-orange-50 border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-neutral-900 placeholder-neutral-400"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setModalType("record");
                  setShowModal(true);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-md font-medium"
              >
                <Mic className="w-5 h-5" /> Record
              </button>
              <button
                onClick={() => {
                  setModalType("add");
                  setShowModal(true);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-md font-medium"
              >
                <Plus className="w-5 h-5" /> Add Bhajan
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-orange-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-500 text-sm font-medium mb-1">Total Bhajans</p>
                <p className="text-2xl font-bold text-neutral-900">{bhajanList.length}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <Music className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-orange-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-500 text-sm font-medium mb-1">Categories</p>
                <p className="text-2xl font-bold text-neutral-900">{categories.length}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-xl">
                <Tag className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-orange-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-500 text-sm font-medium mb-1">Artists</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {new Set(bhajanList.map(b => b.artist)).size}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <User className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Bhajan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBhajans.length > 0 ? (
            filteredBhajans.map((bhajan) => (
              <div
                key={bhajan.id}
                className="bg-white rounded-2xl border border-orange-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-orange-200 to-amber-200 overflow-hidden">
                  {bhajan.image ? (
                    <img src={bhajan.image} alt={bhajan.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Music className="w-16 h-16 text-orange-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <button
                      onClick={() => togglePlay(bhajan.id)}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    >
                      {playingId === bhajan.id ? (
                        <Pause className="w-5 h-5 text-orange-600" />
                      ) : (
                        <Play className="w-5 h-5 text-orange-600 ml-1" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-3">
                    <h3 className="font-bold text-lg text-neutral-900 mb-1 truncate">{bhajan.name}</h3>
                    <p className="text-sm text-neutral-600 truncate">{bhajan.artist}</p>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium border border-orange-200">
                      {bhajan.category}
                    </span>
                    <span className="text-xs text-neutral-500">{bhajan.duration}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-neutral-600 mb-4">
                    <Album className="w-4 h-4" />
                    <span className="truncate">{bhajan.album}</span>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-neutral-100">
                    <button
                      onClick={() => openEditModal(bhajan)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors font-medium text-sm"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(bhajan.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors font-medium text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white rounded-2xl border border-orange-100 p-12 text-center">
              <Music className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-400 font-medium">No bhajans found</p>
              <p className="text-neutral-400 text-sm mt-1">Try adjusting your search or add new bhajans</p>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={resetForm}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                {modalType === "record" ? "Record Jeevan Sutra" : editBhajan ? "Edit Bhajan" : "Add New Bhajan"}
              </h2>

              {/* Recording Section */}
              {modalType === "record" && (
                <div className="mb-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="flex flex-col items-center gap-4">
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}>
                      <Mic className="w-12 h-12 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-neutral-900 mb-1">
                        {isRecording ? "Recording in progress..." : "Ready to record"}
                      </p>
                      <p className="text-sm text-neutral-600">
                        {isRecording ? "Click stop when finished" : "Click the button below to start"}
                      </p>
                    </div>
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`px-8 py-3 rounded-xl text-white font-medium shadow-md transition-all duration-200 ${
                        isRecording 
                          ? 'bg-red-500 hover:bg-red-600' 
                          : 'bg-green-500 hover:bg-green-600'
                      }`}
                    >
                      {isRecording ? "Stop Recording" : "Start Recording"}
                    </button>
                    {recordedAudio && (
                      <div className="w-full mt-4">
                        <audio src={recordedAudio} controls className="w-full" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Upload Audio */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-neutral-700 mb-3">
                  Audio File {modalType !== "record" && <span className="text-red-500">*</span>}
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioChange}
                    className="hidden"
                    id="audio-upload"
                  />
                  <label
                    htmlFor="audio-upload"
                    className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-orange-50 border-2 border-dashed border-orange-300 rounded-xl cursor-pointer hover:bg-orange-100 transition-colors"
                  >
                    <Upload className="w-6 h-6 text-orange-600" />
                    <span className="text-orange-700 font-medium">
                      {formData.audioFile ? "Audio uploaded" : "Upload audio file"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-neutral-700 mb-3">Cover Image</label>
                <div className="flex items-center gap-4">
                  {formData.image && (
                    <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-orange-200">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center gap-3 w-full px-6 py-3 bg-amber-50 border-2 border-dashed border-amber-300 rounded-xl cursor-pointer hover:bg-amber-100 transition-colors"
                    >
                      <ImageIcon className="w-5 h-5 text-amber-600" />
                      <span className="text-amber-700 font-medium">
                        {formData.image ? "Change image" : "Upload cover image"}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Bhajan Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter bhajan name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-neutral-900"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Artist Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter artist name"
                    value={formData.artist}
                    onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                    className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Album Name</label>
                  <input
                    type="text"
                    placeholder="Enter album name"
                    value={formData.album}
                    onChange={(e) => setFormData({ ...formData, album: e.target.value })}
                    className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-neutral-900"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={resetForm}
                  className="flex-1 px-6 py-3 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveBhajan}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 transition-all shadow-md font-medium"
                >
                  {editBhajan ? "Update Bhajan" : "Save Bhajan"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}