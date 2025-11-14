// src/admin/components/pools/PoolDialogs.jsx
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

/**
 * PoolDialog - Create / Edit Pool
 *
 * props:
 * - open, onClose, onSave(form)
 * - initial (pool object) optional
 * - teams: array of available teams [{id,name,logo}]
 */
export function PoolDialog({ open, onClose, onSave, initial = null, teams = [] }) {
  const [form, setForm] = useState({
    name: "",
    category: "Men",
    teamIds: [],
    description: ""
  });

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name || "",
        category: initial.category || "Men",
        teamIds: initial.teams ? initial.teams.map(t => t.id) : [],
        description: initial.description || ""
      });
    } else {
      setForm({ name: "", category: "Men", teamIds: [], description: "" });
    }
  }, [initial, open]);

  const toggleTeam = (id, checked) => {
    setForm(prev => {
      let teamIds = Array.isArray(prev.teamIds) ? [...prev.teamIds] : [];
      if (checked) {
        if (!teamIds.includes(id)) teamIds.push(id);
      } else {
        teamIds = teamIds.filter(x => x !== id);
      }
      return { ...prev, teamIds };
    });
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    onSave({
      ...form,
      teams: teams.filter(t => form.teamIds.includes(t.id))
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#071226] border border-white/10 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit Pool" : "Create Pool"}</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-3">
          <Input
            placeholder="Pool Name (e.g. Pool A)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-[#0f1e3a] text-white border-white/20"
          />

          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full py-2 rounded-md bg-[#0f1e3a] text-white border border-white/10"
          >
            <option>Men</option>
            <option>Women</option>
            <option>Junior Boys</option>
          </select>

          <Input
            placeholder="Optional description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="bg-[#0f1e3a] text-white border-white/20"
          />

          <div className="text-sm font-semibold">Select teams</div>
          <div className="max-h-40 overflow-y-auto space-y-2 p-2 border border-white/6 rounded-md">
            {teams.map(t => (
              <label key={t.id} className="flex items-center gap-3">
                <Checkbox
                  checked={form.teamIds.includes(t.id)}
                  onCheckedChange={(v) => toggleTeam(t.id, !!v)}
                />
                <div className="text-white/90">{t.name}</div>
              </label>
            ))}

            {teams.length === 0 && <div className="text-white/60 text-sm">No teams available</div>}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button onClick={handleSave} className="bg-[#ffd700] text-black flex-1">Save</Button>
          <Button onClick={onClose} className="flex-1">Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
