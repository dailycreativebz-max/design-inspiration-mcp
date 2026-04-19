// ─── Design Token System Generator ───────────────────────────────────────────
// Generates a complete, production-ready CSS custom property system
// from a base brand color + aesthetic style.

import { getColorPalettes } from "./colors.js";

// ─── Token Templates ──────────────────────────────────────────────────────────

const SPACING_SCALES = {
  "4-base": {
    name: "4px base scale",
    description: "The standard scale. Every value is a multiple of 4px.",
    tokens: {
      "--space-0": "0px",
      "--space-1": "4px",
      "--space-2": "8px",
      "--space-3": "12px",
      "--space-4": "16px",
      "--space-5": "20px",
      "--space-6": "24px",
      "--space-8": "32px",
      "--space-10": "40px",
      "--space-12": "48px",
      "--space-16": "64px",
      "--space-20": "80px",
      "--space-24": "96px",
      "--space-32": "128px",
    },
    tailwind_config: `spacing: { 0:'0px', 1:'4px', 2:'8px', 3:'12px', 4:'16px', 5:'20px', 6:'24px', 8:'32px', 10:'40px', 12:'48px', 16:'64px', 20:'80px', 24:'96px', 32:'128px' }`,
  },
};

const TYPOGRAPHIC_SCALES = {
  minor_third: {
    name: "Minor Third (1.2)",
    description: "Subtle, dense scale. Good for data-heavy UIs where small sizes matter.",
    ratio: 1.2,
    base: 16,
    tokens: {
      "--text-xs": "11px",
      "--text-sm": "13px",
      "--text-base": "16px",
      "--text-lg": "19px",
      "--text-xl": "23px",
      "--text-2xl": "28px",
      "--text-3xl": "34px",
      "--text-4xl": "40px",
      "--text-5xl": "48px",
    },
  },
  major_third: {
    name: "Major Third (1.25)",
    description: "Balanced scale for most web projects.",
    ratio: 1.25,
    base: 16,
    tokens: {
      "--text-xs": "10px",
      "--text-sm": "13px",
      "--text-base": "16px",
      "--text-lg": "20px",
      "--text-xl": "25px",
      "--text-2xl": "31px",
      "--text-3xl": "39px",
      "--text-4xl": "49px",
      "--text-5xl": "61px",
    },
  },
  perfect_fourth: {
    name: "Perfect Fourth (1.333)",
    description: "Expressive scale with visible hierarchy. Best for marketing and editorial sites.",
    ratio: 1.333,
    base: 16,
    tokens: {
      "--text-xs": "9px",
      "--text-sm": "12px",
      "--text-base": "16px",
      "--text-lg": "21px",
      "--text-xl": "28px",
      "--text-2xl": "37px",
      "--text-3xl": "50px",
      "--text-4xl": "67px",
      "--text-5xl": "89px",
    },
  },
};

const SHADOW_SYSTEMS = {
  dark: {
    name: "Dark theme shadows",
    description: "For dark backgrounds — lighter, more opaque shadows",
    tokens: {
      "--shadow-xs": "0 1px 2px rgba(0,0,0,0.4)",
      "--shadow-sm": "0 2px 4px rgba(0,0,0,0.5)",
      "--shadow-md": "0 4px 16px rgba(0,0,0,0.5)",
      "--shadow-lg": "0 8px 32px rgba(0,0,0,0.6)",
      "--shadow-xl": "0 20px 60px rgba(0,0,0,0.7)",
      "--shadow-2xl": "0 40px 80px rgba(0,0,0,0.8)",
    },
  },
  light: {
    name: "Light theme shadows",
    description: "For light backgrounds — subtle, warm shadows",
    tokens: {
      "--shadow-xs": "0 1px 2px rgba(0,0,0,0.04)",
      "--shadow-sm": "0 2px 4px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
      "--shadow-md": "0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
      "--shadow-lg": "0 8px 32px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)",
      "--shadow-xl": "0 20px 60px rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.08)",
      "--shadow-2xl": "0 40px 80px rgba(0,0,0,0.2), 0 16px 40px rgba(0,0,0,0.1)",
    },
  },
};

const BORDER_RADIUS_SYSTEMS = {
  minimal: {
    name: "Minimal / Brutalist",
    description: "Sharp corners with only slight rounding. Clinical and precise.",
    tokens: { "--radius-xs": "2px", "--radius-sm": "3px", "--radius-md": "4px", "--radius-lg": "6px", "--radius-xl": "8px", "--radius-2xl": "12px", "--radius-full": "9999px" },
  },
  balanced: {
    name: "Balanced (default)",
    description: "Standard rounding for most modern web UIs.",
    tokens: { "--radius-xs": "4px", "--radius-sm": "6px", "--radius-md": "8px", "--radius-lg": "12px", "--radius-xl": "16px", "--radius-2xl": "24px", "--radius-full": "9999px" },
  },
  rounded: {
    name: "Rounded / Playful",
    description: "Generous rounding — friendly, consumer-app aesthetic.",
    tokens: { "--radius-xs": "8px", "--radius-sm": "12px", "--radius-md": "16px", "--radius-lg": "20px", "--radius-xl": "24px", "--radius-2xl": "32px", "--radius-full": "9999px" },
  },
};

