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
    <div className={`bg-white rounded-lg p-4 shadow-sm border-l-4 ${borderColor}`}>
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
            className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700"
          >
            {name}
          </span>
        ))}
        {missingRequired.map(name => (
          <span
            key={name}
            className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700"
          >
            {name}
          </span>
        ))}
        {missingOptional.map(name => (
          <span
            key={name}
            className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500"
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
