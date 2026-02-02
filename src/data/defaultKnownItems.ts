import type {
  IngredientCategory,
  ItemUsage,
  MealCategory,
  NutritionTag,
  Priority,
  Section,
  Store,
} from '../types/index.ts';

import dryItems from './dry-items.json';
import freshItems from './fresh-items.json';
import frozenItems from './frozen-items.json';

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
  staple?: boolean; // true = always show in Staples section
}

export const defaultKnownItems: Record<Section, DefaultKnownItem[]> = {
  fresh: freshItems as DefaultKnownItem[],
  frozen: frozenItems as DefaultKnownItem[],
  dry: dryItems as DefaultKnownItem[],
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
