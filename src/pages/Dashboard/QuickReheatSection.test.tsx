import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuickReheatSection } from './QuickReheatSection';

const mockDispatch = vi.fn();

vi.mock('../../hooks/useAppState', () => ({
  useAppState: () => ({
    state: {
      customKnownItems: { fresh: [], frozen: [], dry: [] },
      inventory: {
        fresh: [
          { id: '1', name: 'Paneer Curry', quantity: 2, addedDate: '2025-01-15' },
          { id: '2', name: 'Onion', quantity: 3, addedDate: '2025-01-15' },
        ],
        frozen: [
          { id: '3', name: 'TJs Orange Chicken', quantity: 1, addedDate: '2025-01-15' },
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
      { name: 'Onion', typicalQty: 1, usages: ['ingredient'] },
    ],
    frozen: [
      { name: 'TJs Orange Chicken', typicalQty: 2, usages: ['meal'], prepTimeMinutes: 12 },
    ],
    dry: [
      { name: 'Maggi Noodles', typicalQty: 8, usages: ['meal'], prepTimeMinutes: 6 },
    ],
  }),
}));

describe('QuickReheatSection', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-15'));
    mockDispatch.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders Quick Reheat heading with time subtitle', () => {
    render(<QuickReheatSection />);
    expect(screen.getByText('Quick Reheat')).toBeInTheDocument();
    expect(screen.getByText('(0-5 min)')).toBeInTheDocument();
  });

  it('shows only items with prepTimeMinutes <= 5', () => {
    render(<QuickReheatSection />);

    // Paneer Curry (3 min) should be visible
    expect(screen.getByText('Paneer Curry')).toBeInTheDocument();

    // TJs Orange Chicken (12 min) should NOT be here
    expect(screen.queryByText('TJs Orange Chicken')).not.toBeInTheDocument();

    // Maggi Noodles (6 min) should NOT be here
    expect(screen.queryByText('Maggi Noodles')).not.toBeInTheDocument();
  });

  it('excludes ingredient-only items', () => {
    render(<QuickReheatSection />);

    // Onion (ingredient only) should NOT be visible
    expect(screen.queryByText('Onion')).not.toBeInTheDocument();
  });

  it('shows total quantity badge', () => {
    render(<QuickReheatSection />);

    // Paneer Curry has quantity 2 - look for the header badge specifically
    const headerBadge = screen.getAllByText('2').find(el =>
      el.classList.contains('bg-gray-100')
    );
    expect(headerBadge).toBeInTheDocument();
  });

  it('collapses and expands section', () => {
    render(<QuickReheatSection />);

    // Initially expanded - item should be visible
    expect(screen.getByText('Paneer Curry')).toBeInTheDocument();

    // Click header to collapse
    fireEvent.click(screen.getByText('Quick Reheat'));

    // Item should no longer be visible
    expect(screen.queryByText('Paneer Curry')).not.toBeInTheDocument();

    // Click again to expand
    fireEvent.click(screen.getByText('Quick Reheat'));

    // Item should be visible again
    expect(screen.getByText('Paneer Curry')).toBeInTheDocument();
  });

  it('shows prep time for each item', () => {
    render(<QuickReheatSection />);
    expect(screen.getByText('3 min')).toBeInTheDocument();
  });

  it('shows read-only quantity indicator', () => {
    render(<QuickReheatSection />);
    expect(screen.getByText('×2')).toBeInTheDocument();
  });

  it('does not show increment/decrement buttons', () => {
    render(<QuickReheatSection />);
    // Only button should be the section header toggle
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(1);
    expect(buttons[0]).toHaveTextContent('Quick Reheat');
  });
});
