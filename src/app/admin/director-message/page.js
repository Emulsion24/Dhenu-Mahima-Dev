"use client";

import { useEffect, useState } from "react";
import { Trash2, Send, X, Check } from "lucide-react";
import { useAdminStore } from "@/store/adminStore";

export default function DirectorMessagePage() {
  const [message, setMessage] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [messageHistory, setMessageHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const {getMessage,deleteMessage,uploadMessage }=useAdminStore(); 
  const splitSentences = (text) => {
    if (!text || typeof text !== 'string') return [];
    return text
      .split(/(?<=[.,])/g)
      .map(line => line.trim())
      .filter(line => line);
  };
  // 🟢 Fetch messages on load
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await getMessage();
        
        console.log("Response from getMessage:", res); // Debug log
        
        // Handle different response structures
        let messageData = null;
        
        if (Array.isArray(res)) {
          // If it's an array, take the first item
          messageData = res[0];
        } else if (res && typeof res === 'object') {
          // If it's an object, use it directly
          messageData = res;
        }
        
        console.log("Processed messageData:", messageData); // Debug log
        
        if (messageData && messageData.info) {
          setMessageHistory(messageData);
        } else {
          setError("No valid message data received");
        }
      } catch (err) {
        console.error("Failed to fetch messages:", err);
        setError(err.message || "Failed to load message");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, []);

  // 🟡 Handle send click
  const handleSendClick = () => {
    if (!message.trim()) {
      alert("Please enter a message!");
      return;
    }
    setShowPreviewModal(true);
  };

  // 🟢 Confirm & send message
  const handleConfirmSend = async () => {
    try {
      const res = await uploadMessage(message);
      const newMsg = res?.data || res;
      
      console.log("New message created:", newMsg); // Debug log
      
      // Update the message history with the new message
      setMessageHistory(newMsg);
      setMessage("");
      setShowPreviewModal(false);
      alert("Message sent successfully!");
    } catch (err) {
      console.error("Failed to send message:", err);
      alert("Error sending message.");
    }
  };

  // 🔴 Delete a message
  const handleDelete = async (id) => {
    if (!id) return;
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await deleteMessage(id);
        setMessageHistory(null);
        alert("Message deleted successfully!");
      } catch (err) {
        console.error("Failed to delete message:", err);
        alert("Error deleting message.");
      }
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
          Current Message
        </h2>

        {isLoading ? (
          <div className="text-center py-8 text-slate-500">
            <div className="animate-pulse">Loading message...</div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600 mb-2">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="text-blue-600 hover:underline"
            >
              Retry
            </button>
          </div>
        ) : messageHistory && messageHistory.info ? (
          <div className="space-y-4">
            <div
              className="border-2 border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="text-xs text-slate-500 font-medium">
                  {messageHistory.createdAt 
                    ? new Date(messageHistory.createdAt).toLocaleString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    : 'Date not available'}
                </div>
                <button
                  onClick={() => handleDelete(messageHistory.id)}
                  className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-slate-800 whitespace-pre-wrap leading-relaxed">
                {messageHistory.info}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <p className="mb-2">No message found</p>
            <p className="text-sm">Create a new message to get started</p>
          </div>
        )}
      </div>

      {/* Preview & Confirmation Modal */}
         {showPreviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setShowPreviewModal(false)}
              className="absolute top-4 right-4 z-50 p-2 bg-white rounded-full shadow-lg hover:bg-slate-100 transition-colors"
            >
              <X size={24} className="text-slate-700" />
            </button>

            {/* Scroll View */}
            <div className="relative py-16 px-4">
              <div className="relative w-full max-w-6xl mx-auto flex justify-center items-center">
                {/* Abstract Background */}
                <div className="absolute inset-0 flex justify-center items-center z-0 pointer-events-none">
                  <img
                    src="/images/abs.png"
                    alt="Abstract Background"
                    className="object-contain opacity-50 w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] h-auto"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>

                {/* Scroll Background */}
                <div className="relative z-10 w-full sm:w-[92%] md:w-[85%] lg:w-[75%] xl:w-[70%] rounded-2xl overflow-hidden px-2 sm:px-0">
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
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-10 md:px-16 lg:px-20 py-8 md:py-14">
                    
                    {/* Title */}
                    <div className="relative mb-6 md:mb-8 w-full">
                      <div
                        className="mx-auto inline-block px-4 sm:px-6 py-2 sm:py-3 bg-cover bg-center rounded-lg shadow-xl border-2 border-amber-800 max-w-full"
                        style={{
                          backgroundImage: "url('/images/ancient.jpg')",
                          backgroundBlendMode: "multiply",
                          backgroundColor: "rgba(120, 70, 40, 0.85)",
                        }}
                      >
                        <h2
                          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-amber-50 tracking-wider drop-shadow-lg"
                          style={{
                            fontFamily: "Noto Serif Devanagari, Georgia, serif",
                            textShadow: "3px 3px 6px rgba(0,0,0,0.6)",
                          }}
                        >
                          प्रेरक संदेश
                        </h2>
                      </div>
                      <div className="flex justify-center mt-3">
                        <div className="w-20 md:w-40 h-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-full" />
                      </div>
                    </div>

                    {/* Quote */}
                    <blockquote
                      className="text-sm sm:text-base md:text-2xl lg:text-3xl xl:text-4xl leading-relaxed font-semibold text-red-900 max-w-3xl mx-auto drop-shadow-md break-words"
                      style={{
                        fontFamily: "Noto Serif Devanagari, Georgia, serif",
                        textShadow: "1px 1px 2px rgba(0,0,0,0.25)",
                        lineHeight: "1.15",
                        whiteSpace: "pre-wrap"
                      }}
                    >
                      {splitSentences(message).map((line, idx) => (
                        <span key={idx}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </blockquote>

                    {/* Writer */}
                    <div className="w-full mt-6 sm:mt-8 flex flex-col items-end px-2 sm:px-4">
                      <div className="w-28 sm:w-32 md:w-48 h-0.5 bg-gradient-to-l from-red-600 to-transparent rounded-full mb-2" />
                      <div
                        className="relative inline-block px-4 sm:px-5 py-2 bg-cover bg-center rounded-md shadow-xl border-2 border-amber-700"
                        style={{
                          backgroundImage: "url('/images/ancient.jpg')",
                          backgroundBlendMode: "multiply",
                          backgroundColor: "rgba(100, 60, 30, 0.8)",
                        }}
                      >
                        <p
                          className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-amber-50 italic drop-shadow-md"
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

              {/* Confirmation Buttons */}
              <div className="mt-8 max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                <p className="text-lg text-slate-800 font-semibold mb-6 text-center">
                  Are you sure you want to send this message?
                </p>

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