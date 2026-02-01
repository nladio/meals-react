import type { Section } from '../types';

export interface DefaultKnownItem {
  name: string;
  typicalQty: number;
  subcategory: string;
}

export const defaultKnownItems: Record<Section, DefaultKnownItem[]> = {
  fresh: [
    // Ready to eat
    { name: 'Paneer Curry', typicalQty: 2, subcategory: 'Ready to eat' },
    { name: 'Dal Makhani', typicalQty: 2, subcategory: 'Ready to eat' },
    { name: 'Palak Paneer', typicalQty: 2, subcategory: 'Ready to eat' },
    { name: 'Chole', typicalQty: 2, subcategory: 'Ready to eat' },
    { name: 'Aloo Gobi', typicalQty: 2, subcategory: 'Ready to eat' },
    { name: 'Chapatis', typicalQty: 1, subcategory: 'Ready to eat' },
    // Ingredients (from recipes)
    { name: 'Onion', typicalQty: 1, subcategory: 'Ingredients' },
    { name: 'Tomato', typicalQty: 1, subcategory: 'Ingredients' },
    { name: 'Garlic', typicalQty: 1, subcategory: 'Ingredients' },
    { name: 'Ginger', typicalQty: 1, subcategory: 'Ingredients' },
    { name: 'Potato', typicalQty: 1, subcategory: 'Ingredients' },
    { name: 'Cucumber', typicalQty: 1, subcategory: 'Ingredients' },
    { name: 'Spinach', typicalQty: 1, subcategory: 'Ingredients' },
    { name: 'Lettuce', typicalQty: 1, subcategory: 'Ingredients' },
    { name: 'Avocado', typicalQty: 1, subcategory: 'Ingredients' },
    { name: 'Lime', typicalQty: 1, subcategory: 'Ingredients' },
    { name: 'Green Chillies', typicalQty: 1, subcategory: 'Ingredients' },
    { name: 'Cilantro', typicalQty: 1, subcategory: 'Ingredients' },
    { name: 'Paneer', typicalQty: 1, subcategory: 'Ingredients' },
    { name: 'Cheese', typicalQty: 1, subcategory: 'Ingredients' },
    { name: 'Butter', typicalQty: 1, subcategory: 'Ingredients' },
    { name: 'Yogurt', typicalQty: 1, subcategory: 'Ingredients' },
    { name: 'Egg', typicalQty: 1, subcategory: 'Ingredients' },
    { name: 'Chicken', typicalQty: 1, subcategory: 'Ingredients' },
    { name: 'Hummus', typicalQty: 1, subcategory: 'Ingredients' },
    { name: 'Tzatziki', typicalQty: 1, subcategory: 'Ingredients' },
    { name: 'Chutney', typicalQty: 1, subcategory: 'Ingredients' },
  ],
  frozen: [
    // Ready to eat
    { name: 'Biryani', typicalQty: 2, subcategory: 'Ready to eat' },
    { name: 'TJs Palak Paneer', typicalQty: 2, subcategory: 'Ready to eat' },
    { name: 'Frozen Samosas', typicalQty: 1, subcategory: 'Ready to eat' },
    { name: 'Frozen Parathas', typicalQty: 1, subcategory: 'Ready to eat' },
    // Ingredients (from recipes)
    { name: 'Falafel', typicalQty: 1, subcategory: 'Ingredients' },
  ],
  dry: [
    // Ready to eat
    { name: 'Instant Noodles', typicalQty: 3, subcategory: 'Ready to eat' },
    { name: 'Canned Soup', typicalQty: 2, subcategory: 'Ready to eat' },
    { name: 'Tortillas', typicalQty: 1, subcategory: 'Ready to eat' },
    { name: 'Bread', typicalQty: 1, subcategory: 'Ready to eat' },
    // Ingredients (from recipes)
    { name: 'Rice', typicalQty: 1, subcategory: 'Ingredients' },
    { name: 'Beans', typicalQty: 2, subcategory: 'Ingredients' },
    { name: 'Toor Dal', typicalQty: 1, subcategory: 'Ingredients' },
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
