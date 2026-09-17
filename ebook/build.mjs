#!/usr/bin/env node
// Build engine for The Emergency Food Playbook.
// Assembles data/*.mjs into U.S. Letter print pages under ebook/book/.
import { writeFileSync, mkdirSync } from "node:fs";
import { FRONT_MATTER } from "./data/frontmatter.mjs";
import { CH_01_04 } from "./data/ch01-04.mjs";
import { CH_05_07 } from "./data/ch05-07.mjs";
import { CH_08 } from "./data/ch08.mjs";
import { CH_09_11 } from "./data/ch09-11.mjs";
import { CH_12_13, BACK_MATTER } from "./data/ch12-13-back.mjs";
import { PLAYBOOKS } from "./data/playbooks.mjs";
import { RECIPES, CAT_META, TAG_META } from "./data/recipes.mjs";

const OUT = "ebook/book";
const BOOK_TITLE = "The Emergency Food Playbook";
const BOOK_SUB = "Food Opsec";

// ── Icons (single-weight stroke set) ─────────────────────────────────────────
const I = {
  water: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c3.5 4.5 6 7.7 6 11a6 6 0 0 1-12 0c0-3.3 2.5-6.5 6-11z"/></svg>`,
  flame: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c1 3-4 5.5-4 10a4 4 0 0 0 8 0c0-2-1-3.5-1-3.5s3 1.5 3 4.5a6 6 0 0 1-12 0C6 8.5 11 6.5 12 3z"/></svg>`,
  pot: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10h16M6 10v7a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-7M9 7c0-2 1-2 1-3M14 7c0-2 1-2 1-3"/></svg>`,
  clock: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>`,
  dish: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12a9 9 0 0 1 18 0M2 12h20M7 16h10"/></svg>`,
  alert: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17.5v.5"/></svg>`,
};

const byId = Object.fromEntries(RECIPES.map(r => [r.id, r]));
const rName = id => byId[id]?.name ?? id;

// ── Recipe card renderer ─────────────────────────────────────────────────────
function recipeCard(r) {
  const cls = CAT_META[r.cat].color;
  const tags = r.tags.map(t => `<span class="tag tag--${t}">${TAG_META[t] ?? t}</span>`).join("");
  const ing = r.ing.map(i => `<li>${i}</li>`).join("");
  const prep = r.prep.map(p => `<li>${p}</li>`).join("");
  const dishes = r.dishes === 0 ? "0 — from package" : String(r.dishes);
  return `<article class="recipe ${cls}" id="r-${r.id}">
  <div class="recipe__head"><h4>${r.name}</h4><span class="recipe__serves">Serves ${r.serves} · ${r.time}</span></div>
  <div class="recipe__tags">${tags}</div>
  <div class="recipe__cols">
    <div><h5>Ingredients</h5><ul>${ing}</ul></div>
    <div><h5>Preparation</h5><ol>${prep}</ol><p style="margin:2px 0 0;"><em>Subs:</em> ${r.subs}</p></div>
  </div>
  <div class="recipe__spec">
    <div class="spec"><dt>${I.pot} Method</dt><dd>${CAT_META[r.cat].label}</dd></div>
    <div class="spec"><dt>${I.water} Water</dt><dd>${r.water}</dd></div>
    <div class="spec"><dt>${I.flame} Fuel</dt><dd>${r.fuel}</dd></div>
    <div class="spec"><dt>${I.dish} Dishes</dt><dd>${dishes}</dd></div>
  </div>
  <p class="recipe__note"><strong>Storage &amp; safety:</strong> ${r.note} <strong>Nutrition:</strong> check the nutrition label for your chosen brand.</p>
</article>`;
}

function recipeSheets(recipeList, group, startTitle, slugBase) {
  const sheets = [];
  for (let i = 0; i < recipeList.length; i += 4) {
    const chunk = recipeList.slice(i, i + 4);
    const n = Math.floor(i / 4) + 1;
    sheets.push({
      slug: `${slugBase}-r${n}`,
      group, nav: `${startTitle}${recipeList.length > 4 ? ` ${n}` : ""}`,
      body: `<div class="recipe-grid">${chunk.map(recipeCard).join("")}</div>
<p class="fine muted">All recipes use shelf-stable ingredients. Approximate water values follow typical package directions — verify on your labels.</p>`,
    });
  }
  return sheets;
}

