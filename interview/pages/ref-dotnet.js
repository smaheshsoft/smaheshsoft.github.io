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

    <div class="ans-label" style="margin-top:12px;">🔴 The Problem — Why a single server isn't enough</div>
    <div class="ref-body">
      A SignalR connection (WebSocket) is <strong>stateful and sticky</strong> — it
      lives entirely in the memory of ONE server instance. When you scale out to
      multiple instances behind a load balancer, each server only tracks the
      connections it personally holds. So:
      <div class="code-box">Client A ──connected──▶ Server 1   (Server 1 knows about A)
Client B ──connected──▶ Server 2   (Server 2 knows about B)

Server 2 calls: Clients.All.SendAsync("update", ...)
  ✔ Client B  gets it   (B is on Server 2)
  ✘ Client A  MISSED it (A is on Server 1 — Server 2 has no idea A exists)</div>
      Groups, users, and broadcasts all break the same way: a server can only
      reach connections stored in its own memory.
    </div>

    <div class="ans-label" style="margin-top:12px;">🟢 How Redis Resolves It — the Backplane + Pub/Sub</div>
    <div class="ref-body">
      Redis sits <em>between</em> all the servers as a shared message bus (the
      "backplane"). It uses the <strong>publish/subscribe</strong> pattern:
      <ul>
        <li><strong>Every server SUBSCRIBES</strong> to the SignalR Redis channel(s) at startup.</li>
        <li>When any server needs to send a message, instead of only writing to its
        own local sockets, it <strong>PUBLISHES</strong> the message to Redis.</li>
        <li>Redis <strong>fans the message out</strong> to every subscribed server.</li>
        <li>Each server then delivers it to the matching connections it holds locally.</li>
      </ul>
      <div class="code-box">Step-by-step: Server 2 broadcasts to all clients

1. Server 2:  Clients.All.SendAsync("update", data)
2. SignalR ─▶ PUBLISH to Redis channel  ("update", data)
                     │
                     ▼
              ┌──────────────┐
              │    REDIS     │   pub/sub broadcast
              │  (backplane) │
              └──────┬───────┘
             ┌───────┼───────┐
             ▼       ▼       ▼
        Server 1  Server 2  Server 3   ← ALL subscribers receive it
             │       │       │
             ▼       ▼       ▼
        Client A  Client B  Client C   ← each server delivers to its own sockets

Result: Client A (on Server 1) NOW gets the message. ✔</div>
      <strong>Key point:</strong> Redis does <em>not</em> hold the WebSocket
      connections — those stay in each server's memory. Redis only relays the
      <em>messages</em> so every instance can deliver to the clients it owns.
      This makes the cluster behave like one logical SignalR server.
    </div>

    <div class="warn-box">⚠️ Notes: Redis is a message relay, not persistent storage — if a
    client is offline when a message is published, it won't be replayed (use a DB/queue for that).
    You still need <strong>sticky sessions</strong> at the load balancer so the initial
    negotiate/handshake and the long-lived connection land on the same server. Alternatives to
    the Redis backplane include Azure SignalR Service (fully managed, no backplane needed).</div>

    <div class="ans-label" style="margin-top:12px;">☁️ Azure SignalR Service — Managed Alternative (no backplane)</div>
    <div class="ref-body">
      Instead of running your own Redis backplane, Azure SignalR Service acts as a
      fully-managed hub. Your app servers hand off the WebSocket connections to
      Azure, which holds them and does the fan-out. Your servers stay stateless —
      they only publish messages, so scale-out and sticky sessions become Azure's job.
      <div class="code-box">// 1. Install the package
dotnet add package Microsoft.Azure.SignalR

// 2. Program.cs — just add .AddAzureSignalR()
builder.Services.AddSignalR()
    .AddAzureSignalR(builder.Configuration["Azure:SignalR:ConnectionString"]);
    // or .AddAzureSignalR() to read "Azure:SignalR:ConnectionString" automatically

// 3. appsettings.json (connection string from the Azure portal)
"Azure": {
  "SignalR": {
    "ConnectionString": "Endpoint=https://&lt;name&gt;.service.signalr.net;AccessKey=&lt;key&gt;;Version=1.0;"
  }
}

// 4. Map the hub exactly as before — Hub code is UNCHANGED
app.MapHub&lt;OrderHub&gt;("/orderhub");

// Your Hub stays identical — no code changes needed:
public class OrderHub : Hub {
    public async Task SendOrderUpdate(string orderId, string status) =>
        await Clients.Group(orderId).SendAsync("OrderStatusChanged", orderId, status);
}</div>
      <strong>How the flow changes:</strong>
      <div class="code-box">Client ──WebSocket──▶  AZURE SignalR Service  ◀──── App Server (stateless)
                       (holds all connections    (only sends messages,
                        + does the fan-out)       never holds sockets)

• Client connects → app server redirects it to Azure (negotiate step).
• Client's live connection is held by Azure, NOT your server.
• Server calls Clients.All.SendAsync(...) → routed through Azure → Azure fans out.</div>
      <strong>Redis backplane vs Azure SignalR Service:</strong>
      <ul>
        <li><strong>Redis:</strong> you host & scale Redis + your servers hold the sockets; more control, more ops work.</li>
        <li><strong>Azure:</strong> Azure holds the sockets & fans out; near-zero ops, auto-scales to 100k+ connections, pay-per-use. Just swap <code>.AddStackExchangeRedis(...)</code> for <code>.AddAzureSignalR(...)</code> — the rest of your Hub/client code is identical.</li>
      </ul>
    </div>
  </div>
</div>
`;
