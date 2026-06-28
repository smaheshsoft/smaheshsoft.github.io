window.Pages = window.Pages || {};
window.Pages['wipro'] = `
  <div class="page-header">
    <div class="breadcrumb">Home › <span>Wipro</span></div>
    <h1>🔷 Wipro Interview</h1>
    <p>Architect / Principal Engineer Level — System Design · Saga · State Machine · DevSecOps · Cloud Migration · Micro Frontend · Angular</p>
  </div>
  <div class="alert" style="margin-bottom:20px;">
    <strong>⚠️ Interviewer Feedback</strong>
    <p>Need to brush up on architecture concepts. Focus on system design, event-driven patterns, micro frontend, and cloud migration strategies.</p>
  </div>
  <div class="qa-list">

    <div class="qa-card">
      <div class="qa-num">Q1</div>
      <div class="qa-body">
        <div class="qa-question">Design a URL Shortener with Multi-Tenant support, High Availability and Low Latency</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Architecture</div>
            <div class="flow-box">
              <div class="flow-step">Client</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">API Gateway</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">URL Service</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Redis Cache (low latency lookup)</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">Database (persistence)</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Multi-Tenant Design</div>
            <div class="code-box">Tenant A: https://a.short.com/ABC123
Tenant B: https://b.short.com/ABC123

DB Schema: TenantId | ShortCode | LongUrl
Query: SELECT * FROM Urls WHERE TenantId=@T AND ShortCode=@Code</div>
          </div>
          <div class="tip-box">✅ Redis for speed. DB for persistence. Tenant-aware URLs. Multi-zone for HA.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q2</div>
      <div class="qa-body">
        <div class="qa-question">Why use Replicas? Client doesn't want to pay the extra cost.</div>
        <div class="qa-answer">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="ans-block"><div class="ans-label">Without Replica</div><div class="flow-box compact"><div class="flow-step red">Single DB failure → Application DOWN</div></div></div>
            <div class="ans-block"><div class="ans-label">With Replica</div><div class="flow-box compact"><div class="flow-step green">Primary failure → Failover → App continues</div></div></div>
          </div>
          <div class="tip-box">✅ Replicas = business continuity. Cost of downtime &gt;&gt; cost of replica. Balance with SLA requirements.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q3</div>
      <div class="qa-body">
        <div class="qa-question">Explain the Saga Pattern</div>
        <div class="qa-answer">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="ans-block"><div class="ans-label">Happy Path</div>
              <div class="flow-box compact">
                <div class="flow-step green">Order Created</div><div class="flow-arrow">↓</div>
                <div class="flow-step green">Payment Success</div><div class="flow-arrow">↓</div>
                <div class="flow-step green">Inventory Reserved</div><div class="flow-arrow">↓</div>
                <div class="flow-step green">Shipping Started</div>
              </div>
            </div>
            <div class="ans-block"><div class="ans-label">Compensation (if Inventory Fails)</div>
              <div class="flow-box compact">
                <div class="flow-step red">Inventory Failed</div><div class="flow-arrow">↓</div>
                <div class="flow-step red">Refund Payment</div><div class="flow-arrow">↓</div>
                <div class="flow-step red">Cancel Order</div>
              </div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Two Types</div><ul>
            <li><strong>Choreography</strong> — each service listens and reacts to events independently</li>
            <li><strong>Orchestration</strong> — a central Saga Orchestrator directs each step</li>
          </ul></div>
          <div class="tip-box">✅ Saga = distributed transactions via events + compensation actions for rollback</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q4</div>
      <div class="qa-body">
        <div class="qa-question">Order Placement: Confirmation → Inventory → Invoice → SMS → Email → Status Update. How to implement?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Event-Driven Architecture</div>
            <div class="flow-box">
              <div class="flow-step">Order Service → publishes OrderCreated event</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Inventory Service (subscribes)</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Invoice Service (subscribes)</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Notification Service → SMS + Email (subscribes)</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">Order Status updated via event</div>
            </div>
          </div>
          <div class="tip-box">✅ Use Kafka/Service Bus. Each service subscribes to relevant events. Saga manages failures.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q5</div>
      <div class="qa-body">
        <div class="qa-question">Explain the State Machine Pattern</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Order State Machine</div>
            <div class="flow-box">
              <div class="flow-step">Created</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Confirmed</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Paid</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Shipped</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">Delivered</div>
            </div>
            <div class="warn-box" style="margin-top:8px;">⚠️ Delivered → Created is NOT allowed — invalid transition throws exception</div>
          </div>
          <div class="ans-block"><div class="ans-label">Tools</div>
            <div class="tag-grid"><span class="tag blue">Stateless (.NET)</span><span class="tag blue">AWS Step Functions</span><span class="tag blue">Azure Durable Functions</span></div>
          </div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q6</div>
      <div class="qa-body">
        <div class="qa-question">Recent challenge faced — data partitioning problem</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Solution Applied</div><ul>
            <li><strong>Data Partitioning</strong> — split table by date/tenant/region</li>
            <li><strong>Index Optimization</strong> — composite indexes on query columns</li>
            <li><strong>Read Replica</strong> — offload reporting queries</li>
            <li><strong>Archiving</strong> — move old data to cold storage</li>
          </ul></div>
          <div class="tip-box">✅ Result: Query time reduced from minutes to seconds.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q7</div>
      <div class="qa-body">
        <div class="qa-question">Two board members propose different solutions — how do you resolve the conflict?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Approach</div><ol style="padding-left:18px;line-height:2;">
            <li>Listen and fully understand both proposals</li>
            <li>Define clear evaluation criteria</li>
            <li>Compare both on: Cost · Performance · Security · Maintainability · Scalability</li>
            <li>Create a POC if technical risk is unclear</li>
            <li>Present data-driven recommendation — not personal preference</li>
          </ol></div>
          <div class="tip-box">✅ Architecture decisions must be based on measurable outcomes, not seniority or opinions.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q8</div>
      <div class="qa-body">
        <div class="qa-question">What is DevSecOps?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Security integrated into every stage of DevOps pipeline (Shift Left)</div>
            <div class="flow-box">
              <div class="flow-step">Developer Commit</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">SAST — Static Code Analysis (SonarQube, CodeQL)</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Container Image Scan (Trivy)</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">Deploy to Production</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Tools</div>
            <div class="tag-grid"><span class="tag blue">SonarQube</span><span class="tag blue">CodeQL</span><span class="tag blue">Trivy</span><span class="tag blue">OWASP ZAP</span><span class="tag blue">Snyk</span></div>
          </div>
          <div class="tip-box">✅ DevSecOps = security is everyone's responsibility, built into pipeline from day one</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q9</div>
      <div class="qa-body">
        <div class="qa-question">I have 50 On-Prem VMs — how do you migrate to cloud? Do we need to create all 50 VMs?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Migration Strategies — The 6 R's</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
              <div class="code-box">1. Rehost (Lift &amp; Shift)
   VM → Cloud VM (fastest)</div>
              <div class="code-box">2. Replatform
   VM → App Service / Container</div>
              <div class="code-box">3. Refactor
   Monolith → Microservices (best ROI)</div>
              <div class="code-box">4. Repurchase
   Custom → SaaS product</div>
              <div class="code-box">5. Retire
   Decommission unused apps</div>
              <div class="code-box">6. Retain
   Keep on-prem if not ready</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">No — you don't need 50 VMs. Modernize instead:</div>
            <div class="code-box">Web Server VM      → App Service
Background Job VM  → Azure Function
Application VM     → AKS (containers)
Database VM        → Azure SQL / PostgreSQL Managed</div>
          </div>
          <div class="tip-box">✅ Assess first. Most VMs can become containers or PaaS — reduces cost and management.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q10</div>
      <div class="qa-body">
        <div class="qa-question">How to design a Dashboard efficiently for better performance with Micro Frontend?</div>
        <div class="qa-answer">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="ans-block"><div class="ans-label">Performance Techniques</div><ul>
              <li>Lazy Loading — load widgets on demand</li>
              <li>Virtual Scrolling — render only visible rows</li>
              <li>Pagination — limit data per request</li>
              <li>Caching — Redis for API responses</li>
              <li>CDN — static assets served from edge</li>
            </ul></div>
            <div class="ans-block"><div class="ans-label">Micro Frontend for Dashboard</div>
              <div class="flow-box compact">
                <div class="flow-step blue">Shell App (dashboard layout)</div><div class="flow-arrow">↓</div>
                <div class="flow-step">Widget A (Sales Team)</div>
                <div class="flow-step">Widget B (Finance Team)</div>
                <div class="flow-step">Widget C (Ops Team)</div>
              </div>
            </div>
          </div>
          <div class="tip-box">✅ Each widget = independent micro frontend. Lazy load. Cache API results. CDN for assets.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q11</div>
      <div class="qa-body">
        <div class="qa-question">How is State Management handled in Angular? How is Redux/NgRx used?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">NgRx — Redux Pattern for Angular</div>
            <div class="flow-box">
              <div class="flow-step blue">UI Component dispatches Action</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Reducer processes Action → updates State</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Store holds the new State</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">Selector reads State → UI re-renders</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Benefits</div><ul>
            <li>Single source of truth</li><li>Predictable state changes</li>
            <li>Easy to debug with Redux DevTools</li><li>Shared state across components</li>
          </ul></div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q12</div>
      <div class="qa-body">
        <div class="qa-question">How is Authentication handled in a UI application?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">OpenID Connect + OAuth2 Flow</div>
            <div class="flow-box">
              <div class="flow-step">User clicks Login</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Redirect to Identity Provider (Azure AD / Entra ID)</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">User authenticates → receives JWT Token</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">SPA stores token → attaches to API calls</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Token Storage</div><ul>
            <li><strong>Memory (Preferred)</strong> — most secure, cleared on tab close</li>
            <li><strong>Avoid Local Storage</strong> — vulnerable to XSS attacks</li>
          </ul></div>
          <div class="tip-box">✅ Use MSAL library for Azure AD. Store tokens in memory. Use refresh tokens for session.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q13</div>
      <div class="qa-body">
        <div class="qa-question">Authorization in UI application using RBAC</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">JWT Token contains Roles</div><div class="code-box">{ "roles": ["Admin", "Manager"], "tenantId": "EY" }</div></div>
          <div class="ans-block"><div class="ans-label">UI Example</div>
            <div class="code-box">// Angular Route Guard
canActivate(): boolean {
  return this.authService.hasRole('Admin');
}

// Template
&lt;button *ngIf="hasRole('Admin')"&gt;Delete&lt;/button&gt;</div>
          </div>
          <div class="warn-box">⚠️ UI authorization is only for UX. Backend MUST enforce authorization — never trust the client.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q14</div>
      <div class="qa-body">
        <div class="qa-question">What are common issues in UI applications?</div>
        <div class="qa-answer">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="ans-block"><div class="ans-label">Performance Issues</div><ul><li>Memory leaks (unsubscribed observables)</li><li>Large bundle size</li><li>No virtual scrolling for large lists</li></ul></div>
            <div class="ans-block"><div class="ans-label">Security Issues</div><ul><li>CORS errors</li><li>Token stored in localStorage (XSS risk)</li><li>Missing input validation</li></ul></div>
          </div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q15</div>
      <div class="qa-body">
        <div class="qa-question">What is Micro Frontend Architecture?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Example: E-Commerce Portal</div>
            <div class="flow-box">
              <div class="flow-step blue">Shell Application (App Host)</div><div class="flow-arrow">↓</div>
              <div class="flow-step">Header Team → header.company.com</div>
              <div class="flow-step">Orders Team → orders.company.com</div>
              <div class="flow-step">Payments Team → payments.company.com</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Technologies</div>
            <div class="tag-grid"><span class="tag blue">Module Federation (Webpack 5)</span><span class="tag blue">Single SPA</span><span class="tag blue">Web Components</span></div>
          </div>
          <div class="ans-block"><div class="ans-label">Benefits</div><ul>
            <li>Independent deployment per team</li>
            <li>Different tech stacks per micro-frontend</li>
            <li>Fault isolation — one MFE crash doesn't break others</li>
          </ul></div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q16</div>
      <div class="qa-body">
        <div class="qa-question">Authentication and Authorization in Micro Frontend — how is it handled?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Authentication — Centralized in Shell App</div>
            <div class="flow-box">
              <div class="flow-step blue">Azure AD / Entra ID</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Shell Application handles login → gets JWT</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">Shares token with all Micro Frontends</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Authorization — Role-based per MFE</div>
            <div class="code-box">Admin Role   → loads Admin MFE module
User Role    → hides Admin module
Finance Role → loads Finance MFE only</div>
          </div>
          <div class="tip-box">✅ Authentication: centralized in shell. Authorization: role-based, enforced front + back.</div>
        </div>
      </div>
    </div>

  </div>
`;
