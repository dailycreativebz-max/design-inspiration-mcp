#!/usr/bin/env node
// Dumps the assembled sheet list (HTML bodies + folios) as JSON for the PDF renderer.
import { writeFileSync, mkdirSync } from "node:fs";
import { assemble } from "../build.mjs";

const sheets = assemble().map(s => ({
  slug: s.slug, group: s.group || "Front Matter", nav: s.nav || s.title || "",
  title: s.title || s.nav || "", folio: s.folio || "", chapter: s.chapter || 0,
  cls: s.cls || "", dek: s.dek || "", body: s.body,
}));
mkdirSync("ebook/dist", { recursive: true });
writeFileSync("ebook/dist/pdf-data.json", JSON.stringify({
  bookTitle: "The Emergency Food Playbook",
  author: "Food Opsec",
  sheets,
}));
console.log(`dumped ${sheets.length} sheets → ebook/dist/pdf-data.json`);
