window.Pages['ref-sdlc-ownership'] = `
<div class="page-header">
  <div class="breadcrumb">Architecture › <span>SDLC &amp; Artifact Ownership</span></div>
  <h1>📋 SDLC &amp; Artifact Ownership</h1>
  <p>Who owns each stage, what document comes out of it, and where the architect gets involved</p>
</div>

<div class="ref-section">
  <div class="ref-title">At A Glance</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step">Business owns WHY</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step">Product owns WHAT</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step blue">Architecture owns the SOLUTION &amp; HOW</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step">Engineering owns the BUILD</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step">Ops owns the RUN</div>
    </div>
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">🧭</div><div class="principle-name">BRD → PRD → FRD</div><p>Business problem → product features → system behavior</p></div>
      <div class="principle-card"><div class="principle-icon">📐</div><div class="principle-name">NFR</div><p>Where the architect becomes a major owner — quality attributes</p></div>
      <div class="principle-card"><div class="principle-icon">🏛️</div><div class="principle-name">SAD → HLD → LLD</div><p>Solution choice → component map → class/sequence detail</p></div>
      <div class="principle-card"><div class="principle-icon">✅</div><div class="principle-name">Governance</div><p>Architecture board validates alignment with enterprise standards</p></div>
    </div>
    <div class="tip-box">✅ Interview one-liner: "Business owns the Why, Product owns the What, Architecture owns the Solution and How, Engineering owns the Build, QA owns the Validation, DevOps owns the Release, Operations owns the Run, and Governance ensures the solution stays aligned with enterprise standards."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">End-to-End Stage Ownership</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:1.3fr 1.6fr 1.3fr 1.8fr;">
        <div>Stage</div><div>Main Question</div><div>Primary Owner</div><div>Architect's Role</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.3fr 1.6fr 1.3fr 1.8fr;"><div class="dt-name">Business Discovery</div><div>Why do we need this?</div><div>Business Sponsor</div><div>Assess technical feasibility &amp; rough cost</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 1.6fr 1.3fr 1.8fr;"><div class="dt-name">BRD</div><div>What business problem?</div><div>Business Analyst / PO</div><div>Review objectives, scope, constraints</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 1.6fr 1.3fr 1.8fr;"><div class="dt-name">PRD</div><div>What product should we build?</div><div>Product Manager</div><div>Validate feasibility, flag architectural impact</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 1.6fr 1.3fr 1.8fr;"><div class="dt-name">FRD / User Stories</div><div>What should the system do?</div><div>BA / PO</div><div>Identify services, integrations, dependencies</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 1.6fr 1.3fr 1.8fr;"><div class="dt-name">NFR</div><div>How well should it work?</div><div>Architect + BA + Security + DevOps</div><div class="dt-yes">Major owner/contributor</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 1.6fr 1.3fr 1.8fr;"><div class="dt-name">Solution Architecture (SAD)</div><div>What solution should we choose?</div><div class="dt-yes">Solution Architect</div><div class="dt-yes">Primary owner</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 1.6fr 1.3fr 1.8fr;"><div class="dt-name">HLD</div><div>How do major components fit together?</div><div class="dt-yes">Solution / Technical Architect</div><div class="dt-yes">Primary owner</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 1.6fr 1.3fr 1.8fr;"><div class="dt-name">LLD</div><div>How exactly does each component work?</div><div>Technical Architect / Senior Devs</div><div>Review / guide</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 1.6fr 1.3fr 1.8fr;"><div class="dt-name">API / Integration Design</div><div>How do systems communicate?</div><div>Technical / Integration Architect</div><div>Design / review</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 1.6fr 1.3fr 1.8fr;"><div class="dt-name">Data Architecture</div><div>How is data stored &amp; governed?</div><div>Data Architect</div><div>Design / review</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 1.6fr 1.3fr 1.8fr;"><div class="dt-name">Security Architecture</div><div>How do we protect the system?</div><div>Security Architect</div><div>Collaborate</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 1.6fr 1.3fr 1.8fr;"><div class="dt-name">Implementation</div><div>How do we build it?</div><div>Eng Manager / Tech Lead</div><div>Technical guidance, review key decisions</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 1.6fr 1.3fr 1.8fr;"><div class="dt-name">Testing</div><div>Does it work correctly?</div><div>QA / Test Lead</div><div>Define NFR/performance expectations</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 1.6fr 1.3fr 1.8fr;"><div class="dt-name">DevOps / Deployment</div><div>How do we release it?</div><div>DevOps / Platform Engineer</div><div>Architecture/release design</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 1.6fr 1.3fr 1.8fr;"><div class="dt-name">Operations</div><div>How do we run it?</div><div>SRE / Operations</div><div>Reliability &amp; operational architecture</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 1.6fr 1.3fr 1.8fr;"><div class="dt-name">Governance</div><div>Are we building it correctly?</div><div>Architecture Board / EA</div><div class="dt-yes">Major owner/contributor</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 1.6fr 1.3fr 1.8fr;"><div class="dt-name">Continuous Improvement</div><div>How can we improve it?</div><div>Product + Eng + Architecture</div><div>Identify improvements</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Worked Example — Loan Approval Platform</div>
  <div class="ref-body">
    <div class="code-box">Business Case:  "Loan approval takes 2 days. Reduce it to 2 hours."

BRD   → Business Goals: cut cost 30%, improve CX, increase automation
PRD   → Features: AI document verification, credit assessment,
         loan approval workflow, customer notification
FRD   → On PDF upload: validate → extract → verify → score
         → route low-confidence docs to human review
NFR   → Availability 99.99% · API &lt; 500ms · 10k req/sec ·
         OAuth2+RBAC · RPO 5min/RTO 30min · GDPR
SAD   → Users → Azure Front Door → APIM → AKS → Microservices
         → Service Bus → Azure SQL → Redis
HLD   → Component diagram, integration architecture, DR, scaling
LLD   → OrderController → OrderService → OrderRepository → DB,
         class diagrams, sequence diagrams, retry policies</div>
    <div class="ans-block"><div class="ans-label">NFR table — this is where architects spend the most interview time</div>
    <div class="decision-table">
      <div class="dt-row dt-header"><div>NFR</div><div>Example Requirement</div></div>
      <div class="dt-row"><div class="dt-name">Availability</div><div>99.99%</div></div>
      <div class="dt-row"><div class="dt-name">Performance</div><div>API response &lt; 500 ms</div></div>
      <div class="dt-row"><div class="dt-name">Scalability</div><div>10,000 requests/sec</div></div>
      <div class="dt-row"><div class="dt-name">Security</div><div>OAuth2 + RBAC</div></div>
      <div class="dt-row"><div class="dt-name">Disaster Recovery</div><div>RPO 5 min / RTO 30 min</div></div>
      <div class="dt-row"><div class="dt-name">Reliability</div><div>Retry + Circuit Breaker</div></div>
      <div class="dt-row"><div class="dt-name">Compliance</div><div>GDPR / HIPAA</div></div>
      <div class="dt-row"><div class="dt-name">Observability</div><div>Logs + Metrics + Traces</div></div>
      <div class="dt-row"><div class="dt-name">Cost</div><div>Budget ceiling per month</div></div>
    </div></div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">SAD → HLD → LLD — Full Breakdown</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step">SAD: which solution?</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step blue">HLD: how do components fit?</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step">LLD: how does each one work?</div>
    </div>
    <div class="decision-table">
      <div class="dt-row dt-header"><div>Aspect</div><div>SAD</div><div>HLD</div><div>LLD</div></div>
      <div class="dt-row"><div class="dt-name">Question</div><div>What solution/approach?</div><div>How do major parts fit together?</div><div>How exactly is each part built?</div></div>
      <div class="dt-row"><div class="dt-name">Owner</div><div>Solution Architect</div><div>Solution/Technical Architect</div><div>Technical Architect / Tech Lead / Senior Devs</div></div>
      <div class="dt-row"><div class="dt-name">Contains</div><div>Principles, ADRs, tech selection, integration strategy, cost estimate, risks</div><div>Architecture/component/deployment diagrams, data flow, security boundaries</div><div>Class diagrams, sequence diagrams, DB schema, API contracts, retry policy</div></div>
      <div class="dt-row"><div class="dt-name">Granularity</div><div>Whole-system, strategic</div><div>Service/component level</div><div>Class/method/table level</div></div>
    </div>
    <div class="ans-block"><div class="ans-label">Same system, three altitudes</div>
    <div class="code-box">SAD (strategic):
  "We will build an event-driven microservices platform on AKS,
   using Service Bus for async communication and Azure SQL as
   the system of record, to meet the 99.99% availability and
   10k req/sec NFRs."

HLD (structural):
  Users → Front Door → APIM → AKS (Order|Payment|User)
         → Service Bus → Azure SQL

LLD (implementation):
  POST /orders
  OrderController → OrderService → OrderRepository → PostgreSQL
  Retry policy: 3 attempts, exponential backoff
  Idempotency: dedupe on ClientRequestId column</div></div>
    <div class="tip-box">✅ Interview line: "SAD tells you which direction we're going and why. HLD draws the map of that direction. LLD is the turn-by-turn directions for one specific road on that map." Full comparison and trade-offs: see the dedicated <strong>SAD vs HLD vs LLD</strong> page.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Why This Matters For Lead / Principal Architect Interviews</div>
  <div class="ref-body">
    <div class="warn-box">⚠️ Common trap: describing the HLD/LLD in detail but being unable to explain who owns the stage BEFORE architecture (BRD/PRD) and AFTER delivery (Governance, Continuous Improvement). A Lead/Principal Architect is expected to operate across the whole chain — not just the "design the boxes" middle section.</div>
    <div class="tip-box">✅ If asked "where do you get involved first?" — the honest, strong answer is Business Discovery and NFR, not just Solution Architecture. Showing involvement upstream (feasibility) and downstream (Governance, cost/FinOps) is what distinguishes Lead/Principal scope from a pure Solution Architect who only owns SAD→HLD.</div>
  </div>
</div>
`;
