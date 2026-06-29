window.Pages = window.Pages || {};
window.Pages['bosch'] = `
  <div class="page-header">
    <div class="breadcrumb">Home › <span>Bosch</span></div>
    <h1>⚙️ Bosch Interview</h1>
    <p>Clean Architecture · Monolithic Migration · System Design · Performance · Swiggy-style Design</p>
  </div>
  <div class="qa-list">

    <div class="qa-card">
      <div class="qa-num">R1·Q1</div>
      <div class="qa-body">
        <div class="qa-question">What is Clean Architecture?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Layers (outer → inner)</div>
            <div class="flow-box">
              <div class="flow-step">Presentation Layer — UI / API Controllers</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Application Layer — Use Cases / Services</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Domain Layer — Entities / Business Rules</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">Infrastructure Layer — DB / External APIs / File System</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Key Rule</div><p>Inner layers know nothing about outer layers. Dependencies point inward only.</p></div>
          <div class="tip-box">✅ Benefits: Testable · Maintainable · Framework-independent · Easy to swap DB or UI</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q2</div>
      <div class="qa-body">
        <div class="qa-question">Scope vs Transient (Dependency Injection lifetimes)</div>
        <div class="qa-answer">

          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:14px;">
            <div class="ans-block">
              <div class="ans-label" style="color:#38bdf8;">Transient</div>
              <p>New instance <strong>every time</strong> it is requested from the container.</p>
              <div class="code-box">services.AddTransient
  &lt;IEmailSender, EmailSender&gt;();

// Each inject → fresh object
// Safe for stateless helpers</div>
            </div>
            <div class="ans-block">
              <div class="ans-label" style="color:#4ade80;">Scoped</div>
              <p>One instance <strong>per HTTP request</strong>. Shared within the same request, disposed at end.</p>
              <div class="code-box">services.AddScoped
  &lt;IOrderRepository, OrderRepository&gt;();

// Same instance for entire request
// DbContext is always Scoped ✅</div>
            </div>
            <div class="ans-block">
              <div class="ans-label" style="color:#fb923c;">Singleton</div>
              <p>One instance for the <strong>entire app lifetime</strong>. Created once, reused forever.</p>
              <div class="code-box">services.AddSingleton
  &lt;IConfigService, ConfigService&gt;();

// Same instance for all requests
// Must be thread-safe ✅</div>
            </div>
          </div>

          <div class="ans-block">
            <div class="ans-label">Which Lifetime to Use — Decision Guide</div>
            <div class="pattern-table" style="margin-top:6px;">
              <div class="pt-row pt-header"><div>Service Type</div><div>Use Lifetime</div><div>Why</div></div>
              <div class="pt-row"><div class="pt-name">DbContext (EF Core)</div><div>Scoped</div><div>One context per request keeps transactions consistent. Disposing per-request prevents memory leaks.</div></div>
              <div class="pt-row"><div class="pt-name">Repository / UnitOfWork</div><div>Scoped</div><div>Must share the same DbContext within a request. Multiple repositories in one request share one transaction.</div></div>
              <div class="pt-row"><div class="pt-name">Business / Domain Service</div><div>Scoped or Transient</div><div>Scoped if it depends on a Scoped service (e.g. repository). Transient if fully stateless with no dependencies.</div></div>
              <div class="pt-row"><div class="pt-name">HttpClient / IHttpClientFactory</div><div>Transient (via factory)</div><div>Each call gets a managed HttpClient. Factory is Singleton; individual clients are Transient to avoid socket exhaustion.</div></div>
              <div class="pt-row"><div class="pt-name">Stateless helper / Validator</div><div>Transient</div><div>No state to share. Lightweight objects — safe to create per injection. No captive dependency risk.</div></div>
              <div class="pt-row"><div class="pt-name">Configuration / Settings</div><div>Singleton</div><div>Read-only after startup. Same values for entire lifetime. Thread-safe by nature.</div></div>
              <div class="pt-row"><div class="pt-name">In-memory Cache / MemoryCache</div><div>Singleton</div><div>Must survive across requests to be useful. Shared across all users.</div></div>
              <div class="pt-row"><div class="pt-name">Background Service / Hosted Service</div><div>Singleton</div><div>Runs outside request scope. Cannot use Scoped services directly — must use IServiceScopeFactory.</div></div>
              <div class="pt-row"><div class="pt-name">Logger (ILogger&lt;T&gt;)</div><div>Singleton</div><div>Framework registers it as Singleton. Safe to inject anywhere — thread-safe by design.</div></div>
            </div>
          </div>

          <div class="ans-block" style="margin-top:14px;">
            <div class="ans-label">Captive Dependency Bug — Explained</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:6px;">
              <div>
                <div class="code-box">// ❌ WRONG — captive dependency
public class ReportService  // Singleton
{
    private readonly IOrderRepo _repo; // Scoped!

    public ReportService(IOrderRepo repo)
    {
        _repo = repo; // captured at startup
    }
}
// IOrderRepo was created for Request #1.
// ReportService lives forever.
// Request #2, #3 ... all use the
// SAME IOrderRepo from Request #1.
// → stale DbContext, wrong data,
//   ObjectDisposedException 💥</div>
              </div>
              <div>
                <div class="code-box">// ✅ FIX 1 — make ReportService Scoped
services.AddScoped&lt;ReportService&gt;();
// Now ReportService is recreated
// every request → gets fresh IOrderRepo

// ✅ FIX 2 — use IServiceScopeFactory
//  (for Singletons that truly must stay)
public class ReportService  // Singleton
{
    private readonly IServiceScopeFactory _sf;
    public ReportService(IServiceScopeFactory sf)
        => _sf = sf;

    public void Generate() {
        using var scope = _sf.CreateScope();
        var repo = scope.ServiceProvider
            .GetRequiredService&lt;IOrderRepo&gt;();
        // repo is fresh, scoped to this call
    }
}</div>
              </div>
            </div>
          </div>

          <div class="ans-block" style="margin-top:14px;">
            <div class="ans-label">Injection Compatibility Rules</div>
            <div class="pattern-table" style="margin-top:6px;">
              <div class="pt-row pt-header"><div>Inject INTO →</div><div>Transient</div><div>Scoped</div><div>Singleton</div></div>
              <div class="pt-row"><div class="pt-name">Transient service</div><div class="dt-yes">✅ Safe</div><div class="dt-yes">✅ Safe</div><div class="dt-yes">✅ Safe</div></div>
              <div class="pt-row"><div class="pt-name">Scoped service</div><div class="dt-yes">✅ Safe</div><div class="dt-yes">✅ Safe</div><div class="dt-no">❌ Captive bug</div></div>
              <div class="pt-row"><div class="pt-name">Singleton service</div><div class="dt-yes">✅ Safe</div><div class="dt-no">❌ Captive bug</div><div class="dt-yes">✅ Safe</div></div>
            </div>
            <div class="tip-box" style="margin-top:8px;">✅ Rule: a service can only depend on services of <strong>equal or longer</strong> lifetime. Singleton can safely take Transient or Singleton. Scoped can take Transient or Scoped. Never shorter-lived into longer-lived.</div>
          </div>

          <div class="ans-block" style="margin-top:14px;">
            <div class="ans-label">Background Service — Common Gotcha</div>
            <div class="code-box">// ❌ This crashes at runtime — Scoped inside Singleton
public class OrderProcessor : BackgroundService  // Singleton
{
    public OrderProcessor(IOrderRepo repo) { } // Scoped → CRASH
}

// ✅ Correct — create a scope per job run
public class OrderProcessor : BackgroundService
{
    private readonly IServiceScopeFactory _sf;
    public OrderProcessor(IServiceScopeFactory sf) => _sf = sf;

    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        while (!ct.IsCancellationRequested)
        {
            using (var scope = _sf.CreateScope())
            {
                var repo = scope.ServiceProvider
                    .GetRequiredService&lt;IOrderRepo&gt;();
                await repo.ProcessPendingOrdersAsync();
            }
            await Task.Delay(TimeSpan.FromSeconds(30), ct);
        }
    }
}</div>
            <div class="warn-box" style="margin-top:8px;">⚠️ ASP.NET Core validates scope at startup (in Development). Enable it in Production too: <code>services.BuildServiceProvider(validateScopes: true)</code></div>
          </div>

        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q3</div>
      <div class="qa-body">
        <div class="qa-question">What is Middleware?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Request Pipeline</div>
            <div class="flow-box">
              <div class="flow-step">Request</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Logging Middleware</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Authentication Middleware</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Authorization Middleware</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">Controller / Handler</div><div class="flow-arrow">↓</div>
              <div class="flow-step">Response (reverse order)</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Common Middleware in .NET</div>
            <div class="tag-grid">
              <span class="tag blue">UseAuthentication</span><span class="tag blue">UseAuthorization</span>
              <span class="tag blue">UseCors</span><span class="tag blue">UseExceptionHandler</span>
              <span class="tag blue">UseRateLimiter</span><span class="tag blue">Custom Middleware</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R2·Q1</div>
      <div class="qa-body">
        <div class="qa-question">Application is crashing — no monitoring or logging. How will you fix it?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Immediate Steps</div><ul>
            <li>Implement structured logging — Serilog / NLog / Application Insights</li>
            <li>Add health check endpoints</li>
            <li>Set up monitoring — Prometheus + Grafana or Azure Monitor</li>
          </ul></div>
          <div class="ans-block"><div class="ans-label">Architecture Fix</div><ul>
            <li>Split highly used module into separate microservice</li>
            <li>Separate DB per domain to avoid contention</li>
            <li>Add circuit breaker to prevent cascade failures</li>
          </ul></div>
          <div class="tip-box">✅ First: add logging + monitoring. Then: identify bottleneck. Then: architectural fix.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R2·Q2</div>
      <div class="qa-body">
        <div class="qa-question">How will you scale a monolithic application?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short-term: Horizontal Scaling</div>
            <div class="flow-box">
              <div class="flow-step blue">Load Balancer</div><div class="flow-arrow">↓</div>
              <div class="flow-step">Instance 1 | Instance 2 | Instance 3</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Limitations of Monolith Scaling</div><ul>
            <li>You must scale the entire app even if only one module is under load</li>
            <li>Shared DB becomes a bottleneck</li>
            <li>Deployments affect the whole system</li>
          </ul></div>
          <div class="tip-box">✅ Short-term: add instances. Long-term: migrate to microservices.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R2·Q3</div>
      <div class="qa-body">
        <div class="qa-question">How to migrate from Monolithic to Microservices?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Strategy: Strangler Fig Pattern</div>
            <div class="flow-box">
              <div class="flow-step">Identify bounded contexts / domains</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Extract one module at a time (start with least coupled)</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">New microservice runs alongside monolith</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Route traffic gradually to new service</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">Retire monolith module when stable</div>
            </div>
          </div>
          <div class="warn-box">⚠️ Do NOT big-bang rewrite. Extract incrementally to reduce risk.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q5</div>
      <div class="qa-body">
        <div class="qa-question">Design a Swiggy-like food ordering system</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Microservices Breakdown</div>
            <div class="tag-grid">
              <span class="tag blue">Customer Service</span><span class="tag blue">Restaurant Service</span>
              <span class="tag blue">Order Service</span><span class="tag blue">Payment Service</span>
              <span class="tag blue">Notification Service</span><span class="tag blue">Delivery Service</span>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Flow</div>
            <div class="flow-box">
              <div class="flow-step">Customer Login (Customer Service)</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Restaurant Listing (Restaurant Service + Redis Cache)</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Place Order (Order Service → OrderCreated Event)</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Payment (Payment Service → PaymentConfirmed Event)</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Notify Restaurant + Customer (Notification Service)</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">Order Status Updates (Delivery Service → WebSocket/SignalR)</div>
            </div>
          </div>
          <div class="tip-box">✅ Each service has its own DB. Events connect services. Redis for restaurant listing cache.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R2·Q4</div>
      <div class="qa-body">
        <div class="qa-question">How will you improve Application Performance?</div>
        <div class="qa-answer">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="ans-block"><div class="ans-label">Backend</div><ul>
              <li>Redis caching for frequent reads</li>
              <li>DB query optimization + indexing</li>
              <li>Async processing — offload to queues</li>
              <li>Read replica for heavy read workloads</li>
              <li>Connection pooling</li>
              <li>Pagination — avoid loading all records</li>
            </ul></div>
            <div class="ans-block"><div class="ans-label">Infrastructure</div><ul>
              <li>HPA — scale pods on CPU spike</li>
              <li>KEDA — scale on queue length</li>
              <li>CDN — static asset delivery</li>
              <li>Rate limiting — prevent abuse</li>
              <li>Circuit breaker — prevent cascade failures</li>
            </ul></div>
          </div>
        </div>
      </div>
    </div>

  </div>
`;
