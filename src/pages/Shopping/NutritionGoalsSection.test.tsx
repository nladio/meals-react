import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NutritionGoalsSection, type NutritionGoalItem } from './NutritionGoalsSection';

describe('NutritionGoalsSection', () => {
  const mockOnAddToList = vi.fn();

  const sampleItems: NutritionGoalItem[] = [
    { name: 'Toor Dal', section: 'dry', nutritionTags: ['high-fiber', 'high-protein'] },
    { name: 'Spinach', section: 'fresh', nutritionTags: ['high-fiber'] },
    { name: 'Chicken', section: 'fresh', nutritionTags: ['high-protein'] },
  ];

  beforeEach(() => {
    mockOnAddToList.mockClear();
  });

  it('renders nothing when items array is empty', () => {
    const { container } = render(
      <NutritionGoalsSection items={[]} store="grocery" onAddToList={mockOnAddToList} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders section header with item count', () => {
    render(
      <NutritionGoalsSection items={sampleItems} store="grocery" onAddToList={mockOnAddToList} />
    );
    expect(screen.getByText('For Your Nutrition Goals')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders all items with names', () => {
    render(
      <NutritionGoalsSection items={sampleItems} store="grocery" onAddToList={mockOnAddToList} />
    );
    expect(screen.getByText('Toor Dal')).toBeInTheDocument();
    expect(screen.getByText('Spinach')).toBeInTheDocument();
    expect(screen.getByText('Chicken')).toBeInTheDocument();
  });

  it('shows "Out of stock" label for each item', () => {
    render(
      <NutritionGoalsSection items={sampleItems} store="grocery" onAddToList={mockOnAddToList} />
    );
    const outOfStockLabels = screen.getAllByText('Out of stock');
    expect(outOfStockLabels).toHaveLength(3);
  });

  it('applies nutrition-based background colors to items', () => {
    const { container } = render(
      <NutritionGoalsSection items={sampleItems} store="grocery" onAddToList={mockOnAddToList} />
    );
    // Toor Dal (both) = both-light, Spinach (fiber) = fiber-light, Chicken (protein) = protein-light
    expect(container.querySelector('.bg-both-light')).toBeInTheDocument();
    expect(container.querySelector('.bg-fiber-light')).toBeInTheDocument();
    expect(container.querySelector('.bg-protein-light')).toBeInTheDocument();
  });

  it('calls onAddToList when cart button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <NutritionGoalsSection items={sampleItems} store="grocery" onAddToList={mockOnAddToList} />
    );

    const addButton = screen.getByRole('button', { name: /add toor dal to shopping list/i });
    await user.click(addButton);

    expect(mockOnAddToList).toHaveBeenCalledWith('Toor Dal', 'dry');
  });

  it('renders add to list button for each item', () => {
    render(
      <NutritionGoalsSection items={sampleItems} store="grocery" onAddToList={mockOnAddToList} />
    );
    expect(screen.getByRole('button', { name: /add toor dal to shopping list/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add spinach to shopping list/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add chicken to shopping list/i })).toBeInTheDocument();
  });
});
