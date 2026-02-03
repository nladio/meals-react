# meals-react Development Guidelines

## Project Overview
A React food inventory/meal planning app with:
- **Stack**: React 19, TypeScript, Vite, Tailwind CSS 4
- **State**: Context + useReducer (no Redux)
- **Routing**: Hash-based (#dashboard, #inventory, #shopping, #nutrition, #recipes)
- **Persistence**: localStorage (`meals-app-state-v3`)

## Development Environment
- **Base URL**: http://localhost:5173/meals-react/
- **Dev server**: Always running (`npm run dev`) - managed externally, do not start or kill

## Key Directories
- `src/types/index.ts` - All TypeScript interfaces (centralized)
- `src/hooks/useAppState.tsx` - State management hub (Context + reducer + selectors)
- `src/data/` - Default items (JSON), recipes, food orders
- `src/components/ui/` - Reusable UI components (Button, Modal, etc.)
- `src/pages/` - Route-level components
- `requirements/` - Feature documentation (read before coding)
- `architecture/` - Deep-dive documentation (state, types, components, data layer)

## Core Concepts
- **Section**: 'fresh' | 'frozen' | 'dry' - primary data organization
- **KnownItem**: Catalog entries (defaults + user-added)
- **InventoryItem**: Current stock with quantities
- **ItemUsage**: 'meal' | 'ingredient' - dual-purpose categorization

## Testing
- **Framework**: Vitest + React Testing Library + happy-dom
- **Pattern**: Colocated tests (`Component.test.tsx` next to `Component.tsx`)
- **Run tests**: `npm test`
- **Type check**: `npm run typecheck` (includes test files)

## Conventions
- Types go in `src/types/index.ts` (not scattered)
- New data/default items go in `src/data/` as JSON or TypeScript
- Components are PascalCase, organized by feature
- State changes via dispatch actions only (never mutate directly)

---

## MANDATORY Workflow Order

```
Identify requirements -> Update requirements -> Design a solution -> Implement the solution using the feature slice steps
```

For ANY feature work, follow this exact order:

1. **Requirements First**
   - Review and update `requirements/*.md` BEFORE writing any code
   - Document what you're building before building it

2. **Design**
   - Explore the code using the feature-dev:code-explorer skill
   - Design the optimal approach using the feature-dev:code-architect skill

3. **For Each Feature Slice** (repeat until feature complete):
   - Write source code for one slice
   - Write unit tests for that slice
   - Run `npm run typecheck` to catch type errors (including in tests)
   - Simplify the new code using the code-simplifier:code-simplifier skill
   - Validate the feature using the playwright plugin
   - Make a small, focused commit using the commit-commands skill

4. **Validation**
   - Use the playwright plugin to verify in-browser behavior

## Slice Workflow

```
Code → Tests → Typecheck → Simplify → Validate → Commit
```

Repeat for each logical slice of the feature.

**Make use of Tasks to divide the work into slices**
**NEVER write implementation code before updating requirements.**
**ALWAYS commit after completing each slice (code + tests + simplify).**
