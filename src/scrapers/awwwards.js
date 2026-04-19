import axios from "axios";
import * as cheerio from "cheerio";

// ─── Curated Fallback Data ────────────────────────────────────────────────────
// High-quality curated sites when scraping is blocked or rate-limited.
// Regularly updated manually to stay fresh.

const CURATED_SITES = {
  all: [
    {
      name: "Linear",
      url: "https://linear.app",
      category: "saas",
      award: "sotm",
      description: "Issue tracking tool with a brutally minimal dark UI. Exemplary use of keyboard shortcuts, smooth transitions, and a monochromatic palette that feels premium.",
      design_notes: "Near-black backgrounds (#0F0F11), crisp white text, subtle purple accents. Micro-animations on every interaction. No decorative imagery — pure functional elegance.",
      tech_tags: ["dark-mode", "minimal", "saas", "animation"],
      color_hints: ["#0F0F11", "#FFFFFF", "#5E6AD2"],
      layout: "full-width hero with centered CTA, feature grid below",
    },
    {
      name: "Stripe",
      url: "https://stripe.com",
      category: "corporate",
      award: "sotd",
      description: "The gold standard for developer-focused landing pages. Abstract 3D gradient backgrounds, clean API code samples, incredible scroll storytelling.",
      design_notes: "Indigo/violet gradient meshes on white. Code blocks as design elements. Each section has its own distinct visual identity while staying cohesive.",
      tech_tags: ["gradient", "3d", "corporate", "scroll-animation"],
      color_hints: ["#635BFF", "#0A2540", "#FFFFFF"],
      layout: "alternating content-image sections, sticky nav",
    },
    {
      name: "Vercel",
      url: "https://vercel.com",
      category: "saas",
      award: "sotm",
      description: "Dark-mode first deployment platform. Elegant use of blurred glow effects on dark backgrounds. Monospaced code aesthetics mixed with sleek marketing copy.",
      design_notes: "Pure black (#000) background with white text and subtle grey (#111) card surfaces. Cyan/green accent glow effects for interactive elements.",
      tech_tags: ["dark-mode", "glow", "minimal", "developer"],
      color_hints: ["#000000", "#FFFFFF", "#00FFFF"],
      layout: "hero terminal animation, bento feature grid",
    },
    {
      name: "Resend",
      url: "https://resend.com",
      category: "saas",
      award: "honorable",
      description: "Email API for developers. Stunning dark minimal UI with pixel-perfect typography and excellent use of animated code blocks.",
      design_notes: "Dark bg (#08090A), ivory text, neon green accents for code. Monospace type for API samples creates trust. Generous whitespace.",
      tech_tags: ["dark-mode", "developer", "typography", "minimal"],
      color_hints: ["#08090A", "#F5F0E8", "#48BB78"],
      layout: "centered hero, code demo section, social proof strip",
    },
    {
      name: "Lusion",
      url: "https://lusion.co",
      category: "agency",
      award: "sotd",
      description: "Creative agency with a full 3D interactive experience. WebGL particles, mouse-tracking distortions, and cinematic typography.",
      design_notes: "Full-bleed dark canvas, white text with kinetic typography. Everything reacts to mouse. One of the best examples of WebGL + branding integration.",
      tech_tags: ["webgl", "3d", "experimental", "agency", "mouse-tracking"],
      color_hints: ["#0A0A0A", "#FFFFFF", "#FF4D00"],
      layout: "fullscreen immersive, no traditional nav",
    },
    {
      name: "Framer",
      url: "https://framer.com",
      category: "saas",
      award: "sotm",
      description: "Website builder for designers. Vibrant pink/purple gradients, interactive component showcases, and ultra-smooth page transitions.",
      design_notes: "Hot pink (#FF0099) as primary accent on white. Product demos embedded as live interactive examples. Bold display font (Neue Montreal).",
      tech_tags: ["gradient", "interactive", "saas", "bold-color"],
      color_hints: ["#FF0099", "#7000FF", "#FFFFFF"],
      layout: "feature showcase with embedded demos, pricing table",
    },
    {
      name: "Raycast",
      url: "https://raycast.com",
      category: "saas",
      award: "sotd",
      description: "macOS launcher app with a playful yet polished website. Floating macOS window screenshots, smooth parallax, dark gradient backgrounds.",
      design_notes: "Deep purple-black gradient bg, glowing product screenshots, confetti-like extension icons. Feels both fun and powerful.",
      tech_tags: ["dark-mode", "gradient", "parallax", "macos"],
      color_hints: ["#1A0A2E", "#FF6363", "#FF9F43"],
      layout: "hero app mockup, horizontal scroll features",
    },
    {
      name: "Pitch",
      url: "https://pitch.com",
      category: "saas",
      award: "honorable",
      description: "Presentation software with colorful, energetic marketing site. Gradient backgrounds shift per section. Strong emphasis on collaboration features.",
      design_notes: "Each scroll section has a different bold color theme (coral, teal, purple). Smooth cross-section transitions. Generous motion.",
      tech_tags: ["colorful", "scroll-animation", "saas", "gradient"],
      color_hints: ["#FF6B35", "#00D2AA", "#7C3AED"],
      layout: "vertical storytelling with section-based color shifts",
    },
  ],
  portfolio: [
    {
      name: "Bruno Simon",
      url: "https://bruno-simon.com",
      category: "portfolio",
      award: "sotd",
      description: "The most famous portfolio on the internet. Fully interactive 3D car game built in Three.js. Drive around to navigate the portfolio.",
      design_notes: "Low-poly 3D world, pastel colors, physics simulation. Unconventional navigation via driving makes it unforgettable.",
      tech_tags: ["webgl", "threejs", "3d", "game", "experimental"],
      color_hints: ["#78C5D7", "#459BA8", "#EFF0F0"],
      layout: "fullscreen 3D world, no traditional layout",
    },
    {
      name: "Niccolo Miranda",
      url: "https://niccolomirandaa.com",
      category: "portfolio",
      award: "honorable",
      description: "Designer portfolio with exquisite typographic composition. Oversized letters, editorial grid, smooth cursor effects.",
      design_notes: "Cream background, black text, single bold red accent. Oversized 'N' as hero element. Hover reveals on project thumbnails.",
      tech_tags: ["editorial", "typography", "minimal", "cursor-effects"],
      color_hints: ["#F5F0EB", "#0D0D0D", "#FF2D20"],
      layout: "editorial grid with oversized type",
    },
  ],
  ecommerce: [
    {
      name: "Allbirds",
      url: "https://allbirds.com",
      category: "ecommerce",
      award: "sotd",
      description: "Sustainable shoe brand with a clean, earthy e-commerce experience. Natural material textures, muted color palette, strong sustainability messaging.",
      design_notes: "Off-white backgrounds, terracotta and sage accents. Product photography on plain backgrounds. Clean sans-serif with generous whitespace.",
      tech_tags: ["ecommerce", "natural", "minimal", "sustainability"],
      color_hints: ["#F5F0E8", "#8B6F47", "#5C7A5C"],
      layout: "product grid with filter sidebar, editorial campaign sections",
    },
  ],
  experimental: [
    {
      name: "Active Theory",
      url: "https://activetheory.net",
      category: "experimental",
      award: "sotd",
      description: "Interactive experience studio. WebGL distortion effects, particle systems, and cinematic transitions define their brand.",
      design_notes: "Dark agency aesthetic with explosive interactive moments. Click and drag distorts the entire scene. Sound design integration.",
      tech_tags: ["webgl", "experimental", "agency", "sound", "interaction"],
      color_hints: ["#000000", "#FFFFFF", "#FF3D00"],
      layout: "immersive fullscreen, gesture-driven navigation",
    },
    {
      name: "Locomotive",
      url: "https://locomotive.ca",
      category: "experimental",
      award: "sotm",
      description: "Web agency known for smooth scroll experiences (they built the Locomotive Scroll library). Case study showcase with cinema-quality transitions.",
      design_notes: "Smooth parallax everything. Dark bg with bold white type. Project showcases use full-bleed video covers.",
      tech_tags: ["smooth-scroll", "parallax", "agency", "video"],
      color_hints: ["#111111", "#EEEEEE", "#FF4500"],
      layout: "full-bleed project grid with smooth scroll",
    },
  ],
  agency: [
    {
      name: "AKQA",
      url: "https://akqa.com",
      category: "agency",
      award: "honorable",
      description: "Global creative agency with a clean, editorial website. Large case study imagery, restrained typography, confident use of whitespace.",
      design_notes: "White dominant with black text. Single brand color used minimally. Large-format project photography does the talking.",
      tech_tags: ["editorial", "agency", "minimal", "whitespace"],
      color_hints: ["#FFFFFF", "#000000", "#0066FF"],
      layout: "full-width case study scroll, simple nav",
    },
  ],
};

