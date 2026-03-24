import inventoryData from "../data/inventory.json" with { type: "json" };
import type { InventoryItem, SearchFilters } from "../types.js";

const inventory = inventoryData as InventoryItem[];

export function getAllInventory(): InventoryItem[] {
  return inventory;
}

export function searchInventory(filters: SearchFilters): InventoryItem[] {
  const normalizedQ = filters.q?.trim().toLowerCase();
  const normalizedCategory = filters.category?.trim().toLowerCase();

  return inventory.filter((item) => {
    if (normalizedQ && !item.productName.toLowerCase().includes(normalizedQ)) {
      return false;
    }

    if (normalizedCategory && item.category.toLowerCase() !== normalizedCategory) {
      return false;
    }

    if (filters.minPrice !== undefined && item.price < filters.minPrice) {
      return false;
    }

    if (filters.maxPrice !== undefined && item.price > filters.maxPrice) {
      return false;
    }

    return true;
  });
}

export function getAvailableCategories(): string[] {
  return Array.from(new Set(inventory.map((item) => item.category))).sort();
}
