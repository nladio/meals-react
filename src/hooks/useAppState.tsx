import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { AppState, Section, PurchaseItem, KnownItem, InventoryItem } from '../types';
import { generateId } from '../utils/helpers';

// Default state
const DEFAULT_STATE: AppState = {
  knownItems: {
    fresh: [
      { name: 'Paneer Curry', lastBought: null, typicalQty: 2, subcategory: 'Ready to eat' },
      { name: 'Dal Makhani', lastBought: null, typicalQty: 2, subcategory: 'Ready to eat' },
      { name: 'Palak Paneer', lastBought: null, typicalQty: 2, subcategory: 'Ready to eat' },
      { name: 'Chole', lastBought: null, typicalQty: 2, subcategory: 'Ready to eat' },
      { name: 'Aloo Gobi', lastBought: null, typicalQty: 2, subcategory: 'Ready to eat' },
      { name: 'Chapatis', lastBought: null, typicalQty: 1, subcategory: 'Ready to eat' },
    ],
    frozen: [
      { name: 'Biryani', lastBought: null, typicalQty: 2, subcategory: 'Ready to eat' },
      { name: 'TJs Palak Paneer', lastBought: null, typicalQty: 2, subcategory: 'Ready to eat' },
      { name: 'Frozen Samosas', lastBought: null, typicalQty: 1, subcategory: 'Ready to eat' },
      { name: 'Frozen Parathas', lastBought: null, typicalQty: 1, subcategory: 'Ready to eat' },
    ],
    dry: [
      { name: 'Instant Noodles', lastBought: null, typicalQty: 3, subcategory: 'Ready to eat' },
      { name: 'Canned Soup', lastBought: null, typicalQty: 2, subcategory: 'Ready to eat' },
      { name: 'Rice', lastBought: null, typicalQty: 1, subcategory: 'Ingredients' },
      { name: 'Tortillas', lastBought: null, typicalQty: 1, subcategory: 'Ready to eat' },
      { name: 'Beans', lastBought: null, typicalQty: 2, subcategory: 'Ingredients' },
    ],
  },
  inventory: {
    fresh: [],
    frozen: [],
    dry: [],
  },
  shoppingChecked: {},
  purchaseHistory: [],
  historyViewMonth: null,
};

// Actions
type Action =
  | { type: 'INCREMENT_ITEM'; section: Section; id: string }
  | { type: 'DECREMENT_ITEM'; section: Section; id: string }
  | { type: 'ADD_TO_INVENTORY'; section: Section; name: string; qty: number; expiryDate?: string }
  | { type: 'ADD_KNOWN_ITEM'; section: Section; name: string }
  | { type: 'SET_SHOPPING_CHECKED'; key: string; value: boolean | number }
  | { type: 'CLEAR_SHOPPING_CHECKED' }
  | { type: 'RECORD_PURCHASE'; date: string; items: PurchaseItem[] }
  | { type: 'UPDATE_KNOWN_ITEM_PURCHASE'; section: Section; name: string; qty: number }
  | { type: 'SET_HISTORY_MONTH'; month: string }
  | { type: 'LOAD_STATE'; state: AppState };

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'INCREMENT_ITEM': {
      return {
        ...state,
        inventory: {
          ...state.inventory,
          [action.section]: state.inventory[action.section].map(item =>
            item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        },
      };
    }

    case 'DECREMENT_ITEM': {
      const newItems = state.inventory[action.section]
        .map(item =>
          item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0);

      return {
        ...state,
        inventory: {
          ...state.inventory,
          [action.section]: newItems,
        },
      };
    }

    case 'ADD_TO_INVENTORY': {
      const existing = state.inventory[action.section].find(i => i.name === action.name);

      if (existing) {
        return {
          ...state,
          inventory: {
            ...state.inventory,
            [action.section]: state.inventory[action.section].map(item =>
              item.name === action.name
                ? { ...item, quantity: item.quantity + action.qty, addedDate: new Date().toISOString(), expiryDate: action.expiryDate || item.expiryDate }
                : item
            ),
          },
        };
      }

      const newItem: InventoryItem = {
        id: generateId(),
        name: action.name,
        quantity: action.qty,
        addedDate: new Date().toISOString(),
        expiryDate: action.expiryDate,
      };

      // Also add to known items if not already there
      const knownExists = state.knownItems[action.section].find(k => k.name === action.name);
      const newKnownItems = knownExists
        ? state.knownItems
        : {
            ...state.knownItems,
            [action.section]: [
              ...state.knownItems[action.section],
              { name: action.name, lastBought: null, typicalQty: action.qty },
            ],
          };

      return {
        ...state,
        knownItems: newKnownItems,
        inventory: {
          ...state.inventory,
          [action.section]: [...state.inventory[action.section], newItem],
        },
      };
    }

    case 'ADD_KNOWN_ITEM': {
      const exists = state.knownItems[action.section].find(k => k.name === action.name);
      if (exists) return state;

      return {
        ...state,
        knownItems: {
          ...state.knownItems,
          [action.section]: [
            ...state.knownItems[action.section],
            { name: action.name, lastBought: null, typicalQty: 1 },
          ],
        },
      };
    }

    case 'SET_SHOPPING_CHECKED': {
      return {
        ...state,
        shoppingChecked: {
          ...state.shoppingChecked,
          [action.key]: action.value,
        },
      };
    }

    case 'CLEAR_SHOPPING_CHECKED': {
      return {
        ...state,
        shoppingChecked: {},
      };
    }

    case 'RECORD_PURCHASE': {
      const existingEntry = state.purchaseHistory.find(e => e.date === action.date);

      if (existingEntry) {
        const updatedItems = [...existingEntry.items];
        for (const newItem of action.items) {
          const existing = updatedItems.find(
            i => i.name === newItem.name && i.section === newItem.section
          );
          if (existing) {
            existing.qty += newItem.qty;
          } else {
            updatedItems.push({ ...newItem });
          }
        }

        return {
          ...state,
          purchaseHistory: state.purchaseHistory.map(e =>
            e.date === action.date ? { ...e, items: updatedItems } : e
          ),
        };
      }

      return {
        ...state,
        purchaseHistory: [
          ...state.purchaseHistory,
          { id: generateId(), date: action.date, items: action.items.map(i => ({ ...i })) },
        ],
      };
    }

    case 'UPDATE_KNOWN_ITEM_PURCHASE': {
      return {
        ...state,
        knownItems: {
          ...state.knownItems,
          [action.section]: state.knownItems[action.section].map(item =>
            item.name === action.name
              ? { ...item, lastBought: new Date().toISOString(), typicalQty: action.qty }
              : item
          ),
        },
      };
    }

    case 'SET_HISTORY_MONTH': {
      return {
        ...state,
        historyViewMonth: action.month,
      };
    }

    case 'LOAD_STATE': {
      return action.state;
    }

    default:
      return state;
  }
}

