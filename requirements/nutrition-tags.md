# Nutrition Tags - What to Eat Requirements

## Overview

The Nutrition Tags feature allows users to tag meals and ingredients with nutritional properties (high-protein, high-fiber) and provides a dedicated page to quickly find foods by these properties when deciding what to eat.

## Functional Requirements

### FR-NUTR-001: Nutrition Tag Types

- The system shall support the following nutrition tags:
  - **high-protein**: Foods rich in protein
  - **high-fiber**: Foods rich in fiber
- Items may have zero, one, or multiple tags (e.g., lentils are both high-protein and high-fiber)

### FR-NUTR-002: Tag Storage on Known Items

- Nutrition tags shall be stored on the `KnownItem` type as an optional `nutritionTags` array
- Default known items shall have pre-assigned nutrition tags in `defaultKnownItems.ts`
- Tags are a property of the food type, not individual inventory instances

### FR-NUTR-003: Pre-Tagged Default Items

- The following default items shall be tagged as **high-protein**:
  - Paneer, Tofu, Egg, Chicken, Frozen Falafel, Hummus
  - Paneer Curry, Palak Paneer, Dal Makhani
- The following default items shall be tagged as **high-fiber**:
  - Spinach, Avocado, Thick Poha
- The following default items shall be tagged as **both high-protein and high-fiber**:
  - Toor Dal, Masoor Dal, Moong Dal, Black Urad Dal
  - Chickpeas, Rajma, CannedBlackBeans, Chole

### FR-NUTR-004: What to Eat Page

- The system shall provide a dedicated "What to Eat" page accessible from bottom navigation
- The page shall display in-stock items grouped by nutrition tag:
  - **High Protein section**: All items with `high-protein` tag and quantity > 0
  - **High Fiber section**: All items with `high-fiber` tag and quantity > 0
- Items with multiple tags shall appear in all applicable sections
- Only items currently in inventory with quantity > 0 shall be displayed

### FR-NUTR-005: Display Tags on Dashboard

- Nutrition tags shall be visually displayed on inventory items in the Dashboard
- Tags shall appear as compact badges next to the item name
- Tags shall not interfere with existing item display (quantity, expiry, etc.)

### FR-NUTR-006: Tag Lookup from Known Items

- When displaying inventory items, the system shall look up nutrition tags from the corresponding known item
- Items without matching known items shall display no nutrition badges

## User Interface Requirements

### UI-NUTR-001: Nutrition Badge Component

- Tags shall be displayed as small, colored badges
- Badge styling:
  - **high-protein**: Green background (`bg-green-100`), green text, label "P"
  - **high-fiber**: Teal background (`bg-teal-100`), teal text, label "F"
- Badges shall include a tooltip with full tag name on hover
- Badge size shall be compact (similar to existing "2x" dual-use badge)

### UI-NUTR-002: What to Eat Page Layout

- Page header: "What to Eat"
- Two collapsible sections:
  - "High Protein" with green accent
  - "High Fiber" with teal accent
- Each section shall display:
  - Count of available items
  - List of items with: name, quantity, storage section (Fresh/Frozen/Dry), nutrition badges
- Empty sections shall display a message (e.g., "No high-protein items in stock")

### UI-NUTR-003: Navigation

- The What to Eat page shall be accessible from the bottom navigation bar
- Navigation item shall use an appropriate icon (e.g., nutrition/leaf icon)
- Route shall be `#nutrition`

### UI-NUTR-004: Dashboard Badge Placement

- Nutrition badges shall appear after the item name and any existing badges (e.g., "2x" dual-use badge)
- Multiple badges shall be displayed inline with small gap between them

## Out of Scope (MVP)

- User-editable tags on custom items
- Additional tag types (low-carb, vegetarian, vegan, etc.)
- Nutrition filtering on Shopping page
- Macro tracking (calories, grams of protein/fiber)
- Tag-based recipe matching
