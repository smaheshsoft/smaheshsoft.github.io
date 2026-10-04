window.Pages['ref-togaf'] = `
<div class="page-header">
  <div class="breadcrumb">Architecture › <span>TOGAF &amp; Enterprise Architecture</span></div>
  <h1>🗺️ TOGAF &amp; Enterprise Architecture</h1>
  <p>The ADM cycle — how enterprise architecture frames the same stages from a portfolio, not a single-project, view</p>
</div>

<div class="ref-section">
  <div class="ref-title">At A Glance</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step">Preliminary &amp; Vision</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step">Business / Data / App / Tech Architecture</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step blue">Opportunities &amp; Migration Planning</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step">Implementation Governance</div>
    </div>
    <div class="tip-box">✅ TOGAF's ADM (Architecture Development Method) is a cycle, not a line — "Requirements Management" sits in the center and feeds every phase, and the cycle repeats as the enterprise evolves.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">ADM Phases</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header"><div>Phase</div><div>Produces</div><div>Maps To (project-level equivalent)</div></div>
      <div class="dt-row"><div class="dt-name">Preliminary</div><div>Architecture principles, governance framework</div><div>Org-wide architecture charter — sits above any single BRD</div></div>
      <div class="dt-row"><div class="dt-name">A — Architecture Vision</div><div>Scope, stakeholders, business case</div><div>Business Discovery / Business Case</div></div>
      <div class="dt-row"><div class="dt-name">B — Business Architecture</div><div>Business process &amp; capability models</div><div>BRD</div></div>
      <div class="dt-row"><div class="dt-name">C — Information Systems Architecture</div><div>Data &amp; application architecture</div><div>FRD + Data Architecture</div></div>
      <div class="dt-row"><div class="dt-name">D — Technology Architecture</div><div>Infrastructure, platform choices</div><div>Solution Architecture (SAD) / HLD</div></div>
      <div class="dt-row"><div class="dt-name">E — Opportunities &amp; Solutions</div><div>Implementation projects, work packages</div><div>Project backlog / roadmap</div></div>
      <div class="dt-row"><div class="dt-name">F — Migration Planning</div><div>Sequenced roadmap, dependencies</div><div>Phased delivery plan (e.g. strangler-fig sequencing)</div></div>
      <div class="dt-row"><div class="dt-name">G — Implementation Governance</div><div>Compliance checks during build</div><div>Architecture Review Board / ADR enforcement</div></div>
      <div class="dt-row"><div class="dt-name">H — Architecture Change Management</div><div>Triggers for re-entering the cycle</div><div>Continuous Improvement / tech-debt register</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">TOGAF vs The Project-Level SDLC</div>
  <div class="ref-body">
    <div class="code-box">TOGAF operates ABOVE individual projects:

  Enterprise Architecture (TOGAF ADM)
        │  sets principles, target-state models,
        │  technology standards, governance
        ▼
  Project 1 SAD/HLD/LLD    Project 2 SAD/HLD/LLD    Project 3 ...
  (must align with the enterprise target-state architecture)

A Solution Architect works WITHIN one project's SAD→HLD→LLD.
A Lead/Principal/Enterprise Architect also works in TOGAF's layer —
ensuring every project's SAD stays consistent with the enterprise
target-state model, instead of each team independently reinventing
technology choices.</div>
    <div class="tip-box">✅ Interview line: "My day-to-day lives in Solution Architecture through LLD, but I frame every solution decision against the enterprise target-state — same principle as TOGAF's Preliminary phase — so it doesn't create divergence the next TOGAF Architecture Vision cycle has to reconcile."</div>
    <div class="warn-box">⚠️ Common trap: reciting all 9+ ADM phases by name without being able to map even one back to a concrete artifact (BRD/SAD/HLD) the candidate has actually produced. Interviewers test whether TOGAF is memorized trivia or something that changed how you actually governed a real project.</div>
  </div>
</div>
`;
