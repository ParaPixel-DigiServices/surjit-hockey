import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit } from "lucide-react";
import { api } from "@/services/api";
import config from "../../config/api";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await api.getNews(0, 100);
        setNews(data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleDelete = (id) => {
    console.log(
      "⚠️ DELETE NEWS: Backend DELETE endpoint required - /news/{id}"
    );
    console.log("News ID:", id);
    // TODO: Implement backend endpoint
    setNews(news.filter((item) => item.id !== id));
  };

  const handleAdd = () => {
    console.log("⚠️ ADD NEWS: Backend POST endpoint required - /news");
    // TODO: Implement backend endpoint
  };

  const handleEdit = (item) => {
    console.log("⚠️ EDIT NEWS: Backend PUT endpoint required - /news/{id}");
    console.log("News Item:", item);
    // TODO: Implement backend endpoint
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">News</h1>
          <p className="text-sm text-white/60">Manage news articles</p>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-[#ffd700] text-black flex gap-2"
        >
          <Plus size={16} /> Add News
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffd700]"></div>
        </div>
      ) : news.length === 0 ? (
        <div className="text-center py-20 text-white/60">
          <p>No news found</p>
          <p className="text-xs mt-2 text-white/40">
            Note: Add/Edit/Delete requires backend endpoints
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-[#08162e] border border-white/10 rounded-lg p-4 flex gap-4 items-start"
            >
              <div className="w-24 h-24 shrink-0 bg-white/5 rounded overflow-hidden">
                <img
                  src={
                    item.news_image
                      ? config.getUploadUrl("news", item.news_image)
                      : config.getUploadUrl("news", "1.jpg")
                  }
                  alt={item.news_heading}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.src = "/icon.png")}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg truncate">
                  {item.news_heading}
                </h3>
                <p className="text-sm text-white/60 line-clamp-2">
                  {item.news_description}
                </p>
                <div className="text-xs text-white/40 mt-2">
                  {new Date(item.created_at).toLocaleDateString()}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 rounded bg-white/10 hover:bg-white/20 transition"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded bg-red-500/20 hover:bg-red-500/30 text-red-400 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
