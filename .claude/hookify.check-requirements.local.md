---
name: check-requirements-updated
enabled: true
event: stop
action: block
conditions:
  - field: transcript
    operator: contains
    pattern: Edit.*src/
  - field: transcript
    operator: not_contains
    pattern: requirements/.*\.md
---

⚠️ **Requirements not updated!**

You modified source files but didn't update requirements.
Please update the relevant `requirements/*.md` file before finishing.
