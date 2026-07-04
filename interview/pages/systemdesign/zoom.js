window.Pages['sd-zoom'] = `
<div class="page-header">
  <div class="breadcrumb">System Design</div>
  <h1>Zoom Video Conferencing</h1>
  <div class="tag-grid">
    <span class="tag">WebRTC</span>
    <span class="tag">Real-time Media</span>
    <span class="tag">STUN/TURN</span>
    <span class="tag">Kafka</span>
    <span class="tag">Redis</span>
    <span class="tag">MySQL</span>
    <span class="tag">S3</span>
    <span class="tag">Microservices</span>
    <span class="tag">Kubernetes</span>
  </div>
</div>

<!-- SECTION 0: Architecture Diagram -->
<div class="ref-section">
  <div class="ref-title">System Architecture Diagram</div>
  <div class="ref-body" style="overflow-x:auto;">
    <svg viewBox="0 0 900 480" style="width:100%;max-width:900px;display:block;margin:0 auto;border-radius:10px;" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#4b5563"/>
        </marker>
      </defs>
      <!-- Background -->
      <rect width="900" height="480" fill="#0d1117" rx="10"/>

      <!-- Layer labels -->
      <text x="12" y="70" font-size="11" fill="#888" font-family="monospace">CLIENTS</text>
      <text x="12" y="170" font-size="11" fill="#888" font-family="monospace">GATEWAY</text>
      <text x="12" y="260" font-size="11" fill="#888" font-family="monospace">SERVICES</text>
      <text x="12" y="370" font-size="11" fill="#888" font-family="monospace">DATA</text>

      <!-- CLIENT LAYER -->
      <rect x="80" y="30" width="110" height="52" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="135" y="52" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">💻 Desktop</text>
      <text x="135" y="66" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Win/Mac/Linux</text>

      <rect x="220" y="30" width="110" height="52" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="275" y="52" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📱 Mobile</text>
      <text x="275" y="66" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">iOS/Android</text>

      <rect x="360" y="30" width="110" height="52" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="415" y="52" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🌐 Browser</text>
      <text x="415" y="66" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">WebRTC/Web</text>

      <rect x="500" y="30" width="120" height="52" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="560" y="52" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🔌 STUN/TURN</text>
      <text x="560" y="66" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">NAT Traversal</text>

      <rect x="650" y="30" width="110" height="52" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="705" y="52" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📺 Room Sys</text>
      <text x="705" y="66" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">H.323/SIP</text>

      <!-- GATEWAY LAYER -->
      <rect x="140" y="140" width="140" height="52" rx="8" fill="#1a2d20" stroke="#4ade80" stroke-width="1.5"/>
      <text x="210" y="162" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🚪 API Gateway</text>
      <text x="210" y="176" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Auth/Rate Limit</text>

      <rect x="320" y="140" width="160" height="52" rx="8" fill="#1a2d20" stroke="#4ade80" stroke-width="1.5"/>
      <text x="400" y="162" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📡 Signaling (WS)</text>
      <text x="400" y="176" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">WebSocket / SFU</text>

      <rect x="520" y="140" width="160" height="52" rx="8" fill="#1a2d20" stroke="#4ade80" stroke-width="1.5"/>
      <text x="600" y="162" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🎬 Media Server</text>
      <text x="600" y="176" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">MRC / Mixer</text>

      <!-- SERVICES LAYER -->
      <rect x="60" y="230" width="110" height="52" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="115" y="252" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🗓 Meeting</text>
      <text x="115" y="266" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Control Svc</text>

      <rect x="195" y="230" width="110" height="52" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="250" y="252" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">💬 Chat Svc</text>
      <text x="250" y="266" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">In-meeting msg</text>

      <rect x="330" y="230" width="120" height="52" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="390" y="252" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">⏺ Recording</text>
      <text x="390" y="266" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Cloud Record</text>

      <rect x="475" y="230" width="120" height="52" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="535" y="252" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🖥 ScreenShare</text>
      <text x="535" y="266" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Share Svc</text>

      <rect x="620" y="230" width="120" height="52" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="680" y="252" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🎤 Webinar Svc</text>
      <text x="680" y="266" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Panelist/Q&amp;A</text>

      <!-- Kafka -->
      <rect x="770" y="230" width="100" height="52" rx="8" fill="#2d2a1a" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="820" y="252" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📨 Kafka</text>
      <text x="820" y="266" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Event Stream</text>

      <!-- DATA LAYER -->
      <rect x="60" y="360" width="110" height="52" rx="8" fill="#1a2040" stroke="#60a5fa" stroke-width="1.5"/>
      <text x="115" y="382" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🗄 MySQL</text>
      <text x="115" y="396" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Meetings/Users</text>

      <rect x="200" y="360" width="110" height="52" rx="8" fill="#2d1a1a" stroke="#f87171" stroke-width="1.5"/>
      <text x="255" y="382" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">⚡ Redis</text>
      <text x="255" y="396" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Active/Roster</text>

      <rect x="340" y="360" width="110" height="52" rx="8" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="395" y="382" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">☁ S3</text>
      <text x="395" y="396" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Recordings</text>

      <rect x="480" y="360" width="130" height="52" rx="8" fill="#1a2040" stroke="#34d399" stroke-width="1.5"/>
      <text x="545" y="382" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🔍 Elasticsearch</text>
      <text x="545" y="396" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Search/Transcripts</text>

      <rect x="640" y="360" width="110" height="52" rx="8" fill="#1a2040" stroke="#60a5fa" stroke-width="1.5"/>
      <text x="695" y="382" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">🦁 ZooKeeper</text>
      <text x="695" y="396" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Coordinator</text>

      <rect x="780" y="360" width="100" height="52" rx="8" fill="#2d1f1a" stroke="#fb923c" stroke-width="1.5"/>
      <text x="830" y="382" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">📊 Monitor</text>
      <text x="830" y="396" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Datadog/OTel</text>

      <!-- Arrows: Client -> Gateway -->
      <line x1="135" y1="82" x2="180" y2="140" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="275" y1="82" x2="370" y2="140" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="415" y1="82" x2="410" y2="140" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="560" y1="82" x2="580" y2="140" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="705" y1="82" x2="650" y2="140" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Gateway -> Services -->
      <line x1="210" y1="192" x2="150" y2="230" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="210" y1="192" x2="260" y2="230" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="400" y1="192" x2="390" y2="230" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="600" y1="192" x2="535" y2="230" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="600" y1="192" x2="680" y2="230" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Services -> Kafka -->
      <line x1="390" y1="282" x2="770" y2="256" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="680" y1="282" x2="780" y2="268" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- Services -> Data -->
      <line x1="115" y1="282" x2="115" y2="360" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="250" y1="282" x2="255" y2="360" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="390" y1="282" x2="395" y2="360" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="535" y1="282" x2="545" y2="360" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="680" y1="282" x2="695" y2="360" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="820" y1="282" x2="830" y2="360" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
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
        <p>Zoom is a cloud-native video communications platform delivering high-quality, low-latency audio, video, and collaboration features to hundreds of millions of users simultaneously across heterogeneous network conditions and devices.</p>
        <strong>Scale Numbers (2024)</strong>
        <ul>
          <li>300 million+ daily meeting participants</li>
          <li>3.3 trillion+ meeting minutes per year</li>
          <li>Peak: 500,000+ concurrent meetings</li>
          <li>15 million+ cloud recordings/month</li>
          <li>&lt;150ms glass-to-glass latency target</li>
          <li>Data centers in 19 co-location regions globally</li>
        </ul>
        <strong>Core Challenges</strong>
        <ul>
          <li>Real-time media routing at planetary scale with sub-200ms latency</li>
          <li>Heterogeneous network conditions (NAT, firewalls, mobile data)</li>
          <li>Adaptive bitrate for varying bandwidth (56Kbps–10Mbps)</li>
          <li>End-to-end encryption while supporting server-side recording</li>
          <li>10x traffic spikes (COVID: 10→300M DAU in weeks)</li>
        </ul>
      </div>
      <div>
        <strong>Functional Requirements</strong>
        <ul>
          <li>Host &amp; join video/audio meetings with up to 1000 participants</li>
          <li>Screen sharing, whiteboard, and annotation</li>
          <li>In-meeting chat, reactions, polls, Q&amp;A</li>
          <li>Breakout rooms (up to 50 rooms per meeting)</li>
          <li>Cloud recording with transcription and storage</li>
          <li>Webinar mode (panelist vs attendee)</li>
          <li>Calendar integration (Google, Outlook)</li>
          <li>Virtual backgrounds and noise suppression</li>
        </ul>
        <strong>Non-Functional Requirements</strong>
        <table class="pattern-table">
          <tr class="pt-header"><td>Attribute</td><td>Target</td></tr>
          <tr class="pt-row"><td class="pt-name">Latency</td><td>&lt;150ms glass-to-glass (same region)</td></tr>
          <tr class="pt-row"><td class="pt-name">Availability</td><td>99.99% uptime (52 min/year downtime)</td></tr>
          <tr class="pt-row"><td class="pt-name">Scalability</td><td>10x surge capacity within 5 minutes</td></tr>
          <tr class="pt-row"><td class="pt-name">Video Quality</td><td>720p/1080p HD at 30fps nominal</td></tr>
          <tr class="pt-row"><td class="pt-name">Security</td><td>AES-256-GCM E2E encryption option</td></tr>
          <tr class="pt-row"><td class="pt-name">Packet Loss</td><td>&lt;5% with FEC/NACK recovery</td></tr>
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
      <tr class="pt-row"><td class="pt-name">Concurrent Meetings</td><td>300M DAU, avg 2 meetings/day, 45min each</td><td>300M × 2 × 45 / 1440 min/day</td><td>~18.75M concurrent participants</td></tr>
      <tr class="pt-row"><td class="pt-name">Video Bandwidth/participant</td><td>720p HD send + 3 receive streams</td><td>1.5Mbps up + 3×1Mbps down</td><td>4.5 Mbps per participant</td></tr>
      <tr class="pt-row"><td class="pt-name">Total Bandwidth</td><td>18.75M participants × 4.5Mbps</td><td>18.75M × 4.5Mbps</td><td>~84 Pbps aggregate (server-mediated)</td></tr>
      <tr class="pt-row"><td class="pt-name">Signaling Events/sec</td><td>500K meetings × 10 events/min/meeting</td><td>500K × 10 / 60</td><td>~83,000 signaling events/sec</td></tr>
      <tr class="pt-row"><td class="pt-name">Chat Messages</td><td>50% of participants send 2 msgs/meeting</td><td>18.75M × 0.5 × 2 / (45×60)</td><td>~6,944 chat msgs/sec</td></tr>
      <tr class="pt-row"><td class="pt-name">Cloud Recordings</td><td>10% meetings recorded, avg 45 min</td><td>500K × 0.1 × 45min × 500MB/hr</td><td>~188TB new storage/day</td></tr>
      <tr class="pt-row"><td class="pt-name">Media Server Count</td><td>Each server handles 100 concurrent meetings</td><td>500K meetings / 100</td><td>5,000 media servers globally</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis Memory</td><td>1KB per active participant session</td><td>18.75M × 1KB</td><td>~18.75 GB active session data</td></tr>
    </table>
  </div>
</div>

<!-- SECTION 3: APIs -->
<div class="ref-section">
  <div class="ref-title">3. API Design</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><td>Method</td><td>Endpoint</td><td>Description</td><td>Auth</td></tr>
      <tr class="pt-row"><td class="pt-name">POST</td><td>/v2/users/{userId}/meetings</td><td>Create a new meeting</td><td>JWT/OAuth2</td></tr>
      <tr class="pt-row"><td class="pt-name">GET</td><td>/v2/meetings/{meetingId}</td><td>Get meeting details</td><td>JWT</td></tr>
      <tr class="pt-row"><td class="pt-name">PATCH</td><td>/v2/meetings/{meetingId}</td><td>Update meeting settings</td><td>JWT</td></tr>
      <tr class="pt-row"><td class="pt-name">DELETE</td><td>/v2/meetings/{meetingId}</td><td>Delete/cancel meeting</td><td>JWT</td></tr>
      <tr class="pt-row"><td class="pt-name">POST</td><td>/v2/meetings/{meetingId}/join</td><td>Join meeting (returns SDP/ICE)</td><td>JWT + passcode</td></tr>
      <tr class="pt-row"><td class="pt-name">POST</td><td>/v2/meetings/{meetingId}/recordings</td><td>Start cloud recording</td><td>JWT (host only)</td></tr>
      <tr class="pt-row"><td class="pt-name">GET</td><td>/v2/meetings/{meetingId}/recordings</td><td>List recordings for a meeting</td><td>JWT</td></tr>
      <tr class="pt-row"><td class="pt-name">POST</td><td>/v2/meetings/{meetingId}/breakoutRooms</td><td>Create breakout rooms</td><td>JWT (host only)</td></tr>
      <tr class="pt-row"><td class="pt-name">GET</td><td>/v2/meetings/{meetingId}/participants</td><td>List active participants</td><td>JWT (host)</td></tr>
      <tr class="pt-row"><td class="pt-name">WS</td><td>wss://signal.zoom.us/ws</td><td>Signaling WebSocket (SDP/ICE)</td><td>JWT token in header</td></tr>
    </table>

    <strong>Create Meeting — Request/Response Example</strong>
    <div class="code-box">POST /v2/users/me/meetings
Authorization: Bearer &lt;JWT&gt;
Content-Type: application/json

{
  "topic": "Q4 Planning Sync",
  "type": 2,                          // Scheduled meeting
  "start_time": "2024-11-15T14:00:00Z",
  "duration": 60,
  "timezone": "America/New_York",
  "password": "abc123",
  "settings": {
    "host_video": true,
    "participant_video": true,
    "join_before_host": false,
    "mute_upon_entry": true,
    "waiting_room": true,
    "auto_recording": "cloud",
    "encryption_type": "enhanced_encryption"
  }
}

// Response 201 Created
{
  "id": 98765432100,
  "uuid": "4444AoFfERTC2REAOY==",
  "host_id": "user_id_xyz",
  "topic": "Q4 Planning Sync",
  "join_url": "https://zoom.us/j/98765432100?pwd=abc123",
  "start_url": "https://zoom.us/s/98765432100?zak=...",
  "status": "waiting",
  "created_at": "2024-10-01T10:00:00Z"
}</div>

    <strong>API Design Standards</strong>
    <ul>
      <li>REST over HTTPS with OAuth 2.0 and Server-to-Server JWT for integrations</li>
      <li>Rate limiting: 100 req/s per user, 30 req/s for meeting create, burst with token bucket</li>
      <li>Idempotency keys on POST endpoints to prevent duplicate meetings</li>
      <li>Webhook callbacks for meeting events (start, end, recording_ready, participant_joined)</li>
      <li>Pagination with next_page_token for list endpoints</li>
      <li>API versioning in URL path (/v2/); sunset policy 12 months after v3 release</li>
    </ul>
  </div>
</div>

<!-- SECTION 4: High-Level Architecture -->
<div class="ref-section">
  <div class="ref-title">4. High-Level Architecture</div>
  <div class="ref-body">
    <div class="code-box">
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                                │
│  [Desktop App]  [Mobile App]  [Browser WebRTC]  [Room Systems]     │
└──────────┬──────────────┬──────────────────┬────────────────────────┘
           │ HTTPS/WSS    │ WebRTC/UDP       │ H.323/SIP
           ▼              ▼                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      EDGE / GATEWAY LAYER                           │
│  [API Gateway (Kong)]  [CDN (CloudFront)]  [STUN/TURN Servers]    │
│  [Global Load Balancer] [DDoS Protection (Cloudflare)]             │
└──────────┬──────────────┬──────────────────────────────────────────┘
           │              │ UDP/RTP/SRTP
           ▼              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     CORE SERVICES LAYER                             │
│  [Signaling Svc]  [Meeting Control]  [Media Server (MRC)]          │
│  [Chat Svc]  [Recording Svc]  [Screen Share Svc]  [Webinar Svc]   │
│  [Breakout Room Svc]  [Auth Svc]  [Notification Svc]               │
└──────────┬──────────────────────────────────────────────────────────┘
           │ Events
           ▼
┌─────────────────────────────────────────────────────────────────────┐
│              MESSAGING / ASYNC LAYER (Kafka)                        │
│  Topics: meeting-events, recording-events, chat-events, analytics  │
└──────────┬──────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       DATA LAYER                                    │
│  [MySQL - Meetings/Users]  [Redis - Sessions/Roster]               │
│  [S3 - Recordings/Files]   [Elasticsearch - Search/Transcripts]    │
│  [ZooKeeper - Leader Election] [Prometheus/Grafana - Monitoring]   │
└─────────────────────────────────────────────────────────────────────┘</div>

    <div class="two-col">
      <div>
        <strong>Client Layer</strong>
        <ul>
          <li>Native clients (Electron on desktop) for optimal OS-level audio capture</li>
          <li>WebRTC in browsers via JSEP/SDP negotiation</li>
          <li>Custom Zoom protocol (optimized RTP over UDP) for native clients</li>
          <li>H.323/SIP gateway for legacy room systems</li>
        </ul>
        <strong>Edge/Gateway Layer</strong>
        <ul>
          <li>Kong API Gateway for REST traffic — handles auth, rate limiting, routing</li>
          <li>STUN servers discover public IP; TURN servers relay when P2P fails</li>
          <li>Anycast routing to nearest data center</li>
          <li>CloudFront CDN for static assets and recording delivery</li>
        </ul>
      </div>
      <div>
        <strong>Core Services</strong>
        <ul>
          <li>Signaling Service: WebSocket-based SDP/ICE exchange, roster management</li>
          <li>Media Server (MRC): Selective Forwarding Unit — routes media streams without decode</li>
          <li>Meeting Control: scheduling, participant permissions, host controls</li>
          <li>Recording Service: mixes streams, encodes to MP4, uploads to S3</li>
        </ul>
        <strong>Data Layer</strong>
        <ul>
          <li>MySQL: persistent data — meetings, users, recordings metadata</li>
          <li>Redis Cluster: ephemeral data — active meeting state, participant roster</li>
          <li>Elasticsearch: recording transcripts, meeting search, full-text</li>
          <li>ZooKeeper: media server election, distributed locks</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 5: Core Service — Media Server (MRC) -->
<div class="ref-section">
  <div class="ref-title">5. Core Service: Media Server (Multimedia Routed Conferencing)</div>
  <div class="ref-body">
    <p>The Media Server is Zoom's most critical component — it is a custom Selective Forwarding Unit (SFU) that routes real-time audio/video streams between participants without transcoding (unlike an MCU). This is the key architectural choice that enables Zoom to scale to 1000+ participants per meeting.</p>

    <div class="two-col">
      <div>
        <strong>SFU Architecture (vs MCU vs P2P)</strong>
        <ul>
          <li><strong>P2P:</strong> Each participant sends to every other — O(N²) connections, fails at 3+ participants</li>
          <li><strong>MCU (Multipoint Control Unit):</strong> Server decodes all streams, mixes into one, re-encodes — high CPU, latency, inflexible layouts</li>
          <li><strong>SFU (Zoom's choice):</strong> Server receives N streams, intelligently forwards subsets to each receiver — O(N) server connections, client handles rendering</li>
        </ul>

        <strong>Active Speaker Detection</strong>
        <ul>
          <li>VAD (Voice Activity Detection) runs client-side and server-side</li>
          <li>Server prioritizes forwarding the 3-4 most active audio speakers</li>
          <li>Ramp-up/ramp-down hysteresis (500ms) to avoid flickering</li>
          <li>Simulcast: clients send 3 quality layers (360p/720p/1080p)</li>
          <li>Server selects appropriate layer per receiver's bandwidth</li>
        </ul>
      </div>
      <div>
        <strong>Bandwidth Adaptation</strong>
        <ul>
          <li>REMB (Receiver Estimated Max Bitrate) feedback from receivers</li>
          <li>Transport-CC (Transport-Wide Congestion Control) for precise loss detection</li>
          <li>GCC (Google Congestion Control) algorithm adapted for Zoom's protocol</li>
          <li>FEC (Forward Error Correction) adds ~20% overhead for packet loss recovery</li>
          <li>NACK (Negative ACK) for retransmission requests on critical frames</li>
        </ul>

        <strong>Media Server Internals</strong>
        <div class="code-box">Per Media Server Node:
- 96 vCPU / 256GB RAM
- 10GbE NIC (bonded x2 = 20Gbps)
- Handles: ~100 concurrent meetings
  or ~1000 concurrent participants
- Protocol: Custom SRTP over UDP
  (not standard WebRTC for native clients)
- Packet processing: DPDK kernel bypass
  for microsecond-level forwarding
- Keyframe injection: forces I-frames
  on new participant join</div>
      </div>
    </div>

    <strong>Media Routing Flow</strong>
    <div class="flow-box">
      <div class="flow-step">Participant A encodes video at 3 simulcast layers (360p/720p/1080p) and sends SRTP packets to Media Server over UDP</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Media Server receives RTP, extracts SSRC, looks up participant roster in Redis to find subscribers</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">For each subscriber, Media Server selects appropriate simulcast layer based on subscriber's REMB feedback and their current bandwidth estimate</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Server performs RTP header rewriting (SSRC remapping) and forwards selected layer packets to each subscriber</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">No decoding/re-encoding — pure packet forwarding at kernel bypass speed (&lt;500 microseconds processing per packet)</div>
    </div>
  </div>
</div>

<!-- SECTION 6: Core Service — Signaling Service -->
<div class="ref-section">
  <div class="ref-title">6. Core Service: Signaling Service</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Responsibilities</strong>
        <ul>
          <li>WebSocket-based persistent connection per participant</li>
          <li>SDP (Session Description Protocol) offer/answer exchange</li>
          <li>ICE (Interactive Connectivity Establishment) candidate exchange</li>
          <li>Meeting roster management (join/leave events)</li>
          <li>Host control signaling (mute, kick, waiting room admission)</li>
          <li>Screen share negotiation (separate SSRC stream setup)</li>
          <li>Breakout room assignment and transition signaling</li>
        </ul>

        <strong>Connection Lifecycle</strong>
        <div class="code-box">1. Client connects: WSS to nearest signaling node
2. Auth: JWT token validated, meeting passcode checked
3. Waiting room: held until host admits
4. SDP Offer sent to signaling server
5. Server allocates media server slot
6. SDP Answer returned with media server IP:port
7. ICE candidates exchanged (STUN probe, TURN fallback)
8. DTLS handshake → SRTP keys established
9. Media flows on UDP to media server
10. On disconnect: roster updated, Kafka event emitted</div>
      </div>
      <div>
        <strong>Scalability Design</strong>
        <ul>
          <li>Each signaling node handles 50,000 concurrent WebSocket connections</li>
          <li>Nodes are stateless — session state stored in Redis cluster</li>
          <li>Consistent hashing routes same meeting to same signaling pod (affinity)</li>
          <li>Horizontal auto-scaling: Kubernetes HPA on CPU + connection count</li>
          <li>Heartbeat: client pings every 10s, server closes connection after 30s silence</li>
        </ul>

        <strong>Signaling Message Format</strong>
        <div class="code-box">// Joining a meeting — client sends:
{
  "type": "join_meeting",
  "meetingId": "98765432100",
  "participantId": "p_abc123",
  "sdpOffer": "v=0\r\no=- 4611...",
  "capabilities": {
    "simulcast": true,
    "fec": true,
    "dtx": true,      // Discontinuous transmission
    "maxRecvBitrate": 3000000
  }
}

// Server responds:
{
  "type": "join_response",
  "mediaServerIp": "192.168.1.100",
  "mediaServerPort": 8801,
  "sdpAnswer": "v=0\r\no=- 4612...",
  "iceCandidates": [...],
  "participantRoster": [...]
}</div>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 7: Core Service — Recording Service -->
<div class="ref-section">
  <div class="ref-title">7. Core Service: Cloud Recording Service</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Architecture Overview</strong>
        <p>Cloud recording captures audio/video streams from the media server, mixes them into a single MP4 file, generates transcripts using ASR (Automatic Speech Recognition), and stores them in S3 with metadata in MySQL.</p>

        <strong>Recording Pipeline</strong>
        <div class="flow-box">
          <div class="flow-step">Host starts recording → Recording Service receives Kafka event</div>
          <div class="flow-arrow">↓</div>
          <div class="flow-step">Recording pod subscribes to media server's RTP streams for that meeting</div>
          <div class="flow-arrow">↓</div>
          <div class="flow-step">Decode streams (FFmpeg) → Mix audio (Opus→PCM→mix→AAC), composite video (layout engine)</div>
          <div class="flow-arrow">↓</div>
          <div class="flow-step">Encode final MP4 (H.264 + AAC) — 720p default, 1080p premium</div>
          <div class="flow-arrow">↓</div>
          <div class="flow-step">Upload to S3 in multipart chunks (5MB parts) with SSE-KMS encryption</div>
          <div class="flow-arrow">↓</div>
          <div class="flow-step">ASR pipeline (AWS Transcribe / internal model) generates VTT transcript</div>
          <div class="flow-arrow">↓</div>
          <div class="flow-step">Metadata written to MySQL, transcript indexed in Elasticsearch, notification sent to host</div>
        </div>
      </div>
      <div>
        <strong>Active Speaker Layout</strong>
        <ul>
          <li>Default: Gallery view (grid of all participants, resized)</li>
          <li>Active speaker view: Dominant speaker fills 80% of frame</li>
          <li>Shared screen: Screen takes 80%, speaker thumbnails on side</li>
          <li>Layout switches tracked every 200ms, smooth fade transitions</li>
        </ul>

        <strong>Storage Optimization</strong>
        <ul>
          <li>Auto-delete after 30 days unless plan includes extended storage</li>
          <li>S3 Intelligent-Tiering: hot → standard, warm → IA, cold → Glacier</li>
          <li>Deduplication: meetings with same content hash skip re-encoding</li>
          <li>Per-speaker separate audio tracks available for premium accounts</li>
          <li>Compression: average 500MB/hr for 720p mixed recording</li>
        </ul>

        <strong>Fault Tolerance</strong>
        <ul>
          <li>Recording pods are ephemeral — crash recovery resumes from last RTP sequence</li>
          <li>Partial recordings salvaged if meeting ends mid-record</li>
          <li>S3 multipart upload allows resume after failure</li>
          <li>Minimum 2 recording replicas per large meeting (&gt;100 participants)</li>
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
        <strong>meetings table (MySQL)</strong>
        <div class="code-box">CREATE TABLE meetings (
  id           BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  uuid         VARCHAR(36) UNIQUE NOT NULL,
  host_user_id VARCHAR(36) NOT NULL,
  topic        VARCHAR(200),
  meeting_type TINYINT,          -- 1=instant, 2=scheduled, 3=recurring
  start_time   DATETIME,
  duration     SMALLINT,         -- minutes
  password     VARCHAR(32),
  status       TINYINT DEFAULT 0, -- 0=waiting, 1=active, 2=ended
  settings     JSON,
  created_at   DATETIME DEFAULT NOW(),
  updated_at   DATETIME ON UPDATE NOW(),
  INDEX idx_host (host_user_id),
  INDEX idx_start_time (start_time),
  INDEX idx_status (status)
);</div>

        <strong>participants table (MySQL)</strong>
        <div class="code-box">CREATE TABLE participants (
  id              BIGINT UNSIGNED PRIMARY KEY,
  meeting_id      BIGINT UNSIGNED,
  user_id         VARCHAR(36),
  display_name    VARCHAR(100),
  join_time       DATETIME,
  leave_time      DATETIME,
  device_type     VARCHAR(20),
  audio_quality   FLOAT,
  video_quality   FLOAT,
  network_type    VARCHAR(20),
  is_host         BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (meeting_id) REFERENCES meetings(id),
  INDEX idx_meeting (meeting_id),
  INDEX idx_user_meetings (user_id, join_time)
);</div>
      </div>
      <div>
        <strong>recordings table (MySQL)</strong>
        <div class="code-box">CREATE TABLE recordings (
  id            BIGINT UNSIGNED PRIMARY KEY,
  meeting_id    BIGINT UNSIGNED NOT NULL,
  file_type     VARCHAR(10),     -- MP4, M4A, TRANSCRIPT
  file_size     BIGINT,
  s3_bucket     VARCHAR(100),
  s3_key        VARCHAR(500),
  duration      INT,             -- seconds
  status        TINYINT,         -- 0=processing, 1=ready, 2=failed
  download_url  VARCHAR(1000),
  transcript_id VARCHAR(36),
  created_at    DATETIME,
  expires_at    DATETIME,
  FOREIGN KEY (meeting_id) REFERENCES meetings(id),
  INDEX idx_meeting_recordings (meeting_id),
  INDEX idx_expires (expires_at)
);</div>

        <strong>Redis Data Structures</strong>
        <div class="code-box">// Active meeting state
HASH meeting:{meetingId}:state
  hostId, mediaServerId,
  startTime, participantCount

// Participant roster (sorted by join time)
ZSET meeting:{meetingId}:roster
  score=joinTimestamp, member=participantId

// Participant details
HASH participant:{participantId}
  displayName, audioMuted, videoOff,
  handRaised, breakoutRoomId, ssrc

// Media server load
ZSET mediaServers:load
  score=activeMeetings, member=serverId

// TTL: meeting state expires 1hr after end</div>
      </div>
    </div>

    <strong>Sharding Strategy</strong>
    <ul>
      <li>MySQL sharded by meeting_id (hash sharding, 64 shards initially)</li>
      <li>User data in separate MySQL cluster sharded by user_id</li>
      <li>Redis Cluster: 16,384 slots, hash tag {meetingId} for co-location of related keys</li>
      <li>Elasticsearch indices partitioned by date (monthly) and region</li>
    </ul>
  </div>
</div>

<!-- SECTION 9: Data Flow -->
<div class="ref-section">
  <div class="ref-title">9. Data Flow — Key Scenarios</div>
  <div class="ref-body">
    <strong>Scenario 1: Participant Joins a Meeting</strong>
    <div class="flow-box">
      <div class="flow-step">1. User clicks "Join" — client sends POST /v2/meetings/{id}/join with JWT + passcode to API Gateway</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">2. API Gateway validates JWT, forwards to Meeting Control Service which checks meeting status in MySQL and waiting room setting</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">3. Client establishes WebSocket to Signaling Service (nearest region via Anycast DNS)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">4. STUN binding request reveals public IP; if symmetric NAT detected, TURN relay allocated</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">5. Signaling Service selects least-loaded Media Server (via ZooKeeper-registered list + Redis load scores)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">6. SDP offer/answer exchanged. Participant added to Redis roster ZSET. SRTP keys established via DTLS</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">7. Media Server begins forwarding active speaker streams to new participant. Participant's streams start flowing to others</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">8. Kafka event "participant_joined" published → downstream consumers update analytics, billing counters</div>
    </div>

    <strong>Scenario 2: Screen Share Start</strong>
    <div class="flow-box">
      <div class="flow-step">1. Host clicks "Share Screen" — OS captures display via platform API (Windows: DXGI, Mac: ScreenCaptureKit)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">2. Client notifies Signaling Service of new SSRC (screen share stream) via WebSocket message</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">3. Signaling broadcasts "screen_share_started" to all participants — they send "subscribe" back</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">4. Screen share stream encoded at higher bitrate (2-4Mbps), prioritized over camera video (content-type: application)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">5. Media Server forwards screen share stream to all subscribers; client UI switches to screen-share layout</div>
    </div>

    <strong>Scenario 3: Cloud Recording Delivery</strong>
    <div class="flow-box">
      <div class="flow-step">1. Meeting ends → Recording Service finishes MP4 encoding, uploads to S3 with multipart upload</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">2. ASR service processes audio track asynchronously (5-10 min for 1hr meeting)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">3. Recording metadata + transcript saved to MySQL, transcript indexed in Elasticsearch</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">4. Host receives email with pre-signed S3 URL (7-day expiry) and in-app notification</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">5. Video player fetches recording via CloudFront CDN; adaptive HLS streaming for large files</div>
    </div>
  </div>
</div>

<!-- SECTION 10: Caching Strategy -->
<div class="ref-section">
  <div class="ref-title">10. Caching Strategy</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><td>Cache Layer</td><td>What is Cached</td><td>TTL</td><td>Strategy</td><td>Eviction</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis (Meeting State)</td><td>Active meeting roster, participant status, host controls</td><td>Session + 1hr grace</td><td>Write-through on every state change</td><td>Explicit delete on meeting end</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis (Media Server Registry)</td><td>Available media servers, their load scores, region mapping</td><td>30 seconds</td><td>ZooKeeper watch → Redis update</td><td>TTL-based with ZooKeeper heartbeat</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis (User Sessions)</td><td>Authenticated user JWT metadata, plan type, feature flags</td><td>1 hour (sliding)</td><td>Cache-aside, populate on auth</td><td>LRU + TTL</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis (Rate Limiting)</td><td>API request counts per user/IP using sliding window</td><td>60 seconds</td><td>Increment-and-expire (atomic INCR)</td><td>TTL-based</td></tr>
      <tr class="pt-row"><td class="pt-name">CloudFront CDN</td><td>Recording MP4/HLS segments, client app static assets</td><td>24hrs (recordings), 7d (assets)</td><td>Origin pull; S3 as origin</td><td>Cache-Control headers, explicit invalidation</td></tr>
      <tr class="pt-row"><td class="pt-name">Local (Client-side)</td><td>Meeting settings, contact list, recent meetings for offline</td><td>5 minutes for live data</td><td>SQLite local cache with background sync</td><td>LRU per entity type</td></tr>
      <tr class="pt-row"><td class="pt-name">Application (In-Process)</td><td>Feature flags, config values, meeting type defaults</td><td>5 minutes</td><td>Preloaded at startup, background refresh</td><td>Full reload on TTL expiry</td></tr>
    </table>

    <div class="tip-box">
      <strong>Key Insight:</strong> Redis is the single source of truth for ALL active meeting state. MySQL stores only historical/persistent data. This means Redis must be highly available — deploy as Redis Cluster (3 master + 3 replica nodes per region) with Redis Sentinel for automatic failover under 30 seconds.
    </div>
  </div>
</div>

<!-- SECTION 11: Message Queue / Event Streaming -->
<div class="ref-section">
  <div class="ref-title">11. Message Queue / Event Streaming</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Why Kafka over SQS/RabbitMQ</strong>
        <ul>
          <li>Log compaction enables replay for analytics pipelines</li>
          <li>Consumer groups allow multiple independent consumers (billing, analytics, audit)</li>
          <li>Retention: 7 days allows reprocessing failed consumers</li>
          <li>Throughput: 83K events/sec signaling alone — Kafka handles millions/sec</li>
          <li>Exactly-once semantics for billing events (critical for revenue accuracy)</li>
        </ul>

        <strong>Topic Design</strong>
        <table class="pattern-table">
          <tr class="pt-header"><td>Topic</td><td>Partitions</td><td>Key</td></tr>
          <tr class="pt-row"><td class="pt-name">meeting-lifecycle</td><td>128</td><td>meetingId</td></tr>
          <tr class="pt-row"><td class="pt-name">participant-events</td><td>256</td><td>meetingId</td></tr>
          <tr class="pt-row"><td class="pt-name">recording-events</td><td>64</td><td>recordingId</td></tr>
          <tr class="pt-row"><td class="pt-name">chat-messages</td><td>128</td><td>meetingId</td></tr>
          <tr class="pt-row"><td class="pt-name">media-quality-metrics</td><td>512</td><td>participantId</td></tr>
          <tr class="pt-row"><td class="pt-name">billing-events</td><td>32</td><td>accountId</td></tr>
          <tr class="pt-row"><td class="pt-name">audit-log</td><td>64</td><td>userId</td></tr>
        </table>
      </div>
      <div>
        <strong>Consumer Groups</strong>
        <ul>
          <li><strong>analytics-consumer:</strong> Processes meeting-lifecycle + participant-events → writes to ClickHouse data warehouse</li>
          <li><strong>billing-consumer:</strong> Processes billing-events with exactly-once semantics → updates Stripe/billing DB</li>
          <li><strong>notification-consumer:</strong> Processes meeting-lifecycle → sends email/push for recording ready, meeting ended</li>
          <li><strong>search-indexer:</strong> Processes chat-messages + recording-events → indexes to Elasticsearch</li>
          <li><strong>compliance-consumer:</strong> Processes audit-log → WORM storage for regulated customers</li>
        </ul>

        <strong>Event Schema (Avro)</strong>
        <div class="code-box">{
  "type": "record",
  "name": "ParticipantEvent",
  "fields": [
    {"name": "eventType", "type": "string"},
    {"name": "meetingId", "type": "long"},
    {"name": "participantId", "type": "string"},
    {"name": "timestamp", "type": "long"},
    {"name": "audioQuality", "type": "float"},
    {"name": "videoQuality", "type": "float"},
    {"name": "networkType", "type": "string"},
    {"name": "region", "type": "string"}
  ]
}</div>
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
        <strong>Protocol Stack Choices</strong>
        <table class="pattern-table">
          <tr class="pt-header"><td>Channel</td><td>Protocol</td><td>Why</td></tr>
          <tr class="pt-row"><td class="pt-name">Video/Audio Media</td><td>SRTP over UDP</td><td>Low latency; TCP head-of-line blocking kills media; custom UDP handles loss gracefully with FEC</td></tr>
          <tr class="pt-row"><td class="pt-name">Signaling</td><td>WebSocket (WSS)</td><td>Bi-directional, persistent — enables server push for roster updates, host controls, reactions</td></tr>
          <tr class="pt-row"><td class="pt-name">Chat Messages</td><td>WebSocket</td><td>Reuses signaling channel — no extra connection overhead; messages piggyback on existing WS</td></tr>
          <tr class="pt-row"><td class="pt-name">Recording Status</td><td>Server-Sent Events</td><td>One-way push from server (recording progress); SSE simpler than WS for unidirectional</td></tr>
          <tr class="pt-row"><td class="pt-name">REST API</td><td>HTTPS/HTTP2</td><td>Meeting scheduling, user management — request-response, HTTP2 multiplexing reduces overhead</td></tr>
        </table>
      </div>
      <div>
        <strong>WebSocket Signaling at Scale</strong>
        <ul>
          <li>Signaling node capacity: 50,000 concurrent WSS connections per pod</li>
          <li>Connection affinity: consistent hash on meetingId routes all participants in same meeting to same signaling pod cluster</li>
          <li>Message fan-out: broadcast to 1000-participant meeting is 999 WS sends — done async via goroutine pool</li>
          <li>Backpressure: if participant's WS send buffer fills (slow client), older roster updates are coalesced before newer send</li>
        </ul>

        <strong>Fallback Mechanisms</strong>
        <ul>
          <li>UDP blocked by firewall → fall back to TCP port 443 TURN relay</li>
          <li>STUN fails → force TURN relay (adds ~40ms RTT but guarantees connectivity)</li>
          <li>WebSocket fails → long-polling SSE fallback for signaling (degrades gracefully)</li>
          <li>Media server unreachable → reconnect to backup in &lt;3 seconds (ICE restart)</li>
        </ul>
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
        <strong>ACID vs BASE by Data Type</strong>
        <table class="pattern-table">
          <tr class="pt-header"><td>Data</td><td>Consistency Model</td><td>Rationale</td></tr>
          <tr class="pt-row"><td class="pt-name">Meeting creation</td><td>ACID (MySQL)</td><td>Billing-critical; must not double-bill or lose meeting record</td></tr>
          <tr class="pt-row"><td class="pt-name">Active participant roster</td><td>Eventual (Redis)</td><td>Slight delay in roster update is acceptable; availability matters more</td></tr>
          <tr class="pt-row"><td class="pt-name">Chat messages</td><td>Causal consistency</td><td>Messages must appear in send order per sender; global ordering not required</td></tr>
          <tr class="pt-row"><td class="pt-name">Billing events</td><td>Exactly-once (Kafka)</td><td>Idempotency keys + transactional Kafka producers prevent double-charging</td></tr>
          <tr class="pt-row"><td class="pt-name">Recording metadata</td><td>ACID (MySQL)</td><td>Recording status transitions must be consistent (processing → ready → expired)</td></tr>
        </table>
      </div>
      <div>
        <strong>Distributed Locking</strong>
        <ul>
          <li>ZooKeeper ephemeral nodes for media server leader election</li>
          <li>Redis Redlock for short-lived locks (&lt;30s): e.g., "only one recording job per meeting"</li>
          <li>Optimistic locking in MySQL (version column) for meeting settings updates</li>
        </ul>

        <strong>Idempotency Patterns</strong>
        <ul>
          <li>Meeting creation: idempotency key (UUID) in request header — server returns existing meeting if same key resubmitted within 24hrs</li>
          <li>Recording start: check Redis for existing recording job before creating new one (SET NX)</li>
          <li>Kafka consumers: each consumer stores last processed offset in Zookeeper; on restart, re-reads from last committed offset only</li>
          <li>Participant join: if same participant rejoins within 5 minutes, treated as reconnect not new participant (same roster entry updated)</li>
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
        <strong>Elasticsearch Use Cases</strong>
        <ul>
          <li>Recording transcript search: full-text search across meeting recordings</li>
          <li>Meeting search: find past meetings by topic, participant, date range</li>
          <li>Chat history search: search in-meeting chat messages</li>
          <li>User directory search: find contacts by name/email for scheduling</li>
          <li>Smart Chapters: AI-generated topics from transcript indexed for navigation</li>
        </ul>

        <strong>Index Design</strong>
        <div class="code-box">// Transcript index mapping
{
  "mappings": {
    "properties": {
      "meetingId": {"type": "keyword"},
      "accountId": {"type": "keyword"},
      "speakerName": {"type": "keyword"},
      "startTime": {"type": "float"},
      "endTime": {"type": "float"},
      "text": {
        "type": "text",
        "analyzer": "english",
        "fields": {
          "keyword": {"type": "keyword"}
        }
      },
      "confidence": {"type": "float"}
    }
  }
}</div>
      </div>
      <div>
        <strong>Indexing Pipeline</strong>
        <ul>
          <li>Kafka consumer reads recording-events, triggers ASR pipeline</li>
          <li>ASR output (JSON with word-level timestamps) bulk-indexed into Elasticsearch</li>
          <li>Index sharded by accountId → tenant isolation and faster per-account queries</li>
          <li>Monthly index rotation with aliases for zero-downtime reindexing</li>
          <li>Replication factor: 2 (primary + 1 replica per shard)</li>
        </ul>

        <strong>Query Patterns</strong>
        <div class="code-box">// Search within meeting transcripts
GET /transcripts/_search
{
  "query": {
    "bool": {
      "must": [
        {"match": {"text": "product roadmap"}},
        {"term": {"accountId": "acc_xyz"}}
      ],
      "filter": [
        {"range": {"startTime": {"gte": "2024-01-01"}}}
      ]
    }
  },
  "highlight": {
    "fields": {"text": {}}
  }
}</div>
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
        <strong>CDN-Served Content</strong>
        <ul>
          <li>Desktop/mobile app installers and update packages</li>
          <li>Cloud recordings (MP4, M4A, transcript VTT)</li>
          <li>Virtual backgrounds (pre-made images/videos)</li>
          <li>Static web assets (JavaScript bundles, CSS, images)</li>
          <li>HLS/DASH segments for recording playback (video.js player)</li>
        </ul>

        <strong>Recording Delivery Architecture</strong>
        <div class="code-box">Recording Playback Flow:
1. User requests recording → API returns
   pre-signed CloudFront URL (7-day TTL)
2. First request: CloudFront MISS →
   origin fetch from S3
3. MP4 segmented into HLS chunks at S3
   (Lambda@Edge on first access)
4. Subsequent requests: CloudFront HIT
   (Edge cache, nearest PoP)
5. Adaptive bitrate: 3 quality levels
   (480p/720p/1080p HLS manifests)
6. CDN serves appropriate quality based
   on viewer's bandwidth estimation</div>
      </div>
      <div>
        <strong>CDN Configuration</strong>
        <ul>
          <li>Provider: AWS CloudFront with 450+ PoPs globally</li>
          <li>Cache-Control: recordings set to max-age=86400 (24 hrs), app bundles 7 days</li>
          <li>Cache invalidation: triggered via CloudFront API when recording deleted/expired</li>
          <li>Signed URLs with expiry for private recordings (prevent unauthorized sharing)</li>
          <li>Geo-restriction: compliance markets (GDPR) served from regional CDN PoPs only</li>
        </ul>

        <strong>Real-time Media (NOT CDN)</strong>
        <ul>
          <li>Live media streams bypass CDN entirely — too dynamic for caching</li>
          <li>Zoom's own co-location network (19 data center regions) routes media</li>
          <li>Anycast BGP routing sends client to nearest Zoom PoP for signaling</li>
          <li>Media server selection optimizes for lowest RTT to participants</li>
        </ul>
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
          <li>OAuth 2.0 + PKCE for third-party app integrations</li>
          <li>JWT (RS256) for API requests, 1-hour expiry with refresh tokens</li>
          <li>SSO via SAML 2.0 for enterprise customers (Okta, Azure AD)</li>
          <li>Meeting passcode: bcrypt-hashed, required for external participants</li>
          <li>Waiting room: host must explicitly admit each participant</li>
          <li>Role-based: host, co-host, participant, attendee (webinar) with different permission sets</li>
        </ul>

        <strong>Encryption</strong>
        <ul>
          <li>Transport: TLS 1.3 for all REST/WebSocket; SRTP (AES-256-GCM) for media</li>
          <li>Enhanced E2EE: optional end-to-end encryption using per-meeting symmetric key distributed via asymmetric crypto (no server decryption possible)</li>
          <li>Recording at rest: S3 SSE-KMS with customer-managed keys for enterprise</li>
          <li>DTLS for SRTP key negotiation (RFC 5764)</li>
        </ul>
      </div>
      <div>
        <strong>Rate Limiting &amp; Abuse Prevention</strong>
        <ul>
          <li>API: 100 req/s per user, 30 req/s for meeting creation (token bucket via Redis)</li>
          <li>Join attempts: 5 wrong passcode attempts → 60-second lockout</li>
          <li>Zoom-bombing prevention: waiting room + passcode mandatory since 2020</li>
          <li>DDoS mitigation: Cloudflare in front of API Gateway (L3/L4/L7 protection)</li>
          <li>Anomaly detection: ML model flags unusual join patterns (bot detection)</li>
        </ul>

        <strong>Compliance &amp; Privacy</strong>
        <ul>
          <li>SOC 2 Type II, ISO 27001, HIPAA BAA available, FedRAMP Moderate</li>
          <li>GDPR: data residency controls, right-to-erasure pipeline (30-day SLA)</li>
          <li>Data minimization: meeting content not analyzed for advertising</li>
          <li>Audit logs: all host actions logged with 7-year retention for enterprise</li>
          <li>CSAM scanning: all recordings scanned using PhotoDNA hash matching</li>
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
        <strong>Horizontal Scaling</strong>
        <ul>
          <li>All services run as stateless pods in Kubernetes — scale by adding pods</li>
          <li>Media servers: stateful but isolated per meeting — scale out with new nodes, no state migration needed</li>
          <li>Signaling: stateless (session state in Redis) — HPA on connection count metric</li>
          <li>Auto-scaling triggers within 90 seconds of spike detection</li>
          <li>Pre-warming: predictive scaling based on calendar integrations (meeting starts at 9am Monday → pre-warm at 8:55am)</li>
        </ul>

        <strong>Database Sharding</strong>
        <ul>
          <li>MySQL: 64 shards, hash(meetingId % 64), future-proofed with virtual shards</li>
          <li>Shard migration: online resharding via dual-write + cutover (no downtime)</li>
          <li>Read replicas: 3 read replicas per MySQL shard for report queries</li>
          <li>Redis Cluster: 16,384 hash slots across 6 masters (3 per region pair)</li>
        </ul>
      </div>
      <div>
        <strong>Load Balancing Strategy</strong>
        <ul>
          <li>Tier 1 (DNS): GeoDNS → nearest regional cluster (Cloudflare)</li>
          <li>Tier 2 (L4): AWS NLB for media server UDP traffic (static IPs)</li>
          <li>Tier 3 (L7): Kong API Gateway for REST traffic with health checks</li>
          <li>Media server selection: custom algorithm — minimize RTT to all participants (not just host)</li>
        </ul>

        <strong>Traffic Surge Handling (COVID-19 Lesson)</strong>
        <div class="code-box">Lessons from 10→300M DAU in 4 weeks:
1. Pre-bought cloud capacity commitments
   (AWS reserved instances, 3-yr terms)
2. Cloud bursting: 40% workload on-prem,
   60% cloud — burst to 100% cloud
3. Feature flagging: degraded mode
   - Disable virtual backgrounds at 80% cap
   - Reduce default video quality to 480p
   - Limit max participants to 300 at 90% cap
4. Queue admission: waiting room for
   meetings at capacity acts as backpressure</div>
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
          <li>Implemented via Resilience4j in Java microservices</li>
          <li>Recording Service: circuit opens if S3 upload fails &gt;50% in 60s window — falls back to local disk buffer</li>
          <li>Signaling → Media Server: circuit opens if media server RTT &gt;500ms — routes to backup server in secondary region</li>
          <li>MySQL: circuit opens on connection timeout — reads routed to replica, writes queued</li>
        </ul>

        <strong>Retry Strategy</strong>
        <ul>
          <li>Exponential backoff: initial 100ms, max 30s, jitter ±25%</li>
          <li>Max retries: 3 for API calls, 5 for Kafka producer sends</li>
          <li>Idempotency ensures safe retries without side effects</li>
          <li>Dead Letter Queue in Kafka for messages failing after 5 retries</li>
        </ul>

        <strong>Bulkhead Pattern</strong>
        <ul>
          <li>Separate thread pools per external dependency (MySQL, Redis, S3, Elasticsearch)</li>
          <li>Separate connection pools: recording pool isolated from API pool</li>
          <li>Resource limits per tenant: prevents noisy-neighbor (one large account can't exhaust shared recording capacity)</li>
        </ul>
      </div>
      <div>
        <strong>Media Path Resilience</strong>
        <div class="code-box">Media Server Failure Handling:
1. ZooKeeper monitors media server health
   via heartbeat (10s intervals)
2. On failure: ZooKeeper deletes ephemeral
   node within 30s
3. Signaling Service detects node removal,
   triggers ICE restart for affected meetings
4. Clients receive new media server
   assignment via WebSocket
5. Total reconnection time: &lt;5 seconds
   (client buffers 2s of audio to hide gap)
6. Active recording: transferred to
   backup recording pod with seq# continuity</div>

        <strong>Chaos Engineering</strong>
        <ul>
          <li>Monthly GameDays: inject media server failures in 1 region</li>
          <li>Network partition simulations: test split-brain handling in Redis Cluster</li>
          <li>Latency injection: simulate 300ms added latency on signaling path</li>
          <li>Tooling: Chaos Mesh on Kubernetes clusters</li>
          <li>SLO burn rate alerts trigger automatic rollback via Argo Rollouts</li>
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
        <strong>Metrics (Prometheus + Datadog)</strong>
        <ul>
          <li>Media quality: packet loss %, jitter (ms), RTT, MOS score per participant</li>
          <li>Meeting metrics: join success rate, meeting start latency, reconnection rate</li>
          <li>Infrastructure: CPU/memory/network per pod, media server throughput</li>
          <li>Business: active meetings, participants, recording jobs in flight</li>
          <li>Custom: Active Speaker changes per second, bandwidth utilization per meeting</li>
        </ul>

        <strong>Distributed Tracing (Jaeger/OpenTelemetry)</strong>
        <ul>
          <li>Trace IDs propagated from API Gateway through all microservices</li>
          <li>Critical path: join latency broken down by: DNS → TCP → TLS → Auth → SDP → ICE → Media</li>
          <li>P50/P95/P99 latency dashboards per service and per region</li>
          <li>Sampling rate: 100% for errors, 1% for normal traffic (cost optimization)</li>
        </ul>
      </div>
      <div>
        <strong>Logging (ELK Stack)</strong>
        <ul>
          <li>Structured JSON logs from all services to Elasticsearch via Fluentd</li>
          <li>Log levels: INFO for normal ops, WARN for degraded, ERROR for failures</li>
          <li>Correlation ID links logs across all services for a single participant join</li>
          <li>Retention: 30 days hot (Elasticsearch), 1 year cold (S3)</li>
        </ul>

        <strong>SLOs &amp; Alerting</strong>
        <table class="pattern-table">
          <tr class="pt-header"><td>SLI</td><td>SLO Target</td><td>Alert Threshold</td></tr>
          <tr class="pt-row"><td class="pt-name">Meeting Join Success</td><td>99.9%</td><td>&lt;99.5% over 5 min</td></tr>
          <tr class="pt-row"><td class="pt-name">Audio MOS Score</td><td>&gt;4.0 average</td><td>&lt;3.5 average over 10 min</td></tr>
          <tr class="pt-row"><td class="pt-name">Media Server RTT</td><td>&lt;150ms P95</td><td>&gt;250ms P95 over 5 min</td></tr>
          <tr class="pt-row"><td class="pt-name">Recording Upload</td><td>99.5% within 2x duration</td><td>Failure rate &gt;1% over 1hr</td></tr>
          <tr class="pt-row"><td class="pt-name">API Latency</td><td>&lt;200ms P95</td><td>&gt;500ms P95 over 5 min</td></tr>
        </table>
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
        <strong>Multi-Region Deployment</strong>
        <ul>
          <li>19 co-location regions (mix of AWS and owned data centers)</li>
          <li>Each region: 3 Availability Zones, fully independent</li>
          <li>Active-active across regions — any region can handle any meeting</li>
          <li>Data residency: US, EU, India regions isolated for compliance</li>
          <li>GeoDNS routes users to nearest healthy region</li>
        </ul>

        <strong>Kubernetes Architecture</strong>
        <ul>
          <li>EKS on AWS for cloud workloads, self-managed k8s on bare metal for media servers</li>
          <li>Namespaces per service: meeting, signaling, recording, chat</li>
          <li>Resource requests/limits strictly enforced — prevents noisy neighbor</li>
          <li>Node groups: compute-optimized (media), memory-optimized (Redis, Kafka), general (API)</li>
          <li>Cluster Autoscaler: provisions new EC2 nodes within 2 minutes</li>
        </ul>
      </div>
      <div>
        <strong>Deployment Strategies</strong>
        <ul>
          <li><strong>Blue-Green:</strong> Used for database migrations and major version upgrades — instant cutover with rollback</li>
          <li><strong>Canary:</strong> New signaling service version gets 5% of traffic → ramp to 100% over 1 hour if error rate stable</li>
          <li><strong>Rolling Update:</strong> Non-critical services (chat, notification) roll pod-by-pod</li>
          <li>Argo Rollouts manages canary traffic splitting with Prometheus metric gates</li>
          <li>Automatic rollback if error rate increases &gt;0.5% during canary</li>
        </ul>

        <strong>CI/CD Pipeline</strong>
        <div class="code-box">PR Merged → GitHub Actions:
1. Unit tests + integration tests (5 min)
2. Container build + push to ECR
3. SAST scan (SonarQube) + CVE scan (Trivy)
4. Deploy to staging (auto)
5. E2E tests — join/leave/recording flow
6. Manual approval gate for production
7. Canary deploy to 5% traffic (Argo)
8. Monitor SLOs for 30 minutes
9. Automatic full rollout or rollback</div>
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
        <strong>Media Path Optimizations</strong>
        <ul>
          <li><strong>DPDK (Data Plane Development Kit):</strong> Kernel bypass for RTP packet processing — reduces latency from ~100ms to ~5ms per packet</li>
          <li><strong>CPU affinity:</strong> Media processing threads pinned to specific CPU cores, NUMA-aware allocation</li>
          <li><strong>Zero-copy networking:</strong> DMA transfers for NIC buffers — avoid memcpy in hot path</li>
          <li><strong>Simulcast:</strong> Clients send 3 quality layers; server selects per-receiver — avoids transcoding entirely</li>
          <li><strong>SVC (Scalable Video Coding):</strong> Single encode with multiple spatial/temporal layers — 40% bandwidth reduction vs simulcast</li>
          <li><strong>Opus DTX:</strong> Discontinuous transmission during silence — 60% audio bandwidth savings</li>
        </ul>
      </div>
      <div>
        <strong>Application-Level Optimizations</strong>
        <ul>
          <li><strong>Connection pooling:</strong> MySQL — HikariCP with 20 connections/pod; Redis — Lettuce async pool</li>
          <li><strong>Batching:</strong> Roster updates coalesced into 100ms windows before broadcasting via WebSocket</li>
          <li><strong>Lazy loading:</strong> Participant video tiles only decoded when visible in viewport (gallery view virtualization)</li>
          <li><strong>Codec selection:</strong> VP9/H.265 for high-quality, VP8/H.264 for compatibility — auto-negotiated in SDP</li>
          <li><strong>Network-adaptive encoding:</strong> Adjust resolution + framerate every 2s based on REMB feedback</li>
          <li><strong>ICE optimization:</strong> Prefer STUN over TURN (direct path saves 40ms RTT typically); prune redundant candidates early</li>
          <li><strong>MySQL indexes:</strong> Covering index on (host_user_id, start_time, status) for dashboard query — eliminates full scan</li>
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
        <strong>Compute Cost Strategies</strong>
        <ul>
          <li><strong>Reserved Instances:</strong> 60% of baseline media server capacity on 3-year reserved (~60% savings vs on-demand)</li>
          <li><strong>Spot Instances:</strong> Batch workloads (ASR transcription, recording encoding) run on Spot (70% discount) with checkpointing</li>
          <li><strong>Right-sizing:</strong> Weekly analysis of pod resource utilization — overprovisioned pods downsized (Goldilocks VPA recommendations)</li>
          <li><strong>Bare metal for media:</strong> Own hardware for media servers in peak regions — 10x cheaper than cloud for sustained high-bandwidth workloads</li>
        </ul>
      </div>
      <div>
        <strong>Storage &amp; Bandwidth Cost Strategies</strong>
        <ul>
          <li><strong>S3 Intelligent-Tiering:</strong> Auto-moves recordings to cheaper tiers (Standard → IA → Glacier) based on access patterns — 40-70% storage cost reduction</li>
          <li><strong>Tiered retention:</strong> Free plan: 30 days, Pro: 1 year, Enterprise: unlimited — automatically expire/delete old recordings</li>
          <li><strong>Compression:</strong> H.265 encoding for archived recordings (50% smaller vs H.264) — converted in background batch job</li>
          <li><strong>CDN egress optimization:</strong> CloudFront regional edge caches reduce S3 egress costs by 80%</li>
          <li><strong>Data transfer:</strong> Intra-AZ traffic (free) preferred over inter-AZ (\$0.01/GB) — design services to co-locate media servers and recording pods in same AZ</li>
          <li><strong>Kafka compaction:</strong> Topic compaction for meeting-lifecycle reduces long-term storage cost for replayable topics</li>
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
          <tr class="pt-header"><td>Component</td><td>RTO</td><td>RPO</td></tr>
          <tr class="pt-row"><td class="pt-name">Active Meetings (media)</td><td>&lt;30 seconds</td><td>0 (no data loss — stream-based)</td></tr>
          <tr class="pt-row"><td class="pt-name">Signaling Service</td><td>&lt;60 seconds</td><td>0 (stateless, state in Redis)</td></tr>
          <tr class="pt-row"><td class="pt-name">MySQL (meetings DB)</td><td>&lt;5 minutes</td><td>&lt;1 second (sync replication)</td></tr>
          <tr class="pt-row"><td class="pt-name">Redis Cluster</td><td>&lt;30 seconds</td><td>~1 second (async replication)</td></tr>
          <tr class="pt-row"><td class="pt-name">Recording Storage</td><td>&lt;4 hours</td><td>0 (S3 multi-region replication)</td></tr>
          <tr class="pt-row"><td class="pt-name">API Layer</td><td>&lt;2 minutes</td><td>0 (stateless)</td></tr>
        </table>
      </div>
      <div>
        <strong>Backup Strategy</strong>
        <ul>
          <li>MySQL: continuous binlog streaming to S3 (Point-in-Time Recovery), daily snapshots retained 30 days</li>
          <li>Redis: RDB snapshots every 15 minutes + AOF (fsync every second) to S3</li>
          <li>S3 recordings: S3 Cross-Region Replication to secondary region (near-zero RPO)</li>
          <li>Kafka: topics replicated across 3 AZs, MirrorMaker 2 for cross-region replication</li>
        </ul>

        <strong>Failover Runbook</strong>
        <div class="code-box">Region Failure Scenario:
1. Health check failure detected (60s)
2. GeoDNS TTL: 30s → traffic reroutes
3. Secondary region receives traffic
4. Kafka MirrorMaker consumers resume
   from replicated offsets
5. New meetings: routed to healthy region
6. In-flight meetings: ICE restart
   → reconnect to backup media server
7. Recording jobs: resume from S3 partial
   multipart upload
8. Post-recovery: drain secondary,
   migrate back during low-traffic window</div>
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
        <strong>Monolith to Microservices Journey</strong>
        <p>Zoom started as a monolithic Java application. The evolution to microservices was driven by scale and independent deployment needs.</p>
        <ul>
          <li><strong>Phase 1 — Strangler Fig:</strong> Extract Recording Service first (high blast radius, independent team) — shadow deployed alongside monolith, traffic gradually shifted</li>
          <li><strong>Phase 2 — Database Per Service:</strong> Extract Meeting DB from shared schema — dual-write period ensures no data loss, then cutover</li>
          <li><strong>Phase 3 — Event-Driven:</strong> Replace direct service calls with Kafka events — Chat, Notification services decoupled</li>
          <li><strong>Phase 4 — Media Layer:</strong> Extract media routing from monolith to dedicated MRC cluster — hardest step, required protocol redesign</li>
        </ul>
      </div>
      <div>
        <strong>Data Migration Tactics</strong>
        <ul>
          <li>Feature flags gate new service traffic: 0% → 5% → 25% → 100%</li>
          <li>Read from old, write to both (dual-write) during migration window</li>
          <li>Backfill scripts run offline hours to avoid production load</li>
          <li>Schema changes: expand-contract pattern (add column, deploy, migrate data, drop old column)</li>
          <li>Rollback triggers: error rate &gt;1% auto-reverts feature flag to 0%</li>
        </ul>

        <strong>Protocol Migration (Flash → WebRTC)</strong>
        <div class="code-box">2015: Flash-based video (RTMP)
2017: WebRTC in browser clients
2019: Custom UDP protocol for native
2021: QUIC experiments for mobile
       (better multiplexing, 0-RTT resume)
Key lesson: Protocol negotiation in SDP
allows simultaneous old/new protocol
support — clients upgrade independently</div>
      </div>
    </div>
  </div>
</div>

<!-- SECTION 25: Interview Q&A -->
<div class="ref-section">
  <div class="ref-title">25. Interview Questions &amp; Answers</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><td>Question</td><td>Answer</td><td>Key Insight</td></tr>
      <tr class="pt-row"><td class="pt-name">Why SFU over P2P or MCU for video conferencing?</td><td>P2P breaks at 3+ participants (O(N²) uplinks). MCU decodes/re-encodes (CPU-intensive, adds 200-400ms latency). SFU forwards raw RTP packets with no decode — O(N) server connections, linear scaling, &lt;100ms server processing.</td><td>Zoom's architectural core advantage over older systems (Webex used MCU)</td></tr>
      <tr class="pt-row"><td class="pt-name">How does Zoom handle 1000-participant meetings?</td><td>Active speaker detection limits video streams to top 3-4 speakers. Simulcast: server selects quality layer per receiver based on bandwidth. Gallery view: only 25 visible tiles decoded on screen — rest are audio only. Server sends audio-only stream to off-screen participants.</td><td>Not all 1000 participants receive all 999 video streams</td></tr>
      <tr class="pt-row"><td class="pt-name">How do you handle unreliable networks with 10% packet loss?</td><td>FEC (Forward Error Correction) adds redundant packets (~20% overhead) so receiver reconstructs missing packets without retransmit. NACK for critical frames (I-frames). Adaptive bitrate: reduce to 360p/audio-only when loss detected. TURN relay if packet loss &gt;15% (network path change).</td><td>FEC vs NACK tradeoff: FEC adds overhead always, NACK adds round-trip delay</td></tr>
      <tr class="pt-row"><td class="pt-name">How do you design the waiting room at scale?</td><td>Waiting room state in Redis (SET waiting:{meetingId} participants). When host admits, Signaling Service moves participant from waiting queue to active roster via atomic Redis operation. Pub/sub notifies waiting client. Host sees waiting room list via WebSocket push.</td><td>Redis atomic operations prevent race conditions with simultaneous admits</td></tr>
      <tr class="pt-row"><td class="pt-name">How does end-to-end encryption work without breaking recording?</td><td>Standard mode: server holds encryption keys (can record/moderate). E2EE mode: per-meeting key generated by host's client, distributed to participants via asymmetric crypto. Server only sees encrypted ciphertext — cannot decrypt. E2EE disables cloud recording, PSTN, and some moderator features by design.</td><td>E2EE is a genuine tradeoff — not possible to have both E2EE and cloud recording</td></tr>
      <tr class="pt-row"><td class="pt-name">How would you scale the signaling service for 500K concurrent meetings?</td><td>Signaling is stateless — session state in Redis. Scale to 10 pods per 50K meetings (50K WS connections/pod). Consistent hashing routes same meeting to same pod cluster for efficiency. HPA triggers at 70% connection utilization. Redis Cluster holds all session state — surviving pod restarts transparently.</td><td>Stateless services + external state store = trivially scalable signaling</td></tr>
      <tr class="pt-row"><td class="pt-name">How does breakout room transition work under the hood?</td><td>Host assigns participants to rooms → Meeting Control Service updates Redis (breakout room assignments). Signaling broadcasts "move_to_breakout" event to affected participants. Each breakout room is a new mini-meeting on the same media server (separate SSRC group). Merge: "rejoin_main" signal moves all back to original meeting context.</td><td>Breakout rooms reuse existing media server infrastructure — no new media server needed</td></tr>
      <tr class="pt-row"><td class="pt-name">What happens when a media server crashes mid-meeting?</td><td>ZooKeeper detects missing heartbeat in 30s. Signaling receives ZooKeeper watch event, selects new media server. Sends ICE restart command to all affected participants via WebSocket. Client performs new ICE negotiation (2-3 RTTs) + DTLS handshake. Total gap: 3-5 seconds. Client-side jitter buffer hides 2s of audio gap.</td><td>ICE restart is the recovery mechanism — designed for exactly this failure mode</td></tr>
      <tr class="pt-row"><td class="pt-name">How do you prevent Zoom-bombing?</td><td>Defense in depth: (1) Waiting room — host must admit manually. (2) Passcode — bcrypt-hashed, required by default. (3) Meeting IDs: random 11-digit vs PMI (Personal Meeting IDs discouraged). (4) Lock meeting: host can lock after all expected participants join. (5) Remove &amp; report: removes and bans by device fingerprint + account.</td><td>Security usability tradeoff — waiting room adds friction but is the strongest control</td></tr>
      <tr class="pt-row"><td class="pt-name">How would you design the recording storage for cost efficiency?</td><td>Upload to S3 Standard immediately. After 7 days: S3 Intelligent-Tiering kicks in. After 30 days: IA tier. After 90 days: Glacier Instant Retrieval. Plan-based TTL: free tier deleted at 30 days (Lifecycle policy), Pro at 1yr, Enterprise: unlimited. H.265 transcoding job (Spot instances) runs at 3am on older recordings for 50% size reduction.</td><td>Most recordings are never rewatched after 7 days — S3 tiering dramatically reduces cost</td></tr>
    </table>
  </div>
</div>

<!-- SECTION 26: Trade-off Summary -->
<div class="ref-section">
  <div class="ref-title">26. Trade-off Summary</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Decision</div>
        <div class="dt-yes">Choice Made &amp; Benefits</div>
        <div class="dt-no">Tradeoffs &amp; Costs</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">SFU vs MCU</div>
        <div class="dt-yes">SFU: No transcoding, linear scaling, sub-100ms processing. Supports 1000+ participants. CPU cost grows linearly not quadratically.</div>
        <div class="dt-no">Client must handle composite layout rendering (CPU on user's device). No server-side layout control in E2EE mode.</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Custom UDP Protocol vs Standard WebRTC</div>
        <div class="dt-yes">Custom protocol: 20-40% lower latency on native clients. Finer control over congestion control, packet prioritization, FEC strategy.</div>
        <div class="dt-no">Cannot use standard WebRTC tooling. Browser clients must use standard WebRTC (two protocol paths to maintain). Higher engineering cost.</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">E2EE vs Cloud Recording</div>
        <div class="dt-yes">E2EE mode: true privacy — server cannot access content. Meets regulatory needs for confidential meetings.</div>
        <div class="dt-no">E2EE disables cloud recording, PSTN, real-time transcription, live streaming. Cannot moderate encrypted content (CSAM risk in E2EE).</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Redis for Active State vs MySQL</div>
        <div class="dt-yes">Redis: microsecond lookups for roster/presence, perfect for high-frequency updates (participant mute/unmute 10x/second). Memory-based.</div>
        <div class="dt-no">Redis is volatile — data lost on crash without RDB/AOF. Higher cost than MySQL for persistent data. Size-limited by RAM.</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Own Data Centers vs Pure Cloud</div>
        <div class="dt-yes">Own bare metal for media servers: 10x cheaper per Gbps vs AWS for sustained bandwidth. Full control over network path &amp; hardware optimization (DPDK).</div>
        <div class="dt-no">CapEx commitment, longer lead time to scale, ops complexity. Cloud used for burst capacity and non-media workloads.</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Kafka vs SQS/RabbitMQ</div>
        <div class="dt-yes">Kafka: log-based, replayable, multiple independent consumer groups, handles 83K events/sec signaling easily. Exactly-once for billing.</div>
        <div class="dt-no">Kafka is operationally complex (ZooKeeper dependency, partition management). SQS would be simpler for simple queuing needs.</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Simulcast vs SVC</div>
        <div class="dt-yes">Simulcast: simpler implementation, independent layer encoding, widely supported by encoders. Server forwards without decode.</div>
        <div class="dt-no">Simulcast wastes uplink bandwidth (3 full encodes). SVC is more efficient but complex encoder/decoder support. Zoom uses both selectively.</div>
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
        <li><strong>SFU is the architectural foundation:</strong> Selective Forwarding Unit enables planetary scale by routing raw RTP packets without transcoding. This single decision determines cost, latency, and scalability ceilings.</li>
        <li><strong>Real-time media requires custom protocols:</strong> Standard HTTP/WebSocket are insufficient for sub-150ms media. Custom UDP with FEC, NACK, simulcast, and adaptive bitrate is necessary. WebRTC is a floor, not a ceiling.</li>
        <li><strong>Separate active and persistent state:</strong> Redis for all live meeting state (sub-millisecond access), MySQL for all historical/billing data. Never let live meeting state wait on a database transaction.</li>
        <li><strong>Defense in depth for abuse prevention:</strong> Zoom-bombing taught the industry that video conferencing is a social engineering attack surface. Waiting rooms + passcodes + meeting locks are layered controls — one alone is insufficient.</li>
        <li><strong>Network heterogeneity is the hardest problem:</strong> STUN → TURN → relay fallback chain must handle symmetric NAT, corporate firewalls, mobile switching. Design for the worst network, not the best. 10% of users will always hit the fallback path.</li>
        <li><strong>Kafka enables decoupled scaling:</strong> Billing, analytics, notifications, and compliance consume the same event stream independently. Adding a new consumer doesn't touch the producer — clean separation of concerns at scale.</li>
        <li><strong>Pre-warming beats reactive scaling for media:</strong> Calendar integration enables predictive scaling before Monday 9am rushes. Reactive auto-scaling is too slow for media servers (2-minute node provisioning vs 30-second spike arrival). Combine both.</li>
      </ul>
    </div>
  </div>
</div>
`;
