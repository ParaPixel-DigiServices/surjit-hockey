// src/admin/components/results/EditResultDialog.jsx
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function EditResultDialog({ open, onClose, result, onSave }) {
  const [form, setForm] = useState({
    teamA: "",
    teamB: "",
    scoreA: "",
    scoreB: "",
    matchType: "",
    description: "",
  });

  // load selected match info
  useEffect(() => {
    if (result) {
      setForm(result);
    }
  }, [result]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="
          w-[95%] max-w-lg 
          bg-[#0a152b] 
          text-white 
          border border-white/10 
          rounded-xl shadow-2xl
        "
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#ffd700]">
            Edit Match Result
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Team A */}
          <div>
            <label className="text-sm text-white/70">Team A</label>
            <Input
              className="bg-[#0f1e3a] text-white border-white/20"
              value={form.teamA}
              onChange={(e) => handleChange("teamA", e.target.value)}
            />
          </div>

          {/* Team B */}
          <div>
            <label className="text-sm text-white/70">Team B</label>
            <Input
              className="bg-[#0f1e3a] text-white border-white/20"
              value={form.teamB}
              onChange={(e) => handleChange("teamB", e.target.value)}
            />
          </div>

          {/* Scores */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-white/70">Score A</label>
              <Input
                type="number"
                className="bg-[#0f1e3a] text-white border-white/20"
                value={form.scoreA}
                onChange={(e) => handleChange("scoreA", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-white/70">Score B</label>
              <Input
                type="number"
                className="bg-[#0f1e3a] text-white border-white/20"
                value={form.scoreB}
                onChange={(e) => handleChange("scoreB", e.target.value)}
              />
            </div>
          </div>

          {/* Match Type */}
          <div>
            <label className="text-sm text-white/70">Match Type</label>

            <Select
              value={form.matchType}
              onValueChange={(v) => handleChange("matchType", v)}
            >
              <SelectTrigger
                className="bg-[#0f1e3a] text-white border-white/20"
              >
                <SelectValue placeholder="Choose type" />
              </SelectTrigger>

              <SelectContent className="bg-[#0f1e3a] text-white border-white/20">
                <SelectItem value="league">League</SelectItem>
                <SelectItem value="quarter">Quarter Final</SelectItem>
                <SelectItem value="semi">Semi Final</SelectItem>
                <SelectItem value="final">Final</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-white/70">Description</label>
            <Textarea
              className="bg-[#0f1e3a] text-white border-white/20"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-white/20 text-white hover:bg-[#1a2a45]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#ffd700] text-[#071226] font-semibold hover:bg-[#ffea77]"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
