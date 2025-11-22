import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import config from "../../config/api";

/**
 * TrendingNow Section — Cinematic Black Edition
 * ---------------------------------------------
 * - Full-width horizontal scroll (one article per view)
 * - Pure black background
 * - White + gold typography
 * - Image left, text right layout
 * - Smooth scroll snapping & fade/zoom animation
 * - Fully responsive & mobile swipe enabled
 * - Fetches real news from API
 */

export default function TrendingNow() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const newsData = await api.getNews(0, 4);
        const formattedArticles = newsData.map((item) => ({
          id: item.id,
          title: item.title,
          excerpt: item.description
            ? item.description.substring(0, 180) + "..."
            : "Click to read more about this exciting news story.",
          image: item.news_image
            ? config.getUploadUrl("news", item.news_image)
            : config.getUploadUrl("news", "1.jpg"),
        }));
        setArticles(formattedArticles);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return (
      <section className="relative bg-black text-white py-16 flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffd700] mx-auto mb-4"></div>
          <p className="text-gray-300">Loading latest news...</p>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return null;
  }
  return (
    <section className="relative bg-black text-white py-10 overflow-hidden">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold tracking-wider font-[Sora]"
        >
          TRENDING NOW
        </motion.h2>
        <div className="mt-3 h-[3px] w-20 bg-[#ffd700] mx-auto rounded-full" />
      </div>

      {/* Scroll Container */}
      <div className="overflow-x-auto flex snap-x snap-mandatory scrollbar-hide">
        {articles.map((article, index) => (
          <div
            key={article.id}
            className="snap-start flex-shrink-0 w-screen h-[80vh] flex flex-col md:flex-row"
          >
            {/* Image Side */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden">
              <motion.img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover brightness-[0.85] hover:scale-105 transition-transform duration-700"
                whileInView={{ opacity: [0, 1], scale: [1.05, 1] }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              />
            </div>

            {/* Text Side */}
            <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 bg-black">
              <motion.h3
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold mb-4 font-[Sora]"
              >
                {article.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-gray-300 mb-6 text-base md:text-lg leading-relaxed"
              >
                {article.excerpt}
              </motion.p>

              <Link to={`/news/${article.id}`}>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-[#ffd700] font-semibold cursor-pointer hover:underline tracking-wide inline-block"
                >
                  Read More →
                </motion.span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
