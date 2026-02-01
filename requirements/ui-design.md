# UI Design - Visual Improvements Requirements

## Overview

This document captures requirements for improving the visual design, consistency, and polish of the Meals app UI across all pages.

## Typography Requirements

### FR-UI-001: Custom Typography `[unimplemented]`

- The app shall use a distinctive display font for headings instead of system fonts
- Recommended fonts: DM Sans, Plus Jakarta Sans, or Outfit
- The body text shall use a refined, readable font
- A consistent type scale shall be established:
  - Page titles: 28px bold
  - Section headers: 16px semibold uppercase
  - Card titles: 18-20px semibold
  - Body text: 15px regular
  - Small text: 12-13px

### FR-UI-002: Font Loading `[unimplemented]`

- Custom fonts shall be loaded via Google Fonts or local assets
- Font loading shall not block page render (use font-display: swap)

## Page Header Consistency

### FR-UI-003: Standardized Page Headers `[unimplemented]`

- All pages shall use a consistent header style
- Headers shall include:
  - Back button (arrow) on left for non-dashboard pages
  - Page title centered
  - Consistent spacing and typography
- Header text color shall be consistent (either all use primary orange OR all use neutral dark gray)

### FR-UI-004: Dashboard Header `[unimplemented]`

- Dashboard header shall match the style of other pages
- The "Meals" branding title shall use the primary color
- Consider adding a settings/profile icon on the right for balance

## Card Design Consistency

### FR-UI-005: Elevated Card Style `[unimplemented]`

- All card components shall use consistent styling:
  - White background
  - Rounded corners (12-16px radius)
  - Subtle shadow (0 4px 12px rgba(0,0,0,0.08))
  - Optional gradient header for category cards
- The Shopping page card style shall inform the design of other pages

### FR-UI-006: Dashboard Inventory Cards `[unimplemented]`

- Dashboard inventory sections (Fresh, Frozen, Dry) shall be upgraded to match Shopping page style
- Each section shall have a distinct accent color:
  - Fresh Food: Green/emerald gradient header
  - Frozen Food: Blue/cyan gradient header
  - Dry/Pantry: Amber/orange gradient header
- Section headers shall display item count

### FR-UI-007: Nutrition Page Cards `[unimplemented]`

- High Protein and High Fiber sections shall use elevated card style
- Cards shall have subtle gradient headers matching their accent colors:
  - High Protein: Green header
  - High Fiber: Teal header

### FR-UI-008: Recipes Page Cards `[unimplemented]`

- Recipe cards shall use consistent elevated style
- Border-left accent shall be retained for status indication
- Consider adding subtle hover states

## Empty States

### FR-UI-009: Engaging Empty States `[unimplemented]`

- Empty states shall include:
  - A simple illustrative icon or SVG graphic
  - Encouraging, action-oriented copy
  - Subtle styling that doesn't feel like an error
- Example empty state messages:
  - Inventory: "Your pantry is empty. Tap + Add Item to get started"
  - Nutrition: "Stock up on nutritious foods to see suggestions here"
  - Recipes: "Add ingredients to see recipes you can make"

### FR-UI-010: Empty State Component `[unimplemented]`

- Create a reusable EmptyState component with props for:
  - Icon (optional SVG or emoji)
  - Title text
  - Subtitle/description text
  - Optional action button

## Bottom Navigation

### FR-UI-011: Navigation Icon Upgrade `[unimplemented]`

- Replace emoji icons with cohesive SVG icons
- Icons shall be consistent in style (outline or filled)
- Icon size: 24px
- Recommended icon set: Heroicons, Lucide, or custom SVGs

### FR-UI-012: Active State Indicator `[unimplemented]`

- Active navigation item shall have a clear visual indicator:
  - Option A: Pill-shaped background behind active item
  - Option B: Top border/underline on active item
  - Option C: Filled icon variant for active state
- Active state shall use the primary color

### FR-UI-013: Navigation Micro-interactions `[unimplemented]`

- Add subtle scale or opacity transition on tap
- Consider adding haptic feedback on mobile (if supported)

## Color Palette

### FR-UI-014: Cohesive Color System `[unimplemented]`

- Define a complete color palette in CSS variables:
  - Primary: Orange (#e07b39) - brand color
  - Secondary: Slate (#334155) - headers, dark accents
  - Success: Green (#22c55e) - positive states
  - Warning: Amber (#f59e0b) - warning states
  - Danger: Red (#ef4444) - error/critical states
  - Accent colors for categories:
    - Fresh: Emerald (#10b981)
    - Frozen: Cyan (#06b6d4)
    - Dry: Amber (#f59e0b)
    - Protein: Green (#22c55e)
    - Fiber: Teal (#14b8a6)

### FR-UI-015: Consistent Gray Scale `[unimplemented]`

- Standardize gray usage across the app:
  - Background: gray-50 (#f9fafb)
  - Card backgrounds: white
  - Borders: gray-200 (#e5e7eb)
  - Muted text: gray-400 (#9ca3af)
  - Body text: gray-700 (#374151)
  - Headings: gray-800 (#1f2937)

## History Page

### FR-UI-016: Calendar Visual Improvements `[unimplemented]`

- Today's date shall be prominently highlighted (filled circle or bold border)
- Days with shopping activity shall display a dot indicator
- Add subtle hover states for interactive days
- Selected day shall have a distinct highlight style

### FR-UI-017: Calendar Navigation Buttons `[unimplemented]`

- Month navigation buttons shall match the app's button style
- Consider using chevron icons instead of arrow characters

## Recipes Page

### FR-UI-018: Ingredient Pill Refinement `[unimplemented]`

- Use softer pastel backgrounds for ingredient pills
- Available ingredients: Light green with subtle checkmark icon
- Missing required: Light red/pink
- Missing optional: Light gray
- Reduce visual density for recipes with many ingredients

## Responsive Design

### FR-UI-019: Mobile-First Polish `[unimplemented]`

- Ensure touch targets are minimum 44x44px
- Add appropriate spacing for thumb reach on mobile
- Test all interactions on touch devices

### FR-UI-020: Desktop Layout Optimization `[unimplemented]`

- On wider screens, consider multi-column layouts where appropriate
- Dashboard could show inventory sections side-by-side on desktop
- Recipes page could use a grid layout for recipe cards

## Implementation Priority

1. **High Priority**
   - FR-UI-001, FR-UI-002: Typography (biggest visual impact)
   - FR-UI-003: Page header consistency
   - FR-UI-005, FR-UI-006: Card design consistency

2. **Medium Priority**
   - FR-UI-009, FR-UI-010: Empty states
   - FR-UI-011, FR-UI-012: Bottom navigation
   - FR-UI-014, FR-UI-015: Color palette

3. **Lower Priority**
   - FR-UI-016, FR-UI-017: Calendar improvements
   - FR-UI-018: Recipe pill refinement
   - FR-UI-013: Micro-interactions
   - FR-UI-019, FR-UI-020: Responsive polish

## Out of Scope (Initial Pass)

- Dark mode support
- Animation/motion design system
- Custom cursor effects
- Advanced micro-interactions beyond basic hover/tap states
- Accessibility audit (separate requirement)
