#!/usr/bin/env node
// Minimal MCP stdio client used by the build pipeline to call
// design-inspiration-mcp tools (the design system for the ebook).
// Usage: node ebook/tools/mcp-client.mjs <toolName> '<jsonArgs>'
import { spawn } from "node:child_process";

const tool = process.argv[2];
const args = process.argv[3] ? JSON.parse(process.argv[3]) : {};

const child = spawn("node", ["src/index.js"], { cwd: process.cwd(), stdio: ["pipe", "pipe", "pipe"] });

let buf = "";
const pending = new Map();
let nextId = 1;

function send(msg) { child.stdin.write(JSON.stringify(msg) + "\n"); }

child.stdout.on("data", (d) => {
  buf += d.toString();
  let idx;
  while ((idx = buf.indexOf("\n")) >= 0) {
    const line = buf.slice(0, idx).trim();
    buf = buf.slice(idx + 1);
    if (!line) continue;
    let msg;
    try { msg = JSON.parse(line); } catch { continue; }
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
  }
});

function request(method, params) {
  const id = nextId++;
  return new Promise((resolve, reject) => {
    pending.set(id, resolve);
    send({ jsonrpc: "2.0", id, method, params });
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); reject(new Error("timeout " + method)); } }, 60000);
  });
}

async function main() {
  await request("initialize", {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "ebook-build-client", version: "1.0.0" },
  });
  send({ jsonrpc: "2.0", method: "notifications/initialized" });
  const res = await request("tools/call", { name: tool, arguments: args });
  const text = res?.result?.content?.[0]?.text ?? JSON.stringify(res);
  process.stdout.write(text);
  child.kill();
  process.exit(0);
}

main().catch((e) => { console.error(e.message); child.kill(); process.exit(1); });
