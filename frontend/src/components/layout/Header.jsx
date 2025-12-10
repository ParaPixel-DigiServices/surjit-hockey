import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import MobileNav from "./MobileNav";
import DropdownMenu from "./DropdownMenu";
import CountdownTimer from "./CountdownTimer";
import { PRIMARY_NAV, SECONDARY_NAV } from "../../utils/navLinks";
import logo from "../../assets/icon.png";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMobileOpen(false), [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  // Filter out E O I from SECONDARY_NAV
  const secondaryNavWithoutEOI = SECONDARY_NAV.filter(
    (item) => !item.highlight
  );
  const eoiItem = SECONDARY_NAV.find((item) => item.highlight);

  return (
    <>
      {/* COMBINED HEADER - Two Rows in One */}
      <header className="sticky top-0 z-50 bg-[#1b2b4a] transition-all duration-300 border-b border-white/10 font-[Sora]">
        <div className="container mx-auto px-1 relative">
          {/* TOP ROW - Empty on Mobile, Social Links & EOI on Desktop */}
          <div className="flex items-center justify-between h-9">
            {/* Social Links - Desktop with Labels, Mobile Icons Only */}
            <div className="hidden lg:flex items-center gap-3 lg:gap-6">
              <a
                href="https://www.facebook.com/surjithockey.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-[10px] xl:text-[11px] font-medium uppercase"
                aria-label="Facebook"
              >
                <Facebook size={14} />
                <span className="hidden lg:inline">Facebook</span>
              </a>
              <a
                href="https://x.com/surjit_hockey"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-[10px] xl:text-[11px] font-medium uppercase"
                aria-label="Twitter"
              >
                <Twitter size={14} />
                <span className="hidden lg:inline">Twitter</span>
              </a>
              <a
                href="https://instagram.com/surjit_hockey_tournament"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-[10px] xl:text-[11px] font-medium uppercase"
                aria-label="Instagram"
              >
                <Instagram size={14} />
                <span className="hidden lg:inline">Instagram</span>
              </a>
              <a
                href="https://www.youtube.com/user/WorldKabaddiLeague14"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-[10px] xl:text-[11px] font-medium uppercase"
                aria-label="YouTube"
              >
                <Youtube size={14} />
                <span className="hidden lg:inline">YouTube</span>
              </a>
            </div>

            {/* EOI Link - Desktop Only */}
            {eoiItem && (
              <Link
                to={eoiItem.path}
                className="hidden lg:flex text-[#ffd700] text-[11px] xl:text-[12px] font-bold uppercase tracking-wide animate-pulse"
              >
                <span className="mr-1">▶</span>
                {eoiItem.label}
                <span className="ml-1">◀</span>
              </Link>
            )}
          </div>

          {/* BOTTOM ROW - Main Navigation (Larger) */}
          <div className="flex items-center h-20">
            {/* ---------- LEFT NAV (PRIMARY - 6 items) ---------- */}
            <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-[11px] xl:text-[12px] font-semibold uppercase tracking-tight flex-1">
              {PRIMARY_NAV.map((item) =>
                item.children ? (
                  <DropdownMenu
                    key={item.label}
                    label={item.label}
                    items={item.children}
                  />
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`inline-block relative px-1.5 py-1 transition-colors duration-300 whitespace-nowrap ${
                      location.pathname === item.path
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                    } after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-white after:transition-[width] after:duration-400 after:ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:after:w-full`}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* ---------- CENTER HEX LOGO ---------- */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-[99%] w-56 sm:w-64 h-40 sm:h-44 overflow-visible flex flex-col items-center justify-center">
              {/* Blended Hex Shape */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 70"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
              >
                <path d="M0,-8 L20,30 L80,30 L100,-8 Z" fill="#1b2b4a" />
              </svg>

              {/* Logo centered at the join */}
              <Link
                to="/"
                className="absolute inset-0 flex items-center justify-center"
                aria-label="Home"
              >
                <img
                  src={logo}
                  alt="Surjit Hockey Logo"
                  className="relative z-10 w-[55%] sm:w-[50%] h-auto object-contain -translate-y-full"
                  draggable="false"
                />
              </Link>

              {/* Timer inside hexagon shape */}
              <div className="absolute top-[16%] left-1/2 -translate-x-1/2 z-20 text-[#ffd700] text-[10px] sm:text-xs font-bold whitespace-nowrap">
                <CountdownTimer />
              </div>
            </div>

            {/* ---------- RIGHT NAV (SECONDARY without EOI - 6 items) ---------- */}
            <nav className="hidden lg:flex items-center justify-end gap-1.5 xl:gap-2 text-[11px] xl:text-[12px] font-semibold uppercase tracking-tight flex-1">
              {secondaryNavWithoutEOI.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`inline-block relative px-1.5 py-1 transition-colors duration-300 whitespace-nowrap ${
                    location.pathname === item.path
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  } after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-white after:transition-[width] after:duration-400 after:ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:after:w-full`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* ---------- MOBILE MENU ---------- */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-md border border-white/10 text-white hover:bg-white/10 ml-auto"
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ---------- MOBILE DRAWER ---------- */}
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
