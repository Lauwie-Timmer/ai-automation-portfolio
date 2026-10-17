// Audits the roadmap content. Run: node audit.mjs
// 1) every step has the required parts and sensible size
// 2) no step uses a concept before the step that teaches it
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(root, "dashboard", "dashboard.html"), "utf8");
const data = JSON.parse(html.match(/var DATA = (\{.*\});\r?\n/)[1].replace(/\\u003c/g, "<"));
const steps = [...data.phases, ...data.side].flatMap((p) => p.steps.map((s) => ({ ...s, phase: p.id })));
const order = Object.fromEntries(steps.map((s, i) => [s.id, i]));

let problems = 0;
const flag = (msg) => { problems++; console.log("PROBLEM  " + msg); };

// 1) completeness
for (const s of steps) {
  if (s.learn.length < 1) flag(`${s.id} has no "learn" section`);
  if (s.do.length < 1) flag(`${s.id} has no "do" section`);
  if (!s.roles.length) flag(`${s.id} has no roles`);
  if (!s.time) flag(`${s.id} has no time`);
  if (s.goal.length < 20) flag(`${s.id} goal is very short`);
  if (s.done.length < 20) flag(`${s.id} done-when is very short`);
  if (s.kind === "gate" && !s.prompts.some((p) => /Diagnos/i.test(p[0]))) flag(`${s.id} (exam) has no diagnose prompt`);
}
for (const p of data.phases) {
  if (!p.start) flag(`${p.id} has no phase-start prompt`);
  if (!p.steps.some((s) => s.kind === "redo") && p.id !== "p6") flag(`${p.id} has no redo step`);
  if (!p.steps.some((s) => s.kind === "gate") && p.id !== "p6") flag(`${p.id} has no exam step`);
}

// 1b) lessons: every step in a covered phase has a lesson that teaches everything its do/done lines use
const COVERED = new Set(["p0", "p1", "p2", "p3", "p4", "p5", "p6", "tb", "rt"]);
const decode = (h) => h.replace(/<[^>]+>/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const lessonText = (s) => !s.lesson ? "" : s.lesson.topics.map((t) =>
  [t.title, decode(t.html), ...t.cmds.flat(), ...t.items.map((x) => x.text), ...t.checks.flatMap((c) => [c.q, c.a])].join("\n")).join("\n");
const CMD = /^(pwd|ls|dir|cd|mkdir|New-Item|Remove-Item|Set-ExecutionPolicy|git|docker|python|pip|node|npm|npx|code|curl)\b/;
for (const s of steps) {
  if (!COVERED.has(s.phase)) continue;
  if (!s.lesson) { flag(`${s.id} has no lessons/${s.id}.md`); continue; }
  const lt = lessonText(s);
  // The short version must stay short: it is a reminder, the lesson holds the detail.
  if (s.learn.length > 3) flag(`${s.id} short version has ${s.learn.length} bullets (max 3)`);
  for (const b of s.learn) if (b.length > 170) flag(`${s.id} short-version bullet is ${b.length} characters (max 170): ${b.slice(0, 50)}...`);
  for (const t of s.lesson.topics) {
    if (t.checks.length < Math.ceil(t.items.length / 2)) flag(`${s.id}/${t.id} has ${t.items.length} must-know items but only ${t.checks.length} self-test questions (need at least half as many)`);
  }
  const spans = [...[...s.do, s.done].join("\n").matchAll(/`([^`]+)`/g)].map((m) => m[1].trim()).filter((c) => CMD.test(c));
  for (const c of new Set(spans)) {
    const w = c.split(/\s+/), key = /^(git|docker|pip|python|node|npm)$/.test(w[0]) ? w.slice(0, 2).join(" ") : w[0];
    if (!lt.toLowerCase().includes(key.toLowerCase())) flag(`${s.id} uses \`${c}\` in do/done but the lesson never teaches \`${key}\``);
  }
}

