import config from "../config/api";

const API_BASE_URL = config.apiUrl;

export const api = {
  // Tournaments
  getTournaments: async (skip = 0, limit = 100) => {
    const response = await fetch(
      `${API_BASE_URL}/tournaments?skip=${skip}&limit=${limit}`
    );
    if (!response.ok) throw new Error("Failed to fetch tournaments");
    return response.json();
  },

  getTournamentById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tournaments/${id}`);
    if (!response.ok) throw new Error("Failed to fetch tournament details");
    return response.json();
  },

  getTournamentFixtures: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tournaments/${id}/fixtures`);
    if (!response.ok) throw new Error("Failed to fetch fixtures");
    return response.json();
  },

  getTournamentResults: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tournaments/${id}/results`);
    if (!response.ok) throw new Error("Failed to fetch results");
    return response.json();
  },

  // Teams
  getTeams: async (skip = 0, limit = 100) => {
    const response = await fetch(
      `${API_BASE_URL}/teams?skip=${skip}&limit=${limit}`
    );
    if (!response.ok) throw new Error("Failed to fetch teams");
    return response.json();
  },

  getTeamById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/teams/${id}`);
    if (!response.ok) throw new Error("Failed to fetch team details");
    return response.json();
  },

  // Content
  getGallery: async (skip = 0, limit = 50) => {
    const response = await fetch(
      `${API_BASE_URL}/content/gallery?skip=${skip}&limit=${limit}`
    );
    if (!response.ok) throw new Error("Failed to fetch gallery");
    return response.json();
  },

  getMemories: async (skip = 0, limit = 50) => {
    const response = await fetch(
      `${API_BASE_URL}/content/memories?skip=${skip}&limit=${limit}`
    );
    if (!response.ok) throw new Error("Failed to fetch memories");
    return response.json();
  },

  // News
  getNews: async (skip = 0, limit = 100) => {
    const response = await fetch(
      `${API_BASE_URL}/news?skip=${skip}&limit=${limit}`
    );
    if (!response.ok) throw new Error("Failed to fetch news");
    return response.json();
  },

  getNewsById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/news/${id}`);
    if (!response.ok) throw new Error("Failed to fetch news details");
    return response.json();
  },

  createNews: async (formData) => {
    const response = await fetch(`${API_BASE_URL}/news`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to create news");
    return response.json();
  },

  updateNews: async (id, formData) => {
    const response = await fetch(`${API_BASE_URL}/news/${id}`, {
      method: "PUT",
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to update news");
    return response.json();
  },

  deleteNews: async (id) => {
    const response = await fetch(`${API_BASE_URL}/news/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete news");
    return true;
  },

  // Officials
  getOfficials: async (skip = 0, limit = 100) => {
    const response = await fetch(
      `${API_BASE_URL}/officials?skip=${skip}&limit=${limit}`
    );
    if (!response.ok) throw new Error("Failed to fetch officials");
    return response.json();
  },

  getOfficialById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/officials/${id}`);
    if (!response.ok) throw new Error("Failed to fetch official details");
    return response.json();
  },

  // Sponsors
  getSponsors: async (skip = 0, limit = 100) => {
    const response = await fetch(
      `${API_BASE_URL}/sponsors?skip=${skip}&limit=${limit}`
    );
    if (!response.ok) throw new Error("Failed to fetch sponsors");
    return response.json();
  },

  getSponsorById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/sponsors/${id}`);
    if (!response.ok) throw new Error("Failed to fetch sponsor details");
    return response.json();
  },

  createSponsor: async (formData) => {
    const response = await fetch(`${API_BASE_URL}/sponsors`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to create sponsor");
    return response.json();
  },

  updateSponsor: async (id, formData) => {
    const response = await fetch(`${API_BASE_URL}/sponsors/${id}`, {
      method: "PUT",
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to update sponsor");
    return response.json();
  },

  deleteSponsor: async (id) => {
    const response = await fetch(`${API_BASE_URL}/sponsors/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete sponsor");
    return true;
  },

  // Banners
  getBanners: async () => {
    const response = await fetch(`${API_BASE_URL}/banners/active`);
    if (!response.ok) throw new Error("Failed to fetch banners");
    return response.json();
  },

  addBanner: async (formData) => {
    const response = await fetch(`${API_BASE_URL}/banners`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to add banner");
    return response.json();
  },

  deleteBanner: async (id) => {
    const response = await fetch(`${API_BASE_URL}/banners/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete banner");
    return response.json();
  },

  // Standings/Points Table
  getStandings: async (yearId, poolId = null, poolCategoryType = null) => {
    let url = `${API_BASE_URL}/standings/${yearId}`;
    const params = new URLSearchParams();
    if (poolId !== null) params.append("pool_id", poolId);
    if (poolCategoryType !== null)
      params.append("pool_category_type", poolCategoryType);
    if (params.toString()) url += `?${params.toString()}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch standings");
    return response.json();
  },

  // Team Players
  getTeamPlayers: async (teamId) => {
    const response = await fetch(`${API_BASE_URL}/teams/${teamId}/players`);
    if (!response.ok) throw new Error("Failed to fetch team players");
    return response.json();
  },

  // Additional Endpoints
  getPools: async () => {
    const response = await fetch(`${API_BASE_URL}/additional/pools`);
    if (!response.ok) throw new Error("Failed to fetch pools");
    return response.json();
  },

  getPoolTeams: async (yearId) => {
    const response = await fetch(
      `${API_BASE_URL}/additional/pools/${yearId}/teams`
    );
    if (!response.ok) throw new Error("Failed to fetch pool teams");
    return response.json();
  },

  getYears: async () => {
    const response = await fetch(`${API_BASE_URL}/additional/years`);
    if (!response.ok) throw new Error("Failed to fetch years");
    return response.json();
  },

  getHonours: async () => {
    const response = await fetch(`${API_BASE_URL}/additional/honours`);
    if (!response.ok) throw new Error("Failed to fetch honours");
    return response.json();
  },

  getPositions: async () => {
    const response = await fetch(`${API_BASE_URL}/additional/positions`);
    if (!response.ok) throw new Error("Failed to fetch positions");
    return response.json();
  },

  getStreaming: async () => {
    const response = await fetch(`${API_BASE_URL}/additional/streaming`);
    if (!response.ok) throw new Error("Failed to fetch streaming data");
    return response.json();
  },

  getTimer: async () => {
    const response = await fetch(`${API_BASE_URL}/additional/timer`);
    if (!response.ok) throw new Error("Failed to fetch timer");
    return response.json();
  },

  updateTimer: async (data) => {
    const response = await fetch(`${API_BASE_URL}/additional/timer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update timer");
    return response.json();
  },

  getImageOfDay: async () => {
    const response = await fetch(`${API_BASE_URL}/additional/image-of-day`);
    if (!response.ok) throw new Error("Failed to fetch image of day");
    return response.json();
  },
};
