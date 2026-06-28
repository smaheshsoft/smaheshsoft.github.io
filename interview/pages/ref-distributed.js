window.Pages['ref-distributed'] = `
<div class="page-header">
  <div class="breadcrumb">Deep Dive › <span>Distributed Systems</span></div>
  <h1>🌐 Distributed Systems</h1>
  <p>Scaling · Service Discovery · Leader Election · Consensus · Split Brain · Replication · Geo-Distribution</p>
</div>

<div class="ref-section">
  <div class="ref-title">Scaling Patterns</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Technique</div><div>What it Does</div><div>Requirement</div><div>Limit</div></div>
      <div class="pt-row"><div class="pt-name">Vertical Scale (Scale Up)</div><div>Bigger machine: more CPU, RAM</div><div>None — works for stateful too</div><div>Hardware ceiling + downtime for resize</div></div>
      <div class="pt-row"><div class="pt-name">Horizontal Scale (Scale Out)</div><div>More instances behind load balancer</div><div>App must be stateless</div><div>Session/state management complexity</div></div>
      <div class="pt-row"><div class="pt-name">Stateless Services</div><div>No local state — state in Redis/DB</div><div>External state store</div><div>Latency for state reads</div></div>
      <div class="pt-row"><div class="pt-name">Read Replicas</div><div>Offload reads from primary DB</div><div>Eventual consistency acceptable</div><div>Replication lag for writes</div></div>
      <div class="pt-row"><div class="pt-name">Sharding</div><div>Split data by partition key across DBs</div><div>Good partition key choice</div><div>Cross-shard queries expensive</div></div>
      <div class="pt-row"><div class="pt-name">CQRS</div><div>Separate read/write models</div><div>Event-driven architecture</div><div>Read model eventually consistent</div></div>
    </div>
    <div class="code-box" style="margin-top:12px;">Stateless Service Pattern:
  ❌ Bad:  user session stored in-memory on Server A
           → User hits Server B → logged out!

  ✅ Good: user session stored in Redis
           → Any instance reads same session
           → Scale to 100 instances freely</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Service Discovery</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Client-Side Discovery</div>
        <div class="code-box">Client → Service Registry (ask for OrderService IPs)
       ← returns [10.0.1.5, 10.0.1.6, 10.0.1.7]
Client → load balances itself → picks one

Examples: Netflix Eureka, Consul
Pros: Client controls load balancing strategy
Cons: Client must implement LB logic per language</div>
      </div>
      <div>
        <div class="ans-label">Server-Side Discovery</div>
        <div class="code-box">Client → Load Balancer / API Gateway
       → Gateway queries registry → routes request
       → forwards to healthy instance

Examples: Kubernetes kube-dns + ClusterIP
          AWS ALB + ECS Service Discovery
Pros: Client knows nothing about discovery
Cons: Additional hop; LB must be HA</div>
      </div>
    </div>
    <div class="ans-label" style="margin-top:14px;">Kubernetes Service Discovery (DNS-based)</div>
    <div class="code-box">Every Kubernetes Service gets a stable DNS name:
  http://order-service.production.svc.cluster.local
  http://order-service  (within same namespace)

kube-dns resolves name → ClusterIP → kube-proxy routes to pod IP.
Pods come and go — DNS stays stable.
Health-check integration: unhealthy pods removed from endpoints automatically.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Leader Election &amp; Consensus</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Leader Election — Why Needed</div>
        <div class="code-box">Problem: 3 instances of a scheduler service.
         All 3 try to send the daily report email.
         Result: 3 emails sent!

Solution: Only ONE leader runs scheduled jobs.
  Leader owns the work.
  Others are standby.
  If leader dies → elect new leader.

Tools:
  Kubernetes: leader election via Lease API
  etcd: distributed locks
  Redis: SETNX-based lock
  ZooKeeper: ephemeral node ownership</div>
      </div>
      <div>
        <div class="ans-label">Consensus — Raft Algorithm</div>
        <div class="code-box">Used by: etcd, CockroachDB, Consul

3 roles: Leader, Follower, Candidate

Election:
  1. All start as Follower
  2. If no heartbeat from leader → become Candidate
  3. Request votes from peers
  4. Majority votes → become Leader

Log Replication:
  Leader receives write → appends to log
  Replicates to followers
  Commits when majority acknowledge
  → Guarantees: committed = durable across failures

Quorum: need (N/2 + 1) nodes alive for progress
3-node cluster → tolerates 1 failure
5-node cluster → tolerates 2 failures</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Split Brain — The Hardest Distributed Problem</div>
  <div class="ref-body">
    <div class="code-box">Split Brain: Network partition causes two groups to each think they're the leader.

Scenario:
  3-node cluster: A, B, C
  Network partition: [A, B] can't talk to [C]
  C thinks A &amp; B are dead → elects itself leader
  A &amp; B still have their leader
  Result: TWO leaders accepting writes → divergent state!

Solutions:
  1. Quorum-based writes:
     Require majority (2/3) to acknowledge → C alone can't form quorum → stops accepting writes
     ✅ Prevents split brain but C becomes unavailable

  2. Fencing Token:
     Monotonically increasing token issued per leader epoch.
     Any write with old token rejected.
     Even if old leader thinks it's still active.

  3. STONITH (Shoot The Other Node In The Head):
     When split detected → one partition forcibly powers off the other
     Used in traditional HA clustering (Pacemaker/Corosync)</div>
    <div class="warn-box">⚠️ Split brain is why distributed databases choose CP or AP. You cannot have both consistency AND availability during a partition (CAP theorem).</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Distributed Cache</div>
  <div class="ref-body">
    <div class="code-box">Distributed Cache = shared in-memory store accessible by all service instances.

Without cache:
  100 requests/sec → 100 DB queries/sec → DB bottleneck

With cache:
  100 requests/sec → 90 cache hits (Redis) → 10 DB queries/sec</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Cache Strategies</div>
        <div class="code-box">Cache-Aside (Lazy Loading):
  1. Check Redis
  2. Miss → query DB → write to Redis
  3. TTL expires → auto-evict

Write-Through:
  Write to DB AND cache simultaneously.
  Cache always up to date. Higher write latency.

Write-Behind (Write-Back):
  Write to cache first → async write to DB.
  Fast writes. Risk of data loss on cache crash.

Read-Through:
  Cache fetches from DB on miss automatically.
  Simpler client code.</div>
      </div>
      <div>
        <div class="ans-label">Cache Invalidation Problems</div>
        <div class="code-box">"There are only two hard things in Computer Science:
 cache invalidation and naming things."

Stale Data: Cache has old value after DB update.
  Solution: TTL + event-driven invalidation

Cache Stampede (Thundering Herd):
  Key expires → 1000 requests miss → all hit DB
  Solution: Probabilistic early expiry / locking

Hot Key Problem:
  One key gets 80% of traffic → Redis CPU spike
  Solution: Local in-process cache (L1 cache) + Redis (L2 cache)</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Data Replication Patterns</div>
  <div class="ref-body">
    <div class="three-col">
      <div>
        <div class="ans-label">Synchronous Replication</div>
        <div class="code-box">Write → Primary
       → replicates to replica
       → waits for ACK
       → confirms to client

RPO = 0 (no data loss)
RTO depends on failover speed

Cost: Higher write latency
Use: Financial, critical data</div>
      </div>
      <div>
        <div class="ans-label">Asynchronous Replication</div>
        <div class="code-box">Write → Primary
       → confirms to client immediately
       → replicates to replica async

RPO = seconds/minutes (replication lag)
Lower write latency

Cost: Possible data loss on primary failure
Use: Read-heavy workloads, geo-replication</div>
      </div>
      <div>
        <div class="ans-label">Multi-Region Deployment</div>
        <div class="code-box">Region-A (Primary)
  ↕ geo-replication
Region-B (Secondary)
  ↕ geo-replication
Region-C (DR)

Azure: Cosmos DB multi-write
       Azure SQL active geo-replication
       Traffic Manager for global routing

Latency benefit: Users routed to nearest region
DR benefit: Automatic failover on region outage</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Failover &amp; Disaster Recovery</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Strategy</div><div>RPO</div><div>RTO</div><div>Cost</div><div>Use Case</div></div>
      <div class="pt-row"><div class="pt-name">Active-Active</div><div>Near zero</div><div>Seconds (traffic switch)</div><div>Highest</div><div>Mission critical, global apps</div></div>
      <div class="pt-row"><div class="pt-name">Active-Passive (Hot Standby)</div><div>Seconds</div><div>Minutes (failover)</div><div>High (idle standby)</div><div>Business critical, regulated</div></div>
      <div class="pt-row"><div class="pt-name">Warm Standby</div><div>Minutes</div><div>Minutes to hours</div><div>Medium</div><div>Important but cost-sensitive</div></div>
      <div class="pt-row"><div class="pt-name">Cold Standby / Backup</div><div>Hours</div><div>Hours</div><div>Low</div><div>Non-critical, restore from backup</div></div>
    </div>
    <div class="ans-label" style="margin-top:14px;">Chaos Engineering</div>
    <div class="code-box">Principle: Deliberately inject failures in production to test resilience.

Netflix Chaos Monkey: randomly terminates instances in production.
Purpose: Ensure system survives pod/node/AZ failures gracefully.

Before chaos: Fix single points of failure you find.
During chaos: Monitor — does the system self-heal?
After chaos: Improve weak points discovered.

Azure Chaos Studio: inject CPU pressure, network latency, pod kills in AKS.</div>
  </div>
</div>
`;
