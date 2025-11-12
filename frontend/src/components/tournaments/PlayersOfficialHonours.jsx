import React from "react";
import { motion } from "framer-motion";

export default function PlayersOfficialHonours() {
  const honours = [
    {
      no: 1,
      year: 2003,
      details: "All India Police Games Hockey Teams, Coaches and Officials",
    },
    {
      no: 2,
      year: 2003,
      details:
        "Olympian Ashok Kumar, Olympian Ajitpal Singh, Olympian M.P Ganesh, Olympian Charles, Olympian Sukhbir Grewal, Olympian Tarsem Singh, Olympian Mukhbain Singh & Other Olympians honoured during Tournament",
    },
    {
      no: 3,
      year: 2003,
      details:
        "Visiting Pakistan Veteran Cricket Team and Indian Veteran Cricket Team",
    },
  ];

  return (
    <section
      id="players-official-honours"
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
          Players / Official Honours
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
              {honours.map((a, i) => (
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
                  <td className="px-4 py-3 text-[#ffd700] font-semibold">{a.no}</td>
                  <td className="px-4 py-3">
                    <span className="bg-[#ffd700]/10 px-3 py-1 rounded-full border border-[#ffd700]/30 text-[#ffd700] font-semibold">
                      {a.year}
                    </span>
                  </td>
                  <td className="px-4 py-3 leading-relaxed">{a.details}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
