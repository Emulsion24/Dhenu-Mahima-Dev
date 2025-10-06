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
        Director's Message
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
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-blue-600 text-white p-6 flex justify-between items-center rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Eye size={24} />
                <h2 className="text-xl font-bold">Preview Message</h2>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-6 mb-6">
                <p className="text-slate-800 whitespace-pre-wrap text-lg">
                  {message}
                </p>
              </div>

              <p className="text-sm text-slate-600 mb-6 text-center">
                Are you sure you want to send this message?
              </p>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmSend}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  <Check size={18} />
                  Confirm & Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}