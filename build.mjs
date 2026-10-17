// Builds dashboard.html and ROADMAP.md from content/*.md. Run: node build.mjs
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const ARTIFACT_URL = "https://claude.ai/artifact/DmXKL2aJSErjY9fwktBchT";
const QUIZ_URL = "https://claude.ai/artifact/A2u7LVj8CwKeVWrCibvH2m";

const COMMON = {
  url: ARTIFACT_URL,
  quiz: QUIZ_URL,
  head: 'I\'m working through my automation roadmap (C:\\dev\\ai-automation-portfolio\\ROADMAP.md), step {id}: "{title}".',
  stuck:
    "Role: Explainer. I'm stuck. What I tried: [describe what you did]. Exact error or output: [paste it]. " +
    "Explain only the part I'm stuck on, at my level and in plain words. Then let me redo the step myself without help.",
  extras: [
    [
      "Explain it three ways",
      "Role: Explainer. Explain \"{title}\" to me three times: as if I were 12, as a beginner who uses computers a lot, and as an expert. Then ask me which one clicked and why, so you learn how I learn best.",
    ],
    [
      "Find resources at my level",
      "Role: Find stuff at my level. I already know [what you know] and I don't yet know [what you don't know]. Find me the 3 best explanations or tutorials for \"{title}\" at my level, and tell me why each one is good. Give links, and tell me if you aren't sure a link still works.",
    ],
  ],
  weekly:
    "Role: Diagnostician, then Mapmaker, then Clerk. Read C:\\dev\\ai-automation-portfolio\\mistakes.md and my dashboard progress (artifact {url}, collection \"progress\"). 1) What mistake do I keep making, and what single root misunderstanding is behind it? 2) I have [N] hours this week. Which steps should I do, which can I speed through and which should I repeat? 3) Make 8 flashcards for the root misunderstanding and save them in C:\\dev\\ai-automation-portfolio\\flashcards\\ as a tab-separated file.",
  tail:
    "How to run this: teach me at my level and keep it short. Let me try things myself first. If I'm stuck, give a hint before the answer, and explain only the part I'm stuck on. " +
    "Ask one question at a time and tell me my level honestly. If C:\\dev\\ai-automation-portfolio\\lessons\\{id}.md exists, it is the lesson I read on the dashboard: teach every item on its Must know list, and only ask or examine me on items from that list. " +
    "When I have genuinely met the 'Done when' condition and the Must know list, tell me, and check step {id} off on my dashboard " +
    "(artifact {url}, collection \"progress\", document id \"{id}\"). Add anything I got wrong to C:\\dev\\ai-automation-portfolio\\mistakes.md.",
  topicTeach:
    "Role: Explainer, then Examiner. Teach me the topic \"{topic}\" of this step. Read it in C:\\dev\\ai-automation-portfolio\\lessons\\{id}.md first and treat it as the source of truth. " +
    "Teach it at my level in short plain words and cover every Must know item of the topic:\n{items}\n" +
    "If I ask something the lesson doesn't cover, answer it and then add it to the lesson file and run node build.mjs. Then ask me the topic's Check yourself questions one at a time.",
  topicQuiz:
    "Role: Examiner. Quiz me on the topic \"{topic}\" of this step, one question at a time, easy to hard. Only ask about these Must know items (they are in C:\\dev\\ai-automation-portfolio\\lessons\\{id}.md):\n{items}\n" +
    "Stop when I start guessing and tell me my level for this topic. Put what I got wrong in mistakes.md and tell me which items to re-read.",
};

const DEV = { p: "p", l: "l", b: "b" };

