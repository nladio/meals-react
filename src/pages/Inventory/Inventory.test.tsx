import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Inventory } from './index';

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
        dry: [
          { id: '4', name: 'Rice', quantity: 5, addedDate: '2025-01-15' },
        ],
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
    dry: [
      { name: 'Rice', typicalQty: 5, usages: ['ingredient'] },
    ],
  }),
  getTotalServings: () => 22,
}));

describe('Inventory page', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-15'));
    mockDispatch.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the Inventory title', () => {
    render(<Inventory />);
    expect(screen.getByText('Inventory')).toBeInTheDocument();
  });

  it('shows total servings summary', () => {
    render(<Inventory />);
    expect(screen.getByText('Total Food Available')).toBeInTheDocument();
    expect(screen.getByText('22 servings')).toBeInTheDocument();
  });

  it('shows all three sections', () => {
    render(<Inventory />);

    expect(screen.getByText('Fresh Food')).toBeInTheDocument();
    expect(screen.getByText('Frozen Food')).toBeInTheDocument();
    expect(screen.getByText('Dry/Pantry')).toBeInTheDocument();
  });

  it('shows ALL items including ingredients', () => {
    render(<Inventory />);

    // Meal items
    expect(screen.getByText('Paneer Tikka')).toBeInTheDocument();
    expect(screen.getByText('Dal Makhani')).toBeInTheDocument();

    // Ingredient items (should be visible on Inventory page)
    expect(screen.getByText('Egg')).toBeInTheDocument();
    expect(screen.getByText('Rice')).toBeInTheDocument();
  });

  it('shows Add Item buttons for each section', () => {
    render(<Inventory />);

    const addButtons = screen.getAllByRole('button', { name: /Add Item/i });
    expect(addButtons).toHaveLength(3); // One for each section
  });
});
