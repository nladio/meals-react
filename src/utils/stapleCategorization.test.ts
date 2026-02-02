import { describe, it, expect } from 'vitest';
import { getCategoryForStaple, groupStaplesByCategory, STAPLE_CATEGORY_ORDER } from './stapleCategorization';
import type { DefaultKnownItem } from '../data/defaultKnownItems';

describe('getCategoryForStaple', () => {
  it('categorizes curry items', () => {
    const item: DefaultKnownItem = {
      name: 'Dal Makhani',
      typicalQty: 2,
      usages: ['meal'],
      mealCategory: 'curries',
    };
    expect(getCategoryForStaple(item)).toBe('Curries');
  });

  it('categorizes ready-meals', () => {
    const item: DefaultKnownItem = {
      name: 'MTR Upma',
      typicalQty: 2,
      usages: ['meal'],
      mealCategory: 'ready-meals',
    };
    expect(getCategoryForStaple(item)).toBe('Ready Meals');
  });

  it('categorizes noodles as ready meals', () => {
    const item: DefaultKnownItem = {
      name: 'Maggi Noodles',
      typicalQty: 8,
      usages: ['meal'],
      mealCategory: 'noodles',
    };
    expect(getCategoryForStaple(item)).toBe('Ready Meals');
  });

  it('categorizes snacks as breads & batters', () => {
    const item: DefaultKnownItem = {
      name: 'Frozen Samosas',
      typicalQty: 1,
      usages: ['meal'],
      mealCategory: 'snacks',
    };
    expect(getCategoryForStaple(item)).toBe('Breads & Batters');
  });

  it('categorizes produce items', () => {
    const item: DefaultKnownItem = {
      name: 'Tomato',
      typicalQty: 1,
      usages: ['ingredient'],
      ingredientCategory: 'produce',
    };
    expect(getCategoryForStaple(item)).toBe('Produce');
  });

  it('categorizes dairy items', () => {
    const item: DefaultKnownItem = {
      name: 'Whole Milk',
      typicalQty: 3,
      usages: ['ingredient', 'meal'],
      ingredientCategory: 'dairy',
    };
    expect(getCategoryForStaple(item)).toBe('Dairy & Protein');
  });

  it('categorizes protein items with dairy', () => {
    const item: DefaultKnownItem = {
      name: 'Paneer',
      typicalQty: 1,
      usages: ['ingredient'],
      ingredientCategory: 'protein',
    };
    expect(getCategoryForStaple(item)).toBe('Dairy & Protein');
  });

  it('categorizes grains', () => {
    const item: DefaultKnownItem = {
      name: 'Indrayani Rice',
      typicalQty: 1,
      usages: ['ingredient'],
      ingredientCategory: 'grains',
    };
    expect(getCategoryForStaple(item)).toBe('Grains');
  });

  it('categorizes batters as breads & batters', () => {
    const item: DefaultKnownItem = {
      name: 'Dosa Batter',
      typicalQty: 1,
      usages: ['ingredient'],
      ingredientCategory: 'grains',
    };
    expect(getCategoryForStaple(item)).toBe('Breads & Batters');
  });

  it('categorizes legumes', () => {
    const item: DefaultKnownItem = {
      name: 'Toor Dal',
      typicalQty: 1,
      usages: ['ingredient'],
      ingredientCategory: 'legumes',
    };
    expect(getCategoryForStaple(item)).toBe('Legumes');
  });

  it('categorizes condiments', () => {
    const item: DefaultKnownItem = {
      name: 'Green Chutney',
      typicalQty: 1,
      usages: ['ingredient'],
      ingredientCategory: 'condiments',
    };
    expect(getCategoryForStaple(item)).toBe('Condiments');
  });

  it('categorizes bread-like items as breads & batters', () => {
    const chapatis: DefaultKnownItem = {
      name: 'Uncooked Chapatis',
      typicalQty: 20,
      usages: ['meal', 'ingredient'],
    };
    expect(getCategoryForStaple(chapatis)).toBe('Breads & Batters');

    const thepla: DefaultKnownItem = {
      name: 'Fresh Methi Thepla',
      typicalQty: 4,
      usages: ['meal', 'ingredient'],
    };
    expect(getCategoryForStaple(thepla)).toBe('Breads & Batters');

    const bread: DefaultKnownItem = {
      name: 'Wholewheat Bread',
      typicalQty: 40,
      usages: ['meal', 'ingredient'],
    };
    expect(getCategoryForStaple(bread)).toBe('Breads & Batters');
  });

  it('categorizes uncategorized items as other', () => {
    const item: DefaultKnownItem = {
      name: 'Mystery Item',
      typicalQty: 1,
      usages: ['ingredient'],
    };
    expect(getCategoryForStaple(item)).toBe('Other');
  });
});

