// ── PAGE METADATA ─────────────────────────────────────────────────────────────
const PAGE_META = {
  'home':                     { title:'Home',                          icon:'🏠', cat:'overview'  },
  'wellsfargo':               { title:'Wells Fargo',                   icon:'🏦', cat:'company'   },
  'alstom1':                  { title:'Alstom – Round 1',              icon:'🚄', cat:'company'   },
  'alstom2':                  { title:'Alstom – Round 2',              icon:'🚄', cat:'company'   },
  'bosch':                    { title:'Bosch',                         icon:'⚙️', cat:'company'   },
  'cts':                      { title:'CTS',                           icon:'💼', cat:'company'   },
  'netsmart':                 { title:'Netsmart',                      icon:'🏥', cat:'company'   },
  'wipro':                    { title:'Wipro',                         icon:'🔷', cat:'company'   },
  'topics':                   { title:'All Topics Index',              icon:'📚', cat:'overview'  },
  'ref-microservices':        { title:'Microservices Architecture',    icon:'🧩', cat:'reference' },
  'ref-kubernetes':           { title:'Kubernetes, AKS & OpenShift',  icon:'☸️', cat:'reference' },
  'ref-azure-security':       { title:'Azure Security',               icon:'🔐', cat:'reference' },
  'ref-database':             { title:'Database Architecture',         icon:'🗄️', cat:'reference' },
  'ref-eventdriven':          { title:'Event-Driven & Messaging',      icon:'⚡', cat:'reference' },
  'ref-patterns':             { title:'Design Patterns',               icon:'🧱', cat:'reference' },
  'ref-devops':               { title:'CI/CD & DevSecOps',             icon:'🚀', cat:'reference' },
  'ref-frontend':             { title:'Frontend Architecture',         icon:'🎨', cat:'reference' },
  'ref-systemdesign':         { title:'System Design',                 icon:'🏛️', cat:'reference' },
  'ref-hld':                  { title:'High-Level Design (HLD)',       icon:'📐', cat:'reference' },
  'ref-lld':                  { title:'Low-Level Design (LLD)',        icon:'🔍', cat:'reference' },
  'ref-migration':            { title:'Cloud Migration',               icon:'☁️', cat:'reference' },
  'cloud-azure':              { title:'Microsoft Azure',               icon:'🔷', cat:'cloud'      },
  'cloud-aws':                { title:'Amazon AWS',                    icon:'🟧', cat:'cloud'      },
  'cloud-gcp':                { title:'Google Cloud (GCP)',            icon:'🟢', cat:'cloud'      },
  'cloud-compare':            { title:'Compare — Service Equivalence', icon:'⚖️', cat:'cloud'      },
  'sd-facebook':              { title:'Facebook',                      icon:'📘', cat:'sysdesign'  },
  'sd-instagram':             { title:'Instagram',                     icon:'📷', cat:'sysdesign'  },
  'sd-whatsapp':              { title:'WhatsApp',                      icon:'💬', cat:'sysdesign'  },
  'sd-youtube':               { title:'YouTube',                       icon:'▶️', cat:'sysdesign'  },
  'sd-netflix':               { title:'Netflix',                       icon:'🎬', cat:'sysdesign'  },
  'sd-uber':                  { title:'Uber (Cab Booking)',            icon:'🚕', cat:'sysdesign'  },
  'sd-bookmyshow':            { title:'BookMyShow',                    icon:'🎟️', cat:'sysdesign'  },
  'sd-swiggy-zomato':         { title:'Swiggy / Zomato',                icon:'🍔', cat:'sysdesign'  },
  'sd-tinyurl':               { title:'TinyURL / Bitly',               icon:'🔗', cat:'sysdesign'  },
  'sd-ev-charging':           { title:'EV Charging Stations',          icon:'🔌', cat:'sysdesign'  },
  'sd-google-drive':          { title:'Google Drive',                  icon:'📁', cat:'sysdesign'  },
  'sd-amazon':                { title:'Amazon',                        icon:'🛒', cat:'sysdesign'  },
  'sd-linkedin':              { title:'LinkedIn',                      icon:'💼', cat:'sysdesign'  },
  'sd-twitter-x':             { title:'Twitter / X',                   icon:'🐦', cat:'sysdesign'  },
  'sd-gmail':                 { title:'Gmail',                         icon:'📧', cat:'sysdesign'  },
  'sd-google-maps':           { title:'Google Maps',                   icon:'🗺️', cat:'sysdesign'  },
  'sd-spotify':               { title:'Spotify',                       icon:'🎵', cat:'sysdesign'  },
  'sd-zoom':                  { title:'Zoom',                          icon:'📹', cat:'sysdesign'  },
  'sd-paytm':                 { title:'Paytm',                         icon:'💳', cat:'sysdesign'  },
  'sd-upi':                   { title:'UPI Payment System',            icon:'🇮🇳', cat:'sysdesign'  },
  'ref-architecture-advanced':{ title:'Architecture & DDD',            icon:'🏗️', cat:'deepdive'  },
  'ref-distributed':          { title:'Distributed Systems',           icon:'🌐', cat:'deepdive'  },
  'ref-database-advanced':    { title:'Database Deep Dive',            icon:'🗄️', cat:'deepdive'  },
  'ref-messaging-advanced':   { title:'Messaging (Kafka/RabbitMQ)',    icon:'📨', cat:'deepdive'  },
  'ref-dotnet':               { title:'.NET Architecture',             icon:'⚙️', cat:'deepdive'  },
  'ref-networking':           { title:'Networking',                    icon:'🌍', cat:'deepdive'  },
  'ref-docker':               { title:'Docker',                        icon:'🐳', cat:'deepdive'  },
  'ref-ha':                   { title:'High Availability',             icon:'🔄', cat:'deepdive'  },
  'ref-performance':          { title:'Performance Engineering',       icon:'⚡', cat:'deepdive'  },
  'ref-caching':              { title:'Caching — Redis & In-Memory',   icon:'🗃️', cat:'deepdive'  },
  'ref-monitoring-advanced':  { title:'Monitoring & Observability',    icon:'📊', cat:'deepdive'  },
  'ref-security-advanced':    { title:'Security Deep Dive',            icon:'🔐', cat:'deepdive'  },
  'ref-storage':              { title:'Storage Systems',               icon:'💾', cat:'deepdive'  },
  'ref-leadership':           { title:'Leadership & Director',         icon:'🎯', cat:'deepdive'  },
  'ref-scenarios':            { title:'Real-World Scenarios',          icon:'🏗️', cat:'deepdive'  },
  'ref-fundamentals':         { title:'SOLID · OSI · SQL vs NoSQL',    icon:'📐', cat:'deepdive'  },
  'ref-perf-testing':         { title:'Performance Testing',           icon:'🔬', cat:'deepdive'  },
  'ref-iac':                  { title:'IaC — Terraform',               icon:'🏗️', cat:'deepdive'  },
  'ref-deployments':          { title:'Deployment Strategies',         icon:'🚀', cat:'deepdive'  },
  'ref-cloud-migration':      { title:'Cloud Migration Strategy',      icon:'☁️', cat:'deepdive'  },
  'ref-ui-frameworks':        { title:'Angular & React',               icon:'🎨', cat:'deepdive'  },
  'ref-llm-ai':               { title:'LLM & Modern AI Chatbots',      icon:'🤖', cat:'deepdive'  },
  'ref-infosecops':           { title:'InfoSec Operations',            icon:'🛡️', cat:'deepdive'  },
};
const CAT_LABEL = { company:'Company Round', reference:'Architect Reference', deepdive:'Deep Dive', overview:'Overview', cloud:'Cloud Services', sysdesign:'System Design' };

