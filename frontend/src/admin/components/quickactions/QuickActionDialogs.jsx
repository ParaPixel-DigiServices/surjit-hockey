import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------
   DARK THEME SHARED STYLES 
------------------------------------------------------------------- */
const darkInput = "bg-[#0f1e3a] text-white border-white/20";
const darkSelect = "bg-[#0f1e3a] text-white border-white/20";

/* ------------------------------------------------------------------
   ADD TEAM POPUP
------------------------------------------------------------------- */
export function AddTeamDialog({ open, onClose, onSave }) {
  const [team, setTeam] = useState({
    name: "",
    coach: "",
    category: "",
    logo: null,
  });

  const handleFile = (e) => setTeam({ ...team, logo: e.target.files[0] });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#0a152b] text-white border-white/10 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-[#ffd700] text-xl">Add New Team</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm text-white/60">Team Name</label>
            <Input className={darkInput} onChange={(e) => setTeam({ ...team, name: e.target.value })} />
          </div>

          <div>
            <label className="text-sm text-white/60">Coach</label>
            <Input className={darkInput} onChange={(e) => setTeam({ ...team, coach: e.target.value })} />
          </div>

          <div>
            <label className="text-sm text-white/60">Category</label>
            <Select onValueChange={(v) => setTeam({ ...team, category: v })}>
              <SelectTrigger className={darkSelect}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-[#0f1e3a] text-white">
                <SelectItem value="men">Men</SelectItem>
                <SelectItem value="women">Women</SelectItem>
                <SelectItem value="junior">Junior</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-white/60">Upload Team Logo</label>
            <Input type="file" className={darkInput} onChange={handleFile} />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" className="border-white/20 text-white" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-[#ffd700] text-[#071226]" onClick={() => onSave(team)}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------
   CREATE FIXTURE POPUP
------------------------------------------------------------------- */
export function CreateFixtureDialog({ open, onClose, onSave }) {
  const [fixture, setFixture] = useState({
    teamA: "",
    teamB: "",
    date: "",
    time: "",
    venue: "",
    pool: "",
  });

  const handle = (f, v) => setFixture({ ...fixture, [f]: v });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#0a152b] text-white border-white/10 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-[#ffd700] text-xl">Create Fixture</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Input
            className={darkInput}
            placeholder="Team A"
            onChange={(e) => handle("teamA", e.target.value)}
          />

          <Input
            className={darkInput}
            placeholder="Team B"
            onChange={(e) => handle("teamB", e.target.value)}
          />

          <Input
            type="date"
            className={darkInput}
            onChange={(e) => handle("date", e.target.value)}
          />

          <Input
            type="time"
            className={darkInput}
            onChange={(e) => handle("time", e.target.value)}
          />

          <Input
            className={darkInput}
            placeholder="Venue"
            onChange={(e) => handle("venue", e.target.value)}
          />

          <Select onValueChange={(v) => handle("pool", v)}>
            <SelectTrigger className={darkSelect}>
              <SelectValue placeholder="Select Pool" />
            </SelectTrigger>
            <SelectContent className="bg-[#0f1e3a] text-white">
              <SelectItem value="A">Pool A</SelectItem>
              <SelectItem value="B">Pool B</SelectItem>
              <SelectItem value="C">Pool C</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" className="border-white/20 text-white" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-[#ffd700] text-[#071226]" onClick={() => onSave(fixture)}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------
   UPLOAD PHOTOS POPUP
------------------------------------------------------------------- */
export function UploadPhotosDialog({ open, onClose, onUpload }) {
  const [files, setFiles] = useState([]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#0a152b] text-white border-white/10 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#ffd700] text-xl">Upload Photos</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <Input
            type="file"
            multiple
            className={darkInput}
            onChange={(e) => setFiles([...e.target.files])}
          />
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" className="border-white/20 text-white" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-[#ffd700] text-[#071226]" onClick={() => onUpload(files)}>
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------
   ANNOUNCEMENT POPUP
------------------------------------------------------------------- */
export function AnnouncementDialog({ open, onClose, onSave }) {
  const [text, setText] = useState("");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#0a152b] text-white border-white/10 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#ffd700] text-xl">New Announcement</DialogTitle>
        </DialogHeader>

        <Textarea
          className={`${darkInput} h-32 mt-4`}
          placeholder="Write announcement..."
          onChange={(e) => setText(e.target.value)}
        />

        <DialogFooter className="mt-6">
          <Button variant="outline" className="border-white/20 text-white" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-[#ffd700] text-[#071226]" onClick={() => onSave(text)}>
            Publish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
