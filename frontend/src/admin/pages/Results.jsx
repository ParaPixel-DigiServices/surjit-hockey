import React, { useState } from "react";
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

export default function Results() {
  const [results, setResults] = useState([
    {
      id: 1,
      pool: "A",
      teamA: "RCF Kapurthala",
      teamB: "Indian Oil",
      scoreA: 2,
      scoreB: 1,
      type: "League Match",
      description: "Pool A — Olympian Surjit Stadium",
      logoA: "/src/assets/teams/rcf.png",
      logoB: "/src/assets/teams/iocl.png",
    },
  ]);

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

  const handleSave = (data) => {
    if (editData) {
      setResults(results.map((r) => (r.id === data.id ? data : r)));
    } else {
      setResults([...results, { id: Date.now(), ...data }]);
    }
    setDialogOpen(false);
  };

  const deleteResult = (id) => {
    setResults(results.filter((r) => r.id !== id));
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
                  src={r.logoA}
                  alt={r.teamA}
                  className="w-12 h-12 object-contain drop-shadow-md rounded"
                />
                <div>
                  <div className="text-white font-semibold text-sm">
                    {r.teamA}
                  </div>
                  <div className="text-[10px] text-white/40">Pool {r.pool}</div>
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
                  src={r.logoB}
                  alt={r.teamB}
                  className="w-12 h-12 object-contain drop-shadow-md rounded"
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

      {/* MAIN POPUP */}
      <ResultDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        initial={editData}
      />
    </div>
  );
}
