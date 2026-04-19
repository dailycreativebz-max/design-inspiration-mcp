import axios from "axios";
import * as cheerio from "cheerio";

// ─── CSS Design Awards Curated ────────────────────────────────────────────────

const CSS_AWARDS_CURATED = [
  {
    name: "Cuberto",
    url: "https://cuberto.com",
    award: "CSSDA Special Kudos",
    style_tags: ["agency", "dark", "motion", "cursor"],
    description:
      "Top-tier digital agency. Immaculate cursor animations, magnetic elements, and smooth case study transitions. The benchmark for agency sites.",
    design_notes:
      "Custom cursor morphs per content zone. Bold condensed type. Each project hover reveals a clip-masked preview. Motion-forward without being distracting.",
    color_hints: ["#0A0A0A", "#F5F5F5", "#FF5C00"],
    techniques: ["custom-cursor", "clip-mask-hover", "magnetic-elements", "smooth-scroll"],
  },
  {
    name: "Garden Eight",
    url: "https://garden-eight.com",
    award: "CSSDA Site of the Day",
    style_tags: ["experimental", "japanese", "minimal", "editorial"],
    description:
      "Japanese creative studio. Understated elegance with ink-like typography transitions. Every interaction feels considered and calm.",
    design_notes:
      "White/cream dominant. Ink-spread text animations. Generous negative space. Bi-lingual (JP/EN) layout that uses the language contrast as a design element.",
    color_hints: ["#F8F5F0", "#1A1A1A", "#8B7355"],
    techniques: ["ink-spread-animation", "negative-space", "editorial-grid"],
  },
  {
    name: "Aristide Benoist",
    url: "https://www.aristidebenoist.com",
    award: "CSSDA Awwwards Dev Award",
    style_tags: ["portfolio", "experimental", "webgl", "dark"],
    description:
      "Creative developer portfolio. WebGL post-processing effects that distort the entire viewport on hover. Sets the bar for developer portfolios.",
    design_notes:
      "Full-screen WebGL canvas. Displace/blur shaders on mouse. Monochromatic palette lets the shader effects pop.",
    color_hints: ["#000000", "#FFFFFF", "#888888"],
    techniques: ["webgl-distortion", "post-processing", "fullscreen-canvas"],
  },
  {
    name: "Dogstudio",
    url: "https://www.dogstudio.co",
    award: "CSSDA Special Kudos",
    style_tags: ["agency", "dark", "3d", "motion"],
    description:
      "Creative agency with rich 3D scene as hero. Camera flies through a dark 3D space representing their work. Cinematic brand identity.",
    design_notes:
      "Three.js hero scene. Dark, desaturated palette. Case studies revealed as 3D planes. The 3D doesn't feel gimmicky — it carries the narrative.",
    color_hints: ["#080808", "#CCCCCC", "#FF3C00"],
    techniques: ["threejs-scene", "camera-fly-through", "3d-case-studies"],
  },
  {
    name: "Obys Agency",
    url: "https://obys.agency",
    award: "CSSDA Site of the Day",
    style_tags: ["agency", "experimental", "typography", "motion"],
    description:
      "Ukrainian design agency. Horizontal scroll, oversized type, explosive hover effects. Typography as the primary visual.",
    design_notes:
      "Horizontal scroll layout. Giant display type fills entire viewport widths. Hover interactions shoot elements across the screen.",
    color_hints: ["#FFFFFF", "#000000", "#FF0000"],
    techniques: ["horizontal-scroll", "oversized-type", "explosive-hover"],
  },
];

// ─── Behance Curated ──────────────────────────────────────────────────────────

