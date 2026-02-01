---
name: code-simplifier-reminder
enabled: true
event: stop
action: warn
conditions:
  - field: transcript
    operator: regex_match
    pattern: (\.test\.(ts|tsx)|npm test)
  - field: transcript
    operator: not_contains
    pattern: code.simplif
---

🧹 **Run Code Simplifier!**

You wrote tests but haven't run the code simplifier plugin.
Please run it to clean up and simplify the code before committing.