function parseFile(text) {
  const phases = [];
  let phase = null, step = null, list = null;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trimEnd();
    if (!line.trim()) continue;
    let m;
    if (line.startsWith("## ")) {
      const [id, dev, kind, title, time, roles] = line.slice(3).split(" | ").map((s) => s.trim());
      if (!DEV[dev] || !["must", "bonus", "redo", "gate"].includes(kind)) throw new Error(`Bad step header: ${line}`);
      step = { id, dev, kind, title, time, fast: false, roles: roles ? roles.split(",").map((s) => s.trim()) : [], goal: "", learn: [], res: [], do: [], done: "", prompts: [] };
      phase.steps.push(step); list = null;
    } else if (line.startsWith("# ")) {
      const [id, tag, name, hours, sub] = line.slice(2).split(" | ").map((s) => s.trim());
      phase = { id, tag, name, hours: Number(hours) || 0, sub: sub || "", intro: "", start: "", steps: [] };
      phases.push(phase); step = null; list = null;
    } else if ((m = line.match(/^(intro|start):\s*(.*)$/)) && !step) {
      phase[m[1]] = m[2]; list = null;
    } else if (/^fast:\s*yes\s*$/.test(line) && step) {
      step.fast = true; list = null;
    } else if ((m = line.match(/^(goal|done):\s*(.*)$/)) && step) {
      step[m[1]] = m[2]; list = null;
    } else if ((m = line.match(/^prompt:\s*(.*)$/)) && step) {
      const i = m[1].indexOf(" | ");
      if (i < 0) throw new Error(`Prompt needs "Label | text": ${line}`);
      step.prompts.push([m[1].slice(0, i).trim(), m[1].slice(i + 3).trim()]); list = null;
    } else if ((m = line.match(/^(learn|res|do):\s*$/)) && step) {
      list = m[1];
    } else if (line.startsWith("- ") && list && step) {
      const item = line.slice(2).trim();
      if (list === "res") {
        const i = item.lastIndexOf(" | ");
        step.res.push([item.slice(0, i).trim(), item.slice(i + 3).trim()]);
      } else step[list].push(item);
    } else {
      throw new Error(`Unparsed line: ${line}`);
    }
  }
  for (const p of phases) for (const s of p.steps) {
    for (const k of ["goal", "done"]) if (!s[k]) throw new Error(`${s.id} is missing ${k}`);
    if (!s.prompts.length) throw new Error(`${s.id} has no prompt`);
  }
  return phases;
}

