import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Positions Page
 * --------------
 * Display all hockey positions with descriptions
 */
export default function Positions() {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/additional/positions"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Map API fields: id→pos_id, position→pos_name
      const mappedPositions = Array.isArray(data)
        ? data.map((p) => ({
            pos_id: p.id,
            pos_name: p.position,
            status: p.status,
          }))
        : [];
      setPositions(mappedPositions);
    } catch (error) {
      console.error("Failed to fetch positions:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b152d]">
        <div className="text-white text-xl">Loading positions...</div>
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
            Player <span className="text-[#ffd700]">Positions</span>
          </h1>
          <p className="text-white/70 text-lg">
            Understanding roles on the hockey field
          </p>
        </motion.div>

        {/* Positions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {positions.map((position, index) => (
            <motion.div
              key={position.pos_id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1b2b4a] rounded-lg p-6 border border-white/10 hover:border-[#ffd700]/50 transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#ffd700] rounded-full flex items-center justify-center text-[#0b152d] font-bold text-xl">
                  {position.pos_name?.charAt(0) || "?"}
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {position.pos_name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {positions.length === 0 && (
          <div className="text-center text-white/50 py-12">
            No positions data available
          </div>
        )}
      </div>
    </div>
  );
}
