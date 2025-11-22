import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import config from "../../config/api";

/**
 * Messages.jsx — Delegates’ Messages Carousel
 * -------------------------------------------
 * - Auto slides every 4s
 * - Pause on hover
 * - Swipe on mobile
 * - White background / navy text / gold accent
 * - Framer Motion fade+slide transition
 */

const messages = [
  {
    id: 1,
    name: "Dr. Arjun Singh",
    role: "Chief Organizer",
    image: config.getUploadUrl("officials", "13-406.jpg"),
    message:
      "We extend a warm welcome to all teams and fans joining us for this year's Surjit Hockey Tournament. Let the spirit of sportsmanship shine through every match!",
  },
  {
    id: 2,
    name: "Karanveer Bains",
    role: "Tournament Director",
    image: config.getUploadUrl("officials", "20-181.jpg"),
    message:
      "This event is more than competition — it's a celebration of dedication, teamwork, and legacy. Best wishes to all participating teams.",
  },
  {
    id: 3,
    name: "Simran Gill",
    role: "Executive Member",
    image: config.getUploadUrl("officials", "21-864.jpg"),
    message:
      "Every year, our tournament grows stronger because of our community's love for hockey. Thank you for being part of our journey.",
  },
];

export default function Messages() {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (hovering) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [hovering]);

  const next = () => setIndex((prev) => (prev + 1) % messages.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + messages.length) % messages.length);

  return (
    <section
      className="relative bg-white text-[#1b2b4a] py-16 md:py-24 font-[Sora] overflow-hidden"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase">
          Messages from Delegates
        </h2>
        <div className="mt-3 h-[3px] w-24 bg-[#ffd700] mx-auto rounded-full" />
      </div>

      {/* Carousel Container */}
      <div className="max-w-3xl mx-auto relative flex flex-col items-center px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={messages[index].id}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="bg-[#f9f9f9] rounded-2xl shadow-lg p-8 md:p-10 flex flex-col items-center"
          >
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#ffd700] mb-5">
              <img
                src={messages[index].image}
                alt={messages[index].name}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6 italic">
              “{messages[index].message}”
            </p>

            <h4 className="text-lg md:text-xl font-bold text-[#1b2b4a]">
              {messages[index].name}
            </h4>
            <p className="text-sm text-gray-500 font-medium">
              {messages[index].role}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {messages.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition ${
                i === index ? "bg-[#ffd700]" : "bg-gray-300"
              }`}
              aria-label={`Go to message ${i + 1}`}
            />
          ))}
        </div>

        {/* Optional manual arrows */}
        <div className="absolute inset-y-1/2 -translate-y-1/2 w-full flex justify-between px-2 md:px-6 pointer-events-none">
          <button
            onClick={prev}
            className="pointer-events-auto bg-white/80 hover:bg-white text-[#1b2b4a] font-bold w-8 h-8 rounded-full shadow-sm flex items-center justify-center"
            aria-label="Previous message"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="pointer-events-auto bg-white/80 hover:bg-white text-[#1b2b4a] font-bold w-8 h-8 rounded-full shadow-sm flex items-center justify-center"
            aria-label="Next message"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
