import React from "react";
import Header from "./Header";
import Footer from "../sections/Footer";

/**
 * MainLayout.jsx
 * ----------------------------
 * - Wraps every page with Header and Footer
 * - Ensures consistent layout spacing
 */
export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1b2b4a] font-[Sora] overflow-x-hidden">
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
