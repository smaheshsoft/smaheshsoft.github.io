window.Pages['ref-fundamentals'] = `
<div class="page-header">
  <div class="breadcrumb">Deep Dive › <span>CS Fundamentals</span></div>
  <h1>📐 CS Fundamentals</h1>
  <p>SOLID Principles · OSI Model · SQL vs NoSQL · When to Use What</p>
</div>

<!-- ════════════════════════════════════════════════════════ -->
<!--  SOLID PRINCIPLES                                        -->
<!-- ════════════════════════════════════════════════════════ -->

<div class="ref-section">
  <div class="ref-title">SOLID — One-Line Summary</div>
  <div class="ref-body">
    <div class="code-box">S — Single Responsibility  : One class, ONE reason to change.
O — Open/Closed            : Open for extension, CLOSED for modification.
L — Liskov Substitution    : Subclass must be substitutable for its parent.
I — Interface Segregation  : Many small interfaces &gt; one fat interface.
D — Dependency Inversion   : Depend on ABSTRACTIONS, not concretions.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">S — Single Responsibility Principle</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">❌ Violation</div>
        <div class="code-box">// OrderService does too many things:
public class OrderService {
    public void PlaceOrder(Order o) { ... }   // business logic
    public void SaveToDatabase(Order o) { ... } // DB concern
    public void SendEmail(Order o) { ... }    // notification
    public void GeneratePdf(Order o) { ... }  // reporting
}

// Problem: changing email template forces you to
// retest/redeploy the entire OrderService.</div>
      </div>
      <div>
        <div class="ans-label">✅ Correct</div>
        <div class="code-box">// Each class has one reason to change:
public class OrderService {
    public void PlaceOrder(Order o) { ... }  // only business logic
}

public class OrderRepository {
    public void Save(Order o) { ... }        // only DB
}

public class OrderEmailNotifier {
    public void Notify(Order o) { ... }      // only email
}

public class OrderPdfGenerator {
    public Stream Generate(Order o) { ... }  // only PDF
}</div>
      </div>
    </div>
    <div class="tip-box">✅ Ask: "If this class changes, how many different reasons could cause that change?" More than one = SRP violation. Common fix: extract to separate service/class.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">O — Open/Closed Principle</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">❌ Violation — switch/if chains</div>
        <div class="code-box">public decimal CalculateDiscount(Order o) {
    if (o.CustomerType == "VIP")
        return o.Total * 0.20m;
    else if (o.CustomerType == "Regular")
        return o.Total * 0.10m;
    else if (o.CustomerType == "Employee")  // add new type?
        return o.Total * 0.30m;             // modify this class!
    return 0;
}
// Adding "New" customer type = modify existing code = risk.</div>
      </div>
      <div>
        <div class="ans-label">✅ Correct — extend without modifying</div>
        <div class="code-box">public interface IDiscountStrategy {
    decimal Calculate(Order order);
}

public class VipDiscount : IDiscountStrategy {
    public decimal Calculate(Order o) => o.Total * 0.20m;
}
public class RegularDiscount : IDiscountStrategy {
    public decimal Calculate(Order o) => o.Total * 0.10m;
}
// New requirement: add EmployeeDiscount
// → NEW class, zero changes to existing code!
public class EmployeeDiscount : IDiscountStrategy {
    public decimal Calculate(Order o) => o.Total * 0.30m;
}</div>
      </div>
    </div>
    <div class="tip-box">✅ Achieved via: Strategy pattern, polymorphism, dependency injection. Spot violations: large if/else or switch on "type" that grows over time.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">L — Liskov Substitution Principle</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">❌ Violation — Square extends Rectangle</div>
        <div class="code-box">public class Rectangle {
    public virtual int Width  { get; set; }
    public virtual int Height { get; set; }
    public int Area() => Width * Height;
}

public class Square : Rectangle {
    public override int Width {
        set { base.Width = value; base.Height = value; }
    }
}

// LSP violation:
Rectangle r = new Square();
r.Width  = 4;
r.Height = 5;
// Expected area: 20. Actual: 25! (Square overrides Height)
// Substituting Square for Rectangle BREAKS behavior.</div>
      </div>
      <div>
        <div class="ans-label">✅ Correct — don't force IS-A</div>
        <div class="code-box">// Fix: don't inherit, use a common interface.
public interface IShape {
    int Area();
}

public class Rectangle : IShape {
    public int Width  { get; init; }
    public int Height { get; init; }
    public int Area() => Width * Height;
}

public class Square : IShape {
    public int Side { get; init; }
    public int Area() => Side * Side;
}

// Rule of thumb:
// If subclass must override to "break" or "ignore"
// a base class contract → LSP violation.
// Use composition or interface instead of inheritance.</div>
      </div>
    </div>
    <div class="warn-box">⚠️ Key check: can you replace a base class object with a subclass object everywhere without changing program behavior? If not → LSP is violated.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">I — Interface Segregation Principle</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">❌ Violation — Fat interface</div>
        <div class="code-box">public interface IWorker {
    void Work();
    void Eat();
    void Sleep();
}

// Robot implements IWorker but doesn't eat/sleep!
public class Robot : IWorker {
    public void Work() { /* ok */ }
    public void Eat()  { throw new NotImplementedException(); }
    public void Sleep(){ throw new NotImplementedException(); }
}

// Problem: Robot is FORCED to implement methods it doesn't need.</div>
      </div>
      <div>
        <div class="ans-label">✅ Correct — segregated interfaces</div>
        <div class="code-box">public interface IWorkable  { void Work(); }
public interface IEatable   { void Eat(); }
public interface ISleepable { void Sleep(); }

public class Human : IWorkable, IEatable, ISleepable {
    public void Work()  { /* ok */ }
    public void Eat()   { /* ok */ }
    public void Sleep() { /* ok */ }
}

// Robot only implements what it needs:
public class Robot : IWorkable {
    public void Work() { /* ok */ }
}

// .NET example: IEnumerable vs ICollection vs IList
// → each adds more capability, nothing forced.</div>
      </div>
    </div>
    <div class="tip-box">✅ Practical sign of violation: classes implementing an interface and throwing NotImplementedException or leaving methods empty. Fix: split the interface.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">D — Dependency Inversion Principle</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">❌ Violation — depends on concretion</div>
        <div class="code-box">public class OrderService {
    // Hard dependency on concrete class!
    private readonly SqlOrderRepository _repo
        = new SqlOrderRepository();

    public void PlaceOrder(Order o) {
        _repo.Save(o);
    }
}

// Problems:
// Cannot unit test without real SQL database.
// Cannot swap repository (e.g., CosmosDb) without
// changing OrderService.
// Tightly coupled.</div>
      </div>
      <div>
        <div class="ans-label">✅ Correct — depends on abstraction</div>
        <div class="code-box">// High-level module defines the abstraction:
public interface IOrderRepository {
    Task SaveAsync(Order order);
}

// Low-level module implements it:
public class SqlOrderRepository : IOrderRepository {
    public Task SaveAsync(Order o) { /* SQL */ }
}

// High-level module depends on abstraction:
public class OrderService {
    private readonly IOrderRepository _repo;

    public OrderService(IOrderRepository repo) // DI
        => _repo = repo;

    public async Task PlaceOrderAsync(Order o)
        => await _repo.SaveAsync(o);
}

// Test: inject MockOrderRepository.
// Prod: inject SqlOrderRepository via DI container.</div>
      </div>
    </div>
    <div class="tip-box">✅ DIP is why Dependency Injection exists. ASP.NET Core's DI container is the DIP mechanism. High-level = business logic. Low-level = infrastructure (DB, email, HTTP).</div>
  </div>
</div>

<!-- ════════════════════════════════════════════════════════ -->
<!--  OSI MODEL                                               -->
<!-- ════════════════════════════════════════════════════════ -->

<div class="ref-section">
  <div class="ref-title">OSI Model — 7 Layers</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>#</div><div>Layer</div><div>What it does</div><div>Protocols / Examples</div></div>
      <div class="pt-row"><div class="pt-name">7</div><div><strong>Application</strong></div><div>End-user facing. Data format &amp; semantics.</div><div>HTTP, HTTPS, FTP, SMTP, DNS, gRPC, WebSocket</div></div>
      <div class="pt-row"><div class="pt-name">6</div><div><strong>Presentation</strong></div><div>Encoding, encryption, compression.</div><div>TLS/SSL, JSON, XML, JPEG, GZIP, Base64</div></div>
      <div class="pt-row"><div class="pt-name">5</div><div><strong>Session</strong></div><div>Manage sessions, auth, reconnect.</div><div>NetBIOS, RPC, OAuth sessions, SQL sessions</div></div>
      <div class="pt-row"><div class="pt-name">4</div><div><strong>Transport</strong></div><div>End-to-end delivery, ports, reliability.</div><div>TCP (reliable), UDP (fast), TLS (sits here/above)</div></div>
      <div class="pt-row"><div class="pt-name">3</div><div><strong>Network</strong></div><div>Logical addressing, routing between networks.</div><div>IP (IPv4/IPv6), ICMP, BGP, OSPF, Routers</div></div>
      <div class="pt-row"><div class="pt-name">2</div><div><strong>Data Link</strong></div><div>Node-to-node on same network, MAC address, error detection.</div><div>Ethernet, Wi-Fi (802.11), MAC, Switches, ARP</div></div>
      <div class="pt-row"><div class="pt-name">1</div><div><strong>Physical</strong></div><div>Raw bits over physical medium.</div><div>Cables (fiber, copper), radio waves, NIC, hubs</div></div>
    </div>
    <div class="tip-box">✅ Mnemonic (top→down): <strong>All People Seem To Need Data Processing</strong>. Or bottom→top: <strong>Please Do Not Throw Sausage Pizza Away</strong>.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">OSI — What Happens When You Type a URL</div>
  <div class="ref-body">
    <div class="code-box">You type: https://api.company.com/orders

Layer 7 — Application:
  Browser creates HTTP GET request.
  DNS resolves api.company.com → 1.2.3.4

Layer 6 — Presentation:
  TLS handshake: negotiate cipher, exchange keys.
  HTTP request encrypted with AES-256-GCM session key.

Layer 5 — Session:
  TLS session established and maintained.

Layer 4 — Transport:
  TCP: 3-way handshake (SYN → SYN-ACK → ACK).
  Source port: 54321 (ephemeral). Dest port: 443.
  Data split into TCP segments, sequence numbers assigned.

Layer 3 — Network:
  IP header added: src 10.0.0.5 → dst 1.2.3.4
  Router looks up next hop in routing table, forwards packet.

Layer 2 — Data Link:
  Ethernet frame: src MAC → dst MAC (next hop router's MAC).
  ARP resolves gateway IP → MAC if needed.

Layer 1 — Physical:
  Frame transmitted as electrical signals / light pulses / radio waves.</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Where Devices Operate</div>
        <div class="code-box">Layer 1: Hub, repeater, cable, NIC
Layer 2: Switch (uses MAC address table)
Layer 3: Router (uses IP routing table)
Layer 4: Firewall rules (TCP/UDP ports)
Layer 7: Load balancer (L7 = reads HTTP headers)
          WAF (inspects HTTP content)
          API Gateway (HTTP routing)</div>
      </div>
      <div>
        <div class="ans-label">TCP/IP Model (practical, 4-layer)</div>
        <div class="code-box">The TCP/IP model used in practice:

  Application   (OSI 5+6+7): HTTP, DNS, TLS
  Transport     (OSI 4):      TCP, UDP
  Internet      (OSI 3):      IP, ICMP
  Network Access (OSI 1+2):   Ethernet, Wi-Fi

Most engineers use TCP/IP model daily.
OSI model = conceptual reference / interview model.

"L4 load balancer" = Transport layer (TCP/port routing).
"L7 load balancer" = Application layer (HTTP routing).</div>
      </div>
    </div>
  </div>
</div>

<!-- ════════════════════════════════════════════════════════ -->
<!--  SQL vs NoSQL                                            -->
<!-- ════════════════════════════════════════════════════════ -->

<div class="ref-section">
  <div class="ref-title">SQL vs NoSQL — Decision Framework</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Factor</div><div>SQL (Relational)</div><div>NoSQL</div></div>
      <div class="pt-row"><div class="pt-name">Data Model</div><div>Tables, rows, columns. Strict schema.</div><div>Document, Key-Value, Wide-Column, Graph. Flexible schema.</div></div>
      <div class="pt-row"><div class="pt-name">Consistency</div><div>ACID — strong consistency guaranteed.</div><div>BASE — eventual consistency (by default). Some support ACID.</div></div>
      <div class="pt-row"><div class="pt-name">Relationships</div><div>Foreign keys, JOINs — native &amp; efficient.</div><div>No JOINs. Denormalize data or do joins in app code.</div></div>
      <div class="pt-row"><div class="pt-name">Schema</div><div>Schema-first. ALTER TABLE migrations required.</div><div>Schema-less. Each document can have different fields.</div></div>
      <div class="pt-row"><div class="pt-name">Scalability</div><div>Vertical scale (bigger server) + read replicas. Sharding complex.</div><div>Horizontal scale (add nodes). Built for distribution.</div></div>
      <div class="pt-row"><div class="pt-name">Query Power</div><div>Rich SQL — aggregations, JOINs, window functions.</div><div>Limited (filter by key/index). No ad-hoc aggregations.</div></div>
      <div class="pt-row"><div class="pt-name">Write Speed</div><div>Slower (transaction overhead, index updates).</div><div>Very fast writes (append-only, no locks).</div></div>
      <div class="pt-row"><div class="pt-name">Transactions</div><div>Multi-table, multi-row ACID transactions.</div><div>Usually single-document atomic. Multi-doc varies.</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">SQL — When to Choose</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Use SQL When</div>
        <div class="code-box">✅ Data has clear relationships (orders → items → products)
✅ ACID transactions are required
   (financial: debit one account, credit another — atomically)
✅ Complex queries: reporting, analytics, ad-hoc
✅ Data shape is known and stable
✅ Compliance: audit trail, referential integrity
✅ Team knows SQL well

Best SQL databases:
  PostgreSQL  → feature-rich, JSON support, extensions
  SQL Server  → .NET ecosystem, enterprise features
  MySQL/MariaDB → web apps, simple workloads
  Azure SQL   → managed SQL Server, auto-scaling</div>
      </div>
      <div>
        <div class="ans-label">SQL Strengths (examples)</div>
        <div class="code-box">-- Complex JOIN query (impossible in most NoSQL):
SELECT
    c.Name,
    COUNT(o.Id) AS OrderCount,
    SUM(o.Total) AS Revenue,
    AVG(o.Total) AS AvgOrder
FROM Customers c
JOIN Orders o ON o.CustomerId = c.Id
JOIN OrderItems oi ON oi.OrderId = o.Id
JOIN Products p ON p.Id = oi.ProductId
WHERE p.Category = 'Electronics'
  AND o.CreatedAt >= DATEADD(month, -3, GETDATE())
GROUP BY c.Name
HAVING COUNT(o.Id) >= 5
ORDER BY Revenue DESC;

-- Multi-table transaction:
BEGIN TRANSACTION;
  UPDATE Accounts SET Balance -= 500 WHERE Id = 1;
  UPDATE Accounts SET Balance += 500 WHERE Id = 2;
  INSERT INTO AuditLog VALUES (...);
COMMIT;</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">NoSQL — Types &amp; When to Choose</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Type</div><div>Model</div><div>Best For</div><div>Examples</div></div>
      <div class="pt-row"><div class="pt-name">Document</div><div>JSON documents. Flexible schema.</div><div>Catalogs, profiles, CMS, semi-structured data</div><div>MongoDB, Cosmos DB (Core), Firestore</div></div>
      <div class="pt-row"><div class="pt-name">Key-Value</div><div>Dictionary: key → binary blob.</div><div>Session cache, shopping cart, feature flags, leaderboards</div><div>Redis, DynamoDB, Azure Table Storage</div></div>
      <div class="pt-row"><div class="pt-name">Wide-Column</div><div>Rows with dynamic columns per row.</div><div>Time-series, IoT, write-heavy, massive scale</div><div>Cassandra, HBase, Azure Table Storage</div></div>
      <div class="pt-row"><div class="pt-name">Graph</div><div>Nodes + Edges with properties.</div><div>Social networks, fraud detection, recommendations</div><div>Neo4j, Amazon Neptune, Cosmos Gremlin</div></div>
      <div class="pt-row"><div class="pt-name">Search</div><div>Inverted index over documents.</div><div>Full-text search, faceted search, log search</div><div>Elasticsearch, Azure AI Search, Solr</div></div>
      <div class="pt-row"><div class="pt-name">Time-Series</div><div>Optimised for time-stamped data.</div><div>Metrics, IoT sensor data, financial ticks</div><div>InfluxDB, TimescaleDB, Azure Data Explorer</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Use NoSQL When</div>
        <div class="code-box">✅ Massive scale (millions of writes/sec)
   → Cassandra for IoT, Kafka offsets, chat
✅ Schema evolves rapidly
   → Document DB for product catalog
     (products have different attributes per category)
✅ Key-based access patterns
   → Redis: session:{userId} → session data
✅ Horizontal scaling is required
   → Global distribution (Cosmos DB multi-region)
✅ Eventual consistency is acceptable
   → Shopping cart, user preferences</div>
      </div>
      <div>
        <div class="ans-label">Common Pitfalls with NoSQL</div>
        <div class="code-box">❌ Treating NoSQL like SQL:
   "Just add a JOIN in app code" = N+1 queries.
   Fix: denormalize — embed related data in document.

❌ Wrong partition key → hot partition:
   Cassandra/Cosmos: partition key must distribute evenly.
   userId = good. date = bad (all writes today → one partition).

❌ No transactions across documents:
   Order + Inventory update → use Saga pattern,
   not multi-document transaction.

❌ Unbounded document growth:
   MongoDB: embedding arrays that grow forever
   → document exceeds 16MB limit
   Fix: reference (separate collection) instead of embed.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Hybrid Architecture — Real World</div>
  <div class="ref-body">
    <div class="code-box">Most real systems use BOTH SQL and NoSQL — each for what it does best:

E-Commerce Platform:
  PostgreSQL     → Orders, Payments, Inventory (ACID transactions required)
  MongoDB        → Product Catalog (flexible schema: TV has different attrs than Shirt)
  Redis          → Session cache, cart, rate limiting, leaderboards
  Elasticsearch  → Product search (full-text, facets, filters)
  Cassandra      → Click/event tracking, recommendations feed (high write volume)

Financial System:
  SQL Server     → Accounts, Transactions (ACID, audit, compliance)
  Redis          → Idempotency keys (TTL-based dedup)
  Cosmos DB      → User activity / notifications (global distribution)

IoT Platform:
  SQL            → Device registry, billing, users
  TimescaleDB    → Sensor time-series data
  Redis          → Real-time device state (last known value)
  Kafka          → Raw telemetry stream (not a DB, but related)</div>
    <div class="tip-box">✅ Interview answer: "I'd use SQL for the transactional core — orders, payments — because ACID is non-negotiable. NoSQL for high-volume, schema-flexible, or key-based access like caching, product catalog, and search. The right tool for the right job."</div>
  </div>
</div>
`;
