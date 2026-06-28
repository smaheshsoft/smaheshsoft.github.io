window.Pages['ref-scenarios'] = `
<div class="page-header">
  <div class="breadcrumb">Deep Dive › <span>Real-World Scenarios</span></div>
  <h1>🏗️ Real-World Architecture Scenarios</h1>
  <p>File Import · IoT · EV Billing · Payments · E-Commerce · Ride Booking · Video · Chat · SaaS</p>
</div>

<div class="ref-section">
  <div class="ref-title">Large File Import System (CSV/Excel processing)</div>
  <div class="ref-body">
    <div class="code-box">Requirements: Users upload 500MB CSV files. Parse &amp; validate 1M rows. Import to DB.

❌ Bad approach: Upload → Process synchronously → Timeout after 30s

✅ Architecture:
  1. Upload: Client → Azure Blob Storage (direct SAS upload, skip API server)
  2. Trigger: Blob Storage event → Azure Service Bus message (filename, userId)
  3. Process: Worker service reads message → streams blob → validates &amp; batches insert
  4. Status: Worker updates import_jobs table: pending → processing → complete/failed
  5. Notify: SignalR or polling /import/{id}/status → user sees progress

Key decisions:
  Stream processing: don't load full file into memory
    → CsvHelper with IAsyncEnumerable&lt;Row&gt;
    → Bulk insert in batches of 1000 (SqlBulkCopy or EF Core ExecuteUpdateAsync)

  Validation errors: don't fail entire file
    → Collect error rows (row#, error) → store error report in blob
    → Import valid rows, return error report download link

  Idempotency: Service Bus message delivered twice?
    → import_jobs table: unique constraint on (fileHash, userId)
    → If duplicate message: skip (already processed)

Scale: 100 concurrent imports?
    → Scale worker instances (KEDA: queue depth trigger)
    → Each worker processes one file at a time</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">IoT Telemetry Pipeline</div>
  <div class="ref-body">
    <div class="code-box">Requirements: 100,000 devices sending sensor data every 5 seconds = 20,000 msg/sec.
Real-time dashboard + historical analysis + anomaly alerting.

Architecture:
  [Devices] → MQTT/AMQP → [Azure IoT Hub]
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
            [Azure Stream Analytics]  [Event Hubs Capture]
            (real-time processing)   (raw data → ADLS2/Parquet)
                    │                       │
              [Hot Path]               [Cold Path]
         Real-time alerts           Historical analysis
         Redis cache                Azure Synapse / Databricks
         SignalR dashboard          Power BI / ML training

IoT Hub features:
  Device twin: desired vs reported state (config push to device)
  Direct methods: invoke command on device (e.g., reboot, recalibrate)
  Message routing: route by device type, telemetry type
  Per-device authentication: x.509 cert or SAS token

Scale challenges:
  IoT Hub: partition by device ID (consistent routing per device)
  Time-series data: use TimescaleDB / Azure Data Explorer (not SQL Server!)
  Downsampling: store raw 5s data for 7 days, hourly aggregates for 1 year</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">EV Charging Billing System</div>
  <div class="ref-body">
    <div class="code-box">Requirements: Bill EV drivers for electricity used. Dynamic pricing. OCPP protocol.
  Accuracy critical: bill exactly kWh used. Disputes must be auditable.

Key challenges:
  1. Metering accuracy: charger reports kWh at intervals. Last message may be lost.
  2. Dynamic pricing: price per kWh changes by time-of-day, grid demand.
  3. Billing: post-paid (end of month) vs pre-paid (wallet).
  4. Dispute resolution: prove exact usage with audit trail.

Architecture:
  [Charger OCPP] → [OCPP Gateway] → [Session Service] → Kafka
                                         │
                               sessions table:
                               { sessionId, deviceId, startKwh,
                                 lastKwh, startTime, priceSnapshot }
                                         │
                                   [Billing Service]
                                   - Reads completed sessions
                                   - Calculates cost: ∑(deltaKwh × priceAtTime)
                                   - Writes to billing_line_items (append-only, no update)
                                   - Idempotent: sessionId = unique constraint

Event Sourcing for billing:
  Every meter reading = immutable event stored forever.
  Bill = replay of events.
  Dispute: replay events to reproduce exact calculation.
  Correction: add compensating event (credit) rather than edit old data.

Pricing engine:
  Price snapshots stored at session start.
  Lock-in price at session start OR real-time (grid-indexed).
  Price stored on billing_line_items (snapshot, not reference to current price).</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Payment Processing System</div>
  <div class="ref-body">
    <div class="code-box">Requirements: Process payments reliably. Exactly-once. PCI DSS compliant.

Cardinal rules:
  NEVER double-charge. NEVER lose a payment.
  All payment data: PCI DSS scope (tokenize, encrypt, audit log).

Architecture:
  [Order Service] → [Payment Service] → [Payment Gateway (Stripe/Adyen)]
       │                   │
  idempotency_key    outbox table
  (UUID per attempt) (guarantees publish)

Idempotency:
  Client sends: X-Idempotency-Key: uuid-per-order
  Payment service: check DB for this key before processing.
  If found: return cached result (don't charge again).
  Store: (idempotency_key, result, created_at) with TTL.

Saga for order + payment:
  Step 1: Reserve inventory (OrderService)
  Step 2: Charge payment (PaymentService)
  Step 3: Confirm order (OrderService)

  If payment fails → compensate: release inventory reservation.

  Choreography: each service listens to events, acts, publishes result.

PCI DSS compliance:
  Never store raw card numbers → tokenize at gateway (Stripe token).
  Encrypt cardholder data at rest (AES-256).
  Audit log: every payment attempt, result, IP, user.
  Penetration testing annually.
  No card data in logs!

Reconciliation:
  Daily job: compare our records vs gateway records.
  Discrepancy alert: investigate + correct.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Ride-Booking Platform (Uber-like)</div>
  <div class="ref-body">
    <div class="code-box">Requirements: Match riders to nearby drivers in &lt;3s. Real-time location tracking.
  Surge pricing. Millions of concurrent users.

Key services:
  Location Service: receives driver GPS updates (every 5s). Stores in Redis GEO.
  Matching Service: on ride request → GEORADIUS to find nearby drivers.
  Trip Service: manages trip lifecycle (requested → accepted → in-progress → completed).
  Pricing Service: base fare + surge multiplier (supply/demand ratio).
  Notification Service: push notifications to driver/rider.

Location at scale:
  Redis GEOADD: store lat/lng by driver ID.
  GEORADIUS: find drivers within 3km.
  Redis sorted sets: O(log N) radius search.
  100K active drivers × 5s update = 20,000 writes/sec → Redis cluster.

Surge pricing:
  Event-driven: too many requests / too few available drivers.
  Surge multiplier calculated per geo-cell (H3 hexagons).
  Show surge to rider before booking.
  Price locked at booking time (snapshot).

Matching algorithm:
  ETA-based, not pure distance.
  Driver acceptance rate, rating factored.
  Timeout: driver doesn't accept in 15s → next driver.

Real-time updates:
  WebSocket connection: rider ↔ trip service ↔ driver.
  Driver location stream → Kafka → trip service → rider WebSocket.
  Redis pub/sub for low latency routing.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Video Streaming Platform</div>
  <div class="ref-body">
    <div class="code-box">Requirements: Upload, transcode, stream video globally. Like YouTube.

Upload &amp; Transcode Pipeline:
  1. Creator uploads raw video → Azure Blob (chunked upload, resumable)
  2. Upload complete event → Azure Media Services / custom transcoder
  3. Transcode to multiple resolutions: 240p, 480p, 720p, 1080p
  4. Generate HLS/DASH manifests (.m3u8) for adaptive bitrate streaming
  5. Push CDN: upload to Azure Front Door edge nodes globally

Adaptive Bitrate Streaming (ABR):
  Player downloads manifest → sees list of quality levels.
  Measures bandwidth → selects best quality that fits.
  Switches quality mid-stream without interruption.

Storage:
  Raw video: Azure Blob Hot tier (during processing)
  Processed segments: Azure Blob Cool tier (after 30 days)
  CDN: cache video segments at edge (high cache hit ratio)

Scale challenges:
  Popular video: thundering herd on CDN origin at upload time.
  Solution: pre-warm CDN (push to CDN before making public).
  Long-tail: 80% of videos watched rarely → Cold storage tier.

Thumbnails: parallel thumbnail extraction during transcode.
Search: video metadata → Elasticsearch (title, description, tags).
Recommendations: ML model → Azure Machine Learning → serve via API.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Multi-Tenant SaaS Platform</div>
  <div class="ref-body">
    <div class="code-box">Multi-tenancy models:

Model A: Shared everything (pool model)
  Single DB, TenantId column on every table.
  ✅ Cheapest, easiest to operate.
  ❌ Noisy neighbor (one big tenant kills DB for all).
  ❌ Data isolation risk (bug could leak cross-tenant data).
  Use for: small tenants, &lt;10GB per tenant.

Model B: Separate schema, shared DB
  TenantA schema, TenantB schema in same Postgres instance.
  ✅ Better isolation, still shared infra.
  ❌ Schema migration complexity (migrate all tenant schemas).

Model C: Separate DB per tenant
  Each tenant gets own database (or own DB server for large).
  ✅ Full isolation, independent backup/restore/scaling.
  ❌ Expensive, complex connection management.
  Use for: enterprise tenants, regulated industries (HIPAA, GDPR).

Hybrid (most SaaS): small tenants → shared pool, large enterprise → dedicated.

Implementation patterns:
  Tenant resolution: subdomain (acme.app.com) → TenantId lookup.
  Middleware: inject TenantId into request context.
  Row-level security (Postgres): all queries auto-filtered.
    CREATE POLICY tenant_isolation ON orders
    USING (tenant_id = current_setting('app.current_tenant_id'));
  Global query filter (EF Core):
    modelBuilder.Entity&lt;Order&gt;()
        .HasQueryFilter(o => o.TenantId == _tenantContext.TenantId);</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Real-Time Chat Application</div>
  <div class="ref-body">
    <div class="code-box">Requirements: millions of users, real-time messaging, message history, read receipts.

Architecture:
  [Client] ←WebSocket→ [Chat Service (SignalR)] ←→ [Redis pub/sub]
                              │
                         [Kafka] → [Message Storage Service] → [Cassandra]

Message flow:
  1. User sends message → WebSocket → Chat Service
  2. Chat Service publishes to Kafka (durable, ordered per conversation)
  3. Kafka consumer (Message Service) stores in Cassandra
  4. Chat Service publishes to Redis pub/sub (channel = conversationId)
  5. All Chat Service instances subscribed → push to connected users

Why Cassandra for messages:
  Time-series access pattern: "get last 50 messages for conversation X"
  Partition key: conversation_id → all messages on same node
  Clustering key: message_timestamp DESC → efficient range scan
  Write-optimized: millions of writes/sec
  No JOINs needed: messages are denormalized

Presence (online/offline):
  User connects WebSocket → set key in Redis: user:{id}:online = TTL 30s
  User sends heartbeat every 15s → refresh TTL
  User disconnects / no heartbeat → key expires → offline

Read receipts:
  message_reads table: (message_id, user_id, read_at)
  Eventual: not real-time, batch update every few seconds

Scale:
  SignalR sticky sessions: user always routed to same instance (via Redis backplane)
  OR stateless: any instance can serve any user via Redis pub/sub
  Horizontal: 1 Chat Service instance can handle ~50K WebSocket connections</div>
  </div>
</div>
`;
