---
name: workflow-reminder
enabled: true
event: prompt
conditions:
  - field: prompt
    operator: regex_match
    pattern: (implement|add|create|build|feature|update.*component|new.*page)
---

📋 **Workflow Reminder**

Before implementing, follow this order:
1. `/requirements` - Update requirements doc FIRST
2. Write tests (or plan to write them with implementation)
3. Then implement the code

Have you updated the requirements yet?
