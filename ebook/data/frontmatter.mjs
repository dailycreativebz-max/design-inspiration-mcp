// Front matter pages — cover through quick-start checklist

export const FRONT_MATTER = [
  {
    slug: "cover", folio: "", hideHeader: true, cls: "cover",
    body: `
<div class="cover__inner">
  <div class="cover__brand">Food Opsec · Household Resilience Series</div>
  <div class="cover__rule"></div>
  <h1>THE EMERGENCY FOOD PLAYBOOK</h1>
  <p class="cover__sub">30 Days of Affordable, High-Protein Meals for Power Outages, Hurricanes,
  Winter Storms and Supply Disruptions — built from ordinary grocery-store food, not survival buckets.</p>
  <div class="cover__grid">
    <div><b>70</b>shelf-stable recipes with water and fuel counts</div>
    <div><b>30 days</b>menu system with rotation built in</div>
    <div><b>10</b>disaster-specific playbooks</div>
    <div><b>$0 panic</b>calm, sourced, budget-first planning</div>
  </div>
  <div class="cover__foot">
    <div>
      <div class="cover__author-label">Author</div>
      <div class="cover__author">Food Opsec</div>
    </div>
    <div class="fine" style="color:#B9C6D6; font-size:9px;">U.S. EDITION · LETTER SIZE</div>
  </div>
</div>`,
  },
  {
    slug: "title", title: "Title",
    body: `
<div class="front" style="text-align:center; padding-top:1.4in;">
  <div class="kicker" style="color:var(--amber-ink);">The Complete U.S. Household System</div>
  <h1 style="font-size:44px; line-height:1.05;">THE EMERGENCY<br>FOOD PLAYBOOK</h1>
  <p style="max-width:5.2in; margin:18px auto 0; font-size:15.5px; color:var(--gray);">
    30 Days of Affordable, High-Protein Meals for Power Outages, Hurricanes,
    Winter Storms and Supply Disruptions</p>
  <div class="rule" style="margin:26px auto;"></div>
  <p style="font-family:var(--font-display); font-weight:700; letter-spacing:0.06em; color:var(--navy);">Food Opsec</p>
</div>`,
  },
  {
    slug: "copyright", title: "Copyright",
    body: `
<div class="front">
  <h1>Copyright</h1><div class="rule"></div>
  <div class="small" style="max-width:6.4in; line-height:1.65;">
    <p><strong>The Emergency Food Playbook:</strong> 30 Days of Affordable, High-Protein Meals for Power
    Outages, Hurricanes, Winter Storms and Supply Disruptions. First edition, 2026.</p>
    <p>Copyright © 2026 Food Opsec. All rights reserved. No part of this publication may be reproduced,
    distributed, or transmitted in any form without prior written permission of the author, except for brief
    quotations in reviews.</p>
    <p class="muted">All recipes in this book are original formulations using shelf-stable grocery ingredients.
    Product names that may appear (for example, brand names of canned meats or boxed meals) are referenced
    generically and are trademarks of their respective owners; no endorsement or affiliation is implied.</p>
    <p class="muted">Safety information reflects U.S. federal guidance (USDA, FDA, FEMA, CDC, EPA) and
    university-extension publications available at the time of writing. Guidance can change; where this book and
    current official guidance differ, follow current official guidance and the instructions on your own products.</p>
    <p class="muted">Prices, costs and availability are variable and given only as rough planning examples.
    Nothing in this book is medical advice.</p>
    <p class="muted">Printed and formatted for U.S. Letter paper (8.5 × 11 in).</p>
  </div>
</div>`,
  },
  {
    slug: "disclaimer", title: "Disclaimer",
    body: `
<div class="front">
  <h1>Disclaimer</h1><div class="rule"></div>
  <div class="small" style="max-width:6.4in; line-height:1.65;">
    <p>This book is general educational information about household food preparedness. It is not medical,
    nutritional or safety advice, and it does not guarantee outcomes in any emergency. Every household, home,
    climate and disaster is different.</p>
    <ul>
      <li>Consult a physician, registered dietitian or pediatrician before changing anyone's diet, and always for
      infant feeding, pregnancy, kidney disease, diabetes, heart conditions, sodium-restricted diets, allergies
      or any medical diet.</li>
      <li>Never dilute infant formula. Ready-to-feed formula is the safest emergency option per CDC guidance.</li>
      <li>Follow current USDA, FDA, FEMA/Ready.gov, CDC, EPA and local public-health guidance. This book cannot
      update itself; you can.</li>
      <li>Verify every product you buy: serving sizes, nutrition, allergens, dates and preparation instructions
      come from the label in your hands, not from this book.</li>
      <li>Food safety rules in this book assume U.S. household conditions. When in doubt, throw it out.</li>
    </ul>
    <div class="callout callout--safety">
      <div class="callout__label">If someone may be in danger</div>
      <p>Call 911 for life-threatening emergencies. For possible poisoning (including suspected carbon monoxide
      or chemical exposure), call Poison Control at 1-800-222-1222. For local assistance during and after
      disasters, call 211.</p>
    </div>
  </div>
</div>`,
  },
  {
    slug: "how-to-use", title: "How to Use This Book",
    body: `
<div class="front">
  <h1>How to Use This Book</h1><div class="rule"></div>
  <div class="small" style="line-height:1.6; max-width:6.5in;">
    <p class="lede">This book is a system, not a shopping list. It teaches your household to buy, store, cook
    and rotate emergency food on a normal grocery budget — then practice it without stress.</p>
    <h3>Read in this order the first time</h3>
    <ol>
      <li><strong>Chapters 1–2</strong>: the problem and the three-layer pantry model — five minutes each.</li>
      <li><strong>Chapter 4</strong>: your first week of shopping. Stop reading and go buy Week&nbsp;1.</li>
      <li><strong>Chapters 5–7</strong>: the meals and the 30-day menu, once your first supplies are home.</li>
      <li><strong>Everything else</strong> is reference material — return to it as you build.</li>
    </ol>
    <h3>How to read recipe cards</h3>
    <p>Every recipe carries the same spec strip, so you can plan without surprises:</p>
    <table class="data">
      <tbody>
        <tr><td style="width:1.4in;"><strong>METHOD</strong></td><td>No-cook · Hot-water · One-pot (see the method key in Chapter 5)</td></tr>
        <tr><td><strong>WATER</strong></td><td>Approximate water needed, and whether it is absorbed, drained or creates dishwater</td></tr>
        <tr><td><strong>FUEL</strong></td><td>No-cook · Hot water only · Low · Moderate · High</td></tr>
        <tr><td><strong>DISHES</strong></td><td>Number of pots/bowls to wash — 0 means eat from the package</td></tr>
      </tbody>
    </table>
    <p>Nutrition is deliberately not printed on cards. Brands differ enormously; the only honest instruction is:
    <strong>check the nutrition label for your chosen brand.</strong></p>
    <h3>The icons</h3>
    <p>Water drop = water required · flame = fuel required · pot = one pot · clock = prep time · alert = safety note.
    All worksheets in Chapter 12 and the back matter are designed to print cleanly on this same Letter paper.</p>
  </div>
</div>`,
  },
  {
    slug: "safety-notice", title: "Emergency Safety Notice",
    body: `
<div class="front">
  <h1>Emergency Safety Notice</h1><div class="rule"></div>
  <div class="small" style="line-height:1.55; max-width:6.5in;">
    <div class="banner">
      <div class="callout__label">Carbon monoxide kills quietly</div>
      <p>Never run a generator, charcoal grill, camp stove, propane heater or any fuel-burning device indoors,
      in a garage, or in any enclosed or partially enclosed space unless it is specifically approved for that
      environment and used exactly as directed. Run generators outdoors at least 20 feet from windows, doors and
      vents, with exhaust pointed away. Keep a battery-powered or battery-backup carbon monoxide alarm working
      whenever a generator is in use. Symptoms — headache, dizziness, weakness, nausea, confusion — mean get into
      fresh air immediately and call 911.</p>
    </div>
    <table class="data">
      <caption>The five numbers that protect your food</caption>
      <tbody>
        <tr><td style="width:2in;"><strong>4 hours</strong></td><td>How long a closed refrigerator keeps food safely cold (USDA). After that, discard refrigerated perishables.</td></tr>
        <tr><td><strong>48 / 24 hours</strong></td><td>How long a closed full / half-full freezer keeps food safely frozen (USDA).</td></tr>
        <tr><td><strong>40 °F</strong></td><td>The cold line. Perishables held above 40 °F too long are discarded — never taste to check.</td></tr>
        <tr><td><strong>140 °F</strong></td><td>The hot line. Keep hot food at or above 140 °F; the 40–140 °F range is the bacterial Danger Zone.</td></tr>
        <tr><td><strong>2 hours</strong></td><td>Maximum time perishable food sits out — 1 hour when the air is above 90 °F (USDA).</td></tr>
      </tbody>
    </table>
    <div class="callout callout--safety">
      <div class="callout__label">Water rules</div>
      <p>When authorities issue a boil-water advisory, boil water at a rolling boil for 1 minute (3 minutes above
      6,500 feet) or disinfect per the EPA table in Chapter 3. During a flood, assume floodwater is contaminated:
      discard any food it touched unless it is in a sealed waterproof can, and follow the salvage steps in
      Chapter 9. Never ration drinking water — drink what you need today and find more for tomorrow (FEMA).</p>
    </div>
    <p class="fine">Full source citations appear in Chapter 13 and the Sources section.</p>
  </div>
</div>`,
  },
  {
    slug: "quick-start", title: "Quick-Start Checklist",
    body: `
<div class="front sheet--worksheet">
  <h1>Quick-Start Checklist</h1><div class="rule"></div>
  <p class="small muted" style="max-width:6.4in;">Do these ten things in the next two weeks. Total cost can be
  under $30 if you spread it across one normal grocery run. This is the 72-hour foundation — Chapter 4 builds it
  out to 30 days.</p>
  <table class="ws-table">
    <thead><tr><th style="width:0.4in;">Done</th><th>Action</th><th style="width:2.6in;">Notes</th></tr></thead>
    <tbody>
      <tr><td><span class="ws-box"></span></td><td>Store 3 gallons of water per person (3-day supply), or buy an equivalent case of bottled water</td><td></td></tr>
      <tr><td><span class="ws-box"></span></td><td>Put a manual can opener with the emergency food — plus a backup</td><td></td></tr>
      <tr><td><span class="ws-box"></span></td><td>Buy 9 no-cook meals your family already likes (see Chapter 5)</td><td></td></tr>
      <tr><td><span class="ws-box"></span></td><td>Buy shelf-stable protein: 4 cans tuna/chicken, 1 jar peanut butter, 2 cans beans</td><td></td></tr>
      <tr><td><span class="ws-box"></span></td><td>Check that smoke and carbon monoxide alarms work; add batteries to your kit</td><td></td></tr>
      <tr><td><span class="ws-box"></span></td><td>Put an appliance thermometer in the refrigerator and freezer today</td><td></td></tr>
      <tr><td><span class="ws-box"></span></td><td>Freeze two jugs of water to extend freezer cold-time and use as cooler ice</td><td></td></tr>
      <tr><td><span class="ws-box"></span></td><td>Note where you would cook outdoors 20+ feet from the house</td><td></td></tr>
      <tr><td><span class="ws-box"></span></td><td>Fill the pantry inventory sheet (back matter) with what you just bought</td><td></td></tr>
      <tr><td><span class="ws-box"></span></td><td>Pick one Saturday this month to eat a pantry meal as practice</td><td></td></tr>
    </tbody>
  </table>
  <p class="ws-note">Progress beats perfection. A household that stores three days of food it actually eats is
  better prepared than one with an untouched 30-day bucket it cannot afford.</p>
</div>`,
  },
];
