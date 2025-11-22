import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";

/**
 * Honours Page
 * ------------
 * Hall of Fame - Tournament winners and achievements
 */
export default function Honours() {
  const [honours, setHonours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHonours();
  }, []);

  const fetchHonours = async () => {
    try {
      const [honoursRes, teamsRes] = await Promise.all([
        fetch("http://localhost:8000/api/v1/additional/honours"),
        fetch("http://localhost:8000/api/v1/teams?skip=0&limit=1000"),
      ]);

      if (!honoursRes.ok) {
        throw new Error(`HTTP error! status: ${honoursRes.status}`);
      }

      const honoursData = await honoursRes.json();
      const teamsData = await teamsRes.json();

      // Create team lookup map
      const teamMap = {};
      if (Array.isArray(teamsData)) {
        teamsData.forEach((team) => {
          teamMap[team.team_id] = team.team_name;
        });
      }

      // Map honours data with team names
      const mappedHonours = Array.isArray(honoursData)
        ? honoursData.map((honour) => {
            const winnerName = teamMap[honour.team_id_1] || "Unknown Team";
            const runnerUpName = teamMap[honour.team_id_2] || "Unknown Team";

            return {
              hon_id: honour.id,
              year: honour.year,
              position: honour.joint_winner
                ? "Joint Winners"
                : "Winner & Runner-up",
              team_name: honour.joint_winner
                ? winnerName
                : `🏆 ${winnerName} | 🥈 ${runnerUpName}`,
              tournament_name:
                honour.team_type === 0 ? "Men's Category" : "Women's Category",
            };
          })
        : [];

      setHonours(mappedHonours);
    } catch (error) {
      console.error("Failed to fetch honours:", error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (position) => {
    switch (position?.toLowerCase()) {
      case "winner":
      case "champion":
        return <Trophy className="text-[#ffd700]" size={32} />;
      case "runner-up":
      case "second":
        return <Medal className="text-[#c0c0c0]" size={32} />;
      default:
        return <Award className="text-[#cd7f32]" size={32} />;
    }
  };

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
          <p className="text-white/70 text-lg">
            Celebrating champions and achievements across the years
          </p>
        </motion.div>

        {/* Honours Timeline */}
        <div className="space-y-8">
          {honours.map((honour, index) => (
            <motion.div
              key={honour.hon_id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1b2b4a] rounded-lg p-6 border border-white/10 hover:border-[#ffd700]/50 transition"
            >
              <div className="flex items-center gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">{getIcon(honour.position)}</div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-2xl font-bold text-[#ffd700]">
                      {honour.year || "N/A"}
                    </h3>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                      {honour.position || "Participant"}
                    </span>
                  </div>
                  <p className="text-white/80 text-lg">{honour.team_name}</p>
                  {honour.tournament_name && (
                    <p className="text-white/50 text-sm mt-1">
                      {honour.tournament_name}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {honours.length === 0 && (
          <div className="text-center text-white/50 py-12">
            No honours data available
          </div>
        )}
      </div>
    </div>
  );
}
