window.Pages['ref-devops'] = `
<div class="page-header">
  <div class="breadcrumb">Architect Reference › <span>CI/CD &amp; DevSecOps</span></div>
  <h1>🚀 CI/CD &amp; DevSecOps</h1>
  <p>Pipeline Design · Deployment Strategies · Security Gates · Terraform · Monitoring — complete architect reference</p>
</div>

<div class="ref-section">
  <div class="ref-title">DevOps vs DevSecOps — What Changed</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Traditional DevOps</div>
        <div class="code-box">Dev → Build → Test → Deploy
Security added AFTER release
(penetration test at end)

Problems:
  Vulnerabilities found late = expensive fix
  Security team is a bottleneck
  "Throw over the wall" mentality</div>
      </div>
      <div>
        <div class="ans-label">DevSecOps — Shift Left Security</div>
        <div class="code-box">Dev → [Sec] → Build → [Sec] → Test → [Sec] → Deploy
Security embedded at every stage

Benefits:
  Vulnerabilities found early = cheap fix
  Security as code — automated, not manual
  Every developer owns security</div>
      </div>
    </div>
    <div class="tip-box" style="margin-top:12px;">✅ "Shift Left" = move security earlier in the pipeline. Cost to fix a bug: Dev=$1, QA=$10, Prod=$100.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Complete CI/CD Pipeline — Production Architecture</div>
  <div class="ref-body">
    <div class="ans-label">Continuous Integration (CI) — every commit</div>
    <div class="code-box">Developer Commit (feature branch)
         ↓
┌─────────────────────────────────────────────────┐
│                   CI Pipeline                    │
│                                                  │
│  1. Code Checkout                                │
│  2. Build  (dotnet build / npm build)            │
│  3. Unit Tests + Code Coverage (>80% gate)       │
│  4. SAST — SonarQube (code quality + bugs)       │
│  5. SAST — CodeQL (security vulnerabilities)     │
│  6. Dependency Scan — OWASP / Snyk               │
│     (known CVEs in NuGet/npm packages)           │
│  7. Docker Build (multi-stage, minimal image)    │
│  8. Container Scan — Trivy                       │
│     (OS vulnerabilities in image layers)         │
│  9. Push Image to ACR (tagged with commit SHA)   │
│ 10. Update Helm chart / K8s manifest             │
└─────────────────────────────────────────────────┘
         ↓ (only if all gates pass)</div>
    <div class="ans-label" style="margin-top:14px;">Continuous Deployment (CD) — gated environments</div>
    <div class="code-box">┌──────────────────────────────────────────────────────┐
│                   CD Pipeline                         │
│                                                       │
│  DEV environment                                      │
│    Deploy → Smoke Tests → Integration Tests           │
│         ↓ (auto on success)                           │
│  QA environment                                       │
│    Deploy → Full Regression → Performance Tests       │
│    DAST — OWASP ZAP (dynamic app security test)      │
│         ↓ (manual approval gate)                      │
│  STAGING environment                                  │
│    Deploy → UAT → Load Tests → Security Sign-off      │
│         ↓ (manual approval: manager + architect)      │
│  PRODUCTION                                           │
│    Canary Deploy (5% traffic)                         │
│    Monitor metrics 15 min                             │
│    Auto-rollback if error rate > 1%                   │
│    Gradually increase to 100% traffic                 │
└──────────────────────────────────────────────────────┘</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Security Gates — What Each Tool Checks</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Tool</div><div>Type</div><div>What it Finds</div><div>Gate</div></div>
      <div class="pt-row"><div class="pt-name">SonarQube</div><div>SAST — Static</div><div>Code smells, bugs, duplications, code coverage</div><div>Block on Critical/Blocker issues</div></div>
      <div class="pt-row"><div class="pt-name">CodeQL</div><div>SAST — Static</div><div>Security vulnerabilities in code (SQL injection, XSS, path traversal)</div><div>Block on any security finding</div></div>
      <div class="pt-row"><div class="pt-name">OWASP Dependency Check / Snyk</div><div>SCA — Composition</div><div>Known CVEs in third-party packages (NuGet, npm)</div><div>Block on High/Critical CVEs</div></div>
      <div class="pt-row"><div class="pt-name">Trivy</div><div>Container Scan</div><div>OS vulnerabilities in Docker image layers</div><div>Block on Critical CVEs</div></div>
      <div class="pt-row"><div class="pt-name">OWASP ZAP</div><div>DAST — Dynamic</div><div>Runtime vulnerabilities: XSS, CSRF, injection</div><div>Block on High findings</div></div>
      <div class="pt-row"><div class="pt-name">Checkov / tfsec</div><div>IaC Scan</div><div>Terraform misconfigurations (open ports, no encryption, public access)</div><div>Block on High severity</div></div>
      <div class="pt-row"><div class="pt-name">Azure Defender</div><div>Runtime</div><div>Anomalous access, malware, threat detection in production</div><div>Alert + auto-response</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Deployment Strategies — When to Use Each</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Strategy</div><div>How it Works</div><div>Downtime</div><div>Rollback Speed</div><div>Cost</div></div>
      <div class="pt-row"><div class="pt-name">Recreate</div><div>Stop all v1 pods → start v2</div><div class="dt-no">Yes</div><div>Slow (redeploy v1)</div><div>Low</div></div>
      <div class="pt-row"><div class="pt-name">Rolling Update</div><div>Replace pods one by one (v1→v2 gradually)</div><div class="dt-yes">None</div><div>Medium</div><div>Low</div></div>
      <div class="pt-row"><div class="pt-name">Blue-Green</div><div>Two full environments. Switch LB from Blue(v1)→Green(v2)</div><div class="dt-yes">None</div><div class="dt-yes">Instant (flip back)</div><div>2x infra cost</div></div>
      <div class="pt-row"><div class="pt-name">Canary</div><div>Route 5%→10%→50%→100% traffic to v2 gradually</div><div class="dt-yes">None</div><div class="dt-yes">Instant (reroute)</div><div>Low extra</div></div>
      <div class="pt-row"><div class="pt-name">A/B Testing</div><div>Route specific users (by header/cookie) to v2</div><div class="dt-yes">None</div><div class="dt-yes">Instant</div><div>Low extra</div></div>
    </div>
    <div class="ans-label" style="margin-top:14px;">Canary Deployment Flow in AKS</div>
    <div class="code-box">Step 1: Deploy v2 with 1 pod (v1 has 9 pods)
        → 10% traffic to v2, 90% to v1

Step 2: Monitor for 15 minutes:
        - Error rate < 0.1%?
        - P99 latency < 500ms?
        - No anomalies in App Insights?

Step 3: If healthy → scale v2 to 5 pods (50/50)
        If unhealthy → delete v2, all traffic back to v1

Step 4: Continue to 100% v2 → decommission v1

Tools: Argo Rollouts, Flagger, Azure DevOps progressive delivery</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Terraform — Infrastructure as Code Best Practices</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Pipeline Steps</div>
        <div class="code-box">terraform init
  → initialise backend + download providers

terraform validate
  → check HCL syntax

terraform fmt --check
  → enforce formatting

checkov / tfsec
  → security scan on .tf files

terraform plan -out=tfplan
  → show what will change (save plan)

Manual Approval Gate
  → architect reviews the plan

terraform apply tfplan
  → execute the saved plan only</div>
      </div>
      <div>
        <div class="ans-label">Remote State — Azure Backend</div>
        <div class="code-box">terraform {
  backend "azurerm" {
    resource_group_name  = "rg-tfstate"
    storage_account_name = "tfstatestorage"
    container_name       = "tfstate"
    key                  = "prod.terraform.tfstate"
  }
}

Benefits:
  Shared state across team
  State locking (prevents concurrent apply)
  Versioning and backup
  Secure (RBAC on storage account)</div>
        <div class="warn-box" style="margin-top:8px;">⚠️ State file contains sensitive data. Enable encryption + restrict RBAC on storage account.</div>
      </div>
    </div>
    <div class="ans-label" style="margin-top:14px;">What Happens if Terraform State is Lost</div>
    <div class="code-box">Terraform uses state as its source of truth.
Without state file, Terraform doesn't know what it already created.

Next "terraform apply" →
  Thinks all resources are new
  Tries to create AKS cluster that already exists
  Gets "resource already exists" error
  OR creates duplicates (if names are dynamic)

Recovery options:
  1. Restore from blob versioning / backup
  2. "terraform import" — manually re-import each resource into state
     e.g. terraform import azurerm_resource_group.main /subscriptions/.../rg-prod</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Monitoring &amp; Observability — Production Setup</div>
  <div class="ref-body">
    <div class="three-col">
      <div>
        <div class="ans-label">Metrics</div>
        <div class="code-box">Prometheus
  scrapes /metrics endpoint
  stores time-series data

Grafana
  dashboards + alerting

Key metrics:
  Request rate (RPS)
  Error rate (%)
  P50/P95/P99 latency
  Pod CPU/Memory
  Queue lag (KEDA)</div>
      </div>
      <div>
        <div class="ans-label">Logs</div>
        <div class="code-box">Serilog / NLog
  structured JSON logs

Azure Monitor / ELK
  log aggregation

Log levels:
  Debug   → dev only
  Info    → key actions
  Warning → recoverable
  Error   → needs attention
  Critical→ page on-call

Always include: TraceId, UserId,
TenantId, CorrelationId</div>
      </div>
      <div>
        <div class="ans-label">Traces</div>
        <div class="code-box">OpenTelemetry SDK
  instruments your code

Jaeger / Zipkin /
Azure App Insights
  trace store + UI

Every request:
  TraceId   (end-to-end)
  SpanId    (this service)
  ParentSpanId

See full path:
  Gateway → OrderSvc
          → PaymentSvc
          → DB query</div>
      </div>
    </div>
    <div class="tip-box" style="margin-top:12px;">✅ Golden Signals: Latency · Traffic · Errors · Saturation. Alert on these 4 for any production service.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Interview Summary — Architect-Level Answer</div>
  <div class="ref-body">
    <div class="code-box">Q: How do you design a production CI/CD pipeline with security?

A: I design the pipeline with security gates at every stage — DevSecOps.

   CI: Code commit triggers build → unit tests → SonarQube (quality)
       → CodeQL (SAST security) → OWASP dependency scan →
       Docker build → Trivy container scan → push to ACR.
       Any gate failure blocks the pipeline.

   CD: Deploy to Dev (auto) → integration tests →
       Deploy to QA (auto) → regression + DAST with OWASP ZAP →
       Deploy to Staging (manual approval) → UAT →
       Deploy to Production with Canary strategy.

   Infrastructure: Terraform with remote state in Azure Blob.
   IaC scanned with Checkov before every apply.
   Plan reviewed before apply. Approval gate in pipeline.

   Production: Canary deployment — 5% traffic first,
   monitor error rate + latency, auto-rollback if threshold breached.

   Observability: Prometheus + Grafana for metrics,
   OpenTelemetry for traces, Serilog for structured logs.
   Alert on the four golden signals.</div>
  </div>
</div>
`;
