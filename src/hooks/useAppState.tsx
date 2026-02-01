import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { AppState, Section, PurchaseItem, KnownItem, InventoryItem, ItemUsage } from '../types';
import { generateId } from '../utils/helpers';
import { defaultKnownItems, getDefaultItemNames } from '../data/defaultKnownItems';

// Default state - customKnownItems is empty, defaults come from data file
const DEFAULT_STATE: AppState = {
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
  historyViewMonth: null,
};

// Selector: Merge default items with custom items for display
export function getMergedKnownItems(state: AppState): Record<Section, KnownItem[]> {
  const merged: Record<Section, KnownItem[]> = {
    fresh: [],
    frozen: [],
    dry: [],
  };

  for (const section of ['fresh', 'frozen', 'dry'] as Section[]) {
    // Add default items with isDefault: true
    // If user has purchase data for a default item in customKnownItems, merge it
    for (const defaultItem of defaultKnownItems[section]) {
      const customData = state.customKnownItems[section].find(c => c.name === defaultItem.name);
      merged[section].push({
        name: defaultItem.name,
        typicalQty: customData?.typicalQty ?? defaultItem.typicalQty,
        usages: defaultItem.usages,
        ingredientCategory: defaultItem.ingredientCategory,
        lastBought: customData?.lastBought ?? null,
        isDefault: true,
      });
    }

    // Add custom items (not in defaults) with isDefault: false
    const defaultNames = getDefaultItemNames(section);
    for (const customItem of state.customKnownItems[section]) {
      if (!defaultNames.has(customItem.name)) {
        merged[section].push({
          ...customItem,
          isDefault: false,
        });
      }
    }
  }

  return merged;
}

// Actions
type Action =
  | { type: 'INCREMENT_ITEM'; section: Section; id: string }
  | { type: 'DECREMENT_ITEM'; section: Section; id: string }
  | { type: 'ADD_TO_INVENTORY'; section: Section; name: string; qty: number; expiryDate?: string }
  | { type: 'ADD_KNOWN_ITEM'; section: Section; name: string; usages?: ItemUsage[] }
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

      // Also add to custom known items if not already there and not a default item
      const defaultNames = getDefaultItemNames(action.section);
      const isDefault = defaultNames.has(action.name);
      const customExists = state.customKnownItems[action.section].find(k => k.name === action.name);

      const newCustomKnownItems = (isDefault || customExists)
        ? state.customKnownItems
        : {
            ...state.customKnownItems,
            [action.section]: [
              ...state.customKnownItems[action.section],
              { name: action.name, lastBought: null, typicalQty: action.qty, usages: ['meal'] as ItemUsage[] },
            ],
          };

      return {
        ...state,
        customKnownItems: newCustomKnownItems,
        inventory: {
          ...state.inventory,
          [action.section]: [...state.inventory[action.section], newItem],
        },
      };
    }

    case 'ADD_KNOWN_ITEM': {
      // Check if already exists in defaults
      const defaultNames = getDefaultItemNames(action.section);
      if (defaultNames.has(action.name)) return state;

      // Check if already exists in custom items
      const customExists = state.customKnownItems[action.section].find(k => k.name === action.name);
      if (customExists) return state;

      return {
        ...state,
        customKnownItems: {
          ...state.customKnownItems,
          [action.section]: [
            ...state.customKnownItems[action.section],
            { name: action.name, lastBought: null, typicalQty: 1, usages: action.usages || ['meal'] },
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
      const defaultNames = getDefaultItemNames(action.section);
      const isDefault = defaultNames.has(action.name);
      const customExists = state.customKnownItems[action.section].find(k => k.name === action.name);

      // If it's a default item or custom item that doesn't exist yet, add/update in customKnownItems
      // to store user's purchase data (lastBought, typicalQty)
      if (isDefault && !customExists) {
        // Add entry to track purchase data for default item
        return {
          ...state,
          customKnownItems: {
            ...state.customKnownItems,
            [action.section]: [
              ...state.customKnownItems[action.section],
              { name: action.name, lastBought: new Date().toISOString(), typicalQty: action.qty },
            ],
          },
        };
      }

      // Update existing entry in customKnownItems
      return {
        ...state,
        customKnownItems: {
          ...state.customKnownItems,
          [action.section]: state.customKnownItems[action.section].map(item =>
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

// Migrate v2 subcategory to v3 usages
function migrateSubcategoryToUsages(subcategory: string | undefined): ItemUsage[] {
  if (subcategory === 'Ready to eat') return ['meal'];
  if (subcategory === 'Ingredients') return ['ingredient'];
  return ['meal']; // default
}

// Load state from localStorage
function loadState(): AppState {
  try {
    // Try v3 first
    const savedV3 = localStorage.getItem('meals-app-state-v3');
    if (savedV3) {
      const parsed = JSON.parse(savedV3);
      return {
        customKnownItems: parsed.customKnownItems || DEFAULT_STATE.customKnownItems,
        inventory: { ...DEFAULT_STATE.inventory, ...parsed.inventory },
        shoppingChecked: parsed.shoppingChecked || {},
        purchaseHistory: parsed.purchaseHistory || [],
        historyViewMonth: parsed.historyViewMonth || null,
      };
    }

    // Try v2 and migrate to v3
    const savedV2 = localStorage.getItem('meals-app-state-v2');
    if (savedV2) {
      const parsed = JSON.parse(savedV2);

      // Migrate customKnownItems from subcategory to usages
      const migratedCustomKnownItems: Record<Section, KnownItem[]> = {
        fresh: [],
        frozen: [],
        dry: [],
      };

      for (const section of ['fresh', 'frozen', 'dry'] as Section[]) {
        const items = parsed.customKnownItems?.[section] || [];
        const defaultNames = getDefaultItemNames(section);

        for (const item of items) {
          const isDefault = defaultNames.has(item.name);
          // For custom items, migrate subcategory to usages
          // For default items with user data, just keep name/lastBought/typicalQty
          migratedCustomKnownItems[section].push({
            name: item.name,
            lastBought: item.lastBought,
            typicalQty: item.typicalQty || 1,
            usages: isDefault ? [] : migrateSubcategoryToUsages(item.subcategory),
          });
        }
      }

      return {
        customKnownItems: migratedCustomKnownItems,
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
      localStorage.setItem('meals-app-state-v3', JSON.stringify(state));
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
