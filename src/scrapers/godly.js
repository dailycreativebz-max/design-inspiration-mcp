import axios from "axios";
import * as cheerio from "cheerio";

// ─── Godly — Motion & Animation Design ───────────────────────────────────────

const GODLY_CURATED = [
  {
    name: "Paco Coursey — Personal Site",
    url: "https://paco.me",
    style_tags: ["minimal", "motion", "dark", "developer"],
    motion_type: "page-transition",
    description: "Silky smooth page transitions using Next.js. Each route change feels like flipping a physical card. Minimal dark aesthetic.",
    motion_notes: "Uses layout animations — elements shared between routes animate their position. Not a fake transition, real DOM continuity.",
    techniques: ["shared-layout-animation", "route-transition", "spring-physics"],
    color_hints: ["#000000", "#FFFFFF", "#555555"],
    implementation_hint: "Framer Motion layoutId on shared elements between pages.",
  },
  {
    name: "Emilkowalski — UI Animations",
    url: "https://animations.dev",
    style_tags: ["motion", "educational", "spring", "micro"],
    motion_type: "micro-interaction",
    description: "Gallery of UI micro-interactions built with Framer Motion. The authoritative reference for spring-based UI animation.",
    motion_notes: "Every animation uses spring physics, not duration+easing. Springs feel physical — they overshoot and settle naturally. Drawers, sheets, tooltips, sliders.",
    techniques: ["spring-physics", "gesture-driven", "drag-to-dismiss", "spring-sheet"],
    color_hints: ["#FAFAFA", "#09090B", "#6C63FF"],
    implementation_hint: "useSpring() with stiffness: 400, damping: 30 for most UI elements.",
  },
  {
    name: "Basement Studio",
    url: "https://basement.studio",
    style_tags: ["experimental", "dark", "scan-line", "kinetic"],
    motion_type: "scroll-driven",
    description: "Scroll-driven type animations with a retro CRT aesthetic. Text reacts to scroll velocity — fast scroll = distortion.",
    motion_notes: "CSS scanline overlay (repeating-linear-gradient) at 10% opacity creates CRT feel with zero JS. Type scale responds to scroll with lerp.",
    techniques: ["scroll-velocity-distortion", "css-scanlines", "lerp-scroll", "kinetic-type"],
    color_hints: ["#000000", "#00FF00", "#111111"],
    implementation_hint: "Track scrollY delta per frame, map to CSS transform scale/skew via lerp.",
  },
  {
    name: "Three.js Journey",
    url: "https://threejs-journey.com",
    style_tags: ["webgl", "3d", "dark", "particles"],
    motion_type: "webgl",
    description: "Full 3D particle galaxy background with interactive mouse parallax. WebGL landing page showing the product (3D course) through its medium.",
    motion_notes: "BufferGeometry particles with custom vertex shader for wave animation. Mouse interaction via raycasting. Extremely optimised — runs at 60fps on mid-range GPUs.",
    techniques: ["webgl-particles", "vertex-shader", "mouse-parallax", "raycasting"],
    color_hints: ["#0A0A0F", "#4B0082", "#FFFFFF"],
    implementation_hint: "THREE.Points with BufferGeometry. Animate positions in vertex shader using uTime uniform.",
  },
  {
    name: "Apple — iPhone 15 Pro",
    url: "https://apple.com/iphone-15-pro",
    style_tags: ["scroll-animation", "premium", "product", "cinematic"],
    motion_type: "scroll-storytelling",
    description: "The benchmark for product scroll storytelling. Each scroll reveals one product moment. Video synced to scroll position.",
    motion_notes: "Video scrubbing: currentTime = (scrollProgress * video.duration). Each feature has exactly one scroll unit. Zero cognitive load.",
    techniques: ["video-scrubbing", "scroll-pinning", "section-snap", "text-parallax"],
    color_hints: ["#000000", "#FFFFFF", "#A0522D"],
    implementation_hint: "GSAP ScrollTrigger with scrub: true. Pin hero section. Use video.currentTime = progress * duration.",
  },
  {
    name: "Stripe — Annual Letter",
    url: "https://stripe.com/annual-updates/2023",
    style_tags: ["editorial", "scroll-animation", "data-viz", "premium"],
    motion_type: "data-animation",
    description: "Annual report with animated charts that draw as you scroll. Numbers count up. Maps animate. Pure CSS for most effects.",
    motion_notes: "SVG stroke-dashoffset animation for chart lines. Counter.js for number roll-ups. Section-based IntersectionObserver, not GSAP.",
    techniques: ["svg-stroke-animation", "counter-animation", "intersection-observer", "editorial-scroll"],
    color_hints: ["#FFFFFF", "#635BFF", "#0A2540"],
    implementation_hint: "SVG path stroke-dasharray = length, stroke-dashoffset = length → 0 on intersection.",
  },
  {
    name: "Codrops — CSS Animations",
    url: "https://tympanus.net/codrops",
    style_tags: ["experimental", "educational", "css", "creative"],
    motion_type: "css-animation",
    description: "The definitive resource for creative CSS animations, hover effects, page transitions, and experimental techniques.",
    motion_notes: "Pure CSS techniques: clip-path transitions, @property custom property animation, offset-path motion, container query animations.",
    techniques: ["clip-path-animation", "css-custom-property-animation", "offset-path", "view-transition-api"],
    color_hints: ["#1A1A2E", "#E94560", "#FFFFFF"],
    implementation_hint: "@property --angle { syntax: '<angle>'; inherits: false; initial-value: 0deg; } — animatable custom properties.",
  },
];

