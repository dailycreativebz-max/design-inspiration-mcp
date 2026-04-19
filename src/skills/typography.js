const ALL_PAIRINGS = [
  {
    name: "Editorial Power",
    style: "editorial",
    display_font: { name: "Playfair Display", weights: "400,700,900", type: "serif" },
    body_font: { name: "Source Serif 4", weights: "300,400,600", type: "serif" },
    google_import: "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Source+Serif+4:wght@300;400;600&display=swap');",
    css_usage: `h1, h2 { font-family: 'Playfair Display', serif; font-weight: 700; letter-spacing: -0.02em; }
body { font-family: 'Source Serif 4', serif; font-weight: 400; line-height: 1.7; }`,
    character: "Timeless editorial feel. Great for magazines, luxury brands, long-form content.",
    style_tags: ["editorial", "luxury", "classic", "serif"],
  },
  {
    name: "Modern Geometric",
    style: "modern tech",
    display_font: { name: "DM Sans", weights: "400;500;700", type: "sans-serif" },
    body_font: { name: "DM Sans", weights: "300;400", type: "sans-serif" },
    google_import: "@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&display=swap');",
    css_usage: `h1 { font-family: 'DM Sans', sans-serif; font-weight: 700; letter-spacing: -0.04em; }
body { font-family: 'DM Sans', sans-serif; font-weight: 400; line-height: 1.6; }`,
    character: "Clean, geometric, modern. The font of choice for serious SaaS and developer tools.",
    style_tags: ["modern tech", "saas", "developer", "clean"],
  },
  {
    name: "Dark Luxury",
    style: "luxury brand",
    display_font: { name: "Cormorant Garamond", weights: "300;400;600", type: "serif" },
    body_font: { name: "Jost", weights: "300;400;500", type: "sans-serif" },
    google_import: "@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Jost:wght@300;400;500&display=swap');",
    css_usage: `h1, h2 { font-family: 'Cormorant Garamond', serif; font-weight: 300; letter-spacing: 0.08em; text-transform: uppercase; }
body { font-family: 'Jost', sans-serif; font-weight: 300; letter-spacing: 0.02em; }`,
    character: "Ultra-refined luxury. Thin serif display with geometric sans body. Think fashion houses.",
    style_tags: ["luxury brand", "fashion", "editorial", "premium"],
  },
  {
    name: "Playful Rounded",
    style: "playful",
    display_font: { name: "Nunito", weights: "700;900", type: "sans-serif" },
    body_font: { name: "Nunito", weights: "400;500", type: "sans-serif" },
    google_import: "@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700;900&display=swap');",
    css_usage: `h1, h2 { font-family: 'Nunito', sans-serif; font-weight: 900; letter-spacing: -0.02em; }
body { font-family: 'Nunito', sans-serif; font-weight: 400; line-height: 1.7; }`,
    character: "Friendly, approachable, and fun. Great for consumer apps, children's products.",
    style_tags: ["playful", "rounded", "friendly", "consumer"],
  },
  {
    name: "Raw Brutalist",
    style: "brutalist",
    display_font: { name: "Space Mono", weights: "400;700", type: "monospace" },
    body_font: { name: "Space Mono", weights: "400", type: "monospace" },
    google_import: "@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');",
    css_usage: `h1 { font-family: 'Space Mono', monospace; font-weight: 700; text-transform: uppercase; letter-spacing: -0.02em; }
body { font-family: 'Space Mono', monospace; font-weight: 400; line-height: 1.8; font-size: 0.9rem; }`,
    character: "Raw, technical, uncompromising. For sites that want to feel anti-design or ultra-technical.",
    style_tags: ["brutalist", "monospace", "raw", "developer"],
  },
  {
    name: "Academic Gravitas",
    style: "academic",
    display_font: { name: "Libre Baskerville", weights: "400;700", type: "serif" },
    body_font: { name: "Libre Franklin", weights: "300;400;500", type: "sans-serif" },
    google_import: "@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Libre+Franklin:wght@300;400;500&display=swap');",
    css_usage: `h1, h2 { font-family: 'Libre Baskerville', serif; font-weight: 700; }
body { font-family: 'Libre Franklin', sans-serif; font-weight: 400; line-height: 1.75; }`,
    character: "Trustworthy and scholarly. Perfect for research platforms, publishing, education.",
    style_tags: ["academic", "education", "research", "editorial"],
  },
  {
    name: "Startup Bold",
    style: "startup",
    display_font: { name: "Syne", weights: "700;800", type: "sans-serif" },
    body_font: { name: "Manrope", weights: "400;500;600", type: "sans-serif" },
    google_import: "@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@400;500;600&display=swap');",
    css_usage: `h1, h2 { font-family: 'Syne', sans-serif; font-weight: 800; letter-spacing: -0.03em; }
body { font-family: 'Manrope', sans-serif; font-weight: 400; line-height: 1.65; }`,
    character: "Contemporary and bold. Syne has geometric character; Manrope is highly legible.",
    style_tags: ["startup", "bold", "modern", "growth"],
  },
  {
    name: "Retro Grotesque",
    style: "vintage",
    display_font: { name: "Cabinet Grotesk", weights: "700;800;900", type: "sans-serif" },
    body_font: { name: "Satoshi", weights: "400;500", type: "sans-serif" },
    google_import: `/* Cabinet Grotesk & Satoshi via Fontshare: */
@import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800,900&f[]=satoshi@400,500&display=swap');`,
    css_usage: `h1 { font-family: 'Cabinet Grotesk', sans-serif; font-weight: 900; letter-spacing: -0.05em; }
body { font-family: 'Satoshi', sans-serif; font-weight: 400; }`,
    character: "Retro grotesque revival. Cabinet Grotesk has a distinct ink-trap personality.",
    style_tags: ["vintage", "retro", "editorial", "bold"],
  },
  {
    name: "Minimal Statement",
    style: "minimal",
    display_font: { name: "Instrument Serif", weights: "400", type: "serif" },
    body_font: { name: "Instrument Sans", weights: "400;500", type: "sans-serif" },
    google_import: "@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Instrument+Sans:wght@400;500&display=swap');",
    css_usage: `h1, h2 { font-family: 'Instrument Serif', serif; font-weight: 400; font-size: clamp(3rem, 8vw, 8rem); }
body { font-family: 'Instrument Sans', sans-serif; font-weight: 400; }`,
    character: "Refined contrast between delicate serif display and clean sans body. Feels very considered.",
    style_tags: ["minimal", "refined", "elegant", "premium"],
  },
  {
    name: "Bold Impact",
    style: "bold impact",
    display_font: { name: "Bebas Neue", weights: "400", type: "display" },
    body_font: { name: "Barlow", weights: "400;500;600", type: "sans-serif" },
    google_import: "@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600&display=swap');",
    css_usage: `h1, h2 { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; text-transform: uppercase; font-size: clamp(4rem, 12vw, 14rem); }
body { font-family: 'Barlow', sans-serif; font-weight: 400; }`,
    character: "Maximum visual impact. Condensed all-caps display for sports, gaming, events.",
    style_tags: ["bold impact", "sports", "gaming", "events", "condensed"],
  },
];

export function getTypographyPairings(style = "modern tech", count = 3) {
  const normalized = style.toLowerCase();

  let matches = ALL_PAIRINGS.filter((p) =>
    p.style_tags.some((t) => t === normalized)
  );

  if (matches.length === 0) {
    matches = ALL_PAIRINGS.filter(
      (p) =>
        p.style_tags.some((t) => t.includes(normalized) || normalized.includes(t)) ||
        p.style === normalized
    );
  }

  if (matches.length === 0) {
    matches = ALL_PAIRINGS;
  }

  return matches.slice(0, count);
}
