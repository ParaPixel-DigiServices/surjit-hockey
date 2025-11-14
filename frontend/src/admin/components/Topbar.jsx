// src/admin/components/Topbar.jsx
import React, { useEffect, useState } from "react";
import { Search, Bell, Clock, Menu } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/icon.png";

/**
 * Topbar
 * - brand, command-search (visual), next-match timer, notifications, profile
 */
export default function Topbar({ onOpenMobile }) {
  const [timer, setTimer] = useState("00:00:00");
  const [countdownTarget] = useState(() => {
    // placeholder next match time — can be replaced by backend
    const dt = new Date();
    dt.setHours(dt.getHours() + 5);
    return dt;
  });

  // basic countdown
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = Math.max(0, countdownTarget - now);
      const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
      setTimer(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [countdownTarget]);

  return (
    <motion.header
      className="sticky top-0 z-40 backdrop-blur-md bg-[#08162e]/60 border-b border-white/6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-3 sm:px-6">
        <div className="flex items-center gap-3">
          {/* mobile menu button */}
          <button
            onClick={onOpenMobile}
            className="md:hidden p-2 rounded hover:bg-white/5 transition"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-white/90" />
          </button>

          {/* brand */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">Surjit Hockey — Admin</div>
              <div className="text-xs text-white/60">Control Panel</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Next match chip */}
          <div className="hidden sm:flex items-center gap-3 bg-[#ffd700]/10 text-[#ffd700] px-3 py-1 rounded-md font-semibold">
            <Clock className="w-4 h-4" />
            <div className="font-mono">{timer}</div>
          </div>

          {/* search (visual) */}
          <button className="p-2 rounded hover:bg-white/5 transition hidden sm:inline-flex">
            <Search className="w-5 h-5 text-white/90" />
          </button>

          {/* notifications */}
          <button className="p-2 rounded hover:bg-white/5 transition">
            <Bell className="w-5 h-5 text-white/90" />
          </button>

          {/* profile mini */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ffd700] to-[#ffdd66] flex items-center justify-center text-[#071226] font-bold">
              AD
            </div>
            <div className="hidden sm:flex flex-col text-right">
              <div className="text-sm font-semibold">Admin</div>
              <div className="text-xs text-white/60">Super Admin</div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
