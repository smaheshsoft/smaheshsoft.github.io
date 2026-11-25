window.Pages = window.Pages || {};
window.Pages['truevalue1'] = `
  <div class="page-header">
    <div class="breadcrumb">Home › <span>Truevaluelabs – Round 1</span></div>
    <h1>🏷️ Truevaluelabs — Round 1: Multi-Tenancy, Zero Trust, AuthN/AuthZ, Angular State, Middleware and DI</h1>
    <p>Multi-tenant design · data isolation · tenant resolution from the UI · zero trust · user-to-tenant mapping · legacy application to agent and MCP tools · Angular state management · Microsoft token and backend authorization · avoiding a database call per request · POST-only middleware · two implementations of one interface</p>
  </div>
  <div class="stats-bar" style="margin-bottom:20px;">
    <div class="stat-box"><div class="num">9</div><div class="label">Questions</div></div>
    <div class="stat-box"><div class="num">3</div><div class="label">Code Questions</div></div>
  </div>
  <div class="alert" style="margin-bottom:16px;">
    <strong>🎯 What this round tests</strong>
    <p>One thread runs through most questions: <strong>who is the caller, which tenant do they belong to, what may they do, and how do you know that cheaply on every request?</strong> Answer in that order — identity, tenant, permission, enforcement, performance. The last three are short .NET code questions.</p>
  </div>
  <div class="qa-list">

    <div class="qa-card">
      <div class="qa-num">Q1</div>
      <div class="qa-body">
        <div class="qa-question">How do you design a multi-tenant system, and how does data isolation happen for customers across the system?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — pick the tenancy model from the isolation, cost and compliance needs, then enforce the tenant boundary in every layer (identity, API, cache, data, storage, messaging), not just in the query</div>
          <div class="qa-answer">"I start with the tenant profile: how many tenants, how different their sizes are, and whether any need regulatory isolation. That decides the model — database per tenant for strong isolation, shared database with a tenant column and row-level security for density, or a mix by tier. Whatever the model, the tenant identity is resolved once at the edge, carried in a trusted context, and enforced at every layer: query filters and row-level security in the database, tenant-prefixed cache keys, tenant-scoped storage paths and encryption keys, and tenant id on every message. I verify it with automated cross-tenant tests."</div></div>

          <div class="ans-block"><div class="ans-label">Tenancy models</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.5fr 1.5fr 1.2fr;"><div>Model</div><div>Isolation</div><div>Cost and operations</div><div>Fits</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr 1.2fr;"><div class="dt-name">Database per tenant</div><div>Strongest; per-tenant backup, restore and encryption keys</div><div>Highest cost; many databases to migrate and monitor</div><div>Regulated or large tenants</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr 1.2fr;"><div class="dt-name">Schema per tenant</div><div>Good logical separation</div><div>Medium; migrations run per schema</div><div>Moderate tenant counts</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr 1.2fr;"><div class="dt-name">Shared schema, tenant_id and row-level security</div><div>Logical; relies on correct enforcement</div><div>Lowest cost; one migration; noisy-neighbour risk</div><div>Many small tenants</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr 1.2fr;"><div class="dt-name">Hybrid by tier</div><div>Shared for standard, dedicated for premium</div><div>Most flexible; two paths to maintain</div><div>Mixed customer base</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Isolation in every layer</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 2.6fr;"><div>Layer</div><div>How the tenant boundary is enforced</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Identity</div><div>Token carries the tenant; users belong to a tenant (or have explicit memberships)</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">API</div><div>Tenant resolved from the validated token, never from a client-supplied field alone; tenant context is request-scoped</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Data access</div><div>EF Core global query filter plus database row-level security as a second line of defence</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Cache</div><div>Keys prefixed with the tenant id; never a global key for tenant data</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Files and blobs</div><div>Container or path per tenant; access through short-lived tokens scoped to that path</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Messaging</div><div>Tenant id on every message; consumers re-establish the tenant context</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Keys and secrets</div><div>Per-tenant encryption keys for sensitive tenants (envelope encryption)</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Fairness</div><div>Per-tenant rate limits and quotas so one tenant cannot starve the rest</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Logs and telemetry</div><div>Tenant id on every log line; tenants cannot read each other's logs</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Enforcing it in the data layer — query filter plus row-level security</div>
          <div class="code-box">// EF Core: every query on a tenant entity is filtered automatically
public class AppDbContext : DbContext
{
    private readonly ITenantContext _tenant;
    public AppDbContext(DbContextOptions&lt;AppDbContext&gt; o, ITenantContext tenant) : base(o) { _tenant = tenant; }

    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity&lt;Order&gt;().HasQueryFilter(x =&gt; x.TenantId == _tenant.TenantId);
    }

    public override Task&lt;int&gt; SaveChangesAsync(CancellationToken ct = default)
    {
        foreach (var e in ChangeTracker.Entries&lt;ITenantOwned&gt;().Where(e =&gt; e.State == EntityState.Added))
            e.Entity.TenantId = _tenant.TenantId;   // never trust a tenant id sent by the client
        return base.SaveChangesAsync(ct);
    }
}</div>
          <div class="code-box">-- PostgreSQL row-level security: the database refuses cross-tenant access even if the app has a bug
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON orders
  USING (tenant_id = current_setting('app.tenant_id')::uuid);
-- the connection sets it per request:  SET app.tenant_id = '...';   (use a non-owner role for the app)</div>
          <div class="warn-box">⚠️ A query filter can be bypassed (IgnoreQueryFilters, raw SQL, a reporting query), so treat it as the first line and row-level security or database-per-tenant as the second. Always test with two tenants and assert that tenant A can never read or write tenant B's rows.</div></div>

          <div class="tip-box">✅ Interview line: "The model is a cost versus isolation decision per tenant tier, but the rule is the same: resolve the tenant once from a validated token, carry it in a request-scoped context, and enforce it at every layer — filter, row-level security, cache key, storage path and message — then prove it with cross-tenant tests."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q2</div>
      <div class="qa-body">
        <div class="qa-question">How do you know which tenant to go to from the UI? Which user belongs to which tenant, and how do you direct a user back to the right tenant when their information arrives from a different place?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — resolve the tenant from a trusted source, in a fixed order: the validated token claim first, then the tenant-specific host, and only then a user-to-tenant lookup; never trust a tenant id typed or sent by the client</div>
          <div class="qa-answer">"The UI should not decide the tenant — it only helps discover it. The authoritative answer comes from the validated token. For a first visit, the tenant is discovered from the sub-domain, a home-realm discovery step on the email domain, or a tenant picker; from then on it is carried in the token. The backend resolves it in middleware into a request-scoped tenant context and rejects any request where the token's tenant and the requested tenant disagree."</div></div>

          <div class="ans-block"><div class="ans-label">Ways to discover the tenant</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.7fr 1.6fr;"><div>Source</div><div>How it works</div><div>Notes</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.6fr;"><div class="dt-name">Sub-domain or custom domain</div><div>acme.app.com maps to tenant Acme</div><div>Clean; needs wildcard certificates and a host-to-tenant map</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.6fr;"><div class="dt-name">Token claim</div><div>The identity provider's tenant id or a custom tenant claim in the access token</div><div>The trusted source after sign-in</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.6fr;"><div class="dt-name">Email domain (home-realm discovery)</div><div>User types an email; the domain maps to a tenant and its identity provider</div><div>Good for the first sign-in screen</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.6fr;"><div class="dt-name">Path or header</div><div>/t/acme/... or X-Tenant-Id</div><div>Convenient for APIs; must be validated against the token</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.6fr;"><div class="dt-name">Tenant picker</div><div>A user with several memberships chooses; the choice becomes a signed session value</div><div>For consultants or users in many tenants</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Resolving the user to a tenant</div>
          <div class="flow-box">
            <div class="flow-step">Sign in (identity provider)</div><div class="flow-arrow">→</div>
            <div class="flow-step">Token has user id + tenant or issuer</div><div class="flow-arrow">→</div>
            <div class="flow-step">Middleware maps it to the internal tenant (cached)</div><div class="flow-arrow">→</div>
            <div class="flow-step">Tenant context for the request</div>
          </div>
          <div class="code-box">users          (user_id, email, ...)
memberships    (user_id, tenant_id, role)        -- one user can belong to several tenants
tenants        (tenant_id, name, status, idp_tenant_id, host_name, isolation_model, connection_ref)

Rule: the user's membership, not a request field, decides which tenants are allowed.
If a user belongs to several tenants, the token or session carries the ACTIVE tenant, and switching
tenants issues a new token or session value after checking the membership.</div></div>

          <div class="ans-block"><div class="ans-label">Mismatch handling — the user arrives from a different place</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.6fr 2.2fr;"><div>Situation</div><div>Behaviour</div></div>
            <div class="dt-row" style="grid-template-columns:1.6fr 2.2fr;"><div class="dt-name">Host says tenant A, token says tenant B</div><div>Reject with 403, log it as a security event; or, in the UI, redirect to tenant B's host if the user is a member</div></div>
            <div class="dt-row" style="grid-template-columns:1.6fr 2.2fr;"><div class="dt-name">User opens the generic login URL</div><div>Home-realm discovery on the email; then redirect to that tenant's host and sign-in</div></div>
            <div class="dt-row" style="grid-template-columns:1.6fr 2.2fr;"><div class="dt-name">Deep link from an email for another tenant</div><div>Carry the tenant in the link; after sign-in compare with the token; if the user is a member, switch; if not, show access denied</div></div>
            <div class="dt-row" style="grid-template-columns:1.6fr 2.2fr;"><div class="dt-name">Several memberships</div><div>Show a tenant picker; remember the last active tenant; require re-authorisation for the switch</div></div>
            <div class="dt-row" style="grid-template-columns:1.6fr 2.2fr;"><div class="dt-name">Unknown tenant or suspended tenant</div><div>Generic not-found or suspended page; never reveal whether a tenant exists</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Tenant resolution middleware</div>
          <div class="code-box">public class TenantMiddleware
{
    private readonly RequestDelegate _next;
    public TenantMiddleware(RequestDelegate next) { _next = next; }

    public async Task InvokeAsync(HttpContext ctx, ITenantResolver resolver, TenantContext tenantCtx)
    {
        var tokenTenant = ctx.User.FindFirst("tenant_id")?.Value;   // from the validated token
        var hostTenant  = await resolver.FromHostAsync(ctx.Request.Host.Host);  // cached lookup

        if (tokenTenant is null || (hostTenant is not null &amp;&amp; hostTenant != tokenTenant))
        {
            ctx.Response.StatusCode = StatusCodes.Status403Forbidden;
            return;
        }
        tenantCtx.TenantId = tokenTenant;   // request-scoped; everything downstream reads this
        await _next(ctx);
    }
}</div></div>

          <div class="tip-box">✅ Interview line: "The UI can discover the tenant, but the backend decides it — from the validated token, cross-checked against the host. Memberships decide which tenants a user may enter, and a mismatch is either a controlled redirect for a member or a 403 for anyone else."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q3</div>
      <div class="qa-body">
        <div class="qa-question">How do you implement a zero trust architecture?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — never trust a request because of where it comes from: verify identity explicitly, grant least privilege, and assume breach, at every hop and not only at the perimeter</div>
          <div class="qa-answer">"Zero trust is a set of principles, not a product. I apply three: verify explicitly — every call carries a validated identity and is authorised per request; least privilege — narrow roles, short-lived tokens and just-in-time access; assume breach — segment the network, encrypt every hop, and log and monitor so a compromise is contained and detected. In a multi-tenant system it also means the tenant boundary is checked on every call, including service-to-service calls."</div></div>

          <div class="ans-block"><div class="ans-label">Principles to controls</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 2.8fr;"><div>Area</div><div>Controls</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.8fr;"><div class="dt-name">Users</div><div>Single sign-on with multi-factor authentication; conditional access on device, location and risk; short-lived tokens</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.8fr;"><div class="dt-name">Services</div><div>Managed identities (no stored secrets); mutual TLS or signed tokens between services; every service validates the caller</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.8fr;"><div class="dt-name">Authorisation</div><div>Policy-based, checked on every request at the API and again in the data layer; tenant check on every call</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.8fr;"><div class="dt-name">Network</div><div>Private endpoints, no public data stores, network policies between pods, an API gateway or web application firewall at the edge</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.8fr;"><div class="dt-name">Data</div><div>Encryption in transit and at rest, keys in a vault, per-tenant keys where required</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.8fr;"><div class="dt-name">Secrets</div><div>Vault with rotation; no secrets in code, images or pipelines</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.8fr;"><div class="dt-name">Pipeline and supply chain</div><div>Signed images, dependency and container scanning, least-privilege pipeline identities</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.8fr;"><div class="dt-name">Detection</div><div>Central logs with tenant and user ids, anomaly alerts, audit trail of privileged actions</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.8fr;"><div class="dt-name">Privileged access</div><div>Just-in-time elevation, approvals and session recording instead of standing admin rights</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Service-to-service — the caller is verified every time</div>
          <div class="code-box">// Each API validates the token on every request: signature, issuer, audience, expiry, and the scope or role
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o =&gt;
    {
        o.Authority = "https://login.microsoftonline.com/{tenant-or-common}/v2.0";
        o.Audience  = "api://orders-api";
        o.TokenValidationParameters.ValidateIssuer   = true;
        o.TokenValidationParameters.ValidateAudience = true;
        o.TokenValidationParameters.ValidateLifetime = true;
    });

builder.Services.AddAuthorization(o =&gt;
    o.AddPolicy("OrdersRead", p =&gt; p.RequireAuthenticatedUser().RequireClaim("scp", "orders.read")));

// Calling the next service on behalf of the user (on-behalf-of flow) keeps the user identity end to end.</div></div>

          <div class="warn-box">⚠️ Being inside the network or the cluster grants nothing. An internal service that skips authentication "because it is internal" is exactly what zero trust removes.</div>
          <div class="tip-box">✅ Interview line: "Zero trust means every request is authenticated, authorised and encrypted regardless of origin — identity-based access, least privilege, private networking, per-hop validation and strong monitoring — with the tenant check as part of every authorisation decision."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q4</div>
      <div class="qa-body">
        <div class="qa-question">How do you convert a legacy or UI-based application into agent and MCP tools, so it works with an agent framework?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — expose the business capabilities as small, well-described, secured APIs first, wrap them as tools (an MCP server), and let the agent framework orchestrate them; automate the UI only for what has no API</div>
          <div class="qa-answer">"An agent can only call what is exposed as a tool, so the work is to turn the legacy application's capabilities into tools. I identify the business operations — look up a customer, create an order, check a status — and find the cleanest seam for each: an existing service or stored procedure, a new thin API in front of the legacy code, or, as a last resort, UI automation. Each operation becomes a narrow tool with a typed schema, hosted by an MCP server; the agent framework discovers and calls them. User identity and permissions pass through, writes need confirmation, and everything is audited."</div></div>

          <div class="ans-block"><div class="ans-label">Choosing the seam, best first</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:0.5fr 1.4fr 2fr;"><div>Order</div><div>Seam</div><div>Notes</div></div>
            <div class="dt-row" style="grid-template-columns:0.5fr 1.4fr 2fr;"><div class="dt-name">1</div><div>Existing API or service</div><div>Wrap it directly as a tool</div></div>
            <div class="dt-row" style="grid-template-columns:0.5fr 1.4fr 2fr;"><div class="dt-name">2</div><div>New thin API over the business logic (anti-corruption layer)</div><div>Extract the logic from the UI layer; do not call code-behind</div></div>
            <div class="dt-row" style="grid-template-columns:0.5fr 1.4fr 2fr;"><div class="dt-name">3</div><div>Database procedures or read models</div><div>Safe for read-only tools; avoid direct writes that bypass business rules</div></div>
            <div class="dt-row" style="grid-template-columns:0.5fr 1.4fr 2fr;"><div class="dt-name">4</div><div>File, queue or integration interface</div><div>Where the legacy system already exchanges files or messages</div></div>
            <div class="dt-row" style="grid-template-columns:0.5fr 1.4fr 2fr;"><div class="dt-name">5</div><div>UI automation (RPA, browser or desktop)</div><div>Last resort: brittle, slow, hard to secure; isolate it behind the same tool interface so it can be replaced</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Steps</div>
          <div class="code-box">1  INVENTORY    list the business operations users perform in the legacy UI
2  PRIORITISE   pick high-value, low-risk, read-only operations first
3  EXPOSE       create or reuse an API for each (anti-corruption layer; legacy untouched)
4  DESCRIBE     name, plain-language description, typed input schema, typed output, error cases
5  WRAP         host them in an MCP server (one server per domain, not one giant server)
6  SECURE       pass the user identity (on-behalf-of); check permissions per call; confirm writes
7  ORCHESTRATE  register the tools in the agent framework; start with one agent and a few tools
8  EVALUATE     test tool selection and arguments with a fixed set of tasks; log every call
9  EXPAND       add write operations with approval, idempotency keys and audit</div></div>

          <div class="ans-block"><div class="ans-label">A tool wrapping a legacy operation</div>
          <div class="code-box">// MCP server tool (C#); the legacy system is reached through a thin API, never through its UI
[McpServerToolType]
public class CustomerTools
{
    private readonly ILegacyCustomerApi _api;
    public CustomerTools(ILegacyCustomerApi api) { _api = api; }

    [McpServerTool, Description("Find a customer by account number. Read-only.")]
    public async Task&lt;CustomerSummary?&gt; GetCustomer(
        [Description("Account number, for example AC-1042")] string accountNumber)
        =&gt; await _api.GetSummaryAsync(accountNumber);   // runs with the CALLING user's permissions
}</div></div>

          <div class="ans-block"><div class="ans-label">Tool design rules</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.6fr;"><div>Rule</div><div>Why</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Few, narrow tools</div><div>Easier for the model to choose correctly than many overlapping ones</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Clear descriptions and schemas</div><div>The description is what the model reads to decide when to call the tool</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Read before write</div><div>Start with read-only tools; add writes later with confirmation</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Idempotent writes</div><div>Agents retry; an idempotency key prevents duplicate orders</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">User identity passed through</div><div>The agent must never gain more access than the user has</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Human approval for risky actions</div><div>Payments, deletions and external messages need a confirmation step</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Audit and limits</div><div>Log every call with user, tool and arguments; rate and cost limits</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Anchor it in your own experience</div>
          <p>Your resume lists MCP-based tool integration on the Battery Swapping platform, so you can speak to it from experience; describe the tools you actually built and how you secured them. For a legacy UI application, say "I would" for the steps you have not done yourself.</p></div>

          <div class="tip-box">✅ Interview line: "I expose the legacy application's business operations as small secured APIs, wrap them as MCP tools with clear schemas, and let the agent framework orchestrate them — read-only first, user identity passed through, writes confirmed and audited. UI automation is the last resort behind the same tool interface."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q5</div>
      <div class="qa-body">
        <div class="qa-question">How do you manage state in an Angular project?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — keep state as local as possible, share it through services with signals or RxJS, and use a store such as NgRx only when many parts of the app share complex state that needs predictable changes and tooling</div>
          <div class="qa-answer">"I classify the state first: local UI state, shared feature state, server state and global app state. Local state stays in the component, using signals. Shared state goes into a service that exposes signals or observables. For large applications with many interacting features, I use NgRx — actions, reducers, selectors and effects — or its lighter SignalStore, so changes are explicit, traceable and testable. Server data is cached with a clear refresh policy rather than copied around."</div></div>

          <div class="ans-block"><div class="ans-label">Kinds of state and where each lives</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.7fr 1.6fr;"><div>Kind</div><div>Examples</div><div>Where</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.6fr;"><div class="dt-name">Local UI state</div><div>Open or closed, form input, selected tab</div><div>Component; signals or plain fields</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.6fr;"><div class="dt-name">Shared feature state</div><div>A filtered list used by sibling components</div><div>A feature service, or a component store</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.6fr;"><div class="dt-name">Global app state</div><div>Current user, tenant, permissions, theme</div><div>A root service or the global store</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.6fr;"><div class="dt-name">Server state</div><div>Lists and records from the API</div><div>A cached data layer (store, resource or query library) with refresh and invalidation</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.6fr;"><div class="dt-name">URL state</div><div>Filters, page, selected id</div><div>Router parameters, so links and refresh work</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Options compared</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.2fr 1.7fr 1.6fr;"><div>Approach</div><div>Strength</div><div>Cost or limit</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.7fr 1.6fr;"><div class="dt-name">Signals in components and services</div><div>Simple, fine-grained updates, built in</div><div>No built-in change history or devtools</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.7fr 1.6fr;"><div class="dt-name">Service with BehaviorSubject</div><div>Familiar, small, no extra library</div><div>Rules for changes are by convention only</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.7fr 1.6fr;"><div class="dt-name">NgRx Store, effects and selectors</div><div>Predictable, traceable, time-travel debugging, strong for large teams</div><div>Boilerplate; overkill for simple apps</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.7fr 1.6fr;"><div class="dt-name">NgRx SignalStore or ComponentStore</div><div>Structured state per feature with less boilerplate</div><div>Another pattern to learn</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.7fr 1.6fr;"><div class="dt-name">Akita or NGXS</div><div>Alternative store libraries</div><div>Smaller communities</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">A feature service with signals</div>
          <div class="code-box">@Injectable({ providedIn: 'root' })
export class OrdersStore {
  private readonly api = inject(OrdersApi);
  private readonly _orders = signal&lt;Order[]&gt;([]);
  private readonly _loading = signal(false);

  readonly orders = this._orders.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly openCount = computed(() =&gt; this._orders().filter(o =&gt; o.status === 'open').length);

  load() {
    this._loading.set(true);
    this.api.list().subscribe({
      next: list =&gt; { this._orders.set(list); this._loading.set(false); },
      error: () =&gt; this._loading.set(false)
    });
  }
}</div>
          <div class="code-box">// NgRx: explicit, traceable changes for shared complex state
export const loadOrders = createAction('[Orders] Load');
export const loadOrdersSuccess = createAction('[Orders] Load Success', props&lt;{ orders: Order[] }&gt;());

export const ordersReducer = createReducer(initialState,
  on(loadOrdersSuccess, (state, { orders }) =&gt; ({ ...state, orders })));

export const selectOpenOrders = createSelector(selectOrders, os =&gt; os.filter(o =&gt; o.status === 'open'));

// An effect calls the API when loadOrders is dispatched, then dispatches loadOrdersSuccess</div></div>

          <div class="ans-block"><div class="ans-label">Practices</div>
          <div class="decision-table">
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Immutability</div><div>Replace state rather than mutate it so change detection and selectors stay reliable</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Single source of truth</div><div>One owner per piece of state; derive the rest with computed or selectors</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">OnPush and signals</div><div>Limit change detection to what changed</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Unsubscribe</div><div>Use the async pipe, takeUntilDestroyed or signals to avoid leaks</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Sensitive data</div><div>Do not put tokens or personal data in local storage or a persisted store</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Tenant switch</div><div>Reset all tenant-scoped state when the active tenant changes</div></div>
          </div></div>

          <div class="tip-box">✅ Interview line: "I keep state local by default, share through signal- or RxJS-based services, and bring in NgRx or SignalStore when many features share complex state and I need traceability. Server data gets a caching and invalidation policy, and the URL holds the state users should be able to link to."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q6</div>
      <div class="qa-body">
        <div class="qa-question">Login uses the Microsoft API for token generation — what about authorization, and how is it controlled in the backend? Where is the information about what each user can access, their roles and tenant, stored?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — Microsoft Entra ID proves who the user is (authentication); the backend decides what they may do (authorization) using claims from the token plus application data — roles, permissions and tenant membership — enforced through policies on every request</div>
          <div class="qa-answer">"The token answers who the user is and which application it is for. What the user may do is a separate decision. I keep coarse roles in the identity provider as app roles or groups, so they arrive as claims, and the fine-grained permissions and tenant memberships in the application's own database. The API validates the token, builds the user's claims — adding the application permissions through a cached lookup — and enforces them with policy-based authorization. The data layer applies the tenant filter again."</div></div>

          <div class="ans-block"><div class="ans-label">Authentication versus authorization</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 1.5fr 1.5fr;"><div>Question</div><div>Answered by</div><div>Result</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.5fr 1.5fr;"><div class="dt-name">Who are you?</div><div>Entra ID sign-in, validated token</div><div>Subject (oid or sub), tenant (tid), name</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.5fr 1.5fr;"><div class="dt-name">Which app is this token for?</div><div>Audience (aud) and scopes (scp)</div><div>Only tokens meant for this API are accepted</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.5fr 1.5fr;"><div class="dt-name">What may you do?</div><div>Roles and permissions, evaluated by the backend</div><div>Allow or deny each action</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.5fr 1.5fr;"><div class="dt-name">Which data may you see?</div><div>Tenant membership plus resource rules</div><div>Tenant-filtered, owner-checked queries</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Where roles, permissions and tenants are stored</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.7fr 1.7fr;"><div>Store</div><div>Holds</div><div>Trade-off</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.7fr;"><div class="dt-name">Identity provider (app roles, groups)</div><div>Coarse roles such as Admin, Manager, Viewer; arrives in the token</div><div>Central and auditable; token size limits and the groups-overage case; changes apply at the next token</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.7fr;"><div class="dt-name">Application database</div><div>Tenant memberships, role-to-permission mapping, resource-level grants</div><div>Flexible and tenant-specific; needs caching and an admin UI</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.7fr;"><div class="dt-name">Token claims (custom or mapped)</div><div>Tenant id, role names for the request</div><div>Fast, no lookup; stale until the token is refreshed</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.7fr;"><div class="dt-name">Cache (memory or Redis)</div><div>The resolved permission set per user and tenant</div><div>Removes the per-request database call; needs invalidation</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.7fr;"><div class="dt-name">Policy engine (optional)</div><div>Rules as code or policy files, evaluated centrally</div><div>Consistent for complex rules; one more component</div></div>
          </div>
          <div class="code-box">tenants        (tenant_id, name, status, idp_tenant_id)
users          (user_id, idp_object_id, email)
memberships    (user_id, tenant_id, role_id)
roles          (role_id, tenant_id NULL, name)             -- NULL tenant = built-in role
permissions    (permission_id, code)                       -- orders.read, orders.write, users.manage
role_permissions (role_id, permission_id)
resource_grants  (user_id, resource_type, resource_id, permission_id)   -- optional, fine-grained</div></div>

          <div class="ans-block"><div class="ans-label">Backend enforcement</div>
          <div class="code-box">// 1. Validate the Microsoft token (signature, issuer, audience, lifetime)
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddMicrosoftIdentityWebApi(builder.Configuration);

// 2. Add application permissions to the user's claims
public class PermissionClaimsTransformation : IClaimsTransformation
{
    private readonly IPermissionCache _cache;
    public PermissionClaimsTransformation(IPermissionCache cache) { _cache = cache; }

    public async Task&lt;ClaimsPrincipal&gt; TransformAsync(ClaimsPrincipal principal)
    {
        var userId   = principal.FindFirst("oid")?.Value;
        var tenantId = principal.FindFirst("tenant_id")?.Value;
        if (userId is null || tenantId is null) return principal;

        var perms = await _cache.GetAsync(userId, tenantId);        // cached; database only on a miss
        var id = new ClaimsIdentity();
        foreach (var p in perms) id.AddClaim(new Claim("permission", p));
        principal.AddIdentity(id);
        return principal;
    }
}

// 3. Policies, then attributes on endpoints
builder.Services.AddAuthorization(o =&gt;
    o.AddPolicy("OrdersWrite", p =&gt; p.RequireClaim("permission", "orders.write")));

[Authorize(Policy = "OrdersWrite")]
[HttpPost("orders")]
public IActionResult Create(CreateOrder cmd) { /* ... */ }

// 4. Resource-based checks for ownership: IAuthorizationService.AuthorizeAsync(User, order, "Edit")</div></div>

          <div class="ans-block"><div class="ans-label">Roles versus permissions — keep code checking permissions</div>
          <p>Check a permission such as orders.write in code, not a role name such as Manager. Roles are just named bundles of permissions that can differ per tenant; code that tests role names has to change whenever a tenant redefines a role.</p></div>

          <div class="warn-box">⚠️ Token-held roles are only as fresh as the token. For urgent revocation, use short token lifetimes, continuous access evaluation where supported, or a permission cache that is invalidated on change. Also handle the groups-overage case, where the token carries a link instead of the full group list.</div>
          <div class="tip-box">✅ Interview line: "Entra ID authenticates; my backend authorizes. Coarse roles come from app roles in the token, tenant membership and fine-grained permissions come from the application database through a cached lookup, and policies check permissions — not role names — on every request, with the tenant filter applied again in the data layer."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q7</div>
      <div class="qa-body">
        <div class="qa-question">How do you avoid a database call on every request for the tenant mapping?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — put what is stable into the token, cache what is not with a short time-to-live and event-based invalidation, and keep the database as the source of truth hit only on a cache miss</div>
          <div class="qa-answer">"The tenant mapping changes rarely and is read constantly, which is ideal for caching. The cheapest option is to carry the tenant id in the token, so no lookup is needed at all. For the rest — host to tenant, tenant settings, the user's permissions — I use a layered cache: a small in-memory cache per instance in front of a shared Redis cache, with a short time-to-live and an invalidation message when something changes. The database is only read on a miss, and concurrent misses for the same key are collapsed into one load."</div></div>

          <div class="ans-block"><div class="ans-label">Options, cheapest first</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.8fr 1.6fr;"><div>Option</div><div>How</div><div>Limit</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1.6fr;"><div class="dt-name">Tenant id in the token</div><div>A custom claim or the identity provider's tenant id; the API reads it from the validated token</div><div>Stale until the token is refreshed; not for fast-changing data</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1.6fr;"><div class="dt-name">In-memory cache per instance</div><div>Dictionary of host or idp tenant to tenant, short time-to-live</div><div>Each instance has its own copy; brief inconsistency</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1.6fr;"><div class="dt-name">Distributed cache (Redis)</div><div>Shared across instances, keyed by tenant and user</div><div>A network hop; needs invalidation</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1.6fr;"><div class="dt-name">Layered (hybrid) cache</div><div>Memory in front of Redis, with stampede protection</div><div>The usual production choice</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1.6fr;"><div class="dt-name">Preloaded tenant registry</div><div>Load all tenants at start-up and refresh on a timer or on change events</div><div>Only for a modest number of tenants</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Resolution flow</div>
          <div class="flow-box">
            <div class="flow-step">Request with token</div><div class="flow-arrow">→</div>
            <div class="flow-step">Tenant claim present? use it</div><div class="flow-arrow">→</div>
            <div class="flow-step">Else memory cache</div><div class="flow-arrow">→</div>
            <div class="flow-step">Else Redis</div><div class="flow-arrow">→</div>
            <div class="flow-step">Else database, then fill both</div>
          </div></div>

          <div class="ans-block"><div class="ans-label">A hybrid cache with stampede protection</div>
          <div class="code-box">// .NET 9 HybridCache: in-memory first, then the distributed cache, with a single loader per key
public class TenantResolver : ITenantResolver
{
    private readonly HybridCache _cache;
    private readonly ITenantStore _store;
    public TenantResolver(HybridCache cache, ITenantStore store) { _cache = cache; _store = store; }

    public ValueTask&lt;TenantInfo?&gt; FromHostAsync(string host, CancellationToken ct = default) =&gt;
        _cache.GetOrCreateAsync(
            "tenant:host:" + host,
            async token =&gt; await _store.FindByHostAsync(host, token),   // only on a miss; concurrent callers share it
            new HybridCacheEntryOptions { Expiration = TimeSpan.FromMinutes(10), LocalCacheExpiration = TimeSpan.FromMinutes(2) },
            tags: new[] { "tenants" },
            cancellationToken: ct);
}

// When a tenant changes: await cache.RemoveByTagAsync("tenants");  (or remove the exact key)</div></div>

          <div class="ans-block"><div class="ans-label">Correctness concerns</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.2fr 2.6fr;"><div>Concern</div><div>Handling</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Stale mapping after a change</div><div>Short time-to-live plus an invalidation event (for example a message on tenant change) that clears the entry on all instances</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Suspended or deleted tenant</div><div>Keep the time-to-live short for status, or push an immediate invalidation; check status on sensitive operations</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Cache stampede on expiry</div><div>Single-flight loading (HybridCache does this) and a little time-to-live jitter</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Unknown tenant lookups</div><div>Cache the negative result briefly so attackers cannot force database hits</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Cache outage</div><div>Fall back to the database with a circuit breaker; the system is slower, not down</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Cross-tenant leakage</div><div>The tenant id is part of every cache key; never a global key for tenant data</div></div>
          </div></div>

          <div class="tip-box">✅ Interview line: "I avoid the lookup by carrying the tenant in the token, and cache the remainder in a memory-plus-Redis hybrid with a short time-to-live and event-based invalidation. The database is the source of truth, read only on a miss, with single-flight loading so a burst of misses becomes one query."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q8</div>
      <div class="qa-body">
        <div class="qa-question">The pipeline middleware should run only for HTTP POST requests, not GET — GET requests should not go inside the middleware. How do you add that condition?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — branch the pipeline with UseWhen so the middleware is only part of the path for POST requests; or check the method inside the middleware and call next for everything else; or move the logic to an endpoint filter</div>
          <div class="qa-answer">"The cleanest way is conditional registration: app.UseWhen with a predicate on the HTTP method. For GET requests the middleware is skipped entirely, and because UseWhen rejoins the main pipeline afterwards, the rest of the middleware still runs. If the middleware is shared, I can instead test the method at the top and call next immediately for non-POST. For logic that belongs to specific endpoints, an endpoint filter or action filter is more precise than middleware."</div></div>

          <div class="ans-block"><div class="ans-label">Option 1 — UseWhen at registration (best for this requirement)</div>
          <div class="code-box">app.UseAuthentication();
app.UseAuthorization();

// POST requests pass through AuditMiddleware; GET requests never enter it
app.UseWhen(
    ctx =&gt; HttpMethods.IsPost(ctx.Request.Method),
    branch =&gt; branch.UseMiddleware&lt;AuditMiddleware&gt;());

app.MapControllers();</div></div>

          <div class="ans-block"><div class="ans-label">Option 2 — check inside the middleware</div>
          <div class="code-box">public class AuditMiddleware
{
    private readonly RequestDelegate _next;
    public AuditMiddleware(RequestDelegate next) { _next = next; }

    public async Task InvokeAsync(HttpContext ctx)
    {
        if (!HttpMethods.IsPost(ctx.Request.Method))
        {
            await _next(ctx);          // GET and others: pass straight through
            return;
        }

        // POST-only logic here
        await _next(ctx);
    }
}</div>
          <p>The middleware still runs for GET (and is in the pipeline), but does nothing. Prefer option 1 when the intent is that GET never enters it.</p></div>

          <div class="ans-block"><div class="ans-label">Option 3 — filters for endpoint-specific logic</div>
          <div class="code-box">// Minimal API endpoint filter on the POST endpoints only
app.MapPost("/orders", CreateOrder).AddEndpointFilter&lt;AuditFilter&gt;();

// MVC: an action filter on the POST actions
[HttpPost, ServiceFilter(typeof(AuditFilter))]
public IActionResult Create(CreateOrder cmd) { /* ... */ }</div></div>

          <div class="ans-block"><div class="ans-label">UseWhen versus MapWhen</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:0.9fr 2fr 1.4fr;"><div>Method</div><div>Behaviour</div><div>Use for</div></div>
            <div class="dt-row" style="grid-template-columns:0.9fr 2fr 1.4fr;"><div class="dt-name">UseWhen</div><div>Runs the branch when the predicate is true, then rejoins the main pipeline</div><div>Optional middleware, as here</div></div>
            <div class="dt-row" style="grid-template-columns:0.9fr 2fr 1.4fr;"><div class="dt-name">MapWhen</div><div>Creates a separate branch that does not rejoin</div><div>A whole different pipeline for matching requests</div></div>
          </div></div>

          <div class="warn-box">⚠️ Check the order: if the middleware needs the authenticated user or the routing result, register it after UseAuthentication, UseRouting and UseAuthorization. A middleware that reads the request body should enable buffering and rewind the stream so the endpoint can still read it. Also treat PUT, PATCH and DELETE explicitly — "not GET" and "only POST" are different rules.</div>
          <div class="tip-box">✅ Interview line: "I use UseWhen with HttpMethods.IsPost so GET never enters the middleware and the pipeline continues normally; if the behaviour is really per endpoint I use an endpoint or action filter instead."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q9</div>
      <div class="qa-body">
        <div class="qa-question">Two classes — PermanentEmpService and ContractEmpService — are both registered as IEmpService. How does the constructor of Employee receive both instances?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">The code in the question</div>
          <div class="code-box">services.AddTransient&lt;IEmpService, PermanentEmpService&gt;();
services.AddTransient&lt;IEmpService, ContractEmpService&gt;();

public class Employee
{
    public Employee(IEmpService _service)
    {
        // question: this parameter has two implementations — which one is injected?
    }
}</div></div>

          <div class="ans-block"><div class="ans-label">Short answer — a single IEmpService parameter receives only the last registration (ContractEmpService); to get both, inject IEnumerable of IEmpService; to pick one by name, use keyed services; or hide the choice behind a factory</div>
          <div class="qa-answer">"With two registrations of the same interface, the container resolves a single-instance parameter to the last one registered — here ContractEmpService — and silently ignores the first. To receive both, I inject IEnumerable of IEmpService; to choose a specific one I use keyed services from .NET 8, or a small factory or strategy that selects by employee type."</div></div>

          <div class="ans-block"><div class="ans-label">Option 1 — inject all implementations</div>
          <div class="code-box">public class EmployeeProcessor
{
    private readonly IEnumerable&lt;IEmpService&gt; _services;
    public EmployeeProcessor(IEnumerable&lt;IEmpService&gt; services) { _services = services; }   // both, in registration order
}</div></div>

          <div class="ans-block"><div class="ans-label">Option 2 — keyed services (.NET 8 and later)</div>
          <div class="code-box">services.AddKeyedTransient&lt;IEmpService, PermanentEmpService&gt;("permanent");
services.AddKeyedTransient&lt;IEmpService, ContractEmpService&gt;("contract");

public class PayrollHandler
{
    private readonly IEmpService _permanent;
    private readonly IEmpService _contract;

    public PayrollHandler(
        [FromKeyedServices("permanent")] IEmpService permanent,
        [FromKeyedServices("contract")]  IEmpService contract)
    { _permanent = permanent; _contract = contract; }
}</div></div>

          <div class="ans-block"><div class="ans-label">Option 3 — a factory or strategy selected at run time (best when the choice depends on data)</div>
          <div class="code-box">public enum EmployeeType { Permanent, Contract }

public interface IEmpServiceFactory { IEmpService For(EmployeeType type); }

public class EmpServiceFactory : IEmpServiceFactory
{
    private readonly IServiceProvider _sp;
    public EmpServiceFactory(IServiceProvider sp) { _sp = sp; }

    public IEmpService For(EmployeeType type) =&gt; type switch
    {
        EmployeeType.Permanent =&gt; _sp.GetRequiredService&lt;PermanentEmpService&gt;(),
        EmployeeType.Contract  =&gt; _sp.GetRequiredService&lt;ContractEmpService&gt;(),
        _ =&gt; throw new ArgumentOutOfRangeException(nameof(type))
    };
}

// registration: concrete types, plus the factory
services.AddTransient&lt;PermanentEmpService&gt;();
services.AddTransient&lt;ContractEmpService&gt;();
services.AddSingleton&lt;IEmpServiceFactory, EmpServiceFactory&gt;();</div></div>

          <div class="ans-block"><div class="ans-label">Comparing the options</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.7fr 1.6fr;"><div>Option</div><div>Use when</div><div>Note</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.6fr;"><div class="dt-name">IEnumerable of IEmpService</div><div>You need all implementations (run each, aggregate)</div><div>Order is the registration order</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.6fr;"><div class="dt-name">Keyed services</div><div>The consumer knows which one it wants at compile time</div><div>Built in from .NET 8; the key is a string or other value</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.6fr;"><div class="dt-name">Factory or strategy</div><div>The choice depends on runtime data, such as the employee type</div><div>Most flexible and easiest to test</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.6fr;"><div class="dt-name">Separate interfaces</div><div>The two really have different contracts</div><div>IPermanentEmpService and IContractEmpService; clearest when behaviour truly differs</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Design observations</div>
          <div class="decision-table">
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">A domain entity should not take services</div><div>Employee looks like a data entity; injecting a service into its constructor mixes data and behaviour and breaks object creation by ORMs. Put the logic in a service that receives the employee, as the strategy above does</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Lifetimes</div><div>Transient is fine for stateless services; a singleton factory must not capture scoped services, so resolve from IServiceProvider inside the call</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Naming</div><div>Use consistent casing — PermanentEmpService, ContractEmpService — and the same names in registration and classes</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Related patterns</div><div>This is the strategy pattern with the container as the registry; see the DI internals answer in Aezion Round 1</div></div>
          </div></div>

          <div class="tip-box">✅ Interview line: "A single parameter gets the last registration, so the first is silently ignored. I inject IEnumerable when I need all of them, keyed services when the consumer knows the one it wants, and a factory or strategy when the choice depends on data — and I keep the services out of the entity."</div>
        </div>
      </div>
    </div>

  </div>
`;
