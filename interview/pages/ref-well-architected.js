window.Pages['ref-well-architected'] = `
<div class="page-header">
  <div class="breadcrumb">Architecture › <span>Azure Well-Architected Framework</span></div>
  <h1>⭐ Azure Well-Architected Framework</h1>
  <p>Five pillars used to review any workload's architecture — the most common "evaluate this design" framework in cloud interviews</p>
</div>

<div class="ref-section">
  <div class="ref-title">At A Glance</div>
  <div class="ref-body">
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">💰</div><div class="principle-name">Cost Optimization</div><p>Right-size, eliminate waste, match spend to business value</p></div>
      <div class="principle-card"><div class="principle-icon">✅</div><div class="principle-name">Operational Excellence</div><p>DevOps practices, observability, safe deployments</p></div>
      <div class="principle-card"><div class="principle-icon">⚡</div><div class="principle-name">Performance Efficiency</div><p>Scale to meet demand, right compute/storage tier</p></div>
      <div class="principle-card"><div class="principle-icon">🛡️</div><div class="principle-name">Reliability</div><p>Recover from failures, meet availability/DR targets</p></div>
      <div class="principle-card"><div class="principle-icon">🔐</div><div class="principle-name">Security</div><p>Protect data, identity, and the network, Zero Trust</p></div>
    </div>
    <div class="tip-box">✅ The 5 pillars ALWAYS trade off against each other — the skill being tested is naming the trade-off, not reciting the list.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Pillar Detail &amp; Azure Tooling</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header"><div>Pillar</div><div>Key Question</div><div>Azure Levers</div></div>
      <div class="dt-row"><div class="dt-name">Reliability</div><div>Does it recover from failure &amp; meet SLA?</div><div>Availability Zones, Traffic Manager/Front Door, auto-failover, backup/restore, chaos testing</div></div>
      <div class="dt-row"><div class="dt-name">Security</div><div>Is data/identity protected end-to-end?</div><div>Entra ID, Key Vault, Private Endpoints, NSGs, Defender for Cloud, Zero Trust</div></div>
      <div class="dt-row"><div class="dt-name">Cost Optimization</div><div>Is spend matched to actual value?</div><div>Reserved Instances/Savings Plans, autoscaling to zero, right-sizing, Cost Management alerts</div></div>
      <div class="dt-row"><div class="dt-name">Operational Excellence</div><div>Can we deploy, monitor, and fix safely?</div><div>IaC (Bicep/Terraform), CI/CD gates, blue-green/canary, App Insights, runbooks</div></div>
      <div class="dt-row"><div class="dt-name">Performance Efficiency</div><div>Does it scale to meet demand?</div><div>Autoscale rules, CDN, caching (Redis), async processing, right compute SKU</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Worked Trade-off Example</div>
  <div class="ref-body">
    <div class="code-box">Requirement: "Reduce cost by 30%" (Cost Optimization)
                        │
                        ▼
Naive fix: scale down to minimum replicas
                        │
                        ▼
Consequence: Reliability pillar takes the hit —
             fewer replicas = slower failover, lower
             headroom for traffic spikes, longer
             recovery time during a zone outage.

Balanced answer:
  • Autoscale aggressively DOWN during low-traffic windows
    (cost win) but keep a minimum of 2 replicas across
    2 availability zones at all times (reliability floor)
  • Use Reserved Instances for the baseline, autoscale
    with pay-as-you-go only for bursts
  • Add budget alerts (Operational Excellence) instead of
    a hard cap that could silently degrade Performance</div>
    <div class="tip-box">✅ Interview line: "I don't optimize one pillar in isolation — every Well-Architected review I run for a workload, I explicitly state which pillar I'm trading against and by how much, so the business makes that trade-off consciously instead of it happening as a side effect."</div>
    <div class="warn-box">⚠️ Common trap: treating this as a checklist to recite rather than a review tool. The strong answer always names a SPECIFIC workload decision and which pillar(s) it helps or hurts — e.g. "moving from AKS to Container Apps improves Operational Excellence (less to manage) but may reduce fine-grained control relevant to Performance Efficiency at very high scale."</div>
  </div>
</div>
`;
