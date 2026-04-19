const ALL_PATTERNS = [
  {
    name: "Full-bleed Gradient Hero",
    type: "hero",
    framework: "html-css",
    description: "Full-viewport hero with gradient background, centered headline, subtext, and CTA button. The most common landing page opener.",
    use_cases: "SaaS landing pages, startup homepages, product launches",
    html: `<section class="hero">
  <div class="hero-content">
    <h1 class="hero-title">Your Bold Headline Here</h1>
    <p class="hero-sub">Supporting text that clarifies the value proposition in one or two sentences.</p>
    <div class="hero-cta">
      <a href="#" class="btn-primary">Get Started Free</a>
      <a href="#" class="btn-ghost">Watch Demo →</a>
    </div>
  </div>
</section>`,
    css: `.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at 50% 0%, rgba(108,99,255,0.3) 0%, transparent 70%),
              radial-gradient(ellipse at 80% 80%, rgba(255,99,108,0.15) 0%, transparent 50%),
              #0A0A0F;
  padding: 2rem;
}
.hero-content {
  text-align: center;
  max-width: 720px;
}
.hero-title {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.05;
  color: #fff;
  margin-bottom: 1.5rem;
}
.hero-sub {
  font-size: 1.25rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.7;
  margin-bottom: 2.5rem;
}
.hero-cta { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
.btn-primary {
  padding: 0.875rem 2rem;
  background: #6C63FF;
  color: #fff;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s;
}
.btn-primary:hover { opacity: 0.85; }
.btn-ghost {
  padding: 0.875rem 2rem;
  border: 1px solid rgba(255,255,255,0.2);
  color: rgba(255,255,255,0.8);
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
}`,
  },
  {
    name: "Split Hero — Text + App Mockup",
    type: "hero",
    framework: "html-css",
    description: "Two-column hero with text on left and product screenshot/mockup on right. Industry standard for SaaS.",
    use_cases: "SaaS products, productivity apps, developer tools",
    html: `<section class="split-hero">
  <div class="split-text">
    <span class="badge">Now in Beta</span>
    <h1>The Modern Way to <em>Build Faster</em></h1>
    <p>Describe your product benefit in two compelling sentences. Focus on outcomes, not features.</p>
    <a href="#" class="cta-btn">Start for Free →</a>
  </div>
  <div class="split-visual">
    <div class="app-mockup">
      <!-- Product screenshot or UI mockup -->
    </div>
  </div>
</section>`,
    css: `.split-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  min-height: 100vh;
  padding: 6rem 5%;
  max-width: 1280px;
  margin: 0 auto;
}
.split-text h1 { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; }
.split-text p { color: #666; font-size: 1.1rem; line-height: 1.7; margin: 1.5rem 0; }
.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(108,99,255,0.1);
  color: #6C63FF;
  border: 1px solid rgba(108,99,255,0.3);
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}
.app-mockup {
  background: #111;
  border-radius: 12px;
  aspect-ratio: 16/10;
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 50px 100px rgba(0,0,0,0.4);
}
@media (max-width: 768px) { .split-hero { grid-template-columns: 1fr; } }`,
  },
  {
    name: "Bento Feature Grid",
    type: "bento",
    framework: "html-css",
    description: "Apple-style asymmetric grid with cards of varying sizes. Each card highlights one feature.",
    use_cases: "Feature showcases, product pages, about pages",
    html: `<section class="bento-section">
  <div class="bento-grid">
    <div class="bento-card bento-hero">
      <h2>The headline feature</h2>
      <p>This card spans the full width and holds your most important feature.</p>
    </div>
    <div class="bento-card bento-tall">
      <div class="feature-icon">⚡</div>
      <h3>Fast</h3>
      <p>Description of this specific feature.</p>
    </div>
    <div class="bento-card">
      <div class="feature-icon">🔒</div>
      <h3>Secure</h3>
      <p>Short feature description.</p>
    </div>
    <div class="bento-card">
      <div class="feature-icon">🎯</div>
      <h3>Precise</h3>
      <p>Short feature description.</p>
    </div>
    <div class="bento-card bento-wide">
      <h3>Integrates with everything</h3>
      <p>Full-width card for a secondary major feature.</p>
    </div>
  </div>
</section>`,
    css: `.bento-section { padding: 6rem 5%; max-width: 1280px; margin: 0 auto; }
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.bento-card {
  background: #111;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  padding: 2rem;
  transition: border-color 0.2s;
}
.bento-card:hover { border-color: rgba(108,99,255,0.4); }
.bento-hero { grid-column: span 3; background: linear-gradient(135deg, #1a0a2e, #2d1b69); }
.bento-wide { grid-column: span 2; }
.bento-tall { grid-row: span 2; }
.feature-icon { font-size: 2.5rem; margin-bottom: 1rem; }
.bento-card h2, .bento-card h3 { color: #fff; font-weight: 700; margin-bottom: 0.75rem; }
.bento-card p { color: rgba(255,255,255,0.5); font-size: 0.95rem; line-height: 1.6; }`,
  },
  {
    name: "Fullscreen Video/Image Section",
    type: "fullscreen",
    framework: "html-css",
    description: "Full-viewport immersive section with content overlaid on a video or image background.",
    use_cases: "Agency landing pages, cinematic portfolios, event sites",
    html: `<section class="fullscreen-section">
  <video class="bg-video" autoplay muted loop playsinline>
    <source src="hero.mp4" type="video/mp4">
  </video>
  <div class="video-overlay"></div>
  <div class="video-content">
    <h1>We Build Digital Experiences</h1>
    <p>Creative studio based in New York</p>
    <a href="#work" class="scroll-cta">↓ See Our Work</a>
  </div>
</section>`,
    css: `.fullscreen-section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bg-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.video-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.7) 100%);
}
.video-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #fff;
}
.video-content h1 {
  font-size: clamp(2.5rem, 6vw, 7rem);
  font-weight: 800;
  letter-spacing: -0.04em;
}`,
  },
  {
    name: "Card Stack Grid",
    type: "card-stack",
    framework: "html-css",
    description: "Responsive card grid for pricing, team, or portfolio items. Cards elevate on hover.",
    use_cases: "Pricing pages, team pages, portfolio grids, blog posts",
    html: `<section class="cards-section">
  <div class="cards-grid">
    <div class="card">
      <div class="card-header">Starter</div>
      <div class="card-price">$9<span>/mo</span></div>
      <ul class="card-features">
        <li>✓ Feature one</li>
        <li>✓ Feature two</li>
        <li>✓ Feature three</li>
      </ul>
      <a href="#" class="card-cta">Get Started</a>
    </div>
    <!-- Repeat for other cards -->
  </div>
</section>`,
    css: `.cards-section { padding: 6rem 5%; max-width: 1280px; margin: 0 auto; }
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
.card {
  background: #111;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 2.5rem;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
}
.card.featured {
  background: #6C63FF;
  border-color: transparent;
}`,
  },
  {
    name: "Magazine Two-Column",
    type: "magazine",
    framework: "html-css",
    description: "Editorial magazine-style layout with large headline and body text in offset columns.",
    use_cases: "Blogs, editorial content, case studies, long-form pages",
    html: `<article class="magazine-layout">
  <div class="mag-header">
    <span class="mag-category">Design</span>
    <h1 class="mag-title">The headline can span<br>multiple lines boldly</h1>
  </div>
  <div class="mag-content">
    <div class="mag-col-left">
      <img src="story-image.jpg" alt="" class="mag-image">
    </div>
    <div class="mag-col-right">
      <p class="mag-lead">Large lead paragraph that introduces the story. First paragraph is always larger and sets the tone.</p>
      <p>Regular body copy follows here. Continue the story with the standard font size and line height.</p>
    </div>
  </div>
</article>`,
    css: `.magazine-layout { max-width: 1280px; margin: 0 auto; padding: 4rem 5%; }
.mag-title {
  font-size: clamp(3rem, 7vw, 7rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.95;
  margin: 1rem 0 3rem;
}
.mag-content {
  display: grid;
  grid-template-columns: 55% 1fr;
  gap: 4rem;
  align-items: start;
}
.mag-image { width: 100%; aspect-ratio: 4/3; object-fit: cover; border-radius: 8px; }
.mag-lead { font-size: 1.35rem; line-height: 1.6; font-weight: 300; margin-bottom: 1.5rem; }`,
  },
  {
    name: "Tailwind Gradient Hero",
    type: "hero",
    framework: "tailwind",
    description: "Gradient hero section built with Tailwind CSS utility classes.",
    use_cases: "Any modern web app using Tailwind CSS",
    html: `<section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
  <div class="text-center max-w-4xl mx-auto">
    <span class="inline-block px-3 py-1 text-sm font-medium text-purple-300 bg-purple-900/50 rounded-full border border-purple-700/50 mb-6">
      Now in Public Beta
    </span>
    <h1 class="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[0.95] mb-6">
      Build something<br>
      <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
        extraordinary
      </span>
    </h1>
    <p class="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
      Your product value proposition in two compelling sentences. Focus on the outcome for your user.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="#" class="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-colors">
        Get Started Free
      </a>
      <a href="#" class="px-8 py-4 border border-slate-700 hover:border-slate-500 text-slate-300 font-medium rounded-lg transition-colors">
        View Documentation →
      </a>
    </div>
  </div>
</section>`,
    css: `/* No additional CSS needed — Tailwind utilities handle everything */`,
  },
  {
    name: "React Feature Bento",
    type: "bento",
    framework: "react",
    description: "React component for a bento grid feature section with hover states.",
    use_cases: "React/Next.js SaaS landing pages",
    html: `const features = [
  { title: "Lightning Fast", desc: "Sub-50ms response times globally.", icon: "⚡", span: "col-span-2" },
  { title: "Secure by Default", desc: "SOC 2 Type II certified.", icon: "🔒", span: "" },
  { title: "Scales Instantly", desc: "Zero-config auto-scaling.", icon: "📈", span: "" },
  { title: "Open Source Core", desc: "Community-driven, MIT licensed.", icon: "💻", span: "col-span-3" },
];

export function BentoGrid() {
  return (
    <section className="py-24 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-3 gap-4">
        {features.map((f) => (
          <div key={f.title}
            className={\`\${f.span} bg-zinc-900 border border-zinc-800 rounded-2xl p-8
              hover:border-purple-500/40 transition-colors duration-300 group\`}>
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-white font-bold text-xl mb-2">{f.title}</h3>
            <p className="text-zinc-400">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}`,
    css: `/* Tailwind classes in JSX */`,
  },
];

export function getLayoutPatterns(type = "all", framework = "any") {
  let results = ALL_PATTERNS;

  if (type !== "all") {
    results = results.filter((p) => p.type === type);
  }

  if (framework !== "any") {
    const fw = results.filter((p) => p.framework === framework);
    if (fw.length > 0) results = fw;
  }

  return results.slice(0, 6);
}
