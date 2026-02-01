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

### FR-DASH-007: Usage Classification

- Items are classified by usage type via a `usages` array:
  - **meal**: Complete meals/snacks consumable directly
  - **ingredient**: Items used in cooking/recipes
- Items may have multiple usages (e.g., bread can be both a meal and an ingredient)
- Usage classification determines how items are grouped in the Add Item modal

### FR-DASH-008: Default Item Classification

- All default known items in `defaultKnownItems.ts` have assigned usages
- Default items also have optional category classifications:
  - **Ingredient categories**: produce, dairy, protein, condiments, grains, legumes
  - **Meal categories**: curries, soups, noodles, snacks, ready-meals

### FR-DASH-009: View Inventory by Subcategory `[unimplemented]`

- Dashboard displays items grouped by subcategory within each section
- Subcategories shown as nested collapsible subsections
- Each subsection shows item count/total servings

### FR-DASH-010: Add Items Grouped by Usage

- The Add Item modal groups available items by usage:
  - **Ready to eat**: Items with only `meal` usage
  - **Ingredients**: Items with only `ingredient` usage
  - **Both**: Items with both `meal` and `ingredient` usages
- Within each group, items are further organized by their category (ingredient or meal category)
- Known items retain their usage classification when added to inventory

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
  - Typical quantity (auto-populated when selecting item)
  - Usages array (`meal`, `ingredient`, or both)
  - Optional ingredient category (for ingredient items)
  - Optional meal category (for meal items)
  - Optional default expiry days (see FR-DASH-018)
- Developers can modify the default items by editing the data file
- Default items shall always appear in the modal (users cannot remove them)

### FR-DASH-015: User-Added Custom Items `[removed]`

~~- Users shall be able to add custom items to the known items list via the UI~~
~~- Custom items shall appear in the dropdown alongside default items~~
~~- Custom items shall persist across sessions (stored in localStorage)~~
~~- The system shall prevent duplicate item names within the same section~~
~~- Users cannot remove default items; they can only add new custom items~~

*Removed to simplify UX. Users can only add items from the predefined known items list.*

### FR-DASH-016: Add Item via Categorized Modal

- The system shall provide a single "+ Add Item" button per section (replacing inline dropdown)
- Tapping the button shall open a modal displaying available items organized by usage category:
  - **Ready to eat**: Items with `meal` usage, grouped by meal category
  - **Ingredients**: Items with `ingredient` usage, grouped by ingredient category
  - **Both**: Dual-use items with both usages
- Items already in inventory shall not appear in the modal
- Users shall tap an item chip to select it
- Selecting an item shall auto-populate:
  - Quantity (from item's `typicalQty`)
  - Expiry date (from item's `defaultExpiryDays`, if present)
- After selection, the modal shall display quantity and optional expiry date controls
- Confirming adds the item to inventory and closes the modal

### FR-DASH-017: Simplified Section Add Controls

- Each section shall display only a single "+ Add Item" button (no inline form fields)
- The dropdown, quantity stepper, date picker, and "+ New" button shall be removed from the section view
- All add functionality shall be accessed through the categorized modal (FR-DASH-016)

### FR-DASH-018: Default Expiry Days for Known Items

- Each known item may have an optional `defaultExpiryDays` field specifying typical shelf life in days
- When a user selects an item in the Add Item modal, the system shall auto-populate the expiry date field:
  - Expiry date = today's date + `defaultExpiryDays`
- If the item has no `defaultExpiryDays`, the expiry date field shall be cleared
- Users may still manually adjust the expiry date before adding the item
- Suggested default expiry values by item type:
  - Fresh produce: 5-14 days
  - Fresh dairy: 14 days
  - Eggs: 21 days
  - Fresh bread/roti: 5 days
  - Fresh protein (chicken): 3 days
  - Frozen items: 90 days
  - Dry goods: omit (very long shelf life)

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

### UI-DASH-004: Add Item Modal

- The modal shall display a header with the section name (e.g., "Add to Fresh Food")
- The modal shall include a close button (X) in the header
- Items shall be grouped under usage category headers ("Ready to eat", "Ingredients", "Both")
- Within each usage category, items shall be further grouped by subcategory:
  - Ready to eat: curries, soups, noodles, snacks, ready-meals
  - Ingredients: produce, dairy & eggs, protein, dips & sauces, grains, legumes
- Each item shall be displayed as a tappable chip/pill button
- Selected item shall be visually highlighted (primary color background)
- Quantity control and expiry date input shall appear after item selection
- "Add [Item Name]" confirmation button shall be prominently displayed
- Modal shall close upon successful add or when close button is tapped
- Modal can be dismissed by pressing Escape or clicking outside

## Out of Scope (MVP)

- User-defined custom categories
- Changing usage/category of existing items
- Usage-based filtering on Shopping page
- Dashboard grouping by usage (FR-DASH-009)
- User-added custom items (removed in favor of predefined known items only)
- Editing expiry date after item is added to inventory
