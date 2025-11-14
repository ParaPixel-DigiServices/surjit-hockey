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
    coach: "",
    category: "",
    logo: "",
  });

  const handleFile = (e) => {
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setTeam({ ...team, logo: imageUrl });
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
            onChange={(e) => setTeam({ ...team, name: e.target.value })}
          />

          <Input
            className={darkInput}
            placeholder="Coach Name"
            onChange={(e) => setTeam({ ...team, coach: e.target.value })}
          />

          <Select onValueChange={(v) => setTeam({ ...team, category: v })}>
            <SelectTrigger className={darkInput}>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="bg-[#0f1e3a] text-white">
              <SelectItem value="Men">Men</SelectItem>
              <SelectItem value="Women">Women</SelectItem>
              <SelectItem value="Junior">Junior</SelectItem>
            </SelectContent>
          </Select>

          <Input type="file" className={darkInput} onChange={handleFile} />
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" className="border-white/20 text-white" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-[#ffd700] text-[#071226]" onClick={() => onSave(team)}>
            Save Team
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function EditTeamDialog({ open, onClose, onSave, initial }) {
  const [team, setTeam] = useState(initial);

  useEffect(() => {
    setTeam(initial);
  }, [initial]);

  if (!team) return null;

  const handleFile = (e) => {
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setTeam({ ...team, logo: imageUrl });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#0a152b] text-white border-white/10 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-[#ffd700] text-xl">Edit Team</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Input
            className={darkInput}
            value={team.name}
            onChange={(e) => setTeam({ ...team, name: e.target.value })}
          />

          <Input
            className={darkInput}
            value={team.coach}
            onChange={(e) => setTeam({ ...team, coach: e.target.value })}
          />

          <Select
            defaultValue={team.category}
            onValueChange={(v) => setTeam({ ...team, category: v })}
          >
            <SelectTrigger className={darkInput}>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="bg-[#0f1e3a] text-white">
              <SelectItem value="Men">Men</SelectItem>
              <SelectItem value="Women">Women</SelectItem>
              <SelectItem value="Junior">Junior</SelectItem>
            </SelectContent>
          </Select>

          <Input type="file" className={darkInput} onChange={handleFile} />
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" className="border-white/20 text-white" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-[#ffd700] text-[#071226]" onClick={() => onSave(team)}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
