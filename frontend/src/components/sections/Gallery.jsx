import React from "react";
import { motion } from "framer-motion";

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
  "https://images.unsplash.com/photo-1508187123589-5c6b9f5d8b49?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600180758890-6d8cf9f6b2b8?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1534258936925-c58f6eafe1e6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526406915891-9f8fe1e2ffed?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1580696887153-28d1833ddcb9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1546413111-9d6f3b4f3a9e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1509023919128-76b98d3e09af?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=800&q=80",
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
