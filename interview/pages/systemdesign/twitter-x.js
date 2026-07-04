window.Pages['sd-twitter-x'] = `
<div class="page-header">
  <div class="breadcrumb">System Design › <span>Twitter / X (Social Platform)</span></div>
  <h1>🐦 Twitter / X — Social Platform System Design</h1>
  <p>Tweet fanout, home timeline generation, real-time trending, global search, and media delivery at 500M+ tweet/day scale</p>
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

      <!-- Layer labels -->
      <text x="14" y="74" font-size="11" fill="#888" font-family="monospace" transform="rotate(-90,14,74)">CLIENT</text>
      <text x="14" y="164" font-size="11" fill="#888" font-family="monospace" transform="rotate(-90,14,164)">GATEWAY</text>
      <text x="14" y="264" font-size="11" fill="#888" font-family="monospace" transform="rotate(-90,14,264)">SERVICES</text>
      <text x="14" y="374" font-size="11" fill="#888" font-family="monospace" transform="rotate(-90,14,374)">DATA</text>

      <!-- Layer bands -->
      <rect x="30" y="20" width="860" height="70" rx="6" fill="#ffffff08"/>
      <rect x="30" y="100" width="860" height="60" rx="6" fill="#ffffff06"/>
      <rect x="30" y="170" width="860" height="125" rx="6" fill="#ffffff05"/>
      <rect x="30" y="305" width="860" height="100" rx="6" fill="#ffffff06"/>

      <!-- CLIENT LAYER -->
      <rect x="60" y="32" width="110" height="46" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="115" y="52" font-size="12" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📱 Mobile</text>
      <text x="115" y="67" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">iOS / Android</text>

      <rect x="220" y="32" width="110" height="46" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="275" y="52" font-size="12" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🌐 Web</text>
      <text x="275" y="67" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">React SPA</text>

      <rect x="570" y="32" width="130" height="46" rx="8" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="635" y="52" font-size="12" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🌍 CDN</text>
      <text x="635" y="67" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Akamai/Fastly</text>

      <rect x="730" y="32" width="130" height="46" rx="8" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="795" y="52" font-size="12" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📦 S3 Media</text>
      <text x="795" y="67" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Images/Video</text>

      <!-- GATEWAY LAYER -->
      <rect x="330" y="112" width="240" height="36" rx="8" fill="#1a2d20" stroke="#4ade80" stroke-width="1.5"/>
      <text x="450" y="127" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🌐 API Gateway</text>
      <text x="450" y="141" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Auth · Rate Limit · Route · TLS</text>

      <!-- SERVICES LAYER -->
      <rect x="40" y="182" width="105" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="93" y="201" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">✍️ Tweet</text>
      <text x="93" y="217" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Tweet Svc</text>

      <rect x="158" y="182" width="108" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="212" y="201" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📰 Timeline</text>
      <text x="212" y="217" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Fanout Svc</text>

      <rect x="278" y="182" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="333" y="201" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">👤 User</text>
      <text x="333" y="217" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Follow Svc</text>

      <rect x="400" y="182" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="455" y="201" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🔍 Search</text>
      <text x="455" y="217" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Trending Svc</text>

      <rect x="522" y="182" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="577" y="201" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🔔 Notify</text>
      <text x="577" y="217" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Notif Svc</text>

      <rect x="644" y="182" width="100" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="694" y="201" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🖼️ Media</text>
      <text x="694" y="217" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Media Svc</text>

      <rect x="756" y="182" width="100" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="806" y="201" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">💰 Ads</text>
      <text x="806" y="217" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Ad Svc</text>

      <!-- Kafka -->
      <rect x="330" y="248" width="240" height="36" rx="8" fill="#2d2a1a" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="450" y="263" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📨 Kafka</text>
      <text x="450" y="277" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">tweet-events · fanout · notif-events</text>

      <!-- DATA LAYER -->
      <rect x="40" y="316" width="120" height="46" rx="8" fill="#1a2040" stroke="#60a5fa" stroke-width="1.5"/>
      <text x="100" y="336" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🗄️ MySQL</text>
      <text x="100" y="351" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Tweets/Users</text>

      <rect x="178" y="316" width="120" height="46" rx="8" fill="#2d1a1a" stroke="#f87171" stroke-width="1.5"/>
      <text x="238" y="336" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">⚡ Redis</text>
      <text x="238" y="351" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Home Timelines</text>

      <rect x="316" y="316" width="135" height="46" rx="8" fill="#1a2040" stroke="#34d399" stroke-width="1.5"/>
      <text x="384" y="336" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🗃️ Cassandra</text>
      <text x="384" y="351" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Activity / Social graph</text>

      <rect x="467" y="316" width="140" height="46" rx="8" fill="#1a2040" stroke="#34d399" stroke-width="1.5"/>
      <text x="537" y="336" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🔎 Elastic</text>
      <text x="537" y="351" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Search / Trending</text>

      <rect x="622" y="316" width="120" height="46" rx="8" fill="#1a2040" stroke="#60a5fa" stroke-width="1.5"/>
      <text x="682" y="336" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🐘 Hadoop</text>
      <text x="682" y="351" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Analytics</text>

      <rect x="758" y="316" width="110" height="46" rx="8" fill="#2d1f1a" stroke="#fb923c" stroke-width="1.5"/>
      <text x="813" y="336" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📊 Monitor</text>
      <text x="813" y="351" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Prometheus/DD</text>

      <!-- ARROWS: Client → Gateway -->
      <line x1="115" y1="78" x2="380" y2="112" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="275" y1="78" x2="420" y2="112" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- CDN to S3 -->
      <line x1="730" y1="55" x2="860" y2="55" stroke="#4b5563" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr)"/>

      <!-- ARROWS: Gateway → Services -->
      <line x1="380" y1="148" x2="150" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="400" y1="148" x2="265" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="430" y1="148" x2="380" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="460" y1="148" x2="455" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="490" y1="148" x2="540" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="510" y1="148" x2="660" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- ARROWS: Services → Kafka -->
      <line x1="93" y1="228" x2="340" y2="248" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="212" y1="228" x2="390" y2="248" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="455" y1="228" x2="455" y2="248" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="577" y1="228" x2="510" y2="248" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- ARROWS: Services → Data direct -->
      <line x1="93" y1="228" x2="100" y2="316" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="212" y1="228" x2="238" y2="316" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="455" y1="228" x2="510" y2="316" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- ARROWS: Kafka → Data -->
      <line x1="400" y1="284" x2="238" y2="316" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="440" y1="284" x2="384" y2="316" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="490" y1="284" x2="537" y2="316" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="530" y1="284" x2="682" y2="316" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Monitoring dashed -->
      <line x1="806" y1="228" x2="813" y2="316" stroke="#4b5563" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr)"/>
    </svg>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">1. Executive Summary</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Problem</div>
        <p>Build a microblogging platform where users post short messages (tweets) of up to 280 characters, follow other users, and receive a real-time personalized home timeline — all at a scale of hundreds of millions of daily active users and 500M+ tweets per day.</p>
        <div class="ans-label" style="margin-top:12px;">Scale Numbers (2024)</div>
        <ul>
          <li>350M+ monthly active users, 200M+ DAU</li>
          <li>500M tweets written per day (~5,800 tweets/sec avg)</li>
          <li>300B+ timeline reads per day (~3.5M reads/sec avg)</li>
          <li>Peak tweet write: ~150K tweets/sec (major events)</li>
          <li>Social graph: 500M+ follow relationships stored</li>
          <li>100M+ images, ~1B video views/day</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Core Challenges</div>
        <ul>
          <li><strong>Fanout problem:</strong> A celebrity with 100M followers posting a tweet requires writing to 100M timelines — the "thundering herd" write problem</li>
          <li><strong>Timeline generation:</strong> Show the most relevant, recent 800 tweets from up to thousands of followed accounts in &lt;200ms</li>
          <li><strong>Real-time trending:</strong> Surface trending topics globally and by geo from a firehose of 5K+ tweets/sec</li>
          <li><strong>Read vs write asymmetry:</strong> Reads outnumber writes 600:1 — optimise aggressively for reads</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Functional Requirements</div>
        <ul>
          <li>Post a tweet (text, images, videos, polls, threads)</li>
          <li>Follow / unfollow other users</li>
          <li>Home timeline: ordered feed from followed accounts</li>
          <li>User timeline: all tweets from a specific user</li>
          <li>Like, retweet, reply, quote tweet</li>
          <li>Search: full-text search of tweets &amp; users</li>
          <li>Trending topics (global &amp; geo-specific)</li>
          <li>Notifications: likes, retweets, follows, mentions</li>
          <li>Direct messages</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Non-Functional Requirements</div>
        <div class="pattern-table">
          <div class="pt-row pt-header"><div>NFR</div><div>Target</div><div>Why</div><div>Approach</div></div>
          <div class="pt-row"><div class="pt-name">Home Timeline Latency</div><div>&lt;200ms p99</div><div>Users abandon slow feeds</div><div>Pre-computed Redis lists (fanout-on-write)</div></div>
          <div class="pt-row"><div class="pt-name">Tweet Write Latency</div><div>&lt;500ms p99</div><div>Author needs immediate confirmation</div><div>Write to MySQL + async Kafka fanout</div></div>
          <div class="pt-row"><div class="pt-name">Availability</div><div>99.99%</div><div>Revenue-critical; outages go viral</div><div>Multi-AZ, circuit breakers, graceful degradation</div></div>
          <div class="pt-row"><div class="pt-name">Search Freshness</div><div>&lt;15 sec index lag</div><div>Breaking news must appear fast</div><div>Kafka → Elasticsearch near-real-time pipeline</div></div>
          <div class="pt-row"><div class="pt-name">Consistency</div><div>Eventual (timeline), Strong (tweet creation)</div><div>Timeline delay tolerable; duplicate tweet not</div><div>MySQL for writes; Redis for eventual read</div></div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">2. Capacity Estimation</div>
  <div class="ref-body">
    <p>Assumptions stated explicitly — interviewers score the reasoning, not the exact numbers.</p>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Metric</div><div>Assumption</div><div>Calculation</div><div>Result</div></div>
      <div class="pt-row"><div class="pt-name">DAU</div><div>200M daily active users</div><div>given</div><div>200M</div></div>
      <div class="pt-row"><div class="pt-name">Tweets/day</div><div>500M tweets written per day</div><div>500M / 86,400</div><div>~5,800 writes/sec avg</div></div>
      <div class="pt-row"><div class="pt-name">Peak tweet writes</div><div>25x average at major events</div><div>5,800 × 25</div><div>~145K writes/sec peak</div></div>
      <div class="pt-row"><div class="pt-name">Timeline reads/day</div><div>300B reads/day (600x write ratio)</div><div>300B / 86,400</div><div>~3.5M reads/sec avg</div></div>
      <div class="pt-row"><div class="pt-name">Peak timeline reads</div><div>10x average at peak hours</div><div>3.5M × 10</div><div>~35M reads/sec peak</div></div>
      <div class="pt-row"><div class="pt-name">Avg followers/user</div><div>200 followers avg, 100M for celebrities</div><div>Bimodal distribution</div><div>~208 avg, power-law tail</div></div>
      <div class="pt-row"><div class="pt-name">Fanout writes/tweet (avg user)</div><div>Tweet to user with 200 followers</div><div>5,800 writes/sec × 200</div><div>~1.16M Redis writes/sec</div></div>
      <div class="pt-row"><div class="pt-name">Home timeline cache size</div><div>800 tweet IDs cached per user, 8 bytes/ID</div><div>200M users × 800 × 8B</div><div>~1.28 TB RAM (Redis cluster)</div></div>
      <div class="pt-row"><div class="pt-name">Tweet storage/year</div><div>500M/day, avg 500 bytes/tweet (text+metadata)</div><div>500M × 365 × 500B</div><div>~91 TB/year (text)</div></div>
      <div class="pt-row"><div class="pt-name">Media storage/year</div><div>30% tweets have images (avg 200KB); 5% video</div><div>150M × 200KB + 25M × 5MB</div><div>~155 TB/day media ingested</div></div>
      <div class="pt-row"><div class="pt-name">Search index size</div><div>5 years of tweets, 3x expansion factor</div><div>91TB/yr × 5 × 3</div><div>~1.4 PB Elasticsearch</div></div>
      <div class="pt-row"><div class="pt-name">Network bandwidth (CDN)</div><div>1B video views/day at avg 500KB/view</div><div>1B × 500KB / 86,400</div><div>~5.8 TB/sec egress to CDN</div></div>
    </div>
    <div class="tip-box" style="margin-top:10px;">Key insight: The read/write ratio is 600:1. Every optimisation dollar should be spent on making reads faster. Pre-computed home timelines in Redis, not on-demand fan-in at read time, is the foundational choice that makes the whole system viable.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">3. APIs</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Endpoint</div><div>Method</div><div>Purpose</div><div>Auth</div></div>
      <div class="pt-row"><div class="pt-name">POST /v2/tweets</div><div>POST</div><div>Create a tweet</div><div>OAuth2 Bearer</div></div>
      <div class="pt-row"><div class="pt-name">GET /v2/timelines/home</div><div>GET</div><div>Fetch home timeline (paginated)</div><div>OAuth2 Bearer</div></div>
      <div class="pt-row"><div class="pt-name">GET /v2/users/:id/tweets</div><div>GET</div><div>Fetch user timeline</div><div>OAuth2 Bearer / Public</div></div>
      <div class="pt-row"><div class="pt-name">POST /v2/users/:id/following</div><div>POST</div><div>Follow a user</div><div>OAuth2 Bearer</div></div>
      <div class="pt-row"><div class="pt-name">DELETE /v2/users/:id/following/:tid</div><div>DELETE</div><div>Unfollow a user</div><div>OAuth2 Bearer</div></div>
      <div class="pt-row"><div class="pt-name">POST /v2/tweets/:id/like</div><div>POST</div><div>Like a tweet</div><div>OAuth2 Bearer</div></div>
      <div class="pt-row"><div class="pt-name">POST /v2/tweets/:id/retweets</div><div>POST</div><div>Retweet</div><div>OAuth2 Bearer</div></div>
      <div class="pt-row"><div class="pt-name">GET /v2/tweets/search/recent</div><div>GET</div><div>Full-text search (7-day window)</div><div>OAuth2 Bearer</div></div>
      <div class="pt-row"><div class="pt-name">GET /v2/trends/place</div><div>GET</div><div>Trending topics for a WOEID</div><div>OAuth2 Bearer</div></div>
      <div class="pt-row"><div class="pt-name">POST /v2/dm/events</div><div>POST</div><div>Send a direct message</div><div>OAuth2 Bearer</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Create Tweet — Request/Response</div>
        <div class="code-box">POST /v2/tweets
Headers:
  Authorization: Bearer &lt;oauth2_token&gt;
  Content-Type: application/json
  Idempotency-Key: uuid-v4

Request:
{
  "text": "Hello, Twitter / X! #SystemDesign",
  "reply": { "in_reply_to_tweet_id": null },
  "media": { "media_ids": ["1234567890"] },
  "geo": { "place_id": "df51dec6f4ee2b2c" }
}

Response 201:
{
  "data": {
    "id": "1750023456789012345",
    "text": "Hello, Twitter / X! #SystemDesign",
    "author_id": "999001234",
    "created_at": "2025-01-15T09:23:01.000Z",
    "public_metrics": {
      "retweet_count": 0,
      "like_count": 0,
      "reply_count": 0
    }
  }
}</div>
      </div>
      <div>
        <div class="ans-label">Home Timeline — Request/Response</div>
        <div class="code-box">GET /v2/timelines/home
  ?max_results=20
  &amp;pagination_token=7140w

Response 200:
{
  "data": [
    {
      "id": "1750023456789012345",
      "text": "...",
      "author_id": "...",
      "created_at": "..."
    }
  ],
  "meta": {
    "next_token": "7140x",
    "previous_token": "7140v",
    "result_count": 20,
    "newest_id": "175002...",
    "oldest_id": "174999..."
  }
}</div>
        <div class="ans-label" style="margin-top:10px;">API Design Standards</div>
        <ul>
          <li><strong>Pagination:</strong> Cursor-based (token), never offset — offset breaks under concurrent writes</li>
          <li><strong>Rate limits:</strong> 300 req/15min per user for read; 100 tweets/24h write (free tier)</li>
          <li><strong>Idempotency:</strong> Idempotency-Key header on tweet creation prevents duplicates on retry</li>
          <li><strong>Expansions:</strong> ?expansions=author_id,attachments.media_keys to reduce round-trips</li>
          <li><strong>Error codes:</strong> 400 (bad request), 401 (auth), 403 (forbidden), 404 (not found), 429 (rate limit), 503 (service unavailable)</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">4. High-Level Architecture</div>
  <div class="ref-body">
    <div class="code-box">┌─────────────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER                                   │
│  iOS App  |  Android App  |  React Web  |  Third-party API clients      │
└─────────────────┬───────────────────────────────────┬───────────────────┘
                  │ HTTPS / WSS                        │ CDN (static + media)
┌─────────────────▼───────────────────────────────────▼───────────────────┐
│              API GATEWAY  (Load Balancer + Auth + Rate Limit)            │
│         OAuth2 JWT validation · HTTPS termination · Route → Service      │
└────┬──────────┬──────────┬──────────┬──────────┬───────────┬────────────┘
     │          │          │          │          │           │
  Tweet Svc  Timeline  User/Follow  Search/   Notif Svc  Media Svc
             Fan-out     Svc       Trending
     │          │          │          │          │           │
     └──────────┴──────────┴──────────┴──────────┴───────────┘
                                 │
                           Kafka (event bus)
                                 │
          ┌──────────────────────┼──────────────────────┐
       MySQL               Redis Cluster            Cassandra
    (tweets, users)    (home timelines)          (social graph,
                                                  activity)
          │                                            │
    Elasticsearch                               Hadoop / HDFS
    (full-text search)                          (analytics, ML)</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Write Path (posting a tweet)</div>
        <ol>
          <li>Client POSTs tweet to API Gateway → Tweet Service</li>
          <li>Tweet Service validates, assigns Snowflake ID, writes to MySQL (primary)</li>
          <li>Returns 201 to client immediately (synchronous)</li>
          <li>Publishes tweet-event to Kafka topic "tweet-created"</li>
          <li>Timeline Fanout Service (Kafka consumer) reads followers from social graph, pushes tweet ID to each follower's Redis list (LPUSH + LTRIM to 800)</li>
          <li>Search Indexer (Kafka consumer) indexes tweet into Elasticsearch</li>
          <li>Notification Service (Kafka consumer) generates mention/reply notifications</li>
        </ol>
      </div>
      <div>
        <div class="ans-label">Read Path (loading home timeline)</div>
        <ol>
          <li>Client GETs /v2/timelines/home</li>
          <li>Timeline Service reads up to 800 tweet IDs from user's Redis list (LRANGE)</li>
          <li>Batch-fetches tweet objects from Redis tweet cache (MGET)</li>
          <li>Cache miss: fetch from MySQL read replica, populate cache</li>
          <li>Hydrate author metadata (user service → Redis user cache)</li>
          <li>Merge, sort by score (recency + engagement), return top 20 to client</li>
        </ol>
        <div class="ans-label" style="margin-top:10px;">Key Design Choices</div>
        <ul>
          <li><strong>Fanout on write</strong> vs fanout on read — pre-compute at write time; read is O(1)</li>
          <li><strong>Hybrid fanout</strong> for celebrities (100K+ followers) — skip fanout on write, inject at read time to avoid write amplification</li>
          <li><strong>Snowflake IDs</strong> — 64-bit sortable, time-ordered, distributed ID generation with no DB round-trip</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">5. Core Service: Timeline Fanout Service</div>
  <div class="ref-body">
    <p>The Timeline Fanout Service is the most critical and most architecturally interesting component of Twitter. Its job: when any user tweets, propagate that tweet ID to the home timeline lists of all their followers, fast enough that followers see it within seconds.</p>
    <div class="two-col">
      <div>
        <div class="ans-label">The Fanout Problem</div>
        <p>A normal user with 200 followers is easy — 200 Redis LPUSH operations. The challenge is power users:</p>
        <ul>
          <li>Elon Musk: ~170M followers → 170M Redis writes per tweet</li>
          <li>At 5,800 tweets/sec avg, a celebrity tweet storm can create billions of Redis writes/sec</li>
          <li>Naive fanout-on-write would overwhelm Redis and cause timeline delivery to lag by hours</li>
        </ul>
        <div class="ans-label" style="margin-top:10px;">Hybrid Fanout Strategy</div>
        <div class="code-box">FANOUT DECISION:
  if (user.follower_count &lt; 1,000,000):
    strategy = FANOUT_ON_WRITE
    // Push tweet_id to all follower timelines via Kafka workers
  else:
    strategy = FANOUT_ON_READ
    // Do NOT push to followers' Redis lists
    // At read time, merge: Redis(follower_list) + DB(celebrity_tweets)
    // Ceiling: follow up to 2,000 celebrities max per user

Merge at read time:
  timeline = merge_sorted(
    redis.lrange(user_timeline_key, 0, 800),
    db.get_celebrity_tweets(user.followed_celebrities, limit=50)
  )</div>
      </div>
      <div>
        <div class="ans-label">Redis Timeline Data Structure</div>
        <div class="code-box">Key:   timeline:{user_id}
Type:  Redis List (sorted by insertion = recency)
Ops:
  LPUSH  timeline:12345  tweet_snowflake_id
  LTRIM  timeline:12345  0  799   // cap at 800
  LRANGE timeline:12345  0   19   // read page 1

Example:
  LPUSH timeline:12345 1750023456789012345
  → list: [newest_tweet_id, ..., oldest_tweet_id]

Cache: tweet:{tweet_id} → full tweet JSON (String)
  TTL: 7 days for popular tweets, 24h for others
  MGET tweet:175... tweet:174... tweet:173...
       (batch fetch in single round-trip)</div>
        <div class="ans-label" style="margin-top:10px;">Fanout Workers (Kafka Consumers)</div>
        <ul>
          <li>Consumer group "fanout-workers" — 100+ partitions, 100+ consumer instances</li>
          <li>Each partition handles a shard of the user space</li>
          <li>On tweet event: read follower list from Cassandra social graph in batches of 5,000</li>
          <li>Pipeline Redis LPUSH+LTRIM calls in batches of 1,000 → Lua script for atomicity</li>
          <li>Max lag target: 5 seconds for non-celebrity tweets; 30 seconds acceptable for hybrid path</li>
          <li>Dead letter queue for failed fanouts — retry with exponential backoff up to 3x</li>
        </ul>
      </div>
    </div>
    <div class="ans-label" style="margin-top:14px;">Active vs Inactive User Optimisation</div>
    <div class="tip-box">Twitter discovered that 30%+ of followers are dormant (inactive for 30+ days). Fanout to dormant users wastes Redis memory and write throughput. Solution: skip fanout to users inactive for &gt;30 days. When they next log in, reconstruct their timeline on-demand (fanout-on-read for cold start). This alone reduced Redis write load by ~30%.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">6. Core Service: Tweet Service &amp; Snowflake ID Generation</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Tweet Service Responsibilities</div>
        <ul>
          <li>Validate tweet content (280 char limit, media, polls, threads)</li>
          <li>Generate globally unique, time-ordered tweet ID via Snowflake</li>
          <li>Write tweet record to MySQL (sharded by tweet_id)</li>
          <li>Publish tweet-created event to Kafka</li>
          <li>Return 201 with tweet ID synchronously — the rest is async</li>
          <li>Handle retweets, quote-tweets, replies (parent_tweet_id foreign key)</li>
          <li>Update user tweet count in Redis (atomic INCR)</li>
        </ul>
        <div class="ans-label" style="margin-top:10px;">Tweet Sharding Strategy</div>
        <p>MySQL is sharded by <strong>tweet_id % num_shards</strong>. Since tweet IDs are Snowflake (time-prefixed 64-bit integers), sharding by ID distributes writes uniformly across shards. Each shard handles ~10M tweets/day at 200 shards.</p>
        <div class="code-box">Shard assignment:
  shard_id = tweet_id % 200
  // Snowflake: high bits = timestamp → uniform distribution
  // Do NOT shard by user_id — hot users create hotspots

User timeline queries (GET /users/:id/tweets):
  // Fan-out query across all shards is expensive
  // Solution: maintain tweet_id list in Redis per user
  // Key: user_tweets:{user_id} → sorted set by timestamp
  // This is SEPARATE from home timeline
  ZADD user_tweets:999001234 1737001234 tweet_id</div>
      </div>
      <div>
        <div class="ans-label">Snowflake ID Structure (64 bits)</div>
        <div class="code-box">Bit layout:
  [1 bit unused] [41 bits timestamp] [10 bits machine ID] [12 bits sequence]

  41 bits timestamp:
    ms since custom epoch (2010-11-04 = Twitter's epoch)
    → 2^41 ms = 69 years of IDs before overflow

  10 bits machine ID:
    up to 1,024 Snowflake generator nodes
    each data center gets a range (DC1: 0-511, DC2: 512-1023)

  12 bits sequence counter:
    4,096 IDs per millisecond per machine
    reset to 0 each millisecond

  Total: 1,024 machines × 4,096 IDs/ms
       = 4.1M unique IDs/millisecond globally

Golang implementation (simplified):
  func NextID() int64 {
    mu.Lock()
    defer mu.Unlock()
    now := time.Now().UnixMilli() - EPOCH
    if now == lastMs { seq++ } else { seq = 0 }
    lastMs = now
    return (now &lt;&lt; 22) | (machineID &lt;&lt; 12) | seq
  }</div>
        <div class="tip-box" style="margin-top:10px;">Snowflake IDs are sortable by creation time without a database round-trip. Pagination using since_id / max_id is O(1): "give me tweets with ID &gt; X" maps directly to a range scan on the index.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">7. Core Service: Search &amp; Trending Topics</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Search Architecture</div>
        <p>Twitter Search indexes 500M tweets/day and needs sub-second full-text search across a corpus of trillions of historical tweets, with special emphasis on freshness (breaking news must appear within 15 seconds).</p>
        <div class="code-box">Indexing Pipeline:
  1. Tweet created → Kafka "tweet-created" topic
  2. Search Indexer (Kafka consumer):
     - Extract text, hashtags, mentions, URLs
     - Tokenise + normalise (lower-case, stemming,
       emoji expansion)
     - Write to Elasticsearch index: tweets-YYYY-MM
     - Use time-based index rotation for manageability
  3. Elasticsearch cluster:
     - ~50 data nodes, 3 primary shards/index
     - 1 replica shard/primary (read scalability)
     - Index alias "tweets-recent" → current month
     - Near-real-time (NRT) refresh: 1 second

Search query flow:
  GET /search?q=%23SystemDesign&amp;since_id=175...
  → Gateway → Search Service
  → Elasticsearch query:
    {
      "query": {
        "bool": {
          "must": { "match": { "text": "SystemDesign" } },
          "filter": { "range": { "created_at": { "gte": "now-7d" } } }
        }
      },
      "sort": [{"_score": "desc"}, {"created_at": "desc"}]
    }</div>
      </div>
      <div>
        <div class="ans-label">Trending Topics Engine</div>
        <p>Trending is fundamentally a "top-K in a sliding time window" problem. The challenge is computing this from 5,800 tweets/sec in real-time.</p>
        <div class="code-box">Trending computation:
  1. Kafka consumer reads tweet stream
  2. Count-Min Sketch per sliding window:
     - 5-min window, 1-min slide
     - Tracks hashtag/phrase frequency with
       O(1) update, O(1) query, sub-linear space
  3. Each region has its own trending service instance
     (US, UK, India, Global etc.)
  4. Trend score = velocity (rate of change), not
     absolute count:
       score = (current_5min_count - prev_5min_count)
               / prev_5min_count
     // This surfaces "breaking" topics, not perennially
     // high-volume ones like #love
  5. Filter spam/bot amplification:
     - Deduplicate by user_id within window
     - Discard if &gt;80% of tweets from &lt;30 day-old accounts
  6. Results cached in Redis with 60-sec TTL
  7. Served via GET /v2/trends/place?id=1 (global)

Redis trending cache:
  Key: trending:global
  Type: Sorted Set
  ZADD trending:global 0.98 "#AI" 0.87 "#WorldCup"
  ZREVRANGE trending:global 0 9  → top 10 trends</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">8. Database Design</div>
  <div class="ref-body">
    <div class="ans-label">tweets table (MySQL, sharded by tweet_id)</div>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Column</div><div>Type</div><div>Index</div><div>Notes</div></div>
      <div class="pt-row"><div class="pt-name">tweet_id</div><div>BIGINT UNSIGNED PK</div><div>PRIMARY</div><div>Snowflake ID, sortable by time</div></div>
      <div class="pt-row"><div class="pt-name">user_id</div><div>BIGINT UNSIGNED NOT NULL</div><div>INDEX (user_id, tweet_id)</div><div>Author; composite for user timeline query</div></div>
      <div class="pt-row"><div class="pt-name">text</div><div>VARCHAR(560)</div><div>—</div><div>280 chars UTF-8 = up to 560 bytes; search via Elasticsearch</div></div>
      <div class="pt-row"><div class="pt-name">in_reply_to_tweet_id</div><div>BIGINT UNSIGNED NULL</div><div>INDEX</div><div>Thread chain traversal</div></div>
      <div class="pt-row"><div class="pt-name">retweet_of_tweet_id</div><div>BIGINT UNSIGNED NULL</div><div>—</div><div>NULL for original tweets</div></div>
      <div class="pt-row"><div class="pt-name">quoted_tweet_id</div><div>BIGINT UNSIGNED NULL</div><div>—</div><div>Quote tweet reference</div></div>
      <div class="pt-row"><div class="pt-name">media_ids</div><div>JSON NULL</div><div>—</div><div>Array of media IDs; media stored in S3</div></div>
      <div class="pt-row"><div class="pt-name">like_count</div><div>INT DEFAULT 0</div><div>—</div><div>Denormalized counter; updated asynchronously</div></div>
      <div class="pt-row"><div class="pt-name">retweet_count</div><div>INT DEFAULT 0</div><div>—</div><div>Same; eventual consistency acceptable</div></div>
      <div class="pt-row"><div class="pt-name">reply_count</div><div>INT DEFAULT 0</div><div>—</div><div>Same</div></div>
      <div class="pt-row"><div class="pt-name">lang</div><div>VARCHAR(8)</div><div>—</div><div>ISO 639-1 language code</div></div>
      <div class="pt-row"><div class="pt-name">geo_place_id</div><div>VARCHAR(32) NULL</div><div>—</div><div>Optional geo tag</div></div>
      <div class="pt-row"><div class="pt-name">created_at</div><div>DATETIME(3)</div><div>INDEX</div><div>Millisecond precision; redundant with Snowflake but human-readable</div></div>
      <div class="pt-row"><div class="pt-name">deleted_at</div><div>DATETIME NULL</div><div>INDEX (deleted_at)</div><div>Soft delete; hard delete after 30 days</div></div>
    </div>

    <div class="ans-label" style="margin-top:14px;">users table (MySQL, sharded by user_id)</div>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Column</div><div>Type</div><div>Notes</div></div>
      <div class="pt-row"><div class="pt-name">user_id</div><div>BIGINT UNSIGNED PK</div><div>Snowflake ID</div></div>
      <div class="pt-row"><div class="pt-name">username</div><div>VARCHAR(15) UNIQUE</div><div>@handle; globally unique — stored in separate lookup table for cross-shard uniqueness</div></div>
      <div class="pt-row"><div class="pt-name">display_name</div><div>VARCHAR(50)</div><div>Display name (not unique)</div></div>
      <div class="pt-row"><div class="pt-name">bio</div><div>VARCHAR(160)</div><div>Profile bio</div></div>
      <div class="pt-row"><div class="pt-name">profile_image_url</div><div>VARCHAR(255)</div><div>S3 key; served via CDN</div></div>
      <div class="pt-row"><div class="pt-name">follower_count</div><div>INT DEFAULT 0</div><div>Denormalized; determines fanout strategy (&gt;1M = hybrid)</div></div>
      <div class="pt-row"><div class="pt-name">following_count</div><div>INT DEFAULT 0</div><div>Denormalized</div></div>
      <div class="pt-row"><div class="pt-name">is_verified</div><div>TINYINT(1)</div><div>Blue checkmark</div></div>
      <div class="pt-row"><div class="pt-name">created_at</div><div>DATETIME</div><div>Account creation</div></div>
    </div>

    <div class="ans-label" style="margin-top:14px;">follows table (Cassandra — social graph)</div>
    <div class="code-box">// Two denormalized tables for O(1) lookups in both directions
// Cassandra partition key = lookup dimension

TABLE followers_by_user   // "who follows user X?"
  PRIMARY KEY (user_id, follower_user_id)
  Partition = user_id
  Clustering = follower_user_id DESC

TABLE following_by_user   // "who does user X follow?"
  PRIMARY KEY (user_id, following_user_id)
  Partition = user_id
  Clustering = following_user_id DESC

// To fanout to followers: SCAN followers_by_user WHERE user_id=X
// Returns all follower IDs in partition order (no scatter-gather)
// A celebrity with 170M followers has a wide row → batched reads of 5,000</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">9. Data Flow — Key Scenarios</div>
  <div class="ref-body">
    <div class="ans-label">Scenario A: User Posts a Tweet</div>
    <div class="flow-box">
      <div class="flow-step">1. Client → POST /v2/tweets with text + media_ids</div>
      <div class="flow-arrow">↓ API Gateway: authenticate JWT, rate-limit check (100 tweets/24h)</div>
      <div class="flow-step">2. Tweet Service: validate (280 chars, profanity filter), generate Snowflake ID</div>
      <div class="flow-arrow">↓ Write to MySQL shard (tweet_id % 200) — synchronous, returns 201</div>
      <div class="flow-step">3. Publish to Kafka topic "tweet-created" with full tweet payload</div>
      <div class="flow-arrow">↓ Async — client already has 201 response at this point</div>
      <div class="flow-step">4a. Fanout Workers: read follower list from Cassandra → LPUSH to each follower's Redis timeline (for users with &lt;1M followers)</div>
      <div class="flow-arrow">↓ Parallel Kafka consumer group</div>
      <div class="flow-step">4b. Search Indexer: tokenise + write to Elasticsearch (NRT, 15-sec lag)</div>
      <div class="flow-arrow">↓ Parallel Kafka consumer group</div>
      <div class="flow-step">4c. Notification Service: detect mentions (@user), send push notifications</div>
      <div class="flow-arrow">↓ Parallel Kafka consumer group</div>
      <div class="flow-step">5. Trending Service: Count-Min Sketch update for hashtags in tweet</div>
    </div>

    <div class="ans-label" style="margin-top:18px;">Scenario B: User Loads Home Timeline</div>
    <div class="flow-box">
      <div class="flow-step">1. Client → GET /v2/timelines/home?max_results=20</div>
      <div class="flow-arrow">↓ API Gateway: auth, route to Timeline Service</div>
      <div class="flow-step">2. Timeline Service: LRANGE timeline:{user_id} 0 799 → up to 800 tweet IDs from Redis</div>
      <div class="flow-arrow">↓ Redis returns sorted list (newest first) in ~1ms</div>
      <div class="flow-step">3. Batch fetch tweet objects: MGET tweet:{id1} tweet:{id2} ... (pipeline)</div>
      <div class="flow-arrow">↓ Cache miss rate: ~5% for recent tweets; fetch from MySQL read replica + populate cache</div>
      <div class="flow-step">4. For users following celebrities (&gt;1M followers): inject celebrity tweets from DB into merged list</div>
      <div class="flow-arrow">↓ Merge sort by (recency + engagement_score)</div>
      <div class="flow-step">5. Hydrate author profiles: MGET user:{author_id} for each tweet (Redis user cache, TTL 1h)</div>
      <div class="flow-arrow">↓ Assemble final response</div>
      <div class="flow-step">6. Return paginated response with next_token cursor. Total: ~50-80ms p50, &lt;200ms p99</div>
    </div>

    <div class="ans-label" style="margin-top:18px;">Scenario C: User Searches for a Topic</div>
    <div class="flow-box">
      <div class="flow-step">1. Client → GET /v2/tweets/search/recent?query=%23AI&amp;max_results=20</div>
      <div class="flow-arrow">↓ API Gateway → Search Service</div>
      <div class="flow-step">2. Search Service: parse query, apply safety filters, build Elasticsearch bool query</div>
      <div class="flow-arrow">↓ Elasticsearch: query tweets-* indices, rank by _score + recency</div>
      <div class="flow-step">3. Elasticsearch returns top-N tweet IDs with relevance scores</div>
      <div class="flow-arrow">↓ Cache result set in Redis (key: search:{hash(query)}, TTL 60s) for popular queries</div>
      <div class="flow-step">4. Batch fetch full tweet objects from Redis/MySQL (same path as timeline)</div>
      <div class="flow-step">5. Return hydrated tweets with pagination cursor. Total: ~100-250ms p99</div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">10. Caching Strategy</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Cache</div><div>Key Pattern</div><div>TTL</div><div>Eviction</div><div>Strategy</div></div>
      <div class="pt-row"><div class="pt-name">Home Timeline</div><div>timeline:{user_id}</div><div>Persistent (LRU eviction)</div><div>LRU (evict inactive user timelines first)</div><div>Write-through: fanout workers write; LPUSH+LTRIM cap 800</div></div>
      <div class="pt-row"><div class="pt-name">Tweet Objects</div><div>tweet:{tweet_id}</div><div>7 days (popular), 24h (long-tail)</div><div>LRU with TTL</div><div>Cache-aside: read → miss → MySQL → populate</div></div>
      <div class="pt-row"><div class="pt-name">User Profile</div><div>user:{user_id}</div><div>1 hour</div><div>LRU</div><div>Write-through on profile update + TTL</div></div>
      <div class="pt-row"><div class="pt-name">User Timeline (own tweets)</div><div>user_tweets:{user_id}</div><div>Persistent (top 3,200 tweets)</div><div>LRU</div><div>Sorted Set by tweet_id; updated on each tweet creation</div></div>
      <div class="pt-row"><div class="pt-name">Trending Topics</div><div>trending:{woeid}</div><div>60 seconds</div><div>TTL expiry</div><div>Write-through from Trending Service every 60s</div></div>
      <div class="pt-row"><div class="pt-name">Engagement Counts</div><div>tweet_counts:{tweet_id}</div><div>30 minutes</div><div>LRU + TTL</div><div>Async batch update from Kafka counters; read from cache, persist to MySQL async</div></div>
      <div class="pt-row"><div class="pt-name">Search Results</div><div>search:{md5(query)}</div><div>60 seconds</div><div>TTL expiry</div><div>Cache-aside for popular queries; skip cache for rare queries</div></div>
      <div class="pt-row"><div class="pt-name">Rate Limit Counters</div><div>rl:{user_id}:{window}</div><div>15 minutes</div><div>TTL expiry</div><div>Redis INCR + EXPIRE; sliding window algorithm</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Redis Cluster Configuration</div>
        <ul>
          <li>3 separate Redis clusters by data type (timeline, tweets, users) — prevents hot-key cross-contamination</li>
          <li>Each cluster: 3 primary + 3 replica nodes (Redis Cluster mode)</li>
          <li>16,384 hash slots distributed across primaries</li>
          <li>Total estimated RAM: ~2TB across all clusters for 200M DAU timelines</li>
          <li>Persistent: RDB snapshot every 1h + AOF with fsync every 1s</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Cache Invalidation</div>
        <ul>
          <li><strong>Tweet deleted:</strong> SET tweet:{id} "" + short TTL (tombstone) → downstream consumers remove from timelines</li>
          <li><strong>User profile update:</strong> DEL user:{id} + publish "user-updated" Kafka event → all services re-fetch on next request</li>
          <li><strong>Tweet engagement counts:</strong> Never invalidate aggressively — slight staleness (&lt;5 min) acceptable for like/RT counts</li>
          <li><strong>Cold start:</strong> If timeline:{user_id} missing (evicted), reconstruct from DB by fetching followed users' recent tweets — expensive one-time cost</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">11. Message Queue / Event Streaming</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Why Kafka?</div>
        <ul>
          <li><strong>Throughput:</strong> Kafka handles millions of messages/sec on commodity hardware — matches Twitter's 5,800 tweets/sec + engagement events (likes, retweets, clicks) that add another 10-20x volume</li>
          <li><strong>Durability:</strong> Messages replicated across 3 brokers; retained for 7 days — allows consumers to replay from any offset</li>
          <li><strong>Fan-out:</strong> Multiple consumer groups read same topic independently — fanout workers, search indexer, notification service, analytics all consume "tweet-created" without coupling</li>
          <li><strong>Ordering:</strong> Tweets from a single user partitioned by user_id → guaranteed ordering per-user, parallel processing across users</li>
          <li><strong>Backpressure:</strong> Consumers can fall behind during celebrity tweet storms without data loss; they catch up at their own pace</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Kafka Topics &amp; Partitioning</div>
        <div class="pattern-table">
          <div class="pt-row pt-header"><div>Topic</div><div>Partitions</div><div>Key</div><div>Consumers</div></div>
          <div class="pt-row"><div class="pt-name">tweet-created</div><div>200</div><div>user_id</div><div>Fanout workers, Search, Notifications, Analytics</div></div>
          <div class="pt-row"><div class="pt-name">tweet-deleted</div><div>50</div><div>user_id</div><div>Fanout purge, Search deleter, Cache invalidator</div></div>
          <div class="pt-row"><div class="pt-name">user-events</div><div>100</div><div>user_id</div><div>Follow service, Profile cache invalidator</div></div>
          <div class="pt-row"><div class="pt-name">engagement-events</div><div>300</div><div>tweet_id</div><div>Counter aggregator, Trending engine, Notification svc</div></div>
          <div class="pt-row"><div class="pt-name">notification-events</div><div>100</div><div>recipient_user_id</div><div>Push notification delivery</div></div>
          <div class="pt-row"><div class="pt-name">timeline-hydration</div><div>200</div><div>user_id</div><div>Timeline cold-start rebuilder</div></div>
        </div>
      </div>
    </div>
    <div class="code-box" style="margin-top:10px;">Fanout consumer pseudocode (Go):
  func ProcessTweetCreated(msg kafka.Message) error {
    tweet := deserialize(msg.Value)
    if tweet.Author.FollowerCount &gt; 1_000_000 {
      return nil  // hybrid path: skip write, inject at read time
    }
    followers, err := cassandra.GetFollowers(tweet.AuthorID, batchSize=5000)
    pipe := redis.Pipeline()
    for _, followerID := range followers {
      key := fmt.Sprintf("timeline:%d", followerID)
      pipe.LPush(ctx, key, tweet.ID)
      pipe.LTrim(ctx, key, 0, 799)
    }
    _, err = pipe.Exec(ctx)
    return err
  }</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">12. Real-time Communication</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Technology Choice: Server-Sent Events (SSE)</div>
        <p>Twitter uses SSE for home timeline streaming rather than WebSockets. Reasons:</p>
        <ul>
          <li><strong>Unidirectional:</strong> Timeline updates are server → client only; no client-to-server streaming needed on the same connection (tweets are sent via separate REST POST)</li>
          <li><strong>Simpler infrastructure:</strong> SSE works over HTTP/1.1 and HTTP/2; no WebSocket upgrade required; passes through standard load balancers and CDN proxies</li>
          <li><strong>Automatic reconnection:</strong> Browser SSE handles reconnect + last-event-id automatically</li>
          <li><strong>HTTP/2 multiplexing:</strong> Multiple SSE streams per TCP connection via HTTP/2</li>
        </ul>
        <div class="ans-label" style="margin-top:10px;">Direct Messages: WebSockets</div>
        <p>DMs require bidirectional real-time communication → WebSockets. The DM service maintains a presence map (user_id → WebSocket connection) in Redis to route messages to the correct server instance.</p>
      </div>
      <div>
        <div class="ans-label">Streaming Architecture</div>
        <div class="code-box">SSE Streaming (timeline updates):
  GET /v2/stream/home_timeline
  Accept: text/event-stream
  Last-Event-ID: 1750023456789012345

  Server response (chunked):
  data: {"tweet_id":"1750099...", "type":"new_tweet"}

  data: {"tweet_id":"1750100...", "type":"new_tweet"}

  : keepalive

  data: {"tweet_id":"1750098...", "type":"delete"}

Stream fan-out via pub/sub:
  // Redis pub/sub channel per user
  // Fanout workers PUBLISH to channel when new tweet lands
  // SSE server subscribes on behalf of connected user
  // Scales: each SSE server subscribes to ~50K channels
  //         Redis pub/sub can handle 10M subscriptions

Presence (for DM "seen" indicator):
  Key: presence:{user_id}
  Value: { ws_server_id, last_seen_at }
  TTL: 30 seconds (heartbeat refreshes it)
  SETEX presence:12345 30 '{"server":"ws-07","ts":1737...}'</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">13. Consistency &amp; Transactions</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Consistency Model by Component</div>
        <div class="pattern-table">
          <div class="pt-row pt-header"><div>Component</div><div>Model</div><div>Rationale</div></div>
          <div class="pt-row"><div class="pt-name">Tweet creation</div><div>Strong (MySQL ACID)</div><div>A tweet must exist exactly once; idempotency key prevents duplicates on retry</div></div>
          <div class="pt-row"><div class="pt-name">Home timeline delivery</div><div>Eventual (seconds)</div><div>Brief delay acceptable; fanout is async via Kafka</div></div>
          <div class="pt-row"><div class="pt-name">Like/RT counts</div><div>Eventual (minutes)</div><div>Approximate counts fine; accuracy not safety-critical</div></div>
          <div class="pt-row"><div class="pt-name">Follow relationship</div><div>Strong (Cassandra LWT)</div><div>Prevent duplicate follows; use lightweight transactions</div></div>
          <div class="pt-row"><div class="pt-name">User profile</div><div>Read-your-writes</div><div>User must see their own profile update immediately; others can see eventual</div></div>
        </div>
        <div class="ans-label" style="margin-top:10px;">Idempotency for Tweet Creation</div>
        <div class="code-box">POST /v2/tweets
Idempotency-Key: uuid-client-generated

// Server: store key in Redis with TTL=24h
// First request: process + store result
// Duplicate request (network retry): return cached result
// Client sees same 201 response, no duplicate tweet

Redis key: idempotency:{key_hash}
Value: { status: 201, tweet_id: "1750023..." }
TTL: 86,400 seconds</div>
      </div>
      <div>
        <div class="ans-label">Distributed Locking</div>
        <p>Required for: preventing duplicate follows, ensuring atomic follow-count updates, DM deduplication.</p>
        <div class="code-box">Follow operation (atomic with Cassandra LWT):
  // Cassandra Lightweight Transaction
  INSERT INTO following_by_user
    (user_id, following_user_id, created_at)
  VALUES (:uid, :fid, toTimestamp(now()))
  IF NOT EXISTS
  // Returns [applied: true/false]
  // If false → already following, return 200 (idempotent)

Redis-based distributed lock (Redlock for short ops):
  SET lock:{resource} {uuid} NX PX 5000
  // NX = only if not exists
  // PX = expire in 5000ms
  // Used for: rate limit window creation, trending
  //           batch coordination</div>
        <div class="ans-label" style="margin-top:10px;">Counter Aggregation (Engagement Counts)</div>
        <p>Likes/retweets are high-frequency writes (~50K events/sec). Updating MySQL on every like would overwhelm the DB. Solution: batch aggregation via Kafka.</p>
        <div class="code-box">Kafka "engagement-events" consumer:
  // Batch for 1 second, group by tweet_id
  counts = aggregate(events, window=1s)
  // Bulk UPDATE MySQL in single query
  UPDATE tweets SET like_count = like_count + :delta
  WHERE tweet_id IN (:ids)
  // Update Redis cache inline
  INCRBY tweet_counts:{id} {delta}</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">14. Search Architecture</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Elasticsearch Index Design</div>
        <div class="code-box">Index: tweets-2025-01 (time-based rotation)

Mapping:
{
  "tweet_id":    { "type": "keyword" },
  "text":        {
    "type": "text",
    "analyzer": "tweet_analyzer",
    "fields": { "keyword": { "type": "keyword" } }
  },
  "hashtags":    { "type": "keyword" },
  "mentions":    { "type": "keyword" },
  "user_id":     { "type": "keyword" },
  "created_at":  { "type": "date", "format": "epoch_millis" },
  "lang":        { "type": "keyword" },
  "geo":         { "type": "geo_point" },
  "engagement_score": { "type": "float" }
}

Custom analyzer "tweet_analyzer":
  - standard tokeniser
  - lowercase filter
  - hashtag token filter (#ai → ai, hashtag=ai)
  - mention token filter (@user → user, mention=user)
  - emoji filter (converts emoji to text equivalents)
  - URL filter (extract domain, strip params)</div>
      </div>
      <div>
        <div class="ans-label">Search Ranking</div>
        <p>Twitter search combines BM25 relevance with engagement signals and personalisation:</p>
        <div class="code-box">Final score = w1 * bm25_score
            + w2 * log(1 + like_count)
            + w3 * log(1 + retweet_count)
            + w4 * author_credibility_score
            + w5 * recency_decay
            + w6 * personalization_score
  // personalisation: boost from followed accounts,
  //   preferred languages, location proximity

Recency decay:
  score_decay = exp(-lambda * hours_since_tweet)
  lambda = 0.05  (half-life ~14 hours for search)
  // Breaking news needs low lambda (slow decay)
  // Evergreen content needs high lambda (fast decay)</div>
        <div class="ans-label" style="margin-top:10px;">Cluster Sizing</div>
        <ul>
          <li>50 data nodes, 3 primary + 1 replica per index shard</li>
          <li>Each shard ~50GB; 500M tweets/day × 500B → 250GB/day → 5 shards/day</li>
          <li>Hot index (current month): all shards on warm/hot nodes (SSD)</li>
          <li>Cold index (&gt;3 months): stored on cold nodes (HDD), searchable but slower</li>
          <li>Index alias "tweets-recent" → last 7 days; "tweets-all" → full corpus</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">15. CDN &amp; Media Delivery</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">What Is CDN-Served</div>
        <ul>
          <li><strong>Profile images:</strong> Resized to multiple dimensions (48px, 200px, 400px) at upload time; served from Fastly/Akamai CDN forever (content-addressed by hash)</li>
          <li><strong>Tweet images:</strong> Transcoded at upload to WebP + JPEG fallback; multiple sizes (thumb 150px, small 680px, medium 1200px, large 2048px); CDN-served with long TTL</li>
          <li><strong>Videos:</strong> HLS adaptive streaming (multiple bitrates: 240p, 480p, 720p, 1080p); CDN edge caches HLS manifests and TS segments; most popular videos at edge in 50+ PoPs globally</li>
          <li><strong>Static assets:</strong> React bundles, CSS, fonts — content-addressed, immutable, 1-year cache header</li>
          <li><strong>Card thumbnails:</strong> Open Graph preview images for linked URLs — fetched at tweet time, stored in S3, served via CDN</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Media Upload Flow</div>
        <div class="code-box">1. Client → POST /v1/media/upload (chunked)
   → Media Service validates MIME type, size (&lt;5MB image, &lt;512MB video)
2. Store raw original in S3 (us-east-1 primary)
3. Publish "media-uploaded" to Kafka
4. Transcoding Service (Kafka consumer):
   - Images: convert to WebP + JPEG, 4 sizes
   - Videos: FFmpeg transcode to HLS (4 bitrates)
   - Store all variants in S3 under content-hash prefix:
     s3://twitter-media/{hash:2}/{hash:2}/{full_hash}_large.webp
5. CDN origin = S3; TTL = 1 year (immutable content)
6. Return media_id to client; client includes in tweet POST

CDN cache invalidation:
  - Only needed for profile images (user can re-upload)
  - Tweet media: never invalidated (immutable by hash)
  - Profile images: invalidated by CDN API call on upload
  - Purge by URL pattern: cdn.twitter.com/profile_images/{user_id}/*</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">16. Security</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Authentication &amp; Authorisation</div>
        <ul>
          <li><strong>OAuth 2.0:</strong> All API access uses OAuth2. Browser/mobile apps use Authorization Code + PKCE. Server-to-server uses Client Credentials flow. Third-party apps granted scoped access (read, write, DM)</li>
          <li><strong>JWT access tokens:</strong> 15-minute expiry; RS256 signed; payload includes user_id, scopes, rate limit tier. Short expiry limits blast radius of stolen tokens</li>
          <li><strong>Refresh tokens:</strong> 90-day expiry, single-use (rotated on each refresh); stored hashed in database; revoked on logout or suspicious activity</li>
          <li><strong>2FA:</strong> TOTP (authenticator app), hardware key (WebAuthn/FIDO2), SMS (deprecated due to SIM-swap risk)</li>
          <li><strong>Session management:</strong> Sessions stored in Redis; forced logout via session revocation (DEL session:{session_id})</li>
        </ul>
        <div class="ans-label" style="margin-top:10px;">Encryption</div>
        <ul>
          <li><strong>In transit:</strong> TLS 1.3 everywhere; HSTS + certificate pinning on mobile apps</li>
          <li><strong>At rest:</strong> S3 server-side encryption (AES-256); MySQL Transparent Data Encryption; Redis encryption at rest (AWS KMS managed keys)</li>
          <li><strong>DMs:</strong> Encrypted in transit; at-rest encryption on the server (not end-to-end by default in Twitter's current architecture)</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Rate Limiting</div>
        <div class="code-box">Rate limit tiers (per user, per 15-min window):
  Free:     300 read, 100 write, 15 DM
  Basic:  3,000 read, 100 write, 500 DM
  Pro:   10,000 read, 1,000 write, 5,000 DM

Implementation: Redis sliding window
  Key: rl:{user_id}:{endpoint}:{window_start_min}
  Type: Counter (INCR)
  TTL: 15 minutes

Response headers:
  X-Rate-Limit-Limit: 300
  X-Rate-Limit-Remaining: 247
  X-Rate-Limit-Reset: 1737001800 (Unix timestamp)

429 response:
  { "error": "rate_limit_exceeded",
    "reset_at": "2025-01-15T09:30:00Z" }</div>
        <div class="ans-label" style="margin-top:10px;">Abuse &amp; Spam Prevention</div>
        <ul>
          <li><strong>Bot detection:</strong> ML model on signup behaviour (typing speed, copy-paste patterns, device fingerprint)</li>
          <li><strong>Spam tweets:</strong> Real-time classifier on tweet content; high-confidence spam → shadow ban (tweet hidden from non-followers); low-confidence → human review queue</li>
          <li><strong>Coordinated inauthentic behaviour:</strong> Graph analysis of follow patterns; accounts that only interact with each other → investigation</li>
          <li><strong>DDoS:</strong> Cloudflare/Akamai absorbs L3/L4; API Gateway enforces per-IP limits; Captcha on suspicious IPs</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">17. Scalability Patterns</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Horizontal Scaling</div>
        <ul>
          <li><strong>Stateless services:</strong> Tweet Service, Timeline Service, User Service, Search Service — all stateless; scale horizontally behind load balancers. Kubernetes HPA autoscales on CPU/RPS.</li>
          <li><strong>MySQL sharding (tweet table):</strong> 200 shards by tweet_id modulo. Adding shards requires resharding — mitigated by using a consistent hashing ring with virtual nodes. Each shard: 1 primary + 2 read replicas.</li>
          <li><strong>MySQL sharding (user table):</strong> 100 shards by user_id modulo. Username uniqueness enforced via a separate global lookup table (username → user_id, single-shard, highly cached).</li>
          <li><strong>Redis Cluster:</strong> 16,384 hash slots; add nodes and rebalance without downtime. Separate clusters for timelines vs. tweet objects vs. user profiles.</li>
          <li><strong>Cassandra:</strong> Linear scale — add nodes to ring; tokens rebalanced automatically. Replication factor = 3.</li>
          <li><strong>Elasticsearch:</strong> Add data nodes; rebalance shards via cluster reroute API.</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Read Replicas &amp; Query Routing</div>
        <div class="code-box">MySQL routing:
  - All writes → primary (via VIP)
  - Timeline reads → read replicas (round-robin)
  - User profile reads → read replicas + Redis cache
  - Replication lag: typically &lt;100ms; acceptable for
    non-critical reads (tweet counts, profile metadata)
  - Read-your-writes: for 5 seconds after any write,
    route that user's reads to primary to avoid seeing
    stale data (session stickiness in proxy)

Read:Write replica ratio by service:
  Tweet Service:  1 primary : 5 replicas (read-heavy)
  User Service:   1 primary : 3 replicas
  Analytics:      Separate Hadoop cluster; no MySQL reads</div>
        <div class="ans-label" style="margin-top:10px;">Auto-scaling Triggers</div>
        <ul>
          <li><strong>Tweet Service:</strong> Scale when CPU &gt; 70% or P99 latency &gt; 200ms</li>
          <li><strong>Fanout Workers:</strong> Scale when Kafka consumer lag &gt; 100K messages (event storm)</li>
          <li><strong>Timeline Service:</strong> Scale when Redis connection pool saturation &gt; 80%</li>
          <li><strong>Pre-warming:</strong> For known events (elections, World Cup), pre-scale 2h before expected spike using scheduled scaling policies</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">18. Fault Tolerance &amp; Reliability</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Circuit Breaker Pattern</div>
        <p>All inter-service calls use circuit breakers (Hystrix/Resilience4j pattern) to prevent cascade failures.</p>
        <div class="code-box">Timeline Service → Redis:
  Closed:  requests pass through normally
  Open:    triggered when &gt;50% of requests fail
           in a 10-second window
  Half-Open: probe 1 request every 30s; if success
             → close; if fail → stay open

Fallback strategies:
  Redis failure → fall back to MySQL read replica
    (slower, but timeline still served)
  MySQL failure → serve cached stale timeline from Redis
    (possibly hours old, but page loads)
  Elasticsearch failure → return empty search results
    with "Search is temporarily unavailable" message
  Kafka failure → synchronous fanout (slower but durable)
    or skip fanout (timeline degrades gracefully)</div>
      </div>
      <div>
        <div class="ans-label">Retry Strategy</div>
        <div class="code-box">Retryable errors: 503, 429, network timeout
Non-retryable: 400, 401, 403, 404, 422

Exponential backoff with jitter:
  attempt 1: immediate
  attempt 2: 500ms + jitter(0-100ms)
  attempt 3: 1s   + jitter
  attempt 4: 2s   + jitter
  attempt 5: give up, log, dead-letter-queue

Idempotency: all retried writes carry same
  Idempotency-Key to prevent duplicate tweets</div>
        <div class="ans-label" style="margin-top:10px;">Bulkhead Pattern</div>
        <ul>
          <li>Separate thread pools for: timeline reads, search, DMs, media — one overloaded subsystem cannot starve others</li>
          <li>Separate Redis clusters by data type — Redis OOM for tweet cache does not affect timeline cache</li>
          <li>Separate Kafka consumer groups — search indexer lag does not affect fanout latency</li>
        </ul>
        <div class="ans-label" style="margin-top:10px;">Chaos Engineering</div>
        <ul>
          <li>Weekly chaos experiments: randomly kill one MySQL replica, one Redis node, one Kafka broker</li>
          <li>Gameday exercises: simulate celebrity tweet storm (inject 100M synthetic fanout events)</li>
          <li>Verify: fallbacks activate correctly, on-call alerts fire within 2 minutes</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">19. Monitoring &amp; Observability</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Metrics (Prometheus + Grafana)</div>
        <div class="pattern-table">
          <div class="pt-row pt-header"><div>Metric</div><div>Target</div><div>Alert Threshold</div></div>
          <div class="pt-row"><div class="pt-name">timeline_read_latency_p99</div><div>&lt;200ms</div><div>Alert &gt;500ms for 2 min</div></div>
          <div class="pt-row"><div class="pt-name">tweet_write_latency_p99</div><div>&lt;500ms</div><div>Alert &gt;1s for 1 min</div></div>
          <div class="pt-row"><div class="pt-name">kafka_consumer_lag</div><div>&lt;10K msgs</div><div>Alert &gt;500K for 5 min</div></div>
          <div class="pt-row"><div class="pt-name">redis_memory_utilisation</div><div>&lt;80%</div><div>Alert &gt;90%</div></div>
          <div class="pt-row"><div class="pt-name">mysql_replication_lag</div><div>&lt;500ms</div><div>Alert &gt;5s</div></div>
          <div class="pt-row"><div class="pt-name">error_rate (5xx)</div><div>&lt;0.01%</div><div>Alert &gt;0.1% for 1 min</div></div>
          <div class="pt-row"><div class="pt-name">search_index_lag</div><div>&lt;15s</div><div>Alert &gt;60s</div></div>
        </div>
      </div>
      <div>
        <div class="ans-label">Distributed Tracing (Jaeger / Zipkin)</div>
        <ul>
          <li>Trace IDs propagated via HTTP headers (X-Trace-Id) through every service boundary</li>
          <li>Every Kafka message carries trace context in headers</li>
          <li>Sampling: 10% of all requests sampled; 100% of requests with errors; 100% of p99 slow requests</li>
          <li>Trace spans tagged with: user_id, tweet_id, shard_id, cache_hit/miss</li>
        </ul>
        <div class="ans-label" style="margin-top:10px;">Structured Logging (ELK Stack)</div>
        <div class="code-box">{
  "ts": "2025-01-15T09:23:01.123Z",
  "service": "timeline-service",
  "trace_id": "abc-123-def",
  "user_id": 12345,
  "action": "read_timeline",
  "redis_hit": true,
  "tweet_ids_returned": 20,
  "duration_ms": 47,
  "level": "INFO"
}</div>
        <div class="ans-label" style="margin-top:10px;">SLO / SLA</div>
        <ul>
          <li><strong>SLO:</strong> 99.99% of timeline reads succeed in &lt;500ms over a 30-day window</li>
          <li><strong>Error budget:</strong> 4.32 min/month downtime; consumed by planned maintenance + incidents</li>
          <li><strong>SLA:</strong> External API customers: 99.9% monthly uptime; credit issued if breached</li>
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
        <div class="ans-label">Multi-Region, Multi-AZ</div>
        <ul>
          <li><strong>3 AWS regions:</strong> us-east-1 (primary), us-west-2 (secondary), eu-west-1 (Europe). Each region has 3 AZs.</li>
          <li><strong>Active-active:</strong> All regions serve traffic. Users geo-routed to nearest region via Anycast DNS (Route53 Latency-based routing).</li>
          <li><strong>MySQL cross-region replication:</strong> us-east-1 is global primary; us-west-2 and eu-west-1 receive async replication (~100ms lag). Writes from EU go to us-east-1, reads served locally.</li>
          <li><strong>Redis:</strong> Each region has its own cluster (no cross-region replication). Timeline rebuilt on cold-start when user switches region.</li>
          <li><strong>Kafka:</strong> Each region has independent Kafka cluster; tweet-created events replicated cross-region via Kafka MirrorMaker 2 for analytics.</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Kubernetes Deployment</div>
        <div class="code-box">Service deployments:
  tweet-service:     replicas: 50  (3 AZs, anti-affinity)
  timeline-service:  replicas: 200 (read-heavy)
  fanout-workers:    replicas: 100 (Kafka consumers)
  search-service:    replicas: 30
  notification-svc:  replicas: 20

Blue-green deployment:
  - New version deployed to "green" cluster
  - 1% canary traffic → green (monitoring 10 min)
  - If error rate OK: ramp to 10% → 50% → 100%
  - Rollback: flip load balancer back to blue in 30s

Feature flags (LaunchDarkly / internal):
  - New timeline ranking algorithm: 5% rollout
  - New search features: opt-in beta users first
  - Infrastructure changes (new Redis version): 1 shard at a time</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">21. Performance Optimisations</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Read Path Optimisations</div>
        <ul>
          <li><strong>Redis Pipelining:</strong> Timeline read batches 800 MGET tweet lookups into a single pipelined request — 800 round-trips → 1 round-trip. Latency drops from ~800ms to ~5ms.</li>
          <li><strong>Protobuf over JSON:</strong> Internal service communication uses Protocol Buffers (~3x smaller than JSON, ~10x faster serialisation). External API still returns JSON.</li>
          <li><strong>MySQL covering indexes:</strong> Index (user_id, tweet_id DESC) on tweets table covers the user timeline query without heap fetch.</li>
          <li><strong>Connection pooling:</strong> Each service maintains a pool of MySQL connections (PgBouncer pattern); eliminates TCP handshake cost per query. Pool size: 100 connections per service instance.</li>
          <li><strong>HTTP/2 multiplexing:</strong> Multiple API requests multiplexed over single TCP connection from mobile clients; reduces mobile connection overhead.</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Write Path Optimisations</div>
        <ul>
          <li><strong>Async everything after tweet write:</strong> Fanout, indexing, notifications, analytics — all async via Kafka. The synchronous write path (MySQL insert) completes in ~10ms.</li>
          <li><strong>Kafka batching:</strong> Fanout workers batch Redis LPUSH operations for 100ms before executing; reduces Redis operations per second by 100x at cost of 100ms delivery delay.</li>
          <li><strong>MySQL write batching:</strong> Engagement counter updates (likes, retweets) batched for 1 second; single UPDATE with many tweet IDs instead of one UPDATE per event.</li>
          <li><strong>Lua scripts for Redis atomicity:</strong> LPUSH + LTRIM executed as a single Lua script to guarantee atomicity without Redis MULTI/EXEC overhead.</li>
          <li><strong>Compression:</strong> Tweet objects stored in Redis compressed (LZ4) — reduces memory by ~40% at cost of ~0.5ms CPU for compress/decompress.</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">22. Cost Optimisation</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Compute &amp; Storage</div>
        <ul>
          <li><strong>Spot instances for workers:</strong> Fanout workers, search indexers, analytics jobs run on EC2 Spot Instances (~70% cheaper than On-Demand). Interruption handled gracefully: Kafka consumer checkpoints frequently; job restarts from last checkpoint on new Spot instance.</li>
          <li><strong>Reserved instances for stateful services:</strong> MySQL, Redis, Kafka brokers — 1-year Reserved Instances (~40% discount). Predictable baseline load makes this safe.</li>
          <li><strong>Right-sizing:</strong> Memory-optimised instances (r7g) for Redis; compute-optimised (c7g) for Tweet/Timeline services; storage-optimised (i4i) for Elasticsearch data nodes.</li>
          <li><strong>Graviton3 (ARM):</strong> All stateless services migrated to AWS Graviton3 — ~40% better price/performance for web-tier workloads.</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Data &amp; Network</div>
        <ul>
          <li><strong>S3 Intelligent-Tiering:</strong> Media objects automatically moved to IA (Infrequent Access) after 30 days, Glacier after 1 year. 80% of media accessed only in first 30 days → significant savings.</li>
          <li><strong>CDN offload:</strong> 95%+ of media bytes served from CDN edge — avoids S3 GET charges and egress bandwidth costs. CDN cost much lower than S3 egress at Twitter scale.</li>
          <li><strong>Data compression:</strong> All Kafka messages compressed with Snappy (~50% size reduction). All S3 objects stored compressed. MySQL InnoDB compressed table format for older partitions.</li>
          <li><strong>Analytics tiering:</strong> Raw event data in Hadoop HDFS (cheap spinning disk); aggregated metrics in Druid (SSD); hot dashboards in Redis. Only query what you need at the right tier.</li>
          <li><strong>Timeline eviction:</strong> Evict inactive user timelines from Redis (30+ day inactive = ~50M users) → saves ~320GB RAM in the cluster.</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">23. Disaster Recovery</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">RTO / RPO Targets</div>
        <div class="pattern-table">
          <div class="pt-row pt-header"><div>Component</div><div>RPO</div><div>RTO</div></div>
          <div class="pt-row"><div class="pt-name">MySQL (tweets, users)</div><div>0 (sync replication within AZ)</div><div>&lt;30 sec (automatic failover via Orchestrator)</div></div>
          <div class="pt-row"><div class="pt-name">MySQL cross-region</div><div>&lt;100ms (async replication lag)</div><div>&lt;5 min (promote read replica to primary)</div></div>
          <div class="pt-row"><div class="pt-name">Redis timelines</div><div>Volatile (acceptable data loss)</div><div>&lt;1 min (rebuilt on user next request)</div></div>
          <div class="pt-row"><div class="pt-name">Kafka</div><div>0 (3-broker replication)</div><div>&lt;2 min (broker replacement)</div></div>
          <div class="pt-row"><div class="pt-name">Elasticsearch</div><div>15 sec (index lag)</div><div>&lt;30 min (reindex from Kafka replay)</div></div>
          <div class="pt-row"><div class="pt-name">S3 media</div><div>0 (cross-region replication)</div><div>Immediate (DNS failover to replica region)</div></div>
        </div>
      </div>
      <div>
        <div class="ans-label">Backup Strategy</div>
        <ul>
          <li><strong>MySQL:</strong> Continuous binlog streaming to S3 (point-in-time recovery to any second); full mysqldump snapshot weekly; PITR tested monthly by automated restore-and-verify job</li>
          <li><strong>Redis:</strong> RDB snapshot to S3 every 1 hour; AOF with fsync every 1 second. For timelines: acceptable to lose 1 hour of fanout — users see slightly stale timeline on failover</li>
          <li><strong>Cassandra:</strong> nodetool snapshot daily; incremental backup every 6 hours; snapshots shipped to S3</li>
          <li><strong>Kafka:</strong> Topics retained 7 days by default; critical topics (tweet-created) retained 30 days; tiered storage to S3 for long-term replay capability</li>
        </ul>
        <div class="ans-label" style="margin-top:10px;">Region Failover Runbook</div>
        <ol>
          <li>Detect: Datadog alert fires when us-east-1 error rate &gt; 5% for 2 min</li>
          <li>Validate: On-call SRE confirms not a false positive</li>
          <li>Failover: Route53 weight shifted 100% to us-west-2 (&lt;60s TTL)</li>
          <li>Promote: Promote us-west-2 MySQL read replica to primary</li>
          <li>Notify: Status page updated; internal incident channel pinged</li>
          <li>Total customer-visible outage target: &lt;5 minutes</li>
        </ol>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">24. Migration Strategy</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Monolith to Microservices</div>
        <p>Twitter's original architecture was a Ruby on Rails monolith ("Monorail") until ~2010. The migration strategy:</p>
        <ol>
          <li><strong>Identify seams:</strong> Map domain boundaries in the monolith — tweet creation, timeline, search, user management are natural microservice boundaries</li>
          <li><strong>Strangler fig pattern:</strong> Route a specific API endpoint from the monolith to a new service without changing the client. Start with low-risk, high-value services first (e.g., User Service)</li>
          <li><strong>Dual-write period:</strong> New service and monolith both write to the same database; new service reads from its own DB; compare results; when consistent → cut over reads</li>
          <li><strong>Dark traffic testing:</strong> Shadow-copy 1% of production traffic to new service; compare response bodies; fix discrepancies before cutover</li>
          <li><strong>Feature flag rollout:</strong> Route 1% → 10% → 50% → 100% of requests to new service; roll back instantly if error rate rises</li>
        </ol>
      </div>
      <div>
        <div class="ans-label">Database Migration</div>
        <div class="code-box">Splitting monolith DB → sharded MySQL:

Phase 1: Introduce tweet_id as Snowflake
  - Add tweet_id column (initially = old auto-increment)
  - Backfill Snowflake IDs for existing tweets
  - Update all queries to use tweet_id

Phase 2: Logical sharding in application
  - Application routes to "shard 0" (still single DB)
  - Verify sharding logic correct with shadow traffic

Phase 3: Physical shard split
  - Create 200 MySQL instances
  - mysqldump shard 0 → import to shard 0 instance
  - For each 1-shard increment:
      a. Copy data to new physical shard
      b. Dual-write for 24h (old + new)
      c. Verify data consistency
      d. Cut over reads to new shard
      e. Remove old shard data after 7 days

Phase 4: Online schema changes
  - Use pt-online-schema-change or gh-ost for any
    future schema migrations on running tables
  - Zero-downtime ALTER TABLE via shadow table + triggers</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">25. Interview Questions &amp; Answers</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Question</div><div>Answer</div><div>Insight</div></div>
      <div class="pt-row"><div class="pt-name">How would you design the home timeline for a user with 10,000 followers?</div><div>Fanout-on-write: when any of the 10,000 accounts they follow tweets, push the tweet ID to their Redis list (LPUSH + LTRIM to 800 entries). On read, LRANGE + MGET tweet objects from cache. Total read: ~5ms from Redis.</div><div>Distinguish between your own followers (irrelevant here) and the users you follow. "Home timeline" is about who you follow, not who follows you.</div></div>
      <div class="pt-row"><div class="pt-name">How would you handle a celebrity (Elon Musk, 170M followers) tweeting?</div><div>Skip fanout-on-write for accounts with &gt;1M followers. At read time, merge follower's Redis timeline with a DB query for celebrity tweets they follow. Cap: a user can follow at most 2,000 celebrities (bounded merge cost at read time).</div><div>This is the key Twitter-specific insight. Pure fanout-on-write = 170M Redis writes per tweet × peak tweet rate = system meltdown.</div></div>
      <div class="pt-row"><div class="pt-name">Why use Snowflake IDs instead of UUID or auto-increment?</div><div>Snowflake IDs are time-ordered, so since_id / max_id pagination is O(log n) index scan. Auto-increment creates a single sequence bottleneck at DB scale. UUIDs are random — not sortable and fragment B-tree indexes.</div><div>ID design is an architectural decision. Time-ordered IDs also allow approximate "tweets after time T" queries without a separate timestamp index.</div></div>
      <div class="pt-row"><div class="pt-name">How would you implement trending topics in real-time?</div><div>Count-Min Sketch per sliding 5-minute window, partitioned by region. Score = velocity (rate of change), not absolute count. Results cached in Redis (60s TTL). Filter spam via user deduplication within window.</div><div>Using absolute count would surface always-popular topics (#love) instead of what's breaking now. Velocity is the correct signal for "trending".</div></div>
      <div class="pt-row"><div class="pt-name">How would you ensure a tweet is never duplicated even under network retries?</div><div>Client sends an Idempotency-Key (UUID) in the request header. Server stores the key in Redis (TTL=24h). On first request: process + cache result. On retry: return cached result. Unique constraint on tweet_id in MySQL provides backend safety net.</div><div>Two-layer defence: application-level idempotency key + database unique constraint. The DB constraint alone is not enough (race condition between check and insert).</div></div>
      <div class="pt-row"><div class="pt-name">How would you scale the search system for 500M tweets/day?</div><div>Time-based Elasticsearch index rotation (one index per month). Hot indices on SSD nodes, cold on HDD. Kafka pipeline for near-real-time indexing (&lt;15s lag). Custom tweet_analyzer for hashtag/mention/emoji parsing. Rank by BM25 + engagement signals + recency decay.</div><div>Time-based indices enable efficient deletion of old data (delete entire index, no per-document deletes) and hot/cold node tiering by index age.</div></div>
      <div class="pt-row"><div class="pt-name">What happens to inactive users' timelines?</div><div>Evict inactive users' Redis timeline keys (LRU eviction). When they log back in, rebuild timeline on cold start: query followed accounts' recent tweets from DB, populate Redis. This is a one-time cost per re-activation, acceptable since it's rare per user but could be ~50M events if many users suddenly become active (e.g., during a major news event).</div><div>Twitter discovered ~30% of followers are 30+ day dormant. Skipping fanout to them reduced Redis write load by ~30%. The cold-start rebuild is bounded by "following count × recent tweets per account".</div></div>
      <div class="pt-row"><div class="pt-name">How would you handle a sudden 10x spike in tweet volume (e.g., during a major event)?</div><div>Pre-scale services 2h before known events (World Cup final, elections). For unexpected spikes: Kafka buffers write load; fanout workers auto-scale based on consumer lag; timeline delivery degrades gracefully (slightly delayed fanout, still served from cache). Rate limiting protects against individual abusers amplifying the spike.</div><div>Kafka is the key buffer here. It absorbs the spike and lets consumers process at their own pace. Without Kafka, 10x spike directly hits Redis and MySQL simultaneously — cascade failure.</div></div>
      <div class="pt-row"><div class="pt-name">Why does Twitter use MySQL rather than a NoSQL DB for tweets?</div><div>Tweets are immutable after creation (strong consistency need), have a well-defined schema, and need transactional semantics for creation. MySQL with sharding gives strong consistency per shard. NoSQL would complicate atomic tweet creation with idempotency key checking. The read scale is handled by Redis cache, not MySQL directly.</div><div>Many candidates assume "big data = NoSQL". The correct framing: NoSQL trades consistency for availability/scale. For tweet creation (rare writes, strong consistency needed), SQL is correct. For timeline reads (high volume, eventual consistency OK), Redis is correct.</div></div>
      <div class="pt-row"><div class="pt-name">How do you handle tweet deletion at scale?</div><div>Soft-delete: set deleted_at timestamp in MySQL (immediate, O(1)). Publish "tweet-deleted" Kafka event. Consumers: (1) Search indexer removes from Elasticsearch; (2) Cache invalidator sets Redis tombstone with short TTL; (3) Fanout purge removes from follower timelines asynchronously. Hard-delete from MySQL after 30 days (legal hold).</div><div>Immediate hard-delete from 150M+ Redis timeline lists would be catastrophically expensive. Soft-delete + propagation is the only viable path. The tombstone in Redis ensures deleted tweets aren't served even on cache hit.</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">26. Trade-off Summary</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;font-weight:bold;background:#1e293b;padding:10px 12px;border-radius:6px;display:grid;">
        <div>Decision</div><div>Chosen Approach &amp; Why</div><div>Alternative &amp; Trade-off</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Timeline Generation</div>
        <div class="dt-yes">Fanout-on-write (push model): pre-compute all follower timelines at tweet time. Read is O(1) Redis lookup. Optimal for the 600:1 read/write ratio.</div>
        <div class="dt-no">Fanout-on-read (pull model): fetch followed accounts' tweets at read time. Simpler writes but O(k) fan-in per read where k = following count. At 35M reads/sec this would crush the DB.</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Celebrity Fanout</div>
        <div class="dt-yes">Hybrid model: skip write fanout for &gt;1M follower accounts; inject celebrity tweets at read time. Prevents write amplification (170M writes/tweet avoided).</div>
        <div class="dt-no">Pure fanout-on-write: simpler read path but catastrophic write amplification. A single Elon tweet → 170M Redis writes in &lt;1 second = OOM and cascading failure.</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Tweet Storage</div>
        <div class="dt-yes">MySQL (sharded): ACID transactions for tweet creation + idempotency enforcement. Strong consistency within shard. Scales to 200 shards × 10M tweets/shard/day.</div>
        <div class="dt-no">Cassandra: higher write throughput but eventual consistency makes idempotency enforcement harder; LWT (lightweight transactions) add latency. Not worth the consistency trade-off for tweet creation.</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Social Graph Storage</div>
        <div class="dt-yes">Cassandra: follow relationships are wide rows (one user → millions of followers). Cassandra's partition model (user_id → all followers) gives O(1) batch reads. Linear scale by adding nodes.</div>
        <div class="dt-no">MySQL: works at small scale but follower_count scans become slow as rows grow into billions. Single-node bottleneck on popular accounts. Would require complex sharding logic.</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Real-time Streaming</div>
        <div class="dt-yes">SSE for timeline streaming: unidirectional (server→client), works over standard HTTP/2, automatic reconnection. Sufficient for timeline update notifications.</div>
        <div class="dt-no">WebSockets: bidirectional overhead not needed for timeline. Reserved for DMs where bidirectional is required. Using WebSockets everywhere increases server connection management complexity.</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Search Index</div>
        <div class="dt-yes">Time-based Elasticsearch index rotation: enables hot/cold node tiering, cheap old-data deletion (drop entire index), and index-level cache warming for recent data.</div>
        <div class="dt-no">Single large Elasticsearch index: simpler queries but can't tier old data to cheaper hardware; deleting old tweets requires expensive per-document operations; index gets too large for efficient caching.</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Engagement Counter Updates</div>
        <div class="dt-yes">Async batch aggregation via Kafka: batch 1-second windows of like/RT events, single bulk MySQL UPDATE. Handles 50K events/sec without overwhelming DB. Slight staleness (~1 min) acceptable.</div>
        <div class="dt-no">Synchronous per-event UPDATE: guarantees real-time accurate counts but at 50K events/sec generates 50K MySQL writes/sec — well beyond safe MySQL write capacity even with sharding.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">27. Key Takeaways</div>
  <div class="ref-body">
    <div class="tip-box">
      <ul>
        <li><strong>The fanout problem is the defining challenge.</strong> Twitter's 600:1 read/write ratio dictates that timelines must be pre-computed at write time. The hybrid model for celebrities (skip write fanout, inject at read) is the most important single design decision in the entire system — know it cold.</li>
        <li><strong>Snowflake IDs are not a detail.</strong> Time-ordered distributed IDs enable cursor-based pagination (since_id / max_id), eliminate DB sequence bottlenecks, and allow approximate time-range queries without secondary indexes. This pattern applies to any globally-distributed write-heavy system.</li>
        <li><strong>Separate your data by access pattern, not by convenience.</strong> MySQL (strong consistency, tweet creation), Redis (low-latency reads, timeline cache), Cassandra (high-write social graph), Elasticsearch (full-text search) — each chosen for what it does best. No single database can handle all of Twitter's access patterns.</li>
        <li><strong>Kafka is the shock absorber.</strong> Decoupling tweet writes from fanout, search indexing, and notifications via Kafka means a spike in tweet volume (celebrity event) does not cascade to Redis, MySQL, and Elasticsearch simultaneously. Consumers process at their own rate; data is never lost within the retention window.</li>
        <li><strong>Eventual consistency is a product decision, not a failure.</strong> Twitter explicitly accepts that home timelines may be seconds stale, engagement counts minutes stale, and search results 15 seconds stale. These are deliberate CAP trade-offs that enable the scale. Know where Twitter draws the "must be consistent" line (tweet creation) vs. the "eventually consistent is fine" line (everything else).</li>
        <li><strong>Inactive users are a free optimisation.</strong> ~30% of Twitter followers are dormant. Skipping fanout to inactive users and rebuilding their timeline on re-activation reduced real production Redis write load by ~30%. Always ask "does the tail of the distribution need the same treatment as the head?"</li>
        <li><strong>Read-your-writes consistency is a special case.</strong> Users must immediately see their own tweet after posting. This is solved by routing that specific user's reads to the MySQL primary for 5 seconds after a write — a targeted exception to the "reads go to replicas" rule, not a wholesale consistency upgrade.</li>
      </ul>
    </div>
  </div>
</div>
`;
