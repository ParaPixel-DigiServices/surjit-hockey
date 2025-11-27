import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, MapPin } from "lucide-react";
import config from "../config/api";
import SecureImage from "../components/ui/SecureImage";

/**
 * Teams Page
 * ----------
 * Display all participating teams
 */
export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/teams?skip=0&limit=500`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Map API fields: id→team_id, add full URLs for logos
      const mappedTeams = Array.isArray(data)
        ? data.map((t) => ({
            team_id: t.id,
            team_name: t.team_name,
            team_name_short: t.team_name_short,
            team_logo: t.team_logo
              ? config.getUploadUrl("teams", t.team_logo)
              : null,
            team_coach: t.team_coach,
            team_manager: t.team_manager,
            team_type: t.team_type,
            status: t.status,
          }))
        : [];
      setTeams(mappedTeams);
    } catch (error) {
      console.error("Failed to fetch teams:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b152d]">
        <div className="text-white text-xl">Loading teams...</div>
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
            Participating <span className="text-[#ffd700]">Teams</span>
          </h1>
          <p className="text-white/70 text-lg">
            {teams.length} teams competing in the tournament
          </p>
        </motion.div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team, index) => (
            <motion.div
              key={team.team_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/team/${team.team_id}`}
                className="block bg-[#1b2b4a] rounded-lg p-6 border border-white/10 hover:border-[#ffd700]/50 transition group"
              >
                {/* Team Logo */}
                {team.team_logo && (
                  <div className="mb-4 flex justify-center">
                    <SecureImage
                      src={team.team_logo}
                      alt={team.team_name}
                      className="w-24 h-24 object-contain"
                    />
                  </div>
                )}

                {/* Team Name */}
                <h3 className="text-xl font-bold text-center text-white mb-3 group-hover:text-[#ffd700] transition">
                  {team.team_name}
                </h3>

                {/* Team Info */}
                <div className="space-y-2 text-sm text-white/70">
                  {team.team_location && (
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      <span>{team.team_location}</span>
                    </div>
                  )}
                  {team.team_manager && (
                    <div className="flex items-center gap-2">
                      <Users size={14} />
                      <span>Manager: {team.team_manager}</span>
                    </div>
                  )}
                </div>

                {/* View Details Button */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <span className="text-[#ffd700] text-sm font-semibold group-hover:underline">
                    View Team Details →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {teams.length === 0 && (
          <div className="text-center text-white/50 py-12">
            No teams available
          </div>
        )}
      </div>
    </div>
  );
}
