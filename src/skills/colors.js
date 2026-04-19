const ALL_PALETTES = [
  {
    name: "Obsidian Noir",
    mood: "dark luxury",
    colors: [
      { name: "Background", hex: "#0A0A0A", role: "bg-primary" },
      { name: "Surface", hex: "#111111", role: "bg-secondary" },
      { name: "Border", hex: "#1A1A1A", role: "border" },
      { name: "Text", hex: "#F5F0E8", role: "text-primary" },
      { name: "Muted", hex: "#888888", role: "text-secondary" },
      { name: "Gold Accent", hex: "#C9A84C", role: "accent" },
    ],
    css_vars: `--bg: #0A0A0A; --surface: #111; --border: #1A1A1A; --text: #F5F0E8; --muted: #888; --accent: #C9A84C;`,
    mood_tags: ["dark luxury", "premium", "exclusive"],
    use_cases: "High-end brands, premium SaaS, agency sites",
  },
  {
    name: "Midnight Indigo",
    mood: "dark luxury",
    colors: [
      { name: "Background", hex: "#0F0F1A", role: "bg-primary" },
      { name: "Surface", hex: "#1A1A2E", role: "bg-secondary" },
      { name: "Deep Blue", hex: "#16213E", role: "border" },
      { name: "Text", hex: "#EAEAF5", role: "text-primary" },
      { name: "Muted", hex: "#9090AA", role: "text-secondary" },
      { name: "Violet Accent", hex: "#7C6FFF", role: "accent" },
    ],
    css_vars: `--bg: #0F0F1A; --surface: #1A1A2E; --border: #16213E; --text: #EAEAF5; --muted: #9090AA; --accent: #7C6FFF;`,
    mood_tags: ["dark luxury", "tech premium", "dark mode"],
    use_cases: "Developer tools, SaaS platforms, fintech",
  },
  {
    name: "Neon Tokyo",
    mood: "neon cyberpunk",
    colors: [
      { name: "Background", hex: "#020012", role: "bg-primary" },
      { name: "Surface", hex: "#0D0025", role: "bg-secondary" },
      { name: "Cyan", hex: "#00F5FF", role: "accent-primary" },
      { name: "Magenta", hex: "#FF0080", role: "accent-secondary" },
      { name: "Text", hex: "#FFFFFF", role: "text-primary" },
      { name: "Grid", hex: "rgba(0,245,255,0.1)", role: "border" },
    ],
    css_vars: `--bg: #020012; --surface: #0D0025; --cyan: #00F5FF; --pink: #FF0080; --text: #FFF;`,
    mood_tags: ["neon cyberpunk", "tech", "futuristic", "gaming"],
    use_cases: "Gaming, crypto, edgy tech brands, experimental",
  },
  {
    name: "Grid Protocol",
    mood: "neon cyberpunk",
    colors: [
      { name: "Background", hex: "#000000", role: "bg-primary" },
      { name: "Green Neon", hex: "#00FF41", role: "accent" },
      { name: "Grid Lines", hex: "rgba(0,255,65,0.15)", role: "border" },
      { name: "Text", hex: "#00FF41", role: "text-primary" },
      { name: "Dim Text", hex: "rgba(0,255,65,0.5)", role: "text-secondary" },
    ],
    css_vars: `--bg: #000; --accent: #00FF41; --text: #00FF41; --muted: rgba(0,255,65,0.5);`,
    mood_tags: ["neon cyberpunk", "terminal", "hacker", "developer"],
    use_cases: "Hacker tools, terminal UIs, developer portfolios",
  },
  {
    name: "Cherry Blossom",
    mood: "soft pastel",
    colors: [
      { name: "Background", hex: "#FFF5F7", role: "bg-primary" },
      { name: "Surface", hex: "#FFF0F3", role: "bg-secondary" },
      { name: "Pink", hex: "#FFB7C5", role: "accent-light" },
      { name: "Rose", hex: "#E87DAD", role: "accent" },
      { name: "Text", hex: "#2D1B25", role: "text-primary" },
      { name: "Muted", hex: "#9E7A8A", role: "text-secondary" },
    ],
    css_vars: `--bg: #FFF5F7; --surface: #FFF0F3; --accent: #E87DAD; --text: #2D1B25; --muted: #9E7A8A;`,
    mood_tags: ["soft pastel", "feminine", "gentle", "wellness"],
    use_cases: "Beauty brands, wellness apps, feminine products",
  },
  {
    name: "Morning Sky",
    mood: "soft pastel",
    colors: [
      { name: "Background", hex: "#F0F8FF", role: "bg-primary" },
      { name: "Surface", hex: "#E8F4FF", role: "bg-secondary" },
      { name: "Sky Blue", hex: "#AED6F1", role: "accent-light" },
      { name: "Cornflower", hex: "#5DADE2", role: "accent" },
      { name: "Text", hex: "#1A2F45", role: "text-primary" },
      { name: "Lavender", hex: "#CDB4DB", role: "accent-secondary" },
    ],
    css_vars: `--bg: #F0F8FF; --surface: #E8F4FF; --accent: #5DADE2; --lavender: #CDB4DB; --text: #1A2F45;`,
    mood_tags: ["soft pastel", "calm", "airy", "minimal"],
    use_cases: "Mental health apps, productivity tools, children's products",
  },
  {
    name: "Moss & Stone",
    mood: "earthy organic",
    colors: [
      { name: "Background", hex: "#F5F0E8", role: "bg-primary" },
      { name: "Warm White", hex: "#FAF7F2", role: "bg-secondary" },
      { name: "Moss", hex: "#5C7A5C", role: "accent" },
      { name: "Stone", hex: "#8B7355", role: "accent-warm" },
      { name: "Text", hex: "#2C2416", role: "text-primary" },
      { name: "Muted", hex: "#7A6E60", role: "text-secondary" },
    ],
    css_vars: `--bg: #F5F0E8; --surface: #FAF7F2; --moss: #5C7A5C; --stone: #8B7355; --text: #2C2416;`,
    mood_tags: ["earthy organic", "natural", "sustainable", "warm"],
    use_cases: "Sustainability brands, organic food, wellness, outdoor",
  },
  {
    name: "Trust Blueprint",
    mood: "corporate trust",
    colors: [
      { name: "Background", hex: "#FFFFFF", role: "bg-primary" },
      { name: "Surface", hex: "#F8FAFC", role: "bg-secondary" },
      { name: "Navy", hex: "#1E3A5F", role: "accent" },
      { name: "Blue", hex: "#2563EB", role: "accent-bright" },
      { name: "Text", hex: "#0F172A", role: "text-primary" },
      { name: "Muted", hex: "#64748B", role: "text-secondary" },
    ],
    css_vars: `--bg: #FFF; --surface: #F8FAFC; --navy: #1E3A5F; --blue: #2563EB; --text: #0F172A; --muted: #64748B;`,
    mood_tags: ["corporate trust", "professional", "reliable", "finance"],
    use_cases: "Enterprise SaaS, banking, legal, consulting, healthcare",
  },
  {
    name: "Launch Velocity",
    mood: "startup energy",
    colors: [
      { name: "Background", hex: "#FAFAFA", role: "bg-primary" },
      { name: "Surface", hex: "#F4F4F5", role: "bg-secondary" },
      { name: "Orange", hex: "#FF6B35", role: "accent" },
      { name: "Yellow", hex: "#FFE135", role: "accent-secondary" },
      { name: "Text", hex: "#09090B", role: "text-primary" },
      { name: "Muted", hex: "#71717A", role: "text-secondary" },
    ],
    css_vars: `--bg: #FAFAFA; --surface: #F4F4F5; --orange: #FF6B35; --yellow: #FFE135; --text: #09090B; --muted: #71717A;`,
    mood_tags: ["startup energy", "bold", "optimistic", "action"],
    use_cases: "Startup landing pages, product launches, growth tools",
  },
  {
    name: "Synthwave 84",
    mood: "retro 80s",
    colors: [
      { name: "Background", hex: "#1A0030", role: "bg-primary" },
      { name: "Surface", hex: "#250050", role: "bg-secondary" },
      { name: "Hot Pink", hex: "#FF2D78", role: "accent" },
      { name: "Electric Blue", hex: "#00CFFF", role: "accent-secondary" },
      { name: "Gold", hex: "#FFD700", role: "accent-tertiary" },
      { name: "Text", hex: "#FFFFFF", role: "text-primary" },
    ],
    css_vars: `--bg: #1A0030; --surface: #250050; --pink: #FF2D78; --blue: #00CFFF; --gold: #FFD700; --text: #FFF;`,
    mood_tags: ["retro 80s", "synthwave", "nostalgic", "gaming"],
    use_cases: "Gaming, music, retro-themed products, nostalgia brands",
  },
  {
    name: "Obsidian Mono",
    mood: "monochrome",
    colors: [
      { name: "Background", hex: "#0A0A0A", role: "bg-primary" },
      { name: "Surface", hex: "#141414", role: "bg-secondary" },
      { name: "Card", hex: "#1E1E1E", role: "surface" },
      { name: "Border", hex: "#2A2A2A", role: "border" },
      { name: "Text", hex: "#FFFFFF", role: "text-primary" },
      { name: "Muted", hex: "#666666", role: "text-secondary" },
    ],
    css_vars: `--bg: #0A0A0A; --surface-1: #141414; --surface-2: #1E1E1E; --border: #2A2A2A; --text: #FFF; --muted: #666;`,
    mood_tags: ["monochrome", "minimal", "dark", "editorial"],
    use_cases: "Photography portfolios, editorial sites, typography-focused designs",
  },
];

export function getColorPalettes(mood = "dark luxury", count = 3) {
  const normalized = mood.toLowerCase();
  
  // Exact match first
  let matches = ALL_PALETTES.filter((p) =>
    p.mood_tags.some((t) => t === normalized)
  );

  // Partial match fallback
  if (matches.length === 0) {
    matches = ALL_PALETTES.filter((p) =>
      p.mood_tags.some((t) => t.includes(normalized) || normalized.includes(t))
    );
  }

  // General fallback
  if (matches.length === 0) {
    matches = ALL_PALETTES;
  }

  return matches.slice(0, count);
}
