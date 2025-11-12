import React from "react";
import { motion } from "framer-motion";
import ranbirImg from "../../assets/secretary_12A.png"; // replace with your actual file name

/**
 * HonorarySecretary.jsx
 * ----------------------------------------------------
 * Alternating dark section with gold highlights
 * Features Mr. Ranbir Singh Tut (Honorary Organizing Secretary)
 */

export default function HonorarySecretary() {
  return (
    <section
      id="honorary-secretary"
      className="w-full py-16 sm:py-20 md:py-24 px-6 sm:px-8 md:px-12 bg-[#1b2b4a] text-white"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* --- Section Title --- */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold uppercase mb-3"
          style={{ color: "#ffd700" }}
        >
          Honorary Organizing Secretary of Society
        </motion.h2>

        <div
          className="w-24 h-[3px] mx-auto mb-10"
          style={{ backgroundColor: "#ffd700" }}
        ></div>

        {/* --- Profile Image --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <img
            src={ranbirImg}
            alt="Ranbir Singh Tut"
            className="w-56 sm:w-64 h-auto rounded-lg border-2 border-[#ffd700]/60 shadow-lg object-cover"
          />
        </motion.div>

        {/* --- Name --- */}
        <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-[#ffd700]">
          Ranbir Singh Tut
        </h3>

        {/* --- Description --- */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-white/90"
        >
          Mr. Ranbir Singh Tut serves as the{" "}
          <span className="text-[#ffd700] font-medium">
            Honorary Organizing Secretary
          </span>{" "}
          of the Surjit Hockey Society. His leadership, dedication, and vision
          have been instrumental in maintaining the legacy and efficiency of the
          society’s organization and management.
        </motion.p>
      </div>
    </section>
  );
}
