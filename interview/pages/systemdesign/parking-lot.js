window.Pages['sd-parking-lot'] = `
<div class="page-header">
  <div class="breadcrumb">System Design › <span>Parking Lot System</span></div>
  <h1>🅿️ Parking Lot — Smart Parking System Design</h1>
  <p>A real-time parking management system handling slot discovery, reservation, entry/exit via sensors/cameras, dynamic pricing, and payment — scaling from a single garage to a city-wide network</p>
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
      <text x="20" y="28" font-size="10" fill="#888" font-family="monospace">CLIENT</text>
      <rect x="15" y="35" width="95" height="52" rx="7" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="62" y="55" text-anchor="middle" font-size="13" fill="#e2e8f0">📱</text>
      <text x="62" y="68" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">Driver App</text>
      <text x="62" y="80" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">iOS/Android</text>

      <!-- HARDWARE -->
      <text x="120" y="28" font-size="10" fill="#888" font-family="monospace">HARDWARE / IoT</text>
      <rect x="120" y="35" width="90" height="52" rx="7" fill="#1a2020" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="165" y="55" text-anchor="middle" font-size="13" fill="#e2e8f0">📷</text>
      <text x="165" y="68" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">Entry/Exit</text>
      <text x="165" y="80" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Camera/Gate</text>

      <rect x="220" y="35" width="90" height="52" rx="7" fill="#1a2020" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="265" y="55" text-anchor="middle" font-size="13" fill="#e2e8f0">🔦</text>
      <text x="265" y="68" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">Slot Sensors</text>
      <text x="265" y="80" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">IR/Ultrasonic</text>

      <!-- Lines to API Gateway -->
      <line x1="110" y1="61" x2="358" y2="61" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="165" y1="87" x2="165" y2="115" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="265" y1="87" x2="265" y2="115" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- IOT GATEWAY -->
      <text x="150" y="110" font-size="10" fill="#888" font-family="monospace">IoT GATEWAY</text>
      <rect x="148" y="118" width="135" height="48" rx="7" fill="#271f10" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="215" y="137" text-anchor="middle" font-size="12" fill="#e2e8f0">📡</text>
      <text x="215" y="150" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">MQTT Broker</text>
      <text x="215" y="161" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Sensor Events</text>
      <line x1="283" y1="142" x2="358" y2="142" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- API GATEWAY -->
      <text x="362" y="28" font-size="10" fill="#888" font-family="monospace">API GATEWAY</text>
      <rect x="360" y="35" width="110" height="52" rx="7" fill="#1f2a1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="415" y="55" text-anchor="middle" font-size="13" fill="#e2e8f0">🔀</text>
      <text x="415" y="68" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">API Gateway</text>
      <text x="415" y="80" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Auth / Rate Limit</text>
      <line x1="470" y1="61" x2="503" y2="61" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- CORE SERVICES -->
      <text x="508" y="28" font-size="10" fill="#888" font-family="monospace">CORE SERVICES</text>
      <rect x="506" y="35" width="90" height="52" rx="7" fill="#1f2030" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="551" y="54" text-anchor="middle" font-size="12" fill="#e2e8f0">🅿️</text>
      <text x="551" y="67" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">Slot Service</text>
      <text x="551" y="79" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Availability</text>

      <rect x="606" y="35" width="90" height="52" rx="7" fill="#1f2030" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="651" y="54" text-anchor="middle" font-size="12" fill="#e2e8f0">📅</text>
      <text x="651" y="67" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">Booking</text>
      <text x="651" y="79" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Reserve/Cancel</text>

      <rect x="706" y="35" width="90" height="52" rx="7" fill="#1f2030" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="751" y="54" text-anchor="middle" font-size="12" fill="#e2e8f0">💰</text>
      <text x="751" y="67" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">Payment</text>
      <text x="751" y="79" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Pricing/Billing</text>

      <rect x="806" y="35" width="80" height="52" rx="7" fill="#1f2030" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="846" y="54" text-anchor="middle" font-size="12" fill="#e2e8f0">🔔</text>
      <text x="846" y="67" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">Notify</text>
      <text x="846" y="79" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">SMS/Push</text>

      <!-- Services → Kafka -->
      <line x1="551" y1="87" x2="551" y2="148" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="651" y1="87" x2="651" y2="148" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- KAFKA -->
      <text x="490" y="143" font-size="10" fill="#888" font-family="monospace">EVENT BUS</text>
      <rect x="488" y="151" width="220" height="48" rx="7" fill="#271f10" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="598" y="170" text-anchor="middle" font-size="12" fill="#e2e8f0">📨</text>
      <text x="598" y="183" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">Kafka — Event Bus</text>
      <text x="598" y="194" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">slot.events · booking.events · payment.events</text>

      <!-- DATA STORES -->
      <text x="20" y="240" font-size="10" fill="#888" font-family="monospace">DATA STORES</text>
      <rect x="15" y="248" width="95" height="52" rx="7" fill="#1a2020" stroke="#34d399" stroke-width="1.5"/>
      <text x="62" y="268" text-anchor="middle" font-size="12" fill="#e2e8f0">🗄️</text>
      <text x="62" y="281" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">MySQL</text>
      <text x="62" y="293" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Bookings/Lots</text>

      <rect x="120" y="248" width="95" height="52" rx="7" fill="#1a2020" stroke="#34d399" stroke-width="1.5"/>
      <text x="167" y="268" text-anchor="middle" font-size="12" fill="#e2e8f0">⚡</text>
      <text x="167" y="281" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">Redis</text>
      <text x="167" y="293" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Slot State/Lock</text>

      <rect x="225" y="248" width="95" height="52" rx="7" fill="#1a2020" stroke="#34d399" stroke-width="1.5"/>
      <text x="272" y="268" text-anchor="middle" font-size="12" fill="#e2e8f0">📊</text>
      <text x="272" y="281" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">TimeSeries DB</text>
      <text x="272" y="293" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Occupancy History</text>

      <rect x="330" y="248" width="95" height="52" rx="7" fill="#1a2020" stroke="#34d399" stroke-width="1.5"/>
      <text x="377" y="268" text-anchor="middle" font-size="12" fill="#e2e8f0">📷</text>
      <text x="377" y="281" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">ANPR Store</text>
      <text x="377" y="293" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Plate DB/S3</text>

      <!-- Kafka → stores -->
      <line x1="530" y1="199" x2="167" y2="248" stroke="#4b5563" stroke-width="1" marker-end="url(#arr)"/>
      <line x1="560" y1="199" x2="272" y2="248" stroke="#4b5563" stroke-width="1" marker-end="url(#arr)"/>

      <!-- ML / ANALYTICS -->
      <text x="490" y="240" font-size="10" fill="#888" font-family="monospace">ML / ANALYTICS</text>
      <rect x="488" y="248" width="110" height="52" rx="7" fill="#1f1a2a" stroke="#f472b6" stroke-width="1.5"/>
      <text x="543" y="268" text-anchor="middle" font-size="12" fill="#e2e8f0">🤖</text>
      <text x="543" y="281" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">Demand ML</text>
      <text x="543" y="293" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Dynamic Pricing</text>

      <rect x="608" y="248" width="110" height="52" rx="7" fill="#1f1a2a" stroke="#f472b6" stroke-width="1.5"/>
      <text x="663" y="268" text-anchor="middle" font-size="12" fill="#e2e8f0">📈</text>
      <text x="663" y="281" text-anchor="middle" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold">Analytics</text>
      <text x="663" y="293" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">Revenue/Ops</text>

      <!-- Kafka → ML -->
      <line x1="598" y1="199" x2="543" y2="248" stroke="#4b5563" stroke-width="1" marker-end="url(#arr)"/>
      <line x1="630" y1="199" x2="663" y2="248" stroke="#4b5563" stroke-width="1" marker-end="url(#arr)"/>

      <!-- Legend -->
      <rect x="20" y="415" width="12" height="10" rx="2" fill="#1a2020" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="36" y="425" font-size="9" fill="#94a3b8" font-family="monospace">Hardware/IoT</text>
      <rect x="130" y="415" width="12" height="10" rx="2" fill="#1f2030" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="146" y="425" font-size="9" fill="#94a3b8" font-family="monospace">Services</text>
      <rect x="210" y="415" width="12" height="10" rx="2" fill="#1a2020" stroke="#34d399" stroke-width="1.5"/>
      <text x="226" y="425" font-size="9" fill="#94a3b8" font-family="monospace">Storage</text>
      <rect x="290" y="415" width="12" height="10" rx="2" fill="#271f10" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="306" y="425" font-size="9" fill="#94a3b8" font-family="monospace">Event Bus</text>
      <rect x="380" y="415" width="12" height="10" rx="2" fill="#1f1a2a" stroke="#f472b6" stroke-width="1.5"/>
      <text x="396" y="425" font-size="9" fill="#94a3b8" font-family="monospace">ML/Analytics</text>
    </svg>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">1. Executive Summary</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <strong>Problem</strong><br/>Design a smart parking lot system that manages real-time slot availability, reservations, automated entry/exit via ANPR cameras, dynamic pricing, and payments — scalable from a single garage to a city-wide network.
        <br/><br/><strong>Scale</strong><br/>10,000 parking lots · 500 slots/lot avg · 5M daily transactions · 50M slot state updates/day
        <br/><br/><strong>Key Challenges</strong><br/>• Real-time slot state consistency (no double-booking)<br/>• ANPR (license plate recognition) at entry/exit<br/>• Dynamic surge pricing based on occupancy<br/>• Distributed IoT sensor event processing
      </div>
      <div>
        <table class="pattern-table">
          <tr class="pt-header"><th class="pt-name">Type</th><th>Requirement</th></tr>
          <tr class="pt-row"><td class="pt-name">FR</td><td>Find nearby available parking lots and slots</td></tr>
          <tr class="pt-row"><td class="pt-name">FR</td><td>Reserve a slot in advance or walk-in</td></tr>
          <tr class="pt-row"><td class="pt-name">FR</td><td>Automated entry/exit via ANPR camera + barrier gate</td></tr>
          <tr class="pt-row"><td class="pt-name">FR</td><td>Billing based on actual duration; support online payment</td></tr>
          <tr class="pt-row"><td class="pt-name">NFR</td><td>Slot state p99 update &lt; 500ms; search &lt; 200ms</td></tr>
          <tr class="pt-row"><td class="pt-name">NFR</td><td>99.9% gate uptime; offline fallback for gate failures</td></tr>
          <tr class="pt-row"><td class="pt-name">NFR</td><td>No double-booking guarantee (strong consistency)</td></tr>
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
      <tr class="pt-row"><td class="pt-name">Total slots</td><td>10K lots × 500 slots</td><td>10,000 × 500</td><td>5M slots</td></tr>
      <tr class="pt-row"><td class="pt-name">Daily bookings</td><td>5M transactions/day</td><td>5M / 86400</td><td>~58 TPS avg</td></tr>
      <tr class="pt-row"><td class="pt-name">Sensor events</td><td>Each slot updates 4×/day</td><td>5M × 4 / 86400</td><td>~230 events/s</td></tr>
      <tr class="pt-row"><td class="pt-name">Slot state store</td><td>5M slots × 200 bytes</td><td>5M × 200B</td><td>~1 GB Redis</td></tr>
      <tr class="pt-row"><td class="pt-name">Booking history</td><td>5M bookings × 500B</td><td>5M × 500B/day</td><td>~2.5 GB/day</td></tr>
      <tr class="pt-row"><td class="pt-name">ANPR images</td><td>2 images/vehicle × 5M</td><td>10M × 200KB</td><td>~2 TB/day (compressed)</td></tr>
    </table>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">3. Object / Entity Design</div>
  <div class="ref-body">
    <div class="code-box">ParkingLot
  id, name, address, geo(lat,lng), total_slots, available_slots, amenities[]

ParkingFloor
  id, lot_id, floor_number, total_slots

ParkingSlot
  id, lot_id, floor_id, slot_number, type(COMPACT|LARGE|EV|DISABLED),
  status(AVAILABLE|OCCUPIED|RESERVED|MAINTENANCE), vehicle_plate

Booking
  id, user_id, slot_id, lot_id,
  start_time, end_time, status(ACTIVE|COMPLETED|CANCELLED|NO_SHOW),
  payment_id, entry_time, exit_time

Vehicle
  id, user_id, plate_number, type, is_ev

Payment
  id, booking_id, amount_paise, status, method, gateway_ref</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">4. API Design</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><th class="pt-name">Method</th><th>Endpoint</th><th>Description</th></tr>
      <tr class="pt-row"><td class="pt-name">GET</td><td>/v1/lots?lat&amp;lng&amp;radius&amp;type</td><td>Find lots near location with availability</td></tr>
      <tr class="pt-row"><td class="pt-name">GET</td><td>/v1/lots/{lotId}/slots?type</td><td>Get available slots in a lot</td></tr>
      <tr class="pt-row"><td class="pt-name">POST</td><td>/v1/bookings</td><td>Reserve a slot (advance or immediate)</td></tr>
      <tr class="pt-row"><td class="pt-name">PATCH</td><td>/v1/bookings/{id}/cancel</td><td>Cancel a booking</td></tr>
      <tr class="pt-row"><td class="pt-name">POST</td><td>/v1/entry</td><td>Vehicle entry — ANPR plate → open gate</td></tr>
      <tr class="pt-row"><td class="pt-name">POST</td><td>/v1/exit</td><td>Vehicle exit — calculate fee → process payment → open gate</td></tr>
      <tr class="pt-row"><td class="pt-name">GET</td><td>/v1/bookings/{id}/receipt</td><td>Download payment receipt</td></tr>
    </table>
    <div class="code-box">POST /v1/bookings
Body: { userId, lotId, slotId, vehiclePlate, startTime, endTime, slotType }
→ { bookingId, slotId, floor, slotNumber, qrCode, estimatedFee, expiresAt }</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">5. High-Level Design</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step">Driver App</div><div class="flow-arrow">→</div>
      <div class="flow-step">API Gateway</div><div class="flow-arrow">→</div>
      <div class="flow-step">Booking Service</div><div class="flow-arrow">→</div>
      <div class="flow-step">Slot Lock (Redis)</div><div class="flow-arrow">→</div>
      <div class="flow-step">DB Confirm</div><div class="flow-arrow">→</div>
      <div class="flow-step">Payment</div>
    </div>
    <div class="flow-box">
      <div class="flow-step">IR Sensor</div><div class="flow-arrow">→</div>
      <div class="flow-step">MQTT Broker</div><div class="flow-arrow">→</div>
      <div class="flow-step">Slot Service</div><div class="flow-arrow">→</div>
      <div class="flow-step">Redis State</div><div class="flow-arrow">→</div>
      <div class="flow-step">Kafka Event</div><div class="flow-arrow">→</div>
      <div class="flow-step">Analytics</div>
    </div>
    <p>Two planes: <strong>Reservation plane</strong> (user app → API → booking) and <strong>Physical plane</strong> (sensors → MQTT → slot state). They reconcile at entry/exit via ANPR matching booking to vehicle plate.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">6. Core Services</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><th class="pt-name">Service</th><th>Responsibility</th><th>Tech</th></tr>
      <tr class="pt-row"><td class="pt-name">Slot Service</td><td>Real-time slot state, occupancy counts, sensor event processing</td><td>Java, Redis, MQTT</td></tr>
      <tr class="pt-row"><td class="pt-name">Booking Service</td><td>Reserve/cancel slots, hold management, QR generation</td><td>Java, MySQL, Redis distributed lock</td></tr>
      <tr class="pt-row"><td class="pt-name">Entry/Exit Service</td><td>ANPR plate match, gate control, session tracking</td><td>Python, OpenCV, camera SDK</td></tr>
      <tr class="pt-row"><td class="pt-name">Pricing Service</td><td>Base rate + surge pricing; duration billing; promo codes</td><td>Python ML, Redis rates</td></tr>
      <tr class="pt-row"><td class="pt-name">Payment Service</td><td>Charge on exit, wallet, UPI, card; refunds on cancel</td><td>Java, Stripe/Razorpay</td></tr>
      <tr class="pt-row"><td class="pt-name">Search Service</td><td>Geo-based lot discovery; filter by type, price, EV, disabled</td><td>Elasticsearch + Geo queries</td></tr>
      <tr class="pt-row"><td class="pt-name">Notification Service</td><td>Booking confirm, expiry alerts, receipt, gate open signal</td><td>Kafka, Firebase, SMS</td></tr>
    </table>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">7. Database Design</div>
  <div class="ref-body">
    <div class="code-box">-- parking_lots (MySQL)
lot_id | name | address | lat | lng | total_slots | available_slots | hourly_rate | status

-- parking_slots (MySQL, sharded by lot_id)
slot_id | lot_id | floor | number | type | status | vehicle_plate | updated_at

-- bookings (MySQL)
booking_id | user_id | slot_id | lot_id | start_time | end_time
entry_time | exit_time | status | amount_paise | payment_id | plate

-- Redis (slot real-time state)
key: "slot:{slotId}"      → {status, plate, booking_id, since}  TTL: none
key: "lot:{lotId}:count"  → integer (available slot count)
key: "book:lock:{slotId}" → bookingId  TTL: 10 min (reservation hold)

-- S3 (ANPR image archive)
s3://parking-anpr/{lotId}/{date}/{plate}_{timestamp}.jpg</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">8. Data Flow — Reservation</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step">1. User searches lots</div><div class="flow-arrow">→</div>
      <div class="flow-step">2. Geo search (Elastic)</div><div class="flow-arrow">→</div>
      <div class="flow-step">3. Select slot</div><div class="flow-arrow">→</div>
      <div class="flow-step">4. Redis SETNX lock (10 min)</div><div class="flow-arrow">→</div>
      <div class="flow-step">5. Payment</div><div class="flow-arrow">→</div>
      <div class="flow-step">6. Confirm in MySQL + QR</div>
    </div>
    <p><strong>Step 4 is critical</strong>: <code>SET book:lock:{slotId} {bookingId} NX EX 600</code> — atomic Redis operation prevents two users booking the same slot. If payment fails, TTL auto-releases the lock.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">9. Data Flow — Entry &amp; Exit</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step">Camera reads plate</div><div class="flow-arrow">→</div>
      <div class="flow-step">ANPR → plate string</div><div class="flow-arrow">→</div>
      <div class="flow-step">Match booking in Redis</div><div class="flow-arrow">→</div>
      <div class="flow-step">Open gate</div><div class="flow-arrow">→</div>
      <div class="flow-step">Mark slot OCCUPIED</div>
    </div>
    <div class="flow-box">
      <div class="flow-step">Exit camera reads plate</div><div class="flow-arrow">→</div>
      <div class="flow-step">Lookup entry_time</div><div class="flow-arrow">→</div>
      <div class="flow-step">Calculate fee (duration × rate)</div><div class="flow-arrow">→</div>
      <div class="flow-step">Charge payment</div><div class="flow-arrow">→</div>
      <div class="flow-step">Open gate + free slot</div>
    </div>
    <div class="tip-box">Walk-in (no reservation): ANPR at entry → create ad-hoc session → charge on exit. Barrier stays open for 30s after auth; re-closes automatically.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">10. Caching Strategy</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><th class="pt-name">Cache</th><th>What</th><th>TTL</th></tr>
      <tr class="pt-row"><td class="pt-name">Redis</td><td>Per-slot status (AVAILABLE/OCCUPIED/RESERVED)</td><td>No TTL — updated by sensors</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis</td><td>Per-lot available count (DECR/INCR on each change)</td><td>No TTL</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis</td><td>Booking hold lock per slot (prevents double-book)</td><td>10 min</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis</td><td>Hourly pricing rates per lot</td><td>5 min</td></tr>
      <tr class="pt-row"><td class="pt-name">Local cache</td><td>Lot metadata (name, address, amenities)</td><td>5 min</td></tr>
    </table>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">11. IoT &amp; Sensor Architecture</div>
  <div class="ref-body">
    <p><strong>Per-slot sensors:</strong> IR (infrared) or ultrasonic sensors detect vehicle presence. State: <code>FREE → OCCUPIED</code> within 2 seconds of parking.</p>
    <p><strong>MQTT topics:</strong></p>
    <div class="code-box">parking/{lotId}/slot/{slotId}/status  → { status: "OCCUPIED", ts: 1720000000 }
parking/{lotId}/gate/entry           → { plate: "KA01AB1234", ts: ... }
parking/{lotId}/gate/exit            → { plate: "KA01AB1234", ts: ... }</div>
    <p><strong>Edge processing:</strong> Each lot has a local edge controller (Raspberry Pi / industrial PC) that runs ANPR locally and syncs to cloud. Gate can operate offline using locally cached bookings (last 4 hours) if internet is down.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">12. Dynamic Pricing</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><th class="pt-name">Occupancy %</th><th>Multiplier</th><th>Example (base ₹50/hr)</th></tr>
      <tr class="pt-row"><td class="pt-name">&lt; 50%</td><td>0.8× (discount)</td><td>₹40/hr</td></tr>
      <tr class="pt-row"><td class="pt-name">50–75%</td><td>1.0× (base)</td><td>₹50/hr</td></tr>
      <tr class="pt-row"><td class="pt-name">75–90%</td><td>1.5× (surge)</td><td>₹75/hr</td></tr>
      <tr class="pt-row"><td class="pt-name">&gt; 90%</td><td>2.0× (peak)</td><td>₹100/hr</td></tr>
    </table>
    <p>Rate is locked at booking time — user is shown the rate before confirming. Walk-in rate is calculated at exit based on entry-time rate.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">13. Message Queues</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><th class="pt-name">Topic</th><th>Producer</th><th>Consumer</th></tr>
      <tr class="pt-row"><td class="pt-name">slot.state.changed</td><td>Slot Service (from MQTT)</td><td>Analytics, Pricing, Search index update</td></tr>
      <tr class="pt-row"><td class="pt-name">booking.created</td><td>Booking Service</td><td>Notification, Payment pre-auth</td></tr>
      <tr class="pt-row"><td class="pt-name">booking.expired</td><td>Booking TTL monitor</td><td>Slot release, Notification service</td></tr>
      <tr class="pt-row"><td class="pt-name">payment.completed</td><td>Payment Service</td><td>Booking confirm, Receipt, Analytics</td></tr>
      <tr class="pt-row"><td class="pt-name">vehicle.exited</td><td>Exit Service</td><td>Slot release, Payment trigger, Analytics</td></tr>
    </table>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">14. Geo Search Architecture</div>
  <div class="ref-body">
    <p>Parking lots indexed in <strong>Elasticsearch</strong> with geo_point field. User searches by <code>geo_distance</code> query within radius.</p>
    <div class="code-box">GET /lots/_search
{
  "query": { "bool": {
    "filter": [
      { "geo_distance": { "distance": "2km", "location": { "lat": 12.97, "lon": 77.59 } } },
      { "range": { "available_slots": { "gt": 0 } } },
      { "term": { "slot_types": "EV" } }  // optional filter
    ]
  }},
  "sort": [{ "_geo_distance": { "location": { "lat": 12.97, "lon": 77.59 }, "order": "asc" } }]
}</div>
    <p>Available slot counts synced from Redis → Elasticsearch every 30s via Kafka consumer (acceptable eventual consistency for search).</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">15. Concurrency &amp; Double-Booking Prevention</div>
  <div class="ref-body">
    <div class="tip-box">The hardest problem in parking systems: two users seeing the same available slot and both successfully booking it.</div>
    <p><strong>Solution — Redis distributed lock:</strong></p>
    <div class="code-box">// Atomic: only first caller succeeds
SET book:lock:{slotId} {bookingId} NX EX 600
// NX = only set if Not eXists
// EX 600 = auto-expire in 10 minutes (reservation window)

// On payment success: persist to MySQL, keep Redis state
// On payment failure / timeout: key expires → slot auto-released</div>
    <p>MySQL also has a <strong>unique constraint</strong> on (slot_id, status=RESERVED/OCCUPIED) as a safety net. Redis lock prevents DB contention; MySQL constraint is the last-resort guard.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">16. Fault Tolerance</div>
  <div class="ref-body">
    <p>• <strong>Gate offline mode:</strong> Edge controller caches bookings locally. Gate opens for valid QR even without internet. Syncs when reconnected.<br/>
    • <strong>Sensor failure:</strong> If sensor goes offline, slot marked UNKNOWN — excluded from booking. Manual override by lot attendant.<br/>
    • <strong>Redis failure:</strong> Fallback to MySQL for slot state (slower but safe). Redis recovered from DB state on restart.<br/>
    • <strong>Payment timeout:</strong> Gate opens (customer experience priority); async payment retry via Kafka. If unrecoverable, alert operations team.<br/>
    • <strong>ANPR failure:</strong> Manual plate entry on touchscreen at gate as fallback.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">17. Monitoring &amp; Observability</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><th class="pt-name">Metric</th><th>Alert Threshold</th></tr>
      <tr class="pt-row"><td class="pt-name">Gate open latency</td><td>Alert if &gt; 3s (bad UX, queue builds)</td></tr>
      <tr class="pt-row"><td class="pt-name">ANPR recognition rate</td><td>Alert if &lt; 95% (dirty cameras, poor lighting)</td></tr>
      <tr class="pt-row"><td class="pt-name">Slot state lag</td><td>Alert if sensor event &gt; 5s to Redis update</td></tr>
      <tr class="pt-row"><td class="pt-name">Double-booking rate</td><td>Alert if &gt; 0 (should be zero with Redis lock)</td></tr>
      <tr class="pt-row"><td class="pt-name">Payment failure rate</td><td>Alert if &gt; 2%</td></tr>
      <tr class="pt-row"><td class="pt-name">Lot offline</td><td>Alert if MQTT heartbeat missed &gt; 60s</td></tr>
    </table>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">18. Scalability</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><th class="pt-name">Component</th><th>Strategy</th></tr>
      <tr class="pt-row"><td class="pt-name">MySQL</td><td>Shard by lot_id; read replicas for slot queries</td></tr>
      <tr class="pt-row"><td class="pt-name">Redis</td><td>Cluster mode; hash slot by slot_id</td></tr>
      <tr class="pt-row"><td class="pt-name">MQTT Broker</td><td>HiveMQ / EMQX cluster; partition topics by lot_id</td></tr>
      <tr class="pt-row"><td class="pt-name">Booking Service</td><td>Stateless pods; scale on CPU + queue depth</td></tr>
      <tr class="pt-row"><td class="pt-name">Elasticsearch</td><td>Dedicated lot-search index; replica shards for read scaling</td></tr>
    </table>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">19. Security</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><th class="pt-name">Concern</th><th>Mechanism</th></tr>
      <tr class="pt-row"><td class="pt-name">Booking QR</td><td>Signed JWT in QR (HMAC-SHA256); validated at gate — not guessable</td></tr>
      <tr class="pt-row"><td class="pt-name">ANPR privacy</td><td>Plate images retained 24h then purged; GDPR/PDPB compliance</td></tr>
      <tr class="pt-row"><td class="pt-name">Gate API</td><td>mTLS between edge controller and cloud; device certificates</td></tr>
      <tr class="pt-row"><td class="pt-name">Payment</td><td>PCI-DSS via gateway tokenization; no raw card data stored</td></tr>
      <tr class="pt-row"><td class="pt-name">Plate spoofing</td><td>Booking verified by plate + booking ID together; plate alone insufficient</td></tr>
    </table>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">20. Cost Optimization</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><th class="pt-name">Area</th><th>Strategy</th></tr>
      <tr class="pt-row"><td class="pt-name">ANPR images</td><td>S3 lifecycle: delete after 24h (privacy + cost); keep flagged plates 30d</td></tr>
      <tr class="pt-row"><td class="pt-name">Sensor telemetry</td><td>Send only state changes (not heartbeats every second) — reduces MQTT volume 90%</td></tr>
      <tr class="pt-row"><td class="pt-name">ML pricing</td><td>Simple rule engine (occupancy thresholds) replaces heavy ML for most lots</td></tr>
      <tr class="pt-row"><td class="pt-name">Edge compute</td><td>ANPR runs on edge hardware — no cloud GPU needed per vehicle event</td></tr>
    </table>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">21. Disaster Recovery</div>
  <div class="ref-body">
    <p><strong>RTO:</strong> &lt; 30 min | <strong>RPO:</strong> &lt; 1 min<br/>
    MySQL binlog replication to DR region. Redis AOF persistence — Redis recovers from DB state on cold start. Edge controllers operate autonomously for 4 hours without cloud. Physical gates default to <strong>open</strong> on complete power failure (fail-safe).</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">22. Deployment</div>
  <div class="ref-body">
    <p>Cloud backend on AWS/GCP. Each lot has an <strong>edge controller</strong> (ruggedized mini-PC) running ANPR, MQTT client, local booking cache, and gate SDK. Communication via MQTT over 4G/LTE with TLS. Cloud services on Kubernetes. Rolling deployments with automated rollback on gate-open error rate spike.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">23. Interview Q&amp;A</div>
  <div class="ref-body">
    <div class="tip-box"><span class="ans-label">Q</span> How do you prevent two users booking the same slot simultaneously?<br/><span class="ans-label">A</span> Redis SETNX (SET if Not eXists) atomic lock with 10-minute TTL. First caller acquires lock; second caller gets "slot unavailable". MySQL unique constraint as backstop. Lock auto-expires if payment doesn't complete.</div>
    <div class="tip-box"><span class="ans-label">Q</span> What happens if a user reserves but never shows up?<br/><span class="ans-label">A</span> Booking has a grace period (e.g., 30 min after start_time). After grace period, a TTL monitor marks booking NO_SHOW, refunds partial amount per policy, and releases slot back to AVAILABLE.</div>
    <div class="tip-box"><span class="ans-label">Q</span> How do you design for different slot types (EV, disabled, compact)?<br/><span class="ans-label">A</span> Slot has a type field. Booking filters available slots by type. EV slots additionally manage charging station assignment (separate charger service). Disabled slots require vehicle disability permit flag on user profile.</div>
    <div class="tip-box"><span class="ans-label">Q</span> How does the gate work if internet is down?<br/><span class="ans-label">A</span> Edge controller caches last 4 hours of active bookings locally. ANPR + QR validation runs locally. Payments queued for sync when connectivity restores. Gate operates autonomously.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">24. Trade-offs</div>
  <div class="ref-body">
    <table class="decision-table">
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Decision</div><div class="dt-yes">Chosen ✓</div><div class="dt-no">Alternative ✗</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Slot locking</div><div class="dt-yes">Redis SETNX (fast, atomic)</div><div class="dt-no">DB row lock (slower, single DB bottleneck)</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Slot state store</div><div class="dt-yes">Redis (sub-ms reads, in-memory)</div><div class="dt-no">MySQL (durable but too slow for 230 events/s)</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">ANPR location</div><div class="dt-yes">Edge (local, low latency)</div><div class="dt-no">Cloud (cheaper hardware but 500ms+ latency)</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Gate on payment fail</div><div class="dt-yes">Open gate (customer UX priority)</div><div class="dt-no">Block gate (revenue priority, bad UX risk)</div>
      </div>
    </table>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">25. Parking Lot — Out of Scope / Extensions</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><th class="pt-name">Feature</th><th>Notes</th></tr>
      <tr class="pt-row"><td class="pt-name">Indoor navigation</td><td>Guide driver to specific slot via BLE beacons / AR turn-by-turn inside garage</td></tr>
      <tr class="pt-row"><td class="pt-name">EV charging management</td><td>Charger assignment, kWh billing, charging session state — separate EV system (see EV Charging design)</td></tr>
      <tr class="pt-row"><td class="pt-name">Valet parking</td><td>Valet workflow: driver drops car → valet parks → retrieval request — attendant app + key locker</td></tr>
      <tr class="pt-row"><td class="pt-name">Monthly subscription passes</td><td>Unlimited in/out for a fixed lot per month — separate billing cycle, corporate invoicing</td></tr>
      <tr class="pt-row"><td class="pt-name">Visitor parking management</td><td>Office/apartment visitor pre-registration; host approves → one-time entry token</td></tr>
      <tr class="pt-row"><td class="pt-name">Autonomous vehicle support</td><td>Remote drop-off zone, AV self-parking command API, slot-level positioning precision (&lt;10cm)</td></tr>
      <tr class="pt-row"><td class="pt-name">City-level traffic integration</td><td>Feed real-time occupancy to city traffic management systems to reduce circling</td></tr>
    </table>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">26. Key Takeaways</div>
  <div class="ref-body">
    <p>• <strong>Redis SETNX</strong> is the core mechanism for preventing double-booking — atomic, fast, auto-expiring<br/>
    • <strong>Two planes</strong>: reservation (app → API) and physical (sensors → MQTT) must reconcile at entry/exit<br/>
    • <strong>Edge-first ANPR</strong>: gate latency must be &lt;3s; cloud round-trip is too slow<br/>
    • <strong>Offline resilience</strong>: gates must operate without internet — local cache + queued sync<br/>
    • <strong>Fail-safe default</strong>: gate opens on system failure (safety over revenue)<br/>
    • <strong>Dynamic pricing</strong> via occupancy thresholds is simpler and adequate vs. complex ML for most cases</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">27. Summary Cheatsheet</div>
  <div class="ref-body">
    <div class="code-box">Parking Lot System Design — Quick Reference
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Scale:          5M slots, 5M bookings/day, 58 TPS avg, 230 sensor events/s
Slot state:     Redis in-memory (AVAILABLE/OCCUPIED/RESERVED) — no TTL
Double-booking: Redis SETNX lock (10 min TTL) + MySQL unique constraint
Booking flow:   Search → Lock slot (Redis) → Pay → Confirm (MySQL)
Entry/Exit:     Edge ANPR → plate match → gate open → slot state update
Offline:        Edge controller caches 4h bookings; gates work sans internet
Geo search:     Elasticsearch geo_distance + available_slots filter
Dynamic pricing:Occupancy % thresholds → rate multiplier (0.8×–2.0×)
IoT:            IR/ultrasonic sensors → MQTT → Slot Service → Redis + Kafka
Payment:        Razorpay/Stripe; charge on exit for walk-in; pre-auth for reserved
Security:       HMAC-signed QR; mTLS for edge; ANPR images purged after 24h</div>
  </div>
</div>
`;
