window.Pages['ref-deployments'] = `
<div class="page-header">
  <div class="breadcrumb">Deep Dive › <span>Deployment Strategies</span></div>
  <h1>🚀 Deployment Strategies</h1>
  <p>Blue-Green · Canary · Rolling · Feature Flags · Argo Rollouts · DB Migrations · Rollback</p>
</div>

<div class="ref-section">
  <div class="ref-title">Strategies at a Glance</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Strategy</div><div>How It Works</div><div>Downtime</div><div>Rollback</div><div>Cost</div><div>Best For</div></div>
      <div class="pt-row"><div class="pt-name">Recreate</div><div>Terminate all v1 → start all v2</div><div class="dt-no">Yes</div><div>Redeploy v1 (slow)</div><div>Lowest</div><div>Dev/test, batch jobs, quick-and-dirty</div></div>
      <div class="pt-row"><div class="pt-name">Rolling Update</div><div>Replace pods one-by-one, v1 → v2 gradually</div><div class="dt-yes">None</div><div>Roll back deployment (minutes)</div><div>Low</div><div>Standard production default</div></div>
      <div class="pt-row"><div class="pt-name">Blue-Green</div><div>Two full environments; flip LB from Blue(v1) to Green(v2)</div><div class="dt-yes">None</div><div class="dt-yes">Instant (flip LB back)</div><div>2× infra</div><div>High-stakes releases, instant rollback needed</div></div>
      <div class="pt-row"><div class="pt-name">Canary</div><div>Route 5%→25%→100% to v2 over time; monitor at each step</div><div class="dt-yes">None</div><div class="dt-yes">Instant (reroute 0%)</div><div>Low extra</div><div>Risk reduction, large user base</div></div>
      <div class="pt-row"><div class="pt-name">A/B Testing</div><div>Route specific users (header/cookie/region) to v2</div><div class="dt-yes">None</div><div class="dt-yes">Instant</div><div>Low extra</div><div>Feature experiments, UX testing</div></div>
      <div class="pt-row"><div class="pt-name">Shadow</div><div>Mirror real traffic to v2 but discard v2 responses</div><div class="dt-yes">None</div><div>N/A — no user impact</div><div>2× infra</div><div>Testing v2 with prod traffic, zero risk</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Blue-Green Deployment — Deep Dive</div>
  <div class="ref-body">
    <div class="code-box">Concept:
  Blue  = current production (v1) — live, taking 100% traffic
  Green = new version (v2)       — deployed, tested, idle

Steps:
  1. Deploy v2 to Green environment (identical infrastructure)
  2. Run smoke tests + integration tests against Green (no user traffic yet)
  3. Switch load balancer / DNS to point to Green
     → All traffic instantly on v2
  4. Monitor Green for 15–30 minutes
  5a. SUCCESS  → decommission Blue (or keep for one release cycle)
  5b. FAILURE  → flip LB back to Blue (instant rollback, &lt;30 seconds)

Traffic switch options:
  DNS:             Update A record TTL (slow — DNS propagation delay)
  Load Balancer:   Update backend pool (fast — seconds, Azure ALB / NGINX)
  Kubernetes:      Update Service selector:  app: v1  →  app: v2
  Azure Front Door: Update origin group weights 100/0 → 0/100</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Blue-Green in Kubernetes</div>
        <div class="code-box"># Blue deployment (v1 — currently live)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: orderservice-blue
spec:
  replicas: 5
  selector:
    matchLabels: { app: orderservice, slot: blue }
  template:
    metadata:
      labels: { app: orderservice, slot: blue, version: v1 }
    spec:
      containers:
      - name: app
        image: myacr.azurecr.io/orderservice:v1.2.3

---
# Green deployment (v2 — newly deployed, idle)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: orderservice-green
spec:
  replicas: 5
  selector:
    matchLabels: { app: orderservice, slot: green }
  template:
    metadata:
      labels: { app: orderservice, slot: green, version: v2 }
    spec:
      containers:
      - name: app
        image: myacr.azurecr.io/orderservice:v1.3.0

---
# Service — points to BLUE initially
apiVersion: v1
kind: Service
metadata:
  name: orderservice
spec:
  selector:
    app: orderservice
    slot: blue        # ← change to "green" to switch traffic

# SWITCH: patch service selector to green
kubectl patch service orderservice \
  -p '{"spec":{"selector":{"app":"orderservice","slot":"green"}}}'

# ROLLBACK: patch back to blue (instant)
kubectl patch service orderservice \
  -p '{"spec":{"selector":{"app":"orderservice","slot":"blue"}}}'</div>
      </div>
      <div>
        <div class="ans-label">Database Migrations with Blue-Green</div>
        <div class="code-box">Problem: Blue runs schema v1, Green needs schema v2.
  If you add a NOT NULL column → Blue breaks immediately.
  If you drop a column → Green can't find it.

Solution: Expand-Contract Pattern (backward-compatible migrations)

PHASE 1 — EXPAND (deploy with Blue still live):
  → Add new column as NULLABLE:
    ALTER TABLE Orders ADD NewStatus NVARCHAR(50) NULL;
  → Deploy Green code that writes to BOTH OldStatus AND NewStatus.
  → Blue still reads OldStatus → no breakage.

PHASE 2 — MIGRATE DATA:
  → Background job: UPDATE Orders SET NewStatus = OldStatus
    WHERE NewStatus IS NULL;
  → Verify all rows backfilled.

PHASE 3 — SWITCH:
  → Flip LB: Blue → Green.
  → Green now reads NewStatus only.

PHASE 4 — CONTRACT (next release cycle):
  → Remove OldStatus from code.
  → Drop column: ALTER TABLE Orders DROP COLUMN OldStatus;

Rules:
  ✅ Only ADDITIVE changes during blue-green switch.
  ❌ Never DROP or RENAME columns across a live switch.
  ✅ Both old and new code must work with the DB simultaneously.</div>
        <div class="ans-label" style="margin-top:10px;">Blue-Green with Azure App Service</div>
        <div class="code-box"># Azure App Service Deployment Slots
# Blue = Production slot
# Green = Staging slot

# Deploy v2 to staging slot
az webapp deployment source config-zip \
  --name myapp --resource-group myRG \
  --slot staging --src app.zip

# Warm up staging + run tests
curl https://myapp-staging.azurewebsites.net/health

# SWAP slots (atomic — instant traffic switch)
az webapp deployment slot swap \
  --name myapp --resource-group myRG \
  --slot staging --target-slot production

# Rollback: swap again (staging now has old v1)
az webapp deployment slot swap \
  --name myapp --resource-group myRG \
  --slot staging --target-slot production</div>
      </div>
    </div>
    <div class="warn-box">⚠️ Blue-Green costs 2× infrastructure while both slots are live. Mitigate: use smaller Green during testing phase, scale it up just before the switch, scale down Blue after validation.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Canary Deployment — Deep Dive</div>
  <div class="ref-body">
    <div class="code-box">Origin: "canary in a coal mine" — detect problems with minimal blast radius.

Concept: route a small % of real traffic to v2 first.
  If metrics look healthy → gradually increase percentage.
  If metrics degrade → immediately route 0% back.

Why Canary over Blue-Green?
  Blue-Green: 0% → 100% instantly (binary switch)
  Canary: 0% → 5% → 25% → 50% → 100% (gradual, monitored)
  → If v2 has a subtle bug: affects only 5% of users first
  → Buy time to detect the problem before full rollout

Canary promotion criteria (automate these checks):
  ✅ Error rate (v2) not significantly higher than v2 baseline
  ✅ P99 latency within acceptable threshold (e.g. &lt;10% regression)
  ✅ Business metrics: conversion rate, order success rate stable
  ✅ No anomaly alerts in Application Insights / Datadog</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Canary in Kubernetes (native)</div>
        <div class="code-box"># Stable deployment — v1 (9 replicas = 90% traffic)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: orderservice-stable
spec:
  replicas: 9
  selector:
    matchLabels: { app: orderservice, track: stable }
  template:
    metadata:
      labels: { app: orderservice, track: stable }
    spec:
      containers:
      - image: myacr.azurecr.io/orderservice:v1.2.3

---
# Canary deployment — v2 (1 replica = ~10% traffic)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: orderservice-canary
spec:
  replicas: 1
  selector:
    matchLabels: { app: orderservice, track: canary }
  template:
    metadata:
      labels: { app: orderservice, track: canary }
    spec:
      containers:
      - image: myacr.azurecr.io/orderservice:v1.3.0

---
# Service selects BOTH stable and canary pods
# Traffic split is proportional to replica count
# 9 stable + 1 canary = 10% canary traffic
apiVersion: v1
kind: Service
metadata:
  name: orderservice
spec:
  selector:
    app: orderservice   # matches BOTH tracks

# Promote canary: scale canary up, stable down
kubectl scale deploy orderservice-canary --replicas=5
kubectl scale deploy orderservice-stable --replicas=5
# → 50/50 split

# Full promotion
kubectl scale deploy orderservice-canary --replicas=10
kubectl scale deploy orderservice-stable --replicas=0</div>
      </div>
      <div>
        <div class="ans-label">Argo Rollouts — Automated Canary</div>
        <div class="code-box">Argo Rollouts: K8s controller for progressive delivery.
  Replaces standard Deployments with a Rollout resource.
  Integrates with: NGINX, Istio, AWS ALB, Datadog, Prometheus.

apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: orderservice
spec:
  replicas: 10
  strategy:
    canary:
      # Canary steps — automated progression
      steps:
      - setWeight: 5         # step 1: 5% canary
      - pause: {duration: 10m}  # wait 10 minutes
      - setWeight: 25        # step 2: 25% canary
      - pause: {duration: 10m}
      - setWeight: 50        # step 3: 50% canary
      - pause: {}            # manual approval gate
      - setWeight: 100       # full promotion

      # Auto-rollback via Prometheus metrics
      analysis:
        templates:
        - templateName: error-rate
        startingStep: 1

      canaryService: orderservice-canary
      stableService: orderservice-stable

---
# AnalysisTemplate — defines pass/fail metric
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: error-rate
spec:
  metrics:
  - name: error-rate
    interval: 1m
    failureLimit: 3
    provider:
      prometheus:
        address: http://prometheus:9090
        query: |
          rate(http_requests_total{
            status=~"5..",
            deployment="orderservice-canary"
          }[5m])
          /
          rate(http_requests_total{
            deployment="orderservice-canary"
          }[5m])
    successCondition: result[0] &lt; 0.01   # fail if error rate &gt; 1%</div>
        <div class="ans-label" style="margin-top:10px;">Argo Rollouts CLI</div>
        <div class="code-box"># Watch rollout progress
kubectl argo rollouts get rollout orderservice --watch

# Manually promote past a pause step
kubectl argo rollouts promote orderservice

# Abort (immediate rollback to stable)
kubectl argo rollouts abort orderservice

# Argo Rollouts dashboard UI
kubectl argo rollouts dashboard</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Progressive Delivery Tools — Argo Rollouts · Flagger · Azure DevOps</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Tool</div><div>Model</div><div>Traffic Split</div><div>Metric Analysis</div><div>GitOps Native</div><div>Best For</div></div>
      <div class="pt-row"><div class="pt-name">Argo Rollouts</div><div>K8s controller (Rollout CRD)</div><div>Istio, NGINX, AWS ALB, SMI</div><div>Prometheus, Datadog, Wavefront, CloudWatch</div><div>✅ Argo CD integration</div><div>K8s-first teams, fine-grained step control, manual gate approvals</div></div>
      <div class="pt-row"><div class="pt-name">Flagger</div><div>K8s controller (Canary CRD)</div><div>Istio, NGINX, Contour, App Mesh</div><div>Prometheus, Datadog, CloudWatch, Graphite</div><div>✅ Flux / Argo CD</div><div>Fully automated zero-touch canary, GitOps pipelines with Flux</div></div>
      <div class="pt-row"><div class="pt-name">Azure DevOps</div><div>YAML Pipeline + Release Gates</div><div>Azure App Service slots, Azure Front Door, AKS</div><div>Azure Monitor, App Insights, REST API gates</div><div>✅ via pipeline-as-code</div><div>Azure-heavy orgs, non-K8s workloads, App Service, VM deployments</div></div>
    </div>

    <div class="two-col" style="margin-top:16px;">
      <div>
        <div class="ans-label">Argo Rollouts — How It Works</div>
        <div class="code-box">1. Replace Deployment → Rollout resource
2. Define strategy: canary or blueGreen
3. Steps control traffic % + pause points
4. AnalysisTemplate queries metrics (Prometheus)
5. If metrics pass → auto-promote to next step
6. If metrics fail (failureLimit exceeded) → auto-abort
   → traffic snaps back to stable instantly

Key features:
  • Manual pause/approval gates (pause: {})
  • Header-based traffic routing (A/B testing)
  • Blue-Green strategy built-in
  • Mirror traffic (shadow testing)
  • CLI + UI dashboard
  • Argo CD integration: Rollout status in GitOps UI</div>
      </div>
      <div>
        <div class="ans-label">Flagger — How It Works</div>
        <div class="code-box">1. You deploy a normal Kubernetes Deployment
2. Flagger watches for image/config changes
3. On change: Flagger creates canary Deployment automatically
4. Routes stepWeight % of traffic to canary each interval
5. Queries metric providers at each step
6. SUCCESS: all steps pass → Flagger scales up canary,
            deletes old primary → primary = new version
7. FAILURE: threshold exceeded → Flagger routes 0% to canary,
            deletes canary → primary unchanged

Key features:
  • Zero Deployment changes needed — Flagger owns the canary
  • Webhook gates — run load tests, integration tests per step
  • Slack/Teams alerts on promotion/rollback
  • Works with Flux CD: git push → Flagger picks it up
  • A/B testing via Istio header routing</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Argo Rollouts — Blue-Green + Canary Deep Dive</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Blue-Green with Argo Rollouts</div>
        <div class="code-box">apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: orderservice
spec:
  replicas: 5
  strategy:
    blueGreen:
      activeService:  orderservice-active   # production
      previewService: orderservice-preview  # new version
      autoPromotionEnabled: false           # manual gate
      prePromotionAnalysis:
        templates:
        - templateName: smoke-test
      postPromotionAnalysis:
        templates:
        - templateName: error-rate
      scaleDownDelaySeconds: 300  # keep Blue alive 5 min after switch

# Flow:
#  1. Deploy new image → Rollout creates Preview pods
#  2. prePromotionAnalysis runs smoke-test against preview
#  3. If pass → waits for manual approval (autoPromotionEnabled: false)
#  4. Operator runs: kubectl argo rollouts promote orderservice
#  5. Active service switches to new pods (instant)
#  6. postPromotionAnalysis runs error-rate check
#  7. If fail → Argo auto-aborts, routes back to Blue pods</div>
      </div>
      <div>
        <div class="ans-label">Argo Rollouts — Canary with Header Routing (A/B)</div>
        <div class="code-box">apiVersion: argoproj.io/v1alpha1
kind: Rollout
spec:
  strategy:
    canary:
      canaryService: orderservice-canary
      stableService: orderservice-stable
      trafficRouting:
        nginx:
          stableIngress: orderservice-ingress
      # A/B: route internal team to canary via header
      canaryMetadata:
        annotations:
          nginx.ingress.kubernetes.io/canary-by-header: "X-Canary"
          nginx.ingress.kubernetes.io/canary-by-header-value: "true"
      steps:
      - setWeight: 5
      - pause: {duration: 5m}
      - analysis:                     # inline analysis step
          templates:
          - templateName: latency-check
      - setWeight: 30
      - pause: {}                     # manual gate — Slack approval
      - setWeight: 100

# CLI commands
kubectl argo rollouts get rollout orderservice --watch
kubectl argo rollouts promote orderservice      # approve gate
kubectl argo rollouts abort orderservice        # rollback now
kubectl argo rollouts set image orderservice \
  app=myacr.azurecr.io/orderservice:v2.0.0     # trigger rollout</div>
      </div>
    </div>
    <div class="ans-label" style="margin-top:14px;">AnalysisTemplate — Prometheus + Datadog</div>
    <div class="two-col" style="margin-top:6px;">
      <div>
        <div class="code-box"># Prometheus AnalysisTemplate
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: error-rate
spec:
  metrics:
  - name: error-rate
    interval: 1m
    failureLimit: 3           # 3 consecutive failures → abort
    successCondition: result[0] &lt; 0.01
    provider:
      prometheus:
        address: http://prometheus:9090
        query: |
          rate(http_requests_total{
            status=~"5..",app="orderservice-canary"
          }[2m])
          /
          rate(http_requests_total{
            app="orderservice-canary"
          }[2m])

  - name: p99-latency
    interval: 1m
    successCondition: result[0] &lt; 0.5   # &lt;500ms
    provider:
      prometheus:
        query: |
          histogram_quantile(0.99,
            rate(http_request_duration_seconds_bucket{
              app="orderservice-canary"
            }[2m])
          )</div>
      </div>
      <div>
        <div class="code-box"># Datadog AnalysisTemplate
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: datadog-success-rate
spec:
  args:
  - name: service-name
  metrics:
  - name: success-rate
    interval: 1m
    failureLimit: 2
    successCondition: result >= 0.99
    provider:
      datadog:
        apiVersion: v2
        query: |
          avg:trace.web.request.hits{
            env:prod,
            service:{{args.service-name}},
            http.status_code:2*
          }.as_rate()
          /
          avg:trace.web.request.hits{
            env:prod,
            service:{{args.service-name}}
          }.as_rate()

# CloudWatch, New Relic, Wavefront providers
# also available — same structure, different provider block</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Azure DevOps — Progressive Delivery</div>
  <div class="ref-body">
    <div class="code-box">Azure DevOps progressive delivery = pipeline-as-code (YAML) + deployment rings + release gates.
Works for: Azure App Service, AKS, VMs, Azure Functions — not K8s-only.

Three approaches in Azure DevOps:
  1. Deployment Slots (App Service)     — Blue-Green, instant swap
  2. Pipeline Stages + Gates            — Canary via controlled stage promotion
  3. Azure Front Door / Traffic Manager — weighted traffic split across environments</div>

    <div class="ans-label" style="margin-top:14px;">Approach 1 — Canary with Pipeline Stages + Approval Gates</div>
    <div class="code-box"># azure-pipelines.yml — Canary via staged environments
stages:

# ── STAGE 1: Deploy to Canary (10% traffic) ────────────────
- stage: DeployCanary
  displayName: 'Deploy Canary (10%)'
  jobs:
  - deployment: CanaryDeploy
    environment: 'production-canary'    # has approval gate configured
    strategy:
      runOnce:
        deploy:
          steps:
          - task: AzureWebApp@1
            inputs:
              azureSubscription: 'MyServiceConnection'
              appName: 'orderservice'
              slotName: 'canary'         # App Service canary slot
              package: '$(Pipeline.Workspace)/drop/*.zip'

          # Route 10% of traffic to canary slot via Azure CLI
          - task: AzureCLI@2
            inputs:
              azureSubscription: 'MyServiceConnection'
              scriptType: 'bash'
              scriptLocation: 'inlineScript'
              inlineScript: |
                az webapp traffic-routing set \
                  --resource-group myRG \
                  --name orderservice \
                  --distribution canary=10

# ── STAGE 2: Monitor Gate (wait + check App Insights) ──────
- stage: MonitorCanary
  displayName: 'Monitor Canary — 30 min'
  dependsOn: DeployCanary
  jobs:
  - job: WaitAndValidate
    pool: server                        # agentless — no runner needed
    steps:
    - task: InvokeRestAPI@1             # query App Insights REST API
      inputs:
        connectionType: 'connectedServiceName'
        serviceConnection: 'AppInsightsGate'
        method: 'GET'
        urlSuffix: '/query?query=requests | where timestamp > ago(15m) | summarize error_rate=countif(success==false)/count()'
        successCriteria: 'eq(root[''tables''][0][''rows''][0][0], 0)'
    - task: ManualValidation@0          # human approval gate
      inputs:
        notifyUsers: 'lead-engineer@company.com'
        instructions: 'Canary healthy for 15 min. Approve to promote to 100%.'
        onTimeout: 'reject'
        timeout: '60'                   # auto-reject if no response in 60 min

# ── STAGE 3: Full Promotion ─────────────────────────────────
- stage: PromoteFull
  displayName: 'Promote to Production (100%)'
  dependsOn: MonitorCanary
  jobs:
  - deployment: FullPromotion
    environment: 'production'
    strategy:
      runOnce:
        deploy:
          steps:
          - task: AzureCLI@2
            inputs:
              scriptType: 'bash'
              inlineScript: |
                # Route 100% to canary (now production)
                az webapp traffic-routing clear \
                  --resource-group myRG --name orderservice
                # Swap canary slot → production
                az webapp deployment slot swap \
                  --resource-group myRG --name orderservice \
                  --slot canary --target-slot production</div>

    <div class="ans-label" style="margin-top:16px;">Approach 2 — Canary on AKS via Azure DevOps</div>
    <div class="two-col" style="margin-top:6px;">
      <div>
        <div class="code-box"># azure-pipelines.yml — AKS canary with built-in strategy
- stage: DeployAKSCanary
  jobs:
  - deployment: AKSCanary
    environment: 'aks-production.orderservice'
    strategy:
      canary:
        increments: [10, 25, 50]   # ADO manages replica math
        deploy:
          steps:
          - task: KubernetesManifest@0
            inputs:
              action: 'deploy'
              namespace: 'production'
              manifests: 'k8s/orderservice.yaml'
              containers: |
                myacr.azurecr.io/orderservice:$(Build.BuildId)
              strategy: canary
              percentage: $(System.RolloutPercentage)
        postRouteTraffic:
          steps:
          - task: KubernetesManifest@0
            inputs:
              action: 'promote'   # or 'reject' on gate failure
              strategy: canary
              manifests: 'k8s/orderservice.yaml'

# ADO calculates replicas automatically:
# increment=10 → 1 canary pod : 9 stable pods
# increment=25 → 3 canary pods: 9 stable pods
# increment=50 → 5 canary pods: 5 stable pods</div>
      </div>
      <div>
        <div class="ans-label">Approach 3 — Azure Front Door Weighted Routing</div>
        <div class="code-box"># Multi-region canary via Azure Front Door
# Stable origin → v1 (weight 90)
# Canary origin → v2 (weight 10)

az afd origin create \
  --origin-group-name orderservice-origins \
  --origin-name orderservice-v1 \
  --host-name orderservice-v1.azurewebsites.net \
  --weight 90

az afd origin create \
  --origin-group-name orderservice-origins \
  --origin-name orderservice-v2 \
  --host-name orderservice-v2.azurewebsites.net \
  --weight 10    # 10% canary traffic

# Pipeline stages increment weight:
# Stage 1: v2 weight=10  → monitor gates
# Stage 2: v2 weight=25  → monitor gates
# Stage 3: v2 weight=100 → v1 decommissioned

# ✅ Global — works across Azure regions
# ✅ No K8s required
# ✅ Works for App Service, Functions,
#    Container Apps, custom origins</div>

        <div class="ans-label" style="margin-top:10px;">Azure DevOps Release Gates</div>
        <div class="code-box">Gates run automatically — pipeline pauses until gate passes.

Gate types:
  InvokeRestAPI      — call any HTTP endpoint
  QueryAzureMonitor  — check metric threshold in Azure Monitor
  QueryWorkItems     — ensure no open P1 bugs in Azure Boards
  InvokeAzureFunction— run custom validation logic
  ManualValidation   — human approval with email + timeout

Example: App Insights error rate gate
  Endpoint: Azure Monitor REST API
  Query: requests
    | summarize failRate = countif(success==false) * 100.0 / count()
    | where failRate &lt; 1.0
  Sampling: every 5 min, 3 samples required
  → All 3 must pass → stage promoted ✅
  → Any fail → stage rejected, rollback triggered ❌</div>
      </div>
    </div>

    <div class="ans-label" style="margin-top:16px;">Tool Comparison — When to Use Which</div>
    <div class="pattern-table" style="margin-top:6px;">
      <div class="pt-row pt-header"><div>Scenario</div><div>Best Tool</div><div>Why</div></div>
      <div class="pt-row"><div class="pt-name">Pure K8s, fine-grained step control</div><div>Argo Rollouts</div><div>Purpose-built K8s controller. Steps, pauses, analysis in one CRD. Rich CLI + dashboard UI.</div></div>
      <div class="pt-row"><div class="pt-name">GitOps with Flux, zero-touch automation</div><div>Flagger</div><div>Git push → Flagger handles everything automatically. Best for fully hands-off pipelines.</div></div>
      <div class="pt-row"><div class="pt-name">Azure App Service / non-K8s workloads</div><div>Azure DevOps</div><div>Deployment slots + pipeline stages are native to Azure PaaS. No K8s needed.</div></div>
      <div class="pt-row"><div class="pt-name">Multi-region traffic split</div><div>Azure Front Door + ADO</div><div>Front Door weighted routing works globally across regions and services.</div></div>
      <div class="pt-row"><div class="pt-name">Enterprise: manual approval gate required</div><div>Azure DevOps or Argo Rollouts</div><div>Both support human approval with timeout and email notification.</div></div>
      <div class="pt-row"><div class="pt-name">Metric-driven auto-rollback</div><div>Argo Rollouts or Flagger</div><div>Both query Prometheus/Datadog and auto-abort on threshold breach.</div></div>
      <div class="pt-row"><div class="pt-name">A/B testing by user header/cookie</div><div>Argo Rollouts + Istio</div><div>Header/cookie-based routing with Istio VirtualService gives per-user traffic split.</div></div>
      <div class="pt-row"><div class="pt-name">ADO pipeline + K8s traffic management</div><div>ADO + Argo Rollouts</div><div>ADO owns CI/CD pipeline; Argo owns K8s traffic. Best of both worlds in enterprise teams.</div></div>
    </div>
    <div class="tip-box" style="margin-top:10px;">✅ Common real-world combo: Azure DevOps pipeline triggers Argo Rollouts via <code>kubectl argo rollouts set image</code> — ADO handles build/test/promote approval; Argo handles K8s traffic shifting and metric analysis.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Flagger — GitOps-Native Progressive Delivery</div>
  <div class="ref-body">
    <div class="code-box">Flagger: CNCF project, works with Flux/ArgoCD for GitOps.
  Automates canary analysis. Supports: NGINX, Istio, App Mesh, Contour.

apiVersion: flagger.app/v1beta1
kind: Canary
metadata:
  name: orderservice
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: orderservice

  progressDeadlineSeconds: 600   # abort if not promoted in 10 min

  service:
    port: 80
    targetPort: 8080

  analysis:
    interval: 1m          # check metrics every minute
    threshold: 5           # allow 5 failed metric checks before rollback
    maxWeight: 50          # max 50% canary traffic
    stepWeight: 10         # increment by 10% each step

    metrics:
    - name: request-success-rate
      thresholdRange:
        min: 99            # must be &gt;= 99% success rate
      interval: 1m
    - name: request-duration
      thresholdRange:
        max: 500           # P99 must be &lt;= 500ms
      interval: 1m

    webhooks:
    - name: integration-tests
      url: http://test-runner/run    # run tests at each step
      timeout: 60s</div>
    <div class="tip-box">✅ Flagger + Flux = fully automated GitOps canary: commit code → image built → Flux detects new image → Flagger runs canary → auto-promotes if healthy. Zero manual steps.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Feature Flags — Decouple Deploy from Release</div>
  <div class="ref-body">
    <div class="code-box">Feature Flags: toggle features ON/OFF at runtime without redeploying.
  Deploy dark (flag OFF) → release to users (flag ON) → roll back (flag OFF).

  Decouples: code deployment from feature release.
  Enables: trunk-based development — everyone commits to main, features hidden behind flags.</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Feature Flag Types</div>
        <div class="code-box">Release Toggle: hide incomplete feature.
  "new-checkout-flow": false → true on launch day.

Ops Toggle: kill switch for performance issues.
  "enable-recommendations": false if ML API is down.

Experiment (A/B): route % of users to variant.
  "new-pricing-ui": true for 10% of users.

Permission Toggle: features for specific users.
  "beta-features": true for internal + beta users only.

Tools:
  Azure App Configuration (feature management)
  LaunchDarkly (enterprise, real-time targeting)
  Unleash (open-source)
  AWS AppConfig</div>
      </div>
      <div>
        <div class="ans-label">Azure App Configuration (.NET)</div>
        <div class="code-box">// Startup
builder.Configuration.AddAzureAppConfiguration(o => {
    o.Connect(connectionString)
     .UseFeatureFlags(f => f.CacheExpirationInterval
         = TimeSpan.FromMinutes(5));
});
builder.Services.AddFeatureManagement();

// Controller / Service
public class CheckoutController : ControllerBase {
    private readonly IFeatureManager _features;

    [HttpPost]
    public async Task&lt;IActionResult&gt; Checkout() {
        if (await _features.IsEnabledAsync("NewCheckoutFlow"))
            return await _newCheckoutService.ProcessAsync();
        else
            return await _legacyCheckoutService.ProcessAsync();
    }
}

// Canary via feature flag (% rollout)
// Azure Portal: Feature → Filters → Targeting
// targetingContext: 10% of users get new flow</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Canary vs Blue-Green — Decision Guide</div>
  <div class="ref-body">
    <div class="code-box">Choose BLUE-GREEN when:
  ✅ Need instant, clean rollback (payment systems, core APIs)
  ✅ Release requires full environment validation (complex integration tests)
  ✅ DB migration happens before cutover (run on Green, validate, then switch)
  ✅ Can afford 2× infra cost temporarily
  ✅ Release happens infrequently (big quarterly releases)
  ✅ Azure App Service slots make it trivial

Choose CANARY when:
  ✅ Large user base — want to limit blast radius
  ✅ Continuous delivery — releasing many times per day
  ✅ Real user traffic is the best test (synthetic tests miss real patterns)
  ✅ Automated metrics can determine health (Prometheus/Datadog available)
  ✅ Cannot afford 2× infra long-term
  ✅ ML model updates, algorithm changes (measure impact on real users)

Use BOTH together:
  Blue-Green for infrastructure changes (DB schema, config changes).
  Canary for application releases (code changes).

Use FEATURE FLAGS alongside either:
  Deploy code dark (flag off) → infrastructure is stable.
  Enable flag → canary 5% of users see new feature.
  Full rollout → 100% users.
  Instant rollback: just toggle flag off.</div>
    <div class="tip-box">✅ Netflix, Amazon, Google all use canary as default. Blue-green for DB-heavy releases. Feature flags for product releases. The safest release is the one nobody notices.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Rollback Strategy — Plan Before You Deploy</div>
  <div class="ref-body">
    <div class="code-box">Rule: every deployment MUST have a tested rollback plan defined before it goes out.

Kubernetes Rollback:
  kubectl rollout undo deployment/orderservice
  kubectl rollout undo deployment/orderservice --to-revision=3
  kubectl rollout history deployment/orderservice   # see all revisions

Helm Rollback:
  helm rollback orderservice 5      # roll back to revision 5
  helm history orderservice         # list all revisions

Argo CD Rollback:
  UI: click "History and Rollback" → select previous sync

DB Rollback (hardest part):
  ✅ Use Expand-Contract — old code can always run on new schema.
  ✅ Run Flyway/Liquibase with undo scripts.
  ✅ Always test rollback in staging before prod.
  ❌ Destructive migrations (DROP TABLE, DELETE) cannot be undone.
     → Make these a separate deployment, manual step, after full promotion.

Rollback checklist:
  □ Rollback procedure written and tested in staging.
  □ DB migration is backward-compatible (expand-contract).
  □ Previous image tag pinned and available in ACR.
  □ Feature flag OFF is a valid "rollback" for new features.
  □ On-call engineer knows rollback command / runbook link.
  □ Monitoring dashboard visible during deployment window.</div>
  </div>
</div>
`;
