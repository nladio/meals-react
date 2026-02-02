# meals-react Development Guidelines

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
   - Validate the feature using the playright plugin
   - Make a small, focused commit using the commit-commands skill

## Slice Workflow

```
Code → Tests → Typecheck → Simplify → Validate -> Commit
```

Repeat for each logical slice of the feature.


**NEVER write implementation code before updating requirements.**
**ALWAYS commit after completing each slice (code + tests + simplify).**
