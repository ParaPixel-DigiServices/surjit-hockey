import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit } from "lucide-react";
import { api } from "@/services/api";
import config from "../../config/api";

export default function Ads() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const data = await api.getBanners();
        setBanners(data);
      } catch (error) {
        console.error("Failed to fetch banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const handleDelete = (id) => {
    console.log(
      "⚠️ DELETE BANNER: Backend DELETE endpoint required - /banners/{id}"
    );
    console.log("Banner ID:", id);
    // TODO: Implement backend endpoint
    setBanners(banners.filter((b) => b.id !== id));
  };

  const handleAdd = () => {
    console.log("⚠️ ADD BANNER: Backend POST endpoint required - /banners");
    // TODO: Implement backend endpoint
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Ads & Banners</h1>
          <p className="text-sm text-white/60">Manage website advertisements</p>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-[#ffd700] text-black flex gap-2"
        >
          <Plus size={16} /> Add Banner
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffd700]"></div>
        </div>
      ) : banners.length === 0 ? (
        <div className="text-center py-20 text-white/60">
          <p>No active banners found</p>
          <p className="text-xs mt-2 text-white/40">
            Note: Add/Edit/Delete requires backend endpoints
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {banners.map((b) => (
            <div
              key={b.id}
              className="bg-[#08162e] border border-white/10 rounded-lg p-4 flex gap-4 items-center"
            >
              <div className="w-32 h-20 shrink-0 bg-white/5 rounded overflow-hidden">
                <img
                  src={config.getUploadUrl("banners", b.image_url)}
                  alt="Banner"
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.src = "/icon.png")}
                />
              </div>
              <div className="flex-1">
                <div className="font-bold">Banner #{b.id}</div>
                <div className="text-sm text-white/60">
                  {b.link_url || "No link"}
                </div>
              </div>
              <button
                onClick={() => handleDelete(b.id)}
                className="p-2 rounded bg-red-500/20 hover:bg-red-500/30 text-red-400 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
