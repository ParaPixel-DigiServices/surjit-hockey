import React from "react";
import { motion } from "framer-motion";
import workingPresidentsImg from "../../assets/wroking_presidents.png";

/**
 * WorkingPresident.jsx
 * ----------------------------------------------------
 * White background + enforced navy text
 * Gold highlights and clear color isolation from previous sections
 */

export default function WorkingPresident() {
  return (
    <section
      id="working-president"
      className="w-full py-16 sm:py-20 md:py-24 px-6 sm:px-8 md:px-12 bg-white"
      style={{ color: "#1b2b4a" }}
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* --- Section Title --- */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold uppercase mb-3"
          style={{ color: "#d4af37" }}
        >
          Working Presidents of the Society
        </motion.h2>

        <div
          className="w-24 h-[3px] mx-auto mb-10"
          style={{ backgroundColor: "#d4af37" }}
        ></div>

        {/* --- Group Photo --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex justify-center mb-12"
        >
          <img
            src={workingPresidentsImg}
            alt="Working Presidents of Surjit Hockey Society"
            className="w-full max-w-5xl h-auto rounded-lg shadow-lg border border-[#d4af37]/30"
          />
        </motion.div>

        {/* --- Description --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto text-justify text-base sm:text-lg leading-relaxed"
        >
          <h3
            className="text-xl sm:text-2xl font-semibold mb-4"
            style={{ color: "#d4af37" }}
          >
            Mr. Pargat Singh Padamashree
          </h3>

          <p className="text-[#1b2b4a]/70 mb-6">
            Olympian & MLA, Jalandhar Cantonment
          </p>

          <p className="text-[#1b2b4a]/90">
            Mr. Pargat Singh is a hockey-player-turned-politician and currently
            serves as the{" "}
            <span className="text-[#d4af37] font-semibold">
              Working President of the Surjit Hockey Society (Jalandhar)
            </span>
            . A former Indian hockey captain and full-back defender, he was
            regarded as one of the world’s finest defenders during his era.
          </p>

          <p className="mt-4 text-[#1b2b4a]/90">
            He captained the Indian men’s hockey team at both the{" "}
            <span className="text-[#d4af37] font-semibold">
              1992 Barcelona Olympics
            </span>{" "}
            and{" "}
            <span className="text-[#d4af37] font-semibold">
              1996 Atlanta Olympics
            </span>
            . Before entering politics, he also served as{" "}
            <span className="text-[#d4af37] font-semibold">
              Director of Sports, Punjab
            </span>
            . His legendary performance in the{" "}
            <span className="text-[#d4af37] font-semibold">
              1985 Champions Trophy
            </span>
            — scoring four goals in the last six minutes against Germany to tie
            the match 5-5 — made him a national hero.
          </p>

          <p className="mt-4 text-[#1b2b4a]/90">
            In 1986 at Karachi, he replicated this miracle against Holland,
            leading India to a 3-2 victory. His heroics cemented his status as
            one of India’s greatest hockey icons. Later, Mr. Pargat Singh won
            the{" "}
            <span className="text-[#d4af37] font-semibold">
              Jalandhar Cantonment legislative seat
            </span>{" "}
            and continues to serve his community with great dedication.
          </p>

          <p className="mt-4 text-[#1b2b4a]/90">
            For his outstanding contributions to Indian hockey, he was honoured
            with the{" "}
            <span className="text-[#d4af37] font-semibold">
              Arjuna Award (1989)
            </span>{" "}
            and the{" "}
            <span className="text-[#d4af37] font-semibold">
              Padma Shri (1998)
            </span>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
