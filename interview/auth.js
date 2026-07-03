/* ────────────────────────────────────────────────────────────────────────────
   auth.js  —  Login gate for the Interview Prep site.

   Loaded by index.html AFTER the main inline script (it calls showPage() and
   restoreNavState() from there) and AFTER the pages/*.js content scripts.
   ──────────────────────────────────────────────────────────────────────────── */

// ── AUTH GATE ───────────────────────────────────────────────────────────────
// Simple login check. The page content is loaded as plain <script> files
// (fully editable) — this gate only hides the UI until correct credentials are
// entered. The credential is stored ONLY as a SHA-256 hash of
//   username + "\n" + password
// so the plaintext username/password are never visible in the code.
//
// ▶ TO SET YOUR OWN USERNAME / PASSWORD:
//     1. Open this site, press F12 to open the browser Console, and run:
//            hashCred('yourUsername', 'yourPassword')
//     2. Copy the printed hash and paste it as CREDENTIAL_HASH below, then save.
const CREDENTIAL_HASH = 'c61d9e1f2100522dbda22f1d24de8f75afb3f6e983a755f7039268a54356eb1c';
const SESSION_KEY = 'interviewPrep.session';

// SHA-256 → lowercase hex, using the browser-native Web Crypto API.
async function sha256Hex(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Console helper: generates the hash to paste into CREDENTIAL_HASH above.
async function hashCred(username, password) {
  const h = await sha256Hex((username || '').trim() + '\n' + (password || ''));
  console.log('CREDENTIAL_HASH = \'' + h + '\';');
  return h;
}

async function attemptLogin(ev) {
  if (ev) ev.preventDefault();
  const btn = document.getElementById('login-btn');
  const errEl = document.getElementById('login-error');
  const u = document.getElementById('login-user').value.trim();
  const p = document.getElementById('login-pass').value;
  errEl.textContent = '';
  if (!u || !p) { errEl.textContent = 'Enter username and password.'; return; }
  btn.disabled = true; btn.textContent = 'Checking…';
  const hash = await sha256Hex(u + '\n' + p);
  if (hash === CREDENTIAL_HASH) {
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch (e) {}
    bootApp();
  } else {
    errEl.textContent = '❌ Invalid username or password.';
    document.getElementById('login-pass').value = '';
    btn.disabled = false; btn.textContent = 'Sign in';
  }
}

function logout() {
  try { sessionStorage.removeItem(SESSION_KEY); } catch (e) {}
  location.reload();
}

// ── INIT ──────────────────────────────────────────────────────────────────────
// Don't let the browser auto-restore scroll — we manage it ourselves.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

// Runs after a successful login. Reveals the UI, then restores nav/scroll.
function bootApp() {
  document.body.classList.add('authed');
  // Restore which sidebar sections are expanded/collapsed, then its scroll offset.
  restoreNavGroups();
  restoreSidebarScroll();
  // Deep link: ?p=<pageId> opens a specific page (used by the home-page company cards).
  try {
    const deepLink = new URLSearchParams(location.search).get('p');
    if (deepLink && window.Pages && window.Pages[deepLink]) {
      const dlLink = document.querySelector('#sidebar nav a[onclick*="\'' + deepLink + '\'"]');
      showPage(deepLink, dlLink || null);
      history.replaceState(null, '', location.pathname);  // drop ?p= so a later refresh restores scroll
      return;
    }
  } catch (e) { /* ignore malformed query */ }
  // Restore the last page + scroll; fall back to the page's default on first visit.
  if (!restoreNavState()) {
    const home = window.APP_HOME || 'home';
    const homeLink = document.querySelector('#sidebar nav a[onclick*="\'' + home + '\'"]');
    showPage(home, homeLink || null);   // null → no wrong highlight when home has no nav link
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Stay signed in across refreshes within this tab (keeps page/scroll restore working).
  let authed = false;
  try { authed = sessionStorage.getItem(SESSION_KEY) === '1'; } catch (e) {}
  if (authed) { bootApp(); return; }
  const uEl = document.getElementById('login-user');
  if (uEl) uEl.focus();
});
