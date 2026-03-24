export type InventoryItem = {
  id: number;
  productName: string;
  category: string;
  price: number;
  quantity: number;
  supplierName: string;
  city: string;
};

export type SearchFilters = {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};
