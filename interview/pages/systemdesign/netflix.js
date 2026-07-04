window.Pages['sd-netflix'] = `
<div class="page-header">
  <div class="breadcrumb">System Design › <span>Netflix (Video Streaming)</span></div>
  <h1>🎬 Netflix — Video Streaming System Design</h1>
  <p>Global adaptive-bitrate video delivery, personalized recommendations, and the Open Connect CDN at 260M+ subscriber scale</p>
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
      <text x="14" y="68" font-size="11" fill="#888" font-family="monospace">CLIENT</text>
      <text x="14" y="158" font-size="11" fill="#888" font-family="monospace">CDN</text>
      <text x="14" y="248" font-size="11" fill="#888" font-family="monospace">GATEWAY</text>
      <text x="14" y="310" font-size="11" fill="#888" font-family="monospace">SERVICES</text>
      <text x="14" y="388" font-size="11" fill="#888" font-family="monospace">DATA</text>

      <!-- Layer dividers -->
      <line x1="80" y1="82" x2="888" y2="82" stroke="#1e2937" stroke-width="1"/>
      <line x1="80" y1="172" x2="888" y2="172" stroke="#1e2937" stroke-width="1"/>
      <line x1="80" y1="262" x2="888" y2="262" stroke="#1e2937" stroke-width="1"/>
      <line x1="80" y1="334" x2="888" y2="334" stroke="#1e2937" stroke-width="1"/>

      <!-- CLIENT LAYER -->
      <!-- TV -->
      <rect x="90" y="22" width="90" height="48" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="135" y="42" font-size="14" text-anchor="middle" font-family="monospace">📺</text>
      <text x="135" y="56" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">Smart TV</text>
      <text x="135" y="66" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">HLS/DASH</text>

      <!-- Mobile -->
      <rect x="210" y="22" width="90" height="48" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="255" y="42" font-size="14" text-anchor="middle" font-family="monospace">📱</text>
      <text x="255" y="56" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">Mobile</text>
      <text x="255" y="66" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">iOS/Android</text>

      <!-- Web -->
      <rect x="330" y="22" width="90" height="48" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="375" y="42" font-size="14" text-anchor="middle" font-family="monospace">💻</text>
      <text x="375" y="56" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">Web</text>
      <text x="375" y="66" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">Browser</text>

      <!-- CDN LAYER -->
      <!-- Open Connect CDN -->
      <rect x="160" y="96" width="200" height="58" rx="8" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="260" y="116" font-size="14" text-anchor="middle" font-family="monospace">🌐</text>
      <text x="260" y="131" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">Open Connect CDN</text>
      <text x="260" y="144" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">ISP-embedded appliances</text>

      <!-- S3 Encoded Video -->
      <rect x="400" y="96" width="130" height="58" rx="8" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="465" y="116" font-size="14" text-anchor="middle" font-family="monospace">🗄️</text>
      <text x="465" y="131" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">S3 Video Store</text>
      <text x="465" y="144" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">Encoded renditions (PBs)</text>

      <!-- GATEWAY LAYER -->
      <rect x="310" y="186" width="160" height="52" rx="8" fill="#1a2d20" stroke="#4ade80" stroke-width="1.5"/>
      <text x="390" y="206" font-size="14" text-anchor="middle" font-family="monospace">🔀</text>
      <text x="390" y="221" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">API Gateway / Zuul</text>
      <text x="390" y="231" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">Auth, Rate Limit, Route</text>

      <!-- SERVICES LAYER -->
      <!-- Streaming Service -->
      <rect x="86" y="272" width="108" height="50" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="140" y="291" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">▶ Streaming</text>
      <text x="140" y="304" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">Manifest / Session</text>
      <text x="140" y="315" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">ABR Control</text>

      <!-- Content Catalog -->
      <rect x="208" y="272" width="108" height="50" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="262" y="291" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📋 Catalog</text>
      <text x="262" y="304" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">Metadata / Search</text>
      <text x="262" y="315" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">Elasticsearch</text>

      <!-- Recommendation Engine -->
      <rect x="330" y="272" width="108" height="50" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="384" y="291" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🤖 Reco ML</text>
      <text x="384" y="304" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">Personalization</text>
      <text x="384" y="315" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">Homepage Ranking</text>

      <!-- User Profile -->
      <rect x="452" y="272" width="108" height="50" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="506" y="291" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">👤 Profile</text>
      <text x="506" y="304" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">User / Auth</text>
      <text x="506" y="315" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">Multi-profile</text>

      <!-- Playback License -->
      <rect x="574" y="272" width="108" height="50" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="628" y="291" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🔐 DRM</text>
      <text x="628" y="304" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">Playback License</text>
      <text x="628" y="315" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">Widevine/FairPlay</text>

      <!-- A/B Testing -->
      <rect x="696" y="272" width="108" height="50" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="750" y="291" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🔬 A/B Test</text>
      <text x="750" y="304" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">Experimentation</text>
      <text x="750" y="315" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">Feature Flags</text>

      <!-- DATA LAYER -->
      <!-- Kafka -->
      <rect x="86" y="352" width="96" height="50" rx="8" fill="#2d2a1a" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="134" y="371" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">⚡ Kafka</text>
      <text x="134" y="384" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">Event Streaming</text>
      <text x="134" y="395" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">Trillions/day</text>

      <!-- Cassandra -->
      <rect x="198" y="352" width="96" height="50" rx="8" fill="#1a2040" stroke="#34d399" stroke-width="1.5"/>
      <text x="246" y="371" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🗃 Cassandra</text>
      <text x="246" y="384" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">User Activity</text>
      <text x="246" y="395" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">Watch History</text>

      <!-- EVCache (Redis) -->
      <rect x="310" y="352" width="96" height="50" rx="8" fill="#2d1a1a" stroke="#f87171" stroke-width="1.5"/>
      <text x="358" y="371" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">⚡ EVCache</text>
      <text x="358" y="384" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">Redis-based</text>
      <text x="358" y="395" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">Global Cache</text>

      <!-- MySQL Billing -->
      <rect x="422" y="352" width="96" height="50" rx="8" fill="#1a2040" stroke="#60a5fa" stroke-width="1.5"/>
      <text x="470" y="371" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🗄 MySQL</text>
      <text x="470" y="384" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">Billing / Subs</text>
      <text x="470" y="395" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">Accounts</text>

      <!-- Elasticsearch -->
      <rect x="534" y="352" width="96" height="50" rx="8" fill="#1a2040" stroke="#34d399" stroke-width="1.5"/>
      <text x="582" y="371" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🔍 Elastic</text>
      <text x="582" y="384" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">Search Index</text>
      <text x="582" y="395" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">Catalog Search</text>

      <!-- Monitoring -->
      <rect x="696" y="352" width="108" height="50" rx="8" fill="#2d1f1a" stroke="#fb923c" stroke-width="1.5"/>
      <text x="750" y="371" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📊 Atlas/Chaos</text>
      <text x="750" y="384" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">Metrics / Chaos</text>
      <text x="750" y="395" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">Engineering</text>

      <!-- ARROWS: Client → Open Connect CDN (video) -->
      <line x1="135" y1="70" x2="220" y2="96" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="255" y1="70" x2="260" y2="96" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="375" y1="70" x2="320" y2="96" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Client → API Gateway (control) -->
      <line x1="375" y1="70" x2="390" y2="186" stroke="#4a9eff" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr)"/>

      <!-- Open Connect CDN → S3 (origin pull) -->
      <line x1="360" y1="125" x2="400" y2="125" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- API Gateway → Services -->
      <line x1="370" y1="238" x2="180" y2="272" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="380" y1="238" x2="300" y2="272" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="390" y1="238" x2="390" y2="272" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="400" y1="238" x2="490" y2="272" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="410" y1="238" x2="610" y2="272" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="420" y1="238" x2="730" y2="272" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Services → Kafka -->
      <line x1="140" y1="322" x2="134" y2="352" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="262" y1="322" x2="200" y2="352" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="384" y1="322" x2="300" y2="352" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Services → Cassandra -->
      <line x1="262" y1="322" x2="246" y2="352" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Services → EVCache -->
      <line x1="384" y1="322" x2="358" y2="352" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Profile → MySQL -->
      <line x1="506" y1="322" x2="470" y2="352" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Catalog → Elasticsearch -->
      <line x1="262" y1="322" x2="540" y2="352" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
    </svg>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">1. Executive Summary</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Problem</div>
        <p>Deliver smooth, high-quality video playback to hundreds of millions of concurrent viewers worldwide, personalize what each user sees on the homepage, and do this over unpredictable last-mile networks — while keeping encoding/storage/bandwidth costs sustainable.</p>
        <div class="ans-label" style="margin-top:12px;">Scale</div>
        <ul>
          <li>260M+ paid subscribers across 190+ countries</li>
          <li>Historically ~10-15% of all North American downstream internet traffic at peak evening hours</li>
          <li>Tens of thousands of titles, each encoded into 100+ bitrate/codec/resolution variants</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Core Challenges</div>
        <ul>
          <li>Petabyte-scale video bandwidth delivered without buffering, globally, every evening peak</li>
          <li>Personalized ranking of a huge catalog per-user, computed near real-time</li>
          <li>Adaptive bitrate must react to fluctuating last-mile bandwidth in &lt;1s</li>
          <li>Encoding cost/storage explosion from many quality/codec variants per title</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Functional Requirements</div>
        <ul>
          <li>Browse/search a personalized, ranked catalog</li>
          <li>Press play → adaptive bitrate streaming session starts in &lt;2s</li>
          <li>Resume playback ("continue watching") across devices</li>
          <li>Record viewing history/progress for recommendations</li>
          <li>Download for offline viewing (mobile)</li>
          <li>Multi-profile per account, parental controls</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Non-Functional Requirements</div>
        <div class="pattern-table">
          <div class="pt-row pt-header"><div>NFR</div><div>Target</div><div>Why</div><div>Approach</div></div>
          <div class="pt-row"><div class="pt-name">Startup Latency</div><div>&lt; 2 sec time-to-first-frame</div><div>Users abandon on slow start</div><div>Pre-fetched manifest + nearest Open Connect appliance</div></div>
          <div class="pt-row"><div class="pt-name">Peak Bandwidth</div><div>Tens of Tbps globally at evening peak</div><div>Dominant NFR — this IS the system</div><div>Open Connect CDN embedded inside ISPs, near users</div></div>
          <div class="pt-row"><div class="pt-name">Availability (control plane)</div><div>99.99%</div><div>Revenue-critical, brand-critical</div><div>Multi-region AWS, chaos-tested regional failover</div></div>
          <div class="pt-row"><div class="pt-name">Availability (data plane / video)</div><div>Must survive control-plane outage</div><div>Video must keep playing even if backend is down</div><div>Client caches manifest &amp; can resume from local CDN cache</div></div>
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
      <div class="pt-row"><div class="pt-name">Subscribers (MAU)</div><div>260M paid subscriber accounts</div><div>given</div><div>260M accounts (~700M+ profiles)</div></div>
      <div class="pt-row"><div class="pt-name">DAU</div><div>~55% of accounts stream daily</div><div>260M × 0.55</div><div>~143M DAU</div></div>
      <div class="pt-row"><div class="pt-name">Concurrent streams at peak</div><div>~8% of DAU streaming simultaneously at evening peak</div><div>143M × 0.08</div><div>~11.4M concurrent streams</div></div>
      <div class="pt-row"><div class="pt-name">Peak bandwidth</div><div>avg 4 Mbps/stream (mixed SD/HD/4K)</div><div>11.4M × 4 Mbps</div><div>~45.6 Tbps at peak</div></div>
      <div class="pt-row"><div class="pt-name">Historical NA internet share</div><div>Netflix + peak evening hours</div><div>given (public reporting)</div><div>~10-15% of North American downstream traffic</div></div>
      <div class="pt-row"><div class="pt-name">API/control-plane requests/sec</div><div>each session issues ~10 metadata calls</div><div>11.4M × 10 / avg 2-hr session</div><div>~16K req/sec avg, ~80K req/sec peak (5x)</div></div>
      <div class="pt-row"><div class="pt-name">Read:Write ratio</div><div>Catalog browse/search is read-heavy; playback events write-heavy</div><div>—</div><div>Catalog ~1000:1 (R:W); Viewing-history ~1:5 (R:W)</div></div>
      <div class="pt-row"><div class="pt-name">Viewing-history writes/sec</div><div>progress checkpoint every ~30s per active stream</div><div>11.4M / 30</div><div>~380K writes/sec at peak</div></div>
      <div class="pt-row"><div class="pt-name">Catalog size / metadata storage</div><div>~15K titles × 50 KB metadata (cast, synopsis, tags)</div><div>15,000 × 50KB</div><div>~750 MB (trivially small — fits fully in cache)</div></div>
      <div class="pt-row"><div class="pt-name">Encoded video storage</div><div>15K titles × avg 2 hrs × 100+ renditions × ~50GB/title-master</div><div>15,000 × ~120 renditions × ~3GB avg/rendition</div><div>~5-8 PB total encoded library</div></div>
      <div class="pt-row"><div class="pt-name">Thumbnail/image storage</div><div>15K titles × 50 artwork variants (per-locale, per-device) × 200KB</div><div>15,000 × 50 × 200KB</div><div>~150 GB (negligible vs video)</div></div>
      <div class="pt-row"><div class="pt-name">Kafka event volume</div><div>playback events, UI impressions, A/B exposures</div><div>given (public figures)</div><div>trillions of events/day, PBs/day through the data pipeline</div></div>
      <div class="pt-row"><div class="pt-name">5-year growth</div><div>~8% YoY subscriber growth</div><div>260M × 1.08^5</div><div>~382M subscribers by year 5</div></div>
    </div>
    <div class="tip-box" style="margin-top:10px;">✅ Conclusion: unlike most consumer apps, the bottleneck is NOT the database or API tier — it's last-mile video bandwidth. ~46 Tbps at peak, historically 10-15% of North American internet traffic, is why Netflix built and deployed its own CDN (Open Connect) inside ISPs rather than relying purely on third-party CDNs.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">3. APIs</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Endpoint</div><div>Method</div><div>Purpose</div><div>Auth</div></div>
      <div class="pt-row"><div class="pt-name">/v1/browse/home</div><div>GET</div><div>Personalized homepage rows (recommendations)</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/titles/{id}</div><div>GET</div><div>Title detail metadata</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/playback/manifest</div><div>POST</div><div>Start playback session, get ABR manifest + CDN URLs</div><div>Bearer JWT + device cert</div></div>
      <div class="pt-row"><div class="pt-name">/v1/playback/heartbeat</div><div>POST</div><div>Progress checkpoint (resume position, bitrate telemetry)</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/search</div><div>GET</div><div>Catalog search with autocomplete</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/profiles/{id}/history</div><div>GET</div><div>Continue-watching / viewing history</div><div>Bearer JWT</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Start Playback — Request/Response</div>
        <div class="code-box">POST /v1/playback/manifest
Headers:
  Authorization: Bearer &lt;jwt&gt;
  X-Device-Type: smart-tv
  X-Request-Id: req-51290
  Accept-Encoding: br

Request:
{
  "titleId": "80192098",
  "profileId": "p-3341",
  "supportedCodecs": ["av1","h265","h264"],
  "maxResolution": "2160p"
}

Response 200:
{
  "sessionId": "pbs-99213",
  "manifestUrl": "https://oca-lax-04.nflxvideo.net/manifest/...",
  "cdnEndpoints": ["oca-lax-04...", "oca-lax-11..."],
  "startBitrateKbps": 5800,
  "resumePositionSec": 842,
  "drm": { "scheme": "widevine", "licenseUrl": "https://lic.netflix.com/..." }
}</div>
      </div>
      <div>
        <div class="ans-label">API Design Standards</div>
        <ul>
          <li><strong>Status codes:</strong> 200 ok, 206 partial content (byte-range video chunk), 400 bad request, 401 unauthorized, 403 DRM/geo-restricted, 429 rate limited, 503 encoding/CDN unavailable (fallback rendition)</li>
          <li><strong>Auth:</strong> OAuth2 + JWT (access + refresh) plus per-device certificate pinning for playback endpoints (anti-piracy)</li>
          <li><strong>Pagination:</strong> cursor-based for catalog rows and search results (<code>?cursor=abc&amp;limit=20</code>)</li>
          <li><strong>Rate limiting:</strong> token bucket per account on <code>/search</code> and <code>/playback/manifest</code> to blunt scraping/credential-stuffing</li>
          <li><strong>Versioning:</strong> URI versioning (<code>/v1/</code>, <code>/v2/</code>); device clients pin to a version for months at a time (TVs rarely update apps)</li>
          <li><strong>Byte-range requests:</strong> actual video chunks are fetched via HTTP range requests directly against Open Connect appliances, bypassing the API tier entirely</li>
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
      <div class="pt-row"><div class="pt-name">Cassandra (Viewing History / Playback State)</div><div>Resume position, per-device progress, play events</div><div>Write-heavy (~380K writes/sec), needs multi-region active-active</div><div>Partition key: profile_id; Clustering key: title_id, updated_at</div></div>
      <div class="pt-row"><div class="pt-name">MySQL (Billing &amp; Account)</div><div>Subscription plans, payment records, account status</div><div>ACID needed — money &amp; entitlement correctness</div><div>PK: account_id; Index: (account_id, plan_id)</div></div>
      <div class="pt-row"><div class="pt-name">Cassandra/EVCache (Catalog Metadata)</div><div>Title metadata, cast, synopsis, artwork refs</div><div>Small dataset, extreme read QPS, mostly-static</div><div>PK: title_id; heavily cached in-memory (EVCache/memcached)</div></div>
      <div class="pt-row"><div class="pt-name">S3 / Object Storage (Encoded Video + Assets)</div><div>All encoded renditions, artwork, subtitles</div><div>Petabyte-scale immutable blobs</div><div>Key: title_id/rendition_id/codec/bitrate.mp4</div></div>
      <div class="pt-row"><div class="pt-name">Elasticsearch</div><div>Catalog search index, autocomplete</div><div>Full-text + fuzzy + facet search over titles/cast/genre</div><div>Indexed on title, cast, genre, tags, locale</div></div>
      <div class="pt-row"><div class="pt-name">Data warehouse (Hive/Iceberg on S3, via Kafka)</div><div>All playback/impression/A-B events</div><div>Feeds recommendation model training at PB scale</div><div>Partitioned by event_date, event_type</div></div>
    </div>
    <div class="code-box" style="margin-top:12px;">-- Viewing history (Cassandra, CQL-style)
CREATE TABLE viewing_history (
  profile_id     UUID,
  title_id       BIGINT,
  device_id      UUID,
  position_sec   INT,
  duration_sec   INT,
  updated_at     TIMESTAMP,
  PRIMARY KEY ((profile_id), updated_at, title_id)
) WITH CLUSTERING ORDER BY (updated_at DESC);
-- Partition key: profile_id (all of a user's history co-located)
-- Clustering key: updated_at DESC -> "continue watching" is a single-partition range read

-- Title metadata (denormalized document, cached aggressively)
{
  "titleId": 80192098,
  "type": "series",
  "genres": ["drama","thriller"],
  "renditions": [
     {"codec":"av1","resolution":"2160p","bitrateKbps":16000},
     {"codec":"h265","resolution":"1080p","bitrateKbps":5800},
     {"codec":"h264","resolution":"480p","bitrateKbps":800}
  ]
}</div>
    <div class="warn-box" style="margin-top:10px;">⚠️ Never serve encoded video bytes out of a database. Video is immutable blob data — it belongs in object storage fronted by a CDN. The database layer only ever stores metadata, pointers, and small state (resume position), never the media itself.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">5. High-Level Architecture</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step blue">Users (TV / Mobile / Web / Console apps)</div>
      <div class="flow-arrow">↓ GeoDNS → nearest edge</div>
      <div class="flow-step green">Open Connect CDN (video bytes, embedded in ISPs)</div>
      <div class="flow-arrow">↓ control-plane calls go separately to</div>
      <div class="flow-step">Load Balancer (AWS ELB)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">API Gateway / Zuul (auth, routing, rate limit)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Application Servers (stateless microservices)</div>
      <div class="flow-arrow">↓ splits into concerns</div>
      <div class="flow-step">Catalog Svc</div>
      <div class="flow-step">Recommendation Svc</div>
      <div class="flow-step">Playback Svc</div>
      <div class="flow-step">Search Svc</div>
      <div class="flow-arrow">↓ reads/writes</div>
      <div class="flow-step">EVCache/Redis ⇄ Cassandra ⇄ MySQL ⇄ Elasticsearch ⇄ S3 (encoded video)</div>
      <div class="flow-arrow">↓ async events</div>
      <div class="flow-step">Kafka (playback events, impressions, encoding-complete)</div>
      <div class="flow-arrow">↓ consumed by</div>
      <div class="flow-step">Analytics/ML Pipeline · Notification Service · Monitoring</div>
    </div>
    <p style="margin-top:12px;">Cross-cutting: <strong>Encoding pipeline</strong> (per-title encode farm, off critical path), <strong>Monitoring</strong> (Atlas/Prometheus on every service), <strong>Chaos Engineering</strong> (continuous fault injection in production).</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">6. Detailed Component Design</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Responsibility</div><div>Key Design Point</div><div>Scaling Model</div></div>
      <div class="pt-row"><div class="pt-name">Catalog/Metadata Service</div><div>Serves title metadata, artwork refs, availability by region</div><div>Small hot dataset (~750MB) — fits almost entirely in EVCache; DB is fallback only</div><div>Stateless, scaled by read QPS, cache-first</div></div>
      <div class="pt-row"><div class="pt-name">Recommendation Service</div><div>Ranks catalog per-profile for homepage rows — Netflix's core differentiator</div><div>Pre-computed candidate rankings refreshed offline (batch ML), blended with real-time re-ranking signals (time of day, recent plays)</div><div>Offline batch (Spark/ML) + online low-latency serving layer, scaled independently</div></div>
      <div class="pt-row"><div class="pt-name">Playback/Streaming Service</div><div>Issues playback manifest, selects adaptive bitrate ladder, negotiates DRM license</div><div>Client-side ABR algorithm picks next chunk's bitrate based on measured throughput + buffer health; server supplies the rendition ladder</div><div>Stateless, globally distributed, geo-routed to nearest region</div></div>
      <div class="pt-row"><div class="pt-name">Encoding Service</div><div>Per-title encoding into 100+ resolution/bitrate/codec variants</div><div>Per-title encoding: analyzes each title's complexity (e.g. animation vs action) to pick optimal bitrate ladder instead of one-size-fits-all</div><div>Massive parallel batch compute (chunk-level parallel encode), off the request path entirely</div></div>
      <div class="pt-row"><div class="pt-name">Viewing-History Service</div><div>Tracks resume position and consumption events per profile/device</div><div>Write-heavy, eventually consistent across devices (last-write-wins with timestamp)</div><div>Cassandra-backed, partitioned by profile_id, multi-region active-active</div></div>
      <div class="pt-row"><div class="pt-name">Search Service</div><div>Full-text catalog search with autocomplete/typo-tolerance</div><div>Elasticsearch index rebuilt incrementally as catalog/metadata changes</div><div>Stateless query layer over sharded ES cluster</div></div>
      <div class="pt-row"><div class="pt-name">Notification Service</div><div>New-season alerts, "continue watching" nudges, download-ready pushes</div><div>Consumes Kafka catalog/viewing events; fans out to push/email</div><div>Stateless, horizontally scaled consumer group</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">7. Sequence Diagrams</div>
  <div class="ref-body">
    <div class="ans-label">Happy Path — Press Play, ABR Session Starts</div>
    <div class="code-box">Client   APIGateway   PlaybackSvc   DRM/License   OpenConnect(CDN)
  |--play(titleId)--->|              |              |               |
  |                    |--getManifest->|              |               |
  |                    |              |--pickRendition-ladder         |
  |                    |              |--getLicense->|               |
  |                    |              |<--license----|               |
  |                    |<--manifest+cdnUrls-----------|               |
  |<--manifest---------|              |              |               |
  |--GET chunk1 (range request, direct)---------------------------->|
  |<--chunk1 (video bytes)--------------------------------------------|
  |--ABR: measure throughput, pick bitrate for chunk2--|             |
  |--GET chunk2 (higher/lower bitrate)------------------------------->|</div>

    <div class="ans-label" style="margin-top:14px;">Failure Path — Nearest CDN Node Unreachable</div>
    <div class="code-box">Client   OpenConnect(nearest)   OpenConnect(regional)   3rd-party CDN(fallback)
  |--GET chunk--------->|                        |                    |
  |<--connection failed-|                        |                    |
  |--GET chunk (retry, next-best appliance)------>|                    |
  |<--chunk (slightly higher latency)-------------|                    |
  |   (if regional also down)
  |--GET chunk--------------------------------------------------------->|
  |<--chunk (last-resort fallback, higher cost)--------------------------|</div>

    <div class="ans-label" style="margin-top:14px;">Retry — Playback Heartbeat Write Failure</div>
    <div class="code-box">Client       PlaybackSvc      Kafka        Cassandra(ViewingHistory)
  |--heartbeat(pos)-->|                 |             |
  |                    |--publish------>|             |
  |                    |                |--consume--->|
  |                    |                |  [Cassandra write timeout]
  |                    |                |<--retry(1)--|  (backoff: 200ms -> 800ms)
  |                    |                |--consume--->|
  |                    |                |<--ack-------|
  |                    |  (if 3 retries fail -> DLQ; client buffers position locally, retries on next heartbeat)</div>

    <div class="ans-label" style="margin-top:14px;">Timeout — License Server Slow to Respond</div>
    <div class="code-box">PlaybackSvc        DRM/License Server
   |--getLicense(500ms budget)-->|
   |         (license server under load, no response)
   |<--timeout after 500ms-------|
   |--fallback: serve lower-security offline-cached license, OR
   |--retry once against secondary license server region
   |--if still failing: return 403, client shows "playback unavailable, retry"</div>
    <div class="tip-box" style="margin-top:10px;">✅ Notice the client is intentionally kept "smart" — it owns the ABR bitrate-selection loop itself once it has a manifest, so it can keep playing (switching to cached/lower bitrate) even if the control plane briefly hiccups.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">8. Database Scaling</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Sharding Strategy</div>
        <p><strong>Shard key: profile_id</strong> for viewing history (co-locates a user's history on one partition — continue-watching is always a single-partition read). Catalog metadata isn't sharded at all — it's small enough to replicate fully into every cache node.</p>
        <div class="ans-label" style="margin-top:12px;">Read Replicas</div>
        <p>MySQL (billing): 1 primary + multiple read replicas per region for entitlement checks, keeping the primary free for payment writes.</p>
      </div>
      <div>
        <div class="ans-label">Replication</div>
        <p>Cassandra: multi-region active-active replication for viewing history — a user can pause on a phone in one country and resume on a TV in another with only seconds of lag.</p>
        <div class="ans-label" style="margin-top:12px;">CQRS</div>
        <p>Recommendation write model (offline batch ML jobs computing candidate scores) is entirely separate from the read model (a low-latency serving cache the homepage queries) — training pipelines never touch the live-serving path.</p>
      </div>
    </div>
    <div class="warn-box" style="margin-top:12px;">⚠️ Event sourcing IS used for viewing/playback events (naturally an append-only stream feeding both resume-position state and the ML training pipeline) but NOT for billing state, which needs simple strongly-consistent ACID transactions instead.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">9. Cache Strategy</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Cache</div><div>Pattern</div><div>TTL</div><div>Why</div></div>
      <div class="pt-row"><div class="pt-name">Catalog/title metadata (EVCache)</div><div>Read-through</div><div>Hours (invalidated on catalog change)</div><div>Nearly-static, extreme read volume — cache hit rate &gt;99%</div></div>
      <div class="pt-row"><div class="pt-name">Personalized homepage rows</div><div>Cache-aside, pre-computed offline</div><div>Refreshed every few hours per profile</div><div>Recomputing full ranking per-request would be too expensive</div></div>
      <div class="pt-row"><div class="pt-name">Playback manifest / CDN routing</div><div>Cache-aside</div><div>Minutes</div><div>CDN health changes; short TTL avoids routing to a degraded appliance</div></div>
      <div class="pt-row"><div class="pt-name">Video chunks (edge)</div><div>Read-through at Open Connect appliance</div><div>Long-lived (popular titles pre-positioned nightly)</div><div>The entire CDN IS a caching layer — appliances pre-fill with predicted-popular content overnight</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Hot Key Problem</div>
        <p>A season premiere of a hit show is an extreme hot key — millions request the same title's manifest and first chunks within minutes. Mitigated by pre-positioning the new season's encoded renditions across every Open Connect appliance globally BEFORE release, so the "hot key" never has to be fetched from origin at all.</p>
      </div>
      <div>
        <div class="ans-label">Cache Stampede Prevention</div>
        <p>Homepage-row recompute uses a distributed lock so only one worker refreshes a given profile's recommendations per interval; others read the last-good cached ranking while waiting. For catalog metadata, request coalescing at the cache layer collapses duplicate concurrent misses into one origin fetch.</p>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">10. Messaging</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Broker</div><div>Used For</div><div>Why This One</div></div>
      <div class="pt-row"><div class="pt-name">Kafka</div><div>Playback events, UI impressions, A/B exposures, encoding-complete signals — Netflix's central data pipeline backbone</div><div>Massive throughput (trillions of events/day), replay for reprocessing/ML backfill, per-partition ordering</div></div>
      <div class="pt-row"><div class="pt-name">SQS/point-to-point queue equivalent</div><div>Notification dispatch (push/email jobs)</div><div>Simple fire-and-forget queue semantics fit notification jobs better than a log</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Delivery Guarantees</div>
        <ul>
          <li><strong>Playback heartbeats:</strong> at-least-once — a duplicate position update just overwrites the same key, harmless by nature</li>
          <li><strong>Billing events:</strong> exactly-once semantics via transactional producer + idempotent consumer (dedupe by event_id) — money can't double-charge</li>
          <li><strong>Ordering:</strong> partition key = profile_id or title_id depending on stream, guaranteeing per-entity event order (e.g. "play" must never process after "stop" for the same session)</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Retry / DLQ</div>
        <p>3 retries with exponential backoff (200ms → 800ms → 3.2s). After exhausting retries, message → Dead Letter Queue; on-call paged if DLQ depth exceeds threshold. Poison messages (malformed encoding-complete payloads) route straight to DLQ without retry so they don't block the partition behind them.</p>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">11. Storage</div>
  <div class="ref-body">
    <ul>
      <li><strong>Open Connect CDN (the defining case study):</strong> Netflix designed and manufactures its own CDN appliances ("Open Connect Appliances," OCAs) and donates/deploys them physically inside ISP networks and internet exchange points worldwide. This means video bytes travel the shortest possible last-mile path — often never leaving the ISP's own network — instead of crossing the public internet to a third-party CDN. Appliances are pre-filled overnight with predicted-popular content based on regional viewing forecasts, so peak-hour traffic is served almost entirely from local cache with near-zero origin fetches.</li>
      <li><strong>Origin storage (S3):</strong> the durable source of truth for every encoded rendition; Open Connect appliances pull from origin only on cache miss or for long-tail catalog titles.</li>
      <li><strong>Per-title video encoding:</strong> instead of one fixed bitrate ladder for all content, each title is analyzed for visual complexity (a cartoon compresses very differently than a fast-action film) and gets a custom-optimized ladder of resolution/bitrate pairs — same perceptual quality at meaningfully lower average bitrate/storage.</li>
      <li><strong>Media compression:</strong> modern codecs (AV1, HEVC/H.265) layered alongside legacy H.264 for device compatibility; AV1 alone can cut bitrate ~20-30% at equivalent quality versus H.264.</li>
      <li><strong>Thumbnail/artwork generation:</strong> per-title artwork is generated in dozens of variants (different focal images, locale-specific text) and even personalized per-profile based on viewing taste, stored as small objects served through a general-purpose CDN layer.</li>
    </ul>
    <div class="tip-box" style="margin-top:10px;">✅ Open Connect is the single most distinctive real-world design decision in this entire system — it's the direct answer to "how do you serve tens of Tbps without third-party CDN costs exploding and without every user's ISP peering link melting at 8pm."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">12. Search</div>
  <div class="ref-body">
    <p>Elasticsearch powers catalog search: full-text over titles, cast, directors, genres, and free-text tags, with typo-tolerant fuzzy matching and instant autocomplete as the user types.</p>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Feature</div><div>Approach</div></div>
      <div class="pt-row"><div class="pt-name">Filters</div><div>genre, release year, maturity rating, language/subtitle availability, "new releases"</div></div>
      <div class="pt-row"><div class="pt-name">Ranking</div><div>Blends text-match relevance with personalization signal (a search for "comedy" ranks titles the user is statistically likely to enjoy higher)</div></div>
      <div class="pt-row"><div class="pt-name">Autocomplete</div><div>Prefix/edge-ngram index for instant suggestions as characters are typed, backed by popularity-weighted query logs</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">13. Scalability</div>
  <div class="ref-body">
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">H</div><div class="principle-name">Horizontal Scaling</div><p>Every control-plane service (Catalog, Playback, Search, Recommendation) is stateless and scales out independently by regional load.</p></div>
      <div class="principle-card"><div class="principle-icon">C</div><div class="principle-name">CDN Offload</div><p>Open Connect removes &gt;90% of total bytes served from ever touching the app-tier — the CDN is the real scalability answer for this system, not the API servers.</p></div>
      <div class="principle-card"><div class="principle-icon">A</div><div class="principle-name">Auto-Scaling</div><p>App-tier services (AWS ASGs) auto-scale on request rate, tuned for a predictable daily evening-peak curve per region/timezone.</p></div>
      <div class="principle-card"><div class="principle-icon">B</div><div class="principle-name">Backpressure</div><p>Playback-heartbeat ingestion applies backpressure via Kafka consumer lag alerts — better to briefly delay viewing-history freshness than crash the write path.</p></div>
      <div class="principle-card"><div class="principle-icon">R</div><div class="principle-name">Rate Limiting</div><p>Per-account throttling on search/manifest endpoints blunts scraping and credential-stuffing without impacting normal viewing.</p></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">14. Reliability</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Pattern</div><div>Applied To</div><div>Behavior</div></div>
      <div class="pt-row"><div class="pt-name">Circuit Breaker</div><div>Playback Service → Recommendation Service calls</div><div>Opens after repeated failures; homepage falls back to a generic "Popular Now" row instead of failing the page</div></div>
      <div class="pt-row"><div class="pt-name">Retry</div><div>Heartbeat writes → Cassandra</div><div>3 retries, exponential backoff, then DLQ + local client buffering</div></div>
      <div class="pt-row"><div class="pt-name">Bulkhead</div><div>Per-service thread/connection pools</div><div>Isolated pool per downstream dependency — a slow Recommendation Service can't starve Playback Service threads</div></div>
      <div class="pt-row"><div class="pt-name">Timeout</div><div>DRM license fetch</div><div>500ms hard timeout, falls back to secondary license region or cached license</div></div>
      <div class="pt-row"><div class="pt-name">Idempotency</div><div>Billing/subscription state changes</div><div>Idempotency key prevents duplicate charge on client/network retry</div></div>
      <div class="pt-row"><div class="pt-name">Graceful Degradation</div><div>Recommendation engine down</div><div>Falls back to non-personalized "Trending" rows rather than blocking browse entirely</div></div>
      <div class="pt-row"><div class="pt-name">Chaos Engineering</div><div>Entire production architecture, continuously</div><div>Netflix pioneered Chaos Monkey (randomly terminates production instances) and the broader Simian Army — proactively proves the system tolerates real failure instead of hoping it does</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">15. Security</div>
  <div class="ref-body">
    <ul>
      <li><strong>AuthN:</strong> OAuth2 + JWT (short-lived access token + refresh token) for account/profile auth</li>
      <li><strong>AuthZ:</strong> RBAC for internal tooling (content ops, support, admin); ABAC for per-title geo-licensing rules (a title playable in one country may be blocked in another)</li>
      <li><strong>DRM/Content Protection:</strong> Widevine/PlayReady/FairPlay depending on device, license-bound decryption keys, encrypted video segments — core to the studio licensing agreements that let Netflix stream at all</li>
      <li><strong>Encryption:</strong> TLS 1.2+ everywhere in transit; AES-128/CENC encrypted video segments; AES-256 at rest for account/payment PII</li>
      <li><strong>Secrets:</strong> centralized secrets manager for DB credentials, payment gateway keys, DRM signing keys — never in code/config</li>
      <li><strong>OWASP:</strong> input validation on search/query params, rate limiting mitigates credential stuffing and content scraping</li>
      <li><strong>DDoS Protection:</strong> edge WAF/anti-DDoS layer absorbs volumetric attacks before reaching the API tier; Open Connect appliances themselves are hardened, limited-purpose devices</li>
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
          <li>Playback start latency &amp; rebuffer ratio (P50/P95/P99) — the top user-facing quality metric</li>
          <li>Per-region CDN cache-hit ratio (Open Connect vs origin fallback rate)</li>
          <li>Kafka consumer lag on playback-event topics</li>
          <li>Recommendation-serving latency and staleness</li>
          <li>Encoding pipeline throughput / queue depth</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Stack</div>
        <ul>
          <li><strong>Metrics:</strong> Atlas (Netflix's own time-series metrics platform) / Prometheus + Grafana dashboards per region</li>
          <li><strong>Tracing:</strong> OpenTelemetry-style distributed tracing across Catalog → Playback → DRM call chain</li>
          <li><strong>Logging:</strong> centralized structured logs, correlated by session_id</li>
          <li><strong>Alerts:</strong> paging on rebuffer-ratio P95 breach, DLQ depth, CDN cache-hit-ratio drop</li>
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
      <div class="pt-row"><div class="pt-name">Edge / DDoS</div><div>Azure Front Door + Azure DDoS Protection</div></div>
      <div class="pt-row"><div class="pt-name">API Gateway</div><div>Azure API Management</div></div>
      <div class="pt-row"><div class="pt-name">Application Servers</div><div>AKS (Kubernetes) for Catalog/Playback/Search/Recommendation services</div></div>
      <div class="pt-row"><div class="pt-name">Metadata/Session Cache</div><div>Azure Cache for Redis</div></div>
      <div class="pt-row"><div class="pt-name">Event Streaming</div><div>Azure Event Hubs (Kafka-compatible endpoint)</div></div>
      <div class="pt-row"><div class="pt-name">Notification Queue</div><div>Azure Service Bus</div></div>
      <div class="pt-row"><div class="pt-name">Billing DB</div><div>Azure SQL Database</div></div>
      <div class="pt-row"><div class="pt-name">Viewing History</div><div>Cosmos DB (Cassandra API)</div></div>
      <div class="pt-row"><div class="pt-name">Encoded Video / Assets</div><div>Azure Blob Storage (with lifecycle tiering)</div></div>
      <div class="pt-row"><div class="pt-name">CDN / Video Delivery</div><div>Azure CDN / Front Door (equivalent role to Open Connect, though Netflix's own appliances remain the real-world differentiator)</div></div>
      <div class="pt-row"><div class="pt-name">Encoding Pipeline</div><div>Azure Media Services (per-title encoding, packaging, DRM)</div></div>
      <div class="pt-row"><div class="pt-name">Search</div><div>Azure AI Search (Elasticsearch equivalent)</div></div>
      <div class="pt-row"><div class="pt-name">Monitoring</div><div>Application Insights + Azure Monitor</div></div>
      <div class="pt-row"><div class="pt-name">Secrets</div><div>Azure Key Vault</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">18. Kubernetes Deployment</div>
  <div class="ref-body">
    <div class="code-box">Deployment: recommendation-service
  replicas: 30 (per region cluster)
  HPA: target CPU 55%, min 15 / max 150 pods
  readinessProbe: /healthz (checks feature-store + cache connectivity)

ConfigMap: recommendation-config
  - CANDIDATE_REFRESH_INTERVAL_MIN=180
  - MAX_ROWS_PER_HOMEPAGE=40
  - FALLBACK_ROW=trending_now

Secret: recommendation-secrets
  - FEATURE_STORE_CONNECTION_STRING
  - KAFKA_SASL_CREDENTIALS

Ingress: api-gateway-ingress
  - routes /v1/browse/* -> recommendation-service
  - routes /v1/playback/* -> playback-service
  - TLS termination at ingress

Service: recommendation-service (ClusterIP) fronts the ReplicaSet
  managed via a Deployment object for rolling updates</div>
    <div class="tip-box" style="margin-top:10px;">✅ Recommendation Service gets generous max-pod headroom because homepage load spikes hard during the evening peak window, whereas Billing Service has flat, predictable demand and needs far less HPA range.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">19. Failure Scenarios</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Failure</div><div>Impact</div><div>Recovery</div></div>
      <div class="pt-row"><div class="pt-name">Billing DB (MySQL) down</div><div>Can't process new subscriptions/payments</div><div>Automatic failover to standby replica (&lt;30s); playback for existing subscribers is unaffected since entitlement is cached</div></div>
      <div class="pt-row"><div class="pt-name">EVCache/Redis down</div><div>Catalog reads fall through to Cassandra — much higher latency, possible overload</div><div>Failover to cache replica cluster; circuit breaker sheds load and serves degraded/stale catalog rather than crashing the DB tier</div></div>
      <div class="pt-row"><div class="pt-name">Kafka cluster down</div><div>Playback events/impressions stop flowing; recommendations go stale</div><div>Producers buffer locally with backpressure; multi-broker replication tolerates single-broker loss; playback itself is unaffected since video path doesn't depend on Kafka</div></div>
      <div class="pt-row"><div class="pt-name">Recommendation API failure</div><div>Personalized homepage can't be computed</div><div>Circuit breaker opens; homepage falls back to generic "Popular Now" / "Trending" rows</div></div>
      <div class="pt-row"><div class="pt-name">AWS region-wide outage</div><div>Entire region's control-plane traffic affected</div><div>Traffic rerouted to a healthy region via DNS/traffic-manager; this exact scenario is what motivated Netflix's original Chaos Kong region-failure drills</div></div>
      <div class="pt-row"><div class="pt-name">Open Connect appliance/CDN node failure</div><div>Local ISP's users lose their nearest video source</div><div>Client automatically retries against the next-nearest OCA or regional CDN tier, then a third-party CDN as last resort — video keeps playing, possibly at slightly higher latency</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">20. Cost Optimization</div>
  <div class="ref-body">
    <ul>
      <li><strong>Reserved Instances:</strong> baseline app-tier and encoding-farm capacity on 1-3yr reservations; burst capacity on-demand for launches/peak events</li>
      <li><strong>Per-title encoding:</strong> tailoring the bitrate ladder per title (instead of one fixed ladder for the whole catalog) meaningfully cuts average bitrate and therefore both storage and egress cost while preserving perceptual quality</li>
      <li><strong>Open Connect CDN:</strong> the single biggest cost lever — owning last-mile delivery avoids paying third-party CDN egress at the scale of tens of Tbps, and ISPs benefit too (less transit traffic), which is why they host the appliances for free</li>
      <li><strong>Auto-scaling:</strong> scale control-plane services down aggressively during regional overnight troughs</li>
      <li><strong>Spot/low-priority nodes:</strong> encoding-farm batch jobs and ML model training run on spot/preemptible capacity since they're restartable and not latency-sensitive</li>
      <li><strong>Storage tiering:</strong> long-tail catalog titles (rarely watched) keep fewer pre-positioned copies at edge, relying more on regional/origin fetch; popular titles get full edge replication</li>
      <li><strong>Compression:</strong> modern codecs (AV1/HEVC) reduce bitrate ~20-30% at equal quality vs legacy H.264, directly cutting both storage and bandwidth cost at petabyte/Tbps scale</li>
    </ul>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">21. Trade-offs</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Decision</div><div>Chosen</div><div>Rejected Alternative &amp; Why</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Video delivery</div><div>Own Open Connect CDN embedded in ISPs</div><div>Pure third-party CDN — cost-prohibitive and less control at tens-of-Tbps peak scale; still kept as last-resort fallback</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Bitrate ladder</div><div>Per-title custom encoding</div><div>One fixed ladder for all content — simpler but wastes bitrate/storage on visually simple titles</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Recommendation computation</div><div>Offline batch pre-computation + light online re-ranking</div><div>Fully real-time ranking per request — far too expensive at this catalog size and QPS</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Viewing-history consistency</div><div>Eventual (multi-region active-active Cassandra)</div><div>Strong/synchronous cross-region consistency — would add unacceptable write latency for a low-stakes data type (a few seconds of resume-position drift is fine)</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Billing consistency</div><div>Strong (ACID relational DB)</div><div>Eventual consistency — unacceptable for payment/subscription correctness</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Resilience validation</div><div>Continuous chaos engineering in production (Chaos Monkey)</div><div>Staging-only failure testing — doesn't catch the failure modes that only appear under real production load/traffic patterns</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">22. Interview Questions (30)</div>
  <div class="ref-body">
    <ol>
      <li>How would you design the system so video keeps playing even if the control plane (API tier) is temporarily down?</li>
      <li>Why did Netflix build its own CDN (Open Connect) instead of relying purely on third-party CDNs?</li>
      <li>Walk through what happens end-to-end from pressing play to the first video frame rendering.</li>
      <li>How does adaptive bitrate streaming decide which quality chunk to fetch next?</li>
      <li>Design the personalized homepage recommendation pipeline — batch vs real-time trade-offs?</li>
      <li>How would you pre-position content on CDN appliances ahead of a hit season premiere?</li>
      <li>Explain per-title encoding and why it saves cost versus a single fixed bitrate ladder.</li>
      <li>How do you keep "continue watching" position in sync across a phone, TV, and laptop?</li>
      <li>What's your strategy for handling a season-premiere hot key overwhelming a CDN region?</li>
      <li>How would you design DRM/license issuance to avoid becoming the playback-start bottleneck?</li>
      <li>Design the encoding pipeline for a newly uploaded 4K title into 100+ output variants.</li>
      <li>How do you choose a partition key for the viewing-history store, and why profile_id?</li>
      <li>What's the failure mode if the Recommendation Service is completely down, and how do you degrade gracefully?</li>
      <li>How would you detect and mitigate credential sharing/account abuse at scale?</li>
      <li>Explain Chaos Monkey — what problem does injecting production failures actually solve?</li>
      <li>How do you estimate peak bandwidth capacity needed for a global evening-peak event (e.g., a big premiere)?</li>
      <li>Design the search/autocomplete feature for a catalog of tens of thousands of titles.</li>
      <li>How would you A/B test a new recommendation algorithm safely in production?</li>
      <li>What monitoring signals would page you at 3 AM for this system?</li>
      <li>How do you handle geo-licensing restrictions (a title available in one country, not another)?</li>
      <li>Design the offline-download feature for mobile — how does it interact with DRM?</li>
      <li>How would CQRS help separate the recommendation training pipeline from the serving path?</li>
      <li>Compare Kafka vs a simple queue for the playback-event pipeline, and justify the choice.</li>
      <li>How would you migrate the viewing-history store to a new partitioning scheme with zero downtime?</li>
      <li>Design a circuit breaker policy for calls from Playback Service to Recommendation Service.</li>
      <li>How would this design change for a market with very low average mobile bandwidth?</li>
      <li>What would you change to support live sports/events streaming (vs on-demand VOD)?</li>
      <li>How do you decide which codecs (AV1/HEVC/H.264) to support on a given device?</li>
      <li>Design the thumbnail/artwork personalization system — why show different artwork per user?</li>
      <li>How would you handle a full AWS region outage affecting the control plane mid-peak-hour?</li>
    </ol>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">23. Follow-up Questions</div>
  <div class="ref-body">
    <ul>
      <li>"You said Open Connect pre-positions content overnight — what happens on a true cache miss for a long-tail title?"</li>
      <li>"How would your design change if recommendations needed to react within seconds to a just-watched episode, not hours?"</li>
      <li>"What if two devices on the same profile both try to update resume position at the same time?"</li>
      <li>"How do you test that per-title encoding actually preserves perceptual quality, not just bitrate savings?"</li>
      <li>"Your ABR client picks bitrate locally — how do you get visibility into playback quality server-side for monitoring?"</li>
    </ul>
    <div class="tip-box" style="margin-top:10px;">✅ Interviewers push on your first answer's weak point — always state the failure mode of your own solution before they ask.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">24. Real World Technologies</div>
  <div class="ref-body">
    <p><strong>Netflix</strong> famously open-sourced much of its early cloud-native tooling: <strong>Hystrix</strong> (circuit breaker/latency-tolerance library), <strong>Zuul</strong> (edge/API gateway routing), <strong>Eureka</strong> (service discovery), and <strong>Chaos Monkey</strong> (and the broader "Simian Army") for proactive production failure injection. Its most distinctive real-world infrastructure is <strong>Open Connect</strong> — purpose-built CDN appliances physically deployed inside ISP networks worldwide. Netflix also runs one of the industry's largest Kafka deployments for its real-time data pipeline feeding recommendations and analytics.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">25. Design Evolution by Scale</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Scale</div><div>Architecture</div></div>
      <div class="pt-row"><div class="pt-name">1K users</div><div>Single monolith, one relational DB, videos served directly from a single origin/object store, no personalization</div></div>
      <div class="pt-row"><div class="pt-name">100K users</div><div>Split into a few services; introduce a third-party CDN; basic "most popular" style recommendations; single-region deployment</div></div>
      <div class="pt-row"><div class="pt-name">1M users</div><div>Full microservices split (Catalog/Playback/Recommendation); Kafka introduced for event pipeline; multi-bitrate encoding begins</div></div>
      <div class="pt-row"><div class="pt-name">10M users</div><div>Multi-region deployment; per-title encoding introduced; early collaborative-filtering ML recommendations; CDN cost becomes a top-line concern</div></div>
      <div class="pt-row"><div class="pt-name">100M users</div><div>Open Connect CDN built and deployed inside ISPs; offline batch ML recommendation pipeline at scale; chaos engineering formalized</div></div>
      <div class="pt-row"><div class="pt-name">1B users (hypothetical)</div><div>Edge-computed personalization near CDN nodes; predictive pre-positioning driven by regional ML demand forecasting; fully regionally isolated control planes to contain blast radius</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">26. Final Architecture Diagram</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step blue">TV / Mobile / Web / Console Apps</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">GeoDNS (routes video requests to nearest Open Connect appliance)</div>
      <div class="flow-arrow">↓ video bytes (majority of all traffic)</div>
      <div class="flow-step green">Open Connect CDN Appliances (embedded inside ISPs)</div>
      <div class="flow-arrow">↓ control-plane calls (separate path)</div>
      <div class="flow-step">WAF / DDoS Protection → API Gateway (Zuul-style: authn, rate limit)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Load Balancer</div>
      <div class="flow-arrow">↓ fan-out to stateless services</div>
      <div class="flow-step green">Catalog Svc</div>
      <div class="flow-step green">Playback Svc</div>
      <div class="flow-step green">Recommendation Svc</div>
      <div class="flow-step green">Search Svc</div>
      <div class="flow-step green">Billing Svc</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">EVCache/Redis · Cassandra (viewing history) · MySQL (billing) · Elasticsearch · S3 (encoded video origin)</div>
      <div class="flow-arrow">↓ async</div>
      <div class="flow-step">Kafka event backbone → Analytics/ML Pipeline · Notification Svc · Encoding Pipeline</div>
      <div class="flow-arrow">↓ observability on every hop</div>
      <div class="flow-step red">Atlas/Prometheus/Grafana · Distributed Tracing · Centralized Logging · Key Vault (secrets) · Chaos Monkey (continuous fault injection)</div>
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
          <li>The dominant constraint is last-mile video bandwidth, not API throughput — this reframes the whole architecture around CDN placement, not just service scaling</li>
          <li>Personalization/recommendation is a first-class core service, not a bolt-on feature — it's Netflix's primary differentiator over a plain catalog browser</li>
          <li>Strong consistency is required only for money (billing) — almost everything else (viewing history, recommendations, CDN cache state) is fine, and cheaper, as eventually consistent</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Pros of This Design</div>
        <ul><li>Video playback keeps working even during control-plane incidents (client-side ABR + CDN caching)</li><li>Open Connect drastically reduces bandwidth cost and last-mile latency simultaneously</li><li>Clear separation between offline ML training and low-latency online serving</li></ul>
      </div>
      <div>
        <div class="ans-label">Cons / Open Risks</div>
        <ul><li>Operating physical CDN hardware inside thousands of ISP networks is an enormous operational undertaking most companies can't replicate</li><li>Per-title encoding multiplies the number of stored renditions, raising storage complexity even as it saves bitrate</li></ul>
        <div class="ans-label" style="margin-top:12px;">Best Practices</div>
        <ul><li>Always design the video-still-plays-during-outage path before optimizing the happy path</li><li>Treat chaos engineering as a continuous practice, not a one-time resilience test</li></ul>
      </div>
    </div>
  </div>
</div>
`;
