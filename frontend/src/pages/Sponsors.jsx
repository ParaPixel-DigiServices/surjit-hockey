import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Award } from "lucide-react";
import config from "../config/api";
import SecureImage from "../components/ui/SecureImage";

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.spo_id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#1b2b4a] rounded-xl p-8 flex items-center justify-center hover:shadow-xl hover:shadow-[#ffd700]/10 transition duration-300 group h-48 border border-white/10"
            >
              {/* Logo Only */}
              {sponsor.spo_logo ? (
                <SecureImage
                  src={sponsor.spo_logo}
                  alt={sponsor.spo_name}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <span className="text-white/20 font-bold text-xl">
                  {sponsor.spo_name}
                </span>
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
