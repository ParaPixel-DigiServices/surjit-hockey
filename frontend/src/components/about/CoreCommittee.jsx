import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getApiUrl } from "../../config/api";

export default function CoreCommittee() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommitteeMembers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${getApiUrl()}/core-committee`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMembers(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching core committee members:", err);
        setError("Failed to load committee members");
      } finally {
        setLoading(false);
      }
    };

    fetchCommitteeMembers();
  }, []);

  return (
    <section
      id="core-committee"
      className="relative py-16 md:py-20 bg-gradient-to-br from-[#1b2b4a] to-[#0d1630] text-white"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold uppercase text-center mb-3 text-[#ffd700]"
        >
          7 Member Core Committee
        </motion.h2>

        <div className="w-24 h-[3px] bg-[#ffd700] mx-auto mb-4" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-white/80 mb-12 max-w-3xl mx-auto"
        >
          The Following 7 Members Core Committee has been appointed to take
          final decisions regarding organizing / preparations of the tournament
          and on policy matters.
        </motion.p>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ffd700]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                {member.image_url && (
                  <div className="mb-4">
                    <img
                      src={member.image_url}
                      alt={member.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#ffd700]/20 flex items-center justify-center text-[#ffd700] font-bold text-lg flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {member.name}
                    </h3>
                    <p className="text-sm text-[#ffd700]">{member.role}</p>
                  </div>
                </div>
                {member.description && (
                  <p className="text-sm text-white/70">{member.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
