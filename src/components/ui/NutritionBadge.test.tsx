import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NutritionBadge, NutritionBadges } from './NutritionBadge';

describe('NutritionBadge', () => {
  it('renders "N" badge for natural-protein tag', () => {
    render(<NutritionBadge tag="natural-protein" />);
    expect(screen.getByText('N')).toBeInTheDocument();
    expect(screen.getByTitle('Natural Protein')).toBeInTheDocument();
  });

  it('renders "P" badge for high-protein tag', () => {
    render(<NutritionBadge tag="high-protein" />);
    expect(screen.getByText('P')).toBeInTheDocument();
    expect(screen.getByTitle('High Protein')).toBeInTheDocument();
  });

  it('renders "F" badge for high-fiber tag', () => {
    render(<NutritionBadge tag="high-fiber" />);
    expect(screen.getByText('F')).toBeInTheDocument();
    expect(screen.getByTitle('High Fiber')).toBeInTheDocument();
  });

  it('applies purple styling for natural-protein badge', () => {
    render(<NutritionBadge tag="natural-protein" />);
    const badge = screen.getByText('N');
    expect(badge).toHaveClass('bg-purple-100', 'text-purple-600');
  });

  it('applies green styling for high-protein badge', () => {
    render(<NutritionBadge tag="high-protein" />);
    const badge = screen.getByText('P');
    expect(badge).toHaveClass('bg-green-100', 'text-green-600');
  });

  it('applies teal styling for high-fiber badge', () => {
    render(<NutritionBadge tag="high-fiber" />);
    const badge = screen.getByText('F');
    expect(badge).toHaveClass('bg-teal-100', 'text-teal-600');
  });
});

describe('NutritionBadges', () => {
  it('renders nothing when tags is undefined', () => {
    const { container } = render(<NutritionBadges tags={undefined} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when tags is empty array', () => {
    const { container } = render(<NutritionBadges tags={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders all badges when multiple tags provided', () => {
    render(<NutritionBadges tags={['high-protein', 'high-fiber', 'natural-protein']} />);
    expect(screen.getByText('P')).toBeInTheDocument();
    expect(screen.getByText('F')).toBeInTheDocument();
    expect(screen.getByText('N')).toBeInTheDocument();
  });

  it('renders single badge when one tag provided', () => {
    render(<NutritionBadges tags={['natural-protein']} />);
    expect(screen.getByText('N')).toBeInTheDocument();
    expect(screen.queryByText('P')).not.toBeInTheDocument();
    expect(screen.queryByText('F')).not.toBeInTheDocument();
  });
});
