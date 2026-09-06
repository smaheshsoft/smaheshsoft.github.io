window.Pages['ref-choreo-orch'] = `
<div class="page-header">
  <div class="breadcrumb">Architecture › <span>Choreography vs Orchestration</span></div>
  <h1>🎻 Choreography vs Orchestration &amp; Multi-Phase Commit</h1>
  <p>Two ways to coordinate a distributed workflow, and how they relate to 2PC / 3PC / Sagas</p>
</div>

<div class="ref-section">
  <div class="ref-title">The Core Distinction</div>
  <div class="ref-body">
    <p>Both coordinate a multi-step business process across services. The difference is <strong>where the decision-making authority lives</strong>.</p>
    <div class="flow-box">
      <div class="flow-step">CHOREOGRAPHY — every service reacts to events; no one is in charge</div>
      <div class="flow-arrow">vs</div>
      <div class="flow-step blue">ORCHESTRATION — one coordinator tells each service what to do, in order</div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Choreography — Event-Driven, Decentralised</div>
  <div class="ref-body">
    <div class="code-box">Order Svc            Payment Svc           Inventory Svc          Shipping Svc
    │                     │                      │                      │
    │─OrderPlaced────────►│                      │                      │
    │                     │─PaymentCompleted────────────────────────────►│
    │                     │                      │◄─────────────────────│
    │                     │                      │─StockReserved───────►│
    │                     │                      │                      │─ShipmentCreated

Each service:
  • Subscribes to the events it cares about
  • Does its job
  • Publishes its OWN event
  • Has NO idea who consumes it, or what happens next

No central brain. The "workflow" only exists as an emergent pattern
across independently-deployed event handlers.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Orchestration — Command-Driven, Centralised</div>
  <div class="ref-body">
    <div class="code-box">                    ┌───────────────────────┐
                    │   ORDER ORCHESTRATOR   │   ← owns the workflow
                    └───────────┬────────────┘
             ┌──────────────────┼──────────────────┐
             ▼                  ▼                  ▼
        Payment Svc       Inventory Svc       Shipping Svc
             │                  │                  │
        "ChargeCard"      "ReserveStock"      "CreateShipment"
             │                  │                  │
        result ───────────►  orchestrator  ◄─────── result
                            decides next step,
                            retries, compensates,
                            tracks state

The orchestrator issues explicit COMMANDS ("do this"), waits for the
reply, and owns the entire state machine: what step comes next, what
to do on failure, when the process is complete.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Choreography vs Orchestration — Comparison</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.5fr 1.5fr;">
        <div>Aspect</div><div>Choreography</div><div>Orchestration</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr;">
        <div class="dt-name">Coupling</div><div class="dt-yes">Very loose — services only know event names</div><div>Orchestrator knows every participant</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr;">
        <div class="dt-name">Visibility of the workflow</div><div class="dt-no">Implicit — spread across services and event logs</div><div class="dt-yes">Explicit — one place shows the whole process</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr;">
        <div class="dt-name">Adding a step</div><div class="dt-yes">New service just subscribes — nothing else changes</div><div>Orchestrator must be updated and redeployed</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr;">
        <div class="dt-name">Debugging "why did this fail?"</div><div class="dt-no">Hard — trace scattered across many logs</div><div class="dt-yes">Easy — orchestrator has the full history</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr;">
        <div class="dt-name">Single point of failure</div><div class="dt-yes">None</div><div class="dt-no">Orchestrator itself must be made highly available</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr;">
        <div class="dt-name">Best fit</div><div>Few steps, simple reactions, independent teams</div><div>Complex workflow, many steps, conditional branching</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr;">
        <div class="dt-name">.NET / Azure tooling</div><div>Service Bus topics, Event Grid, MassTransit pub/sub</div><div>Durable Functions, Azure Logic Apps, MassTransit state machine (Saga)</div>
      </div>
    </div>
    <div class="warn-box">⚠️ Common failure mode in choreography: a "cyclic" or "invisible" workflow — service A reacts to B's event, which reacts to C's event, which reacts back to A's event, and nobody can answer "what is the current state of order #4471?" without querying five services. Past 4-5 steps, most teams migrate to orchestration for that reason alone.</div>
    <div class="tip-box">✅ Interview line: "I default to choreography for simple, independent reactions — like 'send an audit event when anything changes' — where I want zero coupling. I switch to orchestration the moment the workflow has real branching, compensation logic, or a timeout/retry policy that needs to be visible and testable in one place."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Where Multi-Phase Commit Fits In</div>
  <div class="ref-body">
    <p>Both patterns above are really different answers to the same underlying problem as <strong>distributed transactions</strong>: how do you keep several independent data stores consistent when one logical operation spans all of them? Multi-phase commit is the classical (pre-microservices) answer; choreography/orchestration with Sagas is the modern one.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Two-Phase Commit (2PC)</div>
  <div class="ref-body">
    <div class="code-box">COORDINATOR                PARTICIPANT A          PARTICIPANT B
     │                          │                      │
PHASE 1 — VOTE (prepare)
     │──"can you commit?"─────►│                      │
     │──"can you commit?"────────────────────────────►│
     │                          │──locks resources─────│
     │◄──"YES, ready"───────────│                      │
     │◄──"YES, ready"──────────────────────────────────│
     │                          │                      │
PHASE 2 — COMMIT (or abort, if ANY participant said no)
     │──"COMMIT"───────────────►│                      │
     │──"COMMIT"──────────────────────────────────────►│
     │                          │──releases locks───────│
     │◄──"done"─────────────────│                      │
     │◄──"done"────────────────────────────────────────│

Every participant holds locks from "prepare" until "commit" arrives.
ALL must agree, or ALL roll back — true ACID across services.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Three-Phase Commit (3PC) — 2PC's Fix For One Failure Mode</div>
  <div class="ref-body">
    <div class="code-box">2PC's weakness: if the coordinator crashes AFTER some participants
committed but BEFORE others heard the decision, those participants
are stuck holding locks indefinitely — "blocking protocol".

3PC adds a middle phase:
  Phase 1  CanCommit?      — same vote as 2PC
  Phase 2  PreCommit       — coordinator tells everyone the vote passed,
                             participants acknowledge but do NOT commit yet
  Phase 3  DoCommit        — final commit signal

This extra round means any participant can safely time out and either
commit or abort using only local knowledge, without waiting forever.
Cost: one more network round-trip, and it still assumes no network
partition — which is why it is rarely used in practice.</div>
    <div class="warn-box">⚠️ Why 2PC/3PC lost to Sagas in microservices: they hold locks across a network call, so total throughput is capped by the slowest participant. A coordinator crash mid-protocol can leave every participant blocked. And it requires every participant to speak the same transaction protocol (XA) — impossible once you mix SQL, NoSQL, and third-party APIs. This is a strong-consistency, low-availability trade-off — the opposite of what most microservice systems need.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">The Saga — The Microservices-Era Replacement</div>
  <div class="ref-body">
    <div class="code-box">Instead of ONE distributed transaction with locks, a Saga is a SEQUENCE
of local transactions, each with a defined COMPENSATION if a later
step fails:

  Step 1   Reserve Payment      compensate → Release Payment
  Step 2   Reserve Inventory    compensate → Release Inventory
  Step 3   Create Shipment      compensate → Cancel Shipment

If Step 3 fails:
  run compensations for Step 2, then Step 1 — in REVERSE order
  → the system ends up in a valid state, just not the ORIGINAL
    intended one (no rollback to a single snapshot, unlike 2PC)

Choreography Saga   → each service knows its own compensation event
Orchestration Saga   → coordinator explicitly calls each compensation</div>

    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.4fr 1.5fr;">
        <div>Aspect</div><div>2PC / 3PC</div><div>Saga (choreography or orchestration)</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.4fr 1.5fr;">
        <div class="dt-name">Consistency</div><div class="dt-yes">Strong — true atomic commit</div><div>Eventual — brief window of partial state</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.4fr 1.5fr;">
        <div class="dt-name">Locking</div><div class="dt-no">Resources locked across the network</div><div class="dt-yes">No cross-service locks — each step commits locally</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.4fr 1.5fr;">
        <div class="dt-name">Availability</div><div class="dt-no">Degrades if any participant is slow/down</div><div class="dt-yes">Each service stays independently available</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.4fr 1.5fr;">
        <div class="dt-name">Failure recovery</div><div>Automatic rollback to original state</div><div>Explicit compensating actions you must write</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.4fr 1.5fr;">
        <div class="dt-name">Fits polyglot persistence?</div><div class="dt-no">Needs a shared transaction protocol (XA)</div><div class="dt-yes">Yes — any datastore, any technology</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.4fr 1.5fr;">
        <div class="dt-name">Where it's still used</div><div>Single database, XA-compliant resource managers</div><div>Microservices, cross-service business processes</div>
      </div>
    </div>
    <div class="tip-box">✅ Closing line for the interview: "2PC gives you correctness by making every participant wait and lock. Sagas give you availability by accepting a short window of inconsistency and defining explicit compensations. In a microservices architecture I choose Sagas almost every time — real distributed ACID across independently-owned services and databases is rarely achievable, and 2PC's locking model does not survive network partitions or partial outages, which are the normal operating condition of a distributed system, not the exception."</div>
  </div>
</div>
`;
