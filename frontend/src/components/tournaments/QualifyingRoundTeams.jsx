import React from "react";
import { motion } from "framer-motion";
import SecureImage from "../ui/SecureImage";

// Import all team logos here
import ongc from "../../assets/teams/ongc.png";
import corps from "../../assets/teams/corps.png";
import eme from "../../assets/teams/eme.png";
import armygreen from "../../assets/teams/armygreen.png";
import fci1 from "../../assets/teams/fci1.png";
import fci2 from "../../assets/teams/fci.png";
import itbp from "../../assets/teams/itbp.png";
import cbct from "../../assets/teams/cbct.png";

export default function QualifyingRoundTeams() {
  const teams = [
    { name: "ONGC Delhi", logo: ongc },
    { name: "Corps of Signals", logo: corps },
    { name: "EME Jalandhar", logo: eme },
    { name: "Army Green", logo: armygreen },
    { name: "FCI Delhi", logo: fci1 },
    { name: "FCI", logo: fci2 },
    { name: "ITBP", logo: itbp },
    { name: "CBCT Delhi", logo: cbct },
  ];

  // Split into two columns
  const leftTeams = teams.slice(0, Math.ceil(teams.length / 2));
  const rightTeams = teams.slice(Math.ceil(teams.length / 2));

  return (
    <section
      id="qualifying-round-teams"
      className="relative w-full py-20 md:py-28 bg-[#fdfdfd] text-[#1b2b4a] font-[Sora] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* --- Heading --- */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold uppercase mb-4 text-center text-[#1b2b4a]"
        >
          Qualifying Round Teams
        </motion.h2>

        <div className="w-24 h-[3px] mx-auto mb-12 bg-[#ffd700]" />

        {/* --- Team Grid (Two Columns) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
          {[leftTeams, rightTeams].map((column, colIndex) => (
            <div
              key={colIndex}
              className="flex flex-col items-center gap-10 w-full"
            >
              {column.map((team, i) => (
                <motion.div
                  key={team.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-[4px] border-[#ffd700]/70 shadow-md flex items-center justify-center bg-white hover:scale-105 transition-transform duration-300">
                    <SecureImage
                      src={team.logo}
                      alt={team.name}
                      className="w-24 h-24 object-contain rounded-full"
                    />
                  </div>
                  <p className="mt-3 text-sm sm:text-base font-semibold text-[#1b2b4a]">
                    {team.name}
                  </p>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
