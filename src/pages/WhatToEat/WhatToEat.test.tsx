import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WhatToEat } from './index';
import type { AppState } from '../../types';

const mockState: AppState = {
  customKnownItems: { fresh: [], frozen: [], dry: [] },
  inventory: {
    fresh: [
      { id: '1', name: 'Egg', quantity: 12, addedDate: '2024-01-01' },
      { id: '2', name: 'Paneer', quantity: 2, addedDate: '2024-01-01' },
    ],
    frozen: [],
    dry: [
      { id: '3', name: 'Toor Dal', quantity: 1, addedDate: '2024-01-01' },
      { id: '4', name: 'Fairlife 30g Protein Shake', quantity: 10, addedDate: '2024-01-01' },
      { id: '5', name: 'Spinach', quantity: 0, addedDate: '2024-01-01' }, // Out of stock
    ],
  },
  shoppingChecked: {},
  purchaseHistory: [],
  shoppingList: [],
  theme: 'bright-playful',
  font: 'quirky-fun',
};

vi.mock('../../hooks/useAppState', () => ({
  useAppState: () => ({ state: mockState, dispatch: vi.fn() }),
  getMergedKnownItems: () => ({
    fresh: [
      { name: 'Egg', typicalQty: 24, usages: ['ingredient'], nutritionTags: ['high-protein'] },
      { name: 'Paneer', typicalQty: 1, usages: ['ingredient'], nutritionTags: ['high-protein'] },
    ],
    frozen: [],
    dry: [
      { name: 'Toor Dal', typicalQty: 1, usages: ['ingredient'], nutritionTags: ['high-fiber', 'high-protein'] },
      { name: 'Fairlife 30g Protein Shake', typicalQty: 30, usages: ['meal'], nutritionTags: ['high-protein'] },
      { name: 'Spinach', typicalQty: 1, usages: ['ingredient'], nutritionTags: ['high-fiber'] },
    ],
  }),
}));

describe('WhatToEat', () => {
  it('renders page header', () => {
    render(<WhatToEat />);
    expect(screen.getByText('What to Eat')).toBeInTheDocument();
  });

  it('renders High Protein section', () => {
    render(<WhatToEat />);
    expect(screen.getByText('High Protein')).toBeInTheDocument();
  });

  it('renders High Fiber section', () => {
    render(<WhatToEat />);
    expect(screen.getByText('High Fiber')).toBeInTheDocument();
  });

  it('shows high-protein items in High Protein section', () => {
    render(<WhatToEat />);
    // Egg, Paneer, Toor Dal, Fairlife all have high-protein tag
    expect(screen.getByText('Egg')).toBeInTheDocument();
    expect(screen.getByText('Paneer')).toBeInTheDocument();
    expect(screen.getByText('Fairlife 30g Protein Shake')).toBeInTheDocument();
  });

  it('shows high fiber items in High Fiber section', () => {
    render(<WhatToEat />);
    // Toor Dal has both high-fiber and high-protein tags, appears in both sections
    const toorDalElements = screen.getAllByText('Toor Dal');
    expect(toorDalElements.length).toBe(2); // Appears in both sections
  });

  it('does not show out-of-stock items', () => {
    render(<WhatToEat />);
    // Spinach has quantity 0
    expect(screen.queryByText('Spinach')).not.toBeInTheDocument();
  });

  it('displays item quantities', () => {
    render(<WhatToEat />);
    expect(screen.getByText('12')).toBeInTheDocument(); // Egg quantity
    expect(screen.getByText('2')).toBeInTheDocument(); // Paneer quantity
  });
});
