#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

// Scrapers
import { browseAwwwards }           from "./scrapers/awwwards.js";
import { browseDribbble }           from "./scrapers/dribbble.js";
import { browseSiteInspire }        from "./scrapers/siteinspire.js";
import { browseCSSAwards, browseBehance } from "./scrapers/cssawards.js";
import { browseLandBook }           from "./scrapers/landbook.js";
import { browseGodly, browseMobbin } from "./scrapers/godly.js";
import { listDesignMdBrands, getDesignMd, searchBrandDesigns, setDesignMdDir } from "./scrapers/design_md.js";
import { searchStitchComponents, generateStitchPrompt } from "./scrapers/stitch_bridge.js";

// Handle arguments
const argsList = process.argv.slice(2);
const docsPathIdx = argsList.indexOf("--docs-path");
if (docsPathIdx !== -1 && argsList[docsPathIdx + 1]) {
  setDesignMdDir(argsList[docsPathIdx + 1]);
}

// Skills
import { DESIGN_SKILLS }            from "./skills/index.js";
import { getColorPalettes }         from "./skills/colors.js";
import { getTypographyPairings }    from "./skills/typography.js";
import { getLayoutPatterns }        from "./skills/layouts.js";
import { getComponentSnippets }     from "./skills/components.js";
import { getAnimations }            from "./skills/animations.js";
import { getMicroCopy }             from "./skills/microcopy.js";
import { generateDesignTokens }     from "./skills/tokens.js";
import { getAccessibilityGuide, autoFixAccessibility } from "./skills/accessibility.js";
import { getPremiumTaste, generateDesignMd } from "./skills/design_intel.js";
import { getStitchPatterns, generateReactComponent } from "./skills/stitch_patterns.js";
import { auditUIComponent }         from "./skills/ui_auditor.js";
import { getR3fPatterns }           from "./skills/threejs_patterns.js";

const server = new Server(
  { name: "design-inspiration-mcp", version: "3.5.0" },
  { capabilities: { tools: {} } }
);

