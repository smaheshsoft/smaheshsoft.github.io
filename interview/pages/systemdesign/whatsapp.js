window.Pages['sd-whatsapp'] = `
<div class="page-header">
  <div class="breadcrumb">System Design › <span>WhatsApp (Messaging)</span></div>
  <h1>💬 WhatsApp — Real-Time Messaging System Design</h1>
  <p>Persistent-connection fan-out, store-and-forward delivery, end-to-end encryption, and presence at 2B+ user scale</p>
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

      <!-- Layer Labels -->
      <text x="30" y="60" font-size="11" fill="#888" font-family="monospace">CLIENT</text>
      <text x="30" y="150" font-size="11" fill="#888" font-family="monospace">GATEWAY</text>
      <text x="30" y="250" font-size="11" fill="#888" font-family="monospace">SERVICES</text>
      <text x="30" y="365" font-size="11" fill="#888" font-family="monospace">DATA</text>

      <!-- Layer dividers -->
      <line x1="20" y1="75" x2="880" y2="75" stroke="#1e2530" stroke-width="1"/>
      <line x1="20" y1="170" x2="880" y2="170" stroke="#1e2530" stroke-width="1"/>
      <line x1="20" y1="290" x2="880" y2="290" stroke="#1e2530" stroke-width="1"/>
      <line x1="20" y1="380" x2="880" y2="380" stroke="#1e2530" stroke-width="1"/>

      <!-- CLIENT LAYER -->
      <!-- Mobile Client -->
      <rect x="120" y="22" width="130" height="46" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="185" y="41" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#e2e8f0">&#x1F4F1; Mobile Client</text>
      <text x="185" y="57" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">iOS / Android / Web</text>

      <!-- Web Client -->
      <rect x="290" y="22" width="130" height="46" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="355" y="41" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#e2e8f0">&#x1F5A5; Web Client</text>
      <text x="355" y="57" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">WhatsApp Web / Desktop</text>

      <!-- Arrows: Clients to Gateway -->
      <line x1="185" y1="68" x2="185" y2="98" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="355" y1="68" x2="320" y2="98" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- GATEWAY LAYER -->
      <!-- WebSocket Gateway -->
      <rect x="120" y="98" width="260" height="54" rx="8" fill="#1a2d20" stroke="#4ade80" stroke-width="1.5"/>
      <text x="250" y="120" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#e2e8f0">&#x26A1; WebSocket Gateway</text>
      <text x="250" y="136" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Persistent Connections | Load Balancer | TLS</text>

      <!-- Load Balancer -->
      <rect x="420" y="98" width="130" height="54" rx="8" fill="#1a2d20" stroke="#4ade80" stroke-width="1.5"/>
      <text x="485" y="120" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#e2e8f0">&#x1F310; API Gateway</text>
      <text x="485" y="136" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">REST / Media Upload</text>

      <!-- Arrow: Gateway to Services -->
      <line x1="250" y1="152" x2="250" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="485" y1="152" x2="485" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- SERVICES LAYER -->
      <!-- Chat Service -->
      <rect x="30" y="182" width="110" height="50" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="85" y="202" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#e2e8f0">&#x1F4AC; Chat Svc</text>
      <text x="85" y="218" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">1:1 Messaging</text>

      <!-- Group Service -->
      <rect x="155" y="182" width="110" height="50" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="210" y="202" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#e2e8f0">&#x1F465; Group Svc</text>
      <text x="210" y="218" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Fan-out / Members</text>

      <!-- Media Service -->
      <rect x="280" y="182" width="110" height="50" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="335" y="202" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#e2e8f0">&#x1F4F7; Media Svc</text>
      <text x="335" y="218" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Upload / CDN</text>

      <!-- Presence Service -->
      <rect x="405" y="182" width="110" height="50" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="460" y="202" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#e2e8f0">&#x1F7E2; Presence Svc</text>
      <text x="460" y="218" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Online / Last Seen</text>

      <!-- E2E Encryption -->
      <rect x="530" y="182" width="120" height="50" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="590" y="202" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#e2e8f0">&#x1F512; E2E Encrypt</text>
      <text x="590" y="218" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Signal Protocol</text>

      <!-- Notification Service -->
      <rect x="665" y="182" width="120" height="50" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="725" y="202" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#e2e8f0">&#x1F514; Notify Svc</text>
      <text x="725" y="218" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">APNs / FCM Push</text>

      <!-- Kafka Message Queue -->
      <rect x="800" y="182" width="85" height="50" rx="8" fill="#2d2a1a" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="842" y="202" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#e2e8f0">&#x1F4E8; Kafka</text>
      <text x="842" y="218" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Msg Queue</text>

      <!-- Arrows: Services to Data -->
      <line x1="85" y1="232" x2="85" y2="300" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="210" y1="232" x2="210" y2="300" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="335" y1="232" x2="750" y2="300" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="460" y1="232" x2="460" y2="300" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="842" y1="232" x2="600" y2="300" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- DATA LAYER -->
      <!-- Cassandra -->
      <rect x="30" y="300" width="130" height="50" rx="8" fill="#1a2040" stroke="#34d399" stroke-width="1.5"/>
      <text x="95" y="320" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#e2e8f0">&#x1F5C4; Cassandra</text>
      <text x="95" y="336" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Messages (NoSQL)</text>

      <!-- PostgreSQL -->
      <rect x="180" y="300" width="130" height="50" rx="8" fill="#1a2040" stroke="#60a5fa" stroke-width="1.5"/>
      <text x="245" y="320" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#e2e8f0">&#x1F4CA; PostgreSQL</text>
      <text x="245" y="336" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Users / Groups (SQL)</text>

      <!-- Redis -->
      <rect x="330" y="300" width="130" height="50" rx="8" fill="#2d1a1a" stroke="#f87171" stroke-width="1.5"/>
      <text x="395" y="320" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#e2e8f0">&#x26A1; Redis</text>
      <text x="395" y="336" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Presence / Sessions</text>

      <!-- S3 Media -->
      <rect x="480" y="300" width="130" height="50" rx="8" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="545" y="320" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#e2e8f0">&#x2601; S3 / CDN</text>
      <text x="545" y="336" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Media Storage</text>

      <!-- Monitoring -->
      <rect x="630" y="300" width="130" height="50" rx="8" fill="#2d1f1a" stroke="#fb923c" stroke-width="1.5"/>
      <text x="695" y="320" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#e2e8f0">&#x1F4C8; Monitoring</text>
      <text x="695" y="336" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Metrics / Alerting</text>

      <!-- Kafka offset store -->
      <rect x="780" y="300" width="105" height="50" rx="8" fill="#2d2a1a" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="832" y="320" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#e2e8f0">&#x1F4E6; Offsets</text>
      <text x="832" y="336" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Kafka Topics</text>

      <!-- Arrow from API Gateway to Media Svc -->
      <line x1="485" y1="152" x2="335" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Data flow label -->
      <text x="450" y="412" text-anchor="middle" font-family="monospace" font-size="10" fill="#555">WhatsApp — Real-Time Messaging Architecture</text>
    </svg>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">1. Executive Summary</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Problem</div>
        <p>Deliver a message from sender to recipient (1:1 or group) with minimal latency, guarantee eventual delivery even when the recipient is offline, preserve end-to-end confidentiality so not even the server can read content, and do all of this for billions of concurrently-connected devices.</p>
        <div class="ans-label" style="margin-top:12px;">Scale</div>
        <ul>
          <li>2B+ monthly active users, ~100B+ messages sent/day</li>
          <li>500M+ concurrent persistent connections at peak globally</li>
          <li>Groups up to 1,024 members; billions of media shares/day</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Core Challenges</div>
        <ul>
          <li>Maintaining hundreds of millions of long-lived TCP/WebSocket connections cheaply</li>
          <li>Store-and-forward for offline recipients without a permanent message archive</li>
          <li>End-to-end encryption (server must route ciphertext it cannot read)</li>
          <li>Fan-out to large groups without duplicating heavy media N times</li>
          <li>Exactly-once <em>experience</em> on top of an at-least-once delivery network</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Functional Requirements</div>
        <ul>
          <li>Send/receive 1:1 and group text messages</li>
          <li>Media sharing (image, video, voice note, document)</li>
          <li>Delivery &amp; read receipts (sent/delivered/read ticks)</li>
          <li>Presence: online / last-seen / typing indicator</li>
          <li>Push notification wake-up when recipient app is backgrounded/offline</li>
          <li>End-to-end encrypted content, including group messages</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Non-Functional Requirements</div>
        <div class="pattern-table">
          <div class="pt-row pt-header"><div>NFR</div><div>Target</div><div>Why</div><div>Approach</div></div>
          <div class="pt-row"><div class="pt-name">Send-to-deliver latency</div><div>&lt; 200ms same-region, online recipient</div><div>Messaging feels "instant" only under ~250ms</div><div>Persistent connection + in-memory routing table, no DB read on hot path</div></div>
          <div class="pt-row"><div class="pt-name">Concurrent connections/server</div><div>1-2M per connection-server node</div><div>Cost-efficiency at billions of devices</div><div>Erlang/BEAM-style or event-loop (epoll) connection handling</div></div>
          <div class="pt-row"><div class="pt-name">Availability</div><div>99.99%</div><div>Messaging is critical daily-use infra</div><div>Multi-AZ connection servers, queue-backed durability</div></div>
          <div class="pt-row"><div class="pt-name">Delivery guarantee</div><div>At-least-once, deduped client-side</div><div>Never silently lose a message</div><div>Durable per-recipient queue + client message-ID dedup</div></div>
          <div class="pt-row"><div class="pt-name">Confidentiality</div><div>Server cannot read plaintext</div><div>Core trust promise of the product</div><div>Signal Protocol E2E encryption end-to-end</div></div>
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
      <div class="pt-row"><div class="pt-name">DAU</div><div>1.5B daily active users</div><div>given</div><div>1.5B</div></div>
      <div class="pt-row"><div class="pt-name">MAU</div><div>2.2B monthly</div><div>given</div><div>2.2B</div></div>
      <div class="pt-row"><div class="pt-name">Messages/day</div><div>~65 messages/user/day avg</div><div>1.5B × 65</div><div>~100B messages/day</div></div>
      <div class="pt-row"><div class="pt-name">Avg messages/sec</div><div>100B / 86,400s</div><div>100,000,000,000 / 86,400</div><div>~1.16M msg/sec avg</div></div>
      <div class="pt-row"><div class="pt-name">Peak messages/sec</div><div>4x avg (New Year's Eve is the classic 10x+ spike case)</div><div>1.16M × 4</div><div>~4.6M msg/sec peak (10M+ on NYE)</div></div>
      <div class="pt-row"><div class="pt-name">Concurrent connections</div><div>~35% of DAU online at any instant, peak region overlap</div><div>1.5B × 0.35</div><div>~500M concurrent connections</div></div>
      <div class="pt-row"><div class="pt-name">Connection servers needed</div><div>1.5M connections/server (event-loop model)</div><div>500M / 1.5M</div><div>~335 connection-gateway nodes (before redundancy)</div></div>
      <div class="pt-row"><div class="pt-name">Read:Write ratio</div><div>Every message is 1 write + ~1.05 reads (1:1) or 1 write + N reads (group)</div><div>—</div><div>~1:1 for 1:1 chat, 1:N for groups (N = group size)</div></div>
      <div class="pt-row"><div class="pt-name">Storage — text messages</div><div>100 bytes/message, held only until delivered (avg TTL ~hours)</div><div>100B/day × 100B</div><div>~10 TB/day transient queue storage (not permanent archive)</div></div>
      <div class="pt-row"><div class="pt-name">Storage — media shares/day</div><div>~7B media messages/day, avg 1MB (post-compression)</div><div>7B × 1MB</div><div>~7 PB/day uploaded to blob storage</div></div>
      <div class="pt-row"><div class="pt-name">CDN/egress traffic (media)</div><div>each media item fetched by ~1.3 recipients avg</div><div>7PB × 1.3</div><div>~9.1 PB/day CDN egress</div></div>
      <div class="pt-row"><div class="pt-name">Bandwidth (message ingestion)</div><div>4.6M msg/sec × ~500B (payload+headers+encryption overhead)</div><div>—</div><div>~2.3 GB/sec sustained at peak</div></div>
      <div class="pt-row"><div class="pt-name">5-year growth</div><div>8% YoY user growth</div><div>2.2B × 1.08^5</div><div>~3.2B MAU by year 5</div></div>
    </div>
    <div class="tip-box" style="margin-top:10px;">✅ Conclusion: message payloads are tiny (100 bytes) but connection count and message *rate* dominate cost — this is a fan-out/routing problem, not a storage problem. Media is the actual storage/bandwidth cost driver, so it belongs in blob+CDN, never inline in the message pipeline.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">3. APIs</div>
  <div class="ref-body">
    <p>WhatsApp is primarily a <strong>persistent-connection protocol</strong> (historically XMPP-derived, now a custom binary protocol over TCP/TLS, or WebSocket for web clients) — not a request/response REST API for the core chat path. A thin REST layer exists for auth, media upload URLs, and account/business APIs.</p>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Endpoint / Op</div><div>Transport</div><div>Purpose</div><div>Auth</div></div>
      <div class="pt-row"><div class="pt-name">CONNECT (handshake)</div><div>Persistent TCP/TLS or WSS</div><div>Establish long-lived session, register client for push routing</div><div>Client cert / long-lived device token</div></div>
      <div class="pt-row"><div class="pt-name">MESSAGE.SEND</div><div>Binary frame over persistent conn</div><div>Send an encrypted message to recipient(s)</div><div>Session-authenticated</div></div>
      <div class="pt-row"><div class="pt-name">MESSAGE.ACK (delivered/read)</div><div>Binary frame over persistent conn</div><div>Report delivery/read receipt back to sender</div><div>Session-authenticated</div></div>
      <div class="pt-row"><div class="pt-name">PRESENCE.UPDATE</div><div>Binary frame over persistent conn</div><div>Online/typing/last-seen broadcast to relevant chats</div><div>Session-authenticated</div></div>
      <div class="pt-row"><div class="pt-name">/v1/media/upload</div><div>REST (HTTPS POST)</div><div>Upload encrypted media blob, returns a reference/URL</div><div>Bearer token</div></div>
      <div class="pt-row"><div class="pt-name">/v1/account/register</div><div>REST (HTTPS POST)</div><div>Phone-number verification (OTP) &amp; key registration</div><div>OTP challenge</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Connection Handshake Contract</div>
        <div class="code-box">Client -> Gateway: TLS ClientHello
Gateway -> Client: TLS ServerHello (mutual or server-auth TLS)
Client -> Gateway: AUTH { deviceId, authToken, protocolVersion }
Gateway -> AuthService: validate(authToken)
AuthService -> Gateway: OK { userId, sessionId }
Gateway -> Client: AUTH_OK { sessionId, serverTimestamp }
Gateway -> PresenceService: markOnline(userId, gatewayNodeId)
  ... connection now stays open (TCP keepalive / WS ping every 30s) ...
Client -> Gateway: PING (heartbeat, ~every 30-60s)
Gateway -> Client: PONG</div>
      </div>
      <div>
        <div class="ans-label">API Design Standards</div>
        <ul>
          <li><strong>Status/ack codes:</strong> ACK_SENT, ACK_DELIVERED, ACK_READ, ERR_RECIPIENT_UNKNOWN, ERR_RATE_LIMITED, ERR_AUTH_EXPIRED</li>
          <li><strong>Auth:</strong> device-bound long-lived token issued after phone-number OTP verification; re-validated on each reconnect</li>
          <li><strong>Pagination:</strong> cursor-based on chat-history sync (<code>?since=messageId&amp;limit=50</code>) used only for the initial multi-device sync, not steady-state chat</li>
          <li><strong>Rate limiting:</strong> token bucket per account (messages/sec) and per-IP on REST endpoints to block spam/enumeration</li>
          <li><strong>Versioning:</strong> protocol version negotiated at handshake (<code>protocolVersion</code> field) so old/new clients can coexist during rollout</li>
          <li><strong>Idempotency:</strong> every message carries a client-generated message-ID (UUID); duplicate sends/redeliveries are deduped by this ID on the receiving client</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">4. Database Design</div>
  <div class="ref-body">
    <p><strong>Key philosophy:</strong> WhatsApp famously does <em>not</em> keep a permanent server-side message archive. Once a message is delivered to all recipient devices and acknowledged, it is deleted from the delivery queue — the "source of truth" for chat history lives on end-user devices (encrypted local DB / encrypted backup), not centrally. Server-side storage is optimized for short-lived store-and-forward, not long-term retrieval.</p>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Store</div><div>Data</div><div>Why This Store</div><div>Key Design</div></div>
      <div class="pt-row"><div class="pt-name">Message Queue Store (Mnesia/RocksDB-style KV)</div><div>Undelivered messages pending offline recipient</div><div>Extremely high write/delete churn, needs to be fast and disposable, not queryable by content</div><div>Partition key: recipient_id; row TTL/deleted on ACK_DELIVERED to all devices</div></div>
      <div class="pt-row"><div class="pt-name">Cassandra / wide-column store</div><div>Media blob references, group metadata, key-registration records</div><div>Write-heavy, horizontally scalable, no complex joins needed</div><div>Partition key: entity_id (group_id / user_id); clustering by updated_at</div></div>
      <div class="pt-row"><div class="pt-name">PostgreSQL/MySQL (Account DB)</div><div>User accounts, phone-number mapping, device list, privacy settings</div><div>Strong consistency needed for account/auth state</div><div>PK: user_id (derived from phone number hash); Index: (phone_number)</div></div>
      <div class="pt-row"><div class="pt-name">Redis (Presence &amp; Routing Table)</div><div>online/offline state, which gateway node holds a user's live connection</div><div>Sub-ms lookups on the hottest possible key (checked on every send)</div><div>Key: user_id → {gatewayNodeId, lastSeenTs}; short TTL, refreshed on heartbeat</div></div>
      <div class="pt-row"><div class="pt-name">Blob/Object Storage</div><div>Encrypted media (images/video/audio/docs)</div><div>Large binary objects, needs CDN-fronted retrieval, not a DB concern</div><div>Key: mediaId (opaque, encrypted at rest, client holds decryption key)</div></div>
    </div>
    <div class="code-box" style="margin-top:12px;">-- Account table (PostgreSQL) — the one durable relational table
CREATE TABLE accounts (
  user_id        BIGINT PRIMARY KEY,       -- derived from phone number
  phone_number   VARCHAR(20) UNIQUE NOT NULL,
  identity_pubkey BYTEA NOT NULL,          -- Signal Protocol identity key
  registered_at  TIMESTAMP NOT NULL,
  last_seen_at   TIMESTAMP,
  privacy_settings JSONB,
  INDEX idx_accounts_phone (phone_number)
);

-- Pending message queue (conceptual — actually a KV/log store, not SQL)
-- key:   recipient_user_id + message_id
-- value: { senderId, ciphertext, mediaRef, ts, deviceFanoutList }
-- TTL/eviction: deleted immediately once every target device ACKs delivery
-- Partition/shard key: recipient_user_id (co-locates a user's inbox on one shard)</div>
    <div class="warn-box" style="margin-top:10px;">⚠️ Do not model chat history as a permanently-growing "messages" table the way a typical CRUD app would — at 100B messages/day that table would be unbounded and mostly write-then-immediately-delete. Treat the server store as a transient mailbox, and let clients own durable history.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">5. High-Level Architecture</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step blue">Mobile / Web / Desktop Clients</div>
      <div class="flow-arrow">↓ DNS (GeoDNS) + CDN (media, static assets)</div>
      <div class="flow-step">Load Balancer (L4, TLS termination)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Connection / Gateway Servers (millions of persistent WebSocket/TCP sessions)</div>
      <div class="flow-arrow">↓ authenticated frames routed to</div>
      <div class="flow-step green">Message Service</div>
      <div class="flow-step">Presence Service</div>
      <div class="flow-step">Group Service</div>
      <div class="flow-arrow">↓ reads/writes</div>
      <div class="flow-step">Redis (presence/routing) ⇄ Message Queue Store ⇄ Cassandra (metadata) ⇄ Blob Storage (media)</div>
      <div class="flow-arrow">↓ async events</div>
      <div class="flow-step">Kafka (message.sent, message.delivered, presence.changed)</div>
      <div class="flow-arrow">↓ consumed by</div>
      <div class="flow-step">Notification Service (APNs/FCM) · Analytics Pipeline · Monitoring</div>
    </div>
    <p style="margin-top:12px;">Cross-cutting: <strong>Encryption/Key Management</strong> (Signal Protocol key exchange, independent of the routing path — server never sees plaintext), <strong>Media/CDN</strong> (blob storage fronted by CDN for shared images/video), <strong>Monitoring</strong> on every hop.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">6. Detailed Component Design</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Responsibility</div><div>Key Design Point</div><div>Scaling Model</div></div>
      <div class="pt-row"><div class="pt-name">Connection/Session Service</div><div>Holds the persistent WebSocket/TCP connection per device, terminates TLS, heartbeats</div><div>Event-loop (epoll/kqueue) or Erlang/BEAM process-per-connection — millions of lightweight connections per node</div><div>Stateful but horizontally scaled; sticky per-connection, registered in Redis routing table</div></div>
      <div class="pt-row"><div class="pt-name">Message Service</div><div>Store-and-forward: accept, queue, route, and delete-on-ack a message</div><div>If recipient online → route directly via their gateway node; if offline → persist to queue + trigger push</div><div>Stateless, partitioned by recipient_id</div></div>
      <div class="pt-row"><div class="pt-name">Presence Service</div><div>Tracks online/offline/last-seen/typing per user</div><div>Extreme write volume (every connect/disconnect/typing event); privacy rules control who sees what</div><div>Stateless service backed by Redis; broadcasts only to relevant contacts, not globally</div></div>
      <div class="pt-row"><div class="pt-name">Group Service</div><div>Group membership, metadata, and message fan-out logic</div><div>Fans a single group message out to up to 1,024 recipient queues; large groups use batched async fan-out</div><div>Stateless, sharded by group_id</div></div>
      <div class="pt-row"><div class="pt-name">Media Service</div><div>Accepts encrypted media upload, generates reference, orchestrates thumbnailing</div><div>Media itself never transits the messaging pipeline — only a small encrypted reference/key does</div><div>Stateless, scales with upload volume, backed by blob storage + CDN</div></div>
      <div class="pt-row"><div class="pt-name">Notification Service</div><div>Wakes a backgrounded/offline app via push so it reconnects and pulls queued messages</div><div>Push payload contains no message content (E2E) — just a "you have a new message" trigger</div><div>Stateless consumer group fanning out to APNs/FCM</div></div>
      <div class="pt-row"><div class="pt-name">Encryption/Key Management Service</div><div>Signal Protocol key exchange: identity keys, signed pre-keys, one-time pre-keys</div><div>Server stores/distributes public key bundles only; never sees private keys or plaintext</div><div>Stateless, low QPS relative to messaging, strong-consistency key store</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">7. Sequence Diagrams</div>
  <div class="ref-body">
    <div class="ans-label">Happy Path — Message to Offline Recipient (Store-and-Forward + Push Wake-Up)</div>
    <div class="code-box">SenderApp   Gateway-A   MessageSvc   PresenceRedis   QueueStore   NotifSvc   RecipientApp
   |--send(ciphertext,msgId)-->|              |               |            |            |
   |                            |--route()---->|               |            |            |
   |                            |              |--lookup(recipient)-------->|            |
   |                            |              |<--OFFLINE------------------|            |
   |                            |              |--persist(msg)------------------------->|            |
   |                            |              |--publish(push.wake)-------------------->|            |
   |                            |              |                            |--APNs/FCM->|
   |                            |              |                            |            |--wakes, reconnects-->Gateway-B
   |                            |              |<--sync request (since=lastMsgId)--------------------|
   |                            |              |--deliver(queued msgs)---------------------------------------->|
   |                            |              |<--ACK_DELIVERED----------------------------------------------|
   |                            |              |--deleteFromQueue(msgId)--->|            |            |
   |<--ACK_DELIVERED (to sender)|              |               |            |            |</div>

    <div class="ans-label" style="margin-top:14px;">Failure Path — Gateway Node Crashes Mid-Session</div>
    <div class="code-box">RecipientApp   Gateway-A (dies)   PresenceRedis   LB/Gateway-B
    |--(connection held on A)------>|                |             |
    |          [Gateway-A process/node crashes]       |             |
    |--TCP RST / no heartbeat response--------------->|             |
    |--reconnect attempt (client-side backoff)------------------------------->|
    |                                                  |<--registers new session--|
    |<--AUTH_OK (new gatewayNodeId)---------------------------------------------|
    |          Message Service looks up routing table -> now points to Gateway-B
    |          Any message sent to this user during the gap was queued, not lost</div>

    <div class="ans-label" style="margin-top:14px;">Retry — Push Notification Delivery Failure</div>
    <div class="code-box">NotificationService     APNs/FCM
   |--sendPush(deviceToken)-->|
   |<--5xx / timeout----------|
   |--retry(1, backoff 200ms)->|
   |<--5xx--------------------|
   |--retry(2, backoff 800ms)->|
   |<--ack--------------------|
   |  (if 3 retries fail -> mark push as best-effort-failed;
   |   message remains safely queued server-side —
   |   next natural app-open / periodic poll still recovers it)</div>

    <div class="ans-label" style="margin-top:14px;">Timeout — Recipient Never Acknowledges Delivery</div>
    <div class="code-box">MessageService        RecipientApp
   |--deliver(msg, expect ACK within 30s)-->|
   |         (app force-killed by OS, never ACKs)
   |<--no ACK after 30s---------------------|
   |--message stays in queue (NOT deleted, NOT considered lost)
   |--relies on next reconnect to trigger full sync, not a re-push loop
   |--sender UI still shows single-tick "sent" (not double-tick "delivered")</div>
    <div class="tip-box" style="margin-top:10px;">✅ Notice the design never deletes a queued message speculatively — deletion is strictly gated on a positive ACK_DELIVERED. This is what makes at-least-once delivery safe: the worst failure mode is a duplicate, never a silent loss.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">8. Database Scaling</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Sharding Strategy</div>
        <p><strong>Shard key: user_id (recipient-centric).</strong> Every lookup on the hot path ("does this user have pending messages / where is their connection") is keyed by user_id, so co-locating a user's queue and presence entry on one shard makes the common case single-shard. Group fan-out is the exception — it explicitly scatters writes across each member's shard.</p>
        <div class="ans-label" style="margin-top:12px;">Read Replicas</div>
        <p>Account DB (PostgreSQL): primary + regional read replicas for auth/registration lookups, which are read-heavy and latency-sensitive at login/reconnect time.</p>
      </div>
      <div>
        <div class="ans-label">Replication</div>
        <p>Cassandra metadata store: replication factor 3 across AZs/regions — a single AZ loss must not lose group membership or key-registration data.</p>
        <div class="ans-label" style="margin-top:12px;">CQRS / Event Sourcing</div>
        <p>The pending-message queue is naturally an append-then-delete log, not something that benefits from CQRS. Where event sourcing <em>is</em> used: the presence/delivery-event stream (Kafka) is append-only and replayable for analytics (e.g., delivery-latency percentiles) without touching the live hot path.</p>
      </div>
    </div>
    <div class="warn-box" style="margin-top:12px;">⚠️ Resist the urge to add read replicas to the pending-message queue store — it's a write/delete-dominated, short-lived structure; replica lag there would cause "message reappears after being marked delivered" bugs. Scale it by sharding, not by replicas.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">9. Cache Strategy</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Cache</div><div>Pattern</div><div>TTL</div><div>Why</div></div>
      <div class="pt-row"><div class="pt-name">Presence / online status</div><div>Write-through (every connect/disconnect updates cache directly)</div><div>~45-60 sec (tied to heartbeat interval)</div><div>Checked on literally every send — must be fast and reasonably fresh; DB would never keep up</div></div>
      <div class="pt-row"><div class="pt-name">Connection routing table (user→gateway node)</div><div>Write-through</div><div>Until disconnect/re-register</div><div>Wrong entry means messages get routed to a dead gateway — must always reflect reality</div></div>
      <div class="pt-row"><div class="pt-name">Group metadata (members list)</div><div>Cache-aside</div><div>5 min</div><div>Changes infrequently; read on every group send for fan-out list</div></div>
      <div class="pt-row"><div class="pt-name">Public key bundles</div><div>Read-through</div><div>Long (until key rotation)</div><div>Read on new-session key exchange, rarely written</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Hot Key Problem</div>
        <p>A celebrity/business "broadcast list" account or a viral large group becomes a hot key on the presence and group-metadata cache. Mitigated by replicating that specific key across multiple cache nodes (read-replica fan-out for hot keys) rather than a single-node lookup.</p>
      </div>
      <div>
        <div class="ans-label">Cache Stampede / Distributed Lock</div>
        <p>On mass-reconnect events (e.g., after a regional network outage resolves), millions of clients reconnect simultaneously and hammer the presence cache with writes. Mitigated by jittered client reconnect backoff plus write-coalescing on the presence service (batch presence updates per short window instead of one write per event).</p>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">10. Messaging</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Broker</div><div>Used For</div><div>Why This One</div></div>
      <div class="pt-row"><div class="pt-name">Kafka</div><div>Delivery/read-receipt events, presence-change events, analytics feed</div><div>Extreme throughput (millions/sec), replay for reprocessing, per-partition ordering keyed by conversation_id</div></div>
      <div class="pt-row"><div class="pt-name">Internal durable queue (per-recipient mailbox)</div><div>The actual store-and-forward message queue itself</div><div>Needs per-key (per-user) FIFO semantics and cheap delete-on-ack, closer to a KV log than a general pub/sub topic</div></div>
      <div class="pt-row"><div class="pt-name">Push gateway queue (SQS/RabbitMQ-equivalent)</div><div>Fire-and-forget push-notification dispatch jobs</div><div>Simple point-to-point queue fits "wake this device" jobs better than a persistent log</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Delivery Guarantees (WhatsApp's actual model)</div>
        <ul>
          <li><strong>Semantics:</strong> at-least-once delivery. The server will redeliver on any doubt (reconnect, ack timeout, retry) rather than risk silently dropping a message.</li>
          <li><strong>Exactly-once experience:</strong> achieved at the <em>client</em>, not the server — every message carries a client-generated message_id; the receiving client deduplicates by that ID before rendering, so a user never sees a duplicate bubble even though the network-level delivery is at-least-once.</li>
          <li><strong>Ordering:</strong> per-conversation ordering is preserved by keying the delivery queue/partition on conversation_id (or recipient_id for 1:1), guaranteeing message_2 is never rendered before message_1 within the same chat.</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Retry / DLQ / Poison Queue</div>
        <p>Message delivery to a connected client: 3 immediate retries with short backoff (the connection itself signals failure fast). Push-notification dispatch: exponential backoff (200ms → 800ms → 3.2s), then marked best-effort-failed — but the message itself is <em>never</em> dropped, only the wake-up push is. Malformed/corrupt frames (protocol violations) go straight to a poison queue for offline inspection rather than blocking a partition's ordering.</p>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">11. Storage</div>
  <div class="ref-body">
    <ul>
      <li><strong>Blob/Object Storage:</strong> encrypted media (photos, videos, voice notes, documents) stored keyed by opaque mediaId; server stores ciphertext only, decryption key travels inside the E2E-encrypted message itself</li>
      <li><strong>CDN:</strong> fronts media downloads so a viral-group image isn't re-fetched from origin by every one of 1,024 group members</li>
      <li><strong>Media Compression:</strong> images re-encoded to a bandwidth-friendly format/quality on send; voice notes use a low-bitrate codec (e.g., Opus) tuned for speech</li>
      <li><strong>Video Encoding:</strong> transcoded to a small set of standard resolutions/bitrates on upload so playback doesn't require heavy client-side decoding of arbitrary source formats</li>
      <li><strong>Thumbnail Generation:</strong> a low-res encrypted thumbnail is generated and delivered inline with the message metadata so the chat UI can render a preview before the full-res media finishes downloading</li>
      <li><strong>Lifecycle:</strong> media blobs are deleted from server storage after a bounded window post-delivery (commonly ~30 days for undownloaded media) — the server is not meant to be permanent media storage</li>
    </ul>
    <div class="tip-box" style="margin-top:10px;">✅ Because media is encrypted client-side before upload, the server-side storage/CDN layer is "dumb" — it moves opaque bytes and never needs to inspect, transcode-aware-of-content, or index media content itself (transcoding happens client-side or on encrypted-at-rest blobs with keys the server doesn't hold for E2E chats).</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">12. Search</div>
  <div class="ref-body">
    <p>Chat-history search is fundamentally a <strong>client-side, on-device</strong> feature for 1:1/group chat content, because the server does not retain plaintext (E2E encryption) or a permanent message archive to index. Server-side search (Elasticsearch or equivalent) is reserved for domains the server *does* see in the clear: contact/business directory search, WhatsApp Business catalog search, and internal support/abuse-review tooling.</p>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Feature</div><div>Approach</div></div>
      <div class="pt-row"><div class="pt-name">In-chat message search</div><div>Local on-device index (SQLite FTS or similar) over the client's decrypted message store — never leaves the device</div></div>
      <div class="pt-row"><div class="pt-name">Contact / business search</div><div>Server-side Elasticsearch over non-E2E metadata (business name, category, phone directory)</div></div>
      <div class="pt-row"><div class="pt-name">Autocomplete</div><div>Local contact list fuzzy-match on-device; no server round-trip needed for personal chats</div></div>
      <div class="pt-row"><div class="pt-name">Support/abuse tooling</div><div>Elasticsearch over metadata only (sender, recipient, timestamps, report reason) — content stays opaque per E2E guarantees</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">13. Scalability</div>
  <div class="ref-body">
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">H</div><div class="principle-name">Horizontal Scaling</div><p>Every stateless service (Message, Presence, Group, Media) scales out independently; only the Connection/Gateway layer holds per-node state (the live sockets).</p></div>
      <div class="principle-card"><div class="principle-icon">E</div><div class="principle-name">Erlang/BEAM Heritage</div><p>WhatsApp's real early architecture famously handled ~2M+ concurrent TCP connections per physical server on FreeBSD/Erlang — lightweight per-connection processes with cheap context-switching, not one OS thread per connection.</p></div>
      <div class="principle-card"><div class="principle-icon">S</div><div class="principle-name">Stateless App Tier</div><p>Message/Presence/Group services hold no session state themselves — the Connection layer + Redis routing table is the only stateful piece, keeping the rest trivially horizontally scalable.</p></div>
      <div class="principle-card"><div class="principle-icon">A</div><div class="principle-name">Auto-Scaling</div><p>Gateway fleets auto-scale on connection-count and CPU; predictable daily/regional wake-up curves (morning commute spikes per timezone) make this highly tunable.</p></div>
      <div class="principle-card"><div class="principle-icon">B</div><div class="principle-name">Backpressure</div><p>Under extreme load (e.g., NYE), clients get graceful send-throttling signals rather than the server falling over — better a delayed "sent" tick than a dropped connection storm.</p></div>
      <div class="principle-card"><div class="principle-icon">R</div><div class="principle-name">Rate Limiting</div><p>Per-account send-rate caps block spam/abuse; per-IP caps on registration/OTP endpoints prevent account-creation abuse.</p></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">14. Reliability</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Pattern</div><div>Applied To</div><div>Behavior</div></div>
      <div class="pt-row"><div class="pt-name">Circuit Breaker</div><div>Notification Service → APNs/FCM calls</div><div>Opens after repeated push-provider failures; message stays safely queued, push simply skipped until breaker closes</div></div>
      <div class="pt-row"><div class="pt-name">Retry</div><div>Message delivery to connected client; push dispatch</div><div>Bounded retries with backoff; underlying message durability never depends on the retry succeeding</div></div>
      <div class="pt-row"><div class="pt-name">Bulkhead</div><div>Connection-gateway pools per region</div><div>One region's connection storm can't exhaust another region's gateway capacity</div></div>
      <div class="pt-row"><div class="pt-name">Timeout</div><div>ACK_DELIVERED wait window</div><div>30-second timeout before falling back to "queued, awaiting sync" state instead of blocking sender UI</div></div>
      <div class="pt-row"><div class="pt-name">Idempotency</div><div>MESSAGE.SEND handling</div><div>Client-generated message_id dedup prevents duplicate rendering on retried/redelivered sends</div></div>
      <div class="pt-row"><div class="pt-name">Graceful Degradation</div><div>Presence Service down</div><div>Messaging keeps working; clients just stop showing accurate online/last-seen/typing indicators</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">15. Security</div>
  <div class="ref-body">
    <div class="alert tip" style="margin-bottom:12px;"><strong>End-to-End Encryption (Signal Protocol) — the defining feature</strong><p>Every 1:1 and group message is encrypted using the Signal Protocol: X3DH (Extended Triple Diffie-Hellman) for initial key agreement, then the Double Ratchet algorithm so each message uses a fresh derived key (forward secrecy — compromising one message's key doesn't expose past/future messages). For groups, a sender-key scheme lets one sender encrypt once per message while each recipient can independently decrypt, avoiding pairwise-encrypt-N-times overhead. The server only ever sees ciphertext plus the minimal routing metadata (sender, recipient, timestamp) it structurally needs to deliver the envelope — it has no technical ability to read message content.</p></div>
    <ul>
      <li><strong>AuthN:</strong> phone-number OTP verification at registration; device-bound long-lived session token thereafter, re-validated on reconnect</li>
      <li><strong>AuthZ:</strong> RBAC for internal support/ops/admin tooling; strict least-privilege on any system that can touch routing metadata</li>
      <li><strong>Transport Encryption:</strong> TLS 1.2+/1.3 for the connection to the server on top of the E2E layer (defense in depth — TLS protects metadata/connection, Signal protects content)</li>
      <li><strong>Secrets:</strong> Key Vault/Secrets Manager for service credentials, TLS certs, push-provider API keys — never in code/config</li>
      <li><strong>Key Management:</strong> server distributes public pre-key bundles only; private keys never leave the originating device, including during multi-device linking (each linked device gets its own identity)</li>
      <li><strong>OWASP:</strong> strict input validation on registration/OTP flows to prevent SIM-swap-style abuse and enumeration; rate limiting mitigates credential stuffing on account endpoints</li>
      <li><strong>DDoS Protection:</strong> edge WAF/anti-DDoS layer absorbs volumetric attacks before they reach connection-gateway capacity, which is the scarcest resource in this system</li>
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
          <li>Concurrent connection count per gateway node/region</li>
          <li>Message send-to-deliver latency (P50/P95/P99)</li>
          <li>Delivery/read-receipt completion rate</li>
          <li>Push-notification success rate (APNs/FCM)</li>
          <li>Reconnect storm rate after regional network blips</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Stack</div>
        <ul>
          <li><strong>Metrics:</strong> Prometheus + Grafana dashboards per region/gateway fleet</li>
          <li><strong>Tracing:</strong> OpenTelemetry across Gateway → Message Service → Queue → Notification call chain</li>
          <li><strong>Logging:</strong> centralized structured logs — <em>metadata only</em>, never message content</li>
          <li><strong>Alerts:</strong> PagerDuty on delivery-latency P95 breach, connection-drop spikes, DLQ/poison-queue depth</li>
        </ul>
      </div>
    </div>
    <div class="warn-box" style="margin-top:10px;">⚠️ End-to-end encryption is a monitoring constraint, not just a feature: engineers can observe that a message moved through the pipeline and how long it took, but can never inspect its content to debug a "wrong message received" style bug — debugging leans entirely on metadata, message IDs, and client-side logs (with user consent).</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">17. Azure Architecture Equivalent</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Component</div><div>Azure Service</div></div>
      <div class="pt-row"><div class="pt-name">CDN / Edge</div><div>Azure Front Door + Azure CDN</div></div>
      <div class="pt-row"><div class="pt-name">API Gateway (REST slice)</div><div>Azure API Management</div></div>
      <div class="pt-row"><div class="pt-name">Connection/Gateway Servers</div><div>AKS (Kubernetes) with WebSocket-aware ingress, or Azure Web PubSub for managed persistent connections</div></div>
      <div class="pt-row"><div class="pt-name">Presence / Routing Cache</div><div>Azure Cache for Redis</div></div>
      <div class="pt-row"><div class="pt-name">Event Streaming</div><div>Azure Event Hubs (Kafka-compatible endpoint)</div></div>
      <div class="pt-row"><div class="pt-name">Push Dispatch Queue</div><div>Azure Service Bus</div></div>
      <div class="pt-row"><div class="pt-name">Account DB</div><div>Azure Database for PostgreSQL</div></div>
      <div class="pt-row"><div class="pt-name">Metadata / Group Store</div><div>Cosmos DB (Cassandra API)</div></div>
      <div class="pt-row"><div class="pt-name">Media Storage</div><div>Azure Blob Storage</div></div>
      <div class="pt-row"><div class="pt-name">Support/Directory Search</div><div>Azure AI Search</div></div>
      <div class="pt-row"><div class="pt-name">Monitoring</div><div>Application Insights + Azure Monitor</div></div>
      <div class="pt-row"><div class="pt-name">Secrets</div><div>Azure Key Vault</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">18. Kubernetes Deployment</div>
  <div class="ref-body">
    <div class="code-box">Deployment: connection-gateway-service
  replicas: 200 (per region cluster)
  HPA: target active-connections-per-pod 50,000, min 50 / max 500 pods
  readinessProbe: /healthz (checks Redis + auth-service connectivity)
  terminationGracePeriodSeconds: 60   # allow in-flight sessions to drain

ConfigMap: gateway-config
  - HEARTBEAT_INTERVAL_SECONDS=30
  - MAX_CONNECTIONS_PER_POD=60000
  - ACK_TIMEOUT_SECONDS=30

Secret: gateway-secrets
  - TLS_CERT / TLS_KEY
  - REDIS_CONNECTION_STRING
  - KAFKA_SASL_CREDENTIALS

Ingress: gateway-ingress
  - routes wss://chat.example.com/* -> connection-gateway-service
  - session/connection affinity: NOT via cookie (long-lived TCP/WS, not HTTP request-per-call)
    instead uses L4 LB with consistent hashing on client connection so reconnect
    logic — not ingress stickiness — governs which pod a client lands on

Service: connection-gateway-service (LoadBalancer, L4)
  NOTE: rolling updates must drain gracefully — killing a gateway pod instantly
  would drop millions of live sockets simultaneously; use PodDisruptionBudget
  to cap concurrent pod terminations during deploys</div>
    <div class="tip-box" style="margin-top:10px;">✅ Unlike a typical stateless HTTP service, the Connection/Gateway tier holds real per-pod state (live sockets) — HPA scale-down and rolling deploys must be connection-aware (graceful drain + client-side reconnect) or you manufacture a self-inflicted reconnect storm.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">19. Failure Scenarios</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Failure</div><div>Impact</div><div>Recovery</div></div>
      <div class="pt-row"><div class="pt-name">Account/Message DB down</div><div>Can't authenticate new connections or persist queued messages</div><div>Automatic failover to standby replica; gateway buffers auth briefly and retries; existing live connections keep working for online-to-online chat</div></div>
      <div class="pt-row"><div class="pt-name">Redis (presence/routing) down</div><div>Can't tell if a recipient is online or which gateway holds their socket</div><div>Fail-safe to "assume offline" → route via store-and-forward + push instead of direct routing; degrades latency, not correctness</div></div>
      <div class="pt-row"><div class="pt-name">Kafka down</div><div>Delivery-receipt/presence-event analytics stop flowing</div><div>Core message delivery is unaffected (it doesn't depend on Kafka); producers buffer locally with backpressure until recovery</div></div>
      <div class="pt-row"><div class="pt-name">Push provider (APNs/FCM) API failure</div><div>Offline recipients aren't woken up promptly</div><div>Circuit breaker opens; message stays safely queued; delivered on next natural app reconnect/poll</div></div>
      <div class="pt-row"><div class="pt-name">Region-wide outage</div><div>All users whose sessions were pinned to that region drop</div><div>GeoDNS/traffic-manager fails clients over to nearest healthy region; clients reconnect and resync from their last-known message cursor</div></div>
      <div class="pt-row"><div class="pt-name">CDN failure</div><div>Media downloads fail; text messaging still works</div><div>Multi-CDN fallback or direct-from-blob-origin fallback; text path is architecturally independent of media path</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">20. Cost Optimization</div>
  <div class="ref-body">
    <ul>
      <li><strong>Reserved Instances:</strong> baseline connection-gateway and message-service capacity on 1-3yr reservations; burst capacity on-demand for regional peak-hour/holiday spikes</li>
      <li><strong>Auto-scaling:</strong> scale gateway fleets down overnight per-timezone (connection count follows predictable daily curves per region)</li>
      <li><strong>Spot/Low-priority nodes:</strong> analytics batch jobs (delivery-latency reporting, abuse-pattern ML training) run on spot capacity — never the live connection path</li>
      <li><strong>Caching:</strong> presence/routing cache avoids a DB round-trip on literally every message send, which is the single biggest cost lever at this QPS</li>
      <li><strong>Storage tiering:</strong> undelivered media auto-expires (~30 days) rather than living forever in hot blob storage; delivered messages are deleted from server queues immediately, not archived</li>
      <li><strong>Compression:</strong> binary protocol (not JSON/text) over the persistent connection, plus media compression before upload — both directly cut per-message and per-media bandwidth cost at billions-of-events/day scale</li>
    </ul>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">21. Trade-offs</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Decision</div><div>Chosen</div><div>Rejected Alternative &amp; Why</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Connection protocol</div><div>Persistent TCP/WebSocket with custom binary protocol</div><div>Pure REST polling — would multiply request volume by orders of magnitude and add seconds of latency; unacceptable for "instant" messaging</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Server-side message retention</div><div>Transient store-and-forward, deleted on delivery ack</div><div>Permanent server archive — massive unbounded storage cost and a privacy liability incompatible with the E2E-encryption trust promise</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Delivery semantics</div><div>At-least-once + client-side dedup by message_id</div><div>Server-enforced exactly-once — would require distributed transactions across queue+ack at a throughput that makes it prohibitively expensive; client dedup gets the same user-visible guarantee far more cheaply</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Encryption model</div><div>End-to-end (Signal Protocol), server sees ciphertext only</div><div>Server-side (TLS-only) encryption — simpler to build/debug/search, but breaks the core privacy guarantee and creates a central honeypot of plaintext messages</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Sharding key</div><div>recipient/user_id</div><div>conversation_id — would work for 1:1 but complicates group fan-out consistency and doesn't match the "does user X have pending mail" hot-path query</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Chat history search</div><div>On-device/client-side index</div><div>Server-side full-text index — impossible without breaking E2E encryption; server structurally cannot index content it can't read</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">22. Interview Questions (30)</div>
  <div class="ref-body">
    <ol>
      <li>How would you design the connection layer to hold 500M concurrent persistent connections cost-effectively?</li>
      <li>Why is a persistent connection preferred over REST polling for this use case?</li>
      <li>Walk through what happens end-to-end when a message is sent to an offline recipient.</li>
      <li>How does the Signal Protocol's Double Ratchet provide forward secrecy, and why does that matter here?</li>
      <li>How do you fan out a message to a 1,024-member group efficiently without N pairwise encryptions?</li>
      <li>Design the presence/last-seen system — why is it a caching problem, not a database problem?</li>
      <li>How do you guarantee per-conversation message ordering across a distributed system?</li>
      <li>What happens if the gateway node holding a user's live connection crashes mid-message?</li>
      <li>Why does WhatsApp avoid keeping a permanent server-side message archive, and what does that cost/save?</li>
      <li>Explain at-least-once delivery with client-side dedup — why not just do exactly-once server-side?</li>
      <li>How would you design push-notification wake-up without leaking message content to the push provider?</li>
      <li>How do you handle a reconnect storm after a regional network outage resolves?</li>
      <li>Design the multi-device sync flow (same account, phone + web + desktop) under E2E encryption.</li>
      <li>How would you choose a sharding key for the pending-message queue, and why recipient_id?</li>
      <li>What's your approach to rate-limiting message sends without harming legitimate high-volume senders (e.g., businesses)?</li>
      <li>How do you scale read/delivery receipts (single/double/blue tick) without adding significant latency?</li>
      <li>Design the key-exchange (X3DH) flow for starting a new encrypted conversation.</li>
      <li>How would you detect and mitigate spam/abuse without reading message content?</li>
      <li>What monitoring signals would page you at 3 AM for this system, given you can't see message content?</li>
      <li>How do you handle a full region outage affecting hundreds of millions of active connections?</li>
      <li>Explain the trade-off between strong and eventual consistency for the presence system.</li>
      <li>Design graceful draining of a connection-gateway pod during a rolling deployment.</li>
      <li>How would you support ephemeral/disappearing messages within this architecture?</li>
      <li>What's the failure mode if the presence/routing cache (Redis) goes completely down?</li>
      <li>How do you prevent a viral group or broadcast list from becoming a cache/DB hot key?</li>
      <li>Compare Kafka vs a dedicated per-user mailbox store for the core delivery pipeline.</li>
      <li>How would you migrate the connection protocol to a new version with zero downtime across billions of clients?</li>
      <li>Design a circuit breaker policy for the push-notification provider integration.</li>
      <li>How would this design change for a market with poor/intermittent mobile connectivity?</li>
      <li>What would you change to support voice/video calling on top of this messaging backbone?</li>
    </ol>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">23. Follow-up Questions</div>
  <div class="ref-body">
    <ul>
      <li>"You said the server never sees plaintext — then how do you detect spam or CSAM content?" (discuss metadata-based signals, user reports, on-device hashing debates)</li>
      <li>"What happens if a user has 5 linked devices — who gets the message, and in what order?"</li>
      <li>"Your presence cache uses a ~45s TTL — what's the user-visible effect of that staleness window?"</li>
      <li>"How would your design change if group size limits went from 1,024 to 1,000,000 (channel-style broadcast)?"</li>
      <li>"If Redis routing table and actual gateway state disagree, which do you trust, and how do you reconcile?"</li>
    </ul>
    <div class="tip-box" style="margin-top:10px;">✅ Interviewers push on your first answer's weak point — for a messaging system, that weak point is almost always "what happens during the reconnect/failover window," so pre-empt it before they ask.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">24. Real World Technologies</div>
  <div class="ref-body">
    <p><strong>WhatsApp</strong> famously ran its early connection-handling backend on <strong>Erlang/OTP over FreeBSD</strong>, reportedly holding 2M+ concurrent TCP connections on a single server — a big part of why a tiny engineering team (~50 engineers) supported hundreds of millions of users before the Facebook/Meta acquisition. Message encryption uses the <strong>Signal Protocol</strong>, originally built by Open Whisper Systems (Moxie Marlinspike) for the Signal messenger and licensed into WhatsApp. Comparable persistent-connection messaging architectures appear in <strong>Facebook Messenger</strong>, <strong>Signal</strong>, <strong>Telegram</strong> (MTProto instead of Signal Protocol), and <strong>Slack</strong>/<strong>Discord</strong> (real-time gateway + event fan-out, though generally without full E2E encryption by default).</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">25. Design Evolution by Scale</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Scale</div><div>Architecture</div></div>
      <div class="pt-row"><div class="pt-name">1K users</div><div>Single server handling both connections and message routing; simple SQL table for pending messages; polling acceptable</div></div>
      <div class="pt-row"><div class="pt-name">100K users</div><div>Dedicated connection-handling process model introduced (event loop/Erlang-style); Redis added for presence; single-region deployment</div></div>
      <div class="pt-row"><div class="pt-name">1M users</div><div>Connection layer split from Message/Presence/Group services; Kafka introduced for delivery events; queue store moves off relational SQL to a KV/log design</div></div>
      <div class="pt-row"><div class="pt-name">10M users</div><div>Multi-region gateway fleets; consistent-hash routing table for connection lookup; group fan-out optimized with sender-key encryption scheme</div></div>
      <div class="pt-row"><div class="pt-name">100M users</div><div>Regional data residency and isolation; push-notification pipeline hardened with per-provider circuit breakers; media pipeline fully separated onto blob+CDN</div></div>
      <div class="pt-row"><div class="pt-name">1B+ users</div><div>Erlang/BEAM-class connection density per node to keep gateway fleet size sane; global GeoDNS routing; regional blast-radius isolation so one region's incident can't cascade globally</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">26. Final Architecture Diagram</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step blue">Mobile App</div>
      <div class="flow-step blue">Web Client</div>
      <div class="flow-step blue">Desktop App</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">GeoDNS (routes to nearest healthy region) + CDN (media, static assets)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">WAF / DDoS Protection → L4 Load Balancer (TLS termination)</div>
      <div class="flow-arrow">↓ millions of persistent sessions</div>
      <div class="flow-step">Connection / Gateway Servers (sticky per-connection, registered in routing table)</div>
      <div class="flow-arrow">↓ fan-out to stateless services</div>
      <div class="flow-step green">Message Svc</div>
      <div class="flow-step green">Presence Svc</div>
      <div class="flow-step green">Group Svc</div>
      <div class="flow-step green">Media Svc</div>
      <div class="flow-step green">Key Mgmt Svc</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Redis (presence/routing) · Message Queue Store (per-recipient mailbox) · Cassandra (metadata) · Account DB (PostgreSQL) · Blob Storage (encrypted media)</div>
      <div class="flow-arrow">↓ async</div>
      <div class="flow-step">Kafka event backbone → Notification Svc (APNs/FCM) · Analytics Pipeline · Abuse/Support Search (Elasticsearch, metadata-only)</div>
      <div class="flow-arrow">↓ observability on every hop</div>
      <div class="flow-step red">Prometheus/Grafana · OpenTelemetry Tracing · Centralized Metadata-Only Logging · Key Vault (secrets)</div>
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
          <li>This is fundamentally a connection-management and routing problem, not a storage problem — message payloads are tiny, but there are billions of them and hundreds of millions of live sockets</li>
          <li>Store-and-forward with delete-on-ack keeps the server stateless-ish and cheap; durable history belongs on client devices</li>
          <li>End-to-end encryption is a first-class architectural constraint that shapes storage, search, and monitoring — not a bolt-on feature</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Pros of This Design</div>
        <ul><li>Minimal server-side storage cost and liability (no permanent plaintext archive)</li><li>Strong privacy guarantee that is structurally enforced, not just policy-enforced</li><li>Persistent connections give near-instant delivery for the common online-to-online case</li></ul>
      </div>
      <div>
        <div class="ans-label">Cons / Open Risks</div>
        <ul><li>E2E encryption makes server-side debugging, spam detection, and content moderation fundamentally harder</li><li>Stateful connection-gateway tier is operationally trickier than a pure stateless service (deploys, failover, draining)</li></ul>
        <div class="ans-label" style="margin-top:12px;">Best Practices</div>
        <ul><li>Never delete a queued message speculatively — gate deletion strictly on a positive delivery acknowledgment</li><li>Treat presence/routing lookups as the hottest path in the system and design caching around that reality first</li></ul>
      </div>
    </div>
  </div>
</div>
`;
