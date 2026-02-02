import type { Section, Priority } from '../types';
import type { DefaultKnownItem } from '../data/defaultKnownItems';

export interface StapleItem {
  name: string;
  section: Section;
  currentQty: number;
  suggestedQty: number;
  lastBought: string | null;
  priority: Priority;
}

export const STAPLE_CATEGORY_ORDER = [
  'Curries',
  'Breads & Batters',
  'Ready Meals',
  'Produce',
  'Dairy & Protein',
  'Grains',
  'Legumes',
  'Condiments',
  'Other',
] as const;

export type StapleCategory = (typeof STAPLE_CATEGORY_ORDER)[number];

export function getCategoryForStaple(item: DefaultKnownItem): StapleCategory {
  const { mealCategory, ingredientCategory, name, usages } = item;

  if (mealCategory === 'curries') return 'Curries';
  if (mealCategory === 'ready-meals' || mealCategory === 'noodles') return 'Ready Meals';
  if (mealCategory === 'snacks') return 'Breads & Batters';

  if (ingredientCategory === 'produce') return 'Produce';
  if (ingredientCategory === 'dairy' || ingredientCategory === 'protein') return 'Dairy & Protein';
  if (ingredientCategory === 'grains') {
    return name.includes('Batter') ? 'Breads & Batters' : 'Grains';
  }
  if (ingredientCategory === 'legumes') return 'Legumes';
  if (ingredientCategory === 'condiments') return 'Condiments';

  // Check for bread-like items by name
  const breadPatterns = ['Chapati', 'Thepla', 'Naan', 'Roti', 'Bread', 'Paratha'];
  if (breadPatterns.some(pattern => name.includes(pattern))) return 'Breads & Batters';

  if (usages.includes('meal')) return 'Ready Meals';

  return 'Other';
}

export function groupItemsByCategory<T extends { name: string }>(
  items: T[],
  defaultItems: DefaultKnownItem[]
): Record<StapleCategory, T[]> {
  const groups: Record<StapleCategory, T[]> = {
    Curries: [],
    'Breads & Batters': [],
    'Ready Meals': [],
    Produce: [],
    'Dairy & Protein': [],
    Grains: [],
    Legumes: [],
    Condiments: [],
    Other: [],
  };

  const defaultItemMap = new Map(defaultItems.map(item => [item.name, item]));

  for (const item of items) {
    const defaultItem = defaultItemMap.get(item.name);
    if (defaultItem) {
      const category = getCategoryForStaple(defaultItem);
      groups[category].push(item);
    } else {
      groups.Other.push(item);
    }
  }

  return groups;
}

// Backwards-compatible alias
export const groupStaplesByCategory = groupItemsByCategory;
