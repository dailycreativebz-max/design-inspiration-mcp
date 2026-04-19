import axios from "axios";
import * as cheerio from "cheerio";

const CURATED_SHOTS = {
  "landing page": [
    {
      title: "SaaS Platform Hero Section",
      designer: "Michal Malewicz",
      colors: ["#0A0A0F", "#6C63FF", "#FFFFFF", "#1A1A2E"],
      style_notes: "Dark gradient hero with floating UI mockup. Glowing CTA button. Subtle grid pattern overlay.",
      techniques: ["gradient-mesh", "ui-mockup-float", "glow-cta"],
      tags: ["saas", "dark", "hero", "landing"],
    },
    {
      title: "Startup Landing - Bold Color",
      designer: "Cuberto",
      colors: ["#FF3CAC", "#784BA0", "#2B86C5", "#FFFFFF"],
      style_notes: "Vibrant diagonal gradient across the full hero. Bold sans-serif headline. Minimal nav, single CTA.",
      techniques: ["diagonal-gradient", "bold-typography", "minimal-nav"],
      tags: ["startup", "colorful", "gradient", "minimal"],
    },
    {
      title: "Developer Tool Landing",
      designer: "Rauno Freiberg",
      colors: ["#000000", "#FFFFFF", "#00FF88", "#111111"],
      style_notes: "Terminal aesthetic. Monospace font hero. Green cursor blink animation. Code block as hero visual.",
      techniques: ["terminal-ui", "monospace", "cursor-blink", "code-hero"],
      tags: ["developer", "dark", "minimal", "tech"],
    },
  ],
  dashboard: [
    {
      title: "Analytics Dashboard Dark",
      designer: "UI8",
      colors: ["#0F172A", "#1E293B", "#38BDF8", "#818CF8"],
      style_notes: "Slate dark theme with Tailwind-inspired palette. Clean data cards with subtle borders. Line charts in cyan.",
      techniques: ["dark-card-grid", "subtle-borders", "data-visualization"],
      tags: ["analytics", "dark", "data", "admin"],
    },
    {
      title: "Finance Dashboard — Neumorphic",
      designer: "Purrweb UI",
      colors: ["#E0E5EC", "#CACFE8", "#4D7CFE", "#FFFFFF"],
      style_notes: "Soft light grey background with raised/inset neumorphic cards. Pastel accent for positive/negative trends.",
      techniques: ["neumorphism", "soft-shadows", "raised-cards"],
      tags: ["finance", "neumorphic", "light", "dashboard"],
    },
  ],
  "mobile app": [
    {
      title: "Fitness App — Dark Mode",
      designer: "Ghani Pradita",
      colors: ["#121212", "#1DB954", "#FFFFFF", "#282828"],
      style_notes: "Spotify-inspired fitness tracker. Dark cards with neon green progress indicators. Bold stat numbers.",
      techniques: ["progress-rings", "bold-stats", "dark-cards"],
      tags: ["fitness", "dark", "mobile", "health"],
    },
    {
      title: "Finance App — Glassmorphism",
      designer: "Kevin Luo",
      colors: ["#1A1A2E", "#16213E", "#0F3460", "#E94560"],
      style_notes: "Frosted glass cards over deep blue gradient. Card number masked. Red/coral accent for amounts.",
      techniques: ["glassmorphism", "backdrop-blur", "gradient-bg"],
      tags: ["finance", "glass", "mobile", "card"],
    },
  ],
  branding: [
    {
      title: "Tech Brand Identity System",
      designer: "Sagmeister & Walsh",
      colors: ["#000000", "#FF6B35", "#FFFFFF"],
      style_notes: "Minimal black base with a single bold orange accent. Geometric logo mark. Grid-based collateral.",
      techniques: ["brand-system", "geometric", "minimal-color"],
      tags: ["branding", "identity", "minimal", "tech"],
    },
  ],
  illustration: [
    {
      title: "3D Character Illustration",
      designer: "Dima Goncharuk",
      colors: ["#FFF1E6", "#FF6B6B", "#4ECDC4", "#45B7D1"],
      style_notes: "Warm peach background with bright 3D characters. Candy-like material finish. Soft shadows.",
      techniques: ["3d-render", "candy-material", "soft-shadow"],
      tags: ["illustration", "3d", "character", "colorful"],
    },
  ],
  glassmorphism: [
    {
      title: "Glass UI Dashboard",
      designer: "Filip Legierski",
      colors: ["#667eea", "#764ba2", "rgba(255,255,255,0.15)", "rgba(255,255,255,0.05)"],
      style_notes: "Vibrant purple-blue gradient background. Frosted glass cards with white borders. Blurred backdrop creates depth.",
      techniques: ["glassmorphism", "backdrop-filter: blur(20px)", "border: 1px solid rgba(255,255,255,0.2)"],
      tags: ["glass", "gradient", "ui", "modern"],
    },
  ],
  "dark ui": [
    {
      title: "Dark Premium Interface",
      designer: "Balraj Chana",
      colors: ["#0A0A0A", "#141414", "#1A1A1A", "#F5C518"],
      style_notes: "Near-black layered surfaces creating depth without gradients. Gold accent for premium feel. Tight letter-spacing on all headings.",
      techniques: ["surface-layering", "gold-accent", "tight-tracking"],
      tags: ["dark", "premium", "luxury", "ui"],
    },
  ],
  animation: [
    {
      title: "Micro-interaction Collection",
      designer: "Issara Willenskomer",
      colors: ["#FFFFFF", "#0066FF", "#00CC88"],
      style_notes: "Clean white background showcasing smooth state transitions. Button morph, loader animations, success/error states.",
      techniques: ["state-transitions", "button-morph", "spring-physics"],
      tags: ["animation", "micro-interaction", "ui", "motion"],
    },
  ],
};

export async function browseDribbble(tag = "landing page", limit = 6) {
  // Try live scraping
  try {
    const live = await scrapeDribbble(tag, limit);
    if (live.length > 0) return live;
  } catch (_) {
    // Fall through
  }

  // Curated fallback — find best match
  const keys = Object.keys(CURATED_SHOTS);
  const matchKey =
    keys.find((k) => k === tag) ||
    keys.find((k) => tag.includes(k) || k.includes(tag)) ||
    "landing page";

  const shots = CURATED_SHOTS[matchKey] || CURATED_SHOTS["landing page"];
  return shots.slice(0, limit).map((shot) => ({
    ...shot,
    source: "dribbble_curated",
    fetched_at: new Date().toISOString(),
  }));
}

async function scrapeDribbble(tag, limit) {
  const { data } = await axios.get(
    `https://dribbble.com/shots/popular?tags=${encodeURIComponent(tag)}`,
    {
      timeout: 8000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        Accept: "text/html",
      },
    }
  );

  const $ = cheerio.load(data);
  const results = [];

  $(".shot-thumbnail").each((i, el) => {
    if (i >= limit) return false;
    const title = $(el).find(".shot-title").text().trim();
    const designer = $(el).find(".user-name").text().trim();
    if (title) {
      results.push({
        title,
        designer,
        tags: [tag],
        source: "dribbble_live",
        fetched_at: new Date().toISOString(),
      });
    }
  });

  return results;
}
