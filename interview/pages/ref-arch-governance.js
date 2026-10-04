window.Pages['ref-arch-governance'] = `
<div class="page-header">
  <div class="breadcrumb">Architecture › <span>Architecture Governance</span></div>
  <h1>🏛️ Architecture Governance</h1>
  <p>How a Lead/Principal Architect ensures solutions stay aligned with enterprise standards — after they ship</p>
</div>

<div class="ref-section">
  <div class="ref-title">At A Glance</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step">Proposal</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step">Architecture Review Board</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step blue">Approved / Exception / Rejected</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step">Compliance Tracking</div>
    </div>
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">📋</div><div class="principle-name">ADR Review</div><p>Every significant decision is reviewed, not just documented</p></div>
      <div class="principle-card"><div class="principle-icon">🛡️</div><div class="principle-name">Security &amp; Standards</div><p>Checked against org security baseline and tech radar</p></div>
      <div class="principle-card"><div class="principle-icon">⚠️</div><div class="principle-name">Risk Register</div><p>Known risks tracked with owners, not forgotten</p></div>
      <div class="principle-card"><div class="principle-icon">📝</div><div class="principle-name">Exception / Waiver</div><p>Deliberate, time-boxed deviation — not silent drift</p></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Governance Question The Board Asks</div>
  <div class="ref-body">
    <div class="code-box">"Does the proposed solution comply with enterprise architecture,
 security, technology and regulatory standards?"

If NO and there's a good reason → Exception/Waiver document
  (time-boxed, owner assigned, remediation plan required)
If NO and there's no good reason → Rejected, redesign required
If YES → Approved, ADR filed, tech radar updated if new tech</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Why This Is The Lead/Principal-Level Differentiator</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header"><div>Scope</div><div>Solution Architect</div><div>Lead / Principal Architect</div></div>
      <div class="dt-row"><div class="dt-name">Primary focus</div><div>One solution, one SAD/HLD</div><div>Multiple solutions, consistency across teams</div></div>
      <div class="dt-row"><div class="dt-name">Governance role</div><div>Submits to the board</div><div class="dt-yes">Sits on / chairs the board</div></div>
      <div class="dt-row"><div class="dt-name">Standards</div><div>Follows existing standards</div><div class="dt-yes">Sets/evolves the standards (tech radar, security baseline)</div></div>
      <div class="dt-row"><div class="dt-name">Risk ownership</div><div>Risks within own project</div><div class="dt-yes">Organization-wide risk register &amp; technical debt strategy</div></div>
      <div class="dt-row"><div class="dt-name">Cost ownership</div><div>Cost estimate for own solution</div><div class="dt-yes">FinOps / cost optimization across the portfolio</div></div>
    </div>
    <div class="warn-box">⚠️ This is directly relevant to real feedback I received: an interview loop assessed me as eligible for Solution Architect scope but not yet demonstrating Lead Architect scope. The gap this table makes visible — governance ownership, cross-team standards, portfolio-level risk/cost — is exactly the kind of evidence a Lead-level loop tests for, beyond "can you design one good HLD."</div>
    <div class="tip-box">✅ Interview answer pattern: pair every design decision with how it would be governed at scale — "beyond this one service, I'd also update the tech radar / file an ADR / flag this pattern to the architecture board so other teams don't reinvent it differently."</div>
  </div>
</div>
`;
