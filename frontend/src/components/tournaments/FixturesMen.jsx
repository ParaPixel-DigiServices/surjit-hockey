import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { motion } from "framer-motion";
import indianNavy from "../../assets/teams/navy.png";
import rcf from "../../assets/teams/rcf.png";

export default function FixturesMen() {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual tournament ID dynamically
        const tournamentId = 100; 
        const fixturesData = await api.getTournamentFixtures(tournamentId);
        
        const formattedFixtures = fixturesData.map(match => ({
          date: new Date(match.date_match).toLocaleString(),
          matchNo: match.match_no,
          pool: match.pool_type === 1 ? "Pool - A (M)" : "Pool - B (M)", // Adjust logic based on pool type
          team1: { name: `Team ${match.team_id_1}`, logo: indianNavy }, // Placeholder for team name/logo lookup
          team2: { name: `Team ${match.team_id_2}`, logo: rcf }, // Placeholder
        }));
        
        setFixtures(formattedFixtures);
      } catch (error) {
        console.error("Failed to fetch fixtures:", error);
        // Fallback data
        setFixtures([
            {
              date: "2025-11-05 12:34:00",
              matchNo: 1,
              pool: "Pool - A (M)",
              team1: { name: "Indian Navy", logo: indianNavy },
              team2: { name: "R C F Kapurthala", logo: rcf },
            },
          ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFixtures();
  }, []);

  if (loading) {
    return <div className="text-white text-center py-20">Loading fixtures...</div>;
  }

  const leaderboard = [
    "PUNJAB & SIND BANK",
    "R C F KAPURTHALA",
    "INDIAN OIL MUMBAI",
    "INDIAN NAVY",
    "PUNJAB POLICE",
    "INDIAN AIR FORCE",
    "CRPF DELHI",
    "ARMY-XI DELHI",
    "INDIAN RAILWAY",
    "BHARAT PETROLIUM",
    "BSF JALANDHAR",
    "CAG NEW DELHI",
  ];

  return (
    <section
      id="fixtures-men"
      className="relative w-full py-20 md:py-28 bg-gradient-to-b from-[#0a1123] to-[#1b2b4a] text-white font-[Sora]"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* --- Section Header --- */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold uppercase text-center mb-6 text-[#ffd700]"
        >
          Fixtures
        </motion.h2>

        <div className="w-24 h-[3px] bg-[#ffd700] mx-auto mb-12" />

        {/* --- Control Bar --- */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex gap-2 text-sm font-semibold uppercase">
            <button className="px-6 py-2 bg-[#ffd700] text-[#1b2b4a] rounded-md hover:bg-[#e6c200] transition">
              Men
            </button>
            <button className="px-6 py-2 bg-[#ffffff1a] text-white/60 rounded-md cursor-not-allowed">
              Women
            </button>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 bg-[#ffffff1a] text-white rounded-md text-sm hover:bg-white/20 transition">
              Print
            </button>
            <button className="px-4 py-2 bg-[#ffd700] text-[#1b2b4a] rounded-md font-semibold text-sm hover:bg-[#e6c200] transition">
              Filter Results
            </button>
          </div>
        </div>

        {/* --- Fixture Table --- */}
        <div className="overflow-x-auto border border-[#ffd700]/30 rounded-xl shadow-lg bg-[#0e1830]/60 backdrop-blur-md mb-20">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead className="bg-[#1b2b4a]/80 text-[#ffd700] font-bold uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Match Date - Time</th>
                <th className="px-4 py-3 text-left">Match No.</th>
                <th className="px-4 py-3 text-left">Pool</th>
                <th className="px-4 py-3 text-center">Team</th>
                <th className="px-4 py-3 text-center">VS</th>
                <th className="px-4 py-3 text-center">Team</th>
              </tr>
            </thead>

            <tbody>
              {fixtures.map((match, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="border-t border-[#ffd700]/20 hover:bg-[#ffd700]/10 transition"
                >
                  <td className="px-4 py-4">{match.date}</td>
                  <td className="px-4 py-4">{match.matchNo}</td>
                  <td className="px-4 py-4">{match.pool}</td>

                  <td className="text-center py-4">
                    <div className="flex flex-col items-center">
                      <img
                        src={match.team1.logo}
                        alt={match.team1.name}
                        className="w-14 h-14 object-contain mb-1 rounded-full border-2 border-[#ffd700]/50"
                      />
                      <span className="font-semibold">{match.team1.name}</span>
                    </div>
                  </td>

                  <td className="text-center text-[#ffd700] font-bold text-lg">
                    Versus
                  </td>

                  <td className="text-center py-4">
                    <div className="flex flex-col items-center">
                      <img
                        src={match.team2.logo}
                        alt={match.team2.name}
                        className="w-14 h-14 object-contain mb-1 rounded-full border-2 border-[#ffd700]/50"
                      />
                      <span className="font-semibold">{match.team2.name}</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- Previous Results Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-[#0d142b]/70 p-8 rounded-xl border border-[#ffd700]/30 shadow-lg"
        >
          {/* --- Left: Last Match Result --- */}
          <div className="flex flex-col items-center justify-center bg-[#1b2b4a]/60 rounded-xl p-6 text-center shadow-md">
            <h3 className="text-2xl font-bold text-[#ffd700] uppercase mb-6">
              Previous Results
            </h3>
            <div className="flex items-center justify-center gap-8">
              <div className="flex flex-col items-center">
                <img
                  src={indianNavy}
                  alt="Indian Navy"
                  className="w-20 h-20 object-contain mb-2"
                />
                <p className="font-semibold">Indian Navy</p>
              </div>

              <div className="text-4xl font-bold text-[#ff4444] bg-[#ffffff1a] px-6 py-2 rounded-md shadow-inner">
                2 - 0
              </div>

              <div className="flex flex-col items-center">
                <img
                  src={rcf}
                  alt="RCF"
                  className="w-20 h-20 object-contain mb-2"
                />
                <p className="font-semibold">R C F Kapurthala</p>
              </div>
            </div>
          </div>

          {/* --- Right: Leaderboard --- */}
          <div className="bg-[#1b2b4a]/60 rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xl font-bold uppercase text-[#ffd700]">
                Men
              </h3>
              <button className="px-3 py-1 bg-[#ffffff1a] text-white/60 rounded cursor-not-allowed text-sm">
                Women
              </button>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#ffd700]/20 text-[#ffd700] uppercase">
                  <th className="text-left py-2">S No.</th>
                  <th className="text-left py-2">Teams</th>
                  <th className="text-center py-2">P</th>
                  <th className="text-center py-2">PTS</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((team, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/5 hover:bg-[#ffd700]/5 transition"
                  >
                    <td className="py-2">{i + 1}</td>
                    <td className="py-2 uppercase">{team}</td>
                    <td className="py-2 text-center">0</td>
                    <td className="py-2 text-center">0</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