// ── STORAGE NAMESPACE ───────────────────────────────────────────────────────────
// Each page (index.html, companies.html, …) sets window.APP_NS so their remembered
// page/scroll/section state stay separate. Login (auth.js) is intentionally shared.
const APP_NS = window.APP_NS || 'interviewPrep';

// ── NAVIGATION ────────────────────────────────────────────────────────────────
let _lastPageId   = window.APP_HOME || 'home';
let _lastPageLink = null;

function showPage(id, link) {
  document.querySelectorAll('#sidebar nav a').forEach(a => a.classList.remove('active'));
  if (link) link.classList.add('active');
  _lastPageId   = id;
  _lastPageLink = link;
  const content = window.Pages[id];
  document.getElementById('content').innerHTML = content
    ? content
    : '<div class="page-header"><h1>Page not found: ' + id + '</h1></div>';
  window.scrollTo(0, 0);
  persistNavState(0);   // remember page across refresh (scroll resets to top on nav)
}

function toggleSidebar() {
  const collapsed = document.body.classList.toggle('sidebar-collapsed');
  document.getElementById('sidebar-toggle').textContent = collapsed ? '▶' : '◀';
}

function toggleGroup(id, label) {
  const grp = document.getElementById(id);
  const chevron = label.querySelector('.chevron');
  const isCollapsed = grp.classList.toggle('collapsed');
  chevron.style.transform = isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)';
  grp.style.maxHeight = isCollapsed ? '0' : grp.scrollHeight + 'px';
  persistNavGroups();   // remember expanded/collapsed sections across refresh
}

