import React, { useState } from "react";
import TeamCard from "@/admin/components/teams/TeamCard";
import { AddTeamDialog, EditTeamDialog } from "@/admin/components/teams/TeamDialogs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Teams() {
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "RCF Kapurthala",
      coach: "Mr. Singh",
      category: "Men",
      logo: "/src/assets/teams/rcf.png",
    },
    {
      id: 2,
      name: "Indian Navy",
      coach: "Mr. Rao",
      category: "Men",
      logo: "/src/assets/teams/navy.png",
    },
  ]);

  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const filtered = teams.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (team) => {
    setTeams([...teams, { id: Date.now(), ...team }]);
    setAddOpen(false);
  };

  const handleEdit = (team) => {
    setTeams(teams.map((t) => (t.id === team.id ? team : t)));
    setEditOpen(false);
  };

  const openEdit = (team) => {
    setEditData(team);
    setEditOpen(true);
  };

  const deleteTeam = (team) => {
    setTeams(teams.filter((t) => t.id !== team.id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-white">Teams</h1>
        <Button onClick={() => setAddOpen(true)} className="bg-[#ffd700] text-black flex gap-2">
          <Plus size={16} /> Add Team
        </Button>
      </div>

      <Input
        placeholder="Search teams..."
        className="bg-[#0f1e3a] text-white border-white/20"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filtered.map((team) => (
          <TeamCard key={team.id} team={team} onEdit={openEdit} onDelete={deleteTeam} />
        ))}
      </div>

      <AddTeamDialog open={addOpen} onClose={() => setAddOpen(false)} onSave={handleAdd} />
      <EditTeamDialog open={editOpen} onClose={() => setEditOpen(false)} onSave={handleEdit} initial={editData} />
    </div>
  );
}
