window.Pages['ref-gof-patterns'] = `
<div class="page-header">
  <div class="breadcrumb">Architecture › <span>GoF Design Patterns</span></div>
  <h1>🧱 The 23 Gang of Four Design Patterns</h1>
  <p>Creational, Structural, Behavioral — with the commonly-confused pairs and what shows up most in real .NET code</p>
</div>

<div class="ref-section">
  <div class="ref-title">The Three Families</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step">CREATIONAL (5) — how objects get created</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step blue">STRUCTURAL (7) — how objects are composed</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step green">BEHAVIORAL (11) — how objects communicate and share responsibility</div>
    </div>
    <p>5 + 7 + 11 = 23. The original 1994 catalogue from Gamma, Helm, Johnson and Vlissides ("Design Patterns: Elements of Reusable Object-Oriented Software").</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">🏗️ Creational — 5 patterns</div>
  <div class="ref-body">
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
</div>

<div class="ref-section">
  <div class="ref-title">🧩 Structural — 7 patterns</div>
  <div class="ref-body">
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
</div>

<div class="ref-section">
  <div class="ref-title">🎭 Behavioral — 11 patterns</div>
  <div class="ref-body">
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
</div>

<div class="ref-section">
  <div class="ref-title">What You Actually Use Most In Enterprise .NET Code</div>
  <div class="ref-body">
    <div class="code-box">Strategy     → pricing rules, validation rules, discount engines
Decorator    → cross-cutting concerns: logging, caching, retry wrappers
Observer     → C# events, IObservable&lt;T&gt;, domain events, Pub/Sub
Factory      → DI container registrations, "create the right handler" logic
Chain of     → ASP.NET Core middleware pipeline IS this pattern —
Responsibility  each middleware decides: handle, or call next()</div>
    <div class="warn-box">⚠️ Do not memorise all 23 for an interview — that reads as rote learning. Know the 3 families, be fluent explaining 6-8 patterns you have genuinely used, and be ready to say <em>why</em> you chose one over a similar-looking alternative (Strategy vs State, Adapter vs Facade, Factory Method vs Abstract Factory). That comparative reasoning is what interviewers are actually testing.</div>
    <div class="tip-box">✅ Strong closing line: "I don't reach for a named pattern first — I let the problem tell me which shape fits. If I need to swap an algorithm at runtime, that's Strategy. If I need to react to a state change without polling, that's Observer. Most of the patterns I use daily — Chain of Responsibility in middleware, Decorator for cross-cutting concerns, Factory through the DI container — are already baked into the frameworks I work with, so recognising them matters more than hand-rolling them."</div>
  </div>
</div>
`;