// ─── Mobbin — Mobile UI Patterns ─────────────────────────────────────────────

const MOBBIN_CURATED = [
  {
    app: "Linear",
    platform: "iOS",
    screen_type: "onboarding",
    style_tags: ["dark", "minimal", "saas", "smooth"],
    description: "4-screen onboarding that never asks for email first. Sets up workspace, then asks permissions. Completion rate optimised.",
    ux_notes: "Progress indicator at top. Skip option always visible. Every screen has one action. Email/password deferred to end — reduces drop-off.",
    patterns: ["deferred-auth", "progress-indicator", "single-action-per-screen", "skip-option"],
    color_hints: ["#1A1A2E", "#5E6AD2", "#FFFFFF"],
  },
  {
    app: "Headspace",
    platform: "iOS",
    screen_type: "home",
    style_tags: ["calm", "rounded", "illustration", "wellness"],
    description: "Bottom tab nav with 4 items max. Today view personalised with illustration. Content cards with 4:3 imagery.",
    ux_notes: "Warm orange/coral palette scientifically selected for calm. Rounded everything. No sharp corners. Illustration over photography for approachability.",
    patterns: ["bottom-tab-4", "personalized-greeting", "illustrated-card", "progress-ring"],
    color_hints: ["#FF7B54", "#FFB347", "#F5F0E8"],
  },
  {
    app: "Notion (Mobile)",
    platform: "iOS",
    screen_type: "editor",
    style_tags: ["minimal", "neutral", "editor", "clean"],
    description: "Slash command palette slides up from bottom. Block-based editing with drag handles. Keyboard toolbar above system keyboard.",
    ux_notes: "Toolbar above keyboard is a UX pattern underused by most editors. Slash commands surfaced by '/' trigger — no menu hunting.",
    patterns: ["slash-command", "keyboard-toolbar", "drag-to-reorder", "bottom-sheet-palette"],
    color_hints: ["#FFFFFF", "#37352F", "#E8E8E4"],
  },
  {
    app: "Airbnb",
    platform: "iOS",
    screen_type: "search",
    style_tags: ["clean", "card-based", "map-hybrid", "filter"],
    description: "Map/list hybrid with sticky filter chips. Cards expand on tap with spring animation. Price shown in map bubbles.",
    ux_notes: "Map and list are always both visible — never force user to pick one mode. Filter chips above the fold with horizontal scroll. Persistent CTA for date/guest selection.",
    patterns: ["map-list-hybrid", "filter-chips", "card-spring-expand", "map-price-bubbles"],
    color_hints: ["#FFFFFF", "#FF5A5F", "#484848"],
  },
  {
    app: "Revolut",
    platform: "iOS",
    screen_type: "dashboard",
    style_tags: ["dark", "fintech", "data-dense", "card"],
    description: "Balance card with gradient + virtual card visual. Action row (Send, Request, Top Up) below. Transaction list with merchant logos.",
    ux_notes: "Virtual card design in the hero creates emotional ownership. Action row is always 3–4 items — any more and it's a menu. Transaction logos build pattern recognition.",
    patterns: ["card-hero", "action-row-3", "transaction-list", "merchant-logos"],
    color_hints: ["#191C1F", "#0075EB", "#FFFFFF"],
  },
  {
    app: "Duolingo",
    platform: "iOS",
    screen_type: "lesson",
    style_tags: ["playful", "gamification", "progress", "colorful"],
    description: "Full-screen lesson with progress bar at top, hearts (lives) counter, XP display. Tap-to-select answer pattern. Celebration animation on correct.",
    ux_notes: "Hearts create loss aversion (retention mechanic). Progress bar must complete — abandonment feels costly. Streak display on home screen is the #1 daily activation trigger.",
    patterns: ["lesson-progress-bar", "hearts-lives", "tap-select-answer", "streak-counter", "celebration-animation"],
    color_hints: ["#58CC02", "#FFC800", "#FF4B4B", "#FFFFFF"],
  },
  {
    app: "Spotify",
    platform: "iOS",
    screen_type: "now-playing",
    style_tags: ["dark", "dynamic-color", "minimal", "music"],
    description: "Album art dominates full screen. Dynamic background colour extracted from album art. Progress scrubber with haptic feedback.",
    ux_notes: "Dynamic colour from album art (iOS UIColor.init(cgImage:)) creates an emotional connection between music and UI. Scrubber expands on touch.",
    patterns: ["dynamic-color-extraction", "full-bleed-art", "haptic-scrubber", "gesture-swipe-down"],
    color_hints: ["#000000", "dynamic", "#FFFFFF"],
  },
];

