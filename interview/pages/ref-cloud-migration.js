window.Pages['ref-cloud-migration'] = `
<div class="page-header">
  <div class="breadcrumb">Deep Dive › <span>Cloud Migration Strategy</span></div>
  <h1>☁️ Cloud Migration Strategy</h1>
  <p>7R Framework · AWS CAF · Azure Migration Factory · Strangler Fig · Hybrid Cloud · FinOps · DR</p>
</div>

<div class="ref-section">
  <div class="ref-title">Migration Strategy — The 7 R's</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Strategy</div><div>What It Means</div><div>Effort</div><div>Cloud Value</div><div>When To Use</div></div>
      <div class="pt-row"><div class="pt-name">Rehost (Lift &amp; Shift)</div><div>Move VM as-is to cloud VM. No code changes.</div><div>Low</div><div>Low</div><div>Speed over optimisation. Legacy apps. Tight deadline.</div></div>
      <div class="pt-row"><div class="pt-name">Replatform</div><div>Minor modernisation. VM → PaaS (App Service, Managed DB). Minimal code changes.</div><div>Medium</div><div>Medium</div><div>Get managed services, reduce ops overhead without full rewrite.</div></div>
      <div class="pt-row"><div class="pt-name">Repurchase</div><div>Drop legacy, buy SaaS. CRM → Salesforce. HR → Workday.</div><div>Medium</div><div>Medium</div><div>Commodity capabilities not worth maintaining internally.</div></div>
      <div class="pt-row"><div class="pt-name">Refactor / Re-architect</div><div>Redesign for cloud-native. Monolith → microservices. VMs → containers/AKS.</div><div>High</div><div class="dt-yes">Highest</div><div>Long-term agility. Independent scaling/deploy. Core business systems.</div></div>
      <div class="pt-row"><div class="pt-name">Relocate</div><div>Move without OS changes. VMware → Azure VMware Solution. Fast bulk migration.</div><div>Very Low</div><div>Low</div><div>VMware estates. Datacentre exit under time pressure.</div></div>
      <div class="pt-row"><div class="pt-name">Retire</div><div>Decommission. App is no longer needed or duplicated.</div><div>None</div><div class="dt-yes">Cost saving</div><div>15–20% of estates are typically unused or redundant.</div></div>
      <div class="pt-row"><div class="pt-name">Retain</div><div>Keep on-premises. Not ready, compliance, too risky, or recently refreshed.</div><div>None</div><div>None</div><div>Mainframes, HIPAA air-gap, recently upgraded hardware.</div></div>
    </div>
    <div class="tip-box">✅ Real mix for a 100-app estate: ~30% Rehost, 25% Replatform, 20% Retire, 15% Repurchase, 10% Refactor. Start with Retire — easiest cost saving with zero migration effort.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Migration Framework — AWS CAF &amp; Azure Cloud Adoption Framework</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Azure Cloud Adoption Framework (CAF)</div>
        <div class="code-box">STRATEGY
  Define motivation: cost savings, scale, resilience.
  Identify business outcomes: measurable KPIs.

PLAN
  Digital estate assessment (Azure Migrate).
  Skills readiness (who needs training?).
  Adoption plan: waves, timelines, owners.

READY
  Azure Landing Zone — the foundation:
    Management Groups, Subscriptions, Policies
    Hub-Spoke networking (ExpressRoute, VPN)
    Identity (Azure AD, RBAC)
    Security baseline (Defender for Cloud)
    Monitoring (Log Analytics, Azure Monitor)

MIGRATE
  Assess → Replicate → Cutover → Optimise.
  Azure Migrate: discovery, assessment, replication.

INNOVATE
  Build cloud-native apps on top of migrated infra.
  AI/ML: Azure OpenAI, Cognitive Services.

GOVERN &amp; MANAGE
  Azure Policy, Cost Management, Defender.
  Ongoing compliance, security, cost control.</div>
      </div>
      <div>
        <div class="ans-label">AWS Cloud Adoption Framework (CAF)</div>
        <div class="code-box">Six Perspectives:

Business: align IT investment to business outcomes.
  KPIs, TCO analysis, business case for migration.

People: org change management.
  Training, new roles (Cloud CoE), culture shift.

Governance: risk management, compliance.
  Policies, licensing, configuration management.

Platform: cloud architecture design.
  Target architecture, landing zone, reference arch.

Security: access control, incident response.
  IAM, encryption, detective controls, IR plan.

Operations: monitoring, change management.
  SLAs, runbooks, incident management, DR plans.

Migration process (AWS MAP):
  Assess → Mobilise → Migrate &amp; Modernise</div>
        <div class="ans-label" style="margin-top:10px;">Azure Migrate — Tool Chain</div>
        <div class="code-box">Azure Migrate Hub:
  Discovery &amp; Assessment:
    Deploy appliance (lightweight VM) on-prem.
    Discovers: VMs, databases, web apps, dependencies.
    Assessment report: sizing, cost estimate, readiness.

  Server Migration:
    Agent-based or agentless replication.
    Test migration before cutover.
    Minimal downtime cutover (&lt;1 hour).

  Database Migration Service (DMS):
    Online migration: SQL Server → Azure SQL.
    Near-zero downtime (change data capture).

  App Service Migration Assistant:
    Assess ASP.NET apps for App Service compatibility.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Azure Landing Zone — Foundation Architecture</div>
  <div class="ref-body">
    <div class="code-box">Landing Zone: pre-configured, policy-enforced Azure environment.
  "Build the runway before the plane lands."

Management Group Hierarchy:
  Tenant Root
  └─ MG: Company
       ├─ MG: Platform
       │    ├─ Sub: Identity (Azure AD DS, DNS)
       │    ├─ Sub: Management (Log Analytics, Automation)
       │    └─ Sub: Connectivity (Hub VNet, ExpressRoute, Firewall)
       ├─ MG: Landing Zones
       │    ├─ MG: Corp (private, connected to hub)
       │    │    ├─ Sub: Production
       │    │    └─ Sub: Non-Production
       │    └─ MG: Online (public-facing apps)
       └─ MG: Sandbox (dev experimentation, loose policies)

Hub-Spoke Network Topology:
  Hub VNet: Azure Firewall, ExpressRoute GW, VPN GW, DNS, Bastion
  Spoke VNets: peered to Hub, isolated from each other
  ← All traffic flows through Hub Firewall (inspect + control)

Key Azure Policies enforced at Landing Zone:
  - Require tags (Environment, Owner, CostCenter)
  - Deny public IP on VMs
  - Require encryption at rest on storage
  - Only allowed regions (data sovereignty)
  - Require private endpoints for PaaS services
  - Deploy Log Analytics agent on all VMs</div>
    <div class="tip-box">✅ Landing Zone is NOT optional. Migrating without it = security gaps, uncontrolled costs, no governance. Spend 2 weeks on Landing Zone before migrating first workload.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Migration Wave Planning</div>
  <div class="ref-body">
    <div class="code-box">Wave Strategy — migrate in batches by risk and dependency:

WAVE 0 — Foundation (weeks 1-4)
  Not migrating apps yet. Setting up the runway.
  ✅ Azure Landing Zone (subscriptions, policies, networking)
  ✅ Azure AD integration / SSO
  ✅ ExpressRoute or VPN connectivity to on-prem
  ✅ Azure Migrate appliance deployed
  ✅ Monitoring and logging baseline

WAVE 1 — Pilot / Low Risk (weeks 5-10)
  Dev, test, DR environments. Low-criticality internal apps.
  Goal: build team confidence, test processes, tune tooling.
  ✅ Apply 6R classification to all apps in wave

WAVE 2 — Internal Business Apps (weeks 11-20)
  HR apps, finance tools, internal portals. Medium complexity.
  Some replatforming to App Service / Managed SQL.

WAVE 3 — Core Business Systems (months 6-12)
  Customer-facing apps, order systems, ERP, CRM.
  Heavy testing, data migration, cutover planning.
  Rollback plans for every app.

WAVE 4 — Decommission On-Prem (months 12-18)
  Validate all workloads stable in cloud.
  Cancel datacentre contracts.
  Decommission physical hardware.</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Dependency Mapping</div>
        <div class="code-box">Critical before waving: understand app dependencies.

Tools:
  Azure Migrate dependency analysis
  ServiceNow CMDB
  Manual interviews with app owners

Dependency types to capture:
  → DB: which database server/schema?
  → API: which services does it call?
  → Auth: which AD groups / identity provider?
  → Storage: shared file shares (NFS/SMB)?
  → Middleware: MQ, ESB, SFTP servers?
  → Batch jobs: scheduled tasks, SSIS packages?

Rule: never migrate an app before its dependencies.
  App A depends on App B and shared DB.
  Must migrate: shared DB → App B → App A (in order).</div>
      </div>
      <div>
        <div class="ans-label">Migration Cutover Plan</div>
        <div class="code-box">Per-application cutover runbook:

T-2 weeks: Final test migration in staging.
T-1 week:  Stakeholder sign-off. Change request raised.
T-3 days:  Final data sync / replication started.
T-1 day:   All-hands rehearsal. Rollback plan confirmed.

CUTOVER DAY:
  T-0:    Maintenance window starts. App taken offline.
  T+15m:  Final data sync/replication completed.
  T+20m:  DNS / LB cutover to cloud.
  T+30m:  Smoke tests pass. App online in cloud.
  T+60m:  Extended monitoring period.
  T+120m: Decision point — GO (decommission on-prem)
                           or NO-GO (rollback to on-prem).

Post-cutover:
  Monitor for 1 week before decommissioning on-prem.
  Keep on-prem as hot standby during hypercare period.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Strangler Fig Pattern — Monolith to Microservices</div>
  <div class="ref-body">
    <div class="code-box">Strangler Fig: migrate a monolith incrementally — never a big-bang rewrite.
Named after a fig tree that gradually envelops and replaces its host.

How it works:
  1. New functionality → always build as microservice (not in monolith).
  2. Identify bounded context to extract (e.g. "User Profile").
  3. Build new microservice alongside monolith.
  4. Use API Gateway / Facade to route:
       /users/* → new UserService
       everything else → monolith
  5. Test new service. Migrate data to its own DB.
  6. Decommission that module from monolith.
  7. Repeat for next module.

Internet
    ↓
API Gateway (Azure APIM / NGINX)
    ├─ /users/*     → UserService (new microservice)
    ├─ /orders/*    → OrderService (new microservice)
    └─ /*           → Monolith (shrinking over time)

Anti-pattern — Big Bang Rewrite:
  ❌ Rewrite entire monolith from scratch in 18 months.
  ❌ 50% chance of failure. Business keeps changing requirements.
  ❌ Two years of parallel maintenance: monolith + new system.
  ✅ Strangler Fig: deliver value continuously, risk contained.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Hybrid Cloud &amp; Multi-Cloud</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Hybrid Cloud Architecture</div>
        <div class="code-box">Hybrid: some workloads on-prem, some in cloud.
  Connected via: ExpressRoute (private, dedicated)
                 or VPN Gateway (encrypted over internet)

Reasons to stay hybrid:
  ✅ Compliance: data must remain on-prem (GDPR, data sovereignty)
  ✅ Latency: factory floor OT systems need sub-ms response
  ✅ Incremental migration — in-progress
  ✅ Legacy mainframe cannot move

Azure Arc: extend Azure management to on-prem / multi-cloud.
  Arc-enabled Servers: manage on-prem VMs as if Azure VMs.
    → Azure Policy, Defender, Monitor, Patch on on-prem servers.
  Arc-enabled Kubernetes: manage on-prem K8s from Azure.
    → Deploy apps via GitOps (Flux) to any cluster.
  Arc-enabled Data Services: run Azure SQL MI on-prem.</div>
      </div>
      <div>
        <div class="ans-label">Multi-Cloud Strategy</div>
        <div class="code-box">Multi-Cloud: workloads spread across Azure + AWS + GCP.

Reasons:
  ✅ Avoid vendor lock-in
  ✅ Best-of-breed services (GCP ML, AWS IoT, Azure AD)
  ✅ Geographic coverage (some regions only on one cloud)
  ✅ Regulatory: different clouds for different jurisdictions
  ✅ M&amp;A: acquired company uses different cloud

Challenges:
  ❌ Complexity doubles: 2 networking models, 2 IAM systems
  ❌ Cost visibility across clouds
  ❌ Staff need expertise in multiple platforms
  ❌ Data egress costs between clouds

Tools for multi-cloud:
  Terraform: provision infra on any cloud (same tooling)
  Kubernetes: run workloads on any cloud (AKS/EKS/GKE)
  HashiCorp Vault: secrets management across clouds
  Datadog / Dynatrace: observability across clouds

Recommendation: Azure-primary + strategic AWS/GCP for specific services.
  Not "lift everything to 3 clouds" — that's complexity, not resilience.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Migration Risk Management &amp; Common Pitfalls</div>
  <div class="ref-body">
    <div class="code-box">Top Migration Failure Modes:

1. No Landing Zone first
   Symptom: 50 subscriptions with no governance, costs spiral, security gaps.
   Fix: Mandatory Landing Zone before wave 1.

2. Migrating without dependency mapping
   Symptom: App migrated, breaks because it calls on-prem DB still.
   Fix: Discover ALL dependencies before classifying any app.

3. Lift-and-shift everything
   Symptom: Cloud costs 3× on-prem. No elasticity. No PaaS benefits.
   Fix: Apply 6Rs properly. Replatform and retire aggressively.

4. Big-bang database migration
   Symptom: 48-hour maintenance window. Data loss risk. Rollback impossible.
   Fix: Azure DMS online migration. Test cutover in staging. Short maintenance window.

5. Ignoring licensing
   Symptom: SQL Server licences doubled — Azure + on-prem during parallel run.
   Fix: Azure Hybrid Benefit (reuse existing BYOL licences on Azure VMs).
        Reserved Instances for predictable workloads (40-70% savings).

6. No performance testing in cloud
   Symptom: App works in on-prem but latency triples in cloud.
   Fix: Performance test in cloud with production-equivalent load before cutover.

7. Team not trained
   Symptom: No one knows how to troubleshoot AKS at 2am.
   Fix: Cloud CoE. Training 6 weeks before migration starts.</div>
    <div class="tip-box">✅ Migration is a business programme, not just a technical project. Needs: executive sponsor, business owner per wave, dedicated migration team, change management plan, communication cadence.</div>
  </div>
</div>
`;
