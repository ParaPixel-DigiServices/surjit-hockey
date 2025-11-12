import React from "react";
import { motion } from "framer-motion";
import logo from "../../assets/icon.png"; // adjust path if your logo file differs

/**
 * AimsObjectives.jsx
 * -------------------------------------------------
 * ✅ Navy background
 * ✅ Golden + white accents
 * ✅ Framer Motion fade-up animation
 * ✅ Fully mobile-first responsive
 * ✅ Matches institutional theme
 */

export default function AimsObjectives() {
  return (
    <section
      id="aims-objectives"
      className="relative w-full bg-[#1b2b4a] text-white py-16 sm:py-20 md:py-24 px-6 sm:px-8 md:px-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-5xl mx-auto text-center"
      >
        {/* --- Title Bar --- */}
        <div className="bg-[#e43d30] inline-block px-6 py-2 mb-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-wide uppercase">
            Aims and Objectives of Society
          </h2>
        </div>

        {/* --- Logo --- */}
        <div className="flex justify-center mb-8">
          <img
            src={logo}
            alt="Surjit Hockey Society Logo"
            className="w-28 sm:w-32 md:w-36 h-auto object-contain"
          />
        </div>

        {/* --- Heading --- */}
        <h3
          className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase mb-3"
          style={{ color: "#ffd700" }}
        >
          The Constitution of Surjit Hockey Society, Jalandhar
        </h3>

        <p className="italic text-sm sm:text-base mb-10 opacity-80">
          (Registered under the Societies Registration Act-XXI of 1908)
        </p>
      </motion.div>

      {/* --- Main Content --- */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-5xl mx-auto text-left space-y-6"
      >
        {/* Article 1 */}
        <h4
          className="text-lg sm:text-xl font-bold uppercase mb-2"
          style={{ color: "#ffd700" }}
        >
          Article – 1  Name of the Society
        </h4>

        <p className="leading-relaxed text-white/90">
          1. The Society shall be called{" "}
          <span className="font-semibold text-[#ffd700]">
            “SURJIT HOCKEY SOCIETY”
          </span>
          .
        </p>

        <p className="leading-relaxed text-white/90">
          2. The registered office of the society shall be at Room No. 4, Guru
          Gobind Singh Stadium, Jalandhar City – 144003 (Punjab-India).
        </p>

        {/* Article 2 */}
        <h4
          className="text-lg sm:text-xl font-bold uppercase mt-8 mb-2"
          style={{ color: "#ffd700" }}
        >
          Article – 2  Objects of the Society
        </h4>

        <p className="leading-relaxed text-white/90">
          3. The objects of the society shall be:
        </p>

        <ul className="list-none mt-4 space-y-3 pl-2 sm:pl-4 text-white/90">
          {[
            "To hold Surjit Memorial Hockey Tournament for men and women every year.",
            "To educate, guide and provide knowledge of various sports activities by training centers or otherwise.",
            "To create interest, encourage and promote sports spirit, especially the game of hockey, by holding matches in India or elsewhere.",
            "To promote sports and conduct benefit matches in favor of outstanding hockey players and sportspersons.",
            "To provide means for promotion and advancement mentioned in the column 3.",
            "To carry out any other activity conducive to the objects of the society."
          ].map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-base sm:text-lg leading-relaxed"
            >
              <span
                className="font-bold text-[#ffd700] min-w-[2rem]"
                style={{ fontVariantNumeric: "oldstyle-nums" }}
              >
                ({["I", "II", "III", "IV", "V", "VI"][i]})
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