// 2) forward references: [label, regex, id of the step that teaches it]
const TERMS = [
  ["Edit Fields", /Edit Fields/i, "p1-4"],
  ["expression", /\bexpressions?\b/i, "p1-4"],
  ["Webhook node", /Webhook node|Listen for test event|Production URL|Test URL/i, "p1-5"],
  ["Executions", /Executions\b/, "p1-5"],
  ["Active/Published", /\bPublish(ed)?\b|\bActive\b/, "p1-5"],
  ["Respond to Webhook", /Respond to Webhook/i, "p2-2"],
  ["IF node", /\bIF node\b/, "p2-2"],
  ["Google Sheets/Gmail", /Google Sheets|Gmail|OAuth/i, "p2-3"],
  ["Split Out/Aggregate/Filter", /Split Out|Aggregate|Filter node/i, "p2-4"],
  ["Switch/Code/Merge", /Switch node|Code node|Merge node/i, "p2-5"],
  ["Error Trigger/error workflow", /Error Trigger|error workflow/i, "p2-6"],
  ["Retry On Fail", /Retry On Fail/i, "p2-6"],
  ["credentials", /\bcredentials?\b/i, "p2-1"],
  ["LLM terms", /\btokens?\b|context window|hallucinat|tool calling/i, "p3-1"],
  ["prompt injection", /prompt.injection/i, "p3-1"],
  ["Text Classifier", /Text Classifier|Information Extractor/i, "p3-2"],
  ["AI Agent node", /AI Agent node|Chat Trigger|Simple Memory/i, "p3-3"],
  ["RAG/embeddings", /\bRAG\b|embedding|vector store/i, "p3-4"],
  ["idempotency", /idempoten/i, "p4-1"],
  ["$fromAI", /\$fromAI/, "p4-3"],
  ["pytest/argparse", /pytest|argparse/i, "p4-2"],
  ["venv", /\bvenv\b|virtual environment|\.venv/i, "p0-4"],
  [".env", /\.env\b/, "p0-2"],
  ["python-dotenv", /dotenv/i, "p0-5"],
  ["git commands", /git (add|commit|merge|switch|push|pull|log|branch)\b/i, "p1-6"],
  ["docker commands", /docker (run|ps|stop|start|rm|logs|volume)/i, "p0-3"],
  ["curl", /curl/i, "p1-1"],
  ["dictation", /\bdictat/i, "p0-r"],
  ["webhook auth", /Header Auth|IP allowlist|Basic Auth|JWT/i, "p2-sec"],
  ["CLI export", /export:workflow|docker exec|docker cp/i, "p2-8"],
  ["precision/recall", /\bprecision\b|\brecall\b|confusion matrix/i, "p3-eval"],
  ["MCP", /\bMCP\b/, "p3-m"],
  ["SQL", /\bSQL\b|\bJOIN\b|\bSELECT\b/, "p4-sql"],
  ["pgvector", /pgvector|Supabase Vector Store/i, "p4-pg"],
  ["Pydantic/FastAPI", /Pydantic|FastAPI|\bruff\b/i, "p4-py"],
  ["Compose/Kubernetes", /Docker Compose|Kubernetes/i, "p6-4"],
  ["AI-use policy", /AI-use policy|ai-use-policy/i, "p5-ai"],
  ["templates pack", /p6-tpl|scope.of.work template/i, "p6-tpl"],
];

const text = (s) => [s.title, s.goal, ...s.learn, ...s.do, s.done, ...s.prompts.map((p) => p[1]), ...s.res.map((r) => r[0]), lessonText(s)].join("\n");
for (const [label, re, taughtIn] of TERMS) {
  const idx = order[taughtIn];
  if (idx === undefined) { flag(`audit config: unknown step ${taughtIn}`); continue; }
  for (const s of steps) {
    if (order[s.id] < idx && re.test(text(s))) {
      const m = text(s).match(re);
      console.log(`CHECK    "${label}" appears in ${s.id} before it is taught in ${taughtIn}: ...${m[0]}...`);
    }
  }
}
console.log(`\n${steps.length} steps audited, ${problems} structural problems. Review every CHECK line by hand.`);