export async function browseGodly(motionType = "all", limit = 5) {
  let pool = GODLY_CURATED;
  if (motionType !== "all") {
    const norm = motionType.toLowerCase().replace(/[-_]/g, "-");
    const filtered = pool.filter(
      (s) =>
        s.motion_type === norm ||
        s.style_tags.some((t) => t.includes(norm) || norm.includes(t)) ||
        s.techniques.some((t) => t.includes(norm) || norm.includes(t))
    );
    if (filtered.length > 0) pool = filtered;
  }
  return pool.slice(0, limit).map((s) => ({
    ...s,
    source: "godly_curated",
    fetched_at: new Date().toISOString(),
  }));
}

export async function browseMobbin(screenType = "all", platform = "iOS", limit = 5) {
  let pool = MOBBIN_CURATED;

  if (screenType !== "all") {
    const norm = screenType.toLowerCase();
    const filtered = pool.filter(
      (s) =>
        s.screen_type === norm ||
        s.style_tags.some((t) => t.includes(norm) || norm.includes(t)) ||
        s.patterns.some((p) => p.includes(norm) || norm.includes(p))
    );
    if (filtered.length > 0) pool = filtered;
  }

  if (platform !== "all") {
    const pFiltered = pool.filter((s) => s.platform === platform);
    if (pFiltered.length > 0) pool = pFiltered;
  }

  return pool.slice(0, limit).map((s) => ({
    ...s,
    source: "mobbin_curated",
    fetched_at: new Date().toISOString(),
  }));
}
