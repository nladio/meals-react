# Food Ordering - Restaurant Order Tracking Requirements

## Overview

The Food Ordering section provides a view-only display of previously ordered dishes from restaurants and fast food chains. This feature helps users track their dining habits, costs, and nutritional information.

## Functional Requirements

### FR-FOOD-001: Display Restaurant List

- The system shall display a list of restaurants/fast food chains with previously ordered dishes
- Each restaurant shall show its name and a list of dishes ordered from it
- Restaurant data is stored in `src/data/foodOrders.ts` (view-only from UI)

### FR-FOOD-002: Cost Tracking and Totals

- Each dish shall display its name and unit cost
- Dishes have a quantity field indicating how many were ordered
- Line totals are calculated as: `cost × quantity`
- The system shall compute and display the total cost per order (subtotal + fees)
- The system shall compute and display a grand total across all orders
- Costs shall be displayed with `$` prefix and 2 decimal places

### FR-FOOD-002a: Order-Level Fees

- Orders may include additional fees beyond dish costs:
  - **Delivery fee**: Flat delivery charge (may be $0.00 for free delivery)
  - **Service fee**: Platform service charge (final amount after discounts)
  - **Sales tax**: Tax amount
  - **Driver tip**: Optional tip amount
  - **Driver benefits fee**: Driver-related fee (final amount after discounts)
  - **Discount**: Order-level discounts (positive number, subtracted from total)
- Order total = dishes subtotal + fees - discounts
- Fees are optional and only displayed when present

### FR-FOOD-003: Dish Tagging System

- Dishes shall be tagged with multiple dimensions:
  - **Meal time**: Breakfast, Lunch, Dinner, Snack (multiple allowed per dish)
  - **Cuisine**: Indian, Chinese, American, Mexican, Italian, Thai, Japanese
  - **Dish type**: Appetizer, Main, Dessert, Drink, Side
- Tags shall be color-coded for easy visual identification

### FR-FOOD-003a: Dish Customizations

- Dishes may include customizations (modifications made when ordering)
- Examples: "Cream Sauce", "Add Chicken", "No Onions"
- Customizations are stored as an array of strings
- Displayed below the dish name when present

### FR-FOOD-004: Optional Macro Tracking

- Each dish may optionally include macronutrient information:
  - **Calories**: in kcal
  - **Protein**: in grams
  - **Carbs**: in grams
  - **Fat**: in grams
- Macros are displayed only when present (all fields are optional)
- Macro display format: compact (e.g., "520 cal | 32g P | 45g C | 18g F")

### FR-FOOD-005: Data Management

- Restaurant data is stored in `src/data/foodOrders.ts`
- Data is view-only from the UI (editable only in the TypeScript file)
- Helper functions provided: `getRestaurantTotal()`, `getAllRestaurantsTotal()`

## User Interface Requirements

### UI-FOOD-001: Section Placement

- The Food Ordering section shall appear on the Dashboard below the Dry/Pantry section
- The section shall have a consistent header style matching other Dashboard sections

### UI-FOOD-002: Collapsible Restaurant Cards

- Each restaurant shall be displayed as a collapsible card
- Cards shall follow the existing SubcategoryGroup pattern for consistency
- Collapsed state shows restaurant name and total cost
- Expanded state shows all dishes with details

### UI-FOOD-003: Color-Coded Tags

- Tags shall be color-coded by type:
  - **Blue**: Meal time tags (Breakfast, Lunch, Dinner, Snack)
  - **Purple**: Cuisine tags (Indian, Chinese, American, etc.)
  - **Amber**: Dish type tags (Appetizer, Main, Dessert, Drink, Side)
- Tags shall be displayed as small pills/badges

### UI-FOOD-004: Macro Display

- When present, macros shall be displayed as small gray text below the dish name
- Only display macro values that are present (skip undefined fields)
- Format: "520 cal | 32g P | 45g C | 18g F"

### UI-FOOD-005: Dish Item Display

- Each dish shall display:
  - Dish name with quantity (e.g., "Fettuccini Alfredo ×2" when quantity > 1)
  - Customizations (when present, in gray text below name)
  - Cost: unit price × quantity = line total (e.g., "$13.50 × 2 = $27.00")
  - Tags (color-coded)
  - Macros (when present, in compact format)
- Dish items shall have a left border accent for visual hierarchy

### UI-FOOD-006: Order Fees Display

- When an order has fees, display them below the dishes
- Show subtotal (sum of dish line totals) and individual fee items
- Only display fee items that are present (skip undefined fees)
- Display order total prominently

## Out of Scope (MVP)

- Adding/editing restaurants or dishes from the UI
- Ordering integration with external services
- Receipt scanning or import
- Nutritional goal tracking
- Filtering/sorting dishes by tags or macros
