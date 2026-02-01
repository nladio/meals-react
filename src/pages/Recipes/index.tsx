import type { RecipeMatch } from '../../types';
import { useAppState } from '../../hooks/useAppState';
import { defaultRecipes } from '../../data/recipes';
import { getAllRecipeMatches } from '../../utils/recipeMatching';
import { PageHeader } from '../../components/PageHeader';
import { RecipeCard } from './RecipeCard';

interface RecipeSectionProps {
  title: string;
  matches: RecipeMatch[];
}

function RecipeSection({ title, matches }: RecipeSectionProps) {
  if (matches.length === 0) return null;

  return (
    <section className="mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">{title}</h2>
      <div className="flex flex-col gap-3">
        {matches.map(match => (
          <RecipeCard key={match.recipe.id} match={match} />
        ))}
      </div>
    </section>
  );
}

export function Recipes() {
  const { state } = useAppState();
  const matches = getAllRecipeMatches(defaultRecipes, state);

  const fullMatches = matches.filter(m => m.status === 'full');
  const partialMatches = matches.filter(m => m.status === 'partial');
  const noneMatches = matches.filter(m => m.status === 'none');

  return (
    <div>
      <PageHeader title="Recipes" />

      <section className="bg-white rounded-[12px] p-5 mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
        <div className="flex justify-between items-center p-4 rounded-sm bg-green-50 border border-success">
          <span className="font-medium text-gray-600">Recipes You Can Make</span>
          <span className="font-semibold text-base">{fullMatches.length}</span>
        </div>
      </section>

      <RecipeSection title="Ready to Make" matches={fullMatches} />
      <RecipeSection title="Almost There" matches={partialMatches} />
      <RecipeSection title="Need Ingredients" matches={noneMatches} />
    </div>
  );
}
