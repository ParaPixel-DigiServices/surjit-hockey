import React, { useState } from "react";
import { motion } from "framer-motion";

/**
 * Positions Page
 * --------------
 * Display all hockey positions with descriptions
 */
export default function Positions() {
  // Enhanced position data with descriptions and responsibilities
  const positionsData = [
    {
      id: 1,
      name: "Goal Keeper",
      abbreviation: "GK",
      description:
        "The last line of defense, responsible for protecting the goal and preventing the opposition from scoring.",
      responsibilities: [
        "Stop shots on goal using pads, stick, or any legal part of the body",
        "Clear the ball from the defensive circle",
        "Communicate with defenders to organize the defense",
        "Initiate counter-attacks with accurate passes",
      ],
      keySkills: ["Reflexes", "Positioning", "Communication", "Aerial ability"],
    },
    {
      id: 2,
      name: "Full Back",
      abbreviation: "FB",
      description:
        "Defensive players positioned closest to the goalkeeper, forming the primary defensive line.",
      responsibilities: [
        "Mark opposition forwards and prevent scoring opportunities",
        "Intercept passes and clear the ball from danger zones",
        "Support the goalkeeper in defensive organization",
        "Transition play from defense to midfield",
      ],
      keySkills: ["Tackling", "Positioning", "Strength", "Distribution"],
    },
    {
      id: 3,
      name: "Half Back",
      abbreviation: "HB",
      description:
        "Versatile midfield players who link defense and attack, crucial for both phases of play.",
      responsibilities: [
        "Control the midfield and dictate the tempo of the game",
        "Break up opposition attacks and win ball possession",
        "Distribute the ball to forwards and create scoring opportunities",
        "Track back to support the defense when needed",
      ],
      keySkills: ["Vision", "Passing", "Stamina", "Ball control"],
    },
    {
      id: 4,
      name: "Forward",
      abbreviation: "FW",
      description:
        "Attacking players whose primary role is to score goals and create chances for the team.",
      responsibilities: [
        "Score goals and convert scoring opportunities",
        "Press opposition defenders and force turnovers",
        "Create space for teammates through intelligent movement",
        "Execute penalty corners and set-piece routines",
      ],
      keySkills: ["Shooting", "Speed", "Dribbling", "Finishing"],
    },
  ];

  const [loading] = useState(false);

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {positionsData.map((position, index) => (
            <motion.div
              key={position.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="bg-gradient-to-br from-[#1b2b4a] to-[#0f1a2e] rounded-xl p-8 border border-[#ffd700]/20 hover:border-[#ffd700]/50 transition shadow-lg"
            >
              {/* Position Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ffd700] to-[#ffa500] rounded-full flex items-center justify-center text-[#0b152d] font-bold text-2xl shadow-lg">
                  {position.abbreviation}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">
                    {position.name}
                  </h3>
                  <p className="text-[#ffd700] text-sm font-semibold">
                    {position.abbreviation}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/80 mb-6 leading-relaxed">
                {position.description}
              </p>

              {/* Responsibilities */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-[#ffd700] mb-3">
                  Key Responsibilities
                </h4>
                <ul className="space-y-2">
                  {position.responsibilities.map((resp, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-white/70 text-sm"
                    >
                      <span className="text-[#ffd700] mt-1">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Skills */}
              <div>
                <h4 className="text-lg font-semibold text-[#ffd700] mb-3">
                  Essential Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {position.keySkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#ffd700]/10 border border-[#ffd700]/30 rounded-full text-white/80 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
