window.Pages['ref-patterns'] = `
<div class="page-header">
  <div class="breadcrumb">Architect Reference › <span>Design Patterns</span></div>
  <h1>🧱 Design Patterns for Architects</h1>
  <p>Creational · Structural · Behavioral · Microservice Patterns — with code examples and when-to-use guidance</p>
</div>

<div class="ref-section">
  <div class="ref-title">Pattern Categories Overview</div>
  <div class="ref-body">
    <div class="three-col">
      <div>
        <div class="ans-label" style="color:#38bdf8;">Creational Patterns</div>
        <p>How objects are created. Decouple object creation from usage.</p>
        <ul><li>Builder</li><li>Factory Method</li><li>Abstract Factory</li><li>Singleton</li><li>Prototype</li></ul>
      </div>
      <div>
        <div class="ans-label" style="color:#4ade80;">Structural Patterns</div>
        <p>How classes/objects are composed to form larger structures.</p>
        <ul><li>Adapter</li><li>Decorator</li><li>Facade</li><li>Proxy</li><li>Composite</li></ul>
      </div>
      <div>
        <div class="ans-label" style="color:#fb923c;">Behavioral Patterns</div>
        <p>How objects interact and distribute responsibility.</p>
        <ul><li>Strategy</li><li>Observer</li><li>Command</li><li>State</li><li>Chain of Responsibility</li></ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Builder Pattern — Creational</div>
  <div class="ref-body">
    <p><strong>When to use:</strong> Object has many optional parameters. Avoid telescoping constructors. Want immutable objects with readable construction.</p>
    <div class="two-col">
      <div>
        <div class="ans-label">Problem (Telescoping Constructor)</div>
        <div class="code-box">// Hard to read. What is true, 30, "IT"?
var emp = new Employee("Mahesh", true,
                       30, "IT", null,
                       false, "Senior");</div>
      </div>
      <div>
        <div class="ans-label">Solution (Builder Pattern)</div>
        <div class="code-box">var emp = new EmployeeBuilder()
  .WithName("Mahesh")
  .WithAge(30)
  .WithDepartment("IT")
  .AsSenior()
  .Build();
// Readable. Self-documenting.</div>
      </div>
    </div>
    <div class="ans-label" style="margin-top:12px;">Real-World Implementation (C#)</div>
    <div class="code-box">public class SystemProperty {
    public string Name  { get; private set; }
    public string Value { get; private set; }
    public string Unit  { get; private set; }

    public class Builder {
        private SystemProperty _p = new();
        public Builder WithName(string n)  { _p.Name  = n; return this; }
        public Builder WithValue(string v) { _p.Value = v; return this; }
        public Builder WithUnit(string u)  { _p.Unit  = u; return this; }
        public SystemProperty Build() {
            if (string.IsNullOrEmpty(_p.Name))
                throw new InvalidOperationException("Name required");
            return _p;
        }
    }
}
// Usage
var prop = new SystemProperty.Builder()
    .WithName("Temperature").WithValue("35").WithUnit("°C").Build();</div>
    <div class="tip-box" style="margin-top:10px;">✅ Add validation inside Build() — enforce required fields before object is created.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Strategy Pattern — Behavioral</div>
  <div class="ref-body">
    <p><strong>When to use:</strong> Multiple algorithms that are interchangeable at runtime. Avoids large if/switch chains.</p>
    <div class="code-box">interface IPaymentStrategy { void Pay(decimal amount); }

class CreditCardPayment : IPaymentStrategy {
    public void Pay(decimal amount) { /* credit card logic */ }
}
class UpiPayment : IPaymentStrategy {
    public void Pay(decimal amount) { /* UPI logic */ }
}
class NetBankingPayment : IPaymentStrategy {
    public void Pay(decimal amount) { /* net banking logic */ }
}

class PaymentContext {
    private IPaymentStrategy _strategy;
    public PaymentContext(IPaymentStrategy strategy) { _strategy = strategy; }
    public void Execute(decimal amount) => _strategy.Pay(amount);
}

// Runtime selection
var ctx = new PaymentContext(new UpiPayment());
ctx.Execute(500m);  // Swap strategy without changing PaymentContext</div>
    <div class="tip-box" style="margin-top:10px;">✅ Open/Closed Principle: add new payment methods without modifying existing code.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Observer Pattern — Behavioral</div>
  <div class="ref-body">
    <p><strong>When to use:</strong> One-to-many dependency. When one object changes state, all dependents are notified automatically.</p>
    <div class="two-col">
      <div>
        <div class="code-box">// Publisher (Subject)
class OrderService {
    private List&lt;IOrderObserver&gt; _observers = new();

    public void Subscribe(IOrderObserver o)
        => _observers.Add(o);

    public void PlaceOrder(Order order) {
        SaveToDb(order);
        // Notify all observers
        _observers.ForEach(o =>
            o.OnOrderCreated(order));
    }
}

// Subscribers
class EmailService  : IOrderObserver { ... }
class SmsService    : IOrderObserver { ... }
class AuditService  : IOrderObserver { ... }</div>
      </div>
      <div>
        <div class="ans-label">Real-World Mapping</div>
        <div class="code-box">Pattern           → Real World
─────────────────────────────
Subject           → Kafka Topic
Observer/Handler  → Consumer Service

OrderCreated event
  → EmailService subscribes
  → SmsService subscribes
  → InventoryService subscribes
  → AuditService subscribes

Each reacts independently.
Publisher doesn't know who listens.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">State Pattern — Behavioral</div>
  <div class="ref-body">
    <p><strong>When to use:</strong> Object behavior changes based on internal state. Avoid large switch/if chains on state. Each state encapsulates its own transitions.</p>
    <div class="two-col">
      <div>
        <div class="code-box">interface IOrderState {
    void Confirm(Order order);
    void Ship(Order order);
    void Deliver(Order order);
    void Cancel(Order order);
}

class PendingState : IOrderState {
    public void Confirm(Order o)
        => o.SetState(new ConfirmedState());
    public void Ship(Order o)
        => throw new InvalidOpException(
             "Cannot ship unconfirmed order");
    public void Cancel(Order o)
        => o.SetState(new CancelledState());
}</div>
      </div>
      <div>
        <div class="ans-label">Valid State Transitions</div>
        <div class="code-box">Pending
  → Confirmed  (after payment)
  → Cancelled  (by customer)

Confirmed
  → Shipped    (after dispatch)
  → Cancelled  (before ship)

Shipped
  → Delivered  (on receipt)
  → Returned   (customer return)

Delivered
  → Returned   (within window)
  ✗ Cannot go back to Pending</div>
        <div class="tip-box" style="margin-top:8px;">✅ Tools: Stateless (.NET), AWS Step Functions, Azure Durable Functions</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Command Pattern — Behavioral</div>
  <div class="ref-body">
    <p><strong>When to use:</strong> Encapsulate requests as objects. Supports undo/redo, queuing, logging of operations.</p>
    <div class="code-box">interface ICommand { void Execute(); void Undo(); }

class ApproveLoanCommand : ICommand {
    public void Execute() { loan.Status = "Approved"; auditLog.Write("Approved"); }
    public void Undo()    { loan.Status = "Pending";  auditLog.Write("Approval reverted"); }
}

// Command invoker — queues and executes commands
class LoanCommandInvoker {
    private Stack&lt;ICommand&gt; _history = new();
    public void Run(ICommand cmd) { cmd.Execute(); _history.Push(cmd); }
    public void UndoLast()        { _history.Pop().Undo(); }
}

// In microservices → Command = event on Kafka/Service Bus
// ApproveOrderCommand published → consumed by Order Service</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Singleton Pattern — Creational (and its problems)</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Classic Singleton (thread-safe C#)</div>
        <div class="code-box">public sealed class ConfigManager {
    private static readonly Lazy&lt;ConfigManager&gt; _instance
        = new(() => new ConfigManager());

    private ConfigManager() { Load(); }

    public static ConfigManager Instance
        => _instance.Value;

    public string GetSetting(string key) { ... }
}</div>
      </div>
      <div>
        <div class="ans-label">Problems with Singleton</div>
        <ul style="margin-bottom:10px;">
          <li><strong>Hard to test</strong> — can't mock a static instance</li>
          <li><strong>Global state</strong> — hidden dependencies</li>
          <li><strong>Tight coupling</strong> — all classes depend on same object</li>
          <li><strong>Thread safety</strong> — if mutable, race conditions</li>
          <li><strong>Memory</strong> — lives for entire app lifetime</li>
        </ul>
        <div class="ans-label">Better: Dependency Injection</div>
        <div class="code-box">// Register once, inject anywhere
services.AddSingleton&lt;IConfig, Config&gt;();

// Testable: mock IConfig in unit tests
// No hidden static dependencies</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Microservice-Specific Patterns — Architect Reference</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Pattern</div><div>Problem</div><div>Solution</div><div>Tools (.NET)</div></div>
      <div class="pt-row"><div class="pt-name">Circuit Breaker</div><div>Downstream service is slow/down — caller keeps trying</div><div>After N failures, open circuit → fast-fail for cooldown period</div><div>Polly CircuitBreakerPolicy</div></div>
      <div class="pt-row"><div class="pt-name">Retry</div><div>Transient failures (network blip, timeout)</div><div>Automatically retry with exponential backoff + jitter</div><div>Polly RetryPolicy</div></div>
      <div class="pt-row"><div class="pt-name">Bulkhead</div><div>One slow service consumes all thread pool threads</div><div>Separate thread pools per downstream dependency</div><div>Polly BulkheadPolicy</div></div>
      <div class="pt-row"><div class="pt-name">API Gateway</div><div>Clients call many services directly</div><div>Single entry: auth, rate limit, routing, aggregation</div><div>Azure APIM, Ocelot, YARP</div></div>
      <div class="pt-row"><div class="pt-name">Strangler Fig</div><div>Migrating monolith incrementally</div><div>Route traffic to new service, strangle old module</div><div>Azure API Management routing</div></div>
      <div class="pt-row"><div class="pt-name">Sidecar</div><div>Cross-cutting concerns repeated in every service</div><div>Inject a proxy container alongside app container</div><div>Istio Envoy, Dapr</div></div>
      <div class="pt-row"><div class="pt-name">Outbox</div><div>Publish event only if DB write succeeds</div><div>Write event to outbox table in same DB transaction</div><div>MassTransit Outbox, custom</div></div>
    </div>
    <div class="ans-label" style="margin-top:14px;">Circuit Breaker States</div>
    <div class="code-box">Closed (normal)
  → request flows through
  → failure count increments on error

Open (tripped)
  → after 5 failures in 10 seconds
  → all calls fast-fail immediately (no waiting)
  → after 30 seconds cooldown...

Half-Open (testing)
  → allow 1 test request through
  → if success → back to Closed
  → if failure → back to Open</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">SOLID Principles — Architect Foundation</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Principle</div><div>Meaning</div><div>Violated Example</div><div>Fixed With</div></div>
      <div class="pt-row"><div class="pt-name">S — Single Responsibility</div><div>One class, one reason to change</div><div>OrderService that handles orders + emails + logging</div><div>Separate OrderService, EmailService, Logger</div></div>
      <div class="pt-row"><div class="pt-name">O — Open/Closed</div><div>Open for extension, closed for modification</div><div>if (payment == "UPI") ... else if (payment == "Card")</div><div>Strategy pattern — add new class, don't modify existing</div></div>
      <div class="pt-row"><div class="pt-name">L — Liskov Substitution</div><div>Subclass must be substitutable for base class</div><div>Square extends Rectangle breaks area calculation</div><div>Prefer composition over inheritance</div></div>
      <div class="pt-row"><div class="pt-name">I — Interface Segregation</div><div>Don't force classes to implement unused methods</div><div>IBird with Fly() forced on Penguin</div><div>IFlyingBird, ISwimmingBird separate interfaces</div></div>
      <div class="pt-row"><div class="pt-name">D — Dependency Inversion</div><div>Depend on abstractions, not concretions</div><div>OrderService creates new SqlRepository() directly</div><div>Inject IRepository via DI container</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Interview Summary — Architect-Level Answer</div>
  <div class="ref-body">
    <div class="code-box">Q: Which design patterns do you use most and why?

A: At application level:
   - Builder: constructing complex objects (request/response models, system config)
   - Strategy: pluggable algorithms (payment methods, export formats, pricing rules)
   - Observer: event notification within a service (domain events)
   - State: order/workflow lifecycle management

   At microservice level:
   - Circuit Breaker + Retry (Polly): every outbound HTTP call
   - Saga: distributed transactions across services
   - Outbox: guaranteed event publishing
   - CQRS: separating read models from write models for performance
   - Sidecar: cross-cutting concerns via Istio (mTLS, tracing)
   - Strangler Fig: incremental monolith migration

   I apply SOLID principles throughout to keep code testable,
   extensible, and loosely coupled.</div>
  </div>
</div>
`;
