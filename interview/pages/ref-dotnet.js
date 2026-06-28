window.Pages['ref-dotnet'] = `
<div class="page-header">
  <div class="breadcrumb">Deep Dive › <span>.NET Architecture</span></div>
  <h1>⚙️ .NET Architecture — Deep Dive</h1>
  <p>.NET 8/9 · ASP.NET Core · DI · Middleware · Async · GC · Performance · gRPC · SignalR</p>
</div>

<div class="ref-section">
  <div class="ref-title">ASP.NET Core Pipeline — Middleware</div>
  <div class="ref-body">
    <div class="code-box">Request Pipeline: each middleware can short-circuit or pass to next.

app.UseExceptionHandler()    ← catches unhandled exceptions
app.UseHsts()                ← adds HSTS header
app.UseHttpsRedirection()    ← redirect HTTP → HTTPS
app.UseStaticFiles()         ← serve files from wwwroot
app.UseRouting()             ← match URL to endpoint
app.UseCors()                ← CORS headers
app.UseAuthentication()      ← verify who you are (JWT, cookies)
app.UseAuthorization()       ← verify what you can do (roles, policies)
app.UseRateLimiter()         ← throttle requests
app.MapControllers()         ← dispatch to controller/endpoint</div>
    <div class="warn-box">⚠️ Order matters! UseAuthentication() MUST come before UseAuthorization(). UseCors() MUST come before UseRouting() in some scenarios.</div>
    <div class="ans-label" style="margin-top:12px;">Custom Middleware</div>
    <div class="code-box">public class CorrelationIdMiddleware(RequestDelegate next) {
    public async Task InvokeAsync(HttpContext ctx) {
        var corrId = ctx.Request.Headers["X-Correlation-Id"]
                        .FirstOrDefault() ?? Guid.NewGuid().ToString();
        ctx.Response.Headers["X-Correlation-Id"] = corrId;
        using (LogContext.PushProperty("CorrelationId", corrId))
            await next(ctx);
    }
}
app.UseMiddleware&lt;CorrelationIdMiddleware&gt;();</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Dependency Injection — Lifetimes</div>
  <div class="ref-body">
    <div class="three-col">
      <div>
        <div class="ans-label">Singleton</div>
        <div class="code-box">services.AddSingleton&lt;T&gt;();

One instance for entire app lifetime.
Shared across all requests.

✅ Use for:
  Configuration
  HttpClient (via IHttpClientFactory)
  Caches
  Heavy initialisation cost

⚠️ Must be thread-safe
⚠️ Cannot depend on Scoped services</div>
      </div>
      <div>
        <div class="ans-label">Scoped</div>
        <div class="code-box">services.AddScoped&lt;T&gt;();

One instance per HTTP request.
Shared within same request.

✅ Use for:
  DbContext (EF Core)
  Unit of Work
  Repository
  Services needing per-request state

⚠️ Do NOT inject into Singleton
   → "Captive dependency" bug!
   → Scoped would outlive its scope</div>
      </div>
      <div>
        <div class="ans-label">Transient</div>
        <div class="code-box">services.AddTransient&lt;T&gt;();

New instance every time requested.

✅ Use for:
  Lightweight, stateless services
  Validators
  Formatters

⚠️ High allocation if used for
   heavy objects
⚠️ Multiple instances in same
   request — data not shared</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Background Services &amp; Hosted Services</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">IHostedService / BackgroundService</div>
        <div class="code-box">public class OutboxRelayService(
    IServiceScopeFactory scopeFactory) : BackgroundService {

    protected override async Task ExecuteAsync(CancellationToken ct) {
        while (!ct.IsCancellationRequested) {
            using var scope = scopeFactory.CreateScope();
            var relay = scope.ServiceProvider
                             .GetRequiredService&lt;IOutboxRelay&gt;();
            await relay.ProcessPendingEventsAsync(ct);
            await Task.Delay(TimeSpan.FromSeconds(5), ct);
        }
    }
}
services.AddHostedService&lt;OutboxRelayService&gt;();</div>
      </div>
      <div>
        <div class="ans-label">Minimal API (.NET 8)</div>
        <div class="code-box">var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped&lt;IOrderService, OrderService&gt;();

var app = builder.Build();

app.MapGet("/orders/{id}", async (
    int id,
    IOrderService svc,
    CancellationToken ct) =&gt; {
    var order = await svc.GetByIdAsync(id, ct);
    return order is null ? Results.NotFound()
                         : Results.Ok(order);
})
.RequireAuthorization()
.WithName("GetOrder");

app.Run();</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Async/Await — Patterns &amp; Pitfalls</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Key Rules</div>
        <div class="code-box">// ✅ All async, all the way down
public async Task&lt;Order&gt; GetOrderAsync(int id) {
    return await _repo.GetByIdAsync(id);
}

// ❌ .Result / .Wait() = sync-over-async = DEADLOCK risk
var order = _repo.GetByIdAsync(id).Result;  // DANGER!

// ✅ ConfigureAwait(false) in libraries
await dbContext.SaveChangesAsync()
    .ConfigureAwait(false);  // Don't capture SynchronizationContext

// ✅ Parallel async
var t1 = GetOrderAsync(1);
var t2 = GetProductAsync(1);
var (order, product) = (await t1, await t2);
// OR: await Task.WhenAll(t1, t2);</div>
      </div>
      <div>
        <div class="ans-label">ValueTask vs Task</div>
        <div class="code-box">Task:      always allocates on heap.
ValueTask: avoids allocation when result is synchronous.

// Use ValueTask when result often available synchronously:
public ValueTask&lt;User&gt; GetFromCacheAsync(string key) {
    if (_cache.TryGetValue(key, out var user))
        return ValueTask.FromResult(user);  // no heap alloc!
    return new ValueTask&lt;User&gt;(FetchFromDbAsync(key));
}

// Don't use ValueTask if:
//  - Result always async
//  - Task is awaited multiple times
//  - Task is stored in a variable for later use</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Memory &amp; Performance — Span&lt;T&gt;, Memory&lt;T&gt;, GC</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Span&lt;T&gt; — Zero-allocation slicing</div>
        <div class="code-box">// Traditional: allocates new string on heap
var sub = input.Substring(5, 3);

// Span: zero allocation — a view over existing memory
ReadOnlySpan&lt;char&gt; span = input.AsSpan(5, 3);
// No allocation! span points into original string.

// Parse without allocation:
var date = DateTime.Parse(span);  // works with span directly

// Use for: parsing, string processing, binary data,
//          tight loops where allocation matters</div>
      </div>
      <div>
        <div class="ans-label">GC Basics &amp; Optimization</div>
        <div class="code-box">.NET GC Generations:
  Gen 0: short-lived objects (most objects)
         → collected frequently (milliseconds)
  Gen 1: survived one Gen 0 collection
  Gen 2: long-lived objects (singletons, caches)
         → expensive collection

Optimization tips:
  Pool objects: ArrayPool&lt;T&gt;.Shared (avoid allocations)
  ObjectPool&lt;T&gt; (pool expensive objects like StringBuilder)
  Struct vs Class: small data → struct (stack allocated)
  Avoid closures in hot paths (lambda captures = heap alloc)
  Use stackalloc for small fixed arrays</div>
      </div>
    </div>
    <div class="ans-label" style="margin-top:14px;">gRPC vs REST</div>
    <div class="code-box">gRPC:                                REST:
  Binary (Protobuf) → smaller, faster    JSON → human-readable
  HTTP/2 multiplexing                    HTTP/1.1 (mostly)
  Strongly-typed contracts (.proto)      OpenAPI spec
  Bidirectional streaming                Request/Response only
  Code-gen clients in any language       Manual client coding

Use gRPC for:
  Internal service-to-service calls (microservices)
  High-performance, low-latency internal APIs
  Streaming data (real-time, bidirectional)
  Polyglot environments needing contract-first APIs

Use REST for:
  Public APIs consumed by browsers/mobile
  Third-party integrations
  Simplicity and widespread tooling</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">SignalR — Real-Time Communication</div>
  <div class="ref-body">
    <div class="code-box">SignalR automatically selects best transport:
  1. WebSockets (preferred — full duplex)
  2. Server-Sent Events (SSE)
  3. Long Polling (fallback)

// Hub (server)
public class OrderHub : Hub {
    public async Task SendOrderUpdate(string orderId, string status) {
        await Clients.Group(orderId)
                     .SendAsync("OrderStatusChanged", orderId, status);
    }
    public async Task JoinOrderGroup(string orderId) {
        await Groups.AddToGroupAsync(Context.ConnectionId, orderId);
    }
}

// Scale-out with Redis backplane (multiple servers):
builder.Services.AddSignalR()
    .AddStackExchangeRedis("redis-connection-string");
// All servers see all messages via Redis pub/sub</div>
  </div>
</div>
`;
