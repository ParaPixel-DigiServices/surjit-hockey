import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import config from "../../config/api";

/**
 * SponsorsMarquee - Auto-scrolling sponsor logos
 * Displayed below hero section with continuous animation
 * Fetches real sponsors from API
 */
export default function SponsorsMarquee() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        setLoading(true);
        const data = await api.getSponsors(0, 100);
        // Filter active sponsors and get their images
        const activeSponsors = data
          .filter((s) => s.status === true)
          .map((s) => ({
            id: s.id,
            name: s.sponser_name,
            image: s.sponser_image
              ? config.getUploadUrl("sponsors", s.sponser_image)
              : null,
          }))
          .filter((s) => s.image);

        // Duplicate sponsors for smooth infinite loop
        setSponsors([...activeSponsors, ...activeSponsors]);
      } catch (error) {
        console.error("Failed to fetch sponsors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSponsors();
  }, []);

  if (loading || sponsors.length === 0) {
    return null; // Don't show section while loading or if no sponsors
  }

  return (
    <section className="w-full bg-[#0b152d] py-12 overflow-hidden border-y border-[#ffd700]/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-10 relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-wider font-[Sora] text-white uppercase"
          >
            Our Proud Sponsors
          </motion.h2>
          <div className="mt-3 h-[3px] w-20 bg-[#ffd700] mx-auto rounded-full" />

          <Link
            to="/sponsors"
            className="absolute right-0 top-1/2 -translate-y-1/2 text-sm font-semibold text-white/60 hover:text-[#ffd700] transition hidden md:block"
          >
            View All &rarr;
          </Link>
        </div>

        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex items-center gap-10 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 20,
              repeat: Infinity,
            }}
          >
            {sponsors.map((sponsor, i) => (
              <img
                key={`${sponsor.id}-${i}`}
                src={sponsor.image}
                alt={sponsor.name}
                className="h-16 md:h-20 object-contain brightness-110 hover:brightness-125 transition"
              />
            ))}
          </motion.div>
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link
            to="/sponsors"
            className="text-sm font-semibold text-white/60 hover:text-[#ffd700] transition"
          >
            View All Sponsors &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
