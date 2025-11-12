import React from "react";
import { motion } from "framer-motion";

export default function MatchesConducted() {
  const matches = [
    {
      no: 1,
      year: 1995,
      details: "Australia Universities Vs Surjit-XI",
    },
    {
      no: 2,
      year: 1995,
      details: "Pakistan-XI Vs Punjab-XI",
    },
    {
      no: 3,
      year: 2003,
      details: "Waheb Hockey Club Vs Punjab-XI",
    },
    {
      no: 4,
      year: 2005,
      details: "Indo - Pak Punjab Hockey Match 2005",
    },
  ];

  return (
    <section
      id="matches-conducted"
      className="relative w-full py-20 md:py-28 bg-gradient-to-b from-[#0a1123] to-[#1b2b4a] text-white font-[Sora]"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* --- Header --- */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold uppercase text-center mb-3 text-[#ffd700]"
        >
          Matches Conducted
        </motion.h2>

        <div className="w-24 h-[3px] bg-[#ffd700] mx-auto mb-12" />

        {/* --- Table --- */}
        <div className="overflow-x-auto bg-[#0e1830]/60 backdrop-blur-md border border-[#ffd700]/30 rounded-xl shadow-lg">
          <table className="w-full text-sm md:text-base text-left border-collapse">
            <thead className="bg-[#1b2b4a]/80 text-[#ffd700] uppercase">
              <tr>
                <th className="px-4 py-3 border-b border-[#ffd700]/20">Sr. No.</th>
                <th className="px-4 py-3 border-b border-[#ffd700]/20">Year</th>
                <th className="px-4 py-3 border-b border-[#ffd700]/20">
                  Name of Players / Officials / Teams Honour
                </th>
              </tr>
            </thead>

            <tbody>
              {matches.map((m, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={`${
                    i % 2 === 0 ? "bg-[#1b2b4a]/40" : "bg-[#0e1830]/40"
                  } border-b border-[#ffd700]/10 hover:bg-[#ffd700]/10 transition`}
                >
                  <td className="px-4 py-3 text-[#ffd700] font-semibold">{m.no}</td>
                  <td className="px-4 py-3">
                    <span className="bg-[#ffd700]/10 px-3 py-1 rounded-full border border-[#ffd700]/30 text-[#ffd700] font-semibold">
                      {m.year}
                    </span>
                  </td>
                  <td className="px-4 py-3 leading-relaxed">{m.details}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
