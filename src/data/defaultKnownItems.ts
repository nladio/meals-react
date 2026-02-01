import type { Section, ItemUsage, NutritionTag } from '../types';

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
}

export const defaultKnownItems: Record<Section, DefaultKnownItem[]> = {
  fresh: [
    // Ready to eat (meals only) - prepared foods, ~5 days
    { name: 'Paneer Curry', typicalQty: 2, usages: ['meal'], mealCategory: 'curries', defaultExpiryDays: 5 },
    { name: 'Dal Makhani', typicalQty: 2, usages: ['meal'], mealCategory: 'curries', defaultExpiryDays: 5 },
    { name: 'Palak Paneer', typicalQty: 2, usages: ['meal'], mealCategory: 'curries', defaultExpiryDays: 5, nutritionTags: ['high-fiber'] },
    { name: 'Chole', typicalQty: 2, usages: ['meal'], mealCategory: 'curries', defaultExpiryDays: 5, nutritionTags: ['high-fiber'] },
    { name: 'Aloo Gobi', typicalQty: 2, usages: ['meal'], mealCategory: 'curries', defaultExpiryDays: 5 },
    { name: 'Chapatis', typicalQty: 1, usages: ['meal', 'ingredient'], defaultExpiryDays: 5 },
    { name: 'Falafel', typicalQty: 1, usages: ['meal', 'ingredient'], defaultExpiryDays: 5 },
    // Ingredients only - produce ~7 days, herbs ~5 days
    { name: 'Onion', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 14 },
    { name: 'Tomato', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 7 },
    { name: 'Garlic', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 14 },
    { name: 'Ginger', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 14 },
    { name: 'Potato', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 21 },
    { name: 'Cucumber', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 7 },
    { name: 'Spinach', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 5, nutritionTags: ['high-fiber'] },
    { name: 'Lettuce', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 5 },
    { name: 'Avocado', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 5, nutritionTags: ['high-fiber'] },
    { name: 'Lime', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 14 },
    { name: 'Green Chillies', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 7 },
    { name: 'Cilantro', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 5 },
    { name: 'Lemon', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 14 },
    { name: 'Curry Leaves', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 7 },
    { name: 'Mint', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 5 },
    // Protein - paneer/tofu ~7-10 days, chicken ~3 days
    { name: 'Paneer', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'protein', defaultExpiryDays: 10, nutritionTags: ['high-protein'] },
    { name: 'Tofu', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'protein', defaultExpiryDays: 10, nutritionTags: ['high-protein'] },
    // Dairy - ~14 days
    { name: 'Amul Cheese Cubes', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'dairy', defaultExpiryDays: 14 },
    { name: 'Amul Cheese Slice', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'dairy', defaultExpiryDays: 14 },
    { name: 'Butter', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'dairy', defaultExpiryDays: 30 },
    { name: 'Yogurt', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'dairy', defaultExpiryDays: 14 },
    // Eggs ~21 days, chicken ~3 days
    { name: 'Egg', typicalQty: 24, usages: ['ingredient'], ingredientCategory: 'protein', defaultExpiryDays: 21, nutritionTags: ['high-protein'] },
    { name: 'Chicken', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'protein', defaultExpiryDays: 3, nutritionTags: ['high-protein'] },
    // Condiments/dips - ~7-14 days
    { name: 'Hummus', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'condiments', defaultExpiryDays: 10},
    { name: 'Tzatziki', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'condiments', defaultExpiryDays: 7 },
    { name: 'Green Chutney', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'condiments', defaultExpiryDays: 7 },
    { name: 'Tamarind Chutney', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'condiments', defaultExpiryDays: 14 },
    { name: 'Pickle', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'condiments', defaultExpiryDays: 30 },
    // Breads - ~5 days
    { name: 'Bread', typicalQty: 1, usages: ['meal', 'ingredient'], defaultExpiryDays: 5 },
    { name: 'Naan', typicalQty: 1, usages: ['meal', 'ingredient'], defaultExpiryDays: 5 },
    { name: 'Roti', typicalQty: 1, usages: ['meal', 'ingredient'], defaultExpiryDays: 5 },
    // Batters - ~5-7 days
    { name: 'Dosa Batter', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'grains', defaultExpiryDays: 5 },
    { name: 'Ragi Dosa Batter', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'grains', defaultExpiryDays: 5 },
    { name: 'Idli Batter', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'grains', defaultExpiryDays: 5 },
  ],
  frozen: [
    // Frozen items - 90 days (3 months)
    { name: 'TJs Orange Chicken', typicalQty: 2, usages: ['meal'], mealCategory: 'ready-meals', defaultExpiryDays: 90 },
    { name: 'Frozen Samosas', typicalQty: 1, usages: ['meal'], mealCategory: 'snacks', defaultExpiryDays: 90 },
    { name: 'Frozen Parathas', typicalQty: 1, usages: ['meal'], mealCategory: 'snacks', defaultExpiryDays: 90 },
    { name: 'Frozen Falafel', typicalQty: 1, usages: ['meal', 'ingredient'], ingredientCategory: 'protein', defaultExpiryDays: 90},
  ],
  dry: [
    // Dry goods - long shelf life, 180 days (6 months) or omit
    { name: 'Tomato Powdered Soup', typicalQty: 2, usages: ['meal'], mealCategory: 'soups' },
    { name: 'Sweet & Sour Powdered Soup', typicalQty: 2, usages: ['meal'], mealCategory: 'soups' },
    { name: 'Vegetable Powdered Soup', typicalQty: 2, usages: ['meal'], mealCategory: 'soups' },
    { name: 'Maggi Noodles', typicalQty: 8, usages: ['meal'], mealCategory: 'noodles' },
    { name: 'Top Ramen Curry Noodles', typicalQty: 4, usages: ['meal'], mealCategory: 'noodles' },
    { name: 'MTR Upma', typicalQty: 2, usages: ['meal'], mealCategory: 'ready-meals' },
    { name: 'MTR Idli', typicalQty: 2, usages: ['meal'], mealCategory: 'ready-meals' },
    { name: 'MTR Sambhar', typicalQty: 2, usages: ['meal'], mealCategory: 'ready-meals' },
    // Tortillas - shorter shelf life than most dry goods
    { name: 'Tortillas', typicalQty: 1, usages: ['meal', 'ingredient'], defaultExpiryDays: 14 },
    // Dry ingredients - very long shelf life, omit defaultExpiryDays
    { name: 'Rice', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'grains' },
    { name: 'Atta', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'grains' },
    { name: 'Thick Poha', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'grains', nutritionTags: ['high-fiber'] },
    { name: 'CannedBlackBeans', typicalQty: 2, usages: ['ingredient'], ingredientCategory: 'legumes', nutritionTags: ['high-fiber'] },
    { name: 'Toor Dal', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'legumes', nutritionTags: ['high-fiber'] },
    { name: 'Masoor Dal', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'legumes', nutritionTags: ['high-fiber'] },
    { name: 'Moong Dal', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'legumes', nutritionTags: ['high-fiber'] },
    { name: 'Black Urad Dal', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'legumes', nutritionTags: ['high-fiber'] },
    { name: 'Chickpeas', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'legumes', nutritionTags: ['high-protein', 'high-fiber'] },
    { name: 'Rajma', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'legumes', nutritionTags: ['high-protein', 'high-fiber'] },
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
