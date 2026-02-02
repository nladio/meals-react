import { useState } from 'react';
import { useAppState } from '../../hooks/useAppState';
import { defaultRecipes } from '../../data/recipes';
import { getAllRecipeMatches } from '../../utils/recipeMatching';
import type { Recipe } from '../../types';

function CompactRecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-sm bg-gray-100 border-l-[3px] border-l-primary">
      <span className="font-medium text-[15px] flex-1 min-w-0 truncate">{recipe.name}</span>
      <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full shrink-0">
        {recipe.prepTimeMinutes} min
      </span>
    </div>
  );
}

export function QuickRecipes() {
  const { state } = useAppState();
  const [isExpanded, setIsExpanded] = useState(true);

  const allMatches = getAllRecipeMatches(defaultRecipes, state);
  const readyRecipes = allMatches.filter(m => m.status === 'full').map(m => m.recipe);

  if (readyRecipes.length === 0) {
    return null;
  }

  return (
    <section className="bg-white rounded-[12px] p-5 mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 rounded-t-lg hover:bg-gray-100 transition-all active:scale-[0.98] text-left"
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
        <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full">
          {readyRecipes.length}
        </span>
      </button>

      {isExpanded && (
        <div className="mt-4 flex flex-col gap-2">
          {readyRecipes.map(recipe => (
            <CompactRecipeCard key={recipe.id} recipe={recipe} />
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
