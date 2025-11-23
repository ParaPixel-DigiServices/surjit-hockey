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

const darkInput =
  "bg-[#0f1e3a] text-white border-white/20 focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700] placeholder:text-white/40";

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
          <div className="space-y-1">
            <label className="text-xs text-gray-400">Team Name</label>
            <Input
              className={darkInput}
              placeholder="e.g. Indian Oil"
              value={team.name}
              onChange={(e) => setTeam({ ...team, name: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400">Short Name</label>
            <Input
              className={darkInput}
              placeholder="e.g. IOCL"
              value={team.shortName}
              onChange={(e) => setTeam({ ...team, shortName: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400">Coach Name</label>
            <Input
              className={darkInput}
              placeholder="Coach Name"
              value={team.coach}
              onChange={(e) => setTeam({ ...team, coach: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400">Manager Name</label>
            <Input
              className={darkInput}
              placeholder="Manager Name"
              value={team.manager}
              onChange={(e) => setTeam({ ...team, manager: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400">Category</label>
            <Select onValueChange={(v) => setTeam({ ...team, category: v })}>
              <SelectTrigger className={darkInput}>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="bg-[#0f1e3a] text-white border-white/20">
                <SelectItem
                  value="Men"
                  className="focus:bg-[#ffd700] focus:text-black"
                >
                  Men
                </SelectItem>
                <SelectItem
                  value="Women"
                  className="focus:bg-[#ffd700] focus:text-black"
                >
                  Women
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/60">Team Logo</label>
            <Input
              type="file"
              className={`${darkInput} file:text-white file:bg-[#ffffff1a] file:border-0 file:mr-4 file:py-1 file:px-2 file:rounded-md hover:file:bg-[#ffffff30]`}
              onChange={handleFile}
              accept="image/*"
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#ffd700] text-[#071226] hover:bg-[#e6c200]"
            onClick={handleSave}
          >
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
          <div className="space-y-1">
            <label className="text-xs text-gray-400">Team Name</label>
            <Input
              className={darkInput}
              placeholder="Team Name"
              value={team.name || ""}
              onChange={(e) => setTeam({ ...team, name: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400">Short Name</label>
            <Input
              className={darkInput}
              placeholder="Short Name"
              value={team.shortName || ""}
              onChange={(e) => setTeam({ ...team, shortName: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400">Coach Name</label>
            <Input
              className={darkInput}
              placeholder="Coach Name"
              value={team.coach || ""}
              onChange={(e) => setTeam({ ...team, coach: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400">Manager Name</label>
            <Input
              className={darkInput}
              placeholder="Manager Name"
              value={team.manager || ""}
              onChange={(e) => setTeam({ ...team, manager: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400">Category</label>
            <Select
              value={team.category}
              onValueChange={(v) => setTeam({ ...team, category: v })}
            >
              <SelectTrigger className={darkInput}>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="bg-[#0f1e3a] text-white border-white/20">
                <SelectItem
                  value="Men"
                  className="focus:bg-[#ffd700] focus:text-black"
                >
                  Men
                </SelectItem>
                <SelectItem
                  value="Women"
                  className="focus:bg-[#ffd700] focus:text-black"
                >
                  Women
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/60">
              Team Logo (Leave empty to keep current)
            </label>
            <Input
              type="file"
              className={`${darkInput} file:text-white file:bg-[#ffffff1a] file:border-0 file:mr-4 file:py-1 file:px-2 file:rounded-md hover:file:bg-[#ffffff30]`}
              onChange={handleFile}
              accept="image/*"
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#ffd700] text-[#071226] hover:bg-[#e6c200]"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