const BEHANCE_CURATED = [
  {
    title: "Rebrand — Minimal Identity System",
    type: "branding",
    designer: "Anagrama Studio",
    style_tags: ["branding", "minimal", "identity", "typography"],
    description:
      "Comprehensive brand identity system. Geometric wordmark, strict type hierarchy, monochromatic palette with single accent.",
    design_notes:
      "Shows how brand systems scale: from business card to billboard. Restraint in the palette means the mark does all the work.",
    techniques: ["brand-system", "wordmark", "typographic-hierarchy"],
    color_palette: ["#1A1A1A", "#FFFFFF", "#FFD700"],
  },
  {
    title: "App UI — Dark Finance Dashboard",
    type: "ui-ux",
    designer: "Sava Stoic",
    style_tags: ["dashboard", "finance", "dark", "data-viz"],
    description:
      "High-density finance dashboard. Dark surface system (5 grey levels), vivid chart accents, micro-interaction on every data point.",
    design_notes:
      "The 5-level grey surface scale (not just 2) is what separates beginner from expert dark UIs. Charts use full chroma; UI chrome uses desaturated tones.",
    techniques: ["5-level-surface", "data-visualization", "micro-interactions"],
    color_palette: ["#0D0D0D", "#1A1A1A", "#262626", "#00D2AA", "#FF6B6B"],
  },
  {
    title: "Motion Brand — Kinetic Identity",
    type: "motion",
    designer: "Molistudio",
    style_tags: ["motion", "branding", "kinetic", "logo"],
    description:
      "Animated brand identity where the logo morphs between states. Motion is the brand, not decoration.",
    design_notes:
      "Defines motion tokens: duration, easing, colour transitions. Each animation has a 'personality' that matches brand values. Motion design system.",
    techniques: ["motion-tokens", "morphing-logo", "personality-animation"],
    color_palette: ["#FF3CAC", "#784BA0", "#2B86C5"],
  },
  {
    title: "E-commerce UI — Luxury Fashion",
    type: "ui-ux",
    designer: "Unfold",
    style_tags: ["ecommerce", "fashion", "luxury", "editorial"],
    description:
      "Fashion e-commerce with editorial photography integration. Product page feels like a magazine spread.",
    design_notes:
      "Full-bleed product photography. Price as a typographic element (large, thin serif). Checkout stripped to 2 steps. Mobile cart as bottom sheet.",
    techniques: ["full-bleed-photography", "editorial-product-page", "bottom-sheet-cart"],
    color_palette: ["#F5F0E8", "#0A0A0A", "#C9A84C"],
  },
  {
    title: "Icon Set — Duotone System",
    type: "iconography",
    designer: "Phosphor Icons",
    style_tags: ["icons", "system", "duotone", "minimal"],
    description:
      "Consistent 6-weight icon system. Thin through bold, all optically corrected. Duotone variant adds depth with second colour layer.",
    design_notes:
      "Icon grids locked to 24px with 2px optical padding. Stroke joins consistent across all weights. Duotone: 30% opacity second colour on fills.",
    techniques: ["optical-correction", "weight-system", "duotone-icons"],
    color_palette: ["#000000", "rgba(0,0,0,0.3)"],
  },
];

export async function browseCSSAwards(style = "agency", limit = 5) {
  try {
    const live = await scrapeCSSDA(limit);
    if (live.length > 0) return live;
  } catch (_) {}

  const normalized = style.toLowerCase();
  let pool = CSS_AWARDS_CURATED.filter((s) =>
    s.style_tags.some((t) => t.includes(normalized) || normalized.includes(t))
  );
  if (pool.length === 0) pool = CSS_AWARDS_CURATED;

  return pool.slice(0, limit).map((s) => ({
    ...s,
    source: "cssda_curated",
    fetched_at: new Date().toISOString(),
  }));
}

export async function browseBehance(type = "ui-ux", limit = 5) {
  try {
    const live = await scrapeBehance(type, limit);
    if (live.length > 0) return live;
  } catch (_) {}

  const normalized = type.toLowerCase();
  let pool = BEHANCE_CURATED.filter(
    (s) =>
      s.type === normalized ||
      s.style_tags.some((t) => t.includes(normalized) || normalized.includes(t))
  );
  if (pool.length === 0) pool = BEHANCE_CURATED;

  return pool.slice(0, limit).map((s) => ({
    ...s,
    source: "behance_curated",
    fetched_at: new Date().toISOString(),
  }));
}

async function scrapeCSSDA(limit) {
  const { data } = await axios.get("https://www.cssdesignawards.com/sites", {
    timeout: 7000,
    headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" },
  });
  const $ = cheerio.load(data);
  const results = [];
  $(".site-item").each((i, el) => {
    if (i >= limit) return false;
    const name = $(el).find(".site-name").text().trim();
    if (name) results.push({ name, source: "cssda_live" });
  });
  return results;
}

async function scrapeBehance(type, limit) {
  const { data } = await axios.get(
    `https://www.behance.net/search/projects?field=${encodeURIComponent(type)}`,
    {
      timeout: 7000,
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" },
    }
  );
  const $ = cheerio.load(data);
  const results = [];
  $(".ProjectCoverNeue-info").each((i, el) => {
    if (i >= limit) return false;
    const name = $(el).find(".ProjectCoverNeue-title").text().trim();
    if (name) results.push({ name, source: "behance_live" });
  });
  return results;
}
