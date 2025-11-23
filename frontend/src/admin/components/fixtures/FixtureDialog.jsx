import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function FixtureDialog({
  open,
  onClose,
  onSave,
  initial,
  teams = [],
}) {
  const [form, setForm] = useState({
    date: "",
    time: "",
    pool: "",
    teamA: "",
    teamB: "",
    venue: "",
    status: "upcoming",
  });

  useEffect(() => {
    if (initial) {
      setForm({
        ...initial,
        teamA: initial.teamA_id ? String(initial.teamA_id) : initial.teamA,
        teamB: initial.teamB_id ? String(initial.teamB_id) : initial.teamB,
      });
    } else {
      setForm({
        date: "",
        time: "",
        pool: "",
        teamA: "",
        teamB: "",
        venue: "",
        status: "upcoming",
      });
    }
  }, [initial]);

  const save = () => {
    onSave({ id: initial?.id, ...form });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#071226] text-white border-white/10 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white text-lg">
            {initial ? "Edit Fixture" : "Add Fixture"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          <Input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="bg-[#0f1e3a] text-white"
          />

          <Input
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="bg-[#0f1e3a] text-white"
          />

          <Select
            value={form.pool}
            onValueChange={(v) => setForm({ ...form, pool: v })}
          >
            <SelectTrigger className="bg-[#0f1e3a] text-white">
              <SelectValue placeholder="Pool" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Pool A</SelectItem>
              <SelectItem value="2">Pool B</SelectItem>
              <SelectItem value="3">Pool C</SelectItem>
              <SelectItem value="4">Pool D</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={form.teamA}
            onValueChange={(v) => setForm({ ...form, teamA: v })}
          >
            <SelectTrigger className="bg-[#0f1e3a] text-white">
              <SelectValue placeholder="Team A" />
            </SelectTrigger>
            <SelectContent>
              {teams.map((t) => (
                <SelectItem key={t.id} value={String(t.id)}>
                  {t.team_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={form.teamB}
            onValueChange={(v) => setForm({ ...form, teamB: v })}
          >
            <SelectTrigger className="bg-[#0f1e3a] text-white">
              <SelectValue placeholder="Team B" />
            </SelectTrigger>
            <SelectContent>
              {teams.map((t) => (
                <SelectItem key={t.id} value={String(t.id)}>
                  {t.team_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Venue"
            value={form.venue}
            onChange={(e) => setForm({ ...form, venue: e.target.value })}
            className="bg-[#0f1e3a] text-white"
          />

          <Select
            value={form.status}
            onValueChange={(v) => setForm({ ...form, status: v })}
          >
            <SelectTrigger className="bg-[#0f1e3a] text-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="live">Live</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-[#ffd700] text-black" onClick={save}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
