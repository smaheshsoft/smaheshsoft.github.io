window.Pages['sd-tinyurl'] = `
<div class="page-header">
  <div class="breadcrumb">System Design › <span>TinyURL / Bitly (URL Shortener)</span></div>
  <h1>🔗 TinyURL — URL Shortener System Design</h1>
  <p>The simplest system in this series by data-model complexity, yet one of the most latency- and availability-sensitive — nearly every request is a redirect on the critical path of someone else's page load</p>
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
      <!-- Background -->
      <rect width="900" height="420" fill="#0d1117" rx="10"/>

      <!-- Layer: Client -->
      <text x="30" y="55" font-size="11" fill="#888" font-family="monospace">CLIENT</text>
      <rect x="20" y="62" width="110" height="54" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="75" y="83" text-anchor="middle" font-size="14" fill="#e2e8f0">📱</text>
      <text x="75" y="97" text-anchor="middle" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold">Browser</text>
      <text x="75" y="109" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">/ Mobile App</text>

      <!-- Arrow: Client -> CDN -->
      <line x1="130" y1="89" x2="178" y2="89" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Layer: CDN -->
      <text x="183" y="55" font-size="11" fill="#888" font-family="monospace">CDN / CACHE</text>
      <rect x="180" y="62" width="115" height="54" rx="8" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="237" y="83" text-anchor="middle" font-size="14" fill="#e2e8f0">🌐</text>
      <text x="237" y="97" text-anchor="middle" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold">CDN Edge</text>
      <text x="237" y="109" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">CloudFront/Fastly</text>

      <!-- Arrow: CDN -> API Gateway -->
      <line x1="295" y1="89" x2="343" y2="89" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Layer: API Gateway -->
      <text x="348" y="55" font-size="11" fill="#888" font-family="monospace">API GATEWAY</text>
      <rect x="345" y="62" width="120" height="54" rx="8" fill="#1a2d20" stroke="#4ade80" stroke-width="1.5"/>
      <text x="405" y="83" text-anchor="middle" font-size="14" fill="#e2e8f0">🔀</text>
      <text x="405" y="97" text-anchor="middle" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold">API Gateway</text>
      <text x="405" y="109" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Auth / Rate Limit</text>

      <!-- Layer label: Microservices -->
      <text x="530" y="55" font-size="11" fill="#888" font-family="monospace">MICROSERVICES</text>

      <!-- Arrow: Gateway -> URL Shortener -->
      <line x1="465" y1="80" x2="518" y2="80" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <!-- Arrow: Gateway -> Redirect Svc -->
      <line x1="465" y1="89" x2="518" y2="159" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <!-- Arrow: Gateway -> Rate Limiter -->
      <line x1="465" y1="89" x2="518" y2="240" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- URL Shortener Service -->
      <rect x="520" y="62" width="140" height="54" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="590" y="83" text-anchor="middle" font-size="13" fill="#e2e8f0">⚙️</text>
      <text x="590" y="97" text-anchor="middle" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold">URL Shortener</text>
      <text x="590" y="109" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Base62 Encode</text>

      <!-- Redirect Service -->
      <rect x="520" y="140" width="140" height="54" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="590" y="161" text-anchor="middle" font-size="13" fill="#e2e8f0">↪️</text>
      <text x="590" y="175" text-anchor="middle" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold">Redirect Svc</text>
      <text x="590" y="187" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">301/302 Lookup</text>

      <!-- Rate Limiter -->
      <rect x="520" y="218" width="140" height="54" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="590" y="239" text-anchor="middle" font-size="13" fill="#e2e8f0">🚦</text>
      <text x="590" y="253" text-anchor="middle" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold">Rate Limiter</text>
      <text x="590" y="265" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Token Bucket</text>

      <!-- Analytics Service -->
      <rect x="520" y="296" width="140" height="54" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="590" y="317" text-anchor="middle" font-size="13" fill="#e2e8f0">📊</text>
      <text x="590" y="331" text-anchor="middle" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold">Analytics Svc</text>
      <text x="590" y="343" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Click Tracking</text>

      <!-- Arrow: Redirect -> Analytics -->
      <line x1="590" y1="194" x2="590" y2="294" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Layer: Data -->
      <text x="710" y="55" font-size="11" fill="#888" font-family="monospace">DATA LAYER</text>

      <!-- Arrow: URL Shortener -> Redis -->
      <line x1="660" y1="89" x2="710" y2="89" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <!-- Arrow: Redirect -> Redis -->
      <line x1="660" y1="167" x2="710" y2="105" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Redis Cache -->
      <rect x="712" y="62" width="150" height="54" rx="8" fill="#2d1a1a" stroke="#f87171" stroke-width="1.5"/>
      <text x="787" y="83" text-anchor="middle" font-size="13" fill="#e2e8f0">⚡</text>
      <text x="787" y="97" text-anchor="middle" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold">Redis Cache</text>
      <text x="787" y="109" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Hot URL mappings</text>

      <!-- Arrow: URL Shortener -> Cassandra -->
      <line x1="660" y1="100" x2="710" y2="160" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <!-- Arrow: Redis -> Cassandra (cache miss) -->
      <line x1="787" y1="116" x2="787" y2="140" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Cassandra / DynamoDB -->
      <rect x="712" y="142" width="150" height="54" rx="8" fill="#1a2040" stroke="#34d399" stroke-width="1.5"/>
      <text x="787" y="163" text-anchor="middle" font-size="13" fill="#e2e8f0">🗄️</text>
      <text x="787" y="177" text-anchor="middle" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold">Cassandra</text>
      <text x="787" y="189" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">URL mappings DB</text>

      <!-- Arrow: Analytics -> Kafka -->
      <line x1="660" y1="323" x2="710" y2="245" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Kafka -->
      <rect x="712" y="222" width="150" height="54" rx="8" fill="#2d2a1a" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="787" y="243" text-anchor="middle" font-size="13" fill="#e2e8f0">📨</text>
      <text x="787" y="257" text-anchor="middle" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold">Kafka</text>
      <text x="787" y="269" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Click event stream</text>

      <!-- Arrow: Kafka -> S3 -->
      <line x1="787" y1="276" x2="787" y2="302" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- S3 -->
      <rect x="712" y="304" width="150" height="54" rx="8" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="787" y="325" text-anchor="middle" font-size="13" fill="#e2e8f0">🪣</text>
      <text x="787" y="339" text-anchor="middle" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold">S3 Storage</text>
      <text x="787" y="351" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Analytics exports</text>

      <!-- Flow label -->
      <text x="450" y="410" text-anchor="middle" font-size="10" fill="#4b5563" font-family="monospace">Data flow: Client → CDN → Gateway → Services → Cache/DB/Queue</text>
    </svg>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">1. Executive Summary</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Problem</div>
        <p>Turn a long URL into a short, unique alias, and when anyone visits that alias, redirect them to the original URL — reliably, in single-digit milliseconds, forever (or until it expires).</p>
        <div class="ans-label" style="margin-top:12px;">Scale</div>
        <ul>
          <li>~1B short URLs created over the system's lifetime (Bitly-scale)</li>
          <li>Redirects outnumber creations by 100:1 or more</li>
          <li>A single viral link can drive tens of thousands of req/sec by itself</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Core Challenges</div>
        <ul>
          <li>Generate a globally unique short code without a coordination bottleneck</li>
          <li>Serve redirects at &lt;10ms P99 — this is a "hot path" for someone else's app</li>
          <li>Extremely read-heavy, tiny records — the entire working set should fit in cache</li>
          <li>Prevent abuse: spam, phishing, and malware links riding on your domain's reputation</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Functional Requirements</div>
        <ul>
          <li>Shorten a long URL, optionally with a custom alias</li>
          <li>Redirect short URL → original URL (301 or 302)</li>
          <li>Optional expiration date per link</li>
          <li>Click analytics: count, referrer, geo, device (basic)</li>
          <li>User accounts can manage/list/delete their links (Bitly-style, optional for MVP)</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Non-Functional Requirements</div>
        <div class="pattern-table">
          <div class="pt-row pt-header"><div>NFR</div><div>Target</div><div>Why</div><div>Approach</div></div>
          <div class="pt-row"><div class="pt-name">Redirect Latency</div><div>&lt; 10ms P99 (cache hit)</div><div>Sits on the critical path of a third-party page load</div><div>In-memory cache serves &gt;95% of reads; edge/CDN caching for the rest</div></div>
          <div class="pt-row"><div class="pt-name">Availability</div><div>99.99%</div><div>A dead redirect looks like the linking site is broken</div><div>Multi-AZ, stateless app tier, cache + DB replicas</div></div>
          <div class="pt-row"><div class="pt-name">Consistency</div><div>Eventual is fine for reads; strong only at code-creation time</div><div>Redirect target basically never changes after creation</div><div>Strong write to primary DB; async replicate/cache-populate</div></div>
          <div class="pt-row"><div class="pt-name">Durability</div><div>No data loss on committed short links</div><div>A broken link is a broken promise to every person who shared it</div><div>Replicated DB writes, backups</div></div>
        </div>
      </div>
    </div>
    <div class="tip-box" style="margin-top:10px;">✅ This is deliberately the leanest architecture in the series. Resist the urge to add microservices, Kafka, or sharding "because the other systems had them" — a good architect right-sizes the design to the actual problem, and interviewers reward that judgment.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">2. Capacity Estimation</div>
  <div class="ref-body">
    <p>Assumptions stated explicitly — interviewers score the method, not the exact digits.</p>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Metric</div><div>Assumption</div><div>Calculation</div><div>Result</div></div>
      <div class="pt-row"><div class="pt-name">New URLs/day</div><div>100M new short links created/day at scale</div><div>given</div><div>100M/day</div></div>
      <div class="pt-row"><div class="pt-name">Write QPS (avg)</div><div>100M writes spread over a day</div><div>100M / 86,400s</div><div>~1,160 writes/sec avg</div></div>
      <div class="pt-row"><div class="pt-name">Read:Write ratio</div><div>Redirects vastly outnumber creations</div><div>industry-typical 100:1 to 1000:1</div><div>assume 100:1 (conservative)</div></div>
      <div class="pt-row"><div class="pt-name">Read QPS (avg)</div><div>100:1 ratio</div><div>1,160 × 100</div><div>~116,000 redirects/sec avg</div></div>
      <div class="pt-row"><div class="pt-name">Peak QPS</div><div>3x average + viral-link spikes</div><div>116,000 × 3</div><div>~350,000 req/sec peak (plus per-link viral spikes)</div></div>
      <div class="pt-row"><div class="pt-name">Storage/record</div><div>short_code(7B) + long_url(~500B) + metadata(~100B)</div><div>~600 bytes/record</div><div>~600B/URL</div></div>
      <div class="pt-row"><div class="pt-name">Storage — 5yr total</div><div>100M/day × 365 × 5 years</div><div>182.5B URLs × 600B</div><div>~110 TB raw (before compression/indexes)</div></div>
      <div class="pt-row"><div class="pt-name">Short-code space (base62, len 6)</div><div>62 chars: [a-zA-Z0-9]</div><div>62^6</div><div>~56.8 billion codes</div></div>
      <div class="pt-row"><div class="pt-name">Short-code space (base62, len 7)</div><div>one extra character</div><div>62^7</div><div>~3.52 trillion codes</div></div>
      <div class="pt-row"><div class="pt-name">Code length needed for 5yr volume</div><div>182.5B URLs to encode uniquely</div><div>62^6 (56.8B) is too small; 62^7 (3.52T) covers it with huge headroom</div><div>7-character codes chosen</div></div>
      <div class="pt-row"><div class="pt-name">Bandwidth (redirects)</div><div>350K req/sec × ~500B response (302 + Location header)</div><div>—</div><div>~175 MB/sec peak egress (mostly absorbed by CDN)</div></div>
      <div class="pt-row"><div class="pt-name">Cache size for 95% hit rate</div><div>hot working set ≈ last 30 days of active links</div><div>100M/day × 30 × 600B</div><div>~1.8 TB — easily fits a Redis cluster</div></div>
      <div class="pt-row"><div class="pt-name">5-year growth</div><div>15% YoY link-creation growth</div><div>100M × 1.15^5</div><div>~201M new URLs/day by year 5</div></div>
    </div>
    <div class="tip-box" style="margin-top:10px;">✅ Conclusion: this is a read-dominated, storage-light workload. The entire "hard part" of capacity planning is redirect QPS and cache sizing — not database volume, which is trivially small (~110 TB over 5 years is nothing compared to Netflix/Uber-scale systems).</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">3. APIs</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Endpoint</div><div>Method</div><div>Purpose</div><div>Auth</div></div>
      <div class="pt-row"><div class="pt-name">/api/v1/shorten</div><div>POST</div><div>Create a short URL (optional custom alias, expiry)</div><div>API Key</div></div>
      <div class="pt-row"><div class="pt-name">/{shortCode}</div><div>GET</div><div>Redirect to original URL (the hot path)</div><div>None (public)</div></div>
      <div class="pt-row"><div class="pt-name">/api/v1/urls/{shortCode}</div><div>GET</div><div>Get metadata + click stats for a short URL</div><div>API Key (owner only)</div></div>
      <div class="pt-row"><div class="pt-name">/api/v1/urls/{shortCode}</div><div>DELETE</div><div>Deactivate/delete a short URL</div><div>API Key (owner only)</div></div>
      <div class="pt-row"><div class="pt-name">/api/v1/urls</div><div>GET</div><div>List URLs for the authenticated user (paginated)</div><div>API Key</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Shorten URL — Request/Response</div>
        <div class="code-box">POST /api/v1/shorten
Headers:
  Authorization: ApiKey abc123...
  Idempotency-Key: c9f2-...
  Content-Type: application/json

Request:
{
  "longUrl": "https://example.com/a/very/long/path?x=1&amp;y=2",
  "customAlias": "my-launch",   // optional
  "expiresAt": "2027-01-01T00:00:00Z"  // optional
}

Response 201:
{
  "shortUrl": "https://tiny.co/my-launch",
  "shortCode": "my-launch",
  "longUrl": "https://example.com/a/very/long/path?x=1&amp;y=2",
  "createdAt": "2026-07-04T10:00:00Z",
  "expiresAt": "2027-01-01T00:00:00Z"
}</div>
        <div class="ans-label" style="margin-top:14px;">Redirect — Request/Response</div>
        <div class="code-box">GET /my-launch HTTP/1.1
Host: tiny.co

Response 301 Moved Permanently
Location: https://example.com/a/very/long/path?x=1&amp;y=2
Cache-Control: public, max-age=86400</div>
      </div>
      <div>
        <div class="ans-label">API Design Standards</div>
        <ul>
          <li><strong>Status codes:</strong> 201 created, 301/302 redirect, 400 bad request (invalid URL), 401 unauthorized, 404 not found (unknown code), 409 conflict (alias taken), 410 gone (expired), 429 rate limited</li>
          <li><strong>301 vs 302:</strong> 302 (temporary) is usually preferred in practice even for "permanent" shortlinks — it keeps every redirect hitting your server (accurate click analytics); 301 lets browsers cache it and you lose visibility on repeat clicks</li>
          <li><strong>Auth:</strong> API key for the shorten/management API; the redirect endpoint itself is intentionally unauthenticated — it must work for anonymous clicks from anywhere</li>
          <li><strong>Pagination:</strong> cursor-based on <code>GET /api/v1/urls</code> (<code>?cursor=abc&amp;limit=50</code>)</li>
          <li><strong>Rate limiting:</strong> token bucket per API key on <code>/shorten</code> (e.g. 100 req/min) — the #1 abuse vector is bulk spam-link generation</li>
          <li><strong>Versioning:</strong> URI versioning (<code>/api/v1/</code>) with a long deprecation window since third-party integrations depend on it</li>
          <li><strong>Idempotency:</strong> Idempotency-Key on POST /shorten avoids creating duplicate codes for the same long URL on client retry</li>
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
      <div class="pt-row"><div class="pt-name">DynamoDB / Cosmos DB (URL Mapping)</div><div>short_code → long_url mapping</div><div>Pure key-value access pattern by short_code; no joins, no complex queries — a perfect fit, avoids relational overhead entirely</div><div>Partition key: short_code (hash-distributes evenly since codes are random-looking base62)</div></div>
      <div class="pt-row"><div class="pt-name">PostgreSQL (User &amp; Account DB)</div><div>User accounts, API keys, ownership of links</div><div>Relational integrity useful here — a user owns many URLs, needs joins for dashboards</div><div>PK: user_id; FK: url.owner_id; Index: (owner_id, created_at)</div></div>
      <div class="pt-row"><div class="pt-name">Redis (Hot Cache)</div><div>short_code → long_url for the hottest/most-recent links</div><div>Sub-ms reads; &gt;95% of redirect traffic should never touch the DB</div><div>Simple GET/SET by short_code key; TTL-based eviction</div></div>
      <div class="pt-row"><div class="pt-name">Cassandra / Kafka+OLAP sink (Analytics)</div><div>Per-click events: timestamp, referrer, geo, device, short_code</div><div>Write-heavy, append-only, time-series — analytics reads are aggregated, not per-row</div><div>Partition key: short_code; Clustering key: click_timestamp</div></div>
    </div>
    <div class="code-box" style="margin-top:12px;">// URL Mapping (DynamoDB / Cosmos DB — the core table)
{
  "shortCode":  "aZ9kLp2",       // Partition Key
  "longUrl":    "https://example.com/...",
  "ownerId":    "user_8831",     // nullable for anonymous links
  "createdAt":  "2026-07-04T10:00:00Z",
  "expiresAt":  "2027-01-01T00:00:00Z",  // nullable = never expires
  "isCustomAlias": false,
  "status":     "ACTIVE"          // ACTIVE | EXPIRED | DISABLED (flagged/abuse)
}
// Access pattern is 100% point-lookup by shortCode -- no secondary index needed
// on the hot path. A GSI on ownerId supports the "list my URLs" dashboard query.

-- Users table (PostgreSQL)
CREATE TABLE users (
  user_id     UUID PRIMARY KEY,
  email       VARCHAR(255) UNIQUE NOT NULL,
  api_key_hash VARCHAR(128) NOT NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT now()
);</div>
    <div class="tip-box" style="margin-top:10px;">✅ Why NoSQL/KV for the core mapping: the access pattern is exclusively "get long_url by short_code" — no range queries, no joins, no transactions across records. A relational DB would work too at small scale, but a KV store scales this specific pattern near-linearly with zero schema-migration pain.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">5. High-Level Architecture</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step blue">Client (browser / app / social platform unfurling a link)</div>
      <div class="flow-arrow">↓ DNS</div>
      <div class="flow-step">CDN / Edge (caches redirects for popular short codes)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Load Balancer</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Application Servers (stateless: Shorten API + Redirect Service)</div>
      <div class="flow-arrow">↓ cache-aside read</div>
      <div class="flow-step green">Redis Cache (short_code → long_url)</div>
      <div class="flow-arrow">↓ on cache miss</div>
      <div class="flow-step">DynamoDB / Cosmos DB (URL Mapping — source of truth)</div>
      <div class="flow-arrow">↓ async, off the hot path</div>
      <div class="flow-step">Click Event Queue → Analytics Pipeline → Analytics Store</div>
      <div class="flow-arrow">↓ observability</div>
      <div class="flow-step">Monitoring / Alerting</div>
    </div>
    <p style="margin-top:12px;">That's the whole system. Compare this to Uber or Netflix: there's no geospatial index, no video pipeline, no complex state machine — just a very fast, very cache-heavy key-value lookup with an analytics side-channel. Honesty about this simplicity is itself a signal of seniority in an interview.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">6. Detailed Component Design</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Responsibility</div><div>Key Design Point</div><div>Scaling Model</div></div>
      <div class="pt-row"><div class="pt-name">URL Shortening Service</div><div>Generates a unique short code and persists the mapping</div><div>Counter+base62 (or pre-generated key pool) avoids collision-retry loops under load</div><div>Stateless; the counter/key-pool is the only shared state, kept outside the app tier</div></div>
      <div class="pt-row"><div class="pt-name">Redirect Service</div><div>Look up short_code, return 301/302 with Location header</div><div>The hottest, highest-QPS path in the whole system — cache-first, DB is the fallback only</div><div>Stateless, scales horizontally behind the LB; this is where 99% of capacity goes</div></div>
      <div class="pt-row"><div class="pt-name">Analytics Service</div><div>Records click events (async) and serves aggregated stats</div><div>Never blocks the redirect — click is fired-and-forgotten to a queue, redirect returns immediately</div><div>Consumer group scales independently of redirect traffic</div></div>
      <div class="pt-row"><div class="pt-name">Custom-Alias Service</div><div>Validates &amp; reserves user-requested aliases (e.g. tiny.co/my-launch)</div><div>Atomic conditional-write ("insert if not exists") on short_code to prevent two users claiming the same alias</div><div>Stateless; relies on the DB's conditional-write guarantee, not app-level locking</div></div>
      <div class="pt-row"><div class="pt-name">Expiration / Cleanup Service</div><div>Marks expired links inactive, purges old analytics data per retention policy</div><div>Background batch job, not on any request path — TTL field checked lazily on read plus a periodic sweep</div><div>Low QPS, runs as a scheduled job, not a scaled service</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">7. Sequence Diagrams</div>
  <div class="ref-body">
    <div class="ans-label">Happy Path — Shortening a URL</div>
    <div class="code-box">Client    API-GW    ShorteningService    KeyGen    DynamoDB
  |--POST /shorten-->|                  |            |          |
  |                   |--generateCode()->|            |          |
  |                   |                  |--nextKey-->|          |
  |                   |                  |<--"aZ9kLp2"|          |
  |                   |<--code-----------|            |          |
  |                   |--putItem(code, longUrl)------------------>|
  |                   |<--ack--------------------------------------|
  |<--201 shortUrl----|                  |            |          |</div>

    <div class="ans-label" style="margin-top:14px;">Failure Path — Custom Alias Already Taken</div>
    <div class="code-box">Client    API-GW    ShorteningService    DynamoDB
  |--POST /shorten { customAlias: "sale" } -->|
  |                   |--putItem(IF NOT EXISTS "sale")----------->|
  |                   |<--ConditionalCheckFailed-------------------|
  |                   |--(no retry with new code -- it's a CUSTOM alias, not auto-generated)
  |<--409 Conflict "alias already taken"------|</div>

    <div class="ans-label" style="margin-top:14px;">Retry — Redirect Service Cache Miss Under Transient DB Blip</div>
    <div class="code-box">Client    RedirectService    Redis      DynamoDB
  |--GET /aZ9kLp2-->|                 |            |
  |                  |--GET aZ9kLp2--->|            |
  |                  |<--MISS----------|            |
  |                  |--getItem(aZ9kLp2)------------>|
  |                  |            [DynamoDB throttled -- ProvisionedThroughputExceeded]
  |                  |--retry (backoff 50ms)--------->|
  |                  |<--longUrl----------------------|
  |                  |--SET aZ9kLp2 (cache-fill)------>|
  |<--301 Location---|                 |            |</div>

    <div class="ans-label" style="margin-top:14px;">Timeout — Analytics Ingestion Lags, Redirect Unaffected</div>
    <div class="code-box">Client    RedirectService    ClickQueue
  |--GET /aZ9kLp2-->|                 |
  |                  |--301 Location returned to client IMMEDIATELY
  |<--301------------|                 |
  |                  |--publish(clickEvent) [fire-and-forget, 200ms timeout]--->|
  |                  |            [queue slow / timeout]
  |                  |--drop &amp; increment local metric "analytics_publish_failed"
  |                  |     (never blocks or delays the redirect response)</div>
    <div class="tip-box" style="margin-top:10px;">✅ The single most important architectural rule here: analytics tracking must NEVER be on the synchronous path of a redirect. A slow analytics pipeline should degrade reporting accuracy, never redirect latency.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">8. Database Scaling</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Partitioning</div>
        <p><strong>Partition key: short_code.</strong> Because generated codes are effectively random (base62 of a monotonic counter, or hashed), they distribute evenly across partitions with no hot-partition risk under normal usage — the only exception is a single viral code, handled by caching (Section 9), not by DB partitioning tricks.</p>
        <div class="ans-label" style="margin-top:12px;">Read Replicas</div>
        <p>DynamoDB/Cosmos DB handle replication natively (multi-AZ, optionally multi-region with read replicas for global low-latency reads) — no manual replica management needed, unlike a self-hosted relational cluster.</p>
      </div>
      <div>
        <div class="ans-label">Why This Rarely Needs More</div>
        <p>Given ~110 TB over 5 years and a pure key-value access pattern, this system almost never needs custom sharding logic, CQRS, or event sourcing — the managed NoSQL store's built-in partitioning already solves the scaling problem. Adding those patterns here would be solving a problem that doesn't exist.</p>
        <div class="ans-label" style="margin-top:12px;">When It Would Change</div>
        <p>If analytics needs grow into heavy OLAP (cohort analysis, funnel reports), that workload should move to a dedicated warehouse (e.g. Snowflake/BigQuery-style) fed by the click-event stream — kept entirely separate from the OLTP mapping table.</p>
      </div>
    </div>
    <div class="warn-box" style="margin-top:12px;">⚠️ Resist the interview trap of over-engineering this section. The honest, senior answer is "replication + a managed partitioned KV store is sufficient; here's the one thing (viral hot-key caching) that actually needs special handling."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">9. Cache Strategy</div>
  <div class="ref-body">
    <p>This is the single most important section for TinyURL. Nearly all redirect traffic should be served from cache — the DB exists mainly as the durable source of truth and the fallback for cold/rare codes.</p>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Cache</div><div>Pattern</div><div>TTL</div><div>Why</div></div>
      <div class="pt-row"><div class="pt-name">short_code → long_url</div><div>Cache-aside (read); write-through on creation</div><div>24h sliding, refreshed on access</div><div>Mapping never changes after creation, so staleness risk is near zero — safe to cache aggressively</div></div>
      <div class="pt-row"><div class="pt-name">Custom alias existence check</div><div>Cache-aside (negative caching too)</div><div>5 min</div><div>Avoids hammering the DB during alias-availability checks on the shorten form</div></div>
      <div class="pt-row"><div class="pt-name">CDN edge cache (redirect response)</div><div>Read-through at the edge</div><div>1h (respects Cache-Control header)</div><div>Popular links get served from edge PoPs, never reaching origin at all</div></div>
      <div class="pt-row"><div class="pt-name">Click counters (approximate)</div><div>Write-back (batched flush to durable store)</div><div>flush every 10s</div><div>Exact real-time counts aren't needed; batching avoids a write per click</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Hot Key Problem (Viral Link)</div>
        <p>A single short code going viral (e.g. shared in a mass tweet) can pin one Redis key to tens of thousands of req/sec on one shard. Mitigation: local (in-process) L1 cache on each app server for the top-N hottest keys, so the viral key's reads never even leave the app server to hit Redis — an L1/L2 tiered cache.</p>
      </div>
      <div>
        <div class="ans-label">Cache Stampede / Cold Start Prevention</div>
        <p>On a cache miss for a suddenly-popular code (e.g. right after cache eviction or a deploy), use a short-lived distributed lock (<code>SET NX PX</code>) so only one request repopulates the cache while others either wait briefly or read a stale-but-present value — classic "cache-aside + single-flight" pattern.</p>
      </div>
    </div>
    <div class="tip-box" style="margin-top:10px;">✅ Target: &gt;95% cache hit rate on the redirect path. If an interviewer asks "what's your bottleneck," the honest answer for this system is almost always "cache hit rate and Redis cluster capacity," not the database.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">10. Messaging</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Broker</div><div>Used For</div><div>Why This One</div></div>
      <div class="pt-row"><div class="pt-name">Kafka (or a simpler SQS/Service Bus queue at smaller scale)</div><div>Async click-event ingestion for analytics</div><div>Absorbs bursty click volume without back-pressuring the redirect path; replay capability useful for reprocessing analytics</div></div>
    </div>
    <p style="margin-top:10px;">Messaging plays a much smaller role here than in the other systems in this series — it exists purely for the analytics side-channel, not for any core redirect or shortening logic.</p>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Delivery Guarantees</div>
        <ul>
          <li><strong>Click events:</strong> at-least-once, with idempotent/dedupable consumers (dedupe key = request_id) — losing an occasional click event is an acceptable trade for never slowing down a redirect</li>
          <li><strong>Ordering:</strong> not required — click counts are commutative aggregates, order doesn't matter</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Retry / DLQ / Poison Queue</div>
        <p>Click-event publish failures are logged and dropped rather than retried synchronously (see Section 7's Timeout diagram). Consumer-side processing failures get 3 retries with backoff, then route to a DLQ; malformed events go straight to the DLQ without retry. DLQ depth alerts are low-priority (does not page on-call) since analytics is non-critical-path.</p>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">11. Storage</div>
  <div class="ref-body">
    <ul>
      <li><strong>Blob/Object Storage:</strong> minimal need — at most, a small object store for exported analytics reports (CSV) requested by users; no user-generated media in this system at all</li>
      <li><strong>CDN:</strong> the main "storage-adjacent" component that matters — it caches redirect responses at the edge, meaning a huge share of traffic for popular links never reaches an origin server</li>
      <li><strong>No image/video pipeline</strong> is needed anywhere in this system</li>
    </ul>
    <div class="tip-box" style="margin-top:10px;">✅ This section stays intentionally almost empty compared to a media-heavy app like Instagram or Netflix — correctly recognizing "we barely need this component" is itself the right architectural call, not a gap in the design.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">12. Search</div>
  <div class="ref-body">
    <p>There is no end-user search feature — nobody "searches" for a short URL, they either have it or they don't. Search only matters for <strong>internal tooling</strong>: an admin dashboard for support/abuse teams to look up a short code's owner, creation time, and click history, and an analytics dashboard for users to filter their own links.</p>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Feature</div><div>Approach</div></div>
      <div class="pt-row"><div class="pt-name">Admin lookup by short_code</div><div>Direct point-lookup on the mapping table (already indexed by design)</div></div>
      <div class="pt-row"><div class="pt-name">User's link list filter/search</div><div>Simple SQL/NoSQL filter on owner_id + substring match on long_url; Elasticsearch only justified at very large per-user link counts</div></div>
      <div class="pt-row"><div class="pt-name">Abuse/fraud review</div><div>Lightweight search over flagged domains/patterns, typically a small Elasticsearch index fed by the abuse-detection pipeline</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">13. Scalability</div>
  <div class="ref-body">
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">H</div><div class="principle-name">Horizontal Scaling</div><p>Redirect Service and Shortening Service are fully stateless — scale by adding identical instances behind the load balancer.</p></div>
      <div class="principle-card"><div class="principle-icon">S</div><div class="principle-name">Stateless Services</div><p>No session affinity anywhere; any instance can serve any request, which makes rolling deploys and auto-scaling trivial.</p></div>
      <div class="principle-card"><div class="principle-icon">A</div><div class="principle-name">Auto-Scaling</div><p>Redirect Service auto-scales on request rate / CPU; traffic is generally smoother than a rideshare app but still spikes hard on viral links.</p></div>
      <div class="principle-card"><div class="principle-icon">B</div><div class="principle-name">Backpressure</div><p>Click-analytics queue applies backpressure via consumer lag, never the redirect path itself — the redirect must always win resource contention.</p></div>
      <div class="principle-card"><div class="principle-icon">R</div><div class="principle-name">Abuse Rate Limiting</div><p>Aggressive per-API-key and per-IP throttling on <code>/shorten</code> — this endpoint is the #1 target for spam/phishing link farms.</p></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">14. Reliability</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Pattern</div><div>Applied To</div><div>Behavior</div></div>
      <div class="pt-row"><div class="pt-name">Circuit Breaker</div><div>Redirect Service → DynamoDB (on cache miss)</div><div>Opens after repeated DB errors; serves a graceful "link temporarily unavailable" page rather than hanging</div></div>
      <div class="pt-row"><div class="pt-name">Retry</div><div>Redirect Service → DB fallback reads</div><div>1-2 retries, short backoff — redirect latency budget is too tight for long retry chains</div></div>
      <div class="pt-row"><div class="pt-name">Bulkhead</div><div>Analytics ingestion isolated from redirect-serving thread/connection pools</div><div>A slow analytics queue can never starve redirect-serving capacity</div></div>
      <div class="pt-row"><div class="pt-name">Timeout</div><div>Click-event publish (Section 7)</div><div>200ms hard timeout; fire-and-forget, never blocks the redirect response</div></div>
      <div class="pt-row"><div class="pt-name">Idempotency</div><div>POST /shorten</div><div>Idempotency-Key prevents duplicate short codes for the same long URL on client retry</div></div>
      <div class="pt-row"><div class="pt-name">Graceful Degradation</div><div>Analytics pipeline fully down</div><div>Redirects continue working perfectly; only click counts/reporting lag or gap</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">15. Security</div>
  <div class="ref-body">
    <ul>
      <li><strong>AuthN:</strong> API keys for the shorten/management API (simple, sufficient for this workload); OAuth2 only needed if third-party apps integrate on a user's behalf</li>
      <li><strong>AuthZ:</strong> Owner-only access to manage/delete a link; RBAC for internal admin/abuse-review tools</li>
      <li><strong>Encryption:</strong> TLS everywhere in transit; encryption at rest for the user/account DB (email, API key hashes)</li>
      <li><strong>Secrets:</strong> API key hashes only (never store raw keys); DB credentials in a secrets manager, never in code/config</li>
      <li><strong>Malicious URL Detection:</strong> a real, TinyURL-specific concern — check submitted long URLs against Google Safe Browsing / phishing-domain blocklists at creation time, and re-scan periodically since a legitimate site can be compromised after the link was created</li>
      <li><strong>Abuse Prevention:</strong> rate limiting + CAPTCHA on anonymous shorten requests; automatic disabling of links reported as spam/phishing pending review</li>
      <li><strong>OWASP:</strong> validate/sanitize the long_url input (reject javascript: URIs, enforce scheme allowlist http/https) to prevent open-redirect and XSS-via-redirect abuse</li>
      <li><strong>DDoS Protection:</strong> WAF/CDN edge layer absorbs volumetric attacks before they reach the API tier — critical since the redirect endpoint is unauthenticated and public by design</li>
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
          <li>Redirect latency P50/P95/P99 (the north-star metric)</li>
          <li>Cache hit rate on the redirect path (target &gt;95%)</li>
          <li>Shorten API error rate &amp; latency</li>
          <li>Click-analytics queue consumer lag</li>
          <li>Rate-limit rejection rate (abuse signal)</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Stack</div>
        <ul>
          <li><strong>Metrics:</strong> Prometheus + Grafana (or Application Insights)</li>
          <li><strong>Tracing:</strong> OpenTelemetry across Redirect Service → Cache → DB fallback</li>
          <li><strong>Logging:</strong> structured logs, sampled aggressively on the redirect path given its volume</li>
          <li><strong>Alerts:</strong> paging on redirect P99 breach or cache hit-rate collapse; non-paging ticket on analytics lag</li>
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
      <div class="pt-row"><div class="pt-name">Redirect / Shorten Compute</div><div>Azure Functions (serverless, ideal for this bursty-but-simple workload) or AKS if consistent very high QPS justifies always-on pods</div></div>
      <div class="pt-row"><div class="pt-name">Hot Cache</div><div>Azure Cache for Redis</div></div>
      <div class="pt-row"><div class="pt-name">URL Mapping Store</div><div>Azure Cosmos DB (key-value / table API)</div></div>
      <div class="pt-row"><div class="pt-name">User/Account DB</div><div>Azure Database for PostgreSQL</div></div>
      <div class="pt-row"><div class="pt-name">Click Event Streaming</div><div>Azure Event Hubs</div></div>
      <div class="pt-row"><div class="pt-name">Analytics Store</div><div>Cosmos DB or Azure Data Explorer for aggregated click analytics</div></div>
      <div class="pt-row"><div class="pt-name">Report Exports</div><div>Azure Blob Storage</div></div>
      <div class="pt-row"><div class="pt-name">Monitoring</div><div>Application Insights + Azure Monitor</div></div>
      <div class="pt-row"><div class="pt-name">Secrets</div><div>Azure Key Vault</div></div>
      <div class="pt-row"><div class="pt-name">WAF/DDoS</div><div>Azure Front Door WAF + Azure DDoS Protection</div></div>
    </div>
    <div class="tip-box" style="margin-top:10px;">✅ This is the rare system where "serverless-first" (Azure Functions) is a genuinely strong answer, not just a buzzword — the workload is stateless, bursty, and simple enough that you may not need always-on containers at all until you're at very large scale.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">18. Kubernetes Deployment</div>
  <div class="ref-body">
    <div class="code-box">Deployment: redirect-service
  replicas: 12 (per region cluster)
  HPA: target CPU 50%, min 6 / max 60 pods
  readinessProbe: /healthz (checks Redis connectivity)
  resources: requests { cpu: 250m, memory: 128Mi }  // deliberately tiny per-pod footprint

ConfigMap: redirect-config
  - CACHE_TTL_SECONDS=86400
  - DB_FALLBACK_TIMEOUT_MS=150
  - REDIRECT_STATUS_CODE=302

Secret: redirect-secrets
  - REDIS_CONNECTION_STRING
  - COSMOSDB_CONNECTION_STRING

Ingress: shortlink-ingress
  - routes /{shortCode} -> redirect-service
  - routes /api/v1/*    -> shorten-api-service
  - TLS termination at ingress

Service: redirect-service (ClusterIP) fronts the ReplicaSet
  managed via a Deployment object for rolling updates</div>
    <div class="tip-box" style="margin-top:10px;">✅ Notice how small the resource requests are per pod — this is one of the cheapest services per-replica in the whole series, so scaling out wide (many small pods) is more cost-effective than scaling a few large ones.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">19. Failure Scenarios</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Failure</div><div>Impact</div><div>Recovery</div></div>
      <div class="pt-row"><div class="pt-name">Primary DB (URL mapping store) down</div><div>Cache misses fail — new/cold links unreachable; cached links keep working</div><div>Automatic failover to replica; circuit breaker returns a friendly error page for uncached misses during the outage</div></div>
      <div class="pt-row"><div class="pt-name">Redis/cache cluster down</div><div>Every redirect falls through to the DB — massive load spike, likely cascading failure</div><div>Failover to Redis replica (Sentinel/Cluster); rate-limit/shed load at the app tier to protect the DB while cache rebuilds; this is the single highest-impact failure in the whole system</div></div>
      <div class="pt-row"><div class="pt-name">Click-analytics queue (Kafka) down</div><div>Click tracking pauses; redirects unaffected</div><div>Producers drop events past a short buffer (analytics is best-effort by design); replay from source not required since click data isn't reconstructible anyway</div></div>
      <div class="pt-row"><div class="pt-name">Shorten API failure</div><div>New link creation blocked; existing links still redirect fine</div><div>Stateless retries by client; queue-and-retry pattern for bulk-creation API consumers</div></div>
      <div class="pt-row"><div class="pt-name">Region-wide outage</div><div>All traffic in that region affected</div><div>GeoDNS/Front Door fails over to nearest healthy region; URL mapping store replicated cross-region (read-heavy workload tolerates this well)</div></div>
      <div class="pt-row"><div class="pt-name">CDN failure</div><div>Popular links lose edge caching, more load hits origin</div><div>Multi-CDN fallback or direct-to-origin fallback; origin is sized to absorb a temporary CDN outage given how cheap this workload is to over-provision</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">20. Cost Optimization</div>
  <div class="ref-body">
    <p>This should be one of the <strong>cheapest systems to run in the entire series</strong> — tiny records, no media, no ML, no geospatial compute, and a workload that compresses beautifully into cache.</p>
    <ul>
      <li><strong>Serverless-first:</strong> Azure Functions / Lambda-equivalent for both shorten and redirect paths means you pay per-invocation, not for idle capacity — a strong fit given genuinely bursty, low-compute-per-request traffic</li>
      <li><strong>Reserved capacity:</strong> only worth it once traffic is high and steady enough to justify always-on AKS pods over serverless</li>
      <li><strong>Aggressive caching:</strong> &gt;95% cache hit rate means the DB tier can be provisioned far smaller than raw QPS would suggest</li>
      <li><strong>CDN edge caching:</strong> offloads a large share of redirect traffic away from origin compute entirely — directly reduces compute bill</li>
      <li><strong>Storage tiering:</strong> raw click-event data moves from hot (queue/recent) to cold/archive after 30-90 days; only aggregated rollups are kept long-term</li>
      <li><strong>Compression:</strong> minimal impact here given how small each record already is — not a meaningful lever for this system, unlike media-heavy systems</li>
    </ul>
    <div class="tip-box" style="margin-top:10px;">✅ A good interview answer explicitly says "I would NOT spend engineering effort on cost optimization here beyond caching + serverless — the infra cost per user is already close to negligible, and it's not where complexity or risk lives in this system."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">21. Trade-offs</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Decision</div><div>Chosen</div><div>Rejected Alternative &amp; Why</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Short-code generation</div><div>Monotonic counter (via key-generation service or distributed ID) + base62 encode</div><div>MD5/SHA hash of long URL, truncated — simpler to implement but requires a collision-check-and-retry loop on every write, and identical URLs collide to the same code (sometimes undesired if two users want separate codes)</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Redirect status code</div><div>302 (temporary) by default</div><div>301 (permanent) — cacheable by the browser, which breaks click-analytics accuracy since the browser stops re-hitting your server on repeat visits</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Core mapping store</div><div>NoSQL/KV (DynamoDB/Cosmos DB)</div><div>Relational DB — would work fine too at moderate scale, but adds schema rigidity and join capability the access pattern never uses</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Click tracking path</div><div>Async, fire-and-forget via queue</div><div>Synchronous write on the redirect path — simpler code, but directly couples redirect latency/availability to the analytics pipeline's health, which is unacceptable</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Custom alias uniqueness</div><div>Atomic conditional write ("put if not exists")</div><div>Read-then-write check in app code — race condition window lets two concurrent requests both "succeed" in claiming the same alias</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Compute model</div><div>Serverless (Functions) for both APIs</div><div>Always-on Kubernetes pods — more control and lower per-request cost at very high sustained QPS, but wasteful for a workload with natural idle periods and unpredictable per-link spikes</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">22. Interview Questions (30)</div>
  <div class="ref-body">
    <ol>
      <li>How would you generate unique short codes at scale without a single point of contention?</li>
      <li>Compare counter+base62 encoding vs hashing the long URL for short-code generation.</li>
      <li>How do you handle a hash collision if you choose the hashing approach?</li>
      <li>How would you support custom aliases without race conditions on concurrent claims?</li>
      <li>Why might you choose base62 over base64 for encoding?</li>
      <li>How many characters do you need for a short code to support 10 billion URLs, and how did you calculate it?</li>
      <li>Design the cache layer so that &gt;95% of redirects never touch the database.</li>
      <li>What happens when a single short link goes viral and gets 50,000 req/sec?</li>
      <li>Should a redirect return HTTP 301 or 302, and why does it matter for analytics?</li>
      <li>How would you track click analytics without slowing down the redirect path?</li>
      <li>How do you prevent someone from bulk-generating spam short links?</li>
      <li>Design the expiration mechanism for links with a TTL.</li>
      <li>How would you detect and block phishing/malware URLs at creation time?</li>
      <li>Walk through what happens end-to-end when a user clicks a short link.</li>
      <li>How would you scale the shortening service to 10,000 creations/sec if a single counter becomes a bottleneck?</li>
      <li>What's your strategy for pre-generating and distributing key ranges to multiple app servers?</li>
      <li>How would you migrate all existing short codes to a longer code length without downtime?</li>
      <li>Why is this system's database so much smaller than, say, a social network's, and how does that change your design choices?</li>
      <li>How would you support case-sensitive vs case-insensitive short codes, and what's the trade-off?</li>
      <li>Design a rate limiter for the /shorten endpoint that's fair across API keys.</li>
      <li>What happens if two users submit the exact same long URL — same short code or different?</li>
      <li>How would you build a "custom domain" feature (e.g. brand.ly instead of tiny.co)?</li>
      <li>How would you architect this to serve global users with low redirect latency everywhere?</li>
      <li>What's the failure mode if your cache cluster goes down entirely during peak traffic?</li>
      <li>How would you redesign this system if 90% of traffic suddenly needed QR-code generation too?</li>
      <li>Explain why event sourcing or CQRS is probably overkill for this system.</li>
      <li>How do you keep the redirect service stateless while still rate-limiting per client IP?</li>
      <li>Design a soft-delete / "disable link" feature that doesn't break existing cached responses.</li>
      <li>How would you add analytics dashboards (clicks over time, geography, referrers) without impacting the OLTP path?</li>
      <li>If you had to build this in a weekend, what would you cut, and what would you never cut?</li>
    </ol>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">23. Follow-up Questions</div>
  <div class="ref-body">
    <ul>
      <li>"You said base62 counter — what happens when two app servers hand out the same counter value?"</li>
      <li>"Your cache hit rate assumption is 95% — what's the actual cost/behavior of the other 5%?"</li>
      <li>"How would your design change if long URLs needed to be editable after creation?"</li>
      <li>"What if a customer wants a guarantee that a short link NEVER breaks, even 10 years later?"</li>
      <li>"You dropped click events on queue failure — walk me through why that's an acceptable trade-off here but wouldn't be for a payments system."</li>
    </ul>
    <div class="tip-box" style="margin-top:10px;">✅ For a "simple" system like this, interviewers often probe whether you can justify *not* adding complexity just as rigorously as you'd justify adding it elsewhere.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">24. Real World Technologies</div>
  <div class="ref-body">
    <p><strong>TinyURL</strong> (one of the earliest, since 2002) and <strong>Bitly</strong> (the most widely known modern implementation, handling billions of links with rich analytics) are the canonical real-world examples. Social platforms (<strong>Twitter/X's t.co</strong>, <strong>YouTube's youtu.be</strong>) run purpose-built internal shorteners at massive scale for the exact same reasons: branding, click tracking, and character-limit constraints. This is also, by wide consensus, one of the most commonly asked <strong>first system design interview questions</strong> at any seniority level — precisely because its simple requirements let an interviewer cleanly evaluate whether a candidate over-engineers, under-engineers, or right-sizes the solution.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">25. Design Evolution by Scale</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Scale</div><div>Architecture</div></div>
      <div class="pt-row"><div class="pt-name">1K users</div><div>Single server, one SQL database, short code generated with an in-process auto-increment ID + base62 encode</div></div>
      <div class="pt-row"><div class="pt-name">100K users</div><div>Add a cache (Redis) in front of the DB; separate read/write DB connections; still a single region</div></div>
      <div class="pt-row"><div class="pt-name">1M users</div><div>Move to a managed NoSQL store for the mapping table; introduce async click-analytics via a queue; CDN in front of redirects</div></div>
      <div class="pt-row"><div class="pt-name">10M users</div><div>Distributed key-generation service (pre-allocated counter ranges per node) to remove the single-counter bottleneck; multi-AZ deployment</div></div>
      <div class="pt-row"><div class="pt-name">100M users</div><div>Multi-region active-active with cross-region replication of the mapping store; global CDN edge caching absorbs the vast majority of redirect traffic</div></div>
      <div class="pt-row"><div class="pt-name">1B users</div><div>Still architecturally similar — mostly wider caching tiers, more edge PoPs, and per-region key-space partitioning; notably, this system never needs the deep complexity (ML ranking, geospatial indexing, video pipelines) that other systems in this series require at the same user scale</div></div>
    </div>
    <div class="tip-box" style="margin-top:10px;">✅ The most important insight in this whole section: a genuinely simple, well-cached architecture scales to hundreds of millions of users with only incremental changes — this system never needs the deep complexity other systems in this series require at similar scale.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">26. Final Architecture Diagram</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step blue">Browser / App / Bot (unfurling links)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">GeoDNS → nearest region</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">WAF / DDoS Protection → CDN Edge (caches hot redirects)</div>
      <div class="flow-arrow">↓ on cache miss at edge</div>
      <div class="flow-step">API Gateway (auth for /api/*, rate limiting on /shorten)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Load Balancer</div>
      <div class="flow-arrow">↓ fan-out to stateless services</div>
      <div class="flow-step green">Redirect Service</div>
      <div class="flow-step green">Shortening Service</div>
      <div class="flow-step green">Custom-Alias Service</div>
      <div class="flow-arrow">↓ cache-aside</div>
      <div class="flow-step">Redis Cluster (L2) + per-instance local L1 cache for hot/viral keys</div>
      <div class="flow-arrow">↓ on cache miss</div>
      <div class="flow-step">DynamoDB / Cosmos DB (URL Mapping, multi-region replicated) · PostgreSQL (Users/API Keys)</div>
      <div class="flow-arrow">↓ async, off critical path</div>
      <div class="flow-step">Click Event Queue → Analytics Pipeline → Analytics Store → Dashboards</div>
      <div class="flow-arrow">↓ background, scheduled</div>
      <div class="flow-step">Expiration/Cleanup Job · Malicious-URL Rescan Job</div>
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
          <li>The redirect path is a pure cache-serving problem — design it like one, and 95%+ of the system's difficulty disappears</li>
          <li>Short-code generation is the one genuinely interesting design decision; everything else is standard web-scale plumbing</li>
          <li>Knowing what NOT to build (event sourcing, CQRS, geospatial indexing, video pipelines) is as much a signal of seniority as knowing what to build</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Pros of This Design</div>
        <ul><li>Extremely cheap to run relative to almost any other system in this series</li><li>Simple enough to reason about and operate with a small team</li><li>Scales to hundreds of millions of users with only incremental architecture changes</li></ul>
      </div>
      <div>
        <div class="ans-label">Cons / Open Risks</div>
        <ul><li>Almost the entire system's resilience rests on the cache layer — a cache outage is disproportionately painful for a "simple" system</li><li>Abuse (spam/phishing links) is a bigger practical risk than raw scale, and easy to underestimate in an interview</li></ul>
        <div class="ans-label" style="margin-top:12px;">Best Practices</div>
        <ul><li>Never let analytics tracking sit on the synchronous redirect path</li><li>Calculate the actual short-code keyspace math out loud (base62^N) — interviewers use this as a quick signal of quantitative rigor</li><li>Explicitly state which patterns you're deliberately NOT using, and why</li></ul>
      </div>
    </div>
  </div>
</div>
`;
