export type Section = 'fresh' | 'frozen' | 'dry';

export type ThemeName = 'bright-playful' | 'modern-bold' | 'warm-energetic' | 'cool-fresh';

export type ItemUsage = 'meal' | 'ingredient';

export type NutritionTag = 'high-protein' | 'high-fiber';

export type Priority = 'low' | 'medium' | 'high';

export type Store = 'indian-store' | 'costco' | 'grocery';

export type IngredientCategory = 'produce' | 'dairy' | 'protein' | 'condiments' | 'grains' | 'legumes';
export type MealCategory = 'curries' | 'soups' | 'noodles' | 'snacks' | 'ready-meals';

export interface KnownItem {
  name: string;
  lastBought: string | null;
  typicalQty: number;
  usages: ItemUsage[];
  ingredientCategory?: IngredientCategory;
  mealCategory?: MealCategory;
  isDefault?: boolean; // Runtime flag: true for default items, false for custom
  defaultExpiryDays?: number; // Days until expiry from purchase
  nutritionTags?: NutritionTag[];
  priority?: Priority; // default: 'medium'
  stores?: Store[]; // default: ['grocery']
  prepTimeMinutes?: number; // Minutes to prepare (for meal items)
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

export interface ShoppingListEntry {
  name: string;
  section: Section;
  store: Store;
}

export interface AppState {
  customKnownItems: Record<Section, KnownItem[]>; // User-added items only
  inventory: Record<Section, InventoryItem[]>;
  shoppingChecked: Record<string, boolean | number>;
  purchaseHistory: PurchaseHistoryEntry[];
  shoppingList: ShoppingListEntry[]; // User-added shopping items
  theme: ThemeName;
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
  prepTimeMinutes: number;
  ingredients: RecipeIngredient[];
  nutritionTags?: NutritionTag[];
}

export type MatchStatus = 'full' | 'partial' | 'none';

export interface RecipeMatch {
  recipe: Recipe;
  status: MatchStatus;
  availableIngredients: string[];
  missingRequired: string[];
  missingOptional: string[];
}

// Food Ordering Types
export type MealTime = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
export type Cuisine = 'Indian' | 'Chinese' | 'American' | 'Mexican' | 'Italian' | 'Thai' | 'Middle Eastern' | 'Greek';
export type DishType = 'Appetizer' | 'Main' | 'Dessert' | 'Drink' | 'Side';

export interface DishTags {
  mealTime?: MealTime[];  // Multiple allowed (e.g., Lunch AND Dinner)
  cuisine?: Cuisine;
  dishType?: DishType;
}

export interface Macros {
  calories?: number;   // kcal
  protein?: number;    // grams
  carbs?: number;      // grams
  fat?: number;        // grams
}

export interface Dish {
  name: string;
  cost: number;           // Unit price
  quantity: number;       // How many ordered
  customizations?: string[]; // e.g., ["Cream Sauce", "Add Chicken"]
  tags: DishTags;
  macros?: Macros;        // Optional macro info
}

export interface OrderFees {
  deliveryFee?: number;      // Final amount charged
  serviceFee?: number;       // Final amount charged (after any discounts)
  salesTax?: number;
  driverTip?: number;
  driverBenefitsFee?: number; // Final amount charged
  discount?: number;         // Positive number, subtracted from total
}

export interface Order {
  id: string;
  restaurant: string;        // Restaurant name
  dishes: Dish[];            // Dishes in this order/meal
  fees?: OrderFees;          // Optional order-level fees
}
