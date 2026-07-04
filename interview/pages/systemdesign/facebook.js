window.Pages['sd-facebook'] = `
<div class="page-header">
  <div class="breadcrumb">System Design › <span>Facebook (Social Network)</span></div>
  <h1>📘 Facebook — Social Network System Design</h1>
  <p>News Feed generation, social graph storage, photo/media pipeline, and real-time interactions at 3B+ user scale</p>
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
      <text x="14" y="72" font-size="11" fill="#888" font-family="monospace">CLIENT</text>
      <text x="14" y="152" font-size="11" fill="#888" font-family="monospace">EDGE</text>
      <text x="14" y="232" font-size="11" fill="#888" font-family="monospace">SERVICES</text>
      <text x="14" y="342" font-size="11" fill="#888" font-family="monospace">DATA</text>

      <!-- Layer dividers -->
      <line x1="80" y1="90" x2="890" y2="90" stroke="#1e2530" stroke-width="1"/>
      <line x1="80" y1="170" x2="890" y2="170" stroke="#1e2530" stroke-width="1"/>
      <line x1="80" y1="270" x2="890" y2="270" stroke="#1e2530" stroke-width="1"/>

      <!-- CLIENT LAYER -->
      <!-- Mobile App -->
      <rect x="90" y="42" width="100" height="44" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="140" y="61" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📱 Mobile</text>
      <text x="140" y="75" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">iOS / Android</text>

      <!-- Web Browser -->
      <rect x="210" y="42" width="100" height="44" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="260" y="61" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🌐 Web</text>
      <text x="260" y="75" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">React SPA</text>

      <!-- EDGE LAYER -->
      <!-- CDN -->
      <rect x="90" y="110" width="120" height="44" rx="8" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="150" y="129" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🌍 CDN</text>
      <text x="150" y="143" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Video / Images</text>

      <!-- API Gateway -->
      <rect x="240" y="110" width="130" height="44" rx="8" fill="#1a2d20" stroke="#4ade80" stroke-width="1.5"/>
      <text x="305" y="129" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🔀 API Gateway</text>
      <text x="305" y="143" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Auth / Rate Limit</text>

      <!-- SERVICES LAYER -->
      <!-- User Service -->
      <rect x="90" y="185" width="105" height="44" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="142" y="204" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">👤 User Svc</text>
      <text x="142" y="218" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Profile / Friends</text>

      <!-- News Feed Service -->
      <rect x="210" y="185" width="115" height="44" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="267" y="204" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📰 Feed Svc</text>
      <text x="267" y="218" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Fan-out / Rank</text>

      <!-- Post Service -->
      <rect x="340" y="185" width="105" height="44" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="392" y="204" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📝 Post Svc</text>
      <text x="392" y="218" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">CRUD Posts</text>

      <!-- Messenger Service -->
      <rect x="460" y="185" width="115" height="44" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="517" y="204" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">💬 Messenger</text>
      <text x="517" y="218" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">WebSocket / Chat</text>

      <!-- Search Service -->
      <rect x="590" y="185" width="110" height="44" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="645" y="204" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🔍 Search</text>
      <text x="645" y="218" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">TAO / Haystack</text>

      <!-- Ads Service -->
      <rect x="715" y="185" width="100" height="44" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="765" y="204" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📢 Ads Svc</text>
      <text x="765" y="218" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Targeting</text>

      <!-- Kafka -->
      <rect x="340" y="245" width="110" height="18" rx="5" fill="#2d2a1a" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="395" y="258" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">⚡ Kafka Event Bus</text>

      <!-- DATA LAYER -->
      <!-- MySQL + TAO -->
      <rect x="90" y="290" width="115" height="44" rx="8" fill="#1a2040" stroke="#60a5fa" stroke-width="1.5"/>
      <text x="147" y="309" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🗄️ MySQL+TAO</text>
      <text x="147" y="323" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Social Graph</text>

      <!-- Cassandra -->
      <rect x="220" y="290" width="115" height="44" rx="8" fill="#1a2040" stroke="#34d399" stroke-width="1.5"/>
      <text x="277" y="309" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🗃️ Cassandra</text>
      <text x="277" y="323" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Timeline / Feed</text>

      <!-- Memcache -->
      <rect x="350" y="290" width="105" height="44" rx="8" fill="#2d1a1a" stroke="#f87171" stroke-width="1.5"/>
      <text x="402" y="309" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">⚡ Memcache</text>
      <text x="402" y="323" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">L1/L2 Cache</text>

      <!-- Haystack -->
      <rect x="470" y="290" width="115" height="44" rx="8" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="527" y="309" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📸 Haystack</text>
      <text x="527" y="323" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Photo Storage</text>

      <!-- Hive -->
      <rect x="600" y="290" width="105" height="44" rx="8" fill="#2d1f1a" stroke="#fb923c" stroke-width="1.5"/>
      <text x="652" y="309" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🐝 Hive</text>
      <text x="652" y="323" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Analytics / DW</text>

      <!-- ZooKeeper / Config -->
      <rect x="720" y="290" width="110" height="44" rx="8" fill="#2d1a1a" stroke="#f87171" stroke-width="1.5"/>
      <text x="775" y="309" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📊 Monitoring</text>
      <text x="775" y="323" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">ODS / Scuba</text>

      <!-- ARROWS: Client to Edge -->
      <line x1="140" y1="86" x2="150" y2="110" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="260" y1="86" x2="305" y2="110" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- CDN arrows to Haystack -->
      <line x1="150" y1="154" x2="527" y2="290" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Gateway to Services -->
      <line x1="305" y1="154" x2="200" y2="185" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="305" y1="154" x2="267" y2="185" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="305" y1="154" x2="392" y2="185" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="305" y1="154" x2="517" y2="185" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="305" y1="154" x2="645" y2="185" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="305" y1="154" x2="765" y2="185" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Services to Kafka -->
      <line x1="267" y1="229" x2="360" y2="245" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="392" y1="229" x2="395" y2="245" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="517" y1="229" x2="430" y2="245" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Services to Data -->
      <line x1="142" y1="229" x2="147" y2="290" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="267" y1="229" x2="277" y2="290" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="392" y1="229" x2="402" y2="290" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="517" y1="229" x2="527" y2="290" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="645" y1="229" x2="652" y2="290" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="765" y1="229" x2="775" y2="290" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Kafka to Hive -->
      <line x1="430" y1="263" x2="652" y2="290" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Legend -->
      <rect x="90" y="375" width="12" height="12" rx="2" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="108" y="385" font-size="9" fill="#94a3b8" font-family="monospace">Client</text>
      <rect x="155" y="375" width="12" height="12" rx="2" fill="#1a2d20" stroke="#4ade80" stroke-width="1.5"/>
      <text x="173" y="385" font-size="9" fill="#94a3b8" font-family="monospace">Gateway</text>
      <rect x="230" y="375" width="12" height="12" rx="2" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="248" y="385" font-size="9" fill="#94a3b8" font-family="monospace">Microservice</text>
      <rect x="330" y="375" width="12" height="12" rx="2" fill="#2d2a1a" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="348" y="385" font-size="9" fill="#94a3b8" font-family="monospace">Msg Queue</text>
      <rect x="425" y="375" width="12" height="12" rx="2" fill="#2d1a1a" stroke="#f87171" stroke-width="1.5"/>
      <text x="443" y="385" font-size="9" fill="#94a3b8" font-family="monospace">Cache</text>
      <rect x="490" y="375" width="12" height="12" rx="2" fill="#1a2040" stroke="#60a5fa" stroke-width="1.5"/>
      <text x="508" y="385" font-size="9" fill="#94a3b8" font-family="monospace">SQL DB</text>
      <rect x="560" y="375" width="12" height="12" rx="2" fill="#1a2040" stroke="#34d399" stroke-width="1.5"/>
      <text x="578" y="385" font-size="9" fill="#94a3b8" font-family="monospace">NoSQL DB</text>
      <rect x="635" y="375" width="12" height="12" rx="2" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="653" y="385" font-size="9" fill="#94a3b8" font-family="monospace">Storage</text>
      <rect x="700" y="375" width="12" height="12" rx="2" fill="#2d1f1a" stroke="#fb923c" stroke-width="1.5"/>
      <text x="718" y="385" font-size="9" fill="#94a3b8" font-family="monospace">Monitoring</text>
    </svg>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">1. Executive Summary</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Problem</div>
        <p>Let billions of users create a social graph (friends/follows/pages/groups), publish posts/photos/videos, and see a personalized, ranked News Feed of the most relevant updates from their network — with likes, comments, shares, and notifications delivered in near real-time.</p>
        <div class="ans-label" style="margin-top:12px;">Scale</div>
        <ul>
          <li>3B+ monthly active users (MAU), ~2.1B+ daily active users (DAU)</li>
          <li>500M+ posts/status-updates and 350M+ photos uploaded per day</li>
          <li>100B+ friend/follow edges in the social graph</li>
          <li>Average user has 200-300 friends; power users/pages have millions of followers</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Core Challenges</div>
        <ul>
          <li>Ranking a personalized feed from thousands of candidate stories in &lt;200ms</li>
          <li>Fan-out of a single post to millions of followers (celebrity/page problem)</li>
          <li>Social graph traversal ("friends of friends", mutual friends) at sub-10ms</li>
          <li>Storing/serving hundreds of petabytes of photos/videos cheaply and fast</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Functional Requirements</div>
        <ul>
          <li>Create/read/update/delete posts (text, photo, video, link)</li>
          <li>Friend/follow graph management (add, accept, remove, block)</li>
          <li>Personalized News Feed generation &amp; ranking</li>
          <li>Like, comment, share/reshare on posts</li>
          <li>Real-time notifications (like, comment, tag, friend request)</li>
          <li>Search for people, pages, groups, and posts</li>
          <li>Photo/video upload, processing, and serving</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Non-Functional Requirements</div>
        <div class="pattern-table">
          <div class="pt-row pt-header"><div>NFR</div><div>Target</div><div>Why</div><div>Approach</div></div>
          <div class="pt-row"><div class="pt-name">Feed Load Latency</div><div>&lt; 200ms P99</div><div>Users bounce on slow feed loads</div><div>Pre-computed feed cache (fan-out-on-write) + edge cache</div></div>
          <div class="pt-row"><div class="pt-name">Social Graph Read Throughput</div><div>~1B+ graph reads/sec globally</div><div>Every page render checks friendship/privacy edges</div><div>TAO — in-memory graph cache over MySQL</div></div>
          <div class="pt-row"><div class="pt-name">Availability</div><div>99.99%</div><div>Billions of users rely on it as core communication infra</div><div>Multi-region active-active, graceful degradation</div></div>
          <div class="pt-row"><div class="pt-name">Consistency</div><div>Eventual (feed, likes, counts); strong (auth, privacy settings)</div><div>A like-count off by 1 is fine; a privacy leak is not</div><div>Tunable consistency per data type, not one-size-fits-all</div></div>
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
      <div class="pt-row"><div class="pt-name">DAU</div><div>2.1B daily active users</div><div>given</div><div>2.1B</div></div>
      <div class="pt-row"><div class="pt-name">MAU</div><div>3.0B monthly active users</div><div>given</div><div>3.0B</div></div>
      <div class="pt-row"><div class="pt-name">Avg feed loads/user/day</div><div>10 feed refreshes/day/DAU</div><div>2.1B × 10 / 86,400s</div><div>~243K req/sec avg</div></div>
      <div class="pt-row"><div class="pt-name">Peak requests/sec</div><div>4x average at regional peak hours</div><div>243K × 4</div><div>~970K req/sec peak</div></div>
      <div class="pt-row"><div class="pt-name">Posts created/day</div><div>500M posts/day (status, photo, video, share)</div><div>500M / 86,400s</div><div>~5,800 writes/sec avg</div></div>
      <div class="pt-row"><div class="pt-name">Read:Write ratio</div><div>Feed views vs posts created</div><div>243K : 5.8K</div><div>~40:1 (heavily read-dominant)</div></div>
      <div class="pt-row"><div class="pt-name">Likes/comments/day</div><div>4B likes + 700M comments/day</div><div>4.7B / 86,400s</div><div>~54K engagement writes/sec avg</div></div>
      <div class="pt-row"><div class="pt-name">Photo uploads/day</div><div>350M photos/day, avg 2MB (multiple resolutions)</div><div>350M × 2MB</div><div>~700 TB/day raw ingest</div></div>
      <div class="pt-row"><div class="pt-name">Video storage/day</div><div>4M videos/day, avg 50MB avg encoded</div><div>4M × 50MB</div><div>~200 TB/day</div></div>
      <div class="pt-row"><div class="pt-name">Social graph size</div><div>3B users × ~130 avg edges (mutual friend model)</div><div>3B × 130 / 2</div><div>~195B edges stored</div></div>
      <div class="pt-row"><div class="pt-name">Storage — 5yr photos</div><div>700 TB/day × 365 × 5</div><div>700TB × 1825</div><div>~1.27 EB (before compression/dedup)</div></div>
      <div class="pt-row"><div class="pt-name">CDN egress (media)</div><div>Avg photo viewed 15x, 200KB served size (post-compression)</div><div>350M × 15 × 200KB</div><div>~1 PB/day CDN egress</div></div>
      <div class="pt-row"><div class="pt-name">Bandwidth (feed API)</div><div>970K req/sec × 15KB avg payload</div><div>—</div><div>~14.5 GB/sec peak</div></div>
      <div class="pt-row"><div class="pt-name">5-year growth</div><div>8% YoY MAU growth</div><div>3.0B × 1.08^5</div><div>~4.4B MAU by year 5</div></div>
    </div>
    <div class="tip-box" style="margin-top:10px;">✅ Conclusion: the system is read-dominant by ~40:1, and media (photo/video) dwarfs text-post storage by 3+ orders of magnitude — this is why Facebook built Haystack (custom blob store) instead of using a general-purpose filesystem, and why feed reads are served almost entirely from cache, not from a database.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">3. APIs</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Endpoint</div><div>Method</div><div>Purpose</div><div>Auth</div></div>
      <div class="pt-row"><div class="pt-name">/v1/feed</div><div>GET</div><div>Fetch personalized ranked News Feed (paginated)</div><div>Bearer JWT / OAuth2</div></div>
      <div class="pt-row"><div class="pt-name">/v1/posts</div><div>POST</div><div>Create a new post (text/photo/video/link)</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/posts/{id}/like</div><div>POST</div><div>Like/unlike a post</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/posts/{id}/comments</div><div>POST</div><div>Add a comment to a post</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/friends/request</div><div>POST</div><div>Send a friend request</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/friends/{id}/accept</div><div>POST</div><div>Accept a pending friend request</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/search</div><div>GET</div><div>Search people, pages, groups, posts</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/media/upload</div><div>POST</div><div>Upload photo/video (multipart or pre-signed URL)</div><div>Bearer JWT</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Fetch Feed — Request/Response</div>
        <div class="code-box">GET /v1/feed?cursor=abc123&amp;limit=20
Headers:
  Authorization: Bearer &lt;jwt&gt;
  X-Request-Id: req-9931
  X-Client-Version: 421.0

Response 200:
{
  "posts": [
    {
      "postId": "P-772341",
      "authorId": "U-5521",
      "type": "PHOTO",
      "text": "Weekend trip!",
      "mediaUrl": "https://cdn.fb.com/img/9a1c.jpg",
      "likeCount": 214,
      "commentCount": 18,
      "rankScore": 0.912,
      "createdAt": "2026-07-03T10:22:00Z"
    }
  ],
  "nextCursor": "abc124"
}</div>
      </div>
      <div>
        <div class="ans-label">API Design Standards</div>
        <ul>
          <li><strong>Status codes:</strong> 201 created, 200 ok, 400 bad request, 401 unauthorized, 403 forbidden (privacy/blocked), 404 not found, 409 conflict (duplicate like), 429 rate limited</li>
          <li><strong>Auth:</strong> OAuth2 + short-lived JWT access token (1hr) + refresh token; app-level API keys for third-party Graph API consumers</li>
          <li><strong>Pagination:</strong> cursor-based, never offset-based (feed is a moving stream — offset pagination would skip/duplicate items as new posts arrive)</li>
          <li><strong>Rate limiting:</strong> token bucket per user/app (e.g. 200 calls/hour/user on Graph API), stricter limits on write endpoints</li>
          <li><strong>Versioning:</strong> URI + header versioning (<code>/v1/</code>, deprecation notices via response headers), Graph API keeps ~2 year support windows</li>
          <li><strong>Idempotency:</strong> required on POST /posts and /like — Idempotency-Key header prevents duplicate posts/likes on client retry</li>
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
      <div class="pt-row"><div class="pt-name">MySQL (sharded, InnoDB)</div><div>User accounts, auth credentials, canonical post/comment records</div><div>ACID needed for account integrity; Facebook's proven at extreme scale (with heavy sharding)</div><div>PK: user_id/post_id (64-bit snowflake-style ID); shard key: user_id</div></div>
      <div class="pt-row"><div class="pt-name">TAO (graph cache over MySQL)</div><div>Social graph: friend edges, likes, comments, page-follows as (object, association) pairs</div><div>Graph reads (99%+) must be sub-ms; TAO is purpose-built read-through cache for exactly this "objects and associations" model</div><div>assoc_key = (id1, atype, id2); indexed by id1+atype for fast "get all friends" queries</div></div>
      <div class="pt-row"><div class="pt-name">Memcache (look-aside cache)</div><div>Rendered feed pages, user profile fragments, session data</div><div>Read-dominant workload (~40:1) — cache absorbs almost all read QPS before hitting MySQL</div><div>Key = feed:{user_id}:{page}; invalidated on write via cache-aside pattern</div></div>
      <div class="pt-row"><div class="pt-name">Haystack (custom blob store)</div><div>Photos and video segments</div><div>Generic filesystems (e.g. NFS/POSIX) waste an I/O per-photo on metadata lookups; Haystack batches many photos per physical file</div><div>Needle = (photo_id, offset, size) inside a large physical volume file; in-memory index maps photo_id → needle</div></div>
      <div class="pt-row"><div class="pt-name">RocksDB / HBase (time-series)</div><div>Notification events, activity log, News Feed candidate store</div><div>High write throughput, LSM-tree friendly for append-heavy event data</div><div>Row key: user_id + reverse timestamp (newest first)</div></div>
      <div class="pt-row"><div class="pt-name">Elasticsearch</div><div>People/page/post/group search index</div><div>Full-text + faceted search that MySQL/TAO can't do efficiently</div><div>Indexed on name, bio, post text, location; sharded by document hash</div></div>
    </div>
    <div class="code-box" style="margin-top:12px;">-- Posts table (MySQL, sharded by author_id)
CREATE TABLE posts (
  post_id       BIGINT PRIMARY KEY,   -- 64-bit snowflake ID (time-sortable)
  author_id     BIGINT NOT NULL,
  post_type     VARCHAR(10) NOT NULL, -- TEXT/PHOTO/VIDEO/LINK/SHARE
  text_content  TEXT,
  media_ref     VARCHAR(255),         -- Haystack needle reference
  privacy       VARCHAR(10) NOT NULL, -- PUBLIC/FRIENDS/ONLY_ME/CUSTOM
  like_count    INT DEFAULT 0,        -- denormalized counter, eventually consistent
  created_at    TIMESTAMP NOT NULL DEFAULT now(),
  INDEX idx_author_time (author_id, created_at DESC)
);

-- TAO association model (conceptual, not literal SQL)
-- (id1=user_A, atype="FRIEND", id2=user_B, time, data)
-- (id1=post_X, atype="LIKED_BY", id2=user_C, time)
-- Sharding key: id1 (source object) -- co-locates "all edges from this node"</div>
    <div class="warn-box" style="margin-top:10px;">⚠️ Never model the social graph as SQL JOINs across a "friends" table at this scale — a "friends of friends" query would fan out across thousands of shards. TAO exists precisely to make single-hop and simple multi-hop graph traversal an O(1) cache lookup instead of a distributed JOIN.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">5. High-Level Architecture</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step blue">Web / Mobile Clients</div>
      <div class="flow-arrow">↓ DNS + CDN (static assets, photos, videos)</div>
      <div class="flow-step">API Gateway / Load Balancer (authn, rate limit, routing)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Application Servers (stateless) — Feed, Graph, Post, Media, Notification APIs</div>
      <div class="flow-arrow">↓ reads/writes fan out to</div>
      <div class="flow-step green">TAO (social graph cache)</div>
      <div class="flow-step green">Memcache (feed/profile cache)</div>
      <div class="flow-step green">Search Index (Elasticsearch)</div>
      <div class="flow-arrow">↓ backed by</div>
      <div class="flow-step">MySQL (sharded, source of truth) ⇄ Haystack (photo/video blob store)</div>
      <div class="flow-arrow">↓ async events</div>
      <div class="flow-step">Kafka (post.created, like.added, comment.added, friend.accepted)</div>
      <div class="flow-arrow">↓ consumed by</div>
      <div class="flow-step">Feed Fan-out Workers · Notification Service · Analytics Pipeline · Search Indexer</div>
    </div>
    <p style="margin-top:12px;">Cross-cutting: <strong>Blob/CDN</strong> (photo/video delivery), <strong>Monitoring</strong> (custom metrics pipeline + Grafana-equivalent on every service), <strong>ML Ranking Service</strong> (feeds the Feed Service a relevance score per candidate story).</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">6. Detailed Component Design</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Responsibility</div><div>Key Design Point</div><div>Scaling Model</div></div>
      <div class="pt-row"><div class="pt-name">User Service</div><div>Account CRUD, auth, profile data</div><div>MySQL source of truth, Memcache read-through for profile reads</div><div>Stateless, sharded by user_id</div></div>
      <div class="pt-row"><div class="pt-name">Feed Service</div><div>Generates &amp; ranks the personalized News Feed</div><div>Hybrid fan-out: fan-out-on-write for normal users (pre-computed feed in cache), fan-out-on-read for celebrities/pages with millions of followers (merged at read time to avoid a write storm)</div><div>Stateless read path; async fan-out workers scale with post volume</div></div>
      <div class="pt-row"><div class="pt-name">Social Graph Service (TAO)</div><div>Stores/serves friend edges, likes, follows as objects+associations</div><div>Read-through cache over sharded MySQL; leader-follower replication per region with async cross-region replication</div><div>Massively read-scaled — TAO tier sized for ~1B+ reads/sec</div></div>
      <div class="pt-row"><div class="pt-name">Photo/Media Service</div><div>Upload, transcode, store, and serve photos/videos</div><div>Haystack for photos (few large files instead of billions of small ones); adaptive-bitrate transcoding pipeline for video</div><div>Upload path scales with ingest workers; read path nearly 100% CDN-offloaded</div></div>
      <div class="pt-row"><div class="pt-name">Notification Service</div><div>Real-time + digest notifications (like, comment, tag, request)</div><div>Consumes Kafka events, applies dedup/batching (don't notify 50 times for 50 likes in a minute), delivers via push/WebSocket/email</div><div>Stateless consumer group, partitioned by user_id</div></div>
      <div class="pt-row"><div class="pt-name">Search Service</div><div>People/page/group/post search with autocomplete</div><div>Elasticsearch index kept in near-real-time sync via CDC from MySQL/Kafka</div><div>Sharded index, replicated for read scaling</div></div>
      <div class="pt-row"><div class="pt-name">Analytics/Ranking Service</div><div>Feature extraction &amp; ML scoring for feed ranking, ad targeting</div><div>Offline batch (Hadoop/Spark-style) feature pipelines + online low-latency scoring service</div><div>Batch tier scales horizontally offline; online scorer is latency-critical and heavily cached per user-session</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">7. Sequence Diagrams</div>
  <div class="ref-body">
    <div class="ans-label">Happy Path — User Posts, Friends Get It in Feed</div>
    <div class="code-box">Client    APIGateway   PostService   Kafka     FanoutWorker   Memcache(feeds)
  |--createPost------>|              |          |              |
  |                    |--save(post)->|          |              |
  |                    |<--postId-----|          |              |
  |<--201 Created------|              |          |              |
  |                    |--publish(post.created)->|              |
  |                    |                          |--consume---->|
  |                    |                          |--getFriends(TAO)
  |                    |                          |--for each friend: prepend postId to feed:{friendId}
  |                    |                          |------------->|  (write to N friend feed caches)</div>

    <div class="ans-label" style="margin-top:14px;">Failure Path — Celebrity Post Overwhelms Fan-out</div>
    <div class="code-box">PostService   FanoutWorker         TAO (get followers)      Memcache
   |--publish(post.created)-->|                         |            |
   |                          |--getFollowers(10M)------>|            |
   |                          |<--[10M follower IDs]-----|            |
   |                          |   [fan-out-on-write to 10M caches would take minutes
   |                          |    and thrash the cache tier -- ABORT fan-out-on-write]
   |                          |--markAuthorAsHighFanout(true)
   |                          |--skip cache writes; rely on fan-out-on-READ instead
   |                          |--index post in "celebrity post" store for merge-at-read</div>

    <div class="ans-label" style="margin-top:14px;">Retry — Notification Delivery Failure</div>
    <div class="code-box">NotificationWorker   PushGateway (APNs/FCM)
   |--send(notification)-->|
   |                       [gateway 503]
   |<--retry(1)------------|  (exponential backoff: 200ms)
   |--send(notification)-->|
   |<--retry(2)------------|  (backoff: 800ms)
   |--send(notification)-->|
   |<--ack------------------|
   |  (if 5 retries fail -> DLQ, notification dropped, delivered via in-app badge instead)</div>

    <div class="ans-label" style="margin-top:14px;">Timeout — Ranking Service Slow to Score Feed</div>
    <div class="code-box">FeedService        RankingService (ML scorer)
   |--scoreRequest(candidates, 150ms budget)-->|
   |         (model inference taking too long — GPU queue backed up)
   |<--timeout after 150ms----------------------|  (no response received)
   |--fallback: rank by reverse-chronological order instead
   |--serveFeed(degraded-but-available)</div>
    <div class="tip-box" style="margin-top:10px;">✅ Notice the celebrity fan-out problem is solved architecturally (switch strategy), not just retried — some failures need a different algorithm, not a retry loop.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">8. Database Scaling</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Sharding Strategy</div>
        <p><strong>Shard key: user_id</strong> for posts/profile data (co-locates a user's own data), and <strong>id1 (source node)</strong> for TAO associations (co-locates "all edges originating from this object" so "get my friends" is single-shard). Cross-shard queries (e.g. "mutual friends") are resolved by parallel fan-out + merge at the application layer.</p>
        <div class="ans-label" style="margin-top:12px;">Read Replicas</div>
        <p>MySQL: 1 primary + multiple read replicas per shard; TAO's own read-cache tier absorbs the vast majority of reads before they ever reach a replica.</p>
      </div>
      <div>
        <div class="ans-label">Replication</div>
        <p>MySQL uses leader-follower replication within a region, plus asynchronous cross-region replication for disaster recovery and to serve reads from the nearest region (accepting some replication lag for non-critical data).</p>
        <div class="ans-label" style="margin-top:12px;">CQRS</div>
        <p>Write model (normalized MySQL) is separate from read models: the ranked/denormalized Feed cache (Memcache), the Search index (Elasticsearch), and the Analytics warehouse (Hive/Presto-style) are all independently-built read views fed by the same event stream.</p>
      </div>
    </div>
    <div class="warn-box" style="margin-top:12px;">⚠️ Counters (like_count, comment_count) are NOT read from MySQL on the hot path — they're maintained as approximate, eventually-consistent counters in Memcache/TAO and periodically reconciled, because exact real-time counts at this write volume would require serializing every like through a single row lock.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">9. Cache Strategy</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Cache</div><div>Pattern</div><div>TTL</div><div>Why</div></div>
      <div class="pt-row"><div class="pt-name">Memcache "look-aside" (Facebook's classic pattern)</div><div>Cache-aside: app reads cache, on miss reads MySQL and populates cache itself</div><div>No fixed TTL — invalidated explicitly on write (McSquared/deletion-based invalidation)</div><div>Gives app full control over consistency; avoids serving stale data past a write</div></div>
      <div class="pt-row"><div class="pt-name">Pre-computed feed (per user)</div><div>Write-back (fan-out worker pushes new posts into follower feed caches asynchronously)</div><div>Rolling window, ~800 most recent candidate posts kept</div><div>Feed read becomes O(1) cache read instead of an expensive fan-out-on-read query</div></div>
      <div class="pt-row"><div class="pt-name">TAO graph cache</div><div>Read-through with write-through on association changes</div><div>Long-lived, invalidated on graph mutation</div><div>Graph changes (friend add) are relatively rare vs. graph reads (~10,000:1)</div></div>
      <div class="pt-row"><div class="pt-name">Photo/video CDN edge cache</div><div>Cache-aside at the edge (CDN pulls from Haystack on miss)</div><div>Days to weeks depending on popularity</div><div>Media is immutable once published — ideal cache candidate</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Hot Key Problem</div>
        <p>A viral post or celebrity profile becomes an extreme hot key, overwhelming the single Memcache node hosting it. Mitigated by "leases" (Facebook's Memcache lease mechanism prevents thundering herd on a single key) and client-side request coalescing so concurrent requests for the same key share one backend fetch.</p>
      </div>
      <div>
        <div class="ans-label">Cache Stampede Prevention</div>
        <p>Memcache leases: on a cache miss, the first requester gets a "lease token" and is responsible for repopulating the cache; subsequent concurrent requesters are told to briefly wait rather than all hammering MySQL simultaneously.</p>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">10. Messaging</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Broker</div><div>Used For</div><div>Why This One</div></div>
      <div class="pt-row"><div class="pt-name">Kafka</div><div>post.created, like.added, comment.added, friend.accepted, analytics firehose</div><div>Extreme throughput (millions of events/sec), replay for reprocessing/backfill of feed-ranking models, per-partition ordering by user_id/post_id</div></div>
      <div class="pt-row"><div class="pt-name">Queue (SQS/RabbitMQ-equivalent)</div><div>Push-notification dispatch, email digest jobs</div><div>Simple point-to-point queue semantics fit fire-and-forget delivery jobs better than a durable log</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Delivery Guarantees</div>
        <ul>
          <li><strong>Like/comment counters:</strong> at-least-once with idempotent apply (dedupe by event_id) — a duplicate like-event must not double-count</li>
          <li><strong>Feed fan-out events:</strong> at-least-once — a duplicate fan-out just re-writes the same feed entry, harmless</li>
          <li><strong>Ordering:</strong> partition key = user_id for profile/graph events, ensuring a user's own event stream stays ordered (critical so "unfriend" never processes before "friend request accepted")</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Retry / DLQ</div>
        <p>3-5 retries with exponential backoff (200ms → 800ms → 3.2s). After exhausting retries, message → Dead Letter Queue; on-call paged if DLQ depth exceeds threshold. Malformed/poison messages route straight to DLQ without retry so they never block a Kafka partition behind them.</p>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">11. Storage</div>
  <div class="ref-body">
    <ul>
      <li><strong>Haystack (Facebook's custom photo store):</strong> instead of one file per photo (which wastes disk I/O on filesystem metadata lookups at billions of photos), Haystack packs many photos into a single large physical "volume" file; an in-memory index maps photo_id → (volume, offset, size), reducing photo reads to a single disk seek</li>
      <li><strong>Blob/Object Storage (cold tier):</strong> older/less-accessed photos and video archives move to a cheaper cold storage tier after an access-frequency threshold</li>
      <li><strong>CDN:</strong> serves virtually all photo/video reads at the edge — origin (Haystack) is hit only on cache miss, keeping origin traffic a small fraction of total egress</li>
      <li><strong>Video transcoding:</strong> uploaded video is transcoded into multiple adaptive-bitrate renditions (240p-1080p+) asynchronously; playback uses adaptive streaming to match the viewer's network conditions</li>
      <li><strong>Image processing:</strong> on upload, an async worker generates multiple resolutions (thumbnail, feed-size, full-res) and strips EXIF metadata for privacy</li>
    </ul>
    <div class="tip-box" style="margin-top:10px;">✅ The key Haystack insight: at billions of photos, the bottleneck isn't disk capacity, it's disk IOPS spent on filesystem metadata — solved by treating "many small photos" as "few large append-only files with an external index," which is now a common pattern (see also: Kafka's own log segments).</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">12. Search</div>
  <div class="ref-body">
    <p>Search spans multiple entity types (people, pages, groups, posts) with very different ranking needs — a person search prioritizes social proximity (mutual friends) over pure text relevance, while a post search is closer to classic full-text + recency ranking.</p>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Feature</div><div>Approach</div></div>
      <div class="pt-row"><div class="pt-name">People search</div><div>Blends text match (name) with social-graph signals from TAO (mutual friends, same city/school rank higher)</div></div>
      <div class="pt-row"><div class="pt-name">Post/content search</div><div>Elasticsearch inverted index on post text; ranked by relevance + recency + engagement</div></div>
      <div class="pt-row"><div class="pt-name">Autocomplete</div><div>Prefix-trie/edge-ngram index served from an in-memory tier for sub-50ms suggestions as the user types</div></div>
      <div class="pt-row"><div class="pt-name">Filters</div><div>Date range, content type (photos/videos/posts), people vs. pages vs. groups</div></div>
      <div class="pt-row"><div class="pt-name">Index freshness</div><div>Near-real-time via CDC/Kafka stream from MySQL into Elasticsearch (seconds of lag, not immediate)</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">13. Scalability</div>
  <div class="ref-body">
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">H</div><div class="principle-name">Horizontal Scaling</div><p>Every service (Feed, Graph, Media, Notification) is stateless and scales out independently based on its own load profile.</p></div>
      <div class="principle-card"><div class="principle-icon">S</div><div class="principle-name">User-ID Sharding</div><p>User_id is the natural partition key for profile/post data; id1 (source node) shards the social graph — both keep the vast majority of queries single-shard.</p></div>
      <div class="principle-card"><div class="principle-icon">A</div><div class="principle-name">Auto-Scaling</div><p>Fan-out workers and the ranking-inference tier auto-scale on queue depth / GPU utilization, tuned for daily and event-driven (viral post) spikes.</p></div>
      <div class="principle-card"><div class="principle-icon">B</div><div class="principle-name">Backpressure</div><p>Fan-out queue applies backpressure via consumer lag alerts — a temporarily stale feed is far better than an overloaded cache tier taking down reads for everyone.</p></div>
      <div class="principle-card"><div class="principle-icon">R</div><div class="principle-name">Rate Limiting</div><p>Per-user API throttling on Graph API calls prevents scraping/abuse; per-app quotas isolate one noisy third-party integration from affecting others.</p></div>
      <div class="principle-card"><div class="principle-icon">L</div><div class="principle-name">Load Balancing</div><p>Consistent hashing at the cache tier minimizes re-shuffling when Memcache/TAO nodes are added or removed.</p></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">14. Reliability</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Pattern</div><div>Applied To</div><div>Behavior</div></div>
      <div class="pt-row"><div class="pt-name">Circuit Breaker</div><div>Feed Service → ML Ranking Service calls</div><div>Opens after repeated timeouts; feed falls back to reverse-chronological ordering rather than blocking</div></div>
      <div class="pt-row"><div class="pt-name">Retry</div><div>Fan-out Worker → Memcache writes</div><div>3 retries, exponential backoff, then DLQ + async reconciliation job</div></div>
      <div class="pt-row"><div class="pt-name">Bulkhead</div><div>Photo upload thread pools vs. feed-read thread pools</div><div>Isolated pools so a burst of photo uploads can't starve feed reads</div></div>
      <div class="pt-row"><div class="pt-name">Timeout</div><div>Ranking Service scoring call</div><div>150ms hard budget, falls back to simpler heuristic ranking</div></div>
      <div class="pt-row"><div class="pt-name">Idempotency</div><div>POST /posts, POST /like</div><div>Idempotency-Key header prevents duplicate posts/likes on client retry</div></div>
      <div class="pt-row"><div class="pt-name">Graceful Degradation</div><div>Search index unavailable</div><div>Falls back to a cached "trending"/recent list rather than showing an error page</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">15. Security</div>
  <div class="ref-body">
    <ul>
      <li><strong>AuthN:</strong> OAuth2 + JWT (short-lived access token + refresh token), optional 2FA (SMS/TOTP) for login</li>
      <li><strong>AuthZ:</strong> Privacy-aware ABAC on every content read — a post's visibility (PUBLIC/FRIENDS/CUSTOM) is checked against the requester's graph relationship before serving; RBAC for internal admin/moderation tools</li>
      <li><strong>Encryption:</strong> TLS 1.2+/1.3 everywhere in transit; AES-256 at rest for PII and private messages</li>
      <li><strong>Secrets:</strong> centralized secrets manager for DB credentials, third-party API keys — never in code/config</li>
      <li><strong>OWASP:</strong> strict output encoding to prevent stored XSS in user-generated post/comment content; CSRF tokens on state-changing web requests; rate limiting mitigates credential stuffing</li>
      <li><strong>DDoS Protection:</strong> edge/WAF layer absorbs volumetric attacks before they reach the API Gateway; anomaly detection flags scraping-pattern traffic for throttling</li>
      <li><strong>Content Safety:</strong> automated + human-review pipeline for abuse/spam/policy-violating content, decoupled from the main post-publish path so moderation never blocks the write</li>
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
          <li>Feed load latency (P50/P95/P99) and feed staleness (age of newest item)</li>
          <li>Fan-out queue lag and Memcache hit ratio (target &gt;95%)</li>
          <li>TAO read/write latency and cache hit ratio</li>
          <li>Ranking-service inference latency and fallback-trigger rate</li>
          <li>Upload success/failure rate for photos/videos</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Stack</div>
        <ul>
          <li><strong>Metrics:</strong> Prometheus-equivalent + Grafana dashboards per service/region</li>
          <li><strong>Tracing:</strong> OpenTelemetry across Feed → Graph → Ranking → Cache call chain</li>
          <li><strong>Logging:</strong> centralized structured logs (ELK-equivalent) with sampling for high-volume paths</li>
          <li><strong>Alerts:</strong> paging on feed-latency P95 breach, DLQ depth, cache hit-ratio drop, replica lag</li>
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
      <div class="pt-row"><div class="pt-name">Application Servers</div><div>AKS (Kubernetes) for Feed/Graph/Post/Media services</div></div>
      <div class="pt-row"><div class="pt-name">Graph/Feed Cache</div><div>Azure Cache for Redis (as TAO/Memcache equivalent)</div></div>
      <div class="pt-row"><div class="pt-name">Event Streaming</div><div>Azure Event Hubs (Kafka-compatible endpoint)</div></div>
      <div class="pt-row"><div class="pt-name">Notification Queue</div><div>Azure Service Bus</div></div>
      <div class="pt-row"><div class="pt-name">Posts/Users DB</div><div>Azure SQL Database (sharded) or Cosmos DB for global distribution</div></div>
      <div class="pt-row"><div class="pt-name">Photo/Video Storage</div><div>Azure Blob Storage (Hot/Cool/Archive tiers)</div></div>
      <div class="pt-row"><div class="pt-name">Search</div><div>Azure AI Search</div></div>
      <div class="pt-row"><div class="pt-name">Analytics Pipeline</div><div>Azure Databricks / Synapse Analytics</div></div>
      <div class="pt-row"><div class="pt-name">Monitoring</div><div>Application Insights + Azure Monitor</div></div>
      <div class="pt-row"><div class="pt-name">Secrets</div><div>Azure Key Vault</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">18. Kubernetes Deployment</div>
  <div class="ref-body">
    <div class="code-box">Deployment: feed-service
  replicas: 500 (per region cluster)
  HPA: target CPU 55%, min 200 / max 2000 pods
  readinessProbe: /healthz (checks Memcache + TAO connectivity)

ConfigMap: feed-config
  - FEED_PAGE_SIZE=20
  - RANKING_TIMEOUT_MS=150
  - CELEBRITY_FANOUT_THRESHOLD=100000

Secret: feed-secrets
  - MEMCACHE_AUTH_TOKEN
  - KAFKA_SASL_CREDENTIALS

Ingress: api-gateway-ingress
  - routes /v1/feed/* -> feed-service
  - routes /v1/graph/* -> social-graph-service
  - TLS termination at ingress

Service: feed-service (ClusterIP) fronts the ReplicaSet
  managed via a Deployment object for rolling updates</div>
    <div class="tip-box" style="margin-top:10px;">✅ Feed Service gets the largest pod count and most aggressive HPA thresholds in the fleet since it's the highest-QPS, most latency-sensitive read path in the entire system.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">19. Failure Scenarios</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Failure</div><div>Impact</div><div>Recovery</div></div>
      <div class="pt-row"><div class="pt-name">MySQL shard down</div><div>Writes/cold reads for users on that shard fail</div><div>Automatic failover to standby replica (&lt;30s); Memcache/TAO continue serving reads from last-cached state</div></div>
      <div class="pt-row"><div class="pt-name">Memcache/TAO tier down</div><div>Read latency spikes as traffic falls through to MySQL, risking cascading overload</div><div>Consistent-hashing ring routes around dead nodes; circuit breaker sheds load and serves degraded (stale) feed rather than melting the DB tier</div></div>
      <div class="pt-row"><div class="pt-name">Kafka cluster down</div><div>Fan-out, notifications, and analytics stop flowing</div><div>Producers buffer locally with backpressure; multi-broker replication (RF=3) tolerates single-broker loss transparently</div></div>
      <div class="pt-row"><div class="pt-name">Ranking/ML service failure</div><div>Can't compute personalized feed scores</div><div>Circuit breaker opens; feed falls back to reverse-chronological or last-known-good ranking model</div></div>
      <div class="pt-row"><div class="pt-name">Region-wide outage</div><div>Entire region's users affected</div><div>GeoDNS fails over to nearest healthy region; cross-region async-replicated data serves reads with a brief staleness window</div></div>
      <div class="pt-row"><div class="pt-name">CDN failure</div><div>Photos/videos fail to load</div><div>Multi-CDN fallback (secondary provider) or direct-from-Haystack-origin fallback with automatic throttling</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">20. Cost Optimization</div>
  <div class="ref-body">
    <ul>
      <li><strong>Reserved Instances:</strong> baseline app-server and cache-tier capacity on long-term reservations; burst capacity on-demand</li>
      <li><strong>Auto-scaling:</strong> scale fan-out workers and ranking-inference pods down aggressively during regional off-peak windows</li>
      <li><strong>Spot/Low-priority nodes:</strong> offline ML training and analytics batch jobs (feed-ranking model retraining) run on spot/preemptible capacity</li>
      <li><strong>Caching:</strong> Memcache/TAO absorb the vast majority of read QPS, letting the MySQL tier stay dramatically smaller than raw read volume would otherwise require</li>
      <li><strong>Storage tiering:</strong> photos/videos move from hot (Haystack + CDN) to cold/archive storage once access frequency drops below a threshold — most content is viewed heavily only in its first days</li>
      <li><strong>Compression:</strong> aggressive image/video compression and adaptive-bitrate encoding cut both storage and CDN egress costs at petabyte scale</li>
    </ul>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">21. Trade-offs</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Decision</div><div>Chosen</div><div>Rejected Alternative &amp; Why</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Feed generation strategy</div><div>Hybrid: fan-out-on-write for normal users, fan-out-on-read for celebrities/pages</div><div>Pure fan-out-on-write — a 50M-follower post would trigger 50M cache writes, a massive write storm ("celebrity problem")</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Social graph store</div><div>TAO (in-memory graph cache over sharded MySQL)</div><div>Pure graph database (e.g. Neo4j) at global scale — harder to shard/replicate with Facebook's proven MySQL operational tooling</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Photo storage</div><div>Haystack (custom append-only blob format)</div><div>Generic POSIX filesystem/NFS — metadata lookup overhead per photo becomes the bottleneck at billions of files</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Like/comment counters</div><div>Approximate, eventually-consistent counters</div><div>Exact real-time counts via row-level locking — would serialize every like on a popular post through one hot row</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Cache invalidation</div><div>Explicit deletion-based invalidation (look-aside/cache-aside)</div><div>TTL-only expiry — would routinely serve stale data for popular keys between expiries</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Sharding key (posts/profile)</div><div>user_id</div><div>post_id — would scatter a single user's posts across shards, breaking "get my own timeline" locality</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">22. Interview Questions (30)</div>
  <div class="ref-body">
    <ol>
      <li>How would you design the News Feed generation pipeline end-to-end?</li>
      <li>Compare fan-out-on-write vs fan-out-on-read — when would you use each, and why hybrid?</li>
      <li>How does Facebook's celebrity/page problem break naive fan-out, and how do you solve it?</li>
      <li>Design the social graph storage layer — why is TAO better than raw SQL JOINs here?</li>
      <li>How would you rank feed candidates when you have thousands of eligible posts per user?</li>
      <li>Walk through what happens end-to-end when a user uploads a photo.</li>
      <li>Why did Facebook build Haystack instead of using a generic filesystem for photos?</li>
      <li>How do you keep a like/comment counter accurate without serializing every write?</li>
      <li>Design the notification system so a viral post doesn't spam a user with 10,000 notifications.</li>
      <li>How would you implement "mutual friends" or "people you may know" efficiently?</li>
      <li>What's your caching strategy for Memcache, and how do you prevent cache stampede on a hot key?</li>
      <li>How would you handle privacy checks (friends-only posts) without slowing down every feed read?</li>
      <li>Design the search feature for people, pages, and posts with different ranking needs.</li>
      <li>How do you shard the social graph, and what breaks with a naive user_id-only shard key?</li>
      <li>What happens if the ranking/ML service is completely down during a feed request?</li>
      <li>How would you support real-time features like typing indicators or live comment counts?</li>
      <li>Design the friend-request flow, including the bidirectional edge write.</li>
      <li>How do you handle a viral post that gets 10M likes in an hour?</li>
      <li>What's your approach to detecting and rate-limiting scraping/abuse on the Graph API?</li>
      <li>How would you replicate data across regions while keeping most reads low-latency?</li>
      <li>Design the video upload and adaptive-bitrate transcoding pipeline.</li>
      <li>How do you decide what data lives in MySQL vs TAO vs Memcache vs Elasticsearch?</li>
      <li>What monitoring signals would page you at 3 AM for a feed-latency regression?</li>
      <li>How would CQRS help separate the write-heavy post path from the read-heavy feed path?</li>
      <li>Design a content-moderation pipeline that doesn't block post publishing.</li>
      <li>How would you migrate a social graph shard to a new machine with zero downtime?</li>
      <li>Explain the trade-off between strong and eventual consistency for privacy settings vs like counts.</li>
      <li>How would this design change for a market with very low bandwidth/high latency connections?</li>
      <li>What would you change to support ephemeral content (stories that expire after 24 hours)?</li>
      <li>How do you test a new feed-ranking algorithm safely before rolling it out to all users?</li>
    </ol>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">23. Follow-up Questions</div>
  <div class="ref-body">
    <ul>
      <li>"You said TAO caches the graph — what happens on a cold cache after a full regional failover?"</li>
      <li>"How would your fan-out design change if users could have 10x more friends on average?"</li>
      <li>"What if two workers try to fan out the same post to the same follower's feed cache at once?"</li>
      <li>"How do you A/B test a new ranking model without it affecting the control group's cache entries?"</li>
      <li>"Your ranking service has a 150ms timeout — what if that's still too slow under load?"</li>
    </ul>
    <div class="tip-box" style="margin-top:10px;">✅ Interviewers push on your first answer's weak point — always state the failure mode of your own solution before they ask.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">24. Real World Technologies</div>
  <div class="ref-body">
    <p><strong>Facebook/Meta</strong> itself pioneered several of the systems referenced throughout this doc: <strong>TAO</strong> (the graph-aware caching layer over sharded MySQL), <strong>Haystack</strong> (the custom append-only photo store), and the "look-aside" <strong>Memcache</strong> pattern (thousands of Memcache servers caching MySQL query results, popularized in Facebook's own engineering papers). Comparable systems elsewhere: <strong>Twitter/X</strong> uses a similar fan-out-on-write timeline architecture with Redis-based timelines and its own graph service (FlockDB historically); <strong>LinkedIn</strong> built its own graph store and uses Kafka (which it originated) for its activity/event backbone; <strong>Instagram</strong> (Meta-owned) shares much of the same TAO/Memcache/Haystack-descendant infrastructure; <strong>Pinterest</strong> uses a similar fan-out feed model backed by HBase and Redis.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">25. Design Evolution by Scale</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Scale</div><div>Architecture</div></div>
      <div class="pt-row"><div class="pt-name">1K users</div><div>Single monolith, one MySQL instance, feed computed on-the-fly via a simple JOIN query at read time</div></div>
      <div class="pt-row"><div class="pt-name">100K users</div><div>Split into a few services; introduce Memcache for hot reads; single-region deployment; feed still computed at read time but cached briefly</div></div>
      <div class="pt-row"><div class="pt-name">1M users</div><div>Full service split (Feed/Graph/Post/Media); MySQL sharded by user_id; fan-out-on-write introduced for feed pre-computation</div></div>
      <div class="pt-row"><div class="pt-name">10M users</div><div>TAO-style graph cache introduced to replace direct MySQL graph JOINs; Haystack-style blob store replaces per-file photo storage; Kafka introduced for event backbone</div></div>
      <div class="pt-row"><div class="pt-name">100M users</div><div>Hybrid fan-out (celebrity problem solved); ML-based ranking replaces chronological feed; multi-region deployment with async cross-region replication</div></div>
      <div class="pt-row"><div class="pt-name">1B+ users</div><div>Multi-region active-active; dedicated infra tiers per data type (graph/feed/media/search); edge-side caching and regional isolation to contain blast radius of any single component failure</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">26. Final Architecture Diagram</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step blue">Web Client</div>
      <div class="flow-step blue">Mobile App</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">GeoDNS (routes to nearest healthy region) + CDN (photos, videos, static assets)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">WAF / DDoS Protection → API Gateway (authn, rate limit)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Load Balancer</div>
      <div class="flow-arrow">↓ fan-out to stateless services</div>
      <div class="flow-step green">Feed Svc</div>
      <div class="flow-step green">Social Graph Svc</div>
      <div class="flow-step green">Post Svc</div>
      <div class="flow-step green">Media Svc</div>
      <div class="flow-step green">Notification Svc</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">TAO (graph cache) · Memcache (feed/profile cache) · MySQL (sharded, source of truth) · Haystack (photo/video blobs)</div>
      <div class="flow-arrow">↓ async</div>
      <div class="flow-step">Kafka event backbone → Fan-out Workers · Notification Delivery · Analytics Pipeline · Elasticsearch (search index)</div>
      <div class="flow-arrow">↓ observability on every hop</div>
      <div class="flow-step red">Metrics/Grafana · OpenTelemetry Tracing · Centralized Logging · Key Vault (secrets)</div>
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
          <li>The read:write ratio (~40:1) drives nearly every architectural decision — cache-first design at every layer</li>
          <li>The social graph is fundamentally a caching/traversal problem, not a relational-JOIN problem — hence TAO</li>
          <li>Uniform strategies break at scale — the celebrity/page fan-out problem forces a hybrid write/read strategy rather than one-size-fits-all</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Pros of This Design</div>
        <ul><li>Scales read-heavy workloads via aggressive, purpose-built caching (TAO, Memcache, CDN)</li><li>Clear separation of concerns (graph vs feed vs media vs search) allows independent scaling</li><li>Hybrid fan-out avoids both write storms and slow celebrity-post reads</li></ul>
      </div>
      <div>
        <div class="ans-label">Cons / Open Risks</div>
        <ul><li>Enormous operational complexity of running MySQL + TAO + Memcache + Haystack + Kafka + Elasticsearch together at global scale</li><li>Eventually-consistent counters and caches mean the UI occasionally shows slightly stale like/comment counts</li></ul>
        <div class="ans-label" style="margin-top:12px;">Best Practices</div>
        <ul><li>Design the celebrity/hot-key case before the average case — the average case rarely breaks the system</li><li>Treat cache invalidation strategy as a first-class design decision, not an afterthought bolted onto a cache-aside pattern</li></ul>
      </div>
    </div>
  </div>
</div>
`;
