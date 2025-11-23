// src/admin/pages/Fixtures.jsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2 } from "lucide-react";
import FixtureDialog from "@/admin/components/fixtures/FixtureDialog";
import { api } from "../../services/api";

export default function Fixtures() {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState({});

  // Fetch fixtures and teams from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch teams for name lookup
        const teamsData = await api.getTeams(0, 1000);
        const teamMap = {};
        teamsData.forEach((t) => {
          teamMap[t.id] = t.team_name;
        });
        setTeams(teamMap);

        // Fetch fixtures (using tournament ID 100 or adjust)
        const fixturesData = await api.getTournamentFixtures(100);
        // Map API data to component format
        const formattedFixtures = fixturesData.map((f) => ({
          id: f.id,
          date: f.match_date
            ? new Date(f.match_date).toISOString().split("T")[0]
            : "",
          time: f.match_time || "TBD",
          pool: f.pool_id ? `Pool ${f.pool_id}` : "N/A",
          teamA: teamMap[f.team_id_1] || `Team ${f.team_id_1}`,
          teamB: teamMap[f.team_id_2] || `Team ${f.team_id_2}`,
          venue: f.venue || "TBD",
          status: f.match_status ? "completed" : "upcoming",
        }));
        setFixtures(formattedFixtures);
      } catch (error) {
        console.error("Failed to fetch fixtures:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = fixtures.filter((f) =>
    `${f.teamA} ${f.teamB} ${f.pool} ${f.venue}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditData(null);
    setDialogOpen(true);
  };

  const openEdit = (fx) => {
    setEditData(fx);
    setDialogOpen(true);
  };

  const handleSave = (data) => {
    // Note: Backend doesn't have POST/PUT endpoints yet
    console.log("Save fixture (backend endpoint needed):", data);
    if (editData) {
      setFixtures(fixtures.map((f) => (f.id === data.id ? data : f)));
    } else {
      setFixtures([...fixtures, { id: Date.now(), ...data }]);
    }
    setDialogOpen(false);
  };

  const deleteFixture = (id) => {
    // Note: Backend doesn't have DELETE endpoint yet
    console.log("Delete fixture (backend endpoint needed):", id);
    setFixtures(fixtures.filter((f) => f.id !== id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <div className="text-xl">Loading fixtures...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Fixtures</h1>
          <p className="text-sm text-white/60 mt-1">
            {fixtures.length} matches scheduled • Note: Add/Edit/Delete requires
            backend endpoints
          </p>
        </div>
        <Button
          className="bg-[#ffd700] text-black flex gap-2"
          onClick={openAdd}
        >
          <Plus size={16} /> Add Fixture
        </Button>
      </div>

      <Input
        placeholder="Search fixtures..."
        className="bg-[#0f1e3a] text-white border-white/20"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="mt-4 space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-white/50">
            No fixtures found
          </div>
        ) : (
          filtered.map((fx) => (
            <div
              key={fx.id}
              className="bg-[#08162e] border border-white/10 rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <div className="text-sm text-white/50">
                  {fx.date} • {fx.time}
                </div>
                <div className="text-lg font-bold">
                  {fx.teamA} <span className="text-white/50">vs</span>{" "}
                  {fx.teamB}
                </div>
                <div className="text-sm text-white/50">
                  Pool {fx.pool} — {fx.venue}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => openEdit(fx)}
                  className="p-2 rounded bg-white/10 hover:bg-white/20 transition"
                >
                  <Edit size={16} />
                </button>

                <button
                  onClick={() => deleteFixture(fx.id)}
                  className="p-2 rounded bg-red-500/20 hover:bg-red-500/30 text-red-400 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <FixtureDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        initial={editData}
      />
    </div>
  );
}
