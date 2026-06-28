window.Pages['ref-monitoring-advanced'] = `
<div class="page-header">
  <div class="breadcrumb">Deep Dive › <span>Monitoring &amp; Observability</span></div>
  <h1>📊 Monitoring &amp; Observability</h1>
  <p>OpenTelemetry · Prometheus · Grafana · ELK · Loki · Jaeger · Distributed Tracing · Structured Logging</p>
</div>

<div class="ref-section">
  <div class="ref-title">Three Pillars of Observability</div>
  <div class="ref-body">
    <div class="code-box">1. METRICS — Aggregated numerical data over time.
   What: CPU %, request rate, error rate, latency P99
   Tools: Prometheus, Azure Monitor, Datadog
   Use: Dashboards, alerts, capacity planning

2. LOGS — Discrete events with context.
   What: "User 123 placed order 456 at 14:32:01"
   Tools: ELK Stack, Loki + Grafana, Azure Log Analytics
   Use: Debugging, audit trail, root cause analysis

3. TRACES — Request journey across services.
   What: OrderService → InventoryService → PaymentService (each span timed)
   Tools: Jaeger, Zipkin, Azure Application Insights, Tempo
   Use: Latency breakdown, finding slow microservice hops

4th Pillar: EVENTS — significant state changes.
   Deployment events, config changes, incidents overlaid on metrics.</div>
    <div class="tip-box">✅ Correlate all three with a single Correlation ID / Trace ID. One request → one trace → related logs → related metrics spike.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">OpenTelemetry — The Standard</div>
  <div class="ref-body">
    <div class="code-box">OpenTelemetry (OTel): vendor-neutral observability framework.
  Single SDK → export to ANY backend (Jaeger, Prometheus, Datadog, Azure Monitor).

// .NET 8 OpenTelemetry setup
builder.Services.AddOpenTelemetry()
    .ConfigureResource(r => r.AddService("OrderService"))
    .WithTracing(t => t
        .AddAspNetCoreInstrumentation()
        .AddHttpClientInstrumentation()
        .AddEntityFrameworkCoreInstrumentation()
        .AddOtlpExporter(o => o.Endpoint = new Uri("http://otel-collector:4317")))
    .WithMetrics(m => m
        .AddAspNetCoreInstrumentation()
        .AddRuntimeInstrumentation()
        .AddPrometheusExporter())
    .WithLogging(l => l
        .AddOtlpExporter());</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Custom Spans &amp; Metrics</div>
        <div class="code-box">// Custom trace span
private static readonly ActivitySource _src =
    new("OrderService");

public async Task ProcessOrderAsync(int id) {
    using var activity = _src.StartActivity("ProcessOrder");
    activity?.SetTag("order.id", id);
    activity?.SetTag("order.region", "EU");
    try {
        await DoWorkAsync();
        activity?.SetStatus(ActivityStatusCode.Ok);
    } catch (ex) {
        activity?.SetStatus(ActivityStatusCode.Error, ex.Message);
        activity?.RecordException(ex);
        throw;
    }
}

// Custom metric counter
private static readonly Counter&lt;int&gt; _ordersProcessed =
    Meter.CreateCounter&lt;int&gt;("orders.processed");
_ordersProcessed.Add(1, new("region", "EU"));</div>
      </div>
      <div>
        <div class="ans-label">OTel Collector</div>
        <div class="code-box">OTel Collector: central pipeline for telemetry.

  App → OTLP → Collector → multiple backends

# otel-collector-config.yaml
receivers:
  otlp:
    protocols: { grpc: {}, http: {} }

processors:
  batch:
  memory_limiter:
    limit_mib: 512

exporters:
  jaeger:
    endpoint: jaeger:14250
  prometheus:
    endpoint: "0.0.0.0:8889"
  azuremonitor:
    instrumentation_key: &lt;key&gt;

service:
  pipelines:
    traces:   { receivers: [otlp], processors: [batch], exporters: [jaeger] }
    metrics:  { receivers: [otlp], processors: [batch], exporters: [prometheus] }</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Prometheus &amp; Grafana</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Prometheus Architecture</div>
        <div class="code-box">Prometheus PULLS metrics from targets.
  /metrics endpoint scraped every 15s.

# prometheus.yml
scrape_configs:
  - job_name: 'orderservice'
    static_configs:
      - targets: ['orderservice:8080']
    metrics_path: /metrics

Key metric types:
  Counter:   only goes up (requests_total)
  Gauge:     can go up/down (active_connections)
  Histogram: distribution (request_duration_seconds)
  Summary:   pre-calculated quantiles

PromQL examples:
  rate(http_requests_total[5m])          ← req/sec
  histogram_quantile(0.99, ...)          ← P99 latency
  sum by(service) (http_errors_total)    ← errors per service</div>
      </div>
      <div>
        <div class="ans-label">Alerting</div>
        <div class="code-box"># Prometheus alert rule
groups:
  - name: order-service
    rules:
      - alert: HighErrorRate
        expr: |
          rate(http_requests_total{status=~"5.."}[5m])
          / rate(http_requests_total[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Error rate &gt; 5% for 5 min"

Alertmanager routes to:
  PagerDuty (on-call), Slack, email.

SLO-based alerts (more useful than threshold):
  SLO: 99.9% of requests succeed
  Alert: error budget burning too fast
  → Burn rate alert: 14x normal rate
    for 1 hour = 1/14 of monthly budget gone</div>
      </div>
    </div>
    <div class="ans-label" style="margin-top:14px;">Golden Signals (Google SRE)</div>
    <div class="code-box">1. Latency    — how long requests take (P50, P95, P99)
2. Traffic    — requests per second (load on system)
3. Errors     — rate of failed requests (5xx, exceptions)
4. Saturation — how "full" the service is (CPU %, queue depth, thread pool)</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">ELK Stack &amp; Loki</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">ELK Stack</div>
        <div class="code-box">Elasticsearch: store &amp; search logs (inverted index)
Logstash: ingest, parse, transform logs
Kibana: visualize, search, dashboards

Pipeline:
  App → Logstash (parse) → Elasticsearch → Kibana

// Structured logging (.NET Serilog)
Log.Logger = new LoggerConfiguration()
    .Enrich.WithCorrelationId()
    .WriteTo.Elasticsearch(new ElasticsearchSinkOptions(
        new Uri("http://elasticsearch:9200")) {
        IndexFormat = "logs-{0:yyyy.MM.dd}"
    })
    .CreateLogger();

Log.Information("Order {OrderId} placed by {UserId}",
    orderId, userId);
// Creates searchable fields in ES: OrderId, UserId</div>
      </div>
      <div>
        <div class="ans-label">Loki (Grafana's log solution)</div>
        <div class="code-box">Loki: like Prometheus, but for logs.
  Labels-only index (not full-text) → very cheap.
  Query language: LogQL (similar to PromQL).

// .NET → Loki via Serilog
.WriteTo.GrafanaLoki("http://loki:3100", labels: new[] {
    new LokiLabel { Key = "app", Value = "orderservice" },
    new LokiLabel { Key = "env", Value = "prod" }
})

LogQL examples:
  {app="orderservice"} |= "error"
  {app="orderservice"} | json | level="error"
  rate({app="orderservice"} |= "timeout" [5m])

ELK vs Loki:
  ELK: full-text search, rich queries, expensive
  Loki: label-based, cheap storage, pairs with Grafana/Prometheus
  Use Loki when: already using Prometheus + Grafana</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Distributed Tracing — Jaeger</div>
  <div class="ref-body">
    <div class="code-box">Trace: end-to-end journey of one request.
  Span: one unit of work (one service or one DB call).
  Trace ID: propagated via HTTP headers (traceparent: W3C standard).

Request flow example:
  [API Gateway] ──────────────────── 450ms total
      │
      ├─[OrderService.PlaceOrder]  120ms
      │     ├─[DB: INSERT order]   30ms
      │     └─[Redis: SET cache]   5ms
      │
      ├─[InventoryService.Reserve] 80ms
      │     └─[DB: UPDATE stock]   40ms
      │
      └─[PaymentService.Charge]    200ms ← SLOW!
            └─[External API]       180ms ← bottleneck found!</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Trace Context Propagation</div>
        <div class="code-box">W3C TraceContext (standard):
  Header: traceparent: 00-{traceId}-{spanId}-01

  TraceId: same for entire request
  SpanId: unique per service/operation

// HttpClient auto-propagates via OTel
// Manual propagation (outgoing HTTP):
var propagator = Propagators.DefaultTextMapPropagator;
propagator.Inject(new PropagationContext(activity.Context, Baggage.Current),
    headers, (h, k, v) => h[k] = v);</div>
      </div>
      <div>
        <div class="ans-label">Correlation ID Pattern</div>
        <div class="code-box">// Middleware: ensure every request has Correlation ID
var corrId = ctx.Request.Headers["X-Correlation-Id"]
               .FirstOrDefault()
               ?? Activity.Current?.TraceId.ToString()
               ?? Guid.NewGuid().ToString();

// Add to logs (Serilog)
using (LogContext.PushProperty("CorrelationId", corrId))
using (LogContext.PushProperty("TraceId", Activity.Current?.TraceId))
    await next(ctx);

// Add to response headers
ctx.Response.Headers["X-Correlation-Id"] = corrId;

// Result: every log line has CorrelationId
// Search logs by CorrelationId to find all related logs</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Azure Application Insights</div>
  <div class="ref-body">
    <div class="code-box">// Setup (.NET 8)
builder.Services.AddApplicationInsightsTelemetry(
    builder.Configuration["ApplicationInsights:ConnectionString"]);

// Auto-collected: HTTP requests, dependencies (DB, HTTP, Redis), exceptions, page views.

// Custom telemetry
private readonly TelemetryClient _tel;

_tel.TrackEvent("OrderPlaced", new Dictionary&lt;string,string&gt; {
    ["OrderId"] = orderId.ToString(),
    ["Amount"]  = amount.ToString("F2")
});

_tel.TrackMetric("OrderProcessingTime", stopwatch.ElapsedMilliseconds);

// Live Metrics: real-time streaming dashboard
// Application Map: visual service dependency map with error rates
// Availability Tests: synthetic monitoring from global locations
// Smart Detection: ML-based anomaly detection</div>
    <div class="tip-box">✅ Application Insights = Azure's all-in-one observability. Traces + Logs + Metrics + Alerts in one service. Use OpenTelemetry SDK with Azure Monitor exporter for vendor-neutral approach.</div>
  </div>
</div>
`;
