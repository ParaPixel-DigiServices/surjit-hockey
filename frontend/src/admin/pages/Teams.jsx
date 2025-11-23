import React, { useState, useEffect } from "react";
import TeamCard from "@/admin/components/teams/TeamCard";
import {
  AddTeamDialog,
  EditTeamDialog,
} from "@/admin/components/teams/TeamDialogs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { api } from "../../services/api";
import config from "../../config/api";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // Fetch teams from API
  const fetchTeams = async () => {
    try {
      setLoading(true);
      const data = await api.getTeams(0, 1000);
      // Map API data to component format
      const formattedTeams = data.map((t) => ({
        id: t.id,
        name: t.team_name,
        shortName: t.team_name_short,
        coach: t.team_coach || "N/A",
        manager: t.team_manager || "N/A",
        category:
          t.team_type === 1 ? "Men" : t.team_type === 2 ? "Women" : "Other",
        logo: t.team_logo ? config.getUploadUrl("teams", t.team_logo) : null,
      }));
      setTeams(formattedTeams);
    } catch (error) {
      console.error("Failed to fetch teams:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const filtered = teams.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async (team) => {
    try {
      const formData = new FormData();
      formData.append("team_name", team.name);
      formData.append(
        "team_name_short",
        team.shortName || team.name.substring(0, 3).toUpperCase()
      );
      formData.append("team_type", team.category === "Men" ? 1 : 2);
      formData.append("team_coach", team.coach || "");
      formData.append("team_manager", team.manager || "");
      if (team.file) {
        formData.append("team_logo", team.file);
      }

      await api.createTeam(formData);
      setAddOpen(false);
      fetchTeams();
    } catch (error) {
      console.error("Failed to create team:", error);
      alert("Failed to create team");
    }
  };

  const handleEdit = async (team) => {
    try {
      const formData = new FormData();
      formData.append("team_name", team.name);
      formData.append(
        "team_name_short",
        team.shortName || team.name.substring(0, 3).toUpperCase()
      );
      formData.append("team_type", team.category === "Men" ? 1 : 2);
      formData.append("team_coach", team.coach || "");
      formData.append("team_manager", team.manager || "");
      if (team.file) {
        formData.append("team_logo", team.file);
      }

      await api.updateTeam(team.id, formData);
      setEditOpen(false);
      fetchTeams();
    } catch (error) {
      console.error("Failed to update team:", error);
      alert("Failed to update team");
    }
  };

  const openEdit = (team) => {
    setEditData(team);
    setEditOpen(true);
  };

  const deleteTeam = async (team) => {
    if (window.confirm(`Are you sure you want to delete ${team.name}?`)) {
      try {
        await api.deleteTeam(team.id);
        fetchTeams();
      } catch (error) {
        console.error("Failed to delete team:", error);
        alert("Failed to delete team");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading teams...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Teams</h1>
          <p className="text-sm text-white/60 mt-1">
            {teams.length} teams registered
          </p>
        </div>
        <Button
          onClick={() => setAddOpen(true)}
          className="bg-[#ffd700] text-black flex gap-2"
        >
          <Plus size={16} /> Add Team
        </Button>
      </div>

      <Input
        placeholder="Search teams..."
        className="bg-[#0f1e3a] text-white border-white/20"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-12 text-white/50">
            No teams found
          </div>
        ) : (
          filtered.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              onEdit={openEdit}
              onDelete={deleteTeam}
            />
          ))
        )}
      </div>

      <AddTeamDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={handleAdd}
      />
      <EditTeamDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleEdit}
        initial={editData}
      />
    </div>
  );
}
