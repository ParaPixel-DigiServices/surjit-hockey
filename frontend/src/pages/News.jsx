import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Newspaper, ArrowRight } from "lucide-react";

// --- Import Example Images ---
import news1 from "../assets/news1.jpg";
import news2 from "../assets/news2.jpg";
import news3 from "../assets/news3.jpg";
import news4 from "../assets/news4.jpg";

/**
 * NEWS PAGE — Surjit Hockey Society
 * --------------------------------------------
 * ✅ White theme with black-gold typography
 * ✅ Magazine-style alternating articles
 * ✅ Smooth hover and parallax transitions
 * ✅ Elegant Navbar to return home
 */

export default function News() {
  const navigate = useNavigate();

  const newsItems = [
    {
      title: "Indian Oil Mumbai Wins 2024 Surjit Hockey Tournament",
      date: "November 2, 2024",
      image: news1,
      excerpt:
        "In an intense final clash, Indian Oil Mumbai defeated Bharat Petroleum to claim the Surjit Hockey Trophy 2024. The match showcased world-class skills, lightning-fast plays, and a crowd roaring till the final whistle.",
    },
    {
      title: "Rising Stars Shine in Junior Hockey Segment",
      date: "October 25, 2024",
      image: news2,
      excerpt:
        "The junior players from Punjab displayed immense potential during this year’s tournament. Coaches are calling them the future of Indian hockey, with several standout performances in the group stages.",
    },
    {
      title: "Chief Guest Dr. Himanshu Aggarwal Commends Players’ Spirit",
      date: "October 20, 2024",
      image: news3,
      excerpt:
        "During the opening ceremony, Dr. Himanshu Aggarwal, IAS, highlighted the importance of sportsmanship and Surjit Hockey Society’s contribution to nurturing hockey talent across India.",
    },
    {
      title: "New Artificial Turf Unveiled at Surjit Hockey Stadium",
      date: "October 10, 2024",
      image: news4,
      excerpt:
        "The new turf was inaugurated ahead of the tournament to ensure international-level playing conditions. Officials say it’s one of the fastest surfaces ever installed in North India.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-white text-[#111] font-[Sora] overflow-hidden">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg sm:text-xl font-semibold text-[#0a0a0a] uppercase tracking-wide"
          >
            Surjit Hockey Newsroom
          </motion.h1>

          <button
            onClick={() => navigate("/")}
            className="text-sm uppercase font-semibold text-black/70 hover:text-[#d4af37] transition"
          >
            ← Back to Home
          </button>
        </div>
      </header>

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
              <button className="flex items-center gap-2 mt-3 text-[#d4af37] font-semibold hover:gap-3 transition-all">
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
