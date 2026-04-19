/**
 * UI Auditor Skill
 * Visually audits UI code against High-end Design Taste guidelines.
 */

export function auditUIComponent(code) {
  const issues = [];
  
  if (code.includes('h-screen')) {
    issues.push({
      rule: 'Viewport Stability',
      message: 'h-screen detected. NEVER use h-screen. ALWAYS use min-h-[100dvh] to prevent layout jumping on mobile browsers.'
    });
  }

  if (code.includes('#000000') || code.includes('bg-black') || code.includes('text-black')) {
    issues.push({
      rule: 'Pure Black Banned',
      message: 'Pure black (#000000) detected. Use Off-Black, Zinc-950, or Charcoal instead.'
    });
  }

  if (code.includes('Inter')) {
    issues.push({
      rule: 'Typography Slop',
      message: 'Inter font detected. Banned for high-end design. Use Geist, Outfit, Cabinet Grotesk, or Satoshi.'
    });
  }

  if (code.match(/['"]John Doe['"]/) || code.match(/['"]Jane Doe['"]/)) {
    issues.push({
      rule: 'Generic AI Tells',
      message: 'Generic name "John Doe" detected. Use highly creative, realistic-sounding names.'
    });
  }
  
  if (code.match(/rounded-.*shadow-/) && !code.includes('shadow-[inset')) {
    issues.push({
      rule: 'Generic Cards',
      message: 'Standard shadow card detected. For high-end design, consider Liquid Glass Refraction or using logic-grouping via border-t or negative space.'
    });
  }

  const score = Math.max(0, 100 - (issues.length * 20));

  return {
    score,
    passed: issues.length === 0,
    issues: issues.length ? issues : ["Perfect adherence to High-Agency design constraints."],
  };
}
