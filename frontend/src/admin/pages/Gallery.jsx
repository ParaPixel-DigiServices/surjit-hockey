import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
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

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const data = await api.getGallery(0, 100);
      setImages(data);
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await api.deleteGallery(id);
        setImages(images.filter((img) => img.id !== id));
      } catch (error) {
        console.error("Failed to delete image:", error);
      }
    }
  };

  const handleAdd = () => {
    setFormData({
      title: "",
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
    if (!selectedFile) {
      alert("Please select an image");
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("image", selectedFile);
      data.append("parent_image", 0);
      data.append("status", true);

      await api.createGallery(data);
      setIsDialogOpen(false);
      fetchGallery();
    } catch (error) {
      console.error("Failed to save image:", error);
    }
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Gallery</h1>
          <p className="text-sm text-white/60">Manage gallery images</p>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-[#ffd700] text-black flex gap-2"
        >
          <Plus size={16} /> Add Image
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffd700]"></div>
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-20 text-white/60">
          <p>No images found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative group aspect-square bg-white/5 rounded-lg overflow-hidden border border-white/10"
            >
              <img
                src={config.getUploadUrl("gallery", img.image_name)}
                alt={img.title || "Gallery Image"}
                className="w-full h-full object-cover"
                onError={(e) => (e.target.src = "/icon.png")}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                <button
                  onClick={() => handleDelete(img.id)}
                  className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/40 transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              {img.title && (
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/80 text-xs text-center truncate">
                  {img.title}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#08162e] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Add Image</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="bg-white/5 border-white/10 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                type="file"
                onChange={handleFileChange}
                className="bg-white/5 border-white/10 text-white"
                accept="image/*"
                required
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsDialogOpen(false)}
                className="hover:bg-white/10 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#ffd700] text-black hover:bg-[#ffd700]/90"
              >
                Upload
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
