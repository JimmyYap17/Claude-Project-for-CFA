import { firebaseConfig } from "./firebase-config.js";

const SDK = "https://www.gstatic.com/firebasejs/10.12.2";
const $ = (id) => document.getElementById(id);
const local = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

// ---------- formulas ----------
// $$...$$ (own line) and \(...\) (inside a sentence) are typeset with KaTeX.
// A single $ is left alone so prices like $5 million stay as text.
const MATH_DELIMS = [
  { left: "$$", right: "$$", display: true },
  { left: "\\[", right: "\\]", display: true },
  { left: "\\(", right: "\\)", display: false },
];
function setRich(el, text) {
  el.textContent = text || "";
  if (window.renderMathInElement && /\$\$|\\\(|\\\[/.test(el.textContent)) {
    try { window.renderMathInElement(el, { delimiters: MATH_DELIMS, throwOnError: false }); } catch {}
  }
}
// KaTeX loads with `defer`; re-render once it arrives
addEventListener("load", () => {
  if (typeof showCard === "function" && cards.length) { showCard(true); renderList(); }
  if (typeof showReading === "function" && readings.length) showReading();
});

// ---------- state ----------
let fb = null;               // Firebase modules + instances
let uid = null;
let cards = [];              // [{id, topic, front, back, createdAt}]
let progress = {};           // cardId -> {box, seen}
let progressLoaded = false;
let unsubs = [];
let topicFilter = local.get("cfa-topic", "All");
let queue = [], pos = 0, history = [];
let editingId = null;

function show(view) {
  $("setup").hidden = view !== "setup";
  $("auth").hidden = view !== "auth";
  $("app").hidden = view !== "app";
  $("fab").hidden = view !== "app" || local.get("cfa-tab", "study") === "hand";
  $("signOut").hidden = view !== "app";
}
function setSync(state, text) {
  $("sync").className = "sync" + (state ? " " + state : "");
  $("syncText").textContent = text;
}
function msg(id, text, err) { const m = $(id); m.textContent = text; m.className = "msg" + (err ? " err" : ""); }

// ---------- boot ----------
const configured = firebaseConfig && firebaseConfig.apiKey && !String(firebaseConfig.apiKey).startsWith("PASTE");
if (!configured) {
  show("setup"); setSync("", "Not connected");
} else {
  boot().catch((e) => { console.error(e); setSync("", "Couldn't load Firebase. Check your connection."); });
}

async function boot() {
  const [appMod, authMod, fsMod] = await Promise.all([
    import(`${SDK}/firebase-app.js`),
    import(`${SDK}/firebase-auth.js`),
    import(`${SDK}/firebase-firestore.js`),
  ]);
  const app = appMod.initializeApp(firebaseConfig);
  const auth = authMod.getAuth(app);
  let db;
  try {
    // Offline cache: study and add cards without a connection; changes sync when back online.
    db = fsMod.initializeFirestore(app, { localCache: fsMod.persistentLocalCache({ tabManager: fsMod.persistentMultipleTabManager() }) });
  } catch {
    db = fsMod.getFirestore(app);
  }
  fb = { ...authMod, ...fsMod, auth, db };
  setSync("", "Connecting…");
  authMod.onAuthStateChanged(auth, (user) => {
    unsubs.forEach((u) => u()); unsubs = [];
    if (user) { uid = user.uid; show("app"); listen(); }
    else { uid = null; cards = []; progress = {}; saved = {}; show("auth"); setSync("", "Signed out"); }
  });
}

// ---------- Firestore ----------
const cardsCol = () => fb.collection(fb.db, "users", uid, "cards");
const progressCol = () => fb.collection(fb.db, "users", uid, "progress");
const savedCol = () => fb.collection(fb.db, "users", uid, "saved");

function listen() {
  progressLoaded = false;
  let first = true;
  unsubs.push(fb.onSnapshot(cardsCol(), { includeMetadataChanges: true }, (snap) => {
    const m = snap.metadata;
    if (m.hasPendingWrites) setSync("pending", "Saving…");
    else if (m.fromCache) setSync("pending", "Offline · changes sync when you reconnect");
    else setSync("live", "Synced · " + snap.size + " cards");
    if (!first && snap.docChanges().length === 0) return; // metadata-only update
    first = false;
    setCards(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  }, onDbError));
  unsubs.push(fb.onSnapshot(progressCol(), (snap) => {
    progress = {}; snap.docs.forEach((d) => { progress[d.id] = d.data(); });
    if (!progressLoaded) { progressLoaded = true; rebuildQueue(true); } else renderStats();
  }, onDbError));
  unsubs.push(fb.onSnapshot(savedCol(), (snap) => {
    saved = {}; snap.docs.forEach((d) => { saved[d.id] = d.data(); });
    renderLearn();
  }, onDbError));
  startInbox();
}

// ---------- card inbox ----------
// Claude (or anything holding the inbox key) drops cards into inbox/<key>/cards;
// this moves each one into the signed-in user's deck.
let inboxKey = null, inboxUnsub = null;
const settingsDoc = () => fb.doc(fb.db, "users", uid, "settings", "inbox");
function newInboxKey() {
  const b = new Uint8Array(18); crypto.getRandomValues(b);
  return "cfa-" + [...b].map((x) => x.toString(16).padStart(2, "0")).join("");
}
async function startInbox() {
  try {
    const snap = await fb.getDoc(settingsDoc());
    inboxKey = snap.exists() && snap.data().key;
    if (!inboxKey) { inboxKey = newInboxKey(); await fb.setDoc(settingsDoc(), { key: inboxKey }); }
    watchInbox();
  } catch (e) {
    console.error(e);
    $("inboxKey").textContent = "Unavailable";
    msg("inboxMsg", "The inbox needs the updated Firestore rules from the README.", true);
  }
}
function watchInbox() {
  if (inboxUnsub) inboxUnsub();
  $("inboxKey").textContent = inboxKey;
  const col = fb.collection(fb.db, "inbox", inboxKey, "cards");
  inboxUnsub = fb.onSnapshot(col, (snap) => {
    const docs = snap.docs.filter((d) => !d.metadata || !d.metadata.hasPendingWrites);
    if (!docs.length) return;
    const b = fb.writeBatch(fb.db);
    docs.forEach((d) => {
      const c = d.data();
      b.set(fb.doc(cardsCol(), d.id), {
        topic: String(c.topic || "General").trim(), front: String(c.front || "").trim(), back: String(c.back || "").trim(),
        createdAt: Date.now(), updatedAt: Date.now(),
      });
      b.delete(d.ref);
    });
    b.commit().then(() => {
      msg("inboxMsg", "Added " + docs.length + (docs.length === 1 ? " card" : " cards") + " from Claude.");
    }).catch((e) => console.error(e));
  }, (e) => {
    console.error(e);
    msg("inboxMsg", e.code === "permission-denied" ? "The inbox needs the updated Firestore rules from the README." : "The inbox stopped. Reload the app.", true);
  });
  unsubs.push(() => { if (inboxUnsub) { inboxUnsub(); inboxUnsub = null; } });
}
$("copyKey").onclick = async () => {
  if (!inboxKey) return;
  try { await navigator.clipboard.writeText(inboxKey); msg("inboxMsg", "Copied. Paste it to Claude."); }
  catch { msg("inboxMsg", "Select the key above and copy it.", true); }
};
let newKeyArmed = false;
$("newKey").onclick = async () => {
  if (!newKeyArmed) {
    newKeyArmed = true; $("newKey").textContent = "Tap again: the old key stops working";
    setTimeout(() => { newKeyArmed = false; $("newKey").textContent = "Make a new key"; }, 4000);
    return;
  }
  newKeyArmed = false; $("newKey").textContent = "Make a new key";
  inboxKey = newInboxKey();
  fb.setDoc(settingsDoc(), { key: inboxKey }).catch((e) => console.error(e));
  watchInbox();
  msg("inboxMsg", "New key made. Give it to Claude again.");
}
function onDbError(e) {
  console.error(e);
  setSync("", e.code === "permission-denied"
    ? "Access denied. Publish the Firestore rules from the README."
    : "Sync stopped. Reload the app to reconnect.");
}
function writeFailed(where) {
  return (e) => {
    console.error(e);
    msg(where, e.code === "permission-denied" ? "Firebase refused the save. Check the Firestore rules in the README." : "Couldn't save: " + (e.message || e), true);
  };
}

// Writes are not awaited: with the offline cache they apply locally at once
// and resolve only when the server confirms, which never happens offline.
function saveCard(card) {
  const body = { topic: card.topic.trim(), front: card.front.trim(), back: card.back.trim(), updatedAt: Date.now(), createdAt: card.createdAt || Date.now() };
  const ref = card.id ? fb.doc(cardsCol(), card.id) : fb.doc(cardsCol());
  fb.setDoc(ref, body).catch(writeFailed("formMsg"));
}
function deleteCard(id) {
  const b = fb.writeBatch(fb.db);
  b.delete(fb.doc(cardsCol(), id));
  b.delete(fb.doc(progressCol(), id));
  b.commit().catch(writeFailed("formMsg"));
}
function importCards(list, where) {
  const now = Date.now();
  for (let i = 0; i < list.length; i += 400) {
    const b = fb.writeBatch(fb.db);
    list.slice(i, i + 400).forEach((c, j) => b.set(fb.doc(cardsCol()), { topic: c.topic.trim(), front: c.front.trim(), back: c.back.trim(), createdAt: now + i + j, updatedAt: now }));
    b.commit().catch(writeFailed(where));
  }
}

// ---------- auth UI ----------
// Sign-in is username + password. Firebase needs an email, so a plain username
// maps to a private placeholder address; nothing is ever sent to it.
const USER_DOMAIN = "users.cfa-flashcards.app";
function toEmail(name) {
  name = name.trim().toLowerCase();
  if (name.includes("@")) return name; // accounts made earlier with a real email still work
  if (!/^[a-z0-9._-]{2,30}$/.test(name)) throw { code: "app/bad-username" };
  return name + "@" + USER_DOMAIN;
}
// Firebase requires 6+ characters; short passwords (like a PIN) get a fixed suffix.
const toPassword = (pw) => (pw.length < 6 ? pw + "#cfa-pin" : pw);

function authError(e) {
  const map = {
    "app/bad-username": "Use 2 to 30 letters or numbers for your username (dots, dashes and underscores are fine too).",
    "auth/invalid-credential": "Wrong password for that username. Check it and try again.",
    "auth/wrong-password": "Wrong password for that username. Check it and try again.",
    "auth/email-already-in-use": "Wrong password for that username. Check it and try again.",
    "auth/invalid-email": "Use 2 to 30 letters or numbers for your username.",
    "auth/missing-password": "Enter your password.",
    "auth/operation-not-allowed": "Sign-in is off. Turn on Email/Password under Authentication in the Firebase console.",
    "auth/network-request-failed": "No connection. Check your internet and try again.",
    "auth/too-many-requests": "Too many attempts. Wait a few minutes and try again.",
  };
  console.error(e);
  msg("authMsg", map[e.code] || "Couldn't sign in (" + (e.code || e.message || e) + ").", true);
}
$("auth").addEventListener("submit", async (e) => {
  e.preventDefault();
  let email, password = $("password").value;
  try { email = toEmail($("username").value); } catch (err) { authError(err); return; }
  if (password.length < 4) { msg("authMsg", "Use a password with at least 4 characters.", true); return; }
  $("signIn").disabled = true; msg("authMsg", "Opening your deck…");
  try {
    await fb.signInWithEmailAndPassword(fb.auth, email, toPassword(password));
    msg("authMsg", "");
  } catch (err) {
    // Firebase gives the same error for "no such account" and "wrong password",
    // so try creating the account; if the username is taken, the password was wrong.
    if (["auth/invalid-credential", "auth/user-not-found", "auth/invalid-login-credentials"].includes(err.code)) {
      try {
        await fb.createUserWithEmailAndPassword(fb.auth, email, toPassword(password));
        msg("authMsg", "");
      } catch (err2) { authError(err2); }
    } else authError(err);
  }
  $("signIn").disabled = false;
});
$("signOut").onclick = () => fb.signOut(fb.auth);

// ---------- study ----------
function setCards(list) {
  cards = list.sort((a, b) => (a.topic || "").localeCompare(b.topic || "") || (a.createdAt || 0) - (b.createdAt || 0));
  renderTopics(); rebuildQueue(true); renderList();
}
function topicsOf() {
  const m = new Map(); cards.forEach((c) => m.set(c.topic, (m.get(c.topic) || 0) + 1));
  return [...m.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}
function renderTopics() {
  const el = $("topics"); el.innerHTML = "";
  const ts = topicsOf();
  if (topicFilter !== "All" && !ts.some((t) => t[0] === topicFilter)) topicFilter = "All";
  [["All", cards.length], ...ts].forEach(([t, n]) => {
    const b = document.createElement("button");
    b.className = "chip"; b.setAttribute("aria-pressed", t === topicFilter);
    b.textContent = t;
    const s = document.createElement("span"); s.className = "n"; s.textContent = n; b.append(s);
    b.onclick = () => { topicFilter = t; local.set("cfa-topic", t); renderTopics(); rebuildQueue(false); };
    el.append(b);
  });
  const dl = $("topicList"); dl.innerHTML = "";
  ts.forEach(([t]) => { const o = document.createElement("option"); o.value = t; dl.append(o); });
}
const pool = () => cards.filter((c) => topicFilter === "All" || c.topic === topicFilter);
const box = (id) => (progress[id] && progress[id].box) || 0;

function rebuildQueue(keepCurrent) {
  const current = queue[pos];
  // weakest cards first, random order within the same level
  queue = pool().map((c) => c.id).sort((a, b) => box(a) - box(b) || Math.random() - 0.5);
  pos = 0; history = [];
  const keep = keepCurrent && current && queue.includes(current);
  if (keep) { queue.splice(queue.indexOf(current), 1); queue.unshift(current); }
  showCard(keep);
}
function showCard(keepFlip) {
  const c = cards.find((x) => x.id === queue[pos]);
  const card = $("card");
  if (!c) {
    card.hidden = true; $("empty").hidden = false;
    $("emptyText").textContent = cards.length ? "No cards in this topic yet." : "Your deck is empty. Tap + to add a card, import your notes under Manage cards, or start with examples.";
    $("loadStarter").hidden = cards.length > 0;
  } else {
    card.hidden = false; $("empty").hidden = true;
    $("fTopic").textContent = $("bTopic").textContent = c.topic;
    setRich($("fText"), c.front); setRich($("bText"), c.back);
    if (!keepFlip) {
      // reset without the flip animation, so the next card's answer never shows mid-turn
      card.classList.add("dragging"); setFlip(false); void card.offsetWidth; card.classList.remove("dragging");
    }
  }
  const flipped = card.classList.contains("flipped");
  $("again").disabled = $("good").disabled = !c || !flipped;
  $("edit").disabled = !c;
  $("prev").disabled = !history.length;
  renderStats();
}
function renderStats() {
  const p = pool();
  const mastered = p.filter((c) => box(c.id) >= 3).length;
  const learning = p.filter((c) => box(c.id) > 0 && box(c.id) < 3).length;
  const stats = $("stats"); stats.innerHTML = "";
  [["Card", p.length ? Math.min(pos + 1, queue.length) + " / " + queue.length : "0 / 0"], ["New", p.length - mastered - learning], ["Learning", learning], ["Mastered", mastered]]
    .forEach(([k, v]) => { const s = document.createElement("span"); s.textContent = k + " "; const b = document.createElement("b"); b.textContent = v; s.append(b); stats.append(s); });
  $("barFill").style.width = p.length ? (mastered / p.length) * 100 + "%" : "0";
}
function setFlip(on) {
  const card = $("card");
  card.classList.toggle("flipped", on);
  card.style.transform = on ? "rotateY(180deg)" : "";
}
function flip() {
  if ($("card").hidden) return;
  setFlip(!$("card").classList.contains("flipped"));
  showCard(true);
}
function grade(ok) {
  const id = queue[pos];
  if (!id || !$("card").classList.contains("flipped")) return;
  const next = { box: ok ? Math.min(box(id) + 1, 5) : 0, seen: Date.now() };
  progress[id] = next;
  fb.setDoc(fb.doc(progressCol(), id), next).catch((e) => console.error(e));
  history.push(pos);
  if (!ok) queue.splice(Math.min(pos + 4, queue.length), 0, id); // see it again soon
  pos++;
  if (pos >= queue.length) { rebuildQueue(false); return; }
  showCard(false);
}
function back() { if (!history.length) return; pos = history.pop(); showCard(false); }

// Tap to flip; once flipped, swipe right for "Got it" and left for "Review again".
(() => {
  const card = $("card");
  let startX = 0, startY = 0, dx = 0, active = false, moved = false;
  card.addEventListener("pointerdown", (e) => {
    active = true; moved = false; startX = e.clientX; startY = e.clientY; dx = 0;
  });
  card.addEventListener("pointermove", (e) => {
    if (!active) return;
    dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (!moved && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) { moved = true; card.setPointerCapture(e.pointerId); card.classList.add("dragging"); }
    if (moved && card.classList.contains("flipped")) {
      card.style.transform = `translateX(${dx}px) rotate(${dx / 30}deg) rotateY(180deg)`;
      $("tagGood").style.opacity = Math.max(0, Math.min(1, dx / 90));
      $("tagAgain").style.opacity = Math.max(0, Math.min(1, -dx / 90));
    }
  });
  const end = () => {
    if (!active) return;
    active = false;
    card.classList.remove("dragging");
    $("tagGood").style.opacity = $("tagAgain").style.opacity = 0;
    if (!moved) { flip(); return; }
    if (card.classList.contains("flipped") && Math.abs(dx) > 90) grade(dx > 0);
    else if (card.classList.contains("flipped")) card.style.transform = "rotateY(180deg)";
  };
  card.addEventListener("pointerup", end);
  card.addEventListener("pointercancel", () => { moved = true; dx = 0; end(); });
})();

$("again").onclick = () => grade(false);
$("good").onclick = () => grade(true);
$("prev").onclick = back;
$("edit").onclick = () => { const c = cards.find((x) => x.id === queue[pos]); if (c) openEditor(c); };
$("shuffle").onclick = () => { queue.sort(() => Math.random() - 0.5); pos = 0; history = []; showCard(false); };
let resetArmed = false;
$("reset").onclick = () => {
  if (!resetArmed) {
    resetArmed = true; $("reset").textContent = "Tap again to reset";
    setTimeout(() => { resetArmed = false; $("reset").textContent = "Reset progress"; }, 3000);
    return;
  }
  resetArmed = false; $("reset").textContent = "Reset progress";
  const ids = Object.keys(progress);
  for (let i = 0; i < ids.length; i += 400) {
    const b = fb.writeBatch(fb.db);
    ids.slice(i, i + 400).forEach((id) => b.delete(fb.doc(progressCol(), id)));
    b.commit().catch((e) => console.error(e));
  }
  progress = {}; rebuildQueue(false);
};
$("loadStarter").onclick = async () => {
  $("loadStarter").disabled = true;
  try { importCards(await (await fetch("cards.json")).json(), "formMsg"); }
  catch { $("emptyText").textContent = "Couldn't load the examples. Check your connection."; }
  $("loadStarter").disabled = false;
};
document.addEventListener("keydown", (e) => {
  if ($("app").hidden || $("editor").open || /INPUT|TEXTAREA/.test(e.target.tagName)) return;
  if (!$("learn").hidden) {
    if (e.key === "Escape" && document.body.classList.contains("focus")) setFocus(false);
    else if (e.key === "f") setFocus(!document.body.classList.contains("focus"));
    else if (e.key === "ArrowRight") nextReading();
    else if (e.key === "ArrowLeft") prevReading();
    else if (e.key === "s") toggleSaved();
    return;
  }
  if ($("study").hidden) return;
  if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); }
  else if (e.key === "1" || e.key === "ArrowDown") grade(false);
  else if (e.key === "2" || e.key === "ArrowUp") grade(true);
  else if (e.key === "ArrowLeft") back();
});

// ---------- refresher readings ----------
// refreshers.md holds short readings grouped by curriculum topic. Swipe right
// for a random new one; saved ones sync through users/<uid>/saved.
const SAVED = "Saved";
let readings = [];
let saved = {};              // readingId -> {area, title, savedAt}
let learnFilter = local.get("cfa-learn-topic", "All");
let learnCurrent = local.get("cfa-learn-current", null);
let learnBag = [], learnHistory = [], learnSeen = new Set();

const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
let areaWeight = {};          // area -> exam weight, e.g. "6–9%"
function parseReadings(text) {
  const out = []; let area = "General", cur = null;
  areaWeight = {};
  for (const line of text.replace(/<!--[\s\S]*?-->/g, "").split(/\r?\n/)) {
    let m;
    if ((m = line.match(/^# (.+)/))) { area = m[1].trim(); cur = null; }
    else if ((m = line.match(/^## (.+)/))) { cur = { id: slug(m[1]), area, title: m[1].trim(), lines: [] }; out.push(cur); }
    else if (cur) cur.lines.push(line);
    else if ((m = line.match(/^Weight: (.+)/))) areaWeight[area] = m[1].trim();
  }
  // "Module:" and "Scope:" lines at the top of a reading are shown apart from the text
  return out.map(({ lines, ...r }) => {
    const meta = {};
    while (lines.length) {
      const m = lines[0].match(/^(Module|Scope): (.+)/);
      if (m) meta[m[1].toLowerCase()] = m[2].trim();
      else if (lines[0].trim()) break;
      lines.shift();
    }
    return { ...r, ...meta, body: lines.join("\n").trim() };
  });
}

// Small Markdown subset: ### headings, - and 1. lists (one level of nesting),
// | tables |, **bold**. Formulas pass through untouched for KaTeX.
const esc = (t) => t.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const inline = (t) => t.split(/(\$\$[\s\S]+?\$\$|\\\([\s\S]+?\\\))/)
  .map((part, i) => (i % 2 ? esc(part) : esc(part).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>"))).join("");
const LIST_ITEM = /^(\s*)([-*]|\d+\.) (.+)/;
function mdList(items) {
  const tag = items[0].ord ? "ol" : "ul";
  let out = "<" + tag + ">", i = 0;
  while (i < items.length) {
    let li = inline(items[i++].text);
    const sub = [];
    while (i < items.length && items[i].deep) sub.push({ ...items[i++], deep: false });
    if (sub.length) li += mdList(sub);
    out += "<li>" + li + "</li>";
  }
  return out + "</" + tag + ">";
}
function mdToHtml(md) {
  const html = [], lines = md.split("\n");
  let para = [];
  const flush = () => { if (para.length) { html.push("<p>" + inline(para.join(" ")) + "</p>"); para = []; } };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]; let m;
    if (!line.trim()) { flush(); }
    else if ((m = line.match(/^### (.+)/))) { flush(); html.push("<h3>" + inline(m[1]) + "</h3>"); }
    else if (line.trim().startsWith("|")) {
      flush();
      const rows = [];
      for (; i < lines.length && lines[i].trim().startsWith("|"); i++) if (!/^[\s|:-]+$/.test(lines[i])) rows.push(lines[i]);
      i--;
      const cells = (r, t) => r.trim().replace(/^\||\|$/g, "").split("|").map((c) => "<" + t + ">" + inline(c.trim()) + "</" + t + ">").join("");
      html.push('<div class="r-table"><table><thead><tr>' + cells(rows[0], "th") + "</tr></thead><tbody>"
        + rows.slice(1).map((r) => "<tr>" + cells(r, "td") + "</tr>").join("") + "</tbody></table></div>");
    } else if (LIST_ITEM.test(line)) {
      flush();
      const items = [];
      for (; i < lines.length && (m = lines[i].match(LIST_ITEM)); i++) items.push({ deep: m[1].length >= 2, ord: /\d/.test(m[2]), text: m[3] });
      i--;
      html.push(mdList(items));
    } else para.push(line.trim());
  }
  flush();
  return html.join("");
}
function setRichHtml(el, html) {
  el.innerHTML = html;
  if (window.renderMathInElement) {
    try { window.renderMathInElement(el, { delimiters: MATH_DELIMS, throwOnError: false }); } catch {}
  }
}

const learnPool = () => readings.filter((r) => learnFilter === "All" || (learnFilter === SAVED ? saved[r.id] : r.area === learnFilter));
function renderLearn() {
  const el = $("learnTopics"); el.innerHTML = "";
  const areas = [...new Set(readings.map((r) => r.area))];
  const nSaved = readings.filter((r) => saved[r.id]).length;
  [["All", readings.length], ...areas.map((a) => [a, readings.filter((r) => r.area === a).length]), [SAVED, nSaved]].forEach(([t, n]) => {
    const b = document.createElement("button");
    b.className = "chip" + (t === SAVED ? " saved-chip" : ""); b.setAttribute("aria-pressed", t === learnFilter);
    b.textContent = t === SAVED ? "\u2605 Saved" : t;
    const c = document.createElement("span"); c.className = "n"; c.textContent = n; b.append(c);
    b.onclick = () => setLearnFilter(t);
    el.append(b);
  });
  renderSaved();
  showReading();
}
function setLearnFilter(t) {
  learnFilter = t; local.set("cfa-learn-topic", t);
  learnBag = []; learnHistory = []; learnSeen = new Set();
  const pool = learnPool();
  if (!pool.some((r) => r.id === learnCurrent)) learnCurrent = null;
  renderLearn();
  if (!learnCurrent) nextReading(false);
}
function shuffled(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
// A shuffled bag per round, so every topic in the filter comes up once before any repeats.
function nextReading(remember = true) {
  const ids = learnPool().map((r) => r.id);
  learnBag = learnBag.filter((id) => ids.includes(id) && id !== learnCurrent);
  if (!learnBag.length) {
    learnBag = shuffled(ids.filter((id) => id !== learnCurrent || ids.length === 1));
    learnSeen = new Set(learnCurrent && ids.length > 1 ? [learnCurrent] : []);
  }
  if (!learnBag.length) { learnCurrent = null; showReading(); return; }
  if (remember && learnCurrent) learnHistory.push(learnCurrent);
  openReading(learnBag.pop(), false);
}
function prevReading() {
  if (!learnHistory.length) return;
  openReading(learnHistory.pop(), false);
}
function openReading(id, remember = true) {
  if (remember && learnCurrent && learnCurrent !== id) learnHistory.push(learnCurrent);
  learnCurrent = id; local.set("cfa-learn-current", id); learnSeen.add(id);
  showReading();
  const r = $("reading");
  r.scrollTop = 0;
  if (!document.body.classList.contains("focus") && r.getBoundingClientRect().top < 0) r.scrollIntoView({ block: "start" });
  r.classList.add("dragging"); r.style.transform = ""; void r.offsetWidth; r.classList.remove("dragging");
}
function showReading() {
  const r = readings.find((x) => x.id === learnCurrent);
  $("reading").hidden = !r; $("learnEmpty").hidden = !!r || !readings.length;
  $("rSave").disabled = $("rCard").disabled = !r;
  $("rPrev").disabled = !learnHistory.length;
  $("rNext").disabled = !learnPool().length;
  const pool = learnPool().length;
  $("learnStats").textContent = pool ? pool + (pool === 1 ? " topic" : " topics") + (learnFilter === "All" ? "" : " in " + learnFilter)
    + " \u00b7 " + learnPool().filter((x) => learnSeen.has(x.id)).length + " read this round" : "";
  if (!r) {
    $("learnEmptyText").textContent = learnFilter === SAVED
      ? "Nothing saved yet. Tap Save on a topic you want to come back to."
      : "No topics here yet.";
    return;
  }
  $("rArea").textContent = r.area + (areaWeight[r.area] ? " \u00b7 " + areaWeight[r.area] + " of exam" : "");
  $("rTitle").textContent = r.title;
  $("rModule").textContent = r.module ? "Learning module: " + r.module : "";
  $("rModule").hidden = !r.module;
  $("rScope").textContent = r.scope || "";
  $("rScope").hidden = !r.scope;
  $("focusInfo").textContent = r.area;
  setRichHtml($("rBody"), mdToHtml(r.body));
  const on = !!saved[r.id];
  $("rSaved").textContent = on ? "\u2605 Saved" : "";
  $("focusSaved").textContent = on ? "\u2605 Saved" : "Double-tap to save";
  $("rSave").textContent = on ? "\u2605 Saved" : "\u2606 Save";
  $("rSave").setAttribute("aria-pressed", on);
}
function toggleSaved() {
  const r = readings.find((x) => x.id === learnCurrent);
  if (!r) return;
  if (!fb || !uid) { toast("Sign in to save topics"); return; }
  const ref = fb.doc(savedCol(), r.id);
  if (saved[r.id]) { delete saved[r.id]; fb.deleteDoc(ref).catch((e) => console.error(e)); toast("Removed from saved"); }
  else { saved[r.id] = { area: r.area, title: r.title, savedAt: Date.now() }; fb.setDoc(ref, saved[r.id]).catch((e) => console.error(e)); toast("\u2605 Saved"); }
  renderLearn();
}
let toastTimer;
function toast(text) {
  const t = $("toast");
  t.textContent = text; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 1400);
}

// Focus mode: only the reading, full screen. Swipe to move, double-tap to save.
function setFocus(on) {
  document.body.classList.toggle("focus", on);
  $("focusBar").hidden = !on;
  $("reading").scrollTop = 0;
  if (on) $("reading").focus({ preventScroll: true });
  else $("reading").scrollIntoView({ block: "start" });
}
$("rFocus").onclick = () => setFocus(true);
$("focusExit").onclick = () => setFocus(false);
// Saved topics, grouped by curriculum topic in curriculum order.
function renderSaved() {
  const list = readings.filter((r) => saved[r.id]);
  $("savedPanel").hidden = !list.length;
  $("savedTitle").textContent = "Saved topics (" + list.length + ")";
  const box = $("savedList"); box.innerHTML = "";
  [...new Set(list.map((r) => r.area))].forEach((area) => {
    const g = document.createElement("div"); g.className = "saved-group";
    const h = document.createElement("h3"); h.textContent = area;
    const l = document.createElement("div"); l.className = "list";
    list.filter((r) => r.area === area).forEach((r) => {
      const it = document.createElement("button"); it.className = "item"; it.type = "button";
      const q = document.createElement("span"); q.className = "q"; q.textContent = r.title;
      const go = document.createElement("span"); go.className = "go"; go.textContent = r.id === learnCurrent ? "Open now" : "Read";
      it.append(q, go);
      it.onclick = () => { openReading(r.id); renderSaved(); $("learn").scrollIntoView({ behavior: "smooth" }); };
      l.append(it);
    });
    g.append(h, l); box.append(g);
  });
}

fetch("refreshers.md").then((res) => res.text()).then((text) => {
  readings = parseReadings(text);
  if (learnFilter !== "All" && learnFilter !== SAVED && !readings.some((r) => r.area === learnFilter)) learnFilter = "All";
  if (!readings.some((r) => r.id === learnCurrent)) learnCurrent = null;
  renderLearn();
  if (!learnCurrent) nextReading(false);
}).catch(() => { $("learnEmpty").hidden = false; $("learnEmptyText").textContent = "Couldn't load the refresher topics. Check your connection."; });

$("rNext").onclick = () => nextReading();
$("rPrev").onclick = prevReading;
$("rSave").onclick = toggleSaved;
$("rCard").onclick = () => {
  const r = readings.find((x) => x.id === learnCurrent);
  if (!r) return;
  openEditor(null);
  $("fTopicIn").value = r.area; $("fFront").focus();
  msg("formMsg", "From: " + r.title);
};

// Swipe right for a new topic, left to go back; double-tap to save.
// Vertical drags scroll.
(() => {
  const el = $("reading");
  let startX = 0, startY = 0, dx = 0, active = false, moved = false;
  let lastTap = 0, lastX = 0, lastY = 0;
  el.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    active = true; moved = false; startX = e.clientX; startY = e.clientY; dx = 0;
  });
  el.addEventListener("pointermove", (e) => {
    if (!active) return;
    dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (!moved && Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy) * 1.5) { moved = true; el.setPointerCapture(e.pointerId); el.classList.add("dragging"); }
    if (!moved) return;
    el.style.transform = `translateX(${dx}px) rotate(${dx / 40}deg)`;
    $("rTagNext").style.opacity = Math.max(0, Math.min(1, dx / 90));
    $("rTagBack").style.opacity = learnHistory.length ? Math.max(0, Math.min(1, -dx / 90)) : 0;
  });
  const end = (e) => {
    if (!active) return;
    active = false;
    el.classList.remove("dragging");
    $("rTagNext").style.opacity = $("rTagBack").style.opacity = 0;
    if (!moved) {
      const now = Date.now();
      if (now - lastTap < 350 && Math.abs(e.clientX - lastX) < 30 && Math.abs(e.clientY - lastY) < 30) { lastTap = 0; toggleSaved(); }
      else { lastTap = now; lastX = e.clientX; lastY = e.clientY; }
      return;
    }
    el.style.transform = "";
    if (dx > 90) nextReading();
    else if (dx < -90 && learnHistory.length) prevReading();
  };
  el.addEventListener("pointerup", end);
  el.addEventListener("pointercancel", () => { dx = 0; moved = true; lastTap = 0; end(); });
  el.addEventListener("dblclick", (e) => e.preventDefault()); // no word selection on double-tap
})();

// ---------- tabs ----------
const TABS = { study: "tabStudy", learn: "tabLearn", manage: "tabManage", hand: "tabHand" };
function selectTab(which) {
  if (!TABS[which]) which = "study";
  for (const [id, tab] of Object.entries(TABS)) {
    $(tab).setAttribute("aria-selected", id === which);
    $(id).hidden = id !== which;
  }
  local.set("cfa-tab", which);
  if (which !== "learn") setFocus(false);
  $("fab").hidden = $("app").hidden || which === "hand";
  if (which === "hand") sizePad();
}
$("tabStudy").onclick = () => selectTab("study");
$("tabLearn").onclick = () => selectTab("learn");
$("tabManage").onclick = () => selectTab("manage");
$("tabHand").onclick = () => selectTab("hand");

// ---------- add / edit dialog ----------
function openEditor(c) {
  editingId = c ? c.id : null;
  $("formTitle").textContent = c ? "Edit card" : "Add a card";
  $("save").textContent = c ? "Save changes" : "Save and add another";
  $("deleteBtn").hidden = !c;
  $("deleteBtn").textContent = "Delete card";
  $("fTopicIn").value = c ? c.topic : (topicFilter !== "All" ? topicFilter : local.get("cfa-last-topic", ""));
  $("fFront").value = c ? c.front : "";
  $("fBack").value = c ? c.back : "";
  msg("formMsg", "");
  updatePreview();
  $("editor").showModal();
  ($("fTopicIn").value ? $("fFront") : $("fTopicIn")).focus();
}
function updatePreview() {
  const f = $("fFront").value, b = $("fBack").value;
  const has = /\$\$|\\\(|\\\[/.test(f + b);
  $("preview").hidden = !has;
  if (has) { setRich($("previewFront"), f); setRich($("previewBack"), b); }
}
let previewTimer;
["fFront", "fBack"].forEach((id) => $(id).addEventListener("input", () => { clearTimeout(previewTimer); previewTimer = setTimeout(updatePreview, 250); }));
$("fab").onclick = () => openEditor(null);
$("closeEditor").onclick = () => $("editor").close();
$("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const card = { id: editingId, topic: $("fTopicIn").value, front: $("fFront").value, back: $("fBack").value };
  if (!card.topic.trim() || !card.front.trim() || !card.back.trim()) return;
  if (editingId) card.createdAt = (cards.find((c) => c.id === editingId) || {}).createdAt;
  local.set("cfa-last-topic", card.topic.trim());
  saveCard(card);
  if (editingId) { $("editor").close(); return; }
  msg("formMsg", "Saved. Add the next one.");
  $("fFront").value = ""; $("fBack").value = ""; updatePreview(); $("fFront").focus();
});
let deleteArmed = false;
$("deleteBtn").onclick = () => {
  if (!deleteArmed) {
    deleteArmed = true; $("deleteBtn").textContent = "Tap again to delete";
    setTimeout(() => { deleteArmed = false; $("deleteBtn").textContent = "Delete card"; }, 3000);
    return;
  }
  deleteArmed = false;
  deleteCard(editingId); $("editor").close();
};

// ---------- notes import ----------
function parseNotes(text) {
  text = text.trim();
  if (!text) return [];
  if (text.startsWith("[")) {
    return JSON.parse(text).map((c) => ({ topic: String(c.topic || "General"), front: String(c.front || c.question || ""), back: String(c.back || c.answer || "") }));
  }
  if (/^\s*q\s*[:.]/im.test(text)) {
    // "# Topic" headings, then Q:/A: pairs; answers may span several lines
    const out = []; let topic = "General", cur = null, field = null;
    const push = () => { if (cur && cur.front.trim() && cur.back.trim()) out.push(cur); cur = null; field = null; };
    for (const raw of text.split(/\r?\n/)) {
      const line = raw.trimEnd();
      let m;
      if ((m = line.match(/^\s*#+\s*(.+)$/))) { push(); topic = m[1].trim(); }
      else if ((m = line.match(/^\s*q\s*[:.]\s*(.*)$/i))) { push(); cur = { topic, front: m[1], back: "" }; field = "front"; }
      else if ((m = line.match(/^\s*a\s*[:.]\s*(.*)$/i)) && cur) { cur.back = m[1]; field = "back"; }
      else if (cur && field) { cur[field] += (cur[field] ? "\n" : "") + line; }
    }
    push();
    return out.map((c) => ({ ...c, front: c.front.trim(), back: c.back.trim() }));
  }
  return text.split(/\r?\n/).filter((l) => l.trim()).map((l) => {
    const parts = l.split("|").map((s) => s.trim().replace(/\\n(?![a-zA-Z])/g, "\n"));
    if (parts.length < 3) throw new Error("Couldn't read this line. Use Topic | Question | Answer, or Q: and A: lines: " + l.slice(0, 60));
    return { topic: parts[0], front: parts[1], back: parts.slice(2).join(" | ") };
  });
}
$("importBtn").onclick = () => {
  let list;
  try { list = parseNotes($("bulk").value).filter((c) => c.front && c.back); }
  catch (e) { msg("bulkMsg", e.message || "That JSON couldn't be read.", true); return; }
  if (!list.length) { msg("bulkMsg", "No cards found. Check the format examples above.", true); return; }
  importCards(list, "bulkMsg");
  msg("bulkMsg", "Imported " + list.length + (list.length === 1 ? " card" : " cards"));
  $("bulk").value = "";
  local.set("cfa-draft", "");
};
// keep an unsent notes draft if the app is closed mid-typing
$("bulk").value = local.get("cfa-draft", "");
$("bulk").addEventListener("input", () => local.set("cfa-draft", $("bulk").value));

// ---------- card list ----------
function renderList() {
  const q = $("search").value.trim().toLowerCase();
  const shown = cards.filter((c) => !q || (c.topic + " " + c.front + " " + c.back).toLowerCase().includes(q));
  $("listTitle").textContent = "All cards (" + cards.length + ")";
  const el = $("list"); el.innerHTML = "";
  if (!shown.length) {
    const d = document.createElement("div"); d.className = "item"; d.textContent = q ? "No cards match your search." : "No cards yet.";
    el.append(d); return;
  }
  shown.forEach((c) => {
    const it = document.createElement("button"); it.className = "item"; it.type = "button";
    const t = document.createElement("span"); t.className = "t"; t.textContent = c.topic;
    const go = document.createElement("span"); go.className = "go"; go.textContent = "Edit";
    const qq = document.createElement("span"); qq.className = "q"; setRich(qq, c.front);
    it.append(t, go, qq);
    it.onclick = () => openEditor(c);
    el.append(it);
  });
}
$("search").addEventListener("input", renderList);
$("exportBtn").onclick = async () => {
  const json = JSON.stringify(cards.map(({ topic, front, back }) => ({ topic, front, back })), null, 2);
  try { await navigator.clipboard.writeText(json); msg("listMsg", "Copied " + cards.length + " cards to the clipboard"); }
  catch {
    let ta = $("exportBox");
    if (!ta) { ta = document.createElement("textarea"); ta.id = "exportBox"; ta.readOnly = true; ta.setAttribute("aria-label", "Deck as JSON"); $("list").after(ta); }
    ta.value = json; ta.select();
    msg("listMsg", "Select all the text in the box below the list and copy it", true);
  }
};


// ---------- handwriting ----------
// Free path to Claude: the drawing is copied to the clipboard, pasted into the
// Handwriting Converter page inside claude.ai (runs on the user's Claude plan),
// and the result is pasted back here to check and add.
const pad = $("pad"), pctx = pad.getContext("2d");
let strokes = local.get("cfa-strokes", []), curStroke = null, penSeen = false, photoBlob = null;

function sizePad() {
  const r = pad.getBoundingClientRect();
  if (!r.width) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  pad.width = Math.round(r.width * dpr); pad.height = Math.round(r.height * dpr);
  pctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  redrawPad();
}
function drawStroke(g, s, boost = 0) {
  g.strokeStyle = "#15231F"; g.fillStyle = "#15231F"; g.lineCap = "round"; g.lineJoin = "round";
  for (let i = 1; i < s.length; i++) {
    g.lineWidth = 1.2 + boost + 2.6 * ((s[i - 1].p + s[i].p) / 2);
    g.beginPath(); g.moveTo(s[i - 1].x, s[i - 1].y); g.lineTo(s[i].x, s[i].y); g.stroke();
  }
  if (s.length === 1) { g.beginPath(); g.arc(s[0].x, s[0].y, 1.7, 0, 7); g.fill(); }
}
function redrawPad() {
  const r = pad.getBoundingClientRect();
  pctx.fillStyle = "#FFFFFF"; pctx.fillRect(0, 0, r.width, r.height);
  pctx.strokeStyle = "#E3E9E6"; pctx.lineWidth = 1;
  for (let y = 48; y < r.height; y += 48) { pctx.beginPath(); pctx.moveTo(0, y + .5); pctx.lineTo(r.width, y + .5); pctx.stroke(); }
  strokes.forEach((s) => drawStroke(pctx, s));
  $("padHint").hidden = strokes.length > 0;
}
const saveStrokes = () => local.set("cfa-strokes", strokes);
function padPoint(e) {
  const r = pad.getBoundingClientRect();
  return { x: Math.round((e.clientX - r.left) * 10) / 10, y: Math.round((e.clientY - r.top) * 10) / 10, p: e.pointerType === "pen" ? (e.pressure || .5) : .5 };
}
pad.addEventListener("pointerdown", (e) => {
  if (e.pointerType === "pen") penSeen = true;
  if (e.pointerType === "touch" && penSeen) return; // ignore the palm once a pencil is in use
  pad.setPointerCapture(e.pointerId);
  curStroke = [padPoint(e)]; strokes.push(curStroke); $("padHint").hidden = true; drawStroke(pctx, curStroke);
});
pad.addEventListener("pointermove", (e) => {
  if (!curStroke) return;
  const evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
  evs.forEach((ev) => curStroke.push(padPoint(ev)));
  drawStroke(pctx, curStroke.slice(-evs.length - 1));
});
const endPadStroke = () => { if (curStroke) { curStroke = null; saveStrokes(); } };
pad.addEventListener("pointerup", endPadStroke);
pad.addEventListener("pointercancel", endPadStroke);
$("padUndo").onclick = () => { strokes.pop(); saveStrokes(); redrawPad(); };
$("padClear").onclick = () => { strokes = []; saveStrokes(); redrawPad(); };
addEventListener("resize", () => { clearTimeout(sizePad.t); sizePad.t = setTimeout(() => { if (!$("hand").hidden) sizePad(); }, 150); });

$("handPhoto").addEventListener("change", () => {
  const f = $("handPhoto").files[0];
  photoBlob = f || null;
  $("photoName").textContent = f ? "Using photo: " + f.name : "";
});

// Cropped, high-contrast PNG of the drawing (or the chosen photo as PNG).
function handwritingPng() {
  if (photoBlob) {
    return createImageBitmap(photoBlob).then((bmp) => {
      const scale = Math.min(1, 2000 / Math.max(bmp.width, bmp.height));
      const c = document.createElement("canvas"); c.width = Math.round(bmp.width * scale); c.height = Math.round(bmp.height * scale);
      c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
      return new Promise((res) => c.toBlob(res, "image/png"));
    });
  }
  const pts = strokes.flat();
  const minX = Math.max(0, Math.min(...pts.map((p) => p.x)) - 24), minY = Math.max(0, Math.min(...pts.map((p) => p.y)) - 24);
  const maxX = Math.max(...pts.map((p) => p.x)) + 24, maxY = Math.max(...pts.map((p) => p.y)) + 24;
  const k = 2, c = document.createElement("canvas");
  c.width = Math.ceil((maxX - minX) * k); c.height = Math.ceil((maxY - minY) * k);
  const g = c.getContext("2d");
  g.fillStyle = "#FFFFFF"; g.fillRect(0, 0, c.width, c.height);
  g.setTransform(k, 0, 0, k, -minX * k, -minY * k);
  strokes.forEach((s) => drawStroke(g, s, 0.2));
  return new Promise((res) => c.toBlob(res, "image/png"));
}

$("toClaude").onclick = () => {
  if (!photoBlob && !strokes.length) { msg("handMsg", "Write something on the pad first.", true); return; }
  $("handFallback").hidden = true;
  const png = handwritingPng();
  // The copy must start inside the tap for iPad Safari to allow it, so the
  // image goes in as a promise rather than after an await.
  let copied;
  try {
    copied = navigator.clipboard.write([new ClipboardItem({ "image/png": png })]);
  } catch (e) { copied = Promise.reject(e); }
  copied.then(
    () => msg("handMsg", "Copied. Now tap Open Claude."),
    async () => {
      msg("handMsg", "Couldn't copy automatically. Use the image below.", true);
      $("handImg").src = URL.createObjectURL(await png);
      $("handFallback").hidden = false;
    },
  );
};

// ---- results from Claude ----
let handCards = [];
function loadHandResult(text) {
  let list;
  try { list = parseNotes(text).filter((c) => c.front || c.back); } catch { list = []; }
  if (!list.length) { msg("addMsg", "That doesn't look like cards from the converter. In Claude, tap Copy for import, then try again.", true); return; }
  handCards.push(...list);
  $("handPaste").value = "";
  msg("addMsg", list.length + (list.length === 1 ? " card" : " cards") + " ready to check.");
  renderHandCards();
}
$("pasteResult").onclick = async () => {
  try {
    const text = await navigator.clipboard.readText();
    if (text && text.trim()) loadHandResult(text);
    else msg("addMsg", "The clipboard is empty. In Claude, tap Copy for import first.", true);
  } catch {
    msg("addMsg", "Tap the box below, then choose Paste.", true);
    $("handPaste").focus();
  }
};
$("handPaste").addEventListener("paste", () => setTimeout(() => { if ($("handPaste").value.trim()) loadHandResult($("handPaste").value); }, 0));

function renderHandCards() {
  const box = $("handCards"); box.innerHTML = "";
  $("addAll").hidden = handCards.length < 2;
  handCards.forEach((c, i) => {
    const el = document.createElement("div"); el.className = "hcard";
    const mk = (label, key, rows) => {
      const l = document.createElement("label"); l.textContent = label;
      const t = document.createElement(rows ? "textarea" : "input");
      if (rows) t.rows = rows; else t.setAttribute("list", "topicList");
      t.value = c[key];
      t.addEventListener("input", () => { c[key] = t.value; clearTimeout(t._p); t._p = setTimeout(prev, 250); });
      l.append(t); return l;
    };
    const pv = document.createElement("div"); pv.className = "preview";
    const lab = document.createElement("span"); lab.className = "preview-label"; lab.textContent = "Preview";
    const pf = document.createElement("div"); pf.className = "pf";
    const pb = document.createElement("div");
    pv.append(lab, pf, pb);
    const prev = () => { setRich(pf, c.front); setRich(pb, c.back); };
    const fields = document.createElement("div"); fields.className = "fields";
    fields.append(mk("Question (front)", "front", 3), mk("Answer (back)", "back", 3));
    const row = document.createElement("div"); row.className = "row";
    const add = document.createElement("button"); add.className = "btn good"; add.textContent = "Add to deck";
    add.onclick = () => addHandCard(i);
    const drop = document.createElement("button"); drop.className = "btn"; drop.textContent = "Discard";
    drop.onclick = () => { handCards.splice(i, 1); renderHandCards(); };
    row.append(add, drop);
    el.append(mk("Topic", "topic"), fields, pv, row);
    box.append(el);
    prev();
  });
}
function addHandCard(i) {
  const c = handCards[i];
  if (!c.topic.trim() || !c.front.trim() || !c.back.trim()) { msg("addMsg", "Each card needs a topic, a question and an answer.", true); return false; }
  saveCard({ topic: c.topic, front: c.front, back: c.back });
  handCards.splice(i, 1);
  msg("addMsg", "Added to your deck.");
  renderHandCards();
  return true;
}
$("addAll").onclick = () => {
  let n = 0;
  for (let i = handCards.length - 1; i >= 0; i--) {
    const c = handCards[i];
    if (c.topic.trim() && c.front.trim() && c.back.trim()) { saveCard(c); handCards.splice(i, 1); n++; }
  }
  renderHandCards();
  msg("addMsg", "Added " + n + (n === 1 ? " card" : " cards") + (handCards.length ? ". The rest need a topic, question and answer." : "."), handCards.length > 0);
};

selectTab(local.get("cfa-tab", "study")); // last, once the handwriting pad exists
