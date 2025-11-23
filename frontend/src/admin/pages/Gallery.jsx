import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { api } from "@/services/api";
import config from "../../config/api";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchGallery();
  }, []);

  const handleDelete = (id) => {
    console.log(
      "⚠️ DELETE IMAGE: Backend DELETE endpoint required - /content/gallery/{id}"
    );
    console.log("Image ID:", id);
    // TODO: Implement backend endpoint
    setImages(images.filter((img) => img.id !== id));
  };

  const handleAdd = () => {
    console.log(
      "⚠️ ADD IMAGE: Backend POST endpoint required - /content/gallery"
    );
    // TODO: Implement backend endpoint
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
          <p className="text-xs mt-2 text-white/40">
            Note: Add/Delete requires backend endpoints
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative group aspect-square bg-white/5 rounded-lg overflow-hidden border border-white/10"
            >
              <img
                src={config.getUploadUrl("gallery", img.image_url)}
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
    </div>
  );
}
