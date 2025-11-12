import React from "react";
import { motion } from "framer-motion";
import officials2 from "../../assets/teams/officials2.jpeg";

export default function HockeyIndiaPostings() {
  return (
    <section
      id="hockey-india-postings"
      className="relative w-full py-20 md:py-28 bg-gradient-to-b from-[#0a1123] to-[#1b2b4a] text-white font-[Sora] overflow-hidden"
    >
      {/* --- Ambient golden glow --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-[#ffd700]/10 rounded-full blur-3xl top-10 left-10 animate-pulse" />
        <div className="absolute w-80 h-80 bg-[#ffd700]/10 rounded-full blur-3xl bottom-10 right-10 animate-pulse" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center px-6 sm:px-10">
        {/* --- Section Heading --- */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold uppercase mb-4 text-[#ffd700]"
        >
          Hockey India Postings
        </motion.h2>

        <div className="w-24 h-[3px] mx-auto mb-10 bg-[#ffd700]" />

        {/* --- Circular Image --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden border border-[#ffd700]/30 shadow-[0_0_30px_rgba(255,215,0,0.2)] bg-black/20 p-4 sm:p-6 flex justify-center"
        >
          <img
            src={officials2}
            alt="Hockey India Postings Circular"
            className="w-full h-auto max-w-3xl rounded-lg object-contain shadow-lg hover:scale-[1.02] transition-transform duration-500"
          />
        </motion.div>
      </div>
    </section>
  );
}
