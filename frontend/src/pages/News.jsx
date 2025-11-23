import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Newspaper, ArrowRight } from "lucide-react";
import { api } from "../services/api";
import config from "../config/api";

/**
 * NEWS PAGE — Surjit Hockey Society
 * --------------------------------------------
 * ✅ White theme with black-gold typography
 * ✅ Magazine-style alternating articles
 * ✅ Smooth hover and parallax transitions
 * ✅ Elegant Navbar to return home
 * ✅ Fetches real news from API
 */

export default function News() {
  const navigate = useNavigate();
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await api.getNews(0, 20);
        const formattedNews = data.map((item) => ({
          id: item.id,
          title: item.title,
          date: new Date(item.date_created).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          image: item.news_image
            ? config.getUploadUrl("news", item.news_image)
            : config.getUploadUrl("news", "1.jpg"),
          excerpt: item.description
            ? item.description.substring(0, 200) +
              (item.description.length > 200 ? "..." : "")
            : "Click to read more...",
        }));
        setNewsItems(formattedNews);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Static items removed

  return (
    <div className="relative min-h-screen bg-white text-[#111] font-[Sora] overflow-hidden">
      {/* Hero Banner */}
      <section className="relative h-[50vh] bg-gradient-to-b from-[#f6f6f6] to-white flex flex-col justify-center items-center text-center mt-16">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[#111]"
        >
          Latest <span className="text-[#d4af37]">Updates</span>
        </motion.h2>
        <p className="text-lg text-black/60 mt-4 max-w-2xl">
          Stay tuned with every pulse of Indian hockey through the Surjit Hockey
          Society — real stories, powerful victories, and unforgettable moments.
        </p>
      </section>

      {/* News List */}
      <section className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 gap-20">
        {newsItems.map((news, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row items-center gap-10 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative w-full md:w-1/2 h-[350px] overflow-hidden rounded-2xl shadow-lg group"
            >
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-40 group-hover:opacity-60 transition" />
            </motion.div>

            {/* Text */}
            <div className="w-full md:w-1/2 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold leading-tight text-[#0a0a0a]">
                {news.title}
              </h3>
              <p className="text-[#d4af37] font-semibold text-sm">
                {news.date}
              </p>
              <p className="text-black/70 leading-relaxed text-base">
                {news.excerpt}
              </p>
              <button
                onClick={() => navigate(`/news/${news.id}`)}
                className="flex items-center gap-2 mt-3 text-[#d4af37] font-semibold hover:gap-3 transition-all"
              >
                Read Full Story <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Footer CTA */}
      <section className="relative bg-[#f9f9f9] py-20 text-center border-t border-gray-100">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-[#111]"
        >
          Be the First to Know
        </motion.h3>
        <p className="text-black/60 mt-3">
          Subscribe to our updates and never miss an exciting hockey moment.
        </p>
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
          className="mt-6 inline-flex items-center gap-3 bg-[#111] text-white px-8 py-3 rounded-full cursor-pointer hover:bg-[#d4af37] hover:text-black transition"
        >
          <Newspaper size={20} />
          <span className="font-semibold text-sm uppercase tracking-wide">
            Subscribe for News
          </span>
        </motion.div>
      </section>
    </div>
  );
}
