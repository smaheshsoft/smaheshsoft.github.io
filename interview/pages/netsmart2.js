window.Pages['netsmart2'] = `
  <div class="page-header">
    <div class="breadcrumb">Home › <span>Netsmart – 2nd Attempt</span></div>
    <h1>🏥 Netsmart Interview — 2nd Attempt (05-Oct-2026)</h1>
    <p>First Round: OAuth/PKCE · Angular · Docker · AKS vs App Service · Repository Pattern · EF Core · Thread Starvation — Hiring Manager Round: Middleware Pattern · EHR System Design</p>
  </div>
  <div class="stats-bar" style="margin-bottom:20px;">
    <div class="stat-box"><div class="num">21</div><div class="label">Questions</div></div>
    <div class="stat-box"><div class="num">2</div><div class="label">Rounds</div></div>
  </div>
  <div class="qa-list">

    <div class="alert" style="margin-bottom:12px;"><strong>📋 First Round</strong></div>

    <div style="font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.6px;margin:4px 0 10px;">🔐 Security &amp; API Access Control</div>

    <div class="qa-card">
      <div class="qa-num">Q1</div>
      <div class="qa-body">
        <div class="qa-question">How to restrict one user from accessing an API — simply, without full authorization — and make it configurable (user might change it)?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Read the question carefully — this is NOT asking for OAuth/roles</div>
          "Simple, without authorization, configurable" points at a lightweight gate: an allow/deny list keyed by user identity, checked early in the pipeline, backed by config rather than a full policy engine.</div>
          <div class="code-box">Request → Middleware checks UserId against a configurable
           block-list/allow-list (appsettings.json or a DB table)
         → if blocked: 403 immediately, short-circuit the pipeline
         → if allowed: continue to the rest of the pipeline</div>
          <div class="ans-block"><div class="ans-label">In code — ASP.NET Core middleware, configurable at runtime</div>
          <div class="code-box">public class UserAccessRestrictionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IOptionsMonitor&lt;AccessRestrictionOptions&gt; _options;

    public UserAccessRestrictionMiddleware(RequestDelegate next,
        IOptionsMonitor&lt;AccessRestrictionOptions&gt; options)
    {
        _next = next;
        _options = options;             // IOptionsMonitor picks up config
    }                                     // changes WITHOUT a redeploy

    public async Task InvokeAsync(HttpContext context)
    {
        var userId = context.User.FindFirst("sub")?.Value;
        var blocked = _options.CurrentValue.BlockedUserIds;   // live-reloaded

        if (userId != null && blocked.Contains(userId))
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            await context.Response.WriteAsync("Access restricted for this user.");
            return;                      // short-circuit — never reaches the endpoint
        }
        await _next(context);
    }
}

// appsettings.json — reloadOnChange:true picks this up live
"AccessRestriction": { "BlockedUserIds": [ "user-123", "user-456" ] }</div></div>
          <div class="tip-box">✅ Interview line: "I'd implement this as early middleware reading from a reloadable config source — IOptionsMonitor in .NET — rather than a hard-coded check, so ops can block/unblock a user by editing config, no redeploy, no full authorization policy needed for what's really just a kill-switch per user."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q2</div>
      <div class="qa-body">
        <div class="qa-question">OAuth with PKCE — how do you implement it? What are the possible OAuth implementation combinations (grant types)?</div>
        <div class="qa-answer">
          <div class="code-box">PKCE (Proof Key for Code Exchange) — added on top of Authorization
Code flow to secure PUBLIC clients (SPA, mobile) that can't hold a
client secret safely.

1. Client generates a random 'code_verifier' (43-128 chars)
2. Client derives 'code_challenge = BASE64URL(SHA256(code_verifier))'
3. Authorize request includes code_challenge + code_challenge_method=S256
4. User authenticates, auth server returns an authorization 'code'
5. Client exchanges code for tokens, sending the ORIGINAL code_verifier
6. Auth server hashes the verifier and compares to the stored challenge
   — only the original client (that generated the verifier) can succeed,
   even if the authorization code itself is intercepted</div>
          <div class="ans-block"><div class="ans-label">In code — Authorization Code + PKCE, .NET / MSAL</div>
          <div class="code-box">var pca = PublicClientApplicationBuilder.Create(clientId)
    .WithAuthority(authority)
    .WithRedirectUri(redirectUri)
    .Build();

// MSAL generates and manages the code_verifier/code_challenge
// internally — PKCE is automatic for public client flows.
var result = await pca.AcquireTokenInteractive(scopes).ExecuteAsync();</div></div>
          <div class="decision-table">
            <div class="dt-row dt-header"><div>Grant Type</div><div>Use When</div></div>
            <div class="dt-row"><div class="dt-name">Authorization Code + PKCE</div><div>SPA, mobile, any public client — the modern default for user sign-in</div></div>
            <div class="dt-row"><div class="dt-name">Client Credentials</div><div>Service-to-service, no user involved (machine-to-machine)</div></div>
            <div class="dt-row"><div class="dt-name">Resource Owner Password (ROPC)</div><div>Legacy/trusted first-party apps only — avoid for new systems, no MFA/SSO support</div></div>
            <div class="dt-row"><div class="dt-name">Device Code</div><div>Input-constrained devices (smart TVs, CLI tools) — user authenticates on a second device</div></div>
            <div class="dt-row"><div class="dt-name">Implicit (deprecated)</div><div>Legacy SPAs before PKCE existed — do not use for new systems, token exposed in the URL fragment</div></div>
            <div class="dt-row"><div class="dt-name">Refresh Token</div><div>Silently renewing an access token without re-prompting the user</div></div>
          </div>
          <div class="tip-box">✅ Interview line: "PKCE isn't a separate grant type — it's a security extension to Authorization Code flow, mandatory today for any public client. I pair it with silent refresh-token renewal for SPAs, and keep Client Credentials strictly for service-to-service calls with no user context."</div>
        </div>
      </div>
    </div>

    <div style="font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.6px;margin:18px 0 10px;">🎨 Frontend — Angular</div>

    <div class="qa-card">
      <div class="qa-num">Q3</div>
      <div class="qa-body">
        <div class="qa-question">How do you pass data between non-child (unrelated/sibling) components in Angular?</div>
        <div class="qa-answer">
          <div class="decision-table">
            <div class="dt-row dt-header"><div>Mechanism</div><div>Best For</div></div>
            <div class="dt-row"><div class="dt-name">Shared Service + RxJS Subject/BehaviorSubject</div><div>Most common — a service injected into both components, exposing an Observable</div></div>
            <div class="dt-row"><div class="dt-name">NgRx / Akita (state management)</div><div>App-wide state shared across many unrelated components, with devtools/time-travel</div></div>
            <div class="dt-row"><div class="dt-name">Router — query params / route data</div><div>State that should survive a refresh or be shareable via URL</div></div>
            <div class="dt-row"><div class="dt-name">@Input/@Output via a common parent</div><div>Only if a reasonably close common ancestor exists — otherwise too much prop-drilling</div></div>
          </div>
          <div class="ans-block"><div class="ans-label">In code — shared service with BehaviorSubject</div>
          <div class="code-box">@Injectable({ providedIn: 'root' })
export class CartService {
  private itemCount$ = new BehaviorSubject&lt;number&gt;(0);
  readonly itemCount = this.itemCount$.asObservable();

  addItem() { this.itemCount$.next(this.itemCount$.value + 1); }
}

// Component A (adds items) — unrelated to Component B
constructor(private cart: CartService) {}
onAdd() { this.cart.addItem(); }

// Component B (shows badge count) — sibling, no parent/child relation
constructor(private cart: CartService) {}
ngOnInit() { this.cart.itemCount.subscribe(count =&gt; this.count = count); }</div></div>
          <div class="tip-box">✅ Interview line: "For two or three unrelated components I default to a shared singleton service with a BehaviorSubject — simple, testable, no extra library. I only reach for NgRx once the state graph gets complex enough that 'who updates this and when' becomes hard to trace without a single source of truth and devtools."</div>
        </div>
      </div>
    </div>

    <div style="font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.6px;margin:18px 0 10px;">🐳 Docker &amp; Build Pipeline</div>

    <div class="qa-card">
      <div class="qa-num">Q4</div>
      <div class="qa-body">
        <div class="qa-question">How do you pass arguments into a Dockerfile?</div>
        <div class="qa-answer">
          <div class="code-box">Two mechanisms, different lifetimes:

ARG   — build-time only, not available in the running container
ENV   — available at BOTH build time and runtime (persists in the image)</div>
          <div class="ans-block"><div class="ans-label">In code — Dockerfile ARG + docker build --build-arg</div>
          <div class="code-box"># Dockerfile
ARG DOTNET_VERSION=8.0
FROM mcr.microsoft.com/dotnet/sdk:${"$"}{DOTNET_VERSION} AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY . .
RUN dotnet publish -c ${"$"}{BUILD_CONFIGURATION} -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:${"$"}{DOTNET_VERSION}
ENV ASPNETCORE_ENVIRONMENT=Production
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "MyApp.dll"]</div></div>
          <div class="code-box"># Build command — override ARG values without editing the Dockerfile
docker build --build-arg DOTNET_VERSION=9.0 \\
             --build-arg BUILD_CONFIGURATION=Debug \\
             -t myapp:dev .</div>
          <div class="warn-box">⚠️ ARG values are NOT secret-safe — they're visible in 'docker history' and image layer metadata. Never pass passwords/API keys as ARG; use Docker BuildKit secrets (--secret) or runtime environment variables injected by the orchestrator instead.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q5</div>
      <div class="qa-body">
        <div class="qa-question">How do you change Dockerfile build values WHILE building the image, instead of hard-coding/replacing values in the file?</div>
        <div class="qa-answer">
          <div class="code-box">Same mechanism as Q4 (ARG) — plus multi-stage builds and
--build-arg lets CI/CD inject per-environment values without
ever editing the Dockerfile source between environments.</div>
          <div class="ans-block"><div class="ans-label">In code — CI/CD pipeline passing environment-specific values</div>
          <div class="code-box"># Same Dockerfile, different values per pipeline stage — the FILE
# never changes, only the build command's arguments do.

# Dev pipeline:
docker build --build-arg BUILD_CONFIGURATION=Debug \\
             --build-arg API_BASE_URL=https://dev-api.example.com \\
             -t myapp:dev .

# Prod pipeline:
docker build --build-arg BUILD_CONFIGURATION=Release \\
             --build-arg API_BASE_URL=https://api.example.com \\
             -t myapp:prod .

# Dockerfile uses ARG → ENV so the value is "baked in" where the
# app can read it at runtime via configuration:
ARG API_BASE_URL
ENV API_BASE_URL=${"$"}{API_BASE_URL}</div></div>
          <div class="tip-box">✅ Interview line: "I never hand-edit a Dockerfile per environment — that defeats 'build once, promote everywhere.' Environment-specific values go in as --build-arg (or better, as runtime environment variables / mounted config for anything that shouldn't force a rebuild per environment) driven entirely by the CI/CD pipeline's variables."</div>
        </div>
      </div>
    </div>

    <div style="font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.6px;margin:18px 0 10px;">☁️ Azure Compute Choices</div>

    <div class="qa-card">
      <div class="qa-num">Q6</div>
      <div class="qa-body">
        <div class="qa-question">When would you use AKS over App Service? What scenarios make AKS the better choice?</div>
        <div class="qa-answer">
          <div class="decision-table">
            <div class="dt-row dt-header"><div>Factor</div><div>App Service</div><div>AKS</div></div>
            <div class="dt-row"><div class="dt-name">Operational control</div><div>PaaS — platform manages scaling, patching, OS</div><div class="dt-yes">Full control — custom scaling rules, sidecars, networking</div></div>
            <div class="dt-row"><div class="dt-name">Microservices at scale</div><div>Workable for a handful of apps</div><div class="dt-yes">Purpose-built — service mesh, namespaces, many services per cluster</div></div>
            <div class="dt-row"><div class="dt-name">Multi-container / sidecar patterns</div><div>Limited (multi-container support exists but constrained)</div><div class="dt-yes">Native — sidecars, init containers, DaemonSets</div></div>
            <div class="dt-row"><div class="dt-name">Custom/event-driven autoscaling</div><div>Built-in rules (CPU/memory/HTTP queue)</div><div class="dt-yes">KEDA — scale on queue depth, Kafka lag, custom metrics</div></div>
            <div class="dt-row"><div class="dt-name">Portability</div><div>Azure-specific</div><div class="dt-yes">Kubernetes is portable across clouds/on-prem</div></div>
            <div class="dt-row"><div class="dt-name">Ops overhead</div><div class="dt-yes">Minimal — near zero cluster management</div><div>Real — upgrades, node pools, networking, RBAC</div></div>
            <div class="dt-row"><div class="dt-name">Team &amp; time-to-market</div><div class="dt-yes">Fastest — deploy and go</div><div>Slower ramp-up, needs K8s expertise on the team</div></div>
          </div>
          <div class="tip-box">✅ Interview line: "I default to App Service for a small number of services where PaaS simplicity wins. I move to AKS when I need genuine multi-service orchestration, custom event-driven scaling via KEDA, sidecar patterns, or portability across cloud providers — the operational cost of AKS has to be justified by a real architectural need, not used as a default."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q7</div>
      <div class="qa-body">
        <div class="qa-question">Why did Microsoft migrate Azure Functions from the in-process model to the isolated worker model? What's the benefit?</div>
        <div class="qa-answer">
          <div class="decision-table">
            <div class="dt-row dt-header"><div>Aspect</div><div>In-Process Model</div><div>Isolated Worker Model</div></div>
            <div class="dt-row"><div class="dt-name">.NET version coupling</div><div>Function app tied to the SAME .NET version as the Functions host runtime</div><div class="dt-yes">Runs its OWN process — any supported .NET version, independent of the host</div></div>
            <div class="dt-row"><div class="dt-name">Assembly conflicts</div><div>Shares the host's dependencies — version conflicts possible (e.g. Newtonsoft.Json)</div><div class="dt-yes">Full control over its own dependency versions — no host conflicts</div></div>
            <div class="dt-row"><div class="dt-name">Startup/DI control</div><div>Limited — host controls much of the pipeline</div><div class="dt-yes">Full control — standard .NET generic host, custom middleware</div></div>
            <div class="dt-row"><div class="dt-name">.NET upgrade pace</div><div>Must wait for the Functions host to support a new .NET version</div><div class="dt-yes">Can upgrade independently, faster adoption of new .NET releases</div></div>
            <div class="dt-row"><div class="dt-name">Fault isolation</div><div>A crash in function code can affect the host process</div><div class="dt-yes">Isolated process — a crash doesn't take down the host</div></div>
          </div>
          <div class="tip-box">✅ Interview line: "The core driver was decoupling — in-process functions were hostage to whatever .NET version the Functions host itself supported, and shared its dependency graph. Isolated worker runs the function as its own process with its own DI container and dependencies, so teams can adopt new .NET versions, custom middleware, and third-party packages without waiting on or fighting the host runtime."</div>
        </div>
      </div>
    </div>

    <div style="font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.6px;margin:18px 0 10px;">🗄️ Data Access Patterns — Repository, LINQ, SP, EF Core</div>

    <div class="qa-card">
      <div class="qa-num">Q8</div>
      <div class="qa-body">
        <div class="qa-question">Repository pattern — what does it actually solve, beyond just naming a class *Repository.cs?</div>
        <div class="qa-answer">
          <div class="code-box">Naming a class FooRepository.cs is a NAMING CONVENTION.
The Repository PATTERN is an architectural boundary:

  Domain/Business Layer  ──depends on──▶  IRepository&lt;T&gt; (abstraction)
                                                    ▲
                                                    │ implements
                                          EfCoreRepository&lt;T&gt;
                                                    │
                                                    ▼
                                            Actual data store
                                       (SQL Server, Mongo, in-memory...)

What it solves:
  • Decouples business logic from the data-access technology — swap
    EF Core for Dapper or Mongo without touching domain code
  • Centralizes query logic — avoids LINQ/SQL scattered across services
  • Makes business logic UNIT-TESTABLE — mock IRepository&lt;T&gt;, no real DB
  • Gives ONE place to add cross-cutting concerns: caching, soft-delete
    filtering, audit columns, multi-tenant row filtering</div>
          <div class="warn-box">⚠️ Common trap: a "repository" that's just 'IOrderRepository { IQueryable&lt;Order&gt; GetAll(); }' — leaking IQueryable means the data-access technology (and its query capabilities) leaks straight through the abstraction, defeating the whole point. A real repository exposes INTENT-based methods (GetActiveOrdersForCustomer(id)), not a raw queryable escape hatch.</div>
          <div class="tip-box">✅ Interview line: "The pattern isn't about the filename — it's about inverting the dependency so business logic depends on an abstraction, not on EF Core or any specific store. If I can swap the underlying database without touching a single business-logic class, the pattern is doing its job; if I can't, it's just a thin pass-through wrapper with the word 'Repository' in the name."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q9</div>
      <div class="qa-body">
        <div class="qa-question">Give a scenario where a LINQ query is better than a stored procedure.</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Scenario: dynamic, composable filtering (e.g. a product search/filter screen)</div>
          A UI with 8 optional filters (category, price range, brand, rating, in-stock, date added...) in any combination would require either a stored procedure with a dozen nullable parameters and messy conditional logic, or a dynamic-SQL-generating SP (losing plan caching benefits anyway) — vs. LINQ composing predicates naturally in code.</div>
          <div class="code-box">IQueryable&lt;Product&gt; query = _db.Products;

if (filter.CategoryId.HasValue)
    query = query.Where(p =&gt; p.CategoryId == filter.CategoryId);
if (filter.MinPrice.HasValue)
    query = query.Where(p =&gt; p.Price &gt;= filter.MinPrice);
if (filter.InStockOnly)
    query = query.Where(p =&gt; p.StockCount &gt; 0);
if (!string.IsNullOrEmpty(filter.Brand))
    query = query.Where(p =&gt; p.Brand == filter.Brand);

// Each filter is composed ONLY if present — EF Core translates the
// FINAL combined expression into ONE SQL query at execution time.
var results = await query.OrderBy(p =&gt; p.Name).ToListAsync();</div>
          <div class="decision-table">
            <div class="dt-row dt-header"><div>Favor LINQ</div><div>Favor Stored Procedure</div></div>
            <div class="dt-row"><div>Dynamic/optional filter combinations</div><div>Fixed, heavy, performance-critical batch operations</div></div>
            <div class="dt-row"><div>Business logic benefits from C# type safety/refactoring tools</div><div>Complex set-based operations better expressed in T-SQL (bulk upserts, recursive CTEs)</div></div>
            <div class="dt-row"><div>Rapid iteration — no DB deployment step needed per change</div><div>DBA team owns and tunes query plans independently of app deploys</div></div>
          </div>
          <div class="tip-box">✅ Interview line: "I reach for LINQ when the query shape itself varies based on user input — composability is LINQ's real advantage over a stored procedure, not raw performance. For a fixed, heavy, performance-critical path I'd still consider a stored procedure or a hand-tuned query."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q10</div>
      <div class="qa-body">
        <div class="qa-question">How does code performance compare between a stored procedure and a direct (LINQ/raw) query?</div>
        <div class="qa-answer">
          <div class="decision-table">
            <div class="dt-row dt-header"><div>Factor</div><div>Stored Procedure</div><div>Direct/LINQ Query</div></div>
            <div class="dt-row"><div class="dt-name">Execution plan caching</div><div class="dt-yes">Plan cached and reused reliably across calls</div><div>Also cached by SQL Server (parameterized queries), but EF-generated SQL shape can vary and cause plan cache bloat</div></div>
            <div class="dt-row"><div class="dt-name">Network round trips</div><div class="dt-yes">One call can do multiple statements server-side</div><div>Each query is typically its own round trip unless batched</div></div>
            <div class="dt-row"><div class="dt-name">Complex set-based logic</div><div class="dt-yes">T-SQL often outperforms translated LINQ for heavy joins/aggregations</div><div>EF-generated SQL can be suboptimal for very complex queries — inspect with .ToQueryString()</div></div>
            <div class="dt-row"><div class="dt-name">Development velocity</div><div>Slower — requires a DB deployment per change</div><div class="dt-yes">Faster — ships with the app, no separate DB artifact to deploy</div></div>
            <div class="dt-row"><div class="dt-name">Typical real-world gap</div><div>Negligible for straightforward CRUD — SQL Server optimizes both similarly</div><div>Negligible for straightforward CRUD — the gap only appears under complex/heavy queries</div></div>
          </div>
          <div class="warn-box">⚠️ Common trap: claiming stored procedures are "always faster" as a blanket statement. For simple CRUD, a well-formed LINQ/EF query compiles to nearly identical SQL and performs the same — the real performance gap shows up on complex, set-heavy, high-volume operations where hand-tuned T-SQL (indexed, plan-pinned) genuinely wins.</div>
          <div class="tip-box">✅ Interview line: "I don't default to 'SP is faster' — I profile first. For simple CRUD the difference is noise; for a reporting query doing heavy aggregation across millions of rows, I'd reach for a tuned stored procedure or a materialized view, not raw LINQ."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q11</div>
      <div class="qa-body">
        <div class="qa-question">DB First vs Code First approach — which is better? (DB First can also generate models — how does EDMX differ from current EF?)</div>
        <div class="qa-answer">
          <div class="decision-table">
            <div class="dt-row dt-header"><div>Factor</div><div>DB First</div><div>Code First</div></div>
            <div class="dt-row"><div class="dt-name">Source of truth</div><div>Database schema — models generated FROM it</div><div class="dt-yes">C# classes — schema generated FROM them via migrations</div></div>
            <div class="dt-row"><div class="dt-name">Existing/legacy databases</div><div class="dt-yes">Natural fit — reverse-engineer an existing schema</div><div>Awkward — have to reconcile migrations against a DB that already has data</div></div>
            <div class="dt-row"><div class="dt-name">Version control / diffing</div><div>EDMX is an XML blob — painful to diff/merge in PRs</div><div class="dt-yes">Plain C# + migration files — diffs cleanly in git</div></div>
            <div class="dt-row"><div class="dt-name">Team workflow</div><div>DBA owns schema changes, app re-generates models</div><div class="dt-yes">Developers own schema changes via code, DBA reviews migrations</div></div>
            <div class="dt-row"><div class="dt-name">Tooling (modern EF Core)</div><div>EDMX designer is EF6-era — NOT supported in EF Core</div><div class="dt-yes">'dotnet ef migrations' — the standard EF Core workflow</div></div>
          </div>
          <div class="code-box">EDMX (EF6 and earlier) vs modern EF Core:
  EDMX  = a visual XML model (.edmx file) + designer — EF Core
          dropped this entirely, no visual designer equivalent.
  EF Core DB First = "Scaffold-DbContext" command generates POCO
          classes + a DbContext directly from an existing database
          — no XML, no designer, just generated C# you can review
          in git like any other code.</div>
          <div class="tip-box">✅ Interview line: "Neither is universally 'better' — DB First (via Scaffold-DbContext, not EDMX, which EF Core removed) fits an existing database you don't control the schema evolution of; Code First fits greenfield projects where the team wants schema changes reviewed as code via migrations. For a NEW project I default to Code First because migrations give me a reviewable, git-tracked history of every schema change."</div>
        </div>
      </div>
    </div>

    <div style="font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.6px;margin:18px 0 10px;">⚡ Performance &amp; Concurrency</div>

    <div class="qa-card">
      <div class="qa-num">Q12</div>
      <div class="qa-body">
        <div class="qa-question">Async vs sync implementation in a REST API — what's the difference, and when does it matter?</div>
        <div class="qa-answer">
          <div class="code-box">SYNC   controller thread BLOCKS until the I/O operation completes —
        the thread sits idle-but-occupied, unavailable for other requests.

ASYNC  controller thread is RELEASED back to the pool while awaiting
        I/O (DB call, HTTP call) — reused for other requests, then
        resumes on (often a different) thread pool thread when the
        I/O completes.</div>
          <div class="code-box">[HttpGet("{id}")]
public IActionResult GetSync(int id)               // ❌ blocks the thread
{
    var order = _db.Orders.Find(id);                // sync EF call
    return Ok(order);
}

[HttpGet("{id}")]
public async Task&lt;IActionResult&gt; GetAsync(int id)  // ✅ releases the thread
{
    var order = await _db.Orders.FindAsync(id);     // async EF call
    return Ok(order);
}</div>
          <div class="tip-box">✅ Interview line: "The difference isn't speed for a SINGLE request — async doesn't make one request faster. It's about THROUGHPUT under concurrency: async frees the handling thread during I/O waits so the same thread pool serves far more concurrent requests before hitting ThreadPool starvation (see the dedicated starvation page) — that's why async is the default for any I/O-bound API endpoint."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q13</div>
      <div class="qa-body">
        <div class="qa-question">How do you avoid thread starvation?</div>
        <div class="qa-answer">
          <div class="code-box">See the dedicated "ThreadPool & Connection Pool Starvation" reference
page (Deep Dive Topics) for the full diagnosis + fix playbook. Summary:</div>
          <div class="decision-table">
            <div class="dt-row dt-header"><div>Cause</div><div>Fix</div></div>
            <div class="dt-row"><div class="dt-name">Sync-over-async (.Result/.Wait())</div><div>Async all the way down — await, never block on a Task</div></div>
            <div class="dt-row"><div class="dt-name">CPU-bound work inline in request handlers</div><div>Offload to a background worker queue, keep request threads free for I/O</div></div>
            <div class="dt-row"><div class="dt-name">No visibility into pool health</div><div>Monitor via dotnet-counters / ThreadPool.GetAvailableThreads, alert before saturation</div></div>
            <div class="dt-row"><div class="dt-name">Pool grows too slowly for a sudden spike</div><div>ThreadPool.SetMinThreads as a stopgap only — fix the root blocking cause first</div></div>
          </div>
          <div class="tip-box">✅ Interview line: "The fix is almost always removing a blocking call, not tuning the pool. I only tune SetMinThreads after confirming via dotnet-counters that the pool is genuinely saturated by legitimate async workload, not masking a sync-over-async bug."</div>
        </div>
      </div>
    </div>

    <div style="font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.6px;margin:18px 0 10px;">🧡 Platform Opinion — .NET Core</div>

    <div class="qa-card">
      <div class="qa-num">Q14</div>
      <div class="qa-body">
        <div class="qa-question">Why is .NET Core better — or what do you genuinely feel good about with .NET Core?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Treat this as an opinion question with evidence, not a feature-list recital</div>
          The interviewer is checking whether the preference is genuine (backed by specific experience) or just a resume keyword. Pick 2-3 concrete things and say WHY they mattered on a real project, rather than listing every .NET Core feature.</div>
          <div class="decision-table">
            <div class="dt-row dt-header"><div>What I Like</div><div>Why It Actually Matters In Practice</div></div>
            <div class="dt-row"><div class="dt-name">Cross-platform, single runtime</div><div>Same app runs on Linux containers in AKS as on a dev's Windows machine — no "works on my machine" OS drift, and Linux containers are cheaper/smaller than Windows containers</div></div>
            <div class="dt-row"><div class="dt-name">Performance (Kestrel, Span&lt;T&gt;, minimal APIs)</div><div>Kestrel benchmarks among the fastest web servers; Span&lt;T&gt;/Memory&lt;T&gt; let hot paths avoid allocations without dropping to unsafe code</div></div>
            <div class="dt-row"><div class="dt-name">Fast, predictable release cadence</div><div>Yearly releases, LTS every other year — teams can plan upgrades instead of being stuck on an old framework indefinitely</div></div>
            <div class="dt-row"><div class="dt-name">Built-in DI, configuration, logging</div><div>No need to bolt on a third-party DI container or config system — it's there from 'dotnet new', consistent across every project</div></div>
            <div class="dt-row"><div class="dt-name">Open source, community-driven</div><div>Can read the actual runtime/BCL source when debugging something subtle — not a black box</div></div>
            <div class="dt-row"><div class="dt-name">Native cloud-native fit</div><div>First-class support for containers, health checks, minimal APIs, gRPC — built for microservices/AKS-style deployments, not retrofitted</div></div>
          </div>
          <div class="code-box">Concrete example to anchor the answer (use YOUR real project here):
  "On the Battery Swapping platform, moving from .NET Framework to
   .NET 8 cut our container image size roughly in half (Linux-based
   images), reduced cold-start time for scaled-to-zero services, and
   let us adopt minimal APIs for a handful of simple endpoints instead
   of full MVC controllers — less ceremony for genuinely simple routes."</div>
          <div class="warn-box">⚠️ Avoid a generic "it's fast and cross-platform" answer with no project tie-in — that reads as recited, not experienced. The strongest version of this answer names a BEFORE/AFTER from a real migration (framework version, container size, startup time, a specific pain point solved).</div>
          <div class="tip-box">✅ Interview line: "What I value most isn't any single feature — it's that .NET Core treats cloud-native deployment as a first-class scenario: small Linux containers, fast startup, built-in health checks and DI, and a release cadence I can actually plan infrastructure upgrades around. Coming from .NET Framework, the container size and startup time improvements alone changed how we designed for autoscaling."</div>
        </div>
      </div>
    </div>

    <div class="alert" style="margin:24px 0 12px;"><strong>🎯 Hiring Manager Round</strong></div>

    <div class="qa-card">
      <div class="qa-num">Q15</div>
      <div class="qa-body">
        <div class="qa-question">What design pattern is used in .NET Core Middleware?</div>
        <div class="qa-answer">
          <div class="code-box">Chain of Responsibility — each middleware component decides to
handle the request, pass it to the next, or short-circuit the pipeline.

Request → MW1 → MW2 → MW3 → Endpoint
            │      │      │
            └──can short-circuit at any point (e.g. auth failure, 403)──┘</div>
          <div class="ans-block"><div class="ans-label">In code — the pattern made explicit</div>
          <div class="code-box">public class MyMiddleware
{
    private readonly RequestDelegate _next;   // reference to "the rest of the chain"
    public MyMiddleware(RequestDelegate next) =&gt; _next = next;

    public async Task InvokeAsync(HttpContext context)
    {
        // ... work before passing down the chain ...
        if (ShouldShortCircuit(context))
        {
            context.Response.StatusCode = 403;
            return;                              // chain stops HERE
        }
        await _next(context);                    // pass to the next handler
        // ... work after the chain returns (response already built) ...
    }
}</div></div>
          <div class="tip-box">✅ Interview line: "Each middleware holds a reference to the next delegate in the chain and decides whether to call it — that's Chain of Responsibility textbook. The app.Use... registrations in Program.cs build that chain in order, and any middleware can short-circuit it, which is exactly the pattern's defining behavior."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q16</div>
      <div class="qa-body">
        <div class="qa-question">What problem does LINQ solve?</div>
        <div class="qa-answer">
          <div class="code-box">Before LINQ: querying collections, DB rows, XML, each needed a
DIFFERENT API and mental model (SQL for DB, foreach+if for
collections, XPath for XML) — no shared syntax, no compile-time
type checking, no IntelliSense across data sources.

LINQ unifies all of them behind ONE query syntax, with:
  • Compile-time type safety (no magic strings for column names)
  • The SAME syntax over in-memory collections (LINQ to Objects),
    databases (LINQ to Entities/EF Core), and XML (LINQ to XML)
  • Deferred execution — a query is a description of work, not
    executed until enumerated (ToList/foreach/etc.)</div>
          <div class="warn-box">⚠️ Deferred execution is also LINQ's most common BUG source — re-enumerating an IQueryable re-runs the query against the DB each time, and closures over a loop variable can silently change what a deferred query captures. Always know whether a given expression is IQueryable (not yet run) or already materialized (List/array).</div>
          <div class="tip-box">✅ Interview line: "LINQ's core contribution is a single, type-safe, compile-time-checked query syntax across heterogeneous data sources — before it, you juggled SQL strings, foreach loops, and XPath with zero shared tooling. The trade-off to manage is deferred execution — knowing exactly when a query actually runs."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q17</div>
      <div class="qa-body">
        <div class="qa-question">What OAuth grant types/flows do you use? Is PKCE used?</div>
        <div class="qa-answer">
          <div class="code-box">Standard answer, grounded in Q2 above:
  Authorization Code + PKCE   → user-facing web/SPA/mobile sign-in (default)
  Client Credentials          → service-to-service, no user
  Refresh Token               → silent renewal without re-prompting

PKCE: YES — mandatory for any public client (SPA/mobile) per current
OAuth 2.1 best practice, even though PKCE was originally designed for
mobile apps without a client secret.</div>
          <div class="tip-box">✅ Interview line: "Authorization Code with PKCE for anything user-facing, Client Credentials for service-to-service, and I treat PKCE as non-optional for public clients regardless of platform — it's cheap to implement and closes the authorization-code-interception attack even for confidential clients."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q18</div>
      <div class="qa-body">
        <div class="qa-question">Design a scalable EHR (Electronic Health Record) system — doctor visits, prescriptions, patient information, medical records, lab reports.</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Service decomposition — bounded by domain, not by table</div>
          <div class="flow-box">
            <div class="flow-step">Patient Service<br><span style="font-weight:400;font-size:11px;">demographics, identity</span></div>
            <div class="flow-arrow">→</div>
            <div class="flow-step blue">Visit/Encounter Service<br><span style="font-weight:400;font-size:11px;">doctor visits, notes</span></div>
            <div class="flow-arrow">→</div>
            <div class="flow-step blue">Prescription Service<br><span style="font-weight:400;font-size:11px;">medication orders</span></div>
            <div class="flow-arrow">→</div>
            <div class="flow-step blue">Lab Service<br><span style="font-weight:400;font-size:11px;">orders, results</span></div>
          </div></div>
          <div class="code-box">                    ┌──────────────┐
                    │  API Gateway  │  ← AuthN/AuthZ, rate limiting, routing
                    └──────┬───────┘
          ┌────────────────┼──────────────────┬───────────────┐
          ▼                ▼                  ▼               ▼
   Patient Service   Visit Service    Prescription Service  Lab Service
   (own DB)          (own DB)          (own DB)              (own DB)
          │                │                  │               │
          └────────────────┴──────────────────┴───────────────┘
                            │
                     Event Bus (Service Bus/Kafka)
                     PatientAdmitted, VisitCompleted,
                     PrescriptionIssued, LabResultReady
                            │
                  ┌─────────┴──────────┐
                  ▼                    ▼
         Audit/Compliance Log   Notification Service
         (HIPAA-grade, immutable)  (patient/doctor alerts)</div>
          <div class="tip-box">✅ Each service owns its own data store (database-per-service) — Patient, Visit, Prescription and Lab are genuinely different bounded contexts with different access patterns, compliance requirements (lab results vs demographics), and scaling needs (lab results spike around batch result delivery; visits are steady traffic).</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q18a</div>
      <div class="qa-body">
        <div class="qa-question">EHR Design — How do you authenticate the user?</div>
        <div class="qa-answer">
          <div class="code-box">OAuth 2.0 Authorization Code + PKCE via an identity provider
(Entra ID / Azure AD B2C for patients+staff, or a healthcare-specific
IdP) — API Gateway validates the JWT on every request, propagates
claims (role: Doctor/Nurse/Patient/Admin, tenant/facility id) downstream.

MFA mandatory for clinical staff (HIPAA/HITECH expectation).
Patient portal: same OAuth flow, lower-privilege scope, tighter
session timeout given the sensitivity of the data.</div>
          <div class="tip-box">✅ Interview line: "Centralize authentication at the gateway — every downstream service trusts a validated JWT with role and facility claims rather than re-implementing auth. Role-based + attribute-based access control combined, since 'which patients can this doctor see' is a data-scoping rule, not just a role check."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q18b</div>
      <div class="qa-body">
        <div class="qa-question">EHR Design — What happens if one of the microservices goes down?</div>
        <div class="qa-answer">
          <div class="decision-table">
            <div class="dt-row dt-header"><div>Service Down</div><div>Graceful Degradation</div></div>
            <div class="dt-row"><div class="dt-name">Lab Service</div><div>Visit/Prescription flows continue; lab results show "temporarily unavailable" instead of failing the whole patient chart</div></div>
            <div class="dt-row"><div class="dt-name">Prescription Service</div><div>Doctor can still view history/labs; new prescriptions queue via the event bus and are issued once the service recovers — never silently dropped</div></div>
            <div class="dt-row"><div class="dt-name">Patient Service</div><div>Highest-impact — most other services need patient identity; mitigate with aggressive caching of patient demographics at the gateway/edge</div></div>
          </div>
          <div class="code-box">Resilience mechanisms:
  • Circuit breaker (Polly) per downstream call — fail fast instead
    of piling up blocked threads (ties back to thread-pool starvation)
  • Retry with exponential backoff for transient failures
  • Bulkhead isolation — Lab Service outage can't exhaust the
    connection pool / thread pool shared by Visit Service
  • Each service's UI section degrades independently — a patient
    chart renders available sections immediately, failed sections
    show a retry/placeholder instead of blocking the whole page</div>
          <div class="tip-box">✅ Interview line: "The design goal is partial availability, not all-or-nothing — a clinician should still see 90% of a patient's chart if one subsystem is degraded. Circuit breakers plus independent UI composition (not one monolithic API call building the whole page) is what makes that possible."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q18c</div>
      <div class="qa-body">
        <div class="qa-question">EHR Design — How do you optimize DB load?</div>
        <div class="qa-answer">
          <div class="decision-table">
            <div class="dt-row dt-header"><div>Lever</div><div>Applied To</div></div>
            <div class="dt-row"><div class="dt-name">Read replicas</div><div>Reporting/dashboard queries routed to a replica, never the primary write DB</div></div>
            <div class="dt-row"><div class="dt-name">Caching (Redis)</div><div>Patient demographics, provider directory — read-heavy, changes rarely</div></div>
            <div class="dt-row"><div class="dt-name">CQRS for heavy views</div><div>"Full patient chart" is a read-model assembled async from events, not a live join across 4 services' databases</div></div>
            <div class="dt-row"><div class="dt-name">Indexing &amp; partitioning</div><div>Lab results/visit history partitioned by date range — most queries are recent-first</div></div>
            <div class="dt-row"><div class="dt-name">Archival/tiering</div><div>Records older than N years moved to cheaper, less-indexed cold storage per retention policy</div></div>
          </div>
          <div class="tip-box">✅ Interview line: "I'd avoid building the patient-chart view as a live cross-service join — that couples all four services' availability and load together. Instead, a read-optimized projection (CQRS) is built asynchronously from domain events, so the heavy 'show me everything about this patient' query hits one denormalized store, not four live databases simultaneously."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q18d</div>
      <div class="qa-body">
        <div class="qa-question">EHR Design — If you need to communicate with an outside system, which mechanism/standard would you use? What if the external service is in a different programming language?</div>
        <div class="qa-answer">
          <div class="code-box">Healthcare interoperability has DEDICATED standards — don't invent
a custom JSON contract when the industry standard exists and the
outside system almost certainly expects it:

  HL7 FHIR (Fast Healthcare Interoperability Resources)
    → REST-based, JSON/XML resources (Patient, Observation,
      MedicationRequest, DiagnosticReport) — the modern standard
  HL7 v2 (pipe-delimited messages)
    → still common for legacy lab/hospital system integration
  DICOM
    → medical imaging interchange specifically

For a NEW integration: expose/consume FHIR REST APIs — language-agnostic
by design (HTTP + JSON), so a .NET service and a Java/Python external
system integrate without either knowing the other's tech stack.</div>
          <div class="ans-block"><div class="ans-label">Why this answers "different programming language" directly</div>
          FHIR (like any REST+JSON or gRPC-with-protobuf contract) is a WIRE-level contract — the external system's language is irrelevant as long as both sides implement the same FHIR resource schema. This is the same principle as any polyglot microservice communication: agree on the contract (FHIR resources, or a versioned OpenAPI/protobuf schema for non-healthcare data), never on implementation technology.</div>
          <div class="tip-box">✅ Interview line: "For healthcare interop specifically, I wouldn't roll a custom API — I'd expose FHIR resources, because that's what external EHR/lab/pharmacy systems already expect, and FHIR being REST+JSON means the external system's language never matters. For non-clinical data exchange outside FHIR's scope, the same principle holds: a versioned, technology-neutral contract — REST/JSON or gRPC/protobuf — is what lets a .NET service talk to a Java or Python system with zero shared runtime."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q18e</div>
      <div class="qa-body">
        <div class="qa-question">EHR Design — In case of concurrency, if the same record is updated from 2 different places, how is that handled?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Concrete EHR scenario first</div>
          A nurse updates a patient's vitals on the ward tablet at the same instant the attending doctor updates the SAME visit record's diagnosis notes from the desktop EHR client — both read the record at version N, both try to save. The system must not let one silently overwrite the other's change.</div>
          <div class="code-box">Two different strategies, pick based on what's actually being updated:

PESSIMISTIC LOCKING
  First writer locks the row/record; second writer BLOCKS or is
  rejected until the lock releases. Safe, but hurts throughput and
  risks lock contention/deadlocks under real concurrency.

OPTIMISTIC CONCURRENCY (preferred default for EHR-style records)
  No lock taken on read. Each record carries a RowVersion/ETag.
  On save, the update is conditioned on "version still matches what
  I read" — if someone else saved in between, the version moved and
  MY save is rejected, not silently overwritten.</div>
          <div class="ans-block"><div class="ans-label">In code — EF Core optimistic concurrency with RowVersion</div>
          <div class="code-box">public class VisitRecord
{
    public int Id { get; set; }
    public string DiagnosisNotes { get; set; }
    public string VitalsJson { get; set; }

    [Timestamp]                       // SQL Server rowversion column —
    public byte[] RowVersion { get; set; }   // auto-updated on every write
}

public async Task&lt;UpdateResult&gt; UpdateVisitAsync(VisitRecord incoming)
{
    _db.Entry(incoming).Property(v =&gt; v.RowVersion).OriginalValue
        = incoming.RowVersion;             // the version THIS client read

    try
    {
        _db.VisitRecords.Update(incoming);
        await _db.SaveChangesAsync();      // SQL: UPDATE ... WHERE RowVersion=@original
        return UpdateResult.Success();      // 0 rows affected if version moved →
    }                                        // EF Core throws below instead
    catch (DbUpdateConcurrencyException)
    {
        // Someone else saved this record first — do NOT silently overwrite.
        var current = await _db.VisitRecords.FindAsync(incoming.Id);
        return UpdateResult.Conflict(current);   // surface the conflict to the caller
    }
}</div></div>
          <div class="decision-table">
            <div class="dt-row dt-header"><div>Field Type</div><div>Conflict Strategy</div></div>
            <div class="dt-row"><div class="dt-name">Disjoint fields (nurse edits vitals, doctor edits diagnosis)</div><div>Merge at the FIELD level — update only the columns each actor actually touched, not the whole row, so unrelated edits never conflict</div></div>
            <div class="dt-row"><div class="dt-name">Same field edited by both (two doctors editing the same diagnosis text)</div><div>True conflict — reject the second save, return the current version, let the UI show "this was updated by Dr. X, review and re-apply your change"</div></div>
            <div class="dt-row"><div class="dt-name">Append-only data (vitals readings, lab results over time)</div><div>Avoid update-in-place entirely — insert a new timestamped reading instead, so there's no shared mutable row to conflict over</div></div>
          </div>
          <div class="warn-box">⚠️ The naive "last write wins" (just UPDATE ... WHERE Id=@id, no version check) is the actual failure mode being asked about — it silently discards one clinician's update with no error, no audit trail, and no way to know data was lost. In a clinical system this is not just a bug, it's a patient-safety and compliance issue.</div>
          <div class="tip-box">✅ Interview line: "I default to optimistic concurrency with a RowVersion/ETag for EHR-style records — locking hurts throughput and clinicians don't update the same record constantly, but I never allow silent last-write-wins. Where possible I narrow the conflict further by merging at the field level, since a nurse's vitals update and a doctor's diagnosis note touch different columns and shouldn't conflict at all — true conflicts should surface to the user, never resolve themselves silently."</div>
        </div>
      </div>
    </div>

  </div>
`;
