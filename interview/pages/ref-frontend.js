window.Pages['ref-frontend'] = `
<div class="page-header">
  <div class="breadcrumb">Architect Reference › <span>Frontend Architecture</span></div>
  <h1>🎨 Frontend Architecture</h1>
  <p>Micro Frontend · Angular NgRx · Auth/RBAC · Performance · CORS · Common Issues — architect reference</p>
</div>

<div class="ref-section">
  <div class="ref-title">Micro Frontend Architecture</div>
  <div class="ref-body">
    <p>Micro Frontends apply microservice principles to the frontend — split a large SPA into independently deployable pieces owned by separate teams.</p>
    <div class="code-box">Traditional SPA (Monolith Frontend):
  One Angular app → one team → one deploy → one release cycle
  Adding feature in Orders module requires deploying entire app

Micro Frontend:
  Shell App         → host/orchestrator (routing, auth, layout)
  ├── Orders MFE    → team-orders.company.com (deployed independently)
  ├── Payments MFE  → team-payments.company.com
  ├── Reports MFE   → team-reports.company.com
  └── Catalog MFE   → team-catalog.company.com

Each MFE:
  - Has its own git repo + CI/CD pipeline
  - Deployed without affecting other MFEs
  - Can use different Angular versions or even different frameworks</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Integration Technologies</div>
        <div class="pattern-table" style="margin-top:6px;">
          <div class="pt-row pt-header"><div>Technology</div><div>How</div></div>
          <div class="pt-row"><div class="pt-name">Module Federation</div><div>Webpack 5 — share code at runtime. Best for Angular/React.</div></div>
          <div class="pt-row"><div class="pt-name">Single SPA</div><div>Framework-agnostic orchestrator. Mounts/unmounts MFEs.</div></div>
          <div class="pt-row"><div class="pt-name">Web Components</div><div>Custom HTML elements. Framework-independent. iframe isolation.</div></div>
          <div class="pt-row"><div class="pt-name">iFrame</div><div>Full isolation. Legacy systems. High security. Poor UX.</div></div>
        </div>
      </div>
      <div>
        <div class="ans-label">Module Federation — Shell Config</div>
        <div class="code-box">// webpack.config.js — Shell
new ModuleFederationPlugin({
  remotes: {
    orders: 'orders@http://orders.co/remoteEntry.js',
    payments: 'payments@http://pay.co/remoteEntry.js',
  }
});

// Load MFE lazily in routing
{
  path: 'orders',
  loadChildren: () =>
    loadRemoteModule({
      remoteEntry: 'http://orders.co/remoteEntry.js',
      remoteName: 'orders',
      exposedModule: './Module'
    })
}</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Authentication &amp; Authorization in Micro Frontend</div>
  <div class="ref-body">
    <div class="code-box">Architecture: Centralised Auth in Shell App

Azure AD / Entra ID
       ↓  (OIDC login)
Shell Application (MSAL Angular)
       ↓  gets JWT Token
       ├── stores token in memory
       ├── exposes auth state via shared service or Custom Event
       ↓
Each MFE receives token via:
  Option 1: Shared NgRx Store (Module Federation shared libs)
  Option 2: Custom Browser Event (postMessage)
  Option 3: Shell passes token as @Input to MFE component

MFE makes API call:
  Authorization: Bearer &lt;token from shell&gt;</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Authorization — Role-Based in Shell</div>
        <div class="code-box">JWT Token:
{
  "roles": ["Admin", "Finance"],
  "tenantId": "EY",
  "sub": "user-123"
}

Shell reads roles → decides which
MFEs to load/hide:

Admin role   → load Admin MFE
Finance role → load Finance MFE
User role    → hide both</div>
      </div>
      <div>
        <div class="ans-label">MFE Route Guard</div>
        <div class="code-box">// Each MFE has its own guard
@Injectable()
export class AdminGuard {
  canActivate(): boolean {
    return this.authService
               .hasRole('Admin');
  }
}

// Even if shell hides the menu,
// MFE re-validates on direct URL access
// Backend MUST also validate — UI is UX only</div>
      </div>
    </div>
    <div class="warn-box" style="margin-top:12px;">⚠️ UI role checks are for UX only. If user has direct URL to a page, browser-only guards can be bypassed. Backend must always enforce authorization.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Angular State Management — NgRx (Redux Pattern)</div>
  <div class="ref-body">
    <div class="code-box">Redux Principle: Single source of truth — one immutable store.
State changes only via dispatched Actions → processed by Reducers.

NgRx Flow:
  Component dispatches Action
         ↓
  Effect (side effects: API calls, routing)
         ↓  (on success/failure dispatches another action)
  Reducer (pure function: state + action → new state)
         ↓
  Store (immutable state tree)
         ↓
  Selector (memoized query on state)
         ↓
  Component re-renders with new data</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Code Structure</div>
        <div class="code-box">// Action
export const loadOrders =
  createAction('[Orders] Load');
export const loadOrdersSuccess =
  createAction('[Orders] Load Success',
    props&lt;{ orders: Order[] }&gt;());

// Reducer
const ordersReducer = createReducer(
  initialState,
  on(loadOrdersSuccess, (state, { orders }) =>
    ({ ...state, orders, loading: false }))
);

// Selector (memoized)
export const selectOrders =
  createSelector(selectOrderState,
    state => state.orders);

// Effect (API call)
loadOrders$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadOrders),
    switchMap(() => this.api.getOrders()
      .pipe(map(orders =>
        loadOrdersSuccess({ orders }))))
  ));</div>
      </div>
      <div>
        <div class="ans-label">When to Use NgRx</div>
        <ul>
          <li>State shared across many components</li>
          <li>Complex async state (loading/error/success)</li>
          <li>User actions need audit trail</li>
          <li>Large team — predictable state changes</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">When NOT to Use NgRx</div>
        <ul>
          <li>Simple app with local component state</li>
          <li>Small team — overhead outweighs benefit</li>
          <li>State is not shared beyond parent/child</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Lighter Alternatives</div>
        <div class="tag-grid">
          <span class="tag blue">Angular Signals</span>
          <span class="tag blue">NGXS</span>
          <span class="tag blue">Akita</span>
          <span class="tag blue">RxJS BehaviorSubject</span>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">CORS — Cross-Origin Resource Sharing</div>
  <div class="ref-body">
    <div class="code-box">Why CORS happens:
  Browser enforces Same-Origin Policy.
  UI (https://app.company.com) calling API (https://api.company.com)
  = different origins → browser BLOCKS the request.

  Origin = protocol + domain + port
  https://app.company.com:443  ≠  https://api.company.com:443</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Fix: Backend API (.NET)</div>
        <div class="code-box">// Program.cs
builder.Services.AddCors(o => o
  .AddPolicy("AllowUI", p => p
    .WithOrigins("https://app.company.com")
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials()));

app.UseCors("AllowUI");

// Preflight (OPTIONS) handled automatically
// NEVER use .AllowAnyOrigin() + .AllowCredentials()
// → browser blocks it</div>
      </div>
      <div>
        <div class="ans-label">Fix: NGINX Ingress</div>
        <div class="code-box">annotations:
  nginx.ingress.kubernetes.io/cors-allow-origin:
    "https://app.company.com"
  nginx.ingress.kubernetes.io/cors-allow-methods:
    "GET, POST, PUT, DELETE, OPTIONS"
  nginx.ingress.kubernetes.io/cors-allow-headers:
    "Authorization, Content-Type"
  nginx.ingress.kubernetes.io/enable-cors: "true"</div>
        <div class="ans-label" style="margin-top:10px;">Fix: Azure API Management</div>
        <div class="code-box">&lt;cors allow-credentials="true"&gt;
  &lt;allowed-origins&gt;
    &lt;origin&gt;https://app.company.com&lt;/origin&gt;
  &lt;/allowed-origins&gt;
&lt;/cors&gt;</div>
      </div>
    </div>
    <div class="tip-box" style="margin-top:12px;">✅ CORS fix is always on the server/API side. No UI code changes needed. Can also fix at API Gateway or Ingress level.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Frontend Performance — Architect Checklist</div>
  <div class="ref-body">
    <div class="three-col">
      <div>
        <div class="ans-label">Bundle &amp; Load</div>
        <ul>
          <li>Lazy loading routes</li>
          <li>Code splitting per MFE</li>
          <li>Tree shaking unused modules</li>
          <li>CDN for static assets</li>
          <li>Brotli/Gzip compression</li>
          <li>HTTP/2 multiplexing</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Rendering</div>
        <ul>
          <li>Virtual scrolling for large lists</li>
          <li>OnPush change detection strategy</li>
          <li>TrackBy in *ngFor loops</li>
          <li>Debounce search inputs</li>
          <li>Skeleton screens (not spinners)</li>
          <li>Angular SSR for initial load</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Data &amp; API</div>
        <ul>
          <li>API response caching (HTTP cache headers)</li>
          <li>Pagination — don't load all records</li>
          <li>GraphQL — fetch only needed fields</li>
          <li>Optimistic updates (show result before API returns)</li>
          <li>Cancel pending requests on route change</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Common UI Issues — Architect Must Know</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Issue</div><div>Root Cause</div><div>Fix</div></div>
      <div class="pt-row"><div class="pt-name">Memory Leak</div><div>Unsubscribed RxJS observables in components</div><div>takeUntilDestroyed() / AsyncPipe / destroy$ subject</div></div>
      <div class="pt-row"><div class="pt-name">CORS Error</div><div>Missing CORS config on API / Ingress</div><div>Add CORS policy in API or Ingress controller</div></div>
      <div class="pt-row"><div class="pt-name">XSS Vulnerability</div><div>Rendering unsanitized user input</div><div>Angular sanitizes by default. Never use bypassSecurityTrust unless necessary.</div></div>
      <div class="pt-row"><div class="pt-name">Token in localStorage</div><div>XSS can steal token from localStorage</div><div>Store in memory or httpOnly cookie</div></div>
      <div class="pt-row"><div class="pt-name">Slow Initial Load</div><div>Large bundle, no lazy loading</div><div>Code splitting, lazy routes, CDN, SSR</div></div>
      <div class="pt-row"><div class="pt-name">State Inconsistency</div><div>Multiple services holding same state</div><div>NgRx single store. Never duplicate state.</div></div>
      <div class="pt-row"><div class="pt-name">Race Condition</div><div>Multiple API calls, last wins</div><div>switchMap (cancels previous), not mergeMap</div></div>
      <div class="pt-row"><div class="pt-name">Validation Gap</div><div>Only UI validation — API trusts UI</div><div>Validate in both UI (UX) AND API (security)</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Interview Summary — Architect-Level Answer</div>
  <div class="ref-body">
    <div class="code-box">Q: How do you architect a large-scale frontend application?

A: For a large application with multiple teams, I use Micro Frontend
   architecture with Webpack Module Federation.

   Each team owns a domain (Orders, Payments, Reports) as a separate
   deployable MFE with its own git repo and CI/CD pipeline.

   The Shell application handles:
   - Authentication via MSAL + Azure AD (OIDC)
   - JWT token storage in memory (not localStorage)
   - Role-based routing — load MFEs based on user roles
   - Shared layout (header, navigation)

   Each MFE receives the auth token from the shell.
   Both shell and MFEs enforce route guards.
   Backend APIs always validate JWT — UI is UX-only.

   State management: NgRx for complex shared state.
   Angular Signals for local component state.

   Performance: Lazy-loaded routes, OnPush change detection,
   virtual scrolling for large datasets, CDN for assets.

   CORS: Configured at API Gateway level — no UI changes needed.</div>
  </div>
</div>
`;
