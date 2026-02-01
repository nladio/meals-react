# meals-react Development Guidelines

## MANDATORY Workflow Order

For ANY feature work, follow this exact order:

1. **Requirements First**
   - Update `requirements/*.md` BEFORE writing any code
   - Document what you're building before building it

2. **For Each Feature Slice** (repeat until feature complete):
   - Write source code for one slice
   - Write unit tests for that slice
   - Run code simplifier plugin
   - Make a small, focused commit

## Slice Workflow

```
Code → Tests → Simplify → Commit
```

Repeat for each logical slice of the feature.

## Skills to Use

- `/requirements` - Capture requirements
- `/plan-feature` - Plan implementation
- `/test-feature` - Write tests
- `/implement` - Write code

**NEVER write implementation code before updating requirements.**
**ALWAYS commit after completing each slice (code + tests + simplify).**
