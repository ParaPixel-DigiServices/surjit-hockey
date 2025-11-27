import React from "react";
import { motion } from "framer-motion";
import eoiImage from "../assets/Eoi.jpg";
import SecureImage from "../components/ui/SecureImage";

/**
 * Streaming Page
 * --------------
 * Expression of Interest for TV Channel Partners
 */
export default function Streaming() {
  return (
    <div className="min-h-screen bg-[#0b152d] text-white py-20 px-4 font-[Sora]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="text-[#ffd700]">EOI</span>
          </h1>
        </motion.div>

        {/* EOI Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <SecureImage
            src={eoiImage}
            alt="Expression of Interest - TV Channel Partner"
            className="w-full h-auto object-contain rounded-lg shadow-2xl"
          />
        </motion.div>
      </div>
    </div>
  );
}