// ── SIDEBAR GROUP STATE (survive refresh) ──────────────────────────────────────
// Remembers which sidebar sections are collapsed, so a refresh restores the same
// expanded/collapsed layout (just like the content page + scroll position).
const NAV_GROUPS_KEY = APP_NS + '.navGroups';

function persistNavGroups() {
  try {
    const collapsed = [];
    document.querySelectorAll('#sidebar nav .nav-group').forEach(g => {
      if (g.classList.contains('collapsed')) collapsed.push(g.id);
    });
    localStorage.setItem(NAV_GROUPS_KEY, JSON.stringify(collapsed));
  } catch (e) { /* storage unavailable — ignore */ }
}

function restoreNavGroups() {
  let collapsed = [];
  try { collapsed = JSON.parse(localStorage.getItem(NAV_GROUPS_KEY) || '[]'); } catch (e) {}
  const collapsedSet = new Set(collapsed);
  document.querySelectorAll('#sidebar nav .nav-group').forEach(g => {
    const isCollapsed = collapsedSet.has(g.id);   // groups not saved default to expanded
    const label = g.previousElementSibling;       // the matching .section-label
    const chevron = label ? label.querySelector('.chevron') : null;
    g.classList.toggle('collapsed', isCollapsed);
    if (chevron) chevron.style.transform = isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)';
    g.style.maxHeight = isCollapsed ? '0' : g.scrollHeight + 'px';
  });
}

// ── SEARCH ────────────────────────────────────────────────────────────────────

// Strip all HTML tags and collapse whitespace → plain text
function stripHtml(html) {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ').trim();
}