// ─── Tool Definitions ─────────────────────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    // ── SOURCES (11) ──────────────────────────────────────────────────────────
    {
      name: "browse_awwwards",
      description: "Top-rated sites from Awwwards filtered by category and award level. Returns design notes, color hints, tech tags.",
      inputSchema: { type:"object", properties: {
        category: { type:"string", description:"'all','portfolio','agency','ecommerce','experimental','motion','typography'", default:"all" },
        limit: { type:"number", default:6 },
        award_filter: { type:"string", description:"'sotd','sotm','honorable','any'", default:"any" },
      }},
    },
    {
      name: "browse_dribbble",
      description: "Trending Dribbble shots by tag. Returns color palettes, techniques, and design notes extracted from shots.",
      inputSchema: { type:"object", properties: {
        tag: { type:"string", description:"'landing page','dashboard','mobile app','dark ui','glassmorphism','branding'", default:"landing page" },
        limit: { type:"number", default:6 },
      }},
    },
    {
      name: "browse_siteinspire",
      description: "Curated sites from SiteInspire — best for minimal, editorial, typographic, and experimental aesthetics.",
      inputSchema: { type:"object", properties: {
        style: { type:"string", description:"'minimal','editorial','experimental','typography','industrial','dark','luxury','japanese'", default:"minimal" },
        limit: { type:"number", default:5 },
      }},
    },
    {
      name: "browse_css_awards",
      description: "CSS Design Awards — cutting-edge CSS, WebGL, 3D, and technically impressive interactions.",
      inputSchema: { type:"object", properties: {
        style: { type:"string", description:"'agency','portfolio','experimental','dark','webgl','3d','interactive'", default:"agency" },
        limit: { type:"number", default:5 },
      }},
    },
    {
      name: "browse_behance",
      description: "Curated Behance projects — branding, UI/UX, motion design, illustration, iconography.",
      inputSchema: { type:"object", properties: {
        type: { type:"string", description:"'branding','ui-ux','motion','illustration','iconography','typography','packaging'", default:"ui-ux" },
        limit: { type:"number", default:5 },
      }},
    },
    {
      name: "browse_landbook",
      description: "Landing page gallery (Land-book) — the best source for SaaS landing page patterns, CTAs, above-the-fold strategies. Each entry includes headline, CTA copy, layout pattern, and conversion tactics.",
      inputSchema: { type:"object", properties: {
        type: { type:"string", description:"'saas','dark','minimal','colorful','premium','experimental'", default:"saas" },
        limit: { type:"number", default:5 },
      }},
    },
    {
      name: "browse_godly",
      description: "Godly — motion and animation-focused inspiration. WebGL, scroll animations, micro-interactions, page transitions, cursor effects. Each entry includes techniques and implementation hints.",
      inputSchema: { type:"object", properties: {
        motion_type: { type:"string", description:"'scroll-storytelling','micro-interaction','page-transition','webgl','scroll-driven','css-animation','data-animation','all'", default:"all" },
        limit: { type:"number", default:5 },
      }},
    },
    {
      name: "browse_mobbin",
      description: "Mobbin — mobile UI patterns from real apps (iOS/Android). Screen types: onboarding, home, search, editor, dashboard, lesson. Each entry includes UX notes and interaction patterns.",
      inputSchema: { type:"object", properties: {
        screen_type: { type:"string", description:"'onboarding','home','search','editor','dashboard','lesson','all'", default:"all" },
        platform: { type:"string", description:"'iOS','Android','all'", default:"iOS" },
        limit: { type:"number", default:5 },
      }},
    },
    {
      name: "browse_brand_designs",
      description: "Explore curated DESIGN.md files from top brands (Airbnb, Stripe, Apple, etc.). Returns full design system specs for AI agents.",
      inputSchema: { type:"object", properties: {
        brand: { type:"string", description:"Optional: specific brand name to retrieve (e.g. 'airbnb', 'stripe'). If omitted, lists all available brands." },
        search: { type:"string", description:"Optional: search term to find relevant brands." },
      }},
    },
    {
      name: "browse_stitch_projects",
      description: "Search for high-signal UI components and screens within existing Google Stitch projects.",
      inputSchema: { type:"object", properties: {
        query: { type:"string", description:"Search query for components or screens." },
      }},
    },
    {
      name: "search_inspiration",
      description: "Search across ALL sources simultaneously — Awwwards, SiteInspire, CSS Awards. One query, combined results. Best when you're not sure which source to use.",
      inputSchema: { type:"object", properties: {
        query: { type:"string", description:"'dark minimal','luxury fashion','scroll animation','webgl','editorial typography'" },
        limit_per_source: { type:"number", default:3 },
      }, required:["query"] },
    },

    // ── SKILLS (10) ──────────────────────────────────────────────────────────
    {
      name: "get_design_skills",
      description: "CSS/JS design techniques: glassmorphism, neumorphism, brutalism, scroll effects, dark-mode system, noise textures, variable fonts.",
      inputSchema: { type:"object", properties: {
        category: { type:"string", description:"'animation','layout','typography','color','texture','interaction','glassmorphism','neumorphism','brutalism','dark-mode','all'", default:"all" },
        difficulty: { type:"string", description:"'beginner','intermediate','advanced','all'", default:"all" },
      }},
    },
    {
      name: "get_color_palettes",
      description: "11 mood-matched palettes with hex values and ready-to-paste CSS variable declarations.",
      inputSchema: { type:"object", properties: {
        mood: { type:"string", description:"'dark luxury','neon cyberpunk','soft pastel','earthy organic','corporate trust','startup energy','retro 80s','monochrome'", default:"dark luxury" },
        count: { type:"number", default:3 },
      }},
    },
    {
      name: "get_typography_pairings",
      description: "10 font pairs with Google Fonts imports and CSS usage snippets (display + body).",
      inputSchema: { type:"object", properties: {
        style: { type:"string", description:"'editorial','modern tech','luxury brand','playful','brutalist','startup','vintage','minimal','bold impact'", default:"modern tech" },
        count: { type:"number", default:3 },
      }},
    },
    {
      name: "get_layout_patterns",
      description: "Layout templates with full HTML/CSS/Tailwind/React code: hero, bento, split, fullscreen, magazine, card-stack.",
      inputSchema: { type:"object", properties: {
        type: { type:"string", description:"'hero','bento','split','fullscreen','card-stack','magazine','all'", default:"all" },
        framework: { type:"string", description:"'html-css','tailwind','react','any'", default:"any" },
      }},
    },
    {
      name: "get_component_snippets",
      description: "Copy-paste UI components: buttons (3 variants), navbars (2), cards (2), inputs (2), badge, loader — with CSS + Tailwind.",
      inputSchema: { type:"object", properties: {
        component: { type:"string", description:"'button','navbar','card','input','badge','loader','all'", default:"all" },
        style: { type:"string", description:"'dark','glass','brutalist','luxury','minimal','saas'", default:"any" },
        framework: { type:"string", description:"'tailwind','any'", default:"any" },
      }},
    },
    {
      name: "get_animation_library",
      description: "9 animations with full CSS + JS: stagger reveal, scroll trigger, cursor follower, parallax, typewriter, counter roll-up, gradient blobs, text clip reveal, hover image preview.",
      inputSchema: { type:"object", properties: {
        category: { type:"string", description:"'entrance','scroll','interaction','background','text','all'", default:"all" },
        trigger: { type:"string", description:"'on-load','scroll','hover','mousemove','intersection-observer','auto','any'", default:"any" },
        difficulty: { type:"string", description:"'beginner','intermediate','advanced','all'", default:"all" },
      }},
    },
    {
      name: "get_micro_copy",
      description: "Copywriting patterns with psychological rationale: CTA buttons, hero headlines, error messages, onboarding copy, social proof, pricing. Each includes bad/good comparison and the reason why it works.",
      inputSchema: { type:"object", properties: {
        type: { type:"string", description:"'cta','headlines','errors','onboarding','social_proof','pricing','all'", default:"all" },
        context: { type:"string", description:"Optional: filter by context, e.g. 'signup','payment','email','newsletter'", default:"" },
      }},
    },
    {
      name: "generate_design_tokens",
      description: "Generate a complete CSS custom property system: color tokens (from brand hex), spacing scale, typographic scale, shadow system, border radii, transitions, z-index. Returns complete :root CSS output.",
      inputSchema: { type:"object", properties: {
        brand_color: { type:"string", description:"Brand hex color, e.g. '#6C63FF'", default:"#6C63FF" },
        mode: { type:"string", description:"'dark' or 'light'", default:"dark" },
        scale: { type:"string", description:"Type scale ratio: 'minor_third' (1.2), 'major_third' (1.25), 'perfect_fourth' (1.333)", default:"major_third" },
        rounding: { type:"string", description:"'minimal' (sharp), 'balanced' (standard), 'rounded' (playful)", default:"balanced" },
        transitions: { type:"string", description:"'snappy' (fast) or 'smooth' (cinematic)", default:"smooth" },
        include_tailwind: { type:"boolean", description:"Include Tailwind config output", default:false },
      }},
    },
    {
      name: "get_accessibility_guide",
      description: "WCAG 2.1 AA accessibility patterns with implementation-ready HTML, ARIA markup, CSS, and JS. Covers contrast, navigation, modals, forms, images, motion, and touch targets.",
      inputSchema: { type:"object", properties: {
        component: { type:"string", description:"'contrast','navigation','modal','forms','images','motion','touch','all'", default:"all" },
        level: { type:"string", description:"'A','AA','AAA'", default:"AA" },
      }},
    },
    {
      name: "get_premium_taste",
      description: "Retrieve high-end design engineering baselines and rules (Variance, Motion, Density) to ensure premium UI quality.",
      inputSchema: { type:"object", properties: {
        aesthetic: { type:"string", description:"Optional: specific aesthetic style.", default:"modern minimal" },
      }},
    },

    // ── SYNTHESIS (2) ─────────────────────────────────────────────────────────
    {
      name: "get_design_brief",
      description: "Generate a complete design brief: palette, typography, layout, component, animations, design tokens, micro-copy, accessibility checklist + implementation roadmap. Supports Google Stitch optimized prompts.",
      inputSchema: { type:"object", properties: {
        project_type: { type:"string", description:"'SaaS landing page','portfolio website','e-commerce store','dashboard','agency website','startup homepage'" },
        aesthetic: { type:"string", description:"'minimal clean','bold experimental','dark premium','playful colorful','corporate professional','retro nostalgic'", default:"modern minimal" },
        industry: { type:"string", description:"'tech','fashion','finance','health','food','creative','gaming'", default:"tech" },
        brand: { type:"string", description:"Optional: reference a specific brand's design system (e.g. 'airbnb', 'stripe')." },
      }, required:["project_type"] },
    },
    {
      name: "generate_design_md",
      description: "Generate a structured DESIGN.md file content for your project, following the Google Stitch format and High-end Design Taste guidelines.",
      inputSchema: { type:"object", properties: {
        project_type: { type:"string", description:"Type of project (e.g. 'Fintech App')." },
        brand: { type:"string", description:"Optional: reference brand for inspiration." },
      }, required:["project_type"] },
    },
    {
      name: "generate_react_component",
      description: "Scaffold a React component combining Stitch patterns, Tailwind v4, and High-end Design Taste.",
      inputSchema: { type:"object", properties: {
        component_name: { type:"string", description:"Name of the component (e.g., 'HeroSection')." },
        requirements: { type:"string", description:"Specific features or layout requirements." },
      }, required:["component_name"] },
    },
    {
      name: "get_stitch_patterns",
      description: "Retrieve Google Stitch UI prompt templates and patterns.",
      inputSchema: { type:"object", properties: {
        type: { type:"string", description:"Type of pattern to retrieve ('landing_page', 'dashboard', 'mobile_app', or 'all').", default:"all" },
      }},
    },
    {
      name: "audit_ui_component",
      description: "Visually audits UI code against High-end Design Taste guidelines.",
      inputSchema: { type:"object", properties: {
        code: { type:"string", description:"HTML or React code snippet to audit." },
      }, required:["code"] },
    },
    {
      name: "auto_fix_accessibility",
      description: "Auto-fixes common accessibility issues in HTML (missing alts, aria-labels, alert roles).",
      inputSchema: { type:"object", properties: {
        html: { type:"string", description:"Raw HTML to fix." },
      }, required:["html"] },
    },
    {
      name: "get_r3f_patterns",
      description: "Retrieve React Three Fiber and Three.js 3D WebGL patterns.",
      inputSchema: { type:"object", properties: {
        type: { type:"string", description:"Type of pattern to retrieve ('r3f_boilerplate', 'scroll_driven_models', 'cdn_particle_system', or 'all').", default:"all" },
      }},
    },
  ],
}));

