import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FoodItem } from './FoodItem';
import type { InventoryItem } from '../../types';

vi.mock('../../hooks/useAppState', () => ({
  useAppState: () => ({
    dispatch: vi.fn(),
  }),
}));

describe('FoodItem', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-15'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const baseItem: InventoryItem = {
    id: '1',
    name: 'Test Item',
    quantity: 5,
    addedDate: '2025-01-15',
  };

  it('renders item without expiry date (no expiry indicator)', () => {
    render(<FoodItem item={baseItem} section="fresh" />);

    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.queryByText(/Expires:/)).not.toBeInTheDocument();
    expect(screen.queryByText('Expired')).not.toBeInTheDocument();
  });

  it('renders expired item with red indicator', () => {
    const expiredItem: InventoryItem = {
      ...baseItem,
      expiryDate: '2025-01-14',
    };

    render(<FoodItem item={expiredItem} section="fresh" />);

    const expiredText = screen.getByText('Expired');
    expect(expiredText).toBeInTheDocument();
    expect(expiredText).toHaveClass('text-danger');
  });

  it('renders expiring-soon item with amber indicator', () => {
    const expiringSoonItem: InventoryItem = {
      ...baseItem,
      expiryDate: '2025-01-17',
    };

    render(<FoodItem item={expiringSoonItem} section="fresh" />);

    const expiryText = screen.getByText(/Expires:/);
    expect(expiryText).toBeInTheDocument();
    expect(expiryText).toHaveClass('text-warning');
  });

  it('renders normal expiry with gray text', () => {
    const okItem: InventoryItem = {
      ...baseItem,
      expiryDate: '2025-01-25',
    };

    render(<FoodItem item={okItem} section="fresh" />);

    const expiryText = screen.getByText(/Expires:/);
    expect(expiryText).toBeInTheDocument();
    expect(expiryText).toHaveClass('text-text-light');
  });
});
