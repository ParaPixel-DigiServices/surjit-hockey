import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

export default function LatestEvents() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % eventImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-4 md:py-6 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase text-[#1b2b4a] mb-3">
            Latest Events
          </h2>
          <div className="w-24 h-[3px] bg-[#ffd700] mx-auto mb-4" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            Capturing the unforgettable moments from our recent tournaments
          </p>
        </motion.div>

        {/* Single Frame Slideshow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Image Frame */}
          <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl bg-black">
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
          <div className="text-center mt-6">
            <a
              href="/gallery"
              className="inline-block bg-[#1b2b4a] text-white font-bold uppercase tracking-wide px-6 py-3 rounded-md hover:bg-[#2a3f5f] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              View All Events
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
