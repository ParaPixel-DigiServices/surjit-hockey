// src/admin/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/icon.png";
import SecureImage from "../../components/ui/SecureImage";
import {
  Home,
  Users,
  Grid,
  Clock,
  Trophy,
  Image,
  FileText,
  Settings,
  DollarSign,
  Film,
} from "lucide-react";

export default function Sidebar({ open = false, onOpenChange = () => {} }) {
  const linkCls = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition ${
      isActive
        ? "bg-[#ffd700] text-[#071226]"
        : "text-white/90 hover:bg-white/6"
    }`;

  return (
    <>
      {/* MOBILE SIDEBAR */}
      <motion.div
        initial={{ x: -320 }}
        animate={{ x: open ? 0 : -320 }}
        transition={{ type: "tween", duration: 0.22 }}
        className="md:hidden fixed inset-y-0 left-0 z-50 w-72 bg-[#08162e]/95 backdrop-blur p-4 border-r border-white/6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <SecureImage src={logo} className="w-10 h-10" alt="Surjit Admin" />
            <div className="text-white font-semibold">Surjit Admin</div>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="p-2 rounded hover:bg-white/6"
          >
            ✕
          </button>
        </div>

        <nav className="space-y-1">
          <NavLink to="/admin" end className={linkCls}>
            <Home /> Dashboard
          </NavLink>

          <NavLink to="/admin/teams" className={linkCls}>
            <Users /> Teams
          </NavLink>

          <NavLink to="/admin/pools" className={linkCls}>
            <Grid /> Pools
          </NavLink>

          <NavLink to="/admin/fixtures" className={linkCls}>
            <Clock /> Fixtures
          </NavLink>

          <NavLink to="/admin/results" className={linkCls}>
            <Trophy /> Results
          </NavLink>

          <NavLink to="/admin/gallery" className={linkCls}>
            <Image /> Gallery
          </NavLink>

          <NavLink to="/admin/news" className={linkCls}>
            <FileText /> News
          </NavLink>

          <NavLink to="/admin/sponsors" className={linkCls}>
            <DollarSign /> Sponsors
          </NavLink>

          <NavLink to="/admin/settings" className={linkCls}>
            <Settings /> Settings
          </NavLink>
        </nav>
      </motion.div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex md:flex-col w-64 bg-[#08162e]/80 border-r border-white/6 min-h-screen p-4">
        <div className="flex items-center gap-3 mb-6">
          <SecureImage src={logo} className="w-10 h-10" alt="Surjit Admin" />
          <div>
            <div className="text-white font-bold">Surjit Admin</div>
            <div className="text-xs text-white/60">Control Panel</div>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <NavLink to="/admin" end className={linkCls}>
            <Home /> Dashboard
          </NavLink>

          <NavLink to="/admin/teams" className={linkCls}>
            <Users /> Teams
          </NavLink>

          <NavLink to="/admin/pools" className={linkCls}>
            <Grid /> Pools
          </NavLink>

          <NavLink to="/admin/fixtures" className={linkCls}>
            <Clock /> Fixtures
          </NavLink>

          <NavLink to="/admin/results" className={linkCls}>
            <Trophy /> Results
          </NavLink>

          <NavLink to="/admin/gallery" className={linkCls}>
            <Image /> Gallery
          </NavLink>

          <NavLink to="/admin/news" className={linkCls}>
            <FileText /> News
          </NavLink>

          <NavLink to="/admin/sponsors" className={linkCls}>
            <DollarSign /> Sponsors
          </NavLink>
        </nav>

        <div className="mt-auto">
          <div className="text-xs text-white/60 mb-2 uppercase">Settings</div>
          <NavLink to="/admin/settings" className={linkCls}>
            <Settings /> Settings
          </NavLink>
        </div>
      </aside>
    </>
  );
}
