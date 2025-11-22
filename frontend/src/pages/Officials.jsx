import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Award } from "lucide-react";

/**
 * Officials Page
 * --------------
 * Display tournament officials and administration
 */
export default function Officials() {
  const [officials, setOfficials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOfficials();
  }, []);

  const fetchOfficials = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/officials?skip=0&limit=500"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Map API fields: id→off_id, user_name→off_name, desigination→off_position, etc.
      const mappedOfficials = Array.isArray(data)
        ? data.map((o) => ({
            off_id: o.id,
            off_name: o.user_name,
            off_position: o.desigination,
            off_email: o.email,
            off_mobile: o.mobile_no,
            off_photo: o.profile_image
              ? `http://localhost:8000/uploads/officials/${o.profile_image}`
              : null,
          }))
        : [];
      setOfficials(mappedOfficials);
    } catch (error) {
      console.error("Failed to fetch officials:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b152d]">
        <div className="text-white text-xl">Loading officials...</div>
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
            Tournament <span className="text-[#ffd700]">Officials</span>
          </h1>
          <p className="text-white/70 text-lg">
            Meet the dedicated team behind the tournament
          </p>
        </motion.div>

        {/* Officials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {officials.map((official, index) => (
            <motion.div
              key={official.off_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1b2b4a] rounded-lg p-6 border border-white/10 hover:border-[#ffd700]/50 transition"
            >
              {/* Photo */}
              {official.off_photo && (
                <div className="mb-4 flex justify-center">
                  <img
                    src={official.off_photo}
                    alt={official.off_name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-[#ffd700]"
                  />
                </div>
              )}

              {/* Name & Position */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-white mb-1">
                  {official.off_name}
                </h3>
                <p className="text-[#ffd700] font-semibold flex items-center justify-center gap-2">
                  <Award size={16} />
                  {official.off_position}
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-sm text-white/70">
                {official.off_email && (
                  <div className="flex items-center gap-2">
                    <Mail size={14} />
                    <a
                      href={`mailto:${official.off_email}`}
                      className="hover:text-[#ffd700] transition"
                    >
                      {official.off_email}
                    </a>
                  </div>
                )}
                {official.off_mobile && (
                  <div className="flex items-center gap-2">
                    <Phone size={14} />
                    <a
                      href={`tel:${official.off_mobile}`}
                      className="hover:text-[#ffd700] transition"
                    >
                      {official.off_mobile}
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {officials.length === 0 && (
          <div className="text-center text-white/50 py-12">
            No officials data available
          </div>
        )}
      </div>
    </div>
  );
}
