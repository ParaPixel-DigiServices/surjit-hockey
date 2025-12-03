import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";

/**
 * DropdownMenu Component
 * ----------------------
 * ✅ Two-level nested dropdown: pages in first level, sections on hover in second level
 * ✅ Scrollable second-level panel with fixed height
 * ✅ Smooth animations and keyboard accessible
 */
export default function DropdownMenu({ label, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSectionsItem, setOpenSectionsItem] = useState(null);
  const location = useLocation();

  // Check if any child is active
  const isAnyChildActive = children.some(
    (child) =>
      location.pathname === child.path ||
      location.pathname.startsWith(child.path + "#")
  );

  const handleMouseLeaveRoot = () => {
    setIsOpen(false);
    setOpenSectionsItem(null);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={handleMouseLeaveRoot}
    >
      {/* Trigger Button */}
      <button
        className={`inline-flex items-center gap-1 relative pb-1 transition-colors duration-300 ${
          isAnyChildActive ? "text-white" : "text-white/80 hover:text-white"
        } after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-white after:transition-[width] after:duration-400 after:ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:after:w-full`}
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

      {/* First Level Dropdown Panel */}
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
              {children.map((item) => {
                const hasSections =
                  Array.isArray(item.sections) && item.sections.length > 0;
                const isActive = location.pathname === item.path;

                return (
                  <div key={item.path} className="relative">
                    {/* First-level item: label navigates, arrow toggles sections */}
                    <div
                      onMouseEnter={() => {
                        if (hasSections && !openSectionsItem) {
                          setOpenSectionsItem(item.path);
                        }
                      }}
                      className={`flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                        isActive
                          ? "bg-white/10 text-white font-semibold"
                          : "text-white/80 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Link to={item.path} className="flex-1 text-left">
                        {item.label}
                      </Link>
                      {hasSections && (
                        <button
                          type="button"
                          className="ml-2 inline-flex items-center justify-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenSectionsItem((prev) =>
                              prev === item.path ? null : item.path
                            );
                          }}
                        >
                          <ChevronRight
                            size={14}
                            className={
                              openSectionsItem === item.path
                                ? "rotate-90 transition-transform"
                                : "transition-transform"
                            }
                          />
                        </button>
                      )}
                    </div>

                    {/* Inline second-level list under the item */}
                    {hasSections && openSectionsItem === item.path && (
                      <div className="relative mt-1 ml-4">
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.18 }}
                          className="space-y-1 max-h-64 overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        >
                          {item.sections.map((section) => {
                            const isSectionActive =
                              location.pathname + location.hash ===
                              section.path;
                            return (
                              <li key={section.path}>
                                <Link
                                  to={section.path}
                                  className={`block px-3 py-1.5 rounded-md text-xs transition-colors ${
                                    isSectionActive
                                      ? "bg-white/10 text-white font-medium"
                                      : "text-white/70 hover:bg-white/5 hover:text-white"
                                  }`}
                                >
                                  {section.label}
                                </Link>
                              </li>
                            );
                          })}
                        </motion.ul>

                        {/* subtle gradient hint at bottom to indicate scrollability */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-linear-to-t from-[#1b2b4a] to-transparent" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
