# Shopping List - Shopping Suggestions Requirements

## Overview

The Shopping List feature provides intelligent shopping recommendations based on current inventory levels and purchase history.

## Functional Requirements

### FR-SHOP-001: Display "Need to Restock" Items

- The system shall display a "Need to Restock" section
- This section shall contain all items with quantity = 0
- Items shall be grouped by their original section (Fresh, Frozen, Dry)

### FR-SHOP-002: Display "Running Low" Items

- The system shall display a "Running Low" section
- This section shall contain all items with quantity between 1 and 2 (inclusive)
- Items shall be grouped by their original section (Fresh, Frozen, Dry)

### FR-SHOP-003: Display "For Variety" Items

- The system shall display a "For Variety" section
- This section shall contain items that have not been purchased in 7 or more days
- Items shall be grouped by their original section (Fresh, Frozen, Dry)
- This encourages variety in meal planning

### FR-SHOP-004: Select Items with Checkboxes

- Each suggested item shall have a checkbox for selection
- Users shall be able to select multiple items across all suggestion categories
- A visual indicator shall show the total number of selected items

### FR-SHOP-005: Adjust Quantities Before Adding

- For each selected item, the user shall be able to adjust the quantity to add
- Default quantity shall be a reasonable restock amount
- Quantity shall be adjustable via increment/decrement controls

### FR-SHOP-006: Add Selected Items to Inventory

- The user shall be able to add all selected items to inventory with one action
- Adding items shall:
  - Increase inventory quantities by the specified amounts
  - Update the "last updated" timestamp for each item
  - Clear the selection after successful addition

### FR-SHOP-007: Update Purchase History

- When items are added to inventory from the shopping list, the system shall:
  - Record the purchase date
  - Record all items and quantities purchased
  - Store this information for the shopping history feature

## User Interface Requirements

### UI-SHOP-001: Category Organization

- Suggestion categories shall be displayed in priority order:
  1. Need to Restock (highest priority)
  2. Running Low
  3. For Variety (lowest priority)

### UI-SHOP-002: Empty State

- When no shopping suggestions exist, display a friendly message indicating inventory is well-stocked

### UI-SHOP-003: Action Button

- A prominent "Add to Inventory" button shall be displayed
- Button shall be disabled when no items are selected
- Button shall indicate the number of items to be added
