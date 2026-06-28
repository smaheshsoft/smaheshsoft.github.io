window.Pages['ref-azure-security'] = `
<div class="page-header">
  <div class="breadcrumb">Architect Reference › <span>Azure Security</span></div>
  <h1>🔐 Azure Security Architecture</h1>
  <p>Identity · Key Vault · Networking · Encryption · Zero Trust — complete architect reference</p>
</div>

<div class="ref-section">
  <div class="ref-title">Zero Trust Security Model</div>
  <div class="ref-body">
    <p>Traditional security: "trust everything inside the network." Zero Trust: <strong>"Never trust, always verify"</strong> — every request is authenticated and authorized regardless of where it originates.</p>
    <div class="code-box">Zero Trust Principles:
1. Verify explicitly       — always authenticate &amp; authorize (identity, location, device)
2. Use least privilege     — just-in-time, just-enough-access (JIT/JEA)
3. Assume breach           — minimize blast radius, segment access, encrypt everything

In Azure:
  Identity → Azure AD / Entra ID (verify who)
  Device   → Intune / Conditional Access (verify what device)
  Network  → Private Endpoints, NSG, Firewall (verify where from)
  App      → RBAC, Managed Identity (verify what it can do)
  Data     → Encryption at rest + in transit (protect the data itself)</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Identity &amp; Access — Managed Identity vs Service Principal vs Workload Identity</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Type</div><div>What it is</div><div>Use When</div><div>Secrets Needed?</div></div>
      <div class="pt-row"><div class="pt-name">System-Assigned Managed Identity</div><div>Identity tied to one Azure resource lifecycle</div><div>VM, App Service, Function accessing Key Vault</div><div class="dt-no">No</div></div>
      <div class="pt-row"><div class="pt-name">User-Assigned Managed Identity</div><div>Standalone identity, reusable across resources</div><div>Multiple services sharing same identity</div><div class="dt-no">No</div></div>
      <div class="pt-row"><div class="pt-name">Workload Identity (AKS)</div><div>Maps K8s Service Account to Managed Identity</div><div>AKS pods accessing Azure resources</div><div class="dt-no">No</div></div>
      <div class="pt-row"><div class="pt-name">Service Principal</div><div>App identity with client ID + secret/cert</div><div>When Managed Identity not available (on-prem, GitHub Actions)</div><div class="dt-yes">Yes (rotate often)</div></div>
    </div>
    <div class="tip-box" style="margin-top:12px;">✅ Architect Rule: Always prefer Managed Identity / Workload Identity. Use Service Principal only as last resort.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Azure Key Vault — Architecture &amp; Best Practices</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">What Key Vault Stores</div>
        <ul>
          <li><strong>Secrets</strong> — DB connection strings, API keys, passwords</li>
          <li><strong>Keys</strong> — encryption keys for data (CMK)</li>
          <li><strong>Certificates</strong> — TLS/SSL certificates with auto-renewal</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Authentication Methods (Priority Order)</div>
        <ol>
          <li>Workload Identity (AKS) ← best</li>
          <li>Managed Identity (VM/App Service) ← best</li>
          <li>Service Principal + Certificate ← acceptable</li>
          <li>Service Principal + Secret ← rotate regularly</li>
          <li>Access Policies ← legacy, avoid</li>
        </ol>
      </div>
      <div>
        <div class="ans-label">Access Pattern in AKS</div>
        <div class="code-box">Pod
 ↓ (uses Service Account)
Workload Identity
 ↓ (federated credential)
Azure AD
 ↓ (RBAC: Key Vault Secrets User)
Key Vault
 ↓
Secret Value → injected as env var
             or mounted as volume</div>
        <div class="ans-label" style="margin-top:12px;">CSI Driver (Mount as File)</div>
        <div class="code-box">SecretProviderClass → mounts
Key Vault secrets as files inside pod.
Auto-refreshes on rotation.</div>
      </div>
    </div>
    <div class="warn-box" style="margin-top:12px;">⚠️ Never store secrets in: source code · Dockerfile · K8s ConfigMaps · environment variables in YAML · appsettings.json committed to git</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Network Security — Private Endpoint, VNet, NSG, Firewall</div>
  <div class="ref-body">
    <div class="code-box">Layered Network Security (Defence in Depth):

Internet
   ↓
Azure DDoS Protection
   ↓
Azure Front Door + WAF (Web Application Firewall)
   ↓
Azure Firewall (Layer 4 + Layer 7)
   ↓
Network Security Group — NSG (allow/deny rules per subnet)
   ↓
Virtual Network (VNet)
   ↓
Subnet-A (AKS)     Subnet-B (DB)     Subnet-C (Storage)
   ↓                    ↓                  ↓
AKS Pods         Private Endpoint    Private Endpoint
                 (Azure SQL)         (Blob Storage)</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Private Endpoint</div>
        <p>Assigns private IP from your VNet to an Azure PaaS service. Traffic stays on Microsoft backbone — never touches public internet.</p>
        <div class="code-box">Storage account gets: 10.0.2.5
Key Vault gets:      10.0.2.6
Azure SQL gets:      10.0.2.7
All accessed via private DNS zone.</div>
      </div>
      <div>
        <div class="ans-label">NSG (Network Security Group)</div>
        <p>Stateful firewall rules on subnet or NIC level. Controls inbound and outbound traffic.</p>
        <div class="code-box">Priority  Direction  Port   Action
100       Inbound    443    Allow  (HTTPS)
200       Inbound    80     Deny
300       Outbound   1433   Allow  (SQL)
65000     Any        *      Deny   (default)</div>
      </div>
    </div>
    <div class="tip-box" style="margin-top:12px;">✅ Private Endpoint + NSG + Disable Public Access = no Azure resource reachable from internet.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Encryption — At Rest, In Transit, Customer Managed Keys</div>
  <div class="ref-body">
    <div class="three-col">
      <div>
        <div class="ans-label">Encryption at Rest</div>
        <p>All Azure storage encrypted at rest by default using AES-256.</p>
        <div class="code-box">Platform Managed Key (PMK)
→ Azure manages keys (default)

Customer Managed Key (CMK)
→ You control keys in Key Vault
→ Required for compliance (HIPAA, PCI)</div>
      </div>
      <div>
        <div class="ans-label">Encryption in Transit</div>
        <p>All Azure services enforce TLS 1.2+ for data in transit.</p>
        <div class="code-box">Client → TLS 1.2+ → Azure Service
Enforce minimum TLS version
  in Storage Account settings.
Disable HTTP on App Service.</div>
      </div>
      <div>
        <div class="ans-label">Double Encryption</div>
        <p>Azure offers infrastructure-level double encryption for highly sensitive data.</p>
        <div class="code-box">Layer 1: Service-level AES-256
Layer 2: Infrastructure AES-256
→ Two independent encryption layers
→ Enable on Storage + Managed Disks</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Azure Blob Storage Security — Complete Checklist</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Control</div><div>What it does</div><div>Priority</div></div>
      <div class="pt-row"><div class="pt-name">Disable Public Access</div><div>Blocks anonymous blob access entirely</div><div class="dt-yes">Must Have</div></div>
      <div class="pt-row"><div class="pt-name">Private Endpoint</div><div>Traffic via VNet only, no internet</div><div class="dt-yes">Must Have</div></div>
      <div class="pt-row"><div class="pt-name">Storage Firewall</div><div>Allow only specific VNets/IPs</div><div class="dt-yes">Must Have</div></div>
      <div class="pt-row"><div class="pt-name">RBAC + Managed Identity</div><div>Identity-based access, no keys</div><div class="dt-yes">Must Have</div></div>
      <div class="pt-row"><div class="pt-name">Encryption at Rest (AES-256)</div><div>Default — always on</div><div class="dt-yes">Always On</div></div>
      <div class="pt-row"><div class="pt-name">Soft Delete + Versioning</div><div>Recover accidentally deleted blobs</div><div>High</div></div>
      <div class="pt-row"><div class="pt-name">Immutable Storage</div><div>WORM — write once read many (compliance)</div><div>For compliance</div></div>
      <div class="pt-row"><div class="pt-name">Defender for Storage</div><div>Malware scanning, threat alerts</div><div>High</div></div>
      <div class="pt-row"><div class="pt-name">User Delegation SAS</div><div>SAS using Azure AD — works without access keys</div><div>Use over key-based SAS</div></div>
      <div class="pt-row"><div class="pt-name">Disable Storage Account Keys</div><div>Force all access through Azure AD</div><div>Best Practice</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">OAuth2 &amp; OpenID Connect — Auth Architecture</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">OAuth2 — Authorization</div>
        <div class="code-box">User grants app permission to act on their behalf.
Produces: Access Token (JWT)

Flow (Authorization Code + PKCE):
User → Login → Azure AD
Azure AD → Authorization Code
App → exchanges code for Access Token
App → calls API with Bearer token</div>
      </div>
      <div>
        <div class="ans-label">OpenID Connect — Authentication</div>
        <div class="code-box">Extends OAuth2.
Produces: ID Token (who you are) + Access Token

ID Token contains:
{
  "sub": "user-id",
  "name": "Mahesh",
  "email": "m@company.com",
  "roles": ["Admin"],
  "tenantId": "EY"
}</div>
      </div>
    </div>
    <div class="ans-label" style="margin-top:14px;">Token Validation Flow in API</div>
    <div class="code-box">Request with Bearer Token
   ↓
API Middleware validates:
   - Signature (signed by Azure AD?)
   - Expiry (not expired?)
   - Audience (aud = this API?)
   - Issuer (iss = our Azure AD tenant?)
   ↓
Extract claims: roles, tenantId, userId
   ↓
Authorize: does this role allow this action?</div>
    <div class="warn-box" style="margin-top:10px;">⚠️ Never store access tokens in localStorage — XSS can steal them. Use memory or httpOnly cookies.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Interview Summary — Architect-Level Answer</div>
  <div class="ref-body">
    <div class="code-box">Q: How do you secure an Azure cloud application end-to-end?

A: I apply Zero Trust — verify every request, least privilege everywhere.

   Identity:  Managed Identity for all Azure services.
              Workload Identity for AKS pods.
              No secrets in code or config files — all from Key Vault.

   Network:   Private Endpoints for all PaaS services (SQL, Storage, Key Vault).
              NSG rules on every subnet.
              WAF in front of public endpoints.
              Disable all public access on storage and databases.

   Encryption: AES-256 at rest (default). TLS 1.2+ in transit.
               Customer Managed Keys for regulated data.

   Auth:      OAuth2 + OIDC via Azure AD.
              JWT validated at API Gateway — roles enforced per service.

   Monitoring: Defender for Cloud, Defender for Storage.
               Azure Monitor + alerts on anomalous access patterns.</div>
  </div>
</div>
`;
