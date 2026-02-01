import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddItemModal } from './AddItemModal';

const mockDispatch = vi.fn();

vi.mock('../../hooks/useAppState', () => ({
  useAppState: () => ({
    state: {
      customKnownItems: { fresh: [], frozen: [], dry: [] },
      inventory: { fresh: [], frozen: [], dry: [] },
    },
    dispatch: mockDispatch,
  }),
  getMergedKnownItems: () => ({
    fresh: [
      { name: 'Egg', typicalQty: 24, usages: ['ingredient'], ingredientCategory: 'protein', defaultExpiryDays: 21 },
      { name: 'Spinach', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce', defaultExpiryDays: 5 },
      { name: 'CustomItem', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce' }, // no defaultExpiryDays
    ],
    frozen: [],
    dry: [],
  }),
}));

describe('AddItemModal - defaultExpiryDays', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-15'));
    mockDispatch.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('sets expiry date based on defaultExpiryDays when item is selected', () => {
    const mockOnAdd = vi.fn();
    render(<AddItemModal section="fresh" isOpen={true} onClose={() => {}} onAdd={mockOnAdd} />);

    // Click on Egg (21 days expiry)
    const eggButton = screen.getByRole('button', { name: 'Egg' });
    fireEvent.click(eggButton);

    // Check the date input has the calculated expiry (2025-01-15 + 21 days = 2025-02-05)
    const dateInput = screen.getByDisplayValue('2025-02-05');
    expect(dateInput).toBeInTheDocument();
  });

  it('clears expiry date when selecting item without defaultExpiryDays', () => {
    const mockOnAdd = vi.fn();
    render(<AddItemModal section="fresh" isOpen={true} onClose={() => {}} onAdd={mockOnAdd} />);

    // First select Egg (has expiry)
    fireEvent.click(screen.getByRole('button', { name: 'Egg' }));
    expect(screen.getByDisplayValue('2025-02-05')).toBeInTheDocument();

    // Then select CustomItem (no expiry)
    fireEvent.click(screen.getByRole('button', { name: 'CustomItem' }));

    // Expiry should be cleared - date input should have empty value
    const dateInput = screen.getByLabelText(/expiry/i) as HTMLInputElement;
    expect(dateInput.value).toBe('');
  });

  it('calculates different expiry dates for different items', () => {
    const mockOnAdd = vi.fn();
    render(<AddItemModal section="fresh" isOpen={true} onClose={() => {}} onAdd={mockOnAdd} />);

    // Click on Spinach (5 days expiry)
    fireEvent.click(screen.getByRole('button', { name: 'Spinach' }));

    // Check the date input (2025-01-15 + 5 days = 2025-01-20)
    expect(screen.getByDisplayValue('2025-01-20')).toBeInTheDocument();
  });
});
