import React from "react";
import { motion } from "framer-motion";
import config from "../../config/api";

/**
 * Players.jsx — "Meet the Troopers" (Edge-to-Edge)
 * ------------------------------------------------
 * - Blue background (#1b2b4a)
 * - White text, gold underline
 * - No gaps, no border radius, full-width grid
 * - Subtle hover zoom (no borders)
 * - Framer Motion staggered fade-in animation
 */

const players = [
  config.getUploadUrl("gallery", "2-261.jpeg"),
  config.getUploadUrl("gallery", "10-404.JPG"),
  config.getUploadUrl("gallery", "13-23.jpg"),
  config.getUploadUrl("gallery", "15-180.JPG"),
  config.getUploadUrl("gallery", "1-526.jpg"),
  config.getUploadUrl("gallery", "12-591.JPG"),
  config.getUploadUrl("gallery", "14-564.JPG"),
  config.getUploadUrl("gallery", "11-859.JPG"),
  config.getUploadUrl("gallery", "13-809.JPG"),
  config.getUploadUrl("gallery", "15-682.JPG"),
];

export default function Players() {
  return (
    <section className="relative bg-[#1b2b4a] text-white py-16 md:py-24 font-[Sora] overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase">
          GALLERY
        </h2>
        <div className="mt-3 h-[3px] w-24 bg-[#ffd700] mx-auto rounded-full" />
      </div>

      {/* Tight Image Grid */}
      <motion.div
        className="max-w-[1600px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.05 },
          },
        }}
      >
        {players.map((img, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, scale: 0.98 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden"
          >
            <img
              src={img}
              alt={`Player ${index + 1}`}
              className="w-full h-full object-cover aspect-[4/5] transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
