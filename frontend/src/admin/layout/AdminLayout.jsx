// src/admin/layout/AdminLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

/**
 * AdminLayout — premium left-sidebar layout (Style A)
 * - Sidebar (collapsible on small screens)
 * - Sticky Topbar
 * - Outlet for nested admin routes
 */
export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#071226] text-white">
      {/* Sidebar (desktop + mobile sheet inside) */}
      <Sidebar open={mobileOpen} onOpenChange={setMobileOpen} />

      {/* Main column */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar onOpenMobile={() => setMobileOpen(true)} />

        {/* Content area */}
        <motion.main
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          className="flex-1 overflow-y-auto bg-gradient-to-b from-[#08162e] to-[#051125] p-6 md:p-8"
        >
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </motion.main>
      </div>
    </div>
  );
}
