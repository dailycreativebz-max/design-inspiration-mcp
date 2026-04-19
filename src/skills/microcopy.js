// ─── Micro-copy Library ────────────────────────────────────────────────────────
// Curated copy patterns with psychological rationale.
// Each entry explains WHY the copy works, not just what it says.

export const MICROCOPY_LIBRARY = {

  // ── CTA Buttons ─────────────────────────────────────────────────────────────
  cta: [
    {
      context: "Free tier / SaaS signup",
      weak: "Sign Up",
      strong: "Start for free",
      why: "'Start' implies momentum and action. 'for free' removes the #1 objection (cost) from the button itself.",
      variants: [
        "Get started for free",
        "Try it free — no credit card",
        "Create your free account",
        "Get [Product] free",
      ],
      tone: "action-forward",
    },
    {
      context: "Waitlist / beta signup",
      weak: "Join waitlist",
      strong: "Get early access",
      why: "'Early access' frames exclusivity as a benefit, not a limitation. 'Waitlist' sounds like queuing at the DMV.",
      variants: [
        "Request early access",
        "Join the beta",
        "Get early access →",
        "Reserve your spot",
      ],
      tone: "exclusive",
    },
    {
      context: "Demo / product preview",
      weak: "Watch demo",
      strong: "See it in action",
      why: "'See it in action' is specific and visual — you're promising a real demonstration, not a sales video.",
      variants: [
        "Watch a 2-min demo",
        "See how it works",
        "Take a product tour",
        "Explore a live demo →",
      ],
      tone: "low-pressure",
    },
    {
      context: "Upgrade / paid tier",
      weak: "Upgrade",
      strong: "Unlock [Feature]",
      why: "Naming the specific feature they get removes ambiguity. 'Upgrade' is generic; 'Unlock Team Reports' is concrete.",
      variants: [
        "Upgrade to Pro",
        "Unlock unlimited exports",
        "Go to Pro →",
        "Upgrade for [specific benefit]",
      ],
      tone: "value-focused",
    },
    {
      context: "Newsletter subscribe",
      weak: "Subscribe",
      strong: "Get the weekly digest",
      why: "Describes the deliverable (frequency + format), not the action (subscribe). Sets expectations, reduces friction.",
      variants: [
        "Send me the newsletter",
        "Join 12,000 designers",
        "Yes, keep me posted",
        "Get weekly tips →",
      ],
      tone: "descriptive",
    },
    {
      context: "Download / install",
      weak: "Download",
      strong: "Download for [Platform] — Free",
      why: "Specifies platform (no confusion) and reinforces free. Two objections handled in one CTA label.",
      variants: [
        "Download for Mac",
        "Install Chrome Extension",
        "Get the iOS App",
        "Download (macOS, 14MB)",
      ],
      tone: "specific",
    },
    {
      context: "Contact sales / enterprise",
      weak: "Contact us",
      strong: "Talk to our team",
      why: "'Talk to our team' is human and direct. 'Contact us' sounds like you'll fill a form and wait 3 days.",
      variants: [
        "Book a demo",
        "Chat with sales",
        "Schedule a call",
        "Get a custom quote",
      ],
      tone: "human",
    },
  ],

  // ── Hero Headlines ─────────────────────────────────────────────────────────
  headlines: [
    {
      pattern: "Outcome-first",
      formula: "[Achieve outcome] [without pain/complexity]",
      example: "Ship faster. Sleep better.",
      why: "Leads with the benefit the user wants, not what your product does. Implies the solution without describing it.",
      examples: [
        "Write code. Not tickets.",
        "More revenue. Less churn.",
        "Design faster. Build better.",
        "Your team, in sync.",
      ],
    },
    {
      pattern: "Reframe the category",
      formula: "The [new adjective] way to [existing behaviour]",
      example: "The modern way to manage money.",
      why: "Positions against incumbents by implying they're outdated. Creates a category of one.",
      examples: [
        "A better way to send email.",
        "The fastest issue tracker ever made.",
        "Analytics that make sense.",
        "The email client, reimagined.",
      ],
    },
    {
      pattern: "Specificity wins",
      formula: "[Specific number/claim] [specific thing]",
      example: "Deploy in 35 seconds.",
      why: "Specificity is credibility. '35 seconds' is more believable and memorable than 'deploy fast'.",
      examples: [
        "10x faster than Jira.",
        "Cut support tickets by 40%.",
        "From idea to launch in a weekend.",
        "Used by 4,000+ product teams.",
      ],
    },
    {
      pattern: "Aspirational identity",
      formula: "For [aspired identity who] [do meaningful thing]",
      example: "For teams that ship.",
      why: "Users buy the identity, not the product. 'Teams that ship' creates aspiration through self-selection.",
      examples: [
        "Built for the best engineering teams.",
        "For developers who care about UX.",
        "For brands that mean something.",
        "Made for ambitious companies.",
      ],
    },
    {
      pattern: "Contrast statement",
      formula: "[Common approach]. [Better approach].",
      example: "Stop guessing. Start knowing.",
      why: "Two short sentences. Implicit critique of the old way, implicit promise of the new way.",
      examples: [
        "Less meetings. More momentum.",
        "Fewer tools. More focus.",
        "No more spreadsheets. Finally.",
        "Stop copying. Start creating.",
      ],
    },
  ],

  // ── Error Messages ─────────────────────────────────────────────────────────
  errors: [
    {
      context: "Form field — email invalid",
      bad: "Invalid email address",
      good: "Enter a valid email — like hello@example.com",
      why: "Shows an example of what valid looks like. 'Invalid' is a system error; the good version guides the user.",
    },
    {
      context: "Form field — required",
      bad: "This field is required",
      good: "Add your email to continue",
      why: "Explains why the field matters and what action to take, not just flags an error state.",
    },
    {
      context: "Password too short",
      bad: "Password must be at least 8 characters",
      good: "Use 8+ characters — try a short phrase",
      why: "Tips the user toward a solution (passphrase) which is actually more secure and easier to remember.",
    },
    {
      context: "Network / server error",
      bad: "Error 500: Internal server error",
      good: "Something went wrong on our end. Try again in a moment — we're on it.",
      why: "Takes ownership ('our end'), gives action ('try again'), reassures ('we're on it'). Never expose error codes to users.",
    },
    {
      context: "No search results",
      bad: "No results found",
      good: "No results for '[query]' — try different keywords or browse all",
      why: "Repeats the query (confirms you searched), offers two exits (refine vs browse). Prevents dead ends.",
    },
    {
      context: "Empty state — no data yet",
      bad: "No items",
      good: "Nothing here yet — [action to add first item]",
      why: "Empty states should explain what belongs here AND provide the first action to fill it.",
    },
    {
      context: "Payment failed",
      bad: "Payment failed",
      good: "Your card was declined. Double-check the number and expiry, or try a different card.",
      why: "Non-alarmist. Provides two specific actions. Doesn't say 'your card is bad' — says 'double-check'.",
    },
    {
      context: "Session expired",
      bad: "Session expired. Please log in.",
      good: "You've been signed out for security. Sign back in to continue — your work is saved.",
      why: "Explains why (security, not abandonment). Reassures that work isn't lost — the #1 fear on session expiry.",
    },
  ],

  // ── Onboarding ─────────────────────────────────────────────────────────────
  onboarding: [
    {
      screen: "Welcome / First screen",
      pattern: "Name the transformation, not the product",
      bad: "Welcome to [App Name]! Here's how it works.",
      good: "Let's get you [specific outcome] in [timeframe].",
      example: "Let's get your first project live in 5 minutes.",
      why: "Users don't care about your product — they care about their outcome. Lead with that.",
    },
    {
      screen: "Permission request (push notifications)",
      pattern: "Earn the permission with value-first framing",
      bad: "Allow notifications?",
      good: "Get notified when [specific valuable event]. We'll only send the important stuff.",
      example: "Get notified when your deploy is live or a teammate mentions you.",
      why: "Specificity of what you'll receive removes the 'spam' fear. 'Only the important stuff' signals respect.",
    },
    {
      screen: "Progress / Loading",
      bad: "Loading...",
      good: "Setting up your workspace... (usually takes 10 seconds)",
      why: "Setting expectations on duration prevents anxiety. 'Setting up your workspace' shows progress, not just waiting.",
    },
    {
      screen: "First empty state",
      pattern: "Empty state is an onboarding screen",
      bad: "No projects yet",
      good: "Your first project lives here. [Create a project →]",
      why: "Empty states are onboarding opportunities. Tell them what goes here AND give the first action.",
    },
    {
      screen: "Feature introduction tooltip",
      pattern: "Show, don't tell. Value, not feature name.",
      bad: "This is the Bulk Actions menu.",
      good: "Select multiple items to edit or move them all at once — saves time on large libraries.",
      why: "Describes what you can DO with the feature (outcome), not what the feature IS (label).",
    },
    {
      screen: "Completion / Success state",
      pattern: "Celebrate + next step",
      bad: "Done!",
      good: "You're all set! [Specific what they've done] → [Next logical action]",
      example: "Your workspace is ready! Invite your team to start collaborating →",
      why: "Celebrate the achievement, then immediately redirect to the next high-value action. Maintain momentum.",
    },
  ],

  // ── Social Proof Copy ──────────────────────────────────────────────────────
  social_proof: [
    {
      context: "User count",
      weak: "Join millions of users",
      strong: "Join 400,000+ product teams",
      why: "Specificity (400,000 not 'millions') + specificity of WHO (product teams, not generic 'users'). More credible and more targeted.",
    },
    {
      context: "Testimonial attribution",
      weak: "— John D., Product Manager",
      strong: "— Sarah Chen, Head of Product at Stripe",
      why: "Company name matters more than job title. 'At Stripe' is the signal. Full name (not initial) signals it's real.",
    },
    {
      context: "Star rating",
      weak: "★★★★★ 5 stars",
      strong: "★★★★★ 4.9/5 from 2,300+ reviews",
      why: "4.9 is more credible than 5.0 (too perfect = suspicious). Number of reviews adds weight.",
    },
    {
      context: "Press mention",
      weak: "As seen in TechCrunch",
      strong: "\"The best [category] tool we've tested\" — TechCrunch",
      why: "The quote does the work. 'As seen in' is weak; a direct endorsement is strong.",
    },
  ],

  // ── Pricing Page ───────────────────────────────────────────────────────────
  pricing: [
    {
      element: "Plan names",
      bad_pattern: "Basic / Standard / Premium",
      good_pattern: "Starter / Growth / Enterprise (or persona-based: Individual / Team / Company)",
      why: "Persona-based names help users self-select. 'Premium' sounds more expensive; 'Growth' sounds like an aspiration.",
    },
    {
      element: "Price anchor",
      pattern: "Show the highest tier first (right-to-left scan) OR highlight the middle tier as 'Most Popular'",
      example: "Most Popular badge on the middle plan. Enterprise shown to the right as the price anchor.",
      why: "Anchoring to the high price makes the middle seem reasonable. Most Popular social-proofs the recommended choice.",
    },
    {
      element: "Feature list",
      bad: "✗ Advanced analytics",
      good: "Advanced analytics (available on Pro)",
      why: "Never show features as locked with an X — it creates negativity. Instead, show what tier unlocks them.",
    },
    {
      element: "CTA on free tier",
      bad: "Sign Up",
      good: "Start free — no credit card required",
      why: "Removes the #1 objection on the free plan CTA: 'will they charge me?'",
    },
    {
      element: "FAQ teaser",
      pattern: "Put 1-2 FAQs on the pricing page itself, not just a link to /faq",
      examples: ["Can I change plans later? Yes, any time.", "What payment methods do you accept?"],
      why: "FAQs reduce objections at the point of decision, not after the user has already left.",
    },
  ],

};

export function getMicroCopy(type = "all", context = "") {
  if (type === "all") {
    return Object.entries(MICROCOPY_LIBRARY).map(([key, value]) => ({
      category: key,
      count: value.length,
      preview: value[0],
    }));
  }

  const section = MICROCOPY_LIBRARY[type];
  if (!section) {
    // Fuzzy match
    const key = Object.keys(MICROCOPY_LIBRARY).find(
      (k) => k.includes(type) || type.includes(k)
    );
    if (key) return MICROCOPY_LIBRARY[key];
    return MICROCOPY_LIBRARY;
  }

  if (context) {
    const norm = context.toLowerCase();
    const filtered = section.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(norm)
    );
    return filtered.length > 0 ? filtered : section;
  }

  return section;
}
