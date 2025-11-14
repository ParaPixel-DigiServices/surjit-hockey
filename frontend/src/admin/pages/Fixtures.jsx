// src/admin/pages/Fixtures.jsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2 } from "lucide-react";
import FixtureDialog from "@/admin/components/fixtures/FixtureDialog";

export default function Fixtures() {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [fixtures, setFixtures] = useState([
    {
      id: 1,
      date: "2024-10-20",
      time: "16:30",
      pool: "A",
      teamA: "RCF Kapurthala",
      teamB: "Indian Navy",
      venue: "Olympian Surjit Stadium",
      status: "upcoming",
    },
    {
      id: 2,
      date: "2024-10-21",
      time: "18:00",
      pool: "B",
      teamA: "Punjab Police",
      teamB: "BSF Jalandhar",
      venue: "Turf Ground",
      status: "completed",
    },
  ]);

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
    if (editData) {
      setFixtures(fixtures.map((f) => (f.id === data.id ? data : f)));
    } else {
      setFixtures([...fixtures, { id: Date.now(), ...data }]);
    }
    setDialogOpen(false);
  };

  const deleteFixture = (id) => {
    setFixtures(fixtures.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold">Fixtures</h1>
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
        {filtered.map((fx) => (
          <div
            key={fx.id}
            className="bg-[#08162e] border border-white/10 rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <div className="text-sm text-white/50">{fx.date} • {fx.time}</div>
              <div className="text-lg font-bold">
                {fx.teamA} <span className="text-white/50">vs</span> {fx.teamB}
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
        ))}
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
