import { useState } from 'react';
import type { RecipeMatch } from '../../types';
import { useAppState } from '../../hooks/useAppState';
import { defaultRecipes } from '../../data/recipes';
import { getAllRecipeMatches } from '../../utils/recipeMatching';
import { PageHeader } from '../../components/PageHeader';
import { RecipeCard } from './RecipeCard';

function NutritionLegend() {
  return (
    <div className="flex items-center gap-4 mb-4 text-xs text-text-muted">
      <span className="font-medium">Legend:</span>
      <div className="flex items-center gap-1.5">
        <span className="w-4 h-4 rounded bg-protein-light border border-protein-border"></span>
        <span>Protein</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-4 h-4 rounded bg-fiber-light border border-fiber-border"></span>
        <span>Fiber</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-4 h-4 rounded bg-both-light border border-both-border"></span>
        <span>Both</span>
      </div>
    </div>
  );
}

interface RecipeSectionProps {
  title: string;
  matches: RecipeMatch[];
}

function RecipeSection({ title, matches }: RecipeSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const sectionId = `recipe-section-${title.toLowerCase().replace(/\s+/g, '-')}`;

  if (matches.length === 0) return null;

  return (
    <section className="mb-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={sectionId}
        className="flex items-center gap-2 w-full text-left mb-3 group"
      >
        <span
          className={`text-text-muted transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
        >
          ▶
        </span>
        <h2 className="text-lg font-semibold text-text">
          {title}
          <span className="ml-2 text-sm font-normal text-text-muted">({matches.length})</span>
        </h2>
      </button>
      {isExpanded && (
        <div id={sectionId} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {matches.map(match => (
            <RecipeCard key={match.recipe.id} match={match} />
          ))}
        </div>
      )}
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
      <NutritionLegend />

      <section className="bg-white rounded-[12px] p-5 mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
        <div className="flex justify-between items-center p-4 rounded-sm bg-success/10 border border-success">
          <span className="font-medium text-text-muted">Recipes You Can Make</span>
          <span className="font-semibold text-base">{fullMatches.length}</span>
        </div>
      </section>

      <RecipeSection title="Ready to Make" matches={fullMatches} />
      <RecipeSection title="Almost There" matches={partialMatches} />
      <RecipeSection title="Need Ingredients" matches={noneMatches} />
    </div>
  );
}
