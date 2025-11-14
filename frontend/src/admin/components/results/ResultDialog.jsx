import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from "@/components/ui/select";

export default function ResultDialog({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState({
    pool: "",
    teamA: "",
    teamB: "",
    scoreA: "",
    scoreB: "",
    type: "",
    description: "",
    logoA: "",
    logoB: "",
  });

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  const save = () => {
    onSave({ id: initial?.id || Date.now(), ...form });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#071226] border-white/10 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">
            {initial ? "Edit Result" : "Add Result"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          
          <Select value={form.pool} onValueChange={(v) => setForm({ ...form, pool: v })}>
            <SelectTrigger className="bg-[#0f1e3a] text-white">
              <SelectValue placeholder="Pool" />
            </SelectTrigger>
            <SelectContent>
              {["A", "B", "C", "D"].map((p) => (
                <SelectItem key={p} value={p}>Pool {p}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={form.type}
            onValueChange={(v) => setForm({ ...form, type: v })}
          >
            <SelectTrigger className="bg-[#0f1e3a] text-white">
              <SelectValue placeholder="Match Type" />
            </SelectTrigger>
            <SelectContent>
              {[
                "League Match",
                "Quarter Final",
                "Semi Final",
                "Final",
                "Penalty Shootout",
              ].map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Team A"
            value={form.teamA}
            onChange={(e) => setForm({ ...form, teamA: e.target.value })}
            className="bg-[#0f1e3a] text-white"
          />

          <Input
            placeholder="Team B"
            value={form.teamB}
            onChange={(e) => setForm({ ...form, teamB: e.target.value })}
            className="bg-[#0f1e3a] text-white"
          />

          <Input
            placeholder="Team A Logo URL"
            value={form.logoA}
            onChange={(e) => setForm({ ...form, logoA: e.target.value })}
            className="bg-[#0f1e3a] text-white"
          />

          <Input
            placeholder="Team B Logo URL"
            value={form.logoB}
            onChange={(e) => setForm({ ...form, logoB: e.target.value })}
            className="bg-[#0f1e3a] text-white"
          />

          <Input
            placeholder="Score A"
            value={form.scoreA}
            onChange={(e) => setForm({ ...form, scoreA: e.target.value })}
            className="bg-[#0f1e3a] text-white"
          />

          <Input
            placeholder="Score B"
            value={form.scoreB}
            onChange={(e) => setForm({ ...form, scoreB: e.target.value })}
            className="bg-[#0f1e3a] text-white"
          />

          <Input
            placeholder="Description (Pool A — Stadium)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="col-span-2 bg-[#0f1e3a] text-white"
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button className="bg-[#ffd700] text-black" onClick={save}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
