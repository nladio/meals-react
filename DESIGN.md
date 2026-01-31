# Meals-React Design Document

## 1. Overview

### Purpose
Meals-React is a food inventory and shopping list management application designed for tracking household meal supplies across different storage categories (fresh, frozen, dry goods). It provides smart shopping suggestions based on inventory levels and purchase history.

### Tech Stack
- **Framework:** React 19.2
- **Language:** TypeScript 5.9
- **Styling:** Tailwind CSS 4.1
- **Build Tool:** Vite 7.2
- **Persistence:** LocalStorage

---

## 2. Architecture

### State Management: Context + useReducer Pattern

The application uses React's built-in Context API combined with `useReducer` for centralized state management, avoiding external dependencies like Redux.

```
┌─────────────────────────────────────────────────────────┐
│                     AppProvider                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              AppContext.Provider                 │   │
│  │  ┌─────────┐    ┌─────────────┐    ┌─────────┐ │   │
│  │  │  state  │ ←  │   reducer   │ ←  │ dispatch│ │   │
│  │  └─────────┘    └─────────────┘    └─────────┘ │   │
│  └─────────────────────────────────────────────────┘   │
│                          ↓                              │
│                   localStorage                          │
│              'meals-app-state-v2'                       │
└─────────────────────────────────────────────────────────┘
```

#### Reducer Actions

| Action Type | Purpose |
|-------------|---------|
| `INCREMENT_ITEM` | Increase inventory item quantity |
| `DECREMENT_ITEM` | Decrease inventory item quantity (auto-removes at 0) |
| `ADD_TO_INVENTORY` | Add item to inventory, creates or merges |
| `ADD_KNOWN_ITEM` | Add new item to known items catalog |
| `SET_SHOPPING_CHECKED` | Toggle/set shopping list checkbox state |
| `CLEAR_SHOPPING_CHECKED` | Reset all shopping selections |
| `RECORD_PURCHASE` | Add purchase entry to history |
| `UPDATE_KNOWN_ITEM_PURCHASE` | Update lastBought and typicalQty |
| `SET_HISTORY_MONTH` | Change calendar view month |
| `LOAD_STATE` | Hydrate state from localStorage |

#### Computed Selectors

```typescript
getSectionTotal(state, section): number      // Sum of quantities in section
getTotalServings(state): number              // All sections combined
getSectionStatus(state, section): 'empty' | 'warning' | 'good'
```

### Routing: Hash-Based SPA

The application uses hash-based routing for client-side navigation without server configuration.

| Route | Component | Description |
|-------|-----------|-------------|
| `#dashboard` | Dashboard | Inventory management (default) |
| `#shopping` | Shopping | Shopping list with suggestions |
| `#history` | History | Purchase history calendar |

---

## 3. Data Model

### Core Types

```typescript
// Food storage categories
type Section = 'fresh' | 'frozen' | 'dry'

// Item in the known items catalog (previously purchased)
interface KnownItem {
  name: string
  lastBought: string | null    // ISO timestamp
  typicalQty: number           // Default quantity to buy
}

// Item currently in inventory
interface InventoryItem {
  id: string                   // Unique identifier
  name: string
  quantity: number             // Current count
  addedDate: string            // ISO timestamp
}

// Single item in a purchase
interface PurchaseItem {
  name: string
  section: Section
  qty: number
}

// Historical purchase record
interface PurchaseHistoryEntry {
  id: string
  date: string                 // YYYY-MM-DD format
  items: PurchaseItem[]
}

// Computed type for shopping list display
interface ShoppingListItem {
  name: string
  section: Section
  currentQty: number           // Current inventory qty
  suggestedQty: number         // Recommended to buy
  lastBought: string | null
}
```

### Root Application State

```typescript
interface AppState {
  knownItems: Record<Section, KnownItem[]>        // Item catalog by section
  inventory: Record<Section, InventoryItem[]>     // Current stock by section
  shoppingChecked: Record<string, boolean | number> // Shopping list UI state
  purchaseHistory: PurchaseHistoryEntry[]         // All historical purchases
  historyViewMonth: string | null                 // YYYY-MM format
}
```

---

## 4. Component Hierarchy

