# State Management Architecture

Central state management using React Context + useReducer pattern.

## Location

`src/hooks/useAppState.tsx`

## AppState Interface

```typescript
interface AppState {
  customKnownItems: Record<Section, KnownItem[]>    // User-added catalog items only
  inventory: Record<Section, InventoryItem[]>        // Current stock with quantities
  shoppingChecked: Record<string, boolean | number>  // Shopping list check states
  purchaseHistory: PurchaseHistoryEntry[]            // Purchase records
  shoppingList: ShoppingListEntry[]                  // User-added shopping items
}
```

### Field Details

| Field | Purpose |
|-------|---------|
| `customKnownItems` | Items added by users (merged with defaults at read time) |
| `inventory` | What's currently in stock, organized by section |
| `shoppingChecked` | Tracks which shopping items are checked off |
| `purchaseHistory` | Historical record of purchases for suggestions |
| `shoppingList` | Manually added items to the shopping list |

## Actions

### Inventory Actions

| Action | Payload | Behavior |
|--------|---------|----------|
| `INCREMENT_ITEM` | `{ section, id }` | Add 1 to item quantity |
| `DECREMENT_ITEM` | `{ section, id }` | Remove 1 from quantity (removes at 0) |
| `ADD_TO_INVENTORY` | `{ section, name, qty, expiryDate? }` | Add new or update existing item |

### Catalog Actions

| Action | Payload | Behavior |
|--------|---------|----------|
| `ADD_KNOWN_ITEM` | `{ section, name, usages? }` | Add to custom catalog |
| `UPDATE_KNOWN_ITEM_PURCHASE` | `{ section, name, qty }` | Update typical quantity based on purchase |

### Shopping Actions

| Action | Payload | Behavior |
|--------|---------|----------|
| `SET_SHOPPING_CHECKED` | `{ key, value }` | Check/uncheck shopping item |
| `CLEAR_SHOPPING_CHECKED` | (none) | Reset all checked states |
| `ADD_TO_SHOPPING_LIST` | `{ entry }` | Add manual shopping item |
| `REMOVE_FROM_SHOPPING_LIST` | `{ name, store }` | Remove from shopping list |

### Purchase Actions

| Action | Payload | Behavior |
|--------|---------|----------|
| `RECORD_PURCHASE` | `{ date, items }` | Record purchase history |

### State Management

| Action | Payload | Behavior |
|--------|---------|----------|
| `LOAD_STATE` | `{ state }` | Replace entire state (for import/migration) |

## Selector Functions

Selectors compute derived data from state. Always use these instead of computing values inline.

### getMergedKnownItems

```typescript
getMergedKnownItems(state: AppState): Record<Section, KnownItem[]>
```

Merges default catalog items with user's custom items. Default items are marked with `isDefault: true`. This is the primary way to access the full item catalog.

### getSectionTotal

```typescript
getSectionTotal(state: AppState, section: Section): number
```

Returns total quantity of all items in a section.

### getTotalServings

```typescript
getTotalServings(state: AppState): number
```

Returns total quantity across all sections (fresh + frozen + dry).

### getSectionStatus

```typescript
getSectionStatus(state: AppState, section: Section): 'empty' | 'warning' | 'good'
```

Returns status based on section quantities:
- `empty`: Total = 0
- `warning`: Total ≤ threshold
- `good`: Above threshold

## Persistence

### localStorage Key

Current: `meals-app-state-v3`

### Save Pattern

State is saved to localStorage on every change via `useEffect`:

```typescript
useEffect(() => {
  localStorage.setItem('meals-app-state-v3', JSON.stringify(state));
}, [state]);
```

### Load Pattern

```typescript
function loadState(): AppState {
  // Try v3 first
  const v3 = localStorage.getItem('meals-app-state-v3');
  if (v3) return JSON.parse(v3);

  // Fall back to v2 with migration
  const v2 = localStorage.getItem('meals-app-state-v2');
  if (v2) return migrateV2toV3(JSON.parse(v2));

  // Return empty state
  return getEmptyState();
}
```

### Migration (v2 → v3)

The v2 → v3 migration converted `subcategory` field to `usages` array:
- Items with `subcategory: 'meal'` → `usages: ['meal']`
- Items with `subcategory: 'ingredient'` → `usages: ['ingredient']`

## State Flow Diagram

```
┌─────────────┐     dispatch(action)     ┌───────────┐
│  Component  │ ──────────────────────►  │  Reducer  │
└─────────────┘                          └───────────┘
       ▲                                       │
       │                                       │ new state
       │                                       ▼
       │                               ┌───────────────┐
       │          Context              │   AppState    │
       └─────────────────────────────  │  (Provider)   │
                                       └───────────────┘
                                              │
                                              │ useEffect
                                              ▼
                                       ┌───────────────┐
                                       │  localStorage │
                                       │    (v3)       │
                                       └───────────────┘
```

## Usage Example

```typescript
function MyComponent() {
  const { state, dispatch } = useAppState();

  // Read merged catalog
  const knownItems = getMergedKnownItems(state);

  // Get derived data
  const freshTotal = getSectionTotal(state, 'fresh');

  // Dispatch action
  const handleAdd = () => {
    dispatch({
      type: 'ADD_TO_INVENTORY',
      payload: { section: 'fresh', name: 'Milk', qty: 1 }
    });
  };

  return /* ... */;
}
```

## Empty State

```typescript
const emptyState: AppState = {
  customKnownItems: { fresh: [], frozen: [], dry: [] },
  inventory: { fresh: [], frozen: [], dry: [] },
  shoppingChecked: {},
  purchaseHistory: [],
  shoppingList: []
};
```
