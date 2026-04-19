# Premium UI Scaffolding Skill

Scaffold production-ready UI components that adhere to High-Agency Design Taste and systemic design engineering principles.

## When to Use
- When the user asks to "build a component", "create a page", "code this layout", or "generate a design system".
- When starting a new feature implementation.

## Key Actions
1.  **System Definition:** Use `generate_design_md` to establish the project DNA.
2.  **Tokenization:** Use `generate_design_tokens` to create the CSS custom properties system.
3.  **Code Scaffolding:** Use `generate_react_component` to produce functional React/Tailwind v4 code.
4.  **Spatial Enhancement:** For 3D/WebGL needs, use `get_r3f_patterns`.

## Directives
- **Deterministic First:** Always generate tokens and a `DESIGN.md` before writing the actual component code.
- **Framework Native:** Prefer Tailwind v4 syntax and Framer Motion for all interactive elements.
- **Strict Anti-Slop:** Ensure no banned patterns (pure black, Inter font, h-screen) are introduced during scaffolding.
