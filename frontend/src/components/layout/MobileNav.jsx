// src/components/layout/MobileNav.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { PRIMARY_NAV, SECONDARY_NAV } from "../../utils/navLinks";

/**
 * MobileNav (Enhanced with Nested Menus)
 * ---------------------------------------
 * - Fullscreen overlay navigation for < md screens
 * - Accordion-style nested menus for dropdowns
 * - Smooth animations
 */
export default function MobileNav({ isOpen, onClose }) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleExpanded = (label) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-200 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      ></div>

      {/* Drawer panel */}
      <nav
        className={`fixed top-0 right-0 h-full w-72 bg-[var(--color-bg)] z-50 border-l border-white/10 transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation"
      >
        {/* Header row */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/5">
          <img
            src="/logo.png"
            alt="Surjit Hockey Tournament"
            className="h-10 w-auto"
          />
          <button
            onClick={onClose}
            className="p-2 rounded-md border border-white/10 hover:bg-white/5"
            aria-label="Close menu"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Links with Nested Menus */}
        <ul className="flex flex-col gap-1 px-4 py-6 overflow-y-auto max-h-[calc(100vh-220px)]">
          {/* PRIMARY NAVIGATION */}
          {PRIMARY_NAV.map((item) => {
            // If item has children, render as expandable menu
            if (item.children) {
              const isExpanded = expandedItems.includes(item.label);
              const hasActiveChild = item.children.some(
                (child) => location.pathname === child.path
              );

              return (
                <li key={item.label}>
                  {/* Parent Item - Toggle (Left-aligned) */}
                  <button
                    onClick={() => toggleExpanded(item.label)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-md text-sm text-left ${
                      hasActiveChild
                        ? "bg-white/10 text-white"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="font-semibold">{item.label}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Child Items */}
                  {isExpanded && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => {
                        const isActive = location.pathname === child.path;
                        const childHasSections =
                          child.sections && child.sections.length > 0;
                        const isChildExpanded = expandedItems.includes(
                          `${item.label}-${child.label}`
                        );

                        return (
                          <li key={child.path}>
                            {/* If child has sections, make it expandable */}
                            {childHasSections ? (
                              <div>
                                <button
                                  onClick={() =>
                                    toggleExpanded(
                                      `${item.label}-${child.label}`
                                    )
                                  }
                                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm ${
                                    isActive
                                      ? "bg-white/10 text-white font-medium"
                                      : "text-white/70 hover:text-white hover:bg-white/5"
                                  }`}
                                >
                                  <span>{child.label}</span>
                                  <ChevronDown
                                    size={14}
                                    className={`transition-transform duration-200 ${
                                      isChildExpanded ? "rotate-180" : ""
                                    }`}
                                  />
                                </button>

                                {/* Sections sub-menu */}
                                {isChildExpanded && (
                                  <ul className="ml-4 mt-1 space-y-1 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-[#ffd700] scrollbar-track-transparent">
                                    {child.sections.map((section) => {
                                      const isSectionActive =
                                        location.pathname + location.hash ===
                                        section.path;
                                      return (
                                        <li key={section.path}>
                                          <Link
                                            to={section.path}
                                            onClick={onClose}
                                            className={`block px-3 py-2 rounded-md text-xs ${
                                              isSectionActive
                                                ? "bg-white/10 text-white font-medium"
                                                : "text-white/60 hover:text-white hover:bg-white/5"
                                            }`}
                                          >
                                            {section.label}
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                )}
                              </div>
                            ) : (
                              <Link
                                to={child.path}
                                onClick={onClose}
                                className={`block px-3 py-2 rounded-md text-sm ${
                                  isActive
                                    ? "bg-white/10 text-white font-medium"
                                    : "text-white/70 hover:text-white hover:bg-white/5"
                                }`}
                              >
                                {child.label}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            }

            // Simple link item (left-aligned like dropdown items)
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center justify-start px-3 py-3 rounded-md text-sm font-semibold ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}

          {/* DIVIDER */}
          <li className="my-2">
            <div className="h-px bg-white/10"></div>
          </li>

          {/* SECONDARY NAVIGATION */}
          {SECONDARY_NAV.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center justify-center px-3 py-2.5 rounded-md text-sm ${
                    item.highlight
                      ? "bg-[#ffd700] text-[#1b2b4a] hover:bg-[#ffd700]/90 font-bold"
                      : isActive
                        ? "bg-white/10 text-white font-medium"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.highlight && <span className="mr-1">▶</span>}
                  <span>{item.label}</span>
                  {item.highlight && <span className="ml-1">◀</span>}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-white/5">
          {/* Social Icons */}
          <div className="flex items-center justify-center gap-4 mb-3">
            <a
              href="https://www.facebook.com/surjithockey.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-[#ffd700] transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a
              href="https://x.com/surjit_hockey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-[#ffd700] transition-colors"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-[#ffd700] transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/user/WorldKabaddiLeague14"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-[#ffd700] transition-colors"
              aria-label="YouTube"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
          </div>
          <p className="text-xs text-white/40 text-center">
            © {new Date().getFullYear()} Surjit Hockey Tournament
          </p>
        </div>
      </nav>
    </>
  );
}
