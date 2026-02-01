import type { Section, ItemUsage } from '../types';

export type IngredientCategory = 'produce' | 'dairy' | 'protein' | 'condiments' | 'grains' | 'legumes';

export interface DefaultKnownItem {
  name: string;
  typicalQty: number;
  usages: ItemUsage[];
  ingredientCategory?: IngredientCategory;
}

export const defaultKnownItems: Record<Section, DefaultKnownItem[]> = {
  fresh: [
    // Ready to eat (meals only)
    { name: 'Paneer Curry', typicalQty: 2, usages: ['meal'] },
    { name: 'Dal Makhani', typicalQty: 2, usages: ['meal'] },
    { name: 'Palak Paneer', typicalQty: 2, usages: ['meal'] },
    { name: 'Chole', typicalQty: 2, usages: ['meal'] },
    { name: 'Aloo Gobi', typicalQty: 2, usages: ['meal'] },
    { name: 'Chapatis', typicalQty: 1, usages: ['meal', 'ingredient'] },
    { name: 'Falafel', typicalQty: 1, usages: ['meal', 'ingredient']},
    // Ingredients only
    { name: 'Onion', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce' },
    { name: 'Tomato', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce' },
    { name: 'Garlic', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce' },
    { name: 'Ginger', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce' },
    { name: 'Potato', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce' },
    { name: 'Cucumber', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce' },
    { name: 'Spinach', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce' },
    { name: 'Lettuce', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce' },
    { name: 'Avocado', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce' },
    { name: 'Lime', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce' },
    { name: 'Green Chillies', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce' },
    { name: 'Cilantro', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce' },
    { name: 'Lemon', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce' },
    { name: 'Curry Leaves', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce' },
    { name: 'Mint', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce' },
    { name: 'Paneer', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'protein' },
    { name: 'Tofu', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'protein' },
    { name: 'Amul Cheese Cubes', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'dairy' },
    { name: 'Amul Cheese Slice', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'dairy' },
    { name: 'Butter', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'dairy' },
    { name: 'Yogurt', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'dairy' },
    { name: 'Egg', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'protein' },
    { name: 'Chicken', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'protein' },
    { name: 'Hummus', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'condiments' },
    { name: 'Tzatziki', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'condiments' },
    { name: 'Green Chutney', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'condiments' },
    { name: 'Tamarind Chutney', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'condiments' },
    { name: 'Pickle', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'condiments' },
    { name: 'Bread', typicalQty: 1, usages: ['meal', 'ingredient'] },
    { name: 'Naan', typicalQty: 1, usages: ['meal', 'ingredient'] },
    { name: 'Roti', typicalQty: 1, usages: ['meal', 'ingredient'] },
    { name: 'Dosa Batter', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'grains' },
    { name: 'Ragi Dosa Batter', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'grains' },
    { name: 'Idli Batter', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'grains' },
  ],
  frozen: [
    // Ready to eat (meals only)
    { name: 'TJs Orange Chicken', typicalQty: 2, usages: ['meal'] },
    { name: 'Frozen Samosas', typicalQty: 1, usages: ['meal'] },
    { name: 'Frozen Parathas', typicalQty: 1, usages: ['meal'] },
    // Dual-use: can be eaten as meal or used as ingredient
    { name: 'Frozen Falafel', typicalQty: 1, usages: ['meal', 'ingredient'], ingredientCategory: 'protein' },
  ],
  dry: [
    // Ready to eat (meals only)
    { name: 'Tomato Powdered Soup', typicalQty: 2, usages: ['meal'] },
    { name: 'Sweet & Sour Powdered Soup', typicalQty: 2, usages: ['meal'] },
    { name: 'Vegetable Powdered Soup', typicalQty: 2, usages: ['meal'] },
    { name: 'Maggi Noodles', typicalQty: 8, usages: ['meal'] },
    { name: 'Top Ramen Curry Noodles', typicalQty: 4, usages: ['meal'] },
    { name: 'MTR Upma', typicalQty: 2, usages: ['meal'] },
    { name: 'MTR Idli', typicalQty: 2, usages: ['meal'] },
    { name: 'MTR Sambhar', typicalQty: 2, usages: ['meal'] },
    // Dual-use: can be eaten as meal or used as ingredient
    { name: 'Tortillas', typicalQty: 1, usages: ['meal', 'ingredient'] },
    // Ingredients only
    { name: 'Rice', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'grains' },
    { name: 'Atta', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'grains' },
    { name: 'Thick Poha', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'grains' },
    { name: 'CannedBlackBeans', typicalQty: 2, usages: ['ingredient'], ingredientCategory: 'legumes' },
    { name: 'Toor Dal', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'legumes' },
    { name: 'Masoor Dal', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'legumes' },
    { name: 'Moong Dal', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'legumes' },
    { name: 'Black Urad Dal', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'legumes' },
    { name: 'Chickpeas', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'legumes' },
    { name: 'Rajma', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'legumes' },
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
