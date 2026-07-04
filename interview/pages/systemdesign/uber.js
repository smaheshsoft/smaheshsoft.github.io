window.Pages['sd-uber'] = `
<div class="page-header">
  <div class="breadcrumb">System Design › <span>Uber (Cab Booking)</span></div>
  <h1>🚕 Uber — Cab Booking System Design</h1>
  <p>Real-time driver-rider matching, geospatial search, dynamic pricing, and trip lifecycle at global scale</p>
</div>

<div class="ref-section">
  <div class="ref-title">1. Executive Summary</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Problem</div>
        <p>Match riders to nearby available drivers in real time, track live location during a trip, calculate dynamic (surge) pricing, and settle payment — all with sub-second latency at city scale.</p>
        <div class="ans-label" style="margin-top:12px;">Scale</div>
        <ul>
          <li>130M+ monthly active riders, 6M+ drivers globally</li>
          <li>25M+ trips/day across 10,000+ cities</li>
          <li>Drivers ping location every 4 seconds while online</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Core Challenges</div>
        <ul>
          <li>Geospatial "find nearby drivers" query at &lt;100ms</li>
          <li>High-frequency location writes (millions/sec globally)</li>
          <li>Consistent trip state under concurrent driver acceptance</li>
          <li>Surge pricing computed per geo-cell in near real-time</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Functional Requirements</div>
        <ul>
          <li>Rider requests a trip with pickup/drop location</li>
          <li>System finds &amp; notifies nearby available drivers</li>
          <li>Driver accepts → trip assigned, rider notified with ETA</li>
          <li>Live location tracking for both parties during trip</li>
          <li>Fare calculation (base + distance + time + surge)</li>
          <li>Payment capture &amp; trip receipt</li>
          <li>Rating &amp; feedback post-trip</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Non-Functional Requirements</div>
        <div class="pattern-table">
          <div class="pt-row pt-header"><div>NFR</div><div>Target</div><div>Why</div><div>Approach</div></div>
          <div class="pt-row"><div class="pt-name">Matching Latency</div><div>&lt; 3 sec end-to-end</div><div>Rider abandons if too slow</div><div>Geo-index in memory (Redis Geo / H3)</div></div>
          <div class="pt-row"><div class="pt-name">Location Write Throughput</div><div>~1.5M writes/sec peak (global)</div><div>Every online driver pings every 4s</div><div>Kafka ingestion + async geo-index update</div></div>
          <div class="pt-row"><div class="pt-name">Availability</div><div>99.99%</div><div>Safety-critical, revenue-critical</div><div>Multi-AZ, city-level cell isolation</div></div>
          <div class="pt-row"><div class="pt-name">Consistency (trip assignment)</div><div>Strong (single driver per trip)</div><div>Two riders must never get the same driver</div><div>Distributed lock / atomic compare-and-swap on driver status</div></div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">2. Capacity Estimation</div>
  <div class="ref-body">
    <p>Assumptions stated explicitly — interviewers score the method, not the exact digits.</p>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Metric</div><div>Assumption</div><div>Calculation</div><div>Result</div></div>
      <div class="pt-row"><div class="pt-name">DAU</div><div>20M daily active riders</div><div>given</div><div>20M</div></div>
      <div class="pt-row"><div class="pt-name">MAU</div><div>130M monthly</div><div>given</div><div>130M</div></div>
      <div class="pt-row"><div class="pt-name">Trip requests/day</div><div>25M trips/day</div><div>25M / 86,400s</div><div>~290 req/sec avg</div></div>
      <div class="pt-row"><div class="pt-name">Peak requests/sec</div><div>6x average at rush hour</div><div>290 × 6</div><div>~1,740 req/sec</div></div>
      <div class="pt-row"><div class="pt-name">Active drivers online</div><div>2M drivers online at peak</div><div>given</div><div>2M concurrent</div></div>
      <div class="pt-row"><div class="pt-name">Location pings/sec (global)</div><div>ping every 4 sec/driver</div><div>2M / 4</div><div>~500K writes/sec</div></div>
      <div class="pt-row"><div class="pt-name">Read:Write ratio</div><div>Location: write-heavy; Trip lookup: read-heavy</div><div>—</div><div>Location ~1:20 (W:R), Trip ~5:1 (R:W)</div></div>
      <div class="pt-row"><div class="pt-name">Storage — trips/year</div><div>2KB/trip record</div><div>25M × 365 × 2KB</div><div>~18 TB/year</div></div>
      <div class="pt-row"><div class="pt-name">Storage — location history</div><div>100 bytes/ping, 7-day retention (hot)</div><div>500K/s × 86,400 × 7 × 100B</div><div>~30 TB hot (rolling)</div></div>
      <div class="pt-row"><div class="pt-name">Bandwidth (location ingestion)</div><div>500K writes/sec × 200B (payload+headers)</div><div>—</div><div>~100 MB/sec sustained</div></div>
      <div class="pt-row"><div class="pt-name">5-year growth</div><div>20% YoY trip growth</div><div>25M × 1.2^5</div><div>~62M trips/day by year 5</div></div>
    </div>
    <div class="tip-box" style="margin-top:10px;">✅ Conclusion: location data is the dominant write load by 3 orders of magnitude over trip/booking data — this single fact should drive the entire storage &amp; caching strategy (in-memory geo-index, not a relational table, for live positions).</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">3. APIs</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Endpoint</div><div>Method</div><div>Purpose</div><div>Auth</div></div>
      <div class="pt-row"><div class="pt-name">/v1/trips/request</div><div>POST</div><div>Rider requests a trip</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/trips/{id}/accept</div><div>POST</div><div>Driver accepts an offered trip</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/trips/{id}</div><div>GET</div><div>Get trip status/details</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/drivers/location</div><div>POST</div><div>Driver pushes location ping</div><div>Bearer JWT (driver)</div></div>
      <div class="pt-row"><div class="pt-name">/v1/fare/estimate</div><div>GET</div><div>Estimate fare before booking</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/trips/{id}/cancel</div><div>POST</div><div>Cancel an active trip request</div><div>Bearer JWT</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Request Trip — Request/Response</div>
        <div class="code-box">POST /v1/trips/request
Headers:
  Authorization: Bearer &lt;jwt&gt;
  Idempotency-Key: 9f1a-...
  X-Request-Id: req-772

Request:
{
  "pickup": { "lat": 12.9716, "lng": 77.5946 },
  "drop":   { "lat": 12.9352, "lng": 77.6146 },
  "vehicleType": "GO"
}

Response 201:
{
  "tripId": "T-88213",
  "status": "SEARCHING_DRIVER",
  "estimatedFare": { "min": 145, "max": 175, "currency": "INR" },
  "etaSeconds": 20
}</div>
      </div>
      <div>
        <div class="ans-label">API Design Standards</div>
        <ul>
          <li><strong>Status codes:</strong> 201 created, 200 ok, 400 bad request, 401 unauthorized, 404 not found, 409 conflict (driver already assigned), 429 rate limited, 503 no drivers available</li>
          <li><strong>Auth:</strong> OAuth2 + short-lived JWT (15 min) + refresh token</li>
          <li><strong>Pagination:</strong> cursor-based for trip history (<code>?cursor=abc&amp;limit=20</code>)</li>
          <li><strong>Rate limiting:</strong> token bucket per rider (10 req/min on /trips/request to stop spam bookings)</li>
          <li><strong>Versioning:</strong> URI versioning (<code>/v1/</code>, <code>/v2/</code>) with 6-month deprecation window</li>
          <li><strong>Idempotency:</strong> required on POST /trips/request — prevents duplicate trip creation on client retry</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">4. Database Design</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Store</div><div>Data</div><div>Why This Store</div><div>Key Design</div></div>
      <div class="pt-row"><div class="pt-name">PostgreSQL (Trips DB)</div><div>Trip records, fare, payment references</div><div>ACID needed — money &amp; state transitions</div><div>PK: trip_id (UUID); Index: (rider_id, created_at), (driver_id, created_at)</div></div>
      <div class="pt-row"><div class="pt-name">Redis Geo / H3-indexed store</div><div>Live driver locations (last known position)</div><div>Sub-ms geospatial radius queries, ephemeral data</div><div>GEOADD by city-shard key; TTL 30s per driver entry</div></div>
      <div class="pt-row"><div class="pt-name">Cassandra (Location History)</div><div>Historical GPS trail per trip</div><div>Write-heavy, time-series, horizontal scale</div><div>Partition key: trip_id; Clustering key: timestamp</div></div>
      <div class="pt-row"><div class="pt-name">DynamoDB / Cosmos DB (Driver Profile)</div><div>Driver status, vehicle info, documents</div><div>High read QPS, simple key-value access</div><div>Partition key: driver_id</div></div>
      <div class="pt-row"><div class="pt-name">Elasticsearch</div><div>Trip search/support tooling, fraud review</div><div>Full-text + filter search for ops/support teams</div><div>Indexed on rider_id, driver_id, status, city</div></div>
    </div>
    <div class="code-box" style="margin-top:12px;">-- Trips table (PostgreSQL)
CREATE TABLE trips (
  trip_id       UUID PRIMARY KEY,
  rider_id      UUID NOT NULL,
  driver_id     UUID,
  status        VARCHAR(20) NOT NULL,  -- REQUESTED/MATCHED/IN_PROGRESS/COMPLETED/CANCELLED
  pickup_geo    GEOGRAPHY(POINT),
  drop_geo      GEOGRAPHY(POINT),
  fare_amount   DECIMAL(10,2),
  surge_multiplier DECIMAL(3,2) DEFAULT 1.0,
  created_at    TIMESTAMP NOT NULL DEFAULT now(),
  INDEX idx_trips_rider (rider_id, created_at DESC),
  INDEX idx_trips_driver (driver_id, created_at DESC)
);
-- Sharding key: city_id (co-locate a city's trips on one shard — most queries are city-scoped)</div>
    <div class="warn-box" style="margin-top:10px;">⚠️ Never store live driver location in PostgreSQL — 500K writes/sec would need thousands of DB nodes. In-memory geo-index (Redis) + async trail persistence (Cassandra) is the only viable pattern at this write volume.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">5. High-Level Architecture</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step blue">Rider App / Driver App</div>
      <div class="flow-arrow">↓ DNS + CDN (static assets)</div>
      <div class="flow-step">API Gateway (auth, rate limit, routing)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Load Balancer → Application Servers (stateless)</div>
      <div class="flow-arrow">↓ splits into 3 concerns</div>
      <div class="flow-step green">Dispatch Service (geo-match)</div>
      <div class="flow-step">Trip Service (state machine)</div>
      <div class="flow-step">Pricing Service (surge calc)</div>
      <div class="flow-arrow">↓ reads/writes</div>
      <div class="flow-step">Redis Geo-Index ⇄ Cassandra (location trail) ⇄ PostgreSQL (trips)</div>
      <div class="flow-arrow">↓ async events</div>
      <div class="flow-step">Kafka (trip.created, trip.matched, location.updated)</div>
      <div class="flow-arrow">↓ consumed by</div>
      <div class="flow-step">Notification Service · Analytics Pipeline · Search Indexer</div>
    </div>
    <p style="margin-top:12px;">Cross-cutting: <strong>Blob Storage</strong> (driver documents/KYC), <strong>Monitoring</strong> (Prometheus/Grafana on every service), <strong>Search</strong> (Elasticsearch for support/ops tooling).</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">6. Detailed Component Design</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Responsibility</div><div>Key Design Point</div><div>Scaling Model</div></div>
      <div class="pt-row"><div class="pt-name">Dispatch Service</div><div>Find nearest available drivers for a trip request</div><div>Queries Redis Geo by H3 cell; ranks by ETA not just distance</div><div>Stateless, scaled per-city shard</div></div>
      <div class="pt-row"><div class="pt-name">Trip Service</div><div>Owns trip state machine end-to-end</div><div>Enforces valid transitions (REQUESTED→MATCHED→...); optimistic locking on status field</div><div>Stateless, sharded by city_id</div></div>
      <div class="pt-row"><div class="pt-name">Location Service</div><div>Ingests driver GPS pings, updates geo-index</div><div>Kafka consumer → batches writes to Redis + Cassandra</div><div>Scales with driver count, partitioned by city</div></div>
      <div class="pt-row"><div class="pt-name">Pricing Service</div><div>Computes fare estimate + real-time surge multiplier</div><div>Surge = f(demand, supply) per geo-cell, recomputed every 30-60s</div><div>Stateless, reads live supply/demand ratio from cache</div></div>
      <div class="pt-row"><div class="pt-name">Payment Service</div><div>Captures fare, handles refunds/adjustments</div><div>Idempotent charge via payment gateway; Saga for split payments (cash+wallet)</div><div>Stateless; strong consistency on ledger writes</div></div>
      <div class="pt-row"><div class="pt-name">Notification Service</div><div>Push notifications for match/arrival/completion</div><div>Consumes Kafka trip events; fans out to FCM/APNs</div><div>Stateless, horizontally scaled consumer group</div></div>
      <div class="pt-row"><div class="pt-name">Rating/Feedback Service</div><div>Post-trip rating &amp; driver score aggregation</div><div>Async aggregation job updates driver's rolling average rating</div><div>Stateless, low QPS</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">7. Sequence Diagrams</div>
  <div class="ref-body">
    <div class="ans-label">Happy Path — Request to Match</div>
    <div class="code-box">Rider    APIGateway   TripService   DispatchService   Redis-Geo   Driver
  |----request------->|              |                |             |
  |                    |--createTrip->|                |             |
  |                    |              |--findNearby--->|             |
  |                    |              |                |--GEORADIUS->|
  |                    |              |                |<--[D1,D2]---|
  |                    |              |<--candidates---|             |
  |                    |              |--offer(D1)---------------------------->|
  |                    |              |<--accept()------------------------------|
  |                    |              |--updateStatus(MATCHED)-->|             |
  |<--matched(D1,ETA)--|              |                |             |</div>

    <div class="ans-label" style="margin-top:14px;">Failure Path — No Driver Accepts</div>
    <div class="code-box">TripService   DispatchService        Driver1   Driver2   Driver3
   |--offer(D1)---------------------->|          |          |
   |<--decline/timeout(8s)------------|          |          |
   |--offer(D2)------------------------------->  |          |
   |<--decline/timeout(8s)---------------------  |          |
   |--offer(D3)--------------------------------------------->|
   |<--decline/timeout(8s)-----------------------------------|
   |--markTripStatus(NO_DRIVERS_FOUND)
   |--notifyRider("No drivers available, try again")</div>

    <div class="ans-label" style="margin-top:14px;">Retry — Location Ping Write Failure</div>
    <div class="code-box">Driver     LocationService     Kafka        Redis-Geo
  |--ping()-->|                    |             |
  |           |--publish(loc)----->|             |
  |           |                    |--consume--->|
  |           |                    |   [Redis timeout]
  |           |                    |<--retry(1)--|  (exponential backoff: 100ms)
  |           |                    |--consume--->|
  |           |                    |<--ack-------|
  |           |  (if 3 retries fail -> DLQ, alert on-call, location marked stale)</div>

    <div class="ans-label" style="margin-top:14px;">Timeout — Driver Doesn't Respond to Offer</div>
    <div class="code-box">TripService        Driver App
   |--push offer(tripId, 8s TTL)-->|
   |         (driver app silent — no network / app killed)
   |<--timeout after 8s------------|  (no response received)
   |--markCandidate(D1, EXPIRED)
   |--offer(nextCandidate)</div>
    <div class="tip-box" style="margin-top:10px;">✅ Notice every path (including happy path) has an explicit timeout — an 8-second offer TTL is what keeps a rider's wait bounded even when a driver's phone loses signal mid-offer.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">8. Database Scaling</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Sharding Strategy</div>
        <p><strong>Shard key: city_id.</strong> A trip almost never spans cities, so co-locating all of a city's trips/drivers on one shard makes 95%+ of queries single-shard. Large cities (NYC, Mumbai) get dedicated shards; small cities are bucketed together by region.</p>
        <div class="ans-label" style="margin-top:12px;">Read Replicas</div>
        <p>PostgreSQL: 1 primary + 2-3 read replicas per city shard for trip-history/analytics reads, keeping the primary free for write-path (trip state transitions).</p>
      </div>
      <div>
        <div class="ans-label">Replication</div>
        <p>Cassandra: replication factor 3 across AZs for location history — tolerates a full AZ loss with zero data loss (quorum writes/reads).</p>
        <div class="ans-label" style="margin-top:12px;">CQRS</div>
        <p>Trip write model (PostgreSQL, normalized) is separate from the trip read model (denormalized view in Elasticsearch/read replica) used by support dashboards and analytics — avoids OLTP contention from OLAP-style queries.</p>
      </div>
    </div>
    <div class="warn-box" style="margin-top:12px;">⚠️ Event Sourcing is intentionally NOT used for the core trip state machine — a simple state column with optimistic locking is easier to reason about and debug for a linear lifecycle; event sourcing is reserved for the location trail (naturally an append-only event stream).</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">9. Cache Strategy</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Cache</div><div>Pattern</div><div>TTL</div><div>Why</div></div>
      <div class="pt-row"><div class="pt-name">Driver live location</div><div>Write-through (every ping updates cache directly)</div><div>30 sec</div><div>Stale location worse than a cache miss — must always be fresh</div></div>
      <div class="pt-row"><div class="pt-name">Fare estimate</div><div>Cache-aside</div><div>15 sec</div><div>Surge changes fast; short TTL avoids stale quotes</div></div>
      <div class="pt-row"><div class="pt-name">City surge multiplier (per H3 cell)</div><div>Write-back (batched recompute every 30-60s)</div><div>60 sec</div><div>Recomputing per-request would be too expensive</div></div>
      <div class="pt-row"><div class="pt-name">Rider/Driver profile</div><div>Read-through</div><div>10 min</div><div>Changes rarely, high read volume</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Hot Key Problem</div>
        <p>Airport pickup zones become extreme hot keys during flight arrival waves. Mitigated by splitting one geo-cell key into N sub-keys (client-side hashing) and merging results — same technique as "hot partition splitting."</p>
      </div>
      <div>
        <div class="ans-label">Cache Stampede Prevention</div>
        <p>Surge-multiplier recompute uses a distributed lock (Redis <code>SET NX PX</code>) so only one node recomputes per city-cell per interval; others read the last-good cached value while waiting.</p>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">10. Messaging</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Broker</div><div>Used For</div><div>Why This One</div></div>
      <div class="pt-row"><div class="pt-name">Kafka</div><div>Location pings, trip lifecycle events, analytics feed</div><div>Extreme throughput (500K+ msg/sec), replay for reprocessing/backfill, log-based ordering per partition (by driver_id)</div></div>
      <div class="pt-row"><div class="pt-name">RabbitMQ (or SQS-equivalent)</div><div>Push-notification dispatch queue</div><div>Simpler point-to-point queue semantics fit fire-and-forget notification jobs better than a log</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Delivery Guarantees</div>
        <ul>
          <li><strong>Location pings:</strong> at-least-once — a duplicate ping just overwrites the same key, so duplicates are harmless (idempotent by nature)</li>
          <li><strong>Trip state events:</strong> exactly-once semantics via Kafka transactional producer + idempotent consumer (dedupe by event_id)</li>
          <li><strong>Ordering:</strong> partition key = driver_id, guaranteeing per-driver event order (critical — a "trip completed" must never be processed before "trip started")</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Retry / DLQ</div>
        <p>3 retries with exponential backoff (100ms → 400ms → 1.6s). After exhausting retries, message → Dead Letter Queue; on-call is paged if DLQ depth &gt; threshold. Poison messages (malformed payload) go straight to DLQ without retry to avoid blocking the partition.</p>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">11. Storage</div>
  <div class="ref-body">
    <ul>
      <li><strong>Blob/Object Storage:</strong> driver KYC documents, vehicle photos, trip receipts (PDF) — stored in S3/Blob with lifecycle policy moving receipts older than 1 year to cold/archive tier</li>
      <li><strong>CDN:</strong> serves the rider/driver app's static map tiles, app assets, and marketing content</li>
      <li><strong>Image Processing:</strong> driver profile photo &amp; document images are resized/compressed on upload (thumbnail + full-res) via an async worker</li>
    </ul>
    <div class="tip-box" style="margin-top:10px;">✅ No video/streaming component in Uber's core trip flow, so this section stays lean compared to a media-heavy app like YouTube or Netflix.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">12. Search</div>
  <div class="ref-body">
    <p>Elasticsearch is used for <strong>internal tooling</strong>, not the core rider-facing flow (that's Redis Geo): support agents searching trips by rider/driver/city/date range, fraud-review dashboards, and city-ops filtering (active drivers by zone, cancellation-rate hotspots).</p>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Feature</div><div>Approach</div></div>
      <div class="pt-row"><div class="pt-name">Filters</div><div>city, status, date range, fare range, driver rating</div></div>
      <div class="pt-row"><div class="pt-name">Ranking</div><div>Recency-weighted for support search (most recent trips first)</div></div>
      <div class="pt-row"><div class="pt-name">Autocomplete</div><div>Address/place autocomplete uses a separate geocoding service (e.g. Google Places-style), not Elasticsearch</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">13. Scalability</div>
  <div class="ref-body">
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">H</div><div class="principle-name">Horizontal Scaling</div><p>Every service (Dispatch, Trip, Location, Pricing) is stateless and scales out independently by city load.</p></div>
      <div class="principle-card"><div class="principle-icon">C</div><div class="principle-name">City-Cell Sharding</div><p>Geography is the natural partition key at every layer — DB, cache, and even service instances can be dedicated per high-traffic city.</p></div>
      <div class="principle-card"><div class="principle-icon">A</div><div class="principle-name">Auto-Scaling</div><p>Location Service &amp; Dispatch Service auto-scale on queue depth / CPU, tuned for predictable daily rush-hour curves.</p></div>
      <div class="principle-card"><div class="principle-icon">B</div><div class="principle-name">Backpressure</div><p>Location ingestion applies backpressure via Kafka consumer lag alerts — better to briefly delay geo-index freshness than crash the write path.</p></div>
      <div class="principle-card"><div class="principle-icon">R</div><div class="principle-name">Rate Limiting</div><p>Per-rider request throttling prevents booking spam/abuse; per-driver ping throttling caps at 1 ping / 4 sec.</p></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">14. Reliability</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Pattern</div><div>Applied To</div><div>Behavior</div></div>
      <div class="pt-row"><div class="pt-name">Circuit Breaker</div><div>Trip Service → Payment Gateway calls</div><div>Opens after 5 consecutive failures; trip completes as "payment pending," retried async</div></div>
      <div class="pt-row"><div class="pt-name">Retry</div><div>Location Service → Redis writes</div><div>3 retries, exponential backoff, then DLQ</div></div>
      <div class="pt-row"><div class="pt-name">Bulkhead</div><div>Dispatch Service thread pools</div><div>Isolated pool per city — one overloaded city can't starve others</div></div>
      <div class="pt-row"><div class="pt-name">Timeout</div><div>Driver offer window</div><div>8-second hard timeout, moves to next candidate</div></div>
      <div class="pt-row"><div class="pt-name">Idempotency</div><div>POST /trips/request</div><div>Idempotency-Key header prevents duplicate trip on client retry</div></div>
      <div class="pt-row"><div class="pt-name">Graceful Degradation</div><div>Surge pricing engine down</div><div>Falls back to last-known multiplier or flat rate rather than blocking booking</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">15. Security</div>
  <div class="ref-body">
    <ul>
      <li><strong>AuthN:</strong> OAuth2 + JWT (short-lived access token + refresh token), phone-number OTP for initial login</li>
      <li><strong>AuthZ:</strong> RBAC for internal tools (support/ops/admin roles); ABAC for driver-only vs rider-only endpoints</li>
      <li><strong>Encryption:</strong> TLS 1.2+ everywhere in transit; AES-256 at rest for PII (documents, payment tokens)</li>
      <li><strong>Secrets:</strong> Key Vault / Secrets Manager for DB credentials, payment gateway keys — never in code/config</li>
      <li><strong>OWASP:</strong> input validation on geo-coordinates (prevent injection via lat/lng fields), rate limiting mitigates credential stuffing</li>
      <li><strong>DDoS Protection:</strong> CDN/WAF edge layer (e.g. Cloudflare/Front Door) absorbs volumetric attacks before they reach the API Gateway</li>
    </ul>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">16. Monitoring</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Key Metrics</div>
        <ul>
          <li>Matching success rate &amp; time-to-match (P50/P95/P99)</li>
          <li>Driver acceptance rate per city/zone</li>
          <li>Kafka consumer lag on location-ingestion topic</li>
          <li>Surge-multiplier computation latency</li>
          <li>Payment success/failure rate</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Stack</div>
        <ul>
          <li><strong>Metrics:</strong> Prometheus + Grafana dashboards per city</li>
          <li><strong>Tracing:</strong> OpenTelemetry across Dispatch → Trip → Payment call chain</li>
          <li><strong>Logging:</strong> centralized structured logs (ELK or equivalent)</li>
          <li><strong>Alerts:</strong> PagerDuty on match-time P95 breach, DLQ depth, replica lag</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">17. Azure Architecture Equivalent</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Component</div><div>Azure Service</div></div>
      <div class="pt-row"><div class="pt-name">CDN / Edge</div><div>Azure Front Door + Azure CDN</div></div>
      <div class="pt-row"><div class="pt-name">API Gateway</div><div>Azure API Management</div></div>
      <div class="pt-row"><div class="pt-name">Application Servers</div><div>AKS (Kubernetes) for Dispatch/Trip/Pricing services</div></div>
      <div class="pt-row"><div class="pt-name">Geo-index Cache</div><div>Azure Cache for Redis (Geo commands)</div></div>
      <div class="pt-row"><div class="pt-name">Event Streaming</div><div>Azure Event Hubs (Kafka-compatible endpoint)</div></div>
      <div class="pt-row"><div class="pt-name">Notification Queue</div><div>Azure Service Bus</div></div>
      <div class="pt-row"><div class="pt-name">Trips DB</div><div>Azure Database for PostgreSQL</div></div>
      <div class="pt-row"><div class="pt-name">Location History</div><div>Cosmos DB (Cassandra API)</div></div>
      <div class="pt-row"><div class="pt-name">Driver Documents</div><div>Azure Blob Storage</div></div>
      <div class="pt-row"><div class="pt-name">Search/Ops Tooling</div><div>Azure AI Search</div></div>
      <div class="pt-row"><div class="pt-name">Monitoring</div><div>Application Insights + Azure Monitor</div></div>
      <div class="pt-row"><div class="pt-name">Secrets</div><div>Azure Key Vault</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">18. Kubernetes Deployment</div>
  <div class="ref-body">
    <div class="code-box">Deployment: dispatch-service
  replicas: 20 (per region cluster)
  HPA: target CPU 60%, min 10 / max 100 pods
  readinessProbe: /healthz (checks Redis connectivity)

ConfigMap: dispatch-config
  - OFFER_TIMEOUT_SECONDS=8
  - GEO_SEARCH_RADIUS_KM=3

Secret: dispatch-secrets
  - REDIS_CONNECTION_STRING
  - KAFKA_SASL_CREDENTIALS

Ingress: api-gateway-ingress
  - routes /v1/trips/* -> trip-service
  - routes /v1/dispatch/* -> dispatch-service
  - TLS termination at ingress

Service: dispatch-service (ClusterIP) fronts the ReplicaSet
  managed via a Deployment object for rolling updates</div>
    <div class="tip-box" style="margin-top:10px;">✅ Location Service and Dispatch Service get the most aggressive HPA thresholds since their load correlates directly with rush-hour spikes, unlike Payment Service which has flatter demand.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">19. Failure Scenarios</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Failure</div><div>Impact</div><div>Recovery</div></div>
      <div class="pt-row"><div class="pt-name">Redis Geo-index down</div><div>Can't find nearby drivers — booking blocked</div><div>Failover to Redis replica (Sentinel/Cluster); degrade to last-known driver list from Cassandra if total outage</div></div>
      <div class="pt-row"><div class="pt-name">Trips DB (PostgreSQL) down</div><div>Can't create/update trip state</div><div>Automatic failover to standby replica (&lt;30s); in-flight requests queued briefly at API Gateway</div></div>
      <div class="pt-row"><div class="pt-name">Kafka cluster down</div><div>Location pings and trip events stop flowing</div><div>Producers buffer locally with backpressure; multi-broker replication (RF=3) tolerates single-broker loss transparently</div></div>
      <div class="pt-row"><div class="pt-name">Payment gateway API failure</div><div>Can't capture fare at trip end</div><div>Circuit breaker opens; trip marked "payment pending," async retry queue settles later</div></div>
      <div class="pt-row"><div class="pt-name">Region-wide outage</div><div>Entire region's riders/drivers affected</div><div>DNS/traffic-manager fails over to nearest healthy region; city-level data replicated cross-region for DR</div></div>
      <div class="pt-row"><div class="pt-name">CDN failure</div><div>Static map tiles/app assets fail to load</div><div>Multi-CDN fallback (secondary provider) or direct-from-origin fallback</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">20. Cost Optimization</div>
  <div class="ref-body">
    <ul>
      <li><strong>Reserved Instances:</strong> baseline app-server capacity on 1-3yr reservations; burst capacity on-demand</li>
      <li><strong>Auto-scaling:</strong> scale Dispatch/Location services down aggressively overnight (predictable low-traffic window)</li>
      <li><strong>Spot/Low-priority nodes:</strong> analytics batch jobs (driver-earnings reconciliation, ML training) run on spot capacity</li>
      <li><strong>Caching:</strong> reduces DB read load dramatically, letting DB tier stay smaller</li>
      <li><strong>Storage tiering:</strong> location history moves from hot (Cassandra) → cold (Blob/Archive) after 7 days; receipts to archive after 1 year</li>
      <li><strong>Compression:</strong> gRPC/protobuf between internal services instead of JSON — smaller payloads, less bandwidth cost at 500K msg/sec scale</li>
    </ul>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">21. Trade-offs</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Decision</div><div>Chosen</div><div>Rejected Alternative &amp; Why</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Geo-index store</div><div>Redis Geo (in-memory)</div><div>PostgreSQL PostGIS — too slow for 500K writes/sec; fine for <em>static</em> geo data, not live positions</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Trip state management</div><div>Simple state column + optimistic lock</div><div>Full event sourcing — adds complexity not justified for a short, linear trip lifecycle</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Sharding key</div><div>city_id</div><div>rider_id — would scatter a city's supply/demand data across shards, breaking geo-matching locality</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Location delivery guarantee</div><div>At-least-once (idempotent overwrite)</div><div>Exactly-once — unnecessary overhead since duplicate pings are harmless</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Consistency for matching</div><div>Strong (distributed lock on driver status)</div><div>Eventual — would risk double-assigning a driver to two riders</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">22. Interview Questions (30)</div>
  <div class="ref-body">
    <ol>
      <li>How would you find the 5 nearest available drivers to a rider in under 100ms?</li>
      <li>Why is Redis Geo preferred over a SQL spatial query for this use case?</li>
      <li>How do you prevent two riders from being matched to the same driver simultaneously?</li>
      <li>Design the driver location update pipeline for 500K writes/sec.</li>
      <li>How would you implement surge pricing, and how often should it recompute?</li>
      <li>What happens if a driver accepts a trip but then loses network connectivity?</li>
      <li>How do you choose a sharding key for the trips database, and why city_id?</li>
      <li>Walk through the full trip state machine and its valid transitions.</li>
      <li>How would you design the retry logic for a failed payment capture?</li>
      <li>What's your strategy for handling a hot geo-cell (e.g., an airport during flight arrivals)?</li>
      <li>How do you guarantee ordering of trip lifecycle events in Kafka?</li>
      <li>Design an idempotent trip-creation API — what's the idempotency key and where is it stored?</li>
      <li>How would you detect and mitigate fraudulent trip requests?</li>
      <li>What's your approach to A/B testing a new matching algorithm safely in production?</li>
      <li>How would you handle a full region outage affecting active trips?</li>
      <li>Explain the trade-off between strong and eventual consistency for driver status.</li>
      <li>How do you scale the Dispatch Service independently per city?</li>
      <li>Design the notification fan-out when a trip is matched.</li>
      <li>How would you estimate ETA more accurately than straight-line distance?</li>
      <li>What monitoring signals would page you at 3 AM for this system?</li>
      <li>How do you handle driver location data privacy/retention requirements (GDPR-style)?</li>
      <li>Design the cancellation flow — what happens to a driver already en route?</li>
      <li>How would CQRS help the trip-history/reporting use case?</li>
      <li>What's the failure mode if the surge-pricing service is completely down?</li>
      <li>How do you prevent cache stampede when thousands of clients query the same surge cell?</li>
      <li>Compare Kafka vs RabbitMQ for the location-ingestion pipeline.</li>
      <li>How would you migrate the trips database to a new sharding scheme with zero downtime?</li>
      <li>Design a circuit breaker policy for the payment gateway integration.</li>
      <li>How would this design change for a market with poor mobile connectivity?</li>
      <li>What would you change to support scheduled/advance bookings?</li>
    </ol>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">23. Follow-up Questions</div>
  <div class="ref-body">
    <ul>
      <li>"You said Redis Geo — what happens when Redis itself fails mid-matching?"</li>
      <li>"How would your design change if drivers could serve multiple ride requests (pooling)?"</li>
      <li>"What if two services need to update the same driver's status at the same time?"</li>
      <li>"How do you test the matching algorithm's fairness across drivers?"</li>
      <li>"Your surge pricing recomputes every 60s — what if demand spikes in the middle of that window?"</li>
    </ul>
    <div class="tip-box" style="margin-top:10px;">✅ Interviewers push on your first answer's weak point — always state the failure mode of your own solution before they ask.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">24. Real World Technologies</div>
  <div class="ref-body">
    <p><strong>Uber</strong> itself uses a similar architecture: H3 (Uber's own open-sourced hexagonal geo-indexing library) for spatial partitioning, a custom dispatch system, Kafka for event streaming, and Cassandra/Schemaless (MySQL-based) for storage. <strong>Lyft</strong> and <strong>Grab</strong> use comparable geo-index + event-driven dispatch patterns. <strong>DoorDash</strong> and <strong>Instacart</strong> apply the same core "find nearest available agent" pattern for delivery dispatch.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">25. Design Evolution by Scale</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Scale</div><div>Architecture</div></div>
      <div class="pt-row"><div class="pt-name">1K users</div><div>Single monolith, one PostgreSQL instance, driver location polled every 10s via simple SQL query</div></div>
      <div class="pt-row"><div class="pt-name">100K users</div><div>Split into a few services; introduce Redis for location cache; single-region deployment</div></div>
      <div class="pt-row"><div class="pt-name">1M users</div><div>Full microservices split (Dispatch/Trip/Pricing); Kafka introduced; city-based read replicas</div></div>
      <div class="pt-row"><div class="pt-name">10M users</div><div>Geo-sharding by city_id across DB and cache; H3/geohash indexing replaces simple radius queries</div></div>
      <div class="pt-row"><div class="pt-name">100M users</div><div>Multi-region active-active; dedicated infra per mega-city; ML-based ETA &amp; surge prediction</div></div>
      <div class="pt-row"><div class="pt-name">1B users</div><div>Edge-computed dispatch decisions near driver GPS ingestion points; global event backbone with regional isolation to contain blast radius</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">26. Final Architecture Diagram</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step blue">Rider App</div>
      <div class="flow-step blue">Driver App</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">CDN (static/map tiles) + DNS (GeoDNS routing to nearest region)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">WAF / DDoS Protection → API Gateway (authn, rate limit)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Load Balancer</div>
      <div class="flow-arrow">↓ fan-out to stateless services</div>
      <div class="flow-step green">Dispatch Svc</div>
      <div class="flow-step green">Trip Svc</div>
      <div class="flow-step green">Pricing Svc</div>
      <div class="flow-step green">Payment Svc</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Redis Geo-Index · Cassandra (location trail) · PostgreSQL (trips, sharded by city) · Blob Storage (docs/receipts)</div>
      <div class="flow-arrow">↓ async</div>
      <div class="flow-step">Kafka event backbone → Notification Svc · Analytics Pipeline · Elasticsearch (ops search)</div>
      <div class="flow-arrow">↓ observability on every hop</div>
      <div class="flow-step red">Prometheus/Grafana · OpenTelemetry Tracing · Centralized Logging · Key Vault (secrets)</div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">27. Summary</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Key Takeaways</div>
        <ul>
          <li>Geography (city_id) is the natural partition key at every layer</li>
          <li>Live location is fundamentally a caching problem, not a database problem</li>
          <li>Strong consistency is required only at the exact point of driver-trip assignment — everywhere else, eventual consistency is fine and cheaper</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Pros of This Design</div>
        <ul><li>Scales independently per city/region</li><li>Fault isolation via bulkheads prevents cascading failure</li><li>Clear separation of concerns (dispatch vs pricing vs payment)</li></ul>
      </div>
      <div>
        <div class="ans-label">Cons / Open Risks</div>
        <ul><li>City-based sharding complicates cross-city trips (airport transfers)</li><li>Operational complexity of running Kafka + Redis + Cassandra + PostgreSQL together</li></ul>
        <div class="ans-label" style="margin-top:12px;">Best Practices</div>
        <ul><li>Always design the timeout/failure path before the happy path</li><li>Treat surge pricing as a resilience feature (throttles demand under supply shortage), not just a revenue lever</li></ul>
      </div>
    </div>
  </div>
</div>
`;
