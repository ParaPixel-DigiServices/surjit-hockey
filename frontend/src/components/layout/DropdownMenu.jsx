import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

/**
 * DropdownMenu Component
 * ----------------------
 * ✅ Hover-activated dropdown with smooth animations
 * ✅ Keyboard accessible
 * ✅ Matches existing header styling
 * ✅ Auto-closes on navigation
 */
export default function DropdownMenu({ label, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Check if any child is active
  const isAnyChildActive = children.some(
    (child) => location.pathname === child.path
  );

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger Button */}
      <button
        className={`inline-flex items-center gap-1 relative pb-1 transition-colors duration-300 ${
          isAnyChildActive ? "text-white" : "text-white/80 hover:text-white"
        } after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-[width] after:duration-400 after:ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:after:w-full`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-56 bg-[#1b2b4a] border border-white/10 rounded-md shadow-2xl overflow-hidden z-50"
          >
            <div className="py-2">
              {children.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-2.5 text-sm transition-colors ${
                    location.pathname === item.path
                      ? "bg-white/10 text-white font-semibold"
                      : "text-white/80 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
