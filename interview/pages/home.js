window.Pages = window.Pages || {};
window.Pages['home'] = `
  <div class="page-header">
    <div class="breadcrumb">Interview Prep</div>
    <h1>Welcome, Mahesh 👋</h1>
    <p>Your complete interview preparation guide — organized by company, round, and topic.</p>
  </div>

  <div class="stats-bar">
    <div class="stat-box"><div class="num">6</div><div class="label">Companies</div></div>
    <div class="stat-box"><div class="num">73+</div><div class="label">Questions</div></div>
    <div class="stat-box"><div class="num">9</div><div class="label">Rounds</div></div>
    <div class="stat-box"><div class="num">10</div><div class="label">Ref Topics</div></div>
    <div class="stat-box"><div class="num">50+</div><div class="label">Topics</div></div>
  </div>

  <div class="alert tip">
    <strong>💡 How to use this guide</strong>
    <p>Click any company card below or use the sidebar to navigate. Each section has the original interview questions with detailed answers. Study topic-by-topic before your next round.</p>
  </div>

  <div class="card-grid">
    <div class="card" onclick="showPage('wellsfargo', document.querySelector('[onclick*=wellsfargo]'))">
      <div class="card-icon">🏦</div>
      <h3>Wells Fargo</h3>
      <p>Principal Engineer / Microservices / AKS. Service mesh, auth, CAP theorem, distributed transactions.</p>
      <div class="card-meta">
        <span class="tag blue">15 Questions</span><span class="tag">AKS</span>
        <span class="tag">Microservices</span><span class="tag">Kubernetes</span>
      </div>
    </div>
    <div class="card" onclick="showPage('alstom1', document.querySelector('[onclick*=alstom1]'))">
      <div class="card-icon">🚄</div>
      <h3>Alstom – Round 1</h3>
      <p>Builder pattern, HTTPS/TLS, certificates, symmetric vs asymmetric encryption, DevOps, High Availability.</p>
      <div class="card-meta">
        <span class="tag blue">6 Questions</span><span class="tag">Design Patterns</span><span class="tag">Security</span>
      </div>
    </div>
    <div class="card" onclick="showPage('alstom2', document.querySelector('[onclick*=alstom2]'))">
      <div class="card-icon">🚄</div>
      <h3>Alstom – Round 2</h3>
      <p>CORS, high-volume inserts, batch processing, large file uploads, JSON storage decision — PostgreSQL vs MongoDB vs Redis.</p>
      <div class="card-meta">
        <span class="tag blue">4 Questions</span><span class="tag">Architecture</span><span class="tag">Database</span>
      </div>
    </div>
    <div class="card" onclick="showPage('bosch', document.querySelector('[onclick*=bosch]'))">
      <div class="card-icon">⚙️</div>
      <h3>Bosch</h3>
      <p>Clean architecture, monolithic to microservices migration, system design, application performance improvements.</p>
      <div class="card-meta">
        <span class="tag blue">8 Questions</span><span class="tag">System Design</span><span class="tag">Migration</span>
      </div>
    </div>
    <div class="card" onclick="showPage('cts', document.querySelector('[onclick*=cts]'))">
      <div class="card-icon">💼</div>
      <h3>CTS (Cognizant)</h3>
      <p>Azure Key Vault auth, Blob storage protection, private endpoints, Terraform state, Workload Identity, AKS networking.</p>
      <div class="card-meta">
        <span class="tag blue">14 Questions</span><span class="tag">Azure Security</span><span class="tag">Terraform</span>
      </div>
    </div>
    <div class="card" onclick="showPage('netsmart', document.querySelector('[onclick*=netsmart]'))">
      <div class="card-icon">🏥</div>
      <h3>Netsmart</h3>
      <p>EY project architecture, Azure Functions in containers, KEDA auto-scaling, CAP theorem, multi-tenant architecture.</p>
      <div class="card-meta">
        <span class="tag blue">6 Questions</span><span class="tag">KEDA</span><span class="tag">Multi-Tenant</span>
      </div>
    </div>
    <div class="card" onclick="showPage('wipro', document.querySelector('[onclick*=wipro]'))">
      <div class="card-icon">🔷</div>
      <h3>Wipro</h3>
      <p>URL shortener design, Saga pattern, State machine, DevSecOps, VM migration (6R), Micro Frontend, Angular NgRx.</p>
      <div class="card-meta">
        <span class="tag blue">20 Questions</span><span class="tag">Architect Level</span>
        <span class="tag">Frontend</span><span class="tag">Cloud Migration</span>
      </div>
    </div>
  </div>

  <div class="page-header" style="margin-top:32px;margin-bottom:16px;">
    <h1 style="font-size:20px;">📐 Architect Reference Topics</h1>
    <p>Deep-dive reference material for each domain — principles, patterns, decision frameworks, code examples</p>
  </div>

  <div class="card-grid">
    <div class="card" onclick="showPage('ref-microservices', document.querySelector('[onclick*=ref-microservices]'))">
      <div class="card-icon">🧩</div><h3>Microservices Architecture</h3>
      <p>Principles, communication patterns, Saga deep dive, observability, when NOT to use microservices.</p>
      <div class="card-meta"><span class="tag blue">Saga</span><span class="tag blue">CQRS</span><span class="tag blue">Patterns</span></div>
    </div>
    <div class="card" onclick="showPage('ref-kubernetes', document.querySelector('[onclick*=ref-kubernetes]'))">
      <div class="card-icon">☸️</div><h3>Kubernetes &amp; AKS</h3>
      <p>Control plane, scheduling, networking, HPA vs KEDA, deployment strategies, AKS security.</p>
      <div class="card-meta"><span class="tag blue">AKS</span><span class="tag blue">KEDA</span><span class="tag blue">Canary</span></div>
    </div>
    <div class="card" onclick="showPage('ref-azure-security', document.querySelector('[onclick*=ref-azure-security]'))">
      <div class="card-icon">🔐</div><h3>Azure Security</h3>
      <p>Zero Trust, Managed Identity, Key Vault, Private Endpoints, Blob security, OAuth2 &amp; OIDC.</p>
      <div class="card-meta"><span class="tag blue">Zero Trust</span><span class="tag blue">Key Vault</span><span class="tag blue">RBAC</span></div>
    </div>
    <div class="card" onclick="showPage('ref-database', document.querySelector('[onclick*=ref-database]'))">
      <div class="card-icon">🗄️</div><h3>Database Architecture</h3>
      <p>SQL vs NoSQL decision matrix, CAP theorem deep dive, replication, partitioning, CQRS.</p>
      <div class="card-meta"><span class="tag blue">CAP</span><span class="tag blue">CQRS</span><span class="tag blue">Sharding</span></div>
    </div>
    <div class="card" onclick="showPage('ref-eventdriven', document.querySelector('[onclick*=ref-eventdriven]'))">
      <div class="card-icon">⚡</div><h3>Event-Driven &amp; Messaging</h3>
      <p>Kafka vs Service Bus vs Event Hub, batch processing, KEDA scaling, DLQ, Outbox pattern.</p>
      <div class="card-meta"><span class="tag blue">Kafka</span><span class="tag blue">KEDA</span><span class="tag blue">Outbox</span></div>
    </div>
    <div class="card" onclick="showPage('ref-patterns', document.querySelector('[onclick*=ref-patterns]'))">
      <div class="card-icon">🧱</div><h3>Design Patterns</h3>
      <p>Builder, Strategy, Observer, State, Command, Circuit Breaker, Saga, SOLID principles.</p>
      <div class="card-meta"><span class="tag blue">SOLID</span><span class="tag blue">GoF</span><span class="tag blue">Microservice</span></div>
    </div>
    <div class="card" onclick="showPage('ref-devops', document.querySelector('[onclick*=ref-devops]'))">
      <div class="card-icon">🚀</div><h3>CI/CD &amp; DevSecOps</h3>
      <p>Pipeline design, security gates (SonarQube, Trivy, CodeQL), Terraform, monitoring, golden signals.</p>
      <div class="card-meta"><span class="tag blue">DevSecOps</span><span class="tag blue">Terraform</span><span class="tag blue">Canary</span></div>
    </div>
    <div class="card" onclick="showPage('ref-frontend', document.querySelector('[onclick*=ref-frontend]'))">
      <div class="card-icon">🎨</div><h3>Frontend Architecture</h3>
      <p>Micro Frontend, Module Federation, NgRx, MSAL auth, CORS, performance checklist, common issues.</p>
      <div class="card-meta"><span class="tag blue">Micro Frontend</span><span class="tag blue">NgRx</span><span class="tag blue">MSAL</span></div>
    </div>
    <div class="card" onclick="showPage('ref-systemdesign', document.querySelector('[onclick*=ref-systemdesign]'))">
      <div class="card-icon">🏛️</div><h3>System Design</h3>
      <p>Architect thinking framework, URL shortener, Swiggy design, dashboard design, HA, multi-tenant matrix.</p>
      <div class="card-meta"><span class="tag blue">HA</span><span class="tag blue">Scale</span><span class="tag blue">Multi-Tenant</span></div>
    </div>
    <div class="card" onclick="showPage('ref-migration', document.querySelector('[onclick*=ref-migration]'))">
      <div class="card-icon">☁️</div><h3>Cloud Migration</h3>
      <p>6R framework, 50 VM assessment, Strangler Fig pattern, Azure Landing Zone, cost optimisation.</p>
      <div class="card-meta"><span class="tag blue">6R</span><span class="tag blue">Landing Zone</span><span class="tag blue">Cost</span></div>
    </div>
  </div>

  <div class="alert" style="margin-top:24px;">
    <strong>⚠️ Key Feedback from Interviewers</strong>
    <p>
      <strong>Bosch:</strong> Focus on architecture-level answers, not just code fixes.<br>
      <strong>CTS:</strong> Strengthen Workload Identity, Private Endpoints, Terraform state management.<br>
      <strong>Netsmart:</strong> Prepare KEDA, multi-tenancy, and cloud-native patterns in depth.<br>
      <strong>Wipro:</strong> Brush up on architecture concepts — system design, event-driven, micro frontend.
    </p>
  </div>
`;
