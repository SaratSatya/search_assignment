import type { SearchResponse } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";

export async function fetchCategories(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/meta/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = (await response.json()) as { categories: string[] };
  return data.categories;
}

export async function searchInventory(params: Record<string, string>): Promise<SearchResponse> {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value.trim()) {
      query.set(key, value.trim());
    }
  });

  const response = await fetch(`${API_BASE_URL}/search?${query.toString()}`);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message ?? "Search request failed");
  }

  return (await response.json()) as SearchResponse;
}
