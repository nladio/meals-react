import type { Section, ItemUsage } from '../types';

export interface DefaultKnownItem {
  name: string;
  typicalQty: number;
  usages: ItemUsage[];
}

export const defaultKnownItems: Record<Section, DefaultKnownItem[]> = {
  fresh: [
    // Ready to eat (meals only)
    { name: 'Paneer Curry', typicalQty: 2, usages: ['meal'] },
    { name: 'Dal Makhani', typicalQty: 2, usages: ['meal'] },
    { name: 'Palak Paneer', typicalQty: 2, usages: ['meal'] },
    { name: 'Chole', typicalQty: 2, usages: ['meal'] },
    { name: 'Aloo Gobi', typicalQty: 2, usages: ['meal'] },
    { name: 'Chapatis', typicalQty: 1, usages: ['meal'] },
    // Ingredients only
    { name: 'Onion', typicalQty: 1, usages: ['ingredient'] },
    { name: 'Tomato', typicalQty: 1, usages: ['ingredient'] },
    { name: 'Garlic', typicalQty: 1, usages: ['ingredient'] },
    { name: 'Ginger', typicalQty: 1, usages: ['ingredient'] },
    { name: 'Potato', typicalQty: 1, usages: ['ingredient'] },
    { name: 'Cucumber', typicalQty: 1, usages: ['ingredient'] },
    { name: 'Spinach', typicalQty: 1, usages: ['ingredient'] },
    { name: 'Lettuce', typicalQty: 1, usages: ['ingredient'] },
    { name: 'Avocado', typicalQty: 1, usages: ['ingredient'] },
    { name: 'Lime', typicalQty: 1, usages: ['ingredient'] },
    { name: 'Green Chillies', typicalQty: 1, usages: ['ingredient'] },
    { name: 'Cilantro', typicalQty: 1, usages: ['ingredient'] },
    { name: 'Paneer', typicalQty: 1, usages: ['ingredient'] },
    { name: 'Cheese', typicalQty: 1, usages: ['ingredient'] },
    { name: 'Butter', typicalQty: 1, usages: ['ingredient'] },
    { name: 'Yogurt', typicalQty: 1, usages: ['ingredient'] },
    { name: 'Egg', typicalQty: 1, usages: ['ingredient'] },
    { name: 'Chicken', typicalQty: 1, usages: ['ingredient'] },
    { name: 'Hummus', typicalQty: 1, usages: ['ingredient'] },
    { name: 'Tzatziki', typicalQty: 1, usages: ['ingredient'] },
    { name: 'Chutney', typicalQty: 1, usages: ['ingredient'] },
  ],
  frozen: [
    // Ready to eat (meals only)
    { name: 'Biryani', typicalQty: 2, usages: ['meal'] },
    { name: 'TJs Palak Paneer', typicalQty: 2, usages: ['meal'] },
    { name: 'Frozen Samosas', typicalQty: 1, usages: ['meal'] },
    { name: 'Frozen Parathas', typicalQty: 1, usages: ['meal'] },
    // Dual-use: can be eaten as meal or used as ingredient
    { name: 'Falafel', typicalQty: 1, usages: ['meal', 'ingredient'] },
  ],
  dry: [
    // Ready to eat (meals only)
    { name: 'Instant Noodles', typicalQty: 3, usages: ['meal'] },
    { name: 'Canned Soup', typicalQty: 2, usages: ['meal'] },
    // Dual-use: can be eaten as meal or used as ingredient
    { name: 'Tortillas', typicalQty: 1, usages: ['meal', 'ingredient'] },
    { name: 'Bread', typicalQty: 1, usages: ['meal', 'ingredient'] },
    { name: 'Naan', typicalQty: 1, usages: ['meal', 'ingredient'] },
    // Ingredients only
    { name: 'Rice', typicalQty: 1, usages: ['ingredient'] },
    { name: 'Beans', typicalQty: 2, usages: ['ingredient'] },
    { name: 'Toor Dal', typicalQty: 1, usages: ['ingredient'] },
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
