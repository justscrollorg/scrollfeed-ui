import { NEWS_API_BASE } from "../config/constants";

export const fetchNewsByRegion = async (region, page = 1, limit = 33) => {
  try {
    const url = `${NEWS_API_BASE}/news?region=${region}&page=${page}&limit=${limit}`;
    console.log(`[fetchNewsByRegion] Fetching from ${url}`);
    
    const res = await fetch(url);

    if (!res.ok) {
      console.error(`[fetchNewsByRegion] HTTP error: ${res.status}`);
      return { articles: [], metadata: {} };
    }

    const data = await res.json();
    
    // Handle both old format (array) and new format (object with articles and metadata)
    if (Array.isArray(data)) {
      console.log(`[fetchNewsByRegion] Received ${data.length} articles for region ${region} (legacy format)`);
      return { articles: data, metadata: {} };
    } else if (data.articles) {
      console.log(`[fetchNewsByRegion] Received ${data.articles.length} articles for region ${region} (paginated format)`);
      return data;
    } else {
      console.warn(`[fetchNewsByRegion] Unexpected response format:`, data);
      return { articles: [], metadata: {} };
    }
  } catch (err) {
    console.error("[fetchNewsByRegion] Fetch failed:", err);
    return { articles: [], metadata: {} };
  }
};
