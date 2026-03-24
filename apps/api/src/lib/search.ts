import inventoryData from "../data/inventory.json" with { type: "json" };
import type { InventoryItem, SearchFilters } from "../types";

const inventory = inventoryData as InventoryItem[];

export function getAllInventory(): InventoryItem[] {
  return inventory;
}

export function searchInventory(filters: SearchFilters): InventoryItem[] {
  // TODO: finish exact assignment behavior.
  // Current implementation intentionally returns all results so an agent can complete it.
  // Required behavior:
  // - q: case-insensitive partial match on productName
  // - category exact match (case-insensitive is acceptable and user-friendly)
  // - minPrice / maxPrice filtering
  // - all filters combinable
  // - no filters => all results
  void filters;
  return inventory;
}

export function getAvailableCategories(): string[] {
  return Array.from(new Set(inventory.map((item) => item.category))).sort();
}
