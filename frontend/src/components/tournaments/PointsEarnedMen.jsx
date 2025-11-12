import React from "react";
import { motion } from "framer-motion";
import rcf from "../../assets/teams/rcf.png";
import iocl from "../../assets/teams/iocl.png";
import psb from "../../assets/teams/psb.png";

export default function PointsEarnedMen() {
  const pools = [
    {
      name: "Pool - A (M)",
      teams: [
        {
          logo: rcf,
          name: "RCF",
          stats: { P: 1, W: 0, D: 0, L: 1, F: 0, A: 2, diff: -2, PTS: 0 },
        },
      ],
    },
    {
      name: "Pool - B (M)",
      teams: [
        {
          logo: iocl,
          name: "IOCL",
          stats: { P: 0, W: 0, D: 0, L: 0, F: 0, A: 0, diff: 0, PTS: 0 },
        },
        {
          logo: psb,
          name: "PSB",
          stats: { P: 0, W: 0, D: 0, L: 0, F: 0, A: 0, diff: 0, PTS: 0 },
        },
      ],
    },
    {
      name: "Pool - C (M)",
      teams: [],
    },
    {
      name: "Pool - D (M)",
      teams: [],
    },
  ];

  return (
    <section
      id="points-earned-men"
      className="relative w-full py-20 md:py-28 bg-[#fdfdfd] text-[#1b2b4a] font-[Sora] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* --- Section Heading --- */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold uppercase mb-6 text-center text-[#1b2b4a]"
        >
          Points Earned by Each Team – Men Section
        </motion.h2>

        <div className="w-24 h-[3px] mx-auto mb-12 bg-[#ffd700]" />

        {/* --- Grid of Pools --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {pools.map((pool, i) => (
            <motion.div
              key={pool.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="border border-[#1b2b4a]/10 rounded-xl shadow-md bg-white overflow-hidden"
            >
              {/* --- Pool Header --- */}
              <div className="bg-[#1b2b4a] text-white font-semibold px-4 py-2 uppercase text-sm">
                {pool.name}
              </div>

              {/* --- Table --- */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-[#f5f5f5] text-[#1b2b4a] font-bold">
                    <tr>
                      <th className="px-4 py-2">Teams</th>
                      <th className="px-2 py-2">P</th>
                      <th className="px-2 py-2">W</th>
                      <th className="px-2 py-2">D</th>
                      <th className="px-2 py-2">L</th>
                      <th className="px-2 py-2">F</th>
                      <th className="px-2 py-2">A</th>
                      <th className="px-2 py-2">+/-</th>
                      <th className="px-2 py-2">PTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pool.teams.length > 0 ? (
                      pool.teams.map((team, idx) => (
                        <tr
                          key={idx}
                          className="border-t border-[#1b2b4a]/10 hover:bg-[#f9f9f9]"
                        >
                          <td className="flex items-center gap-3 px-4 py-3 font-semibold">
                            <img
                              src={team.logo}
                              alt={team.name}
                              className="w-8 h-8 object-contain"
                            />
                            {team.name}
                          </td>
                          <td className="px-2 py-2 text-center">
                            {team.stats.P}
                          </td>
                          <td className="px-2 py-2 text-center">
                            {team.stats.W}
                          </td>
                          <td className="px-2 py-2 text-center">
                            {team.stats.D}
                          </td>
                          <td className="px-2 py-2 text-center">
                            {team.stats.L}
                          </td>
                          <td className="px-2 py-2 text-center">
                            {team.stats.F}
                          </td>
                          <td className="px-2 py-2 text-center">
                            {team.stats.A}
                          </td>
                          <td className="px-2 py-2 text-center">
                            {team.stats.diff}
                          </td>
                          <td className="px-2 py-2 text-center font-bold text-[#ffd700]">
                            {team.stats.PTS}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="9"
                          className="text-center py-6 text-gray-500 italic"
                        >
                          No teams added yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
