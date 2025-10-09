"use client";
import React, { useState } from "react";
import { Plus, Edit2, Trash2, Save, X, ImageIcon } from "lucide-react";

export default function CardAdminPanel() {
  const [cards, setCards] = useState([
    { 
      id: 1,
      title_hi: "हमारा गोपाल परिवार", 
      title_en: "Gopal Pariwar",
      image: "/images/1.png",
      link: "/gopal-pariwar"
    },
    { 
      id: 2,
      title_hi: "हमारे सेवा प्रकल्प", 
      title_en: "Our Foundations",
      image: "/images/1.png",
      link: "/#foundation"
    },
    { 
      id: 3,
      title_hi: "दाता भगवान के संस्थान", 
      title_en: "Data's Sansthan",
      image: "/images/1.png",
      link: "/sansthan"
    },
    { 
      id: 4,
      title_hi: "प्रेरित गौशालाएं", 
      title_en: "Inspired GauShallas",
      image: "/images/1.png",
      link: "/gowshala"
    },
    { 
      id: 5,
      title_hi: "गौ सेवार्थ दान", 
      title_en: "Gau Seva Donations",
      image: "/images/1.png",
      link: "/donate"
    },
    { 
      id: 6,
      title_hi: "हमारे उद्देश्य", 
      title_en: "Our Objectives",
      image: "/images/1.png",
      link: "/objective"
    },
    { 
      id: 7,
      title_hi: "कथा करवाने हेतु", 
      title_en: "For Gau Katha",
      image:"/images/1.png",
      link: "/contact"
    },
    { 
      id: 8,
      title_hi: "आगामी कथा एवं आयोजन", 
      title_en: "Upcoming Kathas & Programs",
      image:"/images/1.png",
      link: "/events"
    },
    { 
      id: 9,
      title_hi: "दैनिक समाचार", 
      title_en: "Daily News",
      image: "/images/1.png",
      link: "/news"
    },
    { 
      id: 10,
      title_hi: "मासिक पत्रिका सदस्यता", 
      title_en: "Monthly Magazine",
      image: "/images/1.png",
      link: "/magazine"
    },
    { 
      id: 11,
      title_hi: "पीडीएफ पुस्तकें", 
      title_en: "PDF-Books",
      image: "/images/1.png",
      link: "/pdf-books"
    },
    { 
      id: 12,
      title_hi: "हमारी पदयात्रा", 
      title_en: "Pad Yatra's",
      image: "/images/1.png",
      link: "https://dhenudhamfoundation.com"
    },
    { 
      id: 13,
      title_hi: "जीवन सूत्र", 
      title_en: "Jeevan Sutra",
      image: "/images/1.png",
      link: "/bhajan"
    },
    { 
      id: 14,
      title_hi: "गौ माता जी के भजन", 
      title_en: "Gau Mata Ji Bhajan's",
      image: "/images/1.png",
      link: "/Gau-mata-bhajan"
    },
    { 
      id: 15,
      title_hi: "संपर्क करें", 
      title_en: "Contact Us",
      image: "/images/1.png",
      link: "/message"
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [formData, setFormData] = useState({
    title_hi: "",
    title_en: "",
    image: "/images/1.png",
    link: ""
  });

  const handleAdd = () => {
    setEditingCard(null);
    setFormData({
      title_hi: "",
      title_en: "",
      image: "/images/1.png",
      link: ""
    });
    setIsModalOpen(true);
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    setFormData({
      title_hi: card.title_hi,
      title_en: card.title_en,
      image: card.image,
      link: card.link
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      setCards(cards.filter(card => card.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingCard) {
      setCards(cards.map(card => 
        card.id === editingCard.id 
          ? { ...card, ...formData }
          : card
      ));
    } else {
      const newCard = {
        id: Math.max(...cards.map(c => c.id), 0) + 1,
        ...formData
      };
      setCards([...cards, newCard]);
    }
    
    setIsModalOpen(false);
    setFormData({
      title_hi: "",
      title_en: "",
      image: "/images/1.png",
      link: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
            >
              <Plus size={20} />
              Add New Card
            </button>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Total Cards: <span className="font-semibold text-orange-600">{cards.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-32 bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center">
                <ImageIcon size={48} className="text-white opacity-50" />
              </div>
              
              <div className="p-6">
                <h3 
                  className="text-xl font-bold text-orange-900 mb-2"
                  style={{ fontFamily: 'Noto Serif Devanagari, Georgia, serif' }}
                >
                  {card.title_hi}
                </h3>
                <p className="text-gray-600 font-semibold mb-3">
                  {card.title_en}
                </p>
                <div className="text-sm text-gray-500 mb-4 break-all">
                  <span className="font-semibold">Link:</span> {card.link}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(card)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(card.id)}
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
                      Hindi Title (हिंदी शीर्षक) *
                    </label>
                    <input
                      type="text"
                      name="title_hi"
                      value={formData.title_hi}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="हिंदी में शीर्षक दर्ज करें"
                      style={{ fontFamily: 'Noto Serif Devanagari, Georgia, serif' }}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      English Title *
                    </label>
                    <input
                      type="text"
                      name="title_en"
                      value={formData.title_en}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="Enter English title"
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
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
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
                    className="flex-1 flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <Save size={20} />
                    {editingCard ? "Update Card" : "Create Card"}
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
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
    </div>
  );
}