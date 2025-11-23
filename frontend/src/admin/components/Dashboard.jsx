// src/admin/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import EditResultDialog from "../components/results/EditResultDialog";
import { api } from "../../services/api";
import {
  AddTeamDialog,
  CreateFixtureDialog,
  UploadPhotosDialog,
  AnnouncementDialog,
} from "@/admin/components/quickactions/QuickActionDialogs";

function Stat({ label, value, hint, icon, loading }) {
  return (
    <div className="bg-[#071226] border border-white/6 rounded-xl p-4 flex items-start gap-4">
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#ffd700] to-[#ffdd66] text-[#071226] flex items-center justify-center font-bold">
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

  // ----------------------------------------
  // 🔥 EDIT POPUP STATE
  // ----------------------------------------
  const [open, setOpen] = useState(false);

  const match = {
    teamA: "RCF Kapurthala",
    teamB: "Indian Navy",
    scoreA: "",
    scoreB: "",
    matchType: "league",
    description: "Pool A — Olympian Surjit Stadium",
  };

  const handleSave = (updated) => {
    console.log("Updated Upcoming Match:", updated);
    // Note: Backend doesn't have UPDATE endpoints yet
  };

  const [addTeamOpen, setAddTeamOpen] = useState(false);
  const [fixtureOpen, setFixtureOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [announceOpen, setAnnounceOpen] = useState(false);

  // Fetch real stats from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [teamsData, fixturesData, galleryData] = await Promise.all([
          api.getTeams(0, 1000),
          api.getTournamentFixtures(100).catch(() => []), // Use tournament ID 100 or adjust
          api.getGallery(0, 5000),
        ]);

        setStats({
          teams: teamsData.length,
          matches: fixturesData.length,
          results: fixturesData.filter((f) => f.match_status === true).length,
          gallery: galleryData.length,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

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
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-white/60">Upcoming</div>
              <h2 className="text-2xl font-extrabold text-white mt-1">
                {match.teamA} vs {match.teamB}
              </h2>
              <div className="text-sm text-white/60 mt-2">
                {match.description}
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-white/60">Starts In</div>
              <div className="font-mono text-2xl font-extrabold text-[#ffd700] mt-1">
                01:12:32
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
                src="/src/assets/teams/rcf.png"
                alt="rcf"
                className="w-20 h-20 object-contain"
              />
              <div>
                <div className="text-lg font-bold text-white">
                  RCF Kapurthala
                </div>
                <div className="text-sm text-white/60">Host</div>
              </div>
            </div>

            <div className="text-3xl font-extrabold text-white">VS</div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-lg font-bold text-white">Indian Navy</div>
                <div className="text-sm text-white/60">Challenger</div>
              </div>
              <img
                src="/src/assets/teams/navy.png"
                alt="navy"
                className="w-20 h-20 object-contain"
              />
            </div>
          </div>
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
            <button
              className="bg-transparent border border-white/8 px-3 py-2 rounded-md"
              onClick={() => setAnnounceOpen(true)}
            >
              New Announcement
            </button>
          </div>

          <div className="mt-6">
            <h4 className="text-sm text-white/60">Recent Results</h4>
            <ul className="mt-3 space-y-3">
              <li className="flex items-center justify-between text-sm">
                <div className="text-white">
                  RCF Kapurthala 2 - 1 Indian Oil
                </div>
                <div className="text-white/60">Pool A</div>
              </li>
              <li className="flex items-center justify-between text-sm">
                <div className="text-white">
                  Punjab Police 1 - 0 BSF Jalandhar
                </div>
                <div className="text-white/60">Pool B</div>
              </li>
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
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-sm overflow-hidden h-28 bg-white/5"
              >
                <img
                  src={`/src/assets/gallery${i + 1}_thumb.jpeg`}
                  alt={`g${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#071226] border border-white/6 rounded-xl p-4">
          <h3 className="text-lg font-bold text-white">Sponsors Preview</h3>
          <div className="mt-4 space-y-3">
            {["IndianOil", "Maruti", "PNB"].map((s) => (
              <div key={s} className="flex items-center gap-3">
                <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center text-white/80 font-semibold">
                  {s[0]}
                </div>
                <div className="text-sm text-white">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔥 EDIT RESULT POPUP */}
      <EditResultDialog
        open={open}
        onClose={() => setOpen(false)}
        result={match}
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
      <AnnouncementDialog
        open={announceOpen}
        onClose={() => setAnnounceOpen(false)}
        onSave={(t) => console.log(t)}
      />
    </div>
  );
}
