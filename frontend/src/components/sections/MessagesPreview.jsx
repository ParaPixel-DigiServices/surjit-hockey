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

  // Messages data from officials (same as /messages page)
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
      <section className="relative bg-white py-2 md:py-3 font-[Sora]">
        {/* Section Header */}
        <div className="text-center mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-[#1b2b4a] uppercase tracking-wide"
          >
            Messages from Dignitaries
          </motion.h2>
          <div className="mt-2 h-[3px] w-24 bg-[#ffd700] mx-auto rounded-full" />
        </div>

        {/* Officials Grid */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
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
                    src={config.getUploadUrl("messages", message.author_image)}
                    alt={message.author_name}
                    className="w-full h-full object-cover"
                    loading="lazy"
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
                        "messages",
                        selectedMessage.author_image
                      )}
                      alt={selectedMessage.author_name}
                      className="w-full h-full object-cover"
                      loading="lazy"
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
                      loading="lazy"
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
