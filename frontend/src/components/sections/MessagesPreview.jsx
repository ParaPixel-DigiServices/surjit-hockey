import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import config from "../../config/api";
import SecureImage from "../ui/SecureImage";

/**
 * MessagesPreview - Home page messages section
 * Shows officials with their images and names
 * Click opens popup with full message like in Messages page
 */
export default function MessagesPreview() {
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Messages data from officials
  const messages = [
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
      document_image: "msg_kejriwal.jpg",
      message_text:
        "I am delighted to know that Surjit Hockey Society is organizing the 39th Surjit Hockey Tournament. Hockey is our national sport and such tournaments are essential for nurturing young talent. I congratulate the organizers for their continued efforts in promoting sports and wish all participants the very best.",
      display_order: 2,
    },
    {
      id: 3,
      author_name: "Sanjay Singh",
      author_designation: "Member of Parliament (Rajya Sabha)",
      author_image: "mp.png",
      document_image: "msg_sanjay.jpg",
      message_text:
        "The Surjit Hockey Tournament has been a beacon of excellence in promoting hockey at the grassroots level. As we celebrate the 39th edition, I commend the Surjit Hockey Society for their unwavering commitment to the sport. May this tournament continue to inspire future generations of hockey players.",
      display_order: 3,
    },
    {
      id: 4,
      author_name: "Dilip Tirkey",
      author_designation: "President, Hockey India",
      author_image: "hockeyindia.png",
      document_image: "msg_tirkey.jpg",
      message_text:
        "The Surjit Hockey Tournament stands as a testament to the enduring legacy of Late Sardar Surjit Singh Sethi Ji. Hockey India is proud to be associated with this prestigious tournament that has consistently contributed to the development of hockey in our country. I wish all teams and players great success.",
      display_order: 4,
    },
    {
      id: 5,
      author_name: "Pargat Singh",
      author_designation: "Former Captain, Indian Hockey Team",
      author_image: "pargat.png",
      document_image: "msg_pargat.jpg",
      message_text:
        "Having been part of the hockey fraternity for decades, I have witnessed the tremendous impact of the Surjit Hockey Tournament. It has been instrumental in discovering and nurturing talent from across the nation. My best wishes to all participants and organizers for another successful edition.",
      display_order: 5,
    },
    {
      id: 6,
      author_name: "Zafar Iqbal",
      author_designation: "Former Captain, Indian Hockey Team",
      author_image: "zafar.png",
      document_image: "msg_zafar.jpg",
      message_text:
        "The Surjit Hockey Tournament has always held a special place in the hearts of hockey players. It represents the true spirit of the game and continues to uphold the highest standards of competition. I extend my heartfelt wishes for the success of this tournament.",
      display_order: 6,
    },
  ];

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (selectedMessage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedMessage]);

  return (
    <>
      <section className="relative bg-white py-16 md:py-24 font-[Sora]">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-[#1b2b4a] uppercase tracking-wide"
          >
            Messages from Dignitaries
          </motion.h2>
          <div className="mt-3 h-[3px] w-24 bg-[#ffd700] mx-auto rounded-full" />
        </div>

        {/* Officials Grid */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedMessage(message)}
                className="text-center cursor-pointer group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-4 border-[#ffd700]/30 group-hover:border-[#ffd700] transition-colors duration-300 shadow-lg">
                  <SecureImage
                    src={config.getUploadUrl("officials", message.author_image)}
                    alt={message.author_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-sm text-[#1b2b4a] group-hover:text-[#ffd700] transition-colors duration-300">
                  {message.author_name}
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  {message.author_designation}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Message Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMessage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#ffd700]">
                    <SecureImage
                      src={config.getUploadUrl(
                        "officials",
                        selectedMessage.author_image
                      )}
                      alt={selectedMessage.author_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1b2b4a]">
                      {selectedMessage.author_name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedMessage.author_designation}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {selectedMessage.document_image && (
                  <div className="mb-6">
                    <SecureImage
                      src={config.getUploadUrl(
                        "messages",
                        selectedMessage.document_image
                      )}
                      alt="Message Document"
                      className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
                    />
                  </div>
                )}
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-800 leading-relaxed text-justify">
                    {selectedMessage.message_text}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
