# Shopping List Requirements

## Overview

The Shopping List feature provides a three-section shopping experience per store: user-curated items, staple essentials, and intelligent suggestions based on inventory levels and purchase history.

## Functional Requirements

### FR-SHOP-001: Store-Based Grouping

- The system shall display shopping items grouped into 3 store sections:
  - Indian Store
  - Costco
  - Grocery
- Items shall appear in ALL stores where they are available (based on item's `stores[]` field)
- Items without a `stores` field shall default to `['grocery']`

### FR-SHOP-002: Three-Section Layout Per Store

- Each store section shall display three sub-sections:
  1. **Your List**: User-added items (always visible, shows empty state when no items)
  2. **Staples**: Pre-configured essential items for that store (hidden when empty)
  3. **Suggestions**: Auto-generated items based on inventory/history (hidden when empty)
- Items in "Your List" shall not appear in Staples or Suggestions sections
- Items in Staples shall not appear in Suggestions section

### FR-SHOP-003: User Shopping List Management

- Users shall be able to add items to their shopping list via:
  - Cart icon on Staples items
  - Cart icon on Suggestions items
  - Cart icon on Inventory page items
- Users shall be able to remove items from their list via X button
- Shopping list state shall persist across sessions (localStorage)

### FR-SHOP-004: Staple Items Configuration

- Items can be marked as `staple: true` in the data files
- Staple items shall automatically appear in the Staples section for their configured stores
- Staples shall be sorted by priority (high → medium → low)

### FR-SHOP-005: Priority-Based Sorting

- Within Staples section, items shall be sorted by priority: high → medium → low
- Within Suggestions section, items shall be sorted by:
  1. Priority: high → medium → low
  2. Then by urgency: restock → running low → variety
- Items without a `priority` field shall default to `'medium'`

### FR-SHOP-006: Urgency Classification

- Suggestion items shall be classified into urgency levels:
  - **Restock**: Items with quantity = 0 that have been purchased before
  - **Running Low**: Items with quantity between 1 and 2 (inclusive)
  - **Variety**: Items not purchased in 7+ days or never purchased

### FR-SHOP-007: Urgency Visual Indicators

- Suggestion items shall display color-coded urgency indicators:
  - Red left border: Restock (quantity = 0)
  - Orange left border: Running Low (quantity 1-2)
  - Gray left border: Variety (haven't bought lately)
- User List items shall display blue left border
- Staple items shall display gray left border

### FR-SHOP-008: Inventory Cart Integration

- Each inventory item shall have a cart icon button
- Clicking the cart icon shall add the item to the user's shopping list
- The item shall be added to the first store in its `stores[]` array

## Data Model Requirements

### DM-SHOP-001: Shopping List Entry

```typescript
interface ShoppingListEntry {
  name: string;
  section: Section;  // 'fresh' | 'frozen' | 'dry'
  store: Store;      // 'indian-store' | 'costco' | 'grocery'
}
```

### DM-SHOP-002: App State Extension

- `AppState.shoppingList: ShoppingListEntry[]` - User's manually added shopping items

### DM-SHOP-003: Staple Flag

- `DefaultKnownItem.staple?: boolean` - When true, item appears in Staples section
- Configured in JSON data files: `fresh-items.json`, `frozen-items.json`, `dry-items.json`

### DM-SHOP-004: Priority Type

- `Priority` type: `'low' | 'medium' | 'high'`
- Added to `KnownItem` interface as optional field
- Default value: `'medium'`

### DM-SHOP-005: Store Type

- `Store` type: `'indian-store' | 'costco' | 'grocery'`
- Added to `KnownItem` interface as optional `stores[]` array
- Default value: `['grocery']`

## User Interface Requirements

### UI-SHOP-001: Store Section Layout

- Store sections shall be displayed in a responsive grid:
  - Mobile: Single column (stacked vertically)
  - Desktop: 3 columns side-by-side
- Store order: Indian Store, Costco, Grocery

### UI-SHOP-002: Sub-Section Headers

- Each sub-section (Your List, Staples, Suggestions) shall have:
  - Gray background header bar (`bg-gray-50 rounded-t-lg`)
  - Section name on the left
  - Item count badge on the right
- Styling shall match SubcategoryGroup component in Inventory page

### UI-SHOP-003: Your List Empty State

- When Your List is empty, display "Add items from below" message with notepad icon
- Your List section shall always be visible (never hidden)

### UI-SHOP-004: Item Display - Your List

- Each item shall show:
  - Blue left border indicator
  - Item name
  - X button on right to remove from list

### UI-SHOP-005: Item Display - Staples/Suggestions

- Each item shall show:
  - Color-coded left border (gray for staples, urgency-based for suggestions)
  - Item name
  - Current quantity if > 0 (shown as "X left")
  - Cart icon button on right to add to Your List

### UI-SHOP-006: Inventory Page Cart Icon

- Each inventory item shall display a cart icon button
- Cart icon shall be positioned between the item details and quantity badge
- Clicking shall add item to shopping list for its primary store

## Reducer Actions

### ADD_TO_SHOPPING_LIST

- Adds an item to the user's shopping list
- Prevents duplicates (same name + same store)
- Payload: `{ entry: ShoppingListEntry }`

### REMOVE_FROM_SHOPPING_LIST

- Removes an item from the user's shopping list
- Matches by name AND store (allows same item in different stores)
- Payload: `{ name: string, store: Store }`

## Default Staple Items

The following items are configured as staples:

**Fresh:**
- Chapatis (Indian Store)
- Onion (Grocery, Costco)
- Butter (Grocery, Costco)
- Yogurt (Grocery, Costco)
- Egg (Grocery, Costco)
- Bread (Grocery, Costco)
- Dosa Batter (Indian Store)

**Frozen:**
- Frozen Parathas (Indian Store, Costco)

**Dry:**
- Rice (Indian Store, Costco)
- Atta (Indian Store)
- Toor Dal (Indian Store)

## Nutrition-Aware Shopping

### FR-SHOP-009: Nutrition Badges on Shopping Items

- Shopping items in Staples and Suggestions sections shall display nutrition badges
- Badges include: N (natural-protein), P (high-protein), F (high-fiber)
- Helps users identify nutrition-supporting items when shopping
- Badges appear after item name, consistent with inventory display

### FR-SHOP-010: Nutrition Goals Section

- Each store shall display a "For Your Nutrition Goals" section
- Section appears between Staples and Suggestions
- Shows out-of-stock items that support nutrition goals:
  - Natural protein items with quantity = 0
  - High-fiber items with quantity = 0
- Ready-made meals (e.g., Palak Paneer) display appropriate badges
- Section is hidden when no nutrition goal items need restocking

## Out of Scope

- User-facing UI to set store/priority (configured in code only)
- User-facing UI to mark items as staples
- Drag-and-drop reordering of Your List items
- Quantity adjustment before adding to inventory
- Batch "Add to Inventory" action from shopping list
