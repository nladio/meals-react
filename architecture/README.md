# meals-react Architecture Overview

Quick orientation guide for new developers and Claude agents.

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **State**: Context + useReducer (no Redux)
- **Persistence**: localStorage (`meals-app-state-v3`)
- **Routing**: Hash-based (`#dashboard`, `#inventory`, etc.)
- **Testing**: Vitest + React Testing Library + happy-dom

## Key File Locations

| Purpose | Location |
|---------|----------|
| All TypeScript types | `src/types/index.ts` |
| State management | `src/hooks/useAppState.tsx` |
| Default item catalog | `src/data/defaultKnownItems.ts` |
| Recipe definitions | `src/data/recipes.ts` |
| Page components | `src/pages/` |
| Shared UI components | `src/components/ui/` |

## Core Concepts

- **Section**: `'fresh' | 'frozen' | 'dry'` - primary data organization
- **KnownItem**: Catalog entries (defaults + user-added)
- **InventoryItem**: Current stock with quantities
- **ItemUsage**: `'meal' | 'ingredient'` - items can be both

## Data Flow Summary

```
User Action → dispatch(action) → reducer → new state → localStorage persist
                                    ↓
                            Components re-render via Context
```

## Architecture Documents

- [State Management](./state-management.md) - AppState, actions, reducer, selectors, persistence
- [Domain Model](./domain-model.md) - Types, relationships, computed values
- [Components](./components.md) - Routing, pages, component hierarchy
- [Data Layer](./data-layer.md) - JSON files, defaults, recipes

## Quick Reference

### Routes

| Hash | Page | Purpose |
|------|------|---------|
| `#dashboard` | Dashboard | Meal suggestions by prep time |
| `#inventory` | Inventory | Current stock management |
| `#shopping` | Shopping | Shopping list by store |
| `#recipes` | Recipes | Recipe matching against inventory |
| `#nutrition` | WhatToEat | Nutrition-focused meal selection |

### State Shape

```typescript
AppState {
  customKnownItems: Record<Section, KnownItem[]>  // User-added catalog items
  inventory: Record<Section, InventoryItem[]>     // Current stock
  shoppingChecked: Record<string, boolean|number> // Shopping list state
  purchaseHistory: PurchaseHistoryEntry[]         // Past purchases
  shoppingList: ShoppingListEntry[]               // Manual shopping items
}
```

### Running Commands

```bash
npm run dev        # Dev server (usually already running)
npm test           # Run tests
npm run typecheck  # Type checking including tests
```
