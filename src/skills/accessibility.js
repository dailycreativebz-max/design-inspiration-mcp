// ─── Accessibility Guide ──────────────────────────────────────────────────────
// WCAG 2.1 AA patterns with complete ARIA markup and testing criteria.
// Each pattern is implementation-ready — not a checklist, but code.

export const A11Y_GUIDE = {

  // ── Colour Contrast ────────────────────────────────────────────────────────
  contrast: {
    title: "Colour contrast requirements",
    wcag_level: "AA (minimum) / AAA (enhanced)",
    rules: [
      { element: "Body text", requirement: "4.5:1 against background", level: "AA" },
      { element: "Large text (18px+ or 14px+ bold)", requirement: "3:1", level: "AA" },
      { element: "UI components (buttons, inputs, icons)", requirement: "3:1", level: "AA" },
      { element: "Body text enhanced", requirement: "7:1", level: "AAA" },
      { element: "Decorative elements", requirement: "None required", level: "exempt" },
    ],
    common_failures: [
      { fail: "Grey text on white: #999 on #FFF = 2.85:1", fix: "Use #767676 minimum (#FFF bg)" },
      { fail: "Light placeholder text", fix: "Placeholder must also meet 4.5:1 — use ≥ #767676" },
      { fail: "Focus outline removed", fix: "Never remove :focus-visible outline" },
      { fail: "Colour as the only state indicator", fix: "Always pair colour with shape/icon/text" },
    ],
    tools: [
      "https://webaim.org/resources/contrastchecker/",
      "https://www.whocanuse.com/ (simulates vision impairments)",
      "Chrome DevTools: Elements → Accessibility → Contrast",
    ],
    css_snippet: `/* Ensure focus is always visible */
:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 2px;
  border-radius: 2px;
}
/* Remove default but keep custom */
:focus:not(:focus-visible) { outline: none; }`,
  },

  // ── Navigation ─────────────────────────────────────────────────────────────
  navigation: {
    title: "Navigation landmark + keyboard",
    wcag_criteria: ["1.3.1 Info and Relationships", "2.1.1 Keyboard", "4.1.2 Name, Role, Value"],
    html_pattern: `<!-- Correct navigation markup -->
<header>
  <nav aria-label="Main navigation">
    <a href="/" aria-label="Home — Brand Name">
      <img src="logo.svg" alt="Brand Name">
    </a>
    <ul role="list">
      <li><a href="/product" aria-current="page">Product</a></li>
      <li><a href="/pricing">Pricing</a></li>
      <li>
        <!-- Dropdown -->
        <button aria-expanded="false" aria-haspopup="true" aria-controls="solutions-menu">
          Solutions
          <svg aria-hidden="true" focusable="false"><!-- chevron --></svg>
        </button>
        <ul id="solutions-menu" role="list" hidden>
          <li><a href="/enterprise">Enterprise</a></li>
        </ul>
      </li>
    </ul>
    <a href="/signup" class="btn-primary">Get started</a>
  </nav>
</header>

<!-- Skip link — MUST be the first focusable element -->
<a class="skip-link" href="#main-content">Skip to main content</a>`,
    css_pattern: `.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  padding: 0.5rem 1rem;
  background: var(--color-brand);
  color: white;
  border-radius: 0 0 8px 8px;
  text-decoration: none;
  font-weight: 600;
  z-index: var(--z-max, 9999);
  transition: top 0.2s;
}
.skip-link:focus { top: 0; }`,
    js_pattern: `// Dropdown keyboard support
const trigger = document.querySelector('[aria-haspopup]');
const menu = document.getElementById(trigger.getAttribute('aria-controls'));

trigger.addEventListener('click', () => {
  const expanded = trigger.getAttribute('aria-expanded') === 'true';
  trigger.setAttribute('aria-expanded', !expanded);
  menu.hidden = expanded;
  if (!expanded) menu.querySelector('a').focus(); // focus first item
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && trigger.getAttribute('aria-expanded') === 'true') {
    trigger.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
    trigger.focus();
  }
});`,
    keyboard_requirements: [
      "Tab — move through interactive elements",
      "Enter/Space — activate buttons and links",
      "Escape — close dropdowns, modals, drawers",
      "Arrow keys — navigate within menus and lists",
    ],
  },

  // ── Modal / Dialog ─────────────────────────────────────────────────────────
  modal: {
    title: "Modal dialog — focus trap + ARIA",
    wcag_criteria: ["1.3.1", "2.1.2 No Keyboard Trap (must be able to exit)", "4.1.2"],
    html_pattern: `<dialog
  id="confirm-modal"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-desc">
  <h2 id="modal-title">Confirm deletion</h2>
  <p id="modal-desc">This action cannot be undone. All data will be permanently removed.</p>
  <div class="modal-actions">
    <button type="button" class="btn-ghost" id="modal-cancel">Cancel</button>
    <button type="button" class="btn-danger" id="modal-confirm">Delete permanently</button>
  </div>
  <button type="button" class="modal-close" aria-label="Close dialog">×</button>
</dialog>`,
    js_pattern: `function openModal(modal) {
  const focusable = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  modal.showModal(); // Native <dialog> handles most a11y
  first.focus();

  // Focus trap
  modal.addEventListener('keydown', function trap(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
}

// Native <dialog> handles Escape automatically
// Also close on backdrop click:
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.close();
});`,
    key_rules: [
      "Focus must move into modal on open",
      "Focus must be trapped inside modal while open",
      "Escape must close the modal",
      "Focus must return to the trigger element on close",
      "Background content must be inert (aria-hidden='true') or use <dialog>",
    ],
  },

  // ── Forms ──────────────────────────────────────────────────────────────────
  forms: {
    title: "Accessible form patterns",
    wcag_criteria: ["1.3.1", "2.4.6 Headings and Labels", "3.3.1 Error Identification", "3.3.2 Labels or Instructions"],
    html_pattern: `<!-- Correct form field pattern -->
<div class="field">
  <label for="email">
    Email address
    <span class="required" aria-label="required">*</span>
  </label>

  <!-- Helper text BEFORE input so screen readers read it first -->
  <p id="email-hint" class="field-hint">
    We'll send your receipt here — never used for marketing.
  </p>

  <input
    type="email"
    id="email"
    name="email"
    autocomplete="email"
    aria-describedby="email-hint email-error"
    aria-required="true"
    aria-invalid="false">

  <!-- Error: only rendered when invalid -->
  <p id="email-error" class="field-error" role="alert" hidden>
    Enter a valid email — like hello@example.com
  </p>
</div>

<!-- Correct checkbox group -->
<fieldset>
  <legend>Notification preferences</legend>
  <label>
    <input type="checkbox" name="notif" value="email"> Email
  </label>
  <label>
    <input type="checkbox" name="notif" value="sms"> SMS
  </label>
</fieldset>`,
    js_pattern: `function validateEmail(input) {
  const error = document.getElementById('email-error');
  const isValid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(input.value);

  input.setAttribute('aria-invalid', !isValid);
  error.hidden = isValid;

  if (!isValid) {
    // role="alert" announces automatically to screen readers
    error.textContent = 'Enter a valid email — like hello@example.com';
  }
}

// Validate on blur (not on every keystroke — annoying)
document.getElementById('email').addEventListener('blur', (e) => validateEmail(e.target));`,
    key_rules: [
      "Every input needs a visible <label> — never rely on placeholder alone",
      "Group related inputs in <fieldset> + <legend>",
      "Associate hints with aria-describedby, not just visual proximity",
      "Error messages use role='alert' for live announcements",
      "Required fields marked with aria-required='true' AND visible indicator",
      "Autocomplete attributes improve mobile UX AND a11y",
    ],
  },

  // ── Images & Icons ─────────────────────────────────────────────────────────
  images: {
    title: "Images and icons",
    wcag_criteria: ["1.1.1 Non-text Content"],
    patterns: [
      {
        type: "Informative image",
        html: `<img src="chart.png" alt="Monthly revenue grew from $40K in Jan to $120K in Dec 2024">`,
        rule: "alt describes the information, not the appearance",
      },
      {
        type: "Decorative image",
        html: `<img src="decoration.jpg" alt="" role="presentation">`,
        rule: "Empty alt + role='presentation' tells screen readers to skip it",
      },
      {
        type: "Icon with visible label",
        html: `<button>
  <svg aria-hidden="true" focusable="false"><!-- icon --></svg>
  Download
</button>`,
        rule: "Icon is decorative when label is present — aria-hidden on SVG",
      },
      {
        type: "Icon without visible label",
        html: `<button aria-label="Download invoice as PDF">
  <svg aria-hidden="true" focusable="false"><!-- icon --></svg>
</button>`,
        rule: "Standalone icon buttons MUST have aria-label — describe the action, not the icon",
      },
      {
        type: "SVG illustration",
        html: `<svg role="img" aria-labelledby="svg-title svg-desc">
  <title id="svg-title">Team collaboration</title>
  <desc id="svg-desc">Three people around a table sharing a document</desc>
  <!-- paths -->
</svg>`,
        rule: "Complex SVGs need role='img' + title + desc",
      },
    ],
  },

  // ── Motion & Animation ─────────────────────────────────────────────────────
  motion: {
    title: "Reduced motion — respecting user preferences",
    wcag_criteria: ["2.3.3 Animation from Interactions (AAA)", "best practice for AA"],
    css_snippet: `/* Wrap ALL non-essential animations */
@media (prefers-reduced-motion: no-preference) {
  .hero-title {
    animation: slideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  .hero-bg {
    animation: blobMove 12s ease-in-out infinite;
  }
  .card {
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
}

/* If reduced motion IS preferred — give them instant state changes only */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`,
    js_snippet: `// Check in JavaScript too — for requestAnimationFrame loops
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animate() {
  if (prefersReducedMotion) {
    // Apply final state instantly
    element.style.transform = 'translateY(0)';
    element.style.opacity = '1';
    return;
  }
  // Run full animation
  requestAnimationFrame(animationLoop);
}`,
    rules: [
      "Never animate anything that spins/flashes more than 3 times per second (seizure risk)",
      "Parallax scrolling can cause nausea — disable or reduce under prefers-reduced-motion",
      "Autoplay video must have pause controls",
      "Looping animations distract — use animation-iteration-count: 1 by default",
    ],
  },

  // ── Touch Targets ──────────────────────────────────────────────────────────
  touch: {
    title: "Touch target sizes — mobile a11y",
    wcag_criteria: ["2.5.5 Target Size (AAA: 44×44px)", "2.5.8 Target Size Minimum (AA in WCAG 2.2: 24×24px)"],
    css_snippet: `/* Minimum interactive target size */
button, [role="button"], a, input[type="checkbox"], input[type="radio"] {
  min-height: 44px;
  min-width: 44px;
}

/* Small visual targets — expand clickable area without changing visual size */
.small-btn {
  position: relative;
  /* Visual size: 20px */
  width: 20px; height: 20px;
}
.small-btn::before {
  content: '';
  position: absolute;
  /* Touch target: 44px */
  inset: -12px;
}`,
    rules: [
      "44×44px minimum touch target (Apple HIG recommendation, WCAG AAA)",
      "24×24px minimum per WCAG 2.2 AA",
      "Spacing between targets matters — 8px gap prevents mis-taps",
      "Inline links in dense text are exempt — can't be 44px",
    ],
  },

};

