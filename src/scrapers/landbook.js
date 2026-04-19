import axios from "axios";
import * as cheerio from "cheerio";

const CURATED = [
  {
    name: "Notion",
    url: "https://notion.so",
    type: "saas",
    style_tags: ["minimal", "clean", "neutral", "saas"],
    headline: "Your wiki, docs, & projects. Together.",
    cta_text: "Get Notion free",
    above_fold: "Centered hero, animated product screenshot, social proof strip below CTA",
    description: "The most copied SaaS landing page pattern. Clean white, neutral greys, the product screenshot IS the hero. No distractions.",
    design_notes: "Uses screenshot animation to show product depth. Social proof (logos) directly below CTA. No hero image — the product is the image. Lesson: if your product looks good, show it.",
    color_hints: ["#FFFFFF", "#F7F6F3", "#37352F"],
    layout_pattern: "centered-hero + product-screenshot + logo-strip + feature-grid",
    conversion_tactics: ["Free tier CTA", "No credit card copy", "Social proof logos", "Animated product demo"],
  },
  {
    name: "Loom",
    url: "https://loom.com",
    type: "saas",
    style_tags: ["dark", "gradient", "saas", "video"],
    headline: "Record your screen. Share instantly.",
    cta_text: "Get Loom for free",
    above_fold: "Dark gradient hero with video demo playing automatically. Purple gradient background.",
    description: "Dark hero with an autoplay product demo video embedded directly. The value prop is demonstrated, not described.",
    design_notes: "Autoplay silent video in the hero is genius for a video tool — shows the product's quality immediately. Dark bg makes the demo pop.",
    color_hints: ["#1A0A2E", "#5B21B6", "#FFFFFF"],
    layout_pattern: "dark-hero + inline-video + feature-split + testimonials",
    conversion_tactics: ["Autoplay demo video", "Free tier", "Use case tabs", "Team pricing anchor"],
  },
  {
    name: "Figma",
    url: "https://figma.com",
    type: "saas",
    style_tags: ["colorful", "bold", "saas", "design-tool"],
    headline: "Figma connects everyone in the design process.",
    cta_text: "Get started for free",
    above_fold: "Bold colourful gradient hero with collaborative cursor animation showing multiple users.",
    description: "Uses animated cursors to show collaboration in real time — the core feature demonstrated, not explained. Bold, energetic colour palette.",
    design_notes: "The cursor animation in the hero is a masterclass: no copy needed, the feature explains itself visually. Colourful gradients signal creativity.",
    color_hints: ["#0ACF83", "#F24E1E", "#FF7262", "#1ABCFE", "#A259FF"],
    layout_pattern: "animated-hero + use-case-toggle + feature-showcase + pricing",
    conversion_tactics: ["Collaborative cursors animation", "Free tier prominent", "Enterprise anchor", "Use case segmentation"],
  },
  {
    name: "Superhuman",
    url: "https://superhuman.com",
    type: "saas",
    style_tags: ["dark", "premium", "exclusive", "saas"],
    headline: "The fastest email experience ever made",
    cta_text: "Get early access",
    above_fold: "Dark minimal hero with a single powerful headline and waitlist CTA. No feature list.",
    description: "Deliberately minimal. The exclusivity IS the product — waitlist model creates demand. Zero feature lists above fold.",
    design_notes: "The scarcity of information on the page mirrors the exclusivity of the product. Dark, premium, confident. One CTA. Works because of PR, not despite missing features.",
    color_hints: ["#0A0A0A", "#FFFFFF", "#FF5C28"],
    layout_pattern: "minimal-dark-hero + waitlist-cta + single-stat + sparse-features",
    conversion_tactics: ["Waitlist / exclusivity", "Single bold stat", "No pricing visible", "Referral mechanism"],
  },
  {
    name: "Arc Browser",
    url: "https://arc.net",
    type: "saas",
    style_tags: ["experimental", "colorful", "playful", "saas"],
    headline: "The browser that does more, so you do less.",
    cta_text: "Download Arc",
    above_fold: "Playful gradient background with floating app screenshots at angles. Feels like a magazine ad.",
    description: "Breaks every SaaS convention. No feature grid, no social proof, no pricing table. Pure brand story through playful visuals.",
    design_notes: "Rotated, angled screenshots create depth and movement. Gradient backgrounds per section. Feels like a consumer app, not enterprise SaaS.",
    color_hints: ["#CC8EF5", "#FE5757", "#FFD23F", "#FFFFFF"],
    layout_pattern: "brand-story + angled-screenshots + scrollytelling",
    conversion_tactics: ["Download direct (no signup)", "Platform exclusivity (Mac/iOS)", "Community/cult-following positioning"],
  },
  {
    name: "Pitch",
    url: "https://pitch.com",
    type: "saas",
    style_tags: ["colorful", "scroll-animation", "saas", "gradient"],
    headline: "The collaborative presentation tool.",
    cta_text: "Get Pitch free",
    above_fold: "Bold gradient hero that transitions colour as you scroll through sections.",
    description: "Each scroll section changes the background gradient colour — coral to teal to purple. Keeps engagement through visual change.",
    design_notes: "Section-based colour transitions are the whole motion budget. Every penny spent on that one technique rather than many small animations.",
    color_hints: ["#FF6B35", "#00D2AA", "#7C3AED"],
    layout_pattern: "gradient-scroll-story + feature-sections + pricing",
    conversion_tactics: ["Free tier", "Template gallery", "Team collaboration angle"],
  },
  {
    name: "Linear",
    url: "https://linear.app",
    type: "saas",
    style_tags: ["dark", "minimal", "premium", "saas"],
    headline: "The issue tracker built for high-performance teams.",
    cta_text: "Start with Linear for free",
    above_fold: "Dark hero with a subtle grid pattern and glowing purple gradient orb in the background.",
    description: "Aspiration sell: 'high-performance teams'. Dark minimal aesthetic signals quality. Every word chosen with surgical precision.",
    design_notes: "Background glow effect (radial gradient + blur) creates depth without 3D. The copy does the positioning, the design creates the emotion.",
    color_hints: ["#0F0F11", "#5E6AD2", "#FFFFFF"],
    layout_pattern: "dark-glow-hero + feature-deep-dive + customer-logos + pricing",
    conversion_tactics: ["Aspirational positioning", "Free tier", "Customer logos", "Speed/performance emphasis"],
  },
  {
    name: "Vercel",
    url: "https://vercel.com",
    type: "saas",
    style_tags: ["dark", "developer", "minimal", "grid"],
    headline: "Build and deploy the best web experiences with The Frontend Cloud.",
    cta_text: "Start Deploying",
    above_fold: "Black background with subtle grid, framework logos, animated deploy flow.",
    description: "Developer-first. The product IS technical — the hero shows deploy speed with numbers, framework compatibility at a glance.",
    design_notes: "Framework logos as first-party content (not just social proof) — developer trust signal. Deploy speed number is the value prop. Black bg = developer aesthetic.",
    color_hints: ["#000000", "#FFFFFF", "#888888"],
    layout_pattern: "black-hero + framework-logos + deploy-demo + edge-network-viz",
    conversion_tactics: ["Deploy in seconds copy", "Framework breadth display", "Edge network visualisation", "GitHub integration CTA"],
  },
];

export async function browseLandBook(type = "saas", limit = 5) {
  try {
    const live = await scrapeLandBook(type, limit);
    if (live.length > 0) return live;
  } catch (_) {}

  const norm = type.toLowerCase();
  let pool = CURATED.filter(
    (s) => s.type === norm || s.style_tags.some((t) => t.includes(norm) || norm.includes(t))
  );
  if (pool.length === 0) pool = CURATED;

  return pool.slice(0, limit).map((s) => ({
    ...s,
    source: "landbook_curated",
    fetched_at: new Date().toISOString(),
  }));
}

async function scrapeLandBook(type, limit) {
  const { data } = await axios.get(`https://land-book.com/`, {
    timeout: 7000,
    headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" },
  });
  const $ = cheerio.load(data);
  const results = [];
  $(".site-card, .card").each((i, el) => {
    if (i >= limit) return false;
    const name = $(el).find(".title, h3").first().text().trim();
    if (name) results.push({ name, type, source: "landbook_live", fetched_at: new Date().toISOString() });
  });
  return results;
}
