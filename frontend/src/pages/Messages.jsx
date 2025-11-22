import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Calendar } from "lucide-react";

/**
 * Messages Page
 * -------------
 * Display messages, announcements, and updates
 */
export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      // Note: Messages endpoint doesn't exist in backend yet
      // This is a placeholder for future implementation
      setMessages([]);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b152d]">
        <div className="text-white text-xl">Loading messages...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b152d] text-white py-20 px-4 font-[Sora]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Important <span className="text-[#ffd700]">Messages</span>
          </h1>
          <p className="text-white/70 text-lg">
            Latest announcements and updates from the tournament
          </p>
        </motion.div>

        {/* Messages List */}
        <div className="space-y-6">
          {messages.map((message, index) => (
            <motion.div
              key={message.msg_id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1b2b4a] rounded-lg p-6 border border-white/10 hover:border-[#ffd700]/50 transition"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <MessageSquare size={32} className="text-[#ffd700]" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {message.msg_title || "Announcement"}
                  </h3>
                  <p className="text-white/80 mb-4 whitespace-pre-line">
                    {message.msg_content || message.msg_text}
                  </p>
                  {message.msg_date && (
                    <div className="flex items-center gap-2 text-sm text-white/50">
                      <Calendar size={14} />
                      {new Date(message.msg_date).toLocaleDateString()}
                    </div>
                  )}
                  {message.msg_author && (
                    <div className="mt-2 text-sm text-white/60">
                      — {message.msg_author}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {messages.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare size={64} className="text-white/20 mx-auto mb-4" />
            <p className="text-white/50 text-lg mb-2">No messages available</p>
            <p className="text-white/30 text-sm">
              Message notifications will appear here when available
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
