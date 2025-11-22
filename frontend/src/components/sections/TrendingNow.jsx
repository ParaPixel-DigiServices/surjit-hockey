import React from "react";
import { motion } from "framer-motion";
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
 */

const articles = [
  {
    id: 1,
    title: "India Triumphs in National Hockey Championship",
    excerpt:
      "A powerful performance leads the team to victory in this year's national championship. Here's how it unfolded on the field.",
    image: config.getUploadUrl("news", "1.jpg"),
  },
  {
    id: 2,
    title: "Rising Stars: The New Era of Surjit Hockey Talent",
    excerpt:
      "Discover the young players redefining speed, skill, and precision on the pitch this season.",
    image: config.getUploadUrl("news", "2.jpg"),
  },
  {
    id: 3,
    title: "The Legacy Behind the Surjit Hockey Tournament",
    excerpt:
      "A look back at the historical milestones that built one of India's most prestigious hockey tournaments.",
    image: config.getUploadUrl("news", "3.jpg"),
  },
  {
    id: 4,
    title: "Fitness and Focus: How Champions Train Off the Field",
    excerpt:
      "From discipline to diet, we break down how top players prepare their minds and bodies for excellence.",
    image: config.getUploadUrl("news", "11-24-379.jpg"),
  },
];

export default function TrendingNow() {
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

              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-[#ffd700] font-semibold cursor-pointer hover:underline tracking-wide"
              >
                Read More →
              </motion.span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
