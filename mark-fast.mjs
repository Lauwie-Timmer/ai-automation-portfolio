// One-off: adds "fast: yes" under the headers of the fast-lane steps in content/*.md
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const FAST = new Set([
  "p0-1", "p0-t", "p0-2", "p0-3", "p0-4", "p0-5", "p0-6",
  "p1-1", "p1-py", "p1-2", "p1-3", "p1-4", "p1-5", "p1-6",
  "p2-1", "p2-2", "p2-3", "p2-6",
  "p3-1", "p3-2", "p3-7",
  "p4-2", "p4-4",
  "p5-1", "p5-2", "p5-3", "p5-4", "p5-5", "p5-6",
]);
const seen = new Set();
for (const f of readdirSync(join(root, "content")).filter((f) => f.startsWith("phase"))) {
  const lines = readFileSync(join(root, "content", f), "utf8").split(/\r?\n/);
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    out.push(lines[i]);
    const m = lines[i].match(/^## (\S+) \|/);
    if (m && FAST.has(m[1]) && !/^fast:/.test(lines[i + 1] || "")) { out.push("fast: yes"); seen.add(m[1]); }
  }
  writeFileSync(join(root, "content", f), out.join("\n"));
}
const missing = [...FAST].filter((id) => !seen.has(id));
console.log(`marked ${seen.size} steps${missing.length ? "; NOT FOUND or already marked: " + missing.join(", ") : ""}`);
