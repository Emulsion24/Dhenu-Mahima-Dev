"use client";
import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X, Image, Loader2 } from "lucide-react";
import API from "@/lib/api";

// Add token to requests


export default function CardAdminPanel() {
  const [cards, setCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    titleEn: "",
    image: "/images/1.png",
    link: ""
  });

  // Fetch cards from backend
  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      setPageLoading(true);
      setError(null);
      const response = await API.get("/admin/cards");
      const cardsData = response.data.data || response.data.cards || response.data || [];
      setCards(cardsData);
    } catch (err) {
      console.error("Error fetching cards:", err);
      setError(err.response?.data?.message || "Failed to fetch cards");
    } finally {
      setPageLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingCard(null);
    setFormData({
      title: "",
      titleEn: "",
      image: "/images/1.png",
      link: ""
    });
    setIsModalOpen(true);
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    setFormData({
      title: card.title,
      titleEn: card.titleEn,
      image: card.image,
      link: card.link
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this card?")) {
      return;
    }

    try {
      setLoading(true);
      await API.delete(`/admin/delete-card/${id}`);
      setCards(cards.filter(card => card.id !== id));
      alert("Card deleted successfully!");
    } catch (err) {
      console.error("Error deleting card:", err);
      alert(err.response?.data?.message || "Failed to delete card");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.title || !formData.link) {
      alert("Title and link are required");
      return;
    }

    try {
      setLoading(true);
      
      if (editingCard) {
        // Update existing card
        const response = await API.put(`/admin/edit-card/${editingCard.id}`, formData);
        setCards(cards.map(card => 
          card.id === editingCard.id 
            ? response.data.data || { ...card, ...formData }
            : card
        ));
        alert("Card updated successfully!");
      } else {
        // Add new card
        const response = await API.post("/admin/add-card", formData);
        setCards([...cards, response.data.data || { id: Date.now(), ...formData }]);
        alert("Card added successfully!");
      }
      
      setIsModalOpen(false);
      setFormData({
        title: "",
        titleEn: "",
        image: "/images/1.png",
        link: ""
      });
    } catch (err) {
      console.error("Error saving card:", err);
      alert(err.response?.data?.message || "Failed to save card");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const updateCardOrder = async (updatedCards) => {
  const orderList = updatedCards.map((card, index) => ({
    id: card.id,
    order: index + 1,
  }));

  try {
    await API.put("/admin/cards/reorder", { orderList });
  } catch (err) {
    console.error("Error updating card order:", err);
  }
};

  const moveUp = async (id) => {
  const index = cards.findIndex(c => c.id === id);
  if (index > 0) {
    const newCards = [...cards];
    [newCards[index - 1], newCards[index]] = [newCards[index], newCards[index - 1]];
    newCards.forEach((c, i) => c.order = i + 1);
    setCards(newCards);
    await updateCardOrder(newCards);
  }
};

const moveDown = async (id) => {
  const index = cards.findIndex(c => c.id === id);
  if (index < cards.length - 1) {
    const newCards = [...cards];
    [newCards[index], newCards[index + 1]] = [newCards[index + 1], newCards[index]];
    newCards.forEach((c, i) => c.order = i + 1);
    setCards(newCards);
    await updateCardOrder(newCards);
  }
};

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-orange-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-semibold">Loading cards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-orange-900 mb-2">
                Info Cards Management
              </h1>
              <p className="text-gray-600">
                Manage your information cards - Add, Edit, or Delete
              </p>
            </div>
            <button
              onClick={handleAdd}
              disabled={loading}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={20} />
              Add New Card
            </button>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Total Cards: <span className="font-semibold text-orange-600">{cards.length}</span>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
              <button 
                onClick={fetchCards}
                className="ml-4 underline hover:no-underline"
              >
                Retry
              </button>
            </div>
          )}
        </div>

        {cards.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Image size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No cards yet</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first card</p>
            <button
              onClick={handleAdd}
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Plus size={20} />
              Add First Card
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-32 bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center">
                  <Image size={48} className="text-white opacity-50" />
                </div>
                
                <div className="p-6">
                  <h3 
                    className="text-xl font-bold text-orange-900 mb-2"
                    style={{ fontFamily: 'Noto Serif Devanagari, Georgia, serif' }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-gray-600 font-semibold mb-3">
                    {card.titleEn}
                  </p>
                  <div className="text-sm text-gray-500 mb-4 break-all">
                    <span className="font-semibold">Link:</span> {card.link}
                  </div>
                  
                 <div className="flex flex-wrap gap-2">
  <button
    onClick={() => handleEdit(card)}
    disabled={loading}
    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <Edit2 size={16} />
    Edit
  </button>
  <button
    onClick={() => handleDelete(card.id)}
    disabled={loading}
    className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <Trash2 size={16} />
    Delete
  </button>
  <button
    onClick={() => moveUp(card.id)}
    disabled={loading || cards.findIndex(c => c.id === card.id) === 0}
    className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  >
    ↑ Move Up
  </button>
  <button
    onClick={() => moveDown(card.id)}
    disabled={loading || cards.findIndex(c => c.id === card.id) === cards.length - 1}
    className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  >
    ↓ Move Down
  </button>
</div>

                </div>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-amber-600 text-white p-6 rounded-t-xl">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">
                    {editingCard ? "Edit Card" : "Add New Card"}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    disabled={loading}
                    className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div onSubmit={handleSubmit} className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Hindi Title (हिंदी शीर्षक) *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors disabled:bg-gray-100"
                      placeholder="हिंदी में शीर्षक दर्ज करें"
                      style={{ fontFamily: 'Noto Serif Devanagari, Georgia, serif' }}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      English Title
                    </label>
                    <input
                      type="text"
                      name="titleEn"
                      value={formData.titleEn}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors disabled:bg-gray-100"
                      placeholder="Enter English title (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Link/URL *
                    </label>
                    <input
                      type="text"
                      name="link"
                      value={formData.link}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors disabled:bg-gray-100"
                      placeholder="/page or https://example.com"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Enter a relative path (/page) or full URL (https://...)
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        {editingCard ? "Update Card" : "Create Card"}
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    disabled={loading}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}