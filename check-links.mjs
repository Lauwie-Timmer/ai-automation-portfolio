// Checks that every resource link in content/*.md still resolves, and flags redirects and soft-404 pages.
// Run: node check-links.mjs
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const urls = new Map();
for (const f of readdirSync(join(root, "content")).filter((f) => f.endsWith(".md"))) {
  const text = readFileSync(join(root, "content", f), "utf8");
  for (const m of text.matchAll(/^- .* \| (https?:\/\/\S+)$/gm)) urls.set(m[1], f);
}

async function check(url) {
  try {
    const r = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(20000), headers: { "user-agent": "Mozilla/5.0 link-check" } });
    const body = r.ok ? (await r.text()).slice(0, 200000) : "";
    const title = (body.match(/<title>([^<]*)<\/title>/i) || [])[1] || "";
    const soft = /not found|404|page.*(moved|renamed)/i.test(title);
    const moved = r.url.replace(/\/$/, "") !== url.replace(/\/$/, "").replace(/#.*/, "");
    return { status: !r.ok ? `FAIL ${r.status}` : soft ? "SOFT-404" : moved ? "MOVED" : "OK", final: r.url, title };
  } catch (e) {
    return { status: `ERROR ${e.cause?.code || e.message}`, final: "", title: "" };
  }
}

const results = await Promise.all([...urls].map(async ([u, f]) => ({ u, f, ...(await check(u)) })));
for (const r of results.sort((a, b) => a.status.localeCompare(b.status))) {
  console.log(`${r.status.padEnd(10)} ${r.u}  (${r.f})${r.status === "MOVED" ? `\n           -> ${r.final}` : ""}${r.status === "SOFT-404" ? `\n           title: ${r.title}` : ""}`);
}
const bad = results.filter((r) => r.status !== "OK");
console.log(`\n${results.length - bad.length}/${results.length} links OK, ${bad.length} need attention`);
