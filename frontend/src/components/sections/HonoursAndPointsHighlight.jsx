import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../../services/api";
import config from "../../config/api";
import SecureImage from "../ui/SecureImage";

export default function HonoursAndPointsHighlight() {
  const [recentHonours, setRecentHonours] = useState([]);
  const [poolsSnapshot, setPoolsSnapshot] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [honoursData, teamsData, yearsData] = await Promise.all([
          api.getHonours(),
          api.getTeams(0, 1000),
          api.getYears(),
        ]);

        // Map team id -> name and logo
        const teamMap = {};
        teamsData.forEach((team) => {
          teamMap[team.id] = {
            name: team.team_name,
            logo: team.team_logo
              ? config.getUploadUrl("teams", team.team_logo)
              : null,
          };
        });

        // Take a few most recent honours
        const formattedHonours = honoursData
          .map((h) => ({
            year: h.year,
            winner: h.team_id_1 ? teamMap[h.team_id_1]?.name || "Unknown" : "-",
            winnerLogo: h.team_id_1 ? teamMap[h.team_id_1]?.logo : null,
            runner: h.team_id_2 ? teamMap[h.team_id_2]?.name || "Unknown" : "-",
            runnerLogo: h.team_id_2 ? teamMap[h.team_id_2]?.logo : null,
          }))
          .sort((a, b) => b.year - a.year)
          .slice(0, 3);

        setRecentHonours(formattedHonours);

        // Determine latest year id for standings/pools
        const sortedYears = Array.isArray(yearsData)
          ? [...yearsData].sort((a, b) => b.year - a.year)
          : [];
        const latestYear = sortedYears[0];

        if (latestYear) {
          // Load pools for that year and build a small snapshot for each
          const pools = await api.getPools();
          const yearPools = Array.isArray(pools)
            ? pools.filter((p) => p.year_id === latestYear.id)
            : [];

          const poolsToShow = yearPools.length > 0 ? yearPools : pools;

          const poolsWithStandings = [];
          for (const pool of poolsToShow) {
            const standings = await api.getStandings(
              latestYear.id,
              pool.id,
              pool.pool_category_type || null
            );

            const poolTeams = Array.isArray(standings)
              ? standings.map((row) => ({
                  name:
                    teamMap[row.team_id]?.name || row.team_name || "Unknown",
                  logo: teamMap[row.team_id]?.logo || null,
                  stats: {
                    P: row.played ?? row.P ?? 0,
                    W: row.won ?? row.W ?? 0,
                    D: row.drawn ?? row.D ?? 0,
                    L: row.lost ?? row.L ?? 0,
                    F: row.goals_for ?? row.F ?? 0,
                    A: row.goals_against ?? row.A ?? 0,
                    diff:
                      row.goal_difference ??
                      row.diff ??
                      (row.goals_for ?? 0) - (row.goals_against ?? 0),
                    PTS: row.points ?? row.PTS ?? 0,
                  },
                }))
              : [];

            poolsWithStandings.push({
              id: pool.id,
              name: pool.pool_name || pool.name || "Pool",
              teams: poolTeams,
            });
          }

          setPoolsSnapshot(poolsWithStandings);
        }
      } catch (err) {
        console.error("Failed to load honours/points highlight:", err);
        setError("Unable to load latest honours and standings right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="relative bg-[#020617] text-white py-16 md:py-20 font-[Sora] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.12),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold uppercase tracking-wide"
          >
            Roll of Honour & Points
          </motion.h2>
          <div className="mt-3 h-[3px] w-28 bg-[#ffd700] rounded-full mx-auto" />
          <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-white/70">
            A quick snapshot of past champions and how teams are performing in
            the current edition.
          </p>
        </div>

        {/* Roll of Honour preview */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-[#0b1120]/80 border border-white/10 shadow-xl p-6 md:p-7"
          >
            <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center justify-between">
              <span>Roll of Honour</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                Selected Years
              </span>
            </h3>

            <div className="divide-y divide-white/10">
              {recentHonours.length > 0 ? (
                recentHonours.map((h) => (
                  <div
                    key={h.year}
                    className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                  >
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 mt-0.5">
                        {h.winnerLogo && (
                          <SecureImage
                            src={h.winnerLogo}
                            alt={h.winner}
                            className="w-10 h-10 object-contain"
                          />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {h.winner}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {h.runnerLogo && (
                            <SecureImage
                              src={h.runnerLogo}
                              alt={h.runner}
                              className="w-6 h-6 object-contain"
                            />
                          )}
                          <p className="text-xs text-white/60">
                            Runner-up: {h.runner}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#ffd700]/10 border border-[#ffd700]/40 text-[#ffd700] font-semibold text-sm">
                        {h.year}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-3 text-sm text-white/60">
                  {loading
                    ? "Loading honours..."
                    : error || "No honours data available yet."}
                </div>
              )}
            </div>

            <p className="mt-4 text-[11px] text-white/50">
              View the complete history in the{" "}
              <Link
                to="/tournament#roll-of-honour"
                className="text-[#ffd700] underline underline-offset-2 hover:text-white transition-colors"
              >
                Roll of Honour
              </Link>{" "}
              section of the Tournament page.
            </p>
          </motion.div>
        </div>

        {/* Points snapshot */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-[#020617]/80 border border-white/10 shadow-xl p-6 md:p-7"
        >
          <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center justify-between">
            <span>Points Earned by Each Team</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">
              Latest Standings
            </span>
          </h3>

          {poolsSnapshot && poolsSnapshot.length > 0 ? (
            <div className="space-y-6">
              {poolsSnapshot.map((pool) => (
                <div
                  key={pool.id}
                  className="overflow-x-auto rounded-xl border border-white/10 bg-black/20"
                >
                  <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5 text-xs uppercase tracking-[0.2em] text-white/60">
                    <span>{pool.name}</span>
                  </div>
                  <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-white/5 text-white/70 text-xs uppercase">
                      <tr>
                        <th className="px-4 py-2 font-medium">Team</th>
                        <th className="px-2 py-2 font-medium text-center">P</th>
                        <th className="px-2 py-2 font-medium text-center">W</th>
                        <th className="px-2 py-2 font-medium text-center">D</th>
                        <th className="px-2 py-2 font-medium text-center">L</th>
                        <th className="px-2 py-2 font-medium text-center">F</th>
                        <th className="px-2 py-2 font-medium text-center">A</th>
                        <th className="px-2 py-2 font-medium text-center">
                          +/-
                        </th>
                        <th className="px-2 py-2 font-medium text-right">
                          PTS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pool.teams && pool.teams.length > 0 ? (
                        pool.teams.map((team, idx) => (
                          <tr
                            key={team.name + idx}
                            className="border-t border-white/5 hover:bg-white/5"
                          >
                            <td className="px-4 py-2 text-sm">
                              <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                  {team.logo && (
                                    <SecureImage
                                      src={team.logo}
                                      alt={team.name}
                                      className="w-6 h-6 object-contain"
                                    />
                                  )}
                                  <span className="text-white/90">
                                    {team.name}
                                  </span>
                                </div>
                                <span className="text-[11px] text-white/40">
                                  #{idx + 1}
                                </span>
                              </div>
                            </td>
                            <td className="px-2 py-2 text-center">
                              {team.stats?.P ?? 0}
                            </td>
                            <td className="px-2 py-2 text-center">
                              {team.stats?.W ?? 0}
                            </td>
                            <td className="px-2 py-2 text-center">
                              {team.stats?.D ?? 0}
                            </td>
                            <td className="px-2 py-2 text-center">
                              {team.stats?.L ?? 0}
                            </td>
                            <td className="px-2 py-2 text-center">
                              {team.stats?.F ?? 0}
                            </td>
                            <td className="px-2 py-2 text-center">
                              {team.stats?.A ?? 0}
                            </td>
                            <td className="px-2 py-2 text-center">
                              {team.stats?.diff ?? 0}
                            </td>
                            <td className="px-2 py-2 text-right text-[#ffd700] font-semibold">
                              {team.stats?.PTS ?? 0}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={9}
                            className="px-4 py-4 text-sm text-white/60 text-center"
                          >
                            No teams added yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 text-sm text-white/60 text-center">
              {loading
                ? "Loading standings..."
                : error || "Standings not available yet."}
            </div>
          )}

          <p className="mt-4 text-[11px] text-white/50">
            Detailed pool-wise standings are available in the{" "}
            <Link
              to="/tournament#points-earned-men"
              className="text-[#ffd700] underline underline-offset-2 hover:text-white transition-colors"
            >
              Points Earned by Each Team
            </Link>{" "}
            section of the Tournament page.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
