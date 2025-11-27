import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import config from "../config/api";
import SecureImage from "../components/ui/SecureImage";

/**
 * Messages Page
 * -------------
 * Display messages from dignitaries and officials
 */
export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedMessage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedMessage]);

  const fetchMessages = async () => {
    try {
      // Hardcoded messages from officials with images
      const messagesData = [
        {
          id: 1,
          author_name: "Bhagwant Singh Mann",
          author_designation: "Chief Minister Of Punjab",
          author_image: "cmpunjab.png",
          document_image: "msg_psb.jpg",
          message_text:
            "It is heartening to learn that the Surjit Hockey Society is organizing 39th Surjit Hockey Tournament in the loving memory of Padma Shri Late Sardar Surjit Singh Sethi Ji. This tournament has been instrumental in promoting hockey in Punjab and across India. The dedication shown by the Surjit Hockey Society is commendable and I extend my best wishes for the success of this prestigious tournament.",
          display_order: 1,
        },
        {
          id: 2,
          author_name: "Arvind Kejriwal",
          author_designation: "Ex. Chief Minister of Delhi",
          author_image: "cmdelhi.png",
          document_image: "msg_akm.jpg",
          message_text:
            "It gives me immense pleasure to learn that the Surjit Hockey Society is Organizing 39th Surjit Hockey Tournament. This tournament stands as a testament to the vision of Late Sardar Surjit Singh Sethi Ji and continues to inspire young hockey players across the nation. I congratulate the organizers and wish the participants all the very best.",
          display_order: 2,
        },
        {
          id: 3,
          author_name: "A Venu Parsad, IAS",
          author_designation: "Addl. Chief Secretary to Chief Minister Punjab",
          author_image: "vparsad.jpg",
          document_image: "msg_avp.jpg",
          message_text:
            "I am elated to learn that the Surjit Hockey is organizing 39th Surjit Hockey Tournament. This event has consistently maintained high standards and has been a platform for nurturing hockey talent. The society's commitment to the sport is truly praiseworthy. I extend my heartfelt congratulations to all involved.",
          display_order: 3,
        },
        {
          id: 4,
          author_name: "Harbhajan Singh",
          author_designation: "Public Minister & Power Minister, Punjab",
          author_image: "hs.jpg",
          document_image: "msg_hs.jpg",
          message_text:
            "I am delighted to know that 39th Surjit Hockey Tournament is being organised by the Surjit Hockey Society. This tournament has played a pivotal role in keeping the spirit of hockey alive in Punjab. The legacy of Late Sardar Surjit Singh Sethi Ji continues through this wonderful initiative. My best wishes to all participants and organizers.",
          display_order: 4,
        },
        {
          id: 5,
          author_name: "Lal Chand Kataruchak",
          author_designation: "Cabinet Minister Of Punjab",
          author_image: "lck.jpg",
          document_image: "msg_lck.jpg",
          message_text:
            "It is very heartening to note that the Surjit Hockey Society Jalandhar is organizing the 39th edition of this prestigious tournament. The tournament has become a landmark event in the hockey calendar and continues to produce talented players. I convey my best wishes for the grand success of this tournament.",
          display_order: 5,
        },
        {
          id: 6,
          author_name: "Avinash Chopra",
          author_designation: "Jt. Managing Editor, Punjab",
          author_image: "avinash.jpg",
          document_image: "msg_avinash.jpg",
          message_text:
            "It gives me immense pleasure to know that the Surjit Hockey Society Jalandhar is going to organize the 39th Surjit Hockey Tournament. This tournament has been a beacon of excellence in hockey and has contributed immensely to the sport. I wish the organizers and participants great success.",
          display_order: 6,
        },
        {
          id: 7,
          author_name: "Ashok Kumar Mittal",
          author_designation: "Member Of Parliament (Rajya Sabha)",
          author_image: "ashokm.jpg",
          document_image: "msg_mmm.jpg",
          message_text:
            "I am pleased to know that in commemoration of illustrious achievements of Late Sardar Surjit Singh Sethi Ji, the 39th Surjit Hockey Tournament is being organized. This tournament continues to inspire young athletes and promotes the game of hockey. My heartiest congratulations to the Surjit Hockey Society for their dedicated efforts.",
          display_order: 7,
        },
      ];
      setMessages(messagesData);
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1b2b4a] rounded-lg overflow-hidden border border-white/10 hover:border-[#ffd700]/50 transition cursor-pointer"
              onClick={() => setSelectedMessage(message)}
            >
              <div className="aspect-square w-full overflow-hidden">
                <SecureImage
                  src={config.getUploadUrl("messages", message.author_image)}
                  alt={message.author_name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-1">
                  {message.author_name}
                </h3>
                <p className="text-sm text-[#ffd700] mb-4">
                  {message.author_designation}
                </p>
                <p className="text-white/80 text-sm mb-4 line-clamp-3">
                  {message.message_text}
                </p>
                <button className="px-4 py-2 bg-[#ffd700] text-[#0b152d] rounded-lg font-semibold hover:bg-[#ffd700]/90 transition text-sm">
                  Read More
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMessage(null)}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-3xl w-full bg-gradient-to-br from-[#1b2b4a] to-[#0b152d] rounded-xl shadow-2xl p-8 border border-[#ffd700]/20"
              >
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="absolute top-4 right-4 p-2 bg-[#ffd700] rounded-full hover:bg-[#ffd700]/90 transition z-10"
                >
                  <X size={24} className="text-[#0b152d]" />
                </button>
                <div className="max-h-[75vh] overflow-y-auto">
                  <SecureImage
                    src={config.getUploadUrl(
                      "messages",
                      selectedMessage.document_image
                    )}
                    alt={`Message from ${selectedMessage.author_name}`}
                    className="w-full object-contain rounded-lg shadow-lg"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {messages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/50 text-lg mb-2">No messages available</p>
            <p className="text-white/30 text-sm">
              Messages from dignitaries will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
