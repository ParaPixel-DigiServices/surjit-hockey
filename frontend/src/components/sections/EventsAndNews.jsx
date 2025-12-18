import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import config from "../../config/api";
import SecureImage from "../ui/SecureImage";

// Event images from original website
const eventImages = [
  "/images/event/100-950.JPG",
  "/images/event/99-997.JPG",
  "/images/event/98-256.jpg",
  "/images/event/97-154.jpg",
  "/images/event/96-46.JPG",
  "/images/event/95-948.jpeg",
  "/images/event/94-815.jpeg",
];

export default function EventsAndNews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Events slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % eventImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Fetch news
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const newsData = await api.getNews(0, 4);
        const formattedArticles = newsData.map((item) => ({
          id: item.id,
          title: item.title,
          excerpt: item.description
            ? item.description.substring(0, 150) + "..."
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

  return (
    <section className="relative py-4 md:py-6 bg-white">
      <div className="w-full px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase text-[#1b2b4a] mb-3">
            Latest Events & News
          </h2>
          <div className="w-24 h-[3px] bg-[#ffd700] mx-auto" />
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: Latest Events */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <h3 className="text-2xl font-bold text-[#1b2b4a] mb-4 uppercase">
              Latest Events
            </h3>

            {/* Image Slideshow */}
            <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl bg-black mb-4">
              {eventImages.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`Tournament event ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    index === activeIndex ? "opacity-100" : "opacity-0"
                  }`}
                  draggable="false"
                />
              ))}

              {/* Navigation Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {eventImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "bg-[#ffd700] w-8"
                        : "bg-white/60 hover:bg-white/80"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* View All Button */}
            <div className="text-center">
              <a
                href="/gallery"
                className="inline-block bg-[#1b2b4a] text-white font-bold uppercase tracking-wide px-6 py-3 rounded-md hover:bg-[#2a3f5f] transition-all duration-300 shadow-md hover:shadow-lg text-sm"
              >
                View All Events
              </a>
            </div>
          </motion.div>

          {/* RIGHT: Latest News */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <h3 className="text-2xl font-bold text-[#1b2b4a] mb-4 uppercase">
              Latest News
            </h3>

            {loading ? (
              <div className="flex items-center justify-center h-[400px] md:h-[500px] bg-gray-100 rounded-lg">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1b2b4a] mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading news...</p>
                </div>
              </div>
            ) : articles.length > 0 ? (
              <div className="space-y-4 h-[400px] md:h-[500px] overflow-y-auto pr-2">
                {articles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* News Image */}
                      <div className="w-full sm:w-1/3 h-48 sm:h-auto">
                        <SecureImage
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* News Content */}
                      <div className="flex-1 p-4">
                        <h4 className="text-lg font-bold text-[#1b2b4a] mb-2 line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <Link
                          to={`/news/${article.id}`}
                          className="text-[#ffd700] font-semibold hover:underline text-sm inline-flex items-center"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[400px] md:h-[500px] bg-gray-100 rounded-lg">
                <p className="text-gray-600">No news available</p>
              </div>
            )}

            {/* View All News Button */}
            <div className="text-center mt-4">
              <Link
                to="/news"
                className="inline-block bg-[#1b2b4a] text-white font-bold uppercase tracking-wide px-6 py-3 rounded-md hover:bg-[#2a3f5f] transition-all duration-300 shadow-md hover:shadow-lg text-sm"
              >
                View All News
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
