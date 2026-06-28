window.Pages = window.Pages || {};
window.Pages['cts'] = `
  <div class="page-header">
    <div class="breadcrumb">Home › <span>CTS (Cognizant)</span></div>
    <h1>💼 CTS Interview</h1>
    <p>Azure Key Vault · Blob Security · Private Endpoints · Terraform · AKS · Networking · SAS Tokens</p>
  </div>
  <div class="alert" style="margin-bottom:20px;">
    <strong>⚠️ Outcome Note</strong>
    <p>Half the questions were not answered well in the actual interview. Focus especially on: Workload Identity, Managed Identity, Private Endpoints, Terraform state, Istio, SAS vs RBAC.</p>
  </div>
  <div class="qa-list">

    <div class="qa-card">
      <div class="qa-num">Q1</div>
      <div class="qa-body">
        <div class="qa-question">What are the ways to authenticate to Azure Key Vault?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">1. Azure RBAC (Recommended)</div><p>Assign roles: Key Vault Secrets User, Key Vault Administrator</p></div>
          <div class="ans-block"><div class="ans-label">2. Managed Identity</div><ul><li>System Assigned Managed Identity</li><li>User Assigned Managed Identity</li></ul></div>
          <div class="ans-block"><div class="ans-label">3. AKS Workload Identity (Best for AKS)</div><p>Kubernetes Service Account mapped to Azure Managed Identity — no secrets stored anywhere.</p></div>
          <div class="ans-block"><div class="ans-label">4. Service Principal</div><div class="code-box">Client ID + Client Secret → authenticate to Key Vault
// Use only when Managed Identity is not available</div></div>
          <div class="warn-box">⚠️ Legacy Access Policies are being replaced by Azure RBAC. Prefer RBAC.</div>
          <div class="tip-box">✅ Best: Azure RBAC + Managed Identity + AKS Workload Identity</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q2</div>
      <div class="qa-body">
        <div class="qa-question">I have sensitive information in Blob Storage — how do you protect it?</div>
        <div class="qa-answer">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="ans-block"><div class="ans-label">Network Security</div><ul><li>Private Endpoint — no public access</li><li>Storage Firewall — restrict by IP/VNet</li><li>Disable Public Access</li></ul></div>
            <div class="ans-block"><div class="ans-label">Identity &amp; Access</div><ul><li>RBAC Authorization</li><li>Managed Identity</li><li>User Delegation SAS</li></ul></div>
            <div class="ans-block"><div class="ans-label">Data Protection</div><ul><li>Encryption at Rest (default)</li><li>Customer Managed Keys (CMK)</li><li>Soft Delete + Versioning</li><li>Immutable Blob Storage</li></ul></div>
            <div class="ans-block"><div class="ans-label">Monitoring</div><ul><li>Microsoft Defender for Storage</li><li>Azure Monitor + Alerts</li></ul></div>
          </div>
          <div class="tip-box">✅ Best Answer: Private Endpoint + RBAC + Managed Identity + Firewall + Encryption + Disable Public Access</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q3</div>
      <div class="qa-body">
        <div class="qa-question">What is a Private Endpoint?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Definition</div><p>Private Endpoint assigns a <strong>private IP address from inside your VNet</strong> to an Azure service, so traffic never goes through the public internet.</p></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="ans-block"><div class="ans-label">Without Private Endpoint</div>
              <div class="flow-box compact"><div class="flow-step">Application</div><div class="flow-arrow">↓</div><div class="flow-step red">Public Internet</div><div class="flow-arrow">↓</div><div class="flow-step">Storage Account</div></div>
            </div>
            <div class="ans-block"><div class="ans-label">With Private Endpoint</div>
              <div class="flow-box compact"><div class="flow-step">Application</div><div class="flow-arrow">↓</div><div class="flow-step green">Private IP (10.0.1.5)</div><div class="flow-arrow">↓</div><div class="flow-step">Storage Account</div></div>
            </div>
          </div>
          <div class="tip-box">✅ Private Endpoint = private IP inside VNet → no internet exposure</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q4</div>
      <div class="qa-body">
        <div class="qa-question">What are the steps to run an Infrastructure Pipeline in Azure DevOps (Terraform)?</div>
        <div class="qa-answer">
          <div class="flow-box">
            <div class="flow-step">Developer commits Terraform code</div><div class="flow-arrow">↓</div>
            <div class="flow-step blue">terraform init — initialize backend &amp; providers</div><div class="flow-arrow">↓</div>
            <div class="flow-step blue">terraform validate — check syntax</div><div class="flow-arrow">↓</div>
            <div class="flow-step blue">terraform fmt — format check</div><div class="flow-arrow">↓</div>
            <div class="flow-step blue">terraform plan — show what will change</div><div class="flow-arrow">↓</div>
            <div class="flow-step">Manual Approval Gate</div><div class="flow-arrow">↓</div>
            <div class="flow-step green">terraform apply — create/update infrastructure</div>
          </div>
          <div class="tip-box">✅ Always store state remotely and require approval before apply in production.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q5</div>
      <div class="qa-body">
        <div class="qa-question">Where is the Terraform state file stored? What happens if it's lost?</div>
        <div class="qa-answer">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="ans-block"><div class="ans-label">Local (Development only)</div><div class="code-box">terraform.tfstate  // local file</div></div>
            <div class="ans-block"><div class="ans-label">Remote Backend (Production)</div><div class="code-box">Azure Storage Account
→ Blob Container
→ terraform.tfstate
// Supports locking, sharing, backup</div></div>
          </div>
          <div class="ans-block"><div class="ans-label">If State File is Lost</div><ul>
            <li>Terraform loses knowledge of existing resources</li>
            <li>Next terraform apply thinks resources don't exist</li>
            <li>Tries to recreate — gets <strong>"resource already exists" errors</strong></li>
          </ul></div>
          <div class="tip-box">✅ State = source of truth for Terraform. Always use remote backend with state locking.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q6</div>
      <div class="qa-body">
        <div class="qa-question">What Service Meshes are commonly used?</div>
        <div class="qa-answer">
          <div class="tag-grid"><span class="tag blue">Istio (most popular)</span><span class="tag blue">Linkerd</span><span class="tag blue">Consul Connect</span><span class="tag blue">Kuma</span></div>
          <div class="ans-block" style="margin-top:12px;"><div class="ans-label">Istio Features</div><ul>
            <li>mTLS — mutual TLS between services</li>
            <li>Traffic routing — canary, A/B testing</li>
            <li>Retry + Circuit Breaker</li>
            <li>Observability — metrics, traces, logs</li>
            <li>Authorization Policies</li>
          </ul></div>
          <div class="tip-box">✅ Istio is the most widely used service mesh. It handles East-West (service-to-service) traffic.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q7</div>
      <div class="qa-body">
        <div class="qa-question">How do you expose a service hosted in AKS to the outside world?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Option 1 — LoadBalancer Service</div><div class="flow-box compact"><div class="flow-step">Internet → Azure Load Balancer → AKS Service → Pods</div></div></div>
          <div class="ans-block"><div class="ans-label">Option 2 — Ingress Controller (Recommended)</div><div class="flow-box compact"><div class="flow-step">Internet → NGINX Ingress → Route by path → Multiple Services</div></div></div>
          <div class="ans-block"><div class="ans-label">Option 3 — API Gateway</div><div class="flow-box compact"><div class="flow-step">Internet → Azure API Management / Kong → Services</div></div></div>
          <div class="tip-box">✅ Recommended: Ingress Controller or API Gateway. LoadBalancer for simple cases only.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q8</div>
      <div class="qa-body">
        <div class="qa-question">What is Workload Identity in AKS?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Workload Identity (New Approach)</div>
            <div class="flow-box">
              <div class="flow-step">Pod</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Kubernetes Service Account</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Workload Identity (mapped to Azure Managed Identity)</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">Azure Resource — no secrets stored anywhere</div>
            </div>
          </div>
          <div class="tip-box">✅ Workload Identity = K8s Service Account + Azure Managed Identity. Zero secrets.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q9</div>
      <div class="qa-body">
        <div class="qa-question">What is a Subnet? What is a Private IP vs Public IP?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Subnet</div>
            <div class="code-box">VNet: 10.0.0.0/16
├── Subnet-A: 10.0.1.0/24  (AKS nodes)
└── Subnet-B: 10.0.2.0/24  (Databases)</div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="ans-block"><div class="ans-label">Private IP</div><div class="code-box">10.0.0.0 – 10.255.255.255
172.16.0.0 – 172.31.255.255
192.168.0.0 – 192.168.255.255</div></div>
            <div class="ans-block"><div class="ans-label">Public IP</div><div class="code-box">Example: 20.50.80.100</div></div>
          </div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q10</div>
      <div class="qa-body">
        <div class="qa-question">If the Storage Account Access Key is deleted, can you still create a SAS token?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Depends on SAS Type</div><ul>
            <li><strong>Service SAS</strong> — uses Storage Account Key → ❌ Cannot create if key deleted</li>
            <li><strong>Account SAS</strong> — uses Storage Account Key → ❌ Cannot create if key deleted</li>
            <li><strong>User Delegation SAS</strong> — uses Azure AD Authentication → ✅ Works even without access key</li>
          </ul></div>
          <div class="tip-box">✅ User Delegation SAS uses Azure AD — works even when access keys are disabled/deleted.</div>
        </div>
      </div>
    </div>

  </div>
`;
