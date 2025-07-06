import { NEWS_API_BASE } from "../config/constants";

export const fetchNewsByRegion = async (region) => {
  try {
    console.log(
      `[fetchNewsByRegion] Fetching from ${NEWS_API_BASE}/news?region=${region}`
    );
    const res = await fetch(`${NEWS_API_BASE}/news?region=${region}`);

    if (!res.ok) {
      console.error(`[fetchNewsByRegion] HTTP error: ${res.status}`);
      return [];
    }

    const data = await res.json();
    console.log(
      `[fetchNewsByRegion] Received ${data.length} articles for region ${region}`
    );
    return data || [];
  } catch (err) {
    console.error("[fetchNewsByRegion] Fetch failed:", err);
    return [];
  }
};
