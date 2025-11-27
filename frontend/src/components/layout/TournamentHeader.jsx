import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/icon.png";
import SecureImage from "../ui/SecureImage";

/**
 * TournamentHeader.jsx — Auto-scrolling Navbar (Back & Forth)
 * ------------------------------------------------------------
 * ✅ Scrolls left ↔ right continuously
 * ✅ Pauses on hover
 * ✅ Custom golden scrollbar
 * ✅ Matches About page style
 */

export default function TournamentHeader() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);

  const sections = [
    { id: "hockey-india-officials", label: "Hockey India Officials" },
    { id: "online-participation", label: "Online Participation Request" },
    { id: "participating-teams", label: "Participating Teams" },
    { id: "hockey-india-postings", label: "Hockey India Postings" },
    { id: "qualifying-round-men", label: "Qualifying Round Teams - Men" },
    { id: "points-earned", label: "Points Earned by Each Teams" },
    { id: "fixtures", label: "Fixtures" },
    { id: "roll-of-honour", label: "Roll of Honour" },
    { id: "foreign-teams", label: "Foreign Teams Participation" },
    { id: "players-honours", label: "Players / Official Honours" },
    { id: "matches-conducted", label: "Matches Conducted" },
  ];

  // highlight active section
  useEffect(() => {
    const handler = (e) => setActive(e.detail);
    window.addEventListener("tournamentActive", handler);
    return () => window.removeEventListener("tournamentActive", handler);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  };

  // Auto-scroll back and forth
  useEffect(() => {
    const container = document.getElementById("tournament-scroll-container");
    if (!container) return;

    let scrollDirection = 1;
    let scrollSpeed = 0.6;
    let isHovered = false;
    let animationFrame;

    const step = () => {
      if (!isHovered) {
        container.scrollLeft += scrollSpeed * scrollDirection;

        const atStart = container.scrollLeft <= 0;
        const atEnd =
          Math.ceil(container.scrollLeft + container.clientWidth) >=
          container.scrollWidth;

        if (atEnd) scrollDirection = -1;
        else if (atStart) scrollDirection = 1;
      }
      animationFrame = requestAnimationFrame(step);
    };

    const startScroll = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(step);
    };

    container.addEventListener("mouseenter", () => (isHovered = true));
    container.addEventListener("mouseleave", () => {
      isHovered = false;
      startScroll();
    });

    startScroll();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0d1630] text-white font-[Sora] shadow-md">
      {/* Top Bar */}
      <div className="flex items-center justify-between h-16 px-4 md:px-8 border-b border-white/10">
        <div className="flex items-center gap-4">
          <SecureImage
            src={logo}
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
          <button
            onClick={() => navigate("/")}
            className="text-sm uppercase font-semibold text-white/90 hover:text-[#ffd700] transition"
          >
            ← Back to Home
          </button>
        </div>

        <h1 className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-wide text-center">
          Tournament Details
        </h1>

        <div className="w-10" />
      </div>

      {/* Scrolling Nav */}
      <div
        id="tournament-scroll-container"
        className="relative overflow-x-auto bg-[#0d1630] tournament-scrollbar scroll-smooth"
      >
        <div className="flex w-max gap-6 px-6 py-3">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => scrollToSection(e, s.id)}
              className={`inline-block pb-1 px-4 sm:px-6 whitespace-nowrap text-sm font-semibold uppercase tracking-wide transition-colors duration-300 ${
                active === s.id
                  ? "text-[#ffd700]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Left/Right Fades */}
        <div className="absolute left-0 top-0 h-full w-16 pointer-events-none bg-gradient-to-r from-[#0d1630] to-transparent" />
        <div className="absolute right-0 top-0 h-full w-16 pointer-events-none bg-gradient-to-l from-[#0d1630] to-transparent" />
      </div>

      {/* Golden Scrollbar */}
      <style>{`
        .tournament-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .tournament-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #ffd700, #e6c200);
          border-radius: 9999px;
        }
        .tournament-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </header>
  );
}
