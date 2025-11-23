import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Trash2, Edit } from "lucide-react";
import ResultDialog from "@/admin/components/results/ResultDialog";
import { api } from "@/services/api";
import config from "../../config/api";

export default function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fixturesList, setFixturesList] = useState([]);

  // Fetch results from backend
  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);

        // Fetch teams for logos and names
        const teamsData = await api.getTeams(0, 1000);
        const teamMap = {};
        teamsData.forEach((t) => {
          teamMap[t.id] = {
            name: t.team_name,
            logo: config.getUploadUrl("teams", t.team_logo),
          };
        });

        // Fetch fixtures to get match details
        const fixturesData = await api.getTournamentFixtures(100);
        const fixtureMap = {};
        const fixturesListFormatted = [];

        fixturesData.forEach((f) => {
          fixtureMap[f.id] = f;
          const tA = teamMap[f.team_id_1]
            ? teamMap[f.team_id_1].name
            : `Team ${f.team_id_1}`;
          const tB = teamMap[f.team_id_2]
            ? teamMap[f.team_id_2].name
            : `Team ${f.team_id_2}`;
          fixturesListFormatted.push({
            id: f.id,
            date: f.match_date,
            teamA: tA,
            teamB: tB,
            pool: f.pool_id,
          });
        });
        setFixturesList(fixturesListFormatted);

        // Fetch results from tournament 100 (same as fixtures)
        const resultsData = await api.getTournamentResults(100);

        // Format results with fixture and team data
        const formatted = resultsData.map((r) => {
          const fixture = fixtureMap[r.fixture_id] || {};
          const teamA = teamMap[fixture.team_id_1] || {
            name: "Team A",
            logo: "",
          };
          const teamB = teamMap[fixture.team_id_2] || {
            name: "Team B",
            logo: "",
          };

          return {
            id: r.id,
            fixtureId: r.fixture_id,
            pool: fixture.pool_id ? `Pool ${fixture.pool_id}` : "N/A",
            teamA: teamA.name,
            teamB: teamB.name,
            scoreA: r.team1_score || 0,
            scoreB: r.team2_score || 0,
            type: "League Match",
            description: `${fixture.pool_id ? `Pool ${fixture.pool_id} — ` : ""}${fixture.venue || "Stadium"}`,
            logoA: teamA.logo,
            logoB: teamB.logo,
            summary: r.match_summary || "",
          };
        });

        setResults(formatted);
      } catch (error) {
        console.error("Failed to fetch results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const openAdd = () => {
    setEditData(null);
    setDialogOpen(true);
  };

  const openEdit = (r) => {
    setEditData(r);
    setDialogOpen(true);
  };

  const handleSave = async (data) => {
    try {
      const payload = {
        fixture_id: parseInt(data.fixtureId),
        team1_score: parseInt(data.scoreA),
        team2_score: parseInt(data.scoreB),
        match_summary: data.summary,
        winner_team_id: 0,
        man_of_the_match: "",
      };

      if (editData) {
        await api.updateResult(editData.id, payload);
      } else {
        await api.createResult(payload);
      }
      setDialogOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to save result:", error);
      alert("Failed to save result");
    }
  };

  const deleteResult = async (id) => {
    if (window.confirm("Are you sure you want to delete this result?")) {
      try {
        await api.deleteResult(id);
        setResults(results.filter((r) => r.id !== id));
      } catch (error) {
        console.error("Failed to delete result:", error);
        alert("Failed to delete result");
      }
    }
  };
  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold">Results Maker</h1>
        <Button onClick={openAdd} className="bg-[#ffd700] text-black">
          + Add Result
        </Button>
      </div>

      {/* Results Table */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffd700]"></div>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-20 text-white/60">
          <p>No results published yet</p>
          <p className="text-xs mt-2 text-white/40">
            Note: Add/Edit/Delete requires backend endpoints
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((r) => (
            <div
              key={r.id}
              className="
        bg-gradient-to-br from-[#0c1a34] to-[#071226]
        border border-white/10 
        rounded-xl p-5
        flex items-center justify-between gap-6
        hover:border-[#ffd700]/40 transition
      "
            >
              {/* LEFT SIDE — TEAMS + SCORE */}
              <div className="flex items-center gap-6">
                {/* Team A block */}
                <div className="flex items-center gap-3">
                  <img
                    src={r.logoA || "/icon.png"}
                    alt={r.teamA}
                    className="w-12 h-12 object-contain drop-shadow-md rounded"
                    onError={(e) => (e.target.src = "/icon.png")}
                  />
                  <div>
                    <div className="text-white font-semibold text-sm">
                      {r.teamA}
                    </div>
                    <div className="text-[10px] text-white/40">{r.pool}</div>
                  </div>
                </div>

                {/* Score */}
                <div className="text-3xl font-extrabold text-[#ffd700]">
                  {r.scoreA}
                  <span className="text-white mx-2">–</span>
                  {r.scoreB}
                </div>

                {/* Team B block */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-white font-semibold text-sm">
                      {r.teamB}
                    </div>
                    <div className="text-[10px] text-white/40">{r.type}</div>
                  </div>

                  <img
                    src={r.logoB || "/icon.png"}
                    alt={r.teamB}
                    className="w-12 h-12 object-contain drop-shadow-md rounded"
                    onError={(e) => (e.target.src = "/icon.png")}
                  />
                </div>
              </div>

              {/* RIGHT SIDE — DESCRIPTION + ACTIONS */}
              <div className="text-right w-48">
                <div className="text-xs text-white/50">{r.description}</div>

                <div className="flex justify-end gap-2 mt-3">
                  <button
                    onClick={() => openEdit(r)}
                    className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 transition text-white text-xs flex items-center gap-1"
                  >
                    <Edit size={14} /> Edit
                  </button>

                  <button
                    onClick={() => deleteResult(r.id)}
                    className="px-3 py-1.5 rounded-md bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs transition flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MAIN POPUP */}
      <ResultDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        initial={editData}
        fixtures={fixturesList}
      />
    </div>
  );
}
