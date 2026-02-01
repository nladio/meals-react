import type { NutritionTag } from '../../types';
import { NutritionBadges } from '../ui/NutritionBadge';

interface MealCardProps {
  name: string;
  prepTimeMinutes?: number;
  quantity: number;
  nutritionTags?: NutritionTag[];
}

export function MealCard({ name, prepTimeMinutes, quantity, nutritionTags }: MealCardProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-sm bg-gray-100">
      <div className="flex items-center gap-1.5 flex-1 min-w-0">
        <span className="font-medium text-[15px] truncate">{name}</span>
        <NutritionBadges tags={nutritionTags} />
      </div>

      {prepTimeMinutes !== undefined && (
        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full shrink-0">
          {prepTimeMinutes} min
        </span>
      )}

      <span className="text-sm text-gray-600 shrink-0">
        ×{quantity}
      </span>
    </div>
  );
}
