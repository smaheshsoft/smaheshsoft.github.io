window.Pages['sd-paytm'] = `
<div class="page-header">
  <div class="breadcrumb">System Design</div>
  <h1>Paytm Payment Wallet</h1>
  <p>End-to-end design of a high-throughput digital payment wallet supporting UPI, wallet transfers, merchant payments, and settlement at scale.</p>
  <div class="tag-grid">
    <span class="tag">Fintech</span>
    <span class="tag">Wallet</span>
    <span class="tag">UPI</span>
    <span class="tag">Payments</span>
    <span class="tag">ACID</span>
    <span class="tag">Kafka</span>
    <span class="tag">Redis</span>
    <span class="tag">Fraud Detection</span>
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
      <!-- Background -->
      <rect width="900" height="420" fill="#0d1117" rx="10"/>

      <!-- Layer Labels -->
      <text x="10" y="65" font-size="11" fill="#888" font-family="monospace">CLIENT</text>
      <text x="10" y="155" font-size="11" fill="#888" font-family="monospace">GATEWAY</text>
      <text x="10" y="255" font-size="11" fill="#888" font-family="monospace">SERVICES</text>
      <text x="10" y="375" font-size="11" fill="#888" font-family="monospace">DATA</text>

      <!-- Layer separator lines -->
      <line x1="70" y1="80" x2="890" y2="80" stroke="#1f2937" stroke-width="1"/>
      <line x1="70" y1="170" x2="890" y2="170" stroke="#1f2937" stroke-width="1"/>
      <line x1="70" y1="285" x2="890" y2="285" stroke="#1f2937" stroke-width="1"/>

      <!-- CLIENT LAYER -->
      <!-- Mobile App -->
      <rect x="110" y="28" width="110" height="44" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="165" y="46" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📱 Mobile App</text>
      <text x="165" y="60" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">iOS / Android</text>

      <!-- Web -->
      <rect x="250" y="28" width="110" height="44" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="305" y="46" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🌐 Web App</text>
      <text x="305" y="60" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">React SPA</text>

      <!-- Merchant POS -->
      <rect x="390" y="28" width="110" height="44" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="445" y="46" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🏪 Merchant POS</text>
      <text x="445" y="60" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">SDK / QR</text>

      <!-- GATEWAY LAYER -->
      <!-- API Gateway -->
      <rect x="200" y="93" width="130" height="44" rx="8" fill="#1a2d20" stroke="#4ade80" stroke-width="1.5"/>
      <text x="265" y="111" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🔀 API Gateway</text>
      <text x="265" y="125" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Rate Limit / Auth / TLS</text>

      <!-- Load Balancer -->
      <rect x="360" y="93" width="130" height="44" rx="8" fill="#1a2d20" stroke="#4ade80" stroke-width="1.5"/>
      <text x="425" y="111" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">⚖️ Load Balancer</text>
      <text x="425" y="125" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">NGINX / AWS ALB</text>

      <!-- SERVICES LAYER -->
      <!-- Wallet Service -->
      <rect x="80" y="185" width="105" height="44" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="132" y="203" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">💰 Wallet</text>
      <text x="132" y="217" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Ledger / Balance</text>

      <!-- Payment Processing -->
      <rect x="200" y="185" width="105" height="44" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="252" y="203" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">💳 Payment</text>
      <text x="252" y="217" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">RBI / Bank APIs</text>

      <!-- UPI Service -->
      <rect x="320" y="185" width="105" height="44" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="372" y="203" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🔗 UPI Svc</text>
      <text x="372" y="217" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">NPCI Integration</text>

      <!-- Fraud Detection -->
      <rect x="440" y="185" width="105" height="44" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="492" y="203" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🛡️ Fraud ML</text>
      <text x="492" y="217" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Real-time Scoring</text>

      <!-- KYC Service -->
      <rect x="560" y="185" width="105" height="44" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="612" y="203" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🪪 KYC Svc</text>
      <text x="612" y="217" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Aadhaar / PAN</text>

      <!-- Notification -->
      <rect x="680" y="185" width="105" height="44" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="732" y="203" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🔔 Notify</text>
      <text x="732" y="217" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">SMS / Push / Email</text>

      <!-- Settlement -->
      <rect x="800" y="185" width="88" height="44" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="844" y="203" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🏦 Settle</text>
      <text x="844" y="217" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Bank Settlement</text>

      <!-- Kafka -->
      <rect x="340" y="248" width="120" height="30" rx="8" fill="#2d2a1a" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="400" y="268" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📨 Kafka</text>

      <!-- DATA LAYER -->
      <!-- MySQL/Aurora -->
      <rect x="80" y="303" width="105" height="44" rx="8" fill="#1a2040" stroke="#60a5fa" stroke-width="1.5"/>
      <text x="132" y="321" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🗄️ MySQL</text>
      <text x="132" y="335" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Ledger (ACID)</text>

      <!-- Redis -->
      <rect x="205" y="303" width="105" height="44" rx="8" fill="#2d1a1a" stroke="#f87171" stroke-width="1.5"/>
      <text x="257" y="321" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">⚡ Redis</text>
      <text x="257" y="335" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Balance Cache</text>

      <!-- Cassandra -->
      <rect x="330" y="303" width="105" height="44" rx="8" fill="#1a2040" stroke="#34d399" stroke-width="1.5"/>
      <text x="382" y="321" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📦 Cassandra</text>
      <text x="382" y="335" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Event Log</text>

      <!-- Elasticsearch -->
      <rect x="455" y="303" width="105" height="44" rx="8" fill="#1a2040" stroke="#34d399" stroke-width="1.5"/>
      <text x="507" y="321" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🔍 Elastic</text>
      <text x="507" y="335" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Txn Search</text>

      <!-- HDFS -->
      <rect x="580" y="303" width="105" height="44" rx="8" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="632" y="321" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🗂️ HDFS/S3</text>
      <text x="632" y="335" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Analytics / Audit</text>

      <!-- Monitoring -->
      <rect x="705" y="303" width="105" height="44" rx="8" fill="#2d1f1a" stroke="#fb923c" stroke-width="1.5"/>
      <text x="757" y="321" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📊 Grafana</text>
      <text x="757" y="335" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Prometheus / Jaeger</text>

      <!-- ARROWS: Client → Gateway -->
      <line x1="165" y1="72" x2="245" y2="93" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="305" y1="72" x2="300" y2="93" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="445" y1="72" x2="400" y2="93" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Gateway → Services -->
      <line x1="265" y1="137" x2="200" y2="185" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="265" y1="137" x2="252" y2="185" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="330" y1="137" x2="372" y2="185" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="425" y1="137" x2="492" y2="185" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="425" y1="137" x2="612" y2="185" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Services → Kafka -->
      <line x1="132" y1="229" x2="350" y2="248" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="252" y1="229" x2="370" y2="248" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="492" y1="229" x2="420" y2="248" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="732" y1="229" x2="450" y2="248" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Kafka → Data -->
      <line x1="370" y1="278" x2="200" y2="303" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="390" y1="278" x2="382" y2="303" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="420" y1="278" x2="480" y2="303" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="400" y1="278" x2="600" y2="303" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Wallet → MySQL -->
      <line x1="132" y1="229" x2="132" y2="303" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
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
        <p>Design a secure, high-throughput digital payment wallet that supports peer-to-peer (P2P) money transfer, UPI payments, merchant QR-code payments, bill payments, wallet top-up via debit/credit card, and NEFT/IMPS-based bank withdrawals — all at Paytm's scale of 300+ million registered users and 1.4 billion monthly transactions.</p>
        <strong>Scale Numbers</strong>
        <ul>
          <li>350 million registered users, 100M+ KYC-verified</li>
          <li>1.4 billion transactions/month (~540 TPS avg, 5000 TPS peak)</li>
          <li>20 million merchants accepting Paytm QR</li>
          <li>\$4 billion GMV/month</li>
          <li>99.99% uptime SLA (52 min/year downtime budget)</li>
          <li>P99 payment latency &lt; 2s end-to-end</li>
        </ul>
      </div>
      <div>
        <strong>Core Challenges</strong>
        <ul>
          <li>ACID-guaranteed double-entry ledger at massive scale</li>
          <li>Real-time fraud detection without blocking legitimate txns</li>
          <li>RBI regulatory compliance: KYC tiers, transaction limits, audit trails</li>
          <li>Idempotent payment APIs — network retries must not double-charge</li>
          <li>Multi-bank UPI routing with NPCI switch integration</li>
          <li>Sub-second wallet balance reads (cached) with strong consistency writes</li>
          <li>Zero-downtime deployments for a 24/7 payment system</li>
        </ul>
        <div class="pattern-table" style="margin-top:12px;">
          <div class="pt-header"><span>Requirement</span><span>Type</span><span>Target</span></div>
          <div class="pt-row"><span class="pt-name">P2P Transfer</span><span>Functional</span><span>Instant wallet-to-wallet</span></div>
          <div class="pt-row"><span class="pt-name">UPI Payments</span><span>Functional</span><span>NPCI UPI 2.0 compliant</span></div>
          <div class="pt-row"><span class="pt-name">Merchant Pay</span><span>Functional</span><span>QR scan / deep link</span></div>
          <div class="pt-row"><span class="pt-name">Throughput</span><span>Non-Functional</span><span>5000 TPS peak</span></div>
          <div class="pt-row"><span class="pt-name">Latency</span><span>Non-Functional</span><span>P99 &lt; 2s</span></div>
          <div class="pt-row"><span class="pt-name">Availability</span><span>Non-Functional</span><span>99.99% uptime</span></div>
          <div class="pt-row"><span class="pt-name">Consistency</span><span>Non-Functional</span><span>Strong for ledger writes</span></div>
          <div class="pt-row"><span class="pt-name">Security</span><span>Non-Functional</span><span>PCI-DSS, RBI guidelines</span></div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 2: Capacity Estimation -->
<div class="ref-section">
  <div class="ref-title">2. Capacity Estimation</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-header"><span>Metric</span><span>Assumption</span><span>Calculation</span><span>Result</span></div>
      <div class="pt-row"><span class="pt-name">Avg TPS</span><span>1.4B txns/month</span><span>1.4B / (30×86400)</span><span>~540 TPS</span></div>
      <div class="pt-row"><span class="pt-name">Peak TPS</span><span>10× avg (festival sales)</span><span>540 × 10</span><span>~5,400 TPS</span></div>
      <div class="pt-row"><span class="pt-name">Read:Write ratio</span><span>Balance checks dominate</span><span>~20:1</span><span>~108,000 reads/s peak</span></div>
      <div class="pt-row"><span class="pt-name">Transaction record size</span><span>Avg txn row ~500 bytes</span><span>1.4B × 500 B</span><span>~700 GB/month raw</span></div>
      <div class="pt-row"><span class="pt-name">MySQL storage (3 yr)</span><span>700 GB/month × 36</span><span>with 3× replication</span><span>~75 TB total</span></div>
      <div class="pt-row"><span class="pt-name">Cassandra event log</span><span>5 events/txn × 200B</span><span>1.4B × 5 × 200B × 36mo</span><span>~500 TB (compressed ~150 TB)</span></div>
      <div class="pt-row"><span class="pt-name">Redis memory</span><span>350M users × 64B balance entry</span><span>350M × 64</span><span>~22 GB (hot set ~5 GB)</span></div>
      <div class="pt-row"><span class="pt-name">Kafka throughput</span><span>Each txn → 3 events avg</span><span>5400 × 3 × 1 KB</span><span>~16 MB/s ingress</span></div>
      <div class="pt-row"><span class="pt-name">App servers needed</span><span>Each handles 200 TPS</span><span>5400 / 200</span><span>~27 nodes (×2 for HA = 54)</span></div>
      <div class="pt-row"><span class="pt-name">Fraud model latency budget</span><span>Must complete in-line</span><span>P99 &lt; 150ms</span><span>Feature vector + model inference</span></div>
    </div>
  </div>
</div>

<!-- SECTION 3: APIs -->
<div class="ref-section">
  <div class="ref-title">3. API Design</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-header"><span>Method + Endpoint</span><span>Auth</span><span>Description</span></div>
      <div class="pt-row"><span class="pt-name">POST /v2/wallet/pay</span><span>JWT + mPIN</span><span>Wallet-to-wallet / merchant payment</span></div>
      <div class="pt-row"><span class="pt-name">POST /v2/upi/pay</span><span>JWT + UPI PIN</span><span>Initiate UPI collect / pay request</span></div>
      <div class="pt-row"><span class="pt-name">GET /v2/wallet/balance</span><span>JWT</span><span>Fetch current wallet balance (from cache)</span></div>
      <div class="pt-row"><span class="pt-name">GET /v2/transactions?page&amp;limit</span><span>JWT</span><span>Paginated transaction history</span></div>
      <div class="pt-row"><span class="pt-name">POST /v2/wallet/topup</span><span>JWT + OTP</span><span>Add money via card / net banking</span></div>
      <div class="pt-row"><span class="pt-name">POST /v2/wallet/withdraw</span><span>JWT + mPIN</span><span>Transfer to linked bank account</span></div>
      <div class="pt-row"><span class="pt-name">POST /v2/kyc/initiate</span><span>JWT</span><span>Start Aadhaar / PAN KYC flow</span></div>
      <div class="pt-row"><span class="pt-name">GET /v2/kyc/status</span><span>JWT</span><span>KYC verification status</span></div>
      <div class="pt-row"><span class="pt-name">POST /v2/merchant/qr/generate</span><span>API Key</span><span>Generate static / dynamic QR for merchant</span></div>
      <div class="pt-row"><span class="pt-name">GET /v2/merchant/settlements</span><span>API Key</span><span>Merchant settlement history</span></div>
    </div>
    <div class="code-box">
// POST /v2/wallet/pay — Request
{
  "idempotency_key": "550e8400-e29b-41d4-a716-446655440000",  // client-generated UUID
  "sender_wallet_id": "W_usr_83hd92",
  "receiver_id": "user@paytm",          // UPI ID, phone, or wallet ID
  "amount_paise": 50000,                 // ₹500.00 in paise (avoid float)
  "currency": "INR",
  "description": "Dinner split",
  "device_fingerprint": "df_abc123",
  "location": { "lat": 28.6, "lon": 77.2 }
}

// POST /v2/wallet/pay — Response (200 OK)
{
  "transaction_id": "TXN20240704083045_8d3f",
  "status": "SUCCESS",                  // SUCCESS | PENDING | FAILED
  "sender_balance_paise": 150000,
  "timestamp": "2024-07-04T08:30:45.123Z",
  "receiver_name": "Rahul Sharma",
  "fraud_score": 0.02,                  // internal, may be omitted in prod
  "message": "Payment of ₹500.00 successful"
}

// Design Standards:
// 1. All amounts in PAISE (integer) — never float for money
// 2. idempotency_key required on all mutating endpoints
// 3. HTTP 200 only when fully committed; 202 for async (UPI collect)
// 4. Errors follow RFC 7807 Problem Details: { type, title, status, detail, instance }
// 5. Rate limits: 10 pay requests/minute per user; 1000 req/min per merchant API key
    </div>
    <div class="tip-box">
      <strong>Idempotency Pattern:</strong> The server stores idempotency_key → response_payload in Redis with TTL 24h. On duplicate request, return cached response without re-executing the transaction. This is critical for mobile clients on flaky networks.
    </div>
  </div>
</div>

<!-- SECTION 4: High-Level Architecture -->
<div class="ref-section">
  <div class="ref-title">4. High-Level Architecture</div>
  <div class="ref-body">
    <div class="code-box">
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT TIER                            │
│  [Mobile App]   [Web SPA]   [Merchant POS SDK]             │
└──────────────┬──────────────┬──────────────────────────────┘
               │  HTTPS/TLS   │
┌──────────────▼──────────────▼──────────────────────────────┐
│  EDGE / GATEWAY TIER                                        │
│  [Cloudflare WAF] → [AWS ALB] → [API Gateway (Kong)]       │
│   Rate Limiting / JWT Validation / SSL Termination         │
└──────────┬──────────────┬───────────────────────────────────┘
           │              │
┌──────────▼──────────────▼───────────────────────────────────┐
│  MICROSERVICES TIER (Kubernetes on EKS)                     │
│  [Wallet Svc] [Payment Svc] [UPI Svc] [KYC Svc]           │
│  [Fraud ML Svc] [Merchant Svc] [Notification Svc]          │
│  [Settlement Svc] [Transaction History Svc]                 │
└──────┬──────────┬──────────────┬───────────────────────────┘
       │  Kafka   │  Sync RPC    │  DB Calls
┌──────▼──────────▼──────────────▼───────────────────────────┐
│  DATA TIER                                                  │
│  [MySQL Aurora — Ledger]  [Redis Cluster — Balance Cache]  │
│  [Cassandra — Event Log]  [Elasticsearch — Txn Search]     │
│  [S3/HDFS — Analytics &amp; Audit Logs]                        │
└─────────────────────────────────────────────────────────────┘
    </div>
    <div class="two-col">
      <div>
        <strong>Gateway Layer</strong><br/>
        Cloudflare absorbs DDoS. Kong API Gateway handles JWT validation, rate limiting, request routing to downstream services, and circuit-breaker policies. SSL terminates at the load balancer — services communicate over mTLS internally.
        <br/><br/>
        <strong>Service Communication</strong><br/>
        Synchronous gRPC between tightly coupled services (Wallet ↔ Fraud, Wallet ↔ Payment). Asynchronous Kafka events for side-effects (notifications, settlement, analytics) to decouple critical path from non-critical.
      </div>
      <div>
        <strong>Data Layer Design</strong><br/>
        MySQL Aurora Multi-Master for the financial ledger (ACID). Redis for hot wallet balance reads (~22ms cache, vs ~5ms DB). Cassandra for append-only event log (high write throughput). Elasticsearch for full-text transaction search by description, merchant name, or amount range.
        <br/><br/>
        <strong>Deployment</strong><br/>
        All services run on EKS (Kubernetes) across 3 AZs in ap-south-1 (Mumbai). Service mesh via Istio provides mutual TLS, observability, and traffic management.
      </div>
    </div>
  </div>
</div>

<!-- SECTION 5: Core Service — Wallet Service (Ledger) -->
<div class="ref-section">
  <div class="ref-title">5. Core Service: Wallet Service &amp; Ledger Engine</div>
  <div class="ref-body">
    <p>The Wallet Service is the financial heart of Paytm. It maintains a double-entry ledger ensuring every debit has a corresponding credit — the fundamental accounting invariant that guarantees total money in the system is conserved.</p>
    <div class="two-col">
      <div>
        <strong>Double-Entry Ledger Model</strong>
        <div class="code-box">
-- Every payment creates TWO journal entries
INSERT INTO ledger_entries (wallet_id, type, amount, txn_id, balance_after)
VALUES
  ('W_sender', 'DEBIT',  50000, 'TXN_abc', 150000),
  ('W_receiver','CREDIT', 50000, 'TXN_abc', 200000);

-- Both rows committed in ONE transaction:
BEGIN;
  -- 1. Optimistic lock check
  SELECT balance FROM wallets WHERE id='W_sender' FOR UPDATE;
  -- 2. Validate balance >= amount
  -- 3. Debit sender
  UPDATE wallets SET balance = balance - 50000 WHERE id='W_sender';
  -- 4. Credit receiver
  UPDATE wallets SET balance = balance + 50000 WHERE id='W_receiver';
  -- 5. Insert ledger entries
  INSERT INTO ledger_entries ...;
COMMIT;
        </div>
      </div>
      <div>
        <strong>Balance Caching Strategy</strong>
        <div class="code-box">
// Cache-aside with write-through for balance
async function debitWallet(senderId, amount, txnId) {
  const lock = await redisLock(\`wallet:\${senderId}:lock\`, 5000);
  try {
    // Read from cache (or DB on miss)
    let balance = await redis.get(\`wallet:\${senderId}:balance\`);
    if (!balance) balance = await db.query(...);

    if (balance &lt; amount) throw new InsufficientFunds();

    // Write to DB first (source of truth)
    await db.transaction(async (trx) => {
      await trx('wallets').decrement('balance', amount)...;
      await trx('ledger_entries').insert(...);
    });

    // Update cache atomically
    await redis.set(\`wallet:\${senderId}:balance\`,
      balance - amount, 'EX', 300);
  } finally {
    await lock.release();
  }
}
        </div>
        <strong>Wallet Limits (RBI Rules)</strong>
        <ul>
          <li>Min KYC: ₹10,000 balance cap, ₹10,000/month load limit</li>
          <li>Full KYC: ₹2,00,000 balance cap, no load limit</li>
          <li>P2P transfer: ₹1,00,000/day per user</li>
        </ul>
      </div>
    </div>
    <div class="warn-box">
      <strong>Distributed Transaction Risk:</strong> When the wallet-to-wallet transfer involves two different DB shards, use the Saga pattern with compensating transactions — not 2-phase commit (too slow). The Wallet Service publishes a PAYMENT_INITIATED event; each participant either commits or publishes a ROLLBACK event.
    </div>
  </div>
</div>

<!-- SECTION 6: Core Service — Payment Processing & UPI -->
<div class="ref-section">
  <div class="ref-title">6. Core Service: Payment Processing &amp; UPI Integration</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Payment State Machine</strong>
        <div class="code-box">
INITIATED → FRAUD_CHECK → AUTHORIZED
         → PROCESSING  → SUCCESS
                       → FAILED
                       → TIMEOUT → REVERSAL
        </div>
        <p>Every state transition is persisted to the payments table before the action is taken. This enables crash recovery — on restart, scan for PROCESSING payments older than 30s and trigger reversal/re-query.</p>

        <strong>Idempotent Payment Processing</strong>
        <div class="code-box">
-- Idempotency key prevents duplicate charges
CREATE TABLE payment_idempotency (
  idempotency_key VARCHAR(64) PRIMARY KEY,
  transaction_id  VARCHAR(64),
  response_json   TEXT,
  created_at      TIMESTAMP,
  expires_at      TIMESTAMP   -- 24h TTL
);

-- On each request:
-- 1. Check idempotency_key in table
-- 2. If exists: return stored response
-- 3. If not: process, then INSERT with response
        </div>
      </div>
      <div>
        <strong>UPI Integration Architecture</strong>
        <div class="code-box">
// UPI Pay Flow
User → Paytm App
     → UPI Service (Paytm PSP)
     → NPCI UPI Switch
     → Beneficiary Bank VPA resolve
     → Debit user's linked bank account
     → Credit merchant / receiver
     → Callback to Paytm UPI Service
     → Update Paytm transaction status
     → Notify user (push + SMS)

// Paytm is a Payment Service Provider (PSP)
// licensed by NPCI. Connects via secure
// HSM-protected API to NPCI switch.
        </div>
        <strong>Bank Integration</strong>
        <ul>
          <li>NPCI UPI 2.0 switch (primary P2P &amp; merchant)</li>
          <li>NEFT/IMPS/RTGS for bank withdrawals via nodal account</li>
          <li>Payment aggregator APIs (Razorpay for card top-ups)</li>
          <li>RBI-licensed Prepaid Payment Instrument (PPI) for wallet</li>
        </ul>
        <div class="tip-box">
          <strong>Nodal Account:</strong> Paytm holds all user wallet balances in RBI-designated nodal bank accounts. User wallet balance is a virtual ledger entry backed by actual money in the nodal account — a regulatory requirement.
        </div>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 7: Core Service — Fraud Detection -->
<div class="ref-section">
  <div class="ref-title">7. Core Service: Real-Time Fraud Detection</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Two-Stage Fraud Detection</strong>
        <p><strong>Stage 1 — Rule Engine (synchronous, &lt;10ms):</strong> Fast hard-block rules evaluated before payment proceeds. Uses Redis Bloom filters and rule sets.</p>
        <div class="code-box">
Rules checked synchronously:
- Velocity: &gt;10 txns in 5 min → BLOCK
- Amount spike: 3× user's 30-day avg → FLAG
- Device risk: new device + high amount → OTP challenge
- Geographic: impossible travel (&gt;1000 km in &lt;1h) → BLOCK
- Blacklist: receiver VPA/phone in fraud list → BLOCK
- Account age: new account + high amount → HOLD
        </div>
        <p><strong>Stage 2 — ML Model (synchronous, &lt;150ms):</strong> Gradient Boosted Tree model trained on 2B+ historical transactions. Feature vector includes 200+ features.</p>
      </div>
      <div>
        <strong>ML Feature Engineering</strong>
        <div class="code-box">
// Feature vector (computed at request time)
{
  "user_txn_count_1h": 3,
  "user_txn_count_24h": 12,
  "user_avg_txn_amount_30d": 450.50,
  "current_amount_zscore": 2.1,
  "device_age_days": 45,
  "receiver_txn_count_7d": 8920,   // merchant signal
  "user_merchant_txn_history": 3,  // repeat merchant
  "login_method": "biometric",
  "network_type": "wifi",
  "hour_of_day": 14,
  "day_of_week": 4,
  "is_high_risk_merchant_category": false
}

// Model outputs fraud_score 0.0–1.0
// &gt; 0.7 → BLOCK
// 0.4–0.7 → Step-up auth (OTP/PIN)
// &lt; 0.4 → PASS
        </div>
        <strong>Post-transaction async analysis:</strong> Deep learning model (LSTM) processes enriched event stream via Kafka for complex pattern detection (account takeover, money laundering). Triggers holds/blocks via account management service.
      </div>
    </div>
    <div class="pattern-table" style="margin-top:12px;">
      <div class="pt-header"><span>Signal</span><span>Data Source</span><span>Action</span></div>
      <div class="pt-row"><span class="pt-name">Velocity anomaly</span><span>Redis sliding window counter</span><span>Soft block + OTP</span></div>
      <div class="pt-row"><span class="pt-name">Device fingerprint mismatch</span><span>Device intelligence DB</span><span>Step-up auth challenge</span></div>
      <div class="pt-row"><span class="pt-name">Beneficiary blacklist</span><span>Fraud registry (Redis Bloom)</span><span>Hard block + alert</span></div>
      <div class="pt-row"><span class="pt-name">ML score &gt; 0.7</span><span>GBT model (150ms SLA)</span><span>Hard block</span></div>
      <div class="pt-row"><span class="pt-name">LSTM pattern (async)</span><span>Kafka stream + Flink</span><span>Account freeze + review</span></div>
    </div>
  </div>
</div>

<!-- SECTION 8: Database Design -->
<div class="ref-section">
  <div class="ref-title">8. Database Design</div>
  <div class="ref-body">
    <div class="code-box">
-- MySQL Aurora: wallets table
CREATE TABLE wallets (
  id              VARCHAR(32)   PRIMARY KEY,   -- 'W_usr_83hd92'
  user_id         BIGINT        NOT NULL UNIQUE,
  balance_paise   BIGINT        NOT NULL DEFAULT 0 CHECK (balance_paise &gt;= 0),
  kyc_level       ENUM('NONE','MIN','FULL') DEFAULT 'NONE',
  status          ENUM('ACTIVE','FROZEN','CLOSED') DEFAULT 'ACTIVE',
  daily_debit_used_paise  BIGINT DEFAULT 0,
  daily_reset_at  DATE,
  version         BIGINT        DEFAULT 0,     -- optimistic lock
  created_at      DATETIME      DEFAULT NOW(),
  updated_at      DATETIME      ON UPDATE NOW(),
  INDEX idx_user  (user_id)
) ENGINE=InnoDB;

-- MySQL Aurora: transactions table (sharded by user_id % 64)
CREATE TABLE transactions (
  id              VARCHAR(48)   PRIMARY KEY,   -- TXN_yyyymmdd_uuid
  idempotency_key VARCHAR(64)   UNIQUE NOT NULL,
  sender_wallet_id VARCHAR(32),
  receiver_wallet_id VARCHAR(32),
  amount_paise    BIGINT        NOT NULL,
  type            ENUM('P2P','MERCHANT','TOPUP','WITHDRAW','UPI'),
  status          ENUM('INITIATED','PROCESSING','SUCCESS','FAILED','REVERSED'),
  payment_method  ENUM('WALLET','UPI','CARD','NETBANKING'),
  fraud_score     DECIMAL(4,3),
  bank_ref_num    VARCHAR(64),
  description     VARCHAR(255),
  created_at      DATETIME(3)   NOT NULL,
  settled_at      DATETIME,
  INDEX idx_sender  (sender_wallet_id, created_at),
  INDEX idx_receiver (receiver_wallet_id, created_at),
  INDEX idx_status_created (status, created_at)
) ENGINE=InnoDB;

-- MySQL Aurora: ledger_entries (double-entry)
CREATE TABLE ledger_entries (
  id              BIGINT        AUTO_INCREMENT PRIMARY KEY,
  transaction_id  VARCHAR(48)   NOT NULL,
  wallet_id       VARCHAR(32)   NOT NULL,
  entry_type      ENUM('DEBIT','CREDIT'),
  amount_paise    BIGINT        NOT NULL,
  balance_after_paise BIGINT    NOT NULL,       -- snapshot for audit
  created_at      DATETIME(3)   NOT NULL,
  INDEX idx_wallet_time (wallet_id, created_at),
  INDEX idx_txn   (transaction_id)
) ENGINE=InnoDB;

-- Cassandra: payment_events (event sourcing log)
CREATE TABLE payment_events (
  partition_key   TEXT,     -- 'user_id:yyyymmdd'
  event_time      TIMEUUID,
  event_type      TEXT,     -- 'PAYMENT_INITIATED', 'FRAUD_CHECKED', etc.
  transaction_id  TEXT,
  payload         TEXT,     -- JSON blob
  PRIMARY KEY ((partition_key), event_time)
) WITH CLUSTERING ORDER BY (event_time DESC)
  AND compaction = {'class': 'TimeWindowCompactionStrategy'};

-- Elasticsearch: transactions index (search replica)
-- Index transactions for full-text search by description, merchant name
-- Updated asynchronously via Kafka consumer
-- Mapping: transaction_id, user_id, amount, merchant_name, description,
--          status, created_at, payment_type
    </div>
    <div class="two-col">
      <div>
        <strong>Sharding Strategy</strong>
        <p>Transactions table sharded by <code>user_id % 64</code> across 4 Aurora clusters (16 shards each). A shard map service routes queries. Wallet table uses consistent hashing. Cross-shard P2P transfer handled by Saga pattern.</p>
      </div>
      <div>
        <strong>Indexing Rationale</strong>
        <p>Ledger entries indexed on <code>(wallet_id, created_at)</code> for O(log n) range scans — the most common query pattern (statement download). Composite index on <code>(status, created_at)</code> for settlement batch jobs that process PENDING transactions.</p>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 9: Data Flow — Key Scenarios -->
<div class="ref-section">
  <div class="ref-title">9. Data Flow — Key Scenarios</div>
  <div class="ref-body">
    <strong>Flow 1: Wallet-to-Wallet P2P Payment</strong>
    <div class="flow-box">
      <div class="flow-step">1. User submits payment (POST /v2/wallet/pay) with idempotency_key</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">2. API Gateway: JWT validation, rate limit check (10 req/min), TLS termination</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">3. Fraud Service: Rule engine (&lt;10ms) → ML scoring (&lt;150ms) — PASS or BLOCK</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">4. Wallet Service: Check idempotency key in Redis — duplicate? Return cached response</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">5. Acquire distributed Redis lock on sender wallet ID (5s TTL)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">6. Read sender balance from Redis cache (or Aurora on cache miss)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">7. Aurora BEGIN TRANSACTION: debit sender, credit receiver, insert 2 ledger rows</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">8. COMMIT → update Redis balance cache for both wallets, release lock</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">9. Store idempotency_key → response in Redis (24h TTL)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">10. Publish PAYMENT_SUCCESS to Kafka → Notification Svc (push/SMS), Analytics Svc</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">11. Return 200 {transaction_id, status:"SUCCESS", balance} to client — total: ~300ms</div>
    </div>

    <strong style="margin-top:16px;display:block;">Flow 2: UPI Payment to Merchant</strong>
    <div class="flow-box">
      <div class="flow-step">1. User scans merchant QR — app decodes UPI deep link (upi://pay?pa=merchant@paytm&amp;am=500)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">2. Paytm UPI Service initiates collect request to NPCI switch with user's UPI PIN</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">3. NPCI routes to user's bank (e.g., SBI). Bank debits user's account.</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">4. NPCI sends callback to Paytm UPI Service with success/failure</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">5. UPI Service records transaction, publishes UPI_PAYMENT_SUCCESS to Kafka</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">6. Merchant Service consumer: credit merchant wallet, queue for settlement batch</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">7. Notification Service: push to buyer + merchant webhook callback</div>
    </div>

    <strong style="margin-top:16px;display:block;">Flow 3: Merchant Settlement (T+1 Batch)</strong>
    <div class="flow-box">
      <div class="flow-step">1. Settlement Service runs nightly batch job (01:00 IST)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">2. Query all SUCCESS merchant transactions from previous day (via Elasticsearch)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">3. Aggregate by merchant → net settlement amount (deduct MDR/commission)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">4. Generate NEFT/IMPS batch file → submit to nodal bank API</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">5. Mark transactions as SETTLED in DB, update merchant dashboard</div>
    </div>
  </div>
</div>

<!-- SECTION 10: Caching Strategy -->
<div class="ref-section">
  <div class="ref-title">10. Caching Strategy</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-header"><span>Cache Target</span><span>Strategy</span><span>TTL</span><span>Eviction / Invalidation</span></div>
      <div class="pt-row"><span class="pt-name">Wallet Balance</span><span>Write-through on every debit/credit</span><span>5 min (soft)</span><span>Invalidated on any balance change</span></div>
      <div class="pt-row"><span class="pt-name">Idempotency Keys</span><span>Write-once on txn creation</span><span>24h</span><span>TTL expiry — no manual eviction</span></div>
      <div class="pt-row"><span class="pt-name">Fraud Blacklist</span><span>Redis Bloom Filter + Set</span><span>No TTL (admin-managed)</span><span>Explicit DELETE on unblock</span></div>
      <div class="pt-row"><span class="pt-name">User Session / JWT</span><span>Cache aside on login</span><span>15 min (sliding)</span><span>Explicit logout or expiry</span></div>
      <div class="pt-row"><span class="pt-name">Velocity Counters</span><span>Redis INCR with sliding window</span><span>1h / 24h windows</span><span>Natural TTL expiry</span></div>
      <div class="pt-row"><span class="pt-name">Merchant Details</span><span>Cache aside (read-heavy)</span><span>1 hour</span><span>Event-driven on merchant update</span></div>
      <div class="pt-row"><span class="pt-name">UPI VPA Resolve</span><span>Cache aside</span><span>30 min</span><span>TTL — VPAs rarely change</span></div>
      <div class="pt-row"><span class="pt-name">Transaction History (page 1)</span><span>Cache aside</span><span>2 min</span><span>Invalidated on new transaction</span></div>
    </div>
    <div class="two-col" style="margin-top:12px;">
      <div>
        <strong>Redis Cluster Config</strong>
        <p>6-node Redis Cluster (3 primary + 3 replica) with hash slot sharding. Wallet balances routed to dedicated slot range to co-locate related keys. Lua scripts for atomic balance check-and-update to avoid TOCTOU race.</p>
        <div class="code-box">
-- Lua script: atomic balance check + debit
local balance = tonumber(redis.call('GET', KEYS[1]))
local amount  = tonumber(ARGV[1])
if balance == nil then return -1 end  -- cache miss
if balance &lt; amount then return -2 end -- insufficient
redis.call('SET', KEYS[1], balance - amount, 'EX', 300)
return balance - amount
        </div>
      </div>
      <div>
        <strong>Cache Consistency</strong>
        <p>Balance cache uses write-through: DB write and cache update occur in same logical operation (within distributed lock). Cache miss triggers DB read and cache population. Never read cache for settlement — always query Aurora for financial reconciliation.</p>
        <div class="warn-box">
          <strong>Anti-pattern:</strong> Never use Redis as the sole source of truth for balance. Always treat Aurora as authoritative. Redis is an acceleration layer — if corrupted or evicted, DB is the fallback.
        </div>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 11: Message Queue / Event Streaming -->
<div class="ref-section">
  <div class="ref-title">11. Message Queue &amp; Event Streaming (Kafka)</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Why Kafka over SQS/RabbitMQ?</strong>
        <ul>
          <li>Log retention: replay events for audit, analytics, and ML retraining</li>
          <li>High throughput: 16 MB/s ingress, millions of events/second</li>
          <li>Multiple independent consumers (notification, analytics, fraud async, settlement)</li>
          <li>Exactly-once semantics with idempotent producers + transactional consumers</li>
          <li>Ordered delivery within partition (per user_id partition key)</li>
        </ul>
        <strong>Topic Design</strong>
        <div class="code-box">
payment.events        (96 partitions, key=user_id)
  └─ PAYMENT_INITIATED, PAYMENT_SUCCESS, PAYMENT_FAILED

wallet.balance.updates (32 partitions, key=wallet_id)
  └─ BALANCE_DEBITED, BALANCE_CREDITED

fraud.alerts          (16 partitions, key=user_id)
  └─ FRAUD_BLOCKED, STEP_UP_REQUIRED, ACCOUNT_FROZEN

notification.requests (32 partitions, key=user_id)
  └─ PUSH_NOTIFICATION, SMS, EMAIL

settlement.events     (8 partitions, key=merchant_id)
  └─ MERCHANT_TXN_SETTLED

kyc.events            (8 partitions)
  └─ KYC_SUBMITTED, KYC_APPROVED, KYC_REJECTED
        </div>
      </div>
      <div>
        <strong>Producer Configuration</strong>
        <div class="code-box">
// Kafka producer settings for payment service
{
  "acks": "all",            // wait for all ISR replicas
  "retries": 3,
  "enable.idempotence": true,
  "max.in.flight.requests.per.connection": 1,
  "compression.type": "lz4",
  "linger.ms": 5,           // batching for throughput
  "batch.size": 65536
}
        </div>
        <strong>Consumer Groups</strong>
        <div class="code-box">
notification-consumer-group    (lag SLO: &lt;500ms)
fraud-async-consumer-group     (lag SLO: &lt;5s)
analytics-consumer-group       (lag SLO: &lt;60s, batch)
settlement-consumer-group      (lag SLO: &lt;5min)
audit-log-consumer-group       (lag SLO: &lt;1min)
elasticsearch-indexer-group    (lag SLO: &lt;10s)
        </div>
        <strong>Dead Letter Queue</strong>
        <p>Failed messages after 3 retries go to <code>payment.events.dlq</code>. An alerting consumer monitors DLQ size and pages on-call. DLQ is manually inspected and replayed after root cause fix.</p>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 12: Real-time Communication -->
<div class="ref-section">
  <div class="ref-title">12. Real-Time Communication</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Push Notification (Primary)</strong>
        <p>For mobile apps, Firebase Cloud Messaging (FCM) for Android and APNs for iOS deliver payment confirmations within 500ms of commit. This is the primary real-time channel — 95% of users receive notification via push.</p>
        <strong>Server-Sent Events (Web)</strong>
        <p>Web app uses SSE (/v2/notifications/stream) to receive real-time payment status updates. The SSE endpoint is a long-lived HTTP/2 connection. Paytm backend publishes to a Redis Pub/Sub channel keyed by user_id; SSE service subscribes and forwards.</p>
        <div class="code-box">
// SSE endpoint pattern
GET /v2/notifications/stream
Authorization: Bearer {jwt}

// Server sends:
data: {"type":"PAYMENT_SUCCESS","txn_id":"TXN_abc","amount":500}

data: {"type":"BALANCE_UPDATE","new_balance_paise":150000}
        </div>
      </div>
      <div>
        <strong>WebSocket (UPI Collect Requests)</strong>
        <p>UPI collect requests (someone requesting money from you) require bidirectional real-time communication. The mobile app maintains a WebSocket connection to receive collect requests with Accept/Decline UX. Connection is authenticated with JWT and heartbeated every 30s.</p>
        <strong>Long Polling (Fallback)</strong>
        <p>For 2G/low-connectivity scenarios, the mobile app falls back to long polling GET /v2/notifications/poll?since={timestamp} with 20s timeout. This adds a polling overhead of ~50ms latency for notifications.</p>
        <div class="pattern-table">
          <div class="pt-header"><span>Channel</span><span>Use Case</span><span>Latency</span></div>
          <div class="pt-row"><span class="pt-name">FCM/APNs</span><span>Payment confirmation</span><span>&lt;500ms</span></div>
          <div class="pt-row"><span class="pt-name">SSE</span><span>Web real-time balance</span><span>&lt;200ms</span></div>
          <div class="pt-row"><span class="pt-name">WebSocket</span><span>UPI collect requests</span><span>&lt;100ms</span></div>
          <div class="pt-row"><span class="pt-name">SMS</span><span>OTP, backup notify</span><span>2-10s</span></div>
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
        <strong>Strong Consistency: Financial Ledger</strong>
        <p>The ledger (MySQL Aurora) uses READ COMMITTED isolation with row-level locking via <code>SELECT ... FOR UPDATE</code>. All money movements are ACID transactions. Aurora Multi-Master ensures synchronous replication before commit acknowledgment — no money can be lost in a crash.</p>
        <strong>Distributed Locking</strong>
        <div class="code-box">
// Redlock algorithm for cross-service wallet locks
// Acquire lock on N/2+1 Redis nodes (majority)
const lock = await redlock.acquire(
  [\`lock:wallet:\${userId}\`],
  5000  // 5s TTL — prevents deadlock on crash
);
// Perform balance operation
await performTransaction();
// Release lock
await lock.release();

// If lock acquisition fails: retry with backoff
// Max 3 retries, 100ms backoff → return 429 or 503
        </div>
      </div>
      <div>
        <strong>Eventual Consistency: Analytics &amp; Search</strong>
        <p>Elasticsearch transaction index is updated asynchronously via Kafka (lag &lt;10s). This is acceptable — users querying transaction history tolerate slight delay for newly completed transactions.</p>
        <strong>Saga Pattern for Cross-Shard Transfers</strong>
        <div class="code-box">
// When sender and receiver on different DB shards
// Use choreography-based Saga:
1. WalletSvc publishes DEBIT_INITIATED
2. Shard A: debit sender, publish SENDER_DEBITED
3. Shard B: credit receiver, publish RECEIVER_CREDITED
4. Orchestrator: mark txn SUCCESS

// Compensation (rollback):
If RECEIVER_CREDITED fails within 30s timeout:
  Publish CREDIT_FAILED
  Shard A: reverse debit (DEBIT_REVERSED)
  Mark txn FAILED, notify user
        </div>
        <strong>Idempotency Guarantee</strong>
        <p>Every mutating API requires idempotency_key. Stored in both Redis (fast lookup, 24h TTL) and MySQL (permanent record). Server returns identical response for duplicate requests without re-executing business logic.</p>
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
        <strong>Elasticsearch Index Design</strong>
        <div class="code-box">
// Index: paytm_transactions
// 24 shards, 1 replica, partitioned by month
{
  "mappings": {
    "properties": {
      "transaction_id":  { "type": "keyword" },
      "user_id":         { "type": "keyword" },
      "amount_paise":    { "type": "long" },
      "merchant_name":   { "type": "text", "analyzer": "standard" },
      "description":     { "type": "text", "analyzer": "standard" },
      "payment_type":    { "type": "keyword" },
      "status":          { "type": "keyword" },
      "created_at":      { "type": "date" },
      "upi_vpa":         { "type": "keyword" }
    }
  },
  "settings": {
    "number_of_shards": 24,
    "index.routing.allocation.require.data": "hot",
    "index.lifecycle.name": "transactions_ilm"
  }
}
        </div>
      </div>
      <div>
        <strong>Common Query Patterns</strong>
        <div class="code-box">
// Search transactions by merchant name (autocomplete)
GET /paytm_transactions/_search
{
  "query": {
    "bool": {
      "must": [
        { "term": { "user_id": "usr_123" }},
        { "match": { "merchant_name": "swiggy" }}
      ],
      "filter": [
        { "range": { "created_at": { "gte": "now-30d" }}}
      ]
    }
  },
  "sort": [{ "created_at": "desc" }],
  "size": 20
}
        </div>
        <strong>ILM (Index Lifecycle Management)</strong>
        <ul>
          <li>Hot tier: current month (NVMe SSD, fast indexing)</li>
          <li>Warm tier: 1-6 months (HDD, read-optimized)</li>
          <li>Cold tier: 6-24 months (compressed, frozen index)</li>
          <li>Delete: &gt;5 years (data exported to S3 first)</li>
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
        <strong>CDN-Served Assets</strong>
        <ul>
          <li>Merchant logo images (Cloudflare CDN, edge cached)</li>
          <li>Static web app bundles (JS, CSS, HTML) — long-term cache headers</li>
          <li>QR code images generated for merchants (S3 + CloudFront)</li>
          <li>Help &amp; onboarding content (PDFs, images)</li>
          <li>Transaction receipt PDFs (short-lived signed URLs from S3)</li>
        </ul>
        <strong>CloudFront Configuration</strong>
        <div class="code-box">
# Static assets (app bundles)
Cache-Control: public, max-age=31536000, immutable
# (use content-hash filenames for cache busting)

# Merchant logos
Cache-Control: public, max-age=86400
# Vary: Accept (WebP vs JPEG)

# Dynamic QR codes
Cache-Control: no-store  # unique per-transaction
        </div>
      </div>
      <div>
        <strong>What Is NOT CDN-Served</strong>
        <p>All API calls bypass CDN. Payment endpoints require dynamic processing and cannot be cached. Sensitive user data (transaction history, KYC documents) served only over authenticated API — never via CDN.</p>
        <strong>KYC Document Storage</strong>
        <p>Aadhaar/PAN scan images stored in S3 with server-side encryption (SSE-KMS). Access via short-lived pre-signed URLs (15-minute TTL). Never stored in application DB. Separate S3 bucket with strict bucket policy — no public access, VPC-only access via gateway endpoint.</p>
        <strong>Cache Invalidation</strong>
        <p>Merchant logo update triggers CloudFront invalidation API call. For batch updates (e.g., 10,000 merchants), use S3 key versioning and update references rather than sending bulk invalidations.</p>
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
        <strong>Authentication &amp; Authorization</strong>
        <ul>
          <li>Phone OTP for registration, login (Twilio / internal SMS gateway)</li>
          <li>JWT (RS256) with 15-min access token + 30-day refresh token</li>
          <li>mPIN (4-6 digit, PBKDF2 hashed) for payment authorization</li>
          <li>Biometric (device-level Face ID/fingerprint) via FIDO2 WebAuthn</li>
          <li>Device binding — new device requires full OTP + re-auth</li>
        </ul>
        <strong>Encryption</strong>
        <div class="code-box">
In transit:  TLS 1.3 (min), mTLS between microservices
At rest:     AES-256-GCM for sensitive fields
             AWS KMS for key management (auto-rotate 90d)
Card data:   PCI-DSS tokenization — never store raw PANs
             Card vault service (Stripe/Braintree vault)
UPI PIN:     Transmitted encrypted (NPCI mandated E2E)
             HSM (Hardware Security Module) for PIN operations
        </div>
      </div>
      <div>
        <strong>Rate Limiting (Kong Gateway)</strong>
        <div class="code-box">
POST /wallet/pay:     10/min/user,  1000/min/IP
POST /wallet/topup:   5/min/user
POST /kyc/initiate:   3/day/user
GET  /balance:        60/min/user
OTP endpoints:        3/15min/phone (prevent OTP bombing)
        </div>
        <strong>Regulatory Compliance</strong>
        <ul>
          <li>RBI PPI guidelines: KYC tiers, transaction limits</li>
          <li>PCI-DSS Level 1 for card data handling</li>
          <li>IT Act 2000 &amp; DPDP Act 2023 for data privacy</li>
          <li>CERT-In incident reporting within 6 hours</li>
          <li>Immutable audit log (Cassandra + WORM S3) for 7 years</li>
          <li>VAPT (Vulnerability Assessment) quarterly by external firm</li>
        </ul>
        <div class="warn-box">
          <strong>SSRF Prevention:</strong> Webhook URLs from merchants must be validated against an allowlist. All outbound HTTP from internal services goes through a forward proxy with egress filtering.
        </div>
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
        <strong>Horizontal Scaling</strong>
        <p>All microservices are stateless and horizontally scaled via Kubernetes HPA. Pod autoscaling triggers at 60% CPU or 70% memory. During Diwali sale or cricket IPL (peak events), pre-scale to 3× baseline capacity 2h in advance based on expected traffic pattern.</p>
        <strong>Database Sharding</strong>
        <div class="code-box">
// Transaction table: range + hash sharding
Shard key: user_id % 64
Shard 0:   user_id % 64 == 0  → Aurora cluster 1
Shard 1-15: user_id % 64 in (1..15) → Aurora cluster 1
Shard 16-31: → Aurora cluster 2
Shard 32-47: → Aurora cluster 3
Shard 48-63: → Aurora cluster 4

// Wallet table: consistent hashing
// ShardManager service routes based on shard map
// Shard map cached in Redis, updated on resharding
        </div>
      </div>
      <div>
        <strong>Read Scaling</strong>
        <ul>
          <li>Aurora read replicas (2 per cluster) for transaction history reads</li>
          <li>Redis cluster absorbs 95% of balance reads</li>
          <li>Elasticsearch for transaction search (off-loads Aurora)</li>
          <li>CQRS: separate read model (Elasticsearch) from write model (Aurora)</li>
        </ul>
        <strong>Async Offloading</strong>
        <div class="code-box">
Synchronous (on critical path):
  - Balance check
  - Fraud rule engine
  - DB transaction commit
  - Cache update

Asynchronous (via Kafka, off critical path):
  - Push notifications
  - SMS delivery
  - Analytics event logging
  - Elasticsearch index update
  - Settlement queue population
  - Audit log write to S3
        </div>
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
// Resilience4j circuit breaker config
// (Payment Service → UPI NPCI call)
{
  "slidingWindowSize": 20,
  "failureRateThreshold": 50,   // open at 50% failure
  "waitDurationInOpenState": "10s",
  "permittedCallsInHalfOpen": 3,
  "slowCallDurationThreshold": "3s",
  "slowCallRateThreshold": 80
}
// When OPEN: return cached status or "PENDING"
// UPI calls timeout at 30s per NPCI SLA
        </div>
        <strong>Retry Strategy</strong>
        <div class="code-box">
// Exponential backoff with jitter
attempt 1: immediate
attempt 2: 100ms + jitter(50ms)
attempt 3: 200ms + jitter(100ms)
attempt 4: 400ms + jitter(200ms)
// After 4 attempts: fail fast, return error to client
// Retries ONLY on idempotent operations
// Never retry payment debit without idempotency key
        </div>
      </div>
      <div>
        <strong>Bulkhead Pattern</strong>
        <p>Separate thread pools for different payment types: UPI pool (100 threads), Wallet pool (200 threads), Card top-up pool (50 threads). A surge in UPI failures doesn't exhaust wallet payment threads. Connection pool isolation per downstream service.</p>
        <strong>Timeout Hierarchy</strong>
        <div class="code-box">
Client → API Gateway:       30s
API Gateway → Service:       5s
Service → Redis:             100ms
Service → Aurora:            2s
Service → NPCI UPI:         30s (mandated)
Service → Fraud ML:         200ms (soft), 500ms (hard)
Service → Kafka publish:    500ms
        </div>
        <strong>Chaos Engineering</strong>
        <p>Weekly chaos experiments via AWS Fault Injection Simulator: kill random pods, inject 500ms latency on Aurora, simulate Redis node failure. Each experiment validates circuit breakers and graceful degradation. Results reviewed in weekly SRE meeting.</p>
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
        <strong>The Three Pillars</strong>
        <p><strong>Metrics (Prometheus + Grafana):</strong></p>
        <div class="code-box">
Key business metrics:
  paytm_txn_success_rate          (target: &gt;99.9%)
  paytm_txn_latency_p99_seconds   (target: &lt;2s)
  paytm_txn_per_second            (alert: &gt;5000 TPS)
  paytm_wallet_topup_amount_total (revenue tracking)
  paytm_fraud_block_rate          (alert if &gt;5% — possible model drift)

Infrastructure metrics:
  kafka_consumer_lag_per_group
  redis_cache_hit_ratio           (alert if &lt;90%)
  aurora_replication_lag_seconds  (alert if &gt;1s)
  jvm_gc_pause_seconds_p99
        </div>
        <p><strong>Distributed Tracing (Jaeger / AWS X-Ray):</strong><br/>
        Every request gets a trace_id propagated via HTTP header (X-B3-TraceId). P99 traces stored for 7 days. Slow trace analysis identifies bottlenecks. Sampled at 1% for normal traffic, 100% for errors.</p>
      </div>
      <div>
        <strong>Logging (ELK Stack)</strong>
        <div class="code-box">
// Structured JSON logging — mandatory fields:
{
  "timestamp": "2024-07-04T08:30:45.123Z",
  "level": "INFO",
  "service": "wallet-service",
  "trace_id": "abc123",
  "user_id": "usr_83hd92",        // hashed in non-prod
  "transaction_id": "TXN_abc",
  "event": "PAYMENT_COMMITTED",
  "duration_ms": 187,
  "amount_paise": 50000
}
// PII masking: user_id hashed, phone/email masked
// Log retention: 90d hot (Elasticsearch), 1yr cold (S3)
        </div>
        <strong>Alerting &amp; SLOs</strong>
        <div class="pattern-table">
          <div class="pt-header"><span>SLI</span><span>SLO Target</span><span>Alert Threshold</span></div>
          <div class="pt-row"><span class="pt-name">Payment success rate</span><span>99.95%</span><span>&lt;99.9%</span></div>
          <div class="pt-row"><span class="pt-name">P99 latency</span><span>&lt;2s</span><span>&gt;3s</span></div>
          <div class="pt-row"><span class="pt-name">Availability</span><span>99.99%</span><span>&lt;99.95%</span></div>
          <div class="pt-row"><span class="pt-name">Kafka consumer lag</span><span>&lt;10k msgs</span><span>&gt;50k msgs</span></div>
        </div>
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
        <strong>Multi-AZ on AWS ap-south-1 (Mumbai)</strong>
        <div class="code-box">
Region: ap-south-1 (Mumbai) — primary
Region: ap-southeast-1 (Singapore) — DR standby

AZ-a: EKS nodes, Aurora primary, Redis primary
AZ-b: EKS nodes, Aurora replica, Redis replica
AZ-c: EKS nodes, Aurora replica, Redis replica

Aurora Global Database:
  Primary cluster: ap-south-1 (writes)
  Secondary cluster: ap-southeast-1 (reads + DR)
  RPO: &lt;1s, RTO: &lt;30s with Fast Switchover
        </div>
        <strong>Kubernetes Deployment</strong>
        <div class="code-box">
Wallet Service:        3 replicas (min) / 30 (max)
Payment Service:       3 / 30 replicas
Fraud Service:         5 / 20 replicas (SLA critical)
Notification Service:  2 / 10 replicas
UPI Service:           3 / 15 replicas

Pod Anti-Affinity: spread across AZs
PodDisruptionBudget: minAvailable=2 for critical services
Resource limits: 2 CPU / 4 GB RAM per pod (typical)
        </div>
      </div>
      <div>
        <strong>Deployment Strategies</strong>
        <p><strong>Blue-Green for DB schema changes:</strong> New schema deployed to green environment, traffic switched atomically. Old blue retained for 24h rollback window.</p>
        <p><strong>Canary for service deployments:</strong> 1% → 5% → 25% → 100% traffic over 2h. Automatic rollback if error rate or P99 latency degrades by &gt;10% relative.</p>
        <div class="code-box">
// Argo Rollouts canary spec
spec:
  strategy:
    canary:
      steps:
      - setWeight: 1
      - pause: {duration: 15m}
      - setWeight: 5
      - pause: {duration: 15m}
      - setWeight: 25
      - pause: {duration: 30m}
      - setWeight: 100
      analysis:
        metrics:
        - name: error-rate
          threshold: 0.01
        - name: p99-latency
          threshold: 2000ms
        </div>
        <strong>Feature Flags</strong>
        <p>LaunchDarkly for runtime feature toggles. New payment features (e.g., credit line) rolled out per user_id bucket. Allows instant kill-switch without redeployment.</p>
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
        <strong>Database Optimisations</strong>
        <ul>
          <li>Connection pooling via PgBouncer (transaction mode) — 200 connections per service pod, pool of 20 actual DB connections. Avoids Aurora connection exhaustion.</li>
          <li>Write batching for ledger entries: buffer 10ms, write in batch — reduces IOPS by 5×</li>
          <li>Partition pruning: transactions table partitioned by month, queries filtered by date auto-prune irrelevant partitions</li>
          <li>Covering indexes: <code>(wallet_id, created_at, amount, status)</code> — avoids table heap fetch for statement queries</li>
          <li>Read replicas for all SELECT queries (history, search) — write primary only receives INSERTs/UPDATEs</li>
        </ul>
      </div>
      <div>
        <strong>Application-Level Optimisations</strong>
        <ul>
          <li>gRPC instead of REST for inter-service calls: Protocol Buffers reduce payload 60%, HTTP/2 multiplexing reduces connections</li>
          <li>Async notification fan-out: payment commit returns immediately, notification sent via Kafka consumer asynchronously — saves 200ms on critical path</li>
          <li>Pre-computed wallet balance in Redis: avoids SUM(ledger_entries) query on every balance check</li>
          <li>Hot merchant cache: top 10,000 merchants (90% of transaction volume) pre-cached in Redis — near-zero DB reads for merchant resolution</li>
          <li>Fraud feature computation: user behavior features pre-computed hourly in batch and cached — real-time computation only for delta features</li>
        </ul>
        <div class="tip-box">
          <strong>Critical Path:</strong> Wallet pay P99 2s budget breakdown: Network 50ms + Gateway 20ms + Fraud Rule 10ms + Fraud ML 150ms + Redis lock 10ms + Aurora txn 50ms + Response 10ms = ~300ms. 1.7s margin for degraded scenarios.
        </div>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 22: Cost Optimisation -->
<div class="ref-section">
  <div class="ref-title">22. Cost Optimisation</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-header"><span>Strategy</span><span>Applied To</span><span>Estimated Saving</span></div>
      <div class="pt-row"><span class="pt-name">Spot Instances</span><span>Analytics &amp; ML training workloads (Kafka consumers, Spark jobs)</span><span>60-70% vs on-demand</span></div>
      <div class="pt-row"><span class="pt-name">Reserved Instances (3yr)</span><span>Core Aurora, Redis, EKS baseline nodes</span><span>40% vs on-demand</span></div>
      <div class="pt-row"><span class="pt-name">S3 Intelligent Tiering</span><span>Audit logs, KYC documents &gt;30 days old</span><span>40-68% storage cost</span></div>
      <div class="pt-row"><span class="pt-name">Kafka message compression</span><span>All Kafka topics (LZ4)</span><span>~65% bandwidth reduction</span></div>
      <div class="pt-row"><span class="pt-name">Aurora Serverless v2</span><span>Dev/staging environments (0.5-8 ACUs)</span><span>~80% for non-prod</span></div>
      <div class="pt-row"><span class="pt-name">ElasticSearch ILM</span><span>Move indices &gt;30d to warm, &gt;180d to cold</span><span>~70% Elasticsearch cost</span></div>
      <div class="pt-row"><span class="pt-name">VPC Endpoints</span><span>S3, DynamoDB, SQS — avoid NAT Gateway charges</span><span>\$5K+/month NAT savings</span></div>
      <div class="pt-row"><span class="pt-name">Notification batching</span><span>Batch SMS notifications (promotions) vs instant payment alerts</span><span>~30% SMS cost</span></div>
    </div>
    <div class="tip-box">
      <strong>FinOps Practice:</strong> Cost allocated per service team via AWS Cost Allocation Tags. Monthly cost review with service owners. Unused resources (idle pods, orphaned EBS volumes) identified weekly via AWS Compute Optimizer.
    </div>
  </div>
</div>

<!-- SECTION 23: Disaster Recovery -->
<div class="ref-section">
  <div class="ref-title">23. Disaster Recovery</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>RTO/RPO Targets</strong>
        <div class="pattern-table">
          <div class="pt-header"><span>Tier</span><span>Service</span><span>RTO</span><span>RPO</span></div>
          <div class="pt-row"><span class="pt-name">Tier 0</span><span>Wallet ledger, Payment</span><span>30s</span><span>0 (synchronous replication)</span></div>
          <div class="pt-row"><span class="pt-name">Tier 1</span><span>UPI, Fraud, KYC</span><span>2 min</span><span>&lt;1s (async replication)</span></div>
          <div class="pt-row"><span class="pt-name">Tier 2</span><span>Search, Analytics</span><span>15 min</span><span>&lt;60s (Kafka replay)</span></div>
          <div class="pt-row"><span class="pt-name">Tier 3</span><span>Reporting, Settlement</span><span>1 hour</span><span>5 min</span></div>
        </div>
        <strong>Backup Strategy</strong>
        <ul>
          <li>Aurora: continuous backup to S3 (point-in-time recovery up to 35 days), daily snapshot to S3 cross-region</li>
          <li>Redis: RDB snapshot every 15 min + AOF for durability. Backup to S3 every hour.</li>
          <li>Kafka: 7-day log retention enables replay-based recovery</li>
          <li>Cassandra: daily snapshot to S3, cross-region replication (RF=3 across 2 regions)</li>
        </ul>
      </div>
      <div>
        <strong>Failover Runbook (AZ Failure)</strong>
        <div class="code-box">
T+0s:  CloudWatch alarm triggers (5xx spike)
T+30s: Aurora promotes read replica in healthy AZ
       (Aurora Global DB Fast Switchover: &lt;30s)
T+60s: EKS scheduler reschedules pods in healthy AZs
T+90s: Redis Sentinel promotes replica to primary
T+2m:  Health checks pass, traffic restored to healthy AZs
T+5m:  PagerDuty alert acknowledged by on-call SRE
T+15m: Post-incident Slack channel opened, timeline tracked
        </div>
        <strong>Regional Failover (ap-south-1 down)</strong>
        <div class="code-box">
1. Manual decision by on-call lead (&gt;5 min outage)
2. Aurora Global DB promote Singapore secondary to primary
   (RPO: &lt;1s, promoted in &lt;1 minute)
3. Update Route53 DNS records (TTL 30s)
4. EKS Singapore cluster scaled up (pre-warmed 20%)
5. Kafka MirrorMaker2 replication promotes Singapore cluster
6. Full traffic in Singapore: ETA ~10 minutes
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
        <strong>Phase 1: Strangler Fig (Months 1-3)</strong>
        <p>Identify bounded contexts in monolith: Wallet, Payment, Notification, KYC. Create new microservices that implement the same interfaces. Route 1% of traffic to new services while monolith handles 99%. Monitor error rates and latency.</p>
        <strong>Phase 2: Extract Write Path (Months 4-6)</strong>
        <p>Migrate write operations (debit/credit) to Wallet microservice backed by new Aurora cluster. Monolith DB becomes read-only for wallet ops. Dual-write phase: write to both monolith DB and new service with comparison checks.</p>
        <div class="code-box">
// Dual-write with shadow mode
async function pay(req) {
  // Primary write to monolith (source of truth)
  const result = await monolithPay(req);
  // Shadow write to new wallet service (compare)
  const shadow = await walletSvc.pay(req).catch(() =&gt; null);
  if (shadow &amp;&amp; shadow.balance !== result.balance) {
    metrics.increment('wallet.dual_write.mismatch');
  }
  return result; // always return monolith result in shadow phase
}
        </div>
      </div>
      <div>
        <strong>Phase 3: Cut Over (Months 7-9)</strong>
        <p>Gradually shift traffic: 10% → 50% → 90% → 100% to new wallet service using feature flags. Monolith becomes consumer of new service. Run both in parallel for 2 weeks to catch edge cases. Keep monolith DB as read-only fallback.</p>
        <strong>Phase 4: Database Migration (Months 10-12)</strong>
        <ul>
          <li>Backfill historical transactions to new sharded schema using batch Kafka events</li>
          <li>Online schema migration using pt-online-schema-change (no table locks)</li>
          <li>Validate data integrity with row counts and checksum comparison</li>
          <li>Decommission monolith DB tables (archive to S3 first)</li>
        </ul>
        <strong>Zero-Downtime DB Schema Changes</strong>
        <div class="code-box">
Rule: Always backward compatible changes first
1. Add nullable column (old code ignores it) ✓
2. Deploy new code that writes to new column ✓
3. Backfill old rows in background ✓
4. Make column NOT NULL (after all rows filled) ✓
5. Remove old column in separate deployment ✓
        </div>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 25: Interview Questions & Answers -->
<div class="ref-section">
  <div class="ref-title">25. Interview Questions &amp; Answers</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-header"><span>Question</span><span>Answer</span><span>Key Insight</span></div>
      <div class="pt-row">
        <span class="pt-name">How do you prevent double-charging on payment retry?</span>
        <span>Client generates UUID idempotency_key. Server stores key → response in Redis (24h) and MySQL (permanent). On duplicate request, return cached response without re-executing. Lock held during processing to prevent concurrent duplicates.</span>
        <span>Idempotency is not optional in payments — every retry scenario (network timeout, app crash) must be safe to replay.</span>
      </div>
      <div class="pt-row">
        <span class="pt-name">How do you handle a payment that times out mid-transaction?</span>
        <span>Payment state machine persists PROCESSING state before external call. A reconciliation job runs every 60s, finds PROCESSING txns older than 30s, queries NPCI/bank for actual status, and either commits SUCCESS or triggers REVERSAL. This is the "check and complete" or "check and rollback" pattern.</span>
        <span>Never leave money in limbo — always have a compensating transaction path for every failure scenario.</span>
      </div>
      <div class="pt-row">
        <span class="pt-name">How do you scale to 5000 TPS during IPL / Diwali?</span>
        <span>Pre-scale based on predicted traffic (historical data + marketing calendar). HPA scales pods 30 min before event. Aurora read replicas auto-scaled. Redis cluster adds shards. Kafka partitions pre-provisioned at 2× normal. Load test at 150% expected peak 1 week before.</span>
        <span>Reactive auto-scaling alone is too slow for sudden spikes. Predictive scaling + load testing is essential for financial systems.</span>
      </div>
      <div class="pt-row">
        <span class="pt-name">How do you ensure wallet balance is always correct?</span>
        <span>Aurora is source of truth (ACID). Redis cache is invalidated and rewritten on every balance change (write-through under distributed lock). Daily reconciliation job sums all ledger_entries and compares to wallet.balance. Mismatch triggers alert and manual audit.</span>
        <span>Multi-layer verification: distributed lock + ACID transaction + daily reconciliation. Trust but verify.</span>
      </div>
      <div class="pt-row">
        <span class="pt-name">Why use Cassandra for event log instead of MySQL?</span>
        <span>Event log is append-only, extremely high write throughput (5 events/txn × 5400 TPS = 27,000 writes/s), and queried by time range per user. Cassandra's LSM tree excels at sequential writes. MySQL would require sharding the event table too, but Cassandra's distributed architecture handles it natively.</span>
        <span>Choose data stores based on access patterns and write/read ratios, not familiarity.</span>
      </div>
      <div class="pt-row">
        <span class="pt-name">How do you handle a cross-shard transfer?</span>
        <span>Saga pattern with compensating transactions. WalletService orchestrates: (1) debit sender shard, (2) credit receiver shard. If step 2 fails after 3 retries, orchestrator publishes CREDIT_FAILED event, Shard A reverses the debit. User gets FAILED transaction with proper error message.</span>
        <span>No 2PC in microservices. Sagas trade atomicity for availability — acceptable for financial systems if compensation is correct.</span>
      </div>
      <div class="pt-row">
        <span class="pt-name">How does fraud detection work without blocking payments?</span>
        <span>Two-stage: synchronous rule engine (&lt;10ms, hard blocks) + synchronous ML model (&lt;150ms, score-based). Together they're on the critical path but well within budget. Async LSTM model (Kafka stream + Flink) does deeper analysis and can freeze accounts post-hoc without blocking the payment flow.</span>
        <span>Design fraud checks with latency SLAs, not just accuracy. A 2-second fraud check that catches 99.9% is worse than a 150ms check that catches 99.5%.</span>
      </div>
      <div class="pt-row">
        <span class="pt-name">How do you handle RBI's wallet balance limit?</span>
        <span>Enforce in the Wallet Service, not at API layer. Before any credit, check: (current_balance + amount) &lt;= kyc_tier_limit. These limits are configurable in a feature flag system, not hardcoded. Redis stores current balance, Aurora is source of truth for limit enforcement in the DB transaction.</span>
        <span>Regulatory limits should be enforced at the data layer (inside the DB transaction), not just at the application layer which can be bypassed.</span>
      </div>
      <div class="pt-row">
        <span class="pt-name">How do you design the settlement system?</span>
        <span>Settlement Service runs T+1 batch job at 01:00 IST. Reads all SUCCESS merchant transactions from previous day via Elasticsearch (avoids Aurora load). Groups by merchant, computes net amount (after MDR deduction). Generates NEFT batch file, submits to nodal bank. Marks transactions SETTLED and credits merchant bank account.</span>
        <span>Separate settlement from real-time payment — settlement is a batch process with different SLAs. Keep RBI's T+1 settlement requirement in mind for merchant satisfaction.</span>
      </div>
      <div class="pt-row">
        <span class="pt-name">How do you achieve 99.99% availability?</span>
        <span>Multi-AZ EKS with pod anti-affinity. Aurora Multi-AZ with &lt;30s failover. Redis Sentinel/Cluster for cache HA. Circuit breakers prevent cascade failures. Bulkheads isolate service pools. Chaos Engineering weekly to validate. 52 minutes/year downtime budget — 26 deployments of 2 min each max.</span>
        <span>Availability = MTBF / (MTBF + MTTR). Focus both on preventing failures (MTBF) and fast recovery (MTTR).</span>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 26: Trade-off Summary -->
<div class="ref-section">
  <div class="ref-title">26. Trade-off Summary</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Decision</div>
        <div class="dt-yes">Choice Made &amp; Why</div>
        <div class="dt-no">Alternative &amp; Why Not</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Ledger DB: MySQL Aurora</div>
        <div class="dt-yes">ACID transactions critical for financial correctness. Aurora Multi-Master gives HA with synchronous replication. Familiar SQL for complex ledger queries.</div>
        <div class="dt-no">DynamoDB: BASE consistency unacceptable for money. PostgreSQL: fine but Aurora has better managed HA. MongoDB: no multi-doc ACID in older versions.</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Event Log: Cassandra</div>
        <div class="dt-yes">Append-only log, 27k writes/s, time-range queries per user. Native time-series clustering key. Wide column model fits event payload.</div>
        <div class="dt-no">MySQL: would require aggressive sharding for this write rate. InfluxDB: metrics-focused, not general event log. MongoDB: acceptable but Cassandra has better write path for this pattern.</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Distributed Txn: Saga vs 2PC</div>
        <div class="dt-yes">Saga with compensating transactions. Avoids distributed locking, scales better, tolerates partial failures. Eventual consistency acceptable for cross-shard transfers (ms-scale, not user-visible).</div>
        <div class="dt-no">2PC: requires all participants to be available simultaneously. One slow/failed node blocks all transactions. Latency doubles. Not suitable for high-throughput payment systems.</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Message Broker: Kafka</div>
        <div class="dt-yes">High throughput, log retention for replay, multiple independent consumers, ordered delivery within partition, exactly-once semantics.</div>
        <div class="dt-no">SQS: no log replay, limited throughput, no ordered consumer groups. RabbitMQ: good for task queues but not for event streaming/replay use cases at this scale.</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Balance Cache: Redis write-through</div>
        <div class="dt-yes">Write-through keeps cache warm and consistent. Immediate reads after writes are fast. Eliminates SUM(ledger) aggregation query per balance read at scale.</div>
        <div class="dt-no">Cache-aside: risk of cache miss storm on cold start or eviction. Write-behind: risk of data loss if Redis fails before DB write. No cache: Aurora at 108k reads/s would need massive read replica fleet.</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Fraud: Inline ML vs Async</div>
        <div class="dt-yes">Inline ML (150ms) blocks fraud before money moves. Higher revenue protection. GBT model is fast enough to stay on critical path with low false-positive rate.</div>
        <div class="dt-no">Async-only fraud: money moves first, fraud detected after. Clawback difficult (user may have already spent). Real-time false positives managed via step-up auth rather than hard block.</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Push: FCM vs WebSocket</div>
        <div class="dt-yes">FCM/APNs: works when app is backgrounded, battery efficient, platform-optimized delivery, no persistent server connection required.</div>
        <div class="dt-no">WebSocket for notifications: requires app to be foreground, drains battery, requires server-side connection management at scale. Used only for UPI collect (needs bidirectional interaction).</div>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 27: Key Takeaways -->
<div class="ref-section">
  <div class="ref-title">27. Key Takeaways</div>
  <div class="ref-body">
    <div class="tip-box">
      <strong>1. Money Never Lies — ACID is Non-Negotiable for the Ledger</strong><br/>
      Every debit must have a corresponding credit. Use MySQL/PostgreSQL with row-level locking and synchronous replication. Reconcile daily. The cost of a strong consistency database is worth every penny for financial data.
    </div>
    <div class="tip-box">
      <strong>2. Idempotency is the Backbone of Reliable Payments</strong><br/>
      Every mutating API must accept an idempotency_key. Mobile networks drop connections. Users retry. Your system must return the same result for the same logical request, no matter how many times it's called.
    </div>
    <div class="tip-box">
      <strong>3. Design the Failure Path as Carefully as the Happy Path</strong><br/>
      What happens when NPCI times out at T+28 seconds? What happens when the DB commit succeeds but cache update fails? Every edge case in payments has a financial impact. Model your payment as a state machine with explicit compensation for every failure.
    </div>
    <div class="tip-box">
      <strong>4. Separate Fast Path from Slow Path</strong><br/>
      The payment commit is the fast path (&lt;300ms). Everything else — notifications, analytics, Elasticsearch indexing, settlement — is the slow path (async via Kafka). Never let a slow Kafka consumer or Elasticsearch lag block a payment from succeeding.
    </div>
    <div class="tip-box">
      <strong>5. Fraud Detection Has a Latency SLA</strong><br/>
      A fraud model that takes 3 seconds is worse than a fast model that catches 95% of fraud. Design fraud checks with explicit latency budgets. Use rule engines for instant hard blocks, fast ML models for probabilistic scoring, and async deep learning for complex patterns that don't need real-time action.
    </div>
    <div class="tip-box">
      <strong>6. The Nodal Account Architecture is the Regulatory Foundation</strong><br/>
      RBI mandates that all wallet balances be backed by money in a designated nodal bank account. The wallet ledger is a virtual accounting layer on top of real money held in trust. Understand the regulatory constraints before designing — they shape the entire architecture.
    </div>
    <div class="tip-box">
      <strong>7. Observability is a First-Class Citizen in Fintech</strong><br/>
      You need to answer "exactly how much money moved at 3:47 AM on July 4th" with certainty. Immutable audit logs, structured logging with trace IDs, real-time reconciliation dashboards, and anomaly detection are not optional extras — they are the operating requirements of a regulated financial system.
    </div>
  </div>
</div>
`;
