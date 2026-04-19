/**
 * Design Intelligence Skill
 * Combines Stitch principles and High-end Design Taste guidelines.
 */

/**
 * Returns baseline configurations based on High-end Design Taste
 */
export function getPremiumTaste(aesthetic = "modern minimal") {
  const baselines = {
    DESIGN_VARIANCE: 8,
    MOTION_INTENSITY: 6,
    VISUAL_DENSITY: 4,
    ACCENT_ACCURACY: "Desaturated (< 80% saturation)",
    FORBIDDEN: ["Emojis", "Pure Black (#000000)", "AI Purple/Blue aesthetic", "Inter font", "Generic names like 'John Doe'"]
  };

  const rules = [
    "Deterministic Typography: Geist or Satoshi stack, tracking-tighter.",
    "Liquid Glass Refraction: 1px inner border + subtle inner shadow.",
    "Grid over Flex-Math: No complex flexbox percentage math, use CSS Grid.",
    "Anti-Center Bias: Use asymmetric layouts for Variance > 4.",
    "Viewport Stability: NEVER use h-screen, ALWAYS use min-h-[100dvh].",
    "Anti-Emoji Policy: NEVER use emojis in code, markup, text content, or alt text.",
    "Data & Forms: Label MUST sit above input. Error text below input."
  ];

  return {
    aesthetic,
    baselines,
    engineering_rules: rules,
    recommended_stack: "React/Next.js + Tailwind v4 + Framer Motion"
  };
}

/**
 * Generates a structured DESIGN.md content for a project
 */
export async function generateDesignMd(projectType, brand = null) {
  const taste = getPremiumTaste();
  
  return `# Design System: ${projectType}
${brand ? `Inspired by: ${brand}\n` : ""}

## 1. Visual Theme
- Variance: ${taste.baselines.DESIGN_VARIANCE}
- Motion: ${taste.baselines.MOTION_INTENSITY}
- Density: ${taste.baselines.VISUAL_DENSITY}

## 2. Core Directives
${taste.engineering_rules.map(r => `- ${r}`).join("\n")}

## 3. Component Specs
- Buttons: Magnetic pull (if motion > 5), 1px inner border.
- Layout: Asymmetric Bento Grid for data sections.
- Surface: Zinc/Slate base with desaturated accent.

## 4. Implementation Checklist
- [ ] Install Geist font stack.
- [ ] Configure Tailwind v4 tokens.
- [ ] Implement Framer Motion spring physics (stiffness: 100, damping: 20).
- [ ] Add 1px Liquid Glass border to all cards.
- [ ] Ensure full-height sections use min-h-[100dvh].
`;
}
