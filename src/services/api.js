import { API_BASE, NEWS_API_BASE } from "../config/constants";

export const fetchRegions = async () => {
  try {
    const res = await fetch(`${API_BASE}/regions`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch regions:", error);
    return ["US", "IN", "DE"]; // fallback as array
  }
};

export const fetchCategories = async (region) => {
  const res = await fetch(`${API_BASE}/categories?region=${region}`);
  return res.json();
};

export const fetchTopVideos = async (region, category, maxResults) => {
  const res = await fetch(
    `${API_BASE}/videos?region=${region}&category=${category}&maxResults=${maxResults}`
  );
  return res.json();
};

export const searchVideos = async (query, region) => {
  const res = await fetch(`${API_BASE}/search?query=${query}&region=${region}`);
  return res.json();
};