window.Pages['ref-leadership'] = `
<div class="page-header">
  <div class="breadcrumb">Deep Dive › <span>Leadership &amp; Director Round</span></div>
  <h1>🎯 Leadership &amp; Director Round</h1>
  <p>ADR · Trade-offs · Build vs Buy · Tech Debt · RCA · Roadmap · Stakeholder · Mentoring</p>
</div>

<div class="ref-section">
  <div class="ref-title">Architecture Decision Records (ADR)</div>
  <div class="ref-body">
    <div class="code-box"># ADR-012: Use Outbox Pattern for Reliable Event Publishing

## Status: Accepted (2024-03-15)

## Context
Order service must publish events to Kafka when orders are placed.
Currently using fire-and-forget publish after DB commit. This causes lost events
when Kafka is unavailable or the process crashes after DB commit but before publish.
We have had 3 production incidents in the last quarter causing data inconsistency.

## Decision
Implement the Transactional Outbox Pattern:
- Write events to an "outbox" table in the same DB transaction as business data.
- A background relay process reads the outbox and publishes to Kafka.
- Mark events as published after successful publish.

## Consequences
✅ Events never lost — DB transaction guarantees atomicity.
✅ Eventual consistency maintained across services.
⚠️ Added complexity: background relay service, outbox table, deduplication at consumer.
⚠️ Slight delay (milliseconds to seconds) between order placed and event published.
⚠️ Consumers must be idempotent (event may be published more than once).</div>
    <div class="tip-box">✅ ADRs should be: short (1 page), stored in git alongside code, capture WHY not just WHAT, include rejected alternatives. Tools: adr-tools CLI, Markdown in /docs/adr/.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Trade-off Analysis Framework</div>
  <div class="ref-body">
    <div class="code-box">EVERY architecture decision is a trade-off. Framework for analysis:

1. Define the CONSTRAINTS:
   - Timeline (3 months vs 18 months?)
   - Team skill set (K8s experts? or none?)
   - Budget (startup vs enterprise?)
   - Compliance (HIPAA? PCI DSS? GDPR?)
   - Scale (1K req/s or 1M req/s?)

2. Identify OPTIONS with trade-offs:
   Option A: Event-driven / async
     ✅ Decoupled, scalable, resilient
     ❌ Complexity, eventual consistency, harder debugging

   Option B: Synchronous REST calls
     ✅ Simple, easy to debug, strong consistency
     ❌ Coupling, cascading failures, blocking

3. Score against your constraints (not abstract "best practices")

4. Document: context → decision → consequences (ADR)</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Common Trade-offs to Know</div>
        <div class="code-box">Consistency vs Availability (CAP)
  → During partition: choose one.
  → Most systems choose availability + eventual consistency.

SQL vs NoSQL
  → Flexibility vs ACID guarantees.
  → Schema rigidity vs schema evolution.

Microservices vs Monolith
  → Agility vs operational complexity.
  → Independent deploy vs distributed system problems.

Sync vs Async communication
  → Simplicity vs resilience/decoupling.

Build vs Buy (see below)

Short-term speed vs long-term maintainability
  → Tech debt trade-off.</div>
      </div>
      <div>
        <div class="ans-label">Build vs Buy Framework</div>
        <div class="code-box">Buy / Use SaaS when:
  ✅ Not your core competency
  ✅ Vendor solves compliance for you (PCI for payments)
  ✅ Faster time-to-market
  ✅ Ongoing maintenance not worth your team's time
  Examples: Auth (Auth0/Entra), payments (Stripe),
            email (SendGrid), search (Algolia)

Build when:
  ✅ Core competitive differentiator
  ✅ Vendor lock-in risk too high
  ✅ Data sovereignty / compliance requires it
  ✅ Vendor can't meet your SLA/scale
  ✅ Total cost over 3-5 years favors build

Hybrid (most common):
  Buy platform (Azure, AWS) + Build on top.
  Buy commodity (Auth, email) + Build domain logic.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Technical Debt Management</div>
  <div class="ref-body">
    <div class="code-box">Technical Debt: future cost of shortcuts taken today.

Types:
  Deliberate: "We know this is not ideal, we'll fix it post-launch" (DOCUMENT IT!)
  Inadvertent: "We didn't know better at the time"
  Bit rot: code that was fine, but world moved on around it

Managing Tech Debt:
  1. Make it VISIBLE — tech debt backlog with business impact.
     Bad: "refactor the payment module"
     Good: "Sync payment module = blocking 3 new payment methods = $500K revenue blocked"

  2. Quantify the cost of NOT fixing it:
     Developer productivity: how much slower are we?
     Incident rate: are we firefighting because of this?
     Feature velocity: what can we NOT build?

  3. Allocate budget: 15-20% of sprint capacity for debt reduction.
     Frame to business: "reliability investment" not "cleaning up mess"

  4. Strangler Fig for legacy systems: replace incrementally.

  5. Don't fix what doesn't cause pain — some debt is fine forever.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Root Cause Analysis (RCA / Post-Mortem)</div>
  <div class="ref-body">
    <div class="code-box">Blameless Post-Mortem Process:

1. TIMELINE — what happened, when (precise, objective).
   14:32 - Alert fired: P99 latency &gt; 5s for order service
   14:35 - On-call acknowledged
   14:40 - Identified DB connection pool exhaustion
   14:45 - Scaled up connection pool limit
   14:47 - Latency recovered

2. ROOT CAUSE (5 Whys):
   Why slow? → DB queries queueing up.
   Why queueing? → Connection pool exhausted (100 max).
   Why exhausted? → New "send email" feature holds connection during SMTP call (2-5s).
   Why during SMTP? → Email sent inside transaction (mistake).
   Why not caught? → No load test for this feature, no connection pool monitoring alert.

3. IMPACT:
   Duration: 15 min
   Affected: 100% of order placement, ~3,000 orders failed
   Revenue impact: ~$45K estimated

4. ACTION ITEMS (with owner + deadline):
   ✅ Move email sending out of transaction (Dev: Alice, 2 days)
   ✅ Add connection pool utilization alert (SRE: Bob, 1 day)
   ✅ Load test checklist for all new features (Process, 1 week)</div>
    <div class="tip-box">✅ Blameless: focus on SYSTEMS and PROCESSES, not people. The goal is prevention, not punishment. Share post-mortems publicly within the org — normalize learning from failures.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Stakeholder Communication &amp; Roadmap</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Technology Roadmap</div>
        <div class="code-box">Now (0-3 months): immediate needs, burning issues.
  → Stabilize order service (connection pool fix, alerting)
  → Complete SOC2 compliance gaps

Next (3-9 months): planned investments.
  → Migrate to microservices (strangler fig)
  → Implement CQRS for reporting

Later (9-18 months): strategic direction.
  → ML-based fraud detection
  → Real-time analytics platform

Format for executives:
  ✅ Business outcome, not tech.
  ❌ "Migrate to Kubernetes"
  ✅ "Reduce deployment time from 2hrs to 10min → 40% more features shipped"

  ❌ "Implement CQRS"
  ✅ "Unblock reporting team: self-service dashboards without DB risk"</div>
      </div>
      <div>
        <div class="ans-label">Engineering Leadership Principles</div>
        <div class="code-box">Mentoring:
  Pair programming for knowledge transfer.
  Architecture review as teaching opportunity.
  "What would you do differently?" not "You did it wrong."
  Delegate to grow → give ownership, support, not control.

Hiring:
  System design + coding + culture.
  Look for: how they think, not just what they know.
  "Tell me about a technical decision you regret" → self-awareness.

Managing up:
  Translate technical risks to business risk.
  "DB has no replication = single point of failure = if it fails, $50K/hr revenue loss"
  Come with options + recommendation, not just problems.

Managing incidents as a leader:
  Assign roles: incident commander, tech lead, comms.
  5-min updates to stakeholders (even if "no change").
  Don't troubleshoot AND communicate — delegate one.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Cost Optimization</div>
  <div class="ref-body">
    <div class="code-box">FinOps: bring financial accountability to cloud spend.

Quick wins (no architecture change):
  Right-size VMs: analyze actual CPU/memory utilization.
    → A service using 10% CPU on D4s_v3? Downsize to D2s_v3 (50% savings).
  Reserved Instances: 1-3 year commitment → 40-70% off pay-as-you-go.
  Spot/Preemptible: batch workloads, stateless → 80-90% off.
  Turn off non-prod: dev/test environments off nights and weekends → 65% savings.

Architecture-level savings:
  Tiered storage: move old blobs to Cool/Archive automatically.
  CDN: offload origin → reduce compute + bandwidth.
  KEDA: scale-to-zero when no messages in queue.
  Serverless (Functions): pay per execution, not per VM.

Visibility:
  Azure Cost Management: tag resources by team/product.
  Budget alerts: alert when 80% of budget spent.
  Showback/Chargeback: make teams aware of their costs.

Cost conversation with leadership:
  Show ROI: "$200K/yr cloud cost, enables $5M revenue"
  Show waste: "35% of spend is idle resources — fixing it saves $70K/yr"</div>
  </div>
</div>
`;
