# Shopping List - Shopping Suggestions Requirements

## Overview

The Shopping List feature provides intelligent shopping recommendations based on current inventory levels and purchase history, organized by store for efficient shopping trips.

## Functional Requirements

### FR-SHOP-001: Store-Based Grouping

- The system shall display shopping items grouped into 3 store sections:
  - Indian Store
  - Costco
  - Grocery
- Items shall appear in ALL stores where they are available (based on item's `stores[]` field)
- Items without a `stores` field shall default to `['grocery']`

### FR-SHOP-002: Priority-Based Sorting

- Within each store section, items shall be sorted by:
  1. Priority: high → medium → low
  2. Then by urgency: restock → running low → variety
- Items without a `priority` field shall default to `'medium'`

### FR-SHOP-003: Urgency Classification

- Items shall be classified into urgency levels:
  - **Restock**: Items with quantity = 0 that have been purchased before
  - **Running Low**: Items with quantity between 1 and 2 (inclusive)
  - **Variety**: Items not purchased in 7+ days or never purchased

### FR-SHOP-004: Urgency Visual Indicators

- Each item shall display a color-coded urgency indicator:
  - Red: Restock (quantity = 0)
  - Orange: Running Low (quantity 1-2)
  - Blue: Variety (haven't bought lately)
- Indicator shown as colored left border and dot

### FR-SHOP-005: Unified Checkbox State

- Each item shall have a checkbox for selection
- Checking an item in one store shall check it across ALL store sections (single checkbox state)
- This prevents duplicate additions when an item appears in multiple stores

### FR-SHOP-006: Adjust Quantities Before Adding

- For each selected item, the user shall be able to adjust the quantity to add
- Default quantity shall be a reasonable restock amount based on `typicalQty`
- Quantity shall be adjustable via increment/decrement controls

### FR-SHOP-007: Add Selected Items to Inventory

- The user shall be able to add all selected items to inventory with one action
- Adding items shall:
  - Increase inventory quantities by the specified amounts
  - Update the "last bought" timestamp for each item
  - Clear the selection after successful addition
- Each unique item is added only once (even if checked in multiple stores)

### FR-SHOP-008: Update Purchase History

- When items are added to inventory from the shopping list, the system shall:
  - Record the purchase date
  - Record all items and quantities purchased
  - Store this information for the shopping history feature

## Data Model Requirements

### DM-SHOP-001: Priority Type

- `Priority` type: `'low' | 'medium' | 'high'`
- Added to `KnownItem` interface as optional field
- Default value: `'medium'`

### DM-SHOP-002: Store Type

- `Store` type: `'indian-store' | 'costco' | 'grocery'`
- Added to `KnownItem` interface as optional `stores[]` array
- Default value: `['grocery']`

## User Interface Requirements

### UI-SHOP-001: Store Section Layout

- Store sections shall be displayed in a responsive grid:
  - Mobile: Single column (stacked vertically)
  - Desktop: 3 columns side-by-side
- Store order: Indian Store, Costco, Grocery

### UI-SHOP-002: Empty Store Section

- When a store section has no items, display "Nothing needed from here" message

### UI-SHOP-003: Item Display

- Each item shall show:
  - Urgency indicator (colored dot and left border)
  - Checkbox
  - Item name
  - Current quantity (if > 0, shown as "X left")
  - Quantity control for adjusting amount to purchase

### UI-SHOP-004: Action Button

- A prominent "Add to Inventory" button shall be displayed at the bottom
- Button shall be full-width
- Alert shown when no items are selected

## Out of Scope

- User-facing UI to set store/priority (configured in code only)
- AddItemModal changes for custom items to set store/priority
- Store preferences or filtering
