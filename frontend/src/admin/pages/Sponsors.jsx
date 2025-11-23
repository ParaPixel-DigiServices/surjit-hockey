import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit } from "lucide-react";
import { api } from "@/services/api";
import config from "../../config/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentSponsor, setCurrentSponsor] = useState(null);
  const [formData, setFormData] = useState({
    sponser_name: "",
    sponser_image: "",
    detail: "",
    status: true,
  });
  const [selectedFile, setSelectedFile] = useState(null);

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

  useEffect(() => {
    fetchSponsors();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this sponsor?")) {
      try {
        await api.deleteSponsor(id);
        setSponsors(sponsors.filter((s) => s.id !== id));
      } catch (error) {
        console.error("Failed to delete sponsor:", error);
      }
    }
  };

  const handleAdd = () => {
    setCurrentSponsor(null);
    setFormData({
      sponser_name: "",
      sponser_image: "",
      detail: "",
      status: true,
    });
    setSelectedFile(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (item) => {
    setCurrentSponsor(item);
    setFormData({
      sponser_name: item.sponser_name,
      sponser_image: item.sponser_image || "",
      detail: item.detail || "",
      status: item.status,
    });
    setSelectedFile(null);
    setIsDialogOpen(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("sponser_name", formData.sponser_name);
      data.append("detail", formData.detail);
      data.append("status", formData.status);

      if (selectedFile) {
        data.append("image", selectedFile);
      }

      if (currentSponsor) {
        await api.updateSponsor(currentSponsor.id, data);
      } else {
        await api.createSponsor(data);
      }
      setIsDialogOpen(false);
      fetchSponsors();
    } catch (error) {
      console.error("Failed to save sponsor:", error);
    }
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
          className="bg-[#ffd700] text-black flex gap-2 hover:bg-[#ffd700]/90"
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
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sponsors.map((s) => (
            <div
              key={s.id}
              className="bg-[#08162e] border border-white/10 rounded-lg p-4 flex flex-col items-center gap-3 relative group"
            >
              <div className="w-full aspect-video bg-white rounded p-2 flex items-center justify-center overflow-hidden">
                <img
                  src={
                    s.sponser_image
                      ? config.getUploadUrl("sponsors", s.sponser_image)
                      : "/icon.png"
                  }
                  alt={s.sponser_name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => (e.target.src = "/icon.png")}
                />
              </div>
              <div className="text-center w-full">
                <h3 className="font-bold truncate">{s.sponser_name}</h3>
                <p className="text-xs text-white/50 truncate">
                  {s.detail || "No details"}
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#08162e] text-white border-white/10">
          <DialogHeader>
            <DialogTitle>
              {currentSponsor ? "Edit Sponsor" : "Add Sponsor"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Sponsor Name</Label>
              <Input
                id="name"
                value={formData.sponser_name}
                onChange={(e) =>
                  setFormData({ ...formData, sponser_name: e.target.value })
                }
                required
                className="bg-black/20 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Sponsor Image</Label>
              <div className="flex flex-col gap-2">
                {formData.sponser_image && !selectedFile && (
                  <div className="relative w-20 h-20 bg-white rounded p-1">
                    <img
                      src={config.getUploadUrl(
                        "sponsors",
                        formData.sponser_image
                      )}
                      alt="Current"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="bg-black/20 border-white/10 text-white file:text-white file:bg-white/10 file:border-0 file:rounded-md file:px-2 file:mr-2"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="detail">Details / Website</Label>
              <Textarea
                id="detail"
                value={formData.detail}
                onChange={(e) =>
                  setFormData({ ...formData, detail: e.target.value })
                }
                className="bg-black/20 border-white/10 text-white"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsDialogOpen(false)}
                className="text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#ffd700] text-black hover:bg-[#ffd700]/90"
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
