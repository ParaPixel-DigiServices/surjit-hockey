import React from "react";
import { motion } from "framer-motion";

// --- Import secretary images ---
import bhupinderBodhi from "../../assets/former_secretaries_1.jpg";
import kanwaljitSindhu from "../../assets/sindhu.jpg";
import jagjitPuri from "../../assets/former_secretaries_3.jpg";
import iqbalSandhu from "../../assets/former_secretaries_4.jpg";

export default function FormerSecretaries() {
  const secretaries = [
    {
      name: "Late. Mr. Bhupinder Singh Bodhi",
      designation: "Sr. Distt. Sports Officer, Jalandhar",
      years: "1984 - 1985",
      image: bhupinderBodhi,
    },
    {
      name: "Late. Mr. Kanwaljit Singh Sindhu, PCS",
      designation: "District Transport Officer, Jalandhar",
      years: "1985 - 1989",
      image: kanwaljitSindhu,
    },
    {
      name: "Mr. Jagjit Puri, IAS",
      designation:
        "Secretary to Govt. Pb. Dept. of Info. & Pub. Relations and Medical Education & Research",
      years: "1989 - 2004",
      image: jagjitPuri,
    },
    {
      name: "Mr. Iqbal Singh Sandhu, PCS",
      designation: "Additional Deputy Commissioner, Ludhiana",
      years: "2004 - 2015",
      image: iqbalSandhu,
    },
  ];

  return (
    <section
      id="former-secretaries"
      className="w-full py-16 sm:py-20 md:py-24 px-6 sm:px-10 bg-white text-[#1b2b4a] font-[Sora]"
    >
      <div className="max-w-6xl mx-auto">
        {/* --- Section Heading --- */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold uppercase mb-3 text-center"
          style={{ color: "#d4af37" }}
        >
          Our Former Secretaries
        </motion.h2>

        <div
          className="w-24 h-[3px] mx-auto mb-10"
          style={{ backgroundColor: "#d4af37" }}
        ></div>

        {/* --- Intro Paragraph --- */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-base sm:text-lg text-center max-w-3xl mx-auto mb-12 text-[#1b2b4a]/90"
        >
          At present,{" "}
          <span className="text-[#d4af37] font-semibold">
            Mr. Iqbal Singh Sandhu, PCS
          </span>
          , Additional Deputy Commissioner, Phagwara is the 4th Honorary
          Secretary of the Society. Other past Honorary Organizing Secretaries
          are as under:
        </motion.p>

        {/* --- Grid of Cards --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
          {secretaries.map((s, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-[#f8f8f8] border border-[#e0e0e0] rounded-xl p-6 text-center hover:shadow-lg hover:shadow-[#d4af37]/20 hover:-translate-y-1 transition duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="w-32 h-32 rounded-md overflow-hidden border-2 border-[#d4af37]/50 shadow-md">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-1 text-[#1b2b4a]">
                {s.name}
              </h3>
              <p className="text-sm sm:text-base mb-2 text-[#1b2b4a]/80">
                {s.designation}
              </p>
              <p className="text-sm sm:text-base italic text-[#d4af37]">
                {s.years}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
