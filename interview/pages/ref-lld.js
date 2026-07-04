window.Pages['ref-lld'] = `
<div class="page-header">
  <div class="breadcrumb">Architect Reference › <span>Low-Level Design (LLD)</span></div>
  <h1>🔍 Low-Level Design (LLD) — Complete Reference</h1>
  <p>Class design, UML notation, API contracts, schema design, sequence diagrams, and a worked machine-coding example</p>
</div>

<div class="ref-section">
  <div class="ref-title">What Is LLD — Purpose &amp; Audience</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Definition</div>
        <p>LLD takes ONE component from the HLD and designs its <strong>internals</strong> — classes, interfaces, methods, database schema, and API contracts — detailed enough that a developer can start coding directly from it.</p>
        <div class="ans-label" style="margin-top:12px;">Audience</div>
        <ul>
          <li>Developers implementing the component</li>
          <li>Tech leads doing design/code review</li>
          <li>QA engineers designing test cases</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">What LLD Must Answer</div>
        <div class="code-box">1. What classes/interfaces exist, and their responsibilities?
2. How do classes relate (inheritance, composition)?
3. What are the exact API request/response contracts?
4. What does the DB schema look like (tables, keys, indexes)?
5. What design patterns apply, and where?
6. How are errors/edge cases handled?
7. What are the key sequence flows step-by-step?</div>
      </div>
    </div>
    <div class="tip-box" style="margin-top:12px;">✅ Rule of thumb: if a junior developer could not start writing code from your LLD without asking clarifying questions, it's not detailed enough yet.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">The LLD Process — Step by Step</div>
  <div class="ref-body">
    <div class="code-box">Step 1: IDENTIFY ENTITIES &amp; RESPONSIBILITIES
  List the nouns (entities) and verbs (behaviors) from the requirement.
  Apply Single Responsibility — one class, one reason to change.

Step 2: DEFINE RELATIONSHIPS
  Is-a → inheritance. Has-a (owns lifecycle) → composition.
  Has-a (shared/independent lifecycle) → aggregation. Uses-a → dependency.

Step 3: APPLY SOLID + DESIGN PATTERNS
  Identify varying behavior → Strategy. Object creation complexity → Factory/Builder.
  Notify on state change → Observer. Data access abstraction → Repository.

Step 4: DESIGN THE API CONTRACT
  Endpoint, HTTP verb, request DTO, response DTO, status codes, error shape.

Step 5: DESIGN THE DATA MODEL
  Tables/columns, primary/foreign keys, indexes, normalization level.

Step 6: DRAW SEQUENCE DIAGRAMS
  For each critical flow, show the exact call order between classes/services.

Step 7: HANDLE EDGE CASES &amp; ERRORS
  Null/empty input, concurrent access, partial failure, idempotency.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">UML Relationship Quick Reference</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Relationship</div><div>Meaning</div><div>Notation</div><div>Example</div></div>
      <div class="pt-row"><div class="pt-name">Inheritance (Is-a)</div><div>Subclass extends superclass behavior</div><div>Hollow triangle arrow →</div><div>Car is-a Vehicle</div></div>
      <div class="pt-row"><div class="pt-name">Composition (Has-a, strong)</div><div>Owns the part; part dies with the whole</div><div>Filled diamond ◆—</div><div>House has-a Room</div></div>
      <div class="pt-row"><div class="pt-name">Aggregation (Has-a, weak)</div><div>Owns the reference; part can outlive the whole</div><div>Hollow diamond ◇—</div><div>Department has-a Employee</div></div>
      <div class="pt-row"><div class="pt-name">Association</div><div>General "knows about" / uses relationship</div><div>Plain line —</div><div>Driver drives Car</div></div>
      <div class="pt-row"><div class="pt-name">Dependency (Uses-a)</div><div>Temporary use, usually a method parameter</div><div>Dashed arrow ⇢</div><div>OrderService uses PaymentGateway</div></div>
      <div class="pt-row"><div class="pt-name">Realization</div><div>Class implements an interface's contract</div><div>Dashed hollow triangle ⇢</div><div>PayPalGateway implements IPaymentGateway</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">API Contract Design</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Contract Checklist</div>
        <ul>
          <li>Resource-oriented URL (<code>/orders/{id}</code>, not <code>/getOrder</code>)</li>
          <li>Correct HTTP verb (GET/POST/PUT/PATCH/DELETE) and status codes (200/201/400/404/409/500)</li>
          <li>Versioned (<code>/v1/orders</code>) so contracts can evolve safely</li>
          <li>Consistent error shape across every endpoint</li>
          <li>Idempotency key for POST operations that must not double-execute</li>
          <li>Pagination for list endpoints (cursor or offset)</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Example Contract — Create Order</div>
        <div class="code-box">POST /v1/orders
Request:
{
  "customerId": "C123",
  "items": [{ "sku": "S1", "qty": 2 }],
  "idempotencyKey": "req-9f1a..."
}

Response 201:
{
  "orderId": "O987",
  "status": "PENDING",
  "totalAmount": 59.98,
  "createdAt": "2026-01-01T10:00:00Z"
}

Response 409 (duplicate idempotency key):
{ "error": "DUPLICATE_REQUEST", "orderId": "O987" }</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Database Schema Design (LLD level)</div>
  <div class="ref-body">
    <div class="code-box">TABLE orders
  id             UUID PRIMARY KEY
  customer_id    UUID NOT NULL REFERENCES customers(id)
  status         VARCHAR(20) NOT NULL   -- PENDING/CONFIRMED/CANCELLED
  total_amount   DECIMAL(10,2) NOT NULL
  created_at     TIMESTAMP NOT NULL DEFAULT now()
  INDEX idx_orders_customer_id (customer_id)
  INDEX idx_orders_status_created (status, created_at)

TABLE order_items
  id           UUID PRIMARY KEY
  order_id     UUID NOT NULL REFERENCES orders(id)
  sku          VARCHAR(50) NOT NULL
  quantity     INT NOT NULL CHECK (quantity > 0)
  unit_price   DECIMAL(10,2) NOT NULL
  INDEX idx_order_items_order_id (order_id)</div>
    <div class="warn-box" style="margin-top:10px;">⚠️ Decide normalization level explicitly: normalize (3NF) for transactional consistency; denormalize deliberately for read-heavy reporting tables — and say which one you picked and why.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Sequence Diagram — Worked Example (Place Order)</div>
  <div class="ref-body">
    <div class="code-box">Client        OrderService      InventoryService    PaymentService     DB
  |                |                   |                  |             |
  |--POST /orders->|                   |                  |             |
  |                |--reserveStock()-->|                  |             |
  |                |<--reserved:true---|                  |             |
  |                |--charge()------------------------------------->   |
  |                |<--charged:true----------------------------------- |
  |                |--INSERT order (status=CONFIRMED)------------------>|
  |                |<--orderId--------------------------------------- |
  |<--201 Created--|                   |                  |             |
  |                |                   |                  |             |
  [Failure path: if charge() fails]
  |                |--releaseStock()-->|                  |             |
  |                |--INSERT order (status=CANCELLED)------------------>|
  |<--402 Payment Failed--|            |                  |             |</div>
    <div class="tip-box" style="margin-top:10px;">✅ Always draw the failure/compensation path, not just the happy path — this is what separates a junior LLD from a senior one.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Design Patterns Applied at LLD Level</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Pattern</div><div>Problem It Solves</div><div>LLD Example</div><div>Category</div></div>
      <div class="pt-row"><div class="pt-name">Strategy</div><div>Swap an algorithm/behavior at runtime</div><div>PricingStrategy: RegularPricing, DiscountPricing</div><div>Behavioral</div></div>
      <div class="pt-row"><div class="pt-name">Factory Method</div><div>Decouple object creation from usage</div><div>PaymentGatewayFactory.create("stripe")</div><div>Creational</div></div>
      <div class="pt-row"><div class="pt-name">Builder</div><div>Construct complex objects step by step</div><div>OrderBuilder.addItem().setAddress().build()</div><div>Creational</div></div>
      <div class="pt-row"><div class="pt-name">Repository</div><div>Abstract data access from business logic</div><div>IOrderRepository → SqlOrderRepository</div><div>Structural</div></div>
      <div class="pt-row"><div class="pt-name">Observer</div><div>Notify dependents on state change</div><div>OrderStatusChanged → NotifyCustomer, UpdateInventory</div><div>Behavioral</div></div>
      <div class="pt-row"><div class="pt-name">State</div><div>Object behavior changes with internal state</div><div>Order: Pending → Confirmed → Shipped → Delivered</div><div>Behavioral</div></div>
      <div class="pt-row"><div class="pt-name">Decorator</div><div>Add responsibilities without subclassing</div><div>LoggingOrderService wraps OrderService</div><div>Structural</div></div>
    </div>
    <div class="tip-box" style="margin-top:10px;">See <a href="#" onclick="showPage('ref-patterns',document.querySelector('[onclick*=ref-patterns]'));return false;">🧱 Design Patterns</a> for the full catalog with implementation code.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Worked Example — LLD for a Parking Lot System (Classic Machine Coding Problem)</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Core Classes &amp; Responsibilities</div>
        <div class="code-box">ParkingLot
  - list&lt;ParkingFloor&gt; floors
  - findAvailableSpot(VehicleType): ParkingSpot
  - parkVehicle(Vehicle): Ticket
  - unparkVehicle(Ticket): Receipt

ParkingFloor
  - list&lt;ParkingSpot&gt; spots

ParkingSpot (abstract)
  ├── CompactSpot
  ├── LargeSpot
  └── HandicapSpot
  - isOccupied: bool
  - vehicle: Vehicle

Vehicle (abstract)
  ├── Car ├── Bike └── Truck

Ticket
  - id, vehicle, spot, entryTime

PricingStrategy (interface)
  ├── HourlyPricing
  └── FlatRatePricing

ParkingLot uses Singleton
  (only one instance manages the whole lot)</div>
      </div>
      <div>
        <div class="ans-label">Key Design Decisions</div>
        <ul>
          <li><strong>Singleton</strong> — ParkingLot has exactly one instance (global entry point)</li>
          <li><strong>Strategy</strong> — PricingStrategy lets fee calculation vary by spot type/duration without touching ParkingLot logic</li>
          <li><strong>Factory</strong> — VehicleFactory / SpotFactory decide the concrete subclass to instantiate</li>
          <li><strong>Inheritance</strong> — ParkingSpot/Vehicle hierarchies model is-a relationships (Car is-a Vehicle)</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Edge Cases to Call Out</div>
        <ul>
          <li>Lot is full → return null / raise domain exception, don't crash</li>
          <li>Concurrent parking requests → lock/atomic check-and-reserve on the spot</li>
          <li>Lost ticket → recovery flow charging a max-rate fee</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">LLD Interview Checklist</div>
  <div class="ref-body">
    <ul>
      <li>✅ Every class has a single, clearly stated responsibility</li>
      <li>✅ Used interfaces at integration boundaries (DB, payment gateway, external API) — not concrete classes</li>
      <li>✅ Named at least one applicable design pattern and justified it</li>
      <li>✅ API contract has explicit request/response shapes and error codes, not just "returns the order"</li>
      <li>✅ Schema has primary/foreign keys and at least the obvious indexes</li>
      <li>✅ Covered a failure/edge case, not just the happy path</li>
      <li>✅ Design is unit-testable — dependencies are injectable, not hardcoded/static</li>
    </ul>
    <div class="alert tip" style="margin-top:12px;">
      <strong>💡 Related pages</strong>
      <p>Start from <a href="#" onclick="showPage('ref-hld',document.querySelector('[onclick*=ref-hld]'));return false;">📐 High-Level Design (HLD)</a> to define component boundaries first, then drill into LLD per component. For SOLID principles referenced above, see <a href="#" onclick="showPage('ref-fundamentals',document.querySelector('[onclick*=ref-fundamentals]'));return false;">📐 SOLID · OSI · SQL vs NoSQL</a>.</p>
    </div>
  </div>
</div>
`;
