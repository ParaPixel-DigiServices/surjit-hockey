import React from "react";
import { motion } from "framer-motion";
import surjitImg from "../../assets/surjit_singh.jpg"; // replace with actual image

/**
 * Olympian.jsx — Tribute to Olympian Surjit Singh Randhawa
 * --------------------------------------------------------
 * ✅ White background, navy text
 * ✅ Golden highlighted keywords
 * ✅ Centered portrait and elegant typography
 */

export default function Olympian() {
  return (
    <section
      id="about-olympian"
      style={{
        backgroundColor: "#ffffff",
        color: "#1b2b4a",
      }}
      className="w-full py-16 sm:py-20 md:py-24 px-6 sm:px-8 md:px-12"
    >
      {/* --- Title & Portrait --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-5xl mx-auto text-center"
      >
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase mb-4"
          style={{ color: "#ffd700" }}
        >
          Olympian Surjit Singh Randhawa
        </h2>
        <div
          className="w-24 h-[3px] mx-auto mb-10"
          style={{ backgroundColor: "#ffd700" }}
        ></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <img
            src={surjitImg}
            alt="Olympian Surjit Singh Randhawa"
            className="w-64 sm:w-72 md:w-80 lg:w-96 h-auto object-cover rounded-xl shadow-xl"
          />
        </motion.div>
      </motion.div>

      {/* --- Biography --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-5xl mx-auto space-y-6 text-justify leading-relaxed text-base sm:text-lg"
      >
        <p style={{ color: "#1b2b4a" }}>
          Born on October 10, 1951, Surjit Singh played for State College of
          Sports, Jalandhar under Guru Nanak Dev University and later for the
          Combined Universities team as a deep defender. Surjit Singh made his
          international debut in the second World Cup Hockey Tournament in
          Amsterdam in 1973. He was a member of the Indian team which, under the
          leadership of charismatic leader Ajit Pal Singh, won the third World
          Cup Hockey Tournament at Kuala Lumpur in 1975.
        </p>

        <p style={{ color: "#1b2b4a" }}>
          He also participated in the Fifth World Cup Hockey Tournament, the
          1974 and 1978 Asian Games, and the 1976 Montreal Olympic Games. Surjit
          Singh was acclaimed as one of the best full backs in the world. In
          1973 he was included in the World Hockey XI, and the following year he
          was a member of the All-Star Hockey XI. Surjit Singh was also the top
          scorer in both the Esanda International Hockey Tournament at Perth in
          Australia and the 1978 Asian Games. During his hockey career, Surjit
          Singh was deeply concerned about the players' causes. He served the
          Indian Airlines for a few years and later joined the Punjab Police.
        </p>

        <p style={{ color: "#1b2b4a" }}>
          It was tragic that Surjit Singh, after his retirement from the game,
          died in a road accident near Kartarpur in Jalandhar district. In
          Jalandhar, a hockey stadium is named after him, and a hockey academy
          bearing his name is also being run by the Punjab Government. The
          Society's fine functioning has given such impetus to the game in the
          region that bright and talented players are coming up in every age
          group. What better tribute could there be to Surjit Singh, who always
          considered it a sacred duty to fight for the cause of hockey and the
          players' rights.
        </p>

        <p style={{ color: "#1b2b4a" }}>
          The hockey stadium in Jalandhar (
          <span className="font-semibold text-[#ffd700]">Surjit Hockey Stadium</span>
          ) is named after him, and a hockey academy named after him is also
          being run by the Government of Punjab. In 1984, after his death, the
          Surjit Hockey Society was established in Jalandhar, and it organizes
          the annual Surjit Hockey Tournament every year. He was posthumously
          awarded the{" "}
          <span className="font-semibold text-[#ffd700]">Arjuna Award</span> in
          1998.
        </p>

        <p style={{ color: "#1b2b4a" }}>
          His wife{" "}
          <span className="font-semibold text-[#ffd700]">
            Mrs. Chanchal Randhawa
          </span>{" "}
          was also an international field hockey player who captained the India
          women's national field hockey team in the 1970s. His son{" "}
          <span className="font-semibold text-[#ffd700]">
            Sarbrinder Singh Randhawa
          </span>{" "}
          is a world-level lawn tennis player who represented India in various
          international tournaments, including the Asian Games, where he was a
          runner-up.
        </p>
      </motion.div>
    </section>
  );
}
