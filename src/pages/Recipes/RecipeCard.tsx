import type { RecipeMatch } from '../../types';

interface RecipeCardProps {
  match: RecipeMatch;
}

export function RecipeCard({ match }: RecipeCardProps) {
  const { recipe, status, availableIngredients, missingRequired, missingOptional } = match;

  const borderColor = {
    full: 'border-l-green-500',
    partial: 'border-l-orange-500',
    none: 'border-l-gray-300',
  }[status];

  const totalIngredients = recipe.ingredients.length;

  return (
    <div className={`bg-white rounded-lg p-4 shadow-sm border-l-4 cursor-pointer transition-all hover:shadow-md active:scale-[0.99] ${borderColor}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">{recipe.name}</h3>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
          {totalIngredients} ingredients
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {availableIngredients.map(name => (
          <span
            key={name}
            className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-50 text-green-600"
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
            className="text-xs px-2 py-1 rounded-full bg-red-50 text-red-400"
          >
            {name}
          </span>
        ))}
        {missingOptional.map(name => (
          <span
            key={name}
            className="text-xs px-2 py-1 rounded-full bg-gray-50 text-gray-400"
          >
            {name}
          </span>
        ))}
      </div>

      {status === 'partial' && missingRequired.length > 0 && (
        <p className="mt-2 text-xs text-gray-500">
          Need: {missingRequired.join(', ')}
        </p>
      )}
    </div>
  );
}
