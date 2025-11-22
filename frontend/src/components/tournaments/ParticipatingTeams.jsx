import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { motion, AnimatePresence } from "framer-motion";
import config from "../../config/api";

// --- Example logos (replace with real imports later) ---
import rcf from "../../assets/teams/rcf.png";
import navy from "../../assets/teams/navy.png";
import police from "../../assets/teams/police.png";
import airforce from "../../assets/teams/airforce.png";
import crpf from "../../assets/teams/crpf.png";
import iocl from "../../assets/teams/iocl.png";
import psb from "../../assets/teams/psb.png";
import army from "../../assets/teams/army.png";
import cbct from "../../assets/teams/cbct.png";
import railway from "../../assets/teams/railway.png";
import bpcl from "../../assets/teams/bpcl.png";
import bsf from "../../assets/teams/bsf.png";
import cag from "../../assets/teams/cag.png";
import fci from "../../assets/teams/fci.png";
import itbp from "../../assets/teams/itbp.png";

export default function ParticipatingTeams() {
  const [activeTab, setActiveTab] = useState("men");

  const [menTeams, setMenTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const teamsData = await api.getTeams();

        const formattedTeams = teamsData.map((team) => ({
          name: team.team_name,
          logo: team.team_logo
            ? config.getUploadUrl("teams", team.team_logo)
            : null,
          id: team.id,
        }));

        setMenTeams(formattedTeams);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
        // Fallback data
        setMenTeams([
          { name: "R C F Kapurthala", logo: rcf },
          { name: "Indian Navy", logo: navy },
          { name: "Punjab Police", logo: police },
          { name: "Indian Air Force", logo: airforce },
          { name: "CRPF Delhi", logo: crpf },
          { name: "Indian Oil Mumbai", logo: iocl },
          { name: "Punjab & Sind Bank", logo: psb },
          { name: "Army-XI Delhi", logo: army },
          { name: "Indian Railway", logo: railway },
          { name: "Bharat Petroleum", logo: bpcl },
          { name: "BSF Jalandhar", logo: bsf },
          { name: "CAG New Delhi", logo: cag },
          { name: "FCI", logo: fci },
          { name: "ITBP", logo: itbp },
          { name: "CBCT Delhi", logo: cbct },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return <div className="text-white text-center py-20">Loading teams...</div>;
  }

  return (
    <section
      id="participating-teams"
      className="relative w-full py-20 md:py-28 bg-gradient-to-b from-[#0a1123] to-[#1b2b4a] text-white font-[Sora] overflow-hidden"
    >
      {/* glowing accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-72 h-72 bg-[#ffd700]/10 rounded-full blur-3xl top-10 left-20 animate-pulse" />
        <div className="absolute w-96 h-96 bg-[#ffd700]/10 rounded-full blur-3xl bottom-10 right-20 animate-pulse" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10">
        {/* --- Section Header --- */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold uppercase text-center mb-3 text-[#ffd700]"
        >
          Participating Teams
        </motion.h2>
        <div className="w-24 h-[3px] bg-[#ffd700] mx-auto mb-10" />

        {/* --- Tabs --- */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("men")}
            className={`px-8 py-2 text-sm font-semibold uppercase rounded-t-lg transition-all duration-300 ${
              activeTab === "men"
                ? "bg-[#ffd700] text-[#0a1123]"
                : "bg-[#1b2b4a] text-white/70 hover:text-white border border-[#ffd700]/30"
            }`}
          >
            Men
          </button>
          <button
            onClick={() => setActiveTab("women")}
            className={`px-8 py-2 text-sm font-semibold uppercase rounded-t-lg transition-all duration-300 ${
              activeTab === "women"
                ? "bg-[#ffd700] text-[#0a1123]"
                : "bg-[#1b2b4a] text-white/70 hover:text-white border border-[#ffd700]/30"
            }`}
          >
            Women
          </button>
        </div>

        {/* --- Teams Grid --- */}
        <AnimatePresence mode="wait">
          {activeTab === "men" ? (
            <motion.div
              key="men"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 place-items-center"
            >
              {menTeams.map((team, i) => (
                <motion.div
                  key={team.name}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="flex flex-col items-center text-center space-y-3"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#ffd700]/60 shadow-xl bg-black/20 flex items-center justify-center">
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-lg font-semibold text-[#ffd700] drop-shadow-md">
                    {team.name}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="women"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16 text-white/80 text-lg"
            >
              No women teams registered this year.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
