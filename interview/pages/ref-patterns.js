window.Pages['ref-patterns'] = `
<div class="page-header">
  <div class="breadcrumb">Architect Reference › <span>Design Patterns</span></div>
  <h1>🧱 Design Patterns for Architects</h1>
  <p>Creational · Structural · Behavioral · Microservice Patterns — with code examples and when-to-use guidance</p>
</div>

<style>
.pattern-catalog { display:flex; flex-direction:column; gap:28px; }
.pattern-catalog-group { }
.pattern-catalog-group-label {
  font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase;
  padding:4px 10px; border-radius:4px; display:inline-block; margin-bottom:12px;
}
.pcg-creational  { background:#1e3a5f; color:#38bdf8; }
.pcg-structural  { background:#1a3a2a; color:#4ade80; }
.pcg-behavioral  { background:#3a2010; color:#fb923c; }
.pcg-microservice{ background:#2a1a3a; color:#c084fc; }
.pattern-cards   { display:flex; flex-wrap:wrap; gap:12px; }
.pattern-card {
  display:flex; flex-direction:column; align-items:center;
  background:#1e2a3a; border:1px solid #2d3f50; border-radius:10px;
  padding:14px 12px 12px; width:130px; cursor:default;
  transition:border-color .2s, transform .15s;
}
.pattern-card:hover { border-color:#38bdf8; transform:translateY(-2px); }
.pattern-card img {
  width:80px; height:80px; object-fit:contain; margin-bottom:10px;
  border-radius:6px;
}
.pattern-card .pc-name {
  font-size:12px; font-weight:600; color:#e2e8f0; text-align:center;
  margin-bottom:5px; line-height:1.3;
}
.pattern-card .pc-desc {
  font-size:10.5px; color:#94a3b8; text-align:center; line-height:1.4;
}
.pattern-card .pc-badge {
  font-size:9px; font-weight:700; letter-spacing:.06em; text-transform:uppercase;
  padding:2px 6px; border-radius:3px; margin-bottom:7px;
}
.pcb-c { background:#1e3a5f; color:#38bdf8; }
.pcb-s { background:#1a3a2a; color:#4ade80; }
.pcb-b { background:#3a2010; color:#fb923c; }
.pcb-m { background:#2a1a3a; color:#c084fc; }
</style>

<div class="ref-section">
  <div class="ref-title">Pattern Catalog — Visual Overview</div>
  <div class="ref-body">
    <div class="pattern-catalog">

      <div class="pattern-catalog-group">
        <div class="pattern-catalog-group-label pcg-creational">Creational — How objects are created</div>
        <div class="pattern-cards">
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/builder-mini.png" alt="Builder" onerror="this.style.display='none'">
            <div class="pc-badge pcb-c">Creational</div>
            <div class="pc-name">Builder</div>
            <div class="pc-desc">Construct complex objects step-by-step using a fluent API</div>
          </div>
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/factory-method-mini.png" alt="Factory Method" onerror="this.style.display='none'">
            <div class="pc-badge pcb-c">Creational</div>
            <div class="pc-name">Factory Method</div>
            <div class="pc-desc">Let subclasses decide which concrete class to instantiate</div>
          </div>
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/abstract-factory-mini.png" alt="Abstract Factory" onerror="this.style.display='none'">
            <div class="pc-badge pcb-c">Creational</div>
            <div class="pc-name">Abstract Factory</div>
            <div class="pc-desc">Create families of related objects without specifying concrete classes</div>
          </div>
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/singleton-mini.png" alt="Singleton" onerror="this.style.display='none'">
            <div class="pc-badge pcb-c">Creational</div>
            <div class="pc-name">Singleton</div>
            <div class="pc-desc">Ensure a class has only one instance with global access</div>
          </div>
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/prototype-mini.png" alt="Prototype" onerror="this.style.display='none'">
            <div class="pc-badge pcb-c">Creational</div>
            <div class="pc-name">Prototype</div>
            <div class="pc-desc">Clone existing objects instead of creating from scratch</div>
          </div>
        </div>
      </div>

      <div class="pattern-catalog-group">
        <div class="pattern-catalog-group-label pcg-structural">Structural — How classes and objects are composed</div>
        <div class="pattern-cards">
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/adapter-mini.png" alt="Adapter" onerror="this.style.display='none'">
            <div class="pc-badge pcb-s">Structural</div>
            <div class="pc-name">Adapter</div>
            <div class="pc-desc">Wrap an incompatible interface so it works with your code</div>
          </div>
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/decorator-mini.png" alt="Decorator" onerror="this.style.display='none'">
            <div class="pc-badge pcb-s">Structural</div>
            <div class="pc-name">Decorator</div>
            <div class="pc-desc">Add behaviors to objects at runtime by wrapping them</div>
          </div>
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/facade-mini.png" alt="Facade" onerror="this.style.display='none'">
            <div class="pc-badge pcb-s">Structural</div>
            <div class="pc-name">Facade</div>
            <div class="pc-desc">Provide a simple interface to a complex subsystem</div>
          </div>
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/proxy-mini.png" alt="Proxy" onerror="this.style.display='none'">
            <div class="pc-badge pcb-s">Structural</div>
            <div class="pc-name">Proxy</div>
            <div class="pc-desc">Control access to an object — add caching, auth, logging</div>
          </div>
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/composite-mini.png" alt="Composite" onerror="this.style.display='none'">
            <div class="pc-badge pcb-s">Structural</div>
            <div class="pc-name">Composite</div>
            <div class="pc-desc">Treat individual objects and trees of objects uniformly</div>
          </div>
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/bridge-mini.png" alt="Bridge" onerror="this.style.display='none'">
            <div class="pc-badge pcb-s">Structural</div>
            <div class="pc-name">Bridge</div>
            <div class="pc-desc">Split abstraction from implementation so they vary independently</div>
          </div>
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/flyweight-mini.png" alt="Flyweight" onerror="this.style.display='none'">
            <div class="pc-badge pcb-s">Structural</div>
            <div class="pc-name">Flyweight</div>
            <div class="pc-desc">Share common state across many fine-grained objects to save memory</div>
          </div>
        </div>
      </div>

      <div class="pattern-catalog-group">
        <div class="pattern-catalog-group-label pcg-behavioral">Behavioral — How objects interact and share responsibility</div>
        <div class="pattern-cards">
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/strategy-mini.png" alt="Strategy" onerror="this.style.display='none'">
            <div class="pc-badge pcb-b">Behavioral</div>
            <div class="pc-name">Strategy</div>
            <div class="pc-desc">Swap algorithms at runtime without changing the calling code</div>
          </div>
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/observer-mini.png" alt="Observer" onerror="this.style.display='none'">
            <div class="pc-badge pcb-b">Behavioral</div>
            <div class="pc-name">Observer</div>
            <div class="pc-desc">Notify multiple dependents automatically when state changes</div>
          </div>
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/command-mini.png" alt="Command" onerror="this.style.display='none'">
            <div class="pc-badge pcb-b">Behavioral</div>
            <div class="pc-name">Command</div>
            <div class="pc-desc">Encapsulate requests as objects — enables undo, queue, log</div>
          </div>
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/state-mini.png" alt="State" onerror="this.style.display='none'">
            <div class="pc-badge pcb-b">Behavioral</div>
            <div class="pc-name">State</div>
            <div class="pc-desc">Change object behavior when its internal state changes</div>
          </div>
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/chain-of-responsibility-mini.png" alt="Chain of Responsibility" onerror="this.style.display='none'">
            <div class="pc-badge pcb-b">Behavioral</div>
            <div class="pc-name">Chain of Responsibility</div>
            <div class="pc-desc">Pass requests along a handler chain until one processes it</div>
          </div>
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/template-method-mini.png" alt="Template Method" onerror="this.style.display='none'">
            <div class="pc-badge pcb-b">Behavioral</div>
            <div class="pc-name">Template Method</div>
            <div class="pc-desc">Define an algorithm skeleton; subclasses fill in specific steps</div>
          </div>
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/mediator-mini.png" alt="Mediator" onerror="this.style.display='none'">
            <div class="pc-badge pcb-b">Behavioral</div>
            <div class="pc-name">Mediator</div>
            <div class="pc-desc">Route communication through a central hub to reduce coupling</div>
          </div>
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/iterator-mini.png" alt="Iterator" onerror="this.style.display='none'">
            <div class="pc-badge pcb-b">Behavioral</div>
            <div class="pc-name">Iterator</div>
            <div class="pc-desc">Traverse a collection without exposing its internal structure</div>
          </div>
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/memento-mini.png" alt="Memento" onerror="this.style.display='none'">
            <div class="pc-badge pcb-b">Behavioral</div>
            <div class="pc-name">Memento</div>
            <div class="pc-desc">Capture and restore an object's state without breaking encapsulation</div>
          </div>
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/visitor-mini.png" alt="Visitor" onerror="this.style.display='none'">
            <div class="pc-badge pcb-b">Behavioral</div>
            <div class="pc-name">Visitor</div>
            <div class="pc-desc">Add new operations to objects without modifying their classes</div>
          </div>
        </div>
      </div>

      <div class="pattern-catalog-group">
        <div class="pattern-catalog-group-label pcg-microservice">Microservice Patterns — Distributed system resilience</div>
        <div class="pattern-cards">
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/proxy-mini.png" alt="Circuit Breaker" onerror="this.style.display='none'">
            <div class="pc-badge pcb-m">Microservice</div>
            <div class="pc-name">Circuit Breaker</div>
            <div class="pc-desc">Stop calling a failing service; fast-fail during cooldown</div>
          </div>
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/command-mini.png" alt="CQRS" onerror="this.style.display='none'">
            <div class="pc-badge pcb-m">Microservice</div>
            <div class="pc-name">CQRS</div>
            <div class="pc-desc">Separate read and write models for independent scaling</div>
          </div>
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/chain-of-responsibility-mini.png" alt="Saga" onerror="this.style.display='none'">
            <div class="pc-badge pcb-m">Microservice</div>
            <div class="pc-name">Saga</div>
            <div class="pc-desc">Coordinate distributed transactions with compensating rollbacks</div>
          </div>
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/observer-mini.png" alt="Outbox" onerror="this.style.display='none'">
            <div class="pc-badge pcb-m">Microservice</div>
            <div class="pc-name">Outbox</div>
            <div class="pc-desc">Guarantee event publishing only when DB write succeeds</div>
          </div>
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/facade-mini.png" alt="API Gateway" onerror="this.style.display='none'">
            <div class="pc-badge pcb-m">Microservice</div>
            <div class="pc-name">API Gateway</div>
            <div class="pc-desc">Single entry point for auth, routing, and aggregation</div>
          </div>
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/decorator-mini.png" alt="Sidecar" onerror="this.style.display='none'">
            <div class="pc-badge pcb-m">Microservice</div>
            <div class="pc-name">Sidecar</div>
            <div class="pc-desc">Inject cross-cutting concerns alongside the app container</div>
          </div>
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/state-mini.png" alt="Event Sourcing" onerror="this.style.display='none'">
            <div class="pc-badge pcb-m">Microservice</div>
            <div class="pc-name">Event Sourcing</div>
            <div class="pc-desc">Store a log of events as the source of truth; replay to rebuild state</div>
          </div>
          <div class="pattern-card">
            <img src="https://refactoring.guru/images/patterns/cards/adapter-mini.png" alt="Strangler Fig" onerror="this.style.display='none'">
            <div class="pc-badge pcb-m">Microservice</div>
            <div class="pc-name">Strangler Fig</div>
            <div class="pc-desc">Incrementally replace a monolith by routing traffic to new services</div>
          </div>
        </div>
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
  <div class="ref-title">Factory Method Pattern — Creational</div>
  <div class="ref-body">
    <p><strong>When to use:</strong> Let subclasses decide which class to instantiate. Decouple object creation from the code that uses the object. Add new types without modifying existing code.</p>
    <div class="two-col">
      <div>
        <div class="ans-label">Problem Without Factory</div>
        <div class="code-box">// Tight coupling — must change this code
// every time a new notification type is added
if (type == "email") return new EmailNotifier();
else if (type == "sms") return new SmsNotifier();
else if (type == "push") return new PushNotifier();
// Adding Slack requires modifying this block ❌</div>
      </div>
      <div>
        <div class="ans-label">Factory Method Solution (C#)</div>
        <div class="code-box">abstract class NotifierFactory {
    public abstract INotifier Create(); // factory method
    public void Notify(string msg) {
        var notifier = Create();
        notifier.Send(msg);
    }
}
class EmailNotifierFactory : NotifierFactory {
    public override INotifier Create()
        => new EmailNotifier();
}
class SlackNotifierFactory : NotifierFactory {
    public override INotifier Create()
        => new SlackNotifier(); // new type, no change above ✅
}</div>
      </div>
    </div>
    <div class="tip-box" style="margin-top:10px;">✅ Satisfies Open/Closed Principle — extend by adding new factory subclasses, never by modifying existing ones.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Abstract Factory Pattern — Creational</div>
  <div class="ref-body">
    <p><strong>When to use:</strong> Create families of related objects without specifying concrete classes. Ensures product compatibility across a family (e.g. UI components for Windows vs Mac).</p>
    <div class="two-col">
      <div>
        <div class="ans-label">Abstract Factory (C#)</div>
        <div class="code-box">// Abstract factory — family of related objects
interface IUIFactory {
    IButton   CreateButton();
    ITextBox  CreateTextBox();
    ICheckBox CreateCheckBox();
}

// Windows family
class WindowsUIFactory : IUIFactory {
    public IButton   CreateButton()   => new WinButton();
    public ITextBox  CreateTextBox()  => new WinTextBox();
    public ICheckBox CreateCheckBox() => new WinCheckBox();
}

// Mac family
class MacUIFactory : IUIFactory {
    public IButton   CreateButton()   => new MacButton();
    public ITextBox  CreateTextBox()  => new MacTextBox();
    public ICheckBox CreateCheckBox() => new MacCheckBox();
}

// Consumer — doesn't know which concrete classes it's using
class Application {
    private readonly IUIFactory _factory;
    public Application(IUIFactory factory) {
        _factory = factory;
    }
    public void Render() {
        var btn = _factory.CreateButton();
        var txt = _factory.CreateTextBox();
        btn.Render(); txt.Render();
    }
}</div>
      </div>
      <div>
        <div class="ans-label">vs. Factory Method</div>
        <div class="code-box">Factory Method
  → One product type
  → Subclass decides which
     concrete product to make

Abstract Factory
  → Family of related products
  → Entire factory swapped
     to switch product family

Real-World Examples:
─────────────────────────────
Abstract Factory → DB provider
  SqlFactory:  SqlConnection,
               SqlCommand,
               SqlDataReader

  CosmosFactory: CosmosClient,
                 CosmosQuery,
                 CosmosCursor

// Swap entire DB family
// without changing business logic</div>
        <div class="tip-box" style="margin-top:8px;">✅ Used in .NET: DbProviderFactory, ILoggerFactory, IHostBuilder</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Prototype Pattern — Creational</div>
  <div class="ref-body">
    <p><strong>When to use:</strong> Creating objects is expensive (DB load, complex init). Clone an existing object rather than constructing from scratch. Useful for object templates and copying game/UI objects.</p>
    <div class="two-col">
      <div>
        <div class="ans-label">Prototype in C#</div>
        <div class="code-box">public class ReportTemplate : ICloneable {
    public string  Title    { get; set; }
    public string  Layout   { get; set; }
    public List&lt;string&gt; Sections { get; set; }

    // Shallow clone via ICloneable
    public object Clone() => MemberwiseClone();

    // Deep clone for reference types
    public ReportTemplate DeepClone() {
        var clone = (ReportTemplate)MemberwiseClone();
        clone.Sections = new List&lt;string&gt;(Sections);
        return clone;
    }
}

// Usage — base template cloned per customer
var baseTemplate = new ReportTemplate {
    Title    = "Monthly Report",
    Layout   = "Standard",
    Sections = new() { "Summary", "Details" }
};
var customReport = baseTemplate.DeepClone();
customReport.Title = "Acme - Monthly Report";</div>
      </div>
      <div>
        <div class="ans-label">Shallow vs Deep Clone</div>
        <div class="code-box">Shallow Clone (MemberwiseClone)
  → Copies value types by value ✅
  → Copies reference types by ref ⚠️
  → Both original and clone share
     the same List/object instance

Deep Clone
  → Copies reference types too ✅
  → Original and clone are fully
     independent

Rule:
  If your object has List, Dictionary,
  nested objects → always deep clone
  to avoid shared state bugs.</div>
        <div class="tip-box" style="margin-top:8px;">✅ Real use: configuration templates, test data factories, game entity spawning.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Adapter Pattern — Structural</div>
  <div class="ref-body">
    <p><strong>When to use:</strong> Integrate third-party or legacy code with an incompatible interface. Wrap the external class behind your own interface so you can swap it out later.</p>
    <div class="two-col">
      <div>
        <div class="ans-label">Adapter (C#)</div>
        <div class="code-box">// Legacy / third-party — can't modify
class LegacySmsGateway {
    public void SendTextMessage(
        string phoneNo, string content) { ... }
}

// Your system expects this interface
interface INotificationService {
    void Send(string recipient, string message);
}

// Adapter bridges the gap
class SmsGatewayAdapter : INotificationService {
    private readonly LegacySmsGateway _gateway;
    public SmsGatewayAdapter(LegacySmsGateway g)
        => _gateway = g;

    public void Send(string recipient, string message)
        => _gateway.SendTextMessage(recipient, message);
}

// Consumer uses your interface — legacy code hidden
INotificationService svc =
    new SmsGatewayAdapter(new LegacySmsGateway());
svc.Send("+1-555-0100", "Your order shipped!");</div>
      </div>
      <div>
        <div class="ans-label">Real-World Scenarios</div>
        <div class="code-box">Scenario 1: Payment gateway swap
  Your code → IPaymentGateway
  Adapter wraps Stripe SDK
  Adapter wraps PayPal SDK
  Swap providers without changing
  business logic ✅

Scenario 2: Legacy DB migration
  New code → IRepository
  SqlAdapter   → old SqlServer DB
  CosmosAdapter → new Cosmos DB
  Run both during migration
  via feature flag ✅

Scenario 3: Third-party logging
  ILogger (your interface)
  Log4NetAdapter → Log4Net
  SerilogAdapter → Serilog
  Switch logging library
  in one place ✅</div>
      </div>
    </div>
    <div class="tip-box" style="margin-top:10px;">✅ Anti-corruption layer in DDD is the Adapter pattern applied at the domain boundary.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Decorator Pattern — Structural</div>
  <div class="ref-body">
    <p><strong>When to use:</strong> Add behavior to an object at runtime without modifying its class. Prefer over inheritance when behaviors can be combined in many ways.</p>
    <div class="two-col">
      <div>
        <div class="ans-label">Decorator (C#)</div>
        <div class="code-box">interface IDataExporter {
    string Export(IEnumerable&lt;object&gt; data);
}

class CsvExporter : IDataExporter {
    public string Export(IEnumerable&lt;object&gt; data)
        => string.Join("\n", data);
}

// Decorator: add compression without changing CsvExporter
class CompressedExporter : IDataExporter {
    private readonly IDataExporter _inner;
    public CompressedExporter(IDataExporter inner)
        => _inner = inner;
    public string Export(IEnumerable&lt;object&gt; data) {
        var result = _inner.Export(data);
        return GZip.Compress(result); // wrap behavior
    }
}

// Decorator: add encryption on top
class EncryptedExporter : IDataExporter {
    private readonly IDataExporter _inner;
    public EncryptedExporter(IDataExporter inner)
        => _inner = inner;
    public string Export(IEnumerable&lt;object&gt; data) {
        var result = _inner.Export(data);
        return AES.Encrypt(result);
    }
}

// Stack decorators — no code modification needed
IDataExporter exporter =
    new EncryptedExporter(
        new CompressedExporter(
            new CsvExporter()));</div>
      </div>
      <div>
        <div class="ans-label">Real-World in .NET</div>
        <div class="code-box">ASP.NET Core Middleware Pipeline
  = Decorator pattern at framework level

Request →
  AuthMiddleware.Invoke(next)
    → LoggingMiddleware.Invoke(next)
        → RateLimitMiddleware.Invoke(next)
            → Controller ← actual handler

Each middleware wraps the next.
Add/remove behaviors without
touching controller code. ✅

HttpClient DelegatingHandler
  = same pattern for HTTP clients
  RetryHandler wraps
    → LoggingHandler wraps
        → HttpClientHandler</div>
        <div class="tip-box" style="margin-top:8px;">✅ Key insight: Decorator implements the same interface as what it wraps — transparent to the caller.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Facade Pattern — Structural</div>
  <div class="ref-body">
    <p><strong>When to use:</strong> Simplify a complex subsystem behind a single clean interface. Clients don't need to know how many services coordinate behind the facade.</p>
    <div class="two-col">
      <div>
        <div class="ans-label">Facade (C#)</div>
        <div class="code-box">// Complex subsystem — many moving parts
class InventoryService   { public bool Reserve(int id, int qty) {...} }
class PaymentService     { public bool Charge(string card, decimal amt) {...} }
class ShippingService    { public void Schedule(Order o) {...} }
class NotificationService{ public void Notify(string email) {...} }

// Facade hides all coordination
class OrderFacade {
    private readonly InventoryService   _inv;
    private readonly PaymentService     _pay;
    private readonly ShippingService    _ship;
    private readonly NotificationService _notify;

    public OrderFacade(...) { /* inject all */ }

    public OrderResult PlaceOrder(OrderRequest req) {
        if (!_inv.Reserve(req.ProductId, req.Qty))
            return OrderResult.OutOfStock;
        if (!_pay.Charge(req.CardToken, req.Amount))
            return OrderResult.PaymentFailed;
        _ship.Schedule(req.ToOrder());
        _notify.Notify(req.Email);
        return OrderResult.Success;
    }
}

// Client calls one method — no subsystem knowledge needed
var result = facade.PlaceOrder(req);</div>
      </div>
      <div>
        <div class="ans-label">Facade vs API Gateway</div>
        <div class="code-box">Facade (code level)
  → Hides complexity within a service
  → Client = code calling the facade
  → Lives inside a single process

API Gateway (infrastructure)
  → Hides microservice topology
  → Client = external app/UI
  → Lives as a separate service
  → Both follow the same principle!

Real-World: BFF (Backend for Frontend)
  = Facade for a specific client type
  Mobile BFF — aggregates 5 services
  into 2 mobile-friendly endpoints ✅</div>
        <div class="tip-box" style="margin-top:8px;">✅ Facade reduces coupling between client code and subsystem internals. Great for onboarding new developers.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Proxy Pattern — Structural</div>
  <div class="ref-body">
    <p><strong>When to use:</strong> Control access to an object — add caching, lazy loading, access control, logging, or remote access without modifying the real object.</p>
    <div class="two-col">
      <div>
        <div class="ans-label">Caching Proxy (C#)</div>
        <div class="code-box">interface IProductRepository {
    Product GetById(int id);
}

class SqlProductRepository : IProductRepository {
    public Product GetById(int id) {
        // Expensive DB query
        return db.Query&lt;Product&gt;(id);
    }
}

// Proxy adds caching transparently
class CachingProductRepository : IProductRepository {
    private readonly IProductRepository _inner;
    private readonly IMemoryCache _cache;

    public Product GetById(int id) {
        var key = $"product:{id}";
        if (_cache.TryGetValue(key, out Product p))
            return p;  // cache hit
        p = _inner.GetById(id);  // real call
        _cache.Set(key, p, TimeSpan.FromMinutes(5));
        return p;
    }
}

// Client injects IProductRepository — doesn't know
// it's talking to a caching proxy ✅</div>
      </div>
      <div>
        <div class="ans-label">Types of Proxies</div>
        <div class="code-box">Virtual Proxy
  → Lazy-load expensive resource
  → Image thumbnail before full load
  → EF Core lazy navigation props

Caching Proxy
  → Cache expensive results
  → Redis, MemoryCache layers

Protection Proxy
  → Access control before real object
  → Check user role before calling
     the actual service method

Remote Proxy
  → Makes remote object look local
  → WCF client proxy, gRPC stub,
     HttpClient for REST APIs

Logging/Audit Proxy
  → Log all calls transparently
  → DispatchProxy in .NET for
     dynamic proxy generation ✅</div>
      </div>
    </div>
    <div class="tip-box" style="margin-top:10px;">✅ Sidecar pattern in Kubernetes IS a proxy — Envoy sidecar intercepts all traffic into/out of the pod.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Composite Pattern — Structural</div>
  <div class="ref-body">
    <p><strong>When to use:</strong> Represent part-whole hierarchies (trees). Treat individual objects and collections uniformly through the same interface.</p>
    <div class="two-col">
      <div>
        <div class="ans-label">Composite (C#) — File System</div>
        <div class="code-box">// Component interface — uniform treatment
interface IFileSystemItem {
    string Name { get; }
    long   GetSize();
    void   Print(string indent = "");
}

// Leaf — no children
class File : IFileSystemItem {
    public string Name { get; }
    private long _size;
    public long GetSize() => _size;
    public void Print(string indent)
        => Console.WriteLine($"{indent}- {Name} ({_size}b)");
}

// Composite — has children
class Folder : IFileSystemItem {
    public string Name { get; }
    private List&lt;IFileSystemItem&gt; _children = new();

    public void Add(IFileSystemItem item)
        => _children.Add(item);

    public long GetSize()          // recursive — same interface!
        => _children.Sum(c => c.GetSize());

    public void Print(string indent) {
        Console.WriteLine($"{indent}+ {Name}");
        _children.ForEach(c => c.Print(indent + "  "));
    }
}

// Client code works the same for File or Folder
IFileSystemItem root = BuildTree();
Console.WriteLine(root.GetSize());  // total recursive size</div>
      </div>
      <div>
        <div class="ans-label">Real-World Applications</div>
        <div class="code-box">UI Component Trees
  → React/HTML DOM
  → WPF visual tree
  → Container holds children,
     child can be leaf or container

Organization Hierarchy
  → Employee (leaf)
  → Manager : Employee
     has List&lt;Employee&gt; Reports
  → GetBudget() sums recursively

Menu Systems
  → MenuItem (leaf) — no sub-items
  → MenuGroup (composite)
     contains MenuItems or sub-groups

JSON / XML Document Tree
  → JsonValue  (leaf)
  → JsonObject (composite)
  → JsonArray  (composite)
  → Parse once, traverse uniformly ✅</div>
      </div>
    </div>
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
  <div class="ref-title">Chain of Responsibility Pattern — Behavioral</div>
  <div class="ref-body">
    <p><strong>When to use:</strong> Pass a request along a chain of handlers. Each handler decides to process it or pass it to the next. Decouple sender from receiver. Add/remove handlers without changing the chain caller.</p>
    <div class="two-col">
      <div>
        <div class="ans-label">Chain of Responsibility (C#)</div>
        <div class="code-box">abstract class ApprovalHandler {
    protected ApprovalHandler _next;
    public ApprovalHandler SetNext(ApprovalHandler next) {
        _next = next;
        return next; // enables fluent chaining
    }
    public abstract void Handle(LoanRequest req);
}

class ManagerApproval : ApprovalHandler {
    public override void Handle(LoanRequest req) {
        if (req.Amount &lt;= 10_000)
            Console.WriteLine("Manager approved");
        else _next?.Handle(req); // pass up the chain
    }
}
class DirectorApproval : ApprovalHandler {
    public override void Handle(LoanRequest req) {
        if (req.Amount &lt;= 100_000)
            Console.WriteLine("Director approved");
        else _next?.Handle(req);
    }
}
class VPApproval : ApprovalHandler {
    public override void Handle(LoanRequest req)
        => Console.WriteLine("VP approved");
}

// Wire the chain
var manager  = new ManagerApproval();
var director = new DirectorApproval();
var vp       = new VPApproval();
manager.SetNext(director).SetNext(vp);

// Send request — chain decides who handles it
manager.Handle(new LoanRequest { Amount = 75_000 });</div>
      </div>
      <div>
        <div class="ans-label">Real-World Patterns</div>
        <div class="code-box">ASP.NET Core Middleware Pipeline
  → Each middleware is a handler
  → Calls next() to pass down chain
  → Short-circuit by NOT calling next

Polly Policy Wrap
  → Retry → CircuitBreaker → Timeout
  → Each policy is a handler

Validation Pipeline
  RequiredFieldsValidator
    → FormatValidator
        → BusinessRuleValidator
  First failure short-circuits rest ✅

Logging Framework
  → Trace → Debug → Info → Warn → Error
  → Only handlers at or above
     configured level process the log

Support Escalation
  → Level 1 Support
      → Level 2 Technical
          → Engineering Team</div>
        <div class="tip-box" style="margin-top:8px;">✅ MediatR Pipeline Behaviors in .NET implement this pattern for request handling.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Template Method Pattern — Behavioral</div>
  <div class="ref-body">
    <p><strong>When to use:</strong> Define the skeleton of an algorithm in a base class, deferring certain steps to subclasses. Prevents code duplication while allowing customization of specific steps.</p>
    <div class="two-col">
      <div>
        <div class="ans-label">Template Method (C#)</div>
        <div class="code-box">abstract class DataExporter {
    // Template method — defines the algorithm skeleton
    public void Export(string destination) {
        var data    = FetchData();      // step 1
        var formatted = Format(data);  // step 2 — varies
        Validate(formatted);           // step 3 — hook (optional)
        WriteOutput(formatted, destination); // step 4 — varies
        SendNotification(destination); // step 5 — common
    }

    protected abstract IEnumerable&lt;object&gt; FetchData();
    protected abstract string Format(IEnumerable&lt;object&gt; data);
    protected abstract void WriteOutput(string data, string dest);

    protected virtual void Validate(string data) { } // optional hook
    private void SendNotification(string dest) {
        Console.WriteLine($"Export to {dest} complete.");
    }
}

class CsvExporter : DataExporter {
    protected override IEnumerable&lt;object&gt; FetchData()
        => db.Query("SELECT * FROM Orders");
    protected override string Format(IEnumerable&lt;object&gt; d)
        => ToCsv(d);
    protected override void WriteOutput(string data, string dest)
        => File.WriteAllText(dest, data);
}

class ExcelExporter : DataExporter {
    protected override IEnumerable&lt;object&gt; FetchData()
        => db.Query("SELECT * FROM Orders");
    protected override string Format(IEnumerable&lt;object&gt; d)
        => ToExcel(d);
    protected override void WriteOutput(string data, string dest)
        => ExcelLib.Write(dest, data);
}</div>
      </div>
      <div>
        <div class="ans-label">Template Method vs Strategy</div>
        <div class="code-box">Template Method
  → Uses inheritance
  → Base class defines algorithm
  → Subclass overrides specific steps
  → Algorithm structure is fixed
  → Steps vary, flow is the same

Strategy
  → Uses composition
  → Entire algorithm is swappable
  → Inject at runtime via interface
  → More flexible, more testable
  → Preferred when algorithm
     changes completely

Rule of thumb:
  Vary STEPS of same algorithm → Template Method
  Vary ENTIRE algorithm        → Strategy ✅

Real-World .NET Examples:
  ControllerBase in ASP.NET Core
  DbContext in EF Core (OnModelCreating)
  BackgroundService (ExecuteAsync)</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Mediator Pattern — Behavioral</div>
  <div class="ref-body">
    <p><strong>When to use:</strong> Reduce direct dependencies between many objects. Objects communicate through a central mediator rather than directly. Prevents spaghetti object references as the system grows.</p>
    <div class="two-col">
      <div>
        <div class="ans-label">Mediator with MediatR (C#)</div>
        <div class="code-box">// MediatR is the mediator — objects send through it
// 1. Define a request/command
public record PlaceOrderCommand(string ProductId, int Qty)
    : IRequest&lt;OrderResult&gt;;

// 2. Handler — knows nothing about the caller
public class PlaceOrderHandler
    : IRequestHandler&lt;PlaceOrderCommand, OrderResult&gt; {

    public async Task&lt;OrderResult&gt; Handle(
        PlaceOrderCommand cmd,
        CancellationToken ct) {
        // process order...
        return new OrderResult(orderId);
    }
}

// 3. Caller — knows nothing about the handler
public class OrderController {
    private readonly IMediator _mediator;
    public async Task&lt;IActionResult&gt; Post(OrderRequest req) {
        var result = await _mediator.Send(
            new PlaceOrderCommand(req.ProductId, req.Qty));
        return Ok(result);
    }
}
// Controller → Mediator → Handler
// No direct reference between Controller and Handler ✅</div>
      </div>
      <div>
        <div class="ans-label">CQRS + MediatR Architecture</div>
        <div class="code-box">Without Mediator (spaghetti)
  Controller → OrderService
           → InventoryService
           → PaymentService
           → EmailService
  Each service knows about others

With Mediator
  Controller → IMediator → Handler
  Everything routes through mediator
  Components are fully decoupled

MediatR Pipeline Behaviors
  (Chain of Responsibility on top)
  Request
    → LoggingBehavior
        → ValidationBehavior
            → CachingBehavior
                → Handler

Domain Events (Mediator pattern)
  OrderPlaced event published
  → MediatR Notification handlers
  → EmailHandler, AuditHandler,
     InventoryHandler all react
     independently ✅</div>
        <div class="tip-box" style="margin-top:8px;">✅ MediatR is the most popular .NET implementation — widely used with CQRS pattern.</div>
      </div>
    </div>
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
      <div class="pt-row"><div class="pt-name">CQRS</div><div>Same model for reads and writes causes contention and complexity</div><div>Separate Command (write) model from Query (read) model; optimize each independently</div><div>MediatR, EF Core, Dapper for reads</div></div>
      <div class="pt-row"><div class="pt-name">Saga</div><div>Distributed transactions across services — 2PC is not viable in microservices</div><div>Choreography (events) or Orchestration (saga orchestrator) to coordinate multi-step workflow</div><div>MassTransit Saga, Azure Durable Functions</div></div>
      <div class="pt-row"><div class="pt-name">Event Sourcing</div><div>Losing history when state is overwritten; need full audit trail</div><div>Store sequence of events as source of truth; replay events to rebuild state</div><div>EventStoreDB, Marten, custom SQL</div></div>
    </div>
    <div class="ans-label" style="margin-top:14px;">CQRS — Command Query Responsibility Segregation</div>
    <div class="two-col" style="margin-top:8px;">
      <div>
        <div class="code-box">// Command side — optimized for writes
public record CreateOrderCommand(
    string CustomerId, List&lt;OrderItem&gt; Items)
    : IRequest&lt;Guid&gt;;

public class CreateOrderHandler
    : IRequestHandler&lt;CreateOrderCommand, Guid&gt; {
    public async Task&lt;Guid&gt; Handle(
        CreateOrderCommand cmd, CancellationToken ct) {
        var order = Order.Create(cmd.CustomerId, cmd.Items);
        await _writeRepo.SaveAsync(order); // EF Core + SQL
        await _mediator.Publish(
            new OrderCreatedEvent(order.Id));
        return order.Id;
    }
}

// Query side — optimized for reads (Dapper, denormalized)
public record GetOrderSummaryQuery(Guid OrderId)
    : IRequest&lt;OrderSummaryDto&gt;;

public class GetOrderSummaryHandler
    : IRequestHandler&lt;GetOrderSummaryQuery, OrderSummaryDto&gt; {
    public async Task&lt;OrderSummaryDto&gt; Handle(
        GetOrderSummaryQuery q, CancellationToken ct) {
        // Dapper — direct SQL on read-optimized view
        return await _db.QuerySingleAsync&lt;OrderSummaryDto&gt;(
            "SELECT * FROM v_OrderSummary WHERE Id = @id",
            new { id = q.OrderId });
    }
}</div>
      </div>
      <div>
        <div class="code-box">CQRS Benefits
──────────────────────────────
Separate scaling
  Write DB: SQL Server (ACID)
  Read DB:  Redis / Cosmos / ES
            (horizontally scaled)

Separate optimization
  Write model: rich domain objects,
               business rules, EF Core
  Read model:  flat DTOs, Dapper,
               denormalized views

Event-driven sync
  Command writes to SQL
  OrderCreated event published
  Read model projection updated
  (eventual consistency)

When NOT to use CQRS
  → Simple CRUD apps
  → Small team, low traffic
  → Added complexity not justified
  → Start simple, extract when needed

Best with: Event Sourcing, MediatR,
           Domain Events ✅</div>
      </div>
    </div>

    <div class="ans-label" style="margin-top:14px;">Saga Pattern — Distributed Transactions</div>
    <div class="two-col" style="margin-top:8px;">
      <div>
        <div class="code-box">// Choreography-based Saga (events)
// No central orchestrator — services react to events

OrderService publishes: OrderCreated
  → InventoryService consumes:
       reserves stock
       publishes: StockReserved OR StockFailed
  → PaymentService consumes StockReserved:
       charges card
       publishes: PaymentSucceeded OR PaymentFailed
  → ShippingService consumes PaymentSucceeded:
       schedules delivery
       publishes: ShipmentScheduled

Compensating transactions (rollback)
  PaymentFailed
    → InventoryService consumes:
         releases reserved stock
  StockFailed
    → OrderService: marks order failed

// Orchestration-based Saga (Azure Durable Functions)
[FunctionName("OrderSaga")]
public async Task RunOrchestrator(
    [OrchestrationTrigger] IDurableOrchestrationContext ctx) {
    var order = ctx.GetInput&lt;Order&gt;();
    var stockOk = await ctx.CallActivityAsync&lt;bool&gt;(
        "ReserveStock", order);
    if (!stockOk) { await ctx.CallActivityAsync(
        "CancelOrder", order); return; }
    var payOk = await ctx.CallActivityAsync&lt;bool&gt;(
        "ChargePayment", order);
    if (!payOk) { await ctx.CallActivityAsync(
        "ReleaseStock", order); return; }
    await ctx.CallActivityAsync("ScheduleShipment", order);
}</div>
      </div>
      <div>
        <div class="code-box">Choreography vs Orchestration
────────────────────────────────
Choreography
  ✅ Fully decoupled services
  ✅ Each service is independent
  ⚠️ Hard to visualize overall flow
  ⚠️ Compensations are complex
  Use when: services are independent
            teams own their services

Orchestration
  ✅ Central flow visibility
  ✅ Easier to handle failures
  ⚠️ Orchestrator can become bottleneck
  ⚠️ Services coupled to orchestrator
  Use when: complex multi-step flows
            need audit/visibility

Key principle: No distributed 2PC
  Each service commits locally
  Publish event on success
  Compensating transaction on failure
  Accept eventual consistency ✅

Tools:
  MassTransit StateMachine (Choreography)
  Azure Durable Functions (Orchestration)
  AWS Step Functions (Orchestration)</div>
      </div>
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
