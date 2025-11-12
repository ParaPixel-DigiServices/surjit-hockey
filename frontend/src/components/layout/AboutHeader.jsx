import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/icon.png";

/**
 * AboutHeader.jsx — Auto-scrolling About page navigation (Back & Forth)
 * ----------------------------------------------------------------------
 * ✅ Smoothly scrolls right → left → right endlessly
 * ✅ Reverses at ends
 * ✅ Pauses on hover
 * ✅ Custom golden scrollbar
 * ✅ Fully responsive
 */

export default function AboutHeader() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);

  const sections = [
    { id: "history-of-society", label: "History" },
    { id: "aims-objectives", label: "Aims & Objectives" },
    { id: "about-olympian", label: "Olympian Surjit Singh" },
    { id: "president", label: "President" },
    { id: "working-president", label: "Working President" },
    { id: "honorary-secretary", label: "Hon. Secretary" },
    { id: "secretary-general", label: "Secretary General" },
    { id: "former-presidents", label: "Former Presidents" },
    { id: "former-secretaries", label: "Former Secretaries" },
    { id: "chief-advisor", label: "Chief Advisor" },
    { id: "advisors", label: "Advisors" },
    { id: "patrons", label: "Patrons" },
    { id: "nri-well-wishers", label: "NRI Well Wishers" },
    { id: "lest-we-forget", label: "Lest We Forget" },
  ];

  // Track active section (for gold highlight)
  useEffect(() => {
    const handler = (e) => setActive(e.detail);
    window.addEventListener("aboutActive", handler);
    return () => window.removeEventListener("aboutActive", handler);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
    }
  };

  // 🌀 Auto-scroll back and forth
  useEffect(() => {
    const container = document.getElementById("about-scroll-container");
    if (!container) return;

    let scrollDirection = 1; // 1 = right, -1 = left
    let scrollSpeed = 0.7;
    let isHovered = false;
    let animationFrame;

    const step = () => {
      if (!isHovered) {
        container.scrollLeft += scrollSpeed * scrollDirection;

        const atStart = container.scrollLeft <= 0;
        const atEnd =
          Math.ceil(container.scrollLeft + container.clientWidth) >=
          container.scrollWidth;

        // reverse when reaching either side
        if (atEnd) {
          scrollDirection = -1;
        } else if (atStart) {
          scrollDirection = 1;
        }
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
    <header className="sticky top-0 z-50 w-full bg-[#1b2b4a] text-white font-[Sora] shadow-md">
      {/* --- Top Bar --- */}
      <div className="flex items-center justify-between h-16 px-4 md:px-8 border-b border-white/10">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="Surjit Hockey Logo"
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
          About Surjit Hockey Society
        </h1>

        <div className="w-10" />
      </div>

      {/* --- Scrollable Nav Track --- */}
      <div
        id="about-scroll-container"
        className="relative overflow-x-auto bg-[#1b2b4a] about-scrollbar scroll-smooth"
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

        {/* Gradient fades for luxury look */}
        <div className="absolute left-0 top-0 h-full w-16 pointer-events-none bg-gradient-to-r from-[#1b2b4a] to-transparent" />
        <div className="absolute right-0 top-0 h-full w-16 pointer-events-none bg-gradient-to-l from-[#1b2b4a] to-transparent" />
      </div>

      {/* --- Custom Golden Scrollbar --- */}
      <style>{`
        .about-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .about-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #ffd700, #e6c200);
          border-radius: 9999px;
        }
        .about-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </header>
  );
}
