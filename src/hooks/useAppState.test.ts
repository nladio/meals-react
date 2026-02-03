import { describe, it, expect } from 'vitest';
import { reducer } from './useAppState';
import type { AppState } from '../types';

const createEmptyState = (): AppState => ({
  customKnownItems: {
    fresh: [],
    frozen: [],
    dry: [],
  },
  inventory: {
    fresh: [],
    frozen: [],
    dry: [],
  },
  shoppingChecked: {},
  purchaseHistory: [],
  shoppingList: [],
});

describe('ADD_TO_INVENTORY with expiryDate', () => {
  it('sets expiryDate when provided for new item', () => {
    const state = createEmptyState();
    const result = reducer(state, {
      type: 'ADD_TO_INVENTORY',
      section: 'fresh',
      name: 'Milk',
      qty: 2,
      expiryDate: '2025-02-01',
    });

    expect(result.inventory.fresh).toHaveLength(1);
    expect(result.inventory.fresh[0].name).toBe('Milk');
    expect(result.inventory.fresh[0].quantity).toBe(2);
    expect(result.inventory.fresh[0].expiryDate).toBe('2025-02-01');
  });

  it('leaves expiryDate undefined when not provided for new item', () => {
    const state = createEmptyState();
    const result = reducer(state, {
      type: 'ADD_TO_INVENTORY',
      section: 'fresh',
      name: 'Eggs',
      qty: 1,
    });

    expect(result.inventory.fresh).toHaveLength(1);
    expect(result.inventory.fresh[0].name).toBe('Eggs');
    expect(result.inventory.fresh[0].expiryDate).toBeUndefined();
  });

  it('updates expiryDate when provided for existing item', () => {
    const state = createEmptyState();
    state.inventory.fresh = [
      {
        id: 'existing-1',
        name: 'Yogurt',
        quantity: 3,
        addedDate: '2025-01-10',
        expiryDate: '2025-01-20',
      },
    ];

    const result = reducer(state, {
      type: 'ADD_TO_INVENTORY',
      section: 'fresh',
      name: 'Yogurt',
      qty: 2,
      expiryDate: '2025-02-15',
    });

    expect(result.inventory.fresh).toHaveLength(1);
    expect(result.inventory.fresh[0].quantity).toBe(5);
    expect(result.inventory.fresh[0].expiryDate).toBe('2025-02-15');
  });

  it('preserves existing expiryDate when not provided', () => {
    const state = createEmptyState();
    state.inventory.fresh = [
      {
        id: 'existing-2',
        name: 'Cheese',
        quantity: 1,
        addedDate: '2025-01-10',
        expiryDate: '2025-01-25',
      },
    ];

    const result = reducer(state, {
      type: 'ADD_TO_INVENTORY',
      section: 'fresh',
      name: 'Cheese',
      qty: 1,
    });

    expect(result.inventory.fresh).toHaveLength(1);
    expect(result.inventory.fresh[0].quantity).toBe(2);
    expect(result.inventory.fresh[0].expiryDate).toBe('2025-01-25');
  });
});

describe('ADD_TO_SHOPPING_LIST', () => {
  it('adds item to shopping list', () => {
    const state = createEmptyState();
    const result = reducer(state, {
      type: 'ADD_TO_SHOPPING_LIST',
      entry: { name: 'Rice', section: 'dry', store: 'indian-store' },
    });

    expect(result.shoppingList).toHaveLength(1);
    expect(result.shoppingList[0]).toEqual({
      name: 'Rice',
      section: 'dry',
      store: 'indian-store',
    });
  });

  it('does not add duplicate item for same store', () => {
    const state = createEmptyState();
    state.shoppingList = [{ name: 'Rice', section: 'dry', store: 'indian-store' }];

    const result = reducer(state, {
      type: 'ADD_TO_SHOPPING_LIST',
      entry: { name: 'Rice', section: 'dry', store: 'indian-store' },
    });

    expect(result.shoppingList).toHaveLength(1);
  });

  it('allows same item for different stores', () => {
    const state = createEmptyState();
    state.shoppingList = [{ name: 'Rice', section: 'dry', store: 'indian-store' }];

    const result = reducer(state, {
      type: 'ADD_TO_SHOPPING_LIST',
      entry: { name: 'Rice', section: 'dry', store: 'costco' },
    });

    expect(result.shoppingList).toHaveLength(2);
  });
});

describe('REMOVE_FROM_SHOPPING_LIST', () => {
  it('removes item from shopping list', () => {
    const state = createEmptyState();
    state.shoppingList = [
      { name: 'Rice', section: 'dry', store: 'indian-store' },
      { name: 'Bread', section: 'fresh', store: 'grocery' },
    ];

    const result = reducer(state, {
      type: 'REMOVE_FROM_SHOPPING_LIST',
      name: 'Rice',
      store: 'indian-store',
    });

    expect(result.shoppingList).toHaveLength(1);
    expect(result.shoppingList[0].name).toBe('Bread');
  });

  it('only removes item for the specified store', () => {
    const state = createEmptyState();
    state.shoppingList = [
      { name: 'Rice', section: 'dry', store: 'indian-store' },
      { name: 'Rice', section: 'dry', store: 'costco' },
    ];

    const result = reducer(state, {
      type: 'REMOVE_FROM_SHOPPING_LIST',
      name: 'Rice',
      store: 'indian-store',
    });

    expect(result.shoppingList).toHaveLength(1);
    expect(result.shoppingList[0].store).toBe('costco');
  });

  it('does nothing if item not found', () => {
    const state = createEmptyState();
    state.shoppingList = [{ name: 'Rice', section: 'dry', store: 'indian-store' }];

    const result = reducer(state, {
      type: 'REMOVE_FROM_SHOPPING_LIST',
      name: 'Bread',
      store: 'grocery',
    });

    expect(result.shoppingList).toHaveLength(1);
  });
});
