import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Award, Users } from "lucide-react";
import config from "../config/api";
import SecureImage from "../components/ui/SecureImage";

/**
 * Honours Page
 * ------------
 * Hall of Fame - Tournament winners and achievements
 */
export default function Honours() {
  const [honours, setHonours] = useState([]);
  const [teams, setTeams] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("men"); // men or women

  useEffect(() => {
    fetchHonours();
  }, []);

  const fetchHonours = async () => {
    try {
      const [honoursRes, teamsRes] = await Promise.all([
        fetch(`${config.apiUrl}/additional/honours`),
        fetch(`${config.apiUrl}/teams?skip=0&limit=200`),
      ]);

      if (!honoursRes.ok) {
        throw new Error(`HTTP error! status: ${honoursRes.status}`);
      }

      const honoursData = await honoursRes.json();
      const teamsData = await teamsRes.json();

      // Create team lookup map with full team objects
      const teamMap = {};
      if (Array.isArray(teamsData)) {
        teamsData.forEach((team) => {
          teamMap[team.id] = team;
        });
      }

      setTeams(teamMap);
      setHonours(honoursData);
    } catch (error) {
      console.error("Failed to fetch honours:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTeamInfo = (teamId) => {
    if (teams[teamId]) {
      return {
        name: teams[teamId].team_name,
        logo: teams[teamId].team_logo,
      };
    }
    return { name: "Unknown Team", logo: null };
  };

  // Filter honours by category and group by year
  const filteredHonours = honours.filter(
    (h) => h.team_type === (activeCategory === "men" ? 0 : 1)
  );

  // Group by year (some years have multiple entries)
  const groupedByYear = {};
  filteredHonours.forEach((honour) => {
    if (!groupedByYear[honour.year]) {
      groupedByYear[honour.year] = [];
    }
    groupedByYear[honour.year].push(honour);
  });

  const years = Object.keys(groupedByYear).sort((a, b) => b - a);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b152d]">
        <div className="text-white text-xl">Loading honours...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b152d] text-white py-20 px-4 font-[Sora]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hall of <span className="text-[#ffd700]">Honours</span>
          </h1>
          <p className="text-white/70 text-lg mb-8">
            Celebrating champions and achievements across the years
          </p>

          {/* Category Toggle */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveCategory("men")}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeCategory === "men"
                  ? "bg-[#ffd700] text-[#0b152d]"
                  : "bg-[#1b2b4a] text-white hover:bg-[#1b2b4a]/80"
              }`}
            >
              <Users className="inline mr-2" size={20} />
              Men's Category
            </button>
            <button
              onClick={() => setActiveCategory("women")}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeCategory === "women"
                  ? "bg-[#ffd700] text-[#0b152d]"
                  : "bg-[#1b2b4a] text-white hover:bg-[#1b2b4a]/80"
              }`}
            >
              <Users className="inline mr-2" size={20} />
              Women's Category
            </button>
          </div>
        </motion.div>

        {/* Honours by Year */}
        <div className="space-y-8">
          {years.map((year, yearIndex) => {
            const yearHonours = groupedByYear[year];

            return (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: yearIndex * 0.05 }}
                className="bg-gradient-to-br from-[#1b2b4a] to-[#0b152d] rounded-xl p-8 border border-[#ffd700]/20"
              >
                {/* Year Header */}
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
                  <Trophy className="text-[#ffd700]" size={32} />
                  <h2 className="text-3xl font-bold text-[#ffd700]">{year}</h2>
                </div>

                {/* Matches for this year */}
                <div className="space-y-6">
                  {yearHonours.map((honour, index) => {
                    const winner = getTeamInfo(honour.team_id_1);
                    const runnerUp = getTeamInfo(honour.team_id_2);
                    const isJoint = honour.joint_winner;

                    return (
                      <div
                        key={index}
                        className="bg-[#0b152d]/50 rounded-lg p-6"
                      >
                        {isJoint ? (
                          // Joint Winners
                          <div className="text-center">
                            <div className="inline-flex items-center gap-3 bg-[#ffd700]/20 px-6 py-3 rounded-full mb-4">
                              <Trophy className="text-[#ffd700]" size={24} />
                              <span className="text-[#ffd700] font-bold text-lg">
                                Joint Winners
                              </span>
                            </div>
                            <div className="flex items-center justify-center gap-4">
                              {winner.logo && (
                                <SecureImage
                                  src={config.getUploadUrl(
                                    "teams",
                                    winner.logo
                                  )}
                                  alt={winner.name}
                                  className="w-16 h-16 object-contain"
                                />
                              )}
                              <span className="text-2xl font-bold text-white">
                                {winner.name}
                              </span>
                            </div>
                          </div>
                        ) : (
                          // Winner vs Runner-up
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                            {/* Winner */}
                            <div className="text-center">
                              <div className="inline-flex items-center gap-2 bg-[#ffd700]/20 px-4 py-2 rounded-full mb-3">
                                <Trophy className="text-[#ffd700]" size={20} />
                                <span className="text-[#ffd700] font-semibold">
                                  Winner
                                </span>
                              </div>
                              <div className="flex flex-col items-center gap-3">
                                {winner.logo && (
                                  <SecureImage
                                    src={config.getUploadUrl(
                                      "teams",
                                      winner.logo
                                    )}
                                    alt={winner.name}
                                    className="w-20 h-20 object-contain"
                                  />
                                )}
                                <span className="text-xl font-bold text-white">
                                  {winner.name}
                                </span>
                              </div>
                            </div>

                            {/* VS */}
                            <div className="text-center">
                              <span className="text-3xl font-bold text-white/30">
                                VS
                              </span>
                            </div>

                            {/* Runner-up */}
                            <div className="text-center">
                              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-3">
                                <Medal className="text-[#c0c0c0]" size={20} />
                                <span className="text-white/70 font-semibold">
                                  Runner-up
                                </span>
                              </div>
                              <div className="flex flex-col items-center gap-3">
                                {runnerUp.logo && (
                                  <SecureImage
                                    src={config.getUploadUrl(
                                      "teams",
                                      runnerUp.logo
                                    )}
                                    alt={runnerUp.name}
                                    className="w-20 h-20 object-contain"
                                  />
                                )}
                                <span className="text-xl font-bold text-white/70">
                                  {runnerUp.name}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {years.length === 0 && (
          <div className="text-center text-white/50 py-12">
            <Trophy className="mx-auto mb-4 text-white/20" size={64} />
            <p className="text-xl">
              No honours data available for this category
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
