---
name: check-tests-written
enabled: true
event: stop
action: block
conditions:
  - field: transcript
    operator: contains
    pattern: Edit.*src/pages/|Edit.*src/components/
  - field: transcript
    operator: not_contains
    pattern: \.test\.(ts|tsx)|npm test
---

⚠️ **Tests not written!**

You modified components/pages but didn't write tests.
Please add tests for your changes before finishing.
