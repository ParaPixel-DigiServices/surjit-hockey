/**
 * API Configuration
 *
 * Use environment variable VITE_API_URL in production
 * Falls back to localhost for development
 */

const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "");

export const config = {
  // Base API endpoint
  apiUrl: `${API_BASE}/api/v1`,

  // Base URL for uploads (static files)
  uploadsUrl: `${API_BASE}/uploads`,

  // Helper to get upload path for a category
  getUploadUrl: (category, filename) => {
    if (!filename) return null;
    return `${API_BASE}/uploads/${category}/${filename}`;
  },
};

export default config;