// ─── Handlers ─────────────────────────────────────────────────────────────────

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  try {
    let result;
    switch (name) {
      case "browse_awwwards":     result = await browseAwwwards(args.category||"all", args.limit||6, args.award_filter||"any"); break;
      case "browse_dribbble":     result = await browseDribbble(args.tag||"landing page", args.limit||6); break;
      case "browse_siteinspire":  result = await browseSiteInspire(args.style||"minimal", args.limit||5); break;
      case "browse_css_awards":   result = await browseCSSAwards(args.style||"agency", args.limit||5); break;
      case "browse_behance":      result = await browseBehance(args.type||"ui-ux", args.limit||5); break;
      case "browse_landbook":     result = await browseLandBook(args.type||"saas", args.limit||5); break;
      case "browse_godly":        result = await browseGodly(args.motion_type||"all", args.limit||5); break;
      case "browse_mobbin":       result = await browseMobbin(args.screen_type||"all", args.platform||"iOS", args.limit||5); break;

      case "browse_brand_designs": {
        if (args.brand) {
          result = await getDesignMd(args.brand);
        } else if (args.search) {
          result = await searchBrandDesigns(args.search);
        } else {
          result = await listDesignMdBrands();
        }
        break;
      }

      case "browse_stitch_projects": result = await searchStitchComponents(args.query); break;

      case "search_inspiration": {
        const q = args.query||"";
        const lpp = args.limit_per_source||3;
        const [aww, si, css, lb] = await Promise.allSettled([
          browseAwwwards("all", lpp),
          browseSiteInspire(q, lpp),
          browseCSSAwards(q, lpp),
          browseLandBook(q, lpp),
        ]);
        result = {
          query: q,
          sources: {
            awwwards:         aww.status==="fulfilled" ? aww.value : [],
            siteinspire:      si.status==="fulfilled"  ? si.value  : [],
            css_design_awards:css.status==="fulfilled" ? css.value : [],
            land_book:        lb.status==="fulfilled"  ? lb.value  : [],
          },
          total: [aww,si,css,lb].reduce((n,r) => n + (r.value?.length||0), 0),
        };
        break;
      }

      case "get_design_skills":
        result = DESIGN_SKILLS.filter(s => {
          const c = !args.category||args.category==="all"||s.category===args.category;
          const d = !args.difficulty||args.difficulty==="all"||s.difficulty===args.difficulty;
          return c && d;
        });
        break;

      case "get_color_palettes":       result = getColorPalettes(args.mood||"dark luxury", args.count||3); break;
      case "get_typography_pairings":  result = getTypographyPairings(args.style||"modern tech", args.count||3); break;
      case "get_layout_patterns":      result = getLayoutPatterns(args.type||"all", args.framework||"any"); break;
      case "get_component_snippets":   result = getComponentSnippets(args.component||"all", args.style||"any", args.framework||"any"); break;
      case "get_animation_library":    result = getAnimations(args.category||"all", args.trigger||"any", args.difficulty||"all"); break;
      case "get_micro_copy":           result = getMicroCopy(args.type||"all", args.context||""); break;

      case "generate_design_tokens":
        result = generateDesignTokens({
          brand_color:     args.brand_color||"#6C63FF",
          mode:            args.mode||"dark",
          scale:           args.scale||"major_third",
          rounding:        args.rounding||"balanced",
          transitions:     args.transitions||"smooth",
          include_tailwind:args.include_tailwind||false,
        });
        break;

      case "get_accessibility_guide":  result = getAccessibilityGuide(args.component||"all", args.level||"AA"); break;
      case "get_premium_taste":       result = getPremiumTaste(args.aesthetic); break;
      case "generate_design_md":      result = await generateDesignMd(args.project_type, args.brand); break;
      case "get_stitch_patterns":     result = getStitchPatterns(args.type); break;
      case "generate_react_component": result = generateReactComponent(args.component_name, args.requirements); break;
      case "audit_ui_component":      result = auditUIComponent(args.code); break;
      case "auto_fix_accessibility":  result = autoFixAccessibility(args.html); break;
      case "get_r3f_patterns":        result = getR3fPatterns(args.type); break;

      case "get_design_brief": {
        const [awwData, palette, typography, anims, landData, brandData] = await Promise.all([
          browseAwwwards("all", 3, "sotd").catch(()=>[]),
          Promise.resolve(getColorPalettes(mapMood(args.aesthetic), 1)),
          Promise.resolve(getTypographyPairings(args.aesthetic||"modern minimal", 1)),
          Promise.resolve(getAnimations("entrance","any","beginner").slice(0,2)),
          browseLandBook(args.industry||"saas", 2).catch(()=>[]),
          args.brand ? getDesignMd(args.brand) : Promise.resolve(null)
        ]);
        const skills     = DESIGN_SKILLS.filter(s => s.recommended_for?.includes(args.industry)||s.recommended_for?.includes("all")).slice(0,4);
        const components = getComponentSnippets("button", mapStyle(args.aesthetic), "any");
        const layout     = getLayoutPatterns("hero","any")[0];
        const tokens     = generateDesignTokens({ brand_color: palette[0]?.colors?.[5]?.hex||"#6C63FF", mode: args.aesthetic?.includes("dark") ? "dark" : "light" });
        const copy       = getMicroCopy("cta","");
        const premiumTaste = getPremiumTaste(args.aesthetic);
        const stitchPrompt = generateStitchPrompt(args.project_type, args.aesthetic, args.brand);
        const r3fPatterns = args.aesthetic?.toLowerCase().includes("3d") || args.aesthetic?.toLowerCase().includes("spatial") || args.aesthetic?.toLowerCase().includes("webgl") ? getR3fPatterns("all") : null;

        result = {
          project:              args.project_type,
          aesthetic:            args.aesthetic||"modern minimal",
          industry:             args.industry||"tech",
          brand_inspiration:    brandData,
          premium_taste:        premiumTaste,
          stitch_optimized_prompt: stitchPrompt,
          spatial_ui_guidelines: r3fPatterns,
          design_direction:     getDirection(args),
          color_palette:        palette[0],
          typography:           typography[0],
          css_tokens_preview:   tokens.css_output.slice(0,800) + "\n/* ... */",
          hero_layout:          layout,
          recommended_component:components[0],
          recommended_animations:anims.map(a=>a.name),
          recommended_skills:   skills.map(s=>s.name),
          cta_copy_suggestions: copy.slice(0,3).map(c=>({ strong:c.strong, why:c.why })),
          inspiration_sites:    awwData.slice(0,3),
          landing_page_reference:landData[0]||null,
          implementation_checklist: getChecklist(args),
          tips:                 getTips(args),
        };
        break;
      }

      default: throw new Error(`Unknown tool: ${name}`);
    }
    return { content:[{ type:"text", text:JSON.stringify(result, null, 2) }] };
  } catch (err) {
    return { content:[{ type:"text", text:JSON.stringify({ error:err.message, tool:name }) }], isError:true };
  }
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mapMood(a="") {
  const m = { "minimal clean":"monochrome","bold experimental":"neon cyberpunk","dark premium":"dark luxury","playful colorful":"startup energy","corporate professional":"corporate trust","retro nostalgic":"retro 80s","modern minimal":"monochrome" };
  return m[a.toLowerCase()]||"dark luxury";
}
function mapStyle(a="") {
  const m = { "dark premium":"dark","bold experimental":"brutalist","playful colorful":"rounded","corporate professional":"clean","modern minimal":"minimal" };
  return m[a.toLowerCase()]||"dark";
}
function getDirection(args) {
  const d = {
    "dark premium": "Near-black bg (#0A0A0A), gold/violet single accent, thin serif display, generous whitespace, noise texture overlay, glow on hover.",
    "bold experimental": "Oversized type breaking grid, asymmetric layouts, bright accent on black/white, hover distortions, cursor effects.",
    "minimal clean": "80% whitespace, one accent used sparingly, geometric sans, 2 weights max, micro-animations only.",
    "playful colorful": "Rounded corners (16–24px), pastel gradients, bouncy spring easing, friendly display font, illustrations as hero.",
    "corporate professional": "Navy/blue on white, 12-col grid, trust signals above fold, AA contrast throughout, clear CTA hierarchy.",
    "retro nostalgic": "Muted warm tones (terracotta, sage, cream), serif display, grain texture, slightly imperfect spacing.",
    "modern minimal": "Off-white or near-black, one strong accent, tight heading tracking, thin display weight, whitespace as design.",
  };
  return d[args.aesthetic?.toLowerCase()]||"Clean grid, typographic hierarchy, brand accent, smooth transitions.";
}
function getChecklist(args) {
  return [
    "☐ Define CSS custom properties (run generate_design_tokens first)",
    "☐ Typographic scale: display / heading / body / caption / label",
    "☐ Spacing scale: 4px base — use tokens only, no magic numbers",
    `☐ Color mode: ${args.aesthetic?.includes("dark")?"dark-first bg: #0A0A0A":"light-first bg: #FAFAFA"}`,
    "☐ Add :focus-visible styles before writing any other CSS",
    "☐ Skip link as first focusable element in <body>",
    "☐ Noise texture overlay on hero section",
    "☐ IntersectionObserver scroll-reveal for below-fold sections",
    "☐ All inputs have <label> elements",
    "☐ Wrap all animations in @media (prefers-reduced-motion: no-preference)",
    "☐ All icon-only buttons have aria-label",
    "☐ WCAG AA contrast check (webaim.org/resources/contrastchecker)",
    "☐ 44px min touch targets on mobile",
    "☐ Skeleton loaders for async content",
    "☐ Test: 375px, 390px, 430px (mobile), 768px (tablet), 1280px (desktop)",
  ];
}
function getTips(args) {
  const it = { tech:"Show a code sample or demo in the hero — developers need proof",fashion:"Full-bleed hero photography is non-negotiable",finance:"Place SOC2/encryption signals in the top nav zone",health:"WCAG AA+ contrast; never colour-only meaning",food:"Warm reds/oranges increase appetite",creative:"One bold interaction tells clients everything",gaming:"Dark + neon signals the genre — break only intentionally",education:"Progress indicators reduce long-form abandonment" };
  return [
    `Establish visual hierarchy in the first 200px of viewport`,
    `Use CSS custom properties from day one — theme changes cost nothing`,
    it[args.industry||"tech"]||"Clear value prop above fold converts more than any design technique",
    `Hero: one headline, one sub, one CTA. No exceptions.`,
    `will-change: transform on all animated elements prevents paint thrashing`,
    `Defer non-critical JS — your ${args.industry} users expect sub-2s load`,
  ];
}

// ─── Start ────────────────────────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("✦ Design Inspiration MCP v3.5");
  console.error("  Sources (11): Awwwards · Dribbble · SiteInspire · CSS Awards · Behance · Land-book · Godly · Mobbin · Brand-Systems · Stitch · Search");
  console.error("  Skills (14): Colors · Type · Layout · Components · Animations · Micro-copy · Tokens · A11y · Techniques · Taste · MD-Writer · UI-Auditor · Stitch-Patterns · Three-JS");
  console.error("  Synthesis: get_design_brief");
}
main().catch(console.error);
