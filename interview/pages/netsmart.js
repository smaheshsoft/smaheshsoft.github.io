window.Pages = window.Pages || {};
window.Pages['netsmart'] = `
  <div class="page-header">
    <div class="breadcrumb">Home › <span>Netsmart</span></div>
    <h1>🏥 Netsmart Interview</h1>
    <p>EY Project Architecture · Azure Functions in Containers · KEDA Auto-scaling · RDBMS vs NoSQL · CAP Theorem · Multi-Tenant</p>
  </div>
  <div class="alert" style="margin-bottom:20px;">
    <strong>⚠️ Outcome Note</strong>
    <p>Concepts were not explained properly — not prepared well with details. Focus on KEDA, multi-tenancy approaches, and cloud-native architecture patterns.</p>
  </div>
  <div class="qa-list">

    <div class="qa-card">
      <div class="qa-num">Q1</div>
      <div class="qa-body">
        <div class="qa-question">Explain your EY Project — architecture and your role</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Architecture Overview</div>
            <div class="flow-box">
              <div class="flow-step">UI (Angular/React)</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Azure API Management / NGINX Ingress</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Microservices (.NET) on AKS Cluster</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Azure SQL / PostgreSQL + Azure Storage + Key Vault</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">Azure Service Bus / Event Hub for async processing</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Key Components Used</div>
            <div class="tag-grid">
              <span class="tag blue">AKS</span><span class="tag blue">Azure DevOps CI/CD</span>
              <span class="tag blue">Terraform IaC</span><span class="tag blue">Key Vault</span>
              <span class="tag blue">Application Insights</span><span class="tag blue">SonarQube</span>
              <span class="tag blue">Trivy</span><span class="tag blue">CodeQL</span>
            </div>
          </div>
          <div class="tip-box">✅ Always explain: Business Problem → Architecture → Tech Stack → Your Contribution</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q2</div>
      <div class="qa-body">
        <div class="qa-question">How can Azure Functions be used from inside containers?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Architecture</div>
            <div class="flow-box">
              <div class="flow-step">Event Hub / Service Bus trigger</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Azure Function packaged as Docker container</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Deployed to AKS</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">Processes events → writes to Database</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Benefits</div><ul>
            <li>Full control over runtime and dependencies</li>
            <li>Portable — runs on-prem or any cloud</li>
            <li>Kubernetes deployment with KEDA scaling</li>
          </ul></div>
          <div class="tip-box">✅ Azure Functions in containers = portability + Kubernetes scaling + event-driven triggers</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q3</div>
      <div class="qa-body">
        <div class="qa-question">How does auto-scaling work in containers based on message volume? HPA vs KEDA?</div>
        <div class="qa-answer">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="ans-block"><div class="ans-label">HPA — Horizontal Pod Autoscaler</div><ul><li>Scales based on CPU or Memory</li><li>Reacts after load is already high</li></ul><div class="code-box">CPU &gt; 70% → add pods</div></div>
            <div class="ans-block"><div class="ans-label">KEDA — Kubernetes Event Driven Autoscaler</div><ul><li>Scales based on queue/topic length</li><li>Proactive — reacts to message backlog</li><li>Can scale to zero when idle</li></ul><div class="code-box">Queue = 10,000 msgs → 20 pods
Queue = 0 msgs → 0 pods</div></div>
          </div>
          <div class="tip-box">✅ For message-driven workloads: always use KEDA. It scales from queue length, not CPU.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q4</div>
      <div class="qa-body">
        <div class="qa-question">RDBMS vs NoSQL — when do you choose each?</div>
        <div class="qa-answer">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="ans-block"><div class="ans-label">Choose RDBMS when</div><ul><li>Strong consistency required</li><li>ACID transactions needed</li><li>Complex joins and reporting</li></ul></div>
            <div class="ans-block"><div class="ans-label">Choose NoSQL when</div><ul><li>Flexible / evolving schema</li><li>Massive horizontal scale</li><li>High-volume write workloads</li></ul></div>
          </div>
          <div class="tip-box">✅ Choose RDBMS for consistency + transactions. Choose NoSQL for scale + flexibility.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q5</div>
      <div class="qa-body">
        <div class="qa-question">CAP Theorem — how do SQL and NoSQL compare?</div>
        <div class="qa-answer">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="ans-block"><div class="ans-label">RDBMS — usually CP</div><ul><li>Consistency + Partition Tolerance</li><li>May be unavailable during failures</li><li>Use case: Bank transfer</li></ul></div>
            <div class="ans-block"><div class="ans-label">NoSQL — usually AP</div><ul><li>Availability + Partition Tolerance</li><li>May return eventually consistent data</li><li>Use case: Social media likes count</li></ul></div>
          </div>
          <div class="tip-box">✅ SQL = CP (consistency first). NoSQL = AP (availability first). But modern DBs are configurable.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q6</div>
      <div class="qa-body">
        <div class="qa-question">What is Multi-Tenant Architecture and how do you configure it?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">3 Approaches</div>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
              <div class="ans-block"><div class="ans-label">Shared DB + Shared Table</div><div class="code-box">WHERE TenantId = @Id</div><p style="font-size:12px;color:#16a34a;margin-top:4px;">✅ Cheapest</p></div>
              <div class="ans-block"><div class="ans-label">Shared DB + Separate Schema</div><div class="code-box">TenantA.Orders
TenantB.Orders</div><p style="font-size:12px;color:#16a34a;margin-top:4px;">✅ Better isolation</p></div>
              <div class="ans-block"><div class="ans-label">Separate DB per Tenant</div><div class="code-box">DB-TenantA
DB-TenantB</div><p style="font-size:12px;color:#16a34a;margin-top:4px;">✅ Full isolation</p></div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Tenant Identification Options</div>
            <div class="code-box">1. JWT Claim:   { "tenantId": "EY" }
2. Subdomain:   ey.company.com
3. HTTP Header: X-Tenant-Id: EY</div>
          </div>
          <div class="tip-box">✅ Multi-tenancy: shared app, isolated data. Identify tenant via JWT → filter every query.</div>
        </div>
      </div>
    </div>

  </div>
`;
