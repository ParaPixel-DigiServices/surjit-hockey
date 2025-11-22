import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import config from "../config/api";

/**
 * Pools Page
 * ----------
 * Display tournament pools/groups with teams
 */
export default function Pools() {
  const [pools, setPools] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [poolTeams, setPoolTeams] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchYearsAndPools();
  }, []);

  useEffect(() => {
    if (selectedYear) {
      fetchPoolTeams(selectedYear);
    }
  }, [selectedYear]);

  const fetchYearsAndPools = async () => {
    try {
      const [yearsRes, poolsRes] = await Promise.all([
        fetch(`${config.apiUrl}/additional/years`),
        fetch(`${config.apiUrl}/additional/pools`),
      ]);

      const yearsData = await yearsRes.json();
      const poolsData = await poolsRes.json();

      // Map API fields: id→year_id, year→year_name
      const mappedYears = Array.isArray(yearsData)
        ? yearsData.map((y) => ({
            year_id: y.id,
            year_name: y.year,
          }))
        : [];

      setYears(mappedYears);
      setPools(Array.isArray(poolsData) ? poolsData : []);

      // Select the first year by default
      if (mappedYears.length > 0) {
        setSelectedYear(mappedYears[0].year_id);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPoolTeams = async (yearId) => {
    try {
      const [poolTeamsRes, teamsRes] = await Promise.all([
        fetch(`${config.apiUrl}/additional/pools/${yearId}/teams`),
        fetch(`${config.apiUrl}/teams?skip=0&limit=1000`),
      ]);

      const poolTeamsData = await poolTeamsRes.json();
      const teamsData = await teamsRes.json();

      // Create team lookup map
      const teamMap = {};
      if (Array.isArray(teamsData)) {
        teamsData.forEach((team) => {
          teamMap[team.id] = team.team_name;
        });
      }

      // Create pool lookup map
      const poolMap = {};
      pools.forEach((pool) => {
        poolMap[pool.id] = pool.pool_name;
      });

      // Join data and group by pool name
      const grouped = {};
      if (Array.isArray(poolTeamsData)) {
        poolTeamsData.forEach((pt) => {
          const poolName = poolMap[pt.pool_id] || `Pool ${pt.pool_id}`;
          const teamName = teamMap[pt.team_id] || `Team ${pt.team_id}`;

          if (!grouped[poolName]) {
            grouped[poolName] = [];
          }
          grouped[poolName].push({
            team_id: pt.team_id,
            team_name: teamName,
          });
        });
      }

      setPoolTeams(grouped);
    } catch (error) {
      console.error("Failed to fetch pool teams:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b152d]">
        <div className="text-white text-xl">Loading pools...</div>
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
            Tournament <span className="text-[#ffd700]">Pools</span>
          </h1>
          <p className="text-white/70 text-lg">
            View team groupings and pool distributions
          </p>
        </motion.div>

        {/* Year Selector */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {years.map((year) => (
            <button
              key={year.year_id}
              onClick={() => setSelectedYear(year.year_id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedYear === year.year_id
                  ? "bg-[#ffd700] text-[#0b152d]"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {year.year_name}
            </button>
          ))}
        </div>

        {/* Pools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(poolTeams).map(([poolName, teams], index) => (
            <motion.div
              key={poolName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1b2b4a] rounded-lg p-6 border border-white/10"
            >
              <h3 className="text-2xl font-bold text-[#ffd700] mb-4">
                {poolName}
              </h3>
              <ul className="space-y-3">
                {teams.map((team) => (
                  <li
                    key={team.team_id}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-md hover:bg-white/10 transition"
                  >
                    <div className="w-2 h-2 bg-[#ffd700] rounded-full" />
                    <span className="text-white/90">{team.team_name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {Object.keys(poolTeams).length === 0 && (
          <div className="text-center text-white/50 py-12">
            No pool data available for selected year
          </div>
        )}
      </div>
    </div>
  );
}
