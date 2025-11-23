// src/admin/components/pools/StatsDialog.jsx
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * StatsDialog
 * props: open,onClose,pool,onSave(stats)
 */
export default function StatsDialog({ open, onClose, pool, onSave }) {
  const [stats, setStats] = useState({
    matches: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    goals_for: 0,
    goals_against: 0,
  });

  useEffect(() => {
    if (pool?.stats) setStats({ ...pool.stats });
    else
      setStats({
        matches: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        goals_for: 0,
        goals_against: 0,
      });
  }, [pool, open]);

  const update = (k, v) =>
    setStats((prev) => ({ ...prev, [k]: Number(v) || 0 }));

  const save = () => {
    onSave(stats);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#071226] text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Pool Stats — {pool?.name}</DialogTitle>
        </DialogHeader>

        <div className="mt-3 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Matches Played</label>
              <Input
                type="number"
                value={stats.matches}
                onChange={(e) => update("matches", e.target.value)}
                className="bg-[#0f1e3a] text-white border-white/20 focus:border-[#ffd700]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Wins</label>
              <Input
                type="number"
                value={stats.wins}
                onChange={(e) => update("wins", e.target.value)}
                className="bg-[#0f1e3a] text-white border-white/20 focus:border-[#ffd700]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Losses</label>
              <Input
                type="number"
                value={stats.losses}
                onChange={(e) => update("losses", e.target.value)}
                className="bg-[#0f1e3a] text-white border-white/20 focus:border-[#ffd700]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Draws</label>
              <Input
                type="number"
                value={stats.draws}
                onChange={(e) => update("draws", e.target.value)}
                className="bg-[#0f1e3a] text-white border-white/20 focus:border-[#ffd700]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Goals For</label>
              <Input
                type="number"
                value={stats.goals_for}
                onChange={(e) => update("goals_for", e.target.value)}
                className="bg-[#0f1e3a] text-white border-white/20 focus:border-[#ffd700]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Goals Against</label>
              <Input
                type="number"
                value={stats.goals_against}
                onChange={(e) => update("goals_against", e.target.value)}
                className="bg-[#0f1e3a] text-white border-white/20 focus:border-[#ffd700]"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button onClick={save} className="bg-[#ffd700] text-black">
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
