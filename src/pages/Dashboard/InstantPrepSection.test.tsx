import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InstantPrepSection } from './InstantPrepSection';

const mockDispatch = vi.fn();

vi.mock('../../hooks/useAppState', () => ({
  useAppState: () => ({
    state: {
      customKnownItems: { fresh: [], frozen: [], dry: [] },
      inventory: {
        fresh: [
          { id: '1', name: 'Paneer Curry', quantity: 2, addedDate: '2025-01-15' },
        ],
        frozen: [
          { id: '2', name: 'TJs Orange Chicken', quantity: 1, addedDate: '2025-01-15' },
          { id: '3', name: 'Frozen Parathas', quantity: 3, addedDate: '2025-01-15' },
        ],
        dry: [
          { id: '4', name: 'Maggi Noodles', quantity: 4, addedDate: '2025-01-15' },
        ],
      },
    },
    dispatch: mockDispatch,
  }),
  getMergedKnownItems: () => ({
    fresh: [
      { name: 'Paneer Curry', typicalQty: 2, usages: ['meal'], prepTimeMinutes: 3 },
    ],
    frozen: [
      { name: 'TJs Orange Chicken', typicalQty: 2, usages: ['meal'], prepTimeMinutes: 12 },
      { name: 'Frozen Parathas', typicalQty: 1, usages: ['meal'], prepTimeMinutes: 8 },
    ],
    dry: [
      { name: 'Maggi Noodles', typicalQty: 8, usages: ['meal'], prepTimeMinutes: 6 },
    ],
  }),
}));

describe('InstantPrepSection', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-15'));
    mockDispatch.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders Instant Prep heading with time subtitle', () => {
    render(<InstantPrepSection />);
    expect(screen.getByText('Instant Prep')).toBeInTheDocument();
    expect(screen.getByText('(6-15 min)')).toBeInTheDocument();
  });

  it('shows only items with prepTimeMinutes 6-15', () => {
    render(<InstantPrepSection />);

    // TJs Orange Chicken (12 min) should be visible
    expect(screen.getByText('TJs Orange Chicken')).toBeInTheDocument();

    // Frozen Parathas (8 min) should be visible
    expect(screen.getByText('Frozen Parathas')).toBeInTheDocument();

    // Maggi Noodles (6 min) should be visible
    expect(screen.getByText('Maggi Noodles')).toBeInTheDocument();

    // Paneer Curry (3 min) should NOT be here - it's Quick Reheat
    expect(screen.queryByText('Paneer Curry')).not.toBeInTheDocument();
  });

  it('collapses and expands section', () => {
    render(<InstantPrepSection />);

    // Initially expanded
    expect(screen.getByText('TJs Orange Chicken')).toBeInTheDocument();

    // Click header to collapse
    fireEvent.click(screen.getByText('Instant Prep'));

    // Items should no longer be visible
    expect(screen.queryByText('TJs Orange Chicken')).not.toBeInTheDocument();

    // Click again to expand
    fireEvent.click(screen.getByText('Instant Prep'));

    // Items visible again
    expect(screen.getByText('TJs Orange Chicken')).toBeInTheDocument();
  });

  it('shows prep time for each item', () => {
    render(<InstantPrepSection />);
    expect(screen.getByText('12 min')).toBeInTheDocument();
    expect(screen.getByText('8 min')).toBeInTheDocument();
    expect(screen.getByText('6 min')).toBeInTheDocument();
  });

  it('does not show increment/decrement buttons', () => {
    render(<InstantPrepSection />);
    // Only button should be the section header toggle
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(1);
    expect(buttons[0]).toHaveTextContent('Instant Prep');
  });
});
