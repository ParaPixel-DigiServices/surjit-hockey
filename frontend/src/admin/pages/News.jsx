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

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentNews, setCurrentNews] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: true,
  });
  const [selectedFile, setSelectedFile] = useState(null);

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

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this news article?")) {
      try {
        await api.deleteNews(id);
        setNews(news.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Failed to delete news:", error);
      }
    }
  };

  const handleAdd = () => {
    setCurrentNews(null);
    setFormData({
      title: "",
      description: "",
      status: true,
    });
    setSelectedFile(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (item) => {
    setCurrentNews(item);
    setFormData({
      title: item.title,
      description: item.description || "",
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
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("status", formData.status);

      if (selectedFile) {
        data.append("image", selectedFile);
      }

      if (currentNews) {
        await api.updateNews(currentNews.id, data);
      } else {
        await api.createNews(data);
      }

      setIsDialogOpen(false);
      fetchNews();
    } catch (error) {
      console.error("Failed to save news:", error);
    }
  };

  return (
    <div className="space-y-6 text-white w-full max-w-full overflow-x-hidden">
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
                      : "/icon.png"
                  }
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.src = "/icon.png")}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg truncate">{item.title}</h3>
                <p className="text-sm text-white/60 line-clamp-2">
                  {item.description}
                </p>
                <div className="text-xs text-white/40 mt-2">
                  {new Date(item.date_created).toLocaleDateString()}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(item)}
                  className="text-white/60 hover:text-white hover:bg-white/10"
                >
                  <Edit size={18} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(item.id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#08162e] border-white/10 text-white max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentNews ? "Edit News" : "Add News"}</DialogTitle>
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
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="bg-white/5 border-white/10 text-white min-h-[300px]"
                rows={15}
              />
            </div>{" "}
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                type="file"
                onChange={handleFileChange}
                className="bg-white/5 border-white/10 text-white"
                accept="image/*"
              />
              {currentNews && currentNews.news_image && !selectedFile && (
                <p className="text-xs text-white/40">
                  Current image: {currentNews.news_image}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="status"
                checked={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.checked })
                }
                className="rounded border-white/10 bg-white/5"
              />
              <Label htmlFor="status">Active</Label>
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
                {currentNews ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
