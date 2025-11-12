// src/components/layout/MobileNav.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../utils/NavLinks';

/**
 * MobileNav
 * - Fullscreen overlay navigation for < md screens
 * - Receives open/close state from Header
 */
export default function MobileNav({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-200 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      ></div>

      {/* Drawer panel */}
      <nav
        className={`fixed top-0 right-0 h-full w-72 bg-[var(--color-bg)] z-50 border-l border-white/10 transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <ul className="flex flex-col gap-1 px-4 py-6">
          {NAV_LINKS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3 py-3 rounded-md text-sm ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.comingSoon ? (
                    <span className="text-[10px] uppercase tracking-wide bg-white/10 px-2 py-1 rounded">
                      soon
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA in mobile */}
        <div className="px-4 mt-auto">
          <button className="btn btn-primary w-full mb-4">Get a Quote</button>
          <p className="text-xs text-white/40 pb-6">© {new Date().getFullYear()} Your Brand</p>
        </div>
      </nav>
    </>
  );
}
