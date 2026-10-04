window.Pages['ref-sad-hld-lld'] = `
<div class="page-header">
  <div class="breadcrumb">Architecture › <span>SAD vs HLD vs LLD</span></div>
  <h1>🏛️ Solution Architecture vs HLD vs LLD</h1>
  <p>Three documents interviewers love to blur together — know exactly where each one stops</p>
</div>

<div class="ref-section">
  <div class="ref-title">At A Glance</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step">SAD: which solution?</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step blue">HLD: how do components fit?</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step">LLD: how does each one work?</div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Comparison</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header"><div>Aspect</div><div>SAD</div><div>HLD</div><div>LLD</div></div>
      <div class="dt-row"><div class="dt-name">Question</div><div>What solution/approach?</div><div>How do major parts fit together?</div><div>How exactly is each part built?</div></div>
      <div class="dt-row"><div class="dt-name">Owner</div><div>Solution Architect</div><div>Solution/Technical Architect</div><div>Technical Architect / Tech Lead / Senior Devs</div></div>
      <div class="dt-row"><div class="dt-name">Contains</div><div>Principles, ADRs, tech selection, integration strategy, cost estimate, risks</div><div>Architecture/component/deployment diagrams, data flow, security boundaries</div><div>Class diagrams, sequence diagrams, DB schema, API contracts, retry policy</div></div>
      <div class="dt-row"><div class="dt-name">Granularity</div><div>Whole-system, strategic</div><div>Service/component level</div><div>Class/method/table level</div></div>
      <div class="dt-row"><div class="dt-name">Changes how often?</div><div>Rarely — foundational</div><div>Per major feature/service</div><div>Per sprint/implementation detail</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Worked Example — Same System, Three Altitudes</div>
  <div class="ref-body">
    <div class="code-box">SAD (strategic):
  "We will build an event-driven microservices platform on AKS,
   using Service Bus for async communication and Azure SQL as
   the system of record, to meet the 99.99% availability and
   10k req/sec NFRs."

HLD (structural):
            ┌──────────────┐
            │  Front Door  │
            └──────┬───────┘
                   ▼
            ┌──────────────┐
            │     APIM     │
            └──────┬───────┘
                   ▼
   ┌───────────────────────────┐
   │             AKS            │
   │  Order | Payment | User    │
   └──────────────┬─────────────┘
                  ▼
           ┌──────────────┐        ┌──────────────┐
           │ Service Bus  │───────▶│  Azure SQL   │
           └──────────────┘        └──────────────┘

LLD (implementation):
  POST /orders
  OrderController → OrderService → OrderRepository → PostgreSQL
  Retry policy: 3 attempts, exponential backoff
  Validation: FluentValidation on OrderRequest
  Idempotency: dedupe on ClientRequestId column</div>
    <div class="tip-box">✅ Interview line: "SAD tells you which direction we're going and why. HLD draws the map of that direction. LLD is the turn-by-turn directions for one specific road on that map."</div>
    <div class="warn-box">⚠️ Common trap: being asked for an HLD and drilling straight into class names and SQL schemas (that's LLD), or being asked for an SAD and just redrawing the component diagram (that's HLD) without ever stating the decision driver or alternative considered.</div>
  </div>
</div>
`;
