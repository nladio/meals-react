# Dashboard - Inventory Management Requirements

## Overview

The Dashboard provides the primary interface for viewing and managing food inventory, organized by storage section.

## Functional Requirements

### FR-DASH-001: View Inventory by Section

- The system shall display inventory items grouped into three sections:
  - **Fresh**: Refrigerated items with shorter shelf life
  - **Frozen**: Frozen items with longer shelf life
  - **Dry**: Pantry items and non-perishables
- Each section shall be visually distinct and collapsible

### FR-DASH-002: Display Total Servings with Status

- The system shall display the total number of servings for each section
- The system shall color-code serving totals based on status:
  - **Red**: Critical level (requires immediate attention)
  - **Yellow**: Warning level (running low)
  - **Green**: Healthy level (adequate supply)

### FR-DASH-003: Increment Item Quantity

- The user shall be able to increase the quantity of any inventory item
- Quantity changes shall be reflected immediately in the UI
- The system shall update the item's "last updated" timestamp

### FR-DASH-004: Decrement Item Quantity

- The user shall be able to decrease the quantity of any inventory item
- Quantity shall not decrease below zero
- Quantity changes shall be reflected immediately in the UI

### FR-DASH-005: Add New Items to Inventory

- The user shall be able to add new items to any section
- New items shall require:
  - Item name
  - Initial quantity
  - Section assignment (Fresh, Frozen, or Dry)
- New items shall be assigned a "last updated" timestamp upon creation

### FR-DASH-006: Auto-Remove Items at Zero Quantity

- When an item's quantity reaches zero, the system shall automatically remove it from the inventory display
- Removed items shall remain available in the shopping suggestions

### FR-DASH-007: Relative Date Display

- The system shall display the "last updated" time as a relative date (e.g., "2 days ago", "just now")
- Relative dates shall update appropriately as time passes

### FR-DASH-008: Expiry Date Tracking

- The system shall support an optional expiry date field per inventory item
- Expiry date shall be displayed in the item row when present
- The system shall provide visual indicators for expiry status:
  - **Red**: Item is expired (past expiry date)
  - **Yellow/Orange**: Item is expiring soon (within 3 days)

## User Interface Requirements

### UI-DASH-001: Section Layout

- Sections shall be displayed in a consistent order: Fresh, Frozen, Dry
- Each section shall show a header with the section name and total servings

### UI-DASH-002: Item Display

- Each item shall display:
  - Item name
  - Current quantity
  - Increment/decrement controls
  - Last updated timestamp (relative format)
  - Expiry date (when present), with visual status indicator

### UI-DASH-003: Responsive Design

- The dashboard shall be usable on both desktop and mobile devices
- Touch-friendly controls for quantity adjustment on mobile
