# Design System Audit Skill

Use this skill to ensure UI code adheres to the High-Agency Design Taste guidelines and accessibility standards.

## When to Use
- When the user asks to "check my UI", "review my code", or "audit my component".
- After generating a new UI component to ensure it meets premium standards.
- When fixing accessibility issues in existing HTML.

## Key Actions
1.  **Visual Audit:** Use `audit_ui_component` to detect "AI Tells" like Inter font, pure black #000000, and generic card shadows.
2.  **A11y Check:** Use `get_accessibility_guide` to find specific patterns.
3.  **Auto-Fix:** Use `auto_fix_accessibility` to automatically repair common markup issues.

## Directives
- **Zero Tolerance for Slop:** If the audit score is below 80, automatically propose a rewrite using premium modifiers.
- **Accessibility is Mandatory:** Never deliver a component that doesn't pass the basic accessibility check.
