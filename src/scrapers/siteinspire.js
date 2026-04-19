import axios from "axios";
import * as cheerio from "cheerio";

const CURATED = [
  {
    name: "Teenage Engineering",
    url: "https://teenage.engineering",
    category: "product",
    style_tags: ["brutalist", "industrial", "product", "dark"],
    description:
      "Hardware synth company with a deeply opinionated industrial aesthetic. Monospace type, dark grey surfaces, clinical product photography. Every pixel feels machined.",
    design_notes:
      "Almost no colour except product accent colours. Heavy use of monospace fonts. Navigation feels like a terminal. The design IS the brand.",
    color_hints: ["#1A1A1A", "#E8E8E8", "#FF5500"],
    layout: "grid of products, very tight spacing, technical feel",
  },
  {
    name: "SiteInspire",
    url: "https://siteinspire.com",
    category: "gallery",
    style_tags: ["minimal", "editorial", "clean"],
    description:
      "Web design gallery. Ultra-clean white interface, simple grid, zero decoration. Lets the showcased work breathe.",
    design_notes:
      "Pure white, serif body font, minimal UI chrome. A lesson in restraint — the site disappears so the content shines.",
    color_hints: ["#FFFFFF", "#000000", "#888888"],
    layout: "masonry image grid, sidebar filter",
  },
  {
    name: "Monotype",
    url: "https://www.monotype.com",
    category: "typography",
    style_tags: ["editorial", "typography", "serif", "premium"],
    description:
      "Type foundry with an editorial powerhouse of a website. Every page is a masterclass in typographic hierarchy.",
    design_notes:
      "Massive display serifs, careful leading and tracking on all text. Colours feel ink-printed. Shows that typography alone can make a stunning layout.",
    color_hints: ["#F5F0E8", "#1A1A1A", "#FF3300"],
    layout: "editorial grid, full-bleed type specimens",
  },
  {
    name: "Nomadic Tribe",
    url: "https://nomadictr.ibe",
    category: "agency",
    style_tags: ["experimental", "cursor", "dark", "agency"],
    description:
      "Creative studio. Custom cursor, full-bleed video, parallax text reveals. One of the most polished small agency sites.",
    design_notes:
      "Dark bg, bold white condensed type, custom cursor that reacts to content zones. The cursor IS part of the navigation.",
    color_hints: ["#0A0A0A", "#F0F0F0", "#FF2200"],
    layout: "fullscreen sections, scroll-snap",
  },
  {
    name: "Phantom",
    url: "https://phantom.app",
    category: "saas",
    style_tags: ["dark", "gradient", "crypto", "premium"],
    description:
      "Solana wallet app. Stunning dark gradient site with floating UI mockups and purple glow effects. Best-in-class for crypto UI.",
    design_notes:
      "Deep purple/black gradients, product mockup floats above fold, white text. Glow halos around UI elements create depth without 3D.",
    color_hints: ["#1A0A2E", "#4B2ABE", "#FFFFFF"],
    layout: "hero with floating mockup, alternating feature sections",
  },
  {
    name: "Basement Studio",
    url: "https://basement.studio",
    category: "agency",
    style_tags: ["experimental", "dark", "interactive", "agency"],
    description:
      "Creative dev studio. Fluid typography, scanline effects, and radical dark aesthetic. Feels like a CRT monitor from the future.",
    design_notes:
      "Scanline CSS overlay on dark bg. Type that responds to scroll. A perfect example of using CSS filters as aesthetic, not decoration.",
    color_hints: ["#000000", "#00FF00", "#111111"],
    layout: "scrolljacking, full-bleed type",
  },
  {
    name: "Craft CMS",
    url: "https://craftcms.com",
    category: "saas",
    style_tags: ["clean", "professional", "light", "saas"],
    description:
      "CMS platform. Very clean, professional light UI. Excellent information hierarchy. A model for clear SaaS communication.",
    design_notes:
      "Off-white backgrounds, thoughtful card shadows, teal accent. Every page has a clear focal CTA. Good example of restraint working perfectly.",
    color_hints: ["#FAFAFA", "#2D3047", "#E84855"],
    layout: "split hero, feature grid, testimonials",
  },
  {
    name: "Covalent",
    url: "https://www.covalenthq.com",
    category: "saas",
    style_tags: ["dark", "tech", "gradient", "data"],
    description:
      "Blockchain data API. Dark technical aesthetic with data visualisation as hero element. The data is the design.",
    design_notes:
      "Dark bg with animated network graph hero. Pink/purple accent palette. Shows how technical products can be visually exciting.",
    color_hints: ["#0D0D1A", "#FF4ECD", "#7B68EE"],
    layout: "animated data hero, documentation-style features",
  },
];

const CATEGORIES = {
  portfolio: ["portfolio", "experimental", "agency"],
  agency: ["agency", "experimental"],
  saas: ["saas", "tech", "data"],
  editorial: ["editorial", "typography", "serif"],
  experimental: ["experimental", "cursor", "interactive"],
};

export async function browseSiteInspire(style = "minimal", limit = 5) {
  try {
    const live = await scrapeSiteInspire(style, limit);
    if (live.length > 0) return live;
  } catch (_) {}

  // Curated fallback — match by style tag
  const normalized = style.toLowerCase();
  let pool = CURATED.filter(
    (s) =>
      s.style_tags.some(
        (t) => t.includes(normalized) || normalized.includes(t)
      ) ||
      s.category === normalized
  );

  if (pool.length === 0) pool = CURATED;

  return pool.slice(0, limit).map((s) => ({
    ...s,
    source: "siteinspire_curated",
    fetched_at: new Date().toISOString(),
  }));
}

async function scrapeSiteInspire(style, limit) {
  const { data } = await axios.get(
    `https://www.siteinspire.com/websites?categories=${encodeURIComponent(style)}`,
    {
      timeout: 7000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      },
    }
  );
  const $ = cheerio.load(data);
  const results = [];
  $(".site").each((i, el) => {
    if (i >= limit) return false;
    const name = $(el).find(".site-title").text().trim();
    if (name) results.push({ name, source: "siteinspire_live" });
  });
  return results;
}
