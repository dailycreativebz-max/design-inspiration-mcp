export const DESIGN_SKILLS = [
  // ── ANIMATION ──────────────────────────────────────────────────────────────
  {
    name: "Scroll-triggered fade-in stagger",
    category: "animation",
    difficulty: "beginner",
    description: "Elements animate in sequentially as the user scrolls down. Creates a sense of progression and keeps attention.",
    css_snippet: `
.fade-item {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-item.visible {
  opacity: 1;
  transform: translateY(0);
}
/* Stagger via nth-child delay */
.fade-item:nth-child(2) { transition-delay: 0.1s; }
.fade-item:nth-child(3) { transition-delay: 0.2s; }`,
    js_snippet: `
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add('visible'));
}, { threshold: 0.15 });
document.querySelectorAll('.fade-item').forEach(el => observer.observe(el));`,
    when_to_use: "Almost every landing page. Particularly effective for feature lists, testimonials, and pricing cards.",
    visual_effect: "Content appears to rise from below as user scrolls — feels dynamic without being distracting.",
    recommended_for: ["all"],
  },
  {
    name: "Magnetic cursor hover",
    category: "interaction",
    difficulty: "intermediate",
    description: "Buttons and interactive elements pull the cursor slightly when hovered — creates a tactile, premium feel.",
    js_snippet: `
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = \`translate(\${x * 0.3}px, \${y * 0.3}px)\`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0, 0)';
    el.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
  });
});`,
    css_snippet: `.magnetic { transition: transform 0.15s ease; cursor: none; }`,
    when_to_use: "Hero CTA buttons, navigation links in portfolio/agency sites. Avoid on mobile (no cursor).",
    visual_effect: "Elements subtly follow the mouse — creates a feeling of interactivity and polish.",
    recommended_for: ["creative", "agency", "portfolio"],
  },
  {
    name: "Smooth page transition",
    category: "animation",
    difficulty: "intermediate",
    description: "Full-page transitions using a cover element sliding in/out between routes. Removes jarring hard cuts.",
    css_snippet: `
.page-transition {
  position: fixed;
  inset: 0;
  background: #0A0A0A;
  transform: scaleY(0);
  transform-origin: bottom;
  z-index: 9999;
}
.entering .page-transition {
  animation: slideIn 0.4s cubic-bezier(0.76, 0, 0.24, 1) forwards;
}
.leaving .page-transition {
  animation: slideOut 0.4s cubic-bezier(0.76, 0, 0.24, 1) forwards;
}
@keyframes slideIn { to { transform: scaleY(1); transform-origin: bottom; } }
@keyframes slideOut { from { transform: scaleY(1); transform-origin: top; } to { transform: scaleY(0); } }`,
    when_to_use: "Portfolio sites, agency websites, any site where UX polish matters.",
    visual_effect: "Dark curtain slides up/down between pages — cinematic and memorable.",
    recommended_for: ["creative", "agency", "portfolio"],
  },
  {
    name: "Kinetic text scramble",
    category: "animation",
    difficulty: "intermediate",
    description: "Text characters scramble through random characters before resolving to the final text. Hacker/tech aesthetic.",
    js_snippet: `
function scramble(el, final, duration = 800) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let frame = 0;
  const totalFrames = duration / 30;
  const interval = setInterval(() => {
    el.textContent = final.split('').map((char, i) => {
      if (i < frame / totalFrames * final.length) return char;
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');
    if (frame++ >= totalFrames) {
      el.textContent = final;
      clearInterval(interval);
    }
  }, 30);
}`,
    when_to_use: "Hero headings in tech/crypto/developer-focused sites. Section reveals.",
    visual_effect: "Text appears to decode itself — creates intrigue and technical character.",
    recommended_for: ["tech", "gaming", "creative"],
  },

  // ── GLASSMORPHISM ─────────────────────────────────────────────────────────
  {
    name: "Glassmorphism card",
    category: "glassmorphism",
    difficulty: "beginner",
    description: "Frosted glass effect using backdrop-filter. Cards appear to float above a blurred version of the background.",
    css_snippet: `
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}`,
    when_to_use: "Over gradient or image backgrounds. Great for pricing cards, feature blocks, modal dialogs.",
    visual_effect: "Translucent frosted glass — modern and clean without being opaque.",
    recommended_for: ["all"],
  },

  // ── LAYOUT ────────────────────────────────────────────────────────────────
  {
    name: "Bento grid layout",
    category: "layout",
    difficulty: "beginner",
    description: "Dashboard-inspired grid with cards of varying sizes. Made popular by Apple event slides and Linear.",
    css_snippet: `
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 16px;
}
.bento-wide { grid-column: span 2; }
.bento-tall { grid-row: span 2; }
.bento-hero { grid-column: span 3; }`,
    when_to_use: "Feature showcases, pricing comparisons, portfolio grids. When you have 4–9 distinct features.",
    visual_effect: "Asymmetric grid creates visual hierarchy and makes each feature feel distinct.",
    recommended_for: ["all"],
  },
  {
    name: "Horizontal scroll section",
    category: "layout",
    difficulty: "intermediate",
    description: "A section that scrolls horizontally while the page scroll is vertical. Items slide left as user scrolls down.",
    css_snippet: `
.h-scroll-container {
  overflow: hidden;
  height: 100vh;
  position: sticky;
  top: 0;
}
.h-scroll-track {
  display: flex;
  width: max-content;
  will-change: transform;
}
.h-scroll-item {
  width: 40vw;
  height: 100vh;
  flex-shrink: 0;
}`,
    js_snippet: `
// With GSAP ScrollTrigger:
gsap.to('.h-scroll-track', {
  x: () => -(document.querySelector('.h-scroll-track').scrollWidth - window.innerWidth),
  ease: 'none',
  scrollTrigger: {
    trigger: '.h-scroll-container',
    start: 'top top',
    end: () => '+=' + document.querySelector('.h-scroll-track').scrollWidth,
    scrub: true,
    pin: true,
  }
});`,
    when_to_use: "Portfolio case studies, product feature showcases, team bios. When you have 5+ items that tell a story.",
    visual_effect: "Cinematic horizontal storytelling — feels like scrolling through a film reel.",
    recommended_for: ["creative", "agency", "portfolio"],
  },

  // ── TYPOGRAPHY ────────────────────────────────────────────────────────────
  {
    name: "Variable font weight animation",
    category: "typography",
    difficulty: "beginner",
    description: "Animate font weight using CSS variable fonts. Text becomes bolder on hover or scroll.",
    css_snippet: `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@100..900&display=swap');

.var-text {
  font-family: 'Fraunces', serif;
  font-weight: 100;
  font-variation-settings: 'wght' 100;
  transition: font-variation-settings 0.3s ease;
}
.var-text:hover {
  font-variation-settings: 'wght' 900;
}`,
    when_to_use: "Headings, navigation items, pull quotes. Any text element that benefits from tactile feedback.",
    visual_effect: "Text appears to inflate from thin to bold on interaction — feels organic and alive.",
    recommended_for: ["creative", "agency", "editorial"],
  },
  {
    name: "Oversized display typography",
    category: "typography",
    difficulty: "beginner",
    description: "Massive headline text that fills most of the viewport width. A single word can dominate the hero.",
    css_snippet: `
.display-hero {
  font-size: clamp(4rem, 15vw, 18rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.9;
  text-transform: uppercase;
}`,
    when_to_use: "Hero sections for bold brands. Works best with a single strong word or short phrase.",
    visual_effect: "Type as visual art — the headline IS the design, not just part of it.",
    recommended_for: ["creative", "fashion", "gaming"],
  },
  {
    name: "Split text line reveal",
    category: "animation",
    difficulty: "intermediate",
    description: "Text lines slide up from a clip mask — lines appear as if lifting from below a surface.",
    css_snippet: `
.reveal-line {
  overflow: hidden;
}
.reveal-line span {
  display: inline-block;
  transform: translateY(110%);
  animation: revealUp 0.7s cubic-bezier(0.76, 0, 0.24, 1) forwards;
}
@keyframes revealUp {
  to { transform: translateY(0); }
}`,
    js_snippet: `
// Split text into lines with a library like SplitType
import SplitType from 'split-type';
const text = new SplitType('.reveal-text', { types: 'lines' });
text.lines.forEach((line, i) => {
  line.style.animationDelay = \`\${i * 0.08}s\`;
});`,
    when_to_use: "Hero headlines, section titles. Pairs beautifully with scroll-triggered activation.",
    visual_effect: "Words emerge from below a hidden floor — theatrical and editorial.",
    recommended_for: ["agency", "editorial", "creative"],
  },

  // ── COLOR ─────────────────────────────────────────────────────────────────
  {
    name: "Gradient mesh background",
    category: "color",
    difficulty: "beginner",
    description: "Multiple radial gradient blobs creating a soft, colorful background reminiscent of bokeh photography.",
    css_snippet: `
.mesh-bg {
  background-color: #0A0A1A;
  background-image:
    radial-gradient(at 20% 20%, #3B1F8C 0%, transparent 50%),
    radial-gradient(at 80% 10%, #1F5C8C 0%, transparent 50%),
    radial-gradient(at 50% 80%, #8C1F5C 0%, transparent 50%),
    radial-gradient(at 90% 70%, #1F8C5C 0%, transparent 50%);
}`,
    when_to_use: "Hero sections, full-bleed backgrounds, modal overlays. Works on both dark and light themes.",
    visual_effect: "Painterly, multi-color ambient light that feels modern and editorial.",
    recommended_for: ["all"],
  },
  {
    name: "Noise texture overlay",
    category: "texture",
    difficulty: "beginner",
    description: "SVG noise filter adds film grain texture to backgrounds. Stops flat-color surfaces from looking cheap.",
    css_snippet: `
/* Add to any background element */
.textured::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  opacity: 0.15;
  pointer-events: none;
  mix-blend-mode: overlay;
}`,
    when_to_use: "Every site. Adds analog warmth and materiality. Especially effective on solid-color hero sections.",
    visual_effect: "Subtle grain that makes digital interfaces feel printed/physical.",
    recommended_for: ["all"],
  },

  // ── DARK MODE ─────────────────────────────────────────────────────────────
  {
    name: "Dark mode with CSS variables",
    category: "dark-mode",
    difficulty: "beginner",
    description: "Complete dark/light mode system using CSS custom properties and prefers-color-scheme.",
    css_snippet: `
:root {
  --bg-primary: #FFFFFF;
  --bg-secondary: #F5F5F5;
  --text-primary: #0A0A0A;
  --text-secondary: #6B7280;
  --accent: #6C63FF;
  --border: rgba(0,0,0,0.1);
  --surface: rgba(0,0,0,0.05);
}

[data-theme="dark"], @media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #0A0A0F;
    --bg-secondary: #111118;
    --text-primary: #F5F5F5;
    --text-secondary: #9CA3AF;
    --accent: #7C6FFF;
    --border: rgba(255,255,255,0.08);
    --surface: rgba(255,255,255,0.04);
  }
}`,
    when_to_use: "Every project. Start with CSS variables from day one even if only building one theme initially.",
    visual_effect: "Seamless theme switching with no JavaScript required for initial paint.",
    recommended_for: ["all"],
  },

  // ── BRUTALISM ─────────────────────────────────────────────────────────────
  {
    name: "Brutalist box shadow stacking",
    category: "brutalism",
    difficulty: "beginner",
    description: "Thick offset box shadows (no blur) that create a raw, printed feel. Strong directional light simulation.",
    css_snippet: `
.brutalist-card {
  border: 2px solid #000000;
  box-shadow: 4px 4px 0 #000000;
  transition: box-shadow 0.15s ease, transform 0.15s ease;
}
.brutalist-card:hover {
  box-shadow: 8px 8px 0 #000000;
  transform: translate(-4px, -4px);
}
.brutalist-btn {
  border: 2px solid #000;
  box-shadow: 3px 3px 0 #000;
  background: #FFE600;
  font-weight: 800;
  text-transform: uppercase;
}
.brutalist-btn:active {
  box-shadow: 0 0 0 #000;
  transform: translate(3px, 3px);
}`,
    when_to_use: "Newsletters, indie projects, unconventional brands, anything that wants to feel raw and honest.",
    visual_effect: "Bold graphic novel aesthetic — feels designed by hand, not by algorithm.",
    recommended_for: ["creative", "editorial"],
  },

  // ── NEUMORPHISM ───────────────────────────────────────────────────────────
  {
    name: "Neumorphic soft UI",
    category: "neumorphism",
    difficulty: "intermediate",
    description: "Elements appear extruded from the background using dual light/dark shadows. Tactile, physical feel.",
    css_snippet: `
:root { --bg: #E0E5EC; }

.neumorph {
  background: var(--bg);
  border-radius: 16px;
  box-shadow:
    6px 6px 12px #b8bec7,
    -6px -6px 12px #ffffff;
}

.neumorph-inset {
  box-shadow:
    inset 6px 6px 12px #b8bec7,
    inset -6px -6px 12px #ffffff;
}

.neumorph-btn:active {
  box-shadow:
    inset 4px 4px 8px #b8bec7,
    inset -4px -4px 8px #ffffff;
}`,
    when_to_use: "Audio players, calculators, dashboards with a premium tactile feel. Avoid on busy or dark backgrounds.",
    visual_effect: "Buttons and cards appear physically raised from the surface — like clay or milled aluminum.",
    recommended_for: ["health", "finance"],
  },

  // ── PREMIUM DESIGN ENGINEERING (v3.2) ──────────────────────────────────────
  {
    name: "Liquid Glass Refraction",
    category: "premium",
    difficulty: "advanced",
    description: "Beyond basic blur. Simulates physical edge refraction using 1px inner borders and subtle inner shadows.",
    css_snippet: `
.liquid-glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 10px 30px -10px rgba(0, 0, 0, 0.3);
  border-radius: 24px;
}`,
    when_to_use: "High-end dashboards, modal overlays, or glass surfaces where realism matters. Use on Zinc/Slate bases.",
    visual_effect: "Surface feels physically thick and crystalline rather than just a flat blur.",
    recommended_for: ["all"],
  },
  {
    name: "High-Agency Layout Staggering",
    category: "layout",
    difficulty: "intermediate",
    description: "Sequential waterfall reveals for lists and grids using CSS cascade delays.",
    css_snippet: `
.stagger-item {
  animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: calc(var(--index) * 100ms);
}
@keyframes reveal {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}`,
    when_to_use: "Mounting grids, feature lists, or dashboard metrics. Ensures the UI feels 'active' and choreographed.",
    visual_effect: "Content loads in a smooth, rhythmic sequence rather than popping in all at once.",
    recommended_for: ["all"],
  },
];