```
main.tsx
└── AppProvider (Context wrapper)
    └── App (Routing logic)
        └── Layout (Container with max-width)
            ├── AlertBanner (Sticky inventory status)
            ├── [Page Component]
            │   ├── Dashboard
            │   │   └── InventorySection (×3: fresh, frozen, dry)
            │   │       ├── FoodItem (×n per section)
            │   │       └── RestockControls
            │   ├── Shopping
            │   │   └── ShoppingItem (×n items)
            │   └── History
            │       ├── CalendarGrid
            │       └── DayDetail
            └── BottomNav (Fixed footer navigation)
```

### Shared UI Components

| Component | Location | Description |
|-----------|----------|-------------|
| `Button` | `components/ui/Button.tsx` | Variants: primary, secondary, danger, success, ghost |
| `QuantityControl` | `components/ui/QuantityControl.tsx` | +/- buttons with value display |
| `AlertBanner` | `components/AlertBanner.tsx` | Inventory status alerts |
| `BottomNav` | `components/BottomNav.tsx` | Fixed footer navigation |

---

## 5. Feature Documentation

### Dashboard: Inventory Management

**Purpose:** View and manage current food inventory across all sections.

**Components:**
- `pages/Dashboard/index.tsx` - Main page with total servings summary
- `pages/Dashboard/InventorySection.tsx` - Section container (fresh/frozen/dry)
- `pages/Dashboard/FoodItem.tsx` - Individual item with quantity controls
- `pages/Dashboard/RestockControls.tsx` - Add items dropdown + new item form

**Status Indicators:**
| Total Servings | Color | Status |
|----------------|-------|--------|
| ≥6 | Green | Good stock |
| 3-5 | Orange | Warning level |
| ≤2 | Red | Critical - running low |

**Item Features:**
- Increment/decrement quantity buttons
- Relative date display ("Today", "Yesterday", "5 days ago")
- Color-coded quantity badges (amber when low)
- Auto-removal when quantity reaches 0

---

### Shopping: Smart List Generation

**Purpose:** Generate intelligent shopping suggestions based on inventory and history.

**Shopping List Categories:**

| Category | Color | Logic |
|----------|-------|-------|
| **Need to Restock** | Red | Items at qty=0 or known items not in inventory |
| **Running Low** | Orange | Items at qty 1-2, suggests top-up amount |
| **For Variety** | Blue | Known items not bought in 7+ days (max 5 items) |

**Workflow:**
1. View auto-generated shopping suggestions
2. Check items to purchase
3. Adjust quantities as needed
4. Click "Add to Inventory"
5. System records purchase, updates inventory, clears selections

---

### History: Calendar View

**Purpose:** View purchase history by date with calendar navigation.

**Components:**
- `pages/History/index.tsx` - Month/year navigation
- `pages/History/CalendarGrid.tsx` - Calendar display
- `pages/History/DayDetail.tsx` - Purchase details for selected date

**Calendar Features:**
- Month navigation with prev/next arrows
- Days with purchases marked with green background + dot
- Today highlighted with blue border
- Click date to view purchase details

**Day Detail Display:**
- Full date format: "Monday, January 15, 2025"
- Items grouped by section
- Quantities shown (e.g., "Paneer Curry x2")

---

## 6. Data Flow Diagrams

### Adding Items via Dashboard

```
User clicks "Add" in RestockControls
           │
           ▼
    dispatch(ADD_TO_INVENTORY)
           │
           ▼
    ┌──────────────────────────┐
    │       Reducer            │
    │  ┌─────────────────────┐ │
    │  │ Check if item exists │ │
    │  │ in inventory        │ │
    │  └──────────┬──────────┘ │
    │             │            │
    │   ┌─────────┴─────────┐  │
    │   ▼                   ▼  │
    │ Create new item  Merge qty│
    │                          │
    │  Also: Add to knownItems │
    │  if new item             │
    └──────────────────────────┘
           │
           ▼
    State updates → UI re-renders
           │
           ▼
    useEffect saves to localStorage
```

### Shopping Flow

```
Shopping Page loads
        │
        ▼
Calculate shopping suggestions
(from inventory + knownItems + history)
        │
        ▼
User checks items, adjusts quantities
        │
        ▼
User clicks "Add to Inventory"
        │
        ▼
┌───────────────────────────────────┐
│ Multiple dispatches:              │
│ 1. ADD_TO_INVENTORY (per item)    │
│ 2. UPDATE_KNOWN_ITEM_PURCHASE     │
│ 3. RECORD_PURCHASE (history)      │
│ 4. CLEAR_SHOPPING_CHECKED         │
└───────────────────────────────────┘
        │
        ▼
State updates → Navigate to Dashboard
```

