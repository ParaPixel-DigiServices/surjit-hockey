import React from "react";
import Header from "./Header";
import Footer from "../sections/Footer";
import HomeTopBar from "../layout/HomeTopBar"; // 👈 Import the sponsors/timer bar

/**
 * MainLayout.jsx
 * ----------------------------
 * - Wraps every page with Header and Footer
 * - Adds Top Info Bar above Header (Sponsors + Timer)
 * - Ensures consistent layout spacing
 */
export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1b2b4a] font-[Sora] overflow-x-hidden">
      {/* 🔸 Top Info Bar — Sponsors, Socials, Timer */}
      <div className="relative z-50">
        <HomeTopBar />
      </div>

      {/* ✳️ Golden Divider for Luxury Look */}
      <div className="h-[1px] bg-gradient-to-r from-[#ffd700]/20 via-[#ffd700]/60 to-[#ffd700]/20"></div>

      {/* 🔷 Header (Hexagon Nav) */}
      <div className="relative z-40">
        <Header />
      </div>

      {/* 🔹 Main Page Content */}
      <main className="flex-1 pt-[var(--nav-height)]">{children}</main>

      {/* ⚫ Footer */}
      <Footer />
    </div>
  );
}