// Find up to `maxSnippets` context snippets around each match
function getSnippets(text, query, maxSnippets) {
  const lower = text.toLowerCase();
  const lq    = query.toLowerCase();
  const snippets = [];
  let pos = 0;
  while (snippets.length < maxSnippets) {
    const idx = lower.indexOf(lq, pos);
    if (idx === -1) break;
    const start = Math.max(0, idx - 70);
    const end   = Math.min(text.length, idx + query.length + 90);
    let frag = (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
    // highlight the match
    const re = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    frag = frag.replace(re, '<mark>$1</mark>');
    snippets.push(frag);
    pos = idx + query.length;
    // skip to next non-overlapping region (at least 80 chars away)
    pos = Math.max(pos, idx + 80);
  }
  return snippets;
}

// Count total occurrences
function countMatches(text, query) {
  const re = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  return (text.match(re) || []).length;
}

let _searchDebounce = null;

function onSearchInput(val) {
  document.getElementById('search-clear').style.display = val ? 'block' : 'none';
  clearTimeout(_searchDebounce);
  if (!val.trim()) {
    // Restore last page
    showPage(_lastPageId, _lastPageLink);
    return;
  }
  _searchDebounce = setTimeout(() => runSearch(val.trim()), 180);
}

function clearSearch() {
  const inp = document.getElementById('search-input');
  inp.value = '';
  document.getElementById('search-clear').style.display = 'none';
  inp.focus();
  showPage(_lastPageId, _lastPageLink);
}

function runSearch(query) {
  document.querySelectorAll('#sidebar nav a').forEach(a => a.classList.remove('active'));

  const results = [];
  for (const [id, html] of Object.entries(window.Pages || {})) {
    const plain = stripHtml(html);
    const count = countMatches(plain, query);
    if (count === 0) continue;
    const snippets = getSnippets(plain, query, 3);
    results.push({ id, count, snippets });
  }

  // Sort by match count descending
  results.sort((a, b) => b.count - a.count);

  // Build results HTML
  let html = '<div class="sr-header">'
    + '<h2>🔍 Search Results</h2>'
    + '<p>' + (results.length > 0
        ? 'Found <strong>' + results.length + ' page' + (results.length > 1 ? 's' : '') + '</strong> matching <strong>"' + escHtml(query) + '"</strong>'
        : 'No results for <strong>"' + escHtml(query) + '"</strong>')
    + '</p></div>';

  if (results.length === 0) {
    html += '<div class="sr-none"><div class="sr-none-icon">🔎</div>Try a different keyword — e.g. "CQRS", "Kubernetes", "Polly", "Saga"</div>';
  } else {
    html += '<div class="sr-list">';
    for (const r of results) {
      const meta = PAGE_META[r.id] || { title: r.id, icon: '📄', cat: 'overview' };
      const catCls = 'cat-' + meta.cat;
      const catLbl = CAT_LABEL[meta.cat] || meta.cat;
      html += '<div class="sr-card" onclick="searchNavigate(\'' + r.id + '\')">'
        + '<div class="sr-card-top">'
        +   '<span class="sr-card-icon">' + meta.icon + '</span>'
        +   '<span class="sr-card-title">' + escHtml(meta.title) + '</span>'
        +   '<span class="sr-card-cat ' + catCls + '">' + catLbl + '</span>'
        + '</div>'
        + '<div class="sr-snippets">'
        + r.snippets.map(s => '<div class="sr-snippet">' + s + '</div>').join('')
        + '</div>'
        + '</div>';
    }
    html += '</div>';
  }

  document.getElementById('content').innerHTML = html;
  window.scrollTo(0, 0);
}

function searchNavigate(id) {
  // Find the sidebar link for this page and navigate
  const link = document.querySelector('#sidebar nav a[onclick*="\'' + id + '\'"]');
  clearSearch();
  showPage(id, link || null);
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── STATE PERSISTENCE (survive page refresh) ────────────────────────────────────
// Remembers which page you were on AND how far you had scrolled, so a refresh
// (or reopening the tab) lands you back exactly where you left off.
const NAV_STATE_KEY = APP_NS + '.navState';
let _scrollSaveTimer = null;

function persistNavState(scrollY) {
  try {
    localStorage.setItem(NAV_STATE_KEY, JSON.stringify({
      pageId:  _lastPageId,
      scrollY: (typeof scrollY === 'number') ? scrollY : window.scrollY
    }));
  } catch (e) { /* storage unavailable (private mode / quota) — ignore */ }
}

// Save scroll position as the user scrolls (debounced to avoid thrashing storage).
window.addEventListener('scroll', () => {
  clearTimeout(_scrollSaveTimer);
  _scrollSaveTimer = setTimeout(() => persistNavState(), 120);
}, { passive: true });

// ── SIDEBAR SCROLL (survive refresh) ────────────────────────────────────────────
// The sidebar scrolls independently of the page, so remember its scroll offset too.
const SIDEBAR_SCROLL_KEY = APP_NS + '.sidebarScroll';
let _sidebarScrollTimer = null;

function persistSidebarScroll() {
  try {
    const sb = document.getElementById('sidebar');
    if (sb) localStorage.setItem(SIDEBAR_SCROLL_KEY, String(sb.scrollTop));
  } catch (e) { /* ignore */ }
}

function restoreSidebarScroll() {
  try {
    const sb = document.getElementById('sidebar');
    const y = parseInt(localStorage.getItem(SIDEBAR_SCROLL_KEY) || '0', 10);
    if (sb && y > 0) {
      // Restore after layout settles (section heights affect scrollable range).
      requestAnimationFrame(() => requestAnimationFrame(() => { sb.scrollTop = y; }));
    }
  } catch (e) { /* ignore */ }
}

(function () {
  const sb = document.getElementById('sidebar');
  if (sb) sb.addEventListener('scroll', () => {
    clearTimeout(_sidebarScrollTimer);
    _sidebarScrollTimer = setTimeout(persistSidebarScroll, 120);
  }, { passive: true });
})();

// Final save right before the tab unloads / refreshes.
window.addEventListener('beforeunload', () => { persistNavState(); persistSidebarScroll(); });

function restoreNavState() {
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(NAV_STATE_KEY) || 'null'); } catch (e) {}

  if (saved && saved.pageId && window.Pages && window.Pages[saved.pageId]) {
    // Re-select the matching sidebar link so the active highlight is correct.
    const link = document.querySelector('#sidebar nav a[onclick*="\'' + saved.pageId + '\'"]');
    showPage(saved.pageId, link || null);   // this resets scroll to 0 first...
    // ...then restore the saved scroll after the DOM has laid out (two frames).
    const y = saved.scrollY || 0;
    if (y > 0) {
      requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo(0, y)));
    }
    return true;
  }
  return false;
}
