import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import config from "../config/api";
import SecureImage from "../components/ui/SecureImage";

/**
 * Players Page
 * ------------
 * Display all players with filtering by team and position
 */
export default function Players() {
  const [teams, setTeams] = useState([]);
  const [positions, setPositions] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamsAndPositions();
  }, []);

  useEffect(() => {
    if (selectedTeam) {
      fetchTeamPlayers(selectedTeam);
    }
  }, [selectedTeam]);

  const fetchTeamsAndPositions = async () => {
    try {
      const [teamsRes, positionsRes] = await Promise.all([
        fetch(`${config.apiUrl}/teams?skip=0&limit=500`),
        fetch(`${config.apiUrl}/additional/positions`),
      ]);

      const teamsData = await teamsRes.json();
      const positionsData = await positionsRes.json();

      // Map teams API fields: id→team_id
      const mappedTeams = Array.isArray(teamsData)
        ? teamsData.map((t) => ({
            team_id: t.id,
            team_name: t.team_name,
          }))
        : [];
      setTeams(mappedTeams);

      // Map API fields: id→pos_id, position→pos_name
      const mappedPositions = Array.isArray(positionsData)
        ? positionsData.map((p) => ({
            pos_id: p.id,
            pos_name: p.position,
            status: p.status,
          }))
        : [];
      setPositions(mappedPositions);

      // Select first team by default
      if (teamsData.length > 0) {
        setSelectedTeam(teamsData[0].team_id);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeamPlayers = async (teamId) => {
    try {
      const response = await fetch(`${config.apiUrl}/teams/${teamId}/players`);
      if (!response.ok) {
        console.error(`Players endpoint error: ${response.status}`);
        setPlayers([]);
        return;
      }
      const data = await response.json();
      // Map API fields: id\u2192ply_id, full_name\u2192ply_name, etc.
      const mappedPlayers = Array.isArray(data)
        ? data.map((p) => ({
            ply_id: p.id,
            ply_name: p.full_name,
            ply_photo: p.profile_image
              ? config.getUploadUrl("players", p.profile_image)
              : null,
            ply_mobile: p.mobile_no,
            position_name:
              positions.find((pos) => pos.pos_id === p.player_position)
                ?.pos_name || "N/A",
            jersey_no: p.jersey_no,
            is_captain: p.status_captain,
          }))
        : [];
      setPlayers(mappedPlayers);
    } catch (error) {
      console.error("Failed to fetch players:", error);
      setPlayers([]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b152d]">
        <div className="text-white text-xl">Loading players...</div>
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
            Tournament <span className="text-[#ffd700]">Players</span>
          </h1>
          <p className="text-white/70 text-lg">
            Browse players by team and position
          </p>
        </motion.div>

        {/* Team Selector */}
        <div className="mb-8">
          <label className="block text-sm font-semibold mb-3 text-white/80">
            Select Team
          </label>
          <select
            value={selectedTeam || ""}
            onChange={(e) => setSelectedTeam(Number(e.target.value))}
            className="w-full md:w-96 px-4 py-3 bg-[#1b2b4a] text-white rounded-lg border border-white/10 focus:border-[#ffd700] focus:outline-none"
          >
            {teams.map((team) => (
              <option key={team.team_id} value={team.team_id}>
                {team.team_name}
              </option>
            ))}
          </select>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player, index) => (
            <motion.div
              key={player.ply_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#1b2b4a] rounded-lg p-6 border border-white/10 hover:border-[#ffd700]/50 transition"
            >
              {/* Player Photo */}
              {player.ply_photo && (
                <div className="mb-4 flex justify-center">
                  <SecureImage
                    src={player.ply_photo}
                    alt={player.ply_name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-[#ffd700]"
                  />
                </div>
              )}

              {/* Player Info */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-1">
                  {player.ply_name}
                </h3>
                {player.position_name && (
                  <p className="text-[#ffd700] text-sm font-semibold mb-2">
                    {player.position_name}
                  </p>
                )}
                <div className="flex justify-center gap-4 text-sm text-white/60 mt-3">
                  {player.ply_mobile && <span>📱 {player.ply_mobile}</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {players.length === 0 && (
          <div className="text-center text-white/50 py-12">
            No players found for selected team
          </div>
        )}
      </div>
    </div>
  );
}
