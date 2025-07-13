import { ARTICLES_API_BASE } from "../config/constants";

export async function fetchWikipediaArticles(page = 1, pageSize = 20) {
  const res = await fetch(
    `${ARTICLES_API_BASE}?page=${page}&pageSize=${pageSize}`
  );
  const data = await res.json();
  return {
    articles: data.articles || [],
    total: data.total || 0,
    page: data.page,
    pageSize: data.pageSize,
  };
}
