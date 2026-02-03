# Component Architecture

Overview of routing, page structure, and component organization.

## Hash-Based Routing

### Implementation

Located in `src/App.tsx`:

```typescript
const [page, setPage] = useState(getInitialPage());

useEffect(() => {
  const handleHashChange = () => {
    setPage(window.location.hash.slice(1) || 'dashboard');
  };
  window.addEventListener('hashchange', handleHashChange);
  return () => window.removeEventListener('hashchange', handleHashChange);
}, []);
```

### Routes

| Hash | Page Component | Layout Width |
|------|----------------|--------------|
| `#dashboard` (default) | Dashboard | Standard |
| `#inventory` | Inventory | Standard |
| `#shopping` | Shopping | Wide (max-w-5xl) |
| `#recipes` | Recipes | Standard |
| `#nutrition` | WhatToEat | Standard |

### Navigation

Navigation via `onNavigate` callback changes `window.location.hash`:

```typescript
<BottomNav currentPage={page} onNavigate={navigate} />
```

## Page Components

Located in `src/pages/`.

### Dashboard (`src/pages/Dashboard/`)

Meal suggestions organized by preparation time.

```
Dashboard/
├── index.tsx              # Main component, orchestrates sections
├── QuickReheatSection.tsx # 0-5 min meals (ready to eat)
├── InstantPrepSection.tsx # 6-15 min meals (quick cooking)
├── QuickRecipes.tsx       # 16+ min recipes
├── FoodOrderSection.tsx   # External food orders
├── OrderCard.tsx          # Single order display
└── DishItem.tsx           # Single dish within order
```

**Data Flow**: Filters inventory items by `prepTimeMinutes` into sections.

### Inventory (`src/pages/Inventory/`)

Current stock management, grouped by usage.

```
Inventory/
└── index.tsx              # Groups items as meals vs ingredients
```

**Displays**:
- Items grouped by `usages` (meal, ingredient, or both)
- Quantity controls (increment/decrement)
- Expiry warnings
- Add new item modal

### Shopping (`src/pages/Shopping/`)

Shopping list organized by store.

```
Shopping/
├── index.tsx                  # Main, groups by store
├── ShoppingItem.tsx           # Individual shopping item
├── StapleSubcategoryGroup.tsx # Staple items grouped
└── NutritionGoalsSection.tsx  # Nutrition tracking display
```

**Data Flow**:
1. Collects items with `quantity ≤ 2` or `quantity = 0`
2. Groups by `store` from KnownItem
3. Calculates `suggestedQty = max(1, typicalQty - currentQty)`

### Recipes (`src/pages/Recipes/`)

Recipe matching against current inventory.

```
Recipes/
├── index.tsx      # Lists all recipes with match status
└── RecipeCard.tsx # Single recipe with ingredient status
```

**Data Flow**: Uses `getAllRecipeMatches()` to compute matches.

### WhatToEat (`src/pages/WhatToEat/`)

Nutrition-focused meal selection.

```
WhatToEat/
└── index.tsx      # Nutrition-based recommendations
```

## Component Hierarchy Diagram

```
App
├── AppProvider (Context)
│   └── Layout
│       ├── PageHeader
│       ├── AlertBanner (conditional)
│       │
│       ├── [Page Component]
│       │   ├── Dashboard
│       │   │   ├── QuickReheatSection
│       │   │   │   └── MealCard (multiple)
│       │   │   ├── InstantPrepSection
│       │   │   │   └── MealCard (multiple)
│       │   │   ├── QuickRecipes
│       │   │   └── FoodOrderSection
│       │   │       └── OrderCard → DishItem
│       │   │
│       │   ├── Inventory
│       │   │   ├── SubcategoryGroup (multiple)
│       │   │   │   └── FoodItem (multiple)
│       │   │   └── AddItemModal
│       │   │
│       │   ├── Shopping
│       │   │   ├── StapleSubcategoryGroup (per store)
│       │   │   │   └── ShoppingItem (multiple)
│       │   │   └── NutritionGoalsSection
│       │   │
│       │   ├── Recipes
│       │   │   └── RecipeCard (multiple)
│       │   │
│       │   └── WhatToEat
│       │
│       └── BottomNav
```

## Shared UI Components

Located in `src/components/ui/`.

### Button

```typescript
<Button
  variant="primary" | "secondary" | "danger" | "success" | "ghost"
  size="sm" | "md" | "lg"
  onClick={handler}
>
  Label
</Button>
```

### Modal

```typescript
<Modal
  isOpen={boolean}
  onClose={handler}
  title="Modal Title"
>
  {children}
</Modal>
```

### QuantityControl

```typescript
<QuantityControl
  quantity={number}
  onIncrement={handler}
  onDecrement={handler}
/>
```

### NutritionBadge

```typescript
<NutritionBadge tag="high-protein" | "high-fiber" />
```

## Layout Components

Located in `src/components/`.

### Layout

Main wrapper providing:
- Responsive container (`max-w-600px` standard, `max-w-5xl` for wide pages)
- Page structure with header and content area
- Bottom navigation integration

```typescript
<Layout
  currentPage={string}
  onNavigate={handler}
  wide={boolean}  // For Shopping page
>
  {children}
</Layout>
```

### BottomNav

5-tab navigation bar:

| Icon | Label | Route |
|------|-------|-------|
| Home | Home | `#dashboard` |
| Package | Inventory | `#inventory` |
| ShoppingCart | Shopping | `#shopping` |
| Apple | Nutrition | `#nutrition` |
| Book | Recipes | `#recipes` |

### PageHeader

```typescript
<PageHeader
  title="Page Title"
  showBack={boolean}
  onBack={handler}
/>
```

### EmptyState

```typescript
<EmptyState message="No items found" />
```

## Feature Components

### Inventory Feature (`src/components/inventory/`)

```
inventory/
├── FoodItem.tsx        # Single item with quantity controls
├── SubcategoryGroup.tsx # Groups items by category
├── AddItemModal.tsx    # Form for adding new items
├── RestockControls.tsx # Quantity adjustment UI
└── index.ts            # Barrel export
```

## Component Communication

### Via Context (Global State)

```typescript
const { state, dispatch } = useAppState();
```

Used for:
- Reading inventory data
- Dispatching state changes
- Accessing selectors

### Via Props (Local Communication)

```typescript
// Parent passes callbacks
<FoodItem
  item={item}
  onIncrement={() => dispatch({...})}
  onDecrement={() => dispatch({...})}
/>
```

### Via Hash Navigation

```typescript
// Navigate between pages
onNavigate('inventory');
// Results in: window.location.hash = '#inventory'
```

## Testing Pattern

Tests are colocated with components:

```
Component.tsx
Component.test.tsx
```

Example test files:
- `FoodItem.test.tsx`
- `QuickReheatSection.test.tsx`
- `RecipeCard.test.tsx`
- `NutritionGoalsSection.test.tsx`