export function getAccessibilityGuide(component = "all", level = "AA") {
  if (component === "all") {
    return {
      summary: Object.entries(A11Y_GUIDE).map(([key, val]) => ({
        component: key,
        title: val.title,
        wcag_criteria: val.wcag_criteria || val.rules?.map(r => r.level)?.filter(Boolean) || [],
      })),
      quick_wins: [
        "Add skip link as first element in <body>",
        "All images need alt text (or alt='' for decorative)",
        "All inputs need <label> elements",
        "Add :focus-visible styles — never remove focus outlines",
        "Wrap animations in @media (prefers-reduced-motion: no-preference)",
        "44px minimum touch targets on mobile",
        "aria-label on all icon-only buttons",
        "role='alert' on dynamic error messages",
      ],
    };
  }

  const key = Object.keys(A11Y_GUIDE).find(
    (k) => k === component || k.includes(component) || component.includes(k)
  );
  return key ? A11Y_GUIDE[key] : A11Y_GUIDE;
}

export function autoFixAccessibility(html) {
  let fixedHtml = html;
  const fixes = [];

  // Fix missing alt attributes on images
  if (/<img(?![^>]*\balt=)[^>]*>/i.test(fixedHtml)) {
    fixedHtml = fixedHtml.replace(/<img([^>]*)>/gi, '<img$1 alt="">');
    fixes.push("Added empty alt=\"\" attributes to images missing them. Review to add descriptive text if the image is informative.");
  }

  // Fix button without aria-label or text
  if (/<button[^>]*>\s*<svg[^>]*>.*?<\/svg>\s*<\/button>/is.test(fixedHtml)) {
    fixedHtml = fixedHtml.replace(/(<button)([^>]*>\s*<svg[^>]*>.*?<\/svg>\s*<\/button>)/gis, '$1 aria-label="Action"$2');
    fixes.push("Added aria-label=\"Action\" to icon-only buttons. Please replace 'Action' with the actual button purpose.");
  }

  // Add role="alert" to elements that look like error messages
  if (/\bclass="[^"]*error[^"]*"[^>]*>/i.test(fixedHtml) && !fixedHtml.includes('role="alert"')) {
    fixedHtml = fixedHtml.replace(/(<[^>]+\bclass="[^"]*error[^"]*")([^>]*>)/gi, '$1 role="alert"$2');
    fixes.push("Added role=\"alert\" to elements with 'error' in their class name.");
  }

  return {
    original: html,
    fixed: fixedHtml,
    fixes: fixes.length ? fixes : ["No basic accessibility issues detected. (Note: manual semantic review is still required)."]
  };
}
