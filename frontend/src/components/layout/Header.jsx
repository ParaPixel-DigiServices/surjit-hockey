import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MobileNav from "./MobileNav";
import logo from "../../assets/icon.png";

/**
 * Header (Final Polished Version)
 * --------------------------------
 * ✅ Seamless hexagon blend
 * ✅ Balanced nav width
 * ✅ Bold Sora font
 * ✅ Responsive & clean
 */
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <>
      <header className="relative z-30 bg-[#1b2b4a] transition-all duration-300 border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between h-20 px-4 sm:px-6 md:px-8 relative font-[Sora]">
          {/* ---------- LEFT NAV ---------- */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] font-bold uppercase tracking-wide">
            {[
              { label: "Home", path: "/" },
              { label: "About", path: "/about" },
              { label: "Tournament", path: "/tournament" },
              { label: "Fixtures", path: "/fixtures" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`inline-block relative pb-1 transition-colors duration-300 ${
                  location.pathname === item.path
                    ? "text-white"
                    : "text-white/80 hover:text-white"
                } after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-[width] after:duration-400 after:ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:after:w-full`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ---------- CENTER HEX LOGO ---------- */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-[99%] w-56 sm:w-64 h-40 sm:h-44 overflow-visible flex items-center justify-center">
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
                className="relative z-10 w-[55%] sm:w-[50%] h-auto object-contain translate-y-[-80%]"
                draggable="false"
              />
            </Link>
          </div>

          {/* ---------- RIGHT NAV ---------- */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] font-bold uppercase tracking-wide">
            {[
              { label: "Results", path: "/results" },
              { label: "Gallery", path: "/gallery" },
              { label: "News", path: "/news" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`inline-block relative pb-1 transition-colors duration-300 ${
                  location.pathname === item.path
                    ? "text-white"
                    : "text-white/80 hover:text-white"
                } after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-[width] after:duration-400 after:ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:after:w-full`}
              >
                {item.label}
              </Link>
            ))}

            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-white text-[#1b2b4a] font-extrabold px-4 py-2 rounded-md hover:bg-white/90 transition"
            >
              Contact
            </Link>
          </div>

          {/* ---------- MOBILE MENU ---------- */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-md border border-white/10 text-white hover:bg-white/10"
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
      </header>

      {/* ---------- MOBILE DRAWER ---------- */}
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