const TRANSITION_SYSTEMS = {
  snappy: {
    name: "Snappy",
    description: "Fast, immediate feedback. Good for dense UIs and power users.",
    tokens: {
      "--duration-fast": "100ms",
      "--duration-base": "150ms",
      "--duration-slow": "250ms",
      "--ease-default": "cubic-bezier(0.2, 0, 0, 1)",
      "--ease-spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      "--ease-out": "cubic-bezier(0, 0, 0.2, 1)",
    },
  },
  smooth: {
    name: "Smooth",
    description: "Relaxed, cinematic transitions. Good for marketing and portfolio sites.",
    tokens: {
      "--duration-fast": "200ms",
      "--duration-base": "350ms",
      "--duration-slow": "600ms",
      "--ease-default": "cubic-bezier(0.22, 1, 0.36, 1)",
      "--ease-spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      "--ease-out": "cubic-bezier(0, 0, 0.2, 1)",
    },
  },
};

const Z_INDEX_SYSTEM = {
  tokens: {
    "--z-base": "0",
    "--z-raised": "10",
    "--z-dropdown": "100",
    "--z-sticky": "200",
    "--z-overlay": "300",
    "--z-modal": "400",
    "--z-toast": "500",
    "--z-tooltip": "600",
    "--z-max": "9999",
  },
  usage: {
    "--z-base": "Normal document flow",
    "--z-raised": "Cards, hover states, floating elements",
    "--z-dropdown": "Dropdowns, select menus",
    "--z-sticky": "Sticky headers, sidebars",
    "--z-overlay": "Drawer/sheet backgrounds",
    "--z-modal": "Modal dialogs",
    "--z-toast": "Toast notifications",
    "--z-tooltip": "Tooltips (above everything)",
    "--z-max": "Critical UI that must always be on top",
  },
};

// ─── Theme Generator ──────────────────────────────────────────────────────────

export function generateDesignTokens({
  brand_color = "#6C63FF",
  mode = "dark",
  scale = "major_third",
  rounding = "balanced",
  transitions = "smooth",
  include_tailwind = false,
} = {}) {
  const spacing = SPACING_SCALES["4-base"];
  const typeScale = TYPOGRAPHIC_SCALES[scale] || TYPOGRAPHIC_SCALES.major_third;
  const shadows = SHADOW_SYSTEMS[mode] || SHADOW_SYSTEMS.dark;
  const radii = BORDER_RADIUS_SYSTEMS[rounding] || BORDER_RADIUS_SYSTEMS.balanced;
  const transTokens = TRANSITION_SYSTEMS[transitions] || TRANSITION_SYSTEMS.smooth;

  const colorTokens = generateColorTokens(brand_color, mode);

  const allTokens = {
    ...colorTokens,
    ...spacing.tokens,
    ...typeScale.tokens,
    ...shadows.tokens,
    ...radii.tokens,
    ...transTokens.tokens,
    ...Z_INDEX_SYSTEM.tokens,
  };

  const css = generateCSSFile(allTokens, mode, brand_color);
  const tailwindConfig = include_tailwind ? generateTailwindConfig(typeScale, spacing) : null;

  return {
    summary: {
      brand_color,
      mode,
      type_scale: `${typeScale.name} (ratio: ${typeScale.ratio})`,
      rounding: radii.name,
      transitions: transTokens.name,
      total_tokens: Object.keys(allTokens).length,
    },
    sections: {
      colors: colorTokens,
      spacing: spacing.tokens,
      typography: typeScale.tokens,
      shadows: shadows.tokens,
      border_radius: radii.tokens,
      transitions: transTokens.tokens,
      z_index: Z_INDEX_SYSTEM.tokens,
    },
    z_index_usage: Z_INDEX_SYSTEM.usage,
    css_output: css,
    tailwind_config: tailwindConfig,
    usage_examples: generateUsageExamples(allTokens),
  };
}

