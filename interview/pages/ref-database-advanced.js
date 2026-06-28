window.Pages['ref-database-advanced'] = `
<div class="page-header">
  <div class="breadcrumb">Deep Dive › <span>Database Architecture</span></div>
  <h1>🗄️ Database — Advanced Topics</h1>
  <p>Indexes · Execution Plans · Locking · Isolation Levels · MVCC · NoSQL Deep Dive</p>
</div>

<div class="ref-section">
  <div class="ref-title">Index Types — SQL Server / PostgreSQL</div>
  <div class="ref-body">
    <div class="three-col">
      <div>
        <div class="ans-label">Clustered Index</div>
        <div class="code-box">Data rows physically sorted by key.
Only ONE per table (the table IS the index).

SQL Server: primary key = clustered by default.
PostgreSQL: equivalent = physical table order via CLUSTER.

Access: Direct row access — very fast for range queries.

Example:
  SELECT * FROM orders
  WHERE order_date BETWEEN '2024-01' AND '2024-03'
  → clustered on order_date = sequential scan of disk pages</div>
      </div>
      <div>
        <div class="ans-label">Non-Clustered Index</div>
        <div class="code-box">Separate structure pointing to row location.
Multiple per table (up to ~999 in SQL Server).

Leaf nodes: index key + row locator (RID or clustered key).

Lookup cost:
  Index seek → finds row locator
  → Key lookup to clustered index (extra I/O)

Too many non-clustered indexes:
  ✅ Speed up reads
  ❌ Slow down writes (index maintenance per INSERT/UPDATE/DELETE)</div>
      </div>
      <div>
        <div class="ans-label">Covering Index</div>
        <div class="code-box">Index that contains ALL columns needed by query.
No key lookup needed → avoids table access entirely.

Example:
  SELECT email, name FROM users WHERE tenant_id = 'EY'

  Non-covering:
    Index on tenant_id → finds rows → lookup table for email, name

  Covering (INCLUDE columns):
    CREATE INDEX ix_users_tenant
    ON users (tenant_id)
    INCLUDE (email, name)
    → No table lookup needed — all data in index</div>
      </div>
    </div>
    <div class="warn-box" style="margin-top:12px;">⚠️ Index on wrong column = full table scan anyway. Always check execution plan. Index on low-cardinality column (e.g. gender: M/F) is usually useless.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Query Optimization &amp; Execution Plan</div>
  <div class="ref-body">
    <div class="code-box">SQL Server: SET STATISTICS IO ON; or press Ctrl+M (actual execution plan)
PostgreSQL: EXPLAIN ANALYZE SELECT ...

Key operations to look for:
  Table Scan / Seq Scan  → reading entire table (bad for large tables)
  Index Seek             → efficient — using index to find rows
  Index Scan             → scanning all index pages (better than table scan)
  Hash Join              → joining by building a hash table (large datasets)
  Nested Loop            → joining by iterating (efficient for small result sets)
  Sort                   → sorting operation (watch for disk spills)</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Common Query Problems</div>
        <ul>
          <li><strong>N+1 Problem:</strong> Loop executes N queries — use JOIN or IN() instead</li>
          <li><strong>Missing Index:</strong> Table scan on large table — add index on WHERE columns</li>
          <li><strong>SELECT *:</strong> Fetches unused columns — select only needed columns</li>
          <li><strong>Function on column:</strong> WHERE YEAR(date) = 2024 prevents index use → WHERE date >= '2024-01-01'</li>
          <li><strong>Implicit cast:</strong> WHERE int_col = '123' (string) → cast prevents index use</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Optimization Techniques</div>
        <div class="code-box">1. Composite index for multi-column WHERE:
   WHERE tenant_id = 'EY' AND status = 'Active'
   → Index on (tenant_id, status)
   → Most selective column FIRST

2. Pagination — avoid OFFSET on large tables:
   ❌ OFFSET 10000 LIMIT 20  → scans 10020 rows
   ✅ WHERE id > @lastId LIMIT 20  → keyset pagination

3. Partial index:
   CREATE INDEX ON orders(status)
   WHERE status != 'completed'  → smaller, faster index</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Locking, Deadlocks &amp; Isolation Levels</div>
  <div class="ref-body">
    <div class="ans-label">Isolation Levels — What Each Prevents</div>
    <div class="pattern-table" style="margin-top:8px;">
      <div class="pt-row pt-header"><div>Isolation Level</div><div>Dirty Read</div><div>Non-Repeatable Read</div><div>Phantom Read</div><div>Use Case</div></div>
      <div class="pt-row"><div class="pt-name">Read Uncommitted</div><div class="dt-no">Possible</div><div class="dt-no">Possible</div><div class="dt-no">Possible</div><div>Reporting — dirty reads OK</div></div>
      <div class="pt-row"><div class="pt-name">Read Committed</div><div class="dt-yes">Prevented</div><div class="dt-no">Possible</div><div class="dt-no">Possible</div><div>Default (SQL Server, PostgreSQL)</div></div>
      <div class="pt-row"><div class="pt-name">Repeatable Read</div><div class="dt-yes">Prevented</div><div class="dt-yes">Prevented</div><div class="dt-no">Possible</div><div>Consistency within transaction</div></div>
      <div class="pt-row"><div class="pt-name">Serializable</div><div class="dt-yes">Prevented</div><div class="dt-yes">Prevented</div><div class="dt-yes">Prevented</div><div>Financial, strict consistency</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">MVCC (Multi-Version Concurrency Control)</div>
        <div class="code-box">Used by: PostgreSQL, Oracle, MySQL InnoDB

Principle: Writers don't block readers.
  Each write creates a NEW version of the row.
  Readers see a snapshot of data as-of transaction start.
  Old versions garbage-collected by vacuum process.

Benefit: High concurrency — reads never wait for writes.
Cost:    Dead tuple bloat (vacuum needed to clean old versions)
         Storage overhead for multiple row versions</div>
      </div>
      <div>
        <div class="ans-label">Deadlock</div>
        <div class="code-box">Transaction A: locks Row 1, waits for Row 2
Transaction B: locks Row 2, waits for Row 1
→ Circular wait → deadlock!

DB detects deadlock → kills one victim transaction.

Prevention:
  Always acquire locks in SAME ORDER
  Keep transactions short
  Use READ COMMITTED (less locking)
  PostgreSQL MVCC reduces lock contention

Detection:
  SQL Server: deadlock graph in Profiler
  PostgreSQL: deadlock_timeout parameter + log</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Materialized Views</div>
  <div class="ref-body">
    <div class="code-box">Regular View: runs query every time → slow for complex aggregations.

Materialized View: stores the query RESULT on disk → reads are instant.

CREATE MATERIALIZED VIEW mv_monthly_sales AS
  SELECT tenant_id, DATE_TRUNC('month', order_date) AS month,
         SUM(total) AS revenue, COUNT(*) AS order_count
  FROM orders
  GROUP BY tenant_id, month;

REFRESH MATERIALIZED VIEW mv_monthly_sales;  -- Update data

Use cases:
  Dashboard aggregations (revenue per month)
  Reporting across large tables
  Pre-joining multiple tables for read performance

PostgreSQL: REFRESH MATERIALIZED VIEW CONCURRENTLY (no read lock during refresh)
SQL Server: Equivalent = Indexed Views (auto-maintained by engine)</div>
    <div class="tip-box">✅ CQRS read models in code = materialized views as a design pattern. Same concept: pre-compute expensive aggregations, store separately, refresh via events.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">NoSQL Deep Dive</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Type</div><div>DB Examples</div><div>Data Model</div><div>Best For</div><div>Avoid When</div></div>
      <div class="pt-row"><div class="pt-name">Document</div><div>MongoDB, Cosmos DB (JSON)</div><div>JSON documents, nested objects</div><div>Catalogs, CMS, user profiles, orders</div><div>Complex cross-collection joins needed</div></div>
      <div class="pt-row"><div class="pt-name">Key-Value</div><div>Redis, DynamoDB</div><div>Key → Value (any type)</div><div>Sessions, cache, leaderboards, feature flags</div><div>Complex queries — only key lookups</div></div>
      <div class="pt-row"><div class="pt-name">Wide Column</div><div>Cassandra, HBase, Cosmos (Table API)</div><div>Rows with dynamic columns per partition</div><div>Time-series, IoT, write-heavy, global scale</div><div>Relational queries, ad-hoc filters</div></div>
      <div class="pt-row"><div class="pt-name">Time Series</div><div>InfluxDB, TimescaleDB, Prometheus</div><div>Timestamp + metric + tags</div><div>IoT telemetry, metrics, monitoring, finance ticks</div><div>Non-time-based queries</div></div>
      <div class="pt-row"><div class="pt-name">Graph</div><div>Neo4j, Cosmos DB (Gremlin)</div><div>Nodes + Edges + Properties</div><div>Social networks, fraud detection, recommendations</div><div>Non-relationship-heavy data</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Cosmos DB — Key Concepts</div>
        <div class="code-box">Partition Key: critical for performance.
  /tenantId  → all tenant docs together
  /userId    → user data distributed evenly

Consistency Levels (5):
  Strong → linearizable (like SQL)
  Bounded Staleness → max lag configurable
  Session → consistent within one session
  Consistent Prefix → no out-of-order reads
  Eventual → fastest, least consistent

Multi-write regions: write to nearest region,
  async replicate globally.
  Conflict resolution: last-write-wins or custom policy</div>
      </div>
      <div>
        <div class="ans-label">Cassandra — Wide Column Model</div>
        <div class="code-box">Table: iot_readings
  PRIMARY KEY (device_id, timestamp)
  ← partition key: device_id
  ← clustering key: timestamp (sorted within partition)

Writes: extremely fast (append to commit log + memtable)
Reads: fast IF you filter by partition key

Anti-patterns:
  ❌ SELECT * without partition key → full cluster scan
  ❌ UPDATE/DELETE heavy → tombstones degrade read perf

CAP: AP system → available + partition tolerant
     Use when: high write throughput, time-series, IoT</div>
      </div>
    </div>
  </div>
</div>
`;
