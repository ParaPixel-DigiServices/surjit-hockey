const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const api = {
  // Tournaments
  getTournaments: async (skip = 0, limit = 100) => {
    const response = await fetch(`${API_BASE_URL}/tournaments?skip=${skip}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch tournaments');
    return response.json();
  },

  getTournamentById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tournaments/${id}`);
    if (!response.ok) throw new Error('Failed to fetch tournament details');
    return response.json();
  },

  getTournamentFixtures: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tournaments/${id}/fixtures`);
    if (!response.ok) throw new Error('Failed to fetch fixtures');
    return response.json();
  },

  getTournamentResults: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tournaments/${id}/results`);
    if (!response.ok) throw new Error('Failed to fetch results');
    return response.json();
  },

  // Teams
  getTeams: async (skip = 0, limit = 100) => {
    const response = await fetch(`${API_BASE_URL}/teams?skip=${skip}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch teams');
    return response.json();
  },

  getTeamById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/teams/${id}`);
    if (!response.ok) throw new Error('Failed to fetch team details');
    return response.json();
  },

  // Content
  getGallery: async (skip = 0, limit = 50) => {
    const response = await fetch(`${API_BASE_URL}/content/gallery?skip=${skip}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch gallery');
    return response.json();
  },

  getMemories: async (skip = 0, limit = 50) => {
    const response = await fetch(`${API_BASE_URL}/content/memories?skip=${skip}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch memories');
    return response.json();
  },

  // News
  getNews: async (skip = 0, limit = 100) => {
    const response = await fetch(`${API_BASE_URL}/news?skip=${skip}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch news');
    return response.json();
  },

  getNewsById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/news/${id}`);
    if (!response.ok) throw new Error('Failed to fetch news details');
    return response.json();
  },

  // Officials
  getOfficials: async (skip = 0, limit = 100) => {
    const response = await fetch(`${API_BASE_URL}/officials?skip=${skip}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch officials');
    return response.json();
  },

  getOfficialById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/officials/${id}`);
    if (!response.ok) throw new Error('Failed to fetch official details');
    return response.json();
  },

  // Sponsors
  getSponsors: async (skip = 0, limit = 100) => {
    const response = await fetch(`${API_BASE_URL}/sponsors?skip=${skip}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch sponsors');
    return response.json();
  },

  getSponsorById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/sponsors/${id}`);
    if (!response.ok) throw new Error('Failed to fetch sponsor details');
    return response.json();
  },

  // Banners
  getBanners: async () => {
    const response = await fetch(`${API_BASE_URL}/banners/active`);
    if (!response.ok) throw new Error('Failed to fetch banners');
    return response.json();
  },

  // Standings/Points Table
  getStandings: async (yearId, poolId = null, poolCategoryType = null) => {
    let url = `${API_BASE_URL}/standings/${yearId}`;
    const params = new URLSearchParams();
    if (poolId !== null) params.append('pool_id', poolId);
    if (poolCategoryType !== null) params.append('pool_category_type', poolCategoryType);
    if (params.toString()) url += `?${params.toString()}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch standings');
    return response.json();
  },

  // Team Players
  getTeamPlayers: async (teamId) => {
    const response = await fetch(`${API_BASE_URL}/teams/${teamId}/players`);
    if (!response.ok) throw new Error('Failed to fetch team players');
    return response.json();
  },
};
