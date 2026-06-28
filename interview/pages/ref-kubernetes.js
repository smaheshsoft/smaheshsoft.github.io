window.Pages['ref-kubernetes'] = `
<div class="page-header">
  <div class="breadcrumb">Architect Reference › <span>Kubernetes, AKS &amp; OpenShift</span></div>
  <h1>☸️ Kubernetes, AKS &amp; OpenShift</h1>
  <p>Control plane · Workloads · Networking · Scaling · Security · AKS deep dive · OpenShift vs K8s</p>
</div>

<div class="ref-section">
  <div class="ref-title">Kubernetes Architecture — Control Plane vs Data Plane</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Control Plane (Master)</div>
        <div class="code-box">┌─────────────────────────────┐
│        Control Plane         │
│                              │
│  API Server  ← single entry  │
│  Scheduler   ← pod placement │
│  Controller  ← desired state │
│  etcd        ← state store   │
└─────────────────────────────┘</div>
        <ul style="margin-top:8px;">
          <li><strong>API Server</strong> — all kubectl commands go here</li>
          <li><strong>Scheduler</strong> — decides which node runs each pod</li>
          <li><strong>Controller Manager</strong> — ensures desired state</li>
          <li><strong>etcd</strong> — distributed key-value store, cluster source of truth</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Data Plane (Worker Nodes)</div>
        <div class="code-box">┌─────────────────────────────┐
│         Worker Node          │
│                              │
│  Kubelet     ← node agent   │
│  kube-proxy  ← networking   │
│  Container Runtime           │
│                              │
│  Pod → Pod → Pod             │
└─────────────────────────────┘</div>
        <ul style="margin-top:8px;">
          <li><strong>Kubelet</strong> — ensures containers are running in pods</li>
          <li><strong>kube-proxy</strong> — manages network rules on the node</li>
          <li><strong>Container Runtime</strong> — runs the actual containers</li>
        </ul>
      </div>
    </div>
    <div class="tip-box" style="margin-top:12px;">✅ In AKS: Microsoft manages the Control Plane. You manage Worker Nodes (node pools).</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Pod Scheduling — How a Pod Gets Placed on a Node</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step">kubectl apply → API Server</div><div class="flow-arrow">↓</div>
      <div class="flow-step blue">API Server writes pending pod to etcd</div><div class="flow-arrow">↓</div>
      <div class="flow-step blue">Scheduler watches etcd → finds unscheduled pod</div><div class="flow-arrow">↓</div>
      <div class="flow-step blue">Scheduler scores nodes: CPU, Memory, Affinity, Taints</div><div class="flow-arrow">↓</div>
      <div class="flow-step blue">Scheduler writes nodeName: worker-node-2 to etcd</div><div class="flow-arrow">↓</div>
      <div class="flow-step green">Kubelet on worker-node-2 creates the pod</div>
    </div>
    <div class="ans-label" style="margin-top:14px;">Scheduling Controls</div>
    <div class="pattern-table" style="margin-top:8px;">
      <div class="pt-row pt-header"><div>Control</div><div>Purpose</div><div>Example</div></div>
      <div class="pt-row"><div class="pt-name">Node Selector</div><div>Run pod on specific node type</div><div>nodeSelector: disktype: ssd</div></div>
      <div class="pt-row"><div class="pt-name">Affinity</div><div>Prefer or require certain nodes</div><div>Run DB pods on memory-optimized nodes</div></div>
      <div class="pt-row"><div class="pt-name">Anti-Affinity</div><div>Spread pods across nodes/zones</div><div>Don't put 2 replicas on same node</div></div>
      <div class="pt-row"><div class="pt-name">Taints &amp; Tolerations</div><div>Reserve nodes for specific workloads</div><div>GPU nodes only for ML pods</div></div>
      <div class="pt-row"><div class="pt-name">Resource Requests/Limits</div><div>Guarantee &amp; cap CPU/Memory</div><div>requests: cpu 200m, limits: cpu 500m</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Kubernetes Networking — Services &amp; Ingress</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service Type</div><div>Accessible From</div><div>Use Case</div></div>
      <div class="pt-row"><div class="pt-name">ClusterIP</div><div>Inside cluster only</div><div>Internal service-to-service calls</div></div>
      <div class="pt-row"><div class="pt-name">NodePort</div><div>Node IP + Port</div><div>Dev/testing — not for production</div></div>
      <div class="pt-row"><div class="pt-name">LoadBalancer</div><div>External via cloud LB</div><div>Simple external exposure (no routing)</div></div>
      <div class="pt-row"><div class="pt-name">Ingress</div><div>External via HTTP/HTTPS</div><div>Production — path/host routing, TLS</div></div>
      <div class="pt-row"><div class="pt-name">ExternalName</div><div>Maps to DNS name</div><div>Route to external service by DNS</div></div>
    </div>
    <div class="ans-label" style="margin-top:14px;">Ingress Architecture (Production)</div>
    <div class="code-box">Internet
   ↓
Azure Load Balancer (public IP)
   ↓
NGINX Ingress Controller (pod in cluster)
   ↓  path-based routing
   ├─ /api/orders  → Order Service (ClusterIP)
   ├─ /api/users   → User Service (ClusterIP)
   └─ /            → Frontend Service (ClusterIP)

TLS terminated at Ingress. All internal traffic is HTTP.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Auto Scaling — HPA vs KEDA vs Cluster Autoscaler</div>
  <div class="ref-body">
    <div class="three-col">
      <div>
        <div class="ans-label">HPA — Horizontal Pod Autoscaler</div>
        <div class="code-box">Trigger: CPU > 70%
         Memory > 80%
Action: 3 pods → 10 pods
Scope:  Pod level</div>
        <p style="margin-top:6px;font-size:12px;color:#94a3b8;">Best for: CPU/memory-bound workloads. Reacts after load already hit.</p>
      </div>
      <div>
        <div class="ans-label">KEDA — Event-Driven Autoscaler</div>
        <div class="code-box">Trigger: Kafka lag = 5000
         Queue length = 1000
Action: 0 pods → 20 pods
Scope:  Pod level</div>
        <p style="margin-top:6px;font-size:12px;color:#94a3b8;">Best for: queue/event-driven workloads. Can scale to zero.</p>
      </div>
      <div>
        <div class="ans-label">Cluster Autoscaler</div>
        <div class="code-box">Trigger: Pod cannot schedule
         (insufficient node resources)
Action: Add new VM node
Scope:  Node level</div>
        <p style="margin-top:6px;font-size:12px;color:#94a3b8;">Best for: scaling the cluster itself when pods can't be scheduled.</p>
      </div>
    </div>
    <div class="tip-box" style="margin-top:12px;">✅ Architect Pattern: HPA/KEDA scales pods. Cluster Autoscaler scales nodes. Use both together.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Health Checks — Liveness, Readiness, Startup Probes</div>
  <div class="ref-body">
    <div class="three-col">
      <div>
        <div class="ans-label">Liveness Probe</div>
        <p>Is the container still running? If fails → restart container.</p>
        <div class="code-box">livenessProbe:
  httpGet:
    path: /health
    port: 8080
  failureThreshold: 3</div>
      </div>
      <div>
        <div class="ans-label">Readiness Probe</div>
        <p>Is the container ready to receive traffic? If fails → remove from load balancer.</p>
        <div class="code-box">readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5</div>
      </div>
      <div>
        <div class="ans-label">Startup Probe</div>
        <p>For slow-starting containers. Disables liveness until app is fully up.</p>
        <div class="code-box">startupProbe:
  httpGet:
    path: /health
  failureThreshold: 30
  periodSeconds: 10</div>
      </div>
    </div>
    <div class="warn-box" style="margin-top:12px;">⚠️ Missing readiness probe = traffic routed to pods not yet ready → errors during deployment rollout.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">AKS Security Architecture</div>
  <div class="ref-body">
    <div class="code-box">Inbound Traffic Security:
  Internet → WAF (Azure Front Door) → API Gateway (APIM) → Ingress → Services

Pod-level Security:
  Workload Identity → Azure AD → Key Vault / Storage / SQL (no secrets in code)
  Network Policies  → restrict which pods can talk to which
  Pod Security Standards → non-root containers, read-only filesystem

Cluster Security:
  Private Cluster    → API Server not exposed to internet
  Azure RBAC         → who can access the cluster
  Microsoft Defender for Containers → threat detection</div>
    <div class="tip-box" style="margin-top:12px;">✅ Defence in depth: WAF → API Gateway → Network Policy → Workload Identity → Encryption at rest</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Deployment Strategies in Kubernetes</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Strategy</div><div>How it works</div><div>Downtime</div><div>Risk</div></div>
      <div class="pt-row"><div class="pt-name">Recreate</div><div>Kill all old pods, start new ones</div><div>Yes</div><div>High — avoid in prod</div></div>
      <div class="pt-row"><div class="pt-name">Rolling Update</div><div>Replace pods one by one</div><div>No</div><div>Medium — old+new run briefly</div></div>
      <div class="pt-row"><div class="pt-name">Blue-Green</div><div>Two full environments, switch LB</div><div>No</div><div>Low — instant rollback</div></div>
      <div class="pt-row"><div class="pt-name">Canary</div><div>Route 5–10% traffic to new version</div><div>No</div><div>Very Low — gradual rollout</div></div>
    </div>
    <div class="tip-box" style="margin-top:12px;">✅ Production best practice: Canary deployment + automated rollback on error rate spike.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">AKS — Azure Kubernetes Service Deep Dive</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">AKS Architecture</div>
        <div class="code-box">Microsoft manages (free SLA):
  ✅ API Server
  ✅ etcd
  ✅ Scheduler &amp; Controller Manager
  ✅ Control plane upgrades &amp; patching

You manage (node pools):
  ⚙️ Node pool size &amp; VM SKU
  ⚙️ OS patching (auto-upgrade available)
  ⚙️ Application workloads
  ⚙️ Networking, RBAC, storage

Node Pool Types:
  System pool: kube-system, CoreDNS, metrics-server
  User pool: your application pods
  Spot pool: cheap interruptible VMs for batch/ML</div>
      </div>
      <div>
        <div class="ans-label">AKS Networking Options</div>
        <div class="code-box">Kubenet (basic):
  Nodes get real IPs. Pods get NAT'd IPs.
  ✅ Simple, low IP usage.
  ❌ No direct pod-to-pod across nodes without NAT.
  ❌ Can't use Network Policies with Kubenet + Azure CNI.

Azure CNI (advanced, recommended for prod):
  Every pod gets a real VNet IP.
  ✅ Direct routing, no NAT.
  ✅ Network Policies (Azure NPM or Calico).
  ✅ Integration with Private Endpoints.
  ❌ Uses more IP addresses from VNet subnet.

Azure CNI Overlay (new — best of both):
  Pods get overlay IPs (not from VNet).
  Nodes get real VNet IPs.
  ✅ No IP exhaustion. ✅ Network Policies.
  ✅ Recommended for large clusters.</div>
      </div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">AKS Add-ons &amp; Features</div>
        <div class="code-box">Workload Identity (replaces Pod Identity):
  Pod → Azure AD federated credential → no secrets.
  az aks update --enable-workload-identity

Azure Key Vault Secrets Store CSI:
  Mount Key Vault secrets as files in pods.
  Auto-rotation: pod sees new secret without restart.

Azure Policy for AKS (Gatekeeper):
  Enforce: no privileged containers,
           required resource limits,
           allowed image registries only.

KEDA add-on: managed KEDA by Microsoft.
Dapr add-on: sidecar for service mesh patterns.
GitOps (Flux v2): git-based deployment via ARC.</div>
      </div>
      <div>
        <div class="ans-label">AKS Upgrade Strategy</div>
        <div class="code-box">Cluster upgrade path:
  AKS supports N-2 minor versions (e.g., 1.28, 1.29, 1.30).
  Cannot skip versions (1.27 → 1.29 not allowed directly).

Upgrade steps:
  1. Upgrade control plane first.
  2. Upgrade node pools one by one.
  3. Surge upgrade: +1 node added during upgrade
     so pods can reschedule without downtime.

Auto-upgrade channels:
  patch:  auto-apply latest patch (1.28.3 → 1.28.5)
  stable: latest stable minor version
  rapid:  latest available (includes previews)

Maintenance windows:
  Schedule upgrades during off-peak hours.
  Pair with PodDisruptionBudgets to protect SLA.</div>
      </div>
    </div>
    <div class="ans-label" style="margin-top:14px;">AKS Cost Optimization</div>
    <div class="code-box">Spot Node Pools:    80-90% cheaper. Use for batch, ML, dev/test. Handles eviction gracefully.
Start/Stop Cluster: stop dev clusters at night → pay only for storage (not VMs).
Vertical Pod Autoscaler (VPA): right-size resource requests based on actual usage.
Node Auto-Provision (NAP): automatically picks VM SKU matching pod requirements.
  Replaces: manually managing multiple node pools for different workload types.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">OpenShift — What It Is &amp; How It Differs</div>
  <div class="ref-body">
    <div class="code-box">OpenShift = Red Hat's enterprise Kubernetes distribution.
  Built ON Kubernetes — adds enterprise features on top.
  "Kubernetes with batteries included."

Variants:
  OCP (OpenShift Container Platform): on-premises or any cloud. Self-managed.
  ARO (Azure Red Hat OpenShift): managed OpenShift on Azure (jointly supported by MS + Red Hat).
  ROSA (Red Hat OpenShift Service on AWS): managed on AWS.
  OSD (OpenShift Dedicated): managed by Red Hat.</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">OpenShift vs Kubernetes</div>
        <div class="pattern-table">
          <div class="pt-row pt-header"><div>Feature</div><div>Kubernetes</div><div>OpenShift</div></div>
          <div class="pt-row"><div class="pt-name">Security default</div><div>Permissive — root allowed</div><div>Strict — no root by default (SCC)</div></div>
          <div class="pt-row"><div class="pt-name">Container Runtime</div><div>containerd</div><div>CRI-O (OCI-native, no Docker daemon)</div></div>
          <div class="pt-row"><div class="pt-name">Image builds</div><div>External (Dockerfile + CI)</div><div>Built-in: Source-to-Image (S2I), Builds</div></div>
          <div class="pt-row"><div class="pt-name">CI/CD</div><div>Bring your own (Argo, Tekton)</div><div>Built-in: OpenShift Pipelines (Tekton)</div></div>
          <div class="pt-row"><div class="pt-name">Registry</div><div>External (ACR, ECR)</div><div>Built-in image registry</div></div>
          <div class="pt-row"><div class="pt-name">Service Mesh</div><div>Istio (manual install)</div><div>OpenShift Service Mesh (Istio managed)</div></div>
          <div class="pt-row"><div class="pt-name">Developer UI</div><div>kubectl / Lens (3rd party)</div><div>OpenShift Web Console (built-in)</div></div>
          <div class="pt-row"><div class="pt-name">Multi-tenancy</div><div>Namespaces (manual RBAC)</div><div>Projects (namespace + RBAC + quotas)</div></div>
          <div class="pt-row"><div class="pt-name">OS</div><div>Any Linux</div><div>RHCOS (Red Hat CoreOS) — immutable, auto-update</div></div>
          <div class="pt-row"><div class="pt-name">Support</div><div>Community / cloud provider</div><div>Red Hat enterprise support (SLA)</div></div>
          <div class="pt-row"><div class="pt-name">Cost</div><div>Free (infra cost only)</div><div>License fee on top of infra</div></div>
        </div>
      </div>
      <div>
        <div class="ans-label">OpenShift Key Concepts</div>
        <div class="code-box">Projects (≈ Namespaces + more):
  Each project = isolated namespace with:
  - RBAC (who can do what)
  - Resource Quotas (CPU/memory limits)
  - Network Policies auto-applied
  oc new-project myapp --description="Order Service"

Routes (≈ Ingress):
  OpenShift's built-in HTTP routing.
  apiVersion: route.openshift.io/v1
  kind: Route
  spec:
    host: myapp.apps.cluster.example.com
    to:
      kind: Service
      name: myapp-service
    tls:
      termination: edge    # edge / passthrough / reencrypt

SCC — Security Context Constraints:
  OpenShift's pod security admission (more granular than K8s PSA).
  restricted-v2: no root, no privilege escalation (default).
  anyuid: allow any user ID (needed for some legacy apps).
  oc adm policy add-scc-to-serviceaccount anyuid -z myapp-sa</div>
        <div class="ans-label" style="margin-top:10px;">Source-to-Image (S2I)</div>
        <div class="code-box">S2I: build container image from source code without Dockerfile.
  OpenShift detects language → injects into base image.

oc new-app python~https://github.com/org/myapp
  → Detects Python → uses python:3.11 base image
  → Pulls source → runs pip install → builds image
  → Deploys automatically

BuildConfig: OpenShift's build pipeline resource.
ImageStream: tracks image versions/tags internally.

Why S2I?
  Developer pushes code → OpenShift handles containerization.
  No Dockerfile expertise needed.
  Consistent build environment enforced by platform.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">ARO — Azure Red Hat OpenShift</div>
  <div class="ref-body">
    <div class="code-box">ARO = fully managed OpenShift on Azure.
  Jointly supported by Microsoft + Red Hat.
  Control plane + worker nodes both managed (unlike AKS where you manage nodes).

# Create ARO cluster
az aro create \
  --resource-group myRG \
  --name myAROCluster \
  --vnet myVNet \
  --master-subnet masterSubnet \
  --worker-subnet workerSubnet

# Get credentials
az aro list-credentials --name myAROCluster --resource-group myRG
# → kubeadminPassword, kubeadminUsername

# Get console URL
az aro show --name myAROCluster --resource-group myRG \
  --query "consoleProfile.url" -o tsv</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">ARO vs AKS</div>
        <div class="code-box">ARO:
  ✅ Full OpenShift with all features
  ✅ Red Hat enterprise support
  ✅ Built-in CI/CD, registry, mesh
  ✅ Lift &amp; shift from on-prem OCP
  ❌ More expensive (OCP license + Azure infra)
  ❌ Less Azure-native integration
  ❌ Slower release cycle

AKS:
  ✅ Azure-native (Entra ID, APIM, Monitor)
  ✅ Cheaper (pay only for VMs)
  ✅ Latest K8s versions quickly
  ✅ Tighter Azure ecosystem integration
  ❌ More configuration needed (security, CI/CD)
  ❌ Community support (unless paid support plan)

Choose ARO: existing Red Hat relationship, compliance
  requiring RHCOS, migrating from on-prem OCP.
Choose AKS: greenfield, Azure-first, cost-sensitive.</div>
      </div>
      <div>
        <div class="ans-label">OpenShift Operators</div>
        <div class="code-box">Operator Pattern: extend K8s with custom controllers.
  Encodes operational knowledge (how to deploy, upgrade, backup).

OperatorHub: marketplace of operators.
  Kafka (Strimzi): deploy/manage Kafka clusters.
  Prometheus: deploy monitoring stack.
  cert-manager: auto-provision TLS certs.
  Vault (HashiCorp): secrets management.

Operator Lifecycle Manager (OLM):
  Manages operator installation, updates.
  Ensures only compatible operator versions run.

# Install an operator via CLI
oc apply -f - &lt;&lt;EOF
apiVersion: operators.coreos.com/v1alpha1
kind: Subscription
metadata:
  name: strimzi-kafka-operator
  namespace: kafka
spec:
  channel: stable
  name: strimzi-kafka-operator
  source: operatorhub
EOF

CRD (Custom Resource Definition):
  Operator adds new K8s resource types.
  e.g., Kafka CRD → "kubectl apply -f kafka.yaml" deploys whole cluster.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">OpenShift vs AKS — When to Choose What</div>
  <div class="ref-body">
    <div class="code-box">Choose OpenShift / ARO when:
  ✅ Enterprise already has Red Hat licensing &amp; support contracts
  ✅ Regulated industry (healthcare, banking) requiring RHCOS immutability + Red Hat CVE SLA
  ✅ Migrating from on-premises OCP to cloud (ARO = same API, same tooling)
  ✅ Team needs built-in developer portal, S2I, pipelines — reduce platform engineering effort
  ✅ Multi-cloud strategy: same OpenShift on AWS/GCP/Azure/on-prem

Choose AKS when:
  ✅ Azure-first / Microsoft shop (Entra ID, APIM, Azure Monitor, Key Vault tight integration)
  ✅ Cost is a constraint — AKS is significantly cheaper than ARO
  ✅ Greenfield — start with just what you need, add components over time
  ✅ Need latest K8s features quickly (AKS tracks upstream faster)
  ✅ Team has K8s expertise but not OpenShift-specific knowledge

Common interview answer:
  "In an enterprise migrating existing OpenShift workloads to Azure, ARO provides
  the least friction — same APIs, same tooling, joint support. For a greenfield
  Azure project, AKS gives better Azure-native integration and lower cost, with
  full control over what we add. Both are Kubernetes under the hood — the trade-off
  is between a rich platform (OpenShift) and a composable foundation (AKS)."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Interview Summary — Architect-Level Answer</div>
  <div class="ref-body">
    <div class="code-box">Q: How do you design a production-grade AKS setup?

A: Control Plane managed by Microsoft — I focus on the data plane.

   Node Pools: system pool (control workloads) + user pool (app workloads).
   Separate pools for GPU or memory-optimized workloads using taints.

   Networking: Private cluster. Ingress controller for external traffic.
   Network Policies to restrict pod-to-pod communication.

   Identity: Workload Identity for pods to access Key Vault, SQL, Storage.
   No secrets stored in Kubernetes Secrets or environment variables.

   Scaling: HPA for CPU-bound services, KEDA for queue-driven services,
   Cluster Autoscaler adds nodes when pods can't schedule.

   Deployments: Canary strategy with automated rollback.
   Every pod has liveness + readiness probes.

   Observability: OpenTelemetry for traces, Prometheus for metrics,
   Application Insights for logs. All wired to Grafana dashboards.</div>
  </div>
</div>
`;
