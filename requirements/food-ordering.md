# Food Ordering - Restaurant Order Tracking Requirements

## Overview

The Food Ordering section provides a view-only display of previously ordered dishes from restaurants and fast food chains. This feature helps users track their dining habits, costs, and nutritional information.

## Functional Requirements

### FR-FOOD-001: Display Restaurant List

- The system shall display a list of restaurants/fast food chains with previously ordered dishes
- Each restaurant shall show its name and a list of dishes ordered from it
- Restaurant data is stored in `src/data/foodOrders.ts` (view-only from UI)

### FR-FOOD-002: Cost Tracking and Totals

- Each dish shall display its name and cost
- The system shall compute and display the total cost per restaurant
- The system shall compute and display a grand total across all restaurants
- Costs shall be displayed with `$` prefix and 2 decimal places

### FR-FOOD-003: Dish Tagging System

- Dishes shall be tagged with multiple dimensions:
  - **Meal time**: Breakfast, Lunch, Dinner, Snack (multiple allowed per dish)
  - **Cuisine**: Indian, Chinese, American, Mexican, Italian, Thai, Japanese
  - **Dish type**: Appetizer, Main, Dessert, Drink, Side
- Tags shall be color-coded for easy visual identification

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
  - Dish name
  - Cost (right-aligned)
  - Tags (color-coded)
  - Macros (when present, in compact format)
- Dish items shall have a left border accent for visual hierarchy

## Out of Scope (MVP)

- Adding/editing restaurants or dishes from the UI
- Ordering integration with external services
- Receipt scanning or import
- Nutritional goal tracking
- Filtering/sorting dishes by tags or macros
