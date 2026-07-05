window.Pages['sd-linkedin'] = `
<div class="page-header">
  <div class="breadcrumb">System Design › <span>LinkedIn Professional Network</span></div>
  <h1>💼 LinkedIn — Professional Social Network System Design</h1>
  <p>Graph-centric professional network connecting 950M+ members, powering job search, feed ranking, messaging, and recruiter tools at global scale with sub-second graph traversal</p>
</div>

<div class="ref-section">
  <div class="ref-title">System Architecture Diagram</div>
  <div class="ref-body" style="overflow-x:auto;">
    <svg viewBox="0 0 900 440" style="width:100%;max-width:900px;display:block;margin:0 auto;border-radius:10px;" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#4b5563"/>
        </marker>
      </defs>
      <rect width="900" height="440" fill="#0d1117" rx="10"/>
      <!-- CLIENT -->
      <text x="20" y="30" font-size="10" fill="#888" font-family="monospace">CLIENT</text>
      <rect x="15" y="38" width="100" height="52" rx="7" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="65" y="58" text-anchor="middle" font-size="13" fill="#e2e8f0">💻</text>
      <text x="65" y="72" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">Browser/App</text>
      <text x="65" y="83" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Web/iOS/Android</text>
      <line x1="115" y1="64" x2="148" y2="64" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <!-- API GATEWAY -->
      <text x="152" y="30" font-size="10" fill="#888" font-family="monospace">GATEWAY</text>
      <rect x="150" y="38" width="105" height="52" rx="7" fill="#1f2a1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="202" y="58" text-anchor="middle" font-size="13" fill="#e2e8f0">🔀</text>
      <text x="202" y="72" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">API Gateway</text>
      <text x="202" y="83" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Auth/RateLimit</text>
      <line x1="255" y1="64" x2="288" y2="64" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <!-- SERVICES -->
      <text x="292" y="30" font-size="10" fill="#888" font-family="monospace">CORE SERVICES</text>
      <rect x="290" y="38" width="100" height="52" rx="7" fill="#1f2030" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="340" y="57" text-anchor="middle" font-size="12" fill="#e2e8f0">📰</text>
      <text x="340" y="70" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">Feed Service</text>
      <text x="340" y="82" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Ranking/Scoring</text>
      <rect x="400" y="38" width="100" height="52" rx="7" fill="#1f2030" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="450" y="57" text-anchor="middle" font-size="12" fill="#e2e8f0">🕸️</text>
      <text x="450" y="70" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">Graph Service</text>
      <text x="450" y="82" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Connections/2nd°</text>
      <rect x="510" y="38" width="100" height="52" rx="7" fill="#1f2030" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="560" y="57" text-anchor="middle" font-size="12" fill="#e2e8f0">💬</text>
      <text x="560" y="70" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">Messaging</text>
      <text x="560" y="82" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Inmail/Chat</text>
      <rect x="620" y="38" width="100" height="52" rx="7" fill="#1f2030" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="670" y="57" text-anchor="middle" font-size="12" fill="#e2e8f0">🔍</text>
      <text x="670" y="70" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">Search Service</text>
      <text x="670" y="82" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Galene/Elastic</text>
      <rect x="730" y="38" width="100" height="52" rx="7" fill="#1f2030" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="780" y="57" text-anchor="middle" font-size="12" fill="#e2e8f0">💼</text>
      <text x="780" y="70" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">Jobs Service</text>
      <text x="780" y="82" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Recruiter/Apply</text>
      <!-- Arrows services → data layer -->
      <line x1="340" y1="90" x2="340" y2="148" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="450" y1="90" x2="450" y2="148" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="560" y1="90" x2="560" y2="148" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="670" y1="90" x2="670" y2="148" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <!-- STREAMING / KAFKA -->
      <text x="292" y="145" font-size="10" fill="#888" font-family="monospace">STREAMING</text>
      <rect x="290" y="153" width="140" height="50" rx="7" fill="#271f10" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="360" y="172" text-anchor="middle" font-size="12" fill="#e2e8f0">📨</text>
      <text x="360" y="185" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">Kafka (Brooklin)</text>
      <text x="360" y="196" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Fan-out / Events</text>
      <!-- DATA STORES -->
      <text x="292" y="230" font-size="10" fill="#888" font-family="monospace">DATA STORES</text>
      <rect x="290" y="238" width="100" height="52" rx="7" fill="#1a2020" stroke="#34d399" stroke-width="1.5"/>
      <text x="340" y="258" text-anchor="middle" font-size="12" fill="#e2e8f0">🗄️</text>
      <text x="340" y="271" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">Espresso</text>
      <text x="340" y="282" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Profile NoSQL</text>
      <rect x="400" y="238" width="100" height="52" rx="7" fill="#1a2020" stroke="#34d399" stroke-width="1.5"/>
      <text x="450" y="258" text-anchor="middle" font-size="12" fill="#e2e8f0">🕸️</text>
      <text x="450" y="271" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">Voldemort</text>
      <text x="450" y="282" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Graph KV Store</text>
      <rect x="510" y="238" width="100" height="52" rx="7" fill="#1a2020" stroke="#34d399" stroke-width="1.5"/>
      <text x="560" y="258" text-anchor="middle" font-size="12" fill="#e2e8f0">📊</text>
      <text x="560" y="271" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">Pinot</text>
      <text x="560" y="282" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Analytics OLAP</text>
      <rect x="620" y="238" width="100" height="52" rx="7" fill="#1a2020" stroke="#34d399" stroke-width="1.5"/>
      <text x="670" y="258" text-anchor="middle" font-size="12" fill="#e2e8f0">⚡</text>
      <text x="670" y="271" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">Redis</text>
      <text x="670" y="282" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Feed Cache</text>
      <rect x="730" y="238" width="100" height="52" rx="7" fill="#1a2020" stroke="#34d399" stroke-width="1.5"/>
      <text x="780" y="258" text-anchor="middle" font-size="12" fill="#e2e8f0">🔍</text>
      <text x="780" y="271" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">Galene</text>
      <text x="780" y="282" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Search Index</text>
      <!-- Kafka -> stores -->
      <line x1="360" y1="203" x2="340" y2="238" stroke="#4b5563" stroke-width="1" marker-end="url(#arr)"/>
      <line x1="360" y1="203" x2="450" y2="238" stroke="#4b5563" stroke-width="1" marker-end="url(#arr)"/>
      <line x1="360" y1="203" x2="560" y2="238" stroke="#4b5563" stroke-width="1" marker-end="url(#arr)"/>
      <!-- ML / NOTIFICATIONS -->
      <text x="20" y="230" font-size="10" fill="#888" font-family="monospace">ML / NOTIFY</text>
      <rect x="15" y="238" width="100" height="52" rx="7" fill="#1f1a2a" stroke="#f472b6" stroke-width="1.5"/>
      <text x="65" y="258" text-anchor="middle" font-size="12" fill="#e2e8f0">🤖</text>
      <text x="65" y="271" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">ML Platform</text>
      <text x="65" y="282" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Feed/Job Rank</text>
      <rect x="130" y="238" width="100" height="52" rx="7" fill="#1f1a2a" stroke="#f472b6" stroke-width="1.5"/>
      <text x="180" y="258" text-anchor="middle" font-size="12" fill="#e2e8f0">🔔</text>
      <text x="180" y="271" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">Notifications</text>
      <text x="180" y="282" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Push/Email/SMS</text>
      <!-- CDN -->
      <rect x="15" y="338" width="100" height="52" rx="7" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="65" y="358" text-anchor="middle" font-size="12" fill="#e2e8f0">🌐</text>
      <text x="65" y="371" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">CDN</text>
      <text x="65" y="382" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Media/Assets</text>
      <text x="20" y="330" font-size="10" fill="#888" font-family="monospace">CDN</text>
      <!-- Legend -->
      <rect x="20" y="408" width="12" height="10" rx="2" fill="#1f2030" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="36" y="418" font-size="9" fill="#94a3b8" font-family="monospace">Services</text>
      <rect x="110" y="408" width="12" height="10" rx="2" fill="#1a2020" stroke="#34d399" stroke-width="1.5"/>
      <text x="126" y="418" font-size="9" fill="#94a3b8" font-family="monospace">Storage</text>
      <rect x="200" y="408" width="12" height="10" rx="2" fill="#271f10" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="216" y="418" font-size="9" fill="#94a3b8" font-family="monospace">Streaming</text>
      <rect x="300" y="408" width="12" height="10" rx="2" fill="#1f1a2a" stroke="#f472b6" stroke-width="1.5"/>
      <text x="316" y="418" font-size="9" fill="#94a3b8" font-family="monospace">ML/Notify</text>
    </svg>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">1. Executive Summary</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Problem</strong><br/>Design LinkedIn's professional network — profile storage, connection graph, activity feed, job search, and messaging for 950M+ members globally.
        <br/><br/><strong>Scale</strong><br/>950M members · 300M monthly actives · 15B+ connections · 9M job posts · 3B feed updates/day
        <br/><br/><strong>Key Challenges</strong><br/>• 2nd/3rd-degree graph traversal at low latency<br/>• Feed ranking with ML personalization<br/>• Job recommendation freshness<br/>• Search across profiles, jobs, companies
      </div>
      <div>
        <table class="pattern-table">
          <tr class="pt-header"><th class="pt-name">Type</th><th>Requirement</th></tr>
          <tr class="pt-row"><td class="pt-name">FR</td><td>Connect/follow users; post updates; job search; messaging</td></tr>
          <tr class="pt-row"><td class="pt-name">FR</td><td>Feed: ranked activity from connections + recommendations</td></tr>
          <tr class="pt-row"><td class="pt-name">FR</td><td>Profile with skills, endorsements, experience</td></tr>
          <tr class="pt-row"><td class="pt-name">NFR</td><td>Feed p99 &lt; 500ms; search p99 &lt; 300ms</td></tr>
          <tr class="pt-row"><td class="pt-name">NFR</td><td>99.99% uptime; graph traversal 2°+ in &lt; 200ms</td></tr>
          <tr class="pt-row"><td class="pt-name">NFR</td><td>GDPR/data privacy; right to be forgotten</td></tr>
        </table>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">2. Capacity Estimation</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><th class="pt-name">Metric</th><th>Assumption</th><th>Calculation</th><th>Result</th></tr>
      <tr class="pt-row"><td class="pt-name">MAU</td><td>300M monthly actives</td><td>300M users</td><td>300M MAU</td></tr>
      <tr class="pt-row"><td class="pt-name">Feed reads</td><td>5 feed loads/user/day</td><td>300M×0.3×5/86400</td><td>~5,200 RPS</td></tr>
      <tr class="pt-row"><td class="pt-name">Posts/day</td><td>3B feed updates</td><td>3B/86400</td><td>~35,000 writes/s</td></tr>
      <tr class="pt-row"><td class="pt-name">Graph edges</td><td>15B connections</td><td>avg 16 bytes/edge</td><td>~240 GB graph</td></tr>
      <tr class="pt-row"><td class="pt-name">Profile storage</td><td>950M profiles, 10KB avg</td><td>950M × 10KB</td><td>~9.5 TB</td></tr>
      <tr class="pt-row"><td class="pt-name">Search index</td><td>950M profiles + 9M jobs</td><td>~500 bytes/doc indexed</td><td>~480 GB index</td></tr>
    </table>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">3. API Design</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><th class="pt-name">Method</th><th>Endpoint</th><th>Description</th></tr>
      <tr class="pt-row"><td class="pt-name">GET</td><td>/v2/feed?userId&amp;cursor</td><td>Ranked feed for user</td></tr>
      <tr class="pt-row"><td class="pt-name">POST</td><td>/v2/posts</td><td>Create post/update</td></tr>
      <tr class="pt-row"><td class="pt-name">POST</td><td>/v2/connections</td><td>Send connection request</td></tr>
      <tr class="pt-row"><td class="pt-name">GET</td><td>/v2/network/connections?degree=2</td><td>Graph traversal</td></tr>
      <tr class="pt-row"><td class="pt-name">GET</td><td>/v2/search?q&amp;type=people|jobs|companies</td><td>Unified search</td></tr>
      <tr class="pt-row"><td class="pt-name">POST</td><td>/v2/messaging/threads</td><td>InMail / messaging</td></tr>
    </table>
    <div class="code-box">GET /v2/feed?userId=U123&cursor=abc&limit=20
→ { items: [{postId, actor, content, reactions, rankScore}], nextCursor }</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">4. High-Level Design</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step">Client</div><div class="flow-arrow">→</div>
      <div class="flow-step">API Gateway</div><div class="flow-arrow">→</div>
      <div class="flow-step">Feed/Graph/Search Services</div><div class="flow-arrow">→</div>
      <div class="flow-step">Kafka (Brooklin)</div><div class="flow-arrow">→</div>
      <div class="flow-step">Espresso / Voldemort / Pinot</div>
    </div>
    <p>Services are independently deployed. All writes go through Kafka for fan-out. Graph reads from Voldemort KV; profile reads from Espresso NoSQL. Analytics from Pinot.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">5. Core Services</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><th class="pt-name">Service</th><th>Responsibility</th><th>Tech</th></tr>
      <tr class="pt-row"><td class="pt-name">Feed Service</td><td>Pull ranked feed; apply ML scoring; cursor pagination</td><td>Java, Redis, Kafka</td></tr>
      <tr class="pt-row"><td class="pt-name">Graph Service</td><td>Store/query 1°-3° connections, shared connections</td><td>Voldemort KV, in-memory graph</td></tr>
      <tr class="pt-row"><td class="pt-name">Profile Service</td><td>CRUD profile, skills, endorsements, experience</td><td>Espresso NoSQL (MySQL-based)</td></tr>
      <tr class="pt-row"><td class="pt-name">Search Service</td><td>Full-text + faceted search across people/jobs/companies</td><td>Galene (Lucene-based)</td></tr>
      <tr class="pt-row"><td class="pt-name">Jobs Service</td><td>Job posting, application tracking, recruiter tools</td><td>MySQL, Elasticsearch</td></tr>
      <tr class="pt-row"><td class="pt-name">Messaging Service</td><td>InMail, real-time chat, thread management</td><td>Kafka, Couchbase, WebSocket</td></tr>
      <tr class="pt-row"><td class="pt-name">Notification Service</td><td>Push, email, in-app; fan-out via Kafka</td><td>Kafka consumers, Firebase</td></tr>
    </table>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">6. Database Design</div>
  <div class="ref-body">
    <div class="code-box">-- Profile Store (Espresso/NoSQL)
member_id (PK) | snapshot_json | updated_at | version

-- Connection Graph (Voldemort KV)
key: "connections:{memberId}" → value: sorted_set of {connId, connectedAt, strength}
key: "followers:{memberId}" → value: sorted_set of follower_ids

-- Activity / Feed (Kafka + Time-series)
post_id (UUID) | author_id | content | media_keys[] | created_at | visibility

-- Jobs (MySQL sharded)
job_id | company_id | title | description | location | skills_required | posted_at | status</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">7. Data Flow — Feed Generation</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step">User Posts</div><div class="flow-arrow">→</div>
      <div class="flow-step">Post Service → Kafka</div><div class="flow-arrow">→</div>
      <div class="flow-step">Fan-out Worker (Brooklin)</div><div class="flow-arrow">→</div>
      <div class="flow-step">Feed Store (Redis sorted set)</div><div class="flow-arrow">→</div>
      <div class="flow-step">ML Ranker</div><div class="flow-arrow">→</div>
      <div class="flow-step">Client Feed</div>
    </div>
    <p><strong>Push model</strong> for users with &lt;10K followers. <strong>Pull model</strong> for celebrities/influencers — feed assembled on read from raw Kafka topic.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">8. Caching Strategy</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><th class="pt-name">Layer</th><th>What</th><th>TTL</th></tr>
      <tr class="pt-row"><td class="pt-name">Redis L1</td><td>Pre-computed ranked feed per user</td><td>10 min</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis L2</td><td>Profile snapshot (name, headline, photo)</td><td>5 min</td></tr>
      <tr class="pt-row"><td class="pt-name">In-proc</td><td>Connection count, 1° set for hot users</td><td>30 s</td></tr>
      <tr class="pt-row"><td class="pt-name">CDN</td><td>Profile photos, company logos</td><td>7 days</td></tr>
    </table>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">9. Message Queues</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><th class="pt-name">Topic</th><th>Producer</th><th>Consumer</th></tr>
      <tr class="pt-row"><td class="pt-name">member.activity</td><td>Post/React/Comment Services</td><td>Feed fan-out, Analytics</td></tr>
      <tr class="pt-row"><td class="pt-name">connection.events</td><td>Graph Service</td><td>Notifications, ML features</td></tr>
      <tr class="pt-row"><td class="pt-name">job.applications</td><td>Jobs Service</td><td>ATS, recruiter alerts</td></tr>
      <tr class="pt-row"><td class="pt-name">profile.updates</td><td>Profile Service</td><td>Search index update, Recs</td></tr>
    </table>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">10. Real-time Features</div>
  <div class="ref-body">
    <p><strong>Messaging:</strong> WebSocket connections via LinkedIn's Akka-based gateway. Messages stored in Couchbase; delivered via Kafka consumer per connection pool.</p>
    <p><strong>Live notifications:</strong> Server-Sent Events (SSE) for connection requests, job alerts, post likes. Fallback to long-poll.</p>
    <p><strong>Who viewed your profile:</strong> Near-real-time via Redis HyperLogLog with Kafka flush to Pinot for analytics.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">11. Consistency Model</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><th class="pt-name">Data</th><th>Consistency</th><th>Rationale</th></tr>
      <tr class="pt-row"><td class="pt-name">Profile</td><td>Eventual (seconds)</td><td>Read-your-writes via sticky sessions</td></tr>
      <tr class="pt-row"><td class="pt-name">Connections</td><td>Strong</td><td>Mutual connection must be atomic</td></tr>
      <tr class="pt-row"><td class="pt-name">Feed</td><td>Eventual</td><td>Stale feed acceptable; freshness via TTL</td></tr>
      <tr class="pt-row"><td class="pt-name">Messages</td><td>Strong (at-least-once)</td><td>No lost messages; idempotent delivery</td></tr>
    </table>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">12. Search Architecture</div>
  <div class="ref-body">
    <p><strong>Galene</strong> — LinkedIn's custom Lucene-based distributed search engine. Indexes: People, Jobs, Companies, Posts, Groups.</p>
    <div class="code-box">Search Query Pipeline:
1. Query parsing (NLP intent: people vs job vs company)
2. Boolean retrieval from Galene shards
3. Feature extraction (profile strength, connection distance, activity)
4. Learning-to-rank (LTR) model scoring
5. Diversification + pagination</div>
    <p>Profile updates trigger Kafka → search indexer (near real-time, ~5s lag).</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">13. CDN &amp; Media</div>
  <div class="ref-body">
    <p>Profile photos, banner images, and videos stored in LinkedIn's media infrastructure backed by Azure Blob Storage. CDN edge pops in 30+ regions. Video transcoding via Media Processing Service (MPS) — outputs multiple resolutions.</p>
    <div class="tip-box">Media upload: direct client → presigned URL → blob storage → async transcoding → CDN URL returned to client.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">14. Security</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><th class="pt-name">Concern</th><th>Mechanism</th></tr>
      <tr class="pt-row"><td class="pt-name">Auth</td><td>OAuth 2.0 + LinkedIn SSO; JWT tokens (15min) + refresh tokens (30 days)</td></tr>
      <tr class="pt-row"><td class="pt-name">API abuse</td><td>Rate limiting per IP + member; Bot detection via ML</td></tr>
      <tr class="pt-row"><td class="pt-name">Data privacy</td><td>GDPR right-to-delete; profile visibility settings; connection degree filtering</td></tr>
      <tr class="pt-row"><td class="pt-name">InMail spam</td><td>ML spam classifier; InMail credit system limits bulk outreach</td></tr>
    </table>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">15. Scalability</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><th class="pt-name">Component</th><th>Strategy</th></tr>
      <tr class="pt-row"><td class="pt-name">Espresso</td><td>Horizontal sharding by member_id; replication factor 3</td></tr>
      <tr class="pt-row"><td class="pt-name">Voldemort</td><td>Consistent hashing; 3 replicas; read repair on quorum</td></tr>
      <tr class="pt-row"><td class="pt-name">Kafka</td><td>Topic partitioning by member_id; 100s of partitions</td></tr>
      <tr class="pt-row"><td class="pt-name">Feed Service</td><td>Stateless pods; auto-scale on CPU; Redis cluster for cache</td></tr>
      <tr class="pt-row"><td class="pt-name">Galene</td><td>Index sharding; query fan-out across shards; result merge</td></tr>
    </table>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">16. Fault Tolerance</div>
  <div class="ref-body">
    <p>• <strong>Circuit breakers</strong> on all inter-service calls (Hystrix/Resilience4j)<br/>
    • <strong>Bulkheads</strong>: feed, search, messaging on separate thread pools<br/>
    • <strong>Graceful degradation</strong>: cached/stale feed returned if ranking ML is slow<br/>
    • <strong>Kafka replay</strong>: 7-day retention allows reprocessing on consumer failure<br/>
    • <strong>Multi-AZ</strong> Voldemort + Espresso deployments; automatic leader election</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">17. Monitoring &amp; Observability</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><th class="pt-name">Layer</th><th>Tool / Metric</th></tr>
      <tr class="pt-row"><td class="pt-name">Metrics</td><td>InGraphs (LinkedIn's internal metrics) + Grafana dashboards</td></tr>
      <tr class="pt-row"><td class="pt-name">Tracing</td><td>Distributed tracing across services (Jaeger)</td></tr>
      <tr class="pt-row"><td class="pt-name">Alerting</td><td>Feed p99 latency, Kafka consumer lag, graph traversal time</td></tr>
      <tr class="pt-row"><td class="pt-name">A/B Testing</td><td>LinkedIn's XLNT framework for feed algorithm experiments</td></tr>
    </table>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">18. Deployment</div>
  <div class="ref-body">
    <p>Services deployed on Kubernetes (LinkedIn migrated from their own orchestration). Azure cloud (Microsoft acquisition). Multi-region active-active for NA/EMEA/APAC. Feature flags via LinkedIn's internal config service. Blue-green deployments for zero-downtime releases.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">19. Performance Optimizations</div>
  <div class="ref-body">
    <p>• <strong>Feed assembly</strong>: pre-compute top 200 feed items per user; ML re-rank on read<br/>
    • <strong>Graph queries</strong>: BFS limited to depth 3; result capped at 500 nodes per traversal<br/>
    • <strong>Predictive prefetch</strong>: preload next page of feed on 70% scroll<br/>
    • <strong>Protocol Buffers</strong> for all internal service communication<br/>
    • <strong>Connection pooling</strong> to Espresso/Voldemort via per-pod connection pools</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">20. Cost Optimization</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><th class="pt-name">Area</th><th>Strategy</th></tr>
      <tr class="pt-row"><td class="pt-name">Cold profiles</td><td>Tier inactive profiles to cheap blob; warm on access</td></tr>
      <tr class="pt-row"><td class="pt-name">Kafka retention</td><td>7-day default; compress with Snappy</td></tr>
      <tr class="pt-row"><td class="pt-name">ML inference</td><td>Batch pre-ranking during off-peak; GPU spot instances</td></tr>
      <tr class="pt-row"><td class="pt-name">CDN</td><td>Aggressive caching of media; WebP/HEIC format conversion</td></tr>
    </table>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">21. Disaster Recovery</div>
  <div class="ref-body">
    <p><strong>RTO:</strong> &lt; 4 hours | <strong>RPO:</strong> &lt; 5 minutes<br/>
    Voldemort and Espresso replicated cross-region. Kafka cross-region mirroring via Brooklin MirrorMaker. Weekly chaos engineering drills.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">22. Migration Strategy</div>
  <div class="ref-body">
    <p>LinkedIn's famous <strong>Project Inversion</strong> (2011-2015): migrated from monolith to 30+ microservices. Key pattern: strangle-fig — new services shadow production traffic for weeks before cutover. Each service owns its data store.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">23. Interview Q&amp;A</div>
  <div class="ref-body">
    <div class="tip-box"><span class="ans-label">Q</span> How do you handle "People You May Know" recommendations?<br/><span class="ans-label">A</span> Graph BFS up to 2° connections → feature vectors (shared connections, same company, same school) → ML classifier → ranked list cached in Redis per user, refreshed daily.</div>
    <div class="tip-box"><span class="ans-label">Q</span> How does feed ranking work?<br/><span class="ans-label">A</span> Candidate generation (graph-based + viral) → feature extraction (engagement history, actor relationship, content type) → LTR model (XGBoost/neural) → diversity injection → final ranked list.</div>
    <div class="tip-box"><span class="ans-label">Q</span> How do you scale graph traversal to 950M nodes?<br/><span class="ans-label">A</span> Voldemort stores adjacency lists as KV. In-memory graph cache for hot nodes. BFS capped at depth 3. Distributed across shards; aggregated by Graph Service.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">24. Trade-offs</div>
  <div class="ref-body">
    <table class="decision-table">
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Decision</div><div class="dt-yes">Chosen Approach ✓</div><div class="dt-no">Alternative ✗</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Graph Store</div><div class="dt-yes">Voldemort KV (fast reads)</div><div class="dt-no">Neo4j (complex queries but slower at scale)</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Feed Model</div><div class="dt-yes">Push for normal users, pull for celebrities</div><div class="dt-no">Pure push (too expensive for 100M+ follower accounts)</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Search Engine</div><div class="dt-yes">Custom Galene (control over ranking)</div><div class="dt-no">Pure Elasticsearch (less control over ML integration)</div>
      </div>
    </table>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">25. Key Takeaways</div>
  <div class="ref-body">
    <p>• Graph is the core data model — Voldemort KV chosen for O(1) adjacency reads over graph DBs<br/>
    • Hybrid push/pull feed model is essential for handling celebrity accounts at scale<br/>
    • ML ranking is applied late in the pipeline to avoid recomputing on every request<br/>
    • Brooklin (Kafka-based) enables decoupled fan-out to 20+ downstream consumers<br/>
    • Galene's Lucene-based search allows tight ML/LTR integration for professional relevance</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">26. Parking Lot (Out of Scope / Extensions)</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><th class="pt-name">Feature</th><th>Notes</th></tr>
      <tr class="pt-row"><td class="pt-name">LinkedIn Learning</td><td>Separate content delivery platform; CDN-heavy video streaming</td></tr>
      <tr class="pt-row"><td class="pt-name">Sales Navigator</td><td>Advanced CRM + search product; separate data pipeline</td></tr>
      <tr class="pt-row"><td class="pt-name">LinkedIn Ads</td><td>B2B ad targeting using professional signals; separate bidding system</td></tr>
      <tr class="pt-row"><td class="pt-name">Live Video</td><td>LinkedIn Live built on Azure Media Services; RTMP ingest</td></tr>
      <tr class="pt-row"><td class="pt-name">Recruiter ATS</td><td>Applicant tracking system; CRM workflows for enterprise recruiters</td></tr>
      <tr class="pt-row"><td class="pt-name">Skills Graph</td><td>NLP-based skill taxonomy (30K+ skills) with ontology relationships</td></tr>
    </table>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">27. Summary Cheatsheet</div>
  <div class="ref-body">
    <div class="code-box">LinkedIn System Design — Quick Reference
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Scale:       950M members, 300M MAU, 15B edges, 3B feed events/day
Graph Store: Voldemort KV (adjacency lists, consistent hashing)
Profile DB:  Espresso (MySQL-based NoSQL, horizontally sharded)
Feed:        Kafka fan-out → Redis sorted set → ML re-rank on read
Search:      Galene (Lucene) + LTR model; near-real-time indexing
Streaming:   Brooklin (Kafka) — all async fan-out
Analytics:   Apache Pinot (real-time OLAP)
Messaging:   WebSocket + Kafka + Couchbase
CDN:         Azure CDN + blob storage for media
Auth:        OAuth 2.0, JWT 15-min + refresh 30-day</div>
  </div>
</div>
`;
