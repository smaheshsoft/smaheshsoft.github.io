window.Pages['sd-amazon'] = `
<div class="page-header">
  <div class="breadcrumb">System Design › <span>Amazon E-Commerce Platform</span></div>
  <h1>🛒 Amazon — E-Commerce Platform System Design</h1>
  <p>Product catalog, search, cart, order processing, inventory management, recommendations, and payments at global scale</p>
</div>

<div class="ref-section">
  <div class="ref-title">System Architecture Diagram</div>
  <div class="ref-body" style="overflow-x:auto;">
    <svg viewBox="0 0 900 420" style="width:100%;max-width:900px;display:block;margin:0 auto;border-radius:10px;" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#4b5563"/>
        </marker>
      </defs>
      <rect width="900" height="420" fill="#0d1117" rx="10"/>

      <!-- Layer labels -->
      <text x="14" y="74" font-size="11" fill="#888" font-family="monospace" transform="rotate(-90,14,74)">CLIENT</text>
      <text x="14" y="164" font-size="11" fill="#888" font-family="monospace" transform="rotate(-90,14,164)">GATEWAY</text>
      <text x="14" y="264" font-size="11" fill="#888" font-family="monospace" transform="rotate(-90,14,264)">SERVICES</text>
      <text x="14" y="374" font-size="11" fill="#888" font-family="monospace" transform="rotate(-90,14,374)">DATA</text>

      <!-- Layer bands -->
      <rect x="30" y="20" width="860" height="70" rx="6" fill="#ffffff08"/>
      <rect x="30" y="100" width="860" height="60" rx="6" fill="#ffffff06"/>
      <rect x="30" y="170" width="860" height="130" rx="6" fill="#ffffff05"/>
      <rect x="30" y="310" width="860" height="100" rx="6" fill="#ffffff06"/>

      <!-- CLIENT LAYER -->
      <rect x="60" y="30" width="110" height="46" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="115" y="50" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🌐 Browser</text>
      <text x="115" y="66" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Web App</text>

      <rect x="200" y="30" width="110" height="46" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="255" y="50" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📱 Mobile</text>
      <text x="255" y="66" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">iOS / Android</text>

      <rect x="580" y="30" width="130" height="46" rx="8" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="645" y="50" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🌍 CloudFront</text>
      <text x="645" y="66" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">CDN / S3 Images</text>

      <rect x="730" y="30" width="120" height="46" rx="8" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="790" y="50" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🗂️ S3</text>
      <text x="790" y="66" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Static Assets</text>

      <!-- GATEWAY LAYER -->
      <rect x="320" y="112" width="260" height="36" rx="8" fill="#1a2d20" stroke="#4ade80" stroke-width="1.5"/>
      <text x="450" y="127" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🌐 API Gateway + Load Balancer</text>
      <text x="450" y="141" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Auth · Rate Limit · SSL Termination · Routing</text>

      <!-- SERVICES LAYER -->
      <rect x="40" y="182" width="105" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="93" y="200" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📦 Catalog</text>
      <text x="93" y="216" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Product Svc</text>

      <rect x="158" y="182" width="105" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="211" y="200" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🔍 Search</text>
      <text x="211" y="216" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Elasticsearch</text>

      <rect x="276" y="182" width="105" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="329" y="200" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🛒 Cart</text>
      <text x="329" y="216" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Redis-backed</text>

      <rect x="394" y="182" width="105" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="447" y="200" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📋 Order</text>
      <text x="447" y="216" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Order Svc</text>

      <rect x="512" y="182" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="567" y="200" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📊 Inventory</text>
      <text x="567" y="216" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Optimistic Lock</text>

      <rect x="635" y="182" width="105" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="688" y="200" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">💳 Payment</text>
      <text x="688" y="216" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Stripe/Adyen</text>

      <rect x="752" y="182" width="115" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="810" y="200" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🤖 Reco</text>
      <text x="810" y="216" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">ML Engine</text>

      <!-- Kafka -->
      <rect x="320" y="248" width="140" height="36" rx="8" fill="#2d2a1a" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="390" y="263" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📨 Kafka</text>
      <text x="390" y="277" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">order-events · inventory</text>

      <rect x="476" y="248" width="110" height="36" rx="8" fill="#2d2a1a" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="531" y="263" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📬 SQS</text>
      <text x="531" y="277" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Order Queue</text>

      <!-- DATA LAYER -->
      <rect x="40" y="320" width="120" height="46" rx="8" fill="#1a2040" stroke="#34d399" stroke-width="1.5"/>
      <text x="100" y="338" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🗃️ DynamoDB</text>
      <text x="100" y="354" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Cart / Orders</text>

      <rect x="178" y="320" width="130" height="46" rx="8" fill="#1a2040" stroke="#60a5fa" stroke-width="1.5"/>
      <text x="243" y="338" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🗄️ Aurora MySQL</text>
      <text x="243" y="354" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Catalog / Inventory</text>

      <rect x="326" y="320" width="110" height="46" rx="8" fill="#2d1a1a" stroke="#f87171" stroke-width="1.5"/>
      <text x="381" y="338" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">⚡ Redis</text>
      <text x="381" y="354" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Sessions / Cart</text>

      <rect x="452" y="320" width="140" height="46" rx="8" fill="#1a2040" stroke="#34d399" stroke-width="1.5"/>
      <text x="522" y="338" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🔍 Elasticsearch</text>
      <text x="522" y="354" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Search Index</text>

      <rect x="608" y="320" width="115" height="46" rx="8" fill="#2d1f1a" stroke="#fb923c" stroke-width="1.5"/>
      <text x="666" y="338" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📊 CloudWatch</text>
      <text x="666" y="354" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Metrics / Alerts</text>

      <rect x="738" y="320" width="110" height="46" rx="8" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="793" y="338" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🗂️ S3</text>
      <text x="793" y="354" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Images / Backups</text>

      <!-- Arrows CLIENT → GATEWAY -->
      <line x1="115" y1="76" x2="380" y2="112" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="255" y1="76" x2="400" y2="112" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="645" y1="76" x2="530" y2="112" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- GATEWAY → SERVICES -->
      <line x1="390" y1="148" x2="200" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="420" y1="148" x2="329" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="450" y1="148" x2="447" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="480" y1="148" x2="567" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="510" y1="148" x2="688" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- SERVICES → KAFKA/SQS -->
      <line x1="447" y1="228" x2="410" y2="248" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="567" y1="228" x2="510" y2="248" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- SERVICES → DATA -->
      <line x1="93" y1="228" x2="100" y2="320" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="211" y1="228" x2="430" y2="320" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="329" y1="228" x2="340" y2="320" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="688" y1="228" x2="620" y2="320" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Kafka → DynamoDB -->
      <line x1="390" y1="284" x2="200" y2="320" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
    </svg>
  </div>
</div>

<!-- SECTION 1: Executive Summary -->
<div class="ref-section">
  <div class="ref-title">1. Executive Summary</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Problem Statement</strong>
        <p>Design a global e-commerce platform that enables hundreds of millions of customers to browse products, add items to cart, and place orders reliably — while sellers manage inventory and fulfill shipments — all with sub-second search and page load times.</p>
        <br/>
        <strong>Scale Numbers (Amazon 2024)</strong>
        <ul>
          <li>~310 million active customer accounts globally</li>
          <li>~12 million products in catalog (3P marketplace: 350M+ SKUs)</li>
          <li>~1.6 million orders/day (peak: 10M+ on Prime Day)</li>
          <li>~2.5 billion product searches/day</li>
          <li>~400 TB of product image storage</li>
          <li>99.99% uptime SLA (≤52 min downtime/year)</li>
          <li>~\$1.4 trillion GMV processed per year</li>
        </ul>
      </div>
      <div>
        <strong>Core Challenges</strong>
        <ul>
          <li>Flash sales / Prime Day: 10× normal traffic spike in seconds</li>
          <li>Inventory consistency: prevent overselling across warehouses</li>
          <li>Search relevance at 350M SKU scale</li>
          <li>Cart session durability: survive node failures</li>
          <li>Payment idempotency: never double-charge</li>
          <li>Recommendation latency: &lt;50ms for ML inference</li>
          <li>Global distribution: US, EU, Asia with data residency</li>
        </ul>
        <br/>
        <table class="pattern-table">
          <tr class="pt-header"><td>Requirement</td><td>Functional</td><td>Non-Functional</td></tr>
          <tr class="pt-row"><td class="pt-name">Search</td><td>Full-text, faceted, ranking</td><td>&lt;100ms p99</td></tr>
          <tr class="pt-row"><td class="pt-name">Cart</td><td>Add/remove, persist across sessions</td><td>Durable, HA</td></tr>
          <tr class="pt-row"><td class="pt-name">Orders</td><td>Place, track, cancel, return</td><td>ACID, idempotent</td></tr>
          <tr class="pt-row"><td class="pt-name">Inventory</td><td>Reserve, deduct, replenish</td><td>No oversell</td></tr>
          <tr class="pt-row"><td class="pt-name">Payments</td><td>Charge, refund, fraud check</td><td>PCI DSS, exactly-once</td></tr>
          <tr class="pt-row"><td class="pt-name">Reco</td><td>Personalized product suggestions</td><td>&lt;50ms ML inference</td></tr>
        </table>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 2: Capacity Estimation -->
<div class="ref-section">
  <div class="ref-title">2. Capacity Estimation</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><td>Metric</td><td>Assumption</td><td>Calculation</td><td>Result</td></tr>
      <tr class="pt-row"><td class="pt-name">Product Searches/s</td><td>2.5B searches/day</td><td>2.5B / 86400</td><td>~29,000 QPS (peak 150K)</td></tr>
      <tr class="pt-row"><td class="pt-name">Product Page Views/s</td><td>10B page views/day</td><td>10B / 86400</td><td>~115,000 QPS (peak 600K)</td></tr>
      <tr class="pt-row"><td class="pt-name">Add-to-Cart/s</td><td>500M events/day</td><td>500M / 86400</td><td>~5,800 QPS</td></tr>
      <tr class="pt-row"><td class="pt-name">Orders/s</td><td>1.6M orders/day</td><td>1.6M / 86400</td><td>~18 OPS (peak 250)</td></tr>
      <tr class="pt-row"><td class="pt-name">Product Catalog Size</td><td>350M SKUs × 2KB metadata</td><td>350M × 2KB</td><td>~700 GB (Aurora, sharded)</td></tr>
      <tr class="pt-row"><td class="pt-name">Image Storage</td><td>350M SKUs × 5 images × 200KB</td><td>350M × 5 × 200KB</td><td>~350 TB (S3)</td></tr>
      <tr class="pt-row"><td class="pt-name">Search Index Size</td><td>350M docs × 1KB indexed fields</td><td>350M × 1KB × 3 replicas</td><td>~1 TB (Elasticsearch)</td></tr>
      <tr class="pt-row"><td class="pt-name">Cart Data</td><td>10M active carts × 5KB avg</td><td>10M × 5KB</td><td>~50 GB (Redis cluster)</td></tr>
      <tr class="pt-row"><td class="pt-name">Order History</td><td>1B orders × 2KB avg</td><td>1B × 2KB</td><td>~2 TB (DynamoDB)</td></tr>
      <tr class="pt-row"><td class="pt-name">Bandwidth (images)</td><td>500M image loads/day × 50KB thumb</td><td>500M × 50KB / 86400</td><td>~230 GB/s (CloudFront cached)</td></tr>
    </table>
    <div class="tip-box" style="margin-top:12px;">
      Peak Prime Day multiplier = 10×. All services must be pre-warmed and auto-scaled to handle 10× baseline QPS. Predictive scaling starts 30 minutes before flash sales via scheduled Lambda events.
    </div>
  </div>
</div>

<!-- SECTION 3: APIs -->
<div class="ref-section">
  <div class="ref-title">3. API Design</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><td>Endpoint</td><td>Method</td><td>Description</td><td>Auth</td></tr>
      <tr class="pt-row"><td class="pt-name">GET /products/{id}</td><td>GET</td><td>Fetch product details, images, seller info</td><td>None (public)</td></tr>
      <tr class="pt-row"><td class="pt-name">GET /search</td><td>GET</td><td>?q=&amp;category=&amp;price_min=&amp;sort=&amp;page=</td><td>None</td></tr>
      <tr class="pt-row"><td class="pt-name">GET /cart</td><td>GET</td><td>Retrieve current user cart</td><td>JWT</td></tr>
      <tr class="pt-row"><td class="pt-name">POST /cart/items</td><td>POST</td><td>Add item {product_id, quantity, seller_id}</td><td>JWT</td></tr>
      <tr class="pt-row"><td class="pt-name">DELETE /cart/items/{id}</td><td>DELETE</td><td>Remove item from cart</td><td>JWT</td></tr>
      <tr class="pt-row"><td class="pt-name">POST /orders</td><td>POST</td><td>Place order from cart (idempotency-key header)</td><td>JWT</td></tr>
      <tr class="pt-row"><td class="pt-name">GET /orders/{id}</td><td>GET</td><td>Order status, tracking info</td><td>JWT</td></tr>
      <tr class="pt-row"><td class="pt-name">POST /orders/{id}/cancel</td><td>POST</td><td>Cancel pending/processing order</td><td>JWT</td></tr>
      <tr class="pt-row"><td class="pt-name">GET /recommendations</td><td>GET</td><td>?context=pdp|cart|home&amp;product_id=</td><td>JWT (optional)</td></tr>
      <tr class="pt-row"><td class="pt-name">GET /inventory/{product_id}</td><td>GET</td><td>Stock level check (seller/admin)</td><td>API Key</td></tr>
    </table>
    <br/>
    <strong>Request / Response Example — Place Order:</strong>
    <div class="code-box">POST /orders
Headers: Authorization: Bearer &lt;jwt&gt;
         Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000
         Content-Type: application/json

Body:
{
  "cart_id": "cart_abc123",
  "shipping_address_id": "addr_xyz",
  "payment_method_id": "pm_stripe_abc",
  "promo_code": "SAVE20"
}

Response 201:
{
  "order_id": "ord_20240701_00123",
  "status": "PENDING_PAYMENT",
  "total_amount": 89.99,
  "estimated_delivery": "2024-07-03",
  "payment_intent": "pi_stripe_abc"
}</div>
    <br/>
    <strong>Design Standards:</strong>
    <ul>
      <li>REST with JSON; GraphQL for storefront BFF (batch field resolution)</li>
      <li>Idempotency-Key header on all mutating endpoints (orders, payments)</li>
      <li>Cursor-based pagination for search results (not offset — avoids deep pagination scans)</li>
      <li>ETag + If-None-Match for product detail caching</li>
      <li>Rate limiting: 1000 req/min per authenticated user; 100 req/min anonymous</li>
      <li>API versioning: /v1/, /v2/ in URL path, not header-based</li>
    </ul>
  </div>
</div>

<!-- SECTION 4: High-Level Architecture -->
<div class="ref-section">
  <div class="ref-title">4. High-Level Architecture</div>
  <div class="ref-body">
    <div class="code-box">
Browser / Mobile App
       │
       ▼
  [CloudFront CDN] ──── S3 (images, static assets)
       │
       ▼
  [API Gateway + WAF + ALB]
       │
  ┌────┴─────────────────────────────────────┐
  │                  Microservices           │
  │  [Product Catalog]  [Search (ES)]        │
  │  [Cart Service]     [Order Service]      │
  │  [Inventory]        [Payment]            │
  │  [Recommendation]   [Notification]       │
  └────────────────┬─────────────────────────┘
                   │
           [Kafka + SQS]
                   │
  ┌────────────────┴─────────────────────────┐
  │                 Data Layer               │
  │  DynamoDB      Aurora MySQL    Redis     │
  │  Elasticsearch    S3           RDS       │
  └──────────────────────────────────────────┘
    </div>
    <div class="two-col" style="margin-top:16px;">
      <div>
        <strong>Frontend / BFF Layer</strong>
        <ul>
          <li>React SPA served from S3 + CloudFront (edge caching)</li>
          <li>GraphQL BFF aggregates product, pricing, inventory in one request</li>
          <li>Server-Side Rendering (SSR) for product detail pages (SEO)</li>
          <li>CloudFront handles 95% of image traffic — origin shield pattern</li>
        </ul>
        <br/>
        <strong>API Gateway</strong>
        <ul>
          <li>AWS API Gateway + WAF (rate limit, IP block, SQL injection)</li>
          <li>Cognito / internal JWT validation at gateway level</li>
          <li>Routes to appropriate microservice via path-based routing</li>
          <li>Request/response transformation, correlation ID injection</li>
        </ul>
      </div>
      <div>
        <strong>Microservices (ECS/EKS)</strong>
        <ul>
          <li>Each service independently deployable, owns its data store</li>
          <li>Inter-service communication: REST for sync, Kafka for async</li>
          <li>Service mesh (AWS App Mesh) for mTLS + traffic control</li>
          <li>Circuit breakers between all service dependencies</li>
        </ul>
        <br/>
        <strong>Data Tier Strategy</strong>
        <ul>
          <li>DynamoDB: cart sessions, order state machine (high write throughput)</li>
          <li>Aurora MySQL: product catalog, inventory (complex joins, ACID)</li>
          <li>Redis Cluster: session store, cart cache, rate limit counters</li>
          <li>Elasticsearch: full-text search, faceted filtering</li>
          <li>S3: product images, order receipts, ML training data</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 5: Core Service — Order Service -->
<div class="ref-section">
  <div class="ref-title">5. Core Service: Order Service (Order State Machine)</div>
  <div class="ref-body">
    <p>The Order Service is the most critical component — it orchestrates inventory reservation, payment, fulfillment, and notifications. It must be idempotent, consistent, and resilient to partial failures.</p>
    <br/>
    <strong>Order State Machine:</strong>
    <div class="code-box">CART_CHECKOUT
    → PENDING_PAYMENT      (inventory reserved, payment initiated)
    → PAYMENT_CONFIRMED    (payment authorized by Stripe/Adyen)
    → PROCESSING           (sent to fulfillment center via SQS)
    → SHIPPED              (carrier scan event via Kafka)
    → DELIVERED            (final delivery confirmation)
    → CANCELLED            (before PROCESSING; inventory released)
    → REFUND_INITIATED     (return requested)
    → REFUNDED             (payment reversed)</div>
    <br/>
    <div class="two-col">
      <div>
        <strong>Checkout Flow (Saga Pattern):</strong>
        <ol>
          <li>Validate cart (items in stock, prices current)</li>
          <li>Reserve inventory (optimistic lock, version check)</li>
          <li>Create order record in DynamoDB (status: PENDING_PAYMENT)</li>
          <li>Initiate payment intent with Stripe (async webhook)</li>
          <li>On payment success: publish order-confirmed event to Kafka</li>
          <li>Fulfillment consumer dequeues and creates warehouse task</li>
          <li>Notification service sends confirmation email/push</li>
        </ol>
        <br/>
        <strong>Saga Compensating Transactions:</strong>
        <ul>
          <li>Payment failure → release inventory reservation</li>
          <li>Fulfillment timeout → retry or cancel + refund</li>
          <li>Inventory release failure → dead letter queue + manual review</li>
        </ul>
      </div>
      <div>
        <strong>DynamoDB Schema for Orders:</strong>
        <div class="code-box">PK: ORDER#{order_id}
SK: METADATA
GSI1PK: USER#{user_id}
GSI1SK: ORDER#{created_at}
Attributes:
  status, total_amount,
  items (list), payment_intent_id,
  shipping_address, created_at,
  idempotency_key, version</div>
        <br/>
        <strong>Idempotency Implementation:</strong>
        <ul>
          <li>Client sends UUID Idempotency-Key header</li>
          <li>Order service checks Redis cache for this key (TTL: 24h)</li>
          <li>If found: return cached response (no re-processing)</li>
          <li>If not found: process and cache result atomically (Lua script)</li>
          <li>DynamoDB conditional writes prevent duplicate order rows</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 6: Core Service — Inventory Service -->
<div class="ref-section">
  <div class="ref-title">6. Core Service: Inventory Service (Preventing Oversell)</div>
  <div class="ref-body">
    <p>The Inventory Service must prevent overselling at flash sale scale (10,000 concurrent checkouts for a limited-quantity item) while maintaining low latency.</p>
    <br/>
    <div class="two-col">
      <div>
        <strong>Two-Phase Reservation:</strong>
        <ol>
          <li><strong>Soft Reserve:</strong> Decrement Redis counter atomically (DECRBY), held for 15 minutes</li>
          <li><strong>Hard Commit:</strong> On payment success, update Aurora MySQL with optimistic locking (WHERE quantity &gt;= requested AND version = N)</li>
          <li><strong>Release:</strong> On timeout or cancel, increment Redis counter back (INCRBY)</li>
        </ol>
        <br/>
        <strong>Optimistic Locking in Aurora:</strong>
        <div class="code-box">UPDATE inventory
SET quantity = quantity - 5,
    version = version + 1,
    updated_at = NOW()
WHERE product_id = 'P123'
  AND warehouse_id = 'WH_SEA'
  AND quantity &gt;= 5
  AND version = 42;
-- If 0 rows affected → conflict → retry or fail</div>
      </div>
      <div>
        <strong>Redis as Inventory Buffer (Flash Sales):</strong>
        <div class="code-box">-- Lua script: atomic check-and-decrement
local current = redis.call('GET', KEYS[1])
if current == false or tonumber(current) &lt; tonumber(ARGV[1]) then
  return -1  -- insufficient stock
end
return redis.call('DECRBY', KEYS[1], ARGV[1])
-- Returns new count, or -1 if failed</div>
        <br/>
        <strong>Inventory Sync Strategy:</strong>
        <ul>
          <li>Redis counter pre-loaded from Aurora on service startup</li>
          <li>Kafka consumer updates Redis on every warehouse receipt</li>
          <li>Reconciliation job runs every 5 min comparing Redis vs Aurora</li>
          <li>Multi-warehouse: aggregate across warehouses; route to nearest</li>
        </ul>
        <br/>
        <strong>Flash Sale Mode:</strong>
        <ul>
          <li>Queue-based checkout: users enter virtual queue (SQS FIFO)</li>
          <li>Rate limiting: max N checkouts/s per product</li>
          <li>Token bucket per product via Redis sliding window</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 7: Core Service — Search Service -->
<div class="ref-section">
  <div class="ref-title">7. Core Service: Search Service (Elasticsearch at Scale)</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Elasticsearch Cluster Design:</strong>
        <ul>
          <li>3 master nodes (m6g.large) for cluster state</li>
          <li>20+ data nodes (r6g.2xlarge) for shards</li>
          <li>350M documents → ~30 primary shards (10M docs/shard)</li>
          <li>2 replicas per shard = 90 total shards</li>
          <li>Dedicated coordinating nodes for query fan-out</li>
        </ul>
        <br/>
        <strong>Index Mapping (key fields):</strong>
        <div class="code-box">{
  "title": { "type": "text",
    "analyzer": "english",
    "fields": { "keyword": { "type": "keyword" } }
  },
  "category": { "type": "keyword" },
  "brand": { "type": "keyword" },
  "price": { "type": "float" },
  "rating": { "type": "float" },
  "review_count": { "type": "integer" },
  "in_stock": { "type": "boolean" },
  "tags": { "type": "keyword" },
  "embedding": { "type": "dense_vector", "dims": 768 }
}</div>
      </div>
      <div>
        <strong>Query Pipeline:</strong>
        <ol>
          <li>Spell correction (DidYouMean) on query terms</li>
          <li>Query expansion: synonyms (TV → television → smart TV)</li>
          <li>Boolean must: text match + in_stock=true</li>
          <li>Function score: base BM25 × (rating^0.3) × (review_count_log) × (personalization_score)</li>
          <li>Aggregations for facets: category, brand, price_range, rating</li>
          <li>Highlighted snippets for matched terms</li>
        </ol>
        <br/>
        <strong>Indexing Pipeline:</strong>
        <ul>
          <li>Aurora CDC → Kafka (Debezium connector) → Elasticsearch consumer</li>
          <li>Near-real-time indexing: &lt;5s lag for new products/price changes</li>
          <li>Bulk indexing batches: 1000 docs/request, 5 concurrent threads</li>
          <li>Zero-downtime reindex: blue-green index aliases</li>
          <li>ML embeddings pre-computed offline and stored as dense_vector for semantic search</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 8: Database Design -->
<div class="ref-section">
  <div class="ref-title">8. Database Design</div>
  <div class="ref-body">
    <strong>Aurora MySQL — Products Table:</strong>
    <div class="code-box">CREATE TABLE products (
  product_id    VARCHAR(36)    PRIMARY KEY,
  title         VARCHAR(500)   NOT NULL,
  description   TEXT,
  category_id   INT            NOT NULL,
  brand_id      INT,
  base_price    DECIMAL(10,2)  NOT NULL,
  seller_id     VARCHAR(36)    NOT NULL,
  weight_kg     DECIMAL(6,3),
  status        ENUM('ACTIVE','INACTIVE','DELETED') DEFAULT 'ACTIVE',
  created_at    DATETIME       DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME       ON UPDATE CURRENT_TIMESTAMP,
  version       INT            DEFAULT 0,
  INDEX idx_category (category_id),
  INDEX idx_seller (seller_id),
  INDEX idx_status_created (status, created_at)
) ENGINE=InnoDB PARTITION BY HASH(category_id) PARTITIONS 16;</div>
    <br/>
    <strong>Aurora MySQL — Inventory Table:</strong>
    <div class="code-box">CREATE TABLE inventory (
  product_id    VARCHAR(36)   NOT NULL,
  warehouse_id  VARCHAR(36)   NOT NULL,
  quantity      INT           NOT NULL DEFAULT 0,
  reserved_qty  INT           NOT NULL DEFAULT 0,
  version       INT           NOT NULL DEFAULT 0,
  updated_at    DATETIME,
  PRIMARY KEY (product_id, warehouse_id),
  CHECK (quantity &gt;= 0),
  INDEX idx_warehouse (warehouse_id)
);</div>
    <br/>
    <strong>DynamoDB — Orders Table (Single-Table Design):</strong>
    <table class="pattern-table">
      <tr class="pt-header"><td>Access Pattern</td><td>PK</td><td>SK / GSI</td></tr>
      <tr class="pt-row"><td class="pt-name">Get order by ID</td><td>ORDER#&lt;id&gt;</td><td>METADATA</td></tr>
      <tr class="pt-row"><td class="pt-name">List user orders</td><td>USER#&lt;user_id&gt;</td><td>GSI1: ORDER#&lt;created_at&gt;</td></tr>
      <tr class="pt-row"><td class="pt-name">Orders by status</td><td>STATUS#&lt;status&gt;</td><td>GSI2: &lt;created_at&gt;</td></tr>
      <tr class="pt-row"><td class="pt-name">Get order items</td><td>ORDER#&lt;id&gt;</td><td>ITEM#&lt;product_id&gt;</td></tr>
    </table>
    <br/>
    <strong>Redis — Key Patterns:</strong>
    <div class="code-box">session:{session_id}          → Hash (user_id, cart_id, ...) TTL 30min
cart:{user_id}                → Hash (product_id → quantity)  TTL 7 days
inventory:{product_id}        → String (available count)      No TTL
rate_limit:{user_id}:{minute} → String (request count)        TTL 60s
idempotency:{key}             → String (response JSON)         TTL 24h
product_cache:{product_id}    → String (JSON)                  TTL 5min</div>
  </div>
</div>

<!-- SECTION 9: Data Flow — Key Scenarios -->
<div class="ref-section">
  <div class="ref-title">9. Data Flow — Key Scenarios</div>
  <div class="ref-body">
    <strong>Scenario 1: Product Search</strong>
    <div class="flow-box">
      <div class="flow-step">User types "wireless headphones under \$100" in search bar</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">CloudFront checks edge cache (TTL 30s for popular queries) — MISS</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">API Gateway → Search Service: spell-check, synonym expansion</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Elasticsearch: BM25 query with function score (rating × reviews), price filter &lt;100, in_stock=true</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Aggregations: category buckets, brand facets, price histogram</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Top 24 results returned: product_id, title, price, rating, thumbnail_url</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Response cached in CloudFront (30s TTL) → returned to user in &lt;80ms</div>
    </div>
    <br/>
    <strong>Scenario 2: Add to Cart &amp; Checkout</strong>
    <div class="flow-box">
      <div class="flow-step">User clicks "Add to Cart" → POST /cart/items (JWT required)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Cart Service: HSET cart:{user_id} {product_id} {qty} in Redis (TTL 7d)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">User clicks "Proceed to Checkout" → Validate cart items (price/stock check)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Inventory Service: DECRBY Redis counter (atomic soft-reserve)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Order Service: Create order in DynamoDB (PENDING_PAYMENT), return payment_intent</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Payment Service: Stripe PaymentIntent.confirm() → Stripe webhook callback</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">On payment success: Kafka event order-confirmed → Fulfillment, Notification consumers</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Hard inventory commit in Aurora MySQL (optimistic lock). Cart cleared from Redis.</div>
    </div>
    <br/>
    <strong>Scenario 3: Flash Sale (10,000 concurrent buyers, 100 units)</strong>
    <div class="flow-box">
      <div class="flow-step">Flash sale starts: pre-warm Redis inventory counter to 100</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">10,000 checkout requests hit API Gateway simultaneously</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Rate limiter: token bucket per product (Redis Lua) — only 500 req/s pass</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">SQS FIFO queue: orders queued with deduplication (MessageGroupId=product_id)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Consumer processes FIFO: atomic Redis DECRBY — first 100 succeed, rest get "Out of Stock"</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Waitlist users notified via SNS/push when restock occurs</div>
    </div>
  </div>
</div>

<!-- SECTION 10: Caching Strategy -->
<div class="ref-section">
  <div class="ref-title">10. Caching Strategy</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><td>Layer</td><td>What is Cached</td><td>TTL</td><td>Strategy</td><td>Eviction</td></tr>
      <tr class="pt-row"><td class="pt-name">CloudFront Edge</td><td>Product images, static assets, search results</td><td>Images: 7d; Search: 30s</td><td>Read-through</td><td>LRU + manual invalidation</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis (Product Cache)</td><td>Product detail JSON (top 1M SKUs)</td><td>5 min</td><td>Cache-aside</td><td>LRU (maxmemory-policy)</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis (Cart)</td><td>Cart contents per user</td><td>7 days (sliding)</td><td>Write-through</td><td>Expiry TTL</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis (Sessions)</td><td>Auth session tokens</td><td>30 min (sliding)</td><td>Write-through</td><td>Expiry TTL</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis (Inventory)</td><td>Available stock count per SKU</td><td>No TTL (event-driven sync)</td><td>Write-around + pub/sub refresh</td><td>Manual flush on restock</td></tr>
      <tr class="pt-row"><td class="pt-name">Elasticsearch Query Cache</td><td>Popular search query results</td><td>2 min</td><td>Built-in node query cache</td><td>LRU</td></tr>
      <tr class="pt-row"><td class="pt-name">Application-level (Guava)</td><td>Category tree, feature flags</td><td>10 min</td><td>Cache-aside</td><td>LRU, size-based</td></tr>
    </table>
    <br/>
    <div class="two-col">
      <div>
        <strong>Cache-Aside Pattern (Product Detail):</strong>
        <div class="code-box">GET /products/{id}:
1. Check Redis: GET product_cache:{id}
2. HIT  → deserialize JSON → return
3. MISS → query Aurora MySQL
4. Store result: SET product_cache:{id} {json} EX 300
5. Return result</div>
      </div>
      <div>
        <strong>Cache Invalidation:</strong>
        <ul>
          <li>Price update → publish to Kafka → consumer calls DEL product_cache:{id}</li>
          <li>Seller updates product → webhook triggers invalidation</li>
          <li>CloudFront: use versioned URLs for images (no invalidation needed)</li>
          <li>Fan-out invalidation for category pages via Lua script</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 11: Message Queue / Event Streaming -->
<div class="ref-section">
  <div class="ref-title">11. Message Queue &amp; Event Streaming</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Kafka Topics &amp; Producers/Consumers:</strong>
        <table class="pattern-table">
          <tr class="pt-header"><td>Topic</td><td>Producer</td><td>Consumer</td></tr>
          <tr class="pt-row"><td class="pt-name">order-confirmed</td><td>Order Svc</td><td>Fulfillment, Notification, Analytics</td></tr>
          <tr class="pt-row"><td class="pt-name">order-shipped</td><td>WMS</td><td>Order Svc, Notification</td></tr>
          <tr class="pt-row"><td class="pt-name">inventory-updated</td><td>Inventory Svc</td><td>Search indexer, Redis updater</td></tr>
          <tr class="pt-row"><td class="pt-name">product-updated</td><td>Catalog Svc</td><td>Elasticsearch indexer, CDN invalidator</td></tr>
          <tr class="pt-row"><td class="pt-name">user-activity</td><td>Frontend BFF</td><td>Recommendation engine, Analytics</td></tr>
          <tr class="pt-row"><td class="pt-name">payment-events</td><td>Payment Svc</td><td>Order Svc, Fraud detection</td></tr>
        </table>
      </div>
      <div>
        <strong>Kafka Configuration:</strong>
        <ul>
          <li>Partitions: order-confirmed → 120 partitions (keyed by order_id)</li>
          <li>Replication factor: 3 across AZs</li>
          <li>Retention: 7 days (compacted for inventory topic)</li>
          <li>Consumer groups: each consuming service has its own group</li>
          <li>At-least-once delivery; idempotent consumers (check seen event IDs)</li>
        </ul>
        <br/>
        <strong>SQS for Fulfillment:</strong>
        <ul>
          <li>SQS FIFO queue per warehouse region</li>
          <li>Visibility timeout: 30 min (WMS processing time)</li>
          <li>DLQ after 3 failed attempts → ops alert + manual retry</li>
          <li>Message deduplication ID = order_id (exactly-once processing)</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 12: Real-time Communication -->
<div class="ref-section">
  <div class="ref-title">12. Real-time Communication</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Order Status Updates — Server-Sent Events (SSE):</strong>
        <ul>
          <li>Customer opens order tracking page → establishes SSE connection to Order Service</li>
          <li>GET /orders/{id}/stream → text/event-stream</li>
          <li>Order Service subscribes to order-{id} Kafka topic partition</li>
          <li>Status changes pushed in real-time: SHIPPED → OUT_FOR_DELIVERY → DELIVERED</li>
          <li>SSE preferred over WebSocket for unidirectional server → client push</li>
          <li>Reconnect with Last-Event-ID header for missed events</li>
        </ul>
        <br/>
        <strong>Inventory Count on PDP — Short Polling:</strong>
        <ul>
          <li>Product detail page polls GET /inventory/{id}?stock_level every 30s</li>
          <li>"Only 3 left" warning triggers real-time urgency UI</li>
          <li>Polling acceptable here — not latency-critical, reduces complexity</li>
        </ul>
      </div>
      <div>
        <strong>Flash Sale Countdown — WebSocket:</strong>
        <ul>
          <li>Flash sale pages use WebSocket for precise countdown sync</li>
          <li>API Gateway WebSocket API → Lambda → ElastiCache Pub/Sub</li>
          <li>When sale starts: broadcast to all connected clients simultaneously</li>
          <li>Reduces thundering herd from polling-based implementations</li>
        </ul>
        <br/>
        <strong>Push Notifications — SNS + FCM/APNs:</strong>
        <ul>
          <li>Order confirmations, shipping updates via SNS topics</li>
          <li>SNS fan-out: FCM (Android), APNs (iOS), SES (email), SMS</li>
          <li>Notification preferences stored in DynamoDB per user</li>
          <li>Back-pressure: SNS → SQS → Lambda → FCM (buffered)</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 13: Consistency & Transactions -->
<div class="ref-section">
  <div class="ref-title">13. Consistency &amp; Transactions</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Where ACID is Required:</strong>
        <ul>
          <li>Inventory deduction (Aurora: optimistic lock, row-level)</li>
          <li>Payment processing (Stripe handles internally)</li>
          <li>Order creation (DynamoDB TransactWriteItems — atomic multi-item)</li>
          <li>Cart-to-order transition (DynamoDB conditional write)</li>
        </ul>
        <br/>
        <strong>DynamoDB Transactions Example:</strong>
        <div class="code-box">TransactWriteItems([
  // Create order
  Put(orders, {PK:"ORDER#123", status:"PENDING", ...}),
  // Decrement cart version (optimistic)
  Update(carts,
    {PK:"CART#user1"},
    Condition: version = 5,
    SET version = 6, status = CHECKED_OUT
  ),
  // Idempotency key
  Put(idempotency, {key:"...", order_id:"123"},
    Condition: attribute_not_exists(key))
])</div>
      </div>
      <div>
        <strong>Where BASE is Acceptable:</strong>
        <ul>
          <li>Search index: eventually consistent (up to 5s lag) — acceptable</li>
          <li>Recommendation cache: stale-while-revalidate, minutes of staleness OK</li>
          <li>Product view count, review aggregates: approximate counters (HyperLogLog)</li>
          <li>Notification delivery: at-least-once (idempotent handler)</li>
        </ul>
        <br/>
        <strong>Distributed Lock (Redis Redlock):</strong>
        <ul>
          <li>Used for flash sale product reservation leader election</li>
          <li>SET lock:{product_id} {uuid} NX EX 5 (5s TTL)</li>
          <li>3-node Redlock for fault tolerance (majority quorum)</li>
          <li>Avoid for high-throughput paths — use optimistic locking instead</li>
        </ul>
        <br/>
        <strong>Two-Phase Commit Avoidance:</strong>
        <ul>
          <li>Saga pattern replaces 2PC across services</li>
          <li>Outbox pattern: write event to same DB transaction, relay to Kafka</li>
          <li>Each step idempotent — safe to retry</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 14: Search Architecture -->
<div class="ref-section">
  <div class="ref-title">14. Search Architecture</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Inverted Index Structure:</strong>
        <div class="code-box">Term: "headphones"
→ Postings: [doc_1(tf=3), doc_5(tf=1), doc_12(tf=2), ...]

Query: "wireless headphones"
→ Intersect postings lists for "wireless" AND "headphones"
→ Score = BM25(tf, idf) × function_score
→ Sort by score desc, page 1 → 24 results</div>
        <br/>
        <strong>Relevance Tuning:</strong>
        <ul>
          <li>Title match: boost 3×, description: 1×, tags: 2×</li>
          <li>Rating × log(review_count): popularity signal</li>
          <li>Freshness decay: newer listings get slight boost</li>
          <li>A/B testing relevance models via traffic splitting</li>
          <li>Click-through rate fed back as learning-to-rank signal</li>
        </ul>
      </div>
      <div>
        <strong>Semantic / Vector Search:</strong>
        <ul>
          <li>BERT-based model encodes product title → 768-dim embedding</li>
          <li>Query encoded at runtime → cosine similarity via kNN</li>
          <li>Hybrid: BM25 (exact) + kNN (semantic), RRF fusion</li>
          <li>Handles "cheap earbuds for gym" → finds relevant SKUs even without exact term match</li>
        </ul>
        <br/>
        <strong>Autocomplete / Typeahead:</strong>
        <ul>
          <li>Elasticsearch completion suggester field (FST in memory)</li>
          <li>Top 1M query phrases stored in sorted set (Redis ZADD with score = frequency)</li>
          <li>ZRANGEBYLEX for prefix matching: O(log N + M)</li>
          <li>Dedicated autocomplete cluster (separate from main search)</li>
        </ul>
        <br/>
        <strong>Index Management:</strong>
        <ul>
          <li>Index alias: products_v12 aliased as products_read</li>
          <li>Zero-downtime reindex: build v13 → swap alias → delete v12</li>
          <li>Rollover: new index per month for time-series data (reviews)</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 15: CDN & Media Delivery -->
<div class="ref-section">
  <div class="ref-title">15. CDN &amp; Media Delivery</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>CloudFront Distribution Strategy:</strong>
        <ul>
          <li>450+ PoPs globally; ~10ms RTT from major cities to edge</li>
          <li>Product images: S3 origin → CloudFront (cache TTL 7 days)</li>
          <li>Versioned URLs (/images/v2/product123.jpg) → no invalidation needed</li>
          <li>Origins: S3 (images), ALB (dynamic), custom origins (video)</li>
          <li>Geo-restriction: OFAC countries blocked at edge</li>
        </ul>
        <br/>
        <strong>Image Optimization Pipeline:</strong>
        <ul>
          <li>Seller uploads original image → S3 triggers Lambda</li>
          <li>Lambda resizes to 5 standard sizes (thumb, sm, md, lg, zoom)</li>
          <li>WebP conversion (30% smaller than JPEG)</li>
          <li>Stored as: images/{product_id}/{size}/{hash}.webp</li>
          <li>AVIF for modern browsers (50% smaller) via content negotiation</li>
        </ul>
      </div>
      <div>
        <strong>What Is CDN-Served:</strong>
        <ul>
          <li>Product images: 100% (cache hit rate ~99.5%)</li>
          <li>React SPA bundle (JS/CSS): 100% (immutable with content hash)</li>
          <li>Search results for popular queries (30s TTL)</li>
          <li>Product detail pages (SSR HTML, 60s TTL, Vary: Accept-Language)</li>
          <li>Category listing pages (120s TTL)</li>
        </ul>
        <br/>
        <strong>Cache Invalidation for Dynamic Content:</strong>
        <ul>
          <li>Price changes: CloudFront invalidation API (max 1000/month free)</li>
          <li>Flash sale start: Lambda@Edge disables cache for sale products</li>
          <li>OOS: Lambda@Edge rewrites response to add "no-store" header</li>
          <li>Surrogate-Key (cache tags) for targeted bulk invalidation</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 16: Security -->
<div class="ref-section">
  <div class="ref-title">16. Security</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Authentication &amp; Authorization:</strong>
        <ul>
          <li>Cognito User Pools: JWT (access + refresh tokens)</li>
          <li>Access token: 1h TTL; refresh token: 30 days (sliding)</li>
          <li>OAuth 2.0 / OIDC for third-party login (Google, Apple, Facebook)</li>
          <li>IAM roles for service-to-service (no shared secrets)</li>
          <li>Fine-grained authz: customer can only access own orders (resource-based)</li>
          <li>Seller portal: separate identity pool with seller-scoped permissions</li>
        </ul>
        <br/>
        <strong>Encryption:</strong>
        <ul>
          <li>In transit: TLS 1.3 everywhere; mTLS between microservices (App Mesh)</li>
          <li>At rest: AES-256 in S3, DynamoDB, Aurora (AWS KMS managed keys)</li>
          <li>PCI DSS: payment card data never stored (tokenized by Stripe)</li>
          <li>Field-level encryption: PII fields (address, phone) in DynamoDB</li>
        </ul>
      </div>
      <div>
        <strong>Rate Limiting &amp; DDoS:</strong>
        <ul>
          <li>AWS Shield Advanced: L3/L4 DDoS mitigation</li>
          <li>WAF rules: SQL injection, XSS, OWASP Top 10</li>
          <li>API Gateway throttling: per-user token bucket (Redis)</li>
          <li>Geographic rate limiting: anomalous regions throttled</li>
          <li>CAPTCHA on checkout for suspicious patterns</li>
        </ul>
        <br/>
        <strong>Fraud Detection:</strong>
        <ul>
          <li>ML model scores each order: velocity, geolocation, device fingerprint</li>
          <li>Rules engine: card/IP/device blacklists, unusual order patterns</li>
          <li>3DS2 triggered for high-risk transactions (&gt;score threshold)</li>
          <li>Real-time event stream: Kafka → Flink → fraud model inference (&lt;500ms)</li>
          <li>Chargebacks auto-disputed with evidence package via Stripe API</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 17: Scalability Patterns -->
<div class="ref-section">
  <div class="ref-title">17. Scalability Patterns</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Horizontal Scaling:</strong>
        <ul>
          <li>All microservices run on EKS (Kubernetes) with HPA (Horizontal Pod Autoscaler)</li>
          <li>HPA: scale on CPU &gt;60% AND custom metric (queue depth, RPS)</li>
          <li>KEDA for event-driven scaling: scale to zero when Kafka lag = 0</li>
          <li>Cluster Autoscaler: add EC2 nodes when pod pending</li>
          <li>Spot instances for stateless services (Order, Search): 70% cost savings</li>
        </ul>
        <br/>
        <strong>Database Sharding (Aurora):</strong>
        <ul>
          <li>Product catalog sharded by category_id HASH (16 shards)</li>
          <li>Inventory sharded by warehouse_id (geographically)</li>
          <li>Orders in DynamoDB: auto-partitioned by PK hash</li>
          <li>Cross-shard queries avoided by denormalization</li>
        </ul>
      </div>
      <div>
        <strong>Read Replicas:</strong>
        <ul>
          <li>Aurora: 5 read replicas per cluster; Route 53 load balances reads</li>
          <li>Read-heavy paths (product detail, search) → read replica</li>
          <li>Writes (inventory deduction, order creation) → primary only</li>
          <li>Replication lag monitoring: alert if &gt;1s</li>
        </ul>
        <br/>
        <strong>Pre-warming for Events:</strong>
        <ul>
          <li>Scheduled Lambda 30 min before Prime Day: warm ECS tasks to 200% baseline</li>
          <li>DynamoDB on-demand mode during sales (vs provisioned normal)</li>
          <li>ElastiCache Redis: provisioned throughput doubled proactively</li>
          <li>CloudFront: request rate increase notification to AWS support</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 18: Fault Tolerance & Reliability -->
<div class="ref-section">
  <div class="ref-title">18. Fault Tolerance &amp; Reliability</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Circuit Breaker (Resilience4j):</strong>
        <div class="code-box">CircuitBreaker config:
  slidingWindowSize: 10 requests
  failureRateThreshold: 50%
  waitDurationInOpenState: 30s
  permittedCallsInHalfOpenState: 3

Order → Payment Service:
  CLOSED → OPEN (5/10 calls failed)
  OPEN → fallback: queue payment async
  HALF_OPEN → test with 3 calls → CLOSED</div>
        <br/>
        <strong>Bulkhead Pattern:</strong>
        <ul>
          <li>Separate thread pool per downstream service (payment, inventory, search)</li>
          <li>If payment pool exhausted, only payment calls queued — not entire order service</li>
          <li>Semaphore bulkhead for fast non-blocking calls (search suggestions)</li>
        </ul>
      </div>
      <div>
        <strong>Retry with Exponential Backoff:</strong>
        <div class="code-box">Retry policy:
  maxAttempts: 3
  waitDuration: 100ms
  multiplier: 2 (200ms, 400ms)
  retryOn: IOException, 503, 429
  ignoreOn: 400, 404, 409 (no retry)</div>
        <br/>
        <strong>Graceful Degradation:</strong>
        <ul>
          <li>Recommendation Service down → show "Bestsellers in category" fallback</li>
          <li>Inventory Service down → show "Check availability at checkout"</li>
          <li>Search down → redirect to category browse pages</li>
          <li>Payment gateway timeout → queue payment, confirm async within 5 min</li>
        </ul>
        <br/>
        <strong>Chaos Engineering:</strong>
        <ul>
          <li>AWS Fault Injection Simulator runs weekly in staging</li>
          <li>Scenarios: AZ failure, latency injection (300ms), pod kills</li>
          <li>Runbooks pre-authored for every circuit breaker open scenario</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 19: Monitoring & Observability -->
<div class="ref-section">
  <div class="ref-title">19. Monitoring &amp; Observability</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Metrics (CloudWatch + Prometheus + Grafana):</strong>
        <ul>
          <li>Business: orders/min, GMV/hour, cart abandonment rate, conversion %</li>
          <li>Infrastructure: CPU, memory, pod count, ALB 5xx rate</li>
          <li>Application: p50/p95/p99 latency per endpoint, error rate</li>
          <li>Database: DynamoDB consumed WCU/RCU, Aurora replication lag, Redis eviction rate</li>
          <li>Kafka: consumer lag per topic-partition (alert if &gt;10,000)</li>
        </ul>
        <br/>
        <strong>Distributed Tracing (AWS X-Ray + OpenTelemetry):</strong>
        <ul>
          <li>Trace ID injected at API Gateway, propagated via HTTP headers</li>
          <li>Every service adds spans with timing and metadata</li>
          <li>Service map visualizes dependencies and latency hotspots</li>
          <li>Tail-based sampling: always sample traces with errors or &gt;2s latency</li>
        </ul>
      </div>
      <div>
        <strong>Logging (CloudWatch Logs + OpenSearch):</strong>
        <ul>
          <li>Structured JSON logs: {timestamp, level, trace_id, service, message, ...}</li>
          <li>Log retention: 30 days hot (CloudWatch), 1 year cold (S3 Glacier)</li>
          <li>Correlation ID links logs across all services for a single request</li>
        </ul>
        <br/>
        <strong>SLO / SLA Targets:</strong>
        <table class="pattern-table">
          <tr class="pt-header"><td>Service</td><td>SLO (Availability)</td><td>Latency SLO</td></tr>
          <tr class="pt-row"><td class="pt-name">Search</td><td>99.9%</td><td>p99 &lt; 200ms</td></tr>
          <tr class="pt-row"><td class="pt-name">Product Detail</td><td>99.95%</td><td>p99 &lt; 300ms</td></tr>
          <tr class="pt-row"><td class="pt-name">Order Placement</td><td>99.99%</td><td>p99 &lt; 2s</td></tr>
          <tr class="pt-row"><td class="pt-name">Payment</td><td>99.99%</td><td>p99 &lt; 3s</td></tr>
          <tr class="pt-row"><td class="pt-name">Cart</td><td>99.95%</td><td>p99 &lt; 100ms</td></tr>
        </table>
        <br/>
        <strong>Alerting:</strong>
        <ul>
          <li>PagerDuty: P1 (checkout broken), P2 (search degraded), P3 (reco down)</li>
          <li>Auto-remediation: Lambda triggers scale-out on cart service error spike</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 20: Deployment Architecture -->
<div class="ref-section">
  <div class="ref-title">20. Deployment Architecture</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Multi-AZ / Multi-Region:</strong>
        <ul>
          <li>3 AZs per region (us-east-1a/b/c) — active-active within region</li>
          <li>Regions: us-east-1 (primary), eu-west-1, ap-northeast-1</li>
          <li>Route 53 latency-based routing → nearest healthy region</li>
          <li>DynamoDB Global Tables: multi-master replication across regions</li>
          <li>Aurora Global Database: primary us-east-1, read replicas EU + APAC</li>
        </ul>
        <br/>
        <strong>Kubernetes (EKS):</strong>
        <ul>
          <li>Namespaces: prod, staging, canary per service</li>
          <li>Pod Disruption Budget: min 2 pods available during deployments</li>
          <li>Node groups: on-demand (stateful) + spot (stateless)</li>
          <li>Istio service mesh for mTLS, traffic splitting, observability</li>
        </ul>
      </div>
      <div>
        <strong>Deployment Strategies:</strong>
        <ul>
          <li><strong>Blue-Green:</strong> New environment provisioned, traffic switched at load balancer. 5-min cutover. Used for major releases.</li>
          <li><strong>Canary:</strong> 1% → 5% → 25% → 100% traffic shift over 30 min. Automated rollback on error rate spike.</li>
          <li><strong>Feature Flags:</strong> LaunchDarkly — decouple deploy from release. New payment flow behind flag, % rollout to users.</li>
          <li><strong>Rolling Update:</strong> Day-to-day patch releases via Kubernetes rolling update (maxUnavailable=0, maxSurge=25%)</li>
        </ul>
        <br/>
        <strong>CI/CD Pipeline:</strong>
        <ul>
          <li>GitHub → CodeBuild (test + build) → ECR (Docker image)</li>
          <li>ArgoCD (GitOps): auto-sync to EKS on image push</li>
          <li>Integration tests run in ephemeral environments per PR</li>
          <li>Load test gate: k6 perf test must pass before prod promotion</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 21: Performance Optimisations -->
<div class="ref-section">
  <div class="ref-title">21. Performance Optimisations</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Database Optimisations:</strong>
        <ul>
          <li>Aurora: covering indexes on hot query paths (category + price + status)</li>
          <li>DynamoDB: sparse GSI for order status queries (only include ACTIVE orders)</li>
          <li>Read replicas offload 90% of product catalog reads</li>
          <li>Connection pooling: RDS Proxy (800 app connections → 50 DB connections)</li>
          <li>Prepared statements cache in Aurora JDBC driver</li>
        </ul>
        <br/>
        <strong>Application Layer:</strong>
        <ul>
          <li>GraphQL DataLoader: N+1 query elimination (batch 20 product lookups → 1 DB call)</li>
          <li>Async I/O: all external calls non-blocking (Project Reactor / CompletableFuture)</li>
          <li>Protobuf for internal service communication (50% smaller than JSON)</li>
          <li>Response compression: gzip/brotli at API Gateway level (70% bandwidth reduction)</li>
        </ul>
      </div>
      <div>
        <strong>Frontend Performance:</strong>
        <ul>
          <li>Core Web Vitals targets: LCP &lt;2.5s, FID &lt;100ms, CLS &lt;0.1</li>
          <li>Image lazy loading + responsive srcset (thumb → full on demand)</li>
          <li>Above-the-fold CSS inlined; below-the-fold deferred</li>
          <li>Service Worker: pre-cache product pages for offline browsing</li>
          <li>Prefetch product pages on hover (Speculation Rules API)</li>
        </ul>
        <br/>
        <strong>Search Optimisations:</strong>
        <ul>
          <li>Pre-aggregate popular category facets (nightly) → instant facet counts</li>
          <li>Preference cache: store last 100 queries per user in Redis for instant autocomplete</li>
          <li>Elasticsearch: 2-node coordinating cluster separate from data nodes</li>
          <li>Query result cache: popular queries cached 2 min in Elasticsearch query cache</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 22: Cost Optimisation -->
<div class="ref-section">
  <div class="ref-title">22. Cost Optimisation</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><td>Area</td><td>Strategy</td><td>Estimated Savings</td></tr>
      <tr class="pt-row"><td class="pt-name">Compute (EKS)</td><td>Spot instances for stateless pods (search, recommendation) with on-demand fallback</td><td>65–70% vs on-demand</td></tr>
      <tr class="pt-row"><td class="pt-name">Storage (S3)</td><td>Intelligent Tiering: images accessed &lt;30d → Standard; &lt;90d → IA; &lt;180d → Glacier</td><td>40% storage cost</td></tr>
      <tr class="pt-row"><td class="pt-name">DynamoDB</td><td>On-demand mode for irregular traffic; provisioned + autoscaling for predictable load</td><td>30% vs always on-demand</td></tr>
      <tr class="pt-row"><td class="pt-name">Data Transfer</td><td>CloudFront serves 95% of image traffic; S3 origin requests minimized via high cache TTL</td><td>85% of bandwidth cost</td></tr>
      <tr class="pt-row"><td class="pt-name">Elasticsearch</td><td>UltraWarm tier for indices &gt;30 days (S3-backed, 90% cheaper than hot nodes)</td><td>60% ES storage cost</td></tr>
      <tr class="pt-row"><td class="pt-name">RDS/Aurora</td><td>Aurora Serverless v2 for staging/dev environments (scales to 0 ACUs overnight)</td><td>80% non-prod DB cost</td></tr>
      <tr class="pt-row"><td class="pt-name">Lambda</td><td>ARM64 (Graviton2) for image resize Lambdas: 20% faster, 20% cheaper per GB-ms</td><td>20% Lambda cost</td></tr>
      <tr class="pt-row"><td class="pt-name">Kafka (MSK)</td><td>Tiered storage: segments older than 7d offloaded to S3 (99% cheaper than broker storage)</td><td>70% MSK storage</td></tr>
    </table>
  </div>
</div>

<!-- SECTION 23: Disaster Recovery -->
<div class="ref-section">
  <div class="ref-title">23. Disaster Recovery</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>RTO / RPO Targets:</strong>
        <table class="pattern-table">
          <tr class="pt-header"><td>Component</td><td>RTO</td><td>RPO</td></tr>
          <tr class="pt-row"><td class="pt-name">Order DB (DynamoDB)</td><td>&lt;1 min</td><td>0 (multi-region active-active)</td></tr>
          <tr class="pt-row"><td class="pt-name">Product Catalog (Aurora)</td><td>&lt;30 min</td><td>&lt;5 min (binlog)</td></tr>
          <tr class="pt-row"><td class="pt-name">Search (Elasticsearch)</td><td>&lt;2 hrs</td><td>&lt;5 min (reindex)</td></tr>
          <tr class="pt-row"><td class="pt-name">Redis (Cart/Session)</td><td>&lt;5 min</td><td>&lt;60s (RDB snapshot)</td></tr>
          <tr class="pt-row"><td class="pt-name">Full Platform</td><td>&lt;30 min</td><td>&lt;5 min</td></tr>
        </table>
        <br/>
        <strong>Backup Strategy:</strong>
        <ul>
          <li>Aurora: continuous backup + point-in-time recovery (35 days)</li>
          <li>DynamoDB: point-in-time recovery enabled, exports to S3 daily</li>
          <li>S3: versioning + cross-region replication (us-east-1 → eu-west-1)</li>
          <li>Redis: RDB snapshot every 60s to S3; AOF for durability</li>
          <li>Kafka: cross-region replication via MirrorMaker 2</li>
        </ul>
      </div>
      <div>
        <strong>Failover Runbook (AZ Failure):</strong>
        <ol>
          <li>Route 53 health checks detect AZ failure (30s TTL)</li>
          <li>ALB automatically routes to remaining AZs</li>
          <li>Aurora failover to replica in healthy AZ (&lt;30s)</li>
          <li>EKS: pods in failed AZ rescheduled to healthy AZs (topology spread constraints)</li>
          <li>DynamoDB: unaffected (multi-AZ by default)</li>
          <li>Alert on-call; validate order processing within 5 min</li>
        </ol>
        <br/>
        <strong>Region Failover (Active-Passive Warm Standby):</strong>
        <ol>
          <li>CloudWatch alarm triggers SNS → ops pager</li>
          <li>Route 53 health check fails → DNS flips to DR region (&lt;60s TTL)</li>
          <li>Aurora Global DB promote secondary (&lt;1 min)</li>
          <li>DynamoDB Global Tables already active in DR region</li>
          <li>Validate checkout flow in DR region before full cutover</li>
        </ol>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 24: Migration Strategy -->
<div class="ref-section">
  <div class="ref-title">24. Migration Strategy (Monolith to Microservices)</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Strangler Fig Pattern:</strong>
        <ol>
          <li><strong>Phase 1 (Months 1-3):</strong> Extract Search Service first (read-only, low risk). Deploy alongside monolith. Feature flag controls traffic split.</li>
          <li><strong>Phase 2 (Months 4-6):</strong> Extract Product Catalog Service. Dual-write to monolith DB + new Aurora instance during transition.</li>
          <li><strong>Phase 3 (Months 7-9):</strong> Extract Cart Service (Redis-backed). Strangler proxy routes cart calls to new service.</li>
          <li><strong>Phase 4 (Months 10-15):</strong> Extract Order + Payment Services (highest risk). Extensive shadow mode testing.</li>
          <li><strong>Phase 5 (Months 16-18):</strong> Decommission monolith DB. Data migration completed. All traffic on microservices.</li>
        </ol>
      </div>
      <div>
        <strong>Data Migration Approach:</strong>
        <ul>
          <li>Backfill tool: read from legacy Oracle DB, write to new Aurora/DynamoDB</li>
          <li>Dual-write period: writes go to both old and new DBs</li>
          <li>Comparison tool: reads from both, logs discrepancies</li>
          <li>Cutover: stop writes to old DB, verify new DB complete, switch reads</li>
          <li>Dark mode testing: run new service in parallel, compare responses</li>
        </ul>
        <br/>
        <strong>Risk Mitigation:</strong>
        <ul>
          <li>Feature flags: instant rollback to monolith if new service fails</li>
          <li>No big-bang migrations: one service extracted per quarter</li>
          <li>Contract testing (Pact): ensure API compatibility between old and new</li>
          <li>Shadow traffic: new service receives 100% of prod traffic but responses discarded (validation only)</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 25: Interview Questions & Answers -->
<div class="ref-section">
  <div class="ref-title">25. Interview Questions &amp; Answers</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><td>Question</td><td>Answer</td><td>Insight</td></tr>
      <tr class="pt-row"><td class="pt-name">How do you prevent overselling on Prime Day?</td><td>Two-phase reservation: atomic Redis DECRBY for soft reserve (fast), then Aurora optimistic lock for hard commit on payment success. Virtual queue (SQS FIFO) limits concurrent checkouts per product.</td><td>Shows you know the difference between soft/hard reservation and distributed concurrency control.</td></tr>
      <tr class="pt-row"><td class="pt-name">How is the cart durable across browser sessions?</td><td>Cart stored in Redis (HSET cart:{user_id}) with 7-day sliding TTL. Redis Cluster with AOF persistence. On Redis failure, DynamoDB is secondary persistent store. Cart merged on login (anonymous + authenticated).</td><td>Don't forget the anonymous cart merge problem on login.</td></tr>
      <tr class="pt-row"><td class="pt-name">How would you handle a flash sale for 100 units with 100,000 concurrent users?</td><td>Pre-warm Redis counter to 100. Rate limit via token bucket (Lua). Virtual queue via SQS FIFO. Atomic DECRBY — first 100 succeed, rest get out-of-stock immediately (fail-fast). No DB writes until payment confirmed.</td><td>Key insight: Redis atomic operations eliminate race conditions at the cost of durability; compensate with reconciliation.</td></tr>
      <tr class="pt-row"><td class="pt-name">How do you ensure a customer is never double-charged?</td><td>Client sends UUID Idempotency-Key. Order service checks Redis (TTL 24h). Stripe PaymentIntent is idempotent by design. DynamoDB conditional write: attribute_not_exists(PK). Circuit breaker + async fallback if payment gateway timeouts.</td><td>Layered idempotency: client key + server Redis check + DB conditional write + payment provider idempotency.</td></tr>
      <tr class="pt-row"><td class="pt-name">How does search handle 29,000 QPS?</td><td>Elasticsearch cluster with dedicated coordinating nodes. CloudFront caches popular queries (30s TTL). Autocomplete on Redis sorted sets. 120 shards across 20+ data nodes. Query timeout 200ms; degrade gracefully on timeout.</td><td>Caching is the key — most queries are the same popular terms. Show awareness of long-tail vs head queries.</td></tr>
      <tr class="pt-row"><td class="pt-name">How do you keep search index current after price changes?</td><td>Aurora CDC → Kafka (Debezium) → Elasticsearch consumer. Near-real-time (&lt;5s lag). For bulk updates (seasonal pricing), batch reindex with zero-downtime alias swap.</td><td>Debezium + Kafka is the standard CDC pattern for DB-to-search sync.</td></tr>
      <tr class="pt-row"><td class="pt-name">How do you scale to 10× traffic on Prime Day?</td><td>Predictive scaling 30 min before: Lambda triggers EKS node scale-out. DynamoDB on-demand mode. CloudFront pre-warming request. Redis cluster scale-out. SQS FIFO queue for checkout (absorbs burst). Load test at 12× baseline weekly.</td><td>Key: proactive, not reactive scaling. Pre-warm everything before the event.</td></tr>
      <tr class="pt-row"><td class="pt-name">What happens when the Payment Service is down?</td><td>Circuit breaker opens after 5/10 failures. Order queued in SQS with visibility timeout 30 min. Payment retry consumer processes when service recovers. Customer sees "Payment processing" status. If unresolved in 24h, order auto-cancelled, inventory released.</td><td>Async payment via queue is more resilient than synchronous; design idempotent payment handlers.</td></tr>
      <tr class="pt-row"><td class="pt-name">How do you design recommendations at &lt;50ms?</td><td>ML model embeddings pre-computed nightly (batch), stored in DynamoDB. At runtime: user embedding (from Redis) → kNN lookup in Elasticsearch (dense_vector). Real-time collaborative filtering for session-based context. Model served via SageMaker with provisioned concurrency.</td><td>Pre-compute offline; only do lightweight inference online.</td></tr>
      <tr class="pt-row"><td class="pt-name">How do you handle data consistency across Order, Inventory, and Payment services?</td><td>Saga (choreography): each service publishes events and listens to others. Compensating transactions on failure (release inventory if payment fails). Outbox pattern ensures event published atomically with DB write. No 2PC across services.</td><td>2PC is antipattern in microservices. Saga + outbox is the standard answer.</td></tr>
    </table>
  </div>
</div>

<!-- SECTION 26: Trade-off Summary -->
<div class="ref-section">
  <div class="ref-title">26. Trade-off Summary</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Decision</div>
        <div class="dt-yes">Chosen Approach ✓</div>
        <div class="dt-no">Alternative Considered ✗</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Cart Storage</div>
        <div class="dt-yes">Redis (in-memory, &lt;1ms, TTL auto-expiry)</div>
        <div class="dt-no">DynamoDB-only: 5-10ms, higher cost, no in-memory speed for high-frequency updates</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Order DB</div>
        <div class="dt-yes">DynamoDB (infinite scale, no hot partitions, single-table design)</div>
        <div class="dt-no">Aurora: complex joins but doesn't scale to 1B+ orders without sharding overhead</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Inventory Lock</div>
        <div class="dt-yes">Optimistic locking + Redis buffer (high throughput, no lock contention)</div>
        <div class="dt-no">Pessimistic lock (SELECT FOR UPDATE): causes deadlocks under high concurrency, not viable at scale</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Search Engine</div>
        <div class="dt-yes">Elasticsearch (proven at scale, rich query DSL, vector search)</div>
        <div class="dt-no">Solr: similar capability but smaller ecosystem; Aurora full-text: doesn't scale to 350M docs</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Distributed Transaction</div>
        <div class="dt-yes">Saga pattern + Outbox (decoupled, resilient, no 2PC)</div>
        <div class="dt-no">Two-Phase Commit: blocking, single point of failure, doesn't work across polyglot DBs</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Service Communication</div>
        <div class="dt-yes">Sync REST for reads, Kafka async for writes/events</div>
        <div class="dt-no">Full async (all Kafka): harder to debug, higher latency for user-facing reads; full sync: tight coupling, cascading failures</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Real-time Updates</div>
        <div class="dt-yes">SSE for order tracking (unidirectional, simple, HTTP/2 compatible)</div>
        <div class="dt-no">WebSocket: bidirectional overhead unnecessary for server→client only; polling: wastes bandwidth at scale</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Product DB</div>
        <div class="dt-yes">Aurora MySQL (ACID, complex joins for catalog, familiar SQL tooling)</div>
        <div class="dt-no">MongoDB: flexible schema but harder consistency guarantees; joins via application-level adds latency</div>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 27: Key Takeaways -->
<div class="ref-section">
  <div class="ref-title">27. Key Takeaways</div>
  <div class="ref-body">
    <div class="tip-box">
      <ul>
        <li><strong>Two-phase inventory reservation is non-negotiable at scale:</strong> Soft reserve in Redis (fast, atomic) + hard commit in Aurora (durable, consistent) prevents overselling without killing performance. The Redis buffer absorbs 99% of flash sale load before hitting SQL.</li>
        <li><strong>Idempotency is a first-class design concern:</strong> Every mutating operation (order creation, payment) needs client-generated idempotency keys, server-side deduplication, and exactly-once guarantees from the payment provider. Failures are expected — design every handler to be safely retried.</li>
        <li><strong>Saga + Outbox replaces 2PC in microservices:</strong> Never use distributed two-phase commit across services. Saga with compensating transactions gives eventual consistency; the Outbox pattern ensures events are published atomically with DB writes, eliminating dual-write inconsistency.</li>
        <li><strong>Cache aggressively but invalidate precisely:</strong> Redis for cart/session/inventory counters, CloudFront for images/search, Elasticsearch query cache for hot queries. Event-driven invalidation (Kafka consumer → DEL) is more scalable than time-based TTL for product data.</li>
        <li><strong>Pre-warm before predictable spikes:</strong> Prime Day traffic is not a surprise. Scale EKS, warm DynamoDB on-demand, double Redis capacity, pre-heat CloudFront — all 30 minutes before the event. Reactive auto-scaling alone cannot handle 10× in seconds.</li>
        <li><strong>Choose storage by access pattern, not familiarity:</strong> DynamoDB for orders (key-value, infinite scale), Aurora for inventory (optimistic locking, complex queries), Redis for sessions/cart (in-memory speed), Elasticsearch for search (inverted index). Polyglot persistence is correct here, not over-engineering.</li>
        <li><strong>Degrade gracefully, fail fast:</strong> When the Recommendation Service is down, show bestsellers. When Search is degraded, show category browse. Circuit breakers must be tuned per service — not default global settings. Every user-facing feature needs a tested fallback path.</li>
      </ul>
    </div>
  </div>
</div>
`;
