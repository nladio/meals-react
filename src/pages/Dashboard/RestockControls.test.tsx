import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RestockControls } from './RestockControls';

const mockDispatch = vi.fn();

vi.mock('../../hooks/useAppState', () => ({
  useAppState: () => ({
    state: {
      knownItems: {
        fresh: [{ name: 'Test Item', lastBought: null, typicalQty: 1 }],
        frozen: [],
        dry: [],
      },
      inventory: { fresh: [], frozen: [], dry: [] },
    },
    dispatch: mockDispatch,
  }),
}));

describe('RestockControls', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('renders date input field', () => {
    render(<RestockControls section="fresh" />);

    const dateInput = screen.getByTitle('Expiry date (optional)');
    expect(dateInput).toBeInTheDocument();
    expect(dateInput).toHaveAttribute('type', 'date');
    expect(dateInput).toHaveValue('');
  });

  it('includes expiryDate in dispatch when date is set', () => {
    render(<RestockControls section="fresh" />);

    // Select the item
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Test Item' } });

    // Set the expiry date
    const dateInput = screen.getByTitle('Expiry date (optional)');
    fireEvent.change(dateInput, { target: { value: '2025-02-15' } });

    // Click add button
    const addButton = screen.getByRole('button', { name: 'Add' });
    fireEvent.click(addButton);

    // Check that ADD_TO_INVENTORY was dispatched with expiryDate
    const addToInventoryCall = mockDispatch.mock.calls.find(
      (call) => call[0].type === 'ADD_TO_INVENTORY'
    );
    expect(addToInventoryCall).toBeDefined();
    expect(addToInventoryCall[0].expiryDate).toBe('2025-02-15');
  });

  it('sends undefined expiryDate when date input is empty', () => {
    render(<RestockControls section="fresh" />);

    // Select the item
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Test Item' } });

    // Don't set expiry date (leave it empty)

    // Click add button
    const addButton = screen.getByRole('button', { name: 'Add' });
    fireEvent.click(addButton);

    // Check that ADD_TO_INVENTORY was dispatched with undefined expiryDate
    const addToInventoryCall = mockDispatch.mock.calls.find(
      (call) => call[0].type === 'ADD_TO_INVENTORY'
    );
    expect(addToInventoryCall).toBeDefined();
    expect(addToInventoryCall[0].expiryDate).toBeUndefined();
  });
});
