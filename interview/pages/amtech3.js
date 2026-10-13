window.Pages = window.Pages || {};
window.Pages['amtech3'] = `
  <div class="page-header">
    <div class="breadcrumb">Home › <span>AM Tech Software – Round 3</span></div>
    <h1>🚌 AM Tech Software — Round 3: City Bus Tracking System Design</h1>
    <p>IoT ingestion · real-time ETA · stop displays · mobile and web apps · Redis and database consistency · failover · fan-out · safe ETA algorithm rollout</p>
  </div>
  <div class="stats-bar" style="margin-bottom:20px;">
    <div class="stat-box"><div class="num">11</div><div class="label">Questions</div></div>
    <div class="stat-box"><div class="num">1</div><div class="label">Full System Design</div></div>
    <div class="stat-box"><div class="num">10</div><div class="label">Follow-Ups</div></div>
  </div>
  <div class="alert" style="margin-bottom:16px;">
    <strong>📝 Reading note</strong>
    <p>The follow-up about connecting "Battery" to an App Service appears to carry over wording from the battery-swapping platform discussion. Here the equivalent device is the <strong>bus GPS tracker</strong>, so Q2 answers it for that device — the reasoning is the same for any IoT device fleet. All numbers marked <em>assumption</em> are my own planning figures, not given in the question.</p>
  </div>
  <div class="qa-list">

    <div class="qa-card">
      <div class="qa-num">Q1</div>
      <div class="qa-body">
        <div class="qa-question">A city has 10,000 bus stops and 5,000 buses on hundreds of routes. Today each stop display shows the next 3 arrivals like a queue — the 4th bus is not shown until one of the first three arrives. Design a new system: bus GPS tracking, stop displays, mobile app, web app, real-time locations, route and stop information, arrival predictions, favorites, search, and the ability to see all buses across all stops.</div>
        <div class="qa-answer">

          <div class="ans-block"><div class="ans-label">Step 1 — Clarify requirements, then state assumptions out loud</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 2.4fr;"><div>Area</div><div>Requirement</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.4fr;"><div class="dt-name">Functional</div><div>Live bus locations · route and stop information · ETA predictions per bus per stop · stop displays · mobile app · web app · favorites (buses, routes, stops) · search any bus or stop · see all buses operating across all stops</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.4fr;"><div class="dt-name">Freshness</div><div>Positions and ETAs visible within a few seconds of the bus moving; a stale bus must be shown as stale, never as live</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.4fr;"><div class="dt-name">Availability</div><div>Passenger-facing reads stay up when the relational database or any one component fails — live tracking must not depend on the primary database</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.4fr;"><div class="dt-name">Scalability</div><div>Fleet and stop counts will grow; adding buses must be a configuration change, not a redesign</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.4fr;"><div class="dt-name">Interoperability</div><div>Publish static data as GTFS and live data as GTFS-Realtime so third-party map apps can consume it</div></div>
          </div>
          <div class="code-box">Capacity estimate (all inputs below are ASSUMPTIONS):
  Buses 5,000 · GPS ping every 5 s      →  ~1,000 messages/s  (~86 million/day)
  ~200 bytes per message                →  ~200 KB/s          (~17 GB/day raw)
  ETA recalculation: next ~10 stops per ping
                                         →  ~10,000 ETA updates/s
  Displays 10,000 · refresh every 10-30 s →  ~300-1,000 reads/s (served from cache)
  Concurrent app users at peak: e.g. 100,000 (unknown — ask the interviewer)

Conclusion: ingestion is modest; the real work is FAN-OUT to viewers and
keeping ETAs fresh and correct, not raw telemetry volume.</div></div>

          <div class="ans-block"><div class="ans-label">Step 2 — Why the current display behaves like a queue, and the fix</div>
          <div class="code-box">TODAY: the display holds 3 slots. A bus only ENTERS the list when a slot
frees up, so the list is a bounded queue fed by arrivals. Bus #4 exists and
is tracked, but nothing renders it until bus #1 arrives.

NEW: the display is a VIEW over live predictions, not a queue.
   query:  all buses whose upcoming stops include THIS stop,
           ETA within a horizon (for example 60 minutes),
           sorted by ETA
   render: top N that fit on screen; page or rotate through the rest,
           with a "+4 more" indicator. Bus #4 appears the moment its
           ETA is inside the horizon — no slot has to free up first.</div>
          <div class="tip-box">✅ This is the key design insight for the interviewer: the old behaviour is a data-model mistake (a queue of 3) not a hardware limit. Compute predictions for every bus-to-stop pair inside the horizon and let each client decide how many it can show.</div></div>

          <div class="ans-block"><div class="ans-label">Step 3a — Layered architecture: every layer (edge, APIM, API, microservices, cache, database with replication)</div>
          <div class="lyr-wrap"><div class="lyr-box">
            <div class="lyr-two">
              <div>
                <div class="lyr-cap">INGESTION PATH — writes</div>
                <div class="lyr-card"><b>🚌 5,000 buses</b><span>GPS: lat, lon, speed, heading, timestamp, trip ID</span></div>
                <div class="lyr-down">↓</div>
                <div class="lyr-card"><b>Device Ingestion</b><span>IoT Hub (MQTT) or a thin ingestion API · auth · validation · throttling</span></div>
                <div class="lyr-down">↓</div>
                <div class="lyr-card hl"><b>Event Streaming Platform</b><span>Partitioned by bus id · durable · replayable</span></div>
              </div>
              <div>
                <div class="lyr-cap">REQUEST PATH — reads</div>
                <div class="lyr-card"><b>🖥️ 📱 🌐 Clients</b><span>Displays · Mobile · Web · third-party feeds</span></div>
                <div class="lyr-down">↓</div>
                <div class="lyr-card"><b>Edge</b><span>Front Door · CDN · WAF — caches static data, absorbs attacks</span></div>
                <div class="lyr-down">↓</div>
                <div class="lyr-card"><b>APIM Layer</b><span>API Management · JWT validation · rate limits · quotas · versioning · routing</span></div>
                <div class="lyr-down">↓</div>
                <div class="lyr-grp"><b>API Layer (thin, stateless)</b>
                  <div class="lyr-grid c2">
                    <div class="lyr-mini"><b>Mobile BFF</b><span>one call per screen</span></div>
                    <div class="lyr-mini"><b>Web BFF</b><span>maps and search</span></div>
                    <div class="lyr-mini"><b>Display API</b><span>tiny payloads</span></div>
                    <div class="lyr-mini"><b>Real-time Hub</b><span>WebSocket groups</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="lyr-down">↓ stream consumers (left) · service calls from the API layer (right)</div>
            <div class="lyr-grp"><b>Microservices Layer (AKS)</b>
              <div class="lyr-two" style="gap:12px;">
                <div>
                  <div class="lyr-cap">STREAM-PROCESSING SERVICES</div>
                  <div class="lyr-grid c2">
                    <div class="lyr-mini"><b>Vehicle State</b><span>validate · order · map-match</span></div>
                    <div class="lyr-mini"><b>ETA Engine</b><span>predict</span></div>
                    <div class="lyr-mini"><b>Stop Predictions</b><span>all upcoming buses per stop</span></div>
                    <div class="lyr-mini"><b>Live Event Publisher</b><span>conflated deltas</span></div>
                  </div>
                </div>
                <div>
                  <div class="lyr-cap">REQUEST-SERVING SERVICES</div>
                  <div class="lyr-grid c2">
                    <div class="lyr-mini"><b>Tracking Service</b><span>live read model</span></div>
                    <div class="lyr-mini"><b>Reference Data</b><span>routes · stops · GTFS</span></div>
                    <div class="lyr-mini"><b>Search</b><span>stops · routes · buses</span></div>
                    <div class="lyr-mini"><b>Favorites + Notify</b><span>alerts · push</span></div>
                    <div class="lyr-mini"><b>Display Manager</b><span>config · health</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="lyr-down">↓ live state read and written · reference data cached · cache miss falls through</div>
            <div class="lyr-grp"><b>Cache Layer</b>
              <div class="lyr-grid c3">
                <div class="lyr-mini"><b>CDN + HTTP cache</b><span>static data; 2-5 s API responses</span></div>
                <div class="lyr-mini"><b>Redis — primary + replica</b><span>bus state · stop arrivals · geo · zone-redundant</span></div>
                <div class="lyr-mini"><b>In-process L1 (HybridCache)</b><span>reference data · versioned keys</span></div>
              </div>
            </div>
            <div class="lyr-down">↓ cache miss on reference data · writes · history</div>
            <div class="lyr-grp hl"><b>Database Layer — with Replication</b>
              <div style="display:grid;grid-template-columns:1fr 1.3fr 1fr;gap:10px;align-items:center;">
                <div class="lyr-mini"><b>PostgreSQL PRIMARY</b><span>zone 1 · all writes (admin changes, favorites)</span></div>
                <div class="lyr-col">
                  <div><div class="lyr-small">→ synchronous · high availability</div><div class="lyr-mini"><b>Standby — zone 2</b><span>automatic failover, no committed data lost</span></div></div>
                  <div><div class="lyr-small">→ asynchronous</div><div class="lyr-mini"><b>Read replica(s) — same region</b><span>reads, reports, search-index builds</span></div></div>
                  <div><div class="lyr-small">→ asynchronous · cross-region</div><div class="lyr-mini"><b>DR replica — region 2</b><span>disaster recovery, bounded loss</span></div></div>
                </div>
                <div class="lyr-col">
                  <div class="lyr-mini"><b>Search Index</b><span>rebuilt from reference data</span></div>
                  <div class="lyr-mini"><b>Data Lake / ADX</b><span>history · ML training</span></div>
                </div>
              </div>
            </div>
          </div></div>
          <div class="tip-box">✅ Two paths meet in the middle: telemetry flows down the left into services that write Redis; passengers flow down the right through the edge, APIM and the API layer into services that read Redis first and the database only on a miss. The database is never on the live path.</div></div>

          <div class="ans-block"><div class="ans-label">Step 3a-2 — Telemetry to screen (reference view)</div>
          <div style="max-width:560px;margin:0 auto;border:1px solid var(--border);border-radius:14px;padding:16px;background:var(--surface);">
            <div style="border:1px solid var(--border);background:var(--surface);border-radius:10px;padding:10px 14px;text-align:center;"><div style="font-weight:700;color:var(--text);font-size:13px;">🚌 5,000 buses with GPS devices</div><div style="color:var(--text2);font-size:11px;margin-top:2px;">Latitude, longitude, speed, heading, timestamp, trip ID</div></div>
            <div style="text-align:center;color:var(--muted);padding:4px 0;font-size:14px;">↓</div>
            <div style="border:1px solid var(--border);background:var(--surface);border-radius:10px;padding:10px 14px;text-align:center;"><div style="font-weight:700;color:var(--text);font-size:13px;">Device Ingestion</div><div style="color:var(--text2);font-size:11px;margin-top:2px;">IoT Hub over MQTT — or a thin GPS Ingestion API over HTTPS · Authentication · Validation · Rate limiting · Event publishing</div></div>
            <div style="text-align:center;color:var(--muted);padding:4px 0;font-size:14px;">↓</div>
            <div style="border:1px solid var(--accent-bd);background:var(--accent-bg);border-radius:10px;padding:10px 14px;text-align:center;"><div style="font-weight:700;color:var(--text);font-size:13px;">Event Streaming Platform</div><div style="color:var(--text2);font-size:11px;margin-top:2px;">IoT Hub built-in endpoint / Event Hubs / Kafka · Durable event stream · Partitioned by bus id</div></div>
            <div style="text-align:center;color:var(--muted);padding:4px 0;font-size:14px;">↓</div>
            <div style="border:1px solid var(--border);border-radius:10px;padding:12px;background:var(--surface);">
              <div style="text-align:center;font-weight:700;color:var(--text);font-size:13px;margin-bottom:8px;">Real-time processing layer</div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                <div style="border:1px solid var(--border);background:var(--surface2);border-radius:8px;padding:10px;text-align:center;"><div style="font-weight:700;color:var(--text);font-size:12px;">Vehicle State</div><div style="color:var(--text2);font-size:10px;margin-top:2px;">Latest GPS and trip progress · validate, de-duplicate, order, map-match</div></div>
                <div style="border:1px solid var(--border);background:var(--surface2);border-radius:8px;padding:10px;text-align:center;"><div style="font-weight:700;color:var(--text);font-size:12px;">ETA Engine</div><div style="color:var(--text2);font-size:10px;margin-top:2px;">Route matching and predictions</div></div>
                <div style="border:1px solid var(--border);background:var(--surface2);border-radius:8px;padding:10px;text-align:center;"><div style="font-weight:700;color:var(--text);font-size:12px;">Stop Predictions</div><div style="color:var(--text2);font-size:10px;margin-top:2px;">All upcoming buses per stop — not just 3</div></div>
                <div style="border:1px solid var(--border);background:var(--surface2);border-radius:8px;padding:10px;text-align:center;"><div style="font-weight:700;color:var(--text);font-size:12px;">Live Event Publisher</div><div style="color:var(--text2);font-size:10px;margin-top:2px;">Changed predictions and locations as conflated deltas</div></div>
              </div>
            </div>
            <div style="text-align:center;color:var(--muted);padding:4px 0;font-size:14px;">↓</div>
            <div style="border:1px solid var(--border);background:var(--surface);border-radius:10px;padding:10px 14px;text-align:center;"><div style="font-weight:700;color:var(--text);font-size:13px;">Real-time Read and Delivery Layer</div><div style="color:var(--text2);font-size:11px;margin-top:2px;">Redis · API services · WebSocket / SignalR · Push notifications</div></div>
            <div style="text-align:center;color:var(--muted);padding:4px 0;font-size:14px;">↓</div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;">
              <div style="border:1px solid var(--border);background:var(--surface2);border-radius:8px;padding:10px;text-align:center;"><div style="font-weight:700;color:var(--text);font-size:12px;">🖥️ Displays</div><div style="color:var(--text2);font-size:10px;margin-top:2px;">All upcoming buses within the horizon, paged</div></div>
              <div style="border:1px solid var(--border);background:var(--surface2);border-radius:8px;padding:10px;text-align:center;"><div style="font-weight:700;color:var(--text);font-size:12px;">📱 Mobile</div><div style="color:var(--text2);font-size:10px;margin-top:2px;">Live buses and favorites</div></div>
              <div style="border:1px solid var(--border);background:var(--surface2);border-radius:8px;padding:10px;text-align:center;"><div style="font-weight:700;color:var(--text);font-size:12px;">🌐 Web</div><div style="color:var(--text2);font-size:10px;margin-top:2px;">Search and live maps</div></div>
            </div>
          </div>
          <div class="warn-box">⚠️ A typical reference flow shows displays with "Next 3 buses" — that is the exact limitation to remove. Stop Predictions keeps every upcoming bus per stop and each display shows as many as fit, paging through the rest.</div></div>

          <div class="ans-block"><div class="ans-label">Step 3a-3 — Data flow diagram: from the bus to the passenger's mobile</div>
          <div class="lyr-wrap"><div class="lyr-box" style="max-width:640px;">
            <div class="lyr-card"><b>① 🚌 Bus GPS tracker</b><span>GNSS fix every ~5 s → report { busId, seq, ts, lat, lon, speed, heading } → written to the local flash buffer first</span></div>
            <div class="lyr-down">↓ MQTT over TLS on 4G · per-device X.509 certificate · retried until acknowledged</div>
            <div class="lyr-card"><b>② ☁️ IoT Hub</b><span>authenticates the device · accepts the report · routes it to the event stream</span></div>
            <div class="lyr-down">↓ partition key = busId — one bus, one ordered partition</div>
            <div class="lyr-card hl"><b>③ Event stream</b><span>durable and retained · ordered per bus · replayable</span></div>
            <div class="lyr-down">↓ consumer group — processors read at their own pace</div>
            <div class="lyr-card"><b>④ Vehicle State (stream processor)</b><span>validate · drop duplicates and late reports · map-match to the route · detect stop arrival</span></div>
            <div class="lyr-down">↓ conditional write — only if seq is newer</div>
            <div class="lyr-grp"><b>Redis — live state</b>
              <div class="lyr-grid c3">
                <div class="lyr-mini"><b>bus:{id}</b><span>latest position, speed, trip</span></div>
                <div class="lyr-mini"><b>geo:buses</b><span>map-area queries</span></div>
                <div class="lyr-mini"><b>stop:{id}:arrivals</b><span>sorted by ETA</span></div>
              </div>
            </div>
            <div class="lyr-down">↓ a changed bus triggers recalculation</div>
            <div class="lyr-card"><b>⑤ ETA Engine + Stop Predictions</b><span>ETA for the next ~10 stops of that bus → update each stop's arrival list</span></div>
            <div class="lyr-down">↓ only what changed</div>
            <div class="lyr-card"><b>⑥ Live Event Publisher</b><span>conflate: newest value per group every 1-5 s → groups bus:201A · route:201 · stop:MG-ROAD</span></div>
            <div class="lyr-two" style="gap:12px;">
              <div><div class="lyr-down">↓ WebSocket — app in the foreground</div><div class="lyr-card"><b>Real-time Hub</b><span>Web PubSub / SignalR groups</span></div></div>
              <div><div class="lyr-down">↓ push — app in the background or closed</div><div class="lyr-card"><b>Favorites + Notification</b><span>alert rule matched → FCM / APNs</span></div></div>
            </div>
            <div class="lyr-down">↓ delta arrives on the phone</div>
            <div class="lyr-card hl"><b>⑦ 📱 Passenger's mobile app</b><span>merge the delta into local state → redraw map and arrival list → show "updated 3 s ago" → grey the bus out if updates stop</span></div>
          </div></div>
          <div class="code-box">When the passenger opens the app (snapshot path):
  Mobile app -> Edge + CDN -> APIM -> Mobile BFF -> Tracking Service -> Redis (current state)
  The response returns current arrivals and positions; the app then joins its stop, route or bus
  groups and receives only deltas. If the socket cannot connect it polls the same endpoint, which
  is served from a short HTTP cache.</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.5fr 1fr 2.2fr;"><div>Hop</div><div>Typical time</div><div>Note (illustrative — measure in production)</div></div>
            <div class="dt-row" style="grid-template-columns:1.5fr 1fr 2.2fr;"><div class="dt-name">Reporting interval (age of the data)</div><div>0-5 s</div><div>The bus may have moved since its last ping; the main floor on freshness</div></div>
            <div class="dt-row" style="grid-template-columns:1.5fr 1fr 2.2fr;"><div class="dt-name">Device to IoT Hub over 4G</div><div>~50-300 ms</div><div>Cellular latency varies; device buffers if the link is down</div></div>
            <div class="dt-row" style="grid-template-columns:1.5fr 1fr 2.2fr;"><div class="dt-name">IoT Hub to processor</div><div>~50-150 ms</div><div>Consumer reads from the stream</div></div>
            <div class="dt-row" style="grid-template-columns:1.5fr 1fr 2.2fr;"><div class="dt-name">Validate, map-match, Redis write</div><div>~10-50 ms</div><div>Conditional write on seq</div></div>
            <div class="dt-row" style="grid-template-columns:1.5fr 1fr 2.2fr;"><div class="dt-name">ETA and stop-list update</div><div>~10-50 ms</div><div>Next ~10 stops per ping</div></div>
            <div class="dt-row" style="grid-template-columns:1.5fr 1fr 2.2fr;"><div class="dt-name">Conflation wait</div><div>1-5 s</div><div>The largest tunable part: trades freshness against fan-out cost</div></div>
            <div class="dt-row" style="grid-template-columns:1.5fr 1fr 2.2fr;"><div class="dt-name">Real-time hub to phone</div><div>~50-300 ms</div><div>WebSocket; push notifications take longer and are best-effort</div></div>
            <div class="dt-row" style="grid-template-columns:1.5fr 1fr 2.2fr;"><div class="dt-name">Render on the phone</div><div>&lt; 50 ms</div><div>Delta applied to local state</div></div>
            <div class="dt-row" style="grid-template-columns:1.5fr 1fr 2.2fr;"><div class="dt-name">Total from the GPS fix</div><div>~2-7 s typical</div><div>Dominated by the reporting interval and conflation, not by the cloud hops</div></div>
          </div>
          <div class="tip-box">✅ The cloud hops together take well under a second. Most of the end-to-end delay is deliberate — the GPS reporting interval and the conflation window — so shorten them only if fan-out cost and device battery allow.</div></div>

          <div class="ans-block"><div class="ans-label">Step 3b — Component responsibilities (high-level design of each box)</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.2fr 1.6fr;"><div>Component</div><div>Responsibility</div><div>Technology</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.6fr;"><div class="dt-name">GPS device</div><div>Report position, speed, heading with a timestamp and sequence number; buffer when offline; take config (ping rate) from the cloud</div><div>On-board unit, MQTT over TLS, X.509 certificate</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.6fr;"><div class="dt-name">Device ingestion</div><div>Authenticate devices, throttle per device, validate, publish to the stream</div><div>IoT Hub (or a thin HTTPS ingestion API)</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.6fr;"><div class="dt-name">Event streaming</div><div>Durable, partitioned (by bus id), replayable stream that decouples producers from processors</div><div>IoT Hub endpoint / Event Hubs / Kafka</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.6fr;"><div class="dt-name">Vehicle State</div><div>Keep the latest trusted position and trip progress per bus; de-duplicate, drop late events, map-match to the route, detect stop arrivals</div><div>Stateless workers on AKS, conditional writes to Redis</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.6fr;"><div class="dt-name">ETA Engine</div><div>Predict time to each upcoming stop from distance, live and historical speed, and dwell time; flag estimated or stale values</div><div>In-process model, versioned for safe rollout</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.6fr;"><div class="dt-name">Stop Predictions</div><div>Maintain the list of ALL upcoming buses per stop, sorted by ETA — the fix for the 3-slot queue</div><div>Redis sorted set per stop</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.6fr;"><div class="dt-name">Live Event Publisher</div><div>Publish only what changed, conflated every 1-5 s, to groups per stop, route and bus</div><div>Web PubSub / SignalR Service</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.6fr;"><div class="dt-name">Read and delivery layer</div><div>Serve snapshots and deltas to clients; push notifications for favorites; fall back to cached polling</div><div>Tracking API, Redis, FCM / APNs</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.6fr;"><div class="dt-name">Edge + APIM layer</div><div>TLS, WAF, CDN caching; then one governed front door — JWT validation, rate limits and quotas per client, versioning, routing, short response caching</div><div>Front Door, API Management</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.6fr;"><div class="dt-name">API layer</div><div>Thin stateless backends-for-frontends (mobile, web, display, public feed): aggregate calls, shape payloads, add cache headers — no business rules</div><div>ASP.NET Core on AKS</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.6fr;"><div class="dt-name">Microservices layer</div><div>Domain services that own their data: stream-processing services keep live state; request-serving services answer queries. Sync calls from the API layer, async events between services, outbox for reliability</div><div>AKS, REST/gRPC, event broker</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.6fr;"><div class="dt-name">Cache layer</div><div>Three levels: CDN and HTTP cache, in-process L1, and Redis. Live keys expire if a bus goes silent; reference data uses versioned keys and single-flight refill</div><div>CDN, HybridCache, managed Redis (primary + replica)</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.6fr;"><div class="dt-name">Database with replication</div><div>Primary takes writes; synchronous standby in another zone for automatic failover with no committed loss; asynchronous read replicas for reads and reports; cross-region replica for DR with bounded loss</div><div>PostgreSQL + PostGIS, zone-redundant HA</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.6fr;"><div class="dt-name">Reference data</div><div>Routes, stops, timetables, favorites, search — correct and consistent, but off the live path</div><div>PostgreSQL + PostGIS, search index, CDN</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.6fr;"><div class="dt-name">History and analytics</div><div>Archive telemetry, arrivals and predictions for ETA training and backtesting</div><div>Data lake / Azure Data Explorer</div></div>
          </div>
          <div class="tip-box">✅ The complete component-by-component design — with spec sheets, data model, data flows and failure handling — is on the <strong>Interview Prep</strong> app under <strong>System Design → City Bus Tracking &amp; ETA</strong>.</div></div>

          <div class="ans-block"><div class="ans-label">Step 3c — Detailed component view (picture)</div>
          <div style="background:#0b0f19;border:1px solid #1f2937;border-radius:12px;padding:22px;overflow-x:auto;">
            <div style="min-width:760px;font-family:'Consolas','Courier New',monospace;">

              <div style="background:#2a2008;border:1px solid #b45309;border-radius:10px;padding:12px;margin-bottom:8px;">
                <div style="color:#fcd34d;font-size:11px;font-weight:700;letter-spacing:.04em;">① DEVICES — 5,000 bus GPS trackers</div>
                <div style="color:#fde68a;font-size:10px;margin-top:2px;">MQTT over TLS · per-device X.509 certificate · buffer locally when offline · config (ping rate) pushed from the cloud</div>
              </div>
              <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

              <div style="background:#1e1030;border:1px solid #7c3aed;border-radius:10px;padding:12px;margin-bottom:8px;">
                <div style="color:#c4b5fd;font-size:11px;font-weight:700;letter-spacing:.04em;">② INGESTION — Azure IoT Hub (device identity, provisioning via DPS, twins) → Event Hub-compatible endpoint</div>
                <div style="color:#ddd6fe;font-size:10px;margin-top:2px;">Partitioned by busId · retains events so consumers can replay · decouples devices from processors</div>
              </div>
              <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

              <div style="background:#07241f;border:1px solid #0d9488;border-radius:10px;padding:12px;margin-bottom:8px;">
                <div style="color:#5eead4;font-size:11px;font-weight:700;letter-spacing:.04em;">③ STREAM PROCESSING — AKS workers (or Functions) in one consumer group</div>
                <div style="color:#99f6e4;font-size:10px;margin-top:2px;">validate · de-duplicate · drop out-of-order · map-match to route · detect stop arrival (geofence) · compute ETA · publish deltas</div>
              </div>
              <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

              <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:8px;">
                <div style="background:#2a0f14;border:1px solid #be123c;border-radius:10px;padding:10px;">
                  <div style="color:#fda4af;font-size:11px;font-weight:700;">⑤a REDIS (live state)</div>
                  <div style="color:#fecdd3;font-size:10px;margin-top:2px;">latest bus position, per-stop arrival lists, geo index — TTL-based</div>
                </div>
                <div style="background:#0c2415;border:1px solid #16a34a;border-radius:10px;padding:10px;">
                  <div style="color:#86efac;font-size:11px;font-weight:700;">⑤b POSTGRESQL (reference data)</div>
                  <div style="color:#bbf7d0;font-size:10px;margin-top:2px;">stops, routes, schedules, users, favorites — zone-redundant HA plus read replica</div>
                </div>
                <div style="background:#1e1030;border:1px solid #7c3aed;border-radius:10px;padding:10px;">
                  <div style="color:#c4b5fd;font-size:11px;font-weight:700;">⑤c HISTORY / ANALYTICS</div>
                  <div style="color:#ddd6fe;font-size:10px;margin-top:2px;">raw telemetry via Event Hubs Capture to data lake / time-series store — ETA training and backtesting</div>
                </div>
              </div>
              <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

              <div style="background:#2a2008;border:1px solid #b45309;border-radius:10px;padding:12px;margin-bottom:8px;">
                <div style="color:#fcd34d;font-size:11px;font-weight:700;letter-spacing:.04em;">⑥ API + REAL-TIME DELIVERY</div>
                <div style="color:#fde68a;font-size:10px;margin-top:2px;">API Management → stateless API on AKS (REST) · Azure Web PubSub / SignalR Service (WebSocket groups per bus, route, stop) · push notifications · CDN for static data</div>
              </div>
              <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

              <div style="background:#07241f;border:1px solid #0d9488;border-radius:10px;padding:12px;">
                <div style="color:#5eead4;font-size:11px;font-weight:700;letter-spacing:.04em;">⑦ CLIENTS — 10,000 stop displays · mobile app · web app · GTFS-Realtime feed for third parties</div>
              </div>
            </div>
          </div>
          <div class="tip-box">✅ The live path is device → IoT Hub → processors → Redis → real-time delivery. The relational database is NOT on that path — it supplies reference data (which is heavily cached), so a database outage does not stop live tracking.</div></div>

          <div class="ans-block"><div class="ans-label">Step 4 — Data model</div>
          <div class="code-box">POSTGRESQL (source of truth for reference data)
  stops(stop_id, name, lat, lon, ...)
  routes(route_id, name, direction, polyline, version)
  route_stops(route_id, direction, seq, stop_id, dist_from_start_m)
  buses(bus_id, device_id, route_id, status)
  trips / schedules(trip_id, route_id, start_time, ...)       -- planned timetable
  users(user_id, ...)   favorites(user_id, kind, ref_id)      -- kind: bus | route | stop

REDIS (live state — derived, rebuildable)
  bus:{busId}              HASH  lat, lon, speed, heading, routeId, tripId,
                                 nextStopId, seq, ts          (TTL about 30 s, assumption)
  geo:buses                GEO   busId -> position             (for map-area queries)
  route:{routeId}:buses    SET   busIds currently on the route
  stop:{stopId}:arrivals   ZSET  member busId+tripId, score = ETA epoch seconds

DEVICE MESSAGE (each ping)
  { "busId": "201A", "seq": 918273, "ts": "2026-10-12T09:15:04Z",
    "lat": 12.9716, "lon": 77.5946, "speedKmh": 24.5, "heading": 87 }</div></div>

          <div class="ans-block"><div class="ans-label">Step 5 — How ETA is computed (start simple, then improve)</div>
          <div class="code-box">1. MAP-MATCH the raw GPS point onto the route polyline (GPS drifts).
2. Find the bus's progress along the route and its NEXT stop.
3. For each upcoming stop (next ~10) estimate:
     travel time = sum over road segments of  length / expected speed
     dwell time  = expected stop time at each stop in between
   expected speed = blend of live speed and historical speed for that
                    segment at this hour and weekday.
4. ETA = now + travel time + dwell time.
5. Detect ARRIVAL via a geofence around the stop — this also produces the
   ground truth used later to score ETA accuracy.</div>
          <div class="ans-block"><div class="ans-label">In code — ETA calculation</div>
          <div class="code-box">public double EtaSeconds(BusState bus, Stop target, DateTimeOffset now)
{
    var segments = _route.SegmentsBetween(bus.SnappedPosition, target);
    double seconds = 0;

    foreach (var seg in segments)
    {
        var speed = _speedModel.Expected(seg, now, bus.LiveSpeedMps);   // live + historical
        seconds += seg.LengthMeters / Math.Max(speed, 1.0);              // guard against divide by zero
    }

    seconds += segments.Count(s =&gt; s.EndsAtStop) * _dwellModel.Expected(now);
    return seconds;
}</div></div>
          <div class="warn-box">⚠️ Real-world problems the interviewer may probe: GPS drift and tunnels (stale or jumping points), buses bunching, route detours, a bus waiting at a terminus for its scheduled departure, and the first few minutes after a trip starts when there is no live history. Mention that each has a rule — for example, hold the schedule-based ETA until the bus is moving.</div></div>

          <div class="ans-block"><div class="ans-label">Step 6 — APIs and real-time channels</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.6fr 2.4fr;"><div>Endpoint / Channel</div><div>Purpose</div></div>
            <div class="dt-row" style="grid-template-columns:1.6fr 2.4fr;"><div class="dt-name">GET /stops/{id}/arrivals?horizon=60</div><div>All buses reaching this stop within the horizon, sorted by ETA — used by displays, mobile and web</div></div>
            <div class="dt-row" style="grid-template-columns:1.6fr 2.4fr;"><div class="dt-name">GET /routes/{id}/buses</div><div>Live buses on a route with position, next stop and ETA</div></div>
            <div class="dt-row" style="grid-template-columns:1.6fr 2.4fr;"><div class="dt-name">GET /buses/{id}</div><div>One bus: location, distance away, next stop, ETA</div></div>
            <div class="dt-row" style="grid-template-columns:1.6fr 2.4fr;"><div class="dt-name">GET /buses?bbox=...&amp;zoom=...</div><div>All buses inside the visible map area (Redis GEOSEARCH), clustered at low zoom so the payload stays small</div></div>
            <div class="dt-row" style="grid-template-columns:1.6fr 2.4fr;"><div class="dt-name">GET /search?q=...</div><div>Search buses, routes and stops (search index with prefix and typo tolerance)</div></div>
            <div class="dt-row" style="grid-template-columns:1.6fr 2.4fr;"><div class="dt-name">PUT/DELETE /me/favorites</div><div>Add or remove favorite bus, route or stop</div></div>
            <div class="dt-row" style="grid-template-columns:1.6fr 2.4fr;"><div class="dt-name">WebSocket groups: stop:{id}, route:{id}, bus:{id}</div><div>Server pushes updates only for what the client follows</div></div>
            <div class="dt-row" style="grid-template-columns:1.6fr 2.4fr;"><div class="dt-name">/gtfs and /gtfs-realtime</div><div>Standard feeds for third-party apps</div></div>
          </div>
          <div class="code-box">Passenger screen (from GET /routes/201/buses):
[
  { "bus": "201A", "distanceKm": 1.2, "nextStop": "MG Road",  "etaMin": 4,  "updatedSecAgo": 3 },
  { "bus": "201B", "distanceKm": 3.7, "nextStop": "Trinity",  "etaMin": 11, "updatedSecAgo": 5 }
]
-- "updatedSecAgo" lets the client grey out a bus whose GPS has gone quiet.</div></div>

          <div class="ans-block"><div class="ans-label">Step 7 — Stop displays, favorites, search and the all-buses map</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 2.6fr;"><div>Feature</div><div>Design</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Stop display</div><div>Subscribes to its own stop group (or polls a cached endpoint every 10-30 s if the hardware is low-power). Shows the top N by ETA, pages or rotates through the rest, shows "+k more", and shows an offline banner if it loses connectivity rather than frozen stale times.</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Favorites</div><div>Stored per user in the database, cached per user for a short time. The client joins the groups for its favorites; a notification service pushes "your bus is 3 minutes away" through FCM and APNs when an ETA crosses a threshold.</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Search</div><div>A search index (Azure AI Search, Elasticsearch, or PostgreSQL trigram for a small catalogue) over stops, routes and bus numbers. The index is rebuilt from reference data — it is not on the live path.</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">All buses, all stops</div><div>Map view uses viewport (bounding-box) queries on the Redis geo index, with server-side clustering when zoomed out. Never ship 5,000 buses to every client — send only what is on screen, and update by deltas.</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Step 8 — Security, observability, operations</div>
          <div class="code-box">SECURITY     per-device X.509 certificate (a stolen tracker can be revoked
             individually) · TLS everywhere · user auth with OAuth2/OIDC for
             favorites · API Management rate limits · displays use a read-only
             scoped token · private networking for databases and Redis.
OBSERVABILITY  OpenTelemetry traces and metrics · consumer lag per partition ·
             end-to-end latency (GPS timestamp to client render) · % of buses
             reporting · ETA accuracy dashboards (see Q9).
OPERATIONS   infrastructure as code · per-city or per-region deployment unit ·
             runbooks for IoT Hub quota, Redis failover, database failover.</div></div>

          <div class="tip-box">✅ Interview line: "The design separates three concerns: a durable ingestion pipeline with device identity, a derived real-time state in Redis that can be rebuilt from the stream, and reference data in PostgreSQL that is cached heavily. Because the live path never touches the primary database, the system degrades gracefully instead of failing — and the old display problem disappears because the display becomes a query over predictions, not a queue of three."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q2</div>
      <div class="qa-body">
        <div class="qa-question">Why are we connecting the device to an App Service instead of IoT Hub / Event Hub? Doesn't that add another network hop? Why not connect directly through IoT Hub?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer</div>
          In this design the devices do NOT go through an App Service — they connect straight to IoT Hub. If a diagram shows an App Service between the device and the pipeline, that is the weaker design, for the reasons below.</div>
          <div class="code-box">WEAKER:   Device ──HTTP──▶ App Service ──▶ Event Hub / processors
BETTER:   Device ──MQTT──▶ IoT Hub (Event Hub-compatible endpoint) ──▶ processors

The App Service in the first line is an extra hop that adds a bottleneck,
not just latency.</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.8fr 1.8fr;"><div>Concern</div><div>Device → App Service</div><div>Device → IoT Hub</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1.8fr;"><div class="dt-name">Device identity</div><div class="dt-no">You build registration, credentials and revocation yourself</div><div class="dt-yes">Per-device identity, X.509 or SAS, provisioning through DPS, individual revoke</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1.8fr;"><div class="dt-name">Protocol cost</div><div class="dt-no">Each report is an HTTP request with headers and often a new TLS handshake over a cellular link</div><div class="dt-yes">MQTT keeps one lightweight persistent connection — smaller messages, less battery and data</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1.8fr;"><div class="dt-name">Burst handling</div><div class="dt-no">A burst (all buses reconnecting after an outage) hits your web tier directly</div><div class="dt-yes">The hub absorbs and buffers; processors consume at their own pace</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1.8fr;"><div class="dt-name">Cloud-to-device</div><div class="dt-no">You must invent push, config and commands</div><div class="dt-yes">Device twin and commands — change the ping interval fleet-wide without touching firmware</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1.8fr;"><div class="dt-name">Scaling and coupling</div><div class="dt-no">Ingestion scales with the API, and the API scales with passenger traffic — two unrelated loads coupled together</div><div class="dt-yes">Ingestion scales on its own; passenger traffic never competes with telemetry</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1.8fr;"><div class="dt-name">Replay</div><div class="dt-no">Lost if the app is down while the bus reports</div><div class="dt-yes">Events are retained, so a processor can restart and replay from its checkpoint</div></div>
          </div>
          <div class="ans-block"><div class="ans-label">Is the extra hop a latency problem?</div>
          Honestly, no — an extra hop costs tens of milliseconds, and the business freshness target is seconds. The real costs of the App Service path are the missing device identity, protocol overhead, burst coupling and lack of buffering. So "one more hop" is the weaker argument; "wrong tool for device fleets" is the stronger one.</div>
          <div class="ans-block"><div class="ans-label">IoT Hub vs Event Hubs directly</div>
          <div class="decision-table">
            <div class="dt-row dt-header"><div>Choose</div><div>When</div></div>
            <div class="dt-row"><div class="dt-name">IoT Hub</div><div>Thousands of individual devices over cellular — you need per-device identity, provisioning, twins, commands and device-level throttling. This is the bus-tracker case.</div></div>
            <div class="dt-row"><div class="dt-name">Event Hubs directly</div><div>High-volume producers that are already trusted backend systems (gateways, services) where device management is not needed, or when Kafka protocol compatibility is the priority</div></div>
          </div>
          <div class="tip-box">✅ IoT Hub exposes an Event Hub-compatible endpoint, so it is not either-or: devices use IoT Hub, and the processing side reads it exactly like an Event Hub.</div></div>
          <div class="warn-box">⚠️ Check IoT Hub tier and quota against your message rate: it is sized per unit by messages per day, and twins and cloud-to-device need the Standard tier. At roughly 86 million messages a day (estimate in Q1) you must pick the tier and unit count deliberately — verify the current limits in the Azure documentation.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q3</div>
      <div class="qa-body">
        <div class="qa-question">How are the database and Redis kept in sync?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">First, they hold different kinds of data — so there are two sync stories</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 1.4fr 2.2fr;"><div>Data</div><div>Source of truth</div><div>How Redis stays correct</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.4fr 2.2fr;"><div class="dt-name">Live bus state</div><div>The event stream (IoT Hub / Event Hub)</div><div>Processors WRITE it to Redis directly. Redis is the serving store, the stream is the truth, and Redis can be rebuilt by replaying the stream — no database sync is involved at all</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.4fr 2.2fr;"><div class="dt-name">Reference data (stops, routes, schedules)</div><div>PostgreSQL</div><div>Cache-aside with versioned keys and event-driven invalidation (below)</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.4fr 2.2fr;"><div class="dt-name">User favorites</div><div>PostgreSQL</div><div>Cache-aside per user with a short TTL, invalidated on write</div></div>
          </div></div>
          <div class="ans-block"><div class="ans-label">Reference data — the mechanism</div>
          <div class="code-box">READ   (cache-aside)
  1. API asks cache for route:{id}:v{version}
  2. hit  -&gt; return
  3. miss -&gt; read PostgreSQL, store in cache with TTL plus random jitter, return
  4. concurrent misses for the same key share ONE database call (single-flight)

WRITE  (admin changes a route)
  1. update PostgreSQL and write an event to an OUTBOX table in the SAME transaction
  2. a publisher reads the outbox and emits "RouteChanged(id, newVersion)"
  3. subscribers delete or refresh route:{id}; clients and processors pick up
     the new version number
  -&gt; the cache is updated AFTER the database commit, never before, and never
     by a separate best-effort call that can be lost</div></div>
          <div class="ans-block"><div class="ans-label">In code — HybridCache with stampede protection</div>
          <div class="code-box">public async Task&lt;Route&gt; GetRouteAsync(int routeId, CancellationToken ct)
{
    var version = await _versions.GetAsync(routeId, ct);          // tiny, cached
    return await _cache.GetOrCreateAsync(
        $"route:{routeId}:v{version}",                              // version in the key
        async token =&gt; await _db.Routes.AsNoTracking()
                            .FirstAsync(r =&gt; r.Id == routeId, token),
        new HybridCacheEntryOptions { Expiration = TimeSpan.FromMinutes(30) },
        cancellationToken: ct);
}</div></div>
          <div class="tip-box">✅ Interview line: "I avoid synchronising live state between the database and Redis at all — the stream is the source of truth and Redis is a derived view. For reference data I accept eventual consistency with a bounded staleness: write the database, publish a change through an outbox, and use versioned cache keys so a reader never mixes old and new versions."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q4</div>
      <div class="qa-body">
        <div class="qa-question">What happens when the primary database is down? How are the replica promoted and data loss handled?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Design principle: the live path must not need the primary database</div>
          Live positions, ETAs and per-stop arrival lists are served from Redis and fed by the stream. So when the primary fails, passengers still see live buses. What degrades is writing favorites, admin changes, and reading reference data that is not already cached.</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.8fr 1.8fr;"><div>Topology</div><div>Promotion</div><div>Data loss (RPO)</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1.8fr;"><div class="dt-name">In-region standby (zone-redundant HA)</div><div>Automatic: the platform detects the failure, promotes the standby in another zone, and the same connection endpoint then points at it. Typically about a minute or two — check your tier's documented figure.</div><div class="dt-yes">Standby is updated synchronously, so committed transactions are not lost (RPO near zero)</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1.8fr;"><div class="dt-name">Cross-region read replica (disaster recovery)</div><div>Usually a deliberate, controlled decision to promote — automated if your runbook allows it — followed by repointing the application</div><div class="dt-no">Asynchronous: you can lose the replication-lag window. Monitor lag and alert on it</div></div>
          </div>
          <div class="code-box">How data loss is handled:
  • Synchronous standby in a second zone        -&gt; no committed data lost in a zone failure
  • Async cross-region replica                  -&gt; bounded loss = replication lag; alert if lag grows
  • Point-in-time restore + backups             -&gt; protection against corruption and human error
  • Idempotent writes with client request ids   -&gt; a retried write cannot double-apply
  • Fencing: the old primary is demoted and
    cannot accept writes after failover          -&gt; prevents split-brain (two writers)

What the application does during the failover window (about a minute or two):
  • reads    -&gt; Redis and read replicas keep serving; cache TTL extended for reference data
  • writes   -&gt; fail fast with a clear error, or queue favorites locally and replay
  • clients  -&gt; connection retry with exponential backoff and jitter, circuit breaker open
  • users    -&gt; the "live map" never notices</div>
          <div class="warn-box">⚠️ Common trap: promoting a lagging replica and silently accepting the loss. Decide the acceptable RPO per data type up front — for favorites a few seconds of loss is tolerable; for payments it would not be. Here nothing financial lives in the database, which is what makes asynchronous DR acceptable.</div>
          <div class="tip-box">✅ Interview line: "Zone-redundant synchronous HA gives automatic failover with essentially no data loss in-region; the cross-region replica gives disaster recovery with a bounded, monitored loss. And because the live path is Redis plus the stream, a primary-database failure is a degraded mode, not an outage."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q5</div>
      <div class="qa-body">
        <div class="qa-question">What kind of data do we cache, and how is stale cached data handled?</div>
        <div class="qa-answer">
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.2fr 1.3fr 1.6fr;"><div>Data</div><div>Where</div><div>Lifetime</div><div>Staleness handling</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.2fr 1.3fr 1.6fr;"><div class="dt-name">Routes, stops, polylines (rarely change)</div><div>CDN plus Redis plus in-process</div><div>Long TTL, versioned keys</div><div>Invalidate by version when changed; clients check an ETag</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.2fr 1.3fr 1.6fr;"><div class="dt-name">Latest bus position</div><div>Redis only</div><div>TTL of a few ping intervals</div><div>The key expires if the bus stops reporting, so it is shown as offline instead of live</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.2fr 1.3fr 1.6fr;"><div class="dt-name">Per-stop arrival list</div><div>Redis sorted set</div><div>Rewritten on every update</div><div>Each entry carries its computed-at time; entries older than a threshold are dropped or flagged</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.2fr 1.3fr 1.6fr;"><div class="dt-name">API responses for popular stops</div><div>Short HTTP cache (a few seconds)</div><div>2-5 s</div><div>Collapses thousands of identical requests into one</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.2fr 1.3fr 1.6fr;"><div class="dt-name">User favorites</div><div>Redis per user</div><div>Minutes</div><div>Invalidate on write</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.2fr 1.3fr 1.6fr;"><div class="dt-name">ETA model inputs (segment speeds, dwell times)</div><div>In-process memory</div><div>Refresh periodically</div><div>Keep last known good if refresh fails</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.2fr 1.3fr 1.6fr;"><div class="dt-name">Search results and index</div><div>Search service</div><div>Rebuilt on reference-data change</div><div>Not on the live path</div></div>
          </div>
          <div class="ans-block"><div class="ans-label">How stale data is handled</div>
          <div class="code-box">1. TIME-STAMP EVERYTHING     every cached item carries updatedAt, and the API
                             returns updatedSecAgo to the client.
2. SHOW STALENESS HONESTLY  older than a threshold -&gt; grey the bus out ("GPS
                             signal lost"), never display it as live.
3. TTL WITH JITTER          randomise expiry so thousands of keys do not
                             expire together and stampede the database.
4. SINGLE-FLIGHT REFILL     one request rebuilds an expired key; the rest wait
                             for it (HybridCache does this).
5. VERSIONED KEYS           route:{id}:v{n} — a reader never mixes versions.
6. SERVE-STALE-ON-ERROR     if the database is down, keep serving the last
                             known reference data rather than failing.</div></div>
          <div class="warn-box">⚠️ Do not cache an ETA for longer than the next update interval — a minutes-old ETA that looks live is worse than showing nothing. Position and ETA data are fresh-or-flagged, never silently old.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q6</div>
      <div class="qa-body">
        <div class="qa-question">How do we publish updates to everyone tracking a route or a bus ETA?</div>
        <div class="qa-answer">
          <div class="code-box">Fan-out by TOPIC (group), not by user:

  processor updates bus 201A
        │
        ├─▶ group  bus:201A      (users watching that bus)
        ├─▶ group  route:201     (users watching the route, map view)
        └─▶ group  stop:MG-Road  (stop displays and users at that stop)

Clients join only the groups they follow. The service holds the connections
(Azure Web PubSub / SignalR Service), so your API pods do not.</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.2fr 2.6fr;"><div>Technique</div><div>Why</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Managed real-time service</div><div>Hundreds of thousands of persistent connections are not something to host in your own app pods; scaling and reconnection are handled for you</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Conflation</div><div>Within a group send only the LATEST value every 1-5 seconds — a viewer cannot use ten updates a second, and this caps fan-out cost</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Delta payloads</div><div>Send what changed (bus id, ETA, position), not the whole list</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Push notifications</div><div>Apps in the background use FCM / APNs for "your bus is 3 minutes away" — sockets drain battery and are killed by the OS</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Polling fallback</div><div>If a socket cannot connect, the client polls an endpoint with a short HTTP cache, so thousands of identical polls become one backend read</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Resync on reconnect</div><div>A reconnecting client fetches the current snapshot first, then resumes deltas — it never assumes it missed nothing</div></div>
          </div>
          <div class="ans-block"><div class="ans-label">In code — conflated publish from the processor</div>
          <div class="code-box">private readonly ConcurrentDictionary&lt;string, EtaUpdate&gt; _pending = new();

public void Enqueue(string group, EtaUpdate update)
    =&gt; _pending[group] = update;                    // newest wins — older values are dropped

// every 2 seconds
async Task FlushAsync(CancellationToken ct)
{
    foreach (var (group, update) in _pending.ToArray())
    {
        if (_pending.TryRemove(group, out var latest))
            await _pubSub.SendToGroupAsync(group, latest, ct);   // one message per group per tick
    }
}</div></div>
          <div class="tip-box">✅ Interview line: "Fan-out cost is updates × subscribers, so I cap it with conflation and deltas and I deliver through a managed service. Background mobile users get push notifications instead of sockets, and any client that falls back to polling hits a few-second HTTP cache, so even a very popular stop costs one backend read."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q7</div>
      <div class="qa-body">
        <div class="qa-question">What happens when the database fails? What happens when Redis fails?</div>
        <div class="qa-answer">
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.2fr 1.6fr 1.6fr;"><div>Capability</div><div>Database down</div><div>Redis down</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.6fr;"><div class="dt-name">Live bus positions</div><div class="dt-yes">Unaffected — served from Redis, fed by the stream</div><div class="dt-no">Lost from cache until rebuilt (see below) — a few seconds for active buses</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.6fr;"><div class="dt-name">ETAs and stop displays</div><div class="dt-yes">Unaffected</div><div class="dt-no">Degraded for a short time; fall back to last-known values with a stale flag</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.6fr;"><div class="dt-name">Route and stop information</div><div>Served from cache and CDN; uncached items return the last known version</div><div>Falls back to the database through a protected path</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.6fr;"><div class="dt-name">Favorites (read)</div><div>From cache if present</div><div>From the database</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.6fr;"><div class="dt-name">Favorites (write), admin changes</div><div class="dt-no">Fail fast, or queue and replay</div><div class="dt-yes">Unaffected</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.6fr;"><div class="dt-name">Telemetry ingestion</div><div class="dt-yes">Unaffected — IoT Hub and processors continue</div><div>Continues; processors retry the Redis write, and the stream keeps the data</div></div>
          </div>
          <div class="ans-block"><div class="ans-label">Redis failure — recovery in detail</div>
          <div class="code-box">Prevention
  • Azure Cache for Redis with replicas across zones (managed failover)
  • clustering / sharding if memory or throughput requires it

When it fails anyway
  1. Failover to the replica (seconds) — most of the state is already there.
  2. If state is lost: it SELF-HEALS.
       - every bus sends its next ping within one interval (about 5 s), which
         rewrites its bus:{id} key
       - processors can also replay the last few minutes from the Event Hub
         retention to rebuild arrival lists immediately
  3. Reference-data cache misses fall back to the database — protected by:
       single-flight (one DB call per key), rate limiting, and a short serve-
       stale window so a cold cache does not turn into a database stampede.
  4. Clients see "updating..." or a stale flag, not wrong data.

Client-side protection
  • circuit breaker around Redis calls · short timeouts · retry with backoff
  • in-process last-known cache so one Redis blip does not blank the screen</div></div>
          <div class="warn-box">⚠️ The dangerous combination is a Redis flush followed by every request falling through to the database at once. Plan for the cold-cache case explicitly — warm the cache from the stream, and protect the database with single-flight and limits.</div>
          <div class="tip-box">✅ Interview line: "The design is intentionally asymmetric: the database can fail without affecting live tracking, and Redis can fail without losing data because it holds only derived state that the stream can rebuild. Each failure becomes a degraded, flagged experience, never a wrong one."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q8</div>
      <div class="qa-body">
        <div class="qa-question">How is telemetry data processed, and what happens when more buses are added?</div>
        <div class="qa-answer">
          <div class="code-box">Device ─▶ IoT Hub ─▶ partitions (key = busId) ─▶ consumer group
                                                   │
                  ┌────────────────────────────────┤  one worker per partition
                  ▼                                ▼
         processor A (partitions 0-3)     processor B (partitions 4-7) ...

Per message:
  1 validate and parse         drop malformed, reject impossible speed or position
  2 de-duplicate               same (busId, seq) seen before -&gt; ignore
  3 order check                seq lower than the stored seq -&gt; drop (late / replay)
  4 map-match to the route     snap the GPS point to the polyline
  5 detect stop arrival        geofence crossing -&gt; arrival event + ground truth
  6 update Redis               latest state, geo index, route set
  7 recompute ETA              next ~10 stops for that bus
  8 publish deltas             to the stop, route and bus groups
  9 archive                    Event Hubs Capture to the data lake (training data)</div>
          <div class="ans-block"><div class="ans-label">In code — partition-ordered processing with an out-of-order guard</div>
          <div class="code-box">// Redis Lua: apply the update only if it is newer — atomic, no read-then-write race
private const string ApplyIfNewer = @"
    local cur = redis.call('HGET', KEYS[1], 'seq')
    if cur and tonumber(cur) &gt;= tonumber(ARGV[1]) then return 0 end
    redis.call('HSET', KEYS[1], 'seq', ARGV[1], 'lat', ARGV[2], 'lon', ARGV[3],
                               'speed', ARGV[4], 'ts', ARGV[5])
    redis.call('EXPIRE', KEYS[1], 30)
    return 1";

processor.ProcessEventAsync += async args =&gt;
{
    var msg = Parse(args.Data);                               // events for one bus arrive in order
    if (!Validate(msg)) { await DeadLetterAsync(msg); return; }

    var applied = (int)await _redis.ScriptEvaluateAsync(ApplyIfNewer,
        new RedisKey[] { $"bus:{msg.BusId}" },
        new RedisValue[] { msg.Seq, msg.Lat, msg.Lon, msg.SpeedKmh, msg.Ts });

    if (applied == 1)
    {
        var state = _mapMatcher.Match(msg);
        await _etaService.RecomputeAsync(state);              // next ~10 stops
        _publisher.Enqueue(GroupsFor(state), state.ToDelta()); // conflated publish
    }
    await args.UpdateCheckpointAsync();                       // checkpoint after success only
};</div></div>
          <div class="ans-block"><div class="ans-label">What happens when more buses are added</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.5fr;"><div>Layer</div><div>How it scales</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Devices</div><div>Provision new trackers through DPS — no code change</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">IoT Hub</div><div>Scale units for message volume. Partition count is fixed at creation, so choose it with headroom for expected growth up front. Verify tier limits for your message rate.</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Processors</div><div>Stateless, so add workers up to the partition count; autoscale on consumer lag (KEDA on AKS). Each bus is always handled by one worker, which keeps its updates ordered.</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Redis</div><div>More memory and shards; key by bus and stop so data distributes evenly</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Fan-out</div><div>Conflation keeps cost bounded as subscribers grow; the managed service scales connections</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Beyond one city</div><div>Deploy a full stack per city or region; a thin global layer for accounts and search</div></div>
          </div></div>
          <div class="ans-block"><div class="ans-label">Cost control levers</div>
          <div class="code-box">• Adaptive reporting: use the device twin to slow pings for parked or idle
  buses and speed them up near stops — fewer messages, same accuracy.
• Send on movement or heading change, not only on a timer.
• Batch several readings in one message when the network is poor.
• Poison messages go to a dead-letter store; processing never blocks on one.</div></div>
          <div class="warn-box">⚠️ Late and out-of-order events are normal on cellular networks. Use the device's event time and sequence number, not arrival time, and design every write to be idempotent so replays after a crash are harmless.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q9</div>
      <div class="qa-body">
        <div class="qa-question">The system is live and we change the ETA algorithm. How do you make sure the new algorithm is better than the previous one?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Principle: never judge by feel — measure against ground truth, and release in stages</div>
          <div class="code-box">GROUND TRUTH = the ACTUAL arrival time at the stop
               (the geofence-crossing events the processors already record)

   prediction made at time t  ──────▶  compare with  ◀──────  actual arrival
        for the same bus and stop                       error = predicted - actual</div></div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 2.4fr;"><div>Stage</div><div>What you do</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.4fr;"><div class="dt-name">1. Offline backtest</div><div>Replay archived telemetry through both algorithms and score each against the recorded actual arrivals. Fast, safe, and uses real history.</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.4fr;"><div class="dt-name">2. Shadow mode</div><div>Run the new algorithm on live traffic alongside the old one. Both predictions are logged with their version; only the old one is shown to users. Compare to actual arrivals as they happen — zero user risk.</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.4fr;"><div class="dt-name">3. Canary / A-B</div><div>Show the new ETA to a small slice (a few routes or a percentage of stops) behind a feature flag. Compare against the control group.</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.4fr;"><div class="dt-name">4. Guardrails and rollback</div><div>Automatic rollback if error metrics worsen beyond a threshold or latency/CPU regress. Ramp up gradually otherwise.</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.4fr;"><div class="dt-name">5. Continuous monitoring</div><div>Keep scoring accuracy in production dashboards — traffic, seasons and route changes make any algorithm drift.</div></div>
          </div>
          <div class="ans-block"><div class="ans-label">Metrics — compare more than the average</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.2fr 2.4fr;"><div>Metric</div><div>Why it matters</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr;"><div class="dt-name">MAE and MAPE</div><div>Average absolute error in seconds and as a percentage</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr;"><div class="dt-name">P90 / P95 error</div><div>Passengers remember the bad predictions, not the average — tail error is what hurts trust</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr;"><div class="dt-name">Signed bias</div><div>Predicting a bus EARLY is worse than late — the passenger leaves and misses it. Track the direction of error, not just its size</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr;"><div class="dt-name">Error by horizon</div><div>Split into 0-5, 5-10 and 10-20 minute buckets — long-horizon accuracy and short-horizon accuracy are different problems</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr;"><div class="dt-name">Segmented results</div><div>By route, time of day, weather and day type — a change that wins on average can still regress an important route</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr;"><div class="dt-name">Stability / jitter</div><div>An ETA that jumps 4 → 9 → 5 minutes looks broken even if it is accurate on average</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr;"><div class="dt-name">Cost and latency</div><div>CPU per prediction and processing delay — "more accurate but too slow" is not an improvement</div></div>
          </div></div>
          <div class="ans-block"><div class="ans-label">In code — versioned predictions and a shadow comparison</div>
          <div class="code-box">public async Task RecomputeAsync(BusState bus)
{
    var current = _algoV1.Eta(bus);                     // what users see
    var shadow  = _algoV2.Eta(bus);                     // computed, logged, never shown

    _predictionLog.Write(new PredictionRecord(
        bus.BusId, bus.NextStopId, DateTimeOffset.UtcNow,
        EtaV1: current, EtaV2: shadow, AlgoVersions: new[] { "v1", "v2" }));

    await _redis.SetArrivalAsync(bus, current);         // serve v1 until v2 earns it
}

// when the bus actually reaches the stop (geofence event):
//   error_v1 = EtaV1 - actual,   error_v2 = EtaV2 - actual
// join prediction log to arrival events, group by horizon bucket and route,
// and compare MAE, P90, and bias for v1 vs v2.</div></div>
          <div class="warn-box">⚠️ Two traps: comparing algorithms on different time periods (traffic differs — always run both on the same live traffic in shadow mode), and defining "actual arrival" inconsistently. Fix the ground-truth definition first, because every metric depends on it.</div>
          <div class="tip-box">✅ Interview line: "I would prove it in stages — backtest on archived telemetry, shadow it on live traffic so both versions are scored against the same actual arrivals, then canary with a feature flag and automatic rollback. I would compare tail error, signed bias, stability and per-route results, not just average error, because the average hides the regressions passengers actually notice."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q10</div>
      <div class="qa-body">
        <div class="qa-question">If the HTTPS Ingestion API fails while data is coming in, what happens — is data lost?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer</div>
          No data is lost at the API if three rules hold. (1) The device keeps each report until the server confirms it (store-and-forward). (2) The API confirms only AFTER the report is durably written to the event stream. (3) Everything downstream is idempotent, because this is at-least-once delivery and duplicates will happen. Data can only be lost when an outage lasts longer than the device's local buffer — and even then, for live tracking only the latest position matters.</div>

          <div class="ans-block"><div class="ans-label">Failure point by failure point — where could data be lost?</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.5fr 1.7fr 0.9fr 1.7fr;"><div>Where it fails</div><div>What happens</div><div>Lost?</div><div>What protects you</div></div>
            <div class="dt-row" style="grid-template-columns:1.5fr 1.7fr 0.9fr 1.7fr;"><div class="dt-name">A. Network or TLS fails before the API receives it</div><div>Device sees a timeout or connection error and keeps the report in its buffer</div><div class="dt-yes">No</div><div>Device retries with backoff and jitter</div></div>
            <div class="dt-row" style="grid-template-columns:1.5fr 1.7fr 0.9fr 1.7fr;"><div class="dt-name">B. API receives it, then crashes before publishing</div><div>No confirmation is sent, so the device treats it as not delivered and retries</div><div class="dt-yes">No</div><div>The device keeps the report until it gets a confirmation</div></div>
            <div class="dt-row" style="grid-template-columns:1.5fr 1.7fr 0.9fr 1.7fr;"><div class="dt-name">B2. API confirms BEFORE publishing, then crashes</div><div>Device deletes its copy, the server never wrote it</div><div class="dt-no">YES</div><div>Never do this — confirm only after a durable publish</div></div>
            <div class="dt-row" style="grid-template-columns:1.5fr 1.7fr 0.9fr 1.7fr;"><div class="dt-name">C. Publishing to the stream fails (throttled or down)</div><div>API returns 503 with Retry-After; device retries. Optionally the API writes to a fallback durable queue and replays later</div><div class="dt-yes">No</div><div>Honest error code, retry, fallback queue, stream failover</div></div>
            <div class="dt-row" style="grid-template-columns:1.5fr 1.7fr 0.9fr 1.7fr;"><div class="dt-name">D. Published, but the confirmation is lost on the way back</div><div>Device retries the same report, so the stream holds a duplicate</div><div class="dt-yes">No (duplicate)</div><div>Idempotent processing on (busId, seq)</div></div>
            <div class="dt-row" style="grid-template-columns:1.5fr 1.7fr 0.9fr 1.7fr;"><div class="dt-name">E. Stream accepted it, processor crashes</div><div>The stream retains the event; another worker resumes from the checkpoint</div><div class="dt-yes">No</div><div>Retention, checkpoints, idempotent writes</div></div>
            <div class="dt-row" style="grid-template-columns:1.5fr 1.7fr 0.9fr 1.7fr;"><div class="dt-name">F. Outage longer than the device buffer</div><div>Oldest buffered points are dropped; the next successful report restores the live state</div><div class="dt-no">Bounded history only</div><div>Large local buffer, thinning of old points, alerting before it fills</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Rule 1 — the API confirms only after a durable publish</div>
          <div class="code-box">app.MapPost("/telemetry", async (TelemetryBatch batch, EventHubProducerClient producer, CancellationToken ct) =&gt;
{
    if (!batch.IsValid(out var problem))
        return Results.BadRequest(problem);               // 400: the device must NOT retry a bad payload forever

    try
    {
        using var events = await producer.CreateBatchAsync(
            new CreateBatchOptions { PartitionKey = batch.BusId }, ct);     // same bus -&gt; same partition
        foreach (var report in batch.Reports)
            events.TryAdd(new EventData(report.ToBytes()));

        await producer.SendAsync(events, ct);              // returns only after the broker has accepted it
        return Results.Accepted();                         // 202 — NOW the device may delete its copy
    }
    catch (Exception)
    {
        return Results.StatusCode(503);                    // not stored: device keeps it and retries
    }
});</div></div>

          <div class="ans-block"><div class="ans-label">Rule 2 — the device keeps data until it is confirmed (store-and-forward)</div>
          <div class="code-box">on every GPS fix:
    seq = seq + 1
    buffer.append({ seq, ts, lat, lon, speed, heading })      // written to flash first

sender loop:
    batch = buffer.peek(up to 50 oldest reports)
    response = POST /telemetry (batch)
    if response is 202:            buffer.remove(batch)       // only now is it safe to delete
    elif response is 400:          buffer.remove(batch)       // bad data: drop, never retry forever
    else (timeout, 429, 5xx):      wait(backoff + random jitter); retry   // keep the batch

if buffer is full:   drop the OLDEST points, but keep every Nth point (thin out) and always keep the newest</div></div>

          <div class="ans-block"><div class="ans-label">Rule 3 — duplicates are harmless</div>
          Retries mean at-least-once delivery, so the same report can arrive twice. Each report carries (busId, seq) from the device. The stream processor applies a conditional write in Redis — only if seq is newer than the stored one — and the data lake deduplicates on the same key. A duplicate therefore changes nothing.</div>

          <div class="ans-block"><div class="ans-label">Live tracking versus history — what loss actually costs</div>
          <div class="decision-table">
            <div class="dt-row dt-header"><div>Use of the data</div><div>Impact of losing some points during an outage</div></div>
            <div class="dt-row"><div class="dt-name">Live position and ETA</div><div class="dt-yes">Almost none — only the latest position matters, and the first report after recovery restores it. Show the bus as estimated or stale during the gap</div></div>
            <div class="dt-row"><div class="dt-name">History, analytics, ETA model training</div><div class="dt-no">Gaps in the trace. This is why devices batch-upload their buffer on reconnect, oldest first, and the processors use the device event time, not the arrival time</div></div>
            <div class="dt-row"><div class="dt-name">Arrival ground truth (geofence events)</div><div class="dt-no">A missing crossing means a missing accuracy sample. Detect arrivals from the buffered trace on recovery, not from live arrival order</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Making the API itself hard to take down</div>
          <div class="decision-table">
            <div class="dt-row dt-header"><div>Measure</div><div>Why</div></div>
            <div class="dt-row"><div class="dt-name">Stateless pods across availability zones</div><div>Losing a pod or a zone does not lose anything — the API stores nothing locally</div></div>
            <div class="dt-row"><div class="dt-name">Graceful shutdown</div><div>On a deployment or scale-in, stop accepting new requests, finish in-flight publishes, then exit — so no accepted report is dropped</div></div>
            <div class="dt-row"><div class="dt-name">Health probes and autoscaling</div><div>Remove unhealthy pods quickly and scale on request rate before the API saturates</div></div>
            <div class="dt-row"><div class="dt-name">Regional failover</div><div>A second region behind Front Door, with a second event-stream namespace paired for geo failover (verify the feature and its failover behaviour for your tier)</div></div>
            <div class="dt-row"><div class="dt-name">Fallback durable queue</div><div>If the stream is unreachable, the API writes to a separate durable queue and a replayer republishes later — the device still gets an honest answer</div></div>
            <div class="dt-row"><div class="dt-name">Retry-storm protection</div><div>After an outage 5,000 buses reconnect together: use jittered backoff, 429 with Retry-After, a batch endpoint, and queue-based load levelling so recovery does not cause a second outage</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">What to monitor so a failure is noticed in minutes</div>
          <div class="code-box">API:        5xx rate · publish failures · request latency · in-flight requests during deploys
Stream:     throttling · consumer lag · age of the oldest unprocessed event
Fleet:      % of buses reporting in the last 60 s (the best single health number)
Devices:    last-seen age per bus · buffer depth reported in each message · oldest buffered report age
Alert when: buffer depth grows (outage in progress) BEFORE any device buffer is full</div></div>

          <div class="ans-block"><div class="ans-label">How is this different with IoT Hub?</div>
          IoT Hub follows the same principle with less code: the device SDK retries, MQTT QoS 1 means the hub acknowledges each message and the device resends if it does not, and the hub confirms only once the message is stored on its endpoint. You still need the device-side buffer for long outages and the same idempotent processing. The thin HTTPS API simply makes you build and operate the acknowledgement, throttling and retry contract yourself.</div>

          <div class="warn-box">⚠️ The classic data-loss bug is acknowledging first and publishing afterwards — for example returning 200 immediately and sending to the event stream on a background thread. It looks fast and passes tests, and it silently loses every report that is in flight when a pod restarts.</div>
          <div class="tip-box">✅ Interview line: "Nothing is lost at the ingestion API provided the device buffers until it is acknowledged and the API acknowledges only after a durable publish. That gives at-least-once delivery, so I make the processing idempotent on busId and sequence number. The only real loss window is an outage longer than the device buffer, and for live tracking that costs almost nothing because the next ping restores the latest state — it only thins the history, which I protect with a large buffer, thinning of old points, and alerts on buffer depth."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q11</div>
      <div class="qa-body">
        <div class="qa-question">What happens when Event Hubs itself is down?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer</div>
          Live tracking degrades but does not crash, and nothing the stream already accepted is lost. Producers cannot publish, so they buffer; consumers get nothing, so Redis keys expire and passengers see buses flagged as estimated; when the stream returns, processors catch up. The design question is how long you can tolerate the degraded view and what you do to shorten it.</div>

          <div class="ans-block"><div class="ans-label">First, what does "down" mean? — it is usually not a total outage</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.2fr 1.6fr 1.8fr;"><div>Failure</div><div>Typical effect</div><div>Response</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.8fr;"><div class="dt-name">Throttling (capacity exceeded) — the most common case</div><div>Sends return a server-busy error; the service is up but refusing some traffic</div><div>Producers back off with jitter; scale throughput units or processing units; turn on auto-inflate if your tier supports it</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.8fr;"><div class="dt-name">One partition unavailable</div><div>Only the buses hashed to that partition are affected</div><div>Retry; partition keys keep other buses flowing</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.8fr;"><div class="dt-name">Namespace or zone problem</div><div>Sends and receives fail for the whole stream</div><div>Fallback queue, degraded mode (below), wait for the platform</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.8fr;"><div class="dt-name">Regional outage</div><div>The stream is unreachable, and the data inside may be unavailable until recovery</div><div>Failover to a second namespace or region; accept that unreplicated events may not come with you</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.8fr;"><div class="dt-name">Consumer side (your processors or checkpoint store)</div><div>Stream is healthy but nothing reads it</div><div>Consumer lag alarms; restart or scale processors; check the checkpoint storage</div></div>
          </div>
          <div class="warn-box">⚠️ With IoT Hub, the stream is its built-in Event Hubs-compatible endpoint and is part of IoT Hub itself. With a thin HTTPS ingestion API publishing to your own Event Hubs namespace, the namespace is a separate failure domain you must plan for.</div></div>

          <div class="ans-block"><div class="ans-label">What each part of the system experiences during an outage</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 2.6fr;"><div>Part</div><div>Behaviour</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Devices</div><div>Reports are not confirmed, so each device keeps them in its buffer and retries with backoff — the same store-and-forward behaviour as in Q10. No loss until a buffer overflows</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Ingestion API</div><div>The send fails after the client library's own retries; the API returns 503 with Retry-After (or writes to a fallback queue and returns 202)</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Stream</div><div>Events accepted before the outage remain stored for the retention period and are not lost; no new events are accepted</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Stream processors</div><div>Receive nothing and retry with backoff; they do not crash. Checkpoints live in a separate store, so they resume where they left off</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Redis (live state)</div><div>No new writes, so bus keys expire after their TTL (about 30 seconds in this design) and arrival lists go stale</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">APIs, apps, displays</div><div>Keep working. Items change from LIVE to ESTIMATED to timetable-based, always labelled; displays show a banner. Reference data (routes, stops) is unaffected because it never depended on the stream</div></div>
          </div>
          <div class="code-box">Passenger view during an outage
  0 s       bus 201A   4 min   LIVE
  +30 s     bus 201A   4 min   ESTIMATED   (last position is getting old)
  +2 min    bus 201A   ~4 min  SCHEDULED   (timetable only, banner: "live times unavailable")
  recovery  first fresh ping restores LIVE within one reporting interval</div></div>

          <div class="ans-block"><div class="ans-label">Protections — decide how much you need</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.2fr 2.6fr;"><div>Measure</div><div>What it gives you</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Zone-redundant namespace</div><div>Survives the loss of a zone. Check that your tier and region support it (it is generally the default on the higher tiers in zone-enabled regions)</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Fallback durable queue in a different service</div><div>When a send fails, the API writes the report to a separate durable store (for example a storage queue or Service Bus) and a replayer republishes later. A different service means a different failure domain</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Second namespace in another region</div><div>Regional resilience. Note that metadata-only geo-disaster-recovery pairing does not copy event data, whereas the newer geo-replication feature does — verify which one your tier offers and what a failover does to unconsumed events</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Degraded direct-to-Redis path (optional)</div><div>While the stream is down, the ingestion tier writes each bus's latest position straight into Redis with the same conditional write on seq, so the live view keeps working. History goes to the fallback queue. The cost is a second, simpler processing path to build and keep consistent</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Adequate retention</div><div>Keep events long enough that a slow recovery or a processor fix still finds them (set it deliberately against your tier's limit)</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Capture to the data lake</div><div>An independent copy of what was accepted, usable to rebuild history and live state</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Recovery — catching up without hurting live tracking</div>
          <div class="code-box">When the stream comes back, 5,000 buses' worth of backlog arrives at once.

Use TWO consumers on the same stream:
  LIVE consumer     latest-wins: for each bus only the NEWEST report matters.
                    Skip old backlog for live state, jump toward recent data, and
                    apply with the conditional write (only if seq is newer).
  ARCHIVE consumer  full replay in order: writes every report to the lake so
                    history and ETA training data have no gaps.

Also: autoscale processors on consumer lag, rate-limit writes to Redis and the
real-time hub so the catch-up does not become a second outage, and replay the
fallback queue through the same ingestion path.</div>
          <div class="code-box">// LIVE consumer: ignore stale backlog, never move a bus backwards
processor.ProcessEventAsync += async args =&gt;
{
    var report = Parse(args.Data);
    var age = DateTimeOffset.UtcNow - args.Data.EnqueuedTime;

    if (age &lt; TimeSpan.FromSeconds(45))                 // recent enough to matter for live tracking
        await ApplyIfNewerAsync(report);                // conditional write on seq (idempotent)

    await args.UpdateCheckpointAsync();                 // still advance, so the backlog drains fast
};

// Fallback in the ingestion API: do not lose a report if the stream is down
try   { await producer.SendAsync(events, ct); return Results.Accepted(); }
catch { await fallbackQueue.SendMessageAsync(payload, ct);  return Results.Accepted(); }  // durable elsewhere</div></div>

          <div class="ans-block"><div class="ans-label">How you find out — detect it in a minute, not from passengers</div>
          <div class="code-box">Stream metrics:   server errors · throttled requests · incoming messages falling to zero
Consumer:         lag and age of the oldest unprocessed event
Fleet:            % of buses reporting in the last 60 s (drops sharply)
Synthetic probe:  a "ghost bus" that sends a heartbeat through the whole pipeline every
                  few seconds; alert if it does not appear in Redis within N seconds
Platform:         subscribe to the cloud provider's service-health alerts</div></div>

          <div class="ans-block"><div class="ans-label">Runbook in one line each</div>
          <div class="code-box">1 detect (ghost bus, lag, error rate)   2 declare and switch on the status banner
3 confirm whether it is throttling (scale up) or an outage (fallback queue, degraded path)
4 communicate: displays and apps already show estimated or scheduled times
5 recover: drain the backlog with the two-consumer approach   6 verify fleet freshness and the ghost bus
7 post-incident review: measure how long live data was degraded and what was lost</div></div>

          <div class="warn-box">⚠️ Do not answer this with "make Event Hubs multi-region active-active" by reflex. Live tracking tolerates gaps — the next ping restores the latest state — so decide with the business how long displays may show estimated times. For a city bus service a degraded view for a short period is usually acceptable, and the cheap protections (buffering, a fallback queue, latest-wins catch-up) cover most of the risk.</div>
          <div class="tip-box">✅ Interview line: "If Event Hubs is down, producers stop getting acknowledgements so devices and the ingestion API buffer, and consumers see nothing so Redis keys expire and the apps show buses as estimated, then timetable-based, with a banner — it degrades, it does not fail. Everything the stream had already accepted is retained, and when it returns I catch up with a latest-wins consumer for live state plus a full-replay consumer for history, so recovery does not hurt live tracking. I tell throttling from a real outage first, because throttling is the common case and is fixed by scaling."</div>
        </div>
      </div>
    </div>

  </div>
`;
