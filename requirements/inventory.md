# Inventory Page - Full Inventory Management Requirements

## Overview

The Inventory page provides comprehensive inventory management, showing all food items (meals and ingredients) organized by storage section. This is where users add and manage their complete food inventory.

## Functional Requirements

### FR-INV-001: View All Inventory by Section

- The system shall display all inventory items grouped into three sections:
  - **Fresh**: Refrigerated items with shorter shelf life
  - **Frozen**: Frozen items with longer shelf life
  - **Dry**: Pantry items and non-perishables
- Each section shall be visually distinct and collapsible
- All items are shown regardless of usage type (meals AND ingredients)

### FR-INV-002: Display Total Servings with Status

- The system shall display the total number of servings across all sections
- The system shall color-code serving totals based on status:
  - **Red**: Critical level (≤2 servings)
  - **Orange**: Warning level (≤6 servings)
  - **Green**: Healthy level (>6 servings)

### FR-INV-003: Group Items by Usage Type

- Within each section, items shall be grouped by usage:
  - **Ready to eat**: Items with `meal` usage
  - **Ingredients**: Items with `ingredient` usage
- Items with both usages appear in both groups (marked with "2x" indicator)
- Each group is collapsible with a total quantity badge

### FR-INV-004: Increment/Decrement Item Quantity

- The user shall be able to increase or decrease the quantity of any inventory item
- Quantity shall not decrease below zero
- Quantity changes shall be reflected immediately in the UI
- When quantity reaches zero, item is removed from display

### FR-INV-005: Add Items to Inventory

- Each section shall have an "+ Add Item" button
- The Add Item modal shall display items organized by usage category:
  - **Ready to eat**: Items with `meal` usage, grouped by meal category
  - **Ingredients**: Items with `ingredient` usage, grouped by ingredient category
  - **Both**: Items with both usages
- Items already in inventory shall not appear in the modal
- Selecting an item auto-populates quantity and expiry date from defaults
- Adding an item records the purchase in history

### FR-INV-006: Expiry Date Display

- Items with expiry dates shall display the date with visual indicators:
  - **Red**: Item is expired (past expiry date)
  - **Amber**: Item is expiring soon (within 3 days)
  - **Gray**: Normal expiry (more than 3 days away)

### FR-INV-007: Nutrition Tags Display

- Items with nutrition tags shall display badge indicators (e.g., "P" for high-protein)

## User Interface Requirements

### UI-INV-001: Page Layout

- Page title: "Inventory"
- Total servings summary card at top
- Sections displayed in order: Fresh Food, Frozen Food, Dry/Pantry

### UI-INV-002: Section Layout

- Each section shows:
  - Section header with title
  - Usage groups (Ready to eat / Ingredients) as collapsible subsections
  - "+ Add Item" button at bottom

### UI-INV-003: Item Display

- Each item shows:
  - Decrement button (-)
  - Item name with optional badges (2x for dual-use, nutrition tags)
  - Added date (relative format)
  - Expiry date (if present) with status color
  - Quantity badge with status color
  - Increment button (+)

### UI-INV-004: Navigation

- Accessible via "Inventory" link in bottom navigation
- Uses package/box icon to represent storage
- Route: `#inventory`

## Relationship to Dashboard

The Inventory page complements the Dashboard ("What to Eat") page:

| Page | Purpose | Shows |
|------|---------|-------|
| Dashboard | Meal decision support | Only meal items, recipes, food ordering |
| Inventory | Full inventory management | All items (meals + ingredients), add functionality |

Items added on the Inventory page reflect immediately on the Dashboard when applicable (meal items only).
