import React from "react";
import { motion } from "framer-motion";

export default function BestPlayersHighlight() {
  const players = [
    {
      id: 1,
      name: "Gurpreet Singh",
      teamName: "Punjab Warriors",
      jerseyNumber: 9,
      totalScore: 12,
      fieldGoals: 7,
      penaltyShot: 3,
      penaltyCorner: 2,
    },
    {
      id: 2,
      name: "Arjun Kumar",
      teamName: "Jalandhar Falcons",
      jerseyNumber: 11,
      totalScore: 9,
      fieldGoals: 4,
      penaltyShot: 2,
      penaltyCorner: 3,
    },
  ];

  return (
    <section className="relative bg-[#0b152d] text-white py-4 md:py-6 font-[Sora]">
      <div className="w-full px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold uppercase tracking-wide text-[#ffd700]"
          >
            Best Players
          </motion.h2>
          <div className="mt-3 h-[3px] w-24 bg-[#ffd700] mx-auto rounded-full" />
          <p className="mt-4 text-sm md:text-base text-white/70">
            Highlighting top tournament performers with their key scoring stats.
          </p>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {players.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl bg-gradient-to-br from-[#111c38] to-[#020617] border border-white/10 shadow-xl p-6 md:p-8 overflow-hidden"
            >
              <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_top,_rgba(255,215,0,0.08),_transparent_60%)]" />

              <div className="relative flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#ffd700]/80 mb-1">
                    {index === 0 ? "Best Player" : "Second Best Player"}
                  </p>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {player.name}
                  </h3>
                  <p className="text-sm text-white/70">{player.teamName}</p>
                </div>
                <div className="flex flex-col items-center justify-center px-3 py-2 rounded-xl bg-[#ffd700]/10 border border-[#ffd700]/40">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#ffd700]/80">
                    Jersey
                  </span>
                  <span className="text-2xl font-extrabold text-[#ffd700]">
                    {player.jerseyNumber}
                  </span>
                </div>
              </div>

              <div className="relative grid grid-cols-4 gap-3 mt-4">
                <div className="col-span-1 flex flex-col items-center justify-center rounded-xl bg-white/5 border border-white/10 px-2 py-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 mb-1">
                    Total
                  </span>
                  <span className="text-xl font-bold text-[#ffd700]">
                    {player.totalScore}
                  </span>
                  <span className="text-[11px] text-white/60 mt-1">Goals</span>
                </div>
                <div className="col-span-1 flex flex-col items-center justify-center rounded-xl bg-white/5 border border-white/10 px-2 py-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 mb-1 text-center">
                    Field
                  </span>
                  <span className="text-xl font-bold text-white">
                    {player.fieldGoals}
                  </span>
                  <span className="text-[11px] text-white/60 mt-1 text-center">
                    Goals
                  </span>
                </div>
                <div className="col-span-1 flex flex-col items-center justify-center rounded-xl bg-white/5 border border-white/10 px-2 py-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 mb-1 text-center">
                    Penalty
                  </span>
                  <span className="text-xl font-bold text-white">
                    {player.penaltyShot}
                  </span>
                  <span className="text-[11px] text-white/60 mt-1 text-center">
                    Shots
                  </span>
                </div>
                <div className="col-span-1 flex flex-col items-center justify-center rounded-xl bg-white/5 border border-white/10 px-2 py-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 mb-1 text-center">
                    Penalty
                  </span>
                  <span className="text-xl font-bold text-white">
                    {player.penaltyCorner}
                  </span>
                  <span className="text-[11px] text-white/60 mt-1 text-center">
                    Corners
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
