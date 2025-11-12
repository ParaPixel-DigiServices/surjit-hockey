import React from "react";
import { motion } from "framer-motion";

// --- Import Tribute Images ---
import sindhu from "../../assets/sindhu.jpg";
import bodhi from "../../assets/former_secretaries_1.jpg";
import mohanbir from "../../assets/mohanbir.jpg";
import ravinder from "../../assets/ravinder1.jpg";
import kohli from "../../assets/kohli.jpg";

export default function LestWeForget() {
  const tributes = [
    {
      name: "Late Mr. Kanwaljit Singh Sindhu, PCS",
      text: "Mr. Kanwaljit Singh Sindhu, PCS was Hony. Organizing Secretary of the Surjit Hockey Society, Jalandhar from 1985 to 1989. He was also District Transport Officer, Jalandhar.",
      image: sindhu,
    },
    {
      name: "Late Mr. Bhupinder Singh Bodhi",
      text: "Mr. Bodhi was the founder Hony. Organizing Secretary of the Society. He remained on this post in the year 1984-85. He was Sr. District Sports Officer, Jalandhar, Punjab. He was son of Mr. G. S. Bodhi, the coach of 1975 World Cup winner Indian Hockey Team. Mr. Bodhi was also a renowned hockey coach. He produced hundreds of players like Pargat Singh.",
      image: bodhi,
    },
    {
      name: "Late Mr. Mohanbir Singh, USA",
      text: "Late Mr. Mohanbir Singh, NRI, was the Joint Secretary of the Society.",
      image: mohanbir,
    },
    {
      name: "Late Mr. Ravinder Singh PISCO",
      text: "Mr. Ravinder Singh was Vice President of the Society. He was a good sports promoter.",
      image: ravinder,
    },
    {
      name: "Late Mr. R. K. Kohli",
      text: "Mr. R. K. Kohli, well known photographer in the field of sports, was our official Press Photographer for so many years.",
      image: kohli,
    },
  ];

  return (
    <section
      id="lest-we-forget"
      className="relative w-full py-20 md:py-28 px-6 sm:px-10 bg-gradient-to-b from-[#0a1123] to-black text-white font-[Sora] overflow-hidden"
    >
      {/* Golden ambient light */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute w-72 h-72 bg-[#ffd700]/10 rounded-full blur-3xl top-1/3 left-1/4 animate-pulse" />
        <div className="absolute w-96 h-96 bg-[#ffd700]/10 rounded-full blur-3xl bottom-1/4 right-1/4 animate-pulse" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* --- Section Heading --- */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold uppercase text-center mb-3"
          style={{ color: "#ffd700" }}
        >
          Lest We Forget
        </motion.h2>

        <div
          className="w-24 h-[3px] mx-auto mb-12"
          style={{ backgroundColor: "#ffd700" }}
        ></div>

        {/* --- Tribute Cards --- */}
        <div className="flex flex-col gap-20">
          {tributes.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? "" : "md:flex-row-reverse"
              }`}
            >
              {/* --- Image --- */}
              <div className="relative w-full md:w-1/3 aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={t.image}
                  alt={t.name}
                  className="absolute inset-0 w-full h-full object-cover object-top transform hover:scale-105 transition duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 border border-[#ffd700]/50 rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.2)]" />
              </div>

              {/* --- Text --- */}
              <div className="w-full md:w-2/3 space-y-3 text-center md:text-left">
                <h3
                  className="text-2xl sm:text-3xl font-bold"
                  style={{ color: "#ffd700" }}
                >
                  {t.name}
                </h3>
                <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                  {t.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
