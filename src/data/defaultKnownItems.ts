import type { Section, ItemUsage, NutritionTag, Priority, Store } from '../types';

export type IngredientCategory = 'produce' | 'dairy' | 'protein' | 'condiments' | 'grains' | 'legumes';
export type MealCategory = 'curries' | 'soups' | 'noodles' | 'snacks' | 'ready-meals';

export interface DefaultKnownItem {
  name: string;
  typicalQty: number;
  usages: ItemUsage[];
  ingredientCategory?: IngredientCategory;
  mealCategory?: MealCategory;
  defaultExpiryDays?: number; // Days until expiry from purchase
  nutritionTags?: NutritionTag[];
  priority?: Priority; // default: 'medium'
  stores?: Store[]; // default: ['grocery']
  prepTimeMinutes?: number; // Minutes to prepare (for meal items)
}

export const defaultKnownItems: Record<Section, DefaultKnownItem[]> = {
  fresh: [
    // Ready to eat (meals only) - prepared foods, ~5 days, 3-5 min reheat
    { name: 'Paneer Curry', typicalQty: 2, usages: ['meal'], mealCategory: 'curries', defaultExpiryDays: 5, stores: ['indian-store'], priority: 'high', prepTimeMinutes: 3 },
    { name: 'Dal Makhani', typicalQty: 2, usages: ['meal'], mealCategory: 'curries', defaultExpiryDays: 5, stores: ['indian-store'], priority: 'high', prepTimeMinutes: 3 },
    { name: 'Palak Paneer', typicalQty: 2, usages: ['meal'], mealCategory: 'curries', defaultExpiryDays: 5, nutritionTags: ['high-fiber'], stores: ['indian-store'], priority: 'high', prepTimeMinutes: 3 },
    { name: 'Chole', typicalQty: 2, usages: ['meal'], mealCategory: 'curries', defaultExpiryDays: 5, nutritionTags: ['high-fiber'], stores: ['indian-store'], priority: 'medium', prepTimeMinutes: 3 },
    { name: 'Aloo Gobi', typicalQty: 2, usages: ['meal'], mealCategory: 'curries', defaultExpiryDays: 5, stores: ['indian-store'], priority: 'medium', prepTimeMinutes: 3 },
    { name: 'Chapatis', typicalQty: 1, usages: ['meal', 'ingredient'], defaultExpiryDays: 5, stores: ['indian-store'], priority: 'high', prepTimeMinutes: 3 },
    { name: 'Falafel', typicalQty: 1, usages: ['meal', 'ingredient'], defaultExpiryDays: 5, stores: ['grocery'], priority: 'medium', prepTimeMinutes: 5 },
    // Ingredients only - produce ~7 days, herbs ~5 days
    { name: 'Onion', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 14, stores: ['grocery', 'costco'], priority: 'high' },
    { name: 'Tomato', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 7, stores: ['grocery', 'costco'], priority: 'high' },
    { name: 'Garlic', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 14, stores: ['grocery', 'costco'], priority: 'high' },
    { name: 'Ginger', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 14, stores: ['grocery', 'indian-store'], priority: 'high' },
    { name: 'Potato', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 21, stores: ['grocery', 'costco'], priority: 'medium' },
    { name: 'Cucumber', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 7, stores: ['grocery'], priority: 'low' },
    { name: 'Spinach', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 5, nutritionTags: ['high-fiber'], stores: ['grocery', 'costco'], priority: 'medium' },
    { name: 'Lettuce', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 5, stores: ['grocery'], priority: 'low' },
    { name: 'Avocado', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 5, nutritionTags: ['high-fiber'], stores: ['grocery', 'costco'], priority: 'medium' },
    { name: 'Lime', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 14, stores: ['grocery'], priority: 'low' },
    { name: 'Green Chillies', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 7, stores: ['indian-store', 'grocery'], priority: 'high' },
    { name: 'Cilantro', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 5, stores: ['grocery', 'indian-store'], priority: 'medium' },
    { name: 'Lemon', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 14, stores: ['grocery', 'costco'], priority: 'medium' },
    { name: 'Curry Leaves', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 7, stores: ['indian-store'], priority: 'high' },
    { name: 'Mint', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 5, stores: ['grocery', 'indian-store'], priority: 'low' },
    // Protein - paneer/tofu ~7-10 days, chicken ~3 days
    { name: 'Paneer', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'protein', defaultExpiryDays: 10, nutritionTags: ['high-protein'], stores: ['indian-store'], priority: 'high' },
    { name: 'Tofu', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'protein', defaultExpiryDays: 10, nutritionTags: ['high-protein'], stores: ['grocery', 'costco'], priority: 'medium' },
    // Dairy - ~14 days
    { name: 'Amul Cheese Cubes', typicalQty: 10, usages: ['ingredient'], ingredientCategory: 'dairy', defaultExpiryDays: 14, stores: ['indian-store'], priority: 'medium' },
    { name: 'Amul Cheese Slice', typicalQty: 10, usages: ['ingredient'], ingredientCategory: 'dairy', defaultExpiryDays: 14, stores: ['indian-store'], priority: 'medium' },
    { name: 'Butter', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'dairy', defaultExpiryDays: 30, stores: ['grocery', 'costco'], priority: 'high' },
    { name: 'Yogurt', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'dairy', defaultExpiryDays: 14, stores: ['grocery', 'costco'], priority: 'high' },
    // Eggs ~21 days, chicken ~3 days
    { name: 'Egg', typicalQty: 24, usages: ['ingredient'], ingredientCategory: 'protein', defaultExpiryDays: 21, nutritionTags: ['high-protein'], stores: ['grocery', 'costco'], priority: 'high' },
    { name: 'Chicken', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'protein', defaultExpiryDays: 3, nutritionTags: ['high-protein'], stores: ['grocery', 'costco'], priority: 'high' },
    // Condiments/dips - ~7-14 days
    { name: 'Hummus', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'condiments', defaultExpiryDays: 10, stores: ['grocery', 'costco'], priority: 'medium' },
    { name: 'Tzatziki', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'condiments', defaultExpiryDays: 7, stores: ['grocery'], priority: 'low' },
    { name: 'Green Chutney', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'condiments', defaultExpiryDays: 7, stores: ['indian-store'], priority: 'medium' },
    { name: 'Tamarind Chutney', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'condiments', defaultExpiryDays: 14, stores: ['indian-store'], priority: 'medium' },
    { name: 'Pickle', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'condiments', defaultExpiryDays: 30, stores: ['indian-store'], priority: 'low' },
    // Breads - ~5 days, quick reheat
    { name: 'Bread', typicalQty: 1, usages: ['meal', 'ingredient'], defaultExpiryDays: 5, stores: ['grocery', 'costco'], priority: 'high', prepTimeMinutes: 1 },
    { name: 'Naan', typicalQty: 1, usages: ['meal', 'ingredient'], defaultExpiryDays: 5, stores: ['indian-store', 'costco'], priority: 'medium', prepTimeMinutes: 2 },
    { name: 'Roti', typicalQty: 1, usages: ['meal', 'ingredient'], defaultExpiryDays: 5, stores: ['indian-store'], priority: 'medium', prepTimeMinutes: 2 },
    // Batters - ~5-7 days
    { name: 'Dosa Batter', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'grains', defaultExpiryDays: 5, stores: ['indian-store'], priority: 'high' },
    { name: 'Ragi Dosa Batter', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'grains', defaultExpiryDays: 5, stores: ['indian-store'], priority: 'medium' },
    { name: 'Idli Batter', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'grains', defaultExpiryDays: 5, stores: ['indian-store'], priority: 'medium' },
  ],
  frozen: [
    // Frozen items - 90 days (3 months), 10-15 min cook time
    { name: 'TJs Orange Chicken', typicalQty: 2, usages: ['meal'], mealCategory: 'ready-meals', defaultExpiryDays: 90, stores: ['grocery'], priority: 'medium', prepTimeMinutes: 12 },
    { name: 'Frozen Samosas', typicalQty: 1, usages: ['meal'], mealCategory: 'snacks', defaultExpiryDays: 90, stores: ['indian-store', 'costco'], priority: 'medium', prepTimeMinutes: 15 },
    { name: 'Frozen Parathas', typicalQty: 1, usages: ['meal'], mealCategory: 'snacks', defaultExpiryDays: 90, stores: ['indian-store', 'costco'], priority: 'high', prepTimeMinutes: 8 },
    { name: 'Frozen Falafel', typicalQty: 1, usages: ['meal', 'ingredient'], ingredientCategory: 'protein', defaultExpiryDays: 90, stores: ['grocery', 'costco'], priority: 'medium', prepTimeMinutes: 12 },
  ],
  dry: [
    // Dry goods - long shelf life, 180 days (6 months) or omit
    { name: 'Tomato Powdered Soup', typicalQty: 2, usages: ['meal'], mealCategory: 'soups', stores: ['grocery'], priority: 'low', prepTimeMinutes: 8 },
    { name: 'Sweet & Sour Powdered Soup', typicalQty: 2, usages: ['meal'], mealCategory: 'soups', stores: ['grocery'], priority: 'low', prepTimeMinutes: 8 },
    { name: 'Vegetable Powdered Soup', typicalQty: 2, usages: ['meal'], mealCategory: 'soups', stores: ['grocery'], priority: 'low', prepTimeMinutes: 8 },
    { name: 'Maggi Noodles', typicalQty: 8, usages: ['meal'], mealCategory: 'noodles', stores: ['indian-store', 'grocery'], priority: 'medium', prepTimeMinutes: 6 },
    { name: 'Top Ramen Curry Noodles', typicalQty: 4, usages: ['meal'], mealCategory: 'noodles', stores: ['grocery'], priority: 'low', prepTimeMinutes: 6 },
    { name: 'MTR Upma', typicalQty: 2, usages: ['meal'], mealCategory: 'ready-meals', stores: ['indian-store'], priority: 'medium', prepTimeMinutes: 8 },
    { name: 'MTR Idli', typicalQty: 2, usages: ['meal'], mealCategory: 'ready-meals', stores: ['indian-store'], priority: 'medium', prepTimeMinutes: 8 },
    { name: 'MTR Sambhar', typicalQty: 2, usages: ['meal'], mealCategory: 'ready-meals', stores: ['indian-store'], priority: 'medium', prepTimeMinutes: 5 },
    // Tortillas - shorter shelf life than most dry goods
    { name: 'Tortillas', typicalQty: 1, usages: ['meal', 'ingredient'], defaultExpiryDays: 14, stores: ['grocery', 'costco'], priority: 'medium', prepTimeMinutes: 2 },
    // Dry ingredients - very long shelf life, omit defaultExpiryDays
    { name: 'Rice', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'grains', stores: ['indian-store', 'costco'], priority: 'high' },
    { name: 'Atta', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'grains', stores: ['indian-store'], priority: 'high' },
    { name: 'Thick Poha', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'grains', nutritionTags: ['high-fiber'], stores: ['indian-store'], priority: 'medium' },
    { name: 'CannedBlackBeans', typicalQty: 2, usages: ['ingredient'], ingredientCategory: 'legumes', nutritionTags: ['high-fiber'], stores: ['grocery', 'costco'], priority: 'medium' },
    { name: 'Toor Dal', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'legumes', nutritionTags: ['high-fiber'], stores: ['indian-store'], priority: 'high' },
    { name: 'Masoor Dal', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'legumes', nutritionTags: ['high-fiber'], stores: ['indian-store'], priority: 'medium' },
    { name: 'Moong Dal', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'legumes', nutritionTags: ['high-fiber'], stores: ['indian-store'], priority: 'medium' },
    { name: 'Black Urad Dal', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'legumes', nutritionTags: ['high-fiber'], stores: ['indian-store'], priority: 'medium' },
    { name: 'Chickpeas', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'legumes', nutritionTags: ['high-protein', 'high-fiber'], stores: ['indian-store', 'grocery'], priority: 'medium' },
    { name: 'Rajma', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'legumes', nutritionTags: ['high-protein', 'high-fiber'], stores: ['indian-store'], priority: 'medium' },
  ],
};

export function getDefaultItemNames(section: Section): Set<string> {
  return new Set(defaultKnownItems[section].map(item => item.name));
}

export function getAllDefaultItemNames(): Set<string> {
  const allNames = new Set<string>();
  for (const section of ['fresh', 'frozen', 'dry'] as Section[]) {
    for (const item of defaultKnownItems[section]) {
      allNames.add(item.name);
    }
  }
  return allNames;
}
