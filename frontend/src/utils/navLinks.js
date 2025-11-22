// src/utils/navLinks.js

/**
 * Enhanced Navigation Structure with Dropdown Support
 * ---------------------------------------------------
 * Items with 'children' array will render as dropdown menus
 * Items without children are simple links
 */
export const NAV_LINKS = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    children: [
      { label: "Heritage", path: "/about" },
      { label: "Officials", path: "/officials" },
      { label: "Messages", path: "/messages" },
      { label: "Contact", path: "/contact" },
    ],
  },
  {
    label: "Tournament",
    children: [
      { label: "Overview", path: "/tournament" },
      { label: "Fixtures", path: "/fixtures" },
      { label: "Results & Stats", path: "/results" },
      { label: "Pools & Groups", path: "/pools" },
      { label: "Hall of Honours", path: "/honours" },
    ],
  },
  {
    label: "Teams",
    children: [
      { label: "Participating Teams", path: "/teams" },
      { label: "Players", path: "/players" },
      { label: "Positions", path: "/positions" },
    ],
  },
  {
    label: "Media",
    children: [
      { label: "Gallery", path: "/gallery" },
      { label: "News", path: "/news" },
      { label: "Live Streaming", path: "/streaming" },
    ],
  },
  {
    label: "Contact",
    path: "/contact",
  },
];

// Flatten all links for mobile or simple rendering
export const getAllLinks = () => {
  const links = [];
  NAV_LINKS.forEach((item) => {
    if (item.children) {
      links.push(...item.children);
    } else {
      links.push(item);
    }
  });
  return links;
};
