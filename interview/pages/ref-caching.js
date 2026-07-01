window.Pages['ref-caching'] = `
<div class="page-header">
  <div class="breadcrumb">Deep Dive › <span>Caching</span></div>
  <h1>⚡ Caching — Redis &amp; In-Memory</h1>
  <p>IMemoryCache · IDistributedCache · Redis · Cache Patterns · Eviction · Stampede · Cache Aside · Real-World .NET</p>
</div>

<div class="ref-section">
  <div class="ref-title">Caching At a Glance</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Type</div><div>Scope</div><div>Speed</div><div>Persistence</div><div>Shared Across Pods</div><div>Best For</div></div>
      <div class="pt-row"><div class="pt-name">In-Process Memory (IMemoryCache)</div><div>Single server / pod</div><div class="dt-yes">Fastest (~ns)</div><div class="dt-no">No — lost on restart</div><div class="dt-no">No</div><div>Single-instance APIs, small lookup tables, computed results</div></div>
      <div class="pt-row"><div class="pt-name">Distributed Cache (Redis)</div><div>All pods / services</div><div class="dt-yes">Fast (~1ms)</div><div class="dt-yes">Optional (AOF/RDB)</div><div class="dt-yes">Yes</div><div>Session, tokens, shared state, rate limiting, pub/sub</div></div>
      <div class="pt-row"><div class="pt-name">Distributed Cache (SQL Server)</div><div>All pods</div><div class="dt-no">Slow (~10ms)</div><div class="dt-yes">Yes</div><div class="dt-yes">Yes</div><div>Simple distributed cache without Redis infra</div></div>
      <div class="pt-row"><div class="pt-name">CDN / Response Cache</div><div>Edge nodes</div><div class="dt-yes">Fastest (edge)</div><div class="dt-no">TTL only</div><div class="dt-yes">Yes</div><div>Static assets, public API responses, HTML pages</div></div>
      <div class="pt-row"><div class="pt-name">Output Cache (.NET 7+)</div><div>Per server or Redis</div><div class="dt-yes">Very fast</div><div class="dt-no">TTL only</div><div class="dt-yes">With Redis provider</div><div>Full HTTP response caching at middleware level</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">IMemoryCache — In-Process Caching (.NET)</div>
  <div class="ref-body">
    <p><strong>When to use:</strong> Single-pod app or when cache data is per-instance (no need to share). Zero network latency. Ideal for config, reference data, small computed results.</p>
    <div class="two-col">
      <div>
        <div class="ans-label">Registration &amp; Basic Usage</div>
        <div class="code-box">// Program.cs
builder.Services.AddMemoryCache();

// Service
public class ProductService {
    private readonly IMemoryCache _cache;
    private readonly IProductRepo _repo;

    public ProductService(IMemoryCache cache,
                          IProductRepo repo) {
        _cache = cache;
        _repo  = repo;
    }

    public async Task&lt;Product&gt; GetByIdAsync(int id) {
        var key = $"product:{id}";

        // TryGetValue — no async, in-memory
        if (_cache.TryGetValue(key, out Product cached))
            return cached;   // cache HIT

        // cache MISS — load from DB
        var product = await _repo.GetByIdAsync(id);

        var opts = new MemoryCacheEntryOptions()
            .SetAbsoluteExpiration(TimeSpan.FromMinutes(10))
            .SetSlidingExpiration(TimeSpan.FromMinutes(2))
            .SetPriority(CacheItemPriority.Normal)
            .SetSize(1);          // required if size limit set

        _cache.Set(key, product, opts);
        return product;
    }
}</div>
      </div>
      <div>
        <div class="ans-label">GetOrCreateAsync — Cleaner Pattern</div>
        <div class="code-box">// Atomic check-and-set — preferred over
// TryGetValue + Set separately
public async Task&lt;List&lt;Category&gt;&gt; GetCategoriesAsync() {
    return await _cache.GetOrCreateAsync(
        "categories:all",
        async entry => {
            entry.AbsoluteExpirationRelativeToNow
                = TimeSpan.FromHours(1);
            entry.SlidingExpiration
                = TimeSpan.FromMinutes(15);
            entry.RegisterPostEvictionCallback(
                (key, value, reason, state) => {
                    _logger.LogInformation(
                        "Cache evicted: {Key}, reason: {Reason}",
                        key, reason);
                });
            return await _repo.GetAllCategoriesAsync();
        });
}

// Size-limited cache (prevents unbounded growth)
builder.Services.AddMemoryCache(o => {
    o.SizeLimit = 1024;   // 1024 "units" max
    // Each entry must call .SetSize(n)
    // to count against this limit
});</div>

        <div class="ans-label" style="margin-top:12px;">Expiration Types</div>
        <div class="code-box">Absolute Expiration
  → Entry expires at a fixed time.
  → Good for: data that changes on a schedule.
  .SetAbsoluteExpiration(TimeSpan.FromMinutes(10))
  .SetAbsoluteExpiration(DateTimeOffset.UtcNow
                         .AddHours(1))

Sliding Expiration
  → Timer resets each time entry is accessed.
  → Evicted only if NOT accessed for N minutes.
  → Good for: session data, user-specific data.
  .SetSlidingExpiration(TimeSpan.FromMinutes(5))

Both together (recommended)
  → Sliding prevents premature eviction on hot data.
  → Absolute caps total lifetime regardless.
  .SetAbsoluteExpiration(TimeSpan.FromHours(1))
  .SetSlidingExpiration(TimeSpan.FromMinutes(10))
  // Never lives beyond 1 hour, but evicted after
  // 10 min of inactivity within that hour.</div>
      </div>
    </div>

    <div class="ans-label" style="margin-top:14px;">Cache Stampede (Thundering Herd) Problem &amp; Fix</div>
    <div class="two-col" style="margin-top:6px;">
      <div>
        <div class="code-box">// ❌ Problem — cache stampede
// 100 requests arrive simultaneously.
// All find cache MISS at the same moment.
// All 100 hit the DB concurrently → DB overload.

public async Task&lt;Product&gt; GetAsync(int id) {
    if (_cache.TryGetValue(id, out Product p))
        return p;
    // 100 threads reach here at the same time!
    p = await _repo.GetByIdAsync(id); // 100 DB calls
    _cache.Set(id, p, TimeSpan.FromMinutes(10));
    return p;
}</div>
      </div>
      <div>
        <div class="code-box">// ✅ Fix — SemaphoreSlim per key (lock-per-key)
private readonly ConcurrentDictionary&lt;int, SemaphoreSlim&gt;
    _locks = new();

public async Task&lt;Product&gt; GetAsync(int id) {
    if (_cache.TryGetValue(id, out Product p))
        return p;  // fast path — no lock

    var sem = _locks.GetOrAdd(id, _ => new SemaphoreSlim(1,1));
    await sem.WaitAsync();
    try {
        // Double-check after acquiring lock
        if (_cache.TryGetValue(id, out p)) return p;

        p = await _repo.GetByIdAsync(id); // only 1 DB call
        _cache.Set(id, p, TimeSpan.FromMinutes(10));
        return p;
    } finally {
        sem.Release();
        _locks.TryRemove(id, out _);
    }
}</div>
      </div>
    </div>
    <div class="warn-box">⚠️ IMemoryCache is NOT shared across pods. In a load-balanced deployment with 3 pods, each pod has its own cache — cache miss on one pod may be a hit on another. Use Redis for shared caching.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Redis — Distributed Caching (.NET)</div>
  <div class="ref-body">
    <p><strong>When to use:</strong> Multiple pods / services need to share cache. Session state, rate limiting, distributed locks, pub/sub messaging, leaderboards.</p>
    <div class="two-col">
      <div>
        <div class="ans-label">Setup — StackExchange.Redis + IDistributedCache</div>
        <div class="code-box">// Install: dotnet add package
//   Microsoft.Extensions.Caching.StackExchangeRedis

// Program.cs
builder.Services.AddStackExchangeRedisCache(o => {
    o.Configuration =
        builder.Configuration["Redis:ConnectionString"];
    // "myredis.redis.cache.windows.net:6380,
    //  password=xxx,ssl=True,abortConnect=False"
    o.InstanceName = "myapp:";  // key prefix
});

// IDistributedCache — simple byte[]/string API
public class SessionService {
    private readonly IDistributedCache _cache;

    public async Task SetUserSessionAsync(
        string userId, UserSession session) {
        var json = JsonSerializer.Serialize(session);
        var opts = new DistributedCacheEntryOptions {
            AbsoluteExpirationRelativeToNow
                = TimeSpan.FromHours(2),
            SlidingExpiration
                = TimeSpan.FromMinutes(30)
        };
        await _cache.SetStringAsync(
            $"session:{userId}", json, opts);
    }

    public async Task&lt;UserSession?&gt; GetUserSessionAsync(
        string userId) {
        var json = await _cache.GetStringAsync(
            $"session:{userId}");
        return json is null ? null
            : JsonSerializer.Deserialize&lt;UserSession&gt;(json);
    }

    public async Task RemoveAsync(string userId)
        => await _cache.RemoveAsync($"session:{userId}");
}</div>
      </div>
      <div>
        <div class="ans-label">StackExchange.Redis — Direct Client (Full Power)</div>
        <div class="code-box">// Program.cs — register ConnectionMultiplexer
builder.Services.AddSingleton&lt;IConnectionMultiplexer&gt;(
    ConnectionMultiplexer.Connect(
        builder.Configuration["Redis:ConnectionString"]));

// Service — use IDatabase directly
public class RateLimiterService {
    private readonly IDatabase _db;

    public RateLimiterService(
        IConnectionMultiplexer redis) {
        _db = redis.GetDatabase();
    }

    // Sliding window rate limit via Redis INCR + EXPIRE
    public async Task&lt;bool&gt; IsAllowedAsync(
        string clientId, int maxRequests, int windowSecs) {
        var key = $"ratelimit:{clientId}";
        var count = await _db.StringIncrementAsync(key);
        if (count == 1)
            await _db.KeyExpireAsync(key,
                TimeSpan.FromSeconds(windowSecs));
        return count &lt;= maxRequests;
    }
}

// Redis Hash — store user profile fields individually
await _db.HashSetAsync($"user:{userId}", new HashEntry[] {
    new("name",  "Mahesh"),
    new("email", "m@example.com"),
    new("role",  "Admin")
});
var name = await _db.HashGetAsync($"user:{userId}", "name");

// Redis Sorted Set — leaderboard
await _db.SortedSetAddAsync("leaderboard",
    "player:mahesh", 9500);
var top10 = await _db.SortedSetRangeByRankWithScoresAsync(
    "leaderboard", 0, 9, Order.Descending);</div>
      </div>
    </div>

    <div class="ans-label" style="margin-top:14px;">Cache-Aside Pattern (most common)</div>
    <div class="two-col" style="margin-top:6px;">
      <div>
        <div class="code-box">// Cache-Aside = application owns cache logic.
// DB is source of truth. Cache is a read-through layer.

public async Task&lt;Order?&gt; GetOrderAsync(Guid orderId) {
    var key = $"order:{orderId}";

    // 1. Check cache
    var cached = await _cache.GetStringAsync(key);
    if (cached != null)
        return JsonSerializer.Deserialize&lt;Order&gt;(cached);

    // 2. Cache MISS → load from DB
    var order = await _orderRepo.GetByIdAsync(orderId);
    if (order == null) return null;

    // 3. Populate cache
    await _cache.SetStringAsync(key,
        JsonSerializer.Serialize(order),
        new DistributedCacheEntryOptions {
            AbsoluteExpirationRelativeToNow
                = TimeSpan.FromMinutes(15)
        });
    return order;
}

// On write — invalidate cache (write-invalidate)
public async Task UpdateOrderAsync(Order order) {
    await _orderRepo.UpdateAsync(order);
    await _cache.RemoveAsync($"order:{order.Id}");
    // Next read will re-populate from DB
}</div>
      </div>
      <div>
        <div class="ans-label">Cache Write Strategies</div>
        <div class="code-box">Write-Invalidate (most common)
  → On update: DELETE cache entry.
  → Next read → miss → load from DB → re-cache.
  ✅ Simple. No stale data risk.
  ⚠️ First read after update is slower (miss).

Write-Through
  → On update: update DB AND cache simultaneously.
  ✅ Cache always consistent with DB.
  ⚠️ Write is slower (two operations).
  ⚠️ Cache fills with data that may never be read.

Write-Behind (Write-Back)
  → Write to cache immediately.
  → Async flush to DB in background.
  ✅ Fastest writes.
  ⚠️ Risk of data loss if cache crashes before flush.
  ⚠️ Complex. Use only for high-write, loss-tolerant data.

Read-Through
  → Cache itself fetches from DB on miss.
  → App always reads from cache only.
  → Cache provider handles miss logic.
  ✅ Simple app code.
  Used by: NCache, Redis with RedisGears

Rule of thumb for most apps:
  Reads:  Cache-Aside (lazy loading)
  Writes: Write-Invalidate ✅</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Redis Data Structures — Beyond Simple Key-Value</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Structure</div><div>Use Case</div><div>Key Commands</div><div>Real Example</div></div>
      <div class="pt-row"><div class="pt-name">String</div><div>Simple values, counters, serialized JSON</div><div>GET, SET, INCR, EXPIRE, SETNX</div><div>Cache user profile JSON, hit counter, rate limit counter</div></div>
      <div class="pt-row"><div class="pt-name">Hash</div><div>Object with multiple fields — partial update</div><div>HGET, HSET, HMGET, HDEL</div><div>User session with name/email/role — update one field without re-serializing whole object</div></div>
      <div class="pt-row"><div class="pt-name">List</div><div>Ordered queue / recent items</div><div>LPUSH, RPOP, LRANGE, LTRIM</div><div>Recent activity feed, job queue, notification inbox (last 50)</div></div>
      <div class="pt-row"><div class="pt-name">Set</div><div>Unique membership, tag index</div><div>SADD, SISMEMBER, SMEMBERS, SINTER</div><div>Users online, product tags, "who liked this post"</div></div>
      <div class="pt-row"><div class="pt-name">Sorted Set</div><div>Ranked data with scores</div><div>ZADD, ZRANGE, ZRANK, ZREVRANGE</div><div>Leaderboard, priority queue, time-series events ordered by timestamp</div></div>
      <div class="pt-row"><div class="pt-name">Pub/Sub</div><div>Real-time event broadcasting</div><div>PUBLISH, SUBSCRIBE, PSUBSCRIBE</div><div>Chat messages, live dashboard updates, SignalR backplane</div></div>
      <div class="pt-row"><div class="pt-name">Stream</div><div>Persistent event log (like Kafka-lite)</div><div>XADD, XREAD, XGROUP, XACK</div><div>Order events, audit log with consumer groups</div></div>
    </div>

    <div class="ans-label" style="margin-top:14px;">Distributed Lock with Redis (Redlock pattern)</div>
    <div class="two-col" style="margin-top:6px;">
      <div>
        <div class="code-box">// ❌ Problem: two pods process same order simultaneously
// Both check DB → both see "Pending" → both charge card!

// ✅ Fix: Redis distributed lock
public async Task ProcessOrderAsync(Guid orderId) {
    var lockKey   = $"lock:order:{orderId}";
    var lockValue = Guid.NewGuid().ToString(); // unique owner
    var lockTtl   = TimeSpan.FromSeconds(30);

    // SETNX — set only if NOT exists (atomic)
    bool acquired = await _db.StringSetAsync(
        lockKey, lockValue, lockTtl,
        When.NotExists);  // NX flag

    if (!acquired) {
        // Another pod holds the lock — skip or retry
        _logger.LogWarning("Order {Id} already being processed",
            orderId);
        return;
    }
    try {
        await DoProcessOrderAsync(orderId);
    } finally {
        // Release lock ONLY if we own it (Lua script — atomic)
        var script = @"
            if redis.call('GET', KEYS[1]) == ARGV[1] then
                return redis.call('DEL', KEYS[1])
            else return 0 end";
        await _db.ScriptEvaluateAsync(script,
            new RedisKey[]   { lockKey },
            new RedisValue[] { lockValue });
    }
}</div>
      </div>
      <div>
        <div class="ans-label">NuGet: RedLock.net (easier)</div>
        <div class="code-box">// Install: dotnet add package RedLock.net

var multiplexers = new List&lt;RedLockMultiplexer&gt; {
    new(ConnectionMultiplexer.Connect("redis1:6379")),
    new(ConnectionMultiplexer.Connect("redis2:6379")),
    new(ConnectionMultiplexer.Connect("redis3:6379")),
};
using var factory = await RedLockFactory
    .CreateAsync(multiplexers);

var resource  = $"lock:order:{orderId}";
var expiry    = TimeSpan.FromSeconds(30);
var wait      = TimeSpan.FromSeconds(10);
var retry     = TimeSpan.FromMilliseconds(500);

await using var redLock = await factory
    .CreateLockAsync(resource, expiry, wait, retry);

if (redLock.IsAcquired) {
    await DoProcessOrderAsync(orderId);
}
// Lock auto-released on dispose ✅

// Redlock acquires lock on majority of N Redis nodes.
// Survives single node failure.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Redis on Azure — Azure Cache for Redis</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Tiers &amp; When to Use</div>
        <div class="code-box">Basic (C0–C6)
  → Single node, no SLA, no replica.
  → Dev/test only. ❌ Production.

Standard (C0–C6)
  → Primary + replica, failover SLA 99.9%.
  → Small-medium production workloads. ✅

Premium (P1–P5)
  → VNet injection, Redis Cluster, geo-replication,
     persistence (RDB/AOF), up to 120 GB.
  → High-traffic production. ✅

Enterprise / Enterprise Flash
  → Redis Stack (RediSearch, RedisJSON, RedisBloom).
  → Active-active geo-replication.
  → Enterprise compliance. ✅

Connection string format:
  {name}.redis.cache.windows.net:6380,
  password={key},ssl=True,abortConnect=False</div>
      </div>
      <div>
        <div class="ans-label">Azure Redis Best Practices</div>
        <div class="code-box">✅ Always use SSL (port 6380, not 6379)
✅ Use connection pooling — reuse IConnectionMultiplexer
   as Singleton (expensive to create)
✅ Set maxmemory-policy to match your use case:
   allkeys-lru   → general cache (evict LRU key)
   volatile-lru  → only evict keys with TTL set
   noeviction    → throw errors when full (sessions)

✅ Use async APIs exclusively — never block on Redis
✅ Set AbsoluteExpiration on ALL keys — prevent leaks
✅ Use InstanceName prefix to namespace keys
   (avoid collision between services on same Redis)
✅ Monitor: Cache Hits, Cache Misses, Connected Clients,
   Used Memory — via Azure Monitor

⚠️ Avoid storing large objects (&gt;100KB per key)
   → Serialize + compress: GZip before SET
⚠️ Avoid KEYS * command in production — O(n), blocks Redis
   Use SCAN instead
⚠️ Don't use Redis as primary DB — it's a cache.
   Always have a source-of-truth DB behind it.</div>
      </div>
    </div>

    <div class="ans-label" style="margin-top:14px;">SignalR Backplane — Redis Pub/Sub for Scale-Out</div>
    <div class="code-box">// Problem: 3 pods, user A connected to pod 1,
//          user B connected to pod 3.
//          Pod 1 sends message to user B → B never gets it!

// Solution: Redis backplane — all pods subscribe to Redis channel.
//           Message published to Redis → all pods receive → correct pod delivers.

// Program.cs
builder.Services.AddSignalR()
    .AddStackExchangeRedis(
        builder.Configuration["Redis:ConnectionString"],
        o => { o.Configuration.ChannelPrefix = "myapp"; });

// That's it — SignalR handles the rest.
// Now all Hubs across all pods share the same message bus. ✅</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Cache Eviction Policies</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Policy</div><div>Evicts</div><div>Best For</div></div>
      <div class="pt-row"><div class="pt-name">allkeys-lru</div><div>Least Recently Used key (any key)</div><div>General-purpose cache — most common choice ✅</div></div>
      <div class="pt-row"><div class="pt-name">volatile-lru</div><div>LRU key that has a TTL set</div><div>Mixed use — some permanent keys (config) + expiring cache keys</div></div>
      <div class="pt-row"><div class="pt-name">allkeys-lfu</div><div>Least Frequently Used key (any key)</div><div>Skewed access patterns — popular items should survive</div></div>
      <div class="pt-row"><div class="pt-name">volatile-ttl</div><div>Key with shortest TTL remaining</div><div>When you want shortest-lived keys evicted first</div></div>
      <div class="pt-row"><div class="pt-name">allkeys-random</div><div>Random key</div><div>Uniform access distribution — rare in practice</div></div>
      <div class="pt-row"><div class="pt-name">noeviction</div><div>Nothing — returns error when full</div><div>Session store where data loss is unacceptable</div></div>
    </div>
    <div class="tip-box" style="margin-top:10px;">✅ Default Redis policy is <strong>noeviction</strong>. Always set <strong>allkeys-lru</strong> for a cache. Set <strong>noeviction</strong> only for a session store where you'd rather fail than lose data.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Output Cache — Full HTTP Response Caching (.NET 7+)</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Setup &amp; Usage</div>
        <div class="code-box">// Program.cs
builder.Services.AddOutputCache(o => {
    // Default policy for all endpoints
    o.AddBasePolicy(b => b.Expire(TimeSpan.FromSeconds(60)));

    // Named policy for product pages
    o.AddPolicy("products", b => b
        .Expire(TimeSpan.FromMinutes(5))
        .SetVaryByQuery("category", "page")
        .Tag("products"));   // tag for targeted invalidation
});

// Use Redis as output cache store (shared across pods)
builder.Services.AddStackExchangeRedisOutputCache(o => {
    o.Configuration =
        builder.Configuration["Redis:ConnectionString"];
});

app.UseOutputCache();

// Controller — apply named policy
[HttpGet("products")]
[OutputCache(PolicyName = "products")]
public async Task&lt;IActionResult&gt; GetProducts(
    [FromQuery] string category,
    [FromQuery] int page) {
    return Ok(await _productService.GetAsync(category, page));
}

// Minimal API
app.MapGet("/products", GetProducts)
   .CacheOutput("products");</div>
      </div>
      <div>
        <div class="ans-label">Tag-Based Invalidation</div>
        <div class="code-box">// Invalidate ALL cached responses tagged "products"
// when a product is updated — no need to know exact URL.

public class ProductService {
    private readonly IOutputCacheStore _cacheStore;

    public async Task UpdateProductAsync(Product p) {
        await _repo.UpdateAsync(p);

        // Bust all responses tagged "products"
        await _cacheStore.EvictByTagAsync(
            "products", CancellationToken.None);
    }
}

// Vary-by examples
o.AddPolicy("user-specific", b => b
    .Expire(TimeSpan.FromMinutes(1))
    .SetVaryByHeader("Authorization")  // per user
    .SetVaryByQuery("page", "sort"));  // per query params

o.AddPolicy("no-cache", b => b
    .NoCache());   // always bypass for this endpoint</div>

        <div class="ans-label" style="margin-top:12px;">Output Cache vs Response Cache</div>
        <div class="code-box">ResponseCache (older)
  → Sets HTTP Cache-Control headers only.
  → Browser / CDN caches the response.
  → Server does NOT cache — still runs handler.
  → No server-side invalidation possible.
  [ResponseCache(Duration = 60)]

OutputCache (new, .NET 7+)
  → Server-side cache — handler NOT called on hit.
  → Works with Redis for distributed caching.
  → Tag-based invalidation ✅
  → Varies by query, header, route, custom ✅
  → Recommended over ResponseCache for APIs ✅</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Hybrid Cache (.NET 9) — L1 + L2 Unified</div>
  <div class="ref-body">
    <p><strong>Problem solved:</strong> Using IMemoryCache (L1) + Redis (L2) separately requires duplicated logic, stampede protection, and serialization in every service. HybridCache unifies both behind one API.</p>
    <div class="two-col">
      <div>
        <div class="ans-label">Setup &amp; Usage</div>
        <div class="code-box">// Program.cs (.NET 9)
builder.Services.AddHybridCache(o => {
    o.MaximumPayloadBytes    = 1024 * 1024; // 1 MB max
    o.MaximumKeyLength       = 512;
    o.DefaultEntryOptions = new HybridCacheEntryOptions {
        Expiration         = TimeSpan.FromMinutes(5), // L2 Redis
        LocalCacheExpiration = TimeSpan.FromSeconds(30) // L1 memory
    };
});
// Add Redis as L2 backing store
builder.Services.AddStackExchangeRedisCache(o => {
    o.Configuration =
        builder.Configuration["Redis:ConnectionString"];
});

// Service — single GetOrCreateAsync call
public class ProductService {
    private readonly HybridCache _cache;

    public async Task&lt;Product&gt; GetByIdAsync(
        int id, CancellationToken ct = default) {

        return await _cache.GetOrCreateAsync(
            $"product:{id}",           // cache key
            async cancel =>
                await _repo.GetByIdAsync(id, cancel),
            cancellationToken: ct
        );
        // L1 hit  → returns instantly from memory (~ns)
        // L1 miss → checks L2 Redis (~1ms)
        // L2 miss → calls factory (DB), stores in both
        // Stampede protection built-in ✅
    }

    public async Task InvalidateAsync(int id) {
        await _cache.RemoveAsync($"product:{id}");
        // Removes from both L1 and L2 ✅
    }
}</div>
      </div>
      <div>
        <div class="ans-label">HybridCache vs Manual L1+L2</div>
        <div class="code-box">Manual L1 (IMemoryCache) + L2 (IDistributedCache):
  → Check L1 → miss → check L2 → miss → DB
  → Serialize/deserialize manually
  → Stampede protection: implement yourself
  → Invalidation: remove from both separately
  → Error handling: implement yourself
  → ~50 lines of boilerplate per cache call

HybridCache (one call):
  → All of the above handled internally ✅
  → Built-in stampede protection ✅
  → Tag-based invalidation ✅
  → Configurable serialization (System.Text.Json default)
  → Graceful fallback if Redis is down (L1 only)

Migration path:
  // Old code
  if (!_memCache.TryGetValue(key, out T val)) {
      var bytes = await _distCache.GetAsync(key);
      if (bytes != null) { val = Deserialize(bytes); }
      else {
          val = await factory();
          await _distCache.SetAsync(key, Serialize(val));
      }
      _memCache.Set(key, val, TimeSpan.FromSeconds(30));
  }
  return val;

  // New code (.NET 9)
  return await _hybridCache
      .GetOrCreateAsync(key, _ => factory());</div>
        <div class="tip-box" style="margin-top:8px;">✅ HybridCache is the recommended approach in .NET 9+. Use it for all new services that need both local speed and distributed consistency.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Common Cache Pitfalls &amp; Fixes</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Problem</div><div>Symptom</div><div>Fix</div></div>
      <div class="pt-row"><div class="pt-name">Cache Stampede</div><div>DB spike whenever popular cache entry expires</div><div>Lock-per-key (SemaphoreSlim), staggered TTLs, HybridCache stampede protection, probabilistic early expiry</div></div>
      <div class="pt-row"><div class="pt-name">Stale Data</div><div>Users see outdated info after update</div><div>Write-invalidate on update; event-driven invalidation via domain events; shorter TTL on frequently changing data</div></div>
      <div class="pt-row"><div class="pt-name">Cache Penetration</div><div>Queries for non-existent keys always miss cache, hammer DB</div><div>Cache null results with short TTL (1–2 min); use Bloom Filter (Redis RedisBloom) to reject known-missing keys before DB call</div></div>
      <div class="pt-row"><div class="pt-name">Cache Avalanche</div><div>Many cache entries expire at same moment → DB flooded</div><div>Jitter TTL: base + random(0, 30s). Prevents synchronized expiry. Pre-warm cache on deployment.</div></div>
      <div class="pt-row"><div class="pt-name">Memory Leak (IMemoryCache)</div><div>Pod RAM grows unbounded over time</div><div>Always set expiration; set SizeLimit + SetSize on entries; monitor cache count; use eviction callbacks to track</div></div>
      <div class="pt-row"><div class="pt-name">Over-caching</div><div>Users see wrong data; hard to debug</div><div>Only cache read-heavy, rarely-changing data. Never cache user-specific write paths. Invalidate aggressively on writes.</div></div>
      <div class="pt-row"><div class="pt-name">Serialization Mismatch</div><div>Cached JSON fails to deserialize after code deploy</div><div>Version cache keys on model changes: "product:v2:{id}". Or flush Redis on deploy.</div></div>
    </div>

    <div class="ans-label" style="margin-top:14px;">TTL Jitter — Preventing Cache Avalanche</div>
    <div class="code-box">// ❌ All product entries expire at exactly the same time
_cache.Set($"product:{id}", product, TimeSpan.FromMinutes(10));
// 10,000 products → all expire at T+10min → 10,000 DB hits simultaneously

// ✅ Jitter: spread expiry over a window
static readonly Random _rng = Random.Shared;

TimeSpan JitteredTtl(TimeSpan baseTtl, double jitterFraction = 0.2) {
    var jitter = baseTtl * jitterFraction * _rng.NextDouble();
    return baseTtl + jitter;  // baseTtl to baseTtl * 1.2
}

_cache.Set($"product:{id}", product,
    JitteredTtl(TimeSpan.FromMinutes(10)));
// Products now expire between 10:00 and 12:00 → load spread ✅</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Interview Summary — Architect-Level Answer</div>
  <div class="ref-body">
    <div class="code-box">Q: How do you approach caching in a distributed .NET system?

A: I use a layered caching strategy:

   L1 — IMemoryCache (in-process):
     → Hot reference data: product categories, config, lookup tables.
     → Sub-millisecond access. Short TTL (1–5 min) to stay fresh.
     → Not shared across pods — fine for read-only reference data.

   L2 — Redis (distributed):
     → Session state, user tokens, rate limiting, shared computed results.
     → Shared across all pods. TTL 15–60 min depending on data volatility.
     → Cache-Aside pattern: check cache → miss → load DB → populate cache.
     → Write-Invalidate on updates: remove cache key when DB record changes.

   L1+L2 combined — HybridCache (.NET 9):
     → Single API, built-in stampede protection, tag invalidation.
     → Use for all new services on .NET 9+.

   Output Cache:
     → Full HTTP response caching for public read-heavy endpoints.
     → Tag-based invalidation when underlying data changes.
     → Redis-backed for scale-out.

   Key design rules I follow:
     ✅ Always set expiration — no indefinite cache entries.
     ✅ Add jitter to TTLs — prevent cache avalanche.
     ✅ Cache null results — prevent cache penetration.
     ✅ IConnectionMultiplexer as Singleton — expensive to create.
     ✅ Never cache user-specific write paths.
     ✅ Version cache keys on model breaking changes.
     ✅ Monitor hit rate — below 80% means caching strategy needs review.</div>
  </div>
</div>
`;
