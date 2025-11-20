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
};
