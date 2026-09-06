window.Pages['ref-core-principles'] = `
<div class="page-header">
  <div class="breadcrumb">Architecture › <span>Core Design Principles</span></div>
  <h1>🧭 Core Design Principles</h1>
  <p>The 20 principles an architect actually reasons from — class-level, system-level, and operational</p>
</div>

<div class="ref-section">
  <div class="ref-title">The 20, At A Glance</div>
  <div class="ref-body">
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">1</div><div class="principle-name">High Cohesion</div><p>Each module does one focused job — everything inside it relates to that job.</p></div>
      <div class="principle-card"><div class="principle-icon">2</div><div class="principle-name">Low Coupling</div><p>Modules depend on each other as little as possible, and through abstractions.</p></div>
      <div class="principle-card"><div class="principle-icon">3</div><div class="principle-name">SOLID</div><p>Five class-design principles: SRP, OCP, LSP, ISP, DIP.</p></div>
      <div class="principle-card"><div class="principle-icon">4</div><div class="principle-name">Separation of Concerns</div><p>Different responsibilities live in different modules — UI, logic, data never mixed.</p></div>
      <div class="principle-card"><div class="principle-icon">5</div><div class="principle-name">DRY</div><p>One authoritative source per piece of knowledge — not zero duplicate lines.</p></div>
      <div class="principle-card"><div class="principle-icon">6</div><div class="principle-name">KISS</div><p>The simplest design that satisfies today's real requirement.</p></div>
      <div class="principle-card"><div class="principle-icon">7</div><div class="principle-name">YAGNI</div><p>Don't build for a need that doesn't exist yet.</p></div>
      <div class="principle-card"><div class="principle-icon">8</div><div class="principle-name">Composition over Inheritance</div><p>Assemble behaviour from small parts rather than deep class hierarchies.</p></div>
      <div class="principle-card"><div class="principle-icon">9</div><div class="principle-name">Program to Interfaces</div><p>Depend on what a thing does, never on its concrete type.</p></div>
      <div class="principle-card"><div class="principle-icon">10</div><div class="principle-name">Principle of Least Knowledge</div><p>Talk only to your immediate collaborators — the Law of Demeter.</p></div>
      <div class="principle-card"><div class="principle-icon">11</div><div class="principle-name">Fail Fast</div><p>Detect and surface a problem at the boundary, not three layers downstream.</p></div>
      <div class="principle-card"><div class="principle-icon">12</div><div class="principle-name">Design for Failure</div><p>Assume any dependency can be slow, down, or wrong — build for that reality.</p></div>
      <div class="principle-card"><div class="principle-icon">13</div><div class="principle-name">Statelessness</div><p>A service instance holds no client state between requests — any node handles any request.</p></div>
      <div class="principle-card"><div class="principle-icon">14</div><div class="principle-name">Idempotency</div><p>Doing an operation twice has the same effect as doing it once.</p></div>
      <div class="principle-card"><div class="principle-icon">15</div><div class="principle-name">Encapsulation</div><p>Bundle data with the behaviour that operates on it, behind a controlled boundary.</p></div>
      <div class="principle-card"><div class="principle-icon">16</div><div class="principle-name">Information Hiding</div><p>Hide implementation detail so callers depend only on what a module reveals.</p></div>
      <div class="principle-card"><div class="principle-icon">17</div><div class="principle-name">Least Privilege</div><p>Every identity and component gets the minimum access it needs — nothing more.</p></div>
      <div class="principle-card"><div class="principle-icon">18</div><div class="principle-name">Defense in Depth</div><p>No single control is the only thing standing between an attacker and the data.</p></div>
      <div class="principle-card"><div class="principle-icon">19</div><div class="principle-name">Convention over Configuration</div><p>Sensible defaults everywhere; configuration is the exception, not the baseline.</p></div>
      <div class="principle-card"><div class="principle-icon">20</div><div class="principle-name">Don't Repeat Knowledge</div><p>DRY's precise form — duplication of a DECISION is the problem, not duplication of text.</p></div>
    </div>
    <div class="tip-box">💡 Notice the shape: 1-10 are mostly <b>class and module</b> level, 11-14 are <b>distributed systems</b> concerns, 15-16 are <b>boundary/API</b> concerns, 17-18 are <b>security</b>, and 19-20 close the loop back to simplicity. Group them this way in your head, not as a flat list of 20.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">1 &amp; 2 — High Cohesion &amp; Low Coupling</div>
  <div class="ref-body">
    <p>These two travel together and are usually asked as one question. <b>Cohesion</b> is about the inside of one module — how focused it is. <b>Coupling</b> is about the relationship between two modules — how tightly they depend on each other. You want cohesion HIGH and coupling LOW.</p>
    <div class="code-box">HIGH COHESION                          LOW COUPLING
One class, one clear purpose           Classes depend on INTERFACES,
Everything in it relates               not concrete implementations
to that purpose                        A change in one rarely forces
"TaxCalculator" only calculates tax    a change in another</div>
    <div class="warn-box">⚠️ A class can be low-coupling and still low-cohesion (small, decoupled, but doing three unrelated things). The two are independent axes — don't conflate them in an interview answer.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">3 — SOLID</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:0.5fr 1fr 1.6fr;"><div>#</div><div>Principle</div><div>One line</div></div>
      <div class="dt-row" style="grid-template-columns:0.5fr 1fr 1.6fr;"><div class="dt-name">S</div><div>Single Responsibility</div><div>One reason to change per class</div></div>
      <div class="dt-row" style="grid-template-columns:0.5fr 1fr 1.6fr;"><div class="dt-name">O</div><div>Open/Closed</div><div>Extend via new code, not by editing existing code</div></div>
      <div class="dt-row" style="grid-template-columns:0.5fr 1fr 1.6fr;"><div class="dt-name">L</div><div>Liskov Substitution</div><div>A subtype must be usable anywhere its base type is expected</div></div>
      <div class="dt-row" style="grid-template-columns:0.5fr 1fr 1.6fr;"><div class="dt-name">I</div><div>Interface Segregation</div><div>Many small interfaces beat one fat one</div></div>
      <div class="dt-row" style="grid-template-columns:0.5fr 1fr 1.6fr;"><div class="dt-name">D</div><div>Dependency Inversion</div><div>Depend on abstractions; let DI supply the concrete type</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">4 — Separation of Concerns</div>
  <div class="ref-body">
    <p>Each axis of change gets its own module: presentation, business rules, persistence never mixed in one class. This is what makes Clean Architecture, layered architecture, and MVC/MVVM all work — they are all separation of concerns applied at a system level.</p>
    <div class="code-box">❌ Controller that validates, calculates tax, AND writes SQL directly
✅ Controller → Service (business rules) → Repository (persistence)
   Each layer changes for its own reason only</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">5 &amp; 20 — DRY and "Don't Repeat Knowledge"</div>
  <div class="ref-body">
    <p>DRY is the most misquoted principle in the list — most people apply it to <i>text</i> ("these two methods look similar, merge them") when it is actually about <i>knowledge</i>. That's precisely why #20 exists as its own separate, more precise restatement.</p>
    <div class="code-box">WRONG DRY — merging by shape
  Two services both have a "Customer" class that LOOKS similar.
  Merged into one shared model. Six months later a Billing change
  breaks Support, because the concepts were never the same thing.

RIGHT DRY — one source per DECISION
  The business rule "an order is late after 3 days" should exist
  in exactly ONE place. If five methods hardcode the number 3,
  that is duplicated KNOWLEDGE, not duplicated code, and it WILL
  drift the day someone changes only one of the five.</div>
    <div class="tip-box">💡 Interview line: "Similar-looking code in two different bounded contexts is coincidence, not duplication. DRY is about not letting one piece of business knowledge have two independent places it can be edited."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">6 &amp; 7 — KISS &amp; YAGNI</div>
  <div class="ref-body">
    <p>Both fight the same enemy: complexity built for a future that may never arrive.</p>
    <div class="code-box">KISS   — the simplest design that satisfies TODAY'S real requirement
YAGNI  — don't build the extension point until a SECOND real use case
         demands it

Example: a generic "PluginManager" built on day one "in case we need
plugins" — no second consumer ever appears. It sits as untested
surface area forever. Build the abstraction when the second real
consumer shows up, not in anticipation of a first one.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">8 — Composition over Inheritance</div>
  <div class="ref-body">
    <div class="code-box">❌ Deep inheritance                    ✅ Composition
class FlyingCar : Car, Airplane        class Car {
  // fragile, rigid, multiple             IEngine engine;
  // inheritance headaches                IFlightModule flight; // optional
}                                       }
                                        // assemble behaviour from parts,
                                        // swap a part without a new class</div>
    <p>Inheritance locks in a relationship at compile time and couples subclasses tightly to base-class internals (fragile base class problem). Composition assembles behaviour from independent, swappable parts — closer to how Strategy and Decorator work.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">9 — Program to Interfaces, Not Implementations</div>
  <div class="ref-body">
    <div class="code-box">❌ private SqlOrderRepository _repo = new SqlOrderRepository();
✅ private readonly IOrderRepository _repo;   // supplied via DI

Callers depend on WHAT a collaborator does, never on HOW it does it.
This is what makes mocking, testing, and swapping implementations possible.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">10 — Principle of Least Knowledge (Law of Demeter)</div>
  <div class="ref-body">
    <div class="code-box">❌ order.Customer.Address.Country.TaxRules.GetRate()
   // reaches through FOUR objects — a change anywhere in that
   // chain breaks this caller

✅ order.GetApplicableTaxRate()
   // Order exposes what callers need; internal structure stays hidden

RULE OF THUMB: talk only to your immediate friends —
  your own fields, your parameters, objects you create,
  not objects reached by chaining through someone else.</div>
    <div class="warn-box">⚠️ Long method-chains (<code>a.b.c.d.Method()</code>) are the textbook Demeter violation and a very common code-review finding.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">11 &amp; 12 — Fail Fast &amp; Design for Failure</div>
  <div class="ref-body">
    <p>Two sides of the same coin: fail fast is about <i>your own</i> code catching bad input immediately; design for failure is about <i>surviving</i> when a dependency fails.</p>
    <div class="code-box">FAIL FAST                               DESIGN FOR FAILURE
Validate at the boundary                Every network call has a
Throw/reject immediately —              timeout, retry policy, and
don't let bad state propagate           circuit breaker
"Guard clauses" at the top              Assume partial failure is
of a method                             the NORMAL operating condition,
                                        not the exception</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">13 &amp; 14 — Statelessness &amp; Idempotency</div>
  <div class="ref-body">
    <div class="code-box">STATELESSNESS
  No server-side session tied to one instance. Any request can be
  served by any node → horizontal scaling and rolling deploys just work.
  State moves to: the token (JWT), a distributed cache (Redis), or a DB.

IDEMPOTENCY
  Calling an operation twice = same result as calling it once.
  Essential once you have retries (and in distributed systems, you
  always do) — a retried "charge card" call must not double-charge.

  Implementation: an idempotency key (client-generated GUID) on the
  request; the server checks "have I already processed this key?"
  before executing.</div>
    <div class="tip-box">💡 These two are why REST/HTTP scales so well — stateless by design — and why messaging systems demand idempotent consumers (at-least-once delivery means duplicates are normal, not a bug).</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">15 &amp; 16 — Encapsulation &amp; Information Hiding</div>
  <div class="ref-body">
    <p>Related but distinct: encapsulation is the mechanism (bundling data + behaviour, private fields, public methods); information hiding is the goal (callers should not need to know internal detail to use the module correctly).</p>
    <div class="code-box">class BankAccount
{
    private decimal _balance;              // ENCAPSULATION: hidden field

    public void Withdraw(decimal amount)   // INFORMATION HIDING: caller
    {                                       // doesn't know or care HOW
        if (amount > _balance)              // the balance is validated
            throw new InsufficientFundsException();
        _balance -= amount;
    }
}
// Caller can never do "_balance -= 1000000" directly and corrupt state.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">17 &amp; 18 — Least Privilege &amp; Defense in Depth</div>
  <div class="ref-body">
    <div class="code-box">LEAST PRIVILEGE                         DEFENSE IN DEPTH
Every identity, service, and            No single control is the only
connection string gets the MINIMUM      thing standing between an
access it needs — nothing more          attacker and the data.
Managed Identity scoped to one          Network layer + auth layer +
Key Vault, not the whole subscription   input validation + encryption
                                        + audit — layered, redundant</div>
    <div class="tip-box">💡 These two are the backbone of most application-security answers — see the fuller checklist in the Aezion Q16 answer (Application Security Considerations) for the complete layer-by-layer breakdown.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">19 — Convention over Configuration</div>
  <div class="ref-body">
    <div class="code-box">❌ Every controller needs an explicit route registered in a central file
✅ ASP.NET Core: a controller named OrdersController automatically
   maps to /api/orders — override only when you need to deviate

The framework's DEFAULT is the common case. Configuration exists
only for the exceptions, not as the baseline requirement.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">How They Compose — One Real Decision</div>
  <div class="ref-body">
    <div class="code-box">Scenario: adding a "send confirmation" step after checkout

KISS + YAGNI       → Start with a direct call, not an event bus,
                     if this is the only consumer today
Program to         → Hide it behind an INotificationSender interface
interfaces           so the concrete channel (email/SMS) can change
Design for         → The call gets a timeout, retry, and fallback
failure              queue — checkout must NOT fail because
                     notification is slow
Idempotency        → The confirmation carries an order id; sending
                     it twice must not double-notify
Separation of      → Notification logic never touches payment or
concerns             inventory code, even called from the same request

Result: simple today, safe to extend tomorrow, safe under real
network conditions — five principles, one coherent decision.</div>
    <div class="warn-box">⚠️ These principles often pull in opposite directions (DRY vs low coupling, KISS vs design-for-failure). An architect's real job is not reciting the list — it is knowing which principle should win for a SPECIFIC decision, and being able to explain why.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Interview Answer</div>
  <div class="ref-body">
    <div class="tip-box">✅ "SOLID keeps a class honest. Principles like cohesion, coupling, and separation of concerns keep a system honest. Statelessness, idempotency and design-for-failure keep it honest under real distributed conditions — partial failure, retries, and scale. Least privilege and defense in depth keep it honest under attack. I don't apply these as a checklist — I use them to decide where a boundary goes, how much to build before a second real consumer exists, and how the system behaves when something goes wrong rather than only when everything works."</div>
  </div>
</div>
`;
