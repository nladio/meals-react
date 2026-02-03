import type { Dish } from '../../types';

interface DishItemProps {
  dish: Dish;
}

export function DishItem({ dish }: DishItemProps) {
  const { name, cost, quantity, customizations, tags, macros } = dish;
  const lineTotal = cost * quantity;

  // Format macros as compact string
  const formatMacros = () => {
    if (!macros) return null;
    const parts: string[] = [];
    if (macros.calories !== undefined) parts.push(`${macros.calories} cal`);
    if (macros.protein !== undefined) parts.push(`${macros.protein}g P`);
    if (macros.carbs !== undefined) parts.push(`${macros.carbs}g C`);
    if (macros.fat !== undefined) parts.push(`${macros.fat}g F`);
    return parts.length > 0 ? parts.join(' | ') : null;
  };

  const macroString = formatMacros();

  return (
    <div className="flex flex-col gap-1 pl-3 py-2 border-l-2 border-gray-200">
      {/* Name and Cost Row */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-800">
          {name}{quantity > 1 && <span className="text-gray-500"> ×{quantity}</span>}
        </span>
        <span className="text-sm font-semibold text-gray-700">
          {quantity > 1 ? (
            <span>
              <span className="text-gray-400 font-normal">${cost.toFixed(2)} × {quantity} = </span>
              ${lineTotal.toFixed(2)}
            </span>
          ) : (
            `$${cost.toFixed(2)}`
          )}
        </span>
      </div>

      {/* Customizations (if present) */}
      {customizations && customizations.length > 0 && (
        <div className="text-xs text-gray-500">{customizations.join(', ')}</div>
      )}

      {/* Macros (if present) */}
      {macroString && (
        <div className="text-xs text-gray-500">{macroString}</div>
      )}

      {/* Tags Row */}
      <div className="flex flex-wrap gap-1 mt-1">
        {/* Meal Time Tags - Blue */}
        {tags.mealTime?.map((time) => (
          <span
            key={time}
            className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700"
          >
            {time}
          </span>
        ))}

        {/* Cuisine Tag - Purple */}
        {tags.cuisine && (
          <span className="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-700">
            {tags.cuisine}
          </span>
        )}

        {/* Dish Type Tag - Amber */}
        {tags.dishType && (
          <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700">
            {tags.dishType}
          </span>
        )}
      </div>
    </div>
  );
}
