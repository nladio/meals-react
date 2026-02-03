# Data Layer

Default data files, loading patterns, and data structure details.

## Directory Structure

```
src/data/
├── defaultKnownItems.ts   # Main catalog (loads JSON files)
├── fresh-items.json       # Fresh section items
├── frozen-items.json      # Frozen section items
├── dry-items.json         # Dry section items
├── recipes.ts             # Recipe definitions
└── foodOrders.ts          # External food order options
```

## Default Known Items

### Main Export (`defaultKnownItems.ts`)

```typescript
export const defaultKnownItems: Record<Section, DefaultKnownItem[]> = {
  fresh: freshItems,
  frozen: frozenItems,
  dry: dryItems
}
```

### Helper Functions

```typescript
// Get names of default items for a section
getDefaultItemNames(section: Section): Set<string>

// Get all default item names across all sections
getAllDefaultItemNames(): Set<string>
```

### DefaultKnownItem Extension

```typescript
interface DefaultKnownItem extends KnownItem {
  staple?: boolean  // Always show in Staples shopping section
}
```

## JSON Data Files

### fresh-items.json

Contains produce, dairy, proteins, condiments, and breads.

**Item Count**: ~50+ items

**Sample Structure**:
```json
{
  "name": "Milk",
  "typicalQty": 2,
  "usages": ["ingredient"],
  "ingredientCategory": "dairy",
  "defaultExpiryDays": 7,
  "nutritionTags": [],
  "priority": "high",
  "stores": ["grocery", "costco"]
}
```

**Categories Represented**:
- `produce`: Vegetables, fruits
- `dairy`: Milk, cheese, yogurt, paneer
- `protein`: Eggs, tofu
- `condiments`: Sauces, spreads

### frozen-items.json

Contains frozen meals, samosas, parathas, and frozen proteins.

**Item Count**: ~8-12 items

**Sample Structure**:
```json
{
  "name": "Frozen Samosas",
  "typicalQty": 1,
  "usages": ["meal"],
  "mealCategory": "snacks",
  "defaultExpiryDays": 90,
  "prepTimeMinutes": 15,
  "priority": "medium",
  "stores": ["indian-store"]
}
```

**Categories Represented**:
- `snacks`: Samosas, spring rolls
- `ready-meals`: Pre-made frozen dinners
- Uncooked breads: Parathas, naan

### dry-items.json

Contains pantry staples, grains, legumes, and dry goods.

**Sample Structure**:
```json
{
  "name": "Rice",
  "typicalQty": 1,
  "usages": ["ingredient"],
  "ingredientCategory": "grains",
  "defaultExpiryDays": 365,
  "priority": "high",
  "stores": ["indian-store", "costco"],
  "staple": true
}
```

**Categories Represented**:
- `grains`: Rice, quinoa, pasta
- `legumes`: Lentils, beans
- Spices and seasonings

## Item Metadata Fields

### Time-Related

| Field | Type | Purpose |
|-------|------|---------|
| `defaultExpiryDays` | number | Days until item expires |
| `prepTimeMinutes` | number | Meal preparation time (meals only) |

### Shopping-Related

| Field | Type | Purpose |
|-------|------|---------|
| `typicalQty` | number | Suggested purchase quantity |
| `priority` | Priority | Shopping urgency (low/medium/high) |
| `stores` | Store[] | Where to buy |
| `staple` | boolean | Always show in shopping list |

### Categorization

| Field | Type | Purpose |
|-------|------|---------|
| `usages` | ItemUsage[] | meal, ingredient, or both |
| `ingredientCategory` | IngredientCategory | For ingredient items |
| `mealCategory` | MealCategory | For meal items |
| `nutritionTags` | NutritionTag[] | high-protein, high-fiber |

## Recipes (`recipes.ts`)

### Structure

```typescript
export const defaultRecipes: Recipe[] = [
  {
    id: "dal-tadka",
    name: "Dal Tadka",
    prepTimeMinutes: 30,
    ingredients: [
      { name: "Yellow Lentils", required: true },
      { name: "Onion", required: true },
      { name: "Tomatoes", required: true },
      { name: "Garlic", required: false },
      { name: "Cilantro", required: false }
    ],
    nutritionTags: ["high-protein", "high-fiber"]
  },
  // ... more recipes
]
```

### Recipe Count

~20+ recipes covering:
- Indian dishes (Dal, Paneer dishes)
- Quick meals (Sandwiches, Toast)
- Soups and curries

### Ingredient Matching

Recipe ingredients match against `KnownItem.name` values for inventory matching.

## Food Orders (`foodOrders.ts`)

### Structure

```typescript
export const orders: Order[] = [
  {
    id: "clay-oven",
    restaurant: "Clay Oven Cuisine of India",
    dishes: [
      {
        name: "Dal",
        cost: 12.99,
        tags: {
          mealTime: ["Lunch", "Dinner"],
          cuisine: "Indian",
          dishType: "Main"
        },
        macros: {
          calories: 350,
          protein: 15,
          carbs: 45,
          fat: 12
        }
      }
    ]
  }
]
```

### Purpose

Pre-configured restaurant orders for the Food Orders section on Dashboard, representing ~1 hour delivery/pickup option.

## Data Loading Pattern

### At Application Start

```typescript
// defaultKnownItems.ts loads JSON at import time
import freshItems from './fresh-items.json'
import frozenItems from './frozen-items.json'
import dryItems from './dry-items.json'

export const defaultKnownItems = {
  fresh: freshItems,
  frozen: frozenItems,
  dry: dryItems
}
```

### At Runtime (via Selector)

```typescript
// Components access merged catalog via selector
const mergedItems = getMergedKnownItems(state);
// Returns: defaults + user's customKnownItems merged
```

## Data Relationships

```
┌─────────────────────────────────────────────────────────────────┐
│                    JSON DATA FILES                               │
│  fresh-items.json  frozen-items.json  dry-items.json            │
└─────────────────────────────────────────────────────────────────┘
                           │
                           ▼ import
┌─────────────────────────────────────────────────────────────────┐
│                  defaultKnownItems.ts                            │
│           Record<Section, DefaultKnownItem[]>                    │
└─────────────────────────────────────────────────────────────────┘
                           │
                           ▼ merged with
┌─────────────────────────────────────────────────────────────────┐
│                  AppState.customKnownItems                       │
│           Record<Section, KnownItem[]>                           │
└─────────────────────────────────────────────────────────────────┘
                           │
                           ▼ via getMergedKnownItems()
┌─────────────────────────────────────────────────────────────────┐
│                  Component Data Access                           │
│      • Inventory display                                         │
│      • Shopping list generation                                  │
│      • Recipe matching                                           │
│      • Dashboard categorization                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Adding New Data

### New Default Item

1. Add to appropriate JSON file (`fresh-items.json`, etc.)
2. Include all required fields (see Item Metadata Fields)
3. Ensure `name` is unique within section

### New Recipe

1. Add to `recipes.ts` `defaultRecipes` array
2. Ensure ingredient names match existing `KnownItem.name` values
3. Mark ingredients as `required: true/false`

### New Food Order

1. Add to `foodOrders.ts` `orders` array
2. Include restaurant name and dishes with costs/tags
