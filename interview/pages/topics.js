window.Pages['topics'] = `
<div class="page-header">
  <div class="breadcrumb">Home › <span>All Topics</span></div>
  <h1>📚 All Topics Index</h1>
  <p>Quick reference — click any topic to jump to the relevant section</p>
</div>

<div class="topic-section">
  <div class="topic-section-title">☁️ Azure &amp; Cloud</div>
  <div class="topic-grid">
    <div class="topic-item" onclick="showPage('cts',document.querySelector('[onclick*=cts]'))">Key Vault Authentication Methods</div>
    <div class="topic-item" onclick="showPage('cts',document.querySelector('[onclick*=cts]'))">Blob Storage Protection</div>
    <div class="topic-item" onclick="showPage('cts',document.querySelector('[onclick*=cts]'))">Private Endpoint</div>
    <div class="topic-item" onclick="showPage('cts',document.querySelector('[onclick*=cts]'))">Workload Identity in AKS</div>
    <div class="topic-item" onclick="showPage('cts',document.querySelector('[onclick*=cts]'))">Managed Identity</div>
    <div class="topic-item" onclick="showPage('cts',document.querySelector('[onclick*=cts]'))">SAS Tokens vs RBAC</div>
    <div class="topic-item" onclick="showPage('netsmart',document.querySelector('[onclick*=netsmart]'))">Azure Functions in Containers</div>
    <div class="topic-item" onclick="showPage('wipro',document.querySelector('[onclick*=wipro]'))">VM Migration — 6R Strategy</div>
  </div>
</div>

<div class="topic-section">
  <div class="topic-section-title">☸️ Kubernetes &amp; AKS</div>
  <div class="topic-grid">
    <div class="topic-item" onclick="showPage('wellsfargo',document.querySelector('[onclick*=wellsfargo]'))">Service-to-Service Communication</div>
    <div class="topic-item" onclick="showPage('wellsfargo',document.querySelector('[onclick*=wellsfargo]'))">Authentication in K8s</div>
    <div class="topic-item" onclick="showPage('wellsfargo',document.querySelector('[onclick*=wellsfargo]'))">Protect Services in K8s</div>
    <div class="topic-item" onclick="showPage('wellsfargo',document.querySelector('[onclick*=wellsfargo]'))">HPA vs KEDA</div>
    <div class="topic-item" onclick="showPage('netsmart',document.querySelector('[onclick*=netsmart]'))">KEDA Auto-scaling</div>
    <div class="topic-item" onclick="showPage('wellsfargo',document.querySelector('[onclick*=wellsfargo]'))">etcd — Pod Node Assignment</div>
    <div class="topic-item" onclick="showPage('cts',document.querySelector('[onclick*=cts]'))">Expose AKS Service Externally</div>
    <div class="topic-item" onclick="showPage('cts',document.querySelector('[onclick*=cts]'))">Service Mesh (Istio)</div>
  </div>
</div>

<div class="topic-section">
  <div class="topic-section-title">🏗️ Architecture &amp; System Design</div>
  <div class="topic-grid">
    <div class="topic-item" onclick="showPage('bosch',document.querySelector('[onclick*=bosch]'))">Clean Architecture</div>
    <div class="topic-item" onclick="showPage('bosch',document.querySelector('[onclick*=bosch]'))">Monolith → Microservices Migration</div>
    <div class="topic-item" onclick="showPage('bosch',document.querySelector('[onclick*=bosch]'))">Swiggy-style System Design</div>
    <div class="topic-item" onclick="showPage('wipro',document.querySelector('[onclick*=wipro]'))">URL Shortener Design</div>
    <div class="topic-item" onclick="showPage('wipro',document.querySelector('[onclick*=wipro]'))">Saga Pattern</div>
    <div class="topic-item" onclick="showPage('wipro',document.querySelector('[onclick*=wipro]'))">State Machine Pattern</div>
    <div class="topic-item" onclick="showPage('wellsfargo',document.querySelector('[onclick*=wellsfargo]'))">Event-Based vs API-Based Design</div>
    <div class="topic-item" onclick="showPage('wellsfargo',document.querySelector('[onclick*=wellsfargo]'))">Microservice Design Patterns</div>
    <div class="topic-item" onclick="showPage('netsmart',document.querySelector('[onclick*=netsmart]'))">Multi-Tenant Architecture</div>
    <div class="topic-item" onclick="showPage('wellsfargo',document.querySelector('[onclick*=wellsfargo]'))">Distributed Transactions</div>
    <div class="topic-item" onclick="showPage('alstom2',document.querySelector('[onclick*=alstom2]'))">Large File Processing</div>
    <div class="topic-item" onclick="showPage('alstom2',document.querySelector('[onclick*=alstom2]'))">High Volume Insert Optimization</div>
  </div>
</div>

<div class="topic-section">
  <div class="topic-section-title">🗄️ Database &amp; Storage</div>
  <div class="topic-grid">
    <div class="topic-item" onclick="showPage('alstom2',document.querySelector('[onclick*=alstom2]'))">PostgreSQL vs MongoDB vs Redis</div>
    <div class="topic-item" onclick="showPage('netsmart',document.querySelector('[onclick*=netsmart]'))">RDBMS vs NoSQL Decision</div>
    <div class="topic-item" onclick="showPage('wellsfargo',document.querySelector('[onclick*=wellsfargo]'))">CAP Theorem</div>
    <div class="topic-item" onclick="showPage('netsmart',document.querySelector('[onclick*=netsmart]'))">CAP: SQL vs NoSQL Comparison</div>
    <div class="topic-item" onclick="showPage('wipro',document.querySelector('[onclick*=wipro]'))">Data Partitioning</div>
    <div class="topic-item" onclick="showPage('wipro',document.querySelector('[onclick*=wipro]'))">Replicas — HA vs Cost</div>
  </div>
</div>

<div class="topic-section">
  <div class="topic-section-title">🔒 Security</div>
  <div class="topic-grid">
    <div class="topic-item" onclick="showPage('alstom1',document.querySelector('[onclick*=alstom1]'))">HTTPS &amp; TLS Handshake</div>
    <div class="topic-item" onclick="showPage('alstom1',document.querySelector('[onclick*=alstom1]'))">Digital Certificates &amp; CA</div>
    <div class="topic-item" onclick="showPage('alstom1',document.querySelector('[onclick*=alstom1]'))">Symmetric vs Asymmetric Encryption</div>
    <div class="topic-item" onclick="showPage('alstom2',document.querySelector('[onclick*=alstom2]'))">CORS Error Resolution</div>
    <div class="topic-item" onclick="showPage('wipro',document.querySelector('[onclick*=wipro]'))">DevSecOps Pipeline</div>
    <div class="topic-item" onclick="showPage('wellsfargo',document.querySelector('[onclick*=wellsfargo]'))">OAuth2 vs OpenID Connect</div>
    <div class="topic-item" onclick="showPage('cts',document.querySelector('[onclick*=cts]'))">VNet, Subnet, Private IP, Public IP</div>
  </div>
</div>

<div class="topic-section">
  <div class="topic-section-title">⚙️ DevOps &amp; CI/CD</div>
  <div class="topic-grid">
    <div class="topic-item" onclick="showPage('wellsfargo',document.querySelector('[onclick*=wellsfargo]'))">CI/CD Pipeline &amp; Deployment Strategies</div>
    <div class="topic-item" onclick="showPage('alstom1',document.querySelector('[onclick*=alstom1]'))">DevOps &amp; High Availability</div>
    <div class="topic-item" onclick="showPage('cts',document.querySelector('[onclick*=cts]'))">Terraform Pipeline Steps</div>
    <div class="topic-item" onclick="showPage('cts',document.querySelector('[onclick*=cts]'))">Terraform State File</div>
    <div class="topic-item" onclick="showPage('wellsfargo',document.querySelector('[onclick*=wellsfargo]'))">Blue-Green vs Canary Deployment</div>
  </div>
</div>

<div class="topic-section">
  <div class="topic-section-title">🎨 Frontend &amp; Angular</div>
  <div class="topic-grid">
    <div class="topic-item" onclick="showPage('wipro',document.querySelector('[onclick*=wipro]'))">Micro Frontend Architecture</div>
    <div class="topic-item" onclick="showPage('wipro',document.querySelector('[onclick*=wipro]'))">Auth in Micro Frontend</div>
    <div class="topic-item" onclick="showPage('wipro',document.querySelector('[onclick*=wipro]'))">NgRx / Redux State Management</div>
    <div class="topic-item" onclick="showPage('wipro',document.querySelector('[onclick*=wipro]'))">Angular Authentication (MSAL)</div>
    <div class="topic-item" onclick="showPage('wipro',document.querySelector('[onclick*=wipro]'))">UI RBAC Authorization</div>
    <div class="topic-item" onclick="showPage('wipro',document.querySelector('[onclick*=wipro]'))">Dashboard Performance Design</div>
    <div class="topic-item" onclick="showPage('wipro',document.querySelector('[onclick*=wipro]'))">Common UI Issues</div>
  </div>
</div>

<div class="topic-section">
  <div class="topic-section-title">🧱 Design Patterns</div>
  <div class="topic-grid">
    <div class="topic-item" onclick="showPage('alstom1',document.querySelector('[onclick*=alstom1]'))">Builder Pattern</div>
    <div class="topic-item" onclick="showPage('wellsfargo',document.querySelector('[onclick*=wellsfargo]'))">Singleton Pattern Drawbacks</div>
    <div class="topic-item" onclick="showPage('wellsfargo',document.querySelector('[onclick*=wellsfargo]'))">Behavioral Patterns (Strategy, Observer, Command, State)</div>
    <div class="topic-item" onclick="showPage('wellsfargo',document.querySelector('[onclick*=wellsfargo]'))">Microservice Patterns (Circuit Breaker, CQRS, etc.)</div>
    <div class="topic-item" onclick="showPage('bosch',document.querySelector('[onclick*=bosch]'))">Scope vs Transient vs Singleton (DI)</div>
    <div class="topic-item" onclick="showPage('bosch',document.querySelector('[onclick*=bosch]'))">Middleware Pipeline</div>
  </div>
</div>

<div class="alert tip" style="margin-top:24px;">
  <strong>💡 High Priority Topics to Revise</strong>
  <p>
    Based on interviewer feedback across all rounds, these topics need extra attention:<br><br>
    <strong>Architecture:</strong> Saga Pattern · State Machine · Event-Driven Design · Multi-Tenant · Strangler Fig<br>
    <strong>Azure:</strong> Workload Identity · Managed Identity · Private Endpoint · KEDA<br>
    <strong>Frontend:</strong> Micro Frontend · Module Federation · NgRx · MSAL Auth<br>
    <strong>DevOps:</strong> Terraform State · DevSecOps · Canary Deployment<br>
    <strong>Database:</strong> CAP Theorem · SQL vs NoSQL Decision Factors · Data Partitioning
  </p>
</div>
`;
