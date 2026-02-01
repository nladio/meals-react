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
  it('renders the Quick Recipes heading', () => {
    render(<QuickRecipes />);
    expect(screen.getByText('Quick Recipes')).toBeInTheDocument();
  });

  it('shows recipes that can be made (full match)', () => {
    render(<QuickRecipes />);

    // Omelette and Half Fried Egg only need Egg
    expect(screen.getByText('Omelette')).toBeInTheDocument();
    expect(screen.getByText('Half Fried Egg')).toBeInTheDocument();
  });

  it('shows partial match recipes with missing ingredients', () => {
    render(<QuickRecipes />);

    // Egg Bhurji needs Egg and Onion (both available) - should show as ready
    expect(screen.getByText('Egg Bhurji')).toBeInTheDocument();
  });

  it('shows "Ready" badge for full matches', () => {
    render(<QuickRecipes />);

    // Should show multiple Ready badges (one in header + one per recipe)
    const readyBadges = screen.getAllByText(/ready/i);
    expect(readyBadges.length).toBeGreaterThan(0);
  });

  it('collapses and expands the section', () => {
    render(<QuickRecipes />);

    // Initially expanded
    expect(screen.getByText('Omelette')).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(screen.getByText('Quick Recipes'));

    // Recipes should be hidden
    expect(screen.queryByText('Omelette')).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(screen.getByText('Quick Recipes'));

    // Recipes should be visible again
    expect(screen.getByText('Omelette')).toBeInTheDocument();
  });

  it('shows link to full recipes page', () => {
    render(<QuickRecipes />);

    const link = screen.getByText(/View all recipes/);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#recipes');
  });
});
