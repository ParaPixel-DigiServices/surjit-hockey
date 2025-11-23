import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit } from "lucide-react";
import { api } from "@/services/api";
import config from "../../config/api";

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        setLoading(true);
        const data = await api.getSponsors(0, 100);
        setSponsors(data);
      } catch (error) {
        console.error("Failed to fetch sponsors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  const handleDelete = (id) => {
    console.log(
      "⚠️ DELETE SPONSOR: Backend DELETE endpoint required - /sponsors/{id}"
    );
    console.log("Sponsor ID:", id);
    // TODO: Implement backend endpoint
    setSponsors(sponsors.filter((s) => s.id !== id));
  };

  const handleAdd = () => {
    console.log("⚠️ ADD SPONSOR: Backend POST endpoint required - /sponsors");
    // TODO: Implement backend endpoint
  };

  const handleEdit = (item) => {
    console.log(
      "⚠️ EDIT SPONSOR: Backend PUT endpoint required - /sponsors/{id}"
    );
    console.log("Sponsor Item:", item);
    // TODO: Implement backend endpoint
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Sponsors</h1>
          <p className="text-sm text-white/60">Manage sponsors and partners</p>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-[#ffd700] text-black flex gap-2"
        >
          <Plus size={16} /> Add Sponsor
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffd700]"></div>
        </div>
      ) : sponsors.length === 0 ? (
        <div className="text-center py-20 text-white/60">
          <p>No sponsors found</p>
          <p className="text-xs mt-2 text-white/40">
            Note: Add/Edit/Delete requires backend endpoints
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sponsors.map((s) => (
            <div
              key={s.id}
              className="bg-[#08162e] border border-white/10 rounded-lg p-4 flex flex-col items-center gap-3 relative group"
            >
              <div className="w-full aspect-video bg-white rounded p-2 flex items-center justify-center">
                <img
                  src={
                    s.sponser_image
                      ? config.getUploadUrl("sponsors", s.sponser_image)
                      : "/placeholder.png"
                  }
                  alt={s.sponser_name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="text-center w-full">
                <h3 className="font-bold truncate">{s.sponser_name}</h3>
                <p className="text-xs text-white/50 truncate">
                  {s.sponser_website || "No website"}
                </p>
              </div>

              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition flex gap-1">
                <button
                  onClick={() => handleEdit(s)}
                  className="p-1.5 rounded bg-black/50 hover:bg-black/70 text-white transition"
                >
                  <Edit size={14} />
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="p-1.5 rounded bg-red-500/80 hover:bg-red-500 text-white transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
