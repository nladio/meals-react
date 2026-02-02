import type { NutritionTag, Section, Store } from '../../types';
import { NutritionBadges } from '../../components/ui/NutritionBadge';

export interface NutritionGoalItem {
  name: string;
  section: Section;
  nutritionTags: NutritionTag[];
}

interface NutritionGoalsSectionProps {
  items: NutritionGoalItem[];
  store: Store;
  onAddToList: (name: string, section: Section) => void;
}

export function NutritionGoalsSection({ items, store, onAddToList }: NutritionGoalsSectionProps) {
  if (items.length === 0) return null;

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between px-3 py-2 bg-purple-50 rounded-t-lg">
        <span className="font-medium text-sm text-purple-700">For Your Nutrition Goals</span>
        <span className="text-xs text-purple-600 bg-white px-2 py-0.5 rounded-full">
          {items.length}
        </span>
      </div>
      <div className="flex flex-col gap-2 pt-2">
        {items.map(item => (
          <div
            key={`nutrition-goal-${store}-${item.name}`}
            className="flex items-center gap-3 p-3 rounded-sm bg-purple-50 border-l-[3px] border-l-purple-400"
          >
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-medium text-[15px] truncate">{item.name}</span>
                <NutritionBadges tags={item.nutritionTags} />
              </div>
              <span className="text-xs text-gray-400">Out of stock</span>
            </div>
            <button
              onClick={() => onAddToList(item.name, item.section)}
              className="w-8 h-8 flex items-center justify-center text-purple-400 hover:text-purple-600 hover:bg-purple-100 rounded-full transition-all"
              aria-label={`Add ${item.name} to shopping list`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
