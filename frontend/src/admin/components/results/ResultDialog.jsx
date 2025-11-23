import React, { useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";

export default function ResultDialog({
  open,
  onClose,
  onSave,
  initial,
  fixtures = [],
}) {
  const [form, setForm] = useState({
    fixtureId: "",
    scoreA: "",
    scoreB: "",
    summary: "",
  });

  useEffect(() => {
    if (initial) {
      setForm({
        fixtureId: String(initial.fixtureId),
        scoreA: initial.scoreA,
        scoreB: initial.scoreB,
        summary: initial.summary || "",
      });
    } else {
      setForm({
        fixtureId: "",
        scoreA: "",
        scoreB: "",
        summary: "",
      });
    }
  }, [initial]);

  const save = () => {
    onSave({ id: initial?.id, ...form });
  };

  const selectedFixture = fixtures.find((f) => String(f.id) === form.fixtureId);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#071226] border-white/10 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">
            {initial ? "Edit Result" : "Add Result"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Select Fixture</label>
            <Select
              value={form.fixtureId}
              onValueChange={(v) => setForm({ ...form, fixtureId: v })}
              disabled={!!initial}
            >
              <SelectTrigger className="bg-[#0f1e3a] text-white">
                <SelectValue placeholder="Select a match..." />
              </SelectTrigger>
              <SelectContent>
                {fixtures.map((f) => (
                  <SelectItem key={f.id} value={String(f.id)}>
                    {f.date} - {f.teamA} vs {f.teamB}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedFixture && (
            <div className="text-center py-2 text-yellow-400 font-semibold">
              {selectedFixture.teamA} vs {selectedFixture.teamB}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">
                Score {selectedFixture?.teamA || "Team A"}
              </label>
              <Input
                type="number"
                placeholder="0"
                value={form.scoreA}
                onChange={(e) => setForm({ ...form, scoreA: e.target.value })}
                className="bg-[#0f1e3a] text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">
                Score {selectedFixture?.teamB || "Team B"}
              </label>
              <Input
                type="number"
                placeholder="0"
                value={form.scoreB}
                onChange={(e) => setForm({ ...form, scoreB: e.target.value })}
                className="bg-[#0f1e3a] text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Match Summary</label>
            <Textarea
              placeholder="Enter match summary..."
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className="bg-[#0f1e3a] text-white min-h-[100px]"
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-[#ffd700] text-black" onClick={save}>
            Save Result
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
