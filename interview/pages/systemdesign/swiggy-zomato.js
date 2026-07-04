window.Pages['sd-swiggy-zomato'] = `
<div class="page-header">
  <div class="breadcrumb">System Design › <span>Swiggy / Zomato (Food Delivery)</span></div>
  <h1>🍔 Swiggy / Zomato — Food Delivery System Design</h1>
  <p>Three-sided marketplace (customer, restaurant, delivery partner), food-prep-time-aware dispatch, live order tracking, and meal-time traffic spikes at city scale</p>
</div>

<div class="ref-section">
  <div class="ref-title">1. Executive Summary</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Problem</div>
        <p>Let a customer discover nearby restaurants, place an order, have the restaurant accept and prepare it, assign a delivery partner at the right moment, and track the food from kitchen to doorstep — coordinating three independent parties (customer, restaurant, delivery partner) who don't control each other's timing.</p>
        <div class="ans-label" style="margin-top:12px;">Scale</div>
        <ul>
          <li>Swiggy/Zomato-class: 100M+ MAU, 15-20M orders/day combined across platforms</li>
          <li>2M+ restaurant partners, 500K+ active delivery partners</li>
          <li>Order volume swings 8-10x between off-peak and lunch/dinner peak within the same day</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Core Challenges</div>
        <ul>
          <li><strong>Three-sided marketplace:</strong> customer demand, restaurant capacity, and delivery-partner supply must all clear simultaneously</li>
          <li><strong>Food-prep-time uncertainty:</strong> unlike a cab, the "trip" can't start until food is ready — dispatch must predict prep-completion time, not just distance</li>
          <li>Extreme meal-time traffic spikes (12-2pm, 7:30-10pm) vs near-idle mid-afternoon</li>
          <li>Restaurant may not respond to accept/reject in time (unlike a driver's phone, a small kitchen may not check the tablet)</li>
          <li>Live tracking &amp; accurate ETA across two legs: prep time + delivery time</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Functional Requirements</div>
        <ul>
          <li>Search/browse restaurants &amp; dishes by cuisine, rating, distance, price, offers</li>
          <li>Place an order with cart, address, payment</li>
          <li>Restaurant accepts/rejects, updates prep status</li>
          <li>System assigns a delivery partner at the optimal moment (not too early, not too late)</li>
          <li>Live GPS tracking of delivery partner for customer &amp; restaurant</li>
          <li>ETA shown at every stage, updated dynamically</li>
          <li>Payment capture, refunds, order cancellation</li>
          <li>Ratings for restaurant, dish, and delivery partner</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Non-Functional Requirements</div>
        <div class="pattern-table">
          <div class="pt-row pt-header"><div>NFR</div><div>Target</div><div>Why</div><div>Approach</div></div>
          <div class="pt-row"><div class="pt-name">Search Latency</div><div>&lt; 200ms P95</div><div>Browsing abandonment is high beyond this</div><div>Elasticsearch + Redis cache for hot queries</div></div>
          <div class="pt-row"><div class="pt-name">Order Placement</div><div>&lt; 2 sec end-to-end</div><div>Cart-to-checkout drop-off is latency sensitive</div><div>Async order pipeline, sync only on payment auth</div></div>
          <div class="pt-row"><div class="pt-name">Dispatch Accuracy</div><div>Partner arrives within ±3 min of food-ready time</div><div>Early arrival wastes partner time; late arrival cools food</div><div>ML-based prep-time prediction feeding dispatch trigger</div></div>
          <div class="pt-row"><div class="pt-name">Availability</div><div>99.95%</div><div>Revenue &amp; reputation critical during meal windows</div><div>Multi-AZ, city-cell isolation, graceful degradation</div></div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">2. Capacity Estimation</div>
  <div class="ref-body">
    <p>Assumptions stated explicitly; the meal-time curve — not the daily average — is what actually sizes the system.</p>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Metric</div><div>Assumption</div><div>Calculation</div><div>Result</div></div>
      <div class="pt-row"><div class="pt-name">DAU</div><div>18M daily active users</div><div>given</div><div>18M</div></div>
      <div class="pt-row"><div class="pt-name">MAU</div><div>110M monthly</div><div>given</div><div>110M</div></div>
      <div class="pt-row"><div class="pt-name">Orders/day</div><div>16M orders/day combined</div><div>16M / 86,400s</div><div>~185 orders/sec avg</div></div>
      <div class="pt-row"><div class="pt-name">Peak orders/sec (lunch/dinner)</div><div>70% of daily orders land in 4 meal-hours (2 lunch + 2 dinner)</div><div>(16M × 0.7) / (4 × 3600s)</div><div>~780 orders/sec at peak</div></div>
      <div class="pt-row"><div class="pt-name">Off-peak orders/sec</div><div>remaining 30% spread over 20 hours</div><div>(16M × 0.3) / (20 × 3600s)</div><div>~67 orders/sec</div></div>
      <div class="pt-row"><div class="pt-name">Peak-to-trough ratio</div><div>—</div><div>780 / 67</div><div>~11.6x swing intraday</div></div>
      <div class="pt-row"><div class="pt-name">Search QPS at peak</div><div>~8 searches per order placed (browsing funnel)</div><div>780 × 8</div><div>~6,200 search req/sec</div></div>
      <div class="pt-row"><div class="pt-name">Active delivery partners at peak</div><div>400K online during dinner rush</div><div>given</div><div>400K concurrent</div></div>
      <div class="pt-row"><div class="pt-name">Location pings/sec</div><div>ping every 5 sec/partner while on a delivery</div><div>400K / 5</div><div>~80K writes/sec</div></div>
      <div class="pt-row"><div class="pt-name">Read:Write ratio</div><div>Menu/search: read-heavy; Order/location: write-heavy</div><div>—</div><div>Search ~50:1 (R:W), Order-status ~1:3 (R:W)</div></div>
      <div class="pt-row"><div class="pt-name">Storage — orders/year</div><div>3KB/order record (items, address, pricing)</div><div>16M × 365 × 3KB</div><div>~17.5 TB/year</div></div>
      <div class="pt-row"><div class="pt-name">Image storage — food/restaurant photos</div><div>2M restaurants × 25 dish photos avg × 400KB</div><div>2M × 25 × 400KB</div><div>~20 TB (plus thumbnails ~4 TB)</div></div>
      <div class="pt-row"><div class="pt-name">CDN traffic (images)</div><div>18M DAU × 15 image loads/session × 80KB (compressed)</div><div>18M × 15 × 80KB</div><div>~21.6 TB/day egress</div></div>
      <div class="pt-row"><div class="pt-name">Message volume (order events)</div><div>~8 state-change events per order</div><div>780/sec × 8</div><div>~6,240 events/sec at peak</div></div>
      <div class="pt-row"><div class="pt-name">5-year growth</div><div>25% YoY order growth</div><div>16M × 1.25^5</div><div>~49M orders/day by year 5</div></div>
    </div>
    <div class="tip-box" style="margin-top:10px;">✅ Conclusion: the system must be provisioned for an ~11.6x intraday swing, not the daily average — autoscaling policy and cache warm-up need to anticipate the 11:45am and 7:15pm inflection points rather than react to them.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">3. APIs</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Endpoint</div><div>Method</div><div>Purpose</div><div>Auth</div></div>
      <div class="pt-row"><div class="pt-name">/v1/restaurants/search</div><div>GET</div><div>Search restaurants by geo, cuisine, filters</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/restaurants/{id}/menu</div><div>GET</div><div>Fetch restaurant menu</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/orders</div><div>POST</div><div>Place a new order</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/orders/{id}</div><div>GET</div><div>Get order status/tracking</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/orders/{id}/accept</div><div>POST</div><div>Restaurant accepts order</div><div>Bearer JWT (restaurant)</div></div>
      <div class="pt-row"><div class="pt-name">/v1/orders/{id}/ready</div><div>POST</div><div>Restaurant marks food ready</div><div>Bearer JWT (restaurant)</div></div>
      <div class="pt-row"><div class="pt-name">/v1/delivery/location</div><div>POST</div><div>Delivery partner pushes GPS ping</div><div>Bearer JWT (partner)</div></div>
      <div class="pt-row"><div class="pt-name">/v1/orders/{id}/cancel</div><div>POST</div><div>Cancel an order</div><div>Bearer JWT</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Place Order — Request/Response</div>
        <div class="code-box">POST /v1/orders
Headers:
  Authorization: Bearer &lt;jwt&gt;
  Idempotency-Key: 7c2b-...
  X-Request-Id: req-4471

Request:
{
  "restaurantId": "R-55210",
  "items": [
    { "itemId": "I-901", "qty": 2 },
    { "itemId": "I-934", "qty": 1 }
  ],
  "deliveryAddress": { "lat": 12.9352, "lng": 77.6146 },
  "paymentMethod": "UPI"
}

Response 201:
{
  "orderId": "O-771034",
  "status": "PLACED",
  "estimatedPrepMins": 18,
  "estimatedDeliveryMins": 32,
  "amount": { "total": 428.00, "currency": "INR" }
}</div>
      </div>
      <div>
        <div class="ans-label">API Design Standards</div>
        <ul>
          <li><strong>Status codes:</strong> 201 created, 200 ok, 400 bad request, 401 unauthorized, 404 not found, 409 conflict (restaurant closed mid-order), 422 item unavailable, 429 rate limited, 503 no restaurants nearby</li>
          <li><strong>Auth:</strong> OAuth2 + short-lived JWT (15 min) + refresh token; separate scopes for customer/restaurant/partner apps</li>
          <li><strong>Pagination:</strong> cursor-based for order history and search results (<code>?cursor=abc&amp;limit=20</code>)</li>
          <li><strong>Rate limiting:</strong> token bucket per user (5 order-placements/min) to block cart-spam/abuse; per-restaurant accept-webhook throttled separately</li>
          <li><strong>Versioning:</strong> URI versioning (<code>/v1/</code>, <code>/v2/</code>) with 6-month deprecation window</li>
          <li><strong>Idempotency:</strong> required on POST /orders — prevents duplicate charge/order on client retry during flaky mobile networks</li>
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
      <div class="pt-row"><div class="pt-name">PostgreSQL (Orders DB)</div><div>Order records, line items, pricing, payment refs</div><div>ACID needed — money &amp; multi-step state transitions</div><div>PK: order_id (UUID); Index: (customer_id, created_at), (restaurant_id, created_at)</div></div>
      <div class="pt-row"><div class="pt-name">PostgreSQL (Restaurant/Catalog DB)</div><div>Restaurant profile, menu items, pricing, availability</div><div>Relational integrity between restaurant→menu→item</div><div>PK: restaurant_id; composite index (restaurant_id, category)</div></div>
      <div class="pt-row"><div class="pt-name">Redis Geo</div><div>Live delivery-partner locations, nearby-restaurant lookups</div><div>Sub-ms geospatial radius queries, ephemeral data</div><div>GEOADD by city-shard key; TTL 30s per partner entry</div></div>
      <div class="pt-row"><div class="pt-name">Cassandra (Location History)</div><div>GPS trail per delivery</div><div>Write-heavy, time-series, horizontal scale</div><div>Partition key: order_id; Clustering key: timestamp</div></div>
      <div class="pt-row"><div class="pt-name">DynamoDB / Cosmos DB (Partner Profile)</div><div>Partner status, vehicle, documents, earnings summary</div><div>High read QPS, simple key-value access</div><div>Partition key: partner_id</div></div>
      <div class="pt-row"><div class="pt-name">Elasticsearch</div><div>Restaurant/dish search index</div><div>Full-text + geo + filter search at low latency</div><div>Indexed on cuisine, rating, price_range, geo_point, veg_flag</div></div>
      <div class="pt-row"><div class="pt-name">Redis (Cart)</div><div>In-progress shopping cart</div><div>Ephemeral, high read/write, no durability needed until checkout</div><div>Key: customer_id; TTL 24h</div></div>
    </div>
    <div class="code-box" style="margin-top:12px;">-- Orders table (PostgreSQL)
CREATE TABLE orders (
  order_id        UUID PRIMARY KEY,
  customer_id     UUID NOT NULL,
  restaurant_id   UUID NOT NULL,
  partner_id      UUID,
  status          VARCHAR(20) NOT NULL,  -- PLACED/ACCEPTED/PREPARING/READY/PICKED_UP/DELIVERED/CANCELLED
  delivery_geo    GEOGRAPHY(POINT),
  total_amount    DECIMAL(10,2),
  prep_eta_secs   INT,
  created_at      TIMESTAMP NOT NULL DEFAULT now(),
  INDEX idx_orders_customer (customer_id, created_at DESC),
  INDEX idx_orders_restaurant (restaurant_id, created_at DESC),
  INDEX idx_orders_partner (partner_id, created_at DESC)
);
-- Sharding key: city_id (an order never spans cities; co-locating keeps
-- restaurant-side and dispatch-side queries single-shard)

-- Restaurant menu item (PostgreSQL)
CREATE TABLE menu_items (
  item_id        UUID PRIMARY KEY,
  restaurant_id  UUID NOT NULL,
  name           VARCHAR(120),
  price          DECIMAL(8,2),
  is_available   BOOLEAN DEFAULT true,
  avg_prep_mins  INT,          -- fed into prep-time prediction model
  INDEX idx_menu_restaurant (restaurant_id)
);

// Delivery partner profile (NoSQL document — Cosmos/DynamoDB)
{
  "partner_id": "P-88213",
  "status": "ON_DELIVERY",      // ONLINE / ON_DELIVERY / OFFLINE
  "vehicle": "bike",
  "current_order_id": "O-771034",
  "rating": 4.7,
  "city_zone": "BLR-KOR-04"
}</div>
    <div class="warn-box" style="margin-top:10px;">⚠️ Never store live partner location in PostgreSQL — 80K writes/sec sustained (with 3-5x bursts at meal times) would need an oversized DB fleet just to absorb writes. In-memory geo-index (Redis) + async trail persistence (Cassandra) is the only viable pattern here, same lesson as ride-hailing.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">5. High-Level Architecture</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step blue">Customer App / Restaurant App / Delivery Partner App</div>
      <div class="flow-arrow">↓ DNS + CDN (food images, static assets)</div>
      <div class="flow-step">API Gateway (auth, rate limit, routing)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Load Balancer → Application Servers (stateless)</div>
      <div class="flow-arrow">↓ splits into core concerns</div>
      <div class="flow-step green">Order Service (state machine)</div>
      <div class="flow-step green">Dispatch/Matching Service</div>
      <div class="flow-step">Catalog/Search Service</div>
      <div class="flow-arrow">↓ reads/writes</div>
      <div class="flow-step">Redis (cache, geo-index, cart) ⇄ Elasticsearch (search) ⇄ Blob Storage (images) ⇄ PostgreSQL/Cassandra (orders, catalog, location trail)</div>
      <div class="flow-arrow">↓ async events</div>
      <div class="flow-step">Kafka (order.placed, order.accepted, order.ready, partner.assigned, location.updated)</div>
      <div class="flow-arrow">↓ consumed by</div>
      <div class="flow-step">Notification Service · Analytics Pipeline · ETA Prediction Service · Monitoring</div>
    </div>
    <p style="margin-top:12px;">Cross-cutting: <strong>CDN</strong> (dish/restaurant photos), <strong>Monitoring</strong> (Prometheus/Grafana on every service), <strong>Search</strong> (Elasticsearch for customer-facing restaurant/dish discovery — unlike Uber, search here is a primary path, not just an ops tool).</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">6. Detailed Component Design</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Responsibility</div><div>Key Design Point</div><div>Scaling Model</div></div>
      <div class="pt-row"><div class="pt-name">Restaurant/Catalog Service</div><div>Owns restaurant profile, menu, pricing, open/close status</div><div>Menu changes propagate to search index and cache within seconds; availability toggles are the highest-frequency write</div><div>Stateless, cached aggressively (menus change rarely vs. read volume)</div></div>
      <div class="pt-row"><div class="pt-name">Order Service</div><div>Owns order state machine end-to-end</div><div>State machine: PLACED→ACCEPTED→PREPARING→READY→PICKED_UP→DELIVERED (+CANCELLED branch at every step before PICKED_UP); optimistic locking on status field</div><div>Stateless, sharded by city_id</div></div>
      <div class="pt-row"><div class="pt-name">Dispatch/Matching Service</div><div>Assigns a delivery partner at the optimal moment</div><div>Unlike cab-hailing, must factor in <strong>food-prep-time uncertainty</strong> — triggers partner search at (prep_eta − partner_travel_time), not at order-placement time, to minimize both partner idle-wait and food-cooling time</div><div>Stateless, per-city shard; re-evaluates every 30s if prep is delayed</div></div>
      <div class="pt-row"><div class="pt-name">Live Tracking Service</div><div>Streams partner GPS to customer/restaurant apps</div><div>WebSocket/long-poll fan-out from Redis geo-index; falls back to polling every 10s on poor connectivity</div><div>Stateless gateway layer, scales with concurrent active-order count</div></div>
      <div class="pt-row"><div class="pt-name">ETA Prediction Service</div><div>Predicts prep-completion time and delivery time</div><div>ML model factors restaurant's historical prep time, current kitchen load (queue depth), traffic, and weather; recalculated on each order-status event</div><div>Stateless inference servers, horizontally scaled, model served via feature store + cache</div></div>
      <div class="pt-row"><div class="pt-name">Payment Service</div><div>Captures payment, handles refunds/split settlements to restaurant + partner</div><div>Idempotent charge via payment gateway; Saga pattern to settle restaurant payout, partner payout, and platform fee separately</div><div>Stateless; strong consistency on ledger writes</div></div>
      <div class="pt-row"><div class="pt-name">Notification Service</div><div>Push/SMS for accept/prep/pickup/delivery updates</div><div>Consumes Kafka order events; fans out to FCM/APNs across three different apps (customer, restaurant, partner)</div><div>Stateless, horizontally scaled consumer group</div></div>
      <div class="pt-row"><div class="pt-name">Search/Discovery Service</div><div>Restaurant/dish search &amp; ranking on the home feed</div><div>Elasticsearch geo+filter query blended with a ranking model (rating, past orders, promoted listings, ETA)</div><div>Stateless query layer in front of a sharded ES cluster</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">7. Sequence Diagrams</div>
  <div class="ref-body">
    <div class="ans-label">Happy Path — Order to Delivery</div>
    <div class="code-box">Customer   OrderSvc   RestaurantApp   DispatchSvc   PartnerApp
  |--place----->|              |               |             |
  |             |--notify----->|               |             |
  |             |<--accept-----|               |             |
  |             |--(status=PREPARING)          |             |
  |             |     ... kitchen cooks ...    |             |
  |             |--(prepEta-5min)-------------->|             |
  |             |              |                |--offer----->|
  |             |              |                |<--accept----|
  |             |<--partnerAssigned-------------|             |
  |             |<--(status=READY)--------------|             |
  |             |              |--handoff to partner---------->|
  |             |<--(status=PICKED_UP)--------------------------|
  |             |<--(status=DELIVERED)--------------------------|
  |<--orderComplete(receipt)---|                |             |</div>

    <div class="ans-label" style="margin-top:14px;">Failure Path — Restaurant Doesn't Accept</div>
    <div class="code-box">OrderSvc     RestaurantApp(R1)
   |--notify(order, 5min TTL)-->|
   |          (kitchen tablet ignored / staff busy)
   |<--no response after 5 min--|
   |--markOrder(AUTO_REJECTED)
   |--refund(customer, full amount)
   |--notifyCustomer("Restaurant unavailable, refund issued")
   |--flagRestaurant(missedAcceptCount++)   // feeds into search ranking penalty</div>

    <div class="ans-label" style="margin-top:14px;">Retry — Partner Location Ping Write Failure</div>
    <div class="code-box">PartnerApp   LocationService     Kafka        Redis-Geo
  |--ping()-->|                    |             |
  |           |--publish(loc)----->|             |
  |           |                    |--consume--->|
  |           |                    |   [Redis timeout]
  |           |                    |<--retry(1)--|  (exponential backoff: 100ms)
  |           |                    |--consume--->|
  |           |                    |<--ack-------|
  |           |  (if 3 retries fail -> DLQ, mark partner location stale,
  |           |   customer app shows "last seen Xs ago" instead of live pin)</div>

    <div class="ans-label" style="margin-top:14px;">Timeout — Delivery Partner Doesn't Respond to Offer</div>
    <div class="code-box">DispatchSvc        PartnerApp
   |--push offer(orderId, 15s TTL)-->|
   |         (partner app silent — tunnel / app backgrounded)
   |<--timeout after 15s-------------|  (no response received)
   |--markCandidate(P1, EXPIRED)
   |--offer(nextCandidate)
   |         (if no partner found within prep-eta window, escalate radius +1km)</div>
    <div class="tip-box" style="margin-top:10px;">✅ Notice the offer timeout for a delivery partner (15s) is intentionally longer than a cab driver's (8s) — a partner may be mid-delivery on another short leg and needs a beat longer to check the app, and dispatch has more slack because food is still cooking.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">8. Database Scaling</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Sharding Strategy</div>
        <p><strong>Shard key: city_id.</strong> An order never spans cities, and restaurant/partner supply is inherently local, so co-locating a city's orders/restaurants/partners on one shard makes 95%+ of queries single-shard. Metro cities (Bengaluru, Mumbai, Delhi NCR) get dedicated shards; tier-2/3 cities are bucketed by region.</p>
        <div class="ans-label" style="margin-top:12px;">Read Replicas</div>
        <p>PostgreSQL: 1 primary + 2-3 read replicas per city shard for order-history/analytics reads and the restaurant-partner dashboard, keeping the primary free for the write-heavy order state-transition path.</p>
      </div>
      <div>
        <div class="ans-label">Replication</div>
        <p>Cassandra: replication factor 3 across AZs for delivery-location history — tolerates a full AZ loss with zero data loss (quorum writes/reads).</p>
        <div class="ans-label" style="margin-top:12px;">CQRS</div>
        <p>Order write model (PostgreSQL, normalized) is separate from the read model used by the customer tracking screen and ops dashboards (denormalized view in Redis/Elasticsearch) — avoids OLTP contention from high-frequency polling reads during active deliveries.</p>
      </div>
    </div>
    <div class="warn-box" style="margin-top:12px;">⚠️ Event sourcing is intentionally NOT used for the core order state machine — a state column with optimistic locking is simpler to debug for a short, mostly-linear lifecycle; event sourcing is reserved for the location trail (naturally an append-only stream) and for the ETA-prediction feature pipeline (needs full event history).</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">9. Cache Strategy</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Cache</div><div>Pattern</div><div>TTL</div><div>Why</div></div>
      <div class="pt-row"><div class="pt-name">Restaurant menu</div><div>Cache-aside</div><div>5 min (invalidated on update)</div><div>Read:write ~1000:1 — menus rarely change but are read constantly</div></div>
      <div class="pt-row"><div class="pt-name">Delivery partner live location</div><div>Write-through (every ping updates cache directly)</div><div>30 sec</div><div>Stale location worse than a cache miss — must always be fresh</div></div>
      <div class="pt-row"><div class="pt-name">Restaurant open/closed + availability</div><div>Write-through</div><div>60 sec</div><div>Showing a closed restaurant as open causes an instant order failure</div></div>
      <div class="pt-row"><div class="pt-name">Search results (popular queries)</div><div>Read-through</div><div>2 min</div><div>High read volume on common cuisine/area queries</div></div>
      <div class="pt-row"><div class="pt-name">Customer/restaurant profile</div><div>Read-through</div><div>10 min</div><div>Changes rarely, high read volume</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Hot Key Problem</div>
        <p>A popular restaurant's menu (e.g. a viral biryani chain) becomes an extreme hot key during peak lunch hour — thousands of customers in the same locality hit the same cache key within seconds. Mitigated by replicating the hot key across multiple cache nodes (client-side consistent hashing to N replicas) and reading from any replica, merging writes through a single owner node.</p>
      </div>
      <div>
        <div class="ans-label">Cache Stampede Prevention</div>
        <p>When a hot menu's cache entry expires at peak, a stampede of concurrent DB reads would spike load exactly when it's least affordable. Mitigated with a distributed lock (Redis <code>SET NX PX</code>) so only one node refetches from PostgreSQL; other requesters get the stale-but-valid cached copy for a few extra seconds (stale-while-revalidate).</p>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">10. Messaging</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Broker</div><div>Used For</div><div>Why This One</div></div>
      <div class="pt-row"><div class="pt-name">Kafka</div><div>Order lifecycle events, partner location pings, analytics feed</div><div>High throughput (6K+ msg/sec sustained, bursts higher at meal peaks), replay for reprocessing/ML feature backfill, log-based per-partition ordering (by order_id)</div></div>
      <div class="pt-row"><div class="pt-name">RabbitMQ (or SQS-equivalent)</div><div>Push-notification dispatch queue</div><div>Simpler point-to-point queue semantics fit fire-and-forget notification jobs across 3 different apps better than a log</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Delivery Guarantees</div>
        <ul>
          <li><strong>Location pings:</strong> at-least-once — a duplicate ping just overwrites the same key, so duplicates are harmless (idempotent by nature)</li>
          <li><strong>Order status events:</strong> exactly-once semantics via Kafka transactional producer + idempotent consumer (dedupe by event_id) — a duplicate "order delivered" event must never double-notify or double-charge</li>
          <li><strong>Ordering:</strong> partition key = order_id, guaranteeing per-order event order across customer/restaurant/partner apps (critical — "picked up" must never be processed before "ready")</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Retry / DLQ</div>
        <p>3 retries with exponential backoff (100ms → 400ms → 1.6s). After exhausting retries, message → Dead Letter Queue; on-call is paged if DLQ depth &gt; threshold. Poison messages (malformed payload) go straight to DLQ without retry to avoid head-of-line blocking on the order_id partition.</p>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">11. Storage</div>
  <div class="ref-body">
    <ul>
      <li><strong>Blob/Object Storage:</strong> restaurant/dish photos, partner KYC documents, order receipts (PDF) — stored in S3/Blob with lifecycle policy moving receipts older than 1 year to cold/archive tier</li>
      <li><strong>CDN:</strong> serves dish/restaurant images and static app assets — the single largest bandwidth consumer in the system (image-heavy discovery feed)</li>
      <li><strong>Image Processing:</strong> uploaded food photos are auto-compressed and resized into multiple variants (thumbnail ~150px for list view, medium ~600px for detail view, WebP format) via an async worker pipeline triggered on upload</li>
      <li><strong>Thumbnail Generation:</strong> pre-generated at upload time rather than on-demand, since the same image is viewed by millions of customers — paying the resize cost once is far cheaper than per-request transforms</li>
    </ul>
    <div class="tip-box" style="margin-top:10px;">✅ Unlike Uber, images are a first-class, high-volume concern here — the discovery feed is essentially an image-heavy product, so CDN cache-hit ratio and image compression directly move both cost and perceived app speed.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">12. Search</div>
  <div class="ref-body">
    <p>Elasticsearch powers the <strong>primary customer-facing discovery flow</strong> — searching and browsing restaurants/dishes is the entry point to almost every order, unlike Uber where search is only an internal tool.</p>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Feature</div><div>Approach</div></div>
      <div class="pt-row"><div class="pt-name">Filters</div><div>cuisine, rating, price range, distance/delivery-time, veg/non-veg, offers</div></div>
      <div class="pt-row"><div class="pt-name">Ranking</div><div>Blended score: relevance + rating + past order affinity + live ETA + sponsored/promoted slots, with a geo-distance decay factor</div></div>
      <div class="pt-row"><div class="pt-name">Autocomplete</div><div>Prefix/edge-ngram index on restaurant &amp; dish names, served from a smaller in-memory trie/cache for sub-20ms suggestions</div></div>
      <div class="pt-row"><div class="pt-name">Geo Search</div><div>geo_distance query combined with filters — restricted to restaurants within serviceable delivery radius (typically 5-7km)</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">13. Scalability</div>
  <div class="ref-body">
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">H</div><div class="principle-name">Horizontal Scaling</div><p>Every service (Order, Dispatch, Search, ETA) is stateless and scales out independently by city load.</p></div>
      <div class="principle-card"><div class="principle-icon">C</div><div class="principle-name">City-Cell Sharding</div><p>Geography is the natural partition key at every layer — DB, cache, search index, and even service instances can be dedicated per high-traffic city.</p></div>
      <div class="principle-card"><div class="principle-icon">A</div><div class="principle-name">Scheduled Auto-Scaling</div><p>Order, Dispatch &amp; Search services scale up ahead of the 11:45am and 7:15pm inflection points using time-based scheduled scaling, not just reactive CPU-based scaling — reactive scaling alone lags the ~11x spike by several minutes.</p></div>
      <div class="principle-card"><div class="principle-icon">B</div><div class="principle-name">Backpressure</div><p>Location ingestion and notification fan-out apply backpressure via Kafka consumer lag alerts — better to briefly delay a live-tracking pin update than crash the write path during dinner rush.</p></div>
      <div class="principle-card"><div class="principle-icon">R</div><div class="principle-name">Rate Limiting</div><p>Per-customer order-placement throttling prevents cart/abuse spam; per-restaurant accept-webhook and per-partner ping rates are capped separately.</p></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">14. Reliability</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Pattern</div><div>Applied To</div><div>Behavior</div></div>
      <div class="pt-row"><div class="pt-name">Circuit Breaker</div><div>Order Service → Payment Gateway calls</div><div>Opens after 5 consecutive failures; order proceeds as "payment pending," retried async rather than blocking checkout</div></div>
      <div class="pt-row"><div class="pt-name">Retry</div><div>Location Service → Redis writes</div><div>3 retries, exponential backoff, then DLQ</div></div>
      <div class="pt-row"><div class="pt-name">Bulkhead</div><div>Dispatch Service thread pools</div><div>Isolated pool per city — one overloaded city (e.g. a festival surge) can't starve dispatch capacity in others</div></div>
      <div class="pt-row"><div class="pt-name">Timeout + Fallback</div><div>Restaurant accept/reject window</div><div>5-minute hard timeout auto-rejects and refunds if the restaurant never responds — critical because, unlike a driver's app, a small kitchen's tablet may simply be ignored</div></div>
      <div class="pt-row"><div class="pt-name">Idempotency</div><div>POST /orders</div><div>Idempotency-Key header prevents duplicate order/charge on client retry over flaky mobile networks</div></div>
      <div class="pt-row"><div class="pt-name">Graceful Degradation</div><div>ETA Prediction Service down</div><div>Falls back to restaurant's static average prep time rather than blocking order placement</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">15. Security</div>
  <div class="ref-body">
    <ul>
      <li><strong>AuthN:</strong> OAuth2 + JWT (short-lived access token + refresh token), phone-number OTP for initial login across customer/restaurant/partner apps</li>
      <li><strong>AuthZ:</strong> RBAC for internal ops/support/admin tooling; ABAC for restaurant-only vs partner-only vs customer-only endpoints</li>
      <li><strong>Encryption:</strong> TLS 1.2+ everywhere in transit; AES-256 at rest for PII (addresses, payment tokens, KYC documents)</li>
      <li><strong>API Keys:</strong> restaurant POS/tablet integrations authenticate via scoped API keys with per-partner rate limits</li>
      <li><strong>Secrets:</strong> Key Vault / Secrets Manager for DB credentials, payment gateway keys — never in code/config</li>
      <li><strong>OWASP:</strong> input validation on address/geo fields, coupon-code fraud checks, rate limiting mitigates promo-code abuse and credential stuffing</li>
      <li><strong>DDoS Protection:</strong> CDN/WAF edge layer (e.g. Cloudflare/Front Door) absorbs volumetric attacks before reaching the API Gateway, especially during high-visibility marketing campaigns</li>
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
          <li>Order acceptance rate &amp; time-to-accept per restaurant/city</li>
          <li>Dispatch success rate &amp; time-to-assign-partner (P50/P95/P99)</li>
          <li>Prep-time prediction error (predicted vs actual)</li>
          <li>Kafka consumer lag on location-ingestion and order-events topics</li>
          <li>Payment success/failure rate</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Stack</div>
        <ul>
          <li><strong>Metrics:</strong> Prometheus + Grafana dashboards per city, with dedicated lunch/dinner-window views</li>
          <li><strong>Tracing:</strong> OpenTelemetry across Order → Dispatch → Payment → Notification call chain</li>
          <li><strong>Logging:</strong> centralized structured logs (ELK or equivalent)</li>
          <li><strong>Alerts:</strong> PagerDuty on dispatch-time P95 breach, DLQ depth, replica lag, restaurant auto-reject spikes</li>
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
      <div class="pt-row"><div class="pt-name">Application Servers</div><div>AKS (Kubernetes) for Order/Dispatch/Catalog/ETA services</div></div>
      <div class="pt-row"><div class="pt-name">Geo-index &amp; Session Cache</div><div>Azure Cache for Redis (Geo commands, cart cache)</div></div>
      <div class="pt-row"><div class="pt-name">Event Streaming</div><div>Azure Event Hubs (Kafka-compatible endpoint)</div></div>
      <div class="pt-row"><div class="pt-name">Notification Queue</div><div>Azure Service Bus</div></div>
      <div class="pt-row"><div class="pt-name">Orders/Catalog DB</div><div>Azure Database for PostgreSQL (or Cosmos DB for global distribution)</div></div>
      <div class="pt-row"><div class="pt-name">Location History</div><div>Cosmos DB (Cassandra API)</div></div>
      <div class="pt-row"><div class="pt-name">Food/Restaurant Images</div><div>Azure Blob Storage</div></div>
      <div class="pt-row"><div class="pt-name">Search</div><div>Azure AI Search</div></div>
      <div class="pt-row"><div class="pt-name">Monitoring</div><div>Application Insights + Azure Monitor</div></div>
      <div class="pt-row"><div class="pt-name">Secrets</div><div>Azure Key Vault</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">18. Kubernetes Deployment</div>
  <div class="ref-body">
    <div class="code-box">Deployment: dispatch-matching-service
  replicas: 15 (per region cluster, baseline)
  HPA: target CPU 55%, min 8 / max 80 pods
  scheduledScaling:
    - cron: "30 11 * * *"  scaleMinReplicas: 40   # pre-scale before lunch rush
    - cron: "30 18 * * *"  scaleMinReplicas: 60   # pre-scale before dinner rush
    - cron: "30 22 * * *"  scaleMinReplicas: 8    # scale back down overnight
  readinessProbe: /healthz (checks Redis + Kafka connectivity)

ConfigMap: dispatch-config
  - PARTNER_OFFER_TIMEOUT_SECONDS=15
  - GEO_SEARCH_RADIUS_KM=3
  - PREP_ETA_LEAD_BUFFER_SECONDS=180   # trigger search this far before food is ready

Secret: dispatch-secrets
  - REDIS_CONNECTION_STRING
  - KAFKA_SASL_CREDENTIALS

Ingress: api-gateway-ingress
  - routes /v1/orders/* -> order-service
  - routes /v1/dispatch/* -> dispatch-matching-service
  - TLS termination at ingress

Service: dispatch-matching-service (ClusterIP) fronts the ReplicaSet
  managed via a Deployment object for rolling updates</div>
    <div class="tip-box" style="margin-top:10px;">✅ Scheduled (cron-based) autoscaling is used in addition to reactive HPA — the lunch/dinner spikes are predictable enough that pre-warming pods 15-30 minutes ahead avoids the cold-start lag reactive scaling alone would suffer.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">19. Failure Scenarios</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Failure</div><div>Impact</div><div>Recovery</div></div>
      <div class="pt-row"><div class="pt-name">Orders DB (PostgreSQL) down</div><div>Can't create/update order state</div><div>Automatic failover to standby replica (&lt;30s); in-flight requests queued briefly at API Gateway</div></div>
      <div class="pt-row"><div class="pt-name">Redis/cache down</div><div>Menu/search reads fall through to DB, live-tracking pins go stale</div><div>Failover to Redis replica (Sentinel/Cluster); degrade to last-known partner location and DB-backed menu reads if total outage</div></div>
      <div class="pt-row"><div class="pt-name">Kafka cluster down</div><div>Order-status events and location pings stop flowing</div><div>Producers buffer locally with backpressure; multi-broker replication (RF=3) tolerates single-broker loss transparently</div></div>
      <div class="pt-row"><div class="pt-name">Payment gateway API failure</div><div>Can't capture payment at checkout</div><div>Circuit breaker opens; order marked "payment pending," async retry queue settles later, customer notified</div></div>
      <div class="pt-row"><div class="pt-name">Region-wide outage</div><div>Entire region's customers/restaurants/partners affected</div><div>DNS/traffic-manager fails over to nearest healthy region; city-level data replicated cross-region for DR</div></div>
      <div class="pt-row"><div class="pt-name">CDN failure</div><div>Dish/restaurant images fail to load, degrading the browse experience</div><div>Multi-CDN fallback (secondary provider) or direct-from-origin fallback with lower-res placeholder images</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">20. Cost Optimization</div>
  <div class="ref-body">
    <ul>
      <li><strong>Reserved Instances:</strong> baseline app-server capacity (sized for off-peak trough) on 1-3yr reservations; burst capacity on-demand for meal-time peaks</li>
      <li><strong>Scheduled Auto-scaling:</strong> scale Dispatch/Order/Search services down aggressively between 3-6pm and overnight (predictable low-traffic windows), not just reactively</li>
      <li><strong>Spot/Low-priority nodes:</strong> analytics batch jobs (restaurant payout reconciliation, ML model training for ETA prediction) run on spot capacity</li>
      <li><strong>Caching:</strong> menu/search caching reduces DB and Elasticsearch read load dramatically, letting both tiers stay smaller</li>
      <li><strong>Storage tiering:</strong> location history moves from hot (Cassandra) → cold (Blob/Archive) after 7 days; receipts to archive after 1 year</li>
      <li><strong>Image compression:</strong> WebP + aggressive CDN caching cuts image bandwidth cost significantly given images are the top egress driver</li>
      <li><strong>Compression:</strong> gRPC/protobuf between internal services instead of JSON — smaller payloads, less bandwidth cost at peak message volume</li>
    </ul>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">21. Trade-offs</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Decision</div><div>Chosen</div><div>Rejected Alternative &amp; Why</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Dispatch trigger point</div><div>Trigger partner search based on predicted prep-ready time minus travel time</div><div>Assign a partner at order-placement time — causes long partner idle-wait at the restaurant, wasting partner earnings-per-hour and creating queues outside kitchens</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Geo-index store</div><div>Redis Geo (in-memory)</div><div>PostgreSQL PostGIS — too slow for 80K+ writes/sec at peak; fine for <em>static</em> geo data, not live partner positions</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Order state management</div><div>Simple state column + optimistic lock</div><div>Full event sourcing — adds complexity not justified for a short, mostly-linear order lifecycle</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Sharding key</div><div>city_id</div><div>customer_id — would scatter a city's restaurant/partner supply data across shards, breaking dispatch and search locality</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Restaurant accept mechanism</div><div>Push notification + 5-min hard timeout auto-reject</div><div>Indefinite wait for manual accept — leaves customers stuck with no feedback; small kitchens often miss notifications entirely</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Search engine</div><div>Elasticsearch as primary discovery path</div><div>DB-only LIKE/full-text search — cannot support geo+filter+ranking blend at required latency and scale</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">22. Interview Questions (30)</div>
  <div class="ref-body">
    <ol>
      <li>How is dispatching a delivery partner fundamentally different from dispatching a cab driver?</li>
      <li>How would you decide the exact moment to start searching for a delivery partner?</li>
      <li>How do you predict a restaurant's food-prep time, and what happens when the prediction is wrong?</li>
      <li>Design the system for a restaurant that doesn't respond to an incoming order.</li>
      <li>How would you find the 5 nearest available delivery partners to a restaurant in under 100ms?</li>
      <li>Why is Redis Geo preferred over a SQL spatial query for this use case?</li>
      <li>How do you prevent two orders from being assigned to the same delivery partner simultaneously?</li>
      <li>Design the delivery-partner location update pipeline for 80K writes/sec with 3-5x meal-time bursts.</li>
      <li>How would you design search ranking to balance relevance, distance, and sponsored placements?</li>
      <li>What happens if a delivery partner accepts an order but then goes offline mid-delivery?</li>
      <li>How do you choose a sharding key for the orders database, and why city_id?</li>
      <li>Walk through the full order state machine and its valid transitions.</li>
      <li>How would you design retry logic for a failed payment capture that also needs to split-settle restaurant and partner payouts?</li>
      <li>What's your strategy for handling a hot restaurant's menu cache during peak lunch hour?</li>
      <li>How do you guarantee ordering of order-status events across three different apps in Kafka?</li>
      <li>Design an idempotent order-placement API — what's the idempotency key and where is it stored?</li>
      <li>How would you detect and mitigate fraudulent orders or fake delivery confirmations?</li>
      <li>What's your approach to A/B testing a new dispatch algorithm safely in production?</li>
      <li>How would you handle a full region outage affecting active deliveries?</li>
      <li>Explain the trade-off between strong and eventual consistency for partner status.</li>
      <li>How do you scale the Dispatch Service independently per city ahead of a lunch/dinner spike?</li>
      <li>Design the notification fan-out when an order status changes.</li>
      <li>How would you estimate delivery ETA more accurately, combining prep time and travel time?</li>
      <li>What monitoring signals would page you at 12:30pm during peak lunch traffic?</li>
      <li>How do you handle a scenario where a dish becomes unavailable after the order is placed but before it's accepted?</li>
      <li>Design the cancellation flow — what happens if the partner is already at the restaurant?</li>
      <li>How would CQRS help the customer-facing live order-tracking screen?</li>
      <li>What's the failure mode if the ETA Prediction Service is completely down?</li>
      <li>How do you prevent cache stampede when thousands of customers query the same popular restaurant at once?</li>
      <li>How would this design change to support batching multiple orders to one delivery partner?</li>
    </ol>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">23. Follow-up Questions</div>
  <div class="ref-body">
    <ul>
      <li>"You trigger dispatch based on predicted prep time — what happens when the prediction model is systematically wrong for a specific restaurant?"</li>
      <li>"How would your design change if a delivery partner could carry orders from multiple restaurants at once (batching)?"</li>
      <li>"What if the restaurant marks an order 'ready' but it actually isn't — how do you handle partner-side disputes?"</li>
      <li>"How do you test the dispatch algorithm's fairness across delivery partners (some get more/better orders)?"</li>
      <li>"Your search ranking blends relevance with sponsored listings — how do you prevent that from degrading result quality over time?"</li>
    </ul>
    <div class="tip-box" style="margin-top:10px;">✅ Interviewers push on your first answer's weak point — always state the failure mode of your own solution before they ask, especially around the prep-time prediction, which is the single most Swiggy/Zomato-specific piece of this design.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">24. Real World Technologies</div>
  <div class="ref-body">
    <p><strong>Swiggy</strong> and <strong>Zomato</strong> both run geo-sharded microservice architectures with Kafka-based event backbones, Elasticsearch for discovery, and ML-driven ETA/prep-time prediction models feeding their dispatch logic. <strong>DoorDash</strong> (US) faces an almost identical three-sided-marketplace dispatch problem and has published extensively on its "food-ready-time-aware" dispatch system. <strong>Instacart</strong> solves a related batching/matching problem for grocery shoppers. <strong>Deliveroo</strong> and <strong>Uber Eats</strong> apply the same core pattern of decoupling order-acceptance, prep-tracking, and partner-assignment into independent, event-driven stages rather than a single synchronous flow.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">25. Design Evolution by Scale</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Scale</div><div>Architecture</div></div>
      <div class="pt-row"><div class="pt-name">1K users</div><div>Single monolith, one PostgreSQL instance, restaurant accepts orders via a simple polling dashboard, delivery assigned manually</div></div>
      <div class="pt-row"><div class="pt-name">100K users</div><div>Split into a few services; introduce Redis for menu/cart cache; basic automated dispatch by static radius; single-region deployment</div></div>
      <div class="pt-row"><div class="pt-name">1M users</div><div>Full microservices split (Order/Dispatch/Catalog/Search); Kafka introduced; Elasticsearch replaces DB-based search; city-based read replicas</div></div>
      <div class="pt-row"><div class="pt-name">10M users</div><div>Geo-sharding by city_id across DB, cache, and search; ML-based ETA/prep-time prediction replaces static averages; scheduled autoscaling for meal-time spikes</div></div>
      <div class="pt-row"><div class="pt-name">100M users</div><div>Multi-region active-active; dedicated infra per mega-city; dispatch batching (multi-order per partner) to improve delivery-partner utilization</div></div>
      <div class="pt-row"><div class="pt-name">1B users</div><div>Edge-computed dispatch decisions near partner GPS ingestion points; global event backbone with regional isolation to contain blast radius; real-time kitchen-load-aware order throttling per restaurant</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">26. Final Architecture Diagram</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step blue">Customer App</div>
      <div class="flow-step blue">Restaurant App</div>
      <div class="flow-step blue">Delivery Partner App</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">CDN (dish/restaurant images) + GeoDNS (routes to nearest region)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">WAF / DDoS Protection → API Gateway (authn, rate limit)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Load Balancer</div>
      <div class="flow-arrow">↓ fan-out to stateless services</div>
      <div class="flow-step green">Order Svc</div>
      <div class="flow-step green">Dispatch/Matching Svc</div>
      <div class="flow-step green">Catalog/Search Svc</div>
      <div class="flow-step green">ETA Prediction Svc</div>
      <div class="flow-step green">Payment Svc</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Redis (cache, geo-index, cart) · Elasticsearch (search) · Cassandra (location trail) · PostgreSQL (orders/catalog, sharded by city) · Blob Storage (images/documents)</div>
      <div class="flow-arrow">↓ async</div>
      <div class="flow-step">Kafka event backbone → Notification Svc · Analytics Pipeline · ML Feature Pipeline (ETA/prep-time models)</div>
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
          <li>Food delivery is a three-sided marketplace — customer, restaurant, and delivery partner all have independent timing, and the system must synchronize them, not just match two sides</li>
          <li>The dispatch problem is fundamentally about <strong>when</strong> to assign a partner (prep-time-aware), not just <strong>who</strong> to assign — this is the key difference from ride-hailing</li>
          <li>Geography (city_id) is the natural partition key at every layer, same as ride-hailing, but search/discovery is a primary product surface here, not an ops afterthought</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Pros of This Design</div>
        <ul><li>Scales independently per city/region and per meal-time window</li><li>Fault isolation via bulkheads prevents one city's surge from starving others</li><li>Clear separation of concerns (catalog vs dispatch vs prep-prediction vs payment)</li></ul>
      </div>
      <div>
        <div class="ans-label">Cons / Open Risks</div>
        <ul><li>Prep-time prediction errors directly translate into either partner idle-wait or food-quality complaints — this model needs constant retraining</li><li>City-based sharding complicates cross-city or highway-corridor deliveries</li><li>Operational complexity of running Kafka + Redis + Cassandra + Elasticsearch + PostgreSQL together</li></ul>
        <div class="ans-label" style="margin-top:12px;">Best Practices</div>
        <ul><li>Always design the restaurant-non-response and partner-non-response failure paths before the happy path</li><li>Treat scheduled (cron-based) autoscaling as a first-class strategy, not just reactive HPA, given how predictable meal-time curves are</li></ul>
      </div>
    </div>
  </div>
</div>
`;
