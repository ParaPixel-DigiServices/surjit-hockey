import React from "react";
import { motion } from "framer-motion";
import daljitCheema from "../../assets/chief_advisors_1.jpg";

export default function ChiefAdvisor() {
  return (
    <section
      id="chief-advisor"
      className="w-full py-16 sm:py-20 md:py-24 px-6 sm:px-10 bg-[#1b2b4a] text-white font-[Sora]"
    >
      <div className="max-w-5xl mx-auto">
        {/* --- Section Heading --- */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold uppercase mb-3 text-center"
          style={{ color: "#ffd700" }}
        >
          Our Chief Advisor
        </motion.h2>

        <div
          className="w-24 h-[3px] mx-auto mb-10"
          style={{ backgroundColor: "#ffd700" }}
        ></div>

        {/* --- Profile Card --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8 hover:shadow-lg hover:shadow-[#ffd700]/20 transition duration-300"
        >
          {/* Image */}
          <div className="w-40 h-40 sm:w-44 sm:h-44 flex-shrink-0 rounded-lg overflow-hidden border-2 border-[#ffd700]/60 shadow-md mb-6 sm:mb-0 sm:mr-8">
            <img
              src={daljitCheema}
              alt="Dr. Daljit Singh Cheema"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-bold text-[#ffd700] mb-2">
              Dr. Daljit Singh Cheema
            </h3>
            <p className="text-white/90 text-lg">
              Education Minister, Punjab & MLA, Ropar
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
