import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";

export default function Settings() {
  const handleSave = () => {
    console.log("⚠️ SAVE SETTINGS: Backend endpoint required");
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Settings</h1>
          <p className="text-sm text-white/60">General configuration</p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-[#ffd700] text-black flex gap-2"
        >
          <Save size={16} /> Save Changes
        </Button>
      </div>

      <div className="bg-[#08162e] border border-white/10 rounded-lg p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Tournament Name</label>
          <Input
            defaultValue="Surjit Hockey Tournament"
            className="bg-[#0f1e3a] border-white/10 text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Current Edition</label>
          <Input
            defaultValue="41st"
            className="bg-[#0f1e3a] border-white/10 text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Contact Email</label>
          <Input
            defaultValue="info@surjithockey.in"
            className="bg-[#0f1e3a] border-white/10 text-white"
          />
        </div>

        <div className="pt-4 border-t border-white/10">
          <p className="text-xs text-white/40">
            Note: These settings are currently mock data. Backend integration
            required for persistence.
          </p>
        </div>
      </div>
    </div>
  );
}
