window.Pages['ref-perf-testing'] = `
<div class="page-header">
  <div class="breadcrumb">Deep Dive › <span>Performance Testing</span></div>
  <h1>🔬 Performance Testing Architecture</h1>
  <p>LoadRunner · BlazeMeter · JMeter · k6 · Test Types · Metrics · CI/CD Integration</p>
</div>

<div class="ref-section">
  <div class="ref-title">Performance Test Types — Know the Difference</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Test Type</div><div>Goal</div><div>Load Profile</div><div>Pass/Fail Criteria</div></div>
      <div class="pt-row"><div class="pt-name">Load Test</div><div>Verify system works at expected load</div><div>Normal production load (e.g. 500 concurrent users)</div><div>P99 latency &lt; 2s, error rate &lt; 0.1%</div></div>
      <div class="pt-row"><div class="pt-name">Stress Test</div><div>Find the breaking point</div><div>Ramp up beyond expected load until failure</div><div>Identify max throughput &amp; failure mode</div></div>
      <div class="pt-row"><div class="pt-name">Spike Test</div><div>Behavior under sudden burst</div><div>Instant jump: 100 → 2000 users in 30s</div><div>System recovers after spike, no data loss</div></div>
      <div class="pt-row"><div class="pt-name">Soak / Endurance</div><div>Detect memory leaks, slow degradation</div><div>Normal load sustained for 8–24 hours</div><div>Memory &amp; response time stable over time</div></div>
      <div class="pt-row"><div class="pt-name">Volume Test</div><div>Large data volumes impact on performance</div><div>Normal users + 10M rows in DB</div><div>No degradation vs baseline with small data</div></div>
      <div class="pt-row"><div class="pt-name">Scalability Test</div><div>Verify horizontal scale-out works</div><div>Double load → add instances → verify response</div><div>Latency stays flat as instances scale out</div></div>
      <div class="pt-row"><div class="pt-name">Baseline Test</div><div>Reference point for future comparisons</div><div>Fixed load, fixed env, record all metrics</div><div>All future releases compared against this</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">LoadRunner — Enterprise Performance Testing</div>
  <div class="ref-body">
    <div class="code-box">LoadRunner (Micro Focus / OpenText): industry standard for enterprise load testing.
  Components:
    VuGen (Virtual User Generator): record &amp; script user scenarios (C-based scripting).
    Controller:                     orchestrate the test — ramp up, duration, distribution.
    Load Generator (LG):            machines that generate virtual users (VUs).
    Analysis:                       post-test reporting, graphs, bottleneck analysis.

Protocols supported:
  HTTP/HTTPS, Web Services (SOAP/REST), SAP, Citrix,
  Oracle Forms, JDBC, .NET Remoting, WebSocket, gRPC.</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">VuGen Script (HTTP example)</div>
        <div class="code-box">Action() {
    // Think time — simulate real user pause
    lr_think_time(2);

    // HTTP request with correlation
    web_reg_save_param("AuthToken",
        "LB=Bearer ",
        "RB=\r\n",
        LAST);

    web_url("Login",
        "URL=https://api.company.com/auth/login",
        "Method=POST",
        "Body={\"username\":\"user1\",\"password\":\"pass\"}",
        "RecContentType=application/json",
        LAST);

    // Use correlated token in next request
    web_add_header("Authorization",
        lr_eval_string("Bearer {AuthToken}"));

    web_url("GetOrders",
        "URL=https://api.company.com/orders",
        LAST);

    return 0;
}</div>
      </div>
      <div>
        <div class="ans-label">Controller — Load Scenario</div>
        <div class="code-box">Scenario design:
  Vuser groups:
    BrowseUsers:  100 VUs  (read-only, light)
    CheckoutUsers: 50 VUs  (heavy — DB writes)
    AdminUsers:    10 VUs  (reports, bulk ops)

  Ramp-up: +10 users every 30 seconds
  Duration: 60 minutes at peak load
  Ramp-down: -20 users per minute

  Load Generators:
    LG1: 100 VUs (on-prem machine)
    LG2: 100 VUs (cloud VM)

  SLA Goals (set in Controller):
    Response time &lt; 2s for 95% of transactions
    Error rate &lt; 0.5%
    Throughput &gt; 200 TPS</div>
        <div class="ans-label" style="margin-top:10px;">Analysis — Key Graphs</div>
        <div class="code-box">Response Time vs Load:
  Flat → slight rise → knee point → degradation
  Knee = optimal operating range

Transaction Summary Report:
  Pass/Fail per transaction type.
  Min/Avg/Max/P90/P95/P99 breakdown.

Errors Distribution:
  HTTP 500 count, timeout count, connection errors.
  Correlate error spikes with response time spikes.</div>
      </div>
    </div>
    <div class="tip-box">✅ LoadRunner best practice: always parameterize test data (use CSV for usernames/passwords), add correlation for dynamic values (session tokens, CSRF tokens), set realistic think times to avoid unrealistic hammering.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">BlazeMeter — Cloud-Scale Performance Testing</div>
  <div class="ref-body">
    <div class="code-box">BlazeMeter: cloud-based performance testing platform (SaaS).
  Runs JMeter, Gatling, Locust, k6, Selenium scripts in the cloud.
  Scales to millions of virtual users across multiple geo-locations.
  CI/CD native: Azure DevOps / GitHub Actions plugins.</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">BlazeMeter Architecture</div>
        <div class="code-box">Your Test Script (JMeter .jmx / k6 .js)
         ↓
BlazeMeter Cloud
  ├─ Engine 1: 500 VUs — US East
  ├─ Engine 2: 500 VUs — EU West
  └─ Engine 3: 500 VUs — APAC
         ↓
  Real-time dashboard (live metrics):
    Active VUs, Req/sec, Avg response,
    P95/P99, error rate, bandwidth
         ↓
  System Under Test (your app/API)

Multi-region load: simulate global user base.
  US users + EU users + APAC users simultaneously.
  Exposes CDN effectiveness, regional latency differences.</div>
      </div>
      <div>
        <div class="ans-label">CI/CD Integration (Azure DevOps)</div>
        <div class="code-box"># azure-pipelines.yml
- task: BlazeMeterTest@1
  displayName: 'Run Performance Test'
  inputs:
    apiKey: $(BLAZEMETER_API_KEY)
    testId: '12345678'
    testTitle: 'Order API Load Test'
    totalUsers: 500
    duration: 600          # 10 minutes
    location: 'us-east-1'

    # Pass/fail thresholds
    errorThreshold: 1       # fail if error rate > 1%
    responseTimeThreshold: 2000  # fail if avg > 2000ms

# Pipeline flow:
# Code commit → Build → Unit Test →
# Deploy to staging → Run BlazeMeter test →
# If PASS → deploy to prod
# If FAIL → block deployment, alert team</div>
        <div class="ans-label" style="margin-top:10px;">BlazeMeter vs LoadRunner</div>
        <div class="code-box">LoadRunner:
  ✅ Enterprise, complex protocols (SAP, Citrix, Oracle)
  ✅ Detailed analysis, deep diagnostics
  ❌ Expensive license, complex setup
  ❌ Needs dedicated load generator machines

BlazeMeter:
  ✅ Cloud-native, no infra setup
  ✅ CI/CD native, API-driven
  ✅ JMeter compatible (reuse scripts)
  ✅ Multi-region in minutes
  ❌ Less protocol depth than LoadRunner
  ❌ Cloud only (data leaves your network)</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">JMeter — Open-Source Load Testing</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">JMeter Test Plan Structure</div>
        <div class="code-box">Test Plan
  └─ Thread Group (simulates users)
       ├─ Config Elements
       │    ├─ HTTP Request Defaults (base URL)
       │    └─ CSV Data Set Config (test data)
       │
       ├─ HTTP Header Manager (Auth token)
       │
       ├─ HTTP Request: POST /auth/login
       │    └─ JSON Extractor: extract token
       │
       ├─ HTTP Request: GET /orders
       │    └─ Response Assertion: status=200
       │
       ├─ Think Time: Gaussian Timer (2s ± 0.5s)
       │
       └─ Listeners
            ├─ Summary Report
            ├─ Response Time Graph
            └─ Backend Listener → InfluxDB → Grafana</div>
      </div>
      <div>
        <div class="ans-label">JMeter CLI (for CI/CD)</div>
        <div class="code-box"># Run headless (no GUI) in pipeline
jmeter -n \
  -t orderapi-load-test.jmx \
  -l results.jtl \
  -e -o /reports/html \
  -Jusers=500 \
  -Jduration=300 \
  -Jbase_url=https://staging.api.company.com

# Flags:
# -n         non-GUI mode
# -t         test plan file
# -l         results log file (.jtl)
# -e -o      generate HTML report in /reports/html
# -Jproperty override properties from command line

# Parse results for pass/fail:
python check_results.py results.jtl \
  --error-threshold 1 \
  --p99-threshold 3000</div>
        <div class="ans-label" style="margin-top:10px;">Real-time Grafana Dashboard</div>
        <div class="code-box">JMeter → Backend Listener → InfluxDB → Grafana

# jmeter-influxdb.properties:
backend_influxdb.influxdbUrl=http://influxdb:8086/write?db=jmeter
backend_influxdb.application=OrderAPI
backend_influxdb.measurement=jmeter
backend_influxdb.summaryOnly=false

Grafana panels:
  Active VUs over time
  Requests/sec
  Response time percentiles (P50, P95, P99)
  Error count per endpoint
  Apdex score</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">k6 — Developer-Friendly Load Testing</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">k6 Script (JavaScript)</div>
        <div class="code-box">import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const errorRate   = new Rate('errors');
const orderTime   = new Trend('order_duration');

export const options = {
  stages: [
    { duration: '2m', target: 100 },  // ramp up
    { duration: '5m', target: 100 },  // steady state
    { duration: '2m', target: 200 },  // spike
    { duration: '5m', target: 200 },  // hold spike
    { duration: '1m', target: 0   },  // ramp down
  ],
  thresholds: {
    http_req_duration: ['p(99) &lt; 2000'],  // P99 &lt; 2s
    errors:            ['rate &lt; 0.01'],    // error rate &lt; 1%
    order_duration:    ['p(95) &lt; 1500'],  // custom metric
  },
};

export default function () {
  const res = http.post('https://staging.api/orders', JSON.stringify({
    productId: Math.floor(Math.random() * 1000),
    quantity: 1,
  }), { headers: { 'Content-Type': 'application/json' } });

  const ok = check(res, {
    'status is 201': (r) => r.status === 201,
    'response time OK': (r) => r.timings.duration &lt; 2000,
  });

  errorRate.add(!ok);
  orderTime.add(res.timings.duration);
  sleep(1);
}</div>
      </div>
      <div>
        <div class="ans-label">k6 — Run & Output</div>
        <div class="code-box"># Run locally
k6 run --vus 100 --duration 5m order-test.js

# CI/CD (Azure DevOps)
k6 run \
  --out influxdb=http://influxdb:8086/k6 \
  --summary-export=summary.json \
  order-test.js

# k6 Cloud (like BlazeMeter)
k6 cloud order-test.js

# Output summary:
# ✓ http_req_duration p(99)=1842ms
# ✓ errors rate=0.002
# checks................: 99.80% 5988/5998
# http_req_duration.....: avg=842ms p(95)=1654ms p(99)=1842ms
# http_reqs.............: 5998   19.98/s</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Key Performance Metrics — What to Measure</div>
  <div class="ref-body">
    <div class="code-box">Response Time Percentiles (most important):
  P50 (median):  50% of requests complete within this time.
  P90:           90% of requests complete within this time.
  P95:           95% of requests — typical SLA target.
  P99:           99% of requests — catches worst-case outliers.
  P99.9:         for high-frequency trading, payment APIs.

  Why P99 matters more than average:
    1000 requests, 10 take 10s, 990 take 100ms.
    Average = 199ms (looks fine).
    P99 = 10,000ms (1 in 100 users has terrible experience).

Throughput:
  TPS (Transactions Per Second) or RPS (Requests Per Second).
  What is the max sustainable throughput before latency degrades?

Error Rate:
  Target: &lt; 0.1% for internal APIs, &lt; 0.01% for payment APIs.

Apdex Score (Application Performance Index):
  0–1 score: 1 = all satisfied, 0 = all frustrated.
  Satisfied:  response &lt; T (threshold, e.g. 500ms)
  Tolerating: T &lt; response &lt; 4T
  Frustrated: response &gt; 4T or error
  Formula: (Satisfied + Tolerating/2) / Total requests</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Infrastructure Metrics During Test</div>
        <div class="code-box">CPU utilization: &gt;80% sustained = CPU bottleneck
Memory: growing without returning = leak
GC pressure (.NET): high Gen2 GC = allocation issue
Thread pool queue: growing = starvation
DB connection pool: at max = pool exhaustion
DB: slow queries, lock waits, deadlocks
Network I/O: bandwidth saturation
Disk I/O: high latency = disk bottleneck

Correlate app metrics + infra metrics:
  Response time spikes at 14:35?
  Check CPU / DB / thread pool at 14:35.</div>
      </div>
      <div>
        <div class="ans-label">Performance Test in CI/CD Pipeline</div>
        <div class="code-box">Where to run performance tests:
  ✅ Staging (post-deploy, before prod)
  ✅ PR gate for critical services (light load test)
  ❌ Not against production with real users

Automated gates:
  P99 latency regression: &gt;10% worse than baseline → FAIL
  Error rate: &gt;0.1% → FAIL
  Throughput: &gt;10% drop vs baseline → FAIL

Baseline comparison:
  Store baseline results in blob storage.
  Each test compares against baseline.
  Flag regressions automatically.

Shift-left performance:
  Unit-level: BenchmarkDotNet (micro-benchmarks)
  Integration: JMeter/k6 in staging pipeline
  Production: Canary with real metrics comparison</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Tool Selection Guide</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Tool</div><div>Best For</div><div>Script Language</div><div>Cloud Scale</div><div>Cost</div></div>
      <div class="pt-row"><div class="pt-name">LoadRunner</div><div>Enterprise, complex protocols (SAP, Citrix, Oracle, legacy)</div><div>C (VuGen)</div><div>On-prem LGs</div><div>Expensive license</div></div>
      <div class="pt-row"><div class="pt-name">BlazeMeter</div><div>Cloud-scale, CI/CD-native, multi-region, JMeter-compatible</div><div>JMeter/Gatling/k6</div><div>✅ Native</div><div>SaaS subscription</div></div>
      <div class="pt-row"><div class="pt-name">JMeter</div><div>Open source, wide protocol support, large ecosystem</div><div>GUI + XML</div><div>Via BlazeMeter</div><div>Free</div></div>
      <div class="pt-row"><div class="pt-name">k6</div><div>Developer-friendly, code-first, CI/CD, modern APIs</div><div>JavaScript</div><div>k6 Cloud</div><div>Free + paid cloud</div></div>
      <div class="pt-row"><div class="pt-name">Gatling</div><div>Scala DSL, high-performance, good reports</div><div>Scala/Java</div><div>BlazeMeter</div><div>Free + enterprise</div></div>
      <div class="pt-row"><div class="pt-name">Azure Load Testing</div><div>Azure-native, JMeter scripts, AKS/App Service integration</div><div>JMeter</div><div>✅ Native</div><div>Per VU-hour</div></div>
    </div>
    <div class="tip-box" style="margin-top:12px;">✅ Modern recommendation: k6 for CI/CD (developer writes tests in JS, runs in pipeline) + BlazeMeter or Azure Load Testing for large-scale cloud tests. LoadRunner for legacy enterprise systems that need protocol emulation.</div>
  </div>
</div>
`;
