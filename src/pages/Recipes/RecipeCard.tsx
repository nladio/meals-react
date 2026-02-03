import type { NutritionTag, RecipeMatch } from '../../types';

interface RecipeCardProps {
  match: RecipeMatch;
}

function getNutritionBgColor(tags?: NutritionTag[]): string {
  if (!tags || tags.length === 0) return 'bg-white';

  const hasProtein = tags.includes('high-protein');
  const hasFiber = tags.includes('high-fiber');

  if (hasProtein && hasFiber) return 'bg-both-light';
  if (hasProtein) return 'bg-protein-light';
  if (hasFiber) return 'bg-fiber-light';
  return 'bg-white';
}

export function RecipeCard({ match }: RecipeCardProps) {
  const { recipe, status, availableIngredients, missingRequired, missingOptional } = match;

  const borderColor = {
    full: 'border-l-success',
    partial: 'border-l-warning',
    none: 'border-l-border',
  }[status];

  const bgColor = getNutritionBgColor(recipe.nutritionTags);

  return (
    <div className={`${bgColor} rounded-lg p-4 shadow-sm border-l-4 cursor-pointer transition-all hover:shadow-md active:scale-[0.99] ${borderColor}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-text">{recipe.name}</h3>
        <span className="text-xs bg-gray-100 text-text-muted px-2 py-1 rounded-full shrink-0">
          {recipe.prepTimeMinutes} min
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {availableIngredients.map(name => (
          <span
            key={name}
            className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-success/10 text-success"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {name}
          </span>
        ))}
        {missingRequired.map(name => (
          <span
            key={name}
            className="text-xs px-2 py-1 rounded-full bg-danger/10 text-danger"
          >
            {name}
          </span>
        ))}
        {missingOptional.map(name => (
          <span
            key={name}
            className="text-xs px-2 py-1 rounded-full bg-gray-100 text-text-light"
          >
            {name}
          </span>
        ))}
      </div>

      {status === 'partial' && missingRequired.length > 0 && (
        <p className="mt-2 text-xs text-text-muted">
          Need: {missingRequired.join(', ')}
        </p>
      )}
    </div>
  );
}
