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

### FR-DASH-005: Add Items to Inventory

- The user shall be able to add items to any section from the predefined known items list
- Adding an item shall require:
  - Item selection (from known items not currently in inventory)
  - Initial quantity
  - Section assignment (Fresh, Frozen, or Dry)
  - Optional expiry date
- Added items shall be assigned a "last updated" timestamp upon creation

### FR-DASH-006: Default Known Items

- The app shall ship with a predefined list of known items for each section (Fresh, Frozen, Dry)
- Known items shall populate the dropdown when adding items to inventory

### FR-DASH-007: Subcategory Types `[unimplemented]`

- Two universal subcategories apply to all sections (Fresh, Frozen, Dry):
  - **Ready-to-eat**: Complete meals/snacks consumable directly
  - **Ingredients**: Items used in cooking/recipes
- Each inventory item belongs to exactly one subcategory

### FR-DASH-008: Default Item Classification `[unimplemented]`

- Known items in DEFAULT_STATE have assigned subcategories
- Existing items without subcategory inferred from name patterns

### FR-DASH-009: View Inventory by Subcategory `[unimplemented]`

- Dashboard displays items grouped by subcategory within each section
- Subcategories shown as nested collapsible subsections
- Each subsection shows item count/total servings

### FR-DASH-010: Add Items with Subcategory `[unimplemented]`

- When adding a new item, user selects subcategory
- Known items retain their subcategory when restocked

### FR-DASH-011: Auto-Remove Items at Zero Quantity

- When an item's quantity reaches zero, the system shall automatically remove it from the inventory display
- Removed items shall remain available in the shopping suggestions

### FR-DASH-012: Relative Date Display

- The system shall display the "last updated" time as a relative date (e.g., "2 days ago", "just now")
- Relative dates shall update appropriately as time passes

### FR-DASH-013: Expiry Date Tracking

- The system shall support an optional expiry date field per inventory item
- Expiry date shall be displayed in the item row when present
- The system shall provide visual indicators for expiry status:
  - **Red**: Item is expired (past expiry date)
  - **Yellow/Orange**: Item is expiring soon (within 3 days)

### FR-DASH-014: Configurable Default Known Items

- The default list of known items shall be stored in a dedicated data file (`src/data/defaultKnownItems.ts`)
- The data file shall export default items organized by section (Fresh, Frozen, Dry)
- Each default item shall include:
  - Item name
  - Typical quantity
  - Subcategory (Ready to eat or Ingredients)
- Developers can modify the default items by editing the data file
- Default items shall always appear in the dropdown (users cannot remove them)

### FR-DASH-015: User-Added Custom Items `[removed]`

~~- Users shall be able to add custom items to the known items list via the UI~~
~~- Custom items shall appear in the dropdown alongside default items~~
~~- Custom items shall persist across sessions (stored in localStorage)~~
~~- The system shall prevent duplicate item names within the same section~~
~~- Users cannot remove default items; they can only add new custom items~~

*Removed to simplify UX. Users can only add items from the predefined known items list.*

### FR-DASH-016: Add Item via Categorized Modal `[unimplemented]`

- The system shall provide a single "+ Add Item" button per section (replacing inline dropdown)
- Tapping the button shall open a modal displaying available items organized by usage category:
  - **Ready to eat**: Items used as complete meals
  - **Ingredients**: Items used for cooking
  - **Both**: Dual-use items (displayed in both categories or a separate section)
- Users shall tap an item to select it
- After selection, the modal shall display quantity and optional expiry date controls
- Confirming adds the item to inventory and closes the modal

### FR-DASH-017: Simplified Section Add Controls `[unimplemented]`

- Each section shall display only a single "+ Add Item" button (no inline form fields)
- The dropdown, quantity stepper, date picker, and "+ New" button shall be removed from the section view
- All add functionality shall be accessed through the categorized modal (FR-DASH-016)

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

### UI-DASH-004: Add Item Modal `[unimplemented]`

- The modal shall display a header with the section name (e.g., "Add to Fresh Food")
- The modal shall include a close button (X) in the header
- Items shall be grouped under category headers ("Ready to eat", "Ingredients", "Both")
- Each item shall be displayed as a tappable row/button
- Selected item shall be visually highlighted
- Quantity control and expiry date input shall appear after item selection
- "Add Item" confirmation button shall be prominently displayed
- Modal shall close upon successful add or when close button is tapped

## Out of Scope (MVP)

- User-defined custom subcategories
- Changing subcategory of existing items
- Subcategory-based filtering on Shopping page
- More than 2 subcategory types
- User-added custom items (removed in favor of predefined known items only)
