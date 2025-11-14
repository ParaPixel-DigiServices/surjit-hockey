import React from "react";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";

export default function TeamCard({ team, onEdit, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#071226] border border-white/10 rounded-xl p-4 flex items-center gap-4"
    >
      <img
        src={team.logo}
        alt={team.name}
        className="w-16 h-16 object-contain rounded-md bg-white/10 p-2"
      />

      <div className="flex-1">
        <h3 className="text-lg font-bold text-white">{team.name}</h3>
        <p className="text-sm text-white/60">{team.category}</p>
        <p className="text-xs text-white/40 mt-1">Coach: {team.coach}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(team)}
          className="p-2 rounded-md bg-[#ffd700] text-[#071226]"
        >
          <Pencil size={16} />
        </button>

        <button
          onClick={() => onDelete(team)}
          className="p-2 rounded-md border border-white/20 text-white"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
}
