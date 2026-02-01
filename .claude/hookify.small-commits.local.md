---
name: small-commit-reminder
enabled: true
event: stop
action: warn
conditions:
  - field: transcript
    operator: contains
    pattern: Edit.*src/
  - field: transcript
    operator: regex_match
    pattern: (\.test\.(ts|tsx)|npm test)
  - field: transcript
    operator: not_contains
    pattern: git commit
---

📦 **Time to Commit!**

You've completed a slice of work (code + tests).
Make a small, focused commit for this change before moving on.

Workflow: Code → Tests → Simplify → Commit
