window.Pages['sd-spotify'] = `
<div class="page-header">
  <div class="breadcrumb">System Design › <span>Spotify (Music Streaming)</span></div>
  <h1>🎵 Spotify — Music Streaming System Design</h1>
  <p>Audio delivery at scale, personalised recommendations, offline sync, and social listening for 600M+ users worldwide</p>
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
      <text x="14" y="260" font-size="11" fill="#888" font-family="monospace" transform="rotate(-90,14,260)">SERVICES</text>
      <text x="14" y="370" font-size="11" fill="#888" font-family="monospace" transform="rotate(-90,14,370)">DATA</text>

      <!-- Layer bands -->
      <rect x="30" y="20" width="860" height="70" rx="6" fill="#ffffff08"/>
      <rect x="30" y="100" width="860" height="60" rx="6" fill="#ffffff06"/>
      <rect x="30" y="170" width="860" height="130" rx="6" fill="#ffffff05"/>
      <rect x="30" y="310" width="860" height="98" rx="6" fill="#ffffff06"/>

      <!-- CLIENT LAYER -->
      <rect x="50" y="32" width="100" height="46" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="100" y="52" font-size="12" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📱 Mobile</text>
      <text x="100" y="68" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">iOS / Android</text>

      <rect x="180" y="32" width="100" height="46" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="230" y="52" font-size="12" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🖥 Desktop</text>
      <text x="230" y="68" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Electron App</text>

      <rect x="310" y="32" width="100" height="46" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="360" y="52" font-size="12" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🌐 Web</text>
      <text x="360" y="68" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Browser SPA</text>

      <rect x="650" y="32" width="120" height="46" rx="8" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="710" y="52" font-size="12" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">☁ CDN</text>
      <text x="710" y="68" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Audio Chunks (GCS)</text>

      <!-- GATEWAY LAYER -->
      <rect x="320" y="112" width="260" height="36" rx="8" fill="#1a2d20" stroke="#4ade80" stroke-width="1.5"/>
      <text x="450" y="127" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🌐 API Gateway</text>
      <text x="450" y="141" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Auth · Rate Limit · Route · Load Balance</text>

      <!-- SERVICES LAYER -->
      <rect x="38" y="182" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="93" y="200" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🎧 Stream</text>
      <text x="93" y="216" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Audio Streaming</text>

      <rect x="162" y="182" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="217" y="200" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🗂 Catalog</text>
      <text x="217" y="216" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Metadata Svc</text>

      <rect x="286" y="182" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="341" y="200" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🔍 Search</text>
      <text x="341" y="216" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Elasticsearch</text>

      <rect x="410" y="182" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="465" y="200" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🤖 Recommend</text>
      <text x="465" y="216" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">ML Engine</text>

      <rect x="534" y="182" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="589" y="200" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📋 Playlist</text>
      <text x="589" y="216" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Playlist Svc</text>

      <rect x="658" y="182" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="713" y="200" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📶 Offline</text>
      <text x="713" y="216" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Sync Svc</text>

      <rect x="782" y="182" width="100" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="832" y="200" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📢 Ads</text>
      <text x="832" y="216" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Ad Service</text>

      <!-- Kafka -->
      <rect x="330" y="248" width="240" height="36" rx="8" fill="#2d2a1a" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="450" y="263" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">⚡ Kafka Event Bus</text>
      <text x="450" y="277" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">play-events · skips · likes · offline-sync</text>

      <!-- DATA LAYER -->
      <rect x="38" y="320" width="115" height="46" rx="8" fill="#2d1a1a" stroke="#f87171" stroke-width="1.5"/>
      <text x="95" y="338" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">⚡ Redis</text>
      <text x="95" y="354" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Session / Cache</text>

      <rect x="168" y="320" width="120" height="46" rx="8" fill="#1a2040" stroke="#34d399" stroke-width="1.5"/>
      <text x="228" y="338" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🗄 Cassandra</text>
      <text x="228" y="354" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">User / Playlists</text>

      <rect x="303" y="320" width="120" height="46" rx="8" fill="#1a2040" stroke="#60a5fa" stroke-width="1.5"/>
      <text x="363" y="338" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🐘 PostgreSQL</text>
      <text x="363" y="354" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Catalog / Billing</text>

      <rect x="438" y="320" width="120" height="46" rx="8" fill="#1a2040" stroke="#34d399" stroke-width="1.5"/>
      <text x="498" y="338" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🔎 ES Index</text>
      <text x="498" y="354" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Tracks / Artists</text>

      <rect x="573" y="320" width="120" height="46" rx="8" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="633" y="338" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">☁ GCS / S3</text>
      <text x="633" y="354" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Audio Files (Ogg)</text>

      <rect x="708" y="320" width="120" height="46" rx="8" fill="#2d1f1a" stroke="#fb923c" stroke-width="1.5"/>
      <text x="768" y="338" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📊 BigQuery</text>
      <text x="768" y="354" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Analytics / ML</text>

      <!-- Arrows: Clients → Gateway -->
      <line x1="100" y1="78" x2="380" y2="112" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="230" y1="78" x2="420" y2="112" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="360" y1="78" x2="440" y2="112" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- CDN arrow to Mobile/Web (audio) -->
      <line x1="650" y1="55" x2="412" y2="55" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Gateway → Services -->
      <line x1="390" y1="148" x2="180" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="420" y1="148" x2="341" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="450" y1="148" x2="450" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="480" y1="148" x2="560" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="510" y1="148" x2="700" y2="182" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Services → Kafka -->
      <line x1="93" y1="228" x2="350" y2="248" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="341" y1="228" x2="390" y2="248" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="465" y1="228" x2="450" y2="248" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="589" y1="228" x2="510" y2="248" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Kafka → Data -->
      <line x1="400" y1="284" x2="228" y2="320" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="450" y1="284" x2="363" y2="320" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="480" y1="284" x2="498" y2="320" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="530" y1="284" x2="700" y2="320" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Stream Svc → Redis -->
      <line x1="93" y1="228" x2="93" y2="320" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Stream Svc → GCS -->
      <line x1="148" y1="205" x2="573" y2="340" stroke="#4b5563" stroke-width="1.2" stroke-dasharray="4,3" marker-end="url(#arr)"/>
    </svg>
  </div>
</div>

<!-- 1. Executive Summary -->
<div class="ref-section">
  <div class="ref-title">1. Executive Summary</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>Problem Statement</b>
        <p>Design a global music streaming platform that delivers high-quality audio to hundreds of millions of users simultaneously, provides sub-second personalised recommendations, supports offline playback, and handles a catalogue of 100M+ tracks while monetising through subscriptions and ads.</p>
        <br/>
        <b>Scale Numbers (2024)</b>
        <ul>
          <li>600M+ Monthly Active Users (MAU)</li>
          <li>240M+ Premium subscribers</li>
          <li>100M+ tracks in catalogue</li>
          <li>5B+ playlist creates per month</li>
          <li>~600K songs uploaded per day (artists)</li>
          <li>31M podcast episodes</li>
          <li>Peak: ~10M concurrent streams</li>
          <li>Operates in 180+ countries</li>
        </ul>
      </div>
      <div>
        <b>Core Challenges</b>
        <ul>
          <li>Low-latency audio start (&lt;250ms on WiFi)</li>
          <li>Adaptive bitrate streaming across variable networks</li>
          <li>Personalisation at scale (Discover Weekly, Daily Mix)</li>
          <li>Offline mode with encrypted DRM tracks</li>
          <li>Global CDN delivery for audio blobs</li>
          <li>Rights management &amp; royalty accounting</li>
          <li>Real-time social (Listening Together, Friend Activity)</li>
          <li>Cold-start recommendation for new users</li>
        </ul>
        <br/>
        <table class="pattern-table">
          <tr class="pt-header"><td>Type</td><td>Requirement</td></tr>
          <tr class="pt-row"><td class="pt-name">FR</td><td>Play/pause/skip tracks, search, create playlists, offline download, social follow, podcast streaming</td></tr>
          <tr class="pt-row"><td class="pt-name">FR</td><td>Personalised recommendations (Discover Weekly, Daily Mix, Blend)</td></tr>
          <tr class="pt-row"><td class="pt-name">NFR</td><td>Availability 99.99% (44 min/year downtime), P99 stream start &lt;500ms</td></tr>
          <tr class="pt-row"><td class="pt-name">NFR</td><td>Horizontal scalability, eventual consistency for social graph, strong consistency for billing</td></tr>
        </table>
      </div>
    </div>
  </div>
</div>

<!-- 2. Capacity Estimation -->
<div class="ref-section">
  <div class="ref-title">2. Capacity Estimation</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><td>Metric</td><td>Assumption</td><td>Calculation</td><td>Result</td></tr>
      <tr class="pt-row"><td class="pt-name">DAU</td><td>~50% of 600M MAU are daily</td><td>600M × 0.5</td><td>300M DAU</td></tr>
      <tr class="pt-row"><td class="pt-name">Streams/day</td><td>Each DAU streams ~30 min = ~7 tracks</td><td>300M × 7</td><td>2.1B streams/day</td></tr>
      <tr class="pt-row"><td class="pt-name">Peak RPS (streams)</td><td>Streams concentrated in 6h peak window</td><td>2.1B / 21600</td><td>~97,000 RPS</td></tr>
      <tr class="pt-row"><td class="pt-name">Audio bandwidth (avg)</td><td>Ogg Vorbis 160kbps premium, 96kbps free; avg 128kbps</td><td>10M concurrent × 128kbps</td><td>~1.28 Tbps egress</td></tr>
      <tr class="pt-row"><td class="pt-name">Storage per track</td><td>Avg 3.5 min song × 160kbps = ~4.2MB; multiple quality tiers (96/160/320kbps)</td><td>4.2MB × 3 tiers × 100M tracks</td><td>~1.26 PB</td></tr>
      <tr class="pt-row"><td class="pt-name">New uploads/day</td><td>600K songs × 3 quality tiers × 4.2MB avg</td><td>600K × 3 × 4.2MB</td><td>~7.6 TB/day ingestion</td></tr>
      <tr class="pt-row"><td class="pt-name">Search QPS</td><td>~5% of DAU search per minute during peak</td><td>300M × 0.05 / 3600</td><td>~4,200 search QPS</td></tr>
      <tr class="pt-row"><td class="pt-name">Recommendation batch</td><td>Weekly Discover Weekly for 240M users, generated Sunday night</td><td>240M playlists × 30 tracks</td><td>7.2B track lookups/week</td></tr>
      <tr class="pt-row"><td class="pt-name">Metadata DB size</td><td>100M tracks × 2KB metadata + artist/album/genre</td><td>100M × 2KB</td><td>~200 GB (PostgreSQL)</td></tr>
      <tr class="pt-row"><td class="pt-name">Play event log</td><td>2.1B events/day × 200 bytes</td><td>2.1B × 200B</td><td>~420 GB/day Kafka</td></tr>
    </table>
  </div>
</div>

<!-- 3. APIs -->
<div class="ref-section">
  <div class="ref-title">3. API Design</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><td>Endpoint</td><td>Method</td><td>Description</td></tr>
      <tr class="pt-row"><td class="pt-name">POST /v1/auth/token</td><td>Public</td><td>OAuth 2.0 PKCE — exchange code for access_token + refresh_token</td></tr>
      <tr class="pt-row"><td class="pt-name">GET /v1/tracks/{id}/stream</td><td>Authenticated</td><td>Returns pre-signed CDN URL + DRM licence URL for audio chunk playlist</td></tr>
      <tr class="pt-row"><td class="pt-name">GET /v1/search?q=&amp;type=track,artist,album&amp;limit=20</td><td>Authenticated</td><td>Full-text search via Elasticsearch — returns ranked results with audio preview URLs</td></tr>
      <tr class="pt-row"><td class="pt-name">GET /v1/recommendations/me</td><td>Authenticated</td><td>Returns personalised track list from ML engine; backed by cached daily recs</td></tr>
      <tr class="pt-row"><td class="pt-name">GET /v1/browse/featured-playlists</td><td>Authenticated</td><td>Editorially curated playlists, cached at CDN edge for 1h</td></tr>
      <tr class="pt-row"><td class="pt-name">POST /v1/me/playlists</td><td>Authenticated</td><td>Create playlist; body: {name, public, description}</td></tr>
      <tr class="pt-row"><td class="pt-name">PUT /v1/me/playlists/{id}/tracks</td><td>Authenticated</td><td>Add/reorder tracks; uses optimistic locking via ETag to prevent conflicts</td></tr>
      <tr class="pt-row"><td class="pt-name">PUT /v1/me/player/play</td><td>Authenticated</td><td>Start/resume playback — sends context_uri + offset; emits play event to Kafka</td></tr>
      <tr class="pt-row"><td class="pt-name">POST /v1/me/player/next</td><td>Authenticated</td><td>Skip to next track; emits skip event (used for recommendation feedback loop)</td></tr>
      <tr class="pt-row"><td class="pt-name">GET /v1/me/offline/tracks</td><td>Authenticated</td><td>List of tracks marked for offline; returns encrypted download URLs (DRM key per device)</td></tr>
      <tr class="pt-row"><td class="pt-name">POST /v1/me/following</td><td>Authenticated</td><td>Follow artist/user; updates social graph in Cassandra, fans-out via Kafka</td></tr>
    </table>
    <br/>
    <b>Stream Initiation Response Example</b>
    <div class="code-box">GET /v1/tracks/4uLU6hMCjMI75M1A2tKUQC/stream
Authorization: Bearer eyJhbGc...

HTTP/1.1 200 OK
{
  "track_id": "4uLU6hMCjMI75M1A2tKUQC",
  "stream_url": "https://audio-cdn.spotify.com/audio/4uLU6h...?token=SIGNED&exp=1720000300",
  "drm_licence_url": "https://drm.spotify.com/licence/widevine",
  "manifest": "https://audio-cdn.spotify.com/audio/4uLU6h.mpd",
  "quality": "VERY_HIGH",
  "format": "OGG_VORBIS_320",
  "duration_ms": 214000,
  "cdn_region": "eu-west-1"
}</div>
    <br/>
    <div class="tip-box">Design Standards: REST over HTTPS/2 · OAuth 2.0 + PKCE for mobile · Pre-signed CDN URLs (15 min TTL) for audio to avoid hotlinking · Idempotency keys on write endpoints · ETag-based conditional GETs for playlists · Cursor-based pagination (?after=cursor) · Rate limit: 100 req/30s per user</div>
  </div>
</div>

<!-- 4. High-Level Architecture -->
<div class="ref-section">
  <div class="ref-title">4. High-Level Architecture</div>
  <div class="ref-body">
    <div class="code-box">
┌────────────────────── CLIENT LAYER ──────────────────────────┐
│  Mobile (iOS/Android)    Desktop (Electron)    Web (React)   │
│         ↕ HTTPS/2               ↕                  ↕        │
│              CDN ←─ audio chunks (Ogg, MPEG-DASH) ─────→    │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌────────────── API GATEWAY (Kong / custom) ───────────────────┐
│   OAuth 2.0 · JWT validate · Rate limit · gRPC fan-out       │
└──────────────────────────────────────────────────────────────┘
         ↓         ↓        ↓        ↓        ↓       ↓
   [Stream]  [Catalog] [Search] [Reco] [Playlist] [Ads]
   [Offline] [Social]  [Auth]   [Ingestion]
                              ↓
            ┌─── Kafka Event Bus (play/skip/like/follow) ───┐
            ↓              ↓                ↓               ↓
       [Cassandra]    [PostgreSQL]    [Elasticsearch]  [BigQuery]
      user/playlist    catalog/billing   search index   ML/Analytics
              ↓
           [Redis]  session · reco cache · top charts
              ↓
        [GCS / S3]  audio files (Ogg Vorbis, AAC, HLS segments)
    </div>
    <br/>
    <div class="two-col">
      <div>
        <b>Audio Streaming Service</b><br/>
        Resolves track → GCS object path → generates time-limited pre-signed URL → returns MPEG-DASH manifest. Client streams chunks (typically 15s) directly from CDN. Adaptive bitrate switches quality mid-stream based on bandwidth probe.
        <br/><br/>
        <b>Catalog / Metadata Service</b><br/>
        Read-heavy service backed by PostgreSQL (canonical) + Redis cache. Stores track, album, artist, genre, label, ISRC, language, BPM, key, loudness. Write path: artist ingestion pipeline triggers async elasticsearch index update.
        <br/><br/>
        <b>Recommendation Engine</b><br/>
        Batch jobs (Apache Spark on Dataproc) run nightly — Collaborative Filtering + NLP on audio features (Echo Nest DNA). Results written to Cassandra recommendation table; served via low-latency API with Redis L1 cache.
      </div>
      <div>
        <b>Search Service</b><br/>
        Elasticsearch cluster with inverted index on track name, artist, album, lyrics snippet. Autocomplete via edge n-gram tokeniser. Query results boosted by popularity score + personalisation re-rank model.
        <br/><br/>
        <b>Offline Sync Service</b><br/>
        Computes delta between user's pinned tracks and device's local manifest. Issues DRM-encrypted download tokens. Download via CDN. Periodic heartbeat to validate Premium status; licence expires after 30 days offline.
        <br/><br/>
        <b>Ad Service</b><br/>
        Free-tier users receive audio ads every ~15 min. Ad decision service queries DSP in real-time (&lt;100ms). Tracks impressions/completions via Kafka for billing reconciliation. Podcast dynamic ad insertion (DAI) stitched server-side.
      </div>
    </div>
  </div>
</div>

<!-- 5. Core Service: Audio Streaming -->
<div class="ref-section">
  <div class="ref-title">5. Core Service — Audio Streaming &amp; Delivery</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>Encoding Pipeline</b>
        <p>When an artist uploads a track via the Creator Portal, an ingestion microservice kicks off a Pub/Sub-triggered encoding job on Google Cloud Transcoder API (or custom FFmpeg fleet). Output formats:</p>
        <ul>
          <li>OGG Vorbis: 24kbps (very low), 96kbps (low), 160kbps (normal), 320kbps (very high)</li>
          <li>AAC-LC: 128kbps / 256kbps (Apple/Web fallback)</li>
          <li>FLAC: lossless (Spotify HiFi / future)</li>
        </ul>
        <p>Encoded files stored in GCS with path: <code>gs://audio-prod/{track_id}/{quality}.ogg</code>. Metadata written to PostgreSQL. Elasticsearch index updated asynchronously via Kafka.</p>
        <br/>
        <b>MPEG-DASH Manifest</b>
        <p>Each track is segmented into 15-second chunks. An MPD manifest lists all quality representations. Client player (libspotify / Spotify Web Playback SDK) negotiates bitrate and requests chunks directly from the CDN edge. ABR algorithm monitors buffer health and switches quality tier seamlessly.</p>
      </div>
      <div>
        <b>CDN Strategy</b>
        <ul>
          <li>Fastly / Akamai edge nodes in 150+ PoPs globally</li>
          <li>Popular tracks (top 5M) pinned to CDN edge — near 100% cache hit ratio</li>
          <li>Long-tail tracks served from GCS origin with 2h CDN TTL</li>
          <li>Pre-signed URLs with 15-minute expiry prevent direct hotlinking</li>
          <li>Range requests supported for seek-ahead caching</li>
        </ul>
        <br/>
        <b>DRM (Digital Rights Management)</b>
        <ul>
          <li>Widevine (Android/Web), FairPlay (iOS/macOS), PlayReady (Windows)</li>
          <li>Licence server issues content encryption key (CEK) per device session</li>
          <li>Offline downloads encrypted with device-bound key; licence expires 30 days</li>
          <li>Streaming keys rotated per track play session</li>
        </ul>
        <br/>
        <b>Gapless Playback</b>
        <p>Client pre-fetches next track's first chunk while current track plays. Cross-fade achieved by mixing audio in client-side buffer. Requires next-track prediction from queue service.</p>
      </div>
    </div>
    <div class="tip-box">Key insight: 80% of audio traffic comes from top 5M tracks (Pareto). Pinning these to CDN edge eliminates origin load and reduces latency from ~200ms to &lt;20ms for cache hits.</div>
  </div>
</div>

<!-- 6. Core Service 2: Recommendation Engine -->
<div class="ref-section">
  <div class="ref-title">6. Core Service — Recommendation Engine (Discover Weekly / Daily Mix)</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>Three Pillars of Spotify Recommendations</b>
        <ol>
          <li><b>Collaborative Filtering</b> — "Users similar to you also listened to…" Matrix factorisation (ALS) on implicit feedback (plays, skips, saves). 300M+ user × 100M track matrix trained on Apache Spark / Google Dataproc weekly.</li>
          <li><b>Natural Language Processing</b> — Blog posts, playlist titles, tweets about artists scraped and embedded to understand cultural context. Word2Vec / BERT embeddings place artists in semantic space.</li>
          <li><b>Audio Feature Analysis (Echo Nest DNA)</b> — Per-track features: valence, energy, danceability, tempo, key, mode, loudness, speechiness, acousticness (extracted by ML models). Deep CNN on raw audio waveforms for genre/mood classification.</li>
        </ol>
      </div>
      <div>
        <b>Discover Weekly Pipeline</b>
        <div class="code-box">Sunday 00:00 UTC:
1. Spark job reads play events (Kafka → GCS → BigQuery)
2. ALS model re-trains on 4-week rolling window
3. Candidate generation: top-500 tracks per user (ALS + NLP)
4. Re-ranking: filter already-heard, boost fresh releases
5. Diversity injection: ensure ≥3 genres, ≥8 artists
6. Results written to Cassandra: (user_id, week) → [track_ids]
7. Cache warm-up: top 1M users pre-loaded in Redis

Monday 06:00 local time: playlist visible to user</div>
        <br/>
        <b>Real-time Signal Loop</b>
        <p>Every play/skip/like event published to Kafka <code>user-interactions</code> topic. Stream processor (Flink) maintains per-user rolling taste vector in Redis. Used for instant radio seed and context-aware queue suggestions.</p>
      </div>
    </div>
    <div class="warn-box">Cold Start: New users have no history. Solved by onboarding taste quiz (select 3+ artists/genres) and using those as initial CF seed. After 10 plays, real collaborative filtering kicks in and replaces the seed data.</div>
  </div>
</div>

<!-- 7. Core Service 3: Offline Sync -->
<div class="ref-section">
  <div class="ref-title">7. Core Service — Offline Sync &amp; Download Management</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>Architecture</b>
        <p>Premium users can pin up to 10,000 tracks for offline playback. The Offline Sync Service computes a delta between the server-side "pinned set" and the device's local manifest on every app foreground event.</p>
        <div class="code-box">Device startup / foreground:
GET /v1/me/offline/manifest
  → server returns {pinned_track_ids[], version_hash}
  → device diffs vs local SQLite manifest
  → requests download tokens for missing tracks
  → downloads encrypted audio from CDN in background
  → updates local manifest on completion</div>
        <br/>
        <b>Sync Protocol</b>
        <ul>
          <li>Vector clock on playlist version to detect conflicts</li>
          <li>Delta sync: only changed track list entries transferred</li>
          <li>Chunked downloads with resume support (HTTP Range requests)</li>
          <li>Background transfer service (iOS BGURLSession, Android WorkManager)</li>
        </ul>
      </div>
      <div>
        <b>DRM Offline Flow</b>
        <ol>
          <li>Client requests download token from Offline Sync Service</li>
          <li>Service validates Premium subscription status (billing check)</li>
          <li>DRM licence server issues device-bound encrypted content key (Widevine/FairPlay)</li>
          <li>Client downloads encrypted .ogg file from CDN</li>
          <li>Licence stored in device secure enclave; bound to device hardware ID</li>
          <li>Heartbeat every 30 days: device calls home to validate licence renewal</li>
          <li>On Premium cancellation: licence revocation pushed via WebSocket; tracks become unplayable within 24h</li>
        </ol>
        <br/>
        <b>Storage Limits</b>
        <ul>
          <li>Max 10,000 tracks offline per account</li>
          <li>Max 5 devices per Premium account</li>
          <li>Storage quota enforced client-side; server tracks device count</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- 8. Database Design -->
<div class="ref-section">
  <div class="ref-title">8. Database Design</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>PostgreSQL — Catalog &amp; Billing</b>
        <div class="code-box">TABLE tracks (
  track_id   UUID PRIMARY KEY,
  isrc       VARCHAR(12) UNIQUE,
  title      TEXT NOT NULL,
  duration_ms INT,
  explicit   BOOLEAN,
  album_id   UUID REFERENCES albums(album_id),
  label_id   UUID,
  release_date DATE,
  popularity INT,  -- updated daily by batch job
  audio_feature_id UUID,
  created_at TIMESTAMP
);
INDEX ON tracks(album_id);
INDEX ON tracks(popularity DESC);

TABLE audio_features (
  track_id    UUID PRIMARY KEY,
  danceability FLOAT, energy FLOAT,
  key INT, loudness FLOAT, mode INT,
  speechiness FLOAT, acousticness FLOAT,
  instrumentalness FLOAT, liveness FLOAT,
  valence FLOAT, tempo FLOAT, time_signature INT
);

TABLE subscriptions (
  user_id    UUID PRIMARY KEY,
  plan       ENUM('free','premium','family','duo'),
  status     ENUM('active','cancelled','trialing'),
  expires_at TIMESTAMP,
  stripe_sub_id VARCHAR(100)
);</div>
      </div>
      <div>
        <b>Cassandra — Users, Playlists, Play History</b>
        <div class="code-box">-- Playlist tracks (partition by user for fast reads)
TABLE user_playlists (
  user_id     UUID,
  playlist_id UUID,
  name        TEXT,
  public      BOOLEAN,
  track_count INT,
  updated_at  TIMESTAMP,
  PRIMARY KEY (user_id, updated_at DESC)
);

TABLE playlist_tracks (
  playlist_id UUID,
  position    INT,
  track_id    UUID,
  added_by    UUID,
  added_at    TIMESTAMP,
  PRIMARY KEY (playlist_id, position)
);

-- Play history for recommendations
TABLE play_history (
  user_id     UUID,
  played_at   TIMEUUID,
  track_id    UUID,
  context     TEXT,  -- album/playlist/radio
  ms_played   INT,
  PRIMARY KEY (user_id, played_at DESC)
) WITH CLUSTERING ORDER BY (played_at DESC)
  AND default_time_to_live = 7776000; -- 90 days</div>
        <br/>
        <b>Redis</b>
        <div class="code-box">session:{user_id}        → JWT + device info (TTL 24h)
reco:{user_id}           → JSON list of track_ids (TTL 24h)
top_charts:{country}     → sorted set by stream count (TTL 1h)
artist_info:{artist_id}  → serialised artist object (TTL 6h)
now_playing:{user_id}    → current track + position (TTL 5min)</div>
      </div>
    </div>
  </div>
</div>

<!-- 9. Data Flow — Key Scenarios -->
<div class="ref-section">
  <div class="ref-title">9. Data Flow — Key Scenarios</div>
  <div class="ref-body">
    <b>Scenario A: User Plays a Track</b>
    <div class="flow-box">
      <div class="flow-step">1. User taps track in app</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">2. PUT /v1/me/player/play → API Gateway → Auth middleware validates JWT</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">3. Stream Service resolves track_id → GCS object path from catalog cache (Redis)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">4. DRM licence server issues content key for this session</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">5. Stream Service generates pre-signed CDN URL (15 min TTL) + DASH manifest URL</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">6. Client fetches DASH manifest from CDN; begins downloading 15s audio chunks</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">7. play_started event published to Kafka topic user-play-events</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">8. Flink consumer updates user taste vector in Redis; BigQuery consumer writes to analytics</div>
    </div>
    <br/>
    <b>Scenario B: Discover Weekly Generation (Every Monday)</b>
    <div class="flow-box">
      <div class="flow-step">1. Scheduled Spark job reads 4-week play events from BigQuery</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">2. ALS matrix factorisation trained; user-track latent factor vectors produced</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">3. NLP model enriches with cultural embedding scores from scraped text</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">4. Candidate set (500 tracks per user) filtered: remove already-heard, apply diversity rules</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">5. Final 30-track playlist written to Cassandra: user_recommendations table</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">6. Push notification sent via FCM/APNs: "Your Discover Weekly is ready"</div>
    </div>
    <br/>
    <b>Scenario C: Search for a Track</b>
    <div class="flow-box">
      <div class="flow-step">1. User types query in search bar; client debounces 300ms</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">2. GET /v1/search?q=bohemian+rhapsody&amp;type=track → API Gateway</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">3. Search Service issues multi-match query to Elasticsearch (title^3 + artist^2 + album)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">4. ES returns top-20 by BM25 score × popularity boost</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">5. Personalisation re-ranker re-orders results using user's taste vector from Redis</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">6. Response merged (tracks + artists + albums) returned in &lt;100ms P99</div>
    </div>
  </div>
</div>

<!-- 10. Caching Strategy -->
<div class="ref-section">
  <div class="ref-title">10. Caching Strategy</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><td>Cache Layer</td><td>What is Cached</td><td>TTL</td><td>Eviction / Pattern</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis L1</td><td>Track metadata, artist info, album art URL</td><td>6h</td><td>LRU; Cache-Aside; miss → PostgreSQL</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis L1</td><td>Personalised recommendations (reco:{user_id})</td><td>24h</td><td>Write-through on batch job completion</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis L1</td><td>Top Charts per country (sorted set)</td><td>1h</td><td>Write-through from batch aggregation</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis L1</td><td>User session / JWT claims</td><td>24h</td><td>Expire on logout / token revocation list</td></tr>
      <tr class="pt-row"><td class="pt-name">CDN Edge</td><td>Audio chunks (15s segments) for popular tracks</td><td>24h</td><td>LRU at edge; top 5M tracks pinned</td></tr>
      <tr class="pt-row"><td class="pt-name">CDN Edge</td><td>Album art, artist images (static assets)</td><td>7d</td><td>Immutable with content hash in URL</td></tr>
      <tr class="pt-row"><td class="pt-name">CDN Edge</td><td>Curated playlist API responses (featured playlists)</td><td>1h</td><td>Surrogate key invalidation on editorial update</td></tr>
      <tr class="pt-row"><td class="pt-name">Client (app)</td><td>Offline downloaded tracks (encrypted)</td><td>30d (DRM licence)</td><td>Explicit user delete or Premium expiry</td></tr>
      <tr class="pt-row"><td class="pt-name">Client (app)</td><td>Pre-fetched next-track first chunk (gapless)</td><td>In-memory, ~30s</td><td>LRU buffer, evicted on skip</td></tr>
    </table>
    <br/>
    <div class="tip-box">Cache invalidation strategy: Use event-driven invalidation via Kafka. When a track's metadata is updated (e.g., explicit flag corrected), an event triggers cache deletion in Redis and CDN surrogate key purge. Avoids polling and reduces stale-data window from hours to seconds.</div>
  </div>
</div>

<!-- 11. Message Queue / Event Streaming -->
<div class="ref-section">
  <div class="ref-title">11. Message Queue / Event Streaming (Kafka)</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>Why Kafka?</b>
        <ul>
          <li>400K+ events/sec at peak — Kafka handles millions/sec with horizontal scaling</li>
          <li>Durable log replay: ML pipelines re-consume historical play events for model training</li>
          <li>Multiple independent consumers (analytics, recommendations, billing, notifications) without producer coupling</li>
          <li>Compacted topics for user state (latest-value semantics)</li>
          <li>Exactly-once semantics (EOS) for royalty event accounting</li>
        </ul>
        <br/>
        <b>Key Topics</b>
        <table class="pattern-table">
          <tr class="pt-header"><td>Topic</td><td>Producers</td><td>Consumers</td></tr>
          <tr class="pt-row"><td class="pt-name">user-play-events</td><td>Stream Service</td><td>Royalties, Recommendations (Flink), BigQuery sink</td></tr>
          <tr class="pt-row"><td class="pt-name">user-skip-events</td><td>Player Service</td><td>Recommendation feedback loop, Ad billing</td></tr>
          <tr class="pt-row"><td class="pt-name">track-ingested</td><td>Ingestion Service</td><td>Encoder, ES indexer, Catalog Service</td></tr>
          <tr class="pt-row"><td class="pt-name">playlist-updated</td><td>Playlist Service</td><td>Social feed, CDN invalidation, Offline Sync delta</td></tr>
          <tr class="pt-row"><td class="pt-name">social-follow</td><td>Social Service</td><td>Notification Service, Social Graph Updater</td></tr>
        </table>
      </div>
      <div>
        <b>Partitioning Strategy</b>
        <p>All event topics partitioned by <code>user_id</code> (hash partition). This ensures all events from a single user land on the same partition, preserving ordering for per-user state machines (e.g., play → skip → play sequence for recommendation signal).</p>
        <br/>
        <b>Royalty Accounting</b>
        <p>The royalty calculation is legally sensitive and requires exactly-once delivery. Kafka EOS transactions ensure each play event counted exactly once. A dedicated Royalty Service reads <code>user-play-events</code>, accumulates stream counts per ISRC, and writes settled royalty records to PostgreSQL in hourly micro-batches. This feeds the monthly payout to rights holders.</p>
        <br/>
        <b>Retention Policy</b>
        <ul>
          <li><code>user-play-events</code>: 7 days hot (Kafka), 1 year cold (GCS Parquet via BigQuery)</li>
          <li><code>track-ingested</code>: 30 days (downstream idempotent)</li>
          <li><code>social-follow</code>: 3 days (fan-out notifications are time-sensitive)</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- 12. Real-time Communication -->
<div class="ref-section">
  <div class="ref-title">12. Real-time Communication</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>WebSocket — Listening Together &amp; Friend Activity</b>
        <p>Spotify Connect (multi-device control) and Listening Together (real-time shared playback) require bidirectional low-latency communication. WebSocket persistent connections are maintained per active session.</p>
        <div class="code-box">WS wss://dealer.spotify.com/

Client → Server:
{ "type": "ping" }

Server → Client:
{ "type": "message", "payloads": [{
    "headers": {"Spotify-Connection-Id": "..."},
    "body": "{\\"type\\":\\"track_changed\\",\\"track_id\\":\\"...\\",\\"position_ms\\":0}"
}]}</div>
      </div>
      <div>
        <b>Spotify Connect (Remote Control)</b>
        <p>Allows a phone to control playback on a desktop/TV/speaker. Uses a dealer WebSocket service (internally called the "dealer"). Command messages (play, pause, seek, volume) are routed through the dealer to the target device. Architecture:</p>
        <ul>
          <li>Each active device maintains a WebSocket to dealer cluster</li>
          <li>Dealer cluster sharded by connection_id (consistent hashing)</li>
          <li>Commands fan-out via Redis Pub/Sub between dealer nodes</li>
          <li>Device presence tracked in Redis with 60s heartbeat TTL</li>
        </ul>
        <br/>
        <b>Friend Activity Feed (SSE)</b>
        <p>Real-time "now playing" feed for followed friends uses Server-Sent Events (one-way push). SSE is simpler than WebSocket for read-only streams and traverses proxies/firewalls more easily. Friend activity events arrive via Kafka <code>social-activity</code> topic → SSE broker → client.</p>
      </div>
    </div>
  </div>
</div>

<!-- 13. Consistency & Transactions -->
<div class="ref-section">
  <div class="ref-title">13. Consistency &amp; Transactions</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>Strong Consistency (ACID) — Where Required</b>
        <ul>
          <li><b>Billing / Subscriptions</b>: PostgreSQL with serialisable isolation. Stripe webhook idempotency key prevents double-charge. Subscription state changes use DB transactions (charge → update plan atomically).</li>
          <li><b>Royalty Accounting</b>: Kafka EOS + PostgreSQL transactions for stream-count ledger. Each ISRC increment is idempotent (Kafka offset as idempotency key).</li>
          <li><b>DRM Licence Issuance</b>: Synchronous check of subscription status before issuing licence; prevents race condition where subscription expires mid-download.</li>
        </ul>
      </div>
      <div>
        <b>Eventual Consistency (BASE) — Acceptable</b>
        <ul>
          <li><b>Play History</b>: Written to Cassandra asynchronously. A user may not see the last 10s of a session reflected immediately; acceptable for a listening history view.</li>
          <li><b>Playlist Track Count</b>: Denormalised counter in Cassandra updated eventually via Kafka; minor lag acceptable in UI.</li>
          <li><b>Social Follow Counts</b>: Cassandra counter columns; eventual consistency over seconds is fine for follower displays.</li>
          <li><b>Recommendation Freshness</b>: Daily batch; 24h stale data acceptable for Discover Weekly.</li>
        </ul>
        <br/>
        <b>Distributed Locking</b>
        <p>Playlist track reordering uses Redis Redlock (or Cassandra LWT) to prevent concurrent edits from corrupting order. Clients send ETag; server rejects stale writes with HTTP 412.</p>
      </div>
    </div>
  </div>
</div>

<!-- 14. Search Architecture -->
<div class="ref-section">
  <div class="ref-title">14. Search Architecture</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>Elasticsearch Cluster Design</b>
        <ul>
          <li>Index: <code>tracks</code> (100M docs), <code>artists</code> (10M), <code>albums</code> (30M), <code>podcasts</code> (5M)</li>
          <li>Shards: 10 primary shards per index (allows growth to 500M docs at 50M/shard)</li>
          <li>Replicas: 2 replicas per shard (total 3 copies) for HA</li>
          <li>Refresh interval: 5s for new track ingestion</li>
          <li>Heap: 30GB per data node; 50% OS page cache for disk-based inverted index</li>
        </ul>
        <br/>
        <b>Index Mapping (tracks)</b>
        <div class="code-box">{
  "track_name": { "type": "text",
    "analyzer": "standard",
    "fields": {
      "autocomplete": { "type": "text",
        "analyzer": "edge_ngram_analyzer" }
    }
  },
  "artist_name": { "type": "text", "boost": 2 },
  "album_name":  { "type": "text" },
  "popularity":  { "type": "integer" },
  "language":    { "type": "keyword" },
  "explicit":    { "type": "boolean" },
  "release_date":{ "type": "date" }
}</div>
      </div>
      <div>
        <b>Query Strategy</b>
        <div class="code-box">POST /tracks/_search
{
  "query": {
    "function_score": {
      "query": {
        "multi_match": {
          "query": "bohemian rhapsody",
          "fields": ["track_name^3","artist_name^2","album_name"],
          "type": "best_fields",
          "fuzziness": "AUTO"
        }
      },
      "functions": [{
        "field_value_factor": {
          "field": "popularity",
          "factor": 0.001,
          "modifier": "log1p"
        }
      }]
    }
  }
}</div>
        <br/>
        <b>Autocomplete</b>
        <p>Edge n-gram tokeniser on <code>track_name.autocomplete</code> field. Query uses match on the autocomplete sub-field with minimum_should_match=1. Returned results ranked by popularity score. P99 &lt;50ms for autocomplete.</p>
        <br/>
        <b>Personalised Re-ranking</b>
        <p>After ES returns top-50 candidates, a lightweight ML re-ranking layer (served from Redis-cached user taste vector) boosts tracks whose genre/artist matches user preferences. Re-rank adds ~10ms but significantly improves click-through.</p>
      </div>
    </div>
  </div>
</div>

<!-- 15. CDN & Media Delivery -->
<div class="ref-section">
  <div class="ref-title">15. CDN &amp; Media Delivery</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>What is CDN-Served</b>
        <ul>
          <li>Audio segment files (.ogg chunks, 15s each) — primary CDN workload</li>
          <li>MPEG-DASH manifests (.mpd files)</li>
          <li>Album art &amp; artist images (JPEG/WebP, immutable URLs)</li>
          <li>Static web assets (JS bundles, CSS)</li>
          <li>Curated playlist API responses (Edge Side Includes)</li>
        </ul>
        <br/>
        <b>Edge Cache Design</b>
        <ul>
          <li>Fastly CDN with 150+ PoPs; Akamai as secondary for specific regions</li>
          <li>Cache key: <code>{track_id}/{quality}/{segment_index}</code></li>
          <li>Top 5M tracks (80% of traffic) pinned at edge via cache prefetch on release</li>
          <li>Long-tail (remaining 95M tracks): cache on first request, 2h TTL, LRU eviction</li>
          <li>Geo-routing: users routed to nearest PoP, reducing latency from 200ms to &lt;20ms</li>
        </ul>
      </div>
      <div>
        <b>Pre-signed URL Security</b>
        <div class="code-box">CDN URL format:
https://audio-cdn.spotify.com/audio/
  {track_id}/{quality}.ogg
  ?token={HMAC_SHA256_signed_token}
  &exp={unix_timestamp_15min}
  &uid={user_id_hash}

Token signed with CDN shared secret.
CDN edge validates signature before serving.
Prevents sharing of audio URLs externally.
New token issued on each /stream API call.</div>
        <br/>
        <b>Cache Invalidation</b>
        <p>Audio files are immutable after encoding (content-addressed by track_id + quality). Invalidation only needed for:</p>
        <ul>
          <li>Track taken down (DMCA): immediate purge via Fastly Instant Purge API (propagates in &lt;150ms globally)</li>
          <li>Album art updated by artist: new URL with incremented version hash; old URL continues to serve from cache until TTL expires</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- 16. Security -->
<div class="ref-section">
  <div class="ref-title">16. Security</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>Authentication &amp; Authorisation</b>
        <ul>
          <li>OAuth 2.0 with PKCE for all mobile/web clients (prevents auth code interception)</li>
          <li>JWT access tokens (15 min TTL) + opaque refresh tokens (30 day TTL, rotated on use)</li>
          <li>Scopes: <code>streaming</code>, <code>playlist-modify-private</code>, <code>user-read-email</code>, etc.</li>
          <li>Social login (Google, Facebook, Apple) via identity federation</li>
          <li>MFA via TOTP for account recovery</li>
        </ul>
        <br/>
        <b>DRM &amp; Content Protection</b>
        <ul>
          <li>Widevine L1 (hardware-backed TEE on Android) for highest quality offline</li>
          <li>FairPlay on iOS — licence bound to device certificate</li>
          <li>Content Encryption Keys (CEK) never leave DRM licence server</li>
          <li>Licence auditing: every licence issuance logged for rights-holder compliance reporting</li>
        </ul>
      </div>
      <div>
        <b>Encryption</b>
        <ul>
          <li>All data in transit: TLS 1.3 minimum; HTTP Strict Transport Security (HSTS)</li>
          <li>Audio at rest in GCS: AES-256-GCM (Google-managed keys + Customer-Managed for sensitive labels)</li>
          <li>PII (email, payment info) encrypted at column level in PostgreSQL (pgcrypto)</li>
          <li>Offline downloaded files encrypted with device-specific key in secure enclave</li>
        </ul>
        <br/>
        <b>Rate Limiting &amp; Abuse Prevention</b>
        <ul>
          <li>API Gateway: 100 req/30s per user (sliding window in Redis)</li>
          <li>Stream endpoint: max 5 concurrent streams per account (prevents credential sharing at scale)</li>
          <li>Bot detection: ML model on play-event patterns (too-fast skips, impossible geography)</li>
          <li>DMCA takedown automation: Kafka-triggered CDN purge + search index removal within 1h of notice</li>
          <li>Fraud detection on free-trial abuse: device fingerprinting (device_id hashed)</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- 17. Scalability Patterns -->
<div class="ref-section">
  <div class="ref-title">17. Scalability Patterns</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>Horizontal Scaling</b>
        <ul>
          <li>All microservices stateless; scale independently on Kubernetes (GKE)</li>
          <li>HPA (Horizontal Pod Autoscaler) based on CPU + custom metric (stream_queue_depth)</li>
          <li>Stream Service scales most aggressively; pre-scales for Monday Discover Weekly notification spike</li>
          <li>Recommendation batch jobs on ephemeral Dataproc clusters (auto-shutdown after run)</li>
        </ul>
        <br/>
        <b>Database Sharding</b>
        <ul>
          <li><b>Cassandra</b>: Consistent hashing with virtual nodes (vnodes). user_id as partition key distributes user data evenly. 100+ nodes globally.</li>
          <li><b>PostgreSQL</b>: Read replicas (5 per region) for catalog reads. Catalog data changes infrequently; replication lag &lt;1s acceptable.</li>
          <li><b>Elasticsearch</b>: 10 primary shards per index. Index per quarter for time-series play analytics; old indices frozen (read-only, searchable from cold storage).</li>
        </ul>
      </div>
      <div>
        <b>Read Replicas &amp; CQRS</b>
        <p>Catalog and user-playlist data follows CQRS: write path goes to primary DB + emits Kafka event; read path served from Redis cache or read replica. This decouples write throughput from read QPS.</p>
        <br/>
        <b>Global Multi-Region</b>
        <ul>
          <li>Active-active: us-east1, europe-west1, asia-southeast1 (Google Cloud regions)</li>
          <li>Cassandra multi-region with NetworkTopologyStrategy (RF=3 per region)</li>
          <li>User writes (playlist create) go to nearest region; async cross-region replication via Kafka MirrorMaker 2</li>
          <li>CDN PoP in every continent; audio latency independent of service region</li>
        </ul>
        <br/>
        <b>Backpressure</b>
        <p>Stream Service uses token bucket rate limiting on encoding requests. Kafka consumer lag monitored; if lag &gt; 30s, consumer group scales out automatically via KEDA (Kubernetes Event-Driven Autoscaling).</p>
      </div>
    </div>
  </div>
</div>

<!-- 18. Fault Tolerance & Reliability -->
<div class="ref-section">
  <div class="ref-title">18. Fault Tolerance &amp; Reliability</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>Circuit Breaker Pattern</b>
        <p>All inter-service calls wrapped in Resilience4j circuit breakers. Example: Stream Service → Catalog Service. If catalog fails, circuit opens and stream service falls back to Redis-cached track metadata (stale but playable). Circuit half-opens after 60s to test recovery.</p>
        <br/>
        <b>Retry with Exponential Backoff</b>
        <div class="code-box">Retry policy (gRPC calls):
- Max attempts: 3
- Initial delay: 100ms
- Multiplier: 2.0
- Max delay: 2s
- Jitter: ±20% (prevents thundering herd)
- Retried on: UNAVAILABLE, DEADLINE_EXCEEDED
- NOT retried on: INVALID_ARGUMENT, NOT_FOUND</div>
        <br/>
        <b>Bulkhead Pattern</b>
        <p>Thread pool isolation in Stream Service: separate pools for CDN URL generation (fast), DRM licence calls (slow, network-bound), and Kafka publishing (async). DRM pool exhaustion doesn't block CDN URL generation.</p>
      </div>
      <div>
        <b>Graceful Degradation</b>
        <ul>
          <li>Recommendation service down → return cached recommendations (Redis) or editorial fallback ("Top 50 Global")</li>
          <li>Search service degraded → return cached popular results for same query</li>
          <li>Ad service timeout → free users get silence gap (ad slot skipped) rather than broken experience</li>
          <li>Social feature outage → hide friend activity panel; core playback unaffected</li>
        </ul>
        <br/>
        <b>Chaos Engineering</b>
        <p>Spotify runs quarterly GameDays using Chaos Monkey (Simian Army) to validate failure modes:</p>
        <ul>
          <li>Random pod kills in production (canary ring)</li>
          <li>Network partition between regions</li>
          <li>Cassandra node failure simulations</li>
          <li>CDN origin outage drills</li>
        </ul>
        <br/>
        <b>Multi-AZ Deployment</b>
        <p>All services deployed across 3 availability zones. Zone failure loses &lt;33% capacity; load balancer routes around unhealthy AZ within 10s (health check interval).</p>
      </div>
    </div>
  </div>
</div>

<!-- 19. Monitoring & Observability -->
<div class="ref-section">
  <div class="ref-title">19. Monitoring &amp; Observability</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>Metrics (Prometheus + Grafana)</b>
        <ul>
          <li><code>stream_start_latency_p99</code> — SLO: &lt;500ms. Alert if &gt;750ms for 5 min.</li>
          <li><code>audio_buffer_stall_rate</code> — % of sessions with buffer stall. SLO: &lt;0.5%</li>
          <li><code>search_query_latency_p99</code> — SLO: &lt;150ms</li>
          <li><code>kafka_consumer_lag{topic="user-play-events"}</code> — Alert if &gt;10k msgs</li>
          <li><code>cdn_cache_hit_ratio</code> — SLO: &gt;95% for popular tracks</li>
          <li><code>drm_licence_error_rate</code> — Alert at &gt;0.1%</li>
        </ul>
        <br/>
        <b>Distributed Tracing (Jaeger / Cloud Trace)</b>
        <p>OpenTelemetry instrumented in all services. Trace ID propagated in HTTP headers across service boundaries. Full trace from client play request → CDN URL generation → Kafka publish visible in single trace. P99 latency breakdown per service hop.</p>
      </div>
      <div>
        <b>Logging (ELK / Cloud Logging)</b>
        <ul>
          <li>Structured JSON logs with trace_id, user_id (hashed), service, level</li>
          <li>Sensitive fields (email, IP) masked at log ingestion</li>
          <li>Log retention: 30 days hot (Elasticsearch), 1 year cold (GCS)</li>
          <li>Real-time log-based alerts: "DRM licence server error spike" triggers PagerDuty</li>
        </ul>
        <br/>
        <b>SLOs / SLAs</b>
        <table class="pattern-table">
          <tr class="pt-header"><td>SLO</td><td>Target</td><td>Error Budget</td></tr>
          <tr class="pt-row"><td class="pt-name">Stream Start</td><td>P99 &lt;500ms</td><td>0.1% of requests/month</td></tr>
          <tr class="pt-row"><td class="pt-name">Availability</td><td>99.99%</td><td>~44 min/year</td></tr>
          <tr class="pt-row"><td class="pt-name">Search Latency</td><td>P95 &lt;100ms</td><td>5% of searches</td></tr>
          <tr class="pt-row"><td class="pt-name">Offline Sync</td><td>Delta computed &lt;5s</td><td>1% of syncs</td></tr>
        </table>
        <br/>
        <b>Business Metrics (Looker / BigQuery)</b>
        <p>MAU/DAU trends, Premium conversion rate, tracks per session, skip rate by genre (signals recommendation quality), ad impression fill rate, churn cohort analysis.</p>
      </div>
    </div>
  </div>
</div>

<!-- 20. Deployment Architecture -->
<div class="ref-section">
  <div class="ref-title">20. Deployment Architecture</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>Kubernetes on GKE</b>
        <ul>
          <li>Regional GKE clusters in us-east1, europe-west1, asia-southeast1</li>
          <li>Separate node pools: streaming services (high memory, n2-highmem), ML inference (A100 GPUs), batch jobs (preemptible/spot)</li>
          <li>Istio service mesh for mTLS, traffic management, canary weights</li>
          <li>Config managed via Helm charts + GitOps (ArgoCD)</li>
        </ul>
        <br/>
        <b>Blue-Green Deployment</b>
        <p>Stream Service and DRM Service use blue-green (full parallel environment). Traffic shifted 0% → 100% in one step after smoke tests pass. Immediate rollback by flipping load balancer. Used for major API version upgrades.</p>
      </div>
      <div>
        <b>Canary Releases</b>
        <p>New microservice versions deployed to 1% of traffic initially. Automated canary analysis via Flagger: monitors stream_start_latency_p99 and error_rate for 30 min. Auto-promotes to 100% if SLOs met; auto-rollback if degraded. Prevents bad deploys from reaching all 600M users.</p>
        <br/>
        <b>CI/CD Pipeline</b>
        <div class="code-box">GitHub PR → GitHub Actions:
1. Unit tests + integration tests
2. Docker image build + push to GCR
3. Helm chart lint + kubeval
4. Deploy to staging (full integration test)
5. Canary deploy to prod (1%)
6. Flagger automated analysis (30 min)
7. Progressive rollout: 1% → 10% → 50% → 100%

Rollback: ArgoCD revert to previous Helm release
MTTR target: &lt;5 min via automated rollback</div>
      </div>
    </div>
  </div>
</div>

<!-- 21. Performance Optimisations -->
<div class="ref-section">
  <div class="ref-title">21. Performance Optimisations</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>Audio Streaming Specific</b>
        <ul>
          <li><b>Adaptive Bitrate (ABR)</b>: MPEG-DASH ABR reduces buffering by 60% on mobile compared to fixed bitrate; client probes bandwidth every 5s and switches quality tier</li>
          <li><b>Prefetch next track</b>: While current track plays, client silently fetches first 2 chunks of next track → gapless playback with 0ms gap</li>
          <li><b>Audio compression</b>: Ogg Vorbis at 320kbps is ~40% smaller than equivalent MP3 at same perceived quality; reduces CDN egress costs by ~30%</li>
          <li><b>Range requests</b>: Supports HTTP Range header; seek operation requests only the needed segment, not re-downloading full track</li>
        </ul>
        <br/>
        <b>Database Optimisations</b>
        <ul>
          <li>PostgreSQL: partial index on <code>tracks(popularity DESC) WHERE popularity &gt; 50</code> for top-charts queries</li>
          <li>Cassandra: wide-row partition for playlist_tracks avoids scatter-gather; entire playlist fetched in single partition read</li>
          <li>Connection pooling: PgBouncer (transaction mode) for PostgreSQL; reduces connection overhead from O(pods) to O(1) per DB</li>
        </ul>
      </div>
      <div>
        <b>API &amp; Service Optimisations</b>
        <ul>
          <li><b>gRPC between services</b>: Protocol Buffers binary serialisation is 3-10x smaller than JSON; reduces inter-service latency by ~30% on internal calls</li>
          <li><b>HTTP/2 multiplexing</b>: Single TCP connection for multiple API calls from client; especially beneficial on mobile (TCP connection setup is expensive on LTE)</li>
          <li><b>Response compression</b>: gzip on JSON API responses; 70-80% reduction for metadata-heavy responses like search results</li>
          <li><b>Batch endpoints</b>: <code>GET /v1/tracks?ids=id1,id2,...,id50</code> — fetch up to 50 track metadata in single request; reduces round trips when loading playlist view</li>
        </ul>
        <br/>
        <b>Search Optimisations</b>
        <ul>
          <li>Elasticsearch query cache: frequently searched terms cached in ES query cache (JVM heap); zero-cost repeat queries</li>
          <li>Warm up autocomplete index on ES node startup: pre-execute top-1000 search terms to populate OS page cache</li>
          <li>Result caching in Redis: top 500 search queries cached 5 min; covers ~30% of search volume</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- 22. Cost Optimisation -->
<div class="ref-section">
  <div class="ref-title">22. Cost Optimisation</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>Storage Tiering</b>
        <ul>
          <li>GCS Multi-Regional for top 5M tracks (hot): fast access, higher cost</li>
          <li>GCS Standard for remaining 95M tracks: retrieved infrequently</li>
          <li>GCS Nearline for tracks with zero plays in 6 months: 50% cheaper storage</li>
          <li>GCS Coldline for archived/deleted tracks (rights disputes): 80% cheaper, 12h retrieval SLA</li>
          <li>Lifecycle policies auto-transition objects: saves ~$2M/year at Spotify scale</li>
        </ul>
        <br/>
        <b>Compute Cost</b>
        <ul>
          <li>Recommendation batch jobs on preemptible VMs (80% cheaper); retry logic handles preemption</li>
          <li>Encoding jobs on Spot instances; non-latency-sensitive, can tolerate interruption</li>
          <li>Committed Use Discounts (CUDs) on baseline GKE node pools (3-year, 55% discount)</li>
          <li>Auto-scaling down non-peak services (ad service, social) outside 08:00-23:00 local</li>
        </ul>
      </div>
      <div>
        <b>CDN Cost</b>
        <ul>
          <li>CDN egress is largest cost driver at Spotify scale (~1.28 Tbps)</li>
          <li>Negotiated volume pricing with Fastly/Akamai at multi-Tbps scale</li>
          <li>CDN cache hit ratio target &gt;95%: each 1% improvement saves ~$500K/month in origin egress</li>
          <li>Lower bitrate tiers for mobile on cellular (96kbps default on 3G): reduces CDN bandwidth without UX degradation</li>
        </ul>
        <br/>
        <b>Database Cost</b>
        <ul>
          <li>Redis: right-size per-service cache with memory profiling; evict large recommendation blobs to Cassandra after 24h</li>
          <li>Cassandra: TTL on play_history (90 days) auto-purges old data; keeps storage bounded without manual cleanup</li>
          <li>BigQuery: partition pruning on date-partitioned play_events table; queries only scan relevant partitions (reduces cost by 95% for recent-days queries)</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- 23. Disaster Recovery -->
<div class="ref-section">
  <div class="ref-title">23. Disaster Recovery</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>RTO / RPO Targets</b>
        <table class="pattern-table">
          <tr class="pt-header"><td>Service</td><td>RTO</td><td>RPO</td></tr>
          <tr class="pt-row"><td class="pt-name">Audio Streaming</td><td>5 min</td><td>0 (CDN stateless)</td></tr>
          <tr class="pt-row"><td class="pt-name">User Playlists (Cassandra)</td><td>15 min</td><td>&lt;1 min (async replication)</td></tr>
          <tr class="pt-row"><td class="pt-name">Subscriptions (PostgreSQL)</td><td>30 min</td><td>0 (sync replication to standby)</td></tr>
          <tr class="pt-row"><td class="pt-name">Search Index (ES)</td><td>1h</td><td>5 min (replica shards)</td></tr>
          <tr class="pt-row"><td class="pt-name">Recommendations</td><td>24h</td><td>1 week (last batch run)</td></tr>
        </table>
        <br/>
        <b>Backup Strategy</b>
        <ul>
          <li>Cassandra: daily snapshot to GCS + continuous incremental backups via Medusa</li>
          <li>PostgreSQL: continuous WAL archiving to GCS; point-in-time recovery to any second in last 35 days</li>
          <li>GCS audio files: replicated to secondary GCS bucket in different region (object replication)</li>
          <li>Elasticsearch: snapshot API to GCS hourly; index rebuild from Kafka topic if needed</li>
        </ul>
      </div>
      <div>
        <b>Failover Runbook</b>
        <ol>
          <li><b>Detect</b>: Datadog/PagerDuty alert on region health check failure (&lt;2 min detection)</li>
          <li><b>Assess</b>: On-call engineer determines scope (AZ vs region outage)</li>
          <li><b>Traffic shift</b>: Update Global Load Balancer DNS weights to route 100% traffic to healthy region (&lt;5 min)</li>
          <li><b>Promote Cassandra</b>: If primary region lost, promote secondary region nodes to coordinator (&lt;10 min; Cassandra is multi-master, minimal action needed)</li>
          <li><b>Promote PostgreSQL standby</b>: Cloud SQL automatic failover to hot standby (&lt;60s RPO via synchronous replication)</li>
          <li><b>Validate</b>: Synthetic monitor plays a track end-to-end; confirms recovery</li>
          <li><b>Communicate</b>: Status page updated at status.spotify.com within 5 min of detection</li>
        </ol>
      </div>
    </div>
  </div>
</div>

<!-- 24. Migration Strategy -->
<div class="ref-section">
  <div class="ref-title">24. Migration Strategy (Monolith → Microservices)</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <b>Spotify's Historical Evolution</b>
        <p>Spotify began as a single-region desktop-only service in 2008. The monolith was gradually decomposed using the Strangler Fig pattern:</p>
        <ol>
          <li><b>Phase 1 (2010-2013)</b>: Extract Catalog Service first (highest read load, clear bounded context). Dual-write to monolith DB + new PostgreSQL. Route catalog reads to new service.</li>
          <li><b>Phase 2 (2013-2016)</b>: Extract User/Auth, Playlist, Stream services. Introduce Kafka for event-driven decoupling. Migrate from datacenter to GCP.</li>
          <li><b>Phase 3 (2016-2019)</b>: Extract Recommendation Engine (ML team owns it independently), Search (Elasticsearch), Social features. Decompose by team ownership ("Squad Model").</li>
          <li><b>Phase 4 (2019-present)</b>: Kubernetes migration, service mesh (Istio), standardise on gRPC internal APIs, consolidate data platform on BigQuery.</li>
        </ol>
      </div>
      <div>
        <b>Strangler Fig Pattern</b>
        <div class="code-box">Step 1: New service deployed alongside monolith
Step 2: Feature flag controls % of traffic to new svc
Step 3: Dual-write: write to both monolith DB
         and new service's DB simultaneously
Step 4: Read from new service for increasing % of users
Step 5: Validate data consistency (reconciliation job)
Step 6: Route 100% traffic to new service
Step 7: Remove write path from monolith
Step 8: Delete dead code in monolith</div>
        <br/>
        <b>Database Migration</b>
        <ul>
          <li>Use Debezium (CDC) to stream monolith DB changes to Kafka, seeding new service DB</li>
          <li>Backfill historical data via Spark batch job before go-live</li>
          <li>Shadow mode testing: new service processes all requests but responses discarded; compare with monolith for N days before live cutover</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- 25. Interview Q&A -->
<div class="ref-section">
  <div class="ref-title">25. Interview Questions &amp; Answers</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><td>Question</td><td>Answer</td><td>Insight</td></tr>
      <tr class="pt-row"><td class="pt-name">How does Spotify achieve gapless playback?</td><td>Client pre-fetches first 2 chunks of next track while current track plays. Audio is cross-faded in client-side buffer. Requires next-track prediction from queue/recommendation service.</td><td>This is a client-side optimisation; server only needs to serve the next pre-signed URL quickly.</td></tr>
      <tr class="pt-row"><td class="pt-name">How does Discover Weekly scale to 240M users?</td><td>Batch ML job (Spark/ALS) runs weekly, writes results to Cassandra. Not computed per-request. Redis pre-warms top-1M active users before Monday push notification.</td><td>Separate batch serving from real-time serving. Pre-compute is key — don't run ML inference at query time for weekly playlists.</td></tr>
      <tr class="pt-row"><td class="pt-name">Why Cassandra over MySQL for playlists?</td><td>Cassandra provides write scalability (millions of concurrent playlist updates), tunable consistency, and native multi-region replication. Playlist reads are always by user_id (partition key) — perfect for wide-row model.</td><td>Choose DB based on access pattern. If you always query by a single key, Cassandra is ideal. SQL joins are rarely needed for user-owned data.</td></tr>
      <tr class="pt-row"><td class="pt-name">How does offline DRM work without internet?</td><td>Licence (CEK) issued and stored in device secure enclave at download time. Device bound — cannot be copied. Heartbeat every 30 days; licence has 30-day offline TTL built in.</td><td>DRM is pre-issued at download, not checked on each play. The TTL enforces periodic connectivity requirement for Premium validation.</td></tr>
      <tr class="pt-row"><td class="pt-name">How do you handle a sudden viral track (thundering herd)?</td><td>New release pipeline triggers CDN pre-warm: top PoPs fetch the track from origin proactively. First CDN miss happens once per PoP, not per user. Also rate-limit origin requests at CDN with request coalescing (collapse multiple cache misses into single origin fetch).</td><td>CDN request coalescing is critical — without it, a cache miss for a viral track causes origin fan-out proportional to concurrent users.</td></tr>
      <tr class="pt-row"><td class="pt-name">How is royalty accounting accurate at scale?</td><td>Kafka EOS (exactly-once semantics) ensures each play event counted exactly once despite retries. Dedicated Royalty Service with idempotency keys. Hourly micro-batch writes to PostgreSQL ledger. Monthly reconciliation with rights holders.</td><td>Exactly-once delivery is the rare case where you truly need it — financial accounting. Most other Spotify systems use at-least-once.</td></tr>
      <tr class="pt-row"><td class="pt-name">How does Spotify support 10M concurrent streams?</td><td>Audio served directly from CDN (not through application servers). Application servers only issue pre-signed URLs (millisecond operation). CDN scales to terabits of egress without application layer involvement.</td><td>Offload data plane (bytes) to CDN; keep control plane (metadata/auth) in application servers. These scale very differently.</td></tr>
      <tr class="pt-row"><td class="pt-name">How do you design the search system for sub-100ms latency?</td><td>Elasticsearch with in-memory query cache + OS page cache for hot index. Results for top-500 queries cached in Redis (5 min TTL). Personalisation re-rank is lightweight (&lt;10ms) using pre-computed taste vectors from Redis.</td><td>Two-stage search: fast ES retrieval of candidates + lightweight re-rank. Don't run heavy ML at search time.</td></tr>
      <tr class="pt-row"><td class="pt-name">How to prevent credential/account sharing?</td><td>Max 1 concurrent stream per account (or N for Family). Device fingerprinting. Concurrent stream detection via Redis counter (INCR with TTL). Anomalous login locations flagged. Premium Family requires same home network geolocation.</td><td>Concurrent stream check is a simple Redis INCR/DECR around play start/end events. Most of the "sharing" is detected by geolocation inconsistency.</td></tr>
      <tr class="pt-row"><td class="pt-name">How does Spotify handle DMCA takedowns at scale?</td><td>Rights Management Service listens for DMCA notices. Automated pipeline: mark track as unavailable in catalog DB → emit Kafka event → CDN surrogate key purge (Fastly Instant Purge, &lt;150ms globally) → Elasticsearch document delete → Cassandra playlist entries soft-deleted.</td><td>Event-driven cascade via Kafka ensures all subsystems react consistently. CDN purge must be the first step — it stops serving the bytes immediately.</td></tr>
    </table>
  </div>
</div>

<!-- 26. Trade-off Summary -->
<div class="ref-section">
  <div class="ref-title">26. Trade-off Summary</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Choice</div>
        <div class="dt-yes">Chosen Approach ✓</div>
        <div class="dt-no">Alternative Considered ✗</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Audio Format</div>
        <div class="dt-yes">Ogg Vorbis (primary) — open-source, no royalties, 40% smaller than MP3 at equivalent quality, native Android/Web support</div>
        <div class="dt-no">MP3 — ubiquitous but patent-encumbered (historically), larger file size, higher licensing cost at scale</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">User/Playlist Store</div>
        <div class="dt-yes">Cassandra — linear write scalability, multi-region native, perfect for user_id partition key access pattern, tunable consistency</div>
        <div class="dt-no">MySQL/PostgreSQL — ACID transactions, but vertical scaling limit, cross-region replication complexity at 600M users</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Recommendation Approach</div>
        <div class="dt-yes">Batch ML (weekly) — serves 240M users with consistent latency, controllable compute cost, allows complex models</div>
        <div class="dt-no">Real-time ML inference — fresh but 100x more expensive compute; latency unpredictable; overkill for weekly playlist</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Search Engine</div>
        <div class="dt-yes">Elasticsearch — battle-tested full-text search, relevance scoring, faceting, edge n-gram for autocomplete, horizontal scaling</div>
        <div class="dt-no">PostgreSQL full-text search — simpler ops but poor scalability beyond 10M docs; no relevance tuning; slow at 100M tracks</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Streaming Protocol</div>
        <div class="dt-yes">MPEG-DASH — adaptive bitrate, CDN-cacheable static segments, open standard, works over plain HTTP CDN</div>
        <div class="dt-no">RTMP/WebRTC — real-time but high origin load (per-user connection), not CDN-cacheable, complex infrastructure</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Event Bus</div>
        <div class="dt-yes">Kafka — durable log, replay capability for ML retraining, millions of events/sec, exactly-once semantics for royalties</div>
        <div class="dt-no">RabbitMQ — simpler but no replay, limited throughput at Spotify scale, no native stream processing integration</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">CDN Strategy</div>
        <div class="dt-yes">Commercial CDN (Fastly + Akamai) — 150+ PoPs, instant purge API, no infrastructure ownership, SLA-backed</div>
        <div class="dt-no">Self-built CDN — full control but billions in CapEx, years to build global PoP network; not core competency</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Consistency Model</div>
        <div class="dt-yes">Eventual consistency for social/play history (BASE) + strong consistency for billing (ACID) — right tool per domain</div>
        <div class="dt-no">Strong consistency everywhere — unnecessary latency overhead for features like follow-count display; doesn't need to be exact</div>
      </div>
    </div>
  </div>
</div>

<!-- 27. Key Takeaways -->
<div class="ref-section">
  <div class="ref-title">27. Key Takeaways</div>
  <div class="ref-body">
    <div class="tip-box">
      <ul>
        <li><b>Separate control plane from data plane</b>: Application servers issue pre-signed URLs (milliseconds); CDN serves the actual bytes (terabits). This architecture allows 10M concurrent streams without burdening application servers.</li>
        <li><b>Pre-compute recommendations at batch scale</b>: Running ALS matrix factorisation on 300M users weekly is feasible on Spark; doing it at query time per user is not. Match compute model to freshness requirement.</li>
        <li><b>Choose database by access pattern, not familiarity</b>: Cassandra for user/playlist data (always queried by user_id), PostgreSQL for catalog/billing (rich queries, ACID), Elasticsearch for full-text search — not one DB for everything.</li>
        <li><b>CDN cache hit ratio is the most impactful cost and latency lever</b>: The top 5M tracks (5% of catalogue) serve 80% of traffic. Pinning these at CDN edge cuts origin load by ~80% and reduces audio start latency from 200ms to under 20ms.</li>
        <li><b>Event-driven architecture enables independent team scaling</b>: Kafka decouples streaming service, royalty accounting, recommendation feedback, and analytics. Each team owns their consumer without coordinating releases with producers.</li>
        <li><b>Exactly-once semantics are expensive — use them only where legally required</b>: Kafka EOS with idempotent producers used only for royalty accounting. All other consumers use at-least-once (cheaper, faster) with idempotent handlers.</li>
        <li><b>Design for failure at every layer</b>: Circuit breakers ensure catalog outage doesn't break streaming (falls back to cached metadata). Graceful degradation means free users tolerate a skipped ad rather than a broken app. Core playback must remain functional even when social features are down.</li>
      </ul>
    </div>
  </div>
</div>
`;
