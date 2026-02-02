import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StapleSubcategoryGroup } from './StapleSubcategoryGroup';
import type { StapleItem } from '../../utils/stapleCategorization';

describe('StapleSubcategoryGroup', () => {
  const mockItems: StapleItem[] = [
    { name: 'Dal Makhani', section: 'fresh', currentQty: 0, suggestedQty: 2, lastBought: null, priority: 'high' },
    { name: 'Palak Paneer', section: 'fresh', currentQty: 0, suggestedQty: 2, lastBought: null, priority: 'high' },
  ];

  it('renders category name and item count', () => {
    render(
      <StapleSubcategoryGroup
        category="Curries"
        items={mockItems}
        store="indian-store"
        onAddToList={vi.fn()}
      />
    );

    expect(screen.getByText('Curries')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders all items when expanded', () => {
    render(
      <StapleSubcategoryGroup
        category="Curries"
        items={mockItems}
        store="indian-store"
        onAddToList={vi.fn()}
      />
    );

    expect(screen.getByText('Dal Makhani')).toBeInTheDocument();
    expect(screen.getByText('Palak Paneer')).toBeInTheDocument();
  });

  it('hides items when collapsed', () => {
    render(
      <StapleSubcategoryGroup
        category="Curries"
        items={mockItems}
        store="indian-store"
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
      <StapleSubcategoryGroup
        category="Curries"
        items={mockItems}
        store="indian-store"
        onAddToList={onAddToList}
      />
    );

    const addButtons = screen.getAllByRole('button', { name: /Add .* to shopping list/i });
    fireEvent.click(addButtons[0]);

    expect(onAddToList).toHaveBeenCalledWith('Dal Makhani', 'fresh');
  });

  it('re-expands when clicked twice', () => {
    render(
      <StapleSubcategoryGroup
        category="Curries"
        items={mockItems}
        store="indian-store"
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
