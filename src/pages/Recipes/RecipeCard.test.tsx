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

  it('renders prep time', () => {
    render(<RecipeCard match={baseMatch} />);
    expect(screen.getByText('20 min')).toBeInTheDocument();
  });

  it('applies violet background for recipes with both protein and fiber', () => {
    const matchWithBothTags: RecipeMatch = {
      ...baseMatch,
      recipe: {
        ...baseMatch.recipe,
        nutritionTags: ['high-protein', 'high-fiber'],
      },
    };

    const { container } = render(<RecipeCard match={matchWithBothTags} />);
    expect(container.firstChild).toHaveClass('bg-violet-50');
  });

  it('applies white background when recipe has no nutritionTags', () => {
    const { container } = render(<RecipeCard match={baseMatch} />);
    expect(container.firstChild).toHaveClass('bg-white');
  });

  it('applies green background for high-fiber recipe', () => {
    const matchWithFiberTag: RecipeMatch = {
      ...baseMatch,
      recipe: {
        ...baseMatch.recipe,
        nutritionTags: ['high-fiber'],
      },
    };

    const { container } = render(<RecipeCard match={matchWithFiberTag} />);
    expect(container.firstChild).toHaveClass('bg-green-100');
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
