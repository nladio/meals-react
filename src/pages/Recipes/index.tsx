import { useAppState } from '../../hooks/useAppState';
import { defaultRecipes } from '../../data/recipes';
import { getAllRecipeMatches } from '../../utils/recipeMatching';
import { RecipeCard } from './RecipeCard';

export function Recipes() {
  const { state } = useAppState();
  const matches = getAllRecipeMatches(defaultRecipes, state);

  const fullMatches = matches.filter(m => m.status === 'full');
  const partialMatches = matches.filter(m => m.status === 'partial');
  const noneMatches = matches.filter(m => m.status === 'none');

  return (
    <div>
      {/* Header */}
      <header className="flex items-center gap-3 mb-6">
        <a
          href="#dashboard"
          className="text-2xl text-gray-600 no-underline hover:text-gray-800"
          aria-label="Back to dashboard"
        >
          ←
        </a>
        <h1 className="text-[28px] font-bold text-primary">Recipes</h1>
      </header>

      {/* Summary Card */}
      <section className="bg-white rounded-[12px] p-5 mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
        <div className="flex justify-between items-center p-4 rounded-sm bg-green-50 border border-success">
          <span className="font-medium text-gray-600">Recipes You Can Make</span>
          <span className="font-semibold text-base">{fullMatches.length}</span>
        </div>
      </section>

      {/* Ready to Make */}
      {fullMatches.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Ready to Make</h2>
          <div className="flex flex-col gap-3">
            {fullMatches.map(match => (
              <RecipeCard key={match.recipe.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {/* Almost There */}
      {partialMatches.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Almost There</h2>
          <div className="flex flex-col gap-3">
            {partialMatches.map(match => (
              <RecipeCard key={match.recipe.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {/* Need Ingredients */}
      {noneMatches.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Need Ingredients</h2>
          <div className="flex flex-col gap-3">
            {noneMatches.map(match => (
              <RecipeCard key={match.recipe.id} match={match} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
