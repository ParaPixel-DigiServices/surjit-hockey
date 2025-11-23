// src/admin/components/Topbar.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, Clock, Menu, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/icon.png";
import { useAuth } from "../../contexts/AuthContext";

/**
 * Topbar
 * - brand, command-search (visual), next-match timer, notifications, profile
 */
export default function Topbar({ onOpenMobile }) {
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
              <div className="text-sm font-semibold text-white">
                Surjit Hockey — Admin
              </div>
              <div className="text-xs text-white/60">Control Panel</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* search (visual) */}
          <button className="p-2 rounded hover:bg-white/5 transition hidden sm:inline-flex">
            <Search className="w-5 h-5 text-white/90" />
          </button>

          {/* notifications */}
          <button className="p-2 rounded hover:bg-white/5 transition">
            <Bell className="w-5 h-5 text-white/90" />
          </button>

          {/* profile dropdown */}
          <ProfileDropdown />
        </div>
      </div>
    </motion.header>
  );
}

function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1 rounded-lg hover:bg-white/5 transition"
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ffd700] to-[#ffdd66] flex items-center justify-center text-[#071226] font-bold">
          {user?.username?.substring(0, 2).toUpperCase() || "AD"}
        </div>
        <div className="hidden sm:flex flex-col text-right">
          <div className="text-sm font-semibold">
            {user?.username || "Admin"}
          </div>
          <div className="text-xs text-white/60">
            {user?.email || "admin@hockey.com"}
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-56 bg-[#1b2b4a] rounded-lg shadow-2xl border border-white/10 z-50"
            >
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ffd700] to-[#ffdd66] flex items-center justify-center text-[#071226] font-bold">
                    {user?.username?.substring(0, 2).toUpperCase() || "AD"}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {user?.username || "Admin"}
                    </div>
                    <div className="text-xs text-white/60">
                      {user?.email || "admin@hockey.com"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    // Add profile navigation if needed
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 transition text-white/80 hover:text-white"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm">Profile</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-500/10 transition text-red-400 hover:text-red-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
