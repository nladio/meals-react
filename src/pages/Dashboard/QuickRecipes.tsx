import { useState } from 'react';
import { useAppState } from '../../hooks/useAppState';
import { defaultRecipes } from '../../data/recipes';
import { getAllRecipeMatches } from '../../utils/recipeMatching';
import type { RecipeMatch } from '../../types';

function CompactRecipeCard({ match }: { match: RecipeMatch }) {
  const { recipe, status, missingRequired } = match;

  const borderColor = {
    full: 'border-l-green-500',
    partial: 'border-l-orange-500',
    none: 'border-l-gray-300',
  }[status];

  const statusLabel = {
    full: 'Ready',
    partial: `Need ${missingRequired.length}`,
    none: 'Missing items',
  }[status];

  const statusColor = {
    full: 'bg-green-50 text-green-600',
    partial: 'bg-orange-50 text-orange-600',
    none: 'bg-gray-50 text-gray-500',
  }[status];

  return (
    <div className={`bg-white rounded-lg p-3 shadow-sm border-l-4 ${borderColor}`}>
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-800 text-sm">{recipe.name}</h4>
        <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor}`}>
          {statusLabel}
        </span>
      </div>
      {status === 'partial' && missingRequired.length > 0 && (
        <p className="mt-1 text-xs text-gray-500 truncate">
          Need: {missingRequired.join(', ')}
        </p>
      )}
    </div>
  );
}

export function QuickRecipes() {
  const { state } = useAppState();
  const [isExpanded, setIsExpanded] = useState(true);

  const allMatches = getAllRecipeMatches(defaultRecipes, state);

  // Show full matches and partial matches (up to 5 total)
  const relevantMatches = allMatches.filter(m => m.status === 'full' || m.status === 'partial').slice(0, 5);

  const fullMatchCount = allMatches.filter(m => m.status === 'full').length;

  if (relevantMatches.length === 0) {
    return null;
  }

  return (
    <section className="bg-white rounded-[12px] p-5 mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <span className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
            ▶
          </span>
          <h2 className="text-base font-semibold text-gray-600 uppercase tracking-wide">
            Cook
          </h2>
          <span className="text-xs text-gray-400 font-normal">(16+ min)</span>
        </div>
        {fullMatchCount > 0 && (
          <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
            {fullMatchCount} ready
          </span>
        )}
      </button>

      {isExpanded && (
        <div className="mt-4 flex flex-col gap-2">
          {relevantMatches.map(match => (
            <CompactRecipeCard key={match.recipe.id} match={match} />
          ))}

          <a
            href="#recipes"
            className="text-center text-sm text-primary hover:underline mt-2"
          >
            View all recipes →
          </a>
        </div>
      )}
    </section>
  );
}
