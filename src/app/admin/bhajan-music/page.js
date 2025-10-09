"use client";
import { useState, useRef, useMemo } from "react";
import { Edit, Trash2, Search, Plus, Mic, Upload, X, Play, Pause, Music, ImageIcon, Tag, User, Album, Filter, Download } from "lucide-react";

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
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [editBhajan, setEditBhajan] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  
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
      setBhajanList([{ ...formData, id: Date.now() }, ...bhajanList]);
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

  const handleDownload = (bhajan) => {
    if (bhajan.audioFile) {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = bhajan.audioFile;
      link.download = `${bhajan.name} - ${bhajan.artist}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("No audio file available for download");
    }
  };

  const togglePlay = (id) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  // Optimized filtering with useMemo
  const filteredBhajans = useMemo(() => {
    return bhajanList.filter((b) => {
      const matchesSearch = 
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.artist.toLowerCase().includes(search.toLowerCase()) ||
        b.category.toLowerCase().includes(search.toLowerCase()) ||
        b.album.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory = categoryFilter === "all" || b.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [bhajanList, search, categoryFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-3 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="p-1.5 sm:p-2 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg sm:rounded-xl shadow-lg">
              <Music className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Bhajan Management
            </h1>
          </div>
          <p className="text-neutral-600 text-sm sm:text-base ml-9 sm:ml-14">Manage your spiritual music collection</p>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-orange-100 p-3 sm:p-4 mb-4 sm:mb-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search by name, artist, album, or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-orange-50 border border-orange-100 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-neutral-900 placeholder-neutral-400 text-sm sm:text-base"
              />
            </div>

            {/* Filter & Action Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-neutral-100 text-neutral-700 rounded-lg sm:rounded-xl hover:bg-neutral-200 transition-all duration-200 font-medium text-sm sm:text-base"
              >
                <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Filter</span>
              </button>
              <button
                onClick={() => {
                  setModalType("record");
                  setShowModal(true);
                }}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg sm:rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-md font-medium text-sm sm:text-base"
              >
                <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">Record</span>
              </button>
              <button
                onClick={() => {
                  setModalType("add");
                  setShowModal(true);
                }}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg sm:rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-md font-medium text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" /> Add Bhajan
              </button>
            </div>

            {/* Category Filter Dropdown */}
            {showFilters && (
              <div className="pt-3 border-t border-orange-100">
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Filter by Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full sm:w-64 px-3 sm:px-4 py-2 sm:py-2.5 bg-orange-50 border border-orange-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-neutral-900 text-sm sm:text-base"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-xl sm:rounded-2xl border border-orange-100 p-3 sm:p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2">
              <div className="text-center sm:text-left">
                <p className="text-neutral-500 text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">Total</p>
                <p className="text-xl sm:text-2xl font-bold text-neutral-900">{bhajanList.length}</p>
              </div>
              <div className="p-2 sm:p-3 bg-orange-100 rounded-lg sm:rounded-xl">
                <Music className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl border border-orange-100 p-3 sm:p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2">
              <div className="text-center sm:text-left">
                <p className="text-neutral-500 text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">Categories</p>
                <p className="text-xl sm:text-2xl font-bold text-neutral-900">{categories.length}</p>
              </div>
              <div className="p-2 sm:p-3 bg-amber-100 rounded-lg sm:rounded-xl">
                <Tag className="w-4 h-4 sm:w-6 sm:h-6 text-amber-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl border border-orange-100 p-3 sm:p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2">
              <div className="text-center sm:text-left">
                <p className="text-neutral-500 text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">Artists</p>
                <p className="text-xl sm:text-2xl font-bold text-neutral-900">
                  {new Set(bhajanList.map(b => b.artist)).size}
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-green-100 rounded-lg sm:rounded-xl">
                <User className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Results Info */}
        {search || categoryFilter !== "all" ? (
          <div className="mb-4 px-2">
            <p className="text-sm text-neutral-600">
              Found <span className="font-semibold text-orange-600">{filteredBhajans.length}</span> bhajan{filteredBhajans.length !== 1 ? 's' : ''}
              {search && ` matching "${search}"`}
              {categoryFilter !== "all" && ` in ${categoryFilter}`}
            </p>
          </div>
        ) : null}

        {/* Bhajan Cards - Responsive Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {filteredBhajans.length > 0 ? (
            filteredBhajans.map((bhajan) => (
              <div
                key={bhajan.id}
                className="bg-white rounded-xl sm:rounded-2xl border border-orange-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-36 sm:h-44 md:h-48 bg-gradient-to-br from-orange-200 to-amber-200 overflow-hidden">
                  {bhajan.image ? (
                    <img 
                      src={bhajan.image} 
                      alt={bhajan.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Music className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 text-orange-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3 sm:pb-4">
                    <button
                      onClick={() => togglePlay(bhajan.id)}
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    >
                      {playingId === bhajan.id ? (
                        <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                      ) : (
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 ml-0.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4">
                  <div className="mb-2 sm:mb-3">
                    <h3 className="font-bold text-sm sm:text-base md:text-lg text-neutral-900 mb-0.5 sm:mb-1 truncate" title={bhajan.name}>
                      {bhajan.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 truncate" title={bhajan.artist}>
                      {bhajan.artist}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium border border-orange-200 truncate max-w-[120px] sm:max-w-none">
                      {bhajan.category}
                    </span>
                    <span className="text-xs text-neutral-500 whitespace-nowrap">{bhajan.duration}</span>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-neutral-600 mb-3 sm:mb-4">
                    <Album className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate" title={bhajan.album}>{bhajan.album}</span>
                  </div>

                  {/* Action Buttons - Responsive */}
                  <div className="flex flex-col gap-1.5 sm:gap-2 pt-3 border-t border-neutral-100">
                    {/* Row 1: Edit and Delete */}
                    <div className="flex gap-1.5 sm:gap-2">
                      <button
                        onClick={() => openEditModal(bhajan)}
                        className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors font-medium text-xs sm:text-sm"
                      >
                        <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(bhajan.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors font-medium text-xs sm:text-sm"
                      >
                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                    {/* Row 2: Download */}
                    <button
                      onClick={() => handleDownload(bhajan)}
                      className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium text-xs sm:text-sm"
                    >
                      <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white rounded-xl sm:rounded-2xl border border-orange-100 p-8 sm:p-12 text-center">
              <Music className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-400 font-medium text-sm sm:text-base">No bhajans found</p>
              <p className="text-neutral-400 text-xs sm:text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-3 sm:p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={resetForm}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent pr-8">
                {modalType === "record" ? "Record Bhajan" : editBhajan ? "Edit Bhajan" : "Add New Bhajan"}
              </h2>

              {/* Recording Section */}
              {modalType === "record" && (
                <div className="mb-4 sm:mb-6 p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="flex flex-col items-center gap-3 sm:gap-4">
                    <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}>
                      <Mic className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-neutral-900 mb-1 text-sm sm:text-base">
                        {isRecording ? "Recording in progress..." : "Ready to record"}
                      </p>
                      <p className="text-xs sm:text-sm text-neutral-600">
                        {isRecording ? "Click stop when finished" : "Click the button below to start"}
                      </p>
                    </div>
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-white font-medium shadow-md transition-all duration-200 text-sm sm:text-base ${
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
              <div className="mb-4 sm:mb-6">
                <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-2 sm:mb-3">
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
                    className="flex items-center justify-center gap-2 sm:gap-3 w-full px-4 sm:px-6 py-3 sm:py-4 bg-orange-50 border-2 border-dashed border-orange-300 rounded-xl cursor-pointer hover:bg-orange-100 transition-colors"
                  >
                    <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                    <span className="text-orange-700 font-medium text-xs sm:text-base">
                      {formData.audioFile ? "Audio uploaded" : "Upload audio file"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Image Upload */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-2 sm:mb-3">Cover Image</label>
                <div className="flex items-center gap-3 sm:gap-4">
                  {formData.image && (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 border-orange-200 flex-shrink-0">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
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
                      className="flex items-center justify-center gap-2 sm:gap-3 w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-amber-50 border-2 border-dashed border-amber-300 rounded-xl cursor-pointer hover:bg-amber-100 transition-colors"
                    >
                      <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                      <span className="text-amber-700 font-medium text-xs sm:text-sm">
                        {formData.image ? "Change image" : "Upload cover"}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-1.5 sm:mb-2">
                    Bhajan Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter bhajan name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-orange-50 border border-orange-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-neutral-900 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-1.5 sm:mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-orange-50 border border-orange-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-neutral-900 text-sm sm:text-base"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-1.5 sm:mb-2">
                    Artist Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter artist name"
                    value={formData.artist}
                    onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-orange-50 border border-orange-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-neutral-900 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-1.5 sm:mb-2">Album Name</label>
                  <input
                    type="text"
                    placeholder="Enter album name"
                    value={formData.album}
                    onChange={(e) => setFormData({ ...formData, album: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-orange-50 border border-orange-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-neutral-900 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                <button
                  onClick={resetForm}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors font-medium text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveBhajan}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 transition-all shadow-md font-medium text-sm sm:text-base"
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