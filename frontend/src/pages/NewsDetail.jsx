import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { api } from "../services/api";
import config from "../config/api";
import SecureImage from "../components/ui/SecureImage";

/**
 * NewsDetail Page
 * ---------------
 * Displays full news article details
 */
export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        const data = await api.getNewsById(id);
        setNews(data);
      } catch (err) {
        console.error("Failed to fetch news:", err);
        setError("Failed to load news article");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#ffd700] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Article Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "The news article you're looking for doesn't exist."}
          </p>
          <button
            onClick={() => navigate("/news")}
            className="inline-flex items-center gap-2 bg-[#ffd700] text-[#1b2b4a] font-semibold px-6 py-3 rounded-md hover:brightness-95 transition"
          >
            <ArrowLeft size={20} />
            Back to News
          </button>
        </div>
      </div>
    );
  }

  const imageUrl = news.news_image
    ? config.getUploadUrl("news", news.news_image)
    : null;

  const formattedDate = new Date(news.date_created).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="min-h-screen bg-white font-[Sora]">
      {/* Main Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-6 py-32"
      >
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#1b2b4a] mb-6 leading-tight">
          {news.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-[#ffd700]" />
            <span>{formattedDate}</span>
          </div>
          {news.created_by && (
            <div className="flex items-center gap-2">
              <User size={18} className="text-[#ffd700]" />
              <span>By {news.created_by}</span>
            </div>
          )}
        </div>

        {/* Featured Image */}
        {imageUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="mb-10 rounded-2xl overflow-hidden shadow-xl"
          >
            <SecureImage
              src={imageUrl}
              alt={news.title}
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          </motion.div>
        )}

        {/* Description/Content */}
        <div className="prose prose-lg max-w-none">
          <div
            className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: news.description }}
          />
        </div>

        {/* Additional Details if available */}
        {news.detail && (
          <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-xl font-semibold text-[#1b2b4a] mb-4">
              Additional Details
            </h3>
            <div
              className="text-gray-700 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: news.detail }}
            />
          </div>
        )}

        {/* Back Button */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <button
            onClick={() => navigate("/news")}
            className="inline-flex items-center gap-2 bg-[#ffd700] text-[#1b2b4a] font-semibold px-6 py-3 rounded-md hover:brightness-95 transition"
          >
            <ArrowLeft size={20} />
            Back to All News
          </button>
        </div>
      </motion.article>
    </div>
  );
}
