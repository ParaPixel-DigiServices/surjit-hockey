import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const darkInput = "bg-[#0f1e3a] text-white border-white/20";

export function AddTeamDialog({ open, onClose, onSave }) {
  const [team, setTeam] = useState({
    name: "",
    shortName: "",
    coach: "",
    manager: "",
    category: "",
  });
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSave = () => {
    onSave({ ...team, file });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#0a152b] text-white border-white/10 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-[#ffd700] text-xl">Add Team</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Input
            className={darkInput}
            placeholder="Team Name"
            value={team.name}
            onChange={(e) => setTeam({ ...team, name: e.target.value })}
          />
          <Input
            className={darkInput}
            placeholder="Short Name (e.g. IOCL)"
            value={team.shortName}
            onChange={(e) => setTeam({ ...team, shortName: e.target.value })}
          />

          <Input
            className={darkInput}
            placeholder="Coach Name"
            value={team.coach}
            onChange={(e) => setTeam({ ...team, coach: e.target.value })}
          />
          <Input
            className={darkInput}
            placeholder="Manager Name"
            value={team.manager}
            onChange={(e) => setTeam({ ...team, manager: e.target.value })}
          />

          <Select onValueChange={(v) => setTeam({ ...team, category: v })}>
            <SelectTrigger className={darkInput}>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="bg-[#0f1e3a] text-white">
              <SelectItem value="Men">Men</SelectItem>
              <SelectItem value="Women">Women</SelectItem>
            </SelectContent>
          </Select>

          <div className="space-y-2">
            <label className="text-sm text-white/60">Team Logo</label>
            <Input
              type="file"
              className={darkInput}
              onChange={handleFile}
              accept="image/*"
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            className="border-white/20 text-white"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button className="bg-[#ffd700] text-[#071226]" onClick={handleSave}>
            Save Team
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function EditTeamDialog({ open, onClose, onSave, initial }) {
  const [team, setTeam] = useState(initial || {});
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (initial) {
      setTeam({
        ...initial,
        shortName: initial.shortName || "", // Ensure shortName exists
        manager: initial.manager || "",
      });
    }
  }, [initial]);

  if (!team) return null;

  const handleFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSave = () => {
    onSave({ ...team, file });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#0a152b] text-white border-white/10 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-[#ffd700] text-xl">
            Edit Team
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Input
            className={darkInput}
            placeholder="Team Name"
            value={team.name || ""}
            onChange={(e) => setTeam({ ...team, name: e.target.value })}
          />
          <Input
            className={darkInput}
            placeholder="Short Name"
            value={team.shortName || ""}
            onChange={(e) => setTeam({ ...team, shortName: e.target.value })}
          />

          <Input
            className={darkInput}
            placeholder="Coach Name"
            value={team.coach || ""}
            onChange={(e) => setTeam({ ...team, coach: e.target.value })}
          />
          <Input
            className={darkInput}
            placeholder="Manager Name"
            value={team.manager || ""}
            onChange={(e) => setTeam({ ...team, manager: e.target.value })}
          />

          <Select
            value={team.category}
            onValueChange={(v) => setTeam({ ...team, category: v })}
          >
            <SelectTrigger className={darkInput}>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="bg-[#0f1e3a] text-white">
              <SelectItem value="Men">Men</SelectItem>
              <SelectItem value="Women">Women</SelectItem>
            </SelectContent>
          </Select>

          <div className="space-y-2">
            <label className="text-sm text-white/60">
              Team Logo (Leave empty to keep current)
            </label>
            <Input
              type="file"
              className={darkInput}
              onChange={handleFile}
              accept="image/*"
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            className="border-white/20 text-white"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button className="bg-[#ffd700] text-[#071226]" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
