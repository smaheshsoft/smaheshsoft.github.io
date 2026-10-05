window.Pages['ref-pool-starvation'] = `
<div class="page-header">
  <div class="breadcrumb">Deep Dive › <span>ThreadPool &amp; Connection Pool Starvation</span></div>
  <h1>🧵 ThreadPool &amp; Connection Pool Starvation</h1>
  <p>Why pools run dry, how to see it happening, and how to fix it in code and at the DB</p>
</div>

<div class="ref-section">
  <div class="ref-title">At A Glance</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step">Demand for a limited resource</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step blue">All slots held, none released fast enough</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step">New requests queue, then time out</div>
    </div>
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">🧵</div><div class="principle-name">ThreadPool starvation</div><p>Worker threads blocked on sync-over-async or long CPU work, queue backs up</p></div>
      <div class="principle-card"><div class="principle-icon">🗄️</div><div class="principle-name">DB connection pool starvation</div><p>Connections opened but never returned — leaks, long transactions, no pooling config</p></div>
      <div class="principle-card"><div class="principle-icon">🌐</div><div class="principle-name">HttpClient / socket exhaustion</div><p>New HttpClient per request exhausts ephemeral ports under load</p></div>
      <div class="principle-card"><div class="principle-icon">🚦</div><div class="principle-name">Semaphore/throttle starvation</div><p>A leaked permit (missing release in a finally) slowly shrinks the effective pool to zero</p></div>
    </div>
    <div class="tip-box">✅ Every pool-starvation bug has the same shape: a resource is checked out, something goes wrong (block, exception, slow path), and it is never returned. The fix is always some combination of (1) don't block the thing that returns resources, (2) guarantee release in a finally/using, (3) size the pool and alert before it's empty.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">1. ThreadPool Starvation — Why It Happens</div>
  <div class="ref-body">
    <div class="code-box">.NET ThreadPool grows SLOWLY by design — roughly 1 new thread per
~500ms under sustained demand (the "hill-climbing" algorithm), to
avoid over-provisioning for brief spikes.

If requests block worker threads faster than the pool can grow new
ones, every incoming request queues behind already-blocked threads —
even though the CPU may be mostly idle, because threads are BLOCKED,
not BUSY.

Root causes:
  • .Result / .Wait() on an async Task from a sync context (sync-over-async)
  • CPU-bound work running on request-handling threads (should go to a
    dedicated compute path, not inline in the ASP.NET Core pipeline)
  • Task.Run() misuse queuing more work onto the SAME starved pool
  • A slow downstream dependency holding threads via blocking calls</div>
    <div class="warn-box">⚠️ The classic symptom: CPU usage looks LOW (10-20%) while p99 latency spikes into seconds and requests start timing out. Low CPU + high latency is the signature of thread starvation, not a compute bottleneck — teams often waste hours scaling up CPU/cores when the fix is removing blocking calls.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Diagnosing ThreadPool Starvation — Live, In Production</div>
  <div class="ref-body">
    <div class="code-box">dotnet-counters monitor -p &lt;pid&gt; System.Runtime
  Watch: ThreadPool Thread Count, ThreadPool Queue Length,
         ThreadPool Completed Work Item Count (rate)

ThreadPool.GetAvailableThreads(out int workerThreads, out int ioThreads)
  Compare against ThreadPool.GetMaxThreads(...) — if available
  keeps shrinking toward 0 while queue length grows, that's starvation.

dotnet-trace / Application Insights:
  Look for long "Thread Pool Queue Time" vs actual execution time —
  a request that takes 3s but only does 50ms of real work spent the
  rest WAITING for a free thread.</div>
    <div class="ans-block"><div class="ans-label">In code — exposing a live starvation signal</div>
    <div class="code-box">ThreadPool.GetAvailableThreads(out var availWorkers, out _);
ThreadPool.GetMaxThreads(out var maxWorkers, out _);
var starvationRatio = 1.0 - ((double)availWorkers / maxWorkers);

if (starvationRatio > 0.8)
    _logger.LogWarning("ThreadPool near starvation: {Avail}/{Max} available",
        availWorkers, maxWorkers);

// Expose as a custom metric so an alert fires BEFORE users see timeouts,
// not after — the same "fail fast and alert" principle as any other
// capacity signal (connection pool, queue depth, disk space).</div></div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Fixing ThreadPool Starvation — Code Side</div>
  <div class="ref-body">
    <div class="ans-block"><div class="ans-label">❌ Sync-over-async — the #1 cause</div>
    <div class="code-box">// BLOCKS a worker thread while waiting for an async operation —
// the thread can do nothing else until the Task completes.
public IActionResult GetOrder(int id)
{
    var order = _orderService.GetOrderAsync(id).Result;   // ❌ blocks
    return Ok(order);
}</div></div>
    <div class="ans-block"><div class="ans-label">✅ Async all the way down</div>
    <div class="code-box">// The thread is RELEASED back to the pool while awaiting — it can
// serve other requests instead of sitting idle-but-blocked.
public async Task&lt;IActionResult&gt; GetOrder(int id)
{
    var order = await _orderService.GetOrderAsync(id);    // ✅ non-blocking
    return Ok(order);
}</div></div>
    <div class="ans-block"><div class="ans-label">✅ Move genuine CPU-bound work off the request path</div>
    <div class="code-box">// A request handler thread spending 200ms on CPU-bound work (image
// resize, heavy serialization, crypto) blocks that thread from serving
// other requests even though nothing is "waiting" — it's legitimately busy.
public async Task&lt;IActionResult&gt; ResizeImage(byte[] data)
{
    // Offload to a bounded background worker queue instead of inline —
    // keeps request-handling threads free for I/O-bound work.
    var result = await _imageProcessingQueue.EnqueueAndWaitAsync(data);
    return Ok(result);
}</div></div>
    <div class="warn-box">⚠️ <code>ThreadPool.SetMinThreads()</code> can mask the symptom by forcing the pool to grow faster, but it does not fix the root cause — it just delays when starvation becomes visible, and wastes memory on idle threads in the meantime. Treat it as a stopgap, never the fix.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">2. DB Connection Pool Starvation — Why It Happens</div>
  <div class="ref-body">
    <div class="code-box">ADO.NET / EF Core pool a fixed number of physical DB connections
(default max pool size = 100 for SQL Server). A connection is
"checked out" when opened and MUST be returned (closed/disposed) for
another request to reuse it.

Root causes:
  • Connection/DbContext not disposed (missing 'using'/'await using') —
    the connection is never returned to the pool
  • Long-running transactions holding a connection far longer than the
    actual work requires (e.g. an open transaction waiting on an
    external API call)
  • Pool size too small for actual concurrency (default 100 is often
    too low for a busy microservice under load)
  • Captive dependency: a Singleton holding a Scoped DbContext forever,
    so ONE DbContext instance (and its connection) never cycles</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Diagnosing DB Pool Starvation</div>
  <div class="ref-body">
    <div class="code-box">Symptom: "Timeout expired. The timeout period elapsed prior to
obtaining a connection from the pool." — this error IS the pool
being empty; it's not a network or server issue.

SQL Server:  sys.dm_exec_connections, sys.dm_exec_sessions
             — count active connections per app, compare to pool max

.NET:        System.Data.SqlClient.EventSource / dotnet-counters
             counters: NumberOfActiveConnectionPools,
                       NumberOfActiveConnections, NumberOfPooledConnections

Simple app-side check: log connection open/close pairs with a
correlation id in a canary environment to find what's NOT closing.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Fixing DB Connection Pool Starvation — Code Side</div>
  <div class="ref-body">
    <div class="ans-block"><div class="ans-label">❌ Connection never released</div>
    <div class="code-box">public async Task&lt;Order&gt; GetOrderAsync(int id)
{
    var conn = new SqlConnection(_connStr);
    await conn.OpenAsync();                      // ❌ never closed/disposed
    var cmd = new SqlCommand("SELECT * FROM Orders WHERE Id=@id", conn);
    cmd.Parameters.AddWithValue("@id", id);
    var reader = await cmd.ExecuteReaderAsync();
    // ... if an exception is thrown here, the connection leaks forever
    return MapOrder(reader);
}</div></div>
    <div class="ans-block"><div class="ans-label">✅ Guaranteed release via using, even on exception</div>
    <div class="code-box">public async Task&lt;Order&gt; GetOrderAsync(int id)
{
    await using var conn = new SqlConnection(_connStr);   // ✅ disposed always
    await conn.OpenAsync();
    await using var cmd = new SqlCommand("SELECT * FROM Orders WHERE Id=@id", conn);
    cmd.Parameters.AddWithValue("@id", id);
    await using var reader = await cmd.ExecuteReaderAsync();
    return MapOrder(reader);
}  // connection returned to the pool here, exception or not</div></div>
    <div class="ans-block"><div class="ans-label">✅ EF Core — captive dependency fix (Singleton holding Scoped DbContext)</div>
    <div class="code-box">// ❌ OrderService is Singleton but injects a Scoped DbContext —
// ONE DbContext/connection is captured for the app's entire lifetime,
// never recycled, and is NOT thread-safe under concurrent requests.
builder.Services.AddDbContext&lt;AppDbContext&gt;();
builder.Services.AddSingleton&lt;OrderService&gt;();

// ✅ Fix 1: make OrderService Scoped (matches DbContext's lifetime)
builder.Services.AddScoped&lt;OrderService&gt;();

// ✅ Fix 2: if OrderService genuinely must be Singleton, use a factory
// that creates a FRESH DbContext (and connection) per call instead
builder.Services.AddDbContextFactory&lt;AppDbContext&gt;();
public class OrderService  // now safely Singleton
{
    private readonly IDbContextFactory&lt;AppDbContext&gt; _factory;
    public OrderService(IDbContextFactory&lt;AppDbContext&gt; factory) => _factory = factory;

    public async Task&lt;Order&gt; GetOrderAsync(int id)
    {
        await using var db = await _factory.CreateDbContextAsync();  // fresh connection
        return await db.Orders.FindAsync(id);
    }
}</div></div>
    <div class="ans-block"><div class="ans-label">✅ Keep transactions short — don't hold a connection across an external call</div>
    <div class="code-box">// ❌ Connection/transaction held open while waiting on a slow HTTP call —
// one slow external dependency starves the WHOLE connection pool.
await using var tx = await conn.BeginTransactionAsync();
await UpdateInventoryAsync(conn, tx, orderId);
var shippingResult = await _shippingApiClient.CreateShipmentAsync(orderId); // ❌ slow external call, transaction still open
await tx.CommitAsync();

// ✅ Do the external call FIRST (outside any transaction), then do the
// short local DB transaction with just the data you already have.
var shippingResult = await _shippingApiClient.CreateShipmentAsync(orderId);
await using var tx = await conn.BeginTransactionAsync();
await UpdateInventoryAsync(conn, tx, orderId, shippingResult);
await tx.CommitAsync();   // connection held only for the fast local work</div></div>
    <div class="code-box">Connection string tuning (don't just raise the ceiling blindly):
  Max Pool Size=200;Min Pool Size=10;Connection Timeout=15;
  Max Pool Size   — raise only after confirming leaks are fixed; a bigger
                    pool just delays/hides a leak, doesn't fix it
  Connection Lifetime — recycle long-lived connections periodically,
                    useful behind a load balancer doing failover</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">3. Other Pool-Starvation Scenarios</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:1.2fr 1.6fr 1.6fr;"><div>Scenario</div><div>Root Cause</div><div>Fix</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.6fr;"><div class="dt-name">HttpClient socket exhaustion</div><div>New HttpClient() per request opens a new socket each time; sockets linger in TIME_WAIT and exhaust ephemeral ports under load</div><div>Use IHttpClientFactory (pools and recycles handlers) — never 'new HttpClient()' per request</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.6fr;"><div class="dt-name">SemaphoreSlim permit leak</div><div>Exception thrown between WaitAsync() and Release() — the permit never comes back, pool silently shrinks to zero over time</div><div>Always Release() in a finally block, or wrap in a disposable throttle helper</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.6fr;"><div class="dt-name">Redis / cache connection pool exhaustion</div><div>Creating a new ConnectionMultiplexer per request instead of a shared singleton instance</div><div>ConnectionMultiplexer is expensive and thread-safe — create ONCE, share via DI as a singleton</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.6fr;"><div class="dt-name">Message broker channel/connection starvation</div><div>Opening a new RabbitMQ/Service Bus connection per message instead of reusing a long-lived connection with pooled channels</div><div>Pool connections and channels explicitly; most SDKs provide a connection factory for this</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.6fr;"><div class="dt-name">Kubernetes pod-level thread/connection limits</div><div>Pool sized for a single pod's expected concurrency, but HPA scales pod COUNT, not per-pod pool size — aggregate DB connections across pods can still exceed the DB's max</div><div>Size the DB's total connection ceiling against (max pods × per-pod pool size), or use a connection-pooling proxy (PgBouncer, SQL Server's proxy pooling)</div></div>
    </div>
    <div class="tip-box">✅ Interview line: "Every pool-starvation bug I've debugged reduces to the same question: what guarantees this resource gets returned, even on the exception path? If the answer is 'nothing, we rely on the happy path,' that's the bug — the fix is always a 'using'/'finally' guarantee plus a live metric so the pool's health is visible before users start timing out."</div>
  </div>
</div>
`;