// ─── Category Aliases ─────────────────────────────────────────────────────────

const CATEGORY_ALIASES = {
  landing: "all",
  blog: "all",
  motion: "experimental",
  typography: "portfolio",
  corporate: "all",
};

// ─── Main Scraper ─────────────────────────────────────────────────────────────

export async function browseAwwwards(
  category = "all",
  limit = 6,
  awardFilter = "any"
) {
  // Try live scraping first
  try {
    const liveResults = await scrapeAwwwards(category, limit);
    if (liveResults.length > 0) return liveResults;
  } catch (_) {
    // Fall through to curated data
  }

  // Use curated fallback data
  const resolvedCategory = CATEGORY_ALIASES[category] || category;
  let pool = [
    ...(CURATED_SITES[resolvedCategory] || []),
    ...(resolvedCategory !== "all" ? CURATED_SITES["all"] : []),
  ];

  // Remove duplicates
  const seen = new Set();
  pool = pool.filter((s) => {
    if (seen.has(s.url)) return false;
    seen.add(s.url);
    return true;
  });

  // Award filter
  if (awardFilter !== "any") {
    pool = pool.filter((s) => s.award === awardFilter);
  }

  return pool.slice(0, limit).map((site) => ({
    ...site,
    source: "awwwards_curated",
    fetched_at: new Date().toISOString(),
  }));
}

async function scrapeAwwwards(category, limit) {
  const categoryMap = {
    all: "",
    portfolio: "portfolio",
    agency: "agency",
    ecommerce: "ecommerce",
    experimental: "experimental",
    motion: "motion",
  };

  const slug = categoryMap[category] || "";
  const url = `https://www.awwwards.com/websites/${slug ? `?category=${slug}` : ""}`;

  const { data } = await axios.get(url, {
    timeout: 8000,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
    },
  });

  const $ = cheerio.load(data);
  const results = [];

  $("figure.js-item").each((i, el) => {
    if (i >= limit) return false;
    const $el = $(el);
    const name = $el.find(".title").text().trim();
    const description = $el.find(".description").text().trim();
    const tags = $el
      .find(".tags .tag")
      .map((_, t) => $(t).text().trim())
      .get();

    if (name) {
      results.push({
        name,
        description: description || "Award-winning website on Awwwards",
        tech_tags: tags,
        category,
        source: "awwwards_live",
        fetched_at: new Date().toISOString(),
      });
    }
  });

  return results;
}
