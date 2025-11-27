// src/admin/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import EditResultDialog from "../components/results/EditResultDialog";
import { api } from "../../services/api";
import config from "../../config/api";
import SecureImage from "../../components/ui/SecureImage";
import {
  AddTeamDialog,
  CreateFixtureDialog,
  UploadPhotosDialog,
} from "@/admin/components/quickactions/QuickActionDialogs";

function Stat({ label, value, hint, icon, loading }) {
  return (
    <div className="bg-[#071226] border border-white/6 rounded-xl p-4 flex items-start gap-4">
      <div className="w-12 h-12 rounded-lg bg-linear-to-br from-[#ffd700] to-[#ffdd66] text-[#071226] flex items-center justify-center font-bold">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-xs text-white/60">{label}</div>
        <div className="mt-1 text-2xl font-extrabold text-white">
          {loading ? "..." : value}
        </div>
        {hint && <div className="text-xs text-white/50 mt-1">{hint}</div>}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    teams: 0,
    matches: 0,
    results: 0,
    gallery: 0,
  });
  const [upcomingMatch, setUpcomingMatch] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [recentResults, setRecentResults] = useState([]);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [sponsorsPreview, setSponsorsPreview] = useState([]);

  // ----------------------------------------
  // 🔥 EDIT POPUP STATE
  // ----------------------------------------
  const [open, setOpen] = useState(false);

  const handleSave = (updated) => {
    console.log("Updated Upcoming Match:", updated);
    // Note: Backend doesn't have UPDATE endpoints yet
  };

  const [addTeamOpen, setAddTeamOpen] = useState(false);
  const [fixtureOpen, setFixtureOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);

  // Fetch real stats from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [teamsData, fixturesData, galleryData, sponsorsData] =
          await Promise.all([
            api.getTeams(0, 1000),
            api.getTournamentFixtures(100).catch(() => []), // Use tournament ID 100 or adjust
            api.getGallery(0, 8),
            api.getSponsors(0, 5),
          ]);

        setStats({
          teams: teamsData.length,
          matches: fixturesData.length,
          results: fixturesData.filter((f) => f.match_status === true).length,
          gallery: galleryData.length, // This might be just the page length, but good enough for now
        });

        // Process Upcoming Match
        const upcoming = fixturesData
          .filter((f) => !f.match_status)
          .sort(
            (a, b) =>
              new Date(`${a.match_date} ${a.match_time}`) -
              new Date(`${b.match_date} ${b.match_time}`)
          );

        if (upcoming.length > 0) {
          const nextMatch = upcoming[0];
          // Find team names
          const teamA = teamsData.find((t) => t.id === nextMatch.team_id_1);
          const teamB = teamsData.find((t) => t.id === nextMatch.team_id_2);

          setUpcomingMatch({
            ...nextMatch,
            teamAName: teamA ? teamA.team_name : "Team A",
            teamBName: teamB ? teamB.team_name : "Team B",
            teamALogo: teamA
              ? config.getUploadUrl("teams", teamA.team_logo)
              : null,
            teamBLogo: teamB
              ? config.getUploadUrl("teams", teamB.team_logo)
              : null,
            matchDate: new Date(
              `${nextMatch.match_date} ${nextMatch.match_time}`
            ),
          });
        }

        // Process Recent Results
        const results = fixturesData
          .filter((f) => f.match_status)
          .sort(
            (a, b) =>
              new Date(`${b.match_date} ${b.match_time}`) -
              new Date(`${a.match_date} ${a.match_time}`)
          )
          .slice(0, 5);

        const formattedResults = results.map((r) => {
          const teamA = teamsData.find((t) => t.id === r.team_id_1);
          const teamB = teamsData.find((t) => t.id === r.team_id_2);
          return {
            id: r.id,
            teamA: teamA ? teamA.team_name : "Team A",
            teamB: teamB ? teamB.team_name : "Team B",
            scoreA: r.team1_score || 0,
            scoreB: r.team2_score || 0,
            pool: r.pool_name || "Pool",
          };
        });
        setRecentResults(formattedResults);

        setGalleryPreview(galleryData);
        setSponsorsPreview(sponsorsData);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Timer Logic
  useEffect(() => {
    if (!upcomingMatch) return;

    const timer = setInterval(() => {
      const now = new Date();
      const diff = upcomingMatch.matchDate - now;

      if (diff <= 0) {
        setTimeLeft("Match Started");
        clearInterval(timer);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        } else {
          setTimeLeft(
            `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
          );
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [upcomingMatch]);

  // ----------------------------------------

  const statItems = [
    {
      label: "Total Teams",
      value: stats.teams,
      hint: "Men & Women",
      icon: "T",
    },
    { label: "Matches", value: stats.matches, hint: "Scheduled", icon: "M" },
    { label: "Results", value: stats.results, hint: "Published", icon: "R" },
    { label: "Gallery", value: stats.gallery, hint: "Photos", icon: "G" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white">Dashboard</h1>
        <p className="text-sm text-white/60 mt-1">
          An event-grade control panel — built for Surjit Hockey
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((s) => (
          <Stat key={s.label} {...s} loading={loading} />
        ))}
      </div>

      {/* Upcoming Match */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-[#071226] border border-white/6 rounded-xl p-6"
        >
          {upcomingMatch ? (
            <>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-white/60">Upcoming</div>
                  <h2 className="text-2xl font-extrabold text-white mt-1">
                    {upcomingMatch.teamAName} vs {upcomingMatch.teamBName}
                  </h2>
                  <div className="text-sm text-white/60 mt-2">
                    Pool {upcomingMatch.pool_name} — {upcomingMatch.venue}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-white/60">Starts In</div>
                  <div className="font-mono text-2xl font-extrabold text-[#ffd700] mt-1">
                    {timeLeft}
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button className="bg-[#ffd700] text-[#071226] px-4 py-2 rounded-md font-semibold">
                      Publish Result
                    </button>

                    {/* 🔥 EDIT BUTTON OPENS POPUP */}
                    <button
                      onClick={() => setOpen(true)}
                      className="border border-white/8 px-4 py-2 rounded-md hover:bg-white/10 transition"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>

              {/* Teams visual */}
              <div className="mt-6 flex items-center gap-6">
                <div className="flex items-center gap-4">
                  <img
                    src={upcomingMatch.teamALogo || "/icon.png"}
                    alt={upcomingMatch.teamAName}
                    className="w-20 h-20 object-contain"
                    onError={(e) => (e.target.src = "/icon.png")}
                  />
                  <div>
                    <div className="text-lg font-bold text-white">
                      {upcomingMatch.teamAName}
                    </div>
                    <div className="text-sm text-white/60">Home</div>
                  </div>
                </div>

                <div className="text-3xl font-extrabold text-white">VS</div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">
                      {upcomingMatch.teamBName}
                    </div>
                    <div className="text-sm text-white/60">Away</div>
                  </div>
                  <img
                    src={upcomingMatch.teamBLogo || "/icon.png"}
                    alt={upcomingMatch.teamBName}
                    className="w-20 h-20 object-contain"
                    onError={(e) => (e.target.src = "/icon.png")}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-10 text-white/60">
              <p>No upcoming matches scheduled</p>
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.aside
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#071226] border border-white/6 rounded-xl p-4"
        >
          <h3 className="text-lg font-bold text-white">Quick Actions</h3>
          <div className="mt-3 grid gap-3">
            <button
              className="bg-[#ffd700] text-[#071226] px-3 py-2 rounded-md font-semibold"
              onClick={() => setAddTeamOpen(true)}
            >
              Add Team
            </button>
            <button
              className="bg-transparent border border-white/8 px-3 py-2 rounded-md"
              onClick={() => setFixtureOpen(true)}
            >
              Create Fixture
            </button>
            <button
              className="bg-transparent border border-white/8 px-3 py-2 rounded-md"
              onClick={() => setUploadOpen(true)}
            >
              Upload Photos
            </button>
          </div>

          <div className="mt-6">
            <h4 className="text-sm text-white/60">Recent Results</h4>
            <ul className="mt-3 space-y-3">
              {recentResults.length > 0 ? (
                recentResults.map((r) => (
                  <li
                    key={r.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="text-white">
                      {r.teamA} {r.scoreA} - {r.scoreB} {r.teamB}
                    </div>
                    <div className="text-white/60">{r.pool}</div>
                  </li>
                ))
              ) : (
                <li className="text-sm text-white/40">No recent results</li>
              )}
            </ul>
          </div>
        </motion.aside>
      </div>

      {/* Gallery & Sponsors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#071226] border border-white/6 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Gallery Preview</h3>
            <button
              className="text-sm text-white/60"
              onClick={() => navigate("/gallery")}
            >
              Open Gallery →
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {galleryPreview.length > 0 ? (
              galleryPreview.map((img, i) => (
                <div
                  key={img.id || i}
                  className="rounded-sm overflow-hidden h-28 bg-white/5"
                >
                  <img
                    src={config.getUploadUrl("gallery", img.image_name)}
                    alt={img.title || "Gallery"}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            ) : (
              <div className="col-span-4 text-center py-8 text-white/40">
                No images found
              </div>
            )}
          </div>
        </div>

        <div className="bg-[#071226] border border-white/6 rounded-xl p-4">
          <h3 className="text-lg font-bold text-white">Sponsors Preview</h3>
          <div className="mt-4 space-y-3">
            {sponsorsPreview.length > 0 ? (
              sponsorsPreview.map((s) => (
                <div key={s.id} className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center overflow-hidden">
                    <SecureImage
                      src={config.getUploadUrl("sponsors", s.sponser_image)}
                      alt={s.sponser_name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-sm text-white">{s.sponser_name}</div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-white/40">
                No sponsors found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🔥 EDIT RESULT POPUP */}
      <EditResultDialog
        open={open}
        onClose={() => setOpen(false)}
        result={upcomingMatch || {}}
        onSave={handleSave}
      />

      <AddTeamDialog
        open={addTeamOpen}
        onClose={() => setAddTeamOpen(false)}
        onSave={(d) => console.log(d)}
      />
      <CreateFixtureDialog
        open={fixtureOpen}
        onClose={() => setFixtureOpen(false)}
        onSave={(d) => console.log(d)}
      />
      <UploadPhotosDialog
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUpload={(files) => console.log(files)}
      />
    </div>
  );
}
