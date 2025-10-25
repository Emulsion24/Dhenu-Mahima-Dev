"use client";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { Edit, Trash2, Search, Plus, Mic, Upload, X, Play, Pause, Music, ImageIcon, User, Album, Download, Flower2, Settings, FolderPlus } from "lucide-react";
import API from "@/lib/api";


// Simulated user info
const CURRENT_USER = {
  role: "admin",
};

export default function GauMataBhajanPage() {
  const [bhajanList, setBhajanList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [editBhajan, setEditBhajan] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    artist: "",
    album: "",
    category: "",
    imageFile: null,
    audioFile: null,
    duration: "0:00"
  });

  const audioRef = useRef(new Audio());
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    fetchBhajans();
    fetchCategories();
  }, []);

  const fetchBhajans = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/gaumata-bhajans`);
      const data = response.data;
      setBhajanList(data);
    } catch (error) {
      console.error("Error fetching bhajans:", error);
      alert("Failed to load bhajans");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await API.get(`/gaumata-categories`);
      setCategories(response.data || []);
      
      if (response.data && response.data.length > 0 && !formData.category) {
        setFormData(prev => ({ ...prev, category: response.data[0].name }));
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([
        { id: 1, name: "Devotional" },
        { id: 2, name: "Aarti" },
        { id: 3, name: "Stuti" }
      ]);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      alert("Please enter a category name");
      return;
    }

    try {
      await API.post(`/gaumata-categories`, { name: newCategoryName.trim() });
      await fetchCategories();
      setNewCategoryName("");
      alert("Category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category");
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory || !editingCategory.name.trim()) {
      alert("Please enter a category name");
      return;
    }

    try {
      await API.put(`/gaumata-categories/${editingCategory.id}`, { 
        name: editingCategory.name.trim() 
      });
      await fetchCategories();
      setEditingCategory(null);
      alert("Category updated successfully!");
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Failed to update category");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    
    try {
      await API.delete(`/gaumata-categories/${categoryId}`);
      await fetchCategories();
      alert("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData({ ...formData, imageFile: file });
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
          audioFile: file,
          duration: `${minutes}:${seconds.toString().padStart(2,'0')}`
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
        const file = new File([audioBlob], "recorded-bhajan.wav", { type: 'audio/wav' });
        setFormData({ ...formData, audioFile: file });
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

  const handleSaveBhajan = async () => {
    if (!formData.name || !formData.artist || !formData.category) {
      alert("Please fill in name, artist, and category fields");
      return;
    }

    if (!editBhajan && !formData.audioFile) {
      alert("Please upload or record an audio file");
      return;
    }

    try {
      setLoading(true);

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('artist', formData.artist);
      formDataToSend.append('album', formData.album || '');
      formDataToSend.append('category', formData.category);
      formDataToSend.append('duration', formData.duration);

      if (formData.audioFile) formDataToSend.append('audio', formData.audioFile);
      if (formData.imageFile) formDataToSend.append('image', formData.imageFile);

      let response;

      if (editBhajan) {
        response = await API.put(`/gaumata-bhajans/${editBhajan.id}`, formDataToSend);
      } else {
        response = await API.post(`/gaumata-bhajans`, formDataToSend);
      }

      if (response.data && (response.data.id || response.data._id)) {
        await fetchBhajans();
        resetForm();
        alert(editBhajan ? "Bhajan updated successfully!" : "Bhajan added successfully!");
      }
    } catch (error) {
      console.error("Error saving bhajan:", error);
      alert("Failed to save bhajan");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ 
      name:"", 
      artist:"", 
      album:"", 
      category: categories.length > 0 ? categories[0].name : "",
      imageFile:null, 
      audioFile:null, 
      duration:"0:00" 
    });
    setRecordedAudio(null);
    setEditBhajan(null);
    setShowModal(false);
    setModalType("add");
  };

  const openEditModal = (bhajan) => {
    setEditBhajan(bhajan);
    setFormData({
      name: bhajan.name,
      artist: bhajan.artist,
      album: bhajan.album || "",
      category: bhajan.category || (categories.length > 0 ? categories[0].name : ""),
      imageFile: null,
      audioFile: null,
      duration: bhajan.duration
    });
    setModalType("edit");
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bhajan?")) return;
    try {
      setLoading(true);
      await API.delete(`/gaumata-bhajans/${id}`);
      await fetchBhajans();
      alert("Bhajan deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete bhajan");
    } finally { 
      setLoading(false); 
    }
  };

  const handleDownload = async (bhajan) => {
    if (CURRENT_USER.role !== "admin") {
      alert("Only admin can download audio files");
      return;
    }

    try {
      const link = document.createElement("a");
      link.href = bhajan.downloadUrl;
      link.download = `${bhajan.name} - ${bhajan.artist}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert("Download started!");
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download audio file");
    }
  };

  const togglePlay = (bhajan) => {
    const audio = audioRef.current;

    if (playingId === bhajan.id) {
      audio.pause();
      setPlayingId(null);
      return;
    }

    if (bhajan.audioUrl) {
      if (!audio.paused) {
        audio.pause();
      }

      audio.src = bhajan.audioUrl;
      audio.currentTime = 0;
      audio.play()
        .then(() => {
          setPlayingId(bhajan.id);
        })
        .catch((err) => {
          console.error("Audio play error:", err);
          alert("Could not play audio");
        });

      audio.onended = () => {
        setPlayingId(null);
      };
    } else {
      alert("No audio file available");
    }
  };

  const filteredBhajans = useMemo(() => {
    let filtered = bhajanList.filter(b => 
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.artist.toLowerCase().includes(search.toLowerCase()) ||
      (b.album && b.album.toLowerCase().includes(search.toLowerCase())) ||
      (b.category.name && b.category.name.toLowerCase().includes(search.toLowerCase()))
    );

    if (selectedCategory !== "All") {
      filtered = filtered.filter(b => b.category.name === selectedCategory);
    }

    return filtered;
  }, [bhajanList, search, selectedCategory]);

  const uniqueArtists = new Set(bhajanList.map(b => b.artist)).size;
  const categoryCounts = useMemo(() => {
    const counts = {};
    bhajanList.forEach(b => {
      counts[b.category.name] = (counts[b.category.name] || 0) + 1;
    });
    return counts;
  }, [bhajanList]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 p-3 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg sm:rounded-xl shadow-lg">
                <Flower2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Gau Mata Bhajan Management
              </h1>
            </div>
            <button
              onClick={() => setShowCategoryModal(true)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all shadow-md text-sm sm:text-base"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Manage Categories</span>
            </button>
          </div>
          <p className="text-neutral-600 text-sm sm:text-base ml-9 sm:ml-14">Sacred hymns dedicated to Gau Mata</p>
        </div>

        {/* Search and Action Bar */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-orange-100 p-3 sm:p-4 mb-4 sm:mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
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

            <div className="flex flex-wrap gap-2 sm:gap-3">
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
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mb-4 sm:mb-6 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                selectedCategory === "All"
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
                  : "bg-white text-neutral-600 border border-orange-200 hover:border-orange-300"
              }`}
            >
              All ({bhajanList.length})
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                  selectedCategory === category.name
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
                    : "bg-white text-neutral-600 border border-orange-200 hover:border-orange-300"
                }`}
              >
                {category.name} ({categoryCounts[category.name] || 0})
              </button>
            ))}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-xl sm:rounded-2xl border border-orange-100 p-3 sm:p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2">
              <div className="text-center sm:text-left">
                <p className="text-neutral-500 text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">Total Bhajans</p>
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
                <p className="text-neutral-500 text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">Artists</p>
                <p className="text-xl sm:text-2xl font-bold text-neutral-900">{uniqueArtists}</p>
              </div>
              <div className="p-2 sm:p-3 bg-amber-100 rounded-lg sm:rounded-xl">
                <User className="w-4 h-4 sm:w-6 sm:h-6 text-amber-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl border border-orange-100 p-3 sm:p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2">
              <div className="text-center sm:text-left">
                <p className="text-neutral-500 text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">Categories</p>
                <p className="text-xl sm:text-2xl font-bold text-neutral-900">
                  {Object.keys(categoryCounts).length}
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-yellow-100 rounded-lg sm:rounded-xl">
                <Album className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Results Info */}
        {search && (
          <div className="mb-4 px-2">
            <p className="text-sm text-neutral-600">
              Found <span className="font-semibold text-orange-600">{filteredBhajans.length}</span> bhajan{filteredBhajans.length !== 1 ? 's' : ''}
              {search && ` matching "${search}"`}
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block w-8 h-8 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
            <p className="text-neutral-600 mt-2">Loading...</p>
          </div>
        )}

        {/* Bhajans Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {!loading && filteredBhajans.length > 0 ? (
            filteredBhajans.map((bhajan) => (
              <div
                key={bhajan.id}
                className="bg-white rounded-xl sm:rounded-2xl border border-orange-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative h-36 sm:h-44 md:h-48 bg-gradient-to-br from-orange-200 to-amber-200 overflow-hidden">
                  {bhajan.imageUrl ? (
                    <img 
                      src={bhajan.imageUrl} 
                      alt={bhajan.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Flower2 className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 text-orange-400" />
                    </div>
                  )}
                  
                  <div className="absolute top-2 left-2">
                    <span className="inline-block px-2 py-1 bg-orange-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                      {bhajan.category.name}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3 sm:pb-4">
                    <button
                      onClick={() => togglePlay(bhajan)}
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

                <div className="p-3 sm:p-4">
                  <div className="mb-2 sm:mb-3">
                    <h3 className="font-bold text-sm sm:text-base md:text-lg text-neutral-900 mb-0.5 sm:mb-1 truncate" title={bhajan.name}>
                      {bhajan.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 truncate" title={bhajan.artist}>
                      {bhajan.artist}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    <span className="text-xs text-neutral-500 whitespace-nowrap">{bhajan.duration}</span>
                  </div>

                  {bhajan.album && (
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-neutral-600 mb-3 sm:mb-4">
                      <Album className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="truncate" title={bhajan.album}>{bhajan.album}</span>
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5 sm:gap-2 pt-3 border-t border-neutral-100">
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
          ) : !loading ? (
            <div className="col-span-full bg-white rounded-xl sm:rounded-2xl border border-orange-100 p-8 sm:p-12 text-center">
              <Flower2 className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-400 font-medium text-sm sm:text-base">No Gau Mata bhajans found</p>
              <p className="text-neutral-400 text-xs sm:text-sm mt-1">Try adjusting your search or add a new bhajan</p>
            </div>
          ) : null}
        </div>

        {/* Modal for Add/Edit/Record */}
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
                {modalType === "record" ? "Record Gau Mata Bhajan" : editBhajan ? "Edit Gau Mata Bhajan" : "Add New Gau Mata Bhajan"}
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

              {/* Audio File Upload */}
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
                      {formData.audioFile ? "Audio uploaded ✓" : "Upload audio file"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Cover Image Upload */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-2 sm:mb-3">Cover Image</label>
                <div className="flex items-center gap-3 sm:gap-4">
                  {(formData.imageFile || editBhajan?.imageUrl) && (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 border-amber-200 flex-shrink-0">
                      <img
                        src={formData.imageFile ? URL.createObjectURL(formData.imageFile) : editBhajan?.imageUrl}
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
                        {formData.imageFile ? "Change image" : "Upload cover"}
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
                  <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-1.5 sm:mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-orange-50 border border-orange-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-neutral-900 text-sm sm:text-base"
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                  </select>
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
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveBhajan}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 transition-all shadow-md font-medium text-sm sm:text-base disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Saving..." : editBhajan ? "Update Bhajan" : "Save Bhajan"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Category Management Modal */}
        {showCategoryModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-3 sm:p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => {
                  setShowCategoryModal(false);
                  setEditingCategory(null);
                  setNewCategoryName("");
                }}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent pr-8">
                Manage Categories
              </h2>

              {/* Add New Category */}
              <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Add New Category
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter category name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="flex-1 px-4 py-2 bg-white border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-neutral-900"
                  />
                  <button
                    onClick={handleAddCategory}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all shadow-md font-medium flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>

              {/* Existing Categories List */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-700 mb-3">Existing Categories</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors"
                      >
                        {editingCategory?.id === category.id ? (
                          <>
                            <input
                              type="text"
                              value={editingCategory.name}
                              onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                              className="flex-1 px-3 py-2 bg-white border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-neutral-900"
                            />
                            <button
                              onClick={handleUpdateCategory}
                              className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingCategory(null)}
                              className="px-3 py-2 bg-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-400 transition-colors text-sm font-medium"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <FolderPlus className="w-5 h-5 text-orange-600 flex-shrink-0" />
                            <span className="flex-1 font-medium text-neutral-900">{category.name}</span>
                            <span className="text-xs text-neutral-500 bg-white px-2 py-1 rounded-full">
                              {categoryCounts[category.name] || 0} bhajans
                            </span>
                            <button
                              onClick={() => setEditingCategory(category)}
                              className="p-2 text-amber-600 hover:bg-amber-100 rounded-lg transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category.id)}
                              className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-neutral-500 py-8">No categories yet. Add your first category above!</p>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200">
                <button
                  onClick={() => {
                    setShowCategoryModal(false);
                    setEditingCategory(null);
                    setNewCategoryName("");
                  }}
                  className="w-full px-6 py-3 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}