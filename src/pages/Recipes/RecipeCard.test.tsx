import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RecipeCard } from './RecipeCard';
import type { RecipeMatch } from '../../types';

describe('RecipeCard', () => {
  const baseMatch: RecipeMatch = {
    recipe: {
      id: 'test-recipe',
      name: 'Test Recipe',
      prepTimeMinutes: 20,
      ingredients: [
        { name: 'Ingredient 1', required: true },
        { name: 'Ingredient 2', required: false },
      ],
    },
    status: 'full',
    availableIngredients: ['Ingredient 1', 'Ingredient 2'],
    missingRequired: [],
    missingOptional: [],
  };

  it('renders recipe name', () => {
    render(<RecipeCard match={baseMatch} />);
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
  });

  it('renders ingredient count', () => {
    render(<RecipeCard match={baseMatch} />);
    expect(screen.getByText('2 ingredients')).toBeInTheDocument();
  });

  it('renders nutrition badges when recipe has nutritionTags', () => {
    const matchWithTags: RecipeMatch = {
      ...baseMatch,
      recipe: {
        ...baseMatch.recipe,
        nutritionTags: ['high-protein', 'high-fiber'],
      },
    };

    render(<RecipeCard match={matchWithTags} />);
    expect(screen.getByTitle('High Protein')).toBeInTheDocument();
    expect(screen.getByTitle('High Fiber')).toBeInTheDocument();
  });

  it('does not render nutrition badges when recipe has no nutritionTags', () => {
    render(<RecipeCard match={baseMatch} />);
    expect(screen.queryByTitle('High Fiber')).not.toBeInTheDocument();
    expect(screen.queryByTitle('High Protein')).not.toBeInTheDocument();
  });

  it('renders single nutrition badge correctly', () => {
    const matchWithSingleTag: RecipeMatch = {
      ...baseMatch,
      recipe: {
        ...baseMatch.recipe,
        nutritionTags: ['high-fiber'],
      },
    };

    render(<RecipeCard match={matchWithSingleTag} />);
    expect(screen.getByTitle('High Fiber')).toBeInTheDocument();
    expect(screen.queryByTitle('High Protein')).not.toBeInTheDocument();
  });

  it('renders available ingredients with checkmark', () => {
    render(<RecipeCard match={baseMatch} />);
    expect(screen.getByText('Ingredient 1')).toBeInTheDocument();
    expect(screen.getByText('Ingredient 2')).toBeInTheDocument();
  });

  it('renders missing required ingredients', () => {
    const partialMatch: RecipeMatch = {
      ...baseMatch,
      status: 'partial',
      availableIngredients: ['Ingredient 1'],
      missingRequired: ['Ingredient 2'],
    };

    render(<RecipeCard match={partialMatch} />);
    expect(screen.getByText('Ingredient 2')).toBeInTheDocument();
    expect(screen.getByText('Need: Ingredient 2')).toBeInTheDocument();
  });
});
