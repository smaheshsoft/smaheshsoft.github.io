window.Pages['sd-google-maps'] = `
<div class="page-header">
  <div class="breadcrumb">System Design › <span>Google Maps Navigation</span></div>
  <h1>🗺️ Google Maps — Navigation &amp; Mapping System Design</h1>
  <p>Planet-scale map tile serving, real-time traffic routing, geocoding, ETA prediction, and turn-by-turn navigation at billions of queries per day</p>
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

      <!-- Layer bands -->
      <rect x="30" y="20" width="860" height="70" rx="6" fill="#ffffff08"/>
      <rect x="30" y="100" width="860" height="60" rx="6" fill="#ffffff06"/>
      <rect x="30" y="170" width="860" height="120" rx="6" fill="#ffffff05"/>
      <rect x="30" y="300" width="860" height="105" rx="6" fill="#ffffff06"/>

      <!-- Layer labels -->
      <text x="14" y="74" font-size="11" fill="#888" font-family="monospace" transform="rotate(-90,14,74)">CLIENT</text>
      <text x="14" y="164" font-size="11" fill="#888" font-family="monospace" transform="rotate(-90,14,164)">GATEWAY</text>
      <text x="14" y="260" font-size="11" fill="#888" font-family="monospace" transform="rotate(-90,14,260)">SERVICES</text>
      <text x="14" y="364" font-size="11" fill="#888" font-family="monospace" transform="rotate(-90,14,364)">DATA</text>

      <!-- CLIENT LAYER -->
      <rect x="60" y="32" width="110" height="46" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="115" y="52" font-size="12" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📱 Mobile</text>
      <text x="115" y="68" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">iOS / Android</text>

      <rect x="220" y="32" width="110" height="46" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="275" y="52" font-size="12" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🌐 Web</text>
      <text x="275" y="68" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Browser / JS SDK</text>

      <rect x="570" y="32" width="120" height="46" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="630" y="52" font-size="12" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🚗 Android Auto</text>
      <text x="630" y="68" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">In-car Display</text>

      <rect x="730" y="32" width="120" height="46" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="790" y="52" font-size="12" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🔌 Maps API</text>
      <text x="790" y="68" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Third-party Apps</text>

      <!-- GATEWAY LAYER -->
      <rect x="200" y="112" width="130" height="36" rx="8" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="265" y="127" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🌍 CDN Edge</text>
      <text x="265" y="141" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Map Tiles Cache</text>

      <rect x="370" y="112" width="170" height="36" rx="8" fill="#1a2d20" stroke="#4ade80" stroke-width="1.5"/>
      <text x="455" y="127" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🌐 API Gateway</text>
      <text x="455" y="141" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Auth · Rate Limit · Route</text>

      <!-- SERVICES LAYER -->
      <rect x="40" y="182" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="95" y="199" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🗺️ Tile Svc</text>
      <text x="95" y="213" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Vector/Raster</text>
      <text x="95" y="224" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Tiles</text>

      <rect x="168" y="182" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="223" y="199" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🔀 Routing</text>
      <text x="223" y="213" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Dijkstra / A*</text>
      <text x="223" y="224" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Road Graph</text>

      <rect x="296" y="182" width="115" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="354" y="199" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🔍 Geocoding</text>
      <text x="354" y="213" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Fwd/Reverse</text>
      <text x="354" y="224" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Search</text>

      <rect x="426" y="182" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="481" y="199" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🚦 Traffic</text>
      <text x="481" y="213" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Live Speed</text>
      <text x="481" y="224" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Events</text>

      <rect x="552" y="182" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="607" y="199" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">⏱️ ETA Svc</text>
      <text x="607" y="213" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">ML Prediction</text>
      <text x="607" y="224" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Arrival Time</text>

      <rect x="678" y="182" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="733" y="199" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📍 Places</text>
      <text x="733" y="213" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">POI / Reviews</text>
      <text x="733" y="224" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Business</text>

      <!-- Kafka band -->
      <rect x="200" y="246" width="500" height="36" rx="8" fill="#2d2a1a" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="450" y="261" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📨 Kafka — traffic-events · probe-data · user-feedback · location-updates</text>
      <text x="450" y="276" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Pub/Sub backbone for real-time data pipelines</text>

      <!-- DATA LAYER -->
      <rect x="42" y="312" width="120" height="46" rx="8" fill="#1a2040" stroke="#34d399" stroke-width="1.5"/>
      <text x="102" y="332" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🗃️ Bigtable</text>
      <text x="102" y="348" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Road Graph / Tiles</text>

      <rect x="180" y="312" width="120" height="46" rx="8" fill="#2d1a1a" stroke="#f87171" stroke-width="1.5"/>
      <text x="240" y="332" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">⚡ Redis</text>
      <text x="240" y="348" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Traffic Cache</text>

      <rect x="318" y="312" width="130" height="46" rx="8" fill="#1a2040" stroke="#60a5fa" stroke-width="1.5"/>
      <text x="383" y="332" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🔵 Spanner</text>
      <text x="383" y="348" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Places DB (SQL)</text>

      <rect x="466" y="312" width="130" height="46" rx="8" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="531" y="332" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">☁️ GCS</text>
      <text x="531" y="348" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Tile Storage</text>

      <rect x="614" y="312" width="130" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="679" y="332" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🤖 ML Pipeline</text>
      <text x="679" y="348" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Traffic Prediction</text>

      <rect x="762" y="312" width="110" height="46" rx="8" fill="#2d1f1a" stroke="#fb923c" stroke-width="1.5"/>
      <text x="817" y="332" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📊 Monitor</text>
      <text x="817" y="348" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Cloud Ops/Trace</text>

      <!-- ARROWS: Clients → CDN / Gateway -->
      <line x1="115" y1="78" x2="230" y2="112" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="275" y1="78" x2="265" y2="112" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="630" y1="78" x2="500" y2="112" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="790" y1="78" x2="520" y2="112" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- CDN → Tile Service -->
      <line x1="265" y1="148" x2="95" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Gateway → Services -->
      <line x1="400" y1="148" x2="223" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="430" y1="148" x2="354" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="455" y1="148" x2="481" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="490" y1="148" x2="607" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="520" y1="148" x2="733" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Services → Kafka -->
      <line x1="223" y1="228" x2="280" y2="246" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="481" y1="228" x2="450" y2="246" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="607" y1="228" x2="550" y2="246" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Services → Data direct -->
      <line x1="95" y1="228" x2="102" y2="312" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="223" y1="228" x2="240" y2="312" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="733" y1="228" x2="383" y2="312" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="95" y1="228" x2="531" y2="312" stroke="#4b5563" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arr)"/>

      <!-- Kafka → Data -->
      <line x1="280" y1="282" x2="240" y2="312" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="450" y1="282" x2="679" y2="312" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Monitoring -->
      <line x1="733" y1="228" x2="817" y2="312" stroke="#4b5563" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr)"/>
    </svg>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">1. Executive Summary</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Problem</div>
        <p>Google Maps must deliver accurate, real-time navigation for billions of users worldwide — serving petabytes of map tile data at low latency, computing optimal routes over a road graph with hundreds of millions of nodes, and incorporating live traffic data from millions of probe sources simultaneously.</p>
        <div class="ans-label" style="margin-top:12px;">Scale Numbers</div>
        <ul>
          <li>1 billion+ monthly active users across 220+ countries</li>
          <li>~25 million map tile requests per second at peak</li>
          <li>Road graph: ~800M nodes, 1.3B edges globally</li>
          <li>Live traffic data from hundreds of millions of devices</li>
          <li>Street View imagery: 220 billion photos, 10M+ miles driven</li>
          <li>Google Maps Platform: 5M+ apps and websites use the API daily</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Core Challenges</div>
        <ul>
          <li>Routing on a massive graph with real-time traffic overlay in &lt;500ms</li>
          <li>Serving billions of map tiles with low latency globally via CDN</li>
          <li>Fusing GPS probe data from millions of devices to derive live traffic speeds</li>
          <li>ETA prediction accuracy under dynamic conditions (accidents, weather)</li>
          <li>Incremental map data updates without full re-rendering</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Functional Requirements</div>
        <ul>
          <li>Search for a place by name, address, or category (geocoding)</li>
          <li>Compute turn-by-turn route from A to B across transport modes (driving, walking, transit, cycling)</li>
          <li>Display interactive map tiles at any zoom level with smooth panning</li>
          <li>Show live traffic conditions (speed, incidents, road closures)</li>
          <li>Provide accurate ETA incorporating historical and real-time traffic</li>
          <li>Reroute dynamically when driver deviates or incident detected ahead</li>
          <li>Surface nearby places of interest (restaurants, fuel, hospitals)</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Non-Functional Requirements</div>
        <div class="pattern-table">
          <div class="pt-row pt-header"><div>NFR</div><div>Target</div><div>Why</div><div>Approach</div></div>
          <div class="pt-row"><div class="pt-name">Routing Latency</div><div>&lt;500ms P99</div><div>Real-time navigation requires instant response</div><div>Pre-contracted road graph partitions in memory, bidirectional A*</div></div>
          <div class="pt-row"><div class="pt-name">Tile Serve Latency</div><div>&lt;50ms P95 (CDN hit)</div><div>Map rendering blocks the UI</div><div>CDN edge caches with &gt;99% hit ratio for popular zoom/regions</div></div>
          <div class="pt-row"><div class="pt-name">Traffic Freshness</div><div>2-minute lag maximum</div><div>Stale traffic ruins ETA and routing quality</div><div>Probe data stream processing via Kafka + streaming aggregation</div></div>
          <div class="pt-row"><div class="pt-name">Availability</div><div>99.99%</div><div>Navigation during a drive is safety-critical</div><div>Multi-region active-active, offline tile cache on device</div></div>
          <div class="pt-row"><div class="pt-name">ETA Accuracy</div><div>Within 5% of actual travel time</div><div>User trust and product differentiation</div><div>ML model trained on billions of historical trips + real-time traffic</div></div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">2. Capacity Estimation</div>
  <div class="ref-body">
    <p>All assumptions stated explicitly — interviewers reward structured reasoning over precise numbers.</p>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Metric</div><div>Assumption</div><div>Calculation</div><div>Result</div></div>
      <div class="pt-row"><div class="pt-name">MAU</div><div>1 billion monthly active users</div><div>Given</div><div>1B MAU</div></div>
      <div class="pt-row"><div class="pt-name">DAU</div><div>~35% of MAU active daily</div><div>1B × 0.35</div><div>~350M DAU</div></div>
      <div class="pt-row"><div class="pt-name">Navigation sessions/day</div><div>Average 1.5 sessions per DAU</div><div>350M × 1.5</div><div>~525M sessions/day</div></div>
      <div class="pt-row"><div class="pt-name">Route requests/sec (peak)</div><div>3× average at commute hours</div><div>(525M / 86,400) × 3</div><div>~18,200 route req/sec</div></div>
      <div class="pt-row"><div class="pt-name">Map tile requests/sec</div><div>Avg 50 tiles/session, 30s avg load</div><div>525M × 50 / 86,400 × peak 3×</div><div>~25M tile req/sec peak</div></div>
      <div class="pt-row"><div class="pt-name">Tile storage (all zoom levels)</div><div>Zoom 0-22, vector tile avg 5KB compressed</div><div>~4.6 trillion tiles × 5KB (sparse)</div><div>~20 PB total map data</div></div>
      <div class="pt-row"><div class="pt-name">Probe data writes/sec</div><div>400M probe devices, ping every 5s while navigating</div><div>400M / 5 × 0.3 (fraction actively navigating)</div><div>~24M writes/sec peak</div></div>
      <div class="pt-row"><div class="pt-name">Geocoding requests/day</div><div>2 geocodes per navigation session (origin + dest)</div><div>525M × 2</div><div>~1B geocodes/day</div></div>
      <div class="pt-row"><div class="pt-name">Road graph RAM</div><div>800M nodes × 200 bytes + 1.3B edges × 100 bytes</div><div>160GB + 130GB</div><div>~300GB graph in RAM per region</div></div>
      <div class="pt-row"><div class="pt-name">Bandwidth (tile CDN)</div><div>Avg tile 5KB compressed, 25M req/sec</div><div>25M × 5KB</div><div>~125 GB/sec egress</div></div>
    </div>
    <div class="tip-box" style="margin-top:10px;">✅ Tile serving is the dominant I/O workload (125 GB/sec) — this entire subsystem must be CDN-first with near-100% cache hit ratio. Probe data ingestion (24M writes/sec) is the dominant write workload, far exceeding any OLTP database capability — it must flow through a streaming pipeline, never written directly to a database.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">3. APIs</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Endpoint</div><div>Method</div><div>Purpose</div><div>Auth</div></div>
      <div class="pt-row"><div class="pt-name">/v1/directions</div><div>GET</div><div>Compute route from origin to destination</div><div>API Key / OAuth2</div></div>
      <div class="pt-row"><div class="pt-name">/v1/geocode</div><div>GET</div><div>Convert address string to lat/lng coordinates</div><div>API Key</div></div>
      <div class="pt-row"><div class="pt-name">/v1/reverse-geocode</div><div>GET</div><div>Convert lat/lng to human-readable address</div><div>API Key</div></div>
      <div class="pt-row"><div class="pt-name">/v1/places/search</div><div>GET</div><div>Search nearby POIs by keyword/category</div><div>API Key / OAuth2</div></div>
      <div class="pt-row"><div class="pt-name">/v1/tiles/{z}/{x}/{y}</div><div>GET</div><div>Fetch a single map tile at zoom/x/y</div><div>API Key (signed URL)</div></div>
      <div class="pt-row"><div class="pt-name">/v1/traffic/speeds</div><div>GET</div><div>Get current speed for road segments in bounding box</div><div>API Key</div></div>
      <div class="pt-row"><div class="pt-name">/v1/traffic/incidents</div><div>GET</div><div>Get active incidents (accidents, closures) in area</div><div>API Key</div></div>
      <div class="pt-row"><div class="pt-name">/v1/probe</div><div>POST</div><div>Device uploads GPS probe data (speed, heading, timestamp)</div><div>Device cert / OAuth2</div></div>
      <div class="pt-row"><div class="pt-name">/v1/eta</div><div>GET</div><div>Get predicted arrival time for a route</div><div>API Key / OAuth2</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Directions Request/Response</div>
        <div class="code-box">GET /v1/directions
  ?origin=37.7749,-122.4194
  &amp;destination=37.3382,-121.8863
  &amp;mode=driving
  &amp;departure_time=now
  &amp;alternatives=true
  &amp;avoid=tolls
Headers:
  X-API-Key: &lt;key&gt;
  Accept-Encoding: gzip

Response 200:
{
  "routes": [{
    "summary": "US-101 S",
    "distanceMeters": 78420,
    "durationSeconds": 3540,
    "durationInTrafficSeconds": 4320,
    "legs": [{
      "steps": [
        { "instruction": "Head south on Market St",
          "distanceMeters": 450,
          "maneuver": "straight",
          "polyline": "encoded_polyline_here" }
      ]
    }],
    "polyline": "full_route_polyline",
    "trafficCondition": "HEAVY"
  }],
  "geocodedWaypoints": [...],
  "status": "OK"
}</div>
      </div>
      <div>
        <div class="ans-label">API Design Standards</div>
        <ul>
          <li><strong>Authentication:</strong> API keys for server-to-server; OAuth2 + user consent for accessing personal location history</li>
          <li><strong>Rate limiting:</strong> Per-API-key token bucket; tiered plans (free: 10K req/day, paid: unlimited with cost per call)</li>
          <li><strong>Versioning:</strong> URI versioning /v1/, /v2/ with 12-month deprecation notice for breaking changes</li>
          <li><strong>Compression:</strong> All responses gzip-compressed; encoded polylines (Google Encoded Polyline Algorithm) minimize payload</li>
          <li><strong>Caching headers:</strong> Tile responses include Cache-Control: max-age=86400; routing responses include Expires to allow CDN caching of common routes</li>
          <li><strong>Signed tile URLs:</strong> Tiles use server-signed expiring URLs to prevent hotlinking and enable per-key billing</li>
          <li><strong>Status codes:</strong> ZERO_RESULTS (no route found), NOT_FOUND (geocode miss), OVER_DAILY_LIMIT, REQUEST_DENIED, INVALID_REQUEST</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">4. High-Level Architecture</div>
  <div class="ref-body">
    <div class="code-box">┌─────────────────────────────────────────────────────────────────────┐
│  CLIENT TIER                                                        │
│  iOS App · Android App · Web JS · Android Auto · Maps Platform API │
└───────────────────┬──────────────────────────────────┬─────────────┘
                    │ Map Tiles (CDN hit ~99%)           │ API calls
                    ▼                                    ▼
    ┌───────────────────────┐          ┌───────────────────────────┐
    │  CDN Edge Nodes        │          │  API Gateway               │
    │  (200+ PoPs globally)  │          │  (Auth · Rate Limit ·      │
    │  GCS → CDN pipeline    │          │   Route to microservices)  │
    └───────────────────────┘          └─────────────┬─────────────┘
                                                      │
              ┌───────────────────────────────────────┼──────────────────────┐
              ▼               ▼              ▼         ▼          ▼          ▼
        ┌──────────┐  ┌──────────┐  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
        │  Tile    │  │ Routing  │  │Geocoding │ │ Traffic  │ │  ETA     │ │ Places   │
        │  Service │  │ Service  │  │ Service  │ │ Service  │ │ Service  │ │ Service  │
        └────┬─────┘  └────┬─────┘  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘
             │              │              │             │             │             │
    ┌────────▼──────────────▼──────────────▼─────────────▼────────────▼─────────────▼──┐
    │                        Kafka Event Backbone                                       │
    │     Topics: probe-data · traffic-events · route-requests · user-feedback         │
    └────────┬──────────────┬──────────────────────────────────────────────────────────┘
             │              │
    ┌────────▼──┐  ┌─────────▼──────────────────────────────────────────────────────┐
    │ Bigtable  │  │  GCS (tile store) · Redis (traffic cache) · Spanner (places)   │
    │(road graph│  │  ML Pipeline (traffic prediction / ETA model training)          │
    │  tiles)   │  └────────────────────────────────────────────────────────────────┘
    └───────────┘</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Tile Pipeline</div>
        <p>Raw map data (OpenStreetMap, DigitalGlobe imagery, Street View) is processed offline by a data pipeline. Vector tiles are generated at zoom levels 0–22, stored in Google Cloud Storage, and pushed to CDN edge nodes. Client apps pre-fetch tiles for expected route areas before the drive begins.</p>
      </div>
      <div>
        <div class="ans-label">Routing Pipeline</div>
        <p>The road graph (Contraction Hierarchies pre-processed from raw OSM + Google-collected road data) is partitioned by region and loaded into Routing Service memory. Traffic speeds from Redis are overlaid at query time. Bidirectional A* finds shortest path; results encoded as polyline for compact transport.</p>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">5. Core Service: Routing Service (Graph &amp; Pathfinding)</div>
  <div class="ref-body">
    <p>The Routing Service is the most algorithmically complex and performance-sensitive component. It must compute optimal driving routes across a global road graph of 800M+ nodes in under 500ms, incorporating live traffic, turn restrictions, road closures, and user preferences (avoid tolls, highways, ferries).</p>
    <div class="two-col">
      <div>
        <div class="ans-label">Data Structures</div>
        <ul>
          <li><strong>Contraction Hierarchies (CH):</strong> Pre-process the road graph by iteratively "contracting" less important nodes, adding shortcut edges. Query time drops from O(V log V) Dijkstra to milliseconds on continental graphs.</li>
          <li><strong>H3 Hexagonal Grid:</strong> Road graph is partitioned into H3 cells (resolution 5, ~250km²). Each cell's subgraph fits in L3 cache; cross-cell shortcuts pre-computed for efficiency.</li>
          <li><strong>Edge attributes:</strong> Each edge stores base travel time, max speed, road class (motorway/primary/residential), lane count, turn restrictions, and a reference to a live traffic speed slot.</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Traffic Overlay</div>
        <p>Redis stores current speed ratios per road segment (segment_id → speed_ratio). The Routing Service fetches the relevant region's speed map from Redis at query time and overlays it on CH edge weights. Segments without recent probe data fall back to historical average speeds for that time-of-day / day-of-week slot.</p>
      </div>
      <div>
        <div class="ans-label">Algorithm: Bidirectional A* with CH</div>
        <div class="code-box">// Simplified Contraction Hierarchy query
function routeCH(origin, destination, trafficSpeeds):
  // Forward search from origin UP the hierarchy
  forwardPQ = MinHeap[(0, origin)]
  // Backward search from destination UP the hierarchy
  backwardPQ = MinHeap[(0, destination)]

  while not both_settled:
    // Expand the cheaper frontier
    if forwardPQ.top() &lt;= backwardPQ.top():
      expandNode(forwardPQ, UP_DIRECTION, trafficSpeeds)
    else:
      expandNode(backwardPQ, UP_DIRECTION, trafficSpeeds)

    // Meeting node check — best path found when both
    // searches have settled the same node
    mu = min(forwardDist[v] + backwardDist[v]
             for v in settled_both)

  return reconstructPath(mu_node, forwardPrev, backwardPrev)</div>
        <div class="ans-label" style="margin-top:12px;">Rerouting</div>
        <p>During active navigation the device sends periodic position updates. If GPS position deviates &gt;50m from planned route for 3 seconds, or if a high-severity traffic incident appears on the current route, a new route computation is triggered. Re-route latency target is &lt;2s to keep instruction latency imperceptible.</p>
      </div>
    </div>
    <div class="pattern-table" style="margin-top:14px;">
      <div class="pt-row pt-header"><div>Scaling Dimension</div><div>Approach</div><div>Rationale</div></div>
      <div class="pt-row"><div class="pt-name">Geographic partitioning</div><div>Separate service instances per continent/region; cross-region routes handled by "global routing" service that stitches regional paths</div><div>Keeps graph size per instance manageable in RAM; isolates failure blast radius</div></div>
      <div class="pt-row"><div class="pt-name">Horizontal pod scaling</div><div>Route requests are stateless; HPA scales on CPU; 18K req/sec requires ~360 pods at ~50 req/pod/sec</div><div>Pure compute — no shared state between pods at query time</div></div>
      <div class="pt-row"><div class="pt-name">Graph refresh</div><div>CH pre-processing runs nightly on changed road segments; routing pods do a rolling reload (old version stays live during reload)</div><div>Full CH build takes hours; only delta-changed segments need reprocessing in incremental mode</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">6. Core Service 2: Traffic Service (Real-Time Speed Fusion)</div>
  <div class="ref-body">
    <p>The Traffic Service ingests GPS probe data from hundreds of millions of Android devices (with user consent), fuses speed readings across multiple probe sources, detects incidents, and maintains a near-real-time speed map that every other service relies on.</p>
    <div class="two-col">
      <div>
        <div class="ans-label">Probe Data Pipeline</div>
        <div class="flow-box">
          <div class="flow-step blue">Device GPS Probes (location, speed, heading, timestamp)</div>
          <div class="flow-arrow">↓ HTTPS batch upload every 30-60s (to save battery)</div>
          <div class="flow-step">Kafka Topic: probe-data (24M events/sec peak, 200 partitions, keyed by cell_id)</div>
          <div class="flow-arrow">↓ Stream processing (Apache Beam / Dataflow)</div>
          <div class="flow-step green">Map Matching: snap GPS coords to road segment via HMM (Hidden Markov Model)</div>
          <div class="flow-arrow">↓ grouped by segment_id, 1-minute tumbling window</div>
          <div class="flow-step">Speed Fusion: median speed across N probes per segment, outlier rejection</div>
          <div class="flow-arrow">↓</div>
          <div class="flow-step">Write to Redis (TTL 5 min per segment) + update Bigtable for historical archive</div>
        </div>
      </div>
      <div>
        <div class="ans-label">Incident Detection</div>
        <p>A sudden cluster of low-speed readings on a normally fast road segment triggers an incident candidate. The system cross-references with reports from Google Maps users ("Is there a problem here?"), news feeds, and municipal traffic data APIs before publishing a verified incident event.</p>
        <div class="ans-label" style="margin-top:12px;">Map Matching (HMM)</div>
        <p>A GPS fix has ~10m accuracy error and may snap to a parallel road. A Hidden Markov Model considers the sequence of GPS points and transition probabilities (road network topology) to identify the most likely road segment sequence. This is critical — a wrong map match produces nonsense traffic speeds.</p>
        <div class="ans-label" style="margin-top:12px;">Historical Traffic Patterns</div>
        <p>For road segments with few probes (rural areas, nighttime), the system falls back to a historical speed model: BigQuery holds years of aggregated speeds segmented by hour-of-day, day-of-week, and month. An ML model (gradient boosted trees) blends historical pattern with available live probes for the best ETA input.</p>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">7. Core Service 3: Tile Service (Map Tile Generation &amp; Serving)</div>
  <div class="ref-body">
    <p>Map tiles are the most bandwidth-intensive part of Google Maps. The Tile Service must serve ~25 million tile requests per second globally with sub-50ms CDN-hit latency, while continuously updating tiles when underlying map data changes.</p>
    <div class="two-col">
      <div>
        <div class="ans-label">Tile Generation Pipeline (Offline)</div>
        <div class="flow-box">
          <div class="flow-step blue">Raw Data Sources: OSM · Satellite imagery · Street View · Authoritative data partners</div>
          <div class="flow-arrow">↓ Data processing (Dataflow / MapReduce)</div>
          <div class="flow-step">Feature extraction: roads, buildings, parks, water, labels</div>
          <div class="flow-arrow">↓ Rendering engine (C++ tile renderer)</div>
          <div class="flow-step green">Vector tiles (PBF format) for zoom 10-22; Raster tiles for zoom 0-9</div>
          <div class="flow-arrow">↓</div>
          <div class="flow-step">Stored in GCS by tile coordinate: gs://tiles/{style}/{z}/{x}/{y}.pbf</div>
          <div class="flow-arrow">↓ Cache warm job pushes hot tiles to CDN edge</div>
          <div class="flow-step">CDN PoP (200+ global edge nodes) serves tiles to end clients</div>
        </div>
      </div>
      <div>
        <div class="ans-label">Tile Addressing (XYZ Scheme)</div>
        <p>Each tile is identified by zoom level z, x column, y row in the Web Mercator projection. At zoom 0 the world is one tile; each zoom level quadruples the tile count. Zoom 22 has ~18 trillion potential tiles (most are ocean/empty and not generated).</p>
        <div class="ans-label" style="margin-top:12px;">Vector vs Raster Tiles</div>
        <ul>
          <li><strong>Vector tiles (PBF):</strong> Compact binary encoding of geometry + attributes. Client (WebGL / MapLibre) renders locally. Smaller payload, supports smooth zoom, label rotation, and real-time style changes.</li>
          <li><strong>Raster tiles (PNG/WebP):</strong> Pre-rendered images. Simpler client; heavier payload. Used for satellite imagery and low-zoom overviews.</li>
          <li><strong>At scale:</strong> Vector tiles are preferred — avg 15KB vs 50KB raster means 3× less CDN bandwidth for same coverage.</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Incremental Updates</div>
        <p>When a road changes (new highway opens, building demolished), only the affected tiles and their parent tiles need regeneration — not a full planet re-render. A change event triggers a scoped render job that invalidates CDN cache for affected tile keys only.</p>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">8. Database Design</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Store</div><div>Data</div><div>Why This Store</div><div>Key Design</div></div>
      <div class="pt-row"><div class="pt-name">Google Cloud Bigtable</div><div>Road graph adjacency (nodes/edges), tile metadata index, traffic history by segment</div><div>Column-family NoSQL; supports sparse billions of rows; sub-10ms read on row key; linear scale</div><div>Row key: segment_id#timestamp for traffic; cell_id for graph adjacency</div></div>
      <div class="pt-row"><div class="pt-name">Google Cloud Spanner</div><div>Places database (name, address, category, hours, reviews), user-contributed edits</div><div>Globally distributed SQL with external consistency; ACID for place data mutations; SQL joins for POI search</div><div>Shard by geography (lat/lng range); Secondary index on name + category for search</div></div>
      <div class="pt-row"><div class="pt-name">Redis Cluster</div><div>Live traffic speeds per road segment (current speed, timestamp), incident events</div><div>Sub-ms reads; TTL-based auto-expiry for stale segments; cluster shards by segment_id range</div><div>Key: seg:{segment_id}; Value: {speed_ratio, updated_ts, confidence}; TTL 300s</div></div>
      <div class="pt-row"><div class="pt-name">Google Cloud Storage (GCS)</div><div>Map tiles (vector PBF + raster PNG/WebP), Street View imagery, satellite imagery</div><div>Object store; low cost per GB; direct CDN origin; versioned objects for tile rollback</div><div>Bucket organized as {style}/{z}/{x}/{y}.pbf; CDN reads directly from GCS origin</div></div>
      <div class="pt-row"><div class="pt-name">BigQuery</div><div>Historical traffic patterns, probe data archive, analytics</div><div>OLAP-only; columnar; petabyte-scale; used by ML training and data science, not in serving path</div><div>Partitioned by date + segment_region; clustered by hour_of_day for temporal queries</div></div>
      <div class="pt-row"><div class="pt-name">Elasticsearch</div><div>Geocoding index (address → lat/lng), fuzzy place name search</div><div>Inverted index on address tokens; BM25 relevance ranking; geo_distance filter for "near me" queries</div><div>Index: addresses field (tokenized), location field (geo_point); sharded by region</div></div>
    </div>
    <div class="code-box" style="margin-top:12px;">-- Places table (Spanner - simplified)
CREATE TABLE places (
  place_id         STRING(36) NOT NULL,
  name             STRING(256),
  address          STRING(512),
  lat              FLOAT64,
  lng              FLOAT64,
  category         STRING(64),
  rating           FLOAT64,
  review_count     INT64,
  business_status  STRING(32),  -- OPERATIONAL / CLOSED_TEMPORARILY / CLOSED_PERMANENTLY
  last_updated     TIMESTAMP NOT NULL OPTIONS (allow_commit_timestamp=true),
) PRIMARY KEY (place_id);

CREATE INDEX idx_places_geo ON places(lat, lng);  -- For bounding-box searches
CREATE INDEX idx_places_category ON places(category, rating DESC);  -- For category POI search

-- Road segment table (Bigtable schema — logical representation)
-- Row key: {region_code}#{segment_id}
-- Column family: graph → neighbors, base_speed_kmh, road_class, turn_restrictions
-- Column family: traffic → current_speed_ratio, last_probe_ts, historical_speeds</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">9. Data Flow — Key Scenarios</div>
  <div class="ref-body">
    <div class="ans-label">Scenario 1: User Requests a Route (Driving)</div>
    <div class="flow-box">
      <div class="flow-step blue">1. User enters destination "SFO Airport" on Maps app</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">2. Geocoding Service resolves "SFO Airport" → lat/lng (37.6213, -122.3790) via Elasticsearch index</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">3. API Gateway routes POST /v1/directions to Routing Service (closest regional instance)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step green">4. Routing Service loads CH graph for Bay Area partition from in-memory store; fetches current speed ratios for relevant segments from Redis Traffic Cache</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">5. Bidirectional A* with traffic-weighted CH computes 3 candidate routes in ~200ms</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">6. ETA Service applies ML model (gradient boosting on historical + live traffic features) to predict arrival time for each route</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">7. Response JSON with encoded polylines + turn instructions + ETAs returned to client in &lt;500ms total</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step blue">8. Client renders route overlay by fetching map tiles for bounding box from CDN</div>
    </div>

    <div class="ans-label" style="margin-top:16px;">Scenario 2: Live Traffic Update Flow</div>
    <div class="flow-box">
      <div class="flow-step blue">1. 400M Android devices (opted-in) send GPS batch (location, speed, heading, timestamp) every 30-60s via probe API</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">2. Probe API publishes raw events to Kafka topic: probe-data (partitioned by H3 cell_id for locality)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step green">3. Stream processor (Cloud Dataflow / Apache Beam) reads probe-data; applies HMM map matching to snap GPS points to road segments</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">4. Speed aggregation: median of all probes on segment in last 60 seconds, with minimum 3 probes for confidence</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">5. Updated speed ratios written to Redis (TTL 300s) and archived to Bigtable for historical ML training data</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">6. Traffic Service detects sharp deceleration cluster → publishes incident candidate to incident-events Kafka topic</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step blue">7. Incident verified → active navigation sessions on affected route receive push notification to re-route</div>
    </div>

    <div class="ans-label" style="margin-top:16px;">Scenario 3: Map Tile Request (Cache Miss Path)</div>
    <div class="flow-box">
      <div class="flow-step blue">1. Client requests tile /v1/tiles/14/2620/6332.pbf (zoom 14, San Francisco)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">2. CDN edge PoP: MISS — tile not in edge cache (e.g. first request after recent map update)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step green">3. CDN origin-pull to GCS: gs://maps-tiles/default/14/2620/6332.pbf (stored offline-rendered tile)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">4. GCS returns tile binary (~15KB compressed PBF) to CDN edge; CDN stores with Cache-Control: max-age=86400</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step blue">5. Subsequent requests from any user at same PoP: CDN HIT — served in &lt;10ms with no origin load</div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">10. Caching Strategy</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Cache Layer</div><div>Pattern</div><div>TTL</div><div>Eviction &amp; Notes</div></div>
      <div class="pt-row"><div class="pt-name">Map tiles (CDN edge)</div><div>Read-through from GCS origin; write-invalidate on map data change</div><div>24h (static tiles), 5 min (traffic overlay tiles)</div><div>LRU per PoP; popular zoom levels pre-warmed; cold tiles pulled on-demand from GCS</div></div>
      <div class="pt-row"><div class="pt-name">Traffic speeds (Redis)</div><div>Write-through from stream processor on every probe update</div><div>300s per segment (auto-expires stale data)</div><div>No-LRU needed — TTL handles eviction; cluster sharded by segment_id; 300GB cluster for global speeds</div></div>
      <div class="pt-row"><div class="pt-name">Geocoding results</div><div>Cache-aside in Redis; key = normalized address string</div><div>1 hour</div><div>Top 10M addresses account for ~80% of queries; pre-warm with historical query logs</div></div>
      <div class="pt-row"><div class="pt-name">Routing results (popular O→D pairs)</div><div>Cache-aside; key = (origin_h3_cell, destination_h3_cell, mode, time_bucket)</div><div>2 min (traffic changes; stale routes are dangerous)</div><div>Only applicable for common commute corridors; individual GPS-precision routes not cached</div></div>
      <div class="pt-row"><div class="pt-name">Place details</div><div>Read-through from Spanner; served from Redis</div><div>1 hour</div><div>1M most-queried places kept warm; long-tail served from Spanner directly</div></div>
      <div class="pt-row"><div class="pt-name">Device tile cache</div><div>On-device LRU tile cache (100-500MB); pre-fetched for planned route corridor</div><div>Persistence across app restarts; invalidated on map version bump</div><div>Eliminates re-downloading tiles during navigation; critical for offline / low-connectivity areas</div></div>
    </div>
    <div class="warn-box" style="margin-top:10px;">⚠️ Routing cache TTL must be short (under 2 minutes) — serving a stale cached route during an active incident can direct users into traffic jams or closed roads. ETA accuracy is more important than cache efficiency for routing.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">11. Message Queue / Event Streaming</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Topic / Queue</div><div>Producer</div><div>Consumer</div><div>Why Kafka</div></div>
      <div class="pt-row"><div class="pt-name">probe-data</div><div>Device probe ingestion API (24M events/sec)</div><div>Stream processor (Dataflow), Traffic Service</div><div>Only Kafka handles this throughput reliably; partitioned by H3 cell for locality; replay for model retraining</div></div>
      <div class="pt-row"><div class="pt-name">traffic-updates</div><div>Traffic Service (speed updates)</div><div>Routing Service (invalidates cached routes), ETA Service, Notification Service</div><div>Fan-out to multiple consumers without tight coupling; log-based ensures every consumer gets full stream</div></div>
      <div class="pt-row"><div class="pt-name">incident-events</div><div>Traffic Service (incident detection)</div><div>Notification Service (alert active navigators), UI rendering pipeline</div><div>Incidents are low-volume but high-priority; Kafka guarantees ordering and at-least-once delivery</div></div>
      <div class="pt-row"><div class="pt-name">map-change-events</div><div>Map data pipeline (road edits, new POIs)</div><div>Tile render job, CDN cache invalidation, Graph rebuild service</div><div>Decouples data change from downstream effects; failed renders can replay from Kafka without re-processing upstream</div></div>
      <div class="pt-row"><div class="pt-name">user-feedback</div><div>User reports ("speed camera", "accident cleared", "wrong turn")</div><div>Incident resolution service, Map corrections service, ML training pipeline</div><div>Buffer between high-volume user actions and ML processing; enables batch training job to read accumulated feedback</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Delivery Guarantees</div>
        <ul>
          <li><strong>Probe data:</strong> At-least-once acceptable — a duplicate probe reading is filtered by the aggregation window median; duplicates are harmless</li>
          <li><strong>Incident events:</strong> Exactly-once — a duplicate incident creation is prevented by deduplication on (road_segment_id, incident_type, window_start)</li>
          <li><strong>Map change events:</strong> At-least-once with idempotent tile renders (rendering the same tile twice produces the same output)</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Configuration</div>
        <ul>
          <li><strong>Partitions:</strong> probe-data: 2,000 partitions (H3 cell-based for geographic locality); traffic-updates: 500 partitions</li>
          <li><strong>Retention:</strong> probe-data: 7 days (for ML reprocessing); incident-events: 30 days; map-change-events: 90 days</li>
          <li><strong>Replication factor:</strong> 3 across AZs for all topics</li>
          <li><strong>Compression:</strong> Snappy for probe data (high-throughput, moderate compression); GZIP for map-change-events (low-throughput, high compression benefit)</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">12. Real-time Communication</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Active Navigation Updates (SSE / WebSocket)</div>
        <p>During active turn-by-turn navigation, the client needs push updates when incidents appear on the current route or a significantly faster alternative becomes available. Google Maps uses <strong>Server-Sent Events (SSE)</strong> for this one-directional server→client stream — lighter than WebSocket since the device doesn't need to send back navigation state (probe data goes via a separate REST endpoint).</p>
        <p>Each SSE connection is keyed to (session_id, current_route_polyline_hash). The server sends:</p>
        <ul>
          <li>Traffic incident ahead → reroute suggestion</li>
          <li>New fastest route found (saves &gt;5 min)</li>
          <li>Speed camera / hazard warnings</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Map Tile Loading (HTTP/2 Push &amp; Pre-fetch)</div>
        <p>Tile loading is not real-time streaming — it's standard HTTP GET. However, performance optimizations include:</p>
        <ul>
          <li><strong>HTTP/2 multiplexing:</strong> Multiple tile requests on a single TCP connection to CDN edge</li>
          <li><strong>Predictive pre-fetch:</strong> While the user navigates, the app pre-fetches tiles 2-3 "screens ahead" along the route so map rendering is never blocked on tile arrival</li>
          <li><strong>Offline download:</strong> User can pre-download a region's tiles for fully offline navigation — tiles stored in device SQLite (MBTiles format)</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Probe Data Upload (Batch HTTP)</div>
        <p>Device GPS data is batched locally and uploaded every 30-60s via POST to reduce radio wake-ups (battery optimization). Not a streaming connection — purposely asynchronous.</p>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">13. Consistency &amp; Transactions</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Data Domain</div><div>Consistency Model</div><div>Rationale</div><div>Implementation</div></div>
      <div class="pt-row"><div class="pt-name">Traffic speeds</div><div>Eventual (BASE)</div><div>Traffic data is best-effort — a 10s lag in a speed update is imperceptible to users; strong consistency would block routing under network partition</div><div>Redis TTL-based; stream processor writes; no global lock</div></div>
      <div class="pt-row"><div class="pt-name">Places / Business data</div><div>Strong (ACID)</div><div>A business must appear either open or closed — partial update (name updated but hours not) is confusing and legally sensitive for some categories</div><div>Spanner transactions wrap multi-column updates atomically; external consistency for global replicas</div></div>
      <div class="pt-row"><div class="pt-name">Map tile versions</div><div>Eventual — causal consistency</div><div>Adjacent tiles rendered from the same map version must show consistently; a tile from v1.0 next to a tile from v1.1 is visually jarring</div><div>Tile batches tagged with map_version; client requests specific version; CDN cache keys include version hash</div></div>
      <div class="pt-row"><div class="pt-name">Road graph updates</div><div>Eventually consistent with ordered log</div><div>A new road segment must not appear in routing before its tiles are rendered (would route onto invisible road)</div><div>Kafka map-change-events topic defines ordering; tile render job must ACK before routing graph update is applied</div></div>
      <div class="pt-row"><div class="pt-name">User-submitted map edits</div><div>Optimistic concurrency</div><div>Two editors submitting conflicting changes to the same place must be detected and reconciled</div><div>Spanner read-modify-write with version column; conflict → manual review queue</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">14. Search Architecture (Geocoding &amp; Places)</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Forward Geocoding (Address → Lat/Lng)</div>
        <p>Input: "1600 Amphitheatre Pkwy, Mountain View, CA". The Geocoding Service tokenizes the address, queries an Elasticsearch index of ~1B global addresses (inverted index on street name, city, postal code, country tokens). Candidate results are ranked by:</p>
        <ul>
          <li><strong>Address completeness:</strong> full address match outranks partial</li>
          <li><strong>Geographic context:</strong> bias toward user's current country/city</li>
          <li><strong>Popularity:</strong> frequently searched addresses are boosted</li>
          <li><strong>BM25 relevance score</strong> from Elasticsearch full-text matching</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Autocomplete</div>
        <p>Keystroke-latency autocomplete uses an Elasticsearch completion suggester with a finite automaton index — sub-10ms per keypress, returning ranked suggestions after 2+ characters typed. Personalized by search history for signed-in users (recent/saved places ranked higher).</p>
      </div>
      <div>
        <div class="ans-label">Reverse Geocoding (Lat/Lng → Address)</div>
        <p>For each GPS probe snap and "What's here?" taps, a lat/lng must resolve to the nearest address. This uses an R-tree spatial index over address polygons — each building/parcel polygon is stored, and the query finds which polygon contains the point, then returns the street address. Elasticsearch geo_shape queries handle this efficiently.</p>
        <div class="ans-label" style="margin-top:12px;">Places Search (POI)</div>
        <p>Queries like "coffee shops near me" use a combined geo_distance + keyword filter in Elasticsearch:</p>
        <div class="code-box">GET /places/_search
{
  "query": {
    "bool": {
      "must": { "match": { "category": "coffee" } },
      "filter": {
        "geo_distance": {
          "distance": "1km",
          "location": { "lat": 37.42, "lon": -122.08 }
        }
      }
    }
  },
  "sort": [
    { "_geo_distance": { "location": { "lat": 37.42, "lon": -122.08 }, "order": "asc" } },
    { "rating": { "order": "desc" } }
  ]
}</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">15. CDN &amp; Map Tile Delivery</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">What is CDN-Served</div>
        <ul>
          <li>Vector map tiles (PBF) and raster tiles (WebP/PNG) — the dominant traffic</li>
          <li>Street View imagery tiles (JPEG panoramas)</li>
          <li>Satellite/aerial imagery tiles</li>
          <li>Maps JavaScript SDK &amp; mobile app static assets</li>
          <li>Place photos (thumbnail sizes)</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">CDN Architecture</div>
        <p>Google serves tiles from its own global CDN (part of Google's network infrastructure with 200+ PoPs). The origin is GCS — CDN edge nodes pull from GCS on MISS and cache for 24 hours. Popular zoom-level/region tiles are pre-pushed to edge nodes to avoid cold-start misses in high-traffic areas.</p>
      </div>
      <div>
        <div class="ans-label">Cache Hierarchy</div>
        <div class="flow-box">
          <div class="flow-step blue">L1: On-device SQLite tile cache (100-500MB) — serves previously viewed &amp; pre-fetched tiles instantly</div>
          <div class="flow-arrow">↓ miss</div>
          <div class="flow-step green">L2: CDN Edge PoP (nearest to user) — serves &gt;99% of tile requests, &lt;10ms</div>
          <div class="flow-arrow">↓ miss</div>
          <div class="flow-step">L3: CDN Origin Shield (regional aggregation node) — absorbs bursts before hitting GCS</div>
          <div class="flow-arrow">↓ miss</div>
          <div class="flow-step">L4: GCS Origin — authoritative tile store; returns tile and populates CDN cache for subsequent requests</div>
        </div>
        <div class="ans-label" style="margin-top:12px;">Cache Invalidation</div>
        <p>When a map region changes (new road, renamed street), a targeted CDN purge is issued for affected tile keys: all zoom levels and their parent tiles. The tile key naming convention includes a content-hash suffix, enabling hard cache breaks: /tiles/v2/{hash}/{z}/{x}/{y}.pbf.</p>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">16. Security</div>
  <div class="ref-body">
    <ul>
      <li><strong>API Key authentication:</strong> All Maps Platform API calls require an API key; keys are scoped to specific API types and restricted by HTTP referrer or IP address to prevent key theft</li>
      <li><strong>OAuth2 for personal data:</strong> Accessing saved places, timeline (location history), and sharing location requires OAuth2 user consent with explicit scopes</li>
      <li><strong>Tile URL signing:</strong> Tile URLs are signed with HMAC-SHA256 using the API key secret to prevent hotlinking and enable per-key billing; signed URLs expire after a configurable window</li>
      <li><strong>Privacy — probe data:</strong> GPS probe data is anonymized and aggregated before storage; individual device traces are not retained in identifiable form; users can opt out via Google account settings</li>
      <li><strong>TLS everywhere:</strong> TLS 1.3 on all client-server and service-to-service communication; HSTS enforced for web clients</li>
      <li><strong>Rate limiting:</strong> Per-API-key token bucket at API Gateway; abuse detection (abnormal geocoding patterns, bulk tile scraping) triggers automatic key suspension</li>
      <li><strong>Map editing anti-spam:</strong> User-submitted map edits go through automated abuse scoring (ML model on edit patterns) before being applied; coordinated vandalism campaigns are flagged for manual review</li>
      <li><strong>DDoS protection:</strong> Google's global network infrastructure provides inherent DDoS absorption; IP reputation filtering at edge; CAPTCHAs for unusual geocoding volume from a single IP</li>
      <li><strong>Data sovereignty:</strong> In certain jurisdictions (China, Russia), map data must be hosted and served from local infrastructure; separate GCS buckets and CDN configurations per regulatory region</li>
    </ul>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">17. Scalability Patterns</div>
  <div class="ref-body">
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">G</div><div class="principle-name">Geographic Sharding</div><p>Every service (Routing, Traffic, Geocoding) partitions by H3 cell or geographic region. Routing Service loads only the relevant regional graph; Traffic Service Redis clusters shard by segment_id hash into regional groups.</p></div>
      <div class="principle-card"><div class="principle-icon">S</div><div class="principle-name">Stateless Services</div><p>All API-serving microservices are stateless — the entire state lives in Bigtable, Spanner, Redis, or GCS. Services auto-scale on CPU/QPS with HPA; no sticky sessions needed.</p></div>
      <div class="principle-card"><div class="principle-icon">C</div><div class="principle-name">CDN-First for Tiles</div><p>The entire tile serving path is designed so that &gt;99.5% of requests never reach the application tier — served from CDN edge. This is what makes 25M tile req/sec feasible without a proportional server fleet.</p></div>
      <div class="principle-card"><div class="principle-icon">P</div><div class="principle-name">Precomputation</div><p>Contraction Hierarchies, historical traffic speed models, and tile renders are all precomputed offline. The serving path only does lightweight lookups and overlays — never re-computes expensive operations at request time.</p></div>
      <div class="principle-card"><div class="principle-icon">A</div><div class="principle-name">Async Probe Pipeline</div><p>Probe data never hits the routing serving path synchronously. A Kafka-buffered pipeline decouples high-volume probe ingestion from the lower-volume route query serving, preventing probe storms from degrading navigation latency.</p></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">18. Fault Tolerance &amp; Reliability</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Pattern</div><div>Applied To</div><div>Behavior</div></div>
      <div class="pt-row"><div class="pt-name">Graceful degradation — traffic</div><div>Redis Traffic Cache unavailable</div><div>Routing Service falls back to historical average speeds for the time-of-day; routing still works, ETAs slightly less accurate; no user-visible error</div></div>
      <div class="pt-row"><div class="pt-name">Graceful degradation — routing</div><div>Routing Service overloaded</div><div>API Gateway returns cached route from last similar query (stale by up to 2 min) with a "traffic may have changed" disclaimer rather than a 503</div></div>
      <div class="pt-row"><div class="pt-name">Offline mode</div><div>Device loses internet mid-navigation</div><div>On-device tile cache + on-device routing (pre-downloaded route graph for corridor) keeps navigation functional for 30-60 min without connectivity</div></div>
      <div class="pt-row"><div class="pt-name">Circuit breaker</div><div>Spanner (Places DB) calls from Places Service</div><div>After 5 consecutive failures: open circuit, return cached places from Redis for 60s; half-open probe every 10s</div></div>
      <div class="pt-row"><div class="pt-name">Bulkhead</div><div>Traffic Service Dataflow workers</div><div>Separate worker pools per region (North America, Europe, Asia-Pacific); a probe data surge in one region doesn't starve others</div></div>
      <div class="pt-row"><div class="pt-name">Multi-region active-active</div><div>All serving services</div><div>Each region (us-central1, europe-west1, asia-east1) has a full independent stack; GeoDNS routes users to nearest region; regional failure is transparent to users outside that region</div></div>
      <div class="pt-row"><div class="pt-name">Idempotent tile renders</div><div>Tile generation pipeline</div><div>Same input map data always produces same tile output; failed render jobs can be safely retried without producing inconsistent tiles</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">19. Monitoring &amp; Observability</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Key SLOs &amp; Alerts</div>
        <ul>
          <li><strong>Route computation P99 latency &lt;500ms</strong> — paged if sustained &gt;1s for 5 min</li>
          <li><strong>Tile CDN hit ratio &gt;99.5%</strong> — alert if drops below 98% (may indicate CDN misconfiguration or mass invalidation)</li>
          <li><strong>Traffic freshness</strong>: avg segment last-updated lag &lt;2 min — alert if &gt;5 min (Kafka consumer lag growing)</li>
          <li><strong>Geocoding success rate &gt;99%</strong> — alert if ZERO_RESULTS rate spikes above 5% (may indicate Elasticsearch index issue)</li>
          <li><strong>Probe ingestion lag</strong>: Kafka consumer group lag on probe-data &lt;10,000 messages — alert if growing (stream processor behind)</li>
          <li><strong>ETA mean absolute error &lt;5%</strong> — monitored in batch hourly against actual trip completion data</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Observability Stack</div>
        <ul>
          <li><strong>Metrics:</strong> Google Cloud Monitoring (Prometheus-compatible); custom metrics for map-specific SLOs</li>
          <li><strong>Distributed Tracing:</strong> Cloud Trace / OpenTelemetry — critical for tracking a route request across Gateway → Routing → Traffic → ETA service hops; p99 breakdown per hop</li>
          <li><strong>Logging:</strong> Cloud Logging with structured JSON logs; sampled full request logs at 0.1% for debugging; errors at 100%</li>
          <li><strong>Alerting:</strong> PagerDuty integration for SLO breaches; severity tiered (P1 = navigation down, P2 = latency degraded, P3 = single region impacted)</li>
          <li><strong>Canary metrics:</strong> New routing algorithm deploys monitor ETA accuracy delta vs control group in real time before full rollout</li>
          <li><strong>Error budget tracking:</strong> 99.99% availability = 52 min/year error budget; tracked weekly</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">20. Deployment Architecture</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Multi-Region Active-Active</div>
        <p>Google Maps runs in at least 4 geographic regions (North America, Europe, Asia-Pacific, South America). GeoDNS routes API requests to the lowest-latency region. Each region is an independent full stack — failure of one region doesn't affect others. Cross-region data synchronization (Spanner globally distributed, Bigtable multi-region replication) ensures consistent place data across regions.</p>
        <div class="ans-label" style="margin-top:12px;">Kubernetes (GKE)</div>
        <div class="code-box">Routing Service Deployment:
  replicas: 500 (per region)
  HPA: target CPU 60%, min 200 / max 2000
  resources:
    requests: { cpu: "4", memory: "32Gi" }  # graph in RAM
    limits:   { cpu: "8", memory: "64Gi" }
  readinessProbe: GET /healthz (checks graph loaded)
  rollingUpdate:
    maxSurge: 20%
    maxUnavailable: 0%  # zero-downtime for routing

Traffic Service Deployment:
  replicas: 200 (per region)
  HPA: target Kafka consumer lag &lt; 1000 msgs
  partitioned: by H3 region (affinity rules)</div>
      </div>
      <div>
        <div class="ans-label">Deployment Strategy</div>
        <ul>
          <li><strong>Routing algorithm updates:</strong> Canary deploy to 1% of pods; compare ETA accuracy and latency vs control; 48h soak before full rollout</li>
          <li><strong>Map data updates:</strong> Blue-green at the CDN layer — new tile version deployed to {version_hash} path while old version remains live; switch via CDN routing rule once validation passes</li>
          <li><strong>Traffic model (ML):</strong> Shadow mode first — new model computes ETAs in parallel without serving them; accuracy compared offline before promotion</li>
          <li><strong>CH graph reloads:</strong> Pods reload graph in a rolling fashion; each pod holds old graph while loading new; never serves with a partial graph (readiness probe gates traffic)</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">CDN Configuration</div>
        <p>Tile CDN is managed via Infrastructure-as-Code (Terraform); edge policies for cache TTLs, origin routing, and geo-blocking (data sovereignty) are versioned and deployed via CI/CD. CDN configuration changes are rolled out gradually across PoPs to detect edge-case caching bugs.</p>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">21. Performance Optimisations</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Optimisation</div><div>Component</div><div>Impact</div></div>
      <div class="pt-row"><div class="pt-name">Contraction Hierarchies pre-processing</div><div>Routing Service</div><div>Reduces Dijkstra's O(V log V) to ~milliseconds on the 800M-node graph; the single most important routing performance decision</div></div>
      <div class="pt-row"><div class="pt-name">Encoded polylines</div><div>Routing API response</div><div>Compresses 1000 lat/lng pairs from 30KB JSON to ~2KB encoded string — 15× response size reduction</div></div>
      <div class="pt-row"><div class="pt-name">Protocol Buffers (PBF)</div><div>Vector tile format, internal service calls</div><div>3-5× smaller than JSON equivalent; faster serialization/deserialization than JSON at tile-serving scale</div></div>
      <div class="pt-row"><div class="pt-name">HMM map matching batching</div><div>Probe data stream processor</div><div>Batching 100 GPS points before map matching allows Viterbi algorithm to run once per batch vs 100× individually</div></div>
      <div class="pt-row"><div class="pt-name">Tile pre-fetch along route</div><div>Mobile client</div><div>Client pre-fetches next 3km of route corridor tiles while current 1km is displayed; eliminates tile-load stall during navigation</div></div>
      <div class="pt-row"><div class="pt-name">Bigtable row key design</div><div>Traffic history reads</div><div>Row key {cell_id}#{timestamp_desc} enables reverse chronological scans for "latest N readings" without full scan</div></div>
      <div class="pt-row"><div class="pt-name">Redis pipeline batching</div><div>Routing Service (traffic overlay)</div><div>Fetching 500 segment speeds for a route via a single Redis MGET pipeline vs 500 individual GETs reduces round trips by 500×</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">22. Cost Optimisation</div>
  <div class="ref-body">
    <ul>
      <li><strong>CDN absorbs tile cost:</strong> Without CDN, 25M tile req/sec would require an enormous GCS egress bill; CDN caching reduces GCS reads to ~0.5% of total tile requests (only cache misses), saving millions of dollars per day in storage egress costs</li>
      <li><strong>Tile compression:</strong> WebP tiles are 30% smaller than PNG at equivalent quality; PBF vector tiles are 70% smaller than equivalent raster PNG; both directly reduce CDN storage and bandwidth costs</li>
      <li><strong>Tiered storage for probe history:</strong> Raw probe data in Bigtable for 7 days (hot); aggregated speed statistics in BigQuery (cold) for long-term retention — BigQuery storage is 10× cheaper than Bigtable</li>
      <li><strong>Preemptible VMs for batch jobs:</strong> CH pre-processing nightly, tile rendering batch, and ML training all run on preemptible/spot instances — 60-80% cost reduction vs on-demand</li>
      <li><strong>Committed use discounts:</strong> Routing Service (always-on baseline capacity) committed 3-year contracts; burst capacity stays on-demand</li>
      <li><strong>H3 cell-based traffic aggregation:</strong> Storing aggregated speed per H3 cell-hour combination requires far less storage than raw per-probe records, while still enabling accurate historical traffic models</li>
      <li><strong>Right-sizing routing pods:</strong> The high memory requirement (32GB+ for road graph) is real but fixed per pod — avoid over-provisioning CPU (routing computation is memory-bound, not CPU-bound after CH preprocessing)</li>
    </ul>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">23. Disaster Recovery</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Component</div><div>RTO</div><div>RPO</div><div>Strategy</div></div>
      <div class="pt-row"><div class="pt-name">Route Serving</div><div>&lt;30s (automatic failover)</div><div>0 — stateless service</div><div>GeoDNS active-active across regions; second region already warm and serving; health check removes failed region from DNS within 30s</div></div>
      <div class="pt-row"><div class="pt-name">Spanner (Places DB)</div><div>&lt;1 min (automatic)</div><div>0 — synchronous multi-region replication</div><div>Spanner's global distribution means a regional failure just re-routes reads/writes to next region; no manual intervention</div></div>
      <div class="pt-row"><div class="pt-name">Bigtable (Road Graph)</div><div>&lt;5 min (cluster failover)</div><div>~1 min — async replication</div><div>Bigtable multi-cluster routing; failover to replica cluster; up to 1 min of recent writes lost from failed primary cluster</div></div>
      <div class="pt-row"><div class="pt-name">Redis Traffic Cache</div><div>&lt;2 min (replica promotion)</div><div>~5 min lag (TTL-based)</div><div>Redis Sentinel / Cluster promotes replica; lost traffic data self-heals as probe stream refills cache within 5 min; routing degrades to historical traffic during gap</div></div>
      <div class="pt-row"><div class="pt-name">GCS Tile Storage</div><div>N/A — multi-region bucket</div><div>0 — synchronous replication</div><div>GCS multi-region buckets provide automatic geo-redundancy; no tile data loss even under regional GCS outage</div></div>
      <div class="pt-row"><div class="pt-name">CH Graph (computed artifact)</div><div>4-8 hours (rebuild)</div><div>N/A — recomputed from Bigtable</div><div>CH is a derived artifact rebuilt nightly; in a full-loss scenario it can be recomputed from the road graph stored in Bigtable within ~4h on a large Dataflow cluster</div></div>
    </div>
    <div class="tip-box" style="margin-top:10px;">✅ The device offline cache is the last line of DR for active navigation — a user mid-drive with 30-60 min of pre-cached tiles can complete their journey even if Google Maps infrastructure is entirely unreachable. Design the mobile client DR, not just the server DR.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">24. Migration Strategy</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Phase 1 — Monolith to Service Split</div>
        <p>Starting from a monolithic mapping backend, extract services in order of independence and blast-radius isolation:</p>
        <ol>
          <li><strong>Tile Service first</strong> — purely stateless, read-only, easiest to extract; CDN sits in front immediately to reduce monolith tile-serving load</li>
          <li><strong>Geocoding Service second</strong> — self-contained Elasticsearch index, well-defined API boundary</li>
          <li><strong>Places Service third</strong> — Spanner migration from monolith DB; dual-write period for safety</li>
          <li><strong>Traffic Service fourth</strong> — requires Kafka introduction; highest operational complexity</li>
          <li><strong>Routing Service last</strong> — must be coupled with Traffic Service (needs live speed feed); split only after Traffic Service stable</li>
        </ol>
      </div>
      <div>
        <div class="ans-label">Phase 2 — Traffic Data Migration to Streaming</div>
        <p>Moving from polling (batch scripts reading traffic sensors every 5 min) to streaming (Kafka probe pipeline) is the most disruptive migration:</p>
        <ul>
          <li>Deploy Kafka alongside legacy batch job</li>
          <li>Dual-write: traffic updates go to both legacy DB and Kafka stream simultaneously for 2 weeks</li>
          <li>Validate streaming-derived speeds match legacy batch speeds within acceptable error margin</li>
          <li>Switch Routing Service reads from legacy traffic DB to Redis (populated from Kafka stream)</li>
          <li>Decommission legacy batch job after 2-week monitoring period</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Phase 3 — Road Graph Scale-Up</div>
        <p>As road coverage expands (from a country to continental to global), the in-memory graph approach must shift from a single large server to partitioned regional instances with a "global stitching" service for cross-region routes — implemented incrementally as coverage grows into new geographies.</p>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">25. Interview Questions &amp; Answers</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Question</div><div>Answer</div><div>Key Insight</div></div>
      <div class="pt-row"><div class="pt-name">How does Google compute a driving route across a 800M-node road graph in under 500ms?</div><div>Contraction Hierarchies (CH): pre-process the graph offline by iteratively contracting low-importance nodes and adding shortcut edges. At query time, bidirectional A* only needs to explore a tiny fraction of nodes (those at the "top" of the hierarchy), achieving millisecond performance.</div><div>CH reduces the effective search space from millions of nodes to thousands — precomputation is the key, not brute-force parallelism.</div></div>
      <div class="pt-row"><div class="pt-name">How do you incorporate real-time traffic into routing?</div><div>Traffic speeds (as speed ratios relative to free-flow) are stored in Redis keyed by segment_id with a 5-minute TTL. At query time, the Routing Service fetches speeds for the relevant region via Redis MGET pipeline and overlays them on CH edge weights. This is purely additive — the CH structure itself remains static; only the edge weights change.</div><div>Separating the static graph structure (CH) from the dynamic weights (traffic) is the key design — it allows traffic updates without expensive CH reprocessing.</div></div>
      <div class="pt-row"><div class="pt-name">How do you serve 25M tile requests per second?</div><div>CDN-first architecture: tiles are pre-rendered offline and stored in GCS. CDN edge nodes (200+ PoPs) serve &gt;99.5% of tile requests directly from edge cache. The origin (GCS → application tier) only sees the remaining 0.5%. No application server can handle 25M req/sec; the CDN effectively is the tile serving tier.</div><div>For static precomputable data at huge scale, the answer is always a CDN-first architecture — application servers are the last resort, not the first.</div></div>
      <div class="pt-row"><div class="pt-name">How does Google derive live traffic from user phones?</div><div>Android devices (with consent) send batch GPS probes (location, speed, heading) every 30-60 seconds to a probe ingestion API. A stream processor (Dataflow) runs Hidden Markov Model map matching to snap GPS coords to road segments, then aggregates median speed per segment per 60-second window. Results update Redis with a 5-minute TTL per segment.</div><div>HMM map matching is non-negotiable — a naive nearest-road snap produces wrong results at intersections and parallel roads, corrupting traffic data.</div></div>
      <div class="pt-row"><div class="pt-name">How do you handle a region with no probe data?</div><div>Fall back to a historical speed model: BigQuery stores years of aggregated speeds per (segment_id, hour_of_day, day_of_week, month). An ML model (gradient boosted trees) blends available probe data with historical patterns, weighted by probe data confidence score. Rural roads with zero probes use pure historical averages.</div><div>No system can rely solely on live probe data — sparse coverage would make routing unusable in rural areas. Historical fallback is a first-class design requirement.</div></div>
      <div class="pt-row"><div class="pt-name">Design the ETA prediction system</div><div>ETA uses a gradient boosted tree model (or deep learning) with features: route distance, road classes on route, current traffic speeds per segment, day-of-week/hour patterns, weather (API), special events, historical ETA accuracy for this O→D pair. Model is trained offline on billions of historical trips (actual vs predicted travel time). Online serving: model loaded into ETA Service pods; inference in &lt;10ms per route.</div><div>ETA is an ML problem, not a formula — the complex interaction of traffic, road class, and time patterns is best learned from data, not hand-engineered.</div></div>
      <div class="pt-row"><div class="pt-name">How do you ensure map tile consistency across adjacent tiles?</div><div>All tiles in a release batch are rendered from the same versioned snapshot of the road graph data. Tile keys include a content-hash or version suffix. Client always fetches tiles from the same version within a session. CH graph updates and tile releases are coordinated via the map-change-events Kafka topic: tile renders must ACK before routing graph is updated to prevent routing onto tiles that haven't rendered yet.</div><div>Consistency between tiles (rendered artifact) and routing (live computation) is an easy-to-miss cross-service consistency requirement — it's not enough to just make each service internally consistent.</div></div>
      <div class="pt-row"><div class="pt-name">How do you handle a major incident that invalidates millions of active routes?</div><div>Traffic Service detects the incident (speed cluster + user reports) and publishes to incident-events Kafka topic. Notification Service consumes and fans out push notifications to active navigation sessions whose current polyline intersects the incident segment (geospatial query). Clients re-request routing on notification receipt. Routing pods automatically return new optimal routes as the incident's traffic impact propagates into Redis speed updates.</div><div>The reroute path must be fully automated — in a major incident, thousands of users need rerouting simultaneously; manual intervention is impossible at this scale.</div></div>
      <div class="pt-row"><div class="pt-name">What is the database choice for the Places data and why?</div><div>Cloud Spanner: globally distributed SQL with external consistency. Places need ACID multi-column updates (name, hours, status must be atomic), support SQL joins for complex POI queries, and be globally replicated so a user in Tokyo gets the same data as a user in New York. Spanner is the only database that provides all three at global scale — regular PostgreSQL/MySQL would need application-level sharding and lose global consistency guarantees.</div><div>For truly global consistent relational data, Spanner is the correct choice — its higher cost vs PostgreSQL is justified by eliminating custom sharding complexity and providing global consistency automatically.</div></div>
      <div class="pt-row"><div class="pt-name">How do you test a new routing algorithm before full rollout?</div><div>Three-stage: (1) Offline evaluation on a historical dataset of billions of trips — compare new algorithm's predicted ETA against actual travel time vs old algorithm. (2) Shadow mode in production — new algorithm computes routes in parallel without serving them; accuracy delta vs old logged for 48h. (3) Canary deploy to 1% of traffic with A/B test — measure ETA accuracy, latency P99, and user engagement (did they follow the route? did they reroute?). Full rollout only if all three stages pass.</div><div>Never A/B test routing algorithms on live users without offline validation first — a bad routing change could send thousands of users into gridlock.</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">26. Trade-off Summary</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Decision</div><div class="dt-yes">Chosen &amp; Why</div><div class="dt-no">Rejected Alternative &amp; Trade-off</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Routing algorithm</div><div>Contraction Hierarchies + bidirectional A*: millisecond queries on billion-node graph via offline preprocessing</div><div>Plain Dijkstra: correct but O(V log V) = ~seconds on full graph; ALT (A* with Landmarks): faster than Dijkstra but 10× slower than CH at global scale</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Tile format</div><div>Vector tiles (PBF): 3-5× smaller than raster; client renders with WebGL enabling smooth zoom, label rotation, and style changes without re-fetching</div><div>Raster tiles (PNG): simpler client, no WebGL required; 3-5× larger payload; no real-time style changes; must re-render entire tile for any visual change</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Traffic data storage</div><div>Redis (live, 5-min TTL) + BigQuery (historical): Redis gives sub-ms routing overlay reads; BigQuery handles petabyte historical analysis without impacting Redis</div><div>Single PostgreSQL for all traffic: write-heavy probe ingestion would saturate any SQL database; no separation between hot live data and cold historical data</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Places DB</div><div>Cloud Spanner: globally distributed SQL, external consistency, supports complex POI joins without application-level sharding</div><div>Cassandra: excellent write throughput but eventual consistency causes periods where different regions return different place data; no SQL joins</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Probe data delivery guarantee</div><div>At-least-once: duplicate probes are harmless (aggregated with median); simpler and cheaper than exactly-once; avoids expensive idempotency checks at 24M writes/sec</div><div>Exactly-once: unnecessary complexity at this scale; duplicate probe = same road segment, same speed reading — median aggregation makes duplicates invisible in the output</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Route cache TTL</div><div>2 minutes maximum: stale routes during incidents direct users into gridlock — correctness trumps cache hit ratio for safety-critical navigation data</div><div>10-30 minutes: would dramatically improve cache hit ratio for common commute routes but risks routing users through accidents or closed roads announced after cache was populated</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">ETA computation</div><div>ML model (gradient boosted trees / deep learning): captures complex interaction of traffic, road class, time-of-day, weather; ETA accuracy significantly better than formula-based approaches</div><div>Formula-based (distance / average_speed): simple, debuggable, no model drift; but systematically wrong for complex urban routing with traffic interaction effects; can't incorporate weather or events</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">27. Key Takeaways</div>
  <div class="ref-body">
    <div class="tip-box">
      <ul>
        <li><strong>Precomputation is the core scaling strategy:</strong> Contraction Hierarchies (offline graph preprocessing), pre-rendered tiles (offline rendering pipeline), and historical traffic models are all precomputed artifacts — the serving path does only lightweight lookups and overlays, never expensive recomputation at request time.</li>
        <li><strong>CDN-first for tile serving is non-negotiable:</strong> 25M tile req/sec is only achievable because &gt;99.5% of requests never reach any application server. The CDN layer is architecturally as important as the application tier for Google Maps specifically.</li>
        <li><strong>The routing and traffic pipelines are deliberately decoupled:</strong> Traffic probe ingestion (24M writes/sec via Kafka) is fully asynchronous from route query serving. This is what allows both to scale independently — a traffic data surge doesn't degrade route query latency.</li>
        <li><strong>Consistency requirements differ dramatically by data type:</strong> Traffic speeds can be eventually consistent (5-min TTL, stale data just means slightly wrong ETA); Places need strong consistency (an incorrect business status is a real user harm); Map tile versions need causal consistency (adjacent tiles must come from the same render batch).</li>
        <li><strong>Device-side caching is a first-class architectural component:</strong> On-device tile cache, on-device route graph, and offline navigation mode aren't just nice-to-haves — they are the last line of reliability for active navigation and the key to sub-50ms tile rendering in poor connectivity areas.</li>
        <li><strong>Map matching (HMM) is the most underappreciated complexity:</strong> Without accurate GPS probe-to-road-segment matching, all traffic data is noise. The Hidden Markov Model that converts raw GPS traces to road segment speeds is as critical as the routing algorithm itself.</li>
        <li><strong>Geographic partitioning at every layer:</strong> H3 cells as Kafka partition keys, regional Routing Service instances, geographically sharded Redis clusters — data locality reduces cross-region traffic, improves cache hit rates, and isolates blast radius. Pick the geographic partition key early; it's the hardest thing to change later.</li>
      </ul>
    </div>
  </div>
</div>
`;
