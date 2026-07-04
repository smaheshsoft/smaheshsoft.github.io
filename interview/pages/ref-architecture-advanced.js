window.Pages['ref-architecture-advanced'] = `
<div class="page-header">
  <div class="breadcrumb">Deep Dive › <span>Architecture Patterns</span></div>
  <h1>🏗️ Architecture Patterns — Deep Dive</h1>
  <p>HLD · LLD · DDD · Hexagonal · Onion · Clean · Event Sourcing · Outbox · Distributed Transactions</p>
</div>

<div class="ref-section">
  <div class="ref-title">HLD vs LLD — What Architects Produce</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">High-Level Design (HLD)</div>
        <div class="code-box">Purpose: System overview for stakeholders &amp; architects

Covers:
  • Major components (services, databases, queues)
  • Data flow between components
  • Technology choices (AKS, Kafka, PostgreSQL)
  • Non-functional: scale, availability, latency
  • Integration points with external systems

Audience: Architects, Product Owners, Management
Diagram: Box-and-arrow system diagram</div>
      </div>
      <div>
        <div class="ans-label">Low-Level Design (LLD)</div>
        <div class="code-box">Purpose: Implementation guide for developers

Covers:
  • Class diagrams, interfaces, methods
  • Database schema (tables, columns, indexes)
  • API contracts (request/response shapes)
  • Algorithms &amp; data structures
  • Error handling flows
  • Sequence diagrams for key flows

Audience: Developers, Tech Leads
Diagram: Class diagrams, ERDs, sequence diagrams</div>
      </div>
    </div>
    <div class="tip-box">✅ Architect interview tip: Always start with HLD — clarify scale, then drill into LLD for the most complex components.</div>
    <div class="alert tip" style="margin-top:12px;">
      <strong>💡 Full deep dives</strong>
      <p>For capacity estimation, NFR checklists, diagram types and worked examples see <a href="#" onclick="showPage('ref-hld',document.querySelector('[onclick*=ref-hld]'));return false;">📐 High-Level Design (HLD)</a> and <a href="#" onclick="showPage('ref-lld',document.querySelector('[onclick*=ref-lld]'));return false;">🔍 Low-Level Design (LLD)</a>.</p>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Architecture Styles Comparison</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Style</div><div>Structure</div><div>Best For</div><div>Trade-off</div></div>
      <div class="pt-row"><div class="pt-name">Monolith</div><div>Single deployable unit, all modules together</div><div>Small teams, MVP, simple domains</div><div>Hard to scale parts independently</div></div>
      <div class="pt-row"><div class="pt-name">Modular Monolith</div><div>Single deploy, but strict module boundaries via packages/namespaces</div><div>Teams not ready for microservices yet</div><div>Best of both: deploy simplicity + code modularity</div></div>
      <div class="pt-row"><div class="pt-name">SOA</div><div>Services share ESB (Enterprise Service Bus), coarse-grained</div><div>Enterprise, legacy integration</div><div>ESB becomes bottleneck &amp; single point of failure</div></div>
      <div class="pt-row"><div class="pt-name">Microservices</div><div>Fine-grained, independent services, each with own DB</div><div>Large orgs, multiple teams, scale per domain</div><div>Operational complexity, network overhead</div></div>
      <div class="pt-row"><div class="pt-name">Event-Driven</div><div>Services communicate via events/messages asynchronously</div><div>High throughput, decoupled workflows</div><div>Eventual consistency, harder debugging</div></div>
    </div>
    <div class="tip-box" style="margin-top:12px;">✅ Modular Monolith is often the right first step before microservices. Extract only when you have clear domain boundaries and operational maturity.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Clean / Onion / Hexagonal Architecture</div>
  <div class="ref-body">
    <div class="code-box">All three share the same core principle:
  DEPENDENCY RULE — dependencies point INWARD only.
  Inner layers know nothing about outer layers.

Hexagonal (Ports &amp; Adapters):
  ┌─────────────────────────────────┐
  │         External Systems         │
  │  (HTTP, DB, Kafka, UI, Tests)   │
  │         ↓ Adapters ↓            │
  │  ┌──── Ports (Interfaces) ────┐  │
  │  │     Application Core       │  │
  │  │  (Domain + Use Cases)      │  │
  │  └────────────────────────────┘  │
  └─────────────────────────────────┘

Clean Architecture (Uncle Bob):
  Entities → Use Cases → Interface Adapters → Frameworks &amp; Drivers

Onion Architecture:
  Domain Model → Domain Services → Application Services → Infrastructure</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Benefits</div>
        <ul>
          <li>Domain logic has zero dependency on infrastructure</li>
          <li>Easy to swap DB, framework, or messaging without changing business logic</li>
          <li>Domain layer is fully unit-testable (no mocks for DB needed)</li>
          <li>Clear separation of concerns per layer</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">C# Folder Structure (Clean Architecture)</div>
        <div class="code-box">src/
  Domain/
    Entities/       ← pure C# classes
    Interfaces/     ← IOrderRepository
    Events/         ← OrderCreatedEvent
  Application/
    UseCases/       ← PlaceOrderCommand
    DTOs/
  Infrastructure/
    Repositories/   ← SqlOrderRepository
    Messaging/      ← KafkaPublisher
  API/
    Controllers/    ← depends on Application only</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Domain-Driven Design (DDD)</div>
  <div class="ref-body">
    <div class="code-box">DDD = align software model with business domain using shared language (Ubiquitous Language).

Key Building Blocks:
  Entity         — has identity, mutable (Order with OrderId)
  Value Object   — no identity, immutable (Money: amount + currency)
  Aggregate      — cluster of entities with one root (Order + OrderLines)
  Aggregate Root — only entry point to modify the aggregate
  Repository     — persistence abstraction per aggregate
  Domain Event   — something important happened (OrderPlaced)
  Domain Service — logic that doesn't belong to one entity (PricingService)
  Factory        — complex object creation logic</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Bounded Context</div>
        <div class="code-box">Same term = different meaning in different contexts.

"Customer" in:
  Sales Context     → lead, opportunity, account
  Support Context   → ticket holder, case history
  Billing Context   → payer, invoice recipient

Each context has its own model.
Context Map shows how contexts integrate:
  Shared Kernel / Customer-Supplier / Anti-Corruption Layer</div>
      </div>
      <div>
        <div class="ans-label">Aggregate Example (Order)</div>
        <div class="code-box">public class Order : AggregateRoot {
  public OrderId Id { get; }
  private List&lt;OrderLine&gt; _lines = new();

  public void AddLine(ProductId p, int qty, Money price) {
    // business rules enforced here
    if (_lines.Count > 50)
      throw new OrderTooLargeException();
    _lines.Add(new OrderLine(p, qty, price));
    AddDomainEvent(new OrderLineAdded(Id, p));
  }
}
// Never modify OrderLine directly from outside</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Event Sourcing</div>
  <div class="ref-body">
    <div class="code-box">Traditional: Store current state in DB row.
  UPDATE orders SET status='Shipped' WHERE id=123

Event Sourcing: Store the sequence of events that led to current state.
  INSERT INTO events: OrderCreated, PaymentReceived, Shipped
  Replay events to get current state.</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Benefits</div>
        <ul>
          <li>Complete audit trail — every change recorded</li>
          <li>Time travel — rebuild state at any point in time</li>
          <li>Event replay — rebuild read models from scratch</li>
          <li>Debugging — see exactly what happened and when</li>
          <li>Natural fit with CQRS read models</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Challenges</div>
        <ul>
          <li>Eventual consistency — read models lag slightly</li>
          <li>Schema evolution — old events must still be readable</li>
          <li>Snapshots needed for long-lived aggregates (performance)</li>
          <li>Complex queries — cannot do ad-hoc SQL across events</li>
        </ul>
        <div class="tip-box" style="margin-top:8px;">✅ Use: Financial systems, audit-critical apps, undo/redo workflows. Avoid: simple CRUD, reporting-heavy systems.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Outbox &amp; Inbox Patterns — Guaranteed Messaging</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Outbox Pattern (guaranteed publish)</div>
        <div class="code-box">Problem: DB write succeeds but Kafka publish fails
         → Order saved but Payment never triggered

Solution:
  BEGIN TRANSACTION
    INSERT INTO orders (...)
    INSERT INTO outbox_events (OrderCreated, payload)
  COMMIT

Background relay process:
  Poll outbox_events WHERE published = false
  → Publish to Kafka
  → Mark published = true

Guarantee: Event published if and only if DB write succeeds.</div>
      </div>
      <div>
        <div class="ans-label">Inbox Pattern (idempotent consume)</div>
        <div class="code-box">Problem: Consumer restarts → reprocesses same message
         → Payment charged twice!

Solution:
  BEGIN TRANSACTION
    SELECT FROM inbox WHERE message_id = @id
    IF exists → skip (already processed)
    INSERT INTO inbox (message_id, processed_at)
    → Process business logic
  COMMIT

Guarantee: Each message processed exactly once
           even if delivered multiple times.</div>
      </div>
    </div>
    <div class="tip-box" style="margin-top:12px;">✅ Outbox + Inbox together = at-least-once delivery + idempotent processing = effectively exactly-once semantics without distributed transactions.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Distributed Transactions &amp; Idempotency</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Why 2-Phase Commit (2PC) is Avoided</div>
        <div class="code-box">2PC: Coordinator asks all participants to prepare.
     If all OK → commit. If any fail → rollback.

Problems:
  Coordinator fails after prepare → all blocked
  Participants must hold locks during coordinator wait
  Creates tight coupling between services
  Does not work across different tech stacks

Result: Latency spikes, availability risk

Modern alternative: Saga Pattern + Compensation</div>
      </div>
      <div>
        <div class="ans-label">Idempotency</div>
        <div class="code-box">Idempotent: calling same operation N times
= same result as calling it once.

Examples:
  ✅ GET /orders/123 → always same data
  ✅ PUT /orders/123 (full replace) → idempotent
  ❌ POST /payments → NOT idempotent by default

Make POST idempotent:
  Client sends Idempotency-Key header
  Server stores key → result mapping
  If same key arrives again → return cached result

  POST /payments
  Idempotency-Key: payment-abc-123-attempt-1</div>
      </div>
    </div>
    <div class="ans-label" style="margin-top:14px;">BASE vs ACID</div>
    <div class="code-box">ACID (SQL):                          BASE (NoSQL/Distributed):
  Atomicity   — all or nothing          Basically Available — responds always
  Consistency — valid state always      Soft State         — state may change
  Isolation   — concurrent safe         Eventually Consistent — converges over time
  Durability  — committed = permanent

When to use ACID: Financial transactions, inventory counts, critical state changes.
When to use BASE: Social media likes, analytics counters, catalog views, sessions.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Distributed Locking</div>
  <div class="ref-body">
    <div class="code-box">Problem: Two service instances try to process same job simultaneously → duplicate work.

Solutions:

1. Redis Distributed Lock (Redlock):
   SET lock:job-123 my-uuid NX PX 30000
   → NX = only set if not exists
   → PX 30000 = expire in 30 seconds (prevents deadlock)
   → Returns OK if lock acquired, nil if already locked

2. Database Optimistic Lock:
   UPDATE jobs SET status='processing', version=version+1
   WHERE id=123 AND version=5
   → If 0 rows updated → someone else took it

3. Lease-based (Kubernetes leader election):
   One instance holds the lease. Others wait.
   Leader renews lease every N seconds.
   If renewal fails → another takes over.</div>
    <div class="warn-box">⚠️ Always set TTL on distributed locks. A crashed process that holds a lock forever = deadlock. Always include the lock holder's identity for debugging.</div>
  </div>
</div>
`;
