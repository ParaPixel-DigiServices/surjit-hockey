// src/admin/components/pools/PoolCard.jsx
import React from "react";
import { Edit2, Trash2, Users } from "lucide-react";

export default function PoolCard({ pool, onEdit, onManageTeams, onDelete, onEditStats }) {
  return (
    <div className="bg-[#08162e] border border-white/8 rounded-xl p-5 flex flex-col gap-4 hover:shadow-2xl transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-white">{pool.name}</h3>
          <div className="text-sm text-white/70 mt-1">
            {pool.category} • {pool.teams.length} teams
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(pool)}
            className="p-2 rounded-md hover:bg-white/6 text-white"
            title="Edit pool"
          >
            <Edit2 size={16} />
          </button>

          <button
            onClick={() => onEditStats(pool)}
            className="p-2 rounded-md hover:bg-white/6 text-white"
            title="Edit stats"
          >
            <Users size={16} />
          </button>

          <button
            onClick={() => onDelete(pool)}
            className="p-2 rounded-md hover:bg-red-600/20 text-red-400"
            title="Delete pool"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-white/80 text-sm">{pool.description ?? ""}</div>
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onManageTeams(pool)}
          className="flex-1 bg-[#ffd700] text-[#071226] font-semibold py-2 rounded-md"
        >
          Manage Teams
        </button>
      </div>
    </div>
  );
}
