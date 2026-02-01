import type { AppState, Recipe, RecipeMatch, MatchStatus } from '../types';

/**
 * Returns a Set of inventory item names that have quantity > 0
 */
export function getAvailableIngredients(state: AppState): Set<string> {
  const available = new Set<string>();

  for (const section of ['fresh', 'frozen', 'dry'] as const) {
    for (const item of state.inventory[section]) {
      if (item.quantity > 0) {
        available.add(item.name);
      }
    }
  }

  return available;
}

/**
 * Returns a RecipeMatch for a single recipe given available ingredients
 */
export function getRecipeMatch(recipe: Recipe, available: Set<string>): RecipeMatch {
  const availableIngredients: string[] = [];
  const missingRequired: string[] = [];
  const missingOptional: string[] = [];

  for (const ingredient of recipe.ingredients) {
    if (available.has(ingredient.name)) {
      availableIngredients.push(ingredient.name);
    } else if (ingredient.required) {
      missingRequired.push(ingredient.name);
    } else {
      missingOptional.push(ingredient.name);
    }
  }

  let status: MatchStatus;
  if (missingRequired.length === 0) {
    status = 'full';
  } else if (availableIngredients.length > 0) {
    status = 'partial';
  } else {
    status = 'none';
  }

  return {
    recipe,
    status,
    availableIngredients,
    missingRequired,
    missingOptional,
  };
}

/**
 * Returns all recipe matches sorted by status (full first, then partial, then none)
 */
export function getAllRecipeMatches(recipes: Recipe[], state: AppState): RecipeMatch[] {
  const available = getAvailableIngredients(state);

  const matches = recipes.map(recipe => getRecipeMatch(recipe, available));

  const statusOrder: Record<MatchStatus, number> = {
    full: 0,
    partial: 1,
    none: 2,
  };

  return matches.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
}
