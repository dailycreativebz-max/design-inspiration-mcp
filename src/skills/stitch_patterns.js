import { getPremiumTaste } from "./design_intel.js";

/**
 * Stitch UI Patterns
 * Patterns derived from stitch-ui-design skill for prompting Google Stitch
 */

export const STITCH_PATTERNS = {
  landing_page: {
    name: "SaaS Landing Page",
    prompt_template: `SaaS landing page for [product name]
Sections:
- Hero with headline, subheadline, CTA, and product screenshot
- Social proof with customer logos
- Features grid (3 columns) with icons
- Testimonials carousel
- Pricing table (3 tiers)
- FAQ accordion
- Footer with links and newsletter signup
Style: Modern, professional, trust-building
Platform: Responsive web (desktop-first)`
  },
  dashboard: {
    name: "Admin Dashboard",
    prompt_template: `Admin dashboard for [platform type]
Layout:
- Left sidebar navigation with collapsible menu
- Top bar with search, notifications, and user profile
- Main content area with:
  - Stats overview (4 metric cards)
  - Recent activity table with actions
  - Data visualization charts
Style: Clean, data-focused, professional, high visual density
Platform: Desktop web (1440px)`
  },
  mobile_app: {
    name: "Mobile App Flow",
    prompt_template: `Mobile app [screen type]
Components:
- Top app bar with actions
- Main content area
- Bottom navigation
Style: Touch-friendly, minimal, clear hierarchy
Platform: iOS mobile (375px width)`
  }
};

export function getStitchPatterns(type = "all") {
  if (type === "all") return STITCH_PATTERNS;
  return STITCH_PATTERNS[type] || STITCH_PATTERNS;
}

export function generateReactComponent(name, requirements) {
  const taste = getPremiumTaste();
  
  return `import React from 'react';
import { motion } from 'framer-motion';

/**
 * ${name}
 * Requirements: ${requirements || 'None specified'}
 * 
 * Engineering Rules Applied:
 * ${taste.engineering_rules.join('\n * ')}
 */
export default function ${name}() {
  return (
    <section className="min-h-[100dvh] w-full bg-zinc-950 text-zinc-50 px-4 py-12 md:p-24 flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Anti-Center Bias: Left-aligned content */}
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-4xl md:text-6xl tracking-tighter leading-none font-geist font-medium">
            High-Agency <br />
            <span className="text-zinc-500">Design Engineering</span>
          </h1>
          <p className="text-base text-zinc-400 leading-relaxed max-w-[65ch]">
            This component adheres to strict design constraints including Liquid Glass, 
            deterministic typography, and absolute avoidance of the h-screen anti-pattern.
          </p>
          
          <motion.button 
            whileHover={{ scale: 0.98, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full bg-white text-zinc-950 font-medium 
                       shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-transform"
          >
            Execute Action
          </motion.button>
        </div>

        {/* Liquid Glass Card */}
        <div className="md:col-span-1 rounded-[2.5rem] bg-white/5 backdrop-blur-xl 
                        border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] 
                        p-8 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="text-xs tracking-widest uppercase text-zinc-500 font-mono">Status</div>
            <div className="text-2xl tracking-tight">Active</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
        </div>

      </div>
    </section>
  );
}
`;
}
