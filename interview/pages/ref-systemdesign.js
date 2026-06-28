window.Pages['ref-systemdesign'] = `
<div class="page-header">
  <div class="breadcrumb">Architect Reference › <span>System Design</span></div>
  <h1>🏛️ System Design Principles</h1>
  <p>Scalability · High Availability · URL Shortener · Order System · Dashboard · Architect Thinking Framework</p>
</div>

<div class="ref-section">
  <div class="ref-title">Architect Thinking Framework — How to Approach Any System Design</div>
  <div class="ref-body">
    <div class="code-box">Step 1: CLARIFY REQUIREMENTS
  Functional:    What does the system do?
  Non-Functional: Scale? Latency? Availability? Consistency?
  Constraints:   Budget? Team size? Timeline? On-prem or cloud?

Step 2: ESTIMATE SCALE
  Users:      100 users? 1M users? 1B requests/day?
  Data:       How much data stored? Read/write ratio?
  Traffic:    Peak QPS? Burst patterns?

Step 3: HIGH-LEVEL DESIGN
  Draw the major components and data flow.
  Don't go deep yet — boxes and arrows first.

Step 4: DEEP DIVE COMPONENTS
  Pick the hardest/most interesting parts.
  Database choice. Caching strategy. Scaling approach.

Step 5: IDENTIFY BOTTLENECKS
  Single points of failure? Hot spots? What breaks at scale?

Step 6: TRADE-OFFS
  Always present options with pros/cons.
  "We could do X or Y. I'd recommend X because..."</div>
    <div class="tip-box" style="margin-top:10px;">✅ Interviewers reward structured thinking over perfect answers. Walk them through your reasoning out loud.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Scalability Patterns — Architect Toolkit</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Vertical Scaling (Scale Up)</div>
        <div class="code-box">Add more CPU/RAM to existing server.
VM: 4 CPU → 16 CPU → 64 CPU

Pros: Simple, no app changes
Cons: Hardware limit, single point of failure,
      expensive, downtime for resize</div>
        <div class="ans-label" style="margin-top:12px;">Horizontal Scaling (Scale Out)</div>
        <div class="code-box">Add more instances behind a load balancer.
1 server → 10 servers → 100 servers

Pros: Unlimited scale, fault tolerant
Cons: App must be stateless,
      session management complexity</div>
      </div>
      <div>
        <div class="ans-label">Caching Strategy (CDN + Redis)</div>
        <div class="code-box">Request flow with caching:

Client
  ↓ (static assets)
CDN (edge cache) ← 90% hit rate
  ↓ (cache miss)
Load Balancer
  ↓
App Server
  ↓ (hot data)
Redis Cache ← 80% hit rate
  ↓ (cache miss)
Database

Cache-Aside pattern:
  1. Check Redis
  2. If miss → query DB
  3. Store in Redis (TTL = 5min)
  4. Return result</div>
      </div>
    </div>
    <div class="pattern-table" style="margin-top:14px;">
      <div class="pt-row pt-header"><div>Technique</div><div>What it Does</div><div>Use When</div></div>
      <div class="pt-row"><div class="pt-name">Load Balancer</div><div>Distributes requests across instances</div><div>Always — multiple app instances</div></div>
      <div class="pt-row"><div class="pt-name">CDN</div><div>Serves static assets from edge nodes globally</div><div>Global users, static files, images</div></div>
      <div class="pt-row"><div class="pt-name">Redis Cache</div><div>Sub-ms reads for hot data</div><div>Frequent reads, computed results, sessions</div></div>
      <div class="pt-row"><div class="pt-name">Database Read Replica</div><div>Offload read queries from primary</div><div>Read-heavy workloads, reporting</div></div>
      <div class="pt-row"><div class="pt-name">Message Queue</div><div>Decouple producers from consumers</div><div>Async processing, traffic spikes</div></div>
      <div class="pt-row"><div class="pt-name">Sharding</div><div>Split data across DB instances</div><div>Single DB cannot handle volume</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">High Availability Design — 99.9% to 99.999% SLA</div>
  <div class="ref-body">
    <div class="code-box">SLA targets:
  99.9%   = 8.7 hours downtime/year   (3 nines)
  99.99%  = 52 minutes downtime/year  (4 nines)
  99.999% = 5 minutes downtime/year   (5 nines)</div>
    <div class="two-col" style="margin-top:12px;">
      <div>
        <div class="ans-label">HA Checklist</div>
        <ul>
          <li>Multiple pods per service (min 3 replicas)</li>
          <li>Anti-affinity rules — spread across nodes</li>
          <li>Multi-zone deployment (AZ-1, AZ-2, AZ-3)</li>
          <li>Load balancer with health checks</li>
          <li>Liveness + Readiness probes</li>
          <li>Database HA — primary + replica failover</li>
          <li>Circuit Breaker on all downstream calls</li>
          <li>Retry with exponential backoff</li>
          <li>Graceful degradation (show cached data if live fails)</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Failure Scenarios to Design For</div>
        <div class="code-box">Pod crash
  → K8s restarts pod automatically

Node failure
  → Pods rescheduled on healthy nodes

Database failure
  → Failover to replica (RPO seconds)

Region failure
  → Traffic shifted to secondary region
  → Cosmos DB / Azure SQL geo-replication

Deployment gone wrong
  → Canary detected error → auto-rollback
  → PodDisruptionBudget prevents all
    pods being deleted simultaneously</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">System Design: URL Shortener (Wipro Question)</div>
  <div class="ref-body">
    <div class="code-box">Requirements:
  - Convert long URL → short code (ABC123)
  - Redirect short URL to original
  - Multi-tenant support
  - 1 billion requests/day (~12,000 QPS)
  - Low latency (&lt;10ms redirect)
  - High availability (99.99%)</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Architecture</div>
        <div class="code-box">Client
  ↓
CDN (cache popular short URLs)
  ↓ (cache miss)
API Gateway (auth, rate limiting)
  ↓
URL Service (stateless, 10+ pods)
  ↓           ↓
Redis Cache  PostgreSQL
(hot URLs)   (all URLs)

Redis: shortCode → longUrl (TTL 1hr)
DB:   TenantId + ShortCode → LongUrl</div>
      </div>
      <div>
        <div class="ans-label">Short Code Generation</div>
        <div class="code-box">Option 1: Base62 encode a counter
  Counter: 1000001 → Base62 → "4c92"
  Pro: No collision, sequential
  Con: Predictable (security risk)

Option 2: Random 6-char Base62
  Pro: Unpredictable
  Con: Check uniqueness before save

Option 3: Hash (MD5) → first 6 chars
  Pro: Deterministic (same URL = same code)
  Con: Collision possible, handle retry</div>
      </div>
    </div>
    <div class="ans-label" style="margin-top:14px;">Multi-Tenant Design</div>
    <div class="code-box">DB Schema:
  tenant_id  | short_code | long_url          | created_at | expires_at
  -----------+------------+-------------------+------------+-----------
  EY         | ABC123     | https://google... | 2025-01-01 | 2026-01-01
  Bosch      | ABC123     | https://bosch...  | 2025-01-01 | NULL

Index: (tenant_id, short_code) — composite unique key
Tenant identified via: subdomain (ey.short.com) or JWT claim</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">System Design: Swiggy-Style Food Ordering (Bosch Question)</div>
  <div class="ref-body">
    <div class="code-box">Services:
┌─────────────────────────────────────────────────────────┐
│  API Gateway (auth, routing, rate limiting)              │
└───┬─────────────┬──────────────┬───────────┬────────────┘
    ↓             ↓              ↓           ↓
User Service  Restaurant Svc  Order Svc  Payment Svc
(PostgreSQL)  (MongoDB +      (PostgreSQL)(PostgreSQL)
              Redis cache)
                                ↓
                           Event Bus (Kafka)
                    ┌──────────┼───────────┐
                    ↓          ↓           ↓
               Notification  Delivery   Analytics
               Service       Service    Service</div>
    <div class="pattern-table" style="margin-top:14px;">
      <div class="pt-row pt-header"><div>Flow Step</div><div>Service</div><div>Tech Decision</div></div>
      <div class="pt-row"><div class="pt-name">Customer Login</div><div>User Service</div><div>JWT via Azure AD. Cached in Redis.</div></div>
      <div class="pt-row"><div class="pt-name">Restaurant Listing</div><div>Restaurant Service</div><div>MongoDB (flexible menu schema). Redis cache (TTL 5min) for popular listings.</div></div>
      <div class="pt-row"><div class="pt-name">Place Order</div><div>Order Service</div><div>PostgreSQL (ACID). Publishes OrderCreated to Kafka.</div></div>
      <div class="pt-row"><div class="pt-name">Payment</div><div>Payment Service</div><div>Separate DB. Saga pattern. Idempotent payment API (retry-safe).</div></div>
      <div class="pt-row"><div class="pt-name">Notify Restaurant + Customer</div><div>Notification Service</div><div>Kafka consumer. Push via Firebase (mobile) + WebSocket (web).</div></div>
      <div class="pt-row"><div class="pt-name">Order Status Tracking</div><div>Delivery Service</div><div>WebSocket / SignalR for real-time location updates.</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">System Design: Dashboard Performance (Wipro Question)</div>
  <div class="ref-body">
    <div class="code-box">Problem: Dashboard loads slowly — too many widgets, too many API calls.

Architecture Decision: API Aggregation + Micro Frontend per Widget

Client
  ↓
CDN (static assets)
  ↓
Shell App (dashboard layout)
  ├── Widget A: Sales    (lazy loaded MFE)
  ├── Widget B: Revenue  (lazy loaded MFE)
  └── Widget C: Orders   (lazy loaded MFE)

Each widget:
  - Loads independently (failure in one doesn't break others)
  - Has its own API call
  - Shows skeleton screen while loading</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Backend: Pre-Aggregated Read Models</div>
        <div class="code-box">Problem: Dashboard widget queries 5 tables
         with joins = slow

Solution (CQRS Read Model):
  Background job runs every 5 min
  → pre-aggregates data
  → stores in DashboardSummary table

  Widget API query:
  SELECT * FROM DashboardSummary
  WHERE TenantId=@id AND Date=@today
  → 1 row, instant response</div>
      </div>
      <div>
        <div class="ans-label">Caching Strategy per Widget</div>
        <div class="code-box">Revenue widget: Redis TTL=5min
  (changes every few minutes — acceptable)

Real-time Orders: WebSocket
  (live updates — no cache)

Historical Reports:
  Redis TTL=1hr or CDN cached response
  (data doesn't change)

Always show cached data + timestamp:
  "Last updated: 2 min ago"
  Refresh button for user control</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Multi-Tenant Architecture — Decision Matrix</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Model</div><div>Isolation</div><div>Cost</div><div>Complexity</div><div>Best For</div></div>
      <div class="pt-row"><div class="pt-name">Shared DB + Shared Table (TenantId column)</div><div>Low</div><div class="dt-yes">Lowest</div><div>Low</div><div>SaaS startups, many small tenants</div></div>
      <div class="pt-row"><div class="pt-name">Shared DB + Separate Schema</div><div>Medium</div><div>Low</div><div>Medium</div><div>Mid-size SaaS, moderate compliance</div></div>
      <div class="pt-row"><div class="pt-name">Separate DB per Tenant</div><div class="dt-yes">High</div><div>High</div><div>High</div><div>Enterprise, regulated industries (HIPAA, GDPR)</div></div>
      <div class="pt-row"><div class="pt-name">Separate AKS Namespace per Tenant</div><div class="dt-yes">Very High</div><div>Very High</div><div>Very High</div><div>Fully isolated SaaS, government clients</div></div>
    </div>
    <div class="tip-box" style="margin-top:12px;">✅ Start with Shared DB + TenantId column. Design data access layer to abstract the tenancy model so you can switch later without rewriting business logic.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Interview Summary — Architect-Level Answer</div>
  <div class="ref-body">
    <div class="code-box">Q: Design a high-volume order processing system.

A: I start by clarifying: how many orders/second? Consistency or availability first?

   High-level design:
   Client → CDN → API Gateway → Order Service (K8s, 10+ pods)
   Order Service writes to PostgreSQL (ACID for orders)
   Publishes OrderCreated to Kafka

   Downstream services consume from Kafka independently:
   Payment Service, Inventory Service, Notification Service.
   Each scales via KEDA based on Kafka lag.

   For high availability:
   3+ replicas per service across 3 availability zones.
   Database with synchronous replica (RPO=0).
   Circuit breaker on all downstream calls.
   Canary deployment with auto-rollback.

   For performance:
   Redis cache for product/restaurant data (TTL 5min).
   Read replicas for reporting queries.
   Pre-aggregated CQRS read models for dashboards.

   For multi-tenancy:
   TenantId in every DB table.
   JWT token carries tenantId claim.
   All queries automatically filtered.
   Separate DB for enterprise clients needing full isolation.</div>
  </div>
</div>
`;
