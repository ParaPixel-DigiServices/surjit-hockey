// src/admin/components/pools/CSVImportDialog.jsx
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/**
 * Simple CSV parser (expects header row)
 * Expects fields: pool_name,category,team_names (team_names separated by ';' or '|')
 */
function parseCSV(text) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return [];
  const headers = lines[0].split(",").map(h => h.trim().toLowerCase());
  const rows = lines.slice(1).map(line => {
    const cols = line.split(",").map(c => c.trim());
    const obj = {};
    headers.forEach((h, i) => obj[h] = cols[i] ?? "");
    return obj;
  });
  return rows;
}

export default function CSVImportDialog({ open, onClose, onImport }) {
  const [preview, setPreview] = useState([]);
  const [fileName, setFileName] = useState("");

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const text = await file.text();
    const parsed = parseCSV(text);
    // normalize parsed -> pools
    const pools = parsed.map((r, idx) => {
      const teamsRaw = (r.team_names || r.teams || "").replace(/\|/g, ";");
      const teamNames = teamsRaw.split(";").map(t => t.trim()).filter(Boolean);
      return {
        id: Date.now() + idx,
        name: r.pool_name || r.pool || `Pool ${idx + 1}`,
        category: r.category || "Men",
        teams: teamNames.map((n, i) => ({ id: `${Date.now()}-${idx}-${i}`, name: n })),
        stats: { matches: 0, wins: 0, losses: 0, draws: 0, goals_for: 0, goals_against: 0 }
      };
    });
    setPreview(pools);
  }

  function handleImport() {
    onImport(preview);
    setPreview([]);
    setFileName("");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#071226] text-white max-w-3xl">
        <DialogHeader>
          <DialogTitle>Import Pools from CSV</DialogTitle>
        </DialogHeader>

        <div className="mt-3 space-y-3">
          <input accept=".csv" type="file" onChange={handleFile} className="text-white" />

          <div className="text-sm text-white/70">Sample columns: pool_name, category, team_names</div>

          {preview.length > 0 && (
            <div className="mt-2 border border-white/8 rounded-md p-3 bg-[#0b1530] space-y-2 max-h-80 overflow-y-auto">
              {preview.map(p => (
                <div key={p.id} className="p-2 border-b border-white/6 last:border-b-0">
                  <div className="text-white font-semibold">{p.name} <span className="text-sm text-white/60">({p.category})</span></div>
                  <div className="text-sm text-white/80">{p.teams.map(t => t.name).join(", ")}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <Button onClick={handleImport} disabled={preview.length === 0} className="bg-[#ffd700] text-black">Import {preview.length} pools</Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
