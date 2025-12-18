import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MobileNav from "./MobileNav";
import DropdownMenu from "./DropdownMenu";
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

  return (
    <>
      {/* COMBINED HEADER - Two Rows in One */}
      <header className="sticky top-0 z-50 bg-[#015296] transition-all duration-300 border-b border-white/10 font-[Sora]">
        <div className="w-full px-6 relative">
          {/* BOTTOM ROW - Main Navigation (Larger) */}
          <div className="flex items-center h-20">
            {/* ---------- LEFT NAV (PRIMARY - 6 items) ---------- */}
            <nav className="hidden xl:flex items-center justify-between flex-1 pr-4 text-[12px] font-semibold uppercase tracking-tight">
              <div className="flex items-center gap-4">
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
              </div>
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
                <path d="M0,-8 L20,30 L80,30 L100,-8 Z" fill="#015296" />
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
                  className="relative z-10 w-[48%] sm:w-[42%] h-auto object-contain -translate-y-[100%]"
                  draggable="false"
                />
              </Link>

              {/* Social Icons Around Hexagon */}
              {/* Left - Facebook */}
              <a
                href="https://www.facebook.com/surjithockey.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-[28%] bottom-[60%] z-20 hover:scale-110 transition-transform"
                aria-label="Facebook"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Center Left - Twitter/X */}
              <a
                href="https://x.com/surjit_hockey"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-[60%] left-[40%] z-20 hover:scale-110 transition-transform"
                aria-label="Twitter"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#000000">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Center Right - Instagram */}
              <a
                href="https://instagram.com/surjit_hockey_tournament"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-[60%] left-[52%] z-20 hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="url(#instagram-gradient)"
                >
                  <defs>
                    <linearGradient
                      id="instagram-gradient"
                      x1="0%"
                      y1="100%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" style={{ stopColor: "#FED373" }} />
                      <stop offset="25%" style={{ stopColor: "#F15245" }} />
                      <stop offset="50%" style={{ stopColor: "#D92E7F" }} />
                      <stop offset="75%" style={{ stopColor: "#9B36B7" }} />
                      <stop offset="100%" style={{ stopColor: "#515ECF" }} />
                    </linearGradient>
                  </defs>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>

              {/* Right - YouTube */}
              <a
                href="https://www.youtube.com/user/WorldKabaddiLeague14"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-[64%] bottom-[60%] z-20 hover:scale-110 transition-transform"
                aria-label="YouTube"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF0000">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>

            {/* ---------- RIGHT NAV (SECONDARY - 7 items) ---------- */}
            <nav className="hidden xl:flex items-center justify-between flex-1 pl-4 text-[12px] font-semibold uppercase tracking-tight">
              <div className="flex items-center gap-4 ml-auto">
                {SECONDARY_NAV.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`inline-block relative px-1.5 py-1 transition-colors duration-300 whitespace-nowrap ${
                      item.highlight
                        ? "text-[#ffd700] animate-pulse font-bold"
                        : location.pathname === item.path
                          ? "text-white"
                          : "text-white/80 hover:text-white"
                    } after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-white after:transition-[width] after:duration-400 after:ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:after:w-full`}
                  >
                    {item.highlight && <span className="mr-1">▶</span>}
                    {item.label}
                    {item.highlight && <span className="ml-1">◀</span>}
                  </Link>
                ))}
              </div>
            </nav>

            {/* ---------- MOBILE MENU ---------- */}
            <button
              onClick={() => setMobileOpen(true)}
              className="xl:hidden p-2 rounded-md border border-white/10 text-white hover:bg-white/10 ml-auto"
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
