window.Pages = window.Pages || {};
window.Pages['companies-home'] = `
  <div class="page-header">
    <div class="breadcrumb">Company Rounds</div>
    <h1>Welcome, Mahesh 👋</h1>
    <p>Company interview questions — organized by company and round.</p>
  </div>

  <div class="stats-bar">
    <div class="stat-box"><div class="num">6</div><div class="label">Companies</div></div>
    <div class="stat-box"><div class="num">73+</div><div class="label">Questions</div></div>
    <div class="stat-box"><div class="num">9</div><div class="label">Rounds</div></div>
  </div>

  <div class="alert tip">
    <strong>💡 How to use this page</strong>
    <p>Click any company card below or use the sidebar to open that round's questions. Use “📚 All Topics Index” to jump to a specific topic, or “🏠 Home” to return here.</p>
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
    <div class="card" onclick="showPage('aezion', document.querySelector('[onclick*=aezion]'))">
      <div class="card-icon">🧭</div>
      <h3>Aezion – Round 1</h3>
      <p>SOLID vs patterns, DI internals, service communication patterns, GC &amp; Dispose, MVC vs MVVM, AuthN/AuthZ, MFA, PII/GDPR, data consolidation design.</p>
      <div class="card-meta">
        <span class="tag blue">24 Questions</span><span class="tag">Security</span>
        <span class="tag">.NET Internals</span><span class="tag">System Design</span>
      </div>
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
