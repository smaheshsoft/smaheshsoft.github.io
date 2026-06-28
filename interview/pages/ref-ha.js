window.Pages['ref-ha'] = `
<div class="page-header">
  <div class="breadcrumb">Deep Dive › <span>High Availability</span></div>
  <h1>🔄 High Availability &amp; Resilience Patterns</h1>
  <p>Circuit Breaker · Retry · Bulkhead · Timeout · Fallback · Zero-Downtime Deploy · Health Checks</p>
</div>

<div class="ref-section">
  <div class="ref-title">Resilience Patterns — The Full Picture (Polly)</div>
  <div class="ref-body">
    <div class="code-box">// Polly v8 Resilience Pipeline (.NET 8)
var pipeline = new ResiliencePipelineBuilder&lt;HttpResponseMessage&gt;()
    .AddTimeout(TimeSpan.FromSeconds(10))           // 1. Timeout
    .AddRetry(new RetryStrategyOptions&lt;HttpResponseMessage&gt; {
        MaxRetryAttempts = 3,
        Delay = TimeSpan.FromSeconds(1),
        BackoffType = DelayBackoffType.Exponential,  // 2. Retry with backoff
        UseJitter = true                             //    + jitter to avoid thundering herd
    })
    .AddCircuitBreaker(new CircuitBreakerStrategyOptions&lt;HttpResponseMessage&gt; {
        FailureRatio = 0.5,          // 3. Circuit Breaker
        SamplingDuration = TimeSpan.FromSeconds(10),
        MinimumThroughput = 5,
        BreakDuration = TimeSpan.FromSeconds(30)
    })
    .AddFallback(new FallbackStrategyOptions&lt;HttpResponseMessage&gt; {
        FallbackAction = _ =&gt; Outcome.FromResultAsValueTask(cachedResponse) // 4. Fallback
    })
    .Build();</div>
    <div class="warn-box">⚠️ Order matters! Timeout wraps Retry (timeout = total time). Retry wraps Circuit Breaker (retry only if circuit closed). Circuit Breaker wraps Fallback.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Circuit Breaker — Deep Dive</div>
  <div class="ref-body">
    <div class="code-box">Why: Without circuit breaker, a slow/failing downstream causes:
  - All threads blocked waiting for timeouts
  - Memory buildup (queued requests)
  - Cascading failure — your service becomes slow too

States:
┌──────────────────────────────────────────────────────────┐
│  Closed (normal)                                          │
│   → All requests pass through                            │
│   → Track failure rate                                    │
│   → 5 failures in 10s → OPEN                            │
├──────────────────────────────────────────────────────────┤
│  Open (tripped)                                           │
│   → ALL requests FAST-FAIL immediately (no network call) │
│   → Returns error/fallback immediately                   │
│   → After 30s cooldown → HALF-OPEN                      │
├──────────────────────────────────────────────────────────┤
│  Half-Open (probing)                                      │
│   → Allow 1 test request through                        │
│   → Success → back to CLOSED                            │
│   → Failure → back to OPEN (another 30s)                │
└──────────────────────────────────────────────────────────┘</div>
    <div class="tip-box">✅ Circuit Breaker protects YOU from a failing downstream. It prevents your service from wasting threads on a service that is already down.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Retry Patterns</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Exponential Backoff + Jitter</div>
        <div class="code-box">Attempt 1: wait 1s
Attempt 2: wait 2s
Attempt 3: wait 4s
Attempt 4: wait 8s (max)

+ Jitter: add random offset to backoff
  Prevents thundering herd:
  1000 clients all retrying at exactly 2s
  → simultaneous burst → same failure again

  With jitter: retry at 1.8s, 2.1s, 1.9s, ...
  → spread out → downstream recovers

// Polly UseJitter = true  ← handles this automatically</div>
      </div>
      <div>
        <div class="ans-label">What to Retry vs Not</div>
        <div class="code-box">✅ Retry on:
  503 Service Unavailable (transient)
  504 Gateway Timeout
  429 Too Many Requests (with Retry-After header)
  Network timeout
  Transient DB connection errors

❌ Do NOT retry on:
  400 Bad Request (won't succeed — bad data)
  401 Unauthorized (won't succeed — need re-auth)
  404 Not Found (resource doesn't exist)
  409 Conflict (business logic error)
  Non-idempotent operations (POST payments!)
  → Retry payment = double charge!</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Bulkhead Pattern</div>
  <div class="ref-body">
    <div class="code-box">Problem: Service A calls both Service B (fast) and Service C (slow/failing).
         Slow C fills all 100 thread pool threads.
         Now B calls also queue up waiting for threads.
         Entire app stops responding — even for fast operations!

Solution (Bulkhead = ship compartment analogy):
  Isolate resources per downstream:
    Service B: max 20 concurrent calls, queue 10
    Service C: max 20 concurrent calls, queue 10
    Remaining 60 threads for other work

  If C is overwhelmed → only C's bulkhead fills
  → B calls still have their own 20 threads
  → App continues serving B requests</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Kubernetes Bulkhead</div>
        <div class="code-box">Resource limits per container:
resources:
  requests:
    cpu: "250m"
    memory: "256Mi"
  limits:
    cpu: "500m"
    memory: "512Mi"

One noisy pod cannot consume all node CPU/memory.
OOM Killer: container killed if exceeds memory limit.
CPU throttled: container throttled if exceeds limit.</div>
      </div>
      <div>
        <div class="ans-label">Rate Limiting (.NET 8)</div>
        <div class="code-box">// Per-client rate limiting
builder.Services.AddRateLimiter(o =&gt; {
    o.AddFixedWindowLimiter("api", opts =&gt; {
        opts.PermitLimit = 100;          // 100 requests
        opts.Window = TimeSpan.FromMinutes(1); // per minute
        opts.QueueLimit = 10;            // queue 10 overflow
    });
    o.RejectionStatusCode = 429; // Too Many Requests
});

app.UseRateLimiter();
app.MapControllers().RequireRateLimiting("api");</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Zero-Downtime Deployment Strategies</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Strategy</div><div>Downtime</div><div>Rollback</div><div>DB Migrations</div><div>Cost</div></div>
      <div class="pt-row"><div class="pt-name">Recreate</div><div class="dt-no">Yes (redeploy gap)</div><div>Redeploy old version</div><div>Simple — stop → migrate → start</div><div>Lowest</div></div>
      <div class="pt-row"><div class="pt-name">Rolling Update</div><div class="dt-yes">None</div><div>Roll back deployment</div><div>Must be backward-compatible (old pods still running)</div><div>Low</div></div>
      <div class="pt-row"><div class="pt-name">Blue-Green</div><div class="dt-yes">None</div><div class="dt-yes">Instant (flip LB back)</div><div>Green runs migration; blue still on old DB schema</div><div>2x infra</div></div>
      <div class="pt-row"><div class="pt-name">Canary</div><div class="dt-yes">None</div><div class="dt-yes">Instant (reroute)</div><div>Expand/contract: additive migration first</div><div>Low extra</div></div>
    </div>
    <div class="ans-label" style="margin-top:14px;">DB Migration Strategy for Zero-Downtime</div>
    <div class="code-box">Expand/Contract Pattern (backward-compatible migrations):

Phase 1 — Expand (safe):
  Add new column (nullable or with default)
  Deploy new code that writes to BOTH old + new columns
  Both old and new code versions work

Phase 2 — Migrate:
  Background job fills new column from old column
  Verify data

Phase 3 — Contract (cleanup):
  Remove old column usage from code
  Deploy
  Drop old column in next migration</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Health Checks in Production</div>
  <div class="ref-body">
    <div class="code-box">// ASP.NET Core Health Checks
builder.Services.AddHealthChecks()
    .AddCheck("self", () =&gt; HealthCheckResult.Healthy())
    .AddSqlServer(connStr, name: "database")
    .AddRedis(redisConn, name: "cache")
    .AddKafka(kafkaConfig, name: "kafka");

app.MapHealthChecks("/health/live",   // Liveness: is app alive?
    new HealthCheckOptions { Predicate = r =&gt; r.Name == "self" });

app.MapHealthChecks("/health/ready",  // Readiness: can serve traffic?
    new HealthCheckOptions { /* includes DB, Redis, Kafka */ });</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">K8s Probe Mapping</div>
        <ul>
          <li><strong>livenessProbe</strong> → /health/live — checks if app should be restarted</li>
          <li><strong>readinessProbe</strong> → /health/ready — checks if app should receive traffic</li>
          <li><strong>startupProbe</strong> → /health/live — for slow-starting apps, delays liveness checks</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Circuit Breaker in Health Check</div>
        <div class="code-box">// Report degraded if circuit is open
.AddCheck("downstream-service",
    () =&gt; _circuitBreaker.State == CircuitState.Open
        ? HealthCheckResult.Degraded("Circuit open")
        : HealthCheckResult.Healthy());

// Degraded = readiness returns 200 (still receives traffic)
// Unhealthy = readiness returns 503 (removed from LB)</div>
      </div>
    </div>
  </div>
</div>
`;
