import type { NutritionTag, Section, Store } from '../../types';

interface NutritionStyle {
  bg: string;
  border: string;
  hoverBg: string;
  hoverText: string;
  text: string;
}

const NUTRITION_STYLES: Record<'protein' | 'fiber' | 'both', NutritionStyle> = {
  protein: {
    bg: 'bg-blue-100',
    border: 'border-l-blue-400',
    text: 'text-blue-400',
    hoverText: 'hover:text-blue-600',
    hoverBg: 'hover:bg-blue-200',
  },
  fiber: {
    bg: 'bg-green-100',
    border: 'border-l-green-400',
    text: 'text-green-400',
    hoverText: 'hover:text-green-600',
    hoverBg: 'hover:bg-green-200',
  },
  both: {
    bg: 'bg-violet-50',
    border: 'border-l-violet-400',
    text: 'text-violet-400',
    hoverText: 'hover:text-violet-600',
    hoverBg: 'hover:bg-violet-100',
  },
};

function getNutritionStyle(tags: NutritionTag[]): NutritionStyle {
  const hasProtein = tags.includes('high-protein');
  const hasFiber = tags.includes('high-fiber');

  if (hasProtein && hasFiber) return NUTRITION_STYLES.both;
  if (hasProtein) return NUTRITION_STYLES.protein;
  return NUTRITION_STYLES.fiber;
}

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
        {items.map(item => {
          const style = getNutritionStyle(item.nutritionTags);
          return (
            <div
              key={`nutrition-goal-${store}-${item.name}`}
              className={`flex items-center gap-3 p-3 rounded-sm ${style.bg} border-l-[3px] ${style.border}`}
            >
              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <span className="font-medium text-[15px] truncate">{item.name}</span>
                <span className="text-xs text-gray-400">Out of stock</span>
              </div>
              <button
                onClick={() => onAddToList(item.name, item.section)}
                className={`w-8 h-8 flex items-center justify-center ${style.text} ${style.hoverText} ${style.hoverBg} rounded-full transition-all`}
                aria-label={`Add ${item.name} to shopping list`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
