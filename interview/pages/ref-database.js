window.Pages['ref-database'] = `
<div class="page-header">
  <div class="breadcrumb">Architect Reference › <span>Database Architecture</span></div>
  <h1>🗄️ Database Architecture</h1>
  <p>SQL vs NoSQL · CAP Theorem · Partitioning · Replication · CQRS · Decision Framework</p>
</div>

<div class="ref-section">
  <div class="ref-title">SQL vs NoSQL — Architect Decision Framework</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Factor</div><div>Choose SQL</div><div>Choose NoSQL</div></div>
      <div class="pt-row"><div class="pt-name">Data Structure</div><div>Structured, fixed schema</div><div>Flexible, evolving schema</div></div>
      <div class="pt-row"><div class="pt-name">Transactions</div><div>ACID transactions required</div><div>Eventual consistency acceptable</div></div>
      <div class="pt-row"><div class="pt-name">Relationships</div><div>Complex joins across many tables</div><div>Denormalized, document-based</div></div>
      <div class="pt-row"><div class="pt-name">Scale Pattern</div><div>Vertical scale (scale up)</div><div>Horizontal scale (scale out)</div></div>
      <div class="pt-row"><div class="pt-name">Query Pattern</div><div>Complex queries, aggregations, reports</div><div>Simple key/document lookups</div></div>
      <div class="pt-row"><div class="pt-name">Write Volume</div><div>Moderate writes, strong consistency</div><div>Very high write throughput</div></div>
      <div class="pt-row"><div class="pt-name">Use Cases</div><div>Banking, ERP, Healthcare, Finance</div><div>IoT, Social Media, Catalog, Logs</div></div>
    </div>
    <div class="tip-box" style="margin-top:12px;">✅ Most important question: <strong>How will data be READ and WRITTEN?</strong> Design the database around access patterns, not just data shape.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">CAP Theorem — Deep Dive for Architects</div>
  <div class="ref-body">
    <div class="code-box">C = Consistency   — every read gets the most recent write
A = Availability  — every request gets a response (not an error)
P = Partition Tolerance — system continues despite network splits

CAP Theorem: In a distributed system, during a network partition
you can guarantee AT MOST 2 of the 3.</div>
    <div class="three-col" style="margin-top:14px;">
      <div>
        <div class="ans-label" style="color:#38bdf8;">CP — Consistency + Partition Tolerance</div>
        <div class="code-box">System stays consistent.
May refuse requests
during partition.

Examples:
  etcd, ZooKeeper
  HBase, MongoDB (strong mode)
  Azure SQL

Use when:
  Data accuracy is critical.
  Bank balance cannot be stale.</div>
      </div>
      <div>
        <div class="ans-label" style="color:#4ade80;">AP — Availability + Partition Tolerance</div>
        <div class="code-box">System stays available.
May return stale data
during partition.

Examples:
  Cassandra, DynamoDB
  CouchDB, Riak
  DNS

Use when:
  Always-on is critical.
  Social likes count can lag.</div>
      </div>
      <div>
        <div class="ans-label" style="color:#fb923c;">CA — Consistency + Availability</div>
        <div class="code-box">Only possible in single-node
systems (no network partition).

Examples:
  Traditional RDBMS
  (single instance)

Not realistic for distributed
systems — partition will happen.</div>
      </div>
    </div>
    <div class="ans-label" style="margin-top:16px;">PACELC Extension — Beyond CAP</div>
    <div class="code-box">CAP only covers partition scenarios.
PACELC adds: Even without partition, there is a trade-off between
             Latency and Consistency.

P → A or C  (during partition)
E → L or C  (else — latency vs consistency)

Example: DynamoDB
  During partition: chooses Availability (AP)
  Normally:         chooses Latency (EL) — fast eventual consistency</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Database Replication — High Availability Patterns</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Primary-Replica (Active-Passive)</div>
        <div class="code-box">Primary DB  ──writes──→  Replica DB
                 ←──reads──
App writes to Primary.
App reads from Replica (offload).
Replica promotes if Primary fails.

Azure: Azure SQL geo-replication
       PostgreSQL read replicas</div>
        <p style="margin-top:8px;font-size:12px;color:#94a3b8;">RPO: seconds (replication lag). RTO: minutes (failover time).</p>
      </div>
      <div>
        <div class="ans-label">Multi-Primary (Active-Active)</div>
        <div class="code-box">Primary-A  ←──sync──→  Primary-B
Both accept reads AND writes.
Conflict resolution needed.

Azure: Cosmos DB multi-region write
       CockroachDB, YugabyteDB

Use when: global low-latency writes
          required in multiple regions.</div>
        <p style="margin-top:8px;font-size:12px;color:#94a3b8;">Higher complexity. Conflict resolution is the main challenge.</p>
      </div>
    </div>
    <div class="ans-label" style="margin-top:14px;">RTO vs RPO — Key Metrics for Architects</div>
    <div class="code-box">RPO (Recovery Point Objective) — how much data can we lose?
  RPO = 0     → synchronous replication (zero data loss, higher latency)
  RPO = 5min  → async replication every 5 mins

RTO (Recovery Time Objective) — how fast must we recover?
  RTO = 0     → active-active (instant)
  RTO = 5min  → automated failover
  RTO = 1hr   → restore from backup

Cost:  Lower RPO + Lower RTO = Higher Cost
Trade-off with business requirements and budget.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Data Partitioning Strategies</div>
  <div class="ref-body">
    <div class="three-col">
      <div>
        <div class="ans-label">Horizontal Partitioning (Sharding)</div>
        <div class="code-box">Split rows across servers.

Shard by TenantId:
  Tenant A → DB Server 1
  Tenant B → DB Server 2
  Tenant C → DB Server 3

Or by date:
  Jan-Mar → Shard 1
  Apr-Jun → Shard 2</div>
        <p style="margin-top:6px;font-size:12px;color:#94a3b8;">Best for: massive scale, multi-tenant</p>
      </div>
      <div>
        <div class="ans-label">Vertical Partitioning</div>
        <div class="code-box">Split columns across tables/DBs.

User profile data  → DB 1
User activity data → DB 2
User payment data  → DB 3

Each DB optimized for its
own access pattern.</div>
        <p style="margin-top:6px;font-size:12px;color:#94a3b8;">Best for: different access patterns per domain</p>
      </div>
      <div>
        <div class="ans-label">Partitioning Challenges</div>
        <div class="code-box">Hot partitions:
  All traffic hits one shard
  → Use composite key

Cross-shard queries:
  Joins across shards = expensive
  → Denormalize or use CQRS

Rebalancing:
  Adding a new shard requires
  data migration</div>
        <div class="warn-box" style="margin-top:6px;">⚠️ Wrong partition key = hot spots that nullify scaling benefits.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">CQRS — Command Query Responsibility Segregation</div>
  <div class="ref-body">
    <div class="code-box">Problem: Same model for reads and writes creates complexity.
         Reads need denormalized, fast views.
         Writes need normalized, consistent storage.

Solution: Separate the Read Model from the Write Model.

Write Side (Command):
  User places order → Command → OrderService → Write DB (normalized SQL)
                                             → publishes OrderCreated event

Read Side (Query):
  Dashboard query → Query Handler → Read DB (denormalized, pre-aggregated)
                                   ← sync'd by event consumer</div>
    <div class="two-col" style="margin-top:12px;">
      <div>
        <div class="ans-label">When to Use CQRS</div>
        <ul>
          <li>High read/write ratio disparity</li>
          <li>Complex reporting on write-heavy data</li>
          <li>Different teams own reads vs writes</li>
          <li>Event Sourcing (naturally pairs with CQRS)</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">When NOT to Use CQRS</div>
        <ul>
          <li>Simple CRUD — adds unnecessary complexity</li>
          <li>Small teams — harder to maintain two models</li>
          <li>Eventual consistency is not acceptable</li>
        </ul>
      </div>
    </div>
    <div class="tip-box" style="margin-top:10px;">✅ CQRS pairs naturally with Event Sourcing. Read model is just a projection of events.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Database per Service — Microservices Pattern</div>
  <div class="ref-body">
    <div class="code-box">Each microservice owns its own database.
No service can directly query another service's DB.
Data sharing happens only via APIs or events.

Order Service    → PostgreSQL (transactions)
Product Service  → MongoDB    (flexible catalog)
Session Service  → Redis      (fast ephemeral)
Search Service   → Elasticsearch (full-text search)
Analytics Service→ Cosmos DB  (global scale, time-series)</div>
    <div class="two-col" style="margin-top:12px;">
      <div>
        <div class="ans-label">Benefits</div>
        <ul>
          <li>Each service chooses best DB for its needs</li>
          <li>Independent scaling per service</li>
          <li>No schema coupling between services</li>
          <li>Failure in one DB doesn't cascade</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Challenges</div>
        <ul>
          <li>No cross-service joins → use Saga / API calls</li>
          <li>Data consistency across services → eventual consistency</li>
          <li>Reporting across services → use a read-side aggregate DB</li>
          <li>More infrastructure to manage</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">PostgreSQL JSONB vs MongoDB vs Redis — When to Use Each</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>DB</div><div>Best For</div><div>Strengths</div><div>Avoid When</div></div>
      <div class="pt-row"><div class="pt-name">PostgreSQL JSONB</div><div>JSON + relational queries needed together</div><div>ACID, joins, indexed JSON fields, SQL power</div><div>Pure document store with massive scale</div></div>
      <div class="pt-row"><div class="pt-name">MongoDB</div><div>Document-centric, flexible schema, nested data</div><div>Schema flexibility, fast document retrieval, horizontal scale</div><div>Complex joins or strong transactional needs</div></div>
      <div class="pt-row"><div class="pt-name">Redis</div><div>Cache, session, leaderboards, pub/sub</div><div>Sub-millisecond latency, in-memory speed</div><div>Primary datastore — data loss risk, memory cost</div></div>
      <div class="pt-row"><div class="pt-name">Cosmos DB</div><div>Global distribution, multi-model</div><div>99.999% SLA, multi-region write, tunable consistency</div><div>Simple single-region apps — cost is high</div></div>
      <div class="pt-row"><div class="pt-name">Elasticsearch</div><div>Full-text search, log analytics</div><div>Powerful query DSL, near real-time search</div><div>Transactional data — not ACID</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Interview Summary — Architect-Level Answer</div>
  <div class="ref-body">
    <div class="code-box">Q: How do you choose a database for a new service?

A: I ask five questions:

   1. What is the access pattern? (read-heavy, write-heavy, mixed?)
   2. Do we need ACID transactions? (payment → yes, catalog → no)
   3. What is the data shape? (structured → SQL, flexible → NoSQL)
   4. What is the scale requirement? (millions/sec → Cassandra, moderate → PostgreSQL)
   5. What consistency level is acceptable? (strict → CP, eventual OK → AP)

   For a financial service → PostgreSQL (ACID, joins, reporting).
   For a product catalog   → MongoDB (flexible, fast document reads).
   For session / cache     → Redis (speed, ephemeral).
   For global IoT data     → Cosmos DB (multi-region, scale).

   In microservices, each service gets its own DB.
   No shared databases. Cross-service data via APIs or events.
   For reporting, I build a read-side aggregate using CQRS.</div>
  </div>
</div>
`;