// ── Protein comparison table (Chapter 8) ─────────────────────────────────────
function proteinTable() {
  const rows = [
    ["Canned chicken", "Can / pouch", "Ready to eat; warm if fuel allows", "None (drain only)", "None", "None declared; check label", "Moderate — compare brands", "Check label"],
    ["Canned tuna", "Can / pouch", "Ready to eat", "None", "None", "Fish allergy", "Moderate–high", "Check label"],
    ["Canned salmon", "Can", "Ready to eat", "None", "None", "Fish allergy", "Moderate", "Check label"],
    ["Sardines", "Tin", "Ready to eat", "None", "None", "Fish allergy", "High", "Check label"],
    ["Canned ham / luncheon meat", "Can", "Ready to eat or warm", "None", "None", "Check sodium content", "High", "Check label"],
    ["Canned chili / stews", "Can", "Warm gently", "None", "None", "Beans = fiber; check allergens", "High", "Check label"],
    ["Canned beans", "Can", "Ready; rinse to cut sodium", "About 1 cup rinse (optional)", "None", "None declared", "Moderate (less if rinsed)", "Check label"],
    ["Dried beans", "Bag", "Soak + long simmer, or can as substitute", "About 3 cups absorbed per cup dry", "High — prefer canned when fuel is tight", "None declared", "Very low until seasoned", "Check label"],
    ["Lentils (esp. red)", "Bag", "Simmer 15–25 min (red fastest)", "About 2.5 cups absorbed per cup", "Low–moderate", "None declared", "Very low", "Check label"],
    ["Split peas", "Bag", "Simmer 35–45 min", "About 3 cups absorbed per cup", "High", "None declared", "Very low", "Check label"],
    ["Peanut butter", "Jar", "Ready to eat", "None", "None", "Peanut allergy — seed butters swap in", "Low–moderate", "Check label"],
    ["Powdered peanut butter", "Canister", "Rehydrate per label (about 2 tbsp water per 2 tbsp powder)", "About 2 tbsp per serving", "None", "Peanut allergy", "Low", "Check label"],
    ["Powdered eggs", "Canister", "Rehydrate per label; cook if fuel allows", "Per label", "Low (cooking optional for scrambles)", "Egg allergy", "Low", "Check label"],
    ["Shelf-stable protein drinks", "Carton", "Ready to drink", "None", "None", "Check dairy/soy content", "Varies — often low", "Check label"],
    ["Jerky / meat sticks", "Pouch", "Ready to eat", "None", "None", "Check allergens in marinades (soy common)", "Very high — budget water", "Check label"],
    ["Textured vegetable protein (TVP)", "Bag", "Rehydrate in hot water or broth, 5–10 min", "About 3/4 cup hot liquid per 1/2 cup dry", "Hot water only", "Check soy content", "Low", "Check label"],
  ];
  return `<table class="data allow-break">
  <caption>Shelf-stable protein compared (typical grocery formats)</caption>
  <thead><tr><th>Protein source</th><th style="width:0.8in;">Format</th><th>Preparation</th><th style="width:1.3in;">Typical water need</th><th style="width:1in;">Cooking</th><th style="width:1.2in;">Allergen notes</th><th style="width:1.1in;">Sodium notes</th><th style="width:0.7in;">Verify</th></tr></thead>
  <tbody>${rows.map(r => `<tr>${r.map((c, i) => i === 0 ? `<td><strong>${c}</strong></td>` : `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>
</table>
<p class="fine muted">Shelf-stable tofu appears in some markets in aseptic cartons; treat it like any canned protein: check the label, refrigerate after opening, and without power, eat it the same meal it is opened.</p>`;
}

// ── 30-day menu grid ─────────────────────────────────────────────────────────
function menuGrid() {
  const breakfasts = ["hw01","hw17","hw08","nc16","nc13","nc06","nc20","op24","hw18","nc03"];
  const lunches    = ["nc01","nc02","nc05","nc09","nc12","nc14","nc18","nc21","nc04","nc07","nc11","nc22","nc08","nc15","nc17","nc19","nc10","nc13","nc03","nc06","nc16","nc20","nc12","nc01","nc02","nc04","nc07","nc09"];
  const dinners    = ["op01","hw02","op04","hw06","op09","hw13","op02","hw14","op14","hw07","op16","hw10","op23","hw15","op18","hw04","op05","hw09","op22","hw12","op07","hw16","op13","hw11","op26","hw05","op10","hw20"];
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  let html = "";
  for (let w = 0; w < 4; w++) {
    const rows = days.map((d, i) => {
      const day = w * 7 + i;
      const b = breakfasts[(day + w) % breakfasts.length];
      const l = lunches[day % lunches.length];
      const dn = dinners[(day + w * 2) % dinners.length];
      return `<tr><td><strong>${d}</strong></td><td>${rName(b)}</td><td>${rName(l)}</td><td>${rName(dn)}</td></tr>`;
    }).join("");
    html += `<table class="data">
  <caption>Week ${w + 1} menu template</caption>
  <thead><tr><th style="width:0.6in;">Day</th><th>Breakfast</th><th>Lunch (no-cook)</th><th>Dinner (hot)</th></tr></thead>
  <tbody>${rows}</tbody>
</table>`;
  }
  return html + `<p class="fine muted">Snacks and morale items come from Layer 1: granola, trail mix, fruit cups, hard candy, cocoa.
Swap any cell for another recipe with the same method — the index at the back lists every option by tag.
In a real event the grid starts after fridge and freezer foods are used in safe order (see the timeline above).</p>`;
}

// ── Playbooks ────────────────────────────────────────────────────────────────
function playbookCards() {
  const card = p => `<article class="recipe recipe--nocook" style="border-top-color:var(--navy);">
  <div class="recipe__head"><h4>${p.name}</h4><span class="recipe__serves">Playbook</span></div>
  <div class="recipe__cols" style="grid-template-columns:1fr; font-size:10px;">
    <div>
      <ul style="margin-left:1em;">
        <li><strong>Likely challenge:</strong> ${p.challenge}</li>
        <li><strong>Best food format:</strong> ${p.format}</li>
        <li><strong>Water concern:</strong> ${p.water}</li>
        <li><strong>Cooking concern:</strong> ${p.cooking}</li>
        <li><strong>Storage concern:</strong> ${p.storage}</li>
        <li><strong>First actions:</strong> ${p.first.join("; ")}.</li>
        <li><strong>Avoid:</strong> ${Array.isArray(p.avoid) ? p.avoid.join("; ") : p.avoid}.</li>
        <li><strong>Stage near the exit:</strong> ${p.exit}</li>
      </ul>
    </div>
  </div>
</article>`;
  const sheets = [];
  for (let i = 0; i < PLAYBOOKS.length; i += 2) {
    sheets.push({
      slug: `ch11-pb${Math.floor(i / 2) + 1}`,
      group: "Chapter 11", nav: `Playbooks ${Math.floor(i / 2) + 1}`,
      body: `<div class="recipe-grid">${PLAYBOOKS.slice(i, i + 2).map(card).join("")}</div>`,
    });
  }
  return sheets;
}

// ── Recipe index (returns multiple sheets) ───────────────────────────────────
function recipeIndexSheets(page) {
  const row = r => `<tr><td><strong>${r.name}</strong><br><span class="fine">${r.tags.map(t => TAG_META[t]).join(" · ")}</span></td>
  <td>${r.serves}</td><td>${r.water}</td><td>${r.fuel}</td><td>${r.dishes}</td></tr>`;
  const head = `<thead><tr><th>Recipe</th><th style="width:0.6in;">Serves</th><th style="width:1.7in;">Water</th><th style="width:0.9in;">Fuel</th><th style="width:0.6in;">Dishes</th></tr></thead>`;
  const sections = [
    ["nocook", "No-cook meals"], ["hotwater", "Hot-water meals"], ["onepot", "One-pot meals"],
  ].map(([cat, label]) => {
    const list = RECIPES.filter(r => r.cat === cat);
    return { slug: `recipe-index-${cat}`, group: page.group, nav: `Recipe Index — ${label}`, body: `<h2>${label} (${list.length})</h2>
    <table class="data allow-break">${head}<tbody>${list.map(row).join("")}</tbody></table>
    <p class="fine muted">Method for all rows: ${label}. Every recipe also carries the standard label-verification note: check the nutrition label for your chosen brand.</p>` };
  });
  const tagSections = [
    ["breakfast", "Emergency breakfasts"], ["kid", "Child-friendly"], ["protein", "High-protein"],
    ["evac", "Evacuation-ready"], ["lowwater", "Low-water"], ["budget", "Budget"],
  ];
  sections.push({ slug: "recipe-index-tags", group: page.group, nav: "Recipe Index — by tag", body: `<h2>Recipes by tag</h2>
  ${tagSections.map(([tag, label]) => { const list = RECIPES.filter(r => r.tags.includes(tag)); return `<h3>${label} (${list.length})</h3><p class="small">${list.map(r => rName(r.id)).join(" · ")}</p>`; }).join("\n")}
  <p class="fine muted">Tags are not exclusive — a recipe appears under every category it satisfies. The full
  cards for all ${RECIPES.length} recipes are in Chapters 5 and 6.</p>` });
  return sections;
}

// ── Expand content placeholders into sheets ──────────────────────────────────
function expandPage(page) {
  const sheets = [];
  let body = page.body;
  const m = body.match(/\{\{recipes:cat=(\w+)\}\}/);
  if (m) {
    const [before, after] = body.split(m[0]);
    sheets.push({ ...page, body: before });
    const list = RECIPES.filter(r => r.cat === m[1]);
    const extra = recipeSheets(list, page.group, page.nav.replace(/&amp;/g, "&"), page.slug);
    sheets.push(...extra.map(s => ({ ...s, group: page.group })));
    if (after.trim()) sheets.push({ slug: `${page.slug}-tail`, group: page.group, nav: page.nav, body: after });
    return sheets;
  }
  body = body.replace("{{protein-table}}", proteinTable());
  if (body.includes("{{recipe-index}}")) return recipeIndexSheets(page);
  if (body.includes("{{menu-grid}}")) {
    const [before, after] = body.split("{{menu-grid}}");
    sheets.push({ ...page, body: before });
    const grid = menuGrid();
    // one table per week per sheet
    const weeks = grid.match(/<table class="data">\s*<caption>Week[\s\S]*?<\/table>/g) || [];
    const tail = grid.split("</table>").pop();
    weeks.forEach((w, i) => sheets.push({ slug: `ch07-w${i + 1}`, group: page.group, nav: "The 30-Day Menu", body: w + (i === weeks.length - 1 ? tail : "") }));
    return sheets;
  }
  if (body.includes("{{playbooks}}")) {
    const [before, after] = body.split("{{playbooks}}");
    sheets.push({ ...page, body: before });
    sheets.push(...playbookCards());
    return sheets;
  }
  sheets.push({ ...page, body });
  return sheets;
}

// ── Assemble ─────────────────────────────────────────────────────────────────
const rawPages = [
  ...FRONT_MATTER,
  ...CH_01_04, ...CH_05_07, ...CH_08, ...CH_09_11, ...CH_12_13,
  ...BACK_MATTER,
];

let sheets = rawPages.flatMap(expandPage);

// Insert TOC after "how-to-use"
const tocIdx = sheets.findIndex(s => s.slug === "how-to-use") + 1;
sheets.splice(tocIdx, 0, { slug: "contents", group: "Front Matter", nav: "Contents", title: "Contents", toc: true });

// Folio assignment: cover unnumbered; roman front matter; arabic body
function roman(n) { const map = [[10,"x"],[9,"ix"],[5,"v"],[4,"iv"],[1,"i"]]; let s = ""; for (const [v, sym] of map) while (n >= v) { s += sym; n -= v; } return s; }
let rn = 0, an = 0;
const chapterStartSlug = sheets.find(s => s.chapter === 1)?.slug;
let inBody = false;
for (const s of sheets) {
  if (s.slug === "cover") { s.folio = ""; s.hideHeader = true; continue; }
  if (s.slug === chapterStartSlug) inBody = true;
  s.folio = inBody ? String(++an) : roman(++rn);
}

// TOC content (folios known at this point)
const tocSheet = sheets.find(s => s.slug === "contents");
const front = [], system = [], back = [];
let bodyStarted = false;
for (const s of sheets) {
  if (s.chapter === 1) bodyStarted = true;
  if (!s.slug || ["cover", "contents"].includes(s.slug)) continue;
  const label = (s.nav || s.title || "").replace(/&amp;/g, "&");
  if (s.chapter) system.push({ t: `${s.chapter}. ${s.title}`, pg: s.folio });
  else if (s.group === "Back Matter") back.push({ t: label, pg: s.folio });
  else if (!bodyStarted) front.push({ t: label, pg: s.folio });
}
const tocRow = e => `<div class="toc-row"><span class="t">${e.t}</span><span class="dots"></span><span class="pg">${e.pg}</span></div>`;
tocSheet.body = `<div class="front"><h1>Contents</h1><div class="rule"></div>
<div class="toc">
  <div class="toc-section"><h3>Front matter</h3>${front.map(tocRow).join("")}</div>
  <div class="toc-section"><h3>The system — thirteen chapters</h3>${system.map(tocRow).join("")}</div>
  <div class="toc-section"><h3>Worksheets &amp; references</h3>${back.map(tocRow).join("")}</div>
</div>
<p class="fine muted" style="margin-top:14px;">Chapter recipe and playbook pages follow each chapter opening
(the running headers show where you are); the recipe index at the back lists all 70 recipes with water, fuel and
dish counts.</p>
</div>`;

// ── HTML rendering ───────────────────────────────────────────────────────────
function sheetHtml(s, opts = {}) {
  const isCover = s.cls === "cover";
  const header = (!isCover && !opts.bare) ? `
    <div class="sheet__footer" style="border-top:0; border-bottom:1px solid var(--line); margin:0 0 14px; padding-top:0; padding-bottom:8px;">
      <span>${BOOK_TITLE}</span><span>${(s.group || "").replace(/&amp;/g, "&")}</span>
    </div>` : "";
  const footer = isCover ? "" : `
    <div class="sheet__footer">
      <span>${BOOK_TITLE} · ${BOOK_SUB}</span>
      <span class="folio">${s.folio || ""}</span>
    </div>`;
  return `<section class="sheet ${s.cls || ""}" id="${s.slug || ""}">
  ${header}<div class="sheet__body">${s.body}</div>${footer}
</section>`;
}

function pageDoc(s, { fullNav = false, navHtml = "" } = {}) {
  const idx = sheets.indexOf(s);
  let prev = null, next = null;
  for (let i = idx - 1; i >= 0; i--) if (sheets[i].slug) { prev = sheets[i]; break; }
  for (let i = idx + 1; i < sheets.length; i++) if (sheets[i].slug) { next = sheets[i]; break; }
  return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${(s.title || s.nav || BOOK_TITLE).replace(/&amp;/g, "&")} — ${BOOK_TITLE}</title>
<link rel="stylesheet" href="book.css">
</head><body>
${navHtml}
${sheetHtml(s)}
<nav class="reader-nav" aria-label="Book navigation">
  ${prev ? `<a href="${prev.slug}.html" rel="prev">← ${prev.nav ? prev.nav.replace(/&amp;/g, "&") : "Cover"}</a>` : "<a href=\"index.html\">Reader home</a>"}
  ${next ? `<a class="next" href="${next.slug}.html" rel="next">${next.nav ? next.nav.replace(/&amp;/g, "&") : ""} →</a>` : "<span></span>"}
</nav>
</body></html>`;
}

mkdirSync(OUT, { recursive: true });

// Nav shared by all pages
const navOptions = sheets.filter(s => s.slug).map(s => `<option value="${s.slug}.html">${s.folio ? `${s.folio} · ` : ""}${(s.nav || s.title || "Cover").replace(/&amp;/g, "&")}</option>`).join("");
const navHtml = `<nav class="site-nav" aria-label="Book sections">
  <b>THE EMERGENCY FOOD PLAYBOOK</b>
  <label class="visually-hidden" for="page-jump" style="position:absolute;left:-9999px;">Jump to page</label>
  <select id="page-jump" onchange="if(this.value)location.href=this.value">${navOptions}</select>
  <a href="book.html">Print the full book (PDF)</a>
  <a href="index.html">Reader home</a>
</nav>`;

// Individual pages
for (const s of sheets) {
  if (!s.slug) continue;
  writeFileSync(`${OUT}/${s.slug}.html`, pageDoc(s, { navHtml }));
}

// Full single-file book (for printing to PDF)
const allSheets = sheets.map(s => sheetHtml(s)).join("\n");
writeFileSync(`${OUT}/book.html`, `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${BOOK_TITLE} — Full Book (print to PDF)</title>
<link rel="stylesheet" href="book.css">
</head><body>
${navHtml}
${allSheets}
<p class="fine muted" style="text-align:center; padding:20px;">End of book. Use your browser's Print → Save as PDF, paper size U.S. Letter, margins: none (the book supplies its own).</p>
</body></html>`);

// Landing / reader home (also carries commercial positioning copy)
const groups = {};
const SUBPAGE = /-(r\d+|w\d+|pb\d+|tail)$/;
for (const s of sheets) {
  if (s.slug === "cover" || !s.slug) continue;
  if (SUBPAGE.test(s.slug)) continue; // landing TOC lists main pages; subpages are threaded via prev/next
  const g = s.group || "Front Matter";
  (groups[g] ||= []).push(s);
}
const tocHtml = Object.entries(groups).map(([g, list]) => `
  <div class="toc-section"><h3>${g.replace(/&amp;/g, "&")}</h3>
  ${list.map(s => `<div class="toc-row"><a class="t" style="text-decoration:none;" href="${s.slug}.html">${(s.nav || s.title).replace(/&amp;/g, "&")}</a><span class="dots"></span><span class="pg">${s.folio}</span></div>`).join("")}
  </div>`).join("");

writeFileSync(`${OUT}/index.html`, `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${BOOK_TITLE} — Reader</title>
<link rel="stylesheet" href="book.css">
</head><body>
${navHtml}
<section class="sheet" style="min-height:auto;">
  <div class="sheet__body">
    <div class="kicker">Food Opsec · Household Resilience Series</div>
    <h1 style="font-size:34px; line-height:1.08; max-width:6.6in;">A practical American emergency-food system for households that want affordable meals — not expensive survival buckets.</h1>
    <p class="lede" style="margin-top:12px;">The Emergency Food Playbook shows an ordinary household what to buy, how much, what to eat first, how to cook without power, and how to keep it all fresh on a grocery budget — across 30 days and 70 tested-style recipes.</p>
    <div style="display:flex; gap:10px; flex-wrap:wrap; margin:14px 0 4px;">
      <span class="chip">70 shelf-stable recipes</span>
      <span class="chip">No-cook · hot-water · one-pot</span>
      <span class="chip">10 disaster playbooks</span>
      <span class="chip">Printable worksheets</span>
      <span class="chip chip--amber">Sourced to USDA · FEMA · CDC · EPA · FDA</span>
    </div>
    <div style="display:flex; gap:12px; margin-top:16px; flex-wrap:wrap;">
      <a class="chip chip--safety" style="text-decoration:none; padding:10px 18px; font-size:11px;" href="cover.html">Open the cover →</a>
      <a class="chip" style="text-decoration:none; padding:10px 18px; font-size:11px;" href="book.html">Print full book to PDF</a>
    </div>
  </div>
</section>
<section class="sheet" style="min-height:auto;">
  <div class="sheet__body"><div class="toc">${tocHtml}</div></div>
</section>
</body></html>`);

console.log(`Built ${sheets.length} sheets across ${new Set(sheets.map(s => s.slug)).size} page files + full book.`);
