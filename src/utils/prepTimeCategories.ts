import type { Section, InventoryItem, KnownItem, NutritionTag, AppState } from '../types';
import { getMergedKnownItems } from '../hooks/useAppState';

export type PrepCategory = 'quick-reheat' | 'instant-prep' | 'cook';

export interface CategorizedItem {
  item: InventoryItem;
  section: Section;
  nutritionTags?: NutritionTag[];
  prepTimeMinutes?: number;
}

export interface PrepTimeCategorized {
  quickReheat: CategorizedItem[];
  instantPrep: CategorizedItem[];
  cook: CategorizedItem[];
}

export function getPrepCategory(minutes: number | undefined): PrepCategory {
  if (minutes === undefined || minutes <= 5) return 'quick-reheat';
  if (minutes <= 15) return 'instant-prep';
  return 'cook';
}

export function categorizeByPrepTime(state: AppState): PrepTimeCategorized {
  const mergedKnownItems = getMergedKnownItems(state);
  const result: PrepTimeCategorized = {
    quickReheat: [],
    instantPrep: [],
    cook: [],
  };

  const sections: Section[] = ['fresh', 'frozen', 'dry'];

  for (const section of sections) {
    const items = state.inventory[section];
    const knownItems = mergedKnownItems[section];

    for (const item of items) {
      const knownItem = knownItems.find((k: KnownItem) => k.name === item.name);
      const usages = knownItem?.usages || ['meal'];

      if (!usages.includes('meal')) continue;

      const categorizedItem: CategorizedItem = {
        item,
        section,
        nutritionTags: knownItem?.nutritionTags,
        prepTimeMinutes: knownItem?.prepTimeMinutes,
      };

      const category = getPrepCategory(knownItem?.prepTimeMinutes);
      result[category === 'quick-reheat' ? 'quickReheat' : category === 'instant-prep' ? 'instantPrep' : 'cook'].push(categorizedItem);
    }
  }

  return result;
}
