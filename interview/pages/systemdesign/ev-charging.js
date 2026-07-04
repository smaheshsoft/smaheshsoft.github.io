window.Pages['sd-ev-charging'] = `
<div class="page-header">
  <div class="breadcrumb">System Design → EV Charging Station Network</div>
  <h1>EV Charging Station Network</h1>
  <div class="tag-grid">
    <span class="tag">OCPP Protocol</span>
    <span class="tag">Real-time</span>
    <span class="tag">Geo-search</span>
    <span class="tag">IoT</span>
    <span class="tag">Smart Grid</span>
    <span class="tag">Kafka</span>
    <span class="tag">TimescaleDB</span>
    <span class="tag">Redis</span>
  </div>
</div>

<!-- SECTION 0: Architecture Diagram -->
<div class="ref-section">
  <div class="ref-title">System Architecture Diagram</div>
  <div class="ref-body" style="overflow-x:auto;">
    <svg viewBox="0 0 900 420" style="width:100%;max-width:900px;display:block;margin:0 auto;border-radius:10px;" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#4b5563"/>
        </marker>
      </defs>
      <rect width="900" height="420" fill="#0d1117" rx="12"/>

      <!-- Layer labels -->
      <text x="14" y="70" font-size="11" fill="#888" font-family="monospace">CLIENT</text>
      <text x="14" y="160" font-size="11" fill="#888" font-family="monospace">GATEWAY</text>
      <text x="14" y="265" font-size="11" fill="#888" font-family="monospace">SERVICES</text>
      <text x="14" y="375" font-size="11" fill="#888" font-family="monospace">DATA</text>

      <!-- Layer separator lines -->
      <line x1="80" y1="95" x2="880" y2="95" stroke="#1e293b" stroke-width="1"/>
      <line x1="80" y1="185" x2="880" y2="185" stroke="#1e293b" stroke-width="1"/>
      <line x1="80" y1="300" x2="880" y2="300" stroke="#1e293b" stroke-width="1"/>

      <!-- CLIENT LAYER -->
      <!-- EV Mobile App -->
      <rect x="90" y="42" width="110" height="44" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="145" y="60" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="11" font-weight="bold">📱 EV App</text>
      <text x="145" y="75" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">iOS / Android</text>

      <!-- Web Dashboard -->
      <rect x="220" y="42" width="110" height="44" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="275" y="60" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="11" font-weight="bold">🌐 Web UI</text>
      <text x="275" y="75" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">Operator Dashboard</text>

      <!-- Charger Hardware -->
      <rect x="350" y="42" width="120" height="44" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="410" y="60" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="11" font-weight="bold">⚡ Charger HW</text>
      <text x="410" y="75" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">OCPP 2.0.1 Device</text>

      <!-- Fleet Management -->
      <rect x="490" y="42" width="120" height="44" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="550" y="60" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="11" font-weight="bold">🚛 Fleet Mgmt</text>
      <text x="550" y="75" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">3rd Party API</text>

      <!-- GATEWAY LAYER -->
      <!-- API Gateway -->
      <rect x="150" y="108" width="130" height="44" rx="8" fill="#1a2d20" stroke="#4ade80" stroke-width="1.5"/>
      <text x="215" y="126" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="11" font-weight="bold">🔀 API Gateway</text>
      <text x="215" y="141" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">Kong / Rate Limit</text>

      <!-- OCPP Gateway -->
      <rect x="320" y="108" width="130" height="44" rx="8" fill="#1a2d20" stroke="#4ade80" stroke-width="1.5"/>
      <text x="385" y="126" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="11" font-weight="bold">🔌 OCPP GW</text>
      <text x="385" y="141" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">WebSocket Server</text>

      <!-- Auth Service -->
      <rect x="490" y="108" width="120" height="44" rx="8" fill="#1a2d20" stroke="#4ade80" stroke-width="1.5"/>
      <text x="550" y="126" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="11" font-weight="bold">🔒 Auth Svc</text>
      <text x="550" y="141" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">JWT / OAuth2</text>

      <!-- SERVICES LAYER -->
      <!-- Station Discovery -->
      <rect x="90" y="200" width="115" height="44" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="147" y="218" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="11" font-weight="bold">📍 Discovery</text>
      <text x="147" y="233" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">Redis Geo / Search</text>

      <!-- Booking Service -->
      <rect x="220" y="200" width="115" height="44" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="277" y="218" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="11" font-weight="bold">📅 Booking</text>
      <text x="277" y="233" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">Reservation Svc</text>

      <!-- Session Management -->
      <rect x="350" y="200" width="115" height="44" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="407" y="218" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="11" font-weight="bold">⚡ Session</text>
      <text x="407" y="233" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">OCPP State Mgmt</text>

      <!-- Payment Service -->
      <rect x="480" y="200" width="115" height="44" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="537" y="218" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="11" font-weight="bold">💳 Payment</text>
      <text x="537" y="233" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">Stripe / Roaming</text>

      <!-- Energy Management -->
      <rect x="610" y="200" width="120" height="44" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="670" y="218" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="11" font-weight="bold">🔋 Energy Mgmt</text>
      <text x="670" y="233" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">Smart Grid / V2G</text>

      <!-- Analytics -->
      <rect x="745" y="200" width="115" height="44" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="802" y="218" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="11" font-weight="bold">📊 Analytics</text>
      <text x="802" y="233" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">Usage &amp; Reports</text>

      <!-- Kafka -->
      <rect x="350" y="262" width="130" height="30" rx="8" fill="#2d2a1a" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="415" y="282" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="11" font-weight="bold">📨 Kafka Streams</text>

      <!-- DATA LAYER -->
      <!-- PostgreSQL -->
      <rect x="90" y="315" width="115" height="44" rx="8" fill="#1a2040" stroke="#60a5fa" stroke-width="1.5"/>
      <text x="147" y="333" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="11" font-weight="bold">🐘 PostgreSQL</text>
      <text x="147" y="348" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">Stations/Bookings</text>

      <!-- Redis -->
      <rect x="225" y="315" width="110" height="44" rx="8" fill="#2d1a1a" stroke="#f87171" stroke-width="1.5"/>
      <text x="280" y="333" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="11" font-weight="bold">⚡ Redis</text>
      <text x="280" y="348" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">Live Charger Status</text>

      <!-- Cassandra -->
      <rect x="355" y="315" width="115" height="44" rx="8" fill="#1a2040" stroke="#34d399" stroke-width="1.5"/>
      <text x="412" y="333" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="11" font-weight="bold">🗄 Cassandra</text>
      <text x="412" y="348" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">Session Telemetry</text>

      <!-- TimescaleDB -->
      <rect x="490" y="315" width="120" height="44" rx="8" fill="#1a2040" stroke="#60a5fa" stroke-width="1.5"/>
      <text x="550" y="333" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="11" font-weight="bold">📈 TimescaleDB</text>
      <text x="550" y="348" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">Energy Metrics</text>

      <!-- S3 / Object Store -->
      <rect x="630" y="315" width="110" height="44" rx="8" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="685" y="333" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="11" font-weight="bold">☁ S3 Store</text>
      <text x="685" y="348" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">Logs / Reports</text>

      <!-- Monitoring -->
      <rect x="760" y="315" width="110" height="44" rx="8" fill="#2d1f1a" stroke="#fb923c" stroke-width="1.5"/>
      <text x="815" y="333" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="11" font-weight="bold">📡 Grafana</text>
      <text x="815" y="348" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">Prometheus / OTel</text>

      <!-- ARROWS: Client → Gateway -->
      <line x1="145" y1="86" x2="200" y2="108" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="275" y1="86" x2="230" y2="108" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="390" y1="86" x2="370" y2="108" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="530" y1="86" x2="505" y2="108" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- ARROWS: Gateway → Services -->
      <line x1="190" y1="152" x2="160" y2="200" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="215" y1="152" x2="260" y2="200" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="360" y1="152" x2="390" y2="200" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="500" y1="152" x2="510" y2="200" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- ARROWS: Services → Kafka -->
      <line x1="407" y1="244" x2="407" y2="262" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="537" y1="244" x2="450" y2="262" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="670" y1="244" x2="490" y2="270" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- ARROWS: Services/Kafka → Data -->
      <line x1="147" y1="244" x2="147" y2="315" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="280" y1="244" x2="280" y2="315" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="415" y1="292" x2="415" y2="315" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="550" y1="244" x2="550" y2="315" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="802" y1="244" x2="802" y2="315" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
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
        <p>Design a global EV charging station network platform that enables EV drivers to discover nearby chargers, reserve charging slots, initiate and monitor sessions via OCPP protocol, process payments, and optimise energy distribution in real-time. The system must handle millions of IoT-connected chargers, real-time telemetry, and smart grid interactions.</p>
        <strong>Scale Numbers</strong>
        <table class="pattern-table" style="margin-top:8px;">
          <tr class="pt-header"><td>Metric</td><td>Value</td></tr>
          <tr class="pt-row"><td class="pt-name">Active charging stations</td><td>2 million globally</td></tr>
          <tr class="pt-row"><td class="pt-name">Charger connectors</td><td>8 million OCPP endpoints</td></tr>
          <tr class="pt-row"><td class="pt-name">Registered EV drivers</td><td>50 million users</td></tr>
          <tr class="pt-row"><td class="pt-name">Daily charging sessions</td><td>5 million/day</td></tr>
          <tr class="pt-row"><td class="pt-name">Peak concurrent sessions</td><td>500,000</td></tr>
          <tr class="pt-row"><td class="pt-name">OCPP telemetry events/sec</td><td>2 million/sec at peak</td></tr>
          <tr class="pt-row"><td class="pt-name">Station status updates/sec</td><td>400,000/sec</td></tr>
          <tr class="pt-row"><td class="pt-name">Search queries/sec</td><td>50,000 QPS</td></tr>
          <tr class="pt-row"><td class="pt-name">Payment transactions/day</td><td>5 million</td></tr>
          <tr class="pt-row"><td class="pt-name">Energy data points/day</td><td>10 billion time-series rows</td></tr>
        </table>
      </div>
      <div>
        <strong>Core Challenges</strong>
        <ul>
          <li>Managing millions of persistent OCPP WebSocket connections at scale</li>
          <li>Real-time charger availability with sub-second staleness guarantee</li>
          <li>Geo-spatial search over 2M+ stations with &lt;100ms latency</li>
          <li>Smart load balancing across chargers and grid capacity constraints</li>
          <li>Distributed session state across OCPP gateway cluster</li>
          <li>Roaming interoperability (OCPI protocol between networks)</li>
          <li>Fault-tolerant payment with idempotent billing</li>
          <li>High-cardinality time-series energy telemetry storage</li>
        </ul>
        <strong>Functional Requirements</strong>
        <ul>
          <li>Discover nearby chargers with filters (speed, connector type, availability)</li>
          <li>Reserve a charger up to 30 minutes in advance</li>
          <li>Start/stop/monitor charging sessions via OCPP</li>
          <li>Real-time session status and energy delivered</li>
          <li>Multi-modal payments (card, wallet, RFID, app)</li>
          <li>Smart charging scheduling and V2G (vehicle-to-grid)</li>
          <li>Operator dashboard for station management and analytics</li>
          <li>Roaming across partner networks (OCPI/eMSP integration)</li>
        </ul>
        <strong>Non-Functional Requirements</strong>
        <table class="pattern-table" style="margin-top:8px;">
          <tr class="pt-header"><td>Attribute</td><td>Target</td></tr>
          <tr class="pt-row"><td class="pt-name">Availability</td><td>99.99% (52 min downtime/year)</td></tr>
          <tr class="pt-row"><td class="pt-name">Session start latency</td><td>&lt;2 seconds end-to-end</td></tr>
          <tr class="pt-row"><td class="pt-name">Charger status freshness</td><td>&lt;5 seconds stale</td></tr>
          <tr class="pt-row"><td class="pt-name">Search latency</td><td>&lt;100ms p99</td></tr>
          <tr class="pt-row"><td class="pt-name">Telemetry ingestion lag</td><td>&lt;1 second</td></tr>
          <tr class="pt-row"><td class="pt-name">Payment settlement</td><td>&lt;30 seconds</td></tr>
          <tr class="pt-row"><td class="pt-name">Data durability</td><td>99.999999% (11 nines)</td></tr>
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
      <tr class="pt-row"><td class="pt-name">OCPP WS connections</td><td>8M connectors, 1 WS each</td><td>8,000,000 persistent WebSockets</td><td>8M concurrent connections</td></tr>
      <tr class="pt-row"><td class="pt-name">OCPP heartbeat load</td><td>8M connectors × 1 heartbeat/30s</td><td>8,000,000 / 30 = 267,000/s</td><td>~270K msgs/sec baseline</td></tr>
      <tr class="pt-row"><td class="pt-name">Session telemetry</td><td>500K sessions × 1 sample/10s × 4 metrics</td><td>500K × 0.1 × 4</td><td>200K events/sec peak</td></tr>
      <tr class="pt-row"><td class="pt-name">Total Kafka throughput</td><td>270K + 200K + 50K status events</td><td>520K msgs/sec</td><td>~2 GB/sec ingress</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis memory (charger status)</td><td>8M connectors × 200 bytes each</td><td>8,000,000 × 200B</td><td>~1.6 GB in RAM</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis Geo index</td><td>2M stations × 64 bytes geo hash</td><td>2,000,000 × 64B</td><td>~128 MB per geo set</td></tr>
      <tr class="pt-row"><td class="pt-name">TimescaleDB daily writes</td><td>500K sessions × 360 rows/session</td><td>500K × 360 = 180M rows/day</td><td>~10 TB/year compressed</td></tr>
      <tr class="pt-row"><td class="pt-name">Cassandra session data</td><td>5M sessions/day × 5KB per session</td><td>5,000,000 × 5KB × 365</td><td>~9 TB/year</td></tr>
      <tr class="pt-row"><td class="pt-name">PostgreSQL bookings</td><td>5M sessions/day × 1KB row</td><td>5,000,000 × 1KB × 365</td><td>~1.8 TB/year</td></tr>
      <tr class="pt-row"><td class="pt-name">OCPP Gateway servers</td><td>8M WS connections, 50K/server</td><td>8,000,000 / 50,000</td><td>160 gateway nodes (4-core each)</td></tr>
      <tr class="pt-row"><td class="pt-name">Kafka brokers</td><td>2 GB/sec, 150 MB/s per broker</td><td>2000 / 150</td><td>~15 brokers (replication factor 3)</td></tr>
      <tr class="pt-row"><td class="pt-name">Payment TPS</td><td>5M payments/day ÷ 86400s</td><td>5,000,000 / 86,400</td><td>~58 TPS avg, 580 TPS peak</td></tr>
    </table>
    <div class="tip-box" style="margin-top:12px;">
      <strong>Storage tiering:</strong> Hot data (last 7 days) in TimescaleDB with compression. Warm data (7-90 days) in S3 Parquet via continuous aggregate. Cold data (&gt;90 days) archived to S3 Glacier at ~$0.004/GB/month.
    </div>
  </div>
</div>

<!-- SECTION 3: APIs -->
<div class="ref-section">
  <div class="ref-title">3. API Design</div>
  <div class="ref-body">
    <strong>REST API Endpoints</strong>
    <table class="pattern-table" style="margin-top:8px;">
      <tr class="pt-header"><td>Method</td><td>Endpoint</td><td>Description</td><td>Auth</td></tr>
      <tr class="pt-row"><td class="pt-name">GET</td><td>/v1/stations/nearby</td><td>Geo search — lat, lng, radius, filters (connector_type, min_power_kw, availability)</td><td>Bearer</td></tr>
      <tr class="pt-row"><td class="pt-name">GET</td><td>/v1/stations/{station_id}</td><td>Station detail, connector list, live availability</td><td>Bearer</td></tr>
      <tr class="pt-row"><td class="pt-name">POST</td><td>/v1/reservations</td><td>Create a reservation for a connector slot</td><td>Bearer</td></tr>
      <tr class="pt-row"><td class="pt-name">DELETE</td><td>/v1/reservations/{reservation_id}</td><td>Cancel a reservation</td><td>Bearer</td></tr>
      <tr class="pt-row"><td class="pt-name">POST</td><td>/v1/sessions/start</td><td>Start charging session (triggers OCPP RemoteStartTransaction)</td><td>Bearer</td></tr>
      <tr class="pt-row"><td class="pt-name">POST</td><td>/v1/sessions/{session_id}/stop</td><td>Stop charging session (triggers OCPP RemoteStopTransaction)</td><td>Bearer</td></tr>
      <tr class="pt-row"><td class="pt-name">GET</td><td>/v1/sessions/{session_id}</td><td>Get live session status, energy delivered, estimated cost</td><td>Bearer</td></tr>
      <tr class="pt-row"><td class="pt-name">GET</td><td>/v1/sessions/{session_id}/stream</td><td>SSE stream for live session telemetry updates</td><td>Bearer</td></tr>
      <tr class="pt-row"><td class="pt-name">GET</td><td>/v1/users/{user_id}/sessions</td><td>Session history with pagination</td><td>Bearer</td></tr>
      <tr class="pt-row"><td class="pt-name">POST</td><td>/v1/payments/intent</td><td>Create payment intent for a session</td><td>Bearer</td></tr>
      <tr class="pt-row"><td class="pt-name">GET</td><td>/v1/energy/stations/{id}/metrics</td><td>Energy consumption time-series with granularity param</td><td>API Key</td></tr>
      <tr class="pt-row"><td class="pt-name">POST</td><td>/v1/smart-charging/schedules</td><td>Set smart charging schedule (OCPP SetChargingProfile)</td><td>Operator</td></tr>
      <tr class="pt-row"><td class="pt-name">WS</td><td>/ocpp/{charger_id}</td><td>OCPP 2.0.1 WebSocket endpoint for charger hardware</td><td>mTLS + Basic Auth</td></tr>
    </table>
    <div style="margin-top:14px;">
      <strong>Example: Start Charging Session</strong>
      <div class="code-box">
POST /v1/sessions/start
Authorization: Bearer &lt;jwt_token&gt;
Idempotency-Key: &lt;uuid&gt;
Content-Type: application/json

{
  "connector_id": "conn_abc123",
  "reservation_id": "res_xyz789",   // optional
  "payment_method_id": "pm_stripe_xxx",
  "max_energy_kwh": 60,              // optional cap
  "target_soc_percent": 80           // optional target
}

// Response 202 Accepted
{
  "session_id": "sess_7f3a9b",
  "status": "PENDING",
  "charger_id": "charger_42",
  "connector_id": "conn_abc123",
  "started_at": null,
  "estimated_ready_at": "2025-03-01T14:05:00Z",
  "ocpp_transaction_id": "txn_89234"
}
      </div>
    </div>
    <div style="margin-top:10px;">
      <strong>API Design Standards</strong>
      <ul>
        <li><strong>Idempotency:</strong> All POST session/payment endpoints require Idempotency-Key header; stored in Redis with 24h TTL</li>
        <li><strong>Versioning:</strong> URL path versioning (/v1, /v2) with minimum 12-month deprecation notice</li>
        <li><strong>Rate limiting:</strong> Per-user 1000 req/min for discovery, 10 req/min for session start; per-charger OCPP unlimited</li>
        <li><strong>Pagination:</strong> Cursor-based (not offset) for all list endpoints using opaque cursor token</li>
        <li><strong>Webhooks:</strong> Operator webhooks for session_started, session_ended, payment_completed events with HMAC-SHA256 signature</li>
      </ul>
    </div>
  </div>
</div>

<!-- SECTION 4: High-Level Architecture -->
<div class="ref-section">
  <div class="ref-title">4. High-Level Architecture</div>
  <div class="ref-body">
    <div class="code-box">
[EV Mobile App] [Web Dashboard] [Fleet API]
        |                |              |
        +--------+-------+--------------+
                 |
         [Kong API Gateway]
         Rate Limit · JWT Auth · TLS termination
                 |
    +------------+------------+
    |            |            |
[Discovery]  [Booking]   [Session Svc]
   Svc          Svc       (OCPP Proxy)
    |            |            |
[Redis Geo]  [PostgreSQL]  [OCPP Gateway Cluster]
                             WebSocket 8M connections
                             OCPP 2.0.1 State Machine
                                  |
                          [Charger Hardware]
    |            |            |
    +------------+------------+--------+
                 |                     |
           [Kafka Cluster]       [Energy Mgmt Svc]
           Topics: sessions,      Smart Grid API
           telemetry, payments,   Load Balancing
           station-events         V2G Scheduling
                 |
    +------------+------------------+
    |            |                  |
[Cassandra]  [TimescaleDB]    [PostgreSQL]
 Session      Energy           Stations
 Telemetry    Metrics          Bookings
                               Users
    </div>
    <div class="two-col" style="margin-top:16px;">
      <div>
        <strong>OCPP Gateway Cluster</strong>
        <p>160 gateway nodes each holding ~50K persistent WebSocket connections from chargers. Stateful by design — each charger's OCPP session lives on one node. Consistent hashing ring determines which gateway owns a charger ID. Charger reconnect after node failure redirected via HAProxy layer.</p>
        <strong>Station Discovery Service</strong>
        <p>Redis GEOADD stores lat/lng for 2M stations. GEORADIUS queries with WITHDIST return nearby stations in &lt;5ms. Enriched with live connector availability from Redis Hash (connector_id → {status, power_kw, session_id}). Elasticsearch used for full-text station name/amenity search.</p>
        <strong>Smart Grid / Energy Management</strong>
        <p>Subscribes to real-time utility grid signals (OpenADR protocol). Dynamically adjusts charging rates via OCPP SetChargingProfile. Implements OCPP Smart Charging feature profile and ISO 15118 Plug &amp; Charge for V2G sessions.</p>
      </div>
      <div>
        <strong>Session Management Service</strong>
        <p>Acts as proxy between REST API and OCPP Gateway. Maintains distributed session state in Redis with TTL. On RemoteStartTransaction, validates reservation, authorises via OCPP Authorize request, tracks state machine transitions: PENDING → PREPARING → CHARGING → FINISHING → COMPLETED.</p>
        <strong>Payment Service</strong>
        <p>Integrates Stripe for card payments; eMSP roaming via OCPI 2.2.1 CDR exchange. Uses pre-auth hold at session start; final billing on StopTransaction. Idempotent charge via Stripe idempotency keys. Supports CPO-level pricing tariffs stored in PostgreSQL with per-connector overrides.</p>
        <strong>Analytics Service</strong>
        <p>Consumes Kafka topics for real-time dashboards via Apache Flink. Aggregates energy usage, revenue, utilisation rates into TimescaleDB continuous aggregates. Operator dashboards built on Grafana with custom EV-domain panels. Batch reports via Apache Spark on S3 Parquet.</p>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 5: Core Service — OCPP Session Management -->
<div class="ref-section">
  <div class="ref-title">5. Core Service: OCPP Session Management</div>
  <div class="ref-body">
    <p>The OCPP (Open Charge Point Protocol) session management layer is the most critical and technically unique component of the entire system. It bridges EV driver app actions with physical charger hardware using the OCPP 2.0.1 WebSocket-based protocol.</p>
    <div class="two-col">
      <div>
        <strong>OCPP 2.0.1 State Machine</strong>
        <div class="code-box">
Charger connects → WebSocket upgrade
→ BootNotification (charger reports firmware, model)
→ RegistrationStatus.Accepted

Per-connector state:
AVAILABLE → PREPARING → CHARGING
          → SUSPENDED_EV / SUSPENDED_EVSE
          → FINISHING → AVAILABLE
          → FAULTED / UNAVAILABLE

Key OCPP messages handled:
  Charger → Server:
    BootNotification, Heartbeat,
    StatusNotification, MeterValues,
    StartTransaction, StopTransaction,
    TransactionEvent (OCPP 2.0.1)
    Authorize, DiagnosticsStatusNotification

  Server → Charger:
    RemoteStartTransaction
    RemoteStopTransaction
    SetChargingProfile
    ReserveNow / CancelReservation
    TriggerMessage, Reset
    ChangeAvailability
        </div>
      </div>
      <div>
        <strong>OCPP Gateway Implementation</strong>
        <p>Each gateway node is a Node.js or Go process using an async event loop to handle 50K concurrent WebSocket connections efficiently. No blocking I/O — all OCPP message handling is non-blocking with coroutine/goroutine per message.</p>
        <strong>Distributed Session Routing</strong>
        <div class="code-box">
// Consistent hash ring for charger routing
charger_id → SHA256 → ring position
→ assigned gateway node IP

// When session svc sends RemoteStart:
1. Lookup charger_id → gateway_node in Redis
2. Forward HTTP/gRPC call to correct gateway
3. Gateway serialises to OCPP JSON over WS
4. Response flows back same path
5. Session svc stores txn state in Redis

// Failover: charger reconnect
- Charger WS reconnects to load balancer
- Consistent hash routes to same node
- If node down: remap to next node
- Session svc detects gap via heartbeat timeout
        </div>
        <strong>MeterValues Telemetry Pipeline</strong>
        <p>During CHARGING state, charger sends MeterValues every 30s: energy (kWh), power (kW), voltage, current, SoC%. Gateway forwards to Kafka topic <code>charger.meter-values</code>. Kafka consumer updates Redis (live session view) and Cassandra (durable telemetry). TimescaleDB hypertable stores energy time-series for billing and analytics.</p>
      </div>
    </div>
    <strong>Idempotency &amp; Exactly-Once Semantics</strong>
    <div class="code-box">
// Problem: RemoteStartTransaction might be sent twice due to retries
// Solution: OCPP requestId + session service idempotency key

1. REST API receives POST /v1/sessions/start with Idempotency-Key: uuid
2. Session svc checks Redis: SET idempotency:uuid NX EX 86400
   - If key existed → return cached response (no duplicate OCPP call)
   - If key set → proceed
3. OCPP RemoteStartTransaction sent with unique requestId
4. Gateway deduplicates by requestId per charger connection
5. StopTransaction idempotent: duplicate Stop is a no-op if already FINISHING
    </div>
  </div>
</div>

<!-- SECTION 6: Core Service — Station Discovery with Geo-search -->
<div class="ref-section">
  <div class="ref-title">6. Core Service: Station Discovery &amp; Geo-Search</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Redis Geo-Search Architecture</strong>
        <div class="code-box">
// Station index: Redis Sorted Set with geo encoding
GEOADD stations:global lng lat "station:123"

// Nearby search:
GEORADIUS stations:global 37.7749 -122.4194
  100 km WITHCOORD WITHDIST COUNT 50 ASC

// Connector-type filtered search:
// Separate geo sets per connector type:
GEOADD stations:CCS2 ...
GEOADD stations:CHAdeMO ...
GEOADD stations:Type2 ...

// Composite filter: intersect results in app layer
// or use Redis Search (RediSearch) module:
FT.SEARCH stations_idx
  "@location:[37.77 -122.41 50 km]
   @connector_types:{CCS2}
   @min_power:[50 +inf]
   @status:{AVAILABLE}"
  SORTBY distance ASC LIMIT 0 20
        </div>
      </div>
      <div>
        <strong>Live Availability Cache</strong>
        <div class="code-box">
// Redis Hash per station for live availability
HSET station:123:availability
  conn_1 "AVAILABLE"
  conn_2 "CHARGING"
  conn_3 "FAULTED"

// Updated by OCPP StatusNotification consumer
// TTL: no expiry (charger pushes updates)
// Staleness guard: heartbeat timeout = 5 min
//   → mark connector UNKNOWN if no heartbeat

// Availability summary (pre-aggregated):
HSET station:123:summary
  total_connectors 4
  available 2
  charging 1
  faulted 1
  last_updated 1709300000
        </div>
        <strong>Geospatial Search Tiers</strong>
        <ul>
          <li><strong>Tier 1:</strong> Redis GEORADIUS — sub-ms, up to 500-result set</li>
          <li><strong>Tier 2:</strong> Elasticsearch geo_distance query — full-text + geo, 10-50ms</li>
          <li><strong>Tier 3:</strong> PostgreSQL PostGIS — complex polygon queries, route-corridor search for navigation integration</li>
        </ul>
      </div>
    </div>
    <strong>Station Search Enrichment Pipeline</strong>
    <div class="flow-box">
      <div class="flow-step">User sends GET /v1/stations/nearby?lat=X&amp;lng=Y&amp;radius=10km&amp;connector=CCS2</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">API Gateway → Discovery Service validates params, applies user account preferences (favourite networks)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Redis GEORADIUS on stations:CCS2 sorted set — returns &lt;100 station IDs within radius ordered by distance</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Redis HMGET pipeline fetches live availability for all station IDs in single round-trip</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">PostgreSQL (read replica) fetches static station metadata — name, address, amenities, pricing tariff</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Merge + rank: distance, availability score, user rating, pricing tier. Return top 20 enriched results &lt;100ms total</div>
    </div>
  </div>
</div>

<!-- SECTION 7: Core Service — Smart Energy Management -->
<div class="ref-section">
  <div class="ref-title">7. Core Service: Smart Energy Management &amp; Grid Integration</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Smart Charging Architecture</strong>
        <p>The energy management service is the differentiator for modern CPOs (Charge Point Operators). It integrates with utility grid signals, demand response programmes, renewable energy forecasts, and vehicle SoC data to optimise charging schedules — reducing peak demand costs and enabling V2G revenue.</p>
        <div class="code-box">
// OCPP Smart Charging Flow:
1. Driver sets "charge by 7am" preference in app
2. Energy Mgmt Svc receives session_started event
3. Queries grid: current demand, pricing forecast
4. Calculates optimal charging window using
   linear programming (min cost, max green energy)
5. Sends OCPP SetChargingProfile to charger:
   {
     "chargingProfileId": 42,
     "stackLevel": 2,
     "chargingProfileKind": "Absolute",
     "chargingSchedule": {
       "chargingRateUnit": "A",
       "chargingSchedulePeriod": [
         {"startPeriod": 0, "limit": 8},    // 8A now
         {"startPeriod": 3600, "limit": 32}  // full at 1am
       ]
     }
   }
        </div>
      </div>
      <div>
        <strong>Grid Integration (OpenADR 2.0)</strong>
        <div class="code-box">
// Demand Response Event handling:
Utility → OpenADR VTN server
  → Energy Mgmt Svc (VEN client)
  → Parse DR event: reduce load by 20% for 2 hrs
  → Query active sessions via Kafka
  → For each station in affected grid zone:
      Reduce charging limit proportionally
      via OCPP SetChargingProfile
  → Publish grid_event to Kafka topic
  → Monitor aggregate power reduction
  → Report back to utility via OpenADR EiReport

// Revenue from DR events:
CPO earns $50-200/MWh for demand flexibility
Distributed to users as charging credits
        </div>
        <strong>V2G (Vehicle-to-Grid) Flow</strong>
        <ul>
          <li>ISO 15118 Plug &amp; Charge: vehicle identifies itself via TLS certificate, no RFID needed</li>
          <li>Vehicle communicates max discharge rate and battery constraints</li>
          <li>Energy Mgmt Svc schedules bidirectional energy flow</li>
          <li>Revenue from grid balancing credited to user wallet</li>
          <li>TimescaleDB tracks V2G export events separately for billing reconciliation</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 8: Database Design -->
<div class="ref-section">
  <div class="ref-title">8. Database Design</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>PostgreSQL — Stations &amp; Bookings</strong>
        <div class="code-box">
-- stations table
CREATE TABLE stations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(200) NOT NULL,
  operator_id UUID NOT NULL REFERENCES operators(id),
  location    GEOGRAPHY(POINT, 4326) NOT NULL, -- PostGIS
  address     JSONB,
  amenities   TEXT[],
  network_id  VARCHAR(50),  -- for OCPI roaming
  status      VARCHAR(20) DEFAULT 'ACTIVE',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_stations_geo ON stations USING GIST(location);
CREATE INDEX idx_stations_operator ON stations(operator_id);
CREATE INDEX idx_stations_network ON stations(network_id);

-- connectors table
CREATE TABLE connectors (
  id             UUID PRIMARY KEY,
  station_id     UUID REFERENCES stations(id),
  charger_id     VARCHAR(100) UNIQUE NOT NULL, -- OCPP identifier
  connector_type VARCHAR(30),  -- CCS2, CHAdeMO, Type2, NACS
  max_power_kw   DECIMAL(6,2),
  voltage        INTEGER,
  current_type   VARCHAR(5),   -- AC, DC
  ocpp_version   VARCHAR(10),
  firmware_ver   VARCHAR(50),
  installed_at   TIMESTAMPTZ
);
CREATE INDEX idx_connectors_station ON connectors(station_id);
CREATE INDEX idx_connectors_charger ON connectors(charger_id);

-- bookings table
CREATE TABLE bookings (
  id              UUID PRIMARY KEY,
  user_id         UUID NOT NULL,
  connector_id    UUID REFERENCES connectors(id),
  status          VARCHAR(20),  -- ACTIVE, CANCELLED, EXPIRED, USED
  reserved_from   TIMESTAMPTZ NOT NULL,
  reserved_until  TIMESTAMPTZ NOT NULL,
  session_id      UUID,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_bookings_connector_time
  ON bookings(connector_id, reserved_from, reserved_until)
  WHERE status = 'ACTIVE';
        </div>
      </div>
      <div>
        <strong>Cassandra — Session Telemetry</strong>
        <div class="code-box">
-- Optimised for time-series reads per session
CREATE TABLE session_telemetry (
  session_id   UUID,
  recorded_at  TIMESTAMP,
  energy_kwh   DOUBLE,
  power_kw     DOUBLE,
  voltage_v    DOUBLE,
  current_a    DOUBLE,
  soc_percent  INT,
  temperature_c DOUBLE,
  PRIMARY KEY (session_id, recorded_at)
) WITH CLUSTERING ORDER BY (recorded_at ASC)
  AND compaction = {'class': 'TimeWindowCompactionStrategy',
                    'compaction_window_size': 1,
                    'compaction_window_unit': 'DAYS'};

-- Partition by session_id for sequential writes
-- TWCS optimal for time-series with TTL
-- TTL: 90 days in hot tier, then export to S3
        </div>
        <strong>TimescaleDB — Energy Metrics</strong>
        <div class="code-box">
CREATE TABLE energy_metrics (
  time         TIMESTAMPTZ NOT NULL,
  station_id   UUID NOT NULL,
  connector_id UUID NOT NULL,
  energy_kwh   DOUBLE PRECISION,
  power_kw     DOUBLE PRECISION,
  grid_tariff  DECIMAL(6,4)
);
SELECT create_hypertable('energy_metrics', 'time',
  chunk_time_interval => INTERVAL '1 day');

-- Continuous aggregates for dashboards
CREATE MATERIALIZED VIEW energy_hourly
WITH (timescaledb.continuous) AS
SELECT
  time_bucket('1 hour', time) AS bucket,
  station_id,
  SUM(energy_kwh) AS total_kwh,
  AVG(power_kw) AS avg_power_kw
FROM energy_metrics
GROUP BY bucket, station_id;
        </div>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 9: Data Flow — Key Scenarios -->
<div class="ref-section">
  <div class="ref-title">9. Data Flow — Key Scenarios</div>
  <div class="ref-body">
    <strong>Scenario 1: EV Driver Starts Charging Session</strong>
    <div class="flow-box">
      <div class="flow-step">1. Driver taps "Start Charging" in app → POST /v1/sessions/start (Idempotency-Key: uuid)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">2. API Gateway validates JWT, rate limits, forwards to Session Service</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">3. Session Service: check Redis idempotency key, validate booking if exists, create session record in PostgreSQL (status=PENDING)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">4. Session Service looks up charger_id → gateway_node mapping in Redis, sends gRPC RemoteStart to correct OCPP Gateway node</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">5. OCPP Gateway sends RemoteStartTransaction.req over WebSocket to charger hardware; waits for conf</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">6. Charger sends RemoteStartTransaction.conf (status=Accepted); charger then sends StartTransaction → TransactionEvent(Started)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">7. Gateway publishes session_started to Kafka; Session Service updates PostgreSQL (status=CHARGING), Redis (live session state)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">8. Payment Service pre-authorises card via Stripe hold; sends webhook to client app via SSE push</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">9. Client app receives SSE event "CHARGING" — connector turns green, meter starts counting</div>
    </div>

    <strong style="margin-top:16px;display:block;">Scenario 2: Real-time Telemetry During Charging</strong>
    <div class="flow-box">
      <div class="flow-step">1. Charger sends MeterValues (energy_kwh, power_kw, soc_percent) every 30 seconds via OCPP WebSocket</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">2. OCPP Gateway validates, publishes to Kafka topic charger.meter-values with session_id and timestamp</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">3. Telemetry Consumer: writes to Cassandra (durable row) and TimescaleDB (energy time-series)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">4. Live Session Consumer: updates Redis Hash session:{id} with latest readings + computes estimated cost</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">5. SSE push service reads from Redis, pushes telemetry to connected driver app every 30s</div>
    </div>

    <strong style="margin-top:16px;display:block;">Scenario 3: Charger Fault &amp; Operator Alert</strong>
    <div class="flow-box">
      <div class="flow-step">1. Charger sends StatusNotification (connectorId=1, status=Faulted, errorCode=GroundFailure)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">2. OCPP Gateway publishes station_fault event to Kafka topic station.events</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">3. Station Status Consumer: updates Redis connector availability Hash, marks PostgreSQL connector as FAULTED</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">4. Alert Service: fires PagerDuty alert to operator, sends push notification to driver if active session, removes station from discovery search results</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">5. If active session: Session Service initiates graceful StopTransaction, Payment Service bills for energy delivered so far</div>
    </div>
  </div>
</div>

<!-- SECTION 10: Caching Strategy -->
<div class="ref-section">
  <div class="ref-title">10. Caching Strategy</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><td>Cache Layer</td><td>What</td><td>TTL</td><td>Strategy</td><td>Eviction</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis Geo (Discovery)</td><td>Station lat/lng positions for 2M stations</td><td>No expiry (event-driven update)</td><td>Write-through on station CRUD</td><td>None — always warm</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis Hash (Availability)</td><td>Live connector status per station</td><td>No expiry (OCPP StatusNotification)</td><td>Write-through from OCPP consumer</td><td>Manual on station decommission</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis Hash (Session State)</td><td>Active charging session live data</td><td>Session TTL + 1hr</td><td>Write-through from telemetry consumer</td><td>volatile-ttl</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis String (Idempotency)</td><td>API request dedup keys</td><td>24 hours</td><td>SET NX on first request</td><td>volatile-ttl</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis String (OCPP routing)</td><td>charger_id → gateway_node mapping</td><td>No expiry (updated on reconnect)</td><td>Write-through on WS connect</td><td>allkeys-lru fallback</td></tr>
      <tr class="pt-row"><td class="pt-name">CDN (Cloudfront)</td><td>Station metadata, amenity photos</td><td>1 hour for metadata, 7 days for images</td><td>Cache-Control headers</td><td>Invalidate on station update</td></tr>
      <tr class="pt-row"><td class="pt-name">Application Cache (in-proc)</td><td>Connector type definitions, pricing tariffs</td><td>5 minutes</td><td>Read-through with Redis L2</td><td>LRU, max 10k entries</td></tr>
      <tr class="pt-row"><td class="pt-name">TimescaleDB Aggregates</td><td>Pre-computed hourly/daily energy rollups</td><td>Materialized view refresh every 15min</td><td>Continuous aggregate</td><td>Time-partition expiry</td></tr>
    </table>
    <div class="warn-box" style="margin-top:12px;">
      <strong>Cache Stampede Prevention:</strong> For station metadata cache misses, use Redis SET NX "lock:station:{id}" with 5s TTL to allow only one thread to rebuild. Other threads wait with exponential backoff. Probability early expiration (PER) algorithm used for high-traffic station pages.
    </div>
  </div>
</div>

<!-- SECTION 11: Message Queue / Event Streaming -->
<div class="ref-section">
  <div class="ref-title">11. Message Queue &amp; Event Streaming</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Kafka Topic Design</strong>
        <table class="pattern-table">
          <tr class="pt-header"><td>Topic</td><td>Partitions</td><td>Producers</td><td>Consumers</td></tr>
          <tr class="pt-row"><td class="pt-name">charger.meter-values</td><td>200</td><td>OCPP Gateways</td><td>Telemetry svc, Energy svc</td></tr>
          <tr class="pt-row"><td class="pt-name">station.events</td><td>100</td><td>OCPP Gateways</td><td>Availability svc, Alert svc</td></tr>
          <tr class="pt-row"><td class="pt-name">session.lifecycle</td><td>100</td><td>Session svc</td><td>Payment svc, Analytics, Webhooks</td></tr>
          <tr class="pt-row"><td class="pt-name">payment.events</td><td>50</td><td>Payment svc</td><td>Billing svc, User wallet svc</td></tr>
          <tr class="pt-row"><td class="pt-name">grid.demand-response</td><td>20</td><td>Energy Mgmt svc</td><td>Smart charging svc</td></tr>
          <tr class="pt-row"><td class="pt-name">analytics.rollup</td><td>50</td><td>Flink jobs</td><td>Dashboard svc, Reporting svc</td></tr>
        </table>
      </div>
      <div>
        <strong>Partitioning Strategy</strong>
        <ul>
          <li><strong>charger.meter-values:</strong> Partition by charger_id — ensures all telemetry for a charger arrives in order to same consumer</li>
          <li><strong>session.lifecycle:</strong> Partition by session_id — Payment svc processes events sequentially per session</li>
          <li><strong>station.events:</strong> Partition by station_id — availability updates for same station processed in order</li>
        </ul>
        <strong>Why Kafka over SQS/RabbitMQ</strong>
        <ul>
          <li>Log compaction for station.events — consumers can replay station state from beginning</li>
          <li>Consumer group replay for analytics pipeline reprocessing</li>
          <li>High throughput: 2M msgs/sec with low latency</li>
          <li>Exactly-once semantics for payment events (Kafka transactions)</li>
          <li>Long retention: 7 days hot, 30 days on S3 via Kafka Tiered Storage</li>
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
        <strong>Communication Patterns Used</strong>
        <table class="pattern-table">
          <tr class="pt-header"><td>Channel</td><td>Use Case</td><td>Direction</td></tr>
          <tr class="pt-row"><td class="pt-name">OCPP WebSocket</td><td>Charger ↔ OCPP Gateway</td><td>Bidirectional, persistent</td></tr>
          <tr class="pt-row"><td class="pt-name">SSE (Server-Sent Events)</td><td>Session telemetry to EV app</td><td>Server → Client</td></tr>
          <tr class="pt-row"><td class="pt-name">WebSocket</td><td>Operator dashboard live feed</td><td>Bidirectional</td></tr>
          <tr class="pt-row"><td class="pt-name">Push Notifications</td><td>Session complete, fault alerts</td><td>Server → Mobile</td></tr>
          <tr class="pt-row"><td class="pt-name">Webhooks</td><td>Operator event callbacks</td><td>Server → Operator</td></tr>
          <tr class="pt-row"><td class="pt-name">Long Polling (fallback)</td><td>Session status (poor network)</td><td>Client pulls</td></tr>
        </table>
      </div>
      <div>
        <strong>SSE for Driver App</strong>
        <p>Server-Sent Events chosen over WebSocket for the EV app because:</p>
        <ul>
          <li>Unidirectional (server pushes telemetry to app — no need for client messages)</li>
          <li>Automatic reconnect built into browser/mobile SSE standard</li>
          <li>Works over HTTP/2 multiplexed streams — fewer connections</li>
          <li>Simpler load balancing via sticky sessions on API Gateway</li>
        </ul>
        <div class="code-box">
// SSE endpoint
GET /v1/sessions/{session_id}/stream
Accept: text/event-stream

// Push every 30s during CHARGING:
data: {"energy_kwh": 12.4, "power_kw": 50.0,
       "soc_percent": 45, "cost_estimate": "$6.20",
       "time_remaining_min": 32}

// Push on state change:
data: {"status": "FINISHING", "energy_kwh": 45.2}

// Push on completion:
data: {"status": "COMPLETED", "final_cost": "$22.60",
       "receipt_url": "https://..."}
        </div>
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
        <strong>ACID Boundaries</strong>
        <ul>
          <li><strong>Booking creation:</strong> PostgreSQL SERIALIZABLE transaction — check for conflicting booking, insert, single atomic operation. Prevents double-booking same connector slot.</li>
          <li><strong>Payment billing:</strong> Exactly-once via Kafka transactions + Stripe idempotency keys. If payment consumer crashes mid-process, Kafka offset not committed → reprocess with same Stripe idempotency key → no double charge.</li>
          <li><strong>Session state:</strong> Eventual consistent — Redis updated from Kafka consumer asynchronously. Acceptable because MeterValues have 30s cadence anyway.</li>
        </ul>
        <strong>Distributed Locking</strong>
        <div class="code-box">
// Connector booking lock (Redlock algorithm):
// 5 Redis nodes, lock must be acquired on 3+

SET lock:connector:{id} {uuid} NX PX 30000

// If OCPP gateway crash during session:
// Distributed lock prevents concurrent
// RemoteStart for same connector
// Lock released on StartTransaction confirmation
        </div>
      </div>
      <div>
        <strong>BASE vs ACID Choice Matrix</strong>
        <table class="pattern-table">
          <tr class="pt-header"><td>Operation</td><td>Model</td><td>Rationale</td></tr>
          <tr class="pt-row"><td class="pt-name">Booking creation</td><td>ACID (PostgreSQL)</td><td>Money/resource contention</td></tr>
          <tr class="pt-row"><td class="pt-name">Payment charge</td><td>ACID + idempotency</td><td>Exactly-once billing critical</td></tr>
          <tr class="pt-row"><td class="pt-name">Station availability</td><td>BASE (Redis)</td><td>Stale by 5s is acceptable</td></tr>
          <tr class="pt-row"><td class="pt-name">Session telemetry</td><td>BASE (Cassandra)</td><td>High write throughput needed</td></tr>
          <tr class="pt-row"><td class="pt-name">Energy metrics</td><td>BASE (TimescaleDB)</td><td>Append-only time-series</td></tr>
          <tr class="pt-row"><td class="pt-name">OCPP state machine</td><td>Saga pattern</td><td>Distributed compensating txns</td></tr>
        </table>
        <strong>Saga for Session Start</strong>
        <p>Session start is a distributed saga across: Booking Svc (validate/consume reservation), OCPP Svc (start charge), Payment Svc (pre-auth). Compensating transactions: release reservation on OCPP failure, cancel pre-auth on any failure. Saga state tracked in PostgreSQL sessions table with current_step column.</p>
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
        <strong>Elasticsearch Station Index</strong>
        <div class="code-box">
PUT /stations/_mapping
{
  "mappings": {
    "properties": {
      "name": {"type": "text", "analyzer": "standard"},
      "operator_name": {"type": "keyword"},
      "location": {"type": "geo_point"},
      "connector_types": {"type": "keyword"},
      "amenities": {"type": "keyword"},
      "max_power_kw": {"type": "float"},
      "is_available": {"type": "boolean"},
      "rating": {"type": "float"},
      "pricing_tier": {"type": "keyword"}
    }
  }
}

// Compound search query:
POST /stations/_search
{
  "query": {
    "bool": {
      "must": [
        {"match": {"connector_types": "CCS2"}},
        {"range": {"max_power_kw": {"gte": 50}}}
      ],
      "filter": {
        "geo_distance": {
          "distance": "10km",
          "location": {"lat": 37.77, "lon": -122.41}
        }
      }
    }
  },
  "sort": [{"_geo_distance": {"location": "asc"}}]
}
        </div>
      </div>
      <div>
        <strong>Index Update Strategy</strong>
        <ul>
          <li><strong>Static metadata</strong> (name, address, connectors): Updated via PostgreSQL CDC (Debezium) → Kafka → Elasticsearch connector. Near-real-time, &lt;2s lag.</li>
          <li><strong>Dynamic availability</strong> (is_available): Updated by Kafka consumer on StatusNotification. Partial doc update via Elasticsearch Update API to avoid full re-index.</li>
          <li><strong>Sharding:</strong> 5 primary shards for 2M stations (~400K per shard). Geo-based routing not used since EV stations sparse globally — uniform distribution sufficient.</li>
        </ul>
        <strong>RediSearch vs Elasticsearch</strong>
        <p>For pure geo-proximity with basic filters, RediSearch module handles 50K QPS at &lt;5ms. Elasticsearch used when full-text search needed (station name, amenity text, operator search). Both are maintained; search tier routes to appropriate backend based on query complexity.</p>
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
        <strong>CDN-Served Assets</strong>
        <table class="pattern-table">
          <tr class="pt-header"><td>Asset Type</td><td>Cache TTL</td><td>Invalidation Trigger</td></tr>
          <tr class="pt-row"><td class="pt-name">Station photos</td><td>7 days</td><td>Operator uploads new image</td></tr>
          <tr class="pt-row"><td class="pt-name">Connector type icons</td><td>30 days (immutable)</td><td>Version-suffixed filename</td></tr>
          <tr class="pt-row"><td class="pt-name">Station metadata JSON</td><td>1 hour</td><td>Station update event</td></tr>
          <tr class="pt-row"><td class="pt-name">Map tile assets</td><td>24 hours</td><td>Never — versioned at build</td></tr>
          <tr class="pt-row"><td class="pt-name">Session receipts PDF</td><td>No cache (signed URL)</td><td>S3 pre-signed URL (1hr TTL)</td></tr>
          <tr class="pt-row"><td class="pt-name">App JS/CSS bundles</td><td>1 year</td><td>Content-hash in filename</td></tr>
        </table>
      </div>
      <div>
        <strong>Media Upload Flow for Station Photos</strong>
        <div class="code-box">
1. Operator requests presigned S3 PUT URL
   GET /v1/stations/{id}/photo-upload-url
   → Returns: {upload_url, photo_id}

2. Operator client PUT directly to S3
   (bypasses API servers — reduces load)

3. S3 event trigger → Lambda → image processing:
   - Resize to [800x600, 400x300, 100x100]
   - Convert to WebP for modern clients
   - Store thumbnails in S3 /thumbnails/

4. Lambda publishes station_photo_updated
   to Kafka → CDN invalidation job
   → CloudFront CreateInvalidation for station
        </div>
        <strong>CloudFront Configuration</strong>
        <p>Station search API responses cached at CloudFront edge for 30 seconds with query string forwarding for lat/lng/radius params. Cache key normalisation rounds coordinates to 4 decimal places (~11m precision) to increase cache hit rate for nearby queries.</p>
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
        <strong>Authentication &amp; Authorisation</strong>
        <ul>
          <li><strong>EV Driver App:</strong> OAuth 2.0 + PKCE, JWT access tokens (15min TTL), Refresh tokens (30 days) stored in secure HttpOnly cookies. Biometric auth on mobile.</li>
          <li><strong>OCPP Charger Hardware:</strong> Mutual TLS (mTLS) — charger presents client certificate signed by CPO CA. Basic Auth as fallback for legacy OCPP 1.6 devices.</li>
          <li><strong>Operators:</strong> OAuth 2.0 client credentials flow with scopes: stations:read, stations:write, sessions:read, pricing:write</li>
          <li><strong>Inter-service:</strong> mTLS service mesh (Istio) with SPIFFE/SPIRE identity. No service-to-service JWT — certificate-based only.</li>
        </ul>
        <strong>OCPP Security</strong>
        <div class="code-box">
// OCPP 2.0.1 Security Profiles:
Profile 1: HTTP Basic Auth over TLS
Profile 2: HTTP Basic Auth + Client Cert
Profile 3: mTLS only (recommended)

// Charger certificate rotation:
1. CPO CA issues cert with 1-year TTL
2. 30 days before expiry: trigger renewal
3. OCPP CertificateSignedRequest flow
4. New cert provisioned without downtime
        </div>
      </div>
      <div>
        <strong>Data Security</strong>
        <ul>
          <li><strong>Encryption at rest:</strong> All RDS/PostgreSQL with AWS KMS AES-256. Cassandra transparent data encryption. S3 SSE-KMS. Redis encryption at rest enabled.</li>
          <li><strong>Encryption in transit:</strong> TLS 1.3 everywhere. WebSocket connections over WSS. OCPP over secure WebSocket (WSS). Internal gRPC over mTLS.</li>
          <li><strong>PCI DSS compliance:</strong> Card data never stored — Stripe tokenisation. Payment service in isolated VPC subnet. Network segmentation with WAF in front of payment endpoints.</li>
          <li><strong>GDPR:</strong> User location data anonymised after 90 days. Right-to-erasure API cascades deletion across all services via event. Charging history aggregated, raw GPS removed.</li>
        </ul>
        <strong>Rate Limiting &amp; DDoS</strong>
        <ul>
          <li>Kong rate limiting: per-user 1000 req/min on discovery, 10 req/min on session start</li>
          <li>AWS WAF + Shield Advanced for DDoS mitigation at CloudFront layer</li>
          <li>OCPP gateway: per-charger message rate limit 100 msgs/min (prevents rogue firmware flooding)</li>
          <li>Anomaly detection: unusual session starts from single account trigger MFA re-verification</li>
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
        <strong>OCPP Gateway Horizontal Scaling</strong>
        <p>The most unique scaling challenge: 8M persistent WebSocket connections. Each gateway node (32-core, 64GB RAM) handles 50K connections. Node.js chosen for its event-loop model — non-blocking I/O handles 50K concurrent WS with minimal threads. Golang alternative uses goroutines per connection (more memory but simpler code).</p>
        <div class="code-box">
// Scale-out trigger (Kubernetes HPA):
- CPU &gt; 70% for 2 min → add nodes
- Active WS connections &gt; 45K per pod → add nodes
- Connection ramp: new charger connect
  → consistent hash → assigned to least-loaded node

// Consistent hash ring update on node add/remove:
- Virtual nodes (vnodes) = 150 per server
- Charger reconnect routes to new owner
- Session state in Redis survives node change
- Active sessions: drain period 5min before
  removing node from ring
        </div>
      </div>
      <div>
        <strong>Database Sharding</strong>
        <table class="pattern-table">
          <tr class="pt-header"><td>DB</td><td>Shard Key</td><td>Strategy</td></tr>
          <tr class="pt-row"><td class="pt-name">PostgreSQL sessions</td><td>user_id mod 16</td><td>Hash sharding</td></tr>
          <tr class="pt-row"><td class="pt-name">PostgreSQL stations</td><td>region/country code</td><td>Range sharding</td></tr>
          <tr class="pt-row"><td class="pt-name">Cassandra telemetry</td><td>session_id (natural)</td><td>Consistent hashing</td></tr>
          <tr class="pt-row"><td class="pt-name">TimescaleDB energy</td><td>time (hypertable)</td><td>Time partitioning</td></tr>
        </table>
        <strong>Read Replicas</strong>
        <ul>
          <li>PostgreSQL: 3 read replicas per shard for station metadata queries (discovery service, operator dashboards)</li>
          <li>Replica lag monitoring: Alert if lag &gt;5s for station availability data</li>
          <li>Cassandra: RF=3 with LOCAL_QUORUM for reads — strong enough for billing reconciliation, fast enough for telemetry</li>
        </ul>
        <strong>Redis Cluster</strong>
        <p>Redis Cluster with 6 shards (3 master, 3 replica each). Geo sets and availability hashes distributed across shards. Cluster-aware client (redis-py-cluster, ioredis) handles slot routing transparently.</p>
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
        <strong>Circuit Breaker Pattern</strong>
        <div class="code-box">
// Resilience4j configuration (Java services):
CircuitBreaker ocpp-gateway {
  slidingWindowSize: 100
  failureRateThreshold: 50%
  waitDurationInOpenState: 30s
  permittedCallsInHalfOpenState: 10
}

// Fallback on OCPP gateway failure:
// - Return 202 Accepted with status=PENDING
// - Enqueue RemoteStart in Redis with TTL 5min
// - Retry with exponential backoff 2s/4s/8s
// - On permanent failure: notify driver, release booking

// Payment service circuit breaker:
// - Open on Stripe timeout rate &gt;10%
// - Fallback: queue payment for async processing
// - Driver gets session start, billed after
        </div>
      </div>
      <div>
        <strong>Retry &amp; Timeout Strategy</strong>
        <table class="pattern-table">
          <tr class="pt-header"><td>Operation</td><td>Timeout</td><td>Retries</td><td>Backoff</td></tr>
          <tr class="pt-row"><td class="pt-name">OCPP RemoteStart</td><td>30s (charger wait)</td><td>2 retries</td><td>5s, 10s</td></tr>
          <tr class="pt-row"><td class="pt-name">Payment pre-auth</td><td>10s</td><td>3 retries</td><td>1s, 2s, 4s</td></tr>
          <tr class="pt-row"><td class="pt-name">Redis operations</td><td>200ms</td><td>2 retries</td><td>50ms, 100ms</td></tr>
          <tr class="pt-row"><td class="pt-name">PostgreSQL queries</td><td>5s</td><td>1 retry</td><td>500ms</td></tr>
          <tr class="pt-row"><td class="pt-name">Elasticsearch search</td><td>2s</td><td>2 retries</td><td>200ms</td></tr>
        </table>
        <strong>Bulkhead Pattern</strong>
        <p>Thread pool isolation: OCPP operations in dedicated pool (200 threads), payment operations separate pool (50 threads), search operations separate pool (100 threads). Prevents payment slowness from blocking session start latency.</p>
        <strong>Chaos Engineering</strong>
        <p>Monthly chaos days using AWS Fault Injection Simulator: inject random OCPP gateway node failure (verifies charger reconnect), simulate Kafka broker loss (verifies consumer group rebalance), inject Redis node failure (verifies cluster failover). Game days with on-call teams.</p>
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
        <strong>Key Metrics (Prometheus + Grafana)</strong>
        <ul>
          <li><strong>OCPP Gateway:</strong> active_ws_connections, ocpp_messages_per_sec, heartbeat_timeout_count, session_start_latency_p99</li>
          <li><strong>Session Service:</strong> sessions_started_per_min, session_start_failures, saga_compensations_per_min</li>
          <li><strong>Discovery:</strong> geo_search_latency_p99, cache_hit_rate, elasticsearch_query_latency</li>
          <li><strong>Payment:</strong> payment_success_rate, stripe_api_latency_p99, failed_charges_per_hour</li>
          <li><strong>Energy:</strong> total_energy_delivered_kwh, dr_events_processed, v2g_sessions_active</li>
          <li><strong>Infrastructure:</strong> kafka_consumer_lag, redis_memory_usage, cassandra_write_latency</li>
        </ul>
        <strong>Distributed Tracing (OpenTelemetry)</strong>
        <div class="code-box">
// Trace propagation: W3C TraceContext headers
// Session start trace example:
Span: POST /v1/sessions/start [12ms total]
  ├─ Span: Redis idempotency check [0.5ms]
  ├─ Span: PostgreSQL booking validation [2ms]
  ├─ Span: OCPP Gateway gRPC call [8ms]
  │   ├─ Span: WebSocket message send [1ms]
  │   └─ Span: Await charger response [6ms]
  └─ Span: Kafka publish session_started [0.5ms]

// Trace sampling: 100% for errors,
// 10% for success paths
// Stored in Jaeger with 30-day retention
        </div>
      </div>
      <div>
        <strong>Logging Strategy (ELK Stack)</strong>
        <ul>
          <li><strong>Structured JSON logs:</strong> All services emit JSON with trace_id, session_id, charger_id, user_id for correlation</li>
          <li><strong>Log levels:</strong> ERROR (always alert), WARN (aggregate threshold alerts), INFO (sampling 1%), DEBUG (disabled prod)</li>
          <li><strong>Critical log paths:</strong> All OCPP state transitions logged to immutable S3 for audit (billing disputes)</li>
          <li><strong>Log retention:</strong> Elasticsearch hot: 7 days, warm: 30 days. S3 cold: 7 years (regulatory)</li>
        </ul>
        <strong>SLO / SLA Definitions</strong>
        <table class="pattern-table">
          <tr class="pt-header"><td>SLO</td><td>Target</td><td>Measurement Window</td></tr>
          <tr class="pt-row"><td class="pt-name">Session start success rate</td><td>99.5%</td><td>Rolling 30 days</td></tr>
          <tr class="pt-row"><td class="pt-name">Discovery p99 latency</td><td>&lt;200ms</td><td>Rolling 7 days</td></tr>
          <tr class="pt-row"><td class="pt-name">OCPP message delivery</td><td>99.9%</td><td>Rolling 30 days</td></tr>
          <tr class="pt-row"><td class="pt-name">Payment success rate</td><td>99.95%</td><td>Rolling 30 days</td></tr>
          <tr class="pt-row"><td class="pt-name">Charger status freshness</td><td>&lt;5s stale 99%</td><td>Rolling 24 hours</td></tr>
        </table>
        <strong>Alerting Runbook</strong>
        <p>PagerDuty escalation: P1 (session failure rate &gt;5% → 2min alert), P2 (payment failure rate &gt;1% → 5min), P3 (discovery latency degraded → 15min). On-call rotation covers all timezones with 15-min acknowledgement SLA.</p>
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
        <strong>Multi-Region Strategy</strong>
        <div class="code-box">
Regions: us-east-1 (primary), eu-west-1,
         ap-southeast-1, ap-northeast-1

Each region has:
  - 3 Availability Zones
  - OCPP Gateway cluster (region-local chargers)
  - Redis Cluster (availability data — regional)
  - PostgreSQL (station metadata replicated globally
    via Aurora Global Database read replicas)
  - Kafka (regional — no cross-region replication
    for telemetry; analytics consolidated in primary)
  - Cassandra (multi-DC with RF=3 per DC)

Cross-region:
  - Route53 latency-based routing for API
  - Aurora Global DB: primary write, 5 read regions
  - S3 Cross-Region Replication for media assets
  - Global Accelerator for OCPP connections
    (anycast routing to nearest gateway cluster)
        </div>
      </div>
      <div>
        <strong>Kubernetes Deployment</strong>
        <ul>
          <li><strong>OCPP Gateway:</strong> StatefulSet (pod identity important for consistent hashing), pod disruption budget: max 10% unavailable</li>
          <li><strong>Stateless services:</strong> Deployment with HPA based on CPU + custom metrics (active_sessions per replica)</li>
          <li><strong>Kafka, Cassandra:</strong> Strimzi Operator and Cassandra Operator on dedicated node pools (memory-optimised EC2 r6g.2xlarge)</li>
          <li><strong>Node pool isolation:</strong> OCPP gateways on network-optimised c6gn instances; DB workloads on memory-optimised r6g</li>
        </ul>
        <strong>Deployment Strategy</strong>
        <ul>
          <li><strong>Blue-green for API services:</strong> Full parallel environment, instant traffic switch via ALB target group swap</li>
          <li><strong>Canary for OCPP gateway:</strong> 5% → 25% → 100% over 1 hour. Automated rollback if session failure rate &gt;2% on canary</li>
          <li><strong>GitOps via ArgoCD:</strong> All K8s manifests in Git. Automated sync with diff preview. Manual approval gate for production OCPP gateway changes.</li>
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
        <strong>OCPP Gateway Optimisations</strong>
        <ul>
          <li><strong>Message batching:</strong> MeterValues from multiple chargers batched into single Kafka produce (linger.ms=10, batch.size=65536). Reduces Kafka API calls 10x.</li>
          <li><strong>Binary protocol:</strong> Internally use MessagePack/Protobuf between gateway and session service instead of JSON. 3x smaller payload, 2x faster serialisation.</li>
          <li><strong>Connection pooling:</strong> gRPC connection pool of 10 persistent connections from gateway to session service. HTTP/2 multiplexing means 1000s of concurrent RPCs over 10 connections.</li>
        </ul>
        <strong>Database Optimisations</strong>
        <ul>
          <li><strong>PostgreSQL partial indexes:</strong> <code>CREATE INDEX idx_active_bookings ON bookings(connector_id, reserved_from) WHERE status='ACTIVE'</code> — 95% queries hit this tiny index</li>
          <li><strong>TimescaleDB compression:</strong> Columnar compression on energy_metrics after 7 days — 90% size reduction. Typical: 10TB uncompressed → 1TB compressed.</li>
          <li><strong>Cassandra tuning:</strong> TimeWindowCompactionStrategy with 1-day windows matches query patterns. speculative_retry=99th_percentile eliminates tail latency on slow nodes.</li>
        </ul>
      </div>
      <div>
        <strong>Application-Level Optimisations</strong>
        <ul>
          <li><strong>Redis pipeline:</strong> Station search result enrichment fetches 20 station availability hashes in single pipelined command. Reduces RTTs from 20 to 1.</li>
          <li><strong>Geo-hash rounding:</strong> CloudFront caches discovery API by rounding lat/lng to 3 decimal places (~100m). Cache hit rate improves from 5% to 60% in dense urban areas.</li>
          <li><strong>Connection pooling:</strong> PgBouncer in transaction mode between services and PostgreSQL. Pool size: 20 per service instance × 50 instances = 1000 PostgreSQL connections maximum (vs 50,000 direct).</li>
          <li><strong>Async session metrics:</strong> Session service returns 202 Accepted immediately on StartTransaction; metrics stored asynchronously. Driver sees instant response without waiting for Cassandra write.</li>
          <li><strong>Protobuf for telemetry:</strong> Charger telemetry stored in Cassandra as Protobuf bytes instead of JSON text. 60% storage saving, 40% faster reads for billing export.</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 22: Cost Optimisation -->
<div class="ref-section">
  <div class="ref-title">22. Cost Optimisation</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Compute Cost Reduction</strong>
        <ul>
          <li><strong>Spot instances for analytics:</strong> Spark batch jobs for nightly energy reports run on EC2 Spot (70% cheaper). Checkpointing every 5 minutes for fault tolerance.</li>
          <li><strong>Graviton3 (ARM) for stateless services:</strong> Discovery, Booking, Payment services on c7g instances — 20% cheaper than x86, 10-15% better throughput/$ ratio.</li>
          <li><strong>Savings Plans:</strong> 3-year Compute Savings Plan for baseline OCPP gateway fleet (always-on). On-demand for burst capacity during peak hours.</li>
          <li><strong>Kafka right-sizing:</strong> kafka.m5.xlarge for 15 brokers. Auto-scaling disabled — over-provisioned 20% to handle traffic spikes without rebalance cost.</li>
        </ul>
      </div>
      <div>
        <strong>Storage Cost Reduction</strong>
        <ul>
          <li><strong>TimescaleDB native compression:</strong> 90% reduction on energy_metrics after 7 days. \$50K/year saving vs uncompressed.</li>
          <li><strong>S3 Intelligent-Tiering:</strong> Cassandra exports and session archives auto-tier to Glacier after 90 days. \$0.023/GB → \$0.004/GB.</li>
          <li><strong>Kafka Tiered Storage:</strong> Messages retained 7 days hot on broker SSDs, then offloaded to S3 at \$0.023/GB vs \$0.08/GB SSD. 60% Kafka storage cost reduction.</li>
          <li><strong>Image compression:</strong> Station photos converted to WebP (30% smaller than JPEG) with lossy compression at quality 85. CDN bandwidth cost reduced 25%.</li>
          <li><strong>Aggregation over raw data:</strong> Raw MeterValues kept 30 days in Cassandra. Beyond 30 days, only hourly aggregates kept in TimescaleDB. 95% data reduction after 30 days.</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 23: Disaster Recovery -->
<div class="ref-section">
  <div class="ref-title">23. Disaster Recovery</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>RTO / RPO Targets</strong>
        <table class="pattern-table">
          <tr class="pt-header"><td>Component</td><td>RTO</td><td>RPO</td><td>Strategy</td></tr>
          <tr class="pt-row"><td class="pt-name">OCPP Gateway</td><td>2 minutes</td><td>0 (stateless sessions in Redis)</td><td>Auto-restart K8s, chargers reconnect</td></tr>
          <tr class="pt-row"><td class="pt-name">PostgreSQL (Aurora)</td><td>30 seconds</td><td>&lt;1 second</td><td>Aurora multi-AZ auto-failover</td></tr>
          <tr class="pt-row"><td class="pt-name">Redis Cluster</td><td>1 minute</td><td>seconds (AOF + RDB)</td><td>ElastiCache multi-AZ, auto-failover</td></tr>
          <tr class="pt-row"><td class="pt-name">Cassandra</td><td>5 minutes</td><td>&lt;5 seconds (RF=3)</td><td>Multi-DC, DC failover via LOCAL_QUORUM</td></tr>
          <tr class="pt-row"><td class="pt-name">Kafka</td><td>5 minutes</td><td>0 (replicated, RF=3)</td><td>Multi-AZ broker placement</td></tr>
          <tr class="pt-row"><td class="pt-name">Full region failure</td><td>30 minutes</td><td>&lt;5 minutes</td><td">Aurora Global DB promote secondary</td></tr>
        </table>
      </div>
      <div>
        <strong>Backup Strategy</strong>
        <ul>
          <li><strong>PostgreSQL:</strong> Aurora automated backups every 5 minutes (continuous WAL). Point-in-time recovery to any second within 35-day window.</li>
          <li><strong>Cassandra:</strong> Daily snapshots to S3 via nodetool snapshot. Cross-region S3 replication. Restore tested monthly via DR drill.</li>
          <li><strong>Redis:</strong> RDB snapshot every 15 minutes + AOF for &lt;1 second RPO. Snapshots stored in S3.</li>
          <li><strong>Kafka:</strong> Tiered storage to S3 provides implicit backup. MirrorMaker2 replicates critical topics (session.lifecycle, payment.events) to secondary region.</li>
        </ul>
        <strong>DR Runbook (Region Failure)</strong>
        <div class="code-box">
1. Route53 health check detects primary failure
2. Automated failover: ALB health checks fail
   → Route53 fails over to secondary region
   (DNS TTL: 60s → propagation ~60s)
3. Aurora Global DB: promote secondary to primary
   → takes 1 minute
4. OCPP gateways in secondary start accepting
   charger reconnects (chargers retry on WS close)
5. Redis: fresh state rebuilds from charger
   reconnect heartbeats within 5 minutes
6. Kafka: consumers in secondary region
   pick up from last committed offset
7. Alert engineering team, begin primary recovery
        </div>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 24: Migration Strategy -->
<div class="ref-section">
  <div class="ref-title">24. Migration Strategy</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Monolith to Microservices Migration</strong>
        <p>Most EV charging networks start with a monolithic OCPP server (common open-source: SteVe, OCPP-J-Server). Migration path using Strangler Fig pattern:</p>
        <div class="code-box">
Phase 1 (Month 1-3): Extract OCPP Gateway
- Deploy new OCPP Gateway cluster alongside monolith
- Route 10% of new charger registrations to new cluster
- Dual-write session events to both systems
- Validate with shadow mode comparison
- Graduate: 25% → 50% → 100% over 2 months

Phase 2 (Month 3-6): Extract Discovery Service
- Deploy Redis Geo alongside monolith DB queries
- Sync station data via CDC (Debezium → Kafka)
- A/B test: route 50% search traffic to new svc
- Validate latency improvement before full cutover

Phase 3 (Month 6-12): Extract Payment Service
- Most risky: requires double-run reconciliation
- Both old and new charge for 2-week parallel period
- Financial reconciliation confirms match
- Hard cutover with 4-hour maintenance window

Phase 4 (Month 12-18): Decommission monolith
- Remove dual-write code paths
- Validate all traffic on microservices for 30 days
- Final monolith shutdown
        </div>
      </div>
      <div>
        <strong>OCPP Protocol Migration (1.6 → 2.0.1)</strong>
        <p>Millions of deployed chargers run OCPP 1.6. Protocol migration is a multi-year hardware refresh cycle:</p>
        <div class="code-box">
// OCPP Gateway supports both versions:
WebSocket path routing:
  /ocpp/1.6/{charger_id} → OCPP 1.6 handler
  /ocpp/2.0.1/{charger_id} → OCPP 2.0.1 handler
  /ocpp/{charger_id} → auto-detect via
                       BootNotification payload

// Protocol adapter layer:
OCPP 1.6 TransactionEvent →
  normalised SessionEvent (internal format) →
  OCPP 2.0.1 format for new session service

// Feature gating:
Smart Charging: only for OCPP 2.0.1 chargers
ISO 15118 / V2G: only for OCPP 2.0.1 + AC chargers
RFID-free / Plug &amp; Charge: OCPP 2.0.1 + ISO 15118
        </div>
        <strong>Data Migration</strong>
        <p>Historical session data migration from legacy relational DB to Cassandra: Apache Spark batch job reads legacy DB, transforms, and bulk-loads to Cassandra using DSBulk (DataStax Bulk Loader). Processed 500M historical sessions in 72 hours with 20 Spark executors on EMR.</p>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 25: Interview Questions & Answers -->
<div class="ref-section">
  <div class="ref-title">25. Interview Questions &amp; Answers</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><td>Question</td><td>Answer</td><td>Key Insight</td></tr>
      <tr class="pt-row"><td class="pt-name">How do you handle 8M persistent WebSocket connections?</td><td>160 OCPP gateway nodes, 50K WS connections each. Node.js/Go event loop — non-blocking I/O. Consistent hash ring routes charger ID to specific node. Load balancer at front, HAProxy for charger reconnect routing.</td><td>Event loop model vs thread-per-connection. 50K WS ≠ 50K threads. This is the key architectural challenge unique to EV systems.</td></tr>
      <tr class="pt-row"><td class="pt-name">How do you prevent double-booking a connector?</td><td>PostgreSQL SERIALIZABLE isolation with a conflict-detecting query: SELECT 1 WHERE booking overlaps. Wrapped in transaction — serialisation failure retried. Distributed lock via Redlock for cross-shard scenarios. Booking window constraint at DB level.</td><td>Database-level serialisation cheaper and more correct than application-level locking for booking conflict detection.</td></tr>
      <tr class="pt-row"><td class="pt-name">How do you ensure exactly-once billing?</td><td>Stripe idempotency keys per session_id + Kafka transactions for payment consumer. If consumer crashes between Kafka consume and Stripe charge, reprocessing uses same key → Stripe returns original result. No double charge.</td><td>Kafka transactions + external system idempotency keys = exactly-once in distributed payment flows.</td></tr>
      <tr class="pt-row"><td class="pt-name">How fresh is charger availability data in the app?</td><td>OCPP StatusNotification triggers immediate Kafka publish → Redis update → &lt;500ms end-to-end. App polls or gets SSE push every 30s. Stale reads possible during Kafka consumer lag — typically &lt;2s, alert threshold 5s. Dead charger detection via heartbeat timeout (5min).</td><td>Real-time availability requires event-driven path (OCPP → Kafka → Redis), not DB polling. Acknowledge and bound the stale window.</td></tr>
      <tr class="pt-row"><td class="pt-name">How do you handle a charger going offline mid-session?</td><td>OCPP Heartbeat timeout (5min) detected by gateway. Session Service marks session as INTERRUPTED. Cassandra has last MeterValues reading. Payment Service bills for energy delivered (from last confirmed MeterValues). Driver notified via push notification. Booking compensation triggered.</td><td>Design for charger hardware unreliability. Last known good MeterValues from Cassandra used as billing source of truth.</td></tr>
      <tr class="pt-row"><td class="pt-name">Why TimescaleDB instead of InfluxDB for energy metrics?</td><td>TimescaleDB is PostgreSQL extension — existing team SQL expertise, JOINs with station metadata, full ACID compliance for billing aggregates. InfluxDB better for pure IoT cardinality scenarios. TimescaleDB compression (90%) and continuous aggregates match our analytics needs without new DB technology.</td><td>Technology choice rationale: leverage existing expertise, JOIN capability, SQL standardisation often outweighs specialised IoT DB benefits.</td></tr>
      <tr class="pt-row"><td class="pt-name">How do you scale the geo-search for 50K QPS?</td><td>Redis GEORADIUS handles &lt;5ms at 50K QPS with Redis Cluster (6 shards). CDN caches API responses with coordinate rounding to 3dp (cache hit 60%). Elasticsearch as overflow for complex filter queries (&lt;5% of traffic). No DB hits on hot path.</td><td>Cache the expensive geo-computation at multiple layers: Redis (in-memory geo), CDN (HTTP response). DB is read only on cache miss.</td></tr>
      <tr class="pt-row"><td class="pt-name">How does smart charging work technically?</td><td>OCPP SetChargingProfile command sent from Energy Mgmt Service to charger via OCPP Gateway. Profile specifies charging rate limits per time period. Energy Mgmt Service subscribes to OpenADR demand response signals and optimises via linear programming (minimize cost subject to departure time and SoC constraints).</td><td>OCPP Smart Charging feature profile. The mathematical optimisation (LP) is what creates real business value beyond basic charging.</td></tr>
      <tr class="pt-row"><td class="pt-name">How do you handle OCPI roaming between networks?</td><td>OCPI 2.2.1 protocol: partner networks register via OCPI credentials handshake. Roaming sessions create CDRs (Charge Detail Records) exchanged between CPO and eMSP. Our session service maps external session IDs. Payment settled via OCPI P2P or hub-based clearing (e.g., Gireve).</td><td>EV charging interoperability is a business/protocol problem, not just technical. OCPI is the ISO for network roaming.</td></tr>
      <tr class="pt-row"><td class="pt-name">How would you design the search to find chargers along a route?</td><td>Accept route polyline as GeoJSON. Elasticsearch geo_shape query with buffered corridor polygon (1km buffer around route). Intersect with available connectors matching power/type filters. Return up to 20 charging stops sorted by route deviation distance. Route geometry computed client-side or via HERE/Google Maps SDK.</td><td>Route-corridor search requires geo_shape (polygon) queries, not geo_point radius. Key database: PostgreSQL PostGIS or Elasticsearch geo_shape for polygon intersect.</td></tr>
    </table>
  </div>
</div>

<!-- SECTION 26: Trade-off Summary -->
<div class="ref-section">
  <div class="ref-title">26. Trade-off Summary</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;font-weight:bold;color:#94a3b8;font-size:12px;padding:6px 12px;">
        <span>Decision</span><span>Chosen Approach ✅</span><span>Alternative Considered ❌</span>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <span class="dt-name">OCPP Gateway language</span>
        <span class="dt-yes">Node.js — event loop ideal for 50K WS/node, non-blocking, mature OCPP libraries, large ecosystem</span>
        <span class="dt-no">Go — lower memory per goroutine but more complex connection lifecycle management; Java — too heavy per connection</span>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <span class="dt-name">Charger availability store</span>
        <span class="dt-yes">Redis Geo + Hash — sub-ms geo queries, in-memory availability hash, 1.6GB for 8M connectors, cluster horizontal scale</span>
        <span class="dt-no">PostgreSQL PostGIS — ACID stronger but 10-50ms geo queries too slow for 50K QPS discovery; DynamoDB — no native geo primitives</span>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <span class="dt-name">Session telemetry storage</span>
        <span class="dt-yes">Cassandra — optimised for time-series writes, session_id partition key ensures sequential reads for billing, TWCS compaction matches TTL pattern</span>
        <span class="dt-no">InfluxDB — better cardinality but SQL ecosystem lost; Elasticsearch — not optimised for high-cardinality sequential writes</span>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <span class="dt-name">Energy metrics DB</span>
        <span class="dt-yes">TimescaleDB — PostgreSQL extension, SQL JOINs with stations table, continuous aggregates, 90% compression, team SQL expertise</span>
        <span class="dt-no">InfluxDB — better raw IoT ingest but no JOINs, different query language; Prometheus — pull-based, not suitable for billing-grade storage</span>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <span class="dt-name">Driver app real-time updates</span>
        <span class="dt-yes">SSE — unidirectional push sufficient, HTTP/2 compatible, auto-reconnect standard, simpler load balancing than WebSocket</span>
        <span class="dt-no">WebSocket — bidirectional not needed for telemetry; Long polling — 30s updates don't justify polling overhead</span>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <span class="dt-name">Booking consistency model</span>
        <span class="dt-yes">PostgreSQL SERIALIZABLE — prevents double-booking at DB level, no application-level locking complexity, correct by construction</span>
        <span class="dt-no">Optimistic concurrency (version column) — more retries under contention; Redis Redlock only — no durable audit trail</span>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <span class="dt-name">Message broker</span>
        <span class="dt-yes">Kafka — 2M msgs/sec throughput, consumer group replay for analytics, log compaction for station events, exactly-once semantics for payments</span>
        <span class="dt-no">AWS SQS — simpler ops but no replay/compaction; RabbitMQ — better routing but lower throughput, no durable replay</span>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <span class="dt-name">OCCP Gateway state</span>
        <span class="dt-yes">Stateful on gateway node (charger session per node), state backed to Redis — fast local lookup, Redis for failover recovery</span>
        <span class="dt-no">Fully stateless gateway with all state in Redis — 1 extra Redis RTT per OCPP message, higher Redis load, unnecessary for normal operation</span>
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
        <li><strong>OCPP protocol mastery is the core differentiator:</strong> EV charging system design fundamentally differs from typical web backends because of the OCPP WebSocket state machine. Understanding charger ↔ server message flows (BootNotification, StatusNotification, TransactionEvent, MeterValues, SetChargingProfile) is what separates a generic answer from an expert design.</li>
        <li><strong>Persistent connections require a different architecture:</strong> 8M WebSocket connections cannot be handled by stateless HTTP servers. The consistent-hash gateway cluster pattern — where each charger owns a node, state is in Redis, and reconnect is deterministic — is the standard solution for large-scale OCPP deployments.</li>
        <li><strong>Polyglot persistence is justified by data shape:</strong> PostgreSQL for relational bookings/stations (ACID, SQL), Cassandra for time-series session telemetry (sequential writes by session_id), TimescaleDB for energy aggregates (SQL + time-series compression), Redis for real-time availability (sub-ms geo + hash). Each chosen based on access pattern, not fashion.</li>
        <li><strong>Exactly-once billing requires layered idempotency:</strong> API idempotency keys in Redis + Kafka transaction semantics + Stripe idempotency keys creates a three-layer guarantee. Any single layer can fail independently; the combination prevents double charges.</li>
        <li><strong>Smart charging is an economic, not just technical, feature:</strong> OCPP SetChargingProfile + OpenADR demand response + linear programming optimisation creates real revenue (DR event payments) and cost reduction (off-peak charging) that justifies the engineering investment. V2G takes this further with bidirectional grid participation.</li>
        <li><strong>Geo-search latency budget demands in-memory solutions:</strong> Redis GEORADIUS at &lt;5ms handles 50K QPS comfortably. PostgreSQL PostGIS at 10-50ms would require 10x the infrastructure to meet the same SLO. Right tool for the right latency budget — not all geo-search is the same.</li>
        <li><strong>Protocol migration is a multi-year programme:</strong> OCPP 1.6 → 2.0.1 cannot be a big-bang switch because millions of deployed chargers need firmware updates. The protocol adapter / dual-path gateway pattern is essential for any production EV platform operating at scale. Design for backward compatibility from day one.</li>
      </ul>
    </div>
  </div>
</div>
`;
