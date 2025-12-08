import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getApiUrl } from "../../config/api";

export default function DedicatedTeam() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(`${getApiUrl()}/dedicated-team`);
        if (!response.ok) {
          throw new Error("Failed to fetch team members");
        }
        const data = await response.json();
        setTeamMembers(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching team members:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (loading) {
    return (
      <section id="dedicated-team" className="relative py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center">
          <p className="text-gray-600">Loading team members...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="dedicated-team" className="relative py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="dedicated-team" className="relative py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold uppercase text-center mb-3 text-[#1b2b4a]"
        >
          Dedicated Team of Tournament
        </motion.h2>

        <div className="w-24 h-[3px] bg-[#ffd700] mx-auto mb-4" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 mb-12 max-w-3xl mx-auto"
        >
          Meet the dedicated individuals who work tirelessly to ensure the
          success of our annual tournament.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: (index % 10) * 0.05 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-base font-bold text-[#1b2b4a] mb-1">
                    {member.name}
                  </h3>
                  {member.role && (
                    <p className="text-sm text-gray-600">{member.role}</p>
                  )}
                </div>
                {member.image_url && (
                  <img
                    src={member.image_url}
                    alt={member.name}
                    className="w-24 h-20 object-cover rounded border border-gray-300"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
