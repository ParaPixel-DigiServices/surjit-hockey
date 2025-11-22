// src/components/layout/MobileNav.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { NAV_LINKS } from "../../utils/navLinks";

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
          <span className="font-semibold text-lg">Menu</span>
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
        <ul className="flex flex-col gap-1 px-4 py-6 overflow-y-auto max-h-[calc(100vh-180px)]">
          {NAV_LINKS.map((item) => {
            // If item has children, render as expandable menu
            if (item.children) {
              const isExpanded = expandedItems.includes(item.label);
              const hasActiveChild = item.children.some(
                (child) => location.pathname === child.path
              );

              return (
                <li key={item.label}>
                  {/* Parent Item - Toggle */}
                  <button
                    onClick={() => toggleExpanded(item.label)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-md text-sm ${
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
                        return (
                          <li key={child.path}>
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
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            }

            // Simple link item
            const isActive = location.pathname === item.path;
            const isContact = item.label === "Contact";

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center justify-center px-3 py-3 rounded-md text-sm font-semibold ${
                    isContact
                      ? "bg-[#ffd700] text-[#1b2b4a] hover:bg-[#ffd700]/90"
                      : isActive
                        ? "bg-white/10 text-white"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-white/5">
          <p className="text-xs text-white/40 text-center">
            © {new Date().getFullYear()} Surjit Hockey Tournament
          </p>
        </div>
      </nav>
    </>
  );
}
