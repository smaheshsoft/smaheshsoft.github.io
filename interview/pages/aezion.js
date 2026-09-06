window.Pages = window.Pages || {};
window.Pages['aezion'] = `
  <div class="page-header">
    <div class="breadcrumb">Home › <span>Aezion</span></div>
    <h1>🧭 Aezion Interview — Round 1</h1>
    <p>SOLID &amp; Patterns · DI · Service Communication · C# Internals · MVC vs MVVM · AuthN/AuthZ &amp; MFA · Security &amp; PII · Data Consolidation Design</p>
  </div>
  <div class="qa-list">

    <div class="qa-card">
      <div class="qa-num">R1·Q1</div>
      <div class="qa-body">
        <div class="qa-question">What is the difference between SOLID Principles and Design Patterns?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">One sentence</div>
            <p>SOLID tells you <strong>what good structure looks like</strong>. Design patterns are <strong>proven solutions</strong> that help you get there.</p>
          </div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 1.4fr 1.4fr;">
              <div>Aspect</div><div>SOLID Principles</div><div>Design Patterns</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1fr 1.4fr 1.4fr;">
              <div class="dt-name">Nature</div><div>Guidelines / qualities to aim for</div><div>Reusable solution templates</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1fr 1.4fr 1.4fr;">
              <div class="dt-name">Question answered</div><div>"Is this design healthy?"</div><div>"How do I solve this recurring problem?"</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1fr 1.4fr 1.4fr;">
              <div class="dt-name">Count</div><div>5 principles</div><div>23 GoF + many more</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1fr 1.4fr 1.4fr;">
              <div class="dt-name">Scope</div><div>Applies to almost every class you write</div><div>Applied where the specific problem occurs</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1fr 1.4fr 1.4fr;">
              <div class="dt-name">Misuse risk</div><div>Over-abstraction if applied dogmatically</div><div>Pattern for pattern's sake — accidental complexity</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">The relationship</div>
            <div class="code-box">SOLID = the goal          Patterns = the route

Strategy pattern      → helps achieve  Open/Closed + Liskov
Factory pattern       → helps achieve  Open/Closed + Dependency Inversion
Repository pattern    → helps achieve  Dependency Inversion
Decorator pattern     → helps achieve  Open/Closed + Single Responsibility
Adapter pattern       → helps achieve  Interface Segregation

You can follow SOLID with no named pattern at all.
You can also use a pattern badly and still violate SOLID.</div>
          </div>
          <div class="tip-box">✅ Interview line: "SOLID is a set of design principles that describe the properties of maintainable code. Patterns are named, proven implementations that often produce those properties. Principles are the 'why', patterns are the 'how' — and I apply patterns only when the problem actually calls for one."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q2</div>
      <div class="qa-body">
        <div class="qa-question">How does the Factory Design Pattern follow the Open/Closed Principle?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Open/Closed recap</div>
            <p>Open for <strong>extension</strong>, closed for <strong>modification</strong> — add new behaviour by adding code, not by editing working code.</p>
          </div>
          <div class="ans-block"><div class="ans-label">❌ Without a factory — every new type edits the same switch</div>
            <div class="code-box">public IPaymentProcessor Create(string type)
{
    switch (type)                       // ← this file changes for EVERY new type
    {
        case "card":   return new CardProcessor();
        case "upi":    return new UpiProcessor();
        case "wallet": return new WalletProcessor();   // added today
        default: throw new NotSupportedException(type);
    }
}</div>
            <p>Adding NetBanking means editing, re-testing and re-deploying this class. That is modification — OCP violated.</p>
          </div>
          <div class="ans-block"><div class="ans-label">✅ With a registered factory — new type = new class only</div>
            <div class="code-box">public interface IPaymentProcessor
{
    string Method { get; }              // "card", "upi", ...
    Task&lt;Result&gt; PayAsync(Payment p);
}

public class PaymentProcessorFactory
{
    private readonly Dictionary&lt;string, IPaymentProcessor&gt; _map;

    // DI hands us every registered implementation
    public PaymentProcessorFactory(IEnumerable&lt;IPaymentProcessor&gt; processors)
        =&gt; _map = processors.ToDictionary(p =&gt; p.Method, StringComparer.OrdinalIgnoreCase);

    public IPaymentProcessor Create(string method) =&gt;
        _map.TryGetValue(method, out var p)
            ? p
            : throw new NotSupportedException(method);
}

// Program.cs — extension point
services.AddScoped&lt;IPaymentProcessor, CardProcessor&gt;();
services.AddScoped&lt;IPaymentProcessor, UpiProcessor&gt;();
services.AddScoped&lt;IPaymentProcessor, NetBankingProcessor&gt;();  // ← only new code</div>
          </div>
          <div class="ans-block"><div class="ans-label">Why this satisfies OCP</div>
            <ul>
              <li>The factory class itself is <strong>never edited</strong> when a payment method is added.</li>
              <li>Callers depend on <code>IPaymentProcessor</code>, so they are untouched too.</li>
              <li>The only change is <strong>additive</strong>: a new class plus one registration line.</li>
              <li>Existing processors are not recompiled or re-tested — regression risk stays local.</li>
            </ul>
          </div>
          <div class="warn-box">⚠️ Be honest in the interview: a plain switch-based factory does <em>not</em> fully satisfy OCP — it just centralises the violation in one place, which is still better than scattering <code>new</code> across the codebase. Full OCP needs registration or reflection-based discovery.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q3</div>
      <div class="qa-body">
        <div class="qa-question">How does Dependency Injection (DI) work in .NET?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">The three steps</div>
            <div class="flow-box">
              <div class="flow-step">1. REGISTER — map abstraction → implementation in the container</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">2. RESOLVE — container builds the object graph on request</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">3. DISPOSE — container releases IDisposable services at scope end</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">In code</div>
            <div class="code-box">// 1. REGISTER (Program.cs)
builder.Services.AddScoped&lt;IOrderRepository, SqlOrderRepository&gt;();
builder.Services.AddScoped&lt;IOrderService, OrderService&gt;();
builder.Services.AddSingleton&lt;IClock, SystemClock&gt;();
builder.Services.AddHttpClient&lt;IPricingApi, PricingApi&gt;();

// 2. RESOLVE — constructor injection, the preferred form
public class OrderService : IOrderService
{
    private readonly IOrderRepository _repo;
    private readonly IClock _clock;

    public OrderService(IOrderRepository repo, IClock clock)   // container supplies both
    {
        _repo  = repo;
        _clock = clock;
    }
}

// ASP.NET Core creates the controller, sees IOrderService,
// builds OrderService, which needs IOrderRepository + IClock,
// builds those too — the whole graph, recursively.</div>
          </div>
          <div class="ans-block"><div class="ans-label">Lifetimes — the part interviewers probe</div>
            <div class="decision-table">
              <div class="dt-row dt-header" style="grid-template-columns:1fr 1.5fr 1.5fr;">
                <div>Lifetime</div><div>Instance per</div><div>Use for</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1fr 1.5fr 1.5fr;">
                <div class="dt-name">Transient</div><div>Every resolution</div><div>Lightweight, stateless helpers</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1fr 1.5fr 1.5fr;">
                <div class="dt-name">Scoped</div><div>Per HTTP request</div><div>DbContext, unit of work, per-request state</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1fr 1.5fr 1.5fr;">
                <div class="dt-name">Singleton</div><div>Application lifetime</div><div>Caches, config, thread-safe stateless services</div>
              </div>
            </div>
          </div>
          <div class="warn-box">⚠️ Classic trap — <strong>captive dependency</strong>: injecting a Scoped service (like DbContext) into a Singleton. The Singleton holds it forever, so it outlives its scope and you get stale data or thread-safety bugs. .NET Core throws at startup in Development when scope validation is on; in Production it can slip through. Fix: inject <code>IServiceScopeFactory</code> and create a scope per unit of work.</div>
          <div class="tip-box">✅ Also mention: DI gives you inversion of control, testability (swap a fake repository), lifetime management, and a single composition root — the app wires itself in one place instead of classes calling <code>new</code> on their own collaborators.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q4</div>
      <div class="qa-body">
        <div class="qa-question">Does Dependency Injection promote high cohesion or low cohesion? Why?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer</div>
            <p><strong>High cohesion</strong> — and, separately, <strong>low coupling</strong>. Those two goals travel together, and mixing up the terms is the trap in this question.</p>
          </div>
          <div class="code-box">COHESION  = how focused ONE class is on a single responsibility   → want HIGH
COUPLING  = how tightly classes depend on EACH OTHER            → want LOW

DI improves both:
  ↑ cohesion  — the class only does its job; it stops creating and
                configuring its collaborators, so that noise leaves the class
  ↓ coupling  — the class depends on an interface, not a concrete type,
                so implementations can change without touching it</div>
          <div class="ans-block"><div class="ans-label">Why cohesion goes up — concretely</div>
            <div class="code-box">// ❌ Low cohesion: OrderService also does construction + configuration
public class OrderService
{
    private readonly SqlOrderRepository _repo;
    public OrderService()
    {
        var conn = ConfigurationManager.ConnectionStrings["Db"].ConnectionString;
        _repo = new SqlOrderRepository(conn);      // wiring work, not order work
    }
}

// ✅ High cohesion: it does order logic and nothing else
public class OrderService
{
    private readonly IOrderRepository _repo;
    public OrderService(IOrderRepository repo) =&gt; _repo = repo;
}</div>
            <p>Object creation, connection strings and lifetime decisions move to the composition root, where that <em>is</em> the responsibility. Each class ends up with one reason to change.</p>
          </div>
          <div class="warn-box">⚠️ Nuance worth saying out loud: DI does not <em>guarantee</em> high cohesion. A class with twelve constructor parameters is still doing too much — the long constructor is a smell that DI makes visible rather than fixes. That visibility is itself a benefit.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q5</div>
      <div class="qa-body">
        <div class="qa-question">What are the different ways in which services can communicate with each other?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Two families</div>
            <div class="flow-box">
              <div class="flow-step blue">SYNCHRONOUS — caller waits for a reply · temporal coupling</div>
              <div class="flow-arrow">vs</div>
              <div class="flow-step green">ASYNCHRONOUS — caller continues · broker holds the message</div>
            </div>
          </div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 1fr 1.3fr 1.3fr;">
              <div>Mechanism</div><div>Style</div><div>Best for</div><div>Watch out for</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1fr 1fr 1.3fr 1.3fr;">
              <div class="dt-name">REST / HTTP</div><div>Sync</div><div>Public APIs, CRUD, broad interop</div><div>Chatty calls, cascading latency</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1fr 1fr 1.3fr 1.3fr;">
              <div class="dt-name">gRPC</div><div>Sync + streaming</div><div>Internal high-throughput, low latency</div><div>Browser support, tooling</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1fr 1fr 1.3fr 1.3fr;">
              <div class="dt-name">GraphQL</div><div>Sync</div><div>Aggregating for varied clients</div><div>Query cost, caching</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1fr 1fr 1.3fr 1.3fr;">
              <div class="dt-name">Message queue</div><div>Async</div><div>Commands, work distribution, load levelling</div><div>Ordering, poison messages</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1fr 1fr 1.3fr 1.3fr;">
              <div class="dt-name">Pub/Sub topics</div><div>Async</div><div>Domain events, fan-out to many consumers</div><div>Eventual consistency</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1fr 1fr 1.3fr 1.3fr;">
              <div class="dt-name">Event streaming</div><div>Async</div><div>Replay, analytics, high volume</div><div>Operational complexity</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1fr 1fr 1.3fr 1.3fr;">
              <div class="dt-name">WebSocket / SignalR</div><div>Duplex</div><div>Live dashboards, chat, push</div><div>Connection state, scale-out backplane</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1fr 1fr 1.3fr 1.3fr;">
              <div class="dt-name">Shared database</div><div>Indirect</div><div class="dt-no">Legacy integration only</div><div>Hidden coupling — usually an anti-pattern</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1fr 1fr 1.3fr 1.3fr;">
              <div class="dt-name">File / batch</div><div>Async</div><div>Bulk transfer, partner feeds, EOD</div><div>Latency, error handling</div>
            </div>
          </div>
          <div class="tip-box">✅ Strong close: "I default to asynchronous messaging between services and keep synchronous calls for genuine query paths where the caller cannot proceed without the answer. Sync calls create temporal coupling — if the callee is down, I am down — so every one of them needs a timeout, retry with backoff, and a circuit breaker."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q6</div>
      <div class="qa-body">
        <div class="qa-question">What are Request/Response, Full-Duplex, Half-Duplex, Request-Acknowledgement and Fire-and-Forget patterns? When should each be used?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Request / Response</div>
            <div class="code-box">Client ──── request ────► Service
Client ◄─── response ──── Service     (client BLOCKS until it arrives)</div>
            <p><strong>Use for:</strong> queries where the answer is needed to continue — get customer, validate card, price a basket.<br>
            <strong>Cost:</strong> temporal coupling and latency that adds up across hops. Always set a timeout.</p>
          </div>
          <div class="ans-block"><div class="ans-label">Request / Acknowledgement</div>
            <div class="code-box">Client ──── request ────► Service
Client ◄─── 202 Accepted ─ Service    (ack only: "I have it safely")
                                       result arrives later via callback,
                                       polling, or an event

HTTP 202 + Location: /status/{id}  is the classic REST expression</div>
            <p><strong>Use for:</strong> long-running work — report generation, bulk import, payment settlement. The caller gets durability confirmation without waiting for completion.</p>
          </div>
          <div class="ans-block"><div class="ans-label">Fire and Forget</div>
            <div class="code-box">Client ──── message ────► (no reply expected, ever)</div>
            <p><strong>Use for:</strong> telemetry, metrics, audit logs, cache-warm hints — anything where a lost message is acceptable.<br>
            <strong>Danger:</strong> no delivery guarantee. Never use it for anything a business process depends on.</p>
          </div>
          <div class="ans-block"><div class="ans-label">Half Duplex</div>
            <div class="code-box">A ──────────► B      one direction at a time,
A ◄────────── B      like a walkie-talkie: you must finish before I start</div>
            <p><strong>Use for:</strong> classic HTTP/1.1 request-response, polling. Simple and cache-friendly.</p>
          </div>
          <div class="ans-block"><div class="ans-label">Full Duplex</div>
            <div class="code-box">A ◄═════════► B      both directions simultaneously,
                     over one persistent connection</div>
            <p><strong>Use for:</strong> chat, live trading prices, collaborative editing, device control. Implemented with WebSockets, SignalR or gRPC bidirectional streaming.<br>
            <strong>Cost:</strong> stateful connections — you need a backplane (Redis) to scale out, plus reconnect handling.</p>
          </div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.2fr 1fr 1fr 1.4fr;">
              <div>Pattern</div><div>Reply?</div><div>Caller waits?</div><div>Pick when</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1fr 1fr 1.4fr;">
              <div class="dt-name">Request/Response</div><div class="dt-yes">Full result</div><div>Yes</div><div>Answer needed now</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1fr 1fr 1.4fr;">
              <div class="dt-name">Request/Ack</div><div>Receipt only</div><div>Briefly</div><div>Work is slow but must not be lost</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1fr 1fr 1.4fr;">
              <div class="dt-name">Fire-and-Forget</div><div class="dt-no">None</div><div class="dt-no">No</div><div>Loss is tolerable</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1fr 1fr 1.4fr;">
              <div class="dt-name">Half duplex</div><div>Yes</div><div>Yes</div><div>Simple turn-taking traffic</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1fr 1fr 1.4fr;">
              <div class="dt-name">Full duplex</div><div>Continuous</div><div class="dt-no">No</div><div>Server must push unprompted</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q7</div>
      <div class="qa-body">
        <div class="qa-question">In a Pub/Sub model, which pattern is typically followed — Fire-and-Forget or Request-and-Acknowledgement? Explain.</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">The precise answer</div>
            <p>It depends which leg of the interaction you mean, and saying so is what marks a senior answer:</p>
            <div class="code-box">PUBLISHER → BROKER      Request/Acknowledgement
                        The publisher waits for the broker to confirm the
                        message is durably persisted. Without that ack it
                        does not know the event survived, so it must retry.

BROKER → SUBSCRIBERS    Fire-and-Forget from the PUBLISHER's point of view
                        The publisher never learns who consumed it, whether
                        they succeeded, or even how many subscribers exist.
                        That ignorance IS the decoupling.

BROKER ↔ SUBSCRIBER     Acknowledgement again
                        The subscriber acks after successful processing so the
                        broker can delete it; on failure it abandons/nacks and
                        the message is retried or dead-lettered.</div>
          </div>
          <div class="ans-block"><div class="ans-label">So the headline is</div>
            <p><strong>Pub/Sub is fire-and-forget between publisher and subscribers, built on top of acknowledged hops at each boundary.</strong> The publisher fires an event and forgets; the infrastructure guarantees delivery.</p>
          </div>
          <div class="ans-block"><div class="ans-label">Why it must be that way</div>
            <ul>
              <li>If the publisher waited for subscriber results, it would need to know who they are — that reintroduces the coupling Pub/Sub exists to remove.</li>
              <li>Adding a sixth subscriber would slow down or break the publisher.</li>
              <li>One slow subscriber would degrade every publish.</li>
            </ul>
          </div>
          <div class="warn-box">⚠️ Consequence to acknowledge: the publisher cannot know whether business processing succeeded. If you need that, you are asking for a <strong>saga</strong> — the subscriber emits its own event (<code>OrderShipped</code>, <code>PaymentFailed</code>) and a coordinator reacts. Do not solve it by making publish synchronous.</div>
          <div class="tip-box">✅ Add delivery semantics: most brokers give <strong>at-least-once</strong> delivery, so a subscriber can see the same event twice after a retry. Consumers must be <strong>idempotent</strong> — dedupe on a message id, or make the operation naturally repeatable.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q8</div>
      <div class="qa-body">
        <div class="qa-question">What is the C# equivalent of Java's <code>final</code>? What is the purpose of <code>sealed</code>?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">There is no single equivalent — Java overloads one keyword for three jobs</div>
            <div class="decision-table">
              <div class="dt-row dt-header" style="grid-template-columns:1.3fr 1.2fr 1.5fr;">
                <div>Java <code>final</code> on…</div><div>C# equivalent</div><div>Meaning</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.3fr 1.2fr 1.5fr;">
                <div class="dt-name">class</div><div><code>sealed</code></div><div>Cannot be inherited from</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.3fr 1.2fr 1.5fr;">
                <div class="dt-name">method</div><div><code>sealed override</code></div><div>Stops further overriding down the chain</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.3fr 1.2fr 1.5fr;">
                <div class="dt-name">field / variable</div><div><code>readonly</code></div><div>Assignable only in declaration or constructor</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.3fr 1.2fr 1.5fr;">
                <div class="dt-name">compile-time constant</div><div><code>const</code></div><div>Baked in at compile time, implicitly static</div>
              </div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">sealed in code</div>
            <div class="code-box">public sealed class TaxCalculator { }         // nobody can inherit

public class BaseReport
{
    public virtual void Render() { }
}

public class PdfReport : BaseReport
{
    public sealed override void Render() { }  // subclasses of PdfReport
}                                             // may not override Render again

// readonly vs const
public class Config
{
    public const int MaxRetries = 3;            // compile-time, static, baked into callers
    public readonly DateTime StartedUtc;        // runtime, per-instance
    public Config() =&gt; StartedUtc = DateTime.UtcNow;
}</div>
          </div>
          <div class="ans-block"><div class="ans-label">Why seal a class</div>
            <ul>
              <li><strong>Design intent</strong> — the type was not built to be extended; inheritance would break invariants.</li>
              <li><strong>Security</strong> — no subclass can override behaviour to bypass a validation or audit step.</li>
              <li><strong>Performance</strong> — the JIT can devirtualise and inline calls on a sealed type; measurable in hot paths.</li>
              <li><strong>Maintainability</strong> — you keep freedom to change internals without breaking unknown subclasses.</li>
            </ul>
          </div>
          <div class="warn-box">⚠️ <code>readonly</code> on a reference type only freezes the <em>reference</em>, not the object. A <code>readonly List&lt;T&gt;</code> can still have items added — use <code>IReadOnlyList&lt;T&gt;</code> or <code>ImmutableList&lt;T&gt;</code> if you need real immutability. Also note <code>const</code> values are copied into calling assemblies at compile time, so changing one requires recompiling every consumer; prefer <code>static readonly</code> for anything crossing an assembly boundary.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q9</div>
      <div class="qa-body">
        <div class="qa-question">How does Garbage Collection work in .NET?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Core idea — generational mark and compact</div>
            <div class="code-box">MANAGED HEAP
  Gen 0   short-lived objects — collected very often, very fast
  Gen 1   survivors of Gen 0 — a buffer between short and long lived
  Gen 2   long-lived objects — collected rarely, most expensive
  LOH     Large Object Heap: objects ≥ 85,000 bytes, collected with Gen 2,
          NOT compacted by default (fragmentation risk)

WHY GENERATIONS WORK
  The generational hypothesis: most objects die young.
  So collecting only Gen 0 reclaims most garbage for a fraction of the cost.</div>
          </div>
          <div class="ans-block"><div class="ans-label">The three phases of a collection</div>
            <div class="flow-box">
              <div class="flow-step">1. MARK — walk from GC roots (stack refs, statics, CPU registers, GC handles) and mark everything reachable</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">2. SWEEP — everything unmarked is garbage; its memory is reclaimed</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">3. COMPACT — survivors are moved together, references fixed up, allocation pointer reset</div>
            </div>
            <p>Because the heap is compacted, allocation in .NET is usually just a pointer bump — which is why it is so fast.</p>
          </div>
          <div class="ans-block"><div class="ans-label">What triggers a collection</div>
            <ul>
              <li>Gen 0 allocation budget is exhausted (the common case)</li>
              <li>The system signals memory pressure</li>
              <li>An explicit <code>GC.Collect()</code> call — almost always a mistake in production code</li>
            </ul>
          </div>
          <div class="ans-block"><div class="ans-label">Modes worth naming</div>
            <div class="decision-table">
              <div class="dt-row dt-header" style="grid-template-columns:1fr 1.6fr;">
                <div>Mode</div><div>Behaviour</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1fr 1.6fr;">
                <div class="dt-name">Workstation</div><div>Lower latency, tuned for client apps</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1fr 1.6fr;">
                <div class="dt-name">Server</div><div>One heap and GC thread per core — default for ASP.NET Core, higher throughput</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1fr 1.6fr;">
                <div class="dt-name">Background GC</div><div>Gen 2 collected concurrently, shortening pauses</div>
              </div>
            </div>
          </div>
          <div class="warn-box">⚠️ The GC only manages <strong>memory</strong>. File handles, sockets, DB connections and OS resources are <em>unmanaged</em> — the GC will not release them promptly. That is exactly why <code>IDisposable</code> exists (next question).</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q10</div>
      <div class="qa-body">
        <div class="qa-question">What happens when an object is disposed? What is the difference between <code>Dispose()</code> and Garbage Collection?</div>
        <div class="qa-answer">
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 1.4fr 1.4fr;">
              <div>Aspect</div><div><code>Dispose()</code></div><div>Garbage Collection</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1fr 1.4fr 1.4fr;">
              <div class="dt-name">Releases</div><div>Unmanaged resources — handles, connections, sockets</div><div>Managed memory on the heap</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1fr 1.4fr 1.4fr;">
              <div class="dt-name">Who calls it</div><div>You — explicitly or via <code>using</code></div><div>The runtime, when it decides</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1fr 1.4fr 1.4fr;">
              <div class="dt-name">Timing</div><div class="dt-yes">Deterministic — right now</div><div class="dt-no">Non-deterministic</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1fr 1.4fr 1.4fr;">
              <div class="dt-name">Frees memory?</div><div class="dt-no">No — the object stays until collected</div><div class="dt-yes">Yes</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">What actually happens on Dispose</div>
            <p><code>Dispose()</code> is an <strong>ordinary method</strong>. Nothing magic happens: the object is not removed from memory and the reference remains valid. What happens is whatever the class implements — closing a file handle, returning a connection to the pool, unsubscribing from an event. Afterwards the object is in a "disposed" state and should throw <code>ObjectDisposedException</code> if reused.</p>
          </div>
          <div class="ans-block"><div class="ans-label">The canonical pattern</div>
            <div class="code-box">public class FileProcessor : IDisposable
{
    private FileStream _stream;          // managed wrapper over an OS handle
    private IntPtr _nativeHandle;        // raw unmanaged resource
    private bool _disposed;

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);       // finaliser no longer needed → cheaper GC
    }

    protected virtual void Dispose(bool disposing)
    {
        if (_disposed) return;
        if (disposing)
        {
            _stream?.Dispose();          // managed — only safe when called explicitly
        }
        ReleaseNative(_nativeHandle);    // unmanaged — always release
        _disposed = true;
    }

    ~FileProcessor() =&gt; Dispose(false);  // safety net if someone forgets
}

// Caller — using guarantees Dispose even on exception
using var processor = new FileProcessor();</div>
          </div>
          <div class="ans-block"><div class="ans-label">Why the finaliser is only a safety net</div>
            <div class="code-box">An object with a finaliser survives its FIRST collection: it is placed on the
finalisation queue, the finaliser thread runs it, and only the NEXT GC frees it.
So finalisers make objects live longer and make the GC work harder.

GC.SuppressFinalize(this) after a real Dispose removes that penalty.</div>
          </div>
          <div class="tip-box">✅ One-line answer: "Dispose is deterministic cleanup of unmanaged resources that I control; GC is non-deterministic reclamation of managed memory that the runtime controls. Dispose does not free memory, and the GC does not promptly free file handles or connections — that is why both exist."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q11</div>
      <div class="qa-body">
        <div class="qa-question">What is the difference between MVC and MVVM?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Structure</div>
            <div class="code-box">MVC                                  MVVM
  User → Controller                    User → View
           ↓ updates                            ↕ two-way data binding
         Model                                ViewModel
           ↓ renders                            ↕
         View → User                          Model

Controller ORCHESTRATES explicitly.  ViewModel EXPOSES state; binding syncs it.</div>
          </div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 1.3fr 1.3fr;">
              <div>Aspect</div><div>MVC</div><div>MVVM</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1fr 1.3fr 1.3fr;">
              <div class="dt-name">Middle piece</div><div>Controller — handles requests</div><div>ViewModel — holds bindable state</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1fr 1.3fr 1.3fr;">
              <div class="dt-name">View knows</div><div>Nothing about the controller</div><div>Binds directly to the ViewModel</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1fr 1.3fr 1.3fr;">
              <div class="dt-name">Data flow</div><div>One-way, request driven</div><div>Two-way binding + commands</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1fr 1.3fr 1.3fr;">
              <div class="dt-name">State</div><div>Stateless per request (web)</div><div>Stateful, lives while the view lives</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1fr 1.3fr 1.3fr;">
              <div class="dt-name">Typical stack</div><div>ASP.NET Core MVC, Spring MVC</div><div>WPF, MAUI, Xamarin, Angular, Knockout</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1fr 1.3fr 1.3fr;">
              <div class="dt-name">Testability</div><div>Controller testable without UI</div><div class="dt-yes">ViewModel fully testable — no UI reference at all</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">The real driver</div>
            <p>MVVM exists because <strong>rich clients are stateful and event-driven</strong>. A desktop or mobile screen holds state across many interactions, so two-way binding removes an enormous amount of glue code. MVC exists because <strong>the web is request-response</strong> — each request is independent, so an orchestrating controller is the natural fit.</p>
          </div>
          <div class="tip-box">✅ Add: "In modern ASP.NET Core I often see a hybrid — MVC for routing and request handling, with a ViewModel per view so the Razor page never touches domain entities. Blazor is genuinely MVVM-shaped because components hold state and bind to it."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q12</div>
      <div class="qa-body">
        <div class="qa-question">How would you design a common component architecture for authentication, authorization, security and compliance?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Principle: build it once, as a platform capability</div>
            <p>Every team re-implementing auth means inconsistent enforcement and an audit nightmare. The goal is that a new service inherits security by <strong>configuration, not implementation</strong>.</p>
          </div>
          <div class="ans-block"><div class="ans-label">Layered architecture</div>
            <div class="flow-box">
              <div class="flow-step">EDGE — API Gateway / APIM: TLS, WAF, rate limits, token validation, correlation id</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">IDENTITY — Entra ID / IdentityServer: OIDC + OAuth2, MFA, token issuance, refresh</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">SHARED SDK — one NuGet package every service references</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">SERVICE — declarative attributes only: [Authorize(Policy = "CanApproveClaim")]</div><div class="flow-arrow">↓</div>
              <div class="flow-step">DATA — encryption at rest, row-level security, key rotation via Key Vault</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">What the shared SDK owns</div>
            <div class="code-box">Company.Security (single NuGet package)
  ├─ AddCompanyAuth()          JWT validation: issuer, audience, lifetime, signing keys
  ├─ AddCompanyAuthorization() policy registry, permission → policy mapping
  ├─ Claims transformation     enrich token claims with roles/permissions from store
  ├─ Audit middleware          who / what / when / from where — structured, tamper-evident
  ├─ PII redaction             logging filters so secrets never reach Log Analytics
  ├─ Correlation propagation   one id across every hop for traceability
  └─ Secure defaults           HSTS, security headers, cookie flags, HTTPS redirect

// A service consumes it in two lines:
builder.Services.AddCompanyAuth(builder.Configuration);
builder.Services.AddCompanyAuthorization();</div>
          </div>
          <div class="ans-block"><div class="ans-label">Policy-based authorization, not role checks scattered in code</div>
            <div class="code-box">// ❌ brittle — every role change means a code change
if (user.IsInRole("Manager") || user.IsInRole("Admin")) { ... }

// ✅ declarative and centrally defined
options.AddPolicy("CanApproveClaim", p =&gt;
    p.RequireAuthenticatedUser()
     .RequireClaim("permission", "claim.approve")
     .AddRequirements(new ClaimValueLimitRequirement(maxAmount: 50000)));

[Authorize(Policy = "CanApproveClaim")]
public async Task&lt;IActionResult&gt; Approve(int id) { ... }</div>
          </div>
          <div class="ans-block"><div class="ans-label">Compliance built in, not bolted on</div>
            <ul>
              <li><strong>Audit trail</strong> — every security-relevant action written to an append-only store with actor, action, resource, timestamp, source IP and correlation id.</li>
              <li><strong>Data classification</strong> — fields tagged Public / Internal / Confidential / PII, driving encryption and logging rules automatically.</li>
              <li><strong>Secrets</strong> — Key Vault plus Managed Identity, so no credentials exist in config or code.</li>
              <li><strong>Evidence</strong> — automated reports for access reviews and retention, because auditors ask for proof, not assurances.</li>
            </ul>
          </div>
          <div class="tip-box">✅ Closing point: "The test I apply is that a new microservice should get authentication, authorization, audit and PII protection by adding a package reference and a policy name — if a team has to write security code, the platform has failed."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q13</div>
      <div class="qa-body">
        <div class="qa-question">How would you design an application supporting Authentication, Authorization, Attribute-Based Routing, RBAC and MFA?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">End-to-end flow</div>
            <div class="code-box">1. User hits the app  →  redirected to Identity Provider (OIDC)
2. Credentials verified  →  RISK EVALUATED  →  MFA challenge if required
3. IdP issues ID token + access token (JWT) + refresh token
4. Client calls API with:  Authorization: Bearer &lt;access_token&gt;
5. Gateway validates signature, issuer, audience, expiry
6. API maps claims → permissions, evaluates the endpoint policy
7. Decision + full audit record</div>
          </div>
          <div class="ans-block"><div class="ans-label">RBAC done properly — roles are not permissions</div>
            <div class="code-box">USER ──many-to-many──► ROLE ──many-to-many──► PERMISSION ──► RESOURCE

  mahesh            ClaimsApprover        claim.approve         Claim
                                          claim.read
                    Auditor               audit.read            AuditLog

Roles are ASSIGNED. Permissions are CHECKED.
Adding a permission to a role must never require a code change.</div>
            <p>Put permissions in the token when the set is small, or resolve them server-side from a cache when it is large — tokens have a size limit and roles change more often than you can afford to re-issue them.</p>
          </div>
          <div class="ans-block"><div class="ans-label">Attribute-based routing + authorization together</div>
            <div class="code-box">[ApiController]
[Route("api/v{version:apiVersion}/claims")]
[Authorize]                                        // baseline: must be authenticated
public class ClaimsController : ControllerBase
{
    [HttpGet("{id:int}")]
    [Authorize(Policy = "claim.read")]
    public Task&lt;ClaimDto&gt; Get(int id) =&gt; ...

    [HttpPost("{id:int}/approve")]
    [Authorize(Policy = "claim.approve")]
    [RequireMfa]                                   // step-up for sensitive action
    public Task&lt;IActionResult&gt; Approve(int id) =&gt; ...

    [HttpDelete("{id:int}")]
    [Authorize(Policy = "claim.delete")]
    [RequireFreshAuth(maxAgeMinutes: 5)]           // re-auth for destructive action
    public Task&lt;IActionResult&gt; Delete(int id) =&gt; ...
}</div>
          </div>
          <div class="ans-block"><div class="ans-label">Step-up MFA — the detail that impresses</div>
            <div class="code-box">Not every action needs MFA. Tier by risk:

  Read own profile        → password only
  Approve a claim         → MFA within the last 8 hours
  Change bank details     → fresh MFA, right now
  Admin role assignment   → fresh MFA + second approver

Implementation: the IdP writes an "amr" (authentication methods) claim and an
"auth_time" claim into the token. A custom AuthorizationHandler checks them and
returns a 403 with a challenge hint, so the client can trigger step-up.</div>
          </div>
          <div class="ans-block"><div class="ans-label">Also design for</div>
            <ul>
              <li><strong>Multi-tenancy</strong> — tenant id as a claim, enforced in a global query filter so it cannot be forgotten.</li>
              <li><strong>Token lifetime</strong> — short access tokens (15 min) with refresh rotation; revocation list for immediate lockout.</li>
              <li><strong>Service-to-service</strong> — client credentials flow with Managed Identity, never shared user tokens.</li>
              <li><strong>Break-glass</strong> — an emergency admin path that is heavily audited and time-boxed.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q14</div>
      <div class="qa-body">
        <div class="qa-question">What are the different approaches for implementing MFA?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">The three factor categories — MFA means combining DIFFERENT categories</div>
            <div class="code-box">1. SOMETHING YOU KNOW      password, PIN, security question
2. SOMETHING YOU HAVE      phone, authenticator app, hardware key, smart card
3. SOMETHING YOU ARE       fingerprint, face, iris

Password + security question = NOT MFA (both are "know")
Password + TOTP code        = MFA        (know + have)</div>
          </div>
          <div class="ans-block"><div class="ans-label">Implementation approaches</div>
            <div class="decision-table">
              <div class="dt-row dt-header" style="grid-template-columns:1.2fr 1.6fr 1.4fr;">
                <div>Approach</div><div>How it works</div><div>When to choose</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.4fr;">
                <div class="dt-name">Delegate to the IdP</div><div>Entra ID / Auth0 owns enrolment, challenge and recovery</div><div class="dt-yes">Default. Least code, best security posture</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.4fr;">
                <div class="dt-name">Conditional access</div><div>Policy engine decides when MFA is required by risk signals</div><div class="dt-yes">Enterprise — balances security and friction</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.4fr;">
                <div class="dt-name">Step-up in-app</div><div>App requests a stronger token for sensitive operations</div><div>High-value actions inside a normal session</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.4fr;">
                <div class="dt-name">Build it yourself</div><div>You store TOTP secrets, generate and verify codes</div><div class="dt-no">Only when no IdP is possible</div>
              </div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Risk-based (adaptive) MFA — what mature systems do</div>
            <div class="code-box">Evaluate on every sign-in:
  Known device + usual location + normal hours   → no challenge
  New device                                      → MFA
  Impossible travel / anonymous IP / new country  → MFA + alert
  High-value transaction                          → MFA regardless of session
  Credential found in a breach dump               → block + force reset

Result: strong security with far less user friction than always-on MFA.</div>
          </div>
          <div class="ans-block"><div class="ans-label">Do not forget the unglamorous parts</div>
            <ul>
              <li><strong>Enrolment</strong> — how a user registers a factor securely on day one.</li>
              <li><strong>Recovery</strong> — lost phone. Backup codes, a second factor, or a verified helpdesk process. This is the most commonly attacked path.</li>
              <li><strong>Bypass accounts</strong> — a small number of break-glass identities, monitored closely.</li>
              <li><strong>Rate limiting</strong> — cap verification attempts to stop code brute-forcing.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q15</div>
      <div class="qa-body">
        <div class="qa-question">Compare MFA methods — Authenticator App, SMS/Phone, Hardware Keys. Advantages and disadvantages?</div>
        <div class="qa-answer">
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1fr 1.4fr 1.4fr;">
              <div>Method</div><div>Security</div><div>Advantages</div><div>Disadvantages</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1fr 1.4fr 1.4fr;">
              <div class="dt-name">SMS / Voice OTP</div><div class="dt-no">Weakest</div>
              <div>Universal — works on any phone, no app, users already understand it</div>
              <div>SIM swap, SS7 interception, phishable, network dependent, per-message cost</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1fr 1.4fr 1.4fr;">
              <div class="dt-name">Authenticator app (TOTP)</div><div>Good</div>
              <div>Works offline, free, no telecom dependency, resistant to SIM swap</div>
              <div>Still phishable (user can be tricked into typing the code), device loss needs recovery, clock drift</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1fr 1.4fr 1.4fr;">
              <div class="dt-name">Push notification</div><div>Good</div>
              <div>Best user experience — one tap; can show context (location, app)</div>
              <div><strong>MFA fatigue</strong> — spam the user until they approve. Needs number matching</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1fr 1.4fr 1.4fr;">
              <div class="dt-name">Hardware key (FIDO2)</div><div class="dt-yes">Strongest</div>
              <div><strong>Phishing-proof</strong> — origin-bound cryptography, nothing to type or intercept</div>
              <div>Cost per user, physical loss, needs USB/NFC support, enrolment logistics</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1fr 1.4fr 1.4fr;">
              <div class="dt-name">Biometrics / passkeys</div><div class="dt-yes">Very strong</div>
              <div>Fast, nothing to remember, built into modern devices</div>
              <div>Device-bound, privacy concerns, fallback path still needed</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Why FIDO2 is categorically different</div>
            <div class="code-box">TOTP / SMS — a SHARED SECRET the user reads and types
  Attacker builds a fake login page, user types the code, attacker replays it.
  The code does not know which site it is being given to.

FIDO2 / passkey — PUBLIC KEY CRYPTOGRAPHY bound to the origin
  The browser signs a challenge only for the registered origin.
  A phishing site at a different domain gets NOTHING it can replay.
  There is no code for the user to leak.</div>
          </div>
          <div class="ans-block"><div class="ans-label">Practical recommendation</div>
            <div class="code-box">Administrators / privileged access   FIDO2 hardware key — mandatory
Regular employees                    Authenticator app with number matching
Customers                            Passkeys, with authenticator app fallback
SMS                                  Last resort only, and never for admins
                                     (still better than no second factor)</div>
          </div>
          <div class="warn-box">⚠️ NIST guidance has discouraged SMS as a factor for years because of SIM-swap and interception risk. If a client insists on SMS, pair it with risk-based checks and never allow it for privileged accounts.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q16</div>
      <div class="qa-body">
        <div class="qa-question">What are the key considerations for Application Security when designing an enterprise application?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Design principles first</div>
            <ul>
              <li><strong>Defence in depth</strong> — no single control is the only thing standing between an attacker and the data.</li>
              <li><strong>Least privilege</strong> — every identity, service and connection string gets the minimum it needs.</li>
              <li><strong>Zero trust</strong> — never trust based on network position; authenticate and authorise every call.</li>
              <li><strong>Secure by default</strong> — the safe configuration is the one you get without doing anything.</li>
              <li><strong>Fail closed</strong> — if the authorization service is unreachable, deny; never default to allow.</li>
            </ul>
          </div>
          <div class="ans-block"><div class="ans-label">Layer-by-layer checklist</div>
            <div class="code-box">IDENTITY       OIDC/OAuth2 · MFA · short-lived tokens · refresh rotation
               Managed Identity for service-to-service — no shared secrets

INPUT          Validate on the server, always. Allow-lists over block-lists.
               Parameterised queries (never string-concatenated SQL)
               Output encoding for XSS · anti-forgery tokens · file-type checks

TRANSPORT      TLS 1.2+ everywhere, including internal hops · HSTS
               Certificate pinning for mobile · no mixed content

DATA           Encryption at rest (TDE / Always Encrypted for sensitive columns)
               Field-level encryption for PII · Key Vault + rotation
               Row-level security for multi-tenant isolation

SECRETS        Nothing in source control, config files or environment variables
               Key Vault + Managed Identity · automated rotation · secret scanning in CI

API            Rate limiting and throttling per client · request size caps
               Strict CORS · API versioning · security headers (CSP, X-Frame-Options)
               Never expose stack traces or internal ids in errors

LOGGING        Structured logs with correlation ids · PII redaction at the sink
               Append-only audit trail · alerting on auth failures and privilege changes

SUPPLY CHAIN   Dependency scanning (Dependabot) · SBOM · pinned versions
               Signed container images · scan images in the pipeline

PIPELINE       SAST + DAST + secret scanning as gates, not reports
               Infrastructure-as-code scanning · least-privilege deploy identity</div>
          </div>
          <div class="ans-block"><div class="ans-label">Process, not just technology</div>
            <ul>
              <li><strong>Threat modelling</strong> at design time — STRIDE over the data flow diagram, before code exists.</li>
              <li><strong>Security review</strong> as a checklist item in the definition of done.</li>
              <li><strong>Penetration testing</strong> before major releases, with findings tracked as defects.</li>
              <li><strong>Incident response plan</strong> — rehearsed, with clear roles and a communication path.</li>
              <li><strong>Patch cadence</strong> — a known, funded window; unpatched dependencies are the most common breach vector.</li>
            </ul>
          </div>
          <div class="tip-box">✅ Anchor the answer in OWASP Top 10 — broken access control, cryptographic failures, injection, insecure design, security misconfiguration. Naming it shows you work from an industry baseline rather than intuition.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q17</div>
      <div class="qa-body">
        <div class="qa-question">How would you design an application to handle PII and comply with GDPR?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Start from the GDPR rights — they are functional requirements</div>
            <div class="decision-table">
              <div class="dt-row dt-header" style="grid-template-columns:1.3fr 1.7fr;">
                <div>Right</div><div>What the system must be able to do</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.3fr 1.7fr;">
                <div class="dt-name">Access</div><div>Export everything held about one person, across every store</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.3fr 1.7fr;">
                <div class="dt-name">Erasure</div><div>Delete or anonymise on request — including backups and logs</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.3fr 1.7fr;">
                <div class="dt-name">Rectification</div><div>Correct inaccurate data and propagate the correction</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.3fr 1.7fr;">
                <div class="dt-name">Portability</div><div>Export in a structured, machine-readable format</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.3fr 1.7fr;">
                <div class="dt-name">Restrict / object</div><div>Flag records so processing stops without deleting</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.3fr 1.7fr;">
                <div class="dt-name">Breach notification</div><div>Detect and report within 72 hours — needs real monitoring</div>
              </div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Architectural moves</div>
            <div class="code-box">1. KNOW WHERE PII IS
   Data inventory + classification attributes in code, so it is discoverable:
     [PersonalData] public string Email { get; set; }
     [SensitivePersonalData] public string NationalId { get; set; }
   Scanners can then prove no PII leaked into a new table or log.

2. CENTRALISE IT
   A dedicated PII/customer service owns identity data.
   Other services store a CUSTOMER ID only — a pseudonymous key.
   Erasure then has ONE place to act, instead of forty.

3. MINIMISE
   Do not collect what you cannot justify. Do not copy PII into
   analytics, test data or logs. Mask at the source.

4. ENCRYPT
   TLS in transit · TDE at rest · column-level encryption for sensitive fields
   Separate keys per data category, rotated, held in Key Vault.

5. RETAIN DELIBERATELY
   Every category gets a retention period and an automated purge job.
   "We keep everything forever" is a compliance finding.</div>
          </div>
          <div class="ans-block"><div class="ans-label">Erasure — the genuinely hard part</div>
            <div class="code-box">CHALLENGE                       APPROACH
Data spread across services     Publish a CustomerErasureRequested event;
                                each service handles its own data and
                                acknowledges — orchestrated saga with tracking

Backups cannot be edited        Document it: backups age out under a stated
                                retention window; restored data is re-scrubbed
                                by replaying the erasure log

Legal hold conflicts            Erasure is not absolute — tax and AML rules may
                                require retention. Anonymise instead of delete:
                                keep the transaction, sever the identity

Analytics / warehouse           Store pseudonymous ids; drop the mapping table
                                entry so the data can no longer be linked

Logs                            Never log PII in the first place — redact at the
                                sink so it is structurally impossible</div>
          </div>
          <div class="ans-block"><div class="ans-label">Also required</div>
            <ul>
              <li><strong>Consent management</strong> — record what was consented to, when, and the version of the notice shown; make withdrawal as easy as giving.</li>
              <li><strong>Data residency</strong> — pin storage to the required region; be deliberate about cross-border transfer.</li>
              <li><strong>Processor agreements</strong> — every third party touching PII needs a DPA and a review.</li>
              <li><strong>Privacy by design</strong> — a DPIA for high-risk processing, done at design time.</li>
              <li><strong>Audit</strong> — who accessed which person's data and why; this is what regulators ask for first.</li>
            </ul>
          </div>
          <div class="tip-box">✅ Strong framing: "I treat GDPR rights as user stories with acceptance criteria, not as a legal appendix. If 'export everything about this person' cannot be executed in one operation, the architecture is not compliant — regardless of what the policy document says."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q18</div>
      <div class="qa-body">
        <div class="qa-question">Design a system that receives account data from four source systems in different formats and consolidates it into a target system.</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">The problem</div>
            <div class="code-box">System 1  Account Information — Format 1
System 2  Account + Tax Information
System 3  Account + Liability Information
System 4  Account Information — Format 2

Different schemas · different semantics · same real-world account
Goal: consolidate, transform, and push into a new target system</div>
          </div>
          <div class="ans-block"><div class="ans-label">Architecture — pipes and filters with a canonical model</div>
            <div class="flow-box">
              <div class="flow-step">1. INGESTION — one adapter per source. API pull, file drop, CDC or event feed</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">2. LANDING ZONE — raw payload stored immutably, exactly as received</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">3. VALIDATION — schema, required fields, referential checks → quarantine on failure</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">4. TRANSFORM — map each format to ONE canonical Account model</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">5. MATCH &amp; MERGE — resolve identity across sources, apply survivorship rules</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">6. ENRICH — derive fields, add reference data</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">7. PUBLISH — push to target, with retry, idempotency and reconciliation</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">The canonical model is the heart of the design</div>
            <div class="code-box">// Without it: 4 sources × 1 target = 4 mappings today,
// and N×M mappings the day a fifth source or second target appears.
// With it:    4 inbound mappings + 1 outbound. Linear growth.

public class CanonicalAccount
{
    public string GlobalAccountId { get; set; }     // OUR id, not theirs
    public SourceRef[] Sources { get; set; }        // provenance per field
    public AccountCore Core { get; set; }           // number, type, status, opened
    public TaxInfo Tax { get; set; }                // from System 2 — nullable
    public LiabilityInfo Liability { get; set; }    // from System 3 — nullable
    public DateTime AsOfUtc { get; set; }
}</div>
            <p>Nullable sections matter: not every source supplies every section, and the model must represent partial knowledge honestly rather than inventing defaults.</p>
          </div>
          <div class="ans-block"><div class="ans-label">Identity resolution and survivorship — the real difficulty</div>
            <div class="code-box">MATCHING
  Deterministic first:  exact account number + branch/sort code
  Then fuzzy:           name + DOB + address similarity above a threshold
  Below threshold:      route to a human stewardship queue — never auto-merge

SURVIVORSHIP (which value wins when sources disagree?)
  Rule per field, agreed with the business, not decided by the developer:
    Tax details        → System 2 is authoritative
    Liability balance  → System 3 is authoritative
    Address            → most recently updated wins
    Legal name         → System 1 (system of record)
  Always keep the losing values with provenance — auditors will ask
  "why does the target say X when System 4 says Y?"</div>
          </div>
          <div class="ans-block"><div class="ans-label">Technology mapping on Azure</div>
            <div class="code-box">Ingestion      Azure Functions (per-source adapters) · Event Grid on blob arrival
               Service Bus queue per source for back-pressure and retry
Landing        Blob Storage / ADLS — immutable raw zone, partitioned by date+source
Processing     .NET services on AKS or Durable Functions for orchestration
State          PostgreSQL / SQL for canonical store + match keys
Publish        Outbox pattern → Service Bus → target adapter with idempotency key
Observability  App Insights · per-source record counts · reconciliation report
Errors         Dead-letter queue + quarantine container + stewardship UI</div>
          </div>
          <div class="ans-block"><div class="ans-label">Non-functionals to state unprompted</div>
            <ul>
              <li><strong>Idempotency</strong> — a replayed file must not duplicate accounts; key on source + natural id + version.</li>
              <li><strong>Ordering</strong> — later updates must not be overwritten by a late-arriving earlier one; carry a version or timestamp.</li>
              <li><strong>Reconciliation</strong> — daily counts and checksums per source versus target; this is what finance will ask for.</li>
              <li><strong>Replay</strong> — the immutable landing zone means you can reprocess history after fixing a mapping bug.</li>
              <li><strong>Schema evolution</strong> — versioned adapters, so a source changing its format does not stop the pipeline.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q19</div>
      <div class="qa-body">
        <div class="qa-question">Why choose a complex application architecture instead of a simple ETL-based solution for this problem?</div>
        <div class="qa-answer">
          <div class="warn-box">⚠️ Careful — this is a trap question. The honest answer is <strong>"often you shouldn't"</strong>. Jumping to a service architecture when ETL would do is over-engineering, and a good interviewer is testing whether you reach for complexity by default.</div>
          <div class="ans-block"><div class="ans-label">Justify the application approach only when these are true</div>
            <div class="decision-table">
              <div class="dt-row dt-header" style="grid-template-columns:1.2fr 1.8fr;">
                <div>Driver</div><div>Why ETL struggles</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.8fr;">
                <div class="dt-name">Real-time need</div><div>ETL is batch-oriented; if the business needs accounts within seconds of change, scheduled batches cannot deliver it</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.8fr;">
                <div class="dt-name">Complex business rules</div><div>Survivorship, fuzzy matching and conditional enrichment become unmaintainable in visual mapping tools</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.8fr;">
                <div class="dt-name">Human workflow</div><div>Stewardship queues, approvals and exception handling need a UI and state — not a data pipeline</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.8fr;">
                <div class="dt-name">Testability</div><div>Business rules in code get unit tests, code review, branching and CI; ETL mappings are hard to test and diff</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.8fr;">
                <div class="dt-name">Per-record error handling</div><div>ETL tends to fail a whole batch; services can quarantine one record and continue</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.8fr;">
                <div class="dt-name">Reuse as a service</div><div>If other systems need to query consolidated accounts on demand, you need an API — not a nightly table</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.8fr;">
                <div class="dt-name">Auditability</div><div>Regulated finance data needs field-level provenance and a replayable trail, which is awkward to bolt onto ETL</div>
              </div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">The honest trade-off</div>
            <div class="code-box">APPLICATION ARCHITECTURE COSTS YOU
  More code to write, test and own
  Deployment, scaling and monitoring of running services
  Engineers on call — a pipeline that fails at 2am now pages someone
  Higher initial delivery time

IT IS WORTH IT WHEN
  The logic is genuinely complex AND changes often
  Latency requirements rule out batch
  Humans must intervene in the flow
  The consolidated data is a PRODUCT other systems consume, not just a table</div>
          </div>
          <div class="tip-box">✅ The answer that lands: "I would not choose complexity for its own sake. For a nightly one-way load with simple field mapping, ADF or SSIS is the right call and I would say so. I move to a service architecture when the matching and survivorship rules are real business logic that needs versioning and tests, when the business needs near-real-time updates, or when exceptions require human stewardship — because those are the three things ETL tools handle badly."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q20</div>
      <div class="qa-body">
        <div class="qa-question">Could a traditional ETL approach be used here? When is ETL preferable, and when would you choose an application/service architecture?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Yes — ETL absolutely could solve this</div>
            <p>Four sources, format transformation, load into a target is the textbook ETL use case. Azure Data Factory, SSIS, Informatica or Talend would all do it, and for a straightforward nightly consolidation that is the <strong>cheaper and faster</strong> answer.</p>
          </div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.3fr 1.4fr 1.4fr;">
              <div>Dimension</div><div>Choose ETL</div><div>Choose application / services</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.3fr 1.4fr 1.4fr;">
              <div class="dt-name">Latency</div><div>Hourly or nightly is fine</div><div>Seconds — event driven</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.3fr 1.4fr 1.4fr;">
              <div class="dt-name">Volume shape</div><div>Large bulk loads</div><div>Continuous stream of changes</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.3fr 1.4fr 1.4fr;">
              <div class="dt-name">Logic</div><div>Field mapping, lookups, simple rules</div><div>Fuzzy matching, survivorship, conditional workflows</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.3fr 1.4fr 1.4fr;">
              <div class="dt-name">Change frequency</div><div>Rules are stable</div><div>Rules change often and need tests</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.3fr 1.4fr 1.4fr;">
              <div class="dt-name">Human in the loop</div><div class="dt-no">None</div><div class="dt-yes">Stewardship, approvals, exception queues</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.3fr 1.4fr 1.4fr;">
              <div class="dt-name">Consumers</div><div>A reporting table or warehouse</div><div>APIs and events other systems subscribe to</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.3fr 1.4fr 1.4fr;">
              <div class="dt-name">Team skills</div><div>Data engineers, existing ETL platform</div><div>Application engineers, CI/CD maturity</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.3fr 1.4fr 1.4fr;">
              <div class="dt-name">Cost / time</div><div class="dt-yes">Lower — tooling does the heavy lifting</div><div>Higher build and run cost</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">The pragmatic answer: hybrid</div>
            <div class="code-box">Most real programmes end up here, and saying so shows judgement:

  ETL / ADF        bulk historical load, initial migration, nightly reconciliation
                   (moves millions of rows efficiently — do not rewrite that in C#)

  Services         real-time deltas via CDC or events, matching and survivorship
                   logic, stewardship UI, the API other systems consume

  Shared           ONE canonical model and ONE set of business rules, so batch and
                   real-time paths cannot drift apart and produce different answers</div>
          </div>
          <div class="ans-block"><div class="ans-label">How I would actually decide</div>
            <div class="code-box">Ask four questions:
  1. How fresh must the target data be?          → batch vs streaming
  2. How complex and volatile are the rules?     → tool vs code
  3. Does a human ever need to intervene?        → pipeline vs application
  4. Who consumes the output, and how?           → table vs API

Three or four answers pointing at "code" justify the application architecture.
One or two, and I would start with ETL and evolve only if needed.</div>
          </div>
          <div class="tip-box">✅ Closing line: "Start with the simplest thing that meets the requirement, and make sure the canonical model is shared so you can evolve from ETL to services later without rewriting the business rules. The model is the durable asset — the execution engine is replaceable."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q21</div>
      <div class="qa-body">
        <div class="qa-question">What Architectural Principles do you apply when designing enterprise systems — beyond SOLID?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">SOLID is class-level. These operate one level up — at the system and service level</div>
            <p>SOLID tells you how to shape a class. The principles below tell you how to shape a <strong>system</strong>: where boundaries go, how much to build, and what to optimise for. Interviewers ask this to see whether your judgement scales past a single codebase.</p>
          </div>

          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.9fr;">
              <div>Principle</div><div>What it means in practice</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;">
              <div class="dt-name">Separation of Concerns</div><div>Each module owns one axis of change — presentation, business rules, persistence never mixed in one class</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;">
              <div class="dt-name">DRY</div><div>One authoritative source per piece of knowledge — not "no duplicate lines", but "no duplicate decisions"</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;">
              <div class="dt-name">KISS</div><div>The simplest design that satisfies today's real requirement — complexity must be earned, not assumed</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;">
              <div class="dt-name">YAGNI</div><div>Don't build the extension point until a second real use case demands it</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;">
              <div class="dt-name">Loose Coupling</div><div>Depend on contracts, not implementations, across service boundaries — swap one side without touching the other</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;">
              <div class="dt-name">High Cohesion</div><div>Things that change together live together; things that change for different reasons live apart</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;">
              <div class="dt-name">Idempotency</div><div>Retrying an operation produces the same end state — non-negotiable once messaging is async</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;">
              <div class="dt-name">Fail Fast / Defence in Depth</div><div>Detect problems at the boundary, not three layers downstream; assume any single control can fail</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;">
              <div class="dt-name">Design for Failure</div><div>Every network call has a timeout, retry policy and fallback — distributed systems fail partially, constantly</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;">
              <div class="dt-name">CQRS (where it fits)</div><div>Split read and write models when their scaling or complexity needs genuinely diverge — not by default</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;">
              <div class="dt-name">Eventual Consistency</div><div>Accept a bounded staleness window in exchange for availability and scale — and design the UI to say so</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;">
              <div class="dt-name">Convention over Configuration</div><div>Sensible defaults everywhere; configuration is the exception, not the baseline</div>
            </div>
          </div>

          <div class="ans-block"><div class="ans-label">The two that get violated most in real codebases</div>
            <div class="code-box">DRY, misapplied
  Two services both have a "Customer" concept that LOOKS similar and gets
  merged into one shared model. Six months later a change for Billing
  breaks Support, because the concepts were never actually the same thing.
  → DRY is about knowledge, not shape. Similar-looking code in two
    different bounded contexts is not duplication — it is coincidence.

YAGNI, ignored
  A generic "PluginManager" is built on day one "in case we need plugins".
  No second consumer ever appears. It sits there forever as untested
  surface area and a source of bugs nobody exercises in production.
  → Build the abstraction when the SECOND real use case shows up,
    not in anticipation of a first one that might never come.</div>
          </div>

          <div class="ans-block"><div class="ans-label">How they compose in one real decision</div>
            <div class="code-box">Scenario: adding a new "send confirmation" step after checkout

KISS + YAGNI     → Start with a direct call, not an event bus, if this is
                   the only consumer today
Loose coupling   → Still hide it behind an INotificationSender interface,
                   so the concrete channel (email/SMS) can change freely
Design for       → The call gets a timeout, a retry, and a fallback queue
failure            — checkout must NOT fail because notification is slow
Idempotency      → The confirmation carries an order id; sending it twice
                   must not double-charge or double-ship
Separation of    → Notification logic never touches payment or inventory
concerns           code, even though it is called from the same request

Result: simple today (KISS/YAGNI), safe to extend tomorrow (loose coupling),
and safe under real network conditions (failure design + idempotency).</div>
          </div>

          <div class="warn-box">⚠️ These principles regularly pull in opposite directions — DRY vs loose coupling, KISS vs design-for-failure. An architect's job is not reciting the list; it is knowing which principle should win for a <em>specific</em> decision, and being able to explain why.</div>

          <div class="tip-box">✅ Strong closing line: "SOLID keeps a class honest. These principles keep a system honest — they are how I decide where a boundary goes, how much to build before there is a second consumer, and how the system behaves when a dependency is slow or down rather than just when everything works."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q22</div>
      <div class="qa-body">
        <div class="qa-question">Choreography vs Orchestration — how do services communicate in each, and how does this relate to two-phase / multi-phase commit?</div>
        <div class="qa-answer">

          <div class="ans-block"><div class="ans-label">The core distinction</div>
            <p>Both coordinate a multi-step business process across services. The difference is <strong>where the decision-making authority lives</strong>.</p>
            <div class="flow-box">
              <div class="flow-step">CHOREOGRAPHY — every service reacts to events; no one is in charge</div>
              <div class="flow-arrow">vs</div>
              <div class="flow-step blue">ORCHESTRATION — one coordinator tells each service what to do, in order</div>
            </div>
          </div>

          <div class="ans-block"><div class="ans-label">Choreography — event-driven, decentralised</div>
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

          <div class="ans-block"><div class="ans-label">Orchestration — command-driven, centralised</div>
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

          <div class="hr soft"></div>

          <div class="ans-block"><div class="ans-label">Where multi-phase commit fits in</div>
            <p>Both patterns above are really different answers to the same underlying problem as <strong>distributed transactions</strong>: how do you keep several independent data stores consistent when one logical operation spans all of them? Multi-phase commit is the classical (pre-microservices) answer; choreography/orchestration with Sagas is the modern one.</p>
          </div>

          <div class="ans-block"><div class="ans-label">Two-Phase Commit (2PC)</div>
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

          <div class="ans-block"><div class="ans-label">Three-Phase Commit (3PC) — 2PC's fix for one failure mode</div>
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
          </div>

          <div class="warn-box">⚠️ Why 2PC/3PC lost to Sagas in microservices: they hold locks across a network call, so total throughput is capped by the slowest participant. A coordinator crash mid-protocol can leave every participant blocked. And it requires every participant to speak the same transaction protocol (XA) — impossible once you mix SQL, NoSQL, and third-party APIs. This is a strong-consistency, low-availability trade-off — the opposite of what most microservice systems need.</div>

          <div class="ans-block"><div class="ans-label">The Saga — the microservices-era replacement</div>
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
          </div>

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
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q23</div>
      <div class="qa-body">
        <div class="qa-question">List and explain the 23 Gang of Four (GoF) Design Patterns.</div>
        <div class="qa-answer">

          <div class="ans-block"><div class="ans-label">The three families</div>
            <div class="flow-box">
              <div class="flow-step">CREATIONAL (5) — how objects get created</div>
              <div class="flow-arrow">→</div>
              <div class="flow-step blue">STRUCTURAL (7) — how objects are composed</div>
              <div class="flow-arrow">→</div>
              <div class="flow-step green">BEHAVIORAL (11) — how objects communicate and share responsibility</div>
            </div>
            <p>5 + 7 + 11 = 23. The original 1994 catalogue from Gamma, Helm, Johnson and Vlissides ("Design Patterns: Elements of Reusable Object-Oriented Software").</p>
          </div>

          <div class="ans-block"><div class="ans-label">🏗️ Creational — 5 patterns</div>
            <div class="decision-table">
              <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.9fr;">
                <div>Pattern</div><div>Problem it solves</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;">
                <div class="dt-name">Singleton</div><div>Guarantee exactly one instance exists, with a global access point — e.g. a config manager or connection pool</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;">
                <div class="dt-name">Factory Method</div><div>Let subclasses decide which concrete class to instantiate, so the base class never names it directly</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;">
                <div class="dt-name">Abstract Factory</div><div>Produce a whole FAMILY of related objects (e.g. Windows vs Mac UI widgets) without specifying concrete classes</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;">
                <div class="dt-name">Builder</div><div>Construct a complex object step by step, separating construction from the final representation</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;">
                <div class="dt-name">Prototype</div><div>Create new objects by cloning an existing configured instance, instead of building from scratch</div>
              </div>
            </div>
            <div class="code-box">// Factory Method vs Abstract Factory — the distinction that trips people up
Factory Method    → ONE product, subclass decides which variant
                    CreateProcessor() returns IPaymentProcessor

Abstract Factory  → a FAMILY of related products, created together
                    IUiFactory.CreateButton() + CreateCheckbox() + CreateMenu()
                    — WindowsUiFactory vs MacUiFactory each give you a
                      matching, consistent SET of widgets</div>
          </div>

          <div class="ans-block"><div class="ans-label">🧩 Structural — 7 patterns</div>
            <div class="decision-table">
              <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.9fr;">
                <div>Pattern</div><div>Problem it solves</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;">
                <div class="dt-name">Adapter</div><div>Convert one interface into another the client expects — bridges incompatible APIs</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;">
                <div class="dt-name">Bridge</div><div>Separate an abstraction from its implementation so both can vary independently</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;">
                <div class="dt-name">Composite</div><div>Treat individual objects and groups of objects uniformly — a tree structure, e.g. files and folders</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;">
                <div class="dt-name">Decorator</div><div>Attach new behaviour to an object dynamically, without subclassing — wrap, don't inherit</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;">
                <div class="dt-name">Facade</div><div>Provide one simplified interface over a complex subsystem of many classes</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;">
                <div class="dt-name">Flyweight</div><div>Share common state across many fine-grained objects to reduce memory — e.g. character glyphs in a text editor</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;">
                <div class="dt-name">Proxy</div><div>Provide a stand-in that controls access to a real object — lazy loading, access control, remote calls, caching</div>
              </div>
            </div>
            <div class="code-box">// Adapter vs Facade vs Decorator — commonly confused trio
Adapter    → makes TWO incompatible interfaces work together
             new ThirdPartyLoggerAdapter(thirdPartyLib) : IAppLogger

Facade     → hides the COMPLEXITY of a subsystem behind ONE simple call
             orderFacade.PlaceOrder()  // internally: validate → charge →
             reserve stock → notify — caller sees ONE method

Decorator  → ADDS behaviour to an object without changing its interface
             new LoggingDecorator(new CachingDecorator(new RealService()))</div>
          </div>

          <div class="ans-block"><div class="ans-label">🎭 Behavioral — 11 patterns</div>
            <div class="decision-table">
              <div class="dt-row dt-header" style="grid-template-columns:1.2fr 1.8fr;">
                <div>Pattern</div><div>Problem it solves</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.8fr;">
                <div class="dt-name">Strategy</div><div>Encapsulate interchangeable algorithms behind one interface, selected at runtime — e.g. pricing rules</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.8fr;">
                <div class="dt-name">Observer</div><div>Notify multiple dependents automatically when one object's state changes — the basis of events/pub-sub</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.8fr;">
                <div class="dt-name">Command</div><div>Turn a request into a standalone object — enables undo, queuing, logging, and retry of the request itself</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.8fr;">
                <div class="dt-name">State</div><div>Let an object change its behaviour when its internal state changes — looks like it changed class</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.8fr;">
                <div class="dt-name">Template Method</div><div>Define the skeleton of an algorithm in a base class; let subclasses override specific steps only</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.8fr;">
                <div class="dt-name">Chain of Responsibility</div><div>Pass a request along a chain of handlers until one handles it — e.g. middleware pipelines</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.8fr;">
                <div class="dt-name">Mediator</div><div>Centralise complex communication between many objects so they don't reference each other directly</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.8fr;">
                <div class="dt-name">Memento</div><div>Capture and restore an object's internal state without violating encapsulation — undo/snapshot</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.8fr;">
                <div class="dt-name">Iterator</div><div>Access elements of a collection sequentially without exposing its underlying structure</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.8fr;">
                <div class="dt-name">Visitor</div><div>Add new operations to a group of classes without modifying them — the operation "visits" each type</div>
              </div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.8fr;">
                <div class="dt-name">Interpreter</div><div>Define a grammar and an interpreter for a simple language — e.g. evaluating rule expressions</div>
              </div>
            </div>
            <div class="code-box">// Strategy vs State — the pair everyone mixes up
Strategy  → CLIENT chooses which algorithm to use, and it doesn't change
            on its own. "Use CreditCardStrategy for this payment."

State     → the OBJECT ITSELF switches behaviour as ITS OWN state changes.
            OrderState: Pending → Paid → Shipped — each state has different
            allowed transitions, and the order drives its own state changes.

Same shape (interface + swappable implementations) — different INTENT.</div>
          </div>

          <div class="ans-block"><div class="ans-label">The five you will actually use most in enterprise .NET code</div>
            <div class="code-box">Strategy     → pricing rules, validation rules, discount engines
Decorator    → cross-cutting concerns: logging, caching, retry wrappers
Observer     → C# events, IObservable&lt;T&gt;, domain events, Pub/Sub
Factory      → DI container registrations, "create the right handler" logic
Chain of     → ASP.NET Core middleware pipeline IS this pattern —
Responsibility  each middleware decides: handle, or call next()</div>
          </div>

          <div class="warn-box">⚠️ Do not memorise all 23 for an interview — that reads as rote learning. Know the 3 families, be fluent explaining 6-8 patterns you have genuinely used, and be ready to say <em>why</em> you chose one over a similar-looking alternative (Strategy vs State, Adapter vs Facade, Factory Method vs Abstract Factory). That comparative reasoning is what interviewers are actually testing.</div>

          <div class="tip-box">✅ Strong closing line: "I don't reach for a named pattern first — I let the problem tell me which shape fits. If I need to swap an algorithm at runtime, that's Strategy. If I need to react to a state change without polling, that's Observer. Most of the patterns I use daily — Chain of Responsibility in middleware, Decorator for cross-cutting concerns, Factory through the DI container — are already baked into the frameworks I work with, so recognising them matters more than hand-rolling them."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q24</div>
      <div class="qa-body">
        <div class="qa-question">What are the different types of Cohesion? Which one should you aim for?</div>
        <div class="qa-answer">

          <div class="ans-block"><div class="ans-label">Recap: cohesion measures how focused a module is</div>
            <p>Cohesion is how strongly the responsibilities <em>inside one module</em> relate to each other. It runs on a scale from worst (accidental grouping) to best (one true purpose). Structured design named seven levels — knowing where your own code sits on this scale is the actual skill.</p>
            <div class="code-box">WORST ─────────────────────────────────────────────────────────► BEST

Coincidental → Logical → Temporal → Procedural → Communicational → Sequential → Functional

     ↑ grouped by accident              grouped by                    grouped by ONE
       or convenience                   real workflow                 well-defined purpose</div>
          </div>

          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.3fr 1.7fr;">
              <div>Type</div><div>What it means</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.3fr 1.7fr;">
              <div class="dt-name">1. Coincidental</div><div>Elements grouped with NO meaningful relationship — pure convenience or accident. The worst kind.</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.3fr 1.7fr;">
              <div class="dt-name">2. Logical</div><div>Elements grouped because they fall in the same LOGICAL category, but do different things — a caller picks which one to run via a flag</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.3fr 1.7fr;">
              <div class="dt-name">3. Temporal</div><div>Elements grouped because they happen at the same TIME — e.g. "everything that runs at startup"</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.3fr 1.7fr;">
              <div class="dt-name">4. Procedural</div><div>Elements grouped because they follow a certain ORDER of execution, even if they don't share data</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.3fr 1.7fr;">
              <div class="dt-name">5. Communicational</div><div>Elements grouped because they operate on the SAME DATA — e.g. all functions reading/writing one record</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.3fr 1.7fr;">
              <div class="dt-name">6. Sequential</div><div>Output of one element feeds directly as INPUT to the next — a real pipeline, in order, on shared data</div>
            </div>
            <div class="dt-row" style="grid-template-columns:1.3fr 1.7fr;">
              <div class="dt-name">7. Functional</div><div class="dt-yes">Every element contributes to ONE single, well-defined task. Nothing extra, nothing unrelated. The goal.</div>
            </div>
          </div>

          <div class="ans-block"><div class="ans-label">In code — worst to best</div>
            <div class="code-box">// 1. COINCIDENTAL — genuinely no relationship. This actually happens
//    in real "Utils" or "Helpers" classes that grow without discipline.
public class Utils
{
    public static string FormatDate(DateTime d) { ... }
    public static decimal CalculateTax(decimal amount) { ... }
    public static void SendEmail(string to, string body) { ... }
    public static bool IsPrime(int n) { ... }
}

// 2. LOGICAL — same category, different behaviour picked by a flag
public class InputHandler
{
    public void Handle(string source, InputType type)
    {
        if (type == InputType.Keyboard) { ... }
        else if (type == InputType.Mouse) { ... }
        else if (type == InputType.Touch) { ... }
        // one method doing THREE unrelated jobs, selected by a switch
    }
}

// 3. TEMPORAL — bundled only because they all run "at startup"
public class ApplicationStartup
{
    public void Initialize()
    {
        LoadConfiguration();
        WarmUpCache();
        RegisterEventHandlers();
        SendStartupNotificationEmail();   // ← unrelated to the other three,
    }                                     //   just happens at the same time
}

// 4. PROCEDURAL — sequenced, but working on DIFFERENT data
public class ReportGenerator
{
    public void Run()
    {
        ValidateUserPermissions();   // works with User
        FetchSalesData();            // works with Sales
        FormatCurrency();            // works with a decimal
        // order matters, but they don't share a common data thread
    }
}

// 5. COMMUNICATIONAL — different operations, SAME underlying data
public class CustomerRecordProcessor
{
    public void Process(Customer c)
    {
        ValidateCustomer(c);
        UpdateCustomerAddress(c);
        LogCustomerAccess(c);
        // three different concerns, but all centred on the same Customer
    }
}

// 6. SEQUENTIAL — output of step N is the input to step N+1
public class OrderPipeline
{
    public Invoice Process(Order order)
    {
        var validated = Validate(order);
        var priced    = ApplyPricing(validated);
        var taxed     = ApplyTax(priced);
        return GenerateInvoice(taxed);   // each step feeds the next directly
    }
}

// 7. FUNCTIONAL — the gold standard: ONE clear purpose, nothing else
public class TaxCalculator
{
    public decimal CalculateTax(decimal amount, TaxRegion region)
        =&gt; amount * GetRate(region);
    // does exactly one job. Nothing here is unrelated to "calculating tax".
}</div>
          </div>

          <div class="ans-block"><div class="ans-label">Which one to aim for — and why it matters in practice</div>
            <div class="code-box">AIM FOR: Functional cohesion (7), or Sequential (6) for pipeline-shaped code.

WHY LOW COHESION HURTS
  Coincidental/Logical/Temporal classes have MULTIPLE reasons to change
  → directly violates Single Responsibility Principle
  → a change for one reason risks breaking an unrelated reason
  → hard to name well ("Utils", "Manager", "Helper" are cohesion red flags)
  → hard to test in isolation, hard to reuse without dragging in the rest

WHY HIGH COHESION HELPS
  One clear purpose → one clear name → one reason to change
  → easy to unit test, easy to reuse, easy to reason about
  → naturally leads to LOW COUPLING too, because a focused class
    needs fewer, more specific collaborators</div>
          </div>

          <div class="warn-box">⚠️ The interview trap: cohesion and SRP measure the SAME idea from two angles. Low cohesion is not a separate defect from an SRP violation — it is the symptom you can literally see. If you find yourself struggling to name a class without using "and" or "Manager"/"Utils"/"Helper", that is low cohesion talking.</div>

          <div class="tip-box">✅ Closing line: "I use the cohesion scale as a quick smell test, not just theory — if a class only has a fuzzy connective ('these all run at startup', 'these are all about users') rather than one real purpose, I know it will accumulate unrelated changes over time. I actively refactor toward functional or sequential cohesion, because that is also what makes SOLID's Single Responsibility Principle concrete instead of abstract."</div>
        </div>
      </div>
    </div>

  </div>
`;
