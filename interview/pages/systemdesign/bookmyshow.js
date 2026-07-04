window.Pages['sd-bookmyshow'] = `
<div class="page-header">
  <div class="breadcrumb">System Design › <span>BookMyShow (Ticket Booking)</span></div>
  <h1>🎬 BookMyShow — Movie/Event Ticket Booking System Design</h1>
  <p>Seat-level inventory locking, flash-sale waiting rooms, and zero-double-booking guarantees under 100x traffic spikes</p>
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
      <text x="14" y="68" font-size="11" fill="#888" font-family="monospace">CLIENT</text>
      <text x="14" y="148" font-size="11" fill="#888" font-family="monospace">GATEWAY</text>
      <text x="14" y="248" font-size="11" fill="#888" font-family="monospace">SERVICES</text>
      <text x="14" y="368" font-size="11" fill="#888" font-family="monospace">DATA</text>

      <!-- Layer dividers -->
      <line x1="10" y1="80" x2="890" y2="80" stroke="#1e2733" stroke-width="1"/>
      <line x1="10" y1="165" x2="890" y2="165" stroke="#1e2733" stroke-width="1"/>
      <line x1="10" y1="280" x2="890" y2="280" stroke="#1e2733" stroke-width="1"/>

      <!-- CLIENT LAYER -->
      <!-- Web Browser -->
      <rect x="80" y="22" width="100" height="46" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="130" y="41" font-size="14" fill="#e2e8f0" font-family="monospace" text-anchor="middle">🌐</text>
      <text x="130" y="56" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">Web</text>
      <text x="130" y="65" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Browser</text>

      <!-- Mobile App -->
      <rect x="220" y="22" width="100" height="46" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="270" y="41" font-size="14" fill="#e2e8f0" font-family="monospace" text-anchor="middle">📱</text>
      <text x="270" y="56" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">Mobile</text>
      <text x="270" y="65" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">iOS / Android</text>

      <!-- CDN -->
      <rect x="380" y="22" width="120" height="46" rx="8" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="440" y="41" font-size="14" fill="#e2e8f0" font-family="monospace" text-anchor="middle">🌍</text>
      <text x="440" y="56" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">CDN</text>
      <text x="440" y="65" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Posters / Static</text>

      <!-- Waiting Room -->
      <rect x="560" y="22" width="120" height="46" rx="8" fill="#2d2a1a" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="620" y="41" font-size="14" fill="#e2e8f0" font-family="monospace" text-anchor="middle">⏳</text>
      <text x="620" y="56" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">Virtual Queue</text>
      <text x="620" y="65" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Waiting Room</text>

      <!-- GATEWAY LAYER -->
      <!-- API Gateway -->
      <rect x="280" y="100" width="160" height="46" rx="8" fill="#1a2d20" stroke="#4ade80" stroke-width="1.5"/>
      <text x="360" y="119" font-size="14" fill="#e2e8f0" font-family="monospace" text-anchor="middle">🔀</text>
      <text x="360" y="134" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">API Gateway</text>
      <text x="360" y="143" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Auth · Rate Limit · Route</text>

      <!-- Load Balancer -->
      <rect x="490" y="100" width="130" height="46" rx="8" fill="#1a2d20" stroke="#4ade80" stroke-width="1.5"/>
      <text x="555" y="119" font-size="14" fill="#e2e8f0" font-family="monospace" text-anchor="middle">⚖️</text>
      <text x="555" y="134" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">Load Balancer</text>
      <text x="555" y="143" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">L7 / Nginx</text>

      <!-- SERVICES LAYER -->
      <!-- Event/Show Service -->
      <rect x="30" y="185" width="110" height="52" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="85" y="205" font-size="12" fill="#e2e8f0" font-family="monospace" text-anchor="middle">🎬</text>
      <text x="85" y="220" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">Event/Show</text>
      <text x="85" y="231" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Service</text>

      <!-- Seat Inventory Service -->
      <rect x="160" y="185" width="120" height="52" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="220" y="205" font-size="12" fill="#e2e8f0" font-family="monospace" text-anchor="middle">💺</text>
      <text x="220" y="220" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">Seat Inventory</text>
      <text x="220" y="231" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Redis Lock</text>

      <!-- Booking Service -->
      <rect x="300" y="185" width="110" height="52" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="355" y="205" font-size="12" fill="#e2e8f0" font-family="monospace" text-anchor="middle">🎟️</text>
      <text x="355" y="220" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">Booking</text>
      <text x="355" y="231" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Service</text>

      <!-- Payment Service -->
      <rect x="430" y="185" width="110" height="52" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="485" y="205" font-size="12" fill="#e2e8f0" font-family="monospace" text-anchor="middle">💳</text>
      <text x="485" y="220" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">Payment</text>
      <text x="485" y="231" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Service</text>

      <!-- Notification Service -->
      <rect x="560" y="185" width="110" height="52" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="615" y="205" font-size="12" fill="#e2e8f0" font-family="monospace" text-anchor="middle">🔔</text>
      <text x="615" y="220" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">Notification</text>
      <text x="615" y="231" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Service</text>

      <!-- Search Service -->
      <rect x="690" y="185" width="110" height="52" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="745" y="205" font-size="12" fill="#e2e8f0" font-family="monospace" text-anchor="middle">🔍</text>
      <text x="745" y="220" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">Search</text>
      <text x="745" y="231" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Service</text>

      <!-- Kafka -->
      <rect x="300" y="258" width="130" height="46" rx="8" fill="#2d2a1a" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="365" y="277" font-size="12" fill="#e2e8f0" font-family="monospace" text-anchor="middle">📨</text>
      <text x="365" y="292" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">Kafka</text>
      <text x="365" y="301" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Event Bus</text>

      <!-- DATA LAYER -->
      <!-- PostgreSQL -->
      <rect x="30" y="318" width="130" height="52" rx="8" fill="#1a2040" stroke="#60a5fa" stroke-width="1.5"/>
      <text x="95" y="338" font-size="12" fill="#e2e8f0" font-family="monospace" text-anchor="middle">🗄️</text>
      <text x="95" y="353" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">PostgreSQL</text>
      <text x="95" y="364" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Events / Bookings</text>

      <!-- Redis -->
      <rect x="190" y="318" width="130" height="52" rx="8" fill="#2d1a1a" stroke="#f87171" stroke-width="1.5"/>
      <text x="255" y="338" font-size="12" fill="#e2e8f0" font-family="monospace" text-anchor="middle">⚡</text>
      <text x="255" y="353" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">Redis</text>
      <text x="255" y="364" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Seat Locks / Queue</text>

      <!-- Elasticsearch -->
      <rect x="350" y="318" width="130" height="52" rx="8" fill="#1a2040" stroke="#34d399" stroke-width="1.5"/>
      <text x="415" y="338" font-size="12" fill="#e2e8f0" font-family="monospace" text-anchor="middle">🔎</text>
      <text x="415" y="353" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">Elasticsearch</text>
      <text x="415" y="364" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Search Index</text>

      <!-- S3 -->
      <rect x="510" y="318" width="130" height="52" rx="8" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="575" y="338" font-size="12" fill="#e2e8f0" font-family="monospace" text-anchor="middle">🪣</text>
      <text x="575" y="353" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">S3 Storage</text>
      <text x="575" y="364" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Posters / Assets</text>

      <!-- Monitoring -->
      <rect x="700" y="318" width="130" height="52" rx="8" fill="#2d1f1a" stroke="#fb923c" stroke-width="1.5"/>
      <text x="765" y="338" font-size="12" fill="#e2e8f0" font-family="monospace" text-anchor="middle">📊</text>
      <text x="765" y="353" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">Monitoring</text>
      <text x="765" y="364" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Prometheus / Grafana</text>

      <!-- ARROWS: Client → Gateway -->
      <line x1="130" y1="68" x2="320" y2="100" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="270" y1="68" x2="340" y2="100" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="440" y1="68" x2="420" y2="100" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="620" y1="68" x2="530" y2="100" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- ARROWS: Gateway → Services -->
      <line x1="330" y1="146" x2="85" y2="185" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="345" y1="146" x2="220" y2="185" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="360" y1="146" x2="355" y2="185" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="375" y1="146" x2="485" y2="185" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="490" y1="146" x2="615" y2="185" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="555" y1="146" x2="745" y2="185" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- ARROWS: Services → Kafka -->
      <line x1="355" y1="237" x2="355" y2="258" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="485" y1="237" x2="420" y2="258" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="615" y1="237" x2="450" y2="258" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- ARROWS: Services → Data -->
      <line x1="85" y1="237" x2="95" y2="318" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="220" y1="237" x2="255" y2="318" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="745" y1="237" x2="415" y2="318" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="490" y1="237" x2="540" y2="318" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- ARROWS: Kafka → Data -->
      <line x1="365" y1="304" x2="190" y2="318" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="370" y1="304" x2="370" y2="318" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
    </svg>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">1. Executive Summary</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Problem</div>
        <p>Let millions of users browse movies/events, pick specific seats on a specific showtime, and pay — while guaranteeing that no two users are ever sold the same seat, even when 500K people hit "book now" for a blockbuster's 9 AM release within the same 60 seconds.</p>
        <div class="ans-label" style="margin-top:12px;">Scale</div>
        <ul>
          <li>100M+ MAU, ~10M DAU across 650+ cities (movies, plays, sports, concerts)</li>
          <li>~4M tickets booked/day in steady state</li>
          <li>Blockbuster release-day spike: 50-100x normal traffic in a 10-minute window</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Core Challenges</div>
        <ul>
          <li>Zero double-booking on a seat under extreme concurrent demand</li>
          <li>Absorbing a 100x traffic spike without falling over (flash-sale problem)</li>
          <li>Short-lived seat locks (5-10 min) that reliably expire and release inventory</li>
          <li>Fair ordering of who gets to book first (waiting room / virtual queue)</li>
          <li>Payment must be idempotent — a retried charge must never double-charge or double-book</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Functional Requirements</div>
        <ul>
          <li>Search movies/events by city, genre, language, date, venue</li>
          <li>View showtimes and a live seat map (available/locked/booked)</li>
          <li>Lock selected seats temporarily while user completes payment</li>
          <li>Confirm booking, generate e-ticket (QR code), send notification</li>
          <li>Cancel/refund flow within cancellation window</li>
          <li>Admin: theater/screen/show/pricing management</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Non-Functional Requirements</div>
        <div class="pattern-table">
          <div class="pt-row pt-header"><div>NFR</div><div>Target</div><div>Why</div><div>Approach</div></div>
          <div class="pt-row"><div class="pt-name">Seat-lock consistency</div><div>100% — zero double-booking</div><div>Money + trust; a double-sold seat is a support/legal incident</div><div>Distributed lock (Redis SET NX PX) or DB row-level lock with short TTL</div></div>
          <div class="pt-row"><div class="pt-name">Spike absorption</div><div>Survive 50-100x traffic for ~10 min</div><div>Blockbuster ticket drops are predictable but extreme</div><div>Virtual waiting room throttles entry into the booking flow</div></div>
          <div class="pt-row"><div class="pt-name">Booking latency</div><div>&lt; 2 sec for seat lock, &lt; 5 sec for payment confirm</div><div>Users abandon if seat selection feels laggy</div><div>In-memory seat-map cache, async payment webhook</div></div>
          <div class="pt-row"><div class="pt-name">Availability</div><div>99.95%</div><div>Revenue-critical during narrow release windows</div><div>Multi-AZ, circuit breakers, graceful degradation of non-critical features</div></div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">2. Capacity Estimation</div>
  <div class="ref-body">
    <p>Assumptions stated explicitly — interviewers score the method, not the exact digits. Two regimes matter here: <strong>steady-state</strong> and the <strong>blockbuster-release spike</strong>, which is the entire point of this system's design.</p>
    <div class="ans-label">Steady State</div>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Metric</div><div>Assumption</div><div>Calculation</div><div>Result</div></div>
      <div class="pt-row"><div class="pt-name">DAU</div><div>10M daily active users</div><div>given</div><div>10M</div></div>
      <div class="pt-row"><div class="pt-name">MAU</div><div>100M monthly</div><div>given</div><div>100M</div></div>
      <div class="pt-row"><div class="pt-name">Tickets booked/day</div><div>4M tickets/day avg</div><div>4M / 86,400s</div><div>~46 bookings/sec avg</div></div>
      <div class="pt-row"><div class="pt-name">Search/browse requests/sec</div><div>10x more browsing than booking</div><div>46 × 10 (approx, browse:book ratio)</div><div>~460 req/sec avg</div></div>
      <div class="pt-row"><div class="pt-name">Peak requests/sec (normal Fri/weekend)</div><div>4x average on weekend evenings</div><div>460 × 4</div><div>~1,840 req/sec</div></div>
      <div class="pt-row"><div class="pt-name">Read:Write ratio</div><div>Browsing/search read-heavy; booking write-heavy</div><div>—</div><div>~20:1 (R:W) overall</div></div>
      <div class="pt-row"><div class="pt-name">Storage — bookings/year</div><div>1.5KB/booking record</div><div>4M × 365 × 1.5KB</div><div>~2.2 TB/year</div></div>
      <div class="pt-row"><div class="pt-name">Storage — seat inventory (hot)</div><div>200 bytes/seat, ~50K active shows/day × 150 seats avg</div><div>50K × 150 × 200B</div><div>~1.5 GB hot (rolling per day)</div></div>
      <div class="pt-row"><div class="pt-name">Bandwidth (seat map polling)</div><div>500K concurrent seat-map viewers × 2KB payload, refresh/5s</div><div>500K × 2KB / 5s</div><div>~200 MB/sec sustained on busy evenings</div></div>
      <div class="pt-row"><div class="pt-name">CDN traffic</div><div>posters/banners: 100M MAU × 5 images/session × 150KB</div><div>100M × 5 × 150KB</div><div>~75 TB/month via CDN (offloaded from origin)</div></div>
      <div class="pt-row"><div class="pt-name">5-year growth</div><div>25% YoY user growth</div><div>10M × 1.25^5</div><div>~30M DAU by year 5</div></div>
    </div>
    <div class="ans-label" style="margin-top:16px;">Blockbuster Release Spike (the real design driver)</div>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Metric</div><div>Assumption</div><div>Calculation</div><div>Result</div></div>
      <div class="pt-row"><div class="pt-name">Spike multiplier</div><div>50-100x normal peak, concentrated in first 10 min of ticket release</div><div>1,840 req/sec × 75 (mid-range)</div><div>~138,000 req/sec at ingress</div></div>
      <div class="pt-row"><div class="pt-name">Concurrent "want to book" users</div><div>2M users refreshing/clicking within a 10-min window for a single mega-release</div><div>2M / 600s</div><div>~3,300 users/sec attempting entry</div></div>
      <div class="pt-row"><div class="pt-name">Actual seat-lock attempts/sec (post waiting-room throttle)</div><div>System admits users into booking flow at a controlled rate matching DB/lock capacity</div><div>capped by design, not demand</div><div>~500-1,000 admits/sec (tunable)</div></div>
      <div class="pt-row"><div class="pt-name">Available inventory for a mega-release</div><div>500 screens × 150 seats × 4 shows on day 1</div><div>500 × 150 × 4</div><div>~300,000 seats sell out in minutes</div></div>
      <div class="pt-row"><div class="pt-name">Message volume (booking events)</div><div>every lock/confirm/expire/cancel emits an event</div><div>1,000 admits/sec × ~4 events/booking lifecycle</div><div>~4,000 msgs/sec sustained during spike</div></div>
    </div>
    <div class="tip-box" style="margin-top:10px;">✅ Conclusion: the system must be architected around the <strong>10-minute spike</strong>, not the daily average — a design that only handles ~1,840 req/sec comfortably will fall over completely on release day. The waiting room exists specifically to convert an unbounded 138K req/sec surge into a bounded, DB-safe admission rate.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">3. APIs</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Endpoint</div><div>Method</div><div>Purpose</div><div>Auth</div></div>
      <div class="pt-row"><div class="pt-name">/v1/movies/search</div><div>GET</div><div>Search movies/events by city, genre, language, date</div><div>Optional (public)</div></div>
      <div class="pt-row"><div class="pt-name">/v1/shows/{showId}/seats</div><div>GET</div><div>Get live seat map for a show</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/waitingroom/token</div><div>POST</div><div>Request admission token during a flash sale</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/seats/lock</div><div>POST</div><div>Temporarily lock 1-10 seats for checkout</div><div>Bearer JWT + Admission-Token</div></div>
      <div class="pt-row"><div class="pt-name">/v1/bookings</div><div>POST</div><div>Confirm booking after payment success</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/bookings/{id}</div><div>GET</div><div>Get booking/ticket status</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/bookings/{id}/cancel</div><div>POST</div><div>Cancel and initiate refund</div><div>Bearer JWT</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Lock Seats — Request/Response</div>
        <div class="code-box">POST /v1/seats/lock
Headers:
  Authorization: Bearer &lt;jwt&gt;
  Admission-Token: wr-9f21-...   (from waiting room)
  Idempotency-Key: 7c3a-...
  X-Request-Id: req-5521

Request:
{
  "showId": "SHW-88213",
  "seatIds": ["A1-14", "A1-15"]
}

Response 200:
{
  "lockId": "LK-33421",
  "seatIds": ["A1-14", "A1-15"],
  "lockExpiresAt": "2026-07-04T18:32:10Z",
  "holdSeconds": 300,
  "amountDue": 700.00
}

Response 409 (seat already locked/booked):
{
  "error": "SEAT_UNAVAILABLE",
  "conflictingSeats": ["A1-15"]
}</div>
      </div>
      <div>
        <div class="ans-label">API Design Standards</div>
        <ul>
          <li><strong>Status codes:</strong> 200 ok, 201 created, 400 bad request, 401 unauthorized, 403 waiting-room token required/expired, 404 not found, 409 conflict (seat taken), 410 lock expired, 429 rate limited, 503 system under load-shed</li>
          <li><strong>Auth:</strong> OAuth2 + short-lived JWT (15 min); waiting room issues a separate short-lived Admission-Token required on write-path endpoints during flash sales</li>
          <li><strong>Pagination:</strong> cursor-based for search results and booking history (<code>?cursor=abc&amp;limit=20</code>)</li>
          <li><strong>Rate limiting:</strong> token bucket per user (5 req/min on /seats/lock) plus per-device fingerprint limits to blunt scalper bots</li>
          <li><strong>Versioning:</strong> URI versioning (<code>/v1/</code>, <code>/v2/</code>) with 6-month deprecation window</li>
          <li><strong>Idempotency:</strong> required on POST /seats/lock and POST /bookings — a client retry must never create a duplicate lock or a duplicate paid booking</li>
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
      <div class="pt-row"><div class="pt-name">PostgreSQL/MySQL (Bookings DB)</div><div>Bookings, payments, refunds, users</div><div>ACID needed — money, and a booking is a legal transaction record</div><div>PK: booking_id (UUID); Index: (user_id, created_at), (show_id, status)</div></div>
      <div class="pt-row"><div class="pt-name">PostgreSQL (Seat Inventory DB)</div><div>Per-show seat state (AVAILABLE/LOCKED/BOOKED)</div><div>Needs row-level locking / SELECT...FOR UPDATE semantics as the durable source of truth behind the cache</div><div>Composite PK: (show_id, seat_id); optimistic version column for CAS updates</div></div>
      <div class="pt-row"><div class="pt-name">Redis (Seat Lock Cache)</div><div>Ephemeral seat locks with TTL</div><div>Sub-ms atomic SET NX PX — the only realistic way to arbitrate thousands of concurrent lock attempts per second on the same show</div><div>Key: lock:{showId}:{seatId}, value: userId, TTL 300s (5 min hold)</div></div>
      <div class="pt-row"><div class="pt-name">Cassandra / Cosmos DB (Catalog)</div><div>Movies, events, theaters, showtimes</div><div>High read QPS, mostly static during the day, horizontally scalable</div><div>Partition key: city_id; clustering key: show_date</div></div>
      <div class="pt-row"><div class="pt-name">Elasticsearch</div><div>Movie/event/theater search index</div><div>Full-text + faceted filter search (genre/language/city/date)</div><div>Indexed on title, city, genre, language, release_date</div></div>
      <div class="pt-row"><div class="pt-name">Blob/Object Storage</div><div>Posters, banners, trailers, e-ticket PDFs</div><div>Large binary assets, served via CDN, not queried relationally</div><div>Path: /posters/{movieId}/{size}.jpg</div></div>
    </div>
    <div class="code-box" style="margin-top:12px;">-- Seat inventory table (PostgreSQL) — the single most contended table in the system
CREATE TABLE show_seats (
  show_id       UUID NOT NULL,
  seat_id       VARCHAR(10) NOT NULL,   -- e.g. 'A1-14'
  status        VARCHAR(10) NOT NULL,   -- AVAILABLE / LOCKED / BOOKED
  locked_by     UUID,
  lock_expires_at TIMESTAMP,
  version       INT NOT NULL DEFAULT 0, -- optimistic concurrency token
  PRIMARY KEY (show_id, seat_id)
);
-- Sharding key: show_id (a show's seat map is always accessed together, never joined across shows)

-- Bookings table
CREATE TABLE bookings (
  booking_id    UUID PRIMARY KEY,
  user_id       UUID NOT NULL,
  show_id       UUID NOT NULL,
  seat_ids      TEXT[] NOT NULL,
  amount        DECIMAL(10,2) NOT NULL,
  status        VARCHAR(20) NOT NULL,  -- PENDING_PAYMENT/CONFIRMED/CANCELLED/REFUNDED
  payment_ref   VARCHAR(64),
  created_at    TIMESTAMP NOT NULL DEFAULT now(),
  INDEX idx_bookings_user (user_id, created_at DESC),
  INDEX idx_bookings_show (show_id, status)
);

-- Redis lock key pattern
-- SET lock:{show_id}:{seat_id} {user_id} NX PX 300000   (atomic acquire, 5-min TTL)</div>
    <div class="warn-box" style="margin-top:10px;">⚠️ Never rely on application-level "check then set" for seat status — under concurrency that race condition IS the double-booking bug. Either use Redis's atomic SET NX as the arbitrator, or a DB-level SELECT...FOR UPDATE / optimistic version-column CAS. Most real systems use both: Redis as the fast first gate, Postgres as the durable, re-validated source of truth at booking-confirm time.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">5. High-Level Architecture</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step blue">Users (Web / Mobile App)</div>
      <div class="flow-arrow">↓ GeoDNS + CDN (posters, banners, static assets)</div>
      <div class="flow-step">Load Balancer</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step red">Virtual Waiting Room (flash-sale traffic throttle)</div>
      <div class="flow-arrow">↓ admits at controlled rate</div>
      <div class="flow-step">API Gateway (authn, rate limit, routing)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Application Servers (stateless)</div>
      <div class="flow-arrow">↓ splits into concerns</div>
      <div class="flow-step green">Catalog Service</div>
      <div class="flow-step green">Seat Inventory Service</div>
      <div class="flow-step green">Booking Service</div>
      <div class="flow-step green">Payment Service</div>
      <div class="flow-arrow">↓ reads/writes</div>
      <div class="flow-step">Redis (seat locks, cache) ⇄ PostgreSQL (bookings, inventory) ⇄ Elasticsearch (search) ⇄ Blob Storage (media)</div>
      <div class="flow-arrow">↓ async events</div>
      <div class="flow-step">Kafka (seat.locked, booking.confirmed, payment.settled)</div>
      <div class="flow-arrow">↓ consumed by</div>
      <div class="flow-step">Notification Service · Analytics Pipeline · Monitoring</div>
    </div>
    <p style="margin-top:12px;">The <strong>Waiting Room</strong> is the architectural signature of this system: it sits in front of the write-path (seat lock/booking) and converts an unbounded spike into a rate the Seat Inventory Service and DB can safely absorb, instead of letting the spike hit the database directly.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">6. Detailed Component Design</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Responsibility</div><div>Key Design Point</div><div>Scaling Model</div></div>
      <div class="pt-row"><div class="pt-name">Movie/Show Catalog Service</div><div>Movies, events, theaters, showtimes, pricing</div><div>Mostly-read, cacheable aggressively (TTL minutes); changes are infrequent and admin-driven</div><div>Stateless, scaled by read traffic; cached at CDN/edge for anonymous browsing</div></div>
      <div class="pt-row"><div class="pt-name">Seat Inventory Service</div><div>THE hardest problem: owns seat state per show, must guarantee exactly-one-buyer-per-seat under massive concurrency</div><div>Redis SET NX PX as fast distributed lock; DB row version/CAS re-validated at confirm time; lock auto-expires in 5 min if payment not completed</div><div>Sharded by show_id — one show's contention never blocks another show's seats</div></div>
      <div class="pt-row"><div class="pt-name">Waiting-Room / Queue Service</div><div>Throttles traffic into the booking flow during flash sales</div><div>Issues short-lived admission tokens at a rate matched to downstream capacity; users without a valid token are held on a "you are number N in line" page</div><div>Stateless token issuer backed by a counter in Redis; scales horizontally, itself must survive the full unthrottled spike</div></div>
      <div class="pt-row"><div class="pt-name">Booking Service</div><div>Owns the booking state machine (PENDING→CONFIRMED/CANCELLED)</div><div>Only transitions to CONFIRMED after both seat-lock validity AND payment success are verified — a two-phase commit-like check</div><div>Stateless, sharded by show_id for locality with inventory checks</div></div>
      <div class="pt-row"><div class="pt-name">Payment Service</div><div>Captures payment, handles refunds</div><div>Idempotent charge via Idempotency-Key; on payment webhook, atomically confirms booking + releases nothing (seat already consumed); on failure, releases the seat lock immediately instead of waiting for TTL</div><div>Stateless; strong consistency on the ledger write</div></div>
      <div class="pt-row"><div class="pt-name">Notification Service</div><div>Booking confirmation, e-ticket delivery, reminders</div><div>Consumes Kafka booking.confirmed events; fans out to SMS/email/push</div><div>Stateless, horizontally scaled consumer group</div></div>
      <div class="pt-row"><div class="pt-name">Search Service</div><div>Movie/theater/event discovery by city/genre/language/date</div><div>Elasticsearch index refreshed async from Catalog Service changes (eventual consistency acceptable here)</div><div>Stateless query layer over an ES cluster, read-replica-heavy</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">7. Sequence Diagrams</div>
  <div class="ref-body">
    <div class="ans-label">Happy Path — Select Seats, Lock, Pay Before Expiry</div>
    <div class="code-box">User    APIGateway   WaitingRoom   SeatInventorySvc   Redis   PaymentSvc   BookingSvc
 |--enter queue----->|             |                |             |            |
 |<--admission token-|<--token-----|                |             |            |
 |--lockSeats(A1,A2)------------------------------->|             |            |
 |                    |             |--SETNX lock:show:A1--------->|            |
 |                    |             |--SETNX lock:show:A2--------->|            |
 |                    |             |<--OK (both acquired)---------|            |
 |<--lockId, expiresAt(+5min)------------------------|             |            |
 |--pay(lockId, card)------------------------------------------------------->|            |
 |                    |             |                |             |--charge()->|
 |                    |             |                |             |<--success--|
 |                    |             |                |             |--confirmBooking(lockId)------>|
 |                    |             |                |             |            |--markSeats(BOOKED)-->DB
 |<--booking CONFIRMED, e-ticket-----------------------------------------------------------------|</div>

    <div class="ans-label" style="margin-top:14px;">Failure Path — Payment Fails After Seats Were Locked</div>
    <div class="code-box">User    PaymentSvc     SeatInventorySvc   Redis        BookingSvc
 |--pay(lockId)->|                |                  |            |
 |               |--charge()-->[gateway declines]     |            |
 |<--PAYMENT_FAILED--|              |                  |            |
 |               |--releaseLock(lockId)-------------->|            |
 |               |                | DEL lock:show:A1, lock:show:A2 |
 |<--seats released, retry available--|                |            |
 (booking never created — inventory freed immediately, not after 5-min TTL)</div>

    <div class="ans-label" style="margin-top:14px;">Retry — Seat Lock Acquire Fails Due to Redis Blip</div>
    <div class="code-box">User    SeatInventorySvc     Redis
 |--lockSeats()-->|                    |
 |                |--SETNX------------>|
 |                |  [Redis timeout]   |
 |                |<--retry(1)---------|  (exponential backoff: 50ms)
 |                |--SETNX------------>|
 |                |<--retry(2)---------|  (100ms)
 |                |--SETNX------------>|
 |                |<--OK---------------|
 |<--lockId--------|
 (if 3 retries exhausted -> fail fast with 503, do NOT silently fall back
  to DB-only locking under a spike — that would overload Postgres instead)</div>

    <div class="ans-label" style="margin-top:14px;">Timeout — User Doesn't Complete Payment Within Hold Window</div>
    <div class="code-box">SeatInventorySvc        Redis                 BookingSvc
 |--SET lock:show:A1 NX PX 300000-->|
 |         (user abandons checkout — no payment call arrives)
 |                                   | [TTL expires at 300s]
 |                                   |--key auto-deleted--->|
 |--(next user) lockSeats(A1)------->|
 |<--OK, seat available again--------|
 (no explicit "expire" event needed for the lock itself — Redis TTL IS
  the expiry mechanism; a periodic reconciliation job double-checks
  DB seat rows haven't drifted from Redis lock state)</div>
    <div class="tip-box" style="margin-top:10px;">✅ Notice the failure path releases the lock immediately on payment failure rather than waiting for the 5-minute TTL — reclaiming inventory fast matters enormously when 500K people are waiting for the same 300K seats.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">8. Database Scaling</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Sharding Strategy</div>
        <p><strong>Shard key: show_id</strong> for both the Seat Inventory DB and hot Redis lock keys. A show's seats are never queried jointly with another show's, so this makes nearly 100% of booking-path queries single-shard — critical for keeping lock contention scoped to one show at a time instead of one giant global lock space.</p>
        <div class="ans-label" style="margin-top:12px;">Read Replicas</div>
        <p>Bookings DB: 1 primary + 2-3 read replicas for booking-history/ticket-lookup reads, keeping the primary dedicated to the write-heavy confirm path during release windows.</p>
      </div>
      <div>
        <div class="ans-label">Replication</div>
        <p>Catalog store (Cassandra/Cosmos): replication factor 3 across AZs — catalog reads must stay available even during an AZ loss, since browsing traffic never stops even if booking is degraded.</p>
        <div class="ans-label" style="margin-top:12px;">CQRS</div>
        <p>Seat-map read view (denormalized, cached in Redis, refreshed on every lock/confirm event) is separate from the seat-inventory write model (normalized rows with version columns) — the read view absorbs the massive "is this seat free?" polling load without touching the transactional table.</p>
      </div>
    </div>
    <div class="warn-box" style="margin-top:12px;">⚠️ Event sourcing IS used for the seat-lock lifecycle (lock acquired → payment pending → confirmed/released) because replaying that stream is exactly how you reconcile Redis vs. DB drift after an incident — unlike Uber's linear trip state machine, seat-inventory correctness benefits from a full audit trail.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">9. Cache Strategy</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Cache</div><div>Pattern</div><div>TTL</div><div>Why</div></div>
      <div class="pt-row"><div class="pt-name">Seat lock (distributed lock)</div><div>Write-through, atomic SET NX PX</div><div>300 sec (5-min checkout hold)</div><div>Must be the single source of truth for "who currently holds this seat" — cannot be eventually consistent</div></div>
      <div class="pt-row"><div class="pt-name">Seat map (read view)</div><div>Cache-aside, invalidated on lock/confirm/release events</div><div>2-5 sec soft TTL + event-driven invalidation</div><div>Thousands of viewers poll the same seat map; can't hit DB per poll</div></div>
      <div class="pt-row"><div class="pt-name">Movie/show catalog</div><div>Read-through</div><div>5-10 min</div><div>Changes rarely intraday, extremely high read volume</div></div>
      <div class="pt-row"><div class="pt-name">Search results (popular queries)</div><div>Cache-aside</div><div>60 sec</div><div>Same "movies in Mumbai today" query fired by thousands of users</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Hot Key Problem</div>
        <p>A single blockbuster's 9 PM opening-night show becomes an extreme hot key — hundreds of thousands hammer the same <code>seatmap:{showId}</code> cache key. Mitigated by (1) read-replica fan-out of that specific Redis key, (2) local in-process micro-cache (1-2s) at the app-server layer to shave off duplicate reads before they even reach Redis, and (3) the waiting room limiting how many people can even reach this key concurrently.</p>
      </div>
      <div>
        <div class="ans-label">Cache Stampede &amp; Distributed Lock (critical here)</div>
        <p>Seat locking IS a distributed-lock problem end to end: <code>SET lock:{showId}:{seatId} {userId} NX PX 300000</code> — NX ensures only one caller ever wins the key, PX guarantees automatic release if the client crashes mid-checkout. On cache rebuild (e.g., seat-map cache cold after a Redis failover), a single-flight lock per show_id prevents thousands of concurrent viewers from all issuing the same expensive rebuild query simultaneously.</p>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">10. Messaging</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Broker</div><div>Used For</div><div>Why This One</div></div>
      <div class="pt-row"><div class="pt-name">Kafka</div><div>seat.locked, booking.confirmed, payment.settled, booking.cancelled events</div><div>High throughput during release spikes, replay-ability for reconciliation jobs, ordered per-partition (by show_id) event log</div></div>
      <div class="pt-row"><div class="pt-name">RabbitMQ / SQS-equivalent</div><div>Notification dispatch (SMS/email/push), e-ticket PDF generation jobs</div><div>Simple point-to-point work-queue semantics fit fire-and-forget async jobs better than a log</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Delivery Guarantees</div>
        <ul>
          <li><strong>Seat lock events:</strong> at-least-once, but consumers are idempotent (dedupe by lock_id) since the Redis TTL is the real arbiter, not the event log</li>
          <li><strong>Booking confirmation:</strong> exactly-once semantics via Kafka transactional producer + idempotent consumer (dedupe by booking_id) — a duplicate "confirmed" event must never trigger a second charge or a second e-ticket</li>
          <li><strong>Ordering:</strong> partition key = show_id, so all events for one show's seats are processed in order — prevents a "released" event being applied before its matching "locked" event</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Retry / DLQ</div>
        <p>3 retries with exponential backoff (100ms → 400ms → 1.6s). After exhausting retries, message → Dead Letter Queue; on-call paged if DLQ depth exceeds threshold during a release window (this is exactly when it matters most). Poison messages (malformed payload) go straight to DLQ without retry to avoid blocking a show's entire event partition.</p>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">11. Storage</div>
  <div class="ref-body">
    <ul>
      <li><strong>Blob/Object Storage:</strong> movie posters, banners, trailers, generated e-ticket PDFs/QR codes — stored in S3/Blob with lifecycle policy archiving old show assets after the show's run ends</li>
      <li><strong>CDN:</strong> serves posters/banners/trailers globally; absorbs the vast majority of read traffic for browsing so it never reaches origin servers, which matters enormously when release-day browsing spikes alongside booking</li>
      <li><strong>Image Processing:</strong> uploaded poster/banner images are resized into multiple resolutions (thumbnail, card, hero-banner) and compressed (WebP/AVIF with JPEG fallback) via an async worker on upload</li>
      <li><strong>Thumbnail Generation:</strong> triggered by an upload event (S3/Blob event → processing queue → resize worker → write variants back to blob + invalidate CDN cache)</li>
    </ul>
    <div class="tip-box" style="margin-top:10px;">✅ Unlike Uber, this system has meaningful media/image load (posters, banners) — but it's all read-heavy and cacheable, so CDN + pre-generated variants solve it cleanly without needing a live video-streaming pipeline.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">12. Search</div>
  <div class="ref-body">
    <p>Elasticsearch powers the core rider-facing discovery flow here (unlike Uber, where search was only an internal tool) — users actively search/filter movies, theaters, and events by city, genre, language, and date, so this is a first-class, latency-sensitive path.</p>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Feature</div><div>Approach</div></div>
      <div class="pt-row"><div class="pt-name">Filters</div><div>city, genre, language, format (2D/3D/IMAX), date, price range</div></div>
      <div class="pt-row"><div class="pt-name">Ranking</div><div>Boosted by release recency, popularity (bookings/hour), and user's city proximity to theater</div></div>
      <div class="pt-row"><div class="pt-name">Autocomplete</div><div>Edge n-gram index on movie/event titles for type-ahead search suggestions</div></div>
      <div class="pt-row"><div class="pt-name">Sync freshness</div><div>Catalog changes propagate to ES async (CDC or event-driven); eventual consistency is fine — a few seconds' staleness on "now showing" listings is imperceptible</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">13. Scalability</div>
  <div class="ref-body">
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">H</div><div class="principle-name">Horizontal Scaling</div><p>Every service (Catalog, Seat Inventory, Booking, Payment) is stateless and scales out independently behind the load balancer.</p></div>
      <div class="principle-card"><div class="principle-icon">W</div><div class="principle-name">Waiting Room / Virtual Queue</div><p>The single most important scaling pattern here — converts an unbounded 100x spike into a bounded admission rate the booking path can safely absorb, protecting the DB and lock service from ever seeing raw demand.</p></div>
      <div class="principle-card"><div class="principle-icon">S</div><div class="principle-name">Show-Based Sharding</div><p>show_id partitions inventory, locks, and even service capacity — the busiest blockbuster show can be given dedicated capacity without over-provisioning every show.</p></div>
      <div class="principle-card"><div class="principle-icon">A</div><div class="principle-name">Predictive Auto-Scaling</div><p>Release dates/times are known in advance — pre-scale app servers, Redis, and DB read capacity ahead of a scheduled 9 AM ticket drop rather than reacting after the spike starts.</p></div>
      <div class="principle-card"><div class="principle-icon">B</div><div class="principle-name">Backpressure &amp; Load Shedding</div><p>When admission rate exceeds safe capacity, the waiting room queues rather than the API layer returning 500s — degrade gracefully to "you're in line" instead of an outage.</p></div>
      <div class="principle-card"><div class="principle-icon">R</div><div class="principle-name">Rate Limiting</div><p>Per-user and per-device limits on /seats/lock throttle both accidental double-clicks and scalper/bot scripted booking attempts.</p></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">14. Reliability</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Pattern</div><div>Applied To</div><div>Behavior</div></div>
      <div class="pt-row"><div class="pt-name">Circuit Breaker</div><div>Booking Service → Payment Gateway calls</div><div>Opens after 5 consecutive failures; seats' locks are released immediately rather than left to expire, freeing inventory fast</div></div>
      <div class="pt-row"><div class="pt-name">Retry</div><div>Seat Inventory Service → Redis lock acquire</div><div>3 retries, exponential backoff, then fail fast with 503 (never silently fall back to unprotected DB writes under load)</div></div>
      <div class="pt-row"><div class="pt-name">Bulkhead</div><div>Per-show connection/thread pools in Seat Inventory Service</div><div>One mega-blockbuster's contention can't starve booking capacity for every other concurrently running show</div></div>
      <div class="pt-row"><div class="pt-name">Timeout</div><div>Seat lock hold window</div><div>Hard 5-minute TTL on Redis lock; no manual cleanup job needed — expiry is automatic</div></div>
      <div class="pt-row"><div class="pt-name">Idempotency</div><div>POST /seats/lock and POST /bookings (critical for payment)</div><div>Idempotency-Key prevents duplicate lock or duplicate paid booking on client retry/double-tap</div></div>
      <div class="pt-row"><div class="pt-name">Graceful Degradation</div><div>Search/recommendation service down</div><div>Falls back to a static "trending near you" list rather than blocking browsing entirely; booking flow is unaffected</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">15. Security</div>
  <div class="ref-body">
    <ul>
      <li><strong>AuthN:</strong> OAuth2 + JWT (short-lived access token + refresh token), phone/email OTP for login</li>
      <li><strong>AuthZ:</strong> RBAC for internal tools (theater-partner portal, admin console); ABAC for partner-only vs consumer-only endpoints</li>
      <li><strong>Encryption:</strong> TLS 1.2+ everywhere in transit; AES-256 at rest for PII and payment tokens (never store raw card data — tokenize via PCI-compliant gateway)</li>
      <li><strong>Secrets:</strong> Key Vault/Secrets Manager for DB credentials, payment gateway keys — never in code/config</li>
      <li><strong>OWASP:</strong> input validation on seat IDs/show IDs (prevent injection/enumeration), strict server-side re-validation of price (never trust client-submitted amount)</li>
      <li><strong>Bot/Scalper Mitigation:</strong> CAPTCHA at waiting-room entry during flash sales, device fingerprinting, per-account and per-payment-method booking caps (e.g., max 10 tickets/show), behavioral anomaly detection (superhuman click speed flags a bot)</li>
      <li><strong>DDoS Protection:</strong> WAF/CDN edge layer (Cloudflare/Front Door) absorbs volumetric attacks before they reach the API Gateway — especially important since release-day legitimate traffic already looks like a DDoS pattern</li>
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
          <li>Seat-lock success/conflict rate per show (spikes reveal contention hot spots)</li>
          <li>Waiting-room queue depth &amp; estimated wait time</li>
          <li>Booking confirmation latency (P50/P95/P99)</li>
          <li>Redis lock-acquire latency and error rate</li>
          <li>Payment success/failure rate, double-charge alerts (should always be zero)</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Stack</div>
        <ul>
          <li><strong>Metrics:</strong> Prometheus + Grafana dashboards, with a dedicated "release-day war room" dashboard</li>
          <li><strong>Tracing:</strong> OpenTelemetry across Waiting Room → Seat Inventory → Payment → Booking call chain</li>
          <li><strong>Logging:</strong> centralized structured logs (ELK or equivalent), with seat-lock audit trail retained longer for dispute resolution</li>
          <li><strong>Alerts:</strong> PagerDuty on lock-conflict rate spike, DLQ depth, queue-wait-time breach, payment error-rate breach</li>
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
      <div class="pt-row"><div class="pt-name">CDN / Edge / WAF</div><div>Azure Front Door (WAF + global routing) + Azure CDN</div></div>
      <div class="pt-row"><div class="pt-name">API Gateway</div><div>Azure API Management</div></div>
      <div class="pt-row"><div class="pt-name">Application Servers</div><div>AKS (Kubernetes) for Catalog/Seat Inventory/Booking/Payment services</div></div>
      <div class="pt-row"><div class="pt-name">Seat Lock / Cache</div><div>Azure Cache for Redis (Premium tier, clustering for hot-key sharding)</div></div>
      <div class="pt-row"><div class="pt-name">Event Streaming</div><div>Azure Event Hubs (Kafka-compatible endpoint)</div></div>
      <div class="pt-row"><div class="pt-name">Notification Queue</div><div>Azure Service Bus</div></div>
      <div class="pt-row"><div class="pt-name">Bookings/Inventory DB</div><div>Azure SQL Database / Azure Database for PostgreSQL (Hyperscale)</div></div>
      <div class="pt-row"><div class="pt-name">Catalog Store</div><div>Cosmos DB (partitioned by city_id)</div></div>
      <div class="pt-row"><div class="pt-name">Media (posters/banners)</div><div>Azure Blob Storage + Azure CDN</div></div>
      <div class="pt-row"><div class="pt-name">Search</div><div>Azure AI Search</div></div>
      <div class="pt-row"><div class="pt-name">Monitoring</div><div>Application Insights + Azure Monitor</div></div>
      <div class="pt-row"><div class="pt-name">Secrets</div><div>Azure Key Vault</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">18. Kubernetes Deployment</div>
  <div class="ref-body">
    <div class="code-box">Deployment: seat-inventory-service
  replicas: 30 (baseline) -> bursts to 300 during release windows
  HPA: target CPU 50% (aggressive threshold), min 30 / max 300 pods
  behavior:
    scaleUp:   stabilizationWindowSeconds: 15   # burst FAST, this is the whole point
    scaleDown: stabilizationWindowSeconds: 300  # scale down slowly after spike ends
  readinessProbe: /healthz (checks Redis + Postgres connectivity)

ConfigMap: seat-inventory-config
  - LOCK_TTL_SECONDS=300
  - MAX_SEATS_PER_LOCK_REQUEST=10
  - REDIS_LOCK_RETRY_ATTEMPTS=3

Secret: seat-inventory-secrets
  - REDIS_CONNECTION_STRING
  - POSTGRES_CONNECTION_STRING
  - KAFKA_SASL_CREDENTIALS

Ingress: api-gateway-ingress
  - routes /v1/seats/*    -> seat-inventory-service
  - routes /v1/bookings/* -> booking-service
  - routes /v1/waitingroom/* -> waiting-room-service (scaled independently, even more aggressively)
  - TLS termination at ingress

Service: seat-inventory-service (ClusterIP) fronts the ReplicaSet
  PodDisruptionBudget: minAvailable=80% (never let a rolling update
  reduce capacity during a live release window)</div>
    <div class="tip-box" style="margin-top:10px;">✅ Seat Inventory Service and Waiting Room Service get by far the most aggressive HPA thresholds and fastest scale-up windows — their load is a step function on release day, not a gradual curve like Catalog or Notification services.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">19. Failure Scenarios</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Failure</div><div>Impact</div><div>Recovery</div></div>
      <div class="pt-row"><div class="pt-name">Seat Inventory DB down</div><div>Can't durably confirm bookings; risk of relying only on Redis (which is ephemeral)</div><div>Automatic failover to standby replica (&lt;30s); booking confirmations queue briefly rather than being lost; Redis locks still hold seats during the gap</div></div>
      <div class="pt-row"><div class="pt-name">Redis (lock cache) down</div><div>Cannot arbitrate new seat locks — booking writes must pause, not silently fall back to unsafe DB-only locking</div><div>Failover to Redis replica (Sentinel/Cluster) in seconds; if total outage, booking flow degrades to read-only "seats temporarily unavailable" rather than risk double-booking</div></div>
      <div class="pt-row"><div class="pt-name">Kafka down</div><div>Booking confirmation events, notifications stop flowing</div><div>Producers buffer locally with backpressure; booking DB write is still the source of truth (synchronous), so no booking is lost — only async side-effects (notifications) are delayed</div></div>
      <div class="pt-row"><div class="pt-name">Payment gateway API failure</div><div>Can't capture payment for locked seats</div><div>Circuit breaker opens; seat locks released immediately (not left to expire) so inventory isn't needlessly held hostage; user shown "payment provider unavailable, retry"</div></div>
      <div class="pt-row"><div class="pt-name">Region-wide outage</div><div>Entire region's users affected during a live release</div><div>GeoDNS/traffic-manager fails over to nearest healthy region; catalog/media replicated cross-region; in-flight seat locks in the failed region are treated as lost and re-validated against DB truth on failback</div></div>
      <div class="pt-row"><div class="pt-name">CDN failure</div><div>Posters/banners/static assets fail to load</div><div>Multi-CDN fallback or direct-from-origin fallback; booking flow itself (API calls) is unaffected since it doesn't depend on the CDN</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">20. Cost Optimization</div>
  <div class="ref-body">
    <ul>
      <li><strong>Reserved Instances:</strong> baseline app-server and DB capacity on 1-3yr reservations sized for steady-state traffic, not peak</li>
      <li><strong>Predictable-spike autoscaling:</strong> release dates/times are known well in advance — pre-warm capacity on a schedule rather than paying for standing 100x capacity year-round</li>
      <li><strong>Spot/low-priority nodes:</strong> analytics batch jobs (revenue reconciliation, recommendation model training) run on spot capacity</li>
      <li><strong>Caching:</strong> aggressive catalog/search caching keeps read-path DB and compute tier far smaller than raw traffic would otherwise require</li>
      <li><strong>Storage tiering:</strong> past-show seat inventory and old booking records move from hot to cold/archive storage once a show's run completes</li>
      <li><strong>Compression:</strong> WebP/AVIF for posters/banners cuts CDN egress cost substantially versus unoptimized JPEG/PNG at this traffic volume</li>
    </ul>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">21. Trade-offs</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Decision</div><div>Chosen</div><div>Rejected Alternative &amp; Why</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Seat locking strategy</div><div>Pessimistic lock (Redis SET NX PX, short TTL)</div><div>Optimistic locking (version-column CAS only) — under 100x concurrent contention on the same popular seats, retry storms would thrash the DB; pessimistic locking with a fast in-memory arbitrator scales far better here</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Flash-sale traffic handling</div><div>Virtual waiting room throttling admission</div><div>Let all traffic hit the API directly and rely on autoscaling alone — autoscaling reacts in seconds/minutes, but the spike arrives in milliseconds; the DB and lock service would be overwhelmed before scale-up completes</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Sharding key</div><div>show_id</div><div>city_id — would still co-locate many unrelated shows' contention on one shard during a single mega-release, defeating the isolation goal</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Booking confirmation guarantee</div><div>Exactly-once (idempotent consumer + Idempotency-Key)</div><div>At-least-once with client-side dedup only — unacceptable here because a duplicate "confirmed" event can trigger a duplicate charge, unlike a harmless duplicate location ping</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Search consistency</div><div>Eventual consistency (async index sync)</div><div>Synchronous dual-write to Elasticsearch on every catalog change — adds write latency to the admin path for a benefit users won't notice (a few seconds of staleness on "now showing")</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Lock expiry mechanism</div><div>Redis native TTL (PX)</div><div>Application-level cron job scanning for expired locks — adds latency and a single point of failure (the cron itself); TTL is self-cleaning and requires no extra infrastructure</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">22. Interview Questions (30)</div>
  <div class="ref-body">
    <ol>
      <li>How would you guarantee that two users can never book the same seat, even under massive concurrency?</li>
      <li>Design the seat-locking mechanism end to end — why Redis SET NX PX over a database lock?</li>
      <li>How does the waiting room actually decide who gets admitted next, and at what rate?</li>
      <li>What happens if a user's seat lock expires exactly while their payment is being processed?</li>
      <li>Walk through what happens if Redis goes down in the middle of a flash sale.</li>
      <li>How would you prevent bots/scalpers from buying up all the seats for a blockbuster in seconds?</li>
      <li>Why is show_id chosen as the sharding key instead of city_id or theater_id?</li>
      <li>Design the booking state machine and its valid transitions.</li>
      <li>How do you make the payment-capture step idempotent, and what's the idempotency key?</li>
      <li>What's your strategy for a hot show (e.g., a superstar's opening-night 9 PM screening)?</li>
      <li>How do you guarantee ordering of seat-lock and booking-confirmation events in Kafka?</li>
      <li>Design an idempotent seat-lock API — what should the client send, and where is dedup state stored?</li>
      <li>How would you detect and mitigate fraudulent or scripted booking requests?</li>
      <li>How would you test that your seat-locking logic is actually race-condition-free before launch?</li>
      <li>How would you handle a full region outage in the middle of a live ticket release?</li>
      <li>Explain the trade-off between pessimistic and optimistic concurrency control for seat inventory.</li>
      <li>How do you scale the Seat Inventory Service independently for one blockbuster without over-provisioning every other show?</li>
      <li>Design the notification fan-out when a booking is confirmed (SMS, email, push, e-ticket).</li>
      <li>How would you generate and validate QR-code e-tickets to prevent duplication/fraud at the venue?</li>
      <li>What monitoring signals would page you at 3 AM during a release-day spike?</li>
      <li>How do you handle a user closing the browser tab mid-checkout — does the seat get released?</li>
      <li>Design the cancellation/refund flow — what happens to the seat and to the payment?</li>
      <li>How would event sourcing help reconcile Redis lock state against the database after an incident?</li>
      <li>What's the failure mode if the payment gateway is completely down during a release?</li>
      <li>How do you prevent a cache stampede when hundreds of thousands poll the same show's seat map?</li>
      <li>Compare Kafka vs RabbitMQ for booking-confirmation events vs notification dispatch.</li>
      <li>How would you migrate the seat-inventory schema with zero downtime during ongoing bookings?</li>
      <li>Design a circuit-breaker policy for the payment gateway integration.</li>
      <li>How would this design change for a last-minute walk-in booking flow at the theater counter?</li>
      <li>What would you change to support dynamic/surge pricing on high-demand seats or shows?</li>
    </ol>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">23. Follow-up Questions</div>
  <div class="ref-body">
    <ul>
      <li>"You said Redis SET NX PX — what happens if the pod holding that connection dies right after acquiring the lock but before responding to the client?"</li>
      <li>"How would your waiting-room admission rate adapt if the Seat Inventory Service itself starts slowing down mid-spike?"</li>
      <li>"What if the same user opens two browser tabs and tries to lock the same seat from both?"</li>
      <li>"How do you reconcile Redis and Postgres if they disagree about a seat's status after an incident?"</li>
      <li>"Your lock TTL is 5 minutes — what data do you have to justify that number, and what happens if you're wrong?"</li>
    </ul>
    <div class="tip-box" style="margin-top:10px;">✅ Interviewers push on your first answer's weak point — always state the failure mode of your own solution (e.g., "the lock TTL is a business tuning knob, and here's what happens at each extreme") before they ask.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">24. Real World Technologies</div>
  <div class="ref-body">
    <p><strong>BookMyShow</strong> (India's dominant ticketing platform) has publicly discussed using queueing/waiting-room systems and Redis-based inventory locking to survive blockbuster release-day spikes. <strong>Ticketmaster</strong> faces the identical seat-inventory problem at global scale for concerts/sports and famously uses a virtual waiting room (Ticketmaster's "Verified Fan" / queueing system) for extreme-demand on-sales. <strong>Fandango</strong> and <strong>AMC Theatres</strong> apply similar seat-hold-then-confirm patterns for movie ticketing. <strong>StubHub</strong> and <strong>SeatGeek</strong> deal with the secondary-market version of the same inventory-locking problem. The common thread across all of them: a fast, TTL-based distributed lock in front of a durable, re-validated source of truth, plus a queueing layer to throttle demand spikes at the front door rather than let them hit the database.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">25. Design Evolution by Scale</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Scale</div><div>Architecture</div></div>
      <div class="pt-row"><div class="pt-name">1K users</div><div>Single monolith, one PostgreSQL instance, seat status updated via a simple transaction with SELECT...FOR UPDATE — no separate lock cache needed yet</div></div>
      <div class="pt-row"><div class="pt-name">100K users</div><div>Split into a few services; introduce Redis as a seat-lock cache in front of Postgres; single-region deployment; basic rate limiting added</div></div>
      <div class="pt-row"><div class="pt-name">1M users</div><div>Full microservices split (Catalog/Seat Inventory/Booking/Payment); Kafka introduced for async events; first version of a waiting room for known high-demand releases</div></div>
      <div class="pt-row"><div class="pt-name">10M users</div><div>show_id-based sharding across DB and cache; waiting room becomes a first-class always-on service; Elasticsearch added for search-heavy browsing</div></div>
      <div class="pt-row"><div class="pt-name">100M users</div><div>Multi-region active-active; dedicated burst capacity pre-provisioned for scheduled mega-releases; bot/scalper detection ML models added</div></div>
      <div class="pt-row"><div class="pt-name">1B users</div><div>Edge-computed waiting-room admission decisions near the user's region; global event backbone with regional isolation to contain blast radius; per-mega-release dedicated infrastructure pools spun up ahead of time</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">26. Final Architecture Diagram</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step blue">Web App</div>
      <div class="flow-step blue">Mobile App</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">GeoDNS (nearest region routing) → CDN (posters/banners/static assets)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">WAF / DDoS Protection → Load Balancer</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step red">Virtual Waiting Room (admission-rate throttle, CAPTCHA on entry during flash sales)</div>
      <div class="flow-arrow">↓ admitted requests only</div>
      <div class="flow-step">API Gateway (authn, rate limit, routing, Admission-Token check)</div>
      <div class="flow-arrow">↓ fan-out to stateless services</div>
      <div class="flow-step green">Catalog Svc</div>
      <div class="flow-step green">Seat Inventory Svc</div>
      <div class="flow-step green">Booking Svc</div>
      <div class="flow-step green">Payment Svc</div>
      <div class="flow-step green">Search Svc</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Redis (seat locks, seat-map cache) · PostgreSQL (bookings, inventory, sharded by show_id) · Elasticsearch (search) · Blob Storage (posters/e-tickets)</div>
      <div class="flow-arrow">↓ async</div>
      <div class="flow-step">Kafka event backbone → Notification Svc · Analytics Pipeline · Fraud/Bot Detection</div>
      <div class="flow-arrow">↓ observability on every hop</div>
      <div class="flow-step red">Prometheus/Grafana · OpenTelemetry Tracing · Centralized Logging · Key Vault (secrets)</div>
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
          <li>Seat inventory is fundamentally a distributed-locking problem, not just a database schema problem</li>
          <li>The waiting room is not an optional nicety — it's the mechanism that makes the rest of the architecture viable under a 50-100x spike</li>
          <li>Strong consistency is required only at the exact point of seat assignment and payment confirmation — everywhere else (search, catalog, browsing), eventual consistency is fine and far cheaper</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Pros of This Design</div>
        <ul><li>show_id sharding isolates one blockbuster's contention from every other concurrently running show</li><li>Fast TTL-based lock release means inventory is never needlessly held hostage on payment failure</li><li>Waiting room protects the entire downstream stack from an unbounded spike</li></ul>
      </div>
      <div>
        <div class="ans-label">Cons / Open Risks</div>
        <ul><li>Waiting room adds real user-facing friction (queue wait) that a competitor without one might not have</li><li>Operational complexity of keeping Redis lock state and Postgres inventory state reconciled after incidents</li><li>Tuning the right lock TTL and admission rate is a business judgment call, not a pure engineering one</li></ul>
        <div class="ans-label" style="margin-top:12px;">Best Practices</div>
        <ul><li>Always release a lock immediately on known failure (payment decline) rather than waiting for TTL expiry</li><li>Treat the waiting room as a resilience feature, not just a queueing UX — it's what keeps the database alive</li></ul>
      </div>
    </div>
  </div>
</div>
`;
