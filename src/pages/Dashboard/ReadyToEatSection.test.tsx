import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReadyToEatSection } from './ReadyToEatSection';

const mockDispatch = vi.fn();

vi.mock('../../hooks/useAppState', () => ({
  useAppState: () => ({
    state: {
      customKnownItems: { fresh: [], frozen: [], dry: [] },
      inventory: {
        fresh: [
          { id: '1', name: 'Paneer Tikka', quantity: 2, addedDate: '2025-01-15' },
          { id: '2', name: 'Egg', quantity: 12, addedDate: '2025-01-15' },
        ],
        frozen: [
          { id: '3', name: 'Dal Makhani', quantity: 3, addedDate: '2025-01-15' },
        ],
        dry: [],
      },
    },
    dispatch: mockDispatch,
  }),
  getMergedKnownItems: () => ({
    fresh: [
      { name: 'Paneer Tikka', typicalQty: 2, usages: ['meal'] },
      { name: 'Egg', typicalQty: 12, usages: ['ingredient'] },
    ],
    frozen: [
      { name: 'Dal Makhani', typicalQty: 3, usages: ['meal'] },
    ],
    dry: [],
  }),
}));

describe('ReadyToEatSection', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-15'));
    mockDispatch.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the Ready to Eat heading', () => {
    render(<ReadyToEatSection />);
    expect(screen.getByText('Ready to Eat')).toBeInTheDocument();
  });

  it('shows only meal items, not ingredients', () => {
    render(<ReadyToEatSection />);

    // Meal items should be visible
    expect(screen.getByText('Paneer Tikka')).toBeInTheDocument();
    expect(screen.getByText('Dal Makhani')).toBeInTheDocument();

    // Ingredient-only items should NOT be visible
    expect(screen.queryByText('Egg')).not.toBeInTheDocument();
  });

  it('groups items by section (Fresh, Frozen, Dry)', () => {
    render(<ReadyToEatSection />);

    expect(screen.getByText('Fresh')).toBeInTheDocument();
    expect(screen.getByText('Frozen')).toBeInTheDocument();
  });

  it('collapses and expands sections', () => {
    render(<ReadyToEatSection />);

    // Initially expanded - items should be visible
    expect(screen.getByText('Paneer Tikka')).toBeInTheDocument();

    // Click to collapse Fresh section
    fireEvent.click(screen.getByText('Fresh'));

    // Item should no longer be visible
    expect(screen.queryByText('Paneer Tikka')).not.toBeInTheDocument();

    // Click again to expand
    fireEvent.click(screen.getByText('Fresh'));

    // Item should be visible again
    expect(screen.getByText('Paneer Tikka')).toBeInTheDocument();
  });
});
