window.Pages['ref-hld'] = `
<div class="page-header">
  <div class="breadcrumb">Architect Reference › <span>High-Level Design (HLD)</span></div>
  <h1>📐 High-Level Design (HLD) — Complete Reference</h1>
  <p>System-wide architecture: components, data flow, NFRs, capacity estimation, and the HLD document architects actually produce</p>
</div>

<div class="ref-section">
  <div class="ref-title">What Is HLD — Purpose &amp; Audience</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Definition</div>
        <p>HLD is the <strong>system-wide blueprint</strong> — it describes WHAT components exist, HOW they talk to each other, and WHY specific technologies were chosen. It intentionally stays away from class-level or line-of-code detail (that's LLD).</p>
        <div class="ans-label" style="margin-top:12px;">Audience</div>
        <ul>
          <li>Architects &amp; Tech Leads (design review)</li>
          <li>Engineering managers (staffing/timeline)</li>
          <li>Product owners (feasibility, trade-offs)</li>
          <li>Security/compliance reviewers</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">What HLD Must Answer</div>
        <div class="code-box">1. What are the major components/services?
2. How does data flow between them?
3. What technology is used, and why?
4. How does it scale (10x, 100x users)?
5. What happens when a component fails?
6. What are the security &amp; compliance boundaries?
7. What does it cost to run?</div>
      </div>
    </div>
    <div class="tip-box" style="margin-top:12px;">✅ Rule of thumb: if you can't explain a diagram in under 2 minutes to a non-technical stakeholder, it's not HLD anymore — it's drifted into LLD.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">The HLD Process — Step by Step</div>
  <div class="ref-body">
    <div class="code-box">Step 1: GATHER REQUIREMENTS
  Functional     — what must the system do (user stories, use cases)
  Non-Functional — scale, latency, availability, consistency, security
  Constraints    — budget, team skillset, timeline, existing tech stack

Step 2: CAPACITY ESTIMATION (back-of-envelope)
  Users → requests/sec → storage/day → storage/year → bandwidth

Step 3: DEFINE COMPONENTS
  Identify services, databases, caches, queues, external integrations
  Group by bounded context / business capability

Step 4: DEFINE DATA FLOW
  Draw request path: Client → Gateway → Service(s) → DB/Cache
  Mark sync vs async paths explicitly

Step 5: CHOOSE TECHNOLOGY
  For each component: pick tech + justify with a trade-off, not a preference
  "Kafka over RabbitMQ because we need replay + high throughput"

Step 6: DESIGN FOR FAILURE
  What's the blast radius if Service X goes down?
  Where are the single points of failure? How do we remove them?

Step 7: REVIEW &amp; ITERATE
  Walk the design against every NFR. Does it actually meet them?</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Capacity Estimation — Worked Example (URL Shortener)</div>
  <div class="ref-body">
    <p>Interviewers score you on the <em>method</em>, not exact numbers. Always state assumptions out loud.</p>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Metric</div><div>Assumption</div><div>Calculation</div><div>Result</div></div>
      <div class="pt-row"><div class="pt-name">Writes (new URLs)</div><div>100M new URLs/month</div><div>100M / (30×24×3600)</div><div>~40 writes/sec</div></div>
      <div class="pt-row"><div class="pt-name">Reads (redirects)</div><div>Read:Write ratio = 100:1</div><div>40 × 100</div><div>~4,000 reads/sec</div></div>
      <div class="pt-row"><div class="pt-name">Storage / year</div><div>500 bytes per record</div><div>100M × 12 × 500B</div><div>~600 GB/year</div></div>
      <div class="pt-row"><div class="pt-name">Cache size (80/20 rule)</div><div>Cache top 20% of hot URLs</div><div>20% of daily reads × record size</div><div>Few GB — fits in Redis</div></div>
      <div class="pt-row"><div class="pt-name">Bandwidth</div><div>500B avg response</div><div>4,000 × 500B</div><div>~2 MB/sec</div></div>
    </div>
    <div class="tip-box" style="margin-top:12px;">✅ Conclusion drives design: read-heavy (100:1) → prioritize caching &amp; read replicas over write throughput.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Non-Functional Requirements (NFR) Checklist</div>
  <div class="ref-body">
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">S</div><div class="principle-name">Scalability</div><p>Horizontal scale-out, stateless services, sharding/partitioning strategy.</p></div>
      <div class="principle-card"><div class="principle-icon">A</div><div class="principle-name">Availability</div><p>Target SLA (99.9% vs 99.99%), multi-AZ/region, failover strategy.</p></div>
      <div class="principle-card"><div class="principle-icon">L</div><div class="principle-name">Latency</div><p>P50/P95/P99 targets, caching layers, CDN, geo-distribution.</p></div>
      <div class="principle-card"><div class="principle-icon">C</div><div class="principle-name">Consistency</div><p>Strong vs eventual — pick per component (CAP theorem trade-off).</p></div>
      <div class="principle-card"><div class="principle-icon">D</div><div class="principle-name">Durability</div><p>Replication factor, backup/restore, RPO/RTO targets.</p></div>
      <div class="principle-card"><div class="principle-icon">$</div><div class="principle-name">Cost</div><p>Compute vs managed-service trade-off, reserved vs on-demand.</p></div>
    </div>
    <div class="warn-box" style="margin-top:12px;">⚠️ Common mistake: designing for "internet scale" NFRs (Google/Netflix numbers) when the actual requirement is 10K users. Match the design to the ACTUAL scale — over-engineering is a design smell too.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">HLD Diagram Types — What to Draw</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Diagram</div><div>Shows</div><div>When to Use</div><div>Notation</div></div>
      <div class="pt-row"><div class="pt-name">System Context</div><div>The system as one box + external actors/systems around it</div><div>First diagram — sets scope boundary</div><div>C4 Level 1</div></div>
      <div class="pt-row"><div class="pt-name">Container / Component</div><div>Major deployable services, DBs, queues + how they connect</div><div>Core HLD artifact</div><div>C4 Level 2, box-and-arrow</div></div>
      <div class="pt-row"><div class="pt-name">Data Flow Diagram</div><div>How a request/event moves through the system, sync vs async</div><div>Explaining a specific use case end-to-end</div><div>Arrows with numbered steps</div></div>
      <div class="pt-row"><div class="pt-name">Deployment Diagram</div><div>Physical/cloud topology — regions, AZs, network zones</div><div>Discussing HA/DR or cloud migration</div><div>Cloud provider icons</div></div>
      <div class="pt-row"><div class="pt-name">Sequence (high-level)</div><div>Ordered interaction between 3-5 major components (not classes)</div><div>Explaining a critical cross-service flow</div><div>Lifelines + arrows</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Worked Example — HLD for an E-Commerce Order System</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step blue">Client (Web/Mobile)</div>
      <div class="flow-arrow">↓ HTTPS</div>
      <div class="flow-step">API Gateway (auth, rate limit, routing)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Order Service (validate cart, create order)</div>
      <div class="flow-arrow">↓ sync</div>
      <div class="flow-step green">Inventory Service (reserve stock)</div>
      <div class="flow-arrow">↓ async (Order Created event)</div>
      <div class="flow-step">Payment Service ⇄ Payment Gateway</div>
      <div class="flow-arrow">↓ async (Payment Confirmed event)</div>
      <div class="flow-step">Notification Service (email/SMS)</div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Component Decisions</div>
        <ul>
          <li><strong>Order DB:</strong> PostgreSQL — needs ACID for order/payment consistency</li>
          <li><strong>Inventory Cache:</strong> Redis — fast stock-check reads</li>
          <li><strong>Event Backbone:</strong> Kafka — decouples services, allows replay for reconciliation</li>
          <li><strong>API Gateway:</strong> centralizes auth/rate-limit so services don't duplicate it</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Failure Handling</div>
        <ul>
          <li>Payment fails → compensating <strong>Saga</strong> releases reserved inventory</li>
          <li>Notification Service down → event stays in Kafka, retried on recovery (no lost orders)</li>
          <li>Inventory Service down → Order Service circuit-breaks, returns "try again" instead of cascading failure</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">HLD Document — Standard Structure</div>
  <div class="ref-body">
    <div class="code-box">1. Overview &amp; Goals           — problem statement, in/out of scope
2. Requirements               — functional + NFRs with target numbers
3. Capacity Estimation        — traffic, storage, bandwidth projections
4. High-Level Architecture    — component/container diagram
5. Component Responsibilities — one paragraph per major component
6. Data Model (high-level)    — entities &amp; relationships, not full schema
7. Technology Choices         — with justification / alternatives considered
8. Failure Modes &amp; Mitigation — what breaks, how the system responds
9. Security &amp; Compliance      — auth model, data classification, encryption
10. Cost Estimate             — rough monthly cloud spend
11. Open Questions / Risks    — what's still being decided</div>
    <div class="tip-box" style="margin-top:10px;">✅ Section 7 (Technology Choices) is where most interview follow-up questions come from — always be ready to defend "why X over Y."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">HLD Interview Checklist</div>
  <div class="ref-body">
    <ul>
      <li>✅ Clarified scale (users, QPS, data size) before drawing anything</li>
      <li>✅ Identified read:write ratio — it drives the caching/DB decision</li>
      <li>✅ Named a single point of failure and how it's removed</li>
      <li>✅ Explained sync vs async boundaries and why</li>
      <li>✅ Mentioned monitoring/observability, not just the happy path</li>
      <li>✅ Gave at least one explicit trade-off ("we could do X, but chose Y because...")</li>
    </ul>
    <div class="alert tip" style="margin-top:12px;">
      <strong>💡 Next step</strong>
      <p>Once the HLD component boundaries are agreed, move to <a href="#" onclick="showPage('ref-lld',document.querySelector('[onclick*=ref-lld]'));return false;">🔍 Low-Level Design (LLD)</a> to define the classes, APIs, and schema inside each component — or see the <a href="#" onclick="showPage('ref-systemdesign',document.querySelector('[onclick*=ref-systemdesign]'));return false;">🏛️ System Design</a> page for more end-to-end worked examples.</p>
    </div>
  </div>
</div>
`;
