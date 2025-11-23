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
  const [teamsList, setTeamsList] = useState([]);

  // Fetch fixtures and teams from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch teams for name lookup
        const teamsData = await api.getTeams(0, 1000);
        setTeamsList(teamsData);
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
          pool: f.pool_id ? String(f.pool_id) : "",
          teamA: teamMap[f.team_id_1] || `Team ${f.team_id_1}`,
          teamB: teamMap[f.team_id_2] || `Team ${f.team_id_2}`,
          teamA_id: f.team_id_1,
          teamB_id: f.team_id_2,
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

  const handleSave = async (data) => {
    try {
      const payload = {
        year_id: 100,
        date_match: data.date,
        match_time: data.time,
        match_name: "League Match",
        pool_category_type: 1,
        match_no: 0,
        pool_type: 1,
        pool_id: parseInt(data.pool),
        team_id_1: parseInt(data.teamA),
        team_id_2: parseInt(data.teamB),
        match_status: data.status === "completed",
        venue: data.venue,
      };

      if (editData) {
        await api.updateFixture(editData.id, payload);
      } else {
        await api.createFixture(payload);
      }
      setDialogOpen(false);
      // Refresh data
      const fixturesData = await api.getTournamentFixtures(100);
      const formattedFixtures = fixturesData.map((f) => ({
        id: f.id,
        date: f.match_date
          ? new Date(f.match_date).toISOString().split("T")[0]
          : "",
        time: f.match_time || "TBD",
        pool: f.pool_id ? String(f.pool_id) : "",
        teamA: teams[f.team_id_1] || `Team ${f.team_id_1}`,
        teamB: teams[f.team_id_2] || `Team ${f.team_id_2}`,
        teamA_id: f.team_id_1,
        teamB_id: f.team_id_2,
        venue: f.venue || "TBD",
        status: f.match_status ? "completed" : "upcoming",
      }));
      setFixtures(formattedFixtures);
    } catch (error) {
      console.error("Failed to save fixture:", error);
      alert("Failed to save fixture");
    }
  };

  const deleteFixture = async (id) => {
    if (window.confirm("Are you sure you want to delete this fixture?")) {
      try {
        await api.deleteFixture(id);
        setFixtures(fixtures.filter((f) => f.id !== id));
      } catch (error) {
        console.error("Failed to delete fixture:", error);
        alert("Failed to delete fixture");
      }
    }
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
        teams={teamsList}
      />
    </div>
  );
}