// Migrate old subcategories to new simplified categories
function migrateSubcategory(oldSubcategory: string | undefined, itemName: string, section: Section): string | undefined {
  // If already using new categories, keep as-is
  if (oldSubcategory === 'Ready to eat' || oldSubcategory === 'Ingredients') {
    return oldSubcategory;
  }

  // Check if item exists in DEFAULT_STATE and use its subcategory
  const defaultItem = DEFAULT_STATE.knownItems[section].find(d => d.name === itemName);
  if (defaultItem?.subcategory) {
    return defaultItem.subcategory;
  }

  // Map old subcategories to new ones
  const oldToNew: Record<string, string> = {
    'Curries': 'Ready to eat',
    'Breads': 'Ready to eat',
    'Ready Meals': 'Ready to eat',
    'Snacks & Sides': 'Ready to eat',
    'Quick Meals': 'Ready to eat',
    'Staples': 'Ingredients',
  };

  if (oldSubcategory && oldToNew[oldSubcategory]) {
    return oldToNew[oldSubcategory];
  }

  // Default to 'Ready to eat' for unknown categories
  return oldSubcategory ? 'Ready to eat' : undefined;
}

// Load state from localStorage
function loadState(): AppState {
  try {
    const saved = localStorage.getItem('meals-app-state-v2');
    if (saved) {
      const parsed = JSON.parse(saved);

      // Migrate old string-based knownItems to object format
      const migratedKnownItems: Record<Section, KnownItem[]> = {
        fresh: [],
        frozen: [],
        dry: [],
      };

      for (const section of ['fresh', 'frozen', 'dry'] as Section[]) {
        const items = parsed.knownItems?.[section] || DEFAULT_STATE.knownItems[section];
        migratedKnownItems[section] = items.map((item: KnownItem | string) => {
          if (typeof item === 'string') {
            const defaultItem = DEFAULT_STATE.knownItems[section].find(d => d.name === item);
            const subcategory = migrateSubcategory(defaultItem?.subcategory, item, section);
            return { name: item, lastBought: null, typicalQty: defaultItem?.typicalQty || 1, subcategory };
          }
          // Migrate subcategory to new format
          const subcategory = migrateSubcategory(item.subcategory, item.name, section);
          return { ...item, subcategory };
        });
      }

      return {
        knownItems: migratedKnownItems,
        inventory: { ...DEFAULT_STATE.inventory, ...parsed.inventory },
        shoppingChecked: parsed.shoppingChecked || {},
        purchaseHistory: parsed.purchaseHistory || [],
        historyViewMonth: parsed.historyViewMonth || null,
      };
    }
  } catch (e) {
    console.error('Failed to load state:', e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextType | null>(null);

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, null, loadState);

  // Save to localStorage on every state change
  useEffect(() => {
    try {
      localStorage.setItem('meals-app-state-v2', JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook
export function useAppState() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within AppProvider');
  }
  return context;
}

// Selectors / computed values
export function getSectionTotal(state: AppState, section: Section): number {
  return state.inventory[section].reduce((sum, item) => sum + item.quantity, 0);
}

export function getTotalServings(state: AppState): number {
  return getSectionTotal(state, 'fresh') + getSectionTotal(state, 'frozen') + getSectionTotal(state, 'dry');
}

export function getSectionStatus(state: AppState, section: Section): 'empty' | 'warning' | 'good' {
  const total = getSectionTotal(state, section);
  if (total <= 0) return 'empty';
  if (total <= 2) return 'warning';
  return 'good';
}
