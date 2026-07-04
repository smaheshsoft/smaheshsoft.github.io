window.Pages['sd-upi'] = `
<div class="page-header">
  <div class="breadcrumb">System Design › <span>UPI Payment System</span></div>
  <h1>💳 UPI Payment System — Design</h1>
  <p>Real-time interbank fund transfer, VPA resolution, fraud detection, and settlement at national scale via NPCI UPI rails</p>
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
      <rect x="50" y="32" width="110" height="46" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="105" y="52" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📱 GPay</text>
      <text x="105" y="68" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">PSP App</text>

      <rect x="200" y="32" width="110" height="46" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="255" y="52" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📱 PhonePe</text>
      <text x="255" y="68" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">PSP App</text>

      <rect x="350" y="32" width="110" height="46" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="405" y="52" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📱 BHIM</text>
      <text x="405" y="68" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">PSP App</text>

      <rect x="640" y="32" width="120" height="46" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="700" y="52" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🏦 Payer Bank</text>
      <text x="700" y="68" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">CBS / Issuer</text>

      <rect x="780" y="32" width="100" height="46" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="830" y="52" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🏦 Bene</text>
      <text x="830" y="68" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Beneficiary Bank</text>

      <!-- GATEWAY LAYER -->
      <rect x="180" y="112" width="150" height="36" rx="8" fill="#1a2d20" stroke="#4ade80" stroke-width="1.5"/>
      <text x="255" y="127" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🌐 PSP Server</text>
      <text x="255" y="141" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Auth · VPA · Route</text>

      <rect x="370" y="112" width="160" height="36" rx="8" fill="#1a2d20" stroke="#4ade80" stroke-width="1.5"/>
      <text x="450" y="127" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🔀 NPCI UPI Switch</text>
      <text x="450" y="141" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Core Switching Engine</text>

      <!-- SERVICES LAYER -->
      <rect x="40" y="182" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="95" y="200" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🆔 VPA</text>
      <text x="95" y="216" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Registry Svc</text>

      <rect x="165" y="182" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="220" y="200" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🔐 Auth</text>
      <text x="220" y="216" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">UPI PIN / TOTP</text>

      <rect x="290" y="182" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="345" y="200" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🛡️ Fraud</text>
      <text x="345" y="216" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Detection Engine</text>

      <rect x="415" y="182" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="470" y="200" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📋 Mandate</text>
      <text x="470" y="216" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Recurring Payments</text>

      <rect x="540" y="182" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="595" y="200" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🧾 Settlement</text>
      <text x="595" y="216" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Multilateral Net</text>

      <rect x="665" y="182" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="720" y="200" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📨 Dispute</text>
      <text x="720" y="216" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Mgmt / NACH</text>

      <rect x="790" y="182" width="90" height="46" rx="8" fill="#2d2a1a" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="835" y="200" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📨 Kafka</text>
      <text x="835" y="216" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Event Stream</text>

      <!-- DATA LAYER -->
      <rect x="40" y="322" width="110" height="46" rx="8" fill="#1a2040" stroke="#60a5fa" stroke-width="1.5"/>
      <text x="95" y="342" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🗄️ Oracle</text>
      <text x="95" y="358" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">NPCI Core DB</text>

      <rect x="170" y="322" width="100" height="46" rx="8" fill="#2d1a1a" stroke="#f87171" stroke-width="1.5"/>
      <text x="220" y="342" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">⚡ Redis</text>
      <text x="220" y="358" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">VPA Cache / RL</text>

      <rect x="290" y="322" width="115" height="46" rx="8" fill="#1a2040" stroke="#34d399" stroke-width="1.5"/>
      <text x="348" y="342" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🗂️ Cassandra</text>
      <text x="348" y="358" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Txn Log</text>

      <rect x="425" y="322" width="130" height="46" rx="8" fill="#1a2040" stroke="#34d399" stroke-width="1.5"/>
      <text x="490" y="342" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🔍 Elasticsearch</text>
      <text x="490" y="358" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Analytics / Search</text>

      <rect x="575" y="322" width="110" height="46" rx="8" fill="#1a2040" stroke="#60a5fa" stroke-width="1.5"/>
      <text x="630" y="342" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🏦 Bank CBS</text>
      <text x="630" y="358" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Core Banking</text>

      <rect x="705" y="322" width="110" height="46" rx="8" fill="#2d1f1a" stroke="#fb923c" stroke-width="1.5"/>
      <text x="760" y="342" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📊 Grafana</text>
      <text x="760" y="358" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Monitoring</text>

      <!-- Arrows: Client → PSP Server -->
      <line x1="105" y1="78" x2="220" y2="112" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="255" y1="78" x2="255" y2="112" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="405" y1="78" x2="310" y2="112" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- PSP Server → NPCI Switch -->
      <line x1="330" y1="130" x2="370" y2="130" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- NPCI Switch → Payer / Bene Bank -->
      <line x1="530" y1="120" x2="660" y2="55" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="530" y1="125" x2="782" y2="55" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- NPCI → Services -->
      <line x1="420" y1="148" x2="345" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="440" y1="148" x2="220" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="450" y1="148" x2="470" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="470" y1="148" x2="595" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="490" y1="148" x2="720" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- PSP → VPA Registry -->
      <line x1="220" y1="148" x2="95" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Services → Kafka -->
      <line x1="595" y1="228" x2="800" y2="228" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Services → Data -->
      <line x1="95" y1="228" x2="95" y2="322" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="220" y1="228" x2="220" y2="322" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="345" y1="228" x2="348" y2="322" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="470" y1="228" x2="490" y2="322" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="835" y1="228" x2="760" y2="322" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
    </svg>
  </div>
</div>

<!-- Section 1: Executive Summary -->
<div class="ref-section">
  <div class="ref-title">1. Executive Summary</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>Problem Statement</b>
        <p>Design a real-time interbank payment system that allows any Indian bank account holder to send/receive money instantly using a Virtual Payment Address (VPA), mobile number, or QR code — 24×7×365, with sub-second response times and zero fund loss.</p>
        <b>Scale Numbers (2024)</b>
        <ul>
          <li>~14 billion UPI transactions/month (Dec 2024)</li>
          <li>Peak: ~8,000 TPS during festival sales (Diwali / IPL)</li>
          <li>300+ banks on UPI rails</li>
          <li>500+ million registered VPAs</li>
          <li>Rs 20 lakh crore (~\$240 billion) monthly value</li>
          <li>99.9% uptime SLA mandated by RBI</li>
          <li>Average transaction latency &lt; 1.5 seconds end-to-end</li>
        </ul>
      </div>
      <div>
        <b>Core Challenges</b>
        <ul>
          <li>Two-phase debit+credit across two independent banks in &lt; 30 seconds (RBI mandate)</li>
          <li>Idempotency — network retries must not double-debit</li>
          <li>VPA resolution latency: map alias → IFSC + account in &lt; 200 ms</li>
          <li>Fraud detection inline without adding perceptible latency</li>
          <li>Multilateral netting and settlement once every hour</li>
          <li>Comply with PCI-DSS, RBI guidelines, and data residency laws</li>
        </ul>
        <b>Functional Requirements</b>
        <ul>
          <li>P2P, P2M, collect requests, QR scan &amp; pay</li>
          <li>UPI AutoPay (mandates) for recurring payments</li>
          <li>Dispute management and refunds</li>
          <li>Balance enquiry via linked bank account</li>
          <li>Transaction history and statements</li>
        </ul>
      </div>
    </div>
    <br/>
    <table class="pattern-table" style="width:100%">
      <tr class="pt-header"><td>Requirement</td><td>Target</td><td>Notes</td></tr>
      <tr class="pt-row"><td class="pt-name">Transaction Latency (P99)</td><td>&lt; 2 s end-to-end</td><td>Includes PSP + NPCI + both CBS round trips</td></tr>
      <tr class="pt-row"><td class="pt-name">Availability</td><td>99.99%</td><td>~52 min downtime/year; RBI mandated 99.9%</td></tr>
      <tr class="pt-row"><td class="pt-name">Throughput</td><td>10,000 TPS peak</td><td>Designed for 2× current peak</td></tr>
      <tr class="pt-row"><td class="pt-name">Durability</td><td>Zero fund loss</td><td>2-phase commit / saga with compensating txns</td></tr>
      <tr class="pt-row"><td class="pt-name">Idempotency</td><td>Exactly-once debit</td><td>Global Txn ID dedup in Redis + DB</td></tr>
      <tr class="pt-row"><td class="pt-name">Security</td><td>PCI-DSS Level 1</td><td>E2E encryption, HSM-backed PIN, device binding</td></tr>
    </table>
  </div>
</div>

<!-- Section 2: Capacity Estimation -->
<div class="ref-section">
  <div class="ref-title">2. Capacity Estimation</div>
  <div class="ref-body">
    <table class="pattern-table" style="width:100%">
      <tr class="pt-header"><td>Metric</td><td>Assumption</td><td>Calculation</td><td>Result</td></tr>
      <tr class="pt-row"><td class="pt-name">Avg daily transactions</td><td>14B/month</td><td>14B ÷ 30</td><td>~467M / day</td></tr>
      <tr class="pt-row"><td class="pt-name">Avg TPS (daytime)</td><td>467M / 12 active hrs</td><td>467M ÷ 43,200</td><td>~10,800 TPS</td></tr>
      <tr class="pt-row"><td class="pt-name">Peak TPS (festival)</td><td>3× average</td><td>10,800 × 3</td><td>~32,400 TPS (design for 50K)</td></tr>
      <tr class="pt-row"><td class="pt-name">Txn record size</td><td>~2 KB per txn</td><td>—</td><td>2 KB</td></tr>
      <tr class="pt-row"><td class="pt-name">Daily write volume</td><td>467M txns × 2 KB</td><td>934 GB raw</td><td>~1 TB/day with indexes</td></tr>
      <tr class="pt-row"><td class="pt-name">VPA records</td><td>500M VPAs</td><td>~256 bytes each</td><td>~128 GB in Redis (compressed)</td></tr>
      <tr class="pt-row"><td class="pt-name">Cassandra nodes needed</td><td>1 TB/day, 90-day retention</td><td>90 TB ÷ 8 TB/node × 3 replicas</td><td>~34 nodes</td></tr>
      <tr class="pt-row"><td class="pt-name">Kafka throughput</td><td>50K events/sec × 2 KB</td><td>100 MB/s ingest</td><td>12 brokers (8-core, 10 Gbps)</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis cluster size</td><td>128 GB VPA + 32 GB rate-limit</td><td>160 GB working set</td><td>6 nodes × 32 GB (3 master, 3 replica)</td></tr>
      <tr class="pt-row"><td class="pt-name">NPCI Switch pods</td><td>50K TPS, 400 req/pod/sec</td><td>50K ÷ 400</td><td>125 pods; deploy 200 with HPA</td></tr>
    </table>
  </div>
</div>

<!-- Section 3: APIs -->
<div class="ref-section">
  <div class="ref-title">3. API Design</div>
  <div class="ref-body">
    <table class="pattern-table" style="width:100%">
      <tr class="pt-header"><td>Endpoint</td><td>Method</td><td>Description</td></tr>
      <tr class="pt-row"><td class="pt-name">POST /upi/v2/pay</td><td>POST</td><td>Initiate P2P or P2M payment</td></tr>
      <tr class="pt-row"><td class="pt-name">POST /upi/v2/collect</td><td>POST</td><td>Send collect/pull request to payer</td></tr>
      <tr class="pt-row"><td class="pt-name">GET /upi/v2/vpa/resolve</td><td>GET</td><td>Resolve VPA to account details</td></tr>
      <tr class="pt-row"><td class="pt-name">POST /upi/v2/mandate/create</td><td>POST</td><td>Create UPI AutoPay mandate</td></tr>
      <tr class="pt-row"><td class="pt-name">GET /upi/v2/txn/{txnId}/status</td><td>GET</td><td>Poll transaction status</td></tr>
      <tr class="pt-row"><td class="pt-name">POST /upi/v2/dispute/raise</td><td>POST</td><td>Raise chargeback / dispute</td></tr>
      <tr class="pt-row"><td class="pt-name">GET /upi/v2/balance</td><td>GET</td><td>Fetch bank account balance</td></tr>
      <tr class="pt-row"><td class="pt-name">GET /upi/v2/history</td><td>GET</td><td>Paginated transaction history</td></tr>
    </table>
    <br/>
    <b>Pay Request / Response Example</b>
    <div class="code-box">
// POST /upi/v2/pay
{
  "payerVpa": "mahesh@okicici",
  "payeeVpa": "merchant@ybl",
  "amount": 1500.00,
  "currency": "INR",
  "remarks": "Order #ORD-98765",
  "deviceFingerprint": "enc_df_abc123",
  "clientTxnId": "PSP-20240101-XYZ789",   // idempotency key
  "upiPin": "enc_pin_hsm_token"
}

// 200 OK
{
  "npciTxnId": "NPC2024010112345678",
  "clientTxnId": "PSP-20240101-XYZ789",
  "status": "SUCCESS",
  "payerBank": "ICICI",
  "payeeBank": "YES",
  "rrn": "401912345678",                   // bank reference number
  "timestamp": "2024-01-01T10:00:01.432Z",
  "bankTxnId": "ICICI20240101987654"
}

// Design Standards
// - All amounts in lowest denomination (paise) internally
// - UPI PIN never stored — HSM tokenised, decrypted only at bank CBS
// - clientTxnId is idempotency key; same key returns same response (deduped 24h)
// - All APIs over mTLS; JWT-based PSP authentication
// - Rate limits: 20 TPS per VPA, 100K TPS per PSP
    </div>
  </div>
</div>

<!-- Section 4: High-Level Architecture -->
<div class="ref-section">
  <div class="ref-title">4. High-Level Architecture</div>
  <div class="ref-body">
    <div class="code-box">
┌────────────────────────────────────────────────────────────────────────┐
│  PSP Apps (GPay / PhonePe / BHIM / Paytm)                             │
│   ↓ HTTPS/mTLS                                                          │
├────────────────────────────────────────────────────────────────────────┤
│  PSP Backend Server   (per PSP — Google, PhonePe infra)                │
│   • Device binding validation                                           │
│   • UPI PIN encryption (HSM-backed)                                     │
│   • Client Txn ID dedup (Redis)                                         │
│   ↓ ISO 8583-over-HTTPS (UPI spec)                                      │
├────────────────────────────────────────────────────────────────────────┤
│  NPCI UPI Switch  (Active-Active, 3 DCs — Mumbai, Hyderabad, Chennai)  │
│   • VPA Registry Service → Redis cache                                  │
│   • Auth Service (TOTP + PIN verify → Payer CBS)                        │
│   • Fraud Detection Engine (ML, rule engine)                            │
│   • Mandate Service (recurring autopay)                                 │
│   • Settlement Engine (multilateral netting, RBI-RTGS)                 │
│   • Dispute Management                                                  │
│   ↓ CBS APIs (ISO 20022 / SFMS)                                         │
├─────────────────────────────┬──────────────────────────────────────────┤
│  Payer Bank CBS             │  Beneficiary Bank CBS                    │
│  (debit + PIN verify)       │  (credit + notify)                       │
└─────────────────────────────┴──────────────────────────────────────────┘
Data Layer:
  Oracle RAC       → NPCI master ledger, account mapping
  Cassandra        → immutable txn log (write-heavy, time-series)
  Redis Cluster    → VPA cache, rate limits, idempotency keys
  Elasticsearch    → analytics, merchant analytics, dispute search
  Kafka            → event streaming (fraud signals, settlement events)
    </div>
    <br/>
    <div class="two-col">
      <div>
        <b>PSP Layer</b><br/>Each PSP (Google, PhonePe) runs their own infrastructure. They integrate with NPCI via certified UPI SDK. PSP handles app UX, device fingerprinting, and pre-flight checks.
        <br/><br/>
        <b>NPCI UPI Switch</b><br/>The central clearing hub. Receives payment instructions from PSPs, performs VPA resolution, fraud checks, routes debit/credit to respective bank CBS systems, and returns final status.
        <br/><br/>
        <b>Bank CBS</b><br/>Core Banking System at each member bank. Handles actual ledger debit/credit. Exposes synchronous APIs to NPCI Switch with strict SLAs (600 ms for debit, 400 ms for credit).
      </div>
      <div>
        <b>VPA Registry</b><br/>Maintains VPA → (IFSC, account number) mapping. Heavily cached in Redis. Write path goes to Oracle. Replication lag &lt; 100 ms.
        <br/><br/>
        <b>Settlement Engine</b><br/>Runs multilateral netting every hour. Computes net positions per bank. Sends final net settlement file to RBI-RTGS. Banks settle in central bank money.
        <br/><br/>
        <b>Fraud Detection</b><br/>Real-time rule engine + ML model. Runs inline (&lt; 50 ms budget). Evaluates velocity, device risk, merchant risk score, graph anomalies. Can block, challenge, or allow.
      </div>
    </div>
  </div>
</div>

<!-- Section 5: Core Service: Transaction Processing (NPCI Switch) -->
<div class="ref-section">
  <div class="ref-title">5. Core Service: NPCI UPI Switch (Transaction Processing)</div>
  <div class="ref-body">
    <p>The UPI Switch is the heart of the system. It must process a payment in &lt; 30 seconds (RBI mandate) while guaranteeing exactly-once fund transfer across independent bank systems.</p>
    <div class="two-col">
      <div>
        <b>Receive Phase</b>
        <ol>
          <li>PSP sends SignedXML (ISO 8583 wrapped in HTTPS) with clientTxnId.</li>
          <li>Switch verifies PSP certificate (mTLS), extracts payload.</li>
          <li>Dedup check: query Redis with clientTxnId (TTL 24h). If found, return cached response — prevents double submission.</li>
          <li>Assign global NPCI txnId (snowflake-style, contains DC + timestamp).</li>
          <li>Write txn record to Cassandra in PENDING state (write concern: QUORUM).</li>
        </ol>
        <b>VPA Resolution</b>
        <ol>
          <li>Lookup payeeVpa in Redis L1 cache (TTL 5 min). Hit rate ~95%.</li>
          <li>Cache miss → query Oracle VPA Registry.</li>
          <li>Returns (IFSC code, masked account number, payee name).</li>
          <li>PSP app shows payee name for user confirmation.</li>
        </ol>
      </div>
      <div>
        <b>Debit Phase (Payer Bank)</b>
        <ol>
          <li>Switch sends DebitReq to Payer CBS (ISO 20022 pain.001 equivalent).</li>
          <li>CBS verifies UPI PIN (HSM decrypt), checks balance, places hold.</li>
          <li>CBS returns DebitAck with bank txnId (rrn) within 600 ms SLA.</li>
          <li>Switch updates Cassandra txn to DEBIT_SUCCESS.</li>
        </ol>
        <b>Credit Phase (Beneficiary Bank)</b>
        <ol>
          <li>Switch sends CreditReq to Bene CBS.</li>
          <li>CBS credits account, sends push notification, returns CreditAck.</li>
          <li>Switch updates Cassandra to CREDIT_SUCCESS = terminal SUCCESS.</li>
          <li>Response sent back to PSP with full txn details.</li>
        </ol>
        <b>Rollback / Reverse</b><br/>
        If credit fails after debit success → Switch auto-initiates Reversal within 5 min. If reversal also fails → dispute ticket raised automatically, RBI reconciliation T+1.
      </div>
    </div>
    <div class="code-box">
// Txn State Machine
PENDING → DEBIT_INITIATED → DEBIT_SUCCESS → CREDIT_INITIATED → SUCCESS
                           ↘ DEBIT_FAILED → FAILED
                                             ↘ CREDIT_FAILED → REVERSAL_INITIATED → REVERSED
                                                                                   ↘ REVERSAL_FAILED → DISPUTE
    </div>
  </div>
</div>

<!-- Section 6: Core Service: VPA Registry & Resolution -->
<div class="ref-section">
  <div class="ref-title">6. Core Service: VPA Registry &amp; Resolution</div>
  <div class="ref-body">
    <p>Virtual Payment Address (e.g., mahesh@okicici) is the human-readable alias for a bank account. The registry must resolve it in &lt; 200 ms with &gt; 99.99% availability.</p>
    <div class="two-col">
      <div>
        <b>Data Model</b>
        <div class="code-box">
VPA Record:
  vpa         VARCHAR(255) PK   -- mahesh@okicici
  ifsc        CHAR(11)          -- ICICI0001234
  accountNo   VARCHAR(20) ENC   -- encrypted at rest
  name        VARCHAR(100)      -- display name
  bankCode    CHAR(4)           -- ICIC
  handle      VARCHAR(50)       -- okicici (routing)
  status      ENUM(ACTIVE, SUSPENDED, CLOSED)
  createdAt   TIMESTAMP
  updatedAt   TIMESTAMP
        </div>
        <b>Caching Strategy</b>
        <ul>
          <li>Redis Hash: key = vpa, value = serialised VPA record, TTL = 300 s</li>
          <li>On VPA update/close: PSP pushes invalidation event → Kafka → cache consumer deletes key</li>
          <li>Negative caching: non-existent VPA cached with TTL 10 s to prevent Oracle hammering</li>
          <li>Pre-warm: top 10M VPAs (merchants, high-frequency) permanently warm via cron</li>
        </ul>
      </div>
      <div>
        <b>Handle-Based Routing</b><br/>
        The "@handle" suffix (e.g., @okicici, @ybl) maps to a PSP × Bank combination. NPCI maintains the handle routing table. This routes the debit request to the correct bank CBS without full VPA resolution.
        <br/><br/>
        <b>VPA Validation Flow</b>
        <ol>
          <li>App calls GET /upi/v2/vpa/resolve?vpa=mahesh@okicici</li>
          <li>PSP Server → NPCI Switch → Redis lookup</li>
          <li>Returns payee name (masked account) — user confirms before PIN entry</li>
          <li>Confirmation prevents misdirected payments</li>
        </ol>
        <b>Security</b>
        <ul>
          <li>Account number always encrypted with AES-256-GCM at rest</li>
          <li>Only masked account returned to PSP/app layer</li>
          <li>IFSC + full account number only within NPCI switch boundary</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- Section 7: Core Service: Fraud Detection Engine -->
<div class="ref-section">
  <div class="ref-title">7. Core Service: Fraud Detection Engine</div>
  <div class="ref-body">
    <p>Fraud detection runs inline during every transaction with a budget of &lt; 50 ms. It combines rule-based checks with ML model inference and real-time graph analysis.</p>
    <div class="two-col">
      <div>
        <b>Rule Engine (synchronous, &lt; 10 ms)</b>
        <ul>
          <li>Velocity checks: &gt; 5 txns/min from same device → block</li>
          <li>Amount thresholds: &gt; Rs 1 lakh → require additional OTP</li>
          <li>New payee + high amount: soft decline, user confirmation</li>
          <li>Blacklisted VPA / IFSC / device fingerprint</li>
          <li>Time-of-day anomaly: 3 AM high-value to unknown payee</li>
          <li>Geo-velocity: Mumbai txn then Chennai txn within 2 min</li>
        </ul>
        <b>ML Model (asynchronous scoring, &lt; 40 ms)</b>
        <ul>
          <li>XGBoost model with 200+ features</li>
          <li>Features: historical txn pattern, device trust score, merchant risk, social graph density</li>
          <li>Model served via TensorFlow Serving sidecar (co-located pod)</li>
          <li>Score range 0–1; threshold &gt; 0.8 → decline; 0.5–0.8 → challenge</li>
          <li>Model retrained daily on settled txn labels</li>
        </ul>
      </div>
      <div>
        <b>Graph Analysis (async, post-transaction)</b>
        <ul>
          <li>Neo4j graph DB tracks (account → payee) edges</li>
          <li>Money mule detection: A→B→C→D rapid fan-out pattern</li>
          <li>Alerts sent via Kafka to dispute team</li>
          <li>Does not block real-time txn — flags for review</li>
        </ul>
        <b>Feedback Loop</b>
        <ul>
          <li>User disputes labelled as fraud → retraining dataset</li>
          <li>Bank-reported frauds via API integrated daily</li>
          <li>NPCI central fraud registry: VPAs and devices flagged across all PSPs</li>
        </ul>
        <b>Decision Outcomes</b>
        <div class="code-box">
ALLOW    → proceed with txn
SOFT_DECLINE → ask user to re-confirm with OTP
HARD_DECLINE → reject, notify PSP
HOLD     → allow but flag for T+1 review
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Section 8: Database Design -->
<div class="ref-section">
  <div class="ref-title">8. Database Design</div>
  <div class="ref-body">
    <b>Transactions Table (Cassandra — write-optimised, time-series)</b>
    <div class="code-box">
CREATE TABLE transactions (
  txn_date     DATE,               -- partition key (daily bucket)
  npci_txn_id  TEXT,               -- clustering key (snowflake ID)
  client_txn_id TEXT,
  payer_vpa    TEXT,
  payee_vpa    TEXT,
  amount       BIGINT,             -- in paise
  currency     TEXT,
  status       TEXT,               -- PENDING / SUCCESS / FAILED / REVERSED
  payer_bank   TEXT,
  payee_bank   TEXT,
  rrn          TEXT,               -- bank reference number
  fraud_score  FLOAT,
  created_at   TIMESTAMP,
  updated_at   TIMESTAMP,
  PRIMARY KEY ((txn_date), npci_txn_id)
) WITH CLUSTERING ORDER BY (npci_txn_id DESC)
  AND default_time_to_live = 7776000;  -- 90 days hot; archive to S3 after
    </div>
    <b>VPA Registry (Oracle RAC — ACID, authoritative)</b>
    <div class="code-box">
CREATE TABLE vpa_registry (
  vpa          VARCHAR2(255) PRIMARY KEY,
  bank_code    CHAR(4)       NOT NULL,
  ifsc         CHAR(11)      NOT NULL,
  account_no   RAW(256)      NOT NULL,   -- AES-256-GCM encrypted
  account_name VARCHAR2(100),
  status       VARCHAR2(20)  DEFAULT 'ACTIVE',
  psp_handle   VARCHAR2(50)  NOT NULL,
  created_at   TIMESTAMP     DEFAULT SYSDATE,
  updated_at   TIMESTAMP,
  CONSTRAINT chk_status CHECK (status IN ('ACTIVE','SUSPENDED','CLOSED'))
);
CREATE INDEX idx_vpa_bank ON vpa_registry(bank_code, status);
    </div>
    <b>Mandates Table (Oracle)</b>
    <div class="code-box">
CREATE TABLE mandates (
  mandate_id   VARCHAR2(36)  PRIMARY KEY,
  payer_vpa    VARCHAR2(255) NOT NULL,
  payee_vpa    VARCHAR2(255) NOT NULL,
  amount_limit BIGINT        NOT NULL,   -- max per execution (paise)
  frequency    VARCHAR2(20),             -- DAILY/WEEKLY/MONTHLY/AS_PRESENTED
  start_date   DATE          NOT NULL,
  end_date     DATE,
  status       VARCHAR2(20)  DEFAULT 'ACTIVE',
  created_at   TIMESTAMP     DEFAULT SYSDATE
);
    </div>
    <b>Idempotency Keys (Redis)</b>
    <div class="code-box">
Key:   idempotency:{clientTxnId}
Value: {npciTxnId, status, response_json}
TTL:   86400 seconds (24 hours)
Type:  Redis String (JSON serialised)
    </div>
  </div>
</div>

<!-- Section 9: Data Flow — Key Scenarios -->
<div class="ref-section">
  <div class="ref-title">9. Data Flow — Key Scenarios</div>
  <div class="ref-body">
    <b>Scenario A: P2P Payment (Happy Path)</b>
    <div class="flow-box">
      <div class="flow-step">1. User enters payee VPA + amount in GPay app</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">2. GPay PSP Server validates device fingerprint, encrypts UPI PIN via HSM, generates clientTxnId</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">3. PSP → NPCI Switch: POST /pay (SignedXML over mTLS)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">4. Switch checks idempotency (Redis). New txn → assign npciTxnId, write Cassandra PENDING</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">5. VPA resolution: Redis hit (95%) → get payee IFSC + account; display payee name to user</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">6. Fraud engine: rule check (3 ms) + ML score (40 ms) → ALLOW</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">7. Switch → Payer CBS DebitReq: verify PIN, check balance, debit account, return RRN (600 ms)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">8. Cassandra updated: DEBIT_SUCCESS</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">9. Switch → Bene CBS CreditReq: credit account, push notification to receiver (400 ms)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">10. Cassandra updated: SUCCESS. Kafka event published.</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">11. Response returned to PSP → app shows "Payment Successful" with RRN</div>
    </div>
    <br/>
    <b>Scenario B: UPI AutoPay Mandate Execution</b>
    <div class="flow-box">
      <div class="flow-step">1. Mandate Service cron fires at scheduled time (e.g., 1st of month for SIP)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">2. Fetch active mandates from Oracle, generate execution batch</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">3. For each mandate: send Pre-Debit Notification to payer (T-1 day, per RBI rule)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">4. On execution day: initiate debit without UPI PIN (pre-authorised)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">5. Same debit → credit flow as P2P, but no PIN challenge</div>
    </div>
    <br/>
    <b>Scenario C: Transaction Reversal (Credit Failure)</b>
    <div class="flow-box">
      <div class="flow-step">1. Debit succeeds at Payer CBS, but Bene CBS returns timeout / error</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">2. Switch sets txn state to CREDIT_FAILED</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">3. Auto-reversal job (retries every 30 s, up to 5 attempts) sends ReversalReq to Payer CBS</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">4. Payer CBS credits back the debited amount → txn = REVERSED</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">5. PSP notified; user gets "Payment failed, amount reversed" notification</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">6. If reversal also fails after 5 attempts → raise automated dispute ticket via NACH</div>
    </div>
  </div>
</div>

<!-- Section 10: Caching Strategy -->
<div class="ref-section">
  <div class="ref-title">10. Caching Strategy</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>What is Cached</b>
        <table class="pattern-table" style="width:100%">
          <tr class="pt-header"><td>Data</td><td>Cache</td><td>TTL</td><td>Strategy</td></tr>
          <tr class="pt-row"><td class="pt-name">VPA → Account mapping</td><td>Redis Cluster</td><td>300 s</td><td>Cache-aside</td></tr>
          <tr class="pt-row"><td class="pt-name">Idempotency keys</td><td>Redis</td><td>86400 s</td><td>Write-through</td></tr>
          <tr class="pt-row"><td class="pt-name">Rate limit counters</td><td>Redis (sliding window)</td><td>60 s</td><td>Write-through</td></tr>
          <tr class="pt-row"><td class="pt-name">Bank CBS availability</td><td>Redis</td><td>30 s</td><td>Write-through</td></tr>
          <tr class="pt-row"><td class="pt-name">Fraud blacklists</td><td>Redis Set</td><td>No TTL (event driven)</td><td>Push invalidation</td></tr>
          <tr class="pt-row"><td class="pt-name">Handle routing table</td><td>In-process (Caffeine)</td><td>5 min</td><td>Cache-aside</td></tr>
        </table>
      </div>
      <div>
        <b>Cache Architecture</b>
        <ul>
          <li>Redis 7.x Cluster mode — 6 shards, 3 replicas each</li>
          <li>Read replicas serve VPA reads — zero latency degradation on primary failover</li>
          <li>Cluster uses consistent hashing with hash tags: {vpa}:record ensures same shard</li>
          <li>Eviction policy: allkeys-lru for VPA cache partition</li>
          <li>VPA write path: Oracle first, then cache — never stale write to Redis</li>
        </ul>
        <b>Cache Warming</b>
        <ul>
          <li>Top 10M VPAs (by txn frequency) pre-warmed at startup</li>
          <li>Warm job runs from Cassandra analytics — no Oracle load during warm</li>
          <li>Gradual warm on Redis failover (not all at once) to avoid thundering herd</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- Section 11: Message Queue / Event Streaming -->
<div class="ref-section">
  <div class="ref-title">11. Message Queue / Event Streaming (Kafka)</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>Why Kafka</b>
        <ul>
          <li>100K events/sec throughput requirement — Kafka handles 1M+ msg/sec per broker</li>
          <li>Durable replay: settlement engine needs to reprocess missed events</li>
          <li>Multiple consumers (fraud, analytics, notification) without coupling</li>
          <li>At-least-once delivery with idempotent consumer logic</li>
          <li>Log compaction for VPA update events (keep latest state)</li>
        </ul>
        <b>Topic Design</b>
        <table class="pattern-table" style="width:100%">
          <tr class="pt-header"><td>Topic</td><td>Partitions</td><td>Retention</td></tr>
          <tr class="pt-row"><td class="pt-name">upi.txn.events</td><td>200</td><td>7 days</td></tr>
          <tr class="pt-row"><td class="pt-name">upi.txn.success</td><td>100</td><td>7 days</td></tr>
          <tr class="pt-row"><td class="pt-name">upi.txn.failed</td><td>50</td><td>30 days</td></tr>
          <tr class="pt-row"><td class="pt-name">upi.fraud.alerts</td><td>50</td><td>30 days</td></tr>
          <tr class="pt-row"><td class="pt-name">upi.vpa.changes</td><td>20</td><td>Compact</td></tr>
          <tr class="pt-row"><td class="pt-name">upi.settlement.batch</td><td>10</td><td>90 days</td></tr>
          <tr class="pt-row"><td class="pt-name">upi.notifications</td><td>100</td><td>3 days</td></tr>
        </table>
      </div>
      <div>
        <b>Consumer Groups</b>
        <ul>
          <li><b>fraud-cg</b>: Reads upi.txn.events, runs post-transaction fraud scoring, writes to upi.fraud.alerts</li>
          <li><b>settlement-cg</b>: Reads upi.txn.success, aggregates per-bank net position hourly</li>
          <li><b>notification-cg</b>: Reads upi.txn.success + upi.txn.failed, fans out push/SMS</li>
          <li><b>analytics-cg</b>: Reads all topics, writes to Elasticsearch and data lake (S3 via Kafka Connect)</li>
          <li><b>cache-invalidation-cg</b>: Reads upi.vpa.changes, deletes stale Redis keys</li>
        </ul>
        <b>Exactly-Once Semantics</b>
        <ul>
          <li>Producers use idempotent producer API + transactional API</li>
          <li>Settlement consumer uses Kafka transactions to atomically commit offset + DB write</li>
          <li>Notification consumer: idempotent dedup by txnId before sending push</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- Section 12: Real-time Communication -->
<div class="ref-section">
  <div class="ref-title">12. Real-time Communication</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>Payment Status — Short Polling</b><br/>
        UPI does NOT use WebSockets for payment status. The PSP app polls GET /upi/v2/txn/{id}/status at 1-second intervals with exponential backoff. Transaction completes in &lt; 2 s (typical), so 2–3 polls suffice. WebSockets are overkill for this pattern and add infra complexity.
        <br/><br/>
        <b>Collect Request Notification — Push (FCM/APNs)</b><br/>
        When a merchant sends a collect request to a payer, the NPCI Switch publishes to upi.notifications Kafka topic → notification service → FCM/APNs push to payer's device. This avoids the need for persistent connections.
      </div>
      <div>
        <b>Payment Request via QR (Deep Link)</b><br/>
        QR codes encode a UPI deep link URI:<br/>
        <code>upi://pay?pa=merchant@ybl&amp;pn=BigBazaar&amp;am=250.00&amp;cu=INR&amp;tn=OrderABC</code><br/>
        The PSP app intercepts the deep link, pre-fills payment details, and shows PIN entry screen. No real-time connection needed.
        <br/><br/>
        <b>AutoPay Pre-Debit Notification</b><br/>
        T-1 day notification sent via push + SMS. Consumer financial protection mandated by RBI. Handled by mandate service writing to upi.notifications topic.
      </div>
    </div>
    <div class="tip-box">
      <b>Design Note:</b> UPI avoids persistent WebSocket connections deliberately. Given 500M users, maintaining 500M open connections is a scaling nightmare. Short-polling with aggressive caching and push notifications achieves the same UX with far lower infra cost.
    </div>
  </div>
</div>

<!-- Section 13: Consistency & Transactions -->
<div class="ref-section">
  <div class="ref-title">13. Consistency &amp; Transactions</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>The Core Problem</b><br/>
        A UPI payment spans two independent bank databases (payer CBS + bene CBS). Classical 2PC (two-phase commit) requires both banks to be available simultaneously — too risky. UPI uses a Saga pattern with compensating transactions.
        <br/><br/>
        <b>Saga Pattern (Choreography)</b>
        <div class="code-box">
Step 1: Debit payer account (Payer CBS)
  → Success: publish TXN_DEBITED event
  → Failure: publish TXN_DEBIT_FAILED → end (no compensation needed)

Step 2: Credit beneficiary (Bene CBS)
  → Success: publish TXN_CREDITED → DONE
  → Failure: publish TXN_CREDIT_FAILED
    → compensate: publish REVERSAL_REQUESTED

Step 3 (compensation): Reverse debit (Payer CBS)
  → Success: publish TXN_REVERSED
  → Failure: publish REVERSAL_FAILED → human dispute
        </div>
      </div>
      <div>
        <b>Idempotency</b><br/>
        All CBS API calls include a unique idempotency key (npciTxnId + step suffix). If network retry fires duplicate DebitReq, CBS checks its own dedup table and returns same ack — no double debit.
        <br/><br/>
        <b>Distributed Locking</b><br/>
        Rate limit enforcement uses Redis INCR + EXPIRE — atomic. Account balance check uses optimistic locking in CBS (CBS is the authority; switch never holds locks cross-system).
        <br/><br/>
        <b>Consistency Choices</b>
        <ul>
          <li>NPCI Switch ↔ Cassandra: QUORUM writes (2 of 3 replicas) for txn state — strong enough for audit</li>
          <li>VPA Registry (Oracle): full ACID; VPA → account mapping is authoritative</li>
          <li>Fraud rules: eventual consistency acceptable — stale blacklist by 30 s is tolerable</li>
          <li>Settlement netting: strictly consistent; Oracle + Kafka transactions</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- Section 14: Search Architecture -->
<div class="ref-section">
  <div class="ref-title">14. Search Architecture</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>Use Cases for Elasticsearch</b>
        <ul>
          <li>Dispute management: search txns by VPA, amount range, date, bank, status</li>
          <li>Merchant analytics: search by merchant category code (MCC), PSP, region</li>
          <li>Regulatory reporting: RBI queries on transaction volumes by bank</li>
          <li>Fraud investigation: full-text search on remarks, device IDs</li>
        </ul>
        <b>Index Design</b>
        <div class="code-box">
Index: upi_transactions
Shards: 20 (based on 1TB/month growth)
Replicas: 1

Mappings:
  npci_txn_id:   keyword
  payer_vpa:     keyword
  payee_vpa:     keyword
  amount:        long
  status:        keyword
  created_at:    date
  payer_bank:    keyword
  payee_bank:    keyword
  remarks:       text (analyzed)
  fraud_score:   float
        </div>
      </div>
      <div>
        <b>Data Pipeline</b>
        <ul>
          <li>Kafka Connect (Elasticsearch Sink Connector) streams from upi.txn.success + upi.txn.failed</li>
          <li>Lag tolerance: &lt; 5 seconds from txn completion to searchable in ES</li>
          <li>ILM (Index Lifecycle Management): hot → warm → cold → delete over 90 days</li>
          <li>Hot tier: SSD nodes for last 7 days (dispute SLA is 5 days)</li>
        </ul>
        <b>Query Patterns</b>
        <div class="code-box">
// Dispute search
GET upi_transactions/_search {
  "query": {
    "bool": {
      "must": [
        {"term": {"payer_vpa": "mahesh@okicici"}},
        {"range": {"created_at": {"gte": "now-7d"}}},
        {"term": {"status": "FAILED"}}
      ]
    }
  }
}
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Section 15: CDN & Media Delivery -->
<div class="ref-section">
  <div class="ref-title">15. CDN &amp; Media Delivery</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>What is CDN-Served</b>
        <ul>
          <li>PSP app static assets (JS bundles, CSS, images) — served via CloudFront/Akamai</li>
          <li>UPI QR code images for merchants — generated once, cached at edge, served globally</li>
          <li>Merchant logo assets for app display</li>
          <li>SDK distribution packages (UPI SDK for third-party app integration)</li>
          <li>Public documentation and developer portal assets</li>
        </ul>
        <b>Edge Caching Strategy</b>
        <ul>
          <li>Static JS/CSS: Cache-Control: max-age=31536000, immutable (versioned filenames)</li>
          <li>Merchant QR: Cache-Control: max-age=3600; invalidated on VPA change</li>
          <li>API responses are NOT CDN-cached (financial data must be fresh)</li>
        </ul>
      </div>
      <div>
        <b>QR Code Generation</b>
        <ul>
          <li>Merchant QR = encoded UPI deep link URI (VPA + optional fixed amount)</li>
          <li>Generated as SVG/PNG on merchant onboarding, stored in S3</li>
          <li>CDN URL: cdn.upi.npci.org.in/qr/{merchantId}.png</li>
          <li>On VPA change → S3 object overwritten → CloudFront invalidation triggered</li>
        </ul>
        <b>NPCI API Gateway CDN Layer</b>
        <ul>
          <li>Akamai used as DDoS shield in front of NPCI API gateway</li>
          <li>Absorbs L3/L4 DDoS (common during festival sales)</li>
          <li>IP reputation filtering at edge — blocks known bot subnets</li>
          <li>Not a caching CDN for APIs — acts purely as network security layer</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- Section 16: Security -->
<div class="ref-section">
  <div class="ref-title">16. Security</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>Authentication &amp; Authorisation</b>
        <ul>
          <li>PSP → NPCI: mTLS (mutual TLS) with NPCI-issued client certificates. No JWT for machine-to-machine.</li>
          <li>User → PSP: Biometric (fingerprint/face) + UPI PIN. PIN never leaves the device unencrypted.</li>
          <li>UPI PIN: Encrypted on device with bank's public key (RSA-2048). Decrypted only in bank CBS HSM.</li>
          <li>Device binding: each device registered with a unique IMEI + sim hash. VPA tied to device.</li>
          <li>NPCI APIs: OAuth 2.0 client credentials for PSP registration and admin operations.</li>
        </ul>
        <b>Encryption</b>
        <ul>
          <li>In transit: TLS 1.3 everywhere. NPCI mandates no TLS 1.0/1.1.</li>
          <li>At rest: AES-256-GCM for account numbers, UPI PINs, PAN data in Oracle.</li>
          <li>Cassandra encryption at rest via TDE (Transparent Data Encryption).</li>
          <li>Redis: RDB snapshots encrypted with AWS KMS CMK.</li>
          <li>HSM (Hardware Security Module) for all cryptographic operations at NPCI and banks.</li>
        </ul>
      </div>
      <div>
        <b>Rate Limiting</b>
        <ul>
          <li>Per-VPA: 20 TPS (sliding window, Redis)</li>
          <li>Per-PSP: 100K TPS</li>
          <li>Per-device: 10 txns/min</li>
          <li>Per-user: Rs 1 lakh/day P2P limit (RBI mandate)</li>
          <li>Merchant collect: Rs 5 lakh/txn</li>
        </ul>
        <b>Fraud &amp; Security Controls</b>
        <ul>
          <li>SIM swap detection: UPI blocked for 24h after SIM change</li>
          <li>New device cooldown: first transaction limit Rs 5,000</li>
          <li>Jailbroken/rooted device: PSP SDK blocks UPI PIN entry</li>
          <li>Screen recording detection: blur PIN entry field on Android/iOS</li>
          <li>Certificate pinning in PSP apps: prevent MitM</li>
        </ul>
        <b>Compliance</b>
        <ul>
          <li>PCI-DSS Level 1 for card data paths</li>
          <li>RBI guidelines: data localisation (all data within India)</li>
          <li>NPCI audit: quarterly penetration testing</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- Section 17: Scalability Patterns -->
<div class="ref-section">
  <div class="ref-title">17. Scalability Patterns</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>Horizontal Scaling</b>
        <ul>
          <li>NPCI Switch: stateless pods behind L4 load balancer (F5 / NGINX). Auto-scale from 50 to 500 pods via Kubernetes HPA on CPU + custom TPS metric.</li>
          <li>VPA Registry service: stateless, reads from Redis → scales horizontally with zero coordination.</li>
          <li>Fraud engine: co-located with switch pods (sidecar) — scales with switch.</li>
          <li>Kafka: partition-based parallelism. Adding partitions + consumers scales linearly.</li>
        </ul>
        <b>Database Sharding</b>
        <ul>
          <li>Cassandra: naturally partitioned by (txn_date, npci_txn_id). Adding nodes = linear scale.</li>
          <li>Oracle VPA Registry: read replicas for read scale. Write path single primary (Oracle RAC for HA, not scale-out).</li>
          <li>Redis: cluster with 20 hash slots per shard. Resharding via CLUSTER REBALANCE.</li>
        </ul>
      </div>
      <div>
        <b>Read Replicas</b>
        <ul>
          <li>Oracle: 2 read replicas for VPA reads that bypass cache miss</li>
          <li>Cassandra: QUORUM reads can be served by any 2 of 3 replicas — distributes read load</li>
        </ul>
        <b>Traffic Management</b>
        <ul>
          <li>Bank CBS rate limiting: each bank publishes capacity TPS. NPCI switch respects per-bank limits via token bucket. If SBI can handle 5K TPS, NPCI queues excess rather than overwhelming CBS.</li>
          <li>Back-pressure: when CBS queue depth exceeds threshold, NPCI returns soft-decline "try again in 10s" to PSP (avoids overload cascade).</li>
          <li>Priority queues: mandate executions (batch) have lower priority than real-time P2P.</li>
        </ul>
        <b>Geo Distribution</b>
        <ul>
          <li>3 active DCs (Mumbai, Hyderabad, Chennai) — active-active for inbound PSP traffic</li>
          <li>Oracle: primary in Mumbai, standby in Hyderabad (Data Guard, sync replication)</li>
          <li>Cassandra: rack-aware placement across 3 DCs, RF=3</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- Section 18: Fault Tolerance & Reliability -->
<div class="ref-section">
  <div class="ref-title">18. Fault Tolerance &amp; Reliability</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>Circuit Breaker (Bank CBS)</b>
        <ul>
          <li>Hystrix/Resilience4j circuit breaker wraps every CBS API call</li>
          <li>Threshold: 50% failures in 10-second window → OPEN</li>
          <li>OPEN state: immediately return CBS_UNAVAILABLE to switch</li>
          <li>Half-open probe every 30 s — if CBS recovers, close circuit</li>
          <li>Switch publishes bank_health metrics to Redis (TTL 30 s)</li>
          <li>PSP can pre-check bank availability before initiating txn</li>
        </ul>
        <b>Retry Policy</b>
        <ul>
          <li>DebitReq: no automatic retry (risk of double debit — idempotency key required)</li>
          <li>CreditReq: retry 3× with 5 s exponential backoff (idempotent with npciTxnId)</li>
          <li>ReversalReq: retry 5× with 30 s backoff</li>
          <li>All retries log to Cassandra for audit trail</li>
        </ul>
      </div>
      <div>
        <b>Bulkhead Pattern</b>
        <ul>
          <li>Separate thread pools for each bank CBS connection — SBI failure cannot starve ICICI threads</li>
          <li>Kafka consumers: separate consumer groups per use case — fraud backlog cannot delay notifications</li>
          <li>Fraud engine: separate pod pool — even if fraud service is slow, payment completes (with a conservative allow decision)</li>
        </ul>
        <b>Chaos Engineering</b>
        <ul>
          <li>Chaos Monkey-style failures injected in pre-prod monthly</li>
          <li>Scenarios: single CBS timeout, Redis primary failure, Cassandra node loss, Kafka broker failure</li>
          <li>Runbook for each: documented, tested, and automated where possible</li>
        </ul>
        <b>Timeouts</b>
        <div class="code-box">
PSP → NPCI Switch:     30 s (RBI mandate)
NPCI → Payer CBS:     600 ms (debit)
NPCI → Bene CBS:      400 ms (credit)
VPA cache lookup:       5 ms
Fraud engine:          50 ms
Overall SLA (P95):    1.5 s
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Section 19: Monitoring & Observability -->
<div class="ref-section">
  <div class="ref-title">19. Monitoring &amp; Observability</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>Metrics (Prometheus + Grafana)</b>
        <ul>
          <li>upi_txn_tps — transactions per second (by PSP, by bank, by status)</li>
          <li>upi_txn_latency_p99 — end-to-end latency percentiles</li>
          <li>upi_cbs_latency{bank} — per-bank CBS response time</li>
          <li>upi_fraud_block_rate — % transactions blocked by fraud engine</li>
          <li>upi_redis_cache_hit_rate — VPA cache hit %</li>
          <li>upi_cassandra_write_latency — Cassandra write P99</li>
          <li>upi_reversal_rate — % transactions requiring reversal</li>
          <li>upi_dispute_open_count — open dispute tickets</li>
        </ul>
        <b>Distributed Tracing (Jaeger / OpenTelemetry)</b>
        <ul>
          <li>Every txn carries X-Trace-ID through all services</li>
          <li>Spans: PSP recv → VPA resolve → fraud check → debit → credit → response</li>
          <li>P99 trace shows where latency is coming from</li>
        </ul>
      </div>
      <div>
        <b>Logging (ELK Stack)</b>
        <ul>
          <li>Structured JSON logs from all services</li>
          <li>Log enriched with npciTxnId, payer bank, payee bank, fraud score</li>
          <li>Retained 90 days in Elasticsearch (regulatory)</li>
          <li>Sensitive fields masked (account number, UPI PIN never logged)</li>
        </ul>
        <b>Alerts</b>
        <ul>
          <li>TPS drops &gt; 20% in 2 min → PagerDuty P1</li>
          <li>Reversal rate &gt; 1% → P2 alert</li>
          <li>CBS latency &gt; 500 ms for 3 consecutive minutes → P1</li>
          <li>Fraud block rate &gt; 5% → fraud team notified</li>
          <li>Redis hit rate &lt; 90% → cache warming job triggered</li>
        </ul>
        <b>SLO / SLA</b>
        <ul>
          <li>SLO: 99.95% of transactions succeed or fail within 30 s</li>
          <li>SLO: P99 latency &lt; 2 s during business hours</li>
          <li>Error budget: 0.05% = ~21K failed txns/day (to be kept as reversals, not fund loss)</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- Section 20: Deployment Architecture -->
<div class="ref-section">
  <div class="ref-title">20. Deployment Architecture</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>Multi-AZ / Multi-DC Setup</b>
        <ul>
          <li>3 NPCI data centres: Mumbai (primary), Hyderabad (DR), Chennai (secondary active)</li>
          <li>Active-Active for PSP-facing traffic — anycast DNS routes PSPs to nearest DC</li>
          <li>Oracle primary in Mumbai, synchronous standby in Hyderabad (zero data loss)</li>
          <li>Cassandra: RF=3, one replica per DC — can survive entire DC outage</li>
          <li>Kafka MirrorMaker 2 replicates topics across DCs (async, 1 s lag)</li>
        </ul>
        <b>Kubernetes</b>
        <ul>
          <li>NPCI Switch runs on bare-metal Kubernetes (Red Hat OpenShift) for predictable latency</li>
          <li>No cloud provider dependency (regulatory: data must stay in NPCI-controlled DCs)</li>
          <li>Pod disruption budgets: min 80% pods available during rolling updates</li>
          <li>Resource limits: 4 CPU / 8 GB RAM per switch pod</li>
        </ul>
      </div>
      <div>
        <b>Blue-Green Deployment</b>
        <ul>
          <li>Two identical environments (blue = live, green = new release)</li>
          <li>Green deployed and tested with synthetic traffic (shadow mode)</li>
          <li>Switch traffic: F5 load balancer weight shift 0% → 10% → 50% → 100%</li>
          <li>Rollback: flip LB weight back — completed in &lt; 30 s</li>
          <li>Database schema changes: backward-compatible only (no column drops during blue-green window)</li>
        </ul>
        <b>Canary Releases</b>
        <ul>
          <li>New switch version: 1% of PSP traffic routed to canary pods</li>
          <li>Monitor error rate and latency for 30 min before full rollout</li>
          <li>Automated rollback if error rate exceeds 0.1% on canary</li>
        </ul>
        <b>Maintenance Windows</b>
        <ul>
          <li>Scheduled maintenance: 2–4 AM Sunday (lowest txn volume)</li>
          <li>Zero-downtime for switch upgrades; Oracle maintenance with Dataguard failover</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- Section 21: Performance Optimisations -->
<div class="ref-section">
  <div class="ref-title">21. Performance Optimisations</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>NPCI Switch</b>
        <ul>
          <li>Netty-based async I/O — handles 50K concurrent connections per node without blocking threads</li>
          <li>HTTP/2 multiplexing for CBS API calls — reuse connections, avoid TCP handshake overhead</li>
          <li>Connection pool to each bank CBS: pre-warmed 200 connections, kept alive with health pings</li>
          <li>Zero-copy message parsing: Protocol Buffers for internal service communication (60% smaller than JSON)</li>
        </ul>
        <b>VPA Resolution</b>
        <ul>
          <li>Redis pipeline: batch 10 VPA lookups in one RTT for collect-request batches</li>
          <li>Bloom filter pre-check: before Redis lookup, check if VPA exists at all (avoids 100K cache misses/s for invalid VPAs)</li>
          <li>DNS-like negative caching: invalid VPA result cached 10 s</li>
        </ul>
      </div>
      <div>
        <b>Cassandra Write Optimisations</b>
        <ul>
          <li>Batch writes: group 5 related state updates (PENDING → DEBIT_SUCCESS) in one Cassandra batch</li>
          <li>Async writes for non-critical paths (fraud score update after txn completes)</li>
          <li>Compaction strategy: TWCS (Time Window Compaction) — optimised for time-series delete-free workloads</li>
          <li>Row caching: last 10K txns per VPA kept in Cassandra row cache for dispute lookups</li>
        </ul>
        <b>Fraud Engine</b>
        <ul>
          <li>Feature vector pre-computed and cached: user profile features updated every 5 min via background job</li>
          <li>Model quantisation: INT8 quantised XGBoost reduces inference time from 40 ms to 15 ms</li>
          <li>Rule engine compiled to bytecode (Drools): avoids interpreted rule parsing per txn</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- Section 22: Cost Optimisation -->
<div class="ref-section">
  <div class="ref-title">22. Cost Optimisation</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>Cassandra Storage Tiering</b>
        <ul>
          <li>Hot data (last 7 days): NVMe SSD — high IOPS for dispute lookups</li>
          <li>Warm data (7–90 days): SAS HDD — 5× cheaper, acceptable latency for regulatory queries</li>
          <li>Cold data (&gt; 90 days): Compressed Parquet on HDFS / S3 — 20× cheaper. Queried via Spark for annual reporting.</li>
        </ul>
        <b>Kafka Compression</b>
        <ul>
          <li>LZ4 compression on all topics: 3× compression ratio on transaction JSON</li>
          <li>Reduces broker disk from 100 MB/s → 33 MB/s = 3× fewer broker nodes</li>
        </ul>
        <b>Oracle License Optimisation</b>
        <ul>
          <li>VPA registry: use Oracle Standard Edition 2 for read replicas (cheaper than EE)</li>
          <li>Archival queries moved to open-source PostgreSQL-compatible layer (reducing Oracle IOPS charges)</li>
        </ul>
      </div>
      <div>
        <b>Redis Memory Optimisation</b>
        <ul>
          <li>Hash encoding: small VPA records stored as Redis Hash (ziplist encoding) — 10× memory savings vs String</li>
          <li>Active expiry tuning: hz=20 to aggressively expire idle idempotency keys</li>
          <li>Avoid Redis for large blobs: txn history stored in Cassandra, not Redis</li>
        </ul>
        <b>Compute Right-sizing</b>
        <ul>
          <li>Switch pods: CPU:Memory = 4:8 — compute-bound, not memory-bound. C-optimised instances.</li>
          <li>Fraud engine sidecar: GPU inference only for peak 20% time; CPU fallback for off-peak saves GPU licensing cost</li>
          <li>Scheduled scale-down: Cassandra compaction workers scaled in off-peak (2–6 AM) to avoid CPU contention with live traffic</li>
        </ul>
        <b>Network Cost</b>
        <ul>
          <li>All 3 DCs interconnected via MPLS private lines (not public internet) — fixed cost, predictable latency</li>
          <li>Protocol Buffers for inter-service communication: 60% bandwidth reduction vs JSON</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- Section 23: Disaster Recovery -->
<div class="ref-section">
  <div class="ref-title">23. Disaster Recovery</div>
  <div class="ref-body">
    <table class="pattern-table" style="width:100%">
      <tr class="pt-header"><td>Component</td><td>RTO</td><td>RPO</td><td>Strategy</td></tr>
      <tr class="pt-row"><td class="pt-name">NPCI Switch</td><td>0 min</td><td>0</td><td>Active-Active across 3 DCs; anycast DNS</td></tr>
      <tr class="pt-row"><td class="pt-name">Oracle VPA Registry</td><td>30 s</td><td>0</td><td>Synchronous Data Guard standby; automatic failover</td></tr>
      <tr class="pt-row"><td class="pt-name">Cassandra Txn Log</td><td>0 min</td><td>0</td><td>RF=3 across DCs; client redirects to available replica</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis Cluster</td><td>1 min</td><td>1 s</td><td>Redis Sentinel; replica promotion; AOF persistence</td></tr>
      <tr class="pt-row"><td class="pt-name">Kafka</td><td>1 min</td><td>0</td><td>MirrorMaker 2 cross-DC; consumer offset checkpointing</td></tr>
      <tr class="pt-row"><td class="pt-name">Settlement Engine</td><td>5 min</td><td>1 min</td><td>Standby in secondary DC; hourly settlement = 1 hour max re-run</td></tr>
    </table>
    <br/>
    <div class="two-col">
      <div>
        <b>Backup Strategy</b>
        <ul>
          <li>Oracle: RMAN backup every 6 hours to tape + remote DC. Archive logs replicated in real-time.</li>
          <li>Cassandra: nodetool snapshot every 12 hours, uploaded to S3 Glacier.</li>
          <li>Redis: RDB snapshot every 1 hour + AOF (appendfsync everysec).</li>
          <li>Kafka: log segments archived to S3 via Kafka Connect every 5 min.</li>
        </ul>
      </div>
      <div>
        <b>Failover Runbook</b>
        <ol>
          <li>DC failure detected by health monitor within 30 s.</li>
          <li>Anycast DNS automatically routes PSP traffic to surviving DCs (no manual intervention).</li>
          <li>Oracle Data Guard auto-failover: standby promoted, new primary active in 30 s.</li>
          <li>Cassandra: clients auto-discover topology change via gossip protocol.</li>
          <li>Kafka: controller election completes in &lt; 60 s; producers reconnect via bootstrap list.</li>
          <li>Post-recovery: reconcile in-flight txns via Cassandra + Oracle compare. Raise disputes for any discrepancies.</li>
        </ol>
      </div>
    </div>
  </div>
</div>

<!-- Section 24: Migration Strategy -->
<div class="ref-section">
  <div class="ref-title">24. Migration Strategy</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>Phase 1: Strangler Fig — Add Cassandra alongside Oracle</b>
        <ul>
          <li>Initially all txn data went to Oracle (NPCI legacy). Oracle becomes write-through bottleneck at 5K TPS.</li>
          <li>Introduce Cassandra as the primary transaction log. Oracle kept for VPA registry and settlement (lower write volume).</li>
          <li>Dual-write phase: write txn to both Oracle and Cassandra for 4 weeks. Verify consistency.</li>
          <li>Switch reads to Cassandra; Oracle reads deprecated.</li>
        </ul>
        <b>Phase 2: Extract Fraud Engine</b>
        <ul>
          <li>Legacy: fraud rules embedded in monolithic switch codebase.</li>
          <li>Extract to separate service with its own DB and model store.</li>
          <li>Feature flags: route 5% txns through new fraud service, compare outcomes.</li>
          <li>Gradual rollout to 100% over 2 months.</li>
        </ul>
      </div>
      <div>
        <b>Phase 3: Kafka-based Event Backbone</b>
        <ul>
          <li>Legacy: settlement triggered by nightly DB polling job — brittle.</li>
          <li>Introduce Kafka; switch publishes every TXN_SUCCESS event.</li>
          <li>Settlement engine subscribes — becomes event-driven rather than batch polling.</li>
          <li>Notification service also migrated from polling to Kafka consumer.</li>
        </ul>
        <b>Phase 4: VPA Registry Redis Layer</b>
        <ul>
          <li>Legacy: every txn hit Oracle for VPA resolution — Oracle was the bottleneck at 20K TPS.</li>
          <li>Introduce Redis as read-through cache. Cache hit rate climbs to 95% within 24 hours of seeding.</li>
          <li>Oracle VPA write volume stays constant; read volume drops 95%.</li>
        </ul>
        <b>Rollback Safety</b>
        <ul>
          <li>Every phase has a feature flag — flip off to revert to old path instantly.</li>
          <li>No phase removes old code until new code has run at 100% for 30 days with zero incidents.</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- Section 25: Interview Questions & Answers -->
<div class="ref-section">
  <div class="ref-title">25. Interview Questions &amp; Answers</div>
  <div class="ref-body">
    <table class="pattern-table" style="width:100%">
      <tr class="pt-header"><td>Question</td><td>Answer</td><td>Insight</td></tr>
      <tr class="pt-row"><td class="pt-name">How do you prevent double debit if the PSP retries the same payment?</td><td>clientTxnId (idempotency key) stored in Redis with 24h TTL. On retry, Redis returns the cached response without re-processing. CBS also maintains its own dedup on npciTxnId.</td><td>Two-layer idempotency: PSP layer (clientTxnId in Redis) + CBS layer (RRN dedup)</td></tr>
      <tr class="pt-row"><td class="pt-name">What happens if the credit to beneficiary fails after a successful debit?</td><td>Saga compensation: Switch auto-initiates a reversal (DebitReversal) to the payer bank. Retried 5× with backoff. If all fail → dispute ticket. Fund is in NPCI escrow during this window.</td><td>Compensating transaction pattern; no 2PC across banks</td></tr>
      <tr class="pt-row"><td class="pt-name">How do you scale to 50K TPS during Diwali?</td><td>HPA scales Switch pods from 50 to 500. Cassandra handles linear write scale. Redis pipeline batching. Per-bank rate limiting prevents CBS overload. Pre-scale 1 hour before known events.</td><td>Predictable peak = pre-scale; unpredictable = HPA with 2-min lead time</td></tr>
      <tr class="pt-row"><td class="pt-name">Why Cassandra over Oracle for transaction log?</td><td>Oracle ACID is great but does not scale writes horizontally. Cassandra gives linear write scale, time-series partitioning, and tunable consistency. Txn log is append-only — perfect fit for Cassandra's LSM storage.</td><td>Right tool for the job: Oracle for authoritative registry, Cassandra for high-volume log</td></tr>
      <tr class="pt-row"><td class="pt-name">How is the UPI PIN secured?</td><td>PIN is AES-encrypted on the user's device using the bank's public key (RSA-2048). The PSP never sees the plain PIN. Only the bank's CBS HSM can decrypt it. Even NPCI Switch cannot see the PIN.</td><td>End-to-end PIN encryption; NPCI is not in the trust path for PIN</td></tr>
      <tr class="pt-row"><td class="pt-name">How do you design the settlement engine?</td><td>Multilateral netting: at end of each hour, sum all debits and credits per bank. Bank A net position = total credits received - total debits sent. Net debtors transfer via RBI-RTGS. Fewer RTGS transactions than individual settlement.</td><td>Netting reduces 50K TPS to ~300 RTGS messages/hour across 300 banks</td></tr>
      <tr class="pt-row"><td class="pt-name">How to handle a bank CBS going down during peak?</td><td>Circuit breaker opens after 50% failure rate in 10 s. NPCI immediately returns bank_unavailable to PSPs. PSP app shows "SBI is temporarily unavailable, try another bank." Other banks unaffected due to bulkhead pattern.</td><td>Isolate bank failures; do not let one bank's outage cascade</td></tr>
      <tr class="pt-row"><td class="pt-name">How does VPA resolution scale to 500M VPAs?</td><td>Redis cluster with 500M VPAs at ~256 bytes each = 128 GB. Distributed across 6 Redis nodes. 95% cache hit rate means Oracle handles only 5% of lookups. Bloom filter eliminates invalid VPA lookups from reaching Redis.</td><td>Cache + bloom filter = Oracle effectively handles &lt; 1% of total lookups</td></tr>
      <tr class="pt-row"><td class="pt-name">How do you ensure data stays in India (RBI regulation)?</td><td>All NPCI DCs are in India (Mumbai, Hyderabad, Chennai). No cloud provider used — bare metal OpenShift. PSPs must store Indian UPI txn data in India. Cross-border payments via UPI (Nepal, Singapore) use a separate regulatory framework with RBI approval.</td><td>Regulatory compliance is a hard constraint that shapes entire infra architecture</td></tr>
      <tr class="pt-row"><td class="pt-name">How do you detect and handle money mule accounts?</td><td>Graph analysis in Neo4j post-transaction. Detect patterns: A sends to B, B immediately sends to C, C to D (fan-out). Alert raised, account flagged for manual review. Real-time rule: if account received &gt; 10 inbound txns in 5 min and immediately forwarded → soft block.</td><td>Real-time rules for obvious patterns; graph ML for sophisticated mule networks</td></tr>
    </table>
  </div>
</div>

<!-- Section 26: Trade-off Summary -->
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
        <div class="dt-name">Txn Storage</div>
        <div class="dt-yes">Cassandra — linear write scale, time-series optimised, RF=3 across DCs</div>
        <div class="dt-no">Oracle — strong ACID but write bottleneck beyond 5K TPS; expensive at scale</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Distributed Txn</div>
        <div class="dt-yes">Saga with compensating transactions — no cross-bank locks; CBS stays autonomous</div>
        <div class="dt-no">2PC — requires both banks prepared simultaneously; CBS downtime blocks coordinator</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Real-time Status</div>
        <div class="dt-yes">Short polling (1 s interval) — simple, no server-side state, scales to 500M users</div>
        <div class="dt-no">WebSocket — persistent connections too expensive; mobile battery drain; complex scaling</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">VPA Cache</div>
        <div class="dt-yes">Redis Cluster + cache-aside — 95% hit rate; Oracle read load drops 95%</div>
        <div class="dt-no">No cache / Oracle direct — Oracle cannot handle 50K VPA lookups/sec affordably</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Settlement</div>
        <div class="dt-yes">Multilateral netting hourly — reduces 50K TPS to ~300 RTGS messages/hour</div>
        <div class="dt-no">Bilateral gross settlement — every txn triggers an RTGS; operationally infeasible</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Infra Provider</div>
        <div class="dt-yes">On-prem bare-metal OpenShift — RBI data localisation, predictable latency, no cloud vendor lock-in</div>
        <div class="dt-no">Public cloud (AWS/Azure) — faster scaling but regulatory risk; RBI had concerns about data sovereignty</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Fraud Detection Timing</div>
        <div class="dt-yes">Inline sync (&lt;50 ms) — blocks fraud before fund transfer; small latency addition acceptable</div>
        <div class="dt-no">Async post-txn only — zero latency impact but fraud already executed; reversal costly and complex</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Event Streaming</div>
        <div class="dt-yes">Kafka — high throughput, durable, multi-consumer, log compaction for VPA events</div>
        <div class="dt-no">RabbitMQ — lower throughput ceiling; no log compaction; reprocessing harder at scale</div>
      </div>
    </div>
  </div>
</div>

<!-- Section 27: Key Takeaways -->
<div class="ref-section">
  <div class="ref-title">27. Key Takeaways</div>
  <div class="ref-body">
    <div class="tip-box">
      <ul>
        <li><b>Idempotency is non-negotiable in payments:</b> Every API call must be idempotent with a client-supplied key. Network retries will happen. A double-debit is a P0 incident; prevent it architecturally, not just in application logic.</li>
        <li><b>Saga &gt; 2PC for cross-bank transactions:</b> Never hold distributed locks across independent bank systems. Design for failure with compensating transactions. The payer bank and beneficiary bank must remain autonomous.</li>
        <li><b>Separate data stores by access pattern:</b> Oracle for authoritative VPA registry (low write, ACID), Cassandra for high-volume append-only txn log, Redis for sub-millisecond cache. One-size-fits-all DB is a scaling bottleneck.</li>
        <li><b>Cache VPA aggressively — it is the hot read path:</b> 95% cache hit on Redis means Oracle handles 5% of the load. Bloom filters eliminate phantom lookups. Pre-warm top merchant VPAs at startup.</li>
        <li><b>Circuit breakers isolate bank failures:</b> 300+ banks on UPI rails. Any one bank's CBS can degrade. Bulkhead pattern ensures SBI outage does not consume threads meant for ICICI. Fail fast, retry intelligently.</li>
        <li><b>Multilateral netting is the settlement secret:</b> 50K TPS raw transactions reduce to ~300 RTGS messages per hour through netting. This is how UPI processes trillion-rupee volumes on RBI-RTGS infrastructure not designed for retail volumes.</li>
        <li><b>Regulatory constraints shape architecture:</b> RBI's data localisation mandate drove the on-prem bare-metal decision. RBI's 30-second txn completion mandate drove strict timeout and retry policies. Build compliance requirements into the design, not as an afterthought.</li>
      </ul>
    </div>
  </div>
</div>
`;
