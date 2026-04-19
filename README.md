# Design Inspiration MCP Server

A premium Model Context Protocol (MCP) server for Design Engineering. This server provides 28 powerful tools for design inspiration, UI/UX auditing, accessibility fixing, and automated scaffolding.

Integrated with **Google Stitch** and **High-end Design Taste** guidelines, it enables AI agents to think and design like top-tier design agencies.

## 🚀 Features

- **Global Inspiration**: Browse and search top-rated designs from Awwwards, SiteInspire, CSS Design Awards, Behance, and more.
- **Design Systems**: Access curated `DESIGN.md` specs from 58+ industry-leading brands (Apple, Stripe, Airbnb, etc.).
- **UI/UX Intelligence**: Audit components against high-end design engineering baselines.
- **Accessibility**: Automatically identify and fix WCAG 2.1 AA compliance issues.
- **Automated Scaffolding**: Generate React components, design tokens, and comprehensive design briefs.
- **3D & Spatial**: Retrieve React Three Fiber and Three.js patterns for immersive web experiences.

## 🛠️ Tools

### Discovery (11 Tools)
- `browse_awwwards`: Fetch top-rated sites with design notes and tech tags.
- `browse_behance`: Explore curated Behance projects (branding, UI/UX, etc.).
- `browse_brand_designs`: Access 58+ detailed design system specifications.
- `browse_css_awards`: Cutting-edge WebGL, 3D, and interactive site inspiration.
- `browse_dribbble`: Trending shots by tag (landing page, mobile app, etc.).
- `browse_godly`: Motion and animation-focused inspiration.
- `browse_landbook`: The best SaaS landing page patterns and conversion tactics.
- `browse_mobbin`: Real-world mobile UI patterns (iOS/Android).
- `browse_siteinspire`: Curated sites for minimal, editorial, and experimental aesthetics.
- `browse_stitch_projects`: Search UI components within existing Google Stitch projects.
- `search_inspiration`: Search across all sources simultaneously.

### Skills & Scaffolding (10 Tools)
- `generate_design_tokens`: Generate complete CSS custom property systems.
- `get_accessibility_guide`: Implementation-ready WCAG 2.1 AA patterns.
- `get_animation_library`: 9 high-end CSS+JS animations (stagger reveal, scroll trigger, etc.).
- `get_color_palettes`: 11 mood-matched palettes with CSS variables.
- `get_component_snippets`: Copy-paste UI components (buttons, navbars, cards).
- `get_design_skills`: Modern design techniques (glassmorphism, brutalism, etc.).
- `get_layout_patterns`: Full HTML/CSS/React layout templates (hero, bento, split).
- `get_micro_copy`: Copywriting patterns with psychological rationale.
- `get_premium_taste`: High-end design engineering baselines (Variance, Motion, Density).
- `get_typography_pairings`: 10 font pairs with Google Fonts imports.

### Synthesis & Validation (7 Tools)
- `audit_ui_component`: Visually audit UI code against high-end guidelines.
- `auto_fix_accessibility`: Auto-fix common accessibility issues in HTML.
- `generate_design_md`: Create structured DESIGN.md files following Stitch format.
- `generate_react_component`: Scaffold React components using Tailwind v4.
- `get_design_brief`: Generate complete design briefs and implementation roadmaps.
- `get_r3f_patterns`: authoritative React Three Fiber and Three.js boilerplates.
- `get_stitch_patterns`: Retrieve Google Stitch UI prompt templates.

## 📦 Installation

### For Claude Desktop
Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "design-inspiration": {
      "command": "node",
      "args": ["/path/to/design-inspiration-mcp/src/index.js"]
    }
  }
}
```

### For Gemini CLI
```bash
gemini extensions install /path/to/design-inspiration-mcp
```

## 🙏 Credits and Attribution

This MCP server acts as an intelligence layer that interfaces with various design galleries and platforms. We do not claim ownership of the visual assets or designs returned by these tools. All credit for the featured work belongs to the respective creators and the platforms that host them:

- **Awwwards**: For recognizing the best web designers, developers, and agencies in the world.
- **SiteInspire**: For their expert curation of the finest web and interactive design.
- **CSS Design Awards**: For highlighting technically impressive and beautiful web design.
- **Behance / Dribbble**: For providing a platform for the global creative community.
- **Godly**: For their excellent curation of motion and animation.
- **Mobbin**: For their comprehensive library of mobile design patterns.
- **Land-book**: For their focus on conversion-optimized SaaS design.
- **Brand Design Systems**: Credits to the design engineering teams at Apple, Stripe, Airbnb, Vercel, and all other brands featured in our curated `DESIGN.md` collection.

We encourage users of this tool to visit these sites directly to support the creators and explore the full breadth of their work.

## 📄 License

MIT License. See `LICENSE` for details.
