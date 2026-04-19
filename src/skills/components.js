export const COMPONENT_LIBRARY = [
  // ── BUTTONS ───────────────────────────────────────────────────────────────
  {
    component: "button",
    variant: "gradient-glow",
    style_tags: ["dark", "saas", "cta", "premium"],
    description: "Primary CTA with gradient background and glow on hover. Used by Linear, Vercel, Framer.",
    html: `<button class="btn-glow">Get Started Free</button>`,
    css: `.btn-glow {
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, #6C63FF, #A855F7);
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  transition: opacity 0.2s, transform 0.2s;
}
.btn-glow::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(135deg, #6C63FF, #A855F7);
  border-radius: 10px;
  z-index: -1;
  opacity: 0;
  filter: blur(12px);
  transition: opacity 0.3s;
}
.btn-glow:hover { transform: translateY(-1px); }
.btn-glow:hover::before { opacity: 0.7; }
.btn-glow:active { transform: translateY(0); }`,
    tailwind: `<button class="px-8 py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-lg
  hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(124,63,255,0.5)]
  active:translate-y-0 transition-all duration-200">
  Get Started Free
</button>`,
  },
  {
    component: "button",
    variant: "brutalist-offset",
    style_tags: ["brutalist", "editorial", "bold"],
    description: "Thick offset shadow button. Clicks in on press. Newsletter/indie aesthetics.",
    html: `<button class="btn-brutalist">Subscribe Now</button>`,
    css: `.btn-brutalist {
  padding: 0.875rem 2rem;
  background: #FFE600;
  color: #000;
  font-weight: 800;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 2px solid #000;
  border-radius: 0;
  box-shadow: 4px 4px 0 #000;
  cursor: pointer;
  transition: box-shadow 0.1s, transform 0.1s;
}
.btn-brutalist:hover {
  box-shadow: 6px 6px 0 #000;
  transform: translate(-2px, -2px);
}
.btn-brutalist:active {
  box-shadow: 0 0 0 #000;
  transform: translate(4px, 4px);
}`,
    tailwind: `<button class="px-8 py-3.5 bg-yellow-400 text-black font-black uppercase tracking-widest
  border-2 border-black shadow-[4px_4px_0_#000]
  hover:shadow-[6px_6px_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5
  active:shadow-none active:translate-x-1 active:translate-y-1
  transition-all duration-100">
  Subscribe Now
</button>`,
  },
  {
    component: "button",
    variant: "outline-shimmer",
    style_tags: ["dark", "minimal", "elegant"],
    description: "Ghost button with animated shimmer border on hover. Subtle and premium.",
    html: `<button class="btn-shimmer">Learn More</button>`,
    css: `.btn-shimmer {
  padding: 0.875rem 2rem;
  color: #fff;
  background: transparent;
  font-weight: 500;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s, color 0.3s;
}
.btn-shimmer::after {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 60%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
  transition: left 0.5s ease;
}
.btn-shimmer:hover { border-color: rgba(255,255,255,0.6); }
.btn-shimmer:hover::after { left: 150%; }`,
    tailwind: null,
  },

  // ── NAVIGATION ────────────────────────────────────────────────────────────
  {
    component: "navbar",
    variant: "frosted-sticky",
    style_tags: ["dark", "glass", "sticky", "modern"],
    description: "Sticky navbar with glassmorphism blur on scroll. Industry standard for dark SaaS.",
    html: `<nav class="navbar" id="navbar">
  <a href="/" class="nav-logo">Brand</a>
  <ul class="nav-links">
    <li><a href="#">Product</a></li>
    <li><a href="#">Pricing</a></li>
    <li><a href="#">Docs</a></li>
  </ul>
  <div class="nav-cta">
    <a href="#" class="nav-signin">Sign in</a>
    <a href="#" class="nav-btn">Start Free</a>
  </div>
</nav>`,
    css: `.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  height: 64px;
  z-index: 100;
  transition: background 0.3s, border-color 0.3s;
}
.navbar.scrolled {
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}
.nav-links a {
  color: rgba(255,255,255,0.7);
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s;
}
.nav-links a:hover { color: #fff; }
.nav-btn {
  padding: 0.5rem 1.25rem;
  background: #6C63FF;
  color: #fff;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
}`,
    js_snippet: `window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});`,
  },
  {
    component: "navbar",
    variant: "centered-logo",
    style_tags: ["luxury", "fashion", "editorial", "centered"],
    description: "Centered logo navbar used by fashion and luxury brands. Links split left/right.",
    html: `<nav class="nav-centered">
  <ul class="nav-left">
    <li><a href="#">Collection</a></li>
    <li><a href="#">Stores</a></li>
  </ul>
  <a href="/" class="nav-brand">MAISON</a>
  <ul class="nav-right">
    <li><a href="#">Journal</a></li>
    <li><a href="#">Account</a></li>
  </ul>
</nav>`,
    css: `.nav-centered {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 5%;
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 100;
}
.nav-left, .nav-right {
  display: flex;
  gap: 2.5rem;
  list-style: none;
  flex: 1;
}
.nav-right { justify-content: flex-end; }
.nav-centered a {
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  color: currentColor;
  opacity: 0.7;
  transition: opacity 0.2s;
}
.nav-centered a:hover { opacity: 1; }
.nav-brand {
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  opacity: 1 !important;
  text-align: center;
  flex: 0 0 auto;
}`,
  },

  // ── CARDS ─────────────────────────────────────────────────────────────────
  {
    component: "card",
    variant: "dark-border-glow",
    style_tags: ["dark", "saas", "hover-effect"],
    description: "Dark card with an animated border glow that rotates on hover. Used by Vercel and Linear.",
    html: `<div class="card-glow">
  <div class="card-glow-inner">
    <div class="card-icon">⚡</div>
    <h3>Lightning Fast</h3>
    <p>Deploy globally in under 30 seconds. Zero config required.</p>
  </div>
</div>`,
    css: `.card-glow {
  position: relative;
  border-radius: 12px;
  padding: 1px; /* border thickness */
  background: linear-gradient(135deg, rgba(108,99,255,0) 0%, rgba(108,99,255,0) 100%);
  transition: background 0.4s;
}
.card-glow:hover {
  background: linear-gradient(135deg, #6C63FF 0%, #A855F7 50%, #EC4899 100%);
}
.card-glow-inner {
  background: #111118;
  border-radius: 11px;
  padding: 2rem;
}
.card-icon { font-size: 2rem; margin-bottom: 1rem; }
.card-glow h3 { color: #fff; font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; }
.card-glow p { color: rgba(255,255,255,0.5); font-size: 0.9rem; line-height: 1.6; }`,
    tailwind: `<div class="relative rounded-xl p-[1px] bg-zinc-800 hover:bg-gradient-to-br hover:from-violet-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 group">
  <div class="bg-zinc-900 rounded-[11px] p-8">
    <div class="text-3xl mb-4">⚡</div>
    <h3 class="text-white font-semibold text-lg mb-2">Lightning Fast</h3>
    <p class="text-zinc-400 text-sm leading-relaxed">Deploy globally in under 30 seconds.</p>
  </div>
</div>`,
  },
  {
    component: "card",
    variant: "flip-reveal",
    style_tags: ["portfolio", "interactive", "reveal"],
    description: "Card flips 180° on hover to reveal project details. Great for portfolio grids.",
    html: `<div class="flip-card">
  <div class="flip-inner">
    <div class="flip-front">
      <img src="project.jpg" alt="Project">
    </div>
    <div class="flip-back">
      <h3>Project Name</h3>
      <p>Brief project description and role.</p>
      <a href="#" class="flip-cta">View Case Study →</a>
    </div>
  </div>
</div>`,
    css: `.flip-card {
  perspective: 1000px;
  aspect-ratio: 4/3;
}
.flip-inner {
  width: 100%; height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.flip-card:hover .flip-inner { transform: rotateY(180deg); }
.flip-front, .flip-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 12px;
  overflow: hidden;
}
.flip-front img { width: 100%; height: 100%; object-fit: cover; }
.flip-back {
  background: #1a1a2e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  transform: rotateY(180deg);
}`,
  },

  // ── INPUTS ────────────────────────────────────────────────────────────────
  {
    component: "input",
    variant: "floating-label",
    style_tags: ["clean", "form", "animated", "modern"],
    description: "Label floats above the field when focused. Material Design pattern, works on dark and light.",
    html: `<div class="field">
  <input type="text" id="email" placeholder=" " class="field-input" required>
  <label for="email" class="field-label">Email address</label>
</div>`,
    css: `.field { position: relative; }
.field-input {
  width: 100%;
  padding: 1.25rem 1rem 0.5rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}
.field-input:focus { border-color: #6C63FF; }
.field-label {
  position: absolute;
  left: 1rem;
  top: 0.9rem;
  color: rgba(255,255,255,0.4);
  font-size: 1rem;
  pointer-events: none;
  transition: all 0.2s;
  transform-origin: left;
}
.field-input:focus ~ .field-label,
.field-input:not(:placeholder-shown) ~ .field-label {
  top: 0.35rem;
  font-size: 0.7rem;
  color: #6C63FF;
}`,
  },
  {
    component: "input",
    variant: "hero-email-cta",
    style_tags: ["hero", "email", "newsletter", "cta"],
    description: "Email input with inline submit button. The classic hero newsletter capture.",
    html: `<form class="email-capture">
  <input type="email" placeholder="Enter your email" class="email-input">
  <button type="submit" class="email-submit">Get Early Access</button>
</form>`,
    css: `.email-capture {
  display: flex;
  gap: 0;
  max-width: 480px;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 10px;
  overflow: hidden;
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(10px);
}
.email-input {
  flex: 1;
  padding: 1rem 1.25rem;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 0.95rem;
  outline: none;
}
.email-input::placeholder { color: rgba(255,255,255,0.4); }
.email-submit {
  padding: 0.875rem 1.5rem;
  background: #6C63FF;
  color: #fff;
  border: none;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
}
.email-submit:hover { background: #5A52E0; }`,
    tailwind: `<form class="flex max-w-md border border-white/15 rounded-xl overflow-hidden bg-white/5 backdrop-blur-md">
  <input type="email" placeholder="Enter your email"
    class="flex-1 px-5 py-4 bg-transparent text-white placeholder-white/40 outline-none text-sm" />
  <button class="px-6 py-4 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm whitespace-nowrap transition-colors">
    Get Early Access
  </button>
</form>`,
  },

  // ── BADGES & PILLS ────────────────────────────────────────────────────────
  {
    component: "badge",
    variant: "live-pulse",
    style_tags: ["saas", "status", "live", "notification"],
    description: "Live status badge with animated pulse ring. Signals real-time or active state.",
    html: `<span class="badge-live">● Live</span>`,
    css: `.badge-live {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.75rem;
  background: rgba(16, 185, 129, 0.1);
  color: #10B981;
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  position: relative;
}
.badge-live::before {
  content: '';
  width: 6px; height: 6px;
  background: #10B981;
  border-radius: 50%;
  animation: pulse-ring 1.5s ease infinite;
}
@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(16,185,129,0.6); }
  70% { box-shadow: 0 0 0 6px rgba(16,185,129,0); }
  100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
}`,
  },

  // ── LOADERS ───────────────────────────────────────────────────────────────
  {
    component: "loader",
    variant: "skeleton-card",
    style_tags: ["loading", "skeleton", "ux", "content"],
    description: "Skeleton loading state for content cards. Prevents layout shift and feels faster than spinners.",
    html: `<div class="skeleton-card">
  <div class="skeleton skeleton-image"></div>
  <div class="skeleton-body">
    <div class="skeleton skeleton-title"></div>
    <div class="skeleton skeleton-line"></div>
    <div class="skeleton skeleton-line short"></div>
  </div>
</div>`,
    css: `@keyframes shimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
.skeleton {
  background: linear-gradient(90deg, #1A1A1A 25%, #2A2A2A 50%, #1A1A1A 75%);
  background-size: 800px 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 6px;
}
.skeleton-card {
  background: #111;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.06);
}
.skeleton-image { height: 200px; border-radius: 0; }
.skeleton-body { padding: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
.skeleton-title { height: 20px; width: 70%; }
.skeleton-line { height: 14px; }
.skeleton-line.short { width: 50%; }`,
  },
];

export function getComponentSnippets(component = "all", style = "any", framework = "any") {
  let results = COMPONENT_LIBRARY;

  if (component !== "all") {
    results = results.filter((c) => c.component === component);
  }

  if (style !== "any") {
    const norm = style.toLowerCase();
    const styled = results.filter((c) =>
      c.style_tags.some((t) => t.includes(norm) || norm.includes(t))
    );
    if (styled.length > 0) results = styled;
  }

  if (framework === "tailwind") {
    results = results.filter((c) => c.tailwind);
  }

  return results;
}
