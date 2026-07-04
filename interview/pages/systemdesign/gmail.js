window.Pages['sd-gmail'] = `
<div class="page-header">
  <div class="breadcrumb">System Design &rsaquo; Gmail Email System</div>
  <h1>Gmail Email System</h1>
  <div class="tag-grid">
    <span class="tag">Email</span>
    <span class="tag">Google Scale</span>
    <span class="tag">Distributed Storage</span>
    <span class="tag">Real-time Sync</span>
    <span class="tag">ML Spam Filter</span>
    <span class="tag">Search</span>
    <span class="tag">Colossus</span>
    <span class="tag">Pub/Sub</span>
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
      <text x="12" y="70" font-size="11" fill="#888" font-family="monospace">CLIENT</text>
      <text x="12" y="160" font-size="11" fill="#888" font-family="monospace">GATEWAY</text>
      <text x="12" y="265" font-size="11" fill="#888" font-family="monospace">SERVICES</text>
      <text x="12" y="385" font-size="11" fill="#888" font-family="monospace">DATA</text>

      <!-- CLIENT LAYER -->
      <!-- Browser -->
      <rect x="80" y="30" width="100" height="52" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="130" y="52" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#e2e8f0">🌐 Browser</text>
      <text x="130" y="65" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Web Client</text>
      <!-- Mobile -->
      <rect x="220" y="30" width="100" height="52" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="270" y="52" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#e2e8f0">📱 Mobile</text>
      <text x="270" y="65" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">iOS / Android</text>
      <!-- IMAP/SMTP Client -->
      <rect x="360" y="30" width="110" height="52" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="415" y="52" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#e2e8f0">📧 IMAP/POP</text>
      <text x="415" y="65" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">3rd-party clients</text>
      <!-- CDN -->
      <rect x="600" y="30" width="100" height="52" rx="8" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="650" y="52" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#e2e8f0">🌍 CDN</text>
      <text x="650" y="65" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Static assets</text>

      <!-- GATEWAY LAYER -->
      <!-- API Gateway -->
      <rect x="130" y="120" width="130" height="52" rx="8" fill="#1a2d20" stroke="#4ade80" stroke-width="1.5"/>
      <text x="195" y="142" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#e2e8f0">🔀 API Gateway</text>
      <text x="195" y="155" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Auth / Rate limit</text>
      <!-- SMTP Gateway -->
      <rect x="310" y="120" width="130" height="52" rx="8" fill="#1a2d20" stroke="#4ade80" stroke-width="1.5"/>
      <text x="375" y="142" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#e2e8f0">📨 SMTP GW</text>
      <text x="375" y="155" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Inbound / Outbound</text>

      <!-- SERVICES LAYER -->
      <!-- Compose Service -->
      <rect x="60" y="220" width="100" height="52" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="110" y="242" text-anchor="middle" font-family="monospace" font-size="10" font-weight="bold" fill="#e2e8f0">✏️ Compose</text>
      <text x="110" y="255" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Draft / Send</text>
      <!-- Inbox/Label Service -->
      <rect x="175" y="220" width="100" height="52" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="225" y="242" text-anchor="middle" font-family="monospace" font-size="10" font-weight="bold" fill="#e2e8f0">📥 Inbox</text>
      <text x="225" y="255" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Labels / Folders</text>
      <!-- Thread Service -->
      <rect x="290" y="220" width="100" height="52" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="340" y="242" text-anchor="middle" font-family="monospace" font-size="10" font-weight="bold" fill="#e2e8f0">🧵 Thread</text>
      <text x="340" y="255" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Conversation</text>
      <!-- Search Service -->
      <rect x="405" y="220" width="100" height="52" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="455" y="242" text-anchor="middle" font-family="monospace" font-size="10" font-weight="bold" fill="#e2e8f0">🔍 Search</text>
      <text x="455" y="255" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Colossus idx</text>
      <!-- Spam Filter -->
      <rect x="520" y="220" width="100" height="52" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="570" y="242" text-anchor="middle" font-family="monospace" font-size="10" font-weight="bold" fill="#e2e8f0">🛡️ Spam ML</text>
      <text x="570" y="255" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Phishing / DKIM</text>
      <!-- Attachment Service -->
      <rect x="635" y="220" width="105" height="52" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="687" y="242" text-anchor="middle" font-family="monospace" font-size="10" font-weight="bold" fill="#e2e8f0">📎 Attach</text>
      <text x="687" y="255" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">GCS / Virus scan</text>
      <!-- Sync Service -->
      <rect x="755" y="220" width="100" height="52" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="805" y="242" text-anchor="middle" font-family="monospace" font-size="10" font-weight="bold" fill="#e2e8f0">🔄 Sync</text>
      <text x="805" y="255" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">IMAP / Push</text>

      <!-- Pub/Sub bus line -->
      <rect x="60" y="293" width="795" height="18" rx="4" fill="#2d2a1a" stroke="#fbbf24" stroke-width="1.2"/>
      <text x="457" y="306" text-anchor="middle" font-family="monospace" font-size="10" font-weight="bold" fill="#fbbf24">Google Pub/Sub (event bus)</text>

      <!-- DATA LAYER -->
      <!-- Colossus -->
      <rect x="60" y="350" width="105" height="52" rx="8" fill="#1a2040" stroke="#60a5fa" stroke-width="1.5"/>
      <text x="112" y="372" text-anchor="middle" font-family="monospace" font-size="10" font-weight="bold" fill="#e2e8f0">🗄️ Colossus</text>
      <text x="112" y="385" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Email bodies</text>
      <!-- Spanner -->
      <rect x="185" y="350" width="105" height="52" rx="8" fill="#1a2040" stroke="#60a5fa" stroke-width="1.5"/>
      <text x="237" y="372" text-anchor="middle" font-family="monospace" font-size="10" font-weight="bold" fill="#e2e8f0">🌐 Spanner</text>
      <text x="237" y="385" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Metadata/Labels</text>
      <!-- Bigtable -->
      <rect x="310" y="350" width="105" height="52" rx="8" fill="#1a2040" stroke="#34d399" stroke-width="1.5"/>
      <text x="362" y="372" text-anchor="middle" font-family="monospace" font-size="10" font-weight="bold" fill="#e2e8f0">📊 Bigtable</text>
      <text x="362" y="385" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Search index</text>
      <!-- Redis -->
      <rect x="435" y="350" width="105" height="52" rx="8" fill="#2d1a1a" stroke="#f87171" stroke-width="1.5"/>
      <text x="487" y="372" text-anchor="middle" font-family="monospace" font-size="10" font-weight="bold" fill="#e2e8f0">⚡ Redis</text>
      <text x="487" y="385" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Unread / Session</text>
      <!-- GCS -->
      <rect x="560" y="350" width="105" height="52" rx="8" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="612" y="372" text-anchor="middle" font-family="monospace" font-size="10" font-weight="bold" fill="#e2e8f0">☁️ GCS</text>
      <text x="612" y="385" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Attachments</text>
      <!-- ML Pipeline -->
      <rect x="685" y="350" width="110" height="52" rx="8" fill="#2d1f1a" stroke="#fb923c" stroke-width="1.5"/>
      <text x="740" y="372" text-anchor="middle" font-family="monospace" font-size="10" font-weight="bold" fill="#e2e8f0">🤖 ML Pipeline</text>
      <text x="740" y="385" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">Spam/Phishing</text>

      <!-- ARROWS: Client to Gateway -->
      <line x1="130" y1="82" x2="175" y2="120" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="270" y1="82" x2="220" y2="120" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="415" y1="82" x2="375" y2="120" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- ARROWS: Gateway to Services -->
      <line x1="195" y1="172" x2="145" y2="220" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="195" y1="172" x2="225" y2="220" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="195" y1="172" x2="340" y2="220" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="375" y1="172" x2="455" y2="220" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="375" y1="172" x2="570" y2="220" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="375" y1="172" x2="687" y2="220" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="375" y1="172" x2="805" y2="220" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- ARROWS: Services to Pub/Sub -->
      <line x1="110" y1="272" x2="200" y2="293" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="340" y1="272" x2="380" y2="293" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="570" y1="272" x2="530" y2="293" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="805" y1="272" x2="720" y2="293" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- ARROWS: Pub/Sub to Data -->
      <line x1="200" y1="311" x2="112" y2="350" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="310" y1="311" x2="237" y2="350" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="420" y1="311" x2="362" y2="350" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="500" y1="311" x2="487" y2="350" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="600" y1="311" x2="612" y2="350" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="700" y1="311" x2="740" y2="350" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
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
        <p>Gmail is a globally distributed, cloud-native email service handling billions of users, trillions of messages, and petabytes of storage. It must deliver email reliably in real-time with instant search, intelligent spam filtering, seamless multi-device synchronisation, and 99.99% availability — all while operating across Google's global infrastructure.</p>
        <strong>Scale Numbers (2024)</strong>
        <ul>
          <li>~1.8 billion active Gmail users worldwide</li>
          <li>~300 billion emails sent/received per day globally (all providers)</li>
          <li>Gmail processes ~35% of all email traffic</li>
          <li>~15 GB free storage per user; total exabyte-scale storage</li>
          <li>Peak inbound: ~1.2 million messages/sec</li>
          <li>Search index: trillions of tokens per user across all messages</li>
          <li>99.9% spam/phishing detection accuracy via ML</li>
          <li>Message delivery SLA: &lt;500ms p99 within Google infra</li>
        </ul>
      </div>
      <div>
        <strong>Core Challenges</strong>
        <ul>
          <li>Storing and indexing trillions of messages efficiently</li>
          <li>Real-time full-text search across years of email history</li>
          <li>Spam/phishing filtering with ML at millisecond latency</li>
          <li>Multi-device synchronisation with eventual consistency</li>
          <li>Handling variable-size attachments (up to 25 MB)</li>
          <li>Supporting legacy IMAP/POP3 alongside modern REST APIs</li>
          <li>Zero data loss with geo-redundant storage</li>
        </ul>
        <strong>Functional Requirements</strong>
        <ul>
          <li>Send, receive, and store email with attachments</li>
          <li>Threaded conversations and label-based organisation</li>
          <li>Full-text search across all messages and attachments</li>
          <li>Spam, phishing, and malware filtering</li>
          <li>Push notifications for new messages</li>
          <li>Draft auto-save and smart compose (AI)</li>
          <li>IMAP/SMTP/POP3 protocol support</li>
          <li>Calendar, Meet, and Drive integration</li>
        </ul>
        <strong>Non-Functional Requirements</strong>
        <table class="pattern-table">
          <tr class="pt-header"><th>NFR</th><th>Target</th></tr>
          <tr class="pt-row"><td class="pt-name">Availability</td><td>99.99% (52 min downtime/yr)</td></tr>
          <tr class="pt-row"><td class="pt-name">Durability</td>99.999999999% (11 nines) via Colossus</tr>
          <tr class="pt-row"><td class="pt-name">Send Latency</td><td>&lt;500ms p99 intra-Google</td></tr>
          <tr class="pt-row"><td class="pt-name">Search Latency</td><td>&lt;200ms p95 for full-text search</td></tr>
          <tr class="pt-row"><td class="pt-name">Spam Detection</td><td>&lt;10ms classification latency</td></tr>
          <tr class="pt-row"><td class="pt-name">Sync Latency</td><td>&lt;2s cross-device push notification</td></tr>
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
      <tr class="pt-header"><th>Metric</th><th>Assumption</th><th>Calculation</th><th>Result</th></tr>
      <tr class="pt-row"><td class="pt-name">DAU</td><td>1.8B users, 50% daily active</td><td>1.8B * 0.5</td><td>900M DAU</td></tr>
      <tr class="pt-row"><td class="pt-name">Emails sent/day</td><td>Each DAU sends 5 emails/day</td><td>900M * 5</td><td>4.5B emails/day</td></tr>
      <tr class="pt-row"><td class="pt-name">Emails received/day</td><td>Including external inbound (3x)</td><td>4.5B * 3</td><td>~13.5B emails/day</td></tr>
      <tr class="pt-row"><td class="pt-name">Emails/sec (peak)</td><td>3x average peak factor</td><td>(13.5B / 86400) * 3</td><td>~469K emails/sec</td></tr>
      <tr class="pt-row"><td class="pt-name">Avg email size</td><td>Text + inline images, no attachment</td><td>50KB average</td><td>50 KB</td></tr>
      <tr class="pt-row"><td class="pt-name">Storage/day (email bodies)</td><td>13.5B emails * 50KB</td><td>13.5B * 50KB</td><td>~675 TB/day</td></tr>
      <tr class="pt-row"><td class="pt-name">Attachment storage/day</td><td>10% emails have 1MB avg attachment</td><td>1.35B * 1MB</td><td>~1.35 PB/day</td></tr>
      <tr class="pt-row"><td class="pt-name">Total new storage/day</td><td>Email bodies + attachments</td><td>675TB + 1350TB</td><td>~2 PB/day</td></tr>
      <tr class="pt-row"><td class="pt-name">Search index size</td><td>~5 tokens/word, 200 words/email</td><td>13.5B * 200 * 5 * 8B</td><td>~108 TB/day index</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis unread counters</td><td>1.8B users * 16 bytes</td><td>1.8B * 16B</td><td>~29 GB RAM</td></tr>
      <tr class="pt-row"><td class="pt-name">Spanner metadata rows</td><td>13.5B emails/day * 365</td><td>~5T rows/yr</td><td>~50 TB metadata/yr</td></tr>
      <tr class="pt-row"><td class="pt-name">Spam filter throughput</td><td>~99% of inbound screened</td><td>469K * 0.99</td><td>~464K classifications/sec</td></tr>
      <tr class="pt-row"><td class="pt-name">CDN bandwidth</td><td>JS/CSS assets, ~500KB per session, 100M sessions/day</td><td>100M * 500KB / 86400</td><td>~578 GB/s peak</td></tr>
    </table>
    <div class="tip-box">
      <strong>Key insight:</strong> Attachment storage dominates — 2x email body storage. GCS tiered storage (Standard → Nearline → Coldline) is critical for cost. Colossus replication factor of 3x means actual raw storage is ~6 PB/day total write.
    </div>
  </div>
</div>

<!-- SECTION 3: APIs -->
<div class="ref-section">
  <div class="ref-title">3. API Design</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><th>Method</th><th>Endpoint</th><th>Description</th><th>Auth</th></tr>
      <tr class="pt-row"><td class="pt-name">POST</td><td>/gmail/v1/users/{userId}/messages/send</td><td>Send a new email</td><td>OAuth2</td></tr>
      <tr class="pt-row"><td class="pt-name">GET</td><td>/gmail/v1/users/{userId}/messages</td><td>List messages with filters/labels</td><td>OAuth2</td></tr>
      <tr class="pt-row"><td class="pt-name">GET</td><td>/gmail/v1/users/{userId}/messages/{id}</td><td>Get full message (RFC 2822 MIME)</td><td>OAuth2</td></tr>
      <tr class="pt-row"><td class="pt-name">POST</td><td>/gmail/v1/users/{userId}/drafts</td><td>Create/update a draft</td><td>OAuth2</td></tr>
      <tr class="pt-row"><td class="pt-name">DELETE</td><td>/gmail/v1/users/{userId}/messages/{id}</td><td>Trash or permanently delete</td><td>OAuth2</td></tr>
      <tr class="pt-row"><td class="pt-name">POST</td><td>/gmail/v1/users/{userId}/messages/modify</td><td>Add/remove labels (read, star, archive)</td><td>OAuth2</td></tr>
      <tr class="pt-row"><td class="pt-name">GET</td><td>/gmail/v1/users/{userId}/threads/{id}</td><td>Fetch full conversation thread</td><td>OAuth2</td></tr>
      <tr class="pt-row"><td class="pt-name">GET</td><td>/gmail/v1/users/{userId}/messages?q=</td><td>Full-text search with Gmail query syntax</td><td>OAuth2</td></tr>
      <tr class="pt-row"><td class="pt-name">GET</td><td>/gmail/v1/users/{userId}/labels</td><td>List all user-defined and system labels</td><td>OAuth2</td></tr>
      <tr class="pt-row"><td class="pt-name">POST</td><td>/gmail/v1/users/{userId}/watch</td><td>Register push notification webhook</td><td>OAuth2</td></tr>
      <tr class="pt-row"><td class="pt-name">POST</td><td>/upload/gmail/v1/users/{userId}/messages/send</td><td>Send with attachment (multipart upload)</td><td>OAuth2</td></tr>
    </table>
    <div class="two-col">
      <div>
        <strong>Send Email — Request Example</strong>
        <div class="code-box">POST /gmail/v1/users/me/messages/send
Authorization: Bearer {oauth2_token}
Content-Type: application/json

{
  "raw": "base64url_encoded_RFC2822_message"
}

// RFC 2822 decoded:
From: sender@gmail.com
To: recipient@example.com
Subject: Meeting Notes
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary="boundary"

--boundary
Content-Type: text/html; charset=UTF-8
&lt;h1&gt;Notes from today&lt;/h1&gt;...
--boundary--</div>
      </div>
      <div>
        <strong>Response + Design Standards</strong>
        <div class="code-box">HTTP/1.1 200 OK
{
  "id": "18c3f9a3b1e4d2c7",
  "threadId": "18c3f9a3b1e4d2c7",
  "labelIds": ["SENT"],
  "snippet": "Notes from today...",
  "historyId": "1234567",
  "internalDate": "1700000000000"
}

// Design Standards:
// - OAuth 2.0 scopes: gmail.send, gmail.readonly, gmail.modify
// - Pagination: pageToken cursor-based (not offset)
// - Idempotency: X-Goog-Request-Reason header
// - Rate limits: 250 quota units/user/sec
// - Partial responses: ?fields=id,snippet
// - Batch: POST /batch/gmail/v1 (up to 100 reqs)</div>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 4: High-Level Architecture -->
<div class="ref-section">
  <div class="ref-title">4. High-Level Architecture</div>
  <div class="ref-body">
    <div class="code-box">
Browser/Mobile/IMAP Client
         |
    [Google Frontend (GFE)] — TLS termination, DDoS protection, anycast routing
         |
    [API Gateway] ————————— [SMTP Gateway (MX records)]
         |                           |
    [Auth Service]           [Spam Pre-filter (MTA)]
         |                           |
  ┌──────────────────────────────────────────────────┐
  │               Core Microservices                  │
  │  Compose │ Inbox │ Thread │ Search │ Spam │ Attach │
  └──────────────────────────────────────────────────┘
         |
    [Google Pub/Sub] — Event bus for async processing
         |
  ┌────────────────────────────────────────────────────────────────┐
  │                       Data Layer                                │
  │  Colossus(bodies) │ Spanner(metadata) │ Bigtable(index/search) │
  │  Redis(cache)     │ GCS(attachments)  │ ML Pipeline(spam)      │
  └────────────────────────────────────────────────────────────────┘</div>
    <div class="two-col">
      <div>
        <strong>Inbound Email Path</strong>
        <ul>
          <li><strong>MX DNS</strong> routes sender to Google's SMTP gateway (aspmx.l.google.com)</li>
          <li><strong>MTA Pre-filter</strong>: SPF/DKIM/DMARC validation, connection-level blocking of known bad IPs</li>
          <li><strong>Spam Filter Service</strong>: ML inference &lt;10ms, assigns spam probability score</li>
          <li><strong>Inbox Service</strong>: determines labels (Primary, Promotions, Social) via categorisation ML</li>
          <li><strong>Storage Writer</strong>: writes MIME body to Colossus, metadata to Spanner, triggers index job</li>
          <li><strong>Pub/Sub event</strong>: new-message event triggers push notification to all user devices</li>
        </ul>
      </div>
      <div>
        <strong>Outbound Email Path</strong>
        <ul>
          <li><strong>Compose Service</strong>: accepts draft, validates recipients, checks sending quota</li>
          <li><strong>DKIM Signer</strong>: signs message with google.com DKIM key before delivery</li>
          <li><strong>Delivery Service</strong>: MX lookup for recipient domain, SMTP delivery with retry queue</li>
          <li><strong>Sent Label</strong>: Spanner updated with SENT label, thread updated</li>
          <li><strong>Smart Compose</strong>: separate ML inference service (Transformer model) for suggestions</li>
          <li><strong>Attachment scan</strong>: virus/malware scan before DKIM signing and sending</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 5: Core Service — Storage & Indexing (Colossus + Bigtable) -->
<div class="ref-section">
  <div class="ref-title">5. Core Service: Email Storage &amp; Indexing (Colossus + Bigtable)</div>
  <div class="ref-body">
    <p>Email storage is the most critical and challenging component of Gmail. Every message must be durably stored, instantly retrievable, and fully searchable across a 15+ year history per user.</p>
    <div class="two-col">
      <div>
        <strong>Colossus (GFS successor) — Body Storage</strong>
        <ul>
          <li>Distributed file system with automatic 3-way replication across data centres</li>
          <li>Each email stored as an immutable MIME blob, addressed by a content hash (CAS)</li>
          <li>Deduplication: identical attachments (same SHA-256 hash) stored once — enormous savings since many emails share the same newsletter attachment</li>
          <li>Erasure coding (6+3 Reed-Solomon) for cold/large attachments — reduces 3x replication overhead to 1.5x</li>
          <li>Chunked storage: large MIME bodies split into 64MB Colossus chunks</li>
          <li>Row key: user_id + message_id ensures data locality for per-user reads</li>
        </ul>
        <strong>Write Path</strong>
        <div class="code-box">1. Receive MIME message from MTA/API
2. Parse MIME tree — separate body parts + attachments
3. Compute SHA-256 of each part for dedup check
4. Write unique parts to Colossus → get chunk IDs
5. Upload attachments to GCS (separate bucket per user)
6. Write metadata row to Spanner (message_id, labels, size, chunk_ids)
7. Enqueue index job to Bigtable indexer via Pub/Sub
8. Return message_id to caller</div>
      </div>
      <div>
        <strong>Bigtable — Search Index</strong>
        <ul>
          <li>Wide-column store optimised for high-throughput writes and point/range reads</li>
          <li>Row key: <code>user_id#term</code> — enables all postings for a user+term in one row scan</li>
          <li>Each cell: column qualifier = message_id, value = TF-IDF score + position offsets</li>
          <li>Separate column family for subject, body, sender, and attachment-text tokens</li>
          <li>Bi-directional index: both forward (msg → terms) and inverted (term → msgs)</li>
          <li>Index built asynchronously — search shows new mail within ~2 seconds of receipt</li>
        </ul>
        <strong>Search Query Execution</strong>
        <div class="code-box">Query: "from:boss@example.com project deadline"

1. Parse query → tokens + field constraints
2. Bigtable scan: user_id#from:boss@example.com
3. Bigtable scan: user_id#project
4. Bigtable scan: user_id#deadline
5. Intersect posting lists → candidate message_ids
6. Rank by Spanner metadata (recency, label, read status)
7. Fetch snippets from Colossus for top-20 results
8. Return paginated results with highlighted snippets</div>
      </div>
    </div>
    <div class="tip-box">
      <strong>Deduplication impact:</strong> Google reported ~30% storage savings from attachment deduplication alone. A single viral email attachment (e.g., "year-end report.pdf") sent to millions of users is stored only once in Colossus — all message metadata rows simply point to the same chunk ID.
    </div>
  </div>
</div>

<!-- SECTION 6: Core Service 2 — Spam &amp; Phishing Filter -->
<div class="ref-section">
  <div class="ref-title">6. Core Service 2: Spam &amp; Phishing Filter (ML Pipeline)</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Multi-Layer Filtering Architecture</strong>
        <ul>
          <li><strong>Layer 1 — Connection-level (MTA):</strong> IP reputation lookup, DNS RBL blacklists, TLS verification. Blocks ~80% of spam before SMTP DATA command.</li>
          <li><strong>Layer 2 — Protocol validation:</strong> SPF (sender IP authorisation), DKIM (message signature), DMARC (alignment policy). Reject or quarantine on failure.</li>
          <li><strong>Layer 3 — Content ML:</strong> TensorFlow Serving model, distilled BERT variant. Evaluates subject, body, sender reputation, header anomalies, URL patterns. &lt;10ms SLA.</li>
          <li><strong>Layer 4 — Behavioural:</strong> User-specific model — if user never reads from this sender, higher spam score. Trained on per-user signal feedback.</li>
          <li><strong>Layer 5 — URL/Attachment scan:</strong> Safe Browsing API for URLs, ClamAV + proprietary engine for attachment virus scan. Async for non-suspicious mail.</li>
        </ul>
        <strong>ML Model Details</strong>
        <ul>
          <li>Model: Federated learning across billions of users — local model updates aggregated centrally without raw data leaving device</li>
          <li>Features: 100K+ feature dimensions including n-grams, sender graph, reply patterns</li>
          <li>Inference: TF Serving on TPU v4 pods — 464K classifications/sec at p99 &lt;10ms</li>
          <li>Model refresh: incremental online learning every 15 minutes on new spam signals</li>
        </ul>
      </div>
      <div>
        <strong>Signal Feedback Loop</strong>
        <div class="code-box">User marks email as spam:
1. Pub/Sub event: {action: MARK_SPAM, msg_id, user_id}
2. Training pipeline consumes event
3. Negative signal added to training set
4. Model fine-tuned incrementally (SGD update)
5. New model version deployed via canary
6. A/B test: 1% traffic on new model, monitor FPR/FNR
7. Promote to 100% if metrics improve

Similar-sender emails re-evaluated retroactively
(async batch job every 30 mins)</div>
        <strong>Phishing Detection</strong>
        <ul>
          <li>Brand impersonation detector: compares sender domain vs. display name (e.g., "Apple" from suspicious-domain.com)</li>
          <li>URL lookalike detection: Unicode homograph attacks (paypa1.com vs paypal.com)</li>
          <li>Credential harvest detection: form presence + login keywords + suspicious domain</li>
          <li>Zero-day phishing: sandbox URL detonation — headless Chrome visits URL, records behaviour</li>
        </ul>
        <strong>Performance Metrics</strong>
        <table class="pattern-table">
          <tr class="pt-header"><th>Metric</th><th>Target</th></tr>
          <tr class="pt-row"><td class="pt-name">Spam detection rate</td><td>&gt;99.9%</td></tr>
          <tr class="pt-row"><td class="pt-name">False positive rate</td><td>&lt;0.05%</td></tr>
          <tr class="pt-row"><td class="pt-name">Phishing block rate</td><td>&gt;99.95%</td></tr>
          <tr class="pt-row"><td class="pt-name">Latency p99</td><td>&lt;10ms</td></tr>
        </table>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 7: Core Service 3 — Thread &amp; Inbox Service -->
<div class="ref-section">
  <div class="ref-title">7. Core Service 3: Thread &amp; Inbox/Label Service</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Thread Grouping Algorithm</strong>
        <p>Gmail's conversation threading is one of its defining features. Messages are grouped into threads using a multi-signal algorithm:</p>
        <ul>
          <li><strong>In-Reply-To header:</strong> RFC 2822 message-ID reference chain — primary signal</li>
          <li><strong>References header:</strong> full ancestor chain of message IDs</li>
          <li><strong>Subject normalisation:</strong> strip "Re:", "Fwd:", case-fold, compare</li>
          <li><strong>Recipient overlap:</strong> same set of participants within time window</li>
          <li>Thread ID stored in Spanner, immutable once created</li>
          <li>Orphaned replies (missing In-Reply-To) matched by subject + time heuristic</li>
        </ul>
        <strong>Label System Design</strong>
        <ul>
          <li>System labels: INBOX, SPAM, TRASH, SENT, DRAFT, STARRED, IMPORTANT, UNREAD</li>
          <li>Category labels: CATEGORY_PERSONAL, CATEGORY_PROMOTIONS, CATEGORY_SOCIAL, CATEGORY_UPDATES, CATEGORY_FORUMS (ML-assigned)</li>
          <li>User labels: arbitrary strings, stored in Spanner user_labels table</li>
          <li>Labels stored as sorted sets in Spanner — message can have multiple labels</li>
          <li>Label mutations are Spanner transactions — strong consistency</li>
        </ul>
      </div>
      <div>
        <strong>Inbox Categorisation (ML)</strong>
        <div class="code-box">Input features to ML model:
- Sender domain and history
- Unsubscribe header presence
- List-Id / Precedence: bulk headers
- Link density in HTML body
- Sender's sending volume (bulk vs personal)
- User's past interaction with this sender
- Reply-to vs From mismatch

Output: {
  primary: 0.78,
  promotions: 0.15,
  social: 0.05,
  updates: 0.02
}
→ Routed to Primary tab</div>
        <strong>Unread Count — Redis Design</strong>
        <ul>
          <li>Redis hash per user: <code>unread:{user_id}</code> with field per label</li>
          <li>Atomic HINCRBY on new message arrival (via Pub/Sub consumer)</li>
          <li>HINCRBY -1 on read event (optimistic, reconcile with Spanner hourly)</li>
          <li>TTL: none — persistent, but small (64 bytes/user = 115 GB for 1.8B users)</li>
          <li>Fallback: on Redis miss, count UNREAD label rows in Spanner (slower path)</li>
        </ul>
        <strong>Important/Priority Inbox (ML)</strong>
        <ul>
          <li>Trained on: reply patterns, open rate, sender relationship graph</li>
          <li>IMPORTANT label auto-applied with &gt;0.7 confidence score</li>
          <li>User corrections feed back as training signal within 1 hour</li>
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
        <strong>Spanner — messages table</strong>
        <div class="code-box">CREATE TABLE messages (
  user_id      STRING(36) NOT NULL,  -- shard key
  message_id   STRING(36) NOT NULL,
  thread_id    STRING(36) NOT NULL,
  subject      STRING(998),
  snippet      STRING(200),           -- first 200 chars for list view
  from_address STRING(500),
  to_addresses ARRAY&lt;STRING(500)&gt;,
  cc_addresses ARRAY&lt;STRING(500)&gt;,
  labels       ARRAY&lt;STRING(50)&gt;,    -- ['INBOX','UNREAD','IMPORTANT']
  size_bytes   INT64,
  has_attachment BOOL,
  internal_date TIMESTAMP NOT NULL,
  history_id   INT64,                -- monotonic sequence per user
  colossus_chunk_ids ARRAY&lt;STRING&gt;, -- pointers to body storage
  gcs_attachment_ids ARRAY&lt;STRING&gt;,
) PRIMARY KEY (user_id, internal_date DESC, message_id);

CREATE INDEX idx_thread ON messages (user_id, thread_id, internal_date DESC);
CREATE INDEX idx_label  ON messages (user_id, labels, internal_date DESC) STORING (snippet, from_address);</div>
      </div>
      <div>
        <strong>Spanner — threads table</strong>
        <div class="code-box">CREATE TABLE threads (
  user_id      STRING(36) NOT NULL,
  thread_id    STRING(36) NOT NULL,
  subject      STRING(998),
  snippet      STRING(200),           -- from latest message
  labels       ARRAY&lt;STRING(50)&gt;,    -- union of all message labels
  message_count INT64,
  unread_count  INT64,
  last_message_date TIMESTAMP,
  participants ARRAY&lt;STRING(500)&gt;,   -- deduplicated
) PRIMARY KEY (user_id, last_message_date DESC, thread_id);

-- GCS attachments manifest
CREATE TABLE attachments (
  user_id     STRING(36) NOT NULL,
  message_id  STRING(36) NOT NULL,
  attach_id   STRING(36) NOT NULL,
  filename    STRING(255),
  mime_type   STRING(100),
  size_bytes  INT64,
  gcs_uri     STRING(500),
  sha256_hash STRING(64),             -- dedup key
  virus_scan_status STRING(20),       -- CLEAN / INFECTED / PENDING
) PRIMARY KEY (user_id, message_id, attach_id);</div>
        <strong>Bigtable — Search Index Schema</strong>
        <div class="code-box">Row key: {user_id}#{field}#{term}
  Example: "u123#body#meeting"

Column families:
  postings:  col={message_id}, val={score|offset|date}
  stats:     col=df, val={doc_frequency}

Row key: {user_id}#msg#{message_id} (forward index)
  terms:   col={term}, val={tf_score}</div>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 9: Data Flow — Key Scenarios -->
<div class="ref-section">
  <div class="ref-title">9. Data Flow — Key Scenarios</div>
  <div class="ref-body">
    <strong>Scenario 1: Receiving an Inbound Email</strong>
    <div class="flow-box">
      <div class="flow-step">External sender's MTA connects to Gmail MX (aspmx.l.google.com). TLS handshake. SPF/DKIM/DMARC validation at MTA layer.</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Spam Filter Layer 1-3: ML model classifies message in &lt;10ms. If spam score &gt;0.9 → route to SPAM label. Score stored in message metadata.</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Inbox Categoriser: ML assigns CATEGORY_PRIMARY/PROMOTIONS/SOCIAL. IMPORTANT label applied if personal email with high reply probability.</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Storage Writer: MIME body parsed and written to Colossus (dedup check first). Attachments uploaded to GCS with virus scan queued async. Colossus chunk IDs returned.</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Spanner write: Insert into messages table with chunk IDs, labels, thread_id (matched or new). Update threads table. Atomic transaction. History ID incremented.</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Pub/Sub publish: {event: NEW_MESSAGE, user_id, message_id, labels}. Redis HINCRBY unread:{user_id} INBOX +1.</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Sync Service consumes Pub/Sub event → sends FCM push to all registered Android/iOS devices. Chrome extension via SSE channel. Web client via long-poll or WebSocket.</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Search Indexer (async, ~2s): Bigtable index updated with tokenised subject + body. Full-text search available to user.</div>
    </div>

    <strong>Scenario 2: Sending an Email with Attachment</strong>
    <div class="flow-box">
      <div class="flow-step">User composes email in browser. Attachment uploaded via resumable upload API to temporary GCS staging bucket. Virus scan initiated immediately (async).</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">User clicks Send → POST /messages/send. API Gateway validates OAuth token, checks sending quota (250 quota units/user/sec).</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Compose Service: validates recipients (MX check), ensures attachment virus scan CLEAN status (polls GCS metadata). DKIM signs the complete MIME message.</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">If recipient is @gmail.com: internal delivery — write directly to Spanner/Colossus bypassing external SMTP. If external: Delivery Service does async MX lookup + SMTP delivery with exponential retry (1min → 5min → 30min → 4hr → 24hr → bounce).</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">SENT label applied to sender's copy. Thread updated. Draft (if any) deleted. Search index updated.</div>
    </div>

    <strong>Scenario 3: Full-Text Search</strong>
    <div class="flow-box">
      <div class="flow-step">User types "from:alice project timeline" in search bar. Autocomplete suggestions from search history Redis cache.</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Search Service parses query: field constraint (from:alice@domain.com) + free text terms (project, timeline). Identifies user_id from session.</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Bigtable parallel reads: scan rows for user_id#from#alice@domain.com, user_id#body#project, user_id#body#timeline. Returns posting lists with TF-IDF scores.</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Posting list intersection (AND by default). Score = TF-IDF * recency_boost * label_boost. Top-50 message_ids selected.</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Spanner batch read: fetch snippet, from, date, labels for top-50 message_ids. Rendered and returned to client. Elapsed: &lt;200ms p95.</div>
    </div>
  </div>
</div>

<!-- SECTION 10: Caching Strategy -->
<div class="ref-section">
  <div class="ref-title">10. Caching Strategy</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><th>What</th><th>Where</th><th>Strategy</th><th>TTL</th><th>Eviction</th></tr>
      <tr class="pt-row"><td class="pt-name">Unread counts per label</td><td>Redis Hash per user</td><td>Write-through on label change</td><td>No TTL (persistent)</td><td>None — small &amp; hot</td></tr>
      <tr class="pt-row"><td class="pt-name">User session / auth token</td><td>Redis</td><td>Cache-aside</td><td>1 hour</td><td>LRU</td></tr>
      <tr class="pt-row"><td class="pt-name">Inbox list (latest 50 threads)</td><td>Redis sorted set per user</td><td>Write-through on new mail</td><td>5 minutes</td><td>LRU</td></tr>
      <tr class="pt-row"><td class="pt-name">Message snippet + metadata</td><td>Redis hash (message_id)</td><td>Cache-aside on first read</td><td>30 minutes</td><td>LRU</td></tr>
      <tr class="pt-row"><td class="pt-name">Spam model inference result</td><td>In-process LRU (TF Serving)</td><td>Cache identical messages (hash match)</td><td>1 hour</td><td>LRU fixed size</td></tr>
      <tr class="pt-row"><td class="pt-name">Search autocomplete suggestions</td><td>Redis sorted set per user</td><td>Write-through on search history</td><td>7 days</td><td>LRU</td></tr>
      <tr class="pt-row"><td class="pt-name">Sender reputation score</td><td>Memcached (shared cluster)</td><td>Write-through on reputation update</td><td>15 minutes</td><td>LRU</td></tr>
      <tr class="pt-row"><td class="pt-name">User label list</td><td>Redis String (JSON)</td><td>Cache-aside, invalidate on label CRUD</td><td>10 minutes</td><td>LRU</td></tr>
      <tr class="pt-row"><td class="pt-name">Static JS/CSS assets</td><td>CDN edge (Google Cloud CDN)</td><td>Cache-control: max-age=31536000 (immutable)</td><td>1 year</td><td>Version hash in URL</td></tr>
      <tr class="pt-row"><td class="pt-name">Attachment thumbnails/previews</td><td>CDN + GCS signed URL cache</td><td>Cache-control: private, max-age=3600</td><td>1 hour</td><td>Signed URL expiry</td></tr>
    </table>
    <div class="warn-box">
      <strong>Cache invalidation challenge:</strong> When a user modifies labels (e.g., archives a thread), the inbox list cache must be invalidated immediately. Gmail uses a monotonic <code>historyId</code> per user — clients can detect staleness and re-fetch rather than relying on TTL alone. This is a pull-based invalidation model.
    </div>
  </div>
</div>

<!-- SECTION 11: Message Queue / Event Streaming -->
<div class="ref-section">
  <div class="ref-title">11. Message Queue / Event Streaming</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Google Pub/Sub — Why, Not Kafka</strong>
        <p>Gmail uses Google Cloud Pub/Sub (internally built on the same technology) rather than Apache Kafka because:</p>
        <ul>
          <li>Fully managed — no broker cluster management at Google-scale</li>
          <li>At-least-once delivery with acknowledgment-based retry</li>
          <li>Global topics with regional message storage for compliance</li>
          <li>Seamless integration with Cloud Dataflow for stream processing</li>
          <li>Auto-scaling to millions of messages/second without partitioning decisions</li>
        </ul>
        <strong>Key Topics &amp; Consumers</strong>
        <table class="pattern-table">
          <tr class="pt-header"><th>Topic</th><th>Producers</th><th>Consumers</th></tr>
          <tr class="pt-row"><td class="pt-name">gmail.message.new</td><td>MTA, Compose Service</td><td>Search Indexer, Push Notifier, Spam ML retrainer</td></tr>
          <tr class="pt-row"><td class="pt-name">gmail.message.modified</td><td>Inbox Service, API</td><td>Sync Service, unread counter, search index update</td></tr>
          <tr class="pt-row"><td class="pt-name">gmail.spam.signal</td><td>User feedback, ML layer</td><td>ML training pipeline, reputation updater</td></tr>
          <tr class="pt-row"><td class="pt-name">gmail.attachment.uploaded</td><td>Attachment Service</td><td>Virus scanner, thumbnail generator, index builder</td></tr>
          <tr class="pt-row"><td class="pt-name">gmail.delivery.bounce</td><td>Delivery Service</td><td>Bounce notification sender, NDR composer</td></tr>
        </table>
      </div>
      <div>
        <strong>Delivery Guarantees &amp; Idempotency</strong>
        <ul>
          <li><strong>At-least-once:</strong> Pub/Sub can redeliver on timeout — all consumers are idempotent</li>
          <li><strong>Idempotency key:</strong> message_id in every event payload — consumers check Spanner before reprocessing</li>
          <li><strong>Ordering:</strong> Pub/Sub ordering keys = user_id — events per user are ordered</li>
          <li><strong>Dead letter topic:</strong> After 5 delivery failures, event routes to gmail.dlq — ops team investigates</li>
          <li><strong>Retention:</strong> 7 days on unacked messages — allows replaying events after consumer outage</li>
        </ul>
        <strong>Push Notification Flow via Pub/Sub</strong>
        <div class="code-box">gmail.message.new event consumed by Sync Service:

1. Look up user's registered push endpoints in Spanner
   (FCM token for Android, APNs token for iOS, SSE channel for web)
2. Build push payload:
   { message_id, thread_id, snippet, from, labels }
3. Publish to FCM / APNs in parallel
4. For web: publish to SSE channel via user-specific Redis pub/sub
5. Client receives push → fetches delta via historyId API
6. Avoids sending full message in push (privacy + size)</div>
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
        <strong>Web Client — Server-Sent Events (SSE)</strong>
        <p>Gmail web client uses SSE (not WebSocket) because email is predominantly server-to-client push — the client doesn't need to send real-time data to the server.</p>
        <ul>
          <li>SSE connection established on page load: GET /notifications/stream (text/event-stream)</li>
          <li>Single HTTP/2 connection multiplexed with other requests</li>
          <li>Events: new-message, message-modified, label-changed, quota-update</li>
          <li>Automatic reconnection with Last-Event-ID header for gap recovery</li>
          <li>No WebSocket handshake overhead, works through HTTP proxies</li>
          <li>Heartbeat event every 30s to keep connection alive through NAT/firewalls</li>
        </ul>
        <strong>Smart Compose — WebSocket</strong>
        <p>The Smart Compose autocomplete (real-time AI suggestions while typing) uses WebSocket because it requires low-latency bidirectional communication:</p>
        <ul>
          <li>WebSocket opened when compose window opens</li>
          <li>Keystroke debounce: 300ms before sending partial text to ML inference server</li>
          <li>Server streams back completion tokens as generated (streaming response)</li>
          <li>WebSocket closed when compose window closes</li>
        </ul>
      </div>
      <div>
        <strong>Mobile — Firebase Cloud Messaging (FCM / APNs)</strong>
        <ul>
          <li>FCM for Android, APNs for iOS — native OS push channels</li>
          <li>Lightweight push: only message metadata (not body) — full message fetched on open</li>
          <li>Silent push for background sync (updates badge count without wake)</li>
          <li>High-priority push for incoming messages (wakes device immediately)</li>
          <li>FCM registration token stored in Spanner, refreshed on app launch</li>
        </ul>
        <strong>IMAP/POP3 — Long Polling (IDLE)</strong>
        <ul>
          <li>IMAP IDLE command: client keeps TCP connection open</li>
          <li>Server sends EXISTS/RECENT response when new mail arrives</li>
          <li>Gmail's IMAP implementation uses a 28-minute max IDLE timeout (RFC 2177)</li>
          <li>Sync Service bridges internal Pub/Sub new-message events to IMAP IDLE responses</li>
        </ul>
        <strong>Comparison</strong>
        <table class="pattern-table">
          <tr class="pt-header"><th>Channel</th><th>Use case</th><th>Latency</th></tr>
          <tr class="pt-row"><td class="pt-name">SSE</td><td>Web client push</td><td>&lt;500ms</td></tr>
          <tr class="pt-row"><td class="pt-name">FCM/APNs</td><td>Mobile push</td><td>&lt;2s</td></tr>
          <tr class="pt-row"><td class="pt-name">WebSocket</td><td>Smart Compose</td><td>&lt;50ms</td></tr>
          <tr class="pt-row"><td class="pt-name">IMAP IDLE</td><td>3rd-party clients</td><td>&lt;1s</td></tr>
        </table>
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
        <strong>Spanner — External Consistency (Strongest Guarantee)</strong>
        <ul>
          <li>Cloud Spanner provides external consistency — stronger than serialisability</li>
          <li>TrueTime API: atomic clocks + GPS in every Google data centre give bounded time uncertainty (&lt;7ms)</li>
          <li>Commit wait: transactions wait for TrueTime uncertainty window to close before returning, guaranteeing global causal ordering</li>
          <li>Critical for Gmail: label modifications, read receipts, and draft saves must be strongly consistent — no user should see a "phantom unread" after marking read</li>
        </ul>
        <strong>ACID Transactions in Spanner</strong>
        <div class="code-box">// Archive a thread — multi-table transaction:
BEGIN TRANSACTION
  UPDATE messages SET labels = ARRAY_REMOVE(labels, 'INBOX')
    WHERE user_id = @uid AND thread_id = @tid;
  UPDATE threads SET labels = ARRAY_REMOVE(labels, 'INBOX')
    WHERE user_id = @uid AND thread_id = @tid;
  UPDATE user_stats SET inbox_count = inbox_count - 1
    WHERE user_id = @uid;
COMMIT;
// Atomic — no partial state visible to other reads</div>
      </div>
      <div>
        <strong>Eventual Consistency — Where Acceptable</strong>
        <ul>
          <li><strong>Search index:</strong> Bigtable index updated asynchronously — 2-3 second lag acceptable for search</li>
          <li><strong>Unread count in Redis:</strong> Eventual consistency with Spanner — reconciled every hour via batch job</li>
          <li><strong>Spam model updates:</strong> New model version rolled out gradually — different servers may use slightly different models during rollout</li>
          <li><strong>Cross-device sync:</strong> Uses historyId for delta sync — eventual convergence guaranteed, not instantaneous</li>
        </ul>
        <strong>Idempotency &amp; Distributed Locking</strong>
        <ul>
          <li><strong>Send idempotency:</strong> Draft message_id used as idempotency key — sending same draft twice is a no-op (checked via Spanner read before write)</li>
          <li><strong>Label modification:</strong> Spanner Compare-and-Set on historyId prevents lost updates from concurrent clients</li>
          <li><strong>Distributed lock:</strong> Spanner row-level locks used for draft editing — prevents concurrent overwrites</li>
          <li><strong>Delivery dedup:</strong> MTA message-ID header stored in Redis SET for 7 days — duplicate deliveries from retrying MTAs detected and discarded</li>
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
        <strong>Indexing Pipeline</strong>
        <ol>
          <li><strong>Tokenisation:</strong> Subject, body (HTML stripped), sender, recipient, attachment filenames tokenised. Unicode-aware, language-specific stemming (25 languages).</li>
          <li><strong>Normalisation:</strong> Lowercase, punctuation removal, stemming (run → run, running, runs), stopword removal (the, a, is) per locale.</li>
          <li><strong>TF-IDF calculation:</strong> Term frequency within message × inverse document frequency across user's mailbox.</li>
          <li><strong>Bigtable write:</strong> Row key <code>user_id#field#term</code>, column = message_id, value = score + date + positions.</li>
          <li><strong>Attachment text:</strong> PDF → pdftotext, Office → Apache Tika, images → OCR via Vision API. Indexed async (may take minutes for large attachments).</li>
        </ol>
        <strong>Gmail Query Syntax</strong>
        <div class="code-box">from:alice@example.com
to:me
subject:"quarterly report"
has:attachment filename:pdf
larger:10mb
after:2024/01/01 before:2024/12/31
label:work
is:unread
in:inbox OR in:spam
-label:newsletters          (negation)
"exact phrase" project      (AND implicit)</div>
      </div>
      <div>
        <strong>Query Execution Engine</strong>
        <ul>
          <li><strong>Query parsing:</strong> Recursive descent parser handles boolean operators, field constraints, date ranges, size filters</li>
          <li><strong>Execution plan:</strong> Most selective term evaluated first (smallest posting list). Date range pushdown — scan only recent Bigtable rows for common queries.</li>
          <li><strong>Posting list intersection:</strong> Galloping merge algorithm for AND queries — O(n log(m/n)) vs O(n+m) linear scan</li>
          <li><strong>Ranking signals:</strong>
            <ul>
              <li>TF-IDF relevance score</li>
              <li>Recency boost (exponential decay by date)</li>
              <li>Label boost (starred/important messages ranked higher)</li>
              <li>Thread score (reply to user's own mail ranked higher)</li>
            </ul>
          </li>
          <li><strong>Snippet generation:</strong> KWIC (keyword in context) — 200-char window centred on query terms, HTML-escaped and highlighted</li>
          <li><strong>Spell correction:</strong> Noisy channel model using user's own mailbox vocabulary — "form alice" → "from alice"</li>
        </ul>
        <strong>Search Performance</strong>
        <table class="pattern-table">
          <tr class="pt-header"><th>Scenario</th><th>Latency</th></tr>
          <tr class="pt-row"><td class="pt-name">Recent email (last 30 days)</td><td>&lt;50ms p95</td></tr>
          <tr class="pt-row"><td class="pt-name">Full history search</td><td>&lt;200ms p95</td></tr>
          <tr class="pt-row"><td class="pt-name">Complex boolean query</td><td>&lt;500ms p95</td></tr>
          <tr class="pt-row"><td class="pt-name">Attachment content search</td><td>&lt;1s p95</td></tr>
        </table>
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
        <strong>What is CDN-Served</strong>
        <ul>
          <li><strong>Static assets:</strong> Gmail JS bundles (~2MB gzipped), CSS, service worker scripts. Cache-Control: max-age=31536000, immutable. Content hash in URL for cache busting.</li>
          <li><strong>Inline images in email body:</strong> External images in HTML emails proxied through Google's Image Proxy (googleusercontent.com) — strips tracking pixels, scans for malware, caches for 24h</li>
          <li><strong>Attachment previews:</strong> PDF first-page thumbnail, image thumbnails generated by Cloud Functions and served via CDN with private signed URLs</li>
          <li><strong>Emoji, avatar images:</strong> Google Contacts profile photos cached at CDN edge with 1-hour TTL</li>
        </ul>
        <strong>Image Proxy Design (Privacy Feature)</strong>
        <div class="code-box">Original email HTML:
&lt;img src="https://tracker.example.com/pixel.gif"&gt;

Gmail rewrites to:
&lt;img src="https://ci.googleusercontent.com/proxy/
  {base64_encoded_original_url}"&gt;

Benefits:
- All images load over HTTPS (no mixed content)
- Tracking pixel sender sees Google IP, not user IP
- Google scans image for malware before serving
- CDN caches images — reduced latency + bandwidth
- User's actual location and timing hidden from senders</div>
      </div>
      <div>
        <strong>Attachment Download — Signed URLs</strong>
        <ul>
          <li>Attachments stored in GCS with no public access</li>
          <li>Download URL: generated server-side with 1-hour HMAC signature</li>
          <li>Signature includes: user_id, attachment_id, expiry timestamp, file hash</li>
          <li>GCS serves attachment directly to user — bypasses Gmail servers (saves egress cost)</li>
          <li>CDN caches attachments at edge for 1 hour (Cache-Control: private, max-age=3600)</li>
          <li>Large attachments (&gt;25MB sent via Google Drive): only Drive link in email body</li>
        </ul>
        <strong>Progressive Email Loading</strong>
        <ul>
          <li>Email list: only snippet + metadata loaded (small Spanner read)</li>
          <li>Opening email: full MIME body fetched from Colossus on demand</li>
          <li>Attachments: lazy-loaded only when user clicks download</li>
          <li>Inline images: loaded asynchronously after email body renders</li>
          <li>Prefetch: top-3 unread messages in inbox prefetched on hover using Intersection Observer API</li>
        </ul>
        <strong>CDN Cache Hit Rates</strong>
        <table class="pattern-table">
          <tr class="pt-header"><th>Asset Type</th><th>Cache Hit Rate</th></tr>
          <tr class="pt-row"><td class="pt-name">JS/CSS bundles</td><td>~99% (immutable URLs)</td></tr>
          <tr class="pt-row"><td class="pt-name">Proxied email images</td><td>~85% (24h TTL)</td></tr>
          <tr class="pt-row"><td class="pt-name">Attachment thumbnails</td><td>~70% (1h TTL)</td></tr>
        </table>
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
          <li><strong>OAuth 2.0:</strong> All API access via short-lived access tokens (1h expiry) + refresh tokens. Scopes: gmail.readonly, gmail.send, gmail.modify, gmail.labels, mail.google.com (full access).</li>
          <li><strong>SAML/SSO:</strong> Google Workspace supports SAML 2.0 for enterprise IdP integration (Okta, Azure AD)</li>
          <li><strong>2FA/MFA:</strong> TOTP, hardware security keys (FIDO2/WebAuthn), Google Authenticator. Advanced Protection Program uses hardware key as mandatory 2FA.</li>
          <li><strong>Session management:</strong> Access tokens in httpOnly secure cookies. Session bound to device fingerprint. Suspicious login detection triggers re-auth.</li>
          <li><strong>App passwords:</strong> For IMAP/SMTP clients that don't support OAuth — 16-char app-specific password, revocable per app</li>
        </ul>
        <strong>Encryption</strong>
        <ul>
          <li><strong>In transit:</strong> TLS 1.3 minimum for all connections. MTA-STS policy published — forces TLS for inbound MX. STARTTLS opportunistic encryption for external SMTP.</li>
          <li><strong>At rest:</strong> AES-256-GCM for Colossus storage, Spanner, GCS. Keys managed by Google KMS with hardware HSM backing.</li>
          <li><strong>Client-side encryption (CSE):</strong> Enterprise feature — message encrypted in browser with customer-managed keys before leaving device. Google sees only ciphertext.</li>
          <li><strong>S/MIME:</strong> Supported for end-to-end signing and encryption for corporate Gmail users</li>
        </ul>
      </div>
      <div>
        <strong>Email Authentication (Anti-Spoofing)</strong>
        <ul>
          <li><strong>SPF:</strong> TXT record lists authorised sending IPs. Receiving MTA checks: does sender IP match SPF record? Fail → spam or reject.</li>
          <li><strong>DKIM:</strong> Sending server signs message headers with private key. Public key in DNS. Recipient verifies signature — tamper detection.</li>
          <li><strong>DMARC:</strong> Policy record (p=quarantine or p=reject) — what to do when SPF/DKIM fail. Aggregate reports sent to domain owner. Critical for brand protection.</li>
          <li><strong>ARC (Authenticated Received Chain):</strong> Preserves DKIM authentication across email forwarding hops (e.g., mailing lists)</li>
          <li><strong>BIMI:</strong> Brand Indicators for Message Identification — verified brand logo shown in Gmail UI for DMARC-compliant senders</li>
        </ul>
        <strong>Rate Limiting &amp; Abuse Prevention</strong>
        <ul>
          <li><strong>Sending quota:</strong> 500 emails/day for personal, 2000/day for Workspace. Per-user token bucket in Redis.</li>
          <li><strong>API rate limits:</strong> 250 quota units/user/second. Enforced at API Gateway with Redis sliding window counter.</li>
          <li><strong>Spam trap:</strong> Honeypot email addresses monitor for bulk senders. IP blocklisting on abuse detection.</li>
          <li><strong>Account takeover detection:</strong> Anomaly detection on login location, device, and sending patterns. Automatic account lock on suspicious activity.</li>
          <li><strong>Content scanning:</strong> All attachments scanned for malware. Child safety content scanning (PhotoDNA hashing for CSAM).</li>
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
        <strong>Horizontal Scaling Strategy</strong>
        <ul>
          <li><strong>All microservices stateless:</strong> Compose, Inbox, Thread, Search, Spam services all stateless — scale horizontally via Kubernetes HPA based on CPU/RPS metrics</li>
          <li><strong>Spanner auto-sharding:</strong> Spanner automatically splits and rebalances hotspot rows. The PRIMARY KEY (user_id, internal_date DESC) ensures user data locality while enabling parallel reads across shards for large-scale queries.</li>
          <li><strong>Bigtable auto-scaling:</strong> Bigtable cluster nodes scale independently for storage and throughput. Google Cloud Bigtable auto-scales read nodes based on CPU utilisation.</li>
          <li><strong>Colossus:</strong> Inherently distributed — adds chunkservers transparently. No manual shard management.</li>
        </ul>
        <strong>Sharding Strategy</strong>
        <ul>
          <li><strong>Primary shard key: user_id</strong> — all user data (messages, threads, labels) co-located in same Spanner region for the user's home region (US, EU, APAC)</li>
          <li><strong>Bigtable row key: user_id#field#term</strong> — all search data for a user is a lexicographic range, enabling single-row-group scans</li>
          <li><strong>Hot user problem:</strong> VIP accounts (e.g., enterprise domains with 100K users) — Spanner handles via automatic split based on write throughput, not just cardinality</li>
          <li><strong>GCS sharding:</strong> GCS bucket naming includes user_id_prefix to distribute objects across GCS shards (GCS is flat namespace with internal sharding)</li>
        </ul>
      </div>
      <div>
        <strong>Read Replicas &amp; Read-After-Write Consistency</strong>
        <ul>
          <li>Spanner multi-region configuration (NAM6 for US, EUR3 for Europe): read-only replicas in 4 regions, read-write replicas in 2</li>
          <li>Read-after-write: after modifying labels, client includes historyId in subsequent reads — Spanner guarantees read reflects writes with that historyId</li>
          <li>Bigtable: read replicas in same region for search — eventual consistency acceptable for search (2s lag)</li>
        </ul>
        <strong>Traffic Shaping</strong>
        <ul>
          <li><strong>Priority queues:</strong> Inbound email from SPF/DKIM-valid senders in high-priority queue. Unknown senders in low-priority queue (throttled during overload).</li>
          <li><strong>Backpressure:</strong> If Pub/Sub consumers (e.g., search indexer) are slow, backpressure propagates — new-message acceptance slows gracefully rather than failing</li>
          <li><strong>Shedding strategy:</strong> During extreme load (e.g., major sporting event causing email surge), IMAP access throttled first; web delivery prioritised</li>
        </ul>
        <strong>Global Load Balancing</strong>
        <ul>
          <li>Google GFE (Global Frontend): anycast IP routing — user connects to nearest PoP</li>
          <li>Maglev: Google's software load balancer — consistent hashing for connection affinity</li>
          <li>Weighted round-robin across regions based on real-time capacity signals</li>
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
        <strong>Circuit Breaker Pattern</strong>
        <ul>
          <li>All service-to-service calls wrapped in circuit breaker (Google Stubby / gRPC with interceptor)</li>
          <li><strong>Spam Filter circuit breaker:</strong> If ML inference service fails, fallback to rule-based filter (SPF/DKIM only). Email delivered with [ML Pending] label. Spam re-scanned async when ML recovers.</li>
          <li><strong>Search circuit breaker:</strong> If Bigtable unavailable, search returns Spanner metadata-only results (subject/sender search, no full-text). Degraded but functional.</li>
          <li><strong>Push notification circuit breaker:</strong> If FCM unavailable, fallback to IMAP IDLE notification. Email still delivered — notification delayed.</li>
        </ul>
        <strong>Retry Strategy</strong>
        <ul>
          <li><strong>Email delivery (outbound SMTP):</strong> Exponential backoff: 1min → 5min → 30min → 4hr → 24hr → 48hr → bounce NDR. Jitter added to avoid thundering herd.</li>
          <li><strong>Internal service calls:</strong> 3 retries with 100ms base, 2x multiplier, 30s cap. Retry budget: max 10% of requests retrying simultaneously.</li>
          <li><strong>Pub/Sub consumer:</strong> Ack deadline extension during slow processing. Max 5 redelivery attempts before dead letter queue.</li>
        </ul>
      </div>
      <div>
        <strong>Bulkhead Pattern</strong>
        <ul>
          <li><strong>SMTP vs API isolation:</strong> Inbound SMTP handling isolated from API request handling — email surge from external senders doesn't impact Gmail web/mobile users</li>
          <li><strong>Attachment isolation:</strong> Attachment upload/download handled by separate Attach Service with independent connection pools — large attachment uploads don't consume API connection pool</li>
          <li><strong>Spam ML isolation:</strong> Dedicated ML serving cluster, not shared with other Google ML workloads. Resource quota guarantees spam filter always has capacity.</li>
        </ul>
        <strong>Data Durability</strong>
        <ul>
          <li>Colossus: 3-way synchronous replication across racks in same data centre. Plus async replication to second data centre (cross-region for Workspace customers).</li>
          <li>Spanner: Synchronous Paxos replication across 5 replicas (2 regions for NAM6). Write acknowledged only after majority (3/5) commit.</li>
          <li>GCS Standard: 99.999999999% durability via Reed-Solomon erasure coding across multiple zones</li>
          <li>Zero-RPO for Spanner writes — no data loss on single zone failure</li>
        </ul>
        <strong>Chaos Engineering</strong>
        <ul>
          <li>Google runs annual DiRT (Disaster Recovery Testing) — intentionally fails entire data centres, regions, and dependencies to verify recovery procedures</li>
          <li>Continuous mini-chaos: random service instance termination in production (similar to Netflix Chaos Monkey)</li>
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
        <strong>Key Metrics (Google Monarch time-series DB)</strong>
        <table class="pattern-table">
          <tr class="pt-header"><th>Metric</th><th>Threshold / SLO</th></tr>
          <tr class="pt-row"><td class="pt-name">Email delivery latency p99</td><td>&lt;500ms | alert at 800ms</td></tr>
          <tr class="pt-row"><td class="pt-name">Search latency p95</td><td>&lt;200ms | alert at 400ms</td></tr>
          <tr class="pt-row"><td class="pt-name">Spam false positive rate</td><td>&lt;0.05% | alert at 0.1%</td></tr>
          <tr class="pt-row"><td class="pt-name">API error rate</td><td>&lt;0.1% | alert at 0.5%</td></tr>
          <tr class="pt-row"><td class="pt-name">Push notification delivery rate</td><td>&gt;99.5% | alert at 99%</td></tr>
          <tr class="pt-row"><td class="pt-name">MTA inbound queue depth</td><td>&lt;100K msgs | alert at 500K</td></tr>
          <tr class="pt-row"><td class="pt-name">Spanner read latency p99</td><td>&lt;5ms | alert at 20ms</td></tr>
          <tr class="pt-row"><td class="pt-name">GCS attachment upload errors</td><td>&lt;0.01% | alert at 0.1%</td></tr>
        </table>
        <strong>Distributed Tracing (Google Dapper)</strong>
        <ul>
          <li>Every email delivery generates a trace spanning MTA → Spam Filter → Inbox Service → Spanner write → Pub/Sub → Push Notification</li>
          <li>Trace ID propagated via X-Google-Trace header through all microservices</li>
          <li>Sampled at 1% for high-volume paths; 100% for error paths</li>
          <li>P99 latency breakdown available per service hop for every user-visible operation</li>
        </ul>
      </div>
      <div>
        <strong>Logging (Google Stackdriver / Cloud Logging)</strong>
        <ul>
          <li>Structured JSON logs with trace_id, user_id (hashed for privacy), message_id, latency_ms, status_code</li>
          <li>Admin audit logs: all label modifications, setting changes, OAuth authorisations — immutable, stored 5 years</li>
          <li>Security logs: failed login attempts, suspicious API access patterns — streamed to SIEM (Chronicle)</li>
          <li>Log-based metrics: extract error rates, latency histograms from structured logs via Stackdriver Logs-Based Metrics</li>
        </ul>
        <strong>SLO / SLA Framework</strong>
        <div class="code-box">SLI: Proportion of inbox loads completing in &lt;2s
SLO: 99.5% of inbox loads &lt;2s (rolling 28 days)
SLA: If SLO breached → service credit (Workspace)

Error budget: 0.5% * 28 days * 86400s = ~12,096 seconds
Error budget burn rate alert: 2x burn rate for 1hr
→ page on-call engineer
5x burn rate for 5 min
→ critical incident declared</div>
        <strong>Dashboards &amp; Alerting</strong>
        <ul>
          <li>Google Borgmon (internal Prometheus equivalent) for time-series alerting</li>
          <li>SLO burn rate alerts in addition to raw threshold alerts</li>
          <li>Executive dashboard: global map of Gmail availability by region</li>
          <li>On-call rotation: tiered — L1 auto-mitigate, L2 SRE pager, L3 engineering escalation</li>
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
        <strong>Multi-Region Strategy</strong>
        <ul>
          <li><strong>User data residency:</strong> Workspace Enterprise can pin user data to specific region (US, EU, APAC) for data sovereignty compliance</li>
          <li><strong>Spanner multi-region:</strong> NAM6 (6 North American regions) for US users, EUR3 for European users. Synchronous replication within configuration.</li>
          <li><strong>Active-active:</strong> All regions serve traffic — no hot standby. Global load balancing routes user to nearest healthy region.</li>
          <li><strong>Colossus replication:</strong> Primary DC + secondary DC per region. Cross-region async backup for disaster recovery.</li>
        </ul>
        <strong>Kubernetes &amp; Borg</strong>
        <ul>
          <li>Gmail microservices run on Google Borg (Kubernetes predecessor and inspiration)</li>
          <li>Containerised workloads with resource quotas: Compose Service (0.5 CPU, 512MB/replica), Search Service (2 CPU, 4GB/replica)</li>
          <li>Borg scheduler places replicas across availability zones — min 3 zones per service</li>
          <li>Resource overcommit: batch workloads (index builder, spam retraining) run on spare capacity at low priority</li>
        </ul>
      </div>
      <div>
        <strong>Deployment Strategy</strong>
        <ul>
          <li><strong>Canary deployment:</strong> New Gmail web versions rolled to 1% → 10% → 50% → 100% of users over 7 days. Automated rollback if error rate exceeds threshold.</li>
          <li><strong>Feature flags:</strong> LaunchDarkly equivalent (Google's internal Gripper system) — feature toggles per user cohort, region, or Workspace domain</li>
          <li><strong>Blue-green for ML models:</strong> New spam model version deployed to green cluster. Traffic gradually shifted from blue. 30-min rollback SLA.</li>
          <li><strong>Zero-downtime schema migrations:</strong> Spanner DDL changes run online — no table locks. Add column first (nullable), backfill, then add NOT NULL constraint. Multi-month migration possible.</li>
          <li><strong>Config as code:</strong> All service configurations in version-controlled Borgcfg files. Changes require code review + automated integration test pass before deploy.</li>
        </ul>
        <strong>CI/CD Pipeline</strong>
        <div class="code-box">Code commit → Blaze build → Unit tests (100% coverage req)
→ Integration tests (fake Spanner + fake Pub/Sub)
→ Load test against production shadow traffic
→ Canary deploy (1% production)
→ 24h automated monitoring (SLO burn rate)
→ Progressive rollout (10% → 50% → 100%)
→ Rollback available for 7 days post-deploy</div>
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
        <strong>Email Loading Optimisations</strong>
        <ul>
          <li><strong>Inbox snapshot API:</strong> Single RPC returns inbox thread list with snippets — replaces N individual message fetches. Reduced inbox load from 5s to &lt;500ms when introduced.</li>
          <li><strong>Spanner STORING indexes:</strong> Label index stores snippet + from_address — avoids separate row lookup for list view rendering</li>
          <li><strong>HTTP/2 multiplexing:</strong> Gmail web client sends all API calls on same HTTP/2 connection — eliminates per-request TCP handshake overhead</li>
          <li><strong>Service worker prefetch:</strong> Chrome service worker prefetches top-5 unread message bodies when browser is idle (requestIdleCallback)</li>
          <li><strong>Brotli compression:</strong> MIME email bodies compressed with Brotli (30% better than gzip) before Colossus storage and over-the-wire transfer</li>
        </ul>
        <strong>Database Optimisations</strong>
        <ul>
          <li><strong>Spanner staleness reads:</strong> For inbox list rendering, bounded staleness read (15 seconds) acceptable — avoids read-write lock contention, 3x throughput improvement</li>
          <li><strong>Bigtable read-your-writes:</strong> After indexing a new message, search service caches the new posting in Redis for 30s — search returns accurate results before Bigtable eventual consistency catches up</li>
          <li><strong>Colossus read coalescing:</strong> Parallel reads of multiple Colossus chunks for large MIME messages. Async prefetch of next chunk during processing of current chunk.</li>
        </ul>
      </div>
      <div>
        <strong>Network &amp; Protocol Optimisations</strong>
        <ul>
          <li><strong>QUIC protocol:</strong> Gmail mobile apps use QUIC (HTTP/3) — 0-RTT reconnection after network switch (WiFi → cellular), 30% faster on lossy networks</li>
          <li><strong>Delta sync protocol:</strong> historyId-based — client only fetches changes since last sync, not full mailbox state. Mobile battery life improvement vs. polling.</li>
          <li><strong>Gzip/Brotli for API responses:</strong> Message list responses compressed — 80% size reduction for JSON payloads</li>
          <li><strong>Connection pooling:</strong> Each microservice maintains a pool of gRPC connections to Spanner and Bigtable. Pool size tuned to latency/throughput SLO (typically 10-50 connections/pod).</li>
        </ul>
        <strong>Frontend Performance</strong>
        <ul>
          <li><strong>Inbox virtualization:</strong> Only visible inbox rows rendered in DOM (virtual scroll) — inbox with 10K threads loads as fast as one with 10</li>
          <li><strong>WASM for email parsing:</strong> MIME parsing moved to WebAssembly module — 5x faster than JS, runs off main thread</li>
          <li><strong>Smart Compose latency:</strong> Speculative inference — start ML inference on partial sentence, stream tokens, cancel if user deletes text</li>
          <li><strong>Email rendering sandbox:</strong> HTML email rendered in sandboxed iframe — CSS isolation, XSS prevention, async rendering off critical path</li>
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
        <strong>Storage Cost Reduction</strong>
        <ul>
          <li><strong>GCS tiered storage:</strong> Attachments not accessed in 30 days moved to Nearline (\$0.01/GB/mo). Not accessed in 90 days → Coldline (\$0.004/GB/mo). Automated via Object Lifecycle Management policies.</li>
          <li><strong>Colossus erasure coding:</strong> Large attachments (&gt;1MB) stored with 6+3 Reed-Solomon rather than 3x replication — 1.5x storage overhead vs 3x. \$savings at petabyte scale are enormous.</li>
          <li><strong>Deduplication:</strong> Attachment dedup saves ~30% of attachment storage (viral emails, newsletters with same attachment)</li>
          <li><strong>MIME compression:</strong> Text email bodies compressed with Brotli before Colossus storage — ~70% compression ratio on HTML email = 70% storage savings for text</li>
          <li><strong>Trash auto-delete:</strong> Emails in Trash auto-deleted after 30 days. Spam auto-deleted after 30 days. Reduces active storage growth rate.</li>
        </ul>
      </div>
      <div>
        <strong>Compute Cost Reduction</strong>
        <ul>
          <li><strong>ML inference on TPUs:</strong> Gmail's spam classification, Smart Compose, and categorisation all run on Google's custom TPU v4 — 10x more efficient (ops/watt) than GPU for transformer inference</li>
          <li><strong>Batch workloads on preemptible VMs:</strong> Search re-indexing, ML model training, spam retroactive scanning run on preemptible Borg jobs at 60-80% discount. Jobs checkpoint and resume on preemption.</li>
          <li><strong>Right-sizing via autopilot:</strong> Borg autopilot analyses historical CPU/memory utilisation and right-sizes container resource requests. Prevents 40% over-provisioning common in manual sizing.</li>
          <li><strong>Cache hit rate optimisation:</strong> Every 1% improvement in Redis cache hit rate for inbox lists saves proportional Spanner read RCUs. Engineering KPI tracked monthly.</li>
        </ul>
        <strong>Network Cost Reduction</strong>
        <ul>
          <li>Internal Google traffic (user → GFE → Gmail services → Spanner): zero egress cost — all on Google's private backbone</li>
          <li>External egress: GCS attachment downloads use CDN with high cache hit rates — CDN-cached bytes billed at CDN rate, not GCS egress rate</li>
          <li>Image proxy: proxied email images cached at CDN — re-fetching same newsletter image for 1M users costs one CDN cache fill, not 1M GCS reads</li>
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
        <strong>RTO/RPO Targets</strong>
        <table class="pattern-table">
          <tr class="pt-header"><th>Component</th><th>RPO</th><th>RTO</th></tr>
          <tr class="pt-row"><td class="pt-name">Email delivery (inbound)</td><td>0 (MTA queue persists)</td><td>&lt;5 min (MTA failover)</td></tr>
          <tr class="pt-row"><td class="pt-name">Spanner (metadata)</td><td>0 (synchronous Paxos)</td><td>&lt;30s (automatic leader failover)</td></tr>
          <tr class="pt-row"><td class="pt-name">Colossus (email bodies)</td><td>0 (3-way sync replication)</td><td>&lt;1 min (chunk re-routing)</td></tr>
          <tr class="pt-row"><td class="pt-name">GCS (attachments)</td><td>0 (multi-region)</td><td>&lt;1 min (GCS automatic)</td></tr>
          <tr class="pt-row"><td class="pt-name">Search (Bigtable)</td><td>Minutes (async replication)</td><td>&lt;5 min (failover to replica)</td></tr>
          <tr class="pt-row"><td class="pt-name">Redis cache</td><td>Minutes (Redis RDB)</td><td>&lt;10 min (warm from Spanner)</td></tr>
          <tr class="pt-row"><td class="pt-name">Full region failure</td><td>&lt;30s (Spanner pending writes)</td><td>&lt;15 min (traffic reroute)</td></tr>
        </table>
        <strong>Backup Strategy</strong>
        <ul>
          <li><strong>Spanner PITR (Point-in-Time Recovery):</strong> 7-day retention of all mutations. Enables restoration to any second within the last 7 days.</li>
          <li><strong>GCS versioning:</strong> Previous attachment versions retained for 90 days (accidental deletion recovery)</li>
          <li><strong>Colossus cross-region async backup:</strong> Asynchronous replication to DR region with &lt;5 minute lag. Used for DR, not normal operations.</li>
        </ul>
      </div>
      <div>
        <strong>Failure Scenarios &amp; Mitigations</strong>
        <ul>
          <li><strong>Single Spanner node failure:</strong> Paxos re-elects leader in &lt;10s. Zero impact to users — other replicas serve reads and writes.</li>
          <li><strong>Entire Google Cloud region failure:</strong> Spanner multi-region config — remaining regions form quorum (3 of 5 replicas). Global load balancer redirects traffic to healthy regions within seconds via anycast DNS failover.</li>
          <li><strong>Pub/Sub outage:</strong> Email delivery continues (synchronous write to Spanner/Colossus). Search indexing and push notifications degrade gracefully. Queue replays when Pub/Sub recovers — 7-day message retention.</li>
          <li><strong>ML spam filter outage:</strong> Fallback to rule-based filter (SPF/DKIM/blacklists). Spam rate increases temporarily. ML retroactively scans delivered mail when service recovers.</li>
          <li><strong>Redis cache failure:</strong> All reads fall through to Spanner. 3-5x latency increase for inbox loads, but functionally correct. Redis repopulated on read-through within minutes.</li>
        </ul>
        <strong>Failover Runbook</strong>
        <div class="code-box">Region failover procedure:
1. Alert: SLO burn rate &gt;5x for &gt;5 minutes
2. Auto: GFE anycast DNS updates within 30s
3. Auto: Spanner re-elects leaders in remaining regions
4. Manual check: Verify inbound MX queue draining
5. Manual: Update status.google.com incident post
6. Monitor: Confirm RPS and error rates normalise
7. Post-incident: Automated blameless postmortem
   (5 Whys, timeline, action items in 24h)</div>
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
        <strong>Historical Evolution</strong>
        <ul>
          <li><strong>2004 — GFS + Bigtable monolith:</strong> Original Gmail ran on GFS v1 and early Bigtable. Single-service Java binary handling all email operations.</li>
          <li><strong>2008 — GFS2 (Colossus):</strong> Replaced GFS with Colossus (GFS2) for better scalability and reduced master bottleneck. Zero user-visible migration — transparent at storage layer.</li>
          <li><strong>2012-2015 — Microservice decomposition:</strong> Monolith split into Compose, Inbox, Thread, Search, Spam services. Strangler fig pattern — new requests routed to new services, old code kept as fallback.</li>
          <li><strong>2017 — Spanner for metadata:</strong> Migrated from Bigtable to Spanner for message metadata to get ACID transactions for label operations. Dual-write period (6 months) with validation before full cutover.</li>
          <li><strong>2020 — TPU inference for ML:</strong> Spam filter inference migrated from GPU clusters to TPU v3/v4. A/B tested for accuracy parity before cutover.</li>
        </ul>
      </div>
      <div>
        <strong>Key Migration Patterns Used</strong>
        <ul>
          <li><strong>Strangler Fig:</strong> New microservice deployed alongside monolith. Feature flag routes % of traffic to new service. Old service remains until 100% migrated and validated.</li>
          <li><strong>Dual-Write:</strong> During data store migrations, write to both old and new store. Validate consistency with shadow reads. Cut over reads when confidence reaches 100%.</li>
          <li><strong>Expand-Contract (parallel change) for schemas:</strong> Add nullable column → backfill → switch writes to new column → validate → remove old column. Each phase deployed separately.</li>
          <li><strong>Feature flags for database migration:</strong> "use_spanner" flag at user granularity — migrate 0.1% → 1% → 10% → 100% over weeks. Roll back instantly if issues.</li>
          <li><strong>Shadow traffic:</strong> New service receives copy of all production traffic, results compared but responses discarded. Validates correctness at scale before real user traffic.</li>
        </ul>
        <strong>Workspace Migration (Enterprise)</strong>
        <ul>
          <li>GAMLS (Gmail Migration API) for bulk email migration from Exchange/Outlook</li>
          <li>IMAP-based migration with per-user rate limiting (10 emails/sec) to avoid overload</li>
          <li>Preserves folder hierarchy → Gmail labels mapping</li>
          <li>Progress tracking dashboard for IT admins</li>
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
      <tr class="pt-header"><th>Question</th><th>Answer</th><th>Key Insight</th></tr>
      <tr class="pt-row"><td class="pt-name">How would you store 15 GB of email per user for 1.8B users?</td><td>Colossus (GFS2) with content-addressable storage and deduplication. Erasure coding for cold data. Tiered storage (Standard → Nearline → Coldline).</td><td>Dedup of attachments saves ~30%. Erasure coding reduces 3x replication to 1.5x for cold data — critical at exabyte scale.</td></tr>
      <tr class="pt-row"><td class="pt-name">How does Gmail implement full-text search in &lt;200ms across years of email?</td><td>Per-user inverted index in Bigtable (row key: user_id#field#term). Async indexing pipeline. Posting list intersection with TF-IDF ranking.</td><td>Per-user index (not shared) means user's mailbox search never contends with others. Row key design enables efficient range scans.</td></tr>
      <tr class="pt-row"><td class="pt-name">How does spam filtering work at 464K emails/sec?</td><td>Multi-layer: IP/SPF/DKIM at MTA (blocks 80%), then ML model on TF Serving/TPU (&lt;10ms). Online learning updates model every 15 minutes from user feedback.</td><td>80% blocked at connection level before any content processing — massive cost saving. Layer 1 protects ML Layer from being overwhelmed.</td></tr>
      <tr class="pt-row"><td class="pt-name">How do you ensure an email is never lost even during Google datacenter failure?</td><td>Colossus 3-way sync replication + Spanner Paxos across 5 replicas (2+ regions). MTA inbound queue persists independently. RPO = 0 for in-flight writes.</td><td>Email sits in MTA queue until Colossus/Spanner ACK. No data loss window. Paxos majority (3/5) means 2 region failures tolerated.</td></tr>
      <tr class="pt-row"><td class="pt-name">How does Gmail sync across multiple devices in real-time?</td><td>historyId monotonic sequence per user. Delta sync API: client sends last historyId, server returns all changes since. Push via FCM/APNs/SSE triggers delta fetch.</td><td>Pull the delta on push notification — avoids sending sensitive content in push payload. historyId acts as vector clock for eventual consistency.</td></tr>
      <tr class="pt-row"><td class="pt-name">How would you design the "mark as read" feature at scale?</td><td>Spanner transaction: UPDATE messages SET labels = ARRAY_REMOVE(labels, 'UNREAD') + Redis HINCRBY unread_count -1. historyId incremented. Pub/Sub event for sync.</td><td>Spanner gives strong consistency for the source of truth. Redis gives fast unread count reads. Async Pub/Sub propagates to other devices.</td></tr>
      <tr class="pt-row"><td class="pt-name">How does Gmail handle the Privacy concern of image proxying?</td><td>All &lt;img&gt; src in HTML emails rewritten to route through Google's Image Proxy (ci.googleusercontent.com). Google fetches, caches, and serves the image — user's IP never reaches sender's tracking server.</td><td>Protects user location/timing privacy. Prevents tracking pixels. Bonus: Google scans for malware. CDN caches → faster load for popular newsletter images.</td></tr>
      <tr class="pt-row"><td class="pt-name">How do you handle a user with 1 million emails searching for a rare term?</td><td>Bigtable row for user_id#body#rareterm has small posting list — fast scan. Date range filter pushdown on Bigtable row timestamp column. Index scan bounded by selectivity.</td><td>Bigtable's LSM-tree structure means small posting lists are extremely fast. Date-range pushdown avoids scanning all 1M emails when query has "after:2024" constraint.</td></tr>
      <tr class="pt-row"><td class="pt-name">How do you prevent a user from accidentally spamming 1 million recipients?</td><td>Per-user rate limits: 500 emails/day (personal), 2000/day (Workspace). Recipient list validation. Anomaly detection on sending patterns. Daily limit enforced via Redis token bucket.</td><td>Redis atomic DECR on sending quota token. Pre-validation before DKIM signing — refuse early rather than bouncing after send. Anomaly ML model flags sudden sending volume spikes.</td></tr>
      <tr class="pt-row"><td class="pt-name">Why did Gmail choose Spanner over MySQL for metadata storage?</td><td>Spanner provides horizontal scaling + ACID transactions + global consistency (via TrueTime) in one system. MySQL sharding required manual shard management + no cross-shard transactions + complex resharding.</td><td>Label operations (archive thread = update messages + threads + user_stats atomically) require distributed transactions. MySQL shards can't do cross-shard ACID. Spanner does.</td></tr>
    </table>
  </div>
</div>

<!-- SECTION 26: Trade-off Summary -->
<div class="ref-section">
  <div class="ref-title">26. Trade-off Summary</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;font-weight:bold;background:#1e293b;padding:8px 12px;border-radius:6px 6px 0 0;">
        <span>Decision</span><span style="color:#4ade80">Chosen Approach ✓</span><span style="color:#f87171">Alternative Trade-off ✗</span>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <span class="dt-name">Email body storage</span>
        <span class="dt-yes">Colossus (CAS + dedup): 30% storage savings, immutable blobs, hash-addressable, perfect dedup across users</span>
        <span class="dt-no">S3-like object store: simpler ops but no cross-user dedup, higher storage cost at exabyte scale</span>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <span class="dt-name">Metadata store</span>
        <span class="dt-yes">Spanner: ACID transactions for label operations, global consistency, no shard management, SQL queries</span>
        <span class="dt-no">Sharded MySQL: familiar but requires manual resharding, no cross-shard transactions, complex ops</span>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <span class="dt-name">Search index store</span>
        <span class="dt-yes">Bigtable: per-user row key design, high write throughput for indexing, cost-effective wide-column store</span>
        <span class="dt-no">Elasticsearch: richer query DSL, but single shared index makes per-user access control and scaling harder at Gmail scale</span>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <span class="dt-name">Web client push</span>
        <span class="dt-yes">SSE: simpler than WebSocket, works through HTTP/2 multiplexing, auto-reconnect, sufficient for email (server-to-client only)</span>
        <span class="dt-no">WebSocket: bidirectional but overkill for email; more complex server-side connection management at scale</span>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <span class="dt-name">Spam filtering approach</span>
        <span class="dt-yes">Multi-layer (IP blocklist → SPF/DKIM → ML): 80% blocked at L1 saves ML compute cost, ML handles nuanced cases</span>
        <span class="dt-no">ML-only for all email: highest accuracy but 10x ML compute cost since L1 never pre-filters obviously bad traffic</span>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <span class="dt-name">Attachment storage</span>
        <span class="dt-yes">GCS with tiered lifecycle policies: cost scales with access frequency, \$0.004/GB for cold data vs \$0.02 for hot</span>
        <span class="dt-no">Colossus for attachments too: simpler but no tiered pricing, erasure coding less efficient for small objects than large</span>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <span class="dt-name">Search index consistency</span>
        <span class="dt-yes">Eventual consistency (async via Pub/Sub, ~2s lag): decouples indexing from delivery path, delivery fast and reliable</span>
        <span class="dt-no">Synchronous indexing: search immediately consistent after send but adds 200ms+ to delivery SLA, blocks on indexer availability</span>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <span class="dt-name">Thread grouping</span>
        <span class="dt-yes">Multi-signal (In-Reply-To + subject + participants): handles edge cases (missing headers, forwarded mail) at cost of complexity</span>
        <span class="dt-no">Strict In-Reply-To only: simpler but breaks for clients that strip headers or for manually typed re: replies</span>
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
        <li><strong>Per-user data locality is the master key:</strong> Every storage design decision (Spanner PRIMARY KEY, Bigtable row key, Colossus naming) uses user_id as the shard/locality key — ensures user operations scan only their own data, never scanning other users' datasets.</li>
        <li><strong>Multi-layer defence beats single powerful filter:</strong> Blocking 80% of spam at the IP/protocol layer before ML inference is the single most important cost optimisation — ML is expensive per message; let cheap rules protect it.</li>
        <li><strong>Async everything that can be async:</strong> Search indexing, push notifications, spam model retraining, attachment virus scanning, and thumbnail generation are all async via Pub/Sub — delivery path stays fast and reliable regardless of downstream service health.</li>
        <li><strong>historyId delta sync is elegant:</strong> Rather than polling or WebSocket streaming of full state, a monotonically increasing per-user historyId lets any client efficiently sync only what changed since its last sync — works perfectly for offline-to-online reconnection on mobile.</li>
        <li><strong>Deduplication at the storage layer has outsized ROI:</strong> Content-addressable storage (CAS) in Colossus with SHA-256 dedup means viral emails with the same attachment are stored once — saving petabytes monthly at no application-layer complexity.</li>
        <li><strong>TrueTime + Spanner external consistency is a superpower:</strong> For label operations that must be atomically consistent across messages and threads, Spanner's distributed ACID transactions eliminate entire classes of bugs that sharded MySQL would suffer from (ghost unread counts, lost label changes).</li>
        <li><strong>SSE &gt; WebSocket for email push:</strong> Email is fundamentally server-to-client. SSE is simpler to operate, works through HTTP/2 connection reuse, and has built-in reconnect — WebSocket's bidirectional complexity is not justified unless real-time typing (Smart Compose) is required.</li>
      </ul>
    </div>
  </div>
</div>
`;
