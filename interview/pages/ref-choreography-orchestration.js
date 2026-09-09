window.Pages['ref-choreo-orch'] = `
<div class="page-header">
  <div class="breadcrumb">Architecture › <span>Choreography vs Orchestration</span></div>
  <h1>🎻 Choreography vs Orchestration &amp; Multi-Phase Commit</h1>
  <p>Two ways to coordinate a distributed workflow, and how they relate to 2PC / 3PC / Sagas</p>
</div>

<div class="ref-section">
  <div class="ref-title">At A Glance</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step">Every service reacts to events<br><span style="font-weight:400;font-size:11px;">no one is in charge</span></div>
      <div class="flow-arrow">CHOREOGRAPHY vs ORCHESTRATION</div>
      <div class="flow-step blue">One coordinator issues commands<br><span style="font-weight:400;font-size:11px;">owns the workflow</span></div>
    </div>
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">📡</div><div class="principle-name">Choreography</div><p>Pub/Sub events, zero central authority, loose coupling</p></div>
      <div class="principle-card"><div class="principle-icon">🎯</div><div class="principle-name">Orchestration</div><p>A coordinator commands each step, tracks state</p></div>
      <div class="principle-card"><div class="principle-icon">🔒</div><div class="principle-name">2PC / 3PC</div><p>Classical distributed transaction — lock, vote, commit</p></div>
      <div class="principle-card"><div class="principle-icon">↩️</div><div class="principle-name">Saga</div><p>Local transactions + compensations — the modern answer</p></div>
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

    <div class="ans-block"><div class="ans-label">In code — MassTransit over Azure Service Bus</div>
    <div class="code-box">// ── Order Service — publishes only. Doesn't know who's listening. ──
public class PlaceOrderConsumer : IConsumer&lt;PlaceOrder&gt;
{
    public async Task Consume(ConsumeContext&lt;PlaceOrder&gt; ctx)
    {
        var order = await _orders.CreateAsync(ctx.Message);

        await ctx.Publish(new OrderPlaced           // fire the event, forget it
        {
            OrderId = order.Id,
            Amount  = order.Total
        });
    }
}

// ── Payment Service — reacts to OrderPlaced, publishes its own event ──
public class OrderPlacedConsumer : IConsumer&lt;OrderPlaced&gt;
{
    public async Task Consume(ConsumeContext&lt;OrderPlaced&gt; ctx)
    {
        var result = await _payments.ChargeAsync(ctx.Message.OrderId, ctx.Message.Amount);

        if (result.Success)
            await ctx.Publish(new PaymentCompleted { OrderId = ctx.Message.OrderId });
        else
            await ctx.Publish(new PaymentFailed    { OrderId = ctx.Message.OrderId });
        // Payment Service has NO idea Inventory or Shipping even exist.
    }
}

// ── Inventory Service — reacts to PaymentCompleted, on its own ──
public class PaymentCompletedConsumer : IConsumer&lt;PaymentCompleted&gt;
{
    public async Task Consume(ConsumeContext&lt;PaymentCompleted&gt; ctx)
    {
        await _inventory.ReserveStockAsync(ctx.Message.OrderId);
        await ctx.Publish(new StockReserved { OrderId = ctx.Message.OrderId });
    }
}

// Program.cs — each service registers ONLY what it consumes; no wiring
// between services exists anywhere in code. The broker is the only link.
services.AddMassTransit(x =&gt;
{
    x.AddConsumer&lt;PaymentCompletedConsumer&gt;();
    x.UsingAzureServiceBus((ctx, cfg) =&gt;
    {
        cfg.Host(connectionString);
        cfg.ConfigureEndpoints(ctx);          // topic per event type
    });
});</div></div>
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

    <div class="ans-block"><div class="ans-label">In code — Azure Durable Functions orchestrator</div>
    <div class="code-box">// The orchestrator function IS the visible state machine —
// every step, retry, and compensation lives in ONE place, in order.
[Function(nameof(OrderOrchestrator))]
public async Task&lt;OrderResult&gt; RunOrchestrator(
    [OrchestrationTrigger] TaskOrchestrationContext ctx)
{
    var order = ctx.GetInput&lt;OrderRequest&gt;();
    var retry = TaskOptions.FromRetryPolicy(
        new RetryPolicy(maxNumberOfAttempts: 3, firstRetryInterval: TimeSpan.FromSeconds(5)));

    try
    {
        // STEP 1 — explicit command, orchestrator WAITS for the reply
        var payment = await ctx.CallActivityAsync&lt;PaymentResult&gt;(
            nameof(ChargeCardActivity), order, retry);

        // STEP 2 — only runs because step 1 succeeded; orchestrator decides
        var stock = await ctx.CallActivityAsync&lt;StockResult&gt;(
            nameof(ReserveStockActivity), order, retry);

        // STEP 3
        var shipment = await ctx.CallActivityAsync&lt;ShipmentResult&gt;(
            nameof(CreateShipmentActivity), order, retry);

        return OrderResult.Success(shipment.TrackingId);
    }
    catch (TaskFailedException ex)
    {
        // ORCHESTRATOR owns compensation — reverse whatever already committed
        await ctx.CallActivityAsync(nameof(ReleaseStockActivity), order);
        await ctx.CallActivityAsync(nameof(RefundPaymentActivity), order);
        return OrderResult.Failed(ex.FailureDetails.ErrorMessage);
    }
}
// Durable Functions checkpoints state after every awaited activity, so a
// crash mid-workflow resumes exactly where it left off — no lost steps.</div></div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Side By Side — The Same Workflow, Two Ways</div>
  <div class="ref-body">
    <div class="code-box">CHOREOGRAPHY                              ORCHESTRATION
─────────────                              ─────────────
OrderService                                     OrderOrchestrator
  publish OrderPlaced ──┐                          │
                        ▼                    call ChargeCard ───────► PaymentService
PaymentService ◄────────┘                          │◄──── result ────────┘
  publish PaymentCompleted ──┐                call ReserveStock ─────► InventoryService
                             ▼                      │◄──── result ────────┘
InventoryService ◄───────────┘                call CreateShipment ───► ShippingService
  publish StockReserved ──┐                         │◄──── result ────────┘
                          ▼                          ▼
ShippingService ◄─────────┘                    OrderResult

No box "knows" the whole picture.          ONE box knows the ENTIRE picture.
Find it by reading 4 codebases.            Find it by reading 1 function.</div>
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

    <div class="ans-block"><div class="ans-label">In code — .NET's built-in 2PC (why it's rarely usable across microservices)</div>
    <div class="code-box">// TransactionScope promotes to a DISTRIBUTED transaction (MSDTC/2PC)
// the moment a SECOND durable resource enrolls — entirely automatic.
using (var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
{
    using var connA = new SqlConnection(accountsDbConnStr);
    await connA.OpenAsync();
    await connA.ExecuteAsync("UPDATE Accounts SET Balance -= @amt WHERE Id=@id", args);

    using var connB = new SqlConnection(ledgerDbConnStr);   // 2nd resource →
    await connB.OpenAsync();                                 // DTC coordinator
    await connB.ExecuteAsync("INSERT INTO Ledger ...", args);  // kicks in HERE

    scope.Complete();   // PHASE 2: both connections commit together, or
}                        // neither does if scope.Complete() is never called

// WHY THIS DOESN'T WORK FOR MICROSERVICES:
//   • Both databases must be MSDTC-capable (SQL Server does; many don't)
//   • A REST/HTTP call to another service cannot enrol in this transaction
//   • Locks held on BOTH databases for the full scope — killed throughput
//   • This is fine for two tables in the SAME service. It is NOT a
//     cross-microservice solution — that is exactly why Sagas exist.</div></div>
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

    <div class="ans-block"><div class="ans-label">In code — Orchestration-style Saga with explicit compensation</div>
    <div class="code-box">public class OrderSaga
{
    // Each step pairs an ACTION with its COMPENSATION — defined together,
    // so nobody can add a step and forget how to undo it.
    private readonly List&lt;(Func&lt;Order, Task&gt; Do, Func&lt;Order, Task&gt; Undo)&gt; _steps = new()
    {
        (order =&gt; _payments.ReserveAsync(order),   order =&gt; _payments.ReleaseAsync(order)),
        (order =&gt; _inventory.ReserveAsync(order),  order =&gt; _inventory.ReleaseAsync(order)),
        (order =&gt; _shipping.CreateAsync(order),    order =&gt; _shipping.CancelAsync(order)),
    };

    public async Task&lt;SagaResult&gt; RunAsync(Order order)
    {
        var completed = new Stack&lt;Func&lt;Order, Task&gt;&gt;();   // undo actions, in order

        foreach (var (doStep, undoStep) in _steps)
        {
            try
            {
                await doStep(order);
                completed.Push(undoStep);              // only remember on SUCCESS
            }
            catch (Exception ex)
            {
                // Compensate everything that DID succeed — REVERSE order
                while (completed.Count &gt; 0)
                    await completed.Pop().Invoke(order);

                return SagaResult.Failed(ex.Message);   // valid end state,
            }                                            // just not the intended one
        }
        return SagaResult.Success();
    }
}</div></div>

    <div class="ans-block"><div class="ans-label">In code — Choreography-style Saga: each service owns its own compensation</div>
    <div class="code-box">// No central saga object. Inventory Service reacts to a FAILURE event
// from further down the chain and undoes ONLY its own piece.
public class ShipmentFailedConsumer : IConsumer&lt;ShipmentFailed&gt;
{
    public async Task Consume(ConsumeContext&lt;ShipmentFailed&gt; ctx)
    {
        await _inventory.ReleaseStockAsync(ctx.Message.OrderId);   // undo MY step
        await ctx.Publish(new StockReleased { OrderId = ctx.Message.OrderId });
        // Payment Service independently listens for StockReleased and
        // refunds on its own — nobody orchestrates the unwind centrally.
    }
}</div></div>

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
