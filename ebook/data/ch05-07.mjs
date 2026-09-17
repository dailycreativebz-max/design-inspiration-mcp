// Chapters 5–7: no-cook meals, hot-water & one-pot meals, the 30-day menu system
// Recipe card placeholders are rendered by build.mjs from data/recipes.mjs

export const CH_05_07 = [
  // ───────────────────────────── CHAPTER 5 ─────────────────────────────
  {
    slug: "ch05", chapter: 5, group: "Chapter 5", nav: "No-Cook Meals",
    title: "No-Cook Meals",
    dek: "Twenty-two meals that need no heat, no electricity and barely any water — the layer that carries the first 72 hours.",
    body: `
<h2>Six ways a meal can work without power</h2>
<table class="data">
  <thead><tr><th style="width:1.6in;">Meal class</th><th>Definition</th><th style="width:2.3in;">When it's the right choice</th></tr></thead>
  <tbody>
    <tr><td><strong>No-cook</strong></td><td>Assembly only — open, mix, eat</td><td>Any outage; the first 24 hours especially</td></tr>
    <tr><td><strong>Ready-to-eat</strong></td><td>Fully cooked in the can or pouch (canned chicken, ham, chili)</td><td>When protein is the priority</td></tr>
    <tr><td><strong>Hot-water</strong></td><td>Steeped or rehydrated with boiled water, no simmering</td><td>Days 2+ when you have a little fuel</td></tr>
    <tr><td><strong>One-pot</strong></td><td>A single pot, one cleanup</td><td>When fuel and water allow real cooking</td></tr>
    <tr><td><strong>Fuel-intensive</strong></td><td>Long simmers (split peas, dry beans)</td><td>Only when fuel is plentiful</td></tr>
    <tr><td><strong>Evacuation</strong></td><td>Eaten from the package, zero dishes, survives a hot car</td><td>Go-bags, car kits, shelters</td></tr>
  </tbody>
</table>
<div class="callout callout--tip">
  <div class="callout__label">The leftover rule for every recipe in this chapter</div>
  <p>Without reliable refrigeration, cook and open <strong>only what will be eaten this meal</strong>. Anything
  perishable left at room temperature beyond 2 hours (1 hour when it's above 90 °F) belongs in the trash —
  "when in doubt, throw it out" (USDA). Single-serve packaging is your best tool for enforcing this.</p>
</div>
{{recipes:cat=nocook}}`,
  },

  // ───────────────────────────── CHAPTER 6 ─────────────────────────────
  {
    slug: "ch06", chapter: 6, group: "Chapter 6", nav: "Hot-Water &amp; One-Pot Meals",
    title: "Hot-Water and One-Pot Meals",
    dek: "Forty-eight hot meals built around the two cheapest capabilities in emergency cooking: boiling water and washing one pot.",
    body: `
<h2>Hot-water cooking: the fuel thriftiest method</h2>
<div class="cols-2">
<p>Some foods only need to sit in boiling water — couscous, instant rice, instant potatoes, quick oats, ramen and
small pasta in a good thermos. Bring water to a boil once, pour, cover, walk away. Compared with simmering a pot
for twenty minutes, this cuts fuel use dramatically, and it works on a single small canister stove or even over
boiled water carried in a thermos.</p>
<p>One-pot meals are the next rung: everything happens in a single pot — pasta and sauce, rice and beans, soup
from cans. One pot means one cleanup, which means the little water you spend washing dishes stays little.</p>
</div>
<h3>The four rules of hot-water thrift</h3>
<ul class="small">
  <li><strong>Cover the pot.</strong> A lid shortens boil time and saves fuel on every single meal.</li>
  <li><strong>Cook short grains first.</strong> Instant rice, couscous and quick oats before pasta; pasta before dry beans.</li>
  <li><strong>Use the package ratio.</strong> Absorbed water is free dishwater — drained water is spent twice.</li>
  <li><strong>Batch only when safe.</strong> Cook extra only if leftovers can be eaten within 2 hours, kept above 140 °F, or chilled below 40 °F — otherwise cook per meal.</li>
</ul>
{{recipes:cat=hotwater}}`,
  },
  {
    slug: "ch06-onepot", group: "Chapter 6", nav: "One-Pot Meals (continued)",
    title: "One-Pot Meals",
    body: `
<div class="callout callout--note">
  <div class="callout__label">Canned food is already cooked</div>
  <p>Canned meats, beans, soups and vegetables are fully cooked during canning. You are heating them, not cooking
  them — which is why most one-pot meals here finish in 25 minutes or less. Do not cook from cans over open flame
  unless the label says the can is safe for that; transfer to a pot instead.</p>
</div>
{{recipes:cat=onepot}}`,
  },

  // ───────────────────────────── CHAPTER 7 ─────────────────────────────
  {
    slug: "ch07", chapter: 7, group: "Chapter 7", nav: "The 30-Day Menu System",
    title: "The 30-Day Menu System",
    dek: "What to eat first, what to save, and a month of menus your family has already tasted — plus the power-outage timeline that protects your refrigerator food.",
    body: `
<h2>The chronological plan: what to eat, in order</h2>
<table class="data allow-break">
  <caption>Power-outage eating order (USDA food-safety guidance)</caption>
  <thead><tr><th style="width:1.1in;">Phase</th><th>Eat / do</th><th>Avoid</th></tr></thead>
  <tbody>
    <tr><td><strong>First hours</strong></td><td>Keep fridge and freezer doors closed — note the outage time. Eat ready-to-eat pantry foods. Perishables first only if the outage looks brief: the closed fridge keeps food safe up to 4 hours; a full freezer about 48 hours, half-full about 24.</td><td>Opening doors "to check." Cooking big meals while you still have fridge food to use.</td></tr>
    <tr><td><strong>First 24 h</strong></td><td>Shift to no-cook pantry meals. Use thawing freezer items next if they are still cold (40 °F or below or with ice crystals). Start tracking water by marking jugs. Save fuel.</td><td>Using the oven "to heat the house." Wasting boiling water on drains.</td></tr>
    <tr><td><strong>Days 2–3</strong></td><td>Introduce hot-water and one-pot meals. Discard fridge perishables that passed the 4-hour mark above 40 °F (see Chapter 9 table). Manage sanitation: hand sanitizer, disposable plates, outdoor dishwater.</td><td>Tasting questionable food to test it. Saving opened leftovers without cold control.</td></tr>
    <tr><td><strong>Days 4–7</strong></td><td>Rotate into the fuller pantry menu below. Preserve water and fuel with low-water recipes. Review inventory and note what your household actually ate.</td><td>Letting morale slide — schedule a comfort meal and a treat day.</td></tr>
    <tr><td><strong>Beyond a week</strong></td><td>Run the 30-day menu grid; recalculate water and fuel weekly; adjust portions to appetite; plan replenishment runs when stores reopen.</td><td>Sticking to a menu your family is rejecting — swap meals, keep calories.</td></tr>
  </tbody>
</table>
<div class="callout callout--safety">
  <div class="callout__label">Never gamble with the fridge</div>
  <p>Do not assume food is fine because it "looks okay." Pathogens do not change taste, smell or appearance —
  verify with an appliance thermometer and follow the keep/discard table in Chapter 9. When in doubt, throw it out.</p>
</div>
<h2>The 30-day menu grid</h2>
<p class="small muted">Four weekly templates that repeat with swaps. Every entry names a recipe in this book or a
simple assembly from your layers. Portions scale to your household; breakfasts and snacks pull from Layers 1–2.</p>
{{menu-grid}}
<div class="callout callout--tip">
  <div class="callout__label">Make it yours</div>
  <p>Copy the grid onto the worksheet in the back matter and replace any meal your family scored below 4/5. The
  goal is a menu you have already eaten — the emergency just changes the cooking method.</p>
</div>`,
  },
  {
    slug: "ch07-rotation", group: "Chapter 7", nav: "Store It · Eat It · Replace It",
    title: "Store It, Eat It, Replace It",
    dek: "The rotation engine that keeps your emergency supply fresh, familiar and paid for.",
    body: `
<h2>The monthly pantry meal</h2>
<p>Once a month, the household eats one full day of meals entirely from the emergency supply. Breakfast from the
breakfast list, two main meals from Chapters 5–6, snacks from Layer 1. The meal accomplishes three things at
once: it rotates stock, it scores meals under realistic conditions, and it teaches everyone where everything is.
Score each dish on the taste-test sheet — five stars is a repeat, three or below is a donate-and-replace.</p>
<h2>Use one, replace one</h2>
<table class="data">
  <thead><tr><th style="width:2in;">What happened</th><th>The rule</th></tr></thead>
  <tbody>
    <tr><td>Ate a can of chili from the emergency shelf</td><td>Add chili to the next grocery list — same item, same size</td></tr>
    <tr><td>Used a gallon of stored water</td><td>Rotate a fresh gallon in; mark the date on it</td></tr>
    <tr><td>Ate cereal from the pantry box</td><td>Move the newest box to the back; buy one to refill the front</td></tr>
    <tr><td>Opened a jar of peanut butter</td><td>Write the open date on the lid; plan its partner jar next</td></tr>
  </tbody>
</table>
<h2>The meal scoring system</h2>
<table class="data">
  <thead><tr><th style="width:1in;">Score</th><th>Meaning</th><th style="width:1.8in;">Action</th></tr></thead>
  <tbody>
    <tr><td><strong>5 / 5</strong></td><td>Household favorite — would eat on any night</td><td>Stock extra; anchor of the menu grid</td></tr>
    <tr><td><strong>4 / 5</strong></td><td>Good, with small tweaks (spice level, topping)</td><td>Keep; note the tweak on the card</td></tr>
    <tr><td><strong>3 / 5</strong></td><td>Acceptable, unexciting</td><td>Keep in rotation, don't expand</td></tr>
    <tr><td><strong>2 / 5</strong></td><td>Eaten reluctantly</td><td>Use up, do not rebuy</td></tr>
    <tr><td><strong>1 / 5</strong></td><td>Rejected — kids pushed it away</td><td>Donate or discard; never stock again</td></tr>
  </tbody>
</table>
<div class="callout callout--note">
  <div class="callout__label">Why scoring beats stockpiling</div>
  <p>A pantry of ten five-star meals outperforms a pantry of forty untested ones in every measurable way:
  acceptance, rotation speed and cost. Scoring is the cheapest insurance against the classic failure — buying
  food you will never eat, twice.</p>
</div>`,
  },
];
