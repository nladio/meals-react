import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Recipes } from './index';

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
}));

describe('RecipeSection', () => {
  it('displays count badge with number of recipes', () => {
    render(<Recipes />);

    // Check that count badges are visible (format: "Title (count)")
    const readySection = screen.getByRole('button', { name: /ready to make/i });
    expect(readySection).toHaveTextContent(/\(\d+\)/);
  });

  it('sections are expanded by default', () => {
    render(<Recipes />);

    const readyButton = screen.getByRole('button', { name: /ready to make/i });
    expect(readyButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('collapses section when header is clicked', () => {
    render(<Recipes />);

    const readyButton = screen.getByRole('button', { name: /ready to make/i });
    expect(readyButton).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(readyButton);

    expect(readyButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('expands section when collapsed header is clicked', () => {
    render(<Recipes />);

    const readyButton = screen.getByRole('button', { name: /ready to make/i });

    // Collapse first
    fireEvent.click(readyButton);
    expect(readyButton).toHaveAttribute('aria-expanded', 'false');

    // Expand again
    fireEvent.click(readyButton);
    expect(readyButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('has proper aria-controls linking header to content', () => {
    render(<Recipes />);

    const readyButton = screen.getByRole('button', { name: /ready to make/i });
    const controlsId = readyButton.getAttribute('aria-controls');

    expect(controlsId).toBeTruthy();
    expect(document.getElementById(controlsId!)).toBeInTheDocument();
  });

  it('hides recipe cards when section is collapsed', () => {
    render(<Recipes />);

    const readyButton = screen.getByRole('button', { name: /ready to make/i });
    const controlsId = readyButton.getAttribute('aria-controls');

    expect(document.getElementById(controlsId!)).toBeInTheDocument();

    fireEvent.click(readyButton);

    // Content should be removed from DOM when collapsed
    expect(document.getElementById(controlsId!)).not.toBeInTheDocument();
  });

  it('shows recipe cards in section content', () => {
    render(<Recipes />);

    // With Egg, Onion, and Toor Dal, we should have recipes ready
    // Omelette only needs Egg
    expect(screen.getByText('Omelette')).toBeInTheDocument();
  });
});