### History Viewing

```
History Page loads
        │
        ▼
Check state.historyViewMonth
(default to current month if null)
        │
        ▼
┌─────────────────────────────┐
│     CalendarGrid            │
│  ┌────────────────────────┐ │
│  │ Generate calendar for  │ │
│  │ current month          │ │
│  │                        │ │
│  │ Mark days with entries │ │
│  │ from purchaseHistory   │ │
│  └────────────────────────┘ │
└─────────────────────────────┘
        │
        ▼
User clicks date
        │
        ▼
┌─────────────────────────────┐
│      DayDetail              │
│  Filter purchaseHistory     │
│  by selected date           │
│  Group items by section     │
│  Display with quantities    │
└─────────────────────────────┘
```

---

## 7. Persistence

### LocalStorage Configuration

| Key | Value |
|-----|-------|
| **Key Name** | `meals-app-state-v2` |
| **Format** | JSON-serialized `AppState` |
| **Save Trigger** | Every state change (via useEffect) |

### Persistence Mechanism

```typescript
// Save on every state change
useEffect(() => {
  localStorage.setItem('meals-app-state-v2', JSON.stringify(state))
}, [state])

// Load on app initialization
const savedState = localStorage.getItem('meals-app-state-v2')
const initialState = savedState ? JSON.parse(savedState) : DEFAULT_STATE
```

### Migration Support

The application includes migration logic for format updates:
- Handles old string-based `knownItems` format
- Converts to current object-based `KnownItem[]` format
- Graceful fallback to `DEFAULT_STATE` on parse errors

### Default State

Pre-populated with common items:

**Fresh (6 items):** Paneer Curry, Dal Makhani, Chapatis, Palak Paneer, Chole, Aloo Gobi

**Frozen (4 items):** Biryani, TJs Palak Paneer, Frozen Samosas, Frozen Parathas

**Dry (5 items):** Instant Noodles, Canned Soup, Rice, Tortillas, Beans

---

## 8. Directory Structure

```
meals-react/
├── src/
│   ├── main.tsx                    # Entry point with AppProvider
│   ├── App.tsx                     # Routing logic
│   ├── types/
│   │   └── index.ts                # TypeScript type definitions
│   ├── hooks/
│   │   ├── useAppState.tsx         # Context + reducer + selectors
│   │   └── useLocalStorage.ts      # Generic localStorage hook
│   ├── utils/
│   │   └── helpers.ts              # formatRelativeDate, generateId
│   ├── components/
│   │   ├── Layout.tsx              # Main layout wrapper
│   │   ├── AlertBanner.tsx         # Status alert display
│   │   ├── BottomNav.tsx           # Navigation bar
│   │   └── ui/
│   │       ├── Button.tsx          # Reusable button component
│   │       └── QuantityControl.tsx # Quantity +/- control
│   └── pages/
│       ├── Dashboard/
│       │   ├── index.tsx           # Dashboard page
│       │   ├── InventorySection.tsx
│       │   ├── FoodItem.tsx
│       │   └── RestockControls.tsx
│       ├── Shopping/
│       │   ├── index.tsx           # Shopping list page
│       │   └── ShoppingItem.tsx
│       └── History/
│           ├── index.tsx           # History page
│           ├── CalendarGrid.tsx
│           └── DayDetail.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 9. Utility Functions

### helpers.ts

```typescript
// Returns relative date string
formatRelativeDate(date: string): string
// Examples: "Today", "Yesterday", "5 days ago", "Jan 10"

// Generates unique ID
generateId(): string
// Format: timestamp(base36) + random(base36)
```

---

## 10. Alert System

The `AlertBanner` component displays sticky alerts based on inventory status:

| Condition | Alert Level | Message |
|-----------|-------------|---------|
| Total ≤4 servings | Critical (Red) | "Running critically low on food!" |
| Fresh ≤2 servings | Warning (Orange) | "Running low on fresh food" |
| No fresh, have backups | Warning (Orange) | "Out of fresh food, using backups" |
| Stocked well | Hidden | No alert |
