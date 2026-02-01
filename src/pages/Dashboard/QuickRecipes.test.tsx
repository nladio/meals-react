import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuickRecipes } from './QuickRecipes';

vi.mock('../../hooks/useAppState', () => ({
  useAppState: () => ({
    state: {
      customKnownItems: { fresh: [], frozen: [], dry: [] },
      inventory: {
        fresh: [
          { id: '1', name: 'Egg', quantity: 12, addedDate: '2025-01-15' },
          { id: '2', name: 'Onion', quantity: 3, addedDate: '2025-01-15' },
        ],
        frozen: [],
        dry: [
          { id: '3', name: 'Toor Dal', quantity: 1, addedDate: '2025-01-15' },
        ],
      },
    },
    dispatch: vi.fn(),
  }),
  getMergedKnownItems: () => ({
    fresh: [],
    frozen: [],
    dry: [],
  }),
}));

describe('QuickRecipes', () => {
  it('renders the Cook heading with time subtitle', () => {
    render(<QuickRecipes />);
    expect(screen.getByText('Cook')).toBeInTheDocument();
    expect(screen.getByText('(16+ min)')).toBeInTheDocument();
  });

  it('shows only ready recipes (full match)', () => {
    render(<QuickRecipes />);

    // Omelette and Half Fried Egg only need Egg - should show
    expect(screen.getByText('Omelette')).toBeInTheDocument();
    expect(screen.getByText('Half Fried Egg')).toBeInTheDocument();

    // Egg Bhurji needs Egg and Onion (both available) - should show
    expect(screen.getByText('Egg Bhurji')).toBeInTheDocument();

    // Dal Tadka only needs Toor Dal (available) - should show
    expect(screen.getByText('Dal Tadka')).toBeInTheDocument();
  });

  it('does not show partial match recipes', () => {
    render(<QuickRecipes />);

    // Veg Sandwich needs many ingredients we don't have - should NOT show
    expect(screen.queryByText('Veg Sandwich')).not.toBeInTheDocument();
  });

  it('collapses and expands the section', () => {
    render(<QuickRecipes />);

    // Initially expanded
    expect(screen.getByText('Omelette')).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(screen.getByText('Cook'));

    // Recipes should be hidden
    expect(screen.queryByText('Omelette')).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(screen.getByText('Cook'));

    // Recipes should be visible again
    expect(screen.getByText('Omelette')).toBeInTheDocument();
  });

  it('shows link to full recipes page', () => {
    render(<QuickRecipes />);

    const link = screen.getByText(/View all recipes/);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#recipes');
  });

  it('shows prep time for each recipe', () => {
    render(<QuickRecipes />);
    // Multiple recipes show 20 min (Omelette, Half Fried Egg, Egg Bhurji)
    const prepTimes = screen.getAllByText('20 min');
    expect(prepTimes.length).toBeGreaterThan(0);
  });
});
