import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Award } from "lucide-react";
import config from "../config/api";

/**
 * Sponsors Page
 * -------------
 * Display tournament sponsors and partners
 */
export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const response = await fetch(
        `${config.apiUrl}/sponsors?skip=0&limit=500`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Map API fields: id→spo_id, sponser_name→spo_name, sponser_image→spo_logo
      const mappedSponsors = Array.isArray(data)
        ? data.map((s) => ({
            spo_id: s.id,
            spo_name: s.sponser_name,
            spo_logo: s.sponser_image
              ? config.getUploadUrl("sponsors", s.sponser_image)
              : null,
            spo_detail: s.detail,
          }))
        : [];
      setSponsors(mappedSponsors);
    } catch (error) {
      console.error("Failed to fetch sponsors:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b152d]">
        <div className="text-white text-xl">Loading sponsors...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b152d] text-white py-20 px-4 font-[Sora]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-[#ffd700]">Sponsors</span>
          </h1>
          <p className="text-white/70 text-lg">
            Thank you to our valued partners and supporters
          </p>
        </motion.div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.spo_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#1b2b4a] rounded-lg p-6 border border-white/10 hover:border-[#ffd700]/50 transition group"
            >
              {/* Logo */}
              {sponsor.spo_logo && (
                <div className="mb-4 flex justify-center bg-white/5 p-6 rounded-lg">
                  <img
                    src={sponsor.spo_logo}
                    alt={sponsor.spo_name}
                    className="h-24 object-contain"
                  />
                </div>
              )}

              {/* Name */}
              <h3 className="text-xl font-bold text-center text-white mb-2 group-hover:text-[#ffd700] transition">
                {sponsor.spo_name}
              </h3>

              {/* Category */}
              {sponsor.spo_category && (
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Award size={14} className="text-[#ffd700]" />
                  <span className="text-sm text-white/60">
                    {sponsor.spo_category}
                  </span>
                </div>
              )}

              {/* Description */}
              {sponsor.spo_description && (
                <p className="text-sm text-white/60 text-center mb-4 line-clamp-3">
                  {sponsor.spo_description}
                </p>
              )}

              {/* Website Link */}
              {sponsor.spo_website && (
                <div className="text-center pt-4 border-t border-white/10">
                  <a
                    href={sponsor.spo_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#ffd700] text-sm font-semibold hover:underline"
                  >
                    Visit Website
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {sponsors.length === 0 && (
          <div className="text-center text-white/50 py-12">
            No sponsors data available
          </div>
        )}
      </div>
    </div>
  );
}
