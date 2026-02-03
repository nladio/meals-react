# Domain Model

Core types and their relationships in the meals-react application.

## Type Definitions Location

All types are centralized in `src/types/index.ts`.

## Core Enums and Union Types

### Section

```typescript
type Section = 'fresh' | 'frozen' | 'dry'
```

Primary organizational unit for all food items.

### ItemUsage

```typescript
type ItemUsage = 'meal' | 'ingredient'
```

Categorizes how an item is used. Items can have both usages (e.g., "Paneer" is both a meal and an ingredient).

### Store

```typescript
type Store = 'indian-store' | 'costco' | 'grocery'
```

Where items are typically purchased.

### Priority

```typescript
type Priority = 'low' | 'medium' | 'high'
```

Shopping priority level.

### Categories

```typescript
type IngredientCategory = 'produce' | 'dairy' | 'protein' | 'condiments' | 'grains' | 'legumes'
type MealCategory = 'curries' | 'soups' | 'noodles' | 'snacks' | 'ready-meals'
type NutritionTag = 'high-protein' | 'high-fiber'
```

## Core Interfaces

### KnownItem (Catalog Entry)

```typescript
interface KnownItem {
  name: string
  typicalQty: number              // Suggested purchase quantity
  usages: ItemUsage[]             // 'meal', 'ingredient', or both

  // Category (one or the other based on usage)
  ingredientCategory?: IngredientCategory
  mealCategory?: MealCategory

  // Shopping info
  priority: Priority
  stores: Store[]

  // Time and freshness
  defaultExpiryDays: number       // Days until expiry
  prepTimeMinutes?: number        // For meals only

  // Nutrition
  nutritionTags?: NutritionTag[]

  // Metadata
  isDefault?: boolean             // Added by getMergedKnownItems
  staple?: boolean                // Always show in Staples section
}
```

### InventoryItem (Current Stock)

```typescript
interface InventoryItem {
  id: string                      // Unique identifier
  name: string                    // Must match a KnownItem name
  quantity: number                // Current quantity in stock
  addedDate: string               // ISO date when added
  expiryDate?: string             // ISO date of expiry
}
```

### Recipe

```typescript
interface Recipe {
  id: string
  name: string
  prepTimeMinutes: number
  ingredients: RecipeIngredient[]
  nutritionTags?: NutritionTag[]
}

interface RecipeIngredient {
  name: string
  required: boolean               // false = optional ingredient
}
```

### RecipeMatch (Computed)

```typescript
type MatchStatus = 'full' | 'partial' | 'none'

interface RecipeMatch {
  recipe: Recipe
  status: MatchStatus
  availableIngredients: string[]
  missingRequired: string[]
  missingOptional: string[]
}
```

### Shopping Types

```typescript
interface ShoppingListItem {
  name: string
  section: Section
  currentQty: number
  suggestedQty: number
  lastBought?: string
}

interface ShoppingListEntry {
  name: string
  section: Section
  store: Store
}
```

### Purchase History

```typescript
interface PurchaseItem {
  name: string
  section: Section
  qty: number
}

interface PurchaseHistoryEntry {
  id: string
  date: string                    // YYYY-MM-DD format
  items: PurchaseItem[]
}
```

### Food Orders (External)

```typescript
interface Dish {
  name: string
  cost: number
  tags: DishTags
  macros?: Macros
}

interface DishTags {
  mealTime: MealTime[]
  cuisine: Cuisine
  dishType: DishType
}

interface Macros {
  calories: number
  protein: number
  carbs: number
  fat: number
}

interface Order {
  id: string
  restaurant: string
  dishes: Dish[]
}
```

## Type Relationships Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CATALOG LAYER                             │
│  ┌──────────────┐                     ┌──────────────┐          │
│  │ KnownItem    │◄──── merges with ──►│DefaultKnown  │          │
│  │ (custom)     │                     │   Item       │          │
│  └──────────────┘                     └──────────────┘          │
│         │                                    │                   │
│         └──────────────┬─────────────────────┘                   │
│                        ▼                                         │
│              getMergedKnownItems()                               │
└─────────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      INVENTORY LAYER                             │
│  ┌──────────────┐                     ┌──────────────┐          │
│  │InventoryItem │ ─── references ───► │  KnownItem   │          │
│  │ (by name)    │                     │  (merged)    │          │
│  └──────────────┘                     └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DERIVED DATA                                │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     │
│  │ShoppingList  │     │ RecipeMatch  │     │ Prep Time    │     │
│  │Item          │     │              │     │ Categories   │     │
│  └──────────────┘     └──────────────┘     └──────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

## Merged Catalog Pattern

Default items and custom items are stored separately but merged at read time:

```typescript
// Storage (AppState)
customKnownItems: Record<Section, KnownItem[]>  // User additions only

// Read (via selector)
getMergedKnownItems(state)  // Returns defaults + custom merged
```

Benefits:
- Default items can be updated without losing user data
- User customizations are clearly separated
- `isDefault` flag distinguishes origin

## Computed Values

### Expiry Status

```typescript
getExpiryStatus(expiryDate?: string): 'expired' | 'expiring-soon' | 'ok' | null
```

- `expired`: Past expiry date
- `expiring-soon`: Within 3 days of expiry
- `ok`: More than 3 days remaining
- `null`: No expiry date set

### Recipe Matching

```typescript
getAllRecipeMatches(inventory, recipes): RecipeMatch[]
```

- `full`: All required ingredients in stock
- `partial`: All required, but missing some optional
- `none`: Missing required ingredients

### Prep Time Categories

Items categorized for Dashboard display:

| Category | Prep Time | Use Case |
|----------|-----------|----------|
| Quick Reheat | 0-5 min | Ready-to-eat meals |
| Instant Prep | 6-15 min | Quick cooking |
| Quick Recipes | 16+ min | Recipe-based meals |
| Food Orders | ~1 hour | External delivery |

## Section Organization

Each section uses the same structure:

```typescript
Record<Section, T[]>

// Examples:
customKnownItems: { fresh: [...], frozen: [...], dry: [...] }
inventory: { fresh: [...], frozen: [...], dry: [...] }
```

This pattern enables:
- Consistent iteration across sections
- Section-specific totals and status
- UI grouping by storage type
