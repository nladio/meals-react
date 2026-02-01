# Dashboard - "What to Eat" Requirements

## Overview

The Dashboard (titled "What to Eat") helps users decide what to eat by showing ready-to-eat meals, recipe suggestions based on available ingredients, and food ordering options. For full inventory management, see [Inventory](./inventory.md).

## Functional Requirements

### FR-DASH-001: View Ready-to-Eat Items by Section

- The system shall display only items with `meal` usage, grouped into sections:
  - **Fresh**: Refrigerated meal items
  - **Frozen**: Frozen meal items
  - **Dry**: Pantry meal items
- Sections with no meal items shall be hidden
- Items with only `ingredient` usage shall NOT appear on the Dashboard
- Each section is collapsible with total quantity badge

### FR-DASH-002: Display Total Servings with Status

- The system shall display the total number of servings (all items, not just meals)
- The system shall color-code serving totals based on status:
  - **Red**: Critical level (≤2 servings)
  - **Orange**: Warning level (≤6 servings)
  - **Green**: Healthy level (>6 servings)

### FR-DASH-003: Increment/Decrement Item Quantity

- The user shall be able to increase or decrease the quantity of any meal item
- Quantity changes shall be reflected immediately in the UI
- Changes sync with the Inventory page

### FR-DASH-004: Quick Recipes Section

- The system shall display recipes that can be made with available ingredients
- Recipes are sorted by match status:
  - **Full match**: All required ingredients available (shown as "Ready")
  - **Partial match**: Some ingredients available (shown as "Need X")
- Display up to 5 most relevant recipes
- Each recipe card shows:
  - Recipe name
  - Match status badge
  - Missing required ingredients (for partial matches)
- "View all recipes →" link navigates to full Recipes page
- Section is collapsible
- Section is hidden when no relevant matches exist

### FR-DASH-005: Food Ordering Section

- The system shall display food ordering options from configured restaurants
- Each restaurant shows available dishes with prices
- Restaurant cards are collapsible
- See [Food Ordering](./food-ordering.md) for full requirements

### FR-DASH-006: Empty State

- When no ready-to-eat items exist, show empty state with message and icon
- Quick Recipes section still appears if recipes can be made from ingredients

## User Interface Requirements

### UI-DASH-001: Page Layout

- Page title: "What to Eat"
- Total servings summary card at top
- Ready to Eat section (meal items only)
- Quick Recipes section (when applicable)
- Food Ordering section

### UI-DASH-002: Ready to Eat Section

- Section header: "Ready to Eat"
- Items grouped by storage type (Fresh, Frozen, Dry) as collapsible subsections
- Each subsection shows quantity badge
- Empty sections are hidden

### UI-DASH-003: Item Display

- Each item shows:
  - Decrement button (-)
  - Item name with optional nutrition badges
  - Added date (relative format)
  - Expiry date (if present) with status color
  - Quantity badge with status color
  - Increment button (+)

### UI-DASH-004: Quick Recipes Section

- Section header: "Quick Recipes" with count badge (e.g., "2 ready")
- Compact recipe cards showing name and status
- Green border for ready recipes, orange for partial matches
- Collapsible section

### UI-DASH-005: Navigation

- Dashboard is the default/home page
- Accessible via "Home" link in bottom navigation
- Route: `#dashboard` (or empty hash)

## Relationship to Inventory Page

The Dashboard focuses on meal decisions; full inventory management is on the Inventory page:

| Feature | Dashboard | Inventory |
|---------|-----------|-----------|
| View meal items | ✓ | ✓ |
| View ingredient items | ✗ | ✓ |
| Add items | ✗ | ✓ |
| Quick recipes | ✓ | ✗ |
| Food ordering | ✓ | ✗ |
| Modify quantities | ✓ | ✓ |

## Historical Requirements (Moved/Deprecated)

The following requirements have been moved to [Inventory](./inventory.md):

- FR-DASH-005 through FR-DASH-018: Add Item functionality
- UI-DASH-004: Add Item Modal

Full inventory management (adding items, viewing ingredients) is now on the dedicated Inventory page.
