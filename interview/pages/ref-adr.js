window.Pages['ref-adr'] = `
<div class="page-header">
  <div class="breadcrumb">Architecture › <span>Architecture Decision Records (ADR)</span></div>
  <h1>📝 Architecture Decision Records (ADR)</h1>
  <p>How to record a decision so "why did we choose this?" never goes unanswered six months later</p>
</div>

<div class="ref-section">
  <div class="ref-title">At A Glance</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step">Context</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step">Alternatives</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step blue">Decision</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step">Consequences</div>
    </div>
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">📄</div><div class="principle-name">ADR = Decision Rationale</div><p>Why we chose X, not how X is structured</p></div>
      <div class="principle-card"><div class="principle-icon">📐</div><div class="principle-name">HLD = Architecture Structure</div><p>What the system looks like, not why</p></div>
      <div class="principle-card"><div class="principle-icon">🗂️</div><div class="principle-name">Immutable record</div><p>Superseded, not edited — history stays intact</p></div>
      <div class="principle-card"><div class="principle-icon">⚖️</div><div class="principle-name">Not every decision</div><p>Only ones affecting cost, scale, security, direction</p></div>
    </div>
    <div class="tip-box">✅ One-line distinction for interviews: "HLD explains how the system is designed. An ADR explains why we designed it that way instead of the alternatives."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Worked Example — AKS vs Container Apps</div>
  <div class="ref-body">
    <div class="code-box">ADR-001: Choose Azure Kubernetes Service (AKS)
Status: Accepted            Date: 2026-10-04

Context:
  Migrating ~20 Azure Functions to containerized worker
  services. Workload: ~4,000 events/sec, needs horizontal
  scaling.

Decision:
  Use AKS with KEDA for event-driven autoscaling.

Alternatives Considered:
  1. Azure Container Apps
  2. Azure Functions (status quo)
  3. AKS                    ← chosen
  4. Azure VM Scale Sets

Decision Drivers:
  - High event throughput
  - Existing organizational AKS expertise
  - Fine-grained scaling control
  - Observability requirements
  - Long-term platform strategy (reusable for future services)

Consequences:
  + Better control over workloads, KEDA-based scaling
  + Reusable Kubernetes platform for future microservices
  - Higher operational complexity, requires K8s expertise
  - Cluster management overhead, higher baseline cost

Risks:        Over-provisioning, operational complexity
Mitigation:    Autoscaling, resource requests/limits,
               utilization monitoring, platform governance</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">ADR vs HLD — Don't Conflate Them</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header"><div>Aspect</div><div>HLD</div><div>ADR</div></div>
      <div class="dt-row"><div class="dt-name">Question answered</div><div>How is the system designed?</div><div>Why did we design it this way?</div></div>
      <div class="dt-row"><div class="dt-name">Content</div><div>Diagrams, components, data flow, scaling, DR</div><div>Context, alternatives, decision drivers, consequences</div></div>
      <div class="dt-row"><div class="dt-name">Lifespan</div><div>Updated as the design evolves</div><div>Immutable — a new ADR supersedes an old one</div></div>
      <div class="dt-row"><div class="dt-name">Audience</div><div>Engineers implementing the system</div><div>Future architects/engineers asking "why not X?"</div></div>
      <div class="dt-row"><div class="dt-name">Example</div><div>Users → Front Door → APIM → AKS → Service Bus → SQL</div><div>"Why AKS instead of Container Apps?"</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">What Deserves An ADR</div>
  <div class="ref-body">
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">💰</div><div class="principle-name">Cost impact</div><p>Choosing a managed service with meaningfully different pricing</p></div>
      <div class="principle-card"><div class="principle-icon">📈</div><div class="principle-name">Scalability impact</div><p>A choice that caps or unlocks future throughput</p></div>
      <div class="principle-card"><div class="principle-icon">🔐</div><div class="principle-name">Security impact</div><p>Auth model, encryption approach, network boundary</p></div>
      <div class="principle-card"><div class="principle-icon">🧭</div><div class="principle-name">Technology direction</div><p>A choice other teams will be expected to follow</p></div>
    </div>
    <div class="warn-box">⚠️ Not every decision needs an ADR — picking a variable name or a minor library doesn't. Over-documenting trivial choices buries the significant ones and nobody reads the log anymore. The test: "will someone reasonably ask 'why?' about this in 6 months, and would the answer require institutional memory that might be lost?" If yes, write the ADR.</div>
    <div class="tip-box">✅ Interview line: "I treat ADRs as the team's long-term memory for irreversible or expensive-to-reverse decisions — anything a new architect joining in a year would otherwise have to reverse-engineer from Slack history or guesswork."</div>
  </div>
</div>
`;
