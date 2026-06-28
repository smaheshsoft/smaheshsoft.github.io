window.Pages['ref-migration'] = `
<div class="page-header">
  <div class="breadcrumb">Architect Reference › <span>Cloud Migration</span></div>
  <h1>☁️ Cloud Migration Strategy</h1>
  <p>6R Framework · Assessment · Monolith to Microservices · VM to Containers · Cost Optimisation · Azure Landing Zone</p>
</div>

<div class="ref-section">
  <div class="ref-title">Migration Framework — The 6 R's</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Strategy</div><div>What it Means</div><div>Effort</div><div>Value</div><div>Best For</div></div>
      <div class="pt-row"><div class="pt-name">Rehost (Lift &amp; Shift)</div><div>Move VM as-is to cloud VM (Azure VM)</div><div>Low</div><div>Low</div><div>Fast migration, legacy apps, tight deadline</div></div>
      <div class="pt-row"><div class="pt-name">Replatform</div><div>Minor optimisation — VM → App Service, DB → Managed DB</div><div>Medium</div><div>Medium</div><div>Get cloud benefits without full rewrite</div></div>
      <div class="pt-row"><div class="pt-name">Refactor / Re-architect</div><div>Redesign for cloud-native — monolith → microservices, containers</div><div>High</div><div class="dt-yes">Highest</div><div>Long-term agility, scale, independent deploy</div></div>
      <div class="pt-row"><div class="pt-name">Repurchase</div><div>Replace with SaaS product (e.g. Salesforce, ServiceNow)</div><div>Medium</div><div>Medium</div><div>Commodity software not core to business</div></div>
      <div class="pt-row"><div class="pt-name">Retire</div><div>Decommission — app no longer needed</div><div>None</div><div class="dt-yes">Reduces cost</div><div>Unused/redundant systems</div></div>
      <div class="pt-row"><div class="pt-name">Retain</div><div>Keep on-premises — not ready or not worth migrating</div><div>None</div><div>None</div><div>Compliance, too risky, recently upgraded</div></div>
    </div>
    <div class="tip-box" style="margin-top:12px;">✅ Architect Answer: "Not all 50 VMs need to become 50 cloud VMs. First assess, then apply the right R for each workload — many can become App Service, AKS, or Azure Functions."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Migration Assessment — What to Do Before Moving Anything</div>
  <div class="ref-body">
    <div class="code-box">Step 1: DISCOVER
  Inventory all applications, servers, databases, dependencies.
  Tool: Azure Migrate, AWS Application Discovery Service

Step 2: ASSESS
  For each workload answer:
  - What does it do? (business capability)
  - Who depends on it? (dependency map)
  - What DB does it use? (schema complexity)
  - What are the performance/SLA requirements?
  - Any compliance constraints? (HIPAA, GDPR, PCI)
  - When was it last changed? (is it actively maintained?)

Step 3: CLASSIFY (apply 6R)
  Critical business apps  → Refactor (microservices + AKS)
  Standard web apps       → Replatform (App Service)
  Legacy line-of-business → Rehost (Azure VM)
  Commodity tools         → Repurchase (SaaS)
  Unused apps             → Retire

Step 4: PLAN WAVES
  Wave 1: Low-risk, low-dependency apps (dev/test environments)
  Wave 2: Internal apps, moderate complexity
  Wave 3: Core business systems, high complexity
  Wave 4: Last — most critical, highest risk

Step 5: EXECUTE + VALIDATE
  Migrate → Test → Cutover → Decommission on-prem</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">50 VMs → Cloud — Practical Decision</div>
  <div class="ref-body">
    <div class="code-box">50 On-Prem VMs — typical breakdown:

VM Type                → Cloud Target           Strategy
──────────────────────────────────────────────────────────
Web/API servers   (15) → Azure App Service       Replatform
Background jobs   (10) → Azure Functions         Replatform
Application VMs   (12) → AKS (containers)        Refactor
Database VMs       (8) → Azure SQL / PostgreSQL  Replatform
File servers       (3) → Azure Blob Storage      Replatform
Dev/Test VMs       (2) → Retire (use cloud-native dev) Retire

Result: 0 cloud VMs needed in most cases.
        Reduced infra footprint, lower management overhead,
        pay-per-use instead of reserved capacity.</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Why NOT recreate all as Azure VMs</div>
        <ul>
          <li>VMs still need OS patching, updates, monitoring</li>
          <li>No auto-scaling built in</li>
          <li>You manage availability zones manually</li>
          <li>No serverless cost model</li>
          <li>Miss all cloud-native benefits</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">PaaS Benefits vs VM</div>
        <div class="code-box">App Service vs VM:
  ✅ Auto-scale built in
  ✅ Managed OS patching
  ✅ Deployment slots (blue-green)
  ✅ Built-in SSL/TLS
  ✅ 99.95% SLA

AKS vs VM per app:
  ✅ Bin packing (run 50 apps on 5 nodes)
  ✅ Kubernetes orchestration
  ✅ HPA + KEDA auto-scale
  ✅ Consistent deployments via Helm</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Monolith → Microservices Migration — Strangler Fig Pattern</div>
  <div class="ref-body">
    <div class="code-box">Principle: Never big-bang rewrite. Strangle the monolith incrementally.

Phase 1: Add API Gateway in front of monolith (no changes to monolith)
  Client → API Gateway → Monolith (everything still works)

Phase 2: Extract first microservice (least coupled domain)
  Choose: high traffic module OR frequently changed module
  Client → API Gateway → Route /payments → Payment Microservice
                       → Route /rest     → Monolith (unchanged)

Phase 3: Extract next service, repeat
  Client → API Gateway → /payments → Payment Service
                       → /orders   → Order Service (new)
                       → /rest     → Monolith (shrinking)

Phase N: Monolith is empty → decommission
  Client → API Gateway → all routes → Microservices</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Which Module to Extract First</div>
        <ul>
          <li>Highest traffic (most scaling benefit)</li>
          <li>Most frequently changed (most deployment benefit)</li>
          <li>Least coupled to other modules (easiest)</li>
          <li>Clear domain boundary (natural seam)</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Key Enablers</div>
        <ul>
          <li>API Gateway — route traffic without client changes</li>
          <li>Feature flags — control rollout per tenant/user</li>
          <li>Dual writes during transition — write to both old and new DB</li>
          <li>Event-driven sync — Kafka to keep DBs in sync during cutover</li>
          <li>Contract testing — ensure APIs are backward compatible</li>
        </ul>
      </div>
    </div>
    <div class="warn-box" style="margin-top:12px;">⚠️ Do NOT split monolith too early. Ensure domain boundaries are well understood first — wrong splits create distributed monolith (worst of both worlds).</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Azure Landing Zone — Production-Ready Cloud Foundation</div>
  <div class="ref-body">
    <div class="code-box">Azure Landing Zone = pre-configured, governed, secure Azure environment.

Structure:
Management Group
└── Root (company)
    ├── Platform (shared services)
    │   ├── Identity Subscription    (Azure AD, Key Vault)
    │   ├── Connectivity Subscription (Hub VNet, Firewall, VPN/ExpressRoute)
    │   └── Management Subscription  (Monitor, Defender, Log Analytics)
    └── Workloads
        ├── Production Subscription
        │   ├── AKS Resource Group
        │   ├── Database Resource Group
        │   └── Network Resource Group
        ├── Non-Production Subscription
        └── Sandbox Subscription</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Hub-Spoke Networking</div>
        <div class="code-box">Hub VNet (shared)
  ├── Azure Firewall
  ├── VPN / ExpressRoute Gateway
  └── Bastion (secure VM access)

Spoke VNet — Production
  ├── AKS Subnet
  ├── Database Subnet
  └── Private Endpoints Subnet

Spoke VNet — Non-Prod
  └── Dev/Test resources

VNet Peering: Hub ↔ each Spoke
All traffic routed through Hub Firewall</div>
      </div>
      <div>
        <div class="ans-label">Governance — Azure Policy</div>
        <div class="code-box">Policies enforced automatically:
  ✅ All storage must have encryption
  ✅ Public access disabled on all storage
  ✅ All resources must have tags
  ✅ Only approved VM SKUs allowed
  ✅ Logs must be sent to Log Analytics
  ✅ Key Vault soft delete must be enabled
  ✅ No public IPs except in DMZ subnet

Non-compliant resources:
  → Flagged in Defender for Cloud
  → Denied if using Deny policy</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Cost Optimisation — Cloud Architecture Decisions</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Technique</div><div>How</div><div>Typical Saving</div></div>
      <div class="pt-row"><div class="pt-name">Right-sizing</div><div>Use Azure Advisor recommendations. Downsize over-provisioned VMs.</div><div>20–40%</div></div>
      <div class="pt-row"><div class="pt-name">Reserved Instances</div><div>Commit to 1–3 year for predictable workloads.</div><div>40–72%</div></div>
      <div class="pt-row"><div class="pt-name">Spot/Preemptible Nodes</div><div>AKS spot node pool for non-critical batch jobs. Can be evicted.</div><div>60–90%</div></div>
      <div class="pt-row"><div class="pt-name">Scale to Zero</div><div>KEDA scales pods to 0 when idle. Azure Functions — pay per execution.</div><div>High for bursty workloads</div></div>
      <div class="pt-row"><div class="pt-name">PaaS over IaaS</div><div>App Service vs VM — managed service, no idle OS costs.</div><div>30–50%</div></div>
      <div class="pt-row"><div class="pt-name">Storage Tiers</div><div>Move old data to Cool/Archive tier. Hot→Cool→Archive.</div><div>Up to 90% on storage</div></div>
      <div class="pt-row"><div class="pt-name">Dev/Test Scheduling</div><div>Auto-shutdown non-prod AKS node pools at night/weekends.</div><div>60% on dev environments</div></div>
    </div>
    <div class="tip-box" style="margin-top:12px;">✅ Architect Rule: Cost is a design decision, not an afterthought. Always present HA vs Cost trade-offs — replicas cost money, downtime costs more.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Interview Summary — Architect-Level Answer</div>
  <div class="ref-body">
    <div class="code-box">Q: We have 50 on-prem VMs. How do you migrate them to Azure?

A: I would NOT simply lift-and-shift all 50 as Azure VMs.
   That would replicate on-prem problems in the cloud without
   gaining cloud-native benefits.

   My approach:

   Step 1 — Assess (2–4 weeks)
   Use Azure Migrate to discover all VMs, dependencies, and traffic.
   Classify each workload using the 6R framework.

   Step 2 — Target architecture
   Web/API VMs    → Azure App Service (managed, auto-scale, no OS patching)
   Background jobs→ Azure Functions (serverless, pay-per-execution)
   App VMs        → AKS with containers (orchestrated, scalable, consistent)
   Databases      → Azure SQL / PostgreSQL Managed (HA built-in, backups)
   File servers   → Azure Blob Storage (cheap, durable, redundant)
   Old unused apps→ Retire (reduces cost immediately)

   Step 3 — Migrate in waves (low-risk first, critical last)
   Each wave: Migrate → Test → Cutover → Decommission on-prem VM.

   Step 4 — Govern from day one
   Azure Landing Zone for networking, security policies, cost controls.
   Azure Policy to enforce encryption, tagging, no public access.

   Result: Typically 0 cloud VMs needed. Lower cost, higher availability,
   full auto-scale, and significantly reduced operational overhead.</div>
  </div>
</div>
`;
