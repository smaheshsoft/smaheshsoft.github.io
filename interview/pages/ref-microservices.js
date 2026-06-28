window.Pages['ref-microservices'] = `
<div class="page-header">
  <div class="breadcrumb">Architect Reference › <span>Microservices Architecture</span></div>
  <h1>🧩 Microservices Architecture</h1>
  <p>Complete architect-level reference — principles, patterns, trade-offs, and decision frameworks</p>
</div>

<div class="ref-section">
  <div class="ref-title">What is Microservices Architecture?</div>
  <div class="ref-body">
    <p>Microservices is an architectural style where an application is composed of small, independently deployable services. Each service owns a specific business capability, its own database, and communicates over well-defined APIs or events.</p>
    <div class="two-col">
      <div>
        <div class="ans-label">Monolith</div>
        <div class="code-box">[ UI + Business Logic + Data Access ]
     ↓
Single Deployable Unit
Single Database
Single Tech Stack</div>
        <div class="warn-box" style="margin-top:8px;">⚠️ Scale entire app for one bottleneck. Team coupling. Long release cycles.</div>
      </div>
      <div>
        <div class="ans-label">Microservices</div>
        <div class="code-box">User Service   → User DB
Order Service  → Order DB
Payment Service→ Payment DB
Notify Service → (stateless)
      ↓
Each deploys independently</div>
        <div class="tip-box" style="margin-top:8px;">✅ Scale per service. Team autonomy. Independent releases.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Core Principles (Architect Must Know)</div>
  <div class="ref-body">
    <div class="principle-grid">
      <div class="principle-card">
        <div class="principle-icon">1</div>
        <div class="principle-name">Single Responsibility</div>
        <p>Each service owns one business capability. Order Service only handles orders.</p>
      </div>
      <div class="principle-card">
        <div class="principle-icon">2</div>
        <div class="principle-name">Database per Service</div>
        <p>No shared database. Services communicate via APIs or events, never via shared DB.</p>
      </div>
      <div class="principle-card">
        <div class="principle-icon">3</div>
        <div class="principle-name">Loose Coupling</div>
        <p>Services are independent. Change in one service should not break others.</p>
      </div>
      <div class="principle-card">
        <div class="principle-icon">4</div>
        <div class="principle-name">High Cohesion</div>
        <p>Related functionality stays together. Everything about "payments" lives in Payment Service.</p>
      </div>
      <div class="principle-card">
        <div class="principle-icon">5</div>
        <div class="principle-name">Design for Failure</div>
        <p>Assume any service can fail at any time. Use Circuit Breaker, Retry, Timeout.</p>
      </div>
      <div class="principle-card">
        <div class="principle-icon">6</div>
        <div class="principle-name">Decentralized Governance</div>
        <p>Teams choose best tech for their service. One team uses .NET, another uses Node.js.</p>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Microservices Communication Patterns</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Synchronous (Request-Response)</div>
        <div class="code-box">Client → API Gateway → Service A
                     ↓
                  Service B (waits for response)

Protocols: REST / gRPC / GraphQL</div>
        <p style="margin-top:8px;font-size:13px;color:#94a3b8;">Use when: immediate response required, simple CRUD, read-heavy</p>
        <div class="warn-box" style="margin-top:8px;">⚠️ Tight temporal coupling. If B is down, A fails too.</div>
      </div>
      <div>
        <div class="ans-label">Asynchronous (Event-Driven)</div>
        <div class="code-box">Service A → publishes event → Kafka
                          ↓
          Service B, C, D subscribe independently

Protocols: Kafka / Service Bus / RabbitMQ</div>
        <p style="margin-top:8px;font-size:13px;color:#94a3b8;">Use when: multiple consumers, async workflows, high throughput</p>
        <div class="tip-box" style="margin-top:8px;">✅ Loose coupling. Resilient. Scalable independently.</div>
      </div>
    </div>
    <div class="ans-label" style="margin-top:16px;">Service Discovery in Kubernetes</div>
    <div class="code-box">Every service gets a DNS name:
http://order-service.production.svc.cluster.local

Kubernetes kube-dns resolves this to the service ClusterIP automatically.
No hardcoded IPs needed.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Key Microservice Patterns — Architect Decision Framework</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header">
        <div>Pattern</div><div>Problem Solved</div><div>When To Use</div><div>Tool/Example</div>
      </div>
      <div class="pt-row"><div class="pt-name">API Gateway</div><div>Single entry point for all clients</div><div>Always — never expose services directly</div><div>Azure APIM, Kong, NGINX</div></div>
      <div class="pt-row"><div class="pt-name">Circuit Breaker</div><div>Prevents cascade failures</div><div>Calling downstream services</div><div>Polly (.NET), Resilience4j</div></div>
      <div class="pt-row"><div class="pt-name">Saga</div><div>Distributed transactions</div><div>Multi-service operations (Order→Payment→Inventory)</div><div>MassTransit, Conductor</div></div>
      <div class="pt-row"><div class="pt-name">CQRS</div><div>Separate read/write models</div><div>High read load, complex queries</div><div>MediatR, EventStore</div></div>
      <div class="pt-row"><div class="pt-name">Event Sourcing</div><div>Store events not state</div><div>Audit trail, replay, financial systems</div><div>EventStoreDB</div></div>
      <div class="pt-row"><div class="pt-name">Sidecar</div><div>Cross-cutting concerns (logging, mTLS)</div><div>Service mesh, observability</div><div>Istio Envoy proxy</div></div>
      <div class="pt-row"><div class="pt-name">Strangler Fig</div><div>Incremental migration from monolith</div><div>Migrating legacy systems</div><div>API routing, feature flags</div></div>
      <div class="pt-row"><div class="pt-name">Bulkhead</div><div>Isolate failures by service/pool</div><div>Critical services must stay up</div><div>Separate thread pools, instances</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Saga Pattern — Deep Dive</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Choreography Saga (Event-driven)</div>
        <div class="code-box">Order Service
  → publishes OrderCreated
     → Payment Service listens
       → publishes PaymentDone
          → Inventory Service listens
            → publishes StockReserved
               → Shipping starts

No central coordinator.
Each service reacts to events.</div>
        <p style="margin-top:6px;font-size:12px;color:#94a3b8;">✅ Simple. Decentralized.<br>⚠️ Hard to track overall flow.</p>
      </div>
      <div>
        <div class="ans-label">Orchestration Saga (Central coordinator)</div>
        <div class="code-box">Saga Orchestrator
  → calls Payment Service
  → calls Inventory Service
  → calls Shipping Service
  → handles compensation on failure

Central brain directs every step.</div>
        <p style="margin-top:6px;font-size:12px;color:#94a3b8;">✅ Clear visibility. Easy to trace.<br>⚠️ Orchestrator becomes a single point of dependency.</p>
      </div>
    </div>
    <div class="ans-label" style="margin-top:16px;">Compensation Logic (Rollback)</div>
    <div class="code-box">Happy Path:    OrderCreated → PaymentSuccess → StockReserved → Shipped
Failure Path:  StockFailed  → RefundPayment → CancelOrder → Notify Customer

Each step must have a compensating transaction (undo action).</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">When NOT to Use Microservices</div>
  <div class="ref-body">
    <div class="warn-box">⚠️ Microservices add complexity. Do not use them just because it's trendy.</div>
    <div class="two-col" style="margin-top:12px;">
      <div>
        <div class="ans-label">Avoid Microservices When</div>
        <ul>
          <li>Small team (fewer than 8–10 engineers)</li>
          <li>Domain not well understood yet</li>
          <li>Simple CRUD application</li>
          <li>No DevOps maturity (CI/CD, monitoring)</li>
          <li>Startup MVP — speed over architecture</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Use Microservices When</div>
        <ul>
          <li>Different services need independent scaling</li>
          <li>Multiple teams working in parallel</li>
          <li>Different release cadences per domain</li>
          <li>Different tech stacks needed per domain</li>
          <li>High availability per business function</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Observability in Microservices</div>
  <div class="ref-body">
    <div class="code-box">The 3 Pillars of Observability:

1. LOGS    — what happened?       → Serilog, ELK, Application Insights
2. METRICS — how is it performing? → Prometheus, Grafana, Azure Monitor
3. TRACES  — where did it go?     → OpenTelemetry, Jaeger, Zipkin

Every request gets: TraceId → SpanId → ParentSpanId
Correlation-ID passes across all service boundaries.</div>
    <div class="tip-box" style="margin-top:12px;">✅ Architect Rule: If you cannot observe it, you cannot operate it. Observability is not optional in microservices.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Interview Summary — Architect-Level Answer</div>
  <div class="ref-body">
    <div class="code-box">Q: How do you design a microservices system?

A: I start with domain-driven design to identify bounded contexts.
   Each context becomes a service with its own database.
   Services communicate synchronously via REST/gRPC for queries,
   and asynchronously via Kafka/Service Bus for workflows.

   For distributed transactions I use the Saga pattern —
   choreography for simple flows, orchestration for complex ones.

   I enforce the API Gateway as the single entry point,
   use Circuit Breaker for resilience,
   and instrument every service with OpenTelemetry for tracing.

   I only recommend microservices when the team and domain are mature
   enough to handle the operational complexity they introduce.</div>
  </div>
</div>
`;
