// src/utils/navLinks.js

/**
 * PRIMARY NAVIGATION - Main top-level menu (matches original upper header)
 * -------------------------------------------------------------------------
 */
export const PRIMARY_NAV = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "The Society",
    children: [
      { label: "History Of Society", path: "/about#history-of-society" },
      { label: "Aims & Objectives Of Society", path: "/about#aims-objectives" },
      { label: "About Olympian Surjit Singh", path: "/about#about-olympian" },
      { label: "President Of Society", path: "/about#president" },
      { label: "Working President Of Society", path: "/about#working-president" },
      { label: "President's Message", path: "/about#president" },
      { label: "Honorary Organizing Secretary", path: "/about#honorary-secretary" },
      { label: "Secretary General Of Society", path: "/about#secretary-general" },
      { label: "Our Former Presidents", path: "/about#former-presidents" },
      { label: "Our Former Secretaries", path: "/about#former-secretaries" },
      { label: "Chief Advisor Of The Society", path: "/about#chief-advisor" },
      { label: "Advisors Of The Society", path: "/about#advisors" },
      { label: "Our Patrons", path: "/about#patrons" },
      { label: "Our NRI Well Wishers", path: "/about#nri-well-wishers" },
      { label: "Lest We Forget", path: "/about#lest-we-forget" },
    ],
  },
  {
    label: "Tournament",
    children: [
      { label: "HOCKEY INDIA Officials", path: "/tournament#hockey-india-officials" },
      { label: "Online Participation Request", path: "/tournament#online-registration" },
      { label: "Participating Teams", path: "/tournament#participating-teams" },
      { label: "Hockey India Postings", path: "/tournament#hockey-india-postings" },
      { label: "Qualifying Round Teams - Men", path: "/tournament#qualifying-round-teams" },
      { label: "Points Earned by Each Teams", path: "/tournament#points-earned-men" },
      { label: "Teams", path: "/teams" },
      { label: "Pool", path: "/pools" },
      { label: "Fixtures", path: "/tournament#fixtures-men" },
      { label: "Roll Of Honour", path: "/tournament#roll-of-honour" },
      { label: "Foreign Teams Participation", path: "/tournament#foreign-teams" },
      { label: "Players / Official Honours", path: "/tournament#players-official-honours" },
      { label: "Matches Conducted", path: "/tournament#matches-conducted" },
    ],
  },
  {
    label: "Results",
    path: "/results",
  },
  {
    label: "Our Dedicated Team",
    children: [
      { label: "7 Member Core Committee", path: "/about#core-committee" },
      { label: "Dedicated Team of Tournament", path: "/about#dedicated-team" },
      { label: "Surjit Hockey Officials", path: "/officials" },
    ],
  },
  {
    label: "News",
    path: "/news",
  },
];

/**
 * SECONDARY NAVIGATION - Bottom category bar (matches original lower header)
 * ---------------------------------------------------------------------------
 */
export const SECONDARY_NAV = [
  { label: "E O I", path: "/streaming", highlight: true }, // Expression of Interest / Live Streaming
  { label: "Statistics", path: "/results#statistics" },
  { label: "Fixtures", path: "/fixtures" },
  { label: "Messages", path: "/messages" },
  { label: "Gallery", path: "/gallery" },
  { label: "Our Sponsors", path: "/sponsors" },
  { label: "Contact Us", path: "/contact" },
];

/**
 * LEGACY NAV_LINKS for backward compatibility
 */
export const NAV_LINKS = PRIMARY_NAV;

// Flatten all links for mobile or simple rendering
export const getAllLinks = () => {
  const links = [];
  PRIMARY_NAV.forEach((item) => {
    if (item.children) {
      links.push(...item.children);
    } else {
      links.push(item);
    }
  });
  SECONDARY_NAV.forEach((item) => {
    links.push(item);
  });
  return links;
};
