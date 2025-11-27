import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Users, User, Phone } from "lucide-react";
import config from "../config/api";
import SecureImage from "../components/ui/SecureImage";

/**
 * Team Detail Page
 * ----------------
 * Displays detailed information about a specific team
 */
export default function TeamDetail() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamDetails();
  }, [id]);

  const fetchTeamDetails = async () => {
    try {
      // Fetch team details first
      const teamRes = await fetch(`${config.apiUrl}/teams/${id}`);

      if (teamRes.ok) {
        const teamData = await teamRes.json();
        setTeam(teamData);
      } else {
        console.error("Team not found, status:", teamRes.status);
        setLoading(false);
        return;
      }

      // Try to fetch players, but don't fail if it errors
      try {
        const playersRes = await fetch(`${config.apiUrl}/teams/${id}/players`);
        if (playersRes.ok) {
          const playersData = await playersRes.json();

          // Deduplicate players by jersey number - keep the most recent (highest playing_year or id)
          const uniquePlayersMap = new Map();
          playersData.forEach((player) => {
            const key = player.jersey_no || `no_jersey_${player.id}`;
            const existing = uniquePlayersMap.get(key);

            // Keep the player with the highest playing_year, or highest id if playing_year is the same
            if (
              !existing ||
              player.playing_year > existing.playing_year ||
              (player.playing_year === existing.playing_year &&
                player.id > existing.id)
            ) {
              uniquePlayersMap.set(key, player);
            }
          });

          // Convert back to array and sort by jersey number
          const uniquePlayers = Array.from(uniquePlayersMap.values()).sort(
            (a, b) => (a.jersey_no || 999) - (b.jersey_no || 999)
          );

          setPlayers(uniquePlayers);
        } else {
          console.warn("Players endpoint failed, status:", playersRes.status);
          setPlayers([]);
        }
      } catch (playersError) {
        console.warn("Failed to fetch players:", playersError);
        setPlayers([]);
      }
    } catch (error) {
      console.error("Failed to fetch team details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b152d]">
        <div className="text-white text-xl">Loading team details...</div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b152d]">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Team not found</h1>
          <Link
            to="/teams"
            className="text-[#ffd700] hover:underline flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Teams
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b152d] text-white py-20 px-4 font-[Sora]">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          to="/teams"
          className="inline-flex items-center gap-2 text-[#ffd700] hover:underline mb-8"
        >
          <ArrowLeft size={20} />
          Back to Teams
        </Link>

        {/* Team Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#1b2b4a] to-[#0b152d] rounded-xl p-8 mb-8 border border-[#ffd700]/20"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Team Logo */}
            {team.team_logo && (
              <div className="w-32 h-32 flex-shrink-0">
                <SecureImage
                  src={config.getUploadUrl("teams", team.team_logo)}
                  alt={team.team_name}
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            {/* Team Info */}
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {team.team_name}
              </h1>
              <p className="text-xl text-[#ffd700] mb-4">
                {team.team_name_short}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/70">
                {team.team_coach && (
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-[#ffd700]" />
                    <span>
                      <strong>Coach:</strong> {team.team_coach}
                    </span>
                  </div>
                )}
                {team.team_manager && (
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-[#ffd700]" />
                    <span>
                      <strong>Manager:</strong> {team.team_manager}
                    </span>
                  </div>
                )}
                {team.team_coach_mobile && (
                  <div className="flex items-center gap-2">
                    <Phone size={18} className="text-[#ffd700]" />
                    <span>
                      <strong>Coach:</strong> {team.team_coach_mobile}
                    </span>
                  </div>
                )}
                {team.team_manager_mobile && (
                  <div className="flex items-center gap-2">
                    <Phone size={18} className="text-[#ffd700]" />
                    <span>
                      <strong>Manager:</strong> {team.team_manager_mobile}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Players */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-6">
            Team <span className="text-[#ffd700]">Roster</span>
          </h2>

          {players.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {players.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[#1b2b4a] rounded-lg p-6 border border-white/10 hover:border-[#ffd700]/50 transition"
                >
                  {/* Player Profile Image */}
                  {player.profile_image && (
                    <div className="mb-4 flex justify-center">
                      <SecureImage
                        src={config.getUploadUrl(
                          "players",
                          player.profile_image
                        )}
                        alt={player.full_name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-[#ffd700]/30"
                      />
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    {/* Jersey Number Circle */}
                    {player.jersey_no && (
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ffd700] to-[#ffa500] flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-2xl font-bold text-[#0b152d]">
                          {player.jersey_no}
                        </span>
                      </div>
                    )}

                    {/* Player Info */}
                    <div className="flex-grow">
                      <h3 className="font-bold text-white text-lg mb-1">
                        {player.full_name}
                      </h3>
                      {player.jersey_name &&
                        player.jersey_name !== player.full_name && (
                          <p className="text-sm text-[#ffd700] mb-2">
                            "{player.jersey_name}"
                          </p>
                        )}
                      <div className="flex flex-wrap gap-2 text-xs">
                        {player.status_captain && (
                          <span className="px-2 py-1 bg-[#ffd700] text-[#0b152d] rounded-full font-semibold">
                            Captain
                          </span>
                        )}
                        {player.player_position !== null && (
                          <span className="px-2 py-1 bg-white/10 rounded-full text-white/70">
                            {player.player_position === 0
                              ? "Goalkeeper"
                              : player.player_position === 1
                                ? "Defender"
                                : player.player_position === 2
                                  ? "Forward"
                                  : "Player"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-[#1b2b4a] rounded-lg p-8 text-center border border-white/10">
              <Users className="mx-auto mb-4 text-white/20" size={64} />
              <p className="text-white/50">No player information available</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
