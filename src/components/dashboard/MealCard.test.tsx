import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MealCard } from './MealCard';

describe('MealCard', () => {
  it('renders item name', () => {
    render(<MealCard name="Paneer Curry" quantity={2} />);
    expect(screen.getByText('Paneer Curry')).toBeInTheDocument();
  });

  it('renders prep time badge when provided', () => {
    render(<MealCard name="Paneer Curry" prepTimeMinutes={3} quantity={2} />);
    expect(screen.getByText('3 min')).toBeInTheDocument();
  });

  it('does not render prep time badge when not provided', () => {
    render(<MealCard name="Paneer Curry" quantity={2} />);
    expect(screen.queryByText(/min/)).not.toBeInTheDocument();
  });

  it('renders quantity indicator', () => {
    render(<MealCard name="Paneer Curry" quantity={2} />);
    expect(screen.getByText('×2')).toBeInTheDocument();
  });

  it('renders nutrition badges when provided', () => {
    render(
      <MealCard
        name="Paneer Curry"
        quantity={2}
        nutritionTags={['high-protein']}
      />
    );
    expect(screen.getByTitle('High Protein')).toBeInTheDocument();
  });

  it('does not render increment/decrement buttons', () => {
    render(<MealCard name="Paneer Curry" quantity={2} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
