export type Section = 'fresh' | 'frozen' | 'dry';

export interface KnownItem {
  name: string;
  lastBought: string | null;
  typicalQty: number;
  subcategory?: string;
  isDefault?: boolean; // Runtime flag: true for default items, false for custom
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  addedDate: string;
  expiryDate?: string;
}

export interface PurchaseItem {
  name: string;
  section: Section;
  qty: number;
}

export interface PurchaseHistoryEntry {
  id: string;
  date: string; // YYYY-MM-DD
  items: PurchaseItem[];
}

export interface AppState {
  customKnownItems: Record<Section, KnownItem[]>; // User-added items only
  inventory: Record<Section, InventoryItem[]>;
  shoppingChecked: Record<string, boolean | number>;
  purchaseHistory: PurchaseHistoryEntry[];
  historyViewMonth: string | null;
}

export interface ShoppingListItem {
  name: string;
  section: Section;
  currentQty: number;
  suggestedQty: number;
  lastBought: string | null;
}

export interface RecipeIngredient {
  name: string;      // Matches inventory item names
  required: boolean; // true = must have, false = optional
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: RecipeIngredient[];
}

export type MatchStatus = 'full' | 'partial' | 'none';

export interface RecipeMatch {
  recipe: Recipe;
  status: MatchStatus;
  availableIngredients: string[];
  missingRequired: string[];
  missingOptional: string[];
}
