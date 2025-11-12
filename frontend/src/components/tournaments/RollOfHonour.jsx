import React from "react";
import { motion } from "framer-motion";

export default function RollOfHonour() {
  const records = [
    { year: "1984", winner: "", runner: "", remarks: "" },
    { year: "1985", winner: "Punjab Police", runner: "", remarks: "" },
    { year: "1986", winner: "Punjab Police", runner: "BSF Jalandhar", remarks: "" },
    { year: "1987", winner: "R C F Kapurthala", runner: "", remarks: "Joint Winner" },
    { year: "1988", winner: "Punjab & Sind Bank", runner: "BSF Jalandhar", remarks: "" },
    { year: "1989", winner: "Punjab & Sind Bank", runner: "BSF Jalandhar", remarks: "" },
    { year: "1990", winner: "", runner: "R C F Kapurthala", remarks: "" },
    { year: "1991", winner: "ASC, Jalandhar", runner: "", remarks: "" },
    { year: "1992", winner: "Punjab & Sind Bank", runner: "AIR India Mumbai", remarks: "" },
    { year: "1993", winner: "Punjab & Sind Bank", runner: "Punjab Police", remarks: "Joint Winner" },
    { year: "1994", winner: "Punjab & Sind Bank", runner: "AIR India Mumbai", remarks: "" },
    { year: "1995", winner: "Punjab Police", runner: "AIR India Mumbai", remarks: "" },
    { year: "1996", winner: "Army-XI Delhi", runner: "Punjab Police", remarks: "" },
    { year: "1997", winner: "Punjab Police", runner: "Punjab & Sind Bank", remarks: "" },
    { year: "1998", winner: "BSF Jalandhar", runner: "Punjab & Sind Bank", remarks: "" },
    { year: "1999", winner: "BSF Jalandhar", runner: "Punjab & Sind Bank", remarks: "" },
    { year: "2000", winner: "Punjab Police", runner: "Punjab & Sind Bank", remarks: "" },
    { year: "2001", winner: "Punjab & Sind Bank", runner: "Punjab Police", remarks: "" },
    { year: "2002", winner: "Bharat Petrolium", runner: "Punjab & Sind Bank", remarks: "" },
    { year: "2003", winner: "Bharat Petrolium", runner: "BSF Jalandhar", remarks: "" },
    { year: "2004", winner: "Punjab & Sind Bank", runner: "Punjab Police", remarks: "" },
    { year: "2005", winner: "", runner: "Indian Oil Mumbai", remarks: "" },
    { year: "2006", winner: "Punjab & Sind Bank", runner: "Indian Oil Mumbai", remarks: "" },
    { year: "2007", winner: "Indian Oil Mumbai", runner: "", remarks: "" },
    { year: "2008", winner: "Punjab & Sind Bank", runner: "", remarks: "" },
    { year: "2009", winner: "Bharat Petrolium", runner: "Indian Oil Mumbai", remarks: "" },
    { year: "2010", winner: "Indian Oil Mumbai", runner: "AIR India Mumbai", remarks: "" },
    { year: "2011", winner: "AIR India Mumbai", runner: "Indian Oil Mumbai", remarks: "" },
    { year: "2012", winner: "Indian Oil Mumbai", runner: "Bharat Petrolium", remarks: "" },
    { year: "2013", winner: "Punjab & Sind Bank", runner: "Indian Oil Mumbai", remarks: "" },
    { year: "2014", winner: "Indian Oil Mumbai", runner: "Punjab & Sind Bank", remarks: "" },
    { year: "2015", winner: "Indian Railway", runner: "Indian Oil Mumbai", remarks: "" },
    { year: "2016", winner: "PNB Delhi", runner: "Army-XI Delhi", remarks: "" },
    { year: "2017", winner: "Punjab Police", runner: "ONGC Delhi", remarks: "" },
    { year: "2018", winner: "Army-XI Delhi", runner: "Indian Railway", remarks: "" },
    { year: "2019", winner: "Punjab & Sind Bank", runner: "Indian Oil Mumbai", remarks: "" },
    {
      year: "2020",
      winner: "Not Held Due to Covid 19",
      runner: "Not Held Due to Covid 19",
      remarks: "Joint Winner",
    },
    { year: "2021", winner: "Indian Railway", runner: "Punjab & Sind Bank", remarks: "" },
    { year: "2022", winner: "Indian Railway", runner: "Indian Oil Mumbai", remarks: "" },
    { year: "2023", winner: "Indian Oil Mumbai", runner: "CAG New Delhi", remarks: "" },
    { year: "2024", winner: "Indian Oil Mumbai", runner: "Bharat Petrolium", remarks: "" },
  ];

  return (
    <section
      id="roll-of-honour"
      className="relative w-full py-20 md:py-28 bg-gradient-to-b from-[#0a1123] to-[#1b2b4a] text-white font-[Sora]"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* --- Header --- */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold uppercase text-center mb-6 text-[#ffd700]"
        >
          Roll Of Honour
        </motion.h2>

        <div className="w-24 h-[3px] bg-[#ffd700] mx-auto mb-12" />

        {/* --- Table Container --- */}
        <div className="overflow-x-auto bg-[#0e1830]/60 backdrop-blur-md border border-[#ffd700]/30 rounded-xl shadow-lg">
          <table className="w-full text-sm md:text-base text-left border-collapse">
            <thead className="bg-[#1b2b4a]/80 text-[#ffd700] uppercase">
              <tr>
                <th className="px-4 py-3 border-b border-[#ffd700]/20">Year</th>
                <th className="px-4 py-3 border-b border-[#ffd700]/20">Team Winner</th>
                <th className="px-4 py-3 border-b border-[#ffd700]/20">Team Runner-up</th>
                <th className="px-4 py-3 border-b border-[#ffd700]/20">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  viewport={{ once: true }}
                  className={`border-b border-[#ffd700]/10 hover:bg-[#ffd700]/10 transition`}
                >
                  <td className="px-4 py-2 font-semibold text-[#ffd700]">{r.year}</td>
                  <td className="px-4 py-2">{r.winner || "-"}</td>
                  <td className="px-4 py-2">{r.runner || "-"}</td>
                  <td className="px-4 py-2 italic text-white/70">{r.remarks || "-"}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
