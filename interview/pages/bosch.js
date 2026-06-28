window.Pages = window.Pages || {};
window.Pages['bosch'] = `
  <div class="page-header">
    <div class="breadcrumb">Home › <span>Bosch</span></div>
    <h1>⚙️ Bosch Interview</h1>
    <p>Clean Architecture · Monolithic Migration · System Design · Performance · Swiggy-style Design</p>
  </div>
  <div class="qa-list">

    <div class="qa-card">
      <div class="qa-num">R1·Q1</div>
      <div class="qa-body">
        <div class="qa-question">What is Clean Architecture?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Layers (outer → inner)</div>
            <div class="flow-box">
              <div class="flow-step">Presentation Layer — UI / API Controllers</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Application Layer — Use Cases / Services</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Domain Layer — Entities / Business Rules</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">Infrastructure Layer — DB / External APIs / File System</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Key Rule</div><p>Inner layers know nothing about outer layers. Dependencies point inward only.</p></div>
          <div class="tip-box">✅ Benefits: Testable · Maintainable · Framework-independent · Easy to swap DB or UI</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q2</div>
      <div class="qa-body">
        <div class="qa-question">Scope vs Transient (Dependency Injection lifetimes)</div>
        <div class="qa-answer">
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
            <div class="ans-block"><div class="ans-label">Transient</div><p>New instance every time it is requested.</p><div class="code-box">services.AddTransient&lt;IService, Service&gt;();</div></div>
            <div class="ans-block"><div class="ans-label">Scoped</div><p>One instance per HTTP request.</p><div class="code-box">services.AddScoped&lt;IService, Service&gt;();</div></div>
            <div class="ans-block"><div class="ans-label">Singleton</div><p>One instance for entire application lifetime.</p><div class="code-box">services.AddSingleton&lt;IService, Service&gt;();</div></div>
          </div>
          <div class="warn-box">⚠️ Never inject Scoped into Singleton — causes captive dependency bug.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q3</div>
      <div class="qa-body">
        <div class="qa-question">What is Middleware?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Request Pipeline</div>
            <div class="flow-box">
              <div class="flow-step">Request</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Logging Middleware</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Authentication Middleware</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Authorization Middleware</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">Controller / Handler</div><div class="flow-arrow">↓</div>
              <div class="flow-step">Response (reverse order)</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Common Middleware in .NET</div>
            <div class="tag-grid">
              <span class="tag blue">UseAuthentication</span><span class="tag blue">UseAuthorization</span>
              <span class="tag blue">UseCors</span><span class="tag blue">UseExceptionHandler</span>
              <span class="tag blue">UseRateLimiter</span><span class="tag blue">Custom Middleware</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R2·Q1</div>
      <div class="qa-body">
        <div class="qa-question">Application is crashing — no monitoring or logging. How will you fix it?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Immediate Steps</div><ul>
            <li>Implement structured logging — Serilog / NLog / Application Insights</li>
            <li>Add health check endpoints</li>
            <li>Set up monitoring — Prometheus + Grafana or Azure Monitor</li>
          </ul></div>
          <div class="ans-block"><div class="ans-label">Architecture Fix</div><ul>
            <li>Split highly used module into separate microservice</li>
            <li>Separate DB per domain to avoid contention</li>
            <li>Add circuit breaker to prevent cascade failures</li>
          </ul></div>
          <div class="tip-box">✅ First: add logging + monitoring. Then: identify bottleneck. Then: architectural fix.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R2·Q2</div>
      <div class="qa-body">
        <div class="qa-question">How will you scale a monolithic application?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short-term: Horizontal Scaling</div>
            <div class="flow-box">
              <div class="flow-step blue">Load Balancer</div><div class="flow-arrow">↓</div>
              <div class="flow-step">Instance 1 | Instance 2 | Instance 3</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Limitations of Monolith Scaling</div><ul>
            <li>You must scale the entire app even if only one module is under load</li>
            <li>Shared DB becomes a bottleneck</li>
            <li>Deployments affect the whole system</li>
          </ul></div>
          <div class="tip-box">✅ Short-term: add instances. Long-term: migrate to microservices.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R2·Q3</div>
      <div class="qa-body">
        <div class="qa-question">How to migrate from Monolithic to Microservices?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Strategy: Strangler Fig Pattern</div>
            <div class="flow-box">
              <div class="flow-step">Identify bounded contexts / domains</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Extract one module at a time (start with least coupled)</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">New microservice runs alongside monolith</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Route traffic gradually to new service</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">Retire monolith module when stable</div>
            </div>
          </div>
          <div class="warn-box">⚠️ Do NOT big-bang rewrite. Extract incrementally to reduce risk.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R1·Q5</div>
      <div class="qa-body">
        <div class="qa-question">Design a Swiggy-like food ordering system</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Microservices Breakdown</div>
            <div class="tag-grid">
              <span class="tag blue">Customer Service</span><span class="tag blue">Restaurant Service</span>
              <span class="tag blue">Order Service</span><span class="tag blue">Payment Service</span>
              <span class="tag blue">Notification Service</span><span class="tag blue">Delivery Service</span>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Flow</div>
            <div class="flow-box">
              <div class="flow-step">Customer Login (Customer Service)</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Restaurant Listing (Restaurant Service + Redis Cache)</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Place Order (Order Service → OrderCreated Event)</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Payment (Payment Service → PaymentConfirmed Event)</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Notify Restaurant + Customer (Notification Service)</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">Order Status Updates (Delivery Service → WebSocket/SignalR)</div>
            </div>
          </div>
          <div class="tip-box">✅ Each service has its own DB. Events connect services. Redis for restaurant listing cache.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">R2·Q4</div>
      <div class="qa-body">
        <div class="qa-question">How will you improve Application Performance?</div>
        <div class="qa-answer">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="ans-block"><div class="ans-label">Backend</div><ul>
              <li>Redis caching for frequent reads</li>
              <li>DB query optimization + indexing</li>
              <li>Async processing — offload to queues</li>
              <li>Read replica for heavy read workloads</li>
              <li>Connection pooling</li>
              <li>Pagination — avoid loading all records</li>
            </ul></div>
            <div class="ans-block"><div class="ans-label">Infrastructure</div><ul>
              <li>HPA — scale pods on CPU spike</li>
              <li>KEDA — scale on queue length</li>
              <li>CDN — static asset delivery</li>
              <li>Rate limiting — prevent abuse</li>
              <li>Circuit breaker — prevent cascade failures</li>
            </ul></div>
          </div>
        </div>
      </div>
    </div>

  </div>
`;
