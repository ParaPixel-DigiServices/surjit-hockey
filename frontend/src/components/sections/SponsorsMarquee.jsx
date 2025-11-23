import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
            name: s.name,
            image: s.logo ? config.getUploadUrl("sponsors", s.logo) : null,
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
    <section className="w-full bg-[#0b152d] py-8 overflow-hidden border-y border-[#ffd700]/20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-[#ffd700] text-center mb-6 uppercase tracking-wide">
          Our Proud Sponsors
        </h2>

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
      </div>
    </section>
  );
}
