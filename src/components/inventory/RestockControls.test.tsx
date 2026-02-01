import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RestockControls } from './RestockControls';

const mockDispatch = vi.fn();

vi.mock('../../hooks/useAppState', () => ({
  useAppState: () => ({
    state: {
      customKnownItems: {
        fresh: [],
        frozen: [],
        dry: [],
      },
      inventory: { fresh: [], frozen: [], dry: [] },
    },
    dispatch: mockDispatch,
  }),
  getMergedKnownItems: () => ({
    fresh: [{ name: 'Test Item', lastBought: null, typicalQty: 1, usages: ['meal'], isDefault: true, defaultExpiryDays: 7 }],
    frozen: [],
    dry: [],
  }),
}));

describe('RestockControls', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-15'));
    mockDispatch.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders Add Item button', () => {
    render(<RestockControls section="fresh" />);

    const addButton = screen.getByRole('button', { name: '+ Add Item' });
    expect(addButton).toBeInTheDocument();
  });

  it('opens modal when Add Item is clicked', () => {
    render(<RestockControls section="fresh" />);

    const addButton = screen.getByRole('button', { name: '+ Add Item' });
    fireEvent.click(addButton);

    // Modal should open with the item available
    expect(screen.getByText('Add to Fresh Food')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Test Item' })).toBeInTheDocument();
  });

  it('dispatches ADD_TO_INVENTORY with expiryDate when item is added from modal', () => {
    render(<RestockControls section="fresh" />);

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: '+ Add Item' }));

    // Select item (this should also set the expiry date based on defaultExpiryDays)
    fireEvent.click(screen.getByRole('button', { name: 'Test Item' }));

    // Add the item
    fireEvent.click(screen.getByRole('button', { name: 'Add Test Item' }));

    // Check that both RECORD_PURCHASE and ADD_TO_INVENTORY were dispatched
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'RECORD_PURCHASE',
      })
    );

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'ADD_TO_INVENTORY',
        section: 'fresh',
        name: 'Test Item',
        qty: 1,
        expiryDate: '2025-01-22', // 2025-01-15 + 7 days
      })
    );
  });
});
