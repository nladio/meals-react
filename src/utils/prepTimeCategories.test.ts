import { describe, it, expect } from 'vitest';
import { getPrepCategory, categorizeByPrepTime } from './prepTimeCategories';
import type { AppState } from '../types';

describe('getPrepCategory', () => {
  it('returns instant-prep for undefined (unknown items need some prep)', () => {
    expect(getPrepCategory(undefined)).toBe('instant-prep');
  });

  it('returns quick-reheat for 0-5 minutes', () => {
    expect(getPrepCategory(0)).toBe('quick-reheat');
    expect(getPrepCategory(3)).toBe('quick-reheat');
    expect(getPrepCategory(5)).toBe('quick-reheat');
  });

  it('returns instant-prep for 6-15 minutes', () => {
    expect(getPrepCategory(6)).toBe('instant-prep');
    expect(getPrepCategory(10)).toBe('instant-prep');
    expect(getPrepCategory(15)).toBe('instant-prep');
  });

  it('returns cook for 16+ minutes', () => {
    expect(getPrepCategory(16)).toBe('cook');
    expect(getPrepCategory(30)).toBe('cook');
    expect(getPrepCategory(60)).toBe('cook');
  });
});

describe('categorizeByPrepTime', () => {
  const createState = (inventory: AppState['inventory']): AppState => ({
    customKnownItems: { fresh: [], frozen: [], dry: [] },
    inventory,
    shoppingChecked: {},
    purchaseHistory: [],
    historyViewMonth: null,
  });

  it('returns empty arrays when no inventory items', () => {
    const state = createState({ fresh: [], frozen: [], dry: [] });
    const result = categorizeByPrepTime(state);
    expect(result.quickReheat).toEqual([]);
    expect(result.instantPrep).toEqual([]);
    expect(result.cook).toEqual([]);
  });

  it('categorizes fresh curry (3 min) as quick-reheat', () => {
    const state = createState({
      fresh: [{ id: '1', name: 'Paneer Curry', quantity: 2, addedDate: '2025-01-01' }],
      frozen: [],
      dry: [],
    });
    const result = categorizeByPrepTime(state);
    expect(result.quickReheat).toHaveLength(1);
    expect(result.quickReheat[0].item.name).toBe('Paneer Curry');
    expect(result.instantPrep).toHaveLength(0);
  });

  it('categorizes Maggi Noodles (6 min) as instant-prep', () => {
    const state = createState({
      fresh: [],
      frozen: [],
      dry: [{ id: '1', name: 'Maggi Noodles', quantity: 4, addedDate: '2025-01-01' }],
    });
    const result = categorizeByPrepTime(state);
    expect(result.instantPrep).toHaveLength(1);
    expect(result.instantPrep[0].item.name).toBe('Maggi Noodles');
    expect(result.quickReheat).toHaveLength(0);
  });

  it('categorizes frozen items (10-15 min) as instant-prep', () => {
    const state = createState({
      fresh: [],
      frozen: [{ id: '1', name: 'TJs Orange Chicken', quantity: 2, addedDate: '2025-01-01' }],
      dry: [],
    });
    const result = categorizeByPrepTime(state);
    expect(result.instantPrep).toHaveLength(1);
    expect(result.instantPrep[0].item.name).toBe('TJs Orange Chicken');
  });

  it('excludes ingredient-only items', () => {
    const state = createState({
      fresh: [{ id: '1', name: 'Onion', quantity: 1, addedDate: '2025-01-01' }],
      frozen: [],
      dry: [],
    });
    const result = categorizeByPrepTime(state);
    expect(result.quickReheat).toHaveLength(0);
    expect(result.instantPrep).toHaveLength(0);
    expect(result.cook).toHaveLength(0);
  });

  it('includes nutritionTags in categorized items', () => {
    const state = createState({
      fresh: [{ id: '1', name: 'Palak Paneer', quantity: 2, addedDate: '2025-01-01' }],
      frozen: [],
      dry: [],
    });
    const result = categorizeByPrepTime(state);
    expect(result.quickReheat[0].nutritionTags).toContain('high-fiber');
  });

  it('includes section in categorized items', () => {
    const state = createState({
      fresh: [{ id: '1', name: 'Paneer Curry', quantity: 2, addedDate: '2025-01-01' }],
      frozen: [],
      dry: [],
    });
    const result = categorizeByPrepTime(state);
    expect(result.quickReheat[0].section).toBe('fresh');
  });
});
