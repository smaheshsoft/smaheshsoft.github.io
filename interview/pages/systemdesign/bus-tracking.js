window.Pages['sd-bus-tracking'] = (function () {
  // ---------- small helpers (content is escaped here so the text below stays readable) ----------
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function code(s) { return '<div class="code-box">' + esc(s) + '</div>'; }
  function p(s) { return '<p>' + esc(s) + '</p>'; }
  function strong(s) { return '<strong>' + esc(s) + '</strong>'; }
  function ul(items) { return '<ul>' + items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join("") + '</ul>'; }
  function tip(s) { return '<div class="tip-box">✅ ' + esc(s) + '</div>'; }
  function warn(s) { return '<div class="warn-box">⚠️ ' + esc(s) + '</div>'; }
  function cell(c) {
    if (c && typeof c === "object") return '<div class="' + c.c + '">' + esc(c.t) + '</div>';
    return '<div>' + esc(c) + '</div>';
  }
  // widths: array of fr numbers; head: array; rows: array of arrays (first column is the bold name column)
  function tbl(widths, head, rows) {
    var g = 'grid-template-columns:' + widths.map(function (w) { return w + 'fr'; }).join(' ') + ';';
    var h = '<div class="dt-row dt-header" style="' + g + '">' + head.map(function (x) { return '<div>' + esc(x) + '</div>'; }).join("") + '</div>';
    var r = rows.map(function (row) {
      return '<div class="dt-row" style="' + g + '"><div class="dt-name">' + esc(row[0]) + '</div>' + row.slice(1).map(cell).join("") + '</div>';
    }).join("");
    return '<div class="decision-table">' + h + r + '</div>';
  }
  var n = 0;
  function sec(title, body, numbered) {
    var t = (numbered === false) ? title : (++n + ". " + title);
    return '<div class="ref-section"><div class="ref-title">' + esc(t) + '</div><div class="ref-body">' + body + '</div></div>';
  }
  // A component spec sheet: the same fields for every component so they are easy to compare.
  function comp(intro, rows, extra) {
    return (intro ? p(intro) : "") + tbl([1, 3.4], ["Aspect", "Design"], rows) + (extra || "");
  }

  // ---------- architecture diagram (generated SVG) ----------
  var COLORS = {
    client: ["#1a2740", "#4a9eff"], edge: ["#2a2008", "#b45309"], svc: ["#07241f", "#0d9488"],
    data: ["#1e1030", "#7c3aed"], redis: ["#2a0f14", "#be123c"], pg: ["#0c2415", "#16a34a"], ext: ["#1f2937", "#64748b"]
  };
  function box(x, y, w, h, title, sub, kind) {
    var c = COLORS[kind];
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" fill="' + c[0] + '" stroke="' + c[1] + '" stroke-width="1.5"/>' +
      '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 - 3) + '" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="10" font-weight="bold">' + title + '</text>' +
      '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 + 11) + '" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="8">' + sub + '</text>';
  }
  function arrow(x1, y1, x2, y2, dashed) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="#64748b" stroke-width="1.2"' + (dashed ? ' stroke-dasharray="4 3"' : '') + ' marker-end="url(#arr)"/>';
  }
  function label(x, y, t) { return '<text x="' + x + '" y="' + y + '" font-size="9" fill="#64748b" font-family="monospace">' + t + '</text>'; }

  var svg = '<svg viewBox="0 0 960 470" style="width:100%;max-width:960px;display:block;margin:0 auto;border-radius:10px;" xmlns="http://www.w3.org/2000/svg">' +
    '<defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#64748b"/></marker></defs>' +
    '<rect width="960" height="470" fill="#0d1117" rx="12"/>' +
    label(16, 26, "CLIENTS AND DEVICES") + label(16, 112, "EDGE AND INGESTION") + label(16, 207, "SERVICES (AKS)") + label(16, 324, "DATA") +
    // row A: clients and devices
    box(16, 34, 134, 50, "🚌 Bus Tracker", "5,000 · MQTT + TLS", "client") +
    box(162, 34, 134, 50, "🖥️ Stop Display", "10,000 · WS or poll", "client") +
    box(308, 34, 134, 50, "📱 Mobile App", "iOS · Android", "client") +
    box(454, 34, 134, 50, "🌐 Web App", "map · search", "client") +
    box(600, 34, 134, 50, "🔗 3rd-party apps", "GTFS · GTFS-RT", "client") +
    box(746, 34, 134, 50, "🛠️ Ops Portal", "admin · monitoring", "client") +
    // row B: edge and ingestion
    box(16, 118, 134, 50, "☁️ IoT Hub", "DPS · twin · routing", "edge") +
    box(162, 118, 134, 50, "📡 Real-time Hub", "Web PubSub / SignalR", "edge") +
    box(308, 118, 420, 50, "Front Door · CDN · WAF", "TLS · caching · DDoS protection", "edge") +
    box(746, 118, 134, 50, "API Management", "auth · limits · routing", "edge") +
    // row C: services
    box(16, 214, 124, 58, "Telemetry Proc.", "validate · order", "svc") +
    box(150, 214, 124, 58, "ETA Service", "match · predict", "svc") +
    box(284, 214, 124, 58, "Tracking API", "live reads · bbox", "svc") +
    box(418, 214, 124, 58, "Reference Data", "routes · stops", "svc") +
    box(552, 214, 124, 58, "Search", "stops · routes", "svc") +
    box(686, 214, 124, 58, "Fav + Notify", "favorites · push", "svc") +
    box(820, 214, 124, 58, "Display Manager", "config · health", "svc") +
    // row D: data
    box(16, 332, 160, 62, "Data Lake · ADX", "history · ML training", "data") +
    box(190, 332, 150, 62, "Redis", "live state · geo", "redis") +
    box(354, 332, 190, 62, "PostgreSQL + PostGIS", "primary · standby · replicas", "pg") +
    box(558, 332, 140, 62, "Search Index", "prefix · typo", "data") +
    box(712, 332, 130, 62, "FCM / APNs", "mobile push", "ext") +
    // arrows: clients to edge
    arrow(83, 84, 83, 118) + arrow(229, 84, 229, 118) + arrow(375, 84, 375, 118) + arrow(521, 84, 521, 118) + arrow(667, 84, 667, 118) + arrow(813, 84, 813, 118) +
    arrow(728, 143, 746, 143) +
    // ingestion pipeline
    arrow(83, 168, 78, 214) + arrow(140, 243, 150, 243) + arrow(212, 214, 229, 168) +
    // API Management bus to services
    '<polyline points="813,168 813,192 346,192" fill="none" stroke="#64748b" stroke-width="1.2"/>' +
    arrow(346, 192, 346, 214) + arrow(480, 192, 480, 214) + arrow(614, 192, 614, 214) + arrow(748, 192, 748, 214) + arrow(882, 192, 882, 214) +
    // services to data
    arrow(78, 272, 96, 332, true) + arrow(120, 272, 240, 332) + arrow(212, 272, 265, 332) + arrow(346, 272, 300, 332) +
    arrow(480, 272, 449, 332) + arrow(614, 272, 628, 332) + arrow(748, 272, 777, 332) +
    // legend
    '<text x="16" y="424" font-size="10" fill="#94a3b8" font-family="monospace">Live path:  ① GPS ping → ② IoT Hub → ③ Telemetry Processor → ④ ETA Service → ⑤ Redis + Real-time Hub → ⑥ displays, apps, web</text>' +
    '<text x="16" y="442" font-size="10" fill="#94a3b8" font-family="monospace">Read path:  client → Front Door / CDN → API Management → Tracking API → Redis (live) or PostgreSQL (reference, cached)</text>' +
    '<text x="16" y="458" font-size="9" fill="#64748b" font-family="monospace">Dashed line = archive for history and ML training. The relational database is not on the live path.</text>' +
    '</svg>';

  // ---------- page ----------
  var out = [];

  out.push(
    '<div class="page-header"><div class="breadcrumb">System Design → City Bus Tracking and Arrival Prediction</div>' +
    '<h1>City Bus Tracking and Arrival Prediction</h1>' +
    '<div class="tag-grid">' + ["IoT Hub", "GPS Telemetry", "Real-time ETA", "Redis", "PostgreSQL / PostGIS", "Web PubSub", "GTFS-Realtime", "Failover"]
      .map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join("") + '</div></div>'
  );

  // ---------- layered high-level flow (card style) ----------
  function fc(title, sub, hl) {
    return '<div style="border:1px solid ' + (hl ? 'var(--accent-bd)' : 'var(--border)') + ';background:' + (hl ? 'var(--accent-bg)' : 'var(--surface)') +
      ';border-radius:10px;padding:10px 14px;text-align:center;"><div style="font-weight:700;color:var(--text);font-size:13px;">' + title +
      '</div><div style="color:var(--text2);font-size:11px;margin-top:2px;">' + sub + '</div></div>';
  }
  var down = '<div style="text-align:center;color:var(--muted);padding:4px 0;font-size:14px;">↓</div>';
  function mini(title, sub) {
    return '<div style="border:1px solid var(--border);background:var(--surface2);border-radius:8px;padding:10px;text-align:center;"><div style="font-weight:700;color:var(--text);font-size:12px;">' +
      title + '</div><div style="color:var(--text2);font-size:10px;margin-top:2px;">' + sub + '</div></div>';
  }
  var flow =
    '<div style="max-width:560px;margin:0 auto;border:1px solid var(--border);border-radius:14px;padding:16px;background:var(--surface);">' +
    fc("🚌 5,000 buses with GPS devices", "Latitude, longitude, speed, heading, timestamp, trip ID") + down +
    fc("Device Ingestion", "IoT Hub over MQTT — or a thin GPS Ingestion API over HTTPS · Authentication · Validation · Rate limiting · Event publishing") + down +
    fc("Event Streaming Platform", "IoT Hub built-in endpoint / Event Hubs / Kafka · Durable event stream · Partitioned by bus id", true) + down +
    '<div style="border:1px solid var(--border);border-radius:10px;padding:12px;background:var(--surface);">' +
    '<div style="text-align:center;font-weight:700;color:var(--text);font-size:13px;margin-bottom:8px;">Real-time processing layer</div>' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">' +
    mini("Vehicle State", "Latest GPS and trip progress · validate, de-duplicate, order, map-match") +
    mini("ETA Engine", "Route matching and predictions") +
    mini("Stop Predictions", "All upcoming buses per stop — not just 3") +
    mini("Live Event Publisher", "Changed predictions and locations as conflated deltas") +
    '</div></div>' + down +
    fc("Real-time Read and Delivery Layer", "Redis · API services · WebSocket / SignalR · Push notifications") + down +
    '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;">' +
    mini("🖥️ Displays", "All upcoming buses within the horizon, paged") +
    mini("📱 Mobile", "Live buses and favorites") +
    mini("🌐 Web", "Search and live maps") +
    '</div></div>';

  // ---------- full layered architecture: edge, APIM, API, microservices, cache, database with replication ----------
  function cap(t) { return '<div style="font-size:10px;font-weight:700;letter-spacing:.06em;color:var(--muted);text-align:center;margin-bottom:6px;">' + t + '</div>'; }
  function grp(title, inner, tint) {
    return '<div style="border:1px solid ' + (tint ? 'var(--accent-bd)' : 'var(--border)') + ';background:' + (tint ? 'var(--accent-bg)' : 'var(--surface)') +
      ';border-radius:10px;padding:10px;"><div style="text-align:center;font-weight:700;color:var(--text);font-size:13px;margin-bottom:8px;">' + title + '</div>' + inner + '</div>';
  }
  function grid(cols, items) { return '<div style="display:grid;grid-template-columns:repeat(' + cols + ',1fr);gap:8px;">' + items.join("") + '</div>'; }
  function downL(t) { return '<div style="text-align:center;color:var(--muted);padding:4px 0;font-size:11px;">↓ ' + t + '</div>'; }
  function repl(lbl, title, sub) { return '<div><div style="font-size:9px;color:var(--muted);margin-bottom:2px;">→ ' + lbl + '</div>' + mini(title, sub) + '</div>'; }

  var leftCol = cap("INGESTION PATH — writes") +
    fc("🚌 5,000 buses", "GPS: lat, lon, speed, heading, timestamp, trip ID") + down +
    fc("Device Ingestion", "IoT Hub (MQTT) or a thin ingestion API · auth · validation · throttling") + down +
    fc("Event Streaming Platform", "Partitioned by bus id · durable · replayable", true);
  var rightCol = cap("REQUEST PATH — reads") +
    fc("🖥️ 📱 🌐 Clients", "Displays · Mobile · Web · third-party feeds") + down +
    fc("Edge", "Front Door · CDN · WAF — caches static data, absorbs attacks") + down +
    fc("APIM Layer", "API Management · JWT validation · rate limits · quotas · versioning · routing") + down +
    grp("API Layer (thin, stateless)", grid(2, [mini("Mobile BFF", "one call per screen"), mini("Web BFF", "maps and search"), mini("Display API", "tiny payloads"), mini("Real-time Hub", "WebSocket groups")]));
  var micro = grp("Microservices Layer (AKS)",
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;"><div>' + cap("STREAM-PROCESSING SERVICES") +
    grid(2, [mini("Vehicle State", "validate · order · map-match"), mini("ETA Engine", "predict"), mini("Stop Predictions", "all upcoming buses per stop"), mini("Live Event Publisher", "conflated deltas")]) +
    '</div><div>' + cap("REQUEST-SERVING SERVICES") +
    grid(2, [mini("Tracking Service", "live read model"), mini("Reference Data", "routes · stops · GTFS"), mini("Search", "stops · routes · buses"), mini("Favorites + Notify", "alerts · push"), mini("Display Manager", "config · health")]) +
    '</div></div>');
  var cacheLayer = grp("Cache Layer", grid(3, [
    mini("CDN + HTTP cache", "static data; 2-5 s API responses"),
    mini("Redis — primary + replica", "bus state · stop arrivals · geo · zone-redundant"),
    mini("In-process L1 (HybridCache)", "reference data · versioned keys")]));
  var dbLayer = grp("Database Layer — with Replication",
    '<div style="display:grid;grid-template-columns:1fr 1.3fr 1fr;gap:10px;align-items:center;">' +
    mini("PostgreSQL PRIMARY", "zone 1 · all writes (admin changes, favorites)") +
    '<div style="display:flex;flex-direction:column;gap:6px;">' +
    repl("synchronous · high availability", "Standby — zone 2", "automatic failover, no committed data lost") +
    repl("asynchronous", "Read replica(s) — same region", "reads, reports, search-index builds") +
    repl("asynchronous · cross-region", "DR replica — region 2", "disaster recovery, bounded loss") +
    '</div><div style="display:flex;flex-direction:column;gap:6px;">' +
    mini("Search Index", "rebuilt from reference data") + mini("Data Lake / ADX", "history · ML training") + '</div></div>', true);

  var layered = '<div style="overflow-x:auto;"><div style="min-width:540px;max-width:800px;margin:0 auto;border:1px solid var(--border);border-radius:14px;padding:16px;background:var(--surface);">' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;"><div>' + leftCol + '</div><div>' + rightCol + '</div></div>' +
    downL("stream consumers (left) · service calls from the API layer (right)") + micro +
    downL("live state read and written · reference data cached · cache miss falls through") + cacheLayer +
    downL("cache miss on reference data · writes · history") + dbLayer + '</div></div>';

  out.push(sec("Layered Architecture — Every Layer, Request Path and Ingestion Path", layered +
    tbl([1.1, 2.7], ["Layer", "What it does"], [
      ["Edge", "TLS, WAF, DDoS protection, CDN caching of static route and stop data"],
      ["APIM layer", "One governed front door: authentication, rate limits and quotas per client, versioning, routing, response caching, analytics"],
      ["API layer", "Thin, stateless backends-for-frontends — one for mobile, web, displays and the public feed — shaping responses and calling services; no business rules"],
      ["Microservices layer", "Domain services with their own data: stream-processing services keep live state; request-serving services answer queries and own reference data"],
      ["Cache layer", "Three levels: CDN and HTTP cache, in-process L1, and Redis. Live state lives only in Redis; reference data is cached with versioned keys"],
      ["Database layer", "PostgreSQL primary with a synchronous zone-redundant standby for failover, asynchronous read replicas for reads and reports, and a cross-region replica for disaster recovery"]
    ]) +
    tip("Two paths meet in the middle. Telemetry flows down the left side into services that write Redis; passengers flow down the right side through the edge, APIM and the API layer into services that read Redis first and the database only on a miss. The database is never on the live path."), false));

  // ---------- data flow diagram: bus to passenger's mobile ----------
  function chain(items) {
    return '<div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;justify-content:center;">' +
      items.map(function (i) { return mini(i[0], i[1]); }).join('<span style="color:var(--muted);">→</span>') + '</div>';
  }
  var dataFlow = '<div style="max-width:640px;margin:0 auto;border:1px solid var(--border);border-radius:14px;padding:16px;background:var(--surface);">' +
    fc("① 🚌 Bus GPS tracker", "GNSS fix every ~5 s → report { busId, seq, ts, lat, lon, speed, heading } → written to the local flash buffer first") +
    downL("MQTT over TLS on 4G · per-device X.509 certificate · retried until acknowledged") +
    fc("② ☁️ IoT Hub", "authenticates the device · accepts the report · routes it to the event stream") +
    downL("partition key = busId — one bus, one ordered partition") +
    fc("③ Event stream", "durable and retained · ordered per bus · replayable", true) +
    downL("consumer group — processors read at their own pace") +
    fc("④ Vehicle State (stream processor)", "validate · drop duplicates and late reports · map-match to the route · detect stop arrival") +
    downL("conditional write — only if seq is newer") +
    grp("Redis — live state", grid(3, [mini("bus:{id}", "latest position, speed, trip"), mini("geo:buses", "map-area queries"), mini("stop:{id}:arrivals", "sorted by ETA")])) +
    downL("a changed bus triggers recalculation") +
    fc("⑤ ETA Engine + Stop Predictions", "ETA for the next ~10 stops of that bus → update each stop's arrival list") +
    downL("only what changed") +
    fc("⑥ Live Event Publisher", "conflate: newest value per group every 1-5 s → groups bus:201A · route:201 · stop:MG-ROAD") +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;"><div>' + downL("WebSocket — app in the foreground") + fc("Real-time Hub", "Web PubSub / SignalR groups") +
    '</div><div>' + downL("push — app in the background or closed") + fc("Favorites + Notification", "alert rule matched → FCM / APNs") + '</div></div>' +
    downL("delta arrives on the phone") +
    fc("⑦ 📱 Passenger's mobile app", "merge the delta into local state → redraw map and arrival list → show 'updated 3 s ago' → grey the bus out if updates stop", true) +
    '</div>';

  out.push(sec("Data Flow Diagram — From the Bus to the Passenger's Mobile", dataFlow +
    strong("When the passenger opens the app (the snapshot path)") +
    '<div style="margin:8px 0 14px;">' + chain([["📱 Mobile app", "open / refresh"], ["Edge + CDN", "static data cached"], ["APIM", "auth · limits"], ["Mobile BFF", "one call per screen"], ["Tracking Service", "live read model"], ["Redis", "current state"]]) +
    p("The response returns the current arrivals and positions; the app then joins its stop, route or bus groups on the real-time hub and receives only deltas from then on. If the socket cannot connect it polls the same endpoint, which is served from a short HTTP cache.") + '</div>' +
    strong("Time spent at each hop (illustrative — measure the real figures in production)") +
    tbl([1.5, 1, 2.2], ["Hop", "Typical time", "Note"], [
      ["Reporting interval (age of the data)", "0-5 s", "The bus may have moved since its last ping; the main floor on freshness"],
      ["Device to IoT Hub over 4G", "~50-300 ms", "Cellular latency varies; device buffers if the link is down"],
      ["IoT Hub to processor", "~50-150 ms", "Consumer reads from the stream"],
      ["Validate, map-match, Redis write", "~10-50 ms", "Conditional write on seq"],
      ["ETA and stop-list update", "~10-50 ms", "Next ~10 stops per ping"],
      ["Conflation wait", "1-5 s", "The largest tunable part: trades freshness against fan-out cost"],
      ["Real-time hub to phone", "~50-300 ms", "WebSocket; push notifications take longer and are best-effort"],
      ["Render on the phone", "< 50 ms", "Delta applied to local state"],
      ["Total from the GPS fix", "~2-7 s typical", "Dominated by the reporting interval and conflation, not by the cloud hops"]
    ]) +
    strong("If a hop fails") +
    tbl([1.3, 2.6], ["Hop", "What happens"], [
      ["Device or network", "Reports buffer on the bus and are sent in order when the link returns"],
      ["IoT Hub or event stream", "Producers buffer; consumers see nothing; apps show ESTIMATED then timetable ETAs; accepted events stay retained (see the stream outage section)"],
      ["Stream processor", "Another worker resumes from the checkpoint; writes are idempotent"],
      ["Redis", "Fails over to its replica; state rebuilds from the next pings and stream replay"],
      ["Real-time hub or the phone's socket", "App falls back to polling a cached endpoint; reconnect fetches a snapshot first"],
      ["Phone offline or in the background", "Last data stays on screen with a stale flag; push notifications carry alerts"]
    ]) +
    tip("The cloud hops together take well under a second. Most of the end-to-end delay is deliberate: the GPS reporting interval and the conflation window. Shorten them only if the fan-out cost and device battery allow."), false));

  out.push(sec("High-Level Flow — Telemetry to Screen (reference view)", flow +
    '<div style="margin-top:16px;">' + tbl([1.3, 2.6], ["Box in the flow", "Specified in detail under"], [
      ["Device Ingestion", "Component: Ingestion — IoT Hub and the Event Stream"],
      ["Event Streaming Platform", "Component: Ingestion, and Telemetry Processor (partitioning, replay, consumer groups)"],
      ["Vehicle State", "Component: Telemetry Processor, and Live State Store (Redis)"],
      ["ETA Engine", "Component: ETA Prediction Service"],
      ["Stop Predictions", "Component: ETA Prediction Service (per-stop arrival lists) and Live State Store"],
      ["Live Event Publisher", "Component: Real-time Delivery Hub (conflation, deltas)"],
      ["Real-time Read and Delivery Layer", "Components: Tracking API, Real-time Delivery Hub, Favorites and Notification Service"],
      ["Displays, Mobile, Web", "Components: Stop Display, and Mobile App and Web App"]
    ]) + '</div>' +
    tbl([1.3, 1.6, 1.6], ["Device ingestion choice", "IoT Hub", "Thin GPS Ingestion API"], [
      ["Best when", "Trackers can use MQTT or a device SDK and you want per-device identity", "Trackers can only send HTTPS, or a vendor gateway already forwards data"],
      ["Authentication", "Per-device certificate or token, provisioning, revocation built in", "You build device registration, credentials and revocation"],
      ["Rate limiting and validation", "Per-device throttling in the hub; payload validation in the processor", "Done in the API (it is the main job of this layer)"],
      ["Buffering and replay", "Built in through the retained stream", "Only after the API publishes to the stream — keep the API stateless and thin"],
      ["Cost of the extra layer", "None — IoT Hub is the entry point", "One more hop and a scaling unit to run and secure"]
    ]) +
    warn("This reference flow shows displays with 'Next 3 buses' — that is the exact limitation the new system removes. Stop Predictions keeps every upcoming bus per stop, and the display shows as many as fit, paging through the rest.") +
    tip("Whether you choose IoT Hub or a thin ingestion API, keep the contract the same: authenticate, validate, publish to the stream, and let everything else read from the stream. The rest of the design does not change."), false));

  out.push(sec("System Architecture Diagram — Detailed Component View", '<div style="overflow-x:auto;">' + svg + '</div>' +
    tip("Read the diagram top to bottom: devices and clients, then the edge and ingestion layer, then the services, then the data stores. The live path (GPS to screen) never touches the relational database — that is the central design decision."), false));

  // 1 Executive summary
  out.push(sec("Executive Summary",
    '<div class="two-col"><div>' +
    strong("Problem statement") +
    p("A city runs 5,000 buses across hundreds of routes and 10,000 stops. Each stop has a display that shows only the next 3 arrivals, behaving like a queue: the 4th bus appears only when one of the first three arrives. Build a new system with GPS tracking, stop displays, a mobile app and a web app that show real-time locations, route and stop information, arrival predictions, favorites, search, and every bus across every stop.") +
    strong("Scale (given and assumed)") +
    tbl([1.4, 1.6], ["Metric", "Value"], [
      ["Buses (given)", "5,000"], ["Stops with displays (given)", "10,000"], ["Routes (given)", "hundreds"],
      ["GPS reporting interval (assumption)", "every 5 s while moving"], ["Telemetry rate (derived)", "~1,000 messages/s"],
      ["Concurrent app users at peak (assumption)", "100,000"]
    ]) +
    '</div><div>' +
    strong("Core challenges") +
    ul(["Fresh ETAs: a few seconds from GPS ping to screen",
      "Predictions are only as good as the model — GPS drift, traffic, bunching, dwell time",
      "Fan-out: many viewers following the same buses, routes and stops",
      "Live path must survive database and cache failures",
      "Devices on cellular networks send late, duplicate and out-of-order data",
      "Replacing the 3-slot display model with a query over live predictions"]) +
    strong("Functional requirements") +
    ul(["Live bus locations on a map", "Route and stop information", "ETA per bus per stop",
      "Stop displays showing every upcoming bus within a horizon", "Mobile app and web app",
      "Favorite buses, routes and stops with alerts", "Search any bus, route or stop",
      "See all buses operating across all stops"]) +
    strong("Non-functional requirements (targets)") +
    tbl([1.2, 1.8], ["Attribute", "Target"], [
      ["Freshness", "GPS ping to client render within a few seconds (p95)"],
      ["Availability", "Live tracking stays up through database or single-node failures"],
      ["Staleness honesty", "A silent bus is flagged, never shown as live"],
      ["Scalability", "Adding buses is a configuration change"],
      ["Interoperability", "GTFS and GTFS-Realtime feeds for third parties"]
    ]) +
    '</div></div>'));

  // 2 capacity
  out.push(sec("Capacity Estimation",
    tbl([1.1, 1.4, 1.4, 1.1], ["Metric", "Assumption", "Calculation", "Result"], [
      ["Telemetry rate", "5,000 buses, 1 ping per 5 s", "5,000 / 5", "~1,000 msg/s (peak ~2x)"],
      ["Telemetry per day", "1,000 msg/s sustained", "1,000 x 86,400", "~86 million messages/day"],
      ["Raw volume", "~200 bytes per message", "86.4M x 200 B", "~17 GB/day, ~6 TB/year before compression"],
      ["ETA recalculations", "next ~10 stops per ping", "1,000 x 10", "~10,000 ETA updates/s"],
      ["Redis memory", "5,000 bus hashes + 10,000 stop sorted sets", "small objects, tens of entries per stop", "tens of MB — sized for throughput, not memory"],
      ["Display reads", "10,000 displays polling every 15 s", "10,000 / 15", "~670 req/s, served from a 2-5 s cache"],
      ["App reads (fallback polling)", "100,000 users, 1 request per 10 s", "100,000 / 10", "~10,000 req/s, mostly cache hits"],
      ["Real-time fan-out", "100,000 users x ~3 groups, 1 update per 2 s", "100,000 x 3 / 2", "~150,000 deliveries/s — handled by a managed service"],
      ["Stream processors", "1,000 msg/s, ~500 msg/s per worker with headroom", "1,000 / 500", "a handful of workers; partition count sets the ceiling"]
    ]) +
    warn("Every input above except the bus and stop counts is my assumption. State this in the interview and ask the interviewer for the real ping interval, peak user count and required freshness — the architecture does not change, but the sizing does.") +
    tip("The surprise in this system is that telemetry ingestion is small. The hard parts are accurate ETAs and fan-out to viewers, not raw message volume.")));

  // 3 API design
  out.push(sec("API Design",
    strong("Passenger and display APIs (read side)") +
    tbl([2.2, 2.6], ["Endpoint", "Purpose"], [
      ["GET /stops/{id}/arrivals?horizon=60", "Every bus reaching this stop within the horizon, sorted by ETA — used by displays, mobile and web"],
      ["GET /routes/{id}/buses", "Live buses on a route: position, distance, next stop, ETA"],
      ["GET /buses/{id}", "One bus: location, distance away, next stop, ETA, last-updated age"],
      ["GET /buses?bbox=...&zoom=...", "All buses inside the visible map area; clustered at low zoom"],
      ["GET /routes/{id}, GET /stops/{id}", "Static reference data with an ETag for caching"],
      ["GET /search?q=...", "Search buses, routes and stops"],
      ["PUT / DELETE /me/favorites", "Add or remove a favorite bus, route or stop"],
      ["GET /gtfs, GET /gtfs-realtime/vehicle-positions, /trip-updates", "Standard feeds for third-party apps"]
    ]) +
    strong("Real-time channels") +
    tbl([1.6, 2.4], ["Group", "Who joins and what they receive"], [
      ["stop:{stopId}", "Displays and passengers at that stop — the arrivals list as deltas"],
      ["route:{routeId}", "Route map viewers — position and ETA updates for the route's buses"],
      ["bus:{busId}", "Users tracking one bus"]
    ]) +
    strong("Device contract (bus tracker to IoT Hub)") +
    code('{ "busId": "201A", "seq": 918273, "ts": "2026-10-12T09:15:04Z",\n  "lat": 12.9716, "lon": 77.5946, "speedKmh": 24.5, "heading": 87,\n  "tripId": "T-201-0915", "fix": "3D" }\n\n// seq increases per device, so the server can drop duplicates and late messages.\n// ts is the device time of the GPS fix, not the arrival time at the cloud.') +
    code('GET /routes/201/buses  ->\n[\n  { "bus": "201A", "distanceKm": 1.2, "nextStop": "MG Road", "etaMin": 4,  "updatedSecAgo": 3 },\n  { "bus": "201B", "distanceKm": 3.7, "nextStop": "Trinity", "etaMin": 11, "updatedSecAgo": 5 }\n]\n// updatedSecAgo lets the client grey out a bus whose GPS has gone quiet.')));

  // 4 HLD
  out.push(sec("High-Level Architecture",
    code(
      "[Bus Tracker x5,000]    [Stop Display x10,000]   [Mobile]  [Web]  [3rd-party]\n" +
      "        |                         |                 |        |         |\n" +
      "     MQTT/TLS             WebSocket or poll         +--------+---------+\n" +
      "        |                         |                          |\n" +
      "   [IoT Hub]               [Real-time Hub]        [Front Door / CDN / WAF]\n" +
      "   DPS, twin, routing      Web PubSub groups                 |\n" +
      "        |                         ^                [API Management]\n" +
      "        v                         |                          |\n" +
      "[Telemetry Processor] --> [ETA Service] ----+     +----------+---------+--------+\n" +
      "   validate, dedupe,       map-match,       |     |          |         |        |\n" +
      "   order, archive          predict          |  [Tracking] [Reference] [Search] [Fav+Notify]\n" +
      "        |                       |           |     |          |         |        |\n" +
      "        v                       v           v     v          v         v        v\n" +
      "  [Data Lake/ADX]           [ Redis ] <-----+-----+      [PostgreSQL] [Index]  [FCM/APNs]\n" +
      "   history, ML              live state, geo              reference, users, HA\n"
    ) +
    '<div class="two-col" style="margin-top:16px;"><div>' +
    strong("Ingestion path") +
    p("Trackers hold a persistent MQTT connection to IoT Hub. Events land in the hub's Event Hub-compatible endpoint, partitioned by bus id. A pool of stream processors validates, orders, map-matches and predicts, then writes live state to Redis and publishes deltas to the real-time hub.") +
    strong("Read path") +
    p("Clients reach the API through Front Door and API Management. Live data is read from Redis; reference data comes from a heavily cached PostgreSQL. Static route and stop data is also served from the CDN.") +
    '</div><div>' +
    strong("Real-time path") +
    p("The ETA service publishes conflated deltas to groups per stop, route and bus. A managed real-time service holds the connections so the API pods do not. Displays and apps join only the groups they follow.") +
    strong("Why the live path avoids the database") +
    p("Live positions and arrival lists are derived state that the stream can rebuild. Keeping PostgreSQL off that path means a database failover degrades writes and uncached reads, but passengers still see moving buses.") +
    '</div></div>'));

  // component deep dives
  out.push(sec("Layer: Edge and APIM (API Management)",
    comp("Every client request — displays, apps, web, third parties — passes through the edge and then API Management. This is where cross-cutting concerns are enforced once, instead of in every service.", [
      ["Edge (Front Door + WAF + CDN)", "TLS termination, web application firewall, DDoS protection, global routing, and CDN caching of static route, stop and shape data"],
      ["Responsibility of APIM", "Authenticate and authorise callers, apply rate limits and quotas, version the API, route to the right backend, cache short-lived responses, and record analytics"],
      ["Authentication", "Validate JWTs for signed-in users (favorites); subscription keys or client credentials for third-party GTFS consumers; a device token scoped to one stop for displays; anonymous read-only access for public live data, with tight limits"],
      ["Rate limits and quotas", "Per client and per IP: stops scraping and runaway retry loops. Higher quotas for displays and partners, lower for anonymous callers"],
      ["Response caching", "Short TTL (2-5 s) on popular read endpoints — thousands of identical requests collapse into one backend call"],
      ["Versioning", "Path or header versions so mobile apps in the field keep working while the API evolves"],
      ["Routing and backends", "Private connectivity from APIM to AKS; separate backends per BFF; circuit breaking so a slow backend does not hold gateway connections"],
      ["Observability", "Request logs and metrics per API, product and client; correlation id passed to the backends"],
      ["Scaling and HA", "Choose a tier that supports zone redundancy and enough units for peak requests — verify current tier capabilities in the Azure documentation"],
      ["Failure modes", "APIM degraded: the CDN still serves static data; displays fall back to their cached timetable. Keep the gateway stateless so an instance can be replaced instantly"]
    ])));

  out.push(sec("Layer: API Layer (backends-for-frontends)",
    comp("A thin layer between APIM and the services. It exists so each client gets exactly the payload it needs, and so services stay free of client-specific code.", [
      ["Responsibility", "Shape and aggregate: one call returns what a whole screen needs; translate between client contracts and service contracts; add HTTP caching headers"],
      ["Members", "Mobile BFF (aggregates stop, arrivals and favorites into one call), Web BFF (map viewport queries, search), Display API (tiny payloads, long-poll friendly), Public Feed API (GTFS and GTFS-Realtime)"],
      ["What it must NOT do", "Business rules, data ownership or direct database access — those belong to the microservices behind it"],
      ["Contracts", "REST/JSON for clients; versioned; pagination and ETags; every item carries updatedSecAgo and a status (LIVE, ESTIMATED, STALE)"],
      ["Calls downstream", "Parallel calls to services with timeouts, retries with jitter and circuit breakers (Polly); partial responses are better than failing the whole screen"],
      ["Stateless", "No session state; scale horizontally on request rate; any pod can serve any request"],
      ["Real-time", "Hands the client a signed token and group names for the real-time hub, so the BFF never holds sockets"],
      ["Failure modes", "A slow service returns a partial result with a flag, not an error for the whole page"]
    ], code(
      "GET /mobile/stops/MG-ROAD/home   (Mobile BFF)\n" +
      "   -> calls in parallel:  Tracking Service  (arrivals, live)\n" +
      "                          Reference Data     (stop info, from cache)\n" +
      "                          Favorites Service  (is this stop a favorite)\n" +
      "   -> returns ONE payload for the screen; if Favorites is slow, returns without it and flags it"
    ))));

  out.push(sec("Layer: Microservices (service catalogue and boundaries)",
    p("Services are split by the data and the change rate they own, not by technical layer. Start with a small number of deployables and split further only when a boundary hurts.") +
    tbl([1.1, 1.4, 1.2, 1.4], ["Service", "Owns", "Data store", "Scaling driver"], [
      ["Vehicle State (telemetry processor)", "Trusted latest state per bus; arrival detection", "Redis (derived), stream checkpoint", "Consumer lag, partition count"],
      ["ETA Engine", "Predictions per bus per stop; algorithm versions", "Redis (derived); history in the lake", "ETA recalculations per second (CPU)"],
      ["Stop Predictions", "All upcoming buses per stop, sorted by ETA", "Redis sorted sets", "Same as ETA Engine — often one deployable with it"],
      ["Live Event Publisher", "Conflation and delivery of deltas", "None (in-memory buffer)", "Update rate, group count"],
      ["Tracking Service", "Live read model for the APIs", "Redis (read-only)", "Request rate"],
      ["Reference Data", "Routes, stops, timetables, GTFS import and export", "PostgreSQL + PostGIS", "Read rate; mostly cache hits"],
      ["Search", "Stops, routes, buses index", "In-memory or search index", "Query rate"],
      ["Favorites + Notification", "Favorites, alert rules, push tokens", "PostgreSQL (own schema)", "Active users, alert volume"],
      ["Display Manager", "Display identity, config, health", "PostgreSQL (own schema)", "Number of displays (small)"]
    ]) +
    code(
      "Communication rules\n" +
      "  synchronous  : API layer -> service over REST or gRPC, with timeouts and circuit breakers\n" +
      "  asynchronous : events on a broker for changes other services care about\n" +
      "                   RouteChanged(id, version)   ArrivalDetected(bus, stop, time)\n" +
      "                   EtaUpdated(bus, stop, eta)  AlertTriggered(user, bus)\n" +
      "  data         : each service owns its tables; no shared-database access between services\n" +
      "  reliability  : outbox pattern for events published after a database write; idempotent consumers\n" +
      "  deployables  : start with ~5 (processor + ETA, Tracking, Reference, Favorites + Notify, Display Manager)"
    ) +
    warn("Do not split into a dozen tiny services on day one. The latency-sensitive path (processor, ETA, stop predictions) shares data shape and change rate, so it can start as one deployable and be split when a real scaling or ownership boundary appears.")));

  out.push(sec("Layer: Cache Layer (three levels)",
    tbl([0.9, 1.6, 1.3, 2.1], ["Level", "What it holds", "Lifetime", "Invalidation and staleness"], [
      ["L0 — CDN and HTTP cache", "Static route, stop and shape data; short-lived popular API responses", "Long for static (versioned); 2-5 s for live reads", "Versioned URLs or ETag revalidation; live responses expire on their own"],
      ["L1 — in-process (HybridCache)", "Reference data for the service's own requests; ETA model inputs", "Minutes", "Versioned keys; refreshed on RouteChanged events; serve-stale-on-error"],
      ["L2 — Redis", "Live bus state, per-stop arrivals, geo index, route membership; shared reference data", "TTL of a few pings for live keys", "Live keys expire if the bus goes silent; conditional writes by seq"]
    ]) +
    tbl([1.2, 2.6], ["Concern", "Design"], [
      ["Redis topology", "A primary with at least one replica in another zone (managed Redis, zone-redundant). Replication is asynchronous, so a failover can lose the last few writes — acceptable because live state is rebuilt from the next pings and the stream"],
      ["Sizing", "Tens of MB of data; size for operations per second and connection count, not memory. Cluster mode only if throughput requires it"],
      ["Stampede protection", "Single-flight on miss (one backend call per key), TTL jitter, stale-while-revalidate for reference data"],
      ["Consistency", "Live data: fresh-or-flagged. Reference data: versioned keys so a reader never mixes versions"],
      ["Cold start / flush", "Warm from the stream (processors replay a few minutes) before opening traffic; protect the database with single-flight and limits meanwhile"],
      ["Failure behaviour", "Redis down: serve last-known from L1 with a stale flag, fall back to timetable data; clients use a circuit breaker and short timeouts"]
    ])));

  out.push(sec("Layer: Database with Replication (PostgreSQL)",
    code(
      "                 writes (admin changes, favorites)\n" +
      "                              |\n" +
      "                  +-----------v-----------+\n" +
      "                  |  PRIMARY   (zone 1)   |\n" +
      "                  +-----------+-----------+\n" +
      "          synchronous |       | asynchronous          | asynchronous, cross-region\n" +
      "                      v       v                       v\n" +
      "       +--------------+--+ +--+-----------------+ +---+--------------------+\n" +
      "       | STANDBY (zone 2)| | READ REPLICA(S)    | | DR REPLICA (region 2)  |\n" +
      "       | high availability| | same region        | | disaster recovery      |\n" +
      "       | auto failover    | | reads, reports,    | | promoted by runbook    |\n" +
      "       +------------------+ | search-index builds| +------------------------+\n" +
      "                            +--------------------+"
    ) +
    tbl([1.1, 1.5, 1.6, 1.5], ["Copy", "Replication", "Purpose", "Data loss on failure (RPO)"], [
      ["Primary", "—", "All writes; strongly consistent reads", "—"],
      ["Standby, other zone", "Synchronous", "Automatic failover for a zone or node failure", {t: "Committed transactions are not lost", c: "dt-yes"}],
      ["Read replica(s), same region", "Asynchronous", "Scale reads, reporting, search-index rebuilds", {t: "May lag; never used as the failover target", c: "dt-no"}],
      ["DR replica, second region", "Asynchronous", "Regional disaster recovery", {t: "Bounded by replication lag — monitor and alert", c: "dt-no"}]
    ]) +
    tbl([1.2, 2.6], ["Topic", "Design"], [
      ["What actually hits the database", "Admin edits, favorites and cache misses on reference data — a few hundred requests per second at most. The live path (GPS to screen) never touches it"],
      ["Read routing", "Cache first, then a read replica. After a write, read from the primary or wait for the version event so a user never sees their own change missing (read-your-writes)"],
      ["Replication lag", "Alert when lag exceeds a threshold; a lagging replica is removed from the read pool automatically"],
      ["Failover — what happens", "Failure detected -> old primary fenced so it cannot accept writes (no split brain) -> standby promoted after replaying its log -> the same endpoint points at the new primary -> applications reconnect with retry and backoff. Typically a minute or two; check your tier's documented figure"],
      ["During failover", "Reads continue from Redis, cache and replicas; writes fail fast or are queued; live tracking is unaffected"],
      ["Data loss handling", "Synchronous standby for in-region failures; idempotent writes with request ids so retries cannot double-apply; point-in-time restore for corruption or human error; decide RPO per data type"],
      ["Connections", "Connection pooling (built-in pooler or your own) so many service pods do not exhaust database connections"],
      ["Schema changes", "Expand then contract migrations, so old and new service versions both work during a rollout"],
      ["Geo data", "PostGIS geometry with GIST indexes for stop and route-shape queries"],
      ["Backups", "Automated backups with point-in-time restore, tested by regular restore drills"]
    ])));

  out.push(sec("Component: Bus GPS Tracker (on-board unit)",
    comp("The device is the first source of truth, and the least reliable part of the system: it sits on a vehicle, on a cellular network, with intermittent signal.", [
      ["Responsibility", "Read GNSS position, speed and heading; send timestamped, sequence-numbered reports; buffer when offline; accept configuration from the cloud"],
      ["Interfaces", "Out: MQTT over TLS to IoT Hub (telemetry). In: device twin desired properties (reporting interval, firmware version) and cloud-to-device commands"],
      ["Identity", "Per-device X.509 certificate, ideally in a secure element; provisioned through the Device Provisioning Service; individually revocable"],
      ["Reporting policy", "Adaptive: every ~5 s while moving, every 30-60 s when parked, faster near stops; also send on a significant heading or speed change. Policy comes from the twin, so it changes without a firmware update"],
      ["Offline behaviour", "Store reports in local flash with their sequence numbers; on reconnect, send a batch oldest-first. The server uses seq and the fix timestamp to place them correctly"],
      ["Time", "Use GNSS time for the timestamp, not the modem clock, so reports are comparable across buses"],
      ["Updates", "Firmware over the air through the twin / device update service, staged by route or batch"],
      ["Failure modes", "No GPS fix (tunnel, depot): report last fix flagged with fix quality; modem loss: buffer; clock jump: reject using GNSS time"]
    ])));

  out.push(sec("Component: Ingestion — IoT Hub and the Event Stream",
    comp("IoT Hub is the single entry point for device traffic. It does the device-facing work so the processing tier only reads a clean, retained stream.", [
      ["Responsibility", "Authenticate devices, terminate MQTT connections, enforce per-device throttling, route messages, expose an Event Hub-compatible endpoint for consumers"],
      ["Why not an App Service in front", "An HTTP front end adds a hop and a bottleneck and lacks device identity, lightweight persistent connections, buffering and cloud-to-device config. The hop's latency is not the issue (milliseconds); the missing capabilities are. See the Round 3 interview page for the full comparison"],
      ["Why not Event Hubs directly", "Fine for trusted backend producers; for thousands of individual devices you want per-device identity, provisioning, twins and commands, which IoT Hub provides. IoT Hub still gives you an Event Hub-style endpoint"],
      ["Partitioning", "Key by bus id so one bus always lands in one partition — ordering per bus is preserved. Partition count is fixed at creation, so choose it with headroom"],
      ["Sizing", "Sized by messages per day per unit. At ~86M messages/day pick the tier and unit count deliberately and verify current limits in the Azure documentation; twins and cloud-to-device need the Standard tier"],
      ["Retention and replay", "Events are retained for a configurable period, so processors can restart and replay from their checkpoint, and Redis can be rebuilt from the stream"],
      ["Archive", "Capture the stream to the data lake for ML training and ETA backtesting"],
      ["Failure modes", "Hub regional outage: manual failover to the paired region plus device re-provisioning (verify RTO); burst after an outage: the hub buffers, processors catch up by lag-based scaling"]
    ])));

  out.push(sec("Component: Telemetry Processor (stream processing)",
    comp("A stateless worker pool consuming the stream. This is where raw GPS becomes clean, ordered, map-matched bus state.", [
      ["Responsibility", "Validate, de-duplicate, order, map-match, detect arrivals, update Redis, trigger ETA recalculation, archive"],
      ["Technology", "AKS workers using the Event Hubs processor library (or Azure Functions / Stream Analytics / Flink for the same role); one consumer group; checkpoint after successful processing"],
      ["Scaling unit", "One worker per partition or group of partitions; add workers up to the partition count; autoscale on consumer lag (KEDA)"],
      ["State", "Stateless. Anything it needs (route geometry, last sequence per bus) comes from Redis or an in-process cache"],
      ["Idempotency", "Every write is conditional on seq, so a replay after a crash cannot move a bus backwards"],
      ["Poison messages", "Malformed or impossible readings (speed 400 km/h, position far from any route) go to a dead-letter store and never block the partition"],
      ["Failure modes", "Worker crash: another worker takes the partition and resumes from the checkpoint; Redis unavailable: retry with backoff, the stream retains the data"]
    ], code(
      "per message:\n" +
      "  1 parse and validate         reject impossible speed or position\n" +
      "  2 de-duplicate               (busId, seq) already seen -> ignore\n" +
      "  3 order check                seq lower than stored seq -> drop (late)\n" +
      "  4 map-match                  snap the point to the route polyline\n" +
      "  5 detect arrival             geofence crossing -> arrival event (ground truth)\n" +
      "  6 write live state           conditional update in Redis\n" +
      "  7 recompute ETA              next ~10 stops for this bus\n" +
      "  8 publish deltas             conflated, to stop / route / bus groups\n" +
      "  9 archive                    stream capture to the data lake"
    ))));

  out.push(sec("Component: ETA Prediction Service",
    comp("The component that decides whether passengers trust the product. Keep the first version simple, make it measurable, and improve it behind a flag.", [
      ["Responsibility", "Given a bus's snapped position and its route, produce an ETA for each upcoming stop, with a confidence and a staleness flag"],
      ["Inputs", "Map-matched position and live speed; route segments; historical segment speeds by day type and hour; dwell times per stop; timetable; optional traffic feed"],
      ["Algorithm v1", "Sum over road segments of length / expected speed (live speed blended with history), plus expected dwell at each stop in between"],
      ["Algorithm v2 (later)", "A model (for example gradient-boosted trees) trained offline on archived telemetry and served in-process so latency stays low. Introduce only after v1 has a measured baseline"],
      ["Edge cases", "Bus waiting at a terminus for its departure time: hold the schedule-based ETA until it moves. Detour: re-match to the closest valid segment or flag as off-route. First minutes of a trip: little live history, so lean on the timetable"],
      ["Staleness", "Position older than ~60 s: show an estimate flagged as estimated; older than a few minutes: remove from the live list"],
      ["Display rules", "Round to whole minutes; under a minute shows Due; far ETAs (for example over 30 min) can show the scheduled time instead"],
      ["Versioning", "Every prediction records the algorithm version, so versions can be compared against real arrivals (see ETA evaluation below)"],
      ["Scaling", "Stateless and CPU-bound; scale horizontally; ~10,000 predictions/s at the estimated load"],
      ["Failure modes", "Model or history store unavailable: fall back to the v1 formula, then to timetable ETAs, always flagged"]
    ], code(
      "double EtaSeconds(BusState bus, Stop target, DateTimeOffset now)\n" +
      "{\n" +
      "    var segments = route.SegmentsBetween(bus.SnappedPosition, target);\n" +
      "    double seconds = 0;\n" +
      "    foreach (var seg in segments)\n" +
      "    {\n" +
      "        var speed = speedModel.Expected(seg, now, bus.LiveSpeedMps);  // live + historical\n" +
      "        seconds += seg.LengthMeters / Math.Max(speed, 1.0);\n" +
      "    }\n" +
      "    seconds += segments.Count(s => s.EndsAtStop) * dwellModel.Expected(now);\n" +
      "    return seconds;\n" +
      "}"
    ))));

  out.push(sec("Component: Live State Store (Redis)",
    comp("Redis is the serving store for everything that changes every few seconds. It holds derived state, so it can be rebuilt.", [
      ["Responsibility", "Latest state per bus, per-stop arrival lists, geo index for map queries, route membership"],
      ["Technology", "Managed Redis with zone-redundant replicas (Azure Managed Redis or Azure Cache for Redis); cluster mode only if throughput requires it"],
      ["Data structures", "HASH bus:{busId} · GEO geo:buses · SET route:{routeId}:buses · ZSET stop:{stopId}:arrivals (score = ETA epoch)"],
      ["Expiry", "bus keys carry a TTL of a few ping intervals (about 30 s, assumption): a silent bus expires and is shown as offline rather than live"],
      ["Updates", "Conditional writes (Lua script or compare-and-set on seq) so late messages never overwrite newer ones"],
      ["Sizing", "Tens of MB of data; sized for operations per second and connection count, not memory"],
      ["Rebuild", "If lost: buses rewrite their keys within one ping interval; processors can replay a few minutes of the stream to rebuild arrival lists at once"],
      ["Failure modes", "Replica failover takes seconds; clients use a circuit breaker, short timeouts and a small in-process last-known cache"]
    ], code(
      "bus:201A              HASH  lat lon speed heading routeId tripId nextStopId seq ts   (TTL ~30 s)\n" +
      "geo:buses             GEO   201A -> (lon, lat)\n" +
      "route:201:buses       SET   201A 201B 201C\n" +
      "stop:MG-ROAD:arrivals ZSET  member '201A|T-201-0915'  score = eta epoch seconds\n" +
      "\n" +
      "-- stops view for a display:  ZRANGEBYSCORE stop:MG-ROAD:arrivals now now+3600 WITHSCORES\n" +
      "-- bus on the map:            GEOSEARCH geo:buses FROMLONLAT ... BYBOX ... "
    ))));

  out.push(sec("Component: Reference Data Service (routes, stops, schedules)",
    comp("Authoritative route, stop and timetable data. It changes rarely, is read constantly, and is the only place the relational database is on a request path — and even there it is behind caches.", [
      ["Responsibility", "Own routes, route-stop sequences, stop locations, timetables and service calendars; import and export GTFS; publish change events"],
      ["Technology", "ASP.NET Core on AKS; PostgreSQL with PostGIS for geometry; outbox table for change events"],
      ["Reads", "Cache-aside with versioned keys; CDN for static route and stop payloads; ETag so clients revalidate cheaply"],
      ["Writes", "Admin changes update PostgreSQL and the outbox in one transaction; a publisher emits RouteChanged(id, version); caches and processors refresh"],
      ["GTFS", "Import the city's GTFS static feed to bootstrap; regenerate the feed on change; expose GTFS-Realtime (vehicle positions, trip updates, alerts) built from live state"],
      ["Scaling", "Read-heavy and cache-friendly; add read replicas and CDN before adding service instances"],
      ["Failure modes", "Database down: serve last known cached version; admin writes fail fast with a clear message"]
    ])));

  out.push(sec("Component: Tracking API (live read side)",
    comp("A stateless read API that composes live data from Redis with reference data. This is what the mobile app, web app and displays call when they are not on a socket.", [
      ["Responsibility", "Arrivals per stop, buses per route, one bus, buses in a map viewport; shape payloads for each client"],
      ["Technology", "ASP.NET Core minimal APIs on AKS; Redis for live reads; HybridCache for reference data"],
      ["Caching", "Short HTTP cache (2-5 s) on popular stop and route responses so thousands of identical requests become one Redis read"],
      ["Map queries", "Viewport (bounding-box) queries on the Redis geo index; server-side clustering when zoomed out; never return all 5,000 buses to every client"],
      ["Contracts", "Every item has updatedSecAgo and a status (LIVE, ESTIMATED, STALE) so the client can render honestly"],
      ["Scaling", "Stateless; scale on request rate and CPU; a cache hit ratio dashboard guards against stampedes"],
      ["Failure modes", "Redis down: serve last-known from in-process cache with a stale flag, then degrade to timetable data"]
    ])));

  out.push(sec("Component: Real-time Delivery Hub (fan-out)",
    comp("Pushes changes to everyone who is watching, without the API pods holding hundreds of thousands of connections.", [
      ["Responsibility", "Maintain client connections, manage groups, deliver deltas, handle reconnects"],
      ["Technology", "Azure Web PubSub or SignalR Service; groups per stop, route and bus"],
      ["Publishing", "The ETA service enqueues updates per group; a flusher sends the latest value per group every 1-5 s (conflation)"],
      ["Payloads", "Deltas only: bus id, ETA, position, status — not the whole list"],
      ["Reconnect", "A reconnecting client fetches the current snapshot from the API first, then resumes deltas — it never assumes it missed nothing"],
      ["Mobile in background", "Use push notifications (FCM, APNs) instead of sockets; the OS kills background connections and sockets drain battery"],
      ["Fallback", "If a socket cannot connect, the client polls an endpoint with a short HTTP cache"],
      ["Failure modes", "Hub degraded: clients automatically fall back to polling; no data is lost because state lives in Redis"]
    ], code(
      "// conflation: newest value per group wins; flush every 2 seconds\n" +
      "ConcurrentDictionary<string, EtaUpdate> pending = new();\n" +
      "void Enqueue(string group, EtaUpdate u) => pending[group] = u;\n" +
      "\n" +
      "async Task FlushAsync(CancellationToken ct)\n" +
      "{\n" +
      "    foreach (var (group, _) in pending.ToArray())\n" +
      "        if (pending.TryRemove(group, out var latest))\n" +
      "            await pubSub.SendToGroupAsync(group, latest, ct);   // one message per group per tick\n" +
      "}"
    ))));

  out.push(sec("Component: Stop Display (and Display Manager)",
    comp("The old display is a queue of three. The new display is a view over live predictions.", [
      ["Old behaviour", "Three slots filled first-in first-out: a bus enters the list only when a slot frees, so the 4th bus is invisible until an arrival"],
      ["New behaviour", "Query: every bus whose upcoming stops include this stop, with ETA inside a horizon (for example 60 minutes), sorted by ETA. Render the top N that fit, page or rotate through the rest, show '+k more'"],
      ["Connectivity", "Subscribes to its own stop group over WebSocket; if the hardware is low-power or the socket fails, it polls GET /stops/{id}/arrivals every 15-30 s from a short cache"],
      ["Layout", "Route number, destination, ETA in minutes ('Due' under a minute), and a marker for estimated or scheduled times; auto-rotate pages every ~8 s"],
      ["Offline", "If no update for ~60 s, show the last data with a visible banner and fall back to the cached timetable — never frozen times that look live"],
      ["Display Manager", "A small service for fleet management: device identity, configuration (stop id, brightness, language), health reporting, remote restart, content updates and service alerts"],
      ["Scaling", "10,000 displays at one request per 15 s is ~670 req/s of cache hits — trivial"],
      ["Failure modes", "Cloud unreachable: timetable fallback; hardware fault: reported through the manager and shown on the ops dashboard"]
    ])));

  out.push(sec("Component: Mobile App and Web App (client architecture)",
    comp("", [
      ["Map and list", "Map view of buses near the user (viewport query) plus a list view by stop and route; both update from real-time groups"],
      ["Follow model", "Following a stop, route or bus joins its group; unfollowing leaves it — traffic is proportional to what the user watches"],
      ["Favorites", "Stored locally first and synced to the account when the user signs in; anonymous browsing needs no login"],
      ["Notifications", "Server-side thresholds (for example bus within 3 minutes of a favorite stop) send push notifications through FCM and APNs"],
      ["Offline and weak signal", "Cache route and stop data on the device; show the timetable when live data is unavailable; label stale data"],
      ["Battery and data", "Sockets only in the foreground; push in the background; delta updates; compress payloads"],
      ["Web app", "Same APIs and groups; SPA with map tiles from a map provider; server-rendered stop pages for search engines and sharing"],
      ["Accessibility", "Large type and screen-reader labels for arrivals; arrival announcements for visually impaired users"]
    ])));

  out.push(sec("Component: Search Service",
    comp("", [
      ["Responsibility", "Find buses, routes and stops by name, number or partial text, with typo tolerance"],
      ["Scale check", "10,000 stops, hundreds of routes and 5,000 buses is a small catalogue — it fits in memory. Start with PostgreSQL trigram search or an in-process index; adopt a search service only if you need multi-language, ranking or heavy typo tolerance"],
      ["If a search service", "Azure AI Search or Elasticsearch; index rebuilt from reference data on RouteChanged events; it is never on the live path"],
      ["Ranking", "Exact route-number matches first, then stops near the user, then fuzzy matches"],
      ["Failure modes", "Search down: fall back to a simple prefix query on PostgreSQL; live tracking unaffected"]
    ])));

  out.push(sec("Component: Favorites and Notification Service",
    comp("", [
      ["Responsibility", "Store favorites per user; evaluate alert rules against ETA changes; send push notifications"],
      ["Storage", "PostgreSQL (favorites table); per-user cache with a short TTL, invalidated on write"],
      ["Alert evaluation", "Consume ETA update events; for each followed stop and route, check thresholds; de-duplicate so a user gets one alert per approach, not one per update"],
      ["Delivery", "FCM and APNs through a notification hub or directly; quiet hours and per-user limits"],
      ["Privacy", "Store the minimum: user id, push token, favorites; allow deletion; location of the user is not stored"],
      ["Failure modes", "Push provider outage: retry with backoff, drop alerts that have become stale (a 'bus in 3 min' alert 10 minutes late is worse than none)"]
    ])));

  // data
  out.push(sec("Database Design",
    strong("PostgreSQL + PostGIS — reference and user data (system of record)") +
    code(
      "stops        (stop_id PK, name, geom POINT, zone, accessible bool)\n" +
      "routes       (route_id PK, short_name, long_name, direction, shape LINESTRING, version int)\n" +
      "route_stops  (route_id FK, direction, seq int, stop_id FK, dist_from_start_m int)  PK(route_id, direction, seq)\n" +
      "segments     (segment_id PK, route_id FK, from_seq, to_seq, length_m)               -- for ETA\n" +
      "timetable    (trip_id PK, route_id FK, service_id, start_time, ...)\n" +
      "buses        (bus_id PK, device_id UNIQUE, route_id FK NULL, status)\n" +
      "users        (user_id PK, created_at)\n" +
      "favorites    (user_id FK, kind ENUM('bus','route','stop'), ref_id, created_at)      PK(user_id, kind, ref_id)\n" +
      "push_tokens  (user_id FK, token, platform, updated_at)\n" +
      "outbox       (id PK, topic, payload jsonb, created_at, published_at NULL)\n" +
      "\n" +
      "Indexes: GIST on stops.geom and routes.shape; (route_id, direction, seq); favorites by user."
    ) +
    strong("Redis — live derived state") + p("Keys and TTLs as listed under the Redis component. Everything in Redis can be recomputed from the stream.") +
    strong("Data lake / Azure Data Explorer — history") +
    code(
      "telemetry     (busId, seq, ts, lat, lon, speed, heading, tripId, routeId)       partitioned by date\n" +
      "arrivals      (busId, tripId, stopId, arrivedAt)                                 -- ground truth\n" +
      "predictions   (busId, tripId, stopId, madeAt, etaAt, algoVersion)                -- for evaluation\n" +
      "segment_speed (segmentId, dayType, hourBucket, medianSpeed, p10, p90)            -- ETA training output"
    ) +
    tip("Three stores, three jobs: PostgreSQL for data that must be correct and consistent, Redis for data that must be fresh, and the lake for data that must be kept. None of them tries to do the others' job.")));

  out.push(sec("Data Flow — Key Scenarios",
    strong("A. A bus moves: GPS ping to every screen") +
    code(
      "1  tracker sends report (seq 918273) over MQTT                         t = 0\n" +
      "2  IoT Hub authenticates the device, writes to the stream partition   +~50 ms\n" +
      "3  processor reads it, validates, drops if seq is old                 +~100 ms\n" +
      "4  map-match, arrival check, conditional write to Redis                +~120 ms\n" +
      "5  ETA service recomputes next ~10 stops, updates the stop ZSETs      +~150 ms\n" +
      "6  deltas queued per group; flusher sends within 1-5 s (conflation)   +1-5 s\n" +
      "7  displays and apps receive the delta and re-render                  +~1 s\n" +
      "(timings are illustrative; measure the real end-to-end latency in production)"
    ) +
    strong("B. A passenger opens the app at a stop") +
    code(
      "1  app asks for stop/route data   -> CDN or cache (ETag revalidation)\n" +
      "2  app calls GET /stops/{id}/arrivals?horizon=60 -> API -> Redis ZSET (cache 2-5 s)\n" +
      "3  app joins group stop:{id} and receives deltas from then on\n" +
      "4  if the socket fails, the app polls the same endpoint every 10-15 s"
    ) +
    strong("C. Favorite alert") +
    code(
      "1  ETA update for bus 201A at MG Road: 4 min -> 3 min\n" +
      "2  notification service finds users following MG Road or route 201 with a 3-minute rule\n" +
      "3  de-duplicate (one alert per approach) and send via FCM / APNs"
    ) +
    strong("D. Display boots or reconnects") +
    code(
      "1  display authenticates with its device identity, asks the Display Manager for config\n" +
      "2  fetches the current arrivals snapshot, then joins its stop group\n" +
      "3  if it cannot reach the cloud: show cached timetable with an offline banner"
    ) +
    strong("E. Route change by an administrator") +
    code(
      "1  admin edits a route -> PostgreSQL + outbox row in one transaction\n" +
      "2  publisher emits RouteChanged(id, version=7)\n" +
      "3  caches refresh route:{id}:v7, search index updates, processors reload geometry\n" +
      "4  clients see the new version through the ETag"
    )));

  out.push(sec("Caching Strategy",
    tbl([1.3, 1.2, 1.1, 1.8], ["Data", "Where", "Lifetime", "Staleness handling"], [
      ["Routes, stops, shapes", "CDN + Redis + in-process", "Long, versioned keys", "Invalidate by version; clients revalidate with ETag"],
      ["Latest bus position", "Redis only", "TTL of a few pings", "Key expires -> bus shown offline"],
      ["Per-stop arrivals", "Redis ZSET", "Rewritten each update", "Entries carry computed-at time; old ones flagged or dropped"],
      ["Popular API responses", "Short HTTP cache", "2-5 s", "Collapses identical requests into one"],
      ["Favorites", "Redis per user", "Minutes", "Invalidate on write"],
      ["ETA model inputs", "In-process", "Refreshed periodically", "Keep last known good if refresh fails"]
    ]) +
    code(
      "Rules:  timestamp every item · show staleness honestly · TTL with jitter ·\n" +
      "        single-flight refill · versioned keys · serve stale on error\n" +
      "Never:  cache an ETA longer than the next update interval and show it as live."
    )));

  out.push(sec("Consistency — How Redis and PostgreSQL Stay in Sync",
    tbl([1.1, 1.3, 2.4], ["Data", "Source of truth", "How the cache stays correct"], [
      ["Live bus state", "The event stream", "Processors write Redis directly; Redis is rebuildable from the stream; no database sync at all"],
      ["Reference data", "PostgreSQL", "Cache-aside with versioned keys and event-driven invalidation through an outbox"],
      ["Favorites", "PostgreSQL", "Cache-aside per user with a short TTL, invalidated on write"]
    ]) +
    tip("The outbox pattern means the cache is refreshed after the database commit, never before, and never by a best-effort call that can be lost.")));

  out.push(sec("Failure Handling and High Availability",
    tbl([1.3, 2.4, 1.7], ["Failure", "Behaviour", "Recovery"], [
      ["Bus tracker offline", "Key expires -> bus shown offline; timetable ETA flagged as estimated", "Device buffers and sends a batch on reconnect"],
      ["Ingestion API failure", "Device gets an error or timeout and keeps the report; the API confirms only after a durable publish, so nothing it confirmed is lost", "Device retries with backoff; duplicates removed by (busId, seq). See the next section"],
      ["Event stream (Event Hubs) down", "Producers buffer; consumers get nothing, so Redis keys expire and apps show ESTIMATED then timetable ETAs; accepted events stay retained", "Fallback queue, latest-wins catch-up for live plus full replay for history. See the stream outage section"],
      ["Stream processor crash", "Another worker takes the partition", "Resumes from checkpoint; idempotent writes"],
      ["Redis failure", "Replica failover in seconds; clients use circuit breaker and last-known cache", "State self-heals from the next pings and stream replay"],
      ["Primary database failure", "Live tracking unaffected; admin and favorite writes fail fast; reference reads from cache and replicas", "Zone-redundant standby is promoted automatically; reconnect with backoff"],
      ["Real-time hub degraded", "Clients fall back to polling cached endpoints", "No data loss; state is in Redis"],
      ["Display offline", "Banner plus cached timetable", "Reconnect, fetch snapshot, rejoin group"],
      ["Region outage", "Fail over to the secondary region", "See Disaster Recovery"]
    ]) +
    strong("Primary database failover and data loss") +
    tbl([1.2, 1.8, 1.6], ["Topology", "Promotion", "Data loss (RPO)"], [
      ["In-region zone-redundant standby", "Automatic; platform promotes the standby and the same endpoint points at it (typically a minute or two — check your tier's documented figure)", {t: "Synchronous replication: committed data is not lost", c: "dt-yes"}],
      ["Cross-region read replica", "Deliberate promotion by runbook or automation, then repoint the application", {t: "Asynchronous: you can lose the replication-lag window; alert on lag", c: "dt-no"}]
    ]) +
    code(
      "Also:  fence the old primary after failover (no split brain) · idempotent writes with request ids ·\n" +
      "       point-in-time restore for corruption · reads continue from Redis and replicas during failover"
    )));

  out.push(sec("Ingestion Failure and Data Loss (HTTPS ingestion API or IoT Hub)",
    p("If the ingestion API fails while reports are arriving, nothing is lost provided three rules hold: the device keeps a report until it is acknowledged, the API acknowledges only after a durable publish to the stream, and downstream processing is idempotent. The result is at-least-once delivery with no loss inside the confirmed path.") +
    tbl([1.5, 1.8, 0.8, 1.6], ["Where it fails", "What happens", "Lost?", "What protects you"], [
      ["Network fails before the API receives it", "Device times out and keeps the report", {t: "No", c: "dt-yes"}, "Retry with backoff and jitter"],
      ["API receives it, crashes before publishing", "No confirmation is sent, so the device retries", {t: "No", c: "dt-yes"}, "Device keeps data until confirmed"],
      ["API confirms BEFORE publishing, then crashes", "Device deletes its copy; the server never stored it", {t: "YES", c: "dt-no"}, "Never do this — confirm only after a durable publish"],
      ["Publishing to the stream fails", "API returns 503 with Retry-After; device retries; optional fallback durable queue", {t: "No", c: "dt-yes"}, "Honest error, retry, fallback queue, stream failover"],
      ["Published, but the confirmation is lost", "Device retries, so the stream holds a duplicate", {t: "No", c: "dt-yes"}, "Idempotent on (busId, seq)"],
      ["Stream accepted it, processor crashes", "Stream retains it; another worker resumes from the checkpoint", {t: "No", c: "dt-yes"}, "Retention, checkpoints, idempotent writes"],
      ["Outage longer than the device buffer", "Oldest buffered points dropped; next report restores live state", {t: "History only", c: "dt-no"}, "Large buffer, thin old points, alert on buffer depth"]
    ]) +
    code(
      "// API: acknowledge only after the broker has accepted the batch\n" +
      "await producer.SendAsync(events, ct);      // durable on the stream\n" +
      "return Results.Accepted();                 // 202: now the device may delete its copy\n" +
      "// on any failure: return 503, device keeps the data and retries\n" +
      "\n" +
      "// Device: store-and-forward\n" +
      "append report to flash buffer (with seq)  ->  send oldest batch  ->  delete ONLY on 202\n" +
      "retry on timeout, 429, 5xx with exponential backoff and jitter; drop only on 400\n" +
      "if the buffer is full: drop the oldest, keep every Nth point, always keep the newest"
    ) +
    tbl([1.2, 2.6], ["Measure", "Why"], [
      ["Stateless pods across zones, graceful shutdown", "Losing a pod or zone loses nothing; in-flight publishes finish before a pod exits"],
      ["Regional failover plus a paired stream namespace", "Survives a regional outage (verify the geo-failover feature for your tier)"],
      ["Fallback durable queue and replayer", "The API stays honest even when the stream is unreachable"],
      ["Jittered backoff, 429 with Retry-After, batch endpoint", "Prevents a retry storm when all 5,000 buses reconnect after an outage"],
      ["Alerts on buffer depth, fleet freshness, publish failures", "A failure is noticed in minutes, before any device buffer fills"]
    ]) +
    tip("Live tracking tolerates gaps — the next ping restores the latest position — so the real cost of loss is history, analytics and ETA training data. That is why devices batch-upload their buffer oldest-first on reconnect, and why processors use device event time rather than arrival time.") +
    warn("The classic bug is to return 200 immediately and publish on a background thread. It looks fast and passes tests, but it silently loses every report that is in flight when a pod restarts. IoT Hub follows the same principle (MQTT acknowledgements and SDK retries), which is one more reason to prefer it over a hand-built ingestion API.")));

  out.push(sec("Event Stream Outage (Event Hubs or the IoT Hub endpoint is down)",
    p("The stream is the backbone, so an outage there degrades the live view but does not lose what was already accepted. First work out what kind of failure it is: throttling is the common case and is fixed by scaling; a namespace, zone or regional outage needs the fallbacks below.") +
    tbl([1.1, 1.8, 1.8], ["Failure", "Effect", "Response"], [
      ["Throttling (capacity exceeded)", "Sends return server-busy; service is up but refusing some traffic", "Producers back off with jitter; scale throughput or processing units; auto-inflate where available"],
      ["One partition unavailable", "Only the buses hashed to it are affected", "Retry; other buses keep flowing"],
      ["Namespace or zone problem", "Sends and receives fail", "Fallback queue, degraded mode, wait for the platform"],
      ["Regional outage", "Stream unreachable; stored data may be unavailable until recovery", "Fail over to a second namespace or region; unreplicated events may not come with you"],
      ["Consumer side", "Stream healthy but nothing reads it", "Consumer-lag alarms; restart or scale processors; check the checkpoint store"]
    ]) +
    strong("What each part experiences") +
    tbl([1, 2.6], ["Part", "Behaviour"], [
      ["Devices", "No acknowledgement, so they keep reports in the buffer and retry with backoff — no loss until a buffer overflows"],
      ["Ingestion API", "Returns 503 with Retry-After, or writes to a fallback queue and returns 202"],
      ["Stream", "Events accepted before the outage stay retained; no new events accepted"],
      ["Processors", "Receive nothing and retry; they do not crash; checkpoints live in a separate store so they resume correctly"],
      ["Redis", "No new writes, so bus keys expire after their TTL and arrival lists go stale"],
      ["APIs, apps, displays", "Keep working: LIVE becomes ESTIMATED, then timetable-based, always labelled, with a banner. Reference data is unaffected"]
    ]) +
    strong("Protections and recovery") +
    tbl([1.2, 2.6], ["Measure", "What it gives you"], [
      ["Zone-redundant namespace", "Survives a zone loss (check tier and region support)"],
      ["Fallback durable queue in a different service", "A separate failure domain; a replayer republishes later"],
      ["Second namespace in another region", "Regional resilience. Metadata-only geo-DR pairing does not copy event data; the newer geo-replication does — verify what your tier offers"],
      ["Degraded direct-to-Redis path (optional)", "Latest positions written straight to Redis with the same conditional write while the stream is down; costs a second simpler path"],
      ["Two consumers after recovery", "LIVE consumer is latest-wins (skip old backlog); ARCHIVE consumer replays everything for history"],
      ["Ghost-bus synthetic probe", "A heartbeat bus through the whole pipeline; alert if it does not reach Redis within N seconds"]
    ]) +
    code(
      "// LIVE consumer: ignore stale backlog, never move a bus backwards\n" +
      "var age = DateTimeOffset.UtcNow - args.Data.EnqueuedTime;\n" +
      "if (age < TimeSpan.FromSeconds(45))\n" +
      "    await ApplyIfNewerAsync(report);       // conditional write on seq\n" +
      "await args.UpdateCheckpointAsync();        // advance anyway so the backlog drains quickly"
    ) +
    warn("Do not reach for multi-region active-active by reflex. Live tracking tolerates gaps — the next ping restores the latest state — so agree with the business how long displays may show estimated times. Buffering, a fallback queue and latest-wins catch-up cover most of the risk cheaply.")));

  out.push(sec("Scalability Patterns",
    tbl([1.1, 2.6], ["Layer", "How it scales when more buses are added"], [
      ["Devices", "Provision through DPS; no code change"],
      ["IoT Hub", "Add units; partition count fixed at creation, so size it with headroom"],
      ["Processors", "Stateless; add workers up to the partition count; autoscale on consumer lag"],
      ["Redis", "More memory or shards; keys by bus and stop spread evenly"],
      ["Fan-out", "Conflation and deltas bound cost; managed service scales connections"],
      ["Beyond one city", "One full stack per city or region plus a thin global layer for accounts and search"]
    ]) +
    tip("Cost levers: adaptive reporting through the twin (slow when parked, fast near stops), send-on-change, batching on poor networks, dead-letter for poison messages.")));

  out.push(sec("Security",
    tbl([1.1, 2.6], ["Area", "Design"], [
      ["Devices", "Per-device X.509 certificate, mutual TLS, individual revocation, certificate rotation; devices can only publish their own telemetry"],
      ["Public API", "Anonymous read-only access for live data, rate-limited at the edge; WAF and DDoS protection"],
      ["Accounts", "OAuth 2.0 / OpenID Connect sign-in for favorites and notifications; tokens validated at API Management"],
      ["Displays", "Device identity plus a read-only token scoped to their stop"],
      ["Admin", "Role-based access for the ops portal, MFA, audit log of every reference-data change"],
      ["Data", "TLS everywhere, private networking for databases and Redis, secrets in Key Vault"],
      ["Privacy", "Bus locations are not personal data; user favorites and push tokens are — store the minimum and support deletion"]
    ])));

  out.push(sec("Monitoring and Observability",
    tbl([1.4, 2.4], ["Signal", "Why it matters"], [
      ["Fleet freshness: % of buses reporting in the last 60 s", "The single best health number for the whole system"],
      ["End-to-end latency: GPS timestamp to client render (p95)", "The freshness promise, measured"],
      ["Consumer lag per partition", "Processing is falling behind"],
      ["ETA accuracy: MAE, P90 error, bias by route", "Quality of the product, not just uptime"],
      ["Redis hit ratio and latency; PostgreSQL replication lag", "Cache and failover health"],
      ["Real-time connections and delivery failures", "Fan-out health"],
      ["Display last-seen age", "Which displays are offline right now"]
    ]) +
    p("Instrument with OpenTelemetry; propagate a trace id from the processor through ETA to the publish step so a slow update can be traced end to end. Alert on symptoms (fleet freshness, latency) before causes.")));

  out.push(sec("ETA Algorithm Change — Proving the New One Is Better",
    code(
      "GROUND TRUTH = actual arrival time (geofence events the processors already record)\n" +
      "error = predicted ETA - actual arrival, for the same bus and stop\n" +
      "\n" +
      "1 offline backtest   replay archived telemetry through old and new, score against actual arrivals\n" +
      "2 shadow mode        run both on live traffic; show only the old; log both with algoVersion\n" +
      "3 canary / A-B       show the new ETA to a few routes behind a feature flag\n" +
      "4 guardrails         automatic rollback if error, latency or CPU regress\n" +
      "5 keep monitoring    traffic and seasons make any algorithm drift"
    ) +
    tbl([1.2, 2.4], ["Compare", "Why"], [
      ["MAE and MAPE", "Average error"],
      ["P90 / P95 error", "Passengers remember bad predictions, not the average"],
      ["Signed bias", "Early is worse than late — the passenger leaves and misses the bus"],
      ["Error by horizon bucket", "0-5, 5-10 and 10-20 minute predictions are different problems"],
      ["By route, time of day, weather", "A change that wins on average can still regress a key route"],
      ["Stability (ETA jitter)", "4, 9, 5 minutes looks broken even if accurate on average"],
      ["Cost and latency", "More accurate but too slow is not an improvement"]
    ]) +
    warn("Compare versions on the same live traffic (shadow mode), not on different weeks, and fix the definition of 'actual arrival' first — every metric depends on it.")));

  out.push(sec("Deployment Architecture",
    tbl([1.1, 2.6], ["Area", "Design"], [
      ["Compute", "AKS across three availability zones; separate node pools for processors, APIs and batch jobs"],
      ["Autoscaling", "KEDA on consumer lag for processors; HPA on CPU and request rate for APIs"],
      ["Data", "PostgreSQL zone-redundant HA plus read replica; managed Redis with zone-redundant replicas; data lake with lifecycle rules"],
      ["Edge", "Front Door with WAF and CDN; API Management for auth and limits"],
      ["Infrastructure as code", "Bicep or Terraform; one stack per city or region"],
      ["CI/CD", "GitHub Actions: build, test, scan, container image, deploy; progressive rollout with automatic rollback"],
      ["Configuration", "Feature flags for ETA algorithm versions and display behaviours (App Configuration)"],
      ["Environments", "Dev, staging with a replay of recorded telemetry, production; a simulator generating synthetic bus traffic for load tests"]
    ])));

  out.push(sec("Cost Optimisation",
    ul(["Adaptive reporting: slow pings for parked buses, faster near stops — fewer messages for the same accuracy",
      "Pick the IoT Hub tier from the real message rate; batch readings when networks are poor",
      "CDN for static reference data; short HTTP caches absorb identical requests",
      "Conflate and send deltas so fan-out cost is bounded",
      "Hot data in Redis, history in cheap lake storage with retention rules",
      "Right-size small Redis and database tiers — this workload is throughput-bound, not memory-bound",
      "Use spot nodes for batch ML training jobs"])));

  out.push(sec("Disaster Recovery",
    tbl([1.2, 2.4], ["Layer", "Strategy"], [
      ["Devices and ingestion", "IoT Hub manual failover to the paired region plus provisioning for devices (verify current capability and RTO); devices buffer in the meantime"],
      ["Live state", "Rebuildable: secondary region reads the stream and repopulates Redis within minutes"],
      ["Reference data", "Cross-region PostgreSQL replica; point-in-time restore; bounded loss equal to replication lag"],
      ["Clients", "Displays fall back to the cached timetable; apps show a banner and the schedule"],
      ["Testing", "Run failover drills; measure actual RTO and RPO and compare with targets"]
    ])));

  out.push(sec("Migration Strategy (from the existing 3-slot displays)",
    ul(["Run the new pipeline in parallel with the legacy system in shadow mode and compare ETAs",
      "Import the existing routes and stops as GTFS to avoid re-keying data",
      "Pilot on a few routes and a hundred displays; expand by route",
      "Keep the legacy display feed as a fallback until the new system proves its freshness and accuracy",
      "Decommission legacy only after a period with no regressions on the monitoring dashboards"])));

  out.push(sec("Interview Questions and Answers",
    tbl([1.5, 2.6], ["Question", "Short answer"], [
      ["Why not connect devices to an App Service?", "IoT Hub gives per-device identity, lightweight MQTT, buffering, replay and cloud-to-device config. The extra hop costs milliseconds; the real cost of an App Service front end is missing capabilities and coupling ingestion to the API."],
      ["How do the database and Redis stay in sync?", "They mostly do not need to: live state comes from the stream and is rebuildable. Reference data uses cache-aside, versioned keys and an outbox."],
      ["What if the primary database goes down?", "Live tracking continues from Redis. A zone-redundant synchronous standby is promoted automatically (no committed data lost); a cross-region replica is asynchronous with bounded loss."],
      ["What do we cache and how is staleness handled?", "Reference data long with versions; live data short with TTL; everything time-stamped; stale items flagged, never shown as live."],
      ["How do we publish to everyone tracking a bus?", "Group-based fan-out through a managed real-time service, conflated and sent as deltas; push for background apps; polling fallback."],
      ["What if Redis fails?", "Failover in seconds; state self-heals from the next pings and stream replay; database protected with single-flight and limits."],
      ["How is telemetry processed and scaled?", "Partition by bus; stateless workers; idempotent conditional writes; autoscale on lag."],
      ["How do we prove a new ETA algorithm is better?", "Backtest, shadow, canary with guardrails; compare tail error, bias, stability and per-route results against actual arrivals."]
    ]) +
    p("Full interview answers for each question are on the Company Rounds page: AM Tech Software – Round 3.")));

  out.push(sec("Trade-off Summary",
    tbl([1.2, 1.6, 1.6, 1.6], ["Decision", "Chosen", "Alternative", "Why"], [
      ["Ingestion", "IoT Hub", "Event Hubs or HTTP to an App Service", "Device identity, MQTT, config and buffering justify the extra service"],
      ["Live state", "Redis fed by the stream", "Query PostgreSQL", "Freshness and independence from the database"],
      ["Fan-out", "Managed real-time service with conflation", "Self-hosted WebSockets", "Connection scale is someone else's problem"],
      ["ETA", "Simple segment model first, ML later", "ML from day one", "Measure a baseline before adding complexity"],
      ["Search", "In-memory or PostgreSQL trigram", "Dedicated search service", "Catalogue is small"],
      ["Consistency", "Eventual for reference data, rebuildable for live data", "Strong consistency everywhere", "Bounded staleness is acceptable here and keeps the live path fast"]
    ])));

  out.push(sec("Key Takeaways",
    ul(["The old display is a queue of three; the new one is a query over live predictions sorted by ETA.",
      "Ingestion is small (about 1,000 messages/s on stated assumptions); the hard parts are ETA quality and fan-out.",
      "Keep the live path off the relational database: stream to Redis to real-time hub.",
      "Make every cache entry honest: time-stamped, and flagged when stale.",
      "Idempotent, ordered, conditional writes make crashes and replays harmless.",
      "Measure ETA accuracy against real arrivals and release algorithm changes in shadow, then canary.",
      "State your assumptions, and ask for the real numbers."])));

  return out.join("\n");
})();
