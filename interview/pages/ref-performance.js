window.Pages['ref-performance'] = `
<div class="page-header">
  <div class="breadcrumb">Deep Dive › <span>Performance Engineering</span></div>
  <h1>⚡ Performance Engineering</h1>
  <p>Profiling · Memory Leaks · Thread Pool · Connection Pool · Cache · Benchmarking</p>
</div>

<div class="ref-section">
  <div class="ref-title">Performance Investigation Methodology</div>
  <div class="ref-body">
    <div class="code-box">Step 1: MEASURE — don't guess. Use data.
  What is the actual bottleneck? CPU? Memory? I/O? Network?

Step 2: PROFILE — find the hot path.
  .NET: dotnet-trace, dotnet-counters, Visual Studio Profiler, PerfView
  CPU profile: which methods consume most CPU?
  Memory profile: what is allocating most? What is leaking?

Step 3: BENCHMARK — measure the fix.
  BenchmarkDotNet: measure before &amp; after change.
  A/B in production: Canary with metrics comparison.

Step 4: VALIDATE — did it actually help in prod?
  Monitor P50/P95/P99 latency, error rate, throughput.

Common bottlenecks by symptom:
  High CPU     → inefficient algorithms, no caching, excessive serialization
  High Memory  → memory leaks, large object heap, caching too much
  High Latency → sync-over-async, sequential where parallel possible, slow DB queries
  Low Throughput → thread pool starvation, connection pool exhaustion, I/O bound</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Memory Leaks — Detection &amp; Common Causes</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Common Memory Leak Sources (.NET)</div>
        <div class="code-box">1. Event handlers not unsubscribed:
   publisher.OnOrderCreated += handler;
   // handler holds reference → publisher keeps subscriber alive
   // Fix: -= handler on dispose or use WeakReference

2. Static collections growing forever:
   static List&lt;string&gt; _log = new();  // never cleared!
   // Fix: bounded size, or clear periodically

3. HttpClient created per request:
   new HttpClient()  // sockets exhausted + memory leak!
   // Fix: IHttpClientFactory (singleton lifetime)

4. IDisposable not disposed:
   var conn = new SqlConnection(cs);
   // not in using() → connection never returned to pool
   // Fix: using var conn = new SqlConnection(cs);

5. Timers / async operations with captures:
   Timer t = new Timer(_ =&gt; DoWork(), state, ...)
   // Fix: use IHostedService, cancel on app shutdown</div>
      </div>
      <div>
        <div class="ans-label">Detection Tools</div>
        <div class="code-box">dotnet-counters monitor --process-id PID
  Shows: GC heap size, allocations/sec,
         Gen 0/1/2 GC frequency

dotnet-dump collect --process-id PID
dotnet-dump analyze dump.dmp
  &gt; gcroot &lt;address&gt;   ← find what holds object alive

Visual Studio Diagnostic Tools:
  Memory Usage tab → heap snapshots
  Compare snapshots to find growing objects

PerfView:
  GC heap allocation tracing
  Find top allocating call stacks
  Memory leak investigation

Application Insights:
  Track custom metrics: process memory over time
  Alert when memory grows without returning</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Thread Pool &amp; Async Patterns</div>
  <div class="ref-body">
    <div class="code-box">Thread Pool Starvation:
  .NET uses thread pool for async continuations.
  If all threads are blocked (sync-over-async), new work queues up.

  Symptom: Requests taking 30s+ despite fast code
           Thread count growing (health endpoint shows &gt;200 threads)

  Cause: async Task but somewhere down the call chain:
         .Result or .Wait() blocks a thread pool thread.

Detection:
  dotnet-counters: "ThreadPool Queue Length" growing
  CPU at 0% but requests timing out = blocked threads</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Parallelism Patterns</div>
        <div class="code-box">// Sequential (slow — waits for each):
foreach (var id in orderIds) {
    await ProcessOrderAsync(id);  // one at a time
}

// Parallel (fast — all at once):
await Task.WhenAll(
    orderIds.Select(id =&gt; ProcessOrderAsync(id)));

// Controlled parallelism (don't overwhelm DB):
var semaphore = new SemaphoreSlim(10); // max 10 concurrent
await Task.WhenAll(orderIds.Select(async id =&gt; {
    await semaphore.WaitAsync();
    try { await ProcessOrderAsync(id); }
    finally { semaphore.Release(); }
}));</div>
      </div>
      <div>
        <div class="ans-label">Connection Pool</div>
        <div class="code-box">SQL Connection Pool (ADO.NET):
  Opening DB connection is expensive (TCP handshake, auth).
  Pool keeps connections open and reuses them.

  Max Pool Size = 100 (default)
  If all 100 in use → new requests WAIT

Exhaustion signs:
  "Connection pool limit reached" error
  P99 latency spikes at high load

Fix:
  Use async/await correctly (don't block threads holding connections)
  Reduce transaction scope (hold connection less time)
  Increase pool size (careful — DB has its own limits)
  Add read replicas to distribute connections</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Caching Strategy — Multi-Level</div>
  <div class="ref-body">
    <div class="code-box">L1: In-Process Cache (IMemoryCache)
  └── Per-instance, sub-microsecond, no network hop
  └── Risk: inconsistent across instances (different cached values)

L2: Distributed Cache (Redis / IDistributedCache)
  └── Shared across all instances, ~1ms latency
  └── Consistent — all instances see same cache

L3: CDN Edge Cache
  └── Global, nearest edge, ~10ms latency
  └── For: static assets, publicly cacheable API responses

L4: Database (ultimate source of truth)
  └── Slowest, correct, persistent</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Cache-Aside (.NET)</div>
        <div class="code-box">public async Task&lt;Product&gt; GetProductAsync(int id) {
    var key = $"product:{id}";

    // L1: in-memory cache
    if (_memCache.TryGetValue(key, out Product cached))
        return cached;

    // L2: Redis
    var json = await _redis.StringGetAsync(key);
    if (json.HasValue) {
        var p = JsonSerializer.Deserialize&lt;Product&gt;(json!);
        _memCache.Set(key, p, TimeSpan.FromMinutes(1));
        return p;
    }

    // L3: Database
    var product = await _db.Products.FindAsync(id);
    var serialized = JsonSerializer.Serialize(product);
    await _redis.StringSetAsync(key, serialized, TimeSpan.FromMinutes(10));
    _memCache.Set(key, product, TimeSpan.FromMinutes(1));
    return product;
}</div>
      </div>
      <div>
        <div class="ans-label">Cache Invalidation Strategies</div>
        <div class="code-box">TTL-based: cache expires automatically.
  Pro: Simple. Con: Stale until expiry.

Event-driven invalidation:
  Product updated → publish ProductUpdated event
  → all cache subscribers delete their key
  Pro: Near-real-time. Con: Complexity.

Write-Through:
  Write to DB + cache simultaneously.
  Pro: Always consistent.
  Con: Higher write latency.

Cache-aside with short TTL:
  TTL = 30 seconds → acceptable stale window
  Simple + effective for most cases.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">BenchmarkDotNet — Measure Before Optimizing</div>
  <div class="ref-body">
    <div class="code-box">[MemoryDiagnoser]
[SimpleJob(RuntimeMoniker.Net80)]
public class StringConcatBenchmark {

    [Params(100, 1000)]
    public int N;

    [Benchmark(Baseline = true)]
    public string StringPlus() {
        var s = "";
        for (int i = 0; i &lt; N; i++) s += i;
        return s;
    }

    [Benchmark]
    public string StringBuilder() {
        var sb = new StringBuilder();
        for (int i = 0; i &lt; N; i++) sb.Append(i);
        return sb.ToString();
    }
}

// Results: N=1000
// Method         | Mean      | Allocated
// StringPlus     | 12,340 ns | 500 KB  ← O(n²) allocations
// StringBuilder  |    450 ns |   2 KB  ← O(n) single allocation</div>
    <div class="tip-box">✅ Never micro-optimize without benchmarks. Measure first. The bottleneck is almost never where you think it is. Start with profiling, then optimize the actual hot path.</div>
  </div>
</div>
`;
