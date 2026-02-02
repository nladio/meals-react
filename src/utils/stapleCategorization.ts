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

  if (usages.includes('meal')) return 'Ready Meals';

  return 'Other';
}

export function groupStaplesByCategory(
  staples: StapleItem[],
  defaultItems: DefaultKnownItem[]
): Record<StapleCategory, StapleItem[]> {
  const groups: Record<StapleCategory, StapleItem[]> = {
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

  for (const staple of staples) {
    const defaultItem = defaultItemMap.get(staple.name);
    if (defaultItem) {
      const category = getCategoryForStaple(defaultItem);
      groups[category].push(staple);
    } else {
      groups.Other.push(staple);
    }
  }

  return groups;
}
