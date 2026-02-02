import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ShoppingSubcategoryGroup } from './StapleSubcategoryGroup';
import type { ShoppingListItem } from '../../types';

describe('ShoppingSubcategoryGroup', () => {
  const mockItems: ShoppingListItem[] = [
    { name: 'Dal Makhani', section: 'fresh', currentQty: 0, suggestedQty: 2, lastBought: null },
    { name: 'Palak Paneer', section: 'fresh', currentQty: 0, suggestedQty: 2, lastBought: null },
  ];

  describe('staple variant', () => {
    it('renders category name and item count', () => {
      render(
        <ShoppingSubcategoryGroup
          category="Curries"
          items={mockItems}
          store="indian-store"
          variant="staple"
          onAddToList={vi.fn()}
        />
      );

      expect(screen.getByText('Curries')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('renders all items when expanded', () => {
      render(
        <ShoppingSubcategoryGroup
          category="Curries"
          items={mockItems}
          store="indian-store"
          variant="staple"
          onAddToList={vi.fn()}
        />
      );

      expect(screen.getByText('Dal Makhani')).toBeInTheDocument();
      expect(screen.getByText('Palak Paneer')).toBeInTheDocument();
    });

    it('hides items when collapsed', () => {
      render(
        <ShoppingSubcategoryGroup
          category="Curries"
          items={mockItems}
          store="indian-store"
          variant="staple"
          onAddToList={vi.fn()}
        />
      );

      const toggleButton = screen.getByRole('button', { name: /Curries/i });
      fireEvent.click(toggleButton);

      expect(screen.queryByText('Dal Makhani')).not.toBeInTheDocument();
      expect(screen.queryByText('Palak Paneer')).not.toBeInTheDocument();
    });

    it('calls onAddToList with correct params when add button clicked', () => {
      const onAddToList = vi.fn();

      render(
        <ShoppingSubcategoryGroup
          category="Curries"
          items={mockItems}
          store="indian-store"
          variant="staple"
          onAddToList={onAddToList}
        />
      );

      const addButtons = screen.getAllByRole('button', { name: /Add .* to shopping list/i });
      fireEvent.click(addButtons[0]);

      expect(onAddToList).toHaveBeenCalledWith('Dal Makhani', 'fresh');
    });
  });

  describe('user-list variant', () => {
    it('calls onRemove when remove button clicked', () => {
      const onRemove = vi.fn();

      render(
        <ShoppingSubcategoryGroup
          category="Curries"
          items={mockItems}
          store="indian-store"
          variant="user-list"
          onRemove={onRemove}
        />
      );

      const removeButtons = screen.getAllByRole('button', { name: /Remove .* from list/i });
      fireEvent.click(removeButtons[0]);

      expect(onRemove).toHaveBeenCalledWith('Dal Makhani');
    });
  });

  it('re-expands when clicked twice', () => {
    render(
      <ShoppingSubcategoryGroup
        category="Curries"
        items={mockItems}
        store="indian-store"
        variant="staple"
        onAddToList={vi.fn()}
      />
    );

    const toggleButton = screen.getByRole('button', { name: /Curries/i });

    fireEvent.click(toggleButton);
    expect(screen.queryByText('Dal Makhani')).not.toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.getByText('Dal Makhani')).toBeInTheDocument();
  });
});
