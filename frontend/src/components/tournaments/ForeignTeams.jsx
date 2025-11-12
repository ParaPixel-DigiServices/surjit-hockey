import React from "react";
import { motion } from "framer-motion";

export default function ForeignTeams() {
  const teams = [
    { no: 1, year: 1989, name: "Pakistan" },
    { no: 2, year: 1994, name: "Tajikistan" },
    { no: 3, year: 1995, name: "Russia" },
    { no: 4, year: 1995, name: "Bangladesh" },
    { no: 5, year: 1996, name: "Malaysia" },
    { no: 6, year: 1997, name: "USA (Women Team)" },
    { no: 7, year: 1997, name: "Russia - Uzbekistan" },
    { no: 8, year: 1998, name: "Russia" },
    { no: 9, year: 2003, name: "Croatia" },
    { no: 10, year: 2003, name: "Canada" },
    { no: 11, year: 2004, name: "Pakistan" },
    { no: 12, year: 2005, name: "Pakistan" },
    { no: 13, year: 2006, name: "Pakistan" },
    { no: 14, year: 2008, name: "Pakistan" },
    { no: 15, year: 2010, name: "Pakistan" },
    { no: 16, year: 2011, name: "Pakistan (Men & Women)" },
    { no: 17, year: 2012, name: "Pakistan (Men & Women)" },
    { no: 18, year: 2013, name: "Pakistan (Men & Women)" },
    { no: 19, year: 2014, name: "Pakistan (Men & Women)" },
  ];

  return (
    <section
      id="foreign-teams"
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
          Foreign Teams (Departmental / Clubs)
        </motion.h2>

        <p className="text-center text-white/80 mb-10 text-sm sm:text-base">
          Who Participated In <span className="text-[#ffd700] font-semibold">IndianOil SERVO Surjit Hockey Tournament</span>
        </p>

        <div className="w-24 h-[3px] bg-[#ffd700] mx-auto mb-12" />

        {/* --- Table Container --- */}
        <div className="overflow-x-auto bg-[#0e1830]/60 backdrop-blur-md border border-[#ffd700]/30 rounded-xl shadow-lg">
          <table className="w-full text-sm md:text-base text-left border-collapse">
            <thead className="bg-[#1b2b4a]/80 text-[#ffd700] uppercase">
              <tr>
                <th className="px-4 py-3 border-b border-[#ffd700]/20">Sr. No.</th>
                <th className="px-4 py-3 border-b border-[#ffd700]/20">Year</th>
                <th className="px-4 py-3 border-b border-[#ffd700]/20">Name Of Teams</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((t, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className={`${
                    i % 2 === 0
                      ? "bg-[#1b2b4a]/40"
                      : "bg-[#0e1830]/40"
                  } border-b border-[#ffd700]/10 hover:bg-[#ffd700]/10 transition`}
                >
                  <td className="px-4 py-3 text-[#ffd700] font-semibold">{t.no}</td>
                  <td className="px-4 py-3">{t.year}</td>
                  <td className="px-4 py-3">{t.name}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
