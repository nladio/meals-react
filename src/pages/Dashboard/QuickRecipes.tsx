import { useState } from 'react';
import { useAppState } from '../../hooks/useAppState';
import { defaultRecipes } from '../../data/recipes';
import { getAllRecipeMatches } from '../../utils/recipeMatching';
import type { NutritionTag, Recipe } from '../../types';

function getNutritionBgColor(tags?: NutritionTag[]): string {
  if (!tags || tags.length === 0) return 'bg-gray-100';

  const hasProtein = tags.includes('high-protein');
  const hasFiber = tags.includes('high-fiber');

  if (hasProtein && hasFiber) return 'bg-both-light';
  if (hasProtein) return 'bg-protein-light';
  if (hasFiber) return 'bg-fiber-light';
  return 'bg-gray-100';
}

function CompactRecipeCard({ recipe }: { recipe: Recipe }) {
  const bgColor = getNutritionBgColor(recipe.nutritionTags);

  return (
    <div className={`flex items-center gap-3 p-3 rounded-sm ${bgColor} border-l-[3px] border-l-primary transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99]`}>
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
    <section className="bg-white rounded-[12px] p-5 mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-shadow">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-lg hover:from-gray-100 hover:to-gray-50 transition-all active:scale-[0.99] text-left"
      >
        <div className="flex items-center gap-2">
          <span
            className={`text-primary/60 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          >
            ▶
          </span>
          <h2 className="text-base font-semibold text-gray-700 uppercase tracking-wide">
            Cook
          </h2>
          <span className="text-xs text-gray-400 font-normal">(16+ min)</span>
        </div>
        <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
          {readyRecipes.length}
        </span>
      </button>

      {isExpanded && (
        <div className="mt-4 flex flex-col gap-2 animate-slide-down">
          {readyRecipes.map(recipe => (
            <CompactRecipeCard key={recipe.id} recipe={recipe} />
          ))}

          <a
            href="#recipes"
            className="text-center text-sm text-primary hover:underline mt-2 transition-colors"
          >
            View all recipes →
          </a>
        </div>
      )}
    </section>
  );
}
