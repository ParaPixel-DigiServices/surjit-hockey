import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Folder, ArrowLeft } from "lucide-react";
import { api } from "@/services/api";
import config from "../../config/api";
import SecureImage from "../../components/ui/SecureImage";
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
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState(null); // null = root (albums), object = inside album
  const [formData, setFormData] = useState({
    title: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      let data;
      if (currentAlbum) {
        data = await api.getGalleryImages(currentAlbum.id);
      } else {
        data = await api.getGallery(0, 100);
      }
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [currentAlbum]);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await api.deleteGallery(id);
        setItems(items.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Failed to delete item:", error);
      }
    }
  };

  const handleAdd = () => {
    setFormData({
      title: "",
    });
    setSelectedFiles([]);
    setIsDialogOpen(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      alert("Please select at least one image");
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title);

      selectedFiles.forEach((file) => {
        data.append("images", file);
      });

      data.append("parent_image", currentAlbum ? currentAlbum.id : 0);
      data.append("status", true);

      await api.createGallery(data);
      setIsDialogOpen(false);
      fetchGallery();
    } catch (error) {
      console.error("Failed to save item:", error);
    }
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {currentAlbum && (
            <Button
              variant="ghost"
              onClick={() => setCurrentAlbum(null)}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft size={20} />
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-extrabold">
              {currentAlbum ? currentAlbum.title : "Gallery Albums"}
            </h1>
            <p className="text-sm text-white/60">
              {currentAlbum
                ? "Manage images in this album"
                : "Manage gallery albums"}
            </p>
          </div>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-[#ffd700] text-black flex gap-2"
        >
          <Plus size={16} /> {currentAlbum ? "Add Image" : "Create Album"}
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffd700]"></div>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-white/60">
          <p>No {currentAlbum ? "images" : "albums"} found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => !currentAlbum && setCurrentAlbum(item)}
              className={`relative group aspect-square bg-white/5 rounded-lg overflow-hidden border border-white/10 ${
                !currentAlbum ? "cursor-pointer hover:border-[#ffd700]/50" : ""
              }`}
            >
              <SecureImage
                src={config.getUploadUrl("gallery", item.image_name)}
                alt={item.title || "Gallery Item"}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                {!currentAlbum && (
                  <div className="text-white font-bold flex flex-col items-center">
                    <Folder size={32} className="text-[#ffd700] mb-2" />
                    <span>Open Album</span>
                  </div>
                )}
                <button
                  onClick={(e) => handleDelete(item.id, e)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/40 transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              {item.title && (
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/80 text-xs text-center truncate">
                  {item.title}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#08162e] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>
              {currentAlbum ? "Add Image" : "Create Album"}
            </DialogTitle>
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
              <Label htmlFor="image">
                {currentAlbum ? "Images (Select Multiple)" : "Cover Image"}
              </Label>
              <Input
                id="image"
                type="file"
                onChange={handleFileChange}
                className="bg-white/5 border-white/10 text-white"
                accept="image/*"
                multiple={!!currentAlbum}
                required
              />
              {currentAlbum && (
                <p className="text-xs text-white/60">
                  Hold Ctrl/Cmd to select multiple images
                </p>
              )}
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
