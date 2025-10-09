"use client";

import { useState } from "react";
import { Trash2, Eye, Send, X, Check } from "lucide-react";

export default function DirectorMessagePage() {
  const [message, setMessage] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [messageHistory, setMessageHistory] = useState([
    {
      id: 1,
      content: "Welcome to our organization! We are proud to serve the community with dedication.",
      date: "2024-01-15",
      time: "10:30 AM",
    },
    {
      id: 2,
      content: "Wishing everyone a blessed festival season. May this bring prosperity to all.",
      date: "2024-01-10",
      time: "02:15 PM",
    },
    {
      id: 3,
      content: "Thank you for your continuous support. Together we have achieved great milestones.",
      date: "2023-12-31",
      time: "11:00 AM",
    },
  ]);

  const handleSendClick = () => {
    if (!message.trim()) {
      alert("Please enter a message!");
      return;
    }
    setShowPreviewModal(true);
  };

  const handleConfirmSend = () => {
    const newMessage = {
      id: Date.now(),
      content: message,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessageHistory([newMessage, ...messageHistory]);
    setMessage("");
    setShowPreviewModal(false);
    alert("Message sent successfully!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      setMessageHistory(messageHistory.filter((msg) => msg.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">
        Director Message
      </h1>

      {/* Message Input */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6 mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Enter Message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="8"
          className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-slate-800"
          placeholder="Type your message here..."
        />

        <div className="flex justify-end mt-4">
          <button
            onClick={handleSendClick}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
          >
            <Send size={18} />
            Send Message
          </button>
        </div>
      </div>

      {/* Previous Messages */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Previous Messages
        </h2>

        {messageHistory.length === 0 ? (
          <p className="text-slate-500 text-center py-8">No messages yet</p>
        ) : (
          <div className="space-y-4">
            {messageHistory.map((msg) => (
              <div
                key={msg.id}
                className="border-2 border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-xs text-slate-500 font-medium">
                    {msg.date} • {msg.time}
                  </div>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-slate-800 whitespace-pre-wrap">{msg.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preview & Confirmation Modal */}
      {/* Preview & Confirmation Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setShowPreviewModal(false)}
              className="absolute top-4 right-4 z-50 p-2 bg-white rounded-full shadow-lg hover:bg-slate-100 transition-colors"
            >
              <X size={24} className="text-slate-700" />
            </button>

            {/* Modal Body - Scroll Design */}
            <div className="relative py-16 px-4">
              {/* Main Scroll Section */}
              <div className="relative w-full max-w-4xl mx-auto flex justify-center items-center">
                
                {/* Abstract Background */}
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                  <img
                    src="/images/abs.png"
                    alt="Abstract Background"
                    className="object-contain opacity-50 w-[75%] h-auto"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>

                {/* Scroll Background */}
                <div className="relative z-10 w-[90%] md:w-[85%] lg:w-[80%] rounded-2xl overflow-hidden">
                  <img
                    src="/images/scBg.png"
                    alt="Ancient Scroll Background"
                    className="w-full h-auto object-contain"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://upload.wikimedia.org/wikipedia/commons/d/d1/Parchment_background_02.jpg")
                    }
                  />

                  {/* Scroll Text Content */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-8 sm:px-12 md:px-16 lg:px-20 py-12 md:py-16">
                    
                    {/* Title */}
                    <div className="relative mb-6 md:mb-8">
                      <div
                        className="relative inline-block px-6 py-3 bg-cover bg-center rounded-lg shadow-xl border-2 border-amber-800"
                        style={{
                          backgroundImage: "url('/images/ancient.jpg')",
                          backgroundBlendMode: "multiply",
                          backgroundColor: "rgba(120, 70, 40, 0.85)",
                        }}
                      >
                        <h2
                          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-amber-50 tracking-wider drop-shadow-lg"
                          style={{
                            fontFamily: "Noto Serif Devanagari, Georgia, serif",
                            textShadow: "3px 3px 6px rgba(0,0,0,0.6)",
                          }}
                        >
                          प्रेरक संदेश
                        </h2>
                      </div>
                      <div className="flex justify-center mt-3">
                        <div className="w-28 md:w-40 h-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-full" />
                      </div>
                    </div>

                    {/* Message Content */}
                    <blockquote
                      className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-semibold text-red-900 max-w-3xl mx-auto drop-shadow-md"
                      style={{
                        fontFamily: "Noto Serif Devanagari, Georgia, serif",
                        textShadow: "1px 1px 2px rgba(0,0,0,0.25)",
                        lineHeight: "1.8",
                      }}
                    >
                      {message}
                    </blockquote>

                    {/* Writer */}
                    <div className="w-full mt-8 flex flex-col items-end px-4">
                      <div className="w-32 md:w-48 h-0.5 bg-gradient-to-l from-red-600 to-transparent rounded-full mb-2" />
                      <div
                        className="relative inline-block px-5 py-3 bg-cover bg-center rounded-md shadow-xl border-2 border-amber-700"
                        style={{
                          backgroundImage: "url('/images/ancient.jpg')",
                          backgroundBlendMode: "multiply",
                          backgroundColor: "rgba(100, 60, 30, 0.8)",
                        }}
                      >
                        <p
                          className="text-sm sm:text-base md:text-lg font-bold text-amber-50 italic drop-shadow-md"
                          style={{
                            fontFamily: "Noto Serif Devanagari, Georgia, serif",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                          }}
                        >
                          ~ परम पूज्य ग्वाल संत श्री
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confirmation Text and Buttons */}
              <div className="mt-8 max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                <p className="text-lg text-slate-800 font-semibold mb-6 text-center">
                  Are you sure you want to send this message?
                </p>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowPreviewModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-slate-400 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-semibold shadow-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmSend}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md"
                  >
                    <Check size={18} />
                    Confirm & Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}