function generateColorTokens(brandHex, mode) {
  const isDark = mode === "dark";

  // Generate a simple colour scale from brand hex
  const r = parseInt(brandHex.slice(1, 3), 16);
  const g = parseInt(brandHex.slice(3, 5), 16);
  const b = parseInt(brandHex.slice(5, 7), 16);

  const lighten = (amount) => {
    const mix = (channel) => Math.min(255, Math.round(channel + (255 - channel) * amount));
    return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
  };
  const darken = (amount) => {
    const mix = (channel) => Math.max(0, Math.round(channel * (1 - amount)));
    return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
  };
  const alpha = (a) => `rgba(${r}, ${g}, ${b}, ${a})`;

  if (isDark) {
    return {
      "--color-bg": "#0A0A0F",
      "--color-bg-secondary": "#111118",
      "--color-bg-tertiary": "#1A1A24",
      "--color-surface": "#16161F",
      "--color-border": "rgba(255,255,255,0.08)",
      "--color-border-strong": "rgba(255,255,255,0.15)",
      "--color-text": "#F5F5FF",
      "--color-text-secondary": "#9090AA",
      "--color-text-tertiary": "#606070",
      "--color-brand": brandHex,
      "--color-brand-light": lighten(0.3),
      "--color-brand-dark": darken(0.2),
      "--color-brand-subtle": alpha(0.15),
      "--color-brand-border": alpha(0.3),
    };
  } else {
    return {
      "--color-bg": "#FFFFFF",
      "--color-bg-secondary": "#F8F9FA",
      "--color-bg-tertiary": "#F1F3F5",
      "--color-surface": "#FFFFFF",
      "--color-border": "rgba(0,0,0,0.08)",
      "--color-border-strong": "rgba(0,0,0,0.15)",
      "--color-text": "#0A0A0F",
      "--color-text-secondary": "#4A4A5A",
      "--color-text-tertiary": "#8A8A9A",
      "--color-brand": brandHex,
      "--color-brand-light": lighten(0.3),
      "--color-brand-dark": darken(0.2),
      "--color-brand-subtle": alpha(0.08),
      "--color-brand-border": alpha(0.25),
    };
  }
}

function generateCSSFile(tokens, mode, brandHex) {
  const entries = Object.entries(tokens)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n");

  return `/* ─── Design Tokens — Generated by Design Inspiration MCP ─────────────────
   Brand: ${brandHex} | Mode: ${mode} | ${Object.keys(tokens).length} tokens
   ────────────────────────────────────────────────────────────────────────── */

:root {
${entries}
}

/* Dark mode override — add [data-theme="dark"] to <html> to toggle */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0A0A0F;
    --color-bg-secondary: #111118;
    --color-text: #F5F5FF;
    --color-text-secondary: #9090AA;
    --color-border: rgba(255,255,255,0.08);
  }
}`;
}

function generateTailwindConfig(typeScale, spacing) {
  return `// tailwind.config.js — Generated tokens
module.exports = {
  theme: {
    extend: {
      fontSize: {
        xs: '${typeScale.tokens["--text-xs"]}',
        sm: '${typeScale.tokens["--text-sm"]}',
        base: '${typeScale.tokens["--text-base"]}',
        lg: '${typeScale.tokens["--text-lg"]}',
        xl: '${typeScale.tokens["--text-xl"]}',
        '2xl': '${typeScale.tokens["--text-2xl"]}',
        '3xl': '${typeScale.tokens["--text-3xl"]}',
        '4xl': '${typeScale.tokens["--text-4xl"]}',
        '5xl': '${typeScale.tokens["--text-5xl"]}',
      },
      ${spacing.tailwind_config}
    }
  }
}`;
}

function generateUsageExamples(tokens) {
  return [
    `/* Card component using tokens */
.card {
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: var(--shadow-md);
  transition: box-shadow var(--duration-base) var(--ease-default);
}
.card:hover { box-shadow: var(--shadow-lg); }`,

    `/* Button using brand tokens */
.btn-primary {
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  background: var(--color-brand);
  color: white;
  font-size: var(--text-sm);
  transition: background var(--duration-fast) var(--ease-default);
}
.btn-primary:hover { background: var(--color-brand-dark); }`,

    `/* Heading with type scale */
h1 { font-size: var(--text-4xl); letter-spacing: -0.04em; line-height: 1.05; }
h2 { font-size: var(--text-3xl); letter-spacing: -0.03em; line-height: 1.1; }
h3 { font-size: var(--text-xl); letter-spacing: -0.01em; line-height: 1.3; }
p  { font-size: var(--text-base); line-height: 1.7; color: var(--color-text-secondary); }`,

    `/* Z-index usage — use tokens, never raw numbers */
.navbar  { z-index: var(--z-sticky); }
.modal   { z-index: var(--z-modal); }
.toast   { z-index: var(--z-toast); }
.tooltip { z-index: var(--z-tooltip); }`,
  ];
}
