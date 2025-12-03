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
      {
        label: "Heritage",
        path: "/about",
        sections: [
          { label: "History of the Society", path: "/about#history-of-society" },
          { label: "Aims & Objectives", path: "/about#aims-objectives" },
          { label: "Olympian Surjit Singh", path: "/about#about-olympian" },
          { label: "President", path: "/about#president" },
          { label: "Working President", path: "/about#working-president" },
          { label: "Honorary Secretary", path: "/about#honorary-secretary" },
          { label: "Secretary General", path: "/about#secretary-general" },
          { label: "Former Presidents", path: "/about#former-presidents" },
          { label: "Former Secretaries", path: "/about#former-secretaries" },
          { label: "Chief Advisor", path: "/about#chief-advisor" },
          { label: "Advisors", path: "/about#advisors" },
          { label: "Patrons", path: "/about#patrons" },
          { label: "NRI Well Wishers", path: "/about#nri-well-wishers" },
          { label: "Lest We Forget", path: "/about#lest-we-forget" },
        ],
      },
      { label: "Officials", path: "/officials" },
      { label: "Messages", path: "/messages" },
      { label: "Contact", path: "/contact" },
    ],
  },
  {
    label: "Tournament",
    children: [
      {
        label: "Overview",
        path: "/tournament",
        sections: [
          {
            label: "Hockey India Officials",
            path: "/tournament#hockey-india-officials",
          },
          {
            label: "Participation Request",
            path: "/tournament#online-registration",
          },
          { label: "Participating Teams", path: "/tournament#participating-teams" },
          {
            label: "Hockey India Postings",
            path: "/tournament#hockey-india-postings",
          },
          {
            label: "Qualifying Round Teams",
            path: "/tournament#qualifying-round-teams",
          },
          { label: "Points Earned (Men)", path: "/tournament#points-earned-men" },
          { label: "Fixtures (Men)", path: "/tournament#fixtures-men" },
          { label: "Roll of Honour", path: "/tournament#roll-of-honour" },
          { label: "Foreign Teams", path: "/tournament#foreign-teams" },
          {
            label: "Players & Officials Honours",
            path: "/tournament#players-official-honours",
          },
          { label: "Matches Conducted", path: "/tournament#matches-conducted" },
        ],
      },
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
      { label: "Sponsors", path: "/sponsors" },
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
