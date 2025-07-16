import { JOKES_API_BASE } from "../config/constants";

export async function fetchJokes(page = 1, pageSize = 20) {
  const res = await fetch(`${JOKES_API_BASE}?page=${page}&pageSize=${pageSize}`);
  const data = await res.json();
  return {
    jokes: data.jokes || [],
    total: data.total || 0,
    page: data.page,
    pageSize: data.pageSize,
  };
}
