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
addEventListener("load", () => { if (typeof showCard === "function" && cards.length) { showCard(true); renderList(); } });

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
  $("fab").hidden = view !== "app";
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
    else { uid = null; cards = []; progress = {}; show("auth"); setSync("", "Signed out"); }
  });
}

// ---------- Firestore ----------
const cardsCol = () => fb.collection(fb.db, "users", uid, "cards");
const progressCol = () => fb.collection(fb.db, "users", uid, "progress");

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
  if ($("app").hidden || $("study").hidden || $("editor").open || /INPUT|TEXTAREA/.test(e.target.tagName)) return;
  if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); }
  else if (e.key === "1" || e.key === "ArrowDown") grade(false);
  else if (e.key === "2" || e.key === "ArrowUp") grade(true);
  else if (e.key === "ArrowLeft") back();
});

// ---------- tabs ----------
function selectTab(which) {
  const study = which === "study";
  $("tabStudy").setAttribute("aria-selected", study);
  $("tabManage").setAttribute("aria-selected", !study);
  $("study").hidden = !study; $("manage").hidden = study;
  local.set("cfa-tab", which);
}
$("tabStudy").onclick = () => selectTab("study");
$("tabManage").onclick = () => selectTab("manage");
selectTab(local.get("cfa-tab", "study"));

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