// ---- Lessons: lessons/<step-id>.md -> topics with html, commands, must-know items and self-test questions ----
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function inline(src) {
  const codes = [];
  let s = String(src).replace(/`([^`]+)`/g, (_, c) => { codes.push(c); return "\u0000" + (codes.length - 1) + "\u0000"; });
  s = esc(s)
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
    .replace(/(^|[\s(])\*([^*\s][^*]*)\*(?=[\s).,;:!?]|$)/g, "$1<i>$2</i>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => "<code>" + esc(codes[Number(i)]) + "</code>");
}
// Small markdown subset: ### / #### headings, paragraphs, - lists, 1. lists, ``` code, | tables, > Tip:/Warning:/Note: callouts.
function renderMd(src) {
  const lines = src.split(/\r?\n/), out = [];
  let i = 0;
  const isBlock = (l) => /^(```|#{3,4}\s|\||>|\s*- |\d+\.\s)/.test(l);
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    if (/^```/.test(l)) {
      const code = []; i++;
      while (i < lines.length && !/^```/.test(lines[i])) code.push(lines[i++]);
      i++;
      out.push(`<pre class="code"><code>${esc(code.join("\n"))}</code></pre>`);
    } else if (/^#{3,4}\s/.test(l)) {
      const m = l.match(/^(#{3,4})\s+(.*)$/);
      out.push(`<h5>${inline(m[2])}</h5>`); i++;
    } else if (l.startsWith("|")) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith("|")) rows.push(lines[i++]);
      const cells = (r) => r.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      const [head, , ...body] = rows;
      out.push(`<div class="tbl"><table><thead><tr>${cells(head).map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead><tbody>${body.map((r) => `<tr>${cells(r).map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
    } else if (l.startsWith(">")) {
      const q = [];
      while (i < lines.length && lines[i].startsWith(">")) q.push(lines[i++].replace(/^>\s?/, ""));
      const text = q.join(" ");
      const k = (text.match(/^(Tip|Warning|Note):\s*/) || [])[1];
      out.push(`<div class="callout ${k ? k.toLowerCase() : "note"}">${inline(k ? text.replace(/^(Tip|Warning|Note):\s*/, "") : text)}</div>`);
    } else if (/^\s*- /.test(l)) {
      const items = [];
      while (i < lines.length && /^\s*- /.test(lines[i])) items.push(lines[i++].replace(/^\s*- /, ""));
      out.push(`<ul>${items.map((t) => `<li>${inline(t)}</li>`).join("")}</ul>`);
    } else if (/^\d+\.\s/.test(l)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) items.push(lines[i++].replace(/^\d+\.\s/, ""));
      out.push(`<ol>${items.map((t) => `<li>${inline(t)}</li>`).join("")}</ol>`);
    } else {
      const p = [];
      while (i < lines.length && lines[i].trim() && !isBlock(lines[i])) p.push(lines[i++]);
      if (!p.length) { p.push(lines[i++]); }
      out.push(`<p>${inline(p.join(" "))}</p>`);
    }
  }
  return out.join("\n");
}
function hashId(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return "c" + h.toString(36);
}
function parseLesson(id, text) {
  const topics = [];
  let cur = null, fence = false, pendingQ = null;
  const fail = (msg) => { throw new Error(`lessons/${id}.md: ${msg}`); };
  const finish = () => {
    if (!cur) return;
    if (pendingQ) fail(`question without an A: line in topic "${cur.title}": ${pendingQ}`);
    cur.html = renderMd(cur.body.join("\n"));
    delete cur.body;
    topics.push(cur);
  };
  for (const raw of text.split(/\r?\n/)) {
    if (/^```/.test(raw.trim())) fence = !fence;
    let m;
    if (!fence && (m = raw.match(/^## topic:\s*(.+?)\s*\|\s*([a-z0-9-]+)\s*$/))) {
      finish();
      if (topics.some((t) => t.id === m[2])) fail(`duplicate topic id ${m[2]}`);
      cur = { id: m[2], title: m[1], body: [], cmds: [], know: [], checks: [] }; pendingQ = null;
    } else if (!fence && cur && (m = raw.match(/^(cmd|know|Q|A):\s*(.*)$/))) {
      const [, kind, rest] = m;
      if (kind === "cmd") {
        const i = rest.indexOf(" | ");
        if (i < 0) fail(`cmd needs "\`command\` | what it does": ${raw}`);
        cur.cmds.push([rest.slice(0, i).trim().replace(/^`|`$/g, ""), rest.slice(i + 3).trim()]);
      } else if (kind === "know") {
        cur.know.push(rest.trim());
      } else if (kind === "Q") {
        if (pendingQ) fail(`two Q: lines in a row: ${raw}`);
        pendingQ = rest.trim();
      } else {
        if (!pendingQ) fail(`A: without a Q: ${raw}`);
        if (/\t/.test(pendingQ + rest)) fail(`tab inside a Q/A: ${raw}`);
        cur.checks.push([pendingQ, rest.trim()]); pendingQ = null;
      }
    } else if (cur) {
      cur.body.push(raw);
    } else if (raw.trim() && !raw.startsWith("# ")) {
      fail(`text before the first "## topic:" line: ${raw}`);
    }
  }
  finish();
  if (!topics.length) fail("no topics");
  for (const t of topics) {
    if (!t.know.length && !t.cmds.length) fail(`topic "${t.title}" has no know: or cmd: line`);
    if (!t.checks.length) fail(`topic "${t.title}" has no Q:/A: self-test`);
    // Must-know items: explicit know lines first, then one item per command.
    t.items = [
      ...t.know.map((x) => ({ id: "k" + hashId(id + "|" + t.id + "|" + x).slice(1), text: x })),
      ...t.cmds.map(([c, d]) => ({ id: "k" + hashId(id + "|" + t.id + "|cmd|" + c).slice(1), text: `Use \`${c}\`: ${d}`, cmd: true })),
    ];
    t.checks = t.checks.map(([q, a]) => ({ id: "q" + hashId(id + "|" + t.id + "|" + q).slice(1), q, a }));
    delete t.know;
  }
  return { topics };
}

const files = readdirSync(join(root, "content")).filter((f) => f.endsWith(".md")).sort();
const phases = [], side = [];
for (const f of files) {
  const parsed = parseFile(readFileSync(join(root, "content", f), "utf8"));
  (f.startsWith("phase") ? phases : side).push(...parsed);
}
for (const p of [...phases, ...side]) for (const s of p.steps) {
  const lf = join(root, "lessons", s.id + ".md");
  if (existsSync(lf)) s.lesson = parseLesson(s.id, readFileSync(lf, "utf8"));
}

// Hours per phase come from the step times (core steps only), plus 25% for the first pass.
function minutes(t) {
  if (!t) return 0;
  const nums = (t.match(/\d+(\.\d+)?/g) || []).map(Number);
  if (!nums.length) return 0;
  if (/hour/i.test(t)) return Math.max(...nums) * 60;
  if (/min/i.test(t)) return Math.max(...nums);
  return 0;
}
for (const p of phases) {
  const mins = p.steps.filter((s) => s.kind !== "bonus").reduce((n, s) => n + minutes(s.time), 0);
  p.hours = Math.round((mins * 1.25) / 60);
}
const totalHours = phases.reduce((n, p) => n + p.hours, 0);
const fastSteps = phases.flatMap((p) => p.steps.filter((s) => s.fast));
const fastHours = Math.round((fastSteps.reduce((n, s) => n + minutes(s.time), 0) * 1.25) / 60);

const data = { common: COMMON, phases, side, fastHours };
const json = JSON.stringify(data).replace(/</g, "\\u003c").replace(/\u2028|\u2029/g, " ");
const template = readFileSync(join(root, "dashboard", "dashboard.template.html"), "utf8");
writeFileSync(join(root, "dashboard", "dashboard.html"), template.replace("__DATA__", () => json));

// ROADMAP.md
const DEVNAME = { p: "phone", l: "laptop", b: "phone or laptop" };
const KINDNAME = { must: "", bonus: "BONUS", redo: "REDO WITHOUT HELP", gate: "EXAM" };
let md = `# Automation roadmap

Started 2026-10-04. Target: first paid Upwork money around 2026-11-10. Rate goal: EUR 20+ per hour (the first one or two jobs may pay less to earn reviews).

**Time:** the core steps add up to about ${totalHours} hours, including 25% extra for a first pass (the step times plus the time you struggle). At 10 hours a week that is about ${Math.ceil(totalHours / 10)} weeks, at 15 hours a week about ${Math.ceil(totalHours / 15)} weeks. Bonus steps and the side tracks are not included. Tell Claude your real weekly hours and it will turn this into dates.

**Fast lane (${fastSteps.length} steps, about ${fastHours} hours):** the shortest honest route to your first Upwork proposals. It is the steps tagged FAST LANE below. The exams, redo steps, Projects A and C and the bonuses wait for later. Do them at weekends so the learning still locks in. At 10 hours a week the fast lane takes about ${Math.ceil(fastHours / 10)} weeks. Skipping the redo and exam steps makes the learning shallower, so don't skip them for good.

Fast lane order: ${fastSteps.map((s) => s.id).join(", ")}.

**This file is generated** from the files in \`content/\` by \`node build.mjs\`. Edit those, not this file. Progress is tracked on the dashboard: ${ARTIFACT_URL}

**Flashcards and quiz:** every phase has a ready-made deck in \`flashcards/phaseN.txt\` (import into the free Anki app: File, Import, field separator Tab). The same cards are in the spaced-repetition quiz page: ${QUIZ_URL}. It makes you write an answer before it shows the real one, and it brings cards back sooner when you miss them. Your own mistakes become extra cards after each exam.

## How every step works

1. **Learn.** Read the short version and the full lesson (\`lessons/<step-id>.md\`, one dropdown per topic on the dashboard). Answer each *Check yourself* question in your own words before you reveal the answer. You will be tested on it.
2. **Do.** Build or practise it yourself. Struggle for about 15 minutes before asking for help.
3. **Must know.** Every lesson ends in a list of exactly what you must be able to do or explain. Claude teaches all of it and only asks about items on it.
4. **Stuck?** Use the *I'm stuck* prompt. Claude explains only the part you're stuck on, then you redo the step on your own.
5. **Check.** Paste the step's check prompt to Claude. Claude asks questions, reviews your work, or plays a client, so you find your own gaps.
6. **Done.** When the *Done when* condition and the Must know list are true, Claude tells you and checks the step off on the dashboard. Mistakes go in \`mistakes.md\`.
7. **Lock it in.** Each phase ends with *Redo without help*, an *Exam*, a *diagnosis* of repeated mistakes, and *flashcards* for your phone.

Roles Claude plays: Interviewer (finds your level), Mapmaker (builds the plan), Explainer (explains only what you're stuck on), Socratic questioner (asks until you find your own gaps), Examiner (quizzes, gets harder), Checker (reviews your work, never rewrites it), Listener (you explain aloud and Claude compares with the truth), Diagnostician (finds the root of repeated mistakes), Sparring partner (plays a client with a timer), Clerk (turns notes and mistakes into flashcards).

Step tags: (phone) can be done at work, (laptop) needs a computer. Core steps count toward progress, BONUS steps don't. Every prompt gets a header and rules added automatically on the dashboard (which step you're on, how Claude should teach, and how to check the step off).

`;
const section = (p) => {
  let s = `\n---\n\n## ${p.tag}: ${p.name}${p.hours ? ` (about ${p.hours} h)` : ""}${p.sub ? `\n\n*${p.sub}*` : ""}\n\n${p.intro}\n\n**Start this phase with Claude:** ${p.start}\n`;
  for (const t of p.steps) {
    s += `\n### ${t.id}. ${t.title}${KINDNAME[t.kind] ? ` [${KINDNAME[t.kind]}]` : ""}${t.fast ? " [FAST LANE]" : ""}\n\n*${DEVNAME[t.dev]} · ${t.time} · roles: ${t.roles.join(", ")}*\n\n**Goal:** ${t.goal}\n`;
    if (t.learn.length) s += `\n**Learn this first**\n\n${t.learn.map((x) => `- ${x}`).join("\n")}\n`;
    if (t.res.length) s += `\n**Resources**\n\n${t.res.map((r) => `- [${r[0]}](${r[1]})`).join("\n")}\n`;
    if (t.do.length) s += `\n**Do this**\n\n${t.do.map((x, i) => `${i + 1}. ${x}`).join("\n")}\n`;
    s += `\n**Done when:** ${t.done}\n`;
    if (t.lesson) {
      s += `\n**Full lesson:** \`lessons/${t.id}.md\` (also on the dashboard). **Must know to finish this step:**\n\n`;
      for (const topic of t.lesson.topics) s += `*${topic.title}*\n\n${topic.items.map((x) => `- ${x.text}`).join("\n")}\n\n`;
    }
    for (const [label, body] of t.prompts) s += `\n**Prompt: ${label}**\n\n> ${body}\n`;
  }
  return s;
};
for (const p of phases) md += section(p);
md += `\n---\n\n# Side tracks\n`;
for (const p of side) md += section(p);
writeFileSync(join(root, "ROADMAP.md"), md);

// Flashcards: cards/phaseN.txt ("question || answer" per line) -> flashcards/phaseN.txt (Anki, tab-separated) and quiz.html
import { mkdirSync, existsSync } from "node:fs";
const cards = [];
const seenIds = new Set();
if (existsSync(join(root, "cards"))) {
  mkdirSync(join(root, "flashcards"), { recursive: true });
  for (const f of readdirSync(join(root, "cards")).filter((f) => /^phase\d\.txt$/.test(f)).sort()) {
    const phaseId = "p" + f.match(/phase(\d)/)[1];
    const rows = readFileSync(join(root, "cards", f), "utf8").split(/\r?\n/).filter((l) => l.trim());
    let anki = "#separator:tab\n#html:false\n";
    const addCard = (q, a, label) => {
      if (!q || !a || /\t/.test(q + a)) throw new Error(`${label}: bad card: ${q}`);
      const id = hashId(phaseId + "|" + q);
      if (seenIds.has(id)) return false;
      seenIds.add(id);
      cards.push({ id, phase: phaseId, q, a });
      anki += `${q}\t${a}\n`;
      return true;
    };
    for (const row of rows) {
      const i = row.indexOf(" || ");
      if (i < 0) throw new Error(`${f}: card needs "question || answer": ${row}`);
      if (!addCard(row.slice(0, i).trim(), row.slice(i + 4).trim(), f)) throw new Error(`${f}: duplicate card: ${row}`);
    }
    // Self-test questions from the lessons of this phase (a question already in the hand-made cards is skipped).
    const phase = phases.find((p) => p.id === phaseId);
    for (const s of phase ? phase.steps : []) for (const t of s.lesson ? s.lesson.topics : []) for (const c of t.checks) addCard(c.q, c.a, `${s.id}/${t.id}`);
    writeFileSync(join(root, "flashcards", f), anki);
  }
  const quizTemplate = readFileSync(join(root, "dashboard", "quiz.template.html"), "utf8");
  const quizData = {
    cards,
    phases: phases.map((p) => ({ id: p.id, tag: p.tag, name: p.name })),
    dashboardUrl: ARTIFACT_URL,
  };
  const quizJson = JSON.stringify(quizData).replace(/</g, "\\u003c").replace(new RegExp("[\\u2028\\u2029]", "g"), " ");
  writeFileSync(join(root, "dashboard", "quiz.html"), quizTemplate.replace("__QUIZ__", () => quizJson));
}

const stepCount = [...phases, ...side].reduce((n, p) => n + p.steps.length, 0);
console.log(`Built dashboard.html, ROADMAP.md and quiz.html: ${phases.length} phases, ${side.length} side cards, ${stepCount} steps, ${cards.length} flashcards.`);
