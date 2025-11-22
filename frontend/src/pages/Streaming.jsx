import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, Calendar, ExternalLink } from "lucide-react";

/**
 * Streaming Page
 * --------------
 * Live streaming and video content
 */
export default function Streaming() {
  const [streamingData, setStreamingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStreamingData();
  }, []);

  const fetchStreamingData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/additional/streaming"
      );
      const data = await response.json();
      setStreamingData(data);
    } catch (error) {
      console.error("Failed to fetch streaming data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b152d]">
        <div className="text-white text-xl">Loading streaming...</div>
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
            Live <span className="text-[#ffd700]">Streaming</span>
          </h1>
          <p className="text-white/70 text-lg">
            Watch matches live and catch up on highlights
          </p>
        </motion.div>

        {streamingData ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Main Stream Card */}
            <div className="bg-[#1b2b4a] rounded-lg overflow-hidden border border-white/10">
              {/* Embed Area */}
              {streamingData.embed_code ? (
                <div
                  className="aspect-video bg-black"
                  dangerouslySetInnerHTML={{ __html: streamingData.embed_code }}
                />
              ) : (
                <div className="aspect-video bg-black flex items-center justify-center">
                  <Play size={64} className="text-white/30" />
                </div>
              )}

              {/* Stream Info */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {streamingData.title || "Live Stream"}
                </h2>

                {streamingData.description && (
                  <p className="text-white/70 mb-6">
                    {streamingData.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-4">
                  {streamingData.streaming_link && (
                    <a
                      href={streamingData.streaming_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#ffd700] text-[#0b152d] px-6 py-3 rounded-lg font-semibold hover:bg-[#ffd700]/90 transition"
                    >
                      <ExternalLink size={18} />
                      Open Stream
                    </a>
                  )}

                  {streamingData.schedule_time && (
                    <div className="inline-flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg">
                      <Calendar size={18} />
                      {new Date(streamingData.schedule_time).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1b2b4a] rounded-lg p-6 border border-white/10">
                <h3 className="text-lg font-bold text-[#ffd700] mb-3">
                  Stream Status
                </h3>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      streamingData.is_active ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <span className="text-white">
                    {streamingData.is_active ? "Live Now" : "Offline"}
                  </span>
                </div>
              </div>

              <div className="bg-[#1b2b4a] rounded-lg p-6 border border-white/10">
                <h3 className="text-lg font-bold text-[#ffd700] mb-3">
                  Platform
                </h3>
                <p className="text-white">
                  {streamingData.platform || "YouTube"}
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="text-center text-white/50 py-12">
            No streaming available at this time
          </div>
        )}
      </div>
    </div>
  );
}
