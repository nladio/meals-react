# Meal Planning Requirements `[unimplemented]`

## Overview

The Meal Planning feature allows users to create recipes with ingredients and match them against their current inventory to determine which meals can be prepared.

## Functional Requirements

### FR-MEAL-001: Default Recipe List

- The system shall load recipes from a default list within the app
- Each recipe shall have:
  - **name**: string
  - **ingredients**: list of ingredients
- Each ingredient shall have:
  - **name**: string (matches inventory item names)
  - **required**: boolean flag (true = required, false = optional)

### FR-MEAL-002: View Recipes

- The system shall display the list of default recipes
- Each recipe shall show:
  - Recipe name
  - Total ingredient count

### FR-MEAL-003: Recipe Matching

- The user shall be able to select available ingredients from their inventory
- The system shall show which recipes can be made based on selected ingredients:
  - **Full match**: All required ingredients are available
  - **Partial match**: Some required ingredients are missing (system shows what's missing)

## Out of Scope (MVP)

- User-created recipes (create/delete)
- Cooking instructions
- Weekly meal planning/scheduling
- Auto-generate shopping list from recipes
- Recipe categories/tags
- Serving sizes/quantities
- Ingredient quantities (matching is presence/absence only)

## Assumptions

- Ingredients match inventory items by name
- Recipes are hardcoded in the app (default list)
- New "Recipes" page/tab in the app