describe('groupStaplesByCategory', () => {
  const defaultItems: DefaultKnownItem[] = [
    { name: 'Dal Makhani', typicalQty: 2, usages: ['meal'], mealCategory: 'curries' },
    { name: 'Tomato', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'produce' },
    { name: 'Dosa Batter', typicalQty: 1, usages: ['ingredient'], ingredientCategory: 'grains' },
  ];

  it('groups staples by category', () => {
    const staples = [
      { name: 'Dal Makhani', section: 'fresh' as const, currentQty: 0, suggestedQty: 2, lastBought: null, priority: 'high' as const },
      { name: 'Tomato', section: 'fresh' as const, currentQty: 0, suggestedQty: 1, lastBought: null, priority: 'high' as const },
      { name: 'Dosa Batter', section: 'fresh' as const, currentQty: 0, suggestedQty: 1, lastBought: null, priority: 'high' as const },
    ];

    const grouped = groupStaplesByCategory(staples, defaultItems);

    expect(grouped.Curries).toHaveLength(1);
    expect(grouped.Curries[0].name).toBe('Dal Makhani');
    expect(grouped.Produce).toHaveLength(1);
    expect(grouped.Produce[0].name).toBe('Tomato');
    expect(grouped['Breads & Batters']).toHaveLength(1);
    expect(grouped['Breads & Batters'][0].name).toBe('Dosa Batter');
  });

  it('puts unknown items in Other', () => {
    const staples = [
      { name: 'Unknown Item', section: 'dry' as const, currentQty: 0, suggestedQty: 1, lastBought: null, priority: 'medium' as const },
    ];

    const grouped = groupStaplesByCategory(staples, defaultItems);

    expect(grouped.Other).toHaveLength(1);
    expect(grouped.Other[0].name).toBe('Unknown Item');
  });

  it('returns empty arrays for categories with no items', () => {
    const staples = [
      { name: 'Dal Makhani', section: 'fresh' as const, currentQty: 0, suggestedQty: 2, lastBought: null, priority: 'high' as const },
    ];

    const grouped = groupStaplesByCategory(staples, defaultItems);

    expect(grouped.Legumes).toHaveLength(0);
    expect(grouped.Condiments).toHaveLength(0);
  });
});

describe('STAPLE_CATEGORY_ORDER', () => {
  it('contains all expected categories', () => {
    expect(STAPLE_CATEGORY_ORDER).toContain('Curries');
    expect(STAPLE_CATEGORY_ORDER).toContain('Breads & Batters');
    expect(STAPLE_CATEGORY_ORDER).toContain('Ready Meals');
    expect(STAPLE_CATEGORY_ORDER).toContain('Produce');
    expect(STAPLE_CATEGORY_ORDER).toContain('Dairy & Protein');
    expect(STAPLE_CATEGORY_ORDER).toContain('Grains');
    expect(STAPLE_CATEGORY_ORDER).toContain('Legumes');
    expect(STAPLE_CATEGORY_ORDER).toContain('Condiments');
    expect(STAPLE_CATEGORY_ORDER).toContain('Other');
  });

  it('has Other as the last category', () => {
    expect(STAPLE_CATEGORY_ORDER[STAPLE_CATEGORY_ORDER.length - 1]).toBe('Other');
  });
});
