import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { api } from "../../services/api";

export default function RollOfHonour() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [honoursData, teamsData] = await Promise.all([
          api.getHonours(),
          api.getTeams(0, 1000),
        ]);

        // Create team lookup
        const teamMap = {};
        teamsData.forEach((team) => {
          teamMap[team.id] = team.team_name;
        });
        setTeams(teamMap);

        // Transform honours data
        const formatted = honoursData.map((h) => ({
          year: h.year,
          winner: h.winner_team ? teamMap[h.winner_team] || "Unknown" : "",
          runner: h.runner_team ? teamMap[h.runner_team] || "Unknown" : "",
          remarks: h.remarks || "",
        }));

        setRecords(formatted);
      } catch (error) {
        console.error("Failed to fetch honours data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section
        id="roll-of-honour"
        className="relative w-full py-20 bg-[#0a1123] text-white"
      >
        <div className="text-center text-xl">Loading honours data...</div>
      </section>
    );
  }

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
                <th className="px-4 py-3 border-b border-[#ffd700]/20">
                  Team Winner
                </th>
                <th className="px-4 py-3 border-b border-[#ffd700]/20">
                  Team Runner-up
                </th>
                <th className="px-4 py-3 border-b border-[#ffd700]/20">
                  Remarks
                </th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-white/50">
                    No honours data available
                  </td>
                </tr>
              ) : (
                records.map((r, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    viewport={{ once: true }}
                    className={`border-b border-[#ffd700]/10 hover:bg-[#ffd700]/10 transition`}
                  >
                    <td className="px-4 py-2 font-semibold text-[#ffd700]">
                      {r.year}
                    </td>
                    <td className="px-4 py-2">{r.winner || "-"}</td>
                    <td className="px-4 py-2">{r.runner || "-"}</td>
                    <td className="px-4 py-2 italic text-white/70">
                      {r.remarks || "-"}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
