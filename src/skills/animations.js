export const ANIMATION_LIBRARY = [
  {
    name: "Page Load Stagger Reveal",
    category: "entrance",
    trigger: "on-load",
    difficulty: "beginner",
    description: "Hero content items reveal sequentially on page load. Creates a polished first impression.",
    css: `@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
.reveal { animation: fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
.reveal-1 { animation-delay: 0.1s; }
.reveal-2 { animation-delay: 0.2s; }
.reveal-3 { animation-delay: 0.3s; }
.reveal-4 { animation-delay: 0.4s; }`,
    html: `<h1 class="reveal reveal-1">Big Headline</h1>
<p  class="reveal reveal-2">Subheading text here</p>
<div class="reveal reveal-3"><!-- CTA buttons --></div>`,
    notes: "Use cubic-bezier(0.22, 1, 0.36, 1) for that satisfying overshoot. Adjust delay for more/less cascade.",
  },
  {
    name: "Scroll-Triggered Section Reveal",
    category: "scroll",
    trigger: "intersection-observer",
    difficulty: "beginner",
    description: "Sections animate in as they enter the viewport. The single most important scroll effect.",
    css: `.scroll-reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.scroll-reveal.in-view {
  opacity: 1;
  transform: translateY(0);
}`,
    js: `const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      observer.unobserve(e.target); // animate once
    }
  }),
  { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
);
document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));`,
    notes: "rootMargin -50px means element must be 50px inside viewport before triggering. Prevents edge-of-screen flash.",
  },
  {
    name: "Counter Number Roll-Up",
    category: "scroll",
    trigger: "intersection-observer",
    difficulty: "intermediate",
    description: "Numbers animate from 0 to their final value when scrolled into view. Great for stats sections.",
    html: `<span class="counter" data-target="10000">0</span>+`,
    js: `function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const start = performance.now();
  
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out expo
    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    el.textContent = Math.floor(ease * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));`,
    notes: "Ease-out-expo feels most natural for number roll-ups. Add commas with .toLocaleString().",
  },
  {
    name: "Cursor Trailer / Follower",
    category: "interaction",
    trigger: "mousemove",
    difficulty: "intermediate",
    description: "Custom cursor element that smoothly follows the mouse with a spring-like lag. Signature of premium agency sites.",
    html: `<div class="cursor-dot"></div>
<div class="cursor-trail"></div>`,
    css: `.cursor-dot, .cursor-trail {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
}
.cursor-dot {
  width: 6px; height: 6px;
  background: #fff;
  transition: transform 0.15s ease;
}
.cursor-trail {
  width: 36px; height: 36px;
  border: 1px solid rgba(255,255,255,0.4);
  transition: width 0.3s, height 0.3s, border-color 0.3s;
}
body:has(a:hover) .cursor-trail,
body:has(button:hover) .cursor-trail {
  width: 60px; height: 60px;
  border-color: rgba(255,255,255,0.8);
}`,
    js: `let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;
const dot = document.querySelector('.cursor-dot');
const trail = document.querySelector('.cursor-trail');

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.12; // spring factor
  trailY += (mouseY - trailY) * 0.12;
  trail.style.left = trailX + 'px';
  trail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();`,
    notes: "Spring factor 0.12 is slow/floaty. Increase to 0.25 for snappier feel. Add 'cursor: none' to body.",
  },
  {
    name: "Parallax Hero Depth",
    category: "scroll",
    trigger: "scroll",
    difficulty: "intermediate",
    description: "Hero background moves at a different speed than the foreground, creating a sense of depth.",
    html: `<section class="parallax-hero">
  <div class="parallax-bg" id="parallax-bg">
    <!-- background image or gradient -->
  </div>
  <div class="parallax-content">
    <h1>Your Headline</h1>
  </div>
</section>`,
    css: `.parallax-hero {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.parallax-bg {
  position: absolute;
  inset: -20%;
  background: url('hero.jpg') center/cover;
  will-change: transform;
}
.parallax-content { position: relative; z-index: 1; }`,
    js: `const bg = document.getElementById('parallax-bg');
window.addEventListener('scroll', () => {
  const speed = 0.4; // 0 = locked, 1 = full scroll
  bg.style.transform = \`translateY(\${window.scrollY * speed}px)\`;
}, { passive: true });`,
    notes: "Use { passive: true } on scroll listener for performance. Speed 0.3–0.5 is the sweet spot.",
  },
  {
    name: "Text Split Clip Reveal",
    category: "entrance",
    trigger: "on-load",
    difficulty: "advanced",
    description: "Headline words slide up from behind a clipping mask. Cinematic editorial effect used by top agencies.",
    html: `<h1 class="split-reveal">
  <span class="line"><span class="word">Design</span></span>
  <span class="line"><span class="word">That</span></span>
  <span class="line"><span class="word">Matters</span></span>
</h1>`,
    css: `.split-reveal .line {
  display: block;
  overflow: hidden; /* the clip mask */
}
.split-reveal .word {
  display: inline-block;
  transform: translateY(115%);
  animation: wordReveal 0.8s cubic-bezier(0.76, 0, 0.24, 1) forwards;
}
.line:nth-child(1) .word { animation-delay: 0.1s; }
.line:nth-child(2) .word { animation-delay: 0.2s; }
.line:nth-child(3) .word { animation-delay: 0.3s; }
@keyframes wordReveal {
  to { transform: translateY(0); }
}`,
    notes: "For dynamic text, use the SplitType library to auto-wrap words/lines. The overflow:hidden on .line is the clipping mask.",
  },
  {
    name: "Gradient Mesh Animated BG",
    category: "background",
    trigger: "auto",
    difficulty: "beginner",
    description: "Slow-moving colour blobs in the background using CSS animations. Creates an ambient, living background.",
    html: `<div class="mesh-bg">
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>
  <div class="blob blob-3"></div>
  <div class="content"><!-- page content --></div>
</div>`,
    css: `.mesh-bg {
  position: relative;
  overflow: hidden;
  background: #0A0A15;
}
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: blobMove 12s ease-in-out infinite alternate;
}
.blob-1 {
  width: 600px; height: 600px;
  background: #3B1F8C;
  top: -200px; left: -100px;
  animation-duration: 14s;
}
.blob-2 {
  width: 500px; height: 500px;
  background: #1F5C8C;
  bottom: -200px; right: -100px;
  animation-duration: 11s;
  animation-delay: -4s;
}
.blob-3 {
  width: 400px; height: 400px;
  background: #8C1F5C;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  animation-duration: 16s;
  animation-delay: -8s;
}
@keyframes blobMove {
  0%   { transform: translate(0, 0) scale(1); }
  33%  { transform: translate(60px, -40px) scale(1.1); }
  66%  { transform: translate(-40px, 60px) scale(0.9); }
  100% { transform: translate(40px, 40px) scale(1.05); }
}
.content { position: relative; z-index: 1; }`,
    notes: "Reduce opacity to 0.3 for a subtler effect. Increase blur to 120px for softer edges.",
  },
  {
    name: "Typewriter Effect",
    category: "text",
    trigger: "on-load",
    difficulty: "beginner",
    description: "Text types itself character by character with a blinking cursor. Great for terminal or developer aesthetics.",
    html: `<h2 class="typewriter">
  <span class="type-text"></span><span class="cursor">|</span>
</h2>`,
    css: `.cursor {
  animation: blink 0.8s step-end infinite;
  color: #6C63FF;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}`,
    js: `const phrases = ['Build faster.', 'Ship better.', 'Scale easily.'];
const el = document.querySelector('.type-text');
let phraseIndex = 0, charIndex = 0, deleting = false;

function type() {
  const phrase = phrases[phraseIndex];
  if (!deleting) {
    el.textContent = phrase.slice(0, ++charIndex);
    if (charIndex === phrase.length) {
      deleting = true;
      setTimeout(type, 1800); return;
    }
  } else {
    el.textContent = phrase.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 50 : 90);
}
type();`,
    notes: "Vary typing speed for personality: 60ms = fast/robotic, 120ms = human-like. Deleting should always be faster.",
  },
  {
    name: "Hover Image Reveal on Link",
    category: "interaction",
    trigger: "hover",
    difficulty: "intermediate",
    description: "Hovering a text link reveals a floating project image that follows the cursor. Used by top portfolio sites.",
    html: `<ul class="project-list">
  <li class="project-item">
    <a href="#" data-image="project1.jpg">Brand Identity</a>
  </li>
  <li class="project-item">
    <a href="#" data-image="project2.jpg">Web Design</a>
  </li>
</ul>
<div class="hover-preview" id="hoverPreview">
  <img src="" alt="" id="previewImg">
</div>`,
    css: `.project-list { list-style: none; }
.project-item a {
  font-size: clamp(2rem, 5vw, 5rem);
  font-weight: 700;
  text-decoration: none;
  display: block;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  transition: opacity 0.2s;
}
.project-list:has(a:hover) a:not(:hover) { opacity: 0.3; }
.hover-preview {
  position: fixed;
  width: 300px;
  aspect-ratio: 4/3;
  border-radius: 8px;
  overflow: hidden;
  pointer-events: none;
  z-index: 999;
  opacity: 0;
  transform: scale(0.85);
  transition: opacity 0.3s, transform 0.3s;
}
.hover-preview.visible {
  opacity: 1;
  transform: scale(1);
}
.hover-preview img { width: 100%; height: 100%; object-fit: cover; }`,
    js: `const preview = document.getElementById('hoverPreview');
const previewImg = document.getElementById('previewImg');
let mouseX = 0, mouseY = 0, curX = 0, curY = 0;

document.querySelectorAll('[data-image]').forEach(link => {
  link.addEventListener('mouseenter', () => {
    previewImg.src = link.dataset.image;
    preview.classList.add('visible');
  });
  link.addEventListener('mouseleave', () => preview.classList.remove('visible'));
});

document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

function track() {
  curX += (mouseX - curX) * 0.1;
  curY += (mouseY - curY) * 0.1;
  preview.style.left = (curX + 20) + 'px';
  preview.style.top  = (curY - 100) + 'px';
  requestAnimationFrame(track);
}
track();`,
    notes: "The spring factor 0.1 creates the signature lag. 0.2 for snappier follow. The opacity trick on siblings is CSS-only magic.",
  },
];

export function getAnimations(category = "all", trigger = "any", difficulty = "all") {
  let results = ANIMATION_LIBRARY;

  if (category !== "all") {
    results = results.filter((a) => a.category === category);
  }
  if (trigger !== "any") {
    results = results.filter((a) => a.trigger.includes(trigger));
  }
  if (difficulty !== "all") {
    results = results.filter((a) => a.difficulty === difficulty);
  }

  return results;
}
