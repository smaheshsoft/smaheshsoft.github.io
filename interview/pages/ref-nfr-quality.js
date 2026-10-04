window.Pages['ref-nfr-quality'] = `
<div class="page-header">
  <div class="breadcrumb">Architecture › <span>NFR &amp; Quality Attributes</span></div>
  <h1>📐 NFR &amp; Quality Attributes</h1>
  <p>The stage where the architect stops reviewing and starts owning</p>
</div>

<div class="ref-section">
  <div class="ref-title">At A Glance</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step">FRD: what it does</div>
      <div class="flow-arrow">vs</div>
      <div class="flow-step blue">NFR: how well it does it</div>
    </div>
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">🟢</div><div class="principle-name">Availability</div><p>99.99% uptime target</p></div>
      <div class="principle-card"><div class="principle-icon">⚡</div><div class="principle-name">Performance</div><p>API &lt; 500ms p95/p99</p></div>
      <div class="principle-card"><div class="principle-icon">📈</div><div class="principle-name">Scalability</div><p>10,000 req/sec target</p></div>
      <div class="principle-card"><div class="principle-icon">🔐</div><div class="principle-name">Security</div><p>OAuth2 + RBAC</p></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Core NFR Categories</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header"><div>NFR</div><div>Typical Target</div><div>Architectural Lever</div></div>
      <div class="dt-row"><div class="dt-name">Availability</div><div>99.9% – 99.99%</div><div>Multi-AZ/region, health probes, auto-failover</div></div>
      <div class="dt-row"><div class="dt-name">Performance</div><div>API &lt; 500ms</div><div>Caching, indexing, async processing, CDN</div></div>
      <div class="dt-row"><div class="dt-name">Scalability</div><div>10k req/sec</div><div>Stateless services, horizontal autoscaling, partitioning</div></div>
      <div class="dt-row"><div class="dt-name">Security</div><div>OAuth2 + RBAC</div><div>Entra ID, Zero Trust, Key Vault, API Management</div></div>
      <div class="dt-row"><div class="dt-name">Disaster Recovery</div><div>RPO 5min / RTO 30min</div><div>Geo-replication, backup cadence, DR runbooks</div></div>
      <div class="dt-row"><div class="dt-name">Reliability</div><div>Graceful degradation</div><div>Retry + Circuit Breaker (Polly), timeouts, bulkheads</div></div>
      <div class="dt-row"><div class="dt-name">Compliance</div><div>GDPR / HIPAA</div><div>Data residency, encryption, audit logging, consent</div></div>
      <div class="dt-row"><div class="dt-name">Observability</div><div>Full-stack traceability</div><div>Structured logs, metrics, distributed tracing (App Insights)</div></div>
      <div class="dt-row"><div class="dt-name">Cost</div><div>Budget ceiling</div><div>Right-sizing, reserved capacity, serverless where bursty</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">How NFRs Drive Architecture Decisions</div>
  <div class="ref-body">
    <div class="code-box">NFR stated:        "10,000 requests/sec, 99.99% availability"
                           │
                           ▼
Architectural consequence:
  • Stateless API layer (no in-memory session) → horizontal scale
  • Multi-region AKS with Front Door → availability target
  • Service Bus for write buffering → absorb traffic spikes
  • Redis cache in front of SQL → meet latency target
  • Circuit breaker on downstream calls → contain partial failures

Each NFR number is not a "nice to have" — it eliminates entire
design options. 99.99% availability alone rules out a single-region
deployment with no automated failover.</div>
    <div class="tip-box">✅ Interview framing: "I treat NFRs as architectural constraints, not checklist items — each one removes a class of designs. A 99.99% target tells me single-region is off the table before I've drawn a single box."</div>
    <div class="warn-box">⚠️ Common trap: quoting NFR numbers without connecting them to a concrete design trade-off. Saying "we need 99.99% availability" without naming what that costs (multi-region spend, active-active complexity, data consistency trade-offs) reads as reciting a term, not owning the decision.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">RTO vs RPO — The Two DR Numbers That Matter Most</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step">RPO: how much data can we afford to lose?</div>
      <div class="flow-arrow">vs</div>
      <div class="flow-step blue">RTO: how long can we afford to be down?</div>
    </div>
    <div class="code-box">                    ⏪ RPO                    💥 Outage               ⏩ RTO
          ◄───────────────────────────────┤                     ├──────────────►
          Last good backup/replica      Disaster hits       System is back up
          (data older than this              (t = 0)            and serving traffic
           point is LOST)

RPO = Recovery Point Objective     → measured BACKWARD in time from the outage
                                      "how much data am I willing to lose?"

RTO = Recovery Time Objective      → measured FORWARD in time from the outage
                                      "how long am I willing to be down?"

Example:  RPO = 5 minutes, RTO = 30 minutes
  → At most 5 minutes of transactions can be lost (so replication/backup
    must run at least every 5 min), AND the system must be fully restored
    and serving traffic within 30 minutes of the failure being detected.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">RPO/RTO Targets Drive Specific Architecture — Not Just a Number on a Slide</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header"><div>Target</div><div>What It Forces</div><div>Azure Implementation</div></div>
      <div class="dt-row"><div class="dt-name">RPO near 0 (zero data loss)</div><div>Synchronous replication — write isn't acknowledged until it's durable in 2+ places</div><div>SQL/Cosmos DB synchronous replicas within a region (zone-redundant), active geo-replication with sync commit</div></div>
      <div class="dt-row"><div class="dt-name">RPO = minutes</div><div>Asynchronous replication is acceptable — small replication lag tolerated</div><div>Geo-replicated storage (RA-GRS), async SQL geo-replication, Event Hub capture every N minutes</div></div>
      <div class="dt-row"><div class="dt-name">RPO = hours</div><div>Periodic backups are enough — no continuous replication needed</div><div>Scheduled DB backups, nightly blob snapshots</div></div>
      <div class="dt-row"><div class="dt-name">RTO near 0 (seconds)</div><div>Hot standby, already running, already serving a share of traffic</div><div>Active-active multi-region behind Front Door/Traffic Manager</div></div>
      <div class="dt-row"><div class="dt-name">RTO = minutes</div><div>Warm standby — infrastructure exists but needs to be promoted/scaled up</div><div>Secondary region paused/scaled-to-zero AKS, automated failover runbook</div></div>
      <div class="dt-row"><div class="dt-name">RTO = hours</div><div>Cold standby — rebuild from IaC + restore from backup is acceptable</div><div>Terraform/Bicep redeploy + restore from backup on demand</div></div>
    </div>
    <div class="warn-box">⚠️ RPO and RTO are independent — a system can have near-zero RPO (synchronous replication, no data loss) but still a high RTO (takes an hour to actually fail over and resume traffic), or vice versa. Treating them as one combined "DR readiness" number hides which investment (replication tech vs automated failover tooling) actually needs the budget.</div>
    <div class="tip-box">✅ Interview line: "RPO tells me how I replicate data — sync vs async, and how often I snapshot. RTO tells me how automated my failover has to be — whether it's push-button, scripted, or truly hands-off active-active. I always ask for both numbers before proposing a DR design, because a low RPO with a high RTO, or the reverse, leads to completely different architectures."</div>
  </div>
</div>
`;
